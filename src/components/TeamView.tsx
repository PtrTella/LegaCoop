import React from 'react';
import { Users, CheckCircle2, Zap } from 'lucide-react';

export const TeamView = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900">Il Tuo Team</h1>
        <p className="text-lg text-slate-500">La forza della cooperazione è nelle persone.</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 flex items-center gap-6">
          <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
            <img src="https://picsum.photos/seed/user1/150/150" alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-black text-2xl text-slate-800">Tu (Founder)</h4>
            <p className="text-slate-500">Maturità: 65%</p>
          </div>
          <div className="ml-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-green-500 w-6 h-6" />
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-[32px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center space-y-4 py-12 hover:bg-slate-100 transition-colors cursor-pointer">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Users className="text-slate-400 w-8 h-8" />
          </div>
          <div>
            <h4 className="font-black text-xl text-slate-500">Cerca Co-Founder</h4>
            <p className="text-xs text-slate-400 uppercase font-bold mt-1">Matchmaking Attivo</p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-8 rounded-[32px] border border-indigo-100 space-y-4 max-w-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
            <Zap className="text-white w-6 h-6" />
          </div>
          <h4 className="font-black text-xl text-indigo-900">Consiglio dell'AI</h4>
        </div>
        <p className="text-lg text-indigo-800 leading-relaxed">
          "Per la tua idea di cooperativa energetica, ti consigliamo di cercare un profilo con competenze tecniche in ingegneria o gestione ambientale."
        </p>
      </div>
    </div>
  );
};
