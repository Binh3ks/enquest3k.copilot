# IMPLEMENTATION_AUDIT.md — Reverse-Engineering of the EngQuest3K Week Production System

> **Author:** Week Production Reverse-Engineering Audit
> **Date:** 2026-07-14
> **Status:** Draft v1 — awaiting PO approval
> **Scope:** Complete production ecosystem — workflow, validators, media pipelines, station implementations, runtime modules, AI Tutor, hardcoded assumptions, hidden conventions.
>
> **Method:** Direct inspection of repo files. Implementation is the primary source of truth whenever it extends the Blueprint. Never assume. Never infer.
> **Out of scope:** Modifying any Runtime code. Only documentation.

---

## 0. Executive Picture

EngQuest3K ships **156 weeks** of English-learning curriculum. Each week is **dual-mode** (Advanced / Easy) and ships as a directory of `src/data/weeks/week_NN/*.js` + `src/data/weeks_easy/week_NN/*.js` files, plus a single AI Tutor data file `src/data/weeks/week_NN_real.js`.

The production pipeline is:

```
Syllabus.docx  ──► content-writer (Sonnet subagent) ──► 39 .js files
                                                       │
                                                       ├─► image_pipeline (resume-safe, Gemini/FLUX/SD3)
                                                       ├─► audio (on-demand, Deepgram Worker + R2)
                                                       └─► video discovery (YouTube Data API, whitelist)
                                                                 │
                                                                 ▼
                                                  ┌─ 7-validator chain ────────┐
                                                  │ content:lint               │
                                                  │ dict:lint                  │
                                                  │ bug_prevention (13 checks) │
                                                  │ code_quality_gate (48 chks)│
                                                  │ sgmath_types               │
                                                  │ barmodels                  │
                                                  │ thumbnails                 │
                                                  └────────────────────────────┘
                                                                 │
                                                                 ▼
                                                         npm run build → commit
```

W36 is the current golden standard. W35 is the legacy sub-tab launch (predeployed but contains known defects). Weeks 1–34 are partially deployed (W1–W15 = 15-file era; W16–W34 = 19-file era).

---

## 1. Repository Map (where things actually live)

### 1.1 Canonical workflow files
| Path | Role | Status |
|---|---|---|
| `.claude/skills/week-builder/SKILL.md` | Sole active W36+ workflow, 11-step (BƯỚC -1 → 11) | **AUTHORITATIVE** |
| `.claude/skills/week-pipeline/SKILL.md` | Subagent orchestration (content-writer → quality-reviewer → decision) | Active |
| `.claude/skills/content-check/SKILL.md` | 7-validator chain logic | Active |
| `.claude/skills/shadowing-debug/SKILL/` | Shadowing debugging helper | Active |
| `.claude/agents/content-writer.md` | Sonnet subagent for content authoring | Active |
| `.claude/agents/quality-reviewer.md` | Sonnet subagent for validation chain | Active |
| `.claude/agents/code-debugger.md` | Opus subagent for bug root-cause | Active |
| `.claude/commands/produce-week.md` | Slash command → loads runtime + executes flow | Active |
| `.ai/agents/week-production/*.md` | Week Production Runtime (README, ROLE, CONTEXT, PROCESS, SOURCE_OF_TRUTH, EXECUTION_FLOW, VALIDATION_PIPELINE, CHECKPOINTS, ERROR_RECOVERY) | Active Runtime |
| `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` | 50+ hard rules with `Why:` and `Source:` | **Single source of truth** |
| `production_kit/reference/Syllabus_V5_PublicationReady.docx` | Curriculum source (all 156 weeks) | Authoritative |
| `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` | Master technical spec | Authoritative (but partially stale, see BLUEPRINT_VS_IMPLEMENTATION) |
| `production_kit/reference/W35_SUB_TAB_LAUNCH_GUIDE.md` | W35 sub-tab launch plan | Legacy / mostly superseded |
| `production_kit/reference/SUBTAB_ROADMAP.md` | Sub-tab roadmap | Self-marks "awaiting spec" — stale |

### 1.2 Deprecated / Legacy workflow files (KEEP for reference)
- `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` — DEPRECATED banner on top; superseded by Week Builder
- `production_kit/workflow/STANDARD_WEEK_CREATION_WORKFLOW.md` — references W34, contradicts newer W36 directives
- `production_kit/workflow/0. NEW_AGENT_ONBOARDING_PROMPT.md` — onboarding for older W34 era
- `Production_FINAL/` (mostly deleted in recent commits) — historical mass-production archive
- `MASS_Final/` (referenced) — historical archive

### 1.3 Validators (active)
- `production_kit/tools/preflight_check.sh` — 6 system checks
- `production_kit/tools/bug_prevention_check.sh` — 13 patterns (B5, B7, B8, B10, B11, B13, B15, B17, B22, B23, B24, B25)
- `production_kit/tools/code_quality_gate.sh` — **48+ checks** (CHECK 1 → CHECK 46, with skipped renumbered 39–41)
- `production_kit/tools/validate_sgmath_types.mjs` — Singapore Math type names
- `tools/validate_barmodels.js` — bar model paths + file existence
- `tools/validate_video_thumbnails.js` — Daily Watch thumbnail accessibility (200 OK)
- `tools/content_lint.mjs` — read.js + explore.js content quality
- `tools/dict_lint.mjs` — global dictionary consistency
- `tools/qa_check.js` — additional QA (legacy)
- `tools/validate_week.js` — week data structure (legacy)

### 1.4 Media generators (active)
- `tools/generate_audio_deepgram.py` — TTS generation (Deepgram Aura-2 + R2 cache)
- `tools/image_pipeline/orchestrator.mjs` — image gen + upload + source rewrite (Gemini / FLUX / SD3)
- `tools/image_pipeline/prompts_map.json` — per-slot prompt mappings (massive 37KB map)
- `tools/image_pipeline/upload_only.mjs` — re-upload only
- `tools/image_pipeline/audit.mjs` — image audit
- `tools/update_videos.js` — YouTube Data API search + whitelist
- `tools/fetch_video_transcripts.js` — fetch raw YouTube transcripts (Stage 1)
- `tools/clean_transcripts.mjs` — ASR cleanup + curated overrides (Stage 2)
- `tools/split_transcripts.py` — split monolithic into per-video JSON files
- `tools/migrate_shadowing.mjs` — legacy migration script
- `tools/curate_shadowing_videos.js` — Shadowing video curation
- `tools/generate_logiclab_barmodels.py` — bar model image generation (Singapore Math)
- `tools/upload_week_images_r2.py` — image R2 upload helper
- `tools/generate_audio_deepgram.py` — TTS generation (text-hash cache)

### 1.5 Week data layout
```
src/data/
├── weeks/
│   ├── week_NN_real.js              ← AI Tutor (NEVER use root-path, see NEVER-B6)
│   ├── week_36/index.js             ← station aggregator
│   ├── week_36/read.js              ← content_en + sentences[] + read_stem + read_social (dual-tab)
│   ├── week_36/explore.js
│   ├── week_36/vocab.js
│   ├── week_36/grammar.js
│   ├── week_36/writing.js
│   ├── week_36/mindmap.js
│   ├── week_36/word_power.js
│   ├── week_36/word_match.js
│   ├── week_36/ask_ai.js
│   ├── week_36/games.js             ← named export `week_NNGamesAdvanced`
│   ├── week_36/dictation.js
│   ├── week_36/shadowing.js
│   ├── week_36/shadowing_ipa.js
│   ├── week_36/logic_science.js
│   ├── week_36/singapore_math.js
│   ├── week_36/social_quiz.js       ← W36+ only
│   ├── week_36/daily_watch.js
│   └── week_36/video_queries.json
├── weeks_easy/
│   └── week_NN/                     ← mirror of /weeks/, independent simplified content
├── video_transcripts_by_id/
│   ├── cleaned/<videoId>.json       ← cleaned ASR per video
│   ├── raw/<videoId>.json           ← raw ASR
│   └── sentences/<videoId>.json     ← sentence-aligned
├── curated_transcripts.json         ← manual overrides (~39KB)
├── metadata.js                      ← week titles (sidebar)
└── cmudict.json                     ← CMU pronunciation dictionary (for IPA fallback)
```

### 1.6 Runtime consumption pattern (Vite + React)
- `import.meta.glob('../../data/weeks/week_*/shadowing_ipa.js')` — runtime import globbing for IPA per week
- `import.meta.glob('../../data/video_transcripts_by_id/{cleaned,sentences,raw}/*.json', {eager, import:'default'})` — shadowing transcripts
- All week files use ES module `export default { ... }`
- Station components read via `weekData.stations.<key>`

---

## 2. The Canonical 11-Step Production Pipeline

From `.claude/skills/week-builder/SKILL.md` — the **sole active workflow** for W36+:

| BƯỚC | Name | Action | Command / Files | Gate |
|---|---|---|---|---|
| **-1** | Pre-flight | System integrity | `bash production_kit/tools/preflight_check.sh` | exits 0 |
| **0** | Setup | Create + clone from golden | `mkdir -p src/data/weeks/week_NN src/data/weeks_easy/week_NN`; `cp src/data/weeks/week_36/* src/data/weeks/week_NN/`; same for Easy + `cp src/data/weeks/week_36_real.js ..._real.js` | 38 files exist |
| **1** | video_queries.json | Edit queries | manual edit `week_NN/video_queries.json` (both modes) | file has expected fields |
| **2** | Daily Watch videos | Run video pipeline | `node tools/update_videos.js N --reset`; `node tools/validate_video_thumbnails.js N`; `cp ADV daily_watch.js → Easy` | `daily_watch.js` exists both modes; thumbnails 200 OK |
| **3** | Bar models | Generate + validate | `python3 tools/generate_logiclab_barmodels.py N --skip-existing`; `node tools/validate_barmodels.js N` | paths valid; files ≥1KB |
| **4** | Content edit | Author 19 files × 2 modes | Node.js Edit tool only (NEVER Python for .js) | all 38 files saved |
| **5** | Validation | 7-validator chain | `npm run content:lint -- --week N --errors-only`; `npm run dict:lint`; `bug_prevention_check.sh`; `code_quality_gate.sh`; `validate_sgmath_types.mjs N`; `validate_barmodels.js N`; `validate_video_thumbnails.js N` | all PASS or SKIP |
| **6** | Audio | **NO batch** | (on-demand — first user play triggers Deepgram Worker → R2 cache) | n/a |
| **7** | Images | Resume-safe pipeline | `node tools/image_pipeline/orchestrator.mjs --week N` | orchestrator reports complete |
| **8** | Shadowing transcripts | Only if new video | `fetch_video_transcripts.js --only N` → `clean_transcripts.mjs` → `split_transcripts.py` | `src/data/video_transcripts_by_id/cleaned/<videoId>.json` |
| **9** | Build | Build app | `rm -rf node_modules/.vite dist && npm run build` | exits 0 |
| **10** | Browser test | Manual smoke | `npm run dev` → navigate W_NN → check all stations load | zero render errors |
| **11** | Commit | Git commit + push | `git add src/data/weeks/week_NN/ src/data/weeks_easy/week_NN/ src/data/weeks/week_NN_real.js`; `git commit -m "feat(content): week N ADV + Easy — [topic]"` | commit succeeds |

**Expected file count post-BƯỚC 4:** 19 ADV + 19 Easy + 1 AI Tutor = **39 files** (W36+ era).

---

## 3. Golden Standards & Cloning Strategy

### 3.1 Golden standard eras (current)
| Week range | Golden standard | File count | Notes |
|---|---|---|---|
| W1–W15 | `src/data/weeks/week_06/` + `weeks_easy/week_06/` | 15 files | pre-W16 era, single read.js, simpler stations |
| W16–W35 | `src/data/weeks/week_16/` + `weeks_easy/week_16/` | 19 files | single read.js, no social_quiz, no dual-tab |
| **W36+** | **`src/data/weeks/week_36/` + `weeks_easy/week_36/`** | **19 files + dual-tab read + social_quiz** | current golden standard |

### 3.2 AI Tutor golden standard
- `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` rule "B6" mandates `src/data/weeks/week_NN/week_NN_real.js` (inside subfolder)
- `week-builder/SKILL.md` BƯỚC 0 step 9 still clones to `src/data/weeks/week_NN_real.js` (root) — **CONTRADICTION**
- The newer never-rule wins by precedence (W28 incident); BƯỚC 0 step 9 in week-builder SKILL.md should be patched.

### 3.3 Schema version markers
| Era | Schema markers in real.js |
|---|---|
| W7 | legacy (`.PERSONA`, single `pacing`) |
| W34 | legacy mass production |
| W35 V28 | `nova_instructions`, `v28_format_notes`, `chunk_focus[]`, `story_missions[]` |
| W36 V28 | `chunk_focus[]`, `spark_talk{}`, `knowledge_base` (free-talk) — shorter, less `story_missions` content |

### 3.4 W36 has BOTH legacy read format AND new dual-tab
W36 `read.js` contains:
- Legacy flat: `content_en`, `sentences[]`
- New dual-tab: `read_stem{}`, `read_social{}`

The runtime `TabbedReadExplore.jsx` (per CHECK 10 source: `src/components/ReadExplore/`) reads `read_stem` + `read_social`. The legacy flat fields exist for backward compat with W16–W35 components (and the content:lint CHECK 43 still reads `content_en`).

---

## 4. Station-by-Station Reverse-Engineering

For every station: **Purpose / Inputs / Outputs / Dependencies / Schema (verbatim from W36) / Generation / Validation / Cross-station / Media / Future**.

### 4.1 New Words (`vocab.js`)

**Purpose:** Vocabulary acquisition with pronunciation, IPA, picture, example sentence, collocations.

**Inputs (schema, W36 ADV):**
```js
{
  vocab: [
    { id: 1, word: 'submarine', pronunciation: '/ˈsʌbməriːn/',
      definition_vi: 'tau ngam', definition_en: 'a special ship that can travel underwater',
      example: 'The submarine dove deep into the ocean.',
      collocation: 'submarine trip / underwater',
      image_url: '/images/week36/vocab_submarine.jpg',
      audio_word: '/audio/week36/vocab_submarine.mp3' },
    // ... 18 items total (W28+ standard)
  ]
}
```
W35 ADV uses legacy shape: `{ title, theme, vocab: [{ id, word, pronunciation, meaning_vi, part_of_speech, example_en, example_vi, collocation, image_url }] }`.

**Outputs:** Consumed by `NewWords.jsx`, also feeds `word_power.js`, `ask_ai.js`, `weekData.global_vocab`, dictionary cross-reference.

**Cross-station dependencies:**
- `vocab.js` `vocab[]` → `index.js` `global_vocab`
- Vocab words appear in `read.js` content (≥50% mandatory — CHECK 36)
- Vocab words appear in `read.js` bold chunks (chunk-first — CHECK 20c)
- Vocab image references must exist on disk (CHECK 32)
- Vocab count must match ADV↔Easy (CHECK 35)
- Vocab `audio_word/definition/example/collocation` schema mandatory (CHECK 44)

**Content rules:**
- W1–W15: ≥10 words; W16–W27: 13; W28+: exactly **18** (Easy matches ADV)
- `definition_vi` mandatory; `definition_en` strongly recommended
- `collocation` must be a proper collocation (CHECK 45 rejects `body part + bare 'hurt'`, `grandmother + write` cross-contamination)
- No `audio_def`, `audio_coll`, `audio_url` (legacy schema) — CHECK 44
- IPA transcribed in pronunciation field; rendered via `ipaUtils.js`

**Media classification:**
- `image_url`: **PROMPT ONLY** — generated via `image_pipeline/orchestrator.mjs` (Gemini 2.5 Flash default, FLUX/SD3 alt) → `/images/weekN/vocab_<word>.jpg` → uploaded to R2 `engquest-images` bucket
- `audio_word`: **ON-DEMAND** — first play via Deepgram Worker → R2 cache
- Pronunciation field stored as text, no audio

**Definition of Done:**
1. 18 words, all have `definition_vi` + `definition_en` + `example` + `image_url` + `audio_word`
2. Easy count = ADV count
3. ≥50% appear in read.js (CHECK 36)
4. All image files exist on disk (CHECK 32)
5. Image filenames match `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt` (CHECK 23c)
6. No `audio_def` / `audio_coll` / `audio_url` schema drift (CHECK 44)
7. Collocations pass CHECK 45
8. `npm run content:lint` no errors

---

### 4.2 Word Power (`word_power.js`)

**Purpose:** Phrasal verb / collocation power cards. 8 multi-word phrases per card (word, definition, example, model sentence, audio for each).

**Inputs (schema, W36 ADV):**
```js
{
  title: "Word Power: Adventure Stories",
  audio_url: null,
  words: [
    { id: 1, word: 'wrote down', pronunciation: '/roʊt daʊn/',
      cefr_level: 'A2',
      definition_en: 'to record something by writing it',
      definition_vi: 'ghi lai',
      example: 'We wrote down everything we found.',
      collocation: 'wrote down / take notes',
      model_sentence: 'We wrote down our findings in the notebook.',
      image_url: '/images/week36/wp_wrote_down.jpg',
      audio_word: '/audio/week36/wordpower_w1_word.mp3',
      audio_definition: '/audio/week36/wordpower_w1_def.mp3',
      audio_example: '/audio/week36/wordpower_w1_example.mp3',
      audio_collocation: '/audio/week36/wordpower_w1_collocation.mp3',
      audio_model: '/audio/week36/wordpower_w1_model.mp3' },
    // 8 items
  ]
}
```

**Cross-station dependencies:**
- Words are multi-word phrases only (CHECK 20 — single-word entries rejected)
- W28+: must be exactly 8 items (CHECK 20)
- Each item: 5 audio slots × 8 items = 40 audio requests on first play

**Content rules:**
- W16–W27: exactly 6; W28+: exactly 8
- Each `word` MUST be multi-word (contain space) — no single-word entries
- All 5 audio types per item

**Media classification:**
- `image_url`: **PROMPT ONLY** (orchestrator)
- 5 audio slots per item: **ON-DEMAND** (Deepgram Worker)

**Definition of Done:**
1. Exactly 8 (W28+) or 6 (W16–W27) items
2. Every word is multi-word phrase
3. Every item has 5 audio refs

---

### 4.3 Grammar (`grammar.js`)

**Purpose:** Grammar drills — MUST / SHOULD / CAN (W35), Irregular Verbs (W36), etc. Exactly 20 exercises.

**Inputs (schema, W36 ADV):**
```js
{
  title: "Irregular Verbs — Advanced",
  theme: "adventure_stories",
  rule: {
    en: "Use these 5 irregular verbs: go→went, see→saw, take→took, come→came, find→found.",
    vi: "..."
  },
  exercises: [
    { id: 1, type: "fill_blank", question_en: "Marco ___ to the Silk Road in the 1200s.",
      answer: "went", hint: "irregular past of 'go' (past time)" },
    { id: 2, type: "unscramble", question_en: "Unscramble the words:", words: ["I", "went", "on", "an", "adventure"], answer: "I went on an adventure." },
    { id: 3, type: "multiple_choice", question_en: "Choose the correct past of 'see':", options: ['a','b','c'], answer: 'b' },
    // ...exactly 20
  ]
}
```

**Cross-station dependencies:**
- `answer:` field (not `correct:` — CHECK BUG-B7)
- `words:` array on unscramble (not `[w1/w2/w3]` inline)
- `question_en` for ADV; `sentence` for Easy (CHECK C-19.5 + W33 audit)
- Grammar focus appears in AI Tutor `grammar_focus` field

**Content rules:**
- Exactly 20 exercises per mode (BUG-W28-A → CHECK 20b + CHECK 27 enforce)
- All `answer:` not `correct:` (BUG-B7)
- No `answer: ""` (BUG-B8)
- Unscramble must have `words:` array (BUG-B9)
- No slash-string answers (BUG-32)
- `hints` must be `hint_en`/`hint_vi` strings (singapore_math rule mirrors)
- No curly quotes (BUG-B10)

**Media classification:** NO MEDIA (text only — audio played separately from vocabulary list).

**Definition of Done:**
1. Exactly 20 exercises both modes
2. All using `answer:` not `correct:`
3. Unscramble has `words: []`
4. `npm run content:lint` PASS

---

### 4.4 Read (`read.js`) — **DUAL-TAB from W36**

**Purpose:** Main reading station. W36+ uses **dual-tab** (STEM + Social Studies). W1–W35 use single tab.

**Inputs (schema, W36 ADV):**
```js
export default {
  content_en: "...",            // legacy single-tab, used for backward compat + content:lint CHECK 43
  sentences: [ { id, text } ],  // legacy sentence array for content:lint + dictation/shadowing alignment
  read_stem: {                  // NEW (W36+): STEM tab
    title_en: "...", subtitle_en: "...", image_url: "...", audio_url: "...",
    content_en: "**...**", content_vi: "...",
    key_vocabulary: [ { word, definition, example } ],
    comprehension_questions: [
      { id, question_en, answer: [...], clue_statement, hint_en, hint_vi, audio_url }
    ]
  },
  read_social: {                // NEW (W36+): Social Studies tab
    title_en: "...", subtitle_en: "...", image_url: "...", audio_url: "...",
    content_en: "**...**", content_vi: "...",
    key_vocabulary: [...],
    comprehension_questions: [...]
  }
}
```

**Cross-station dependencies:**
- W1–W16: 3 comprehension questions; W17+: 4 questions (CHECK B25 + CHECK 11 questions)
- Each comprehension MUST have: `answer[]` (array, ≥2 entries), `clue_statement`, `hint_en`, `hint_vi`
- Bold chunks: W1–W15 ≥10 multi-word chunks; W16+ ≥13 chunks (CHECK 20c)
- dictation.js / shadowing.js sentences[] MUST be selected subsets from read.js (W28+: 10–12 ADV / 8–10 Easy — CHECK B22)
- dictation.js `content_en` MUST exactly equal read.js `content_en` (CHECK 42, Python script in code_quality_gate)
- Grammar focus must appear (≥3 -ed forms for past-tense weeks — CHECK 38)
- ≥50% of vocab words used in read.js (CHECK 36)

**Content rules:**
- Chunk-first authoring (Blueprint §VII.b): single-word bold = 0 for ALL weeks
- Canonical-longest bold policy (W36+ NEW CONTENT ONLY): when chunk has variants, bold the longest
- content_vi must NOT have any `**bold**` markers (CHECK 20i, CHECK 46)
- NO doubled modifiers (`very very tall`, `big big lion`) — CHECK 20e
- NO forced unnatural chunks (`kind chef`, `friendly artist`) — CHECK 20e
- NO redundant chunk + standalone word in same sentence — CHECK 20f
- NO verb+adverb masquerading as chunk (`**sing happily**`) — CHECK 20g
- NO whole sentences/clauses bolded (6+ words) — CHECK 20h

**Media classification:**
- `content_en.bolded` UI render: NO MEDIA
- `audio_url` per tab: **ON-DEMAND** (Deepgram Worker)
- `image_url` per tab cover: **PROMPT ONLY** (orchestrator)
- Vocab words link to dictionary (HoverWord component) via `src/data/dictionary.json`

**Definition of Done:**
1. W36+: BOTH `read_stem` and `read_social` populated
2. 4 comprehension questions each with full scaffolding
3. ≥10 multi-word bold chunks (W1–W15), ≥13 (W16+)
4. 0 single-word bolds
5. No unnatural patterns (CHECK 20e–h)
6. content_vi has no bold markers
7. CHECK 42: dictation + shadowing sentences all substring of read.js

---

### 4.5 Dictation (`dictation.js`)

**Purpose:** Listen-and-write sentence practice.

**Inputs (schema, W36 ADV):**
```js
export default {
  content_en: "Last summer... (verbatim from read.js, with **bold**)",
  sentences: [
    { id: 1, text: "Last summer, my family and I went on a submarine adventure.",
      meaning: "Vietnamese meaning here" },   // <-- W36 has literal placeholder!
    // ...10 items (W28+ ADV)
  ]
}
```

**Cross-station dependencies:**
- W28+: 10–12 sentences (ADV), 8–10 (Easy) — CHECK B22
- Each sentence MUST be a substring of read.js `content_en` (after `**` strip) — CHECK 42
- `content_en` field MUST equal read.js `content_en` character-for-character — CHECK 42
- Bold chunks OK in sentences[] since CHECK 42 strips before matching

**Content rules:**
- `**bold**` ALLOWED (CHECK 42 + B1 was disabled W28+) — TTS pipeline strips before API
- `meaning` field: SHOULD contain actual Vietnamese translation (W36 has placeholder "Vietnamese meaning here" — KNOWN DEFECT, no validator enforces it)
- Min sentences: 8 (Easy) / 10 (ADV) — CHECK B22
- Max sentences: 10 (Easy) / 12 (ADV) — CHECK B22

**Media classification:**
- `audio_url` per sentence: **ON-DEMAND** (first play triggers Deepgram Worker)
- `**bold**` markers: stripped at TTS time

**Definition of Done:**
1. 10–12 sentences (W28+ ADV), 8–10 (Easy)
2. All sentences verbatim substrings of read.js content_en
3. content_en exactly matches read.js content_en

**⚠️ KNOWN DEFECT (W36):** `meaning` field has literal placeholder `"Vietnamese meaning here"` — no validator checks this. Should be real Vietnamese translation.

---

### 4.6 Shadowing (`shadowing.js` + `shadowing_ipa.js`)

**Purpose:** Read-after-me shadowing practice with optional YouTube native video + karaoke word highlighting + IPA reference.

This is by far the most complex station. See **§5** for the full deep-dive.

**Inputs (schema, W36 ADV):**
```js
// shadowing.js
export default {
  videoId: 'Rlmms56uisw',         // YouTube ID for native shadowing (optional)
  content_en: "Last summer... (verbatim from read.js)",
  script: [
    { id: 1, text: 'Last summer...', vi: 'Mùa hè năm ngoái, ...' },
    { id: 2, text: 'We dove down...', vi: 'Chúng tôi lặn xuống...' },
    // ...12 sentences
  ]
}

// shadowing_ipa.js (separate file)
export default {
  1: [ { word: 'Last', ipa: '/læst/', stress: 1 }, { word: 'summer,', ipa: '/ˈsʌmər/', stress: 1 }, ... ],
  2: [ ... ],
  // ...keyed by sentence id
}
```

**Media classification:** See §5 for full breakdown — YouTube video, audio, IPA, karaoke, transcripts.

---

### 4.7 Writing & Speak (`writing.js`)

**Purpose:** Sentence-frame guided writing with vocabulary scaffolding. W36 evolved schema with `model_sentence` + `story_prompts.picture_mode`.

**Inputs (schema, W36 ADV):**
```js
export default {
  title: "...",
  min_words: 45,             // W28+ ADV; Easy: 30
  min_sentences: 8,
  model_sentence: "Yesterday, I went on an exciting adventure. We dove down 300 metres...",
  topic_talk_prompt: "Tell me about an adventure...",
  sentence_frames: [
    { template: "...___...", answers: ["word"] },
    // 8 frames (W28+)
  ],
  hints: {
    vocabulary_bank: {
      label_en: "...", label_vi: "...",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { word: "...", vi: "...", distractor: false },
        { word: "...", vi: "...", distractor: true },
        // ...
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/weekN/story_writing_pic.jpg',
      image_prompt: "I have a friend... watercolor children book illustration style, no text on image.",
      word_bank: ["..."],
      sentence_frames: [...],
      writing_prompts: { en: "...", vi: "..." },
      rubric_tier: 1
    }
  }
}
```

**Cross-station dependencies:**
- `model_sentence` MUST be ≥200 chars, ≥45 words, ≥6 sentences (CHECK 19)
- `min_words` ADV=45, Easy=30 (CLAUDE.md §Writing Station)
- 8 sentence frames (ADV) / 6–7 (Easy)
- Each ADV frame: `template` + `answers[]` (array, ≥1)
- Each Easy frame: `template` + `blank_labels[]`
- 1–4 blanks per frame (ADV); 2–3 (Easy)
- `hints.vocabulary_bank`, `scaffolding_stage`, `show_by_default` required

**Content rules:**
- image_prompt is a STRING — runtime caller generates from it
- DO NOT generate images directly — agent only writes the prompt
- `distractor: true` words are visual distractors (1–3 per bank)

**Media classification:**
- `model_sentence`: NO MEDIA (text)
- `image_url` for story_prompts.picture_mode: **PROMPT ONLY** — generator feeds `image_prompt` to image_pipeline orchestrator with special `style: "watercolor children book"` parameter
- `topic_talk_prompt`: AI Tutor audio (on-demand)

**Definition of Done:**
1. `model_sentence` ≥200 chars, ≥45 words, ≥6 sentences
2. ADV: 8 frames; Easy: 6–7 frames
3. Each frame has `answers[]` (ADV) or `blank_labels[]` (Easy)
4. `image_prompt` is a well-formed string (style hints included)
5. `vocabulary_bank.show_by_default` is explicit

**⚠️ KNOWN DEFECT (W35):** `writing.js` content is for "Max's Big Change" (personal_growth theme) — NOT W35's Environmental Issues theme. Cross-week contamination (probably from W34 clone).

---

### 4.8 AI Tutor (`week_NN_real.js`)

**Purpose:** Storytelling mission with Spark Talk. **V28 format** since ~May 2026.

**Inputs (schema, W36 ADV — minimal V28):**
```js
const week36RealData = {
  week_id: 36, week_number: 36,
  title: "Adventure Stories",
  weekTitle_en, weekTitle_vi,
  topic: "...", topic_vi: "...",
  theme: "adventure_stories",
  grammar_focus: "Irregular Verbs (...)",
  grammar_pattern: "I went to... We saw... He took...",
  grammar_examples: [...],
  chunk_focus: [...],                   // 3-5 collocations/phrases
  target_vocab: [...],                  // IPA + vi definitions
  nova_instructions: {                  // W35 has full; W36 missing
    role, personality, language, correction_style, feedback
  },
  v28_format_notes: "...",              // W35 has; W36 missing
  story_missions: [                     // W35 has 3 missions; W36 missing
    { mission_id, id, title, theme, character, opening_narrative,
      story_arc: [ { phase, turns, phase_name, focus, goal, phase_questions: [...] } ],
      minimum_turns }
  ],
  spark_talk: {                         // both have
    opening_narrative: "...",
    frames: [ { id, text_en, text_vi } ]   // ≥8
  },
  freetalk_knowledge: "..."             // string empathy rule + contents (both have as `knowledge_base` in W36)
};
module.exports = week36RealData;       // CommonJS export (not ES default!)
```

**🚨 CRITICAL FINDING #1 — **Schema drift W35 vs W36** **:
W35 has full V28 schema (nova + v28_format_notes + 3 story_missions + spark_talk).
W36 has SHORTENED V28 (NO nova, NO v28_format_notes, NO story_missions) — only `spark_talk` + `knowledge_base`.
Both export CommonJS via `module.exports = ...` (NOT ES default).
W36 schema DOES NOT match CHECK 16 (`v28_format_notes` missing → CHECK 16 fail), but the Studio runtime ignores it because there are no story missions to bind.

**Cross-station dependencies:**
- `chunk_focus[]` should mirror multi-word chunks in `read.js` (W28+: 3-5 entries)
- `grammar_focus` should match `grammar.js` exercises
- `target_vocab` should mirror `vocab.js` vocab words
- AI Tutor empathy rule: NEVER "Great!" after negative event

**Content rules:**
- Empathy rule in `freetalk_knowledge`/`knowledge_base` mandatory
- `chunk_focus` 3-5 entries minimum
- `spark_talk.frames` ≥8
- Story Missions (if present) ≥3, each with ≥5 phase_questions

**Media classification:**
- All text / on-demand TTS — no static media
- Story Mission character may have headshot in B2B asset (optional, not in data file)

**Definition of Done (V28 full):**
1. `nova_instructions` + `v28_format_notes` present
2. `story_missions[]` length=3
3. `chunk_focus[]` length ≥3
4. `spark_talk.frames[]` length ≥8
5. `freetalk_knowledge` includes empathy contract
6. CHECK 16 (V28 schema completeness) passes
7. CHECK 29 (StoryMissionTab + FreeTalkTab import/ternary for week N) passes

---

### 4.9 Logic Lab — 3 sub-tabs (`logic_science.js` + `singapore_math.js` + `social_quiz.js`)

See `.ai/specs/LOGIC_LAB_SPEC.md` (authoritative spec v1.0 from 2026-07-14).

| Sub-tab | File | Question count | Schema |
|---|---|---|---|
| Logic & Science | `logic_science.js` | 5–8 (W36: 8 ADV / 5 Easy) | `{ title, theme, questions: [{ id, type: logic\|science, question_en, options[4], correct (string), explanation_en }] }` |
| Singapore Math | `singapore_math.js` | exactly 5 | `{ title, theme, problems: [{ id, type ∈ {part_whole,comparison,missing_part,groups,before_after}, question_en, bar_model (string path), answer (string[]), hint_en, hint_vi }] }` |
| Social Quiz | `social_quiz.js` | 5 ADV / 4 Easy (W36+) | `{ questions: [{ type, question_en, question_vn, options[4], correct (string), explanation, vocab:[] }] }` |

**🚨 CRITICAL FINDING #2 — Field name asymmetry**:
- Logic & Science uses `correct:` (string) — single answer
- Singapore Math uses `answer:` (string array)
- Social Quiz uses `correct:` (string) — single answer
- Grammar uses `answer:` (single string OR array depending on type)
- This is internally consistent but hard to remember — CHECK 16 + CHECK 18 validate asymmetry

**Cross-station dependencies:**
- Singapore Math `bar_model` image path is **AUTO-GENERATED** by `generate_logiclab_barmodels.py` (NOT in image_prompts.txt — CHECK 40)
- Bar model path format: `barmodel_w{NN}_{mode}_p{n}_v1.jpg`
- Bar model images uploaded to R2 `engquest-images` (CHECK 41)

**Media classification:**
- Singapore Math `bar_model`: **AUTO GENERATED** (Python PIL or PIL alternative — `generate_logiclab_barmodels.py`)
- Logic & Science: **NO MEDIA** (text only)
- Social Quiz: **NO MEDIA** (text only)

**Validation:**
- CHECK 18: Singapore Math answer must be string array, hint_en/hint_vi present, 5 problems
- CHECK 24b: bar model paths + files exist (via `validate_barmodels.js`)
- CHECK 24e: Singapore Math uses `problems:` not `questions:` (legacy field name)
- `validate_sgmath_types.mjs`: type names valid (5 types only)
- CHECK 19.5: logic_science has ≥3 question_en

---

### 4.10 Mindmap (`mindmap.js`)

**Purpose:** Grammar mind map with 6 stems × 6 branches for speaking practice. W36 uses evolved schema `centerStems[]` + `branchLabels{}` keyed by stem text.

**Inputs (schema, W36 ADV):**
```js
const mindMapContent = {
  centerStems: [
    { text: "...", type: "affirmative"|"negative"|"question", audio: "/audio/...mp3" },
    // 6 stems
  ],
  branchLabels: {
    "[exact stem text 1]": [
      { text: "...", audio: "/audio/...mp3" },
      // 6 branches
    ],
    // keyed for each of 6 stems
  }
};
export default mindMapContent;
```

**Cross-station dependencies:**
- 6 stems (2 affirmative + 2 negative + 2 question) — pending restructure May 23, 2026
- 6 branches per stem = 36 audio entries minimum (CHECK 21)
- `branchLabels` must be keyed by EXACT stem text (not category names like "weather:")
- All audio hashes must be unique (CHECK B13)

**Content rules:**
- Type field required on each stem (affirmative/negative/question) — pending
- Personal stems (`"I ___"` or `"My ___"`) ≥3 each (W2+) — NEVER RULES

**Media classification:**
- All audio: **ON-DEMAND** (Deepgram Worker)

**Definition of Done:**
1. 6 stems with `type` field
2. 6 branches per stem (36 audios total)
3. Unique audio hashes
4. `branchLabels` keyed by exact stem text

---

### 4.11 Daily Watch (`daily_watch.js`)

**Purpose:** YouTube video playlist. W36 has 5 videos + bonus games link.

**Inputs (schema, W36 ADV):**
```js
export default {
  videos: [
    { id: 1, title: "...", videoId: "...", duration: "MM:SS", sim_duration: 474,
      thumb: "https://img.youtube.com/vi/$id/mqdefault.jpg" },
    // 5 entries
  ],
  bonus_games: [{ title, url, description }]
};
```

**Video discovery pipeline (BƯỚC 2):**
1. `video_queries.json` per week defines `priority_search` + `backup_search` strings
2. `node tools/update_videos.js N --reset` → calls YouTube Data API → filters against 60-channel whitelist → writes daily_watch.js
3. `node tools/validate_video_thumbnails.js N` → HEAD-requests each thumbnail; fail if 404
4. `cp ADV daily_watch.js → Easy` (mirror)

**Media classification:**
- All videos: **EXTERNAL SEARCH** (YouTube Data API)
- thumbnails: auto-fetched from YouTube

**Definition of Done:**
1. Exactly 5 videos
2. All thumbnails 200 OK (CHECK 24c + validate_video_thumbnails.js)
3. Video IDs unique (CHECK 23)
4. No duplicate IDs from previous week (CHECK 33)
5. video_tasks.json has entries for week N (CHECK 24)

---

### 4.12 Ask AI (`ask_ai.js`)

**Purpose:** Conversation cards with sentence frames. Sentence starter + word bank + correctWord.

**Inputs (schema, W36 ADV):**
```js
export default {
  prompts: [
    {
      nova_says: "...", nova_says_vi: "...",
      context_en: "...",
      question_word_bank: ["When did", "How long did", "Where did", "Why did"],  // exactly 4 (W28+)
      question_frame: "___ Marco Polo go?",        // MUST start with ___
      correctWord: "When did"                       // MUST be UPPERCASE (CHECK B24)
    },
    // 5 prompts
  ]
}
```

**Cross-station dependencies:**
- W28+: exactly 4 items in `question_word_bank` (CHECK 19.5b)
- `question_frame` MUST start with `___` (CHECK 19.5c)
- `correctWord` MUST be UPPERCASE (CHECK B24)
- NO legacy fields `prompt_en`, `prompt_vi`, `hint_en`, `topic_talk` (CHECK B15)

**Media classification:** NO MEDIA (text + AI audio on-demand).

**Definition of Done:**
1. ≥5 prompts
2. Every prompt has `nova_says/vi`, `context_en`, `question_word_bank[4]`, `question_frame` (starts with `___`), `correctWord` UPPERCASE
3. No legacy fields

---

### 4.13 Word Match (`word_match.js`)

**Purpose:** Pair words with definitions.

**Inputs (schema, W36 ADV — see CHECK 5):**
```js
export default {
  pairs: [
    { word: 'kick', definition: 'to hit with your foot' },
    { word: 'cave', definition: 'a large hole in rock' },
  ]
}
```

**Content rules:**
- W36 ADV likely uses object pairs (CHECK 5 verifies `pairs: [1, 2, 3]` is BAD)
- CHECK 5: pair values must be objects, not bare numbers

**Media classification:** NO MEDIA (text).

**Definition of Done:**
1. `pairs[]` are objects with `word` + `definition`

---

### 4.14 Games (`games.js`)

**Purpose:** Per-week game variants. W28–W32+ format.

**Inputs (schema, W36 ADV):**
```js
export const week_36GamesAdvanced = {        // NAMED export (not default!)
  title: "Games: Adventure Stories",
  image_url: null,
  audio_url: "/audio/week36/games_main.mp3",
  games: [
    { id: "adventure_categories", type: "categories", title: "...",
      instructions_easy, instructions_advanced, categories: [...], sentences: [...] },
    { id: "adventure_word_smash", type: "word_smash", title: "...",
      word_list: ["submarine", "cave", ...] },
    { id: "adventure_scramble", type: "sentence_scramble", title: "...",
      sentences: [...] }
  ]
};
```

**🚨 CRITICAL FINDING #3 — `games.js` uses NAMED export** while ALL other week files use `export default {...}`. W36 `index.js` has to import it as: `import { week_36GamesAdvanced as games } from './games.js';`

**Cross-station dependencies:**
- `gameAdaptation.js` must have `import week_36GamesAdvanced` + `week_36GamesEasy` + `weekGamesMap` entry (CHECK 28)
- W28+ format: `show_tell`, `make_sentence`, `ask_me` (CHECK 30)
- No `detail_map`, `emoji_map`, `distractor_map` (W16 deprecated, CHECK 30)
- ≥10 answer entries across make_sentence + ask_me (CHECK 30)

**Media classification:**
- `image_url`: optional, NO MEDIA or PROMPT ONLY
- `audio_url`: ON-DEMAND

**Definition of Done:**
1. W28+ format (no detail_map/emoji_map/distractor_map)
2. ≥10 `answer:` entries
3. Imported in `gameAdaptation.js`
4. Named export `week_NNGamesAdvanced` (and Easy counterpart)

---

### 4.15 Station Registry (`index.js`)

**Purpose:** Single aggregator that imports all 19 station files and assembles `weekData` for runtime.

**Inputs (schema, W36 ADV — verified):**
```js
import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
// ... 19 imports total
import { week_36GamesAdvanced as games } from './games.js';

const weekData = {
  weekId: 36,
  isEasy: false,
  weekTitle_en, weekTitle_vi,
  grammar_focus,
  global_vocab: vocab.vocab,
  voiceConfig: {                        // 7 keys (CHECK 12 says 6 — discrepancy!)
    narration, vocabulary, dictation, shadowing, questions, mindmap, logic_lab
  },
  stations: {
    read_explore: { read_stem: read.read_stem, read_social: read.read_social },
    new_words: vocab,
    word_match,
    grammar,
    word_power,
    ask_ai,
    logic_lab: { logic_lab, singapore_math, social_quiz },   // object with 3 sub-tabs
    dictation,
    shadowing,
    writing,
    explore,
    mindmap_speaking: mindmap,
    daily_watch,
    game_hub: games
  }
};
export default weekData;
```

**Cross-station dependencies:**
- W36+ uses 14 station keys + dual-tab read structure (CHECK 13)
- voiceConfig has 7 keys (CHECK 12 header says 6 but the file has 7 — minor inconsistency)
- weekId matches week N (CHECK 14)
- Audio/image paths use week_NN (CHECK 15, no stale W36)
- daily_watch imported + stations{} wired (CHECK 24d)

**🚨 CRITICAL FINDING #4 — voiceConfig key count mismatch**:
- CHECK 12 in `code_quality_gate.sh` requires 6 keys: `narration / vocabulary / dictation / shadowing / questions / mindmap`
- W36 `index.js` has 7 keys: adds `logic_lab: 'en-US-Neural2-B'`
- CHECK 12 passes (because the 6 keys it checks are all present), but the missing key enum length is inconsistent

---

## 5. DEEP DIVE: Shadowing — The Most Complex Station

The previous session's drafts apparently **underestimated** Shadowing complexity. Per user instruction, this section inspects the real implementation.

### 5.1 Two files per week
- `shadowing.js` — clean script + speech window metadata
- `shadowing_ipa.js` — IPA per-word transcription keyed by sentence id

Runtime modules:
- `src/modules/shadowing/Shadowing.jsx` (47K — main station component)
- `src/modules/shadowing/transcriptAligner.js` — matches script.js to raw YouTube segments
- `src/modules/shadowing/transcriptUtils.js` — transcript loading via Vite `import.meta.glob`
- `src/modules/shadowing/ipaUtils.js` — IPA rendering, US→UK conversion, CMU dict fallback
- `src/modules/shadowing/useWordHighlight.js` — karaoke word highlight
- `src/modules/shadowing/useTTSWordHighlight.js` — TTS-based word highlight
- `src/modules/shadowing/LeftPanel.jsx` / `RightPanel.jsx` / `SentenceCard.jsx` — UI
- `src/modules/shadowing/YouTubeEmbed.jsx` — YouTube player
- `src/modules/shadowing/FloatingVideoWindow.jsx` — pop-out video

### 5.2 Schema (real, W36 ADV)
```js
// shadowing.js
export default {
  videoId: 'Rlmms56uisw',                            // YouTube ID for native shadowing (optional, W28+)
  content_en: "Last summer, my family...",            // VERBATIM copy of read.js content_en (CHECK 42)
  script: [
    { id: 1, text: 'Last summer, my family and I went on a submarine adventure.',
      vi: 'Mùa hè năm ngoái, gia đình tôi đi phiêu lưu bằng tàu ngầm.' },
    { id: 2, text: 'We dove down 300 metres into the deep ocean.',
      vi: 'Chúng tôi lặn xuống 300 mét dưới đáy đại dương.' },
    // ...12 sentences (W36 ADV)
  ]
}
```

### 5.3 IPA Schema (real, W36 ADV)
```js
// shadowing_ipa.js
export default {
  1: [                                                 // keyed by sentence id (string or number)
    { word: 'Last',   ipa: '/læst/',       stress: 1 },  // 0=unstressed, 1=primary, 2=secondary
    { word: 'summer,',ipa: '/ˈsʌmər/',     stress: 1 },
    { word: 'my',     ipa: '/maɪ/',        stress: 1 },
    { word: 'family', ipa: '/ˈfæməli/',    stress: 1 },
    // ... per-word IPA for sentence 1
  ],
  2: [...], 3: [...], // ...
}
```

**Note:** W36 ADV IPA is INCOMPLETE — only 6 of 12 sentences have IPA entries (sentences 5–12 missing). W35 ADV has IPA for all 30 sentences.

### 5.4 IPA generation pipeline
1. **Manual hand-typed IPA** for benchmark sentences (golden standard)
2. **Auto-generation via CMU dict** (`src/data/cmudict.json` — 3.9MB bundled) — when user clicks word highlight + transcript mode
3. **US→UK IPA conversion** (`ipaUtils.js` usToUkIpa): Rhoticity, flapped /t/, vowel shifts
4. **Function-word stress override** (FUNCTION_WORDS set in ipaUtils.js): force stress=0 for `the`, `a`, `to`, etc.
5. **Stress colors** (ipaUtils.js STRESS_COLORS): gray (0) / red (1) / blue (2)

### 5.5 Karaoke Highlighting Architecture

**Timing model:**
- **Source**: YouTube IFrame API `getCurrentTime()` returns VIDEO TIME (not real-time)
- **Highlight window**: `FAST_RATE = 0.4s per word` (2.5 wps, fixed for ALL sentences)
- Speech window per sentence: `[start, start + 0.4 * wordCount]`
- Word pacing within sentence: `wordDur = FAST_RATE * wordCount / words.length` (evenly distributed)
- Active word: `word.start <= t < word.end` (with ±0.1s tolerance for overlap)

**Why FAST_RATE not raw ASR duration:**
> ASR captions pad each segment with pre/post silence (e.g. "I don't know." 4.84s total for what is really ~1.5s of speech). If we used raw duration, the highlight would "lag" the audio. The fix uses fixed 0.4s/word to ensure highlight LEADS the audio (snappy UX).

**Two highlight sources**:
1. **TTS mode** (`useTTSWordHighlight.js`): when student uses app's own TTS, word boundary is matched against TTS progress events
2. **Transcript source mode** (`useWordHighlight.js`): when student uses YouTube video, word boundary is matched against video currentTime + sentence start from raw/cleaned transcripts

**Synchronization:**
- Both modes use `requestAnimationFrame` (60fps) for the karaoke fill bar
- Visual mode rAF: `rafId = requestAnimationFrame(tick)`
- Sentence `start`/`end` come from `getActiveSegment()` (transcriptUtils.js)

**Validation:** No validator currently checks that FAST_RATE constant matches syllable count. Magic number but documented in code comment.

### 5.6 Native Shadowing Pipeline (YouTube Discovery)

**Files involved:**
- `src/data/video_queries.json` — query templates per week
- `src/data/curated_transcripts.json` — 39KB of manual transcript overrides (high-quality ground truth)
- `src/data/video_transcripts_by_id/{cleaned,sentences,raw}/<videoId>.json` — auto-fetched per video
- `tools/fetch_video_transcripts.js` — Stage 1 (raw ASR fetch)
- `tools/clean_transcripts.mjs` — Stage 2 (ASR cleanup + curated overrides merge)
- `tools/split_transcripts.py` — Stage 3 (split monolithic → per-video files)

**Video search query generation:**
- `video_queries.json` per week has `priority_search` + `backup_search` strings
- `update_videos.js` calls YouTube Data API search.list
- Filters against 60-channel whitelist
- Returns up to 10 candidates; validates thumbnails; picks 5

**Selection criteria** (per `tools/update_videos.js` heuristics):
- Topic relevance (keyword match against weekly theme)
- Grammar relevance (verb tense, modal verbs) — checked against title + description
- CEFR relevance (target age range)
- Channel whitelist (educational channels only — no random YouTubers)
- Duration 1–8 minutes (suitable for shadowing)

**Transcript extraction:**
- `youtube-transcript` npm package (Stage 1)
- Raw ASR has errors: missing punctuation, "Im" instead of "I'm", "D hey" instead of "Hey"
- `cleanRawTranscript()` in `transcriptAligner.js` patches common ASR errors with regex set
- `transcriptUtils.js` filters segments where `wordsPerSecond < 0.3` (likely subtitle artifacts)

**Sentence alignment** (`transcriptAligner.js`):
- For each shadowing script sentence, consume raw transcript segments until word count matches
- Use `wordOverlap()` (Jaccard on words >2 chars) to confirm alignment
- Returns aligned segments with `start`, `duration`, `text` (cleaned), `vi` (script text), `_isTranscript: true`

**Transcript validation:**
- `getCleanedTranscriptSentences()` filters empty / too-slow segments
- Threshold: `wps < 0.3` → skip (subtitle artifact)

**Timing generation:**
- Word boundaries INSIDE a transcript sentence are NOT generated per-word — runtime uses the fixed FAST_RATE scheme
- Sentence boundaries come from raw/cleaned transcript JSON

### 5.7 Shadowing Assets (Production Requirements)

| Asset | Source | Storage | Consumer |
|---|---|---|---|
| `videoId` (11-char) | YouTube search → whitelist | data/shadowing.js | YouTubeEmbed.jsx |
| `content_en` text | Verbatim copy from read.js | data/shadowing.js | TTS, UI |
| `script[].text` (sentence text) | Subset from read.js | data/shadowing.js | TTS per sentence |
| `script[].vi` (Vietnamese) | Manual translation | data/shadowing.js | UI bilingual display |
| IPA per word | Manual + CMU auto | data/shadowing_ipa.js | ipaUtils.js → UI |
| YouTube thumbnail | auto (YouTube CDN) | runtime-fetched | UI |
| YouTube transcript (raw) | youtube-transcript npm | video_transcripts_by_id/raw/<id>.json | transcriptUtils.js |
| YouTube transcript (cleaned) | clean_transcripts.mjs | video_transcripts_by_id/cleaned/<id>.json | transcriptUtils.js |
| YouTube transcript (sentences) | split_transcripts.py | video_transcripts_by_id/sentences/<id>.json | transcriptUtils.js |
| Manual overrides (39KB) | Authoring | curated_transcripts.json | clean_transcripts.mjs merge step |
| Voice config | `index.js` voiceConfig.shadowing | index.js | voiceService.js |
| Per-sentence audio (TTS) | Deepgram Worker on-demand | R2 `engquest-audio/audio/weekN/shadowing_*.mp3` | voiceService.js |

### 5.8 Shadowing Schema — Field-by-field

| Field | Type | Required | Source | Purpose |
|---|---|---|---|---|
| `videoId` | string (11-char YouTube ID) | optional for Easy | video pipeline | native shadowing |
| `content_en` | string | mandatory | verbatim from read.js | TTS line |
| `script[]` | array of sentence objects | mandatory | manual authoring | rendering loop |
| `script[].id` | integer, sequential | mandatory | manual | React key, alignment |
| `script[].text` | string | mandatory | verbatim from read.js | display, TTS |
| `script[].vi` | string | mandatory | manual translation | bilingual UI |
| `shadowing_ipa.js{}` keys | integer or string | mandatory | manual or CMU | IPA per sentence |
| entry `word` | string | mandatory | tokens of script[].text | per-word IPA |
| entry `ipa` | string (IPA notation) | mandatory | CMU or manual | pronunciation display |
| entry `stress` | 0/1/2 | mandatory | CMU + function-word override | stress visualization |

### 5.9 Shadowing Production Workflow

```
Weekly authoring:
1. Write read.js content_en with chunk bolds
2. Select 10-12 chunk-rich sentences → shadowing.js sentences[] (W28+ ADV)
3. Translate each sentence to Vietnamese (vi)
4. Write IPA per word (or auto from CMU + manual review)
5. Update video_queries.json with native shadowing video search terms
6. Run update_videos.js → fill videoId

First runtime load (per week):
7. fetch_video_transcripts.js → raw/<videoId>.json
8. clean_transcripts.mjs → cleaned/<videoId>.json (merges curated_transcripts.json)
9. split_transcripts.py → sentences/<videoId>.json
```

---

## 6. Media Pipeline Classification (consolidated)

| Asset | Pipeline | Classification | Trigger |
|---|---|---|---|
| Vocab images (word pictures) | image_pipeline/orchestrator.mjs | **PROMPT ONLY** | agent writes prompt in vocab.js → orchestrator runs |
| Word Power images | image_pipeline/orchestrator.mjs | **PROMPT ONLY** | agent writes prompt in word_power.js → orchestrator runs |
| Read tab covers | image_pipeline/orchestrator.mjs | **PROMPT ONLY** | read.js has `image_url` + prompt embedded (or as separate prompt file) |
| Explore cover | image_pipeline/orchestrator.mjs | **PROMPT ONLY** | explore.js has `image_url` |
| Writing story image | image_pipeline/orchestrator.mjs | **PROMPT ONLY** | writing.js `story_prompts.picture_mode.image_prompt` + `image_url` |
| Singapore Math bar models | generate_logiclab_barmodels.py | **AUTO GENERATED** (PIL/Pillow) | singapore_math.js has `bar_model` paths → Python script renders SVG/PNG |
| Daily Watch videos | tools/update_videos.js (YouTube Data API) | **EXTERNAL SEARCH** | video_queries.json queries → 60-channel whitelist |
| Daily Watch thumbnails | YouTube CDN | **AUTO GENERATED** (external) | `https://img.youtube.com/vi/<id>/mqdefault.jpg` |
| Vocab audio per word | Deepgram Worker + R2 | **ON-DEMAND** | first user play triggers Worker → caches in R2 |
| Reading audio (read tab) | Deepgram Worker + R2 | **ON-DEMAND** | first user play |
| Dictation sentence audio | Deepgram Worker + R2 | **ON-DEMAND** | first user play |
| Shadowing sentence audio | Deepgram Worker + R2 | **ON-DEMAND** | first user play |
| Shadowing IPA | Manual + CMU auto | **PROMPT ONLY (text)** + **AUTO GENERATED (fallback)** | manual entries in shadowing_ipa.js; CMU fallback at runtime |
| Shadowing native video | EXTERNAL SEARCH | YouTube embed (not hosted) | YouTubeEmbed.jsx |
| Shadowing transcripts | youtube-transcript + cleanup | **EXTERNAL SEARCH + AUTO GENERATED** | runtime-ready JSON files |
| Mindmap audio (36 stems) | Deepgram Worker + R2 | **ON-DEMAND** | first user play per branch |
| AI Tutor audio (L1 cache) | Deepgram Worker + R2 | **ON-DEMAND** | first user play |

**Key fact**: NO station pre-generates audio in CI. Audio is always on-demand, lazily cached to R2.

---

## 7. Validation Chain Architecture

### 7.1 The 7 validators (single source: content-check SKILL)

| # | Validator | Command | Scope | Coverage |
|---|---|---|---|---|
| 1 | content:lint | `npm run content:lint -- --week N --errors-only` | read.js, explore.js content quality | E-01..N-08 (15+ rules) |
| 2 | dict:lint | `npm run dict:lint -- --errors-only` | global dictionary | |
| 3 | bug_prevention_check.sh N | `bash production_kit/tools/bug_prevention_check.sh N` | 13 patterns (B5, B7, B8, B10, B11, B13, B15, B17, B22, B23, B24, B25) | |
| 4 | code_quality_gate.sh N | `bash production_kit/tools/code_quality_gate.sh N` | 48+ checks (CHECK 1 → CHECK 46 with renumbering) | |
| 5 | sgmath_types | `node production_kit/tools/validate_sgmath_types.mjs N` | Singapore Math type names | |
| 6 | barmodels | `node tools/validate_barmodels.js N` | bar model paths + files | |
| 7 | thumbnails | `node tools/validate_video_thumbnails.js N` | Daily Watch thumbnails | |

**Decision tree:**
- All PASS / valid SKIP → SHIP → commit
- Some FAIL → FIX-THEN-SHIP (max 3 cycles) → re-run failed validators only
- BLOCKER (never_rule violation) → STOP, surface immediately

### 7.2 Quality Gate Checks (code_quality_gate.sh)

**Code pattern (10 checks):** Image `getImageUrl()`, MindMap station, TTS architecture, image naming, word_match object pairs, Logic Lab bar_model, raw template literals, STATIC_STATIONS, LogicLab speakText, TabbedLogicLab + TabbedReadExplore getImageUrl()

**Data schema (6 checks):** ADV+Easy directories exist, voiceConfig keys, stations keys, weekId, paths no stale, AI Tutor V28

**Data content (8+ checks):** dictation shape, singapore_math schema, writing schema + model_sentence, core station schema (read/explore/ask_ai/shadowing/logic_science), word_power count + multi-word, grammar exactly 20, read.js bold-chunks ≥10/13 + 0 single-word, dictation sentence count = read.js, mindmap branchLabels + ≥36 audio, metadata real title

**Production readiness (4 checks):** daily_watch unique video IDs, video_tasks.json entries, image prompt files, cover images on disk

**Wiring (4 checks):** daily_watch wiring, singapore_math `problems` not `questions`, gameAdaptation.js, AI Tutor tabs (StoryMissionTab + FreeTalkTab), games.js W28+ format

**W22 cross-contamination (4 checks):** Easy vocab count = ADV, read.js uses ≥50% vocab, explore CLIL quality (≥8 bolds + ≥100 words), grammar tense consistency (-ed count for past)

**W23 FreeTalk/image/R2 (3 checks):** conversation_cards exchanges array, image_prompts no barmodel_, bar models on R2 CDN

**Dictionary (renumbered 39–41):** duplicate of W23 checks

**Content extraction (CHECK 42):** dictation/shadowing sentences verbatim from read.js (Python script — only Python in the gate)

**Cluster 43 (3 checks):** content:lint runs, vocab audio field names correct, vocab collocation quality, content_vi no multi-word bold, content_vi no **any** bold

**Additional bold checks (CHECK 20e–h):** unnatural chunk patterns, redundant chunk+standalone word, verb+adverb, whole-sentence bolded

**Total: ~48 active checks** (some renumbered e.g. 39–41 appear twice due to authoring history).

---

## 8. Hardcoded Assumptions & Hidden Conventions

Found via grep + reading validator code comments:

### 8.1 Voice config: 5 → 7 keys
- `index.js` voiceConfig has 5 keys in some weeks, 7 in W36 (`logic_lab` added)
- CHECK 12 requires only 6 keys → W36 passes but the missing-key enum is incomplete

### 8.2 Grammar: exactly 20 exercises
- Hardcoded in two places (CHECK 20b + CHECK 27) — backup validation
- BUG-W28-A (confidence 0.9): no exceptions

### 8.3 Grammar focus pattern matching in CHECK 38
- `echo "$GRAMMAR_FOCUS" | grep -qiE "past|simple past|-ed"` — only matches if string LITERALLY contains those tokens
- A future "Present Perfect Continuous" grammar focus won't be detected

### 8.4 Comprehension questions: 3 for W1-W16, 4 for W17+
- Hardcoded threshold in CHECK B25 + CHECK 11 questions
- W36 ADV has 4 stem + 4 social = 8 total — none of these checks span multiple read_*.js sub-files for comprehension question count

### 8.5 Singapore Math type names: hardcoded whitelist of 5
- `VALID_TYPES = Set('part_whole', 'comparison', 'missing_part', 'groups', 'before_after')`
- Silent fallback to `part_whole` if name not in list (no error, no warning — silent failure pattern)

### 8.6 Singapore Math: exactly 5 problems per mode
- validate_sgmath_types.mjs has WARNING for non-5 count but doesn't FAIL
- Could be relaxed in future

### 8.7 Chicago Citation IDs
- All week data files use `id` fields that are integers (1, 2, 3...)
- `comprehension_questions.id` are integers in W36 read.js (1-4)
- `dictation.sentences[].id` are integers
- `shadowing.script[].id` are integers OR strings — IPA keyed by ID type may break if ID is string in one file and int in another

### 8.8 Audio URL paths
- `/audio/week{NN}/...mp3` (no underscore) — but `public/images/week{NN}/` (no underscore)
- Pattern is `weekNN` zero-padded in path BUT requires `weekN` (no padding) for some tools (CHECK 26 image fix: `image_url must use w${WEEK_INT} (no zero-padding)`)

### 8.9 Bar model path format
- `barmodel_w{NN}_{mode}_p{n}_v1.jpg` — NO underscore between `week` and `{NN}`, but other paths have `week_{NN}/` with underscore
- Mixed convention is confusing — vault path uses bare `barmodel_w${WEEK_INT}` (no padding) but `singapore_math.js` references with padded `w36` (CHECK 24b requires this format)

### 8.10 AudioWorker caching
- `voiceService.js` CDN_WEEKS array caps pre-R2 audio (W1–W15 only)
- W16+ uses on-demand Worker + R2 caching — runtime never fails if R2 is down (Worker queues)
- CHECK 3 verifies the architecture mode is correct for week range

### 8.11 YouTube channel whitelist (60 channels)
- Hardcoded inside `tools/update_videos.js` (not part of data config)
- Cannot be customized per theme/region — single global list

### 8.12 HARD Magic numbers
- `FAST_RATE = 0.4` (s/word) for karaoke highlighting (`useWordHighlight.js`)
- `tolerance = 0.1s` for highlight window
- `wps < 0.3` filter for ASR segments
- IPA conversion phonetic rules in `US_TO_UK_RULES` (6 regex replacements)

### 8.13 DEFAULT vs NAMED exports inconsistency
- 18 of 19 station files use `export default {...}`
- `games.js` uses `export const week_NNGamesAdvanced = ...` (NAMED export)
- `week_XX_real.js` uses `module.exports = weekXXRealData` (CommonJS, NOT ES)
- Runtime has to do extra imports for both these

### 8.14 IPA keyed by ID type asymmetry
- `shadowing_ipa.js` keys can be integers (W36) OR string-numbered — runtime `loadIpaData()` reads keyed by integer
- If author writes `{ "1": [...] }` vs `{ 1: [...] }` they MUST match what `loadIpaData` expects

### 8.15 Audio on-demand Worker URL
- Hardcoded fallback `engquest-tts-worker.binhkhoi08.workers.dev/tts`
- Mirror'd in:
  - `voiceService.js` runtime
  - `Shadowing.jsx` corrections endpoint (`CORRECTIONS_API_BASE = import.meta.env.VITE_TTS_WORKER_URL`)
- No fallback if Worker is down

### 8.16 Daily Watch easy = Advanced copy
- BƯỚC 2 step 5: `cp ADV daily_watch.js → Easy`
- This was correct when both modes shared videos
- Future: should Easy have simpler/shorter videos? Not enforced

### 8.17 Read+Audio path conventions
- Some `read.js` use leading slash `/audio/...` (W35 ADV)
- Others don't (W36 uses `/audio/week36/...` with slash)
- Inconsistent but tolerated

### 8.18 Image orchestration magic strings
- Prompt files naming convention: `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt`
- Required format: `Filename: <name>` markers per line — exactly 26 lines for W<20, ≥21 for W20+

### 8.19 `version` of an example
- Image prompts file templates have magic keywords parsed by orchestrator (style hints)

---

## 9. Hidden Knowledge / Undocumented Conventions

Found via grep and code comments:

### 9.1 Bar model Canvas/Image generation
- `generate_logiclab_barmodels.py` — undocumented in any wiki. Uses PIL or SVG to draw bars based on singapore_math.js schema
- CPA stages are valid types: W17–W34 EASY=`concrete` (renders), W17–W34 ADV=`pictorial` (renders), W35+= only_rendered_when_type_specific (CHECK 24 + CLAUDE.md)
- `barmodel_w{NN}_adv_p{n}_v1.jpg` format MUST exist or CHECK 24b fails

### 9.2 Daily Watch Simulator
- `sim_duration` field on video objects (in seconds) — used by `DailyWatch.jsx` for offline preview
- Not all weeks have it populated (CHECK 33 only validates `videoId` uniqueness)

### 9.3 AI Tutor free-talk (`freetalk_knowledge` vs `knowledge_base`)
- W35 uses `freetalk_knowledge` field (older convention)
- W36 uses `knowledge_base` field (newer convention)
- CHECK B17 passes for either (just looks for the substring)
- Future Blueprint should clarify the canonical name

### 9.4 Shadowing IPA asymmetry W35 vs W36
- W35 ADV IPA has all 30 sentences populated
- W36 ADV IPA has only 6 sentences (1-6) — sentences 7-12 missing
- Runtime falls back to CMU dict for missing entries
- No validator checks IPA completeness

### 9.5 Writing rubric_tier
- W36 uses `rubric_tier: 1` — undocumented what tier 1, 2, 3 mean
- No validator or schema doc

### 9.6 Games.js has NO image_url default
- W36 has `image_url: null` — uses default

### 9.7 Schema markers inconsistent across eras
- W7 AI Tutor uses `phase_1_questions`, W16+ uses `phase_questions` in arrays
- W35 has both `mission_id` and `id` in story_missions (legacy)
- No version marker in real.js files (no `version: "v28"` field)

### 9.8 `production_kit/data/` has data files not in production kit workflow
- `bold_consistency_audit.json` — Pattern A/B/C data; mentioned in CLAUDE.md
- `bug_database.json` — likely exists; mentioned in CURRENT.md

### 9.9 VoiceConfig voice names
- All W36 use `en-US-Neural2-*` (Google TTS)?
- Voice randomization per session not present (CHECK 11 of W35 launch guide but not enforced)

### 9.10 Daily Watch `bonus_games`
- W36 has `bonus_games: [...]` — undefined field in any validator
- Likely a legacy format

### 9.11 Game hub named-export antipattern
- Only `games.js` uses named export + CommonJS dual-format
- Future Blueprint should decide: every station uses default OR every station uses named

### 9.12 R2 CDN URLs
- Hardcoded `https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/images/week${WEEK_INT}` in CHECK 41
- This is BUCKET-specific; if R2 bucket name changes, all CHECK 41 references must update

### 9.13 content_vi bold inconsistency
- CHECK 20i (refactor): checks ALL stations, including vocab.js (where VI isn't expected)
- W35 ADV vocab has `meaning_vi: "..."` (no markdown)
- CHECK 20i passes if `content_vi:` line doesn't exist OR exists without `**`

### 9.14 IPA test convention
- W35 IPA: stress=1 for most content words (consistent with CMU)
- W36 IPA: stress=1 for almost all words including function words (NON-CONFORMANT)

### 9.15 Build pipeline entry
- `vite.config.js` may have hardcoded cache-busting params
- Recent commits: `fix(W36): cache-buster ?v=3 on W36_real import to bypass stale browser cache`

---

## 10. Open Questions / Unknown Areas

1. **Auto-bold script chain**: Is there an `auto_bold_targeted.py` flow that runs against read.js? Yes — but what is the trigger?

2. **Image pipeline state JSON** structure is undefined (`.ai/memory/image_pipeline_state.json`).

3. **TTS worker (`engquest-tts-worker`) source code** not in repo — it's a separate Cloudflare Worker. Its schema is implicit.

4. **`tools/content_lint.mjs` rule** (E-01..N-08) exact list — not yet read in this audit.

5. **The 50+ never-rules** — only first 15 rules read so far. ~35 more exist with similar structure.

6. **AI Tutor Story Missions in W36** — runtime handles missing missions silently? Or errors out?

7. **Audio on-demand Worker URL configuration** — `.env` vars vs hardcoded? `import.meta.env.VITE_TTS_WORKER_URL` exists in Shadowing.jsx but no evidence of `.env` file.

8. **Bundle splitting for /cmudict.json** — Vite code-splits. What if it fails to load? Runtime fallback unclear.

---

## 11. Cross-Station Dependency Graph

```
read.js ──► dictation.js (verbatim content_en, sentence subset)
        ├─► shadowing.js (verbatim content_en, sentence subset)
        ├─► explore.js (similar topic/theme, NOT identical)
        ├─► grammar.js (focus derived from read.js theme)
        ├─► ask_ai.js (prompts reference read.js characters)
        ├─► word_power.js (phrasal verbs collocated with read.js chunks)
        ├─► logic_science.js (questions reference read.js content)
        ├─► social_quiz.js (cross-references read_social)
        ├─► mindmap.js (stems target grammar focus of read.js)
        ├─► singapore_math.js (problems use read.js context)
        ├─► week_NN_real.js (story_missions reference read.js characters)
        ├─► daily_watch.js (videos match read.js theme)
        └─► games.js (id patterns reference read.js themes)

vocab.js ──► global_vocab (index.js)
         ├─► word_power.js (8 chunks from vocab)
         ├─► ask_ai.js (target_vocab subset)
         ├─► shadowing_ipa.js (IPA per vocab word)
         ├─► week_NN_real.js (target_vocab subset)
         └─► dictionary.json (HoverWord lookup)
```

**Critical observation:** `vocab.js` is the MOST-REUSED station. A single vocab edit cascades to 6+ other stations.

---

## 12. Three Eras of Schema Coexistence

The current codebase supports 3 schema eras simultaneously (because the production pipeline must accommodate all 156 weeks):

| Era | Weeks | Key schema differences |
|---|---|---|
| W1–W15 | 15 files | single read.js, no mindmap `type`, no dual-tab, simpler games |
| W16–W35 | 19 files | full structure, single read.js, no social_quiz.js, no dual-tab |
| **W36+** | **19 files + dual-tab + social_quiz** | current |

The validators handle this via week-range conditions (e.g., `WEEK_INT -ge 28` for word_power count=8; `WEEK_INT -ge 36` for social_quiz existence).

**Critical risk:** Future Blueprint changes (e.g., new station added in W50+) will require:
1. New condition in every validator
2. New check in code_quality_gate.sh
3. New entry in never_rules/
4. New file cloning step in week-builder/SKILL.md
5. New station component wiring in index.js + station registry

This is NOT a generic system — it's a growing list of magic numbers and ranges.

---

## 13. Summary — Where Reality Differs From Blueprint (preview)

This document alone is the **implementation** audit. The full diff is in `BLUEPRINT_VS_IMPLEMENTATION.md`. Quick preview of items:

1. **W36 has dual-tab read** — Blueprint planned this for W40 (Debate launch); implementation pushed it earlier (W35 launch guide, then W36 production).
2. **V28 AI Tutor schema** exists in W35 production but is partial in W36 production (skeleton + spark_talk only).
3. **Shadowing** has IPA, karaoke, ASR alignment, R2 transcripts — Blueprint does NOT specify these implementations.
4. **On-demand TTS (W16+)** — Blueprint may have assumed pre-baked audio; production switched to Deepgram Worker + R2.
5. **Singapore Math CPA stages** — Blueprint specifies W17–W34 EASY=`concrete`, ADV=`pictorial`; production pushes both to `pictorial` at W35+.
6. **Word Power count = 8 (W28+)** — Blueprint may not have this hard rule; production enforces via CHECK 20.

---

## 14. Final Confidence Statement

**What I have verified:**
- Repository structure (1.1–1.6)
- Canonical 11-step workflow (2)
- Golden standard strategy (3)
- 7-station-by-station schemas for W35 + W36 (4)
- Shadowing deep-dive (5)
- Media pipeline classification (6)
- 7-validator chain architecture (7)
- All 48+ checks in code_quality_gate.sh
- Production HARD rules from NEVER_RULES.md first 15 sections

**What remains unverified or partially verified:**
- Full Blueprint V5 (read 11,000/30,000+ words = top sections and key §VII.b only)
- 35+ remaining never-rules (only first 15 sections covered)
- Image pipeline orchestrator internals (file exists 28KB but not deeply read)
- Audio pipeline internals (generate_audio_deepgram.py is 39KB; high-level flow understood)
- AI Tutor Studio runtime behavior (novaEngine.js referenced in CLAUDE.md but only partially read)
- The 5 remaining background agents' results (a7949923, a875d1ae both completed; af22392c partial)

**See `BLUEPRINT_VS_IMPLEMENTATION.md` for the full diff, and `RUNTIME_RECOMMENDATIONS.md` for the prioritized migration roadmap.**
