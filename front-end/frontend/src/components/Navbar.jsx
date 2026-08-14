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
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ currentUser, onLogout, theme, toggleTheme, onOpenAiChat }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Networking Fundamentals Workshop recommended (91% match)", time: "15m ago", tag: "Skill Gap" },
    { id: 2, text: "Schedule Warning: DBMS Exam conflicts with weekend event", time: "1h ago", tag: "Academic Alert" },
    { id: 3, text: "Prof. Sarah published a new Web Security Seminar", time: "3h ago", tag: "Opportunity" }
  ];

  return (
    <header className="clean-card" style={{
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
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--color-brand-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Compass size={22} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>AI CAREER COMPASS</span>
            <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>
              {currentUser.role === 'student' ? 'Student Workspace' : 'Faculty Advisory Portal'}
            </span>
          </h1>
        </div>
      </div>

      {/* Quick Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-clean)',
        borderRadius: 'var(--radius-pill)',
        padding: '7px 16px',
        width: '300px'
      }}>
        <Search size={15} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search skills, roadmaps, opportunities..." 
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-main)',
            fontSize: '0.84rem',
            width: '100%'
          }}
        />
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* AI Assistant Button */}
        <button 
          onClick={onOpenAiChat}
          className="btn-primary" 
          style={{ 
            padding: '7px 14px', 
            fontSize: '0.82rem',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--color-purple)'
          }}
        >
          <Sparkles size={15} />
          <span>Ask Qwen3</span>
        </button>

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
              backgroundColor: 'var(--color-rose)',
              borderRadius: '50%'
            }} />
          </button>

          {showNotifications && (
            <div className="clean-card" style={{
              position: 'absolute',
              right: 0,
              top: '44px',
              width: '320px',
              padding: '16px',
              zIndex: 110
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '0.88rem', margin: 0 }}>Notifications</h4>
                <span style={{ fontSize: '0.72rem', color: '#60a5fa', cursor: 'pointer' }}>Clear</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-input)',
                    borderLeft: '3px solid var(--color-brand-primary)',
                    fontSize: '0.78rem'
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{n.text}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Info & Logout Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px', borderLeft: '1px solid var(--border-clean)' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="User Avatar"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--color-brand-primary)'
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
              {currentUser.name}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {currentUser.role === 'student' ? 'Student' : 'Faculty'}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: 'var(--radius-pill)', gap: '6px' }}
            title="Sign Out to Return to Login Page"
          >
            <LogOut size={14} color="var(--color-rose)" />
            <span>Sign Out</span>
          </button>
        </div>

      </div>
    </header>
  );
}
