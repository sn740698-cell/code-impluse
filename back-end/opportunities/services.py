from django.db.models import Q
from django.utils import timezone
from academics.models import ScheduleCommitment
from goals.services import active_goal, skill_gaps

WEIGHTS = {"interest": 15, "career": 30, "skill_gap": 35, "level": 15, "schedule": 5}


def opportunity_score(student, opportunity):
    goal = active_goal(student)
    interests = set(getattr(getattr(student, "profile", None), "interests", []) or [])
    opportunity_interests = set(opportunity.interests or [])
    interest = 100 if interests & opportunity_interests else 0
    career = 100 if goal and opportunity.career_areas.filter(pk=goal.career_id).exists() else 0
    gaps = {item["skill_id"]: item for item in skill_gaps(student)}
    offered = list(opportunity.skills.all())
    matching_gaps = [gaps[skill.id] for skill in offered if skill.id in gaps]
    skill_gap = round(sum(x["gap"] for x in matching_gaps) / len(matching_gaps)) if matching_gaps else 0
    level = 100 if matching_gaps and max(x["current"] for x in matching_gaps) <= 70 else 60 if offered else 50
    conflict = ScheduleCommitment.objects.filter(student=student, starts_at__lt=opportunity.ends_at or opportunity.starts_at, ends_at__gt=opportunity.starts_at).exists()
    schedule = 0 if conflict else 100
    parts = {"interest_alignment": interest, "career_relevance": career, "skill_gap_relevance": skill_gap, "level_compatibility": level, "schedule_compatibility": schedule}
    score = round(sum(parts[key] * WEIGHTS[name] / 100 for key, name in [("interest_alignment", "interest"), ("career_relevance", "career"), ("skill_gap_relevance", "skill_gap"), ("level_compatibility", "level"), ("schedule_compatibility", "schedule")]))
    reasons = []
    if matching_gaps: reasons.append("Addresses your " + ", ".join(x["skill"] for x in matching_gaps[:2]) + " skill gap.")
    if career: reasons.append("Supports your active career goal.")
    if interest: reasons.append("Matches one of your declared interests.")
    if conflict: reasons.append("Conflicts with an existing academic or personal commitment.")
    return score, parts, reasons, conflict


def available_opportunities():
    return __import__("opportunities.models", fromlist=["Opportunity"]).Opportunity.objects.filter(status="published", starts_at__gte=timezone.now()).prefetch_related("skills", "career_areas")
