/**
 * RecommendationWidget Component
 * Inline product recommendation display (for order form)
 */

import React from "react";
import { UseProductRecommendationReturn } from "@/hooks/useProductRecommendation";

interface RecommendationWidgetProps
  extends Omit<UseProductRecommendationReturn, "reset"> {
  onOrderClick?: () => void;
}

export function RecommendationWidget({
  recommendation,
  loading,
  error,
  getRecommendation,
  onOrderClick,
}: RecommendationWidgetProps) {
  React.useEffect(() => {
    // Auto-load recommendation on mount
    getRecommendation({});
  }, [getRecommendation]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-[#1B4332] to-[#2d6a4f] rounded-xl p-6 text-white animate-pulse">
        <div className="h-4 bg-white/20 rounded w-32 mb-4"></div>
        <div className="h-8 bg-white/20 rounded w-48 mb-3"></div>
        <div className="h-4 bg-white/20 rounded w-full mb-2"></div>
        <div className="h-4 bg-white/20 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <p className="text-red-700 font-semibold">Unable to get recommendation</p>
        <p className="text-red-600 text-sm">{error.message}</p>
      </div>
    );
  }

  if (!recommendation) return null;

  const packageDetails: Record<
    string,
    { name: string; price: string; bottles: string; delivery: string }
  > = {
    "1bottle": {
      name: "Starter Pack",
      price: "₦1,850",
      bottles: "1 Bottle",
      delivery: "Paid Delivery",
    },
    "2bottles": {
      name: "Recommended Pack",
      price: "₦3,500",
      bottles: "2 Bottles",
      delivery: "FREE DELIVERY",
    },
    "3bottles": {
      name: "Complete Treatment Pack",
      price: "₦5,100",
      bottles: "3 Bottles",
      delivery: "FREE DELIVERY",
    },
  };

  const pkg = packageDetails[recommendation.recommendedPackage];

  return (
    <div className="bg-gradient-to-r from-[#1B4332] to-[#2d6a4f] rounded-xl p-6 text-white border-2 border-[#C8A94C]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white/70 text-sm font-semibold mb-1">✨ AI Recommendation</p>
          <h3 className="text-2xl font-bold">{pkg.name}</h3>
        </div>
        <span className="text-3xl font-bold text-[#C8A94C]">{pkg.price}</span>
      </div>

      {/* Package Details */}
      <div className="flex gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <span>📦</span>
          <span>{pkg.bottles}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🚚</span>
          <span className="font-semibold">{pkg.delivery}</span>
        </div>
      </div>

      {/* Reasoning */}
      <p className="text-white/80 text-sm mb-4 leading-relaxed">
        {recommendation.reasoning}
      </p>

      {/* Benefits */}
      {recommendation.benefits && recommendation.benefits.length > 0 && (
        <div className="mb-4 space-y-1">
          {recommendation.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm">
              <span className="text-[#C8A94C] font-bold">✓</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onOrderClick}
        className="w-full bg-[#C8A94C] hover:bg-[#b8983e] text-[#1B4332] font-bold py-3 rounded-lg transition-colors"
      >
        Select This Package →
      </button>

      <p className="text-xs text-white/50 text-center mt-3">
        Based on your needs. You can choose a different package if you prefer.
      </p>
    </div>
  );
}

export default RecommendationWidget;
