# SCALING READINESS REPORT: Giai Đoạn 2 Automated Content Pipeline (Round 62)

## I. CURRICULUM BACKLOG & STRUCTURAL AUDIT

A complete programmatic census across all 156 `blueprint.json` files in `src/data/weeks/` reveals the following architectural landscape:

```
Total Curriculum Scope:         156 Weeks
Currently Authored (4 Hubs):      8 Weeks (W33, W34, W35, W36, W37, W38, W78, W125)
Un-authored Backlog:            148 Weeks
```

### 1. Breakdown by CEFR Level
| CEFR Level | Target Audience | Total Weeks | Authored | Un-authored | Notes |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Pre-A1 Starters** | Ages 6–7 (Grade 1–2) | 14 | 0 | 14 | Operates under **Lite Mode** (W01–W14) |
| **A1 Movers** | Ages 7–8 (Grade 2–3) | 15 | 0 | 15 | W15–W16 Lite Mode; W17–W29 Full 15-Quest |
| **A2 Flyers** | Ages 8–10 (Grade 4–5) | 67 | 6 | 61 | Core rotary practice; tested in W33, W34, W35, W38 |
| **B1 PET** | Ages 11–13 (Lower Sec) | 31 | 1 | 30 | Secondary bridge; tested in W78 |
| **B1+ Academic** | Ages 13–15 (Upper Sec) | 29 | 1 | 28 | Advanced academic rhetoric; tested in W125 |

### 2. Breakdown by Delivery Architecture (`week_type`)
| Delivery Mode | Count | Distribution | Invariant Specifications |
| :--- | :---: | :--- | :--- |
| **Rotary Practice** | **128** | Standard teaching weeks | 5 Zones / 15 Quests / 4 Hubs (CLIL, Shadowing, Mini-Games, Studio) |
| **Full Mock Exam** | **26** | Cyclic (every 5–6 weeks) | Strict Cambridge Test Papers (L1–5, RW1–7, S1–4) without mini-games |
| **Standard Baseline** | **2** | Legacy test references | Transitioned to standard rotary schema |

---

## II. CRITICAL STRUCTURAL VARIANTS (CANNOT RUN UNATTENDED)

`generate_giaidoan2_content.mjs` was thoroughly validated on 4 pilot weeks (W35, W38, W78, W125), proving that the core generative architecture is robust for **standard rotary practice weeks**. However, running the engine completely **unattended** across the entire 148-week backlog is **STRONGLY DISADVISED** due to three distinct structural variants:

### 1. Variant 1: Lite Mode Exception (Weeks 01–16)
- **Invariant (AGENTS.md §9 & MASTER_ARCHITECTURE_W01_W156.md):**
  Tuần 01–16 (Pre-A1 Starters & Early Movers, ages 6–7) operate in **10 Quests / 5 Zones (2 Quests/Day)** mode to accommodate the shorter attention spans and cognitive loads of young children.
- **Differences:**
  - 5 quests are omitted or merged: `gear3_retell` → merged into `gear2_karaoke`; `science_report` → Draw & Say; `math_quest` → Count & Match; `broadcast_studio` → Listen & Repeat; `boss_reading` → merged into `boss_listening`.
  - Vocab target is 10–12 words (not 20 words).
  - CLIL reading passages are 40–60 words (not 90–200 words).
- **Readiness:** The current generator is configured **strictly for 15-quest weeks** (W17+). Running it on W01–W16 would violate the Lite Mode architectural invariant.

### 2. Variant 2: Full Mock Exam Weeks (26 Weeks)
- **Inventory of Mock Weeks (26):**
  `W16, W24, W32, W37, W42, W47, W52, W57, W62, W67, W72, W77, W82, W87, W92, W97, W102, W107, W112, W127, W132, W137, W142, W147, W152, W156`
- **Differences:**
  - Blueprints specify `isFullMock: true` and `week_type: "full_mock"`.
  - Full Mock Exam weeks do NOT contain normal pedagogical stations (no Singapore Math, no Action Lab, no Webtoon story scenes).
  - They require authentic exam test sections: 5 Listening parts with timing, 6–7 Reading & Writing parts, and official scoring rubrics.
- **Readiness:** The current generator does not contain mock exam templates. Unattended generation would overwrite mock exam blueprints with inappropriate rotary practice hubs.

### 3. Variant 3: Stage 1 (A2) vs Stage 2 (B1/B2) Lexical & Syntactic Divergence
- **Lesson Learned in Round 62:**
  During today's test, `cefr_curriculum_guard.mjs` caught `furthermore` in Week 38 (Stage 1 A2 Flyers). Stage 1 (W01–W72) strictly enforces `STAGE1_BANNED_ACADEMIC_JARGON` (e.g. `furthermore`, `moreover`, `consequently`, `mechanism`, etc.) and a 24-word maximum sentence length to protect 8–10 year olds. Stage 2 (W73–W156) actively requires academic transition markers and longer complex sentences.
- **Readiness:** The generator now incorporates clean A2 connectors for Stage 1, but running unattended without automated CEFR vocabulary gating could allow B1 academic bleed into A2 weeks.

---

## III. PROPOSED SCALING STRATEGY & BATCH WAVE PROPOSAL

To maintain the highest ESL pedagogical rigor while safely accelerating production, generation should proceed in **phased, CEFR-homogenous batch waves** with per-wave Claude review:

### Wave 1: Immediate Candidate — A2 Flyers Rotary Practice (7 Weeks)
- **Target Weeks:** `W39, W40, W41, W43, W44, W45, W46`
  *(Note: W42 is intentionally skipped as it is a Full Mock Exam).*
- **Rationale:**
  - Identical CEFR level (A2 Flyers) and structural format as W35 and W38.
  - Zero mock exam complications.
  - Allows immediate testing of the upgraded 10 mechanical quality gates + CEFR guard on a coherent batch.
- **Batch Size:** 7 weeks (56 staged files).

### Wave 2: Lower Secondary B1 PET Rotary Practice (7 Weeks)
- **Target Weeks:** `W73, W74, W75, W76, W79, W80, W81`
  *(Note: W77 skipped — Full Mock Exam; W78 already authored).*
- **Rationale:** Expands the validated B1 architecture (W78) to a contiguous sequence of school/culture themes.
- **Batch Size:** 7 weeks (56 staged files).

### Wave 3: Upper Secondary B1+ Academic Rotary Practice (6 Weeks)
- **Target Weeks:** `W126, W128, W129, W130, W131, W133`
  *(Note: W127 & W132 skipped — Full Mock Exams; W125 already authored).*
- **Rationale:** Deepens the academic rhetoric / essay synthesis model validated in W125.
- **Batch Size:** 6 weeks (48 staged files).

### Wave 4: Lite Mode Engine Development (Pre-A1 Starters W01–W16)
- Prior to generating W01–W16, extend `generate_giaidoan2_content.mjs` with a dedicated `--lite` flag implementing the 10-quest / 5-zone schema and 10-word vocabulary baseline.

### Wave 5: Mock Exam Paper Engine Development (26 Mock Weeks)
- Design a specialized Cambridge Mock Exam generator to produce authentic test papers for the 26 cyclic assessment weeks.

---

## IV. CONCLUSION

`generate_giaidoan2_content.mjs` is **production-ready for Wave 1 (A2 Flyers Rotary Practice: W39–W46)** under controlled batch execution. Unattended generation across all 148 weeks should not be attempted until Wave 4 (Lite Mode) and Wave 5 (Mock Exams) receive dedicated generator engines.
