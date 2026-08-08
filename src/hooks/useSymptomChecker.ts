/**
 * useSymptomChecker Hook
 * Manages symptom checker form state and Claude assessment
 */

import { useState, useCallback } from "react";
import { SymptomCheckResponse } from "@/types/ai";
import { symptomService } from "@/api/aiService";

export interface SymptomForm {
  symptoms: string;
  duration: string;
  severity: number;
  triedBefore: string;
}

export interface UseSymptomCheckerReturn {
  form: SymptomForm;
  updateForm: (field: keyof SymptomForm, value: string | number) => void;
  assessment: SymptomCheckResponse | null;
  loading: boolean;
  error: Error | null;
  checkSymptoms: () => Promise<void>;
  reset: () => void;
}

const initialForm: SymptomForm = {
  symptoms: "",
  duration: "",
  severity: 5,
  triedBefore: "",
};

export function useSymptomChecker(): UseSymptomCheckerReturn {
  const [form, setForm] = useState<SymptomForm>(initialForm);
  const [assessment, setAssessment] = useState<SymptomCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateForm = useCallback((field: keyof SymptomForm, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const checkSymptoms = useCallback(async () => {
    if (!form.symptoms.trim()) {
      setError(new Error("Please describe your symptoms"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await symptomService.check({
        symptoms: form.symptoms,
        duration: form.duration,
        severity: form.severity,
        triedBefore: form.triedBefore,
      });

      setAssessment(response);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to assess symptoms");
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [form]);

  const reset = useCallback(() => {
    setForm(initialForm);
    setAssessment(null);
    setError(null);
  }, []);

  return {
    form,
    updateForm,
    assessment,
    loading,
    error,
    checkSymptoms,
    reset,
  };
}
