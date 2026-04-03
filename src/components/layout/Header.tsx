import React from 'react';
import { ArrowLeft, Flame, Layout, Compass, Shield, Users2, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Module } from '../../types';
import { useAppContext } from '../../context/AppContext';

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
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between bg-surface/80 px-8 shadow-sm backdrop-blur-2xl transition-all duration-500">
      <div className="flex items-center gap-8">
        {/* Branding (Moved from Sidebar) */}
        <div className="flex cursor-pointer items-center gap-3" onClick={() => setView('dashboard')}>
          <div className="group relative flex h-8 w-8 -rotate-3 transform items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-container shadow-ambient shadow-primary/10">
             <div className="absolute inset-0 animate-pulse rounded-xl bg-white/20" />
             <span className="z-10 font-display text-base font-black text-white">L</span>
          </div>
          <h1 className="hidden font-display text-lg font-black italic tracking-tighter text-primary md:block">LegaCoop</h1>
        </div>

        {/* Global Navigation */}
        <nav className="flex items-center rounded-full bg-surface-container-low p-1 shadow-inner">
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
                className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-500 ${
                  isActive 
                    ? 'bg-linear-to-r from-primary to-primary-container text-white shadow-md shadow-primary/20' 
                    : 'text-primary/40 hover:text-primary'
                }`}
              >
                <item.icon className={`h-3.5 w-3.5 ${isActive ? 'text-tertiary' : ''}`} />
                <span className="font-display text-sm-alt font-black uppercase tracking-wider">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        {/* Evolution Metrics (XP & Level) - Centralized in App */}
        <div className="hidden items-center gap-4 rounded-full bg-surface-container-low px-4 py-2 shadow-sm lg:flex">
           <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1.5">
                 <span className="font-display text-3xs font-black uppercase leading-none tracking-widest text-primary/30">LVL</span>
                 <span className="font-display text-xs font-black leading-none text-secondary">{currentLevel}</span>
              </div>
              <div className="h-1 w-16 overflow-hidden rounded-full bg-surface-container-highest">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNextLevel}%` }}
                    className="h-full bg-linear-to-r from-secondary to-tertiary"
                 />
              </div>
           </div>
           <div className="h-4 w-px bg-primary/10" />
           <div className="flex items-center gap-2 rounded-lg bg-tertiary/20 px-2.5 py-1">
              <Zap className="h-3.5 w-3.5 fill-secondary text-secondary" />
              <span className="font-display text-xs-tight font-black uppercase tracking-tight text-secondary">{currentXP} XP</span>
           </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="mb-0.5 font-display text-xs font-black leading-none text-primary">Pietro Tellarini</p>
            <p className="font-bold uppercase tracking-widest-plus text-primary/30 text-3xs">Founder</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center border-2 border-surface rounded-xl bg-linear-to-br from-primary to-primary-container font-display text-xs font-black text-white shadow-ambient shadow-primary/20">
            PT
          </div>
        </div>
      </div>
    </header>
  );
};
