# EngQuest 3K — GitHub Copilot Agent Instructions

## PROJECT OVERVIEW
- React/Vite app deployed to Cloudflare Pages (`enquest3k.pages.dev`)
- **156 weeks** of English curriculum (3 years, Phases 1-3)
- Git repo: `https://github.com/Binh3ks/enquest3k.copilot.git`, branch `main`
- Main data dirs: `src/data/weeks/week_NN/`, `src/data/weeks_easy/week_NN/`, `public/data/lessons/`

## KEY REFERENCE FILES
| File | Purpose |
|------|---------|
| `_syllabus_v5_raw.txt` | Syllabus source for ALL 156 weeks |
| `src/data/weeks/week_28/` | **GOLDEN STANDARD** for station files |
| `public/data/lessons/W28.json` | **GOLDEN STANDARD** for lesson plan JSON |
| `_gen_lesson_from_syllabus.py` | Lesson plan generator (W54-W156) |
| `mass_produce_week.py` | Master 7-phase production script |
| `ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt` | AI Tutor prompt rules |
| `1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` | Curriculum framework |
| `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt` | **Image prompt files** (28 prompts/week — for AI image generation, NOT committed to git) |

## PHASE ROUTING
- **W1–W53**: Lesson plans **ALREADY COMPLETE** (0 fill-in markers) — do NOT regenerate
- **W54–W156**: Lesson plan from `_syllabus_v5_raw.txt` via `_gen_lesson_from_syllabus.py` — still need [★ FILL-IN] markers filled

## TRIGGER: "sản xuất tuần N" OR "produce week N"
When the user says this (any language), execute ALL production steps below in order.
Use the `.vscode/prompts/produce-week.prompt.md` as the detailed step guide.

---

## STATION FILE SCHEMAS (Golden Standard: W28)

### `read.js` (Advanced — `src/data/weeks/week_NN/read.js`)
```js
export default {
  title: "Story Title",
  image_url: "/images/weekNN/read_cover_wNN.jpg",
  audio_url: "/audio/weekNN/read_main.mp3",
  content_en: "14–16 sentences. 10 vocabulary words in **bold**. Global/third-person context.",
  content_vi: "Vietnamese translation of content_en.",
  comprehension_questions: [
    { id: 1, question_en: "...", answer: ["..."], clue_statement: "...", hint_en: "...", hint_vi: "...", audio_url: "/audio/weekNN/read_q1.mp3" },
    { id: 2, ... }, { id: 3, ... }, { id: 4, ... }
  ],
  question: { text_en: "...", text_vi: "...", min_words: 30, hint_en: "...", hint_vi: "..." }
};
```

### `read.js` (Easy — `src/data/weeks_easy/week_NN/read.js`)
- Same schema, but:
  - 10–12 sentences, SAME 10 **bold** vocab words
  - First-person context (I/my/we/our)
  - `min_words: 25`

### `explore.js` (Advanced)
```js
export default {
  title_en: "Topic Around the World",
  title_vi: "Chủ đề trên Thế giới",
  content_en: `Global factual text. 10–12 sentences. Use the SAME 10 **bold** vocab words.`,
  content_vi: `Vietnamese translation.`,
  audio_narration: "/audio/weekNN/explore_narration.mp3",
  questions: [ { q: "Q1?", a: "A1." }, { q: "Q2?", a: "A2." }, { q: "Q3?", a: "A3." } ]
};
```

### `explore.js` (Easy)
- Same schema, personal context (I/we), `title_en: "My Topic"`

### `word_match.js`
```js
export default {
  title: "Word Match: Story Title",
  image_url: "/images/weekNN/wordmatch_cover_wNN.jpg",
  audio_url: "/audio/weekNN/wordmatch_main.mp3",
  instruction_en: "Match each word or phrase to its meaning or pair.",
  instruction_vi: "Nối mỗi từ hoặc cụm từ với nghĩa hoặc cặp của nó.",
  sets: [
    { id: "set1", label_en: "Set label", label_vi: "Nhãn set", pairs: [ { left: "...", right: "..." }, ... ] },
    { id: "set2", ... }   // 3 sets total: story content, grammar pairs, vocab EN→VI
  ]
};
```

### `games.js`
```js
export const week_NN_GamesAdvanced = {
  title: "Games: Story Title",
  audio_url: "/audio/weekNN/games_main.mp3",
  games: [
    { id: "vocab_match", type: "matching", title_en: "...", instruction_en: "...", instruction_vi: "...", cards: [ { id: "a1", type: "word", value: "..." }, { id: "a2", type: "meaning", value: "..." }, ... ] },
    { id: "story_sequence", type: "sorting", title_en: "...", instruction_en: "...", instruction_vi: "...", categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"], items: [ { text: "...", correct: "Step 1 (First)" }, ... ] },
    { id: "grammar_fill", type: "fill_in", title_en: "...", instruction_en: "...", sentences: [ { sentence: "___", answer: "...", options: ["...", "...", "..."] }, ... ] }
  ],
  show_tell: { steps: 3, word_list: [ /* all 10 vocab words */ ], instructions_easy: "...", instructions_advanced: "...", step_instructions: { 1: "...", 2: "...", 3: "..." } }
};
```

### `mindmap.js`
```js
const mindMapContent = {
  centerStems: [
    { text: "Grammar/story sentence stem ___.", audio: "/audio/weekNN/mindmap_stem_XXXXX.mp3" },
    // 6 stems total: 2 about story, 2 about grammar, 2 personal
  ],
  branchLabels: {
    "stem text ___." : [
      { text: "branch completion 1", audio: "/audio/weekNN/mindmap_branch_XXXXX.mp3" },
      // 6 branches per stem
    ]
  }
};
```

### `week_NN_real.js` (AI Tutor)
```js
const week_NN_RealData = {
  week_id: NN,
  phase: 1,   // 1, 2, or 3
  block: "A", // A-K
  unit: UU,
  week_number: NN,
  title: "Week NN: Theme",
  week_title_en: "Theme (Grammar Pattern)",
  week_title_vi: "Chủ đề (Pattern tiếng Việt)",
  topic: "Description of the topic",
  topic_vi: "Mô tả chủ đề",
  learning_outcome: "What students can do after this week",
  learning_outcome_vi: "...",
  grammar_focus: "Grammar rule name",
  grammar_pattern: "Pattern template",
  grammar_examples: [ "Example 1.", "Example 2.", "Example 3.", "Example 4." ],
  target_vocab: [
    { word: "...", pronunciation: "/.../", definition_vi: "...", definition_en: "...", example: "...", syllabus_context: "..." },
    // 10 words total
  ],
  // ... missions, objectives, story arc from master prompt
};
```

---

## CONTENT GENERATION RULES

### Reading Story
- 14–16 sentences for Advanced, 10–12 for Easy
- Exactly 10 vocabulary words in **bold** — SAME words both modes
- Advanced: global/third-person narrative, fable-style or factual
- Easy: first-person "I/we" personal narrative on SAME topic
- Grammar focus must appear naturally at least 3 times
- End with a moral or reflection sentence

### Comprehension Questions (4 per mode)
- Q1: Literal (who/what/when)
- Q2: What happened (sequence)
- Q3: Why / cause-effect
- Q4: Inference or moral
- Each has `answer` (array of acceptable answers), `clue_statement`, `hint_en`, `hint_vi`

### Audio URL convention
- `/audio/weekNN/read_main.mp3`, `/audio/weekNN/read_q1.mp3` ... `read_q4.mp3`
- `/audio/weekNN/explore_narration.mp3`
- `/audio/weekNN/wordmatch_main.mp3`
- `/audio/weekNN/games_main.mp3`
- `/audio/weekNN/mindmap_stem_XXXXX.mp3` (5-char random suffix)
- `/audio/weekNN/mindmap_branch_XXXXX.mp3`
- Easy mode: `/audio/weekNN_easy/...`

### Image URL convention
- Vocab: `/images/weekNN/[word].jpg` (short filename, no prefix) hoặc `/images/weekNN/vocab_[word].jpg`
- Word Power: `/images/weekNN/wordpower_[collocation_slug].jpg`
- Word Power ids 7–8 (extra vocab): `/images/weekNN/wordpower_w7.jpg`, `wordpower_w8.jpg`
- Read cover: `/images/weekNN/read_cover_wNN.jpg`
- Explore cover: `/images/weekNN/explore_cover_wNN.jpg`
- **Stations không dùng image** (giữ `image_url: null`): `games.js`, `dictation.js`, `shadowing.js`, `grammar.js`, `mindmap.js`, `writing.js`

---

## LESSON PLAN (Teacher Panel)
- Stored in `public/data/lessons/WNN.json` AND `mcp-server/data/lessons/WNN.json`
- Schema: W28 golden standard (15 top-level keys: week, unit_theme, quick_ref, methodology, vocab_tiers, sessions ×3, sessions_2, sessions_5, answer_key, answer_key_by_session, task_cards, task_cards_by_session, games, video_prompts, teacher_contents)
- 3 sessions × 9 parts (PART 0 Header through PART 9 Homework)
- **W1–W53**: Already fully audited and complete — skip lesson plan generation for these weeks
- **W54–W156**: Run `python3 _gen_lesson_from_syllabus.py NN` then fill ALL [★ FILL-IN] markers with real content

---

## GIT WORKFLOW
After generating all files:
```bash
git add src/data/weeks/week_NN/ src/data/weeks_easy/week_NN/
git add src/data/weeks/week_NN_real.js
git add public/data/lessons/WNN.json mcp-server/data/lessons/WNN.json
git add public/data/lessonPlans.json public/data/lessonPlans_index.json
git add mcp-server/data/lessonPlans_index.json
git commit -m "feat(W_NN): produce week NN — Theme — Grammar Focus"
git push origin main
```
