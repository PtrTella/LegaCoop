import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Bot, User, Sparkles, Minus, Loader2 } from 'lucide-react';
import { askTutor } from '../../services/ai';

export const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: 'Ciao! Sono il tuo Tutor Accademia. Hai qualche dubbio sulla lezione o vuoi esplorare un concetto cooperativo?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);
    try {
      const response = await askTutor(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Scusa, la mia connessione alla rete cooperativa è instabile. Riprova tra un attimo.' }]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text: string) =>
    text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-secondary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <motion.button
          layoutId="tutor-container"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-primary-deep text-white rounded-2xl shadow-2xl z-50 flex items-center justify-center border border-white/10 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity" />
          <MessageSquare className="w-7 h-7 relative z-10" />
          <div className="absolute top-3 right-3 w-3 h-3 bg-tertiary rounded-full border-2 border-primary animate-pulse" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="tutor-container"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-full max-w-sm flex flex-col overflow-hidden rounded-4xl z-50 shadow-2xl border border-border-subtle bg-white"
            style={{ height: '37.5rem' }}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-brand text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10" style={{ backdropFilter: 'blur(24px)' }}>
                  <Bot className="w-6 h-6 text-tertiary" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg leading-none tracking-tight">Tutor Accademia</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 bg-tertiary rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-1 h-1 bg-tertiary rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-1 h-1 bg-tertiary rounded-full animate-bounce" />
                    </div>
                    <span className="text-[10px] font-display font-bold uppercase tracking-widest-plus text-tertiary/80 pl-1">Live Intelligence</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 hover:bg-white/10 rounded-xl transition-all group"
              >
                <Minus className="w-5 h-5 text-white/40 group-hover:text-white" />
              </button>
            </div>

            {/* Chat */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-container-low/90 scroll-smooth" style={{ backgroundColor: 'rgba(243, 243, 248, 0.9)' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm shrink-0 mt-1 ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-white border border-border-subtle text-primary'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-secondary" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm ${msg.role === 'user' ? 'bg-gradient-accent-reverse text-white rounded-tr-none' : 'bg-white text-primary rounded-tl-none border border-border-subtle'}`}>
                    {renderFormattedText(msg.text)}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white border border-border-subtle rounded-xl flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-secondary animate-spin" />
                  </div>
                  <div className="px-4 py-3 bg-white rounded-2xl rounded-tl-none border border-border-subtle flex items-center gap-1.5">
                    <span className="text-[10px] font-display font-black text-primary/30 uppercase tracking-widest-plus italic">Ispirazione...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white border-t border-border-subtle">
              <div className="bg-surface-container-low rounded-2xl flex items-center gap-2 px-4 py-2 border border-border-subtle focus-within:border-secondary/40 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Scrivi la tua domanda..."
                  className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-primary font-body placeholder-primary/30"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="p-2.5 bg-gradient-accent-reverse text-white rounded-xl shadow-md disabled:opacity-30 flex items-center justify-center transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-primary/30 font-display font-bold uppercase tracking-widest-plus mt-3">
                Powered by AI Accademia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
