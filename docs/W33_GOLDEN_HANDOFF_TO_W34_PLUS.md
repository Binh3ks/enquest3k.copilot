# 🚀 W33 GOLDEN HANDOFF TO W34+ & GAMIFICATION PIPELINE
**Standard Version:** 1.0.0 (Golden Master Frozen)  
**Effective Date:** 2026-08-28  
**Governing Roles:** ChatGPT (Strategic QA / Reviewer) & Antigravity (Investigator / Implementer)

---

## A. WHAT IS NOW TRUSTED

1. **Architecture & Task Routing:** Exactly 15 tasks across 5 days (3 quests/day) and 4 learning zones mapping to 5 canonical data hub files (`reading_hub.js`, `listening_hub.js`, `writing_hub.js`, `speaking_hub.js`, `skill_practice_hub.js`).
2. **Cambridge Two-Play Audio State Machine:** Verified in `useFlyersListeningPlayer.js` with official Cambridge rubric recordings (`"Now listen to Part X again."` → 3s pause → `"That is the end of Part X."`).
3. **Multi-Voice Profile Allocation:** Adult Examiner Female (`en-US-Neural2-F`, pitch -1.5, rate 0.86), Male Student Jake (`en-US-Neural2-D`), Child Student Mia (`en-US-Neural2-C`, pitch +4.0).
4. **Data-Layer Invariants:**
   - L1: Maria with mop at coords (71, 70) verified via Whisper ASR.
   - L5: Yellow Notebook (Example) and Nurse's Room Door (Red, Target 5) aligned 100% across data, script, audio MP3, and SVG coloring UI.
   - S2: Canonical `table_a.fields` (Candidate Card) and `table_b.fields` (Examiner Card with audio URLs).
   - R2: Canonical `dialogue` (5 turns) + `options` (8 choices).
5. **Quality & Regression Automation:** 11 automated checks unified under `npm run audit:golden:w33` exiting 0 with SHA-256 cryptographic freeze protection.

---

## B. WHAT IS FROZEN (MUST NOT CHANGE WITHOUT EXPLICIT RE-OPEN)

1. **W33 Pedagogical Content:** Story scenes, CLIL article, vocabulary definitions, audio scripts, and Cambridge question sets.
2. **W33 Math Content:** 5 Singapore Bar Model SVG problems and numerical configurations.
3. **Assessment Scoring Logic:** 5 Cambridge Shields scoring rubrics, worked examples, and distractor tolerance.
4. **Media Mappings:** 44 static MP3 assets in `public/audio/week33/` and referenced URLs.
5. **Data File Hashes:** Hashes locked in `docs/W33_GOLDEN_FREEZE_MANIFEST.json` and guarded by `scripts/guard_golden_w33_freeze.mjs`.

---

## C. WHAT IS REUSABLE AS A STANDARD

1. **10-Gate Quality Suite:** All 10 gates (Gates 3, 4, 8, 10, 11, 12, 13, 15, 16, 17) apply directly to W34+.
2. **No-Fallback Doctrine:** Component UI must fail loudly rather than silently rendering fallback mock arrays.
3. **Zero-Live-TTS Standard:** 100% pre-generated static MP3 assets deployed prior to release.
4. **CEFR Staging Framework:** Stage 1 Young Learners (Starters/Movers/Flyers) with KET extension monitoring (WARN, not silent bypass) and strict B2/C1 jargon prohibition.
5. **Rotary Boss Cycle Standard:** Trailing 4-week rotating shield cycle (Cycles 1–4) followed by Week 5 Full Mock Exam (16 parts).

---

## D. WHAT FUTURE WEEKS MUST NOT COPY BLINDLY

1. **Do NOT hardcode W33 themes:** W34 has its own Syllabus theme, STEM topic, and vocabulary.
2. **Do NOT reuse W33 character coordinates:** L1 pins and S1 hotspot calibrations must be recalculated per week's unique scene illustrations.
3. **Do NOT copy W33 Shield rotation:** W34 is **Cycle 2** (tested skills: `listening_p4`, `listening_p5`, `rw_p1`, `speaking_p1`), whereas W33 is **Cycle 1** (`listening_p1`, `listening_p2`, `listening_p3`). Always query `getBossRotaryConfig(weekNumber)`.
4. **Do NOT reuse video IDs:** Video challenges must have unique video IDs with dedicated transcript JSONs.

---

## E. REQUIRED QUALITY GATES FOR W34+

Every weekly release must pass:
```bash
# 1. Media & Chunks
node scripts/gate3_media_integrity.mjs NN
node scripts/gate4_chunk_bolding.mjs NN

# 2. Fail-Loud Sweep & CEFR Staging
node scripts/gate8_no_fallback_sweep.mjs NN
node scripts/cefr_curriculum_guard.mjs NN

# 3. Content Quality & Invariants
node scripts/gate10_example_grammaticality.mjs NN
node scripts/gate11_content_richness.mjs NN
node scripts/gate13_rotary_schedule.mjs NN

# 4. Cambridge Fidelity & Production DOM
node scripts/gate16_content_quality.mjs NN
node scripts/gate17_fidelity_doctrine.mjs NN
node scripts/gate15_production_dom_assertions.mjs NN

# 5. Master Suite & Build
npm run audit:week NN
npm run build
```

---

## F. REQUIRED EVIDENCE FOR CLOSURE

Every issue follows the strict lifecycle:
`DISCOVERED → FIXED → VERIFIED → CLOSED`

- **Rule:** `FIXED ≠ VERIFIED ≠ CLOSED`.
- **Evidence Requirement:** A passing validator that was modified as part of the fix is **NOT** sufficient independent evidence. High-risk issues require multimodal evidence (e.g. Whisper ASR for audio, fresh Playwright DOM assertions for runtime, adversarial meta-validation for schema).

---

## G. RULES FOR GAME LAYER INTEGRATION

```text
╔══════════════════════════════════════════════════════════════════════╗
║                         GAME LAYER (ORCHESTRATION)                   ║
║  (XP Economy, Streaks, Badges, Level Progression, Mascot Shop)       ║
╚══════════════════════════════════════════════════════════════════════╝
                                  │
                                  ▼ (may motivate, reward, visualize)
╔══════════════════════════════════════════════════════════════════════╗
║               LEARNING & ASSESSMENT CORE (AUTHORITATIVE)             ║
║  (5 Hubs Data, Cambridge Invariants, 5 Shields, CEFR A2 Staging)     ║
╚══════════════════════════════════════════════════════════════════════╝
```

**Non-Negotiable Boundaries:**
- The Game Layer must **NEVER** alter learning targets, change assessment answers, modify Cambridge mechanics, or replace canonical learning data.
- Gamification is an orchestration layer, not a second source of truth.

---

## H. RULES FOR CAMBRIDGE PRACTICE VS EXACT ASSESSMENT FIDELITY

> ⚠️ **"Cambridge-aligned practice does not mean every practice task must replicate the Cambridge exam format."**
>
> ⚠️ **"Exact Cambridge Flyers format is mandatory for active Flyers Shields and the full Mock Test."**

- **Quests 1–4 (Days 1–4):** Learning & Practice Content. Flexible, age-appropriate, scaffolded, and communicative.
- **Quest 5 (Day 5):** Boss Castle / Assessment. Strict Cambridge exam mechanics, two-play listening loops, worked examples, and shield rubrics.

---

## I. RULES FOR MODIFYING VALIDATORS

1. If a validator is modified, its strictness must be independently proven via an **adversarial negative test suite** showing it actively rejects malformed/missing data.
2. Modifying a validator to allow looser data formats requires major version bump in `schemas/cambridge-flyers-fidelity-doctrine.schema.json`.

---

## J. RULES FOR REOPENING W33

W33 is under strict change control. The only permissible procedure for modifying W33 is:
`CHANGE REQUEST` → `IMPACT ANALYSIS` → `EXPLICIT RE-OPEN` → `MODIFICATION` → `INDEPENDENT VERIFICATION` → `REGRESSION` → `RE-FREEZE`.

---

## K. FIRST SAFE ENTRY POINT FOR W34+ DEVELOPMENT

1. **Gamification Layer Design:** Implement XP, badges, and streaks on top of the established `QUEST_SCHEDULE` without modifying hub data contracts.
2. **W34 Content Authoring:** Query `getBossRotaryConfig(34)` (Cycle 2: L4, L5, R1, S1) and draft 5 Hubs following the Golden Template in `production_kit/workflow/week_pipeline_sop.md`.
