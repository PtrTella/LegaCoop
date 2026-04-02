import React from 'react';
import { PlayCircle, ShieldAlert, ChevronRight } from 'lucide-react';

export const SimulationHub = ({ onSelect }: { onSelect: (simType: 'governance' | 'pitch') => void }) => {
  return (
    <div className="space-y-8 h-full flex flex-col justify-center max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-4xl font-black text-slate-800">Area Simulazioni</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Metti alla prova le tue competenze fuori dal percorso guidato. Affronta scenari realistici e difendi la tua idea cooperativa dalle sfide del mercato.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Governance Simulator Card */}
        <div 
          onClick={() => onSelect('governance')}
          className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlayCircle className="text-blue-600 w-8 h-8" />
          </div>
          <div>
            <h3 className="font-black text-2xl text-slate-800 mb-2">Simulatore Governance</h3>
            <p className="text-slate-500">
              Impara a gestire il potere, le decisioni critiche e il bilanciamento tra investitori esterni e soci fondatori.
            </p>
          </div>
          <button className="w-full py-3 bg-slate-50 rounded-xl font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center gap-2">
            Avvia Simulazione <ChevronRight size={18} />
          </button>
        </div>

        {/* Pitch Battle Card (Boss Fight) */}
        <div 
          onClick={() => onSelect('pitch')}
          className="bg-slate-900 p-8 rounded-[32px] shadow-md border border-slate-800 space-y-6 hover:shadow-2xl hover:shadow-red-900/20 hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldAlert size={120} className="text-red-500" />
          </div>
          <div className="w-16 h-16 bg-red-900/50 rounded-2xl flex items-center justify-center border border-red-500/30 group-hover:scale-110 transition-transform relative z-10">
            <ShieldAlert className="text-red-400 w-8 h-8" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-black text-2xl text-white">Pitch Battle</h3>
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-black uppercase rounded">Boss Fight</span>
            </div>
            <p className="text-slate-400">
              Usa tutto ciò che hai imparato per difendere la tua idea cooperativa contro un investitore cinico generato dall'AI. Riuscirai a non piegarti alle logiche del profitto a tutti i costi?
            </p>
          </div>
          <button className="relative z-10 w-full py-3 bg-red-500 text-white rounded-xl font-black group-hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
            Sfida l'Investitore <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
