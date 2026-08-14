import React, { useState } from 'react';
import { 
  GraduationCap, 
  Target, 
  BarChart2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  BookOpen,
  Compass
} from 'lucide-react';
import { MOCK_CAREER_GOALS } from '../services/api';

export default function StudentOnboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    major: 'Computer Science & Cybersecurity',
    academic_year: '3rd Year (Junior)',
    gpa: '3.84',
    target_career: 'Cybersecurity Engineer',
    skills: [
      { name: 'Python', proficiency: 65 },
      { name: 'Linux Admin', proficiency: 30 },
      { name: 'Networking', proficiency: 25 },
      { name: 'Operating Systems', proficiency: 45 }
    ],
    interests: ['Cybersecurity', 'Network Architecture', 'AI Security', 'Sports Analytics']
  });

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="clean-card" style={{
        width: '540px',
        maxWidth: '100%',
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dropdown)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="badge badge-blue" style={{ marginBottom: '8px' }}>
            First-Time Student Onboarding (Step {step} of 3)
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0' }}>
            Welcome! Set Up Your Career Profile
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            Enter your academic background & goals to personalize your AI recommendation compass
          </p>
        </div>

        {/* Step Indicator Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[
            { num: 1, label: 'Academic Details' },
            { num: 2, label: 'Target Career' },
            { num: 3, label: 'Current Skills' }
          ].map(s => (
            <div
              key={s.num}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: step === s.num ? 'var(--color-brand-primary)' : 'var(--bg-input)',
                color: step === s.num ? '#ffffff' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              {s.num}. {s.label}
            </div>
          ))}
        </div>

        <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* STEP 1: Academic Details */}
          {step === 1 && (
            <>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Major / Field of Study</label>
                <input
                  type="text"
                  required
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="clean-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Academic Year</label>
                  <select
                    value={formData.academic_year}
                    onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
                    className="clean-input"
                  >
                    <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                    <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                    <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                    <option value="4th Year (Senior)">4th Year (Senior)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Cumulative GPA</label>
                  <input
                    type="text"
                    required
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    className="clean-input"
                  />
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Target Career */}
          {step === 2 && (
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>Select Your Primary Target Career Goal</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {MOCK_CAREER_GOALS.map(goal => {
                  const isSel = formData.target_career === goal.name;
                  return (
                    <div
                      key={goal.id}
                      onClick={() => setFormData({ ...formData, target_career: goal.name })}
                      className="clean-card clean-card-interactive"
                      style={{
                        padding: '14px 18px',
                        border: isSel ? '2px solid var(--color-brand-primary)' : '1px solid var(--border-clean)',
                        background: isSel ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-input)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>{goal.name}</h4>
                        {isSel && <Check size={18} color="var(--color-brand-primary)" />}
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                        {goal.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Current Skills */}
          {step === 3 && (
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>Rate Your Estimated Current Skill Proficiencies (0-100%)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {formData.skills.map((sk, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-input)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 600, marginBottom: '6px' }}>
                      <span>{sk.name}</span>
                      <span style={{ color: 'var(--color-brand-primary)' }}>{sk.proficiency}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sk.proficiency}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormData(prev => ({
                          ...prev,
                          skills: prev.skills.map((s, i) => i === idx ? { ...s, proficiency: val } : s)
                        }));
                      }}
                      style={{ width: '100%', accentColor: 'var(--color-brand-primary)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-secondary"
                style={{ padding: '10px 16px', fontSize: '0.84rem' }}
              >
                Back
              </button>
            ) : <div />}

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.84rem' }}
            >
              <span>{step === 3 ? 'Save Profile & Launch Dashboard' : 'Next Step'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
