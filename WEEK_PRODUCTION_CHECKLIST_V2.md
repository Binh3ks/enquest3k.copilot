# ✅ WEEK PRODUCTION CHECKLIST V2.0
*Updated Jan 26, 2026 - Based on Week 7 lessons learned*

---

## 📋 PRE-PRODUCTION (5 phút)

### ✅ Input Requirements
- [ ] **Syllabus data** collected for Week [N]:
  - [ ] Week title (EN + VI)
  - [ ] Topic/theme
  - [ ] Grammar focus pattern
  - [ ] 10 Advanced vocabulary words
  - [ ] 10 Easy vocabulary words (from Blueprint)

### ✅ Environment Setup
```bash
# 1. Create folder structure
mkdir -p src/data/weeks/week_[N]
mkdir -p src/data/weeks_easy/week_[N]  
mkdir -p public/audio/week[N]
mkdir -p public/audio/week[N]_easy
mkdir -p public/images/week[N]
mkdir -p public/images/week[N]_easy

# 2. Verify Week 5 reference files exist
ls src/data/weeks/week_05_real.js
ls src/data/weeks/week_05/*.js
ls src/data/weeks_easy/week_05/*.js
```

---

## 🎯 STEP 1: AI TUTOR CORE (45 phút)

### File: `src/data/weeks/week_[N]_real.js`

#### ✅ 1.1 Metadata Structure
```javascript
const week[N]RealData = {
  // === METADATA ===
  week_id: [N],
  phase: 1,
  block: "A",
  unit: 1,
  week_number: [N],
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week [N]: [Title from Syllabus]",
  week_title_en: "[Title EN]",
  week_title_vi: "[Title VI]",
  
  topic: "[Topic from Syllabus]",
  topic_vi: "[Topic VI]",
  
  learning_outcome: "[Outcome EN]",
  learning_outcome_vi: "[Outcome VI]",
  
  grammar_focus: "[Grammar from Syllabus]",
  grammar_pattern: "[Pattern format]",
  grammar_examples: [
    "[Example 1]",
    "[Example 2]",
    "[Example 3]",
    "[Example 4]"
  ],
```

- [ ] week_id matches folder number
- [ ] title matches Syllabus
- [ ] grammar_focus EXACTLY from Syllabus
- [ ] grammar_examples follow ONLY the week's grammar (no past tense in present simple week!)

#### ✅ 1.2 Target Vocabulary (10 Advanced words)
```javascript
  target_vocab: [
    {
      word: "[word]",
      pronunciation: "/[IPA]/",
      definition_vi: "[Vietnamese]",
      definition_en: "[English]",
      example: "[Sentence using word + grammar]",
      syllabus_context: "[Category]"
    },
    // ... 9 more (TOTAL: 10 words from Syllabus)
  ],
  
  global_vocab: ["[word1]", "[word2]", ..., "[word10]"], // Array of 10 words
```

- [ ] Exactly 10 words from Syllabus
- [ ] Each has pronunciation (IPA format)
- [ ] Each has definition_vi + definition_en
- [ ] Example sentences use week's grammar ONLY
- [ ] global_vocab array matches target_vocab words

#### ✅ 1.3 Story Missions (3 missions × ~150 lines each = 450 lines)

**⚠️ CRITICAL REQUIREMENTS PER MISSION:**

```javascript
  story_missions: [
    {
      mission_id: 1,
      title: "[Mission Title EN]",
      title_vi: "[Mission Title VI]",
      theme: "[Theme]",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Ms. Nova",
        personality: "[3-4 traits]",
        backstory: "[1-2 sentences about character]",
        speaking_style: "[How they talk]",
        facts: {
          [key]: [value],
          // 5-8 facts about character
        }
      },
      
      // 🎬 OPENING NARRATIVE (First thing AI says)
      opening_narrative: "[Greeting + mission intro + name question]",
      
      // 📝 MISSION CONTEXT (Instructions for AI)
      mission_context: `This is Week [N] Mission [#] - [Mission Name]. 
      STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. 
      LANGUAGE: SIMPLE words, max 8 words per sentence. 
      GRAMMAR FOCUS: [Grammar pattern]. 
      VOCABULARY: [5-7 target words]. 
      GAME MECHANIC: [How mission works]. 
      ENCOURAGE: [What to reinforce]. 
      AVOID: [What NOT to do]. 
      FOCUS: [Main learning goal].`,
      
      target_vocab: ["[word1]", "[word2]", ...], // 5-7 words
      
      grammar_pattern: "[Pattern to practice]",
      
      // 📖 STORY ARC (4 phases)
      story_arc: [
        {
          phase: "introduction",
          turns: "1-4",
          goal: "[What to achieve]",
          required_vocab: ["[optional words]"],
          phase_questions: [
            "[Question 1]",
            "[Question 2]",
            "[Question 3]",
            "[Question 4]"
          ]
        },
        {
          phase: "[main activity]",
          turns: "5-12",
          goal: "[Main learning activity]",
          required_vocab: ["[word1]", "[word2]", ...],
          phase_questions: [
            "[Question 1]",
            "[Question 2]",
            // ... 6-8 questions
          ]
        },
        {
          phase: "[practice/application]",
          turns: "13-17",
          goal: "[Apply learning]",
          required_vocab: ["[word1]", ...],
          phase_questions: [
            "[Question 1]",
            "[Question 2]",
            // ... 4-5 questions
          ]
        },
        {
          phase: "conclusion",
          turns: "18-20",
          goal: "Wrap up and celebrate",
          required_vocab: [],
          phase_questions: [
            "[Review question]",
            "[Goodbye]"
          ]
        }
      ],
      
      // 🎯 TURN LIMIT
      minimum_turns: 15,
      maximum_turns: 20,
      
      // 🎯 OBJECTIVES (10-12 objectives with anti-repetition)
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
          recast_templates: [
            "Your name is {name}!",
            "You are {name}!"
          ],
          success_criteria: "Student says their name"
        },
        // ... 9-11 more objectives covering:
        // - Main vocabulary items (3-5 objectives)
        // - Grammar practice (2-3 objectives)
        // - Activity-specific tasks (3-4 objectives)
        // - Preference/reflection (1-2 objectives)
      ]
    },
    // Mission 2 (same structure)
    // Mission 3 (same structure)
  ],
```

**Checklist per Mission:**
- [ ] mission_id: 1, 2, 3
- [ ] story_character has 5+ facts
- [ ] opening_narrative asks name at end
- [ ] mission_context describes mechanic clearly
- [ ] target_vocab: 5-7 words (subset of 10)
- [ ] grammar_pattern matches week focus
- [ ] story_arc has 4 phases with turn ranges
- [ ] phase_questions total 15-20 questions
- [ ] minimum_turns: 15, maximum_turns: 20
- [ ] **objectives array with 10-12 items:**
  - [ ] First objective is ALWAYS student_name
  - [ ] Has 3 question_variants for name (anti-repetition)
  - [ ] Each objective has target_keywords
  - [ ] Each objective has success_criteria
  - [ ] Covers all target_vocab words
  - [ ] Includes grammar practice objectives

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Missing objectives → AI asks name 10 times
- ✅ **GOOD**: 10-12 objectives with question_variants → Name asked once, then remembered

#### ✅ 1.4 Free Talk Knowledge Base
```javascript
  freetalk_knowledge: {
    week_title: "[Week Title]",
    week_number: [N],
    theme: "[Theme]",
    
    knowledge_base: [
      "[Fact 1 about topic]",
      "[Fact 2 about topic]",
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

- [ ] knowledge_base has 10 facts about topic
- [ ] example_opening_questions has 7-10 questions
- [ ] starter_prompts has 3 buttons (game, roleplay, chat)

---

## 🎭 STEP 2: DYNAMIC ROLEPLAYS (15 phút)

### File: `src/services/ai_tutor/dynamicRoleplays.js`

**⚠️ CRITICAL**: Add 3 week-specific roleplays to `ROLEPLAY_TEMPLATES` object

```javascript
// In ROLEPLAY_TEMPLATES object, add:
[N]: [ // Week [N] specific roleplays
  {
    id: `week${N}_roleplay_1`,
    title: "[Roleplay Title 1]",
    title_vi: "[Title VI]",
    emoji: "🏠", // Choose relevant emoji
    ai_role: {
      character: "[Character Name]",
      personality: "[Personality traits]",
      context: "[Setting/situation]",
      speaking_style: "[How they talk]",
      opening_line: "[First thing AI says]"
    },
    student_role: "[What student plays]",
    scenario: "[2-3 sentence description]",
    target_vocab: ["[word1]", "[word2]", ..., "[word5]"], // 5-7 words from week
    grammar_focus: "[Grammar pattern]",
    natural_flow: true,
    conversation_goals: [
      "[Goal 1]",
      "[Goal 2]",
      "[Goal 3]"
    ],
    example_turns: [
      {
        ai: "[Example AI line]",
        student_options: ["[Option 1]", "[Option 2]", "[Option 3]"]
      },
      // 2-3 example turns
    ]
  },
  // Roleplay 2
  // Roleplay 3
],
```

**Checklist for 3 Roleplays:**
- [ ] Each has unique id: `week[N]_roleplay_1/2/3`
- [ ] Titles match week theme (not generic!)
- [ ] ai_role.opening_line uses week grammar
- [ ] target_vocab: 5-7 words from week
- [ ] grammar_focus matches week pattern
- [ ] natural_flow: true (conversational, not Q&A)
- [ ] conversation_goals: 3 specific goals
- [ ] example_turns show realistic conversation

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Using old universal roleplays (Lost and Found, Restaurant)
- ✅ **GOOD**: Week-specific (Week 7 "Inside My Backpack" → School Supply Shop, Backpack Organizer, Classroom Helper)

---

## 📂 STEP 3: STATION DATA FILES (90 phút)

### 🗂️ File Creation Order (14 files × 2 modes = 28 files)

**Priority 1: Core Content (60 min)**
1. **vocab.js** (Advanced & Easy) - 10 words each
2. **read.js** (Advanced & Easy) - 12-15 sentences
3. **dictation.js** (Advanced & Easy) - Copy exact sentences from read.js
4. **shadowing.js** (Advanced & Easy) - Copy exact sentences + full story
5. **explore.js** (Advanced & Easy) - Cultural article

**Priority 2: Practice Activities (30 min)**
6. **word_power.js** (Advanced & Easy) - 3 collocations/phrases
7. **word_match.js** (Advanced & Easy) - 10 pairs
8. **grammar.js** (Advanced & Easy) - 20 exercises
9. **mindmap.js** (Advanced & Easy) - 6 stems + 36 branches

**Priority 3: Production Tasks (20 min)**
10. **writing.js** (Advanced & Easy) - 5 prompts
11. **logic.js** (Advanced & Easy) - 5 puzzles
12. **ask_ai.js** (Advanced & Easy) - 5 prompts (QUESTION FORMING!)

**Priority 4: Videos (Auto-generated)**
13. **daily_watch.js** (Advanced & Easy) - 5 YouTube videos
14. **video_queries.json** (Advanced only) - Auto-generated search queries

---

### ✅ 3.1 vocab.js (Both modes)

**Path**: `src/data/weeks/week_[N]/vocab.js` + `src/data/weeks_easy/week_[N]/vocab.js`

**Structure**:
```javascript
export default [
  {
    id: 1,
    word: "[word]",
    pronunciation: "/[IPA]/",
    definition_en: "[English definition]",
    definition_vi: "[Vietnamese definition]",
    example_en: "[Example sentence]",
    example_vi: "[Vietnamese example]",
    collocation_en: "[Collocation phrase]",
    collocation_vi: "[Vietnamese collocation]",
    image_url: "/images/week[N]/[word].jpg",
    audio_word: "/audio/week[N]/vocab_[word].mp3",
    audio_definition: "/audio/week[N]/vocab_def_[word].mp3",
    audio_example: "/audio/week[N]/vocab_ex_[word].mp3",
    audio_collocation: "/audio/week[N]/vocab_coll_[word].mp3"
  },
  // ... 9 more (TOTAL: 10 words)
];
```

**Checklist:**
- [ ] Advanced: 10 words from Syllabus
- [ ] Easy: 10 DIFFERENT words from Blueprint
- [ ] Each word has id: 1-10
- [ ] pronunciation in IPA format
- [ ] example_en uses week's grammar pattern
- [ ] collocation_en is natural phrase
- [ ] **ALL 5 URLs present**: image_url, audio_word, audio_definition, audio_example, audio_collocation
- [ ] URLs follow naming convention: `vocab_[word].mp3` (lowercase, underscores for spaces)

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Missing audio URLs → Silent audio players
- ✅ **GOOD**: All 5 URLs from the start → Audio generation checklist complete

---

### ✅ 3.2 word_power.js (Both modes)

**Path**: `src/data/weeks/week_[N]/word_power.js` + `src/data/weeks_easy/week_[N]/word_power.js`

**Structure**:
```javascript
export default {
  words: [
    {
      id: 1,
      word: "[phrase or collocation]",
      definition_en: "[English definition]",
      definition_vi: "[Vietnamese definition]",
      example_en: "[Example sentence]",
      example_vi: "[Vietnamese example]",
      collocation_en: "[Extended phrase]",
      collocation_vi: "[Vietnamese collocation]",
      model_sentence_en: "[Model sentence]",
      model_sentence_vi: "[Vietnamese model]",
      image_url: "/images/week[N]/wordpower_[phrase].jpg",
      audio_word: "/audio/week[N]/wordpower_[phrase].mp3",
      audio_def: "/audio/week[N]/wordpower_def_[phrase].mp3",
      audio_ex: "/audio/week[N]/wordpower_ex_[phrase].mp3",
      audio_coll: "/audio/week[N]/wordpower_coll_[phrase].mp3",
      audio_model: "/audio/week[N]/wordpower_model_[phrase].mp3"
    },
    // ... 2 more (TOTAL: 3 phrases)
  ]
};
```

**Checklist:**
- [ ] Exactly 3 words (collocations or phrasal verbs)
- [ ] Each has id: 1, 2, 3
- [ ] collocation_en extends the base word/phrase
- [ ] model_sentence_en demonstrates usage
- [ ] **ALL 6 URLs present**: image_url, audio_word, audio_def, audio_ex, audio_coll, audio_model
- [ ] URLs use prefix `wordpower_` to distinguish from vocab

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Field named `collocation` but data has `collocation_en` → Card shows nothing
- ✅ **GOOD**: Component checks `collocation_en || collocation` → Displays correctly

---

### ✅ 3.3 read.js (Both modes)

**Path**: `src/data/weeks/week_[N]/read.js` + `src/data/weeks_easy/week_[N]/read.js`

**Structure**:
```javascript
export default {
  title_en: "[Story Title]",
  title_vi: "[Title VI]",
  image_url: "/images/week[N]/read_cover_w0[N].jpg",
  audio_url: "/audio/week[N]/read_explore_main.mp3",
  story_en: "[12-15 sentences telling a story using 10 vocab words + grammar pattern]",
  story_vi: "[Vietnamese translation]",
  
  sentences: [
    { text_en: "[Sentence 1]", text_vi: "[Translation 1]" },
    { text_en: "[Sentence 2]", text_vi: "[Translation 2]" },
    // ... 10-13 more (TOTAL: 12-15 sentences)
  ],
  
  questions: [
    {
      question_en: "[Question 1]",
      question_vi: "[Question VI]",
      answer_en: "[Answer]",
      answer_vi: "[Answer VI]"
    },
    // ... 4 more (TOTAL: 5 questions)
  ]
};
```

**Checklist:**
- [ ] story_en has 12-15 sentences
- [ ] Uses ALL 10 target vocab words
- [ ] Uses week's grammar pattern ONLY
- [ ] sentences array matches story (same count)
- [ ] questions array has 5 comprehension questions
- [ ] image_url points to cover image
- [ ] audio_url points to narration audio

**⚠️ Critical:**
- This file is the SOURCE for dictation.js and shadowing.js
- Sentence count MUST be exact (dictation and shadowing will match)

---

### ✅ 3.4 dictation.js (Both modes)

**Path**: `src/data/weeks/week_[N]/dictation.js` + `src/data/weeks_easy/week_[N]/dictation.js`

**Structure**:
```javascript
export default {
  sentences: [
    {
      id: 1,
      text_en: "[Exact sentence 1 from read.js]",
      text_vi: "[Translation]",
      audio_url: "/audio/week[N]/dictation_1.mp3"
    },
    {
      id: 2,
      text_en: "[Exact sentence 2 from read.js]",
      text_vi: "[Translation]",
      audio_url: "/audio/week[N]/dictation_2.mp3"
    },
    // ... continue for ALL sentences (12-15 total)
  ]
};
```

**Checklist:**
- [ ] Sentence count MATCHES read.js exactly
- [ ] text_en is EXACT COPY from read.js sentences
- [ ] Each sentence has unique id (1, 2, 3, ...)
- [ ] Each sentence has audio_url: `/audio/week[N]/dictation_[number].mp3`
- [ ] No sentences modified or rewritten

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Field named `text` but component expects `text_en` → Dictation shows undefined
- ✅ **GOOD**: Use `text_en` consistently → Component works

---

### ✅ 3.5 shadowing.js (Both modes)

**Path**: `src/data/weeks/week_[N]/shadowing.js` + `src/data/weeks_easy/week_[N]/shadowing.js`

**Structure**:
```javascript
export default {
  title_en: "[Same as read.js]",
  title_vi: "[Same as read.js VI]",
  audio_full: "/audio/week[N]/shadowing_full.mp3",
  
  sentences: [
    {
      id: 1,
      text_en: "[Exact sentence 1 from read.js]",
      text_vi: "[Translation]",
      audio_url: "/audio/week[N]/shadowing_1.mp3"
    },
    {
      id: 2,
      text_en: "[Exact sentence 2 from read.js]",
      text_vi: "[Translation]",
      audio_url: "/audio/week[N]/shadowing_2.mp3"
    },
    // ... continue for ALL sentences (12-15 total)
  ]
};
```

**Checklist:**
- [ ] title matches read.js
- [ ] audio_full URL for complete narration
- [ ] sentences array is EXACT COPY of read.js sentences
- [ ] Sentence count MATCHES read.js and dictation.js
- [ ] Each sentence has audio_url: `/audio/week[N]/shadowing_[number].mp3`

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Component expects `script` array but data has `sentences` → Infinite "Loading Script..."
- ✅ **GOOD**: Component checks `data.script || data.sentences` → Works with both

---

### ✅ 3.6 explore.js (Both modes)

**Path**: `src/data/weeks/week_[N]/explore.js` + `src/data/weeks_easy/week_[N]/explore.js`

**Structure**:
```javascript
export default {
  title_en: "[Cultural/Knowledge Article Title]",
  title_vi: "[Title VI]",
  image_url: "/images/week[N]/explore_cover_w0[N].jpg",
  audio_url: "/audio/week[N]/explore_main.mp3",
  
  content_en: `[8-12 sentences about cultural topic related to week theme. Use markdown **bold** for vocab words.]`,
  content_vi: `[Vietnamese translation]`,
  
  check_questions: [
    {
      question_en: "[True/False question 1]",
      question_vi: "[Question VI]",
      correct_answer: true,
      explanation_en: "[Why true/false]",
      explanation_vi: "[Explanation VI]"
    },
    // ... 4 more (TOTAL: 5 T/F questions)
  ]
};
```

**Checklist:**
- [ ] content_en has 8-12 sentences
- [ ] Uses vocab words in **bold** markdown
- [ ] Topic relates to week theme but extends knowledge
- [ ] check_questions has 5 True/False questions
- [ ] Each question has explanation_en/vi
- [ ] image_url and audio_url present

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Missing check_questions array → Explore tab shows no quiz
- ✅ **GOOD**: 5 T/F questions with explanations → Interactive reading

---

### ✅ 3.7 mindmap.js (Both modes)

**Path**: `src/data/weeks/week_[N]/mindmap.js` + `src/data/weeks_easy/week_[N]/mindmap.js`

**Structure**:
```javascript
export default {
  centerTopic: "[Week topic/theme]",
  
  centerStems: [
    { 
      text: "[Sentence with ___ blank]", 
      audio: "/audio/week[N]/mindmap_stem_1.mp3" 
    },
    { 
      text: "[Sentence with ___ blank]", 
      audio: "/audio/week[N]/mindmap_stem_2.mp3" 
    },
    // ... 4 more (TOTAL: 6 stems)
  ],
  
  branchLabels: {
    "[Exact text from centerStems[0]]": [
      { text: "[option 1]", audio: "/audio/week[N]/mindmap_branch_1.mp3" },
      { text: "[option 2]", audio: "/audio/week[N]/mindmap_branch_2.mp3" },
      { text: "[option 3]", audio: "/audio/week[N]/mindmap_branch_3.mp3" },
      { text: "[option 4]", audio: "/audio/week[N]/mindmap_branch_4.mp3" },
      { text: "[option 5]", audio: "/audio/week[N]/mindmap_branch_5.mp3" },
      { text: "[option 6]", audio: "/audio/week[N]/mindmap_branch_6.mp3" }
    ],
    "[Exact text from centerStems[1]]": [
      { text: "[option 1]", audio: "/audio/week[N]/mindmap_branch_7.mp3" },
      // ... 5 more (branches 8-12)
    ],
    // ... 4 more groups (branches 13-36)
  }
};
```

**Checklist:**
- [ ] centerStems has exactly 6 items
- [ ] Each stem has text with "___" blank
- [ ] Each stem has audio URL (stem_1 through stem_6)
- [ ] branchLabels has 6 keys (matching centerStems text exactly!)
- [ ] Each key has 6 branch options
- [ ] Branches numbered 1-36 continuously (not 1-6 per group!)
- [ ] Total audio files: 6 stems + 36 branches = 42 files

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: branchLabels key doesn't match centerStems text → Branches don't display
- ✅ **GOOD**: Keys are EXACT copy of stem text → Mindmap works

---

### ✅ 3.8 grammar.js (Both modes)

**Path**: `src/data/weeks/week_[N]/grammar.js` + `src/data/weeks_easy/week_[N]/grammar.js`

**Structure**:
```javascript
export default {
  exercises: [
    {
      id: 1,
      type: "mc", // multiple choice
      question_en: "[Question]",
      question_vi: "[Question VI]",
      options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
      correct: 0, // Index of correct answer (0-3)
      explanation_en: "[Why this is correct]",
      explanation_vi: "[Explanation VI]"
    },
    {
      id: 2,
      type: "fill", // fill in the blank
      question_en: "[Sentence with ___ blank]",
      question_vi: "[Question VI]",
      correct: "[correct word/phrase]",
      hint_en: "[Optional hint]",
      hint_vi: "[Optional hint VI]"
    },
    {
      id: 3,
      type: "unscramble", // sentence ordering
      question_en: "[Sentence to unscramble]",
      question_vi: "[Question VI]",
      words: ["[word1]", "[word2]", "[word3]", ...],
      correct: "[Correct sentence]"
    },
    // ... 17 more (TOTAL: 20 exercises minimum)
  ]
};
```

**Checklist:**
- [ ] Minimum 20 exercises (can have more)
- [ ] Mix of types:
  - [ ] 8-10 multiple choice (mc)
  - [ ] 6-8 fill in blank (fill)
  - [ ] 4-6 unscramble (unscramble)
- [ ] Each exercise has unique id: 1-20+
- [ ] All questions test week's grammar pattern
- [ ] correct field matches type:
  - mc: index number (0-3)
  - fill: correct word/phrase (string)
  - unscramble: correct sentence (string)
- [ ] Optional: explanation_en for mc type

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Only 12 exercises → Grammar practice too short
- ✅ **GOOD**: 20+ exercises → Comprehensive practice

---

### ✅ 3.9 word_match.js (Both modes)

**Path**: `src/data/weeks/week_[N]/word_match.js` + `src/data/weeks_easy/week_[N]/word_match.js`

**Structure**:
```javascript
export default {
  pairs: [
    { 
      id: 1, 
      word: "[vocab word 1]", 
      definition: "[definition]", 
      image: "/images/week[N]/[word1].jpg" 
    },
    { 
      id: 2, 
      word: "[vocab word 2]", 
      definition: "[definition]", 
      image: "/images/week[N]/[word2].jpg" 
    },
    // ... 8 more (TOTAL: 10 pairs matching vocab.js)
  ]
};
```

**Checklist:**
- [ ] Exactly 10 pairs
- [ ] Words match vocab.js exactly
- [ ] Definitions match vocab.js
- [ ] Images reference vocab images (same URLs)
- [ ] Each pair has unique id: 1-10

---

### ✅ 3.10 writing.js (Both modes)

**Path**: `src/data/weeks/week_[N]/writing.js` + `src/data/weeks_easy/week_[N]/writing.js`

**Structure (SINGLE OBJECT FORMAT - NOT ARRAY!):**
```javascript
export default {
  title: "[Writing Topic]",
  min_words: 35,
  model_sentence: "[8-10 sentences showing model writing using vocab + grammar. This is the EXAMPLE students see.]",
  instruction_en: "[Clear instructions for writing task]",
  instruction_vi: "[Instructions VI]",
  prompt_en: "[Guiding questions for student]",
  prompt_vi: "[Questions VI]",
  keywords: ["[word1]", "[word2]", ..., "[word8]"] // 8-12 keywords
};
```

**Checklist:**
- [ ] **SINGLE OBJECT** (not array of prompts!)
- [ ] title describes writing topic
- [ ] min_words: 30-40 (appropriate for A0+ level)
- [ ] model_sentence is 8-10 sentences long
- [ ] model_sentence uses vocab words + grammar
- [ ] instruction_en is clear and simple
- [ ] prompt_en has 2-3 guiding questions
- [ ] keywords array has 8-12 relevant words

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Array format `{ prompts: [...] }` → Component expects single object
- ✅ **GOOD**: Single object with title, model_sentence, etc. → VideoChallenge component works
- Component path: `src/modules/video/VideoChallenge.jsx` expects `data.writing || data.video`

---

### ✅ 3.11 logic.js (Both modes)

**Path**: `src/data/weeks/week_[N]/logic.js` + `src/data/weeks_easy/week_[N]/logic.js`

**Structure**:
```javascript
export default {
  puzzles: [
    {
      id: 1,
      type: "riddle",
      question_en: "[Riddle question]",
      question_vi: "[Question VI]",
      options: ["[Option A]", "[Option B]", "[Option C]", "[Option D]"],
      correct: 0, // Index 0-3
      explanation_en: "[Why this answer]",
      explanation_vi: "[Explanation VI]",
      audio_url: "/audio/week[N]/logic_1.mp3"
    },
    // ... 4 more (TOTAL: 5 puzzles)
  ]
};
```

**Checklist:**
- [ ] Exactly 5 puzzles
- [ ] Each puzzle has id: 1-5
- [ ] type can be: riddle, sequence, pattern, wordplay, logic
- [ ] Each has 4 options
- [ ] correct is index 0-3
- [ ] Each has explanation
- [ ] Each has audio_url: `/audio/week[N]/logic_[number].mp3`

---

### ✅ 3.12 ask_ai.js (Both modes)

**Path**: `src/data/weeks/week_[N]/ask_ai.js` + `src/data/weeks_easy/week_[N]/ask_ai.js`

**⚠️ CRITICAL: ASK AI = QUESTION FORMING, NOT ANSWERING!**

**Structure**:
```javascript
export default {
  prompts: [
    {
      id: 1,
      context_en: "[Situation where student needs to ask]",
      context_vi: "[Context VI]",
      answer: ["[Question format 1]", "[Question format 2]", "[Question format 3]"],
      hint: ["[Question starter]", "[Alternative starter]"],
      audio_url: "/audio/week[N]/ask_ai_1.mp3"
    },
    // ... 4 more (TOTAL: 5 prompts)
  ]
};
```

**Pattern Templates:**
```javascript
// ✅ CORRECT (Student asks questions):
{
  context_en: "You want to know what is in your friend's backpack. Ask them.",
  answer: ["What is in your backpack?", "What do you have in your backpack?"],
  hint: ["What", "What is"]
}

// ❌ WRONG (Student answers questions):
{
  context_en: "Your friend asks what is in your backpack. Tell them.",
  answer: ["There is a book in my backpack."],
  hint: ["There is"]
}
```

**Checklist:**
- [ ] Exactly 5 prompts
- [ ] Each prompt id: 1-5
- [ ] context_en describes situation needing QUESTION
- [ ] context starts with "You want to know..." or "You need..." NOT "Someone asks..."
- [ ] answer array contains 2-3 QUESTION formats (not statements!)
- [ ] Questions use Who/What/Where/When/How/Can/Do/Is/Are
- [ ] hint array has question starters
- [ ] Each has audio_url: `/audio/week[N]/ask_ai_[number].mp3`
- [ ] **NO answer_audio_url field** (only context gets audio)

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: "Your friend asks... Tell them." → Tests answering (wrong mechanic)
- ✅ **GOOD**: "You want to know... Ask them." → Tests question forming (correct mechanic)

---

### ✅ 3.13 daily_watch.js (Both modes - AUTO-GENERATED)

**⚠️ DO NOT CREATE MANUALLY - Use video generation tools**

**Path**: `src/data/weeks/week_[N]/daily_watch.js` + `src/data/weeks_easy/week_[N]/daily_watch.js`

**Auto-Generation Process:**
```bash
# Step 1: Generate video search queries
node tools/generate_video_queries.js [N]
# Creates: src/data/weeks/week_[N]/video_queries.json

# Step 2: Fetch videos from YouTube API
node tools/update_videos.js [N]
# Creates: daily_watch.js in both weeks/ and weeks_easy/
```

**Generated Structure:**
```javascript
export default {
  videos: [
    {
      id: 1,
      title: "[Video Title from YouTube]",
      videoId: "[11-char YouTube ID]",
      duration: "MM:SS",
      sim_duration: [seconds as number],
      thumb: "https://img.youtube.com/vi/[videoId]/mqdefault.jpg"
    },
    // ... 4 more (TOTAL: 5 videos)
  ],
  bonus_games: [
    {
      title: "[Game Title]",
      url: "#",
      description: "[Description]"
    }
  ]
};
```

**Checklist:**
- [ ] 5 videos generated (not manually typed)
- [ ] Video purposes: 2 GRAMMAR, 1 STORY, 1 VOCAB, 1 SCIENCE/MATH
- [ ] Duration: 1-15 minutes per video
- [ ] All videos from whitelisted channels
- [ ] Titles match week theme + grammar
- [ ] **Same videos in both Advanced and Easy modes**

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Manually typing random YouTube URLs → Videos not educational, wrong level
- ✅ **GOOD**: Auto-generated with whitelist filtering → Curated, age-appropriate content

---

### ✅ 3.14 video_queries.json (Advanced only - AUTO-GENERATED)

**Path**: `src/data/weeks/week_[N]/video_queries.json`

**⚠️ DO NOT CREATE MANUALLY**

Generated by: `node tools/generate_video_queries.js [N]`

**Structure:**
```json
{
  "weekId": [N],
  "theme": "[Week theme]",
  "grammar_focus": "[Grammar pattern]",
  "videos": [
    {
      "id": 1,
      "purpose": "GRAMMAR",
      "priority_search": "English Singsing [grammar keywords] ESL for kids",
      "backup_search": "[grammar keywords] ESL kids cartoons"
    },
    {
      "id": 2,
      "purpose": "GRAMMAR",
      "priority_search": "English Singsing [grammar pattern] ESL for kids",
      "backup_search": "[grammar pattern] kids song ESL"
    },
    {
      "id": 3,
      "purpose": "STORY",
      "priority_search": "Little Fox [theme] story level 1 ESL for kids",
      "backup_search": "Vooks [theme] story read aloud cartoons"
    },
    {
      "id": 4,
      "purpose": "VOCABULARY",
      "priority_search": "Little Fox [topic] song ESL for kids",
      "backup_search": "[topic] ESL kids cartoons song"
    },
    {
      "id": 5,
      "purpose": "SCIENCE",
      "priority_search": "SciShow Kids [science topic related to theme] for kids",
      "backup_search": "[science topic] kids science cartoons"
    }
  ]
}
```

**Checklist:**
- [ ] File exists after running generate_video_queries.js
- [ ] weekId matches target week
- [ ] 5 video queries with purposes: GRAMMAR, GRAMMAR, STORY, VOCAB, SCIENCE
- [ ] Priority searches target whitelisted channels
- [ ] Backup searches are generic but safe

---

## 📦 STEP 4: INDEX FILES (5 phút)

### ✅ 4.1 Week Index (Both modes)

**Path**: `src/data/weeks/week_[N]/index.js` + `src/data/weeks_easy/week_[N]/index.js`

**Structure:**
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
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
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
```

**Checklist:**
- [ ] All 13 imports present (read through daily_watch)
- [ ] Import names match exact file names
- [ ] week_id matches folder
- [ ] stations object has 13 keys with EXACT names:
  - [ ] read_explore (NOT read)
  - [ ] new_words (NOT vocab)
  - [ ] word_match
  - [ ] grammar (NOT grammar_practice)
  - [ ] word_power (NOT word_power_station)
  - [ ] ask_ai (NOT ask_ai_station)
  - [ ] logic_lab (NOT logic)
  - [ ] dictation
  - [ ] shadowing
  - [ ] writing
  - [ ] explore
  - [ ] mindmap_speaking (NOT mindmap)
  - [ ] daily_watch

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: `grammar_practice: grammar` → Station not found in GameHub
- ✅ **GOOD**: `grammar: grammar` → Station loads correctly

---

### ✅ 4.2 Metadata Update

**Path**: `src/data/weeks/metadata.js`

**Action:**
```javascript
// Find line for Week [N] and update:
export const weekTitles = {
  // ...
  [N]: { 
    title_en: "[Title from Syllabus]", 
    title_vi: "[Title VI]" 
  },
  // ...
};
```

**Checklist:**
- [ ] Week [N] line exists in metadata.js
- [ ] title_en is actual week title (not "Week [N]")
- [ ] title_vi is Vietnamese translation
- [ ] Comma at end of line (not missing!)

---

## 🎨 STEP 5: ASSET GENERATION (60-90 phút)

### ✅ 5.1 Audio Files

**Target Counts (Advanced mode):**
- vocab: 10 words × 4 audios = 40 files
- word_power: 3 phrases × 5 audios = 15 files
- read: 1 main narration = 1 file
- dictation: 12-15 sentences = 12-15 files
- shadowing: 12-15 sentences + 1 full = 13-16 files
- explore: 1 main narration = 1 file
- mindmap: 6 stems + 36 branches = 42 files
- logic: 5 puzzles = 5 files
- ask_ai: 5 prompts = 5 files

**TOTAL Advanced: ~140-145 audio files**
**TOTAL Easy: Same count (140-145 files)**
**GRAND TOTAL: ~280-290 audio files**

**Generation Methods:**

**Option A: ElevenLabs API (Recommended)**
```bash
# Generate all audio for Week [N]
node tools/generate_audio.js [N]

# Or by station type:
node tools/generate_audio.js [N] --station vocab
node tools/generate_audio.js [N] --station word_power
# etc.
```

**Option B: Manual TTS** (if API not available)
- Use Google TTS, Azure TTS, or similar
- Follow URL naming conventions exactly
- Process all files in batch

**Checklist:**
- [ ] All vocab audio files (40 Advanced + 40 Easy = 80)
- [ ] All word_power audio files (15 Advanced + 15 Easy = 30)
- [ ] All read/explore audio files (2 Advanced + 2 Easy = 4)
- [ ] All dictation audio files (12-15 Advanced + 12-15 Easy = 24-30)
- [ ] All shadowing audio files (13-16 Advanced + 13-16 Easy = 26-32)
- [ ] All mindmap audio files (42 Advanced + 42 Easy = 84)
- [ ] All logic audio files (5 Advanced + 5 Easy = 10)
- [ ] All ask_ai audio files (5 Advanced + 5 Easy = 10)
- [ ] **TOTAL: 280-290 files** in `public/audio/week[N]` and `public/audio/week[N]_easy`

**Validation:**
```bash
# Count audio files
find public/audio/week[N] -name "*.mp3" | wc -l
find public/audio/week[N]_easy -name "*.mp3" | wc -l
```

---

### ✅ 5.2 Image Files

**Target Counts:**
- vocab: 10 images (1 per word)
- word_power: 3 images (1 per phrase)
- read: 1 cover image
- explore: 1 cover image

**TOTAL Advanced: 15 images**
**TOTAL Easy: 15 images**
**GRAND TOTAL: 30 images**

**Generation Methods:**

**Option A: DALL-E 3 / Midjourney** (Recommended)
```bash
# Generate images using prompt file
node tools/generate_images.js [N]
```

**Option B: Stock Images**
- Pixabay, Unsplash (free, commercial use)
- AI image generators (Stable Diffusion, etc.)

**Checklist:**
- [ ] 10 vocab images (clear, kid-friendly)
- [ ] 3 word_power images (illustrate phrase action)
- [ ] 1 read cover image (story theme)
- [ ] 1 explore cover image (cultural theme)
- [ ] Images in both: `public/images/week[N]` and `public/images/week[N]_easy`
- [ ] **TOTAL: 30 image files**

**Validation:**
```bash
# Count image files
find public/images/week[N] -name "*.jpg" -o -name "*.png" | wc -l
find public/images/week[N]_easy -name "*.jpg" -o -name "*.png" | wc -l
```

---

### ✅ 5.3 Videos (AUTO-GENERATED)

**Already done in STEP 3.13 - Verify only**

**Checklist:**
- [ ] 5 videos in `src/data/weeks/week_[N]/daily_watch.js`
- [ ] 5 videos in `src/data/weeks_easy/week_[N]/daily_watch.js`
- [ ] Videos are identical in both modes
- [ ] All videos from whitelisted educational channels
- [ ] Duration: 1-15 minutes each

---

## ✅ STEP 6: QUALITY ASSURANCE (30 phút)

### ✅ 6.1 Data Validation

**Run automated checks:**
```bash
# Check file counts
node tools/validate_week.js [N]

# Check data structure
node tools/audit_week.js [N]

# Check URLs
node tools/check_urls.js [N]
```

**Manual Checklist:**
- [ ] All 28 data files exist (14 Advanced + 14 Easy)
- [ ] week_[N]_real.js has 3 missions with objectives
- [ ] dynamicRoleplays.js has 3 week-specific roleplays
- [ ] Audio count: 280-290 files
- [ ] Image count: 30 files
- [ ] Video count: 5 (same in both modes)

---

### ✅ 6.2 Grammar Consistency Check

**Critical: All content must use ONLY the week's grammar pattern**

**Checklist:**
- [ ] Read.js story uses week grammar (no past tense if present tense week!)
- [ ] AI Tutor mission contexts use week grammar
- [ ] Roleplay scenarios use week grammar
- [ ] Word Power examples use week grammar
- [ ] Ask AI prompts test week grammar questions

**Example Errors to Avoid:**
- ❌ Week 7 (Present Simple "There is...") using past tense: "There was a book"
- ❌ Week 6 (Prepositions) using different grammar: "I have a book" instead of "The book is on..."

---

### ✅ 6.3 URL Validation

**All URLs must be complete from the start - no placeholders!**

**Checklist:**
- [ ] vocab.js: All 5 URLs per word (image_url, audio_word, audio_definition, audio_example, audio_collocation)
- [ ] word_power.js: All 6 URLs per phrase (image_url, audio_word, audio_def, audio_ex, audio_coll, audio_model)
- [ ] dictation.js: audio_url for each sentence
- [ ] shadowing.js: audio_url for each sentence + audio_full
- [ ] mindmap.js: audio for each stem (6) + each branch (36)
- [ ] logic.js: audio_url for each puzzle (5)
- [ ] ask_ai.js: audio_url for each context (5)
- [ ] read.js: image_url + audio_url
- [ ] explore.js: image_url + audio_url

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Adding URLs after initial creation → Forgot some, inconsistent naming
- ✅ **GOOD**: Complete URLs from start → Audio generation checklist is clear

---

### ✅ 6.4 Field Naming Consistency

**Critical: Components expect specific field names**

**Checklist:**
- [ ] vocab.js uses: definition_en, example_en, collocation_en (NOT definition, example, collocation alone)
- [ ] word_power.js uses: collocation_en, model_sentence_en (NOT collocation, model_sentence alone)
- [ ] dictation.js uses: text_en (NOT text)
- [ ] shadowing.js uses: text_en (NOT text)
- [ ] writing.js is SINGLE OBJECT with title, model_sentence (NOT array with prompts)
- [ ] ask_ai.js answer is array of QUESTIONS (NOT statements)

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Field `text` but component expects `text_en` → TypeError
- ❌ **BAD**: Field `collocation` but component expects `collocation_en` → Card shows empty
- ❌ **BAD**: writing.js as array → Component crashes
- ✅ **GOOD**: Consistent _en suffix → Components work

---

## 🚀 STEP 7: DEPLOYMENT TEST (15 phút)

### ✅ 7.1 Local Development Server

```bash
# Start dev server
npm run dev

# Open browser to http://localhost:5173/week/[N]
```

**Test Checklist:**
- [ ] Week [N] appears in sidebar with correct title
- [ ] All 14 station icons load
- [ ] Click each station to verify:
  - [ ] Read & Explore - Story displays, audio plays
  - [ ] New Words - 10 words show, images load, audio plays
  - [ ] Word Match - 10 pairs work
  - [ ] Grammar - 20 exercises load
  - [ ] Word Power - 3 cards flip, audio plays, collocation shows
  - [ ] Ask AI - 5 prompts load, audio plays, answer is QUESTION
  - [ ] Logic Lab - 5 puzzles load, audio plays
  - [ ] Dictation - Sentences load, audio plays, text input works
  - [ ] Shadowing - Sentences load, audio plays, playback works
  - [ ] Writing - Single prompt shows, word counter works
  - [ ] Explore - Article displays, T/F quiz works
  - [ ] Mindmap Speaking - 6 stems + 36 branches load, audio plays
  - [ ] Daily Watch - 5 videos display, YouTube embeds work

---

### ✅ 7.2 AI Tutor Test

**CRITICAL: Test all 3 tabs**

**Story Mission Tab:**
```
1. Open AI Tutor
2. Click Story Mission tab
3. Select Mission 1
4. Enter name: "Hung"
5. Verify:
   - [ ] AI asks "What's your name?" ONCE only
   - [ ] AI remembers name after first answer
   - [ ] AI uses week grammar pattern
   - [ ] Conversation reaches 15-20 turns
   - [ ] No repetitive questions
   - [ ] Objectives progress naturally
6. Repeat for Mission 2 and 3
```

**Free Talk Tab:**
```
1. Click Free Talk tab
2. Select "I want to do a roleplay!"
3. Choose one of 3 week-specific roleplays
4. Verify:
   - [ ] Roleplay matches week theme
   - [ ] AI stays in character
   - [ ] Uses week grammar
   - [ ] Natural conversation (not just Q&A)
   - [ ] Can transition between topics
5. Try "Let's just chat!" button
6. Verify:
   - [ ] Knowledge-based conversation
   - [ ] Uses example_opening_questions
   - [ ] Can answer about topic facts
```

**Quiz Tab (Nova Arcade):**
```
1. Click Quiz tab
2. Start game (any of 4 types)
3. Verify:
   - [ ] 7-10 rounds per game
   - [ ] Questions test week vocabulary + grammar
   - [ ] Options shuffle (not same order)
   - [ ] Score tracking works
   - [ ] Can replay with different questions
4. Try all 4 game types:
   - [ ] Emoji Detective (vocab matching)
   - [ ] Broken Robot (grammar fixing)
   - [ ] Sentence Builder (word ordering)
   - [ ] True/False (comprehension)
```

**⚠️ Week 7 Lessons Learned:**
- ❌ **BAD**: Missing objectives → AI asks name 10 times, repetitive questions
- ✅ **GOOD**: 10-12 objectives per mission → Name asked once, smooth progression

---

### ✅ 7.3 Easy Mode Test

**Switch to Easy Mode and verify:**
```
1. Click profile icon → Settings
2. Toggle Easy Mode ON
3. Verify Week [N]:
   - [ ] Different 10 vocab words (from Blueprint)
   - [ ] Simpler sentences in read.js
   - [ ] Same grammar pattern (just simpler examples)
   - [ ] Same 5 videos in Daily Watch
   - [ ] All stations work identically
```

---

## 📊 STEP 8: FINAL REPORT (10 phút)

### ✅ 8.1 Completion Checklist

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
1. [Issue 1]: [Description] → [Fix applied]
2. [Issue 2]: [Description] → [Fix applied]

## 📊 Final Metrics
- Total files created: [28 data + assets]
- Time spent: [hours]
- Ready for production: [YES/NO]
```

---

## 🎓 LESSONS LEARNED FROM WEEK 7

### ❌ What Went Wrong

1. **Missing objectives in AI Tutor**
   - Symptom: AI asked "What's your name?" 10+ times
   - Root cause: story_missions had story_arc but NO objectives array
   - Fix: Added 10-12 objectives per mission with question_variants

2. **Writing.js format mismatch**
   - Symptom: VideoChallenge component crashed
   - Root cause: Data had `{ prompts: [...] }` array but component expected single object
   - Fix: Changed to `{ title, model_sentence, instruction_en, ... }` format

3. **Word Power collocation not showing**
   - Symptom: Card showed blank context section
   - Root cause: Data had `collocation_en` but component checked `collocation`
   - Fix: Component now checks `word.collocation_en || word.collocation`

4. **Dictation/Shadowing undefined text**
   - Symptom: TypeError "Cannot read 'replace' of undefined"
   - Root cause: Data used `text` field but component expected `text_en`
   - Fix: Data changed to `text_en`, component also checks fallback

5. **Index.js station keys mismatch**
   - Symptom: Stations not loading in GameHub
   - Root cause: Used `grammar_practice` but GameHub expects `grammar`
   - Fix: Updated to exact keys: grammar, word_power, ask_ai (no suffixes)

6. **Missing audio URLs**
   - Symptom: Silent audio players
   - Root cause: Data created without complete URLs first
   - Fix: All URLs included from initial data creation

### ✅ Best Practices Established

1. **Always start with Week 5 as reference**
   - Week 5 is the GOLDEN STANDARD (complete, debugged, feature-rich)
   - Copy structure, adapt content

2. **Create data with complete URLs from the start**
   - Don't add URLs later
   - Use consistent naming: `[station]_[word/number].mp3`

3. **Validate field names match component expectations**
   - Use `_en` suffix for English fields
   - Check component code if unsure

4. **Test AI Tutor immediately after objectives added**
   - Don't wait until full week is done
   - Verify name asked once, then remembered

5. **Run validation scripts before manual testing**
   - `node tools/validate_week.js [N]` catches file count issues
   - `node tools/check_urls.js [N]` catches missing URLs

---

## 📝 QATÁR QUY TRÌNH SẢN XUẤT 1 TUẦN (Summary)

### Timeline: ~8 hours total

1. **Pre-Production** (5 min)
   - Gather Syllabus data
   - Create folder structure

2. **AI Tutor Core** (45 min)
   - week_[N]_real.js: Metadata + vocab + 3 missions with objectives + knowledge base

3. **Dynamic Roleplays** (15 min)
   - Add 3 week-specific roleplays to dynamicRoleplays.js

4. **Station Data - Priority 1** (60 min)
   - vocab.js, read.js, dictation.js, shadowing.js, explore.js (both modes)

5. **Station Data - Priority 2** (30 min)
   - word_power.js, word_match.js, grammar.js, mindmap.js (both modes)

6. **Station Data - Priority 3** (20 min)
   - writing.js, logic.js, ask_ai.js (both modes)

7. **Videos Auto-Generate** (5 min)
   - Run: `node tools/generate_video_queries.js [N]`
   - Run: `node tools/update_videos.js [N]`

8. **Index Files** (5 min)
   - index.js (both modes) + metadata.js update

9. **Asset Generation** (60-90 min)
   - Audio: ~290 files (ElevenLabs API or manual TTS)
   - Images: 30 files (DALL-E or stock images)

10. **Quality Assurance** (30 min)
    - Data validation scripts
    - Grammar consistency check
    - URL validation
    - Field naming check

11. **Deployment Test** (15 min)
    - Local dev server
    - Test all 14 stations
    - Test AI Tutor (3 tabs)
    - Test Easy mode

12. **Final Report** (10 min)
    - Document completion
    - List issues found
    - Confirm production-ready

### Deliverables:
- ✅ 28 data files (14 Advanced + 14 Easy)
- ✅ 1 AI Tutor file (week_[N]_real.js)
- ✅ 3 Dynamic Roleplays added
- ✅ ~290 audio files
- ✅ 30 image files
- ✅ 5 YouTube videos (auto-selected)
- ✅ All stations functional
- ✅ AI Tutor tested (Story + Free Talk + Quiz)
- ✅ Easy mode verified
- ✅ Production report completed

---

## 🔄 CONTINUOUS IMPROVEMENT

**After each week production:**
1. Update this checklist with new lessons learned
2. Add discovered issues to "Common Pitfalls"
3. Refine time estimates based on actual time spent
4. Document new automation scripts
5. Share findings with team

**Version History:**
- v1.0 (Dec 2025): Initial production prompt
- v2.0 (Jan 2026): Updated after Week 7 lessons, added objectives requirement, fixed field naming issues

---

**END OF CHECKLIST**
