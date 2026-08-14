from django.conf import settings
from django.db import models


class RecommendationAudit(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    opportunity = models.ForeignKey("opportunities.Opportunity", on_delete=models.CASCADE)
    score = models.PositiveSmallIntegerField()
    score_breakdown = models.JSONField(default=dict)
    reasons = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
