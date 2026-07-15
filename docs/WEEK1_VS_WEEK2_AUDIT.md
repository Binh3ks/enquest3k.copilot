# WEEK 1 vs WEEK 2 STRUCTURE AUDIT
**Date**: January 15, 2026  
**Purpose**: Identify all inconsistencies between Week 1 (golden standard) and Week 2

---

## CRITICAL FINDINGS

### 1. AUDIO PATH INCONSISTENCY ❌

**Week 1 (CORRECT)**:
```javascript
audio_word: "/audio/week1/vocab_student.mp3"
```

**Week 2 (WRONG)**:
```javascript
audio_word: "/audio/week2/vocab_mother.mp3"
```

**Issue**: Week 1 uses `week1` (no underscore), Week 2 uses `week2`
**Expected Pattern**: `/audio/week{N}/` where N has NO leading zero and NO underscore

---

### 2. AUDIO FILE NAMING CONVENTION

**Week 1 Pattern (GOLDEN STANDARD)**:

| Station | Pattern | Example |
|---------|---------|---------|
| Vocab - Word | `vocab_{word}.mp3` | `vocab_student.mp3` |
| Vocab - Definition | `vocab_def_{word}.mp3` | `vocab_def_student.mp3` |
| Vocab - Example | `vocab_ex_{word}.mp3` | `vocab_ex_student.mp3` |
| Vocab - Collocation | `vocab_coll_{word}.mp3` | `vocab_coll_student.mp3` |
| Dictation | `dictation_{id}.mp3` | `dictation_1.mp3` |
| Mindmap Branch | `mindmap_branch_{id}.mp3` | `mindmap_branch_1.mp3` |
| Word Power - Collocation | `wordpower_coll_{phrase}.mp3` | `wordpower_coll_do_homework.mp3` |
| Word Power - Example | `wordpower_ex_{phrase}.mp3` | `wordpower_ex_do_homework.mp3` |
| Word Power - Model | `wordpower_model_{phrase}.mp3` | `wordpower_model_do_homework.mp3` |

**Week 1 Total Audio Files**: 126 files in `/dist/audio/week1/`

---

### 3. DATA FILE STRUCTURE COMPARISON

#### 3.1 READ.JS

**Week 1**:
```javascript
export default {
  title: "Alex's School Day",
  image_url: "/images/week1/read_cover_w01.jpg",
  content_en: "...",
  content_vi: "...",
  audio_url: null,  // ← No audio for read passage
  comprehension_questions: [...]
}
```

**Week 2**:
```javascript
export default {
  title: "My Family Squad",
  image_url: "/images/week2/read_cover_w02.jpg",  // ← INCONSISTENT: week2 vs week1
  content_en: "...",
  content_vi: "...",
  audio_url: "/audio/week2/placeholder.mp3",  // ← WRONG: should be null or week2
  comprehension_questions: [...]
}
```

**Issues**:
- ❌ Image path: `week2` vs `week1` (inconsistent numbering)
- ❌ Audio placeholder when should be `null`

---

#### 3.2 VOCAB.JS

**Week 1 Structure** (CORRECT):
```javascript
export default {
  vocab: [
    {
      id: 1,
      word: "student",
      pronunciation: "/ˈstuːdənt/",
      definition_vi: "Học sinh",
      definition_en: "A person who is learning at a school or university.",
      example: "I am a student at Greenwood School.",
      collocation: "good student",
      image_url: "/images/week1/student.jpg",
      audio_word: "/audio/week1/vocab_student.mp3"  // ← Pattern: week{N}
    }
  ]
}
```

**Week 2 Structure**:
```javascript
export default {
  vocab: [
    {
      id: 1,
      word: "mother",
      pronunciation: "/ˈmʌðər/",
      definition_vi: "Mẹ",
      definition_en: "A female parent.",
      example: "My mother makes the best cookies for my friends.",
      collocation: "loving mother",
      image_url: "/images/week2/mother.jpg",  // ← WRONG: week2 vs week1
      audio_word: "/audio/week2/vocab_mother.mp3"  // ← WRONG PATH
    }
  ]
}
```

**Issues**:
- ❌ All paths use `week2` instead of `week1` pattern
- ❌ Should be `/audio/week2/vocab_mother.mp3` (consistent with week1 = week{N})

---

#### 3.3 DICTATION.JS

**Week 1**:
```javascript
export default {
  sentences: [
    { id: 1, text: "My name is Alex.", meaning: "Tên tôi là Alex." },
    { id: 2, text: "I am a student...", meaning: "..." },
    ...
    // Total: 10 sentences ONLY
  ]
};
```

**Week 2**:
```javascript
export default {
  sentences: [
    { id: 1, text: "My family is like a team.", meaning: "..." },
    { id: 2, text: "I call them my family squad.", meaning: "..." },
    ...
    // Total: 17 sentences ← TOO MANY! Should be 10 max
  ]
};
```

**Issues**:
- ❌ Week 2 has 17 sentences, should be 10 (matching Week 1)
- ❌ Missing audio paths (Week 1 has NO audio field in dictation, audio generated separately)

---

#### 3.4 MINDMAP.JS

**Week 1 Structure**:
```javascript
const mindMapContent = {
  centerStems: [
    "I am ___.",
    "My school is ___.",
    ...
    // Total: 6 stems
  ],
  branchLabels: {
    "I am ___.": [
      "a student",
      "happy at school",
      ...
      // 6 branches per stem
    ],
    ...
  }
};

export default mindMapContent;
```

**Audio Pattern**: 
- `mindmap_branch_1.mp3` through `mindmap_branch_36.mp3` (6 stems × 6 branches = 36 files)
- NO audio field in data structure - audio files named by sequential ID

**Week 2**: *(Need to check structure)*

---

#### 3.5 GRAMMAR.JS

**Week 1**:
```javascript
export default {
  grammar_explanation: { ... },
  exercises: [
    { id: 1, type: "fill", question: "...", answer: "...", hint: "..." },
    { id: 2, type: "mc", question: "...", options: [...], answer: "...", hint: "..." },
    { id: 3, type: "unscramble", question: "...", words: [...], answer: "...", hint: "..." },
    ...
    // Total: 20 exercises
    // 30% Affirmative (6), 30% Negative (6), 40% Questions (8)
  ]
};
```

**NO audio field** in grammar exercises (Week 1 has no grammar audio)

---

### 4. FOLDER STRUCTURE

**Week 1 Actual Paths**:
```
/dist/audio/week1/            ← Audio files location (126 files)
/images/week1/                ← Image files location
/src/data/weeks/week_01/      ← Data files (with underscore)
/src/data/weeks_easy/week_01/ ← Easy mode data files
```

**Pattern Rules**:
- Data folders: `week_01` (with underscore and zero-padding)
- Audio/Image paths in code: `/audio/week1/` (NO underscore, NO zero-padding)

---

### 5. AUDIO GENERATION RULES FROM WEEK 1

**Files that NEED audio**:

| Station | Audio Type | Count | Pattern |
|---------|-----------|-------|---------|
| vocab.js | Word pronunciation | 10 | `vocab_{word}.mp3` |
| vocab.js | Definition | 10 | `vocab_def_{word}.mp3` |
| vocab.js | Example sentence | 10 | `vocab_ex_{word}.mp3` |
| vocab.js | Collocation phrase | 10 | `vocab_coll_{word}.mp3` |
| dictation.js | Sentences | 10 | `dictation_{1-10}.mp3` |
| mindmap.js | Branches | 36 | `mindmap_branch_{1-36}.mp3` |
| word_power.js | Collocations | 3 | `wordpower_coll_{phrase}.mp3` |
| word_power.js | Examples | 3 | `wordpower_ex_{phrase}.mp3` |
| word_power.js | Model sentences | 3 | `wordpower_model_{phrase}.mp3` |
| shadowing.js | Sentences | 10 | `shadowing_{1-10}.mp3` |
| explore.js | Passage sentences | ~10 | `explore_sent_{1-10}.mp3` |
| logic.js | Problem audio | ~5 | `logic_{1-5}.mp3` |
| ask_ai.js | Questions | ~5 | `ask_ai_{1-5}.mp3` |
| writing.js | Prompts | ~3 | `writing_prompt_{1-3}.mp3` |

**Total**: ~126 audio files per week (Advanced mode)

**Files that DON'T need audio**:
- read.js (only image, no audio)
- grammar.js (no audio)
- word_match.js (uses vocab audio)
- daily_watch.js (YouTube links only)

---

### 6. WEEK 2 REQUIRED FIXES

#### Fix 1: Update all paths from `week2` → `week2` (consistent with week1 pattern)

**Files to fix**:
- read.js
- vocab.js  
- mindmap.js
- dictation.js
- word_power.js
- shadowing.js
- explore.js
- logic.js
- ask_ai.js
- writing.js

**Pattern**:
```javascript
// WRONG
image_url: "/images/week2/mother.jpg"
audio_word: "/audio/week2/vocab_mother.mp3"

// CORRECT
image_url: "/images/week2/mother.jpg"  // Keep week2 (no underscore, no zero)
audio_word: "/audio/week2/vocab_mother.mp3"
```

#### Fix 2: Reduce dictation.js from 17 sentences to 10

Match Week 1 structure: exactly 10 dictation sentences

#### Fix 3: Remove placeholder audio URLs

Replace:
```javascript
audio_url: "/audio/week2/placeholder.mp3"
```

With:
```javascript
audio_url: null
```

(OR generate actual audio if needed)

#### Fix 4: Generate audio files with correct naming

Create 126 audio files in `/dist/audio/week2/` following Week 1 pattern

---

## SUMMARY OF ISSUES

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Audio path inconsistency (week2 vs week1 pattern) | 🔴 CRITICAL | To Fix |
| 2 | Image path inconsistency | 🔴 CRITICAL | To Fix |
| 3 | Dictation has 17 sentences (should be 10) | 🟡 MEDIUM | To Fix |
| 4 | Placeholder audio URLs | 🟡 MEDIUM | To Fix |
| 5 | Missing 126 audio files | 🔴 CRITICAL | To Generate |
| 6 | Audio generation script uses wrong patterns | 🔴 CRITICAL | To Fix |

---

## NEXT STEPS

1. ✅ Create this audit document
2. ⏳ Fix Week 2 data files to match Week 1 structure
3. ⏳ Update audio generation script with correct patterns
4. ⏳ Update Prompt V26 with exact audio naming conventions
5. ⏳ Generate Week 2 audio files (126 files)
6. ⏳ Validate Week 2 matches Week 1 golden standard
