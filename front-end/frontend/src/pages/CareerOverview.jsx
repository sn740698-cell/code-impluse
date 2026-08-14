import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Target, 
  Award, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import { MOCK_STUDENT_PROFILE, MOCK_CAREER_GOALS } from '../services/api';

export default function CareerOverview({ onNavigate, onOpenAiChat }) {
  const [selectedGoalId, setSelectedGoalId] = useState(1);
  const activeGoal = MOCK_CAREER_GOALS.find(g => g.id === selectedGoalId) || MOCK_CAREER_GOALS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Target Career Selection & AI Readiness Summary Header */}
      <div className="soft-card" style={{
        padding: '24px 28px',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.14) 0%, rgba(147, 51, 234, 0.14) 100%)',
        border: '1px solid var(--border-highlight)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="badge badge-yellow" style={{ marginBottom: '8px' }}>
              <Sparkles size={13} /> Target Career Selection
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px 0' }}>
              Career Goal: <span className="gradient-text-blue">{activeGoal.name}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '650px', margin: 0 }}>
              {activeGoal.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={selectedGoalId}
              onChange={(e) => setSelectedGoalId(Number(e.target.value))}
              style={{
                background: 'var(--bg-input)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 16px',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            >
              {MOCK_CAREER_GOALS.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>

            <button onClick={onOpenAiChat} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              <Sparkles size={15} /> AI Career Analysis
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row matching Item 1 specs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Estimated Career Readiness */}
        <div className="soft-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>ESTIMATED CAREER READINESS</span>
            <HelpCircle size={14} color="var(--text-subtle)" title="Internal AI-generated estimate, not an official industry measurement." />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa', lineHeight: 1 }}>
            {activeGoal.readiness}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '6px' }}>
            Internal AI estimate based on skill profile
          </div>
        </div>

        {/* Current vs Target Level */}
        <div className="soft-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LEVEL COMPARISON</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#c084fc' }}>Level 3</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ Target Level 8</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#c084fc', marginTop: '4px' }}>
            Stage 1 Foundations Active
          </div>
        </div>

        {/* Strongest Area */}
        <div className="soft-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>STRONGEST AREA</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '8px' }}>
            {activeGoal.strongest_area}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Demonstrated via Academic Coursework (92%)
          </div>
        </div>

        {/* Major Skill Gap */}
        <div className="soft-card" style={{ padding: '20px', borderLeft: '4px solid var(--accent-rose)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LARGEST SKILL GAP</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-rose)', marginTop: '8px' }}>
            {activeGoal.largest_gap}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: '4px' }}>
            Current: 25% vs Required: 80%
          </div>
        </div>

      </div>

      {/* Quick Navigation Cards to Part 1 Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        
        <div 
          onClick={() => onNavigate('compass_skills')}
          className="soft-card soft-card-interactive" 
          style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '6px' }}>Part 1.2</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Current Skill Analysis</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Self-reported vs demonstrated skill evidence
            </p>
          </div>
          <ArrowRight size={18} color="#60a5fa" />
        </div>

        <div 
          onClick={() => onNavigate('compass_gaps')}
          className="soft-card soft-card-interactive" 
          style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '6px' }}>Part 1.3 & 1.4</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Goal vs Skill Gap & AI Explanation</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Prerequisite dependency chains & AI diagnosis
            </p>
          </div>
          <ArrowRight size={18} color="#c084fc" />
        </div>

        <div 
          onClick={() => onNavigate('compass_roadmap')}
          className="soft-card soft-card-interactive" 
          style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Part 1.5 & 1.6</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Personalized Roadmap & Milestones</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Foundations, Core Security, and Specialization stages
            </p>
          </div>
          <ArrowRight size={18} color="#fde047" />
        </div>

      </div>

    </div>
  );
}
