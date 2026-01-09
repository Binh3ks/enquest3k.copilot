📜 STORY MISSION LAW (MASTER ARTIFACT)

Status: FINAL · BINDING · NON-NEGOTIABLE
Applies to: EngQuest 3K – AI Tutor / Story Mission Mode
Authority: This LAW supersedes all previous prompts, comments, refactors, and assumptions.

0. PURPOSE

This artifact exists to lock the system’s behavior after repeated regressions.
Its goal is to guarantee:

Deterministic Story Missions

Zero question repetition

Zero free-chat drift

Stable hints that always match the question

A single source of truth (ONE BRAIN)

Any future change must be validated against this LAW.

1. ONE BRAIN PRINCIPLE (NON-NEGOTIABLE)
Rule

TurnManager is the ONLY source of truth for mission state.

Enforcement

Exactly ONE TurnManager instance per missionId

Mission ID must be cast with Number(missionId)

No recreation inside:

responseGuard

tutorPrompts

NovaEngine

Validation Signals

Console log on creation:

🎯 TurnManager created for Mission <id> | Steps: <ordered list>

If you ever see Mission NaN → LAW VIOLATION

2. MISSION RAILS (FIXED STEP SEQUENCE)
Rule

Story Missions progress through a fixed, ordered step rail.

Properties

Steps are defined by stepKey

Order is deterministic

Steps CANNOT be skipped

Implementation

getMissionSteps() returns ordered array

getNextStep():

Iterates sequentially

Skips already-asked steps

Stops ONLY at goodbye

3. STEP-BASED REPEAT PREVENTION (CRITICAL)
Rule

Repetition is tracked by stepKey, NEVER by text.

Canonical Change

❌ Text-based tracking (forbidden)

❌ canonicalizeQuestion()

❌ semantic similarity checks

✅ askedStepKeys: string[]

✅ includes(stepKey)

Required Methods

markStepAsked(stepKey)

wasStepAsked(stepKey)

getNextStep() must ONLY check stepKey

Forbidden API

❌ .has() (Set API)

❌ Mixed Set/Array usage

If askedStepKeys.has() appears anywhere → SYSTEM IS BROKEN

4. RESPONSE STRUCTURE LAW (ACK + RECAST + ONE QUESTION)
Rule

Every non-opening, non-closing turn MUST follow:

ACK – 1–3 words

RECAST – ≤ 8 words (correct model answer)

ONE canonical question (from TurnManager)

Constraints

Exactly ONE question

Question MUST match stepKey

Enforcement

Prompt explicitly describes structure

responseGuard validates output

5. OPENING & CLOSING OVERRIDES
Opening Turn

ACK: empty

RECAST: empty

Output: canonical question only

Closing Turn (goodbye)

Praise only

❌ NO question

❌ NO hints

6. HINTS ARE COUPLED TO STEPS (ABSOLUTE RULE)
Rule

Hints MUST come from the mission step definition, not the LLM.

Enforcement

Each stepKey defines its own hints[]

Prompt injects:

suggested_hints: <step.hints>
Forbidden

❌ AI-generated hints

❌ Hints inferred from response text

If hints don’t match the question → BUG, not pedagogy

7. GENERIC PROBING = ILLEGAL
Absolute Ban List

The AI must NEVER output:

“That’s interesting”

“Tell me more”

“Can you explain?”

“Why do you say that?”

“What do you think?”

Reason

These phrases destroy mission rails and force free-chat mode.

Enforcement

Ban list injected into every prompt

responseGuard removes + rejects violations

8. ERROR HANDLING LAW
Rule

Fallback responses MUST NOT introduce questions.

If a system error occurs:

Return neutral ACK only

Preserve TurnManager state

NEVER introduce probing questions

If fallback outputs a question → LAW VIOLATION

9. CACHE & STATE RESET LAW
Required After Structural Changes
Terminal (once):
rm -rf node_modules/.vite
rm -rf .vite
npm run dev
Browser:

Open /clear_cache.html

Hard refresh (Cmd + Shift + R)

Skipping this step may falsely appear as “Copilot didn’t fix anything”.

10. CURRENT SYSTEM STATUS (LOCKED)

✅ Step-based tracking implemented

✅ Array-based askedStepKeys

✅ .has() fully removed (MANDATORY)

✅ Hints coupled to step definitions

✅ Generic probing banned

✅ ACK + RECAST enforced

✅ Opening / Closing rules enforced

11. FINAL DECLARATION

This document is LAW.

Any future work must:

Cite the LAW section it modifies

Preserve all invariants

Fail CI if violated (recommended next step)

If behavior conflicts with intuition, UX, or “natural conversation” → THE LAW WINS.


STORY_MISSION_SCHEMA.md (⛔ đang thiếu)

Vai trò:

Chuẩn dữ liệu để TẠO mission

Ví dụ nó định nghĩa:

{
  "id": 1,
  "title": "First Day at School",
  "steps": [
    {
      "stepKey": "name",
      "question": "What is your name?",
      "hints": ["My", "name", "is", "I", "am"]
    }
  ]
}