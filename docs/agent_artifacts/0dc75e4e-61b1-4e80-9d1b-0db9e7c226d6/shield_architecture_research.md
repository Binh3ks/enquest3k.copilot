# 🔬 Shield Architecture Research Report
> Research-only. No code changes. For review before any implementation.

---

## A. Current Shield Inventory

From `BossBattleZone.jsx` shieldName labels (lines 116–139) and `bossRotarySchedule.js`:

| Shield # | Task ID | Cambridge Part | Active Cycle |
|----------|---------|---------------|-------------|
| 1 | `list_p1` | Listening P1 Draw Lines | Cycle 1 ✅ |
| 2 | `list_p2` | Listening P2 Note Completion | Cycle 1 ✅ |
| 3 | `list_p3` | Listening P3 Matching A-H | Cycle 1 ✅ |
| 4 | `list_p4` | Listening P4 3-Picture Quiz | Cycle 2 ✅ |
| **5** | `list_p5` | **Listening P5 Color & Write** | **❌ No Cycle** |
| 6 | `rw_p1` | R&W P1 Word Bank Match | Cycle 2 ✅ |
| 7 | `rw_p2` | R&W P2 Dialogue A-H | Cycle 3 ✅ |
| 8 | `rw_p3` | R&W P3 Cloze Story & Title | Cycle 3 ✅ |
| 9 | `rw_p4` | R&W P4 10-Gap Cloze | Cycle 3 ✅ |
| 10 | `rw_p5` | R&W P5 Story Detective | Cycle 3 ✅ |
| 11 | `rw_p6` | R&W P6 Open Cloze | Cycle 4 ✅ |
| **12** | `rw_p7` | **R&W P7 Story Writing** | **❌ No Cycle** |
| 13 | `spk_p1` | Speaking P1 Find Differences | Cycle 2 ✅ |
| 14 | `spk_p2` | Speaking P2 Ask & Answer | Cycle 4 ✅ |
| 15 | `spk_p3` | Speaking P3 Picture Story | Cycle 4 ✅ |
| *(+1)* | `spk_p4` | Speaking P4 Personal Questions | **❌ No Cycle** |

**Current active rotation: 13 task-Shields across Cycles 1–4. Shields 5, 12, and S-P4 are absent.**

---

## B. Shield → Cambridge Part Mapping

**Architecture finding: 1 Shield = 1 Cambridge Part** in all current code.
No multi-Part Shield exists anywhere in the implementation.

---

## C. W33/W34/W35/W36 Current Rotation (Ground Truth)

| Week | Cycle | Tasks (from JSX hardcoded arrays) | Count |
|------|-------|----------------------------------|-------|
| W33 | 1 | L-P1, L-P2, L-P3 | 3 |
| W34 | 2 | L-P4, R&W-P1, S-P1 | 3 |
| W35 | 3 | R&W-P2, R&W-P3, R&W-P4, R&W-P5 | 4 |
| W36 | 4 | R&W-P6, S-P2, S-P3 | 3 |
| **Total** | | | **13** |

**The `bossRotarySchedule.js` comment header was wrong** (claimed 3,3,5,4).
The hardcoded JSX arrays are ground truth: 3,3,4,3 = 13 active Shields.

---

## D. Full Mock (W37) 16-Part Mapping

From `BossBattleZone.jsx` `isFullMock` task array (lines 99–114):

Currently contains **14 tasks**: L-P1 through L-P5, R&W-P1 through R&W-P6, S-P1, S-P2, S-P3.

**Missing from Full Mock:**
- `rw_p7` (R&W P7 Story Writing) — ❌ absent
- `spk_p4` (Speaking P4 Personal Questions) — ❌ absent

This is a **known pre-existing gap** documented in `docs/week_33_project/13_w37_mock_test_gap_analysis_spike.md` as **Gap #6**:
> "Cần mount thêm P3 (5-Picture Story) và P4 (Personal Qs) vào `isFullMock`"

---

## E. Speaking P4 Current Status

| Dimension | Status |
|-----------|--------|
| Component | `PersonalQuestionsCompleter.jsx` — ✅ exists, imported in BossBattleZone |
| Render condition | Line 454: `activeTaskId === 'spk_p4'` — ✅ renders when called directly |
| Data path | `bossData.speaking?.p4_personalQs` — ✅ wired |
| ID normalization | `'s4' / 'spk_p4' / 'speaking_p4' / 'personal_questions'` all resolve to `spk_p4` |
| Shield number | **None assigned** — no shieldName property for spk_p4 anywhere |
| In any Cycle | ❌ Not in Cycles 1, 2, 3, or 4 |
| In Full Mock | ❌ Not in isFullMock task array (known Gap #6) |
| Verdict | **Complete component + data path, zero runtime activation in any cycle or mock** |

---

## F. Runtime Capability: One Shield = Multiple Cambridge Parts?

**No.** The runtime treats each task in the task array as one unit:
- `currentTasks[]` = flat array of task objects, one id each
- `setActiveTaskIndex(prev => prev + 1)` = sequential task-by-task navigation
- `handleTaskComplete(taskId)` = pushes one string to `earnedShields[]` per task
- `shieldName` = one-to-one label per task

Technically, multiple tasks CAN appear in one cycle and the user navigates through all of them sequentially. But there is **no grouping or sub-part mechanism** — each task earns its own shield string independently.

---

## G. Architecture Interpretation: Two Meanings of "Shield"

The repository conflates **two distinct meanings** of "Shield":

**Meaning 1 — Cambridge Paper Score Shield** (intended product model):
From `Design review.md` and `13_w37_mock_test_gap_analysis_spike.md`:
> "Listening Paper (Parts 1–5): Tối đa **5 Khiên**"
> "R&W Paper (Parts 1–7): Tối đa **5 Khiên**"
> "Speaking Paper (Parts 1–4): Tối đa **5 Khiên**"
> "**Tổng cộng: Tối đa 15 Khiên**"

→ 15 Shields = 3 Papers × 5 Shield score levels. A Shield is a **performance band**,
  not a task unit. Cambridge itself awards shields per Paper based on overall performance.

**Meaning 2 — Weekly Task Unit** (interim runtime labeling):
From `BossBattleZone.jsx` shieldName labels:
> `'Shield 1 (Listening P1)'`, `'Shield 14 (Speaking P2)'`...

→ Each completed Cambridge Part task earns one Shield label in the UI.
  This is an interim labeling scheme, not the final scoring model.

---

## H. Option A / B / C Analysis

### Option A: 15 Shields = 15 Cambridge Parts; Speaking P4 Mock-Only

- Rotation: 3 + 4 + 4 + 4 = 15, keeping S-P4 mock-only
- **Problem**: Shield 5 (L-P5) and Shield 12 (R&W-P7) are named in code but absent from all cycles.
  If this option is correct, L-P5 and R&W-P7 must be added to rotation, but S-P4 stays mock-only.
- **Inconsistency**: S-P4 component exists and is fully wired — why build it if mock-only?
- **Proposed rotation**: C1=3(L1-3), C2=4(L4,L5,RW1,S1), C3=4(RW2-5), C4=4(RW6,RW7,S2,S3) → 15 active, S4 mock-only

### Option B: 15 Shields cover 16 Parts by combining two Speaking Parts into one Shield

- No existing implementation. Would require UI refactoring.
- Cambridge Speaking Parts are distinct sequential tasks — combining misrepresents exam structure.
- AGENTS.md "Speaking (4 Parts)" confirms all 4 are distinct.
- **Not recommended.**

### Option C: 15 Shields = 3-Paper score model; 16 Tasks in rotation

- 16 Cambridge Part tasks across 4 weeks: 3+4+4+5 = 16
- 15 "Shields" = maximum score bands (5 per Paper × 3 Papers)
- No architectural conflict: 16 task-Parts, 15 Shield-score-icons
- Matches `Design review.md` Day 5 description: "Listening Parts 1–5 (5 Khiên) | R&W Parts 1–6 (5 Khiên) | Speaking Parts 1–4 (5 Khiên)"
- **Note**: R&W "Parts 1–6" = 6 task-Parts earning max 5 Khiên → confirms Khiên ≠ Part count
- **This is the correct interpretation.**

---

## I. Recommended Architecture

**Option C is correct.** The evidence is conclusive:

1. `Design review.md`: "Listening Parts 1–5 (5 Khiên)" = 5 parts produce max 5 Shield icons (one-to-one happens to align for Listening). R&W "Parts 1–6 (5 Khiên)" = 6 parts → only 5 Shield icons → Shield ≠ Part for R&W.
2. Gap Analysis: "hàm quy đổi điểm thô → Khiên theo từng Paper (5/5/5)" = Paper-level aggregation function needed.
3. AGENTS.md: "Rubric 5 Shields (Content 2, Grammar/Flow 2, Vocab/Spelling 1)" = Shield is a scoring rubric, not a task unit.

**"15 Shields" = Cambridge's 3-Paper scoring system: max 5 Shield icons per Paper.**

**The 4-week rotation should cover all 16 Cambridge Parts as practice tasks.**

There is NO naming conflict: task count = 16 Cambridge Parts; Shield count = 15 score icons.

---

## J. Proposed W33–W36 Rotation (Recommendation)

| Week | Cycle | Tasks | Cambridge Parts | Count |
|------|-------|-------|----------------|-------|
| W33 | 1 | `list_p1`, `list_p2`, `list_p3` | L P1, P2, P3 | 3 |
| W34 | 2 | `list_p4`, **`list_p5`**, `rw_p1`, `spk_p1` | L P4, P5; R&W P1; S P1 | **4** |
| W35 | 3 | `rw_p2`, `rw_p3`, `rw_p4`, `rw_p5` | R&W P2, P3, P4, P5 | 4 |
| W36 | 4 | `rw_p6`, **`rw_p7`**, `spk_p2`, `spk_p3`, **`spk_p4`** | R&W P6, P7; S P2, P3, P4 | **5** |
| **Total** | | | | **16** |

Delta from current state:
- Cycle 2: add `list_p5` (Shield 5) → 3→4 tasks
- Cycle 4: add `rw_p7` (Shield 12) + `spk_p4` → 3→5 tasks
- Full Mock: add `rw_p7` + `spk_p4` → 14→16 tasks

---

## K. Files Needing Modification (if approved)

| File | Change |
|------|--------|
| `src/modules/zones/BossBattleZone.jsx` | Cycle 2: add `list_p5`; Cycle 4: add `rw_p7`, `spk_p4`; isFullMock: add `rw_p7`, `spk_p4` |
| `src/config/bossRotarySchedule.js` | Cycle 2: shieldCount 3→4, add `listening_p5`; Cycle 4: shieldCount 3→5, add `rw_p7`+`speaking_p4`; Cycle 0 mock: note 16 parts |
| `src/data/weeks/week_34/listening_hub.js` | Verify `listening_p5` data complete |
| `src/data/weeks/week_36/writing_hub.js` | Verify `rw_p7`/`picture_story` data complete |
| `src/data/weeks/week_36/speaking_hub.js` | Verify `personal_questions` data complete |

> **No new components needed.** All components exist and are wired.

---

## L. Risks

| Risk | Level | Mitigation |
|------|-------|-----------|
| W34 `listening_p5` data incomplete | 🟡 Medium | Verify hub before activating Shield 5 in Cycle 2 |
| W36 `rw_p7` / `picture_story` data missing | 🟡 Medium | Verify `writing_hub.picture_story` for W36 |
| W36 `personal_questions` data missing | 🟡 Medium | Verify `speaking_hub.personal_questions` for W36 |
| Gate17 INV-S2 fails for Cycle 4 without W36 data | 🟡 Medium | Gate17 skips inactive Shields — only fails if data absent for active Shield |
| Cycle 4 now has 5 tasks (25+ min) | 🟢 Low | Acceptable; Cambridge Speaking test is ~10 min by itself |

---

## M. Verification Plan

```bash
# After approved changes:

# 1. Rotation counts correct
node -e "
import('./src/config/bossRotarySchedule.js').then(m => {
  [33,34,35,36,37].forEach(w => {
    const c = m.getBossRotaryConfig(w);
    console.log('W'+w+' Cycle'+c.cycleNumber+': count='+c.shieldCount+' skills='+c.testedSkills.join(','));
  });
});
"
# Expected: W33=3, W34=4, W35=4, W36=5, W37=16

# 2. Gate17 for each week
node scripts/gate17_fidelity_doctrine.mjs 33   # PASS
node scripts/gate17_fidelity_doctrine.mjs 34   # PASS
node scripts/gate17_fidelity_doctrine.mjs 36   # PASS

# 3. Build clean
npm run build   # exit 0

# 4. QA URLs
# W34 L5: http://localhost:5174/week/34/hub/4?station=boss_listening&part=l5
# W36 RW7: http://localhost:5174/week/36/hub/4?station=boss_reading&part=rw_p7
# W36 S4: http://localhost:5174/week/36/hub/4?station=speaking&part=spk_p4
```
