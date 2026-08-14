import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Sparkles, Activity, Calendar, Filter, Eye } from 'lucide-react';
import { getStudentTelemetry } from '../services/api';

export default function PerformanceGraph({ data: initialData, title = "Overall Performance & Skill Progression", height = 260, studentProfile }) {
  const normalizeGpa = (val) => {
    if (typeof val !== 'number') val = parseFloat(val) || 9.0;
    // If val is on old 4.0 scale (e.g. 3.84), scale to 10.0
    return val <= 4.0 ? Number((val * 2.5).toFixed(2)) : Number(val.toFixed(2));
  };

  const [points, setPoints] = useState(() => {
    const raw = initialData || [
      { month: 'Jan', readiness: 42, gpa: 9.15, skills: 35 },
      { month: 'Feb', readiness: 50, gpa: 9.25, skills: 45 },
      { month: 'Mar', readiness: 58, gpa: 9.38, skills: 55 },
      { month: 'Apr', readiness: 65, gpa: 9.50, skills: 62 },
      { month: 'May', readiness: 74, gpa: 9.55, skills: 70 },
      { month: 'Jun', readiness: 84, gpa: 9.60, skills: 78 }
    ];
    return raw.map(p => ({ ...p, gpa: normalizeGpa(p.gpa) }));
  });

  const [activeMetric, setActiveMetric] = useState('readiness'); // readiness, skills, gpa
  const [timeframe, setTimeframe] = useState('6m'); // 6m, 3m
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Load backend telemetry if available
  useEffect(() => {
    async function loadTelemetry() {
      try {
        const liveResults = await getStudentTelemetry();
        if (liveResults && liveResults.length > 0) {
          const formatted = liveResults.map(p => ({ ...p, gpa: normalizeGpa(p.gpa) }));
          setPoints(formatted);
          setSelectedPoint(formatted[formatted.length - 1]);
        }
      } catch (err) {
        console.warn('Telemetry load failed, using local profile model:', err);
      }
    }
    loadTelemetry();
  }, [studentProfile]);

  // Recalculate trajectory dynamically if studentProfile prop updates
  useEffect(() => {
    if (studentProfile?.career_readiness) {
      const targetReadiness = studentProfile.career_readiness;
      const baseR = Math.max(20, targetReadiness - 35);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const computed = months.map((m, i) => {
        const factor = i / (months.length - 1);
        return {
          month: m,
          readiness: Math.round(baseR + (targetReadiness - baseR) * factor),
          skills: Math.round(baseR - 5 + (targetReadiness - baseR + 5) * factor),
          gpa: Number((8.75 + 0.85 * factor).toFixed(2))
        };
      });
      setPoints(computed);
      setSelectedPoint(computed[computed.length - 1]);
    }
  }, [studentProfile]);

  // Filter points based on timeframe selection
  const displayedPoints = timeframe === '3m' ? points.slice(-3) : points;

  // SVG viewBox dimensions
  const viewWidth = 800;
  const viewHeight = 220;
  const paddingLeft = 55;
  const paddingRight = 40;
  const paddingTop = 25;
  const paddingBottom = 45;

  const drawWidth = viewWidth - paddingLeft - paddingRight;
  const drawHeight = viewHeight - paddingTop - paddingBottom;

  // Metric scale bounds
  const isGpa = activeMetric === 'gpa';
  const minVal = 0;
  const maxVal = isGpa ? 10.0 : 100;

  const getVal = (pt) => isGpa ? normalizeGpa(pt.gpa) : pt[activeMetric];

  // Calculate (x, y) coordinates in SVG space
  const coords = displayedPoints.map((pt, i) => {
    const x = paddingLeft + (i / Math.max(1, displayedPoints.length - 1)) * drawWidth;
    const rawVal = getVal(pt);
    // Clamp normalized between 0 and 1
    const normalized = Math.min(1, Math.max(0, (rawVal - minVal) / (maxVal - minVal)));
    const y = paddingTop + drawHeight - normalized * drawHeight;

    const yReadiness = paddingTop + drawHeight - (Math.min(1, Math.max(0, pt.readiness / 100))) * drawHeight;
    const ySkills = paddingTop + drawHeight - (Math.min(1, Math.max(0, pt.skills / 100))) * drawHeight;

    return { ...pt, x, y, yReadiness, ySkills, currentVal: rawVal };
  });

  // Color config based on selected metric
  const getMetricColor = () => {
    switch (activeMetric) {
      case 'readiness': return '#38bdf8';
      case 'skills': return '#a855f7';
      case 'gpa': return '#10b981';
      default: return '#38bdf8';
    }
  };

  const activeColor = getMetricColor();

  // SVG Path Strings
  const linePathD = coords.reduce((acc, c, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`, '');
  const areaPathD = `${linePathD} L ${coords[coords.length - 1].x.toFixed(1)} ${(paddingTop + drawHeight).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(paddingTop + drawHeight).toFixed(1)} Z`;
  const skillsLinePathD = coords.reduce((acc, c, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.ySkills.toFixed(1)}`, '');

  return (
    <div className="clean-card" style={{ padding: '24px', background: 'var(--bg-card)', position: 'relative' }}>
      
      {/* Top Header & Interactive Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
        <div>
          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color={activeColor} /> {title}
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Real-time interactive trajectory • Click data points to view details
          </span>
        </div>

        {/* Metric Selector Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-clean)' }}>
            <button
              onClick={() => setActiveMetric('readiness')}
              style={{
                fontSize: '0.74rem',
                padding: '5px 12px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                background: activeMetric === 'readiness' ? '#38bdf8' : 'transparent',
                color: activeMetric === 'readiness' ? '#000000' : 'var(--text-muted)',
                fontWeight: activeMetric === 'readiness' ? 800 : 500
              }}
            >
              Readiness %
            </button>
            <button
              onClick={() => setActiveMetric('skills')}
              style={{
                fontSize: '0.74rem',
                padding: '5px 12px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                background: activeMetric === 'skills' ? '#a855f7' : 'transparent',
                color: activeMetric === 'skills' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: activeMetric === 'skills' ? 800 : 500
              }}
            >
              Skill Mastery %
            </button>
            <button
              onClick={() => setActiveMetric('gpa')}
              style={{
                fontSize: '0.74rem',
                padding: '5px 12px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                cursor: 'pointer',
                background: activeMetric === 'gpa' ? '#10b981' : 'transparent',
                color: activeMetric === 'gpa' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: activeMetric === 'gpa' ? 800 : 500
              }}
            >
              GPA (Scale 10.0)
            </button>
          </div>

          {/* Timeframe Selector */}
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-clean)' }}>
            <button
              onClick={() => setTimeframe('6m')}
              style={{
                fontSize: '0.72rem',
                padding: '4px 10px',
                border: 'none',
                background: timeframe === '6m' ? 'var(--bg-card-hover)' : 'transparent',
                color: timeframe === '6m' ? 'var(--text-main)' : 'var(--text-subtle)',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: timeframe === '6m' ? 700 : 400
              }}
            >
              6 Months
            </button>
            <button
              onClick={() => setTimeframe('3m')}
              style={{
                fontSize: '0.72rem',
                padding: '4px 10px',
                border: 'none',
                background: timeframe === '3m' ? 'var(--bg-card-hover)' : 'transparent',
                color: timeframe === '3m' ? 'var(--text-main)' : 'var(--text-subtle)',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontWeight: timeframe === '3m' ? 700 : 400
              }}
            >
              3 Months
            </button>
          </div>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div style={{ width: '100%', height: `${height}px`, position: 'relative' }}>
        <svg
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="activeMetricGlowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeColor} stopOpacity="0.35" />
              <stop offset="70%" stopColor={activeColor} stopOpacity="0.08" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.0" />
            </linearGradient>

            <filter id="activeGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines & Y-Axis Scale */}
          {(isGpa ? [0, 2.5, 5.0, 7.5, 10.0] : [0, 25, 50, 75, 100]).map((val, idx) => {
            const normalized = (val - minVal) / (maxVal - minVal);
            const y = paddingTop + drawHeight - normalized * drawHeight;
            return (
              <g key={idx}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={viewWidth - paddingRight}
                  y2={y}
                  stroke="var(--border-clean)"
                  strokeDasharray="4 4"
                  strokeOpacity="0.5"
                />
                <text
                  x={paddingLeft - 12}
                  y={y + 4}
                  fill="var(--text-subtle)"
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="end"
                >
                  {isGpa ? val.toFixed(1) : `${val}%`}
                </text>
              </g>
            );
          })}

          {/* Gradient Area Fill Under Line */}
          <path
            d={areaPathD}
            fill="url(#activeMetricGlowGradient)"
          />

          {/* Secondary Skill Line if Readiness is active */}
          {activeMetric === 'readiness' && (
            <path
              d={skillsLinePathD}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeOpacity="0.7"
            />
          )}

          {/* Primary Active Line Path */}
          <path
            d={linePathD}
            fill="none"
            stroke={activeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#activeGlowFilter)"
          />

          {/* Interactive Data Points & Integrated X-Axis Month Labels */}
          {coords.map((c, i) => {
            const isHovered = hoveredIdx === i;
            const isSelected = selectedPoint?.month === c.month;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setSelectedPoint(c)}
                style={{ cursor: 'pointer' }}
              >
                {/* Invisible hover column */}
                <rect
                  x={c.x - 30}
                  y={paddingTop}
                  width="60"
                  height={drawHeight + 25}
                  fill="transparent"
                />

                {/* Outer Concentric Ring */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered || isSelected ? "8.5" : "6"}
                  fill="#ffffff"
                  stroke={activeColor}
                  strokeWidth="3"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* Inner Center Dot */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered || isSelected ? "4" : "2.5"}
                  fill={activeColor}
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* X-Axis Month Label Rendered Directly Inside SVG to Prevent Any Overlap */}
                <text
                  x={c.x}
                  y={viewHeight - 8}
                  fill={(isHovered || isSelected) ? activeColor : 'var(--text-muted)'}
                  fontSize="12"
                  fontWeight={(isHovered || isSelected) ? "800" : "600"}
                  textAnchor="middle"
                  style={{ transition: 'fill 0.2s ease' }}
                >
                  {c.month}
                </text>

                {/* Tooltip Pill on Hover or Select */}
                {(isHovered || isSelected) && (
                  <g transform={`translate(${c.x}, ${c.y - 24})`}>
                    <rect
                      x="-32"
                      y="-22"
                      width="64"
                      height="24"
                      rx="6"
                      fill="#0f172a"
                      stroke={activeColor}
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="-4,2 4,2 0,6"
                      fill={activeColor}
                    />
                    <text
                      x="0"
                      y="-6"
                      fill="#ffffff"
                      fontSize="11"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {isGpa ? c.currentVal.toFixed(2) : `${c.currentVal}%`}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Detail Card for Selected Point */}
      {selectedPoint && (
        <div style={{
          marginTop: '20px',
          padding: '12px 18px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-input)',
          border: `1px solid ${activeColor}`,
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.84rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} color={activeColor} />
            <span><strong>{selectedPoint.month} Telemetry Record:</strong></span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontWeight: 700, flexWrap: 'wrap' }}>
            <span>Readiness: <span style={{ color: '#38bdf8' }}>{selectedPoint.readiness}%</span></span>
            <span>Skill Mastery: <span style={{ color: '#a855f7' }}>{selectedPoint.skills}%</span></span>
            <span>GPA: <span style={{ color: '#10b981' }}>{normalizeGpa(selectedPoint.gpa)} / 10.0</span></span>
          </div>
        </div>
      )}

    </div>
  );
}
