import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Bot, User, Sparkles, Minus, Loader2 } from 'lucide-react';
import { askTutor } from '../../services/ai';

export const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: 'Ciao! Sono la tua intelligenza cooperativa. Come posso aiutarti oggi?' }
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
      setMessages(prev => [...prev, { role: 'bot', text: 'Connessione instabile. Riprova tra un attimo.' }]);
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

  return (
    <>
      {/* FAB */}
      {!isOpen && (
        <motion.button
          layoutId="tutor-container"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-2xl shadow-2xl z-50 flex items-center justify-center border border-white/20 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="w-7 h-7 relative z-10 text-glow-brand" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="tutor-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-full max-w-95 flex flex-col overflow-hidden rounded-5xl z-50 shadow-2xl border border-primary/10 bg-white h-150"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-brand text-white flex items-center justify-between shrink-0 relative overflow-hidden">
              {/* Internal Aurora Blob */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                  <Sparkles className="w-6 h-6 text-white text-glow-brand" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg tracking-tight italic">AI Hub</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Live Intelligence</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-all relative z-10">
                <Minus className="w-5 h-5 text-white/40" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 bg-white/70 backdrop-blur-[40px] scrollbar-hide relative z-10">
             {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-sm font-body leading-relaxed shadow-sm border ${
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
            <div className="p-4 bg-white border-t border-border-subtle">
              <div className="bg-surface-soft rounded-2xl flex items-center gap-2 px-4 py-2 border border-border-subtle focus-within:border-primary/40 transition-all">
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
                  className="p-2.5 bg-gradient-brand text-white rounded-xl shadow-md disabled:opacity-30 flex items-center justify-center transition-all shrink-0"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-center text-2xs text-primary/30 font-display font-bold uppercase tracking-widest-plus mt-3">
                Powered by AI Accademia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
