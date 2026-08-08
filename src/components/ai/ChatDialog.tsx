/**
 * ChatDialog Component
 * Full-screen chat interface
 */

import React, { useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { UseAiChatReturn } from "@/hooks/useAiChat";
import { ChatMessage } from "./ChatMessage";

interface ChatDialogProps {
  visible: boolean;
  onClose: () => void;
  chat: UseAiChatReturn;
  title?: string;
  subtitle?: string;
}

export function ChatDialog({
  visible,
  onClose,
  chat,
  title = "Chat with Teethmocure AI",
  subtitle = "Get instant answers about our products",
}: ChatDialogProps) {
  const [input, setInput] = React.useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  const handleSend = async () => {
    if (!input.trim() || chat.loading) return;

    const message = input;
    setInput("");
    await chat.sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !chat.loading) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1B4332] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">{title}</h2>
            {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {chat.messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <p className="text-2xl mb-2">👋</p>
                <p className="text-sm">Start chatting! Ask anything about Teethmocure.</p>
              </div>
            </div>
          )}

          {chat.messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}

          {chat.loading && (
            <ChatMessage
              message={{ role: "assistant", content: "" }}
              isLoading={true}
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Display */}
        {chat.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mx-4 text-sm text-red-700">
            <p className="font-semibold">Error</p>
            <p>{chat.error.message}</p>
          </div>
        )}

        {/* Rate Limit Warning */}
        {chat.isRateLimited && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mx-4 text-sm text-yellow-700">
            <p>Rate limit exceeded. Please wait before sending more messages.</p>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={chat.loading || chat.isRateLimited}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || chat.loading || chat.isRateLimited}
              className="bg-[#1B4332] hover:bg-[#16382a] text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatDialog;
