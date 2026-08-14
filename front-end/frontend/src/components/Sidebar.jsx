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
  Layers,
  Users
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentUser, onOpenAiChat }) {
  const isStudent = currentUser?.role === 'student';

  const studentCompassItems = [
    { id: 'compass_overview', label: 'Career Overview', icon: Compass },
    { id: 'compass_skills', label: 'Skills Matrix', icon: BarChart2 },
    { id: 'compass_gaps', label: 'Skill Gaps', icon: GitMerge },
    { id: 'compass_roadmap', label: 'Career Roadmap', icon: Map },
    { id: 'compass_projects', label: 'Projects', icon: Code },
    { id: 'compass_branches', label: 'Branch Explorer', icon: GitBranch }
  ];

  const studentOpportunityItems = [
    { id: 'opp_recommended', label: 'AI Matches', icon: Sparkles },
    { id: 'opp_catalog', label: 'All Opportunities', icon: Briefcase },
    { id: 'opp_saved_registered', label: 'My Journey', icon: Bookmark },
    { id: 'opp_feedback', label: 'Feedback & History', icon: MessageSquare }
  ];

  const studentAcademicItems = [
    { id: 'academic_balance', label: 'Workload Balance', icon: Calendar }
  ];

  const teacherItems = [
    { id: 'teacher_dashboard', label: 'Faculty Roster', icon: Users },
    { id: 'teacher_publish', label: 'Post Opportunity', icon: PlusCircle },
    { id: 'teacher_analytics', label: 'Analytics', icon: LineChart },
    { id: 'opp_catalog', label: 'Opportunities Catalog', icon: Briefcase }
  ];

  const renderNavGroup = (title, items) => (
    <div style={{ marginBottom: '14px' }}>
      <div style={{
        fontSize: '0.66rem',
        fontWeight: 800,
        color: 'var(--text-subtle)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        padding: '0 10px 6px 10px'
      }}>
        {title}
      </div>

      {items.map(item => {
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
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.82rem',
              transition: 'all 0.15s ease'
            }}
          >
            <Icon size={16} color={isActive ? '#ffffff' : 'var(--color-brand-primary)'} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <aside className="clean-card" style={{
      width: '240px',
      padding: '16px 10px',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      height: 'calc(100vh - 110px)',
      position: 'sticky',
      top: '90px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
        {isStudent ? (
          <>
            {renderNavGroup('CAREER COMPASS', studentCompassItems)}
            {renderNavGroup('OPPORTUNITIES', studentOpportunityItems)}
            {renderNavGroup('ACADEMIC BALANCE', studentAcademicItems)}
          </>
        ) : (
          renderNavGroup('FACULTY ADVISOR', teacherItems)
        )}
      </div>

      {/* AI Assistant Quick Card */}
      <div
        onClick={onOpenAiChat}
        className="clean-card clean-card-interactive"
        style={{
          padding: '12px',
          background: 'rgba(139, 92, 246, 0.12)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-purple)' }}>
          <Sparkles size={14} /> Ask Qwen3 AI
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
          Personalized Career Advisor
        </div>
      </div>
    </aside>
  );
}
