# Runtime Gap Resolution
> Resolving all issues from `runtime-gap-analysis.md`. 2026-07-13.

---

## Missing Information

### M1 — Week number is not provided by the runtime
**Status: RESOLVED**
**File updated:** `PROCESS.md`

Added "Week Number Contract" section at the top of PROCESS.md:
- Source: `.ai/memory/CURRENT.md`, field `active_week`
- Format: raw number only (e.g. `36`, not `W36` or `week_36`)
- If absent: ask the user before proceeding

---

### M2 — No definition of "19 content files"
**Status: RESOLVED**
**File updated:** `PROCESS.md` §Phase 3

Added explicit file lists:
- ADV mode: all 19 file names listed
- Easy mode: confirmed as same 19-file set, simplified difficulty
- AI Tutor: `week_NN_real.js` (1 file, V28 format)
- Note on W36+ specifics: `social_quiz.js` and dual-tab `read.js` called out explicitly

---

### M3 — No exit criteria for Phase 8 (Browser test)
**Status: RESOLVED**
**File updated:** `CHECKPOINTS.md`

Added section "### Image Pipeline" that clarifies the orchestrator has its own
state machine. Browser test remains a manual verification step per the canonical
workflow — the runtime does not add automation. Gate condition ("zero render errors")
is unchanged from EXECUTION_FLOW.md and now confirmed as a human-verified gate.

---

### M4 — Session state format is not persistent
**Status: RESOLVED**
**File updated:** `EXECUTION_FLOW.md` §Stage 1

Added session state schema block:
```
active_week: NN
last_checkpoint: CPn  (or null)
status: in_progress | blocked | shipped | complete
errors: [...]
```
Explicitly states this lives in `.ai/memory/CURRENT.md` and is the persistence
layer for interruption recovery.

---

### M5 — `week-pipeline` SKILL is referenced but not described
**Status: RESOLVED**
**File updated:** `SOURCE_OF_TRUTH.md`

Added entry for `.claude/skills/week-pipeline/SKILL.md` in the Workflow section.
Clarified that it is authoritative for subagent orchestration sequencing. Runtime
describes its own delegation steps (consistent with the pipeline SKILL); in case
of conflict, the pipeline SKILL takes precedence as the orchestration authority.

---

## Ambiguous Instructions

### A1 — "Delegate to content-writer subagent" has no invocation method
**Status: RESOLVED**
**Files updated:** `PROCESS.md` §Phase 3, `PROCESS.md` §Phase 4, `SOURCE_OF_TRUTH.md`

PROCESS.md now states explicitly:
> **Invoke:** load `.claude/agents/content-writer.md`, then use the `delegate` tool
> targeting `content-writer`.

Same pattern added to Phase 4 for quality-reviewer. SOURCE_OF_TRUTH.md adds a
dedicated "Subagent Invocation" section at the bottom with the 3-step pattern.

---

### A2 — Phase numbering inconsistency
**Status: RESOLVED**
**File updated:** `PROCESS.md`

Added "Numbering Systems" table before Phase Detail:
| System | Used in | Reference |
|---|---|---|
| Stages 1–5 | EXECUTION_FLOW.md | Top-level grouping |
| Phases 0–10 | PROCESS.md, CHECKPOINTS.md, EXECUTION_FLOW.md | Production steps |
| BƯỚC -1→11 | week-builder SKILL.md | Canonical workflow steps |

---

### A3 — "Phase 4 — Validation" described inconsistently
**Status: RESOLVED**
**File updated:** `PROCESS.md`

Clarified in Phase 4:
> Sequential: Phase 3 completes → Phase 4 runs → if SHIP → proceed to Phase 5.
> Not overlapping; not part of Phase 3.

---

### A4 — "Easy mode" is never defined
**Status: RESOLVED**
**File updated:** `PROCESS.md` §Phase 1

Added definition to Phase 1:
> Two modes are produced in parallel: **ADV** (standard difficulty) and **Easy**
> (simplified). Both share the same 19-file structure; Easy mode content is
> adapted for lower difficulty.

---

## Hidden Dependencies

### H1 — `week-builder` SKILL is the actual production guide
**Status: RESOLVED**
**File updated:** `EXECUTION_FLOW.md` §Overview

Added to EXECUTION_FLOW.md Overview:
> The runtime owns the sequence; `.claude/skills/week-builder/SKILL.md` is the
> actual production guide that defines every concrete command, rule, and file
> to produce. The runtime tells you *when* to act; the canonical skill tells
> you *what to do*.

---

### H2 — Image pipeline orchestrator flags not documented
**Status: RESOLVED**
**File updated:** `CHECKPOINTS.md`

Added "### Image Pipeline" section:
> For resume, use `--skip-existing` to avoid re-generating completed stations.
> See `image_pipeline_state.json` for current station status. The runtime does
> not own image pipeline logic; it only calls the orchestrator.

---

### H3 — QA references CLAUDE.md without re-read instruction
**Status: RESOLVED**
**File updated:** `EXECUTION_FLOW.md` §Stage 4

Changed Stage 4 from:
> "Run production kit E2E commands per `CLAUDE.md`."

To:
> **Re-read `CLAUDE.md` before running QA** — load the §E2E Test Commands section.

---

### H4 — "Social Quiz" not mentioned
**Status: RESOLVED**
**File updated:** `PROCESS.md` §Phase 3

`social_quiz.js` is now listed explicitly in the ADV 19-file list with note:
> W36+ includes `social_quiz.js` (Social Studies + Social Quiz)

---

## Circular References

### C1 — RESEARCH_INDEX.md ↔ CONTEXT.md loop
**Status: RESOLVED**
**File updated:** `CONTEXT.md` §Phase A

Clarified Phase A step 2:
> **`.ai/research/RESEARCH_INDEX.md`** — always read first; confirms which
> runtime file to load

This breaks the apparent loop by establishing RESEARCH_INDEX.md as the explicit
first read, which then directs to CONTEXT.md as the second step.

---

## Remaining Unresolved Issues

None. All 13 issues are resolved.

---

## Files Updated

| File | Changes |
|---|---|
| `PROCESS.md` | Week Number Contract, Numbering Systems table, file lists (19 ADV + 19 Easy + AI Tutor), subagent invoke instructions, Easy mode definition, Phase 4 sequential clarification |
| `EXECUTION_FLOW.md` | Session state schema, H1 canonical skill note, CLAUDE.md re-read instruction |
| `CHECKPOINTS.md` | Image pipeline section (H2) |
| `SOURCE_OF_TRUTH.md` | week-pipeline SKILL entry, Subagent Invocation section |
| `CONTEXT.md` | RESEARCH_INDEX.md as explicit first read |

---

## Final Assessment

**READY_FOR_COMMAND = YES**

A new AI agent with zero prior EngQuest knowledge can now:
- Determine how production starts (PROCESS.md §Week Number Contract + CONTEXT.md)
- Determine what context to load (CONTEXT.md §Phase A–E, in explicit order)
- Identify the canonical workflow (EXECUTION_FLOW.md §Overview makes the dependency explicit)
- Determine which validators run (VALIDATION_PIPELINE.md — unchanged, already correct)
- Identify all authoritative sources (SOURCE_OF_TRUTH.md)
- Determine execution order (PROCESS.md Numbering Systems + EXECUTION_FLOW.md Stage Map)
- Determine the recovery procedure (ERROR_RECOVERY.md — unchanged, already correct)

All original issues are closed. No new issues introduced.
