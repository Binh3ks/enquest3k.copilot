# W33+ Assessment Domain — Architecture Forensic Audit
> Pure research — no code changes.

---

## A. Executive Summary

The repository contains a fundamental domain-model fragmentation where the word **"Shield"** has three simultaneous, incompatible meanings across three different layers of the codebase. This ambiguity is the root cause of the 15 vs. 16 confusion.

**Key finding:** The 15-Shield / 16-Cambridge-Part situation is **partially a genuine contradiction and partially an intentional design** — but the two concepts are currently **entangled in the wrong layer (runtime component) instead of being separated by an architecture**.

**Critical answer (final question):**
> *Is the current 15-Shield / 16-Cambridge-Part situation a genuine architecture contradiction, or are Shield and Cambridge Part intentionally different domain entities?*

**ANSWER: Both. Evidence below.**

The repository contains two separate, coexisting models:
1. **3-Paper Scoring Model** (MockAssessmentEngine.js): Shield = score icon (max 5 per Paper, 15 total). This is a **scoring abstraction** that is completely independent of how many Cambridge Parts exist.
2. **BossBattleZone Task Model**: Shield = Cambridge Part task (shieldName = "Shield 1 (Listening P1)"). Here Shield ≡ Part. With 16 Parts, this produces 16 tasks, contradicting the 15-Shield scoring model from (1).

These two models **coexist without a mediating architecture layer**.

---

## B. Entity Model

### Identified Entities

| Entity | Source file | Data structure | ID | Responsibility | Runtime role |
|--------|------------|----------------|-----|----------------|--------------|
| **Week** | `src/data/weeks/week_*/index.js` | JS module with hub exports | weekNumber (int) | Content container for 15 tasks | Data source for all zones |
| **Quest** | `src/config/questSchedule.js` | `QUEST_SCHEDULE[day].quests[]` | String (e.g. `gear1_webtoon`) | Named learning activity per day | Completion tracking in useDailyQuestStore |
| **Learning Task** | `questSchedule.js` quests 1–12 | Quest object `{ id, zone, gearIndex, station }` | Quest ID | Cambridge-aligned practice (NOT exact exam) | Renders hub content |
| **Boss Station Task** | `questSchedule.js` quests 13–15 | Quest object with `station: 'listening_boss'` | `boss_listening`, `boss_reading`, `weekly_review` | Day 5 entry points to BossBattleZone | Triggers BossBattleZone render |
| **Cambridge Part** | `BossBattleZone.jsx` task array `{ id, shieldName }` | JS object per Part | `list_p1`–`spk_p4` | Atomic Cambridge exam task | Rendered by hardcoded Part component |
| **Shield (Meaning 1 — UI reward)** | `BossIntro.jsx` `userShields`, `BossBattleZone.jsx` `earnedShields` | String array (task IDs) | Task ID string | Visual reward icon after task completion | Displayed on victory screen |
| **Shield (Meaning 2 — Score icon)** | `MockAssessmentEngine.js` `shields` | Integer 0–5 per Paper | — | Cambridge Paper score representation | Mock result display (5+5+5 = 15 max) |
| **Shield (Meaning 3 — Task metadata label)** | `BossBattleZone.jsx` `shieldName` field | String in task object | "Shield N (Part X)" | Display label on task card | Rendered in victory list |
| **Cambridge Paper** | `MockAssessmentEngine.js` sections | `{ name, scorePct, shields }` | `'Reading & Writing'`, `'Listening'`, `'Speaking'` | 3-Paper score grouping | Mock result output |
| **Rotation Cycle** | `bossRotarySchedule.js` `BOSS_ROTARY_CYCLES` | Object keyed 0–4 | Integer 1–5 (0 = full mock) | Weekly Cambridge Part exposure schedule | Controls BossBattleZone task array |
| **Full Mock** | `BossBattleZone.jsx` `isFullMock` | Boolean flag | cycleNumber 5 or 0 | Special mode: all Cambridge Parts at once | Runs 14 hardcoded tasks (L1–L5, R1–R6, S1–S3) |
| **Validator/Gate** | `gate17_fidelity_doctrine.mjs`, `gate16_content_quality.mjs`, `cefr_curriculum_guard.mjs` | Node scripts | Gate number | Data quality enforcement | Pre-commit CI gate |
| **Rotation Cycle** | `bossRotarySchedule.js` | `getBossRotaryConfig(weekNumber)` | cycleKey = (week - 33 + 1) % 5 | Maps week → cycle | Used by BossBattleZone and BossIntro |

### Entity Relationships

```
Week (33, 34...)
  ├── 15 Quests (questSchedule.js)
  │     ├── Quests 1–12: Learning Tasks (Zones 1–3, Cambridge-aligned practice)
  │     └── Quests 13–15: Boss Station Tasks (Zone 4 entry points)
  │           ├── boss_listening  → BossBattleZone (Cycle-specific tasks)
  │           ├── boss_reading    → BossBattleZone (Cycle-specific tasks)
  │           └── weekly_review   → BossBattleZone (Cycle-specific tasks)
  └── Rotation Cycle (bossRotarySchedule.js)
        ├── Cycles 1–4: 3–4 Cambridge Parts each
        └── Cycle 5: Full Mock (14 Cambridge Parts + MockAssessmentEngine scoring)

Cambridge Parts (16 total)
  ├── Listening: L1, L2, L3, L4, L5 (5 Parts)
  ├── Reading & Writing: R1, R2, R3, R4, R5, R6, R7 (7 Parts)
  └── Speaking: S1, S2, S3, S4 (4 Parts)

Shield (3 meanings — NOT one entity)
  ├── Meaning 1: Task completion reward (earnedShields[] = task ID string)
  ├── Meaning 2: Cambridge Paper score icon (0–5 per Paper, max 15 total)
  └── Meaning 3: Task label ("Shield 7 (R&W P2)" = display metadata only)
```

---

## C. Shield Definition

### Evidence from Repository

**Shield is NOT a single domain entity.** It has three simultaneous definitions:

#### Shield Meaning 1 — UI Completion Reward Icon
**Source:** `BossBattleZone.jsx` lines 190, 231–232, 285
```js
const [earnedShields, setEarnedShields] = useState([]);
// On task complete:
setEarnedShields(prev => [...prev, taskId]);
// Rendered as:
earnedShields.map((sh, idx) => <div>Shield Earned: {sh}</div>)
```
- **Type:** `string[]` — an array of completed task IDs
- **Semantic meaning:** "I completed this Cambridge Part task"
- **Relationship to Cambridge:** 1:1 with Parts (each Part earns one Shield)
- **Relationship to 15:** Unbounded (could be 1, 3, or 14 per session)

#### Shield Meaning 2 — Cambridge Paper Score Icon (0–5 stars/shields per Paper)
**Source:** `MockAssessmentEngine.js` lines 45–98
```js
const rwShields = Math.min(5, Math.max(1, Math.round((rwPct / 100) * 5)));
const listenShields = Math.min(5, ...);
const speakingShields = Math.min(5, ...);
const totalShieldsEarned = rwShields + listenShields + speakingShields; // max = 15
return { maxShieldsTotal: 15, ... }
```
- **Type:** Integer per Paper (0–5)
- **Semantic meaning:** "Your performance on this Cambridge Paper = X/5 Shield icons"
- **Relationship to Cambridge:** N:1 — ALL Cambridge Parts in a Paper → ONE Shield score
- **Relationship to 15:** Hard-coded maximum (5L + 5RW + 5S = 15)
- **Critical finding:** This meaning is NOT used in weekly Cycles 1–4. It is ONLY active during Full Mock (cycleNumber 0/5) — but even then, MockAssessmentEngine is not called from BossBattleZone! It exists as a standalone service.

#### Shield Meaning 3 — Task Metadata Display Label
**Source:** `BossBattleZone.jsx` task object `shieldName` field
```js
{ id: 'list_p1', name: 'Listening Part 1: Draw Lines', shieldName: 'Shield 1 (Listening P1)' }
{ id: 'rw_p2', name: 'Reading Part 2: ...', shieldName: 'Shield 7 (R&W P2)' }
```
- **Type:** String label
- **Semantic meaning:** "This task is labeled as Shield N for display"
- **Relationship to 15:** The numbering goes 1–15, but this is purely cosmetic
- **Critical finding:** The numbering scheme (Shield 1–5 = Listening, Shield 6–12 = R&W, Shield 13–15 = Speaking) implies the 15 = 5+7+3 model, NOT the 5+5+5 Paper score model.

#### Shield Meaning 4 — Display count in BossIntro
**Source:** `BossIntro.jsx`
```jsx
<span>{rotaryConfig.shieldCount} Shields</span>
```
- **Draws from:** `bossRotarySchedule.js` `shieldCount` field (3, 4, 4, 4, 15)
- **Semantic meaning:** "How many tasks in this cycle" (for Cycles 1–4) OR "max Paper Shields" (for Cycle 0/Full Mock)
- **Critical finding:** `shieldCount` means **different things** in different cycles. Per the comment (written in Phase A): "For Cycles 1–4: shieldCount = task count. For Cycle 0: shieldCount = 15 = max Paper score." This is a field with dual semantics.

**Verdict:** `shieldCount` is semantically overloaded. The field has two meanings depending on context.

---

## D. Shield → Cambridge Part Mapping

| shieldName | task_id | Cambridge Part | Paper | Component | Notes |
|------------|---------|----------------|-------|-----------|-------|
| Shield 1 | `list_p1` | Listening P1 | Listening | SVGLineMatcher | Active Cycle 1 |
| Shield 2 | `list_p2` | Listening P2 | Listening | NotepadNoteCompleter | Active Cycle 1 |
| Shield 3 | `list_p3` | Listening P3 | Listening | VisualMatchingAH | Active Cycle 1 |
| Shield 4 | `list_p4` | Listening P4 | Listening | MultipleChoice3Pic | Active Cycle 2 |
| Shield 5 | `list_p5` | Listening P5 | Listening | SVGColorAndWrite | Active Cycle 2 (Phase A fix) |
| Shield 6 | `rw_p1` | R&W P1 | Reading & Writing | WordBankMatchingGrid | Active Cycle 2 |
| Shield 7 | `rw_p2` | R&W P2 | Reading & Writing | DialogueAHCompleter | Active Cycle 3 |
| Shield 8 | `rw_p3` | R&W P3 | Reading & Writing | RWPart3ClozeWithTitle | Active Cycle 3 |
| Shield 9 | `rw_p4` | R&W P4 | Reading & Writing | InlineTextClozeDropdown | Active Cycle 3 |
| Shield 10 | `rw_p5` | R&W P5 | Reading & Writing | TextExtractionCompleter | Active Cycle 3 |
| Shield 11 | `rw_p6` | R&W P6 | Reading & Writing | OpenClozeCompleter | Active Cycle 4 |
| Shield 12 | `rw_p7` | R&W P7 | Reading & Writing | **MISSING** — no render condition | Config but no component mount |
| Shield 13 | `spk_p1` | Speaking P1 | Speaking | FindDifferencesInteractive | Active Cycle 2 |
| Shield 14 | `spk_p2` | Speaking P2 | Speaking | InformationExchangeP2 | Active Cycle 4 |
| Shield 15 | `spk_p3` | Speaking P3 | Speaking | PictureStoryContinuation | Active Cycle 4 |
| *(Shield 16?)* | `spk_p4` | Speaking P4 | Speaking | PersonalQuestionsCompleter | No shieldName assigned; URL-access only |

**Mapping verdict: 1:1 in BossBattleZone** — each Cambridge Part maps to exactly one task, one shieldName.

**The 15 in BossBattleZone's shieldName numbering scheme goes from 1–15, covering L1–L5 (5) + R1–R6 (6) + S1–S3 (3) = 14 Parts with labels.** R7 and S4 are implicitly "Shield 16" and beyond — but the numbering breaks down here.

---

## E. Complete 16-Part Cambridge Inventory

| Part | ID | Name | Component | Has data path | In rotation | In Mock | Notes |
|------|----|------|-----------|---------------|------------|---------|-------|
| L1 | `list_p1` | Draw Lines | SVGLineMatcher | ✅ | Cycle 1 | ✅ | PASS |
| L2 | `list_p2` | Note Completion | NotepadNoteCompleter | ✅ | Cycle 1 | ✅ | Audio defect (DEF-001) |
| L3 | `list_p3` | Matching A-H | VisualMatchingAH | ✅ | Cycle 1 | ✅ | PASS |
| L4 | `list_p4` | 3-Picture Quiz | MultipleChoice3Pic | ✅ | Cycle 2 | ✅ | PASS |
| L5 | `list_p5` | Color & Write | SVGColorAndWrite | ✅ | Cycle 2 (Phase A) | ✅ | TTS defect (DEF-003) |
| R1 | `rw_p1` | Word Bank Match | WordBankMatchingGrid | ✅ | Cycle 2 | ✅ | PASS |
| R2 | `rw_p2` | Dialogue A-H | DialogueAHCompleter | ✅ | Cycle 3 | ✅ | PASS |
| R3 | `rw_p3` | Cloze + Title | RWPart3ClozeWithTitle | ✅ | Cycle 3 | ✅ | PASS |
| R4 | `rw_p4` | 10-Gap Cloze | InlineTextClozeDropdown | ✅ | Cycle 3 | ✅ | PASS |
| R5 | `rw_p5` | Story Detective | TextExtractionCompleter | ✅ | Cycle 3 | ✅ | PASS |
| R6 | `rw_p6` | Open Cloze | OpenClozeCompleter | ✅ | Cycle 4 | ✅ | PASS |
| **R7** | `rw_p7` | **Story Writing** | **MISSING** | ✅ data wired (Phase A) | **Config only** | ❌ Not in Mock | No render condition in BossBattleZone |
| S1 | `spk_p1` | Find Differences | FindDifferencesInteractive | ✅ | Cycle 2 | ✅ | PASS |
| S2 | `spk_p2` | Ask & Answer | InformationExchangeP2 | ✅ | Cycle 4 | ✅ | PASS |
| S3 | `spk_p3` | Picture Story | PictureStoryContinuation | ✅ | Cycle 4 | ✅ | PASS |
| **S4** | `spk_p4` | **Personal Qs** | PersonalQuestionsCompleter | ✅ | **NOT in any Cycle** | ❌ Not in Mock | URL-accessible only via `part=s4` |

**Summary:**
- 14 Parts: fully implemented and in active rotation or Mock ✅
- 1 Part (R7): data wired but no render condition and absent from Full Mock ❌
- 1 Part (S4): component exists, accessible via URL, but not in any cycle or Mock ❌
- **Full Mock (cycleNumber 5) only has 14 tasks** (L1–L5, R1–R6, S1–S3) — missing R7 and S4

---

## F. Complete 15-Shield Inventory

### Where does "15 Shields" appear in the codebase?

| Location | Value | Meaning |
|----------|-------|---------|
| `MockAssessmentEngine.js` `maxShieldsTotal: 15` | 15 | Maximum Paper score: 5L + 5RW + 5S (Meaning 2) |
| `bossRotarySchedule.js` Cycle 0 `shieldCount: 15` | 15 | Display badge on BossIntro for Full Mock (Meaning 4) |
| `bossRotarySchedule.js` Cycle 0 comment `"all_15_shields"` | 15 | Documentation shorthand |
| `AGENTS.md` "15 Shields as a 3-Paper scoring model (5 Listening + 5 R&W + 5 Speaking)" | 15 | Authoritative product doctrine |
| `BossBattleZone.jsx` shieldName numbers 1–15 | 15 | Task labels for 15 of 16 Parts (R7/S4 excluded) |
| `questSchedule.js` comments "15 Khiên" / "15 Quests" | 15 | Two different uses: quest count AND shield score |
| `blueprint.json` W33 `target_shields: 3` | 3 | Cycle 1 task count for that week |
| `blueprint.json` W33 `tested_skills: [l1,l2,l3]` | 3 | Same |

**CRITICAL FINDING:** "15 Shields" is NOT one thing in the repo. It simultaneously refers to:
1. **15 Cambridge Part labels** (shieldName 1–15, excluding R7 and S4)
2. **15 max Paper score icons** (5+5+5 from MockAssessmentEngine)

These are currently **accidentally equivalent** only if you exclude R7 and S4 from consideration. If R7 and S4 are added to rotation, the shieldName scheme would require "Shield 16" and "Shield 17" — breaking the 15-Shield numbering.

---

## G. W33–W36 Current Mapping

| Week | Cycle | Active Parts | Quest 13 | Quest 14 | Quest 15 |
|------|-------|-------------|----------|----------|----------|
| W33 | 1 | L1, L2, L3 | boss_listening (L1) | boss_reading (L2) | weekly_review (L3) |
| W34 | 2 | L4, **L5**, R1, S1 | boss_listening (L4) | boss_reading (R1) | weekly_review (S1) |
| W35 | 3 | R2, R3, R4, R5 | boss_listening (R2) | boss_reading (R3) | weekly_review (R4+R5) |
| W36 | 4 | R6, [R7 cfg], S2, S3 | boss_listening (R6) | boss_reading (S2) | weekly_review (S3) |

**Notes:**
- W34 L5 is now in BossBattleZone.jsx Cycle 2 (Phase A fix applied)
- W36 Cycle 4: `rw_p7` is in `bossRotarySchedule.js` `testedSkills` but **NOT in BossBattleZone.jsx Cycle 4 task array** (Phase B pending)
- Quest completion map: tasks are sequentially mapped to Day 5 quests (task 0→boss_listening, task 1→boss_reading, task N→weekly_review). This is **hardcoded by index**, not by Part identity.

---

## H. Full Mock Mapping

### Current state (cycleNumber 5/0):

**BossBattleZone.jsx `isFullMock` task list (hardcoded):**
```
L1, L2, L3, L4, L5,  (5 parts)
R1, R2, R3, R4, R5, R6,  (6 parts)
S1, S2, S3  (3 parts)
= 14 tasks
```

**Missing from Full Mock:** R7 (`rw_p7`) and S4 (`spk_p4`)

**MockAssessmentEngine.js:** Independently implements 5+5+5 Paper scoring. Is **NOT called** from BossBattleZone. The two systems are disconnected — completing BossBattleZone's Full Mock never calls `evaluateMockAssessment()`.

**getRotaryTaskLabel()** in bossRotarySchedule.js labels quest 13–15 for Mock:
- boss_listening → "Full Mock Listening Shield"
- boss_reading → "Full Mock Reading & Writing Shield"
- weekly_review → "Full Mock Speaking & Passport"

But the quest completion handler in BossBattleZone always calls `completeQuest(week, 'boss_listening')` for task index 0, `boss_reading` for index 1, etc. — regardless of what part is actually being completed.

---

## I. Rotation Architecture

### Where is rotation defined?

| Source | What it defines | Authority |
|--------|----------------|-----------|
| `bossRotarySchedule.js` `BOSS_ROTARY_CYCLES` | `testedSkills[]` per cycle | Aspirational config (NOT enforced at runtime) |
| `BossBattleZone.jsx` `currentTasks` array | Actual task list rendered | **Runtime ground truth** |
| `bossRotarySchedule.js` `getBossRotaryConfig(week)` | cycleNumber, cycleName, shieldCount | Display metadata + determines isFullMock |
| `questSchedule.js` | boss_listening/boss_reading/weekly_review quest IDs | Entry point routing only |

**Critical finding:** Two representations of "what Parts run in Cycle N" exist simultaneously:
1. `bossRotarySchedule.js` testedSkills (was historically out of sync with runtime)
2. `BossBattleZone.jsx` currentTasks (actual runtime)

Phase A corrected L5's presence in Cycle 2 for runtime, but `testedSkills` in bossRotarySchedule Cycle 4 still contains `rw_p7` while BossBattleZone Cycle 4 array does not.

---

## J. Single-Source-of-Truth Audit

| Fact | Source 1 | Source 2 | Source 3 | Consistent? |
|------|----------|----------|----------|------------|
| "Which Cambridge Parts are in Cycle 2?" | bossRotarySchedule.js `testedSkills: [l4,l5,rw1,spk1]` | BossBattleZone.jsx task array `[list_p4, list_p5, rw_p1, spk_p1]` | blueprint.json W34 `tested_skills: null` | ⚠️ Partially (blueprint empty) |
| "Max Shield score" | MockAssessmentEngine.js `maxShieldsTotal: 15` | bossRotarySchedule.js Cycle 0 `shieldCount: 15` | AGENTS.md "15 Shields (5+5+5)" | ✅ Consistent |
| "What is a Shield?" | Meaning 1 (completion icon) | Meaning 2 (Paper score) | Meaning 3 (task label) | ❌ Not consistent |
| "Is R7 in Cycle 4?" | bossRotarySchedule.js YES (`rw_p7`) | BossBattleZone.jsx NO (absent from Cycle 4 array) | — | ❌ Contradiction |
| "Is S4 in any cycle?" | bossRotarySchedule.js NO | BossBattleZone.jsx NO (not in any cycle array) | URL access YES | ⚠️ Partial |
| "Cambridge Parts in Full Mock" | BossBattleZone.jsx 14 (L1-5, R1-6, S1-3) | bossRotarySchedule.js "all_15_shields" (documentation) | AGENTS.md "16 Parts" | ❌ Contradiction |
| "What does shieldCount mean?" | Cycle 1–4: task count | Cycle 0: max Paper icons | bossRotarySchedule.js comment says both | ❌ Dual semantics |
| "What runs Week 5?" | bossRotarySchedule.js Cycle 0 (cycleKey = (week-33+1)%5 = 0) | BossBattleZone.jsx `isFullMock = cycleNumber === 5 || cycleNumber === 0` | W37 index.js | ✅ Consistent |
| "How scoring works in Mock" | MockAssessmentEngine.js (authoritative) | BossBattleZone.jsx (NOT connected) | — | ❌ Not connected |

---

## K. BossBattleZone Coupling Audit

### Hardcoded Cambridge Parts in BossBattleZone.jsx

```jsx
// ALL of these are hardcoded Cambridge Part references:
{activeTaskId === 'list_p1' && <SVGLineMatcher ... />}
{activeTaskId === 'list_p2' && <NotepadNoteCompleter ... />}
{activeTaskId === 'list_p3' && <VisualMatchingAH ... />}
{activeTaskId === 'list_p4' && <MultipleChoice3Pic ... />}
{activeTaskId === 'list_p5' && <SVGColorAndWrite ... />}
{activeTaskId === 'rw_p1' && <WordBankMatchingGrid ... />}
... (11 more hardcoded conditions)
```

**Coupling analysis:**
- BossBattleZone is **simultaneously** a Cambridge Part router, a cycle manager, a data wrangler, a quest tracker, and a scoring display.
- It contains hardcoded `if (cycleNumber === 1)`, `if (cycleNumber === 2)` etc. — cycle logic is baked into the render function.
- It contains hardcoded data wiring: `bossData.listening.p1 = data?.listening_hub?.listening_p1 || ...` with 3-layer fallback chains.
- The `requestedTaskId` URL param system allows ANY Cambridge Part to be accessed directly — bypassing cycle logic entirely. This is the QA/URL deep-link feature.

**Quest completion mapping is hardcoded by index:**
```js
if (activeTaskIndex === 0) completeQuest(week, 'boss_listening');
else if (activeTaskIndex === 1) completeQuest(week, 'boss_reading');
// index N (last) → complete 'weekly_review'
```
This means "which quest a Part completes" depends purely on the order it appears in the currentTasks array, NOT on what Cambridge Part it represents.

**BossBattleZone IS a monolithic orchestration layer.** It handles:
- Rotation logic (hardcoded `cycleNumber === N`)
- Data mapping (14 optional-chain lookup chains)
- Cambridge Part routing (14+ if/else render conditions)
- Quest completion tracking
- Shield reward display
- Full Mock mode detection

---

## L. Learning vs Assessment Boundary Audit

### W33 Quest 1–4 (Learning Tasks)

**questSchedule.js evidence:**
- Quests 1–12 use `zone: 1`, `zone: 2`, `zone: 3` — these are NOT BossBattleZone
- They reference `gearIndex` or `station` keys pointing to hub content
- They are explicitly labeled as learning gear names (Scene Explorer, Voice Shadow, Story Retell, etc.)

**Does Quest 1–4 content enforce exact Cambridge format?**
- Gate17 (`gate17_fidelity_doctrine.mjs`) validates `listening_hub.js`, `reading_hub.js`, `writing_hub.js`, `speaking_hub.js` — the SAME hubs used by both Learning Tasks AND Boss Zone
- This means Gate17 applies Cambridge Flyers mechanic invariants (INV-L1, INV-L4, INV-R1, etc.) to ALL hub data, regardless of whether it will be used in a learning context or an assessment context
- **There is no architectural boundary** between "learning data" and "assessment data" in the validators

**Finding:** The code DOES distinguish zones (zones 1–3 = learning, zone 4 = assessment) in routing, but the **data layer does not distinguish them**. One hub file feeds both learning stations and Boss Battle. Gates validate hub files without knowing whether a piece of content will be presented as practice or as a Cambridge exam task.

**Is the learning/assessment boundary enforced?** Partially in routing (zone routing), not at all in data or validation.

---

## M. Alignment vs Fidelity Audit

### Current Validators

| Validator | What it checks | Alignment or Fidelity? | Applied to |
|-----------|---------------|----------------------|------------|
| `gate17_fidelity_doctrine.mjs` | Cambridge mechanic invariants (exact counts, formats) | **Fidelity** | ALL hub data |
| `gate16_content_quality.mjs` | CLIL facts, writing chunks, vocabulary quality | **Alignment** | All week content |
| `cefr_curriculum_guard.mjs` | CEFR vocabulary level compliance | **Alignment** | Text content |
| No validator | Dual-speaker audio correctness | **Neither** — gap | Audio files |
| No validator | Quest 1–4 vs Quest 5 content distinction | **Neither** — gap | All content |

**Critical finding:** Gate17 applies exact Cambridge Flyers mechanic counts (e.g., INV-L1: "1 isExample + 5 scored names + 6 targets") to ALL hub data. This means:
- Learning practice content for Quest 1–4 MUST satisfy exact Flyers format
- There is no "lighter" alignment check for learning stations vs. strict fidelity check for Boss Zone

**AGENTS.md doctrine states:**
> "Quest 1–4: Cambridge-aligned learning/practice. Exact Flyers mechanics NOT required."
> "Quest 5: Active Flyers Shields. Exact Cambridge mechanics required."

**The code does NOT enforce this distinction.** Gate17 applies exact mechanics to all content regardless of quest type.

---

## N. Audio QA Architecture

### Does any current layer detect the L2 single-voice defect (DEF-001)?

| Layer | Capability | Can detect DEF-001? |
|-------|-----------|-------------------|
| Gate17 (fidelity) | Validates data structure (counts, formats, field presence) | ❌ No audio inspection |
| Gate16 (content quality) | Text content quality, no audio | ❌ No audio inspection |
| CEFR guard | Vocabulary level | ❌ No audio inspection |
| Build system (npm run build) | JS/JSX compilation | ❌ No audio inspection |
| Audio manifest checker (inventory_week_media.mjs) | File existence, size | ❌ No content inspection |
| Human QA | Manual | ✅ Only if explicitly tested |
| **None** | Acoustic speaker diarization | ❌ Not implemented |

**Finding:** There is **no automated gate capable of detecting a single-voice multi-speaker simulation defect**. The L2 defect (DEF-001) would require either:
1. An ASR transcript validator (compare spoken text against expected speaker distribution)
2. An acoustic/pitch analysis tool (detect voice identity changes)
3. A human QA review with audio playback checklist

The Audio Pipeline SOP (`week_pipeline_sop.md`) specifies `listening_p2_full.mp3` as "Neural2-D + Journey-F" but this is documentation, not a machine-enforced gate.

---

## O. Domain-Model Smells

| Smell | Location | Evidence |
|-------|----------|---------|
| **Field dual semantics** | `shieldCount` in bossRotarySchedule.js | Means "task count" for Cycles 1–4, means "max Paper icons" for Cycle 0 |
| **Entity name collision** | "Shield" as UI icon, score icon, and task label | 3 simultaneous incompatible meanings |
| **Missing entity** | No Cambridge Paper entity | Papers (Listening/R&W/Speaking) exist only in MockAssessmentEngine comments |
| **Disconnected scoring** | MockAssessmentEngine never called from BossBattleZone | 5+5+5 scoring is declared but not wired to actual gameplay |
| **Hardcoded cycle logic** | BossBattleZone 4 hardcoded `cycleNumber === N` branches | Cycle logic should be data-driven, not compiled into the component |
| **Single-file orchestration** | BossBattleZone.jsx does routing, data, display, and tracking | Violates single-responsibility |
| **Config/runtime mismatch** | bossRotarySchedule testedSkills vs BossBattleZone currentTasks | Two sources of truth for "what runs in cycle N" |
| **Naming confusion** | `testedSkills` contains Cambridge Part IDs like `listening_p4` | "Skill" ≠ "Cambridge Part"; naming obscures the domain |
| **Missing entity in data model** | `questSchedule.js` comment says "15 Quests" — but these are learning tasks, not exam parts | "Quest" is overloaded (product feature quest vs. Cambridge task) |
| **Quest completion index-coupling** | `handleTaskComplete` uses task index 0/1/N to map to quest IDs | Brittle: adding a task before task 0 would break quest completion |

---

## P. Contradictions / Inconsistencies

| # | Contradiction | Evidence A | Evidence B |
|---|--------------|-----------|-----------|
| 1 | "15 Shields" refers to different things | MockAssessmentEngine: 15 = max Paper score (5+5+5) | BossBattleZone shieldNames: 15 = 15 out of 16 Cambridge Parts |
| 2 | Full Mock has 14 or 16 Parts | BossBattleZone `isFullMock` task list: 14 Parts (R7 and S4 missing) | AGENTS.md: "all 16 Cambridge Parts" |
| 3 | R7 in Cycle 4 | bossRotarySchedule.js `testedSkills: ["rw_p6","rw_p7",...]` | BossBattleZone Cycle 4 array: no `rw_p7` |
| 4 | Scoring model disconnected | MockAssessmentEngine implements 5+5+5 scoring | evaluateMockAssessment() is never called from BossBattleZone |
| 5 | "16 Cambridge Parts" in doctrine | AGENTS.md: "all 16 Cambridge Parts" | No code enforces all 16 must exist before Full Mock |
| 6 | Quest 1–4 Cambridge-aligned but not exact format | AGENTS.md: "Exact Flyers mechanics NOT required" | Gate17 applies exact mechanics invariants to ALL hub data |
| 7 | shieldCount dual semantics | Cycle 1 shieldCount=3 means "3 tasks" | Cycle 0 shieldCount=15 means "15 Paper score icons" |
| 8 | `testedSkills` field name | Contains Cambridge Part IDs (e.g., `listening_p1`) | "Skill" ≠ Cambridge Part in Cambridge terminology |

---

## Q. Architectural Risks

| Risk | Severity | Description |
|------|----------|-------------|
| R7/S4 activation will break 15-shield numbering | HIGH | Adding R7 and S4 to active rotation requires "Shield 16" and "Shield 17", breaking the implicit 15-label scheme |
| Full Mock is incomplete | HIGH | Full Mock runs 14 Parts without the user knowing R7/S4 are excluded |
| MockAssessmentEngine is dead code | MEDIUM | 5+5+5 scoring engine exists but is never called; scoring is purely "how many tasks you completed" |
| Any rotation change breaks quest completion | MEDIUM | Quest completion mapping by index 0→boss_listening means adding/reordering tasks changes which quest gets credit |
| No audio quality gate | HIGH | DEF-001-class defects (single voice impersonating 2 speakers) undetectable by automated gates |
| Learning/Assessment conflation | MEDIUM | Gate17 forces learning content to meet exact exam standards; pedagogically unnecessary |
| BossBattleZone monolith | MEDIUM | All Cambridge Part decisions are baked into one 470-line component; difficult to extend |

---

## R. Recommended Target Architecture (Research Only — NOT Approved)

```
CAMBRIDGE DOMAIN (constants — never changes)
  Paper
    └── Part (16 total: L1-L5, R1-R7, S1-S4)
          └── format spec (item counts, mechanics, voice requirements)

ASSESSMENT DOMAIN (mediates Cambridge → Product)
  Shield = Cambridge Paper performance score (0-5 icons per Paper)
         = NOT a Cambridge Part
         = Product UX representation of how well a learner performed
         = max 15 (5L + 5RW + 5S)

TASK DOMAIN (atomic units of play)
  CambridgePartTask = one Cambridge Part instance for one week
    └── partId (e.g. list_p1)
    └── weekData (specific content)
    └── component (SVGLineMatcher etc.)

ROTATION DOMAIN (weekly schedule)
  Cycle → Week → CambridgePartTask[]

LEARNING DOMAIN (Quest 1-4)
  LearningActivity → preparesFor CambridgePartTask[]
  (validation: ALIGNMENT only, not fidelity)

MOCK DOMAIN (Week 5)
  FullMock → ALL 16 CambridgePartTasks
    → evaluates via MockAssessmentEngine
    → produces Paper Shield scores (3 scores, max 15 icons)

RUNTIME
  BossBattleZone reads Rotation config
  renders CambridgePart task for current cycle
  on complete: updates earnedCompletions[] (not "shields")
  on fullMock complete: calls MockAssessmentEngine → Paper scores → Shield icons
```

Key changes this would require:
- Rename `shieldCount` → `partCount` for Cycles 1–4
- Rename `testedSkills` → `activeParts` or `scheduledParts`
- Rename `earnedShields` → `completedPartIds`  
- Create `shieldScore` as a dedicated type (integer 0–5 per Paper)
- Add a CambridgePartRegistry (currently implicit in BossBattleZone)
- Connect MockAssessmentEngine to Full Mock completion

---

## S. Migration Strategy (Research Only — NOT Approved)

**Phase 1 (zero runtime change):**
- Add `CambridgePartRegistry` as a new config file — maps partId → Paper, format, component
- Add `PartTaskSchedule` to replace runtime `currentTasks` hardcoding in BossBattleZone
- Add `audioQualityManifest` describing expected voice configuration per audio file

**Phase 2 (fix disconnected systems):**
- Wire `evaluateMockAssessment()` to BossBattleZone Full Mock completion
- Separate Shield score (0–5 per Paper) from Part completion (task ID)

**Phase 3 (fix learning/assessment boundary):**
- Create `learningGate` (alignment only) vs. `assessmentGate` (fidelity) in validation scripts
- Apply Gate17 fidelity invariants ONLY to hub keys used in Boss Zone tasks

**Phase 4 (complete 16 Parts):**
- Add R7 render condition to BossBattleZone (requires component decision)
- Add R7/S4 to Full Mock task list
- Decide: does S4 get a cycle slot, or is it always Mock-only?

---

## T. Files That WOULD Need Modification (Research Only)

| File | Why | Change type |
|------|-----|------------|
| `BossBattleZone.jsx` | Extract Cambridge Part registry; fix quest completion index coupling; add R7 render; wire MockAssessmentEngine | Refactor |
| `bossRotarySchedule.js` | Rename `shieldCount` → `partCount`; rename `testedSkills` → `activeParts`; add R7 to Cycle 4 array | Rename + data |
| `MockAssessmentEngine.js` | Export hook that BossBattleZone can call on Full Mock complete | Integration |
| `questSchedule.js` | No change required | — |
| `gate17_fidelity_doctrine.mjs` | Add mode param (LEARNING vs ASSESSMENT) to skip exact-format invariants for learning data | Parameterize |
| `scripts/regenerate_w33_listening_audio.mjs` | Fix L2 single-voice generation (DEF-001) | Bug fix |
| New: `src/config/cambridgePartRegistry.js` | Map partId → Paper, format spec, component name | New file |
| New: `scripts/audio_quality_manifest_validator.mjs` | Check audio file against expected voice configuration | New gate |

---

## Final Answer

> **"Is the current 15-Shield / 16-Cambridge-Part situation a genuine architecture contradiction, or are Shield and Cambridge Part intentionally different domain entities?"**

**ANSWER: Both simultaneously — proven from repository evidence.**

**Evidence that they ARE intentionally different:**
- `MockAssessmentEngine.js` (authoritative scoring) uses Shield = Paper score (0–5), max 15. This model is 3-Paper based and is completely independent of Part count.
- AGENTS.md states "15 Shields as a 3-Paper scoring model (5 Listening + 5 R&W + 5 Speaking)" — an explicit doctrine that Shields belong to Papers, not Parts.
- In this model: 16 Parts + 15 Shields coexist cleanly because they live in different domains.

**Evidence that they ARE accidentally conflated (genuine contradiction):**
- `BossBattleZone.jsx` treats Shield ≡ Part — `shieldName: 'Shield 7 (R&W P2)'` implies each Part is a Shield. With 16 Parts, this creates "Shield 16", breaking the 15-Shield naming convention.
- `bossRotarySchedule.js` Cycle 0 documentation: `testedSkills: ["all_15_shields"]` implies 15 shields = 15 tasks — confusing scoring units with task units.
- Full Mock runs 14 Parts (R7 and S4 absent) — neither the 15-Shield Paper model nor the 16-Part Cambridge model, but an inconsistent middle state.
- MockAssessmentEngine is never called from BossBattleZone — the authoritative 3-Paper scoring model exists but is not connected to gameplay.

**The root cause:** The product intended Shield = Paper score (3 Papers, max 5 icons each = 15 max), but the runtime implementation evolved to treat Shield = Cambridge Part task completion. These two models are internally consistent individually but create contradictions when combined because they were never given a mediating architecture layer.
