import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale } from 'lucide-react';

export const GovernanceSimulator = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(0);
  const [balance, setBalance] = useState(50); // 50 = perfect balance

  const scenarios = [
    {
      question: "Un investitore esterno offre 100k€ in cambio del 51% dei voti in assemblea. Accetti?",
      options: [
        { text: "Accetto, servono i soldi!", impact: 30, correct: false, feedback: "Attenzione! In una cooperativa il voto è capitario (una testa, un voto). Cedere il controllo viola i principi base." },
        { text: "Rifiuto, la governance resta ai soci.", impact: 50, correct: true, feedback: "Ottimo! Hai protetto l'identità cooperativa." }
      ]
    },
    {
      question: "Un socio fondatore vuole più potere decisionale perché ha lavorato il doppio degli altri. Cosa proponi?",
      options: [
        { text: "Gli diamo voti extra proporzionali alle ore.", impact: 40, correct: false, feedback: "No! Il valore del lavoro si riconosce con lo stipendio o i ristorni, non con più voti." },
        { text: "Il voto resta unico, ma premiamo l'impegno con ristorni.", impact: 50, correct: true, feedback: "Esatto! Equità nel voto, merito nel ritorno economico." }
      ]
    }
  ];

  const current = scenarios[step];

  return (
    <div className="p-10 space-y-10 h-full flex flex-col max-w-4xl mx-auto bg-white rounded-[32px] border border-slate-200 shadow-sm">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Simulatore Governance</h2>
        <p className="text-lg text-slate-500">Gestisci le crisi e mantieni la Bilancia del Potere.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-16">
        {/* Bilancia del Potere */}
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Capitale</span>
            <span>Democrazia</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full relative overflow-hidden border-2 border-slate-200">
            <motion.div 
              animate={{ left: `${balance}%` }}
              className="absolute top-0 bottom-0 w-2 bg-indigo-500 z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-green-200 to-blue-200 opacity-50" />
          </div>
          <div className="text-center">
            <Scale className={`mx-auto w-12 h-12 transition-transform duration-500 ${balance < 45 ? '-rotate-12 text-red-500' : balance > 55 ? 'rotate-12 text-blue-500' : 'text-green-500'}`} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 space-y-8 w-full max-w-2xl"
          >
            <p className="text-2xl font-bold text-slate-800 leading-tight">{current.question}</p>
            <div className="grid gap-4">
              {current.options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => {
                    setBalance(opt.impact);
                    if (opt.correct) {
                      if (step < scenarios.length - 1) {
                        setTimeout(() => setStep(step + 1), 1500);
                      } else {
                        setTimeout(onComplete, 1500);
                      }
                    }
                  }}
                  className="w-full p-6 text-left rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all font-medium text-slate-700 text-lg"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
