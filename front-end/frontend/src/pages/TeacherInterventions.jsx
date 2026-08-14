import React, { useState } from 'react';
import { 
  UserCheck, 
  AlertTriangle, 
  CheckCircle, 
  MessageSquare, 
  Plus, 
  Search, 
  ShieldAlert, 
  Clock, 
  Mail, 
  Sparkles,
  Send,
  X
} from 'lucide-react';
import { MOCK_INTERVENTIONS } from '../services/api';

export default function TeacherInterventions() {
  const [interventions, setInterventions] = useState(MOCK_INTERVENTIONS);
  const [selectedStudent, setSelectedStudent] = useState(MOCK_INTERVENTIONS[0]);
  const [newNote, setNewNote] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteObj = {
      id: Date.now(),
      author: "Prof. Sarah Jenkins (Faculty)",
      date: new Date().toISOString().split('T')[0],
      text: newNote
    };

    setInterventions(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, notes: [...s.notes, noteObj] } : s));
    setSelectedStudent(prev => ({ ...prev, notes: [...prev.notes, noteObj] }));
    setNewNote('');
    setShowNoteModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Faculty Interventions & Mentorship</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
            Identify students needing academic guidance, issue feedback notes, and track progress
          </p>
        </div>

        <span className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
          <UserCheck size={16} /> Faculty Advisor Portal
        </span>
      </div>

      {/* 3 Overview Risk Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--accent-emerald)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>GOOD STANDING</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>32 Students</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>On track with career readiness</div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--accent-amber)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>NEEDS ATTENTION</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-amber)' }}>5 Students</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Minor milestone delay or quiz gap</div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--accent-rose)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>HIGH RISK FLAGS</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-rose)' }}>2 Students</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Inactive for &gt;7 days</div>
        </div>
      </div>

      {/* Main Split View: Student Roster List + Detailed Student Case Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        
        {/* Left Column: Student Roster List */}
        <div className="glass-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
            Flagged Student Roster
          </div>

          {interventions.map(s => {
            const isSelected = s.id === selectedStudent.id;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedStudent(s)}
                className="glass-card glass-card-interactive"
                style={{
                  padding: '14px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--accent-cyan)' : '1px solid var(--border-light)',
                  background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>{s.student_name}</span>
                  <span className={`badge ${s.risk_level === 'Low' ? 'badge-emerald' : s.risk_level === 'Medium' ? 'badge-amber' : 'badge-rose'}`} style={{ fontSize: '0.65rem' }}>
                    {s.risk_level} Risk
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.student_email}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  <span>Readiness: <strong>{s.readiness}%</strong></span>
                  <span>Active: {s.last_active}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Case File & Notes */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{selectedStudent.student_name}</h3>
                <span className={`badge ${selectedStudent.risk_level === 'Low' ? 'badge-emerald' : selectedStudent.risk_level === 'Medium' ? 'badge-amber' : 'badge-rose'}`}>
                  {selectedStudent.risk_level} Risk Level
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                {selectedStudent.student_email} • Last active {selectedStudent.last_active}
              </p>
            </div>

            <button 
              onClick={() => setShowNoteModal(true)} 
              className="btn-primary" 
              style={{ fontSize: '0.82rem', padding: '8px 14px' }}
            >
              <Plus size={16} /> Add Guidance Note
            </button>
          </div>

          {/* Recommended Actions */}
          <div>
            <h4 style={{ fontSize: '0.9rem', margin: '0 0 10px 0', color: 'var(--accent-cyan)' }}>
              AI Suggested Remedial Actions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedStudent.recommended_actions.map((act, idx) => (
                <div key={idx} style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <CheckCircle size={16} color="var(--accent-emerald)" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty Notes History */}
          <div>
            <h4 style={{ fontSize: '0.9rem', margin: '0 0 12px 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={16} color="var(--accent-purple)" /> Faculty Guidance Notes Log
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedStudent.notes.map(note => (
                <div key={note.id} style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-tertiary)',
                  borderLeft: '3px solid var(--accent-purple)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <strong style={{ color: 'var(--accent-cyan)' }}>{note.author}</strong>
                    <span>{note.date}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.4 }}>
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal for Adding Guidance Note */}
      {showNoteModal && (
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
          <div className="glass-card" style={{ width: '480px', maxWidth: '90vw', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>Add Guidance Note for {selectedStudent.student_name}</h3>
              <button onClick={() => setShowNoteModal(false)} className="btn-ghost" style={{ padding: '6px' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Note / Action Item</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter observation or feedback for the student..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#fff', fontSize: '0.85rem' }}
                />
              </div>

              <button type="submit" className="btn-primary">
                Save Guidance Note
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
