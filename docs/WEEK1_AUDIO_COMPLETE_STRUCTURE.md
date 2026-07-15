# WEEK 1 AUDIO STRUCTURE - COMPLETE ANALYSIS
**Date**: January 15, 2026  
**Purpose**: Document EXACT audio structure from Week 1 golden standard

---

## FOLDER STRUCTURE

```
/dist/audio/week1/               ← NO subfolders (NO easy/ or advanced/)
  ├── vocab_*.mp3                ← 10 files (word only)
  ├── vocab_def_*.mp3            ← 10 files (definition)
  ├── vocab_ex_*.mp3             ← 10 files (example)
  ├── vocab_coll_*.mp3           ← 10 files (collocation)
  ├── dictation_*.mp3            ← 10 files (sentences 1-10)
  ├── mindmap_branch_*.mp3       ← 36 files (branches 1-36)
  ├── mindmap_stem_*.mp3         ← 6 files (stems 1-6)
  ├── shadowing_*.mp3            ← 10 files (sentences 1-10)
  ├── shadowing_full.mp3         ← 1 file (full passage)
  ├── wordpower_*.mp3            ← 3 files (word/phrase)
  ├── wordpower_def_*.mp3        ← 3 files (definition)
  ├── wordpower_ex_*.mp3         ← 3 files (example)
  ├── wordpower_model_*.mp3      ← 3 files (model sentence)
  ├── wordpower_coll_*.mp3       ← 3 files (collocation)
  ├── ask_ai_*.mp3               ← 5 files (questions 1-5)
  ├── logic_*.mp3                ← 5 files (problems 1-5)
  ├── explore_main.mp3           ← 1 file (main passage)
  └── read_explore_main.mp3      ← 1 file (read station)
```

**Total**: 126 files

---

## DETAILED FILE LISTING (126 files)

### 1. VOCAB (40 files = 10 words × 4 types)

**Pattern**: `vocab_{word}.mp3`, `vocab_def_{word}.mp3`, `vocab_ex_{word}.mp3`, `vocab_coll_{word}.mp3`

```
vocab_backpack.mp3
vocab_book.mp3
vocab_classroom.mp3
vocab_library.mp3
vocab_name.mp3
vocab_notebook.mp3
vocab_school.mp3
vocab_scientist.mp3
vocab_student.mp3
vocab_teacher.mp3

vocab_def_backpack.mp3
vocab_def_book.mp3
vocab_def_classroom.mp3
vocab_def_library.mp3
vocab_def_name.mp3
vocab_def_notebook.mp3
vocab_def_school.mp3
vocab_def_scientist.mp3
vocab_def_student.mp3
vocab_def_teacher.mp3

vocab_ex_backpack.mp3
vocab_ex_book.mp3
vocab_ex_classroom.mp3
vocab_ex_library.mp3
vocab_ex_name.mp3
vocab_ex_notebook.mp3
vocab_ex_school.mp3
vocab_ex_scientist.mp3
vocab_ex_student.mp3
vocab_ex_teacher.mp3

vocab_coll_backpack.mp3
vocab_coll_book.mp3
vocab_coll_classroom.mp3
vocab_coll_library.mp3
vocab_coll_name.mp3
vocab_coll_notebook.mp3
vocab_coll_school.mp3
vocab_coll_scientist.mp3
vocab_coll_student.mp3
vocab_coll_teacher.mp3
```

**Data file reference** (vocab.js):
```javascript
{
  id: 1,
  word: "student",
  audio_word: "/audio/week1/vocab_student.mp3"  // ← Only word audio referenced
}
```

**NOTE**: Definition, example, collocation audio NOT referenced in data - generated separately!

---

### 2. DICTATION (10 files)

**Pattern**: `dictation_{1-10}.mp3`

```
dictation_1.mp3
dictation_2.mp3
dictation_3.mp3
dictation_4.mp3
dictation_5.mp3
dictation_6.mp3
dictation_7.mp3
dictation_8.mp3
dictation_9.mp3
dictation_10.mp3
```

**Data file reference** (dictation.js):
```javascript
export default {
  sentences: [
    { id: 1, text: "My name is Alex.", meaning: "..." }
    // NO audio field in data!
  ]
};
```

**NOTE**: Audio files exist but NOT referenced in data structure!

---

### 3. MINDMAP (42 files = 36 branches + 6 stems)

**Pattern**: `mindmap_branch_{1-36}.mp3`, `mindmap_stem_{1-6}.mp3`

```
mindmap_stem_1.mp3
mindmap_stem_2.mp3
mindmap_stem_3.mp3
mindmap_stem_4.mp3
mindmap_stem_5.mp3
mindmap_stem_6.mp3

mindmap_branch_1.mp3
mindmap_branch_2.mp3
mindmap_branch_3.mp3
... (up to 36)
```

**Data file reference** (mindmap.js):
```javascript
const mindMapContent = {
  centerStems: [
    "I am ___.",
    "My school is ___.",
    ...  // 6 stems
  ],
  branchLabels: {
    "I am ___.": [
      "a student",
      "happy at school",
      ...  // 6 branches per stem = 36 total
    ]
  }
};
```

**NOTE**: NO audio field in data! Audio numbered sequentially 1-36.

---

### 4. SHADOWING (11 files = 10 sentences + 1 full)

**Pattern**: `shadowing_{1-10}.mp3`, `shadowing_full.mp3`

```
shadowing_1.mp3
shadowing_2.mp3
shadowing_3.mp3
shadowing_4.mp3
shadowing_5.mp3
shadowing_6.mp3
shadowing_7.mp3
shadowing_8.mp3
shadowing_9.mp3
shadowing_10.mp3
shadowing_full.mp3
```

**Data file reference** (shadowing.js):
```javascript
export default {
  audio_full: "/audio/week1/shadowing_full_w1.mp3",  // ← Full passage
  sentences: [
    { id: 1, text: "My name is Alex.", vi: "...", audio_url: "/audio/week1/shadowing_1.mp3" },
    { id: 2, text: "...", vi: "...", audio_url: "/audio/week1/shadowing_2.mp3" },
    ...
  ]
};
```

**NOTE**: Audio IS referenced in shadowing data!

---

### 5. WORD POWER (15 files = 3 words × 5 types)

**Pattern**: `wordpower_{phrase}.mp3`, `wordpower_def_{phrase}.mp3`, `wordpower_ex_{phrase}.mp3`, `wordpower_model_{phrase}.mp3`, `wordpower_coll_{phrase}.mp3`

```
wordpower_do_homework.mp3
wordpower_go_to_school.mp3
wordpower_pay_attention.mp3

wordpower_def_do_homework.mp3
wordpower_def_go_to_school.mp3
wordpower_def_pay_attention.mp3

wordpower_ex_do_homework.mp3
wordpower_ex_go_to_school.mp3
wordpower_ex_pay_attention.mp3

wordpower_model_do_homework.mp3
wordpower_model_go_to_school.mp3
wordpower_model_pay_attention.mp3

wordpower_coll_do_homework.mp3
wordpower_coll_go_to_school.mp3
wordpower_coll_pay_attention.mp3
```

**Data file reference** (word_power.js):
```javascript
export default {
  words: [
    {
      id: 1,
      word: "do homework",
      definition_en: "...",
      example: "...",
      model_sentence: "...",
      collocation: "do your homework",
      // NO audio field!
    }
  ]
};
```

**NOTE**: Phrase uses underscore format: `do_homework`, `go_to_school`, `pay_attention`

---

### 6. ASK AI (5 files)

**Pattern**: `ask_ai_{1-5}.mp3`

```
ask_ai_1.mp3
ask_ai_2.mp3
ask_ai_3.mp3
ask_ai_4.mp3
ask_ai_5.mp3
```

---

### 7. LOGIC (5 files)

**Pattern**: `logic_{1-5}.mp3`

```
logic_1.mp3
logic_2.mp3
logic_3.mp3
logic_4.mp3
logic_5.mp3
```

---

### 8. EXPLORE (1 file)

**Pattern**: `explore_main.mp3`

```
explore_main.mp3
```

---

### 9. READ (1 file)

**Pattern**: `read_explore_main.mp3`

```
read_explore_main.mp3
```

---

## AUDIO FIELD MAPPING

| Station | Audio in Data? | Field Name | Pattern |
|---------|---------------|------------|---------|
| vocab.js | ✅ YES | `audio_word` | `/audio/week1/vocab_{word}.mp3` |
| vocab.js | ❌ NO | (def/ex/coll) | Generated separately |
| dictation.js | ❌ NO | - | `dictation_{1-10}.mp3` |
| mindmap.js | ❌ NO | - | `mindmap_branch_{1-36}.mp3` |
| shadowing.js | ✅ YES | `audio_url` | `/audio/week1/shadowing_{1-10}.mp3` |
| shadowing.js | ✅ YES | `audio_full` | `/audio/week1/shadowing_full.mp3` |
| word_power.js | ❌ NO | - | `wordpower_*_{phrase}.mp3` |
| ask_ai.js | ❌ NO | - | `ask_ai_{1-5}.mp3` |
| logic.js | ❌ NO | - | `logic_{1-5}.mp3` |
| explore.js | ❌ NO | - | `explore_main.mp3` |
| read.js | ❌ NO | `audio_url: null` | - |
| grammar.js | ❌ NO | - | NO AUDIO |
| word_match.js | ❌ NO | - | Uses vocab audio |
| daily_watch.js | ❌ NO | - | YouTube links only |
| writing.js | ❌ NO | - | NO AUDIO |

---

## CRITICAL RULES

1. **Folder**: `/audio/week{N}/` - NO underscore, NO zero-padding, NO subfolders
2. **Naming**: Lowercase, underscores for spaces in phrases
3. **Data files**: Only vocab.js and shadowing.js have audio references
4. **Total count**: 126 files for Advanced mode Week 1
5. **Easy mode**: Separate data files in `weeks_easy/week_01/` but uses SAME audio folder

---

## WEEK 2 REQUIREMENTS

For Week 2, generate 126 audio files in `/dist/audio/week2/` following EXACT pattern:

### Vocab (40 files):
- Words: mother, father, sister, brother, family, team, leader, helper, love, home
- Patterns: `vocab_{word}.mp3`, `vocab_def_{word}.mp3`, `vocab_ex_{word}.mp3`, `vocab_coll_{word}.mp3`

### Dictation (10 files):
- From dictation.js sentences 1-10 (reduce from 17 to 10)
- Pattern: `dictation_{1-10}.mp3`

### Mindmap (42 files):
- 6 stems + 36 branches
- Pattern: `mindmap_stem_{1-6}.mp3`, `mindmap_branch_{1-36}.mp3`

### Shadowing (11 files):
- 10 sentences + 1 full
- Pattern: `shadowing_{1-10}.mp3`, `shadowing_full.mp3`

### Word Power (15 files):
- 3 phrases × 5 types
- Pattern: `wordpower_{phrase}.mp3`, `wordpower_def_{phrase}.mp3`, etc.

### Ask AI (5 files):
- Pattern: `ask_ai_{1-5}.mp3`

### Logic (5 files):
- Pattern: `logic_{1-5}.mp3`

### Explore (1 file):
- Pattern: `explore_main.mp3`

### Read (1 file):
- Pattern: `read_explore_main.mp3`

**Total**: 126 files
