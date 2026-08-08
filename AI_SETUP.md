# Claude AI Integration Setup Guide

## ✅ Phase 1 Complete: Backend Infrastructure

I've built all the backend infrastructure for Claude AI features. Here's what's ready:

### Files Created

**Types & Configuration** (5 files)
- `src/types/ai.ts` — All AI feature types
- `src/ai/prompts.ts` — System prompts for each AI mode
- `src/api/aiService.ts` — Client-side API calls
- `base44/functions/aiChat/entry.ts` — Chat endpoint
- `base44/functions/aiGenerate/entry.ts` — Content generation endpoints

**Custom Hooks** (4 files)
- `src/hooks/useAiChat.ts` — Chat state management
- `src/hooks/useSymptomChecker.ts` — Symptom assessment form
- `src/hooks/useProductRecommendation.ts` — Product recommendations
- `src/hooks/useContentGenerator.ts` — Content generation (admin tool)

---

## 🔧 Setup Steps

### 1. Verify .env Has API Key
```bash
# Check your .env file
cat .env
# Should contain: ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### 2. Update Base44 Dependencies
```bash
# In base44/functions/aiChat and aiGenerate, make sure to add:
# "npm:@anthropic-ai/sdk" to imports
```

### 3. Deploy Backend Functions
```bash
# These functions are ready to deploy to Base44
# base44/functions/aiChat/entry.ts → POST /api/ai/chat
# base44/functions/aiGenerate/entry.ts → POST /api/ai/generate-content
```

---

## 🚀 Features Ready to Build (Phase 2-3)

### 1. Chat Widget Components
```tsx
import { useAiChat } from "@/hooks";
import { ChatWidget, ChatDialog } from "@/components/ai";

function App() {
  const chat = useAiChat("user-123");
  return <ChatWidget messages={chat.messages} onSendMessage={chat.sendMessage} />;
}
```

### 2. Symptom Checker Components
```tsx
import { useSymptomChecker } from "@/hooks";
import { SymptomChecker } from "@/components/ai";

function CheckPage() {
  const checker = useSymptomChecker();
  return <SymptomChecker {...checker} />;
}
```

### 3. Recommendation Widget
```tsx
import { useProductRecommendation } from "@/hooks";
import { RecommendationWidget } from "@/components/ai";

function OrderForm() {
  const rec = useProductRecommendation();
  return <RecommendationWidget {...rec} />;
}
```

### 4. Content Generator (Admin)
```tsx
import { useContentGenerator } from "@/hooks";
import { ContentGenerator } from "@/components/ai";

function AdminPanel() {
  const gen = useContentGenerator();
  return <ContentGenerator {...gen} />;
}
```

---

## 📊 API Endpoints Created

### Chat Endpoint
```
POST /api/ai/chat
{
  "userId": "string",
  "conversationId": "string (optional)",
  "message": "string",
  "mode": "chat" | "symptom_check" | "recommendation"
}
```

### Content Generation Endpoints
```
POST /api/ai/symptom-check
{
  "symptoms": "string",
  "duration": "string",
  "severity": 1-10,
  "triedBefore": "string"
}

POST /api/ai/recommendation
{
  "symptoms": "string",
  "budget": number,
  "desiredDuration": "string"
}

POST /api/ai/generate-content
{
  "type": "blog_post" | "faq" | "product_description",
  "topic": "string",
  "length": "short" | "medium" | "long",
  "tone": "professional" | "friendly" | "educational"
}
```

---

## 🎯 System Prompts Included

Each AI mode has a optimized system prompt:

1. **Chat Mode** — Customer support assistant
2. **Symptom Check Mode** — Oral health assessment
3. **Recommendation Mode** — Package recommendation engine
4. **Content Generation Mode** — Blog post & FAQ writer

All prompts mention NAFDAC approval, usage instructions, and Teethmocure details.

---

## 🛡️ Rate Limiting

- **Limit**: 100 requests per hour per user
- **Enforcement**: Client-side + server-side
- **Error handling**: Returns rate limit error with retry info

---

## 📝 Next Steps

### Phase 2: Build React Components
I need to create:
1. `<ChatWidget>` — Floating chat bubble
2. `<ChatDialog>` — Full-screen chat
3. `<ChatMessage>` — Message bubble component
4. `<SymptomChecker>` — Form + results
5. `<ContentGenerator>` — Admin tool UI
6. `<RecommendationWidget>` — Inline recommendation
7. `<LoadingSpinner>` — Loading states

### Phase 3: Integration
- Add ChatWidget to LandingPage + public pages
- Create `/symptom-checker` page
- Create `/admin/content-generator` page
- Add RecommendationWidget to OrderForm
- Create entities for ConversationHistory + GeneratedContent

---

## 🧪 Testing the Backend

```bash
# Test chat endpoint (replace with real API URL)
curl -X POST http://localhost:3000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user",
    "message": "I have a toothache",
    "mode": "chat"
  }'

# Test symptom check
curl -X POST http://localhost:3000/api/ai/symptom-check \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": "sharp tooth pain and swollen gums",
    "duration": "2 days",
    "severity": 7
  }'
```

---

## 💰 Cost Tracking

Monitor API usage in console.anthropic.com:
- Current rate: ~$68/month estimated
- Input: $3 per 1M tokens
- Output: $15 per 1M tokens
- Alert if costs spike unexpectedly

---

## ✨ Ready for Next Phase!

Backend is complete. All that's needed now is:
1. Build React components (Phase 2)
2. Integrate into pages (Phase 3)
3. Create data entities (Phase 4)

Want me to start Phase 2 (building React components)?
