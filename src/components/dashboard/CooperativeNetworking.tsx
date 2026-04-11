import React from 'react';
import { DiscoveryHub } from './networking/DiscoveryHub';
import { CooperativeCard, CooperativeDetail } from './networking/NetworkingCards';
import { CooperativeProfile } from '../../types';

export const CooperativeNetworking = ({ 
  renderFiltersOnly = false, 
  renderGridOnly = false,
  activeFilters,
  onToggleFilter,
  onReset
}: { 
  renderFiltersOnly?: boolean; 
  renderGridOnly?: boolean;
  activeFilters?: string[];
  onToggleFilter?: (f: string) => void;
  onReset?: () => void;
}) => {
  return (
    <DiscoveryHub<CooperativeProfile>
      dataUrl="/data/cooperatives.json"
      dataKey="cooperatives"
      filterKey="sector"
      filterLabel="Settori"
      renderFiltersOnly={renderFiltersOnly}
      renderGridOnly={renderGridOnly}
      externalFilters={activeFilters}
      onExternalFilterToggle={onToggleFilter}
      onExternalReset={onReset}
      placeholder="Sincronizzazione Ecosistema..."
      renderCard={(coop, activeFilters, onClick) => (
        <CooperativeCard 
          coop={coop} 
          onClick={onClick} 
        />
      )}
      renderDetail={(coop, onClose) => (
        <CooperativeDetail coop={coop} onClose={onClose} />
      )}
    />
  );
};
