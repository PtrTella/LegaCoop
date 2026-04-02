import React from 'react';
import { TrendingUp, Zap, Users, Trophy, MapPin, Calendar, ChevronRight, Award, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';
import { MODULES } from '../data/modules';

export const MaturityDashboard = () => {
  const { state } = useAppContext();
  
  const stats = [
    { label: "Maturità", value: `${state.maturityScore}%`, icon: TrendingUp, color: "text-indigo-500" },
    { label: "Moduli", value: `${state.completedPhases.length}/6`, icon: Zap, color: "text-blue-500" },
    { label: "Team", value: state.userRole === 'founder' ? "Pronto" : "In cerca", icon: Users, color: "text-green-500" },
  ];

  const nextModule = MODULES.find((_, i) => !state.completedPhases.includes(i));

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy size={160} />
        </div>
        <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em] mb-3">Dashboard Maturità</p>
        <h2 className="text-4xl font-black mb-10">La tua idea sta crescendo.</h2>
        
        <div className="grid grid-cols-3 gap-6 max-w-2xl">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <stat.icon className={`${stat.color} w-6 h-6`} />
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-xs text-slate-400 uppercase font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GAMIFICATION: XP & LEADERBOARD BLOCK */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
              <Star className="text-yellow-500 w-6 h-6 fill-yellow-500" />
            </div>
            <div>
              <h3 className="font-black text-xl text-slate-800">450 XP</h3>
              <p className="text-sm text-slate-500 font-medium">Livello 3: Startupper Cooperativo</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full">
              Top 40% nella tua regione
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Progresso attuale</span>
            <span>Mancano 50 XP al Livello 4</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "90%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            />
          </div>
          <p className="text-xs text-slate-500 italic mt-2">
            "Il tuo punteggio di maturità sulla Finanza è più alto del 60% degli startupper!"
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition-shadow">
          <MapPin className="text-indigo-500 w-8 h-8" />
          <h3 className="font-black text-xl text-slate-800">Matchmaking</h3>
          <p className="text-sm text-slate-500">Trova il referente Legacoop più vicino a te.</p>
          <button className="text-xs font-black uppercase text-indigo-600 flex items-center gap-1 hover:text-indigo-700">
            Prenota Call <ChevronRight size={16} />
          </button>
        </div>
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 space-y-4 hover:shadow-md transition-shadow">
          <Calendar className="text-blue-500 w-8 h-8" />
          <h3 className="font-black text-xl text-slate-800">Shadowing</h3>
          <p className="text-sm text-slate-500">Passa un giorno in una vera cooperativa.</p>
          <button className="text-xs font-black uppercase text-blue-600 flex items-center gap-1 hover:text-blue-700">
            Sblocca Ticket <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {nextModule && (
        <div className="bg-indigo-50 p-8 rounded-[32px] border border-indigo-100 flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
            <Award className="text-white w-8 h-8" />
          </div>
          <div>
            <h4 className="font-black text-slate-800 text-lg">Prossimo Obiettivo</h4>
            <p className="text-sm text-slate-600 mt-1">Completa <strong>{nextModule.title}</strong> per sbloccare <strong>{nextModule.task}</strong>.</p>
          </div>
        </div>
      )}
    </div>
  );
};
