/**
 * Form Component
 * Reusable form wrapper for Order, Marketer, Subscription, Contact forms
 */

import React from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  submitting?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Form({
  onSubmit,
  submitting = false,
  children,
  className = "",
}: FormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      noValidate
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { disabled: submitting || isSubmitting } as any);
        }
        return child;
      })}
    </form>
  );
}

/**
 * FormSubmitButton Component
 */
interface FormSubmitButtonProps {
  submitting?: boolean;
  text?: string;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
}

export function FormSubmitButton({
  submitting = false,
  text = "Submit",
  loadingText = "Submitting...",
  className = "w-full",
  disabled = false,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={submitting || disabled}
      className={`${className} bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {submitting ? loadingText : text}
    </button>
  );
}

export default Form;
