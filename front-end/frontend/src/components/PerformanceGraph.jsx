import React from 'react';
import { TrendingUp, Award, Zap } from 'lucide-react';

export default function PerformanceGraph({ data, title = "Overall Performance & Skill Progression", height = 220 }) {
  const points = data || [
    { month: 'Jan', readiness: 42, gpa: 3.65, skills: 35 },
    { month: 'Feb', readiness: 50, gpa: 3.70, skills: 45 },
    { month: 'Mar', readiness: 58, gpa: 3.75, skills: 55 },
    { month: 'Apr', readiness: 65, gpa: 3.80, skills: 62 },
    { month: 'May', readiness: 74, gpa: 3.82, skills: 70 },
    { month: 'Jun', readiness: 84, gpa: 3.84, skills: 78 }
  ];

  const maxVal = 100;
  const graphHeight = height - 60;

  return (
    <div className="clean-card" style={{ padding: '22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--color-brand-primary)" /> {title}
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Real-time trajectory of Career Readiness %, GPA, and Skill Mastery
          </span>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', fontWeight: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-brand-primary)' }} />
            <span style={{ color: 'var(--text-main)' }}>Readiness Score %</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-purple)' }} />
            <span style={{ color: 'var(--text-main)' }}>Skill Mastery %</span>
          </div>
        </div>
      </div>

      {/* SVG Graph Visual */}
      <div style={{ position: 'relative', width: '100%', height: `${graphHeight}px` }}>
        <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((val, idx) => {
            const y = graphHeight - (val / maxVal) * graphHeight;
            return (
              <g key={idx}>
                <line
                  x1="0"
                  y1={y}
                  x2="100%"
                  y2={y}
                  stroke="var(--border-clean)"
                  strokeDasharray="4 4"
                />
                <text x="0" y={y - 4} fill="var(--text-subtle)" fontSize="10">
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Readiness Score Line Path */}
          <path
            d={points.reduce((acc, pt, i) => {
              const x = (i / (points.length - 1)) * 100;
              const y = graphHeight - (pt.readiness / maxVal) * graphHeight;
              return `${acc} ${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
            }, '')}
            fill="none"
            stroke="var(--color-brand-primary)"
            strokeWidth="3"
          />

          {/* Skill Mastery Line Path */}
          <path
            d={points.reduce((acc, pt, i) => {
              const x = (i / (points.length - 1)) * 100;
              const y = graphHeight - (pt.skills / maxVal) * graphHeight;
              return `${acc} ${i === 0 ? 'M' : 'L'} ${x}% ${y}`;
            }, '')}
            fill="none"
            stroke="var(--color-purple)"
            strokeWidth="2"
            strokeDasharray="5 5"
          />

          {/* Point Nodes */}
          {points.map((pt, i) => {
            const x = (i / (points.length - 1)) * 100;
            const yReadiness = graphHeight - (pt.readiness / maxVal) * graphHeight;
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={yReadiness}
                r="5"
                fill="var(--color-brand-primary)"
                stroke="var(--bg-card)"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      {/* Month Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingLeft: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
        {points.map((pt, i) => (
          <span key={i}>{pt.month}</span>
        ))}
      </div>
    </div>
  );
}
