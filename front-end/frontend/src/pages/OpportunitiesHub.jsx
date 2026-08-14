import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Bookmark, 
  ExternalLink, 
  Plus, 
  Calendar, 
  MapPin, 
  Building, 
  Check, 
  Award,
  Sparkles,
  X
} from 'lucide-react';
import { MOCK_OPPORTUNITIES } from '../services/api';

export default function OpportunitiesHub({ currentRole }) {
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [newOpp, setNewOpp] = useState({
    title: '',
    organization: '',
    type: 'Internship',
    description: '',
    location: '',
    registration_link: ''
  });

  const handleCreateOpp = (e) => {
    e.preventDefault();
    if (!newOpp.title || !newOpp.organization) return;
    const created = {
      id: Date.now(),
      ...newOpp,
      category: "Faculty Published",
      match_score: 95,
      why_recommended: ["Posted by your department faculty"],
      starts_at: new Date().toISOString(),
      registration_deadline: new Date(Date.now() + 30 * 86400000).toISOString(),
      skills: ["React", "Python", "Full Stack"],
      saved: false,
      registered: false
    };
    setOpportunities([created, ...opportunities]);
    setShowCreateModal(false);
    setNewOpp({ title: '', organization: '', type: 'Internship', description: '', location: '', registration_link: '' });
  };

  const toggleSave = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, saved: !o.saved } : o));
  };

  const toggleRegister = (id) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, registered: !o.registered } : o));
  };

  const filteredOpps = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || opp.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header with Publish Button for Teachers */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Career Opportunities & Internships</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
            Curated internships, hackathons, and research positions indexed for your skill profile
          </p>
        </div>

        {currentRole === 'teacher' && (
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="btn-primary" 
            style={{ background: 'var(--gradient-amber-rose)' }}
          >
            <Plus size={18} /> Post Opportunity
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          flex: 1,
          minWidth: '260px'
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company, skill..." 
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              width: '100%'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Internship', 'Hackathon', 'Research'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className="btn-ghost"
              style={{
                fontSize: '0.82rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                background: filterType === type ? 'var(--gradient-primary)' : 'rgba(255,255,255,0.04)',
                color: filterType === type ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: filterType === type ? 700 : 400
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredOpps.map(opp => (
          <div key={opp.id} className="glass-card glass-card-interactive" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-cyan">{opp.type}</span>
                <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} /> {opp.match_score}% Match
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 4px 0' }}>{opp.title}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 600, marginBottom: '12px' }}>
                <Building size={14} /> {opp.organization}
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                {opp.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="var(--accent-cyan)" /> {opp.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={13} color="var(--accent-amber)" /> Registration Deadline: {new Date(opp.registration_deadline).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
                {opp.skills.map((s, i) => (
                  <span key={i} className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                    {s}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => toggleRegister(opp.id)}
                  className="btn-primary" 
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.84rem', background: opp.registered ? 'var(--gradient-emerald-teal)' : 'var(--gradient-primary)' }}
                >
                  {opp.registered ? <><Check size={16} /> Registered</> : 'Apply Now'}
                </button>

                <button 
                  onClick={() => toggleSave(opp.id)}
                  className="btn-secondary" 
                  style={{ padding: '10px 14px', color: opp.saved ? 'var(--accent-amber)' : 'var(--text-main)' }}
                >
                  <Bookmark size={18} fill={opp.saved ? 'var(--accent-amber)' : 'none'} />
                </button>

                {opp.registration_link && (
                  <a
                    href={opp.registration_link}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    style={{ padding: '10px 12px' }}
                    title="External Link"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Faculty to Publish Opportunity */}
      {showCreateModal && (
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
          <div className="glass-card" style={{ width: '500px', maxWidth: '90vw', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 700 }}>Post New Career Opportunity</h3>
              <button onClick={() => setShowCreateModal(false)} className="btn-ghost" style={{ padding: '6px' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleCreateOpp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Frontend Developer Intern"
                  value={newOpp.title}
                  onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. University Tech Lab"
                  value={newOpp.organization}
                  onChange={(e) => setNewOpp({ ...newOpp, organization: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Type</label>
                  <select
                    value={newOpp.type}
                    onChange={(e) => setNewOpp({ ...newOpp, type: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#fff' }}
                  >
                    <option value="Internship">Internship</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Research">Research</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Remote / Campus"
                    value={newOpp.location}
                    onChange={(e) => setNewOpp({ ...newOpp, location: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe requirements and eligibility..."
                  value={newOpp.description}
                  onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#fff' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                Publish Opportunity
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
