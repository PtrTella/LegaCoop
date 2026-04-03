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
    <div className="flex flex-col h-full bg-surface p-6 space-y-6 max-w-3xl mx-auto rounded-4xl shadow-ambient">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-2">
          <p className="text-secondary font-display font-black text-[9px] uppercase tracking-[0.4em]">Studio Attivo</p>
          <h2 className="text-2xl font-display font-black text-primary tracking-tight leading-tight italic">AI Flashcards</h2>
        </div>
        <div className="bg-surface-container-low px-4 py-2 rounded-xl font-display font-black text-primary text-base shadow-sm">
          {cards.length > 0 ? Math.round((currentIndex / cards.length) * 100) : 100}%
          <span className="text-[9px] text-primary/30 ml-2 uppercase tracking-widest font-black">Progresso</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center perspective-1000 min-h-[300px]">
        <motion.div 
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative w-full aspect-[16/9] cursor-pointer preserve-3d"
        >
          {/* Card Front */}
          <div className="absolute inset-0 bg-surface-container-lowest rounded-4xl shadow-ambient p-8 flex flex-col items-center justify-center text-center backface-hidden hover:scale-[1.01] transition-transform duration-500 border border-surface-container-low/50">
            <div className="w-14 h-14 bg-tertiary/20 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
              <Info className="text-secondary w-7 h-7" />
            </div>
            <p className="text-xl font-display font-black text-primary leading-tight max-w-xl tracking-tight">
              {card.question}
            </p>
            <p className="mt-6 text-secondary font-display font-black text-[9px] uppercase tracking-[0.4em] animate-pulse">Tocca per scoprire</p>
          </div>

          {/* Card Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container rounded-4xl shadow-ambient p-8 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180">
            <div className="absolute top-6 left-6 p-2 bg-white/10 rounded-lg backdrop-blur-md">
               <span className="text-[9px] text-white/40 font-display font-bold uppercase tracking-widest leading-none">Risposta Master</span>
            </div>
            <p className="text-white text-base font-body font-medium leading-relaxed max-w-xl tracking-tight">
              {card.answer}
            </p>
            <div className="mt-8 w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
              <ThumbsUp className="text-tertiary w-7 h-7" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-14 w-full">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNext(false)}
          className="bg-surface-container-low rounded-xl flex items-center justify-center gap-3 font-display font-black text-primary/40 hover:text-primary transition-all text-[11px] uppercase tracking-widest"
        >
          <ThumbsDown className="w-5 h-5" /> Ripassa
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNext(true)}
          className="bg-gradient-to-br from-secondary to-tertiary rounded-xl flex items-center justify-center gap-3 font-display font-black text-white shadow-md shadow-secondary/20 transition-all text-[11px] uppercase tracking-widest"
        >
          <ThumbsUp className="w-5 h-5" /> Appreso!
        </motion.button>
      </div>
    </div>
  );
};
