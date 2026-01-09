# Implementation Plan - AI Tutor Upgrades
**Based on:** AI_TUTOR_CODE_REVIEW_AND_UPGRADES.md  
**Date:** 2026-01-06  
**Timeline:** 3 Weeks (Jan 6 - Jan 27, 2026)

---

## 🎯 EXECUTIVE SUMMARY

### Objectives
1. **Reduce API costs** by 60% (prompt optimization)
2. **Improve reliability** - reduce errors by 40%
3. **Enhance maintainability** - reduce code duplication
4. **Better UX** - faster responses, better error handling

### Approach
- 3 phases: Critical Fixes → Code Quality → Enhancements
- Incremental updates (no breaking changes)
- Each phase = 1 week
- Test thoroughly before deploying

---

## 📅 PHASE 1: CRITICAL FIXES (Week 1: Jan 6-12)

### Day 1-2: Create NovaEngine (Core AI Brain)

#### Task 1.1: Tạo file `novaEngine.js`
**File:** `src/services/ai_tutor/novaEngine.js`

**Checklist:**
- [ ] Tạo class `NovaEngine` với constructor
- [ ] Implement method `sendToNova()`
- [ ] Implement method `buildTutorContext()`
- [ ] Implement method `applyGuardrails()`
- [ ] Export default instance

**Code structure:**
```javascript
export class NovaEngine {
  constructor(weekData, userProfile) {}
  async sendToNova({ mode, userMessage, chatHistory, context }) {}
  buildTutorContext(mode, context) {}
  applyGuardrails(response, mode) {}
}
```

**Testing:**
- [ ] Unit test: prompt generation for each mode
- [ ] Unit test: guardrail application
- [ ] Integration test: full conversation flow

**Dependencies:**
- Imports: `aiRouter.js`, `promptLibrary.js`, `grammarGuard.js`
- Used by: `StoryMissionTab.jsx`, `FreeTalkTab.jsx`

**Estimated time:** 8 hours

---

#### Task 1.2: Refactor Tabs to Use NovaEngine
**Files:** 
- `src/modules/ai_tutor/tabs/StoryMissionTab.jsx`
- `src/modules/ai_tutor/tabs/FreeTalkTab.jsx`

**Changes:**
```javascript
// Before
const systemPrompt = buildStoryPrompt({ weekData, userName, userAge });
const aiResponse = await sendToAI({ systemPrompt, chatHistory, userMessage });

// After
import { NovaEngine } from '../../../services/ai_tutor/novaEngine';
const nova = new NovaEngine(weekData, userProfile);
const aiResponse = await nova.sendToNova({
  mode: 'story',
  userMessage,
  chatHistory,
  context: { missionId, turnCount }
});
```

**Checklist:**
- [ ] Refactor StoryMissionTab
- [ ] Refactor FreeTalkTab
- [ ] Test both tabs still work
- [ ] Remove duplicate code

**Estimated time:** 6 hours

---

### Day 3-4: Optimize Prompts (Reduce Token Usage)

#### Task 1.3: Chia nhỏ prompts thành modules
**New files:**
- `src/services/ai_tutor/prompts/persona.js` (50 lines)
- `src/services/ai_tutor/prompts/storyInstructions.js` (100 lines)
- `src/services/ai_tutor/prompts/freetalkInstructions.js` (100 lines)
- `src/services/ai_tutor/prompts/recastExamples.js` (50 lines)
- `src/services/ai_tutor/prompts/scaffoldingRules.js` (50 lines)

**Checklist:**
- [ ] Extract persona text (core Ms. Nova identity)
- [ ] Extract story-specific instructions
- [ ] Extract freetalk-specific instructions
- [ ] Extract recast examples
- [ ] Extract scaffolding rules
- [ ] Create prompt builder function

**Template structure:**
```javascript
export function buildOptimizedPrompt({ mode, weekData, userName, userAge, context }) {
  return `
${PERSONA}

${mode === 'story' ? STORY_INSTRUCTIONS : FREETALK_INSTRUCTIONS}

**Week ${weekData.weekId} Grammar Scope:** ${weekData.grammar.scope}

${getScaffoldingLevel(context.learnerStyle)}

${RECAST_EXAMPLES}
  `.trim();
}
```

**Testing:**
- [ ] Compare token count before/after
- [ ] Test AI response quality unchanged
- [ ] Verify all modes work

**Target:** Reduce from ~700 lines → ~200 lines (70% reduction)

**Estimated time:** 10 hours

---

### Day 5-6: Improve Error Handling

#### Task 1.4: Create Error Handling Utils
**File:** `src/services/ai_tutor/utils/errorHandler.js`

**Checklist:**
- [ ] Create `ERROR_MESSAGES` constants
- [ ] Create `retryWithBackoff()` function
- [ ] Create `FALLBACK_RESPONSES` constants
- [ ] Create `handleAIError()` function

**Code:**
```javascript
export const ERROR_MESSAGES = {
  network: "Connection problem. Please check your internet.",
  api: "Ms. Nova is thinking... Please try again.",
  parse: "Something went wrong. Let's start fresh!",
  timeout: "Response is taking too long. Let's try again."
};

export async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(1000 * Math.pow(2, i));
    }
  }
}

export const FALLBACK_RESPONSES = {
  story: "That's interesting! Can you tell me more?",
  freetalk: "I'd love to hear more about that!"
};
```

**Checklist:**
- [ ] Update `aiRouter.js` to use retry logic
- [ ] Update tabs to show user-friendly errors
- [ ] Add fallback responses
- [ ] Test error scenarios

**Estimated time:** 6 hours

---

#### Task 1.5: Extract Common Logic (Response Parser)
**File:** `src/services/ai_tutor/utils/responseParser.js`

**Checklist:**
- [ ] Create `parseAIResponse()` function
- [ ] Create `validateResponse()` function
- [ ] Refactor StoryMissionTab to use parser
- [ ] Refactor FreeTalkTab to use parser
- [ ] Remove duplicate parsing code

**Code:**
```javascript
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
    return fallback || {
      ai_response: rawResponse.replace(/```json|```/g, '').trim(),
      pedagogy_note: 'Fallback response',
      suggested_hints: []
    };
  }
}

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

**Estimated time:** 4 hours

---

### Week 1 Summary
**Total estimated time:** 34 hours (4-5 work days)

**Deliverables:**
- ✅ NovaEngine created and integrated
- ✅ Prompts optimized (60% token reduction)
- ✅ Error handling improved
- ✅ Code duplication removed

**Metrics to track:**
- Token usage per conversation (before/after)
- API error rate (before/after)
- Response time (before/after)

---

## 📅 PHASE 2: CODE QUALITY (Week 2: Jan 13-19)

### Day 7-8: Refactor State Management

#### Task 2.1: Split tutorStore into multiple stores
**New files:**
- `src/services/ai_tutor/stores/useTutorUIStore.js` - UI state
- `src/services/ai_tutor/stores/useTutorChatStore.js` - Messages
- `src/services/ai_tutor/stores/useTutorProfileStore.js` - Learner profile
- `src/services/ai_tutor/stores/useTutorAudioStore.js` - Audio state

**OR use Zustand slices pattern:**
```javascript
// tutorStore.js
import { create } from 'zustand';
import { createUISlice } from './slices/uiSlice';
import { createChatSlice } from './slices/chatSlice';
import { createProfileSlice } from './slices/profileSlice';

export const useTutorStore = create((set, get) => ({
  ...createUISlice(set, get),
  ...createChatSlice(set, get),
  ...createProfileSlice(set, get)
}));
```

**Checklist:**
- [ ] Analyze current store structure
- [ ] Decide: Multiple stores vs Slices pattern
- [ ] Create new store files
- [ ] Migrate state gradually
- [ ] Update all components to use new stores
- [ ] Test thoroughly

**Estimated time:** 12 hours

---

### Day 9-10: Add Input Validation & Performance Optimizations

#### Task 2.2: Create Input Validator
**File:** `src/services/ai_tutor/utils/inputValidator.js`

**Checklist:**
- [ ] Create `validateUserInput()` function
- [ ] Add sanitization (remove HTML tags)
- [ ] Add length limits
- [ ] Update all input handlers

**Estimated time:** 4 hours

---

#### Task 2.3: Performance Optimizations
**Files to update:**
- `learnerProfiler.js` - Add memoization
- `vocabMasteryTracker.js` - Add debouncing
- Tab components - Optimize selectors

**Checklist:**
- [ ] Install lodash (if not already)
- [ ] Memoize `inferLearnerStyle()`
- [ ] Debounce `trackVocabUsage()`
- [ ] Optimize Zustand selectors in tabs
- [ ] Test performance improvements

**Code:**
```javascript
// learnerProfiler.js
import { memoize } from 'lodash';
export const inferLearnerStyle = memoize(
  (behaviorHistory) => { /* logic */ },
  (history) => JSON.stringify(history.slice(-10))
);

// vocabMasteryTracker.js
import { debounce } from 'lodash';
export const trackVocabUsage = debounce((userInput, vocabList) => {
  // logic
}, 300);

// StoryMissionTab.jsx
const messages = useTutorStore(
  state => state.messages['story'],
  (a, b) => a.length === b.length && a[a.length - 1]?.id === b[b.length - 1]?.id
);
```

**Estimated time:** 6 hours

---

### Day 11-12: Add Unit Tests

#### Task 2.4: Write Core Tests
**New files:**
- `tests/services/ai_tutor/novaEngine.test.js`
- `tests/services/ai_tutor/grammarGuard.test.js`
- `tests/services/ai_tutor/learnerProfiler.test.js`
- `tests/utils/responseParser.test.js`

**Checklist:**
- [ ] Setup test environment (Vitest or Jest)
- [ ] Write NovaEngine tests (prompt building, guardrails)
- [ ] Write GrammarGuard tests (banned word detection)
- [ ] Write LearnerProfiler tests (style inference)
- [ ] Write ResponseParser tests (parsing edge cases)
- [ ] Aim for 80% code coverage

**Estimated time:** 10 hours

---

### Week 2 Summary
**Total estimated time:** 32 hours (4 work days)

**Deliverables:**
- ✅ State management refactored
- ✅ Input validation added
- ✅ Performance optimized
- ✅ Unit tests added (80% coverage)

---

## 📅 PHASE 3: ENHANCEMENTS (Week 3: Jan 20-27)

### Day 13-14: Response Caching

#### Task 3.1: Implement Response Cache
**File:** `src/services/ai_tutor/utils/responseCache.js`

**Checklist:**
- [ ] Create cache with Map
- [ ] Implement `getCachedResponse()`
- [ ] Implement `cacheResponse()`
- [ ] Add TTL (1 hour expiration)
- [ ] Integrate into NovaEngine
- [ ] Test cache hit/miss scenarios

**Estimated time:** 6 hours

---

### Day 15-16: Conversation Analytics

#### Task 3.2: Add Analytics Tracking
**File:** `src/services/ai_tutor/analytics/conversationAnalytics.js`

**Checklist:**
- [ ] Create `trackConversationMetrics()` function
- [ ] Calculate avg response time
- [ ] Calculate vocab usage rate
- [ ] Calculate engagement score
- [ ] Store metrics in localStorage
- [ ] Create analytics dashboard (optional)

**Estimated time:** 8 hours

---

### Day 17-18: A/B Testing Framework

#### Task 3.3: Setup A/B Testing
**File:** `src/services/ai_tutor/abTesting/promptVariants.js`

**Checklist:**
- [ ] Create prompt variants (A/B/C)
- [ ] Implement deterministic assignment
- [ ] Track variant performance
- [ ] Add analytics integration
- [ ] Document testing process

**Estimated time:** 8 hours

---

### Day 19-21: Documentation & Final Testing

#### Task 3.4: Update Documentation
**Files to update:**
- `docs/ai_application_context.md`
- `README.md`
- Add `docs/AI_TUTOR_ARCHITECTURE.md`

**Checklist:**
- [ ] Document NovaEngine architecture
- [ ] Update API documentation
- [ ] Add testing guidelines
- [ ] Add troubleshooting guide
- [ ] Create upgrade migration guide

**Estimated time:** 6 hours

---

#### Task 3.5: Integration Testing
**Checklist:**
- [ ] Test all 5 tabs end-to-end
- [ ] Test error scenarios
- [ ] Test performance under load
- [ ] Test on different devices
- [ ] User acceptance testing

**Estimated time:** 8 hours

---

### Week 3 Summary
**Total estimated time:** 36 hours (4.5 work days)

**Deliverables:**
- ✅ Response caching implemented
- ✅ Analytics tracking added
- ✅ A/B testing framework ready
- ✅ Documentation updated
- ✅ Full integration testing complete

---

## 📊 SUCCESS METRICS

### Before Upgrades (Baseline)
- Token usage per conversation: ~5,000 tokens
- API error rate: 8-10%
- Avg response time: 3-4 seconds
- Code duplication: High (30-40%)

### After Upgrades (Targets)
- Token usage per conversation: ~2,000 tokens (-60% ✅)
- API error rate: 4-5% (-40% ✅)
- Avg response time: 2-3 seconds (-30% ✅)
- Code duplication: Low (5-10%) (-75% ✅)

### Additional Metrics
- Code coverage: 80%+
- User satisfaction: Track via analytics
- Mission completion rate: Baseline → +20%

---

## 🚨 RISK MITIGATION

### Risk 1: Breaking Changes
**Mitigation:**
- Test thoroughly after each phase
- Keep backup branches
- Gradual rollout (feature flags)

### Risk 2: Performance Regression
**Mitigation:**
- Benchmark before/after each optimization
- Load testing with realistic data
- Monitor production metrics

### Risk 3: User Experience Issues
**Mitigation:**
- Beta testing with small user group
- Collect feedback early
- Quick rollback plan if needed

---

## 🔄 ROLLOUT PLAN

### Stage 1: Development (Week 1-3)
- Implement changes on feature branch
- Unit tests + integration tests
- Code review

### Stage 2: Staging (Week 4)
- Deploy to staging environment
- Beta testing with 10-20 users
- Monitor metrics closely

### Stage 3: Production (Week 5)
- Gradual rollout (10% → 50% → 100%)
- Monitor error rates
- Collect user feedback

### Stage 4: Post-Launch (Week 6+)
- Analyze metrics
- Iterate based on feedback
- Plan next improvements

---

## 🎯 NEXT STEPS (IMMEDIATE)

### This Week (Jan 6-12)
1. **Day 1 (Today):** Start Phase 1 Task 1.1 - Create NovaEngine
2. **Day 2:** Complete NovaEngine + tests
3. **Day 3:** Refactor tabs to use NovaEngine
4. **Day 4-5:** Optimize prompts
5. **Day 6:** Improve error handling
6. **Day 7:** Code review + merge Phase 1

### Action Items (Right Now)
- [ ] Create feature branch: `feature/ai-tutor-upgrades-phase1`
- [ ] Create `src/services/ai_tutor/novaEngine.js`
- [ ] Setup test environment (Vitest)
- [ ] Update project board/tasks

---

## 📝 NOTES

- **Priority:** Focus on Phase 1 first (highest ROI)
- **Flexibility:** Adjust timeline based on actual progress
- **Communication:** Update team daily on progress
- **Documentation:** Document decisions and trade-offs

**Est. Total Time:** ~100 hours (12.5 work days)  
**Timeline:** 3 weeks (with testing buffer)  
**Impact:** High - reduces costs, improves UX, easier maintenance
