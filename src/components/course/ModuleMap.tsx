import React from 'react';
import { motion } from 'motion/react';
import { PieChart, CheckCircle2, Unlock, Lock, ChevronRight, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const ModuleMap = ({ onSelectModule }: { onSelectModule: (id: number) => void }) => {
  const { state } = useAppContext();
  const modules = state.modules || [];

  return (
    <div className="space-y-10 py-4">
      <div className="flex justify-between items-start">
        <div className="max-w-xl">
          <p className="text-secondary font-display font-black text-[10px] uppercase tracking-[0.4em] mb-3">Percorso di Studio</p>
          <h1 className="text-3xl font-display font-black text-primary tracking-tight leading-tight italic">
            Dall'idea all'impresa <span className="text-primary/30 not-italic tracking-tighter">— Percorso Accademia</span>
          </h1>
        </div>
        <div className="w-16 h-16 bg-surface-container-low rounded-3xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform">
          <PieChart className="text-primary/30 w-8 h-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {modules.map((module, index) => {
          const isUnlocked = state.unlockedPhases.includes(index);
          const isCompleted = state.completedPhases.includes(index);
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} w-full relative ${!isUnlocked ? 'opacity-40 grayscale-50' : ''}`}
            >
              {/* Connector Trace (Soft, not a line) */}
              <div className={`hidden md:block absolute top-1/2 w-24 h-24 border-4 border-primary/5 rounded-full -z-10 ${isEven ? '-left-12 rotate-45 border-r-0 border-b-0' : '-right-12 -rotate-45 border-l-0 border-t-0'}`} />

              <button 
                disabled={!isUnlocked}
                onClick={() => onSelectModule(module.id)}
                className={`w-full max-w-xl text-left p-6 rounded-4xl transition-all duration-500 relative group
                  ${isUnlocked 
                    ? 'bg-surface-container-lowest shadow-ambient hover:scale-[1.01] active:scale-[0.99]' 
                    : 'bg-surface-container-low cursor-not-allowed shadow-none'
                  }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-3xl flex items-center justify-center shrink-0 z-10 shadow-lg transform group-hover:rotate-6 transition-transform ${
                    isCompleted ? 'bg-gradient-to-br from-tertiary to-secondary' : isUnlocked ? 'bg-gradient-to-br from-primary to-primary-container' : 'bg-surface-container-highest'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="text-white w-6 h-6" /> : 
                     isUnlocked ? <Unlock className="text-white w-5 h-5" /> : 
                     <Lock className="text-primary/20 w-5 h-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                       <h3 className="font-display font-black text-xl text-primary tracking-tight">{module.title}</h3>
                       {isUnlocked && <ChevronRight className="text-secondary w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" />}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-primary/60 font-body leading-relaxed pl-1">{module.description}</p>
                
                {isUnlocked && !isCompleted && (
                  <div className="mt-5 flex items-center gap-3 bg-surface-container-low w-fit px-4 py-2 rounded-full">
                    <Zap size={14} className="text-secondary animate-pulse" />
                    <span className="text-[9px] font-display font-black uppercase text-secondary tracking-[0.2em]">Obiettivo: {module.task}</span>
                  </div>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
