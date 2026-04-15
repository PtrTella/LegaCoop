import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Bot, User, Sparkles, Minus, Loader2 } from 'lucide-react';
import { askTutor } from '../../services/ai';
import { useAppContext } from '../../context/AppContext';

export const AITutor = ({ mode = 'fab' }: { mode?: 'fab' | 'inline' }) => {
  const { state, addChatMessage } = useAppContext();
  const { messages } = state;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset' };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    addChatMessage({ role: 'user', text: userMessage });
    setLoading(true);
    try {
      const response = await askTutor(userMessage);
      addChatMessage({ role: 'bot', text: response });
    } catch {
      addChatMessage({ role: 'bot', text: 'Connessione instabile. Riprova tra un attimo.' });
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text: string) =>
    text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-primary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

  const chatContent = (
    <div className={`flex flex-col overflow-hidden bg-white h-full ${mode === 'fab' ? 'sm:h-150 rounded-none sm:rounded-5xl sm:border border-primary/10 shadow-2xl transition-all' : 'flex-1 rounded-none sm:rounded-3xl sm:border border-primary/5'}`}>
      {/* Header */}
      <div className="hidden md:flex p-6 bg-gradient-brand text-white items-center justify-between shrink-0 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 md:w-11 md:h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-md">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white text-glow-brand" />
          </div>
          <div>
            <h3 className="font-display font-black text-base md:text-lg tracking-tight italic">AI Hub</h3>
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/60">Live Intelligence</p>
          </div>
        </div>
        {mode === 'fab' && (
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all relative z-10 active:scale-95 flex items-center gap-2"
          >
            <span className="hidden sm:inline text-[10px] font-display font-black uppercase tracking-widest">Chiudi</span>
            <Minus className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 md:space-y-10 bg-white/70 backdrop-blur-[40px] scrollbar-hide relative z-10">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-4 py-3 md:px-5 md:py-3.5 rounded-2xl md:rounded-3xl text-sm font-body leading-relaxed shadow-sm border ${
              m.role === 'user' 
                ? 'bg-gradient-brand text-white border-white/20 rounded-tr-none' 
                : 'bg-white/70 border-white/60 text-text-primary rounded-tl-none backdrop-blur-[40px]'
            }`}>
              {renderFormattedText(m.text)}
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white border border-border-subtle rounded-xl flex items-center justify-center shrink-0">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            </div>
            <div className="px-4 py-3 bg-white rounded-2xl rounded-tl-none border border-border-subtle flex items-center gap-1.5">
              <span className="text-2xs font-display font-black text-primary/30 uppercase tracking-widest-plus italic">Ispirazione...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 md:p-6 bg-gradient-brand border-t border-white/10 pb-32 md:pb-6 relative overflow-hidden">
        {/* Decorative backdrop for the footer */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center gap-2 px-4 py-1.5 md:py-2 border border-white/20 focus-within:border-white/40 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Scrivi la tua domanda..."
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-white placeholder-white/50 font-body"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-white text-primary rounded-xl shadow-xl disabled:opacity-30 flex items-center justify-center transition-all shrink-0 active:scale-90"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
        <p className="text-center text-[8px] md:text-2xs text-white/40 font-display font-bold uppercase tracking-widest-plus mt-3">
          Powered by AI Accademia
        </p>
      </div>
    </div>
  );

  if (mode === 'inline') {
    return <div className="h-full flex flex-col w-full min-w-0">{chatContent}</div>;
  }

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <motion.button
          layoutId="tutor-container"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-28 md:bottom-8 right-4 md:right-8 w-16 h-16 bg-primary text-white rounded-2xl shadow-2xl z-50 flex items-center justify-center border border-white/20 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="w-7 h-7 relative z-10 text-glow-brand" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="tutor-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-8 sm:right-8 sm:w-full sm:max-w-95 z-250 flex flex-col"
          >
            {chatContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
