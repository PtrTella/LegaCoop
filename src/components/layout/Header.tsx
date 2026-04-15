import { Layout, Compass, Shield, Users2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Module } from '../../types';
import { useAppContext } from '../../context/AppContext';

export const Header = ({ 
  view, 
  setView, 
}: { 
  view: string, 
  setView: (v: any) => void, 
  activeModule: Module | null 
}) => {
  const { state } = useAppContext();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'map', label: 'Accademia', icon: Compass },
    { id: 'simulation', label: 'Laboratorio', icon: Shield },
    { id: 'team', label: 'Networking', icon: Users2 },
  ];

  // Dynamic evolution metrics
  const currentLevel = Math.floor(state.maturityScore / 20) + 1;
  const currentXP = state.maturityScore * 10;
  const progressToNextLevel = (state.maturityScore % 20) * 5; // Scale to 100%

  return (
    <header className="fixed top-0 left-0 right-0 z-200 flex h-20 shrink-0 items-center justify-between bg-surface/80 px-4 md:px-8 shadow-sm backdrop-blur-2xl transition-all duration-500">
      <div className="flex items-center gap-3 md:gap-8 text-nowrap">
        {/* Branding */}
        <div className="flex cursor-pointer items-center" onClick={() => setView('dashboard')}>
          <motion.img 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src="/indicoo-logo.svg" 
            alt="Indicoo Logo" 
            className="h-10 md:h-11 w-auto object-contain" 
          />
        </div>

        {/* Global Navigation (Desktop Only) */}
        <nav className="hidden md:flex items-center rounded-full bg-primary/5 p-1.5 shadow-inner border border-primary/5">
          {menuItems.map((item) => {
            const isActive = view === item.id || 
              (item.id === 'map' && ['lesson', 'quiz', 'success'].includes(view)) ||
              (item.id === 'simulation' && ['roleplay', 'pitch'].includes(view));
            
            return (
              <motion.button
                key={item.id}
                layout
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 rounded-full px-3 md:px-4 py-2 transition-all duration-500 ${
                  isActive 
                    ? 'bg-gradient-brand text-white shadow-md shadow-primary/20' 
                    : 'text-primary/70 hover:text-primary'
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'opacity-80'}`} />
                <span className={`font-display text-xs-tight font-black uppercase tracking-wider ${isActive ? 'block' : 'hidden md:block'}`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Evolution Metrics (XP & Level) - Hidden on mobile, shown on tablet+ */}
        <div className="hidden items-center gap-4 rounded-full bg-primary/5 px-4 py-2 shadow-sm border border-primary/5 lg:flex">
           <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1.5">
                 <span className="font-display text-[9px] font-black uppercase leading-none tracking-widest text-primary/40">LVL</span>
                 <span className="font-display text-xs font-black leading-none text-primary">{currentLevel}</span>
              </div>
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-primary/10">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNextLevel}%` }}
                    className="h-full bg-primary shadow-[0_0_10px_rgba(159,135,243,0.5)]"
                 />
              </div>
           </div>
           <div className="h-4 w-px bg-primary/10" />
           <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-2.5 py-1">
              <Zap className="h-3.5 w-3.5 fill-primary text-primary" />
              <span className="font-display text-xs font-black uppercase tracking-tight text-primary text-nowrap">{currentXP} XP</span>
           </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
          <div className="hidden text-right sm:block">
            <p className="mb-0.5 font-display text-xs font-black leading-none text-primary">Pietro Tellarini</p>
            <p className="font-bold uppercase tracking-widest-plus text-primary/30 text-3xs">Founder</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center border-2 border-surface rounded-xl bg-gradient-brand font-display text-xs font-black text-white shadow-ambient shadow-primary/20">
            PT
          </div>
        </div>
      </div>
    </header>
  );
};

