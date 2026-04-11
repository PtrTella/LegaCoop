import React from 'react';
import { DiscoveryHub } from './networking/DiscoveryHub';
import { ProfileCard, ProfileDetail } from './networking/NetworkingCards';
import { CoFounderProfile } from '../../types';

export const CoFounderSearch = ({ 
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
    <DiscoveryHub<CoFounderProfile>
      dataUrl="/data/team.json"
      dataKey="members"
      filterKey="skills"
      filterLabel="Competenze"
      renderFiltersOnly={renderFiltersOnly}
      renderGridOnly={renderGridOnly}
      externalFilters={activeFilters}
      onExternalFilterToggle={onToggleFilter}
      onExternalReset={onReset}
      placeholder="Accesso database talenti..."
      renderCard={(profile, activeFilters, onClick) => (
        <ProfileCard 
          profile={profile} 
          activeFilters={activeFilters} 
          onClick={onClick} 
        />
      )}
      renderDetail={(profile, onClose) => (
        <ProfileDetail profile={profile} onClose={onClose} />
      )}
    />
  );
};
