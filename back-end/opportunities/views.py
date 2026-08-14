import json
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.http import require_GET, require_POST, require_http_methods
from accounts.models import Profile
from ai.services import ollama_explanation
from .models import Opportunity, OpportunityFeedback, OpportunityInteraction
from .services import available_opportunities, opportunity_score


def serialize(opportunity, student=None):
    data = {"id": opportunity.id, "title": opportunity.title, "description": opportunity.description, "type": opportunity.type, "category": opportunity.category, "starts_at": opportunity.starts_at.isoformat(), "ends_at": opportunity.ends_at.isoformat() if opportunity.ends_at else None, "speaker": opportunity.speaker, "organization": opportunity.organization, "skills": [s.name for s in opportunity.skills.all()], "career_areas": [c.name for c in opportunity.career_areas.all()], "location": opportunity.location, "registration_link": opportunity.registration_link, "registration_deadline": opportunity.registration_deadline.isoformat() if opportunity.registration_deadline else None}
    if student:
        score, parts, reasons, conflict = opportunity_score(student, opportunity)
        data.update({"match_score": score, "score_breakdown": parts, "why_recommended": reasons, "schedule_warning": conflict})
    return data


def teacher_required(view):
    def wrapped(request, *args, **kwargs):
        profile = getattr(request.user, "profile", None)
        if not request.user.is_authenticated: return JsonResponse({"error": "Authentication required"}, status=401)
        if not (request.user.is_staff or profile and profile.role in (Profile.Role.TEACHER, Profile.Role.ADMIN)):
            return JsonResponse({"error": "Teacher permission required"}, status=403)
        return view(request, *args, **kwargs)
    return wrapped


@require_http_methods(["GET", "POST"])
def opportunity_list(request):
    if request.method == "POST":
        return create_opportunity(request)
    qs = available_opportunities()
    return JsonResponse({"results": [serialize(x, request.user if request.user.is_authenticated else None) for x in qs]})


@login_required
@require_GET
def recommended(request):
    rows = [serialize(x, request.user) for x in available_opportunities()]
    return JsonResponse({"results": sorted(rows, key=lambda x: x["match_score"], reverse=True)})


@require_http_methods(["GET", "PUT", "DELETE"])
def opportunity_detail(request, pk):
    try: opportunity = Opportunity.objects.prefetch_related("skills", "career_areas").get(pk=pk)
    except Opportunity.DoesNotExist: return JsonResponse({"error": "Opportunity not found"}, status=404)
    if request.method == "GET":
        if request.user.is_authenticated: OpportunityInteraction.objects.get_or_create(student=request.user, opportunity=opportunity, defaults={"viewed_at": timezone.now()})
        return JsonResponse(serialize(opportunity, request.user if request.user.is_authenticated else None))
    profile = getattr(request.user, "profile", None)
    if not request.user.is_authenticated or not (request.user.is_staff or profile and profile.role in ("teacher", "admin")): return JsonResponse({"error": "Teacher permission required"}, status=403)
    if request.method == "DELETE": opportunity.delete(); return JsonResponse({}, status=204)
    try: data = json.loads(request.body)
    except ValueError: return JsonResponse({"error": "Invalid JSON"}, status=400)
    for field in ("title", "description", "type", "category", "speaker", "organization", "eligibility", "registration_link", "location", "poster", "status"):
        if field in data: setattr(opportunity, field, data[field])
    opportunity.save(); return JsonResponse(serialize(opportunity, request.user))


@login_required
@teacher_required
@require_POST
def create_opportunity(request):
    try: data = json.loads(request.body)
    except ValueError: return JsonResponse({"error": "Invalid JSON"}, status=400)
    required = ("title", "description", "type", "starts_at")
    if any(not data.get(key) for key in required): return JsonResponse({"error": "title, description, type and starts_at are required"}, status=400)
    from django.utils.dateparse import parse_datetime
    starts_at = parse_datetime(data["starts_at"])
    if not starts_at: return JsonResponse({"error": "starts_at must be ISO-8601"}, status=400)
    opportunity = Opportunity.objects.create(title=data["title"], description=data["description"], type=data["type"], starts_at=starts_at, created_by=request.user, category=data.get("category", ""), speaker=data.get("speaker", ""), organization=data.get("organization", ""), interests=data.get("interests", []), location=data.get("location", ""), registration_link=data.get("registration_link", ""), status=data.get("status", "draft"))
    opportunity.skills.set(data.get("skill_ids", [])); opportunity.career_areas.set(data.get("career_ids", []))
    return JsonResponse(serialize(opportunity), status=201)


@login_required
@require_POST
def interaction(request, pk, action):
    try: opportunity = Opportunity.objects.get(pk=pk)
    except Opportunity.DoesNotExist: return JsonResponse({"error": "Opportunity not found"}, status=404)
    row, _ = OpportunityInteraction.objects.get_or_create(student=request.user, opportunity=opportunity)
    if action == "save": row.saved_at = timezone.now()
    elif action == "register":
        if opportunity.registration_deadline and opportunity.registration_deadline < timezone.now(): return JsonResponse({"error": "Registration deadline passed"}, status=400)
        row.registered_at = timezone.now()
    else: return JsonResponse({"error": "Unsupported action"}, status=400)
    row.save(); return JsonResponse({"status": action + "d"})


@login_required
@require_POST
def feedback(request, pk):
    try: opportunity = Opportunity.objects.get(pk=pk); data = json.loads(request.body); rating = int(data["rating"])
    except (Opportunity.DoesNotExist, ValueError, KeyError, TypeError): return JsonResponse({"error": "A valid rating is required"}, status=400)
    if not 1 <= rating <= 5: return JsonResponse({"error": "rating must be 1 to 5"}, status=400)
    item, _ = OpportunityFeedback.objects.update_or_create(student=request.user, opportunity=opportunity, defaults={"rating": rating, "useful": bool(data.get("useful")), "comment": data.get("comment", "")})
    item.skills_learned.set(data.get("skill_ids", [])); return JsonResponse({"id": item.id}, status=201)


@login_required
@require_GET
def student_opportunities(request, state=None):
    qs = Opportunity.objects.filter(interactions__student=request.user).prefetch_related("skills", "career_areas")
    field = {"saved": "saved_at__isnull", "registered": "registered_at__isnull"}.get(state)
    if field: qs = qs.filter(**{field: False})
    return JsonResponse({"results": [serialize(x, request.user) for x in qs.distinct()]})


@login_required
@teacher_required
@require_GET
def teacher_analytics(request):
    qs = Opportunity.objects.filter(created_by=request.user).annotate(views=Count("interactions", filter=__import__("django.db.models", fromlist=["Q"]).Q(interactions__viewed_at__isnull=False)), saves=Count("interactions", filter=__import__("django.db.models", fromlist=["Q"]).Q(interactions__saved_at__isnull=False)), registrations=Count("interactions", filter=__import__("django.db.models", fromlist=["Q"]).Q(interactions__registered_at__isnull=False)), attendance=Count("interactions", filter=__import__("django.db.models", fromlist=["Q"]).Q(interactions__attended_at__isnull=False)), average_rating=Avg("feedback__rating"))
    return JsonResponse({"results": [{"id": x.id, "title": x.title, "views": x.views, "saves": x.saves, "registrations": x.registrations, "attendance": x.attendance, "average_rating": x.average_rating} for x in qs]})
