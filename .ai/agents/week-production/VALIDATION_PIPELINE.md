# Validation Pipeline — Week Production Runtime

---

## When Validation Runs

Validation runs at **Phase 4** (BƯỚC 5 in canonical workflow), after all content files
are authored and before images are generated.

It does not run again automatically after image or audio phases.

---

## Validator Sequence

Run each validator in order. Collect all results before making a PASS/FAIL decision.

---

### Validator 1 — Content Lint

| Field | Value |
|---|---|
| Canonical command | `npm run content:lint -- --week NN --errors-only` |
| Input | `src/data/weeks/week_NN/read.js`, `src/data/weeks/week_NN/explore.js` |
| Output | Lint report (errors only) |
| PASS | Zero errors returned |
| FAIL | One or more errors returned |

---

### Validator 2 — Dictionary Lint

| Field | Value |
|---|---|
| Canonical command | `npm run dict:lint -- --errors-only` |
| Input | `public/dictionary.json` |
| Output | Lint report (errors only) |
| PASS | Zero errors returned |
| FAIL | One or more errors returned |

---

### Validator 3 — Bug Prevention Check

| Field | Value |
|---|---|
| Canonical command | `bash production_kit/tools/bug_prevention_check.sh NN` |
| Input | All week data files under `src/data/weeks/week_NN/` and `src/data/weeks_easy/week_NN/` |
| Output | 13 individual check results |
| PASS | All 13 checks pass |
| FAIL | One or more checks fail |

---

### Validator 4 — Code Quality Gate

| Field | Value |
|---|---|
| Canonical command | `bash production_kit/tools/code_quality_gate.sh NN` |
| Input | All week data files |
| Output | 48 individual check results |
| PASS | All 48 checks pass |
| FAIL | One or more checks fail |

---

### Validator 5 — Singapore Math Types

| Field | Value |
|---|---|
| Canonical command | `node production_kit/tools/validate_sgmath_types.mjs NN` |
| Input | `src/data/weeks/week_NN/singapore_math.js`, `src/data/weeks_easy/week_NN/singapore_math.js` |
| Output | Type validation report |
| PASS | All problem `type` fields are valid enum values |
| FAIL | One or more invalid type values |
| SKIP | No `singapore_math.js` in this week |

---

### Validator 6 — Bar Model Paths

| Field | Value |
|---|---|
| Canonical command | `node tools/validate_barmodels.js NN` |
| Input | `src/data/weeks/week_NN/singapore_math.js` |
| Output | Path validation report for bar model image references |
| PASS | All referenced image paths exist or are resolvable |
| FAIL | One or more broken image references |
| SKIP | No bar model entries in this week |

---

### Validator 7 — Video Thumbnails

| Field | Value |
|---|---|
| Canonical command | `node tools/validate_video_thumbnails.js NN` |
| Input | `src/data/weeks/week_NN/daily_watch.js` |
| Output | Thumbnail availability report |
| PASS | All video IDs resolve to valid thumbnails |
| FAIL | One or more thumbnail URLs are unavailable |
| SKIP | No videos in this week |

---

## Not Covered by This Pipeline

| Subsystem | Why not | Separate tool |
|---|---|---|
| Audio | On-demand via Deepgram Worker + R2 cache | First play self-validates |
| Image pipeline | Own state machine | `orchestrator.mjs --week NN` |
| Shadowing transcripts | Per-video JSON pipeline | `fetch_video_transcripts.js`, `clean_transcripts.mjs` |

---

## Outcome Decision

After running all 7 validators:

| Outcome | Condition |
|---|---|
| **SHIP** | All 7 validators return PASS (SKIP counts as PASS) |
| **FIX-THEN-SHIP** | One or more validators return FAIL, none are BLOCKER-class |
| **BLOCKER** | A hard rule in `production_kit/never_rules/` is violated |

BLOCKER overrides all other results. Stop immediately and surface to user.
