import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, ShieldAlert, ChevronRight, Zap } from 'lucide-react';

interface DigitalSimulatorsProps {
  onSelect: (simType: 'governance' | 'pitch') => void;
}

const SectionDivider = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4">
    <h3 className="font-display font-black text-sm uppercase tracking-mega text-primary/30 shrink-0">{title}</h3>
    <div className="flex-1 h-px bg-surface-container-low" />
  </div>
);

const GovernanceCard = ({ onSelect }: { onSelect: () => void }) => (
  <motion.div
    whileHover={{ y: -6 }}
    onClick={onSelect}
    className="bg-surface-container-lowest p-8 rounded-4xl shadow-ambient space-y-8 cursor-pointer group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 translate-x-8 -translate-y-8">
      <Zap size={140} />
    </div>
    <div className="w-14 h-14 bg-surface-container-low rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
      <PlayCircle className="w-7 h-7" />
    </div>
    <div className="relative z-10">
      <h3 className="font-display font-black text-2xl text-primary mb-3 tracking-tight leading-none italic">Governance</h3>
      <p className="text-primary/60 font-body leading-relaxed text-sm">
        Sperimenta l'equilibrio tra democrazia interna e investimenti strategici su casi reali.
      </p>
    </div>
    <div className="w-full py-4 bg-surface-container-low rounded-3xl font-display font-black text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 flex items-center justify-center gap-2.5 text-sm-alt uppercase tracking-widest shadow-sm">
      Configura Organo <ChevronRight size={16} />
    </div>
  </motion.div>
);

const PitchBattleCard = ({ onSelect }: { onSelect: () => void }) => (
  <motion.div
    whileHover={{ y: -6 }}
    onClick={onSelect}
    className="bg-gradient-brand p-8 rounded-4xl shadow-ambient space-y-8 cursor-pointer group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-8 opacity-10 translate-x-8 -translate-y-8">
      <ShieldAlert size={140} className="text-tertiary" />
    </div>
    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:bg-white/20 transition-all duration-500 transform group-hover:-rotate-6">
      <ShieldAlert className="text-tertiary w-7 h-7" />
    </div>
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="font-display font-black text-2xl text-white tracking-tight leading-none italic">Pitch Battle</h3>
        <div className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-3xs text-tertiary font-display font-black uppercase rounded-full shadow-sm">
          Boss Fight
        </div>
      </div>
      <p className="text-white/70 font-body leading-relaxed text-sm">
        Sfida l'investitore cinico. Difendi il modello cooperativo con dati e resilienza.
      </p>
    </div>
    <div className="relative z-10 w-full py-4 bg-gradient-accent text-white rounded-3xl font-display font-black group-hover:shadow-[0_0_20px_rgba(223,187,228,0.4)] transition-all duration-500 flex items-center justify-center gap-2.5 text-sm-alt uppercase tracking-widest">
      Sfida il Capitale <ChevronRight size={16} />
    </div>
  </motion.div>
);

export const DigitalSimulators = ({ onSelect }: DigitalSimulatorsProps) => (
  <section className="space-y-6">
    <SectionDivider title="Simulatori Digitali" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <GovernanceCard onSelect={() => onSelect('governance')} />
      <PitchBattleCard onSelect={() => onSelect('pitch')} />
    </div>
  </section>
);
