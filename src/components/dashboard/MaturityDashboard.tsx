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
      <div className="bg-gradient-brand rounded-4xl p-8 text-white relative overflow-hidden shadow-ambient">
        <div className="absolute top-0 right-0 p-8 opacity-5 scale-125 rotate-12">
          <Trophy size={140} />
        </div>
        <div className="relative z-10">
          <p className="text-tertiary font-display font-black text-[10px] uppercase tracking-mega mb-3">Maturità Cooperativa</p>
          <h2 className="text-3xl md:text-4xl font-display font-black mb-10 leading-[0.9] tracking-tighter max-w-lg italic">
            La tua visione sta prendendo forma.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="p-1.5 bg-white/10 w-fit rounded-lg backdrop-blur-md">
                   <stat.icon className={`${stat.color} w-4.5 h-4.5`} />
                </div>
                <p className="text-3xl font-display font-black tracking-tighter leading-none">{stat.value}</p>
                <p className="text-[10px] text-white/40 uppercase font-display font-black tracking-widest-plus">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Shortcuts: The Core Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          onClick={() => onNavigate('map')}
          className="bg-surface-container-lowest p-6 rounded-4xl shadow-ambient group cursor-pointer border border-transparent hover:border-border-muted transition-all overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 -mr-6 -mt-6 transform group-hover:scale-110 transition-transform">
             <Zap size={110} className="text-primary" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-primary/10">
              <Star className="text-tertiary w-6 h-6 fill-tertiary" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-primary leading-none tracking-tight">Accademia Digitale</h3>
              <p className="text-[10px] text-primary/40 uppercase font-display font-black tracking-widest-plus mt-1.5">Percorso Formativo</p>
            </div>
          </div>
          <p className="text-sm text-primary/60 font-body leading-relaxed mb-6">
            Gestisci la tua evoluzione attraverso i moduli di studio. Ogni lezione sblocca nuove opportunità di sistema.
          </p>
          <div className="text-[10px] font-display font-black uppercase text-secondary tracking-widest-plus flex items-center gap-2 group-hover:gap-3 transition-all">
            Apri Mappa <ChevronRight size={14} />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          onClick={() => onNavigate('simulation')}
          className="bg-surface-container-lowest p-6 rounded-4xl shadow-ambient group cursor-pointer border border-transparent hover:border-secondary/20 transition-all overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 -mr-6 -mt-6 transform group-hover:scale-110 transition-transform">
             <PlayCircle size={110} className="text-secondary" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-secondary/10">
              <PlayCircle className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-primary leading-none tracking-tight">Hub Simulazioni</h3>
              <p className="text-[10px] text-primary/40 uppercase font-display font-black tracking-widest-plus mt-1.5">Laboratorio Pratico</p>
            </div>
          </div>
          <p className="text-sm text-primary/60 font-body leading-relaxed mb-6">
            Metti alla prova la tua visione con Gordon e i simulatori di Governance. Affina la tua resilienza cooperativa.
          </p>
          <div className="text-[10px] font-display font-black uppercase text-secondary tracking-widest-plus flex items-center gap-2 group-hover:gap-3 transition-all">
            Vai ai Test <ChevronRight size={14} />
          </div>
        </motion.div>
      </div>

    </div>
  );
};
