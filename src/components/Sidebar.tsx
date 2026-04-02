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
          onClick={() => setView('simulation')} 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${view === 'simulation' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16v0Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4v0Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg> Simulazioni
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
