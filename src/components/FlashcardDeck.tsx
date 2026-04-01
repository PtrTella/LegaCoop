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
    <div className="flex flex-col h-full bg-slate-50 p-10 space-y-10 max-w-4xl mx-auto rounded-[32px] border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">AI Flashcards</h2>
          <p className="text-slate-500 text-base font-medium">Carta {currentIndex + 1} di {cards.length || 1}</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100 font-black text-indigo-600 text-lg">
          {cards.length > 0 ? Math.round((currentIndex / cards.length) * 100) : 100}%
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center perspective-1000 min-h-[400px]">
        <motion.div 
          onClick={() => setIsFlipped(!isFlipped)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-full max-w-2xl aspect-[16/9] cursor-pointer preserve-3d"
        >
          <div className="absolute inset-0 bg-white rounded-[40px] shadow-xl border-2 border-indigo-50 p-12 flex flex-col items-center justify-center text-center backface-hidden hover:border-indigo-100 transition-colors">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-8">
              <Info className="text-indigo-600 w-10 h-10" />
            </div>
            <p className="text-3xl font-bold text-slate-800 leading-tight max-w-xl">
              {card.question}
            </p>
            <p className="mt-10 text-indigo-400 text-sm font-bold uppercase tracking-widest animate-pulse">Tocca per girare</p>
          </div>

          <div className="absolute inset-0 bg-indigo-600 rounded-[40px] shadow-2xl p-12 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180">
            <p className="text-white text-2xl font-medium leading-relaxed max-w-xl">
              {card.answer}
            </p>
            <div className="mt-10 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ThumbsUp className="text-white w-8 h-8" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6 h-24 max-w-2xl mx-auto w-full">
        <button 
          onClick={() => handleNext(false)}
          className="bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all text-lg"
        >
          <ThumbsDown className="w-6 h-6" /> Non Sapevo
        </button>
        <button 
          onClick={() => handleNext(true)}
          className="bg-green-500 rounded-2xl flex items-center justify-center gap-3 font-bold text-white shadow-lg shadow-green-200 hover:bg-green-600 active:scale-[0.98] transition-all text-lg"
        >
          <ThumbsUp className="w-6 h-6" /> Lo Sapevo!
        </button>
      </div>
    </div>
  );
};
