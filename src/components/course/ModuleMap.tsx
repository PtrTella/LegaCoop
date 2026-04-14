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

      <div className="grid grid-cols-1 gap-8 relative">
        {/* Decorative background ribbon */}
        <div className="absolute left-[22px] top-0 bottom-0 w-1 bg-primary-deep/10 rounded-full hidden md:block" />
        
        {modules.map((module, index) => {
          const isUnlocked = state.unlockedPhases.includes(index);
          const isCompleted = state.completedPhases.includes(index);
          const isActive = isUnlocked && !isCompleted;
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex w-full flex-col ${isEven ? 'md:items-start' : 'md:items-end'} ${!isUnlocked ? 'grayscale opacity-40' : ''}`}
            >
              <button 
                disabled={!isUnlocked}
                onClick={() => onSelectModule(module.id)}
                className={`group relative w-full max-w-xl rounded-[2rem] text-left p-8 transition-all duration-500 border
                  ${isActive 
                    ? 'bg-white border-accent-warm/30 shadow-glow shadow-accent-warm/20 scale-[1.01]' 
                    : isUnlocked 
                      ? 'bg-white border-border-subtle shadow-soft hover:border-primary-deep/30 active:scale-[0.99] hover:scale-[1.005]' 
                      : 'bg-surface-container-low border-transparent'
                  }`}
              >
                <div className="mb-6 flex items-center gap-6">
                  <div className={`z-10 flex h-14 w-14 shrink-0 transform items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:rotate-6 ${
                    isCompleted 
                    ? 'bg-primary-deep/10 text-primary-deep border border-primary-deep/20' 
                    : isActive 
                      ? 'bg-gradient-warm text-white shadow-glow shadow-accent-warm/30' 
                      : 'bg-surface-container-highest text-text-muted'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : 
                     isActive ? <Zap className="h-6 w-6 fill-current" /> : 
                     <Lock className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                       <h3 className="font-display text-xl font-black tracking-tight text-text-primary italic transition-colors group-hover:text-primary-deep">
                         {module.title}
                       </h3>
                       {isUnlocked && (
                         <ChevronRight className={`h-5 w-5 transform transition-transform ${
                           isActive ? 'text-accent-warm' : 'text-primary-deep/40 group-hover:translate-x-1.5'
                         }`} />
                       )}
                    </div>
                    <p className={`text-[10px] font-display font-black uppercase tracking-mega mt-1 ${
                      isActive ? 'text-accent-warm' : 'text-text-muted'
                    }`}>
                      Fase {index + 1}
                    </p>
                  </div>
                </div>

                <p className="font-body text-sm leading-relaxed italic text-text-muted group-hover:text-text-primary transition-colors">
                  {module.description}
                </p>
                
                {isActive && (
                  <div className="mt-8 flex w-full items-center justify-between border-t border-border-subtle pt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
                      <span className="font-display text-[10px] font-black uppercase tracking-widest-plus text-text-primary leading-tight">
                        Obiettivo: <span className="text-text-muted italic">{module.task}</span>
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-accent-warm/10 border border-accent-warm/20 rounded-lg text-[9px] font-display font-black uppercase tracking-ultra text-accent-warm">
                      IN CORSO
                    </div>
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
