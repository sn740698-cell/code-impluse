import React, { useState } from 'react';
import { 
  GitBranch, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';
import { MOCK_CAREER_GOALS } from '../services/api';

export default function CareerBranchExplorer() {
  const goal = MOCK_CAREER_GOALS[0];
  const [selectedBranch, setSelectedBranch] = useState(goal.branches[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 1.8 & 1.9 — Career Branch Explorer & Fields to Watch</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Explore specialization tracks within Cybersecurity & emerging industry trends
        </p>
      </div>

      {/* Item 8: Career Branch Explorer */}
      <div className="soft-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitBranch size={18} color="#60a5fa" /> Cybersecurity Domain Branches
        </h3>

        {/* Branch Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
          {goal.branches.map((branch, idx) => {
            const isSel = selectedBranch.name === branch.name;
            return (
              <button
                key={idx}
                onClick={() => setSelectedBranch(branch)}
                className="btn-ghost"
                style={{
                  fontSize: '0.82rem',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSel ? 'linear-gradient(135deg, var(--primary-blue), var(--secondary-purple))' : 'var(--bg-input)',
                  color: isSel ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isSel ? 700 : 500,
                  whiteSpace: 'nowrap'
                }}
              >
                {branch.name}
              </button>
            );
          })}
        </div>

        {/* Selected Branch Detail */}
        <div style={{
          background: 'var(--bg-input)',
          padding: '20px',
          borderRadius: 'var(--radius-sm)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Specialization Track</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px 0' }}>{selectedBranch.name}</h4>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Current Readiness for this path: <strong style={{ color: '#60a5fa' }}>{selectedBranch.readiness}%</strong>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--accent-rose)', background: 'rgba(244, 63, 94, 0.1)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
              <strong>Primary Skill Gap:</strong> {selectedBranch.gap}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '8px' }}>REQUIRED SKILLS:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selectedBranch.req_skills.map((sk, i) => (
                <span key={i} className="badge badge-blue" style={{ fontSize: '0.78rem' }}>{sk}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Item 9: Fields to Watch */}
      <div className="soft-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={18} color="#fde047" /> Emerging Fields to Watch
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {goal.fields_to_watch.map((field, idx) => (
            <div key={idx} className="soft-card" style={{ padding: '18px', background: 'var(--bg-input)' }}>
              <div className="badge badge-yellow" style={{ marginBottom: '8px' }}>Industry Trend</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 6px 0' }}>{field.name}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                {field.why}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
