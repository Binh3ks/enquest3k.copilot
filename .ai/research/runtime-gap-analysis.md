# Runtime Gap Analysis
> Evaluated by a brand-new AI agent with zero prior EngQuest knowledge.
> Based solely on: `RESEARCH_INDEX.md` → runtime files → referenced sources.
> As of 2026-07-13.

---

# Overall Result

**PASS** — with noted gaps.

The runtime provides sufficient orientation for a new agent to start production,
identify authoritative sources, follow a sequence, and recover from errors.
However, a new agent will encounter information gaps and ambiguities at the
first concrete step.

---

# Missing Information

## M1 — Week number is not provided by the runtime

The runtime describes phases but never specifies where the week number comes from.
CONTEXT.md references `.ai/memory/CURRENT.md` as the source of "active week number,"
but does not state what format that field uses, what to do if it is absent, or who
sets it.

A new agent reading only the runtime files cannot determine:
- Is the week number passed as a parameter, read from a file, or asked of the user?
- What format: `week_36`, `W36`, `36`?
- What to do if `.ai/memory/CURRENT.md` does not exist yet.

---

## M2 — No definition of "19 content files"

The runtime repeatedly says "all 19 content files" but never lists them.
CONTEXT.md and SOURCE_OF_TRUTH.md reference the golden standards as the place to
learn the file list, but a new agent must discover this by navigating to the
golden standard directories. The canonical workflow skill (`week-builder` SKILL)
does list the 19 files — but the runtime itself is silent.

A new agent cannot confirm completeness without reading the golden standard
directories or the canonical workflow skill.

---

## M3 — No exit criteria for Phase 8 (Browser test)

ERROR_RECOVERY.md defines retry and escalate for Phase 8, but does not specify
what constitutes a pass. "Verify in browser" and "zero render errors" are stated
in EXECUTION_FLOW.md but the runtime provides no command or technique for
automating this check. A human does it manually. No guidance is given for
automated agents.

---

## M4 — Session state format is not persistent

EXECUTION_FLOW.md defines a session state object (`week`, `last_checkpoint`,
`status`, `errors`) but does not specify where it is written or read between
turns. CONTEXT.md references `.ai/memory/CURRENT.md` as the persistence layer,
but the runtime never states that session state belongs there, nor what the
CURRENT.md schema actually is.

A new agent cannot reliably resume after a session interruption without knowing
this.

---

## M5 — `week-pipeline` SKILL is referenced but not described

ROLE.md and SOURCE_OF_TRUTH.md both reference `.claude/skills/week-pipeline/SKILL.md`
as the subagent orchestration authority, but the runtime never describes what that
orchestration actually does. PROCESS.md and EXECUTION_FLOW.md both describe their
own subagent delegation steps. If the pipeline SKILL conflicts with the runtime's
delegation steps, a new agent has no way to resolve it.

---

# Ambiguous Instructions

## A1 — "Delegate to content-writer subagent" has no invocation method

CONTEXT.md and SOURCE_OF_TRUTH.md both reference the `content-writer` subagent, but
neither the runtime files nor the RESEARCH_INDEX.md entry for `content-writer`
specifies how to actually invoke it. RESEARCH_INDEX.md lists the file path
(`.claude/agents/content-writer.md`) but a new agent must infer that "invoke" means
loading the skill or calling the delegate tool. No command, tool name, or load
instruction is given.

---

## A2 — Phase numbering inconsistency

PROCESS.md has phases numbered 0–10. CHECKPOINTS.md uses CP0–CP9. EXECUTION_FLOW.md
uses "Phase 0–9" (skipping Phase 10) and introduces Stages 1–5 as a higher-level
grouping. A new agent reading quickly may not register that Stages, Phases, and
BƯỚC steps are three separate numbering systems referring to the same sequence.

---

## A3 — "Phase 4 — Validation" is described in two places differently

PROCESS.md says validation is Phase 4 and delegates to the `quality-reviewer`
subagent. EXECUTION_FLOW.md Stage 3 describes a FIX-THEN-SHIP loop as part of
Phase 3 with Phase 4 being part of the loop. VALIDATION_PIPELINE.md says
validation runs at "Phase 4 (BƯỚC 5)." These are consistent in intent but a new
agent cannot be certain whether Phase 3 and Phase 4 are sequential or overlapping.

---

## A4 — "Easy mode" is mentioned but never defined

The runtime references "ADV + Easy mode" throughout PROCESS.md, CHECKPOINTS.md, and
VALIDATION_PIPELINE.md. SOURCE_OF_TRUTH.md references `src/data/weeks_easy/week_36/`
as the Easy golden standard. But no runtime file explains what "Easy mode" means,
how it differs from ADV, or when to produce it. The canonical workflow skill
(verified by reading it) covers this, but the runtime itself is silent.

---

# Hidden Dependencies

## H1 — `week-builder` SKILL is the actual production guide

The runtime describes itself as the entry point and orchestrator, but every
concrete action (what commands to run, what files to create, what rules to apply)
lives in `.claude/skills/week-builder/SKILL.md`. A new agent who reads only the
runtime files will know *when* to act but not *what to do*. The runtime functions
as a meta-layer; the canonical workflow skill is the actual production guide.
This is documented in SOURCE_OF_TRUTH.md but not made explicit in README.md or
EXECUTION_FLOW.md.

---

## H2 — Image pipeline orchestrator requires reading its own documentation

ERROR_RECOVERY.md references `orchestrator.mjs --week NN --skip-existing` but does
not verify that this flag exists or document what other flags are available.
CONTEXT.md does not list orchestrator documentation as required context. A new
agent may attempt to use `--skip-existing` without knowing whether it is the
correct resume flag.

---

## H3 — QA in Stage 4 references CLAUDE.md for commands

EXECUTION_FLOW.md Stage 4 says "Run production kit E2E commands per CLAUDE.md."
CONTEXT.md lists CLAUDE.md in Phase A (Orient), not Phase E (Validation). A new
agent who loads only Phases A–E as specified may not re-read CLAUDE.md at Stage 4
and will not know which E2E commands to run.

---

## H4 — "Social Quiz" is not mentioned anywhere in the runtime

The canonical workflow skill (`week-builder` SKILL) specifies that W36+ weeks
include `social_quiz.js` for Social Studies + Social Quiz as part of the 19-file
ADV set. The runtime's file list ("19 content files") does not mention this, so
a new agent has no way to know it exists unless they read the canonical workflow
skill or inspect the golden standard directory.

---

# Circular References

## C1 — RESEARCH_INDEX.md points to CONTEXT.md, CONTEXT.md points back to RESEARCH_INDEX.md

RESEARCH_INDEX.md §5 Step 1 says "Read `.ai/memory/CURRENT.md`" as the first action.
CONTEXT.md §Phase A step 1 says "Read `.ai/memory/CURRENT.md`" — but the file path
is different: RESEARCH_INDEX.md references `.ai/research/RESEARCH_INDEX.md` while
CONTEXT.md references `.ai/memory/CURRENT.md`. These are both correct, but the
loop creates mild confusion. Neither file states explicitly which comes first.

---

# Suggested Improvements

These are notes for future iteration. Not part of the pass/fail determination.

1. **Add a "Quick Start" block to README.md** — 5 lines showing the minimum
   reading path for an agent dropped into a fresh session.

2. **Define the week number contract** — one sentence in PROCESS.md or
   EXECUTION_FLOW.md: where it comes from, what format to use, what to do if
   absent.

3. **List the 19 files by name** — a single bullet list in PROCESS.md §Phase 3
   or CHECKPOINTS.md §CP3. Do not require navigation to the golden standard to
   know what "19 files" means.

4. **Clarify Stage vs Phase vs BƯỚC numbering** — add a glossary table in
   EXECUTION_FLOW.md or PROCESS.md showing all three systems side by side.

5. **State the CLAUDE.md re-read requirement** — in EXECUTION_FLOW.md Stage 4,
   explicitly say "re-read CLAUDE.md §E2E commands before running QA."

6. **Document the subagent invocation method** — in ROLE.md or PROCESS.md §Phase 3,
   add one line stating how to invoke `content-writer` (load skill → delegate tool).

7. **Add a session state schema to EXECUTION_FLOW.md** — explicitly say that the
   session state object lives in `.ai/memory/CURRENT.md` and give the field schema.

---

*This analysis reflects the runtime as read by a zero-knowledge agent on 2026-07-13.*
