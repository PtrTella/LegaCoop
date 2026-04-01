/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useAppContext } from './context/AppContext';
import { MODULES } from './data/modules';
import { MicroLesson } from './components/MicroLesson';
import { FlashcardDeck } from './components/FlashcardDeck';
import { GovernanceSimulator } from './components/GovernanceSimulator';
import { MaturityDashboard } from './components/MaturityDashboard';
import { TeamView } from './components/TeamView';
import { ModuleMap } from './components/ModuleMap';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

// --- Main App Content ---

const AppContent = () => {
  const { state, completePhase } = useAppContext();
  const [view, setView] = useState<'dashboard' | 'map' | 'lesson' | 'quiz' | 'roleplay' | 'success' | 'team'>('dashboard');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  const handleSelectModule = (id: number) => {
    setActiveModuleId(id);
    const module = MODULES[id];
    if (module.lessons.length > 0) {
      const firstLesson = module.lessons[0];
      if (firstLesson.type === 'roleplay') {
        setView('roleplay');
      } else {
        setView('lesson');
      }
    } else {
      setView('quiz');
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

  const activeModule = activeModuleId !== null ? MODULES[activeModuleId] : null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      {/* Sidebar Navigation */}
      <Sidebar view={view} setView={setView} />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative bg-slate-50 flex flex-col">
        {/* Header */}
        <Header view={view} setView={setView} activeModule={activeModule} />

        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto h-full">
            <AnimatePresence mode="wait">
              {view === 'dashboard' && (
                <motion.div key="dash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <MaturityDashboard />
                </motion.div>
              )}

              {view === 'map' && (
                <motion.div key="map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <ModuleMap onSelectModule={handleSelectModule} />
                </motion.div>
              )}

              {view === 'team' && (
                <motion.div key="team" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <TeamView />
                </motion.div>
              )}

              {view === 'lesson' && activeModule && (
                <motion.div key="lesson" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="h-full">
                  <MicroLesson lesson={activeModule.lessons[0]} onComplete={handleActionComplete} />
                </motion.div>
              )}

              {view === 'quiz' && activeModule && (
                <motion.div key="quiz" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="h-full">
                  <FlashcardDeck cards={activeModule.flashcards} onFinish={handleActionComplete} />
                </motion.div>
              )}

              {view === 'roleplay' && (
                <motion.div key="rp" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="h-full">
                  <GovernanceSimulator onComplete={handleActionComplete} />
                </motion.div>
              )}

              {view === 'success' && (
                <motion.div key="success" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-16 h-16 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">Ottimo Lavoro!</h2>
                  <p className="text-slate-500">Hai completato il modulo e sbloccato nuove competenze.</p>
                  <button onClick={() => setView('dashboard')} className="px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-colors">Torna alla Dashboard</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* CSS for 3D Flip */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
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
