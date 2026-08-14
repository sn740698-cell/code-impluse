import React, { useState } from 'react';
import { 
  Bookmark, 
  CheckCircle, 
  Star, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  Check, 
  X,
  Layers
} from 'lucide-react';
import { MOCK_OPPORTUNITIES_CATALOG } from '../services/api';

export default function MyOpportunitiesJourney() {
  const [activeSubTab, setActiveSubTab] = useState('saved');
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES_CATALOG);
  const [showFeedbackModal, setShowFeedbackModal] = useState(null);
  const [feedbackData, setFeedbackData] = useState({ rating: 5, useful: true, comment: '' });

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setOpportunities(prev => prev.map(o => o.id === showFeedbackModal.id ? { ...o, feedback_submitted: true } : o));
    setShowFeedbackModal(null);
    setFeedbackData({ rating: 5, useful: true, comment: '' });
  };

  const getFiltered = () => {
    switch (activeSubTab) {
      case 'saved':
        return opportunities.filter(o => o.status === 'saved');
      case 'registered':
        return opportunities.filter(o => o.status === 'registered');
      case 'attended':
        return opportunities.filter(o => o.status === 'attended' || o.status === 'registered');
      case 'completed':
        return opportunities.filter(o => o.status === 'completed' || o.feedback_submitted);
      default:
        return opportunities;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 2.17 & 2.18 — Opportunity Journey & Management</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Track lifecycle progress: Recommended → Saved → Registered → Attended → Feedback
        </p>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
        {[
          { id: 'saved', label: 'Saved Opportunities' },
          { id: 'registered', label: 'Registered' },
          { id: 'attended', label: 'Attended & Feedback' },
          { id: 'completed', label: 'Completed' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`tab-pill ${activeSubTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunity Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {getFiltered().map(opp => (
          <div key={opp.id} className="soft-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-blue">{opp.type}</span>
                <span className="badge badge-purple">Match {opp.match_score}%</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px 0' }}>{opp.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 14px 0', lineHeight: 1.4 }}>
                {opp.description}
              </p>
            </div>

            <div>
              {/* Lifecycle Progress Flow (Part 2 Item 18) */}
              <div style={{
                background: 'var(--bg-input)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Journey: <strong>Recommended → {opp.status.toUpperCase()}</strong></span>
                {opp.feedback_submitted && <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>✓ Feedback Logged</span>}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {activeSubTab === 'attended' && !opp.feedback_submitted && (
                  <button 
                    onClick={() => setShowFeedbackModal(opp)} 
                    className="btn-primary" 
                    style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: 'linear-gradient(135deg, var(--tertiary-yellow), var(--secondary-purple))' }}
                  >
                    <Star size={14} /> Submit Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Modal (Part 2 Item 19) */}
      {showFeedbackModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="soft-card" style={{ width: '460px', maxWidth: '90vw', padding: '26px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Feedback for {showFeedbackModal.title}</h3>
              <button onClick={() => setShowFeedbackModal(null)} className="btn-ghost" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleFeedbackSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>Rating (1 to 5 Stars)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackData({ ...feedbackData, rating: star })}
                      className="btn-ghost"
                      style={{ padding: '4px' }}
                    >
                      <Star size={24} color={star <= feedbackData.rating ? '#fde047' : 'var(--text-subtle)'} fill={star <= feedbackData.rating ? '#fde047' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>Was this opportunity useful?</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setFeedbackData({ ...feedbackData, useful: true })}
                    className={`btn-secondary ${feedbackData.useful ? 'badge-emerald' : ''}`}
                    style={{ flex: 1 }}
                  >
                    Yes, Useful
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedbackData({ ...feedbackData, useful: false })}
                    className={`btn-secondary ${!feedbackData.useful ? 'badge-rose' : ''}`}
                    style={{ flex: 1 }}
                  >
                    Not Really
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>Comments / Learning Highlights</label>
                <textarea
                  rows={3}
                  placeholder="Share what skills you learned or feedback..."
                  value={feedbackData.comment}
                  onChange={(e) => setFeedbackData({ ...feedbackData, comment: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                />
              </div>

              <button type="submit" className="btn-primary">
                Submit Feedback to AI Engine
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
