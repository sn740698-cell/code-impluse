import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle,
  Target
} from 'lucide-react';
import { MOCK_PROJECT_RECOMMENDATIONS } from '../services/api';

export default function ProjectRecommendations({ studentProfile }) {
  const targetCareer = studentProfile?.target_career || 'Cybersecurity Engineer';
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const generateTargetedProjects = (career) => {
      const lower = career.toLowerCase();

      if (lower.includes('ai') || lower.includes('stack') || lower.includes('full')) {
        return [
          {
            id: 1,
            title: 'RAG Knowledge Base Q&A Assistant',
            description: 'Build a local retrieval-augmented generation agent using Ollama, Qdrant vector database, and LangChain to query PDFs.',
            difficulty: 'Intermediate',
            required_skills: ['React', 'TypeScript', 'Python'],
            develops_skills: ['Vector DB', 'RAG Architecture', 'LangChain']
          },
          {
            id: 2,
            title: 'Real-Time Telemetry & Monitoring Dashboard',
            description: 'Develop a high-performance web dashboard displaying real-time metrics with custom SVG charts and WebSockets.',
            difficulty: 'Beginner',
            required_skills: ['React', 'CSS', 'JavaScript'],
            develops_skills: ['TypeScript', 'State Management', 'WebSockets']
          },
          {
            id: 3,
            title: 'Containerized AI Agent Orchestrator',
            description: 'Design a multi-container Docker Compose application deploying background agent workers with Redis task queues.',
            difficulty: 'Advanced',
            required_skills: ['Python', 'FastAPI'],
            develops_skills: ['Docker', 'Microservices', 'MLOps']
          }
        ];
      }

      if (lower.includes('data') || lower.includes('scientist') || lower.includes('analytics')) {
        return [
          {
            id: 1,
            title: 'Predictive Customer Churn Modeling Pipeline',
            description: 'Clean, preprocess, and engineer features from 100k customer records to build a high-precision churn predictor.',
            difficulty: 'Intermediate',
            required_skills: ['Python', 'Pandas', 'NumPy'],
            develops_skills: ['Scikit-Learn', 'Feature Engineering', 'EDA']
          },
          {
            id: 2,
            title: 'Financial Fraud Detection Classifier',
            description: 'Address severe class imbalance using SMOTE and train XGBoost models for real-time transaction fraud detection.',
            difficulty: 'Advanced',
            required_skills: ['Python', 'Statistics'],
            develops_skills: ['XGBoost', 'Class Imbalance', 'Model Evaluation']
          },
          {
            id: 3,
            title: 'Deep Learning Defect Inspector',
            description: 'Train a PyTorch Convolutional Neural Network (CNN) to detect manufacturing defects in industrial sensor images.',
            difficulty: 'Advanced',
            required_skills: ['Python', 'Machine Learning'],
            develops_skills: ['PyTorch', 'Computer Vision', 'CNNs']
          }
        ];
      }

      if (lower.includes('cloud') || lower.includes('devops') || lower.includes('architect')) {
        return [
          {
            id: 1,
            title: 'Infrastructure as Code (IaC) AWS Cluster',
            description: 'Provision an automated multi-AZ AWS VPC with EC2 instances and load balancers using Terraform scripts.',
            difficulty: 'Intermediate',
            required_skills: ['Linux Shell', 'Networking'],
            develops_skills: ['Terraform', 'AWS VPC', 'IaC']
          },
          {
            id: 2,
            title: 'Automated CI/CD Pipeline for Microservices',
            description: 'Configure GitHub Actions workflow to run unit tests, build Docker images, and push to container registry.',
            difficulty: 'Beginner',
            required_skills: ['Git', 'Docker'],
            develops_skills: ['CI/CD', 'GitHub Actions', 'Docker Registry']
          },
          {
            id: 3,
            title: 'High-Availability Kubernetes Cluster & Monitoring',
            description: 'Deploy microservices onto a Kubernetes cluster with Helm charts, Prometheus metric scraping, and Grafana dashboards.',
            difficulty: 'Advanced',
            required_skills: ['Docker', 'Linux Admin'],
            develops_skills: ['Kubernetes (k8s)', 'Prometheus', 'Helm']
          }
        ];
      }

      // Default Cybersecurity Projects
      return MOCK_PROJECT_RECOMMENDATIONS;
    };

    setProjects(generateTargetedProjects(targetCareer));
  }, [targetCareer]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code size={24} color="var(--color-brand-primary)" /> Hands-On Targeted Project Recommendations
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Practical projects selected for: <strong>{studentProfile?.name || 'Alex Rivera'}</strong> • Target Goal: <strong style={{ color: 'var(--color-brand-primary)' }}>{targetCareer}</strong>
          </p>
        </div>

        <div className="badge badge-purple" style={{ gap: '6px' }}>
          <Target size={14} /> Goal: {targetCareer}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {projects.map(project => (
          <div key={project.id} className="clean-card clean-card-interactive" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-yellow">{project.difficulty}</span>
                <span className="badge badge-blue">Skill Gap Aligned</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>{project.title}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                {project.description}
              </p>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '4px' }}>PREREQUISITE SKILLS:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {project.required_skills.map((s, i) => (
                    <span key={i} className="badge badge-blue" style={{ fontSize: '0.68rem' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-amber)', marginBottom: '4px' }}>DEVELOPS SKILL DEFICIENCIES:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {project.develops_skills.map((s, i) => (
                    <span key={i} className="badge badge-purple" style={{ fontSize: '0.68rem' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ padding: '10px', fontSize: '0.84rem', gap: '6px' }}>
              <span>Start Guided Project</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
