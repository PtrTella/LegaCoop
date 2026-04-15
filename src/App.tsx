/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useAppContext } from './context/AppContext';
import { MicroLesson } from './components/course/MicroLesson';
import { ModuleExam } from './components/course/ModuleExam';
import { GovernanceSimulator } from './components/simulators/GovernanceSimulator';
import { MaturityDashboard } from './components/dashboard/MaturityDashboard';
import { TeamView } from './components/dashboard/TeamView';
import { ModuleMap } from './components/course/ModuleMap';
import { Header } from './components/layout/Header';
import { AITutor } from './components/simulators/AITutor';
import { SimulationHub } from './components/simulators/SimulationHub';
import { PitchBattle } from './components/simulators/PitchBattle';
import { GuidedTour } from './components/ui/GuidedTour';
import { MobileTabNavigation } from './components/layout/MobileTabNavigation';
import { Sparkles, GraduationCap, Users, Zap } from 'lucide-react';

// --- Main App Content ---

const AppContent = () => {
  const { state, completePhase, markTourAsSeen, updateMaturityScore } = useAppContext();
  const { modules } = state;
  const [view, setView] = useState<'dashboard' | 'map' | 'lesson' | 'quiz' | 'roleplay' | 'success' | 'team' | 'simulation' | 'pitch' | 'tutor'>('dashboard');
  const [lastMainView, setLastMainView] = useState<'dashboard' | 'map' | 'team' | 'simulation'>('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // --- Contextual Introductions Logic ---
  const [activeTour, setActiveTour] = useState<any[] | null>(null);

  const viewIntros: Record<string, any[]> = {
    dashboard: [{
      title: "Il tuo Hub Cooperativo",
      description: "Benvenuto! Questo è il cuore della tua startup. Da qui potrai monitorare la tua **crescita** e accedere rapidamente a **Laboratorio**, **Networking** e **Accademia**.",
      icon: Sparkles
    }],
    map: [{
      title: "Percorso Accademia",
      description: "Il centro della tua formazione. Sblocca ogni fase del percorso e scala i **Livelli di Maturità** completando lezioni e quiz interattivi.",
      icon: GraduationCap
    }],
    simulation: [{
      title: "Laboratorio Pratico",
      description: "Il tuo campo di addestramento. Metti alla prova la tua visione con **Simulatori Reali** di Governance e preparati alla **Pitch Battle**.",
      icon: Zap
    }],
    team: [{
      title: "Ecosistema Network",
      description: "La forza del gruppo. Connettiti con **Talenti**, **Imprese** ed **Esperti** per far scalare la tua visione nell'ecosistema **Indicoo**.",
      icon: Users
    }]
  };

  React.useEffect(() => {
    // Only show tour if not already seen for this view
    if (!state.seenTours.includes(view) && viewIntros[view]) {
      // Small delay so the page transition can finish
      const timer = setTimeout(() => {
        setActiveTour(viewIntros[view]);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setActiveTour(null);
    }
  }, [view, state.seenTours]);


  // --- History Management ---
  React.useEffect(() => {
    // Initial state setup to handle "back to home" behavior
    if (!window.history.state) {
      window.history.replaceState({ view: 'dashboard' }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      } else {
        setView('dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (!modules) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-primary/50 font-display text-sm tracking-widest uppercase">Caricamento Accademia</p>
      </div>
    );
  }



  const handleSetView = (newView: any) => {
    // Track main views for returning after completion
    if (['dashboard', 'map', 'team', 'simulation', 'knowledge'].includes(newView)) {
      setLastMainView(newView);
    }
    
    // Push new state to browser history if it's a different view
    if (newView !== view) {
      window.history.pushState({ view: newView }, '');
    }
    
    setView(newView);
  };

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
    setCurrentLessonIndex(0); // Reset lesson queue
    const module = modules[id];
    if (module.lessons.length > 0) {
      handleSetView('lesson');
    } else {
      handleSetView('quiz');
    }
  };

  const handleActionComplete = () => {
    const activeModule = activeModuleId !== null ? modules[activeModuleId] : null;
    
    if (view === 'lesson') {
      // Reward each lesson completion to make level bar advance
      updateMaturityScore(5);
      
      if (activeModule && currentLessonIndex < activeModule.lessons.length - 1) {
        // Move to the next lesson in sequence
        setCurrentLessonIndex(prev => prev + 1);
      } else if (activeModule) {
        // All lessons done -> Check for exam content
        const hasQuiz = (activeModule.gamification?.flashcards?.length ?? 0) > 0 || 
                        (activeModule.gamification?.madLibs?.length ?? 0) > 0 ||
                        (activeModule.gamification?.multipleChoices?.length ?? 0) > 0;
        
        if (hasQuiz) {
          handleSetView('quiz');
        } else {
          // No quiz -> Auto-complete and redirect
          if (activeModuleId !== null) completePhase(activeModuleId);
          
          if (activeModuleId === 0) {
            // Intro -> go to map directly to start phase 1
            handleSetView('map');
          } else {
            handleSetView('success');
          }
        }
      }
    } else if (view === 'quiz' || view === 'roleplay') {
      if (activeModuleId !== null) completePhase(activeModuleId);
      handleSetView('success');
    }
  };


  const activeModule = activeModuleId !== null ? modules[activeModuleId] : null;
  const isFullWidth = ['pitch', 'roleplay', 'tutor'].includes(view);

  return (
    <div className={`aurora-container font-body flex flex-col w-full ${isFullWidth ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      {/* Magnificent Aurora: High-Vibrancy Radiant Atmosphere (Restored) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        <div className="aurora-blob bg-aurora-purple w-[150vw] h-[150vw] -top-[50vw] -left-[50vw] opacity-[0.45] mix-blend-multiply" />
        <div className="aurora-blob bg-aurora-pink w-[120vw] h-[120vw] top-[10vw] right-[-20vw] opacity-[0.4] mix-blend-multiply" />
        <div className="aurora-blob bg-aurora-amber w-[130vw] h-[130vw] -bottom-[40vw] -right-[30vw] opacity-[0.35] mix-blend-multiply" />
        <div className="aurora-blob bg-aurora-violet w-[140vw] h-[140vw] top-[40vw] left-[-20vw] opacity-[0.25] mix-blend-multiply blur-[120px]" />
      </div>

      {/* Header (Moved outside main to fix stacking order) */}
      <Header view={view} setView={handleSetView} activeModule={activeModule} />

      {/* Main Content Area */}
      <main className={`flex-1 relative z-10 flex flex-col w-full min-w-0 pt-20 ${isFullWidth ? 'h-0' : ''}`}>
        <div className={`flex-1 flex flex-col ${isFullWidth ? 'p-0 overflow-hidden' : 'pt-10 pb-32 md:pb-12 px-1.5 sm:px-12'}`}>
          <div className={`flex-1 w-full min-w-0 ${isFullWidth ? 'h-full' : 'max-w-6xl mx-auto'}`}>
            <AnimatePresence mode="wait">
              {view === 'dashboard' && (
                <motion.div key="dash" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <MaturityDashboard onNavigate={handleSetView} />
                </motion.div>
              )}

              {view === 'map' && (
                <motion.div key="map" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <ModuleMap onSelectModule={handleSelectModule} />
                </motion.div>
              )}

              {view === 'team' && (
                <motion.div key="team" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <TeamView />
                </motion.div>
              )}

              {view === 'lesson' && activeModule && (
                <motion.div key={`lesson-${currentLessonIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full">
                  <MicroLesson 
                    lesson={activeModule.lessons[currentLessonIndex]} 
                    phaseTitle={activeModule.title}
                    onComplete={handleActionComplete} 
                  />
                </motion.div>
              )}

              {view === 'quiz' && activeModule && (
                <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full">
                  <ModuleExam gamification={activeModule.gamification} onFinish={handleActionComplete} />
                </motion.div>
              )}

              {view === 'roleplay' && (
                <motion.div key="roleplay" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <GovernanceSimulator 
                    onComplete={() => handleSetView('simulation')} 
                  />
                </motion.div>
              )}

              {view === 'simulation' && (
                <motion.div key="sim" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full">
                  <SimulationHub onSelect={(type) => handleSetView(type === 'governance' ? 'roleplay' : 'pitch')} />
                </motion.div>
              )}

              {view === 'pitch' && (
                <motion.div key="pitch" className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PitchBattle 
                    onComplete={() => handleSetView('simulation')} 
                  />
                </motion.div>
              )}
              
              {view === 'tutor' && (
                <motion.div key="tutor" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full">
                  <AITutor mode="inline" />
                </motion.div>
              )}

              {view === 'success' && (
                <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 glass-card rounded-5xl">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-black text-primary leading-tight">Congratulazioni!</h2>
                    <p className="text-primary/60 font-body mt-1 text-sm">Il tuo impatto nella cooperazione è appena cresciuto.</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetView(lastMainView)} 
                    className="px-6 py-3.5 bg-gradient-brand text-white font-display font-black rounded-xl shadow-ambient transition-all text-xs uppercase tracking-widest"
                  >
                    Torna in Accademia
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="hidden md:flex">
          <AITutor mode="fab" />
        </div>
      </main>

      <MobileTabNavigation view={view} setView={handleSetView} />

      {/* Contextual Introductions */}
      <AnimatePresence>
        {activeTour && (
          <GuidedTour 
            steps={activeTour} 
            onComplete={() => markTourAsSeen(view)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
