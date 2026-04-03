import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Zap, Info, ChevronRight } from 'lucide-react';

export const GovernanceSimulator = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [balance, setBalance] = useState(50); // 50 = perfect balance
  const [feedback, setFeedback] = useState<string | null>(null);

  const scenarios = [
    {
      question: "Un investitore esterno offre 100k€ in cambio del 51% dei voti in assemblea. Accetti?",
      options: [
        { text: "Accetto, servono i soldi!", impact: 30, correct: false, feedback: "Attenzione! In una cooperativa il voto è capitario (una testa, un voto). Cedere il controllo viola i principi base." },
        { text: "Rifiuto, la governance resta ai soci.", impact: 50, correct: true, feedback: "Ottimo! Hai protetto l'identità cooperativa e l'indipendenza dell'Accademia." }
      ]
    },
    {
      question: "Un socio fondatore vuole più potere decisionale perché ha lavorato il doppio degli altri. Cosa proponi?",
      options: [
        { text: "Gli diamo voti extra proporzionali alle ore.", impact: 40, correct: false, feedback: "No! Il valore del lavoro si riconosce con lo stipendio o i ristorni, non alterando la democrazia." },
        { text: "Il voto resta unico, ma premiamo l'impegno con ristorni.", impact: 50, correct: true, feedback: "Esatto! Equità nel voto, merito nel ritorno economico. Questa è la vera visione." }
      ]
    }
  ];

  const current = scenarios[step];

  const handleChoice = (opt: any) => {
    setBalance(opt.impact);
    setFeedback(opt.feedback);
    
    if (opt.correct) {
      setTimeout(() => {
        setFeedback(null);
        if (step < scenarios.length - 1) {
          setStep(step + 1);
        } else {
          onComplete();
        }
      }, 3000);
    }
  };

  return (
    <div className="p-6 space-y-8 h-full flex flex-col max-w-4xl mx-auto bg-surface rounded-[32px] shadow-ambient relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-3xl" />
      
      <div className="text-center space-y-2 relative z-10">
        <p className="text-secondary font-display font-black text-[9px] uppercase tracking-[0.4em]">Laboratorio di Governance</p>
        <h2 className="text-2xl font-display font-black text-primary tracking-tight leading-tight italic">
          La Bilancia <span className="not-italic text-primary/20">del Potere</span></h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12 relative z-10">
        {/* Academic Scale (The Bilancia) */}
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between text-[10px] font-display font-black uppercase tracking-[0.2em] text-primary/40">
            <span className={balance < 50 ? "text-tertiary" : ""}>Capitale</span>
            <span className={balance >= 50 ? "text-secondary" : ""}>Democrazia</span>
          </div>
          <div className="h-4 bg-surface-container-low rounded-full relative shadow-inner overflow-hidden flex items-center">
             <motion.div 
               animate={{ x: `${(balance / 100) * 100}%` }}
               transition={{ type: "spring", stiffness: 100 }}
               className="absolute w-8 h-8 bg-white rounded-full shadow-ambient flex items-center justify-center -ml-4 z-20"
             >
                <div className={`w-2 h-2 rounded-full ${balance < 45 ? "bg-tertiary" : "bg-secondary"}`} />
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-r from-tertiary/20 via-primary/10 to-secondary/20" />
          </div>
          <div className="text-center">
            <motion.div
              animate={{ rotate: (balance - 50) * 0.8 }}
              className="inline-block p-4 bg-surface-container-lowest rounded-2xl shadow-ambient"
            >
               <Scale className={`w-10 h-10 transition-colors duration-500 ${balance < 45 ? 'text-tertiary' : balance > 55 ? 'text-primary' : 'text-secondary'}`} />
            </motion.div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!feedback ? (
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-lowest p-8 rounded-[32px] shadow-ambient space-y-6 w-full max-w-2xl border border-surface-container-low/50"
            >
              <h3 className="text-lg font-display font-black text-primary leading-tight tracking-tight italic">
                {current.question}
              </h3>
              <div className="grid gap-4">
                {current.options.map((opt, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChoice(opt)}
                    className="w-full p-4 text-left rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-all font-display font-bold text-primary/70 hover:text-primary text-sm flex items-center justify-between group"
                  >
                    {opt.text}
                    <ChevronRight className="w-5 h-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="feedback"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-primary p-8 rounded-[32px] shadow-ambient space-y-6 w-full max-w-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mt-12 blur-2xl" />
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                 <Zap className="text-tertiary w-7 h-7" />
              </div>
              <p className="text-white text-base font-body leading-relaxed max-w-xl mx-auto italic">
                "{feedback}"
              </p>
              <div className="flex items-center justify-center gap-2 text-tertiary font-display font-black text-[9px] uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse" />
                 Analisi completata
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
