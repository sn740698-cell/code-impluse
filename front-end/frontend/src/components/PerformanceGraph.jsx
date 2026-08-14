import React, { useState } from 'react';
import { TrendingUp, Award, Sparkles, Activity } from 'lucide-react';

export default function PerformanceGraph({ data, title = "Overall Performance & Skill Progression", height = 240 }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const points = data || [
    { month: 'Jan', readiness: 42, gpa: 3.65, skills: 35 },
    { month: 'Feb', readiness: 50, gpa: 3.70, skills: 45 },
    { month: 'Mar', readiness: 58, gpa: 3.75, skills: 55 },
    { month: 'Apr', readiness: 65, gpa: 3.80, skills: 62 },
    { month: 'May', readiness: 74, gpa: 3.82, skills: 70 },
    { month: 'Jun', readiness: 84, gpa: 3.84, skills: 78 }
  ];

  // SVG viewBox dimensions
  const viewWidth = 800;
  const viewHeight = 180;
  const paddingLeft = 45;
  const paddingRight = 25;
  const paddingTop = 20;
  const paddingBottom = 30;

  const drawWidth = viewWidth - paddingLeft - paddingRight;
  const drawHeight = viewHeight - paddingTop - paddingBottom;
  const maxVal = 100;

  // Calculate (x, y) coordinates in SVG space
  const coords = points.map((pt, i) => {
    const x = paddingLeft + (i / (points.length - 1)) * drawWidth;
    const yReadiness = paddingTop + drawHeight - (pt.readiness / maxVal) * drawHeight;
    const ySkills = paddingTop + drawHeight - (pt.skills / maxVal) * drawHeight;
    return { ...pt, x, yReadiness, ySkills };
  });

  // Build SVG Path Strings
  const linePathD = coords.reduce((acc, c, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.yReadiness.toFixed(1)}`, '');
  const areaPathD = `${linePathD} L ${coords[coords.length - 1].x.toFixed(1)} ${(paddingTop + drawHeight).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(paddingTop + drawHeight).toFixed(1)} Z`;

  const skillsLinePathD = coords.reduce((acc, c, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.ySkills.toFixed(1)}`, '');

  return (
    <div className="clean-card" style={{ padding: '22px', background: 'var(--bg-card)', position: 'relative' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--color-brand-primary)" /> {title}
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Real-time trajectory of Career Readiness %, GPA, and Skill Mastery
          </span>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', fontWeight: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)' }} />
            <span style={{ color: 'var(--text-main)' }}>Readiness Score %</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#a855f7' }} />
            <span style={{ color: 'var(--text-muted)' }}>Skill Mastery %</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
        <svg
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            {/* Soft Cyan/Blue Gradient Fill matching reference pic */}
            <linearGradient id="readinessGlowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.38" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>

            {/* Glowing Drop Shadow Filter for nodes */}
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines & Y-Axis Percentage Scale */}
          {[0, 25, 50, 75, 100].map((val, idx) => {
            const y = paddingTop + drawHeight - (val / maxVal) * drawHeight;
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={viewWidth - paddingRight}
                  y2={y}
                  stroke="var(--border-clean)"
                  strokeDasharray="4 4"
                  strokeOpacity="0.6"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  fill="var(--text-subtle)"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="end"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Smooth Area Fill Under Readiness Curve */}
          <path
            d={areaPathD}
            fill="url(#readinessGlowGradient)"
          />

          {/* Secondary Skill Mastery Dashed Line */}
          <path
            d={skillsLinePathD}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeOpacity="0.7"
          />

          {/* Primary Readiness Connected Line (Cyan / Blue, Matching Shared Pic) */}
          <path
            d={linePathD}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowFilter)"
          />

          {/* Interactive Concentric Glowing Nodes & Tooltip Hover (Matching Shared Pic 2) */}
          {coords.map((c, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Invisible hover target rectangle */}
                <rect
                  x={c.x - 25}
                  y={paddingTop}
                  width="50"
                  height={drawHeight}
                  fill="transparent"
                />

                {/* Outer White Ring Node */}
                <circle
                  cx={c.x}
                  cy={c.yReadiness}
                  r={isHovered ? "9" : "6.5"}
                  fill="#ffffff"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* Inner Filled Dot Center */}
                <circle
                  cx={c.x}
                  cy={c.yReadiness}
                  r={isHovered ? "4" : "3"}
                  fill="#0284c7"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* Hover Tooltip Pill (Matching Shared Image 2 exactly) */}
                {isHovered && (
                  <g transform={`translate(${c.x}, ${c.yReadiness - 22})`}>
                    {/* Tooltip background pill */}
                    <rect
                      x="-30"
                      y="-22"
                      width="60"
                      height="24"
                      rx="6"
                      fill="#0f172a"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      boxShadow="0 4px 12px rgba(0,0,0,0.5)"
                    />
                    {/* Tooltip triangle tail */}
                    <polygon
                      points="-4,2 4,2 0,6"
                      fill="#0891b2"
                    />
                    {/* Tooltip text */}
                    <text
                      x="0"
                      y="-6"
                      fill="#ffffff"
                      fontSize="12"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {c.readiness}%
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Month Labels along X-Axis */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        paddingLeft: '45px',
        paddingRight: '25px',
        marginTop: '6px',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        fontWeight: 700
      }}>
        {coords.map((c, i) => (
          <span
            key={i}
            style={{
              color: hoveredIdx === i ? '#38bdf8' : 'var(--text-muted)',
              transition: 'color 0.2s ease'
            }}
          >
            {c.month}
          </span>
        ))}
      </div>

    </div>
  );
}
