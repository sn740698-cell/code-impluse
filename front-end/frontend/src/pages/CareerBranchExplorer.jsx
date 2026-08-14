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
      
      {/* Visual Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitBranch size={24} color="var(--color-purple)" /> Career Branch Explorer & Emerging Trends
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
            Explore specialization tracks within Cybersecurity & emerging industry trends
          </p>
        </div>
      </div>

      {/* Career Branch Explorer */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitBranch size={18} color="var(--color-brand-primary)" /> Cybersecurity Domain Branches
        </h3>

        {/* Branch Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
          {goal.branches.map((branch, idx) => {
            const isSel = selectedBranch.name === branch.name;
            return (
              <button
                key={idx}
                onClick={() => setSelectedBranch(branch)}
                className="tab-pill"
                style={{
                  fontSize: '0.82rem',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSel ? 'var(--color-brand-primary)' : 'var(--bg-input)',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Specialization Track</span>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px 0' }}>{selectedBranch.name}</h4>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Current Readiness: <strong style={{ color: 'var(--color-brand-primary)' }}>{selectedBranch.readiness}%</strong>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--color-rose)', background: 'rgba(244, 63, 94, 0.1)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(244, 63, 94, 0.25)' }}>
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

      {/* Fields to Watch */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={18} color="var(--color-amber)" /> Emerging Fields to Watch
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {goal.fields_to_watch.map((field, idx) => (
            <div key={idx} className="clean-card" style={{ padding: '18px', background: 'var(--bg-input)' }}>
              <span className="badge badge-yellow" style={{ marginBottom: '8px' }}>Industry Trend</span>
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
