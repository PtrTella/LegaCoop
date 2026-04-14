import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Minigame } from './types';

export interface MinigameCardProps {
  game: Minigame;
  icon: LucideIcon;
  index: number;
  onClick: () => void;
}

export const MinigameCard: React.FC<MinigameCardProps> = ({ game, icon: Icon, index, onClick }) => {
  // Static theme mapping to ensure Tailwind compiles all classes
  const theme = [
    { 
      border: 'hover:border-primary/30', 
      text: 'text-primary', 
      bg: 'bg-primary/5', 
      dot: 'bg-primary',
      iconBg: 'group-hover:bg-primary',
      glow: 'shadow-primary/40' 
    },
    { 
      border: 'hover:border-accent/30', 
      text: 'text-accent', 
      bg: 'bg-accent/5', 
      dot: 'bg-accent',
      iconBg: 'group-hover:bg-accent',
      glow: 'shadow-accent/40' 
    },
    { 
      border: 'hover:border-accent-warm/30', 
      text: 'text-accent-warm', 
      bg: 'bg-accent-warm/5', 
      dot: 'bg-accent-warm',
      iconBg: 'group-hover:bg-accent-warm',
      glow: 'shadow-accent-warm/40' 
    }
  ][index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={onClick}
      className={`box-testo p-7 cursor-pointer group relative overflow-hidden bg-white/70 backdrop-blur-2xl transition-all duration-500 shadow-sm hover:shadow-2xl ${theme.border}`}
    >
      {/* Ghost icon decor */}
      <div className={`absolute -top-4 -right-4 opacity-[0.03] p-4 transform group-hover:scale-110 transition-transform ${theme.text}`} aria-hidden="true">
        <Icon size={140} />
      </div>

      {/* Icon badge */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border mb-8 border-transparent ${theme.bg} ${theme.text} ${theme.iconBg} group-hover:text-white group-hover:shadow-glow group-hover:${theme.glow}`}>
        <Icon className="w-7 h-7" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className={`w-1.5 h-1.5 rounded-full ${theme.dot} shadow-glow ${theme.glow}`} />
          <p className="text-[10px] font-display font-black uppercase tracking-mega text-text-muted/60">
            {game.categoria || "Laboratorio"}
          </p>
        </div>
        <h4 className="font-display font-black text-2xl text-text-primary leading-[1.1] italic tracking-tight group-hover:text-primary transition-colors uppercase">
          {game.titolo}
        </h4>
        <p className="text-text-muted font-body text-sm leading-relaxed line-clamp-2 italic group-hover:text-text-primary transition-colors opacity-80">
          "{game.descrizione_metodo}"
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/40">
        <div className="flex items-center gap-2">
           <Zap className={`w-3.5 h-3.5 ${theme.text} opacity-30`} />
           <span className="text-[10px] font-display font-black text-text-muted/40 uppercase tracking-widest">
             {game.materiali_necessari.length} <span className="opacity-60 italic">Risorse</span>
           </span>
        </div>
        <div className={`flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 ${theme.text}`} aria-hidden="true">
          <span className="text-[10px] font-display font-black uppercase tracking-mega">Esplora</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};
