import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RefreshCw, 
  Terminal, 
  Lightbulb, 
  Briefcase, 
  Target 
} from 'lucide-react';
import { sendChatMessage } from '../services/api';

export default function AiChatbotDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello Alex! I am your AI Career Compass Advisor powered by Qwen 3:8B. How can I assist your career path today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    { text: "Analyze my skill gap for AI Engineer role", icon: Target },
    { text: "How can I improve my GPA in CS-312?", icon: Lightbulb },
    { text: "Recommend internships matching my profile", icon: Briefcase },
    { text: "Explain RAG & Vector Database architecture", icon: Terminal }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await sendChatMessage(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: res.response,
        provider: res.provider,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: "Sorry, I encountered an issue connecting to the AI endpoint. Please try again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      zIndex: 999,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'all 0.3s ease'
    }}>
      <div className="glass-card" style={{
        width: '460px',
        maxWidth: '90vw',
        height: '100vh',
        borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
        borderLeft: '1px solid var(--border-active)'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--neon-cyan-shadow)'
            }}>
              <Bot size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', margin: 0, fontWeight: 700 }}>AI Career Compass</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} /> Ollama Qwen 3:8B Integration
              </p>
            </div>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {msg.sender === 'bot' && (
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--accent-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={14} color="#ffffff" />
                </div>
              )}

              <div style={{
                background: msg.sender === 'user' ? 'var(--gradient-primary)' : 'var(--bg-tertiary)',
                color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                border: msg.sender === 'bot' ? '1px solid var(--border-light)' : 'none',
                boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(6,182,212,0.3)' : 'none'
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                <div style={{
                  fontSize: '0.65rem',
                  opacity: 0.7,
                  marginTop: '6px',
                  textAlign: 'right'
                }}>
                  {msg.time} {msg.provider ? `• ${msg.provider}` : ''}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <User size={14} color="#ffffff" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--accent-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RefreshCw size={14} color="#ffffff" className="animate-pulse-glow" />
              </div>
              <div className="glass-card" style={{ padding: '10px 14px', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                Qwen AI is formulating career response...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        <div style={{ padding: '0 16px 12px 16px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {quickPrompts.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(qp.text)}
                className="btn-ghost"
                style={{
                  fontSize: '0.72rem',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-light)',
                  background: 'rgba(255,255,255,0.03)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Icon size={12} color="var(--accent-cyan)" />
                <span>{qp.text}</span>
              </button>
            );
          })}
        </div>

        {/* Input Bar */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-light)',
          background: 'var(--bg-secondary)'
        }}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Qwen AI for career guidance or code advice..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                padding: 0,
                flexShrink: 0
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
