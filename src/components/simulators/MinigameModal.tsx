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
  <h4 className="text-xs font-display font-black text-primary/30 uppercase tracking-mega">{children}</h4>
);

const GoalItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/10">
    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
    <p className="text-sm font-body text-primary/80 leading-relaxed">{text}</p>
  </div>
);

const StepItem: React.FC<{ index: number; text: string }> = ({ index, text }) => (
  <div className="flex items-start gap-4">
    <div className="w-8 h-8 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
      <span className="font-display font-black text-xs text-secondary">{index}</span>
    </div>
    <p className="text-sm font-body text-primary/70 pt-1.5 leading-relaxed">{text}</p>
  </div>
);

const MaterialTag: React.FC<{ text: string }> = ({ text }) => (
  <span className="px-3 py-1.5 bg-surface-container-low rounded-full text-xs font-display font-bold text-primary/60">
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
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-surface rounded-4xl shadow-[0_32px_80px_rgba(0,0,0,0.25)] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
      onClick={e => e.stopPropagation()}
    >
      {/* Sticky Header */}
      <div className="p-8 pb-6 border-b border-surface-container-low/50 flex items-start justify-between gap-4 sticky top-0 bg-surface rounded-t-4xl z-10">
        <div className="space-y-1">
          <p className="text-secondary font-display font-black text-2xs uppercase tracking-mega">Minigioco Offline</p>
          <h3 className="text-2xl font-display font-black text-primary leading-tight italic tracking-tight">
            {game.titolo}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Chiudi"
          className="btn-icon"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="p-8 space-y-8">
        <p className="text-primary/70 font-body text-base leading-relaxed">{game.descrizione_metodo}</p>

        <div className="space-y-3">
          <SectionLabel>Obiettivi</SectionLabel>
          <div className="grid gap-2">
            {game.obiettivi.map((obj, i) => (
              <GoalItem key={i} text={obj} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <SectionLabel>Istruzioni Passo per Passo</SectionLabel>
          <div className="grid gap-3">
            {game.istruzioni_passo_passo.map((step, i) => (
              <StepItem key={i} index={i + 1} text={step} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <SectionLabel>Materiali Necessari</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {game.materiali_necessari.map((mat, i) => (
              <MaterialTag key={i} text={mat} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
