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
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={24} color="var(--color-brand-primary)" /> Opportunity Journey Tracker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Lifecycle progress: Recommended → Saved → Registered → Attended → Feedback
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-clean)', paddingBottom: '10px' }}>
        {[
          { id: 'saved', label: 'Saved Opportunities' },
          { id: 'registered', label: 'Registered' },
          { id: 'attended', label: 'Attended & Feedback' },
          { id: 'completed', label: 'Completed' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className="tab-pill"
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-pill)',
              background: activeSubTab === tab.id ? 'var(--color-brand-primary)' : 'var(--bg-input)',
              color: activeSubTab === tab.id ? '#ffffff' : 'var(--text-muted)',
              fontWeight: activeSubTab === tab.id ? 700 : 400
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunity Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
        {getFiltered().map(opp => (
          <div key={opp.id} className="clean-card clean-card-interactive" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-blue">{opp.type}</span>
                <span className="badge badge-purple">Match {opp.match_score}%</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 6px 0' }}>{opp.title}</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0 0 14px 0', lineHeight: 1.4 }}>
                {opp.description}
              </p>
            </div>

            <div>
              {/* Lifecycle Progress Flow */}
              <div style={{
                background: 'var(--bg-input)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.74rem',
                color: 'var(--text-muted)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Status: <strong style={{ color: 'var(--color-brand-primary)' }}>{opp.status.toUpperCase()}</strong></span>
                {opp.feedback_submitted && <span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>✓ Feedback Logged</span>}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {activeSubTab === 'attended' && !opp.feedback_submitted && (
                  <button 
                    onClick={() => setShowFeedbackModal(opp)} 
                    className="btn-primary" 
                    style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                  >
                    <Star size={14} /> Submit Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
