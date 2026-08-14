import React, { useState, useEffect } from 'react';
import { 
  GitMerge, 
  Sparkles, 
  ArrowDown, 
  AlertTriangle, 
  CheckCircle2, 
  Lock,
  Brain,
  ShieldAlert
} from 'lucide-react';
import { getStudentSkillGaps, MOCK_PREREQUISITE_CHAIN } from '../services/api';

export default function GoalSkillGap({ onOpenAiChat }) {
  const [prereqs, setPrereqs] = useState(MOCK_PREREQUISITE_CHAIN);

  useEffect(() => {
    async function loadGaps() {
      try {
        const data = await getStudentSkillGaps();
        if (data && data.length > 0) {
          // Format backend gaps into prerequisite flow steps
          const chain = data.map((item, idx) => ({
            step: idx + 1,
            skill: item.skill || item.name,
            proficiency: item.proficiency || item.current || 20,
            status: (item.proficiency || item.current || 20) < 30 ? 'Prerequisite Gap' : 'In Progress',
            required_before: idx < data.length - 1 ? (data[idx + 1].skill || data[idx + 1].name) : 'Target Role'
          }));
          setPrereqs(chain);
        }
      } catch (err) {
        console.warn('Failed to load skill gaps from backend:', err);
      }
    }
    loadGaps();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitMerge size={24} color="var(--color-purple)" /> Goal vs Skill Gap & Prerequisite Graph
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Sequential dependency flow & automated AI gap diagnosis
          </p>
        </div>
      </div>

      {/* Graphical AI Diagnosis Callout */}
      <div className="clean-card" style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div className="badge badge-purple" style={{ gap: '6px' }}>
            <Brain size={14} /> AI Skill Gap Analysis
          </div>
          <button onClick={onOpenAiChat} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }}>
            <Sparkles size={14} /> Ask AI
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginTop: '10px' }}>
          <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-rose)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-rose)' }}>PRIMARY BOTTLENECK</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '2px' }}>Networking Fundamentals (25%)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Required target: 80% • Prerequisite for Linux & OS labs</div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-emerald)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-emerald)' }}>STRONGEST FOUNDATION</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '2px' }}>Python Programming (65%)</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demonstrated via packet sniffer & lab projects</div>
          </div>
        </div>
      </div>

      {/* Prerequisite Chain Graphical Graph */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitMerge size={18} color="var(--color-brand-primary)" /> Dependency Sequence Chain
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          {prereqs.map((item, idx) => {
            const isGap = item.proficiency < 30;
            const isDone = item.proficiency >= 70;
            return (
              <React.Fragment key={idx}>
                <div className="clean-card" style={{
                  width: '100%',
                  maxWidth: '620px',
                  padding: '14px 20px',
                  background: isGap ? 'rgba(244, 63, 94, 0.08)' : isDone ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-input)',
                  border: isGap ? '1px solid rgba(244, 63, 94, 0.3)' : isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-clean)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isGap ? 'var(--color-rose)' : isDone ? 'var(--color-emerald)' : 'var(--color-brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.82rem'
                    }}>
                      {isDone ? <CheckCircle2 size={18} /> : isGap ? <AlertTriangle size={18} /> : item.step}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: 0 }}>{item.skill}</h4>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Prerequisite for: {item.required_before}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge ${isGap ? 'badge-rose' : isDone ? 'badge-emerald' : 'badge-blue'}`}>
                      {item.proficiency}%
                    </span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {item.status}
                    </div>
                  </div>
                </div>

                {idx < prereqs.length - 1 && (
                  <ArrowDown size={16} color="var(--text-subtle)" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

    </div>
  );
}
