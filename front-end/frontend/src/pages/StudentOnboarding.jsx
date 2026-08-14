import React, { useEffect, useState } from 'react';
import { 
  GraduationCap, 
  Target, 
  BarChart2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  UserCheck,
  Plus,
  Trash2
} from 'lucide-react';
import { getCareers, MOCK_CAREER_GOALS, setStudentCareer } from '../services/api';

export default function StudentOnboarding({ currentUser, onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    major: 'Computer Science & Cybersecurity',
    academic_year: '3rd Year (Junior)',
    gpa: '9.60',
    target_career: 'Cybersecurity Engineer',
    skills: [
      { name: 'Python Programming', proficiency: 65 },
      { name: 'Linux Administration', proficiency: 30 },
      { name: 'Networking Fundamentals', proficiency: 25 },
      { name: 'Operating Systems', proficiency: 45 }
    ],
    interests: ['Cybersecurity', 'Network Architecture', 'AI Security', 'Sports Analytics']
  });

  const [careerOptions, setCareerOptions] = useState(MOCK_CAREER_GOALS);
  const [isCustomCareer, setIsCustomCareer] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState(50);

  useEffect(() => {
    if (currentUser?.name) {
      setFormData(prev => ({ ...prev, name: currentUser.name }));
    }
  }, [currentUser]);

  useEffect(() => {
    getCareers().then(setCareerOptions);
  }, []);

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    const exists = formData.skills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase());
    if (!exists) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, { name: newSkillName.trim(), proficiency: Number(newSkillProficiency) }]
      }));
    }
    setNewSkillName('');
    setNewSkillProficiency(50);
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleFinish = async () => {
    const selectedGoalObj = careerOptions.find(c => c.name.toLowerCase() === formData.target_career.toLowerCase());
    if (selectedGoalObj) {
      try {
        await setStudentCareer(selectedGoalObj.id, 80);
      } catch (err) {
        console.warn('Set career error:', err);
      }
    }

    const avgProf = formData.skills.length > 0
      ? Math.round(formData.skills.reduce((sum, s) => sum + s.proficiency, 0) / formData.skills.length)
      : 58;

    onComplete({
      ...formData,
      career_readiness: avgProf
    });
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
        width: '560px',
        maxWidth: '100%',
        padding: '36px',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="badge badge-blue" style={{ marginBottom: '8px' }}>
            Student Onboarding • Step {step} of 3
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
            Configure Your Carrier Profile
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            Enter your exact name, carrier goal, and skills for custom AI indexing
          </p>
        </div>

        {/* Step 1: Personal Info & Name */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Student Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="clean-input"
                placeholder="e.g. Alex Rivera, Jordan Smith"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Academic Major / Program</label>
              <input
                type="text"
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                className="clean-input"
                placeholder="e.g. Computer Science & Cybersecurity"
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
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Cumulative GPA (Scale 10.0)</label>
                <input
                  type="text"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  className="clean-input"
                  placeholder="e.g. 9.60"
                />
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary" style={{ marginTop: '10px', padding: '12px', gap: '6px' }}>
              <span>Next: Target Career Goal</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Target Career */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block' }}>Select or Type Target Career Goal</label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {careerOptions.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    setFormData({ ...formData, target_career: c.name });
                    setIsCustomCareer(false);
                  }}
                  className="clean-card clean-card-interactive"
                  style={{
                    padding: '12px 16px',
                    background: formData.target_career === c.name && !isCustomCareer ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-input)',
                    border: formData.target_career === c.name && !isCustomCareer ? '1px solid var(--color-brand-primary)' : '1px solid var(--border-clean)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>{c.name}</h4>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{c.description}</p>
                  </div>
                  {formData.target_career === c.name && !isCustomCareer && <Check size={16} color="var(--color-brand-primary)" />}
                </div>
              ))}
            </div>

            {/* Custom Career Input */}
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Or Type Custom Career Goal</label>
              <input
                type="text"
                value={isCustomCareer ? formData.target_career : ''}
                onChange={(e) => {
                  setIsCustomCareer(true);
                  setFormData({ ...formData, target_career: e.target.value });
                }}
                className="clean-input"
                placeholder="e.g. Quantum Computing Engineer, Robotics Developer"
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Back</button>
              <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, padding: '12px', gap: '6px' }}>
                <span>Next: Carrier Skills</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Carrier Skills */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block' }}>Add Your Carrier Skills & Proficiencies (%)</label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
              {formData.skills.map((sk, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-input)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 600 }}>{sk.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--color-brand-primary)' }}>{sk.proficiency}%</span>
                    <button onClick={() => handleRemoveSkill(idx)} className="btn-ghost" style={{ padding: '4px', color: 'var(--color-rose)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Skill Form */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="Skill name (e.g. Docker, Rust)"
                className="clean-input"
                style={{ flex: 2 }}
              />
              <input
                type="number"
                min="0"
                max="100"
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value)}
                placeholder="Proficiency %"
                className="clean-input"
                style={{ flex: 1 }}
              />
              <button onClick={handleAddCustomSkill} className="btn-secondary" style={{ padding: '8px 14px', gap: '4px' }}>
                <Plus size={14} /> Add
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => setStep(2)} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Back</button>
              <button onClick={handleFinish} className="btn-primary" style={{ flex: 2, padding: '12px', gap: '6px' }}>
                <Sparkles size={16} /> Complete & Launch Mentora Workspace
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
