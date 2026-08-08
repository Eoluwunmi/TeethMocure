/**
 * AI Service
 * Handles communication with Claude AI directly
 */

import {
  ChatRequest,
  ChatResponse,
  SymptomCheckRequest,
  SymptomCheckResponse,
  RecommendationRequest,
  RecommendationResponse,
  ContentGenerationRequest,
  ContentGenerationResponse,
} from "@/types/ai";
import { SYSTEM_PROMPTS } from "@/ai/prompts";

/**
 * Rate limiting helper
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit = 100;
  private window = 60 * 60 * 1000; // 1 hour

  isAllowed(userId: string): boolean {
    const now = Date.now();
    const key = userId;

    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }

    const timestamps = this.requests.get(key)!;
    const recentRequests = timestamps.filter((t) => now - t < this.window);

    if (recentRequests.length >= this.limit) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }
}

const rateLimiter = new RateLimiter();

/**
 * Chat Service - uses Claude API directly
 */
export const chatService = {
  async send(request: ChatRequest): Promise<ChatResponse> {
    if (!rateLimiter.isAllowed(request.userId)) {
      throw new Error("Rate limit exceeded. Max 100 requests per hour.");
    }

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

      if (!apiKey) {
        return {
          conversationId: request.conversationId || `conv_${Date.now()}`,
          message: "Welcome to Teethmocure! 👋 I'm here to answer your questions about our oral health products. To enable AI responses, please add your Anthropic API key to the .env file.",
          timestamp: new Date().toISOString(),
          tokens: { input: 0, output: 0 },
        };
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 500,
          system: SYSTEM_PROMPTS.chat,
          messages: [
            {
              role: "user",
              content: request.message,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Claude API error:", error);
        throw new Error(error.error?.message || "Failed to get response from Claude");
      }

      const data = await response.json();
      const message = data.content[0]?.text || "Sorry, I couldn't generate a response.";

      return {
        conversationId: request.conversationId || `conv_${Date.now()}`,
        message,
        timestamp: new Date().toISOString(),
        tokens: {
          input: data.usage?.input_tokens || 0,
          output: data.usage?.output_tokens || 0,
        },
      };
    } catch (error) {
      console.error("Chat service error:", error);
      throw error;
    }
  },
};

/**
 * Symptom Service
 */
export const symptomService = {
  async check(request: SymptomCheckRequest): Promise<SymptomCheckResponse> {
    const userId = "user_" + Math.random().toString(36).substr(2, 9);
    if (!rateLimiter.isAllowed(userId)) {
      throw new Error("Rate limit exceeded. Max 100 requests per hour.");
    }

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

      if (!apiKey) {
        return {
          assessment: "Please add your API key to enable symptom checking.",
          severity: "unknown",
          recommendation: "none",
          shouldSeeDentist: false,
        };
      }

      const prompt = `${SYSTEM_PROMPTS.symptom_check}\n\nSymptoms: ${request.symptoms}\nDuration: ${request.duration}\nSeverity: ${request.severity}/10\nTried: ${request.triedBefore}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 500,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check symptoms");
      }

      const data = await response.json();
      const text = data.content[0]?.text || "";

      return {
        assessment: text,
        severity: request.severity > 7 ? "high" : request.severity > 4 ? "moderate" : "mild",
        recommendation: request.severity > 8 ? "2bottles" : request.severity > 5 ? "2bottles" : "1bottle",
        shouldSeeDentist: request.severity > 8,
      };
    } catch (error) {
      console.error("Symptom check error:", error);
      throw error;
    }
  },
};

/**
 * Recommendation Service
 */
export const recommendationService = {
  async getRecommendation(request: RecommendationRequest): Promise<RecommendationResponse> {
    const userId = "user_" + Math.random().toString(36).substr(2, 9);
    if (!rateLimiter.isAllowed(userId)) {
      throw new Error("Rate limit exceeded. Max 100 requests per hour.");
    }

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

      if (!apiKey) {
        return {
          recommendedPackage: "2bottles",
          reasoning: "Our most popular package - great value and free delivery!",
          price: "N4,900",
        };
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 200,
          system: SYSTEM_PROMPTS.recommendation,
          messages: [
            {
              role: "user",
              content: `Recommend a package based on: ${request.description || "general inquiry"}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data = await response.json();
      const text = data.content[0]?.text || "";

      return {
        recommendedPackage: text.includes("3bottles") ? "3bottles" : text.includes("1bottle") ? "1bottle" : "2bottles",
        reasoning: text,
        price: "N4,900",
      };
    } catch (error) {
      console.error("Recommendation service error:", error);
      throw error;
    }
  },
};

/**
 * Content Service
 */
export const contentService = {
  async generate(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    const userId = "user_" + Math.random().toString(36).substr(2, 9);
    if (!rateLimiter.isAllowed(userId)) {
      throw new Error("Rate limit exceeded. Max 100 requests per hour.");
    }

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

      if (!apiKey) {
        return {
          content: "Please add your API key to generate content.",
          title: request.topic,
          length: 0,
          model: "claude-3.5-sonnet",
          seoKeywords: [],
        };
      }

      const lengthGuide = request.length === "short" ? "300-400 words" : request.length === "medium" ? "600-800 words" : "1200+ words";
      const toneGuide = `in a ${request.tone} tone`;

      const prompt = `${SYSTEM_PROMPTS.content_generation}\n\nGenerate a ${request.type} about: ${request.topic}\nLength: ${lengthGuide}\nTone: ${toneGuide}`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1500,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      const content = data.content[0]?.text || "";

      return {
        content,
        title: request.topic,
        length: content.length,
        model: "claude-3.5-sonnet",
        seoKeywords: extractKeywords(request.topic),
      };
    } catch (error) {
      console.error("Content generation error:", error);
      throw error;
    }
  },
};

/**
 * Helper to extract keywords from topic
 */
function extractKeywords(topic: string): string[] {
  const keywords = topic.split(" ").filter(w => w.length > 3);
  return keywords.slice(0, 5);
}

/**
 * Default export
 */
export default {
  chatService,
  symptomService,
  recommendationService,
  contentService,
};
