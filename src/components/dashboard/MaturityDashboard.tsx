import React from 'react';
import { TrendingUp, Zap, Users, Trophy, MapPin, Calendar, ChevronRight, Award, Star, PlayCircle, Rocket } from 'lucide-react';
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
    { label: "Maturità", value: `${state.maturityScore}%`, icon: TrendingUp, color: "text-white" },
    { label: "Percorso", value: `${state.completedPhases.length}/${totalModules}`, icon: Zap, color: "text-white" },
    { label: "Studio", value: state.userRole === 'founder' ? "Pronto" : "In cerca", icon: Users, color: "text-white" },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section: The Academic Authority */}
      <div className="bg-gradient-brand rounded-4xl p-8 text-white relative overflow-hidden shadow-ambient">
        <div className="absolute top-0 right-0 p-8 opacity-5 scale-125 rotate-12">
          <Trophy size={140} />
        </div>
        <div className="relative z-10">
          <p className="text-white/60 font-display font-black text-[10px] uppercase tracking-mega mb-3">Maturità Cooperativa</p>
          <h2 className="text-3xl md:text-4xl font-display font-black mb-10 leading-[0.9] tracking-tighter max-w-lg italic">
            La tua visione sta prendendo forma.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="p-1.5 bg-white/20 w-fit rounded-lg backdrop-blur-md">
                   <stat.icon className={`${stat.color} w-4.5 h-4.5`} />
                </div>
                <p className="text-3xl font-display font-black tracking-tighter leading-none">{stat.value}</p>
                <p className="text-[10px] text-white/50 uppercase font-display font-black tracking-widest-plus">{stat.label}</p>
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
          className="box-testo group cursor-pointer overflow-hidden relative bg-white"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 -mr-6 -mt-6 transform group-hover:scale-110 transition-transform">
             <Zap size={110} className="text-primary-deep" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-surface-container-low rounded-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform border border-border-subtle shadow-sm">
              <Star className="text-primary-deep w-6 h-6 fill-primary-deep" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-text-primary leading-none tracking-tight italic">Accademia Digitale</h3>
              <p className="text-[10px] text-text-muted font-display font-black tracking-widest-plus mt-1.5 uppercase">Percorso Formativo</p>
            </div>
          </div>
          <p className="text-sm text-text-muted font-body leading-relaxed mb-6 italic">
            Gestisci la tua evoluzione attraverso i moduli di studio. Ogni lezione sblocca nuove opportunità di sistema.
          </p>
          <div className="text-[10px] font-display font-black uppercase text-primary-deep tracking-widest-plus flex items-center gap-2 group-hover:gap-3 transition-all">
            Apri Mappa <ChevronRight size={14} />
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4, scale: 1.01 }}
          onClick={() => onNavigate('simulation')}
          className="box-testo group cursor-pointer overflow-hidden relative bg-white"
        >
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] -mr-6 -mt-6 transform group-hover:scale-110 transition-transform">
             <Zap size={110} className="text-accent-warm" />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-warm rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-accent-warm/20">
              <Rocket className="text-white w-6 h-6 fill-white" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-text-primary leading-none tracking-tight italic">Hub Simulazioni</h3>
              <p className="text-[10px] text-accent-warm font-display font-black tracking-widest-plus mt-1.5 uppercase">Laboratorio Pratico</p>
            </div>
          </div>
          <p className="text-sm text-text-muted font-body leading-relaxed mb-6 italic">
            Metti alla prova la tua visione con casi studio interattivi e sfide di governance reale.
          </p>
          <div className="text-[10px] font-display font-black uppercase text-accent-warm tracking-widest-plus flex items-center gap-2 group-hover:gap-3 transition-all">
            Avvia Simulazione <ChevronRight size={14} />
          </div>
        </motion.div>
      </div>

    </div>
  );
};
