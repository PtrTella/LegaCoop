import React from 'react';
import { ArrowLeft, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { Module } from '../types';

export const Header = ({ 
  view, 
  setView, 
  activeModule 
}: { 
  view: string, 
  setView: (v: any) => void, 
  activeModule: Module | null 
}) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        {view !== 'dashboard' && view !== 'map' && view !== 'team' && view !== 'simulation' && (
          <button 
            onClick={() => setView(view === 'pitch' || view === 'roleplay' ? 'simulation' : 'map')} 
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl font-bold text-slate-800 capitalize">
          {view === 'dashboard' ? 'Dashboard Maturità' : 
           view === 'map' ? 'Percorso Formativo' : 
           view === 'team' ? 'Il Tuo Team' : 
           activeModule?.title}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900">Pietro Tellarini</p>
          <p className="text-xs text-slate-500">Founder</p>
        </div>
        
        {/* Streak Indicator (Gamification) */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 cursor-help"
          title="Fiamme: Giorni consecutivi di attività"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [-5, 5, -5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          </motion.div>
          <span className="font-black text-orange-600 text-sm">12</span>
        </motion.div>

        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold ml-2">
          PT
        </div>
      </div>
    </header>
  );
};
