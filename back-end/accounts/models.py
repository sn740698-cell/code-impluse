from django.conf import settings
from django.db import models


class Profile(models.Model):
    class Role(models.TextChoices):
        STUDENT = "student", "Student"
        TEACHER = "teacher", "Teacher"
        ADMIN = "admin", "Admin"

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=12, choices=Role.choices, default=Role.STUDENT)
    interests = models.JSONField(default=list, blank=True)
    weekly_commitment_hours = models.PositiveSmallIntegerField(default=0)
