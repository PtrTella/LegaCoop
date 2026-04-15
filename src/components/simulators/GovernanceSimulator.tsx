import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Info, ChevronRight, TrendingUp, Users, Heart, Trophy } from 'lucide-react';

interface Option {
  testo: string;
  impatto: {
    finanze: number;
    soddisfazione_soci: number;
    principi_coop: number;
  };
  feedback: string;
}

interface Case {
  id_caso: string;
  titolo: string;
  descrizione: string;
  opzioni: Option[];
}

export const GovernanceSimulator = ({ onComplete }: { onComplete: () => void }) => {
  const [scenarios, setScenarios] = useState<Case[]>([]);
  const [step, setStep] = useState(0);
  const [stats, setStats] = useState({
    finanze: 50,
    soddisfazione_soci: 50,
    principi_coop: 50
  });
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    fetch('/data/governance.json')
      .then(res => res.json())
      .then(data => {
        setScenarios(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('[GovernanceSimulator] Failed to load governance.json:', err);
        setIsLoading(false);
      });
  }, []);

  const current = scenarios[step];

  // Calculate overall balance score (0-100)
  const balanceScore = (stats.finanze + stats.soddisfazione_soci + stats.principi_coop) / 3;

  const handleChoice = (opt: Option) => {
    const newStats = {
      finanze: Math.max(0, Math.min(100, stats.finanze + opt.impatto.finanze)),
      soddisfazione_soci: Math.max(0, Math.min(100, stats.soddisfazione_soci + opt.impatto.soddisfazione_soci)),
      principi_coop: Math.max(0, Math.min(100, stats.principi_coop + opt.impatto.principi_coop))
    };
    
    setStats(newStats);
    setFeedback(opt.feedback);
    
    setTimeout(() => {
      setFeedback(null);
      if (step < scenarios.length - 1) {
        setStep(step + 1);
      } else {
        setIsGameOver(true);
      }
    }, 4000);
  };

  if (isLoading) return (
    <div className="h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (isGameOver) return (
    <div className="p-10 space-y-12 h-full flex flex-col max-w-5xl mx-auto glass-card rounded-5xl shadow-ambient relative overflow-hidden items-center justify-center text-center">
      {/* Aurora Atmosphere */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-warm/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-10 z-10"
      >
        <div className="w-24 h-24 bg-accent-warm/10 rounded-4xl flex items-center justify-center mx-auto mb-8 border border-accent-warm/20 shadow-glow shadow-accent-warm/20">
          <Trophy className="text-accent-warm w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-display font-black text-text-primary italic tracking-tight uppercase leading-none">Simulazione<br/><span className="bg-gradient-warm bg-clip-text text-transparent">Completata</span></h2>
          <p className="text-text-muted font-body text-lg max-w-lg mx-auto italic">Governance cooperativa: il bilancio finale della tua visione.</p>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full max-w-2xl mt-12 bg-white/70 p-10 rounded-5xl border border-white/60 shadow-inner backdrop-blur-[40px]">
           <div className="space-y-3">
              <div className="w-12 h-12 bg-accent-warm/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-accent-warm/20">
                <TrendingUp className="w-6 h-6 text-accent-warm" />
              </div>
              <p className="text-[10px] font-display font-black uppercase tracking-mega text-text-muted/50">Finanze</p>
              <p className="text-3xl font-display font-black text-text-primary tracking-tighter">{stats.finanze}%</p>
           </div>
           <div className="space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-accent/20">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <p className="text-[10px] font-display font-black uppercase tracking-mega text-text-muted/50">Impatto Soci</p>
              <p className="text-3xl font-display font-black text-text-primary tracking-tighter">{stats.soddisfazione_soci}%</p>
           </div>
           <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-primary/20">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <p className="text-[10px] font-display font-black uppercase tracking-mega text-text-muted/50">Principi</p>
              <p className="text-3xl font-display font-black text-text-primary tracking-tighter">{stats.principi_coop}%</p>
           </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="mt-12 px-12 py-6 bg-gradient-brand text-white rounded-3xl font-display font-black uppercase tracking-mega text-xs shadow-2xl shadow-primary/40 hover:shadow-glow-primary transition-all overflow-hidden relative group"
        >
          <span className="relative z-10">Rivendica la Governance</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </motion.button>
      </motion.div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onComplete}>
      <div className="p-4 space-y-4 flex flex-col max-w-5xl mx-auto bg-white/95 backdrop-blur-[40px] rounded-5xl shadow-ambient relative text-text-primary max-h-full overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Corner Aurora Decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 blur-[100px] pointer-events-none" />
        
        <div className="flex justify-between items-start relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-glow shadow-accent/40" />
              <p className="text-primary font-display font-black text-[11px] uppercase tracking-mega">Governance Visionary Lab</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-text-primary tracking-tight italic leading-none uppercase">
              Scenario <span className="bg-gradient-brand bg-clip-text text-transparent font-black not-italic">{step + 1}/{scenarios.length}</span>
            </h2>
          </div>

          {/* Real-time Triad Stats Mini HUD (High Definition) */}
          <div className="flex gap-3 bg-white/70 p-2 md:p-3 rounded-2xl border border-white/60 shadow-inner">
             <div className="flex flex-col items-center">
                <TrendingUp className="w-3.5 h-3.5 text-accent-warm/40 mb-2" />
                <div className="w-1.5 h-8 bg-white/50 rounded-full relative overflow-hidden border border-white/40">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${stats.finanze}%` }}
                    className="absolute bottom-0 w-full bg-accent-warm shadow-glow shadow-accent-warm/40" 
                  />
                </div>
                <span className="text-[9px] font-display font-black text-text-muted/40 uppercase tracking-widest mt-2">{stats.finanze}</span>
             </div>
             <div className="flex flex-col items-center">
                <Users className="w-3.5 h-3.5 text-accent/40 mb-2" />
                <div className="w-1.5 h-8 bg-white/50 rounded-full relative overflow-hidden border border-white/40">
                  <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${stats.soddisfazione_soci}%` }}
                     className="absolute bottom-0 w-full bg-accent shadow-glow shadow-accent/40" 
                  />
                </div>
                <span className="text-[8px] font-display font-black text-text-muted/40 uppercase tracking-widest mt-2">{stats.soddisfazione_soci}</span>
             </div>
             <div className="flex flex-col items-center">
                <Heart className="w-3.5 h-3.5 text-primary/40 mb-2" />
                <div className="w-1.5 h-8 bg-white/50 rounded-full relative overflow-hidden border border-white/40">
                  <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${stats.principi_coop}%` }}
                     className="absolute bottom-0 w-full bg-primary shadow-glow shadow-primary/40" 
                  />
                </div>
                <span className="text-[8px] font-display font-black text-text-muted/40 uppercase tracking-widest mt-2">{stats.principi_coop}</span>
             </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-4 relative z-10">
          {/* The Balance Scale: Refined Visualizer */}
          <div className="w-full max-w-xs text-center space-y-2">
            <motion.div
              animate={{ rotate: (balanceScore - 50) * 0.4 }}
              className="inline-block p-3 bg-white/70 rounded-3xl shadow-ambient border border-white/60 backdrop-blur-[40px] relative group hover:scale-105 transition-transform"
            >
               {/* Glow based on balance */}
               <div className={`absolute inset-0 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full ${balanceScore < 40 ? 'bg-accent' : balanceScore > 60 ? 'bg-accent-warm' : 'bg-primary'}`} />
               <Scale className={`w-8 h-8 transition-colors duration-700 relative z-10 ${balanceScore < 40 ? 'text-accent' : balanceScore > 60 ? 'text-accent-warm' : 'text-primary'}`} />
            </motion.div>
            <div className="h-1.5 w-full bg-white/40 rounded-full relative overflow-hidden shadow-inner border border-white/20">
               <motion.div 
                 animate={{ left: `${balanceScore}%` }}
                 className="absolute top-0 w-2 h-2 bg-text-primary rounded-full -ml-1 -mt-px shadow-2xl z-20 border border-white/50"
               />
               <div className="absolute inset-0 bg-linear-to-r from-accent via-primary to-accent-warm opacity-30" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!feedback ? (
              <motion.div 
                key={step}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/70 p-8 md:p-10 rounded-[3rem] shadow-ambient space-y-6 w-full max-w-3xl border border-white/60 backdrop-blur-[40px]"
              >
                <div className="space-y-5">
                  <h3 className="text-2xl md:text-3xl font-display font-black text-text-primary leading-[1.1] tracking-tight italic uppercase">
                    {current.titolo}
                  </h3>
                  <p className="text-text-muted font-body text-base leading-relaxed opacity-80">
                    {current.descrizione}
                  </p>
                </div>
                
                <div className="grid gap-4 pt-4">
                  {current.opzioni.map((opt, i) => (
                    <motion.button 
                      key={i}
                      whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChoice(opt)}
                      className="w-full p-5 text-left rounded-3xl bg-white/70 border border-white/60 shadow-sm transition-all font-display font-black text-text-primary/70 hover:text-primary text-sm uppercase tracking-wide flex items-center justify-between group backdrop-blur-[40px]"
                    >
                      <span className="pr-10 leading-snug">{opt.testo}</span>
                      <ChevronRight className="w-6 h-6 text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2.5 group-hover:translate-x-0" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="feedback"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/40 p-8 rounded-[3rem] shadow-2xl space-y-6 w-full max-w-2xl text-center relative overflow-hidden backdrop-blur-3xl border border-white/60"
              >
                {/* Internal Feedback Glow */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -ml-32 -mt-32 blur-[80px]" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mb-32 blur-[80px]" />
                
                <div className="w-20 h-20 bg-primary/10 rounded-4xl flex items-center justify-center mx-auto mb-8 animate-pulse border border-primary/20 shadow-glow shadow-primary/20">
                   <div className="text-primary w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <p className="text-text-muted font-display font-black text-[10px] uppercase tracking-mega">Analisi Impatto Decisionale</p>
                  <p className="text-text-primary text-xl font-body leading-relaxed max-w-xl mx-auto italic px-4 select-none">
                    "{feedback}"
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-primary font-display font-black text-[10px] uppercase tracking-widest pt-6">
                   <div className="flex gap-1">
                     <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                     <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                     <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                   </div>
                   Ricalibrazione Parametri...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
