from django.urls import path
from . import views

urlpatterns = [
    path("opportunities/", views.opportunity_list), path("opportunities/recommended/", views.recommended), path("opportunities/<int:pk>/", views.opportunity_detail), path("opportunities/create/", views.create_opportunity),
    path("opportunities/<int:pk>/save/", views.interaction, {"action": "save"}), path("opportunities/<int:pk>/register/", views.interaction, {"action": "register"}), path("opportunities/<int:pk>/feedback/", views.feedback),
    path("student/opportunities/", views.student_opportunities), path("student/opportunities/saved/", views.student_opportunities, {"state": "saved"}), path("student/opportunities/registered/", views.student_opportunities, {"state": "registered"}), path("teacher/opportunities/analytics/", views.teacher_analytics),
]
