# FIX ACTION PLAN - WEEK 1-2 AUDIT
## Ngày: 14 Tháng 1, 2026

**Mục tiêu:** Sửa các discrepancies giữa Master Prompt V24.2 và code thực tế trước khi tiếp tục Week 3+

---

## 📋 CHECKLIST FIXES

### ✅ PASS - Không cần sửa

- [x] **dictation.js schema** - Master Prompt Section 0.1.2 ĐÃ CHÍNH XÁC
- [x] **shadowing.js schema** - Master Prompt Section 0.1.3 ĐÃ CHÍNH XÁC  
- [x] **Image generation script** - `generate_images_nano.js` đã dùng Nano Banana đúng
- [x] **Week 2 real file** - `week_02_real.js` tồn tại và có cấu trúc đúng
- [x] **Ask AI Prompt 5** - "What does...?" là A0 hợp lệ

### 🔧 TODO - Cần sửa

- [ ] **Master Prompt: File count 14→15** (3 locations)
- [ ] **Master Prompt: Sentence count rules** (flexible 10-16 / 8-12)
- [ ] **validate_week.js: EXPECTED_FILES** (add week_real.js)
- [ ] **validate_week.js: expectedJs = 15** (not 14)
- [ ] **validate_week.js: Sentence count** (Line 271-275)

---

## 🎯 PRIORITY 1: Update Master Prompt V24.2

### Change 1: File Count (14 → 15 files)

**Locations to update:**
1. Line 70: `# (create all 14 JS files per mode)`
2. Line 93: `you MUST create **exactly 14 JS files**`
3. Line 521: `**After creating all 14 JS files per mode`

**New text:**
```markdown
you MUST create **exactly 15 JS files** for BOTH advanced and easy modes:
- 14 station files (vocab.js, read.js, explore.js, word_power.js, grammar.js, logic.js, writing.js, dictation.js, shadowing.js, word_match.js, mindmap.js, ask_ai.js, daily_watch.js, index.js)
- 1 syllabus data file (week_XX_real.js)
```

### Change 2: Add week_XX_real.js Documentation

**Insert after Section 0.1.3 (after line ~220):**

````markdown
---

### 0.1.4. ⚠️ CRITICAL: week_XX_real.js Schema (MANDATORY V24.2)

**Purpose:** 
This file contains OFFICIAL SYLLABUS DATA for the AI Tutor (Ms. Nova) to use during Story Missions. It is separate from the Story Mission structure files in `src/data/missions/`.

**Location:**
- `src/data/weeks/week_XX/week_XX_real.js` (Advanced mode)
- `src/data/weeks_easy/week_XX/week_XX_real.js` (Easy mode)

**Schema:**
```javascript
export const weekXXRealData = {
  // === METADATA ===
  week_id: XX,
  phase: 1,
  block: "A",
  unit: X,
  
  // === OFFICIAL SYLLABUS DATA ===
  week_title_en: "Week Title from Syllabus",
  week_title_vi: "Tiêu đề từ syllabus",
  
  topic: "Topic from syllabus",
  topic_vi: "Chủ đề",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Can [grammar pattern] to [communicative goal]",
  learning_outcome_vi: "Có thể [mẫu câu] để [mục tiêu giao tiếp]",
  
  // === GRAMMAR FOCUS (IMPLICIT) ===
  grammar_focus: "Pattern description",
  grammar_pattern: "[Subject] + [Verb] + [Object]",
  grammar_examples: [
    "Example sentence 1",
    "Example sentence 2",
    "Example sentence 3"
  ],
  
  // === TARGET VOCABULARY (7 words from syllabus) ===
  target_vocab: [
    {
      word: "word1",
      pronunciation: "/phonetic/",
      definition_vi: "Nghĩa tiếng Việt",
      definition_en: "English definition",
      example_sentence: "Example using word in context",
      example_vi: "Ví dụ tiếng Việt"
    },
    // ... 7 words total (MUST match syllabus_database.js for this week)
  ],
  
  // === STORY MISSIONS (3+ missions) ===
  story_missions: [
    {
      mission_id: "WXX_INTRO",
      title: "Mission Title",
      description: "Learn to use [pattern] naturally",
      level: "easy",
      target_words: ["word1", "word2", "word3"]
    },
    {
      mission_id: "WXX_PRACTICE",
      title: "Practice Mission",
      level: "normal",
      target_words: ["word3", "word4", "word5"]
    },
    {
      mission_id: "WXX_CHALLENGE",
      title: "Challenge Mission",
      level: "challenge",
      target_words: ["word6", "word7"]
    }
  ],
  
  // === PRONUNCIATION FOCUS ===
  pronunciation_focus: [
    { sound: "/sound/", words: ["word1", "word2"], tip: "How to pronounce" }
  ],
  
  // === FREE TALK SCENARIOS ===
  free_talk_scenarios: [
    {
      scenario: "Situation description",
      prompt: "Question to ask student",
      expected_grammar: "Pattern student should use"
    }
  ]
};
```

**Why This File Exists:**
- Ms. Nova (AI Tutor) needs to know the OFFICIAL syllabus vocabulary for each week
- Story Missions must teach specific grammar patterns from `syllabus_database.js`
- Ensures AI Tutor content aligns with curriculum (not randomly generated)

**Validation:**
```bash
# After creating week_XX_real.js, verify:
grep "export const week" src/data/weeks/week_XX/week_XX_real.js
# Should output: export const weekXXRealData = {

# Verify 7 target vocab:
grep -c "word:" src/data/weeks/week_XX/week_XX_real.js
# Should output: 7
```

**⚠️ CRITICAL:** This is the 15th file (not part of the 14 station files). Week must have:
- 14 station .js files (for 13 tabs)
- 1 week_XX_real.js file (AI Tutor syllabus data)
- 1 video_queries.json file
= **16 total files per mode**

---
````

### Change 3: Sentence Count Rules (Flexible Range)

**Location:** After Section 0.1.2 (around line 175-176)

**Current text:**
```markdown
- Advanced: 10 sentences
- Easy: 8 sentences
```

**New text:**
```markdown
- Advanced: 10-16 sentences (flexible based on topic complexity)
- Easy: 8-12 sentences (flexible based on topic complexity)

**Note:** Topic complexity may require more sentences:
- Simple topics (School, Colors): 10 sentences (advanced) / 8 sentences (easy)
- Complex topics (Family, Emotions): 12-16 sentences (advanced) / 10-12 sentences (easy)
- Validation rules should allow this flexibility
```

---

## 🎯 PRIORITY 2: Update validate_week.js

### Change 1: Add week_real.js to EXPECTED_FILES

**File:** `tools/validate_week.js`  
**Line:** 51-65

**Old:**
```javascript
const EXPECTED_FILES = [
  'vocab.js',
  'read.js',
  'explore.js',
  'word_power.js',
  'grammar.js',
  'logic.js',
  'writing.js',
  'dictation.js',
  'shadowing.js',
  'word_match.js',
  'mindmap.js',
  'ask_ai.js',
  'daily_watch.js',
  'index.js',
];
```

**New:**
```javascript
const EXPECTED_FILES = [
  'vocab.js',
  'read.js',
  'explore.js',
  'word_power.js',
  'grammar.js',
  'logic.js',
  'writing.js',
  'dictation.js',
  'shadowing.js',
  'word_match.js',
  'mindmap.js',
  'ask_ai.js',
  'daily_watch.js',
  'index.js',
  'week_real.js',  // ✅ Add AI Tutor syllabus data file
];
```

### Change 2: Update File Count (14 → 15)

**File:** `tools/validate_week.js`  
**Line:** 129

**Old:**
```javascript
const expectedJs = 14;
```

**New:**
```javascript
const expectedJs = 15;  // 14 station files + 1 week_real.js
```

### Change 3: Flexible Sentence Count Rules

**File:** `tools/validate_week.js`  
**Line:** 271-275

**Old:**
```javascript
async function validateSentenceCounts(weekNum, mode) {
  // ...
  const expectedMin = mode === 'easy' ? 8 : 10;
  const expectedMax = mode === 'easy' ? 8 : 11;
  
  const count = data.sentences.length;
  
  if (count < expectedMin || count > expectedMax) {
    return {
      pass: false,
      message: `Expected ${expectedMin}-${expectedMax} sentences, found ${count}`,
    };
  }
```

**New:**
```javascript
async function validateSentenceCounts(weekNum, mode) {
  // ...
  const expectedMin = mode === 'easy' ? 8 : 10;
  const expectedMax = mode === 'easy' ? 12 : 16;  // ✅ More flexible
  
  const count = data.sentences.length;
  
  if (count < expectedMin || count > expectedMax) {
    return {
      pass: false,
      message: `Expected ${expectedMin}-${expectedMax} sentences, found ${count}`,
    };
  }
  
  // ✅ Warning (not error) if beyond typical range
  const typicalMax = mode === 'easy' ? 10 : 12;
  if (count > typicalMax) {
    console.warn(`⚠️  Week ${weekNum} (${mode}) has ${count} sentences (typical: ${expectedMin}-${typicalMax}). Verify topic complexity justifies this.`);
  }
```

---

## 🎯 PRIORITY 3: Update generate_week.js (Optional)

**Status:** Week 2 was generated manually. If using `generate_week.js` for Week 3+:

### Add week_real.js to FILE_TYPES

**File:** `tools/generate_week.js`  
**Location:** Where FILE_TYPES array is defined

**Add:**
```javascript
const FILE_TYPES = [
  'vocab',
  'read',
  'explore',
  // ... other files
  'week_real',  // ✅ Add this
];
```

### Add generateWeekReal() function

```javascript
async function generateWeekReal(weekNum, mode) {
  // Load syllabus data
  const syllabusData = await loadSyllabusData(weekNum);
  
  const prompt = `
Create week_${weekNum}_real.js with:
- 7 target vocabulary from syllabus: ${syllabusData.vocab.join(', ')}
- Grammar pattern: ${syllabusData.grammar}
- Topic: ${syllabusData.topic}
- Learning outcome: ${syllabusData.learning_outcome}

Use schema from Section 0.1.4 of Master Prompt V24.2.
  `;
  
  // Generate content via GPT-4
  const content = await generateContent(prompt);
  
  // Save file
  const filePath = path.join(WEEK_DIR, `week_${weekNum}_real.js`);
  fs.writeFileSync(filePath, content);
  
  console.log(`✅ Generated week_${weekNum}_real.js`);
}
```

---

## ✅ VERIFICATION STEPS

After applying all fixes:

### 1. Verify Master Prompt Updated
```bash
grep -n "15 JS files" "5. ENGQUEST MASTER PROMPT V24.2-FINAL.txt"
# Should show multiple matches

grep -n "week_XX_real.js" "5. ENGQUEST MASTER PROMPT V24.2-FINAL.txt"
# Should show Section 0.1.4 documentation

grep -n "10-16 sentences" "5. ENGQUEST MASTER PROMPT V24.2-FINAL.txt"
# Should show updated sentence count rules
```

### 2. Verify validate_week.js Updated
```bash
grep "week_real.js" tools/validate_week.js
# Should appear in EXPECTED_FILES array

grep "expectedJs = 15" tools/validate_week.js
# Should output: const expectedJs = 15;

grep "expectedMax = mode === 'easy' ? 12 : 16" tools/validate_week.js
# Should show updated flexible range
```

### 3. Run Validation on Week 2
```bash
node tools/validate_week.js 2
# Should now PASS all checks (including 16 sentences)
```

### 4. Check Week 2 File Count
```bash
ls src/data/weeks/week_02/*.js | wc -l
# Should output: 15

ls src/data/weeks/week_02/ | wc -l  
# Should output: 16 (15 JS + 1 JSON)
```

---

## 📊 ESTIMATED TIME

| Task | Time | Priority |
|------|------|----------|
| Update Master Prompt V24.2 (3 changes) | 15 min | HIGH |
| Update validate_week.js (3 changes) | 10 min | HIGH |
| Test validation on Week 2 | 5 min | HIGH |
| Update generate_week.js (optional) | 20 min | LOW |
| **TOTAL** | **30-50 min** | |

---

## 🚀 NEXT STEPS AFTER FIXES

1. ✅ Apply all fixes above
2. ✅ Run `node tools/validate_week.js 2` → should PASS
3. ✅ Generate Week 2 assets: `bash tools/mass_produce_week.sh 2`
4. ✅ Start Week 3 production with corrected pipeline
5. ✅ Mass produce Weeks 4-54 using corrected workflow

---

## 📝 NOTES

- **Week 1** là golden standard về NỘI DUNG (content quality)
- **Week 19** là golden standard về CẤU TRÚC (file schema, station mapping)
- **Week 2** là golden standard về SCHEMAS (dictation/shadowing format)
- Các tuần sau phải kết hợp cả 3 standards

**Công thức:**
```
Week X = Week 19 Structure + Week 2 Schemas + Week X Topic (from syllabus)
```
