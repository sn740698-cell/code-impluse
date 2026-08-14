import React, { useState, useEffect } from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Award, 
  Sparkles, 
  X, 
  ArrowUpRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { getStudentSkills, MOCK_STUDENT_SKILLS } from '../services/api';

export default function SkillAnalysis({ studentProfile }) {
  const [skills, setSkills] = useState(MOCK_STUDENT_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    if (studentProfile?.skills && studentProfile.skills.length > 0) {
      const formatted = studentProfile.skills.map(s => {
        const prof = typeof s.proficiency === 'number' ? s.proficiency : 50;
        const required = 85;
        const gap = Math.max(0, required - prof);
        const state = prof >= 70 ? 'Strong' : prof >= 40 ? 'Developing' : 'Beginner';
        return {
          name: s.name,
          current: prof,
          required: required,
          gap: gap,
          state: state,
          source: 'Student Customized Entry & Academic Assessment',
          is_demonstrated: prof >= 60,
          evidence: `Verified proficiency rating of ${prof}% for ${s.name}`,
          action: gap > 30 ? `Focus on foundational ${s.name} tutorials & hands-on lab exercises` : `Refine advanced ${s.name} project applications`
        };
      });
      setSkills(formatted);
    } else {
      getStudentSkills().then(data => {
        if (data && data.length > 0) {
          const formatted = data.map(s => ({
            name: s.skill || s.name,
            current: s.proficiency || s.current || 0,
            required: s.required || 80,
            gap: Math.max(0, (s.required || 80) - (s.proficiency || s.current || 0)),
            state: s.state || ((s.proficiency || s.current) >= 70 ? 'Strong' : (s.proficiency || s.current) >= 40 ? 'Developing' : 'Missing'),
            source: s.source || 'Academic',
            is_demonstrated: s.demonstrated ?? s.is_demonstrated ?? true,
            evidence: s.evidence || 'Verified from course records',
            action: s.action || 'Focus on foundational lab exercises'
          }));
          setSkills(formatted);
        }
      }).catch(() => null);
    }
  }, [studentProfile]);

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
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart2 size={24} color="var(--color-brand-primary)" /> Skill Matrix & Diagnostic Analysis
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Analyzing customized carrier skills for: <strong>{studentProfile?.name || 'Alex Rivera'}</strong> ({studentProfile?.target_career || 'Cybersecurity Engineer'})
          </p>
        </div>

        {/* Visual Counters */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="clean-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="var(--color-emerald)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
              {skills.filter(s => s.is_demonstrated).length} Demonstrated
            </span>
          </div>
          <div className="clean-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} color="var(--color-rose)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>
              {skills.filter(s => s.gap > 30).length} Skill Deficiencies
            </span>
          </div>
        </div>
      </div>

      {/* Skill List Cards */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {skills.map((skill, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSkill(skill)}
              className="clean-card clean-card-interactive"
              style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-input)'
              }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{skill.name}</h4>
                  <span className={`badge ${getStateBadgeClass(skill.state)}`}>
                    {skill.state}
                  </span>
                  {skill.is_demonstrated ? (
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  ) : (
                    <span className="badge badge-yellow" style={{ fontSize: '0.68rem' }}>
                      Self-Reported
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Source: {skill.source}
                </div>
              </div>

              {/* Progress Bar & Visual Gauge */}
              <div style={{ width: '240px', marginRight: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{skill.current}% proficiency</span>
                  <span style={{ fontWeight: 700, color: skill.current >= skill.required ? 'var(--color-emerald)' : 'var(--color-brand-primary)' }}>
                    Target: {skill.required}%
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${skill.current}%`,
                    height: '100%',
                    background: skill.current >= skill.required ? 'var(--color-emerald)' : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    borderRadius: 'var(--radius-pill)',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>

              <button className="btn-ghost" style={{ padding: '6px' }}>
                <ArrowUpRight size={18} color="var(--color-brand-primary)" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Skill Detail */}
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
          <div className="clean-card" style={{ width: '480px', maxWidth: '90vw', padding: '28px' }}>
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
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CURRENT</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-brand-primary)' }}>{selectedSkill.current}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>TARGET</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-purple)' }}>{selectedSkill.required}%</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GAP</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-rose)' }}>-{selectedSkill.gap}%</div>
                </div>
              </div>

              <div>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>Evidence Used:</strong>
                <p style={{ color: 'var(--text-muted)', background: 'var(--bg-input)', padding: '10px', borderRadius: 'var(--radius-sm)', margin: 0 }}>
                  {selectedSkill.evidence}
                </p>
              </div>

              <div>
                <strong style={{ color: 'var(--color-amber)', display: 'block', marginBottom: '4px' }}>Recommended Action:</strong>
                <p style={{ color: 'var(--text-main)', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '10px', borderRadius: 'var(--radius-sm)', margin: 0 }}>
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
