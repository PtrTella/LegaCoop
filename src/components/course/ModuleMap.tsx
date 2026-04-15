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

interface ModuleCardProps {
  module: any;
  index: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  onSelect: (id: number) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ 
  module, 
  index, 
  isUnlocked, 
  isCompleted, 
  isActive, 
  onSelect 
}) => {
  const Icon = getModuleIcon(index);

  // 3D Tilt Effect State
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isUnlocked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt
    const rX = ((y - centerY) / centerY) * -4;
    const rY = ((x - centerX) / centerX) * 4;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-0 md:pl-24"
    >
      {/* 3D Wrapped Card */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1000,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        whileHover={isUnlocked ? { scale: 1.01 } : {}}
        whileTap={isUnlocked ? { scale: 0.99 } : {}}
        onClick={() => isUnlocked && onSelect(index)}
        className={`glass-card group cursor-pointer relative overflow-hidden transition-all duration-300 p-5 rounded-3xl border-white/60 shadow-ambient ${
          !isUnlocked ? 'opacity-40 grayscale cursor-not-allowed' : ''
        } ${isActive ? 'ring-2 ring-accent/40 shadow-glow shadow-accent/10' : ''}`}
      >
        {/* Dynamic Shine Effect */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Background Decorative Icon (Floating Depth) */}
        <div 
          style={{ transform: 'translateZ(-20px)' }}
          className={`absolute -top-10 -right-10 p-6 opacity-[0.05] group-hover:opacity-[0.1] transform transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-12 ${
            isCompleted ? 'text-primary' : 'text-accent'
          }`}
        >
          <Icon size={200} />
        </div>

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              {/* Gradient Title: No Badge above */}
              <h3 className={`font-display font-black text-3xl sm:text-4xl tracking-tighter leading-none italic mb-1 transition-all duration-500 ${
                isUnlocked 
                  ? 'bg-linear-to-r from-primary to-accent bg-clip-text text-transparent' 
                  : 'text-text-muted/30'
              }`}>
                {module.title}
              </h3>

              {/* Enlarged Description: Compact Leading */}
              <p className="text-text-muted text-base sm:text-lg leading-snug max-w-2xl font-medium opacity-85">
                {module.description}
              </p>
            </div>

            <div style={{ transform: 'translateZ(30px)' }} className="shrink-0 pt-4 sm:pt-0">
              <motion.div 
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-gradient-brand text-white shadow-glow' 
                    : isActive
                    ? 'bg-accent text-white shadow-glow'
                    : 'bg-white/80 text-text-muted group-hover:bg-primary/10 group-hover:text-primary'
                }`}
              >
                {isCompleted ? (
                   <CheckCircle2 size={24} className="text-white" />
                ) : isActive ? (
                  <Play size={18} className="fill-current" />
                ) : (
                  <ChevronRight size={18} />
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Task Progress Tracking - Text-only Mission indicator */}
        {(isActive || isCompleted) && module.task && (
          <div className="mt-4 pt-4 border-t border-primary/5">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <span className={`font-display font-black text-xs uppercase tracking-ultra shrink-0 transition-colors duration-500 ${
                isActive ? 'text-accent' : 'text-primary'
              }`}>
                Mission
              </span>
              <span className="text-text-primary italic font-bold text-sm sm:text-base leading-tight">
                {module.task}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export const ModuleMap = ({ onSelectModule }: { onSelectModule: (id: number) => void }) => {
  const { state } = useAppContext();
  const modules = state.modules || [];

  return (
    <div className="space-y-12 py-2 mb-12">
      <SectionHeader 
        titleMain="Dall'idea"
        titleSuffix="all'impresa"
        description="Un viaggio strutturato in 7 fasi per trasformare la tua visione in una realtà cooperativa d'eccellenza."
      />

      <div className="grid grid-cols-1 gap-10 relative mt-20 pr-0 md:pr-4">
        {/* Dynamic Journey Ribbon - Visual Polish */}
        <div className="absolute left-11.75 top-0 bottom-0 w-1.5 bg-linear-to-b from-primary/30 via-accent/20 to-primary/0 rounded-full hidden md:block" />
        
        {modules.map((module, index) => {
          const isUnlocked = state.unlockedPhases.includes(index);
          const isCompleted = state.completedPhases.includes(index);
          const isActive = isUnlocked && !isCompleted;
          
          return (
            <ModuleCard 
              key={module.id}
              module={module}
              index={index}
              isUnlocked={isUnlocked}
              isCompleted={isCompleted}
              isActive={isActive}
              onSelect={onSelectModule}
            />
          );
        })}
      </div>
    </div>
  );
};

