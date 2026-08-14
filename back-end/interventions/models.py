from django.conf import settings
from django.db import models


class AcademicRecoveryPlan(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="recovery_plans")
    subject = models.CharField(max_length=120)
    weekly_hours = models.DecimalField(max_digits=4, decimal_places=1)
    active = models.BooleanField(default=True)
    due_date = models.DateField(null=True, blank=True)
