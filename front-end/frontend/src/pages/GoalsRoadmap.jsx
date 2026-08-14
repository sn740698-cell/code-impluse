import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  Circle, 
  Code, 
  BookOpen, 
  Sparkles, 
  Zap, 
  ChevronRight 
} from 'lucide-react';
import { MOCK_CAREERS, MOCK_ROADMAP } from '../services/api';

export default function GoalsRoadmap() {
  const [selectedCareerId, setSelectedCareerId] = useState(1);
  const [roadmap, setRoadmap] = useState(MOCK_ROADMAP);

  const toggleMilestone = (stageIdx, milestoneId) => {
    setRoadmap(prev => prev.map((stage, idx) => {
      if (idx !== stageIdx) return stage;
      return {
        ...stage,
        milestones: stage.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
      };
    }));
  };

  const activeCareer = MOCK_CAREERS.find(c => c.id === selectedCareerId) || MOCK_CAREERS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Career Goal & Skill Roadmap</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
          Interactive step-by-step milestones customized for your target career role
        </p>
      </div>

      {/* Target Career Selection Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {MOCK_CAREERS.map(career => {
          const isSelected = career.id === selectedCareerId;
          return (
            <div
              key={career.id}
              onClick={() => setSelectedCareerId(career.id)}
              className="glass-card glass-card-interactive"
              style={{
                padding: '20px',
                cursor: 'pointer',
                border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-light)',
                background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                boxShadow: isSelected ? 'var(--neon-cyan-shadow)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span className={`badge ${isSelected ? 'badge-cyan' : 'badge-purple'}`}>
                  {isSelected ? 'Active Target' : 'Explore Track'}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  {career.readiness}% Match
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 6px 0' }}>{career.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                {career.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Active Stage Roadmap Timeline */}
      <div className="glass-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={22} color="var(--accent-cyan)" /> Stage Roadmap: {activeCareer.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Toggle milestone completion to update your real-time Career Readiness Score
            </p>
          </div>

          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
            <Sparkles size={16} /> AI Regenerate Path
          </button>
        </div>

        {/* Timeline Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {roadmap.map((stage, stageIdx) => (
            <div 
              key={stageIdx}
              className="glass-card"
              style={{
                padding: '22px',
                background: 'var(--bg-tertiary)',
                borderLeft: '5px solid var(--accent-cyan)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                    STAGE {stage.position} OF 3
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '2px 0 6px 0' }}>{stage.name}</h4>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {stage.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Milestones Checkbox List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
                {stage.milestones.map(m => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(stageIdx, m.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-light)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {m.completed ? (
                      <CheckCircle2 size={20} color="var(--accent-emerald)" />
                    ) : (
                      <Circle size={20} color="var(--text-muted)" />
                    )}
                    <span style={{
                      fontSize: '0.88rem',
                      fontWeight: m.completed ? 600 : 400,
                      color: m.completed ? 'var(--text-main)' : 'var(--text-secondary)',
                      textDecoration: m.completed ? 'none' : 'none'
                    }}>
                      {m.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Suggested Project & Resources */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                paddingTop: '12px',
                borderTop: '1px dashed var(--border-light)',
                fontSize: '0.8rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)' }}>
                  <Code size={16} />
                  <span><strong>Suggested Project:</strong> {stage.projects}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-purple)' }}>
                  <BookOpen size={16} />
                  <span><strong>Recommended Docs:</strong> {stage.resources}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
