/**
 * Marketer Application Page
 * Apply to become a Teethmocure marketer/affiliate
 */

import { Link } from "react-router-dom";
import { TrendingUp, DollarSign, Users, Gift } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { FormField, Form } from "@/components/common";
import { ALL_NIGERIAN_STATES } from "@/config/constants";

export default function MarketerApplication() {
  const formHandler = useForm(
    {
      full_name: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      experience: "no_experience",
      bank_name: "",
      account_number: "",
      account_name: "",
    },
    async (data) => {
      // Submit marketer application to Base44
      console.log("Marketer application submitted:", data);
      // TODO: Call marketerService.createMarketer(data)
    }
  );

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
            <Link to="/#order-form" className="bg-[#1B4332] text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-[#16382a] transition-colors">
              Order Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] text-white px-5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Become a Teethmocure Marketer</h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Earn high commissions by sharing a product you believe in. Help Nigerians solve gum problems while building
            your income.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Why Join Us?</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: DollarSign,
                title: "High Commissions",
                desc: "₦300-₦900 per bottle. Earn more with bulk orders.",
              },
              {
                icon: TrendingUp,
                title: "Growing Demand",
                desc: "10,000+ customers monthly. High conversion rates.",
              },
              {
                icon: Users,
                title: "Marketing Support",
                desc: "We provide sales materials, scripts, and training.",
              },
              {
                icon: Gift,
                title: "Bonuses & Rewards",
                desc: "Referral bonuses, leaderboard prizes, special offers.",
              },
            ].map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Table */}
      <section className="py-16 md:py-24 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Commission Structure</h2>
            <p className="text-gray-600">Earn per bottle delivered to your customers</p>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1B4332] text-white">
                  <th className="px-6 py-4 text-left font-bold">Package</th>
                  <th className="px-6 py-4 text-left font-bold">Price</th>
                  <th className="px-6 py-4 text-left font-bold">Your Commission</th>
                  <th className="px-6 py-4 text-left font-bold">Profit %</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 font-semibold">1 Bottle Starter</td>
                  <td className="px-6 py-4">₦2,600</td>
                  <td className="px-6 py-4 font-bold text-green-600">₦300</td>
                  <td className="px-6 py-4">11.5%</td>
                </tr>
                <tr className="border-t border-gray-200 bg-green-50">
                  <td className="px-6 py-4 font-semibold">2 Bottles (Recommended) ⭐</td>
                  <td className="px-6 py-4">₦4,900</td>
                  <td className="px-6 py-4 font-bold text-green-600">₦650</td>
                  <td className="px-6 py-4">13.3%</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="px-6 py-4 font-semibold">3 Bottles Complete</td>
                  <td className="px-6 py-4">₦7,100</td>
                  <td className="px-6 py-4 font-bold text-green-600">₦900</td>
                  <td className="px-6 py-4">12.7%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 font-semibold mb-2">💡 Example Earnings</p>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>• Sell 10 × 2-bottle orders per month = ₦6,500 commission</li>
              <li>• Sell 20 × 2-bottle orders per month = ₦13,000 commission</li>
              <li>• Sell 50 × 2-bottle orders per month = ₦32,500 commission (passive income!)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Apply Now</h2>
            <p className="text-gray-600">Quick 5-minute application. Approval within 24 hours.</p>
          </div>

          <Form onSubmit={formHandler.handleSubmit} submitting={formHandler.submitting} className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="space-y-6">
              <FormField label="Full Name" required error={formHandler.errors.full_name}>
                <input
                  type="text"
                  {...formHandler.getFieldProps("full_name")}
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                />
              </FormField>

              <FormField label="Email" required error={formHandler.errors.email}>
                <input
                  type="email"
                  {...formHandler.getFieldProps("email")}
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                />
              </FormField>

              <FormField label="Phone" required error={formHandler.errors.phone}>
                <input
                  type="tel"
                  {...formHandler.getFieldProps("phone")}
                  placeholder="08012345678"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                />
              </FormField>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField label="State" required error={formHandler.errors.state}>
                  <select
                    {...formHandler.getFieldProps("state")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                  >
                    <option value="">Select state</option>
                    {ALL_NIGERIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="City/LGA">
                  <input
                    type="text"
                    {...formHandler.getFieldProps("city")}
                    placeholder="Your city or LGA"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                  />
                </FormField>
              </div>

              <FormField label="Marketing Experience">
                <select
                  {...formHandler.getFieldProps("experience")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                >
                  <option value="no_experience">No experience (we'll train you!)</option>
                  <option value="some_experience">Some experience with sales/marketing</option>
                  <option value="experienced">Experienced marketer/distributor</option>
                </select>
              </FormField>

              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-bold text-gray-900 mb-4">Bank Details (For Payouts)</h3>

                <div className="space-y-6">
                  <FormField label="Bank Name">
                    <input
                      type="text"
                      {...formHandler.getFieldProps("bank_name")}
                      placeholder="e.g., Access Bank"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                    />
                  </FormField>

                  <FormField label="Account Number">
                    <input
                      type="text"
                      {...formHandler.getFieldProps("account_number")}
                      placeholder="10 digits"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                    />
                  </FormField>

                  <FormField label="Account Name">
                    <input
                      type="text"
                      {...formHandler.getFieldProps("account_name")}
                      placeholder="Exactly as shown on bank"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                    />
                  </FormField>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                <p className="font-semibold mb-2">✅ What Happens Next</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>We review your application (24 hours)</li>
                  <li>You get approved and receive your referral code</li>
                  <li>Start sharing and earning immediately</li>
                  <li>Payouts every Friday for the week's sales</li>
                </ol>
              </div>

              <button
                type="submit"
                disabled={formHandler.submitting}
                className="w-full bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formHandler.submitting ? "Submitting..." : "Submit Application →"}
              </button>
            </div>
          </Form>
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
