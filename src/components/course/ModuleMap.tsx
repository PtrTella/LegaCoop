import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Lock, 
  Zap, 
  Play, 
  BookOpen, 
  Sparkles, 
  Layout, 
  Target, 
  Rocket, 
  Users, 
  Search,
  Book,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SectionHeader } from '../common/SectionHeader';

// --- DATA SAFE ICON MAPPING ---
const getModuleIcon = (id: number) => {
  switch (id) {
    case 0: return Sparkles;
    case 1: return Search;
    case 2: return Layout;
    case 3: return Target;
    case 4: return Users;
    case 5: return Zap;
    case 6: return Rocket;
    default: return Book;
  }
};

export const ModuleMap = ({ onSelectModule }: { onSelectModule: (id: number) => void }) => {
  const { state } = useAppContext();
  const modules = state.modules || [];

  return (
    <div className="space-y-8 py-2">
      <SectionHeader 
        titleMain="Dall'idea"
        titleSuffix="all'impresa"
        description="Un viaggio strutturato per trasformare la tua visione in una realtà cooperativa solida."
      />

      <div className="grid grid-cols-1 gap-8 relative mt-16">
        {/* Decorative background ribbon - Standardized */}
        <div className="absolute left-5.5 top-0 bottom-0 w-1 bg-primary/20 rounded-full hidden md:block" />
        
        {modules.map((module, index) => {
          const isUnlocked = state.unlockedPhases.includes(index);
          const isCompleted = state.completedPhases.includes(index);
          const isActive = isUnlocked && !isCompleted;
          const Icon = getModuleIcon(index);
          
          return (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-0 md:pl-20"
            >
              {/* Step indicator */}
              <div className="absolute left-2 top-8 z-10 hidden md:block">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-display font-black text-xs transition-all border-2 ${
                  isCompleted 
                    ? 'bg-primary text-white border-primary shadow-glow shadow-primary/20' 
                    : isActive
                    ? 'bg-accent text-white border-white scale-125 shadow-2xl animate-pulse'
                    : 'bg-white/70 text-text-muted border-primary/10'
                }`}>
                  {index + 1}
                </div>
              </div>

              {/* Module Card - Restoration of description & Light aesthetic */}
              <motion.div
                whileHover={isUnlocked ? { scale: 1.005 } : {}}
                onClick={() => isUnlocked && onSelectModule(index)}
                className={`box-testo group cursor-pointer relative overflow-hidden transition-all duration-500 border-white/80 bg-white/70 shadow-soft backdrop-blur-xl ${
                  !isUnlocked ? 'opacity-50 grayscale cursor-not-allowed border-dashed' : ''
                } ${isActive ? 'ring-2 ring-accent/30 border-white shadow-glow shadow-accent/20' : ''}`}
              >
                {/* Large Background Icon for Depth */}
                <div className={`absolute -top-4 -right-4 p-6 opacity-[0.04] transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-700 ${isCompleted ? 'text-primary' : 'text-accent'}`}>
                  <Icon size={160} />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-start gap-6 flex-1 min-w-0">
                      {/* Phase Icon Hook */}
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-transform group-hover:rotate-3 shrink-0 ${
                        isCompleted 
                          ? 'bg-primary/10 border-primary/20 text-primary' 
                          : isActive
                          ? 'bg-accent text-white border-white/40'
                          : 'bg-white/70 border-white text-text-muted'
                      }`}>
                        {isUnlocked ? <Icon className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header labels */}
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-[10px] font-display font-black uppercase tracking-mega text-primary/60">Fase {index + 1}</span>
                          {isCompleted && (
                            <div className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-display font-black uppercase rounded-full border border-primary/20">
                              Completato
                            </div>
                          )}
                          {isActive && (
                            <div className="px-2 py-0.5 bg-accent/10 text-accent text-[8px] font-display font-black uppercase rounded-full border border-accent/20">
                              In Corso
                            </div>
                          )}
                        </div>

                        {/* Title & RESTORED DESCRIPTION */}
                        <h3 className="font-display font-black text-2xl text-text-primary tracking-tight leading-none mb-3 italic">
                          {module.title}
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed max-w-2xl">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 self-end md:self-start">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isActive ? 'bg-accent text-white shadow-lg' : 'bg-white/70 text-text-muted group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        {isActive ? <Play className="w-6 h-6 fill-current" /> : <ChevronRight className="w-6 h-6" />}
                      </div>
                    </div>
                  </div>

                  {/* Task Objective - LAB Style Style */}
                  {(isActive || isCompleted) && module.task && (
                    <div className="pt-6 border-t border-primary/5 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-text-muted/60">
                             Obiettivo: <span className="text-text-primary italic normal-case font-bold">{module.task}</span>
                          </span>
                       </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
