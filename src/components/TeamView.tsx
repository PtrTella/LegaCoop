import { Users, CheckCircle2, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const TeamView = () => {
  return (
    <div className="space-y-10 py-4 max-w-5xl mx-auto">
      <div className="space-y-3 px-4">
        <p className="text-secondary font-display font-black text-[10px] uppercase tracking-[0.4em]">Capitale Umano</p>
        <h1 className="text-3xl font-display font-black text-primary tracking-tight leading-tight italic">
          Il Tuo <span className="not-italic text-primary/20">— Il Tuo Team</span>
        </h1>
        <p className="text-primary/50 text-base font-body leading-relaxed max-w-2xl">
          La forza della visione cooperativa risiede nella mutualità delle competenze.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Founder Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-6 rounded-[32px] shadow-ambient flex items-center gap-6 group"
        >
          <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center overflow-hidden shrink-0 shadow-sm transform group-hover:-rotate-3 transition-transform">
            <img 
              src="https://picsum.photos/seed/user1/150/150" 
              alt="User" 
              referrerPolicy="no-referrer" 
              className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700" 
            />
          </div>
          <div className="flex-1">
             <p className="text-[9px] text-secondary font-display font-black uppercase tracking-widest mb-0.5">Tu</p>
             <h4 className="font-display font-black text-xl text-primary tracking-tight italic leading-none mb-2">Founder</h4>
             <div className="flex items-center gap-2 bg-surface-container-low w-fit px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 bg-tertiary rounded-full animate-pulse" />
                <span className="text-[9px] font-display font-black text-primary/40 uppercase tracking-widest leading-none">Maturità 65%</span>
             </div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-tertiary rounded-full flex items-center justify-center shadow-md shadow-secondary/10">
            <CheckCircle2 className="text-white w-5 h-5" />
          </div>
        </motion.div>

        {/* Search State (Tonal, No-Line) */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-surface-container-low p-6 rounded-[32px] flex flex-col items-center justify-center text-center space-y-4 cursor-not-allowed group"
        >
          <div className="w-14 h-14 bg-surface-container-lowest rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Users className="text-primary/20 w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-black text-lg text-primary/30 tracking-tight italic leading-none">Cerca Co-Founder</h4>
            <p className="text-[8px] text-tertiary font-display font-black uppercase tracking-[0.3em]">Matchmaking Attivo</p>
          </div>
        </motion.div>
      </div>

      {/* AI Advisory (Premium Editorial) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-surface-container-low to-surface-container-lowest p-8 rounded-[32px] shadow-ambient relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-1000">
          <Zap size={140} className="text-primary" />
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-primary rounded-[18px] flex items-center justify-center shadow-lg shadow-primary/20 transform -rotate-12">
            <Zap className="text-tertiary w-6 h-6" />
          </div>
          <div>
            <p className="text-secondary font-display font-black text-[9px] uppercase tracking-[0.4em] mb-0.5">Master Insight</p>
            <h4 className="font-display font-black text-xl text-primary italic leading-none tracking-tight">Consiglio AI Strategico</h4>
          </div>
        </div>
        
        <p className="text-primary/70 text-lg font-body leading-relaxed max-w-3xl italic tracking-tight">
          "Per la tua idea di <span className="text-primary font-bold not-italic">cooperativa energetica</span>, la visione si completa integrando un profilo con doti analitiche in <span className="text-secondary font-black not-italic px-1">ingegneria dei sistemi</span> o gestione dell'impatto ambientale."
        </p>

        <motion.button 
          whileHover={{ x: 6 }}
          className="mt-8 flex items-center gap-3 text-secondary font-display font-black text-[10px] uppercase tracking-[0.2em]"
        >
          Esplora Profili Master <ChevronRight size={14} />
        </motion.button>
      </motion.div>
    </div>
  );
};
