/**
 * Filter Management Hook
 * Replaces status filter logic in AdminDashboard and OrderTracking
 */

import { useState, useMemo, useCallback } from "react";

export interface UseFilterOptions<T> {
  initialFilter?: string;
  filterKey?: keyof T;
}

export interface UseFilterReturn<T> {
  items: T[];
  filtered: T[];
  currentFilter: string;
  setFilter: (filter: string) => void;
  clearFilter: () => void;
  hasActiveFilter: boolean;
  filterOptions: string[];
}

export function useFilter<T extends Record<string, any>>(
  items: T[] | undefined = [],
  filterKey: keyof T,
  options: UseFilterOptions<T> = {}
): UseFilterReturn<T> {
  const [currentFilter, setCurrentFilter] = useState<string>(options.initialFilter || "all");

  // Get unique filter values
  const filterOptions = useMemo(() => {
    const values = new Set<string>();
    (items || []).forEach((item) => {
      const value = String(item[filterKey]);
      if (value) values.add(value);
    });
    return ["all", ...Array.from(values).sort()];
  }, [items, filterKey]);

  // Filter items
  const filtered = useMemo(() => {
    if (!items || currentFilter === "all") {
      return items || [];
    }
    return items.filter((item) => String(item[filterKey]) === currentFilter);
  }, [items, currentFilter, filterKey]);

  const clearFilter = useCallback(() => {
    setCurrentFilter("all");
  }, []);

  return {
    items: items || [],
    filtered,
    currentFilter,
    setFilter: setCurrentFilter,
    clearFilter,
    hasActiveFilter: currentFilter !== "all",
    filterOptions,
  };
}

/**
 * Multi-Filter Hook
 * Handles multiple filters simultaneously
 */
export interface UseMultiFilterOptions<T> {
  initialFilters?: Record<string, string>;
}

export interface UseMultiFilterReturn<T> {
  filtered: T[];
  filters: Record<string, string>;
  setFilter: (key: string, value: string) => void;
  clearFilter: (key: string) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
}

export function useMultiFilter<T extends Record<string, any>>(
  items: T[] | undefined = [],
  filterKeys: (keyof T)[],
  options: UseMultiFilterOptions<T> = {}
): UseMultiFilterReturn<T> {
  const [filters, setFilters] = useState<Record<string, string>>(options.initialFilters || {});

  const filtered = useMemo(() => {
    if (!items) return [];

    return items.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || value === "all") return true;
        return String(item[key as keyof T]) === value;
      });
    });
  }, [items, filters]);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilter = useCallback((key: string) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Object.values(filters).some((v) => v && v !== "all");

  return {
    filtered,
    filters,
    setFilter,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
  };
}
