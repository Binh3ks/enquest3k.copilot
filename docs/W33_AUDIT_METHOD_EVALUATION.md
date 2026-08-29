# 🔬 W33 AUDIT METHOD EVALUATION & QA VALIDITY ANALYSIS

**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  
**Focus**: Rigorous audit of the QA validation system itself to eliminate false confidence, tautological assertions, and naive DOM existence heuristics.

---

## 1. Executive Evaluation: The Anatomy of the Previous QA Breakdown

The previous QA assessment incorrectly reported "15/15 PASS", "3/3 Shields verified", and "0 OPEN findings" despite Day 5 routing two completely wrong Cambridge Paper tasks (`boss_reading` mounting Listening P2 and `weekly_review` mounting Listening P3). 

This failure occurred because the QA scripts suffered from four fundamental **Audit Pathologies**:

```
[Pathology 1: Tautological Oracle]
  Test script imports implementation under test → reads rotaryConfig.activeParts[1] ('list_p2') 
  → asserts that component is NotepadNoteCompleter → PASS! (Self-referential circular logic)

[Pathology 2: Shallow DOM Existence Heuristic]
  Test script checks document.body.innerText.includes('Cambridge A2 Flyers') 
  → ignores that the Paper is Listening instead of Reading & Writing → PASS!

[Pathology 3: Button-Count / Non-Crashing Proxy]
  Test script asserts button.length > 0 && !body.includes('Error:') 
  → ignores that the learner is experiencing the wrong skill/curriculum → PASS!

[Pathology 4: Selector Aggregation Ambiguity]
  Test script counts document.querySelectorAll('.divide-y > div, button') 
  → reports 25 items instead of distinguishing 5 tab filter buttons from 20 vocabulary cards.
```

---

## 2. Comprehensive Test Suite Audit

The table below evaluates every automated test in the EngQuest3K test harness against rigorous QA validity criteria:

| Test / Script | Tested Requirement | Inspected Evidence | Can Pass While Semantically Wrong? | Independent Oracle Source? | Negative Case Covered? | Runtime Identity Verified? | Interaction Tested? | Evaluation & Weakness Classification |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **`gate15_production_dom_assertions.mjs`** | DOM patterns for 15 tasks | Text regex, keyword overlap, button count | 🔴 **YES** | ❌ No (derived from spec which mirrored rotary schedule) | ⚠️ Partial (checks forbidden regex words) | ⚠️ Partial (checks text in body) | ⚠️ Shallow (clicks start/toggle) | 🔴 **AUDIT WEAKNESS — Spec Hardcoded Implementation Flaw**: Passed Day 5 because spec specifically asserted `NotepadNoteCompleter` on `boss_reading` and `VisualMatchingAH` on `weekly_review`. |
| **`w33_production_browser_audit.mjs`** | 15-task page render & word count | HTML length, error string absence, element count | 🔴 **YES** | ❌ No | ❌ No | ❌ No (no component type assertion) | ❌ No | 🔴 **AUDIT WEAKNESS — Shallow Render Proxy**: Assumed non-empty HTML with zero error strings equaled 100% semantic correctness. Aggregated tab buttons into word count (25). |
| **`gate16_content_quality.mjs`** | CLIL fact units, science report pills, writing chunks, Math equality | AST/module imports, regex pattern matching, string equality | 🟡 **MAYBE** | ⚠️ Partial (uses raw data files) | ❌ No | ❌ No (Static AST only) | ❌ No | 🟡 **AUDIT WEAKNESS — Static Isolation**: Verifies data files on disk, but does not verify whether the runtime component actually binds and displays this data. |
| **`gate17_fidelity_doctrine.mjs`** | 16-part Cambridge schema & 14 invariants | Schema JSON, coordinate matching, array lengths | 🟢 **NO** (Strict) | ✅ Yes (`cambridge-flyers-fidelity-doctrine.schema.json`) | ✅ Yes (rejects deviating schemas) | ⚠️ Partial (checks component file existence on disk) | ❌ No | 🟡 **AUDIT WEAKNESS — Runtime Disconnection**: Validates that all 16 components exist in `src/components/cambridge/`, but does not verify whether `TaskScreen` mounts the correct one for a given URL route. |
| **`cefr_curriculum_guard.mjs`** | Vocabulary CEFR tier & banned B2/C1 words | Word list lookup against Cambridge dictionary JSON | 🟢 **NO** | ✅ Yes (Cambridge vocabulary JSONs) | ✅ Yes (fails on banned words) | ❌ N/A (Data audit) | ❌ N/A | 🟢 **VALID DATA GATE**: Independently validates vocabulary tiers with zero reliance on runtime state. |
| **`w33_human_simulation_qa.mjs` (NEW)** | Full human simulation across 15 tasks, Day 5 fidelity, Word Treasury | DOM component structure, audio element playback, negative input feedback, re-entry, mobile/desktop viewport | 🟢 **NO** | ✅ Yes (`docs/W33_HUMAN_QA_GOLDEN_ORACLE.json`) | ✅ Yes (submits incorrect answers, verifies error handling) | ✅ Yes (asserts forbidden component absence) | ✅ Yes (clicks, drags, inputs, navigates) | 🟢 **GOLDEN STANDARD AUDIT**: Full semantic, interactive, visual, and architectural verification. |

---

## 3. Classification of Naive Testing Heuristics

### 1. DOM Cleanliness & Error String Absences
- **Flaw**: Asserting that `document.body.innerText` does not contain `"Error: "` or `"data not found"` only proves that React did not throw an unhandled top-level exception. It provides **zero evidence** that the rendered content is the right task, the right skill, or the right curriculum.
- **Remedy**: Always assert the **positive semantic identity** and **forbidden component negative assertions**.

### 2. Button Counting & Element Tallies
- **Flaw**: Counting `document.querySelectorAll('button').length >= 3` proves interactive buttons exist, but cannot prove what action they trigger or whether they correspond to the expected learning activity.
- **Remedy**: Query exact `data-testid` and assert expected state transitions upon click.

### 3. Build Passing (`npm run build`)
- **Flaw**: Vite/TypeScript compilation only validates syntax, imports, and bundling. It cannot detect semantic routing collisions, broken audio paths, or wrong assessment parts.
- **Remedy**: Automated build is a **precondition**, never proof of correctness.

### 4. Cryptographic Hash Freeze (SHA-256)
- **Flaw**: Hashing a file locks whatever is inside it. If the file contains an architectural defect (such as `bossRotarySchedule.js` mapping all 3 Day 5 quests to Listening parts), hashing only serves to **freeze the defect**.
- **Remedy**: Hash freeze must only occur *after* multi-layer semantic and human-simulation verification passes 100%.

---

## 4. Mandatory QA Upgrades for Future Weeks (W34–W72)

1. **Independent Oracle Invariant**: No QA script may read routing or expected component identity from `rotarySchedule` or `TASK_ROUTING`. Expectations must come strictly from `WXX_HUMAN_QA_GOLDEN_ORACLE.json`.
2. **Forbidden Component Assertions**: Every assessment route must explicitly assert the absence of components from other Cambridge Papers.
3. **Negative Input Testing**: Every interactive task must execute at least one negative test (invalid input / incorrect choice) to ensure error boundaries and feedback loops work properly.
4. **Semantic Word Treasury Count**: Vocabulary counts must be evaluated by parsing distinct word identities, explicitly isolating UI tab buttons and summary cards.
