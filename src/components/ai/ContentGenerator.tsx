/**
 * ContentGenerator Component
 * Admin tool for generating blog posts, FAQs, product descriptions
 */

import React from "react";
import { Copy, Save } from "lucide-react";
import { UseContentGeneratorReturn, ContentType, ContentLength, ContentTone } from "@/hooks/useContentGenerator";
import { FormField } from "@/components/common";

interface ContentGeneratorProps extends UseContentGeneratorReturn {}

export function ContentGenerator({
  content,
  loading,
  error,
  generateContent,
  reset,
  copyContent,
  saveAsDraft,
}: ContentGeneratorProps) {
  const [type, setType] = React.useState<ContentType>("blog_post");
  const [topic, setTopic] = React.useState("");
  const [length, setLength] = React.useState<ContentLength>("medium");
  const [tone, setTone] = React.useState<ContentTone>("friendly");
  const [title, setTitle] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateContent({ type, topic, length, tone });
  };

  const handleCopy = async () => {
    await copyContent();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (content) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Content Preview */}
        <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Generated Content</p>
              <h2 className="text-lg font-bold text-gray-900">
                {content.title || `${type.replace(/_/g, " ").toUpperCase()}: ${topic}`}
              </h2>
            </div>
            <div className="text-right text-xs text-gray-500">
              <p>{content.length} characters</p>
              <p className="text-[#1B4332] font-semibold">{content.model}</p>
            </div>
          </div>

          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
              {content.content}
            </div>
          </div>

          {content.seoKeywords && content.seoKeywords.length > 0 && (
            <div className="bg-blue-50 px-6 py-3 border-t border-gray-200">
              <p className="text-xs font-semibold text-blue-900 mb-2">SEO Keywords:</p>
              <div className="flex flex-wrap gap-2">
                {content.seoKeywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-200 text-blue-900 text-xs px-2 py-1 rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-3 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy Content"}
          </button>

          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a name..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] mb-2"
            />
            <button
              onClick={() => saveAsDraft(title)}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#1B4332] text-[#1B4332] font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save as Draft
            </button>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={reset}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors"
        >
          Generate Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleGenerate} className="space-y-6 bg-white border-2 border-gray-200 rounded-xl p-6">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            ✨ Content Generator
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Generate Health Content
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Let Claude create blog posts, FAQs, and product descriptions
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Content Type */}
        <FormField label="Content Type" required>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "blog_post", label: "📝 Blog Post" },
              { value: "faq", label: "❓ FAQ" },
              { value: "product_description", label: "📦 Product" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setType(option.value as ContentType)}
                className={`p-3 rounded-lg font-semibold transition-all ${
                  type === option.value
                    ? "bg-[#1B4332] text-white border-2 border-[#1B4332]"
                    : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        {/* Topic */}
        <FormField label="Topic" required>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., How to prevent tooth decay, Best foods for gum health..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] bg-white"
          />
        </FormField>

        {/* Length */}
        <FormField label="Length">
          <div className="flex gap-3">
            {[
              { value: "short", label: "Short (300-400 words)" },
              { value: "medium", label: "Medium (600-800)" },
              { value: "long", label: "Long (1200+)" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setLength(option.value as ContentLength)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  length === option.value
                    ? "bg-[#1B4332] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        {/* Tone */}
        <FormField label="Tone">
          <div className="flex gap-3">
            {[
              { value: "professional", label: "Professional" },
              { value: "friendly", label: "Friendly" },
              { value: "educational", label: "Educational" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setTone(option.value as ContentTone)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tone === option.value
                    ? "bg-[#1B4332] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </FormField>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
            <p className="font-semibold">Error</p>
            <p>{error.message}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="w-full bg-[#1B4332] hover:bg-[#16382a] text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Content →"}
        </button>
      </form>
    </div>
  );
}

export default ContentGenerator;
