import React, { useState } from 'react';
import { 
  PlusCircle, 
  Check, 
  Calendar, 
  Clock, 
  User, 
  Building, 
  Tag, 
  Link as LinkIcon, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { publishOpportunityApi } from '../services/api';

export default function TeacherPublishPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'workshop',
    category: 'Cybersecurity Department',
    starts_at: '2026-09-01T10:00',
    ends_at: '2026-09-01T13:00',
    speaker: 'Dr. Marcus Vance',
    organization: 'Department of Computer Science & Cybersecurity',
    skills: 'Networking, TCP/IP, Wireshark',
    interests: 'Cybersecurity, Network Architecture',
    career_areas: 'Cybersecurity Engineer',
    eligibility: 'Open to all 2nd & 3rd Year CS/IT Students',
    registration_deadline: '2026-08-28T23:59',
    registration_link: 'https://university.edu/register/networking-lab',
    max_participants: 50,
    location: 'Cyber Lab 302 / Online Hybrid',
    poster: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    status: 'published'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publishOpportunityApi(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.warn('Publish error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Part 2.10 — Teacher: Create & Publish Opportunity</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
          Publish opportunities with full metadata. The AI engine automatically indexes and targets relevant students.
        </p>
      </div>

      {submitted && (
        <div style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          color: 'var(--accent-emerald)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 700
        }}>
          <CheckCircle2 size={20} /> Opportunity published successfully! The AI recommendation engine is now matching students.
        </div>
      )}

      {/* 17-Field Form */}
      <form onSubmit={handleSubmit} className="soft-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Row 1: Title & Type */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>1. Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Advanced Network Traffic Analysis Lab"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>3. Opportunity Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            >
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
              <option value="seminar">Seminar</option>
              <option value="hackathon">Hackathon</option>
              <option value="competition">Competition</option>
              <option value="bootcamp">Bootcamp</option>
              <option value="guest_lecture">Guest Lecture</option>
              <option value="club_activity">Club Activity</option>
              <option value="career_session">Career Session</option>
            </select>
          </div>
        </div>

        {/* Row 2: Description */}
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>2. Description *</label>
          <textarea
            rows={3}
            required
            placeholder="Detailed agenda, learning objectives, and prerequisites..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
          />
        </div>

        {/* Row 3: Dates & Speaker */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>4 & 5. Start Time *</label>
            <input
              type="datetime-local"
              value={formData.starts_at}
              onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>6. End Time</label>
            <input
              type="datetime-local"
              value={formData.ends_at}
              onChange={(e) => setFormData({ ...formData, ends_at: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>7. Speaker Name</label>
            <input
              type="text"
              placeholder="e.g. Dr. Marcus Vance"
              value={formData.speaker}
              onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>8. Organization</label>
            <input
              type="text"
              placeholder="e.g. Dept of CS"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>
        </div>

        {/* Row 4: Skills, Interests, Career Areas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>9. Skills Covered (comma separated)</label>
            <input
              type="text"
              placeholder="Networking, Wireshark, TCP/IP"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>10. Interest Areas</label>
            <input
              type="text"
              placeholder="Cybersecurity, AI"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>11. Career Areas</label>
            <input
              type="text"
              placeholder="Cybersecurity Engineer"
              value={formData.career_areas}
              onChange={(e) => setFormData({ ...formData, career_areas: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>
        </div>

        {/* Row 5: Eligibility, Deadline, Link, Location, Max participants */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>12. Eligibility</label>
            <input
              type="text"
              placeholder="Open to CS Students"
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>13. Registration Deadline</label>
            <input
              type="datetime-local"
              value={formData.registration_deadline}
              onChange={(e) => setFormData({ ...formData, registration_deadline: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>14. Registration Link</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.registration_link}
              onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>15. Max Participants</label>
            <input
              type="number"
              value={formData.max_participants}
              onChange={(e) => setFormData({ ...formData, max_participants: Number(e.target.value) })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>
        </div>

        {/* Row 6: Location & Poster & Status */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>16. Location / Online Info</label>
            <input
              type="text"
              placeholder="Cyber Lab 302"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>17. Poster / Image URL</label>
            <input
              type="text"
              placeholder="https://..."
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Publish Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff' }}
            >
              <option value="published">Publish Immediately</option>
              <option value="draft">Save as Draft</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '12px' }}>
          Publish Opportunity & Run AI Student Targeting
        </button>
      </form>

    </div>
  );
}
