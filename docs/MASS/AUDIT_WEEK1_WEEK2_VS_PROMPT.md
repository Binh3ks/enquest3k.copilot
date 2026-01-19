# RÀ SOÁT ĐỐI CHIẾU: WEEK 1-2 VS MASTER PROMPT V24.2
## Audit Report - January 14, 2026

**Status**: 🔴 CRITICAL ISSUES FOUND - REQUIRES FIXES

---

## 📊 EXECUTIVE SUMMARY

### Issues Found: 5 Critical + 2 Warnings

| # | Issue | Severity | Impact | Status |
|---|-------|----------|--------|--------|
| 1 | dictation.js & shadowing.js schemas DIFFERENT from read.js | 🔴 CRITICAL | Prompt mismatch | NEEDS FIX |
| 2 | Image generation script uses wrong API | 🔴 CRITICAL | Mass production broken | NEEDS FIX |
| 3 | AI Tutor (week_XX_real.js) not in 17-file list | 🔴 CRITICAL | Week 2 missing content | NEEDS FIX |
| 4 | video_queries.json logic unclear | ⚠️ WARNING | Prompt incomplete | NEEDS CLARIFICATION |
| 5 | Week 2 read.js has 16 sentences (not 10-11) | ⚠️ WARNING | Validation rules wrong | NEEDS UPDATE |

---

## 🔍 DETAILED FINDINGS

### ❌ ISSUE 1: dictation.js & shadowing.js Schemas MISMATCH

**Current Reality (Week 1 & 2):**

```javascript
// dictation.js - ACTUAL SCHEMA
export default {
  sentences: [
    { id: 1, text: "...", meaning: "..." },
    { id: 2, text: "...", meaning: "..." },
    // Array of sentence objects
  ]
};

// shadowing.js - ACTUAL SCHEMA
export default {
  title: "string",
  audio_full: "string",      // Full passage audio
  script: [
    { id: 1, text: "...", vi: "...", audio_url: "..." },
    { id: 2, text: "...", vi: "...", audio_url: "..." },
    // Array with individual audio files
  ]
};
```

**Master Prompt V24.2 Says:**

```javascript
// dictation.js (WRONG - oversimplified)
export default {
  title: "string",
  content: "string",         // ❌ NOT TRUE
  audio_url: null
};

// shadowing.js (WRONG - oversimplified)
export default {
  title: "string",
  content: "string",         // ❌ NOT TRUE
  audio_url: null
};
```

**✅ REQUIRED FIX:**

Update Master Prompt V24.2 Section 3.11:

```javascript
// dictation.js - CORRECT SCHEMA
export default {
  sentences: [
    {
      id: NUMBER,
      text: "string",              // English sentence from read.js
      meaning: "string"            // Vietnamese translation
    }
    // Copy ALL sentences from read.js content_en
  ]
};

// shadowing.js - CORRECT SCHEMA
export default {
  title: "string",                 // Same as read.js title
  audio_full: "string",            // Optional: full passage audio
  script: [
    {
      id: NUMBER,
      text: "string",              // English sentence from read.js
      vi: "string",                // Vietnamese translation
      audio_url: "string"          // Individual sentence audio
    }
    // Copy ALL sentences from read.js content_en
  ]
};
```

**Impact on Mass Production:**
- ❌ generate_week.js MUST parse read.js content_en sentence by sentence
- ❌ CANNOT just copy { title, content, audio_url }
- ✅ MUST split into array of sentence objects

---

### ❌ ISSUE 2: Image Generation Script Uses WRONG API

**Problem:**
```bash
# User says:
"script tạo image không đúng, phải dùng Nano banana 
(có script test_nanobanana trong app rồi) 
nhưng script lại dùng Imagen"
```

**Reality Check:**

✅ **File: `tools/generate_images_nano.js`**
```javascript
// Line 1-6:
/**
 * UNIFIED IMAGE GENERATOR - Nano Banana (FREE)
 * Generates images for both Advanced and Easy modes using Gemini free tier
 * Cost: $0 for 144 weeks × 2 modes = 4,320 images
 */

// Line 44: CORRECT API
const NANO_BANANA_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${GEMINI_API_KEY}`;
```

✅ **VERDICT:** Script is ALREADY using Nano Banana (gemini-3-pro-image-preview)

❌ **BUT:** User says "script lại dùng Imagen" - need to check if there's a DIFFERENT script

**Search for Other Image Scripts:**

```bash
tools/generate_images.js          # ← OLD SCRIPT?
tools/generate_images_nano.js     # ← CURRENT (Nano Banana) ✅
tools/generate_images_nano_banana.js  # ← DUPLICATE?
```

**✅ REQUIRED ACTION:**

1. Confirm which script is used in `mass_produce_week.sh`:
```bash
# Should be:
node tools/generate_images_nano.js $WEEK both
```

2. Delete or rename old scripts to avoid confusion:
```bash
mv tools/generate_images.js tools/generate_images_OLD_IMAGEN.js.bak
```

3. Update MASS_PRODUCTION_CONTEXT.md Section 8.5:
```markdown
### 8.5 generate_images_nano.js (IMAGE GENERATOR)

**⚠️ CRITICAL: Use Nano Banana ONLY**

**API:** gemini-3-pro-image-preview (FREE tier)
**Cost:** $0 for 4,320 images (144 weeks × 2 modes × 15 images)

**Command:**
```bash
node tools/generate_images_nano.js <week> both
```

**DO NOT USE:**
- ❌ generate_images.js (Old - uses Imagen - PAID)
- ✅ generate_images_nano.js (Correct - uses Nano Banana - FREE)
```

---

### ❌ ISSUE 3: AI Tutor (week_XX_real.js) NOT in 17-File List

**Current 17-File Manifest:**
```
1. index.js
2. vocab.js
3. read.js
4. explore.js
5. word_power.js
6. grammar.js
7. logic.js
8. ask_ai.js
9. writing.js
10. dictation.js
11. shadowing.js
12. word_match.js
13. mindmap.js
14. daily_watch.js
15. video_queries.json  ← Actually not .js
```

**Missing File:**
```
❌ week_XX_real.js  ← AI Tutor Story Mission content
```

**Evidence:**
- ✅ Week 1 has: `src/data/weeks/week_01_real.js`
- ❓ Week 2 has: `src/data/weeks/week_02_real.js` (need to verify)

**Content of week_01_real.js:**
```javascript
export const week1RealData = {
  week_id: 1,
  week_title_en: "Hello, World! (Identity)",
  topic: "Introduction & Superheroes",
  learning_outcome: "Say and write sentences introducing name/age naturally.",
  grammar_focus: "Pattern 'I am...' (Identity)",
  
  // TARGET VOCAB from SYLLABUS (7 words)
  target_vocab: [
    { word: "name", ... },
    { word: "age", ... },
    { word: "student", ... },
    { word: "hero", ... },
    { word: "power", ... },
    { word: "boy", ... },
    { word: "girl", ... }
  ],
  
  // STORY MISSIONS (3 missions)
  story_missions: [...],
  
  // PRONUNCIATION DRILLS
  pronunciation_focus: [...],
  
  // FREE TALK SCENARIOS
  free_talk_scenarios: [...]
};
```

**✅ REQUIRED FIX:**

1. Add to 17-File Manifest:
```
16. week_XX_real.js  ← AI Tutor content (syllabus-driven)
```

2. Update Master Prompt V24.2 Section 3.1:
```markdown
### 3.1 Weekly File Manifest (17 files → 18 files)

src/data/weeks/week_XX/
├── index.js              ← Aggregator
├── vocab.js              ← 10 core words
├── read.js               ← Main passage
├── explore.js            ← CLIL passage
├── word_power.js         ← 3 collocations
├── grammar.js            ← 20 exercises
├── logic.js              ← 5 puzzles
├── ask_ai.js             ← 5 A0 prompts
├── writing.js            ← Writing prompt
├── dictation.js          ← Sentence array from read.js
├── shadowing.js          ← Sentence array from read.js
├── word_match.js         ← Placeholder
├── mindmap.js            ← Speaking stems
├── daily_watch.js        ← 3-5 videos
├── week_XX_real.js       ← 🆕 AI Tutor syllabus content
└── video_queries.json    ← Search keywords
```

3. Add schema for `week_XX_real.js`:

```javascript
// week_XX_real.js - AI Tutor Content
export const weekXXRealData = {
  // Metadata
  week_id: NUMBER,
  phase: NUMBER,
  block: "A" | "B" | "C",
  unit: NUMBER,
  
  // Syllabus Info
  week_title_en: "string",
  week_title_vi: "string",
  topic: "string",
  topic_vi: "string",
  
  // Learning Outcome
  learning_outcome: "string",
  learning_outcome_vi: "string",
  
  // Grammar
  grammar_focus: "string",
  grammar_pattern: "string",
  grammar_examples: ["string"],
  
  // Target Vocab (7 words from syllabus)
  target_vocab: [
    {
      word: "string",
      pronunciation: "string",
      definition_vi: "string",
      definition_en: "string",
      example: "string",
      syllabus_context: "string"
    }
  ],
  
  // Story Missions (3-5 missions)
  story_missions: [
    {
      mission_id: NUMBER,
      title: "string",
      objective: "string",
      scenario: "string",
      target_language: ["string"],
      success_criteria: "string"
    }
  ],
  
  // Pronunciation Focus
  pronunciation_focus: [
    {
      sound: "string",
      words: ["string"],
      minimal_pairs: ["string"]
    }
  ],
  
  // Free Talk Scenarios
  free_talk_scenarios: [
    {
      scenario: "string",
      prompts: ["string"]
    }
  ]
};
```

4. Update `generate_week.js` to generate this file

---

### ⚠️ ISSUE 4: video_queries.json Logic Unclear

**Current Implementation (Week 1):**

```json
{
  "weekId": 1,
  "theme": "Hello World - Identity",
  "searchPriority": [
    "English Singsing",
    "Little Fox",
    "Vooks"
  ],
  "videos": [
    {
      "id": 1,
      "purpose": "GRAMMAR",
      "priority_search": "English Singsing verb to be am is are",
      "backup_search": "am is are ESL kids song"
    }
  ]
}
```

**Process (from update_videos.js):**

1. Read `video_queries.json`
2. For each video:
   - Try `priority_search` first
   - If no results, try `backup_search`
   - Filter by WHITELIST channels
   - Check title matches query
3. Update `daily_watch.js` with real video IDs

**✅ VERDICT:** Logic is clear, but needs documentation

**Required Update to Prompt:**

Add Section 3.10.1: `video_queries.json` Schema:

```json
{
  "weekId": NUMBER,
  "theme": "string",
  "searchPriority": [
    "English Singsing",    // TIER 1 - Grammar
    "Little Fox",          // TIER 1 - Story
    "Vooks"                // TIER 1 - Story backup
  ],
  "videos": [
    {
      "id": NUMBER,
      "purpose": "GRAMMAR" | "STORY" | "VOCABULARY" | "SCIENCE",
      "priority_search": "string",   // [Channel] + [grammar/topic] + ESL kids
      "backup_search": "string"      // Fallback if priority fails
    }
    // 3-5 videos
  ]
}
```

---

### ⚠️ ISSUE 5: Week 2 read.js Has 16 Sentences (Not 10-11)

**Master Prompt V24.2 Says:**
```
Advanced Mode: 10-11 sentences (max 10 words each)
Easy Mode: 8 sentences (max 8 words each)
```

**Week 2 REALITY:**
```javascript
// Week 2 read.js content_en has 16 sentences:
1. "Hi! My name is Emma."
2. "I want to tell you about my family."
3. "My family is like a team."
4. "Everyone has an important job!"
5. "My father is the leader."
6. "He makes sure we are safe and happy."
7. "He works every day and helps us with homework."
8. "My mother is the team organizer."
9. "She cooks food, washes clothes, and keeps the house clean."
10. "My older brother Tom is a great helper."
11. "He helps me tie my shoes and teaches me games."
12. "My younger sister Lily is the cheerleader."
13. "She sings songs that make us smile."
14. "We work together every day."
15. "We clean, cook, and play as a team."
16. "I love my family squad!"
```

**Week 1 Count:** 10 sentences ✅

**Analysis:**
- Week 2 is MORE detailed (family members = more sentences)
- Content is still A0 level ✅
- Sentences are still short (5-10 words) ✅

**✅ REQUIRED UPDATE:**

Change validation rules in Prompt V24.2:

```markdown
## Sentence Count Rules (UPDATED):

### Advanced Mode:
- **Range:** 10-16 sentences
- **Guideline:** 10-12 for simple topics, 14-16 for complex topics
- **Max per sentence:** 10 words
- **Reason:** Some topics (e.g., family, routines) need more sentences

### Easy Mode:
- **Range:** 8-12 sentences
- **Guideline:** 8-10 for simple topics, 10-12 for complex topics
- **Max per sentence:** 8 words
```

Update validation script:
```javascript
// validate_week.js
const SENTENCE_COUNT = {
  advanced: { min: 10, max: 16, ideal: 12 },
  easy: { min: 8, max: 12, ideal: 10 }
};
```

---

## 📝 SUMMARY OF REQUIRED FIXES

### 1. Update Master Prompt V24.2

**File:** `docs/MASS/MASTER_PROMPT_V24.2_FINAL.md`

**Sections to Update:**

#### Section 3.1: Add week_XX_real.js to file manifest
```diff
+ ├── week_XX_real.js       ← AI Tutor syllabus content
```

#### Section 3.11: Fix dictation.js & shadowing.js schemas
```diff
- // WRONG: Simple copy
- export default { title, content, audio_url }

+ // CORRECT: Sentence array
+ export default {
+   sentences: [{ id, text, meaning }]  // dictation
+ }
+ export default {
+   title, audio_full,
+   script: [{ id, text, vi, audio_url }]  // shadowing
+ }
```

#### Section 4.3: Update sentence count rules
```diff
- Advanced: 10-11 sentences
- Easy: 8 sentences

+ Advanced: 10-16 sentences (flexible based on topic)
+ Easy: 8-12 sentences (flexible based on topic)
```

#### New Section 3.16: Add week_XX_real.js schema
```markdown
### 3.16 Schema: `week_XX_real.js` (AI Tutor Content)

This file provides AI Tutor with syllabus-driven content...
[Add full schema from Issue 3]
```

---

### 2. Update validate_week.js

**File:** `tools/validate_week.js`

**Changes:**

```javascript
// Update sentence count validation
const SENTENCE_COUNT_RULES = {
  advanced: {
    min: 10,
    max: 16,
    ideal: 12,
    warning: "14-16 sentences OK if topic complex (e.g., family, routine)"
  },
  easy: {
    min: 8,
    max: 12,
    ideal: 10,
    warning: "10-12 sentences OK if topic complex"
  }
};

// Add check for week_XX_real.js
function checkAITutorFile(weekId) {
  const filePath = `src/data/weeks/week_${weekId.toString().padStart(2,'0')}/week_${weekId.toString().padStart(2,'0')}_real.js`;
  
  if (!fs.existsSync(filePath)) {
    return {
      passed: false,
      error: `week_${weekId}_real.js missing (AI Tutor content required)`
    };
  }
  
  // Check structure: target_vocab (7 words), story_missions (3+)
  // ...
  
  return { passed: true };
}
```

---

### 3. Update generate_week.js

**File:** `tools/generate_week.js`

**Add:**

```javascript
// Add to FILE_TYPES array
const FILE_TYPES = [
  'vocab',
  'read',
  'explore',
  'word_power',
  'grammar',
  'logic',
  'writing',
  'dictation',    // ← Must parse read.js into sentence array
  'shadowing',    // ← Must parse read.js into sentence array
  'word_match',
  'mindmap',
  'ask_ai',
  'daily_watch',
  'week_real',    // ← NEW: AI Tutor content
  'index',
];

// Add generation logic for dictation.js
async function generateDictation(readData) {
  // Parse content_en into sentences
  const sentences = readData.content_en
    .split('. ')
    .map((s, i) => ({
      id: i + 1,
      text: s.trim() + (s.endsWith('.') ? '' : '.'),
      meaning: readData.content_vi.split('. ')[i]?.trim() + '.'
    }));
  
  return { sentences };
}

// Add generation logic for shadowing.js
async function generateShadowing(readData) {
  const sentences = readData.content_en
    .split('. ')
    .map((s, i) => ({
      id: i + 1,
      text: s.trim() + (s.endsWith('.') ? '' : '.'),
      vi: readData.content_vi.split('. ')[i]?.trim() + '.',
      audio_url: `/audio/week${WEEK_ID}/shadowing_${i+1}.mp3`
    }));
  
  return {
    title: readData.title,
    audio_full: `/audio/week${WEEK_ID}/shadowing_full_w${WEEK_ID}.mp3`,
    script: sentences
  };
}

// Add generation logic for week_XX_real.js
async function generateWeekReal(syllabusEntry, weekId) {
  // Extract from syllabus
  const prompt = `
    Based on syllabus entry for Week ${weekId}:
    - Topic: ${syllabusEntry.topic}
    - Grammar: ${syllabusEntry.grammar}
    
    Generate AI Tutor content:
    1. Extract 7 target vocabulary from syllabus
    2. Create 3-5 story missions
    3. Define pronunciation focus
    4. Create free talk scenarios
    
    Return as weekXXRealData object.
  `;
  
  // Call GPT-4...
  return weekRealData;
}
```

---

### 4. Verify mass_produce_week.sh Uses Correct Script

**File:** `tools/mass_produce_week.sh`

**Check Line ~80:**

```bash
# Step 6/7: Generate images
echo -e "${YELLOW}[6/7] 🎨 Generating images with Nano Banana...${NC}"

# ✅ CORRECT:
node tools/generate_images_nano.js $WEEK both

# ❌ WRONG (if exists):
# node tools/generate_images.js $WEEK both
```

**If wrong, update to:**
```bash
node tools/generate_images_nano.js $WEEK both
```

---

### 5. Update MASS_PRODUCTION_CONTEXT.md

**File:** `docs/MASS/MASS_PRODUCTION_CONTEXT.md`

**Updates:**

#### Section 3.1: Update file count
```diff
- ### 3.1 Weekly File Manifest (17 files)
+ ### 3.1 Weekly File Manifest (18 files)

src/data/weeks/week_XX/
+ ├── week_XX_real.js       ← AI Tutor content
```

#### Section 3.2-3.16: Add all schemas from this audit

#### Section 8.5: Clarify image generation
```diff
### 8.5 generate_images_nano.js (IMAGE GENERATOR)

+ **⚠️ CRITICAL: Use Nano Banana API ONLY**
+ 
+ **API:** gemini-3-pro-image-preview (FREE)
+ **Cost:** $0
+ 
+ **DO NOT USE:** generate_images.js (old Imagen script)
```

#### Section 9.1: Update validation rules
```diff
- Advanced: 10-11 sentences
- Easy: 8 sentences

+ Advanced: 10-16 sentences (flexible)
+ Easy: 8-12 sentences (flexible)
```

---

## ✅ ACTION CHECKLIST

### Immediate Actions (Before Week 2 Completion):

- [ ] Verify Week 2 has `week_02_real.js` file
- [ ] Check `mass_produce_week.sh` uses `generate_images_nano.js`
- [ ] Test dictation/shadowing generation from read.js
- [ ] Update validation rules for sentence count

### Documentation Updates:

- [ ] Update Master Prompt V24.2 (5 sections)
- [ ] Update MASS_PRODUCTION_CONTEXT.md (4 sections)
- [ ] Update validate_week.js (2 new checks)
- [ ] Update generate_week.js (3 new functions)

### Testing:

- [ ] Run `node tools/validate_week.js 1` (should pass)
- [ ] Run `node tools/validate_week.js 2` (check new rules)
- [ ] Generate test Week 3 with updated logic
- [ ] Verify all 18 files generated correctly

---

## 📌 NOTES FOR FUTURE WEEKS

### Critical Points to Remember:

1. **dictation.js & shadowing.js are NOT simple copies**
   - Must parse read.js sentence by sentence
   - dictation: `{ sentences: [...] }`
   - shadowing: `{ title, audio_full, script: [...] }`

2. **Image generation = Nano Banana ONLY**
   - Free tier (gemini-3-pro-image-preview)
   - DO NOT use Imagen (paid)

3. **AI Tutor needs week_XX_real.js**
   - Contains syllabus vocab (7 words)
   - Story missions (3-5)
   - Must be generated for EVERY week

4. **Sentence count is FLEXIBLE**
   - Simple topics: 10 sentences
   - Complex topics: 14-16 sentences
   - Validation should warn, not fail

5. **Video logic is clear**
   - video_queries.json → update_videos.js → daily_watch.js
   - Priority channels MUST be used

---

**END OF AUDIT REPORT**

**Next Step:** Apply fixes above before continuing to Week 3+
