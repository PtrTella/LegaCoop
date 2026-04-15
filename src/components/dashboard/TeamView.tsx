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
  <span className="px-3 py-1 bg-surface-soft text-text-muted border border-border-subtle font-display font-black text-[9px] uppercase tracking-widest-plus rounded-xl shadow-sm">
    {skill}
  </span>
);

const EmptyFounderCard = ({ onSetup }: { onSetup: () => any; key?: React.Key }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={onSetup}
    className="box-testo cursor-pointer group flex flex-col items-center justify-center text-center space-y-6 min-h-60 bg-white"
  >
    <div className="w-14 h-14 bg-surface-soft rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
      <UserPlus className="w-6 h-6 text-primary/40 group-hover:text-primary" />
    </div>
    <div className="space-y-2">
      <h4 className="font-display font-black text-xl text-text-primary tracking-tight italic leading-none">Profilo Incompleto</h4>
      <p className="text-text-muted text-xs font-body leading-relaxed max-w-64">
        Attiva il tuo profilo founder per comparire nel database della community.
      </p>
    </div>
    <button className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-display font-black uppercase tracking-ultra flex items-center gap-2 shadow-lg shadow-primary/20 group-hover:shadow-glow transition-all">
      Configura <Zap className="w-3 h-3 fill-current" />
    </button>
  </motion.div>
);

const FounderCard = ({ profile, onEdit }: { profile: UserProfile; onEdit: () => any; key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="box-testo relative overflow-hidden group h-full bg-white"
  >
    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-5 mb-8">
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-primary rounded-2xl blur-md opacity-20 scale-110" />
          <img
            src={`https://picsum.photos/seed/${profile.avatarSeed}/120/120`}
            alt={profile.name}
            className="w-16 h-16 rounded-2xl object-cover relative z-10 border-4 border-white shadow-xl"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-warm rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-text-muted font-display font-black uppercase tracking-mega mb-2 px-2 py-0.5 bg-surface-soft rounded-full w-fit">Founder Hub</p>
          <h3 className="font-display font-black text-2xl text-text-primary tracking-tight leading-none italic truncate">{profile.name}</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-surface-soft/50 p-4 rounded-xl border border-border-subtle flex items-center gap-2.5">
           <MapPin size={12} className="text-primary/40" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-text-muted truncate">{profile.location}</span>
        </div>
        <div className="bg-surface-soft/50 p-4 rounded-xl border border-border-subtle flex items-center gap-2.5">
           <Clock size={12} className="text-primary/40" />
           <span className="text-[10px] font-display font-black uppercase tracking-widest-plus text-text-muted truncate">{profile.availability}</span>
        </div>
      </div>

      <div className="bg-surface-soft/30 p-5 rounded-3xl mb-8 relative group/vision border border-border-subtle grow">
        <MessageSquare className="absolute top-3 right-3 w-3 h-3 text-primary/20" />
        <p className="text-text-primary/70 font-body text-sm leading-relaxed italic">
          "{profile.vision}"
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-border-subtle">
        <div className="flex flex-wrap gap-1.5">
          {profile.skills?.slice(0, 2).map(skill => <SkillBadge key={skill} skill={skill} />)}
        </div>
        <button
          onClick={onEdit}
          className="shrink-0 p-2.5 bg-white text-text-muted rounded-xl hover:text-primary border border-border-subtle shadow-sm transition-all hover:scale-105"
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
      <div className="w-full mx-auto max-w-7xl space-y-12 pt-2 pb-10 px-0.5 sm:px-4 md:px-8 font-display">
        <SectionHeader 
          titleMain="L'Ecosistema"
          titleSuffix="Indicoo"
          description="Accedi a sessioni di advisory personalizzata e connettiti con l'ecosistema cooperativo."
        />

        {/* --- Section 1: Personal Hub & Strategic Connections --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-12 xl:col-span-7 h-full">
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

          <div className="lg:col-span-12 xl:col-span-5 h-full">
            <div className="bg-gradient-brand p-10 rounded-4xl text-white relative overflow-hidden group h-full flex flex-col justify-between shadow-ambient border border-white/10">
              <div className="absolute top-0 right-0 p-8 opacity-10 scale-150 rotate-12 transition-transform group-hover:rotate-0 pointer-events-none">
                 <Zap size={140} fill="white" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-white/70 rounded-2xl backdrop-blur-[40px] border border-white/10">
                    <Users size={20} className="text-white" />
                  </div>
                  <span className="font-display text-[10px] font-black uppercase tracking-mega text-white/60">Strategic Advisor</span>
                </div>
                <h3 className="text-4xl font-display font-black tracking-tighter italic leading-none mb-4">
                  Referente <span className="not-italic text-white opacity-40">Dedicato.</span>
                </h3>
                <p className="max-w-md text-white/70 font-body text-sm leading-relaxed mb-8">
                  Prenota sessioni di advisory personalizzata per accelerare il tuo percorso verso la maturità cooperativa.
                </p>
              </div>
              <button className="relative z-10 w-full md:w-fit px-10 py-5 bg-white text-text-primary rounded-2xl font-display font-black text-[10px] uppercase tracking-widest-plus hover:shadow-glow transition-all flex items-center justify-center gap-3 active:scale-95 group/btn">
                Prenota Sessione 
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Section 2: Unified Control Hub (Title + Switcher + Filters) --- */}
        <div className="space-y-6 md:space-y-10 pt-4">
          <div className="box-testo md:rounded-5xl p-6! md:p-10! relative overflow-hidden group bg-white">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-all duration-1000" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-glow shadow-accent/40" />
                  <p className="text-primary font-display font-black text-[10px] uppercase tracking-ultra">Ecosystem Hub</p>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tighter italic leading-none">
                  Esplora <span className="not-italic text-text-primary/20">Ecosistema.</span>
                </h2>
              </div>

              {/* Tab Switcher */}
              <div className="relative flex bg-surface-soft p-1.5 rounded-[1.8rem] border border-border-subtle w-full md:w-fit overflow-hidden shadow-inner shrink-0">
                <div 
                  className="absolute top-1.5 bottom-1.5 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) bg-gradient-brand rounded-2xl shadow-xl"
                  style={{
                    left: activeTab === 'individuals' ? '6px' : 'calc(50% + 3px)',
                    width: 'calc(50% - 9px)'
                  }}
                />
                <button 
                  onClick={() => setActiveTab('individuals')}
                  className={`relative z-10 flex-1 md:flex-none flex items-center justify-center gap-3 px-1 md:px-10 py-4 font-display font-black text-[10px] md:text-xs-tight uppercase tracking-widest transition-all duration-500 ${
                    activeTab === 'individuals' ? 'text-white' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <UserPlus size={16} className={`hidden xs:block ${activeTab === 'individuals' ? 'text-white' : 'text-text-muted'}`} /> Talenti
                </button>
                <button 
                  onClick={() => setActiveTab('cooperatives')}
                  className={`relative z-10 flex-1 md:flex-none flex items-center justify-center gap-3 px-1 md:px-10 py-4 font-display font-black text-[10px] md:text-xs-tight uppercase tracking-widest transition-all duration-500 ${
                    activeTab === 'cooperatives' ? 'text-white' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <Building2 size={16} className={`hidden xs:block ${activeTab === 'cooperatives' ? 'text-white' : 'text-text-muted'}`} /> Imprese
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
