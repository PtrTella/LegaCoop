import { useState, useEffect, useMemo, useCallback } from 'react';

export interface DiscoveryConfig<T> {
  dataUrl: string;
  dataKey: string; // e.g., 'members' or 'cooperatives'
  filterKey: keyof T; // e.g., 'skills' or 'sector'
}

export function useDiscoveryData<T>({ dataUrl, dataKey, filterKey }: DiscoveryConfig<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(dataUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        const list = data[dataKey] || [];
        setItems(list);
      } catch (err) {
        console.error(`[useDiscoveryData] Failed to load ${dataUrl}:`, err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataUrl, dataKey]);

  const categories = useMemo(() => {
    const all = items.flatMap(item => {
      const val = item[filterKey];
      return Array.isArray(val) ? val : [val];
    });
    return Array.from(new Set(all)).filter(Boolean) as string[];
  }, [items, filterKey]);

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

  const toggleFilter = useCallback((filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  }, []);

  const resetFilters = useCallback(() => setActiveFilters([]), []);

  return {
    items: filteredItems,
    categories,
    activeFilters,
    loading,
    toggleFilter,
    resetFilters
  };
}
