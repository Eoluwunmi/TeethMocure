/**
 * AI Features Type Definitions
 */

export type AiMode = "chat" | "symptom_check" | "recommendation";

export interface AiMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatRequest {
  userId: string;
  conversationId?: string;
  message: string;
  mode: AiMode;
}

export interface ChatResponse {
  conversationId: string;
  message: string;
  mode: AiMode;
  timestamp: string;
  metadata?: {
    tokens_used?: number;
    model?: string;
  };
}

export interface SymptomCheckRequest {
  symptoms: string;
  duration?: string;
  severity?: number; // 1-10
  triedBefore?: string;
}

export interface SymptomCheckResponse {
  assessment: string;
  recommendedPackage: "1bottle" | "2bottles" | "3bottles";
  recommendation: string;
  shouldSeeDentist: boolean;
  warnings?: string[];
}

export interface RecommendationRequest {
  symptoms?: string;
  budget?: number;
  desiredDuration?: string;
  previousUse?: boolean;
}

export interface RecommendationResponse {
  recommendedPackage: "1bottle" | "2bottles" | "3bottles";
  reasoning: string;
  price: string;
  benefits: string[];
}

export interface ContentGenerationRequest {
  type: "blog_post" | "faq" | "product_description";
  topic: string;
  length?: "short" | "medium" | "long";
  tone?: "professional" | "friendly" | "educational";
}

export interface ContentGenerationResponse {
  content: string;
  title?: string;
  seoKeywords?: string[];
  length: number;
  model: string;
}

export interface ConversationHistory {
  id: string;
  userId: string;
  conversationId: string;
  mode: AiMode;
  messages: AiMessage[];
  metadata?: {
    sourcePage?: string;
    device?: "mobile" | "desktop";
    converted?: boolean;
  };
  createdDate: string;
  updatedDate?: string;
}

export interface GeneratedContent {
  id: string;
  type: "blog_post" | "faq" | "product_description";
  topic: string;
  content: string;
  status: "draft" | "approved" | "published";
  generatedBy: string;
  seoKeywords?: string[];
  publishedUrl?: string;
  createdDate: string;
  publishedDate?: string;
}

export interface AiApiError {
  error: string;
  code: string;
  statusCode: number;
  retryable: boolean;
}
