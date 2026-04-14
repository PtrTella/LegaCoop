import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Shield, MessageSquare } from 'lucide-react';

interface DigitalSimulatorsProps {
  onSelect: (simType: 'governance' | 'pitch') => void;
}

export const DigitalSimulators = ({ onSelect }: DigitalSimulatorsProps) => {
  const simulators = [
    {
      id: 'governance',
      title: "Consiglio dei Saggi",
      description: "Prendi decisioni etiche e strategiche per la tua cooperativa in scenari realistici.",
      icon: Shield,
      accent: "bg-primary/10 text-primary",
      badge: "Governance"
    },
    {
      id: 'pitch',
      title: "Pitch Battle",
      description: "Affronta investitori e partner per ottenere il supporto necessario alla crescita.",
      icon: MessageSquare,
      accent: "bg-accent/10 text-accent",
      badge: "Pitch"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {simulators.map((sim) => (
          <motion.div
            key={sim.id}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => onSelect(sim.id as 'governance' | 'pitch')}
            className="box-testo group cursor-pointer relative overflow-hidden bg-white/70"
          >
            <div className={`absolute top-0 right-0 p-8 opacity-[0.03] transform group-hover:scale-110 transition-transform ${sim.id === 'governance' ? 'text-primary' : 'text-accent'}`}>
              <sim.icon size={120} />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 shadow-lg ${sim.accent}`}>
                  <sim.icon className="w-7 h-7" />
                </div>
                <div className="px-3 py-1 bg-white/40 shadow-sm border border-white/60 backdrop-blur-md rounded-full text-[9px] font-display font-black uppercase tracking-mega text-primary/40 group-hover:text-primary transition-colors">
                  {sim.badge}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-display font-black text-text-primary tracking-tight italic group-hover:text-primary transition-colors">
                  {sim.title}
                </h3>
                <p className="mt-2 text-sm font-body text-text-muted leading-relaxed line-clamp-2 italic">
                  "{sim.description}"
                </p>
              </div>

              <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
                <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-primary/40 group-hover:text-primary transition-colors">Avvia simulatore</span>
                <ChevronRight className="w-5 h-5 text-primary/20 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
