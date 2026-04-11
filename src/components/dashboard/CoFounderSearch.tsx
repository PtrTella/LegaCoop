import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Zap, X, ChevronRight, Users, Loader2, MessageSquare, Search } from 'lucide-react';

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

// --- SKILL TAG ---

const SkillTag = React.memo(({ skill, highlighted = false }: { skill: string; highlighted?: boolean; key?: React.Key }) => (
  <span className={`px-2.5 py-1.5 rounded-lg font-display font-black text-[8px] uppercase tracking-widest-plus transition-all border ${
    highlighted 
      ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/20' 
      : 'bg-white/50 text-primary/40 border-white/40 hover:text-primary hover:bg-white'
  }`}>
    {skill}
  </span>
));

SkillTag.displayName = 'SkillTag';

// --- FILTER BUTTON ---

const FilterChip = React.memo(({ label, active, onClick }: { label: string; active: boolean; onClick: () => void; key?: React.Key }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-xl font-display font-black text-[8.5px] uppercase tracking-widest-plus shrink-0 transition-all border ${
      active
        ? 'bg-secondary text-white shadow-xl shadow-secondary/20 border-secondary scale-105'
        : 'bg-white/50 text-primary/40 hover:text-primary hover:bg-white border-border-subtle/50'
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
  key?: React.Key;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={() => onClick(profile)}
    className="bg-white/70 backdrop-blur-xl p-6 rounded-4xl shadow-ambient cursor-pointer group border border-white/50 hover:bg-white transition-all flex flex-col h-full min-h-65"
  >
    <div className="flex items-center gap-5 mb-6">
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-secondary rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
        <img
          src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
          alt={profile.name}
          className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform border-4 border-white relative z-10"
          loading="lazy"
        />
        {profile.badge && (
          <div className="absolute -top-2 -right-2 bg-gradient-accent w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-20">
             <Zap className="w-3 h-3 text-white fill-current" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-black text-primary text-xl tracking-tight leading-none italic group-hover:text-secondary transition-colors truncate">{profile.name}</h4>
        <p className="text-[9px] text-primary/30 font-display font-black uppercase tracking-widest-plus mt-1.5 px-2 py-0.5 bg-primary/5 rounded-full w-fit">{profile.role}</p>
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-between">
      <div className="flex items-center gap-4 text-primary/40 mb-5 px-1">
        <div className="flex items-center gap-2">
           <MapPin size={12} className="text-secondary/60" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus">{profile.location}</span>
        </div>
        <div className="flex items-center gap-2">
           <Clock size={12} className="text-secondary/60" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-secondary/70">{profile.availability}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="h-px bg-linear-to-r from-transparent via-border-subtle/50 to-transparent" />
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.slice(0, 3).map(skill => (
            <SkillTag key={skill} skill={skill} highlighted={activeSkills.includes(skill)} />
          ))}
          {profile.skills.length > 3 && (
            <span className="self-center px-1 text-[8px] font-display font-black text-primary/20 uppercase tracking-widest-plus">
              +{profile.skills.length - 3}
            </span>
          )}
        </div>
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
      className="modal-overlay z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 20 }}
        className="bg-white/95 backdrop-blur-3xl w-full max-w-xl rounded-5xl shadow-ambient overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-brand p-10 text-white relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white text-white hover:text-primary rounded-xl transition-all z-20 backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-8 relative z-10">
            <div className="relative shrink-0">
               <img
                src={`https://picsum.photos/seed/${profile.avatarSeed}/200/200`}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
              />
              {profile.badge && (
                <div className="absolute -top-2 -right-2 bg-gradient-accent p-1.5 rounded-full border-4 border-white shadow-xl">
                  <Zap className="w-4 h-4 text-white fill-current" />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-display font-black text-3xl tracking-tight leading-none italic">{profile.name}</h3>
              <p className="text-tertiary/80 font-display font-black text-[10px] uppercase tracking-mega mt-3 bg-white/10 rounded-full px-3 py-1.5 w-fit border border-white/10">{profile.role}</p>
            </div>
          </div>
        </div>

        <div className="p-10 space-y-10 overflow-y-auto max-h-[60vh] scrollbar-hide">
          <section className="space-y-3">
            <p className="text-[10px] text-secondary font-display font-black uppercase tracking-ultra">Visione</p>
            <div className="bg-surface-container-low/30 backdrop-blur-sm p-6 rounded-3xl border border-border-subtle/50 italic">
              <p className="text-primary/70 font-body leading-relaxed text-base">"{profile.vision}"</p>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-[10px] text-secondary font-display font-black uppercase tracking-ultra">Competenze</p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-white border border-border-subtle/50 text-primary shadow-sm font-display font-black text-[10px] uppercase tracking-widest-plus rounded-xl">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <motion.button
            whileHover={{ scale: sent ? 1 : 1.02, y: sent ? 0 : -2 }}
            whileTap={{ scale: sent ? 1 : 0.98 }}
            onClick={() => setSent(true)}
            disabled={sent}
            className={`w-full py-5 rounded-2xl font-display font-black text-xs uppercase tracking-widest-plus transition-all flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden ${
              sent 
                ? 'bg-secondary/10 text-secondary border border-secondary shadow-none cursor-default' 
                : 'bg-gradient-brand text-white shadow-secondary/20 hover:shadow-secondary/40'
            }`}
          >
            {sent ? 'Richiesta Inviata' : 'Inizia Connessione'}
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

  const allSkills = useMemo(() => Array.from(new Set(profiles.flatMap(p => p.skills))), [profiles]);
  
  const filtered = useMemo(
    () => activeSkills.length === 0 ? profiles : profiles.filter(p => activeSkills.some(s => p.skills.includes(s))),
    [profiles, activeSkills]
  );

  const toggleSkill = useCallback((skill: string) => {
    setActiveSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  }, []);

  const resetFilters = useCallback(() => setActiveSkills([]), []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3 text-primary/20 font-display font-black uppercase tracking-widest-plus text-[9px]">
        <Loader2 className="animate-spin h-5 w-5" />
        Accesso database...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Filters (Injected into Unified Header in TeamView) */}
      <div className="flex flex-wrap items-center gap-2">
        {allSkills.map(skill => (
          <FilterChip key={skill} label={skill} active={activeSkills.includes(skill)} onClick={() => toggleSkill(skill)} />
        ))}
        {activeSkills.length > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tertiary/10 font-display text-[9px] font-black uppercase tracking-widest-plus text-tertiary hover:bg-tertiary/20 transition-all border border-tertiary/10"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filtered.map(profile => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            activeSkills={activeSkills}
            onClick={(p) => {
              setSelectedProfile(p);
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProfile && (
          <ProfileDetail profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
