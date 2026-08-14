import React, { useState } from 'react';
import { 
  Compass, 
  GraduationCap, 
  UserCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { loginApi, setStudentCareer } from '../services/api';

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('student'); // 'student' | 'teacher'
  const [name, setName] = useState('Alex Rivera');
  const [email, setEmail] = useState('alex.rivera@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [targetCareer, setTargetCareer] = useState('Cybersecurity Engineer');
  const [showSkillCustomizer, setShowSkillCustomizer] = useState(false);
  const [customSkills, setCustomSkills] = useState([
    { name: 'Python Programming', proficiency: 65 },
    { name: 'Linux Administration', proficiency: 30 },
    { name: 'Networking Fundamentals', proficiency: 25 }
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSwitchToStudent = () => {
    setRole('student');
    setName('Alex Rivera');
    setEmail('alex.rivera@university.edu');
    setPassword('student123');
  };

  const handleSwitchToTeacher = () => {
    setRole('teacher');
    setName('Prof. Sarah Jenkins');
    setEmail('prof.sarah@university.edu');
    setPassword('teacher123');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!customSkills.some(s => s.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      setCustomSkills([...customSkills, { name: newSkill.trim(), proficiency: 50 }]);
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (index) => {
    setCustomSkills(customSkills.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isTeacher = role === 'teacher';
    const finalName = name.trim() || (isTeacher ? 'Prof. Sarah Jenkins' : 'Alex Rivera');
    const finalEmail = email.trim() || (isTeacher ? 'prof.sarah@university.edu' : 'alex.rivera@university.edu');

    const avgProf = customSkills.length > 0
      ? Math.round(customSkills.reduce((acc, s) => acc + s.proficiency, 0) / customSkills.length)
      : 58;

    const userPayload = {
      name: finalName,
      email: finalEmail,
      role: role,
      target_career: isTeacher ? undefined : targetCareer,
      career_readiness: isTeacher ? undefined : avgProf,
      skills: isTeacher ? undefined : customSkills
    };

    try {
      const apiUser = await loginApi({ email: finalEmail, password, role });
      onLogin({ ...(apiUser || {}), ...userPayload });
    } catch {
      onLogin(userPayload);
    } finally {
      setIsLoading(false);
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
        width: '480px',
        maxWidth: '100%',
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dropdown)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 14px auto',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)'
          }}>
            <Compass size={26} color="#ffffff" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 6px 0' }}>
            AI Career Compass
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
            Sign in to access Student Workspace or Faculty Advisory Portal
          </p>
        </div>

        {/* Role Switcher Pills */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          padding: '4px',
          borderRadius: 'var(--radius-pill)',
          marginBottom: '20px',
          border: '1px solid var(--border-clean)'
        }}>
          <button
            type="button"
            onClick={handleSwitchToStudent}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              background: role === 'student' ? 'var(--color-brand-primary)' : 'transparent',
              color: role === 'student' ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <GraduationCap size={16} /> Student Portal
          </button>
          <button
            type="button"
            onClick={handleSwitchToTeacher}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              background: role === 'teacher' ? 'var(--color-purple)' : 'transparent',
              color: role === 'teacher' ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <UserCheck size={16} /> Faculty Advisor
          </button>
        </div>

        {/* Quick Demo Fill Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={handleSwitchToStudent}
            className="btn-ghost"
            style={{ flex: 1, fontSize: '0.74rem', padding: '6px 10px', background: 'var(--bg-input)' }}
          >
            ⚡ Student Demo (Alex Rivera)
          </button>
          <button
            type="button"
            onClick={handleSwitchToTeacher}
            className="btn-ghost"
            style={{ flex: 1, fontSize: '0.74rem', padding: '6px 10px', background: 'var(--bg-input)' }}
          >
            ⚡ Faculty Demo (Prof. Sarah)
          </button>
        </div>

        {/* Main Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="clean-input"
              placeholder={role === 'student' ? 'e.g. Alex Rivera' : 'e.g. Prof. Sarah Jenkins'}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="clean-input"
                style={{ paddingLeft: '38px' }}
                placeholder={role === 'student' ? 'alex.rivera@university.edu' : 'prof.sarah@university.edu'}
              />
              <Mail size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Customized Carrier Skills Accordion (For Student Login) */}
          {role === 'student' && (
            <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-clean)', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setShowSkillCustomizer(!showSkillCustomizer)}
                className="btn-ghost"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.82rem',
                  color: 'var(--color-brand-primary)',
                  fontWeight: 700
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> Customized Carrier Skills & Target Goal
                </span>
                {showSkillCustomizer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showSkillCustomizer && (
                <div style={{ padding: '14px', borderTop: '1px solid var(--border-clean)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Target Career Goal</label>
                    <input
                      type="text"
                      value={targetCareer}
                      onChange={(e) => setTargetCareer(e.target.value)}
                      className="clean-input"
                      placeholder="e.g. Cybersecurity Engineer, AI Data Scientist"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Carrier Skills & Proficiencies</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '150px', overflowY: 'auto' }}>
                      {customSkills.map((sk, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-card)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
                          <span>{sk.name}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 700, color: 'var(--color-brand-primary)' }}>{sk.proficiency}%</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(idx)}
                              className="btn-ghost"
                              style={{ padding: '2px', color: 'var(--color-rose)' }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add New Custom Skill Input */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add custom skill (e.g. Docker, Rust)"
                      className="clean-input"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.76rem', gap: '4px' }}
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="clean-input"
                style={{ paddingLeft: '38px' }}
                placeholder="Password"
              />
              <Lock size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '0.9rem',
              marginTop: '6px',
              background: role === 'teacher' ? 'var(--color-purple)' : 'var(--color-brand-primary)'
            }}
          >
            <span>{isLoading ? 'Authenticating...' : `Sign In to ${role === 'student' ? 'Student Workspace' : 'Faculty Advisor Portal'}`}</span>
            <ArrowRight size={16} />
          </button>
        </form>

      </div>
    </div>
  );
}
