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
    <div className="max-w-3xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-8 text-center">
        <p className="text-secondary font-display font-black text-[10px] uppercase tracking-[0.4em] mb-2">Esame Finale</p>
        <h2 className="text-2xl font-display font-black text-primary italic">Metti alla prova la tua visione</h2>
        <p className="text-primary/40 font-body text-xs mt-2 uppercase tracking-widest">Sfida {currentIndex + 1} di {availableExams.length}</p>
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
             <div className="bg-surface-container-lowest p-6 rounded-4xl shadow-ambient">
               <MadLibCard data={currentExam.data} onSuccess={handleSuccess} />
             </div>
          )}
          {currentExam.type === 'multipleChoice' && (
            <div className="bg-surface-container-lowest p-6 rounded-4xl shadow-ambient">
              <MultipleChoiceCard data={currentExam.data} onSuccess={handleSuccess} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
