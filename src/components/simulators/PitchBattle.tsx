import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert, Send, Briefcase, User, Loader2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { runPitchBattle } from '../../services/ai';
import { renderTextWithKeywords } from '../../utils/textUtils';

// --- Types ---

interface MessagePart {
  text: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: MessagePart[];
}

// --- Component ---

interface PitchBattleProps {
  onComplete: () => void;
}

export const PitchBattle = ({ onComplete }: PitchBattleProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [{ text: "Spiegami bene questa utopia. Vuoi fondare una cooperativa? Nel mio mondo, chi mette il capitale decide tutto. Perché dovrei investire in un'azienda dove conta più la democrazia del Profitto? Provaci, fammi un pitch." }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(10); // Start low
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input.trim() }] };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await runPitchBattle(newMessages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response.text }] }]);
      if (response.score > 0) setScore(response.score);
    } catch (error) {
      console.error('[PitchBattle] API error:', error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Linea caduta. Torna quando sarai più convincente.' }] }]);
    } finally {
      setIsLoading(false);
    }
  };  return (
    <div className="h-full flex flex-col relative text-text-primary overflow-hidden bg-white">
      {/* Sticky Gordon HUD */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-[40px] px-6 py-4 md:px-12 md:py-6 border-b border-white/60 shadow-sm shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <div className={`w-12 h-12 md:w-16 md:h-16 bg-white/70 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-ambient border border-white/60 transition-all duration-700 ${isLoading ? 'animate-pulse scale-105 border-primary/30' : ''}`}>
              <Briefcase className={`w-6 h-6 md:w-8 md:h-8 ${isLoading ? 'text-accent' : 'text-primary'}`} />
            </div>
            <div>
              <h2 className="font-display font-black text-2xl md:text-3xl tracking-tighter leading-none italic uppercase bg-linear-to-r from-primary via-accent to-accent-warm bg-clip-text text-transparent pr-2">
                Gordon
              </h2>
            </div>
          </div>
          
          {/* Subtle Activity Indicators */}
          <div className="flex items-center gap-2 translate-y-1">
             <div className="w-1.5 h-1.5 rounded-full bg-primary/10" />
             <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
             <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          </div>
        </div>

        {/* Immersive Edge-to-Edge Conviction Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-surface-soft/20 overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${score}%` }} 
             className="h-full bg-linear-to-r from-primary via-accent to-accent-warm shadow-glow shadow-primary/30 transition-all duration-1000 ease-out" 
           />
        </div>
      </div>

      {/* Chat Messages: Edge-to-Edge with asymmetrical bubbles */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-12 py-10 space-y-8 scrollbar-hide relative z-10">
        <div className="max-w-5xl mx-auto space-y-10">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isModel = msg.role === 'model';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, x: isModel ? -10 : 10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[95%] sm:max-w-[85%] flex gap-3 md:gap-5 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center shadow-ambient border transition-all ${isModel ? 'bg-white/70 text-primary border-white/60' : 'bg-accent/10 text-accent border-accent/20'}`} aria-hidden="true">
                      {isModel ? <Briefcase size={18} /> : <User size={18} />}
                    </div>
                    <div className={`p-5 md:p-7 rounded-4xl shadow-ambient transition-all border leading-relaxed text-sm md:text-base font-body ${
                      isModel
                        ? 'bg-white text-text-primary border-white/60 rounded-tl-none backdrop-blur-[40px] shadow-glow shadow-primary/5'
                        : 'bg-primary/5 text-text-primary border-primary/20 rounded-tr-none shadow-glow shadow-accent/5'
                    }`}>
                      {renderTextWithKeywords(msg.parts[0].text.replace(/\[?\[?\s*SCORE:\s*\d+\s*\]?\]?/gi, ''))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="max-w-[85%] flex gap-5">
                <div className="w-10 h-10 bg-white/70 text-primary rounded-xl flex items-center justify-center animate-pulse border border-white/60" />
                <div className="p-6 bg-white rounded-4xl rounded-tl-none shadow-ambient flex items-center gap-4 border border-white/60 font-display font-black text-[10px] text-primary/30 uppercase tracking-mega">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                  </div>
                  Gordon sta elaborando...
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sticky Footer Input */}
      <div className="sticky bottom-0 z-50 bg-white/80 backdrop-blur-3xl border-t border-white/60 p-6 pb-28 md:p-10 shrink-0">
        <form onSubmit={handleSend} className="max-w-7xl mx-auto flex items-center gap-4 md:gap-6">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Convincilo della tua visione..."
            className="flex-1 px-6 md:px-10 py-5 md:py-7 bg-surface-soft/50 rounded-3xl md:rounded-4xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-text-primary font-body text-base md:text-lg placeholder-text-muted/30 transition-all border border-border-subtle"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-5 md:p-7 bg-gradient-brand text-white rounded-3xl md:rounded-4xl shadow-2xl shadow-primary/30 transition-all shrink-0"
          >
            <Send className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        </form>
        <div className="max-w-5xl mx-auto mt-6 flex justify-center">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 text-[9px] font-display font-black text-text-muted/30 hover:text-primary transition-all uppercase tracking-mega"
          >
            Abbandona Pitch <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
