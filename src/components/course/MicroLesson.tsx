import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentChunk, Lesson } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { VideoPlayer } from '../ui/VideoPlayer';
import { AudioPill } from '../ui/AudioPill';
import { QuickCheckCard } from '../interactive/QuickCheckCard';

import { MultipleChoiceCard } from '../interactive/MultipleChoiceCard';
import { MadLibCard } from '../interactive/MadLibCard';
import { renderTextWithKeywords } from '../../utils/textUtils';

// Dispatcher for interactive chunk components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const INTERACTIVE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  quickCheck: QuickCheckCard,
  multipleChoice: MultipleChoiceCard,
  madLib: MadLibCard,
};

// Props for the internal chunk renderer
interface ChunkRendererProps {
  chunk: ContentChunk;
  idx: number;
  isSolved: boolean;
  keywords: Lesson['keywords'];
  onSuccess: (idx: number) => void;
  chunkRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

// Internal component for rendering individual content blocks
const ChunkRenderer = React.memo(({ chunk, idx, isSolved, keywords, onSuccess, chunkRefs }: ChunkRendererProps) => {
  return (
    <motion.div
      ref={el => { chunkRefs.current[idx] = el; }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isSolved ? 0.6 : 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      className="relative"
    >
      {chunk.type === 'text' && (
        <Card padding="p-0" className="bg-white/70 backdrop-blur-[40px] shadow-soft border border-white/40 overflow-hidden">
          <article className="p-8 sm:p-12 text-text-lesson text-lg sm:text-2xl font-body leading-[1.6] selection:bg-primary/20">
            {renderTextWithKeywords(chunk.content, keywords)}
          </article>
        </Card>
      )}

      {chunk.type === 'video' && (
        <VideoPlayer content={chunk.content} />
      )}

      {chunk.type === 'audio' && (
        <AudioPill src={chunk.content} title={chunk.title} />
      )}


      {chunk.type === 'interactive' && (
        <div className="mt-4">
          {(() => {
            const InteractiveComponent = INTERACTIVE_COMPONENTS[chunk.gamification.type];
            return InteractiveComponent ? (
              <InteractiveComponent
                data={chunk.gamification.data}
                onSuccess={() => onSuccess(idx)}
              />
            ) : null;
          })()}
        </div>
      )}
    </motion.div>
  );
});

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

  // Reset al cambio lezione
  useEffect(() => {
    setVisibleStepLimit(0);
    setSolvedChunks([]);
    
    // Forza lo scroll del contenitore principale all'inizio della lezione
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [lesson.id]);

  const handleNextStep = useCallback(() => {
    if (visibleStepLimit < lesson.contentChunks.length - 1) {
      setVisibleStepLimit(prev => prev + 1);
    } else {
      onComplete();
    }
  }, [visibleStepLimit, lesson.contentChunks.length, onComplete]);

  // Scroll fluido al trigger del nuovo step
  useEffect(() => {
    if (visibleStepLimit === 0) return; // Non scrollare al primo step per non nascondere l'header

    const timer = setTimeout(() => {
      const el = chunkRefs.current[visibleStepLimit];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100); 
    return () => clearTimeout(timer);
  }, [visibleStepLimit]);

  const handleGameSuccess = useCallback((idx: number) => {
    setSolvedChunks(prev => [...prev, idx]);
    // Non chiamiamo handleNextStep() automaticamente per permettere di vedere il risultato
  }, []);

  const currentChunk = lesson.contentChunks[visibleStepLimit];
  const isInteractive = currentChunk?.type === 'interactive';
  const isSolved = solvedChunks.includes(visibleStepLimit);
  const showNextButton = !isInteractive || isSolved;

  return (
    <div className="flex flex-col h-full bg-transparent max-w-4xl mx-auto space-y-8 sm:space-y-12 pb-64 pt-6 sm:pt-12 px-4 sm:px-6">

      {/* Header statico e pulito */}
      <header className="space-y-4 pt-4 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <div className="w-2 h-2 rounded-full bg-accent-warm shadow-glow shadow-accent-warm/40 animate-pulse" />
          <p className="text-primary font-display font-black text-[10px] uppercase tracking-mega">
            {phaseTitle}
          </p>
        </div>
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-display font-black text-text-primary leading-[0.9] tracking-tighter italic select-none">
          {lesson.title}
          <span className="not-italic bg-gradient-brand bg-clip-text text-transparent opacity-90 block sm:inline">.</span>
        </h2>

        <div className="w-24 h-1.5 bg-primary/20 rounded-full mt-8 mx-auto sm:mx-0" />
      </header>

      {/* Learning Flow: Linear rendering of active chunks */}
      <div className="space-y-8 sm:space-y-12 relative">

        {lesson.contentChunks.slice(0, visibleStepLimit + 1).map((chunk, idx) => (
          <ChunkRenderer 
            key={`${lesson.id}-${idx}`}
            chunk={chunk}
            idx={idx}
            isSolved={chunk.type === 'interactive' && solvedChunks.includes(idx)}
            keywords={lesson.keywords}
            onSuccess={handleGameSuccess}
            chunkRefs={chunkRefs}
          />
        ))}
      </div>

      {/* UI di navigazione fissa */}
      <div className="fixed bottom-12 left-0 right-0 flex justify-center pointer-events-none z-50 px-6">
        <AnimatePresence>
          {showNextButton && (
            <motion.div 
              key="btn" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }} 
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="pointer-events-auto"
            >
              <Button onClick={handleNextStep} size="lg" className="group">
                <span>{visibleStepLimit === lesson.contentChunks.length - 1 ? "Concludi" : "Continua"}</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
