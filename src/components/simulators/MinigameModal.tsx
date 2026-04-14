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
    className="modal-overlay backdrop-blur-3xl"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto relative rounded-[3rem] shadow-ambient"
      onClick={e => e.stopPropagation()}
    >
      {/* Sticky Vibrant Header like Pitch Battle */}
      <div className="p-10 pb-8 sticky top-0 bg-white/70 border-b border-white/20 z-50 overflow-hidden backdrop-blur-[40px]">
        {/* Internal Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-brand opacity-10 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none" />
        
        <div className="flex items-start justify-between gap-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-glow shadow-accent/40" />
              <p className="text-primary font-display font-black text-[10px] uppercase tracking-mega">Minigioco Offline</p>
            </div>
            <h3 className="text-4xl font-display font-black text-text-primary leading-[0.9] italic tracking-tight uppercase">
              {game.titolo}
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            aria-label="Chiudi"
            className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/40 flex items-center justify-center border border-white/40 text-primary transition-all shadow-sm"
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Body Area */}
      <div className="p-10 space-y-12 relative z-10">
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary/20 to-transparent -ml-10" />
          <p className="text-text-muted font-body text-lg leading-relaxed italic select-none">
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
          <div className="grid gap-6 bg-white/70 p-8 rounded-4xl border border-white/50 shadow-inner">
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
      </div>
      
      {/* Decorative Aurora Blob */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-warm opacity-[0.05] blur-[100px] pointer-events-none rounded-full" />
    </motion.div>
  </motion.div>
);
