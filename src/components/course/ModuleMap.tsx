import React from 'react';
import { motion } from 'motion/react';
import { PieChart, CheckCircle2, Unlock, Lock, ChevronRight, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const ModuleMap = ({ onSelectModule }: { onSelectModule: (id: number) => void }) => {
  const { state } = useAppContext();
  const modules = state.modules || [];

  return (
    <div className="space-y-10 py-4">
      <div className="flex items-start justify-between">
        <div className="max-w-xl">
          <p className="mb-3 font-display text-xs-tight font-black uppercase tracking-mega text-secondary">Percorso di Studio</p>
          <h1 className="font-display text-3xl font-black italic tracking-tight text-primary">
            Dall'idea all'impresa <span className="not-italic tracking-tighter text-primary/30">— Percorso Accademia</span>
          </h1>
        </div>
        <div className="flex h-16 w-16 rotate-6 transform items-center justify-center rounded-[20px] bg-surface-container-low transition-transform hover:rotate-0">
          <PieChart className="h-8 w-8 text-primary/30" />
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
              className={`relative flex w-full flex-col ${isEven ? 'md:items-start' : 'md:items-end'} ${!isUnlocked ? 'grayscale-50 opacity-40' : ''}`}
            >
              {/* Connector Trace (Soft, not a line) */}
              <div className={`absolute top-1/2 -z-10 hidden h-24 w-24 rounded-full border-4 border-primary/5 md:block ${isEven ? '-left-12 rotate-45 border-r-0 border-b-0' : '-right-12 -rotate-45 border-l-0 border-t-0'}`} />

              <button 
                disabled={!isUnlocked}
                onClick={() => onSelectModule(module.id)}
                className={`group relative w-full max-w-xl rounded-4xl text-left p-6 transition-all duration-500
                  ${isUnlocked 
                    ? 'bg-surface-container-lowest shadow-ambient active:scale-[0.99] hover:scale-[1.01]' 
                    : 'cursor-not-allowed bg-surface-container-low shadow-none'
                  }`}
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className={`z-10 flex h-12 w-12 shrink-0 transform items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:rotate-6 ${
                    isCompleted ? 'bg-linear-to-br from-tertiary to-secondary' : isUnlocked ? 'bg-linear-to-br from-primary to-primary-container' : 'bg-surface-container-highest'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="h-6 w-6 text-white" /> : 
                     isUnlocked ? <Unlock className="h-5 w-5 text-white" /> : 
                     <Lock className="h-5 w-5 text-primary/20" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                       <h3 className="font-display text-xl font-black tracking-tight text-primary">{module.title}</h3>
                       {isUnlocked && <ChevronRight className="h-5 w-5 transform transition-transform text-secondary group-hover:translate-x-1.5" />}
                    </div>
                  </div>
                </div>

                <p className="pl-1 font-body text-sm leading-relaxed text-primary/60">{module.description}</p>
                
                {isUnlocked && !isCompleted && (
                  <div className="mt-5 flex w-fit items-center gap-3 rounded-full bg-surface-container-low px-4 py-2">
                    <Zap size={14} className="animate-pulse text-secondary" />
                    <span className="font-display text-2xs font-black uppercase tracking-widest-plus text-secondary">Obiettivo: {module.task}</span>
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
