from collections import defaultdict
from students.models import StudentSkill


def active_goal(student):
    return student.career_goals.filter(is_active=True).select_related("career").first()


def skill_gaps(student, career=None):
    goal = active_goal(student)
    career = career or (goal.career if goal else None)
    if not career:
        return []
    skills = defaultdict(list)
    for item in StudentSkill.objects.filter(student=student).select_related("skill"):
        skills[item.skill_id].append(item.proficiency)
    gaps = []
    for required in career.required_skills.select_related("skill"):
        current = round(sum(skills[required.skill_id]) / len(skills[required.skill_id])) if skills[required.skill_id] else 0
        gap = max(0, required.required_proficiency - current)
        blocked_by = [p.name for p in required.skill.prerequisites.all()
                      if not skills[p.id] or max(skills[p.id]) < 40]
        priority = gap * required.importance + (1000 if required.is_foundational and gap else 0)
        gaps.append({"skill_id": required.skill_id, "skill": required.skill.name, "current": current,
                     "required": required.required_proficiency, "gap": gap, "importance": required.importance,
                     "state": "Strong" if current >= required.required_proficiency else "Developing" if current >= 45 else "Beginner" if current else "Missing",
                     "blocked_by": blocked_by, "priority": priority})
    return sorted(gaps, key=lambda value: value["priority"], reverse=True)


def readiness(student):
    gaps = skill_gaps(student)
    if not gaps: return 0
    total_weight = sum(item["importance"] for item in gaps)
    return round(sum(min(item["current"], item["required"]) / item["required"] * item["importance"] for item in gaps) / total_weight * 100)
