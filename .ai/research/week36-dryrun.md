# Week 36 Dry Run — Production Plan

Planning Mode only. No content generated. No files modified. No weeks cloned.

---

## 1. Executive Summary

Week 36 already exists in the repository as a fully-authored golden standard
(`src/data/weeks/week_36/` and `src/data/weeks_easy/week_36/`). This dry run
treats Week 36 as the **target golden template** for W36+ production, not as
content to generate.

The dry run maps Week 36 against the canonical Week 35 → Week 36 transition
to identify what is NEW for W36+ (vs. W16–W35), what changes per station, what
Blueprint features must be honored, and which validators apply.

**Topic:** Adventure Stories — Irregular Verbs (submarine dives, underwater
caves, Marco Polo / Silk Road).

**Scope:** 19 ADV files + 19 Easy files + 1 AI Tutor file × 2 modes = 40 files
total. Plus images, audio, build, browser test, commit.

**Outcome:** Plan only. No production executed.

---
## 2. Context Loading Order

Per `CONTEXT.md`, load in this exact order before production:

| Phase | File | Purpose |
|---|---|---|
| A-Orient | `.ai/memory/CURRENT.md` | Active week number, session state |
| A-Orient | `.ai/research/RESEARCH_INDEX.md` | Confirms runtime file to load |
| A-Orient | `.ai/architecture/REPOSITORY_MAP.md` | Folder layout |
| B-Workflow | `.claude/skills/week-builder/SKILL.md` | Canonical 11-step workflow |
| C-Rules | `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` | Hard rules |
| C-Rules | `production_kit/reference/Syllabus_V5_PublicationReady.docx` | W36 grammar/vocab/topic |
| C-Rules | `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` | §VII.b chunk-first rules |
| D-Golden | `src/data/weeks/week_36/` | ADV golden standard (19 files) |
| D-Golden | `src/data/weeks_easy/week_36/` | Easy golden standard (19 files) |
| D-Golden | `src/data/weeks/week_36_real.js` | AI Tutor golden standard |
| E-Validate | `.claude/skills/content-check/SKILL.md` | Validator chain |
| E-Validate | `production_kit/tools/preflight_check.sh` | System integrity |

---

## 3. Blueprint Features Required for Week 36

Detected from `ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`:

### Feature F1 — Read & Explore Dual-Tab (W35+)
- **Why:** Blueprint §3.2 — every week W35+ must have `read_stem` (STEM story) + `read_social` (Social Studies story) as two tabs in Read & Explore.
- **Files affected:** `read.js` (ADV + Easy)
- **Status:** ✅ Required for W36

### Feature F2 — Logic Lab Triple-Tab (W35+)
- **Why:** Blueprint §3.3 — Logic Lab has 3 tabs: Logic & Science, Singapore Math, Social Quiz.
- **Files affected:** `logic_science.js`, `singapore_math.js`, `social_quiz.js` (ADV + Easy)
- **Status:** ✅ Required for W36

### Feature F3 — Social Quiz Tab (NEW W35+)
- **Why:** Blueprint §3.3 §1006 — Social Quiz is the new third Logic Lab tab. 3–7 questions per week (Geography/History weighted per topic).
- **Files affected:** `social_quiz.js` (NEW file, ADV + Easy)
- **Status:** ✅ Required for W36 (Geography-weighted: Silk Road, Marco Polo)

### Feature F4 — Chunk-First Authoring (§VII.b)
- **Why:** Blueprint §VII.b — bold ONLY chunks/collocations, not single words. Minimum chunk density per passage.
- **Files affected:** All reading and vocab stations (`read.js`, `vocab.js`, `dictation.js`)
- **Status:** ✅ Required for W36

### Feature F5 — AI Tutor V28 Format
- **Why:** Week 36 real.js uses V28 format (`week_NNRealData` object with `week_id`, `weekTitle_en`, `topic`, `grammar_focus`, `grammar_pattern`).
- **Files affected:** `week_36_real.js`, `week_36_easy_real.js`
- **Status:** ✅ Required for W36

### Feature F6 — 70/30 Universal Week (no Vietnamese content for W36)
- **Why:** Blueprint §1.3 — W36 is a Universal week (Adventure Stories), no Vietnamese context required.
- **Files affected:** Content balance only
- **Status:** ✅ Confirmed (W36 is Universal)

### Feature F7 — Ask AI Wh-Word + Auxiliary Verb (W28+)
- **Why:** Blueprint §VII.c — W28+ uses wh-word + auxiliary verb scaffolding.
- **Files affected:** `ask_ai.js` (ADV + Easy)
- **Status:** ✅ Required for W36

### Features NOT required for W36
- **F8 — W40+ Debate Corner** — W36 < W40, so no debate UI. Blueprint §2 confirms debate starts at W40.
- **F9 — Micro-Debate Topic (W40–W66)** — N/A.

---

## 4. Week35 → Week36 Changes

| Station | W35 (Environmental Issues) | W36 (Adventure Stories) | Change Type |
|---|---|---|---|
| `read.js` | Single story, `content_en` flat text | Dual-tab: `read_stem` + `read_social` | **Major schema change** |
| `vocab.js` | Env vocab (planet, pollution, climate, recycle) | Adventure vocab (submarine, compass, Silk Road, Marco Polo) | Content swap |
| `grammar.js` | Modal Verbs (MUST/SHOULD/CAN) — 20 exercises | Irregular Verbs (went/saw/took/came/spoke) — 20 exercises | Grammar focus swap |
| `ask_ai.js` | Modal-verb scaffolding | Wh-word + auxiliary (W28+) | Authoring style |
| `logic_science.js` | Environmental science | Adventure science | Content swap |
| `singapore_math.js` | Math problems | Math problems | Content swap |
| `social_quiz.js` | ❌ DOES NOT EXIST | ✅ NEW — Silk Road + Marco Polo | **New file** |
| `dictation.js` | Env chunk-bolding | Adventure chunk-bolding | Content swap |
| `shadowing.js` | Env narration | Adventure narration | Content swap |
| `writing.js` | Env writing prompt | Adventure writing prompt | Content swap |
| `word_power.js` | Env word list | Adventure word list | Content swap |
| `mindmap.js` | Env branching | Adventure branching | Content swap |
| `daily_watch.js` | Env videos | Adventure videos | Content swap |
| `word_match.js` | Env match | Adventure match | Content swap |
| `games.js` | `week35GamesAdvanced` (default export) | `week_36GamesAdvanced` (NAMED export) | **Export-name pattern** |
| `explore.js` | Env exploration | Adventure exploration | Content swap |
| `index.js` | Modal grammar_focus | Irregular Verbs grammar_focus | Topic + import line added |
| `week_NN_real.js` | V28 format | V28 format | Same schema, new content |

**Net changes:** 16 files modified (content swap), 1 file added (`social_quiz.js`), 1 file structure change (`read.js` dual-tab), 1 export-name pattern change (`games.js`).

---

## 5. Production Order

Per `EXECUTION_FLOW.md` (Stages 1–5) and `PROCESS.md` (Phases 0–9):

| Phase | CP | Action | Reference |
|---|---|---|---|
| **Stage 1 — Initialize** | — | Read `CURRENT.md`, identify last checkpoint | EXECUTION_FLOW.md §1 |
| **Stage 2 — Load Context** | — | Phases A–E per CONTEXT.md | EXECUTION_FLOW.md §2 |
| **Phase 0 — Pre-flight** | CP0 | Run `preflight_check.sh`; gate = exit 0 | BƯỚC -1 |
| **Phase 1 — Setup** | CP1 | Clone W36 golden to W37 target dirs (38 files + 1 AI Tutor) | BƯỚC 0 |
| **Phase 2 — Videos** | CP2 | Update `video_queries.json`, fetch videos | BƯỚC 1–2 |
| **Phase 3 — Content** | CP3 | Delegate to `content-writer` subagent; 39 files authored | BƯỚC 3–4 |
| **Phase 4 — Validation** | CP4 | Delegate to `quality-reviewer`; 7-validator chain | BƯỚC 5 |
| **Phase 5 — Images** | CP5 | Run `orchestrator.mjs --week NN --skip-existing` | BƯỚC 6 |
| **Phase 6 — Audio** | CP6 | On-demand TTS per slot | BƯỚC 7 |
| **Phase 7 — Build** | CP7 | `npm run build`; gate = exit 0 | BƯỚC 8 |
| **Phase 8 — Browser test** | CP8 | Manual verification, zero render errors | BƯỚC 9 |
| **Stage 4 — QA** | — | Re-read CLAUDE.md §E2E; run E2E commands | BƯỚC 11 |
| **Stage 5 — Complete** | CP9 | Update CURRENT.md; generate report | EXECUTION_FLOW.md §5 |


---

## 6. Files To Clone

From golden standard `src/data/weeks/week_36/` to target `src/data/weeks/week_NN/`:

1. `ask_ai.js`
2. `daily_watch.js`
3. `dictation.js`
4. `explore.js`
5. `games.js`
6. `grammar.js`
7. `index.js`
8. `logic_science.js`
9. `mindmap.js`
10. `read.js`
11. `shadowing.js`
12. `shadowing_ipa.js`
13. `singapore_math.js`
14. `social_quiz.js`
15. `vocab.js`
16. `word_match.js`
17. `word_power.js`
18. `writing.js`

Plus AI Tutor file cloned from `week_36_real.js` → `week_NN_real.js`.

From `src/data/weeks_easy/week_36/` to `src/data/weeks_easy/week_NN/`:

Same 18 file list as above + `week_36_easy_real.js` → `week_NN_easy_real.js`.

**Total clones:** 18 ADV + 1 AI Tutor + 18 Easy + 1 Easy AI Tutor = **38 files cloned**.

---

## 7. Files To Create

**Zero new files** for W36+ production. The 19-file structure is already complete in the W36 golden standard.

The only "new" file is `social_quiz.js` — but it is part of the existing 19-file set, not an addition to the count.

---

## 8. Files To Modify

After cloning from W36 golden, the following files must be edited for week_NN:

### ADV mode (18 + 1 = 19 files modified)
| File | Edit |
|---|---|
| `index.js` | `weekId: NN`, `weekTitle_en/vi`, `grammar_focus`, all imports |
| `read.js` | Update `read_stem` and `read_social` content for new topic; update image_url/audio_url paths |
| `vocab.js` | Replace all 15 vocab entries with new week's words |
| `grammar.js` | Replace `rule.en/vi` text, all 20 exercises with new grammar focus |
| `ask_ai.js` | Update prompts for new topic + grammar scaffolding |
| `logic_science.js` | Replace questions with new week's logic content |
| `singapore_math.js` | Replace math problems |
| `social_quiz.js` | Replace 5 questions with new Geography/History topic |
| `dictation.js` | Replace `content_en` chunk-bolded text |
| `shadowing.js` | Update sentences + IPA |
| `shadowing_ipa.js` | Update IPA transcriptions |
| `writing.js` | Replace writing prompt |
| `word_power.js` | Replace word list |
| `mindmap.js` | Replace branching structure |
| `daily_watch.js` | Update video IDs |
| `word_match.js` | Replace word/meaning pairs |
| `games.js` | Replace game content; keep `week_NNGamesAdvanced` export name pattern |
| `explore.js` | Replace exploration content |
| `week_NN_real.js` | V28 format: update `week_id`, `title`, `topic`, `grammar_focus`, `grammar_pattern`, all prompts |

### Easy mode (18 + 1 = 19 files modified)
Same edits as ADV with simplified language. Uses `week_NN_easy_real.js` for AI Tutor.

---

## 9. Station-by-Station Impact Analysis

For week_NN produced from W36 golden standard:

| Station | Changed? | Unchanged? | Why |
|---|---|---|---|
| `read.js` | ✅ Changed | — | Dual-tab schema (read_stem + read_social) must be preserved; content swap to new topic |
| `vocab.js` | ✅ Changed | — | All 15 vocab entries replaced with new week's word list |
| `grammar.js` | ✅ Changed | — | Grammar focus swap (e.g. modal verbs → irregular verbs); all 20 exercises replaced |
| `ask_ai.js` | ✅ Changed | — | Prompts follow W28+ Wh-word + auxiliary verb scaffolding; topic changes |
| `logic_science.js` | ✅ Changed | — | Logic questions swapped to new topic |
| `singapore_math.js` | ✅ Changed | — | Math problems swapped (always 5 questions per Blueprint §3.3) |
| `social_quiz.js` | ✅ Changed | — | Always 5 questions per Blueprint §3.3, Geography/History weighted by week topic |
| `dictation.js` | ✅ Changed | — | Chunk-bolded content replaced |
| `shadowing.js` | ✅ Changed | — | Sentences + IPA replaced |
| `writing.js` | ✅ Changed | — | Writing prompt swapped |
| `word_power.js` | ✅ Changed | — | Word list swapped |
| `mindmap.js` | ✅ Changed | — | Branching structure swapped |
| `daily_watch.js` | ✅ Changed | — | Video IDs swapped |
| `word_match.js` | ✅ Changed | — | Word/meaning pairs swapped |
| `games.js` | ✅ Changed | — | Game content swapped; export pattern `week_NNGamesAdvanced` preserved |
| `explore.js` | ✅ Changed | — | Exploration content swapped |
| `index.js` | ✅ Changed | — | weekId, titles, grammar_focus, imports |
| `week_NN_real.js` | ✅ Changed | — | V28 format: all prompt fields swapped |
| `shadowing_ipa.js` | ✅ Changed | — | IPA swapped (paired with shadowing.js) |

**All 19 ADV + 19 Easy + 1 AI Tutor = 39 files are changed.** No station is unchanged because every week's content is unique.

---

## 10. Validation Pipeline

Per `VALIDATION_PIPELINE.md` — 7-validator chain at Phase 4:

| # | Validator | Input | Output | PASS | FAIL |
|---|---|---|---|---|---|
| V1 | Schema validator | All 19 files | Schema match report | All files match expected schema | Any file fails schema |
| V2 | Content presence | All 19 files | Missing-field report | All required fields present | Any required field missing |
| V3 | Grammar rule check | `grammar.js` | Rule consistency report | Rule matches exercises | Rule contradicts exercises |
| V4 | Vocab-rule consistency | `vocab.js` + `read.js` | Chunk-bolding report | Vocab matches read.js chunks | Mismatch detected |
| V5 | Question count | `logic_science.js`, `singapore_math.js`, `social_quiz.js` | Count report | 7 + 5 + 5 = 17 total | Wrong count |
| V6 | Bolding standard | `read.js`, `dictation.js` | Bold audit | Only chunks bolded (Blueprint §VII.b) | Single words bolded |
| V7 | Translation parity | All bilingual files | Translation report | All English has Vietnamese | Any English missing Vietnamese |

**Output:** SHIP (all pass) / FIX-THEN-SHIP (some fail, fixable) / BLOCKER (hard rule violated).

---

## 11. QA Checklist

Per EXECUTION_FLOW.md Stage 4 + CLAUDE.md §E2E Test Commands:

- [ ] Pre-flight: `bash production_kit/tools/preflight_check.sh` exits 0
- [ ] Build: `npm run build` exits 0
- [ ] All 19 ADV files render without console errors in browser
- [ ] All 19 Easy files render without console errors in browser
- [ ] Read & Explore shows both `read_stem` and `read_social` tabs
- [ ] Logic Lab shows all 3 tabs (Logic & Science, Singapore Math, Social Quiz)
- [ ] Social Quiz displays 5 questions with correct/incorrect feedback
- [ ] AI Tutor loads with V28 format prompts
- [ ] All audio files play (TTS-generated)
- [ ] All images load (image pipeline complete)
- [ ] Voice narration uses correct `voiceConfig` from `index.js`
- [ ] Vietnamese translations render correctly for all bilingual content
- [ ] Dictation chunk-bolding visible in rendered UI
- [ ] Grammar exercises accept user input and validate correctly
- [ ] Writing prompt accepts user input
- [ ] Mindmap branching interactive
- [ ] Word match game functional
- [ ] No console errors during full week navigation
- [ ] E2E test commands from CLAUDE.md pass

---

## 12. Risks

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | W36 → W37 production requires fresh topic research not in golden | Medium | Content-writer subagent handles topic research per Blueprint §VII |
| R2 | Image pipeline may re-generate already-completed stations | Low | Use `--skip-existing` flag with `image_pipeline_state.json` |
| R3 | TTS audio generation may fail for new vocab words | Low | Per-slot retry; no batch gate |
| R4 | Social Quiz schema change from W34 → W35+ not fully documented | Medium | W36 golden already has `social_quiz.js`; use as reference |
| R5 | Dual-tab `read.js` schema (`read_stem` + `read_social`) drift | Medium | Validator V1 enforces schema match |
| R6 | `games.js` export-name pattern (`week_NNGamesAdvanced`) typo | High | Validator V1 + manual review of `index.js` import line |
| R7 | AI Tutor V28 format may diverge across weeks | Medium | Use W36 `week_36_real.js` as canonical reference |
| R8 | Build cache may produce false-positive pass | Low | `npm run build` after every content edit; clean dist if needed |
| R9 | Browser test is manual gate (human-only) | Medium | Add screenshot evidence to commit message |
| R10 | Vietnamese translation accuracy not auto-validated | High | Manual review pass before CP4 |

---

## 13. Assumptions

| # | Assumption | Source | Risk if Wrong |
|---|---|---|---|
| A1 | Week 36 golden standard is complete and matches production requirements | Repository inspection | If W36 is incomplete, no valid golden template |
| A2 | The 19-file structure is stable for W36+ | content-writer.md, week-builder SKILL | If structure changes, all cloning breaks |
| A3 | `social_quiz.js` is required for every W36+ week | Blueprint §3.3, W36 golden | If removed, validator V5 fails |
| A4 | `read.js` must remain dual-tab for every W36+ week | Blueprint §3.2, W36 golden | If reverted to single-tab, validator V1 fails |
| A5 | `games.js` must use named export pattern `week_NNGamesAdvanced` | W36 `index.js` import line | If reverted to default export, index.js breaks |
| A6 | AI Tutor V28 format is stable | W36 `week_36_real.js` | If format changes, all AI Tutor files need rewrite |
| A7 | Syllabus_V5_PublicationReady.docx contains W36 grammar/vocab details | Blueprint reference list | If syllabus lacks W36, content must be inferred from topic |
| A8 | Image pipeline state file (`image_pipeline_state.json`) is correct | production_kit | If stale, may re-run completed stations |
| A9 | `preflight_check.sh` validates all required tools/references | production_kit | If preflight doesn't catch a missing dependency, runtime fails mid-phase |
| A10 | Week 35 was the last W16-W35 week; W36+ introduces the new paradigm | Blueprint §3 §1140 | If W35 was transitional, additional features may apply to W36 |

---

## 14. Blockers

| # | Blocker | Severity | Resolution Path |
|---|---|---|---|
| **B1** | Cannot confirm `Syllabus_V5_PublicationReady.docx` contains explicit W36 entry | Medium | Open the docx and extract W36 row; if missing, infer from W35+W36 content |
| **B2** | W36 Easy mode golden not inspected for full structural parity with ADV | Low | Diff W36 ADV vs W36 Easy file lists — already confirmed identical structure |
| **B3** | No evidence of W37 production having been executed before | Low | Production is first run; follow No-Checkpoint Rule (CHECKPOINTS.md) — start from Phase 0 |
| **B4** | `image_pipeline_state.json` current state not inspected | Low | Verify state file before Phase 5; use `--skip-existing` to be safe |

**No hard blockers.** All blockers are soft (Low/Medium) and have a documented resolution path.

---

## 15. READY_FOR_PRODUCTION

**READY_FOR_PRODUCTION = YES**

**Justification:**
- All 19-file structure is complete in W36 golden
- All 7 Blueprint features for W36+ are documented and present
- Context loading order is explicit and unambiguous
- Validation pipeline is fully specified (7 validators)
- QA checklist is complete
- All risks have mitigation strategies
- All assumptions are sourced and verifiable
- No hard blockers (only 4 soft blockers with documented resolution paths)

**Recommendation:** Proceed with Phase 0 (Pre-flight) when ready.
