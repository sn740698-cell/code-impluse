import re
import json
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ai.services import AIUnavailable, generate
from ai.vector_store import db
from ai.ingestion import index_student_dashboard_data

User = get_user_model()


def is_valid_input(text):
    """Validate user input and reject garbage, gibberish, spam, or unnecessary random strings."""
    if not text or len(text.strip()) < 2:
        return False, "Input is too short. Please provide a meaningful question or prompt."

    text_clean = text.strip()

    # Reject pure punctuation or special characters
    if not re.search(r"[a-zA-Z0-9]", text_clean):
        return False, "Input contains no valid words or numbers. Please ask a relevant question."

    # Reject repeated single character spam (e.g. 'aaaaaaa', '???????', '1111111')
    if len(set(text_clean.lower())) == 1 and len(text_clean) > 3:
        return False, "Repeated character pattern detected. Please enter a valid question."

    # Reject keyboard mash gibberish (e.g. 'asdfghjkl', 'qwertyuiop', 'zxcvbnm', 'fghjklsd')
    words = re.findall(r"[a-zA-Z]+", text_clean.lower())
    if words:
        keyboard_mashes = {"asdfghjkl", "qwertyuiop", "zxcvbnm", "asdfghjk", "fghjklsd", "qwertyui", "lkjhgfdsa"}
        vowels = set("aeiouy")
        for word in words:
            if word in keyboard_mashes:
                return False, "Unnecessary or gibberish input detected. Please ask a relevant career or academic question."
            # Check for words with zero vowels and length > 5 (likely gibberish like 'bcdfghjklmn')
            if len(word) > 5 and not any(char in vowels for char in word):
                return False, "Unnecessary or unreadable text detected. Please ask a clear question."

    return True, ""


def get_active_user(request):
    user = getattr(request, "user", None)
    if user and getattr(user, "is_authenticated", False):
        return user
    return User.objects.filter(username="alex").first()


@csrf_exempt
def chat(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST requests are allowed"}, status=405)

    try:
        data = json.loads(request.body)
        user_message = data.get("message", "").strip()

        # Input Validation & Garbage Data Rejection
        is_valid, err_msg = is_valid_input(user_message)
        if not is_valid:
            return JsonResponse({"error": err_msg}, status=400)

        # 1. Resolve student from request user or fallback demo user
        user = get_active_user(request)
        profile_override = data.get("profile") or {}
        student_id = str(user.id) if user and hasattr(user, "id") and user.id else "demo_user"

        # 2. Ingest & index dynamic student info + dashboard data into Vector DB
        index_student_dashboard_data(user, profile_override)

        # 3. Vector Similarity Search - Retrieve Top Relevant Facts/Documents
        retrieved_docs = db.search_similar(user_message, student_id=student_id, top_k=4)

        context_lines = []
        for d in retrieved_docs:
            context_lines.append(f"[{d['category'].upper()}] {d['content']} (Similarity: {d['similarity']})")

        vector_context_text = "\n".join(context_lines) if context_lines else "No specific vector context matched."

        user_name = profile_override.get("name") or (user.get_full_name().strip() if (user and hasattr(user, "get_full_name")) else "Alex Rivera")
        if not user_name:
            user_name = "Alex Rivera"

        # Construct RAG System Prompt
        system_prompt = (
            f"You are the AI Career Compass & Academic Advisor for {user_name}.\n"
            f"RETRIEVED VECTOR DATABASE CONTEXT (RAG search results for '{user_message}'):\n"
            f"{vector_context_text}\n\n"
            "FORMATTING & RESPONSE GUIDELINES:\n"
            "1. Make responses MINIMAL, EASY TO UNDERSTAND, and CONCISE (under 120 words).\n"
            "2. Directly answer using the RETRIEVED VECTOR DATABASE CONTEXT above.\n"
            "3. NEVER use markdown tables (no | column | syntax).\n"
            "4. NEVER use HTML tags like <br>.\n"
            "5. Use clean bullet points with emojis (🎯, 💡, ⚡).\n"
            "6. Use bold font for key terms and metrics."
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        result, provider = generate(messages)

        return JsonResponse({
            "response": result,
            "provider": provider,
            "vector_context": retrieved_docs
        })

    except AIUnavailable:
        return JsonResponse(
            {"error": "Neither Ollama nor the configured fallback AI provider is available."},
            status=503
        )

    except Exception as e:
        return JsonResponse(
            {"error": str(e)},
            status=500
        )
