import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Minigame } from './types';

export interface MinigameCardProps {
  game: Minigame;
  icon: LucideIcon;
  index: number;
  onClick: () => void;
}

// React.FC inherits JSX.IntrinsicAttributes (which includes 'key') — this resolves
// the TS error where 'key' is rejected from plain interface-typed components used in .map().
export const MinigameCard: React.FC<MinigameCardProps> = ({ game, icon: Icon, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ y: -4 }}
    onClick={onClick}
    className="bg-surface-container-lowest p-5 rounded-3xl shadow-ambient cursor-pointer group relative overflow-hidden border border-surface-container-low/50 space-y-4"
  >
    {/* Ghost icon decor */}
    <div className="absolute top-0 right-0 opacity-[0.04] p-4 -translate-y-2 translate-x-2" aria-hidden="true">
      <Icon size={64} />
    </div>

    {/* Icon badge */}
    <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center group-hover:bg-secondary/10 transition-all duration-300">
      <Icon className="w-4.5 h-4.5 text-secondary" aria-hidden="true" />
    </div>

    {/* Content */}
    <div className="space-y-1.5 relative z-10">
      <h4 className="font-display font-black text-sm-alt text-primary leading-tight italic tracking-tight group-hover:text-secondary transition-colors">
        {game.titolo}
      </h4>
      <p className="text-primary/50 font-body text-[11px] leading-relaxed line-clamp-2">
        {game.descrizione_metodo}
      </p>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between">
      <span className="text-3xs font-display font-black text-primary/20 uppercase tracking-widest">
        {game.materiali_necessari.length} materiali
      </span>
      <div className="flex items-center gap-1 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
        <span className="text-3xs font-display font-black uppercase tracking-widest">Scopri</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </div>
  </motion.div>
);
