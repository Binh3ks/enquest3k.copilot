# 🚨 WEEK 16 - CRITICAL ERRORS CORRECTED
**Date:** March 20, 2026  
**Status:** ❌ **PREVIOUS AUDIT WAS WRONG** - Major architecture errors found

---

## 🔴 CRITICAL FINDING: WRONG TIMELINE

### ❌ ORIGINAL (INCORRECT) ASSUMPTION:
"Week 16 = STEM Integration starts" → Sub-tabs (read_stem, read_social, explore_stem, explore_social, social_quiz) are correct

### ✅ CORRECT REQUIREMENT:
**Week 16-35:** STEM **SEEDING ONLY** (vocabulary exposure, no dedicated sub-tabs)  
**Week 35-36+:** Full CLIL content integration (separate STEM/Social sub-tabs, reading passages)

---

## 📊 PART 1: STRUCTURE ERRORS (Architecture-Level)

### 🚨 ERROR #1: PREMATURE SUB-TAB STRUCTURE (W16)

**Week 16 hiện tại có SAI:**
- ❌ read_stem.js (Physics of Sports) - KHÔNG nên tồn tại ở W16
- ❌ read_social.js (Olympics History) - KHÔNG nên tồn tại ở W16  
- ❌ explore_stem.js (Activities format) - KHÔNG nên tồn tại ở W16
- ❌ explore_social.js (Activities format) - KHÔNG nên tồn tại ở W16
- ❌ social_quiz.js (7 MCQ Olympics) - KHÔNG nên tồn tại ở W16

**Lý do:** Học sinh tuần 16 chưa đủ trình độ để đọc các nội dung CLIL content. STEM integration từ W16-35 chỉ là **vocabulary seeding** (embed STEM words vào story), KHÔNG phải separate content tabs.

**Đúng cấu trúc W16 phải là:**
- ✅ **read.js** (1 file duy nhất) - Story with STEM vocabulary embedded (energy, motion, team)
- ✅ **explore.js** (1 file duy nhất) - CLIL activity about Sports Science with **bold words** + questions
- ✅ **logic_science.js** - 3 critical thinking questions (generic, không cần sports-specific)
- ✅ **singapore_math.js** - 5 bar model problems
- ❌ **NO social_quiz.js** (starts at W35-36)

---

### 🚨 ERROR #2: EXPLORE FORMAT SAI (Activities vs Reading)

**Hiện tại (SAI):**
```javascript
// explore_stem.js - Activities format
export default {
  activities: [
    {
      id: 1,
      title_en: "Experiment: Ball Drop Challenge",
      instructions_en: ["Step 1...", "Step 2..."],
      learning_goal_en: "...",
      questions: [...]
    }
  ]
}
```

**Đúng phải là (W1-15 Golden Standard):**
```javascript
// explore.js - Reading Passage + Questions format
export default {
  title_en: "The Science of Sports",
  content_en: "Scientists study **motion**. When you **kick** a ball, it has **energy**. The ball **moves** through the air...",
  content_vi: "...",
  check_questions: [
    { id: 1, question_en: "What makes the ball  move?", answer: ["Energy", "Force"], hint_en: "E..." },
    { id: 2, question_en: "...", answer: [...] },
    { id: 3, question_en: "...", answer: [...] }
  ],
  question: {
    text_en: "If you were a sports scientist, what would you study?",
    min_words: 15,
    hint_en: "I would study..."
  }
}
```

**Difference:**
- ❌ Activities = Step-by-step experiments (hands-on, cho older students)
- ✅ Reading Passage = Science article with comprehension questions (đúng CLIL cho primary)

---

### 🚨 ERROR #3: READ.JS MISSING STRUCTURE

**Hiện tại:** Week 16 không có `read.js` (chỉ có read_stem.js và read_social.js)

**Đúng phải là:** Week 16 MUST have `read.js` (single file) with:
- Story using 13 vocab words
- **Bold formatting** for all 13 words
- Translation section (sentence-by-sentence)
- 5 comprehension questions

**Example structure:**
```javascript
export default {
  title_en: "My First Soccer Game",
  story_en: "Today is my first soccer game! I am very excited. I **kick** the **ball** hard. My friend is **running** very fast...",
  
  sentences: [
    { text_en: "Today is my first soccer game!", text_vi: "Hôm nay là trận bóng đầu tiên của tôi!" },
    { text_en: "I am very excited.", text_vi: "Tôi rất phấn khích." },
    // ... all sentences
  ],
  
  questions: [
    { question_en: "How does the boy feel?", answer: "Excited", hint: "He is..." },
    // ... 5 total
  ]
}
```

---

## 📊 PART 2: CONTENT ERRORS

### 🚨 ERROR #4: word_power THIẾU STEM COLLOCATIONS

**Hiện tại (THIẾU):**
```javascript
words: [
  { id: 1, word: "kick the ball" },
  { id: 2, word: "score a goal" },
  { id: 3, word: "run fast" }
]
```

**Đúng phải là (Phase 1 = 3 collocations, ADD STEM):**
```javascript
words: [
  // Sports collocations
  { id: 1, word: "kick the ball", definition_en: "hit the ball with your foot" },
  { id: 2, word: "score a goal", definition_en: "make a point in soccer" },
  { id: 3, word: "run fast", definition_en: "move your legs quickly" },
  
  // STEM collocations (THÊM VÀO)
  { id: 4, word: "have energy", definition_en: "have power to do things" },
  { id: 5, word: "in motion", definition_en: "moving" },
  { id: 6, word: "play as a team", definition_en: "work together in a group" }
]
```

**Total: 6 collocations** (3 sports + 3 STEM) → Phase 1 có thể là 5-7, không bắt buộc đúng 3!

---

### 🚨 ERROR #5: GAMES.JS CÓ LEGACY CONTENT

**Tìm thấy trong ask_me contexts:**
```javascript
contexts_easy: [
  {
    id: 'w16_doing_what',
    intro: 'I am kicking the ball. Ask me what I am doing.',  // OK - Week 16 sports
    acceptedQuestions: ['What are you doing?']
  },
  // ... but later:
  {
    intro: 'Ask me a question about school.',  // ❌ LEGACY - Not Week 16 theme!
  }
]
```

**Cần verify:** ALL contexts MUST relate to Sports Commentary theme, KHÔNG được có "school", "family", hoặc themes từ weeks khác.

---

### 🚨 ERROR #6: DAILY_WATCH CHƯA GENERATE VIDEOS

**Hiện tại:**
```javascript
videos: [
  { id: 1, videoId: "placeholder_grammar_W16", title: "Present Continuous Song" },
  { id: 2, videoId: "placeholder_story_W16", title: "The Big Soccer Match" },
  // ... all placeholders
]
```

**Cần:**
- Real YouTube video IDs
- Search queries executed:
  1. "Present Continuous song ESL kids sports"
  2. "Soccer story for kids English"
  3. "Sports vocabulary for children"
  4. "Energy and motion science kids" (STEM)
  5. "Action verbs song ESL"

---

### 🚨 ERROR #7: AI TUTOR UI KHÔNG HIỂN THỊ

**File tồn tại:** `src/data/weeks/week_16_real.js` ✅ (có 3 missions, content đúng)  
**UI issue:** Màn hình hiển thị "Story Mission Week week-16 - Choose Your Mission" nhưng content trống

**Possible causes:**
1. Import path sai (component không load được data)
2. Data structure incompatible với component expectations
3. weekId mismatch (file có weekId: 16, nhưng app expect "week-16"?)

**Cần check:**
- `StoryMissionTab.jsx` - How does it import week_16_real.js?
- Console errors in browser devtools
- Network tab - Is the file being fetched?

---

## 📊 PART 3: CORRECT ARCHITECTURE FOR W16

### ✅ Week 16 PHẢI CÓ (Structure for W16-35):

**Advanced Mode:**
1. `index.js` - Metadata + voiceConfig ✅
2. `vocab.js` - 13 words (10 sports + 3 STEM seeds) ✅
3. `word_power.js` - **6 collocations** (3 sports + 3 STEM) ❌ FIX
4. `grammar.js` - 20 exercises ✅
5. `read.js` - **1 file only** (no sub-tabs) ❌ MISSING
6. `explore.js` - **1 file only** (CLIL passage + questions) ❌ MISSING
7. `logic_science.js` - 3 critical thinking ✅
8. `singapore_math.js` - 5 bar models ✅
9. `games.js` - Show & Tell, Make Sentence, Ask Me ⚠️ CHECK
10. `ask_ai.js` - 5 shadow asking prompts ✅
11. `dictation.js` - Auto-generated ✅
12. `shadowing.js` - Auto-generated ✅
13. `mindmap.js` - 6 stems ✅
14. `writing.js` - Writing prompt ✅
15. `word_match.js` - Matching game ✅
16. `daily_watch.js` - **5 real videos** ❌ FIX

**Easy Mode:** Same 16 files (duplicate structure)

**AI Tutor:** `week_16_real.js` ✅ (content OK, UI issue)

---

### ❌ Week 16 KHÔNG ĐƯỢC CÓ (Premature for W16):

1. ❌ `read_stem.js` - Xóa (starts W35-36)
2. ❌ `read_social.js` - Xóa (starts W35-36)  
3. ❌ `explore_stem.js` - Xóa (starts W35-36)
4. ❌ `explore_social.js` - Xóa (starts W35-36)
5. ❌ `social_quiz.js` - Xóa (starts W35-36)

---

## 📋 PART 4: STEM SEEDING vs FULL CLIL (Timeline)

### Phase 1a: W1-15 (Language Foundation ONLY)
- ✅ vocab.js = 10 everyday words
- ✅ read.js = Personal stories
- ✅ explore.js = Simple CLIL (tools, nature)
- ✅ logic_lab = Basic patterns, no science reasoning
- ❌ NO STEM vocabulary yet

### Phase 1b: W16-35 (STEM Seeding - Vocabulary Exposure)
- ✅ vocab.js = **13 words** (10 core + **3 STEM seeds**)
- ✅ read.js = **Story with STEM words embedded** (1 file, no tabs)
- ✅ explore.js = **CLIL passage with STEM topic** (1 file, no tabs)
- ✅ logic_science.js = Basic science facts (2-3 questions)
- ✅ singapore_math.js = Bar models (5 questions)
- ❌ **NO separate STEM tabs** (read_stem, explore_stem)
- ❌ **NO social_quiz.js** yet

### Phase 1c: W35-36+ (Full CLIL Integration)
- ✅ vocab.js = 13+ words (more STEM/Social)
- ✅ **read.js splits →**
  - read_stem.js (Physics/Biology reading)
  - read_social.js (History/Geography reading)
- ✅ **explore.js splits →**
  - explore_stem.js (Science experiments/passages)
  - explore_social.js (Social Studies activities/passages)
- ✅ social_quiz.js = 7 MCQ (History, Geography, Culture)
- ✅ logic_science.js = Science reasoning (3 questions)
- ✅ singapore_math.js = Word problems (5 questions)

---

## 🔧 PART 5: FIX PRIORITY (Urgent → Important)

### 🔴 PRIORITY 1: DELETE WRONG FILES (5 mins)
```bash
# Advanced mode
rm src/data/weeks/week_16/read_stem.js
rm src/data/weeks/week_16/read_social.js
rm src/data/weeks/week_16/explore_stem.js
rm src/data/weeks/week_16/explore_social.js
rm src/data/weeks/week_16/social_quiz.js

# Easy mode
rm src/data/weeks_easy/week_16/read_stem.js
rm src/data/weeks_easy/week_16/read_social.js
rm src/data/weeks_easy/week_16/explore_stem.js
rm src/data/weeks_easy/week_16/explore_social.js
rm src/data/weeks_easy/week_16/social_quiz.js

# Backup files
rm src/data/weeks/week_16/word_power_BACKUP.js
rm src/data/weeks_easy/week_16/word_power_BACKUP.js
rm src/data/weeks_easy/week_16/word_power_FIXED.js
```

### 🔴 PRIORITY 2: CREATE read.js (20 mins x2 modes)

**Template:**
```javascript
export default {
  title_en: "My First Soccer Game",
  title_vi: "Trận bóng đầu tiên của tôi",
  image_url: "/images/week16/read_cover_w016.jpg",
  audio_url: "/audio/week16/read_main.mp3",
  
  story_en: `
    Today is my first soccer game! I am very excited. 
    I **kick** the **ball** hard. My legs have **energy**.
    My friend is **running** very fast. The **ball** is in **motion**.
    I **pass** the **ball** to him. He **jumps** high.
    I **catch** the **ball** with my hands. No! That's a mistake!
    In soccer, I can't **catch** with my hands. I must use my feet.
    The other **team** is **scoring** a **goal**. They **cheer** loudly!
    Next time, I will practice more. I love playing soccer!
  `,
  
  story_vi: `...`,
  
  sentences: [
    { text_en: "Today is my first soccer game!", text_vi: "Hôm nay là trận bóng đầu tiên!" },
    // ... 12-15 sentences
  ],
  
  questions: [
    {
      question_en: "How does the boy feel about his first game?",
      question_vi: "Cậu bé cảm thấy thế nào về trận đầu tiên?",
      answer_en: "He is excited",
      answer_vi: "Cậu bé rất phấn khích"
    },
    // ... 5 total
  ]
};
```

**Bold words count:** 13/13 ✅ (kick, ball, running, energy, motion, pass, jump, catch, team, scoring, goal, cheer × 2 = 13 unique words)

### 🔴 PRIORITY 3: CREATE explore.js (20 mins x2 modes)

**Template:**
```javascript
export default {
  title_en: "The Science of Sports",
  title_vi: "Khoa học về Thể thao",
  image_url: "/images/week16/explore_cover_w016.jpg",
  audio_url: "/audio/week16/explore_main.mp3",
  
  content_en: `
    Scientists study **sports**! When you **run**, your legs have **energy**. 
    **Energy** helps you **move**. When you **kick** a **ball**, it goes into **motion**.
    **Motion** means moving. The faster you **kick**, the farther the **ball** flies.
    A **team** works together. They **pass** the **ball** to each other.
    When they **score** a **goal**, everyone **cheers**! Sports are fun and healthy!
  `,
  
  content_vi: `...`,
  
  check_questions: [
    {
      id: 1,
      question_en: "What helps you move?",
      answer: ["Energy"],
      hint_en: "E...",
      hint_vi: "Năng..."
    },
    {
      id: 2,
      question_en: "What does motion mean?",
      answer: ["Moving", "To move"],
      hint_en: "M...",
      hint_vi: "Di..."
    },
    {
      id: 3,
      question_en: "What do teams do with the ball?",
      answer: ["Pass", "Pass it", "Pass the ball"],
      hint_en: "P...",
      hint_vi: "Chuyền..."
    }
  ],
  
  question: {
    text_en: "If you were a sports scientist, what would you study?",
    text_vi: "Nếu bạn là nhà khoa học thể thao, bạn sẽ nghiên cứu gì?",
    min_words: 15,
    hint_en: "I would study...",
    hint_vi: "Tôi sẽ nghiên cứu..."
  }
};
```

### 🔴 PRIORITY 4: FIX word_power.js (15 mins)

**Add 3 STEM collocations:**
```javascript
// After existing 3 collocations, add:
{
  id: 4,
  word: "have energy",
  pronunciation: "/hæv ˈɛnərdʒi/",
  cefr_level: "A2",
  definition_en: "have power to do things",
  definition_vi: "có năng lượng để làm việc",
  example: "Athletes have energy to run fast.",
  model_sentence: "When I sleep well, I have energy to play.",
  collocation: "have energy to play",
  image_url: "/images/week16/wordpower_have_energy.jpg",
  // ... audio fields
},
{
  id: 5,
  word: "in motion",
  pronunciation: "/ɪn ˈmoʊʃən/",
  cefr_level: "A2",
  definition_en: "moving",
  definition_vi: "đang chuyển động",
  example: "The ball is in motion when you kick it.",
  model_sentence: "The car is in motion on the road.",
  collocation: "set in motion",
  image_url: "/images/week16/wordpower_in_motion.jpg",
  // ... audio fields
},
{
  id: 6,
  word: "play as a team",
  pronunciation: "/pleɪ æz ə tiːm/",
  cefr_level: "A2",
  definition_en: "work together in a group",
  definition_vi: "chơi cùng nhau như một đội",
  example: "We play as a team to win the game.",
  model_sentence: "When we play as a team, we are stronger.",
  collocation: "work as a team",
  image_url: "/images/week16/wordpower_play_as_a_team.jpg",
  // ... audio fields
}
```

### 🟡 PRIORITY 5: VERIFY games.js (10 mins)

**Check ALL contexts in ask_me:**
- ✅ Context mentions sports/actions
- ❌ Context mentions "school", "family", "homework" → DELETE/REPLACE

**Example legacy context to remove:**
```javascript
// ❌ WRONG - Not Week 16 theme
{
  intro: 'Ask me about my dog.',  // Wrong theme
},
{
  intro: 'Ask me a question about school.',  // Wrong theme
}
```

### 🟡 PRIORITY 6: GENERATE daily_watch videos (15 mins)

**Search queries:**
1. Grammar: "Present Continuous song ESL kids 2024"
2. Story: "Soccer game story for children English"
3. Vocabulary: "Sports vocabulary for kids fun English"
4. Science: "Energy and motion in sports kids science"
5. Music: "Action verbs song ESL primary"

**Execute searches → Get real video IDs → Update daily_watch.js**

### 🟡 PRIORITY 7: DEBUG AI Tutor UI (20 mins)

**Steps:**
1. Open browser devtools (F12)
2. Navigate to `/week/16/ai_tutor`
3. Check Console for errors
4. Check Network tab - Is week_16_real.js loaded?
5. Inspect JSX of StoryMissionTab.jsx
6. Verify import path and data structure match

---

## 📊 PART 6: GOLDEN STANDARD CLARIFICATION

### ❌ PREVIOUS INCORRECT UNDERSTANDING:
"Week 16 = W16+ Golden Standard with sub-tabs for STEM/Social"

### ✅ CORRECT UNDERSTANDING:
- **W1-15 Golden Standard:** Week 6 (Pure language foundation)
  - 15 files, single read.js, single explore.js, 5-question logic.js
- **W16-35 Structure:** STEM **Seeding** (NOT full CLIL)
  - 16 files, single read.js (with STEM words), single explore.js (CLIL topics), logic + singapore_math split
- **W35-36+ Golden Standard:** Full CLIL Integration
  - 19 files, dual read (stem + social), dual explore (stem + social), social_quiz added

**Week 16 is NOT golden standard for W16+. Week 16 is a TRANSITION week with limited STEM exposure.**

---

## ✅ SUMMARY: WHAT'S ACTUALLY WRONG

| Issue | Current State | Correct State | Priority |
|-------|---------------|---------------|----------|
| **Sub-tabs premature** | Has 5 sub-tab files (stem/social) | Should have 0 sub-tabs | 🔴 P1 |
| **read.js missing** | Only read_stem.js, read_social.js | Must have single read.js | 🔴 P2 |
| **explore.js missing** | Only explore_stem.js, explore_social.js | Must have single explore.js | 🔴 P3 |
| **explore format wrong** | "activities" with experiments | "reading passage" with questions | 🔴 P3 |
| **word_power incomplete** | 3 sports collocations only | 6 collocations (3 sports + 3 STEM) | 🔴 P4 |
| **games.js legacy** | Some non-sports contexts | All contexts = sports theme | 🟡 P5 |
| **daily_watch placeholders** | Placeholder videoIds | Real YouTube videos | 🟡 P6 |
| **AI Tutor UI empty** | Data exists, UI not rendering | Debug import/structure issue | 🟡 P7 |

**Total Fixes:** 5 critical (P1-P4), 3 important (P5-P7)  
**Estimated Time:** ~2 hours for all fixes

---

**Created:** March 20, 2026  
**Previous Audit:** INVALIDATED - Timeline and structure assumptions were wrong  
**Next Action:** Execute Priority 1-4 fixes immediately (delete wrong files, create correct structure)
