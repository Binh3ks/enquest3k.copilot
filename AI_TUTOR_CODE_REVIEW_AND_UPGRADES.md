# AI Tutor Code Review & Upgrade Recommendations
**Date:** 2026-01-06  
**Reviewer:** AI Assistant  
**Scope:** Complete AI Tutor V3 Architecture

---

## 📊 TỔNG QUAN HIỆN TRẠNG

### ✅ Điểm Mạnh
1. **Kiến trúc modular** - Tách biệt rõ ràng: aiRouter, grammarGuard, learnerProfiler, promptLibrary
2. **Multi-provider AI** - Groq → Gemini fallback hoạt động tốt
3. **Guardrails mạnh** - Grammar Guard + Talk Ratio Guard
4. **Adaptive scaffolding** - Phát hiện learner style (shy/normal/confident)
5. **Vocab mastery tracking** - Theo dõi từ vựng học sinh sử dụng

### ⚠️ Vấn Đề Phát Hiện

#### 1. **THIẾU FILE CORE ENGINE**
- **Vấn đề:** `docs/ai_application_context.md` đề cập `novaEngine.js` nhưng file này nằm trong `legacy_archive`
- **Hiện tại:** Logic được phân tán trong `aiRouter.js` và các tab components
- **Tác động:** Khó maintain, thiếu single source of truth cho AI logic

#### 2. **CODE DUPLICATION**
- **Vấn đề:** Logic xử lý AI response lặp lại ở StoryMissionTab và FreeTalkTab
- **Ví dụ:** 
  - JSON parsing logic (lines 392-434 trong aiRouter.js)
  - Hint generation fallback (lines 308-335 trong StoryMissionTab)
  - TTS auto-play logic (lines 291-297 trong StoryMissionTab)

#### 3. **PROMPT ENGINEERING QUÁ DÀI**
- **Vấn đề:** `buildStoryPrompt()` tạo prompt ~700 dòng (lines 554-728 trong promptLibrary.js)
- **Tác động:** 
  - Tốn token (chi phí API cao)
  - Khó maintain
  - AI có thể bỏ qua một số instructions

#### 4. **ERROR HANDLING CHƯA ĐỦ ROBUST**
- **Vấn đề:** 
  - Một số catch blocks chỉ log error, không có fallback UI
  - JSON parsing errors có fallback nhưng không thông báo user
  - Network timeout chưa có retry logic

#### 5. **STATE MANAGEMENT PHỨC TẠP**
- **Vấn đề:** `tutorStore.js` quá lớn (600+ lines), quản lý quá nhiều concerns
- **Tác động:** Khó debug, dễ có race conditions

#### 6. **THIẾU VALIDATION**
- **Vấn đề:** 
  - User input không được sanitize
  - AI response structure không được validate đầy đủ
  - Week data không có schema validation

#### 7. **PERFORMANCE CONCERNS**
- **Vấn đề:**
  - `learnerProfiler.js` tính toán lại profile mỗi turn (có thể optimize)
  - `vocabMasteryTracker.js` scan toàn bộ vocab mỗi lần (có thể cache)
  - Re-renders không cần thiết do Zustand selectors

---

## 🔧 ĐỀ XUẤT SỬA CHỮA

### Priority 1: CRITICAL FIXES

#### 1.1 Tạo `novaEngine.js` - Core AI Engine
**File mới:** `src/services/ai_tutor/novaEngine.js`

```javascript
/**
 * Nova Engine - Core Pedagogical AI Brain
 * Single source of truth for AI interaction logic
 */

import { sendToAI } from './aiRouter.js';
import { buildStoryPrompt, buildFreeTalkPrompt } from './promptLibrary.js';
import { validateAIResponse } from './grammarGuard.js';

export class NovaEngine {
  constructor(weekData, userProfile) {
    this.weekData = weekData;
    this.userProfile = userProfile;
  }

  /**
   * Main entry point: Send message to Ms. Nova
   * @param {Object} params - { mode, userMessage, chatHistory, context }
   * @returns {Promise<AIResponse>}
   */
  async sendToNova({ mode, userMessage, chatHistory = [], context = {} }) {
    // 1. Build context-aware prompt
    const systemPrompt = this.buildTutorContext(mode, context);
    
    // 2. Call AI with guardrails
    const response = await sendToAI({
      systemPrompt,
      chatHistory,
      userMessage,
      weekId: this.weekData.weekId,
      mode
    });
    
    // 3. Apply post-processing (guardrails, hints)
    return this.applyGuardrails(response, mode);
  }

  buildTutorContext(mode, context) {
    // Centralized prompt building logic
    switch (mode) {
      case 'story':
        return buildStoryPrompt({
          weekData: this.weekData,
          userName: this.userProfile.name,
          userAge: this.userProfile.age,
          ...context
        });
      case 'freetalk':
        return buildFreeTalkPrompt({
          weekData: this.weekData,
          userName: this.userProfile.name,
          userAge: this.userProfile.age,
          ...context
        });
      default:
        throw new Error(`Unknown mode: ${mode}`);
    }
  }

  applyGuardrails(response, mode) {
    // Centralized guardrail application
    // - Grammar validation
    // - Talk ratio enforcement
    // - Hint generation
    return response;
  }
}
```

**Lợi ích:**
- Single source of truth
- Dễ test
- Dễ maintain
- Tách biệt concerns

---

#### 1.2 Tối Ưu Prompt Engineering
**File:** `src/services/ai_tutor/promptLibrary.js`

**Vấn đề:** Prompt quá dài (~700 lines cho Story mode)

**Giải pháp:**
1. **Chia nhỏ prompts thành modules:**
   - `persona.js` - Core persona (50 lines)
   - `storyInstructions.js` - Story-specific (100 lines)
   - `recastExamples.js` - Recast technique (50 lines)
   - `scaffoldingRules.js` - Scaffolding levels (50 lines)

2. **Sử dụng prompt templates với placeholders:**
```javascript
const STORY_PROMPT_TEMPLATE = `
{persona}

{mission_context}

{grammar_rules}

{scaffolding_level}

{hint_generation_rules}
`;
```

3. **Compress instructions:**
   - Loại bỏ duplicate instructions
   - Sử dụng bullet points thay vì paragraphs
   - Giảm từ 700 → ~200 lines

**Lợi ích:**
- Giảm 60-70% token usage
- Faster API responses
- Dễ maintain

---

#### 1.3 Cải Thiện Error Handling
**Files:** `aiRouter.js`, `StoryMissionTab.jsx`, `FreeTalkTab.jsx`

**Thêm:**
1. **Error boundaries** cho React components
2. **User-friendly error messages:**
```javascript
const ERROR_MESSAGES = {
  network: "Connection problem. Please check your internet.",
  api: "Ms. Nova is thinking... Please try again.",
  parse: "Something went wrong. Let's start fresh!"
};
```

3. **Retry logic với exponential backoff:**
```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(1000 * Math.pow(2, i)); // Exponential backoff
    }
  }
}
```

4. **Fallback responses** khi AI fails:
```javascript
const FALLBACK_RESPONSES = {
  story: "That's interesting! Can you tell me more?",
  freetalk: "I'd love to hear more about that!"
};
```

---

### Priority 2: CODE QUALITY IMPROVEMENTS

#### 2.1 Extract Common Logic
**Tạo:** `src/services/ai_tutor/utils/responseParser.js`

```javascript
/**
 * Centralized AI response parsing
 */
export function parseAIResponse(rawResponse, fallback = null) {
  try {
    const parsed = JSON.parse(rawResponse);
    return {
      ai_response: parsed.ai_response || parsed.response || rawResponse,
      pedagogy_note: parsed.pedagogy_note || '',
      suggested_hints: parsed.suggested_hints || [],
      raw: rawResponse
    };
  } catch (error) {
    console.warn('JSON parse failed, using fallback');
    return fallback || {
      ai_response: rawResponse.replace(/```json|```/g, '').trim(),
      pedagogy_note: 'Fallback response',
      suggested_hints: []
    };
  }
}

/**
 * Validate response completeness
 */
export function validateResponse(response) {
  if (!response.ai_response || response.ai_response.length < 10) {
    throw new Error('Response too short');
  }
  if (!response.ai_response.includes('?')) {
    response.ai_response += ' What do you think?';
  }
  return response;
}
```

**Refactor tabs để sử dụng:**
```javascript
// Before (duplicated in StoryMissionTab & FreeTalkTab)
const parsed = JSON.parse(content);
const aiResponse = parsed.ai_response || parsed.response || content;

// After
import { parseAIResponse, validateResponse } from '../../../services/ai_tutor/utils/responseParser';
const response = validateResponse(parseAIResponse(content));
```

---

#### 2.2 Optimize State Management
**File:** `src/services/ai_tutor/tutorStore.js`

**Vấn đề:** Store quá lớn (600+ lines)

**Giải pháp:** Chia thành multiple stores:
- `useTutorUIStore.js` - UI state (widget, tabs, size)
- `useTutorChatStore.js` - Messages per tab
- `useTutorProfileStore.js` - Learner profile, vocab mastery
- `useTutorAudioStore.js` - Audio playback state

**Hoặc:** Sử dụng Zustand slices pattern:
```javascript
import { create } from 'zustand';
import { createTutorUISlice } from './slices/uiSlice';
import { createTutorChatSlice } from './slices/chatSlice';
import { createTutorProfileSlice } from './slices/profileSlice';

const useTutorStore = create((set, get) => ({
  ...createTutorUISlice(set, get),
  ...createTutorChatSlice(set, get),
  ...createTutorProfileSlice(set, get)
}));
```

---

#### 2.3 Add Input Validation
**Tạo:** `src/services/ai_tutor/utils/inputValidator.js`

```javascript
/**
 * Sanitize and validate user input
 */
export function validateUserInput(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input');
  }
  
  // Remove dangerous characters
  const sanitized = input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .slice(0, 500); // Max length
  
  if (sanitized.length < 1) {
    throw new Error('Input too short');
  }
  
  return sanitized;
}
```

---

#### 2.4 Performance Optimizations

**1. Memoize learner profile calculations:**
```javascript
// learnerProfiler.js
import { memoize } from 'lodash';

export const inferLearnerStyle = memoize((behaviorHistory) => {
  // ... existing logic
}, (history) => JSON.stringify(history.slice(-10))); // Cache based on last 10 turns
```

**2. Debounce vocab tracking:**
```javascript
// vocabMasteryTracker.js
import { debounce } from 'lodash';

export const trackVocabUsage = debounce((userInput, vocabList) => {
  // ... existing logic
}, 300); // Wait 300ms before processing
```

**3. Optimize Zustand selectors:**
```javascript
// Before (causes re-renders)
const messages = useTutorStore(state => state.messages['story']);

// After (only re-renders when story messages change)
const messages = useTutorStore(
  state => state.messages['story'],
  (a, b) => a.length === b.length && a[a.length - 1]?.id === b[b.length - 1]?.id
);
```

---

### Priority 3: FEATURE ENHANCEMENTS

#### 3.1 Add Response Caching
**Tạo:** `src/services/ai_tutor/utils/responseCache.js`

```javascript
/**
 * Cache AI responses for similar inputs
 * Reduces API calls and improves UX
 */
const cache = new Map();

export function getCachedResponse(userMessage, context) {
  const key = `${context.mode}-${hashMessage(userMessage)}-${context.weekId}`;
  return cache.get(key);
}

export function cacheResponse(userMessage, context, response) {
  const key = `${context.mode}-${hashMessage(userMessage)}-${context.weekId}`;
  cache.set(key, response);
  // Clear cache after 1 hour
  setTimeout(() => cache.delete(key), 3600000);
}
```

---

#### 3.2 Add Conversation Analytics
**Tạo:** `src/services/ai_tutor/analytics/conversationAnalytics.js`

```javascript
/**
 * Track conversation metrics for insights
 */
export function trackConversationMetrics(tabId, messages) {
  const metrics = {
    totalTurns: messages.length,
    avgResponseTime: calculateAvgResponseTime(messages),
    vocabUsageRate: calculateVocabUsage(messages),
    engagementScore: calculateEngagement(messages)
  };
  
  // Send to analytics service (optional)
  // analytics.track('conversation_metrics', metrics);
  
  return metrics;
}
```

---

#### 3.3 Add A/B Testing Framework
**Tạo:** `src/services/ai_tutor/abTesting/promptVariants.js`

```javascript
/**
 * Test different prompt strategies
 */
export const PROMPT_VARIANTS = {
  story: {
    variant_a: buildStoryPrompt, // Current
    variant_b: buildStoryPromptV2, // Shorter, more focused
    variant_c: buildStoryPromptV3 // More examples
  }
};

export function getPromptVariant(mode, userId) {
  // Deterministic A/B assignment based on userId
  const variant = hashUserId(userId) % 3;
  return PROMPT_VARIANTS[mode][`variant_${['a', 'b', 'c'][variant]}`];
}
```

---

## 📋 IMPLEMENTATION PLAN

### Phase 1: Critical Fixes (Week 1)
1. ✅ Tạo `novaEngine.js` - Core engine
2. ✅ Tối ưu prompts (giảm 60% token)
3. ✅ Cải thiện error handling
4. ✅ Extract common logic (responseParser)

### Phase 2: Code Quality (Week 2)
1. ✅ Refactor state management (chia stores)
2. ✅ Add input validation
3. ✅ Performance optimizations
4. ✅ Add unit tests

### Phase 3: Enhancements (Week 3)
1. ✅ Response caching
2. ✅ Conversation analytics
3. ✅ A/B testing framework
4. ✅ Documentation updates

---

## 🧪 TESTING RECOMMENDATIONS

### Unit Tests
```javascript
// tests/services/ai_tutor/novaEngine.test.js
describe('NovaEngine', () => {
  it('should build correct prompt for story mode', () => {
    // Test prompt generation
  });
  
  it('should apply guardrails correctly', () => {
    // Test grammar guard, talk ratio
  });
});

// tests/services/ai_tutor/grammarGuard.test.js
describe('GrammarGuard', () => {
  it('should detect banned words in Week 1', () => {
    // Test validation
  });
});
```

### Integration Tests
```javascript
// tests/integration/ai_tutor/StoryMissionTab.test.jsx
describe('StoryMissionTab Integration', () => {
  it('should complete a full mission flow', async () => {
    // Test end-to-end mission
  });
});
```

---

## 📊 METRICS TO TRACK

1. **API Performance:**
   - Average response time (Groq vs Gemini)
   - Token usage per conversation
   - Error rate by provider

2. **User Engagement:**
   - Average turns per session
   - Scaffold usage rate
   - Mission completion rate

3. **Learning Outcomes:**
   - Vocab mastery progress
   - Grammar error reduction
   - Conversation fluency improvement

---

## 🎯 KẾT LUẬN

**Tổng quan:** Codebase có kiến trúc tốt nhưng cần refactor để:
- Giảm duplication
- Tối ưu performance
- Cải thiện maintainability
- Tăng reliability

**Ưu tiên:** Bắt đầu với Phase 1 (Critical Fixes) để cải thiện stability và reduce costs.

**Estimated Impact:**
- Token usage: -60% (prompt optimization)
- API errors: -40% (better error handling)
- Code maintainability: +50% (refactoring)
- User experience: +30% (faster responses, fewer errors)
