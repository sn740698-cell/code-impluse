import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, Sparkles, Activity, Calendar, Filter, Eye } from 'lucide-react';
import { getStudentTelemetry } from '../services/api';

export default function PerformanceGraph({ data: initialData, title = "Overall Performance & Skill Progression", height = 240, studentProfile }) {
  const [points, setPoints] = useState(initialData || [
    { month: 'Jan', readiness: 42, gpa: 3.65, skills: 35 },
    { month: 'Feb', readiness: 50, gpa: 3.70, skills: 45 },
    { month: 'Mar', readiness: 58, gpa: 3.75, skills: 55 },
    { month: 'Apr', readiness: 65, gpa: 3.80, skills: 62 },
    { month: 'May', readiness: 74, gpa: 3.82, skills: 70 },
    { month: 'Jun', readiness: 84, gpa: 3.84, skills: 78 }
  ]);

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
          setPoints(liveResults);
          setSelectedPoint(liveResults[liveResults.length - 1]);
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
          gpa: Number((3.50 + 0.34 * factor).toFixed(2))
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
  const viewHeight = 180;
  const paddingLeft = 50;
  const paddingRight = 30;
  const paddingTop = 20;
  const paddingBottom = 30;

  const drawWidth = viewWidth - paddingLeft - paddingRight;
  const drawHeight = viewHeight - paddingTop - paddingBottom;

  // Metric scale bounds
  const isGpa = activeMetric === 'gpa';
  const maxVal = isGpa ? 4.0 : 100;
  const minVal = isGpa ? 3.0 : 0;

  const getVal = (pt) => pt[activeMetric];

  // Calculate (x, y) coordinates in SVG space
  const coords = displayedPoints.map((pt, i) => {
    const x = paddingLeft + (i / Math.max(1, displayedPoints.length - 1)) * drawWidth;
    const rawVal = getVal(pt);
    const normalized = (rawVal - minVal) / (maxVal - minVal);
    const y = paddingTop + drawHeight - normalized * drawHeight;

    const yReadiness = paddingTop + drawHeight - ((pt.readiness) / 100) * drawHeight;
    const ySkills = paddingTop + drawHeight - ((pt.skills) / 100) * drawHeight;

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
    <div className="clean-card" style={{ padding: '22px', background: 'var(--bg-card)', position: 'relative' }}>
      
      {/* Top Header & Interactive Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.08rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color={activeColor} /> {title}
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Real-time interactive trajectory • Click any data point for deep-dive analysis
          </span>
        </div>

        {/* Metric Selector Buttons */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-clean)' }}>
            <button
              onClick={() => setActiveMetric('readiness')}
              className="tab-pill"
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                background: activeMetric === 'readiness' ? '#38bdf8' : 'transparent',
                color: activeMetric === 'readiness' ? '#000000' : 'var(--text-muted)',
                fontWeight: activeMetric === 'readiness' ? 700 : 500
              }}
            >
              Readiness %
            </button>
            <button
              onClick={() => setActiveMetric('skills')}
              className="tab-pill"
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                background: activeMetric === 'skills' ? '#a855f7' : 'transparent',
                color: activeMetric === 'skills' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: activeMetric === 'skills' ? 700 : 500
              }}
            >
              Skill Mastery %
            </button>
            <button
              onClick={() => setActiveMetric('gpa')}
              className="tab-pill"
              style={{
                fontSize: '0.74rem',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                background: activeMetric === 'gpa' ? '#10b981' : 'transparent',
                color: activeMetric === 'gpa' ? '#ffffff' : 'var(--text-muted)',
                fontWeight: activeMetric === 'gpa' ? 700 : 500
              }}
            >
              GPA
            </button>
          </div>

          {/* Timeframe Selector */}
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '3px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--border-clean)' }}>
            <button
              onClick={() => setTimeframe('6m')}
              style={{
                fontSize: '0.72rem',
                padding: '4px 8px',
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
                padding: '4px 8px',
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
              <stop offset="0%" stopColor={activeColor} stopOpacity="0.4" />
              <stop offset="60%" stopColor={activeColor} stopOpacity="0.1" />
              <stop offset="100%" stopColor={activeColor} stopOpacity="0.0" />
            </linearGradient>

            <filter id="activeGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Lines & Y-Axis Scale */}
          {(isGpa ? [3.0, 3.25, 3.5, 3.75, 4.0] : [0, 25, 50, 75, 100]).map((val, idx) => {
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
                  {isGpa ? val.toFixed(2) : `${val}%`}
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

          {/* Primary Active Line Path (Cyan / Purple / Green) */}
          <path
            d={linePathD}
            fill="none"
            stroke={activeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#activeGlowFilter)"
          />

          {/* Interactive Data Points */}
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
                  x={c.x - 25}
                  y={paddingTop}
                  width="50"
                  height={drawHeight}
                  fill="transparent"
                />

                {/* Outer Concentric White Ring */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered || isSelected ? "9" : "6.5"}
                  fill="#ffffff"
                  stroke={activeColor}
                  strokeWidth="3"
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* Inner Filled Center */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered || isSelected ? "4" : "3"}
                  fill={activeColor}
                  style={{ transition: 'all 0.2s ease' }}
                />

                {/* Interactive Tooltip Pill (Hover or Clicked) */}
                {(isHovered || isSelected) && (
                  <g transform={`translate(${c.x}, ${c.y - 22})`}>
                    <rect
                      x="-30"
                      y="-22"
                      width="60"
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

      {/* Month Labels X-Axis */}
      <div style={{
        display: 'flex',
        justify: 'space-between',
        paddingLeft: '50px',
        paddingRight: '30px',
        marginTop: '6px',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        fontWeight: 700
      }}>
        {coords.map((c, i) => (
          <span
            key={i}
            onClick={() => setSelectedPoint(c)}
            style={{
              cursor: 'pointer',
              color: (hoveredIdx === i || selectedPoint?.month === c.month) ? activeColor : 'var(--text-muted)',
              fontWeight: (selectedPoint?.month === c.month) ? 800 : 600,
              transition: 'color 0.2s ease'
            }}
          >
            {c.month}
          </span>
        ))}
      </div>

      {/* Interactive Detail Card for Selected Point */}
      {selectedPoint && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-input)',
          border: `1px solid ${activeColor}`,
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          fontSize: '0.84rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={15} color={activeColor} />
            <span><strong>{selectedPoint.month} Telemetry Record:</strong></span>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontWeight: 700 }}>
            <span>Readiness: <span style={{ color: '#38bdf8' }}>{selectedPoint.readiness}%</span></span>
            <span>Skill Mastery: <span style={{ color: '#a855f7' }}>{selectedPoint.skills}%</span></span>
            <span>GPA: <span style={{ color: '#10b981' }}>{selectedPoint.gpa}</span></span>
          </div>
        </div>
      )}

    </div>
  );
}
