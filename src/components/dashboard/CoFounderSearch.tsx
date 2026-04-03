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

const SkillTag = ({ skill, highlighted = false }: { key?: React.Key; skill: string; highlighted?: boolean }) => (
  <span className={`px-2.5 py-1 rounded-lg font-display font-black text-[9px] uppercase tracking-wider transition-colors ${
    highlighted ? 'bg-secondary/15 text-secondary' : 'bg-surface-container-low text-primary/40'
  }`}>
    {skill}
  </span>
);

// --- FILTER BUTTON ---

const FilterChip = ({ label, active, onClick }: { key?: React.Key; label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-xl font-display font-black text-[10px] uppercase tracking-wider transition-colors ${
      active
        ? 'bg-secondary text-white shadow-md shadow-secondary/20'
        : 'bg-surface-container-low text-primary/50 hover:text-primary'
    }`}
  >
    {label}
  </button>
);

// --- PROFILE CARD ---

const ProfileCard = ({ profile, activeSkills, onClick }: {
  key?: React.Key;
  profile: CoFounderProfile;
  activeSkills: string[];
  onClick: () => void;
}) => (
  <motion.div
    layout="position"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.18 }}
    whileHover={{ y: -3 }}
    onClick={onClick}
    className="bg-surface-container-lowest p-5 rounded-4xl shadow-ambient cursor-pointer group border border-transparent hover:border-secondary/10 transition-[border-color,box-shadow] flex flex-col"
  >
    <div className="flex items-start gap-4">
      <img
        src={`https://picsum.photos/seed/${profile.avatarSeed}/80/80`}
        alt={profile.name}
        className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300 shrink-0"
      />
      <div className="flex-1 min-w-0">
        {profile.badge && (
          <span className="text-[8px] font-display font-black text-secondary uppercase tracking-widest">{profile.badge}</span>
        )}
        <h4 className="font-display font-black text-primary text-base tracking-tight leading-tight">{profile.name}</h4>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 text-primary/30 shrink-0" />
          <span className="text-[10px] text-primary/40 font-body truncate">{profile.location}</span>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-primary/20 group-hover:text-secondary group-hover:translate-x-1 transition-all mt-1 shrink-0" />
    </div>

    <div className="mt-4 flex flex-wrap gap-1.5 flex-1 content-start">
      {profile.skills.slice(0, 3).map(skill => (
        <SkillTag key={skill} skill={skill} highlighted={activeSkills.includes(skill)} />
      ))}
      {profile.skills.length > 3 && (
        <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-primary/30 font-display font-black text-[9px] uppercase tracking-wider">
          +{profile.skills.length - 3}
        </span>
      )}
    </div>

    <div className="mt-4 pt-3 border-t border-primary/5 flex items-center gap-1.5">
      <Clock className="w-3 h-3 text-primary/20" />
      <span className="text-[10px] text-primary/30 font-body">{profile.availability}</span>
    </div>
  </motion.div>
);

// --- PROFILE DETAIL MODAL ---

const ProfileDetail = ({ profile, onClose }: { profile: CoFounderProfile; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 bg-primary/40 backdrop-blur-[8px] z-[100] flex items-center justify-center p-4"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <motion.div
      initial={{ scale: 0.94, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.94, y: 20 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="bg-white w-full max-w-lg rounded-5xl shadow-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-br from-primary to-primary-container p-8 text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors z-10 flex items-center justify-center"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-6 relative z-10">
          <img
            src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
            alt={profile.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
          />
          <div>
            {profile.badge && (
              <span className="text-[9px] font-display font-black uppercase tracking-widest text-tertiary mb-1 block">{profile.badge}</span>
            )}
            <h3 className="font-display font-black text-2xl tracking-tight">{profile.name}</h3>
            <p className="text-white/60 font-display font-bold text-xs uppercase tracking-widest mt-1">{profile.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 relative z-10">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
            <MapPin className="w-3 h-3 text-tertiary" />
            <span className="text-xs font-display font-bold text-white/80">{profile.location}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
            <Clock className="w-3 h-3 text-tertiary" />
            <span className="text-xs font-display font-bold text-white/80">{profile.availability}</span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div>
          <p className="text-[9px] text-secondary font-display font-black uppercase tracking-[0.3em] mb-3">Visione Cooperativa</p>
          <p className="text-primary/70 font-body leading-relaxed text-base italic">"{profile.vision}"</p>
        </div>
        <div>
          <p className="text-[9px] text-secondary font-display font-black uppercase tracking-[0.3em] mb-3">Competenze</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-secondary/10 text-secondary font-display font-black text-[10px] uppercase tracking-wider rounded-xl">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-br from-secondary to-primary text-white font-display font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-secondary/20 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Invia richiesta di connessione
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

// --- MAIN COMPONENT ---

export const CoFounderSearch = () => {
  const [profiles, setProfiles] = useState<CoFounderProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<CoFounderProfile | null>(null);

  useEffect(() => {
    fetch('/data/team.json')
      .then(res => res.json())
      .then((data: CoFounderProfile[]) => { setProfiles(data); setLoading(false); })
      .catch(() => setLoading(false));
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-2xl flex items-center justify-center">
            <Users className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <p className="text-[9px] text-secondary font-display font-black uppercase tracking-[0.3em]">Database Cooperativo</p>
            <h3 className="font-display font-black text-xl text-primary tracking-tight italic">Cerca Co-Founder</h3>
          </div>
        </div>
        <span className="text-[10px] font-display font-black text-primary/30 uppercase tracking-widest">
          {loading ? '–' : `${filtered.length} profili`}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 gap-3 text-primary/30">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-xs font-display font-black uppercase tracking-widest">Caricamento profili...</span>
        </div>
      ) : (
        <>
          {/* Skill Filters */}
          <div>
            <p className="text-[9px] text-primary/30 font-display font-black uppercase tracking-widest mb-3">Filtra per competenza</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <FilterChip key={skill} label={skill} active={activeSkills.includes(skill)} onClick={() => toggleSkill(skill)} />
              ))}
              {activeSkills.length > 0 && (
                <button
                  onClick={() => setActiveSkills([])}
                  className="px-3 py-1.5 rounded-xl font-display font-black text-[10px] uppercase tracking-wider text-tertiary bg-tertiary/10 flex items-center gap-1 transition-colors hover:bg-tertiary/20"
                >
                  <X className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Grid — motion.div with layout so the container reshapes smoothly */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(profile => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  activeSkills={activeSkills}
                  onClick={() => setSelectedProfile(profile)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-primary/30 font-display font-black text-lg italic">Nessun profilo con queste competenze.</p>
              <button onClick={() => setActiveSkills([])} className="mt-3 text-secondary font-display font-black text-xs uppercase tracking-widest underline underline-offset-4">
                Rimuovi filtri
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
