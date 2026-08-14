import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AiChatbotDrawer from './components/AiChatbotDrawer';
import GradientWaves from './components/GradientWaves';

// Part 1: Career Compass Pages
import CareerOverview from './pages/CareerOverview';
import SkillAnalysis from './pages/SkillAnalysis';
import GoalSkillGap from './pages/GoalSkillGap';
import CareerRoadmapPage from './pages/CareerRoadmapPage';
import ProjectRecommendations from './pages/ProjectRecommendations';
import CareerBranchExplorer from './pages/CareerBranchExplorer';

// Part 2: Opportunity Pages
import RecommendedOpportunities from './pages/RecommendedOpportunities';
import OpportunitiesHub from './pages/OpportunitiesHub';
import MyOpportunitiesJourney from './pages/MyOpportunitiesJourney';

// Part 3: Academic Balance Page
import AcademicBalancePage from './pages/AcademicBalancePage';

// Teacher Pages
import TeacherPublishPage from './pages/TeacherPublishPage';
import TeacherAnalyticsPage from './pages/TeacherAnalyticsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('compass_overview');
  const [currentRole, setRole] = useState('student'); // 'student' | 'teacher'
  const [theme, setTheme] = useState('dark');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderActivePage = () => {
    switch (activeTab) {
      // Part 1: Career Compass
      case 'compass_overview':
        return <CareerOverview onNavigate={setActiveTab} onOpenAiChat={() => setIsAiChatOpen(true)} />;
      case 'compass_skills':
        return <SkillAnalysis />;
      case 'compass_gaps':
        return <GoalSkillGap onOpenAiChat={() => setIsAiChatOpen(true)} />;
      case 'compass_roadmap':
        return <CareerRoadmapPage />;
      case 'compass_projects':
        return <ProjectRecommendations />;
      case 'compass_branches':
        return <CareerBranchExplorer />;

      // Part 2: Opportunities
      case 'opp_recommended':
        return <RecommendedOpportunities />;
      case 'opp_catalog':
        return <OpportunitiesHub currentRole={currentRole} />;
      case 'opp_saved_registered':
      case 'opp_feedback':
        return <MyOpportunitiesJourney />;

      // Part 3: Academic Balance
      case 'academic_balance':
        return <AcademicBalancePage />;

      // Teacher Tools
      case 'teacher_publish':
        return <TeacherPublishPage />;
      case 'teacher_analytics':
        return <TeacherAnalyticsPage />;

      default:
        return <CareerOverview onNavigate={setActiveTab} onOpenAiChat={() => setIsAiChatOpen(true)} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Background Animated Gradient Waves Layer */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: theme === 'dark' ? 0.35 : 0.2
      }}>
        <GradientWaves
          horizonColor="#2563eb"
          waveColor="#9333ea"
          crestColor="#fde047"
          speed={0.3}
          amplitude={2.0}
          waveScale={0.5}
          waveRatio={0.8}
          swell={25}
          turbulence={15}
          tilt={1.1}
          zoom={1.0}
          height={5.0}
          fogDepth={12}
          detail="medium"
          brightness={1.1}
          opacity={1.0}
          mouseInteraction={true}
          parallaxStrength={0.4}
          grain={true}
          grainIntensity={0.04}
        />
      </div>

      {/* Top sticky navbar */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar
          currentRole={currentRole}
          setRole={setRole}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />
      </div>

      {/* Main Body */}
      <div style={{
        display: 'flex',
        gap: '24px',
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto',
        padding: '0 24px 40px 24px',
        flex: 1,
        position: 'relative',
        zIndex: 10
      }}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentRole={currentRole}
          onOpenAiChat={() => setIsAiChatOpen(true)}
        />

        <main style={{ flex: 1, minWidth: 0 }}>
          {renderActivePage()}
        </main>
      </div>

      {/* Qwen3 AI Assistant Drawer */}
      <div style={{ position: 'relative', zIndex: 100 }}>
        <AiChatbotDrawer
          isOpen={isAiChatOpen}
          onClose={() => setIsAiChatOpen(false)}
        />
      </div>
    </div>
  );
}