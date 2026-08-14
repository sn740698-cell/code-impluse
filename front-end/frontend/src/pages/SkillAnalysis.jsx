import React, { useState } from 'react';
import { 
  BarChart2, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Info, 
  Award, 
  Sparkles, 
  X, 
  ArrowUpRight 
} from 'lucide-react';
import { MOCK_STUDENT_SKILLS } from '../services/api';

export default function SkillAnalysis() {
  const [skills] = useState(MOCK_STUDENT_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const getStateBadgeClass = (state) => {
    switch (state) {
      case 'Strong': return 'badge-emerald';
      case 'Developing': return 'badge-blue';
      case 'Beginner': return 'badge-yellow';
      case 'Missing': return 'badge-rose';
      default: return 'badge-purple';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 1.2 — Current Skill Analysis</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Distinguishing self-reported from demonstrated proficiency using multi-source evidence
        </p>
      </div>

      {/* Skill List Cards */}
      <div className="soft-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={18} color="#60a5fa" /> Demonstrated vs Self-Reported Skills
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Click any skill row to view detailed evidence</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {skills.map((skill, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSkill(skill)}
              className="soft-card soft-card-interactive"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-input)'
              }}
            >
              <div style={{ flex: 1, minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>{skill.name}</h4>
                  <span className={`badge ${getStateBadgeClass(skill.state)}`}>
                    {skill.state}
                  </span>
                  {skill.is_demonstrated ? (
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
                      <CheckCircle size={12} /> Demonstrated
                    </span>
                  ) : (
                    <span className="badge badge-yellow" style={{ fontSize: '0.68rem' }}>
                      Self-Reported
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Source: {skill.source} • Gap: {skill.gap}%
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '220px', marginRight: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Current: {skill.current}%</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Req: {skill.required}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${skill.current}%`,
                    height: '100%',
                    background: skill.current >= skill.required ? 'var(--accent-emerald)' : 'linear-gradient(90deg, #3b82f6, #a855f7)',
                    borderRadius: 'var(--radius-pill)'
                  }} />
                </div>
              </div>

              <button className="btn-ghost" style={{ padding: '6px' }}>
                <ArrowUpRight size={18} color="#60a5fa" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal for Selected Skill */}
      {selectedSkill && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="soft-card" style={{ width: '480px', maxWidth: '90vw', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>{selectedSkill.name}</h3>
                <span className={`badge ${getStateBadgeClass(selectedSkill.state)}`}>
                  {selectedSkill.state}
                </span>
              </div>
              <button onClick={() => setSelectedSkill(null)} className="btn-ghost" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CURRENT PROFICIENCY</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60a5fa' }}>{selectedSkill.current}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>REQUIRED TARGET</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#c084fc' }}>{selectedSkill.required}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SKILL GAP</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-rose)' }}>-{selectedSkill.gap}%</div>
                </div>
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>Evidence Used:</strong>
                <p style={{ color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)', margin: 0 }}>
                  {selectedSkill.evidence}
                </p>
              </div>

              <div>
                <strong style={{ color: '#fde047', display: 'block', marginBottom: '4px' }}>Recommended Next Action:</strong>
                <p style={{ color: 'var(--text-main)', background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', padding: '10px', borderRadius: 'var(--radius-sm)', margin: 0 }}>
                  {selectedSkill.action}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
