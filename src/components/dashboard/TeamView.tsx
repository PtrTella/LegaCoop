import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Edit3, Zap, CheckCircle2, Users, Building2, ChevronRight, UserPlus, MessageSquare } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { FounderProfileModal } from './FounderProfileModal';
import { CoFounderSearch } from './CoFounderSearch';
import { CooperativeNetworking } from './CooperativeNetworking';
import { UserProfile } from '../../types';

const SkillBadge = ({ skill }: { skill: string; key?: React.Key }) => (
  <span className="px-3 py-1 bg-white/40 backdrop-blur-md text-primary/70 border border-white/20 font-display font-black text-[9px] uppercase tracking-widest-plus rounded-xl shadow-sm">
    {skill}
  </span>
);

const EmptyFounderCard = ({ onSetup }: { onSetup: () => any; key?: React.Key }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={onSetup}
    className="bg-white/60 backdrop-blur-xl p-6 rounded-4xl shadow-ambient cursor-pointer group border border-white/50 hover:border-secondary/30 transition-all flex flex-col items-center justify-center text-center space-y-4 min-h-[240px]"
  >
    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
      <UserPlus className="w-6 h-6 text-secondary" />
    </div>
    <div className="space-y-1">
      <h4 className="font-display font-black text-lg text-primary tracking-tight italic leading-none">Profilo Incompleto</h4>
      <p className="text-primary/40 text-[10px] font-body leading-relaxed max-w-empty-card-min-h">
        Attiva il tuo profilo founder per comparire nel database.
      </p>
    </div>
    <span className="px-4 py-2 bg-secondary text-white rounded-xl text-[9px] font-display font-black uppercase tracking-ultra flex items-center gap-2 shadow-lg shadow-secondary/20 group-hover:shadow-secondary/40 transition-all">
      Configura <Zap className="w-3 h-3 fill-current" />
    </span>
  </motion.div>
);

const FounderCard = ({ profile, onEdit }: { profile: UserProfile; onEdit: () => any; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white/80 backdrop-blur-2xl p-6 rounded-4xl shadow-ambient relative overflow-hidden group border border-white/50 h-full"
  >
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all" />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-5 mb-6">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-gradient-brand rounded-2xl blur-md opacity-20 scale-110" />
          <img
            src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
            alt={profile.name}
            className="w-16 h-16 rounded-2xl object-cover relative z-10 border-4 border-white shadow-xl"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-brand rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white">
            <CheckCircle2 className="w-3 h-3 text-tertiary" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9px] text-secondary font-display font-black uppercase tracking-mega mb-1 px-2 py-0.5 bg-secondary/5 rounded-full w-fit">Founder Hub</p>
          <h3 className="font-display font-black text-xl text-primary tracking-tight leading-none italic truncate">{profile.name}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface-container-low/40 p-3 rounded-xl border border-white/20 flex items-center gap-2.5">
           <MapPin size={12} className="text-secondary/60" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-primary/60 truncate">{profile.location}</span>
        </div>
        <div className="bg-surface-container-low/40 p-3 rounded-xl border border-white/20 flex items-center gap-2.5">
           <Clock size={12} className="text-secondary/60" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-primary/60 truncate">{profile.availability}</span>
        </div>
      </div>

      <div className="bg-linear-to-br from-secondary/5 to-primary/5 p-4 rounded-3xl mb-6 relative group/vision border border-white/20 grow">
        <MessageSquare className="absolute top-3 right-3 w-3 h-3 text-secondary/20" />
        <p className="text-primary/60 font-body text-xs leading-relaxed italic line-clamp-2">
          "{profile.vision}"
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-white/20">
        <div className="flex flex-wrap gap-1.5">
          {profile.skills?.slice(0, 2).map(skill => <SkillBadge key={skill} skill={skill} />)}
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 p-2.5 bg-white/80 text-primary/40 rounded-xl hover:text-secondary hover:bg-white shadow-sm border border-white/50 transition-all hover:scale-105"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

export const TeamView = () => {
  const { state, updateUserProfile } = useAppContext();
  const { userProfile } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab ] = useState<'individuals' | 'cooperatives'>('individuals');
  
  // Lifted state for synchronization
  const [talentFilters, setTalentFilters] = useState<string[]>([]);
  const [coopFilters, setCoopFilters] = useState<string[]>([]);

  const toggleTalentFilter = (f: string) => setTalentFilters(prev => 
    prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
  );
  const toggleCoopFilter = (f: string) => setCoopFilters(prev => 
    prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
  );

  const handleSave = (profile: UserProfile) => {
    updateUserProfile(profile);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-12 pt-2 pb-10 px-4 md:px-8">
        <SectionHeader 
          preTitle="Hub di Sistema"
          titleMain="Networking"
          titleSuffix="Hub"
          description="Accedi a sessioni di advisory personalizzata e connettiti con l'ecosistema cooperativo."
        />

        {/* --- Section 1: Personal Hub & Strategic Connections --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 h-full">
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

          <div className="lg:col-span-5 h-full">
            <div className="bg-gradient-brand p-8 rounded-4xl text-white relative overflow-hidden group h-full flex flex-col justify-between shadow-ambient">
              <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0 pointer-events-none">
                 <Zap size={140} fill="white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                    <Users size={20} className="text-tertiary" />
                  </div>
                  <span className="font-display text-[10px] font-black uppercase tracking-mega text-tertiary">Strategic Advisor</span>
                </div>
                <h3 className="text-3xl font-display font-black tracking-tight italic leading-none mb-4">
                  Referente <span className="text-tertiary">Dedicato.</span>
                </h3>
                <p className="max-w-md text-white/70 font-body text-xs leading-relaxed mb-8">
                  Prenota advisory personalizzata per accelerare il tuo percorso.
                </p>
              </div>
              <button className="relative z-10 w-full md:w-fit px-8 py-4 bg-white text-primary rounded-xl font-display font-black text-[10px] uppercase tracking-widest-plus hover:shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95 group/btn border border-white/50">
                Prenota Sessione 
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Section 2: Unified Control Hub (Title + Switcher + Filters) --- */}
        <div className="space-y-10 pt-4">
          <div className="bg-white/40 backdrop-blur-xl rounded-5xl border border-white/50 p-6 md:p-10 shadow-ambient space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-all duration-1000" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-lg shadow-secondary/40" />
                  <p className="text-secondary font-display font-black text-[10px] uppercase tracking-mega">Ecosystem Hub</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-primary tracking-tighter italic leading-none">
                  Esplora <span className="not-italic text-primary/20">Ecosistema.</span>
                </h2>
              </div>

              {/* Tab Switcher */}
              <div className="relative flex bg-secondary/10 backdrop-blur-xl p-1.5 rounded-[1.8rem] border border-secondary/20 w-full md:w-fit overflow-hidden shadow-inner shrink-0">
                <div 
                  className="absolute top-1.5 bottom-1.5 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) bg-white rounded-2xl shadow-xl border border-white/50"
                  style={{
                    left: activeTab === 'individuals' ? '6px' : 'calc(50% + 3px)',
                    width: 'calc(50% - 9px)'
                  }}
                />
                <button 
                  onClick={() => setActiveTab('individuals')}
                  className={`relative z-10 flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 font-display font-black text-[11px] uppercase tracking-widest transition-all duration-500 ${
                    activeTab === 'individuals' ? 'text-primary scale-105' : 'text-primary/30 hover:text-primary/60'
                  }`}
                >
                  <UserPlus size={18} className={activeTab === 'individuals' ? 'text-secondary' : ''} /> Talenti
                </button>
                <button 
                  onClick={() => setActiveTab('cooperatives')}
                  className={`relative z-10 flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 font-display font-black text-[11px] uppercase tracking-widest transition-all duration-500 ${
                    activeTab === 'cooperatives' ? 'text-primary scale-105' : 'text-primary/30 hover:text-primary/60'
                  }`}
                >
                  <Building2 size={18} className={activeTab === 'cooperatives' ? 'text-secondary' : ''} /> Imprese
                </button>
              </div>
            </div>

            {/* Integrated Filters inside the box */}
            <div className="relative z-10 pt-4 border-t border-primary/5">
              <AnimatePresence mode="wait">
                {activeTab === 'individuals' ? (
                  <motion.div
                    key="filters-individuals"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CoFounderSearch 
                      renderFiltersOnly 
                      activeFilters={talentFilters}
                      onToggleFilter={toggleTalentFilter}
                      onReset={() => setTalentFilters([])}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="filters-cooperatives"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CooperativeNetworking 
                      renderFiltersOnly 
                      activeFilters={coopFilters}
                      onToggleFilter={toggleCoopFilter}
                      onReset={() => setCoopFilters([])}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Grid - Slegata Logic (Outside the box) */}
          {/* Stable container to prevent page collapse during popLayout transitions */}
          <div className="relative min-h-200">
            <AnimatePresence mode="popLayout" initial={false}>
              {activeTab === 'individuals' ? (
                <motion.div
                  key="grid-individuals"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full"
                >
                  <CoFounderSearch 
                    renderGridOnly 
                    activeFilters={talentFilters}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="grid-cooperatives"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full"
                >
                  <CooperativeNetworking 
                    renderGridOnly 
                    activeFilters={coopFilters}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
