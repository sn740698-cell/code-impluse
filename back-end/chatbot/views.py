import json
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ai.services import AIUnavailable, generate
from goals.services import active_goal, readiness, skill_gaps
from students.models import StudentSkill, StudentCareerGoal, MilestoneProgress
from academics.models import ScheduleCommitment
from opportunities.models import OpportunityInteraction

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

        # 1. Resolve student from request user or fallback demo user
        user = get_active_user(request)
        profile_override = data.get("profile") or {}

        # 2. Extract Name
        user_name = profile_override.get("name") or (user.get_full_name().strip() if (user and hasattr(user, "get_full_name")) else "Alex Rivera")
        if not user_name:
            user_name = "Alex Rivera"

        # 3. Extract Target Career & Readiness
        goal_info = profile_override.get("target_career")
        if not goal_info and user:
            g = active_goal(user)
            if g:
                goal_info = g.career.name
        if not goal_info:
            goal_info = "Cybersecurity Engineer"

        readiness_score = readiness(user) if user else 58

        # 4. Extract Recorded Student Skills
        student_skills_list = []
        if user:
            for s in StudentSkill.objects.filter(student=user).select_related("skill"):
                student_skills_list.append(f"{s.skill.name}: {s.proficiency}%")
        if profile_override.get("skills"):
            for s in profile_override["skills"]:
                if isinstance(s, dict):
                    student_skills_list.append(f"{s.get('name')}: {s.get('proficiency')}%")

        skills_summary = ", ".join(student_skills_list) if student_skills_list else "Python: 65%, Linux: 30%, Networking: 25%"

        # 5. Extract Skill Gaps
        g_list = skill_gaps(user) if user else []
        if g_list:
            gaps_summary = ", ".join([f"{x.get('skill', '')} (gap: {x.get('gap', '')}%)" for x in g_list[:3]])
        else:
            gaps_summary = "Security Fundamentals (65% gap), Networking (55% gap), Linux Admin (45% gap)"

        # 6. Extract Academic Commitments & Recovery Plans
        commitments = []
        if user:
            for c in ScheduleCommitment.objects.filter(student=user):
                commitments.append(f"{c.title} ({c.commitment_type})")
        commit_summary = ", ".join(commitments) if commitments else "DBMS Recovery Plan (7 hrs/week), DBMS Exam on Aug 24th"

        # 7. Extract Registered Opportunities
        registered_opps = []
        if user:
            for interaction in OpportunityInteraction.objects.filter(student=user, status__in=["registered", "saved"]).select_related("opportunity"):
                registered_opps.append(interaction.opportunity.title)
        opp_summary = ", ".join(registered_opps) if registered_opps else "Networking Fundamentals Workshop (Aug 22nd, 91% match)"

        # Construct Dynamic AI System Context
        system_prompt = (
            f"You are the AI Career Compass & Academic Advisor for {user_name}.\n"
            f"DYNAMIC STUDENT DATA RECORD:\n"
            f"- Student Name: {user_name}\n"
            f"- Target Career Goal: {goal_info}\n"
            f"- Career Readiness Index: {readiness_score}%\n"
            f"- Recorded Skills: {skills_summary}\n"
            f"- Identified Skill Gaps: {gaps_summary}\n"
            f"- Academic Commitments: {commit_summary}\n"
            f"- Saved/Registered Opportunities: {opp_summary}\n\n"
            "FORMATTING GUIDELINES:\n"
            "1. Make responses MINIMAL, EASY TO UNDERSTAND, and CONCISE (under 120 words).\n"
            "2. NEVER use markdown tables (no | column | syntax).\n"
            "3. NEVER use HTML tags like <br>.\n"
            "4. Use clean bullet points with emojis (🎯, 💡, ⚡).\n"
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
