import React, { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MultipleChoice } from '../types';

export const MultipleChoiceCard = ({ 
  data, 
  onSuccess 
}: { 
  data: MultipleChoice, 
  onSuccess: () => void 
}) => {
  const [feedback, setFeedback] = useState<{text: string, isCorrect: boolean} | null>(null);

  const handleOption = (index: number) => {
    if (index === data.correctAnswerIndex) {
      onSuccess();
    } else {
      setFeedback({ text: "Non proprio. Rileggi bene il testo sopra.", isCorrect: false });
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-primary/10 rounded-[32px] p-8 shadow-ambient space-y-6 mt-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 rotate-12">
        <Zap size={100} className="text-primary" />
      </div>

      <AnimatePresence mode="wait">
        {!feedback || !feedback.isCorrect ? (
          <motion.div key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span className="text-[9px] text-primary/40 font-display font-black uppercase tracking-[0.3em] mb-4 block">Verifica Rapida</span>
            <h3 className="text-xl font-display font-black text-primary italic leading-tight mb-8">{data.question}</h3>
            
            <div className="grid gap-3">
              {data.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOption(i)}
                  className="w-full p-4 text-left rounded-xl bg-surface-container-low hover:bg-white border border-transparent hover:border-primary/10 transition-all text-primary font-body text-sm font-medium flex items-center justify-between group"
                >
                  {opt}
                  <ChevronRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              ))}
            </div>
            {feedback && !feedback.isCorrect && (
              <p className="text-tertiary text-[10px] font-display font-black uppercase mt-4 animate-pulse italic">{feedback.text}</p>
            )}
          </motion.div>
        ) : (
          <motion.div key="f" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
             <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/20">
                <Zap className="text-white w-8 h-8" />
             </div>
             <p className="text-primary font-display font-black italic">{feedback.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
