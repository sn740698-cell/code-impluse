import React, { useState } from 'react';
import { 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { MOCK_STUDENT_PROFILE } from '../services/api';

export default function AcademicBalancePage() {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const scenarioData = {
    academic_risk: "DBMS (48%) - Active Academic Recovery Plan (7 hrs/week)",
    interests: ["Football (10 hrs/week)", "Sports Analytics", "Cybersecurity"],
    conflict_event: {
      title: "Networking & Protocol Analysis Workshop",
      time: "Saturday 10 AM - 1 PM",
      conflict_with: "DBMS Exam Preparation Window (DBMS Exam Monday 9 AM)"
    },
    alternative_event: {
      title: "Async Networking Fundamentals Webinar",
      time: "Wednesday 6:00 PM Online",
      reason: "Develops identical Networking skills without reducing weekend DBMS exam study hours."
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 3 — Integration With Academic Development & Workload Balance</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Balancing academic recovery, extracurricular interests, and career workshops without burnout
        </p>
      </div>

      {/* Part 3 Item 20: Workload Allocation Balance */}
      <div className="soft-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} color="#60a5fa" /> Academic Risk & Weekly Commitment Allocation
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          
          <div className="soft-card" style={{ padding: '18px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
            <span className="badge badge-rose" style={{ marginBottom: '6px' }}>Academic Risk Flag</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>DBMS Coursework (48%)</h4>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
              Recovery Plan: <strong>7 Hours / Week</strong> allocated for tutorial labs.
            </div>
          </div>

          <div className="soft-card" style={{ padding: '18px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <span className="badge badge-blue" style={{ marginBottom: '6px' }}>Extracurricular Commitment</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>Varsity Football Team</h4>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
              Practice & Matches: <strong>10 Hours / Week</strong>.
            </div>
          </div>

          <div className="soft-card" style={{ padding: '18px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <span className="badge badge-purple" style={{ marginBottom: '6px' }}>Career Skill Workshop</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>Networking Fundamentals</h4>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
              Weekend Workshop: <strong>3 Hours</strong>.
            </div>
          </div>

        </div>
      </div>

      {/* Part 3 Item 21 & 22: Conflict Detection & Alternative Recommendation */}
      <div className="soft-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} color="#fde047" /> AI Schedule Conflict Analysis & Informed Choices
        </h3>

        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          marginBottom: '20px',
          fontSize: '0.88rem',
          lineHeight: 1.5
        }}>
          <strong style={{ color: '#fde047' }}>Conflict Notice:</strong> Your <strong>DBMS Exam</strong> is scheduled for Monday 9 AM. Attending the Saturday Networking Workshop may reduce your available recovery preparation time.
        </div>

        {/* 4 Informed Choices (Part 3 Item 21) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { choice: 'register_anyway', title: '1. Register Anyway', desc: 'Proceed with weekend workshop and adjust study hours.' },
            { choice: 'save_later', title: '2. Save for Later', desc: 'Bookmark opportunity for after exam week.' },
            { choice: 'view_alternative', title: '3. View Alternative', desc: 'Switch to Wednesday async webinar.' },
            { choice: 'adjust_plan', title: '4. Adjust Study Plan', desc: 'Reallocate 3 hrs from football to DBMS prep.' }
          ].map(c => (
            <button
              key={c.choice}
              onClick={() => setSelectedChoice(c.choice)}
              className="soft-card soft-card-interactive"
              style={{
                padding: '14px',
                textAlign: 'left',
                border: selectedChoice === c.choice ? '2px solid var(--primary-blue)' : '1px solid var(--border-subtle)',
                background: selectedChoice === c.choice ? 'var(--bg-card-hover)' : 'var(--bg-card)'
              }}
            >
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{c.title}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.desc}</div>
            </button>
          ))}
        </div>

        {/* Item 22: Alternative Recommendation Box */}
        <div style={{
          padding: '18px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-input)',
          borderLeft: '4px solid var(--primary-blue)'
        }}>
          <span className="badge badge-blue" style={{ marginBottom: '6px' }}>Part 3.22 — Recommended Non-Conflicting Alternative</span>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px 0' }}>{scenarioData.alternative_event.title}</h4>
          <div style={{ fontSize: '0.82rem', color: '#c084fc', marginBottom: '6px' }}>{scenarioData.alternative_event.time}</div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            {scenarioData.alternative_event.reason}
          </p>
        </div>

      </div>

    </div>
  );
}
