import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, Sparkles, Zap, Users, GraduationCap, Check } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
  target?: string; // CSS selector for spotlight
  view?: 'dashboard' | 'map' | 'networking' | 'simulation' | 'team';
}

export const GuidedTour = ({ steps, onComplete }: { steps: Step[]; onComplete: () => void }) => {
  // We only show the first step of the contextual tour for this view
  const step = steps[0];

  // Block body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!step) return null;
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto pointer-events-none">
      {/* Visual Overlay: Full-page blur & color tint (Behind Nav Bars) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primary/15 backdrop-blur-md pointer-events-auto"
        onClick={onComplete}
      />

      {/* Intro Card: High-contrast content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-sm bg-white rounded-5xl shadow-2xl border border-primary/10 p-8 overflow-hidden pointer-events-auto"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
             <div className="p-3 bg-gradient-brand rounded-2xl shadow-lg shadow-primary/20">
               <Icon className="w-6 h-6 text-white" />
             </div>
             <button 
               onClick={onComplete}
               className="p-2 hover:bg-surface-soft rounded-xl transition-all text-primary/20 hover:text-primary active:scale-95"
             >
               <X size={20} />
             </button>
          </div>

          <div className="space-y-3 mb-8">
            <h2 className="text-2xl font-display font-black text-primary tracking-tight leading-none italic">
              {step.title}
            </h2>
            <p className="text-primary/60 font-body text-sm leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="pt-6 border-t border-primary/5 flex justify-end">
            <button
              onClick={onComplete}
              className="px-8 py-4 bg-gradient-brand text-white rounded-2xl font-display font-black text-[10px] uppercase tracking-widest-plus flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-glow active:scale-95 transition-all"
            >
              Capito <Check className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
