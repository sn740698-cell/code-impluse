import React, { useState } from 'react';
import { 
  Sparkles, 
  Bookmark, 
  Check, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Info,
  Building,
  UserCheck
} from 'lucide-react';
import { MOCK_OPPORTUNITIES_CATALOG } from '../services/api';

export default function RecommendedOpportunities() {
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES_CATALOG);
  const [expandedId, setExpandedId] = useState(1);

  const toggleSave = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'saved' ? 'recommended' : 'saved' } : o));
  };

  const toggleRegister = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'registered' ? 'recommended' : 'registered' } : o));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 2 — AI Personalized Opportunity Recommendations</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Prioritized multi-signal match engine solving skill gaps, schedule compatibility, and career goals
        </p>
      </div>

      {/* Recommended List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {opportunities.map(opp => {
          const isExpanded = expandedId === opp.id;
          return (
            <div 
              key={opp.id} 
              className="soft-card" 
              style={{
                padding: '24px',
                borderLeft: opp.match_score >= 90 ? '5px solid var(--primary-blue)' : '1px solid var(--border-subtle)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span className="badge badge-blue">{opp.type}</span>
                    <span className="badge badge-purple" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={13} /> {opp.match_score}% Multi-Signal Match
                    </span>
                    {opp.has_conflict && (
                      <span className="badge badge-yellow" style={{ fontSize: '0.68rem' }}>
                        <AlertTriangle size={12} /> Schedule Warning
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px 0' }}>{opp.title}</h3>
                  
                  <div style={{ fontSize: '0.85rem', color: '#c084fc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={14} /> {opp.organization} • Speaker: {opp.speaker}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => toggleRegister(opp.id)}
                    className="btn-primary" 
                    style={{ padding: '8px 16px', fontSize: '0.82rem', background: opp.status === 'registered' ? 'var(--accent-emerald)' : undefined }}
                  >
                    {opp.status === 'registered' ? <><Check size={14} /> Registered</> : 'Register Now'}
                  </button>

                  <button 
                    onClick={() => toggleSave(opp.id)}
                    className="btn-secondary" 
                    style={{ padding: '8px 14px', color: opp.status === 'saved' ? '#fde047' : undefined }}
                  >
                    <Bookmark size={16} fill={opp.status === 'saved' ? '#fde047' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Event Time & Location details */}
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="#60a5fa" /> Date: {new Date(opp.starts_at).toLocaleDateString()} at {new Date(opp.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#c084fc" /> {opp.location}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '16px' }}>
                {opp.description}
              </p>

              {/* Conflict Alert Banner if present */}
              {opp.has_conflict && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(234, 179, 8, 0.1)',
                  border: '1px solid rgba(234, 179, 8, 0.3)',
                  marginBottom: '16px',
                  fontSize: '0.82rem'
                }}>
                  <div style={{ fontWeight: 700, color: '#fde047', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <AlertTriangle size={14} /> Schedule & Academic Workload Warning
                  </div>
                  <div style={{ color: 'var(--text-main)' }}>{opp.conflict_warning}</div>
                  <div style={{ color: '#60a5fa', marginTop: '4px', fontWeight: 600 }}>
                    💡 Alternative Suggestion: {opp.alternative_suggestion}
                  </div>
                </div>
              )}

              {/* Expandable "Why This Opportunity?" Explanation */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px',
                border: '1px solid var(--border-subtle)'
              }}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : opp.id)}
                  className="btn-ghost"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 0,
                    fontSize: '0.84rem',
                    color: '#60a5fa',
                    fontWeight: 700
                  }}
                >
                  <span>Why was this opportunity recommended for you?</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isExpanded && (
                  <div style={{ marginTop: '12px', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p style={{ color: 'var(--text-main)', margin: 0, background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                      <strong>Specific Reason:</strong> {opp.why_recommended}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                      <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>INTEREST ALIGNMENT</span>
                        <div style={{ fontWeight: 700, color: '#60a5fa' }}>{opp.score_breakdown.interest_match}%</div>
                      </div>
                      <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CAREER RELEVANCE</span>
                        <div style={{ fontWeight: 700, color: '#c084fc' }}>{opp.score_breakdown.career_match}%</div>
                      </div>
                      <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SKILL-GAP RELEVANCE</span>
                        <div style={{ fontWeight: 700, color: '#fde047' }}>{opp.score_breakdown.skill_gap_match}%</div>
                      </div>
                      <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LEVEL COMPATIBILITY</span>
                        <div style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{opp.score_breakdown.level_compatibility}%</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
