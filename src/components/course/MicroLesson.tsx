import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lesson, ContentChunk } from '../../types';
import { PopTooltip } from '../ui/PopTooltip';
import { Button } from '../ui/Button';
import { QuickCheckCard } from '../interactive/QuickCheckCard';
import { MultipleChoiceCard } from '../interactive/MultipleChoiceCard';
import { MadLibCard } from '../interactive/MadLibCard';

export const MicroLesson = ({ 
  lesson, 
  phaseTitle,
  onComplete 
}: { 
  lesson: Lesson, 
  phaseTitle: string,
  onComplete: () => void 
}) => {
  const [visibleStepLimit, setVisibleStepLimit] = useState(0);
  const [solvedChunks, setSolvedChunks] = useState<number[]>([]);
  const chunkRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reset counters when moving to a new lesson
  useEffect(() => {
    setVisibleStepLimit(0);
    setSolvedChunks([]);
  }, [lesson.id]);

  // Smooth scroll al nuovo elemento con margine 
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentElement = chunkRefs.current[visibleStepLimit];
      if (currentElement) {
        const offset = 120; // Spazio dal top dello schermo
        const elementPosition = currentElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150); 
    return () => clearTimeout(timer);
  }, [visibleStepLimit, solvedChunks]);

  const handleNextStep = () => {
    const isAtLastChunk = visibleStepLimit === lesson.contentChunks.length - 1;
    
    if (!isAtLastChunk) {
      setVisibleStepLimit(prev => prev + 1);
    } else {
      // Lesson completed
      onComplete();
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

  const currentChunk = lesson.contentChunks[visibleStepLimit];
  const isChunkInteractive = currentChunk?.type === 'interactive';
  
  // Il pulsante in basso è visibile unicamente se NON stiamo affrontando un blocco interattivo
  const showNextButton = !isChunkInteractive;

  return (
    <div className="flex flex-col h-full bg-surface max-w-4xl mx-auto space-y-12 pb-48 pt-12 px-6">
      {/* Header Area - Focused on Lesson Title */}
      <header className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Zap className="text-secondary w-4 h-4" />
          </div>
          <p className="text-secondary font-display font-black text-[11px] uppercase tracking-[0.4em] leading-none">{phaseTitle}</p>
        </div>
        <h2 className="text-5xl md:text-7xl font-display font-black text-primary leading-[0.95] tracking-tighter max-w-4xl italic">
          {lesson.title}
        </h2>
        <div className="w-24 h-1.5 bg-secondary/20 rounded-full mt-6"></div>
      </header>

      {/* Main Learning Flow */}
      <div className="space-y-12 relative">
        {lesson.contentChunks.map((chunk, idx) => {
          if (idx > visibleStepLimit) return null;
          
          const isSolvedGame = chunk.type === 'interactive' && solvedChunks.includes(idx);
          if (isSolvedGame) return null; // Disappear when solved

          return (
            <motion.div 
              key={`${lesson.id}-${idx}`}
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
            <motion.div 
              key="next-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="pointer-events-auto"
            >
              <Button 
                onClick={handleNextStep}
                variant="primary"
                size="lg"
                className="group"
              >
                <span>
                  {visibleStepLimit === lesson.contentChunks.length - 1 
                    ? "Concludi Percorso" 
                    : "Continua"} 
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
