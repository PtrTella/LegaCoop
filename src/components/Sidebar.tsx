import React from 'react';
import { Target, MapPin, Users } from 'lucide-react';

export const Sidebar = ({ view, setView }: { view: string, setView: (v: any) => void }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="h-20 flex items-center px-8 border-b border-slate-100">
        <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">indicoo.</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => setView('dashboard')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${view === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Target size={20} /> Dashboard
        </button>
        <button 
          onClick={() => setView('map')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${view === 'map' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <MapPin size={20} /> Percorso
        </button>
        <button 
          onClick={() => setView('team')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${view === 'team' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Users size={20} /> Team
        </button>
      </nav>
    </aside>
  );
};
