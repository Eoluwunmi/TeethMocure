/**
 * Symptom Checker Page
 * Standalone page for symptom assessment
 */

import { Link } from "react-router-dom";
import { useSymptomChecker } from "@/hooks";
import { SymptomChecker } from "@/components/ai";

export default function SymptomCheckerPage() {
  const checker = useSymptomChecker();

  return (
    <div className="bg-[#F8F9FA] min-h-screen" style={{ fontFamily: "'Inter', 'Open Sans', sans-serif" }}>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-5 py-3 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1B4332] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full" />
            </div>
            <span className="font-bold text-[#1B4332] text-lg tracking-tight">Teethmocure</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/about" className="text-sm text-gray-600 hover:text-[#1B4332] font-medium hidden sm:block">
              About
            </Link>
            <Link to="/#order-form" className="bg-[#1B4332] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-[#16382a] transition-colors">
              Order Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#1B4332] text-white px-5 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold text-white/50 tracking-widest uppercase mb-3">Health Assessment</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Is Teethmocure Right for You?</h1>
          <p className="text-white/70 text-base leading-relaxed">
            Describe your symptoms and let our AI assess whether Teethmocure can help you find relief.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 py-14">
        <SymptomChecker {...checker} />
      </div>

      {/* Footer CTA */}
      <section className="bg-[#1B4332] text-white py-12 text-center">
        <div className="max-w-lg mx-auto px-5">
          <h2 className="text-xl font-bold mb-3">Ready to Order?</h2>
          <p className="text-white/60 text-sm mb-6">
            Fast delivery to Lagos & Ogun State. Pay on Delivery available.
          </p>
          <Link
            to="/#order-form"
            className="inline-block bg-[#C8A94C] hover:bg-[#b8983e] text-white font-bold px-10 py-4 rounded-lg transition-colors"
          >
            Order Teethmocure Now →
          </Link>
        </div>
      </section>

      {/* Bottom Footer */}
      <div className="bg-[#1B4332] text-white text-center py-6 text-xs text-white/40 border-t border-white/10">
        © 2024 Teethmocure · Lydfem Group · All Rights Reserved
      </div>
    </div>
  );
}
