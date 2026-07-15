# Process — Week Production Runtime

---

## Week Number Contract

The week number is the primary parameter for every production run.

- **Source:** `.ai/memory/CURRENT.md` — field `active_week` (e.g. `36`)
- **Format:** Always use the raw number without prefix. `36`, not `W36` or `week_36`
- **If absent:** Ask the user to specify the target week before proceeding
- **Never infer** the week number from the current date or directory listing

---

## Production Phases

Each phase maps to a step in the canonical workflow skill.

| Phase | Canonical step | What happens |
|---|---|---|
| 0. Pre-flight | BƯỚC -1 | System integrity check |
| 1. Setup | BƯỚC 0 | Create directories, clone from golden standards |
| 2. Videos | BƯỚC 1–2 | Update video_queries.json, fetch and validate videos |
| 3. Content | BƯỚC 3–4 | Generate bar models, author all 19 content files (ADV + Easy) |
| 4. Validation | BƯỚC 5 | Run 7-validator chain via quality-reviewer subagent |
| 5. Images | BƯỚC 6 | Generate all station images via image pipeline |
| 6. Audio | BƯỚC 7 | Generate TTS/audio on demand |
| 7. Build | BƯỚC 8 | Build the app |
| 8. Browser test | BƯỚC 9 | Verify in browser |
| 9. Commit | BƯỚC 10 | Git commit with week number |
| 10. Report | BƯỚC 11 | Production report |

---

## Numbering Systems

The runtime uses three numbering systems:

| System | Used in | Reference |
|---|---|---|
| Stages 1–5 | EXECUTION_FLOW.md | Top-level grouping |
| Phases 0–10 | PROCESS.md, CHECKPOINTS.md, EXECUTION_FLOW.md | Production steps |
| BƯỚC -1→11 | week-builder SKILL.md | Canonical workflow steps |

All three refer to the same sequence. Stages group phases; phases map to BƯỚC steps.

## Phase Detail

### Phase 0 — Pre-flight
Reference: BƯỚC -1 in `.claude/skills/week-builder/SKILL.md`

Run `bash production_kit/tools/preflight_check.sh`. Do not proceed if the check fails.

### Phase 1 — Setup
Reference: BƯỚC 0

Two modes are produced in parallel: **ADV** (standard difficulty) and **Easy** (simplified).
Both share the same 19-file structure; Easy mode content is adapted for lower difficulty.

Clone 19 ADV files and 19 Easy files from the W36 golden standards.
Clone AI Tutor data from `week_36_real.js`.

Golden standard rules:
- W36+: clone from `src/data/weeks/week_36/`
- W16–W35: clone from `src/data/weeks/week_16/`
- W1–W15: clone from `src/data/weeks/week_6/`

### Phase 2 — Videos
Reference: BƯỚC 1–2

Update `video_queries.json` (both ADV and Easy) with the target week's topic.
Run the video fetch pipeline. Validate thumbnails.
Copy to Easy mode.

### Phase 3 — Content
Reference: BƯỚC 3–4

Delegate all content file authoring to the `content-writer` subagent.
**Invoke:** load `.claude/agents/content-writer.md`, then use the `delegate` tool
targeting `content-writer`.

**ADV mode — 19 files:**
`read.js`, `vocab.js`, `grammar.js`, `writing.js`, `speak_write.js`, `mindmap.js`,
`word_power.js`, `read.js` (dual-tab), `social_quiz.js`, `shadowing.js`,
`singapore_math.js`, `daily_watch.js`, `ask_ai.js`, `games.js`, `word_match.js`,
`logic_science.js`, `read_social.js`, `index.js`, `video_queries.json`

> W36+ includes `social_quiz.js` (Social Studies + Social Quiz) and dual-tab
> `read.js` with `read_stem` + `read_social`.

**Easy mode — 19 files** (same set as ADV, simplified difficulty)

**AI Tutor — 1 file:** `week_NN_real.js` (V28 format, lives at `src/data/weeks/`)

Authoring constraints (from `production_kit/never_rules/`):
- Grammar: no grammar instruction, no grammar examples
- Bold: single-word bolds = 0 for all weeks; multi-word bold policy per week range
- Questions: 3 for W1–W16, 4 for W17+

### Phase 4 — Validation
Reference: BƯỚC 5

Sequential: Phase 3 completes → Phase 4 runs → if SHIP → proceed to Phase 5.
Not overlapping; not part of Phase 3.

Delegate validation to the `quality-reviewer` subagent.
**Invoke:** load `.claude/agents/quality-reviewer.md`, then use the `delegate` tool
targeting `quality-reviewer`.
Run the full 7-validator chain.

Outcomes:
- SHIP — all validators pass → proceed to Phase 5
- FIX-THEN-SHIP — fix failures → re-validate → proceed to Phase 5
- BLOCKER — hard rule violation → stop and surface to user

### Phase 5 — Images
Reference: BƯỚC 6

Delegate image generation to the `image_pipeline/orchestrator.mjs`.
Run per-station with resume-safe state.

### Phase 6 — Audio
Reference: BƯỚC 7

Delegate TTS/audio generation to the on-demand pipeline.
Do not batch-generate all audio in this phase.

### Phase 7 — Build
Reference: BƯỚC 8

Run the app build pipeline.

### Phase 8 — Browser Test
Reference: BƯỚC 9

Open the app in browser. Verify all stations render without console errors.

### Phase 9 — Commit
Reference: BƯỚC 10

Git commit with week number. Message format per canonical workflow.

### Phase 10 — Report
Reference: BƯỚC 11

Generate production report per canonical workflow format.

---

## Decision Points

| Situation | Action |
|---|---|
| Pre-flight check fails | Stop. Surface error. Do not proceed. |
| Validation BLOCKER | Stop. Surface blocker. Do not proceed. |
| Validation FIX-THEN-SHIP | Fix → re-validate → continue |
| Validation SHIP | Continue to next phase |
| Build fails | Surface error. Do not commit. |
| Browser test fails | Surface error. Do not commit. |
