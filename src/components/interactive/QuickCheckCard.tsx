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
    <div className="box-testo p-10 mt-8 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 rotate-12">
        <Zap size={140} className="text-primary-deep" />
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
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-accent-warm shadow-glow shadow-accent-warm/20 rounded-2xl flex items-center justify-center">
                <Zap className="text-white w-5 h-5 fill-white" />
              </div>
              <p className="text-[10px] text-primary-deep font-display font-black uppercase tracking-ultra leading-none">Verifica Intuizione</p>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-display font-black text-text-primary leading-[0.9] italic tracking-tighter">
              {data.question}
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mt-12">
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(true)}
                className="p-8 rounded-4xl bg-surface-container-low border border-border-subtle hover:bg-white hover:border-border-brand transition-all text-text-primary font-display font-black text-[10px] uppercase tracking-widest flex flex-col items-center gap-4 group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:bg-primary-deep group-hover:text-white transition-all transform group-hover:rotate-12 shadow-sm border border-border-subtle">
                  <Check className="w-7 h-7" />
                </div>
                Vero
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChoice(false)}
                className="p-8 rounded-4xl bg-surface-container-low border border-border-subtle hover:bg-white hover:border-border-brand transition-all text-text-primary font-display font-black text-[10px] uppercase tracking-widest flex flex-col items-center gap-4 group shadow-sm hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all transform group-hover:-rotate-12 shadow-sm border border-border-subtle">
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
            className="text-center space-y-10 py-10 relative z-10"
          >
            <div className={`w-24 h-24 rounded-4xl flex items-center justify-center mx-auto shadow-glow border border-white/20 ${feedback.isCorrect ? 'bg-gradient-brand' : 'bg-accent'}`}>
              {feedback.isCorrect ? <Check className="text-white w-12 h-12" /> : <X className="text-white w-12 h-12" />}
            </div>
            <div className="space-y-4">
              <h4 className="text-4xl font-display font-black text-text-primary italic tracking-tight">
                {feedback.isCorrect ? "Ottimo Lavoro!" : "Riprova."}
              </h4>
              <p className="text-text-muted font-body text-base max-w-sm mx-auto leading-relaxed italic">
                {feedback.text}
              </p>
            </div>
            {!feedback.isCorrect && (
              <button 
                onClick={() => setFeedback(null)} 
                className="px-8 py-4 bg-primary-deep text-white font-display font-black text-[10px] uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-lg shadow-primary-deep/20"
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
