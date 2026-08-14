from django.conf import settings
from django.db import models


class Opportunity(models.Model):
    class Type(models.TextChoices):
        WORKSHOP = "workshop", "Workshop"
        WEBINAR = "webinar", "Webinar"
        SEMINAR = "seminar", "Seminar"
        HACKATHON = "hackathon", "Hackathon"
        COMPETITION = "competition", "Competition"
        BOOTCAMP = "bootcamp", "Bootcamp"
        GUEST_LECTURE = "guest_lecture", "Guest lecture"
        CLUB = "club_activity", "Club activity"
        CAREER = "career_session", "Career session"

    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"
        CANCELLED = "cancelled", "Cancelled"

    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=30, choices=Type.choices)
    category = models.CharField(max_length=100, blank=True)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField(null=True, blank=True)
    speaker = models.CharField(max_length=160, blank=True)
    organization = models.CharField(max_length=160, blank=True)
    skills = models.ManyToManyField("goals.Skill", blank=True)
    interests = models.JSONField(default=list, blank=True)
    career_areas = models.ManyToManyField("goals.Career", blank=True)
    eligibility = models.TextField(blank=True)
    registration_deadline = models.DateTimeField(null=True, blank=True)
    registration_link = models.URLField(blank=True)
    max_participants = models.PositiveIntegerField(null=True, blank=True)
    location = models.CharField(max_length=240, blank=True)
    poster = models.URLField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="created_opportunities")
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.DRAFT)
    created_at = models.DateTimeField(auto_now_add=True)


class OpportunityInteraction(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="opportunity_interactions")
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name="interactions")
    viewed_at = models.DateTimeField(null=True, blank=True)
    saved_at = models.DateTimeField(null=True, blank=True)
    registered_at = models.DateTimeField(null=True, blank=True)
    attended_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["student", "opportunity"], name="unique_opportunity_interaction")]


class OpportunityFeedback(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name="feedback")
    rating = models.PositiveSmallIntegerField()
    useful = models.BooleanField()
    skills_learned = models.ManyToManyField("goals.Skill", blank=True)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["student", "opportunity"], name="unique_opportunity_feedback")]
