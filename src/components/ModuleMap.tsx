import React from 'react';
import { motion } from 'motion/react';
import { PieChart, CheckCircle2, Unlock, Lock, ChevronRight, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MODULES } from '../data/modules';

export const ModuleMap = ({ onSelectModule }: { onSelectModule: (id: number) => void }) => {
  const { state } = useAppContext();

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center max-w-3xl">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Il Percorso</h1>
          <p className="text-lg text-slate-500 mt-2">Dall'idea all'impresa cooperativa.</p>
        </div>
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
          <PieChart className="text-slate-400 w-8 h-8" />
        </div>
      </div>

      <div className="relative max-w-3xl">
        <div className="absolute left-12 top-0 bottom-0 w-1 bg-slate-200 rounded-full" />
        
        <div className="space-y-12 relative">
          {MODULES.map((module, index) => {
            const isUnlocked = state.unlockedPhases.includes(index);
            const isCompleted = state.completedPhases.includes(index);
            
            return (
              <motion.div 
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-8 ${!isUnlocked ? 'opacity-50' : ''}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 z-10 shadow-lg ml-5 ${
                  isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-indigo-600' : 'bg-slate-300'
                }`}>
                  {isCompleted ? <CheckCircle2 className="text-white w-8 h-8" /> : 
                   isUnlocked ? <Unlock className="text-white w-6 h-6" /> : 
                   <Lock className="text-white w-6 h-6" />}
                </div>
                
                <button 
                  disabled={!isUnlocked}
                  onClick={() => onSelectModule(module.id)}
                  className={`flex-1 text-left p-8 rounded-[32px] transition-all border-2 ${
                    isUnlocked 
                      ? 'bg-white border-indigo-100 shadow-sm hover:border-indigo-300 hover:shadow-md active:scale-[0.98]' 
                      : 'bg-slate-50 border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-2xl text-slate-800">{module.title}</h3>
                    {isUnlocked && <ChevronRight className="text-indigo-400 w-6 h-6" />}
                  </div>
                  <p className="text-base text-slate-500 mt-2 leading-relaxed">{module.description}</p>
                  {isUnlocked && !isCompleted && (
                    <div className="mt-4 flex items-center gap-2">
                      <Zap size={16} className="text-indigo-600" />
                      <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">Task: {module.task}</span>
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
