import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { DigitalSimulators } from './DigitalSimulators';
import { MinigamesGrid } from './MinigamesGrid';

interface SimulationHubProps {
  onSelect: (simType: 'governance' | 'pitch') => void;
}

export const SimulationHub = ({ onSelect }: SimulationHubProps) => (
  <div className="space-y-8">
    <SectionHeader 
      titleMain="Lab"
      titleSuffix="Accademia"
      description="Simulatori digitali e minigiochi offline per affinare la visione cooperativa. Sfida lo status quo, difendi la mutualità."
    />
    <DigitalSimulators onSelect={onSelect} />
    <MinigamesGrid />
  </div>
);
