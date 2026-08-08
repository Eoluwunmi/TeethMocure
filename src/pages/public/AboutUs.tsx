/**
 * About Us Page
 * Company story, mission, and values
 */

import { Link } from "react-router-dom";
import { Heart, Target, Zap, Users } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-5 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1B4332] rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded-full" />
            </div>
            <span className="font-bold text-[#1B4332] text-lg">Teethmocure</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              Home
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              Contact
            </Link>
            <Link to="/#order-form" className="bg-[#1B4332] text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-[#16382a] transition-colors">
              Order Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] text-white px-5 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Story</h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Teethmocure was born from frustration. Founder Dr. Chioma watched her family struggle with gum disease for years.
            Existing solutions were expensive, harsh, or simply didn't work. So she did what any scientist would do—she created
            something better.
          </p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">The Problem</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Millions of Nigerians suffer from bleeding gums, painful teeth, and gum disease. Many either:
              </p>
              <ul className="space-y-3 text-gray-600 mb-6">
                <li className="flex gap-3">
                  <span className="text-[#1B4332] font-bold flex-shrink-0">❌</span>
                  <span>Wait until it becomes an emergency (expensive root canals, extractions)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1B4332] font-bold flex-shrink-0">❌</span>
                  <span>Use harsh mouthwashes that burn and damage healthy tissue</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1B4332] font-bold flex-shrink-0">❌</span>
                  <span>Can't afford frequent dentist visits (N20,000+ per visit)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#1B4332] font-bold flex-shrink-0">❌</span>
                  <span>Try unreliable natural remedies that don't work</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold">
                We said: <em>"There has to be a better way."</em>
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200">
              <p className="text-red-900 font-bold mb-4">Gum Disease Statistics:</p>
              <ul className="space-y-3 text-red-800 text-sm">
                <li>• <strong>70%</strong> of Nigerians experience gum bleeding</li>
                <li>• <strong>40%</strong> never seek treatment until pain is severe</li>
                <li>• <strong>#1 reason</strong> for tooth loss is gum disease, not decay</li>
                <li>• <strong>Untreated</strong> gum disease can lead to heart disease</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-16 md:py-24 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200 order-2 md:order-1">
              <p className="text-green-900 font-bold mb-4">Teethmocure Delivers:</p>
              <ul className="space-y-3 text-green-800 text-sm">
                <li>✅ <strong>Stops bleeding</strong> in 3-7 days (clinically tested)</li>
                <li>✅ <strong>Reduces pain</strong> within hours of first use</li>
                <li>✅ <strong>Affordable</strong> – Less than a dentist visit</li>
                <li>✅ <strong>Safe & gentle</strong> – No harsh chemicals</li>
                <li>✅ <strong>NAFDAC approved</strong> – Trusted by regulators</li>
                <li>✅ <strong>Fast delivery</strong> – Lagos & Ogun in 24-48hrs</li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Our Solution</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Teethmocure is a clinically-formulated oral health solution that works with your body's natural healing
                processes to:
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex gap-2">
                  <span className="text-[#1B4332]">🧬</span>
                  <span>Reduce inflammation in gum tissue</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1B4332]">💊</span>
                  <span>Stop bacterial growth that causes bleeding</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1B4332]">🩹</span>
                  <span>Promote tissue regeneration and healing</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#1B4332]">🛡️</span>
                  <span>Protect teeth and gums long-term</span>
                </li>
              </ul>
              <p className="text-gray-700 font-semibold text-lg">
                Result? Healthy gums, strong teeth, beautiful smile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">What drives us every day</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Customer First",
                desc: "Your health and satisfaction is everything. We stand behind our product 100%.",
              },
              {
                icon: Target,
                title: "Quality",
                desc: "We never cut corners. Every batch is tested. NAFDAC approved. Always.",
              },
              {
                icon: Zap,
                title: "Innovation",
                desc: "We combine traditional remedies with modern science for better results.",
              },
              {
                icon: Users,
                title: "Community",
                desc: "We're building a community of healthy, confident Nigerians.",
              },
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-gray-600 text-lg">Passionate about oral health</p>
          </div>

          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h3 className="font-bold text-2xl text-gray-900 mb-2">Dr. Chioma Okafor</h3>
            <p className="text-[#1B4332] font-semibold mb-4">Founder & Chief Scientist</p>
            <p className="text-gray-600 leading-relaxed mb-4">
              With over 10 years in dental research and formulation, Dr. Okafor saw a gap in the market for an effective,
              affordable oral health solution. Frustrated by expensive treatments and ineffective alternatives, she spent 3
              years developing Teethmocure. Today, it's trusted by thousands.
            </p>
            <p className="text-gray-600">
              <strong>Education:</strong> BSc Microbiology (University of Lagos), MSc Dental Science (University of Ibadan)
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B4332] text-white py-16 md:py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Join the Teethmocure Family</h2>
          <p className="text-white/80 text-lg mb-8">
            Thousands of Nigerians are already experiencing relief. Be next.
          </p>
          <Link
            to="/#order-form"
            className="inline-block bg-[#C8A94C] hover:bg-[#b8983e] text-white font-bold px-10 py-4 rounded-lg transition-colors"
          >
            Order Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-5">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>© 2024 Teethmocure · Lydfem Group · All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
