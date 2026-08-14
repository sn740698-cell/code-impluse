import React, { useState, useEffect } from 'react';
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
  Building,
  CheckCircle2,
  Award,
  UserCheck
} from 'lucide-react';
import { 
  getRecommendedOpportunities, 
  saveOpportunity, 
  registerForOpportunity, 
  MOCK_OPPORTUNITIES_CATALOG 
} from '../services/api';

export default function RecommendedOpportunities({ studentProfile }) {
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES_CATALOG);
  const [expandedId, setExpandedId] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getRecommendedOpportunities();
        if (data && data.length > 0) {
          // Merge with static catalog to preserve faculty uploaded items
          const merged = [...data];
          MOCK_OPPORTUNITIES_CATALOG.forEach(catItem => {
            if (catItem.faculty_posted && !merged.some(m => m.id === catItem.id)) {
              merged.unshift(catItem);
            }
          });
          setOpportunities(merged);
        } else {
          setOpportunities([...MOCK_OPPORTUNITIES_CATALOG]);
        }
      } catch (err) {
        console.warn('Opportunities load fallback:', err);
        setOpportunities([...MOCK_OPPORTUNITIES_CATALOG]);
      }
    }
    loadData();
  }, [studentProfile]);

  const handleSave = async (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'saved' ? 'recommended' : 'saved' } : o));
    try {
      await saveOpportunity(id);
    } catch (err) {
      console.warn('Save error:', err);
    }
  };

  const handleRegister = async (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: o.status === 'registered' ? 'recommended' : 'registered' } : o));
    try {
      await registerForOpportunity(id);
    } catch (err) {
      console.warn('Register error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={24} color="var(--color-brand-primary)" /> AI Recommended Opportunities
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Targeted for <strong>{studentProfile?.name || 'Alex Rivera'}</strong> • Goal: <strong>{studentProfile?.target_career || 'Cybersecurity Engineer'}</strong>
          </p>
        </div>
      </div>

      {/* Recommended Catalog List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {opportunities.map(opp => {
          const isExpanded = expandedId === opp.id;
          const matchScore = opp.match_score || 90;
          return (
            <div 
              key={opp.id} 
              className="clean-card" 
              style={{
                padding: '22px',
                borderLeft: opp.faculty_posted ? '5px solid var(--color-purple)' : matchScore >= 90 ? '4px solid var(--color-brand-primary)' : '1px solid var(--border-clean)',
                background: opp.faculty_posted ? 'rgba(139, 92, 246, 0.08)' : 'var(--bg-card)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span className="badge badge-blue">{opp.type || 'Workshop'}</span>
                    
                    {opp.faculty_posted && (
                      <span className="badge badge-purple" style={{ gap: '4px', background: 'var(--color-purple)', color: '#fff', fontWeight: 800 }}>
                        <UserCheck size={13} /> ⭐ Posted & Assigned by Advisory Faculty
                      </span>
                    )}

                    <span className="badge badge-purple" style={{ gap: '4px' }}>
                      <Sparkles size={13} /> {matchScore}% Match
                    </span>
                    
                    {opp.has_conflict && (
                      <span className="badge badge-yellow" style={{ fontSize: '0.68rem', gap: '4px' }}>
                        <AlertTriangle size={12} /> Workload Warning
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0' }}>{opp.title}</h3>
                  
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-purple)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building size={14} /> {opp.organization || 'University Department'} • Speaker: {opp.speaker || 'Senior Advisor'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleRegister(opp.id)}
                    className="btn-primary" 
                    style={{ padding: '8px 16px', fontSize: '0.82rem', background: opp.status === 'registered' ? 'var(--color-emerald)' : undefined }}
                  >
                    {opp.status === 'registered' ? <><CheckCircle2 size={14} /> Registered</> : 'Register Now'}
                  </button>

                  <button 
                    onClick={() => handleSave(opp.id)}
                    className="btn-secondary" 
                    style={{ padding: '8px 14px', color: opp.status === 'saved' ? 'var(--color-amber)' : undefined }}
                  >
                    <Bookmark size={16} fill={opp.status === 'saved' ? 'var(--color-amber)' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Time & Location */}
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} color="var(--color-brand-primary)" /> {opp.starts_at ? new Date(opp.starts_at).toLocaleDateString() : 'Upcoming'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="var(--color-purple)" /> {opp.location || 'Campus Tech Lab'}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '14px' }}>
                {opp.description}
              </p>

              {/* Match Reason Accordion */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px',
                border: '1px solid var(--border-clean)'
              }}>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : opp.id)}
                  className="btn-ghost"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    padding: 0,
                    fontSize: '0.82rem',
                    color: 'var(--color-brand-primary)',
                    fontWeight: 700
                  }}
                >
                  <span>Why is this recommended for your carrier profile?</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isExpanded && (
                  <div style={{ marginTop: '10px', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ color: 'var(--text-main)', margin: 0, background: 'var(--bg-card)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
                      <strong>AI Targeting Reason:</strong> {opp.why_recommended || 'Addresses key skill deficiencies for your chosen career goal.'}
                    </p>
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
