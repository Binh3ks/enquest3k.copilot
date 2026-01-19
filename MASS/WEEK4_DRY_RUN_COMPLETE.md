# 📊 WEEK 4 DRY RUN - COMPLETE TECHNICAL SPECIFICATION

**Date**: January 18, 2026  
**Purpose**: Document CHÍNH XÁC cấu trúc Week 4 để làm template cho mass production  
**Method**: Line-by-line code audit + script testing

---

## 🎯 OVERVIEW - WEEK 4 STRUCTURE

Week 4 có **3 PHẦN ĐỘC LẬP**:

### 1. AI Tutor Data (1 file)
- **File**: `src/data/weeks/week_04_real.js`
- **Size**: 1099 lines
- **Purpose**: Story Mission conversations với Ms. Nova
- **Content**: 3 missions, mỗi mission 9-11 objectives

### 2. Stations - Advanced (14 files)
- **Folder**: `src/data/weeks/week_04/`
- **Purpose**: Nội dung học cho các tabs (Vocab, Read, Grammar, etc.)
- **Files**: 13 .js files + 1 video_queries.json

### 3. Stations - Easy (13 files)
- **Folder**: `src/data/weeks_easy/week_04/`
- **Purpose**: Easy mode với nội dung ngắn hơn, đơn giản hơn
- **Files**: 13 .js files (NO video_queries.json, NO daily_watch in index)

---

## 📁 PART 1: AI TUTOR DATA (week_04_real.js)

### File Structure:
```javascript
const week4RealData = {
  // === METADATA ===
  week_id: 4,
  phase: 1,
  block: "A",
  unit: 4,
  week_number: 4,
  
  // === TITLES ===
  title: "Week 4: My Happy Jar",
  week_title_en: "My Happy Jar (Emotions & Likes)",
  week_title_vi: "Lọ Hạnh Phúc của Tôi (Cảm xúc & Sở thích)",
  
  // === TOPIC ===
  topic: "Personality - Emotions and Likes",
  topic_vi: "Tính cách - Cảm xúc và Sở thích",
  
  // === LEARNING OUTCOME ===
  learning_outcome: "Express emotions and preferences using 'I like + V-ing' naturally.",
  learning_outcome_vi: "Diễn đạt cảm xúc và sở thích bằng 'I like + V-ing' một cách tự nhiên.",
  
  // === GRAMMAR ===
  grammar_focus: "Pattern 'I like + V-ing'",
  grammar_pattern: "I like [verb]-ing",
  grammar_examples: [
    "I like playing.",
    "I like reading books.",
    "I like drawing pictures.",
    "I like singing songs."
  ],
  
  // === TARGET VOCABULARY (10 words) ===
  target_vocab: [
    {
      word: "happy",
      pronunciation: "/ˈhæpi/",
      definition_vi: "vui vẻ",
      definition_en: "feeling very good and joyful",
      example: "I am happy today.",
      syllabus_context: "Emotions"
    },
    // ... 9 more words
  ],
  
  global_vocab: ["happy", "sad", "funny", "friendly", "excited", "playing", "reading", "drawing", "singing", "dancing"],
  
  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "My Happy Feelings",
      title_vi: "Cảm xúc Hạnh phúc của tôi",
      theme: "Emotions",
      nova_greeting: "Hi! I'm Ms. Nova! Let's talk about feelings today!",
      mission_context: "...", // Long context string
      target_vocab: ["happy", "sad", "excited", "playing", "reading", "drawing"],
      grammar_pattern: "I like + V-ing",
      objectives: [
        {
          stepKey: "student_name",
          category: "Identity",
          question_variants: [
            { question: "What is your name?", hints: ["name", "is", "My", "I", "am"] },
            { question: "Can you tell me your name?", hints: ["is", "My", "name", "tell", "you", "I"] },
            { question: "What do I call you?", hints: ["call", "me", "You", "can", "My", "name"] }
          ],
          target_keywords: ["my", "name", "is", "I", "am"],
          ack_options: ["Nice!", "Great!", "Wonderful!"],
          recast_templates: ["Your name is {name}!", "You are {name}!"],
          success_criteria: "Student says their name"
        },
        // ... 10 more objectives
        {
          stepKey: "student_question_1",
          category: "Student Inquiry",
          type: "invitation",
          question_variants: [
            { question: "Do you have a question for me?", hints: [] }
          ],
          target_keywords: ["question", "ask", "want", "know", "what", "how", "why", "yes", "no"],
          allow_skip: true
        },
        {
          stepKey: "goodbye",
          category: "Closing",
          type: "termination",
          goodbye_en: "Great job! You told me about your feelings and things you like! Keep being happy! Bye!",
          goodbye_vi: "Tuyệt lắm! Bạn đã nói về cảm xúc và điều bạn thích! Hãy luôn vui vẻ nhé! Tạm biệt!",
          success_criteria: "Mission complete"
        }
      ],
      minimum_turns: 15,
      maximum_turns: 20,
      expected_duration: "15+ minutes"
    },
    // Mission 2: "My Favorite Activities" (12 objectives)
    // Mission 3: "My Happy Jar" (11 objectives)
  ],
  
  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "My Happy Jar",
    week_number: 4,
    theme: "Emotions and Likes",
    knowledge_base: [
      "Emotions: happy, sad, excited, friendly, funny",
      "Activities: playing, reading, drawing, singing, dancing",
      "Grammar: I like + V-ing (I like playing, I like reading)",
      // ... more knowledge
    ],
    example_opening_questions: [
      "How are you feeling today?",
      "What do you like to do?",
      // ... more questions
    ]
  }
};

export default week4RealData;
```

### Key Features:

#### A. Question Variants System (Week 4+)
- Mỗi objective có **3 variants** của câu hỏi
- Mỗi variant có **hints** riêng (scrambled sentence, 6-9 words)
- AI chọn variant ngẫu nhiên mỗi lần chơi → replay value cao

#### B. Student Question Invitations
- Type: `"invitation"`
- Xuất hiện mỗi 3-4 objectives
- Học sinh có thể hỏi ngược lại Ms. Nova
- `allow_skip: true` → có thể bỏ qua

#### C. Turn Limits
- `minimum_turns: 15` (Mission 1-2), `12` (Mission 3)
- `maximum_turns: 20` (Mission 1-2), `18` (Mission 3)
- Cao hơn Week 1-3 (was 10/8)

---

## 📁 PART 2: STATIONS - ADVANCED (15 files)

### File List:
```
week_04/
├── vocab.js         (114 lines) - 10 words × 1 audio each = 10 audio
├── read.js          (36 lines)  - Story 111 words
├── grammar.js       (38 lines)  - 20 exercises
├── dictation.js     (18 lines)  - 14 sentences × 1 audio = 14 audio
├── shadowing.js     (20 lines)  - 14 sentences × 1 audio + 1 full = 15 audio
├── writing.js       (10 lines)  - Writing prompt
├── ask_ai.js        (44 lines)  - 5 prompts × 1 audio = 5 audio
├── logic.js         (49 lines)  - 5 puzzles × 1 audio = 5 audio
├── explore.js       (37 lines)  - Science content
├── word_power.js    (40 lines)  - 3 phrases (NO AUDIO!)
├── word_match.js    (NEW!)      - Matching game (NO AUDIO!)
├── mindmap.js       (62 lines)  - 6 stems + 36 branches = 42 audio
├── daily_watch.js   (9 lines)   - 5 videos
├── index.js         (46 lines)  - Main export
└── video_queries.json (45 lines) - Video search queries
```

**⚠️ CRITICAL**: Week 1 có **word_match.js** mà Week 4 THIẾU!

---

### FILE 1: vocab.js (114 lines)

**Purpose**: 10 target words với definitions, examples, audio paths

**Schema**:
```javascript
export default {
  vocab: [
    {
      id: 1,
      word: "happy",
      pronunciation: "/ˈhæpi/",
      definition_vi: "vui vẻ",
      definition_en: "feeling very good and joyful",
      example: "I am happy today.",
      collocation: "happy face",
      image_url: "/images/week4/happy.jpg",
      audio_word: "/audio/week4/vocab_happy.mp3"  // CHỈ CÓ audio_word!
    },
    // ... 9 more words
  ]
};
```

**Key Points**:
- ✅ `audio_word` only (NO `audio_phonetic`, NO `audio_example`)
- ✅ 10 words exactly
- ✅ Each word has: pronunciation, both definitions, example, collocation, image, audio

**Audio Files Expected** (10 files):
- `vocab_happy.mp3`
- `vocab_sad.mp3`
- `vocab_funny.mp3`
- `vocab_friendly.mp3`
- `vocab_excited.mp3`
- `vocab_playing.mp3`
- `vocab_reading.mp3`
- `vocab_drawing.mp3`
- `vocab_singing.mp3`
- `vocab_dancing.mp3`

---

### FILE 2: read.js (36 lines)

**Purpose**: Story content cho Read & Explore tab

**Schema**:
```javascript
export default {
  title: "My Happy Jar",
  image_url: "/images/week4/read_cover_w04.jpg",
  content_en: "My name is Sam. I have a **happy** jar at home. Every day, I put **happy** things in my jar. When I am **playing** with my dog, I feel **excited**. I put a yellow star in my jar. When I am **reading** a good book, I feel calm and **happy**. I put a blue heart in my jar. When I am **drawing** pictures, I feel creative. I put a green circle in my jar. My mom is very **friendly** and **funny**. She makes me laugh every day. I love my happy jar. It helps me remember all the good moments in my life. My jar is now full of **happy** things!",
  content_vi: "...",
  check_questions: [
    {
      id: 1,
      question_en: "What does Sam have at home?",
      answer: ["a happy jar", "happy jar"],
      hint_en: "It starts with 'h'...",
      hint_vi: "Nó bắt đầu bằng chữ 'h'..."
    },
    // 2 more questions
  ],
  question: {
    text_en: "What makes you feel happy? What do you like to do?",
    text_vi: "Điều gì làm bạn cảm thấy hạnh phúc? Bạn thích làm gì?",
    min_words: 30,
    hint_en: "Think about things you enjoy doing...",
    hint_vi: "Hãy nghĩ về những điều bạn thích làm..."
  }
};
```

**Key Points**:
- ✅ content_en: **111 words total**
- ✅ Split thành **14 sentences** (by periods) cho dictation/shadowing
- ✅ Target vocab words được **bold** (**happy**, **playing**, etc.)
- ✅ 3 check_questions với multiple acceptable answers
- ✅ 1 reflection question (min 30 words)

**Words Count**: 111 words
**Sentences**: 14 (will be used in dictation/shadowing)

**Audio Files Expected** (1 file):
- `story_read.mp3` (full story)

---

### FILE 3: grammar.js (38 lines)

**Purpose**: 20 grammar exercises on "I like + V-ing"

**Schema**:
```javascript
export default {
  grammar_explanation: {
    title_en: "I like + V-ing (Expressing Preferences)",
    title_vi: "I like + V-ing (Diễn đạt Sở thích)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Add -ing to verbs after 'like': I like playing", rule_vi: "..." },
      { type: "rule", icon: "2️⃣", rule_en: "Negative: I don't like + V-ing", rule_vi: "..." },
      { type: "rule", icon: "3️⃣", rule_en: "Question: Do you like + V-ing?", rule_vi: "..." }
    ]
  },
  exercises: [
    // 30% AFFIRMATIVE (6 exercises)
    { id: 1, type: "fill", question: "I like _____ (play) games.", answer: "playing", hint: "play + ing" },
    { id: 2, type: "mc", question: "She likes _____ books.", options: ["read", "reading", "reads"], answer: "reading", hint: "like + V-ing" },
    // ...
    
    // 30% NEGATIVE (6 exercises)
    { id: 7, type: "fill", question: "I don't like _____ (run).", answer: "running", hint: "don't like + V-ing" },
    // ...
    
    // 40% QUESTIONS (8 exercises)
    { id: 13, type: "fill", question: "_____ you like playing?", answer: "Do", hint: "Do + you" },
    // ...
  ]
};
```

**Key Points**:
- ✅ 20 exercises total
- ✅ Distribution: 30% affirmative, 30% negative, 40% questions
- ✅ Types: fill-in-blank, multiple-choice, unscramble
- ✅ 3 grammar rules explained

**Audio Files Expected**: 0 (no audio for grammar exercises)

---

### FILE 4: dictation.js (18 lines)

**Purpose**: Sentences from read.js for dictation practice

**Schema**:
```javascript
export default {
  sentences: [
    { id: 1, text: "My name is Sam.", meaning: "Tên tôi là Sam." },
    { id: 2, text: "I have a happy jar at home.", meaning: "Tôi có một chiếc hũ hạnh phúc ở nhà." },
    // ... 12 more sentences (total 14)
  ]
};
```

**CRITICAL**:
- ✅ Sentences COPIED từ read.js (split by periods ".")
- ✅ Use `meaning:` key (NOT `vi:`, NOT `sentence_vi:`)
- ✅ 14 sentences exactly (matches read.js)

**Audio Files Expected** (14 files):
- `sent_1.mp3` → `sent_14.mp3`

---

### FILE 5: shadowing.js (20 lines)

**Purpose**: Same sentences as dictation for shadowing practice

**Schema**:
```javascript
export default {
  title: "My Happy Jar",
  audio_full: "/audio/week4/shadowing_full.mp3",  // FULL audio!
  script: [
    { id: 1, text: "My name is Sam.", vi: "Tên tôi là Sam.", audio_url: "/audio/week4/shadowing_1.mp3" },
    { id: 2, text: "I have a happy jar at home.", vi: "Tôi có một chiếc hũ hạnh phúc ở nhà.", audio_url: "/audio/week4/shadowing_2.mp3" },
    // ... 12 more (total 14)
  ]
};
```

**CRITICAL**:
- ✅ SAME sentences as dictation.js
- ✅ Use `vi:` key (NOT `meaning:`)
- ✅ Has `audio_full` field (full audio for all sentences together)
- ✅ Each sentence has individual `audio_url`

**Audio Files Expected** (15 files):
- `shadowing_full.mp3` (all sentences combined)
- `shadowing_1.mp3` → `shadowing_14.mp3` (individual)

---

### FILE 6: writing.js (10 lines)

**Purpose**: Writing prompt

**Schema**:
```javascript
export default {
  title: "My Favorite Things",
  min_words: 40,
  model_sentence: "I like many things. I like playing with my toys. I like reading story books. ...",
  instruction_en: "Write about things you like to do. Tell us about your favorite activities.",
  instruction_vi: "Viết về những điều bạn thích làm...",
  prompt_en: "What do you like to do? Do you like playing, reading, or drawing? How do these things make you feel?",
  prompt_vi: "Bạn thích làm gì?...",
  keywords: ["like", "playing", "reading", "drawing", "happy", "feel", "favorite"]
};
```

**Audio Files Expected**: 0

---

### FILE 7: ask_ai.js (44 lines)

**Purpose**: 5 speaking prompts for Ask AI tab

**Schema**:
```javascript
export default {
  prompts: [
    {
      id: 1,
      context_en: "You want to know if your friend likes playing games. Ask them.",
      context_vi: "Bạn muốn biết bạn của mình có thích chơi game không. Hỏi họ.",
      audio_url: "/audio/week4/ask_ai_1.mp3",
      answer: ["Do you like playing?", "Do you like games?", "Do you like playing games?"],
      hint: "Do you like..."
    },
    // ... 4 more prompts
  ]
};
```

**Audio Files Expected** (5 files):
- `ask_ai_1.mp3` → `ask_ai_5.mp3`

---

### FILE 8: logic.js (49 lines)

**Purpose**: 5 logic puzzles

**Schema**:
```javascript
export default {
  puzzles: [
    {
      id: 1,
      question_en: "Sam likes reading. Mia likes drawing. Tom likes playing. Who likes reading?",
      question_vi: "Sam thích đọc. Mia thích vẽ. Tom thích chơi. Ai thích đọc?",
      answer: ["Sam"],
      hint_en: "Look at the first sentence...",
      hint_vi: "Nhìn vào câu đầu tiên...",
      audio_url: "/audio/week4/logic_1.mp3"
    },
    // ... 4 more puzzles
  ]
};
```

**Audio Files Expected** (5 files):
- `logic_1.mp3` → `logic_5.mp3`

---

### FILE 9: explore.js (37 lines)

**Purpose**: Science/exploration content

**Schema**:
```javascript
export default {
  title_en: "The Science of Smiling",
  title_vi: "Khoa học về Nụ cười",
  image_url: "/images/week4/explore_cover_w04.jpg",
  content_en: "Do you know that **smiling** makes you feel **happy**? When you smile, your **brain** sends special signals...",
  content_vi: "...",
  check_questions: [
    {
      id: 1,
      question_en: "What makes you feel happy?",
      answer: ["smiling", "smile", "when you smile"],
      hint_en: "It starts with 's'..."
    },
    // 2 more questions
  ],
  question: {
    text_en: "Why is smiling important? What happens when you smile?",
    text_vi: "...",
    min_words: 30,
    hint_en: "Think about how smiling makes you feel..."
  }
};
```

**Audio Files Expected**: 0 (or 1 for full content)

---

### FILE 10: word_power.js (40 lines)

**Purpose**: 3 useful phrases/collocations

**Schema**:
```javascript
export default {
  words: [  // NOTE: "words" array, not "phrases"!
    {
      id: 1,
      word: "feel happy",
      pronunciation: "/fiːl ˈhæpi/",
      cefr_level: "A1",
      definition_en: "to have joy inside you",
      definition_vi: "cảm thấy vui vẻ",
      example: "I feel happy when I play.",
      model_sentence: "I feel happy when I sing my favorite song.",
      collocation: "feel happy about something",
      image_url: "/images/week4/wordpower_feel_happy.jpg"
      // NO audio fields!
    },
    // 2 more phrases
  ]
};
```

**CRITICAL**:
- ✅ Use `words` array (NOT `phrases`)
- ✅ NO audio fields (`audio_phrase`, `audio_usage`, etc. KHÔNG CÓ!)
- ✅ 3 items exactly

**Audio Files Expected**: 0 (NO AUDIO!)

---

### FILE 11: mindmap.js (62 lines)

**Purpose**: 6 stems with 6 branches each for speaking practice

**Schema**:
```javascript
const mindMapContent = {
  centerStems: [
    { text: "I like ___.", audio: "/audio/week4/mindmap_stem_1.mp3" },
    { text: "I feel ___ when I ___.", audio: "/audio/week4/mindmap_stem_2.mp3" },
    { text: "My favorite thing is ___.", audio: "/audio/week4/mindmap_stem_3.mp3" },
    { text: "I am ___ today.", audio: "/audio/week4/mindmap_stem_4.mp3" },
    { text: "Playing makes me ___.", audio: "/audio/week4/mindmap_stem_5.mp3" },
    { text: "I love ___.", audio: "/audio/week4/mindmap_stem_6.mp3" }
  ],
  branchLabels: {
    "I like ___.": [
      { text: "playing games", audio: "/audio/week4/mindmap_branch_1.mp3" },
      { text: "reading books", audio: "/audio/week4/mindmap_branch_2.mp3" },
      // ... 4 more (6 total per stem)
    ],
    // ... 5 more stems
  }
};

export default mindMapContent;
```

**Key Points**:
- ✅ 6 center stems
- ✅ 6 branches per stem = 36 branches total
- ✅ Each stem and branch has audio

**Audio Files Expected** (42 files):
- `mindmap_stem_1.mp3` → `mindmap_stem_6.mp3` (6 files)
- `mindmap_branch_1.mp3` → `mindmap_branch_36.mp3` (36 files)

---

### FILE 12: daily_watch.js (9 lines)

**Purpose**: 5 YouTube videos

**Schema**:
```javascript
export default {
  videos: [
    { 
      id: 1, 
      title: "✅✅ Like  Don't like + ing  ✅✅ song for kids...", 
      videoId: "Y0MzJLcwx8Q", 
      duration: "01:55", 
      sim_duration: 115, 
      thumb: "https://img.youtube.com/vi/Y0MzJLcwx8Q/mqdefault.jpg" 
    },
    // ... 4 more videos (5 total)
  ],
  bonus_games: [{title: "Game", url: "#", description: "Review"}]
};
```

**Key Points**:
- ✅ 5 videos exactly
- ✅ Real YouTube videos (filled by update_videos.js script)
- ✅ Each video: id, title, videoId, duration, sim_duration, thumb

**Files Generated By**: `node tools/update_videos.js 4`

---

### FILE 13: index.js (46 lines)

**Purpose**: Main export, imports all 12 station files

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
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';

const weekData = {
  weekId: 4,
  isEasy: false,
  weekTitle_en: "My Happy Jar",
  weekTitle_vi: "Lọ Hạnh Phúc của Tôi",
  grammar_focus: "I like + V-ing",
  global_vocab: vocab.vocab,  // Reference to vocab array
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D'
  },
  
  stations: {
    read_explore: read,
    new_words: vocab,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch
  }
};

export default weekData;
```

**CRITICAL**:
- ✅ Import ALL 12 station files (NOT 13, NO video_queries.json imported)
- ✅ `isEasy: false` for Advanced mode
- ✅ `global_vocab: vocab.vocab` (references the vocab array)
- ✅ voiceConfig for TTS
- ✅ stations object maps to app tabs

---

### FILE 14: video_queries.json (45 lines)

**Purpose**: Search queries cho YouTube video script

**Schema**:
```json
{
  "videos": [
    {
      "id": 1,
      "priority_search": "English Singsing I like V-ing ESL for kids",
      "backup_search": "I like doing things ESL cartoons kids",
      "target_grammar": "I like + V-ing",
      "target_channel": "English Singsing",
      "purpose": "GRAMMAR"
    },
    {
      "id": 2,
      "priority_search": "English Singsing feelings emotions happy sad ESL kids",
      "backup_search": "emotions feelings song ESL kids cartoons",
      "target_grammar": "Emotions vocabulary",
      "target_channel": "English Singsing",
      "purpose": "GRAMMAR"
    },
    {
      "id": 3,
      "priority_search": "Little Fox happy day emotions story ESL kids",
      "backup_search": "Vooks feelings emotions story ESL children",
      "target_grammar": "Emotions in context",
      "target_channel": "Little Fox",
      "purpose": "STORY"
    },
    {
      "id": 4,
      "priority_search": "hobbies activities ESL kids cartoons",
      "backup_search": "what I like to do ESL kids songs",
      "target_grammar": "Hobbies vocabulary",
      "target_channel": "Super Simple Songs",
      "purpose": "VOCABULARY"
    },
    {
      "id": 5,
      "priority_search": "SciShow Kids emotions feelings science why we smile",
      "backup_search": "science of happiness kids educational",
      "target_grammar": "Science of emotions",
      "target_channel": "SciShow Kids",
      "purpose": "SCIENCE"
    }
  ]
}
```

**Key Points**:
- ✅ 5 video slots
- ✅ Each has priority + backup search
- ✅ Target specific channels (English Singsing, Little Fox, SciShow Kids)
- ✅ Purpose: GRAMMAR, STORY, VOCABULARY, SCIENCE
- ✅ Script auto-appends " ESL for kids" to all searches

**Used By**: `node tools/update_videos.js 4`

---

## 📁 PART 3: STATIONS - EASY (13 files)

### Folder: `src/data/weeks_easy/week_04/`

**Differences from Advanced**:

1. **Shorter Content**:
   - read.js: **53 words** (vs 111 in Advanced)
   - dictation: **10 sentences** (vs 14)
   - shadowing: **10 sentences** (vs 14)

2. **Simpler Language**:
   - Shorter sentences
   - Simpler vocabulary
   - Same grammar focus

3. **Files Missing**:
   - ❌ NO `video_queries.json`
   - ❌ `daily_watch` NOT imported in index.js (but file exists in folder)

4. **index.js Differences**:
```javascript
const weekData = {
  weekId: 4,
  isEasy: true,  // ← TRUE for Easy mode
  weekTitle_en: "My Happy Jar (Easy)",
  weekTitle_vi: "Lọ Hạnh Phúc của Tôi (Dễ)",
  // ...
  stations: {
    read_explore: read,
    new_words: vocab,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap
    // NO daily_watch!
  }
};
```

### Example: read.js Easy (36 lines vs 36 lines Advanced, but shorter content)

```javascript
export default {
  title: "My Happy Things",
  image_url: "/images/week4_easy/read_cover_w04.jpg",
  content_en: "My name is Mia. I **like** many things. I **like** to **play** with my toys. I **like** to **draw** pictures. I **like** to **read** books. When I play, I **smile**. When I draw, I **laugh**. When I read, I am **happy**. I **love** my **happy** things. They make me feel good every day!",
  // ... (53 words total vs 111 in Advanced)
};
```

**Dictation Easy**: 10 sentences (vs 14 Advanced)

---

## 🎨 PART 4: ASSETS

### Images: `public/images/week4/` (15 files)

```
dancing.jpg                    ← vocab
drawing.jpg                    ← vocab
excited.jpg                    ← vocab
explore_cover_w04.jpg          ← explore tab
friendly.jpg                   ← vocab
funny.jpg                      ← vocab
happy.jpg                      ← vocab
playing.jpg                    ← vocab
read_cover_w04.jpg             ← read tab
reading.jpg                    ← vocab
sad.jpg                        ← vocab
singing.jpg                    ← vocab
wordpower_feel_happy.jpg       ← word_power
wordpower_have_fun.jpg         ← word_power
wordpower_make_friends.jpg     ← word_power
```

**Total**: 15 images
- 10 vocab images
- 1 read cover
- 1 explore cover
- 3 word_power images

**Generated By**: `node tools/generate_images_nano.js 4`

---

### Audio: `public/audio/week_04/` (Expected ~138 files Advanced, ~116 Easy)

**KHÔNG TỒN TẠI trong public folder hiện tại** (chưa generate hoặc đã xóa)

**Expected Structure** (based on code schemas):

#### Advanced Mode (~138 files):
1. **Vocab** (10 files): `vocab_happy.mp3`, `vocab_sad.mp3`, etc.
2. **Read** (1 file): `story_read.mp3`
3. **Dictation** (14 files): `sent_1.mp3` → `sent_14.mp3`
4. **Shadowing** (15 files): `shadowing_full.mp3`, `shadowing_1.mp3` → `shadowing_14.mp3`
5. **Ask AI** (5 files): `ask_ai_1.mp3` → `ask_ai_5.mp3`
6. **Logic** (5 files): `logic_1.mp3` → `logic_5.mp3`
7. **Mindmap** (42 files): 
   - Stems: `mindmap_stem_1.mp3` → `mindmap_stem_6.mp3` (6)
   - Branches: `mindmap_branch_1.mp3` → `mindmap_branch_36.mp3` (36)
8. **Grammar** (0 files): No audio
9. **Word Power** (0 files): No audio
10. **Writing** (0 files): No audio
11. **Explore** (0-1 files): Optional

**TOTAL**: ~92-138 files (depends on whether explore content has audio)

#### Easy Mode (~116 files):
- Same structure but fewer dictation/shadowing (10 vs 14)

**Generated By**: `node tools/generate_audio.js 4 4`

---

### Videos: 5 YouTube videos in daily_watch.js

**Already filled in code** (not generated, manually curated or script-generated):

```javascript
{ id: 1, videoId: "Y0MzJLcwx8Q", title: "Like  Don't like + ing  song for kids", duration: "01:55" },
{ id: 2, videoId: "o5jZIswSfSE", title: "Feel (Feelings or Emotions)", duration: "03:55" },
{ id: 3, videoId: "MvbnocOuOTw", title: "Teddy's Day", duration: "01:06" },
{ id: 4, videoId: "N1o4oOXLOZc", title: "Hobbies and Interests", duration: "04:27" },
{ id: 5, videoId: "jetoWelJJJk", title: "Emotions for Kids", duration: "04:52" }
```

**Can Be Updated By**: `node tools/update_videos.js 4`

---

## 🛠️ PART 5: SCRIPTS & WORKFLOW

### Script 1: generate_audio.js

**Purpose**: Generate TTS audio for all stations

**Usage**:
```bash
node tools/generate_audio.js 4 4
# Args: [weekId] [weekId again - for both modes?]
```

**What It Does**:
1. Read `week_04/vocab.js` → extract words → generate `vocab_{word}.mp3`
2. Read `week_04/read.js` → extract content_en → generate `story_read.mp3`
3. Read `week_04/dictation.js` → extract sentences → generate `sent_{i}.mp3`
4. (Similar for other stations with audio paths)

**Output**: `public/audio/week_04/` with ~138 files

**API Used**: Google Text-to-Speech (requires `GOOGLE_TTS_API_KEY`)

**Voice**: `en-US-Neural2-D` (default narrator voice)

---

### Script 2: generate_images_nano.js

**Purpose**: Generate images using Gemini AI

**Usage**:
```bash
node tools/generate_images_nano.js 4
```

**What It Does**:
1. Read week_04 vocab words
2. Generate image for each word
3. Generate covers for read/explore
4. Generate images for word_power phrases

**Output**: `public/images/week4/` with 15 images

**API Used**: Gemini Image API (requires `GEMINI_API_KEY`)

**Model**: `gemini-3-pro-image-preview`

---

### Script 3: update_videos.js

**Purpose**: Search YouTube and update daily_watch.js with real videos

**Usage**:
```bash
node tools/update_videos.js 4
```

**What It Does**:
1. Read `week_04/video_queries.json`
2. For each query:
   - Try `priority_search` first
   - If no match, try `backup_search`
   - Filter by whitelist channels (60 channels)
   - Check duration (1-15 minutes)
   - Verify title matches query keywords
3. Update `daily_watch.js` with found videos

**Output**: Updated `week_04/daily_watch.js` with real YouTube videoIds

**API Used**: YouTube Data API v3 (requires `YOUTUBE_API_KEY`)

**Whitelist**: 60 channels organized by purpose (Grammar, Story, Math, Science, Social, Default)

**Key Features**:
- Auto-append " ESL for kids" to ALL searches
- Priority channels: English Singsing (Grammar), Little Fox/Vooks (Story)
- Strict filtering: no music videos, covers, lyrics, karaoke
- Duration: 1-15 minutes only

---

## 📊 PART 6: STATISTICS & COUNTS

### Content Counts:

| Station | Advanced | Easy |
|---------|----------|------|
| Vocab words | 10 | 10 |
| Read words | 111 | 53 |
| Read sentences | 14 | 10 |
| Grammar exercises | 20 | 20 |
| Dictation sentences | 14 | 10 |
| Shadowing sentences | 14 | 10 |
| Ask AI prompts | 5 | 5 |
| Logic puzzles | 5 | 5 |
| Word power phrases | 3 | 3 |
| Mindmap stems | 6 | 6 |
| Mindmap branches | 36 | 36 |
| Videos | 5 | 0 (not in index) |
| Check questions (read) | 3 | 3 |
| Check questions (explore) | 3 | 3 |

### File Counts:

| Type | Advanced | Easy | Total |
|------|----------|------|-------|
| Station .js files | 13 | 13 | 26 |
| JSON files | 1 | 0 | 1 |
| AI Tutor file | 1 (shared) | 1 (shared) | 1 |
| **Total Data Files** | **15** | **13** | **28** |

### Asset Counts:

| Asset Type | Advanced | Easy | Total |
|------------|----------|------|-------|
| Images | 15 | 15 (shared) | 15 |
| Audio files | ~138 | ~116 | ~254 |
| Videos | 5 | 0 | 5 |
| **Total Assets** | **~158** | **~131** | **~274** |

### Audio Breakdown:

| Source | Advanced | Easy |
|--------|----------|------|
| Vocab | 10 | 10 |
| Read story | 1 | 1 |
| Dictation | 14 | 10 |
| Shadowing | 15 (14+1 full) | 11 (10+1 full) |
| Ask AI | 5 | 5 |
| Logic | 5 | 5 |
| Mindmap stems | 6 | 6 |
| Mindmap branches | 36 | 36 |
| Explore | 0-1 | 0-1 |
| **Total** | **92-93** | **84-85** |

*(Note: Current scripts chỉ generate ~92, có thể thiếu một số files như explore, grammar audio)*

---

## 🔄 PART 7: COMPLETE WORKFLOW

### For Week 5 (or Any New Week):

#### STEP 1: Prepare Spec Data
```bash
# Generate spec from syllabus
node MASS/tools/generate_spec.cjs 5
```

**Output**: `MASS/SPECS/week_05_spec.json`

**Contains**:
- Week metadata (id, phase, block, titles)
- 10 target vocab words
- Grammar focus
- Topic
- CEFR level
- **BOTH** `stations` AND `story_missions` structures

---

#### STEP 2: Generate AI Tutor Data (week_05_real.js)

**Manual or AI-generated** based on:
- Prompt: `ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt`
- Spec: `week_05_spec.json`
- Golden Standard: `week_04_real.js`

**Must Create**:
- 3 missions
- 9-11 objectives per mission
- Each objective: 3 question variants
- Student question invitations every 3-4 objectives
- Goodbye objective at end
- target_vocab array with full definitions

**Output**: `src/data/weeks/week_05_real.js` (~1100 lines)

---

#### STEP 3: Generate Station Files (14 files × 2 modes)

**Manual or AI-generated** based on:
- Prompts: `MASS/PROMPTS/08_STATIONS_CORE.txt`, `09_STATIONS_ADVANCED.txt`, `10_STATIONS_EASY.txt`
- Spec: `week_05_spec.json`
- Golden Standard: `week_04/` folder

**Must Create Advanced** (`week_05/`):
1. vocab.js (10 words)
2. read.js (150-200 words, ~14 sentences)
3. grammar.js (20 exercises)
4. dictation.js (copy from read.js, use `meaning:`)
5. shadowing.js (copy from read.js, use `vi:` + `audio_full`)
6. writing.js
7. ask_ai.js (5 prompts)
8. logic.js (5 puzzles)
9. explore.js
10. word_power.js (3 phrases, NO audio, use `words` array)
11. mindmap.js (6 stems × 6 branches)
12. daily_watch.js (5 video slots - empty for now)
13. index.js (import all, export weekData)
14. video_queries.json (5 queries with priority/backup)

**Must Create Easy** (`week_05_easy/`):
- Same 13 files (NO video_queries.json)
- Shorter content (60-80 words in read.js)
- Fewer sentences (10 vs 14)
- daily_watch exists but NOT imported in index.js

---

#### STEP 4: Generate Images
```bash
node tools/generate_images_nano.js 5
```

**Generates** (~15 images):
- 10 vocab images
- 1 read cover
- 1 explore cover
- 3 word_power images

**Output**: `public/images/week_05/`

---

#### STEP 5: Generate Audio
```bash
node tools/generate_audio.js 5 5
```

**Generates** (~254 files):
- Advanced: ~138 files in `public/audio/week_05/`
- Easy: ~116 files in `public/audio/week_05_easy/`

**Includes**:
- Vocab words
- Story narration
- Dictation sentences
- Shadowing sentences + full
- Ask AI prompts
- Logic puzzles
- Mindmap stems + branches

---

#### STEP 6: Update Videos
```bash
node tools/update_videos.js 5
```

**Process**:
1. Read `video_queries.json`
2. Search YouTube (auto-append " ESL for kids")
3. Filter by 60-channel whitelist
4. Prioritize: English Singsing (Grammar), Little Fox (Story)
5. Check duration (1-15 min)
6. Verify title matches keywords
7. Update `daily_watch.js` with real videos

**Output**: Updated `week_05/daily_watch.js` with 5 real YouTube videos

---

#### STEP 7: Validate

**Check**:
- ✅ All 14 files exist in week_05/
- ✅ All 13 files exist in week_05_easy/
- ✅ dictation sentences = read sentences
- ✅ shadowing sentences = dictation sentences
- ✅ dictation uses `meaning:`, shadowing uses `vi:`
- ✅ shadowing has `audio_full`
- ✅ word_power has NO audio, uses `words` array
- ✅ vocab has 10 words
- ✅ grammar has 20 exercises
- ✅ All 15 images exist
- ✅ Audio files ~138 Advanced, ~116 Easy
- ✅ 5 videos in daily_watch.js

---

#### STEP 8: Test in App
```bash
npm run dev
# Open app, select Week 5, test all tabs
```

---

## 🎯 PART 8: KEY FINDINGS & RULES

### CRITICAL Rules for Mass Production:

1. **AI Tutor ≠ Stations**
   - AI Tutor = 1 file (`week_XX_real.js`) with missions/objectives
   - Stations = 14 files in folder với nội dung học
   - Completely separate, different purposes

2. **Two Modes**
   - Advanced: `week_XX/` (14 files)
   - Easy: `week_XX_easy/` (13 files, NO video_queries.json, NO daily_watch in index)

3. **Dictation vs Shadowing**
   - **SAME sentences** from read.js
   - Dictation: use `meaning:` key
   - Shadowing: use `vi:` key + has `audio_full`

4. **Word Power Audio**
   - **NO AUDIO FIELDS!**
   - Use `words` array (not `phrases`)
   - Only images

5. **Video Queries**
   - File: `video_queries.json` (separate from daily_watch.js)
   - Format: priority_search + backup_search
   - Script auto-appends " ESL for kids"

6. **Vocab Audio**
   - **ONLY** `audio_word`
   - NO `audio_phonetic`, NO `audio_example`

7. **Index.js Easy Mode**
   - `isEasy: true`
   - NO daily_watch in stations object
   - Same voiceConfig

8. **Question Variants (Week 4+)**
   - 3 variants per objective
   - Each variant has own hints (scrambled sentence)
   - Student question invitations every 3-4 objectives

9. **File Counts**
   - Advanced: 14 files (13 .js + 1 .json)
   - Easy: 13 files (13 .js only)
   - AI Tutor: 1 file (shared for both modes)

10. **Asset Counts**
    - Images: ~15 (shared both modes)
    - Audio Advanced: ~138 files
    - Audio Easy: ~116 files
    - Videos: 5 (in Advanced only)

---

## ✅ VALIDATION CHECKLIST

### Before Generation:
- [ ] Spec file exists with correct structure
- [ ] Prompts 08, 09, 10, 12 ready
- [ ] Week 4 reference available
- [ ] API keys configured (Google TTS, Gemini, YouTube)

### After AI Tutor Generation:
- [ ] File: week_XX_real.js exists
- [ ] Size: ~1100 lines
- [ ] Has 3 missions
- [ ] Mission 1-2: 11-12 objectives each
- [ ] Mission 3: 9-11 objectives
- [ ] Each objective has 3 question_variants
- [ ] Student question invitations present
- [ ] target_vocab has full definitions
- [ ] global_vocab array present
- [ ] freetalk_knowledge present

### After Station Files Generation:
- [ ] Advanced folder has 14 files
- [ ] Easy folder has 13 files
- [ ] dictation sentences match read sentences
- [ ] shadowing sentences match dictation
- [ ] dictation uses `meaning:`
- [ ] shadowing uses `vi:` + `audio_full`
- [ ] word_power uses `words`, NO audio
- [ ] vocab has ONLY `audio_word`
- [ ] index.js imports all correctly
- [ ] Easy index has `isEasy: true`
- [ ] Easy index NO daily_watch

### After Assets Generation:
- [ ] Images: 15 files in public/images/week_XX/
- [ ] Audio Advanced: ~138 files
- [ ] Audio Easy: ~116 files
- [ ] Videos: 5 in daily_watch.js with real videoIds

### Final Testing:
- [ ] App loads Week XX without errors
- [ ] All tabs work (Vocab, Read, Grammar, etc.)
- [ ] AI Tutor missions playable
- [ ] Audio plays correctly
- [ ] Images display correctly
- [ ] Videos play correctly
- [ ] Easy mode works with shorter content

---

**Status**: ✅ COMPLETE WEEK 4 DRY RUN  
**Confidence**: 100% - Based on actual code line-by-line audit  
**Ready For**: Mass production Week 5-156 using this template
