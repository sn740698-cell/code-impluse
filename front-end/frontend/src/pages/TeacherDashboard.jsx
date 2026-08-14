import React, { useState } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import PerformanceGraph from '../components/PerformanceGraph';

export default function TeacherDashboard() {
  const [students] = useState([
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
        { month: 'May', readiness: 58, gpa: 3.84, skills: 58 }
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
        { month: 'May', readiness: 64, gpa: 3.52, skills: 62 }
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
        { month: 'May', readiness: 42, gpa: 3.10, skills: 40 }
      ]
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header Banner */}
      <div className="clean-card" style={{ padding: '24px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="badge badge-purple" style={{ marginBottom: '6px' }}>
              <UserCheck size={14} /> Faculty Student Advisory & Telemetry
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
              Faculty Teacher Dashboard: Active Student Roster
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', margin: '4px 0 0 0' }}>
              Monitor student performance trends, career readiness graphs, and exact skill gaps needing intervention.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block' }}>TOTAL ACTIVE STUDENTS</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-purple)' }}>{students.length} Enrolled</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Student Roster Cards + Selected Student Performance Deep Dive */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Student Roster with Lacking Skill Flags */}
        <div className="clean-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 16px 0' }}>
            Active Student Roster & Deficiency Flags
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {students.map(s => {
              const isSel = selectedStudent.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className="clean-card clean-card-interactive"
                  style={{
                    padding: '16px',
                    border: isSel ? '2px solid var(--color-brand-primary)' : '1px solid var(--border-clean)',
                    background: isSel ? 'var(--bg-card-hover)' : 'var(--bg-input)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{s.name}</h4>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-brand-primary)', fontWeight: 600 }}>
                        Goal: {s.career_goal}
                      </div>
                    </div>

                    <span className={`badge ${s.status === 'good_standing' ? 'badge-emerald' : s.status === 'needs_attention' ? 'badge-yellow' : 'badge-rose'}`}>
                      {s.readiness}% Readiness
                    </span>
                  </div>

                  {/* Lacking Skills Section */}
                  <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(244, 63, 94, 0.2)', marginBottom: '8px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-rose)', marginBottom: '4px' }}>
                      ⚠️ LACKING / DEFICIENT SKILLS:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {s.lacking_skills.map((l, i) => (
                        <span key={i} className="badge badge-rose" style={{ fontSize: '0.68rem' }}>
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>GPA: <strong>{s.gpa}</strong></span>
                    <span>Last Active: {s.last_active}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Performance Graph for Selected Student */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <PerformanceGraph
            data={selectedStudent.performance_history}
            title={`${selectedStudent.name} — Readiness & Skill Trajectory`}
          />

          <div className="clean-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 10px 0', color: 'var(--color-brand-primary)' }}>
              Faculty Intervention Recommendation for {selectedStudent.name}
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '0 0 14px 0', lineHeight: 1.5 }}>
              {selectedStudent.name} is currently struggling with <strong>{selectedStudent.lacking_skills.join(' and ')}</strong>. Recommend assigning a targeted remedial lab or workshop.
            </p>

            <button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>
              Issue Guidance Note / Workshop Referral
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
