/**
 * Oral Health Tips Page
 * Blog and health education content
 */

import { Link } from "react-router-dom";
import { Clock, User } from "lucide-react";

export default function OralHealthTips() {
  const articles = [
    {
      id: 1,
      title: "5 Signs Your Gums Need Attention",
      excerpt:
        "Bleeding gums, bad breath, and sensitivity are warning signs. Don't ignore them—learn what they mean and what to do.",
      category: "Health",
      readTime: 5,
      date: "Aug 1, 2024",
    },
    {
      id: 2,
      title: "The Best Foods for Gum Health",
      excerpt: "Discover which foods strengthen gums, fight bacteria, and promote natural healing. Plus: foods to avoid.",
      category: "Nutrition",
      readTime: 7,
      date: "Jul 28, 2024",
    },
    {
      id: 3,
      title: "Brushing vs. Flossing: Which Matters More?",
      excerpt:
        "The debate settled. Learn the proper technique for both and why doing both is essential for healthy teeth and gums.",
      category: "Habits",
      readTime: 6,
      date: "Jul 25, 2024",
    },
    {
      id: 4,
      title: "Why Your Dentist Won't Stop Talking About Gum Disease",
      excerpt: "Gum disease affects 70% of adults. Understand the progression from gingivitis to periodontitis—and how to prevent it.",
      category: "Health",
      readTime: 8,
      date: "Jul 22, 2024",
    },
    {
      id: 5,
      title: "Natural Remedies vs. Medical Treatment: What Works?",
      excerpt: "Oil pulling, salt water, and more. We break down what science says about home remedies for gum problems.",
      category: "Treatment",
      readTime: 9,
      date: "Jul 18, 2024",
    },
    {
      id: 6,
      title: "The Connection Between Oral Health and Overall Wellness",
      excerpt: "Your mouth is a window to your body. Discover how gum disease affects your heart, diabetes, and more.",
      category: "Wellness",
      readTime: 10,
      date: "Jul 15, 2024",
    },
  ];

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
      <section className="bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] text-white px-5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Oral Health Tips & Insights</h1>
          <p className="text-white/80 text-lg">Expert advice on keeping your teeth and gums healthy</p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-[#1B4332] to-[#2d6a4f] h-40" />

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold bg-[#1B4332]/10 text-[#1B4332] px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 hover:text-[#1B4332] transition-colors cursor-pointer">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readTime} min read</span>
                    </div>
                    <button className="text-[#1B4332] font-semibold hover:underline">Read More →</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 px-5 bg-[#1B4332]/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Get Health Tips in Your Inbox</h2>
          <p className="text-gray-600 text-lg mb-8">Join 5,000+ subscribers getting weekly oral health tips</p>

          <form className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
            />
            <button className="bg-[#1B4332] hover:bg-[#16382a] text-white font-bold px-8 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </form>

          <p className="text-gray-500 text-xs mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1B4332] text-white py-16 md:py-20 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Take Action?</h2>
          <p className="text-white/80 text-lg mb-8">Knowledge is great, but results require action. Get Teethmocure today.</p>
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
