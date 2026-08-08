/**
 * SymptomChecker Component
 * Multi-step symptom assessment form
 */

import React from "react";
import { UseSymptomCheckerReturn } from "@/hooks/useSymptomChecker";
import { FormField } from "@/components/common";

interface SymptomCheckerProps extends UseSymptomCheckerReturn {}

export function SymptomChecker({
  form,
  updateForm,
  assessment,
  loading,
  error,
  checkSymptoms,
  reset,
}: SymptomCheckerProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkSymptoms();
  };

  if (assessment) {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Assessment Result */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">
                {assessment.shouldSeeDentist ? "⚠️" : "✅"}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {assessment.shouldSeeDentist ? "Professional Care Recommended" : "Teethmocure Can Help"}
            </h2>
          </div>

          {/* Assessment */}
          <div className="bg-[#F8F9FA] rounded-xl p-6 mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">{assessment.assessment}</p>

            {assessment.warnings && assessment.warnings.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <p className="font-semibold text-red-900 mb-2">⚠️ Important:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-red-800">
                  {assessment.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {!assessment.shouldSeeDentist && (
            <>
              {/* Recommendation */}
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-green-900 mb-2">Recommended Package</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-green-700">
                    {assessment.recommendedPackage === "1bottle"
                      ? "Starter Pack"
                      : assessment.recommendedPackage === "2bottles"
                        ? "Recommended Pack"
                        : "Complete Treatment Pack"}
                  </span>
                  <span className="text-3xl font-bold text-green-700">
                    {assessment.recommendedPackage === "1bottle"
                      ? "₦1,850"
                      : assessment.recommendedPackage === "2bottles"
                        ? "₦3,500"
                        : "₦5,100"}
                  </span>
                </div>
                <p className="text-green-800 text-sm">{assessment.recommendation}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <a
                  href="/#order-form"
                  className="w-full bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-3 rounded-lg text-center transition-colors"
                >
                  Order Now →
                </a>
                <button
                  onClick={() => {
                    reset();
                  }}
                  className="w-full bg-white border-2 border-[#1B4332] text-[#1B4332] font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Start Over
                </button>
              </div>
            </>
          )}

          {assessment.shouldSeeDentist && (
            <div className="flex flex-col gap-3">
              <p className="text-gray-600 text-sm">
                Please consult with a dental professional for proper diagnosis and treatment.
                Teethmocure can provide relief while you seek professional care.
              </p>
              <button
                onClick={reset}
                className="w-full bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-3 rounded-lg transition-colors"
              >
                Check Different Symptoms
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Symptoms */}
        <FormField label="What symptoms are you experiencing?" required>
          <textarea
            value={form.symptoms}
            onChange={(e) => updateForm("symptoms", e.target.value)}
            placeholder="e.g., sharp tooth pain, swollen gums, bad breath..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white resize-none"
          />
        </FormField>

        {/* Duration */}
        <FormField label="How long have you had this?">
          <input
            type="text"
            value={form.duration}
            onChange={(e) => updateForm("duration", e.target.value)}
            placeholder="e.g., 2 days, 1 week, just started..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
          />
        </FormField>

        {/* Severity */}
        <FormField label="Severity (on a scale of 1-10)">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={form.severity}
              onChange={(e) => updateForm("severity", parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1B4332]"
            />
            <div className="text-3xl font-bold text-[#1B4332] w-12 text-center">
              {form.severity}
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
        </FormField>

        {/* Previously Tried */}
        <FormField label="What have you tried before?">
          <input
            type="text"
            value={form.triedBefore}
            onChange={(e) => updateForm("triedBefore", e.target.value)}
            placeholder="e.g., paracetamol, dental visits, nothing yet..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
          />
        </FormField>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
            <p className="font-semibold">Error</p>
            <p>{error.message}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !form.symptoms.trim()}
          className="w-full bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Assessing..." : "Get My Assessment →"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          This assessment is for informational purposes only and not a medical diagnosis.
        </p>
      </form>
    </div>
  );
}

export default SymptomChecker;
