import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  completedPhases: number[];
  maturityScore: number;
  unlockedPhases: number[];
  userRole: string | null;
}

interface AppContextType {
  state: AppState;
  completePhase: (phaseId: number) => void;
  updateMaturityScore: (points: number) => void;
  unlockPhase: (phaseId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    completedPhases: [],
    maturityScore: 0,
    unlockedPhases: [0], // Phase 0 is unlocked by default
    userRole: null,
  });

  const completePhase = (phaseId: number) => {
    setState((prev) => {
      const newCompleted = prev.completedPhases.includes(phaseId) 
        ? prev.completedPhases 
        : [...prev.completedPhases, phaseId];
      
      // Auto-unlock next phase if applicable
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

  return (
    <AppContext.Provider value={{ state, completePhase, updateMaturityScore, unlockPhase }}>
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
