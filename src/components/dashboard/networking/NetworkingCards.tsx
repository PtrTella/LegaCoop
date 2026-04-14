import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Zap, Building2, X, LayoutGrid, Award, ChevronRight, Share2 } from 'lucide-react';
import { CooperativeProfile, CoFounderProfile } from '../../../types';

// --- SHARED SKILL TAG ---
export const SkillTag = React.memo(({ skill, highlighted = false }: { skill: string; highlighted?: boolean }) => (
  <span className={`px-2.5 py-1.5 glass-pill font-display font-black text-[9px] uppercase tracking-widest-plus transition-all border ${
    highlighted 
      ? 'bg-gradient-brand text-white border-white/20 shadow-glow shadow-primary/20 scale-105' 
      : 'text-primary/40 border-white/20 hover:text-primary hover:bg-white/80'
  }`}>
    {skill}
  </span>
));
SkillTag.displayName = 'SkillTag';

// --- TALENT PROFILE CARD ---
export const ProfileCard = React.memo(({ profile, activeFilters, onClick }: {
  profile: CoFounderProfile;
  activeFilters: string[];
  onClick: (p: CoFounderProfile) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={() => onClick(profile)}
    className="box-testo cursor-pointer group flex flex-col h-full min-h-65 bg-white/70"
  >
    <div className="flex items-center gap-5 mb-6">
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-primary rounded-2xl blur-md opacity-0 group-hover:opacity-10 transition-opacity" />
        <img
          src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
          alt={profile.name}
          className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform border-4 border-white relative z-10"
          loading="lazy"
        />
        {profile.badge && (
          <div className="absolute -top-2 -right-2 bg-gradient-brand w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-20">
             <Zap className="w-3 h-3 text-white fill-current" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-black text-text-primary text-xl tracking-tight leading-none italic group-hover:text-primary transition-colors truncate">{profile.name}</h4>
        <p className="text-[9px] text-text-muted font-display font-black uppercase tracking-widest-plus mt-2 px-2 py-0.5 glass-pill whitespace-nowrap w-fit">{profile.role}</p>
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-between">
      <div className="flex items-center gap-4 text-text-muted mb-5 px-1">
        <div className="flex items-center gap-2">
           <MapPin size={12} className="text-primary/40" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus">{profile.location}</span>
        </div>
        <div className="flex items-center gap-2">
           <Clock size={12} className="text-primary/40" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus">{profile.availability}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-px bg-primary/5" />
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.slice(0, 3).map(skill => (
            <SkillTag key={skill} skill={skill} highlighted={activeFilters.includes(skill)} />
          ))}
          {profile.skills.length > 3 && (
            <span className="self-center px-1 text-[10px] font-display font-black text-text-muted/40 uppercase tracking-widest-plus">
              +{profile.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
));
ProfileCard.displayName = 'ProfileCard';

// --- COOPERATIVE CARD ---
export const CooperativeCard = React.memo(({ coop, onClick }: { 
  coop: CooperativeProfile; 
  onClick: (c: CooperativeProfile) => void; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={() => onClick(coop)}
    className="box-testo cursor-pointer group flex flex-col h-full min-h-70 bg-white/70"
  >
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-brand rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform relative">
           <Building2 className="text-white w-6 h-6 relative z-10" />
        </div>
        <div>
          <h4 className="font-display font-black text-text-primary text-xl tracking-tight leading-none italic transition-colors group-hover:text-primary">{coop.name}</h4>
          <p className="text-[9px] text-text-muted font-display font-black uppercase tracking-widest-plus mt-2 px-2 py-0.5 glass-pill w-fit">{coop.sector}</p>
        </div>
      </div>
      {coop.studioInCampoAvailable && (
        <div className="p-1.5 glass-pill text-accent-warm group-hover:bg-accent-warm group-hover:text-white transition-all shadow-glow shadow-accent-warm/10">
           <Zap className="w-3.5 h-3.5 fill-current" />
        </div>
      )}
    </div>

    <p className="text-xs font-body text-text-primary/70 leading-relaxed line-clamp-3 mb-6 flex-1 italic">
      "{coop.description}"
    </p>

    <div className="space-y-4 mt-auto pt-4 border-t border-primary/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-muted">
          <MapPin className="w-3.5 h-3.5 text-primary/40" />
          <span className="text-[10px] font-display font-black uppercase tracking-widest-plus">{coop.location}</span>
        </div>
        <div className="p-1 glass-pill text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  </motion.div>
));
CooperativeCard.displayName = 'CooperativeCard';

// --- PROFILE DETAIL MODAL ---
export const ProfileDetail = ({ profile, onClose }: { profile: CoFounderProfile; onClose: () => void }) => {
  const [sent, setSent] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="modal-overlay z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 20 }}
        className="bg-white/70 backdrop-blur-[40px] w-full max-w-xl rounded-5xl shadow-ambient overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-brand p-10 text-white relative overflow-hidden">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white text-white hover:text-primary rounded-xl transition-all z-20 backdrop-blur-md">
            <X className="w-5 h-5" />
          </button>
          {/* Internal Aurora Blob for Modal */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-[60px]" />
          
          <div className="flex items-center gap-8 relative z-10">
            <div className="relative shrink-0">
               <img src={`https://picsum.photos/seed/${profile.avatarSeed}/200/200`} alt={profile.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-2xl" />
               {profile.badge && <div className="absolute -top-2 -right-2 bg-accent-warm p-1.5 rounded-full border-4 border-white shadow-xl shadow-accent-warm/20"><Zap className="w-4 h-4 text-white fill-current" /></div>}
            </div>
            <div>
              <h3 className="font-display font-black text-3xl tracking-tight leading-none italic">{profile.name}</h3>
              <p className="text-white/80 font-display font-black text-[9px] uppercase tracking-mega mt-3 glass-pill px-3 py-1.5 w-fit border border-white/10">{profile.role}</p>
            </div>
          </div>
        </div>
        <div className="p-10 space-y-10 overflow-y-auto max-h-[60vh] scrollbar-hide">
          <section className="space-y-3">
            <p className="text-[10px] text-primary/60 font-display font-black uppercase tracking-ultra">Visione</p>
            <div className="bg-white/70 backdrop-blur-[40px] p-6 rounded-3xl border border-white/60 italic"><p className="text-text-primary/70 font-body leading-relaxed text-sm">"{profile.vision}"</p></div>
          </section>
          <section className="space-y-3">
            <p className="text-[10px] text-primary/60 font-display font-black uppercase tracking-ultra">Competenze</p>
            <div className="flex flex-wrap gap-2">{profile.skills.map(skill => <SkillTag key={skill} skill={skill} />)}</div>
          </section>
          <motion.button onClick={() => setSent(true)} disabled={sent} className={`w-full py-5 rounded-2xl font-display font-black text-xs uppercase tracking-widest-plus transition-all flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden ${sent ? 'bg-primary/10 text-primary border border-primary/20 shadow-none cursor-default' : 'bg-gradient-brand text-white shadow-glow shadow-primary/20'}`}>{sent ? 'Richiesta Inviata' : 'Inizia Connessione'}</motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- COOPERATIVE DETAIL MODAL ---
export const CooperativeDetail = ({ coop, onClose }: { coop: CooperativeProfile; onClose: () => void }) => {
  const [requestSent, setRequestSent] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="modal-overlay z-50 p-4 md:p-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 20 }}
        className="bg-white/70 backdrop-blur-[40px] w-full max-w-4xl rounded-5xl shadow-ambient overflow-hidden border border-white/50 flex flex-col max-h-[90vh]"
      >
        <div className="bg-gradient-brand p-8 md:p-10 text-white relative shrink-0">
           <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white text-white hover:text-primary rounded-xl transition-all z-10 backdrop-blur-md"><X className="w-5 h-5" /></button>
           {/* Internal Aurora Blob for Modal */}
           <div className="absolute top-0 left-0 w-64 h-64 bg-accent-warm/20 rounded-full blur-[80px]" />
           
          <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-inner"><Building2 className="w-10 h-10 text-white" /></div>
            <div>
              <div className="flex items-center gap-3 mb-2"><span className="text-[10px] font-display font-black uppercase tracking-mega text-white/80">{coop.sector}</span><div className="w-1 h-1 rounded-full bg-white/40" /><div className="flex items-center gap-2"><MapPin size={10} className="text-white/60" /><span className="text-[10px] font-display font-black uppercase text-white/60">{coop.location}</span></div></div>
              <h3 className="text-3xl md:text-4xl font-display font-black italic tracking-tighter leading-none">{coop.name}</h3>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 overflow-y-auto scrollbar-hide">
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-3"><div className="flex items-center gap-3 text-primary/60"><LayoutGrid size={16} /><h5 className="text-[10px] font-display font-black uppercase tracking-ultra">Identità</h5></div><p className="text-text-primary/70 font-body leading-relaxed text-sm italic">"{coop.description}"</p></section>
            <section className="space-y-3"><div className="flex items-center gap-3 text-primary/60"><Award size={16} /><h5 className="text-[10px] font-display font-black uppercase tracking-ultra">Missione</h5></div><div className="bg-white/70 backdrop-blur-[40px] p-6 rounded-3xl border border-white/60 relative overflow-hidden group"><p className="text-text-primary/60 font-body text-base leading-relaxed relative z-10">{coop.mission}</p></div></section>
          </div>
          <div className="lg:col-span-5 space-y-6">
            {coop.studioInCampoAvailable && (
              <div className="bg-accent-warm p-6 rounded-4xl text-white relative overflow-hidden group shadow-xl shadow-accent-warm/20"><Zap className="absolute -top-3 -right-3 w-20 h-20 text-white/5" /><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 font-display text-white italic font-black text-lg">S</div><h6 className="font-display font-black text-white text-base leading-none">Studio in Campo</h6></div><p className="text-[11px] font-body text-white/80 leading-relaxed mb-6">Osserva i processi operativi di {coop.name} dal vivo.</p><button onClick={() => setRequestSent(true)} disabled={requestSent} className={`w-full py-4 rounded-xl font-display font-black text-[10px] uppercase tracking-widest-plus transition-all ${requestSent ? 'bg-white/20' : 'bg-white text-accent-warm'}`}>{requestSent ? 'Richiesta Inviata' : 'Prenota Posto'}</button></div>
            )}
            <div className="bg-white/70 backdrop-blur-[40px] p-6 rounded-4xl border border-white/50 space-y-4">
               <h5 className="text-[9px] font-display font-black uppercase tracking-ultra text-primary/40">Collaborazione</h5><p className="text-[11px] font-body text-text-primary/60 leading-relaxed">Contatta il board di {coop.name}.</p><button className="w-full py-3.5 bg-white/60 border border-white/60 rounded-xl font-display font-black text-[9px] uppercase tracking-widest-plus transition-all text-primary shadow-sm hover:bg-primary hover:text-white">Presenta Visione <Share2 size={12} /></button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
