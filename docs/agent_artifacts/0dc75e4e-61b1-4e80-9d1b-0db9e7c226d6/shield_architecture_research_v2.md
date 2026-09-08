# 🔬 Definitive Shield Architecture Research Report
> Research only — no code changes.
> This report supersedes the previous research report.

---

## A. Source-of-Truth Analysis

**There are TWO authoritative sources that do different jobs:**

| Source | Authority over | Format |
|--------|---------------|--------|
| `src/config/bossRotarySchedule.js` | **Rotation metadata**: which Cambridge Parts belong to which Cycle, display names, duration | Config |
| `src/modules/zones/BossBattleZone.jsx` `currentTasks` arrays | **Runtime task composition**: what actually gets rendered each Cycle | Runtime |

**The two sources are currently OUT OF SYNC for Cycles 2 and 4.**

The third authoritative source — **`src/services/assessment/MockAssessmentEngine.js`** — is
authoritative for the **Shield scoring model** (5+5+5 per Paper).

---

## B. Configuration / Runtime Mismatch Table

### TABLE A — CONFIGURATION (`bossRotarySchedule.js`)

| Cycle | Configured `testedSkills` | Configured `shieldCount` |
|-------|--------------------------|--------------------------|
| 1 | `listening_p1`, `listening_p2`, `listening_p3` | 3 |
| 2 | `listening_p4`, **`listening_p5`**, `rw_p1`, `speaking_p1` | **4** |
| 3 | `rw_p2`, `rw_p3`, `rw_p4`, `rw_p5` | 4 |
| 4 | `rw_p6`, **`rw_p7`**, `speaking_p2`, `speaking_p3` | **4** |
| 0 (Mock) | `all_15_shields` | 15 |

### TABLE B — RUNTIME (`BossBattleZone.jsx` `currentTasks` arrays)

| Cycle | Actually rendered task IDs | Actual count |
|-------|--------------------------|-------------|
| 1 | `list_p1`, `list_p2`, `list_p3` | 3 |
| 2 | `list_p4`, `rw_p1`, `spk_p1` | **3** |
| 3 | `rw_p2`, `rw_p3`, `rw_p4`, `rw_p5` | 4 |
| 4 | `rw_p6`, `spk_p2`, `spk_p3` | **3** |
| Mock | `list_p1–5`, `rw_p1–6`, `spk_p1–3` | **14** |

### Mismatch Summary

| Cycle | Config has | Runtime has | Missing from runtime |
|-------|-----------|-------------|---------------------|
| 2 | 4 skills | 3 tasks | `listening_p5` → `list_p5` |
| 4 | 4 skills | 3 tasks | `rw_p7` |
| 4 | — | — | `speaking_p4` / `spk_p4` (not in config either) |
| Mock | 15 (label) | 14 tasks | `rw_p7`, `spk_p4` |

**Answer to "Intentional or accidental?"**

`listening_p5` and `rw_p7` are **already configured in `testedSkills`** in `bossRotarySchedule.js`
but are **absent from the JSX runtime arrays** in `BossBattleZone.jsx`.

This is an **accidental omission**, not an intentional design choice. The config was updated
to include them; the JSX was never updated to match.

`speaking_p4` / `spk_p4` is in **neither** config nor runtime — it is a separately developed
component that was never mounted in any cycle.

---

## C. 16-Part Cambridge Inventory

| # | Task ID | Cambridge Paper | Cambridge Part | Data key in bossData |
|---|---------|----------------|---------------|---------------------|
| 1 | `list_p1` | Listening | P1 Draw Lines | `bossData.listening.p1` |
| 2 | `list_p2` | Listening | P2 Note Completion | `bossData.listening.p2` |
| 3 | `list_p3` | Listening | P3 Matching A-H | `bossData.listening.p3` |
| 4 | `list_p4` | Listening | P4 3-Picture Quiz | `bossData.listening.p4` |
| 5 | `list_p5` | Listening | P5 Color & Write | `bossData.listening.p5` |
| 6 | `rw_p1` | Reading & Writing | P1 Word Bank Match | `bossData.readingWriting.p1` |
| 7 | `rw_p2` | Reading & Writing | P2 Dialogue A-H | `bossData.readingWriting.p2` |
| 8 | `rw_p3` | Reading & Writing | P3 Cloze Story+Title | `bossData.readingWriting.p3` |
| 9 | `rw_p4` | Reading & Writing | P4 10-Gap Cloze | `bossData.readingWriting.p4` |
| 10 | `rw_p5` | Reading & Writing | P5 Story Detective | `bossData.readingWriting.p5` |
| 11 | `rw_p6` | Reading & Writing | P6 Open Cloze | `bossData.readingWriting.p6` |
| 12 | `rw_p7` | Reading & Writing | P7 Story Writing | **`bossData.readingWriting.p7` — NOT WIRED** |
| 13 | `spk_p1` | Speaking | P1 Find Differences | `bossData.speaking.p1_findDiff` |
| 14 | `spk_p2` | Speaking | P2 Ask & Answer | `bossData.speaking.p2_cueCard` |
| 15 | `spk_p3` | Speaking | P3 Picture Story | `bossData.speaking.p3_pictureStory` |
| 16 | `spk_p4` | Speaking | P4 Personal Questions | `bossData.speaking.p4_personalQs` |

> **Critical finding**: `bossData.readingWriting` only has keys `p1`–`p6`.
> There is **no `p7` key** in the bossData loading object.
> The data exists in `writing_hub.picture_story` but is **NOT mapped** into `bossData`.

---

## D. 15-Shield Scoring Model Evidence

**The 5+5+5 Paper scoring model IS implemented** in `src/services/assessment/MockAssessmentEngine.js`:

```js
// Section 1: Reading & Writing
const rwShields = Math.min(5, Math.max(1, Math.round((rwPct / 100) * 5)));

// Section 2: Listening
const listenShields = Math.min(5, Math.max(1, Math.round((listenPct / 100) * 5)));

// Section 3: Speaking
const speakingShields = Math.min(5, Math.max(1, Math.round((speakingScorePct / 100) * 5)));

const totalShieldsEarned = rwShields + listenShields + speakingShields;
// maxShieldsTotal: 15
```

**Evidence from documentation:**
- `Design review.md`: "Listening Parts 1–5 (5 Khiên) | R&W Parts 1–6 (5 Khiên) | Speaking Parts 1–4 (5 Khiên)"
- `W37 Gap Analysis`: "hàm quy đổi điểm thô → Khiên theo từng Paper (5/5/5)"
- `AGENTS.md`: "Chấm điểm theo 5 Shields Cambridge" (for Speaking) and "Rubric 5 Shields"

**Conclusion**: "15 Shields" = the Cambridge 3-Paper reporting model (max 5 per Paper).
It is NOT "15 task-units in the weekly rotation."

---

## E. Current `earnedShields[]` / Scoring Behavior

### What `earnedShields` ACTUALLY stores:

```js
// handleTaskComplete in BossBattleZone.jsx line 227–228:
if (!earnedShields.includes(taskId)) {
  setEarnedShields(prev => [...prev, taskId]);
}
```

`earnedShields` stores **raw task IDs** (e.g., `'list_p1'`, `'rw_p1'`, `'spk_p2'`).

### What is displayed:

The Victory screen renders `earnedShields.map(sh => ...)` showing each `sh` string
with a Shield icon and the label `"Shield Earned"` + the task ID text.

### What `shieldCount` is used for:

`BossIntro.jsx` line 21: `{rotaryConfig.shieldCount} Shields` — purely display text
in the pre-battle intro screen. It is **not used to calculate scores or control task flow**.

### Answer to questions B, C, D, E:

**B.** `BossBattleZone.jsx` `currentTasks` arrays = authoritative for task composition.
`bossRotarySchedule.js` is currently **aspirational config**, not runtime ground truth.

**C.** `shieldCount` is **display metadata only**. It is shown in BossIntro as a teaser count.
It does NOT control task composition, scoring, or any logic. It could be wrong without
breaking anything except the displayed number.

**D.** The 5+5+5 Paper-level Shield scoring **IS implemented** in `MockAssessmentEngine.js`
but that engine is used **only for the Full Mock** scenario. It is **not called** by
the weekly `BossBattleZone` completion flow. Weekly `earnedShields[]` is just an array
of completed task IDs — no Paper-level aggregation.

**E.** `earnedShields[]` represents **task completion** only. It is NOT a Cambridge Shield
score. The labels displayed (`'Shield 1 (Listening P1)'` etc.) are cosmetic task-milestone
strings, not Cambridge Paper scoring output.

---

## F. S4 Implementation Status

| Dimension | Status | Evidence |
|-----------|--------|---------|
| Component | ✅ Complete | `PersonalQuestionsCompleter.jsx` — 247 lines, full STT+TTS+scoring |
| Data wiring in bossData | ✅ Wired | `bossData.speaking.p4_personalQs = data?.speaking_hub?.personal_questions` |
| ID normalization | ✅ Complete | Aliases: `s4 / spk_p4 / speaking_p4 / personal_questions` all resolve |
| Render condition | ✅ Complete | Line 454: renders when `activeTaskId === 'spk_p4'` |
| Direct URL activation | ✅ Works | `?part=spk_p4` will activate it even if not in cycle task list |
| Default questions fallback | ✅ Present | 4 hardcoded questions if no data provided |
| W33 `personal_questions` data | ✅ Present | 4 questions confirmed via Node probe |
| W34 `personal_questions` data | ✅ Present | 4 questions confirmed via Node probe |
| W35 `personal_questions` data | ✅ Present | 4 questions confirmed via Node probe |
| W36 `personal_questions` data | ❌ MISSING | `speaking_hub.js` only has `{week, theme, mindmap, ask_ai}` |
| In `bossRotarySchedule.js` testedSkills | ❌ Not listed | Neither Cycle 4 nor any Cycle |
| In `BossBattleZone.jsx` task arrays | ❌ Not present | Not in Cycle 4 task list |
| In `isFullMock` task list | ❌ Not present | Known pre-existing Gap #6 |

**S4 verdict**: Component is complete. Data exists for W33–W35. W36 data is missing. 
Not mounted in any cycle or Mock. **Complete but unmounted for W33–W35; data-incomplete for W36.**

---

## G. Full Mock Gap Analysis

Current `isFullMock` task list = **14 Cambridge Part tasks**:

```
L-P1, L-P2, L-P3, L-P4, L-P5    (5 Listening)
R&W-P1, P2, P3, P4, P5, P6       (6 Reading/Writing — missing P7)
S-P1, S-P2, S-P3                  (3 Speaking — missing S-P4)
```

Missing from Full Mock:
1. `rw_p7` — R&W P7 Story Writing → **no `rw_p7` component render condition exists** in BossBattleZone
2. `spk_p4` — Speaking P4 Personal Qs → component exists, render condition exists, data missing for W37

**Full Mock should contain 16 tasks** (5L + 7RW + 4S).

Additionally: `bossRotarySchedule.js` Cycle 0 says `shieldCount: 15` (the Paper scoring model max).
This is semantically correct IF `shieldCount` means "maximum Paper Shield icons earned" (5+5+5=15).
It would be WRONG if `shieldCount` meant "number of tasks" (should be 16 in that case).
Since `shieldCount` is display-only metadata, no logic breaks either way.

---

## H. Proposed Final W33–W36 Rotation

Based on all evidence, the intended architecture is:

| Week | Cycle | Tasks | Cambridge Parts | Config already? | Data exists? |
|------|-------|-------|----------------|----------------|-------------|
| W33 | 1 | `list_p1`, `list_p2`, `list_p3` | L P1, P2, P3 | ✅ | ✅ |
| W34 | 2 | `list_p4`, **`list_p5`**, `rw_p1`, `spk_p1` | L P4, P5; R&W P1; S P1 | ✅ Config already has this | ✅ L5 data confirmed |
| W35 | 3 | `rw_p2`, `rw_p3`, `rw_p4`, `rw_p5` | R&W P2, P3, P4, P5 | ✅ | ✅ |
| W36 | 4 | `rw_p6`, **`rw_p7`**, `spk_p2`, `spk_p3`, **`spk_p4`** | R&W P6, P7; S P2, P3, P4 | ✅ Config has rw_p7; no spk_p4 | ⚠️ rw_p7 missing; spk_p4 missing |

This gives 3+4+4+5 = **16 Cambridge Parts total across 4 weeks**.

---

## I. Exact Files Requiring Modification

### Tier 1 — Runtime task composition (core fix):
| File | Change | Risk |
|------|--------|------|
| `BossBattleZone.jsx` | Cycle 2: add `list_p5`. Cycle 4: add `rw_p7`, `spk_p4`. isFullMock: add `rw_p7`, `spk_p4` | 🟢 Low — pattern established |

### Tier 2 — Config alignment:
| File | Change | Risk |
|------|--------|------|
| `bossRotarySchedule.js` | Cycle 4: add `speaking_p4` to `testedSkills`, shieldCount 4→5. Comment header update. | 🟢 Low — display-only `shieldCount` |

### Tier 3 — Data wiring:
| File | Change | Risk |
|------|--------|------|
| `BossBattleZone.jsx` bossData | Add `p7: data?.writing_hub?.picture_story` to `readingWriting` object | 🟢 Low |
| `W36/speaking_hub.js` | Add full `personal_questions` data (4 Cambridge-style questions) | 🟡 Medium — content authoring |
| `W36/writing_hub.js` | Add `picture_story` with 3 scenes for story writing | 🟡 Medium — content authoring |

### Tier 4 — Semantic cleanup (optional, not blocking):
| File | Change | Risk |
|------|--------|------|
| `bossRotarySchedule.js` | Rename `shieldCount` → `taskCount` or add `taskCount` alongside, to disambiguate task count from max Paper Shield score | 🟢 Low (display only) |

---

## J. Semantic / Data Model Problems

### Problem 1: `shieldCount` is ambiguous (❗)

`shieldCount` currently stores:
- For Cycles 1–4: the number of **Cambridge Part tasks** in the cycle (task count)
- For Cycle 0 (Mock): 15 = the **maximum Paper Shield score** (not task count)

This is semantically inconsistent. Cycles 1–4 use task count semantics; Cycle 0 uses
Paper-score semantics. After the fix, Cycle 4 would have `shieldCount: 5` = 5 tasks, which
is also coincidentally the Paper max — but for the wrong reason.

**Recommended fix**: Add `partCount` (task count per cycle) alongside `shieldCount` (Paper
Shield icon max = always 5+5+5=15 for Mock, and Paper-proportional for weekly cycles).
But this is a cleanup, not a blocker.

### Problem 2: `bossData.readingWriting` has no `p7` key

The data loading in BossBattleZone maps `readingWriting.p1` through `readingWriting.p6`.
There is no `readingWriting.p7`. A render condition for `rw_p7` would receive `undefined` data.
This must be fixed before mounting `rw_p7`.

### Problem 3: W36 `speaking_hub.js` and `writing_hub.js` are incomplete shells

W36 `speaking_hub.js` exports only `{week, theme, mindmap, ask_ai}` — no Boss Castle data at all.
W36 `writing_hub.js` exports only `{week, theme, writing}` — no `picture_story` for R&W P7.

These files need Boss Castle content before W36 Cycle 4 can go live.

### Problem 4: `rw_p7` has no component in BossBattleZone render switch

There is no `{activeTaskId === 'rw_p7' && <.../>}` condition in BossBattleZone.
The component `PictureStoryContinuation` is used for `spk_p3` (S3 Speaking).
R&W P7 (Story Writer) uses `writing_hub.picture_story` → needs a different component:
likely `WritingStudioHub` or a dedicated `StoryWritingExam` component.
**This is a missing render path** — not just a missing task entry.

---

## K. Verification Plan

After all changes are approved and implemented:

```bash
# 1. Config/runtime alignment check
node -e "
import('./src/config/bossRotarySchedule.js').then(m => {
  [33,34,35,36,37].forEach(w => {
    const c = m.getBossRotaryConfig(w);
    console.log('W'+w+' Cycle'+c.cycleNumber+': tasks='+c.testedSkills.join(',')+' count='+c.shieldCount);
  });
});
"
# Expected: W34=4 tasks, W36=5 tasks

# 2. Gate17 for all active weeks
node scripts/gate17_fidelity_doctrine.mjs 33
node scripts/gate17_fidelity_doctrine.mjs 34
node scripts/gate17_fidelity_doctrine.mjs 36

# 3. Build
npm run build  # exit 0

# 4. Runtime QA (direct URL activation)
# W34 L5: http://localhost:5174/week/34/hub/4?station=boss_listening&part=l5
# W36 RW7: http://localhost:5174/week/36/hub/4?station=boss_reading&part=rw_p7
# W36 S4: http://localhost:5174/week/36/hub/4?station=speaking&part=spk_p4

# 5. Full Mock check
# W37: http://localhost:5174/week/37/hub/4 → should show 16 tasks
```

---

## L. Final Recommendation

### APPROVE IMPLEMENTATION — with explicit scope:

**Phase A (Safe, no data authoring required):**
1. Fix `BossBattleZone.jsx` Cycle 2: add `list_p5` to task array
2. Add `readingWriting.p7` to bossData loading (maps from `writing_hub.picture_story`)
3. Fix `bossRotarySchedule.js` Cycle 4 comment alignment
4. Fix `BossBattleZone.jsx` `isFullMock` comment only (not task list, pending data)

**Phase B (Requires R&W P7 render path first):**
5. Determine which component renders `rw_p7` in Boss mode → choose `WritingStudioHub` or new `StoryWritingExaminer`
6. Add `rw_p7` render condition to BossBattleZone
7. Add `rw_p7` to Cycle 4 task array + `spk_p4` to Cycle 4 task array
8. Update `bossRotarySchedule.js` Cycle 4 `testedSkills` to include `speaking_p4`

**Phase C (Data authoring — separate work item):**
9. Author W36 `speaking_hub.js` `personal_questions` (4 Cambridge-style questions)
10. Author W36 `writing_hub.js` `picture_story` (3-scene story for R&W P7)
11. After W36 data complete: add `rw_p7` and `spk_p4` to `isFullMock` task list

**Do NOT attempt to fix W36 data and mount tasks in one step.**
**Phase A is safe to do now.** Phase B and C require separate approval.

> **"15-Shield scoring is implemented in `MockAssessmentEngine.js` for the Full Mock,
> but is NOT yet connected to the weekly BossBattleZone `earnedShields[]` flow.
> Weekly earnedShields[] stores raw task-completion IDs, not Paper-level Shield scores."**
