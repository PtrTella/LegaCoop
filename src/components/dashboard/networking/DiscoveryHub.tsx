import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, X } from 'lucide-react';
import { useDiscoveryData, DiscoveryConfig } from '../../../hooks/useDiscoveryData';
import { FilterChip } from './FilterChip';

interface DiscoveryHubProps<T> extends DiscoveryConfig<T> {
  renderCard: (item: T, activeFilters: string[], onClick: (item: T) => void) => React.ReactNode;
  renderDetail?: (item: T, onClose: () => void) => React.ReactNode;
  filterLabel: string;
  renderFiltersOnly?: boolean;
  renderGridOnly?: boolean;
  gridClassName?: string;
  placeholder?: string;
  // External state for synchronization
  externalFilters?: string[];
  onExternalFilterToggle?: (filter: string) => void;
  onExternalReset?: () => void;
}

export function DiscoveryHub<T extends { id: string | number }>({
  dataUrl,
  dataKey,
  filterKey,
  renderCard,
  renderDetail,
  renderFiltersOnly = false,
  renderGridOnly = false,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 gap-8",
  placeholder = "Caricamento in corso...",
  externalFilters,
  onExternalFilterToggle,
  onExternalReset
}: DiscoveryHubProps<T>) {
  const { 
    items, 
    categories, 
    activeFilters: internalFilters, 
    loading, 
    toggleFilter: internalToggle, 
    resetFilters: internalReset 
  } = useDiscoveryData<T>({ dataUrl, dataKey, filterKey });

  const activeFilters = externalFilters ?? internalFilters;
  const toggleFilter = onExternalFilterToggle ?? internalToggle;
  const resetFilters = onExternalReset ?? internalReset;

  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) return items;
    return items.filter(item => {
      const val = item[filterKey];
      if (Array.isArray(val)) {
        return activeFilters.some(f => val.includes(f));
      }
      return activeFilters.includes(val as unknown as string);
    });
  }, [items, activeFilters, filterKey]);

  const splitCategories = useMemo(() => {
    const mid = Math.ceil(categories.length / 2);
    return [categories.slice(0, mid), categories.slice(mid)];
  }, [categories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 gap-3 text-primary/20 font-display font-black uppercase tracking-widest-plus text-[9px]">
        <Loader2 className="animate-spin h-5 w-5" />
        {placeholder}
      </div>
    );
  }

  const Filters = (
    <div className="overflow-x-auto pb-4 scrollbar-hide px-1 -mx-1">
      <div className="flex flex-col gap-3 w-max pt-4 pb-2">
        <div className="flex gap-3 items-center">
          {splitCategories[0].map(cat => (
            <FilterChip 
              key={cat} 
              label={cat} 
              active={activeFilters.includes(cat)} 
              onClick={() => toggleFilter(cat)} 
            />
          ))}
        </div>
        <div className="flex gap-3 items-center">
          {splitCategories[1].map(cat => (
            <FilterChip 
              key={cat} 
              label={cat} 
              active={activeFilters.includes(cat)} 
              onClick={() => toggleFilter(cat)} 
            />
          ))}
          {activeFilters.length > 0 && (
            <motion.button
              onClick={resetFilters}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="h-11 flex items-center gap-2 px-6 rounded-full bg-tertiary text-white font-display text-[10px] font-black uppercase tracking-widest-plus hover:shadow-xl transition-colors border border-tertiary/20 shrink-0"
            >
              <X size={14} /> Reset
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );

  const Grid = (
    <>
      <div className={gridClassName}>
        {filteredItems.map(item => (
          <React.Fragment key={item.id}>
            {renderCard(item, activeFilters, setSelectedItem)}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && renderDetail && (
          renderDetail(selectedItem, () => setSelectedItem(null))
        )}
      </AnimatePresence>
    </>
  );

  if (renderFiltersOnly) return Filters;
  if (renderGridOnly) return Grid;

  return (
    <div className="space-y-6">
      {Filters}
      {Grid}
    </div>
  );
}
