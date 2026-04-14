import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, X, Sparkles, Zap, Users, GraduationCap } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: React.ElementType;
  target?: string; // CSS selector for spotlight
  view?: 'dashboard' | 'map' | 'networking' | 'simulation' | 'team';
}

interface GuidedTourProps {
  steps: Step[];
  onComplete: () => void;
  currentView: string;
  onNavigate: (view: any) => void;
}

export const GuidedTour = ({ steps, onComplete, currentView, onNavigate }: GuidedTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Sync view with step requirement if necessary
    const step = steps[currentStep];
    if (step.view && step.view !== currentView) {
      onNavigate(step.view);
    }
  }, [currentStep, steps, currentView, onNavigate]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dimmed Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
        onClick={onComplete}
      />

      {/* Tour Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative z-10 w-full max-w-md bg-white rounded-5xl shadow-2xl border border-primary/10 p-8 overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
             <div className="p-3 bg-primary/10 rounded-2xl">
               <Icon className="w-6 h-6 text-primary" />
             </div>
             <button 
               onClick={onComplete}
               className="p-2 hover:bg-surface-soft rounded-xl transition-all text-primary/20 hover:text-primary"
             >
               <X size={20} />
             </button>
          </div>

          <div className="space-y-4 mb-10">
            <p className="text-primary font-display font-black text-2xs uppercase tracking-mega">
              Passaggio {currentStep + 1} di {steps.length}
            </p>
            <h2 className="text-3xl font-display font-black text-primary tracking-tight leading-none italic">
              {step.title}
            </h2>
            <p className="text-primary/60 font-body text-sm leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-primary/5">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 font-display font-black text-2xs uppercase tracking-widest-plus transition-all ${
                currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-primary/40 hover:text-primary'
              }`}
            >
              <ChevronLeft size={16} /> Indietro
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-brand text-white rounded-xl font-display font-black text-2xs uppercase tracking-widest-plus flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
            >
              {currentStep === steps.length - 1 ? 'Fine' : 'Continua'} <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
          {steps.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === currentStep ? 'w-4 bg-primary' : 'w-1 bg-primary/20'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
