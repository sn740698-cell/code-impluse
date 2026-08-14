from django.conf import settings
from django.db import models


class StudentCareerGoal(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="career_goals")
    career = models.ForeignKey("goals.Career", on_delete=models.CASCADE, related_name="student_goals")
    target_level = models.PositiveSmallIntegerField(default=80)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["student", "career"], name="unique_student_career_goal")]


class StudentSkill(models.Model):
    class Source(models.TextChoices):
        SELF_REPORTED = "self_reported", "Self reported"
        ASSESSMENT = "assessment", "Assessment"
        ACADEMIC = "academic", "Academic"
        PROJECT = "project", "Project"
        CERTIFICATION = "certification", "Certification"
        WORKSHOP = "workshop", "Workshop"

    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="skills")
    skill = models.ForeignKey("goals.Skill", on_delete=models.CASCADE, related_name="student_records")
    proficiency = models.PositiveSmallIntegerField(help_text="0-100")
    source = models.CharField(max_length=20, choices=Source.choices, default=Source.SELF_REPORTED)
    evidence = models.TextField(blank=True)
    demonstrated = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["student", "skill", "source"], name="unique_student_skill_source")]


class MilestoneProgress(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="milestone_progress")
    milestone = models.ForeignKey("goals.RoadmapMilestone", on_delete=models.CASCADE, related_name="student_progress")
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["student", "milestone"], name="unique_student_milestone")]
