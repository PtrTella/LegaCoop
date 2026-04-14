import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, ThumbsUp, ThumbsDown } from 'lucide-react';

export const FlashcardDeck = ({ 
  cards, 
  onFinish 
}: { 
  cards: { question: string; answer: string }[], 
  onFinish: () => void 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = (knewIt: boolean) => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(i => i + 1), 300);
    } else {
      onFinish();
    }
  };

  const card = cards[currentIndex] || { question: "Nessuna flashcard", answer: "Completato!" };

  return (
    <div className="glass-card p-10 mt-8 relative overflow-hidden rounded-[3rem] shadow-ambient">
      {/* Internal Atmospheric Glow using static classes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-end justify-between px-2 mb-8 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-warm shadow-glow shadow-accent-warm/40" />
            <p className="text-primary font-display font-black text-[10px] uppercase tracking-mega">Flashcards Lab</p>
          </div>
          <h2 className="font-display text-3xl font-black italic tracking-tight text-text-primary uppercase leading-none">Messa a Fuoco</h2>
        </div>
        <div className="rounded-2xl bg-white/70 backdrop-blur-[40px] border border-white/60 px-6 py-3 font-display text-xl font-black text-primary shadow-sm flex flex-col items-end">
          <span className="text-[10px] opacity-40 uppercase tracking-widest mb-1">Ritmo</span>
          {cards.length > 0 ? Math.round((currentIndex / cards.length) * 100) : 100}%
        </div>
      </div>

      <div className="perspective-1000 flex flex-1 items-center justify-center relative z-10" style={{ minHeight: '320px' }}>
        <motion.div 
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative aspect-video w-full max-w-2xl cursor-pointer preserve-3d"
        >
          {/* Card Front */}
          <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-4xl border border-white/60 bg-white/70 p-10 text-center shadow-ambient transition-all duration-500 hover:bg-white/80 hover:scale-[1.02] backdrop-blur-[40px]">
            <div className="mb-8 flex h-20 w-20 -rotate-3 transform items-center justify-center rounded-4xl bg-accent/10 border border-accent/20">
              <Info className="h-10 w-10 text-accent animate-pulse" />
            </div>
            <p className="max-w-xl font-display text-2xl md:text-3xl font-black tracking-tight text-text-primary leading-[1.1] italic uppercase">
              {card.question}
            </p>
            <div className="mt-8 flex items-center gap-2 text-primary font-display font-black text-[9px] uppercase tracking-mega opacity-40">
               <div className="w-2 h-px bg-primary" />
               Tocca per l'Analisi
               <div className="w-2 h-px bg-primary" />
            </div>
          </div>

          {/* Card Back */}
          <div className="rotate-y-180 backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-[3rem] bg-gradient-brand p-12 text-center shadow-glow-primary border border-white/20">
            <div className="absolute top-8 left-8 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-md border border-white/10">
               <span className="font-display text-[9px] font-black uppercase leading-none tracking-mega text-white">Risposta Chiave</span>
            </div>
            <p className="max-w-xl font-body text-lg font-medium tracking-tight text-white leading-relaxed italic">
              "{card.answer}"
            </p>
            <div className="w-11 h-11 bg-white/70 rounded-xl flex items-center justify-center border border-white/10 backdrop-blur-[40px] animate-bounce">
              <ThumbsUp className="h-8 w-8 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid h-16 w-full grid-cols-2 gap-6 mt-12 relative z-10">
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNext(false)}
          className="flex items-center justify-center gap-4 rounded-3xl bg-white/40 border border-white/60 font-display text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent/10 hover:border-accent/40 shadow-sm"
        >
          <ThumbsDown className="h-5 w-5" /> Ripassa Concetto
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNext(true)}
          className="flex items-center justify-center gap-4 rounded-3xl bg-linear-to-r from-accent-warm to-amber-500 font-display text-[10px] font-black uppercase tracking-widest text-white shadow-2xl shadow-accent-warm/30"
        >
          <ThumbsUp className="h-5 w-5" /> Appreso!
        </motion.button>
      </div>
    </div>
  );
};
