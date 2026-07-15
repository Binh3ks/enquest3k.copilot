# RUNTIME_RECOMMENDATIONS.md — Prioritized Migration Roadmap

> **Date:** 2026-07-14
> **Goal:** How the Week Production Runtime should evolve to survive Blueprint evolution.
> **Priority:** Low risk first. High impact next. Major refactors last.
> **Format:** Each recommendation includes: **Problem / Impact / Action / Risk / Effort**

---

## 0. Top-Level Recommendation

**The current Runtime (the validator suite + week-builder SKILL.md) is mature and robust, but it's growing organically.** Every new Blueprint version adds:
- 1 new validator (e.g., CHECK 39, 40, 41 for W23 features)
- 5–10 new magic numbers in shell scripts
- 1 new clause in never_rules/

**Without a refactor, by W156 production we'll have ~150+ checks and ~30 validator scripts. That's unmaintainable.**

The solution is **a generic schema-driven Runtime** that:
1. Reads each station's expected schema from a single manifest
2. Dynamically generates validators from the manifest
3. Enforces only **what is structurally required**, not magic numbers
4. Allows Blueprint to grow without Runtime rewrites

**But that's a multi-month refactor.** This document proposes **incremental** low-risk improvements first, organized by priority tier.

---

## Tier 1: Quick Wins (Low Risk, High Value) — Weeks to do

### A1. Fix `week_NN_real.js` location in week-builder SKILL.md
**Problem:** BƯỚC 0 step 9 in `week-builder/SKILL.md` clones to root `src/data/weeks/week_NN_real.js`, but NEVER_RULES B6 mandates subfolder.
**Impact:** Future weeks following the SKILL will get the BUG-W28 "No sentence available" PronunciationTab failure.
**Action:** Patch week-builder/SKILL.md BƯỚC 0 step 9 to clone to `src/data/weeks/week_NN/week_NN_real.js`.
**Risk:** Low — single file edit; runtime already supports both paths.
**Effort:** 5 minutes.

### A2. Update CHECK 12 to require 7 voiceConfig keys (add `logic_lab`)
**Problem:** CHECK 12 enforces 6 keys but W36 production uses 7. The 7th (`logic_lab`) was added retroactively.
**Impact:** Future weeks adding new stations will silently miss voiceConfig keys.
**Action:** Update CHECK 12 to require 7 keys.
**Risk:** Low — additive check; won't break existing weeks.
**Effort:** 2 minutes.

### A3. Add `social_quiz` to CHECK 13 stations list
**Problem:** CHECK 13 requires 14 station keys; doesn't list `social_quiz` explicitly (it's nested under `logic_lab`).
**Impact:** Stations wired as nested objects (`logic_lab: {logic_lab, singapore_math, social_quiz}`) work, but flat `social_quiz: social_quiz` would FAIL.
**Action:** Document the nested-station convention in CHECK 13.
**Risk:** Low — clarification.
**Effort:** 5 minutes.

### A4. Deduplicate CHECK 39/40/41 in code_quality_gate.sh
**Problem:** Lines 1720-1840 and 1812-1898 contain duplicate CHECK 39 (conversation_cards), CHECK 40 (image_prompts no barmodel_), CHECK 41 (R2 CDN).
**Impact:** Each duplicate run inflates error count; check 39/40/41 errors count twice.
**Action:** Remove the second copy (lines 1810-1898).
**Risk:** Very low — identical code.
**Effort:** 2 minutes.

### A5. Replace CHECK 19 with proper Node.js evaluation
**Problem:** CHECK 19 reads `model_sentence` via `grep | sed | wc -c` — counts characters on the LINE, not in the whole multi-line string. A multi-line `model_sentence` could pass line-length checks but contain insufficient total content.
**Impact:** Silent under-validation.
**Action:** Replace with a Node.js script that loads `writing.js` and counts `model_sentence.length`.
**Risk:** Low — same intent, more correct.
**Effort:** 30 minutes.

### A6. Move image_prompts files out of Production_FINAL/ to canonical location
**Problem:** CHECK 25 + CHECK 40 reference `Production_FINAL/IMAGE PROMPTS/week_NN_image_prompts.txt`. That directory is **archived** per current `gitStatus` and `.ai/architecture/cleanup`.
**Impact:** Future weeks following the canonical workflow will not find the prompts file; CHECK 25 will SKIP silently.
**Action:** Move `Production_FINAL/IMAGE PROMPTS/` to `production_kit/prompts/week_NN/` and update CHECK 25 + CHECK 23c + CHECK 40 paths.
**Risk:** Low — directory migration; git tracks moves.
**Effort:** 1 hour.

### A7. Add `week_NN_real.js` export-format validator
**Problem:** `week_NN_real.js` uses CommonJS (`module.exports = ...`); all other week files use ES default. Runtime handles both but is defensive.
**Impact:** Inconsistency; future tree-shaking or import refactors may break.
**Action:** Add CHECK that `week_NN_real.js` exports via ES `export default ...` (or document CommonJS as legacy).
**Risk:** Low.
**Effort:** 15 minutes.

### A8. Add writing.js theme-drift CHECK
**Problem:** W35 ADV writing.js has theme `"personal_growth"` but W35 is on Environmental Issues. No validator catches this.
**Impact:** Students see off-topic content. (Current bug exists.)
**Action:** Add CHECK that compares `writing.js` theme/title against `read.js` week title or `week_NN_real.js` topic.
**Risk:** Low — heuristic check.
**Effort:** 30 minutes.

### A9. Add dictation.js `meaning` placeholder CHECK
**Problem:** W36 ADV dictation.js has `meaning: "Vietnamese meaning here"` for all 10 entries (literal placeholder).
**Impact:** Students see English in Vietnamese meaning slot.
**Action:** Add CHECK that fails if `meaning: "Vietnamese meaning here"` is found.
**Risk:** Very low.
**Effort:** 10 minutes.

### A10. Add IPA completeness CHECK
**Problem:** W36 ADV shadowing_ipa.js has only 6 of 12 sentences. Runtime falls back to CMU dict — silently degraded.
**Impact:** Inconsistent pronunciation display.
**Action:** Add CHECK that `Object.keys(shadowing_ipa).length === shadowing.script.length`.
**Risk:** Low.
**Effort:** 15 minutes.

### A11. Update CHECK 19.5 to count `read_stem` + `read_social` comprehension questions
**Problem:** W36 has 4 questions in `read_stem.comprehension_questions` + 4 in `read_social.comprehension_questions` = 8 total. CHECK 19.5 only counts the FLAT `comprehension_questions[]` field, missing the dual-tab questions.
**Impact:** Dual-tab weeks may have wrong question counts undetected.
**Action:** Update CHECK 19.5 to also count sub-tab question arrays for W36+ weeks.
**Risk:** Low.
**Effort:** 20 minutes.

### A12. Compute expected image_prompts count from vocab.js + word_power.js instead of magic 26
**Problem:** CHECK 25 hardcodes 26 prompts for W<20 and 21 for W20+.
**Impact:** Adding a new vocab word doesn't update the expected count.
**Action:** Compute expected count: `vocab.length + word_power.length + 2 covers + bar_models` and compare against `Filename:` count in prompts file.
**Risk:** Low.
**Effort:** 1 hour.

### A13. Add `type` field CHECK for mindmap stems
**Problem:** Pending restructure May 23, 2026 says stems need `type: affirmative/negative/question`. W36 ships with it. No validator.
**Impact:** Stems may be missing the field in future weeks.
**Action:** Add CHECK that every `centerStems[].type` is one of the 3 allowed values.
**Risk:** Low.
**Effort:** 10 minutes.

### A14. Add CHECK that `spark_talk.frames.length >= 8`
**Problem:** Runtime needs ≥8 frames for proper cycling. No validator enforces this.
**Impact:** Insufficient frames break cycling.
**Action:** Add to CHECK 16 or new CHECK.
**Risk:** Low.
**Effort:** 5 minutes.

### A15. Reorder CHECK 20e-20i to come before SUMMARY
**Problem:** CHECK 20e-20i appear after the SUMMARY block at lines 2134-2278, so they may not run if the script exits early.
**Impact:** Bold sub-checks silently skipped.
**Action:** Move CHECK 20e-20i before line 2281 (SUMMARY).
**Risk:** Very low.
**Effort:** 5 minutes.

---

## Tier 2: Structural Improvements (Medium Risk, High Value) — Weeks to months

### B1. Externalize validator magic numbers to a config file
**Problem:** Many checks hardcode magic numbers (3 for W1-16 comprehension, 4 for W17+, 6/8 word_power, 18 vocab W28+, 20 grammar, 36 mindmap audios, 26/21 image prompts, etc.).
**Impact:** Adding a new week range (e.g., W60+) requires touching many validators.
**Action:** Create `production_kit/config/validator_thresholds.json` with all magic numbers. Refactor validators to read from JSON.
**Risk:** Medium — touches many files; needs regression testing.
**Effort:** 1–2 days.

### B2. Schema-driven CHECK framework
**Problem:** Each station has its own CHECK block with bespoke logic. New station = new CHECK.
**Impact:** Validator suite grows unboundedly.
**Action:** Define `production_kit/config/station_schemas.json` with each station's required fields, types, count rules, cross-station refs. Write a generic CHECK script that reads the manifest and validates.
**Risk:** Medium-high — significant refactor.
**Effort:** 1 week.

### B3. Move hardcoded 60-channel YouTube whitelist to config
**Problem:** Whitelist embedded in `tools/update_videos.js`.
**Action:** Extract to `production_kit/config/youtube_whitelist.json`. Allow per-week overrides via `video_queries.json`.
**Risk:** Low.
**Effort:** 4 hours.

### B4. Centralize TTS Worker URL configuration
**Problem:** Two implementations share the env var but diverge on fallback (Shadowing.jsx has empty fallback; voiceService.js has hardcoded URL).
**Action:** Single source of truth in `production_kit/config/tts_config.json` or `voiceService.js` constant. Both services import.
**Risk:** Low.
**Effort:** 4 hours.

### B5. Externalize R2 CDN base URL
**Problem:** CHECK 41 hardcodes `https://pub-6b5486dcbb554a6694b6c7032a43dcae.r2.dev/`.
**Action:** Externalize to `production_kit/config/r2_config.json`.
**Risk:** Low.
**Effort:** 2 hours.

### B6. Fix the dual-mode export inconsistency
**Problem:** 18 of 19 files use `export default {...}`. `games.js` uses named export. `week_NN_real.js` uses CommonJS.
**Action:** Standardize on ES default export. Migrate `games.js` to default export + rename consumption; migrate `week_NN_real.js` to ES.
**Risk:** Medium — touches runtime imports.
**Effort:** 4 hours.

### B7. Replace Python-in-bash CHECK 42 with pure Node.js
**Problem:** `code_quality_gate.sh` CHECK 42 embeds a Python script to validate dictation/shadowing verbatim. Python in bash is a smell.
**Action:** Move CHECK 42 logic to a standalone `tools/validate_dictation_shadowing_verbatim.mjs` Node script. Have `code_quality_gate.sh` call it.
**Risk:** Low.
**Effort:** 1 hour.

### B8. Add per-week profile system for question distribution
**Problem:** Blueprint §3.3 defines STEM-heavy/Social-heavy/Balanced profiles. No validator uses them.
**Action:** Add `week_NN_real.js` field `profile: "stem-heavy" | "social-heavy" | "balanced"`. Validators check that Logic & Science + Social Quiz counts match the profile.
**Risk:** Medium.
**Effort:** 1 day.

---

## Tier 3: Major Architectural Improvements (High Risk, Transformative) — Months

### C1. Generic station manifest + dynamic validator
**Problem:** Validators are station-specific. New station = new validator block.
**Action:** Define a manifest schema in `production_kit/config/station_manifest.json`:
```json
{
  "stations": {
    "vocab": {
      "file": "vocab.js",
      "schema": {
        "vocab[]": {
          "fields": ["id:int", "word:string", "pronunciation:string", "definition_vi:string", "definition_en:string", "example:string", "collocation:string", "image_url:string", "audio_word:string"]
        }
      },
      "rules": {
        "min_count": 18,
        "max_count": 18,
        "validate_image_files": true
      }
    }
  }
}
```
Write one generic `validate_week.mjs` that reads the manifest, loads each station file, and validates against the schema.
**Risk:** High — major refactor of validation suite.
**Effort:** 2–3 weeks.

### C2. Templated week generation from Blueprint §III/§VI specs
**Problem:** Author writes each week by hand following the week-builder SKILL.md. Repetitive + error-prone.
**Action:** Add a `tools/generate_week.js N` tool that:
1. Reads Syllabus for week N (grammar focus, vocab, topic)
2. Reads Blueprint spec for week range N (chunk-first rules, word counts, etc.)
3. Clones W36 golden standard
4. Auto-populates content from Syllabus
5. Runs validators
6. Reports what human still needs to author
**Risk:** High — large new tool.
**Effort:** 1 month.

### C3. LLM-driven content authoring
**Problem:** All content currently written by human (or content-writer subagent).
**Action:** Add LLM-driven content generation for each station: prompts per station, constraints, validators as feedback loop. Human reviews + accepts.
**Risk:** High — quality risk; expensive API calls.
**Effort:** 2–3 months.

### C4. Replace all shell-script validators with Node.js/Python toolchain
**Problem:** `code_quality_gate.sh` is 2300 lines of bash + grep + sed + awk + python + node. Hard to maintain.
**Action:** Migrate to a Node.js toolchain using `commander` + `chalk`. One tool, multiple subcommands.
**Risk:** Medium-high — replaces stable, working code.
**Effort:** 2 weeks.

### C5. Runtime state machine for Week Production
**Problem:** `.ai/agents/week-production/*.md` describe a 10-checkpoint state machine but it's documentation only — no executable runtime tracks state.
**Action:** Build `tools/produce_week.mjs` as an executable state machine that:
1. Reads `.ai/memory/CURRENT.md` for resume state
2. Runs each BƯỚC in sequence
3. Records checkpoint after each
4. Surfaces BLOCKER immediately
5. Re-runs only failing validators on FIX-THEN-SHIP cycle
**Risk:** Medium.
**Effort:** 2 weeks.

---

## 4. Generic vs Specific: Design Principles

When evaluating a recommendation, ask:

1. **Is this magic number global or per-week?**
   - Global → externalize to config
   - Per-week → put in `week_NN_real.js` or `video_queries.json`

2. **Is this rule structural or quality?**
   - Structural (must have field X) → encode in schema manifest
   - Quality (chunk-first bolding) → encode in linter

3. **Is this validation generic across all weeks or specific to a range?**
   - Generic → use week-builder SKILL.md as the spec
   - Range-specific → use week-range conditions in validators (already done)

4. **Is this a Blueprint rule or an implementation convention?**
   - Blueprint rule → enforced by validators, documented in Blueprint
   - Implementation convention → documented in code comments, not necessarily enforced

---

## 5. Recommended Execution Order

| Week | Tier | Items | Cumulative Effort |
|------|------|-------|-------------------|
| Week 0 | T1 | A1, A2, A3, A4, A9, A10, A14, A15 | 1 hour |
| Week 1 | T1 | A5, A7, A8, A11, A13 | 2 hours |
| Week 2 | T1 | A6, A12 | 1.5 days |
| Week 3–4 | T2 | B1, B3, B4, B5, B7 | 1 week |
| Week 5–6 | T2 | B2, B6, B8 | 2 weeks |
| Month 2 | T3 | C4, C5 | 1 month |
| Month 3+ | T3 | C1, C2, C3 | 3+ months |

---

## 6. What NOT to Refactor

Some patterns are fine as-is and changing them would be churn:

| Pattern | Why leave alone |
|---------|-----------------|
| Week data in `src/data/weeks/week_NN/*.js` ES modules | Runtime is well-tested; refactor risk is high |
| BƯỚC -1 → 11 workflow | Documented everywhere; change breaks documentation |
| Mindmap `centerStems[]` + `branchLabels{}` shape | W36 conforms; changing would touch every deployed week |
| Validator `bash + grep + sed` style for 90% of checks | It's brittle but works; full Node migration is C4 |
| Image prompt file format (`Filename:` markers) | Production scripts already parse it |

---

## 7. Critical Success Factors

1. **Every change must ship with tests.** No exceptions.
2. **Backward compatibility for deployed weeks is non-negotiable.** W1–W35 must continue to pass.
3. **Document every change in `production_kit/CHANGELOG.md`** (new file).
4. **Run the full validator suite on a reference week (W36) after every change.**
5. **Update CLAUDE.md when validators change** — it's the runtime context for all agents.

---

*Last updated: 2026-07-14*
*Author: Audit Agent*
*Approver: TBD*
