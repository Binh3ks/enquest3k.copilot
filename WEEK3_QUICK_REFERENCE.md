# QUICK REFERENCE: WEEK 3 PRODUCTION
## Checklist & File Templates for Easy Review

**Tài liệu**: Quick Lookup  
**Ngày**: 16/01/2026  
**Mục đích**: Giúp duyệt nhanh & track progress  

---

## ✅ PRE-PRODUCTION CHECKLIST

### 📋 Documentation Review (Before creating content)
- [ ] Read: `WEEK3_PRODUCTION_PLAN.md` (comprehensive guide)
- [ ] Read: `V28_CRITICAL_CHANGES_SUMMARY.md` (AI tutor updates)
- [ ] Read: `0. MASS_PRODUCTION_CONTEXT.md` (Week 1 golden standard)
- [ ] Compare: Week 1 & Week 2 files in `src/data/weeks/`
- [ ] Understand: ask_ai.js validation rules (A0 patterns)

### 👤 Team Assignment
- [ ] **Content Creator (Claude/Human)**: Create 28 content files
- [ ] **AI Tutor Developer**: Create week_03_real.js with V28 format
- [ ] **QA/Validator**: Run validation scripts
- [ ] **Asset Generator**: Generate audio/images/videos

### ⚙️ Tools & Setup
- [ ] Validate script ready: `tools/validate_week.js`
- [ ] Validator for ask_ai: `tools/validate_ask_ai.js`
- [ ] Sync script ready: `tools/sync_week_data.py`
- [ ] Audio generator: `tools/generate_audio_final.py`
- [ ] Image generator: `tools/generate_images_nano_banana.js`
- [ ] Video fetcher: `tools/update_videos.js`

---

## 📂 FILE CREATION SEQUENCE

### PHASE 1: Core Content (14 Advanced + 14 Easy)

#### Step 1: vocab.js (FIRST - CRITICAL)
```
ADVANCED MODE:
✅ 10 words: tall, short, hair, eyes, long, curly, straight, glasses, smile, face
✅ Each word: id, pronunciation (IPA), definition_vi, definition_en, example, collocation, image_url, audio_word
✅ IPA format: /tɔːl/ (correct phonetic)
✅ Example max 8 words (A0)

EASY MODE:
✅ Same 10 words
✅ Simpler definitions
```

**File location**:
- Advanced: `src/data/weeks/week_03/vocab.js`
- Easy: `src/data/weeks_easy/week_03/vocab.js`

**Validation**: None yet (vocab.js is prerequisite)

---

#### Step 2: read.js (Uses vocab.js)
```
ADVANCED MODE:
✅ Title: "My Friends are Different" (or similar)
✅ 10-11 sentences
✅ 8-10 words per sentence
✅ EXACTLY 10 bold words (from vocab.js)
✅ CEFR A0: Present Simple only
✅ content_vi: Full Vietnamese translation
✅ audio_url: null (fill later)
✅ 3 comprehension questions (A0 patterns):
   - What questions: "What color is her hair?"
   - Where questions: "Where are they?"
   - Is questions: "Is Tom short?"

EASY MODE:
✅ 6-8 sentences
✅ 5-7 words per sentence
✅ Same 10 bold words
✅ Simpler topic/content
```

**Validation**: 
- Bold word count = 10
- All bold words in vocab.js
- Sentence count (Advanced: 10-11, Easy: 6-8)

---

#### Step 3: explore.js (CLIL - Different words)
```
ADVANCED MODE:
✅ Title: "Magic Mirrors" or CLIL science topic
✅ 10-11 sentences
✅ 8-10 words per sentence
✅ EXACTLY 10 bold words (DIFFERENT from read.js)
✅ Max 2 word overlap with read.js (90% unique)
✅ 3 comprehension questions + 1 open-ended
✅ CLIL topic: Science/Nature related

EASY MODE:
✅ 6-8 sentences
✅ Same 10 words as Advanced explore.js
✅ Simpler explanation
```

**Validation**:
- Bold word count = 10
- Unique word check: max 2 overlap with read.js
- No duplicate of read.js content

**Critical Example**:
```
read.js (10):     tall, short, hair, eyes, long, curly, straight, glasses, smile, face
explore.js (10):  mirror, reflection, image, glass, surface, light, bright, clear, see, opposite
Overlap:          0 (perfect) ✅
```

---

#### Step 4: word_power.js (3 Collocations)
```
✅ EXACTLY 3 collocations (Phase 1)
✅ Format: Verb + Noun (not single words)
✅ Examples: "brush hair", "wear glasses", "see reflection"
✅ Each has:
   - id, word, pronunciation (IPA)
   - definition_en, definition_vi
   - example (max 8 words)
   - model_sentence (full sentence)
   - collocation, image_url
✅ No audio_word field (different from vocab.js)
```

**Validation**:
- Count = 3
- All are verb + noun phrases
- Full example sentences provided

---

#### Step 5: grammar.js (20 Exercises)
```
✅ EXACTLY 20 exercises
✅ Mix by type:
   - Multiple Choice: 10-12 (e.g., 11)
   - Fill Blank: 4-6 (e.g., 5)
   - Unscramble: 2-4 (e.g., 4)
✅ Coverage:
   - Affirmative: ~6 ("She is tall")
   - Negative: ~6 ("He is not short")
   - Questions: ~8 ("Is she tall?")
✅ Vocabulary: vocab.js + word_power.js
✅ Grammar: Present Simple (is/has, affirmative/negative/question)
✅ Max 8 words per question
```

**Validation**:
- Total count = 20
- Type mix (MC ≥ 10, Fill 4-6, Unscramble 2-4)
- Coverage affirmative/negative/questions

---

#### Step 6: logic.js (5 Puzzles)
```
✅ EXACTLY 5 puzzles
✅ Each puzzle MUST have:
   - Full story context (not just "2+3=?")
   - Type: math/logic/pattern
   - question_en, question_vi (bilingual)
   - answer with UNIT: "Sarah" or "3 people" (not just "3")
   - hint_en, hint_vi
✅ Topics: Height logic, Mirror reflection, Counting, Comparisons, Patterns
```

**Example - CORRECT**:
```
Q: "Sarah is taller than Tom. Tom is taller than Lisa. Who is tallest?"
A: ["Sarah", "sarah"] ✅
Hint: "Order from tallest to shortest"
```

**Example - WRONG**:
```
Q: "2 + 3 = ?" ❌ (no context)
A: "5" ❌ (missing unit)
```

**Validation**:
- Count = 5
- Each has full context
- Answers include units/names

---

#### Step 7: ask_ai.js (5 Prompts - CRITICAL)
```
⚠️ CRITICAL: A0 COMPLIANCE REQUIRED

✅ EXACTLY 5 prompts
✅ Context length:
   - Advanced: 8-10 words
   - Easy: 5-6 words
✅ Answer MUST be A0 patterns:
   ✅ "What is this?"
   ✅ "Where is the pen?"
   ✅ "Is this a book?"
   ✅ "Can I play?"
   ✅ "Do you like it?"
   
❌ FORBIDDEN patterns (A1):
   ❌ "How do they..."
   ❌ "What does it do?"
   ❌ "Why is/are..."
   ❌ "How many/much..."
   
✅ Each has:
   - context_en, context_vi
   - answer: ["A0 pattern 1", "A0 pattern 2"]
   - hint: "What is..." or "Is..."
```

**Validation Tool**: `tools/validate_ask_ai.js`
```bash
node tools/validate_ask_ai.js 3
```

**Example - CORRECT**:
```
context_en: "You see a girl with curly hair. Ask what it is." (8 words)
answer: ["What is her hair?", "Is her hair curly?"]
hint: "What is... / Is..."
✅ A0 compliant
```

**Example - WRONG**:
```
context_en: "You see a girl with curly hair. Ask why it is curly." (11 words)
           ❌ 11 words (max 10)
answer: ["Why is her hair curly?"]
        ❌ "Why" is A1, not A0
```

---

#### Step 8: writing.js (Writing Challenge)
```
✅ Prompt: Specific, topic-related
   Example: "Write about a friend. What does he/she look like?"
✅ prompt_en, prompt_vi (bilingual)
✅ model_sentence_en, model_sentence_vi (Phase 1 required)
   Example: "My friend is tall and has curly hair."
✅ keywords: 5-7 words from vocab.js
   Example: ["tall", "short", "hair", "eyes", "curly"]
✅ min_words: 40 (Phase 1)
✅ NO image_url field ← Fixed in V25!
```

**Validation**:
- No image_url field
- Model sentence provided
- Keywords from vocab.js
- min_words ≥ 40

---

#### Step 9-10: dictation.js & shadowing.js (AUTO)
```
⚠️ These are AUTO-GENERATED from read.js

✅ dictation.js:
   - title: same as read.js
   - content: same as read.js content_en
   - audio_url: null

✅ shadowing.js:
   - title: same as read.js
   - content: same as read.js content_en
   - audio_url: null
```

**Creation**: Manual copy (will be auto-synced by sync_week_data.py)

---

#### Step 11: word_match.js (Placeholder)
```
✅ Simple placeholder file
✅ References vocab.js
✅ Minimal content (10-20 lines)
✅ Used by UI for drag-drop matching game
```

---

#### Step 12: mindmap.js (Speaking Stems)
```
✅ 3 branches (topics for speaking practice)
✅ Branch 1: "She is..." (tall, short, beautiful, different)
✅ Branch 2: "Her hair is..." (long, short, curly, straight, black)
✅ Branch 3: "Tom is... Sarah" (taller than, shorter than, different from)
✅ A0 vocabulary only
✅ ~100-150 lines
```

---

#### Step 13: daily_watch.js (3-5 Videos)
```
✅ 3-5 videos from PRIORITY CHANNELS:
   1. English Singsing (GRAMMAR) - mandatory 1-2
   2. Little Fox (STORY) - mandatory 1
   3. Vooks (STORY) - backup
   4. SciShow Kids, KidsTV123, etc.

✅ Each video has:
   - id: 1,2,3,4,5
   - title: "Full Title"
   - videoId: "11-character YouTube ID"
   - duration: "MM:SS" format
   - sim_duration: seconds
   - thumb: YouTube thumbnail URL
   - channel: "Channel Name"
   - purpose: "GRAMMAR" | "STORY" | "VOCABULARY" | "SCIENCE"

✅ Real YouTube IDs (not made up)
```

**Validation**:
- Video count: 3-5
- English Singsing: ≥ 1
- Little Fox or Vooks: ≥ 1
- YouTube IDs: real, 11 characters

---

#### Step 14: video_queries.json (Search Backup)
```
✅ JSON array of search keywords
✅ Used if live video fetch fails
✅ Format: ["query 1", "query 2", "query 3"]
✅ Example:
   [
     "English Singsing describing people",
     "Little Fox children story appearance",
     "Kids learning adjectives tall short"
   ]
```

---

#### Step 15: index.js (AGGREGATOR - MANUAL CREATION)

⚠️ **IMPORTANT: This is NOT auto-generated. Must be CREATED manually for both modes.**

**Template (using Week 1 as reference)**:
```javascript
import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import explore from './explore.js';
import word_power from './word_power.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import mindmap from './mindmap.js';

const weekData = {
  weekId: 3,
  isEasy: false,  // Change to true for Easy mode
  weekTitle_en: "The Mirror Game",
  weekTitle_vi: "Trò chơi Soi Gương",
  grammar_focus: "Adjectives - 'is' vs 'has'",
  global_vocab: vocab.vocab,
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D'
  },
  
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    video: writing,
    writing: writing,
    explore: explore,
    word_power: word_power,
    daily_watch: daily_watch,
    mindmap_speaking: mindmap
  }
};

export default weekData;
```

**Key fields**:
- ✅ `weekId: 3` (must match week number)
- ✅ `isEasy: false` for Advanced, `true` for Easy
- ✅ `weekTitle_en` + `weekTitle_vi`
- ✅ `grammar_focus` (main grammar point)
- ✅ `global_vocab: vocab.vocab` (reference to vocab.js)
- ✅ `voiceConfig` (Google Cloud TTS voices - same for all weeks Phase 1)
- ✅ `stations` (map all 13 stations + import all .js files)

**Files required**:
- Advanced: `src/data/weeks/week_03/index.js`
- Easy: `src/data/weeks_easy/week_03/index.js`

---

### PHASE 2: Update Syllabus Database (CRITICAL STEP)

#### Step 16: UPDATE syllabus_database.js (CRITICAL)

**File location**: `src/data/syllabus_database.js`

**Current entry for Week 3** (placeholder):
```javascript
3: { title: "Observing Differences", grammar: ["Adjectives"], math: ["Height"], science: ["Senses"], topic: ["Appearance"] },
```

**Update to**:
```javascript
3: { 
  title: "The Mirror Game", 
  grammar: ["Adjectives (is vs has)"], 
  math: ["Comparisons"], 
  science: ["Senses - Sight"], 
  topic: ["Appearance & Physical Traits"] 
},
```

**Why**: The app dropdown uses this to display week titles. If not updated, Week 3 will show old name.

**Validation**: After creating all files, verify Week 3 appears in app dropdown with correct title.

---

#### Step 17: week_03_real.js (AI TUTOR - V28)

⚠️ **CRITICAL: Use V28 Format Only**

```javascript
export default {
  weekId: 3,
  weekTitle: "The Mirror Game",
  mission: {
    id: 1,
    title: "What Do I Look Like?",
    context: "Ms. Nova asks you to describe yourself and your friends.",
    target_vocab: ["tall", "short", "hair", "eyes", "curly", "straight", "glasses"],
    minimum_turns: 5,
    steps: [
      // ✅ V28 FORMAT: ack / recast / question
      {
        id: 1,
        role: "ai_tutor",
        response: {
          ack: "",
          recast: "",
          question: "Hello! I am Ms. Nova. Tell me about yourself. Are you tall or short?",
          suggested_hints: ["I", "am", "tall", "short"],
          mission_status: "continue"
        }
      },
      {
        id: 2,
        role: "ai_tutor",
        response: {
          ack: "Nice!",
          recast: "You are tall!",
          question: "What color is your hair?",
          suggested_hints: ["My", "hair", "is", "black", "brown"],
          mission_status: "continue"
        }
      },
      // ... more steps
    ]
  }
};
```

**V28 Requirements**:
- ✅ `ack`: "Nice!" / "Great!" / "Wonderful!" (or empty for opening)
- ✅ `recast`: ≤ 8 words, correct subject
- ✅ `question`: A0 patterns only
- ✅ NO `teacher_ack`, NO `teacher_recast`, NO `teacher_encouragement`
- ✅ Subject agreement:
  - Student about self → "you"
  - Student about mother → "she"
  - Student about father → "he"

**Validation**: Manual review + regex check for format

---

### PHASE 3: Auto-Generated Aggregators (System-generated)

#### Step 16: index.js (ADVANCED)
```
✅ Combines all 13 stations + voiceConfig
✅ Auto-generated after all content ready
✅ voiceConfig: US Male/Female voices
```

#### Step 17: index.js (EASY)
```
✅ Same structure as Advanced
✅ Auto-generated after all content ready
```

---

## 🎯 VALIDATION SEQUENCE

### Check 1: Syntax Validation
```bash
node tools/validate_week.js 3
```

**Expected output**:
```
✅ File count: 14 .js + 1 .json
✅ Syntax: No errors
✅ ask_ai: 5 prompts, A0 compliant
✅ grammar: 20 exercises
✅ vocab: 10 words
✅ word_power: 3 collocations
✅ logic: 5 puzzles with context
✅ explore: 90% unique words
✅ All URLs valid

🎉 Week 3 validation PASSED!
```

**If FAIL**:
```
❌ ask_ai: Prompt 2 context too long (11 words, max 10)
❌ explore: 4 duplicate words with read.js
❌ grammar: Only 18 exercises

Please fix and re-run validation.
```

### Check 2: ask_ai.js Specific
```bash
node tools/validate_ask_ai.js 3
```

**Expected**:
```
✅ Prompt 1: 8 words, A0 pattern "What is..."
✅ Prompt 2: 6 words, A0 pattern "Is..."
✅ Prompt 3: 9 words, A0 pattern "What..."
✅ Prompt 4: 7 words, A0 pattern "Can I..."
✅ Prompt 5: 8 words, A0 pattern "Do you..."

✅ All 5 prompts A0 compliant!
```

### Check 3: Easy Mode Vocabulary
```
Easy vocab.js = Advanced vocab.js (same 10 words)
Easy explore.js ≠ Advanced explore.js (different topic/context)
Easy read.js ≠ Advanced read.js (simpler, same 10 bold words)
```

### Check 4: URL Format
```
✅ image_url: /images/week3/word.jpg (lowercase, no spaces)
✅ audio_url: /audio/week3/vocab_word.mp3 (consistent naming)
❌ /images/week3/Word.jpg (capitalized)
❌ /images/week3/word .jpg (space)
```

---

## 📊 FILE CHECKLIST TEMPLATE

### Use this to track creation:

```markdown
## ADVANCED MODE (14 files)

- [ ] vocab.js (10 words + all fields)
- [ ] read.js (10-11 sentences, 10 bold words)
- [ ] explore.js (10-11 sentences, 10 different words, 90% unique)
- [ ] word_power.js (3 collocations)
- [ ] grammar.js (20 exercises: 11 MC, 5 Fill, 4 Unscramble)
- [ ] logic.js (5 puzzles with context)
- [ ] ask_ai.js (5 prompts, 8-10 words, A0 only) ✅ CRITICAL
- [ ] writing.js (prompt + model sentence, no image_url)
- [ ] dictation.js (copy from read.js)
- [ ] shadowing.js (copy from read.js)
- [ ] word_match.js (placeholder)
- [ ] mindmap.js (3 branches, A0 vocab)
- [ ] daily_watch.js (3-5 videos, English Singsing + Little Fox)
- [ ] video_queries.json (backup search keywords)

## EASY MODE (14 files)

- [ ] vocab.js (same 10 words, simpler defs)
- [ ] read.js (6-8 sentences, same 10 bold words)
- [ ] explore.js (6-8 sentences, different topic)
- [ ] word_power.js (same 3 collocations)
- [ ] grammar.js (20 exercises, easier)
- [ ] logic.js (5 puzzles, easier numbers)
- [ ] ask_ai.js (5 prompts, 5-6 words, A0) ✅ CRITICAL
- [ ] writing.js (easier prompt)
- [ ] dictation.js (copy from read.js)
- [ ] shadowing.js (copy from read.js)
- [ ] word_match.js (placeholder)
- [ ] mindmap.js (3 branches, simpler stems)
- [ ] daily_watch.js (3-5 videos)
- [ ] video_queries.json (backup keywords)

## INDEX FILES (MANUAL CREATION)

- [ ] index.js (Advanced) - MANUAL aggregator with voiceConfig ✅ CRITICAL
- [ ] index.js (Easy) - MANUAL aggregator with voiceConfig ✅ CRITICAL

## DATABASE & AI TUTOR

- [ ] syllabus_database.js (UPDATE entry for Week 3) ✅ CRITICAL
- [ ] week_03_real.js (V28 format: ack/recast/question) ✅ CRITICAL
```

---

## ⏱️ TIME ESTIMATE

| Task | Time | Notes |
|------|------|-------|
| vocab.js creation | 10 min | FIRST (blocks others) |
| read.js creation | 10 min | Uses vocab.js |
| explore.js creation | 15 min | Verify 90% uniqueness |
| word_power.js | 5 min | 3 collocations |
| grammar.js | 20 min | 20 exercises |
| logic.js | 15 min | 5 puzzles with context |
| ask_ai.js | 15 min | CRITICAL - A0 validation |
| writing.js + others | 10 min | Remaining content files |
| Easy mode duplication | 30 min | Adapt content for Easy |
| week_03_real.js (AI Tutor) | 20 min | V28 format, subject agreement |
| **TOTAL CONTENT** | **2 hours** | Content creator time |
| Validation | 5 min | Run tools |
| Sync + DB register | 5 min | Auto scripts |
| Audio generation | 5 min | batch_manager.js |
| Image generation | 5 min | nano_banana.js |
| Video fetch | 2 min | update_videos.js |
| **TOTAL ASSETS** | **22 min** | Automation |
| **GRAND TOTAL** | **~2.5 hours** | Full week production |

---

## 🔗 REFERENCE DOCUMENTS

| Document | Location | Purpose |
|----------|----------|---------|
| Comprehensive Plan | WEEK3_PRODUCTION_PLAN.md | Complete guide |
| V28 Changes | V28_CRITICAL_CHANGES_SUMMARY.md | AI Tutor updates |
| Master Prompt | ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt | Full spec |
| Syllabus | 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt | Week 3 details |
| Blueprint | 2. ENGQUEST APP MASTER BLUEPRINT-FINAL copy.txt | UI requirements |
| Mass Production | docs/MASS/0. MASS_PRODUCTION_CONTEXT.md | Overall process |
| Week 1 Example | src/data/weeks/week_01/ | Golden standard |

---

**Status**: ✅ READY FOR CONTENT CREATION  
**Next Step**: Review + Approve, then start with vocab.js

