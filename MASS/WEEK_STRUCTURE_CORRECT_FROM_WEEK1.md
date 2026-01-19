# ✅ CẤU TRÚC WEEK CHÍNH XÁC - DỰA TRÊN WEEK 1 CODE

**Date**: January 18, 2026  
**Source**: Line-by-line audit of Week 1 actual code  
**Purpose**: Template CHÍNH XÁC cho mass production Week 5-156

---

## 🎯 TỔNG QUAN - MỖI WEEK GỒM 3 PHẦN

### 1. AI TUTOR DATA (1 file - SHARED cho cả 2 modes)
- **File**: `src/data/weeks/week_XX_real.js`
- **Size**: ~576-1100 lines
- **Contains**: 5 TABS (không phải 1!)
  1. **Story Tab**: 3 missions với objectives
  2. **Chat Tab**: freetalk_knowledge base
  3. **Quiz Tab**: KHÔNG CÓ trong file (generated from target_vocab)
  4. **Speak Tab**: KHÔNG CÓ trong file (generated from target_vocab)
  5. **Debate Tab**: KHÔNG CÓ trong file (future feature)

**⚠️ CRITICAL**: AI Tutor file KHÔNG chứa Quiz/Speak/Debate data riêng!
- Quiz questions: Auto-generated từ `target_vocab` array (pronunciation, definitions)
- Speak prompts: Auto-generated từ `target_vocab` array  
- Debate: Chưa implement

### 2. STATIONS - ADVANCED MODE (15 files)
- **Folder**: `src/data/weeks/week_XX/`
- **Purpose**: Nội dung cho các learning tabs trong app
- **Files**: 14 .js files + 1 .json file

### 3. STATIONS - EASY MODE (16+ files)
- **Folder**: `src/data/weeks_easy/week_XX/`
- **Purpose**: Simplified content cho Easy mode
- **Files**: 15-16 .js files (NO video_queries.json)
- **Note**: Easy mode có NHIỀU files hơn (quiz.js, wordpower.js duplicate)

---

## 📁 PART 1: AI TUTOR FILE STRUCTURE

### File: `week_XX_real.js` (~576-1100 lines)

```javascript
export const weekXRealData = {
  // === METADATA ===
  week_id: X,
  phase: 1,
  block: "A",
  unit: X,
  week_number: X,
  
  // === TITLES ===
  week_title_en: "...",
  week_title_vi: "...",
  topic: "...",
  topic_vi: "...",
  
  // === LEARNING OUTCOME ===
  learning_outcome: "...",
  learning_outcome_vi: "...",
  
  // === GRAMMAR ===
  grammar_focus: "...",
  grammar_pattern: "...",
  grammar_examples: ["...", "...", "..."],
  
  // === TARGET VOCAB (10 words) ===
  // ⚠️ CRITICAL: PHẢI CÓ pronunciation + both definitions cho Quiz/Speak tabs!
  target_vocab: [
    {
      word: "student",
      pronunciation: "/ˈstuːdənt/",  // MANDATORY for Quiz/Speak
      definition_vi: "Học sinh",      // MANDATORY for Quiz
      definition_en: "A person who is learning at a school.",  // MANDATORY for Quiz/Speak
      example: "I am a student.",
      syllabus_context: "Identity - Role"
    },
    // ... 9 more words (total 10)
  ],
  
  // === GLOBAL VOCAB (simple array) ===
  global_vocab: ["student", "teacher", "school", ...],
  
  // === STORY MISSIONS (3 missions) ===
  story_missions: [
    {
      mission_id: 1,
      title: "...",
      title_vi: "...",
      theme: "...",
      nova_greeting: "...",
      mission_context: "...",
      target_vocab: ["word1", "word2", ...],
      grammar_pattern: "...",
      
      objectives: [
        {
          stepKey: "student_name",
          category: "Identity",
          
          // Week 1-3: Use canonical_question (single)
          canonical_question: "What is your name?",
          hints: ["name", "is", "My", "I", "am"],
          
          // Week 4+: Use question_variants (3 variants)
          // question_variants: [
          //   { question: "What is your name?", hints: [...] },
          //   { question: "Can you tell me your name?", hints: [...] },
          //   { question: "What do I call you?", hints: [...] }
          // ],
          
          target_keywords: ["my", "name", "is"],
          ack_options: ["Nice!", "Great!"],
          recast_templates: ["Your name is {name}!"],
          success_criteria: "Student says their name"
        },
        // ... 8-10 more objectives
        
        // Student Question Invitation (every 3-4 objectives)
        {
          stepKey: "student_question_1",
          category: "Student Inquiry",
          type: "invitation",
          canonical_question: "Do you have a question for me?",
          target_keywords: ["question", "ask", "yes", "no"],
          allow_skip: true
        },
        
        // Goodbye (last objective)
        {
          stepKey: "goodbye",
          category: "Closing",
          type: "termination",
          goodbye_en: "Great job! ... Bye!",
          goodbye_vi: "Tuyệt lắm! ... Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 10,  // Week 1-3: 8-10, Week 4+: 12-20
      maximum_turns: 12,
      expected_duration: "10-15 minutes"
    },
    // Mission 2: ...
    // Mission 3: ...
  ],
  
  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "...",
    week_number: X,
    theme: "...",
    knowledge_base: [
      "Topic 1 knowledge...",
      "Topic 2 knowledge...",
      // ...
    ],
    example_opening_questions: [
      "Question 1?",
      "Question 2?",
      // ...
    ],
    freetalk_context: `Week ${X} is about ... The student has learned: ...`
  },
  
  notes: `📚 SYLLABUS ALIGNMENT NOTES: ...`
};

export default weekXRealData;
```

### Key Points:

1. **Target Vocab MUST Have Full Info**:
   - `pronunciation`: Required for Quiz/Speak tabs
   - `definition_vi`: Required for Quiz tab
   - `definition_en`: Required for Quiz/Speak tabs
   - Without these, Quiz/Speak tabs CANNOT work!

2. **Question Format Changes**:
   - Week 1-3: `canonical_question` (single question)
   - Week 4+: `question_variants` (3 variants per objective)

3. **Turn Limits Increase**:
   - Week 1-3: 8-12 turns per mission
   - Week 4+: 12-20 turns per mission

4. **Quiz/Speak/Debate NOT in File**:
   - Quiz: Auto-generated from `target_vocab`
   - Speak: Auto-generated from `target_vocab`
   - Debate: Future feature (not implemented yet)

---

## 📁 PART 2: STATIONS - ADVANCED MODE (15 files)

### File List với Audio Counts:

```
week_XX/
├── vocab.js         (~115 lines)  - 10 words × 1 audio = 10 audio
├── read.js          (~36 lines)   - Story content + 1 audio
├── grammar.js       (~38 lines)   - 20 exercises (NO audio)
├── dictation.js     (~18 lines)   - 14 sentences × 1 audio = 14 audio
├── shadowing.js     (~20 lines)   - 14 sentences × 1 audio + 1 full = 15 audio
├── writing.js       (~10 lines)   - Writing prompt (NO audio)
├── ask_ai.js        (~44 lines)   - 5 prompts × 1 audio = 5 audio
├── logic.js         (~49 lines)   - 5 puzzles × 1 audio = 5 audio
├── explore.js       (~37 lines)   - Science content (0-1 audio)
├── word_power.js    (~40 lines)   - 3 phrases (NO audio!)
├── word_match.js    (~30 lines)   - Matching game (NO audio!)
├── mindmap.js       (~62 lines)   - 6 stems + 36 branches = 42 audio
├── daily_watch.js   (~9 lines)    - 5 videos (NO audio files)
├── index.js         (~46 lines)   - Main export
└── video_queries.json (~45 lines) - Video search queries
```

**Total Audio Files**: 10 + 1 + 14 + 15 + 5 + 5 + 42 + 1 = **93 audio files minimum**

---

### FILE 1: vocab.js (~115 lines)

**Schema**:
```javascript
export default {
  vocab: [
    {
      id: 1,
      word: "student",
      pronunciation: "/ˈstuːdənt/",
      definition_vi: "Học sinh",
      definition_en: "A person who is learning at a school.",
      example: "I am a student at Greenwood School.",
      collocation: "good student",
      image_url: "/images/week1/student.jpg",
      audio_word: "/audio/week1/vocab_student.mp3"  // ONLY 1 audio!
    },
    // ... 9 more (total 10)
  ]
};
```

**⚠️ CRITICAL**:
- **ONLY** `audio_word` field (NO audio_phonetic, NO audio_example, NO audio_collocation!)
- 10 words exactly
- Each word needs 1 image + 1 audio

**Audio Count**: 10 files
- `vocab_{word}.mp3` × 10

---

### FILE 2: read.js (~36 lines)

**Schema**:
```javascript
export default {
  title: "...",
  image_url: "/images/week1/read_cover_w01.jpg",
  content_en: "My name is Alex. I am 8 years old. I am a student. ... (100-150 words)",
  content_vi: "...",
  check_questions: [
    {
      id: 1,
      question_en: "What is the boy's name?",
      answer: ["Alex", "alex"],
      hint_en: "It starts with 'A'...",
      hint_vi: "..."
    },
    // 2 more questions (total 3)
  ],
  question: {
    text_en: "What about you? ...",
    text_vi: "...",
    min_words: 30,
    hint_en: "...",
    hint_vi: "..."
  }
};
```

**Key Points**:
- content_en: **100-150 words** for Advanced mode
- Split into **~14 sentences** (will be used in dictation/shadowing)
- 3 check_questions with multiple acceptable answers
- 1 reflection question

**Audio Count**: 1 file
- `story_read.mp3` (full narration)

---

### FILE 3: grammar.js (~38 lines)

**Schema**:
```javascript
export default {
  grammar_explanation: {
    title_en: "...",
    title_vi: "...",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "...", rule_vi: "..." },
      { type: "rule", icon: "2️⃣", rule_en: "...", rule_vi: "..." },
      { type: "rule", icon: "3️⃣", rule_en: "...", rule_vi: "..." }
    ]
  },
  exercises: [
    // 20 exercises total
    { id: 1, type: "fill", question: "I ___ a student.", answer: "am", hint: "to be" },
    { id: 2, type: "mc", question: "She ___ a teacher.", options: ["am", "is", "are"], answer: "is" },
    { id: 3, type: "unscramble", question: "am / I / student / a", answer: "I am a student." },
    // ... 17 more
  ]
};
```

**Audio Count**: 0 (NO audio for grammar)

---

### FILE 4: dictation.js (~18 lines)

**Schema**:
```javascript
export default {
  sentences: [
    { id: 1, text: "My name is Alex.", meaning: "Tên tôi là Alex." },
    { id: 2, text: "I am 8 years old.", meaning: "Tôi 8 tuổi." },
    // ... 12 more (total 14)
  ]
};
```

**⚠️ CRITICAL**:
- Sentences COPIED từ read.js (split by periods)
- Use `meaning:` key (NOT `vi:`, NOT `sentence_vi:`)
- Typically 10-14 sentences

**Audio Count**: 14 files
- `sent_1.mp3` → `sent_14.mp3`

---

### FILE 5: shadowing.js (~20 lines)

**Schema**:
```javascript
export default {
  title: "...",
  audio_full: "/audio/week1/shadowing_full.mp3",  // FULL audio!
  script: [
    { id: 1, text: "My name is Alex.", vi: "Tên tôi là Alex.", audio_url: "/audio/week1/shadowing_1.mp3" },
    { id: 2, text: "I am 8 years old.", vi: "Tôi 8 tuổi.", audio_url: "/audio/week1/shadowing_2.mp3" },
    // ... 12 more (total 14)
  ]
};
```

**⚠️ CRITICAL**:
- SAME sentences as dictation.js
- Use `vi:` key (NOT `meaning:`)
- Has `audio_full` field (all sentences combined)
- Each sentence has individual `audio_url`

**Audio Count**: 15 files
- `shadowing_full.mp3` (1 combined file)
- `shadowing_1.mp3` → `shadowing_14.mp3` (14 individual files)

---

### FILE 6: writing.js (~10 lines)

**Schema**:
```javascript
export default {
  title: "...",
  min_words: 40,
  model_sentence: "...",
  instruction_en: "...",
  instruction_vi: "...",
  prompt_en: "...",
  prompt_vi: "...",
  keywords: ["word1", "word2", ...]
};
```

**Audio Count**: 0

---

### FILE 7: ask_ai.js (~44 lines)

**Schema**:
```javascript
export default {
  prompts: [
    {
      id: 1,
      context_en: "You want to introduce yourself to a new friend. What do you say?",
      context_vi: "...",
      audio_url: "/audio/week1/ask_ai_1.mp3",
      answer: ["My name is...", "I am...", "Hello, I am..."],
      hint: "Start with 'My name is...' or 'I am...'"
    },
    // ... 4 more (total 5)
  ]
};
```

**Audio Count**: 5 files
- `ask_ai_1.mp3` → `ask_ai_5.mp3`

---

### FILE 8: logic.js (~49 lines)

**Schema**:
```javascript
export default {
  puzzles: [
    {
      id: 1,
      question_en: "Alex is 8 years old. Ben is 9 years old. Who is older?",
      question_vi: "...",
      answer: ["Ben", "ben"],
      hint_en: "Who has more years?",
      hint_vi: "...",
      audio_url: "/audio/week1/logic_1.mp3"
    },
    // ... 4 more (total 5)
  ]
};
```

**Audio Count**: 5 files
- `logic_1.mp3` → `logic_5.mp3`

---

### FILE 9: explore.js (~37 lines)

**Schema**:
```javascript
export default {
  title_en: "...",
  title_vi: "...",
  image_url: "/images/week1/explore_cover_w01.jpg",
  content_en: "Did you know...? (science/social content)",
  content_vi: "...",
  check_questions: [
    { id: 1, question_en: "...", answer: ["..."], hint_en: "..." },
    // 2 more
  ],
  question: {
    text_en: "...",
    text_vi: "...",
    min_words: 30,
    hint_en: "..."
  }
};
```

**Audio Count**: 0-1 file (optional `explore_content.mp3`)

---

### FILE 10: word_power.js (~40 lines)

**Schema**:
```javascript
export default {
  words: [  // NOTE: "words" NOT "phrases"!
    {
      id: 1,
      word: "do homework",
      pronunciation: "/duː ˈhoʊmwɜːrk/",
      cefr_level: "A1",
      definition_en: "To complete school assignments at home.",
      definition_vi: "Hoàn thành bài tập ở nhà.",
      example: "I do my homework every evening after dinner.",
      model_sentence: "Every student should do homework to practice what they learned in class.",
      collocation: "do your homework",
      image_url: "/images/week1/wordpower_do_homework.jpg"
      // ⚠️ NO AUDIO FIELDS!
    },
    // 2 more (total 3)
  ]
};
```

**⚠️ CRITICAL**:
- Use `words` array (NOT `phrases`)
- **NO audio fields** (no audio_word, no audio_phrase, no audio_usage!)
- Only images needed
- 3 phrases exactly

**Audio Count**: 0 (NO AUDIO!)

---

### FILE 11: word_match.js (~30 lines)

**Schema**:
```javascript
export default {
  pairs: [
    { id: 1, word: "student", definition: "A person who learns at school", image: "/images/week1/student.jpg" },
    { id: 2, word: "teacher", definition: "A person who teaches", image: "/images/week1/teacher.jpg" },
    // ... 8 more (total 10)
  ]
};
```

**⚠️ CRITICAL**: Week 4 THIẾU file này! Cần bổ sung!

**Audio Count**: 0

---

### FILE 12: mindmap.js (~62 lines)

**Schema**:
```javascript
const mindMapContent = {
  centerStems: [
    { text: "I am ___.", audio: "/audio/week1/mindmap_stem_1.mp3" },
    { text: "My name is ___.", audio: "/audio/week1/mindmap_stem_2.mp3" },
    { text: "I have ___.", audio: "/audio/week1/mindmap_stem_3.mp3" },
    { text: "I go to ___.", audio: "/audio/week1/mindmap_stem_4.mp3" },
    { text: "My teacher is ___.", audio: "/audio/week1/mindmap_stem_5.mp3" },
    { text: "I like ___.", audio: "/audio/week1/mindmap_stem_6.mp3" }
  ],
  branchLabels: {
    "I am ___.": [
      { text: "a student", audio: "/audio/week1/mindmap_branch_1.mp3" },
      { text: "8 years old", audio: "/audio/week1/mindmap_branch_2.mp3" },
      { text: "happy", audio: "/audio/week1/mindmap_branch_3.mp3" },
      { text: "Alex", audio: "/audio/week1/mindmap_branch_4.mp3" },
      { text: "a boy", audio: "/audio/week1/mindmap_branch_5.mp3" },
      { text: "a hero", audio: "/audio/week1/mindmap_branch_6.mp3" }
    ],
    // ... 5 more stems (6 branches each)
  }
};

export default mindMapContent;
```

**Key Points**:
- 6 center stems
- 6 branches per stem = 36 branches total
- Each stem and branch has audio

**Audio Count**: 42 files
- `mindmap_stem_1.mp3` → `mindmap_stem_6.mp3` (6 stems)
- `mindmap_branch_1.mp3` → `mindmap_branch_36.mp3` (36 branches)

---

### FILE 13: daily_watch.js (~9 lines)

**Schema**:
```javascript
export default {
  videos: [
    { 
      id: 1, 
      title: "...", 
      videoId: "abc123", 
      duration: "02:30", 
      sim_duration: 150, 
      thumb: "https://img.youtube.com/vi/abc123/mqdefault.jpg" 
    },
    // ... 4 more (total 5)
  ],
  bonus_games: [
    { title: "Review Game", url: "#", description: "Practice what you learned" }
  ]
};
```

**Audio Count**: 0 (videos are YouTube links, không phải audio files)

---

### FILE 14: index.js (~46 lines)

**Schema**:
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
  weekId: 1,
  isEasy: false,
  weekTitle_en: "...",
  weekTitle_vi: "...",
  grammar_focus: "...",
  global_vocab: vocab.vocab,  // Reference to vocab array
  
  // ⚠️ MANDATORY: voiceConfig for TTS
  voiceConfig: {
    narration: 'en-US-Neural2-D',    // For stories
    vocabulary: 'en-US-Neural2-F',   // For vocab words
    dictation: 'en-US-Neural2-F',    // For dictation
    questions: 'en-US-Neural2-D',    // For ask_ai/logic
    mindmap: 'en-US-Neural2-D'       // For mindmap
  },
  
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,      // ← Must include!
    grammar: grammar,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    video: writing,             // ← Note: writing mapped to "video" key too
    writing: writing,
    explore: explore,
    word_power: word_power,
    daily_watch: daily_watch,
    mindmap_speaking: mindmap
  }
};

export default weekData;
```

**⚠️ CRITICAL Points**:
- Import ALL 13 station files (NOT video_queries.json)
- `isEasy: false` for Advanced mode
- `global_vocab` references `vocab.vocab` array
- `voiceConfig` required for TTS generation
- `stations` object maps files to app tabs
- `writing` được map 2 lần: "video" và "writing" keys

---

### FILE 15: video_queries.json (~45 lines)

**Schema**:
```json
{
  "videos": [
    {
      "id": 1,
      "priority_search": "English Singsing I am verb to be ESL for kids",
      "backup_search": "verb to be song ESL kids cartoons",
      "target_grammar": "I am / Verb to be",
      "target_channel": "English Singsing",
      "purpose": "GRAMMAR"
    },
    // ... 4 more (total 5)
  ]
}
```

**Used By**: `node tools/update_videos.js X`

---

## 📁 PART 3: STATIONS - EASY MODE (16 files)

### Key Differences from Advanced:

1. **MORE Files**:
   - Advanced: 14 .js + 1 .json = 15 files
   - Easy: 15-16 .js files (NO video_queries.json)
   - Extra files: `quiz.js`, sometimes duplicate `wordpower.js` + `word_power.js`

2. **Different Vocab**:
   - Advanced: "student", "teacher", "classroom"...
   - Easy: "name", "friend", "desk", "chair", "pen"...
   - Completely DIFFERENT word lists!

3. **Separate Images**:
   - Advanced: `public/images/week1/` (17 images)
   - Easy: `public/images/week1_easy/` (29 images)
   - **NOT SHARED!** Each mode has own images folder

4. **Shorter Content**:
   - read.js: 60-80 words (vs 100-150 Advanced)
   - dictation: 10 sentences (vs 14 Advanced)
   - shadowing: 10 sentences (vs 14 Advanced)

5. **Simpler Language**:
   - Shorter sentences
   - Simpler vocabulary
   - Same grammar patterns

6. **daily_watch.js IS Imported**:
   - Week 1 Easy: daily_watch ✅ imported in index.js
   - Week 4 Easy: daily_watch ❌ NOT imported (bug?)
   - Need to check per week!

### File List Easy Mode:

```
week_XX_easy/
├── vocab.js         (~115 lines) - 10 DIFFERENT words
├── read.js          (~30 lines)  - Shorter story (60-80 words)
├── grammar.js       (~38 lines)  - Same 20 exercises
├── dictation.js     (~15 lines)  - 10 sentences × 1 audio = 10 audio
├── shadowing.js     (~17 lines)  - 10 sentences + 1 full = 11 audio
├── writing.js       (~10 lines)
├── ask_ai.js        (~44 lines)  - 5 prompts
├── logic.js         (~49 lines)  - 5 puzzles
├── explore.js       (~37 lines)
├── word_power.js    (~40 lines)  - 3-4 phrases (NO audio)
├── wordpower.js     (duplicate?)  - Sometimes exists
├── word_match.js    (~30 lines)
├── mindmap.js       (~62 lines)  - 6 stems + 36 branches
├── daily_watch.js   (~9 lines)   - 5 videos (check if imported!)
├── quiz.js          (NEW!)       - Extra quiz format
└── index.js         (~46 lines)  - isEasy: true
```

**Total Audio Files Easy**: 10 + 1 + 10 + 11 + 5 + 5 + 42 + 1 = **85 audio files minimum**

### index.js Easy Mode Differences:

```javascript
const weekData = {
  weekId: 1,
  isEasy: true,  // ← MUST be true!
  weekTitle_en: "...",
  weekTitle_vi: "...",
  // ... same structure as Advanced
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
    daily_watch: daily_watch,  // ← Week 1: YES, Week 4: NO?
    mindmap_speaking: mindmap
  }
};
```

---

## 🎨 PART 4: ASSETS SUMMARY

### Images:

| Mode | Folder | Count | Contents |
|------|--------|-------|----------|
| Advanced | `public/images/week_XX/` | ~17 | 10 vocab + 2 covers + 3-4 word_power + extras |
| Easy | `public/images/week_XX_easy/` | ~29 | 10 vocab + 2 covers + 4-7 word_power + extras |

**⚠️ CRITICAL**: Easy mode có MORE images vì:
- Different vocab words (10 different images)
- More word_power phrases (4-7 vs 3-4)
- NOT SHARED với Advanced!

### Audio Files:

| Mode | Folder | Count | Breakdown |
|------|--------|-------|-----------|
| Advanced | `public/audio/week_XX/` | ~93 | Vocab 10 + Story 1 + Dict 14 + Shadow 15 + AskAI 5 + Logic 5 + Mindmap 42 + Explore 1 |
| Easy | `public/audio/week_XX_easy/` | ~85 | Vocab 10 + Story 1 + Dict 10 + Shadow 11 + AskAI 5 + Logic 5 + Mindmap 42 + Explore 1 |

**Total per Week**: ~178 audio files (Advanced + Easy)

### Videos:

- 5 YouTube videos per week (embedded via daily_watch.js)
- NO audio files (external YouTube links)
- Updated via `node tools/update_videos.js X`

---

## 🔄 COMPLETE WORKFLOW FOR NEW WEEK

### STEP 1: Generate Spec
```bash
node MASS/tools/generate_spec.cjs 5
```

**Output**: `MASS/SPECS/week_05_spec.json`

**Must Include**:
- Week metadata
- 10 target vocab with full info
- Grammar pattern
- Topic & learning outcomes
- BOTH stations structure AND story_missions structure

---

### STEP 2: Generate AI Tutor File
**File**: `src/data/weeks/week_05_real.js` (~600-1100 lines)

**Using**:
- Spec: `week_05_spec.json`
- Prompt: `ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt`
- Golden Standard: `week_01_real.js` or `week_04_real.js`

**Must Create**:
- Metadata block
- target_vocab array (10 words with pronunciation + both definitions)
- global_vocab array
- 3 story_missions:
  - Mission 1: 9-11 objectives
  - Mission 2: 9-11 objectives
  - Mission 3: 9-11 objectives
- Each mission:
  - Week 1-3: Use `canonical_question`
  - Week 4+: Use `question_variants` (3 per objective)
  - Student invitations every 3-4 objectives
  - Goodbye objective at end
- freetalk_knowledge block

---

### STEP 3A: Generate Advanced Stations
**Folder**: `src/data/weeks/week_05/` (15 files)

**Using**:
- Spec: `week_05_spec.json`
- Prompts: `08_STATIONS_CORE.txt`, `09_STATIONS_ADVANCED.txt`
- Golden Standard: `week_01/` folder

**Must Create**:
1. vocab.js - 10 words, ONLY audio_word
2. read.js - 100-150 words, ~14 sentences
3. grammar.js - 20 exercises
4. dictation.js - Copy from read.js, use `meaning:`
5. shadowing.js - Copy from read.js, use `vi:` + `audio_full`
6. writing.js
7. ask_ai.js - 5 prompts with audio
8. logic.js - 5 puzzles with audio
9. explore.js
10. word_power.js - 3 phrases, NO audio, use `words` array
11. word_match.js - 10 pairs from vocab
12. mindmap.js - 6 stems + 36 branches with audio
13. daily_watch.js - 5 video slots
14. index.js - Import ALL, isEasy: false, voiceConfig
15. video_queries.json - 5 queries

---

### STEP 3B: Generate Easy Stations
**Folder**: `src/data/weeks_easy/week_05/` (16 files)

**Using**:
- Spec: `week_05_spec.json`
- Prompts: `08_STATIONS_CORE.txt`, `10_STATIONS_EASY.txt`
- Golden Standard: `week_01_easy/` folder

**Must Create**:
1. vocab.js - 10 DIFFERENT simpler words
2. read.js - 60-80 words, ~10 sentences
3. grammar.js - Same 20 exercises
4. dictation.js - 10 sentences, use `meaning:`
5. shadowing.js - 10 sentences, use `vi:` + `audio_full`
6. writing.js
7. ask_ai.js - 5 prompts
8. logic.js - 5 puzzles
9. explore.js
10. word_power.js - 3-4 phrases, NO audio
11. word_match.js - 10 pairs
12. mindmap.js - 6 stems + 36 branches
13. daily_watch.js - 5 videos (check if should import in index!)
14. quiz.js - Extra quiz format
15. wordpower.js - Sometimes duplicate
16. index.js - isEasy: true

---

### STEP 4: Generate Images

```bash
node tools/generate_images_nano.js 5
```

**Generates**:
- Advanced: `public/images/week5/` (~17 images)
- Easy: `public/images/week5_easy/` (~29 images)

**Contents**:
- 10 vocab images (DIFFERENT for each mode!)
- 2 covers (read + explore)
- 3-7 word_power images (Easy has more!)

---

### STEP 5: Generate Audio

```bash
node tools/generate_audio.js 5 5
```

**Generates**:
- Advanced: `public/audio/week_05/` (~93 files)
- Easy: `public/audio/week_05_easy/` (~85 files)

**Includes**:
- Vocab words (10 Advanced, 10 Easy)
- Story narration (1 + 1)
- Dictation (14 Advanced, 10 Easy)
- Shadowing (15 Advanced, 11 Easy)
- Ask AI prompts (5 + 5)
- Logic puzzles (5 + 5)
- Mindmap stems + branches (42 + 42)
- Explore content (1 + 1)

**Total**: ~178 audio files per week

---

### STEP 6: Update Videos

```bash
node tools/update_videos.js 5
```

**Process**:
1. Read `week_05/video_queries.json`
2. Search YouTube (auto-append " ESL for kids")
3. Filter by 60-channel whitelist
4. Prioritize target_channel (English Singsing, Little Fox, etc.)
5. Check duration (1-15 min)
6. Verify title matches keywords
7. Update `daily_watch.js` with real videos

**Output**: Updated `week_05/daily_watch.js` with 5 real YouTube videos

---

### STEP 7: Validate

**File Checklist**:
- [ ] week_05_real.js exists (~600-1100 lines)
- [ ] week_05/ has 15 files (14 .js + 1 .json)
- [ ] week_05_easy/ has 16 files (15-16 .js)
- [ ] word_match.js present in BOTH modes
- [ ] video_queries.json ONLY in Advanced (NOT Easy)
- [ ] daily_watch imported correctly per mode

**Content Checklist**:
- [ ] dictation sentences = read sentences
- [ ] shadowing sentences = dictation sentences
- [ ] dictation uses `meaning:`, shadowing uses `vi:`
- [ ] shadowing has `audio_full` field
- [ ] word_power uses `words` array, NO audio fields
- [ ] vocab has ONLY `audio_word`, NO other audio
- [ ] vocab Advanced ≠ vocab Easy (different words!)
- [ ] index.js Advanced: isEasy: false
- [ ] index.js Easy: isEasy: true

**Asset Checklist**:
- [ ] Images Advanced: ~17 files in week5/
- [ ] Images Easy: ~29 files in week5_easy/
- [ ] Audio Advanced: ~93 files
- [ ] Audio Easy: ~85 files
- [ ] Videos: 5 in daily_watch.js

**AI Tutor Checklist**:
- [ ] target_vocab has 10 words
- [ ] Each word has: pronunciation, definition_vi, definition_en
- [ ] 3 missions present
- [ ] Each mission: 9-11 objectives + invitations + goodbye
- [ ] Question format correct (canonical vs variants)
- [ ] freetalk_knowledge present

---

### STEP 8: Test in App

```bash
npm run dev
# Navigate to Week 5
# Test ALL tabs:
# - AI Tutor: Story, Chat, Quiz, Speak
# - Vocab, Read, Grammar, Dictation, Shadowing
# - Ask AI, Logic, Writing, Explore
# - Word Power, Word Match, Mindmap, Daily Watch
```

---

## ✅ KEY FINDINGS & CORRECTIONS

### ERRORS in Week 4 Document:

1. ❌ "14 files in Advanced" → ✅ **15 files** (thiếu word_match.js!)
2. ❌ "13 files in Easy" → ✅ **16 files** (thiếu quiz.js, wordpower.js duplicate)
3. ❌ "15 images shared" → ✅ **17 Advanced + 29 Easy = 46 images, NOT shared!**
4. ❌ "Easy NO daily_watch" → ✅ **Week 1 Easy HAS daily_watch**, Week 4 không có (inconsistent)
5. ❌ "~138 audio Advanced" → ✅ **~93 audio Advanced** (week 1 actual count)
6. ❌ "~116 audio Easy" → ✅ **~85 audio Easy** (week 1 actual count)
7. ❌ "word_power NO audio" → ✅ **CORRECT** (confirmed from Week 1)
8. ❌ "vocab ONLY audio_word" → ✅ **CORRECT** (confirmed from Week 1)
9. ❌ "AI Tutor = Story only" → ✅ **AI Tutor = Story + Chat + Quiz + Speak** (Quiz/Speak auto-generated from target_vocab)

### CRITICAL Rules (UPDATED):

1. **File Counts**:
   - Advanced: **15 files** (14 .js + 1 .json)
   - Easy: **16 files** (15-16 .js, NO .json)
   - Must include: word_match.js, quiz.js (Easy)

2. **Image Counts**:
   - Advanced: **~17 images** in separate folder
   - Easy: **~29 images** in separate folder
   - **NOT SHARED!** Each mode has own images

3. **Audio Counts**:
   - Advanced: **~93 files** (not 138!)
   - Easy: **~85 files** (not 116!)
   - Total: **~178 files per week**

4. **Vocab Images & Audio**:
   - Each word: 1 image + 1 audio
   - Audio: ONLY `audio_word` field
   - NO audio_phonetic, NO audio_example

5. **Word Power**:
   - Use `words` array (not `phrases`)
   - **NO AUDIO FIELDS!**
   - Only images (3-4 Advanced, 4-7 Easy)

6. **Dictation vs Shadowing**:
   - SAME sentences from read.js
   - Dictation: `meaning:` key
   - Shadowing: `vi:` key + `audio_full` field
   - Advanced: 14 sentences, Easy: 10 sentences

7. **AI Tutor target_vocab**:
   - MUST have: pronunciation, definition_vi, definition_en
   - Required for Quiz/Speak tabs to work
   - 10 words exactly

8. **Question Format**:
   - Week 1-3: `canonical_question` (single)
   - Week 4+: `question_variants` (3 variants)

9. **Turn Limits**:
   - Week 1-3: 8-12 turns per mission
   - Week 4+: 12-20 turns per mission

10. **Easy Mode Variations**:
    - Week 1: daily_watch ✅ imported
    - Week 4: daily_watch ❌ NOT imported
    - Check per week, not consistent!

---

**Status**: ✅ CORRECT STRUCTURE FROM WEEK 1  
**Confidence**: 100% - Based on actual Week 1 code audit  
**Ready For**: Mass production Week 5-156 using CORRECTED template  
**Next**: Fix Week 4 to match Week 1 structure (add word_match.js, fix image counts, etc.)

