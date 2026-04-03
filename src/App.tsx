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

// --- Main App Content ---

const AppContent = () => {
  const { state, completePhase } = useAppContext();
  const { modules } = state;
  const [view, setView] = useState<'dashboard' | 'map' | 'lesson' | 'quiz' | 'roleplay' | 'success' | 'team' | 'simulation' | 'pitch'>('dashboard');
  const [lastMainView, setLastMainView] = useState<'dashboard' | 'map' | 'team' | 'simulation'>('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  if (!modules) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-secondary animate-spin" />
        <p className="text-primary/50 font-display text-sm tracking-widest uppercase">Caricamento Accademia</p>
      </div>
    );
  }

  const handleSetView = (newView: any) => {
    // Track main views for returning after completion
    if (['dashboard', 'map', 'team', 'simulation'].includes(newView)) {
      setLastMainView(newView);
    }
    setView(newView);
  };

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
    const module = modules[id];
    if (module.lessons.length > 0) {
      handleSetView('lesson');
    } else {
      handleSetView('quiz');
    }
  };

  const handleActionComplete = () => {
    if (view === 'lesson') {
      setView('quiz');
    } else if (view === 'quiz' || view === 'roleplay') {
      if (activeModuleId !== null) completePhase(activeModuleId);
      setView('success');
    }
  };

  const activeModule = activeModuleId !== null ? modules[activeModuleId] : null;

  return (
    <div className="min-h-screen bg-surface font-body flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 min-h-screen overflow-y-auto relative bg-surface flex flex-col">
        {/* Header (Now contains all Navigation & Metrics) */}
        <Header view={view} setView={handleSetView} activeModule={activeModule} />

        <div className="flex-1 py-8 px-6 sm:px-12">
          <div className="max-w-6xl mx-auto h-full">
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
                <motion.div key="lesson" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full">
                  <MicroLesson 
                    lesson={activeModule.lessons[0]} 
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
                <motion.div key="rp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full">
                  <GovernanceSimulator onComplete={handleActionComplete} />
                </motion.div>
              )}

              {view === 'simulation' && (
                <motion.div key="sim" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-full">
                  <SimulationHub onSelect={(type) => handleSetView(type === 'governance' ? 'roleplay' : 'pitch')} />
                </motion.div>
              )}

              {view === 'pitch' && (
                <motion.div key="pitch" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="h-full">
                  <PitchBattle onComplete={() => handleSetView('simulation')} />
                </motion.div>
              )}

              {view === 'success' && (
                <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6 bg-surface-container-lowest rounded-4xl shadow-ambient">
                  <div className="w-20 h-20 bg-tertiary/10 rounded-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-black text-primary leading-tight">Congratulazioni!</h2>
                    <p className="text-primary/60 font-body mt-1 text-sm">Il tuo impatto nella cooperazione è appena cresciuto.</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetView(lastMainView)} 
                    className="px-6 py-3.5 bg-linear-to-br from-secondary to-primary-container text-white font-display font-black rounded-xl shadow-ambient transition-all text-xs uppercase tracking-widest"
                  >
                    Torna in Accademia
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <AITutor />
      </main>
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
