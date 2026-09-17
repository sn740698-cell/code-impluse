"""Ingestion pipeline to index student database records and live dashboard input into the Vector Database."""
from django.contrib.auth import get_user_model
from ai.vector_store import db
from goals.services import active_goal, readiness, skill_gaps
from students.models import StudentSkill
from academics.models import AcademicRecord, ScheduleCommitment
from interventions.models import AcademicRecoveryPlan
from opportunities.models import OpportunityInteraction

User = get_user_model()


def index_student_dashboard_data(user=None, profile_override=None):
    """Serialize and vector-index student information and dashboard inputs into the Vector Database."""
    profile_override = profile_override or {}

    # Determine student user ID and default name
    student_id = str(user.id) if user and hasattr(user, "id") and user.id else "demo_user"
    user_name = profile_override.get("name") or (user.get_full_name().strip() if (user and hasattr(user, "get_full_name")) else "Alex Rivera")
    if not user_name:
        user_name = "Alex Rivera"

    # Clear previous indexes for this student to keep database fresh
    db.clear_student_documents(student_id)
    doc_count = 0

    # 1. Profile & Target Goal Index
    goal_name = profile_override.get("target_career")
    if not goal_name and user:
        g = active_goal(user)
        if g:
            goal_name = g.career.name
    if not goal_name:
        goal_name = "Cybersecurity Engineer"

    readiness_val = readiness(user) if user else 58
    profile_text = (
        f"Student Profile: {user_name}. Target Career Goal: {goal_name}. "
        f"Career Readiness Score: {readiness_val}%."
    )
    db.add_document(
        doc_id=f"{student_id}_profile",
        student_id=student_id,
        category="profile",
        content=profile_text,
        metadata={"name": user_name, "goal": goal_name, "readiness": readiness_val}
    )
    doc_count += 1

    # 2. Recorded Skills & Proficiency Index
    student_skills = []
    if user and hasattr(user, "id") and user.id:
        for s in StudentSkill.objects.filter(student=user).select_related("skill"):
            student_skills.append(f"{s.skill.name}: {s.proficiency}%")
    if profile_override.get("skills"):
        for s in profile_override["skills"]:
            if isinstance(s, dict):
                student_skills.append(f"{s.get('name')}: {s.get('proficiency')}%")

    if not student_skills:
        student_skills = ["Python: 65%", "Linux: 30%", "Networking: 25%"]

    skills_text = f"Student Recorded Skills: {', '.join(student_skills)}."
    db.add_document(
        doc_id=f"{student_id}_skills",
        student_id=student_id,
        category="skills",
        content=skills_text,
        metadata={"skills": student_skills}
    )
    doc_count += 1

    # 3. Skill Gaps Index
    g_list = skill_gaps(user) if user and hasattr(user, "id") and user.id else []
    if g_list:
        gaps_text = "Identified Skill Gaps: " + ", ".join([f"{x.get('skill', '')} (gap: {x.get('gap', '')}%)" for x in g_list[:5]])
    else:
        gaps_text = "Identified Skill Gaps: Security Fundamentals (65% gap), Networking (55% gap), Linux Admin (45% gap)."

    db.add_document(
        doc_id=f"{student_id}_skill_gaps",
        student_id=student_id,
        category="skill_gaps",
        content=gaps_text,
        metadata={"gaps_raw": g_list}
    )
    doc_count += 1

    # 4. Academic Records & Attendance Index
    academics_list = []
    if user and hasattr(user, "id") and user.id:
        for ar in AcademicRecord.objects.filter(student=user):
            academics_list.append(f"Subject: {ar.subject}, Mark: {ar.mark}, Attendance: {ar.attendance_percent}%")

    if not academics_list:
        academics_list = ["Subject: DBMS, Mark: 58%, Attendance: 72%", "Subject: Computer Networks, Mark: 74%, Attendance: 88%"]

    academics_text = "Academic Records & Marks: " + "; ".join(academics_list) + "."
    db.add_document(
        doc_id=f"{student_id}_academics",
        student_id=student_id,
        category="academics",
        content=academics_text,
        metadata={"records": academics_list}
    )
    doc_count += 1

    # 5. Schedule Commitments & Exams Index
    commitments_list = []
    if user and hasattr(user, "id") and user.id:
        for c in ScheduleCommitment.objects.filter(student=user):
            commitments_list.append(f"{c.title} ({c.kind})")

    if not commitments_list:
        commitments_list = ["DBMS Exam on Aug 24th", "Lab Assessment on Aug 28th"]

    commit_text = "Schedule Commitments & Exams: " + ", ".join(commitments_list) + "."
    db.add_document(
        doc_id=f"{student_id}_commitments",
        student_id=student_id,
        category="commitments",
        content=commit_text,
        metadata={"commitments": commitments_list}
    )
    doc_count += 1

    # 6. Academic Recovery Plans Index
    recovery_list = []
    if user and hasattr(user, "id") and user.id:
        for rp in AcademicRecoveryPlan.objects.filter(student=user, active=True):
            recovery_list.append(f"Subject: {rp.subject}, Study Hours: {rp.weekly_hours} hrs/week")

    if not recovery_list:
        recovery_list = ["DBMS Academic Recovery Plan (7 hrs/week study plan)"]

    recovery_text = "Active Academic Recovery Plans: " + ", ".join(recovery_list) + "."
    db.add_document(
        doc_id=f"{student_id}_recovery",
        student_id=student_id,
        category="recovery",
        content=recovery_text,
        metadata={"recovery_plans": recovery_list}
    )
    doc_count += 1

    # 7. Saved/Registered Opportunities Index
    opps_list = []
    if user and hasattr(user, "id") and user.id:
        for interaction in OpportunityInteraction.objects.filter(student=user).select_related("opportunity"):
            opps_list.append(f"{interaction.opportunity.title} (Type: {interaction.opportunity.type})")

    if not opps_list:
        opps_list = ["Networking Fundamentals Workshop (Aug 22nd, 91% match)"]

    opps_text = "Saved & Registered Opportunities: " + ", ".join(opps_list) + "."
    db.add_document(
        doc_id=f"{student_id}_opportunities",
        student_id=student_id,
        category="opportunities",
        content=opps_text,
        metadata={"opportunities": opps_list}
    )
    doc_count += 1

    # 8. Extra Dashboard Inputs Index (if provided)
    dashboard_inputs = profile_override.get("dashboard_data") or profile_override.get("extra_info")
    if dashboard_inputs:
        input_text = f"Live Dashboard Data Input: {dashboard_inputs}"
        db.add_document(
            doc_id=f"{student_id}_dashboard_input",
            student_id=student_id,
            category="dashboard_input",
            content=input_text,
            metadata={"raw": dashboard_inputs}
        )
        doc_count += 1

    return doc_count
