import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Target, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { MOCK_CAREER_GOALS } from '../services/api';
import PerformanceGraph from '../components/PerformanceGraph';

export default function CareerOverview({ studentProfile, onNavigate, onOpenAiChat }) {
  const [selectedGoalId, setSelectedGoalId] = useState(1);
  const activeGoal = MOCK_CAREER_GOALS.find(g => g.id === selectedGoalId) || MOCK_CAREER_GOALS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Target Career & AI Readiness Header */}
      <div className="clean-card" style={{
        padding: '24px 28px',
        background: 'rgba(59, 130, 246, 0.08)',
        border: '1px solid rgba(59, 130, 246, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="badge badge-blue" style={{ marginBottom: '8px' }}>
              Student Career Overview
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 6px 0' }}>
              Target Career: <span style={{ color: 'var(--color-brand-primary)' }}>{activeGoal.name}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '650px', margin: 0 }}>
              {activeGoal.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onOpenAiChat} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              <Sparkles size={15} /> AI Career Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Minimal Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Estimated Career Readiness */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CAREER READINESS INDEX</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-brand-primary)', lineHeight: 1, marginTop: '6px' }}>
            {activeGoal.readiness}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-emerald)', marginTop: '6px' }}>
            +6% improvement this month
          </div>
        </div>

        {/* Current vs Target Level */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>CURRENT LEVEL</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-purple)' }}>Level 3</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ Target Level 8</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Stage 1 Foundations Active
          </div>
        </div>

        {/* Strongest Area */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>STRONGEST AREA</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-emerald)', marginTop: '8px' }}>
            {activeGoal.strongest_area}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Demonstrated Grade: 92%
          </div>
        </div>

        {/* Major Skill Gap */}
        <div className="clean-card" style={{ padding: '20px', borderLeft: '4px solid var(--color-rose)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LARGEST SKILL GAP</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-rose)', marginTop: '8px' }}>
            {activeGoal.largest_gap}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Current: 25% vs Required: 80%
          </div>
        </div>

      </div>

      {/* Overall Performance Graph */}
      <PerformanceGraph />

      {/* Quick Access Navigation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        
        <div 
          onClick={() => onNavigate('compass_skills')}
          className="clean-card clean-card-interactive" 
          style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '6px' }}>Part 1.2</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Current Skill Analysis</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Self-reported vs demonstrated skill evidence
            </p>
          </div>
          <ArrowRight size={18} color="var(--color-brand-primary)" />
        </div>

        <div 
          onClick={() => onNavigate('compass_gaps')}
          className="clean-card clean-card-interactive" 
          style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <span className="badge badge-purple" style={{ marginBottom: '6px' }}>Part 1.3 & 1.4</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Goal vs Skill Gap & AI Analysis</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Prerequisite dependency chains & AI diagnosis
            </p>
          </div>
          <ArrowRight size={18} color="var(--color-purple)" />
        </div>

        <div 
          onClick={() => onNavigate('compass_roadmap')}
          className="clean-card clean-card-interactive" 
          style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <span className="badge badge-yellow" style={{ marginBottom: '6px' }}>Part 1.5 & 1.6</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Personalized Roadmap & Milestones</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Foundations, Core Security, and Specialization stages
            </p>
          </div>
          <ArrowRight size={18} color="var(--color-amber)" />
        </div>

      </div>

    </div>
  );
}
