import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Module, UserProfile, ChatMessage } from '../types';

const STORAGE_KEY = 'legacoop_user_profile';

interface AppState {
  completedPhases: number[];
  maturityScore: number;
  unlockedPhases: number[];
  userRole: string | null;
  modules: Module[] | null;
  userProfile: UserProfile | null;
  seenTours: string[];
  messages: ChatMessage[];
}

interface AppContextType {
  state: AppState;
  completePhase: (phaseId: number) => void;
  updateMaturityScore: (points: number) => void;
  unlockPhase: (phaseId: number) => void;
  updateUserProfile: (profile: UserProfile) => void;
  markTourAsSeen: (viewId: string) => void;
  addChatMessage: (msg: ChatMessage) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    completedPhases: [],
    maturityScore: 0,
    unlockedPhases: [0],
    userRole: null,
    modules: null,
    seenTours: (() => {
      try {
        const saved = localStorage.getItem('legacoop_seen_tours');
        return saved ? JSON.parse(saved) : [];
      } catch { return []; }
    })(),
    messages: [
      { role: 'bot', text: 'Ciao! Sono la tua intelligenza cooperativa. Come posso aiutarti oggi?' }
    ],
    userProfile: (() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
      } catch { return null; }
    })(),
  });

  useEffect(() => {
    // Migration: Cleanup old legacy tour key if it exists
    if (localStorage.getItem('legacoop_has_seen_tour')) {
      localStorage.removeItem('legacoop_has_seen_tour');
    }

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

  const markTourAsSeen = (viewId: string) => {
    setState(prev => {
      if (prev.seenTours.includes(viewId)) return prev;
      const newSeen = [...prev.seenTours, viewId];
      try {
        localStorage.setItem('legacoop_seen_tours', JSON.stringify(newSeen));
      } catch { /* ignore */ }
      return { ...prev, seenTours: newSeen };
    });
  };

  const addChatMessage = (msg: ChatMessage) => {
    setState(prev => ({ ...prev, messages: [...prev.messages, msg] }));
  };

  return (
    <AppContext.Provider value={{ state, completePhase, updateMaturityScore, unlockPhase, updateUserProfile, markTourAsSeen, addChatMessage }}>
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
