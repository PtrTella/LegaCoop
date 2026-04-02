import React, { useState } from 'react';
import { ChevronRight, Zap, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QuickCheck } from '../types';

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
      onSuccess();
    } else {
      setFeedback({ 
        text: "Non proprio. Forse dovresti rileggere con più attenzione.", 
        isCorrect: false 
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low border border-secondary/20 rounded-[32px] p-8 shadow-ambient space-y-6 relative overflow-hidden mt-8">
      <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8">
        <Zap size={120} className="text-secondary" />
      </div>

      <AnimatePresence mode="wait">
        {!feedback ? (
          <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Zap className="text-secondary w-5 h-5" />
              </div>
              <span className="text-[10px] text-secondary font-display font-black uppercase tracking-widest">Quick Check - Vero o Falso</span>
            </div>
            <h3 className="text-xl font-display font-black text-primary leading-tight relative z-10 italic">
              {data.question}
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(true)}
                className="p-6 rounded-2xl bg-white/50 hover:bg-white border border-transparent hover:border-secondary/20 shadow-sm transition-all text-primary font-display font-black text-xs uppercase tracking-widest flex flex-col items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Check className="w-6 h-6" />
                </div>
                Vero
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(false)}
                className="p-6 rounded-2xl bg-white/50 hover:bg-white border border-transparent hover:border-secondary/20 shadow-sm transition-all text-primary font-display font-black text-xs uppercase tracking-widest flex flex-col items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center group-hover:bg-tertiary group-hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </div>
                Falso
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="feedback" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-8 relative z-10">
            <div className={`w-20 h-20 ${feedback.isCorrect ? 'bg-secondary' : 'bg-tertiary'} rounded-2xl flex items-center justify-center mx-auto animate-bounce shadow-lg`}>
              {feedback.isCorrect ? <Check className="text-white w-10 h-10" /> : <X className="text-white w-10 h-10" />}
            </div>
            <div>
              <h4 className="text-xl font-display font-black text-primary">{feedback.isCorrect ? 'Analisi Corretta' : 'Attenzione'}</h4>
              <p className="text-primary/70 font-body mt-4 max-w-md mx-auto leading-relaxed text-sm">
                {feedback.text}
              </p>
            </div>
            {!feedback.isCorrect && (
              <button 
                onClick={() => setFeedback(null)} 
                className="mt-8 px-6 py-3 bg-surface-container-highest text-primary font-display font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white transition-colors relative z-10"
              >
                Riprova
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
