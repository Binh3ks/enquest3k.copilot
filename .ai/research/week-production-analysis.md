# Week Production System — Complete Analysis
> Reverse-engineered from repository inspection. As of 2026-07-13. Current production state: W36.

---

# Production Assets

## 1. Golden Standards

| Week | Role | 19 files? | Notes |
|---|---|---|---|
| W36 | Current template (W36+) | Yes | Dual-tab read (read_stem + read_social), social_quiz.js, W35-evolved schemas |
| W16 | Legacy W16–W35 | Yes | Flat read.js, no social_quiz |
| W6 | Legacy W1–W15 | ~15 | 15-file schema (no singapore_math.js, logic_science.js only) |
| W7 | AI Tutor template (W1–W15) | 1 | week_07_real.js |
| W34 | Lesson plan template | — | `production_kit/pipeline/build_week_lesson_plan.py` |

**Golden standard locations:**
```
src/data/weeks/week_36/          # ADV (19 files)
src/data/weeks_easy/week_36/     # Easy (19 files)
src/data/weeks/week_36_real.js   # AI Tutor (ADV only)
```

**Clone command for W37+:**
```bash
cp src/data/weeks/week_36/*.js src/data/weeks/week_37/
cp src/data/weeks_easy/week_36/*.js src/data/weeks_easy/week_37/
cp src/data/weeks/week_36/video_queries.json src/data/weeks/week_37/
cp src/data/weeks/week_36/video_queries.json src/data/weeks_easy/week_37/
cp src/data/weeks/week_36_real.js src/data/weeks/week_37_real.js
```

---

## 2. Week Data File Structure (W36, 19 files ADV / Easy)

```
week_NN/
├── index.js             # VoiceConfig (5 DISTINCT voices), imports all stations
├── read.js              # Dual-tab: read_stem + read_social + sentences[] (backward compat)
├── explore.js           # Free exploration text (same chunk rules)
├── vocab.js            # 18 words (W28+: vocab.vocab[].id/word/pronunciation/definition_vi/en/sentence_en/example/collocation/image_url/audio_word)
├── grammar.js          # Exactly 20 exercises; exercises[].answer: NOT correct:
├── singapore_math.js   # 5 problems; use problems: [] NOT questions: [] (BUG-W34-1)
├── dictation.js        # content_en (bolded) + sentences[{text, meaning}] (W35 format)
├── shadowing.js        # videoId + content_en + script[{id, text, vi}]
├── shadowing_ipa.js    # IPA transcription for shadowing sentences
├── writing.js          # W35 format: min_words/min_sentences/model_sentence/sentence_frames[].template+answers/hints.vocabulary_bank/story_prompts.picture_mode
├── mindmap.js          # centerStems[] + branchLabels{} (W35 format: stem.type = affirmative/negative/question)
├── logic_science.js    # Logic/science puzzles
├── daily_watch.js      # 5 videos (filled by update_videos.js)
├── ask_ai.js           # AI Tutor prompts (ask_ai.js station — NOT the AI Tutor data file)
├── word_power.js       # 8 items (W28+): words[].id/word/pronunciation/cefr_level/definition_en/vi/example/collocation/model_sentence/image_url/audio_*
├── word_match.js       # Word matching pairs
├── games.js            # Game configuration
└── social_quiz.js      # 5 questions (ADV) / 4 questions (Easy) — Geography/History MCQ

AI Tutor (separate file, src/data/weeks/):
└── week_NN_real.js    # chunk_focus[] + knowledge_base + opening_narrative + phase_questions + spark_talk
```

---

## 3. Image Naming Conventions

```
/images/week{NN}/read_cover_w{NN}.jpg          # ADV read cover
/images/week{NN}/read_cover_w{NN}_easy.jpg     # Easy read cover
/images/week{NN}/explore_cover_w{NN}.jpg
/images/week{NN}/vocab_{word}.jpg               # vocab word image
/images/week{NN}/wp_{phrase}.jpg                # word power
/images/week{NN}/math_cover_w{NN}.jpg
/images/week{NN}/story_writing_pic.jpg
/images/week{NN}/barmodel_w{NN}_{mode}_p{n}_v1.jpg  # Bar models (singapore_math)
```

**Bar model path format (CRITICAL):**
- `barmodel_w{NN}_{mode}_p{n}_v1.jpg`
- `{mode}` = `adv` or `easy`
- `{n}` = problem number (1–5)
- Example: `barmodel_w36_adv_p1_v1.jpg`

**Audio naming:**
```
/audio/week{NN}/read_main.mp3      (on-demand only, NOT pre-generated for W16+)
/audio/week{NN}/vocab_{word}.mp3
/audio/week{NN}/vocab_def_{word}.mp3
/audio/week{NN}/wordpower_w{id}_word.mp3
/audio/week{NN}/wordpower_w{id}_def.mp3
```

---

## 4. Folder Conventions

```
src/data/weeks/week_NN/           # ADV stations (zero-padded 2 digits)
src/data/weeks_easy/week_NN/      # Easy stations
src/data/weeks/week_NN_real.js    # AI Tutor data (ADV only)
public/data/lessons/W{N}.json     # 156 lesson plan JSONs (W1–W156)
public/data/lessonPlans.json      # Combined lesson plan data
production_kit/
├── workflow/                      # 11-step workflow, onboarding, session guides
├── never_rules/                   # 50+ PRODUCTION_NEVER_RULES.md
├── tools/                         # 14 validation/production scripts
├── pipeline/                       # Lesson plan build pipeline
├── reference/                      # Syllabus, Blueprint, STEM spec, Speaking drill spec
├── plans/                          # Phase 1/2/3 plans
└── data/                           # Collocation datasets, bold audit
```

---

## 5. Context Loading Mechanisms

### AgentOS (`.ai/`) — Canonical Memory Layer

| File | Purpose |
|---|---|
| `.ai/memory/CURRENT.md` | Live state — branch, pending tasks, next action, uncommitted files |
| `.ai/memory/SESSION.md` | Per-session log entries (append) |
| `.ai/memory/HISTORY.md` | One-liner durable history |
| `.ai/memory/image_pipeline_state.json` | Image pipeline resume state |
| `.ai/architecture/ARCHITECTURE.md` | §1 Project, §2 Tech Stack, §3 Layers, §4 Patterns, §5 Rules, §6 Style |
| `.ai/architecture/SUBSYSTEMS.md` | 37 subsystems with dependencies |
| `.ai/architecture/REPOSITORY_MAP.md` | Per-folder read/recurse guidance |
| `.ai/architecture/INDEX.md` | Architecture folder entry point |
| `.ai/decisions/ADR_LOG.md` | Architectural Decision Records |
| `.ai/knowledge/BUG_DATABASE.md` | Long-lived bugs with TTL |
| `.ai/tasks/ACTIVE.md` | Active task board |
| `.ai/tasks/BACKLOG.md` | Queued tasks |
| `.ai/tasks/DONE.md` | Completed tasks |
| `.ai/prompts/FINISH_PROMPT.md` | Session close instructions |
| `.ai/prompts/START_PROMPT.md` | Session start instructions |

### AgentOS Lifecycle

```
BOOTSTRAP → START (read CURRENT.md → memory → decisions) → WORK → FINISH (persist state)
```

### Claude Code Commands (`.claude/`)

| File | Purpose |
|---|---|
| `.claude/commands/agent-start.cjs` | Agent initialization hook |
| `.claude/commands/agent-finish.cjs` | Agent termination hook |
| `.claude/hooks/hooks.json` | Hook + slash-command definitions |
| `.claude/hooks/post-edit-validate.cjs` | Edit/Write → auto-lint → auto-build → auto-rollback |
| `.claude/skills/week-builder/SKILL.md` | 11-step week production workflow (current) |
| `.claude/skills/week-pipeline/SKILL.md` | Subagent orchestration (content-writer + quality-reviewer) |
| `.claude/skills/content-check/SKILL.md` | Content validation skill |
| `.claude/skills/shadowing-debug/SKILL.md` | Shadowing subsystem debugging |
| `.claude/agents/content-writer.md` | Content-writer subagent prompt |
| `.claude/agents/quality-reviewer.md` | Quality-reviewer subagent prompt |
| `.claude/memory/lessons.md` | Cross-agent lessons (symlinked from .ai/knowledge/LESSONS.md) |

### CLAUDE.md Root File

Primary runtime context for Claude Code. Contains:
- Full production toolkit table (scripts, usage, E2E tests)
- Week-specific context (W36 golden standard differences from W16)
- Comprehension question standards
- Singapore Math CPA scaffolding
- AI Tutor content rules
- Key paths
- Common commands

### Build Context Script

```bash
# scripts/build-context.mjs — assembles production context for agent sessions
node scripts/build-context.mjs
```

### Session Logging

```bash
# logs/session_YYYYMMDD_HHMMSS.log — auto-created by preflight_check.sh
```

---

# Rules

## Hard Production Rules (from `production_kit/never_rules/PRODUCTION_NEVER_RULES.md`)

### Chunk / Collocation Rules (MANDATORY ALL English Content)
- Scope: read.js, explore.js, dictation.js, shadowing.js, writing.js sentence_frames, AI Tutor content
- **Single-word bolds = 0** in all 156 weeks
- **W28+**: ≥10 multi-word chunks per passage, 1–3 per sentence
- **W36+ canonical-longest**: bold longest form at every occurrence; no sub-chunks inside super-chunks
- Must be in Oxford Collocations Dictionary OR A1-B1 functional chunks OR curated whitelist
- **NEVER**: doubled modifiers (`very very tall`), tautological adj+profession (`kind teacher`), forced verb+adj (`made fresh food`)
- `content_vi` carries NO `**bold**` markers
- Chunks must be read aloud — awkward sentences = rewrite

### Grammar Rules
- Exactly 20 exercises per grammar.js (both ADV and Easy)
- Use `answer:` NOT `correct:` (BUG-B7)
- ADV grammar uses `question_en` field; Easy uses `sentence` field
- Unscramble: MUST have `words: []` array AND `question:` field
- Empty answer = always wrong (BUG-B8)
- Never use slash-separated answer strings (`"A / B"`); use `["A", "B"]` (BUG-32)

### Read/Explore Questions
- W1–W16: exactly 3 comprehension questions
- W17–W156: exactly 4 comprehension questions
- Every question MUST have: `answer: [...]` (≥2 answers), `clue_statement`, `hint_en`, `hint_vi`
- `explore.js`: 0 questions (free activity)
- If both "X" AND "Y" appear in content_en, both must be in answer array (BUG-33)
- `explore.js` check_questions MUST have `answer: [...]` array (BUG-31)
- Never use curly quotes `'` `'` — always ASCII `'` (BUG-34)

### Singapore Math Rules
- W1–W16: `language` stage, no bar model, `part_whole` only
- W17–W34 Easy: `concrete` stage, bar model renders, `missing_part`, `comparison`
- W17–W34 ADV: `pictorial` stage, bar model renders, `groups`, `before_after`
- W36+: pictorial CPA stage (5 problems)
- **VALID types only**: `part_whole`, `comparison`, `missing_part`, `groups`, `before_after`
- **Never use `questions:`** — must use `problems: []` (BUG-W34-1)
- ADDITION bars show **Total:?**; SUBTRACTION bars show **Total: known**

### AI Tutor Rules (week_NN_real.js)
- `chunk_focus[]`: 3–5 collocations from read.js
- `knowledge_base`: empathy rule required — NEVER say "Great!" after injury/negative
- `opening_narrative`: from AI's perspective, not student's
- `spark_talk`: ≥8 frames (BUG-W30-35-1 — sparks must cover all 8 turns)
- `phase_questions`: empathetic framing
- `spark_talk` bridge for safety topics: empathetic transition

### TTS / Audio Rules
- **W16+ audio is on-demand** — NO batch generation
- Runtime: `voiceService.js` → Deepgram Worker → R2 cache → CDN
- On-demand path format: `/audio/week{NN}/read_main.mp3`
- Batch TTS (W1–W15): `python3 tools/generate_audio_deepgram.py N --upload`
- Text-hash cache prevents stale audio regeneration
- Model name: `aura-orion-en` (NOT `aura-2-orion-en`)
- Audio bucket: `engquest-audio` on Cloudflare R2

### Other Critical Rules
- **NEVER use Python to create .js files** — Python is for tooling only (BUG-W12)
- **AI Tutor = `week_NN_real.js`** — NOT `ask_ai.js`
- `ask_ai.js` = the ask-ai station prompts (separate from AI Tutor)
- **VoiceConfig in index.js**: 5 DISTINCT voices per mode (BUG-W12)
- `daily_watch` must be included in index.js stations object
- `metadata.js` must be updated with week title (BUG-B6)
- 4 UI files must be updated after content creation: StoryMissionTab, FreeTalkTab, gameAdaptation, metadata.js
- `index.js` required for BOTH ADV and Easy modes

### Singapore Math bar model label logic
- ADDITION (`"in total?"` / `"altogether?"`): bar shows **Total:?**, Part A + Part B
- SUBTRACTION (`"left"` / `"remaining"` / `"in 2 trips"`): bar shows **Total: known**, Part A + Part B:?
- **NEVER use `is_total_first` for both** — caused W34 Easy P1 to show Total=18 instead of Total:? (BUG-W34-2)

---

# Templates

## Week Production Workflow — 11 Steps (from `.claude/skills/week-builder/SKILL.md`)

### BƯỚC -1: System Check
```bash
bash production_kit/tools/preflight_check.sh
```

### BƯỚC 0: Create directories + clone from golden standards
```bash
mkdir -p src/data/weeks/week_36 src/data/weeks_easy/week_36
# Clone from W36 (current golden standard for W36+)
cp src/data/weeks/week_36/*.js src/data/weeks/week_36/
cp src/data/weeks_easy/week_36/*.js src/data/weeks_easy/week_36/
cp src/data/weeks/week_36/video_queries.json src/data/weeks/week_36/
cp src/data/weeks/week_36/video_queries.json src/data/weeks_easy/week_36/
cp src/data/weeks/week_36_real.js src/data/weeks/week_36_real.js
```

### BƯỚC 1: Create/update video_queries.json (both modes)
Fields: `weekId`, `theme`, `grammar_focus`, `vocabulary_focus`, `videos[]` (purpose, priority_search, backup_search)

### BƯỚC 2: Update Daily Watch videos
```bash
node tools/update_videos.js 36 --reset
node tools/validate_video_thumbnails.js 36
cp src/data/weeks/week_36/daily_watch.js src/data/weeks_easy/week_36/daily_watch.js
```

### BƯỚC 3: Generate bar models (if singapore_math.js exists)
```bash
python3 tools/generate_logiclab_barmodels.py 36 --skip-existing
node tools/validate_barmodels.js 36
```

### BƯỚC 4: Edit content files (Node.js only, no Python)
Replace golden-standard content with target week content. Key rules:
- read.js: dual-tab (read_stem + read_social), ≥10 multi-word chunks, 4 comprehension Q (W17+)
- vocab.js: 18 words (W28+), `vocab.vocab[].id/word/...`
- grammar.js: exactly 20 exercises, `answer:` not `correct:`
- writing.js: W35 format with `sentence_frames[].template+answers` and `hints.vocabulary_bank`
- mindmap.js: `centerStems[]` + `branchLabels{}` with `stem.type`
- word_power.js: 8 items with `cefr_level`, `model_sentence`, `audio_model`

### BƯỚC 5: Validate content
```bash
npm run content:lint -- --week 36 --errors-only
npm run dict:lint -- --errors-only
bash production_kit/tools/bug_prevention_check.sh 36
bash production_kit/tools/code_quality_gate.sh 36
node production_kit/tools/validate_sgmath_types.mjs 36
```

### BƯỚC 6: Audio — on-demand (NO batch for W16+)
No manual step needed. Runtime generates + caches on first user play.

### BƯỚC 7: Generate images
```bash
node tools/image_pipeline/orchestrator.mjs --week 36
# Optional: --dry-run, --skip-upload, --skip-update
# IMG_MODEL=flux-schnell for FLUX model
# Resume-safe: state tracked in .ai/memory/image_pipeline_state.json
```

### BƯỚC 8: Fetch shadowing transcripts (if new video)
```bash
node tools/fetch_video_transcripts.js --only 36
node tools/clean_transcripts.mjs
python3 tools/split_transcripts.py
# Manual overrides: edit src/data/curated_transcripts.json then re-run clean_transcripts.mjs
```

### BƯỚC 9: Build
```bash
rm -rf node_modules/.vite dist && npm run build
```

### BƯỚC 10: Browser test
- ADV mode: navigate to week 36, all stations load
- Easy mode: switch mode, navigate to week 36, all stations load
- Audio plays on-demand (first play slower, second play cached)

### BƯỚC 11: Commit
```bash
git add src/data/weeks/week_36/ src/data/weeks_easy/week_36/ src/data/weeks/week_36_real.js
git add public/images/week36/  # if generated
git commit -m "feat(content): week 36 ADV + Easy — [topic]"
```

---

# Schemas

## read.js (W36 dual-tab schema)

```javascript
export default {
  content_en: "...",           // For backward compat with validators
  sentences: [                  // Sentence-level array (backward compat)
    { id: 1, text: "Sentence text" },
    ...
  ],
  read_stem: {                  // STEM/Adventure Stories tab
    title_en: "...",
    subtitle_en: "...",
    image_url: "/images/week36/read_stem_w36.jpg",
    audio_url: "/audio/week36/read_stem.mp3",
    content_en: "... **bold chunk** ...",  // Bolded multi-word chunks only
    content_vi: "...",           // NO bold markers
    key_vocabulary: [
      { word: "...", definition: "...", example: "..." },
      ...
    ],
    comprehension_questions: [    // W17+: exactly 4; W1-W16: exactly 3
      {
        id: 1,
        question_en: "...",
        answer: ["A", "B"],     // ≥2 acceptable answers
        clue_statement: "...",
        hint_en: "...",
        hint_vi: "..."
      },
      ...
    ]
  },
  read_social: {                 // Social Studies tab
    title_en: "...",
    subtitle_en: "...",
    image_url: "/images/week36/read_social_w36.jpg",
    audio_url: "/audio/week36/read_social.mp3",
    content_en: "... **bold chunk** ...",
    content_vi: "...",
    key_vocabulary: [...],
    comprehension_questions: [...]  // 4 questions
  }
};
```

## vocab.js (W28+ schema)

```javascript
export default {
  vocab: [
    {
      id: 1,
      word: "submarine",         // Single word OR multi-word ("coral reef")
      pronunciation: "/ˈsʌbməriːn/",
      definition_vi: "tau ngam",
      definition_en: "a special ship...",
      example: "The submarine dove deep...",
      collocation: "submarine trip / underwater",
      image_url: "/images/week36/vocab_submarine.jpg",
      audio_word: "/audio/week36/vocab_submarine.mp3"
    },
    ...  // 18 words for W28+
  ]
};
```

## grammar.js (W36 schema)

```javascript
export default {
  title: "Irregular Verbs — Adventure Stories",
  theme: "adventure_stories",
  rule: {
    en: "... rule explanation ...",
    vi: "... rule explanation VN ..."
  },
  exercises: [
    // fill_blank: use answer:
    { id: 1, type: 'fill_blank', question_en: 'Marco Polo ___ (go)...', answer: 'went', hint: 'go → went' },
    // unscramble: MUST have words:[] AND question:
    { id: 9, type: 'unscramble', question_en: 'Unscramble the words:', words: ['Marco', 'went', 'to', 'China'], answer: 'Marco went to China' },
    // multiple_choice
    { id: 11, type: 'multiple_choice', question_en: 'Choose...', options: ['goed', 'went', 'gone'], answer: 'went' },
    // sentence_correct
    { id: 19, type: 'sentence_correct', question_en: 'Correct...', answer: 'He went to China', hint: '...' },
    ...  // Exactly 20 total
  ]
};
```

## writing.js (W35 format)

```javascript
export default {
  title: "...",
  theme: "...",
  min_words: 65,                // ADV: 45; Easy: 30
  min_sentences: 8,             // ADV: 8; Easy: 6-7
  model_sentence: "...",
  topic_talk_prompt: "...",
  prompt_en: "...",
  prompt_vi: "...",
  sentence_frames: [
    { template: "Last summer, my family ___ (go)...", answers: ["went"] },
    ...
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "...",
      show_by_default: false,
      scaffolding_stage: "medium",  // or "easy", "hard"
      words: [
        { word: "went", vi: "da di", distractor: false },
        ...  // distractor: true for wrong answers
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week36/story_writing_pic.jpg',
      image_prompt: "...",
      word_bank: [...],
      sentence_frames: [...],
      writing_prompts: { en: "...", vi: "..." },
      rubric_tier: 1
    }
  }
};
```

## mindmap.js (W35 format)

```javascript
export default {
  centerStems: [
    { text: "Yesterday, we ___ to the museum.", type: "affirmative", audio: "/audio/week36/mindmap_stem_1.mp3" },
    { text: "The explorers ___ amazing things.", type: "affirmative", audio: "..." },
    { text: "Marco Polo ___ a famous book.", type: "affirmative", audio: "..." },
    { text: "We never ___ a treasure.", type: "negative", audio: "..." },
    { text: "They did not ___ their findings.", type: "negative", audio: "..." },
    { text: "What ___ you discover today?", type: "question", audio: "..." }
    // 2 affirmative + 2 negative + 2 question
  ],
  branchLabels: {
    "Yesterday, we ___ to the museum.": [
      { text: "went", audio: "/audio/week36/mindmap_branch_1_1.mp3" },
      { text: "came", audio: "..." },
      ...  // 4-6 branches per stem
    ],
    ...
  }
};
```

## word_power.js (W28+ schema)

```javascript
export default {
  title: "Word Power: Adventure & Irregular Verbs",
  audio_url: null,
  words: [
    {
      id: 1,
      word: "went on an adventure",
      pronunciation: "/went ɒn ən ədˈventʃər/",
      cefr_level: "A2",
      definition_en: "to start an exciting journey",
      definition_vi: "bat dau mot cuoc phieu luu",
      example: "Marco Polo went on an adventure across the Silk Road.",
      collocation: "went on an adventure / begin a journey",
      model_sentence: "Last summer, our family went on an amazing underwater adventure.",
      image_url: "/images/week36/wp_went_adventure.jpg",
      audio_word: "/audio/week36/wordpower_w1_word.mp3",
      audio_definition: "/audio/week36/wordpower_w1_def.mp3",
      audio_example: "/audio/week36/wordpower_w1_example.mp3",
      audio_collocation: "/audio/week36/wordpower_w1_collocation.mp3",
      audio_model: "/audio/week36/wordpower_w1_model.mp3"
    },
    ...  // 8 items for W28+
  ]
};
```

## social_quiz.js (W36 — NEW, ADV only)

```javascript
export default {
  questions: [
    {
      type: "geography_mcq",     // or "history_mcq", "geography_reasoning"
      question_en: "...",
      question_vn: "...",
      options: ["A", "B", "C", "D"],
      correct: "A",
      explanation: "...",
      vocab: ["word1", "word2", ...]
    },
    ...  // 5 questions (ADV) / 4 questions (Easy)
  ]
};
```

## dictation.js (W35 format)

```javascript
export default {
  content_en: "Last summer, my family and I **went on** a submarine adventure...",
  sentences: [
    { id: 1, text: "Last summer, my family and I went on a submarine adventure.", meaning: "..." },
    ...  // 10 sentences, chunk-rich
  ]
};
```

## shadowing.js

```javascript
export default {
  videoId: 'X2YgM1Zw4_E',       // YouTube video ID
  content_en: "Last summer, my family and I went on a submarine adventure...",
  script: [
    { id: 1, text: "Last summer, my family and I went on a submarine adventure.", vi: "Mùa hè năm ngoái..." },
    ...
  ]
};
```

## week_NN_real.js (AI Tutor)

```javascript
const week36RealData = {
  week_id: 36,
  week_number: 36,
  title: "Adventure Stories",
  weekTitle_en: "Adventure Stories",
  weekTitle_vi: "Nhung Cau Chuyen Phieu Luu",
  topic: "...",
  topic_vi: "...",
  theme: "adventure_stories",
  grammar_focus: "Irregular Verbs (5 groups: go/went, see/saw, take/took, come/came, find/found)",
  grammar_pattern: "...",
  grammar_examples: ["..."],
  chunk_focus: [
    "went on an adventure",
    "dove down into",
    "saw magnificent",
    ...  // 3-5 collocations from read.js
  ],
  target_vocab: [
    { word: "...", pronunciation: "...", definition_vi: "...", definition_en: "..." },
    ...
  ],
  spark_talk: {
    opening_narrative: "I heard you went on an amazing adventure!...",
    frames: [
      { id: 1, text_en: "That sounds exciting! Where did you explore?", text_vi: "..." },
      ...  // ≥8 frames
    ]
  },
  knowledge_base: "Students will describe... NEVER say 'Great!' after injury/negative...",
};

module.exports = week36RealData;  // Note: uses module.exports, not ES export default
```

## singapore_math.js

```javascript
export default {
  stage: "pictorial",           // language | concrete | pictorial
  problems: [                    // NOT questions:
    {
      id: 1,
      type: "part_whole",        // Valid: part_whole | comparison | missing_part | groups | before_after
      question_en: "...",
      question_vi: "...",
      visual: { type: "bar", ... },
      answer: "18",
      hint: "..."
    },
    ...  // 5 problems
  ]
};
```

## games.js (game configuration — schema not fully documented)

## index.js (station hub)

```javascript
import readData from './read.js';
import vocabData from './vocab.js';
...
import voiceConfig from './voiceConfig.js';  // 5 DISTINCT voices

export default {
  read: readData,
  vocab: vocabData,
  ...
  daily_watch: dailyWatchData,   // Must be included
  voiceConfig: {
    read: "en-US-Neural-Female-1",
    vocab: "en-US-Neural-Male-1",
    grammar: "en-US-Neural-Female-2",
    logic: "en-US-Neural-Male-2",
    writing: "en-US-Neural-Female-1"  // Must be 5 DISTINCT voices
  }
};
```

---

# Prompt Files

## Root-Level Prompt Files

| File | Purpose |
|---|---|
| `CLAUDE.md` | Primary runtime context for Claude Code — toolkit, validators, week schemas, key paths |
| `OPENHANDS.md` | OpenHands-specific instructions |

## `.ai/` Prompt Files

| File | Purpose |
|---|---|
| `.ai/prompts/START_PROMPT.md` | Session startup instructions (embedded in START.md) |
| `.ai/prompts/FINISH_PROMPT.md` | Session close instructions (embedded in FINISH.md) |
| `.ai/prompts/FEATURE.md` | Feature development workflow prompt |
| `.ai/prompts/BUGFIX.md` | Bug fix workflow prompt |

## `.claude/` Agent Prompts

| File | Purpose |
|---|---|
| `.claude/agents/content-writer.md` | Content-writer subagent — creates all week content files |
| `.claude/agents/quality-reviewer.md` | Quality-reviewer subagent — runs 7-validator chain |
| `.claude/agents/code-debugger.md` | Code debugging subagent |

## Production Kit Workflow Prompts

| File | Purpose |
|---|---|
| `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` | 11-step production workflow — THE canonical production guide |
| `production_kit/workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md` | Onboarding prompt for new agents (copy-paste into new session) |
| `production_kit/workflow/NEW_SESSION_ONBOARDING.md` | New session onboarding steps |
| `production_kit/workflow/STANDARD_WEEK_CREATION_WORKFLOW.md` | Standard SOP with lessons learned W30-35 |
| `production_kit/workflow/TOOLKIT_INTEGRATION.md` | How to integrate toolkit into workflow |

## Legacy Prompt Files (docs/)

| File | Purpose |
|---|---|
| `docs/4. MASTER PROMPT V23-FINAL.md` | Legacy 14-file schema (V23, pre-W16) |
| `docs/AI_TUTOR_MASTER_ARTIFACT.md` | AI Tutor content guidelines |
| `docs/ai_application_context.md` | Application context for AI generation |

---

# Skills

## Week Builder Skill (`.claude/skills/week-builder/SKILL.md`)

Complete 11-step production workflow. Covers:
- Golden standard selection (W36 for W36+, W16 for W16–W35, W6 for W1–W15)
- Question count rule: W1–W16 = 3 Q, W17+ = 4 Q
- Chunk-first rules by week range
- All 11 BƯỚC steps with commands
- Image pipeline with resume-safe orchestrator
- Shadowing transcript 3-stage pipeline
- Report format

## Week Pipeline Skill (`.claude/skills/week-pipeline/SKILL.md`)

Subagent orchestration:
- Step 1: content-writer subagent (80-120K context)
- Step 2: quality-reviewer subagent (20-40K context)
- Step 3: post-validation (10K context)
- Step 4: decision (SHIP / FIX-THEN-SHIP / BLOCKER)

## Content Check Skill (`.claude/skills/content-check/SKILL.md`)

Content validation — runs full 7-validator chain.

## Shadowing Debug Skill (`.claude/skills/shadowing-debug/SKILL.md`)

Shadowing subsystem debugging.

## AgentOS Skills (`.ai/bootstrap/`, `.ai/scripts/`)

Empty/in progress — `.ai/bootstrap/` and `.ai/scripts/` directories exist but are unpopulated.

---

# Missing Documentation

## Critical Gaps

1. **No formal JSON schema file** for week data files — schemas are scattered across:
   - W36 golden standard files (19 files)
   - `CLAUDE.md` (partial schemas)
   - `docs/4. MASTER PROMPT V23-FINAL.md` (outdated 14-file schema)
   - `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` (embedded in workflow steps)
   - `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` (field-level rules, not schema)

2. **No schema for `games.js`** — file exists in every week, schema is not documented anywhere

3. **`ask_ai.js` schema not documented** — only referenced as "AI Tutor prompts" but schema is unclear

4. **`word_match.js` schema not documented** — noted as "dynamically powered by vocab.js" placeholder

5 **`logic_science.js` schema not documented** — exists in every week but schema not captured

6. **No collocation reference file inventory** — `production_kit/data/` contains:
   - `oxford_collocations.txt` (69,970 entries)
   - `a1b1_functional_chunks.txt` (~687 entries)
   - `extended_collocations.json`
   - `chunks_dataset.json`
   - `learned_whitelist.json`
   - These are used for bold validation but no documented "which file for which week range"

7. **No AI Tutor V28 schema** — `week_36_real.js` uses V28 format but no schema document exists

8. **`shadowing_ipa.js` schema not documented** — IPA transcription format unknown

9. **`voiceConfig` voice names not documented** — "5 DISTINCT voices" but which voices? Where is the voice registry?

10. **No formal QA workflow document** — QA steps exist embedded in BƯỚC 5 of week-builder skill but not as a standalone document

11. **`video_queries.json` schema** — referenced in BƯỚC 1 but exact schema not documented

12. **`production_kit/pipeline/`** — lesson plan pipeline documented in `NEW_AGENT_ONBOARDING_PROMPT.md` but pipeline itself (`build_from_docx.py`, `generate_ai_week.py`) not inspected

13. **`production_kit/tools/layer*_audit.py`** — 4-layer audit pipeline exists but schemas and validation rules not documented

14. **`production_kit/plans/`** — Phase 1/2/3 plans exist but not inspected for content rules

15. **`production_kit/reference/SPEAKING_DRILL_SPEC.md`** — referenced but not inspected

16. **`production_kit/reference/W35_SUB_TAB_LAUNCH_GUIDE.md`** and **`W40_DEBATE_LAUNCH_GUIDE.md`** — not inspected

17. **`production_kit/reference/SUBTAB_ROADMAP.md`** — not inspected

18. **`docs/MASS/`** — 17 files in `docs/MASS/` directory, not inspected

19. **`scripts/prep_dataset.py`**, **`scripts/generate_sessions.mjs`**, **`scripts/generate_ai_context.cjs`** — not inspected for production rules

20. **`src/data/video_transcripts_by_id/`** — transcript pipeline output, not inspected for schema

21. **`src/data/curated_transcripts.json`** — manual overrides file, schema unknown

22. **`public/data/lessonPlans.json`** and **`lessonPlans_index.json`** — lesson plan JSON format, not inspected

23. **`public/dictionary.json`** — dictionary format, not inspected

---

# Unknown Behaviors

1. **Image pipeline orchestrator** — how does it extract context for per-slot images? What model does it call? How does it handle rate limits?

2. **Shadowing transcript alignment** — how does `clean_transcripts.mjs` merge curated overrides? What is the transcript format expected by the shadowing UI component?

3. **AI Tutor runtime** — exactly how does `novaEngine.js` process `week_NN_real.js`? How are `phase_questions` cycled? What triggers "Card Mode" vs "Soft Bridge Mode"?

4. **`story_character` removal** — ADR log mentions `story_character` was removed from story_mission data. Exact impact on AI Tutor behavior unclear.

5. **`word_match.js` dynamic generation** — how does the station generate matching from `vocab.js`? What are the matching rules?

6. **Bar model rendering** — how does the browser render bar models? What component handles the bar model layout?

7. **`logic_science.js` rendering** — what UI component renders logic_science puzzles? What types of puzzles are supported?

8. **Voice service fallback** — what happens if Deepgram Worker is down? Is there a browser Speech Synthesis API fallback?

9. **Week 7 AI Tutor** — is W7 still used as AI Tutor template for W1–W15, or is there a newer one?

10. **W36 golden standard** — is W36 actually complete? The `week_36_real.js` uses `module.exports` while other files use `export default` — is this intentional?

11. **Content lint tool** — `npm run content:lint` — exact rules checked, schema not documented

12. **Dictionary lint tool** — `npm run dict:lint` — exact rules checked, schema not documented

13. **Bold consistency audit** — `bold_consistency_audit.json` and `bold_consistency_audit.md` in `production_kit/data/` — what are Pattern A and Pattern C?

14. **`correctWord UPPERCASE`** in `ask_ai.js` — rule from week-builder skill: "correctWord UPPERCASE" in question_word_bank

15. **Transcript per-video vs monolithic** — `transcriptUtils.js` was refactored to 100% per-video (commit 94449097). What is the exact per-video JSON schema?

16. **`correctWord UPPERCASE`** — mentioned in week-builder skill BƯỚC 4: ask_ai.js — "correctWord UPPERCASE" in question_word_bank

---

# Recommendations

1. **Create canonical `schemas/week_data_schema.json`** — one file that defines all 19 file schemas for both ADV and Easy modes with examples. This is the single most impactful documentation gap.

2. **Create `QA_WORKFLOW.md`** — standalone QA workflow document (currently embedded in week-builder SKILL.md BƯỚC 5). Should include: validator mapping, error triage, retry strategy.

3. **Create `AI_TUTOR_V28_SCHEMA.md`** — document the complete week_NN_real.js schema with all optional/required fields, the spark_talk framing rules, and the empathy contract.

4. **Document `video_queries.json` schema** — referenced in BƯỚC 1 of week production but not defined anywhere.

5. **Document the collocation reference hierarchy** — which files to check against for which week ranges (Oxford vs A1-B1 vs learned_whitelist).

6. **Add schema stubs for undocumented files**: `games.js`, `ask_ai.js`, `logic_science.js`, `word_match.js`, `shadowing_ipa.js`.

7. **Document the voice registry** — what are the 5 distinct voice names? Where is the voiceConfig schema?

8. **Create `PRODUCTION_CHECKLIST.md`** — the production checklist embedded in `WEEK_PRODUCTION_CHECKLIST_V2.md` at root should be canonical and linked from CLAUDE.md.

9. **Audit `docs/MASS/`** — 17 files in this directory should be reviewed and either archived or integrated into the main documentation.

10. **Document the image pipeline orchestrator** — `tools/image_pipeline/orchestrator.mjs` — how it extracts context, handles failures, manages state.

11. **Create a `GLOSSARY.md`** — terms like "Spark Talk", "Card Mode", "Soft Bridge Mode", "Nova Engine", "canonical-longest bold policy" are used throughout but defined nowhere.

12. **Document the transcript pipeline** — `clean_transcripts.mjs` + `split_transcripts.py` — exact input/output formats, how overrides work, per-video JSON schema.

13. **Create `BOLD_AUDIT_METHODOLOGY.md`** — Pattern A vs Pattern C bold audit in `production_kit/data/` — document what these patterns are and how the audit works.

14. **AgentOS bootstrap is incomplete** — `.ai/bootstrap/` and `.ai/scripts/` directories exist but are empty. These should be populated to automate AgentOS integrity checks.

15. **Week-builder skill should link to never_rules** — the skill references `production_kit/never_rules/` but does not link to the specific rules that apply at each step.
