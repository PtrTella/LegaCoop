import React from 'react';
import { Layout, Compass, Shield, Users2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileTabNavigationProps {
  view: string;
  setView: (view: any) => void;
}

export const MobileTabNavigation = ({ view, setView }: MobileTabNavigationProps) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Layout },
    { id: 'map', label: 'Accademia', icon: Compass },
    { id: 'simulation', label: 'Lab', icon: Shield },
    { id: 'team', label: 'Network', icon: Users2 },
    { id: 'tutor', label: 'Tutor', icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-210 md:hidden">
      <div className="flex items-center justify-around p-2 pb-[env(safe-area-inset-bottom,1.5rem)] rounded-t-5xl glass-card border-white/60 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
        {tabs.map((tab) => {
          const isActive = view === tab.id || 
            (tab.id === 'map' && ['lesson', 'quiz', 'success'].includes(view)) ||
            (tab.id === 'simulation' && ['roleplay', 'pitch'].includes(view));
          
          return (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className="relative flex flex-col items-center justify-center w-16 h-16 transition-all duration-300 rounded-2xl"
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-2 inset-y-1 bg-gradient-brand rounded-2xl shadow-lg shadow-primary/30"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              
              <tab.icon 
                className={`relative z-10 w-6 h-6 transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-primary/50'
                }`} 
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
