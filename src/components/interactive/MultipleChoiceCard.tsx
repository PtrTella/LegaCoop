import React, { useState } from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MultipleChoice } from '../../types';

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
      setFeedback({ 
        text: data.feedback || "Analisi Corretta! Hai identificato la strategia vincente.", 
        isCorrect: true 
      });
      onSuccess();
    } else {
      setFeedback({ text: "Non proprio. Analizza meglio le opzioni sopra.", isCorrect: false });
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-primary/10 rounded-[40px] p-10 shadow-ambient space-y-8 mt-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] -mr-12 -mt-12 rotate-[25deg]">
        <Zap size={180} className="text-primary" />
      </div>

      <AnimatePresence mode="wait">
        {!feedback || !feedback.isCorrect ? (
          <motion.div 
            key="q" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4 } }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
              <p className="text-[10px] text-primary/40 font-display font-black uppercase tracking-[0.4em] leading-none">Scelta Strategica</p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display font-black text-primary italic leading-tight tracking-tight mb-10 select-none">
              {data.question}
            </h3>
            
            <div className="grid gap-4">
              {data.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOption(i)}
                  className="w-full p-6 text-left rounded-[24px] bg-surface-container-low hover:bg-white border border-transparent hover:border-primary/10 transition-all text-primary font-body text-base font-medium flex items-center justify-between group shadow-sm hover:shadow-xl"
                >
                  <span className="max-w-[85%] leading-relaxed">{opt}</span>
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </motion.button>
              ))}
            </div>
            
            {feedback && !feedback.isCorrect && (
              <motion.p 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-tertiary text-[10px] font-display font-black uppercase mt-6 italic tracking-widest text-center animate-pulse"
              >
                {feedback.text}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div key="f" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
             <div className="w-20 h-20 bg-secondary rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                <Zap className="text-white w-10 h-10" />
             </div>
             <p className="text-primary font-display font-black text-xl italic tracking-tight capitalize">Analisi Validata</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
