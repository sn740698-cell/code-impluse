import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Target, 
  Award, 
  Briefcase, 
  TrendingUp, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  Bookmark,
  Check,
  Zap
} from 'lucide-react';
import { MOCK_USER, MOCK_CAREERS, MOCK_OPPORTUNITIES, MOCK_ACADEMICS } from '../services/api';

export default function OverviewDashboard({ onNavigate, onOpenAiChat }) {
  const [activeCareer] = useState(MOCK_CAREERS[0]);
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES);

  const toggleSave = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
  };

  const toggleRegister = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, registered: !o.registered } : o));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hero Welcome Banner */}
      <div className="glass-card" style={{
        padding: '28px 32px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
        border: '1px solid var(--border-active)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
              <Sparkles size={12} /> AI Career Compass Intelligence
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 6px 0' }}>
              Welcome back, <span className="gradient-text-primary">{MOCK_USER.full_name}</span>! 👋
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: 0 }}>
              You are currently <strong style={{ color: 'var(--accent-emerald)' }}>84% ready</strong> for your target career as a <strong>{MOCK_USER.active_goal}</strong>.
            </p>
          </div>

          <button 
            onClick={onOpenAiChat}
            className="btn-primary animate-pulse-glow"
            style={{ padding: '12px 24px', fontSize: '0.92rem' }}
          >
            <Zap size={18} />
            <span>Launch AI Counseling</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        
        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Trophy size={24} color="var(--accent-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CAREER READINESS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>84%</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>+4% from last month</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Award size={24} color="var(--accent-purple)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CUMULATIVE GPA</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-purple)' }}>{MOCK_ACADEMICS.cgpa}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Top 5% of CS Batch</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Target size={24} color="var(--accent-emerald)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ACTIVE ROADMAP</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Stage 2 of 3</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>6 Milestones Completed</div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Briefcase size={24} color="var(--accent-amber)" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>MATCHED OPPORTUNITIES</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)' }}>3 Active</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)' }}>Highest: 96% Match</div>
          </div>
        </div>

      </div>

      {/* Main Grid: Active Goal Readiness + Skill Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Active Target Career Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span className="badge badge-cyan">Active Target Role</span>
              <button onClick={() => onNavigate('goals')} className="btn-ghost" style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Change Target <ArrowRight size={14} />
              </button>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0 0 8px 0' }}>
              {activeCareer.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {activeCareer.description}
            </p>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
                KEY DOMAIN FOCUS AREAS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {activeCareer.fields_to_watch.map((field, idx) => (
                  <span key={idx} className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Career Readiness Index</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>84% Ready</div>
            </div>
            <button onClick={() => onNavigate('goals')} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              View Skill Roadmap
            </button>
          </div>
        </div>

        {/* Skill Proficiency Breakdown */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Required Skill Matrix</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target vs Current</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activeCareer.skills.map((skill, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{skill.name}</span>
                  <span style={{ color: skill.current >= skill.required_proficiency ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                    {skill.current}% / {skill.required_proficiency}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${skill.current}%`,
                    height: '100%',
                    background: skill.current >= skill.required_proficiency ? 'var(--gradient-emerald-teal)' : 'var(--gradient-amber-rose)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 0.6s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recommended Opportunities Section */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>AI Recommended Opportunities</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              Tailored internships, research grants, and hackathons based on your profile
            </p>
          </div>
          <button onClick={() => onNavigate('opportunities')} className="btn-ghost" style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
            Explore Catalog →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {opportunities.map(opp => (
            <div key={opp.id} className="glass-card glass-card-interactive" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span className="badge badge-cyan">{opp.type}</span>
                  <span className="badge badge-emerald">{opp.match_score}% Match</span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>{opp.title}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', fontWeight: 600, marginBottom: '8px' }}>
                  {opp.organization}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
                  {opp.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                  {opp.skills.map((s, i) => (
                    <span key={i} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => toggleRegister(opp.id)}
                    className="btn-primary" 
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', background: opp.registered ? 'var(--gradient-emerald-teal)' : 'var(--gradient-primary)' }}
                  >
                    {opp.registered ? <><Check size={14} /> Registered</> : 'Apply / Register'}
                  </button>

                  <button 
                    onClick={() => toggleSave(opp.id)}
                    className="btn-secondary" 
                    style={{ padding: '8px 12px', color: opp.saved ? 'var(--accent-amber)' : 'var(--text-main)' }}
                  >
                    <Bookmark size={16} fill={opp.saved ? 'var(--accent-amber)' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
