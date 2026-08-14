import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  MessageSquare, 
  Plus, 
  Search, 
  Brain,
  Sparkles,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Send,
  X,
  ChevronRight
} from 'lucide-react';
import PerformanceGraph from '../components/PerformanceGraph';
import { getTeacherStudents } from '../services/api';

export default function TeacherDashboard() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alex Rivera",
      email: "alex.rivera@university.edu",
      career_goal: "Cybersecurity Engineer",
      readiness: 58,
      status: "good_standing",
      lacking_skills: ["Networking Fundamentals (25%)", "Linux Administration (30%)"],
      strongest_skill: "Python Programming (65%)",
      gpa: "3.84",
      last_active: "2 hours ago",
      performance_history: [
        { month: 'Jan', readiness: 42, gpa: 3.65, skills: 35 },
        { month: 'Feb', readiness: 48, gpa: 3.70, skills: 42 },
        { month: 'Mar', readiness: 52, gpa: 3.78, skills: 50 },
        { month: 'Apr', readiness: 55, gpa: 3.80, skills: 54 },
        { month: 'May', readiness: 58, gpa: 3.84, skills: 58 },
        { month: 'Jun', readiness: 65, gpa: 3.85, skills: 62 }
      ]
    },
    {
      id: 2,
      name: "Jordan Lee",
      email: "jordan.lee@university.edu",
      career_goal: "Full Stack AI Engineer",
      readiness: 64,
      status: "needs_attention",
      lacking_skills: ["Database SQL Indexing (30%)", "Vector Search (40%)"],
      strongest_skill: "React & TypeScript (85%)",
      gpa: "3.52",
      last_active: "1 day ago",
      performance_history: [
        { month: 'Jan', readiness: 40, gpa: 3.40, skills: 38 },
        { month: 'Feb', readiness: 46, gpa: 3.45, skills: 44 },
        { month: 'Mar', readiness: 52, gpa: 3.48, skills: 50 },
        { month: 'Apr', readiness: 58, gpa: 3.50, skills: 56 },
        { month: 'May', readiness: 64, gpa: 3.52, skills: 62 },
        { month: 'Jun', readiness: 70, gpa: 3.55, skills: 68 }
      ]
    },
    {
      id: 3,
      name: "Morgan Taylor",
      email: "morgan.taylor@university.edu",
      career_goal: "Data Scientist",
      readiness: 42,
      status: "at_risk",
      lacking_skills: ["Statistics & Probability (20%)", "PyTorch (25%)"],
      strongest_skill: "Python Data Analysis (55%)",
      gpa: "3.10",
      last_active: "5 days ago",
      performance_history: [
        { month: 'Jan', readiness: 30, gpa: 3.00, skills: 28 },
        { month: 'Feb', readiness: 34, gpa: 3.05, skills: 32 },
        { month: 'Mar', readiness: 38, gpa: 3.08, skills: 35 },
        { month: 'Apr', readiness: 40, gpa: 3.10, skills: 38 },
        { month: 'May', readiness: 42, gpa: 3.10, skills: 40 },
        { month: 'Jun', readiness: 48, gpa: 3.15, skills: 45 }
      ]
    },
    {
      id: 4,
      name: "Sam Chen",
      email: "sam.chen@university.edu",
      career_goal: "Cloud Infrastructure Architect",
      readiness: 78,
      status: "good_standing",
      lacking_skills: ["Kubernetes Security (45%)"],
      strongest_skill: "AWS & Terraform (90%)",
      gpa: "3.92",
      last_active: "30 mins ago",
      performance_history: [
        { month: 'Jan', readiness: 55, gpa: 3.80, skills: 50 },
        { month: 'Feb', readiness: 62, gpa: 3.84, skills: 58 },
        { month: 'Mar', readiness: 68, gpa: 3.88, skills: 65 },
        { month: 'Apr', readiness: 72, gpa: 3.90, skills: 70 },
        { month: 'May', readiness: 78, gpa: 3.92, skills: 76 },
        { month: 'Jun', readiness: 85, gpa: 3.95, skills: 82 }
      ]
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showInterventionModal, setShowInterventionModal] = useState(false);
  const [interventionNote, setInterventionNote] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    async function fetchRoster() {
      try {
        const liveRoster = await getTeacherStudents();
        if (liveRoster && liveRoster.length > 0) {
          setStudents(liveRoster);
          setSelectedStudent(liveRoster[0]);
        }
      } catch (err) {
        console.warn('Backend student roster fetch fallback:', err);
      }
    }
    fetchRoster();
  }, []);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.career_goal.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendIntervention = (e) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setShowInterventionModal(false);
      setInterventionNote('');
    }, 1500);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'good_standing': return <span className="badge badge-emerald">Good Standing</span>;
      case 'needs_attention': return <span className="badge badge-yellow">Needs Attention</span>;
      case 'at_risk': return <span className="badge badge-rose">Academic Risk</span>;
      default: return <span className="badge badge-blue">Enrolled</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header Banner */}
      <div className="clean-card" style={{ padding: '24px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '6px' }}>
              <UserCheck size={14} /> Faculty Advisory & Student Telemetry Portal
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
              Faculty Teacher Dashboard: Student Roster & Performance
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
              Real-time student performance graphs, skill deficiencies, and targeted academic interventions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', textAlign: 'right' }}>
            <div className="clean-card" style={{ padding: '10px 16px', background: 'var(--bg-input)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>TOTAL ENROLLED</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-brand-primary)' }}>{students.length} Students</span>
            </div>
            <div className="clean-card" style={{ padding: '10px 16px', background: 'var(--bg-input)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>CLASS AVG READINESS</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-purple)' }}>
                {Math.round(students.reduce((acc, s) => acc + s.readiness, 0) / students.length)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Roster Controls: Search & Status Filters */}
      <div className="clean-card" style={{ padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-clean)',
          borderRadius: 'var(--radius-pill)',
          padding: '6px 14px',
          width: '300px',
          maxWidth: '100%'
        }}>
          <Search size={15} color="var(--text-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name, goal, email..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '0.82rem',
              width: '100%'
            }}
          />
        </div>

        {/* Status Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Students' },
            { id: 'good_standing', label: 'Good Standing' },
            { id: 'needs_attention', label: 'Needs Attention' },
            { id: 'at_risk', label: 'At Risk' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className="tab-pill"
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                borderRadius: 'var(--radius-pill)',
                background: statusFilter === f.id ? 'var(--color-brand-primary)' : 'var(--bg-input)',
                color: statusFilter === f.id ? '#ffffff' : 'var(--text-muted)',
                fontWeight: statusFilter === f.id ? 700 : 500
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Student Roster List + Selected Student Performance Graph */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '20px' }}>
        
        {/* Left Column: Student Roster Cards */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} color="var(--color-purple)" /> Enrolled Student Roster ({filteredStudents.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredStudents.map(s => {
              const isSel = selectedStudent.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className="clean-card clean-card-interactive"
                  style={{
                    padding: '16px',
                    border: isSel ? '2px solid var(--color-brand-primary)' : '1px solid var(--border-clean)',
                    background: isSel ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-input)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>{s.name}</h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-brand-primary)', fontWeight: 600 }}>
                        {s.career_goal}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {getStatusBadge(s.status)}
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-purple)', marginTop: '4px' }}>
                        {s.readiness}% Readiness
                      </div>
                    </div>
                  </div>

                  {/* Deficient Skills Banner */}
                  <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(244, 63, 94, 0.2)', marginBottom: '8px' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-rose)', marginBottom: '2px' }}>
                      ⚠️ DEFICIENT SKILLS:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {s.lacking_skills.map((l, i) => (
                        <span key={i} className="badge badge-rose" style={{ fontSize: '0.66rem' }}>
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    <span>GPA: <strong style={{ color: 'var(--text-main)' }}>{s.gpa}</strong></span>
                    <span>Strongest: <strong style={{ color: 'var(--color-emerald)' }}>{s.strongest_skill}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Performance Graph for Selected Student */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <PerformanceGraph
            data={selectedStudent.performance_history}
            title={`${selectedStudent.name} — Career Trajectory Graph`}
            studentProfile={{ career_readiness: selectedStudent.readiness }}
          />

          {/* Detailed Student Telemetry Card */}
          <div className="clean-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                  Advisory Telemetry: <span style={{ color: 'var(--color-brand-primary)' }}>{selectedStudent.name}</span>
                </h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Email: {selectedStudent.email} • Last active {selectedStudent.last_active}
                </span>
              </div>
              {getStatusBadge(selectedStudent.status)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'var(--bg-input)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>STRONGEST AREA</span>
                <strong style={{ color: 'var(--color-emerald)' }}>{selectedStudent.strongest_skill}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>PRIMARY DEFICIENCY</span>
                <strong style={{ color: 'var(--color-rose)' }}>{selectedStudent.lacking_skills[0]}</strong>
              </div>
            </div>

            <button
              onClick={() => setShowInterventionModal(true)}
              className="btn-primary"
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem', gap: '6px' }}
            >
              <Send size={15} /> Send Targeted Intervention / Guidance Note
            </button>
          </div>

        </div>

      </div>

      {/* Complete Student Data Grid / Table */}
      <div className="clean-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={18} color="var(--color-brand-primary)" /> Complete Student Performance Matrix
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-clean)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <th style={{ padding: '10px 12px' }}>STUDENT NAME</th>
                <th style={{ padding: '10px 12px' }}>TARGET CAREER GOAL</th>
                <th style={{ padding: '10px 12px' }}>READINESS</th>
                <th style={{ padding: '10px 12px' }}>GPA</th>
                <th style={{ padding: '10px 12px' }}>STRONGEST SKILL</th>
                <th style={{ padding: '10px 12px' }}>DEFICIENT SKILLS</th>
                <th style={{ padding: '10px 12px' }}>STATUS</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  style={{
                    borderBottom: '1px solid var(--border-clean)',
                    cursor: 'pointer',
                    background: selectedStudent.id === s.id ? 'rgba(59, 130, 246, 0.06)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '12px', fontWeight: 700 }}>{s.name}</td>
                  <td style={{ padding: '12px', color: 'var(--color-brand-primary)' }}>{s.career_goal}</td>
                  <td style={{ padding: '12px', fontWeight: 800, color: 'var(--color-purple)' }}>{s.readiness}%</td>
                  <td style={{ padding: '12px' }}>{s.gpa}</td>
                  <td style={{ padding: '12px', color: 'var(--color-emerald)' }}>{s.strongest_skill}</td>
                  <td style={{ padding: '12px', color: 'var(--color-rose)' }}>{s.lacking_skills.join(', ')}</td>
                  <td style={{ padding: '12px' }}>{getStatusBadge(s.status)}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(s);
                        setShowInterventionModal(true);
                      }}
                      className="btn-ghost"
                      style={{ padding: '4px 8px', fontSize: '0.76rem', color: 'var(--color-brand-primary)' }}
                    >
                      Intervene <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Intervention Modal */}
      {showInterventionModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="clean-card" style={{ width: '480px', maxWidth: '90vw', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 800 }}>
                Faculty Guidance for {selectedStudent.name}
              </h3>
              <button onClick={() => setShowInterventionModal(false)} className="btn-ghost" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            {sentSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={42} color="var(--color-emerald)" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-emerald)' }}>
                  Intervention Sent Successfully!
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Guidance note & workshop referral delivered to {selectedStudent.name}'s profile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendIntervention} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Targeted Deficiency</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedStudent.lacking_skills.join(' & ')}
                    className="clean-input"
                    style={{ background: 'var(--bg-input)', opacity: 0.8 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Guidance Message / Recommended Action</label>
                  <textarea
                    rows={4}
                    required
                    value={interventionNote}
                    onChange={(e) => setInterventionNote(e.target.value)}
                    placeholder={`e.g. Hi ${selectedStudent.name}, please register for the upcoming Networking Lab on Aug 22nd to boost your prerequisite score.`}
                    className="clean-input"
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '10px' }}>
                  <Send size={15} /> Deliver Guidance Note
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
