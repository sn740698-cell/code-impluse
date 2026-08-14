import json
from django.contrib.auth import get_user_model
from django.db.models import Avg, Count, Q
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from accounts.models import Profile
from .models import Opportunity, OpportunityFeedback, OpportunityInteraction
from .services import available_opportunities, opportunity_score

User = get_user_model()


def get_active_user(request):
    user = getattr(request, "user", None)
    if user and getattr(user, "is_authenticated", False):
        return user
    return User.objects.filter(username="alex").first()


def get_active_teacher(request):
    user = getattr(request, "user", None)
    if user and getattr(user, "is_authenticated", False):
        return user
    return User.objects.filter(username="sarah").first()


def serialize(opportunity, student=None):
    data = {
        "id": opportunity.id,
        "title": opportunity.title,
        "description": opportunity.description,
        "type": opportunity.type,
        "category": opportunity.category,
        "starts_at": opportunity.starts_at.isoformat(),
        "ends_at": opportunity.ends_at.isoformat() if opportunity.ends_at else None,
        "speaker": opportunity.speaker,
        "organization": opportunity.organization,
        "skills": [s.name for s in opportunity.skills.all()],
        "career_areas": [c.name for c in opportunity.career_areas.all()],
        "location": opportunity.location,
        "registration_link": opportunity.registration_link,
        "registration_deadline": opportunity.registration_deadline.isoformat() if opportunity.registration_deadline else None
    }
    if student:
        score, parts, reasons, conflict = opportunity_score(student, opportunity)
        data.update({
            "match_score": score,
            "score_breakdown": parts,
            "why_recommended": reasons,
            "has_conflict": bool(conflict),
            "conflict_warning": conflict or ""
        })
    return data


@csrf_exempt
@require_http_methods(["GET", "POST"])
def opportunity_list(request):
    if request.method == "POST":
        return create_opportunity(request)
    user = get_active_user(request)
    qs = available_opportunities()
    return JsonResponse({"results": [serialize(x, user) for x in qs]})


@require_GET
def recommended(request):
    user = get_active_user(request)
    rows = [serialize(x, user) for x in available_opportunities()]
    return JsonResponse({"results": sorted(rows, key=lambda x: x.get("match_score", 0), reverse=True)})


@csrf_exempt
@require_http_methods(["GET", "PUT", "DELETE"])
def opportunity_detail(request, pk):
    try:
        opportunity = Opportunity.objects.prefetch_related("skills", "career_areas").get(pk=pk)
    except Opportunity.DoesNotExist:
        return JsonResponse({"error": "Opportunity not found"}, status=404)
    
    user = get_active_user(request)

    if request.method == "GET":
        if user:
            OpportunityInteraction.objects.get_or_create(
                student=user, opportunity=opportunity, defaults={"viewed_at": timezone.now()}
            )
        return JsonResponse(serialize(opportunity, user))
    
    if request.method == "DELETE":
        opportunity.delete()
        return JsonResponse({}, status=204)
    
    try:
        data = json.loads(request.body)
    except ValueError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    for field in ("title", "description", "type", "category", "speaker", "organization", "eligibility", "registration_link", "location", "poster", "status"):
        if field in data:
            setattr(opportunity, field, data[field])
    opportunity.save()
    return JsonResponse(serialize(opportunity, user))


@csrf_exempt
@require_POST
def create_opportunity(request):
    try:
        data = json.loads(request.body)
    except ValueError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    
    required = ("title", "description", "type", "starts_at")
    if any(not data.get(key) for key in required):
        return JsonResponse({"error": "title, description, type and starts_at are required"}, status=400)
    
    from django.utils.dateparse import parse_datetime
    starts_at = parse_datetime(data["starts_at"])
    if not starts_at:
        return JsonResponse({"error": "starts_at must be ISO-8601"}, status=400)
    
    teacher = get_active_teacher(request)
    opportunity = Opportunity.objects.create(
        title=data["title"],
        description=data["description"],
        type=data["type"],
        starts_at=starts_at,
        created_by=teacher,
        category=data.get("category", ""),
        speaker=data.get("speaker", ""),
        organization=data.get("organization", ""),
        interests=data.get("interests", []),
        location=data.get("location", ""),
        registration_link=data.get("registration_link", ""),
        status=data.get("status", "published")
    )
    if "skill_ids" in data:
        opportunity.skills.set(data["skill_ids"])
    if "career_ids" in data:
        opportunity.career_areas.set(data["career_ids"])
    
    return JsonResponse(serialize(opportunity, get_active_user(request)), status=201)


@csrf_exempt
@require_POST
def interaction(request, pk, action):
    try:
        opportunity = Opportunity.objects.get(pk=pk)
    except Opportunity.DoesNotExist:
        return JsonResponse({"error": "Opportunity not found"}, status=404)
    
    user = get_active_user(request)
    if not user:
        return JsonResponse({"error": "Student account required"}, status=400)
    
    row, _ = OpportunityInteraction.objects.get_or_create(student=user, opportunity=opportunity)
    if action == "save":
        row.saved_at = timezone.now()
    elif action == "register":
        if opportunity.registration_deadline and opportunity.registration_deadline < timezone.now():
            return JsonResponse({"error": "Registration deadline passed"}, status=400)
        row.registered_at = timezone.now()
    else:
        return JsonResponse({"error": "Unsupported action"}, status=400)
    
    row.save()
    return JsonResponse({"status": action + "d"})


@csrf_exempt
@require_POST
def feedback(request, pk):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"error": "Student account required"}, status=400)
    try:
        opportunity = Opportunity.objects.get(pk=pk)
        data = json.loads(request.body)
        rating = int(data["rating"])
    except (Opportunity.DoesNotExist, ValueError, KeyError, TypeError):
        return JsonResponse({"error": "A valid rating is required"}, status=400)
    
    if not 1 <= rating <= 5:
        return JsonResponse({"error": "rating must be 1 to 5"}, status=400)
    
    item, _ = OpportunityFeedback.objects.update_or_create(
        student=user,
        opportunity=opportunity,
        defaults={"rating": rating, "useful": bool(data.get("useful")), "comment": data.get("comment", "")}
    )
    if "skill_ids" in data:
        item.skills_learned.set(data["skill_ids"])
    
    return JsonResponse({"id": item.id}, status=201)


@require_GET
def student_opportunities(request, state=None):
    user = get_active_user(request)
    if not user:
        return JsonResponse({"results": []})
    qs = Opportunity.objects.filter(interactions__student=user).prefetch_related("skills", "career_areas")
    field = {"saved": "saved_at__isnull", "registered": "registered_at__isnull"}.get(state)
    if field:
        qs = qs.filter(**{field: False})
    return JsonResponse({"results": [serialize(x, user) for x in qs.distinct()]})


@require_GET
def teacher_analytics(request):
    teacher = get_active_teacher(request)
    if not teacher:
        return JsonResponse({"results": []})
    qs = Opportunity.objects.filter(created_by=teacher).annotate(
        views=Count("interactions", filter=Q(interactions__viewed_at__isnull=False)),
        saves=Count("interactions", filter=Q(interactions__saved_at__isnull=False)),
        registrations=Count("interactions", filter=Q(interactions__registered_at__isnull=False)),
        attendance=Count("interactions", filter=Q(interactions__attended_at__isnull=False)),
        average_rating=Avg("feedback__rating")
    )
    return JsonResponse({"results": [
        {
            "id": x.id,
            "title": x.title,
            "views": x.views,
            "saves": x.saves,
            "registrations": x.registrations,
            "attendance": x.attendance,
            "average_rating": x.average_rating
        } for x in qs
    ]})
