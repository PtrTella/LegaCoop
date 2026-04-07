import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles, Loader2 } from 'lucide-react';
import { UserProfile } from '../../types';

interface Props {
  initialProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
}

interface TeamConfig {
  roles: string[];
  skills: string[];
  availability: { label: string; desc: string }[];
  seeds: string[];
  steps: { title: string; subtitle: string }[];
}

export const FounderProfileModal = ({ initialProfile, onSave, onClose }: Props) => {
  const [config, setConfig] = useState<TeamConfig | null>(null);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: initialProfile?.name ?? '',
    location: initialProfile?.location ?? '',
    role: initialProfile?.role ?? '',
    skills: initialProfile?.skills ?? [],
    vision: initialProfile?.vision ?? '',
    availability: initialProfile?.availability ?? '',
    avatarSeed: initialProfile?.avatarSeed ?? '',
  });

  useEffect(() => {
    fetch('/data/team.json')
      .then(res => res.json())
      .then(data => {
        const teamConfig = data.config as TeamConfig;
        setConfig(teamConfig);
        
        // Handle initial avatar seed if not provided and seeds are loaded
        if (!initialProfile?.avatarSeed && teamConfig.seeds.length > 0) {
          setProfile(prev => ({
            ...prev,
            avatarSeed: teamConfig.seeds[Math.floor(Math.random() * teamConfig.seeds.length)]
          }));
        }
      })
      .catch(err => console.error('[FounderProfileModal] Failed to load config:', err));
  }, [initialProfile]);

  const toggleSkill = (skill: string) => {
    setProfile(prev => {
      const current = prev.skills ?? [];
      if (current.includes(skill)) return { ...prev, skills: current.filter(s => s !== skill) };
      if (current.length >= 5) return prev;
      return { ...prev, skills: [...current, skill] };
    });
  };

  const canProceed = () => {
    if (!config) return false;
    switch (step) {
      case 0: return (profile.name?.trim().length ?? 0) > 1 && (profile.location?.trim().length ?? 0) > 1;
      case 1: return !!profile.role;
      case 2: return (profile.skills?.length ?? 0) >= 1;
      case 3: return (profile.vision?.trim().length ?? 0) > 10;
      case 4: return !!profile.availability;
      default: return false;
    }
  };

  const handleNext = () => {
    if (!config) return;
    if (step < config.steps.length - 1) setStep(prev => prev + 1);
    else onSave(profile as UserProfile);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 20 }}
        className="bg-surface-container-lowest w-full max-w-xl rounded-5xl shadow-ambient overflow-hidden"
      >
        {!config ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-secondary animate-spin" />
            <p className="text-xs-tight font-display font-black uppercase tracking-widest-plus text-primary/40">Inizializzazione Setup...</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-8 pb-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-accent-reverse rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-secondary font-display font-black uppercase tracking-mega">
                    Step {step + 1} / {config.steps.length}
                  </p>
                  <h2 className="text-2xl font-display font-black text-primary tracking-tight leading-tight">
                    {config.steps[step].title}
                  </h2>
                </div>
              </div>
              <button onClick={onClose} className="btn-icon">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-8 mb-6">
              <div className="h-1 bg-surface-container-low rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-accent-reverse rounded-full"
                  animate={{ width: `${((step + 1) / config.steps.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                />
              </div>
              <p className="text-primary/40 text-xs-tight font-body mt-2">{config.steps[step].subtitle}</p>
            </div>

            {/* Step Content */}
            <div className="px-8 pb-8 min-h-60">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Step 0: Nome + Città */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs-tight font-display font-black uppercase tracking-widest-plus text-primary/40 mb-2 block">Nome Completo</label>
                        <input
                          autoFocus
                          type="text"
                          value={profile.name}
                          onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Es. Marco Bianchi"
                          className="w-full px-5 py-4 bg-surface-container-low rounded-2xl text-primary font-body focus:outline-none focus:ring-2 focus:ring-secondary/20 text-sm-alt"
                        />
                      </div>
                      <div>
                        <label className="text-xs-tight font-display font-black uppercase tracking-widest-plus text-primary/40 mb-2 block">Città / Regione</label>
                        <input
                          type="text"
                          value={profile.location}
                          onChange={e => setProfile(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Es. Bologna, Emilia-Romagna"
                          className="w-full px-5 py-4 bg-surface-container-low rounded-2xl text-primary font-body focus:outline-none focus:ring-2 focus:ring-secondary/20 text-sm-alt"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 1: Ruolo */}
                  {step === 1 && (
                    <div className="flex flex-wrap gap-3">
                      {config.roles.map(role => (
                        <button
                          key={role}
                          onClick={() => setProfile(prev => ({ ...prev, role }))}
                          className={`px-4 py-3 rounded-2xl font-display font-black text-xs-tight uppercase tracking-widest-plus transition-all ${
                            profile.role === role
                              ? 'bg-primary text-white shadow-lg shadow-primary/20'
                              : 'bg-surface-container-low text-primary/60 hover:bg-surface-container'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 2: Skills */}
                  {step === 2 && (
                    <div>
                      <div className="flex flex-wrap gap-2">
                        {config.skills.map(skill => {
                          const isSelected = profile.skills?.includes(skill);
                          const maxReached = (profile.skills?.length ?? 0) >= 5 && !isSelected;
                          return (
                            <button
                              key={skill}
                              onClick={() => toggleSkill(skill)}
                              disabled={maxReached}
                              className={`px-3 py-2 rounded-xl font-display font-black text-xs-tight uppercase tracking-widest-plus transition-all ${
                                isSelected
                                  ? 'bg-secondary text-white shadow-md shadow-secondary/20'
                                  : maxReached
                                    ? 'bg-surface-container-low text-primary/20 cursor-not-allowed'
                                    : 'bg-surface-container-low text-primary/50 hover:text-primary'
                              }`}
                            >
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs-tight text-primary/30 font-display font-black uppercase tracking-widest-plus mt-4">
                        {profile.skills?.length ?? 0} / 5 competenze selezionate
                      </p>
                    </div>
                  )}

                  {/* Step 3: Visione */}
                  {step === 3 && (
                    <div>
                      <textarea
                        autoFocus
                        value={profile.vision}
                        onChange={e => setProfile(prev => ({ ...prev, vision: e.target.value }))}
                        placeholder="Es. Voglio creare una cooperativa di comunità energetica nelle aree rurali dell'Emilia, mettendo in rete piccoli agricoltori e ridistribuendo il surplus energetico..."
                        rows={5}
                        className="w-full px-5 py-4 bg-surface-container-low rounded-2xl text-primary font-body focus:outline-none focus:ring-2 focus:ring-secondary/20 text-sm-alt resize-none leading-relaxed"
                      />
                      <p className="text-[10px] text-primary/30 mt-2 text-right font-display font-black uppercase tracking-widest-plus">
                        {profile.vision?.length ?? 0} caratteri
                      </p>
                    </div>
                  )}

                  {/* Step 4: Disponibilità */}
                  {step === 4 && (
                    <div className="space-y-3">
                      {config.availability.map(({ label, desc }) => (
                        <button
                          key={label}
                          onClick={() => setProfile(prev => ({ ...prev, availability: label }))}
                          className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-left ${
                            profile.availability === label
                              ? 'bg-primary text-white shadow-lg shadow-primary/20'
                              : 'bg-surface-container-low text-primary hover:bg-surface-container'
                          }`}
                        >
                          <div>
                            <p className="font-display font-black text-sm">{label}</p>
                            <p className={`text-xs-tight font-body ${profile.availability === label ? 'text-white/60' : 'text-primary/40'}`}>{desc}</p>
                          </div>
                          {profile.availability === label && <Check className="w-5 h-5 text-tertiary" />}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="px-8 pb-8 flex items-center justify-between">
              <button
                onClick={() => setStep(prev => Math.max(0, prev - 1))}
                className={`flex items-center gap-2 text-xs-tight font-display font-black uppercase tracking-widest-plus transition-all ${step === 0 ? 'opacity-0 pointer-events-none' : 'text-primary/40 hover:text-primary'}`}
              >
                <ArrowLeft className="w-4 h-4" /> Indietro
              </button>
              <motion.button
                whileHover={canProceed() ? { scale: 1.03, y: -2 } : {}}
                whileTap={canProceed() ? { scale: 0.97 } : {}}
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-display font-black text-xs-tight uppercase tracking-widest-plus transition-all ${
                  canProceed()
                    ? 'bg-gradient-accent-reverse text-white shadow-xl shadow-secondary/20'
                    : 'bg-surface-container-low text-primary/20 cursor-not-allowed'
                }`}
              >
                {step === config.steps.length - 1 ? 'Salva Profilo' : 'Continua'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
