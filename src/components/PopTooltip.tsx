import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

export const PopTooltip = ({ word, definition }: { word: string; definition: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-indigo-600 font-bold underline decoration-dotted cursor-help hover:text-indigo-700 transition-colors"
      >
        {word}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-5 bg-white rounded-2xl shadow-2xl border border-indigo-100 z-50"
          >
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">Glossario Pop</p>
                <p className="text-sm text-slate-700 leading-relaxed">{definition}</p>
              </div>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
