/**
 * Landing Page
 * Main homepage with hero, pricing, order form, testimonials
 */

import { Link } from "react-router-dom";
import { ChevronRight, Check, Star, Truck, Lock, Headphones } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { useProductRecommendation } from "@/hooks";
import { FormField, Form } from "@/components/common";
import { RecommendationWidget } from "@/components/ai";
import { PACKAGES, WHATSAPP_LINK } from "@/config/constants";

export default function LandingPage() {
  const formHandler = useForm(
    { full_name: "", phone: "", email: "", package: "2bottles", state: "Lagos", address: "" },
    async (data) => {
      // Submit order to Base44
      console.log("Order submitted:", data);
      // TODO: Call orderService.createOrder(data)
    }
  );

  const rec = useProductRecommendation();

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
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              Why It Works
            </a>
            <Link to="/oral-health-tips" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              Health Tips
            </Link>
            <a href="#testimonials" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              Reviews
            </a>
            <Link to="/contact" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              Contact
            </Link>
          </div>
          <a
            href="#order-form"
            className="bg-[#1B4332] text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-[#16382a] transition-colors"
          >
            Order Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B4332] via-[#2d6a4f] to-[#1B4332] text-white px-5 py-20 md:py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-white/60 tracking-widest uppercase mb-4">Trusted by 1000+ Nigerians</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Say Goodbye to Gum Pain & Bleeding
          </h1>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Teethmocure is a clinically-formulated, NAFDAC-approved solution that stops bleeding gums, reduces pain, and
            promotes healing. Results in just 7 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#order-form"
              className="bg-[#C8A94C] hover:bg-[#b8983e] text-white font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Order Now <ChevronRight size={20} />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
          <p className="text-white/60 text-sm mt-6">💚 Pay on Delivery • Fast Lagos & Ogun Delivery • 100% Safe</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-[#1B4332] tracking-widest uppercase mb-3">Why Choose Teethmocure</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Clinically Proven Results</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Formulated by dental experts, trusted by thousands
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✅",
                title: "Stops Bleeding in 7 Days",
                desc: "Our proprietary formula targets the root cause and stops gum bleeding fast.",
              },
              {
                icon: "😊",
                title: "Reduces Pain Instantly",
                desc: "Feel relief from pain and discomfort within hours of first use.",
              },
              {
                icon: "🦷",
                title: "NAFDAC Approved",
                desc: "Registered and approved by Nigeria's FDA. Safe for daily use.",
              },
              {
                icon: "⏱️",
                title: "Results You See",
                desc: "Most customers see visible improvement in the first week.",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Free delivery on 2+ bottles. Pay on delivery in Lagos & Ogun.",
              },
              {
                icon: "💬",
                title: "24/7 Support",
                desc: "Our AI assistant answers questions anytime. Real humans also available.",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-[#1B4332] tracking-widest uppercase mb-3">Simple Pricing</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Choose Your Package</h2>
            <p className="text-gray-600 text-lg">All packages include free support and satisfaction guarantee</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-xl overflow-hidden transition-all ${
                  pkg.featured
                    ? "ring-2 ring-[#1B4332] transform scale-105 bg-[#1B4332]/5"
                    : "bg-white border border-gray-200"
                }`}
              >
                {pkg.featured && (
                  <div className="bg-[#1B4332] text-white py-2 text-center text-sm font-bold">
                    Most Popular ⭐
                  </div>
                )}

                <div className="p-8">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{pkg.label}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.bottles}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-[#1B4332]">{pkg.price}</span>
                  </div>

                  <p
                    className={`text-sm font-bold mb-6 ${
                      pkg.delivery.includes("FREE")
                        ? "text-green-600 bg-green-50 py-2 px-3 rounded-lg text-center"
                        : "text-gray-600"
                    }`}
                  >
                    {pkg.delivery}
                  </p>

                  <button
                    onClick={() => formHandler.setFieldValue("package", pkg.id)}
                    className={`w-full font-bold py-3 rounded-lg transition-colors ${
                      pkg.featured
                        ? "bg-[#1B4332] text-white hover:bg-[#16382a]"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Choose This
                  </button>

                  <ul className="mt-6 space-y-3 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-green-600 flex-shrink-0" />
                      Stops bleeding & pain
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-green-600 flex-shrink-0" />
                      NAFDAC certified
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} className="text-green-600 flex-shrink-0" />
                      30-day guarantee
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-16 md:py-24 px-5 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Order Teethmocure Today</h2>
            <p className="text-gray-600">Fast delivery to Lagos & Ogun. Pay on delivery available.</p>
          </div>

          {/* AI Recommendation */}
          <div className="mb-10">
            <RecommendationWidget {...rec} />
          </div>

          {/* Order Form */}
          <Form onSubmit={formHandler.handleSubmit} submitting={formHandler.submitting} className="bg-white rounded-xl p-8 shadow-sm">
            <div className="space-y-6">
              <FormField label="Full Name" required error={formHandler.errors.full_name}>
                <input
                  type="text"
                  {...formHandler.getFieldProps("full_name")}
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                />
              </FormField>

              <FormField label="Phone Number" required error={formHandler.errors.phone}>
                <input
                  type="tel"
                  {...formHandler.getFieldProps("phone")}
                  placeholder="e.g., 08012345678"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                />
              </FormField>

              <FormField label="Email (Optional)">
                <input
                  type="email"
                  {...formHandler.getFieldProps("email")}
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                />
              </FormField>

              <FormField label="Delivery State" required error={formHandler.errors.state}>
                <select
                  {...formHandler.getFieldProps("state")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Others">Other States (Nationwide shipping available)</option>
                </select>
              </FormField>

              <FormField label="Delivery Address" required error={formHandler.errors.address}>
                <textarea
                  {...formHandler.getFieldProps("address")}
                  placeholder="Your complete delivery address"
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white resize-none"
                />
              </FormField>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-2">💳 Payment</p>
                <p>We accept <strong>Pay on Delivery</strong>. You can also bank transfer after placing order.</p>
              </div>

              <button
                type="submit"
                disabled={formHandler.submitting}
                className="w-full bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-lg"
              >
                {formHandler.submitting ? "Processing..." : "Complete Order →"}
              </button>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 pt-4">
                <div className="flex items-center gap-2">
                  <Truck size={16} />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock size={16} />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones size={16} />
                  <span>Support</span>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-[#1B4332] tracking-widest uppercase mb-3">Real Results</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Chioma O.",
                city: "Lagos",
                rating: 5,
                text: "I've tried everything. Teethmocure worked in just 3 days! The bleeding stopped and I can finally eat normally again.",
              },
              {
                name: "Tunde A.",
                city: "Ogun State",
                rating: 5,
                text: "Best purchase ever. My gums were so painful I couldn't chew. Now I'm completely pain-free. Highly recommended!",
              },
              {
                name: "Folake M.",
                city: "Lagos",
                rating: 5,
                text: "I was skeptical but the results speak for themselves. My dentist was shocked at how much my gums improved.",
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-[#C8A94C] text-[#C8A94C]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B4332] text-white py-16 md:py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get Relief?</h2>
          <p className="text-white/80 text-lg mb-8">Join over 1,000 satisfied customers. Start your healing journey today.</p>
          <a
            href="#order-form"
            className="inline-block bg-[#C8A94C] hover:bg-[#b8983e] text-white font-bold px-10 py-4 rounded-lg transition-colors"
          >
            Order Now →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-white mb-4">Teethmocure</h3>
            <p className="text-sm text-gray-400">NAFDAC-approved oral health solution trusted by thousands.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/oral-health-tips" className="hover:text-white transition-colors">
                  Health Tips
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/symptom-checker" className="hover:text-white transition-colors">
                  Symptom Checker
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">For Business</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/marketer-application" className="hover:text-white transition-colors">
                  Become a Marketer
                </Link>
              </li>
              <li>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Teethmocure · Lydfem Group · All Rights Reserved</p>
          <p className="mt-2">NAFDAC Registration Pending</p>
        </div>
      </footer>
    </div>
  );
}
