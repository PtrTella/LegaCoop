import React, { useState, useMemo } from 'react';
import { Zap, GripVertical, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MadLib } from '../../types';

export const MadLibCard = ({ 
  data, 
  onSuccess 
}: { 
  data: MadLib, 
  onSuccess: () => void 
}) => {
  const [selections, setSelections] = useState<{[key: number]: string}>({});
  const [feedback, setFeedback] = useState<{text: string, isCorrect: boolean} | null>(null);

  // Parse template: "La {cooperativa} è una {impresa}" into parts
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
      setFeedback({ 
        text: data.feedback || "Sintesi Perfetta! Hai ricostruito correttamente il concetto.", 
        isCorrect: true 
      });
      onSuccess();
    } else {
      setFeedback({ text: "Analisi incompleta. Alcuni termini non sono nel posto giusto.", isCorrect: false });
    }
  };

  const allFilled = Object.keys(selections).length === correctWords.length;

  return (
    <div className="bg-surface-container-low border border-primary/10 rounded-[40px] p-10 shadow-ambient space-y-10 mt-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] -mr-12 -mt-12">
        <GripVertical size={200} className="text-secondary" />
      </div>

      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
          <Zap className="text-secondary w-6 h-6" />
        </div>
        <p className="text-[10px] text-secondary font-display font-black uppercase tracking-[0.4em] leading-none">Costruzione Logica</p>
      </div>

      <AnimatePresence mode="wait">
        {!feedback || !feedback.isCorrect ? (
          <motion.div key="game" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-10">
            <div className="text-2xl md:text-3xl font-display font-black text-primary leading-[1.6] italic relative z-10 select-none tracking-tight">
              {parts.map((part, i) => (
                typeof part === 'string' ? (
                  <span key={i}>{part}</span>
                ) : (
                  <div key={i} className="inline-block mx-2 align-middle">
                    <select 
                      value={selections[part.index] || ''}
                      onChange={(e) => handleSelect(part.index, e.target.value)}
                      className={`px-4 py-2.5 rounded-[12px] border-2 transition-all font-display font-black text-[11px] uppercase tracking-widest bg-white appearance-none cursor-pointer shadow-sm ${
                        selections[part.index] 
                        ? 'border-primary text-primary' 
                        : 'border-dashed border-primary/20 text-primary/40'
                      }`}
                    >
                      <option value="" disabled>SELEZIONA...</option>
                      {data.expectedWords.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )
              ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-6 relative z-10">
              <motion.button
                whileHover={allFilled ? { scale: 1.05, y: -4 } : {}}
                whileTap={allFilled ? { scale: 0.95 } : {}}
                disabled={!allFilled}
                onClick={checkSolution}
                className={`px-10 py-5 rounded-2xl font-display font-black text-xs uppercase tracking-widest shadow-2xl transition-all ${
                  !allFilled
                  ? 'bg-surface-container-highest text-primary/20 cursor-not-allowed opacity-50'
                  : 'bg-primary text-white hover:bg-secondary shadow-primary/30'
                }`}
              >
                Valida Sintesi
              </motion.button>
              
              {feedback && !feedback.isCorrect && (
                <motion.p 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-tertiary text-[10px] font-display font-black uppercase tracking-widest animate-pulse italic text-center"
                >
                  {feedback.text}
                </motion.p>
              )}
            </div>
          </motion.div>
        ) : (
           <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-8">
             <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary-container rounded-[32px] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <Check className="text-white w-12 h-12" />
             </div>
             <div>
                <h4 className="text-3xl font-display font-black text-primary italic tracking-tight">Sintesi Completata</h4>
                {feedback && feedback.isCorrect && (
                  <p className="text-primary/60 font-body text-base max-w-sm mx-auto leading-relaxed mt-4">
                    {feedback.text}
                  </p>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
