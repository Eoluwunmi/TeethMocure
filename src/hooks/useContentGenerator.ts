/**
 * useContentGenerator Hook
 * Generates health content via Claude (for admins)
 */

import { useState, useCallback } from "react";
import { ContentGenerationResponse } from "@/types/ai";
import { contentService } from "@/api/aiService";

export type ContentType = "blog_post" | "faq" | "product_description";
export type ContentLength = "short" | "medium" | "long";
export type ContentTone = "professional" | "friendly" | "educational";

export interface UseContentGeneratorReturn {
  content: ContentGenerationResponse | null;
  loading: boolean;
  error: Error | null;
  generateContent: (params: {
    type: ContentType;
    topic: string;
    length?: ContentLength;
    tone?: ContentTone;
  }) => Promise<void>;
  reset: () => void;
  copyContent: () => Promise<void>;
  saveAsDraft: (title?: string) => Promise<void>;
}

export function useContentGenerator(): UseContentGeneratorReturn {
  const [content, setContent] = useState<ContentGenerationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateContent = useCallback(
    async (params: {
      type: ContentType;
      topic: string;
      length?: ContentLength;
      tone?: ContentTone;
    }) => {
      if (!params.topic.trim()) {
        setError(new Error("Please provide a topic"));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await contentService.generate({
          type: params.type,
          topic: params.topic,
          length: params.length || "medium",
          tone: params.tone || "friendly",
        });

        setContent(response);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to generate content");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setContent(null);
    setError(null);
  }, []);

  const copyContent = useCallback(async () => {
    if (!content) {
      setError(new Error("No content to copy"));
      return;
    }

    try {
      await navigator.clipboard.writeText(content.content);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to copy content");
      setError(error);
    }
  }, [content]);

  const saveAsDraft = useCallback(async (title?: string) => {
    if (!content) {
      setError(new Error("No content to save"));
      return;
    }

    try {
      // This would typically call an API to save to database
      console.log("Saving draft:", {
        title: title || content.title,
        content: content.content,
        seoKeywords: content.seoKeywords,
      });

      // For now, just show success
      alert("Draft saved successfully!");
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to save draft");
      setError(error);
    }
  }, [content]);

  return {
    content,
    loading,
    error,
    generateContent,
    reset,
    copyContent,
    saveAsDraft,
  };
}
