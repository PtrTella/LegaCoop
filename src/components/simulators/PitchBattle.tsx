import React, { useState, useRef, useEffect } from 'react';
import { ShieldAlert, Send, Briefcase, User, Loader2 } from 'lucide-react';
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
      const responseText = await runPitchBattle(newMessages);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
    } catch (error) {
      console.error('[PitchBattle] API error:', error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: 'Linea caduta. Torna quando sarai più convincente.' }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface rounded-4xl shadow-ambient overflow-hidden max-h-[85vh]">
      {/* Header */}
      <div className="h-20 bg-primary/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <Briefcase className="text-white w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-white text-lg tracking-tight leading-none">Gordon</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xs bg-tertiary text-primary px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter shadow-sm">Boss Level 99</span>
              <span className="text-2xs text-white/50 font-display font-medium uppercase tracking-widest leading-none">Capital Maven</span>
            </div>
          </div>
        </div>
        <div className="text-right flex items-center gap-3">
          <p className="text-xs-tight text-white/60 font-medium leading-tight max-w-24 hidden sm:block italic">Fagli capire cosa significa Resilienza</p>
          <div className="p-2.5 bg-secondary/20 rounded-full">
            <ShieldAlert className="text-tertiary w-5 h-5 animate-pulse" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface-container-low">
        <AnimatePresence>
          {messages.map((msg, i) => {
            const isModel = msg.role === 'model';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isModel ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] flex gap-4 ${isModel ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center shadow-sm ${isModel ? 'bg-primary text-white' : 'bg-secondary text-white'}`} aria-hidden="true">
                    {isModel ? <Briefcase size={18} /> : <User size={18} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm transition-all ${
                    isModel
                      ? 'bg-surface-container-lowest text-primary rounded-tl-none font-medium'
                      : 'bg-gradient-accent-reverse text-white rounded-tr-none'
                  }`}>
                    {renderTextWithKeywords(msg.parts[0].text)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] flex gap-4">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center animate-pulse" aria-hidden="true">
                <Briefcase size={18} />
              </div>
              <div className="p-4 bg-surface-container-lowest rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce" />
                <span className="text-3xs font-display font-black text-primary/30 uppercase tracking-widest pl-2">Giudicando...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-5 bg-surface-container-lowest border-t border-surface-container-low">
        <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Afferma la coerenza del modello cooperativo..."
            className="flex-1 px-6 py-4 bg-surface-container-low rounded-xl focus:outline-none focus:ring-4 focus:ring-secondary/10 text-primary font-body text-sm placeholder-primary/20 transition-all border-none"
            disabled={isLoading}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-4 bg-gradient-accent-reverse text-white rounded-xl shadow-lg hover:shadow-secondary/30 disabled:opacity-30 transition-all shrink-0"
            aria-label="Invia messaggio"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </form>
        <button
          onClick={onComplete}
          className="mt-6 w-full text-center text-2xs font-display font-black text-primary/30 hover:text-primary transition-colors uppercase tracking-widest-plus font-bold"
        >
          Ritirata Strategica / Concludi
        </button>
      </div>
    </div>
  );
};
