/**
 * useAiChat Hook
 * Manages chat state and communication with Claude AI
 */

import { useState, useCallback, useRef } from "react";
import { AiMessage, ChatResponse, ChatRequest } from "@/types/ai";
import { chatService } from "@/api/aiService";

export interface UseAiChatReturn {
  conversationId: string;
  messages: AiMessage[];
  loading: boolean;
  error: Error | null;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
  isRateLimited: boolean;
}

export function useAiChat(userId: string, mode: "chat" | "symptom_check" | "recommendation" = "chat"): UseAiChatReturn {
  const [conversationId, setConversationId] = useState<string>("");
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const requestCountRef = useRef(0);

  const sendMessage = useCallback(
    async (message: string) => {
      // Rate limiting check
      if (requestCountRef.current >= 100) {
        setIsRateLimited(true);
        setError(new Error("Rate limit exceeded. Please wait before sending more messages."));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Add user message to local state immediately
        const userMessage: AiMessage = {
          role: "user",
          content: message,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);

        // Send to API
        const response: ChatResponse = await chatService.send({
          userId,
          conversationId,
          message,
          mode,
        });

        // Update conversation ID if new
        if (!conversationId) {
          setConversationId(response.conversationId);
        }

        // Add assistant response
        const assistantMessage: AiMessage = {
          role: "assistant",
          content: response.message,
          timestamp: response.timestamp,
        };
        setMessages((prev) => [...prev, assistantMessage]);

        // Track request count
        requestCountRef.current++;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to send message");
        setError(error);

        // Remove the user message if request failed
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setLoading(false);
      }
    },
    [userId, conversationId, mode]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationId("");
    setError(null);
    requestCountRef.current = 0;
    setIsRateLimited(false);
  }, []);

  return {
    conversationId,
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
    isRateLimited,
  };
}
