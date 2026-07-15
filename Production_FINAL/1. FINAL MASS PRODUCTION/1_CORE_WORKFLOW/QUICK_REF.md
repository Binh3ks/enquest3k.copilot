# ⚡ ENGQUEST3K — PRODUCTION QUICK REFERENCE

> **Đọc file này TRƯỚC khi bắt đầu production.** Chi tiết đầy đủ trong `1. WEEK_PRODUCTION_PROMPT_V3.md`.

---

## 📊 **VALIDATION TABLE (NEW!)**

⚠️ **CRITICAL**: **ALWAYS** validate against this table BEFORE and AFTER creating any week content!

**Reference File**: `VALIDATION_TABLE_ALL_STATIONS.md` (root folder)

**Purpose**: Permanent quality gate for all 16 stations + AI Tutor
- Sentence count rules (dictation/shadowing = 100% extraction from read.js)
- Vocabulary levels (Tier 1/2 vs 2/3, Easy vs Advanced)
- Count requirements by Phase (vocab: 10, word_power: 3/5/7, logic: 5/7/10, etc.)
- Audio file count formulas (fixed vs dynamic)
- ALL Blueprint rules for each station
- Golden Standard references

**Validation Commands**: Run these AFTER generating content:
```bash
# Count dictation sentences (MUST equal read.js sentence count)
grep -c '"text":' src/data/weeks/week_N/dictation.js

# Count shadowing sentences (MUST equal read.js sentence count)
grep -c '"text":' src/data/weeks/week_N/shadowing.js | head -1

# Count vocab (MUST be 10)
grep -c 'word:' src/data/weeks/week_N/vocab.js

# Count word_power (Phase 1: 3, Phase 2: 5, Phase 3: 7)
grep -c 'word:' src/data/weeks/week_N/word_power.js

# Count grammar (MUST be 20)
grep -c 'id:' src/data/weeks/week_N/grammar.js

# Count logic (Phase 1: 5, Phase 2: 7, Phase 3: 10)
grep -c 'id:' src/data/weeks/week_N/logic.js

# Count bold words (MUST be 10)
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_N/read.js | wc -l
```

**Latest Validation Report**: `WEEK_12_VALIDATION_REPORT.md` (Week 12: 100% PASS ✅)

---

## � LESSON PLAN SCORING STANDARDS (TeacherPanel — Updated May 2026)

> All fixes committed in `9a4d4f6a` (scoring) and `b4f425e8` (inference/dictation), applied to W1-53.

### PART 3 — Item Counts (MANDATORY ALL WEEKS)

| Level | Items | Sub-total line |
|-------|-------|----------------|
| L1    | 10    | `[ Sub-total: ___ / 10 ]` |
| L2    | 10    | `[ Sub-total: ___ / 10 ]` |
| L3    | 10    | `[ Sub-total: ___ / 10 ]` |
| L4    | 10    | `[ Sub-total: ___ / 10 ]` |
| L5    | 5     | `[ Sub-total: ___ / 5 ]`  |
| **TOTAL** | **45** | `[ PART 3 TOTAL: ___ / 45 ]` |

### Session Total Breakdown (CORRECT = 78 pts)

```
PART 1:  6 pts
PART 2:  7 pts
PART 3: 45 pts  (6+7+45+5+5+2+5+3)
PART 4:  5 pts
PART 5:  5 pts
PART 6:  2 pts
PART 7:  5 pts
PART 8:  3 pts
TOTAL:  78 pts
```

> ⚠️ Old broken value was **43 pts** — TeacherPanel `getPartScore()` was misreading PART 3 Sub-totals.
> Fix: `getPartScore()` now checks for `PART 3 TOTAL` line before reading per-level Sub-totals.

### PART 4 — Dictation Phase Table

| Weeks   | Format |
|---------|--------|
| W1–9    | Cloze: `1. I am a ___ student.` + `[ Word bank: happy / sad / tired ]` + `[ Sub-total: ___ / 5 ]` |
| W10–26  | Full blank: `1. ________________________________________________________________` + `[ Sub-total: ___ / 5 ]` |
| W27–53  | Two blanks: `1. ___...` + `2. ___...` + `[ Sub-total: ___ / 5 ]` |

**PART 4 inference blank — MANDATORY (all weeks):**
```
C. Stage 3B — Inference: [question text]
   → ________________________________________
```
The `→ ____` line must appear immediately after every Stage 3B inference question.

### Rebuild / Validate Commands
```bash
# Rebuild DOCX for a specific week (W01-53)
python3 pipeline/build_from_docx.py N

# Regenerate inference blank + dictation scaffolding (all 53 weeks, idempotent)
python3 pipeline/fix_inference_dictation.py

# Regenerate DOCX only (JSON already correct)
python3 pipeline/gen_lp_docx.py N
python3 pipeline/gen_lp_docx.py 1-53   # batch

# Validate JSON schema
python3 pipeline/validate_lesson_plan.py N
python3 pipeline/validate_lesson_plan.py --all
```

---

## 🔗 PROGRESS SAVE ARCHITECTURE (App — Updated Jan 2026)

> 3 progress-save bugs fixed in commit `9458dbda`. Key facts for future debugging:

| Component | Purpose |
|-----------|---------|
| `weekProgress` (React useState) | Local state for current session — keyed by **tabKey** (e.g. `new_words`) |
| `progressCache` (Zustand `useUserStore`) | Sidebar star display — also keyed by tabKey |
| `STATION_ID_TO_TAB` (`stationConfig.js`) | Reverse map: server stationId → tabKey (critical for loading from DB) |
| `progressAPI.saveProgress()` | Saves to PostgreSQL using **stationId** (e.g. `vocab_mastery`) |

**Bug 1 (key mismatch):** Server stored `vocab_mastery`, React read as `new_words` → all stations showed 0% after reload.  
**Fix:** `STATION_ID_TO_TAB` reverse map in `stationConfig.js` normalizes server keys to tabKeys on load.

**Bug 2 (Zustand not updated):** `handleReportProgress` never called `updateLocalProgress` → sidebar stars stuck at 0 during session.  
**Fix:** `updateLocalProgress(weekId, stationId, {...})` called after every save.

**Bug 3 (cold start):** `initializeAppData` never hydrated `progressCache` → sidebar always showed 0 on mount.  
**Fix:** Iterates fetched progress and calls `updateLocalProgress` for each station on init.

---

## 🧠 SMART CHECK ENGINE — ACADEMIC MODE (Updated May 2026)

> File: `src/utils/smartCheck.js` | Commits: `88da5a06`, `43123738`

### Chức năng `analyzeAnswer(input, targets, mode)`

| Mode | Dùng ở đâu | Quy tắc |
|------|-----------|---------|
| `academic` | ReadingExplore (`comprehension_questions`) | Full sentence, content words must be present |
| `strict` | Translation station | Capital + punct + grammar |
| `critical` | Ask AI / critical thinking | Structure check (≥3 words, capital, punct) |
| `speech` | Speech recognition | Content words Lev≤1, minor STT noise OK |
| `math` / `logic` | Logic Lab | Exact + unit validation |

### Quy tắc `academic` mode — MANDATORY khi viết `comprehension_questions`

**Cơ chế chấm điểm (theo thứ tự):**

1. **Chỉ 1 từ (không có subject+verb)** → `isCorrect: false`  
   Thông báo: `"Cần viết câu hoàn chỉnh có chủ ngữ và động từ (e.g., 'I am not tall.')."`  
   Kèm theo nếu thiếu: `"(và viết hoa chữ đầu, thêm dấu câu cuối)"`

2. **Thiếu từ khóa quan trọng** (content words ≥4 ký tự, Lev≤1) → `isCorrect: false`  
   Thông báo: `"Câu thiếu từ quan trọng: "word1", "word2". Thử lại nhé!"`

3. **Đúng nội dung nhưng thiếu grammar** (viết hoa / dấu cuối) → `isCorrect: false`  
   Thông báo: `"Đúng nội dung nhưng: Viết hoa chữ đầu & Thiếu dấu câu cuối (.)"`  
   ⚠️ Grammar bị bắt lỗi thật — input bị đánh dấu sai, không cho qua

4. **Đúng hoàn toàn** → `isCorrect: true`, `"Chính xác tuyệt đối!"`

5. **Chính tả lỗi nhẹ** (Lev ≤15% target) → `isCorrect: false`, `"Sai chính tả: \"...\""`

6. **Gần đúng** (50%+ từ khớp) → `isCorrect: false`, `"Gần đúng. Kiểm tra lại..."`

**Quy tắc độ dài câu:**
- Không bắt buộc số từ cụ thể — chỉ cần có **subject + verb** (≥ 2 từ)
- "I am." ✅, "She runs." ✅, "No, I am not tall." ✅
- "warm" ❌, "no" ❌, "Her dad." → bị reject do thiếu content words

### Quy tắc viết `comprehension_questions` trong `read.js`

```javascript
comprehension_questions: [
  {
    id: 1,
    question_en: "Who did Luna go to the forest with?",
    // ⚠️ Answer phải là câu ĐẦY ĐỦ (subject + verb + object)
    // ❌ KHÔNG ĐƯỢC: answer: ["Her dad."]   ← quá ngắn (2 từ)
    // ✅ ĐÚNG:
    answer: ["Luna went to the forest with her dad."],
    hint_en: "Think about who walked with Luna.",
    hint_vi: "Nghĩ về người đi cùng Luna."
  },
  // Tổng: ĐÚNG 3 câu hỏi (KHÔNG phải 4)
  // Câu hỏi 1: Who/What is the main character doing?
  // Câu hỏi 2: What did they see/find/use?
  // Câu hỏi 3: How did something feel/look/happen?
]
```

**⚠️ CRITICAL — Answer string rules:**
- Answer phải ≥ `max(4, ceil(answer_word_count × 0.55))` từ để engine chấp nhận
- Phải có chủ ngữ + động từ (full sentence, NOT fragments như "Her dad." hay "Blue and yellow.")
- Target answer nên dài 6–12 từ
- Nếu target ngắn (e.g. "The bird was blue."), học sinh cần ít nhất 4 từ

### ReadingExplore — Pre-fill từ localStorage

> File: `src/modules/read/ReadingExplore.jsx`

**Behavior (sau fix May 2026):**
- `qInputs` (text đã nhập) được restore từ `savedData` như cũ
- `qFeedback` đánh dấu "correct" chỉ được restore nếu `saved input ≥ 3 từ`
  → Tránh trường hợp sai từ session cũ bị pre-fill + disabled input

**Nếu thấy input bị pre-fill sai sau update:** Clear localStorage của browser (DevTools → Application → Local Storage → xóa key `station-progress-*`)

--- (W16-54, Phase 1)

⚠️ **CRITICAL**: Starting Week 16, 70% content includes Vietnamese cultural integration (11 VN weeks / 38 total weeks = ~30%)

### Vietnamese Theme Weeks (Phase 1: W16-54)
**70/30 Ratio Reference:** ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md Section I

| Week | Theme | Vietnamese Content Type |
|------|-------|------------------------|
| W16+ | (See syllabus) | Social Studies contexts seeding begins |
| W19  | Hometown & Identity | **VIETNAMESE WEEK** - Hometown stories |
| W22  | Vietnamese Heritage | **VIETNAMESE WEEK** - Traditional culture |
| W25  | Tet Festival | **VIETNAMESE WEEK** - Festivals & celebrations |
| W28  | Vietnamese Food | **VIETNAMESE WEEK** - Culinary culture |
| W31  | Geography of Vietnam | **VIETNAMESE WEEK** - Regions & landmarks |
| W34  | Vietnamese Heroes | **VIETNAMESE WEEK** - Historical figures |
| W37  | Traditional Games | **VIETNAMESE WEEK** - Cultural activities |
| W40  | Vietnamese Innovation | **VIETNAMESE WEEK** - Modern Vietnam |
| W43  | Vietnamese Nature | **VIETNAMESE WEEK** - National parks, wildlife |
| W46  | Vietnamese Crafts | **VIETNAMESE WEEK** - Art & handicrafts |
| W49  | Vietnamese Music | **VIETNAMESE WEEK** - Traditional instruments |

**Content Creation Guidelines for Vietnamese Weeks:**
- Read & Explore: Vietnamese contexts (localities, festivals, heroes)
- Vocabulary: Mix English + explanation of Vietnamese concepts (e.g., "áo dài = traditional dress")
- AI Tutor: Missions set in Vietnam (Hoi An Ancient Town, Mekong Delta, Ha Long Bay)
- Logic Lab: Word problems using Vietnamese context (e.g., "Lan buys bánh mì...")
- Writing: Personal reflections on Vietnamese culture

**Non-Vietnamese Weeks (Universal Themes):**
- W16-18, W20-21, W23-24, W26-27, W29-30, W32-33, W35-36, W38-39, W41-42, W44-45, W47-48, W50-54
- Focus: International contexts (STEM, global stories, universal experiences)

**Validation Command:**
```bash
# Check if Week N is Vietnamese week (grep calendar above)
# If yes, verify Vietnamese content in read.js
grep -i 'vietnam\|vietnamese\|hà nội\|hồ chí minh' src/data/weeks/week_N/read.js
```

---

## 🚀 WEEK 35+ SUB-TAB STRUCTURE (CRITICAL CHANGES)

⚠️ **STARTING WEEK 35**: Big Bang deployment changes file structure!  
**Reference Guide:** `W35_SUB_TAB_LAUNCH_GUIDE.md` (MANDATORY READ FOR W35+)

### File Count Changes (W35+)

**BEFORE W35 (W1-34):**
```
Read & Explore: 2 files (read.js, explore.js)
Logic Lab: 1 file (logic.js with 15 questions)
```

**AFTER W35 (W35+):**
```
Read & Explore: 4 files
  ├─ read_stem.js       (STEM story)
  ├─ read_social.js     (Social Studies story)
  ├─ explore_stem.js    (STEM explore)
  └─ explore_social.js  (Social Studies explore)

Logic Lab: 3 files (15 questions total)
  ├─ logic.js            (3 questions - Logic & Science)
  ├─ singapore_math.js   (5 questions - Bar models, fractions)
  └─ social_quiz.js      (7 questions - History, Geography, Culture)
```

### Quick Production Checklist (W35+)

**File Creation:**
- [ ] Create read_stem.js (STEM context, 10 bolded STEM terms)
- [ ] Create read_social.js (Social Studies context, 10 bolded social terms)
- [ ] Create explore_stem.js (STEM exploration with critical thinking)
- [ ] Create explore_social.js (Social Studies exploration)
- [ ] Create logic.js (3 questions ONLY - reduced from 15)
- [ ] Create singapore_math.js (5 questions with visual_hint and solution_steps)
- [ ] Create social_quiz.js (7 multiple choice questions, 4 options each)

**Validation Commands (W35+):**
```bash
# File count check
ls src/data/weeks/week_N/read_*.js | wc -l        # Should be 2
ls src/data/weeks/week_N/explore_*.js | wc -l     # Should be 2
ls src/data/weeks/week_N/*math.js *quiz.js | wc -l # Should be 2

# Question count check (TOTAL must be 15)
grep -c '"id":' src/data/weeks/week_N/logic.js            # = 3
grep -c '"id":' src/data/weeks/week_N/singapore_math.js   # = 5
grep -c '"id":' src/data/weeks/week_N/social_quiz.js      # = 7
# 3 + 5 + 7 = 15 ✅
```

**UI Import Changes (index.js):**
```javascript
// OLD (W1-34) - 3 exports:
export default { read, explore, logic, ...other12 };

// NEW (W35+) - 7 exports:
export default {
  read_stem, read_social,
  explore_stem, explore_social,
  logic_science: logic,
  singapore_math, social_quiz,
  ...other12
};
```

---

## 🎭 WEEK 40+ DEBATE CORNER (AI TUTOR MISSION 3)

⚠️ **STARTING WEEK 40**: AI Tutor Mission 3 becomes Debate  
**Reference Guide:** `W40_DEBATE_LAUNCH_GUIDE.md` (MANDATORY READ FOR W40+)

### Mission Structure Change (W40+)

**BEFORE W40 (W1-39):**
```javascript
missions: [
  { type: "story", ... },  // Mission 1
  { type: "story", ... },  // Mission 2
  { type: "story", ... }   // Mission 3
]
```

**AFTER W40 (W40+):**
```javascript
missions: [
  { type: "story", ... },   // Mission 1 (unchanged)
  { type: "story", ... },   // Mission 2 (unchanged)
  { type: "debate", ... }   // Mission 3 (NEW - Debate Corner)
]
```

### Debate Mission Requirements

**Core Fields:**
- `type`: Must be "debate" (NOT "story")
- `debate_config`: Topic, stance_options, ai_role, sentence_frames
- `debate_context`: key_arguments_for, key_arguments_against, real_world_examples
- `conversation_phases`: 4 phases (intro, opinion, challenge, conclusion)

**Topic Selection Rules:**
- ✅ Age-appropriate (10-12 year olds can form opinions)
- ✅ Balanced (both sides have 3+ valid arguments)
- ✅ School/life relevant (phones, uniforms, homework, sports)
- ❌ Controversial politics, religion, or sensitive social issues

**Validation Commands (W40+):**
```bash
# Check debate mission exists
grep '"type": "debate"' src/data/weeks/week_N/week_N_real.js

# Check debate topic is set
grep 'topic:' src/data/weeks/week_N/week_N_real.js | head -1

# Count sentence frames (should be 9+ total across 3 categories)
grep -c 'sentence_frames' src/data/weeks/week_N/week_N_real.js

# Verify AI role is devil's advocate
grep 'ai_role.*devil_advocate' src/data/weeks/week_N/week_N_real.js
```

**AI Persona (Devil's Advocate):**
- ALWAYS takes OPPOSITE stance from student
- Student says "Yes" → AI argues "No"
- Student says "No" → AI argues "Yes"
- Tone: Polite but challenging ("But have you considered...?")

---

## 🏆 GOLDEN STANDARDS

| Phần | Clone từ | Lý do |
|------|----------|-------|
| **AI Tutor** (`week_N_real.js`) | `week_07_real.js` | Tuần gần nhất, V5.0 format, ít bug nhất |
| **14 Station files** (advanced) | `weeks/week_06/*.js` | `word_match.js` + `ask_ai.js` đúng format nhất |
| **14 Station files** (easy) | `weeks_easy/week_06/*.js` | Tương tự advanced |

> ⚠️ **KHÔNG dùng Week 5 cho Stations** — `word_match.js` deprecated format, `ask_ai.js` có dead field `answer_audio_url`
> ⚠️ **KHÔNG dùng Week 2 cho AI Tutor** — Weeks 2-7 đều cùng V5.0 format (~720 lines); Week 7 preferred

---

## 🎯 PRE-PRODUCTION CHECKLIST (ĐỌC TRƯỚC KHI BẮT ĐẦU)

**Trước khi tạo Week N, ĐẢM BẢO:**

### ✅ **1. Verify Syllabus & Blueprint Alignment**
- **Files to read:**
  - `Production_FINAL/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` (Official curriculum)
  - `ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` (⚠️ UPDATED MAR 2026 - Pedagogical framework)
  - `STEM_INTEGRATION_STRATEGY_W16_ONWARDS.md` (W16+ only - STEM integration guide)
- **Check from Syllabus:** Theme, grammar focus, vocabulary scope cho Week N
- **Check from Blueprint V5.0:** Learning objectives, production-oriented activities, scaffolding patterns
- **SPECIAL CHECKS (W16, W35, W40):**
  - **W16+:** Vietnamese content week? (See Vietnamese Calendar below)
  - **W35+:** Sub-tab structure (Read & Explore dual tabs, Logic Lab triple tabs)
  - **W40+:** Debate mission (AI Tutor Mission 3 = debate type)
- **Validate:** Week N content ≠ Week N±1 (no overlap, no skip)

### ✅ **2. Clone Golden Templates**
- **AI Tutor:** `week_07_real.js` (V5.0 format, 720 lines, battle-tested)
- **Advanced Stations:** `weeks/week_06/*.js` (14 files, correct schema)
- **Easy Stations:** `weeks_easy/week_06/*.js` (14 files, dual-mode)
- **Critical:** Use folder separation (`weeks/` + `weeks_easy/`) — NOT single file with mode switch

### ✅ **3. Follow V5.3 Structure Requirements**
- **CRITICAL RULE:** First line of every `mission_context`
- **Turn limits:** All missions = `minimum_turns: 10, maximum_turns: 12`
- **mission_context:** Single continuous string (no newlines)
- **story_arc:** Array format with 3-4 phases per mission
- **Conversation Card Mode:** Pre-computed questions in `phase_questions`

### ✅ **3.5. Mode Differentiation (⚠️ WEEK 12 LESSON)**

**CRITICAL: Easy Mode ≠ Advanced Mode Content**

**Week 12 Issue:**
- Easy mode `dictation.js`/`shadowing.js` started with "Today is the school talent show!" (WRONG)
- Should start with "I have many talents!" (matches Easy mode `read.js`)
- Error: Copied Advanced mode content instead of generating independently

**Correct Approach:**

#### Vocabulary Tiers:
```javascript
// Advanced Mode (Tier 2/3):
// - Abstract concepts: talent, ability, skill, confidence
// - Academic verbs: demonstrate, showcase, achieve, improve
// - Process words: practice, perform, develop

// Easy Mode (Tier 1):
// - Concrete actions: sing, dance, run, jump, swim
// - Basic activities: draw, play, cook, climb, ride
// - Simple verbs: eat, sleep, read, write, help
```

#### Story Structure:
```javascript
// Advanced Mode:
// - School/community contexts: "Today is the school talent show!"
// - Formal narratives about events
// - Multiple characters in structured setting

// Easy Mode:
// - Personal/family contexts: "I have many talents!"
// - First-person narratives about self
// - Simple "I can..." statements
```

#### Validation Checklist:
```bash
# Before generating audio, ALWAYS verify:

# 1. Check first sentences are DIFFERENT between modes
head -1 src/data/weeks/week_N/read.js        # Advanced
head -1 src/data/weeks_easy/week_N/read.js   # Easy
# Should NOT be the same!

# 2. Verify dictation matches read.js (per mode)
diff <(head -1 src/data/weeks/week_N/read.js) \
     <(grep '"text":' src/data/weeks/week_N/dictation.js | head -1)
# Output should be: (no difference)

# 3. Check vocabulary tiers
grep 'word: "' src/data/weeks/week_N/vocab.js | cut -d'"' -f2
# Should see: Tier 2/3 words (abstract, academic)

grep 'word: "' src/data/weeks_easy/week_N/vocab.js | cut -d'"' -f2
# Should see: Tier 1 words (concrete, daily actions)
```

**Prevention:**
- ❌ NEVER copy Advanced mode content to Easy mode
- ✅ Generate Easy mode INDEPENDENTLY from scratch
- ✅ Use Easy mode vocabulary (Tier 1: concrete actions)
- ✅ Use Easy mode context (personal stories, NOT school events)
- ✅ Verify first sentence of dictation/shadowing matches read.js

### ✅ **4. Validate 43-Point Checklist Before Saving**
- **Structure (30 points):** Metadata, 10 vocab objects, 3 missions, story_arc
- **Content (12 points):** Grammar patterns, scaffolding, FORBIDDEN lists
- **Game Integration (10 points):** Word Chain, 20 Questions, Sentence Builder
- **20Q Objects:** ONLY physical items (NO emotions/actions/adjectives)
- **Reference:** Master Prompt Rule 2 (line 543)

### ✅ **5. Generate & Upload Audio to R2**

**⚠️ WEEK 12 LESSON: Always use `--remote` flag to upload to Cloudflare R2, NOT local instance!**

#### 5A. Generate Audio Locally
```bash
python3 tools/generate_audio_deepgram.py N --mode all --force
```
- **Engine:** Deepgram Aura-2 (primary) → fallback to Google Neural2
- **⚠️ CRITICAL NAMING:** Always use zero-padded week numbers (week09, week10), NOT week9
  - Script auto-generates: `week{N:02d}` → ensures `week09/`, `week10/` folders
  - R2 path format: `audio/week09/*.mp3`, `images/week09/*.jpg`

#### 5B. Verify Local Files
```bash
# Count advanced mode files (~180-200)
ls -1 public/audio/week{N}/*.mp3 | wc -l

# Count easy mode files (~130-150)
ls -1 public/audio/week{N}_easy/*.mp3 | wc -l

# ⚠️ CRITICAL: Check first sentence matches read.js
# Advanced mode:
grep -A1 'content_en:' src/data/weeks/week_N/read.js | head -1
grep '"text":' src/data/weeks/week_N/dictation.js | head -1
# Both should show SAME first sentence

# Easy mode:
grep -A1 'content_en:' src/data/weeks_easy/week_N/read.js | head -1
grep '"text":' src/data/weeks_easy/week_N/dictation.js | head -1
# Both should show SAME first sentence (DIFFERENT from Advanced!)
```

#### 5C. Upload to REMOTE R2 (⚠️ CRITICAL: Use --remote flag!)
```bash
cd public/audio

# Upload Advanced mode (ALL files)
find week{N} -name "*.mp3" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/audio/"$file" \
    --file="$file" \
    --content-type="audio/mpeg" \
    --remote
done

# Upload Easy mode (ALL files)
find week{N}_easy -name "*.mp3" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/audio/"$file" \
    --file="$file" \
    --content-type="audio/mpeg" \
    --remote
done
```

**⚠️ WHY --remote IS CRITICAL:**
- Without `--remote`: Files go to **local dev instance** (wrangler dev)
- With `--remote`: Files go to **Cloudflare R2 CDN** (production)
- Week 12 Issue: Uploaded locally → CDN returned 404 → Users got browser TTS

#### 5D. Verify CDN Access (Sample 5 files per mode)
```bash
# Test Advanced mode
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{N}/dictation_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{N}/shadowing_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{N}/vocab_*.mp3" | head -1

# Test Easy mode
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{N}_easy/dictation_1.mp3"
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week{N}_easy/shadowing_1.mp3"

# All should return: HTTP/1.1 200 OK
# If 404: Re-upload with --remote flag!
```

#### 5E. Post-Upload Actions
- **⚠️ CRITICAL: Update CDN_WEEKS immediately after upload!**
  - **File:** `src/services/voiceService.js` (line 96)
  - **Action:** Add Week N to `CDN_WEEKS = [1, 2, 3, ..., N]`
  - **Why:** Without this, app will fallback to browser TTS despite files existing
- **⚠️ CRITICAL: Force-commit audio files to git!**
  - **Command:** `git add -f public/audio/week{N}/ public/audio/week{N}_easy/`
  - **Why:** `public/audio/` is gitignored → must use `-f` flag to deploy
  - **Verify:** `git status | grep audio/week{N}` should show ~320 files staged

### ✅ **6. Generate & Upload Images to R2**
- **Generate Prompts:** `node tools/generate_images_nano.js N`
- **Output:** Creates 4 files in `public/images/Prompts/`
  - `week_N_image_prompts.txt` (Advanced vocab + word power)
  - `week_N_easy_image_prompts.txt` (Easy vocab + word power)
- **Manual Workflow:**
  1. Copy prompts → Paste vào Nano Banana
  2. Download generated images (Nano Banana format: `N_N_*.png`)
  3. Run auto-rename: `python3 tools/auto_rename.py N`
  4. **Upload to R2 CDN:** `python3 tools/upload_week_images_r2.py N`
     - Creates folders: `week{N:02d}/` + `week{N:02d}_easy/` on R2
     - Sets cache headers and content-type
- **⚠️ CRITICAL NAMING CONVENTION:**
  - Local folders: `public/images/week09/`, `public/images/week09_easy/`
  - R2 paths: `images/week09/*.jpg`, `images/week09_easy/*.jpg`
  - vocab.js paths: `image_url: "/images/week09/city.jpg"` (match R2!)
- **⚠️ Do NOT skip upload step before deployment!**

### ✅ **7. Find Daily Watch Videos (PURPOSE-BASED)**
**⚠️ CRITICAL:** Videos must follow PURPOSE-based channel filtering from Blueprint whitelist!

**7A. Verify Blueprint Data Exists:**
```bash
# Check if Week N has Blueprint data in generate_video_queries.js
grep -A 5 "  N:" tools/generate_video_queries.js
```
- **If NOT found:** Add Week N to `BLUEPRINT_WEEKS` object with:
  - `theme`: Week theme from Syllabus
  - `grammar`: Grammar focus (e.g., "Adjectives before nouns")
  - `keywords`: Math/Science keywords
  - `video_hint`: Vocabulary song suggestion
  - `read_topic`: Main reading passage topic

**7B. Generate Video Queries:**
```bash
node tools/generate_video_queries.js N
```
- **Creates:** `src/data/weeks/week_N/v/generic videos in Daily Watch station)**
- **Use template notation in video queries (e.g., "[adjective] [noun]" won't match YouTube)**
- **Deploy videos with ⚠️ fallback warnings (optimize queries first)**ies with PURPOSE fields)
- **5 Slots with Specific Purposes:**
  1. **GRAMMAR** (Slot 1): English Singsing + grammar keywords → Priority whitelist
  2. **GRAMMAR** (Slot 2): English Singsing + vocabulary → Secondary grammar-related
  3. **STORY** (Slot 3): Little Fox/Vooks + theme story → Narrative from priority channels
  4. **VOCABULARY** (Slot 4): Little Fox + video_hint → Topic vocabulary songs
  5. **SCIENCE** (Slot 5): SciShow Kids/Numberblocks + keywords → Educational content

**7C. Fetch Videos from YouTube API:**
```bash
node tools/update_videos.js N --reset
```
- **Updates:** `src/data/weeks/week_N/daily_watch.js` + `weeks_easy` auto-sync
- **Filtering Logic (in order):**
  - ✅ Priority 1: PURPOSE-specific whitelist channels (e.g., English Singsing for GRAMMAR)
  - ✅ 10-STEP WORKFLOW

```
STEP 1  → Tạo thư mục
STEP 2  → Clone + modify AI Tutor (week_07_real.js → week_N_real.js)
STEP 2.5→ Update metadata.js (sidebar title)
STEP 3  → Viết 14 advanced station files (clone schema từ week_06)
STEP 4  → Viết 14 easy station files (clone schema từ weeks_easy/week_06)
STEP 5  → Update UI Registrations (StoryMissionTab, FreeTalkTab, dynamicRoleplays)
STEP 6  → Generate Audio (Deepgram)
STEP 7  → Generate Image Prompts → tạo ảnh thủ công → rename
STEP 8  → Find Daily Watch Videos (Blueprint-driven, PURPOSE-based)
STEP 9  → Test & Validate
STEP 10

**7E. Manual Query Optimization (if needed):**
- **If fallback videos appear:** Edit `video_queries.json` to improve search terms
  - ❌ BAD: "It is a [adjective] [noun]" (template notation, too specific)
  - ✅ GOOD: "adjectives song kids" (realistic YouTube keywords)
  - ❌ BAD: "city sounds sights city explorer story" (too many keywords)
  - ✅ GOOD: "city adventure story Little Fox" (focused + channel name)
- **Re-run after editing:** `node tools/update_videos.js N --reset`

**Blueprint Whitelist Channels (Priority by PURPOSE):**
- **GRAMMAR:** English Singsing (⭐), British Council, Maple Leaf Learning, Dream English Kids
- **STORY:** Little Fox (⭐), Vooks (⭐), Storyline Online, Oxford Owl
- **SCIENCE:** SciShow Kids (⭐), National Geographic Kids, Peekaboo Kidz
- **MATH:** Numberblocks (⭐), Math Antics, Jack Hartmann
- **DEFAULT:** Super Simple Songs, Peppa Pig, CocomelonDaily Watch Videos → 8. Test → 9. Deploy
```

**❌ NEVER:**
- Skip reading syllabus AND blueprint (causes misaligned content)
- Generate AI Tutor from scratch (always clone Week 7)
- Mix content from multiple weeks (causes grammar/vocab conflicts)
- Skip validation checklist (causes production bugs)
- Deploy without testing audio (R2 CDN must work)
- **Skip im+Blueprint → 2. Clone → 3. Content → 4. Validate → 5. Audio → 6. Images → 7. Videos → 8. Test → 9. Deploy
```

**❌ NEVER:**
- Skip reading syllabus AND blueprint (causes misaligned content)
- Generate AI Tutor from scratch (always clone Week 7)
- Mix content from multiple weeks (causes grammar/vocab conflicts)
- Skip validation checklist (causes production bugs)
- **Forget UI imports (StoryMissionTab.jsx, FreeTalkTab.jsx) → Week N displays Week 5 missions!**
- **Use inconsistent folder naming (week9 vs week09) → Image/audio 404 errors!**
- Deploy without testing audio (R2 CDN must work)
- Skip image upload to R2 (images won't load in production)
- Deploy with fallback videos (causes low-quality Daily Watch content)
- Use template notation in video queries ("[adjective] [noun]" won't match YouTube)
- **Skip video generation or deploy with fallback videos (causes low-quality Daily Watch
- Skip validation checklist (causes production bugs)
- Deploy without testing audio (R2 CDN must work)
- **Skip image prompt generation (causes missing images in production)**

---

## 🎨 IMAGE PROMPT QUALITY IMPROVEMENTS (Week 11+)

**Issue Found (Week 9/10):** Cover images showed generic scenes (magnifying glass, treasure map) NOT matching week themes.

**Root Cause:** `generate_images_nano.js` used generic fallback prompts for covers.

**Solution (HYBRID APPROACH):**

### ✅ **Updated Image Script (March 5, 2026)**
- **File:** `tools/generate_images_nano.js`
- **Enhancement:** Added week-specific cover prompt maps
- **Coverage:** Weeks 6, 7, 9-13, 15 (with SYLLABUS-aligned themes)
- **Format:**
  ```javascript
  const readThemes = {
    '09': `3D illustration of two diverse children reading a book with 
           pop-up city skyline, tall buildings and cars emerging from pages, 
           urban adventure theme, Pixar style...`,
    '11': `3D illustration of two happy children reading a book with 
           pop-up playground and park scenes, weekend fun theme...`
  };
  ```

### ⚠️ **Action Required (When Creating New Weeks):**
1. **Before running `generate_images_nano.js`:** Add Week N themes to script
2. **Reference:** `1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` (find Week N theme)
3. **Update 2 maps in script:**
   - `readThemes` → Reading passage cover (what story is about)
   - `exploreThemes` → Exploration cover (discovery/learning scene)
4. **Example for Week 16:**
   ```javascript
   '16': `3D illustration of two children reading a book about [THEME], 
          [KEY VISUAL ELEMENTS], Pixar style, vibrant colors...`
   ```

### ✅ **Week 9/10 Status:**
- **Decision:** Keep current covers (already on R2, works functionally)
- **Reason:** Re-generation = 60 images + re-upload → time cost > benefit
- **Future:** Week 11+ will have theme-matched covers automatically

---

## 🧠 LOGIC QUESTION GUIDELINES (AVOID AMBIGUITY)

**Issue Found (Week 10 Q3):** "Which two are similar: farm/countryside vs quiet/peaceful?" → Both pairs valid!

**Root Cause:** Comparison questions with near-synonyms or multiple valid interpretations.

**Solution (DOCUMENTED):**

### ✅ **Guidelines Document Created**
- **File:** `Production_FINAL/LOGIC_QUESTION_GUIDELINES.md` (full ruleset)
- **Required Reading:** Before writing logic.js for any week

### 🚨 **Critical Rules (Summary):**

1. **AVOID AMBIGUOUS COMPARISONS**
   - ❌ BAD: "Which two are similar?" with near-synonyms (quiet/peaceful, happy/joyful)
   - ✅ GOOD: "Which two have MORE than 5 trees?" (numerical criteria)

2. **USE CLEAR DISTINCTIONS**
   - ✅ Opposites: big vs. small, hot vs. cold, fast vs. slow
   - ❌ Near-synonyms: quiet vs. peaceful, busy vs. crowded

3. **MATH LOGIC SHOULD BE 80%+**
   - ✅ Safe: Addition, subtraction, multiplication word problems
   - ⚠️ Risky: Pattern recognition, synonym matching, inference

4. **ONE CORRECT ANSWER ONLY**
   - **Test:** Can you explain why other answers are wrong?
   - **If not:** Revise the question

### 📋 **Recommended Question Mix (7 Questions/Week):**
- Addition: 2 questions
- Subtraction: 2 questions
- Multiplication/pattern: 1 question
- Comparison (with numbers): 1 question
- Advanced pattern: 1 question
- **Limit:** Max 1 subjective question per week

### ✅ **Week 10 Q3 Status:**
- **Decision:** Keep current question (functional, students can learn from feedback)
- **Reason:** Fixing requires audio re-generation → HYBRID approach = document first
- **Future:** Week 11+ will follow guidelines (no ambiguous comparisons)

### 📖 **Full Guidelines:** `Production_FINAL/LOGIC_QUESTION_GUIDELINES.md` (20+ examples, templates, red flags)

---

## 📋 10-STEP PRODUCTION WORKFLOW

```
STEP 1  → Read Syllabus + Blueprint (alignment check)
STEP 2  → Tạo thư mục src/data/weeks/week_N & weeks_easy/week_N
STEP 3  → Clone + modify AI Tutor (week_07_real.js → week_N_real.js)
STEP 4  → Viết 14 advanced station files (clone từ week_06)
STEP 5  → Viết 14 easy station files (clone từ weeks_easy/week_06)
STEP 6  → ⚠️ UPDATE UI IMPORTS (CRITICAL!)
STEP 7  → Generate Audio + Update CDN_WEEKS + Force-Commit to Git
STEP 8  → Generate Image Prompts → Nano Banana → Rename → Upload R2
STEP 9  → Generate & Validate Daily Watch Videos
STEP 10 → Test & Deploy (git push → Cloudflare)
```

### ⚠️ STEP 6 DETAIL — UPDATE UI COMPONENT IMPORTS

**CRITICAL:** Week N will NOT display in AI Tutor tabs without these imports!

**⚠️ FALLBACK POLICY:**
- Fallback `week7RealData` is ONLY a safeguard to prevent crashes
- **NEVER deploy Week N without adding proper import + ternary case**
- Every new week MUST have its own import and case - NO EXCEPTIONS

**6A. Update StoryMissionTab.jsx:**
```javascript
// File: src/modules/ai_tutor/tabs/StoryMissionTab.jsx
// Step 1: Add import at top (around line 27):
import week13RealData from '../../../data/weeks/week_13_real'; // Week 13 syllabus

// Step 2: Add to ternary chain (around line 102):
const weekRealData = weekNumber === 1 ? week1RealData
  : weekNumber === 2 ? week2RealData
  : weekNumber === 3 ? week3RealData
  : weekNumber === 4 ? week4RealData
  : weekNumber === 5 ? week5RealData
  : weekNumber === 6 ? week6RealData
  : weekNumber === 7 ? week7RealData
  : weekNumber === 8 ? week8RealData
  : weekNumber === 9 ? week9RealData
  : weekNumber === 10 ? week10RealData
  : weekNumber === 11 ? week11RealData
  : weekNumber === 12 ? week12RealData
  : weekNumber === 13 ? week13RealData  // ← ADD THIS LINE
  : week7RealData;  // fallback (should NEVER be used in production)
```

**6B. Update FreeTalkTab.jsx:**
```javascript
// File: src/modules/ai_tutor/tabs/FreeTalkTab.jsx
// Step 1: Add import at top (around line 26):
import week13RealData from '../../../data/weeks/week_13_real'; // Week 13 syllabus

// Step 2: Add to ternary chain (around line 95) - SAME pattern as StoryMissionTab
const weekRealData = weekNumber === 1 ? week1RealData
  // ... all weeks 2-12
  : weekNumber === 13 ? week13RealData  // ← ADD THIS LINE
  : week7RealData;  // fallback (should NEVER be used in production)
```

**6C. Update gameAdaptation.js:**
```javascript
// File: src/config/gameAdaptation.js

// Step 1: Add imports at top (around line 30):
import week13GamesAdvanced from '../data/weeks/week_13/games.js';
import week13GamesEasy from '../data/weeks_easy/week_13/games.js';
import week13RealData from '../data/weeks/week_13_real.js';

// Step 2: Add to REAL_WEEK_DATA object (around line 100):
const REAL_WEEK_DATA = {
  1: week1RealData,
  // ... weeks 2-12
  13: week13RealData  // ← ADD THIS LINE
};

// Step 3: Add to weekGamesMap in getGameData() function (around line 130):
const weekGamesMap = {
  1: { advanced: week1GamesAdvanced, easy: week1GamesEasy },
  // ... weeks 2-12
  13: { advanced: week13GamesAdvanced, easy: week13GamesEasy }  // ← ADD THIS LINE
};
```

**6D. Verify ALL 3 files updated:**
```bash
# Check StoryMissionTab
grep -n "week13RealData" src/modules/ai_tutor/tabs/StoryMissionTab.jsx
# Expected: 2 matches (import + ternary)

# Check FreeTalkTab
grep -n "week13RealData" src/modules/ai_tutor/tabs/FreeTalkTab.jsx
# Expected: 2 matches (import + ternary)

# Check gameAdaptation
grep -c "week13" src/config/gameAdaptation.js
# Expected: 6 matches (3 imports + 2 object additions + 1 comment)
```

**⚠️ DEPLOYMENT CHECK:**
```bash
# Test Week 13 in browser BEFORE deploying:
npm run dev
# Navigate to /week/13/ai_tutor
# Verify: Shows Week 13 missions (NOT Week 7)
# Verify: Game Hub shows Week 13 games (NOT Week 1)
```

**⚠️ Common Bugs:**
- Forgetting gameAdaptation.js → Game Hub fails to deploy (Cloudflare build error)
- Missing import → Shows fallback content (Week 7 missions)
- Typo in weekNumber check → Week N never matches, always fallback

---

### ⚠️ STEP 2.5 DETAIL — UPDATE METADATA.JS (SIDEBAR TITLES)

**CRITICAL:** Sidebar will show "Week N" (generic) without updating metadata.js!

**File:** `src/data/weeks/metadata.js`

**Purpose:** Week titles for sidebar navigation (lazy-loaded from index.js)

**Update Process:**
1. **Read Syllabus for Week N theme:**
   ```bash
   grep "Week N:" "1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt"
   # Example output: Week 14: Project 1 Showcase: "Welcome to My World"
   ```

2. **Edit metadata.js** (around line N):
   ```javascript
   // File: src/data/weeks/metadata.js
   export const weekTitles = {
     1: { title_en: "The Young Scholar", title_vi: "Học Sinh Trẻ" },
     // ... previous weeks
     N: { title_en: "Theme from Syllabus", title_vi: "Chủ đề từ Giáo trình" },
     // Example for Week 14:
     14: { 
       title_en: "Welcome to My World (Project Showcase)", 
       title_vi: "Chào mừng đến Thế giới của Tôi" 
     },
   };
   ```

3. **Validation:**
   ```bash
   # Check metadata.js was updated
   grep -A 1 "  N:" src/data/weeks/metadata.js
   # Expected: Shows Week N with proper title (NOT "Week N")
   
   # Test in browser (dev mode):
   npm run dev
   # Check sidebar: Week N should show theme title, NOT "Week N"
   ```

**⚠️ Common Mistakes:**
- ❌ Forgetting to update metadata.js → Sidebar shows "Week 14" instead of "Welcome to My World"
- ❌ Using wrong title → Title doesn't match syllabus theme
- ❌ Missing Vietnamese translation → Shows English for both languages

**Bug History:**
- Week 14: Sidebar showed "Week 14" (generic) instead of "Welcome to My World (Project Showcase)"
- Root cause: Agent forgot to update metadata.js after creating week_14_real.js
- Fixed: March 12, 2026

---

## 🎵 STEP 7 — GENERATE AUDIO

```bash
# Standard (generate missing + upload R2):
python3 tools/generate_audio_deepgram.py [N] --mode all --upload

# Force regenerate everything:
python3 tools/generate_audio_deepgram.py [N] --mode all --force --upload

# Single station only:
python3 tools/generate_audio_deepgram.py [N] --station vocab --upload
```

**Engine:** Deepgram Aura-2 → Google Neural2 (fallback) → Kokoro (`--kokoro` flag, manual only)

**Voice mapping** (từ `voiceConfig` trong `index.js`):

| Role | Deepgram | Gender | Station |
|------|----------|--------|---------|
| `narration` | `aura-2-orion-en` | Nam | read.js, explore.js |
| `vocabulary` | `aura-2-asteria-en` | Nữ | vocab.js, word_power.js |
| `dictation` | `aura-2-luna-en` | Nữ | dictation.js, shadowing.js |
| `questions` | `aura-2-zeus-en` | Nam | logic.js, ask_ai.js |
| `mindmap` | `aura-2-helios-en` | Nam | mindmap.js |

**⚠️ CRITICAL POST-GENERATION STEPS:**

### **7A. Add Week N to CDN_WEEKS Whitelist**
```bash
# Edit voiceService.js to enable CDN audio loading:
vim src/services/voiceService.js

# Line 96: Add Week N to array
const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; # Add new week

# Commit immediately:
git add src/services/voiceService.js
git commit -m "Enable CDN audio for Week N (add to CDN_WEEKS)"
```
**Why Required:** Without this, app will fallback to browser TTS despite audio files existing!

### **7B. Force-Commit Audio Files to Git**
```bash
# Audio folder is gitignored by default, must use -f flag:
git add -f public/audio/week{N}/       # Advanced mode
git add -f public/audio/week{N}_easy/  # Easy mode (if exists)

# Verify staging (should show ~300+ files for both modes):
git status --short | grep "audio/week{N}" | wc -l

# Commit with file count:
git commit -m "Add Week N audio files: [count] Advanced + [count] Easy"
git push
```
**Why Required:** `public/audio/` is gitignored → files won't deploy without `-f` flag!

**Expected File Counts:**
- Advanced mode: ~163 files (vocab, word_power, dictation, shadowing, etc.)
- Easy mode: ~157 files (similar structure, slightly fewer exercises)
- Total: ~320 files per week (~4-5 MB)

### **7C. Verify Audio Deployment**
```bash
# After Cloudflare deployment completes (2-3 min):
curl -I https://enquest3k.pages.dev/audio/week{N}/vocab_{first_word}.mp3
# Expected: HTTP 200 (NOT 404!)

# Check browser console (should show CDN success):
# [TTS] Trying R2 CDN for week N...
# [TTS] ✅ R2 CDN success (~100ms)
```

**`voiceConfig` template** (bắt buộc có trong `index.js`):
```javascript
voiceConfig: {
  narration:  'en-US-Neural2-D',
  vocabulary: 'en-US-Neural2-F',
  dictation:  'en-US-Neural2-F',
  questions:  'en-US-Neural2-D',
  mindmap:    'en-US-Neural2-D'
},
```

---

## 🖼️ STEP 7 — GENERATE IMAGES

```bash
node tools/generate_images_nano.js [N]
# Output: public/images/Prompts/week_[N]_image_prompts.txt (Advanced)
#         public/images/Prompts/week_[N]_easy_image_prompts.txt (Easy)
```

1. Copy từng prompt vào **Nano Banana** → download ảnh
2. Save vào `public/images/week[N]/` với tên `1_1_...`, `2_2_...`
3. `python3 auto_rename.py [N]` → rename đúng convention

**Naming conventions:**
- Vocab: `{word}.jpg` (NOT `vocab_{word}.jpg`)
- Word Power: `wordpower_{phrase}.jpg`
- Covers: `read_cover_w0[N].jpg`, `explore_cover_w0[N].jpg`

---

## 📁 14 STATION FILES — REQUIRED FIELDS SUMMARY

### `index.js`
```javascript
export default {
  week_id: N,
  title: "Week N: ...",
  grammar_focus: "...",
  global_vocab: vocab.vocab,
  voiceConfig: { narration, vocabulary, dictation, questions, mindmap },
  stations: { read_explore, new_words, word_match, grammar, word_power,
               ask_ai, logic_lab, dictation, shadowing, explore, mindmap,
               writing, video }
}
```

### `vocab.js` (Advanced — 10 từ)
```javascript
{ word, definition_en, definition_vi, example_en, collocation,
  image_url: "/images/week[N]/{word}.jpg",
  audio_word: "/audio/week[N]/vocab_{word}.mp3",
  audio_definition: "/audio/week[N]/vocab_def_{word}.mp3",
  audio_example: "/audio/week[N]/vocab_ex_{word}.mp3",
  audio_collocation: "/audio/week[N]/vocab_coll_{word}.mp3" }
```

### `word_power.js` (3 phrases, Advanced)
- Cần: `image_url` + 5 audio fields (`_word`, `_def`, `_ex`, `_coll`, `_model`)

### `read.js`
```javascript
{ title, image_url: "/images/week[N]/read_cover_w0[N].jpg",
  audio_url: "/audio/week[N]/read_explore_main.mp3",
  content_en, content_vi,
  comprehension_questions: [3 items],  // ← TÊN NÀY (KHÔNG phải check_questions)
  // ⚠️ MANDATORY: ĐÚNG 3 câu hỏi (KHÔNG phải 4)
  // ⚠️ MANDATORY: answer phải có subject + verb (câu hoàn chỉnh)
  //   Không cần đếm từ — chỉ cần KHÔNG phải fragment (noun phrase không có verb)
  //   ❌ answer: ["Her dad."]           ← fragment, không có verb
  //   ❌ answer: ["Blue and yellow."]   ← fragment, không có subject/verb
  //   ✅ answer: ["Luna went to the forest with her dad."]
  //   ✅ answer: ["The bird was blue and yellow."]
  //   ✅ answer: ["No, you are not tall."]   ← 5 từ OK (có subject+verb)
  //   ✅ answer: ["I am not tall."]           ← 4 từ OK (có subject+verb)
  // ⚠️ Nếu có nhiều cách trả lời đúng: answer: ["ans1", "ans2", "ans3"]
  question: { text_en, text_vi, min_words: 30, ... } }
```

### `explore.js`
```javascript
{ image_url: "/images/week[N]/explore_cover_w0[N].jpg",
  audio_url: "/audio/week[N]/explore_main.mp3",
  content_en, content_vi,
  check_questions: [3 items],  // ← TÊN NÀY (KHÔNG phải comprehension_questions)
  question: { ... } }
```

### `dictation.js` — **COPY EXACT SENTENCES từ read.js** (N câu = số câu trong read content)
- Tách read.js content thành N câu (mỗi câu 1 entry)
- Mỗi câu có `audio_url: "/audio/week[N]/dictation_{n}.mp3"`
- Easy mode: 15-20 câu | Advanced mode: 20-23 câu
- **QUY TẮC:** KHÔNG tự viết câu mới, PHẢI copy từ read.js!

### `shadowing.js` — **COPY EXACT SENTENCES từ read.js** (N câu + 1 full audio)
- Tách read.js content thành N câu (giống dictation.js)
- Mỗi câu có `audio_url: "/audio/week[N]/shadowing_{n}.mp3"`
- Thêm `audio_full: "/audio/week[N]/shadowing_full.mp3"` (đọc toàn bộ story)
- Easy mode: 15-20 câu | Advanced mode: 20-23 câu
- **QUY TẮC:** KHÔNG tự viết câu mới, PHẢI copy từ read.js!

### `mindmap.js` — **LUÔN 42 items**: 6 stems + 36 branches (6 per stem) | **Updated May 2026**

> ⚠️ **Breaking change (May 2026):** Branch audio URL formula changed from `hash(branchText)` → `hash(fullSentence)`.  
> All 62 mindmap files (W1-31, ADV + Easy) were patched in commit `d60a4b81`. New weeks MUST follow the new formula.

**Schema:**
```javascript
export default {
  centerStems: [
    {
      text: "I am ___.",
      audio: "/audio/weekN/mindmap_stem_{hashText('I am ___.')}.mp3"
      // hash formula: see hashText() below
    },
    {
      text: "My favourite ___ is ___.",
      audio: "/audio/weekN/mindmap_stem_{hashText('My favourite ___ is ___.')}.mp3"
    },
    // ... 6 stems total
  ],
  branchLabels: {
    "I am ___.": [
      {
        text: "happy",
        audio: "/audio/weekN/mindmap_branch_{hashText('I am happy.')}.mp3"
        // fullSentence = stemText.replace('___', branchText) = "I am happy."
        // ⚠️ NOT hash('happy') → causes R2 collision
      },
      // ... 6 branches
    ],
    // ... 6 stems
  }
};
```

**hashText() algorithm (must match `voiceService.js`):**
```javascript
function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + charCode;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
```

**Generation pattern for renderFile() scripts:**
```javascript
// ✅ CORRECT — branch audio uses hash(fullSentence)
.map(b => {
  const full = key.replace('___', b);  // key = stemText
  return `{ text: ${JSON.stringify(b)}, audio: "/audio/${folder}/mindmap_branch_${hashText(full)}.mp3" }`;
})

// ❌ WRONG — hash(branchText) causes collision
.map(b => `{ text: ${JSON.stringify(b)}, audio: "/audio/${folder}/mindmap_branch_${hashText(b)}.mp3" }`)
```

**MANDATORY rules:**
- **EXACTLY 6 center stems** per mindmap
- **EXACTLY 6 branches** per stem
- **≥3 stems MUST start with `"I ___"` or `"My ___"`** (personal stems — ALL weeks W1-31, BOTH ADV + Easy)
- Personal stem examples: `"I am ___."`  `"My favourite ___ is ___."` `"I feel ___ when ___."`  `"I like ___ because ___."` `"My ___ is very ___."` 
- Branch must produce grammatically correct sentence when inserted into stem (no bare infinitives)
- **Branch audio = `hash(fullSentence)` = `hash(stem.replace('___', branch))`**
- Stem audio = `hash(stemText)`
- TTS `___` in stems → `cleanTextForTTS()` converts to `,` (comma, natural pause) — do NOT write "blank"

**Folder naming:**
- ADV: `/audio/week{N}/` (e.g. `/audio/week8/`)
- Easy: `/audio/week{N}_easy/` (e.g. `/audio/week8_easy/`)
- Filenames have NO `_easy` suffix — folder is the ONLY mode indicator

**Validation:**
```bash
# Check ≥3 personal stems
node -e "import('./src/data/weeks/week_N/mindmap.js').then(m => {
  const stems = m.default.centerStems.map(s => typeof s === 'string' ? s : s.text);
  const p = stems.filter(s => /^(I |My )/i.test(s));
  console.log('Personal stems:', p.length, p.length >= 3 ? '✅' : '❌ NEED ≥3'); p.forEach(s => console.log(' -', s));
});"

# Audit branch audio collisions (same hash used by >1 stem)
node _audit_branch_collisions.mjs N

# Check no double-blank stems remain
node -e "import('./src/data/weeks/week_N/mindmap.js').then(m => {
  const stems = m.default.centerStems.map(s => typeof s === 'string' ? s : s.text);
  const dbl = stems.filter(s => (s.match(/___/g)||[]).length > 1);
  console.log('Double-blank stems:', dbl.length === 0 ? '✅ None' : '❌ ' + JSON.stringify(dbl));
});"
```

**TTSCache version bump protocol:**
If mindmap audio URL scheme changes → bump `DB_VERSION` in `src/services/ttsCache.js` (currently `= 11`).  
This triggers `onupgradeneeded` → wipes stale IndexedDB blobs → users get fresh audio on next load.
### `grammar.js` — ⚠️ **CHÍNH XÁC 20 exercises** (mc + fill + unscramble)
- Easy mode: **20 exercises** (simple wording)
- Advanced mode: **20 exercises** (more complex)
- **QUY TẮC NGHIÊM NGẶT:** KHÔNG được 15, 16, 18, hay 22 - PHẢI ĐÚNG 20!
- **Lý do:** UI assumptions, progress tracking, testing flow đều expect 20
- **Bug example:** Week 11 Easy ban đầu có 15 exercises → fixed to 20
### `word_match.js` — **Week 6 format** (KHÔNG dùng deprecated `pairs: [1,2,...10]`):
```javascript
export default {
  title: "Match the Words",
  pairs: [{ id, word, definition, image_url }, ...] // 10 pairs
}
```
### `ask_ai.js` — **5 prompts**, audio field là `audio_url` (KHÔNG phải `answer_audio_url`):
```javascript
{ id, context_en, context_vi,
  audio_url: "/audio/week[N]/ask_ai_{n}.mp3",  // ← ĐÚNG TÊN
  answer: ["Q1", "Q2", "Q3"],
  hint: "..." }
```
### `logic.js` — 5 puzzles, mỗi item có `audio_url: "/audio/week[N]/logic_{n}.mp3"`
### `writing.js` — **1 object** (KHÔNG phải array):
```javascript
export default { title, min_words: 40, model_sentence, instruction_en, instruction_vi,
  prompt_en, prompt_vi, keywords: [8-10 words] }
```
### `daily_watch.js` / `video_queries.json` — AUTO-GENERATED (xem STEP 7D)

---

## ✅ VALIDATION COMMANDS

```bash
# Syntax check
node -c src/data/weeks/week_N_real.js

# Mission count (phải = 3)
grep -c "mission_id:" src/data/weeks/week_N_real.js
⚠️ UI Imports (StoryMissionTab + FreeTalkTab + gameAdaptation.js)**:
    - **PHẢI thêm import và ternary case CHO MỖI TUẦN MỚI**
    - Fallback `week7RealData` CHỈ là safeguard tránh crash
    - **NEVER deploy Week N without adding proper import + ternary case**
    - Missing import → Week N shows Week 7 content (WRONG!)
    - Missing gameAdaptation → Game Hub deployment fails
11. **Daily Watch Videos**:
    - **PHẢI có Blueprint data** trong `generate_video_queries.js` trước khi generate
    - **Run workflow đầy đủ:** `generate_video_queries.js` → `update_videos.js --reset`
    - **Verify 5 slots match PURPOSE:** GRAMMAR (x2), STORY, VOCABULARY, SCIENCE/MATH
    - **Check priority channels:** ⭐ marks = success, ⚠️ fallback = optimize queries
    - **KHÔNG deploy nếu >2 slots dùng fallback videos** (chất lượng kém)
12. **voiceConfig**: PHẢI có trong `index.js`, script audio phụ thuộc vào nó
13. **Audio script**: `generate_audio_deepgram.py` (KHÔNG dùng `generate_kokoro.py`)
14 public/audio/weekN/*.mp3 | wc -l

# Vocab image count (phải = 10)
grep -c "image_url:" src/data/weeks/week_N/vocab.js

# word_match format đúng (phải = 0 — không có deprecated format)
grep -c "pairs: \[1," src/data/weeks/week_N/word_match.js
```

---

## ⚠️ CRITICAL RULES — TUYỆT ĐỐI KHÔNG VI PHẠM

### 🔴 PYTHON BAN (Week 12 Lesson Learned)
**❌ NEVER use Python to create .js or .jsx files!**
- Python cannot validate JavaScript syntax
- Python print() causes encoding corruption and line-wrap issues
- Week 12 had cascading failures because Python bypassed validation
- **ALWAYS use Node.js with `fs.writeFileSync()` for ALL JavaScript files**
- **IMMEDIATELY validate:** `node --input-type=module < file.js` after creation

**Impact of violating this rule:**
- SyntaxError when importing files
- Build failures or fallback to wrong content
- Production shows Week 7 instead of Week N
- Emergency hotfixes required post-launch

**Reference:** `PRODUCTION_LESSONS_LEARNED.md` - Category A2 (Python for JS files)

---

1. **AI Tutor**: Clone từ `week_07_real.js`, KHÔNG generate từ đầu
2. **Stations**: Clone SCHEMA từ `week_06`, KHÔNG clone CONTENT
3. **word_match.js**: Dùng object format (Week 6), KHÔNG dùng `pairs: [1,2,...,10]`
4. **ask_ai.js**: Field `audio_url` (KHÔNG phải `answer_audio_url`)
5. **read.js** vs **explore.js**: `comprehension_questions` (read) ≠ `check_questions` (explore)
6. **⚠️ shadowing.js & dictation.js**: 
   - **PHẢI COPY EXACT SENTENCES từ read.js** (KHÔNG tự viết câu mới!)
   - Advanced: 20-23 sentences | Easy: 15-20 sentences
   - Tách read.js content thành N câu (mỗi câu 1 entry)
   - Mỗi câu có `audio_url: "/audio/week{N}/shadowing_{n}.mp3"`
7. **⚠️ grammar.js**: 
   - **CHÍNH XÁC 20 exercises** (KHÔNG được 15, 16, 18, hay 22!)
   - Cả Easy và Advanced mode đều PHẢI 20 exercises
   - UI assumptions + progress tracking depend on this exact number
8. **⚠️ CDN_WEEKS whitelist**:
   - **PHẢI update `src/services/voiceService.js` line 96 ngay sau khi generate audio**
   - Add Week N: `const CDN_WEEKS = [1, 2, 3, ..., N];`
   - Without this: Browser TTS fallback despite audio files existing!
9. **⚠️ Audio files deployment**:
   - **PHẢI force-commit:** `git add -f public/audio/week{N}/`
   - `public/audio/` is gitignored → must use `-f` flag
   - Without this: 404 errors in production despite files in repo locally
10. **Daily Watch Videos**:
    - **PHẢI có Blueprint data** trong `generate_video_queries.js` trước khi generate
    - **Run workflow đầy đủ:** `generate_video_queries.js` → `update_videos.js --reset`
    - **Verify 5 slots match PURPOSE:** GRAMMAR (x2), STORY, VOCABULARY, SCIENCE/MATH
    - **Check priority channels:** ⭐ marks = success, ⚠️ fallback = optimize queries
    - **KHÔNG deploy nếu >2 slots dùng fallback videos** (chất lượng kém)
11. **voiceConfig**: PHẢI có trong `index.js`, script audio phụ thuộc vào nó
12. **Audio script**: `generate_audio_deepgram.py` (KHÔNG dùng `generate_kokoro.py`)
13. **GAME_TEMPLATES[N]**: PHẢI add vào `gameAdaptation.js` sau khi có AI Tutor

---

## 🐛 TROUBLESHOOTING COMMON PRODUCTION BUGS

### **BUG 1: Week N shows Week 5 missions in AI Tutor**
**Cause:** Missing imports in StoryMissionTab.jsx / FreeTalkTab.jsx  
**Symptoms:** AI Tutor displays "Exploring My House" for Week 9  
**Fix:**
```javascript
// Add to StoryMissionTab.jsx & FreeTalkTab.jsx:
import weekNRealData from '../../../data/weeks/week_N_real';

// Update ternary chain:
const weekRealData = weekId === N ? weekNRealData : ... // fallback
```
**Verification:** Refresh app → Week N should show correct missions

---

### **BUG 2: Images show 404 errors / broken icons**
**Cause:** Inconsistent folder naming (week9 vs week09)  
**Symptoms:** Vocab cards display placeholder icons instead of images  
**Fix:** Use zero-padded format EVERYWHERE:
```bash
# Check actual folder names on R2:
# Should be: week09/, week10/ (NOT week9/)

# Fix vocab.js paths:
sed -i '' 's|/images/week9/|/images/week09/|g' src/data/weeks/week_09/vocab.js
sed -i '' 's|/audio/week9/|/audio/week09/|g' src/data/weeks/week_09/*/*.js

# Re-upload if folders wrong:
python3 tools/upload_week_images_r2.py N
```
**Root Cause:** Tools like `generate_audio_deepgram.py` use `f"week{N:02d}"` (zero-padding), but manual edits used `f"week{N}"` (no padding). **Always match R2 structure!**

---

### **BUG 3: Audio files return 404 from R2 CDN**
**Cause:** Audio uploaded to wrong R2 path or zero-padding mismatch  
**Symptoms:** Console shows `404 https://pub-...r2.dev/audio/week9/vocab_city.mp3`  
**Fix:**
```bash
# Verify R2 bucket structure (should match local):
ls -la public/audio/week09/  # Local
# R2 path: audio/week09/*.mp3 (NOT audio/week9/)

# If mismatch, regenerate with fixed script:
python3 tools/generate_audio_deepgram.py N --mode all --upload --force
```
**Prevention:** Updated `generate_audio_deepgram.py` (line 485) uses `week_padded = str(week).zfill(2)` for all paths

---

### **BUG 4: Daily Watch videos are generic/low quality**
**Cause:** Week N not in `BLUEPRINT_WEEKS` object or fallback videos used  
**Symptoms:** Videos show generic "Learn English" content, no theme match  
**Fix:**
```bash
# 1. Add Week N Blueprint data
vim tools/generate_video_queries.js
# Add entry to BLUEPRINT_WEEKS object

# 2. Regenerate queries
node tools/generate_video_queries.js N

# 3. Optimize search terms (remove template notation)
vim src/data/weeks/week_N/video_queries.json
# BAD: "[adjective] [noun]"
# GOOD: "adjectives song kids English Singsing"

# 4. Re-fetch with --reset flag
node tools/update_videos.js N --reset
```
**Verification:** 
- Should see 4-5 "⭐" marks (priority channels)
- Zero "⚠️ fallback" warnings
- Video titles match theme (e.g., "City Adventure" for Week 9)

---

### **BUG 5: generate_audio_deepgram.py creates week9/ instead of week09/**
**Cause:** Old script version without zero-padding  
**Fix:** Already patched in commit `87ba6ad` (Mar 5, 2026)
```python
# Line 485 in generate_audio_deepgram.py:
week_padded = str(week).zfill(2)  # Ensures week09, week10
audio_dir_name = f"week{week_padded}" if mode == "advanced" else f"week{week_padded}_easy"
```
**Verification:** 
```bash
ls public/audio/ | grep week0  # Should show week09, week10
```

---

### **BUG 6: Nano Banana images can't be renamed**
**Cause:** New filename pattern `N_N_*.png` not parsed by old rename script  
**Fix:** Updated `auto_rename.py` to support both patterns:
```python
# Now handles:
# - Old: "1_Hãy_tạo_*.png"
# - New: "1_1_Hãy_tạo_*.png"
```
**Usage:**
```bash
python3 tools/auto_rename.py N
# Looks in: public/images/Prompts/ (new location)
# Falls back to: MASS_Final/Image prompts/ (legacy)
```

---

### **BUG 7: Browser TTS fallback despite audio files deployed (Week 11)**
**Cause:** Week N not added to `CDN_WEEKS` whitelist in voiceService.js  
**Symptoms:** Console shows `[TTS] ⚠️ Using browser TTS as last resort` for vocab/static stations  
**Evidence:** 
```javascript
// Week 11 audio files exist on R2 (verified 200 OK):
curl -I https://enquest3k.pages.dev/audio/week11/vocab_park.mp3 
// → HTTP 200 ✅

// But console shows:
[TTS] ⚠️ Using browser TTS as last resort
```
**Root Cause:** VoiceService.js has hardcoded CDN_WEEKS whitelist that skips Week N:
```javascript
// src/services/voiceService.js (line 96):
const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // ❌ Missing 11!
```
**Fix:**
```bash
# 1. Add Week N to CDN_WEEKS array
vim src/services/voiceService.js

# Line 96: Add Week N to array
const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // ✅ Added 11

# 2. Commit and deploy
git add src/services/voiceService.js
git commit -m "Enable CDN audio for Week N (add to CDN_WEEKS list)"
git push
```
**Verification After Deploy:**
```javascript
// Console should show:
[TTS] Trying R2 CDN for week 11 advanced...
[TTS] ✅ R2 CDN success (~100ms)
// ✅ NO "Using browser TTS" warnings
```
**Prevention Rule:** ⚠️ **ALWAYS update CDN_WEEKS immediately after generating audio for new week!**  
**Bug History:** Week 11 (Mar 6, 2026) - Fixed in commit `bb07bdf`

---

### **BUG 8: Audio files 404 despite being in public/audio/ locally**
**Cause:** `public/audio/` is gitignored → files never deploy to Cloudflare Pages  
**Symptoms:** 
- Local dev works fine (audio plays from `public/audio/week11/`)
- Production shows 404 for all Week N audio files
- Console: `Failed to load audio: 404 Not Found`
**Evidence:**
```bash
git ls-files public/audio/week11/  # Returns nothing (files not tracked)
cat .gitignore | grep audio        # Shows: public/audio/
```
**Root Cause:** `.gitignore` excludes `public/audio/` directory (originally intended for R2-only hosting, but Cloudflare Pages serves from git)

**Fix (REQUIRED for every new week with audio):**
```bash
# 1. Force-add audio files (bypass gitignore)
git add -f public/audio/week11/
git add -f public/audio/week11_easy/  # For Easy mode

# 2. Verify files staged
git status --short | grep audio/week11 | wc -l
# Should show: ~320 files (163 Advanced + 157 Easy for Week 11)

# 3. Commit with descriptive message
git commit -m "Add Week 11 audio files: 163 Advanced + 157 Easy (320 total)"
git push

# 4. Wait for Cloudflare deployment (2-3 minutes)
# 5. Verify audio accessible on production:
curl -I https://enquest3k.pages.dev/audio/week11/vocab_park.mp3
# Expected: HTTP 200
```

**Why `-f` flag needed:**
- Git ignores files matching `.gitignore` patterns
- `-f` (force) bypasses ignore rules for specified paths
- Alternative: Remove `public/audio/` from `.gitignore` (NOT recommended - causes huge repo size)

**File Size Impact:**
- Week 11: 320 files × ~15KB avg = ~4.4MB per week
- Total audio (Weeks 1-11): ~50MB (acceptable for git, critical for deployment)

**Prevention Rule:** ⚠️ **After running `generate_audio_deepgram.py`, ALWAYS run `git add -f public/audio/week{N}/`**  
**Bug History:** Week 11 (Mar 6, 2026) - Fixed in commit `8162f44` (320 files added)

---

### **BUG 9: Audio filename mismatch - EASY mode files have NO suffix**
**Cause:** Code references `filename_easy.mp3` but generated files are `filename.mp3` (no `_easy` suffix in filename)  
**Symptoms:** 
- Browser TTS fallback for mindmap stems/branches in Easy mode
- Browser TTS for word_power definition/collocation/model audio (back side of flashcard)
- Console: `404 Not Found` for `mindmap_stem_2_easy.mp3`, `wordpower_def_at_the_park_easy.mp3`
**Evidence:**
```bash
# ❌ Code expects:
/audio/week11_easy/mindmap_stem_2_easy.mp3
/audio/week11_easy/wordpower_def_at_the_park_easy.mp3

# ✅ Actual files (generated by audio script):
/audio/week11_easy/mindmap_stem_2.mp3         # No _easy suffix
/audio/week11_easy/wordpower_def_at_the_park.mp3  # No _easy suffix
```
**Naming Rule (CRITICAL):**
- **Folder path:** MUST have mode suffix (`/audio/week11/` vs `/audio/week11_easy/`)
- **Filename:** NO mode suffix (`mindmap_stem_2.mp3` for BOTH modes)
- **Pattern:** `{folder_with_mode}/{filename_without_mode}.mp3`

**Examples:**
```javascript
// ✅ CORRECT (Easy mode):
audio: "/audio/week11_easy/mindmap_stem_1.mp3"  // Folder has _easy, filename does NOT
audio: "/audio/week11_easy/wordpower_def_at_the_park.mp3"

// ✅ CORRECT (Advanced mode):
audio: "/audio/week11/mindmap_stem_1.mp3"  // No _easy in folder or filename
audio: "/audio/week11/wordpower_def_at_the_park.mp3"

// ❌ WRONG:
audio: "/audio/week11_easy/mindmap_stem_1_easy.mp3"  // Redundant _easy in filename
audio: "/audio/week11_easy/wordpower_def_at_the_park_easy.mp3"  // Redundant _easy
```

**Additional Gotcha (Advanced mode):**
- Some Advanced audio files have **`_the_`** in filename (not in image filename)
- Example:
  - Audio: `wordpower_read_at_the_library.mp3` ← Has `_the_`
  - Image: `wordpower_read_at_library.jpg` ← NO `_the_`
- **Always cross-check actual filenames** with `ls public/audio/week{N}/*.mp3` before coding

**Fix Procedure:**
```bash
# 1. Remove _easy suffix from Easy mode audio filenames (keep folder path)
sed -i '' 's/_easy\.mp3/.mp3/g' src/data/weeks_easy/week_11/mindmap.js
sed -i '' 's/_easy\.mp3/.mp3/g' src/data/weeks_easy/week_11/word_power.js

# 2. For Advanced mode, check actual filenames:
ls -1 public/audio/week11/wordpower_*.mp3 | xargs -n1 basename
# If files have _the_ (e.g., read_at_the_library), update code to match:
sed -i '' 's/read_at_library/read_at_the_library/g' src/data/weeks/week_11/word_power.js

# 3. Commit and deploy
git add src/data/weeks*/week_11/*.js
git commit -m "Fix audio paths: Remove _easy suffix + match actual filenames"
git push
```

**Verification:**
```javascript
// After deploy + hard refresh:
[TTS] Trying R2 CDN for week 11 easy...
[TTS] ✅ R2 CDN success (~100ms)  // ✅ Should NOT fallback to browser TTS

// Console should have ZERO lines like:
[TTS] ⚠️ Using browser TTS as last resort  // ❌ If you see this, paths still wrong
```

**Prevention Rule:** 
⚠️ **ALWAYS verify actual audio filenames with `ls public/audio/week{N}/*.mp3` before writing code paths**  
⚠️ **Audio script generates NO `_easy` suffix - folder path is the ONLY mode indicator**  

**Files Affected (Check ALL):**
- `mindmap.js` (Easy mode): All `centerStems` and `branchLabels` audio paths
- `word_power.js` (both modes): `audio_definition`, `audio_collocation`, `audio_example`, `audio_model`
- Any other files with audio_url fields

**Bug History:** Week 11 (Mar 6, 2026) - Fixed in commit `eab4a3d` (3 files: mindmap.js + 2x word_power.js)

---

### **BUG 10: Game Hub deployment fails - Missing imports in gameAdaptation.js**
**Cause:** New week's `games.js` files created but NOT imported into `src/config/gameAdaptation.js`  
**Symptoms:** 
- Cloudflare Pages build fails with "No deployment available" warning
- GameHub component tries to load Week N data but import is missing
- Console error: `Module not found` or similar

**Evidence:**
```javascript
// gameAdaptation.js BEFORE fix:
import week10GamesAdvanced from '../data/weeks/week_10/games.js';
import week10GamesEasy from '../data/weeks_easy/week_10/games.js';
// ❌ Week 11 missing!

const weekGamesMap = {
  ...
  10: { advanced: week10GamesAdvanced, easy: week10GamesEasy }
  // ❌ Week 11 missing!
};
```

**Root Cause:** `gameAdaptation.js` is the central registry for GameHub data. When adding new week:
1. Must import both `weekNGamesAdvanced` and `weekNGamesEasy`
2. Must import `weekNRealData` (if AI Tutor exists)
3. Must add to `weekGamesMap` object
4. Must add to `REAL_WEEK_DATA` object

**Fix Procedure:**
```bash
# 1. Open gameAdaptation.js
vim src/config/gameAdaptation.js

# 2. Add imports after last week (around line 28):
import week11GamesAdvanced from '../data/weeks/week_11/games.js';
import week11GamesEasy from '../data/weeks_easy/week_11/games.js';

# 3. Add AI Tutor import (around line 40):
import week11RealData from '../data/weeks/week_11_real.js';

# 4. Add to REAL_WEEK_DATA object (around line 105):
const REAL_WEEK_DATA = {
  ...
  10: week10RealData,
  11: week11RealData  // ✅ Add this
};

# 5. Add to weekGamesMap in getGameData() function (around line 125):
const weekGamesMap = {
  ...
  10: { advanced: week10GamesAdvanced, easy: week10GamesEasy },
  11: { advanced: week11GamesAdvanced, easy: week11GamesEasy }  // ✅ Add this
};

# 6. Verify syntax
node -c src/config/gameAdaptation.js

# 7. Commit and deploy
git add src/config/gameAdaptation.js
git commit -m "Add Week N to Game Hub imports (gameAdaptation.js)"
git push
```

**Verification:**
```bash
# After deployment:
# 1. Check Cloudflare Pages status → Should show "Success" ✅
# 2. Visit Game Hub for Week N
# 3. Click "Show & Tell Ladder" → Should load without errors
# 4. Check browser console → No "Module not found" errors
```

**Prevention Rule:**  
⚠️ **WHEN creating `games.js` for new week, IMMEDIATELY update `gameAdaptation.js` imports BEFORE committing!**  
⚠️ **ALWAYS check gameAdaptation.js has 4 changes: 2 game imports + 1 real import + 2 object additions**

**Files to check:**
- `src/config/gameAdaptation.js` - Central registry (CRITICAL)
- `src/data/weeks/week_N/games.js` - Advanced mode data
- `src/data/weeks_easy/week_N/games.js` - Easy mode data
- `src/data/weeks/week_N_real.js` - AI Tutor data (if FreeTalk enabled)

**Bug History:** Week 11 (Mar 6, 2026) - Fixed in commit `1ef546e` (+7 insertions: 4 imports + 3 object additions)

---

### **BUG 11: Game Hub content copypasta - Template data not replaced with week theme**

**Cause:**  
Weeks 9 & 10 Game Hub files were created by cloning a Hide & Seek template, but the game content (show_tell, make_sentence, ask_me) was never replaced with the week's actual theme:
- Week 9: "City Sounds & Sights" (city, street, noisy, busy, car, bus, building, traffic)
- Week 10: "Farm Adventure" (countryside, farm, quiet, peaceful, animals, cow, chicken)

**Symptoms:**
- Week 9 & 10 Game Hub had nearly identical content (both used ball/toy/box/hide/seek)
- Game data doesn't match week vocabulary or learning objectives
- Student confusion: Playing hide-and-seek in "City Week" or "Farm Week"
- Content quality issue: Generic template instead of themed progression

**Root Cause Analysis:**
1. **Week 9 Advanced:**
   - ✅ vocabulary: city, street, noisy... (CORRECT)
   - ❌ show_tell.detail_map: box, desk, floor, ball, toy, hide, seek (WRONG)
   - ❌ make_sentence: "Put the ball on the floor" (WRONG)
   - ❌ ask_me: "Where is the ball?" contexts (WRONG)

2. **Week 10 Advanced:**
   - ✅ vocabulary: countryside, farm, animals... (CORRECT)
   - ✅ show_tell.sentence_hints_map: farm-themed (CORRECT)
   - ❌ make_sentence: Last 5 sentences "Put the ball/toy" (COPYPASTA from Week 9)
   - ❌ ask_me: ALL contexts about ball/toy/hide/seek (COPYPASTA from Week 9)

3. **Easy Modes:**
   - Both had mixed copypasta: emoji_map, definitions, detail_map still using Hide & Seek data

**Fix Procedure:**

**Step 1: Review week theme from vocab.js**
```bash
# Check what the week is actually about
cat src/data/weeks/week_N/vocab.js | head -30
# Note the vocabulary: city, farm, school, etc.
```

**Step 2: Rewrite show_tell.detail_map to match theme**
- Use week vocabulary (10 words from vocab list)
- Create 4 progressive levels per word: [simple, phrase, longer phrase, full sentence]
- Example for "city": ['big city', 'modern city', 'the city', 'I live in the city']

**Step 3: Rewrite make_sentence to match theme**
- 10 sentences_easy: Simple sentences using week vocabulary
- 10 sentences_advanced: More complex sentences with connectors (and, but, with)
- Must relate to week topic (city sights, farm animals, school places, etc.)

**Step 4: Rewrite ask_me contexts to match theme**
- contexts_easy: 9 basic questions (WHERE/WHAT/HOW) + 1 mini_interview
- contexts_advanced: 9 advanced questions (add WHY) + 1 mini_interview
- All contexts must use week vocabulary and scenarios

**Step 5: Update emoji_map and definitions**
- emoji_map: All keys = week vocabulary (city🏙️, farm🚜, cow🐄, etc.)
- definitions: 4 key words from week (not hide/seek/ball/toy unless that's the theme)

**Step 6: Verify content alignment**
```bash
# Check all sections match week theme
grep -E "(ball|toy|hide|seek|box|desk)" src/data/weeks/week_N/games.js
# Should return NO matches (unless week is actually about those)

# Verify vocabulary consistency
grep "vocabulary:" src/data/weeks/week_N/games.js
# Should match vocab.js words
```

**Step 7: Test in browser**
- Game Hub → Show & Tell: Check word list matches week theme
- Game Hub → Sentence Expander: Verify sentences are thematic
- Game Hub → Ask Me: Confirm contexts match week scenarios

**Prevention Rules:**
✅ **NEVER clone games.js without reviewing ALL content**  
✅ **ALWAYS match games.js content to week vocab.js**  
✅ **CHECK for copypasta:** Search for generic words (ball, toy, hide, seek, put)  
✅ **THEME VERIFICATION:** Every sentence/context must relate to week topic  
✅ **BOTH MODES:** Apply same theme rules to Advanced AND Easy modes  

**Files to check:**
- `src/data/weeks/week_N/vocab.js` - Source of truth for week theme
- `src/data/weeks/week_N/games.js` - Must match vocab theme
- `src/data/weeks_easy/week_N/games.js` - Must match vocab theme (simplified)
- All 3 game sections: show_tell, make_sentence, ask_me

**Bug History:** 
- Week 9 (Mar 6, 2026): Fixed in commit `b9bb0dc` (Advanced: +293 insertions, -274 deletions)
- Week 10 (Mar 6, 2026): Fixed in commit `d553ac4` (Advanced: +233 insertions, -214 deletions)
- Both Easy modes: Fixed in commit `7f3343f` (+52 insertions, -51 deletions)
- **Total impact:** ~850 lines of content replaced across 4 files

**Template Detection Pattern:**
```bash
# Quick check for Hide & Seek template in any week
grep -l "ball.*toy.*hide.*seek" src/data/weeks*/week_*/games.js
# Should only return weeks actually about Hide & Seek (if any)

# Check for farm template in wrong weeks
grep -l "cow.*chicken.*countryside" src/data/weeks*/week_*/games.js | grep -v "week_10"
# Should return nothing (only Week 10 is Farm theme)

# Check for city template in wrong weeks
grep -l "car.*bus.*traffic" src/data/weeks*/week_*/games.js | grep -v "week_09"
# Should return nothing (only Week 9 is City theme)
```

---

### **BUG 12: Unused stations in stationConfig causing UI clutter**

**Cause:**  
After BUG 10 cleanup (deleted sentence_builder, twenty_questions, word_chain files), the references remained in `src/config/stationConfig.js`, causing:
- Empty tabs appearing between Word Power and Daily Watch
- Station mapping confusion
- Import errors when trying to access deleted components

**Symptoms:**
- User sees "20 Questions" and "Word Chain" tabs in UI despite no content files
- stationConfig.STATION_KEYS has unused entries
- STATIONS array has 2 extra station objects

**Fix:**
Remove these 2 lines from stationConfig.js:
```javascript
// DELETE these lines:
'twenty_questions': 'twenty_questions',
'word_chain': 'word_chain',

// DELETE these station objects:
{ key: 'twenty_questions', stationId: 'twenty_questions', icon: Target, title_en: '20 Questions', color: 'fuchsia' },
{ key: 'word_chain', stationId: 'word_chain', icon: Zap, title_en: 'Word Chain', color: 'orange' },
```

**Prevention:**
When deleting content files, always:
1. Search for all references: `grep -r "deleted_filename" src/`
2. Remove from stationConfig.js
3. Remove from week index.js imports
4. Test UI to verify tabs don't appear

**Files Changed:** 
- Commit 7262138: `src/config/stationConfig.js` (-4 lines)

---

### **BUG 13: Mindmap grammar errors - Verb form inconsistencies**

**Cause:**  
Week 11 Easy mindmap used "be quiet" as a branch option for stem "I ___ at the library", creating grammatically incorrect sentence: **"I be quiet at the library"** ❌

**Correct Forms:**
- ✅ "I **am** quiet" (present simple with subject-verb agreement)
- ✅ "I **stay** quiet" (use action verb)
- ✅ "I **sit** quietly" (verb + adverb)

**Detection Pattern:**
```bash
# Find bare infinitive 'be' in mindmap branches
grep -E "text: \"be " src/data/weeks*/week_*/mindmap.js

# Check for other auxiliary verb errors
grep -E "text: \"(have|do|can|will|be) [a-z]+" src/data/weeks*/week_*/mindmap.js
```

**Fix Applied:**
Week 11 Easy mindmap line 25: `"be quiet"` → `"stay unique"` (action verb)

**Prevention Rules:**
1. Mindmap branches must be grammatically complete when inserted into stem
2. Test sentence formation: Read "stem + branch" aloud
3. Avoid bare infinitives (be/have/do) unless stem requires them
4. **Use action verbs** for clarity: stay/sit/keep/remain > be

**Files Changed:**
- Commit 7262138: `src/data/weeks_easy/week_11/mindmap.js` (line 25)

---

### **BUG 14: YouTube video deletions - Recurring content availability issue**

**Cause:**  
YouTube videos get deleted/removed by creators after being added to `daily_watch.js`, resulting in broken video embeds (404 errors showing gray placeholders in UI).

**Frequency:** Found in multiple weeks during QA:
- Week 11 video #5: `V4Ij8hE5TsI` (Science for Kids) - **DELETED** 404
- Previous incidents in Week 9, 10 during testing

**Detection Command:**
```bash
# Check all videos in a week
for id in $(grep -oE 'videoId: "[^"]+\"' src/data/weeks/week_N/daily_watch.js | cut -d'"' -f2); do
  curl -s -o /dev/null -w "$id: %{http_code}\n" "https://img.youtube.com/vi/$id/mqdefault.jpg"
done

# Check all weeks at once (weeks 1-20)
for week in {01..20}; do
  echo "=== Week $week ==="
  for id in $(grep -oE 'videoId: "[^"]+\"' src/data/weeks/week_$week/daily_watch.js 2>/dev/null | cut -d'"' -f2); do
    status=$(curl -s -o /dev/null -w "%{http_code}" "https://img.youtube.com/vi/$id/mqdefault.jpg")
    [ "$status" != "200" ] && echo "❌ $id: $status"
  done
done
```

**Fix Procedure:**
1. Run detection command to find 404 videos
2. Find replacement from **verified channels only**:
   - ✅ Super Simple Songs (high reliability)
   - ✅ Kids Academy (educational, stable)
   - ✅ Little Fox (story-based, stable)
   - ✅ Dream English Kids
   - ⚠️ Avoid: random creators, reuploaders, "compilation" channels

3. Verify new video exists:
```bash
curl -s -o /dev/null -w "%{http_code}" "https://img.youtube.com/vi/NEW_VIDEO_ID/mqdefault.jpg"
# Must return 200 before committing
```

4. Update both Advanced and Easy mode files:
```javascript
// Replace in both:
// src/data/weeks/week_N/daily_watch.js
// src/data/weeks_easy/week_N/daily_watch.js
```

**Prevention Strategy:**
1. **Pre-flight check**: Always verify video exists before adding (200 status code)
2. **Channel whitelist**: Only use verified stable channels (list above)
3. **Quarterly audit**: Run full detection script every 3 months
4. **Backup strategy**: Keep 2-3 alternative video IDs in comments for quick replacement

**Week 11 Fix Example:**
```javascript
// OLD (404): 
{ id: 5, videoId: "V4Ij8hE5TsI", title: "Science for Kids - Learning Video" }

// NEW (200 OK):
{ id: 5, videoId: "l4WwuJ0Oj3s", title: "If You're Happy And You Know It | Super Simple Songs" }
```

**Files Changed:**
- Commit 7262138: `src/data/weeks/week_11/daily_watch.js`
- Commit 7262138: `src/data/weeks_easy/week_11/daily_watch.js`

---

### **BUG 15: TTS pronunciation errors - Homophones and context ambiguity**

**Cause:**  
Deepgram TTS (and other engines) misinterpret words with multiple pronunciations when context is ambiguous:

**Common Issues:**
1. **read** → Pronounced as "red" /rɛd/ (past tense) instead of "reed" /riːd/ (present tense)
2. **live** → "liv" (verb) vs "laiv" (adjective)
3. **close** → "klōz" (verb) vs "klōs" (adjective)
4. **tear** → "teer" (crying) vs "tare" (rip)

**Week 11 Example:**
- Word: "read"
- Pronunciation marker: `/riːd/` (correct in vocab.js)
- But TTS audio says: "red" /rɛd/ ❌
- Context: "I read at the library" (present tense, should be /riːd/)

**Why This Happens:**
- TTS engines use statistical models trained on text corpora
- "read" past tense appears more frequently in training data
- Without explicit SSML tags or phonetic spelling, engine guesses wrong
- IPA pronunciation `/riːd/` in JSON is ignored by TTS (documentation only)

**Fix Strategies:**

**Option 1: Regenerate with --force (sometimes works)**
```bash
# Force regeneration (engine might pick different pronunciation)
python3 tools/generate_audio_deepgram.py 11 --mode all --station vocab --force --upload

# Check if pronunciation improved by listening to:
# public/audio/week11/vocab_read.mp3
# public/audio/week11_easy/vocab_read.mp3
```

**Option 2: Use context-rich sentences in generation**
```python
# In audio generation script, add sentence context:
text_to_speak = f"I read books every day. {word}"  # Forces present tense
# Then trim silence from recording
```

**Option 3: Phonetic spelling workaround**
```javascript
// Temporary hack in vocab.js for TTS processing only:
word: "read",
tts_override: "reed",  // Use for audio generation
pronunciation: "/riːd/",  // Keep for display
```

**Option 4: Manual recording upload**
```bash
# 1. Record correct pronunciation using:
#    - Google TTS with SSML: <phoneme alphabet="ipa" ph="ɹiːd">read</phoneme>
#    - macOS `say` command: say -v Samantha "reed"
#    - Professional voice actor

# 2. Upload directly to R2:
aws s3 cp read_correct.mp3 s3://bucket/audio/week11/vocab_read.mp3
```

**Detection Pattern:**
```bash
# Words most likely to have pronunciation issues:
HOMOPHONES="read|live|close|tear|bow|lead|wind|present|record|produce|project"

# Find these in vocab files:
grep -E "word: \"($HOMOPHONES)\"" src/data/weeks*/week_*/vocab.js

# Test each audio file manually:
for word in read live close; do
  echo "Testing: $word"
  afplay public/audio/week11/vocab_$word.mp3
  read -p "Correct pronunciation? (y/n): " answer
done
```

**Prevention:**
1. Add pronunciation notes in audio generation logs
2. QA checklist: Listen to all homophone words
3. Maintain list of problematic words requiring manual fix
4. Consider using multiple TTS engines (Deepgram → Google → Kokoro fallback)

**Files Affected (Week 11):**
- `public/audio/week11/vocab_read.mp3` (regenerated)
- `public/audio/week11_easy/vocab_read.mp3` (regenerated)
- `public/audio/week11/vocab_ex_read.mp3` (example sentence, also needs check)

**Status:**
- Audio regeneration: IN PROGRESS (background process)
- Verification needed after upload completes

---

### **BUG 16: TTS homophone pronunciation - Deepgram failure case** UPDATE: SOLVED

**Cause:**  
Week 11 vocab word "read" was consistently pronounced as "red" /rɛd/ (past tense) instead of "reed" /riːd/ (present tense) by Deepgram TTS, despite correct IPA notation `/riːd/` in vocab.js.

**Why Regeneration Failed:**
- Deepgram API called 3 times with `--force` flag
- Engine consistently chose past tense pronunciation (more common in training data)
- IPA pronunciation `/riːd/` in JSON is documentation only - TTS ignores it
- Statistical models prioritize frequency over context

**Solution Applied (BUG 15 Option 3 - Phonetic Workaround):**

Used macOS `say` command with **phonetic spelling "reed"** to force correct pronunciation:

```bash
# Generate correct pronunciation for 'read' vocabulary
say -v Samantha "reed" -o /tmp/vocab_read.aiff
ffmpeg -y -i /tmp/vocab_read.aiff -acodec libmp3lame -ab 128k public/audio/week11/vocab_read.mp3

# Generate example sentence with correct pronunciation  
say -v Samantha "I reed at the library" -o /tmp/vocab_ex_read.aiff
ffmpeg -y -i /tmp/vocab_ex_read.aiff -acodec libmp3lame public/audio/week11/vocab_ex_read.mp3

# Generate collocation with correct pronunciation
say -v Samantha "reed a book" -o /tmp/vocab_coll_read.aiff
ffmpeg -y -i /tmp/vocab_coll_read.aiff -acodec libmp3lame public/audio/week11/vocab_coll_read.mp3
```

**Files Fixed:**
- `public/audio/week11/vocab_read.mp3` ✅
- `public/audio/week11/vocab_ex_read.mp3` ✅
- `public/audio/week11/vocab_coll_read.mp3` ✅
- `public/audio/week11_easy/vocab_read.mp3` ✅
- `public/audio/week11_easy/vocab_ex_read.mp3` ✅  
- `public/audio/week11_easy/vocab_coll_read.mp3` ✅

**Verification:**
```bash
# Test pronunciation manually
afplay public/audio/week11/vocab_read.mp3
# Should hear: "reed" /riːd/ (present tense) ✅
# NOT: "red" /rɛd/ (past tense) ❌
```

**When to Use This Method:**
1. Deepgram/Google TTS fails after 2-3 regeneration attempts
2. Word is a known homophone (read, live, close, tear, bow, lead, wind)
3. Context doesn't help engine choose correct pronunciation
4. Need guaranteed correct pronunciation for educational content

**Alternative Methods (Not Used):**
- ❌ Google TTS with SSML `<phoneme>` tags (403 Forbidden errors)
- ❌ Context-rich sentences (Deepgram still chose "red")
- ⚠️ Professional voice recording (time-consuming, not scalable)

**Prevention Going Forward:**
- Maintain list of problematic homophones requiring phonetic workarounds
- Test all homophone audio manually after generation
- Document phonetic spelling for each problematic word:
  - read → "reed" /riːd/ (present tense verb)
  - live → "liv" /lɪv/ (verb, not "laiv" adjective)
  - close → "klōz" /kloʊz/ (verb, not "klōs" adjective)

**Commit:** 6088062 (44 files changed: 42 audio + 2 code)

---

### **BUG 17: Video content mismatch - Theme alignment violation**

**Cause:**  
Week 11 Daily Watch video #5 was "If You're Happy And You Know It" (Super Simple Songs) - an **emotions/feelings song** that doesn't align with Week 11 theme: **"Weekend Fun Spots (Places)"**.

**Why This Happened:**
- During BUG 14 fix (YouTube video deletion), replaced with first available verified Super Simple Songs video
- Prioritized video availability (200 OK) over content relevance
- "If You're Happy" is about emotions, not about places kids visit on weekends

**Theme Mismatch Analysis:**
- **Week 11 Theme:** Weekend Fun Spots (park, library, zoo, supermarket, playground, restaurant)
- **Week 11 Vocabulary:** park, playground, school, library, supermarket, restaurant, zoo, play, read, buy
- **Video Content:** Emotions, feelings, clapping, stomping (NO place vocabulary)
- **Alignment:** 0% - Completely off-topic ❌

**Fix Applied:**
```javascript
// OLD (BUG 14 emergency replacement)
{ id: 5, videoId: "l4WwuJ0Oj3s", title: "If You're Happy And You Know It | Super Simple Songs" }

// NEW (Theme-aligned replacement)  
{ id: 5, videoId: "EfD2k9beP-4", title: "Town (Introduction of my town / village) - Kids vocabulary", duration: "02:40" }
```

**Why New Video is Better:**
- ✅ Teaches places vocabulary: town, village, library, park, store, school
- ✅ Aligns with Week 11 learning objectives (identifying places)
- ✅ Reinforces week vocabulary (park, library, school, supermarket)
- ✅ Verified stable (200 OK, educational channel)
- ✅ Appropriate length (2:40 - not too long)

**Verification:**
```bash
# Check video exists
curl -s -o /dev/null -w "%{http_code}" "https://img.youtube.com/vi/EfD2k9beP-4/mqdefault.jpg"
# Returns: 200 ✅

# Verify alignment with week vocabulary
grep -E "(park|library|school|supermarket|zoo|playground)" <<< "Town introduction video"
# Video covers: library, park, school, store (supermarket) ✅
```

**Prevention Rules:**
1. **NEVER prioritize availability over relevance**
   - Wrong: Find any working video from verified channels
   - Right: Find working video that teaches week vocabulary/theme

2. **Video Selection Criteria** (in order of priority):
   1. ✅ **Content alignment** - Must teach/reinforce week vocabulary
   2. ✅ **Theme relevance** - Must relate to week topic
   3. ✅ **Learning value** - Educational, not just entertainment
   4. ✅ **Availability** - 200 OK from verified stable channel
   5. ✅ **Length** - 2-8 minutes appropriate for kids

3. **Emergency Replacement Protocol:**
   - Step 1: Find 3-5 candidate videos about week theme
   - Step 2: Verify availability (200 status code)
   - Step 3: Watch first 30 seconds to confirm vocabulary alignment
   - Step 4: Check video matches week learning objectives
   - Step 5: Only then replace in daily_watch.js

4. **Weekly Content Audit:**
   ```bash
   # Check all videos align with week themes
   for week in {01..20}; do
     echo "=== Week $week ==="
     grep "title:" src/data/weeks/week_$week/daily_watch.js | head -1
     grep "vocabulary:" src/data/weeks/week_$week/vocab.js | head -1
   done
   ```

**Files Changed:**
- src/data/weeks/week_11/daily_watch.js (line 7)
- src/data/weeks_easy/week_11/daily_watch.js (line 7)

**Commit:** 6088062 (2 files changed)

---

### **BUG 18: MindMap Speaking audio collision — wrong audio plays across stems ("pic...pic..." stutter)**

**Cause (May 2026):**  
Branch audio URL was computed as `hash(branchText)` — the hash of the branch word alone.  
When the **same word** appears as a branch under **multiple stems** in the same week, all those branches map to the same R2 file path. Whichever stem's TTS call was first saves its audio at that path; every other stem then plays the **wrong** audio.

**Example:**
- Stem A: `"I am ___."`  Branch: `"happy"` → `hash("happy")` = `"3abc"`
- Stem B: `"My friend is ___."`  Branch: `"happy"` → `hash("happy")` = `"3abc"` ← **same path!**
- R2 stores only one file at `mindmap_branch_3abc.mp3`
- Stem B plays Stem A's audio → "I am happy." spoken when student meant "My friend is happy."

**Symptom:** Mindmap speaking exercise plays the same phrase repeatedly regardless of which stem is selected ("pic...pic..." loop effect). Branch audio sounds like it belongs to a different sentence.

**Root fix (commit `d60a4b81`):**  
Use `hash(fullSentence)` where `fullSentence = stemText.replace('___', branchText)`:
```javascript
// ✅ CORRECT (every stem+branch pair gets a unique hash)
const full = key.replace('___', b);  // e.g. "I am ___." + "happy" → "I am happy."
audio: `/audio/${folder}/mindmap_branch_${hashText(full)}.mp3`

// ❌ WRONG — same word under different stems shares a hash → R2 collision
audio: `/audio/${folder}/mindmap_branch_${hashText(b)}.mp3`
```

**Secondary fix — IndexedDB stale cache (commit `79d17b30`):**  
Even after fixing R2 URLs, old wrong blobs remained in the browser's IndexedDB TTS cache. Fixed by bumping `DB_VERSION` in `src/services/ttsCache.js`:
```javascript
// src/services/ttsCache.js
const DB_VERSION = 11;  // Was 10. Bump forces onupgradeneeded → deletes old object store
```
On next page load the old store is deleted + recreated, purging all stale blobs.

**Scale of fix:** 2232 branch audio URLs patched across 62 mindmap files (W1-31, ADV + Easy).

**Detection:**
```bash
# Find weeks where same hash appears under multiple stems (R2 collision)
node -e "
import('./src/data/weeks/week_N/mindmap.js').then(m => {
  const seen = {};
  for (const [stem, branches] of Object.entries(m.default.branchLabels)) {
    for (const b of branches) {
      const text = typeof b === 'string' ? b : b.text;
      const audio = typeof b === 'object' ? b.audio : null;
      if (audio) {
        const hash = audio.match(/mindmap_branch_([^.]+)\\.mp3/)?.[1];
        if (hash) {
          if (seen[hash]) console.log('⚠️ COLLISION:', hash, 'in', seen[hash], 'AND', stem);
          else seen[hash] = stem;
        }
      }
    }
  }
});
"
```

**Prevention:**
- ALWAYS generate branch audio with `hashText(fullSentence)` where `fullSentence = stemText.replace('___', branchText)`
- When changing audio URL scheme: bump `DB_VERSION` in `ttsCache.js` to force cache wipe
- Run collision audit after generating any new mindmap file

---

## 📊 PRODUCTION VERIFICATION CHECKLIST (Before Deploy)

```bash
# ✅ 1. AI Tutor imports added
grep -c "weekNRealData" src/components/ai_tutor/tabs/*.jsx
# Expected: 2 matches (StoryMissionTab + FreeTalkTab)

# ✅ 2. Audio files on R2
curl -I https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week09/vocab_city.mp3
# Expected: 200 OK

# ✅ 3. Images on R2  
curl -I https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/images/week09/city.jpg
# Expected: 200 OK

# ✅ 4. Videos have priority channels
grep "⭐" src/data/weeks/week_N/daily_watch.js
# Expected: 4-5 matches

# ✅ 5. Vocab paths use zero-padding
grep -c "week09" src/data/weeks/week_09/vocab.js
# Expected: 50+ matches (all paths)

# ✅ 6. No broken references
npm run build 2>&1 | grep -i "error\|warning"
# Expected: 0 errors, minimal warnings

# ✅ 7. Mindmap personal stems (≥3 per mode) — W2+
node -e "import('./src/data/weeks/week_N/mindmap.js').then(m => {
  const stems = m.default.centerStems.map(s => typeof s === 'string' ? s : s.text);
  const p = stems.filter(s => /^(I |My )/i.test(s));
  console.log('[ADV] Personal stems:', p.length >= 3 ? '✅' : '❌', p);
});"
node -e "import('./src/data/weeks_easy/week_N/mindmap.js').then(m => {
  const stems = m.default.centerStems.map(s => typeof s === 'string' ? s : s.text);
  const p = stems.filter(s => /^(I |My )/i.test(s));
  console.log('[EASY] Personal stems:', p.length >= 3 ? '✅' : '❌', p);
});"

# ✅ 8. Mindmap branch audio uses hash(fullSentence) — no collision
# Quick spot check: each branch hash should be unique across stems for the same word
node -e "
import('./src/data/weeks/week_N/mindmap.js').then(m => {
  const hashes = [];
  for (const branches of Object.values(m.default.branchLabels)) {
    for (const b of branches) {
      const a = typeof b === 'object' ? b.audio : null;
      if (a) hashes.push(a);
    }
  }
  const unique = new Set(hashes);
  console.log('Branch hashes: total', hashes.length, '| unique', unique.size, hashes.length === unique.size ? '✅ No collisions' : '❌ COLLISIONS FOUND');
});"
```

---
                                                               

*Chi tiết đầy đủ: `Production_FINAL/1. WEEK_PRODUCTION_PROMPT_V3.md`*
