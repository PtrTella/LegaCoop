import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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
          <>
            {/* Backdrop to close on click outside */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-white shadow-glow shadow-primary/10 z-50 border border-primary/10 text-left pointer-events-auto rounded-2xl"
            >
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-display font-black uppercase tracking-mega text-primary/60">Glossario</p>
                <p className="text-sm text-text-primary leading-relaxed font-body font-medium italic">
                  "{definition}"
                </p>
              </div>
              
              {/* Tip - Solid White */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-primary/10" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
};
