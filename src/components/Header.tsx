import React from 'react';
import { ArrowLeft, Flame, Layout, Compass, Shield, Users2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Module } from '../types';
import { useAppContext } from '../context/AppContext';

export const Header = ({ 
  view, 
  setView, 
  activeModule 
}: { 
  view: string, 
  setView: (v: any) => void, 
  activeModule: Module | null 
}) => {
  const { state } = useAppContext();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Layout },
    { id: 'map', label: 'Accademia', icon: Compass },
    { id: 'simulation', label: 'Simulazioni', icon: Shield },
    { id: 'team', label: 'Team', icon: Users2 },
  ];

  // Dynamic evolution metrics
  const currentLevel = Math.floor(state.maturityScore / 20) + 1;
  const currentXP = state.maturityScore * 10;
  const progressToNextLevel = (state.maturityScore % 20) * 5; // Scale to 100%

  return (
    <header className="h-20 bg-surface/80 backdrop-blur-[32px] sticky top-0 z-40 flex items-center justify-between px-8 shrink-0 shadow-sm transition-all duration-500">
      <div className="flex items-center gap-8">
        {/* Branding (Moved from Sidebar) */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center shadow-ambient shadow-primary/10 transform -rotate-3 group relative">
             <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
             <span className="font-display font-black text-white text-base z-10">L</span>
          </div>
          <h1 className="text-lg font-display font-black text-primary tracking-tighter italic hidden md:block">LegaCoop</h1>
        </div>

        {/* Global Navigation */}
        <nav className="flex items-center bg-surface-container-low p-1 rounded-full shadow-inner">
          {menuItems.map((item) => {
            const isActive = view === item.id || 
              (item.id === 'map' && ['lesson', 'quiz', 'success'].includes(view)) ||
              (item.id === 'simulation' && ['roleplay', 'pitch'].includes(view));
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setView(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-md shadow-primary/20' 
                    : 'text-primary/40 hover:text-primary'
                }`}
              >
                <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-tertiary' : ''}`} />
                <span className="font-display font-black text-[11px] uppercase tracking-wider">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Evolution Metrics (XP & Level) - Centralized in App */}
        <div className="hidden lg:flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-full shadow-sm">
           <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1.5">
                 <span className="text-[9px] text-primary/30 font-display font-black uppercase tracking-widest leading-none">LVL</span>
                 <span className="text-xs font-display font-black text-secondary leading-none">{currentLevel}</span>
              </div>
              <div className="w-16 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNextLevel}%` }}
                    className="h-full bg-gradient-to-r from-secondary to-tertiary"
                 />
              </div>
           </div>
           <div className="h-4 w-px bg-primary/10" />
           <div className="flex items-center gap-2 bg-tertiary/20 px-2.5 py-1 rounded-lg">
              <Zap className="w-3.5 h-3.5 text-secondary fill-secondary" />
              <span className="text-[10px] font-display font-black text-secondary uppercase tracking-tight">{currentXP} XP</span>
           </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-display font-black text-primary leading-none mb-0.5">Pietro Tellarini</p>
            <p className="text-[8px] text-primary/30 uppercase tracking-[0.2em] font-bold">Founder</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center text-white font-display font-black text-xs shadow-ambient shadow-primary/20 border-2 border-surface">
            PT
          </div>
        </div>
      </div>
    </header>
  );
};
