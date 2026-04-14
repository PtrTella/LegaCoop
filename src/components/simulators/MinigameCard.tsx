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

export const MinigameCard: React.FC<MinigameCardProps> = ({ game, icon: Icon, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={onClick}
    className="box-testo p-6 cursor-pointer group relative overflow-hidden bg-white hover:border-primary-deep/20 transition-all duration-300"
  >
    {/* Very subtle Ghost icon decor */}
    <div className="absolute top-0 right-0 opacity-[0.02] p-4 transform group-hover:scale-105 transition-transform" aria-hidden="true">
      <Icon size={120} className={index % 2 === 0 ? 'text-primary-deep' : 'text-accent-warm'} />
    </div>

    {/* Icon badge: The surgical color anchor */}
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border mb-6 ${
      index % 2 === 0 
      ? 'bg-primary-deep/5 border-primary-deep/10 text-primary-deep group-hover:bg-primary-deep group-hover:text-white' 
      : 'bg-accent-warm/5 border-accent-warm/10 text-accent-warm group-hover:bg-accent-warm group-hover:text-white'
    }`}>
      <Icon className="w-5 h-5" aria-hidden="true" />
    </div>

    {/* Content */}
    <div className="space-y-2 relative z-10">
      <div className="flex items-center gap-2">
        <div className={`w-1 h-1 rounded-full ${index % 2 === 0 ? 'bg-primary-deep/30' : 'bg-accent-warm/30'}`} />
        <p className="text-[9px] font-display font-black uppercase tracking-ultra text-text-muted">
          {game.categoria}
        </p>
      </div>
      <h4 className="font-display font-black text-lg text-text-primary leading-tight italic tracking-tight group-hover:text-primary-deep transition-colors">
        {game.titolo}
      </h4>
      <p className="text-text-muted font-body text-xs-tight leading-relaxed line-clamp-2 italic group-hover:text-text-primary transition-colors">
        {game.descrizione_metodo}
      </p>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between pt-5 mt-4 border-t border-border-subtle">
      <span className="text-[10px] font-display font-black text-text-muted/60 uppercase tracking-widest">
        {game.materiali_necessari.length} <span className="opacity-50">materiali</span>
      </span>
      <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 ${
        index % 2 === 0 ? 'text-primary-deep' : 'text-accent-warm'
      }`} aria-hidden="true">
        <span className="text-[10px] font-display font-black uppercase tracking-widest">Scopri</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </motion.div>
);
