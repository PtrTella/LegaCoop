import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Zap, X, ChevronRight, Users, Loader2 } from 'lucide-react';

// --- TYPES ---

export interface CoFounderProfile {
  id: number;
  name: string;
  location: string;
  role: string;
  skills: string[];
  vision: string;
  availability: string;
  avatarSeed: string;
  badge?: string;
}

// --- SKILL BADGE (shared between card & detail) ---

const SkillTag = React.memo(({ skill, highlighted = false }: { skill: string; highlighted?: boolean }) => (
  <span className={`px-2.5 py-1 rounded-lg font-display font-black text-2xs uppercase tracking-widest-plus ${
    highlighted ? 'bg-secondary/15 text-secondary' : 'bg-surface-container-low text-primary/40'
  }`}>
    {skill}
  </span>
));

SkillTag.displayName = 'SkillTag';

// --- FILTER BUTTON ---

const FilterChip = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl font-display font-black text-2xs uppercase tracking-widest-plus shrink-0 active:scale-95 ${
      active
        ? 'bg-secondary text-white shadow-md shadow-secondary/20'
        : 'bg-surface-container-low text-primary/40 hover:bg-surface-container'
    }`}
  >
    {label}
  </button>
));

FilterChip.displayName = 'FilterChip';

// --- PROFILE CARD ---

const ProfileCard = React.memo(({ profile, activeSkills, onClick }: {
  profile: CoFounderProfile;
  activeSkills: string[];
  onClick: (p: CoFounderProfile) => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
    whileHover={{ y: -4 }}
    onClick={() => onClick(profile)}
    className="bg-surface-container-lowest p-6 rounded-4xl shadow-ambient cursor-pointer group border border-transparent hover:border-secondary/20 flex flex-col h-full min-h-(--spacing-card-min-h)"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="relative shrink-0">
        <img
          src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
          alt={profile.name}
          className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 border-2 border-white"
          loading="lazy"
        />
        {profile.badge && (
          <div className="absolute -top-1.5 -right-1.5 bg-gradient-accent w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
             <Zap className="w-2.5 h-2.5 text-white fill-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-black text-primary text-lg tracking-tighter leading-none italic truncate">{profile.name}</h4>
        <p className="text-[10px] text-primary/40 font-display font-black uppercase tracking-widest-plus mt-1.5">{profile.role}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-primary/10 group-hover:text-secondary group-hover:translate-x-1 shrink-0" />
    </div>

    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-primary/40">
           <MapPin className="w-3 h-3" />
           <span className="text-2xs font-display font-black uppercase tracking-widest-plus">{profile.location}</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-primary/10" />
        <div className="flex items-center gap-1.5 text-secondary/60">
           <Clock className="w-3 h-3" />
           <span className="text-2xs font-display font-black uppercase tracking-widest-plus">{profile.availability}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {profile.skills.slice(0, 3).map(skill => (
          <SkillTag key={skill} skill={skill} highlighted={activeSkills.includes(skill)} />
        ))}
        {profile.skills.length > 3 && (
          <span className="px-2 py-1 rounded-lg bg-surface-container-low text-primary/20 font-display font-black text-2xs uppercase tracking-widest-plus">
            +{profile.skills.length - 3}
          </span>
        )}
      </div>
    </div>
  </motion.div>
));

ProfileCard.displayName = 'ProfileCard';

// --- PROFILE DETAIL MODAL ---

const ProfileDetail = ({ profile, onClose }: { profile: CoFounderProfile; onClose: () => void }) => {
  const [sent, setSent] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="bg-surface-container-lowest w-full max-w-lg rounded-5xl shadow-ambient overflow-hidden"
      >
        <div className="bg-gradient-brand p-8 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl z-0" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl z-0" />
          <button
            onClick={(e) => { 
              e.preventDefault();
              e.stopPropagation(); 
              onClose(); 
            }}
            className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all z-50 flex items-center justify-center group active:scale-95"
          >
            <X className="w-5 h-5 text-white transition-transform group-hover:rotate-90" />
          </button>
          <div className="flex items-center gap-8 relative z-10">
            <img
              src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
              alt={profile.name}
              className="w-20 h-20 rounded-3xl object-cover border-4 border-white/10 shadow-2xl"
            />
            <div>
              {profile.badge && (
                <span className="text-3xs font-display font-black uppercase tracking-ultra text-tertiary mb-1.5 block">{profile.badge}</span>
              )}
              <h3 className="font-display font-black text-3xl tracking-tight leading-none italic">{profile.name}</h3>
              <p className="text-white/60 font-display font-bold text-xs-tight uppercase tracking-widest-plus mt-3">{profile.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5 mt-6 relative z-10">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <MapPin className="w-3 h-3 text-tertiary" />
              <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-white/90">{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <Clock className="w-3 h-3 text-tertiary" />
              <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-white/90">{profile.availability}</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <p className="text-xs-tight text-secondary font-display font-black uppercase tracking-ultra mb-4">Visione Cooperativa</p>
            <div className="bg-surface-container-low/50 p-6 rounded-3xl italic">
              <p className="text-primary/70 font-body leading-relaxed text-base">"{profile.vision}"</p>
            </div>
          </div>
          <div>
            <p className="text-xs-tight text-secondary font-display font-black uppercase tracking-ultra mb-4">Competenze</p>
            <div className="flex flex-wrap gap-2.5">
              {profile.skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-secondary/10 text-secondary font-display font-black text-xs-tight uppercase tracking-widest-plus rounded-xl border border-secondary/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: sent ? 1 : 1.02, y: sent ? 0 : -2 }}
            whileTap={{ scale: sent ? 1 : 0.98 }}
            onClick={() => setSent(true)}
            className={`w-full py-5 font-display font-black text-xs-tight uppercase tracking-widest-plus rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${
              sent 
                ? 'bg-gradient-brand text-white shadow-secondary/10 opacity-90' 
                : 'bg-gradient-accent-reverse text-white shadow-secondary/20 hover:shadow-secondary/30'
            }`}
          >
            {sent ? (
              <>
                <Zap className="w-5 h-5 fill-tertiary text-tertiary" />
                Richiesta inviata correttamente
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Invia richiesta di connessione
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---

export const CoFounderSearch = () => {
  const [profiles, setProfiles] = useState<CoFounderProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<CoFounderProfile | null>(null);

  useEffect(() => {
    fetch('/data/team.json')
      .then(res => res.json())
      .then((data: { members: CoFounderProfile[] }) => {
        setProfiles(data.members || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[CoFounderSearch] Failed to load team.json:', err);
        setLoading(false);
      });
  }, []);

  // Memoized: only recompute when profiles/activeSkills change
  const allSkills = useMemo(() => Array.from(new Set(profiles.flatMap(p => p.skills))), [profiles]);
  
  const filtered = useMemo(
    () => activeSkills.length === 0 ? profiles : profiles.filter(p => activeSkills.some(s => p.skills.includes(s))),
    [profiles, activeSkills]
  );

  const toggleSkill = useCallback((skill: string) => {
    setActiveSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  }, []);

  const handleProfileSelect = useCallback((profile: CoFounderProfile) => {
    setSelectedProfile(profile);
  }, []);

  const resetFilters = useCallback(() => setActiveSkills([]), []);

  return (
    <div className="space-y-10">
      {/* Unified Search Header & Filters */}
      <div className="bg-surface-container-low/20 rounded-5xl border border-border-subtle/50 p-6 md:p-8 space-y-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 shadow-sm border border-secondary/5">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="font-display text-[10px] font-black uppercase tracking-mega text-secondary">Database Cooperativo</p>
              <h3 className="font-display text-xl font-black italic tracking-tighter text-primary">Cerca Co-Founder</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-[9px] font-black uppercase tracking-widest-plus text-primary/30 bg-white/50 px-3.5 py-1.5 rounded-full border border-border-subtle">
              {loading ? '–' : `${filtered.length} profili trovati`}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-display text-[10px] font-black uppercase tracking-ultra text-primary/30 ml-1">Filtra per competenza</p>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 md:pb-0 md:flex-wrap md:overflow-visible scrollbar-hide">
            {allSkills.map(skill => (
              <FilterChip key={skill} label={skill} active={activeSkills.includes(skill)} onClick={() => toggleSkill(skill)} />
            ))}
            {activeSkills.length > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 rounded-xl bg-tertiary/10 px-4 py-2 font-display text-2xs font-black uppercase tracking-widest-plus text-tertiary transition-all hover:bg-tertiary/20 shrink-0"
              >
                <X className="h-4 w-4" /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-4 py-32 text-primary/20 bg-surface-container-low/10 rounded-5xl border border-dashed border-border-subtle">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-display text-xs-tight font-black uppercase tracking-widest-plus">Caricamento database...</span>
        </div>
      ) : (
        <>
          {/* Grid — Optimized motion.div */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 min-h-100">
            {filtered.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                activeSkills={activeSkills}
                onClick={handleProfileSelect}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center">
              <p className="font-display text-2xl font-black italic text-primary/20">Nessun profilo trovato</p>
              <button onClick={resetFilters} className="mt-4 font-display text-xs-tight font-black uppercase tracking-widest-plus text-secondary hover:underline underline-offset-8 transition-all">
                Rimuovi tutti i filtri
              </button>
            </motion.div>
          )}
        </>
      )}

      <AnimatePresence>
        {selectedProfile && (
          <ProfileDetail profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
