import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lesson, ContentChunk } from '../types';
import { PopTooltip } from './PopTooltip';
import { QuickCheckCard } from './QuickCheckCard';
import { MultipleChoiceCard } from './MultipleChoiceCard';
import { MadLibCard } from './MadLibCard';

export const MicroLesson = ({ 
  lesson, 
  onComplete 
}: { 
  lesson: Lesson, 
  onComplete: () => void 
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [visibleStepLimit, setVisibleStepLimit] = useState(0);
  const [solvedChunks, setSolvedChunks] = useState<number[]>([]);
  const chunkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const section = lesson.sections[currentSectionIndex];

  // Reset counters when moving to a new section or lesson
  useEffect(() => {
    setVisibleStepLimit(0);
    setSolvedChunks([]);
  }, [currentSectionIndex, lesson.id]);

  // Smart scroll: center the new content to avoid overlapping with fixed bottom button
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentElement = chunkRefs.current[visibleStepLimit];
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150); // slight delay to allow rendering
    return () => clearTimeout(timer);
  }, [visibleStepLimit, solvedChunks]);

  if (!section) {
    return (
      <div className="flex flex-col h-full items-center justify-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-[32px] flex items-center justify-center animate-bounce shadow-xl">
           <Zap className="text-primary w-10 h-10" />
        </div>
        <div className="text-center">
          <p className="text-primary/40 font-display font-black text-[10px] uppercase tracking-widest mb-2">Punto di Svolta Raggiunto</p>
          <h3 className="text-2xl font-display font-black text-primary italic leading-tight">Ottimo lavoro, Cooperatore!</h3>
        </div>
        <button 
          onClick={onComplete} 
          className="px-10 py-5 bg-primary text-white rounded-2xl font-display font-black text-xs uppercase tracking-widest shadow-2xl shadow-primary/30 transition-transform active:scale-95"
        >
          Vai al Quiz Finale
        </button>
      </div>
    );
  }

  const handleNextStep = () => {
    const isAtLastChunk = visibleStepLimit === section.contentChunks.length - 1;
    
    if (!isAtLastChunk) {
      setVisibleStepLimit(prev => prev + 1);
    } else {
      // Transition to next section or finish
      if (currentSectionIndex < lesson.sections.length - 1) {
        setCurrentSectionIndex(i => i + 1);
      } else {
        onComplete();
      }
    }
  };

  const renderTextContent = (text: string) => {
    return text.split(' ').map((word, i) => {
      const cleanWord = word.replace(/[.,!?]/g, '');
      if (lesson.keywords && lesson.keywords[cleanWord]) {
        return <React.Fragment key={i}><PopTooltip word={word} definition={lesson.keywords[cleanWord]} /> </React.Fragment>;
      }
      return word + ' ';
    });
  };

  const renderInteractive = (gamification: any, idx: number) => {
    const { type, data } = gamification;
    const onSuccess = () => {
      if (!solvedChunks.includes(idx)) {
        setSolvedChunks(prev => [...prev, idx]);
        handleNextStep();
      }
    };

    if (type === 'quickCheck') return <QuickCheckCard data={data} onSuccess={onSuccess} />;
    if (type === 'multipleChoice') return <MultipleChoiceCard data={data} onSuccess={onSuccess} />;
    if (type === 'madLib') return <MadLibCard data={data} onSuccess={onSuccess} />;
    return null;
  };

  const currentChunk = section.contentChunks[visibleStepLimit];
  const isChunkInteractive = currentChunk?.type === 'interactive';
  const isChunkSolved = solvedChunks.includes(visibleStepLimit);
  
  // The persistent button only appears if:
  // 1. We are not on an interactive block OR the block is solved
  // AND we are not yet done with the section
  const showNextButton = !isChunkInteractive || isChunkSolved;

  return (
    <div className="flex flex-col h-full bg-surface max-w-4xl mx-auto space-y-12 pb-48 pt-12 px-6">
      {/* Header Area */}
      <header className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="w-12 h-0.5 bg-secondary/30 rounded-full"></span>
          <p className="text-secondary font-display font-black text-[10px] uppercase tracking-[0.5em]">{lesson.title}</p>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-black text-primary leading-[1.1] tracking-tight max-w-3xl italic">
          {section.title || "Percorso di Evoluzione"}
        </h2>
      </header>

      {/* Main Learning Flow */}
      <div className="space-y-12 relative">
        {section.contentChunks.map((chunk, idx) => {
          if (idx > visibleStepLimit) return null;
          
          const isSolvedGame = chunk.type === 'interactive' && solvedChunks.includes(idx);
          if (isSolvedGame) return null; // Disappear when solved

          return (
            <motion.div 
              key={`${currentSectionIndex}-${idx}`}
              ref={(el) => chunkRefs.current[idx] = el}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative"
            >
              {chunk.type === 'text' && (
                <div className="bg-surface-container-lowest p-10 rounded-[40px] shadow-ambient border border-primary/5">
                  <article className="text-primary/80 text-xl font-body leading-[1.7] tracking-tight selection:bg-secondary/20">
                    {renderTextContent(chunk.content)}
                  </article>
                </div>
              )}

              {chunk.type === 'video' && (
                <div className="bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-ambient relative aspect-video bg-primary-container group border border-primary/10">
                    <img 
                      src={chunk.content} 
                      alt="Lesson Video" 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button 
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all"
                      >
                        <Play className="text-primary w-8 h-8 fill-primary" />
                      </motion.button>
                    </div>
                </div>
              )}

              {chunk.type === 'interactive' && renderInteractive(chunk.gamification, idx)}
            </motion.div>
          );
        })}
        
      </div>

      {/* Universal Progression UI */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
        <AnimatePresence>
          {showNextButton && (
            <motion.button 
              key="next-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextStep}
              className="pointer-events-auto px-10 py-5 bg-primary text-white font-display font-black text-xs uppercase tracking-widest rounded-[24px] shadow-2xl shadow-primary/40 flex items-center gap-4 transition-all hover:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <span>
                  {visibleStepLimit === section.contentChunks.length - 1 
                    ? (currentSectionIndex < lesson.sections.length - 1 ? "Prossima Fase" : "Concludi Percorso") 
                    : "Continua Lettura"} 
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .shadow-ambient {
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.1), 0 0 1px 0 rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};
