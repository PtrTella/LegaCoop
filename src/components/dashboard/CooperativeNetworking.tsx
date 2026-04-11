import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Building2, Zap, X, ChevronRight, Share2, Loader2, Calendar, FileText, LayoutGrid, Award, Search } from 'lucide-react';
import { CooperativeProfile } from '../../types';

// --- FILTER CHIP ---

const FilterChip = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void; key?: React.Key }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl font-display font-black text-[9px] uppercase tracking-widest-plus shrink-0 transition-all border ${
      active
        ? 'bg-primary text-white shadow-xl shadow-primary/20 border-primary scale-105'
        : 'bg-white/50 text-primary/40 hover:text-primary hover:bg-white border-border-subtle/50'
    }`}
  >
    {label}
  </button>
));

FilterChip.displayName = 'FilterChip';

// --- COOPERATIVE CARD ---

const CooperativeCard = React.memo(({ coop, onClick }: { 
  coop: CooperativeProfile; 
  onClick: (c: CooperativeProfile) => void; 
  key?: React.Key;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={() => onClick(coop)}
    className="bg-white/70 backdrop-blur-xl p-6 rounded-4xl shadow-ambient cursor-pointer group border border-white/50 hover:bg-white transition-all flex flex-col h-full min-h-70"
  >
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-brand rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform relative">
           <Building2 className="text-white w-6 h-6 relative z-10" />
        </div>
        <div>
          <h4 className="font-display font-black text-primary text-xl tracking-tight leading-none italic transition-colors">{coop.name}</h4>
          <p className="text-[9px] text-primary/30 font-display font-black uppercase tracking-widest-plus mt-1 px-2 py-0.5 bg-primary/5 rounded-full w-fit">{coop.sector}</p>
        </div>
      </div>
      {coop.studioInCampoAvailable && (
        <div className="p-1.5 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center border border-secondary/5 group-hover:bg-secondary group-hover:text-white transition-all">
           <Zap className="w-3.5 h-3.5 fill-current" />
        </div>
      )}
    </div>

    <p className="text-xs font-body text-primary/60 leading-relaxed line-clamp-3 mb-6 flex-1 italic">
      "{coop.description}"
    </p>

    <div className="space-y-4 mt-auto pt-4 border-t border-primary/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary/40">
          <MapPin className="w-3.5 h-3.5 text-secondary/60" />
          <span className="text-[10px] font-display font-black uppercase tracking-widest-plus">{coop.location}</span>
        </div>
        <ChevronRight size={14} className="text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  </motion.div>
));

CooperativeCard.displayName = 'CooperativeCard';

// --- COOPERATIVE DETAIL MODAL ---

const CooperativeDetail = ({ coop, onClose }: { coop: CooperativeProfile; onClose: () => void }) => {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay z-50 p-4 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 20 }}
        className="bg-white/95 backdrop-blur-3xl w-full max-w-4xl rounded-5xl shadow-ambient overflow-hidden border border-white/50 flex flex-col max-h-[90vh]"
      >
        {/* Header Hero */}
        <div className="bg-gradient-brand p-8 md:p-10 text-white relative shrink-0">
           <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white text-white hover:text-primary rounded-xl transition-all z-10 backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <Building2 className="w-10 h-10 text-tertiary" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-display font-black uppercase tracking-mega text-tertiary/80">{coop.sector}</span>
                <div className="w-1 h-1 rounded-full bg-tertiary/40" />
                <div className="flex items-center gap-2">
                  <MapPin size={10} className="text-tertiary" />
                  <span className="text-[10px] font-display font-black uppercase text-white/70">{coop.location}</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-black italic tracking-tighter leading-none">{coop.name}</h3>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 overflow-y-auto scrollbar-hide">
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-3">
              <div className="flex items-center gap-3 text-secondary">
                <LayoutGrid size={16} />
                <h5 className="text-[10px] font-display font-black uppercase tracking-ultra">Identità</h5>
              </div>
              <p className="text-primary/70 font-body leading-relaxed text-sm italic">
                "{coop.description}"
              </p>
            </section>
            
            <section className="space-y-3">
              <div className="flex items-center gap-3 text-secondary">
                <Award size={16} />
                <h5 className="text-[10px] font-display font-black uppercase tracking-ultra">Missione</h5>
              </div>
              <div className="bg-surface-container-low/30 backdrop-blur-sm p-6 rounded-3xl border border-border-subtle/50 relative overflow-hidden group">
                <p className="text-primary/60 font-body text-base leading-relaxed relative z-10">
                  {coop.mission}
                </p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {coop.studioInCampoAvailable && (
              <div className="bg-gradient-accent p-6 rounded-4xl text-white relative overflow-hidden group shadow-xl shadow-secondary/20">
                <Zap className="absolute -top-3 -right-3 w-20 h-20 text-white/10 transform rotate-12 group-hover:scale-110 transition-transform" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 font-display text-white italic font-black text-lg">S</div>
                  <h6 className="font-display font-black text-white text-base leading-none">Studio in Campo</h6>
                </div>
                <p className="text-[11px] font-body text-white/80 leading-relaxed mb-6">
                  Osserva i processi operativi di {coop.name} dal vivo.
                </p>
                <button 
                  onClick={() => setRequestSent(true)}
                  disabled={requestSent}
                  className={`w-full py-4 rounded-xl font-display font-black text-[10px] uppercase tracking-widest-plus flex items-center justify-center gap-2.5 transition-all ${
                    requestSent ? 'bg-white/20 text-white cursor-default' : 'bg-white text-primary hover:shadow-2xl active:scale-95'
                  }`}
                >
                  {requestSent ? 'Richiesta Inviata' : 'Prenota Posto'}
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

            <div className="bg-white/50 backdrop-blur-md p-6 rounded-4xl border border-white/50 space-y-4">
               <h5 className="text-[9px] font-display font-black uppercase tracking-ultra text-primary/40">Collaborazione</h5>
               <p className="text-[11px] font-body text-primary/60 leading-relaxed">
                 Hai una visione compatibile? Contatta il board di {coop.name}.
               </p>
               <button className="w-full py-3.5 bg-white border border-border-subtle rounded-xl font-display font-black text-[9px] uppercase tracking-widest-plus flex items-center justify-center gap-2.5 hover:bg-primary hover:text-white transition-all text-primary shadow-sm">
                 Presenta Visione <Share2 size={12} />
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- MAIN COMPONENT ---

export const CooperativeNetworking = () => {
  const [cooperatives, setCooperatives] = useState<CooperativeProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [selectedCoop, setSelectedCoop] = useState<CooperativeProfile | null>(null);

  useEffect(() => {
    const loadCooperatives = async () => {
      try {
        const res = await fetch('/data/cooperatives.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        if (data && Array.isArray(data.cooperatives)) {
          setCooperatives(data.cooperatives);
        } else {
          setCooperatives([]);
        }
      } catch (err) {
        console.error('[CooperativeNetworking] Failed to load data:', err);
        setCooperatives([]);
      } finally {
        setLoading(false);
      }
    };

    loadCooperatives();
  }, []);

  const sectors = useMemo(() => Array.from(new Set(cooperatives.map(c => c.sector))), [cooperatives]);

  const filtered = useMemo(() => 
    activeSector ? cooperatives.filter(c => c.sector === activeSector) : cooperatives
  , [cooperatives, activeSector]);

  const resetFilters = useCallback(() => setActiveSector(null), []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3 text-primary/20 font-display font-black uppercase tracking-widest-plus text-[9px]">
        <Loader2 className="animate-spin h-5 w-5" />
        Sincronizzazione Ecosistema...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/40 backdrop-blur-xl rounded-4xl border border-white/50 p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
             <p className="text-[10px] font-display font-black uppercase tracking-ultra text-primary/40">Filtra per Settore Operativo</p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible scrollbar-hide">
            <FilterChip 
              label="Tutti i Settori" 
              active={activeSector === null} 
              onClick={() => setActiveSector(null)} 
              key="all"
            />
            {sectors.map(sector => (
              <FilterChip 
                key={sector} 
                label={sector} 
                active={activeSector === sector} 
                onClick={() => setActiveSector(sector)} 
              />
            ))}
            {activeSector !== null && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tertiary/10 font-display text-[9px] font-black uppercase tracking-widest-plus text-tertiary hover:bg-tertiary/20 transition-all border border-tertiary/10"
              >
                <X size={12} /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(coop => (
          <CooperativeCard key={coop.id} coop={coop} onClick={setSelectedCoop} />
        ))}
      </div>

      <AnimatePresence>
        {selectedCoop && (
          <CooperativeDetail coop={selectedCoop} onClose={() => setSelectedCoop(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
