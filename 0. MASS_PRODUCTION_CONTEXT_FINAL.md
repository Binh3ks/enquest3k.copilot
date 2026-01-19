# ENGQUEST 3K - MASS PRODUCTION CONTEXT (FINAL)

**Version**: 1.0 FINAL  
**Date**: January 19, 2026  
**Purpose**: Complete reference for AI to generate Week 5-156  
**Read this FIRST**: All new chat sessions read this ONE file only

---

## 📋 TABLE OF CONTENTS

1. [App Architecture](#app-architecture)
2. [Week 4 Golden Standard](#week-4-golden-standard)
3. [Mass Production Workflow](#mass-production-workflow)
4. [Schemas Reference](#schemas-reference)
5. [One-Command Execution](#one-command-execution)
6. [Validation Rules](#validation-rules)
7. [Common Mistakes](#common-mistakes)

---

## 🏛️ APP ARCHITECTURE

### High-Level Overview

```
ENGQUEST 3K = Gamified English Learning App
├── 3 Years = 156 Weeks Total
├── Each Week = 29 Files
│   ├── 1 AI Tutor (week_XX_real.js) - 1,099 lines
│   ├── 14 Advanced Stations - ~400 lines
│   └── 14 Easy Stations - ~400 lines
├── Assets per Week
│   ├── 268 Audio files (138 Advanced + 130 Easy)
│   └── 30 Images (15 Advanced + 15 Easy)
└── Validation against Week 4 (Golden Standard)
```

### Tech Stack

**Frontend**:
- React 18.3.1 + Vite 6.0.5
- React Router 7.1.0
- Tailwind CSS 4.0.7
- LocalForage (storage)

**Backend/Assets**:
- OpenAI TTS (audio generation)
- OpenAI DALL-E 3 Nano (image generation)
- Node.js 23.6.1

**Data Structure**:
- All week data: `src/data/weeks/week_XX/`
- Easy mode: `src/data/weeks_easy/week_XX/`
- Syllabus: `src/data/syllabus_database.js` (hardcoded 156 weeks)

---

## 🏆 WEEK 4 GOLDEN STANDARD

### Why Week 4?

**Week 4 is the REFERENCE IMPLEMENTATION** (98/100 quality):
- ✅ Complete 29 files (1 AI Tutor + 28 stations)
- ✅ All schemas implemented correctly
- ✅ 268 audio files generated
- ✅ 30 images generated
- ✅ Fully tested in production
- ✅ Uses VARIANT schema (Week 4+ format)

### File Structure

```
src/data/
├── weeks/week_04/                    (Advanced Mode)
│   ├── vocab.js                      40 audio (10 words × 4 fields)
│   ├── word_power.js                 15 audio (3 phrases × 5 fields)
│   ├── word_match.js                 0 audio (pairs array)
│   ├── read.js                       1 audio (full passage)
│   ├── grammar.js                    10 audio (10 examples)
│   ├── dictation.js                  14 audio (14 sentences)
│   ├── shadowing.js                  15 audio (1 full + 14 sentences)
│   ├── writing.js                    1 audio (prompt)
│   ├── ask_ai.js                     0 audio (questions only)
│   ├── logic.js                      1 audio (story)
│   ├── explore.js                    1 audio (description)
│   ├── mindmap.js                    42 audio (6 stems + 36 branches)
│   ├── daily_watch.js                1 audio (narration)
│   └── video_queries.json            0 audio (queries only)
│   TOTAL: 14 files, 138 audio files
│
├── weeks_easy/week_04/               (Easy Mode)
│   ├── vocab.js                      40 audio (10 words × 4 fields)
│   ├── word_power.js                 15 audio (3 phrases × 5 fields)
│   ├── word_match.js                 0 audio
│   ├── read.js                       1 audio
│   ├── grammar.js                    10 audio
│   ├── dictation.js                  12 audio (12 sentences, not 14)
│   ├── shadowing.js                  13 audio (1 full + 12 sentences)
│   ├── writing.js                    1 audio
│   ├── ask_ai.js                     0 audio
│   ├── logic.js                      1 audio
│   ├── explore.js                    1 audio
│   ├── mindmap.js                    42 audio (6 stems + 36 branches, SAME as Advanced)
│   ├── daily_watch.js                1 audio
│   └── video_queries.json            0 audio
│   TOTAL: 14 files, 130 audio files
│
└── weeks/week_04_real.js             (AI Tutor)
    TOTAL: 1 file, 1,099 lines, 0 audio (AI uses TTS live)
```

### Critical Week 4 Facts

**Audio Fields (MOST IMPORTANT)**:
- ✅ vocab.js: **4 audio fields** per word (word, definition, example, collocation)
- ✅ word_power.js: **5 audio fields** per phrase (word, definition, example, collocation, model)
- ✅ mindmap.js: **42 audio files** (6 stems + 36 branches) in BOTH modes
- ⚠️ dictation.js/shadowing.js: **COPY sentences from read.js** (do NOT write new)

**AI Tutor Structure**:
- ✅ 10 target_vocab objects (not strings)
- ✅ 3 missions × (8-11 objectives + 2 invitations + 1 goodbye) = 33-42 objectives total
- ✅ Uses `ack_variants` (NOT ack_options)
- ✅ Uses `freetalk_knowledge` (NOT free_talk_knowledge)
- ✅ Goodbye objective has `type: "termination"`, `goodbye_en`, `goodbye_vi`, `canonical_question: ""`

**Easy Mode vs Advanced**:
- ✅ Easy HAS word_power.js (same structure as Advanced)
- ✅ Easy mindmap has 6 stems (SAME as Advanced, not 4)
- ✅ Easy dictation has 12 sentences (Advanced has 14)
- ✅ Easy read.js: 80-120 words (Advanced: 150-200 words)
- ✅ Easy grammar: present simple (Advanced: complex tenses)

---

## 🔄 MASS PRODUCTION WORKFLOW

### Complete 4-Step Process

```bash
# STEP 1: Generate Spec (5 minutes)
node MASS/tools/generate_spec.cjs 5
# → Creates MASS/SPECS/week_05_spec.json

# STEP 2: Generate AI Tutor (10-15 minutes)
node MASS/tools/generate_ai_tutor.cjs 5
# → Creates src/data/weeks/week_05_real.js (1,099 lines)

# STEP 3: Generate Stations (40-50 minutes)
node MASS/tools/create_week.cjs 5
# → Creates 28 station files (14 Advanced + 14 Easy)

# STEP 4: Validate (5 minutes)
node MASS/tools/validate_week_v2.cjs 5
# → Checks all 29 files against Week 4 golden standard
```

**Total Time**: ~60-75 minutes per week  
**Total Files**: 29 files per week  
**Total Weeks Remaining**: Week 5-156 = 152 weeks

---

### Step-by-Step Details

#### **STEP 1: Generate Spec**

**Command**:
```bash
cd /Users/binhnguyen/Downloads/Engquest3k
node MASS/tools/generate_spec.cjs 5
```

**What it does**:
1. Reads `src/data/syllabus_database.js`
2. Extracts Week 5 data: theme, CEFR level, grammar focus, vocab list
3. Creates `MASS/SPECS/week_05_spec.json` (locked data, AI cannot modify)

**Output**:
```json
{
  "week_id": 5,
  "title_en": "Daily Routines",
  "title_vi": "Thói quen hằng ngày",
  "cefr_level": "A0",
  "grammar_focus": "Present Simple (daily actions)",
  "target_vocab": [
    "wake up", "brush teeth", "eat breakfast",
    "go to school", "do homework", "go to bed",
    "wash hands", "get dressed", "play", "sleep"
  ],
  "theme": "Daily activities and routines for kids"
}
```

**Time**: 1 minute (automated)

---

#### **STEP 2: Generate AI Tutor**

**Command**:
```bash
node MASS/tools/generate_ai_tutor.cjs 5
```

**What script shows you**:
```
====================================
🤖 AI TUTOR GENERATOR - WEEK 5
====================================

✅ Spec file found: MASS/SPECS/week_05_spec.json

📚 STEP 1: Read These Prompts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. MASS/PROMPTS/01_MASTER_ORCHESTRATOR.txt
2. MASS/PROMPTS/04_AI_TUTOR_CORE.txt
3. MASS/PROMPTS/06_AI_TUTOR_SCHEMA_VARIANT.txt (Week 4+)
4. MASS/PROMPTS/07_AI_TUTOR_EXAMPLES.txt (if confused)

📋 STEP 2: Structure Guide
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Lines 1-20:    Metadata (week_id, theme, title, level)
Lines 20-120:  target_vocab (10 words as OBJECTS)
Lines 120-1000: 3 missions (each 8-11 objectives + 2 invitations + 1 goodbye)
Lines 1000-1099: freetalk_knowledge

✅ STEP 3: Critical Fields Checklist
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Required fields:
[ ] week_id: 5
[ ] theme: "Daily Routines"
[ ] target_vocab: Array of 10 OBJECTS (not strings!)
[ ] missions: Array of 3 mission objects
[ ] Each mission: theme, target_vocab, objectives array
[ ] ack_variants: Array of 6-8 strings (NOT ack_options!)
[ ] freetalk_knowledge: Object with week_number, week_title, arrays
[ ] Goodbye objective: type="termination", goodbye_en, goodbye_vi

⚠️  STEP 4: Common Mistakes (AVOID!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ❌ Using ack_options → ✅ Use ack_variants
2. ❌ Using free_talk_knowledge → ✅ Use freetalk_knowledge
3. ❌ target_vocab as strings → ✅ Use objects {word, def, ex}
4. ❌ Missing goodbye objective → ✅ Add termination objective
5. ❌ Missing target_vocab in mission → ✅ Add 3-4 words per mission

🎯 STEP 5: Generate week_05_real.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Load spec: MASS/SPECS/week_05_spec.json
Save to: src/data/weeks/week_05_real.js

⏳ Waiting for AI to generate file...
```

**Your job (AI)**:
1. Read 4 prompts shown by script
2. Load spec: `MASS/SPECS/week_05_spec.json`
3. Generate file following structure guide
4. Use checklist to verify all required fields
5. Avoid 10 common mistakes
6. Save to: `src/data/weeks/week_05_real.js`

**Output**: 1 file, ~1,099 lines

**Time**: 10-15 minutes (AI generation)

---

#### **STEP 3: Generate Stations**

**Command**:
```bash
node MASS/tools/create_week.cjs 5
```

**What script shows you**:
```
======================================================================
🚀 MASS PRODUCTION - STATION FILES ONLY - WEEK 5
======================================================================

⚠️  NOTE: This script generates STATIONS only (28 files)
   For AI Tutor: Run generate_ai_tutor.cjs separately

✅ Spec file found: MASS/SPECS/week_05_spec.json

📚 STEP 1: Read These Prompts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. MASS/PROMPTS/01_MASTER_ORCHESTRATOR.txt
2. MASS/PROMPTS/08_STATIONS_CORE.txt
3. MASS/PROMPTS/09_STATIONS_ADVANCED.txt (for Advanced mode)
4. MASS/PROMPTS/10_STATIONS_EASY.txt (for Easy mode)
5. MASS/PROMPTS/11_STATIONS_EXAMPLES.txt (if confused)

📝 STEP 2: Generate 28 Files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Advanced Mode (14 files):
  ✅ vocab.js         - 10 words × 4 audio fields = 40 audio
  ✅ word_power.js    - 3 phrases × 5 audio fields = 15 audio
  ✅ word_match.js    - pairs array [1,2,3,4,5,6,7,8,9,10]
  ✅ read.js          - 150-200 words, bold vocab, 3 check questions
  ✅ grammar.js       - 10 examples, pattern explanation
  ✅ dictation.js     - COPY 14 sentences from read.js
  ✅ shadowing.js     - COPY 14 sentences from read.js + full audio
  ✅ writing.js       - 1 prompt, word limit, helper words
  ✅ ask_ai.js        - 3 questions for AI Tutor
  ✅ logic.js         - Story + 3 questions
  ✅ explore.js       - Cultural exploration
  ✅ mindmap.js       - 6 stems × 6 branches = 42 audio
  ✅ daily_watch.js   - Short video scenario
  ✅ video_queries.json - 3 video queries

Easy Mode (14 files):
  ✅ vocab.js         - SAME structure, simpler words
  ✅ word_power.js    - SAME structure, simpler phrases
  ✅ word_match.js    - SAME pairs
  ✅ read.js          - 80-120 words (shorter than Advanced)
  ✅ grammar.js       - Simpler patterns (present simple)
  ✅ dictation.js     - COPY 12 sentences from read.js (not 14)
  ✅ shadowing.js     - COPY 12 sentences from read.js (not 14)
  ✅ writing.js       - Simpler prompt, lower word limit
  ✅ ask_ai.js        - Simpler questions
  ✅ logic.js         - Simpler story
  ✅ explore.js       - Simpler exploration
  ✅ mindmap.js       - 6 stems × 6 branches (SAME as Advanced!)
  ✅ daily_watch.js   - Simpler scenario
  ✅ video_queries.json - Simpler queries

⏳ Waiting for AI to generate 28 files...
```

**Your job (AI)**:
1. Read 5 prompts shown by script
2. Load spec: `MASS/SPECS/week_05_spec.json`
3. Generate 14 Advanced files (save to `src/data/weeks/week_05/`)
4. Generate 14 Easy files (save to `src/data/weeks_easy/week_05/`)
5. Follow audio field rules:
   - vocab.js: 4 audio per word
   - word_power.js: 5 audio per phrase
   - mindmap.js: 42 audio (6+36) in BOTH modes
6. COPY sentences for dictation/shadowing from read.js

**Output**: 28 files (~400-500 lines per mode)

**Time**: 40-50 minutes (AI generation)

---

#### **STEP 4: Validate**

**Command**:
```bash
node MASS/tools/validate_week_v2.cjs 5
```

**What script checks**:
1. ✅ File count: 29 files total (1 AI Tutor + 28 stations)
2. ✅ File names: match Week 4 naming convention
3. ✅ Schema fields: all required fields present
4. ✅ Audio counts: vocab 4 fields, word_power 5 fields, mindmap 42 files
5. ✅ Import test: no syntax errors
6. ✅ Week 4 comparison: structure matches golden standard

**Output**:
```
====================================
✅ VALIDATION PASSED - WEEK 5
====================================

File Count: 29/29 ✅
Schema Check: PASSED ✅
Audio Fields: CORRECT ✅
Import Test: NO ERRORS ✅
Week 4 Match: 98% ✅

Week 5 is ready for asset generation!
```

**Time**: 5 minutes (automated)

---

## 📝 SCHEMAS REFERENCE

### AI Tutor Schema (VARIANT - Week 4+)

**File**: `src/data/weeks/week_XX_real.js`

```javascript
export default {
  // Metadata (lines 1-20)
  week_id: 5,
  theme: "Daily Routines",
  title_en: "Daily Routines and Activities",
  title_vi: "Thói quen và hoạt động hằng ngày",
  cefr_level: "A0",
  
  // Target Vocab (lines 20-120) - MUST BE OBJECTS, NOT STRINGS!
  target_vocab: [
    {
      word: "wake up",
      definition_en: "to stop sleeping and become conscious",
      example_en: "I wake up at 7 AM every day."
    },
    // ... 10 words total
  ],
  
  // Missions (lines 120-1000)
  missions: [
    {
      mission_id: 1,
      theme: "Morning Routines",
      target_vocab: ["wake up", "brush teeth", "eat breakfast"],
      
      objectives: [
        // 8-11 regular objectives
        {
          objective_id: 1,
          type: "elicit_simple",
          question_variants: [
            "What time do you wake up?",
            "When do you usually wake up?",
            "What time do you get up?"
          ],
          target_vocab: "wake up",
          ack_variants: [
            "That's a good time!",
            "Nice! That's early!",
            "Cool! I wake up around that time too.",
            "Awesome! Morning person, I see!",
            "Great! That's perfect.",
            "I like that time!"
          ],
          follow_up_question: "Why do you wake up at that time?",
          model_answer_en: "I wake up at 7 AM because school starts at 8.",
          model_answer_vi: "Tôi thức dậy lúc 7 giờ sáng vì trường học bắt đầu lúc 8 giờ."
        },
        // ... 7-10 more objectives
        
        // 2 student question invitations
        {
          objective_id: 11,
          type: "student_question_invitation",
          question_en: "Do you have any questions about morning routines?",
          question_vi: "Bạn có câu hỏi gì về thói quen buổi sáng không?"
        },
        {
          objective_id: 12,
          type: "student_question_invitation",
          question_en: "Is there anything else you want to know?",
          question_vi: "Có điều gì khác bạn muốn biết không?"
        },
        
        // 1 goodbye objective
        {
          objective_id: 13,
          type: "termination",
          canonical_question: "",
          goodbye_en: "Great job! Let's move to the next mission!",
          goodbye_vi: "Làm tốt lắm! Chuyển sang nhiệm vụ tiếp theo nhé!"
        }
      ]
    },
    // ... 2 more missions (total 3)
  ],
  
  // FreeTalk Knowledge (lines 1000-1099)
  freetalk_knowledge: {
    week_number: 5,
    week_title: "Daily Routines",
    vocabulary_list: ["wake up", "brush teeth", ...],
    grammar_patterns: ["I wake up at...", "I usually..."],
    example_sentences: ["I wake up at 7 AM.", ...],
    common_phrases: ["in the morning", "at night", ...],
    cultural_notes: ["Vietnamese kids often wake up early for school..."]
  }
};
```

**Critical Fields**:
- ✅ `ack_variants` (NOT ack_options!)
- ✅ `freetalk_knowledge` (NOT free_talk_knowledge!)
- ✅ `target_vocab` as OBJECTS (NOT strings!)
- ✅ `question_variants` array with 3 questions (Week 4+)
- ✅ Goodbye objective with `type: "termination"`

---

### Station Schemas

#### **vocab.js** (Advanced & Easy - SAME structure)

```javascript
export default {
  vocab: [
    {
      id: 1,
      word: "wake up",
      pronunciation: "/weɪk ʌp/",
      definition_vi: "thức dậy",
      definition_en: "to stop sleeping and become conscious",
      example: "I wake up at 7 AM every day.",
      collocation: "wake up early",
      image_url: "/images/week5/wake_up.jpg",
      
      // ⭐ 4 AUDIO FIELDS (CRITICAL!)
      audio_word: "/audio/week5/vocab_wake_up.mp3",
      audio_definition: "/audio/week5/vocab_def_wake_up.mp3",
      audio_example: "/audio/week5/vocab_ex_wake_up.mp3",
      audio_collocation: "/audio/week5/vocab_coll_wake_up.mp3"
    },
    // ... 10 words total
  ]
};
```

**Audio Count**: 10 words × 4 audio = **40 audio files**

---

#### **word_power.js** (Advanced & Easy - SAME structure)

```javascript
export default {
  phrases: [
    {
      id: 1,
      word: "wake up early",
      definition: "to get out of bed at an early time",
      example: "I wake up early to exercise.",
      collocation: "wake up very early",
      
      // ⭐ 5 AUDIO FIELDS (CRITICAL!)
      audio_word: "/audio/week5/wordpower_wake_up_early.mp3",
      audio_definition: "/audio/week5/wordpower_def_wake_up_early.mp3",
      audio_example: "/audio/week5/wordpower_ex_wake_up_early.mp3",
      audio_collocation: "/audio/week5/wordpower_coll_wake_up_early.mp3",
      audio_model: "/audio/week5/wordpower_model_wake_up_early.mp3"
    },
    // ... 3 phrases total
  ]
};
```

**Audio Count**: 3 phrases × 5 audio = **15 audio files**

---

#### **mindmap.js** (Advanced & Easy - EXACTLY SAME!)

```javascript
export default {
  centerStems: [
    { text: "I wake up at ___.", audio: "/audio/week5/mindmap_stem_1.mp3" },
    { text: "I brush my teeth ___.", audio: "/audio/week5/mindmap_stem_2.mp3" },
    { text: "I eat ___ for breakfast.", audio: "/audio/week5/mindmap_stem_3.mp3" },
    { text: "I go to ___ in the morning.", audio: "/audio/week5/mindmap_stem_4.mp3" },
    { text: "I do my homework ___.", audio: "/audio/week5/mindmap_stem_5.mp3" },
    { text: "I go to bed at ___.", audio: "/audio/week5/mindmap_stem_6.mp3" }
  ],  // ⭐ 6 STEMS (BOTH MODES!)
  
  branchLabels: {
    "I wake up at ___.": [
      { text: "6 AM", audio: "/audio/week5/mindmap_branch_1.mp3" },
      { text: "7 AM", audio: "/audio/week5/mindmap_branch_2.mp3" },
      { text: "8 AM", audio: "/audio/week5/mindmap_branch_3.mp3" },
      { text: "early", audio: "/audio/week5/mindmap_branch_4.mp3" },
      { text: "late", audio: "/audio/week5/mindmap_branch_5.mp3" },
      { text: "on time", audio: "/audio/week5/mindmap_branch_6.mp3" }
    ],  // ⭐ 6 BRANCHES PER STEM
    // ... 5 more stems × 6 branches each
  }
};
```

**Audio Count**: 6 stems + (6 × 6 branches) = **42 audio files** (BOTH modes!)

---

#### **dictation.js** (COPY from read.js)

```javascript
export default {
  sentences: [
    { 
      id: 1, 
      text: "My name is Sam.",  // ⭐ EXACT sentence from read.js
      meaning: "Tên tôi là Sam.",
      audio_url: "/audio/week5/dictation_1.mp3"
    },
    { 
      id: 2, 
      text: "I wake up at 7 AM every day.",  // ⭐ EXACT sentence from read.js
      meaning: "Tôi thức dậy lúc 7 giờ sáng mỗi ngày.",
      audio_url: "/audio/week5/dictation_2.mp3"
    },
    // ... Advanced: 14 sentences, Easy: 12 sentences
  ]
};
```

**Rule**: DO NOT write new sentences! Copy from read.js passage!

---

#### **shadowing.js** (COPY from read.js)

```javascript
export default {
  title: "My Daily Routines",  // ⭐ SAME as read.js title
  audio_full: "/audio/week5/shadowing_full.mp3",
  script: [
    { 
      id: 1, 
      text: "My name is Sam.",  // ⭐ EXACT sentence from read.js
      vi: "Tên tôi là Sam.",
      audio_url: "/audio/week5/shadowing_1.mp3"
    },
    // ... Advanced: 14 sentences, Easy: 12 sentences
  ]
};
```

**Rule**: Same as dictation - COPY from read.js!

---

## 🎯 ONE-COMMAND EXECUTION

### For User: "Tạo tuần 5"

**AI Response** (auto-execute all 4 steps):

```bash
# Step 1: Generate spec
echo "📝 STEP 1: Generating spec for Week 5..."
node MASS/tools/generate_spec.cjs 5
echo "✅ Spec created: MASS/SPECS/week_05_spec.json\n"

# Step 2: Generate AI Tutor
echo "🤖 STEP 2: Generating AI Tutor..."
node MASS/tools/generate_ai_tutor.cjs 5
# (AI reads prompts shown, generates week_05_real.js)
echo "✅ AI Tutor created: src/data/weeks/week_05_real.js\n"

# Step 3: Generate Stations
echo "🏗️ STEP 3: Generating 28 station files..."
node MASS/tools/create_week.cjs 5
# (AI reads prompts shown, generates 28 files)
echo "✅ Stations created: 14 Advanced + 14 Easy\n"

# Step 4: Validate
echo "✔️ STEP 4: Validating all files..."
node MASS/tools/validate_week_v2.cjs 5
echo "✅ Validation passed!\n"

# Summary
echo "🎉 WEEK 5 COMPLETE!"
echo "   - 29 files generated"
echo "   - All schemas validated"
echo "   - Ready for asset generation"
echo ""
echo "Next steps:"
echo "  node tools/generate_audio.js 5 5"
echo "  node tools/generate_images_nano.js 5"
```

**Expected Output**:
```
📝 STEP 1: Generating spec for Week 5...
✅ Spec created: MASS/SPECS/week_05_spec.json

🤖 STEP 2: Generating AI Tutor...
📚 Reading prompts: 01, 04, 06, 07
🔨 Generating week_05_real.js (1,099 lines)
✅ AI Tutor created: src/data/weeks/week_05_real.js

🏗️ STEP 3: Generating 28 station files...
📚 Reading prompts: 01, 08, 09, 10
🔨 Generating 14 Advanced files...
🔨 Generating 14 Easy files...
✅ Stations created: 14 Advanced + 14 Easy

✔️ STEP 4: Validating all files...
✅ File count: 29/29
✅ Schema check: PASSED
✅ Audio fields: CORRECT
✅ Import test: NO ERRORS
✅ Week 4 match: 98%

🎉 WEEK 5 COMPLETE!
   - 29 files generated
   - All schemas validated
   - Ready for asset generation

Next steps:
  node tools/generate_audio.js 5 5
  node tools/generate_images_nano.js 5
```

**Total Time**: 60-75 minutes

---

## ✅ VALIDATION RULES

### File Count Check
- ✅ 1 AI Tutor file: `src/data/weeks/week_XX_real.js`
- ✅ 14 Advanced files: `src/data/weeks/week_XX/*.js`
- ✅ 14 Easy files: `src/data/weeks_easy/week_XX/*.js`
- ✅ **Total: 29 files**

### Schema Compliance
- ✅ vocab.js: 10 words × 4 audio fields = 40 audio
- ✅ word_power.js: 3 phrases × 5 audio fields = 15 audio
- ✅ mindmap.js: 6 stems + 36 branches = 42 audio (BOTH modes)
- ✅ dictation.js: sentences copied from read.js
- ✅ shadowing.js: sentences copied from read.js

### AI Tutor Validation
- ✅ week_id matches week number
- ✅ target_vocab: 10 OBJECTS (not strings)
- ✅ missions: exactly 3 missions
- ✅ Each mission: 8-11 objectives + 2 invitations + 1 goodbye
- ✅ Uses ack_variants (NOT ack_options)
- ✅ Uses freetalk_knowledge (NOT free_talk_knowledge)
- ✅ Goodbye objective has type="termination"

### Import Test
```bash
node -e "const w = require('./src/data/weeks/week_05_real.js'); console.log('✅ AI Tutor imports OK')"
node -e "const v = require('./src/data/weeks/week_05/vocab.js'); console.log('✅ Vocab imports OK')"
# ... test all 29 files
```

### Week 4 Comparison
- ✅ File names match Week 4 pattern
- ✅ Schema fields match Week 4 structure
- ✅ Audio counts match Week 4 counts
- ✅ Quality score: 95%+ (compared to Week 4's 98%)

---

## ⚠️ COMMON MISTAKES

### Mistake 1: Wrong Audio Field Count
❌ **Wrong**:
```javascript
// vocab.js with ONLY 1 audio field
{
  word: "happy",
  audio_word: "/audio/week5/vocab_happy.mp3"  // MISSING 3 audio fields!
}
```

✅ **Correct**:
```javascript
{
  word: "happy",
  audio_word: "/audio/week5/vocab_happy.mp3",
  audio_definition: "/audio/week5/vocab_def_happy.mp3",
  audio_example: "/audio/week5/vocab_ex_happy.mp3",
  audio_collocation: "/audio/week5/vocab_coll_happy.mp3"
}
```

---

### Mistake 2: Wrong Field Names (AI Tutor)
❌ **Wrong**:
```javascript
{
  ack_options: [...],  // OLD field name!
  free_talk_knowledge: {...}  // OLD field name with underscore!
}
```

✅ **Correct**:
```javascript
{
  ack_variants: [...],  // NEW field name (Week 4+)
  freetalk_knowledge: {...}  // NEW field name (no underscore)
}
```

---

### Mistake 3: target_vocab as Strings
❌ **Wrong**:
```javascript
target_vocab: ["wake up", "brush teeth", "eat breakfast"]  // STRINGS!
```

✅ **Correct**:
```javascript
target_vocab: [
  {
    word: "wake up",
    definition_en: "to stop sleeping",
    example_en: "I wake up at 7 AM."
  },
  // ... 10 objects
]
```

---

### Mistake 4: Missing Goodbye Objective
❌ **Wrong**:
```javascript
objectives: [
  { objective_id: 1, type: "elicit_simple", ... },
  // ... 10 objectives
  // MISSING goodbye objective!
]
```

✅ **Correct**:
```javascript
objectives: [
  { objective_id: 1, type: "elicit_simple", ... },
  // ... 10 objectives
  { objective_id: 11, type: "student_question_invitation", ... },
  { objective_id: 12, type: "student_question_invitation", ... },
  { 
    objective_id: 13, 
    type: "termination",
    canonical_question: "",
    goodbye_en: "Great job! Let's move to the next mission!",
    goodbye_vi: "Làm tốt lắm! Chuyển sang nhiệm vụ tiếp theo nhé!"
  }
]
```

---

### Mistake 5: Writing New Sentences for Dictation
❌ **Wrong**:
```javascript
// dictation.js with NEW sentences (not from read.js)
{
  sentences: [
    { text: "This is a completely new sentence." },  // NOT IN READ.JS!
    { text: "Another sentence I just made up." }     // NOT IN READ.JS!
  ]
}
```

✅ **Correct**:
```javascript
// dictation.js with COPIED sentences from read.js
{
  sentences: [
    { text: "My name is Sam." },  // ✅ From read.js line 1
    { text: "I wake up at 7 AM." }  // ✅ From read.js line 2
  ]
}
```

---

### Mistake 6: Wrong Mindmap Count (Easy Mode)
❌ **Wrong**:
```javascript
// Easy mode mindmap with only 4 stems
centerStems: [
  { text: "I like ___.", audio: "..." },
  { text: "I feel ___.", audio: "..." },
  { text: "I have ___.", audio: "..." },
  { text: "I am ___.", audio: "..." }  // ONLY 4 stems!
]
```

✅ **Correct**:
```javascript
// Easy mode mindmap with 6 stems (SAME as Advanced)
centerStems: [
  { text: "I like ___.", audio: "..." },
  { text: "I feel ___.", audio: "..." },
  { text: "I have ___.", audio: "..." },
  { text: "I am ___.", audio: "..." },
  { text: "I want ___.", audio: "..." },
  { text: "I play ___.", audio: "..." }  // 6 stems total!
]
```

---

### Mistake 7: Missing target_vocab in Mission
❌ **Wrong**:
```javascript
{
  mission_id: 1,
  theme: "Morning Routines",
  // MISSING target_vocab field!
  objectives: [...]
}
```

✅ **Correct**:
```javascript
{
  mission_id: 1,
  theme: "Morning Routines",
  target_vocab: ["wake up", "brush teeth", "eat breakfast"],  // 3-4 words
  objectives: [...]
}
```

---

### Mistake 8: Wrong question_variants Count
❌ **Wrong**:
```javascript
{
  type: "elicit_simple",
  question_variants: ["What time do you wake up?"]  // ONLY 1 variant!
}
```

✅ **Correct**:
```javascript
{
  type: "elicit_simple",
  question_variants: [
    "What time do you wake up?",
    "When do you usually wake up?",
    "What time do you get up?"  // 3 variants (Week 4+)
  ]
}
```

---

### Mistake 9: Wrong File Paths
❌ **Wrong**:
```javascript
audio_word: "/audio/vocab_happy.mp3"  // Missing week folder!
image_url: "/images/happy.jpg"         // Missing week folder!
```

✅ **Correct**:
```javascript
audio_word: "/audio/week5/vocab_happy.mp3"  // Include week5/
image_url: "/images/week5/happy.jpg"         // Include week5/
```

---

### Mistake 10: Easy Mode = No word_power
❌ **Wrong**:
```javascript
// Easy mode with NO word_power.js file
src/data/weeks_easy/week_05/
├── vocab.js
├── word_match.js
├── read.js
// ... MISSING word_power.js!
```

✅ **Correct**:
```javascript
// Easy mode WITH word_power.js (same structure as Advanced)
src/data/weeks_easy/week_05/
├── vocab.js
├── word_power.js  // ✅ MUST INCLUDE!
├── word_match.js
├── read.js
// ... all 14 files
```

---

## 📚 PROMPTS REFERENCE

### Prompt Files Location
All prompts in: `MASS/PROMPTS/`

### Read Order by Task

**For AI Tutor (Step 2)**:
1. `01_MASTER_ORCHESTRATOR.txt` - Overall workflow
2. `04_AI_TUTOR_CORE.txt` - Core concepts
3. `06_AI_TUTOR_SCHEMA_VARIANT.txt` - Week 4+ schema (or 05 for Week 1-3)
4. `07_AI_TUTOR_EXAMPLES.txt` - Examples (if confused)

**For Stations (Step 3)**:
1. `01_MASTER_ORCHESTRATOR.txt` - Overall workflow
2. `08_STATIONS_CORE.txt` - Core concepts
3. `09_STATIONS_ADVANCED.txt` - Advanced mode schemas
4. `10_STATIONS_EASY.txt` - Easy mode schemas
5. `11_STATIONS_EXAMPLES.txt` - Examples (if confused)

**For Validation (Step 4)**:
1. `14_WORKFLOW_VALIDATION.txt` - Validation rules
2. `15_WORKFLOW_TESTING.txt` - Testing commands

---

## 🎓 WEEK 4 VS WEEK 5 COMPARISON

### Similarities (What Stays Same)
- ✅ File count: 29 files
- ✅ File structure: Same folders and names
- ✅ Audio counts: Same field counts
- ✅ Schema format: VARIANT schema (Week 4+)
- ✅ Mindmap stems: 6 in both modes

### Differences (What Changes)
- ❌ Theme: "Feelings & Play" → "Daily Routines"
- ❌ Vocab: Different 10 words
- ❌ Grammar: Different focus patterns
- ❌ Content: Different stories, examples, questions
- ❌ Assets: Different audio/image files

### What to Copy from Week 4
- ✅ Structure (file names, folders)
- ✅ Schema (field names, field types)
- ✅ Audio counts (4 vocab, 5 word_power, 42 mindmap)
- ✅ Format (question_variants, ack_variants)

### What NOT to Copy from Week 4
- ❌ Content (stories, examples, questions)
- ❌ Vocab (use Week 5 spec vocab)
- ❌ Theme (use Week 5 spec theme)
- ❌ File paths (use week_05/ not week_04/)

---

## 🚀 QUICK START GUIDE

### For New Chat Sessions

1. **Read this file ONLY** (MASS_PRODUCTION_CONTEXT_FINAL.md)
2. **Wait for user command**: "Tạo tuần X"
3. **Execute 4-step workflow**:
   - Step 1: `node MASS/tools/generate_spec.cjs X`
   - Step 2: `node MASS/tools/generate_ai_tutor.cjs X`
   - Step 3: `node MASS/tools/create_week.cjs X`
   - Step 4: `node MASS/tools/validate_week_v2.cjs X`
4. **Report completion** with file count and validation status
5. **Suggest next steps**: asset generation

### Command Mapping

| User Says | AI Executes |
|-----------|-------------|
| "Tạo tuần 5" | Run 4-step workflow for Week 5 |
| "Generate Week 7" | Run 4-step workflow for Week 7 |
| "Create week 10" | Run 4-step workflow for Week 10 |
| "Tạo tuần 5-10" | Run workflow 6 times (Week 5 through 10) |

### Success Criteria

✅ **Week is complete when**:
- 29 files created
- All schemas validated
- Import tests pass
- Week 4 comparison: 95%+ match
- No syntax errors

---

## 📊 MASS PRODUCTION STATISTICS

### Remaining Work
- **Total Weeks**: 156 weeks (3 years)
- **Completed**: Week 1-4 (4 weeks)
- **Remaining**: Week 5-156 (152 weeks)
- **Time Estimate**: 60-75 min/week × 152 weeks = **152-190 hours**
- **Files to Generate**: 29 files/week × 152 weeks = **4,408 files**

### Production Rate
- **Optimal**: 3 weeks/day = ~50 days to complete
- **Realistic**: 2 weeks/day = ~75 days to complete
- **Conservative**: 1 week/day = ~150 days to complete

### Quality Targets
- **Week 4 Quality**: 98/100 (golden standard)
- **Target Quality**: 95/100 minimum
- **Acceptable Range**: 90-100/100
- **Rejection Threshold**: <85/100 (regenerate)

---

## 🎯 FINAL CHECKLIST

### Before Starting Week X

- [ ] Read MASS_PRODUCTION_CONTEXT_FINAL.md (this file)
- [ ] Understand Week 4 golden standard
- [ ] Know 4-step workflow by heart
- [ ] Review 10 common mistakes
- [ ] Check Week X-1 is complete (for reference)

### During Generation

- [ ] Follow prompts shown by each script
- [ ] Load correct spec file
- [ ] Use Week 4 schema format
- [ ] Copy sentences for dictation/shadowing
- [ ] Use correct audio field counts

### After Generation

- [ ] Run validation script
- [ ] Check file count: 29 files
- [ ] Test imports: no errors
- [ ] Review 5 random files for quality
- [ ] Compare with Week 4: 95%+ match

### Quality Gates

- [ ] All required fields present
- [ ] No hallucinated content
- [ ] Follows spec data exactly
- [ ] Audio paths match counts
- [ ] Easy mode properly simplified

---

## 📞 SUPPORT & REFERENCES

### Key Documents
1. **This file** (MASS_PRODUCTION_CONTEXT_FINAL.md) - Complete context
2. `MASS_PRODUCTION_WORKFLOW_COMPLETE.md` - Detailed workflow
3. `WEEK4_DRY_RUN_PROOF.md` - Week 4 verification proof
4. `AI_TUTOR_SCHEMA_AUDIT.md` - AI Tutor schema fixes
5. `MASS/PROMPTS/01_MASTER_ORCHESTRATOR.txt` - Prompt orchestrator

### File Locations
- **Scripts**: `MASS/tools/`
- **Prompts**: `MASS/PROMPTS/`
- **Specs**: `MASS/SPECS/`
- **Templates**: `MASS/TEMPLATES/`
- **Output**: `src/data/weeks/` and `src/data/weeks_easy/`

### Week 4 Reference Files
- AI Tutor: `src/data/weeks/week_04_real.js`
- Advanced vocab: `src/data/weeks/week_04/vocab.js`
- Easy vocab: `src/data/weeks_easy/week_04/vocab.js`
- Advanced mindmap: `src/data/weeks/week_04/mindmap.js`
- Easy mindmap: `src/data/weeks_easy/week_04/mindmap.js`

---

## ✅ READY TO START

You are now ready to generate Week 5-156!

**When user says**: "Tạo tuần 5"

**You execute**:
1. `node MASS/tools/generate_spec.cjs 5`
2. `node MASS/tools/generate_ai_tutor.cjs 5` (read prompts shown)
3. `node MASS/tools/create_week.cjs 5` (read prompts shown)
4. `node MASS/tools/validate_week_v2.cjs 5`

**Expected time**: 60-75 minutes

**Expected output**: 29 files, validated, ready for assets

---

**END OF CONTEXT DOCUMENT**

---

**Version History**:
- v1.0 (Jan 19, 2026): Initial complete context document
  - Includes Week 4 golden standard
  - Includes 4-step workflow
  - Includes all schemas
  - Includes 10 common mistakes
  - Ready for mass production
