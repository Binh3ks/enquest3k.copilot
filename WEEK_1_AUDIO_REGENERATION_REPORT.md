# Week 1 Audio Regeneration Report

**Generated:** 2025-12-28 Evening  
**Scope:** Errors 13-18 Audio Impact  
**Total Files:** 20 (Ask AI + Logic Lab, both modes)

---

## Executive Summary

Following content quality fixes (Errors 13-18), **20 audio files** require regeneration due to text changes in Logic Lab and Ask AI stations. All changes improve pedagogical alignment with A0+/A1 beginner level and audio-first learning principles.

### Key Changes

1. **Content Simplification** (Errors 13-14): Reduced complexity, added scaffolding
2. **Symbol Removal** (Error 17): Replaced visual patterns (⭐🌙) with text for audio practice
3. **Mode Differentiation** (Error 18): Created distinct content for Easy mode (not just shortened)
4. **Answer Completeness**: Fixed incomplete Easy mode answers

---

## Files Requiring Regeneration

### Ask AI Station (10 files)

#### Advanced Mode (5 files)
**Location:** `/public/audio/week1/`

| File | Prompt Context | Change Type | Before | After |
|------|---------------|-------------|---------|-------|
| `ask_ai_1.mp3` | School bus scene | Answer expansion | 2 variations | 3 variations ("How do children go...") |
| `ask_ai_2.mp3` | Classroom with ruler | Answer expansion | 2 variations | 4 variations ("What is it for?", "What does this do?") |
| `ask_ai_3.mp3` | Map pointing at school | Answer expansion | 2 variations | 3 variations ("Where can I find...") |
| `ask_ai_4.mp3` | Writing & reading choice | Answer expansion | 2 variations | 3 variations ("May I do both?") |
| `ask_ai_5.mp3` | Playground slide | Answer expansion | 2 variations | 3 variations ("May I play?") |

**Advanced Mode Text Changes:**

```javascript
// Prompt 1 - Before:
answer: [
  "How do they go to school?",
  "How do you go to school?"
]

// Prompt 1 - After:
answer: [
  "How do they go to school?",
  "How do children go to school?",
  "How do you go to school?"
]

// Prompt 2 - Before:
answer: [
  "What is this?",
  "What do you use this for?"
]

// Prompt 2 - After:
answer: [
  "What is this?",
  "What is it for?",
  "What does this do?",
  "What do you use this for?"
]

// Similar patterns for Prompts 3-5...
```

#### Easy Mode (5 files)
**Location:** `/public/audio/week1_easy/`

| File | Prompt Context | Change Type | Before | After |
|------|---------------|-------------|---------|-------|
| `ask_ai_1.mp3` | School bus scene | Fixed incomplete answer | "How do they go?" | "How do they go to school?" (complete) |
| `ask_ai_2.mp3` | Classroom with ruler | Maintained | 2 complete variations | 2 complete variations |
| `ask_ai_3.mp3` | Map pointing at school | Fixed incomplete answer | "Where?" removed | "Where is it?" (complete) |
| `ask_ai_4.mp3` | Writing & reading choice | Fixed incomplete answer | "Both?" removed | "Can I do both?" (complete) |
| `ask_ai_5.mp3` | Playground slide | Fixed incomplete answer | "Play?" removed | "Can I play?" (complete) |

**Easy Mode Text Changes:**

```javascript
// Prompt 1 - Before:
answer: [
  "How do they go?",
  "How?"
]

// Prompt 1 - After:
answer: [
  "How do they go to school?",  // ✅ Complete sentence (teaches structure)
  "How?"                         // ✅ Ultra-short (shows flexibility)
]

// Prompt 3 - Before:
answer: [
  "Where is it?",
  "Where?"
]

// Prompt 3 - After:
answer: [
  "Where is it?"  // ✅ Kept complete sentence only
]

// Similar patterns for Prompts 4-5...
```

### Logic Lab Station (10 files)

#### Advanced Mode (5 files)
**Location:** `/public/audio/week1/`

| File | Puzzle | Change Type | Before | After |
|------|--------|-------------|---------|-------|
| `logic_1.mp3` | Puzzle 1 | Content simplified | 25 words | 18 words (5 students → simpler) |
| `logic_2.mp3` | Puzzle 2 | **Symbol removal** | "⭐🌙⭐🌙⭐___" | "Teacher says: star, moon, star, moon, star" |
| `logic_3.mp3` | Puzzle 3 | Content simplified | 22 words | 16 words |
| `logic_4.mp3` | Puzzle 4 | Content simplified | 20 words | 14 words |
| `logic_5.mp3` | Puzzle 5 | Content simplified | 23 words | 17 words |

**Advanced Mode Text Changes:**

```javascript
// Puzzle 2 - Before (HAD SYMBOLS):
{
  id: 2,
  question_en: "Look: ⭐🌙⭐🌙⭐___. What is next?",
  audio_context_en: "Look at this pattern: star moon star moon star. What comes next?"
}

// Puzzle 2 - After (TEXT ONLY):
{
  id: 2,
  question_en: "Teacher says: star, moon, star, moon, star. What comes next?",
  audio_context_en: "Listen: Teacher says: star, moon, star, moon, star. What comes next?"
}
```

**Pedagogical Rationale:**
- **Before**: Symbols (⭐🌙) let students SEE pattern → visual recognition → no listening practice
- **After**: Text forces students to HEAR pattern via audio → auditory processing → speaking practice
- **Blueprint Alignment**: Zero L1 Input principle - no visual shortcuts

#### Easy Mode (5 files)
**Location:** `/public/audio/week1_easy/`

| File | Puzzle | Change Type | Before | After |
|------|--------|-------------|---------|-------|
| `logic_1.mp3` | Puzzle 1 | Numbers changed | 5 students × 2 = 10 | 3 students × 2 = 6 |
| `logic_2.mp3` | Puzzle 2 | **Different pattern** | "⭐🌙⭐🌙⭐___" | "apple, banana, apple, banana" |
| `logic_3.mp3` | Puzzle 3 | Content simplified | 20 words | 14 words |
| `logic_4.mp3` | Puzzle 4 | Content simplified | 18 words | 12 words |
| `logic_5.mp3` | Puzzle 5 | Numbers changed | 1+2+1=4 books | 1+1=2 books |

**Easy Mode Text Changes (Puzzle 2 Example):**

```javascript
// Puzzle 2 - Before (SAME AS ADVANCED):
{
  id: 2,
  question_en: "Look: ⭐🌙⭐🌙⭐___. What next?",
  audio_context_en: "Look at pattern: star moon star moon star. What next?"
}

// Puzzle 2 - After (DIFFERENT CONTENT):
{
  id: 2,
  question_en: "Teacher says: apple, banana, apple, banana. What is next?",
  audio_context_en: "Listen: Teacher says: apple, banana, apple, banana. What comes next?"
}
```

**Mode Differentiation:**
| Aspect | Advanced | Easy |
|--------|----------|------|
| Pattern items | Abstract (star, moon) | Concrete (apple, banana) |
| Pattern type | Celestial objects | Food items |
| Pedagogical purpose | Introduce abstract patterns | Build confidence with familiar objects |
| Cognitive load | Higher (abstract thinking) | Lower (concrete recognition) |

---

## Audio Generation Commands

### Step 1: Create Audio Tasks
```bash
cd /Users/binhnguyen/Downloads/engquest3k_new/Engquest3k
node tools/create_audio_tasks_only.js 1 1
```

**Expected Output:** `audio_tasks.json` with 20 tasks (10 Ask AI + 10 Logic Lab)

### Step 2: Generate Audio Files
```bash
python3 tools/generate_audio.py --provider openai --voice nova
```

**Voice Selection:**
- **Provider:** OpenAI TTS (higher quality than Edge TTS)
- **Voice:** Nova (female, clear articulation, kid-friendly)
- **Alternative voices:** Alloy (neutral), Echo (male)

**Expected Duration:** 5-10 minutes (20 files @ ~3s each + API calls)

### Step 3: Verification
```bash
# Check all 20 files exist
ls -lh public/audio/week1/ask_ai_*.mp3
ls -lh public/audio/week1/logic_*.mp3
ls -lh public/audio/week1_easy/ask_ai_*.mp3
ls -lh public/audio/week1_easy/logic_*.mp3

# Expected: 20 files total (each ~10-30 KB)
```

---

## Verification Checklist

### Audio Quality Checks

**Before deploying, verify:**

1. **File existence** (20 files)
   - [ ] 5 Advanced Ask AI files (`week1/ask_ai_1.mp3` through `ask_ai_5.mp3`)
   - [ ] 5 Easy Ask AI files (`week1_easy/ask_ai_1.mp3` through `ask_ai_5.mp3`)
   - [ ] 5 Advanced Logic Lab files (`week1/logic_1.mp3` through `logic_5.mp3`)
   - [ ] 5 Easy Logic Lab files (`week1_easy/logic_1.mp3` through `logic_5.mp3`)

2. **Audio content matches text**
   - [ ] Logic Lab Advanced Puzzle 2: Says "star, moon, star, moon, star" (NO symbols mentioned)
   - [ ] Logic Lab Easy Puzzle 2: Says "apple, banana, apple, banana" (DIFFERENT from Advanced)
   - [ ] Ask AI Easy Prompt 1: Says "How do they go to school?" (COMPLETE sentence)
   - [ ] Ask AI Advanced Prompt 2: Includes all 4 answer variations

3. **Audio quality**
   - [ ] No clipping/distortion
   - [ ] Natural pacing (not too fast)
   - [ ] Clear pronunciation
   - [ ] Appropriate volume level

4. **App functionality**
   - [ ] Audio plays when button clicked in Logic Lab
   - [ ] Audio plays when button clicked in Ask AI
   - [ ] SmartCheck hints still functional
   - [ ] Progress saves correctly after completion

---

## Technical Details

### Audio Task Schema (audio_tasks.json)

**Ask AI Task Example:**
```json
{
  "week": 1,
  "station": "ask_ai",
  "itemId": 1,
  "text": "Context: You see children going to school on a bus. You want to know HOW. How do you ask? Answer: How do they go to school? How do children go to school? How do you go to school?",
  "outputPath": "public/audio/week1/ask_ai_1.mp3",
  "notes": "Answer expansion - added 'How do children go to school?' variation"
}
```

**Logic Lab Task Example:**
```json
{
  "week": 1,
  "station": "logic",
  "itemId": 2,
  "text": "Listen: Teacher says: star, moon, star, moon, star. What comes next? Answer: moon",
  "outputPath": "public/audio/week1/logic_2.mp3",
  "notes": "Symbol removal - replaced ⭐🌙 with text 'star, moon'"
}
```

### Python Script Parameters

**generate_audio.py usage:**
```bash
python3 tools/generate_audio.py \
  --provider openai \
  --voice nova \
  --speed 1.0 \
  --input audio_tasks.json
```

**Parameters:**
- `--provider`: `openai` or `edge` (OpenAI recommended for quality)
- `--voice`: `nova`, `alloy`, `echo` (OpenAI voices)
- `--speed`: 1.0 (normal speed, range 0.5-2.0)
- `--input`: Path to audio_tasks.json (default: audio_tasks.json)

---

## Before/After Comparison

### Logic Lab Puzzle 2 Audio Content

**Advanced Mode:**

**Before (Had Symbols):**
```
Text: "Look: ⭐🌙⭐🌙⭐___. What is next?"
Audio: "Look at this pattern: star moon star moon star. What comes next?"
Issue: Text has symbols, student sees pattern visually → no listening practice
```

**After (Text Only):**
```
Text: "Teacher says: star, moon, star, moon, star. What comes next?"
Audio: "Listen: Teacher says: star, moon, star, moon, star. What comes next?"
Fix: Text matches audio, student MUST listen to understand pattern
```

**Easy Mode:**

**Before (Same as Advanced):**
```
Text: "Look: ⭐🌙⭐🌙⭐___. What next?"
Audio: "Look at pattern: star moon star moon star. What next?"
Issue: Same pattern as Advanced, just shorter question
```

**After (Different Pattern):**
```
Text: "Teacher says: apple, banana, apple, banana. What is next?"
Audio: "Listen: Teacher says: apple, banana, apple, banana. What comes next?"
Fix: DIFFERENT pattern items (concrete food vs abstract celestial)
```

### Ask AI Prompt 1 Audio Content

**Advanced Mode:**

**Before:**
```
Answer variations: 
- "How do they go to school?"
- "How do you go to school?"

Total: 2 variations
```

**After:**
```
Answer variations:
- "How do they go to school?"
- "How do children go to school?"
- "How do you go to school?"

Total: 3 variations (added middle structure)
```

**Easy Mode:**

**Before (Incomplete):**
```
Answer variations:
- "How do they go?"  ❌ Missing "to school"
- "How?"             ❌ Ultra-short, no teaching value

Issue: First answer incomplete (doesn't model correct structure)
```

**After (Complete First):**
```
Answer variations:
- "How do they go to school?"  ✅ Complete sentence (teaches structure)
- "How?"                        ✅ Ultra-short (shows flexibility)

Fix: First answer complete, teaches correct English formation
```

---

## Pedagogical Rationale

### Why Remove Symbols from Logic Lab?

**Blueprint Quote:**
> "Luyện mình tạo những câu hỏi đơn giản bằng cách Zero L1 Input (no Vietnamese, relying on gestures, miming, expressions, teacher intonation... before introducing English vocabulary)"

**Violation:** Symbols (⭐🌙) are VISUAL shortcuts that bypass audio-first learning

**Audio-First Learning Principle:**
1. Student HEARS pattern: "star, moon, star, moon, star"
2. Student PROCESSES auditorily (not visually)
3. Student SPEAKS answer: "moon"
4. Audio practice → speaking fluency

**With Symbols:**
1. Student SEES pattern: ⭐🌙⭐🌙⭐___
2. Student RECOGNIZES visually
3. Student SPEAKS answer: "moon"
4. **SKIPPED** audio practice → no listening skill development

### Why Differentiate Advanced vs Easy?

**Easy Mode Purpose:** Serve different students (not shortcuts for lazy students)

**Pedagogical Differences:**

| Aspect | Advanced | Easy |
|--------|----------|------|
| **Target Student** | Confident A1 learners | True A0+ beginners |
| **Cognitive Load** | Higher (abstract, varied) | Lower (concrete, consistent) |
| **Scaffolding** | Minimal (discover patterns) | Maximal (explicit guidance) |
| **Answer Variations** | 3-4 (structural variety) | 1-2 (complete + short) |
| **Context Type** | Abstract (star/moon) | Concrete (apple/banana) |
| **Learning Objective** | Same | Same |

**Critical Distinction:** Easy mode teaches SAME objective with DIFFERENT approach (not less content)

### Why Complete Sentences in Easy Mode?

**Pedagogical Principle:** First answer must MODEL correct structure

**Incorrect Approach (Before):**
```javascript
answer: ["How do they go?", "How?"]
// First answer missing "to school" → teaches incomplete English
```

**Correct Approach (After):**
```javascript
answer: ["How do they go to school?", "How?"]
// First answer complete (teaches structure)
// Second answer short (shows flexibility)
```

**Learning Sequence:**
1. Student sees complete sentence first → learns correct structure
2. Student sees shortened version second → understands it's a variation
3. Student practices both → develops flexibility without losing accuracy

---

## Impact on Other Weeks

### Master Prompt V23 Updated (Section 7.25)

**New Guidelines for ALL Future Weeks:**

1. **Symbol Prohibition**
   - NEVER use emoji/symbols in Logic Lab question text
   - ALWAYS write text that can be spoken: "star, moon" not "⭐🌙"
   - Reason: Forces audio-first learning

2. **Mode Differentiation Strategy**
   - Easy mode ≠ shortened Advanced mode
   - Use different content (not truncated content)
   - Advanced: Abstract → Easy: Concrete
   - Advanced: 3-4 variations → Easy: 1-2 variations

3. **Answer Completeness Rule**
   - First answer in Easy mode MUST be complete sentence
   - Additional shortened answers allowed (shows flexibility)
   - Never sacrifice correctness for brevity

4. **Validation Checklist (Pre-Publication)**
   - [ ] NO symbols in Logic Lab (grep for emoji)
   - [ ] Advanced/Easy content DIFFERENT (not just shorter)
   - [ ] Easy mode first answers COMPLETE (full sentences)
   - [ ] Audio text matches visual text (no discrepancy)
   - [ ] Mode serves different pedagogy (not difficulty shortcuts)

### Automated Check Recommendations

**Add to content_audit.js:**
```javascript
// Check 1: Symbol detection in Logic Lab
const hasSymbols = logicPuzzle.question_en.match(/[\u{1F300}-\u{1F9FF}]/u);
if (hasSymbols) {
  errors.push(`Logic Puzzle ${id}: Contains emoji symbols (use text instead)`);
}

// Check 2: Mode differentiation
if (advancedContent === easyContent.replace(/\?$/, '')) {
  warnings.push(`Puzzle ${id}: Easy mode is just shortened Advanced (needs different content)`);
}

// Check 3: Complete sentences in Easy mode
if (easyMode.answer[0].split(' ').length < 4) {
  errors.push(`Ask AI ${id} Easy: First answer too short (must be complete sentence)`);
}
```

---

## Status Summary

### Completed Actions

- ✅ Content edited (4 files: logic.js + ask_ai.js, both modes)
- ✅ Symbol removal (Logic Lab Puzzle 2, both modes)
- ✅ Mode differentiation (Easy now has different patterns)
- ✅ Answer completeness (Easy mode first answers complete)
- ✅ Documentation updated (Prompt V23 Section 7.25 + Simplification Report Addendum)
- ✅ Audio tasks ready for regeneration

### Pending Actions

- ⏳ Generate audio_tasks.json (run create_audio_tasks_only.js)
- ⏳ Regenerate 20 audio files (run generate_audio.py)
- ⏳ Verify audio playback in app (localhost:5174)
- ⏳ Final SmartCheck testing (ensure hints still work)

### Week 1 Status

**Before Audio Regeneration:**
- Content: ✅ Production-ready (18/18 errors fixed)
- Audio: ⏳ 226/246 files exist (92%), 20 pending regeneration
- Images: ✅ 30+ files exist (100%)
- Documentation: ✅ Complete (Prompt V23 Section 7.25 added)

**After Audio Regeneration:**
- Content: ✅ Production-ready
- Audio: ✅ 246/246 files (100%)
- Images: ✅ 30+ files (100%)
- Status: **READY FOR MASS PRODUCTION** 🚀

---

## Regeneration Commands (Quick Reference)

```bash
# Navigate to project
cd /Users/binhnguyen/Downloads/engquest3k_new/Engquest3k

# Generate audio tasks
node tools/create_audio_tasks_only.js 1 1

# Verify tasks created
cat audio_tasks.json | jq 'length'  # Should show 20

# Generate audio files
python3 tools/generate_audio.py --provider openai --voice nova

# Verify files exist
ls -1 public/audio/week1/ask_ai_*.mp3 public/audio/week1/logic_*.mp3 | wc -l       # Should be 10
ls -1 public/audio/week1_easy/ask_ai_*.mp3 public/audio/week1_easy/logic_*.mp3 | wc -l  # Should be 10

# Total check
find public/audio -name "*ask_ai_*.mp3" -o -name "*logic_*.mp3" | wc -l  # Should be 20 (if only Week 1)
```

---

**Report Generated:** 2025-12-28 Evening  
**Total Files:** 20 (10 Ask AI + 10 Logic Lab, both modes)  
**Audio Provider:** OpenAI TTS (Nova voice)  
**Estimated Time:** 10-15 minutes  
**Status:** Ready for regeneration ✅
