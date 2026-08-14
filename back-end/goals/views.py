import json
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_http_methods
from .models import Career
from .services import active_goal, readiness, skill_gaps
from students.models import MilestoneProgress, StudentCareerGoal, StudentSkill


def career_data(c):
    return {"id": c.id, "name": c.name, "description": c.description, "fields_to_watch": c.fields_to_watch}


@require_GET
def careers(request):
    return JsonResponse({"results": [career_data(c) for c in Career.objects.all()]})


@require_GET
def career_detail(request, pk):
    try: c = Career.objects.get(pk=pk)
    except Career.DoesNotExist: return JsonResponse({"error": "Career not found"}, status=404)
    data = career_data(c)
    data["skills"] = [{"name": x.skill.name, "required_proficiency": x.required_proficiency, "importance": x.importance, "foundational": x.is_foundational} for x in c.required_skills.select_related("skill")]
    return JsonResponse(data)


@login_required
@require_http_methods(["GET", "POST"])
def student_career(request):
    if request.method == "POST":
        try: payload = json.loads(request.body); career = Career.objects.get(pk=payload["career_id"])
        except (ValueError, KeyError, Career.DoesNotExist): return JsonResponse({"error": "Valid career_id required"}, status=400)
        StudentCareerGoal.objects.filter(student=request.user).update(is_active=False)
        goal, _ = StudentCareerGoal.objects.update_or_create(student=request.user, career=career, defaults={"is_active": True, "target_level": payload.get("target_level", 80)})
        return JsonResponse({"id": goal.id, "career": career_data(career)}, status=201)
    goal = active_goal(request.user)
    return JsonResponse({"career": career_data(goal.career) if goal else None})


@login_required
@require_GET
def student_skills(request):
    rows = StudentSkill.objects.filter(student=request.user).select_related("skill")
    return JsonResponse({"results": [{"skill": x.skill.name, "proficiency": x.proficiency, "source": x.source, "demonstrated": x.demonstrated, "evidence": x.evidence} for x in rows]})


@login_required
@require_GET
def student_gaps(request): return JsonResponse({"results": skill_gaps(request.user)})


@login_required
@require_GET
def student_readiness(request): return JsonResponse({"readiness": readiness(request.user), "disclaimer": "Internal planning estimate; not an official industry measurement."})


@login_required
@require_GET
def student_roadmap(request):
    goal = active_goal(request.user)
    if not goal: return JsonResponse({"results": []})
    stages = goal.career.roadmap_stages.prefetch_related("skills", "milestones")
    completed = set(MilestoneProgress.objects.filter(student=request.user, completed=True).values_list("milestone_id", flat=True))
    return JsonResponse({"results": [{"name": s.name, "position": s.position, "skills": [x.name for x in s.skills.all()], "milestones": [{"id": m.id, "title": m.title, "completed": m.id in completed} for m in s.milestones.all()], "projects": s.suggested_projects, "resources": s.suggested_resources} for s in stages]})


@login_required
@require_GET
def student_projects(request):
    goal = active_goal(request.user)
    if not goal: return JsonResponse({"results": []})
    return JsonResponse({"results": [{"id": p.id, "title": p.title, "description": p.description, "difficulty": p.difficulty, "required_skills": [s.name for s in p.required_skills.all()], "develops_skills": [s.name for s in p.develops_skills.all()]} for p in goal.career.projects.prefetch_related("required_skills", "develops_skills")]})
