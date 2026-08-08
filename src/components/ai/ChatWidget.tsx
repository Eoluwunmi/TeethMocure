/**
 * ChatWidget Component
 * Floating chat bubble in bottom-right corner
 */

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useAiChat } from "@/hooks";
import { ChatDialog } from "./ChatDialog";

interface ChatWidgetProps {
  userId?: string;
  mode?: "chat" | "symptom_check" | "recommendation";
  title?: string;
  subtitle?: string;
  position?: "bottom-right" | "bottom-left";
}

export function ChatWidget({
  userId = "anonymous",
  mode = "chat",
  title,
  subtitle,
  position = "bottom-right",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const chat = useAiChat(userId, mode);

  const positionClass = position === "bottom-left" ? "left-6" : "right-6";

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${positionClass} z-[9997] flex items-center gap-2 bg-[#1B4332] hover:bg-[#16382a] text-white font-bold px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 group`}
        title="Chat with Teethmocure AI"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden group-hover:inline text-sm">Chat with us</span>

        {/* Unread badge */}
        {chat.messages.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {Math.min(chat.messages.filter((m) => m.role === "assistant").length, 9)}
          </span>
        )}
      </button>

      {/* Chat Dialog */}
      <ChatDialog
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        chat={chat}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
}

export default ChatWidget;
