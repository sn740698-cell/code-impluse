import React from 'react';
import { 
  LineChart as ChartIcon, 
  Eye, 
  Bookmark, 
  UserCheck, 
  CheckCircle, 
  Star, 
  MessageSquare 
} from 'lucide-react';
import { MOCK_TEACHER_OPPORTUNITY_ANALYTICS } from '../services/api';

export default function TeacherAnalyticsPage() {
  const data = MOCK_TEACHER_OPPORTUNITY_ANALYTICS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 4 — Opportunity Analytics for Teachers</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Evaluate student engagement, attendance ratios, ratings, and popular skill category demands
        </p>
      </div>

      {/* 5 KPI Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div className="soft-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL VIEWS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#60a5fa' }}>{data.total_views}</div>
        </div>

        <div className="soft-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL SAVES</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fde047' }}>{data.total_saves}</div>
        </div>

        <div className="soft-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>REGISTRATIONS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc' }}>{data.total_registrations}</div>
        </div>

        <div className="soft-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ATTENDED</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>{data.total_attended}</div>
        </div>

        <div className="soft-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>AVG RATING</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fde047', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={20} fill="#fde047" /> {data.avg_student_rating}
          </div>
        </div>
      </div>

      {/* Student Feedback Comments Log */}
      <div className="soft-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} color="#c084fc" /> Student Workshop Feedback Log
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.recent_feedback.map((fb, idx) => (
            <div key={idx} style={{
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-input)',
              borderLeft: '3px solid var(--primary-blue)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <strong style={{ color: 'var(--text-main)' }}>{fb.student}</strong>
                <div style={{ color: '#fde047', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <Star size={14} fill="#fde047" /> {fb.rating}/5
                </div>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#60a5fa', marginBottom: '4px' }}>Workshop: {fb.workshop}</div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-main)', margin: 0, fontStyle: 'italic' }}>
                "{fb.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
