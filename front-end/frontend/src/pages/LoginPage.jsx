import React, { useState } from 'react';
import { 
  Compass, 
  GraduationCap, 
  UserCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('student'); // 'student' | 'teacher'
  const [email, setEmail] = useState('alex.rivera@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleQuickFillStudent = () => {
    setRole('student');
    setEmail('alex.rivera@university.edu');
    setPassword('student123');
  };

  const handleQuickFillTeacher = () => {
    setRole('teacher');
    setEmail('prof.sarah@university.edu');
    setPassword('teacher123');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: role === 'student' ? 'Alex Rivera' : 'Prof. Sarah Jenkins',
      email,
      role
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
        width: '440px',
        maxWidth: '100%',
        padding: '36px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-dropdown)'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
            Sign in to access personalized career guidance & opportunities
          </p>
        </div>

        {/* Role Tab Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          background: 'var(--bg-input)',
          padding: '4px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => { setRole('student'); setEmail('alex.rivera@university.edu'); }}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'student' ? 'var(--color-brand-primary)' : 'transparent',
              color: role === 'student' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <GraduationCap size={16} /> Student
          </button>

          <button
            type="button"
            onClick={() => { setRole('teacher'); setEmail('prof.sarah@university.edu'); }}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              background: role === 'teacher' ? 'var(--color-purple)' : 'transparent',
              color: role === 'teacher' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <UserCheck size={16} /> Faculty
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              University Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="clean-input"
                style={{ paddingLeft: '40px' }}
                placeholder="name@university.edu"
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>Password</label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.75rem', color: 'var(--color-brand-primary)', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="var(--text-subtle)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="clean-input"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" style={{ cursor: 'pointer' }}>Keep me logged in on this device</label>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              padding: '12px',
              fontSize: '0.9rem',
              marginTop: '6px',
              background: role === 'student' ? 'var(--color-brand-primary)' : 'var(--color-purple)'
            }}
          >
            <span>Sign In to {role === 'student' ? 'Student Portal' : 'Faculty Dashboard'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Quick Fill Actions */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-clean)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginBottom: '10px' }}>
            DEMO LOGIN CREDENTIALS
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={handleQuickFillStudent}
              className="btn-ghost"
              style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}
            >
              Fill Student Demo
            </button>

            <button
              onClick={handleQuickFillTeacher}
              className="btn-ghost"
              style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'rgba(139, 92, 246, 0.1)', color: '#c084fc' }}
            >
              Fill Faculty Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
