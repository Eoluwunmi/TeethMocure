/**
 * useMarketer Hook
 * Marketer management with database backend and localStorage caching
 */

import { useState, useCallback, useEffect } from "react";
import { Marketer, MarketerStatusType } from "@/types";
import { marketerService } from "@/api/marketerService";

export interface UseMarketerReturn {
  marketers: Marketer[];
  loading: boolean;
  error: Error | null;
  createMarketer: (data: Omit<Marketer, "id" | "created_date">) => Promise<Marketer>;
  updateMarketerStatus: (id: string, status: MarketerStatusType) => Promise<Marketer>;
  approveMarketer: (id: string) => Promise<Marketer>;
  rejectMarketer: (id: string) => Promise<Marketer>;
  suspendMarketer: (id: string) => Promise<Marketer>;
  getMarketerByPhone: (phone: string) => Promise<Marketer | null>;
  getMarketerByCode: (code: string) => Promise<Marketer | null>;
  getAllMarketers: () => Promise<void>;
  getApprovedMarketers: () => Promise<void>;
  getPendingMarketers: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useMarketer(initialFetch = false): UseMarketerReturn {
  const [marketers, setMarketers] = useState<Marketer[]>([]);
  const [loading, setLoading] = useState(initialFetch);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllMarketers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem("teethmocure_marketers");
      const data = stored ? JSON.parse(stored) : [];
      setMarketers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch marketers"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) {
      fetchAllMarketers();
    }
  }, [initialFetch, fetchAllMarketers]);

  const createMarketer = useCallback(
    async (data: Omit<Marketer, "id" | "created_date">) => {
      try {
        // Call API to create marketer
        const newMarketer = await marketerService.createMarketer(data as any);

        // Optimistic update in UI
        setMarketers((prev) => [newMarketer as Marketer, ...prev]);

        // Cache in localStorage
        const stored = localStorage.getItem("teethmocure_marketers");
        const marketers = stored ? JSON.parse(stored) : [];
        marketers.unshift(newMarketer);
        localStorage.setItem("teethmocure_marketers", JSON.stringify(marketers));

        return newMarketer as Marketer;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to create marketer");
        setError(error);
        throw error;
      }
    },
    []
  );

  const updateMarketerStatus = useCallback(
    async (id: string, status: MarketerStatusType) => {
      try {
        const stored = localStorage.getItem("teethmocure_marketers");
        const marketers = stored ? JSON.parse(stored) : [];
        const updated = marketers.find((m: Marketer) => m.id === id);
        if (updated) {
          updated.status = status;
          localStorage.setItem("teethmocure_marketers", JSON.stringify(marketers));
          setMarketers((prev) => prev.map((m) => (m.id === id ? updated : m)));
        }
        return updated;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to update marketer");
        setError(error);
        throw error;
      }
    },
    []
  );

  const approveMarketer = useCallback((id: string) => updateMarketerStatus(id, "approved"), [updateMarketerStatus]);
  const rejectMarketer = useCallback((id: string) => updateMarketerStatus(id, "rejected"), [updateMarketerStatus]);
  const suspendMarketer = useCallback((id: string) => updateMarketerStatus(id, "suspended"), [updateMarketerStatus]);

  const getMarketerByPhone = useCallback(async (phone: string) => {
    try {
      const stored = localStorage.getItem("teethmocure_marketers");
      const marketers = stored ? JSON.parse(stored) : [];
      return marketers.find((m: Marketer) => m.phone === phone) || null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch marketer");
      setError(error);
      throw error;
    }
  }, []);

  const getMarketerByCode = useCallback(async (code: string) => {
    try {
      const stored = localStorage.getItem("teethmocure_marketers");
      const marketers = stored ? JSON.parse(stored) : [];
      return marketers.find((m: Marketer) => m.referral_code === code) || null;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to fetch marketer");
      setError(error);
      throw error;
    }
  }, []);

  const getAllMarketers = useCallback(async () => {
    await fetchAllMarketers();
  }, [fetchAllMarketers]);

  const getApprovedMarketers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem("teethmocure_marketers");
      const marketers = stored ? JSON.parse(stored) : [];
      const approved = marketers.filter((m: Marketer) => m.status === "approved");
      setMarketers(approved);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch approved marketers"));
    } finally {
      setLoading(false);
    }
  }, []);

  const getPendingMarketers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem("teethmocure_marketers");
      const marketers = stored ? JSON.parse(stored) : [];
      const pending = marketers.filter((m: Marketer) => m.status === "pending");
      setMarketers(pending);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch pending marketers"));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    marketers,
    loading,
    error,
    createMarketer,
    updateMarketerStatus,
    approveMarketer,
    rejectMarketer,
    suspendMarketer,
    getMarketerByPhone,
    getMarketerByCode,
    getAllMarketers,
    getApprovedMarketers,
    getPendingMarketers,
    refetch: fetchAllMarketers,
  };
}
