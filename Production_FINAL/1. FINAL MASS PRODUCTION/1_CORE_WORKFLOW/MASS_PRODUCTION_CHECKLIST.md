# MASS PRODUCTION CHECKLIST - ENGQUEST WEEK GENERATION
**Updated:** March 2026 | **Blueprint:** ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md

## PRE-GENERATION CHECKLIST

### 1. Read Requirements
- [ ] Read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) for week theme
- [ ] Read Blueprint V5.0 (ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md) for pedagogical framework
- [ ] **BƯỚC 0.7 — Lesson Plan Pipeline:**
  - **W01–53** (reference DOCX exists): `python3 pipeline/build_from_docx.py N` → auto-generates JSON + `W{N}_Lesson_Plan.docx`
  - **W54+** (mass production): `python3 pipeline/generate_ai_week.py N` → auto-generates JSON + `W{N}_Lesson_Plan.docx` in one step
  - Validate: `python3 pipeline/validate_lesson_plan.py N` (0 errors required; warnings OK)
  - DOCX output: `Production_FINAL/1. FINAL MASS PRODUCTION/2_REFERENCE_DOCS/lesson_plans/output/W{N}_Lesson_Plan.docx`
  - `LP_AVAILABLE` in TeacherPanel is **automatic** — no manual code edit needed (reads from `lessonPlans_index.json` at runtime)
  - **PART 3 scoring (MANDATORY — all weeks):** L1=10, L2=10, L3=10, L4=10, L5=5 items → `[ PART 3 TOTAL: ___ / 45 ]` at bottom of PART 3
  - **Session Total = 6+7+45+5+5+2+5+3 = 78 pts** (not 43 — fixed commit `9a4d4f6a`)
  - **PART 4 inference blank (MANDATORY):** Must have `→ ________________________________________` on line after C. Stage 3B — Inference question
  - **PART 4 dictation phase:** W1-9 = cloze+word bank; W10-26 = 1 full blank; W27-53 = 2 full blanks; all phases end with `[ Sub-total: ___ / 5 ]`
  - **Regenerate dictation/inference fix:** `python3 pipeline/fix_inference_dictation.py` (idempotent, safe to re-run all 53 weeks)
- [ ] Identify Phase (1/2/3) and CEFR level (A0/A1/A2)
- [ ] Note grammar focus from syllabus
- [ ] **W16+:** Check STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md for STEM contexts
- [ ] **W16+:** Check if Vietnamese week (see Vietnamese Calendar in QUICK_REF.md)
- [ ] **W35+:** Read W35_SUB_TAB_LAUNCH_GUIDE.md (sub-tab structure CRITICAL)
- [ ] **W40+:** Read W40_DEBATE_LAUNCH_GUIDE.md (debate mission CRITICAL)
- [ ] List priority video channels (English Singsing, Little Fox, Vooks)

### 2. AI Provider Configuration (⚠️ CRITICAL - Jan 16, 2026)
- [ ] Together AI API key in .env (Layer 1 - PRIMARY, 60 req/min)
- [ ] Groq API key in .env (Layer 2 - BACKUP, 14 req/min)
- [ ] Gemini API key in .env (Layer 3 - FALLBACK, 60 req/min)
- [ ] Test all providers: `node tools/test_ai_providers.js`
- [ ] Verify aiRouter.js has response_format: { type: "json_object" }

### 3. Content Validation Rules
- [ ] All vocab words must be **bolded** in read.js (exact match)
- [ ] Ask AI: W1-14 → nova_says + question_frame + hint; W15-28 → nova_says + question_word_bank(4/3) + question_frame + hint_word; W29-42 → nova_says + question_starters; W43+ → context_en + hint (legacy)
- [ ] Logic Lab: MUST have full context (word problems), answer as array
- [ ] Explore: MUST have critical thinking question at end
- [ ] Dictation: MUST copy sentences from read.js (8-10 sentences)
- [ ] Shadowing: MUST copy full script from read.js with vi translation
- [ ] Mindmap: 6 center stems, 6 branches each; ≥3 stems start with "I ___" or "My ___"; branch audio = hash(fullSentence) NOT hash(branchText)
- [ ] Daily Watch: 2+ videos with videoId format, sim_duration, thumb URL
- [ ] Grammar: Include negative and question forms
- [ ] **Lesson Plan PART 3:** L1/L2/L3/L4 = 10 items each, L5 = 5 items → `[ PART 3 TOTAL: ___ / 45 ]` (validate with `validate_lesson_plan.py`)
- [ ] **Lesson Plan PART 4:** C. Stage 3B inference MUST have `→ ____` blank on next line; dictation MUST end with `[ Sub-total: ___ / 5 ]`
- [ ] **`comprehension_questions` (read.js) — ĐÚNG 3 câu, KHÔNG phải 4:**
  - Answer PHẢI là câu hoàn chỉnh có **subject + verb** (không bắt buộc số từ cụ thể)
  - ❌ KHÔNG dùng fragment: `answer: ["Her dad."]` hay `answer: ["Blue and yellow."]`
  - ✅ ĐÚNG: `answer: ["Luna went to the forest with her dad."]`
  - ✅ ĐÚNG short: `answer: ["No, you are not tall."]` (5 từ, có subject+verb)
  - Nhiều đáp án đúng: `answer: ["ans1", "ans2"]` (engine duyệt tuần tự)
  - Grammar bị bắt lỗi thật: không viết hoa / thiếu dấu câu → `isCorrect: false`

### 4. Week 2 Family Mission Special Rules (⚠️ CRITICAL FIX)
- [ ] Mission 1: General family (brothers, sisters, parents)
- [ ] Mission 2: ALL questions say "mother OR father" (not just "mother")
- [ ] Mission 2: ALL hints include both "She" and "He" pronouns
- [ ] Mission 2: Greeting says "Tell me about your mother OR FATHER"
- [ ] Mission 3: Siblings (brothers/sisters)

---

## STATION-BY-STATION REQUIREMENTS

⚠️ **WEEK 35+ CHANGES**: Read & Explore expanded to 4 files, Logic Lab split into 3 files. See requirements below.

### 📖 Read.js (W1-34) | Read_STEM.js & Read_Social.js (W35+)

**W1-34 (Single File):**
```javascript
export default {
  title: "string",
  image_url: "/images/weekX/read_cover_wXX.jpg",
  content_en: "**vocab1** ... **vocab2** ... **vocab10**",  // Bold all vocab
  content_vi: "string",
  audio_url: null,
  comprehension_questions: [
    { id: 1, question_en: "string", answer: ["string"], hint_en: "string", hint_vi: "string" }
  ]  // 3 questions
};
```

**W35+ (Dual Files):**
```javascript
// read_stem.js - STEM story
export default {
  tab_id: "stem",
  tab_label: "STEM Story",
  title: "string (STEM topic)",
  content_en: "**STEM_vocab1** ... **STEM_vocab10**",  // 10 STEM terms
  // ... same structure as above
};

// read_social.js - Social Studies story
export default {
  tab_id: "social",
  tab_label: "Social Studies",
  title: "string (History/Geography/Culture topic)",
  content_en: "**social_vocab1** ... **social_vocab10**",  // 10 social terms
  // ... same structure as above
};
```

**CRITICAL**: 
- Must bold exactly 10 vocab words per story
- W35+: Each tab (STEM + Social) has independent 10 words (20 unique words total)
- Each sentence should be 8-15 words for dictation/shadowing

---

### 🔍 Explore.js (W1-34) | Explore_STEM.js & Explore_Social.js (W35+)

**W1-34 (Single File):**
```javascript
export default {
  title_en: "string",
  title_vi: "string",
  image_url: "/images/weekX/explore_cover_wXX.jpg",
  content_en: "string with **10 different bolded words**",
  content_vi: "string",
  check_questions: [
    { id: 1, question_en: "string", answer: ["string"], hint_en: "string", hint_vi: "string" }
  ],  // 3 questions
  question: {  // ⚠️ MANDATORY CRITICAL THINKING QUESTION
    text_en: "string",
    text_vi: "string",
    min_words: 30,  // Advanced: 30, Easy: 20
    hint_en: "string",
    hint_vi: "string"
  }
};
```

**W35+ (Dual Files):**
```javascript
// explore_stem.js
export default {
  tab_id: "stem",
  tab_label: "STEM Explore",
  // ... same structure, 10 different STEM words
};

// explore_social.js
export default {
  tab_id: "social",
  tab_label: "Social Studies Explore",
  // ... same structure, 10 different social words
};
```

**CRITICAL**: 
- MUST have `question` object at end (critical thinking)
- Content must have 10 different bolded words (separate from Read words)
- W35+: STEM explore = science/tech focus, Social explore = history/culture focus

---

### 🧠 Logic.js (W1-34: 15Q) | Logic.js (W35+: 3Q ONLY)

**W1-34 (15 Questions):**
```javascript
export default {
  puzzles: [  // NOT "problems"
    {
      id: NUMBER,
      type: "math" | "logic" | "pattern",
      title_en: "string",  // ⚠️ REQUIRED
      title_vi: "string",  // ⚠️ REQUIRED
      question_en: "Full context word problem",  // ⚠️ MUST be contextual
      question_vi: "string",
      answer: ["3", "3 people", "three"],  // ⚠️ MUST be array with units
      hint_en: "string",
      hint_vi: "string"
    }
  ]  // Phase 1: 5 puzzles, Phase 2: 7, Phase 3: 10
};
```

**W35+ (3 Questions - Logic & Science Tab):**
```javascript
export default {
  tab_id: "logic_science",
  tab_label: "Logic & Science",
  puzzles: [
    // ... same structure as above
  ]  // ONLY 3 puzzles (reduced from 15)
};
```

**CRITICAL**: 
- **W1-34:** 5/7/10 questions based on Phase
- **W35+:** ONLY 3 questions (other 12 moved to singapore_math.js and social_quiz.js)
- Use `puzzles` key (NOT `problems`)
- Answer MUST be array with multiple acceptable formats
- Question MUST have full context (like real word problems in textbooks)

---

### 🧮 Singapore_Math.js (W35+ ONLY - NEW STATION)

**W35+ (5 Questions):**
```javascript
export default {
  tab_id: "singapore_math",
  tab_label: "Singapore Math",
  problems: [
    {
      id: NUMBER,
      type: "bar_model" | "model_drawing" | "comparison" | "fraction_application" | "multi_step",
      title_en: "string",
      title_vi: "string",
      question_en: "Real-world word problem requiring 2-3 steps",
      question_vi: "string",
      visual_hint: "Description of bar model or diagram to draw",  // ⚠️ REQUIRED
      answer: ["48", "48 kg", "forty-eight kg"],
      hint_en: "string",
      hint_vi: "string",
      solution_steps: [  // ⚠️ REQUIRED
        "Step 1: Calculation explanation",
        "Step 2: Final answer explanation"
      ]
    }
  ]  // ALWAYS 5 problems
};
```

**CRITICAL**:
- visual_hint: Describe mental model (bar model, comparison model, part-whole model)
- solution_steps: Show HOW to solve (not just formula)
- Focus: Fractions, ratios, proportional thinking, multi-step problems
- Theme-aligned: Problems use week's vocabulary/context

---

### 🌍 Social_Quiz.js (W35+ ONLY - NEW STATION)

**W35+ (7 Questions):**
```javascript
export default {
  tab_id: "social_quiz",
  tab_label: "Social Quiz",
  questions: [
    {
      id: NUMBER,
      category: "history" | "geography" | "culture",
      title_en: "Question title",
      title_vi: "Tiêu đề câu hỏi",
      question_en: "Multiple choice question text",
      question_vi: "Câu hỏi tiếng Việt",
      options: [
        { id: "A", text_en: "Option A text", text_vi: "Lựa chọn A" },
        { id: "B", text_en: "Option B text", text_vi: "Lựa chọn B" },
        { id: "C", text_en: "Option C text", text_vi: "Lựa chọn C" },
        { id: "D", text_en: "Option D text", text_vi: "Lựa chọn D" }
      ],
      correct_answer: "A" | "B" | "C" | "D",
      explanation_en: "Why this answer is correct + educational context",
      explanation_vi: "Giải thích bằng tiếng Việt"
    }
  ]  // ALWAYS 7 questions
};
```

**CRITICAL**:
- Category distribution: 3 history + 2 geography + 2 culture (approx)
- ALL questions must have 4 options (A/B/C/D)
- explanation_en: Educational value (not just "This is correct")
- Theme-aligned: Questions relate to week's topic
- Factual accuracy: Verify dates, locations, statistics before production

---

### 🎭 AI Tutor Debate Mission (W40+ ONLY - Mission 3)

**W40+ Mission 3 Structure:**
```javascript
{
  id: 3,
  type: "debate",  // ⚠️ CHANGED from "story"
  title: "Debate Corner: [Yes/No Question]",
  
  debate_config: {
    topic: "Should [clear yes/no question]?",
    topic_vi: "Vietnamese translation",
    stance_options: [
      { id: "agree", label_en: "Yes, ...", label_vi: "...", ai_persona: "devil_advocate_disagree" },
      { id: "disagree", label_en: "No, ...", label_vi: "...", ai_persona: "devil_advocate_agree" }
    ],
    ai_role: "devil_advocate",  // ⚠️ REQUIRED
    sentence_frames: {
      opinion: [ "I think ___ because ___.", "..." ],  // 3+ frames
      reason: [ "One reason is ___.", "..." ],  // 3+ frames
      defense: [ "That's a good point, but ___.", "..." ]  // 3+ frames
    }
  },
  
  debate_context: {
    key_arguments_for: [ "Reason 1", "Reason 2", "Reason 3" ],
    key_arguments_against: [ "Reason 1", "Reason 2", "Reason 3" ],
    real_world_examples: [ "Example 1", "Example 2", "Example 3" ]
  },
  
  conversation_phases: [
    { phase: "topic_intro", ai_message: "...", expected_response: "student_chooses_stance" },
    { phase: "opinion_statement", ai_message: "...", expected_response: "student_gives_reason" },
    { phase: "counterargument", ai_message_template: "...", expected_response: "student_defends_stance" },
    { phase: "conclusion", ai_message: "...", expected_response: "none" }
  ]
}
```

**CRITICAL**:
- Topic MUST be yes/no question (not open-ended)
- Age-appropriate (10-12 year olds can form opinions)
- Balanced arguments (3+ reasons for each side)
- Devil's advocate: AI ALWAYS opposes student's stance
- Sentence frames: 9+ total (3 per category)

---

### 💬 Ask_AI.js

**Ask AI = Question Making ONLY. Topic Talk đã bị XÓA.**
Schema theo phase (xem chi tiết trong `SPEAKING_SCAFFOLD_FRAMEWORK.md`):

- **W1-14 (fill-blank):** `{ id, nova_says, nova_says_vi, task_en, task_vi, question_frame, answer[], hint, audio_url }`
- **W15-28 (choose+complete):** `{ id, nova_says, nova_says_vi, task_en, task_vi, question_word_bank[], question_frame, answer[], hint_word, audio_url }` — ADV: 4 options, EASY: 3 options
- **W29-42 (constrained free):** `{ id, nova_says, task_en, task_vi, question_starters[], answer[], audio_url }`
- **W43+ (full free):** `{ id, context_en, context_vi, answer[], hint, audio_url }`

**KHÔNG dùng `topic_talk_prompt` — field này đã bị xóa khỏi component.**

---

### ✍️ Dictation.js
```javascript
export default {
  sentences: [
    { id: 1, text: "Sentence from read.js", meaning: "Vietnamese translation" }
  ]  // 10 sentences (copy EXACTLY from read.js)
};
```

**CRITICAL**: 
- MUST split read.js content_en into sentences (by period)
- Copy FIRST 10 sentences EXACTLY as they appear
- Each sentence 5-15 words for proper dictation
- Use `meaning` field (NOT `audio_url`)
- Do NOT skip, rephrase, or summarize - EXACT COPY ONLY

**Example Process:**
```
Read content: "My family is like a team. I call them my family squad! My mother wakes up early."

Dictation sentences:
1. "My family is like a team."
2. "I call them my family squad!"  
3. "My mother wakes up early to make breakfast for us."
```

---

### 🎤 Shadowing.js
```javascript
export default {
  title: "Same as read.js title",
  audio_full: "/audio/weekX/shadowing_full_wX.mp3",
  script: [  // NOT "phrases"
    { id: 1, text: "Sentence from read.js", vi: "Translation", audio_url: "/audio/weekX/shadowing_1.mp3" }
  ]  // 15-17 sentences
};
```

**CRITICAL**: 
- MUST use `script` key (NOT `sentences` or `phrases`)
- MUST use `vi` field (NOT `meaning`)
- Copy ALL sentences from read.js in order
- Include `audio_full` field

---

### 🗺️ Mindmap.js

> **Updated May 2026** — Branch audio URL formula changed. See CRITICAL rules below.

```javascript
export default {
  centerStems: [
    {
      text: "I am ___.",
      audio: "/audio/weekN/mindmap_stem_abc123.mp3"  // hash(stemText)
    },
    {
      text: "My favourite ___ is ___.",
      audio: "/audio/weekN/mindmap_stem_def456.mp3"
    },
    {
      text: "At school, we ___.",
      audio: "/audio/weekN/mindmap_stem_ghi789.mp3"
    },
    // ... 6 stems total (≥3 MUST start with "I ___" or "My ___")
  ],
  branchLabels: {
    "I am ___.": [
      { text: "happy",   audio: "/audio/weekN/mindmap_branch_xyz001.mp3" },
      { text: "excited", audio: "/audio/weekN/mindmap_branch_xyz002.mp3" },
      // audio hash = hash(fullSentence) = hash("I am happy.")
      // ⚠️ NOT hash("happy") — that causes R2 collision
    ],
    // ... 6 branches per stem
  }
};
```

**CRITICAL**:
- Must have EXACTLY 6 center stems
- Each stem must have EXACTLY 6 branches
- **≥3 stems MUST start with `"I ___"` or `"My ___"`** (personal stems — MANDATORY for ALL weeks ADV + Easy)
- Personal stem examples: `"I am ___."`  `"My favourite ___ is ___."` `"I feel ___ when ___."` `"My ___ is very ___."` `"I like ___ because ___."` 
- Each branch MUST produce a grammatically correct English sentence when inserted into the stem — no bare infinitives, no double blanks left
- **BRANCH AUDIO URL = `hash(fullSentence)`**, NOT `hash(branchText)` — see formula below

#### 🔴 Branch Audio URL Formula (CRITICAL — Updated May 2026)

**Bug root cause:** Using `hash(branchText)` causes R2 path collisions. When the same word (e.g. "happy") appears as a branch under multiple stems, all stems fetch the SAME audio file — whichever stem's TTS was generated first. This causes the "pic...pic..." stutter bug.

**Correct formula:**
```javascript
// hashText() algorithm (same as voiceService.js):
function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + charCode;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// ✅ CORRECT — hash includes the full sentence context
const fullSentence = stemText.replace('___', branchText);
// e.g. "I am ___." + "happy" → "I am happy."
const audio = `/audio/${folder}/mindmap_branch_${hashText(fullSentence)}.mp3`;

// ❌ WRONG — hash collision when same branch word in multiple stems
const audio = `/audio/${folder}/mindmap_branch_${hashText(branchText)}.mp3`;
```

**Folder naming:**
- ADV mode: `week{N}` (e.g. `/audio/week8/`)
- Easy mode: `week{N}_easy` (e.g. `/audio/week8_easy/`)

#### 🔴 Stem TTS Text Cleaning

**In `src/services/voiceService.js` `cleanTextForTTS()`:**
- `___` in stem text → replaced with `,` (comma for natural pause), **NOT the word "blank"**
- Deepgram reads `"I am ___.` as `"I am, ."` → sounds natural: student fills the pause
- Fix is already live — do NOT revert this behaviour

#### 🔴 TTSCache Version Bump Protocol

**Whenever the mindmap audio URL scheme changes** (new hash formula, new filename pattern, etc.):
1. Bump `DB_VERSION` in `src/services/ttsCache.js` (currently `= 11`)
2. This triggers `onupgradeneeded` → deletes + recreates the IndexedDB store → wipes stale blobs
3. On next page load users get fresh Deepgram audio (no more wrong audio from old cache)
4. Commit with message: `bump TTSCache DB_VERSION to N — force stale audio purge`

```javascript
// src/services/ttsCache.js
const DB_VERSION = 11;  // ← Increment when URL scheme changes
```

#### Validation Commands
```bash
# Check ≥3 personal stems exist in both modes
node -e "
import('./src/data/weeks/week_N/mindmap.js').then(m => {
  const stems = m.default.centerStems.map(s => s.text || s);
  const personal = stems.filter(s => /^(I |My )/i.test(s));
  console.log('Personal stems:', personal.length, '≥3?', personal.length >= 3 ? '✅' : '❌');
  personal.forEach(s => console.log(' -', s));
});
"

# Check no double-blank stems (stem would require two fills, TTS fails)
node -e "
import('./src/data/weeks/week_N/mindmap.js').then(m => {
  const stems = m.default.centerStems.map(s => s.text || s);
  const dbl = stems.filter(s => (s.match(/___/g)||[]).length > 1);
  console.log('Double-blank stems:', dbl.length, dbl.length === 0 ? '✅' : '❌ FIX THESE:', dbl);
});
"

# Audit for branch audio collisions (same hash used by >1 stem)
node _audit_branch_collisions.mjs N
```

---

### 📺 Daily_Watch.js
```javascript
export default {
  videos: [
    { 
      id: 1, 
      title: "string", 
      videoId: "FVMz0LzrQ5E",  // ⚠️ Extract from YouTube URL
      duration: "2:30", 
      sim_duration: 150,  // ⚠️ Convert to seconds
      thumb: "https://img.youtube.com/vi/FVMz0LzrQ5E/mqdefault.jpg"  // ⚠️ Format correctly
    }
  ],
  bonus_games: [{title: "Game", url: "#", description: "Review"}]  // ⚠️ REQUIRED
};
```

**CRITICAL**: 
- Use `videoId` (NOT `url`)
- Include `sim_duration` in seconds
- Include `thumb` with proper YouTube thumbnail URL
- MUST have `bonus_games` array

---

## POST-GENERATION CHECKLIST

### Content Validation
- [ ] Run through browser: http://localhost:5173/week/X/read_explore
- [ ] Check browser console (F12) for errors
- [ ] Test each station by clicking icons
- [ ] Verify all content displays correctly

### Asset Preparation
- [ ] **Create image folders FIRST**: `mkdir -p public/images/weekXX public/images/weekXX_easy`
- [ ] Create week_XX_queries.json with all metadata
- [ ] List all audio queries (vocab, read, dictation, shadowing)
- [ ] List all image queries (vocab, covers, illustrations)
- [ ] List video search queries for Daily Watch
- [ ] Prepare TTS sentences for audio generation

### Asset Generation (in order)
1. [ ] Audio: `node tools/batch_manager.js X` OR `python3 tools/generate_audio_deepgram.py X --mode all --force`
2. [ ] Images: `node tools/generate_images_nano.js X`
3. [ ] Videos: Update daily_watch.js with found YouTube videos
4. [ ] Database: `node tools/update_db_smart.js X`

### ⚠️ TTS Best Practices (Deepgram Aura - Week 13 Lessons)

**CRITICAL: Separation of Concerns - Content vs Audio**

**Key principle**: Display text shows proper spelling for users. Audio generation preprocesses text for TTS engines.

**ROOT CAUSE DISCOVERED:**
- Voice model `aura-orion-en` (male, read/shadowing): handles apostrophes correctly
- Voice model `aura-luna-en` (female, dictation): truncates at apostrophe (reads "oh" instead of "o clock")
- Issue is **voice-specific**, not universal!

**SOLUTION IMPLEMENTED:**

1. **Content Files**: Use correct spelling `o'clock`
   - Users see proper English spelling
   - Maintain content quality and standards
   - Source files remain grammatically correct

2. **Audio Generation Script**: Preprocess text in `_task()` function
   ```python
   def _task(text: str, role: str, filename: str, station: str):
       # Preprocess text for TTS (affects audio only, not source content)
       text = text.replace("o'clock", "o clock")  # Fix for aura-luna-en voice
       ...
   ```
   - Centralized preprocessing before TTS API call
   - Affects audio generation only
   - No impact on displayed content

**OTHER TTS BEST PRACTICES:**

3. **Final Consonants Need Periods**
   - ❌ BAD: `word + " ..."` → "lunch ..." (loses /ch/ sound)
   - ✅ GOOD: `word + ". . . . ."` → "lunch. . . . ." (preserves /ch/)
   - **Rule**: Period SAT từ + spaced dots for trailing silence

4. **Pauses in Mindmap Stems** (Updated May 2026 — `voiceService.js` `cleanTextForTTS()`)
   - ❌ BAD: `"I ___ up"` (skip blank) → no pause
   - ❌ BAD: `"I blank up"` → TTS reads "blank" literally  ← **BUG that was fixed**
   - ❌ BAD: `"I ... up"` → TTS reads "uh uh uh" (glottal)
   - ✅ GOOD: `"I, up"` → comma creates natural pause
   - **Rule (live in code)**: `cleanTextForTTS()` in `voiceService.js` replaces `___` with `,` automatically — do NOT manually set `___` → `"blank"` anywhere
   - If you see TTS saying the word "blank" during mindmap playback → `cleanTextForTTS()` was overridden or bypassed

5. **Trailing Silence Prevention**
   - Always add spaced dots: `" . . . . . . "` (6 dots)
   - Prevents audio cutoff at end of file
   - Critical for final consonants: /t/, /k/, /ch/, /th/, /p/

**Content Creation Guidelines:**
```bash
# ✅ CORRECT: Write content with proper spelling
export default {
  sentences: [
    { id: 1, text: "I wake up at 7 o'clock." },  // Proper apostrophe
    { id: 2, text: "School starts at 8 o'clock." }
  ]
};

# ❌ WRONG: Don't modify content for TTS
# The audio script handles preprocessing automatically
```

**Verification:**
```bash
# Content should have proper spelling
grep "o'clock" src/data/weeks/week_X/*.js
# Should return matches (this is correct!)

# Audio generation script handles cleanup
grep "text.replace" tools/generate_audio_deepgram.py
# Should show: text = text.replace("o'clock", "o clock")
```

---

## AUDIO UPLOAD & CONTENT VALIDATION (⚠️ WEEK 12 LESSON)

### Pre-Upload Content Validation
**CRITICAL: Verify content alignment BEFORE generating audio!**

```bash
# 1. Check Mode Differentiation: Easy ≠ Advanced
# Advanced mode first sentence:
head -5 src/data/weeks/week_X/read.js | grep 'content_en:'

# Easy mode first sentence:
head -5 src/data/weeks_easy/week_X/read.js | grep 'content_en:'
# Should be DIFFERENT contexts (school vs personal, formal vs simple)!

# 2. Verify dictation matches read.js (Advanced)
# First sentence must be EXACT copy from read.js
grep '"text":' src/data/weeks/week_X/dictation.js | head -1
# Compare to read.js first sentence

# 3. Verify dictation matches read.js (Easy)
grep '"text":' src/data/weeks_easy/week_X/dictation.js | head -1
# Compare to Easy mode read.js first sentence

# 4. Verify shadowing matches read.js (both modes)
grep '"text":' src/data/weeks/week_X/shadowing.js | head -1
grep '"text":' src/data/weeks_easy/week_X/shadowing.js | head -1

# 5. Check vocabulary tiers
echo "=== Advanced Vocab (Tier 2/3) ==="
grep 'word: "' src/data/weeks/week_X/vocab.js | cut -d'"' -f2

echo "=== Easy Vocab (Tier 1) ==="
grep 'word: "' src/data/weeks_easy/week_X/vocab.js | cut -d'"' -f2
# Advanced should have abstract/academic words
# Easy should have concrete action verbs
```

### Audio File Count Validation
```bash
# After generating, verify counts
ls -1 public/audio/week{X}/*.mp3 | wc -l      # Should be ~180-200
ls -1 public/audio/week{X}_easy/*.mp3 | wc -l  # Should be ~130-150

# Check key files exist
ls public/audio/week{X}/dictation_1.mp3
ls public/audio/week{X}/shadowing_1.mp3
ls public/audio/week{X}/read_explore_main.mp3
ls public/audio/week{X}_easy/dictation_1.mp3
ls public/audio/week{X}_easy/shadowing_1.mp3
ls public/audio/week{X}_easy/read_explore_main.mp3
```

### R2 Upload (⚠️ CRITICAL: Use --remote flag!)

**Week 12 Lesson:** Wrangler defaults to LOCAL dev instance. Files uploaded locally do NOT appear on CDN!

```bash
cd public/audio

# Upload Advanced mode to REMOTE R2
find week{X} -name "*.mp3" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/audio/"$file" \
    --file="$file" \
    --content-type="audio/mpeg" \
    --remote
done

# Upload Easy mode to REMOTE R2
find week{X}_easy -name "*.mp3" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/audio/"$file" \
    --file="$file" \
    --content-type="audio/mpeg" \
    --remote
done
```

### CDN Verification (Sample Test)
```bash
# Test 5 files per mode on CDN
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{X}/dictation_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{X}/shadowing_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{X}/vocab_*.mp3" | head -1
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{X}_easy/dictation_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{X}_easy/shadowing_1.mp3"

# All should return: HTTP/1.1 200 OK
# If 404: Re-upload with --remote flag!
```

### Post-Upload Actions
- [ ] Update CDN_WEEKS in `src/services/voiceService.js` (add Week X to array)
- [ ] Force-commit audio files: `git add -f public/audio/week{X}/ public/audio/week{X}_easy/`
- [ ] Test in browser: Open Week X dictation, verify Deepgram audio plays (not browser TTS)

---

## COMMON ERRORS TO AVOID

### ❌ Audio & Content Errors (NEW - Week 12 Lessons)
- Copying Advanced mode content to Easy mode (first sentence MUST be different!)
- Using wrong vocabulary tiers (Easy = Tier 1 concrete actions, Advanced = Tier 2/3 abstract concepts)
- Uploading to local R2 instance (missing `--remote` flag → CDN 404)
- Not verifying dictation/shadowing sentence 1 matches read.js
- Factual content errors (e.g., "Tonight" vs "Today" - verify logic consistency)
- Not uploading ALL audio files (vocab, mindmap, ask_ai, etc.)

### ❌ Structure Errors
- Using `problems` instead of `puzzles` in logic.js
- Using `phrases` instead of `script` in shadowing.js
- Using `collocations` instead of `words` in word_power.js
- Missing `question` object in explore.js

### ❌ Format Errors
- Answer as string instead of array in logic.js
- Using `url` instead of `videoId` in daily_watch.js
- Missing `grammar_explanation` in grammar.js
- Using `branches` instead of `centerStems` in mindmap.js

### ❌ Content Errors
- Dictation not copying from read.js
- Shadowing not copying from read.js
- Ask_AI using question_en instead of context_en
- Logic without full context (just numbers)
- Vocab not bolded in read.js

### ❌ AI Provider Errors (⚠️ NEW - Jan 16, 2026)
- Together AI API key missing (will default to Groq, may hit rate limits)
- response_format not set (model may return plain text instead of JSON)
- Week 2 Mission 2 only asks about "mother" (should be "mother or father")
- Missing "He" pronoun in hints arrays

---

## AI TUTOR VALIDATION (CRITICAL)

### Speaking Scaffold Checklist (theo SPEAKING_SCAFFOLD_FRAMEWORK.md)

**Story Mission `mission_context` — kiểm tra phase đúng:**
- [ ] W1-14: Có "Say: A or B!" sau MỌI turn trong `mission_context` không?
- [ ] W1-14: Nova max 8 từ/câu trong instructions không?
- [ ] W15-28: Options giảm dần (không còn sau mọi turn)? Say: stems còn nhưng không bắt buộc?
- [ ] W1-30: `minimum_turns` trong 8-12 range (không flat 10 mọi tuần)?
- [ ] KHÔNG có "Say:" trong mission_context của W43+?

**Conversation Cards (`conversation_cards` in `week_NN_real.js`) — kiểm tra phase:**
- [ ] W1-14: Mỗi exchange có `fill_blank` + `accept_words:[]` không? (ai text chứa "Say: X")
- [ ] W15-42: Dùng `options: [...]` thay `fill_blank` (ai text vẫn chứa "Say: A or B")
- [ ] W43-78: Chỉ còn `accept_keywords`, không còn `fill_blank` hay `options`
- [ ] W79+: Free exchange — không cần options/fill_blank/accept
- [ ] Mỗi tuần có ≥3 conversation cards không?

**`freetalk_knowledge` in `week_NN_real.js` — BẮT BUỘC mọi tuần:**
- [ ] Có `freetalk_knowledge: { ... }` không? (W17, W18, W20-28 đã được backfill Apr 2026)
- [ ] Có `week_title`, `week_number`, `theme` không?
- [ ] Có `knowledge_base: [...]` ≥8 facts về vocab + grammar + context?
- [ ] Có `example_opening_questions: [...]` ≥5 câu hỏi mở đầu?
- [ ] Có `starter_prompts: [...]` (game/help/ask)?

**Free Talk `scaffoldingLevel`** — ⚠️ TỰ ĐỘNG tính trong code, KHÔNG cần set trong data:
- Code: `weekNumberRef.current <= 14 ? 1 : weekNumberRef.current <= 42 ? 2 : weekNumberRef.current <= 78 ? 3 : 4`
- W1-14 = Level 1 (heavy scaffold) | W15-42 = L2 | W43-78 = L3 | W79+ = L4
- Không cần làm gì trong data file — FreeTalkTab.jsx tự tính từ URL weekNumber.

**Free Talk initial mode gate** — ⚠️ TỰ ĐỘNG từ code:
- W1-7: `idleBlocked=true` → HS bắt đầu ở `selecting_conversation` (Cards trước, không free chat)
- W8+: `idleBlocked=false` → bắt đầu ở `idle` (free chat ngay từ đầu)
- Không cần set gì trong data file.

---

### Response Format Check
```javascript
// Every AI response MUST be in V27 format:
{
  "teacher_ack": "Great!",
  "teacher_recast": "Your mother cooks!",
  "teacher_question": "Does she cook breakfast?",
  "suggested_hints": ["Yes", "she", "cooks", "breakfast", "eggs"],
  "mission_status": "continue",
  "current_turn": 2,
  "total_turns": 15
}
```

### Week 2 Mission 2 Family Focus
**MUST Include Both Parents:**
- ✅ "What does your mother OR father do?"
- ✅ Hints: ["She", "He", "wakes", "cooks", "works"]
- ❌ NOT: "What does your mother do?" (missing father)
- ❌ NOT: ["She", "wakes", "cooks"] (missing "He")

### AI Provider Fallback Test
```bash
# Test each layer works independently:
# 1. Disable Groq & Gemini keys → Only Together AI active
# 2. Test Mission 2 → Should work with Together AI
# 3. Disable Together AI → Should fallback to Groq
# 4. Verify console logs show correct layer transitions
```

---

## WEEK 2 AS GOLDEN STANDARD

Week 2 has been fully corrected and validated (Jan 16, 2026). Use it as reference:
- `/src/data/weeks/week_02/` (Advanced mode)
- `/src/data/weeks_easy/week_02/` (Easy mode)
- `/src/data/weeks/week_02_queries.json` (Asset metadata)
- `/src/services/ai_tutor/aiRouter.js` (Together AI integration)
- `/src/services/ai_tutor/turnManager.js` (Mission 2 family fix)

---

## AUTOMATION INTEGRATION

### For AI Generation Scripts
Add these validation steps to `generate_week.js`:

```javascript
// Validation checks
function validateWeekContent(weekData) {
  const errors = [];
  
  // Check dictation matches read
  if (!dictationMatchesRead(weekData.dictation, weekData.read)) {
    errors.push("Dictation must copy sentences from read.js");
  }
  
  // Check shadowing matches read
  if (!shadowingMatchesRead(weekData.shadowing, weekData.read)) {
    errors.push("Shadowing must copy script from read.js");
  }
  
  // Check explore has critical thinking question
  if (!weekData.explore.question) {
    errors.push("Explore must have critical thinking question");
  }
  
  // Check logic has array answers
  weekData.logic.puzzles.forEach(puzzle => {
    if (!Array.isArray(puzzle.answer)) {
      errors.push(`Logic puzzle ${puzzle.id} answer must be array`);
    }
  });
  
  // Check mindmap structure
  if (weekData.mindmap.centerStems.length !== 6) {
    errors.push("Mindmap must have exactly 6 center stems");
  }
  
  return errors;
}
```

---

## FINAL VERIFICATION

Before marking week as COMPLETE:
- [ ] All 33 files created (16 Advanced + 16 Easy + 1 AI Tutor) — W16+
- [ ] No console errors in browser
- [ ] All stations load and display content
- [ ] Audio/image/video URLs prepared (even if assets not yet generated)
- [ ] Week committed to git with proper message

### ✍️ VideoChallenge Write & Speak — Mandatory Checks (April 2026 Overhaul)
- [ ] `writing.js` has `sentence_frames` array (W31+: min 8 items; W43+ = Phase 2 idea blocks)
- [ ] `sentence_frames[].template` uses `___` (triple underscore) — NOT `____`, NOT `[blank]`
- [ ] Frames cover ALL questions in `prompt_en` (count `?` = min frame count)
- [ ] `writing.js` has `topic_talk_prompt` field (W31+ mandatory)
- [ ] VideoChallenge Write tab: sentence frames render as inline fill-in-blank inputs ✅
- [ ] "Add to script" button disabled until all blanks filled ✅
- [ ] Clean text (no `___`) copies to textarea when button clicked ✅
- [ ] Nova AI feedback: natural English ≤40 words (not JSON garbage) ✅
- [ ] AI limit message after 3 checks/week: "Nova's checked your writing 3 times this week — great effort! 🌟" ✅

---

### 🎓 Cambridge YLE Station Checklist (W28+ MANDATORY — Updated May 2026)

> **Root cause of W28-31 bugs**: When a week's THEME changes during revision, grammar.js, ask_ai.js, games.js, and read.js bold words were NOT updated alongside vocab.js. This checklist prevents regression.

#### Theme Alignment — Check EVERY station matches current week's theme:
- [ ] **grammar.js exercises 1-16**: ALL use CURRENT week's story/theme context (NOT prior week's context)
  - W28: Tortoise and Hare race/boast/nap/steady/moral
  - W29: Magic carpet / farm / dolphins / occupations (pilot, doctor, farmer, teacher, nurse, driver)
  - W30: Picnic / Luna / basket / sandwich / lemonade / watermelon
  - W31: Market / stalls / cotton / stone / glass / wood / cinnamon
- [ ] **grammar.js rules**: Rule examples use current week's story context
- [ ] **grammar.js structure_table**: Example sentences use current week's vocabulary
- [ ] **ask_ai.js nova_says** (all 5 prompts): Nova tells story from CURRENT week's theme/character/event
- [ ] **games.js title**: `"Games: [Current Week Story Title] — [Grammar Focus]"` (NOT prior week)
- [ ] **games.js sorting/matching items**: Use CURRENT week's theme words (NOT prior week)
- [ ] **read.js bold words**: EXACTLY match current `vocab.js` word list (run check: see below)
- [ ] **word_match.js**: Words/pairs from CURRENT week's vocabulary (NOT prior week's theme)
- [ ] **writing.js sentence_frames**: Templates reference CURRENT week's theme and vocabulary

#### Cambridge Format Seeds — by week (W28-31):
| Week | Cambridge Format | Requirement |
|------|-----------------|-------------|
| W28 | Reading Part 1 seed | Definition cards "It is a [noun] that/who…" (transport + story words) |
| W29 | Reading Part 1 intro | 5 definition cards for occupations + transport vocabulary |
| W30 | **Writing Part 7 FIRST FULL practice** | 3 pictures → 2-3 sentences each; past tense + sequence words + 3+ irregular verbs + 1 adverb; self-check checklist |
| W31 | Listening Part 1 intro + Speaking Part 2 seed | Colour/draw/write on market scene; "What is your [bag] made of?" |

#### Spiral Review — grammar.js must embed:
| Week | Must Include | Source |
|------|-------------|--------|
| W29 | Adverbs of manner (quickly, carefully, happily) seeded in ex 17-20 | New W29 content |
| W30 | Movement verbs W29 review + adverbs W29 spiral | W29 |
| W31 | Movement verbs W29 + consumption verbs W30 + adverbs W29-31 spiral | W29-30 |

#### Dual-Mode Theme Alignment (Easy ≠ copy of ADV, but SAME theme context):
- [ ] Easy mode `ask_ai.js`: Same theme as ADV but simpler vocabulary/schema
  - W15-28: Use `question_word_bank` (3 options for Easy, 4 for ADV)
  - W29-42: Use `question_starters` schema (same as ADV)
- [ ] Easy mode `grammar.js`: Same theme context as ADV, but simpler exercises
- [ ] Easy mode `games.js` title: Matches ADV title (same theme)
- [ ] Easy mode `word_match.js`: Current week's vocab (NOT prior week's theme)
- [ ] Easy mode `writing.js sentence_frames`: Current week's theme (NOT prior week's)

#### Quick theme verification commands (run after every station creation):
```bash
WEEK=31  # change as needed
THEME_WORD="market"  # current week's key theme word

# Check grammar theme alignment
grep -ic "$THEME_WORD" src/data/weeks/week_$WEEK/grammar.js
grep -ic "$THEME_WORD" src/data/weeks_easy/week_$WEEK/grammar.js
# FAIL if result < 3 (should appear in multiple exercises)

# Check ask_ai theme alignment
grep -ic "$THEME_WORD" src/data/weeks/week_$WEEK/ask_ai.js
grep -ic "$THEME_WORD" src/data/weeks_easy/week_$WEEK/ask_ai.js
# FAIL if result < 2

# Check games title
node --input-type=module -e "import * as g from './src/data/weeks/week_$WEEK/games.js'; console.log('ADV:', Object.values(g)[0].title)"
node --input-type=module -e "import * as g from './src/data/weeks_easy/week_$WEEK/games.js'; console.log('EASY:', Object.values(g)[0].title)"
# FAIL if title doesn't mention current theme

# Check word_match not using prior theme
grep -c "forest\|airport\|mountain" src/data/weeks_easy/week_$WEEK/word_match.js
# FAIL if result > 0 (prior week themes polluting current week)
```

**Status**: Week X - Content Complete ✅ | Assets Pending ⏳
