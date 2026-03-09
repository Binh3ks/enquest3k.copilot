# MASS PRODUCTION CHECKLIST - ENGQUEST WEEK GENERATION

## PRE-GENERATION CHECKLIST

### 1. Read Requirements
- [ ] Read Syllabus (1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) for week theme
- [ ] Identify Phase (1/2/3) and CEFR level (A0/A1/A2)
- [ ] Note grammar focus from syllabus
- [ ] List priority video channels (English Singsing, Little Fox, Vooks)

### 2. AI Provider Configuration (⚠️ CRITICAL - Jan 16, 2026)
- [ ] Together AI API key in .env (Layer 1 - PRIMARY, 60 req/min)
- [ ] Groq API key in .env (Layer 2 - BACKUP, 14 req/min)
- [ ] Gemini API key in .env (Layer 3 - FALLBACK, 60 req/min)
- [ ] Test all providers: `node tools/test_ai_providers.js`
- [ ] Verify aiRouter.js has response_format: { type: "json_object" }

### 3. Content Validation Rules
- [ ] All vocab words must be **bolded** in read.js (exact match)
- [ ] Ask AI: context ≤10 words, A0 questions only, with hint
- [ ] Logic Lab: MUST have full context (word problems), answer as array
- [ ] Explore: MUST have critical thinking question at end
- [ ] Dictation: MUST copy sentences from read.js (8-10 sentences)
- [ ] Shadowing: MUST copy full script from read.js with vi translation
- [ ] Mindmap: 6 center stems, 6 branches each
- [ ] Daily Watch: 2+ videos with videoId format, sim_duration, thumb URL
- [ ] Grammar: Include negative and question forms

### 4. Week 2 Family Mission Special Rules (⚠️ CRITICAL FIX)
- [ ] Mission 1: General family (brothers, sisters, parents)
- [ ] Mission 2: ALL questions say "mother OR father" (not just "mother")
- [ ] Mission 2: ALL hints include both "She" and "He" pronouns
- [ ] Mission 2: Greeting says "Tell me about your mother OR FATHER"
- [ ] Mission 3: Siblings (brothers/sisters)

---

## STATION-BY-STATION REQUIREMENTS

### 📖 Read.js
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

**CRITICAL**: 
- Must bold exactly 10 vocab words
- Each sentence should be 8-15 words for dictation/shadowing

---

### 🔍 Explore.js
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

**CRITICAL**: 
- MUST have `question` object at end (critical thinking)
- Content must have 10 different bolded words

---

### 🧠 Logic.js
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
  ]  // 5 puzzles
};
```

**CRITICAL**: 
- Use `puzzles` key (NOT `problems`)
- Answer MUST be array with multiple acceptable formats
- Question MUST have full context (like real word problems in textbooks)

---

### 💬 Ask_AI.js
```javascript
export default {
  prompts: [
    {
      id: NUMBER,
      context_en: "You see a bag. Ask what it is.",  // ⚠️ MAX 10 words
      context_vi: "string",
      audio_url: null,
      answer: ["What is this?", "What is it?"],  // ⚠️ A0 only
      hint: "What is..."  // ⚠️ 2 words max
    }
  ]  // 5 prompts
};
```

**CRITICAL**: 
- Context must be ≤10 words, simple present
- Answer must be A0 level only (What is/Where is/Is this/Can I/Do you)
- NO "question_en" field - use "context_en" to hide the answer

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
```javascript
export default {
  centerStems: [
    "This is my ___.",
    "My family ___.",
    "At home, we ___.",
    "My mother ___.",
    "My father ___.",
    "I love my family because ___."
  ],  // ⚠️ EXACTLY 6 stems
  branchLabels: {
    "This is my ___.": ["option1", "option2", "option3", "option4", "option5", "option6"],  // ⚠️ 6 branches
    "My family ___.": ["...", "...", "...", "...", "...", "..."],
    // ... 6 stems total, each with 6 branches
  }
};
```

**CRITICAL**: 
- Must have EXACTLY 6 center stems
- Each stem must have EXACTLY 6 branches

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
- [ ] All 29 files created (14 Advanced + 14 Easy + 1 AI Tutor)
- [ ] No console errors in browser
- [ ] All stations load and display content
- [ ] Audio/image/video URLs prepared (even if assets not yet generated)
- [ ] Week committed to git with proper message

**Status**: Week X - Content Complete ✅ | Assets Pending ⏳
