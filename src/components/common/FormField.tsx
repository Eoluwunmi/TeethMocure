/**
 * FormField Component
 * Wraps input, textarea, select with label and error display
 */

import React from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  error,
  touched = false,
  hint,
  children,
}: FormFieldProps) {
  const showError = touched && error;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {showError && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
      {hint && !showError && (
        <p className="text-gray-400 text-xs mt-1">{hint}</p>
      )}
    </div>
  );
}

export default FormField;
