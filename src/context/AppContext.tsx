import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Module, UserProfile } from '../types';

const STORAGE_KEY = 'legacoop_user_profile';

interface AppState {
  completedPhases: number[];
  maturityScore: number;
  unlockedPhases: number[];
  userRole: string | null;
  modules: Module[] | null;
  userProfile: UserProfile | null;
  hasSeenTour: boolean;
}

interface AppContextType {
  state: AppState;
  completePhase: (phaseId: number) => void;
  updateMaturityScore: (points: number) => void;
  unlockPhase: (phaseId: number) => void;
  updateUserProfile: (profile: UserProfile) => void;
  completeTour: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    completedPhases: [],
    maturityScore: 0,
    unlockedPhases: [0],
    userRole: null,
    modules: null,
    hasSeenTour: localStorage.getItem('legacoop_has_seen_tour') === 'true',
    userProfile: (() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch { return null; }
    })(),
  });

  useEffect(() => {
    fetch('/data/modules.json')
      .then(res => res.json())
      .then(data => setState(prev => ({ ...prev, modules: data })))
      .catch(err => console.error("Failed to load modules:", err));
  }, []);

  const completePhase = (phaseId: number) => {
    setState((prev) => {
      const newCompleted = prev.completedPhases.includes(phaseId)
        ? prev.completedPhases
        : [...prev.completedPhases, phaseId];
      const nextPhase = phaseId + 1;
      const newUnlocked = prev.unlockedPhases.includes(nextPhase)
        ? prev.unlockedPhases
        : [...prev.unlockedPhases, nextPhase];
      return {
        ...prev,
        completedPhases: newCompleted,
        unlockedPhases: newUnlocked,
        maturityScore: Math.min(prev.maturityScore + 15, 100),
      };
    });
  };

  const updateMaturityScore = (points: number) => {
    setState((prev) => ({
      ...prev,
      maturityScore: Math.min(prev.maturityScore + points, 100),
    }));
  };

  const unlockPhase = (phaseId: number) => {
    setState((prev) => ({
      ...prev,
      unlockedPhases: prev.unlockedPhases.includes(phaseId)
        ? prev.unlockedPhases
        : [...prev.unlockedPhases, phaseId],
    }));
  };

  const updateUserProfile = (profile: UserProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch { /* ignore storage errors */ }
    setState((prev) => ({ ...prev, userProfile: profile }));
  };

  const completeTour = () => {
    localStorage.setItem('legacoop_has_seen_tour', 'true');
    setState(prev => ({ ...prev, hasSeenTour: true }));
  };

  return (
    <AppContext.Provider value={{ state, completePhase, updateMaturityScore, unlockPhase, updateUserProfile, completeTour }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
