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

export default function GoalSkillGap({ studentProfile, onOpenAiChat }) {
  const targetCareer = studentProfile?.target_career || 'Cybersecurity Engineer';
  const [prereqs, setPrereqs] = useState(MOCK_PREREQUISITE_CHAIN);
  const [bottleneck, setBottleneck] = useState(null);
  const [foundation, setFoundation] = useState(null);

  useEffect(() => {
    if (studentProfile?.skills && studentProfile.skills.length > 0) {
      // Sort skills by proficiency ascending
      const sorted = [...studentProfile.skills].sort((a, b) => (a.proficiency || 0) - (b.proficiency || 0));
      
      const chain = sorted.map((item, idx) => {
        const prof = typeof item.proficiency === 'number' ? item.proficiency : 50;
        const requiredBefore = idx < sorted.length - 1 ? sorted[idx + 1].name : targetCareer;
        return {
          step: idx + 1,
          skill: item.name,
          proficiency: prof,
          status: prof < 35 ? 'Critical Prerequisite Defect' : prof < 65 ? 'In Progress' : 'Mastered',
          required_before: requiredBefore
        };
      });

      setPrereqs(chain);
      setBottleneck(sorted[0]);
      setFoundation(sorted[sorted.length - 1]);
    } else {
      getStudentSkillGaps().then(data => {
        if (data && data.length > 0) {
          const chain = data.map((item, idx) => ({
            step: idx + 1,
            skill: item.skill || item.name,
            proficiency: item.proficiency || item.current || 20,
            status: (item.proficiency || item.current || 20) < 30 ? 'Critical Prerequisite Defect' : 'In Progress',
            required_before: idx < data.length - 1 ? (data[idx + 1].skill || data[idx + 1].name) : targetCareer
          }));
          setPrereqs(chain);
        }
      }).catch(() => null);
    }
  }, [studentProfile, targetCareer]);

  const activeBottleneck = bottleneck || { name: 'Networking Fundamentals', proficiency: 25 };
  const activeFoundation = foundation || { name: 'Python Programming', proficiency: 65 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitMerge size={24} color="var(--color-purple)" /> Goal vs Skill Gap & Prerequisite Graph
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Sequential dependency analysis for: <strong>{studentProfile?.name || 'Alex Rivera'}</strong> • Goal: <strong style={{ color: 'var(--color-brand-primary)' }}>{targetCareer}</strong>
          </p>
        </div>
      </div>

      {/* Dynamic AI Diagnosis Callout */}
      <div className="clean-card" style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div className="badge badge-purple" style={{ gap: '6px' }}>
            <Brain size={14} /> AI Diagnostic Gap Engine
          </div>
          <button onClick={onOpenAiChat} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }}>
            <Sparkles size={14} /> Ask AI
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginTop: '10px' }}>
          <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-rose)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-rose)' }}>PRIMARY BOTTLENECK DEFICIENCY</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)' }}>
              {activeBottleneck.name} ({activeBottleneck.proficiency}%)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Highest priority deficit slowing progress toward {targetCareer}
            </div>
          </div>

          <div style={{ background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-emerald)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-emerald)' }}>STRONGEST DEMONSTRATED FOUNDATION</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)' }}>
              {activeFoundation.name} ({activeFoundation.proficiency}%)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Core strength anchor for building prerequisite competency
            </div>
          </div>
        </div>
      </div>

      {/* Prerequisite Chain Graphical Graph */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitMerge size={18} color="var(--color-brand-primary)" /> Dynamic Dependency Sequence Chain
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          {prereqs.map((item, idx) => {
            const isGap = item.proficiency < 35;
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
                  justify: 'space-between',
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
                        Prerequisite for: <strong>{item.required_before}</strong>
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
