import React from 'react';
import { 
  Compass, 
  Target, 
  BarChart2, 
  GitMerge, 
  Map, 
  Code, 
  GitBranch, 
  Sparkles, 
  Briefcase, 
  Bookmark, 
  MessageSquare, 
  Calendar, 
  PlusCircle, 
  LineChart, 
  Bot,
  UserCheck,
  Layers
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentUser, onOpenAiChat }) {
  const isStudent = currentUser?.role === 'student';

  const studentCompassItems = [
    { id: 'compass_overview', label: '1. Career Overview', icon: Compass },
    { id: 'compass_skills', label: '2. Current Skills', icon: BarChart2 },
    { id: 'compass_gaps', label: '3. Skill Gaps & AI Analysis', icon: GitMerge },
    { id: 'compass_roadmap', label: '4. Career Roadmap', icon: Map },
    { id: 'compass_projects', label: '5. Project Recommendations', icon: Code },
    { id: 'compass_branches', label: '6. Branches & Emerging Fields', icon: GitBranch }
  ];

  const studentOpportunityItems = [
    { id: 'opp_recommended', label: 'Recommended Opportunities', icon: Sparkles, badge: 'AI Match' },
    { id: 'opp_catalog', label: 'All Opportunities', icon: Briefcase },
    { id: 'opp_saved_registered', label: 'My Saved & Registered', icon: Bookmark },
    { id: 'opp_feedback', label: 'Attended & Feedback', icon: MessageSquare }
  ];

  const studentAcademicItems = [
    { id: 'academic_balance', label: 'Workload & Schedule Balance', icon: Calendar }
  ];

  const teacherItems = [
    { id: 'teacher_publish', label: 'Post Opportunity (17 Fields)', icon: PlusCircle, badge: 'Faculty' },
    { id: 'teacher_analytics', label: 'Opportunity Analytics', icon: LineChart },
    { id: 'opp_catalog', label: 'All Published Opportunities', icon: Briefcase }
  ];

  return (
    <aside className="clean-card" style={{
      width: '260px',
      padding: '18px 12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 'calc(100vh - 110px)',
      position: 'sticky',
      top: '90px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
        
        {isStudent ? (
          <>
            {/* Student Navigation: Career Compass */}
            <div>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--color-brand-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0 10px 6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Compass size={13} /> PART 1 — CAREER COMPASS
              </div>

              {studentCompassItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="btn-ghost"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      margin: '2px 0',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--color-brand-primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.83rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={16} color={isActive ? '#ffffff' : 'var(--color-brand-primary)'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Student Navigation: Opportunities */}
            <div>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--color-purple)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '8px 10px 6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderTop: '1px solid var(--border-clean)'
              }}>
                <Sparkles size={13} /> PART 2 — OPPORTUNITIES
              </div>

              {studentOpportunityItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="btn-ghost"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      margin: '2px 0',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--color-purple)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.83rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={16} color={isActive ? '#ffffff' : 'var(--color-purple)'} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="badge badge-purple" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Student Navigation: Academic & Workload Balance */}
            <div>
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--color-amber)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '8px 10px 6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderTop: '1px solid var(--border-clean)'
              }}>
                <Layers size={13} /> PART 3 — ACADEMIC BALANCE
              </div>

              {studentAcademicItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="btn-ghost"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      margin: '2px 0',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'var(--color-amber)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '0.83rem'
                    }}
                  >
                    <Icon size={16} color={isActive ? '#ffffff' : 'var(--color-amber)'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          /* Faculty / Teacher Navigation */
          <div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              color: 'var(--color-purple)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '0 10px 6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              FACULTY TOOLS
            </div>

            {teacherItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="btn-ghost"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    margin: '4px 0',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--color-purple)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.86rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={16} color={isActive ? '#ffffff' : 'var(--color-purple)'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="badge badge-purple" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

      </div>

      {/* Floating Qwen AI Widget */}
      <div 
        onClick={onOpenAiChat}
        className="clean-card clean-card-interactive" 
        style={{
          padding: '12px',
          marginTop: '12px',
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(139, 92, 246, 0.25)',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Bot size={16} color="var(--color-purple)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>Qwen3 AI Assistant</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
          Ask Qwen3 for personalized gap analysis & schedule advice.
        </p>
      </div>
    </aside>
  );
}
