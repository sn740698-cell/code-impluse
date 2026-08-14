import React from 'react';
import { 
  Code, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle 
} from 'lucide-react';
import { MOCK_PROJECT_RECOMMENDATIONS } from '../services/api';

export default function ProjectRecommendations() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 1.7 — Project Recommendations</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Hands-on practical projects matched to your current demonstrated skill level
        </p>
      </div>

      {/* Project Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {MOCK_PROJECT_RECOMMENDATIONS.map(project => (
          <div key={project.id} className="soft-card soft-card-interactive" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-yellow">{project.difficulty}</span>
                <span className="badge badge-blue">Skill Aligned</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>{project.title}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                {project.description}
              </p>

              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', marginBottom: '4px' }}>REQUIRED SKILLS:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {project.required_skills.map((s, i) => (
                    <span key={i} className="badge badge-blue" style={{ fontSize: '0.68rem' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fde047', marginBottom: '4px' }}>DEVELOPS SKILLS:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {project.develops_skills.map((s, i) => (
                    <span key={i} className="badge badge-purple" style={{ fontSize: '0.68rem' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ padding: '10px', fontSize: '0.84rem' }}>
              Start Project Guide <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
