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
    <div className="mx-auto flex h-full max-w-3xl flex-col space-y-6 rounded-4xl bg-surface p-6 shadow-ambient">
      <div className="flex items-end justify-between px-2">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-black italic tracking-tight text-primary">Flashcards</h2>
        </div>
        <div className="rounded-xl bg-surface-container-low px-4 py-2 font-display text-base font-black text-primary shadow-sm">
          {cards.length > 0 ? Math.round((currentIndex / cards.length) * 100) : 100}%
          <span className="ml-2 font-display text-2xs font-black uppercase tracking-widest text-primary/30">Progresso</span>
        </div>
      </div>

      <div className="perspective-1000 flex flex-1 items-center justify-center" style={{ minHeight: '240px' }}>
        <motion.div 
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative aspect-video w-full cursor-pointer preserve-3d"
        >
          {/* Card Front */}
          <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-4xl border border-surface-container-low/50 bg-surface-container-lowest p-8 text-center shadow-ambient transition-transform duration-500 hover:scale-[1.01]">
            <div className="mb-6 flex h-14 w-14 -rotate-6 transform items-center justify-center rounded-2xl bg-tertiary/20">
              <Info className="h-7 w-7 text-secondary" />
            </div>
            <p className="max-w-xl font-display text-xl font-black tracking-tight text-primary leading-tight">
              {card.question}
            </p>
            <p className="animate-pulse mt-6 font-display text-2xs font-black uppercase tracking-mega text-secondary">Tocca per scoprire</p>
          </div>

          {/* Card Back */}
          <div className="rotate-y-180 backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-4xl bg-gradient-brand p-8 text-center shadow-ambient">
            <div className="absolute top-6 left-6 rounded-lg bg-white/10 p-2 backdrop-blur-md">
               <span className="font-display text-2xs font-bold uppercase leading-none tracking-widest text-white/40">Risposta Master</span>
            </div>
            <p className="max-w-xl font-body text-base font-medium tracking-tight text-white leading-relaxed">
              {card.answer}
            </p>
            <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <ThumbsUp className="h-7 w-7 text-tertiary" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid h-14 w-full grid-cols-2 gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNext(false)}
          className="flex items-center justify-center gap-3 rounded-xl bg-surface-container-low font-display text-sm-alt font-black uppercase tracking-widest text-primary/40 transition-all hover:text-primary"
        >
          <ThumbsDown className="h-5 w-5" /> Ripassa
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNext(true)}
          className="flex items-center justify-center gap-3 rounded-xl bg-gradient-accent font-display text-sm-alt font-black uppercase tracking-widest text-white shadow-md shadow-secondary/20 transition-all"
        >
          <ThumbsUp className="h-5 w-5" /> Appreso!
        </motion.button>
      </div>
    </div>
  );
};
