# STORY MISSION — LAW & FIX SUMMARY (SOURCE OF TRUTH)

> **Purpose**: This document is the single, authoritative artifact governing how Story Missions must be built, wired, and executed. It captures the final law, root causes discovered, and the non‑negotiable implementation rules to prevent repeats, drift, and mission leaks.

---

## 0) Scope
Applies to **all Story Mission work** (Week/Mission definitions, TurnManager, prompts, guards, UI tabs, engine wiring). If any file conflicts with this document, **this document wins**.

---

## 1) The LAW (Governing Principles)

### LAW‑1: ONE BRAIN ONLY
- **TurnManager is the single source of truth.**
- Exactly **one instance per missionId**.
- No recreation in prompts, guards, tabs, or engines.
- All modules receive a **reference**, never `new`.

### LAW‑2: DETERMINISTIC MISSION RAILS
- Each mission defines a **fixed ordered step list** (e.g., `name → age → student → like_school → grade → friends → goodbye`).
- Order is immutable at runtime.

### LAW‑3: STEP‑KEY TRACKING (NOT TEXT)
- Progress is tracked by **`stepKey`**, never by question text.
- Repeat prevention uses step keys only.

### LAW‑4: RESPONSE STRUCTURE (MANDATORY)
- Every non‑opening turn must be:
  1) **ACK** (1–3 words)
  2) **RECAST** (≤8 words)
  3) **ONE canonical question** (for the next step)
- No extra questions.

### LAW‑5: OPENING / CLOSING RULES
- **Opening**: canonical question for `step[0]` only. No ACK/RECAST.
- **Closing**: praise + goodbye. **No question**.

### LAW‑6: HINTS ARE COUPLED TO STEPS
- Hints come **only** from the mission step definition.
- Hints must match the canonical question for that step.
- LLM‑invented hints are forbidden.

### LAW‑7: ZERO‑TOLERANCE BAN LIST
- In Story Mission mode, **never** ask generic probing:
  - “That’s interesting”
  - “Tell me more”
  - “Can you explain”
  - “Why do you say that”
  - Any equivalent paraphrase

### LAW‑8: OVERRIDE AUTHORITY
- These laws override **all prior prompts, helpers, heuristics, and defaults**.

---

## 2) Root Causes Identified (Why It Broke)

### RC‑1: TurnManager Recreation
- Multiple `new TurnManager()` calls caused state resets.
- Result: repeated questions, skipped steps, mission mixing.

### RC‑2: Invalid missionId (NaN / undefined)
- Manager registry keyed by bad IDs created cross‑mission leaks.
- Result: Mission A asking Mission B questions.

### RC‑3: Inconsistent `askedStepKeys` Type
- Switched between `Set` and `Array` without refactor.
- Result: runtime errors (`.has is not a function`) and broken skipping.

### RC‑4: Broken Opening Flow
- Step marked as asked **before** displaying opening question.
- Result: opening jumped from `name` → `age`.

---

## 3) Non‑Negotiable Implementation Rules (Wiring)

### I‑1: Mission ID Hygiene
- `missionId` must be **numeric** and validated at creation.
- No implicit casting. No `undefined`.

### I‑2: TurnManager Lifecycle
- Created **once** at mission start.
- Stored in a single registry keyed by `missionId`.
- Passed by reference to:
  - Engine (prompt building)
  - Response guard
  - UI tab (marking progress)

### I‑3: Step Progression
- A step is marked **asked only after** the question is rendered.
- Advance to next step **only after student reply**.

### I‑4: `askedStepKeys` Consistency
- Choose **one** structure (Array **or** Set) and refactor all usages.
- All checks/adds must use the same API (`includes` vs `has`).

### I‑5: Prompt & Guard Alignment
- Prompt must request the exact structure (ACK/RECAST/QUESTION).
- Guard must **enforce** canonical question + step hints.
- Guard blocks banned phrases and overrides drift.

---

## 4) Acceptance Tests (Must Pass)

1) **Opening Test**
- Mission 1 always starts with `step[0]` canonical question.
- Never starts at `age` or later.

2) **Repeat Test**
- Same stepKey is never asked twice, even with paraphrases.

3) **Mission Isolation Test**
- Mission 2 never asks Mission 1 questions.

4) **Hints Match Test**
- Displayed hints match the current step’s canonical question.

5) **Ban List Test**
- No generic probing appears in Story Mission mode.

---

## 5) Working Style (MANDATORY)
- Do **not** patch incrementally.
- Fix root causes **end‑to‑end in one pass**.
- Do **not** ask the user to choose technical options.
- When broken: state the exact fault → apply a comprehensive fix.

---

## 6) Status
- This document is the **final source of truth** for Story Missions.
- Any future change must explicitly update this artifact.
