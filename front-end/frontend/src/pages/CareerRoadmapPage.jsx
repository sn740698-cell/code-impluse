import React, { useState, useEffect } from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Code, 
  BookOpen, 
  Sparkles, 
  CheckSquare,
  Target
} from 'lucide-react';
import { MOCK_CAREER_ROADMAP, getSkillRoadmap } from '../services/api';

export default function CareerRoadmapPage({ studentProfile }) {
  const targetCareer = studentProfile?.target_career || 'Cybersecurity Engineer';
  const [roadmap, setRoadmap] = useState([]);

  useEffect(() => {
    // Generate tailored roadmap stages based on targetCareer
    const generateTailoredRoadmap = (career) => {
      const lower = career.toLowerCase();

      if (lower.includes('ai') || lower.includes('stack') || lower.includes('full')) {
        return [
          {
            stage_name: 'Stage 1: Modern Full Stack & Python Foundations',
            required_proficiency: 65,
            is_current_stage: true,
            skills: ['React', 'TypeScript', 'Python', 'REST APIs'],
            milestones: [
              { id: 101, title: 'Build responsive single-page dashboard in React & Vite', completed: true },
              { id: 102, title: 'Implement async REST API integration with Django backend', completed: true },
              { id: 103, title: 'Master state management & custom custom hooks', completed: false }
            ],
            projects: 'Full Stack Telemetry Dashboard',
            resources: 'Full Stack Open & React Docs'
          },
          {
            stage_name: 'Stage 2: Vector Search & LLM Integration',
            required_proficiency: 80,
            is_current_stage: false,
            skills: ['Vector DB', 'RAG Pipelines', 'LangChain', 'OpenAI / Ollama API'],
            milestones: [
              { id: 201, title: 'Build local document ingestion pipeline using embeddings', completed: false },
              { id: 202, title: 'Implement RAG Q&A agent over PDF documents', completed: false },
              { id: 203, title: 'Optimize HNSW vector search latency < 50ms', completed: false }
            ],
            projects: 'Autonomous AI Research Assistant',
            resources: 'LangChain & Qdrant Deep Dives'
          },
          {
            stage_name: 'Stage 3: Agentic Workflows & MLOps Scaling',
            required_proficiency: 90,
            is_current_stage: false,
            skills: ['Docker', 'FastAPI', 'CUDA Tuning', 'Microservices'],
            milestones: [
              { id: 301, title: 'Containerize multi-container AI app using Docker Compose', completed: false },
              { id: 302, title: 'Deploy multi-agent task execution orchestrator', completed: false }
            ],
            projects: 'Production AI Agent Cluster',
            resources: 'MLOps Production Architecture Guide'
          }
        ];
      }

      if (lower.includes('data') || lower.includes('scientist') || lower.includes('analytics')) {
        return [
          {
            stage_name: 'Stage 1: Data Analytics & Mathematical Foundations',
            required_proficiency: 60,
            is_current_stage: true,
            skills: ['Python', 'Pandas', 'NumPy', 'Statistics & Probability'],
            milestones: [
              { id: 101, title: 'Master exploratory data analysis (EDA) on 100k+ row datasets', completed: true },
              { id: 102, title: 'Build interactive visualizations using Seaborn & Matplotlib', completed: true },
              { id: 103, title: 'Perform hypothesis testing & statistical confidence intervals', completed: false }
            ],
            projects: 'Customer Churn Analytics & Prediction',
            resources: 'Python Data Science Handbook'
          },
          {
            stage_name: 'Stage 2: Machine Learning & Feature Engineering',
            required_proficiency: 80,
            is_current_stage: false,
            skills: ['Scikit-Learn', 'Feature Engineering', 'XGBoost', 'SQL'],
            milestones: [
              { id: 201, title: 'Train & evaluate classification models (Precision/Recall)', completed: false },
              { id: 202, title: 'Implement cross-validation & hyperparameter tuning', completed: false }
            ],
            projects: 'Predictive Financial Fraud Classifier',
            resources: 'Hands-On Machine Learning with Scikit-Learn'
          },
          {
            stage_name: 'Stage 3: Deep Learning & MLOps Deployment',
            required_proficiency: 90,
            is_current_stage: false,
            skills: ['PyTorch', 'TensorFlow', 'MLflow', 'Model Serving'],
            milestones: [
              { id: 301, title: 'Build & train Convolutional Neural Network (CNN)', completed: false },
              { id: 302, title: 'Serve PyTorch model via REST endpoint with MLflow tracking', completed: false }
            ],
            projects: 'Computer Vision Defect Inspector',
            resources: 'Deep Learning with PyTorch Book'
          }
        ];
      }

      if (lower.includes('cloud') || lower.includes('devops') || lower.includes('architect')) {
        return [
          {
            stage_name: 'Stage 1: Linux & Infrastructure Fundamentals',
            required_proficiency: 65,
            is_current_stage: true,
            skills: ['Linux Shell', 'Networking', 'Bash', 'Git Workflow'],
            milestones: [
              { id: 101, title: 'Master Linux user permissions, SSH keys & systemd services', completed: true },
              { id: 102, title: 'Configure NGINX reverse proxy & SSL certificates', completed: true },
              { id: 103, title: 'Automate server setup with Bash scripting', completed: false }
            ],
            projects: 'Automated Web Infrastructure Deployment',
            resources: 'Linux Command Line Bible'
          },
          {
            stage_name: 'Stage 2: Containerization & Cloud Platforms',
            required_proficiency: 80,
            is_current_stage: false,
            skills: ['Docker', 'AWS EC2 / S3', 'Terraform', 'CI/CD Pipelines'],
            milestones: [
              { id: 201, title: 'Write multi-stage Dockerfiles & optimize image size', completed: false },
              { id: 202, title: 'Provision AWS VPC & EC2 clusters using Terraform', completed: false }
            ],
            projects: 'Infrastructure as Code (IaC) AWS Pipeline',
            resources: 'Terraform Up & Running'
          },
          {
            stage_name: 'Stage 3: Kubernetes & Cloud Native Security',
            required_proficiency: 90,
            is_current_stage: false,
            skills: ['Kubernetes (k8s)', 'Helm', 'Prometheus', 'Cloud Security'],
            milestones: [
              { id: 301, title: 'Deploy microservices cluster on Kubernetes using Helm', completed: false },
              { id: 302, title: 'Set up real-time cluster monitoring with Grafana & Prometheus', completed: false }
            ],
            projects: 'High-Availability K8s Enterprise Cluster',
            resources: 'Kubernetes in Action'
          }
        ];
      }

      // Default Cybersecurity Roadmap
      return MOCK_CAREER_ROADMAP;
    };

    setRoadmap(generateTailoredRoadmap(targetCareer));
  }, [targetCareer]);

  const toggleMilestone = (stageIdx, milestoneId) => {
    setRoadmap(prev => prev.map((stage, idx) => {
      if (idx !== stageIdx) return stage;
      return {
        ...stage,
        milestones: stage.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
      };
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Map size={24} color="var(--color-amber)" /> Customized Career Roadmap & Milestones
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Sequential learning path tailored for: <strong>{studentProfile?.name || 'Alex Rivera'}</strong> • Goal: <strong style={{ color: 'var(--color-brand-primary)' }}>{targetCareer}</strong>
          </p>
        </div>

        <div className="badge badge-purple" style={{ gap: '6px' }}>
          <Target size={14} /> Goal: {targetCareer}
        </div>
      </div>

      {/* Roadmap Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {roadmap.map((stage, stageIdx) => {
          const completedCount = stage.milestones.filter(m => m.completed).length;
          const totalCount = stage.milestones.length;
          const percent = Math.round((completedCount / totalCount) * 100);

          return (
            <div key={stageIdx} className="clean-card" style={{
              padding: '24px',
              borderLeft: stage.is_current_stage ? '5px solid var(--color-brand-primary)' : '1px solid var(--border-clean)',
              background: stage.is_current_stage ? 'rgba(59, 130, 246, 0.08)' : 'var(--bg-card)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{stage.stage_name}</h3>
                    {stage.is_current_stage && (
                      <span className="badge badge-blue">Active Stage</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Target Proficiency: {stage.required_proficiency}% • Stage Progress: {percent}%
                  </div>
                </div>

                <span className="badge badge-purple" style={{ fontSize: '0.8rem' }}>
                  {completedCount} / {totalCount} Done
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-pill)', marginBottom: '16px', overflow: 'hidden' }}>
                <div style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                  borderRadius: 'var(--radius-pill)',
                  transition: 'width 0.4s ease'
                }} />
              </div>

              {/* Skills Covered */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {stage.skills.map((sk, sIdx) => (
                  <span key={sIdx} className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                    {sk}
                  </span>
                ))}
              </div>

              {/* Learning Milestones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                {stage.milestones.map(m => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(stageIdx, m.id)}
                    className="clean-card clean-card-interactive"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-clean)'
                    }}
                  >
                    {m.completed ? (
                      <CheckCircle2 size={18} color="var(--color-emerald)" />
                    ) : (
                      <Circle size={18} color="var(--text-subtle)" />
                    )}
                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: m.completed ? 600 : 400,
                      color: m.completed ? 'var(--text-main)' : 'var(--text-muted)'
                    }}>
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Suggested Project & Resources */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '12px',
                paddingTop: '14px',
                borderTop: '1px dashed var(--border-clean)',
                fontSize: '0.82rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-amber)' }}>
                  <Code size={16} />
                  <span><strong>Suggested Project:</strong> {stage.projects}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc' }}>
                  <BookOpen size={16} />
                  <span><strong>Resource:</strong> {stage.resources}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
