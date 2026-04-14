import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

interface PopTooltipProps {
  word: string;
  definition: string;
}

export const PopTooltip = ({ word, definition }: PopTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block mx-0.5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-primary font-display font-black border-b-2 border-tertiary/30 cursor-help hover:text-primary hover:border-primary transition-all duration-300 italic"
      >
        {word}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 p-5 bg-surface/90 backdrop-blur-[24px] rounded-2xl shadow-ambient z-50 overflow-hidden"
          >
            {/* Ambient Glow behind content */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col gap-3">
              <p className="text-2xs font-display font-black uppercase tracking-widest-plus text-primary">Glossario</p>
              <p className="text-sm text-primary/70 leading-relaxed font-body font-medium italic">"{definition}"</p>
            </div>
            
            {/* The Tip (Frosted) */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-surface/90 backdrop-blur-[24px] rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
