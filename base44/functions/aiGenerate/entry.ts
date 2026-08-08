/**
 * Base44 Function: AI Generate
 * Handles content generation, symptom checks, and recommendations
 * Endpoints:
 *   POST /api/ai/generate-content
 *   POST /api/ai/symptom-check
 *   POST /api/ai/recommendation
 */

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

// System prompts for different modes
const SYSTEM_PROMPTS = {
  symptomCheck: `You are an oral health assessment assistant for Teethmocure.

TEETHMOCURE IS IDEAL FOR:
✓ Sharp or dull tooth pain
✓ Swollen gums
✓ Oral infections/pus
✓ Bad breath from bacterial issues
✓ Post-extraction pain
✓ Mouth sores

RED FLAGS - SUGGEST DENTIST:
🚨 Pain lasting >1 week
🚨 Severe swelling affecting breathing/swallowing
🚨 Fever or pus
🚨 Broken/cracked tooth
🚨 Exposed nerve

PACKAGES:
- 1 Bottle (₦1,850): Mild pain, first-time
- 2 Bottles (₦3,500): Moderate pain, backup + FREE delivery
- 3 Bottles (₦5,100): Severe pain, full treatment

RESPONSE FORMAT:
"[Empathy]. Based on your symptoms, I recommend [Package] (₦[Price]).
Reason: [2 sentences].
Ready to order? Visit teethmocure.com"

Keep to 3-4 sentences max.`,

  recommendation: `You are a product recommendation specialist for Teethmocure.

PACKAGES:
1. Starter (₦1,850): First-time, mild pain
2. Recommended (₦3,500): Moderate-severe, popular ⭐
3. Complete (₦5,100): Severe, full cycle 🏆

Consider: severity, budget, duration, backup need.

RESPONSE FORMAT:
"Based on your [situation], I recommend [Package] (₦[Price]).
Why: [2 sentences].
Ready to order? teethmocure.com"

3-4 sentences max.`,

  contentGeneration: `You are a health content writer for Teethmocure, NAFDAC-approved herbal remedy.

AUDIENCE: Nigerian customers, natural oral health solutions

STRUCTURE:
- Title: SEO-friendly, emotion-driven
- Intro: 2 paragraphs (problem)
- Body: 3-4 actionable sections
- Conclusion: Benefits summary
- CTA: "Try Teethmocure for relief"

TOPICS: tooth decay prevention, gum disease, natural remedies, bad breath, sensitive teeth, oral myths, post-extraction care

SEO KEYWORDS: toothache relief, herbal remedy Nigeria, natural teeth care, gum health, NAFDAC approved

TONE: friendly Nigeria English, evidence-based, relatable

INCLUDE:
✓ NAFDAC approval mention
✓ Natural/herbal benefits
✓ Not replacement for serious dental care
✓ Usage instructions
✓ Ordering info`,
};

interface SymptomCheckRequest {
  symptoms: string;
  duration?: string;
  severity?: number;
  triedBefore?: string;
}

interface RecommendationRequest {
  symptoms?: string;
  budget?: number;
  desiredDuration?: string;
}

interface ContentRequest {
  type: string;
  topic: string;
  length?: string;
  tone?: string;
}

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response("OK", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const pathname = new URL(req.url).pathname;

    let systemPrompt = SYSTEM_PROMPTS.contentGeneration;
    let userPrompt = "";

    // Route to appropriate handler
    if (pathname.includes("/symptom-check")) {
      const symptomsReq = body as SymptomCheckRequest;
      systemPrompt = SYSTEM_PROMPTS.symptomCheck;
      userPrompt = `Symptoms: ${symptomsReq.symptoms}
Duration: ${symptomsReq.duration || "not specified"}
Severity (1-10): ${symptomsReq.severity || "not specified"}
Previously tried: ${symptomsReq.triedBefore || "nothing yet"}

Assess if Teethmocure is suitable and recommend a package.`;
    } else if (pathname.includes("/recommendation")) {
      const recReq = body as RecommendationRequest;
      systemPrompt = SYSTEM_PROMPTS.recommendation;
      userPrompt = `Symptoms: ${recReq.symptoms || "general"}
Budget: ${recReq.budget ? `₦${recReq.budget}` : "flexible"}
Desired duration: ${recReq.desiredDuration || "as needed"}

Which package is best for this customer?`;
    } else if (pathname.includes("/generate-content")) {
      const contentReq = body as ContentRequest;
      userPrompt = `Generate a ${contentReq.length || "medium"}-length ${contentReq.type} about: "${contentReq.topic}"
Tone: ${contentReq.tone || "friendly"}
Include natural mention of Teethmocure.`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid endpoint" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!userPrompt) {
      return new Response(JSON.stringify({ error: "Missing request parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Call Claude API
    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const content = response.content[0].type === "text" ? response.content[0].text : "";

    return new Response(
      JSON.stringify({
        content,
        title: body.type === "blog_post" ? `Blog: ${body.topic}` : undefined,
        seoKeywords: ["teethmocure", "herbal remedy", "oral health"],
        length: content.length,
        model: "claude-3-5-sonnet-20241022",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("AI Generate Error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to generate content",
        code: "AI_GENERATE_ERROR",
        statusCode: 500,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
