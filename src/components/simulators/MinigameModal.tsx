import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Minigame } from './types';

// --- Private sub-components ---
// React's 'key' prop is a special reconciler attribute and is NOT part of
// component props. These components are used in .map() with key on the JSX
// element, which is valid JSX — the TypeScript error is a known issue with
// inline typing + strict mode. Using explicit interface declarations below
// to satisfy the type checker.

const SectionLabel: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h4 className="text-[10px] font-display font-black text-primary/40 uppercase tracking-mega mb-1">{children}</h4>
);

const GoalItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-3 p-4 rounded-2xl bg-accent-warm/10 border border-accent-warm/20">
    <div className="w-1.5 h-1.5 rounded-full bg-accent-warm mt-2 shrink-0 shadow-glow shadow-accent-warm/40" />
    <p className="text-sm font-body text-accent-warm-deep leading-relaxed">{text}</p>
  </div>
);

const StepItem: React.FC<{ index: number; text: string }> = ({ index, text }) => (
  <div className="flex items-start gap-5 group">
    <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20 group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
      <span className="font-display font-black text-xs text-accent group-hover:text-white">{index}</span>
    </div>
    <p className="text-sm font-body text-text-primary/70 pt-2 leading-relaxed">{text}</p>
  </div>
);

const MaterialTag: React.FC<{ text: string }> = ({ text }) => (
  <span className="px-4 py-2 bg-primary/5 rounded-full text-[10px] font-display font-black text-primary/60 border border-primary/10 tracking-widest uppercase hover:bg-primary/10 transition-colors">
    {text}
  </span>
);

// --- Public component ---

interface MinigameModalProps {
  game: Minigame;
  onClose: () => void;
}

export const MinigameModal: React.FC<MinigameModalProps> = ({ game, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="modal-overlay"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className="bg-white max-w-2xl w-full max-h-full relative rounded-5xl shadow-ambient flex flex-col overflow-hidden"
      onClick={e => e.stopPropagation()}
    >
      {/* Fixed Header - Solid White */}
      <div className="p-8 md:p-10 bg-white border-b border-primary/5 shrink-0 z-50">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-glow shadow-accent/40" />
              <p className="text-primary font-display font-black text-[9px] uppercase tracking-mega">Minigioco Offline</p>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-text-primary leading-none italic tracking-tight uppercase wrap-break-word">
              {game.titolo}
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Chiudi"
            className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-surface-soft hover:bg-white flex items-center justify-center border border-border-subtle text-primary transition-all shadow-sm shrink-0"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Body area */}
      <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-12 touch-pan-y relative scrollbar-hide">
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary/20 to-transparent -ml-8" />
          <p className="text-text-muted font-body text-base md:text-lg leading-relaxed italic select-none">
            "{game.descrizione_metodo}"
          </p>
        </div>

        <div className="space-y-4">
          <SectionLabel>Obiettivi Strategici</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {game.obiettivi.map((obj, i) => (
              <GoalItem key={i} text={obj} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionLabel>Esecuzione Lab</SectionLabel>
          <div className="grid gap-6 bg-surface-soft p-6 md:p-8 rounded-4xl border border-border-subtle shadow-inner">
            {game.istruzioni_passo_passo.map((step, i) => (
              <StepItem key={i} index={i + 1} text={step} />
            ))}
          </div>
        </div>

        <div className="space-y-5 pt-4">
          <SectionLabel>Materiali Necessari</SectionLabel>
          <div className="flex flex-wrap gap-2.5">
            {game.materiali_necessari.map((mat, i) => (
              <MaterialTag key={i} text={mat} />
            ))}
          </div>
        </div>
        
        {/* Decorative Space at bottom for safe scrolling */}
        <div className="h-4" />
      </div>
      
      {/* Subtle Aurora Hint (Internal only) */}
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-warm opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />
    </motion.div>
  </motion.div>
);
