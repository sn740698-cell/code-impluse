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

export default function CareerOverview({ studentProfile, currentUser, onNavigate, onOpenAiChat }) {
  const activeStudent = studentProfile || currentUser;
  const targetCareerName = activeStudent?.target_career || 'Cybersecurity Engineer';
  const studentName = activeStudent?.name || 'Alex Rivera';
  const readinessVal = activeStudent?.career_readiness || 58;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Target Career & Profile Banner */}
      <div className="clean-card" style={{
        padding: '24px 28px',
        background: 'rgba(59, 130, 246, 0.08)',
        border: '1px solid rgba(59, 130, 246, 0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-blue" style={{ marginBottom: '8px' }}>
              Student Profile: {studentName}
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px 0' }}>
              Target Goal: <span style={{ color: 'var(--color-brand-primary)' }}>{targetCareerName}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: 0 }}>
              AI Personalized Career Roadmap & Trajectory Analysis
            </p>
          </div>

          <button onClick={onOpenAiChat} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px' }}>
            <Sparkles size={15} /> Ask AI Compass
          </button>
        </div>
      </div>

      {/* Minimal 4-Stat Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Career Readiness */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>CAREER READINESS INDEX</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-brand-primary)', lineHeight: 1, marginTop: '6px' }}>
            {readinessVal}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-pill)', marginTop: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${readinessVal}%`, height: '100%', background: 'var(--color-brand-primary)', borderRadius: 'var(--radius-pill)' }} />
          </div>
        </div>

        {/* Current Level */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>CURRENT LEVEL</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-purple)' }}>Level 3</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>/ Target Level 8</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Foundations Stage Active
          </div>
        </div>

        {/* Strongest Area */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>STRONGEST SKILL</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-emerald)', marginTop: '8px' }}>
            Python Programming (65%)
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Demonstrated Grade: 92%
          </div>
        </div>

        {/* Major Skill Gap */}
        <div className="clean-card" style={{ padding: '20px', borderLeft: '4px solid var(--color-rose)' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', textTransform: 'uppercase' }}>PRIMARY SKILL GAP</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-rose)', marginTop: '8px' }}>
            Networking (25%)
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Current: 25% vs Required: 80%
          </div>
        </div>

      </div>

      {/* Live Dynamic Performance Graph */}
      <PerformanceGraph studentProfile={activeStudent} />

      {/* Clean Navigation Quick Tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        
        <div 
          onClick={() => onNavigate('compass_skills')}
          className="clean-card clean-card-interactive" 
          style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Skill Analysis Matrix</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Demonstrated proficiency & evidence
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
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Prerequisite Skill Gaps</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Dependency graph & bottleneck analysis
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
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>Personalized Roadmap</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
              Stage-by-stage learning milestones
            </p>
          </div>
          <ArrowRight size={18} color="var(--color-amber)" />
        </div>

      </div>

    </div>
  );
}
