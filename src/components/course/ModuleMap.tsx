import React from 'react';
import { motion } from 'motion/react';
import { PieChart, CheckCircle2, Unlock, Lock, ChevronRight, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SectionHeader } from '../common/SectionHeader';

export const ModuleMap = ({ onSelectModule }: { onSelectModule: (id: number) => void }) => {
  const { state } = useAppContext();
  const modules = state.modules || [];

  return (
    <div className="space-y-8 py-2">
      <SectionHeader 
        preTitle="Percorso di Studio"
        titleMain="Dall'idea"
        titleSuffix="all'impresa"
        description="Un viaggio strutturato per trasformare la tua visione in una realtà cooperativa solida."
      />

      <div className="grid grid-cols-1 gap-5">
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
              className={`relative flex w-full flex-col ${isEven ? 'md:items-start' : 'md:items-end'} ${!isUnlocked ? 'grayscale-50 opacity-40' : ''}`}
            >
              <button 
                disabled={!isUnlocked}
                onClick={() => onSelectModule(module.id)}
                className={`group relative w-full max-w-xl rounded-4xl text-left p-5 transition-all duration-500
                  ${isUnlocked 
                    ? 'bg-surface-container-lowest shadow-ambient active:scale-[0.99] hover:scale-[1.01]' 
                    : 'cursor-not-allowed bg-surface-container-low shadow-none'
                  }`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`z-10 flex h-11 w-11 shrink-0 transform items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:rotate-6 ${
                    isCompleted ? 'bg-gradient-accent' : isUnlocked ? 'bg-gradient-brand' : 'bg-surface-container-highest'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5 text-white" /> : 
                     isUnlocked ? <Unlock className="h-4.5 w-4.5 text-white" /> : 
                     <Lock className="h-4.5 w-4.5 text-primary/20" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                       <h3 className="font-display text-xl font-black tracking-tight text-primary italic transition-colors group-hover:text-secondary">{module.title}</h3>
                       {isUnlocked && <ChevronRight className="h-4.5 w-4.5 transform transition-transform text-secondary group-hover:translate-x-1.5" />}
                    </div>
                  </div>
                </div>

                <p className="pl-1 font-body text-xs leading-relaxed text-primary/60">{module.description}</p>
                
                {isUnlocked && !isCompleted && (
                  <div className="mt-4 flex w-fit items-center gap-2.5 rounded-full bg-surface-container-low px-3.5 py-1.5">
                    <Zap size={12} className="animate-pulse text-secondary" />
                    <span className="font-display text-[9px] font-black uppercase tracking-widest-plus text-secondary">Obiettivo: {module.task}</span>
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
