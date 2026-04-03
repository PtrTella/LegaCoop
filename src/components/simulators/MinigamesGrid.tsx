import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { Users, Target, BookOpen, Package, Zap, PlayCircle, ShieldAlert } from 'lucide-react';
import { Minigame } from './types';
import { MinigameCard } from './MinigameCard';
import { MinigameModal } from './MinigameModal';

const GAME_ICONS: LucideIcon[] = [Users, Target, BookOpen, Package, Zap, PlayCircle, ShieldAlert];

// --- Private helpers ---

interface SectionDividerProps {
  title: string;
  badge?: string;
}

const SectionDivider = ({ title, badge }: SectionDividerProps) => (
  <div className="flex items-center gap-4">
    <h3 className="font-display font-black text-sm uppercase tracking-mega text-primary/30 shrink-0">{title}</h3>
    <div className="flex-1 h-px bg-surface-container-low" aria-hidden="true" />
    {badge && (
      <span className="text-2xs font-display font-black text-primary/20 uppercase tracking-widest shrink-0">{badge}</span>
    )}
  </div>
);

// --- Component ---

export const MinigamesGrid = () => {
  const [minigames, setMinigames] = useState<Minigame[]>([]);
  const [selectedGame, setSelectedGame] = useState<Minigame | null>(null);

  useEffect(() => {
    fetch('/data/minigames.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Minigame[]>;
      })
      .then(data => setMinigames(data))
      .catch(err => console.error('[MinigamesGrid] Failed to load minigames.json:', err));
  }, []);

  if (minigames.length === 0) return null;

  return (
    <section className="space-y-6">
      <SectionDivider title="Minigiochi Offline" badge={`${minigames.length} attività`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {minigames.map((game, i) => (
          // key is passed as a JSX attribute here — it is NOT forwarded into MinigameCardProps
          <MinigameCard
            key={game.id}
            game={game}
            icon={GAME_ICONS[i % GAME_ICONS.length]}
            index={i}
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedGame && (
          <MinigameModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
