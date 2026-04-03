import React, { useState } from 'react';
import { Gamification } from '../../types';
import { FlashcardDeck } from './FlashcardDeck';
import { MadLibCard } from '../interactive/MadLibCard';
import { MultipleChoiceCard } from '../interactive/MultipleChoiceCard';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ModuleExam = ({ 
  gamification, 
  onFinish 
}: { 
  gamification: Gamification, 
  onFinish: () => void 
}) => {
  // Find all available test types
  const availableExams: { type: string, data: any }[] = [];
  
  if (gamification.flashcards && gamification.flashcards.length > 0) {
    availableExams.push({ type: 'flashcards', data: gamification.flashcards });
  }
  if (gamification.madLibs && gamification.madLibs.length > 0) {
    gamification.madLibs.forEach(ml => availableExams.push({ type: 'madLib', data: ml }));
  }
  if (gamification.multipleChoices && gamification.multipleChoices.length > 0) {
    gamification.multipleChoices.forEach(mc => availableExams.push({ type: 'multipleChoice', data: mc }));
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSuccess = () => {
    if (currentIndex < availableExams.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      onFinish();
    }
  };

  if (availableExams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <button onClick={onFinish} className="p-4 bg-primary text-white rounded-xl">Termina Modulo</button>
      </div>
    );
  }

  const currentExam = availableExams[currentIndex];

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center">
      <div className="mb-8 text-center">
        <h2 className="font-display text-2xl font-black italic text-primary">Esame Finale</h2>
        <p className="mt-2 font-body text-3xs font-black uppercase tracking-widest text-primary/40">Sfida {currentIndex + 1} di {availableExams.length}</p>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {currentExam.type === 'flashcards' && (
            <FlashcardDeck cards={currentExam.data} onFinish={handleSuccess} />
          )}
          {currentExam.type === 'madLib' && (
             <div className="rounded-4xl bg-surface-container-lowest p-6 shadow-ambient">
               <MadLibCard data={currentExam.data} onSuccess={handleSuccess} />
             </div>
          )}
          {currentExam.type === 'multipleChoice' && (
            <div className="rounded-4xl bg-surface-container-lowest p-6 shadow-ambient">
              <MultipleChoiceCard data={currentExam.data} onSuccess={handleSuccess} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
