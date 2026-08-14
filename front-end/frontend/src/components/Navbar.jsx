import React, { useState } from 'react';
import { 
  Compass, 
  Bell, 
  Sun, 
  Moon, 
  UserCheck, 
  GraduationCap, 
  Search, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { MOCK_STUDENT_PROFILE } from '../services/api';

export default function Navbar({ currentRole, setRole, theme, toggleTheme, onOpenAiChat }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const notifications = [
    { id: 1, text: "Networking Fundamentals Workshop recommended (91% match)", time: "15m ago", tag: "Skill Gap" },
    { id: 2, text: "Schedule Warning: DBMS Exam conflicts with weekend event", time: "1h ago", tag: "Academic Alert" },
    { id: 3, text: "Prof. Sarah published a new Web Security Seminar", time: "3h ago", tag: "Opportunity" }
  ];

  return (
    <header className="soft-card" style={{
      borderRadius: '0 0 var(--radius-md) var(--radius-md)',
      padding: '14px 28px',
      margin: '0 0 24px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: 'var(--radius-sm)',
          background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-purple) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--primary-blue-glow)'
        }}>
          <Compass size={24} color="#ffffff" className="animate-float" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="gradient-text-blue">AI CAREER COMPASS</span>
            <span className="badge badge-yellow" style={{ fontSize: '0.7rem' }}>
              & OPPORTUNITY RECOMMENDER
            </span>
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Personalized Academic & Skill Development Intelligence
          </p>
        </div>
      </div>

      {/* Quick Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-pill)',
        padding: '8px 16px',
        width: '300px'
      }}>
        <Search size={16} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search skills, roadmaps, opportunities..." 
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontSize: '0.85rem',
            width: '100%'
          }}
        />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        
        {/* AI Assistant Button */}
        <button 
          onClick={onOpenAiChat}
          className="btn-primary" 
          style={{ 
            padding: '8px 16px', 
            fontSize: '0.82rem',
            borderRadius: 'var(--radius-pill)',
            background: 'linear-gradient(135deg, var(--secondary-purple) 0%, var(--primary-blue) 100%)'
          }}
        >
          <Sparkles size={16} />
          <span>Ask Qwen3 Advisor</span>
        </button>

        {/* Role Switcher */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="btn-secondary"
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-pill)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {currentRole === 'student' ? (
              <>
                <GraduationCap size={16} color="#60a5fa" />
                <span>Student Mode</span>
              </>
            ) : (
              <>
                <UserCheck size={16} color="#fde047" />
                <span>Teacher Mode</span>
              </>
            )}
            <ChevronDown size={14} />
          </button>

          {showRoleDropdown && (
            <div className="soft-card" style={{
              position: 'absolute',
              right: 0,
              top: '42px',
              width: '180px',
              padding: '8px',
              zIndex: 110,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <button
                onClick={() => { setRole('student'); setShowRoleDropdown(false); }}
                className="btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '0.82rem',
                  color: currentRole === 'student' ? '#60a5fa' : 'var(--text-main)',
                  fontWeight: currentRole === 'student' ? 700 : 400
                }}
              >
                <GraduationCap size={15} /> Student Mode
              </button>
              <button
                onClick={() => { setRole('teacher'); setShowRoleDropdown(false); }}
                className="btn-ghost"
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  fontSize: '0.82rem',
                  color: currentRole === 'teacher' ? '#fde047' : 'var(--text-main)',
                  fontWeight: currentRole === 'teacher' ? 700 : 400
                }}
              >
                <UserCheck size={15} /> Teacher Mode
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn-ghost"
          style={{ padding: '8px', borderRadius: '50%' }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#fde047" /> : <Moon size={18} color="#c084fc" />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn-ghost"
            style={{ padding: '8px', borderRadius: '50%', position: 'relative' }}
          >
            <Bell size={18} color="var(--text-main)" />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--accent-rose)',
              borderRadius: '50%'
            }} />
          </button>

          {showNotifications && (
            <div className="soft-card" style={{
              position: 'absolute',
              right: 0,
              top: '44px',
              width: '340px',
              padding: '16px',
              zIndex: 110
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', margin: 0 }}>Smart Notifications</h4>
                <span style={{ fontSize: '0.75rem', color: '#60a5fa', cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-input)',
                    borderLeft: '3px solid var(--primary-blue)',
                    fontSize: '0.8rem'
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{n.text}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.time} • {n.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', borderLeft: '1px solid var(--border-subtle)' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Alex Rivera Profile"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--primary-blue)'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
              {MOCK_STUDENT_PROFILE.name}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#c084fc' }}>
              {currentRole === 'student' ? 'Student' : 'Faculty Advisor'}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
