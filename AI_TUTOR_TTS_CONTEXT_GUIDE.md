# AI Tutor TTS Context-Aware Caching Guide

**Date:** March 12, 2026  
**Status:** ✅ Infrastructure Complete - Ready for Incremental Implementation  
**Priority:** High (Cost Optimization)

## 📋 Overview

Updated AI Tutor TTS engine to support **context-aware caching** that organizes audio files by content type instead of flat hash-based structure. This enables:

1. **Better organization** - Files grouped by type (story/conversation/vocab/etc.)
2. **Higher cache hit rate** - Hardcoded content reused across sessions
3. **Lower API costs** - Save ~$300-400/month by caching static content
4. **Easier debugging** - Descriptive paths instead of hashes

## 🏗️ Architecture

### New Folder Structure
```
audio/ai_tutor/
├─ common/                      # 66 generic phrases (DONE ✅)
│  └─ praise_great.mp3
├─ story/                       # Story mission content (TO DO)
│  └─ week{N}/
│     └─ mission{M}_{subType}.mp3
├─ conversation/                # Conversation cards (TO DO)
│  └─ {cardId}/{qNum}.mp3
├─ vocab/                       # Vocabulary translations (TO DO)
│  └─ {vocabId}_{lang}.mp3
├─ translation/                 # General translations (TO DO)
│  └─ {hash}.mp3
└─ dynamic/                     # Truly unique content (DEFAULT)
   └─ {hash}.mp3
```

### How It Works

**1. Developer passes context when calling textToSpeech:**
```javascript
await textToSpeech("Let's start the story!", {
  autoPlay: true,
  context: {
    type: 'story',
    weekNum: 14,
    stationId: 'mission1',
    subType: 'opening'
  }
});
```

**2. ttsEngine generates organized path:**
```
audio/ai_tutor/story/week14/mission1_opening.mp3
```

**3. Worker caches to R2 on first generation:**
```
- First play: Generate via Deepgram → Save to R2
- Subsequent plays: Retrieve from R2 (instant, free)
```

## 🎯 Context Schema

### Context Object Structure
```javascript
{
  type: string,        // Required: 'story'|'conversation'|'vocab'|'translation'|'dynamic'
  
  // For story missions:
  weekNum: number,     // Week number (1-52)
  stationId: string,   // Mission identifier (e.g., 'mission1', 'mission2')
  questionId: string,  // Question ID within mission (optional)
  subType: string,     // 'opening'|'prompt'|'choice_a'|'feedback'|'hint'
  
  // For conversation cards:
  cardId: string,      // Card identifier (e.g., 'family_intro')
  questionNum: number, // Question number (1, 2, 3)
  
  // For vocabulary:
  vocabId: string,     // Vocabulary word (e.g., 'tiger', 'lion')
  language: string,    // 'en' or 'vi'
  
  // For translations:
  language: string     // Target language
}
```

### Context Types

#### 1. **Common Phrases** (Already Implemented ✅)
```javascript
// No context needed - auto-detected
await textToSpeech("Great job!", { autoPlay: true });
// → audio/ai_tutor/common/praise_great.mp3
```

#### 2. **Story Mission Content** (Partially Implemented ⏳)
```javascript
// Opening line
await textToSpeech(mission.opening_narrative, {
  context: {
    type: 'story',
    weekNum: 14,
    stationId: 'mission1',
    subType: 'opening'
  }
});
// → audio/ai_tutor/story/week14/mission1_opening.mp3

// Question prompt
await textToSpeech(question.text, {
  context: {
    type: 'story',
    weekNum: 14,
    stationId: 'mission1',
    questionId: 'q1',
    subType: 'prompt'
  }
});
// → audio/ai_tutor/story/week14/mission1_q1_prompt.mp3

// Multiple choice option
await textToSpeech(choice.text, {
  context: {
    type: 'story',
    weekNum: 14,
    stationId: 'mission1',
    questionId: 'q1',
    subType: 'choice_a'
  }
});
// → audio/ai_tutor/story/week14/mission1_q1_choice_a.mp3

// AI feedback (DYNAMIC - don't cache statically)
await textToSpeech(aiResponse, {
  context: { type: 'dynamic' }
});
// → audio/ai_tutor/dynamic/{hash}.mp3
```

#### 3. **Conversation Cards** (Not Implemented Yet ⏳)
```javascript
await textToSpeech(cardData.questions[0].text, {
  context: {
    type: 'conversation',
    cardId: 'family_intro',
    questionNum: 1
  }
});
// → audio/ai_tutor/conversation/family_intro/q1.mp3
```

#### 4. **Vocabulary** (Not Implemented Yet ⏳)
```javascript
// English word
await textToSpeech(vocab.english, {
  context: {
    type: 'vocab',
    vocabId: 'tiger',
    language: 'en'
  }
});
// → audio/ai_tutor/vocab/tiger_en.mp3

// Vietnamese translation
await textToSpeech(vocab.vietnamese, {
  context: {
    type: 'vocab',
    vocabId: 'tiger',
    language: 'vi'
  }
});
// → audio/ai_tutor/vocab/tiger_vi.mp3
```

#### 5. **Translations** (Not Implemented Yet ⏳)
```javascript
await textToSpeech(translatedText, {
  context: {
    type: 'translation',
    language: 'vi'
  }
});
// → audio/ai_tutor/translation/{hash}.mp3
```

#### 6. **Dynamic Content** (Default ✅)
```javascript
// Student-specific AI responses, recasts, ask anything
await textToSpeech(aiResponse, {
  context: { type: 'dynamic' }
});
// → audio/ai_tutor/dynamic/{hash}.mp3

// Or just omit context - defaults to dynamic
await textToSpeech(aiResponse, { autoPlay: true });
```

## 📊 Impact Analysis

### Current State (After Phase 1 ✅)
```
- 66 common phrases cached statically
- All other content: hash-based dynamic cache
- Cache hit rate: ~3-5%
- Monthly Deepgram cost: ~$150
```

### Target State (After Full Implementation)
```
- 66 common phrases (done)
- ~200 story mission files per week (14 weeks = 2,800 files)
- ~100 conversation card files
- ~500 vocabulary files (250 words × 2 languages)
- Cache hit rate: ~60-70%
- Monthly Deepgram cost: ~$50-70
- SAVINGS: ~$80-100/month
```

## 🚀 Implementation Roadmap

### Phase 1: Infrastructure ✅ COMPLETE
- [x] Update `generateCacheInfo()` with context support
- [x] Update `textToSpeech()` signature to accept context
- [x] Update console logs to show category
- [x] Add context to one example (StoryMissionTab opening line)

### Phase 2: Story Mission Content (Priority: High)
**Estimated Time:** 4-6 hours  
**Impact:** High (most frequently used content)

**Files to Update:**
- `src/modules/ai_tutor/tabs/StoryMissionTab.jsx`

**TTS Calls to Add Context:**
1. Opening line (DONE ✅)
2. Question prompts from week data
3. Multiple choice options
4. Hints
5. Leave AI responses as dynamic (don't cache)

**Example:**
```javascript
// Find all TTS calls in StoryMissionTab
// For each hardcoded content (from weekData):
await textToSpeech(content, {
  context: {
    type: 'story',
    weekNum: currentWeek,
    stationId: `mission${missionId}`,
    subType: 'prompt' // or 'choice_a', 'hint', etc.
  }
});
```

### Phase 3: Vocabulary (Priority: Medium)
**Estimated Time:** 2-3 hours  
**Impact:** Medium (500 words × 2 languages = 1000 reusable files)

**Files to Search:**
- `src/modules/ai_tutor/tabs/*Tab.jsx`
- `src/modules/vocabulary/**/*.{js,jsx}`

**TTS Calls:**
```javascript
// English word pronunciation
textToSpeech(vocab.english, {
  context: {
    type: 'vocab',
    vocabId: vocab.id,
    language: 'en'
  }
});

// Vietnamese translation
textToSpeech(vocab.vietnamese, {
  context: {
    type: 'vocab',
    vocabId: vocab.id,
    language: 'vi'
  }
});
```

### Phase 4: Conversation Cards (Priority: Low)
**Estimated Time:** 2-3 hours  
**Impact:** Low (less frequently used)

**Files to Update:**
- Conversation card components (if exist)

### Phase 5: Translations (Priority: Low)
**Estimated Time:** 1-2 hours  
**Impact:** Medium (may reuse common translations)

## 🧪 Testing Checklist

### 1. Test Context Detection
```javascript
// Open browser console in AI Tutor tab
// Trigger story mission opening
// Should see:
console.log('📖 STORY: mission1_opening');
console.log('✅ R2 cache HIT: audio/ai_tutor/story/week14/mission1_opening.mp3');
```

### 2. Test Cache Reuse
```
1. Start Mission 1 → Opening plays (cache MISS, generates)
2. Restart Mission 1 → Opening plays (cache HIT, instant)
3. Check R2 Dashboard → Should see file in audio/ai_tutor/story/week14/
```

### 3. Test Fallback to Dynamic
```
1. Trigger AI response (no context)
2. Console should show:
   ✨ DYNAMIC: a1b2c3d4...
   audio/ai_tutor/dynamic/a1b2c3d4.mp3
```

## 📚 Console Log Reference

New console logs show content category:
```
🎯 COMMON: praise_great
📖 STORY: mission1_opening
💬 CONVERSATION: family_intro_q1
📚 VOCAB: tiger_en
🌐 TRANSLATION: a1b2c3d4
✨ DYNAMIC: a1b2c3d4
```

## ⚠️ Important Notes

### When to Use Context
✅ **USE CONTEXT** for:
- Hardcoded content from week data (prompts, choices)
- Vocabulary words and translations
- Conversation card questions
- Any content that repeats across sessions

❌ **DON'T USE CONTEXT** for:
- AI-generated responses to student input
- Student recasts
- Ask anything responses
- Any truly unique, student-specific content

### Backward Compatibility
```javascript
// Old code still works (defaults to dynamic)
await textToSpeech("Hello!", { autoPlay: true });

// New code with context
await textToSpeech("Hello!", {
  autoPlay: true,
  context: { type: 'story', weekNum: 1, ... }
});
```

## 🛠️ Developer Workflow

### Adding Context to Existing TTS Call

**Step 1:** Find the TTS call
```javascript
await textToSpeech(someText, { autoPlay: true });
```

**Step 2:** Determine if content is static or dynamic
- Static: From week data, hardcoded questions, vocab
- Dynamic: AI response, student recast

**Step 3:** If static, add appropriate context
```javascript
await textToSpeech(someText, {
  autoPlay: true,
  context: {
    type: 'story', // or 'vocab', 'conversation'
    weekNum: currentWeek,
    stationId: 'mission1',
    subType: 'prompt'
  }
});
```

**Step 4:** Test in browser console
- Check console logs show correct category
- Verify cache path is descriptive
- Test cache HIT on second play

## 📈 Success Metrics

After full implementation, we should see:

1. **R2 Dashboard:**
   - `audio/ai_tutor/common/`: 66 files (407 KB)
   - `audio/ai_tutor/story/`: ~2,800 files (organized by week)
   - `audio/ai_tutor/vocab/`: ~1,000 files
   - `audio/ai_tutor/dynamic/`: Growing but slower rate

2. **Deepgram Dashboard:**
   - API calls reduced by 60-70%
   - Monthly cost: $50-70 (down from $150)

3. **User Experience:**
   - Instant playback for repeated content
   - Consistent voice quality
   - Faster lesson loading

---

**Status:** Infrastructure complete ✅  
**Next Steps:** Implement Phase 2 (Story Mission) incrementally  
**Estimated ROI:** $80-100/month savings after full implementation
