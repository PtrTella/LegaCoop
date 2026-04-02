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
  const [isSectionInteractivePassed, setIsSectionInteractivePassed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const section = lesson.sections[currentSectionIndex];

  // Reset steps when moving to a new section or lesson
  useEffect(() => {
    setVisibleStepLimit(0);
    setIsSectionInteractivePassed(false);
  }, [currentSectionIndex, lesson.id]);

  // Auto-scroll to bottom when new steps appear, waiting for animation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [visibleStepLimit, isSectionInteractivePassed]);

  if (!section) {
    return (
      <div className="flex flex-col h-full items-center justify-center space-y-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center animate-bounce">
           <Zap className="text-primary w-8 h-8" />
        </div>
        <p className="text-primary/40 font-display font-black text-[10px] uppercase tracking-widest">Lezione Terminata</p>
        <button 
          onClick={onComplete} 
          className="px-8 py-4 bg-primary text-white rounded-2xl font-display font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20"
        >
          Vai al Quiz Finale
        </button>
      </div>
    );
  }

  const handleNextStep = () => {
    if (visibleStepLimit < section.contentChunks.length - 1) {
      setVisibleStepLimit(prev => prev + 1);
    } else if (section.inlineGamification && !isSectionInteractivePassed) {
      // Logic for section-level gamification handled inline below
    } else {
      // Move to next section
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

  const renderInteractive = (gamification: any, onSuccess: () => void) => {
    const type = gamification.type;
    const data = gamification.data;
    if (type === 'quickCheck') return <QuickCheckCard data={data} onSuccess={onSuccess} />;
    if (type === 'multipleChoice') return <MultipleChoiceCard data={data} onSuccess={onSuccess} />;
    if (type === 'madLib') return <MadLibCard data={data} onSuccess={onSuccess} />;
    return null;
  };

  const currentChunk = section.contentChunks[visibleStepLimit];
  const isAtEndOfChunks = visibleStepLimit === section.contentChunks.length - 1;
  const showSectionGame = isAtEndOfChunks && section.inlineGamification && !isSectionInteractivePassed;
  
  // A chunk is "active/blocking" if it's an interactive one and not solved
  // BUT in our current sequence we don't have a state for "chunk-level solved"
  // Let's add a state to track solved status of interactive chunks
  const [solvedChunks, setSolvedChunks] = useState<number[]>([]);
  const isChunkInteractiveSolved = solvedChunks.includes(visibleStepLimit);

  const canShowNextButton = (currentChunk.type !== 'interactive' || isChunkInteractiveSolved) && !showSectionGame;

  return (
    <div className="flex flex-col h-full bg-surface max-w-4xl mx-auto space-y-8 pb-32 pt-8 px-4">
      <div className="mb-4">
        <p className="text-secondary font-display font-black text-[10px] uppercase tracking-[0.4em] mb-2">{lesson.title}</p>
        <h2 className="text-2xl font-display font-black text-primary leading-tight tracking-tight max-w-3xl italic">{section.title || "Percorso di Evoluzione"}</h2>
      </div>

      <div className="space-y-10">
        {/* Render visible chunks */}
        {section.contentChunks.map((chunk, idx) => {
          if (idx > visibleStepLimit) return null;
          
          return (
            <motion.div 
              key={`${currentSectionIndex}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {chunk.type === 'text' && (
                <div className="bg-surface-container-lowest p-8 rounded-[32px] shadow-ambient">
                  <article className="text-primary/70 text-lg font-body leading-relaxed tracking-tight">
                    {renderTextContent(chunk.content)}
                  </article>
                </div>
              )}

              {chunk.type === 'video' && (
                <div className="bg-surface-container-lowest rounded-[32px] overflow-hidden shadow-ambient relative h-[240px] bg-primary group">
                    <img 
                      src={chunk.content} 
                      alt="Lesson Video" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-primary/10 to-primary/40">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-[20px] rounded-full flex items-center justify-center border border-white/30 hover:bg-white/40 transition-all"
                      >
                        <Play className="text-white w-8 h-8 fill-white" />
                      </motion.button>
                    </div>
                </div>
              )}

              {chunk.type === 'interactive' && !solvedChunks.includes(idx) && (
                <div className="relative">
                  {renderInteractive(chunk.gamification, () => {
                    if (!solvedChunks.includes(idx)) {
                      setSolvedChunks(prev => [...prev, idx]);
                      // Auto-advance immediately
                      handleNextStep();
                    }
                  })}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Section-level inline gamification (Legacy Support) */}
        {showSectionGame && !isSectionInteractivePassed && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            {renderInteractive(section.inlineGamification, () => {
              setIsSectionInteractivePassed(true);
              // Auto-advance immediately
              handleNextStep();
            })}
          </motion.div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Persistent Interaction Row */}
      <div className="fixed bottom-12 right-0 left-0 flex justify-center pointer-events-none">
        <AnimatePresence>
          {(canShowNextButton || (isAtEndOfChunks && (isSectionInteractivePassed || !section.inlineGamification))) && (
            <motion.button 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextStep}
              className="pointer-events-auto px-8 py-4 bg-primary text-white font-display font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 flex items-center gap-3 active:bg-secondary transition-colors"
            >
              {isAtEndOfChunks ? (currentSectionIndex < lesson.sections.length - 1 ? "Prossima Fase" : "Completa Studio") : "Continua Lettura"} 
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
