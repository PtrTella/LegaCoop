import React from 'react';
import { DigitalSimulators } from './DigitalSimulators';
import { MinigamesGrid } from './MinigamesGrid';

interface SimulationHubProps {
  onSelect: (simType: 'governance' | 'pitch') => void;
}

const HubHeader = () => (
  <div className="text-center space-y-3 max-w-3xl mx-auto">
    <p className="text-secondary font-display font-black text-[10px] uppercase tracking-mega">Laboratorio Pratico</p>
    <h2 className="text-3xl font-display font-black text-primary tracking-tight leading-tight italic">
      Lab <span className="not-italic text-primary/20">Accademia</span>
    </h2>
    <p className="text-primary/50 text-sm font-body leading-relaxed max-w-2xl mx-auto">
      Simulatori digitali e minigiochi offline per affinare la visione cooperativa. Sfida lo status quo, difendi la mutualità.
    </p>
  </div>
);

export const SimulationHub = ({ onSelect }: SimulationHubProps) => (
  <div className="space-y-10 max-w-5xl mx-auto py-6">
    <HubHeader />
    <DigitalSimulators onSelect={onSelect} />
    <MinigamesGrid />
  </div>
);
