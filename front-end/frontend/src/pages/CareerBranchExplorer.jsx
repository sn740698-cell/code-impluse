import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  BookOpen,
  Target
} from 'lucide-react';
import { MOCK_CAREER_GOALS } from '../services/api';

export default function CareerBranchExplorer({ studentProfile }) {
  const studentName = studentProfile?.name || 'Alex Rivera';
  const targetCareer = studentProfile?.target_career || 'Cybersecurity Engineer';
  const [careerData, setCareerData] = useState(MOCK_CAREER_GOALS[0]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    const generateBranchesForGoal = (career) => {
      const lower = career.toLowerCase();

      if (lower.includes('ai') || lower.includes('stack') || lower.includes('full')) {
        const branches = [
          {
            name: "LLM Systems & Infrastructure",
            readiness: 82,
            gap: "CUDA & TensorRT Acceleration",
            req_skills: ["Python", "PyTorch", "CUDA", "FastAPI"],
            knowledge: "Master GPU memory allocation, continuous batching (vLLM), and model quantization techniques."
          },
          {
            name: "AI Product & RAG Engineering",
            readiness: 88,
            gap: "HNSW Vector Index Optimization",
            req_skills: ["React", "TypeScript", "LangChain", "Vector DB"],
            knowledge: "Learn hybrid vector & keyword search with Qdrant/Pinecone and multi-query retrieval reranking."
          },
          {
            name: "Agentic Autonomous Workflows",
            readiness: 75,
            gap: "Multi-Agent Tool Calling & ReAct",
            req_skills: ["LangGraph", "Python", "Ollama", "JSON Schema"],
            knowledge: "Study stateful graph execution loops, tool calling schemas, and error recovery for agent networks."
          },
          {
            name: "MLOps & Model Deployment",
            readiness: 68,
            gap: "Model Monitoring & Drift Detection",
            req_skills: ["Docker", "FastAPI", "MLflow", "Kubernetes"],
            knowledge: "Build automated CI/CD deployment pipelines for model endpoints with MLflow tracking."
          }
        ];
        const fields_to_watch = [
          { name: "Agentic Workflows", why: "Building multi-agent reasoning chains and autonomous task execution loops." },
          { name: "Vector Index Optimization", why: "HNSW and IVF indexing for sub-20ms billion-scale retrieval." },
          { name: "Local LLM Fine-Tuning", why: "LoRA & QLoRA quantization on edge devices for privacy-preserving AI." }
        ];
        return { name: career, branches, fields_to_watch };
      }

      if (lower.includes('data') || lower.includes('scientist') || lower.includes('analytics')) {
        const branches = [
          {
            name: "Predictive Machine Learning",
            readiness: 70,
            gap: "Gradient Boosting & XGBoost",
            req_skills: ["Python", "Scikit-Learn", "XGBoost", "SQL"],
            knowledge: "Master hyperparameter tuning, cross-validation, and feature importance analysis."
          },
          {
            name: "Deep Learning & Computer Vision",
            readiness: 60,
            gap: "PyTorch Neural Nets & CNNs",
            req_skills: ["PyTorch", "OpenCV", "CNN", "TensorFlow"],
            knowledge: "Implement transfer learning using ResNet and YOLO object detection architectures."
          },
          {
            name: "Natural Language Processing (NLP)",
            readiness: 65,
            gap: "Transformer Architectures & BERT",
            req_skills: ["HuggingFace", "Python", "Tokenization", "SpaCy"],
            knowledge: "Fine-tune HuggingFace transformer pipelines for sentiment analysis and entity extraction."
          },
          {
            name: "Data Engineering & ETL Pipelines",
            readiness: 72,
            gap: "Apache Spark & Distributed Data",
            req_skills: ["SQL", "PySpark", "Airflow", "PostgreSQL"],
            knowledge: "Build automated DAG workflows with Apache Airflow and distributed Spark transformations."
          }
        ];
        const fields_to_watch = [
          { name: "Synthetic Data Generation", why: "LLM-driven tabular data synthesis for privacy-compliant model training." },
          { name: "Automated Feature Stores", why: "Feast & Hopsworks feature management for real-time inference." },
          { name: "Multimodal Data Modeling", why: "Combining text, audio, and vision embeddings in unified neural networks." }
        ];
        return { name: career, branches, fields_to_watch };
      }

      if (lower.includes('cloud') || lower.includes('devops') || lower.includes('architect')) {
        const branches = [
          {
            name: "Cloud Security & IAM Governance",
            readiness: 78,
            gap: "AWS Multi-Account Governance",
            req_skills: ["AWS IAM", "Terraform", "Linux", "Python"],
            knowledge: "Implement least-privilege IAM policies, SCPs, and cloud security compliance checks."
          },
          {
            name: "Kubernetes Container Orchestration",
            readiness: 72,
            gap: "Helm Charts & K8s Ingress",
            req_skills: ["Kubernetes", "Docker", "Helm", "Prometheus"],
            knowledge: "Deploy production microservice manifests with automated ingress TLS certificates."
          },
          {
            name: "DevOps & Infrastructure as Code",
            readiness: 85,
            gap: "Terraform Module Architecture",
            req_skills: ["Terraform", "GitHub Actions", "Bash", "Git"],
            knowledge: "Automate AWS VPC and cluster provisioning via Git-driven CI/CD pipelines."
          },
          {
            name: "Site Reliability Engineering (SRE)",
            readiness: 68,
            gap: "SLO/SLI Error Budgets & Grafana",
            req_skills: ["Prometheus", "Grafana", "Linux", "Python"],
            knowledge: "Set up real-time telemetry alerting and high-availability incident response runbooks."
          }
        ];
        const fields_to_watch = [
          { name: "GitOps Infrastructure", why: "ArgoCD and FluxCD automated deployments directly from Git repositories." },
          { name: "FinOps Cloud Cost Optimization", why: "Automated cloud resource right-sizing and spending governance." },
          { name: "Serverless Edge Computing", why: "Running micro-functions at edge nodes with Cloudflare Workers & AWS Lambda." }
        ];
        return { name: career, branches, fields_to_watch };
      }

      // Default Cybersecurity Branches
      const defaultGoal = MOCK_CAREER_GOALS[0];
      const branchesWithKnowledge = defaultGoal.branches.map(b => ({
        ...b,
        knowledge: `Focus on mastering ${b.req_skills.join(', ')} to bridge the gap in ${b.gap}.`
      }));
      return { ...defaultGoal, name: career, branches: branchesWithKnowledge };
    };

    const data = generateBranchesForGoal(targetCareer);
    setCareerData(data);
    setSelectedBranch(data.branches[0]);
  }, [targetCareer]);

  if (!selectedBranch) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitBranch size={24} color="var(--color-purple)" /> Career Branch Explorer & Emerging Trends
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Specialization tracks & recommended domain knowledge for: <strong>{studentName}</strong> • Goal: <strong style={{ color: 'var(--color-brand-primary)' }}>{targetCareer}</strong>
          </p>
        </div>

        <div className="badge badge-purple" style={{ gap: '6px' }}>
          <Target size={14} /> Goal: {targetCareer}
        </div>
      </div>

      {/* Career Branch Explorer */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitBranch size={18} color="var(--color-brand-primary)" /> {targetCareer} Specialization Branches
        </h3>

        {/* Branch Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
          {careerData.branches.map((branch, idx) => {
            const isSel = selectedBranch.name === branch.name;
            return (
              <button
                key={idx}
                onClick={() => setSelectedBranch(branch)}
                className="tab-pill"
                style={{
                  fontSize: '0.82rem',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  cursor: 'pointer',
                  background: isSel ? 'var(--color-brand-primary)' : 'var(--bg-input)',
                  color: isSel ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isSel ? 700 : 500,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {branch.name}
              </button>
            );
          })}
        </div>

        {/* Selected Branch Detail */}
        <div style={{
          background: 'var(--bg-input)',
          padding: '22px',
          borderRadius: 'var(--radius-sm)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Specialization Track</span>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0' }}>{selectedBranch.name}</h4>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Current Readiness: <strong style={{ color: 'var(--color-brand-primary)' }}>{selectedBranch.readiness}%</strong>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--color-rose)', background: 'rgba(244, 63, 94, 0.1)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(244, 63, 94, 0.25)', marginBottom: '12px' }}>
              <strong>Primary Skill Gap:</strong> {selectedBranch.gap}
            </div>

            {/* Recommended Knowledge Focus */}
            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', background: 'rgba(59, 130, 246, 0.1)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-brand-primary)', fontWeight: 700, marginBottom: '2px' }}>
                <BookOpen size={14} /> Recommended Knowledge Focus:
              </div>
              <span>{selectedBranch.knowledge}</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '8px' }}>REQUIRED SKILLS & COMPETENCIES:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selectedBranch.req_skills.map((sk, i) => (
                <span key={i} className="badge badge-blue" style={{ fontSize: '0.78rem', padding: '6px 10px' }}>{sk}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fields to Watch */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={18} color="var(--color-amber)" /> Emerging Industry Fields to Watch ({targetCareer})
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {careerData.fields_to_watch.map((field, idx) => (
            <div key={idx} className="clean-card" style={{ padding: '18px', background: 'var(--bg-input)' }}>
              <span className="badge badge-yellow" style={{ marginBottom: '8px' }}>Industry Trend</span>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0' }}>{field.name}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                {field.why}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
