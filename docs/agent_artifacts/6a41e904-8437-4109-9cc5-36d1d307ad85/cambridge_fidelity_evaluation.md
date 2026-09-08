# Cambridge A2 Flyers — Zone 4 (Day 5) Fidelity Evaluation
## W33-W72 Architecture Assessment & Fix Roadmap

> Generated: 2026-08-25 | Scope: boss_listening, boss_reading, weekly_review in BossBattleZone.jsx

---

## 1. STRATEGIC CONTEXT: W33-W72 AS FLYERS PREP TRACK

The design goal is **dual achievement**:
1. **Flyers-format proficiency** (daily practice of all 16 Cambridge parts via the rotary cycle)
2. **Syllabus content mastery** (vocabulary/grammar from the 3-year plan)

The rotary schedule (4-cycle + 1 capstone) is the key mechanism:

| Week | Cycle | Boss Parts Covered |
|------|-------|-------------------|
| W33  | 1     | L1, L2, L3 |
| W34  | 2     | L4, (L5), R1, Speaking P1 |
| W35  | 3     | R2, R3, R4, R5, R6 |
| W36  | 4     | R7 (Story Writer), Speaking P1, P2, (P3/P4) |
| W37  | 5     | Full Mock: all 16 parts |

**Architecture verdict**: The rotary cycle design is well-conceived. Gaps in the data schema (5 bugs below) are fixable without structural change.

---

## 2. CRITICAL BUGS — ORDERED BY SEVERITY

### BUG-1 (RED): L5 has 6 scored items instead of 5 — BOTH W33 & W34

**Cambridge spec**: L5 = 1 Example + 5 test items (6 rows total, only 5 scored).

**Actual data (verified by runtime audit)**:
- W33: 7 instructions = 1 example + **6 test items** (4 color + 2 write)
- W34: 7 instructions = 1 example + **6 test items** (3 color + 3 write)

**Double bug**: `SVGColorAndWrite.jsx` renders a hardcoded `EXAMPLE` row (line 264), then maps `normalizedTasks` over ALL instructions including `inst_0` (isExample=true). The example is double-rendered and the test count is 6 not 5.

**Fix**:
- `listening_hub.js` W33 + W34: remove one test instruction (6→5)
- `SVGColorAndWrite.jsx`: filter `isExample: true` out of `normalizedTasks` map

---

### BUG-2 (RED): S3 has 5 images instead of 4 — BOTH W33 & W34

**Cambridge spec**: Speaking P3 = 4 pictures total (examiner narrates #1, student narrates #2–4).

**Actual data**: `picture_story.images.length === 5` in both W33 and W34.

**Component default** (`PictureStoryContinuation.jsx` L19-24): also defaults to 5 images; `examiner_intro` says "tell me about pictures two, three, four, and five."

**Fix**:
- `speaking_hub.js` W33 + W34: trim `images` array from 5 to 4 entries
- Update `examiner_intro` to say "…pictures two, three, and four."
- `PictureStoryContinuation.jsx`: change default fallback from 5 to 4 images

---

### BUG-3 (RED): S4 Personal Questions entirely missing from architecture

**Cambridge spec**: Speaking P4 = examiner asks 4-6 personal questions (worth ~25% of Speaking mark).

**Current state**:
- `BossBattleZone.jsx`: only `spk_p1`, `spk_p2`, `spk_p3` exist — no `spk_p4`
- `speaking_hub.js`: no `personal_questions` key in any week
- `BOSS_ROTARY_CYCLES[4]`: says "P3/P4" in description but Cycle 4 task list has only `spk_p1` and `spk_p2`
- Full mock (cycleNumber 0): maps `spk_p1`, `spk_p2`, `spk_p3` but no `spk_p4`

**Impact**: Students NEVER practice S4. This is 25% of Speaking marks.

**Fix (Tier 3 — new component)**:
1. Add `personal_questions` array to `speaking_hub.js` schema (5 open-ended questions)
2. Build `PersonalQuestionsCoach.jsx` — TTS examiner audio + mic + text fallback (no correct answer validation needed)
3. Wire `spk_p4` into `BossBattleZone.jsx` Cycle 4 and Full Mock task lists
4. Update `bossRotarySchedule.js` Cycle 4 `testedSkills` to explicitly include `speaking_p4`

---

### BUG-4 (YELLOW): R4 has 9 scored blanks instead of 10

**Cambridge spec**: R4 = 10 comprehension gaps, 3-choice each — ALL 10 are scored (no inline example; example pattern is in rubric text only).

**W33 actual**:
- `rw_part_4.example`: blank #1 treated as worked example (not scored)
- `rw_part_4.blanks`: 9 items (ids 2–10)

**Impact**: Students practice only 9 scored items instead of 10.

**Fix**: Remove `example` key from R4; make all 10 blanks scored items. Update `InlineTextClozeDropdown.jsx` if it renders the `example` separately.

---

### BUG-5 (YELLOW): Hotspot coordinates W33 — up to 54% error vs calibration centroids

**Data** (from `speaking_hub.js find_differences[]`):
d1: (26,72), d2: (74,22), d3: (48,65), d4: (85,40)

**Calibration** (from `week33_hotspot_calibration.json`):
Centroid 0: (20,22), Centroid 1: (78,22), Centroid 2: (30,64), Centroid 3: (80,70)

**Best-match errors**:
- d2↔C1: 4% ✅
- d3↔C2: 18% ❌
- d1↔C3: 54% ❌❌
- d4: no close match

**Fix**:
1. Run visual calibrator to re-measure actual DOM pixel positions
2. Sync `speaking_hub.js differences[]` from calibration JSON (not manual entry)
3. Add `scripts/sync_hotspots.mjs` to automate reconciliation
4. Add Gate 15 assertion: error < 5% required

---

### BUG-6 (MINOR): Documentation says "17 Parts" — should be 16

Cambridge A2 Flyers = L1-L5 (5) + R1-R7 (7) + S1-S4 (4) = **16 parts**.

Fix: Update `docs/GATE15_SPEC_W33.json` title and any docs using "17 Parts".

---

## 3. DUAL-GOAL ARCHITECTURE VIABILITY

| Dimension | Status |
|-----------|--------|
| Rotary cycle design | STRONG — all 16 parts covered per 5-week module |
| Content-form separation | GOOD — syllabus themes, Cambridge mechanics |
| Component coverage | 12/16 parts have components (S4 missing) |
| 4-hub data model | CLEAN — matches exam skill areas |
| Audit infrastructure | Gates 1-16 protect regressions |

**S4 is the only structural blocker.** Fix the 5 bugs above and the dual-goal architecture is fully viable.

---

## 4. PRIORITY ACTION PLAN

### Priority 1 — Immediate (do now, Tier 1-2)

```
P1a: listening_hub.js W33+W34: reduce L5 test items from 6→5
P1b: SVGColorAndWrite.jsx: filter isExample=true from normalizedTasks map
P1c: speaking_hub.js W33+W34: trim S3 images from 5→4, update examiner_intro
P1d: PictureStoryContinuation.jsx: default fallback → 4 images
P1e: speaking_hub.js W33: fix hotspot coordinates to match calibration centroids
P1f: docs/GATE15_SPEC_W33.json: "17 Parts" → "16 Parts"
```

### Priority 2 — This week (Tier 2)

```
P2a: writing_hub.js W33+W34: fix R4 — remove example key, add blank #1 as scored item
P2b: Apply R4 fix to all existing weeks (W33-W37)
P2c: scripts/sync_hotspots.mjs: calibration JSON → speaking_hub auto-sync
P2d: Gate 15: add hotspot tolerance assertion (< 5% error)
```

### Priority 3 — Next sprint (Tier 3)

```
P3a: speaking_hub.js schema: add personal_questions key (5 open-ended Qs)
P3b: Build PersonalQuestionsCoach.jsx component
P3c: BossBattleZone.jsx: wire spk_p4 into Cycle 4 and Full Mock task lists
P3d: bossRotarySchedule.js: Cycle 4 testedSkills → include speaking_p4
P3e: Add personal_questions to W33-W37 speaking_hub.js data files
```

### Priority 4 — Documentation (parallel)

```
P4a: AGENTS.md: add "Cambridge Mechanic Fidelity Doctrine" section
P4b: Define authoritative count schema for all 16 parts (see section 5 below)
P4c: gate16_content_quality.mjs: validate against the doctrine schema
```

---

## 5. CAMBRIDGE MECHANIC FIDELITY DOCTRINE — AUTHORITATIVE SCHEMA

```json
{
  "L1": { "example": 1, "test_items": 5, "total_rows": 6, "component": "SVGLineMatcher" },
  "L2": { "example": 1, "test_fields": 5, "total_fields": 6, "component": "NotepadNoteCompleter" },
  "L3": { "example": 1, "test_items": 5, "cards": 8, "component": "VisualMatchingAH" },
  "L4": { "example": 1, "test_questions": 5, "options_per_q": 3, "component": "MultipleChoice3Pic" },
  "L5": { "example": 1, "test_items": 5, "total_instructions": 6, "component": "SVGColorAndWrite" },
  "R1": { "example": 1, "definitions": 10, "word_bank": 15, "component": "WordBankMatchingGrid" },
  "R2": { "example": 1, "dialogue_turns": 5, "options": 8, "component": "DialogueAHCompleter" },
  "R3": { "example_blank": 1, "scored_blanks": 5, "word_bank": 10, "title_options": 3, "component": "RWPart3ClozeWithTitle" },
  "R4": { "scored_blanks": 10, "choices_per_blank": 3, "note": "ALL 10 are scored — no inline example", "component": "InlineTextClozeDropdown" },
  "R5": { "example": 1, "questions": 7, "words_per_answer": "1-4 words", "component": "TextExtractionCompleter" },
  "R6": { "gaps": 5, "words_per_gap": 1, "component": "OpenClozeCompleter" },
  "R7": { "pictures": 3, "min_words": 20, "component": "StoryWriting" },
  "S1": { "differences": 4, "component": "FindDifferencesInteractive" },
  "S2": { "info_gap_fields": 4, "known_false_min": 2, "component": "InformationExchangeP2" },
  "S3": { "total_pictures": 4, "examiner_narrates": 1, "student_narrates": 3, "component": "PictureStoryContinuation" },
  "S4": { "personal_questions": 5, "open_ended": true, "component": "PersonalQuestionsCoach [MISSING — BUILD REQUIRED]" }
}
```
