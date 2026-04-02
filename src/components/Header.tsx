import React from 'react';
import { ArrowLeft } from 'lucide-react';
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
        {view !== 'dashboard' && view !== 'map' && view !== 'team' && (
          <button 
            onClick={() => setView('map')} 
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl font-bold text-slate-800 capitalize">
          {view === 'dashboard' ? 'Dashboard Maturità' : 
           view === 'map' ? 'Percorso Formativo' : 
           view === 'team' ? 'Il Tuo Team' : 
           view === 'swot' ? 'Analisi SWOT AI' :
           activeModule?.title}
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-900">Pietro Tellarini</p>
          <p className="text-xs text-slate-500">Founder</p>
        </div>
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
          PT
        </div>
      </div>
    </header>
  );
};
