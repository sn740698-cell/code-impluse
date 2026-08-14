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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Briefcase size={24} color="var(--color-brand-primary)" /> Career Opportunities Catalog
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Curated internships, hackathons, and research positions indexed for your skill profile
          </p>
        </div>

        {currentRole === 'teacher' && (
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="btn-primary" 
          >
            <Plus size={18} /> Post Opportunity
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="clean-card" style={{ padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-clean)',
          borderRadius: 'var(--radius-pill)',
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
              className="tab-pill"
              style={{
                fontSize: '0.82rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: filterType === type ? 'var(--color-brand-primary)' : 'var(--bg-input)',
                color: filterType === type ? '#ffffff' : 'var(--text-muted)',
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
          <div key={opp.id} className="clean-card clean-card-interactive" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-blue">{opp.type}</span>
                <span className="badge badge-purple" style={{ gap: '4px' }}>
                  <Sparkles size={12} /> {opp.match_score}% Match
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 4px 0' }}>{opp.title}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--color-purple)', fontWeight: 600, marginBottom: '12px' }}>
                <Building size={14} /> {opp.organization}
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                {opp.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={13} color="var(--color-brand-primary)" /> {opp.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={13} color="var(--color-amber)" /> Deadline: {new Date(opp.registration_deadline).toLocaleDateString()}
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
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.84rem', background: opp.registered ? 'var(--color-emerald)' : undefined }}
                >
                  {opp.registered ? <><Check size={16} /> Registered</> : 'Apply Now'}
                </button>

                <button 
                  onClick={() => toggleSave(opp.id)}
                  className="btn-secondary" 
                  style={{ padding: '10px 14px', color: opp.saved ? 'var(--color-amber)' : undefined }}
                >
                  <Bookmark size={18} fill={opp.saved ? 'var(--color-amber)' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
