import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { DigitalSimulators } from './DigitalSimulators';
import { MinigamesGrid } from './MinigamesGrid';

interface SimulationHubProps {
  onSelect: (simType: 'governance' | 'pitch') => void;
}

export const SimulationHub = ({ onSelect }: SimulationHubProps) => (
  <div className="space-y-10 max-w-5xl mx-auto pt-2 pb-10">
    <SectionHeader 
      preTitle="Laboratorio Pratico"
      titleMain="Lab"
      titleSuffix="Accademia"
      description="Simulatori digitali e minigiochi offline per affinare la visione cooperativa. Sfida lo status quo, difendi la mutualità."
    />
    <DigitalSimulators onSelect={onSelect} />
    <MinigamesGrid />
  </div>
);
