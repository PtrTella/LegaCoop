import React, { useState, useMemo } from 'react';
import { Zap, GripVertical, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MadLib } from '../types';

export const MadLibCard = ({ 
  data, 
  onSuccess 
}: { 
  data: MadLib, 
  onSuccess: () => void 
}) => {
  const [selections, setSelections] = useState<{[key: number]: string}>({});
  const [feedback, setFeedback] = useState<{text: string, isCorrect: boolean} | null>(null);

  // Parse template: "La {cooperativa} è una {impresa}" 
  // into parts and find correct words
  const { parts, correctWords } = useMemo(() => {
    const regex = /\{([^}]+)\}/g;
    const parts: (string | { index: number, correct: string })[] = [];
    const correctWords: string[] = [];
    let lastIndex = 0;
    let match;
    let blankIndex = 0;

    while ((match = regex.exec(data.template)) !== null) {
      if (match.index > lastIndex) {
        parts.push(data.template.substring(lastIndex, match.index));
      }
      const correct = match[1];
      parts.push({ index: blankIndex, correct });
      correctWords.push(correct);
      blankIndex++;
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < data.template.length) {
      parts.push(data.template.substring(lastIndex));
    }

    return { parts, correctWords };
  }, [data.template]);

  const handleSelect = (index: number, word: string) => {
    setSelections(prev => ({ ...prev, [index]: word }));
    setFeedback(null);
  };

  const checkSolution = () => {
    const isCorrect = correctWords.every((word, idx) => selections[idx] === word);
    if (isCorrect) {
      onSuccess();
    } else {
      setFeedback({ text: "Alcuni termini non sono nel posto giusto. Riprova.", isCorrect: false });
    }
  };

  const allFilled = Object.keys(selections).length === correctWords.length;

  return (
    <div className="bg-surface-container-low border border-primary/10 rounded-[32px] p-8 shadow-ambient space-y-8 mt-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8">
        <GripVertical size={120} className="text-secondary" />
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
          <Zap className="text-secondary w-5 h-5" />
        </div>
        <span className="text-[10px] text-secondary font-display font-black uppercase tracking-widest">Mad Libs - Incastro Didattico</span>
      </div>

      <AnimatePresence mode="wait">
        {!feedback || !feedback.isCorrect ? (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="text-lg md:text-xl font-display font-black text-primary leading-loose italic relative z-10 px-2 select-none">
              {parts.map((part, i) => (
                typeof part === 'string' ? (
                  <span key={i}>{part}</span>
                ) : (
                  <div key={i} className="inline-block mx-1.5 align-middle">
                    <select 
                      value={selections[part.index] || ''}
                      onChange={(e) => handleSelect(part.index, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg border-2 transition-all font-display font-black text-[10px] uppercase tracking-widest bg-white appearance-none cursor-pointer ${
                        selections[part.index] 
                        ? 'border-primary text-primary' 
                        : 'border-dashed border-primary/20 text-primary/40'
                      }`}
                    >
                      <option value="" disabled>...</option>
                      {data.expectedWords.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )
              ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!allFilled}
                onClick={checkSolution}
                className={`px-8 py-4 rounded-2xl font-display font-black text-xs uppercase tracking-widest shadow-lg transition-all ${
                  !allFilled
                  ? 'bg-surface-container-highest text-primary/20 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-secondary shadow-primary/20'
                }`}
              >
                Verifica Concetti
              </motion.button>
              {feedback && !feedback.isCorrect && (
                <p className="text-tertiary text-[10px] font-display font-black uppercase tracking-widest animate-pulse">{feedback.text}</p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-6">
             <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary-container rounded-[24px] flex items-center justify-center mx-auto shadow-xl animate-bounce">
                <Check className="text-white w-12 h-12" />
             </div>
             <div>
                <h4 className="text-2xl font-display font-black text-primary italic">Ottimo Lavoro</h4>
                <p className="text-primary/60 text-sm font-body mt-4 max-w-sm mx-auto leading-relaxed">
                   {feedback.text}
                </p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
