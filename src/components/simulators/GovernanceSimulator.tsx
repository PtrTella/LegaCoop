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
      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (isGameOver) return (
    <div className="p-6 space-y-8 h-full flex flex-col max-w-4xl mx-auto bg-surface rounded-4xl shadow-ambient relative overflow-hidden items-center justify-center text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-8 z-10"
      >
        <div className="w-20 h-20 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Trophy className="text-secondary w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-black text-primary italic">Simulazione Completata</h2>
          <p className="text-primary/60 font-body max-w-md">Hai guidato la cooperativa attraverso sfide cruciali. Ecco il bilancio finale della tua governance:</p>
        </div>

        <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-8">
           <div className="space-y-2">
              <TrendingUp className="w-6 h-6 text-tertiary mx-auto" />
              <p className="text-2xs font-display font-black uppercase tracking-widest text-primary/40">Finanze</p>
              <p className="text-xl font-display font-black text-primary">{stats.finanze}%</p>
           </div>
           <div className="space-y-2">
              <Users className="w-6 h-6 text-secondary mx-auto" />
              <p className="text-2xs font-display font-black uppercase tracking-widest text-primary/40">Soci</p>
              <p className="text-xl font-display font-black text-primary">{stats.soddisfazione_soci}%</p>
           </div>
           <div className="space-y-2">
              <Heart className="w-6 h-6 text-primary mx-auto" />
              <p className="text-2xs font-display font-black uppercase tracking-widest text-primary/40">Principi</p>
              <p className="text-xl font-display font-black text-primary">{stats.principi_coop}%</p>
           </div>
        </div>

        <button 
          onClick={onComplete}
          className="mt-12 px-8 py-4 bg-primary text-white rounded-2xl font-display font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-ambient"
        >
          Torna all'Hub
        </button>
      </motion.div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-subtle" />
    </div>
  );

  return (
    <div className="p-6 space-y-6 h-full flex flex-col max-w-4xl mx-auto bg-surface rounded-4xl shadow-ambient relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl opacity-subtle" />
      
      <div className="flex justify-between items-center relative z-10">
        <div className="space-y-1">
          <p className="text-secondary font-display font-black text-2xs uppercase tracking-mega">Governance Lab</p>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-display font-black text-primary tracking-tight italic">
              Scenario <span className="text-primary/30 not-italic">{step + 1}/{scenarios.length}</span>
            </h2>
          </div>
        </div>

        {/* Real-time Stats Mini HUD */}
        <div className="flex gap-4">
           <div className="flex flex-col items-center">
              <div className="text-3xs font-display font-black text-primary/30 uppercase tracking-tighter mb-1">Fin</div>
              <div className="w-1.5 h-12 bg-surface-container-low rounded-full relative overflow-hidden">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${stats.finanze}%` }}
                  className="absolute bottom-0 w-full bg-tertiary" 
                />
              </div>
           </div>
           <div className="flex flex-col items-center">
              <div className="text-3xs font-display font-black text-primary/30 uppercase tracking-tighter mb-1">Soc</div>
              <div className="w-1.5 h-12 bg-surface-container-low rounded-full relative overflow-hidden">
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${stats.soddisfazione_soci}%` }}
                   className="absolute bottom-0 w-full bg-secondary" 
                />
              </div>
           </div>
           <div className="flex flex-col items-center">
              <div className="text-3xs font-display font-black text-primary/30 uppercase tracking-tighter mb-1">Pri</div>
              <div className="w-1.5 h-12 bg-surface-container-low rounded-full relative overflow-hidden">
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${stats.principi_coop}%` }}
                   className="absolute bottom-0 w-full bg-primary" 
                />
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 relative z-10">
        {/* The Balance Scale (visualizing overall health) */}
        <div className="w-full max-w-xs text-center space-y-4">
          <motion.div
            animate={{ rotate: (balanceScore - 50) * 0.6 }}
            className="inline-block p-4 bg-surface-container-lowest rounded-2xl shadow-ambient border border-surface-container-low/50"
          >
             <Scale className={`w-12 h-12 transition-colors duration-500 ${balanceScore < 40 ? 'text-tertiary' : balanceScore > 60 ? 'text-primary' : 'text-secondary'}`} />
          </motion.div>
          <div className="h-1.5 w-full bg-surface-container-low rounded-full relative overflow-hidden">
             <motion.div 
               animate={{ left: `${balanceScore}%` }}
               className="absolute top-0 w-1.5 h-1.5 bg-primary rounded-full -ml-0.75 shadow-sm"
             />
             <div className="absolute inset-0 bg-gradient-glow" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div 
              key={step}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest p-8 rounded-4xl shadow-ambient space-y-6 w-full max-w-2xl border border-surface-container-low/50"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-display font-black text-primary leading-tight tracking-tight italic">
                  {current.titolo}
                </h3>
                <p className="text-primary/60 font-body text-sm leading-relaxed">
                  {current.descrizione}
                </p>
              </div>
              
              <div className="grid gap-3 pt-2">
                {current.opzioni.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 6, backgroundColor: 'var(--color-surface-container-highest)' }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleChoice(opt)}
                    className="w-full p-4 text-left rounded-2xl bg-surface-container-low transition-all font-display font-bold text-primary/70 hover:text-primary text-sm-alt flex items-center justify-between group"
                  >
                    <span className="pr-4">{opt.testo}</span>
                    <ChevronRight className="w-5 h-5 text-secondary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary p-10 rounded-4xl shadow-ambient space-y-6 w-full max-w-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16 blur-3xl" />
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                 <Info className="text-tertiary w-8 h-8" />
              </div>
              <div className="space-y-2">
                <p className="text-white/40 font-display font-black text-3xs uppercase tracking-mega">Conseguenze della scelta</p>
                <p className="text-white text-lg font-body leading-relaxed max-w-xl mx-auto italic px-4">
                  "{feedback}"
                </p>
              </div>
              <div className="flex items-center justify-center gap-2.5 text-tertiary font-display font-black text-2xs uppercase tracking-widest pt-4">
                 <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-ping" />
                 Aggiornamento Equilibrio...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
