import React from 'react';
import { TrendingUp, Zap, Users, Trophy, MapPin, Calendar, ChevronRight, Award, Star, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../../context/AppContext';

export const MaturityDashboard = ({ 
  onNavigate 
}: { 
  onNavigate: (view: 'map' | 'simulation') => void;
}) => {
  const { state } = useAppContext();
  
  const totalModules = state.modules ? state.modules.length : 0;
  
  const stats = [
    { label: "Maturità", value: `${state.maturityScore}%`, icon: TrendingUp, color: "text-secondary" },
    { label: "Percorso", value: `${state.completedPhases.length}/${totalModules}`, icon: Zap, color: "text-tertiary" },
    { label: "Studio", value: state.userRole === 'founder' ? "Pronto" : "In cerca", icon: Users, color: "text-primary" },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section: The Academic Authority */}
      <div className="bg-gradient-to-br from-primary to-primary-container rounded-[32px] p-8 text-white relative overflow-hidden shadow-ambient">
        <div className="absolute top-0 right-0 p-8 opacity-5 scale-125 rotate-12">
          <Trophy size={160} />
        </div>
        <div className="relative z-10">
          <p className="text-tertiary font-display font-black text-[10px] uppercase tracking-[0.4em] mb-3">Maturità Cooperativa</p>
          <h2 className="text-3xl font-display font-black mb-10 leading-tight max-w-lg">La tua visione sta prendendo forma.</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="p-1.5 bg-white/10 w-fit rounded-lg backdrop-blur-md">
                   <stat.icon className={`${stat.color} w-5 h-5`} />
                </div>
                <p className="text-3xl font-display font-black tracking-tighter">{stat.value}</p>
                <p className="text-[9px] text-white/40 uppercase font-display font-black tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Shortcuts: The Core Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => onNavigate('map')}
          className="bg-surface-container-lowest p-8 rounded-[32px] shadow-ambient group cursor-pointer border border-transparent hover:border-primary/10 transition-all overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 transform group-hover:scale-110 transition-transform">
             <Zap size={140} className="text-primary" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/10">
              <Star className="text-tertiary w-6 h-6 fill-tertiary" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-primary leading-none">Accademia Digitale</h3>
              <p className="text-[10px] text-primary/40 uppercase font-display font-black tracking-widest mt-1.5">Percorso Formativo</p>
            </div>
          </div>
          <p className="text-sm text-primary/60 font-body leading-relaxed mb-6">
            Gestisci la tua evoluzione attraverso i moduli di studio. Ogni lezione sblocca nuove opportunità di sistema.
          </p>
          <div className="text-[10px] font-display font-black uppercase text-secondary tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
            Apri Mappa <ChevronRight size={14} />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          onClick={() => onNavigate('simulation')}
          className="bg-surface-container-lowest p-8 rounded-[32px] shadow-ambient group cursor-pointer border border-transparent hover:border-secondary/10 transition-all overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 transform group-hover:scale-110 transition-transform">
             <PlayCircle size={140} className="text-secondary" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-secondary/10">
              <PlayCircle className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-primary leading-none">Hub Simulazioni</h3>
              <p className="text-[10px] text-primary/40 uppercase font-display font-black tracking-widest mt-1.5">Laboratorio Pratico</p>
            </div>
          </div>
          <p className="text-sm text-primary/60 font-body leading-relaxed mb-6">
            Metti alla prova la tua visione con Gordon e i simulatori di Governance. Affina la tua resilienza cooperativa.
          </p>
          <div className="text-[10px] font-display font-black uppercase text-secondary tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
            Vai ai Test <ChevronRight size={14} />
          </div>
        </motion.div>
      </div>

      {/* Opportunities (Secondary Context) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
        <div className="bg-surface-container-lowest p-8 rounded-[28px] shadow-sm space-y-4 group hover:scale-[1.01] transition-transform duration-500">
          <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-500">
             <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-display font-black text-xl text-primary tracking-tight">Referente Dedicato</h3>
          <p className="text-sm text-primary/50 font-body leading-relaxed">Connetti la tua visione con un esperto di sistema Legacoop.</p>
          <button className="text-[9px] font-display font-black uppercase text-secondary tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
            Prenota Sessione <ChevronRight size={12} />
          </button>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-[28px] shadow-sm space-y-4 group hover:scale-[1.01] transition-transform duration-500">
           <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-500">
             <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-display font-black text-xl text-primary tracking-tight">Studio in Campo</h3>
          <p className="text-sm text-primary/50 font-body leading-relaxed">Immergiti per un giorno nel cuore di una cooperativa d'eccellenza.</p>
          <button className="text-[9px] font-display font-black uppercase text-secondary tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
            Sblocca Accesso <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
