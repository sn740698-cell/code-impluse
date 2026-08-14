from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Career, CareerSkill, Skill
from .services import readiness, skill_gaps
from students.models import StudentCareerGoal, StudentSkill


class CareerGapTests(TestCase):
    def test_foundational_gap_is_prioritized(self):
        user = get_user_model().objects.create_user("student")
        career = Career.objects.create(name="Security Engineer")
        network = Skill.objects.create(name="Networking")
        python = Skill.objects.create(name="Python")
        CareerSkill.objects.create(career=career, skill=network, required_proficiency=80, importance=80, is_foundational=True)
        CareerSkill.objects.create(career=career, skill=python, required_proficiency=70, importance=50)
        StudentCareerGoal.objects.create(student=user, career=career)
        StudentSkill.objects.create(student=user, skill=python, proficiency=65)
        gaps = skill_gaps(user)
        self.assertEqual(gaps[0]["skill"], "Networking")
        self.assertLess(readiness(user), 100)
