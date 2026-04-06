import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentChunk, Lesson } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { VideoPlayer } from '../ui/VideoPlayer';
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
        <Card padding="p-10">
          <article className="text-primary/80 text-xl font-body leading-[1.7] selection:bg-secondary/20">
            {renderTextWithKeywords(chunk.content, keywords)}
          </article>
        </Card>
      )}

      {chunk.type === 'video' && (
        <VideoPlayer content={chunk.content} />
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
    <div className="flex flex-col h-full bg-surface max-w-4xl mx-auto space-y-12 pb-64 pt-12 px-6">
      {/* Header statico e pulito */}
      <header className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-xl flex items-center justify-center">
            <Zap className="text-secondary w-4 h-4" />
          </div>
          <p className="text-secondary font-display font-black text-xs-tight uppercase tracking-mega">
            {phaseTitle}
          </p>
        </div>
        <h2 className="text-5xl md:text-7xl font-display font-black text-primary leading-[0.95] tracking-tighter italic">
          {lesson.title}
        </h2>
        <div className="w-24 h-1.5 bg-secondary/20 rounded-full mt-6" />
      </header>

      {/* Learning Flow: Linear rendering of active chunks */}
      <div className="space-y-12 relative">
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
