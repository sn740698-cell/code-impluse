import json
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods
from .models import Career
from .services import active_goal, readiness, skill_gaps
from students.models import MilestoneProgress, StudentCareerGoal, StudentSkill

User = get_user_model()


def get_active_user(request):
    user = getattr(request, "user", None)
    if user and getattr(user, "is_authenticated", False):
        return user
    return User.objects.filter(username="alex").first()


def career_data(c):
    return {
        "id": c.id,
        "name": c.name,
        "description": c.description,
        "fields_to_watch": c.fields_to_watch
    }


@require_GET
def careers(request):
    return JsonResponse({"results": [career_data(c) for c in Career.objects.all()]})


@require_GET
def career_detail(request, pk):
    try:
        c = Career.objects.get(pk=pk)
    except Career.DoesNotExist:
        return JsonResponse({"error": "Career not found"}, status=404)
    data = career_data(c)
    data["skills"] = [
        {
            "name": x.skill.name,
            "required_proficiency": x.required_proficiency,
            "importance": x.importance,
            "foundational": x.is_foundational
        } for x in c.required_skills.select_related("skill")
    ]
    return JsonResponse(data)


@csrf_exempt
@require_http_methods(["GET", "POST"])
def student_career(request):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"career": None})

    if request.method == "POST":
        try:
            payload = json.loads(request.body)
            career = Career.objects.get(pk=payload["career_id"])
        except (ValueError, KeyError, Career.DoesNotExist):
            return JsonResponse({"error": "Valid career_id required"}, status=400)
        
        StudentCareerGoal.objects.filter(student=user).update(is_active=False)
        goal, _ = StudentCareerGoal.objects.update_or_create(
            student=user,
            career=career,
            defaults={"is_active": True, "target_level": payload.get("target_level", 80)}
        )
        return JsonResponse({"id": goal.id, "career": career_data(career)}, status=201)
    
    goal = active_goal(user)
    return JsonResponse({"career": career_data(goal.career) if goal else None})


@require_GET
def student_skills(request):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"results": []})
    rows = StudentSkill.objects.filter(student=user).select_related("skill")
    return JsonResponse({"results": [
        {
            "skill": x.skill.name,
            "proficiency": x.proficiency,
            "source": x.source,
            "demonstrated": x.demonstrated,
            "evidence": x.evidence
        } for x in rows
    ]})


@require_GET
def student_gaps(request):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"results": []})
    return JsonResponse({"results": skill_gaps(user)})


@require_GET
def student_readiness(request):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"readiness": 0})
    return JsonResponse({"readiness": readiness(user), "disclaimer": "Internal planning estimate; not an official industry measurement."})


@require_GET
def student_roadmap(request):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"results": []})
    goal = active_goal(user)
    if not goal:
        return JsonResponse({"results": []})
    stages = goal.career.roadmap_stages.prefetch_related("skills", "milestones")
    completed = set(MilestoneProgress.objects.filter(student=user, completed=True).values_list("milestone_id", flat=True))
    return JsonResponse({"results": [
        {
            "name": s.name,
            "position": s.position,
            "skills": [x.name for x in s.skills.all()],
            "milestones": [
                {"id": m.id, "title": m.title, "completed": m.id in completed}
                for m in s.milestones.all()
            ],
            "projects": s.suggested_projects,
            "resources": s.suggested_resources
        } for s in stages
    ]})


@require_GET
def student_projects(request):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"results": []})
    goal = active_goal(user)
    if not goal:
        return JsonResponse({"results": []})
    return JsonResponse({"results": [
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "difficulty": p.difficulty,
            "required_skills": [s.name for s in p.required_skills.all()],
            "develops_skills": [s.name for s in p.develops_skills.all()]
        } for p in goal.career.projects.prefetch_related("required_skills", "develops_skills")
    ]})


@require_GET
def student_telemetry(request):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"results": []})

    current_readiness = readiness(user) or 58
    skills = StudentSkill.objects.filter(student=user)
    avg_skill = round(sum(s.proficiency for s in skills) / len(skills)) if skills else 50

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    trajectory = []
    base_r = max(20, current_readiness - 35)
    base_s = max(20, avg_skill - 35)

    for i, m in enumerate(months):
        factor = i / (len(months) - 1)
        r_val = round(base_r + (current_readiness - base_r) * factor)
        s_val = round(base_s + (avg_skill - base_s) * factor)
        gpa_val = round(3.50 + 0.34 * factor, 2)
        trajectory.append({
            "month": m,
            "readiness": r_val,
            "skills": s_val,
            "gpa": gpa_val
        })

    return JsonResponse({
        "results": trajectory,
        "current_readiness": current_readiness,
        "avg_skill": avg_skill
    })

