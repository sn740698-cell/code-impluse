from django.conf import settings
from django.db import models


class AcademicRecord(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="academic_records")
    subject = models.CharField(max_length=120)
    mark = models.DecimalField(max_digits=5, decimal_places=2)
    attendance_percent = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)


class ScheduleCommitment(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="commitments")
    title = models.CharField(max_length=160)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    kind = models.CharField(max_length=30, default="other")
