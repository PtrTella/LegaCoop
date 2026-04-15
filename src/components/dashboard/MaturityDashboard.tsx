import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Zap, Users, Trophy, ChevronRight, Compass } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const MaturityDashboard = ({ onNavigate }: { onNavigate: (view: any) => void }) => {
  const { state } = useAppContext();
  const totalModules = state.modules?.length || 7;

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section: The Aurora Masterpiece (Refined & High Contrast) */}
      <div className="relative overflow-hidden rounded-5xl p-4 md:p-10 border border-white/60 shadow-ambient bg-white/40 backdrop-blur-[40px] text-text-primary">
        {/* Atmospheric Depth: Dynamic Internal Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-warm/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent shadow-glow shadow-accent/40 animate-pulse" />
              <p className="text-primary font-display font-black text-[9px] uppercase tracking-mega">Status Evolutivo</p>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-display font-black leading-[0.85] tracking-tighter italic select-none">
              La tua visione <br/>
              <span className="not-italic bg-gradient-brand bg-clip-text text-transparent opacity-90 text-nowrap">prende forma</span>
              <span className="-ml-1 text-accent">.</span>
            </h2>
          </div>
        </div>

        {/* Secondary Stats: Minimalist layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-white/20 relative z-10">
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-display font-black text-text-primary tracking-tight leading-none">
                {state.maturityScore}%
              </p>
              <p className="text-[10px] text-text-muted uppercase font-display font-black tracking-widest-plus mt-1">Maturità Startup</p>
            </div>
            </div>

          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/5 group-hover:bg-accent group-hover:text-white transition-all duration-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-display font-black text-text-primary tracking-tight leading-none">
                {state.completedPhases.length}/{totalModules}
              </p>
              <p className="text-[10px] text-text-muted uppercase font-display font-black tracking-widest-plus mt-1">Moduli Superati</p>
            </div>
          </div>

          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-accent-warm/10 flex items-center justify-center text-accent-warm border border-accent-warm/5 group-hover:bg-accent-warm group-hover:text-white transition-all duration-500 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-display font-black text-text-primary tracking-tight leading-none">
                {state.userRole === 'founder' ? "Founder" : "User"}
              </p>
              <p className="text-[10px] text-text-muted uppercase font-display font-black tracking-widest-plus mt-1">Ruolo Piattaforma</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles - Restoration of Lab Style with Clear Accents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="box-testo group cursor-pointer hover:scale-[1.02] transition-all bg-white/70 border-white/40 min-h-40 flex flex-col justify-between" onClick={() => onNavigate('map')}>
           <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                <Compass size={24} />
              </div>
           </div>
            <div>
             <h4 className="font-display font-black text-xl text-text-primary mb-1">Accademia</h4>
             <p className="text-text-muted text-xs leading-relaxed">Trova la mappa del tuo viaggio e sblocca ogni fase della tua crescita.</p>
           </div>
        </div>
        
        <div className="box-testo group cursor-pointer hover:scale-[1.02] transition-all bg-white/70 border-white/40 min-h-40 flex flex-col justify-between" onClick={() => onNavigate('team')}>
           <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-accent/10 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                <Users size={24} />
              </div>
           </div>
           <div>
             <h4 className="font-display font-black text-xl text-text-primary mb-1">Ecosistema</h4>
             <p className="text-text-muted text-xs leading-relaxed">Connettiti con talenti ed esperti per accelerare la tua visione.</p>
           </div>
        </div>

        <div className="box-testo group cursor-pointer hover:scale-[1.02] transition-all bg-white/70 border-white/40 min-h-40 flex flex-col justify-between" onClick={() => onNavigate('simulation')}>
           <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-accent-warm/10 rounded-2xl text-accent-warm group-hover:bg-accent-warm group-hover:text-white transition-all duration-500 shadow-sm">
                <Trophy size={24} />
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted/20 group-hover:translate-x-1 group-hover:text-accent-warm transition-all" />
           </div>
           <div>
             <h4 className="font-display font-black text-2xl text-text-primary italic tracking-tight">Laboratorio</h4>
             <p className="text-[11px] text-text-muted mt-2 leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">Metti alla prova le tue abilità con simulatori reali di governance e pitch.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

