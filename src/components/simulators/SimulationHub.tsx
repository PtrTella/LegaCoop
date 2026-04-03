import React from 'react';
import { PlayCircle, ShieldAlert, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const SimulationHub = ({ onSelect }: { onSelect: (simType: 'governance' | 'pitch') => void }) => {
  return (
    <div className="space-y-10 h-full flex flex-col justify-center max-w-5xl mx-auto py-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <p className="text-secondary font-display font-black text-[10px] uppercase tracking-[0.4em]">Laboratorio Pratico</p>
        <h2 className="text-4xl font-display font-black text-primary tracking-tight leading-tight italic">
          Simulazioni <span className="not-italic text-primary/20">Accademia</span>
        </h2>
        <p className="text-primary/50 text-base font-body leading-relaxed max-w-2xl mx-auto">
          Affina la tua visione cooperativa attraverso scenari dinamici. Sfida lo status quo e difendi il valore della mutualità.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Governance Simulator Card (Tonal Layering) */}
        <motion.div 
          whileHover={{ y: -6 }}
          onClick={() => onSelect('governance')}
          className="bg-surface-container-lowest p-8 rounded-[32px] shadow-ambient space-y-8 cursor-pointer group relative overflow-hidden"
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
              Sperimenta l'equilibrio tra democrazia interna e investimenti strategici.
            </p>
          </div>
          <motion.div 
             className="w-full py-4 bg-surface-container-low rounded-[20px] font-display font-black text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-widest shadow-sm"
          >
            Configura Organo <ChevronRight size={16} />
          </motion.div>
        </motion.div>

        {/* Pitch Battle Card (Authority Gradient) */}
        <motion.div 
          whileHover={{ y: -6 }}
          onClick={() => onSelect('pitch')}
          className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-[32px] shadow-ambient space-y-8 cursor-pointer group relative overflow-hidden"
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
              <div className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-[8px] text-tertiary font-display font-black uppercase rounded-full shadow-sm">Boss Fight</div>
            </div>
            <p className="text-white/70 font-body leading-relaxed text-sm">
              Sfida l'investitore cinico. Difendi il modello cooperativo con dati e resilienza.
            </p>
          </div>
          <motion.div 
            className="relative z-10 w-full py-4 bg-gradient-to-r from-secondary to-tertiary text-white rounded-[20px] font-display font-black group-hover:shadow-[0_0_20px_rgba(223,187,228,0.4)] transition-all duration-500 flex items-center justify-center gap-2.5 text-[11px] uppercase tracking-widest"
          >
            Sfida il Capitale <ChevronRight size={16} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
