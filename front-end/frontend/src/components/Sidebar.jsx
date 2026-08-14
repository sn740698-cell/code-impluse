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
  CheckCircle2, 
  MessageSquare, 
  Calendar, 
  PlusCircle, 
  LineChart, 
  Bot,
  Layers
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, currentRole, onOpenAiChat }) {
  const compassItems = [
    { id: 'compass_overview', label: '1. Career Overview', icon: Compass },
    { id: 'compass_skills', label: '2. Current Skills', icon: BarChart2 },
    { id: 'compass_gaps', label: '3. Skill Gaps & AI Analysis', icon: GitMerge },
    { id: 'compass_roadmap', label: '4. Career Roadmap', icon: Map },
    { id: 'compass_projects', label: '5. Project Recommendations', icon: Code },
    { id: 'compass_branches', label: '6. Branches & Emerging Fields', icon: GitBranch }
  ];

  const opportunityItems = [
    { id: 'opp_recommended', label: 'Recommended Opportunities', icon: Sparkles, badge: 'AI Match' },
    { id: 'opp_catalog', label: 'All Opportunities', icon: Briefcase },
    { id: 'opp_saved_registered', label: 'My Saved & Registered', icon: Bookmark },
    { id: 'opp_feedback', label: 'Attended & Feedback', icon: MessageSquare }
  ];

  const academicItems = [
    { id: 'academic_balance', label: 'Workload & Schedule Balance', icon: Calendar }
  ];

  const teacherItems = [
    { id: 'teacher_publish', label: 'Post Opportunity (17 Fields)', icon: PlusCircle, badge: 'Faculty' },
    { id: 'teacher_analytics', label: 'Opportunity Analytics', icon: LineChart }
  ];

  return (
    <aside className="soft-card" style={{
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
        
        {/* Section 1: Career Compass */}
        <div>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#60a5fa',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0 10px 6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Compass size={13} /> PART 1 — CAREER COMPASS
          </div>

          {compassItems.map(item => {
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
                  background: isActive ? 'linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-purple) 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.83rem',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#ffffff' : '#60a5fa'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Section 2: AI Opportunity Recommendations */}
        <div>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#c084fc',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '8px 10px 6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <Sparkles size={13} /> PART 2 — OPPORTUNITIES
          </div>

          {opportunityItems.map(item => {
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
                  background: isActive ? 'linear-gradient(135deg, var(--secondary-purple) 0%, var(--primary-blue) 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.83rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={isActive ? '#ffffff' : '#c084fc'} />
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

        {/* Section 3: Academic & Balance */}
        <div>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#fde047',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '8px 10px 6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <Layers size={13} /> PART 3 — ACADEMIC BALANCE
          </div>

          {academicItems.map(item => {
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
                  background: isActive ? 'linear-gradient(135deg, var(--tertiary-yellow) 0%, var(--primary-blue) 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.83rem'
                }}
              >
                <Icon size={16} color={isActive ? '#ffffff' : '#fde047'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Teacher Mode Section */}
        {currentRole === 'teacher' && (
          <div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: '#fde047',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '8px 10px 6px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              borderTop: '1px solid var(--border-subtle)'
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
                    padding: '8px 12px',
                    margin: '2px 0',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'linear-gradient(135deg, var(--tertiary-yellow) 0%, var(--secondary-purple) 100%)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.83rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icon size={16} color={isActive ? '#ffffff' : '#fde047'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="badge badge-yellow" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
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
        className="soft-card soft-card-interactive" 
        style={{
          padding: '12px',
          marginTop: '12px',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(147, 51, 234, 0.12) 100%)',
          border: '1px solid var(--border-purple)',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Bot size={16} color="#c084fc" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)' }}>Qwen3 AI Reasoning</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
          Ask Qwen3 for personalized gap analysis & schedule advice.
        </p>
      </div>
    </aside>
  );
}
