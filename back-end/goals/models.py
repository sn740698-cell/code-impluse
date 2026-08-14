from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    prerequisites = models.ManyToManyField("self", symmetrical=False, blank=True)

    def __str__(self):
        return self.name


class Career(models.Model):
    name = models.CharField(max_length=140, unique=True)
    description = models.TextField(blank=True)
    fields_to_watch = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.name


class CareerSkill(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name="required_skills")
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    required_proficiency = models.PositiveSmallIntegerField(default=70)
    importance = models.PositiveSmallIntegerField(default=50)
    is_foundational = models.BooleanField(default=False)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["career", "skill"], name="unique_career_skill")]


class CareerPath(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name="paths")
    name = models.CharField(max_length=120)
    description = models.TextField(blank=True)
    skills = models.ManyToManyField(Skill, blank=True)


class RoadmapStage(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name="roadmap_stages")
    name = models.CharField(max_length=100)
    position = models.PositiveSmallIntegerField(default=0)
    skills = models.ManyToManyField(Skill, blank=True)
    suggested_projects = models.JSONField(default=list, blank=True)
    suggested_resources = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["position"]


class RoadmapMilestone(models.Model):
    stage = models.ForeignKey(RoadmapStage, on_delete=models.CASCADE, related_name="milestones")
    title = models.CharField(max_length=160)
    position = models.PositiveSmallIntegerField(default=0)


class ProjectRecommendation(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=160)
    description = models.TextField()
    difficulty = models.CharField(max_length=30, default="Beginner")
    required_skills = models.ManyToManyField(Skill, related_name="project_requirements")
    develops_skills = models.ManyToManyField(Skill, related_name="project_developments")
