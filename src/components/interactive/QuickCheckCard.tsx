import React, { useState } from 'react';
import { Zap, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuickCheck } from '../../types';

export const QuickCheckCard = ({ 
  data, 
  onSuccess 
}: { 
  data: QuickCheck, 
  onSuccess: () => void 
}) => {
  const [feedback, setFeedback] = useState<{text: string, isCorrect: boolean} | null>(null);

  const handleChoice = (choice: boolean) => {
    const isCorrect = choice === data.isTrue;
    if (isCorrect) {
      setFeedback({ 
        text: data.feedback || "Eccellente! Hai colto perfettamente il punto.", 
        isCorrect: true 
      });
      onSuccess();
    } else {
      setFeedback({ 
        text: "Non proprio. Forse dovresti rileggere con più attenzione.", 
        isCorrect: false 
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low border border-secondary/10 rounded-[40px] p-10 shadow-ambient space-y-8 relative overflow-hidden mt-8">
      <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 rotate-12">
        <Zap size={140} className="text-secondary" />
      </div>

      <AnimatePresence mode="wait">
        {!feedback ? (
          <motion.div 
            key="question" 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }} 
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                <Zap className="text-secondary w-6 h-6" />
              </div>
              <p className="text-[10px] text-secondary font-display font-black uppercase tracking-[0.4em] leading-none">Verifica Intuizione</p>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display font-black text-primary leading-tight italic tracking-tight">
              {data.question}
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mt-12">
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(true)}
                className="p-8 rounded-[32px] bg-white border border-secondary/5 shadow-sm hover:shadow-xl hover:border-secondary/20 transition-all text-primary font-display font-black text-xs uppercase tracking-widest flex flex-col items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-secondary/5 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all transform group-hover:rotate-12">
                  <Check className="w-7 h-7" />
                </div>
                Vero
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(false)}
                className="p-8 rounded-[32px] bg-white border border-tertiary/5 shadow-sm hover:shadow-xl hover:border-tertiary/20 transition-all text-primary font-display font-black text-xs uppercase tracking-widest flex flex-col items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-tertiary/5 rounded-full flex items-center justify-center group-hover:bg-tertiary group-hover:text-white transition-all transform group-hover:-rotate-12">
                  <X className="w-7 h-7" />
                </div>
                Falso
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="feedback" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="text-center space-y-8 py-10 relative z-10"
          >
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto shadow-2xl ${feedback.isCorrect ? 'bg-secondary' : 'bg-tertiary animate-shake'}`}>
              {feedback.isCorrect ? <Check className="text-white w-12 h-12" /> : <X className="text-white w-12 h-12" />}
            </div>
            <div className="space-y-4">
              <h4 className="text-3xl font-display font-black text-primary italic">
                {feedback.isCorrect ? "Ottimo Lavoro!" : "Non ancora..."}
              </h4>
              <p className="text-primary/60 font-body text-base max-w-sm mx-auto leading-relaxed">
                {feedback.text}
              </p>
            </div>
            {!feedback.isCorrect && (
              <button 
                onClick={() => setFeedback(null)} 
                className="px-8 py-4 bg-primary text-white font-display font-black text-[11px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform"
              >
                Riprova l'analisi
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
