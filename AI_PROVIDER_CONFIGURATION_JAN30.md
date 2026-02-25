# AI PROVIDER CONFIGURATION - JAN 30, 2026 UPDATE

## 🚀 CURRENT AI PROVIDER STACK

### **Priority Order: Cerebras → Gemini → Groq → Together AI**

| Rank | Provider | Model | API Key | Speed | Quota | Status |
|------|----------|-------|---------|-------|-------|--------|
| 1️⃣ **PRIMARY** | **Cerebras** | Llama 3.3 70B | `VITE_CEREBRAS_API_KEY` | ⚡⚡⚡ Ultra | Unlimited | ✅ Enabled |
| 2️⃣ **BACKUP 1** | **Gemini** | Gemini 1.5 Flash | `VITE_GEMINI_API_KEY` | 1-2s | 60 req/min, 1500/day | ✅ Enabled |
| 3️⃣ **BACKUP 2** | **Groq** | Llama 3.3 70B | `VITE_GROQ_API_KEY` | ⚡ <500ms | 30 req/min, 14.4k/day | ✅ Enabled |
| 4️⃣ **BACKUP 3** | **Together AI** | Llama 3.3 70B | `VITE_TOGETHER_API_KEY` | ⚡ 0.5-1s | 60 req/min | ✅ Enabled |

---

## 🛠️ ENVIRONMENT CONFIGURATION

### **.env File (Required Keys)**

```dotenv
# =============================================
# AI PROVIDER CONFIGURATION
# =============================================

# PRIMARY: Cerebras (DIRECT API - Ultra-fast!)
# Get key: https://cloud.cerebras.ai/
# Uses Llama 3.3 70B - blazing fast responses!
VITE_CEREBRAS_API_KEY=csk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# BACKUP 1: Gemini (Free tier: 60 req/min, 1500 req/day)
# Get key: https://aistudio.google.com/apikey
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# BACKUP 2: Groq (FREE! 30 req/min, 14,400 req/day)
# Get key: https://console.groq.com/keys
VITE_GROQ_API_KEY=gsk_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# BACKUP 3: Together AI (FREE! 60 req/min)
# Get key: https://api.together.xyz/settings/api-keys
# Uses Llama 3.3 70B, Qwen 2.5, Mixtral
VITE_TOGETHER_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# TTS: OpenAI (for Ms. Nova voice)
# Get key: https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# TTS: Google Cloud (for Google Cloud TTS)
GOOGLE_TTS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 🔄 AI ROUTER FLOW (aiRouter.js)

### **Smart Provider Selection**

```javascript
// src/services/ai_tutor/aiRouter.js

const PROVIDERS = {
  cerebras: {
    name: 'Cerebras',
    model: 'llama-3.3-70b',     // Ultra-fast 70B model
    maxTokens: 1024,
    temperature: 0.7,
    enabled: !!CEREBRAS_API_KEY,
    description: 'PRIMARY: Cerebras direct API - Ultra-fast & reliable'
  },
  gemini: {
    name: 'Gemini',
    model: 'gemini-1.5-flash',
    maxTokens: 2048,
    temperature: 0.7,
    enabled: !!GEMINI_API_KEY,
    description: 'BACKUP 1: Google Gemini - Most reliable'
  },
  groq: {
    name: 'Groq',
    model: 'llama-3.3-70b-versatile',
    maxTokens: 1024,
    temperature: 0.7,
    enabled: !!GROQ_API_KEY,
    description: 'BACKUP 2: Ultra-fast responses'
  },
  together: {
    name: 'Together AI',
    model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    maxTokens: 1024,
    temperature: 0.9,
    enabled: !!TOGETHER_API_KEY,
    description: 'BACKUP 3: Fast responses with 60 req/min'
  }
};
```

### **Request Flow**

```
User Message
  ↓
sendToAI(systemPrompt, chatHistory, userMessage)
  ├─ Step 1: Check preferred provider (Cerebras enabled?)
  │
  ├─ LAYER 1: Try Cerebras (attempt 1-2)
  │  ├─ POST https://api.cerebras.ai/v1/chat/completions
  │  ├─ Timeout: 30s
  │  ├─ Success? → Return response + { provider: 'cerebras' }
  │  └─ Fail? → Catch error, move to Layer 2
  │
  ├─ LAYER 2: Try Gemini (attempt 1-2)
  │  ├─ POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash
  │  ├─ Timeout: 30s
  │  ├─ Success? → Return response + { provider: 'gemini' }
  │  └─ Fail? → Catch error, move to Layer 3
  │
  ├─ LAYER 3: Try Groq with Rate Limiting (attempt 1-2)
  │  ├─ POST https://api.groq.com/openai/v1/chat/completions
  │  ├─ Rate limiter: Wait for slot (max 25 req/min)
  │  ├─ Timeout: 30s
  │  ├─ On 429 (rate limit): Set exponential backoff
  │  ├─ Success? → Return response + { provider: 'groq' }
  │  └─ Fail? → Catch error, move to Layer 4
  │
  ├─ LAYER 4: Try Together AI (attempt 1-2)
  │  ├─ POST https://api.together.xyz/v1/chat/completions
  │  ├─ Timeout: 30s
  │  ├─ Success? → Return response + { provider: 'together' }
  │  └─ Fail? → Return contextual fallback
  │
  └─ FALLBACK: Generate safe response from mission context
     (No API call, deterministic fallback)
```

---

## 🛡️ RATE LIMITING & ERROR HANDLING

### **Groq Rate Limiter** (GroqRateLimiter class)

```javascript
class GroqRateLimiter {
  maxRequests: 25,           // 25 req/min (safe margin below 30 limit)
  windowDuration: 60000,     // 1 minute
  minDelay: 2000,            // 2 second minimum delay between requests
  exponentialBackoff: true,  // On 429 errors: 2s → 4s → 8s → 15s max
}

// Usage:
await groqLimiter.waitForSlot(); // Blocks until slot available
groqLimiter.setBackoff(2000);    // On 429 error
groqLimiter.reset();             // Manual reset
groqLimiter.getStatus();         // { used, limit, available, windowRemainingMs }
```

### **Error Handling Strategy**

| Error | Cerebras | Gemini | Groq | Together | Action |
|-------|----------|--------|------|----------|--------|
| **400** | ✅ Retry | ✅ Retry | ✅ Fallback | ✅ Fallback | Move to next provider |
| **401** | ❌ Stop | ❌ Stop | ❌ Stop | ❌ Stop | Check API key |
| **429** (Rate Limit) | ⚠️ Fallback | ⚠️ Fallback | 🔄 Backoff+Retry | ⚠️ Fallback | Wait, retry, or fallback |
| **500** | ✅ Retry | ✅ Retry | ✅ Retry | ✅ Retry | Exponential backoff |
| **Timeout** | ✅ Fallback | ✅ Fallback | ✅ Fallback | ✅ Fallback | Move to next provider |

---

## 📊 RESPONSE FORMAT (All Providers)

### **Standard JSON Response**

```json
{
  "ai_response": "Hello! What is your name?",
  "ack": "Nice to meet you!",
  "recast": "Your name is Alex",
  "question": "How old are you?",
  "hints": ["5", "Six", "Seven years old"],
  "provider": "cerebras",
  "latency": 245,
  "metadata": {
    "mode": "story",
    "turn": 2,
    "week": 1
  }
}
```

### **Provider-Specific Handling**

**Cerebras & Groq & Together:**
- Use OpenAI-compatible API format
- JSON mode: `response_format: { type: "json_object" }`
- Role format: `{ role: 'user'|'assistant', content: string }`

**Gemini:**
- Use Google Generative AI SDK
- Response format: `generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
- Role format: `{ role: 'user'|'model', content: string }`

---

## 🎯 CEREBRAS ADVANTAGES

**Why Cerebras as PRIMARY?**

1. **Ultra-Fast** - Sub-100ms responses (vs Groq's 200-500ms)
2. **Llama 3.3 70B** - Same quality as Groq but faster
3. **Direct API** - No proxy overhead, lower latency
4. **Reliable** - Enterprise-grade SLA
5. **Generous Quotas** - Unlimited requests (vs Groq's 30 req/min)

**When to use Cerebras:**
- ✅ Story missions (need fast feedback)
- ✅ Real-time games (Word Chain, 20Q)
- ✅ Roleplay scenarios (immediate responses)

**Trade-offs:**
- ⚠️ Requires separate API key (vs shared ecosystem)
- ⚠️ Less mature than Groq/Gemini (but improving fast)

---

## 📈 QUOTA MANAGEMENT

### **Daily Budget Breakdown**

| Provider | Quota | Use Case | Risk |
|----------|-------|----------|------|
| **Cerebras** | Unlimited | Primary: all requests | ✅ Low |
| **Gemini** | 1,500 req/day | Fallback 1: ~500-1000 req/day | ⚠️ Medium (shared quota) |
| **Groq** | 14,400 req/day | Fallback 2: ~2000-5000 req/day | ✅ Low |
| **Together** | 60 req/min | Fallback 3: ~5000 req/day | ✅ Low |

**Daily Estimate:**
- **Optimal:** 2000-3000 requests (light usage)
- **Normal:** 5000-8000 requests (medium usage)
- **Heavy:** 10000+ requests (production load)

**Recommendation:**
- Use Cerebras as primary (unlimited)
- Gemini for fallback (watch daily count)
- Groq/Together as safety net (high quota)

---

## 🔥 CRITICAL FIXES IN V5

### **Problem: Groq 429 Rate Limit Errors**

**Solution:**
```javascript
// Rate limiter class
class GroqRateLimiter {
  waitForSlot()           // Block until quota available
  setBackoff(ms)          // Exponential backoff on 429
  getStatus()             // Check remaining quota
}

// Usage:
await groqLimiter.waitForSlot(); // 2s delay between requests
// This prevents hitting 30 req/min limit
```

### **Problem: JSON Format Inconsistencies**

**Solution:**
```javascript
// Cerebras/Groq/Together: Use JSON mode
request.response_format = { type: 'json_object' };

// Gemini: Extract JSON from response
const jsonMatch = response.match(/\{[\s\S]*\}/);
const json = JSON.parse(jsonMatch[0]);
```

### **Problem: Role Format Differences**

**Solution:**
```javascript
// OpenAI-compatible (Cerebras, Groq, Together)
{ role: 'user'|'assistant', content: string }

// Gemini
{ role: 'user'|'model', content: string }
// Convert on the fly: assistant → model, user → user
```

---

## 🚀 PERFORMANCE METRICS

### **Latency by Provider (Jan 30, 2026)**

```
Cerebras:     ~100-200ms  (Fastest ⚡⚡⚡)
Groq:         ~200-500ms  (Fast ⚡⚡)
Together AI:  ~500-1000ms (Moderate ⚡)
Gemini:       ~1000-2000ms (Slow but reliable)
```

### **Throughput**

```
Cerebras:     Unlimited
Groq:         25 req/min (rate limited), 14.4k/day
Together AI:  60 req/min, 5k/day
Gemini:       60 req/min, 1.5k/day (BOTTLENECK)
```

---

## ✅ SETUP CHECKLIST

- [ ] Get Cerebras API key: https://cloud.cerebras.ai/
- [ ] Get Gemini API key: https://aistudio.google.com/apikey
- [ ] Get Groq API key: https://console.groq.com/keys
- [ ] Get Together AI key: https://api.together.xyz/settings/api-keys
- [ ] Fill in `.env` with all 4 keys
- [ ] Test Cerebras in browser console:
  ```javascript
  curl('https://api.cerebras.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer YOUR_KEY' },
    body: JSON.stringify({ model: 'llama-3.3-70b', messages: [] })
  })
  ```
- [ ] Run app, check browser console for provider selection logs
- [ ] Verify fallback chain works (simulate API failures)

---

## 🔗 USEFUL LINKS

- **Cerebras:** https://cloud.cerebras.ai/
- **Gemini:** https://aistudio.google.com/
- **Groq:** https://console.groq.com/
- **Together AI:** https://api.together.xyz/
- **OpenAI TTS:** https://platform.openai.com/docs/guides/text-to-speech

---

**Last Updated:** January 30, 2026 | **Version:** aiRouter V5 Cerebras Edition
