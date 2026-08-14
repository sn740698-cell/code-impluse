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
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 1.5 & 1.6 — Personalized Career Roadmap & Milestones</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Sequential learning path from Foundations to Core Security and Specialization
        </p>
      </div>

      {/* Roadmap Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {roadmap.map((stage, stageIdx) => {
          const completedCount = stage.milestones.filter(m => m.completed).length;
          const totalCount = stage.milestones.length;
          const percent = Math.round((completedCount / totalCount) * 100);

          return (
            <div key={stageIdx} className="soft-card" style={{
              padding: '24px',
              borderLeft: stage.is_current_stage ? '5px solid var(--primary-blue)' : '1px solid var(--border-subtle)',
              background: stage.is_current_stage ? 'rgba(37, 99, 235, 0.08)' : 'var(--bg-card)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{stage.stage_name}</h3>
                    {stage.is_current_stage && (
                      <span className="badge badge-blue">Current Active Stage</span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Target Proficiency: {stage.required_proficiency}% • Progress: {percent}%
                  </div>
                </div>

                {/* Progress Circle */}
                <span className="badge badge-purple" style={{ fontSize: '0.8rem' }}>
                  {completedCount} / {totalCount} Milestones Done
                </span>
              </div>

              {/* Skills Covered in Stage */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {stage.skills.map((sk, sIdx) => (
                  <span key={sIdx} className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                    {sk}
                  </span>
                ))}
              </div>

              {/* Learning Milestones (Part 1 Item 6) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                  STAGE MILESTONES:
                </div>
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
                      background: 'var(--bg-input)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-subtle)'
                    }}
                  >
                    {m.completed ? (
                      <CheckCircle2 size={18} color="var(--accent-emerald)" />
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
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                paddingTop: '12px',
                borderTop: '1px dashed var(--border-subtle)',
                fontSize: '0.82rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fde047' }}>
                  <Code size={16} />
                  <span><strong>Suggested Project:</strong> {stage.projects}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc' }}>
                  <BookOpen size={16} />
                  <span><strong>Resources:</strong> {stage.resources}</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
