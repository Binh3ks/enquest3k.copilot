# Round 89 Forensic Report: Singapore Math 2/5 → 5/5 Expansion (18 Production Weeks)

**Date**: 2026-11-13  
**Status**: COMPLETE & VERIFIED  
**Commit Target**: `round89(math): expand singapore_math 2/5 -> 5/5 across 18 production weeks`  
**Governing Context**: Eradication of the oldest tracked technical debt across 18 live production weeks; 100% compliance with Wave 3 data contract.

---

## 1. Executive Summary

In Round 89, exactly 3 new pedagogical Singapore Math questions were authored and appended to each of the 18 live production weeks that previously suffered from the 2/5 question shortfall:
- **Flyers Band (7 weeks)**: W35, W38, W39, W41, W43, W45, W46
- **PET Band (10 weeks)**: W73, W74, W75, W76, W77, W78, W79, W80, W81, W82
- **B1+ Academic Band (1 week)**: W125

### Invariants Strictly Upheld:
1. **Rule 2 Preserved**: The existing 2 questions (Q1 and Q2) in every week were left **100% untouched**.
2. **Pedagogical Alignment**: Every new question is directly grounded in the week's authentic Theme, CLIL STEM topic, and vocabulary, rather than generic filler.
3. **Data Contract Compliance**: All new questions adhere strictly to the Wave 3 schema (`correctAnswer`, `target_answer`, `problemText`, `question`, `unit`, `hintText`, `steps`, `modelData`), resolving cleanly via `station2Adapters.js` `resolveNumericAnswer` with zero fallback-to-10.
4. **CEFR Math Progression**: Math complexity strictly aligns with CEFR band (Flyers: Grade 3-4 arithmetic, single & compound part-whole/comparison; PET: Grade 5-6 multi-step rate/volume/timelines/biomass/equilibrium; B1+: Grade 6-7 academic proportions/citations/scores).

---

## 2. Per-Week Line Deltas in `skill_practice_hub.js`

| Week | Theme / CLIL Domain | CEFR Level | Before Lines | After Lines | Delta Lines | Math Count |
|:---:|:---|:---:|:---:|:---:|:---:|:---:|
| **W35** | Storytelling Practice 2 (Personal Recount) | A2 Flyers | 138 | 239 | +101 | 5/5 |
| **W38** | Animal Abilities (Modals) | A2 Flyers | 143 | 244 | +101 | 5/5 |
| **W39** | Habitats (Persuasion Intro) | A2 Flyers | 199 | 300 | +101 | 5/5 |
| **W41** | Life Cycles (Process) | A2 Flyers | 199 | 300 | +101 | 5/5 |
| **W43** | The "Plus" Machine (Addition Language) | A2 Flyers | 199 | 300 | +101 | 5/5 |
| **W45** | Shape Detectives (Geometry) | A2 Flyers | 199 | 299 | +100 | 5/5 |
| **W46** | The Pattern Code (Logic) | A2 Flyers | 199 | 300 | +101 | 5/5 |
| **W73** | Science/ELA: The Water Cycle / Math: Volume | B1 Entry | 195 | 300 | +105 | 5/5 |
| **W74** | Science/ELA: Food Chains / Math: Complex Charts | B1 PET | 195 | 300 | +105 | 5/5 |
| **W75** | History/ELA: Ancient Egypt / Math: Timelines | B1 PET | 195 | 296 | +101 | 5/5 |
| **W76** | History/ELA: Explorers / Math: Map Scales | B1 PET | 105 | 291 | +186 | 5/5 |
| **W77** | Social Studies/ELA: World Landmarks / Math: 3D Geometry | B1 PET | 195 | 296 | +101 | 5/5 |
| **W78** | Social Studies/ELA: Cultures / Math: Surveys | B1 PET | 143 | 244 | +101 | 5/5 |
| **W79** | Space Exploration vs Earth Restoration (Micro-Debate 2) | B1 PET | 195 | 296 | +101 | 5/5 |
| **W80** | Supply, Demand & Market Prices / Economics | B1 PET | 105 | 291 | +186 | 5/5 |
| **W81** | ELA: The Master Architect (Structure) / Math: Graphing | B1 PET | 195 | 296 | +101 | 5/5 |
| **W82** | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | B1 PET | 195 | 296 | +101 | 5/5 |
| **W125**| Intro & Conclusion (Academic Essay Structure) | B1+ Academic | 143 | 244 | +101 | 5/5 |

---

## 3. Automated Regression & G-GEN Gates Verification

We executed `scripts/verify_round89_math_regression.mjs` against all 18 updated files in production:

```
========================================================================
FINAL REGRESSION SUMMARY
========================================================================
Total Weeks Audited:             18/18
Total Math Questions Audited:    90/90 (5 per week * 18 weeks)
Adapter-Resolved Answers:        90/90 (100% resolved via station2Adapters.js)
Fallback-to-10 Violations:       0 (MUST BE 0)
Vietnamese Diacritic Leaks:      0 (MUST BE 0)
Boilerplate Leaks:               0 (MUST BE 0)
ESL Collocation Anomalies:       0 (MUST BE 0)
Schema Errors:                   0 (MUST BE 0)

🎉 ALL 18 WEEKS PASSED 100% OF MATH REGRESSION & G-GEN AUDIT GATES!
```

---

## 4. Proposed Treatment for W36 and W37 (Flagged for Claude QA Ruling)

Per task instructions, W36 and W37 were NOT batched into this 18-week pass because both currently have 0/5 math and represent distinct architectural special cases:

### 4.1 Week 36 (Capstone Review & Project: "My Adventure Book")
- **Curriculum Context**: W36 marks the end of Phase 1 (A1 Movers Graduation). Its pedagogical objective is an integrative Capstone Review & Story Project ("My Adventure Book") where students synthesize 18 weeks of grammar and vocabulary into an illustrated narrative.
- **Current State**: `skill_practice_hub.js` exists with grammar drills and writing review, but `singapore_math` is `undefined`.
- **Proposed Treatment for Claude QA Ruling**:
  - **Option (a) [Recommended]**: Formally define an architectural exemption for Capstone Project weeks (`singapore_math: []` or integrated into `story_writer`), documenting in the syllabus that W36 Zone 3 utilizes integrative project challenges rather than standalone math drills.
  - **Option (b)**: Author 5 comprehensive "Movers Capstone Review" math problems (synthesizing distance, time, speed, and inventory counts from W19–W35).

### 4.2 Week 37 (Legacy Mock Test Container → Content Week: "Living vs. Non-Living")
- **Curriculum Context**: In the legacy build, W37 was generated as an old-cadence Full Mock week (`theme: undefined, math: undefined`). Under the finalized additive mock architecture (Owner Decision 2 & Digital Map v2.2), W37 is restored as an authentic content week:
  `Living vs. Non-Living (Reasoning) | A2 Flyers · Rotary 1 | Vật sống & Không sống: Explain why something is living or non-living using "Because"`
- **Current State**: `src/data/weeks/week_37/skill_practice_hub.js` is an empty mock wrapper.
- **Proposed Treatment for Claude QA Ruling**:
  - Do NOT patch 5 math problems onto a hollow mock container.
  - Schedule Week 37 for **full content regeneration** in Wave 4 (authoring complete reading, listening, writing, speaking, and 5/5 math hubs grounded in the "Living vs. Non-Living" syllabus).

---

## 5. Verification Checkpoints

| Checkpoint | Result | Evidence |
|---|---|---|
| 18 weeks expanded 2/5 → 5/5 | ✅ PASS | Verified via `scripts/verify_round89_math_regression.mjs` (90/90 questions) |
| Zero fallback-to-10 | ✅ PASS | 100% resolved via `station2Adapters.js` `resolveNumericAnswer` |
| Zero ESL collocation anomalies | ✅ PASS | G-GEN-16 scan clean across all 18 files |
| Zero Vietnamese in English fields | ✅ PASS | Regex check clean across all 90 items |
| W33 Golden Master integrity | ✅ PASS | `npm run guard:freeze:w33` exits 0 (147/147 locked) |
| Global governance integrity | ✅ PASS | `npm run guard:governance` exits 0 (3/3 locked) |
