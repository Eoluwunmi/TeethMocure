/**
 * Universal Form Handler Hook
 * Replaces repetitive form logic across Order, Marketer, Subscription, Contact forms
 */

import { useState, useCallback, useEffect } from "react";
import { FormValidationRules, FormErrorMap } from "@/types";

export interface UseFormOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  validate?: (data: T) => FormErrorMap;
  debounceMs?: number;
}

export interface UseFormReturn<T> {
  values: T;
  errors: FormErrorMap;
  touched: Record<keyof T, boolean>;
  submitting: boolean;
  submitted: boolean;
  isDirty: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (onSubmit: (data: T) => Promise<void>) => (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setValues: (values: T | ((prev: T) => T)) => void;
  setFieldValue: (key: keyof T, value: T[keyof T]) => void;
  setFieldError: (key: keyof T, error: string) => void;
  reset: () => void;
  getFieldProps: (name: keyof T) => {
    name: string;
    value: T[keyof T];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  };
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  options: UseFormOptions<T> = {}
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrorMap>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [initialValuesSnapshot] = useState(initialValues);

  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValuesSnapshot);

  const validateField = useCallback(
    (fieldName: keyof T, fieldValue: T[keyof T]) => {
      if (!options.validate) return {};

      const allErrors = options.validate(values);
      if (allErrors[fieldName as string]) {
        return { [fieldName]: allErrors[fieldName as string] };
      }
      return {};
    },
    [values, options]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const fieldValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

      setValues((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));

      if (touched[name as keyof T]) {
        const fieldErrors = validateField(name as keyof T, fieldValue);
        setErrors((prev) => ({
          ...prev,
          ...fieldErrors,
        }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      const fieldErrors = validateField(name as keyof T, value as T[keyof T]);
      setErrors((prev) => ({
        ...prev,
        ...fieldErrors,
      }));
    },
    [validateField]
  );

  const handleSubmit =
    (onSubmit: (data: T) => Promise<void>) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof T, boolean>
      );
      setTouched(allTouched);

      // Validate all fields
      if (options.validate) {
        const allErrors = options.validate(values);
        setErrors(allErrors);

        if (Object.keys(allErrors).length > 0) {
          return;
        }
      }

      setSubmitting(true);
      try {
        await onSubmit(values);
        setSubmitted(true);
        options.onSuccess?.(values);
      } catch (error) {
        const err = error instanceof Error ? error : new Error("Unknown error");
        setErrors({ submit: err.message });
        options.onError?.(err);
      } finally {
        setSubmitting(false);
      }
    };

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
    setSubmitted(false);
  }, [initialValues]);

  const getFieldProps = (name: keyof T) => ({
    name: String(name),
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return {
    values,
    errors,
    touched,
    submitting,
    submitted,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue: (key: keyof T, value: T[keyof T]) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    },
    setFieldError: (key: keyof T, error: string) => {
      setErrors((prev) => ({ ...prev, [String(key)]: error }));
    },
    reset,
    getFieldProps,
  };
}
