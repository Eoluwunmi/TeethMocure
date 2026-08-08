/**
 * useProductRecommendation Hook
 * Gets personalized product recommendation from Claude
 */

import { useState, useCallback } from "react";
import { RecommendationResponse } from "@/types/ai";
import { recommendationService } from "@/api/aiService";

export interface UseProductRecommendationReturn {
  recommendation: RecommendationResponse | null;
  loading: boolean;
  error: Error | null;
  getRecommendation: (params: {
    symptoms?: string;
    budget?: number;
    desiredDuration?: string;
  }) => Promise<void>;
  reset: () => void;
}

export function useProductRecommendation(): UseProductRecommendationReturn {
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getRecommendation = useCallback(
    async (params: { symptoms?: string; budget?: number; desiredDuration?: string }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await recommendationService.getRecommendation({
          symptoms: params.symptoms || "general",
          budget: params.budget,
          desiredDuration: params.desiredDuration || "as needed",
        });

        setRecommendation(response);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to get recommendation");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setRecommendation(null);
    setError(null);
  }, []);

  return {
    recommendation,
    loading,
    error,
    getRecommendation,
    reset,
  };
}
