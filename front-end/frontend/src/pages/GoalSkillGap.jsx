import React from 'react';
import { 
  GitMerge, 
  Sparkles, 
  ArrowDown, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle,
  Brain
} from 'lucide-react';
import { MOCK_PREREQUISITE_CHAIN, MOCK_STUDENT_PROFILE } from '../services/api';

export default function GoalSkillGap({ onOpenAiChat }) {
  const aiExplanation = `Your programming foundation in Python (65%) is reasonable, but Networking (25%) is currently your largest prerequisite bottleneck for the Cybersecurity Engineer target. Strengthen TCP/IP, subnetting, DNS, HTTP/HTTPS and routing fundamentals before moving deeply into penetration testing or web exploitation.`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 1.3 & 1.4 — Goal vs Skill Gap & AI Diagnosis</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Prerequisite dependency sequence evaluation and automated AI reasoning
        </p>
      </div>

      {/* AI Skill Gap Explanation Box (Part 1 Item 4) */}
      <div className="soft-card" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)',
        border: '1px solid var(--border-purple)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div className="badge badge-purple" style={{ fontSize: '0.78rem' }}>
            <Brain size={14} /> Qwen3 AI Personal Skill Diagnosis
          </div>
          <button onClick={onOpenAiChat} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
            <Sparkles size={14} /> Ask AI Details
          </button>
        </div>

        <p style={{ fontSize: '0.94rem', color: 'var(--text-main)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
          "{aiExplanation}"
        </p>
      </div>

      {/* Prerequisite Chain Graph (Part 1 Item 3) */}
      <div className="soft-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitMerge size={18} color="#60a5fa" /> Prerequisite Skill Dependency Graph
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
          Skills are ordered by foundational dependencies, not just percentage difference.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          {MOCK_PREREQUISITE_CHAIN.map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="soft-card" style={{
                width: '100%',
                maxWidth: '600px',
                padding: '16px 20px',
                background: item.proficiency < 30 ? 'rgba(244, 63, 94, 0.1)' : 'var(--bg-input)',
                border: item.proficiency < 30 ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)' }}>STEP {item.step}</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{item.skill}</h4>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Prerequisite for: {item.required_before}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${item.proficiency < 30 ? 'badge-rose' : 'badge-blue'}`}>
                    Proficiency: {item.proficiency}%
                  </span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {item.status}
                  </div>
                </div>
              </div>

              {idx < MOCK_PREREQUISITE_CHAIN.length - 1 && (
                <ArrowDown size={18} color="var(--text-subtle)" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </div>
  );
}
