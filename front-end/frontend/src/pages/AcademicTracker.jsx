import React from 'react';
import { 
  BookOpen, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Calendar, 
  FileText, 
  AlertCircle 
} from 'lucide-react';
import { MOCK_ACADEMICS } from '../services/api';

export default function AcademicTracker() {
  const upcomingTasks = [
    { id: 1, course: "CS-301 AI & Neural Networks", task: "Midterm Project: Multi-Layer Perceptron Implementation", due: "In 3 Days", status: "In Progress" },
    { id: 2, course: "CS-304 Database Systems", task: "PostgreSQL B-Tree Index Optimization Lab", due: "In 5 Days", status: "Pending" },
    { id: 3, course: "CS-312 Operating Systems", task: "Process Synchronization Semaphore Quiz", due: "Next Week", status: "Pending" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Academic Performance & Progress</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
            Real-time GPA tracking, semester breakdown, and coursework milestones
          </p>
        </div>
        <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
          <Award size={16} /> Cumulative GPA: 9.60 / 10.0
        </span>
      </div>

      {/* 3 Metric Summary Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px' }}>
        
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>CURRENT SEMESTER SGPA (OUT OF 10)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>9.70 / 10.0</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>↑ +0.20 higher than Sem 3</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>COMPLETED CREDITS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-purple)' }}>84 / 120</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>70% Degree Completed</div>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>OVERALL ATTENDANCE</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>96.4%</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)' }}>Excellent Standing</div>
        </div>

      </div>

      {/* Semester GPA Trend Visual Graph */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', margin: '0 0 16px 0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color="var(--accent-cyan)" /> Semester GPA Trajectory
        </h3>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '180px', paddingTop: '20px', borderBottom: '1px solid var(--border-light)' }}>
          {MOCK_ACADEMICS.sgpa_trend.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>{item.sgpa}</div>
              <div style={{
                width: '36px',
                height: `${(item.sgpa - 3.0) * 160}px`,
                background: idx === MOCK_ACADEMICS.sgpa_trend.length - 1 ? 'var(--gradient-primary)' : 'var(--gradient-emerald-teal)',
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.5s ease',
                boxShadow: 'var(--neon-cyan-shadow)'
              }} />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.semester}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Courses Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', margin: '0 0 16px 0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} color="var(--accent-purple)" /> Enrolled Coursework & Grades
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 14px' }}>Course Code</th>
                <th style={{ padding: '12px 14px' }}>Course Title</th>
                <th style={{ padding: '12px 14px' }}>Credits</th>
                <th style={{ padding: '12px 14px' }}>Internal Score</th>
                <th style={{ padding: '12px 14px' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ACADEMICS.courses.map((course, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--accent-cyan)' }}>{course.code}</td>
                  <td style={{ padding: '14px', fontWeight: 600, color: 'var(--text-main)' }}>{course.title}</td>
                  <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>{course.credits} Credits</td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '100px', height: '6px', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)' }}>
                        <div style={{ width: `${course.score}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-full)' }} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{course.score}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.8rem' }}>
                      {course.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Coursework Deadlines */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', margin: '0 0 16px 0', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="var(--accent-amber)" /> Upcoming Academic Deadlines
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {upcomingTasks.map(task => (
            <div key={task.id} style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-tertiary)',
              borderLeft: '4px solid var(--accent-amber)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>{task.course}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{task.task}</div>
              </div>
              <span className="badge badge-amber">
                <Calendar size={12} /> {task.due}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
