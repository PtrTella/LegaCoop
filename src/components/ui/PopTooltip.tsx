import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface PopTooltipProps {
  word: string;
  definition: string;
}

export const PopTooltip = ({ word, definition }: PopTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Capture absolute page coordinates once
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <span className="relative inline-block mx-0.5">
      <button 
        ref={triggerRef}
        onClick={handleToggle}
        className="text-primary font-display font-black border-b-2 border-tertiary/30 cursor-help hover:text-primary hover:border-primary transition-all duration-300 italic"
      >
        {word}
      </button>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Invisible backdrop to close on click outside - covers entire body */}
              <div 
                className="absolute inset-0 z-2000 cursor-default" 
                style={{ height: `${Math.max(document.documentElement.scrollHeight, window.innerHeight)}px` }}
                onClick={() => setIsOpen(false)} 
              />
              
              {/* Wrapper for positioning - absolute to follow scroll */}
              <div 
                style={{ 
                  position: 'absolute',
                  top: coords.top - 12, 
                  left: isMobile ? '50%' : coords.left + (coords.width / 2),
                  width: isMobile ? '90vw' : '280px',
                  transform: 'translate(-50%, -100%)',
                  zIndex: 2001
                }}
                className="pointer-events-none"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="p-5 bg-white shadow-2xl border border-primary/10 text-left rounded-2xl pointer-events-auto"
                >
                  <div className="flex flex-col gap-3">
                    <header className="flex items-center justify-between border-b border-primary/5 pb-2">
                      <p className="text-[10px] font-display font-black uppercase tracking-mega text-primary">Glossario</p>
                      <button onClick={() => setIsOpen(false)} className="text-primary/40 hover:text-primary transition-colors p-1">
                        <X size={16} />
                      </button>
                    </header>
                    <p className="text-base sm:text-sm text-text-primary leading-relaxed font-body font-medium italic">
                      "{definition}"
                    </p>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </span>
  );
};
