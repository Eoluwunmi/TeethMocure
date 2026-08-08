/**
 * ModalWrapper Component
 * Replaces ExitIntentPopup, SalesLeadPopup, AbandonedCartPopup
 */

import React from "react";
import { X } from "lucide-react";

interface ModalWrapperProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: string | React.ReactNode;
  headerBgColor?: string;
  headerTextColor?: string;
  children: React.ReactNode;
  maxWidth?: string;
  size?: "sm" | "md" | "lg";
}

export function ModalWrapper({
  visible,
  onClose,
  title,
  subtitle,
  icon,
  headerBgColor = "bg-[#1B4332]",
  headerTextColor = "text-white",
  children,
  maxWidth = "max-w-md",
  size = "md",
}: ModalWrapperProps) {
  if (!visible) return null;

  const sizeClass = {
    sm: "w-80",
    md: "w-96",
    lg: "w-[500px]",
  }[size];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto ${maxWidth}`}>
        {/* Header */}
        <div className={`${headerBgColor} ${headerTextColor} px-8 pt-8 pb-6 text-center relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {icon && (
            <div className="flex justify-center mb-4">
              {typeof icon === "string" ? (
                <span className="text-4xl">{icon}</span>
              ) : (
                icon
              )}
            </div>
          )}

          <h2 className="text-xl font-extrabold leading-tight mb-2">{title}</h2>

          {subtitle && (
            <p className={`${headerTextColor === "text-white" ? "text-white/70" : "text-gray-600"} text-sm`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          {children}
        </div>

        {/* Close Button (visible on mobile) */}
        <div className="px-8 pb-4">
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * SuccessState Component
 * Used inside ModalWrapper for success messages
 */
interface SuccessStateProps {
  title: string;
  message: string;
  onClose: () => void;
  primaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
}

export function SuccessState({
  title,
  message,
  onClose,
  primaryAction,
  secondaryAction,
}: SuccessStateProps) {
  return (
    <div className="text-center py-4">
      <div className="w-14 h-14 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6">{message}</p>

      <div className="space-y-2">
        {primaryAction && (
          primaryAction.href ? (
            <a
              href={primaryAction.href}
              className="block w-full bg-[#1B4332] text-white font-bold py-3 rounded-lg hover:bg-[#16382a] transition-colors"
            >
              {primaryAction.text}
            </a>
          ) : (
            <button
              onClick={primaryAction.onClick || onClose}
              className="w-full bg-[#1B4332] text-white font-bold py-3 rounded-lg hover:bg-[#16382a] transition-colors"
            >
              {primaryAction.text}
            </button>
          )
        )}

        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
          >
            {secondaryAction.text}
          </button>
        )}

        {!primaryAction && !secondaryAction && (
          <button
            onClick={onClose}
            className="w-full bg-[#1B4332] text-white font-bold py-3 rounded-lg hover:bg-[#16382a] transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export default ModalWrapper;
