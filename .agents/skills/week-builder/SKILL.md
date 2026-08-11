---
name: week-builder
description: Produces a complete week of EngQuest3K content by following the verified 11-step production workflow. Use when asked to create/build/produce a new week. Covers: clone golden standard, create all 19 content files (ADV + Easy), generate bar models, fetch YouTube videos, generate images via pipeline. Audio is on-demand (no batch step).
---

# Week Builder

Orchestrate the full week-production workflow for a single EngQuest3K week.

## When to invoke

- User says "build week 36", "create W36", "produce week 38", "tạo tuần 36"
- User says "continue week production" and a specific week is in scope
- NOT for: editing one file in an existing week (use normal editing flow)

---

## Pre-flight (before any file changes)

### 1. Read source of truth
- **Syllabus**: `production_kit/reference/Syllabus_V5_PublicationReady.docx` — extract grammar focus, vocab list, reading topic, writing task for target week
- **Blueprint**: `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` — §VII.b for chunk-first authoring rules

### 2. Identify question count rule
| Level | Weeks | Questions per read.js |
|---|---|---|
| A1 | W1–W16 | 3 |
| A2–B1 | W17–W156 | 4 |

W36 = **4 comprehension questions**.

### 3. Determine chunk-first rules for the week
| Week range | Single-word bolds | Multi-word chunks |
|---|---|---|
| W1–W27 | 0 | Any |
| W28–W35 | 0 | ≥10 per passage, 1–3 per sentence |
| W36+ | 0 | ≥10 per passage, canonical-longest bold policy applies |

---

## BƯỚC -1: Pre-flight system check

```bash
bash production_kit/tools/preflight_check.sh
```

---

## BƯỚC 0: Create directories + clone from golden standards

Golden standard for **W36+**: `src/data/weeks/week_36/` (ADV, 19 files) and `src/data/weeks_easy/week_36/` (Easy, 19 files). W36 has dual-tab read.js (read_stem + read_social) + social_quiz.js for Social Studies + Social Quiz.

```bash
# Create week directories
mkdir -p src/data/weeks/week_36
mkdir -p src/data/weeks_easy/week_36

# Clone 19 ADV files from W16 golden standard
cp src/data/weeks/week_36/*.js src/data/weeks/week_36/
cp src/data/weeks/week_36/video_queries.json src/data/weeks/week_36/

# Clone 19 Easy files from W36 Easy golden standard
cp src/data/weeks_easy/week_36/*.js src/data/weeks_easy/week_36/
cp src/data/weeks_easy/week_36/video_queries.json src/data/weeks_easy/week_36/

# Clone AI Tutor data (lives at src/data/weeks/, NOT inside week_NN/)
cp src/data/weeks/week_36_real.js src/data/weeks/week_36_real.js
```

**Never create .js files with Python.** Use Node.js `Edit` tool only.

---

## BƯỚC 1: Create/update video_queries.json (both modes)

Edit `src/data/weeks/week_36/video_queries.json` and `src/data/weeks_easy/week_36/video_queries.json` to match the target week's Syllabus topic. Fields: `weekId`, `theme`, `grammar_focus`, `vocabulary_focus`, `videos[]` (with `purpose`, `priority_search`, `backup_search`).

---

## BƯỚC 2: Update Daily Watch videos

```bash
node tools/update_videos.js 36 --reset
```

This reads `video_queries.json`, queries YouTube Data API, validates against 60-channel whitelist, writes `daily_watch.js` (ADV mode only by default — then manually create Easy mode copy).

**Validate:**
```bash
node tools/validate_video_thumbnails.js 36
```

**Create Easy mode copy:**
```bash
cp src/data/weeks/week_36/daily_watch.js src/data/weeks_easy/week_36/daily_watch.js
```

---

## BƯỚC 3: Generate bar model images (if singapore_math.js exists)

```bash
python3 tools/generate_logiclab_barmodels.py 36 --skip-existing
```

**Validate bar models:**
```bash
node tools/validate_barmodels.js 36
```

---

## BƯỚC 4: Edit content files (Node.js only, no Python)

For each of the 19 files in both modes, replace golden-standard content with target week content:

**ADV (19 files):** `src/data/weeks/week_36/`
- `read.js` — passage with ≥10 multi-word chunks, 4 comprehension questions, audio_url (on-demand path)
- `explore.js` — free exploration text (same chunk rules)
- `vocab.js` — 18 vocab words (W28+: 18 words), pronunciation, definition_vi/en, examples
- `grammar.js` — grammar explanation + **exactly 20 exercises**, use `answer:` not `correct:`
- `singapore_math.js` — 5 problems (W36+ = pictorial CPA stage), valid types only
- `dictation.js` — chunk-rich sentences selected from read.js
- `shadowing.js` — min 8 sentences W28+, verbatim from read.js content_en
- `shadowing_ipa.js` — IPA transcription for shadowing sentences
- `writing.js` — 8 sentence frames, min_words = 45, vocabulary_bank + scaffolding
- `mindmap.js` — 6 stems (2 affirmative + 2 negative + 2 question)
- `logic_science.js` — logic/science puzzles
- `daily_watch.js` — 5 videos (filled in BƯỚC 2)
- `ask_ai.js` — AI Tutor prompts with question_word_bank (correctWord UPPERCASE)
- `word_power.js` — collocation power cards
- `word_match.js` — word matching pairs
- `games.js` — game configuration
- `index.js` — imports all station files, voiceConfig with 5 DISTINCT voices

**Easy mode (same 19 files):** `src/data/weeks_easy/week_36/` — simplified content, lower vocab, simpler sentences.

---

## BƯỚC 5: Validate content (all must pass)

```bash
npm run content:lint -- --week 36 --errors-only
npm run dict:lint -- --errors-only
bash production_kit/tools/bug_prevention_check.sh 36
bash production_kit/tools/code_quality_gate.sh 36
node production_kit/tools/validate_sgmath_types.mjs 36
```

---

## BƯỚC 6: Audio — on-demand (NO batch step for W16+)

**W16+ audio is NOT generated in advance.** The runtime flow:
1. App calls `voiceService.js` with `audio_url` path (e.g. `/audio/week36/read_main.mp3`)
2. `voiceService.js` sends to Deepgram Worker API (`engquest-tts-worker.binhkhoi08.workers.dev/tts`)
3. Worker checks R2 for cached file; if miss → generates via Deepgram Aura-2 → uploads to R2 → returns
4. Subsequent requests hit R2 CDN directly (~100ms)

**No manual audio step is needed for W36.** The first user interaction triggers on-demand generation + R2 caching.

---

## BƯỚC 7: Generate images (W30+)

```bash
node tools/image_pipeline/orchestrator.mjs --week 36
```

This runs the full pipeline:
1. Reads week data → extracts per-slot context (vocab words, cover titles, etc.)
2. Generates images via Gemini 2.5 Flash Image (default) or FLUX/SD3
3. Saves to `public/images/week36/`
4. Uploads to R2 `engquest-images` bucket
5. Rewrites `/images/week36/*.jpg` refs in source JS to R2 CDN URL

**Resume-safe:** tracks state in `.ai/memory/image_pipeline_state.json`. Re-running skips already-completed images.

**Optional flags:**
```bash
node tools/image_pipeline/orchestrator.mjs --week 36 --dry-run      # preview only
node tools/image_pipeline/orchestrator.mjs --week 36 --skip-upload   # local only
node tools/image_pipeline/orchestrator.mjs --week 36 --skip-update   # no source edit
IMG_MODEL=flux-schnell node tools/image_pipeline/orchestrator.mjs --week 36  # use FLUX
```

---

## BƯỚC 8: Fetch shadowing transcripts (if new video)

Only needed if shadowing station uses a new YouTube video. For W36, this is a new week:

```bash
# Fetch raw transcript from YouTube
node tools/fetch_video_transcripts.js --only 36

# Clean + fix ASR errors + merge curated overrides
node tools/clean_transcripts.mjs

# Split monolithic into per-video JSON files
python3 tools/split_transcripts.py
```

Output: `src/data/video_transcripts_by_id/cleaned/<videoId>.json`

**Manual overrides:** Edit `src/data/curated_transcripts.json` for bad auto-splits, then re-run `clean_transcripts.mjs`.

---

## BƯỚC 9: Build

```bash
rm -rf node_modules/.vite dist && npm run build
```

---

## BƯỚC 10: Browser test

1. `npm run dev`
2. Test ADV mode: navigate to week 36, check all stations load
3. Test Easy mode: switch mode, navigate to week 36, check all stations load
4. Verify: audio plays on-demand (first play = slower, second play = cached)

---

## BƯỚC 11: Commit

```bash
git add src/data/weeks/week_36/ src/data/weeks_easy/week_36/ src/data/weeks/week_36_real.js
git add public/images/week36/  # if generated
git commit -m "feat(content): week 36 ADV + Easy — [topic]"
```

---

## Report format

```markdown
## Week 36 Complete
- Files created: <19 ADV + 19 Easy + 1 Real = 39 total>
- Validators: all PASS / list FAIL
- Bar models: generated N images / skipped (no math)
- Daily watch: N videos found / validated
- Images: generated N images, uploaded to R2 / skipped
- Transcripts: fetched/cleaned N / skipped
- Audio: on-demand (no batch step) ✅
- Build: PASS / FAIL
- Browser test: pending
```

## Key notes

- **No audio batch generation** for W16+. Audio is on-demand via Deepgram Worker + R2 cache.
- **Image pipeline** generates + uploads + rewrites source JS refs in one pass — no separate upload step.
- **Shadowing transcript pipeline** is 3-stage: fetch → clean → split. Only needed for new videos.
- **VoiceConfig in index.js** must have 5 distinct voices — same as W16 golden standard.
