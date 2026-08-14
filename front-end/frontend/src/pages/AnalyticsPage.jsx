import React from 'react';
import { 
  LineChart as ChartIcon, 
  TrendingUp, 
  Brain, 
  Sparkles, 
  Target, 
  CheckCircle, 
  Zap,
  BarChart2
} from 'lucide-react';
import { MOCK_CAREERS } from '../services/api';

export default function AnalyticsPage() {
  const activeCareer = MOCK_CAREERS[0];

  const skillCategories = [
    { category: "Core Software Engineering", level: 90, color: "var(--accent-cyan)" },
    { category: "Artificial Intelligence & RAG", level: 74, color: "var(--accent-purple)" },
    { category: "Database Systems & SQL", level: 86, color: "var(--accent-emerald)" },
    { category: "Cloud & DevOps Architecture", level: 60, color: "var(--accent-amber)" },
    { category: "System Design & Scalability", level: 68, color: "var(--accent-rose)" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Skill & Career Readiness Analytics</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
          In-depth comparative telemetry of your skill proficiencies against industry benchmarks
        </p>
      </div>

      {/* Hero Metric Banner */}
      <div className="glass-card" style={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid var(--border-active)'
      }}>
        <div>
          <div className="badge badge-purple" style={{ marginBottom: '6px' }}>
            <Brain size={14} /> AI Diagnostic Telemetry
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
            Overall Industry Compatibility Score: <span className="gradient-text-primary">84%</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Target Role: <strong>{activeCareer.name}</strong> • 1 Skill Gap Identified for Top 10% Tier
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>ESTIMATED TIME TO 100%</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>3.5 Months</span>
        </div>
      </div>

      {/* Main Grid: Category Competency Bars + Specific Skill Gap Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Category Competency Card */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', margin: '0 0 20px 0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={18} color="var(--accent-cyan)" /> Competency by Domain
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {skillCategories.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.category}</span>
                  <span style={{ fontWeight: 700, color: item.color }}>{item.level}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${item.level}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.8s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Gap Analysis Table */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', margin: '0 0 20px 0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="var(--accent-purple)" /> Priority Skill Gaps
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeCareer.skills.map((skill, idx) => {
              const gap = skill.required_proficiency - skill.current;
              return (
                <div key={idx} style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)' }}>{skill.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      Current: {skill.current}% vs Required: {skill.required_proficiency}%
                    </div>
                  </div>

                  <div>
                    {gap > 0 ? (
                      <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                        Gap: -{gap}%
                      </span>
                    ) : (
                      <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
                        <CheckCircle size={12} /> Target Met
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
