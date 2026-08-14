// Unified API Service Layer for AI Career Compass & Opportunity Recommendation System

// Vite proxies /api to Django in development. Set VITE_API_BASE_URL when the
// frontend and backend are deployed on separate hosts.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[API] Endpoint ${endpoint} offline, returning enriched fallback model.`, error);
    return null;
  }
}

// Student Profile Data Model
export const MOCK_STUDENT_PROFILE = {
  id: 1,
  name: "Alex Rivera",
  email: "alex.rivera@university.edu",
  role: "student",
  major: "Computer Science & Cybersecurity",
  academic_year: "3rd Year (Junior)",
  gpa: "3.84 / 4.0",
  academic_risk: "DBMS (48%) - Active Academic Recovery Plan (7 hrs/week)",
  commitments: [
    { title: "DBMS Academic Recovery Plan", hours_per_week: 7, priority: "High" },
    { title: "Varsity Football Team", hours_per_week: 10, priority: "Medium" }
  ],
  interests: ["Cybersecurity", "Network Architecture", "AI Security", "Sports Analytics", "Open Source"],
  target_career: "Cybersecurity Engineer",
  career_readiness: 58,
  strongest_area: "Python Programming (65%)",
  largest_gap: "Networking Fundamentals (25%)"
};

export const MOCK_USER = MOCK_STUDENT_PROFILE;

// Career Goals & Domain Branches
export const MOCK_CAREER_GOALS = [
  {
    id: 1,
    name: "Cybersecurity Engineer",
    description: "Protect systems, networks, and applications from cyber threats, unauthorized access, and vulnerabilities.",
    readiness: 58,
    strongest_area: "Python Programming",
    largest_gap: "Networking Fundamentals",
    fields_to_watch: [
      { name: "AI Security", why: "Securing LLMs against prompt injection, model poisoning, and data extraction attacks." },
      { name: "Cloud Security", why: "Securing cloud-native multi-tenant architectures and IAM governance." },
      { name: "Application Security (AppSec)", why: "Integrating security directly into CI/CD dev pipelines (DevSecOps)." },
      { name: "Software Supply Chain Security", why: "Verifying open-source dependencies and preventing malicious package injections." }
    ],
    branches: [
      { name: "Penetration Testing", readiness: 52, gap: "Web Security & Exploit Dev", req_skills: ["Python", "Linux", "Metasploit", "Web Security"] },
      { name: "Red Team Ops", readiness: 48, gap: "Active Directory & Evasion", req_skills: ["C/C++", "PowerShell", "Active Directory", "Assembly"] },
      { name: "SOC Analyst", readiness: 65, gap: "SIEM & Log Analysis", req_skills: ["Networking", "Linux", "Splunk", "Incident Response"] },
      { name: "Incident Response", readiness: 50, gap: "Memory Forensics", req_skills: ["Networking", "Operating Systems", "Volatiles", "Malware Analysis"] },
      { name: "Cloud Security", readiness: 45, gap: "AWS/Azure IAM & Terraform", req_skills: ["Linux", "Docker", "AWS IAM", "Kubernetes"] },
      { name: "Application Security", readiness: 62, gap: "SAST/DAST Tooling", req_skills: ["Python", "JavaScript", "OWASP Top 10", "Code Audit"] },
      { name: "Digital Forensics", readiness: 42, gap: "Disk Imaging & EnCase", req_skills: ["File Systems", "Operating Systems", "FTK", "Registry Analysis"] }
    ]
  },
  {
    id: 2,
    name: "Full Stack AI Engineer",
    description: "Develop production LLM web applications, vector index pipelines, and scalable API backend microservices.",
    readiness: 84,
    strongest_area: "Python & React",
    largest_gap: "Vector Search & RAG Scaling",
    fields_to_watch: [
      { name: "Agentic Workflows", why: "Building multi-agent reasoning chains and autonomous tools." },
      { name: "Vector Index Optimization", why: "HNSW and IVF indexing for billion-scale retrieval." }
    ],
    branches: [
      { name: "LLM Systems Engineer", readiness: 82, gap: "CUDA & TensorRT", req_skills: ["Python", "PyTorch", "CUDA", "FastAPI"] },
      { name: "AI Product Engineer", readiness: 88, gap: "UI/UX Micro-Interactions", req_skills: ["React", "TypeScript", "LangChain", "Vector DB"] }
    ]
  }
];

export const MOCK_CAREERS = MOCK_CAREER_GOALS;

// Student Detailed Skill Analysis & Sources
export const MOCK_STUDENT_SKILLS = [
  {
    name: "Python",
    current: 65,
    required: 85,
    gap: 20,
    state: "Strong", // Strong, Developing, Beginner, Missing
    source: "Academic & Project",
    is_demonstrated: true,
    evidence: "Scored 92% in Python Programming Coursework; Built Network Packet Sniffer script",
    action: "Practice advanced socket programming & concurrency"
  },
  {
    name: "Linux Admin",
    current: 30,
    required: 75,
    gap: 45,
    state: "Beginner",
    source: "Self-Reported",
    is_demonstrated: false,
    evidence: "Basic Bash command usage reported in profile",
    action: "Complete Linux Sysadmin Lab & Bash Automation project"
  },
  {
    name: "Networking",
    current: 25,
    required: 80,
    gap: 55,
    state: "Missing",
    source: "Assessment Test",
    is_demonstrated: true,
    evidence: "Scored 25% on Diagnostic Networking Fundamentals Assessment",
    action: "Prioritize Networking Fundamentals Workshop & OSI/TCP-IP study"
  },
  {
    name: "Operating Systems",
    current: 45,
    required: 75,
    gap: 30,
    state: "Developing",
    source: "Academic Coursework",
    is_demonstrated: true,
    evidence: "Enrolled in CS-312 Operating Systems; Grade 87%",
    action: "Review memory management, processes, and kernel privilege levels"
  },
  {
    name: "Security Fundamentals",
    current: 20,
    required: 85,
    gap: 65,
    state: "Missing",
    source: "Self-Reported",
    is_demonstrated: false,
    evidence: "No formal certifications or completed coursework logged yet",
    action: "Requires Networking & OS prerequisites before advanced security modules"
  }
];

// Prerequisite Dependency Graph Data
export const MOCK_PREREQUISITE_CHAIN = [
  { step: 1, skill: "Networking", proficiency: 25, status: "Prerequisite Gap", required_before: "Linux & OS" },
  { step: 2, skill: "Linux Admin", proficiency: 30, status: "In Progress", required_before: "Security Fundamentals" },
  { step: 3, skill: "Operating Systems", proficiency: 45, status: "In Progress", required_before: "Security Fundamentals" },
  { step: 4, skill: "Security Fundamentals", proficiency: 20, status: "Locked", required_before: "Web Security & Tools" },
  { step: 5, skill: "Web Security", proficiency: 10, status: "Locked", required_before: "Specialization" },
  { step: 6, skill: "Penetration Testing / SOC", proficiency: 0, status: "Locked", required_before: "Target Role" }
];

// Personalized Career Roadmap
export const MOCK_CAREER_ROADMAP = [
  {
    stage_name: "1. FOUNDATIONS",
    position: 1,
    is_current_stage: true,
    skills: ["Networking Fundamentals", "Linux Command Line", "Operating Systems"],
    required_proficiency: 75,
    milestones: [
      { id: 101, title: "OSI Model & 7 Layers Breakdown", completed: true },
      { id: 102, title: "TCP/IP Suite & Packet Formats", completed: true },
      { id: 103, title: "IP Addressing, Subnetting & CIDR Notation", completed: false },
      { id: 104, title: "DNS, HTTP/HTTPS & Protocol Flow", completed: false },
      { id: 105, title: "Linux File Permissions & Shell Scripting", completed: false }
    ],
    projects: "Build a Custom Wireshark Packet Analyzer in Python",
    resources: "Wireshark User Guide, Linux Command Line Bible"
  },
  {
    stage_name: "2. CORE SECURITY",
    position: 2,
    is_current_stage: false,
    skills: ["Security Fundamentals", "Web Security", "Cryptography", "Security Tools"],
    required_proficiency: 80,
    milestones: [
      { id: 201, title: "Symmetric & Asymmetric Encryption Concepts", completed: false },
      { id: 202, title: "OWASP Top 10 Web Vulnerabilities Analysis", completed: false },
      { id: 203, title: "Nmap Port Scanning & Network Reconnaissance", completed: false }
    ],
    projects: "Vulnerable Web Application Exploitation & Patch Lab",
    resources: "OWASP Testing Guide, PortSwigger Web Security Academy"
  },
  {
    stage_name: "3. ADVANCED",
    position: 3,
    is_current_stage: false,
    skills: ["Penetration Testing", "Incident Response", "Cloud Security"],
    required_proficiency: 85,
    milestones: [
      { id: 301, title: "Metasploit Framework Exploitation Pipeline", completed: false },
      { id: 302, title: "SIEM Log Analysis & Threat Hunting", completed: false }
    ],
    projects: "Enterprise Virtual Network Defense & Attack Simulation",
    resources: "SANS Penetration Testing Guides"
  }
];

export const MOCK_ROADMAP = MOCK_CAREER_ROADMAP;

// Recommended Projects based on skill level
export const MOCK_PROJECT_RECOMMENDATIONS = [
  {
    id: 1,
    title: "Network Traffic Analyzer & Packet Sniffer",
    difficulty: "Intermediate",
    required_skills: ["Python", "Networking", "Linux"],
    develops_skills: ["Packet Analysis", "TCP/IP Protocols", "Socket Programming"],
    description: "Develop a Python socket script that captures raw IP packets, decodes TCP/UDP headers, and logs anomalous network traffic patterns."
  },
  {
    id: 2,
    title: "Automated Vulnerability Port Scanner",
    difficulty: "Beginner - Intermediate",
    required_skills: ["Python", "Networking"],
    develops_skills: ["Port Scanning", "Nmap Scripting Engine", "Network Reconnaissance"],
    description: "Build an asynchronous port scanner that probes target hosts for open ports, banner grabs service names, and exports JSON reports."
  },
  {
    id: 3,
    title: "Web Security OWASP Scanner & Exploitation Lab",
    difficulty: "Advanced",
    required_skills: ["Web Security", "Linux", "Python"],
    develops_skills: ["SQL Injection Defense", "XSS Prevention", "Security Headers"],
    description: "Construct a vulnerable web API and write automated test scripts to identify and patch SQL injection and XSS flaws."
  }
];

// Opportunities & Multi-Signal Recommendation Engine Dataset
export const MOCK_OPPORTUNITIES_CATALOG = [
  {
    id: 1,
    title: "Networking Fundamentals & Protocol Analysis Workshop",
    type: "Workshop",
    organization: "Department of Computer Science & Cybersecurity",
    speaker: "Prof. Sarah Jenkins (Faculty Advisor)",
    starts_at: "2026-08-22T10:00:00Z",
    ends_at: "2026-08-22T13:00:00Z",
    registration_deadline: "2026-08-20T23:59:59Z",
    location: "Campus Cyber Lab 302 / Online Hybrid",
    registration_link: "https://university.edu/workshops/networking-101",
    eligibility: "Open to all CS & IT Undergraduate Students",
    max_participants: 40,
    skills: ["Networking", "TCP/IP", "Wireshark", "Subnetting"],
    interests: ["Cybersecurity", "Network Architecture"],
    career_areas: ["Cybersecurity Engineer", "SOC Analyst"],
    description: "Hands-on 3-hour practical lab covering TCP/IP protocol handshakes, subnet calculations, DNS troubleshooting, and packet capture using Wireshark.",
    
    match_score: 91,
    score_breakdown: {
      interest_match: 90,
      career_match: 95,
      skill_gap_match: 94,
      level_compatibility: 88,
      schedule_compatibility: 82
    },
    why_recommended: "Networking is currently your largest skill gap (25% vs 80% required) and is an essential prerequisite for your target goal of Cybersecurity Engineer.",
    career_relevance: "High - Directly builds foundational networking skills required for Stage 1 of your roadmap.",
    
    has_conflict: true,
    conflict_warning: "Academic Warning: Your DBMS Exam is scheduled for Monday Aug 24th, and you have an active DBMS Recovery Plan (7 hrs/week). Attending this 3-hour workshop may reduce available study time.",
    alternative_suggestion: "Consider the Wednesday 6:00 PM Online Async Networking Webinar instead.",

    status: "recommended",
    feedback_submitted: false
  },
  {
    id: 2,
    title: "Sports Analytics & Performance Data Hackathon",
    type: "Hackathon",
    organization: "University Athletics & Sports Tech Club",
    speaker: "Coach Rachel Miller & Data Analytics Team",
    starts_at: "2026-09-05T09:00:00Z",
    ends_at: "2026-09-06T17:00:00Z",
    registration_deadline: "2026-09-01T23:59:59Z",
    location: "University Sports Complex",
    registration_link: "https://sportsanalytics.university.edu/hackathon",
    eligibility: "Student Athletes & Data Science Enthusiasts",
    max_participants: 100,
    skills: ["Python", "Data Analysis", "Sports Tech", "Visualization"],
    interests: ["Sports Analytics", "Football", "Open Source"],
    career_areas: ["Data Scientist", "Cybersecurity Engineer"],
    description: "48-hour hackathon leveraging wearable GPS sensor data and match statistics to model player performance and tactical game insights.",
    
    match_score: 86,
    score_breakdown: {
      interest_match: 98,
      career_match: 75,
      skill_gap_match: 80,
      level_compatibility: 90,
      schedule_compatibility: 88
    },
    why_recommended: "Combines your declared interest in Sports Analytics and Varsity Football commitment with Python data analysis practice.",
    career_relevance: "Medium - Develops data processing and scripting proficiency in Python.",
    
    has_conflict: false,
    conflict_warning: null,
    alternative_suggestion: null,

    status: "saved",
    feedback_submitted: false
  },
  {
    id: 3,
    title: "Ethical Hacking & Web Penetration Testing Seminar",
    type: "Seminar",
    organization: "IEEE Cybersecurity Student Chapter",
    speaker: "Elena Rostova (Principal Security Researcher)",
    starts_at: "2026-09-12T14:00:00Z",
    ends_at: "2026-09-12T16:30:00Z",
    registration_deadline: "2026-09-10T23:59:59Z",
    location: "Auditorium Hall B",
    registration_link: "https://ieee.university.edu/web-pen-test",
    eligibility: "Completion of Foundations or Intermediate Security",
    max_participants: 60,
    skills: ["Web Security", "OWASP Top 10", "Burp Suite"],
    interests: ["Cybersecurity", "AI Security"],
    career_areas: ["Cybersecurity Engineer", "Penetration Testing"],
    description: "Interactive session exploring web vulnerability exploitation, SQL injection, cross-site scripting (XSS), and secure code remediation.",
    
    match_score: 78,
    score_breakdown: {
      interest_match: 92,
      career_match: 90,
      skill_gap_match: 60,
      level_compatibility: 65,
      schedule_compatibility: 85
    },
    why_recommended: "Relevant to your Cybersecurity Engineer goal. However, completing Networking & OS prerequisites first will maximize learning outcomes.",
    career_relevance: "High - Stage 2 Core Security module.",
    
    has_conflict: false,
    conflict_warning: null,
    alternative_suggestion: null,

    status: "registered",
    feedback_submitted: false
  }
];

export const MOCK_OPPORTUNITIES = MOCK_OPPORTUNITIES_CATALOG;

// Teacher Opportunity Analytics
export const MOCK_TEACHER_OPPORTUNITY_ANALYTICS = {
  total_published: 8,
  total_views: 342,
  total_saves: 148,
  total_registrations: 112,
  total_attended: 94,
  avg_student_rating: 4.6,
  top_demanded_skills: ["Networking", "Python", "Web Security", "Docker"],
  recent_feedback: [
    { student: "Jordan Lee", workshop: "Networking Fundamentals", rating: 5, useful: true, comment: "Extremely helpful lab! The Wireshark packet capture exercises made TCP handshakes very clear." },
    { student: "Morgan Taylor", workshop: "Python Automation", rating: 4, useful: true, comment: "Good practical scripts. Would love more advanced socket programming examples." }
  ]
};

// // Authentication API Functions
export async function loginApi({ email, password, role }) {
  const data = await fetchApi('/accounts/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
  return data?.user || null;
}

export async function logoutApi() {
  return fetchApi('/accounts/logout/', { method: 'POST' });
}

export async function getCurrentUserApi() {
  const data = await fetchApi('/accounts/me/');
  return data?.user || null;
}

// API Functions
export async function getStudentCareerGoal() {
  const data = await fetchApi('/student/career/');
  return (data && data.career) ? data : { career: MOCK_CAREER_GOALS[0] };
}

export async function getStudentSkills() {
  const data = await fetchApi('/student/skills/');
  return (data?.results && data.results.length > 0) ? data.results : MOCK_STUDENT_SKILLS;
}

export async function getCareers() {
  const data = await fetchApi('/careers/');
  return (data?.results && data.results.length > 0) ? data.results : MOCK_CAREER_GOALS;
}

export async function setStudentCareer(careerId, targetLevel = 80) {
  return fetchApi('/student/career/', {
    method: 'POST',
    body: JSON.stringify({ career_id: careerId, target_level: targetLevel }),
  });
}

export async function getCareerReadiness() {
  const data = await fetchApi('/student/career-readiness/');
  return data || { readiness: MOCK_CAREER_GOALS[0].readiness };
}

export async function getStudentSkillGaps() {
  const data = await fetchApi('/student/skill-gaps/');
  return (data?.results && data.results.length > 0) ? data.results : MOCK_STUDENT_SKILLS;
}

export async function getStudentTelemetry() {
  const data = await fetchApi('/student/telemetry/');
  return data?.results && data.results.length > 0 ? data.results : null;
}

export async function getTeacherStudents() {
  const data = await fetchApi('/teacher/students/');
  return data?.results && data.results.length > 0 ? data.results : null;
}

export async function getSkillRoadmap() {
  const data = await fetchApi('/student/roadmap/');
  return (data?.results && data.results.length > 0) ? data.results : MOCK_CAREER_ROADMAP;
}

export async function getProjectRecommendations() {
  const data = await fetchApi('/student/projects/');
  return (data?.results && data.results.length > 0) ? data.results : MOCK_PROJECT_RECOMMENDATIONS;
}

export async function getOpportunities() {
  const data = await fetchApi('/opportunities/');
  return (data?.results && data.results.length > 0) ? data.results : MOCK_OPPORTUNITIES_CATALOG;
}

export async function getRecommendedOpportunities() {
  const data = await fetchApi('/opportunities/recommended/');
  return (data?.results && data.results.length > 0) ? data.results : MOCK_OPPORTUNITIES_CATALOG;
}

export async function saveOpportunity(id) {
  return fetchApi(`/opportunities/${id}/save/`, { method: 'POST' });
}

export async function registerForOpportunity(id) {
  return fetchApi(`/opportunities/${id}/register/`, { method: 'POST' });
}

export async function publishOpportunityApi(oppData) {
  const created = {
    id: Date.now(),
    title: oppData.title,
    type: oppData.type || 'Workshop',
    organization: oppData.organization || 'Department Faculty',
    speaker: oppData.speaker || 'Prof. Sarah Jenkins',
    starts_at: oppData.starts_at || new Date().toISOString(),
    registration_deadline: oppData.registration_deadline || new Date(Date.now() + 14 * 86400000).toISOString(),
    location: oppData.location || 'Campus Tech Lab',
    registration_link: oppData.registration_link || 'https://university.edu/register',
    skills: typeof oppData.skills === 'string' ? oppData.skills.split(',').map(s => s.trim()) : (oppData.skills || ['Networking', 'Cybersecurity']),
    description: oppData.description,
    match_score: 96,
    faculty_posted: true,
    status: 'recommended',
    why_recommended: "Posted & Assigned directly by your Faculty Advisor for your target career path."
  };

  MOCK_OPPORTUNITIES_CATALOG.unshift(created);
  MOCK_OPPORTUNITIES.unshift(created);

  try {
    await fetchApi('/opportunities/', {
      method: 'POST',
      body: JSON.stringify(oppData)
    });
  } catch (err) {
    console.warn('Backend opportunity post fallback:', err);
  }

  return created;
}

export async function sendChatMessage(message, profile = null) {
  const data = await fetchApi('/chat/', {
    method: 'POST',
    body: JSON.stringify({ message, profile })
  });

  if (data?.response) {
    return { response: data.response, provider: data.provider || "Qwen 3:8B (Ollama)" };
  }

  const lowerMsg = message.toLowerCase();
  const studentName = profile?.name || MOCK_STUDENT_PROFILE.name;
  const targetCareer = profile?.target_career || MOCK_STUDENT_PROFILE.target_career;
  let aiReply = `Hello ${studentName}! I am your AI Career Compass Advisor powered by Qwen3.\n\n`;

  if (lowerMsg.includes("network") || lowerMsg.includes("gap")) {
    aiReply += `• **Diagnostic Insight**: Your Networking proficiency is currently at 25% against an 80% requirement for ${targetCareer}.\n• **Recommended Opportunity**: Attend the *Networking Fundamentals & Protocol Analysis Workshop* on Aug 22nd (91% match score).\n• **Prerequisite Warning**: Complete TCP/IP and OSI layer concepts before diving into penetration testing toolsets.`;
  } else if (lowerMsg.includes("conflict") || lowerMsg.includes("exam") || lowerMsg.includes("dbms")) {
    aiReply += `• **Workload & Schedule Balance**: You have an active DBMS Recovery Plan (7 hrs/week) and a DBMS Exam on Monday Aug 24th.\n• **AI Suggestion**: Attending the 3-hour Saturday workshop may impact your exam prep. Consider switching to the Wednesday 6:00 PM Async Webinar alternative!`;
  } else {
    aiReply += `I've analyzed your profile (**Target Goal: ${targetCareer}**, Current Readiness: **58%**).\n\nYour strongest skill is Python (65%), while your largest prerequisite gap is Networking (25%). How can I help you refine your roadmap today?`;
  }

  return { response: aiReply, provider: "Qwen3 AI Career Engine" };
}
