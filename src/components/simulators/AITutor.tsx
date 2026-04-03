import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { askTutor } from '../../services/ai';

export const AITutor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'bot' | 'user', text: string }[]>([
    { role: 'bot', text: 'Ciao! Sono il tuo Tutor Cooperativo. Hai domande sulla LegaCoop o su come gestire la tua impresa?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    const response = await askTutor(userMessage);
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setLoading(false);
  };

  const renderFormattedText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-secondary">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-ambient z-50 flex items-center justify-center transform hover:rotate-6 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[360px] h-[500px] bg-surface rounded-[28px] shadow-ambient z-50 flex flex-col overflow-hidden border border-surface-container-low"
          >
            {/* Header: Accademia Digitale Look (Glassmorphism) */}
            <div className="p-4 bg-primary/90 backdrop-blur-[20px] text-white flex items-center justify-between z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary-container/30 rounded-xl">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-base leading-tight">Tutor Accademia</h3>
                  <div className="flex items-center gap-1.2">
                    <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse" />
                    <span className="text-[9px] font-display font-bold uppercase tracking-widest text-tertiary pl-1.5">Guidance</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Content: Tonal Layering (No lines) */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-low"
            >
              {messages.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`p-1.5 rounded-xl flex-shrink-0 ${msg.role === 'user' ? 'bg-secondary text-white' : 'bg-surface-container-lowest text-primary shadow-sm'}`}>
                    {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>
                  <div className={`p-3.5 rounded-2xl text-[13px] leading-relaxed max-w-[85%] whitespace-pre-wrap ${msg.role === 'user' ? 'bg-gradient-to-br from-primary to-primary-container text-white rounded-tr-none' : 'bg-surface-container-lowest text-primary shadow-sm rounded-tl-none'}`}>
                    {renderFormattedText(msg.text)}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex items-center gap-2.5 text-secondary p-1.5 animate-pulse">
                  <div className="p-1.5 bg-tertiary/20 rounded-lg">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span className="text-[9px] font-display font-black uppercase tracking-widest pl-1">Inspirazione...</span>
                </div>
              )}
            </div>

            {/* Input: The Soft-Touch Interaction */}
            <div className="p-4 bg-surface-container-lowest border-t border-surface-container-low">
              <div className="bg-surface-container-low p-1.5 rounded-2xl flex items-center gap-2 pr-3 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Scrivi la tua visione..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] p-2 text-primary font-body placeholder-primary/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="p-2.5 bg-gradient-to-br from-secondary to-primary-container text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-30"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
