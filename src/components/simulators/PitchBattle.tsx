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
  };

  // Color logic for the meter
  const getMeterColor = () => {
    if (score < 35) return 'bg-red-500 shadow-red-500/40';
    if (score < 65) return 'bg-amber-500 shadow-amber-500/40';
    return 'bg-emerald-500 shadow-emerald-500/40';
  };

  return (
    <div className="h-full flex flex-col glass-card rounded-5xl shadow-ambient overflow-hidden max-h-[85vh] relative">
      {/* Internal Aurora Atmosphere - High Definition */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Milky Glass Header with Color Accent Line */}
      <div className="bg-white/70 backdrop-blur-[40px] px-8 py-8 md:px-12 md:py-10 shrink-0 z-20 relative overflow-hidden border-b border-white/60 shadow-sm">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-primary via-accent to-accent-warm opacity-40" />
        
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 bg-white/70 rounded-3xl flex items-center justify-center shadow-ambient border border-white/60 backdrop-blur-[40px] transition-all duration-700 ${isLoading ? 'animate-pulse scale-110 shadow-glow shadow-primary/20' : 'transform rotate-2 hover:rotate-0'}`}>
              <Briefcase className="text-primary w-8 h-8" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-glow shadow-accent/40" />
                <p className="text-primary font-display font-black text-[10px] uppercase tracking-mega">Sessione Pitch Live</p>
              </div>
              <h2 className="font-display font-black text-text-primary text-4xl tracking-tight leading-none italic uppercase">Gordon</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-text-muted/40 font-display font-black uppercase tracking-mega mb-2">Livello di Convinzione</p>
            <div className="flex items-center gap-3 justify-end">
              <span className={`text-4xl font-display font-black tracking-tighter transition-colors duration-700 ${score > 60 ? 'text-primary' : score > 30 ? 'text-text-primary' : 'text-text-muted/60'}`}>
                {score}%
              </span>
            </div>
          </div>
        </div>

        {/* The Meter Bar: Refined Glass Edition */}
        <div className="relative h-2 bg-white/40 rounded-full overflow-hidden shadow-inner border border-white/20">
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${score}%` }}
             className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out shadow-glow bg-primary ${getMeterColor()}`}
          />
        </div>
        
        <div className="mt-4 flex justify-between items-center text-[9px] font-display font-black uppercase tracking-mega">
          <span className="text-text-muted/40 italic">Gordon sta analizzando la tua sostenibilità...</span>
          <div className="flex items-center gap-2">
            <span className="text-accent bg-accent/10 px-2 py-0.5 rounded-full font-black">Obiettivo: 75%</span>
          </div>
        </div>
      </div>

      {/* Chat Area: Airy Glass Background */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 bg-white/70 backdrop-blur-[40px] scrollbar-hide relative z-10">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isModel = msg.role === 'model';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15, x: isModel ? -15 : 15 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] flex gap-5 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center shadow-ambient border transition-all duration-300 ${isModel ? 'bg-white/70 text-primary border-white/60' : 'bg-accent/10 text-accent border-accent/20 rotate-3 group-hover:rotate-0'}`} aria-hidden="true">
                    {isModel ? <Briefcase size={20} /> : <User size={20} />}
                  </div>
                  <div className={`p-6 rounded-4xl shadow-ambient transition-all border leading-relaxed ${
                    isModel
                      ? 'bg-white/80 text-text-primary border-white/60 rounded-tl-none font-body text-base backdrop-blur-[40px]'
                      : 'bg-white/70 text-text-primary border-accent/30 rounded-tr-none text-base font-body shadow-glow shadow-accent/5 backdrop-blur-[40px]'
                  }`}>
                    {renderTextWithKeywords(msg.parts[0].text.replace(/\[?\[?\s*SCORE:\s*\d+\s*\]?\]?/gi, ''))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] flex gap-5">
              <div className="w-11 h-11 bg-white/70 text-primary rounded-2xl flex items-center justify-center animate-pulse border border-white/60 backdrop-blur-[40px]" aria-hidden="true">
                <Briefcase size={20} />
              </div>
              <div className="p-7 bg-white/80 rounded-4xl rounded-tl-none shadow-ambient flex items-center gap-4 border border-white/60 backdrop-blur-[40px]">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                </div>
                <span className="text-[10px] font-display font-black text-primary/30 uppercase tracking-mega pl-2">Gordon ti sta smontando...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area: Pure White Glass */}
      <div className="p-8 md:p-12 bg-white/80 border-t border-white/60 relative z-20 backdrop-blur-3xl">
        <form onSubmit={handleSend} className="relative max-w-5xl mx-auto flex items-center gap-5">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Sostieni la tua visione con eleganza..."
            className="flex-1 px-10 py-7 bg-white/70 rounded-4xl focus:outline-none focus:ring-4 focus:ring-primary/5 text-text-primary font-body text-lg placeholder-text-muted/30 transition-all border border-white/60 shadow-inner backdrop-blur-[40px]"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-7 bg-gradient-brand text-white rounded-4xl shadow-2xl shadow-primary/30 hover:shadow-glow-primary transition-all shrink-0"
            aria-label="Invia pitch"
          >
            <Send className="w-8 h-8" />
          </motion.button>
        </form>
        <div className="mt-8 flex justify-center">
          <button
            onClick={onComplete}
            className="group flex items-center gap-3 text-[10px] font-display font-black text-text-muted/30 hover:text-primary transition-all uppercase tracking-mega"
          >
            <span className="border-b border-transparent group-hover:border-primary transition-all">Abbandona la sessione di Pitch</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
};
