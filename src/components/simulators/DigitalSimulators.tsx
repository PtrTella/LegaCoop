import React from 'react';
import { motion } from 'motion/react';
import { PlayCircle, ShieldAlert, ChevronRight, Zap } from 'lucide-react';

interface DigitalSimulatorsProps {
  onSelect: (simType: 'governance' | 'pitch') => void;
}

const SectionDivider = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4">
    <h3 className="font-display font-black text-sm-alt uppercase tracking-mega text-primary/30 shrink-0">{title}</h3>
    <div className="flex-1 h-px bg-surface-container-low" />
  </div>
);

const GovernanceCard = ({ onSelect }: { onSelect: () => void }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.01 }}
    onClick={onSelect}
    className="box-testo group cursor-pointer overflow-hidden relative bg-white border-t-2 border-t-primary-deep/20"
  >
    <div className="absolute top-0 right-0 p-8 opacity-[0.02] transform group-hover:scale-110 transition-transform">
      <Zap size={140} className="text-primary-deep" />
    </div>
    <div className="flex items-center gap-5 mb-8">
      <div className="w-14 h-14 bg-primary-deep/10 rounded-2xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform border border-primary-deep/20 shadow-sm">
        <PlayCircle className="w-7 h-7 text-primary-deep" />
      </div>
      <div>
        <h3 className="font-display font-black text-2xl text-text-primary tracking-tight italic">Governance</h3>
        <p className="text-[10px] text-primary-deep font-display font-black uppercase tracking-mega mt-1.5">Modulo Strategico</p>
      </div>
    </div>
    <p className="text-text-muted font-body leading-relaxed text-sm italic mb-8 group-hover:text-text-primary transition-colors">
      Sperimenta l'equilibrio tra democrazia interna e investimenti strategici su casi reali di gestione cooperativa.
    </p>
    <div className="w-full py-4 bg-surface-container-low rounded-2xl font-display font-black text-primary-deep group-hover:bg-primary-deep group-hover:text-white transition-all duration-500 flex items-center justify-center gap-3 text-xs uppercase tracking-widest border border-border-subtle">
      Avvia Simulazione <ChevronRight size={16} />
    </div>
  </motion.div>
);

const PitchBattleCard = ({ onSelect }: { onSelect: () => void }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.01 }}
    onClick={onSelect}
    className="box-testo group cursor-pointer overflow-hidden relative bg-white border-t-2 border-t-accent-warm shadow-glow shadow-accent-warm/10"
  >
    <div className="absolute top-0 right-0 p-8 opacity-[0.02] transform group-hover:scale-110 transition-transform">
      <ShieldAlert size={140} className="text-accent-warm" />
    </div>
    <div className="flex items-center gap-5 mb-8">
      <div className="w-14 h-14 bg-gradient-warm rounded-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-accent-warm/20 border border-white/20">
        <Zap className="text-white w-7 h-7 fill-white" />
      </div>
      <div>
        <h3 className="font-display font-black text-2xl text-text-primary tracking-tight italic">Pitch Battle</h3>
        <div className="px-3 py-1 bg-accent-warm/10 text-[9px] text-accent-warm font-display font-black uppercase rounded-lg border border-accent-warm/20 mt-1.5 w-fit">
          Boss Fight
        </div>
      </div>
    </div>
    <p className="text-text-muted font-body leading-relaxed text-sm italic mb-8 group-hover:text-text-primary transition-colors">
      Sfida l'investitore cinico. Difendi il modello cooperativo con dati e resilienza in un laboratorio ad alta pressione.
    </p>
    <div className="w-full py-4 bg-accent-warm/10 text-accent-warm group-hover:bg-accent-warm group-hover:text-white rounded-2xl font-display font-black shadow-sm group-hover:shadow-glow group-hover:shadow-accent-warm/30 transition-all duration-500 flex items-center justify-center gap-3 text-xs uppercase tracking-widest border border-accent-warm/20">
      Sfida il Capitale <ChevronRight size={16} />
    </div>
  </motion.div>
);

export const DigitalSimulators = ({ onSelect }: DigitalSimulatorsProps) => (
  <section className="space-y-6">
    <SectionDivider title="Simulatori Digitali" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GovernanceCard onSelect={() => onSelect('governance')} />
      <PitchBattleCard onSelect={() => onSelect('pitch')} />
    </div>
  </section>
);
