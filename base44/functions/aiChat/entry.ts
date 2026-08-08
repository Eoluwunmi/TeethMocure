/**
 * Base44 Function: AI Chat
 * Handles customer chat with Claude AI assistant
 * Endpoint: POST /api/ai/chat
 */

import Anthropic from "@anthropic-ai/sdk";
import { createClientFromRequest } from "npm:@base44/sdk@0.8.23";

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

// System prompt for Teethmocure chat assistant
const SYSTEM_PROMPT = `You are a friendly and helpful Teethmocure customer support assistant.

ABOUT TEETHMOCURE:
- NAFDAC-approved herbal mouth & teeth mixture (Reg: A7-4418L)
- Produced by Lydfem International Limited
- Main benefits: fast toothache relief, reduces swelling, fights oral infections
- 100% natural, herbal formula
- No harsh chemicals

HOW TO USE:
- Adults: 1 tablespoon in mouth or on affected area, gargle for 1-2 minutes, then spit out
- Children <10 years: Apply small amount on cotton wool, leave for 1-2 minutes (do NOT rinse)
- Can be used multiple times daily as needed

PACKAGES & PRICING:
- Starter Pack: 1 bottle, ₦1,850 (paid delivery)
- Recommended Pack: 2 bottles, ₦3,500 (FREE delivery) - most popular
- Complete Treatment: 3 bottles, ₦5,100 (FREE delivery) - best value

DELIVERY:
- Lagos: 1-2 business days
- Ogun State: 2-3 business days
- Pay on Delivery available

GUIDELINES:
1. Be empathetic and supportive
2. Recommend Teethmocure for toothache, swelling, infection, bad breath
3. Suggest appropriate package size based on their need
4. For serious cases (severe pain >1 week, fever, exposed nerve), suggest seeing dentist
5. Always mention NAFDAC approval
6. If customer wants to order: WhatsApp +2348107610457 or website teethmocure.com

TONE: Warm, helpful, professional, brief (2-4 sentences max)
LANGUAGE: Nigeria English`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  userId: string;
  conversationId?: string;
  message: string;
  mode?: string;
  history?: ChatMessage[];
}

Deno.serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("OK", { headers: corsHeaders });
  }

  // Only POST allowed
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: RequestBody = await req.json();

    // Validate required fields
    if (!body.userId || !body.message) {
      return new Response(
        JSON.stringify({ error: "Missing userId or message" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate conversation ID if not provided
    const conversationId = body.conversationId || `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Build message history for Claude
    const messages: ChatMessage[] = body.history || [];
    messages.push({
      role: "user",
      content: body.message,
    });

    // Call Claude API
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    // Extract response text
    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "I couldn't generate a response. Please try again.";

    // Store conversation in database (optional - commented for now)
    // const base44 = createClientFromRequest(req);
    // await base44.entities.ConversationHistory.create({
    //   user_id: body.userId,
    //   conversation_id: conversationId,
    //   mode: body.mode || "chat",
    //   messages: [...messages, { role: "assistant", content: assistantMessage }],
    // });

    return new Response(
      JSON.stringify({
        conversationId,
        message: assistantMessage,
        mode: body.mode || "chat",
        timestamp: new Date().toISOString(),
        metadata: {
          tokens_used: response.usage.input_tokens + response.usage.output_tokens,
          model: "claude-3-5-sonnet-20241022",
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("AI Chat Error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const statusCode = errorMessage.includes("API") ? 503 : 500;

    return new Response(
      JSON.stringify({
        error: errorMessage,
        code: "AI_CHAT_ERROR",
        statusCode,
        retryable: statusCode === 503,
      }),
      {
        status: statusCode,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
