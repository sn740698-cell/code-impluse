from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta

from accounts.models import Profile
from goals.models import (
    Skill, Career, CareerSkill, RoadmapStage, RoadmapMilestone, ProjectRecommendation
)
from students.models import StudentCareerGoal, StudentSkill, MilestoneProgress
from opportunities.models import Opportunity, OpportunityInteraction

User = get_user_model()


class Command(BaseCommand):
    help = "Seeds initial demo data for AI Career Compass & Opportunity Recommendation System."

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Starting database seeding..."))

        # 1. Create Demo Users
        student_user, _ = User.objects.get_or_create(
            username="alex",
            defaults={
                "email": "alex.rivera@university.edu",
                "first_name": "Alex",
                "last_name": "Rivera"
            }
        )
        student_user.set_password("student123")
        student_user.save()

        Profile.objects.update_or_create(
            user=student_user,
            defaults={
                "role": Profile.Role.STUDENT,
                "interests": ["Cybersecurity", "Network Architecture", "AI Security", "Sports Analytics", "Open Source"],
                "weekly_commitment_hours": 7
            }
        )

        teacher_user, _ = User.objects.get_or_create(
            username="sarah",
            defaults={
                "email": "prof.sarah@university.edu",
                "first_name": "Prof. Sarah",
                "last_name": "Jenkins",
                "is_staff": True
            }
        )
        teacher_user.set_password("teacher123")
        teacher_user.save()

        Profile.objects.update_or_create(
            user=teacher_user,
            defaults={
                "role": Profile.Role.TEACHER,
                "interests": ["Cybersecurity Education", "Network Labs", "Data Science"],
                "weekly_commitment_hours": 0
            }
        )

        # 2. Create Core Skills
        skills_data = [
            ("Python", "High-level programming language used in automation, security scripting, and AI."),
            ("Linux Admin", "Linux system administration, bash scripting, file permissions, and process management."),
            ("Networking", "Foundational computer networking including OSI layers, TCP/IP protocol suite, subnetting, and DNS."),
            ("Operating Systems", "OS fundamentals, memory allocation, process scheduling, and kernel privilege management."),
            ("Security Fundamentals", "Core principles of confidentiality, integrity, availability, authentication, and access control."),
            ("Web Security", "Understanding web application vulnerabilities including OWASP Top 10, XSS, and SQL injection."),
            ("Packet Analysis", "Inspecting and analyzing network traffic using tools like Wireshark and tcpdump."),
            ("TCP/IP", "Transmission Control Protocol and Internet Protocol stack analysis."),
            ("Wireshark", "Network packet analyzer tool usage."),
            ("Subnetting", "IPv4/IPv6 address partitioning and CIDR calculation."),
            ("OWASP Top 10", "Web application vulnerability benchmarks."),
            ("Burp Suite", "Web application security testing suite."),
            ("Data Analysis", "Analyzing data using Pandas, NumPy, and visualization tools."),
            ("Sports Tech", "IoT and wearable data modeling in athletic analytics."),
            ("Visualization", "Charting performance graphs and telemetry dashboards.")
        ]

        skill_objs = {}
        for name, desc in skills_data:
            s_obj, _ = Skill.objects.get_or_create(name=name, defaults={"description": desc})
            skill_objs[name] = s_obj

        # Link prerequisites
        skill_objs["Security Fundamentals"].prerequisites.add(skill_objs["Networking"], skill_objs["Operating Systems"])
        skill_objs["Web Security"].prerequisites.add(skill_objs["Security Fundamentals"])

        # 3. Create Careers
        cyber_career, _ = Career.objects.get_or_create(
            name="Cybersecurity Engineer",
            defaults={
                "description": "Protect systems, networks, and applications from cyber threats, unauthorized access, and vulnerabilities.",
                "fields_to_watch": [
                    {"name": "AI Security", "why": "Securing LLMs against prompt injection, model poisoning, and data extraction attacks."},
                    {"name": "Cloud Security", "why": "Securing cloud-native multi-tenant architectures and IAM governance."},
                    {"name": "Application Security (AppSec)", "why": "Integrating security directly into CI/CD dev pipelines (DevSecOps)."},
                    {"name": "Software Supply Chain Security", "why": "Verifying open-source dependencies and preventing malicious package injections."}
                ]
            }
        )

        ai_career, _ = Career.objects.get_or_create(
            name="Full Stack AI Engineer",
            defaults={
                "description": "Develop production LLM web applications, vector index pipelines, and scalable API backend microservices.",
                "fields_to_watch": [
                    {"name": "Agentic Workflows", "why": "Building multi-agent reasoning chains and autonomous tools."},
                    {"name": "Vector Index Optimization", "why": "HNSW and IVF indexing for billion-scale retrieval."}
                ]
            }
        )

        # 4. Career Required Skills
        career_skills = [
            (cyber_career, skill_objs["Python"], 85, 80, False),
            (cyber_career, skill_objs["Linux Admin"], 75, 70, False),
            (cyber_career, skill_objs["Networking"], 80, 90, True),
            (cyber_career, skill_objs["Operating Systems"], 75, 75, False),
            (cyber_career, skill_objs["Security Fundamentals"], 85, 85, True),
        ]
        for car, sk, req_prof, imp, foundational in career_skills:
            CareerSkill.objects.update_or_create(
                career=car, skill=sk,
                defaults={"required_proficiency": req_prof, "importance": imp, "is_foundational": foundational}
            )

        # 5. Roadmap Stages & Milestones
        stage1, _ = RoadmapStage.objects.get_or_create(
            career=cyber_career, position=1,
            defaults={
                "name": "1. FOUNDATIONS",
                "suggested_projects": ["Build a Custom Wireshark Packet Analyzer in Python"],
                "suggested_resources": ["Wireshark User Guide, Linux Command Line Bible"]
            }
        )
        stage1.skills.set([skill_objs["Networking"], skill_objs["Linux Admin"], skill_objs["Operating Systems"]])

        m101, _ = RoadmapMilestone.objects.get_or_create(stage=stage1, position=1, defaults={"title": "OSI Model & 7 Layers Breakdown"})
        m102, _ = RoadmapMilestone.objects.get_or_create(stage=stage1, position=2, defaults={"title": "TCP/IP Suite & Packet Formats"})
        m103, _ = RoadmapMilestone.objects.get_or_create(stage=stage1, position=3, defaults={"title": "IP Addressing, Subnetting & CIDR Notation"})
        m104, _ = RoadmapMilestone.objects.get_or_create(stage=stage1, position=4, defaults={"title": "DNS, HTTP/HTTPS & Protocol Flow"})
        m105, _ = RoadmapMilestone.objects.get_or_create(stage=stage1, position=5, defaults={"title": "Linux File Permissions & Shell Scripting"})

        stage2, _ = RoadmapStage.objects.get_or_create(
            career=cyber_career, position=2,
            defaults={
                "name": "2. CORE SECURITY",
                "suggested_projects": ["Vulnerable Web Application Exploitation & Patch Lab"],
                "suggested_resources": ["OWASP Testing Guide, PortSwigger Web Security Academy"]
            }
        )
        stage2.skills.set([skill_objs["Security Fundamentals"], skill_objs["Web Security"]])
        m201, _ = RoadmapMilestone.objects.get_or_create(stage=stage2, position=1, defaults={"title": "Symmetric & Asymmetric Encryption Concepts"})
        m202, _ = RoadmapMilestone.objects.get_or_create(stage=stage2, position=2, defaults={"title": "OWASP Top 10 Web Vulnerabilities Analysis"})
        m203, _ = RoadmapMilestone.objects.get_or_create(stage=stage2, position=3, defaults={"title": "Nmap Port Scanning & Network Reconnaissance"})

        stage3, _ = RoadmapStage.objects.get_or_create(
            career=cyber_career, position=3,
            defaults={
                "name": "3. ADVANCED",
                "suggested_projects": ["Enterprise Virtual Network Defense & Attack Simulation"],
                "suggested_resources": ["SANS Penetration Testing Guides"]
            }
        )
        m301, _ = RoadmapMilestone.objects.get_or_create(stage=stage3, position=1, defaults={"title": "Metasploit Framework Exploitation Pipeline"})
        m302, _ = RoadmapMilestone.objects.get_or_create(stage=stage3, position=2, defaults={"title": "SIEM Log Analysis & Threat Hunting"})

        # Milestone Progress for Alex Rivera
        MilestoneProgress.objects.update_or_create(student=student_user, milestone=m101, defaults={"completed": True})
        MilestoneProgress.objects.update_or_create(student=student_user, milestone=m102, defaults={"completed": True})
        MilestoneProgress.objects.update_or_create(student=student_user, milestone=m103, defaults={"completed": False})

        # 6. Project Recommendations
        p1, _ = ProjectRecommendation.objects.get_or_create(
            career=cyber_career, title="Network Traffic Analyzer & Packet Sniffer",
            defaults={
                "description": "Develop a Python socket script that captures raw IP packets, decodes TCP/UDP headers, and logs anomalous network traffic patterns.",
                "difficulty": "Intermediate"
            }
        )
        p1.required_skills.set([skill_objs["Python"], skill_objs["Networking"], skill_objs["Linux Admin"]])
        p1.develops_skills.set([skill_objs["Packet Analysis"], skill_objs["TCP/IP"]])

        p2, _ = ProjectRecommendation.objects.get_or_create(
            career=cyber_career, title="Automated Vulnerability Port Scanner",
            defaults={
                "description": "Build an asynchronous port scanner that probes target hosts for open ports, banner grabs service names, and exports JSON reports.",
                "difficulty": "Beginner - Intermediate"
            }
        )
        p2.required_skills.set([skill_objs["Python"], skill_objs["Networking"]])

        # 7. Student Skills & Active Goal for Alex Rivera
        StudentCareerGoal.objects.update_or_create(
            student=student_user, career=cyber_career,
            defaults={"target_level": 80, "is_active": True}
        )

        student_skills_data = [
            (skill_objs["Python"], 65, StudentSkill.Source.ACADEMIC, "Scored 92% in Python Programming Coursework; Built Network Packet Sniffer script", True),
            (skill_objs["Linux Admin"], 30, StudentSkill.Source.SELF_REPORTED, "Basic Bash command usage reported in profile", False),
            (skill_objs["Networking"], 25, StudentSkill.Source.ASSESSMENT, "Scored 25% on Diagnostic Networking Fundamentals Assessment", True),
            (skill_objs["Operating Systems"], 45, StudentSkill.Source.ACADEMIC, "Enrolled in CS-312 Operating Systems; Grade 87%", True),
            (skill_objs["Security Fundamentals"], 20, StudentSkill.Source.SELF_REPORTED, "No formal certifications or completed coursework logged yet", False),
        ]
        for sk, prof, src, ev, dem in student_skills_data:
            StudentSkill.objects.update_or_create(
                student=student_user, skill=sk, source=src,
                defaults={"proficiency": prof, "evidence": ev, "demonstrated": dem}
            )

        # 8. Opportunities Catalog
        now = timezone.now()
        opp1, _ = Opportunity.objects.get_or_create(
            title="Networking Fundamentals & Protocol Analysis Workshop",
            defaults={
                "description": "Hands-on 3-hour practical lab covering TCP/IP protocol handshakes, subnet calculations, DNS troubleshooting, and packet capture using Wireshark.",
                "type": Opportunity.Type.WORKSHOP,
                "category": "Networking",
                "starts_at": now + timedelta(days=8),
                "ends_at": now + timedelta(days=8, hours=3),
                "speaker": "Dr. Marcus Vance (Senior Network Architect)",
                "organization": "Department of Computer Science & Cybersecurity",
                "location": "Campus Cyber Lab 302 / Online Hybrid",
                "registration_link": "https://university.edu/workshops/networking-101",
                "eligibility": "Open to all CS & IT Undergraduate Students",
                "max_participants": 40,
                "status": Opportunity.Status.PUBLISHED,
                "created_by": teacher_user
            }
        )
        opp1.skills.set([skill_objs["Networking"], skill_objs["TCP/IP"], skill_objs["Wireshark"], skill_objs["Subnetting"]])
        opp1.career_areas.set([cyber_career])

        opp2, _ = Opportunity.objects.get_or_create(
            title="Sports Analytics & Performance Data Hackathon",
            defaults={
                "description": "48-hour hackathon leveraging wearable GPS sensor data and match statistics to model player performance and tactical game insights.",
                "type": Opportunity.Type.HACKATHON,
                "category": "Data Science",
                "starts_at": now + timedelta(days=22),
                "ends_at": now + timedelta(days=24),
                "speaker": "Coach Rachel Miller & Data Analytics Team",
                "organization": "University Athletics & Sports Tech Club",
                "location": "University Sports Complex",
                "registration_link": "https://sportsanalytics.university.edu/hackathon",
                "eligibility": "Student Athletes & Data Science Enthusiasts",
                "max_participants": 100,
                "status": Opportunity.Status.PUBLISHED,
                "created_by": teacher_user
            }
        )
        opp2.skills.set([skill_objs["Python"], skill_objs["Data Analysis"], skill_objs["Sports Tech"], skill_objs["Visualization"]])
        opp2.career_areas.set([cyber_career, ai_career])

        opp3, _ = Opportunity.objects.get_or_create(
            title="Ethical Hacking & Web Penetration Testing Seminar",
            defaults={
                "description": "Interactive session exploring web vulnerability exploitation, SQL injection, cross-site scripting (XSS), and secure code remediation.",
                "type": Opportunity.Type.SEMINAR,
                "category": "Security",
                "starts_at": now + timedelta(days=29),
                "ends_at": now + timedelta(days=29, hours=2, minutes=30),
                "speaker": "Elena Rostova (Principal Security Researcher)",
                "organization": "IEEE Cybersecurity Student Chapter",
                "location": "Auditorium Hall B",
                "registration_link": "https://ieee.university.edu/web-pen-test",
                "eligibility": "Completion of Foundations or Intermediate Security",
                "max_participants": 60,
                "status": Opportunity.Status.PUBLISHED,
                "created_by": teacher_user
            }
        )
        opp3.skills.set([skill_objs["Web Security"], skill_objs["OWASP Top 10"], skill_objs["Burp Suite"]])
        opp3.career_areas.set([cyber_career])

        # Interactions
        OpportunityInteraction.objects.update_or_create(student=student_user, opportunity=opp1, defaults={"viewed_at": now})
        OpportunityInteraction.objects.update_or_create(student=student_user, opportunity=opp2, defaults={"saved_at": now})
        OpportunityInteraction.objects.update_or_create(student=student_user, opportunity=opp3, defaults={"registered_at": now})

        self.stdout.write(self.style.SUCCESS("Database successfully seeded with demo accounts, careers, skills, roadmaps, and opportunities!"))
