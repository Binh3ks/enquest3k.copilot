# 🎯 QUY TRÌNH SẢN XUẤT 1 TUẦN - WORKFLOW ĐƠN GIẢN

*Version 2.0 - Updated Jan 26, 2026*

---

## 📋 CHUẨN BỊ (5 phút)

### Input Cần Có:
- [ ] **Số tuần**: Week [N]
- [ ] **Chủ đề**: Từ Syllabus (VD: "My School Supplies")
- [ ] **Ngữ pháp**: Pattern chính xác (VD: "There is a..." - KHÔNG plurals!)
- [ ] **10 từ vựng Advanced**: Từ Syllabus
- [ ] **10 từ vựng Easy**: Từ Blueprint

### Tạo Folder:
```bash
mkdir -p src/data/weeks/week_[N]
mkdir -p src/data/weeks_easy/week_[N]
mkdir -p public/audio/week[N]
mkdir -p public/audio/week[N]_easy
mkdir -p public/images/week[N]
mkdir -p public/images/week[N]_easy
```

---

## 🎯 BƯỚC 1: AI TUTOR CORE (45 phút)

### File: `src/data/weeks/week_[N]_real.js`

**Nội dung gồm 5 phần:**

### 1.1 Metadata (~100 dòng)
```javascript
const week[N]RealData = {
  week_id: [N],
  phase: 1,
  block: "A",
  unit: 1,
  week_number: [N],
  title: "Week [N]: [Tiêu đề]",
  week_title_en: "[Tiêu đề EN]",
  week_title_vi: "[Tiêu đề VI]",
  topic: "[Chủ đề]",
  grammar_focus: "[Ngữ pháp từ Syllabus]",
  grammar_pattern: "[Pattern format]",
  grammar_examples: ["...", "...", "...", "..."],
  target_vocab: [
    {
      word: "...",
      pronunciation: "/IPA/",
      definition_vi: "...",
      definition_en: "...",
      example: "...",
      syllabus_context: "..."
    },
    // ... 9 more (TOTAL: 10)
  ],
  global_vocab: ["word1", "word2", ..., "word10"]
};
```

**⚠️ Kiểm tra:**
- [ ] grammar_examples chỉ dùng ngữ pháp tuần này (KHÔNG lẫn past tense vào present simple!)
- [ ] Đúng 10 words trong target_vocab
- [ ] global_vocab khớp với target_vocab

---

### 1.2 Story Missions (~450 dòng - 3 missions)

**Mỗi mission ~150 dòng:**

```javascript
story_missions: [
  {
    mission_id: 1,
    title: "[Mission Name]",
    title_vi: "[Mission Name VI]",
    theme: "[Theme]",
    
    // CHARACTER
    story_character: {
      name: "Ms. Nova",
      personality: "[3-4 traits]",
      backstory: "[1-2 câu]",
      speaking_style: "[How they talk]",
      facts: {
        favorite_color: "...",
        hobby: "...",
        // ... 5-8 facts
      }
    },
    
    // OPENING (AI nói đầu tiên)
    opening_narrative: "[Chào + giới thiệu mission + hỏi tên]",
    
    // CONTEXT (Hướng dẫn cho AI)
    mission_context: `Week [N] Mission [#] - [Name].
    STUDENT: 6-12 tuổi, A0+.
    LANGUAGE: Đơn giản, max 8 từ/câu.
    GRAMMAR: [Pattern].
    VOCAB: [5-7 words].
    GAME MECHANIC: [Cách chơi].
    ENCOURAGE: [Khen ngợi gì].
    AVOID: [Tránh gì].`,
    
    target_vocab: ["word1", "word2", ..., "word5-7"],
    grammar_pattern: "[Pattern]",
    
    // STORY ARC (4 phases)
    story_arc: [
      {
        phase: "introduction",
        turns: "1-4",
        goal: "[Mục tiêu]",
        phase_questions: ["Q1", "Q2", "Q3", "Q4"]
      },
      {
        phase: "[main activity]",
        turns: "5-12",
        goal: "[Main activity]",
        required_vocab: ["word1", "word2", ...],
        phase_questions: ["Q1", "Q2", ..., "Q8"]
      },
      {
        phase: "[practice]",
        turns: "13-17",
        goal: "[Apply]",
        phase_questions: ["Q1", ..., "Q5"]
      },
      {
        phase: "conclusion",
        turns: "18-20",
        goal: "Wrap up",
        phase_questions: ["Review", "Goodbye"]
      }
    ],
    
    minimum_turns: 15,
    maximum_turns: 20,
    
    // ⚠️ OBJECTIVES (QUAN TRỌNG!) - 10-12 items
    objectives: [
      {
        stepKey: "student_name",
        category: "Identity",
        question_variants: [
          {
            question: "What's your name?",
            hints: ["name", "is", "My", "I", "am"]
          },
          {
            question: "Can you tell me your name?",
            hints: ["is", "My", "name", "tell", "you"]
          },
          {
            question: "What do I call you?",
            hints: ["call", "me", "You", "can", "My", "name"]
          }
        ],
        target_keywords: ["my", "name", "is", "I", "am"],
        ack_options: ["Nice!", "Great!", "Wonderful!"],
        recast_templates: ["Your name is {name}!", "You are {name}!"],
        success_criteria: "Student says their name"
      },
      // ... 9-11 more objectives covering:
      // - Vocab items (3-5 objectives)
      // - Grammar practice (2-3 objectives)
      // - Activity tasks (3-4 objectives)
      // - Preference/reflection (1-2 objectives)
    ]
  },
  // Mission 2 (same structure)
  // Mission 3 (same structure)
]
```

**⚠️ QUAN TRỌNG - Objectives:**
- [ ] Mỗi mission có 10-12 objectives
- [ ] Objective đầu tiên LUÔN là student_name
- [ ] student_name có 3 question_variants (anti-repetition!)
- [ ] Mỗi objective có target_keywords, success_criteria
- [ ] Cover hết target_vocab words

**Tại sao?**
- ❌ **KHÔNG có objectives** → AI hỏi tên 10 lần, lặp câu hỏi
- ✅ **CÓ objectives đầy đủ** → Tên hỏi 1 lần, flow tự nhiên

---

### 1.3 Free Talk Knowledge Base (~50 dòng)

```javascript
freetalk_knowledge: {
  week_title: "[Week Title]",
  week_number: [N],
  theme: "[Theme]",
  knowledge_base: [
    "[Fact 1]",
    "[Fact 2]",
    // ... 10 total facts
  ],
  example_opening_questions: [
    "[Question 1]",
    "[Question 2]",
    // ... 7-10 questions
  ],
  starter_prompts: [
    { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
    { text_en: "I want to do a roleplay! 🎭", text_vi: "Tôi muốn nhập vai!", type: "roleplay" },
    { text_en: "Let's just chat! 💬", text_vi: "Trò chuyện thôi!", type: "chat" }
  ]
}
};

export default week[N]RealData;
```

**⚠️ Kiểm tra:**
- [ ] knowledge_base có 10 facts về topic
- [ ] example_opening_questions có 7-10 câu
- [ ] 3 starter_prompts buttons

---

## 🎭 BƯỚC 2: DYNAMIC ROLEPLAYS (15 phút)

### File: `src/services/ai_tutor/dynamicRoleplays.js`

**Thêm vào object ROLEPLAY_TEMPLATES:**

```javascript
[N]: [ // Week [N]
  {
    id: `week${N}_roleplay_1`,
    title: "[Roleplay Title 1]",
    title_vi: "[Title VI]",
    emoji: "🏠", // Choose emoji
    ai_role: {
      character: "[Character Name]",
      personality: "[Traits]",
      context: "[Setting]",
      speaking_style: "[Style]",
      opening_line: "[First line]"
    },
    student_role: "[Student plays]",
    scenario: "[2-3 sentences description]",
    target_vocab: ["word1", "word2", ..., "word5-7"],
    grammar_focus: "[Pattern]",
    natural_flow: true,
    conversation_goals: ["Goal 1", "Goal 2", "Goal 3"],
    example_turns: [
      {
        ai: "[AI line]",
        student_options: ["Option 1", "Option 2", "Option 3"]
      },
      // 2-3 example turns
    ]
  },
  // Roleplay 2
  // Roleplay 3
],
```

**⚠️ Kiểm tra:**
- [ ] 3 roleplays cùng theme của tuần (KHÔNG generic!)
- [ ] target_vocab: 5-7 words từ tuần
- [ ] grammar_focus khớp pattern tuần
- [ ] natural_flow: true (hội thoại tự nhiên, KHÔNG Q&A khô khan)

---

## 📂 BƯỚC 3: STATION DATA FILES (90 phút)

### Thứ tự tạo file (28 files total):

**Priority 1: Core Content (60 phút)**
1. vocab.js (Advanced + Easy) - 10 words each
2. read.js (Advanced + Easy) - 12-15 sentences
3. dictation.js (Advanced + Easy) - Copy từ read.js
4. shadowing.js (Advanced + Easy) - Copy từ read.js
5. explore.js (Advanced + Easy) - 8-12 sentences

**Priority 2: Practice (30 phút)**
6. word_power.js (Advanced + Easy) - 3 phrases
7. word_match.js (Advanced + Easy) - 10 pairs
8. grammar.js (Advanced + Easy) - 20 exercises
9. mindmap.js (Advanced + Easy) - 6 stems + 36 branches

**Priority 3: Production (20 phút)**
10. writing.js (Advanced + Easy) - 5 prompts → **SINGLE OBJECT!**
11. logic.js (Advanced + Easy) - 5 puzzles
12. ask_ai.js (Advanced + Easy) - 5 prompts → **QUESTION FORMING!**

**Priority 4: Videos (5 phút - Auto)**
13. daily_watch.js - Auto-generated
14. video_queries.json - Auto-generated

---

### ⚠️ QUAN TRỌNG - Chi tiết các file:

#### 3.1 vocab.js (Both modes)
```javascript
export default [
  {
    id: 1, // ⚠️ BẮT BUỘC
    word: "...",
    pronunciation: "/IPA/",
    definition_en: "...",
    definition_vi: "...",
    example_en: "...", // ⚠️ Dùng ngữ pháp tuần
    example_vi: "...",
    collocation_en: "...", // ⚠️ _en suffix
    collocation_vi: "...",
    image_url: "/images/week[N]/[word].jpg",
    audio_word: "/audio/week[N]/vocab_[word].mp3",
    audio_definition: "/audio/week[N]/vocab_def_[word].mp3",
    audio_example: "/audio/week[N]/vocab_ex_[word].mp3",
    audio_collocation: "/audio/week[N]/vocab_coll_[word].mp3"
  },
  // ... 9 more (TOTAL: 10)
];
```

**Checklist:**
- [ ] id: 1-10
- [ ] definition_en (KHÔNG phải definition!)
- [ ] example_en dùng ngữ pháp tuần
- [ ] collocation_en (KHÔNG phải collocation!)
- [ ] ĐẦY ĐỦ 5 URLs: image + 4 audio

---

#### 3.2 word_power.js (Both modes)
```javascript
export default {
  words: [
    {
      id: 1, // ⚠️ BẮT BUỘC
      word: "[phrase]",
      definition_en: "...",
      definition_vi: "...",
      example_en: "...",
      example_vi: "...",
      collocation_en: "...", // ⚠️ _en suffix
      collocation_vi: "...",
      model_sentence_en: "...",
      model_sentence_vi: "...",
      image_url: "/images/week[N]/wordpower_[phrase].jpg",
      audio_word: "/audio/week[N]/wordpower_[phrase].mp3",
      audio_def: "/audio/week[N]/wordpower_def_[phrase].mp3",
      audio_ex: "/audio/week[N]/wordpower_ex_[phrase].mp3",
      audio_coll: "/audio/week[N]/wordpower_coll_[phrase].mp3",
      audio_model: "/audio/week[N]/wordpower_model_[phrase].mp3"
    },
    // ... 2 more (TOTAL: 3)
  ]
};
```

**Checklist:**
- [ ] id: 1, 2, 3
- [ ] collocation_en (KHÔNG phải collocation!)
- [ ] ĐẦY ĐỦ 6 URLs: image + 5 audio

---

#### 3.3 read.js (Both modes)
```javascript
export default {
  title_en: "...",
  title_vi: "...",
  image_url: "/images/week[N]/read_cover_w0[N].jpg",
  audio_url: "/audio/week[N]/read_explore_main.mp3",
  story_en: "[12-15 sentences using 10 vocab + grammar pattern]",
  story_vi: "[Translation]",
  sentences: [
    { text_en: "...", text_vi: "..." }, // ⚠️ text_en NOT text!
    // ... 11-14 more (TOTAL: 12-15)
  ],
  questions: [
    { question_en: "...", question_vi: "...", answer_en: "...", answer_vi: "..." },
    // ... 4 more (TOTAL: 5)
  ]
};
```

**Checklist:**
- [ ] story_en: 12-15 sentences
- [ ] Dùng HẾT 10 vocab words
- [ ] Chỉ dùng ngữ pháp tuần
- [ ] sentences khớp story
- [ ] text_en (KHÔNG phải text!)

---

#### 3.4 dictation.js (Both modes)
```javascript
export default {
  sentences: [
    {
      id: 1,
      text_en: "[Exact copy từ read.js sentence 1]", // ⚠️ text_en NOT text!
      text_vi: "[Translation]",
      audio_url: "/audio/week[N]/dictation_1.mp3"
    },
    // ... continue for ALL sentences from read.js
  ]
};
```

**Checklist:**
- [ ] Số câu KHỚP read.js
- [ ] text_en là EXACT COPY từ read.js
- [ ] text_en (KHÔNG phải text!)

---

#### 3.5 shadowing.js (Both modes)
```javascript
export default {
  title_en: "[Same as read.js]",
  title_vi: "[Same as read.js]",
  audio_full: "/audio/week[N]/shadowing_full.mp3",
  sentences: [
    {
      id: 1,
      text_en: "[Exact copy từ read.js]", // ⚠️ text_en NOT text!
      text_vi: "[Translation]",
      audio_url: "/audio/week[N]/shadowing_1.mp3"
    },
    // ... ALL sentences from read.js
  ]
};
```

**Checklist:**
- [ ] Số câu KHỚP read.js và dictation.js
- [ ] text_en là EXACT COPY
- [ ] audio_full cho full story

---

#### 3.6 writing.js (Both modes)

**⚠️ QUAN TRỌNG: SINGLE OBJECT - KHÔNG PHẢI ARRAY!**

```javascript
export default {
  title: "[Writing Topic]",
  min_words: 35,
  model_sentence: "[8-10 sentences showing example]",
  instruction_en: "[Instructions]",
  instruction_vi: "[Instructions VI]",
  prompt_en: "[Guiding questions]",
  prompt_vi: "[Questions VI]",
  keywords: ["word1", "word2", ..., "word8-12"]
};
```

**Checklist:**
- [ ] SINGLE OBJECT (KHÔNG phải `{ prompts: [...] }` array!)
- [ ] title describes topic
- [ ] model_sentence: 8-10 sentences
- [ ] model_sentence dùng vocab + grammar
- [ ] keywords: 8-12 words

**Tại sao?**
- ❌ **Array format** `{ prompts: [...] }` → Component crashes
- ✅ **Single object** → VideoChallenge component works

---

#### 3.7 ask_ai.js (Both modes)

**⚠️ QUAN TRỌNG: QUESTION FORMING - KHÔNG PHẢI ANSWERING!**

```javascript
export default {
  prompts: [
    {
      id: 1,
      context_en: "You want to know what is in your friend's backpack. Ask them.", // ⚠️ Ask, not Tell!
      context_vi: "[Context VI]",
      answer: ["What is in your backpack?", "What do you have in your backpack?"], // ⚠️ QUESTIONS!
      hint: ["What", "What is"],
      audio_url: "/audio/week[N]/ask_ai_1.mp3"
    },
    // ... 4 more (TOTAL: 5)
  ]
};
```

**Checklist:**
- [ ] context_en bắt đầu "You want to know..." (KHÔNG "Someone asks...")
- [ ] answer là array của QUESTIONS (KHÔNG statements!)
- [ ] Questions dùng Who/What/Where/When/How/Can/Do/Is/Are
- [ ] hint là question starters

**Tại sao?**
- ❌ **BAD**: "Someone asks... Tell them." → Tests answering (wrong!)
- ✅ **GOOD**: "You want to know... Ask them." → Tests question forming (correct!)

---

#### 3.8 Other Station Files (Quick Reference)

**explore.js:**
- content_en: 8-12 sentences
- check_questions: 5 True/False với explanations

**mindmap.js:**
- centerStems: 6 items với audio
- branchLabels: 6 keys × 6 branches = 36 branches với audio
- Total: 6 + 36 = 42 audio files

**grammar.js:**
- exercises: Minimum 20 items
- Mix: 8-10 mc, 6-8 fill, 4-6 unscramble

**word_match.js:**
- pairs: 10 items khớp vocab.js

**logic.js:**
- puzzles: 5 items với audio

---

#### 3.9 Videos (AUTO-GENERATED)

**KHÔNG TẠO THỦ CÔNG!**

```bash
# Generate queries
node tools/generate_video_queries.js [N]

# Fetch videos
node tools/update_videos.js [N]
```

**Output:**
- video_queries.json (Advanced only)
- daily_watch.js (cả Advanced và Easy - videos giống nhau)

---

## 📦 BƯỚC 4: INDEX FILES (5 phút)

### 4.1 Week Index (Both modes)

**Path:** `src/data/weeks/week_[N]/index.js` + `src/data/weeks_easy/week_[N]/index.js`

```javascript
import read from './read.js';
import vocab from './vocab.js';
import word_match from './word_match.js';
import grammar from './grammar.js';
import word_power from './word_power.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import explore from './explore.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';

export default {
  week_id: [N],
  title: "Week [N]: [Title]",
  stations: {
    read_explore: read, // ⚠️ KHÔNG phải "read"
    new_words: vocab, // ⚠️ KHÔNG phải "vocab"
    word_match: word_match,
    grammar: grammar, // ⚠️ KHÔNG phải "grammar_practice"
    word_power: word_power, // ⚠️ KHÔNG phải "word_power_station"
    ask_ai: ask_ai, // ⚠️ KHÔNG phải "ask_ai_station"
    logic_lab: logic, // ⚠️ KHÔNG phải "logic"
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap, // ⚠️ KHÔNG phải "mindmap"
    daily_watch: daily_watch
  }
};
```

**⚠️ QUAN TRỌNG - Station Keys:**
- [ ] read_explore (NOT read)
- [ ] new_words (NOT vocab)
- [ ] grammar (NOT grammar_practice)
- [ ] word_power (NOT word_power_station)
- [ ] ask_ai (NOT ask_ai_station)
- [ ] logic_lab (NOT logic)
- [ ] mindmap_speaking (NOT mindmap)

**Tại sao?**
- GameHub expects EXACT keys
- Sai key → Station không load

---

### 4.2 Metadata Update

**Path:** `src/data/weeks/metadata.js`

```javascript
// Find Week [N] line and update:
export const weekTitles = {
  // ...
  [N]: { 
    title_en: "[Title from Syllabus]", 
    title_vi: "[Title VI]" 
  },
  // ...
};
```

---

## 🎨 BƯỚC 5: ASSET GENERATION (60-90 phút)

### 5.1 Audio Files (~290 files total)

**Expected Counts:**
- vocab: 40 (Advanced) + 40 (Easy) = 80
- word_power: 15 + 15 = 30
- read/explore: 2 + 2 = 4
- dictation: 12-15 + 12-15 = 24-30
- shadowing: 13-16 + 13-16 = 26-32
- mindmap: 42 + 42 = 84
- logic: 5 + 5 = 10
- ask_ai: 5 + 5 = 10

**TOTAL: ~280-290 audio files**

**Generation:**
```bash
# ElevenLabs API (recommended)
node tools/generate_audio.js [N]

# Or by station:
node tools/generate_audio.js [N] --station vocab
node tools/generate_audio.js [N] --station word_power
# etc.
```

**Validate:**
```bash
find public/audio/week[N] -name "*.mp3" | wc -l
# Should be ~140-145

find public/audio/week[N]_easy -name "*.mp3" | wc -l
# Should be ~140-145
```

---

### 5.2 Image Files (30 total)

**Expected Counts:**
- vocab: 10 images
- word_power: 3 images
- read: 1 cover
- explore: 1 cover

**Per mode: 15 images**
**Total: 30 images**

**Generation:**
```bash
# DALL-E 3 / Midjourney
node tools/generate_images.js [N]

# Or manual: Pixabay, Unsplash, Stable Diffusion
```

**Validate:**
```bash
find public/images/week[N] -name "*.jpg" -o -name "*.png" | wc -l
# Should be 15

find public/images/week[N]_easy -name "*.jpg" -o -name "*.png" | wc -l
# Should be 15
```

---

## ✅ BƯỚC 6: QUALITY ASSURANCE (30 phút)

### 6.1 Automated Validation

```bash
# File count check
node tools/validate_week.js [N]

# Data structure audit
node tools/audit_week.js [N]

# URL validation
node tools/check_urls.js [N]

# Syntax errors
# (use editor's built-in linter or ESLint)
```

---

### 6.2 Manual Checklist

**Data Files:**
- [ ] 28 files exist (14 Advanced + 14 Easy)
- [ ] week_[N]_real.js: 3 missions with objectives
- [ ] dynamicRoleplays.js: 3 week-specific roleplays added

**Assets:**
- [ ] Audio: ~290 files
- [ ] Images: 30 files
- [ ] Videos: 5 (auto-generated, same in both modes)

**Field Naming:**
- [ ] vocab.js: definition_en, example_en, collocation_en
- [ ] word_power.js: collocation_en, model_sentence_en, id field
- [ ] dictation/shadowing.js: text_en (NOT text)
- [ ] writing.js: SINGLE OBJECT (NOT array)
- [ ] ask_ai.js: answer is QUESTIONS (NOT statements)

**Grammar Consistency:**
- [ ] read.js dùng ĐÚNG ngữ pháp tuần (KHÔNG lẫn past/present!)
- [ ] AI Tutor missions dùng đúng ngữ pháp
- [ ] Roleplays dùng đúng ngữ pháp
- [ ] Word Power examples dùng đúng ngữ pháp

---

## 🚀 BƯỚC 7: DEPLOYMENT TEST (15 phút)

### 7.1 Start Dev Server

```bash
npm run dev
# Open: http://localhost:5173/week/[N]
```

---

### 7.2 Test All 14 Stations

**Quick Test Checklist:**
- [ ] Read & Explore - Story loads, audio plays
- [ ] New Words - 10 words show, images load, audio works
- [ ] Word Match - 10 pairs work
- [ ] Grammar - 20 exercises load
- [ ] Word Power - 3 cards flip, collocation shows, audio plays
- [ ] Ask AI - 5 prompts load, audio plays, answer is QUESTION
- [ ] Logic Lab - 5 puzzles load, audio plays
- [ ] Dictation - Sentences load, audio plays, typing works
- [ ] Shadowing - Sentences load, audio plays, playback works
- [ ] Writing - Single prompt shows, word counter works
- [ ] Explore - Article displays, 5 T/F questions work
- [ ] Mindmap Speaking - 6 stems + 36 branches load, audio plays
- [ ] Daily Watch - 5 videos display, YouTube embeds work

---

### 7.3 Test AI Tutor (3 Tabs)

**Story Mission:**
```
1. Open AI Tutor
2. Select Mission 1
3. Enter name: "Hung"
4. Verify:
   - [ ] AI asks name ONCE only
   - [ ] AI remembers name after answer
   - [ ] Uses week grammar
   - [ ] 15-20 turns total
   - [ ] No repetitive questions
5. Test Mission 2 and 3
```

**Free Talk:**
```
1. Click Free Talk tab
2. Select "I want to do a roleplay!"
3. Choose one of 3 week-specific roleplays
4. Verify:
   - [ ] Matches week theme
   - [ ] Natural conversation
   - [ ] Uses week grammar
5. Try "Let's just chat!" button
```

**Quiz (Nova Arcade):**
```
1. Click Quiz tab
2. Start game (any type)
3. Verify:
   - [ ] 7-10 rounds
   - [ ] Tests week vocab + grammar
   - [ ] Score tracking works
4. Try all 4 game types
```

---

### 7.4 Test Easy Mode

```
1. Settings → Toggle Easy Mode ON
2. Verify Week [N]:
   - [ ] Different 10 vocab (from Blueprint)
   - [ ] Simpler sentences
   - [ ] Same grammar pattern
   - [ ] Same 5 videos
   - [ ] All stations work
```

---

## 📊 BƯỚC 8: FINAL REPORT (10 phút)

### Completion Report Template:

```markdown
# Week [N] Production Report - [Date]

## ✅ Data Files (28 files)
- [x] week_[N]_real.js (AI Tutor Core)
- [x] 14 station files (Advanced)
- [x] 14 station files (Easy)

## ✅ Assets Generated
- [x] Audio files: [count]/~290 files
- [x] Image files: [count]/30 files
- [x] Video files: 5 (auto-generated)

## ✅ AI Tutor Complete
- [x] 3 Story Missions with objectives
- [x] 3 Dynamic Roleplays (week-specific)
- [x] Free Talk knowledge base
- [x] Quiz tab (auto-generated)

## ✅ Quality Checks
- [x] Grammar consistency verified
- [x] URL validation passed
- [x] Field naming consistent
- [x] All stations tested in browser

## ✅ Issues Found & Fixed
1. [None or list issues]

## 📊 Final Metrics
- Total files: 28 data + ~320 assets
- Time spent: [hours]
- Ready for production: YES
```

---

## 🎓 COMMON PITFALLS (Week 7 Lessons)

### ❌ Top 5 Mistakes to Avoid:

1. **Missing objectives in AI Tutor**
   - Symptom: AI repeats "What's your name?" 10+ times
   - Fix: Add 10-12 objectives per mission with question_variants

2. **Writing.js as array**
   - Symptom: VideoChallenge component crashes
   - Fix: Use single object format, NOT `{ prompts: [...] }`

3. **Field naming: text vs text_en**
   - Symptom: "Cannot read 'replace' of undefined"
   - Fix: Always use _en suffix (text_en, collocation_en, etc.)

4. **Index.js station keys wrong**
   - Symptom: Stations don't load in GameHub
   - Fix: Use EXACT keys (grammar NOT grammar_practice, etc.)

5. **Ask AI = answering instead of asking**
   - Symptom: Wrong mechanic, students confused
   - Fix: context starts "You want to know...", answer is QUESTIONS

---

## 📊 TIMELINE SUMMARY

| Bước | Task | Time | Output |
|------|------|------|--------|
| 0 | Chuẩn bị | 5 min | Folders + Input data |
| 1 | AI Tutor Core | 45 min | week_[N]_real.js |
| 2 | Roleplays | 15 min | dynamicRoleplays.js updated |
| 3 | Station Files | 90 min | 28 data files |
| 4 | Index Files | 5 min | index.js + metadata.js |
| 5 | Asset Generation | 60-90 min | ~290 audio + 30 images |
| 6 | Quality Assurance | 30 min | Validation passed |
| 7 | Deployment Test | 15 min | All stations working |
| 8 | Final Report | 10 min | Production report |
| **TOTAL** | | **~8 hours** | **Full Week Ready** |

---

## 🔄 CONTINUOUS IMPROVEMENT

**After Each Week:**
1. Update this workflow with new lessons
2. Refine time estimates
3. Add automation scripts
4. Share findings

**Version History:**
- v1.0 (Dec 2025): Initial workflow
- v2.0 (Jan 2026): Updated after Week 7, added objectives requirement

---

**🎯 MỤC TIÊU: Sản xuất 1 tuần hoàn chỉnh, không lỗi, trong 8 giờ!**
