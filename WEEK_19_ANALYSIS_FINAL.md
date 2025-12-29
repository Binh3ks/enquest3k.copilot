# MASTER PROMPT UPDATE - WEEK 19 ANALYSIS (3 ROUNDS)

## EXECUTIVE SUMMARY

Sau 3 lượt rà soát chi tiết week 19 và Blueprint, phát hiện Master Prompt V23 THIẾU NHIỀU requirements critical. Document này update TẤT CẢ findings vào prompt.

---

## I. FINDINGS CHI TIẾT (FROM WEEK 19 + BLUEPRINT)

### 1. READ.JS (Main Story) - THIẾU REQUIREMENTS

**Week 19 Verified:**
```javascript
content_en: "When I **was** a child, my town **was** very different... **treasure**." 
// Has EXACTLY 10 bold words: was, quiet, fields, trees, kindergarten, born, games, simple, memory, treasure

comprehension_questions: [
  { id: 1, question_en: "...", answer: ["It was quiet and calm.", "Quiet and calm."], hint_en: "...", hint_vi: "..." },
  { id: 2, question_en: "...", answer: ["..."], hint_en: "...", hint_vi: "..." },
  { id: 3, question_en: "...", answer: ["..."], hint_en: "...", hint_vi: "..." }
] // EXACTLY 3 questions
```

**Blueprint Requirements:**
- "10 Bold Words: Bắt buộc in đậm 10 từ vựng cốt lõi trong bài đọc để làm điểm neo kiến thức"
- "comprehension_questions" array for reading check

**Master Prompt Status:** ❌ **THIẾU** - Không mention 10 bold words, không mention comprehension_questions structure

**Action Required:** Add to prompt:
- CRITICAL: MUST have EXACTLY 10 bold words using `**word**` syntax
- MANDATORY: 3 comprehension_questions with answer array, hint_en/vi

---

### 2. EXPLORE.JS (CLIL Content) - THIẾU REQUIREMENTS

**Week 19 Verified:**
```javascript
content_en: "Every person **was** once a tiny baby. When you **were** **born**..."
// Has EXACTLY 10 bold words: was, were, born, parents, grew, steps, words, look back (scattered naturally)

check_questions: [
  { id: 1, question_en: "What were you like as a baby?", answer: ["Very small.", "..."], hint_en: "...", hint_vi: "..." },
  { id: 2, question_en: "Who was there to help you?", answer: ["Your parents.", "..."], hint_en: "...", hint_vi: "..." },
  { id: 3, question_en: "What were your first words probably?", answer: ["Mama or dada.", "..."], hint_en: "...", hint_vi: "..." }
], // EXACTLY 3 check questions

question: {
  text_en: "What is your earliest memory from when you were very young?",
  text_vi: "Ký ức sớm nhất của bạn từ khi còn rất nhỏ là gì?",
  min_words: 20,
  hint_en: "When I was very young, I remember...",
  hint_vi: "Khi tôi còn rất nhỏ, tôi nhớ..."
} // MANDATORY open-ended question
```

**Blueprint Requirements:**
- "10 Bold Words" (same as read.js)
- "array of check_questions, and a final open-ended question for critical response"

**Master Prompt Status:** ❌ **THIẾU** - Chỉ có content_en/vi, không mention bold words/check_questions/open question

**Action Required:** Add complete schema with:
- 10 bold words MANDATORY
- 3 check_questions array
- 1 open-ended question object (text_en/vi, min_words, hint_en/vi)

---

### 3. GRAMMAR.JS - ĐÚNG NHƯNG CẦN NHỚ MẠNH

**Week 19 Verified:**
- EXACTLY 20 exercises (mix: 10 mc, 5 fill, 5 unscramble)
- NO audio files generated (grammar is text-only exercises)

**Master Prompt Status:** ⚠️ **PARTIALLY CORRECT** - Mention 20 exercises nhưng không nói rõ NO AUDIO

**Action Required:** Add note:
- **CRITICAL:** Grammar tab does NOT generate audio (exercises only)
- Counts as 0 audio files in total count

---

### 4. LOGIC.JS - CẦN NHỚ MẠNH CONTEXT

**Week 19 Verified:**
```javascript
puzzles: [
  {
    id: 1, type: "math",
    title_en: "Birthday Candles", // Descriptive title
    question_en: "Last year, Tom was 7 years old. He had 7 candles on his cake. This year, how many candles will he have?", 
    // ↑ FULL CONTEXT: Character (Tom), scenario (birthday), narrative structure
    question_vi: "Năm ngoái, Tom 7 tuổi. Cậu ấy có 7 ngọn nến trên bánh...",
    answer: ["8 candles", "Eight candles", "8"], // Multiple acceptable answers
    target_number: 8, unit: "candles",
    hint_en: "7 + 1", hint_vi: "7 cộng 1"
  },
  { id: 2, type: "logic", question_en: "Baby → Child → Teenager → Adult. What comes after 'Child'?", ... },
  { id: 3, type: "mc", question_en: "Grandma has 12 old photos. She gives 4 photos to Mom...", options: [...], ... },
  { id: 4, type: "logic", question_en: "Which one is from the past? (Smartphone / Vinyl record / Tablet)", ... },
  { id: 5, type: "math", question_en: "In the family photo from 2010, there were 4 people...", ... }
] // EXACTLY 5 puzzles, ALL with rich context
```

**Blueprint Requirements:**
- "Luôn có context (ngữ cảnh) cho các câu hỏi, theo đúng văn phong bản xứ"
- NOT bare math: "5 - 2 = ?" ❌
- YES storytelling: "Tom had 5 apples. He gave 2 to his sister..." ✅

**Master Prompt Status:** ⚠️ **WEAK** - Mention context nhưng chưa đủ mạnh, no examples

**Action Required:** Add STRONG emphasis:
- **CRITICAL:** Every puzzle MUST have narrative context (character names, scenario)
- Show examples: Tom had apples vs bare math
- Morphing: Phase 1 (5 puzzles), Phase 2 (7 puzzles), Phase 3 (10 puzzles)

---

### 5. ASK_AI.JS - CẦN NHỚ MẠNH CONTEXT

**Week 19 Verified:**
```javascript
prompts: [
  {
    id: 1,
    context_en: "You are looking at your parents' old wedding photo. The picture is in black and white, and your parents look very young. You want to know about that day.",
    // ↑ RICH SCENARIO: Setting (wedding photo), details (black & white), purpose (want to know)
    context_vi: "Bạn đang xem ảnh cưới cũ của bố mẹ. Bức ảnh đen trắng...",
    audio_url: "/audio/week19/ask_ai_1.mp3",
    answer: ["How old were you?", "What was the weather like?", "Were you happy?"], // Example questions student might ask
    hint: "How old... / What was..."
  },
  { id: 2, context_en: "Grandpa shows you a photo of his old school. It looks very different from your school. It was a small wooden building with no computers.", ... },
  { id: 3, context_en: "You found your mom's old toy box in the attic. There were dolls, wooden blocks, and no electronic games. You are curious about her childhood.", ... },
  { id: 4, context_en: "Dad tells you he was born in a small village. Now that village is a big city with tall buildings. You want to know more about his birthplace.", ... },
  { id: 5, context_en: "You are watching old family videos from when you were a baby. You see yourself crying and laughing. You want to ask your parents about that time.", ... }
] // EXACTLY 5 prompts, ALL with detailed scenarios (30-50 words each)
```

**Blueprint Requirements:**
- "Must provide scenario/situation, not direct questions"
- NOT: "What are old photos like?" ❌
- YES: "You found an old photo album. The pictures are black and white..." ✅

**Master Prompt Status:** ⚠️ **WEAK** - Mention context nhưng không có examples

**Action Required:** Add STRONG emphasis:
- **CRITICAL:** context_en must be 30-50 words rich scenario
- NOT simple questions - MUST be situations student experiences
- Show examples from week 19

---

### 6. DICTATION.JS & SHADOWING.JS - ĐÃ ĐÚNG

**Week 19 Verified:**
- dictation.js: 8 sentences (id 1-8)
- shadowing.js: SAME 8 sentences (id 1-8), SAME text
- Both extracted from read.js story

**Master Prompt Status:** ✅ CORRECT - Already states "EXACT same sentences"

**Action Required:** ✅ Keep current instruction, no changes needed

---

### 7. MINDMAP.JS - AUDIO NAMING ISSUE

**Week 19 Verified Structure:**
```javascript
centerStems: [
  "When I was young, I ___.",  // Stem 1 → audio: mindmap_stem_1.mp3
  "My favorite memory was ___.",  // Stem 2 → audio: mindmap_stem_2.mp3
  "There was a place where I ___.",  // Stem 3 → audio: mindmap_stem_3.mp3
  "My family was ___.",  // Stem 4 → audio: mindmap_stem_4.mp3
  "I was happy because ___.",  // Stem 5 → audio: mindmap_stem_5.mp3
  "In the past, life was ___."  // Stem 6 → audio: mindmap_stem_6.mp3
], // 6 stems

branchLabels: {
  "When I was young, I ___.": [
    "played with my friends",  // Branch 1 → audio: mindmap_branch_1.mp3
    "lived in a small house",  // Branch 2 → audio: mindmap_branch_2.mp3
    "went to kindergarten",  // Branch 3 → audio: mindmap_branch_3.mp3
    "loved my toys",  // Branch 4 → audio: mindmap_branch_4.mp3
    "was very curious",  // Branch 5 → audio: mindmap_branch_5.mp3
    "had a pet dog"  // Branch 6 → audio: mindmap_branch_6.mp3
  ],
  "My favorite memory was ___.": [
    "my birthday party",  // Branch 7 → audio: mindmap_branch_7.mp3
    "playing in the rain",  // Branch 8 → audio: mindmap_branch_8.mp3
    // ... branches 9-12
  ],
  // ... continues to branch 36
}
```

**Audio Naming:**
- Stems: `mindmap_stem_1.mp3` to `mindmap_stem_6.mp3` (6 files)
- Branches: `mindmap_branch_1.mp3` to `mindmap_branch_36.mp3` (36 files, SEQUENTIAL not nested)
- Total: 42 audio files

**Master Prompt Status:** ❌ **WRONG** - Says "mindmap_center_*.mp3" but should be "mindmap_stem_*.mp3"

**Action Required:** Fix audio naming in prompt:
- Stems: `mindmap_stem_[1-6].mp3` (NOT center)
- Branches: `mindmap_branch_[1-36].mp3` (sequential count across all stems)

---

### 8. WRITING.JS - ĐÃ ĐÚNG

**Week 19 Verified:**
```javascript
{
  title: "My Childhood Memory",
  min_words: 40,
  model_sentence: "When I was five years old, I lived in a small house. There was a big garden...",
  instruction_en: "Write about a happy memory from when you were younger.",
  instruction_vi: "Viết về một kỷ niệm vui từ khi bạn còn nhỏ.",
  prompt_en: "Where were you? Who was with you? What was special about that time?",
  prompt_vi: "Bạn ở đâu? Ai ở cùng bạn? Điều gì đặc biệt về thời gian đó?",
  keywords: ["was", "were", "memory", "happy", "when I was"]
}
```

**Master Prompt Status:** ✅ CORRECT structure in prompt

**Action Required:** ✅ No changes needed

---

### 9. DAILY_WATCH.JS (Videos) - ĐÃ FIX

**Week 19 Verified:**
- 5 videos (id 1-5)
- All có videoId, title, duration, sim_duration, thumb

**Master Prompt Status:** ✅ ALREADY UPDATED to "EXACTLY 5 videos (MANDATORY)"

**Action Required:** ✅ No changes needed

---

### 10. AUDIO COUNT - CẦN UPDATE

**Week 19 Real Count:**
```
read_explore_main.mp3: 1
explore_main.mp3: 1
vocab (10 words × 4 each): 40
  - vocab_{word}.mp3
  - vocab_def_{word}.mp3
  - vocab_ex_{word}.mp3
  - vocab_coll_{word}.mp3
word_power (3 words × 4 each): 12
  - wordpower_{word}.mp3
  - wordpower_def_{word}.mp3
  - wordpower_ex_{word}.mp3
  - wordpower_model_{word}.mp3 (if has model_sentence)
dictation: 8
shadowing: 8 + 1 full = 9
logic: 5
ask_ai: 5
mindmap: 6 stems + 36 branches = 42
grammar: 0 (NO AUDIO for exercises)
----------------------
TOTAL: 131 files (if all fields present)
```

**Variable Factors:**
- Dictation/shadowing count depends on read.js sentence extraction (typically 8)
- Vocab collocation is optional (some words may not have)
- Word_power model_sentence is optional
- **Typical range: 120-135 files per mode**

**Master Prompt Status:** ⚠️ Says "~120-130" which is close but not explaining variability

**Action Required:** Update with breakdown:
- Base formula: 2 read/explore + 40 vocab + 12 word_power + 8 dictation + 9 shadowing + 5 logic + 5 ask_ai + 42 mindmap + 0 grammar = ~123 base
- Variable: ±8 depending on optional fields (collocation, model_sentence, dictation count)
- Typical: 120-135 per mode

---

## II. WEEK 1 SPECIFIC ISSUES

### ❌ Week 1 Read.js - MISSING COMPONENTS
```javascript
// Current (WRONG):
{
  title_en: "The Young Scholar",
  content_en: `My name is Alex. I am a student...`, // NO BOLD WORDS ❌
  content_vi: `...`,
  audio_url: "/audio/week01/read_explore_main.mp3"
  // MISSING: comprehension_questions array ❌
}

// Should be (CORRECT):
{
  title_en: "The Young Scholar",
  content_en: `My name is **Alex**. I am a **student** in a big **school**. My **school** has many **classrooms** and a **library**. I love reading **books** in the **library**. Every day, I bring my **backpack**, **pencils**, and **notebooks** to class.`, // 10 bold words ✅
  content_vi: `...`,
  audio_url: null,
  comprehension_questions: [ // ✅ ADD THIS
    { id: 1, question_en: "What is Alex?", answer: ["A student", "Student"], hint_en: "Alex is a...", hint_vi: "Alex là..." },
    { id: 2, question_en: "What does Alex love to do in the library?", answer: ["Read books", "Reading books"], hint_en: "Alex loves...", hint_vi: "Alex thích..." },
    { id: 3, question_en: "What does Alex want to be?", answer: ["A scientist", "Scientist"], hint_en: "Alex wants to be a...", hint_vi: "Alex muốn trở thành..." }
  ]
}
```

### ❌ Week 1 Explore.js - MISSING COMPONENTS
```javascript
// Current (WRONG):
{
  title_en: "Tools Scientists Use",
  content_en: `Scientists use special tools...`, // NO BOLD WORDS ❌
  content_vi: `...`,
  audio_url: "/audio/week01/explore_main.mp3",
  image_url: "/images/week01/explore_cover_w01.jpg"
  // MISSING: check_questions array ❌
  // MISSING: question object ❌
}

// Should be (CORRECT):
{
  title_en: "Tools Scientists Use",
  content_en: `**Scientists** use special **tools** to help them learn about the world. A **magnifying glass** makes small things look bigger. A **microscope** helps scientists see **tiny** things that we cannot see with our eyes. **Thermometers** measure **temperature** to tell us if something is hot or cold. **Rulers** and measuring tapes help scientists measure size and **distance**. **Test tubes** hold liquids for experiments.`, // 10 bold words ✅
  content_vi: `...`,
  check_questions: [ // ✅ ADD THIS
    { id: 1, question_en: "What makes small things look bigger?", answer: ["A magnifying glass", "Magnifying glass"], hint_en: "A magnifying...", hint_vi: "Kính..." },
    { id: 2, question_en: "What do thermometers measure?", answer: ["Temperature"], hint_en: "Thermometers measure...", hint_vi: "Nhiệt kế đo..." },
    { id: 3, question_en: "What holds liquids for experiments?", answer: ["Test tubes"], hint_en: "Test...", hint_vi: "Ống..." }
  ],
  question: { // ✅ ADD THIS
    text_en: "Which scientist tool would you like to use? Why?",
    text_vi: "Bạn muốn sử dụng công cụ khoa học nào? Tại sao?",
    min_words: 20,
    hint_en: "I would like to use... because...",
    hint_vi: "Tôi muốn dùng... vì..."
  },
  audio_url: null,
  image_url: "/images/week01/explore_cover_w01.jpg"
}
```

### ✅ Week 1 Mindmap - ALREADY FIXED
- Structure changed from flat array to nested object ✅
- 6 stems × 6 branches = 36 branches ✅

### ✅ Week 1 Videos - ALREADY FIXED
- 5 videos with video_queries.json ✅

---

## III. BROWSER CONSOLE ERRORS ANALYSIS

### Error: "Cannot read properties of undefined (reading 'replace')" in Dictation

**Root Cause:** DictationEngine.jsx line 110 calls `s.text.replace()` but data.sentences might be undefined

**Fixes Required:**
1. **Data side:** Ensure week 1 dictation.js has valid structure:
   ```javascript
   export default {
     sentences: [ // MUST exist
       { id: 1, text: "Sentence 1.", meaning: "..." },
       // ... 8 items
     ]
   };
   ```

2. **Code side:** DictationEngine.jsx should have null check:
   ```jsx
   {data.sentences && data.sentences.map((s, idx) => (
     // ... existing code
   ))}
   ```
   ✅ Code already has this check, so issue is likely data.sentences is undefined in week 1

**Action:** Check week 1 dictation.js file

---

## IV. COMPREHENSIVE MASTER PROMPT UPDATES NEEDED

### Section Updates Required:

1. **read.js schema** (line ~315):
   - ✅ ADD: "CRITICAL: MUST have EXACTLY 10 bold words using \\*\\*word\\*\\* syntax"
   - ✅ ADD: comprehension_questions array with full schema

2. **explore.js schema** (line ~334):
   - ✅ ADD: "CRITICAL: MUST have EXACTLY 10 bold words"
   - ✅ ADD: check_questions array (3 items)
   - ✅ ADD: question object (open-ended)

3. **grammar.js note** (line ~360):
   - ✅ ADD: "CRITICAL: Grammar exercises do NOT generate audio (0 audio files)"

4. **logic.js section** (line ~470):
   - ✅ STRENGTHEN: Context requirements with examples
   - ✅ ADD: Morphing counts (Phase 1: 5, Phase 2: 7, Phase 3: 10)

5. **ask_ai.js section** (line ~510):
   - ✅ STRENGTHEN: Scenario requirements (30-50 words rich context)
   - ✅ ADD: Examples from week 19

6. **mindmap.js audio section** (line ~575):
   - ✅ FIX: "mindmap_center_*.mp3" → "mindmap_stem_*.mp3"
   - ✅ CLARIFY: Branch numbering is sequential 1-36 across all stems

7. **Audio count section** (line ~670):
   - ✅ UPDATE: Formula breakdown with variability explanation
   - ✅ ADD: "Typical range: 120-135 per mode"

8. **Final checklist** (line ~710):
   - ✅ ADD: "read.js has 10 bold words + 3 comprehension_questions?"
   - ✅ ADD: "explore.js has 10 bold words + 3 check_questions + 1 open question?"
   - ✅ ADD: "grammar.js has 20 exercises (NO AUDIO)?"
   - ✅ ADD: "logic/ask_ai have rich context (30-50 words scenarios)?"

---

## V. IMMEDIATE ACTION ITEMS

### URGENT (Now):
1. ✅ Update master prompt sections 1-8 above
2. ⚠️ Fix week 1 read.js (add bold words + comprehension_questions)
3. ⚠️ Fix week 1 explore.js (add bold words + check_questions + open question)
4. ⚠️ Verify week 1 dictation.js has sentences array

### HIGH (Today):
5. 📋 Test week 1 in browser after data fixes
6. 📋 Verify audio count matches new formula (120-135 range)
7. 📋 Create validation script to check 10 bold words in read/explore

### MEDIUM (This week):
8. 📋 Update all existing weeks 2-20 to have bold words if missing
9. 📋 Document scaffolding/morphing progression for all stations
10. 📋 Create week template generator with all new requirements

---

## VI. VALIDATION COMMANDS (UPDATED)

```bash
# Check bold words in read.js
grep -o '\*\*[^*]*\*\*' src/data/weeks/week_01/read.js | wc -l
# Should return: 10 (exactly)

# Check comprehension_questions exists
grep -c 'comprehension_questions:' src/data/weeks/week_01/read.js
# Should return: 1

# Check explore check_questions
grep -c 'check_questions:' src/data/weeks/week_01/explore.js
# Should return: 1

# Check explore open question
grep -c 'question:' src/data/weeks/week_01/explore.js
# Should return: 1

# Check grammar exercise count
grep -c '"id":' src/data/weeks/week_01/grammar.js
# Should return: 20 (exactly)

# Check audio files (should be 120-135 range)
find public/audio/week1 -name "*.mp3" | wc -l
find public/audio/week1_easy -name "*.mp3" | wc -l

# Check mindmap structure (nested object)
grep -A 3 'branchLabels:' src/data/weeks/week_01/mindmap.js
# Should show: { "stem text": [...] }
```

---

## VII. SUMMARY

**Total Issues Found:** 8 major + 3 week-1-specific
**Master Prompt Updates Needed:** 8 sections
**Week 1 Data Fixes Needed:** 3 files (read.js, explore.js, verify dictation.js)

**Priority:** All findings are HIGH priority - affect data structure consistency across 144 weeks.

**Next Step:** Update master prompt first, then fix week 1 data, then batch-update existing weeks 2-20.
