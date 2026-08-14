import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AiChatbotDrawer from './components/AiChatbotDrawer';
import GradientWaves from './components/GradientWaves';

// Authentication & Onboarding Pages
import LoginPage from './pages/LoginPage';
import StudentOnboarding from './pages/StudentOnboarding';

// Teacher Dashboard
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherPublishPage from './pages/TeacherPublishPage';
import TeacherAnalyticsPage from './pages/TeacherAnalyticsPage';

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
import { getCurrentUserApi, logoutApi } from './services/api';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null); // null = show LoginPage
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);

  const [activeTab, setActiveTab] = useState('compass_overview');
  const [theme, setTheme] = useState('dark');
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    async function checkSession() {
      try {
        const user = await getCurrentUserApi();
        if (user) {
          setCurrentUser(user);
          if (user.role === 'teacher') {
            setActiveTab('teacher_dashboard');
          }
        }
      } catch (err) {
        console.warn('Session check failed:', err);
      }
    }
    checkSession();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleLogin = (user) => {
    if (user.role === 'teacher') {
      const teacherObj = {
        name: user.name || 'Prof. Sarah Jenkins',
        email: user.email || 'prof.sarah@university.edu',
        role: 'teacher'
      };
      setCurrentUser(teacherObj);
      setStudentProfile(null);
      setActiveTab('teacher_dashboard');
    } else {
      const studentObj = {
        name: user.name || 'Alex Rivera',
        email: user.email || 'alex.rivera@university.edu',
        role: 'student',
        target_career: user.target_career || 'Cybersecurity Engineer',
        career_readiness: user.career_readiness || 58,
        skills: user.skills || []
      };
      setCurrentUser(studentObj);
      setStudentProfile(studentObj);
      setActiveTab('compass_overview');
    }
  };

  const handleOnboardingComplete = (profileData) => {
    setStudentProfile(profileData);
    setCurrentUser(prev => ({ ...(prev || {}), ...profileData }));
    setHasCompletedOnboarding(true);
    setActiveTab('compass_overview');
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.warn('Logout error:', err);
    }
    setCurrentUser(null);
    setStudentProfile(null);
    setHasCompletedOnboarding(false);
  };

  const renderActivePage = () => {
    if (currentUser?.role === 'teacher') {
      switch (activeTab) {
        case 'teacher_dashboard':
          return <TeacherDashboard />;
        case 'teacher_publish':
          return <TeacherPublishPage />;
        case 'teacher_analytics':
          return <TeacherAnalyticsPage />;
        case 'opp_catalog':
          return <OpportunitiesHub currentRole="teacher" />;
        default:
          return <TeacherDashboard />;
      }
    }

    // Student Views
    switch (activeTab) {
      // Part 1: Career Compass
      case 'compass_overview':
        return <CareerOverview studentProfile={studentProfile || currentUser} onNavigate={setActiveTab} onOpenAiChat={() => setIsAiChatOpen(true)} />;
      case 'compass_skills':
        return <SkillAnalysis studentProfile={studentProfile || currentUser} />;
      case 'compass_gaps':
        return <GoalSkillGap studentProfile={studentProfile || currentUser} onOpenAiChat={() => setIsAiChatOpen(true)} />;
      case 'compass_roadmap':
        return <CareerRoadmapPage studentProfile={studentProfile || currentUser} />;
      case 'compass_projects':
        return <ProjectRecommendations studentProfile={studentProfile || currentUser} />;
      case 'compass_branches':
        return <CareerBranchExplorer studentProfile={studentProfile || currentUser} />;

      // Part 2: Opportunities
      case 'opp_recommended':
        return <RecommendedOpportunities studentProfile={studentProfile || currentUser} />;
      case 'opp_catalog':
        return <OpportunitiesHub currentRole="student" studentProfile={studentProfile || currentUser} />;
      case 'opp_saved_registered':
      case 'opp_feedback':
        return <MyOpportunitiesJourney studentProfile={studentProfile || currentUser} />;

      // Part 3: Academic Balance
      case 'academic_balance':
        return <AcademicBalancePage studentProfile={studentProfile || currentUser} />;

      default:
        return <CareerOverview studentProfile={studentProfile || currentUser} onNavigate={setActiveTab} onOpenAiChat={() => setIsAiChatOpen(true)} />;
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
        opacity: theme === 'dark' ? 0.28 : 0.15
      }}>
        <GradientWaves
          horizonColor="#2563eb"
          waveColor="#8b5cf6"
          crestColor="#f59e0b"
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
          brightness={1.0}
          opacity={1.0}
          mouseInteraction={true}
          parallaxStrength={0.4}
          grain={true}
          grainIntensity={0.04}
        />
      </div>

      {/* Render Login Page if User is not logged in */}
      {!currentUser ? (
        <LoginPage onLogin={handleLogin} />
      ) : currentUser.role === 'student' && !hasCompletedOnboarding ? (
        /* Render Student Onboarding Flow right after login */
        <StudentOnboarding currentUser={currentUser} onComplete={handleOnboardingComplete} />
      ) : (
        <>
          {/* Top sticky navbar */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <Navbar
              currentUser={studentProfile || currentUser}
              onLogout={handleLogout}
              theme={theme}
              toggleTheme={toggleTheme}
              onOpenAiChat={() => setIsAiChatOpen(true)}
            />
          </div>

          {/* Main Workspace Body */}
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
              currentUser={currentUser}
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
              studentProfile={studentProfile || currentUser}
            />
          </div>
        </>
      )}

    </div>
  );
}