# Round 87 Forensic Report: Housekeeping After Wave 3 Merge

**Date**: 2026-11-13  
**Status**: APPROVED & COMPLETE  
**Commit Target**: `round87(map): clean stale mock labels from digital map & report debt queue`  
**Governing Context**: Post-Wave 3 merge housekeeping; zero modifications to frozen W33 or governance files.

---

## 1. Item 1: Rollback Tag Push (`pre-wave3-merge-round86`)

### 1.1 Actions Executed
The rollback tag `pre-wave3-merge-round86` was created locally in Round 86 pointing to commit `9d04116b416d1ba5d2d9fca9a56e98ecde7d4014` (prior to the Wave 3 production merge). In Round 87, this tag was pushed to `origin` and verified via `git ls-remote`.

### 1.2 Verbatim Command Outputs
```bash
$ git rev-parse pre-wave3-merge-round86
9d04116b416d1ba5d2d9fca9a56e98ecde7d4014

$ git push origin pre-wave3-merge-round86
To https://github.com/binhnguyen/Engquest3k.git
 * [new tag]         pre-wave3-merge-round86 -> pre-wave3-merge-round86

$ git ls-remote origin refs/tags/pre-wave3-merge-round86
9d04116b416d1ba5d2d9fca9a56e98ecde7d4014	refs/tags/pre-wave3-merge-round86
```
**Result**: The rollback tag is permanently published on remote origin, guaranteeing instant zero-risk rollback capability to the exact pre-merge HEAD.

---

## 2. Item 2: Digital Map Audit & Cleanup

### 2.1 Context & Problem
In `docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md`, 27 content weeks retained `★ FULL MOCK` labels in Column 3 ("CEFR") and Column 6 ("Hoạt động Trọng tâm") inherited from an obsolete 5-week rotation (`4+1`) scheme. This contradicted the Owner's additive-mock architecture (Decision 2 & 6), which mandates:
- Exactly 156 numbered content weeks (`W01–W156`), all independent content (`isFullMock: false`).
- 34 interleaved mock checkpoints (`M01–M34`) inserted outside the 156 numbered content weeks.

### 2.2 Cross-Reference: Digital Map vs. Stale Blueprints
We created `scripts/audit_round87_digital_map_mocks.mjs` to audit all 156 weeks across the map and compare them with the 39 `blueprint.json` files in `src/data/weeks/` that carried `isFullMock: true`:
- **Map Content Weeks with Mock Labels (27 weeks)**:
  `W16, W24, W32, W37, W42, W47, W52, W57, W62, W67, W72, W77, W82, W87, W92, W97, W102, W107, W112, W117, W127, W132, W137, W142, W147, W152, W156` (from 5-week cadence: every 5th week after W32).
- **Blueprints with `isFullMock: true` (39 weeks)**:
  Every 4th week (`W04, W08, W12, W16, W20, W24, W28, W32, W36, W40, W44, W48, W52, W56, W60, W64, W68, W72, W76, W80, W84, W88, W92, W96, W100, W104, W108, W112, W116, W120, W124, W128, W132, W136, W140, W144, W148, W152, W156`) from an older 4-week cadence.
- **Overlap Analysis**:
  - **10 weeks in both**: `W16, W24, W32, W52, W72, W92, W112, W132, W152, W156`
  - **17 weeks only in Map**: `W37, W42, W47, W57, W62, W67, W77, W82, W87, W97, W102, W107, W117, W127, W137, W142, W147`
  - **29 weeks only in Blueprints**: `W04, W08, W12, W20, W28, W36, W40, W44, W48, W56, W60, W64, W68, W76, W80, W84, W88, W96, W100, W104, W108, W116, W120, W124, W128, W136, W140, W144, W148`

### 2.3 Cleanup Executed (`scripts/apply_round87_map_cleanup.mjs`)
1. **Cleaned 27/27 Content Week Rows**:
   - Replaced Column 3 `★ FULL MOCK ...` with authentic CEFR level and Rotary Cycle (`((w - 33) % 4) + 1` for W33+).
   - Preserved `LIVE` badge on `W127` (along with `W126, W133, W134`).
   - Unbolded titles previously formatted as mock announcements.
   - Cleaned mock instructions out of Column 6 to reflect normal 15-quest rotary practice.
2. **Synchronized Section 1, Section 2, and Section 4**:
   - Updated header and Section 1 to specify 34 Interleaved Mock Checkpoints.
   - Replaced the obsolete Section 2 "Bảng Phân Bổ 28 Tuần Full Mock Test" with the finalized 34 Interleaved Mock Checkpoints table (`M01–M34`, spanning Starters, Movers, Flyers, and B1 PET).
   - Updated Section 4 Digital Audit Invariant to establish that all 156 content weeks are `isFullMock: false`, with `isFullMock: true` reserved solely for interleaved checkpoints `M01–M34`.

### 2.4 Verification Output
```bash
$ node scripts/audit_round87_digital_map_mocks.mjs
Total lines mentioning FULL MOCK in Map: 0
Content week rows with FULL MOCK in Map: 0
  ✅ SUCCESS: Zero content week rows with FULL MOCK in Digital Map!
```

---

## 3. Item 3: Status Report on Known Debt Queue

### 3.1 Singapore Math 2/5 Shortfall Across Merged Production Weeks
- **Forensic Scan**: We ran a comprehensive audit across all 26 merged production weeks with `skill_practice_hub.js`.
- **Findings**:
  - **5/5 Math (6 weeks)**: `W33, W34, W126, W127, W133, W134` (100% compliant).
  - **2/5 Math Shortfall (18 weeks)**: `W35, W38, W39, W41, W43, W45, W46, W73, W74, W75, W76, W77, W78, W79, W80, W81, W82, W125`.
  - **0/5 Math (2 weeks)**: `W36` (Capstone Review/Project Week per syllabus), `W37` (legacy mock week).
- **Root Cause**: Early generator templates produced only 2 questions for `singapore_math` in `skill_practice_hub.js` instead of the 5 required by `BarModelQuest.jsx`.
- **Remediation Plan**: Dispatch a dedicated math expansion pass (3 additional bar model questions per week $\times$ 18 weeks = 54 questions), adhering to `station2Adapters.js` schema (`correctAnswer`, `answer_value`, `target_answer`).

### 3.2 Missing PET Spec Block in `src/config/cambridgeExamStandards.js`
- **Forensic Inspection**:
  - `src/config/cambridgeExamStandards.js` defines `CAMBRIDGE_EXAM_STANDARDS` with keys `STARTERS`, `MOVERS`, `FLYERS`.
  - It completely lacks a `PET` / `B1_PRELIMINARY` specification block.
  - Line 139: `getExamStandard(weekNumber)` evaluates:
    ```js
    if (weekNumber <= 16) return CAMBRIDGE_EXAM_STANDARDS.STARTERS;
    if (weekNumber <= 32) return CAMBRIDGE_EXAM_STANDARDS.MOVERS;
    if (weekNumber <= 72) return CAMBRIDGE_EXAM_STANDARDS.FLYERS;
    return null; // Weeks 73-156 return null!
    ```
- **Consequence**:
  - `hasPetSpec = false`.
  - Any component or validator querying `getExamStandard()` for weeks 73–156 receives `null`.
  - Zone 5 exam shields (Reading/Writing/Listening) lack formal PET part timings, shield weighting, and rubric definitions.
- **Remediation Plan**: Author the standard `PET` spec block in `src/config/cambridgeExamStandards.js` with Cambridge Preliminary for Schools format (Reading 6 parts, Writing 2 parts, Listening 4 parts, Speaking 4 parts) and wire `weekNumber >= 73` to `CAMBRIDGE_EXAM_STANDARDS.PET`.

### 3.3 Full W79/W80 Regeneration Readiness
- **Context & Policy Clearance**:
  - In Round 82, Owner explicitly finalized **C.7 Option (a)**: W79 and W80 maintain distinct 13-word SUPPLEMENT vocabulary sets grounded in the Micro-Debate 2 topic from Source B.
  - Staging status: W79 was previously generated with 2/5 math, and W80 was previously structured as a merged mock.
  - Content status: W79 and W80 have zero remaining Owner policy blocks.
- **Readiness**: W79 and W80 can be scheduled for complete regeneration following the verified Wave 3 pipeline (B1+ register calibration, 5/5 math, in-line glossing, zero ESL anomalies).

---

## 4. Verification Checkpoints

| Checkpoint | Result | Evidence |
|---|---|---|
| Git tag `pre-wave3-merge-round86` pushed | ✅ PASS | Verified via `git ls-remote origin refs/tags/pre-wave3-merge-round86` |
| Digital Map mock labels removed | ✅ PASS | 27/27 rows cleaned, 0 content rows with FULL MOCK |
| W33 Golden Master integrity | ✅ PASS | `npm run guard:freeze:w33` exited code 0 (147/147 locked) |
| Global governance integrity | ✅ PASS | `npm run guard:governance` exited code 0 (3/3 locked) |
