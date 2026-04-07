import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Edit3, Zap, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { FounderProfileModal } from './FounderProfileModal';
import { CoFounderSearch } from './CoFounderSearch';
import { UserProfile } from '../../types';

const SkillBadge = ({ skill }: { key?: React.Key; skill: string }) => (
  <span className="px-2.5 py-1 bg-secondary/10 text-secondary font-display font-black text-2xs uppercase tracking-widest-plus rounded-xl">
    {skill}
  </span>
);

const EmptyFounderCard = ({ onSetup }: { key?: React.Key; onSetup: () => void }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.01 }}
    onClick={onSetup}
    className="bg-surface-container-lowest p-8 rounded-5xl shadow-ambient cursor-pointer group border-2 border-dashed border-primary/10 hover:border-secondary/30 transition-all flex flex-col items-center justify-center text-center space-y-5 min-h-55"
  >
    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
      <Edit3 className="w-7 h-7 text-secondary" />
    </div>
    <div>
      <h4 className="font-display font-black text-xl text-primary tracking-tight italic leading-none">Completa il Tuo Profilo</h4>
      <p className="text-primary/40 text-sm font-body mt-2 leading-relaxed max-w-sm">
        Crea il tuo profilo founder per sbloccare il matchmaking cooperativo e connetterti con altri visionari.
      </p>
    </div>
    <span className="text-[10px] font-display font-black text-secondary uppercase tracking-ultra flex items-center gap-1">
      Inizia ora <Zap className="w-3.5 h-3.5" />
    </span>
  </motion.div>
);

const FounderCard = ({ profile, onEdit }: { key?: React.Key; profile: UserProfile; onEdit: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface-container-lowest p-6 rounded-5xl shadow-ambient relative overflow-hidden group border border-border-subtle"
  >
    {/* Background Glow */}
    <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all" />
    
    <div className="relative z-10">
      {/* Header Row */}
      <div className="flex items-start gap-5 mb-5">
        <div className="relative">
          <img
            src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
            alt={profile.name}
            className="w-16 h-16 rounded-2xl object-cover shadow-xl border-2 border-white"
          />
          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-secondary font-display font-black uppercase tracking-ultra mb-1">Il Tuo Profilo</p>
          <h3 className="font-display font-black text-2xl text-primary tracking-tight leading-none italic">{profile.name}</h3>
          <p className="text-primary/50 font-display font-bold text-[10px] uppercase tracking-widest-plus mt-2">{profile.role}</p>
        </div>
        <button
          onClick={onEdit}
          className="p-2.5 bg-surface-container-low rounded-xl hover:bg-secondary/10 transition-all group/edit"
        >
          <Edit3 className="w-4.5 h-4.5 text-primary/30 group-hover/edit:text-secondary" />
        </button>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-5 mb-5">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs font-body text-primary/60">{profile.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-secondary" />
          <span className="text-xs font-body text-primary/60">{profile.availability}</span>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-surface-container-low/50 p-5 rounded-2xl mb-5 italic">
        <p className="text-primary/60 font-body text-sm leading-relaxed">
          "{profile.vision}"
        </p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {profile.skills.map(skill => <SkillBadge key={skill} skill={skill} />)}
      </div>
    </div>
  </motion.div>
);

export const TeamView = () => {
  const { state, updateUserProfile } = useAppContext();
  const { userProfile } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (profile: UserProfile) => {
    updateUserProfile(profile);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-12 py-8 px-2">
        {/* Page Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Zap className="text-secondary w-4.5 h-4.5" />
            </div>
            <p className="font-display text-[10px] font-black uppercase tracking-mega text-secondary">Capitale Umano</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black italic leading-[0.9] tracking-tighter text-primary">
            Il Tuo Team <span className="text-secondary">Cooperativo</span>
          </h1>
          <p className="max-w-2xl font-body text-base leading-relaxed text-primary/50">
            La forza della visione cooperativa risiede nella mutualità delle competenze. Trova i tuoi co-founder ideali nel database Legacoop.
          </p>
        </div>

        {/* Founder Card Section */}
        <div>
          <AnimatePresence mode="wait">
            {userProfile ? (
              <FounderCard
                key="founder-card"
                profile={userProfile}
                onEdit={() => setIsModalOpen(true)}
              />
            ) : (
              <EmptyFounderCard
                key="empty-card"
                onSetup={() => setIsModalOpen(true)}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="relative pt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-muted" />
          </div>
          <div className="relative flex justify-center">
            <span className="rounded-full bg-surface-container-low border border-border-subtle px-6 py-2 font-display text-[10px] font-black uppercase tracking-ultra text-primary/40 shadow-sm">
              Matchmaking Cooperativo
            </span>
          </div>
        </div>

        {/* Co-Founder Search */}
        <CoFounderSearch />
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <FounderProfileModal
            initialProfile={userProfile}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
