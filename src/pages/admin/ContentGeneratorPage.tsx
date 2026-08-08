/**
 * Content Generator Page
 * Admin tool for generating health content
 */

import { useContentGenerator } from "@/hooks";
import { ContentGenerator } from "@/components/ai";
import RoleGuard from "@/components/auth/RoleGuard";

export default function ContentGeneratorPage() {
  const gen = useContentGenerator();

  return (
    <RoleGuard allowedRoles={["owner"]}>
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
              ✨ AI Tools
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Content Generator</h1>
            <p className="text-gray-500 text-sm mt-2">
              Generate blog posts, FAQs, and product descriptions powered by Claude AI
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: "📝",
                title: "Blog Posts",
                desc: "Full articles on oral health topics",
              },
              {
                icon: "❓",
                title: "FAQs",
                desc: "Common customer questions answered",
              },
              {
                icon: "📦",
                title: "Descriptions",
                desc: "Product details and benefits",
              },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Generator */}
          <ContentGenerator {...gen} />

          {/* Help Section */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-blue-900 mb-3">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>
                <strong>Specific topics work best:</strong> "How to prevent tooth decay" rather than "dental health"
              </li>
              <li>
                <strong>Mix tones:</strong> Use "Professional" for health guides, "Friendly" for customer emails
              </li>
              <li>
                <strong>SEO keywords:</strong> Content includes relevant keywords for search ranking
              </li>
              <li>
                <strong>Mention Teethmocure naturally:</strong> AI integrates product mentions, not forced ads
              </li>
            </ul>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
