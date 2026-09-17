# 🧭 AI Career Compass

> **🏆 Recognition**: Received **Special Appreciation** at the **SIH (Smart India Hackathon) Internal Hackathon**!

---

## 📌 Project Overview

**AI Career Compass** is an intelligent, full-stack career guidance and academic analytics platform designed to bridge the gap between student learning, skill development, and industry opportunities. Powered by a local RAG (Retrieval-Augmented Generation) AI engine, Django, and React, AI Career Compass provides personalized career roadmaps, skill gap analysis, curated project recommendations, and educator analytics.

Whether helping students map out career trajectories or empowering teachers to deliver timely interventions, AI Career Compass acts as a comprehensive, AI-assisted mentorship ecosystem.

---

## 🌟 Key Features

### 🎓 For Students
- **🧭 Dynamic Career Roadmaps & Branch Explorer**: Visualize interactive career progression trees tailored to individual academic backgrounds and goals.
- **📊 Skill Gap & Academic Balance Analysis**: Identify skill deficiencies relative to targeted career paths and receive actionable feedback.
- **🚀 Opportunities Hub & Journey Tracker**: Discover personalized internships, hackathons, research projects, and career milestones with deterministic matching scores.
- **🤖 AI Career Mentor (RAG Chatbot Drawer)**: Instant contextual guidance powered by local LLM (Ollama / Qwen) for career Q&A, advice, and skill recommendations.
- **💡 Personal Project Recommendations**: Tailored recommendations for hands-on projects that best build missing skills.

### 👨‍🏫 For Teachers & Institutions
- **📈 Cohort Analytics Dashboard**: Track student performance metrics, skill acquisition rates, and academic progress across batches.
- **🛠️ Targeted Interventions**: Identify at-risk students or performance bottlenecks to deploy early academic support.
- **📢 Opportunity Publishing**: Easily publish internships, campus events, and project opportunities directly to eligible student cohorts.

---

## 🛠️ Tech Stack

| Domain | Technology / Library |
| :--- | :--- |
| **Frontend** | React 19, Vite, Lucide Icons, OGL (3D Graphics), Custom CSS Design System |
| **Backend** | Django, Django REST Framework (DRF), Session Auth |
| **AI / Machine Learning** | Ollama (Qwen Model), Local Vector Store & RAG Ingestion Pipeline |
| **Database** | PostgreSQL (Production) / SQLite3 (Auto-fallback for local development) |
| **Automation** | Custom Batch Script (`start.bat`) for automated setup & concurrent server execution |

---

## 📁 Repository Structure

```text
Hackathon/
├── start.bat                  # One-click automated server launcher
├── back-end/                  # Django REST API & AI Engine
│   ├── academics/             # Academic tracking models & logic
│   ├── accounts/              # User profiles, authentication & roles
│   ├── ai/                    # Ollama RAG pipeline, vector store & ingestion
│   ├── analytics/             # Student & teacher performance analytics
│   ├── chatbot/               # Conversational AI backend handlers
│   ├── goals/                 # Goal tracking & roadmap logic
│   ├── opportunities/         # Internship & project opportunity matching
│   ├── skills/                # Skill taxonomy & gap analysis
│   ├── manage.py              # Django management script
│   └── requirements.txt       # Python dependencies
└── front-end/
    └── frontend/              # React + Vite application
        ├── src/
        │   ├── components/    # Reusable UI widgets & AI Chatbot drawer
        │   ├── pages/         # Student & Teacher portal views
        │   └── services/      # API communication layer
        └── package.json       # Node.js dependencies
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python**: 3.10+ installed
- **Node.js**: 18+ installed
- **Ollama** *(Optional but recommended for AI Chatbot)*: Installed and running with `qwen3:8b` (or similar LLM model)
- **PostgreSQL** *(Optional)*: If available on port 5432; otherwise SQLite fallback is automatically used.

---

### ⚡ One-Click Startup (Recommended)

Simply double-click or execute `start.bat` from the root directory in Command Prompt / PowerShell:

```cmd
.\start.bat
```

**What `start.bat` automatically handles:**
1. Detects Python virtual environments (`venv` / `.venv`).
2. Checks and installs missing backend (`requirements.txt`) and frontend (`npm install`) dependencies.
3. Verifies PostgreSQL connectivity (falls back to SQLite seamlessly if unreachable).
4. Runs database migrations (`python manage.py migrate`).
5. Seeds initial platform data (`python manage.py seed_data`).
6. Starts both **Django Backend** (`http://127.0.0.1:8000`) and **React Frontend** (`http://localhost:5173`) in concurrent windows.

---

### 🔧 Manual Setup

#### 1. Backend Setup
```bash
cd back-end
python -m venv venv
# On Windows:
venv\Scripts\activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 127.0.0.1:8000
```

#### 2. Frontend Setup
```bash
cd front-end/frontend
npm install
npm run dev
```

#### 3. AI Engine Setup (Ollama RAG)
Ensure Ollama is running locally and pull the recommended model:
```bash
ollama serve
ollama pull qwen3:8b
```

---

## 🏆 SIH Internal Hackathon Recognition

This project was developed during the **Smart India Hackathon (SIH) Internal Hackathon**, where it was awarded **Special Appreciation** by the panel of judges for its innovative approach to AI-driven education, dynamic RAG career mentoring, and comprehensive dual-perspective (Student & Teacher) architecture.

---

## 📄 License & Acknowledgments

- Built with ❤️ by the team **CODE-IMPULSE** - an AI-powered student and teacher monitoring dashboard.
- Special thanks to the SIH Internal Hackathon mentors and evaluators.
