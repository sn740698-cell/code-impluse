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

function parseBoldText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} style={{ fontWeight: 700, color: 'var(--text-main)' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function FormattedAiResponse({ text }) {
  if (!text) return null;

  // 1. Clean HTML line breaks & broken tags
  let cleanText = text.replace(/<br\s*\/?>/gi, '\n').replace(/<\/?p>/gi, '\n');

  // 2. Format or strip markdown table syntax
  if (cleanText.includes('|')) {
    cleanText = cleanText
      .split('\n')
      .filter(line => !line.trim().startsWith('|---') && !line.trim().startsWith('| ---'))
      .map(line => {
        if (line.includes('|')) {
          const cells = line.split('|').map(c => c.trim()).filter(Boolean);
          if (cells.length >= 2) {
            return `• **${cells[0]}**: ${cells.slice(1).join(' — ')}`;
          }
          return cells.join(' ');
        }
        return line;
      })
      .join('\n');
  }

  // 3. Divide into clean section blocks
  const blocks = cleanText.split('\n\n').filter(b => b.trim());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {blocks.map((block, bIdx) => {
        const lines = block.split('\n').filter(l => l.trim());
        return (
          <div key={bIdx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              const isHeader = trimmed.startsWith('#') || (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length < 65);
              const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*') || /^\d+\./.test(trimmed);

              if (isHeader) {
                const headerText = trimmed.replace(/^[#*\s]+|[#*\s]+$/g, '');
                return (
                  <h4 key={lIdx} style={{ fontSize: '0.94rem', fontWeight: 800, color: 'var(--color-brand-primary)', margin: '4px 0 2px 0' }}>
                    {headerText}
                  </h4>
                );
              }

              if (isBullet) {
                const bulletContent = trimmed.replace(/^[•\-*\d.\s]+/, '');
                return (
                  <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', paddingLeft: '2px' }}>
                    <span style={{ color: 'var(--color-purple)', fontWeight: 800, lineHeight: 1.4, fontSize: '0.9rem' }}>•</span>
                    <div style={{ fontSize: '0.86rem', lineHeight: 1.5, flex: 1 }}>
                      {parseBoldText(bulletContent)}
                    </div>
                  </div>
                );
              }

              return (
                <p key={lIdx} style={{ fontSize: '0.86rem', lineHeight: 1.5, margin: 0 }}>
                  {parseBoldText(trimmed)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function AiChatbotDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello Alex! I am your AI Career Compass Advisor. How can I assist your career path today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const quickPrompts = [
    { text: "Analyze my skill gap for Cybersecurity Engineer", icon: Target },
    { text: "How should I prepare for my DBMS exam?", icon: Lightbulb },
    { text: "Recommend workshops matching my profile", icon: Briefcase },
    { text: "Explain Network Protocol Analysis basics", icon: Terminal }
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
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '490px',
        maxWidth: '94vw',
        height: '100vh',
        background: 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-12px 0 50px rgba(0,0,0,0.6)',
        borderLeft: '2px solid var(--color-purple)'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <Bot size={22} color="#8b5cf6" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', margin: 0, fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
                AI Career Compass Advisor
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.95)', margin: 0, display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                <Sparkles size={13} color="#fde047" /> Ollama Qwen 3:8B & OpenRouter Engine
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="btn-ghost" 
            style={{ 
              padding: '8px', 
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              color: '#ffffff'
            }}
            title="Close Assistant"
          >
            <X size={20} color="#ffffff" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'var(--bg-app)'
        }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '90%'
              }}
            >
              {msg.sender === 'bot' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--color-purple)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                }}>
                  <Bot size={16} color="#ffffff" />
                </div>
              )}

              <div style={{
                background: msg.sender === 'user' 
                  ? 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' 
                  : 'rgba(139, 92, 246, 0.12)',
                color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                padding: '14px 18px',
                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                border: msg.sender === 'bot' ? '1px solid rgba(139, 92, 246, 0.35)' : 'none',
                boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(59, 130, 246, 0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
                overflowX: 'hidden'
              }}>
                {msg.sender === 'bot' ? (
                  <FormattedAiResponse text={msg.text} />
                ) : (
                  <div style={{ fontWeight: 600 }}>{msg.text}</div>
                )}

                <div style={{
                  fontSize: '0.68rem',
                  opacity: 0.85,
                  marginTop: '8px',
                  textAlign: 'right',
                  fontWeight: 600,
                  color: msg.sender === 'user' ? 'rgba(255,255,255,0.85)' : 'var(--color-purple)'
                }}>
                  {msg.time} {msg.provider ? `• Engine: ${msg.provider}` : ''}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--color-brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                }}>
                  <User size={16} color="#ffffff" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', alignItems: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--color-purple)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RefreshCw size={16} color="#ffffff" className="animate-spin" />
              </div>
              <div style={{
                padding: '12px 16px',
                borderRadius: '16px',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                fontSize: '0.84rem',
                color: 'var(--text-main)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} color="var(--color-purple)" />
                <span>AI Assistant is analyzing career profile & generating response...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div style={{ 
          padding: '12px 18px', 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-clean)'
        }}>
          {quickPrompts.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSend(qp.text)}
                style={{
                  fontSize: '0.76rem',
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  background: 'rgba(139, 92, 246, 0.12)',
                  color: 'var(--text-main)',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={13} color="var(--color-purple)" />
                <span>{qp.text}</span>
              </button>
            );
          })}
        </div>

        {/* Input Form Bar */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-clean)',
          background: 'var(--bg-surface)'
        }}>
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask AI Advisor for career path, skill gap, or course advice..."
              style={{
                flex: 1,
                padding: '13px 18px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-input)',
                border: '1.5px solid rgba(139, 92, 246, 0.4)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                outline: 'none',
                fontWeight: 500
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="btn-primary"
              style={{
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                padding: 0,
                flexShrink: 0,
                background: inputValue.trim() ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' : 'var(--bg-input)',
                cursor: inputValue.trim() ? 'pointer' : 'default',
                opacity: inputValue.trim() ? 1 : 0.6
              }}
              title="Send Message"
            >
              <Send size={18} color="#ffffff" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
