import json
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ai.services import AIUnavailable, generate
from goals.services import active_goal, readiness, skill_gaps

User = get_user_model()


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

        if not user_message:
            return JsonResponse({"error": "Message is required"}, status=400)

        # Safely resolve active user profile
        user = get_active_user(request)
        
        user_name = user.get_full_name().strip() if (user and hasattr(user, "get_full_name")) else "Alex Rivera"
        if not user_name:
            user_name = "Alex Rivera"

        goal_info = "Cybersecurity Engineer"
        readiness_score = 58
        gaps_summary = "Networking Fundamentals (25% vs 80% required)"
        
        if user:
            g = active_goal(user)
            if g:
                goal_info = g.career.name
            readiness_score = readiness(user)
            g_list = skill_gaps(user)
            if g_list:
                gaps_summary = ", ".join([f"{x.get('skill', '')} (gap: {x.get('gap', '')}%)" for x in g_list[:3]])

        system_prompt = (
            f"You are the AI Career Compass & Academic Advisor for {user_name}.\n"
            f"Student Context:\n"
            f"- Target Career: {goal_info}\n"
            f"- Career Readiness: {readiness_score}%\n"
            f"- Top Skill Gaps: {gaps_summary}\n"
            f"- Academic Balance: DBMS Recovery Plan (7 hrs/wk), DBMS Exam on Aug 24th.\n"
            f"- Recommended Workshop: Networking Fundamentals Workshop on Aug 22nd (91% match).\n\n"
            "FORMATTING GUIDELINES:\n"
            "1. Make responses MINIMAL, EASY TO UNDERSTAND, and CONCISE (under 120 words).\n"
            "2. NEVER use markdown tables (no | column | syntax).\n"
            "3. NEVER use HTML tags like <br>.\n"
            "4. Use short bullet points with clean emojis (🎯, 💡, ⚡).\n"
            "5. Use bold font for key terms and metrics."
        )

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        result, provider = generate(messages)

        return JsonResponse({
            "response": result,
            "provider": provider,
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
