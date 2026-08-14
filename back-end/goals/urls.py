from django.urls import path
from . import views

urlpatterns = [
    path("careers/", views.careers), path("careers/<int:pk>/", views.career_detail),
    path("student/career/", views.student_career), path("student/skills/", views.student_skills),
    path("student/skill-gaps/", views.student_gaps), path("student/roadmap/", views.student_roadmap),
    path("student/projects/", views.student_projects), path("student/career-readiness/", views.student_readiness),
]
