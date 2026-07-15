# ENGQUEST MASTER PROMPT V24.2 - PRODUCTION READY
## Complete Code Generation Protocol for Mass Production

**Version**: 24.2 (Final Production)  
**Status**: PRODUCTION READY  
**Golden Standard**: Week 1 Advanced & Easy Mode  
**Last Updated**: 13/01/2026

---

## I. OBJECTIVE

Generate complete, error-free ESL content for EngQuest3k. All content MUST match A0/A0++ beginner level for Vietnamese children ages 6-10.

**CRITICAL PRINCIPLE**: Content difficulty = Student level, NOT native speaker level.

---

## II. APP ARCHITECTURE OVERVIEW

### A. Weekly Stations (15 total)
| # | Station | Data File | Purpose |
|---|---------|-----------|---------|
| 1 | Read & Explore | read.js | Main reading passage |
| 2 | New Words | vocab.js | 10 core vocabulary |
| 3 | Word Match | word_match.js | Matching game |
| 4 | Grammar | grammar.js | Grammar exercises |
| 5 | Mindmap Speaking | mindmap.js | Speaking practice |
| 6 | Ask AI | ask_ai.js | Question formation |
| 7 | Dictation | dictation.js | Listening & typing |
| 8 | Shadowing | shadowing.js | Pronunciation |
| 9 | Writing | writing.js | Writing challenge |
| 10 | Explore | explore.js | CLIL non-fiction |
| 11 | Logic Lab | logic.js | Math word problems |
| 12 | Word Power | word_power.js | Collocations |
| 13 | Daily Watch | daily_watch.js | YouTube videos |
| 14 | Game Hub | N/A | Built-in games |
| 15 | Self Regulation | N/A | Goal setting |

### B. AI Tutor (5 Tabs)
| Tab | Data Source | Purpose |
|-----|-------------|---------|
| Story Mission | week_XX_real.js | Guided conversation |
| Free Talk | week data | Open conversation |
| Pronunciation | vocab.js | Word practice |
| Quiz | week data | Dynamic quizzes |
| Debate | N/A | Argumentation |

---

## III. CEFR LEVEL GUIDELINES

### A0 / A0++ (Phase 1: Weeks 1-54)

**VOCABULARY**:
- Tier 1 only: concrete nouns, basic verbs
- Max 2 syllables preferred
- Examples: book, pen, school, happy, go, see, have

**GRAMMAR**:
- Present simple ONLY
- Subject + Be: "I am", "She is", "They are"
- Subject + Verb: "I have", "I like", "I go"
- Questions: "What is...?", "Where is...?", "Can I...?"
- NO: past tense, future tense, conditionals, passive voice

**SENTENCES**:
- Max 6-8 words per sentence
- Simple structure: S + V + O
- NO compound sentences with "because", "although", "however"

**QUESTION PATTERNS (A0 ONLY)**:
```
✅ ALLOWED:
- What is this?
- Where is the book?
- Is this a pen?
- Can I play?
- Do you like school?
- How are you?

❌ NOT ALLOWED:
- How do they go to school? (too complex)
- What does it do? (too complex)
- Where can I find...? (too complex)
- May I do both? (too formal)
```

---

## IV. FILE SCHEMAS (GOLDEN STANDARD)

### 1. `index.js` - Week Aggregator

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
  weekId: NUMBER,
  isEasy: BOOLEAN,
  weekTitle_en: "string",
  weekTitle_vi: "string",
  grammar_focus: "string",
  global_vocab: vocab.vocab,
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
    daily_watch: daily_watch,
    mindmap_speaking: mindmap
  }
};

export default weekData;
```

---

### 2. `read.js` - Read & Explore

```javascript
export default {
  title: "string",                   // 3-5 words
  image_url: "string",
  content_en: "string",              // **10 bolded words** = vocab.js
                                     // Advanced: 8-12 sentences (max 10 words each)
                                     // Easy: 6-8 sentences (max 8 words each)
  content_vi: "string",
  audio_url: null,
  comprehension_questions: [
    {
      id: NUMBER,
      question_en: "string",         // Simple Wh-question (max 5 words)
      answer: ["string"],            // Short answers (max 4 words)
      hint_en: "string",
      hint_vi: "string"
    }
  ]  // EXACTLY 3 questions
};
```

**COMPREHENSION QUESTION EXAMPLES (A0)**:
```javascript
// ✅ GOOD (A0 level):
{ question_en: "What is his name?", answer: ["Alex", "His name is Alex"] }
{ question_en: "Where is the book?", answer: ["On the desk"] }
{ question_en: "Is she happy?", answer: ["Yes", "Yes, she is"] }

// ❌ BAD (too complex):
{ question_en: "Why does Alex go to the library?" }
{ question_en: "How does the magnifying glass work?" }
```

---

### 3. `vocab.js` - New Words

```javascript
export default {
  vocab: [
    {
      id: NUMBER,
      word: "string",                // Max 2 syllables for A0
      pronunciation: "string",
      definition_vi: "string",
      definition_en: "string",       // A0: "You [verb] with it." style
      example: "string",             // Max 6 words
      collocation: "string",
      image_url: "string",
      audio_word: "string"
    }
  ]  // EXACTLY 10 words
};
```

**DEFINITION STYLE BY LEVEL**:
```javascript
// A0 (Easy) - Action-based, kid-friendly:
definition_en: "You sit on it."
definition_en: "You write with it."
definition_en: "A place to learn."

// A1 (Advanced) - Simple dictionary:
definition_en: "A piece of furniture for sitting."
definition_en: "A tool for writing."
definition_en: "A building where students learn."
```

---

### 4. `ask_ai.js` - Ask AI Station

## ⚠️ CRITICAL: A0/A0++ LEVEL REQUIREMENTS

This station teaches question formation. ALL content must match A0 beginner level.

```javascript
export default {
  prompts: [
    {
      id: NUMBER,
      context_en: "string",          // MAX 10 words, simple present
      context_vi: "string",
      audio_url: null,
      answer: ["string"],            // A0-level questions ONLY
      hint: "string"                 // 2 words max: "What is..."
    }
  ]  // EXACTLY 5 prompts
};
```

### A0 QUESTION PATTERNS (ALLOWED ONLY):

| Pattern | Example | Notes |
|---------|---------|-------|
| What + be | What is this? | Basic identification |
| Where + be | Where is the pen? | Location |
| Is + subject | Is this a book? | Yes/No |
| Can I | Can I play? | Permission |
| Do you + verb | Do you like it? | Simple preference |

### FORBIDDEN PATTERNS (NOT A0):

| Pattern | Why Forbidden |
|---------|---------------|
| How do they... | Requires 3rd person plural + do |
| What does it do? | "does" + verb base is A1 |
| Where can I find...? | "can + find" is A1 |
| Why is/are... | "Why" questions are A1+ |
| How many/much... | Quantifiers are A1 |

### GOLDEN STANDARD EXAMPLES:

```javascript
// ✅ CORRECT A0 PROMPTS:

// Prompt 1 - What is this?
{
  id: 1,
  context_en: "You see a bag. Ask what it is.",
  context_vi: "Bạn thấy một cái cặp. Hỏi nó là gì.",
  answer: ["What is this?", "What is it?"],
  hint: "What is..."
}

// Prompt 2 - Where is...?
{
  id: 2,
  context_en: "You want the pen. Ask where.",
  context_vi: "Bạn muốn cái bút. Hỏi ở đâu.",
  answer: ["Where is the pen?", "Where is it?"],
  hint: "Where is..."
}

// Prompt 3 - Is this...?
{
  id: 3,
  context_en: "You see a book. Ask if it is yours.",
  context_vi: "Bạn thấy một quyển sách. Hỏi có phải của bạn.",
  answer: ["Is this my book?", "Is this mine?"],
  hint: "Is this..."
}

// Prompt 4 - Can I...?
{
  id: 4,
  context_en: "Friends play. You want to join.",
  context_vi: "Bạn bè đang chơi. Bạn muốn tham gia.",
  answer: ["Can I play?"],
  hint: "Can I..."
}

// Prompt 5 - Do you...?
{
  id: 5,
  context_en: "You like the book. Ask your friend.",
  context_vi: "Bạn thích sách. Hỏi bạn mình.",
  answer: ["Do you like it?", "Do you like this book?"],
  hint: "Do you..."
}
```

### ❌ INCORRECT EXAMPLES (DO NOT USE):

```javascript
// ❌ WRONG - "How do they" is A1+
{
  context_en: "Children go to school. Some walk. Ask HOW they go.",
  answer: ["How do they go to school?"]  // TOO COMPLEX
}

// ❌ WRONG - "What does it do" is A1
{
  context_en: "You see a magnifying glass. Ask what it does.",
  answer: ["What does it do?"]  // TOO COMPLEX
}

// ❌ WRONG - Context too long
{
  context_en: "You are at the library. You see many books. You want to know WHERE the animal books are."
  // 22 WORDS - TOO LONG!
}
```

### CONTEXT LENGTH RULES:

| Phase | Max Words | Max Sentences |
|-------|-----------|---------------|
| Phase 1 (A0) | 10 words | 2 sentences |
| Phase 2 (A1) | 20 words | 3 sentences |
| Phase 3 (A2-B1) | 30 words | 4 sentences |

---

### 5. `daily_watch.js` - Daily Watch

## ⚠️ CRITICAL: PRIORITY YOUTUBE CHANNELS

```javascript
export default {
  videos: [
    {
      id: NUMBER,
      title: "string",
      videoId: "string",             // 11-char YouTube ID
      duration: "string",            // "MM:SS"
      sim_duration: NUMBER,          // Seconds
      thumb: "string",               // YouTube thumbnail
      channel: "string",             // Channel name for tracking
      purpose: "string"              // "GRAMMAR" | "STORY" | "VOCABULARY" | "SCIENCE"
    }
  ]  // 3-5 videos
};
```

### PRIORITY CHANNEL SYSTEM:

#### 🥇 TIER 1 - MUST USE (Priority Order):

| Channel | Purpose | Search Pattern | Notes |
|---------|---------|----------------|-------|
| **English Singsing** | GRAMMAR | `English Singsing [grammar topic]` | Grammar songs, dialogues |
| **Little Fox** | STORY | `Little Fox [topic] story` | Animated stories |
| **Vooks** | STORY | `Vooks [topic]` | Read-aloud stories |

#### 🥈 TIER 2 - RECOMMENDED:

| Channel | Purpose | Notes |
|---------|---------|-------|
| Super Simple Songs | Vocabulary, Songs | Very beginner-friendly |
| British Council Kids | Grammar, Vocabulary | Official ESL content |
| Numberblocks | Math/CLIL | Numbers, patterns |
| SciShow Kids | Science/CLIL | Science topics |

#### 🥉 TIER 3 - ACCEPTABLE:

| Channel | Purpose | Notes |
|---------|---------|-------|
| Peppa Pig | Contextual vocabulary | Familiar characters |
| Cocomelon | Very basic vocabulary | For youngest learners |
| National Geographic Kids | Science/CLIL | Nature, animals |

### VIDEO SELECTION RULES:

1. **Every week MUST have**:
   - 1-2 videos from **English Singsing** (grammar focus)
   - 1-2 videos from **Little Fox** or **Vooks** (story focus)
   - 1 video matching week's CLIL/Science topic

2. **Search Pattern**:
```
[Channel Name] + [topic] + ESL kids
```

3. **Duration Guidelines**:
   - Phase 1: 2-5 minutes preferred
   - Phase 2: 5-10 minutes acceptable
   - Phase 3: Up to 15 minutes

### GOLDEN STANDARD VIDEO SELECTION (Week 1):

```javascript
export default {
  videos: [
    // 🥇 GRAMMAR - English Singsing (PRIORITY)
    {
      id: 1,
      title: "I am, You are, He is - English Singsing",
      videoId: "...", // Find actual video
      duration: "04:30",
      sim_duration: 270,
      channel: "English Singsing",
      purpose: "GRAMMAR"
    },
    // 🥇 GRAMMAR - English Singsing (PRIORITY)
    {
      id: 2,
      title: "Subject Pronouns Song - English Singsing",
      videoId: "...",
      duration: "03:45",
      sim_duration: 225,
      channel: "English Singsing",
      purpose: "GRAMMAR"
    },
    // 🥇 STORY - Little Fox (PRIORITY)
    {
      id: 3,
      title: "First Day of School - Little Fox",
      videoId: "...",
      duration: "05:00",
      sim_duration: 300,
      channel: "Little Fox",
      purpose: "STORY"
    },
    // 🥈 VOCABULARY - Tier 2
    {
      id: 4,
      title: "School Supplies Song - Super Simple",
      videoId: "...",
      duration: "03:30",
      sim_duration: 210,
      channel: "Super Simple Songs",
      purpose: "VOCABULARY"
    },
    // 🥈 SCIENCE - Tier 2
    {
      id: 5,
      title: "Magnifying Glass - SciShow Kids",
      videoId: "...",
      duration: "04:00",
      sim_duration: 240,
      channel: "SciShow Kids",
      purpose: "SCIENCE"
    }
  ]
};
```

### `video_queries.json` - Search Keywords:

```json
{
  "weekId": 1,
  "theme": "Hello World - Identity",
  "searchPriority": [
    "English Singsing",
    "Little Fox",
    "Vooks"
  ],
  "videos": [
    {
      "id": 1,
      "purpose": "GRAMMAR",
      "priority_search": "English Singsing verb to be am is are",
      "backup_search": "am is are ESL kids song"
    },
    {
      "id": 2,
      "purpose": "GRAMMAR",
      "priority_search": "English Singsing subject pronouns I you he she",
      "backup_search": "pronouns song ESL kids"
    },
    {
      "id": 3,
      "purpose": "STORY",
      "priority_search": "Little Fox school story level 1",
      "backup_search": "Vooks school story read aloud"
    },
    {
      "id": 4,
      "purpose": "VOCABULARY",
      "priority_search": "English Singsing school supplies",
      "backup_search": "school supplies ESL kids song"
    },
    {
      "id": 5,
      "purpose": "SCIENCE",
      "priority_search": "SciShow Kids magnifying glass",
      "backup_search": "science tools for kids"
    }
  ]
}
```

---

### 6. `word_power.js` - Collocations

```javascript
export default {
  words: [
    {
      id: NUMBER,
      word: "string",                // A0: verb + noun only
      pronunciation: "string",
      cefr_level: "A1",              // Phase 1 = A1
      definition_en: "string",
      definition_vi: "string",
      example: "string",             // Max 8 words
      model_sentence: "string",
      collocation: "string",
      image_url: "string"
    }
  ]
};
```

**QUANTITY BY PHASE**:
| Phase | Count | Type |
|-------|-------|------|
| 1 (1-54) | 3 | Simple: go to school, do homework |
| 2 (55-120) | 5 | Phrasal verbs: look at, pick up |
| 3 (121-156) | 7 | Idioms: piece of cake |

---

### 7. `grammar.js` - Grammar Station

```javascript
export default {
  grammar_explanation: {
    title_en: "string",
    title_vi: "string",
    rules: [
      {
        type: "rule",
        icon: "1️⃣",
        rule_en: "string",           // Max 10 words
        rule_vi: "string"
      }
    ]  // 2-4 rules
  },
  exercises: [
    {
      id: NUMBER,
      type: "mc" | "fill" | "unscramble",
      question: "string",            // Max 8 words
      options: ["string"],
      answer: "string",
      hint: "string"
    }
  ]  // EXACTLY 20 exercises
};
```

**EXERCISE MIX**:
- Multiple choice: 10-12
- Fill blank: 4-6
- Unscramble: 2-4

**MUST INCLUDE**:
- Affirmative: "I am happy."
- Negative: "I am not sad."
- Question: "Are you happy?"

---

### 8. `logic.js` - Logic Lab

```javascript
export default {
  puzzles: [
    {
      id: NUMBER,
      type: "math" | "logic" | "pattern",
      title_en: "string",
      title_vi: "string",
      question_en: "string",         // Full context, simple words
      question_vi: "string",
      answer: ["string"],            // Include unit: "5 pencils"
      hint_en: "string",
      hint_vi: "string"
    }
  ]
};
```

**QUANTITY BY PHASE**:
| Phase | Count |
|-------|-------|
| 1 | 5 |
| 2 | 7 |
| 3 | 10 |

---

### 9. `explore.js` - CLIL Explore

```javascript
export default {
  title_en: "string",
  title_vi: "string",
  image_url: "string",
  content_en: "string",              // **10 different bolded words**
  content_vi: "string",
  check_questions: [
    {
      id: NUMBER,
      question_en: "string",         // A0 simple question
      answer: ["string"],
      hint_en: "string",
      hint_vi: "string"
    }
  ],  // 3 questions
  question: {
    text_en: "string",               // Critical thinking
    text_vi: "string",
    min_words: NUMBER,               // 20 (Easy) or 30 (Advanced)
    hint_en: "string",
    hint_vi: "string"
  }
};
```

---

### 10. `mindmap.js` - Mindmap Speaking

```javascript
const mindMapContent = {
  centerStems: [
    "I am ___.",                     // 4-6 stems using week grammar
  ],
  branchLabels: {
    "I am ___.": [
      "happy",                       // 4-6 simple completions
      "a student",
      "at school"
    ]
  }
};

export default mindMapContent;
```

---

### 11. Other Files (Brief)

**`dictation.js`**: Extract sentences from read.js
**`shadowing.js`**: Copy from read.js with audio paths
**`writing.js`**: Prompt + keywords + model sentence
**`word_match.js`**: `{ pairs: [1,2,3,4,5,6,7,8,9,10] }`

---

## V. AI TUTOR DATA FILES

### `week_XX_real.js` - Story Missions

```javascript
export const weekXRealData = {
  week_id: NUMBER,
  phase: NUMBER,
  
  // 3 Story Missions per week
  story_missions: [
    {
      mission_id: NUMBER,
      title: "string",
      nova_greeting: "string",       // Natural, short greeting
      mission_context: "string",     // AI instructions
      target_vocab: ["string"],      // 3-5 words per mission
      target_pattern: "string",      // Grammar pattern
      conversation_topics: ["string"],
      minimum_turns: 10,
      maximum_turns: 15
    }
  ],
  
  nova_instructions: {
    conversation_style: [
      "Keep responses under 20 words",
      "One question per turn",
      "Use A0 vocabulary only",
      "NO emojis in responses"
    ]
  },
  
  global_vocab: [ ... ],
  word_power: { words: [ ... ] }
};
```

---

## VI. QUALITY CHECKLIST

### Before Generation
- [ ] Identify Phase (1/2/3) and CEFR level (A0/A1/A2)
- [ ] Read Syllabus for week theme and grammar
- [ ] Note priority channels for videos

### Content Validation
- [ ] All vocab words bolded in read.js (exact match)
- [ ] Ask AI: context ≤10 words, A0 questions only
- [ ] Daily Watch: 2+ videos from priority channels
- [ ] Grammar: includes negative and question forms
- [ ] Logic: full context, answers include units

### Video Selection
- [ ] At least 1 English Singsing (grammar)
- [ ] At least 1 Little Fox or Vooks (story)
- [ ] All videos under 10 minutes for Phase 1
- [ ] Search pattern: `[Channel] + [topic] + ESL kids`

---

## VII. PHASE-LEVEL SUMMARY

| Aspect | Phase 1 (A0) | Phase 2 (A1) | Phase 3 (A2-B1) |
|--------|--------------|--------------|-----------------|
| Vocab syllables | 1-2 | 2-3 | 3+ |
| Sentence length | 6-8 words | 10-12 words | 15+ words |
| Question types | What is, Where is, Can I | How do, What does, Why | Complex Wh-, conditionals |
| Video length | 2-5 min | 5-10 min | 10-15 min |
| Writing min | 40 words | 100 words | 150 words |
| Logic puzzles | 5 | 7 | 10 |
| Word power | 3 | 5 | 7 |

---

## VIII. EXECUTION ORDER

1. `vocab.js` - Foundation
2. `read.js` - Story with bolded vocab
3. `dictation.js` - From read.js
4. `shadowing.js` - From read.js
5. `explore.js` - CLIL content
6. `grammar.js` - 20 exercises
7. `ask_ai.js` - A0 questions
8. `logic.js` - Math with context
9. `word_power.js` - Collocations
10. `writing.js` - Prompt
11. `mindmap.js` - Speaking stems
12. `daily_watch.js` - Priority channels
13. `video_queries.json` - Search keywords
14. `word_match.js` - Vocab IDs
15. `index.js` - Aggregator
16. `week_XX_real.js` - AI Tutor
17. `weekX_objectives.js` - AI objectives

---

## IX. COMMON MISTAKES TO AVOID

### Ask AI
❌ "How do they go to school?" → Too complex
✅ "Do you go to school?" → A0 level

❌ Context: 25 words → Too long
✅ Context: 8 words → Appropriate

### Daily Watch
❌ Random ESL videos → Inconsistent quality
✅ English Singsing + Little Fox → Consistent, vetted

### Vocabulary
❌ "magnificent" → Too advanced
✅ "big" → A0 appropriate

### Grammar
❌ Only affirmative sentences
✅ Mix of affirmative, negative, questions

## X. ASSET GENERATION & SAFETY PROTOCOL (IMPORTED FROM V21)
After generating the 17 data files, you MUST output a tools/mass_produce_week_[ID].sh script that performs these actions automatically:

Safety Check: Use tools/update_db_smart.js to safely insert the new week into src/data/syllabus_database.js (Never use simple text append).

Asset Generation (Post-Processing):

Run node tools/generate_audio.js [WEEK_ID] to generate TTS audio for vocab, dictation, and read.

Run node tools/generate_images.js [WEEK_ID] to fetch images based on vocab.js image prompts.

Video Fetching:

Generate src/data/video_tasks.json from video_queries.json.

Run node tools/update_videos.js [WEEK_ID] to fetch IDs from YouTube and populate daily_watch.js with real data.

UI Patching:

Run node tools/fix_video_flash.js to ensure the Video UI handles the new data correctly.

---

*End of ENGQUEST MASTER PROMPT V24.2*
