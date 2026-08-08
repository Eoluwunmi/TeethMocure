/**
 * StatusFilter Component
 * Reusable filter buttons for status/state filtering
 */

import React from "react";

interface StatusFilterProps {
  options: string[];
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  label?: string;
  capitalize?: boolean;
}

export function StatusFilter({
  options,
  currentFilter,
  onFilterChange,
  label = "Filter",
  capitalize = true,
}: StatusFilterProps) {
  return (
    <div>
      {label && (
        <label className="text-xs font-semibold text-gray-500 block mb-2">
          {label}
        </label>
      )}
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onFilterChange(option)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
              currentFilter === option
                ? "bg-[#1B4332] text-white border-[#1B4332]"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
          >
            {capitalize
              ? option.charAt(0).toUpperCase() + option.slice(1).replace(/_/g, " ")
              : option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusFilter;
