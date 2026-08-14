import React, { useState } from 'react';
import { 
  Map, 
  CheckCircle2, 
  Circle, 
  Code, 
  BookOpen, 
  Sparkles, 
  CheckSquare 
} from 'lucide-react';
import { MOCK_CAREER_ROADMAP } from '../services/api';

export default function CareerRoadmapPage() {
  const [roadmap, setRoadmap] = useState(MOCK_CAREER_ROADMAP);

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Map size={24} color="var(--color-amber)" /> Career Roadmap & Interactive Milestones
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Sequential learning path from Foundations to Core Security and Specialization
          </p>
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
