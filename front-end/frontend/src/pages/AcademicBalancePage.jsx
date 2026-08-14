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
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { MOCK_STUDENT_PROFILE } from '../services/api';

export default function AcademicBalancePage() {
  const [selectedChoice, setSelectedChoice] = useState('view_alternative');

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
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={24} color="var(--color-amber)" /> Academic Balance & Workload Management
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Schedule conflict detection, recovery plan allocation, and burnout prevention
          </p>
        </div>
      </div>

      {/* Weekly Workload Gauge */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="var(--color-brand-primary)" /> Weekly Workload Allocation (20 Hours Total)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          
          <div className="clean-card" style={{ padding: '18px', background: 'rgba(244, 63, 94, 0.08)', borderLeft: '4px solid var(--color-rose)' }}>
            <span className="badge badge-rose" style={{ marginBottom: '6px' }}>Academic Risk Flag</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>DBMS Recovery Plan</h4>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span>Required Study</span>
              <strong style={{ color: 'var(--color-rose)' }}>7 hrs/wk</strong>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-pill)', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', background: 'var(--color-rose)', borderRadius: 'var(--radius-pill)' }} />
            </div>
          </div>

          <div className="clean-card" style={{ padding: '18px', background: 'rgba(59, 130, 246, 0.08)', borderLeft: '4px solid var(--color-brand-primary)' }}>
            <span className="badge badge-blue" style={{ marginBottom: '6px' }}>Extracurricular</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>Varsity Football Team</h4>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span>Practice & Matches</span>
              <strong style={{ color: 'var(--color-brand-primary)' }}>10 hrs/wk</strong>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-pill)', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: 'var(--color-brand-primary)', borderRadius: 'var(--radius-pill)' }} />
            </div>
          </div>

          <div className="clean-card" style={{ padding: '18px', background: 'rgba(139, 92, 246, 0.08)', borderLeft: '4px solid var(--color-purple)' }}>
            <span className="badge badge-purple" style={{ marginBottom: '6px' }}>Career Workshop</span>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>Networking Fundamentals</h4>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span>Saturday Workshop</span>
              <strong style={{ color: 'var(--color-purple)' }}>3 hrs</strong>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-pill)', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: 'var(--color-purple)', borderRadius: 'var(--radius-pill)' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Conflict Analysis & Informed Choices */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} color="var(--color-amber)" /> Schedule Conflict & Resolution Matrix
        </h3>

        <div style={{
          padding: '14px 18px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          marginBottom: '20px',
          fontSize: '0.86rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <AlertTriangle size={20} color="var(--color-amber)" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: 'var(--color-amber)' }}>Conflict Notice:</strong> Your <strong>DBMS Exam</strong> is on Monday 9 AM. Attending Saturday's 3-hour workshop reduces study preparation time.
          </div>
        </div>

        {/* 4 Informed Choices Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {[
            { choice: 'register_anyway', title: '1. Register Anyway', desc: 'Proceed with workshop; adjust study schedule.' },
            { choice: 'save_later', title: '2. Save for Later', desc: 'Bookmark opportunity for after exam week.' },
            { choice: 'view_alternative', title: '3. View Alternative', desc: 'Switch to Wednesday async webinar.' },
            { choice: 'adjust_plan', title: '4. Adjust Study Plan', desc: 'Reallocate 3 hrs from practice to study.' }
          ].map(c => {
            const isSel = selectedChoice === c.choice;
            return (
              <div
                key={c.choice}
                onClick={() => setSelectedChoice(c.choice)}
                className="clean-card clean-card-interactive"
                style={{
                  padding: '16px',
                  border: isSel ? '2px solid var(--color-brand-primary)' : '1px solid var(--border-clean)',
                  background: isSel ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-input)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{c.title}</span>
                  {isSel && <CheckCircle2 size={16} color="var(--color-brand-primary)" />}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Recommended Non-Conflicting Alternative Box */}
        <div className="clean-card" style={{
          padding: '18px',
          background: 'var(--bg-input)',
          borderLeft: '4px solid var(--color-brand-primary)'
        }}>
          <span className="badge badge-blue" style={{ marginBottom: '6px' }}>Recommended Non-Conflicting Alternative</span>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px 0' }}>{scenarioData.alternative_event.title}</h4>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-purple)', fontWeight: 600, marginBottom: '6px' }}>{scenarioData.alternative_event.time}</div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            {scenarioData.alternative_event.reason}
          </p>
        </div>

      </div>

    </div>
  );
}
