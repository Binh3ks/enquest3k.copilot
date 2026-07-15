# RUNTIME_CHANGELOG_PROPOSAL.md — Migration Roadmap (Nothing Changed Yet)

> **Date:** 2026-07-14
> **Status:** PROPOSAL — not implemented. Approver required.
> **Goal:** Roadmap of all Runtime changes proposed by RUNTIME_RECOMMENDATIONS.md.
> **Format:** Each item: **ID / Title / Tier / Risk / Files / Estimated effort / Dependencies / Test plan**

---

## 0. How to Use This Document

Each proposal has an ID (`T1-A1` = Tier 1, Item A1). Items are listed in recommended execution order.

**For each item:**
- **Before implementing:** Reviewer confirms Risk + Test plan
- **After implementing:** Update this file with `Status: DONE` + commit SHA
- **If abandoned:** Update with `Status: WONTFIX` + reason

---

## Tier 1: Quick Wins (Recommended Next Sprint)

### T1-A1: Fix week-builder SKILL.md AI Tutor clone path
| | |
|---|---|
| **ID** | T1-A1 |
| **Title** | Update week-builder/SKILL.md BƯỚC 0 to clone `week_NN_real.js` to subfolder |
| **Tier** | 1 (Quick win) |
| **Risk** | Low — single line edit, runtime already supports both paths |
| **Files** | `.claude/skills/week-builder/SKILL.md` (1 line) |
| **Effort** | 5 minutes |
| **Dependencies** | None |
| **Test plan** | (1) Read week-builder/SKILL.md to confirm current text. (2) Patch line. (3) Run `bash production_kit/tools/code_quality_gate.sh 36` to confirm W36 still passes. (4) Verify on W37 if exists. |
| **Acceptance** | Future weeks following the SKILL place `week_NN_real.js` in `src/data/weeks/week_NN/`, not root. |

### T1-A2: Add `logic_lab` to CHECK 12 voiceConfig required keys
| | |
|---|---|
| **ID** | T1-A2 |
| **Title** | CHECK 12 enforces 7 voiceConfig keys (add `logic_lab`) |
| **Tier** | 1 |
| **Risk** | Low — additive check; existing weeks pass |
| **Files** | `production_kit/tools/code_quality_gate.sh` (1 line in CHECK 12) |
| **Effort** | 2 minutes |
| **Test plan** | (1) Run CHECK 12 against W36. (2) Verify it now requires 7 keys. (3) Confirm W36's 7 keys pass. |
| **Acceptance** | New station voiceConfig must include all 7 keys. |

### T1-A3: Document `logic_lab` nested-station convention in CHECK 13
| | |
|---|---|
| **ID** | T1-A3 |
| **Title** | CHECK 13: add comment explaining `logic_lab: {logic_lab, singapore_math, social_quiz}` nested object |
| **Tier** | 1 |
| **Risk** | Very low — comment only |
| **Files** | `production_kit/tools/code_quality_gate.sh` CHECK 13 (add comment) |
| **Effort** | 5 minutes |
| **Test plan** | Read CHECK 13 + W36 index.js. Confirm nesting convention is clear. |
| **Acceptance** | New maintainer can understand the convention from CHECK 13 alone. |

### T1-A4: Deduplicate CHECK 39/40/41
| | |
|---|---|
| **ID** | T1-A4 |
| **Title** | Remove duplicate CHECK 39, 40, 41 in code_quality_gate.sh |
| **Tier** | 1 |
| **Risk** | Very low — identical code blocks |
| **Files** | `production_kit/tools/code_quality_gate.sh` (remove lines 1810-1898) |
| **Effort** | 2 minutes |
| **Test plan** | (1) Run code_quality_gate.sh against W36. (2) Verify CHECK 39/40/41 run exactly once. (3) Verify no errors introduced. |
| **Acceptance** | Error count from CHECK 39/40/41 is half what it was before. |

### T1-A5: Replace CHECK 19 model_sentence check with Node.js
| | |
|---|---|
| **ID** | T1-A5 |
| **Title** | CHECK 19: count model_sentence via Node script (not grep) |
| **Tier** | 1 |
| **Risk** | Low — same intent, more correct |
| **Files** | `production_kit/tools/code_quality_gate.sh` CHECK 19 + new helper `tools/_check_model_sentence.mjs` |
| **Effort** | 30 minutes |
| **Dependencies** | None |
| **Test plan** | (1) Run on W36 (multi-line model_sentence). (2) Run on W35 (single-line). (3) Verify both pass with correct count. (4) Construct a synthetic test case where model_sentence is multi-line with insufficient content — verify it now fails. |
| **Acceptance** | Multi-line `model_sentence` is properly counted. |

### T1-A6: Move image_prompts to production_kit/prompts/
| | |
|---|---|
| **ID** | T1-A6 |
| **Title** | Migrate `Production_FINAL/IMAGE PROMPTS/` → `production_kit/prompts/week_NN_image_prompts.txt` |
| **Tier** | 1 |
| **Risk** | Low — directory migration; git tracks moves |
| **Files** | All `Production_FINAL/IMAGE PROMPTS/*.txt` (move) + CHECK 25, 23c, 40 paths |
| **Effort** | 1 hour |
| **Dependencies** | Git clean working tree |
| **Test plan** | (1) `git mv` all files. (2) Update CHECK 25 + 23c + 40 path strings. (3) Run validators on W36 to confirm they find prompts. (4) Verify image_pipeline/orchestrator.mjs doesn't reference the old path. |
| **Acceptance** | Validators find prompt files at new path. Old path removed. |

### T1-A7: Add `week_NN_real.js` export-format CHECK
| | |
|---|---|
| **ID** | T1-A7 |
| **Title** | CHECK: `week_NN_real.js` must use ES `export default` OR document CommonJS as legacy |
| **Tier** | 1 |
| **Risk** | Low |
| **Files** | `production_kit/tools/code_quality_gate.sh` (new CHECK 47) |
| **Effort** | 15 minutes |
| **Test plan** | (1) Add CHECK that finds `module.exports =` in `week_NN_real.js` and warns. (2) Run on W35, W36. (3) Verify both pass with warning. (4) Add to never_rules. |
| **Acceptance** | Future weeks get a warning if using CommonJS. |

### T1-A8: Add writing.js theme-drift CHECK
| | |
|---|---|
| **ID** | T1-A8 |
| **Title** | CHECK 48: writing.js theme must match read.js / week_NN_real.js topic |
| **Tier** | 1 |
| **Risk** | Low — heuristic check |
| **Files** | `production_kit/tools/code_quality_gate.sh` (new CHECK 48) |
| **Effort** | 30 minutes |
| **Test plan** | (1) Add heuristic: extract first sentence of writing.js `model_sentence`, check for key vocab words. (2) Run on W35 (personal_growth writing vs environmental read.js) — should FAIL. (3) Run on W36 — should PASS. (4) Refine until low false-positive rate. |
| **Acceptance** | W35's off-theme writing is detected. W36 passes. |

### T1-A9: Add dictation.js `meaning` placeholder CHECK
| | |
|---|---|
| **ID** | T1-A9 |
| **Title** | CHECK 49: dictation.js `meaning` field must not be literal placeholder |
| **Tier** | 1 |
| **Risk** | Very low |
| **Files** | `production_kit/tools/code_quality_gate.sh` (new CHECK 49) |
| **Effort** | 10 minutes |
| **Test plan** | (1) Add CHECK that greps for `meaning: "Vietnamese meaning here"`. (2) Run on W36 — should FAIL. (3) Translate W36 placeholder. (4) Run again — should PASS. |
| **Acceptance** | Placeholder strings are detected. |

### T1-A10: Add IPA completeness CHECK
| | |
|---|---|
| **ID** | T1-A10 |
| **Title** | CHECK 50: shadowing_ipa.js keys must match shadowing.js script ids |
| **Tier** | 1 |
| **Risk** | Low |
| **Files** | `production_kit/tools/code_quality_gate.sh` (new CHECK 50) |
| **Effort** | 15 minutes |
| **Test plan** | (1) Add CHECK that compares `Object.keys(shadowing_ipa)` to `shadowing.script.map(s => s.id)`. (2) Run on W36 — should FAIL (6/12). (3) Run on W35 — should PASS. (4) Refine until consistent. |
| **Acceptance** | Missing IPA entries are detected. |

### T1-A11: Update CHECK 19.5 to count dual-tab comprehension questions
| | |
|---|---|
| **ID** | T1-A11 |
| **Title** | CHECK 19.5: count `read_stem.comprehension_questions[]` + `read_social.comprehension_questions[]` for W36+ |
| **Tier** | 1 |
| **Risk** | Low |
| **Files** | `production_kit/tools/code_quality_gate.sh` CHECK 19.5 |
| **Effort** | 20 minutes |
| **Test plan** | (1) Add dual-tab handling when both `read_stem` and `read_social` exist. (2) Verify 4 questions per tab. (3) Run on W36. |
| **Acceptance** | Dual-tab weeks counted correctly. |

### T1-A12: Compute expected image_prompts count dynamically
| | |
|---|---|
| **ID** | T1-A12 |
| **Title** | CHECK 25: expected prompt count = vocab.length + word_power.length + 2 covers + bar_models |
| **Tier** | 1 |
| **Risk** | Low — more flexible than hardcoded 26/21 |
| **Files** | `production_kit/tools/code_quality_gate.sh` CHECK 25 |
| **Effort** | 1 hour |
| **Test plan** | (1) Compute expected count from week data. (2) Compare to `Filename:` count in prompts file. (3) Allow ±1 tolerance. (4) Run on multiple weeks to verify. |
| **Acceptance** | Adding a vocab word no longer breaks the CHECK. |

### T1-A13: Add `type` field CHECK for mindmap stems
| | |
|---|---|
| **ID** | T1-A13 |
| **Title** | CHECK 51: every mindmap centerStem has `type: affirmative\|negative\|question` |
| **Tier** | 1 |
| **Risk** | Low |
| **Files** | `production_kit/tools/code_quality_gate.sh` (new CHECK 51) |
| **Effort** | 10 minutes |
| **Test plan** | (1) Add CHECK that grep's `type:` in mindmap.js for each stem. (2) Run on W36 — should PASS. |
| **Acceptance** | Mindmap stems must have type. |

### T1-A14: Add CHECK that `spark_talk.frames.length >= 8`
| | |
|---|---|
| **ID** | T1-A14 |
| **Title** | CHECK 52: spark_talk has at least 8 frames for proper cycling |
| **Tier** | 1 |
| **Risk** | Low |
| **Files** | `production_kit/tools/code_quality_gate.sh` CHECK 16 |
| **Effort** | 5 minutes |
| **Test plan** | (1) Add count check in CHECK 16. (2) Run on W35, W36. |
| **Acceptance** | Sparks with < 8 frames are flagged. |

### T1-A15: Reorder CHECK 20e-20i before SUMMARY
| | |
|---|---|
| **ID** | T1-A15 |
| **Title** | Move bold sub-checks to before SUMMARY in code_quality_gate.sh |
| **Tier** | 1 |
| **Risk** | Very low — code reorganization only |
| **Files** | `production_kit/tools/code_quality_gate.sh` (move lines 2134-2278 to before line 2281) |
| **Effort** | 5 minutes |
| **Test plan** | (1) Move code. (2) Run full validator. (3) Confirm 20e-20i run. |
| **Acceptance** | All bold sub-checks run consistently. |

---

## Tier 2: Structural Improvements (Recommended Next Month)

### T2-B1: Externalize validator magic numbers
| | |
|---|---|
| **ID** | T2-B1 |
| **Title** | Create `production_kit/config/validator_thresholds.json` + refactor validators to read it |
| **Tier** | 2 |
| **Risk** | Medium — touches many files; needs regression testing |
| **Files** | New `production_kit/config/validator_thresholds.json` + updates to `code_quality_gate.sh`, `bug_prevention_check.sh`, `validate_sgmath_types.mjs` |
| **Effort** | 1–2 days |
| **Dependencies** | None |
| **Test plan** | (1) Catalog all magic numbers across validators. (2) Add to JSON. (3) Replace hardcoded values with JSON reads. (4) Run all validators on W35, W36, W1-W15 sample. (5) Verify all pass with same result. |
| **Acceptance** | Adding a new week range (e.g., W60+) requires only JSON edit, not shell script changes. |

### T2-B2: Schema-driven CHECK framework
| | |
|---|---|
| **ID** | T2-B2 |
| **Title** | Define `production_kit/config/station_schemas.json` + write generic `validate_week.mjs` |
| **Tier** | 2 |
| **Risk** | Medium-high — significant refactor |
| **Files** | New `station_schemas.json` + new `tools/validate_week.mjs` + remove old per-station checks |
| **Effort** | 1 week |
| **Dependencies** | T2-B1 |
| **Test plan** | (1) Define schema for vocab, grammar, writing, etc. (2) Build generic validator. (3) Run against W36. (4) Compare output to current CHECK suite. (5) Verify equivalent coverage. |
| **Acceptance** | New station = schema JSON edit only. Validators automatically enforce. |

### T2-B3: Move YouTube whitelist to config
| | |
|---|---|
| **ID** | T2-B3 |
| **Title** | Extract 60-channel whitelist to `production_kit/config/youtube_whitelist.json` |
| **Tier** | 2 |
| **Risk** | Low |
| **Files** | `tools/update_videos.js` (load from JSON) + new config file |
| **Effort** | 4 hours |
| **Test plan** | (1) Extract whitelist. (2) Add per-week override mechanism via `video_queries.json`. (3) Run on W36 + a test week. |
| **Acceptance** | Whitelist configurable per deployment. |

### T2-B4: Centralize TTS Worker URL
| | |
|---|---|
| **ID** | T2-B4 |
| **Title** | Single source of truth for Deepgram Worker URL |
| **Tier** | 2 |
| **Risk** | Low |
| **Files** | `src/services/voiceService.js` + `src/modules/shadowing/Shadowing.jsx` + new `production_kit/config/tts_config.json` |
| **Effort** | 4 hours |
| **Test plan** | (1) Define TTS config. (2) Both services import same source. (3) Test fallback chain. |
| **Acceptance** | Single config edit affects both services. |

### T2-B5: Externalize R2 CDN base URL
| | |
|---|---|
| **ID** | T2-B5 |
| **Title** | Move R2 CDN base URL to `production_kit/config/r2_config.json` |
| **Tier** | 2 |
| **Risk** | Low |
| **Files** | `production_kit/tools/code_quality_gate.sh` CHECK 41 + any scripts using the URL |
| **Effort** | 2 hours |
| **Test plan** | (1) Define config. (2) Read in scripts. (3) Test deployment. |
| **Acceptance** | Changing R2 bucket requires only config edit. |

### T2-B6: Standardize on ES default exports
| | |
|---|---|
| **ID** | T2-B6 |
| **Title** | Migrate `games.js` (named → default) and `week_NN_real.js` (CommonJS → ES) |
| **Tier** | 2 |
| **Risk** | Medium — touches runtime imports + every AI Tutor file |
| **Files** | `src/data/weeks/week_*/games.js` + `src/data/weeks/week_*_real.js` + `src/data/weeks_easy/week_*/games.js` + all `index.js` consumers + `StoryMissionTab.jsx`, `FreeTalkTab.jsx` |
| **Effort** | 4 hours |
| **Test plan** | (1) Migrate W36 first. (2) Update W35 template. (3) Update W16-W35 deployed weeks (if appropriate). (4) Update index.js consumers. (5) Test runtime. |
| **Acceptance** | All 19 station files use `export default {...}`. Runtime imports simplified. |

### T2-B7: Move CHECK 42 Python script to standalone Node
| | |
|---|---|
| **ID** | T2-B7 |
| **Title** | Replace Python-in-bash CHECK 42 with `tools/validate_dictation_shadowing_verbatim.mjs` |
| **Tier** | 2 |
| **Risk** | Low |
| **Files** | New `tools/validate_dictation_shadowing_verbatim.mjs` + `production_kit/tools/code_quality_gate.sh` (replace CHECK 42) |
| **Effort** | 1 hour |
| **Test plan** | (1) Port Python script to Node. (2) Replace inline block in CHECK 42 with call to standalone. (3) Run on W36. (4) Verify same pass/fail behavior. |
| **Acceptance** | No Python embedded in bash. Same validation coverage. |

### T2-B8: Per-week profile system for question distribution
| | |
|---|---|
| **ID** | T2-B8 |
| **Title** | Add `profile: stem-heavy\|social-heavy\|balanced` to `week_NN_real.js` |
| **Tier** | 2 |
| **Risk** | Medium |
| **Files** | `src/data/weeks/week_*_real.js` + new CHECK for profile consistency |
| **Effort** | 1 day |
| **Test plan** | (1) Add profile field to W35, W36. (2) Add CHECK that logic_science + social_quiz counts match profile. (3) Run on W36. |
| **Acceptance** | Profile is enforced by validator. |

---

## Tier 3: Major Architectural Improvements (Recommended 3+ Months)

### T3-C1: Generic station manifest + dynamic validator
| | |
|---|---|
| **ID** | T3-C1 |
| **Title** | Schema-driven `validate_week.mjs` (replaces 2300-line code_quality_gate.sh) |
| **Tier** | 3 |
| **Risk** | High — major refactor |
| **Files** | `production_kit/config/station_manifest.json` + new `tools/validate_week.mjs` + remove 70% of `code_quality_gate.sh` |
| **Effort** | 2–3 weeks |
| **Dependencies** | T2-B1, T2-B2 |
| **Test plan** | (1) Build manifest from current checks. (2) Generic validator reproduces current behavior. (3) Run on W1-W36 sample. (4) Verify equivalent coverage. (5) Add a new "test station" to manifest to verify generic. |
| **Acceptance** | Adding new station = JSON manifest edit only. |

### T3-C2: Templated week generation
| | |
|---|---|
| **ID** | T3-C2 |
| **Title** | `tools/generate_week.js N` — auto-populate from Syllabus |
| **Tier** | 3 |
| **Risk** | High |
| **Files** | New `tools/generate_week.js` + update week-builder SKILL.md to call it |
| **Effort** | 1 month |
| **Test plan** | (1) Generate W37 from Syllabus. (2) Run validators. (3) Manual review of generated content. (4) Iterate until quality matches human-authored weeks. |
| **Acceptance** | New week starts at 80% completion (vs ~20% with manual clone). |

### T3-C3: LLM-driven content authoring
| | |
|---|---|
| **ID** | T3-C3 |
| **Title** | LLM-driven content generation per station with validator feedback loop |
| **Tier** | 3 |
| **Risk** | High — quality, cost |
| **Files** | New `tools/llm_author_week.js` + per-station prompts + validator feedback |
| **Effort** | 2–3 months |
| **Test plan** | (1) Author vocab.js for test week via LLM. (2) Run validators. (3) Iterate. (4) Once vocab works, extend to grammar, writing, etc. (5) End-to-end test on W37-W40. |
| **Acceptance** | LLM-authored weeks pass all 7 validators with minimal human revision. |

### T3-C4: Replace shell-script validators with Node toolchain
| | |
|---|---|
| **ID** | T3-C4 |
| **Title** | Migrate `code_quality_gate.sh` (2300 lines) to `tools/validate_week.mjs` (Node) |
| **Tier** | 3 |
| **Risk** | Medium-high — replaces stable code |
| **Files** | `production_kit/tools/code_quality_gate.sh` → `tools/validate_week.mjs` |
| **Effort** | 2 weeks |
| **Test plan** | (1) Build Node version that wraps all current CHECKs. (2) Verify identical output for W36. (3) Iterate until diff is empty. (4) Switch production workflow to call Node version. |
| **Acceptance** | Same validators, easier to extend. |

### T3-C5: Runtime state machine for Week Production
| | |
|---|---|
| **ID** | T3-C5 |
| **Title** | Executable `tools/produce_week.mjs` that runs BƯỚC -1 → 11 with checkpoint tracking |
| **Tier** | 3 |
| **Risk** | Medium |
| **Files** | New `tools/produce_week.mjs` + updates to `.ai/memory/CURRENT.md` schema |
| **Effort** | 2 weeks |
| **Test plan** | (1) Run on W37 with full state tracking. (2) Kill mid-process; verify resume from last checkpoint. (3) Verify BLOCKER halts execution. |
| **Acceptance** | Agent can run `node tools/produce_week.mjs 37` and the entire workflow executes. |

---

## Summary Table

| ID | Title | Tier | Risk | Effort |
|---|---|---|---|---|
| T1-A1 | Fix SKILL.md AI Tutor clone path | 1 | Low | 5 min |
| T1-A2 | Add `logic_lab` to CHECK 12 | 1 | Low | 2 min |
| T1-A3 | Document nested station in CHECK 13 | 1 | Very low | 5 min |
| T1-A4 | Deduplicate CHECK 39/40/41 | 1 | Very low | 2 min |
| T1-A5 | Replace CHECK 19 model_sentence check | 1 | Low | 30 min |
| T1-A6 | Move image_prompts to production_kit/prompts/ | 1 | Low | 1 hr |
| T1-A7 | Add week_NN_real.js export-format CHECK | 1 | Low | 15 min |
| T1-A8 | Add writing.js theme-drift CHECK | 1 | Low | 30 min |
| T1-A9 | Add dictation.js `meaning` placeholder CHECK | 1 | Very low | 10 min |
| T1-A10 | Add IPA completeness CHECK | 1 | Low | 15 min |
| T1-A11 | Update CHECK 19.5 for dual-tab | 1 | Low | 20 min |
| T1-A12 | Compute expected image_prompts count | 1 | Low | 1 hr |
| T1-A13 | Add mindmap `type` field CHECK | 1 | Low | 10 min |
| T1-A14 | Add spark_talk.frames.length CHECK | 1 | Low | 5 min |
| T1-A15 | Reorder CHECK 20e-20i before SUMMARY | 1 | Very low | 5 min |
| T2-B1 | Externalize validator magic numbers | 2 | Medium | 1-2 days |
| T2-B2 | Schema-driven CHECK framework | 2 | Medium-high | 1 week |
| T2-B3 | Move YouTube whitelist to config | 2 | Low | 4 hr |
| T2-B4 | Centralize TTS Worker URL | 2 | Low | 4 hr |
| T2-B5 | Externalize R2 CDN base URL | 2 | Low | 2 hr |
| T2-B6 | Standardize on ES default exports | 2 | Medium | 4 hr |
| T2-B7 | Move CHECK 42 Python to Node | 2 | Low | 1 hr |
| T2-B8 | Per-week profile system | 2 | Medium | 1 day |
| T3-C1 | Generic station manifest + dynamic validator | 3 | High | 2-3 weeks |
| T3-C2 | Templated week generation | 3 | High | 1 month |
| T3-C3 | LLM-driven content authoring | 3 | High | 2-3 months |
| T3-C4 | Replace shell-script validators with Node | 3 | Medium-high | 2 weeks |
| T3-C5 | Runtime state machine | 3 | Medium | 2 weeks |

**Total effort estimate:**
- Tier 1: 4 hours (15 items)
- Tier 2: 3 weeks (8 items)
- Tier 3: 4+ months (5 items)

---

## Approval Workflow

For each proposal:

1. **Reviewer reads this doc + linked RUNTIME_RECOMMENDATIONS.md + IMPLEMENTATION_AUDIT.md**
2. **Approver marks Status: APPROVED in this doc**
3. **Implementer picks the item, implements, runs test plan**
4. **After successful test, append `Status: DONE (commit SHA)` to this doc**
5. **If abandoned, append `Status: WONTFIX (reason)`**

---

*Last updated: 2026-07-14*
*Status: AWAITING APPROVAL*
*Approver: TBD*
