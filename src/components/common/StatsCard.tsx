/**
 * StatsCard Component
 * Reusable metric display card for dashboards
 */

import React from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode | string;
  color?: "primary" | "success" | "warning" | "danger" | "muted";
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export function StatsCard({
  label,
  value,
  icon,
  color = "primary",
  trend,
}: StatsCardProps) {
  const colorClasses = {
    primary: "text-[#1B4332]",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
    muted: "text-gray-600",
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm text-center">
      {icon && (
        <div className="flex justify-center mb-2">
          {typeof icon === "string" ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <div className={`${colorClasses[color]}`}>{icon}</div>
          )}
        </div>
      )}

      <div className={`text-2xl font-extrabold ${colorClasses[color]} mb-1`}>
        {value}
      </div>

      <div className="text-xs text-gray-400">{label}</div>

      {trend && (
        <div className={`text-xs mt-2 ${trend.direction === "up" ? "text-green-600" : "text-red-600"}`}>
          {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
        </div>
      )}
    </div>
  );
}

export default StatsCard;
