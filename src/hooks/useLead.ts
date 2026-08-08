/**
 * useLead Hook
 * Lead management with database backend and localStorage caching
 */

import { useState, useCallback } from "react";
import { Lead } from "@/types";
import { leadService } from "@/api/leadService";

export interface UseLeadReturn {
  loading: boolean;
  error: Error | null;
  createLead: (data: Omit<Lead, "id" | "created_date">) => Promise<Lead>;
  getLeadsBySource: (source: string) => Promise<Lead[]>;
}

export function useLead(): UseLeadReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createLead = useCallback(async (data: Omit<Lead, "id" | "created_date" | "createdAt">) => {
    setLoading(true);
    setError(null);
    try {
      // Call API to create lead
      const newLead = await leadService.createLead(data as any);

      // Cache in localStorage
      const stored = localStorage.getItem("teethmocure_leads");
      const leads = stored ? JSON.parse(stored) : [];
      leads.unshift(newLead);
      localStorage.setItem("teethmocure_leads", JSON.stringify(leads));

      return newLead as Lead;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to create lead");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLeadsBySource = useCallback(async (source: string) => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem("teethmocure_leads");
      const leads = stored ? JSON.parse(stored) : [];
      return leads.filter((l: Lead) => l.source === source);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch leads");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createLead,
    getLeadsBySource,
  };
}
