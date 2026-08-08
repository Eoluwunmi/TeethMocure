/**
 * Contact Us Page
 * Customer support and inquiries
 */

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { FormField, Form } from "@/components/common";
import { WHATSAPP_SUPPORT_LINK } from "@/config/constants";

export default function ContactUs() {
  const formHandler = useForm(
    { full_name: "", email: "", phone: "", subject: "", message: "" },
    async (data) => {
      // Submit contact form to Base44
      console.log("Contact form submitted:", data);
      // TODO: Call leadService.createLead(data)
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
            <Link to="/about" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              About
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Get in Touch</h1>
          <p className="text-white/80 text-lg">Have questions? Our team is here to help 24/7.</p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MessageSquare,
                title: "WhatsApp",
                desc: "Fastest way to reach us",
                contact: "+234 809 4029 139",
                action: WHATSAPP_SUPPORT_LINK,
                actionText: "Chat Now",
              },
              {
                icon: Mail,
                title: "Email",
                desc: "Send us a message",
                contact: "support@teethmocure.com",
                action: "mailto:support@teethmocure.com",
                actionText: "Send Email",
              },
              {
                icon: Phone,
                title: "Phone",
                desc: "Call our team",
                contact: "+234 810 7610 457",
                action: "tel:+2348107610457",
                actionText: "Call Now",
              },
            ].map((method, i) => (
              <a
                key={i}
                href={method.action}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-[#1B4332] rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{method.desc}</p>
                <p className="font-semibold text-[#1B4332] mb-4">{method.contact}</p>
                <button className="bg-[#1B4332] hover:bg-[#16382a] text-white font-bold px-6 py-2 rounded-lg transition-colors text-sm">
                  {method.actionText}
                </button>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Send us a Message</h2>
              <p className="text-gray-600">We typically respond within 2 hours during business hours.</p>
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

                <FormField label="Phone (Optional)">
                  <input
                    type="tel"
                    {...formHandler.getFieldProps("phone")}
                    placeholder="08012345678"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                  />
                </FormField>

                <FormField label="Subject" required error={formHandler.errors.subject}>
                  <select
                    {...formHandler.getFieldProps("subject")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="product_inquiry">Product Inquiry</option>
                    <option value="order_support">Order Support</option>
                    <option value="health_question">Health Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </FormField>

                <FormField label="Message" required error={formHandler.errors.message}>
                  <textarea
                    {...formHandler.getFieldProps("message")}
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white resize-none"
                  />
                </FormField>

                <button
                  type="submit"
                  disabled={formHandler.submitting}
                  className="w-full bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formHandler.submitting ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How long does Teethmocure take to work?",
                a: "Most customers see results within 3-7 days. Bleeding typically stops first, followed by pain relief. Full healing takes 2-4 weeks depending on severity.",
              },
              {
                q: "Is Teethmocure safe?",
                a: "Yes! Teethmocure is NAFDAC-approved and made with natural, clinically-tested ingredients. No harsh chemicals or side effects. Safe for daily use.",
              },
              {
                q: "Can I use it with other oral care products?",
                a: "Absolutely! Teethmocure works best with regular brushing and flossing. Continue your normal dental hygiene routine.",
              },
              {
                q: "What if it doesn't work for me?",
                a: "We offer a 30-day money-back guarantee. If you're not satisfied, contact us and we'll refund your full payment—no questions asked.",
              },
              {
                q: "How do I order?",
                a: "Simply visit our home page and fill out the order form. We deliver to Lagos and Ogun within 24-48 hours. Pay on delivery available.",
              },
              {
                q: "Do you deliver outside Lagos and Ogun?",
                a: "Yes! We ship nationwide. Contact our WhatsApp team for nationwide delivery rates and timelines.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <summary className="font-bold text-gray-900 flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-[#1B4332]">+</span>
                </summary>
                <p className="text-gray-600 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B4332] text-white py-16 md:py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Still Have Questions?</h2>
          <p className="text-white/80 text-lg mb-8">Chat with our AI assistant on any page—it's available 24/7.</p>
          <Link
            to="/"
            className="inline-block bg-[#C8A94C] hover:bg-[#b8983e] text-white font-bold px-10 py-4 rounded-lg transition-colors"
          >
            Back to Home →
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
