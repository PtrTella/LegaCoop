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
    <div className="h-full flex flex-col bg-surface rounded-5xl shadow-ambient overflow-hidden max-h-[85vh] border border-border-subtle">
      {/* Dynamic Header with Convincement Meter */}
      <div className="bg-primary px-6 py-5 shrink-0 z-20 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 bg-gradient-brand rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 transition-all duration-500 ${isLoading ? 'animate-pulse scale-110' : 'transform rotate-3'}`}>
              <Briefcase className="text-white w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display font-black text-white text-xl tracking-tight leading-none italic">Gordon</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] bg-tertiary text-primary px-2 py-0.5 rounded-full font-black uppercase tracking-widest-plus shadow-sm animate-pulse">Boss Fight</span>
                <span className="text-[10px] text-white/40 font-display font-black uppercase tracking-widest leading-none">Capital Maven</span>
              </div>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-white/50 font-display font-black uppercase tracking-mega mb-1">Convincimento</p>
            <div className="flex items-center gap-1.5 justify-end">
              <span className={`text-xl font-display font-black tracking-tighter transition-colors duration-500 ${score > 60 ? 'text-emerald-400' : score > 30 ? 'text-amber-400' : 'text-red-400'}`}>
                {score}%
              </span>
            </div>
          </div>
        </div>

        {/* The Meter Bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${score}%` }}
             className={`absolute top-0 left-0 h-full transition-all duration-700 ease-out shadow-[0_0_12px] opacity-90 ${getMeterColor()}`}
          />
        </div>
        
        {/* Usability tooltips */}
        <div className="mt-2 flex justify-between items-center text-[9px] font-display font-black uppercase tracking-widest-plus">
          <span className="text-white/30 italic">Gordon ti sta mettendo alla prova...</span>
          <span className="text-white/30">Difendi il modello cooperativo</span>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-surface-container-low/30 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => {
            const isModel = msg.role === 'model';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12, x: isModel ? -12 : 12 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] flex gap-3 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${isModel ? 'bg-primary text-white rotate-[-4deg]' : 'bg-secondary text-white rotate-[4deg]'}`} aria-hidden="true">
                    {isModel ? <Briefcase size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm transition-all border ${
                    isModel
                      ? 'bg-surface-container-lowest text-primary border-border-subtle rounded-tl-none font-medium text-base'
                      : 'bg-gradient-accent-reverse text-white border-transparent rounded-tr-none text-sm'
                  }`}>
                    {renderTextWithKeywords(msg.parts[0].text)}
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
            <div className="max-w-[80%] flex gap-3">
              <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center animate-pulse" aria-hidden="true">
                <Briefcase size={16} />
              </div>
              <div className="p-5 bg-surface-container-lowest rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 border border-border-subtle">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-secondary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-secondary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-secondary/40 rounded-full animate-bounce" />
                </div>
                <span className="text-[10px] font-display font-black text-primary/30 uppercase tracking-widest pl-3">Smembrandoti...</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-surface-container-lowest border-t border-border-subtle">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Rispondi a tono. Sostieni la cooperativa..."
            className="flex-1 px-6 py-5 bg-surface-container-low/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-secondary/10 text-primary font-body text-base placeholder-primary/20 transition-all border border-border-subtle"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-5 bg-gradient-accent-reverse text-white rounded-2xl shadow-xl hover:shadow-secondary/20 disabled:opacity-30 transition-all shrink-0 hover:y-[-2px]"
            aria-label="Invia messaggio"
          >
            <Send className="w-6 h-6" />
          </motion.button>
        </form>
        <div className="mt-5 flex justify-center">
          <button
            onClick={onComplete}
            className="group flex items-center gap-2 text-[10px] font-display font-black text-primary/30 hover:text-primary transition-all uppercase tracking-widest-plus"
          >
            <span>Abbandona il Round</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
