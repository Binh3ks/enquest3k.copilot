# Execution Flow — Week Production Runtime

---

## Overview

The runtime executes in five stages: Initialize → Load Context → Production →
Validation → Complete. Each stage is deterministic. No branching logic exists
outside the decision points defined in PROCESS.md.

The runtime owns the sequence; `.claude/skills/week-builder/SKILL.md` is the
actual production guide that defines every concrete command, rule, and file
to produce. The runtime tells you *when* to act; the canonical skill tells you
*what to do*.

---

## Stage Map

```
INITIALIZE
    ↓
LOAD CONTEXT
    ↓
PRODUCTION  ←→  VALIDATION  (BƯỚC 3–5, loops until SHIP)
    ↓
QA
    ↓
COMPLETE
```

---

## Stage 1 — Initialize

1. Read `.ai/memory/CURRENT.md` — establish session state and active week
2. Identify the last confirmed checkpoint (see CHECKPOINTS.md)
3. Determine whether to resume or start from CP0

**Session state schema** (lives in `.ai/memory/CURRENT.md`):

```
active_week: NN
last_checkpoint: CPn  (or null if none)
status: in_progress | blocked | shipped | complete
errors: [...]
```

Update this object after each phase completion or error. This is the persistence
layer for session interruption recovery.

**Output:** Confirmed starting checkpoint.

---

## Stage 2 — Load Context

Loading order per CONTEXT.md:

1. Orient (Phase A): `.ai/memory/CURRENT.md` → `RESEARCH_INDEX.md` → `REPOSITORY_MAP.md`
2. Workflow (Phase B): `.claude/skills/week-builder/SKILL.md`
3. Business rules (Phase C): `never_rules/` → Syllabus → Blueprint
4. Golden standards (Phase D): W36 ADV + Easy + AI Tutor
5. Validation (Phase E): `content-check` SKILL → `preflight_check.sh`

**Do not proceed to Production until all sources are loaded.**

---

## Stage 3 — Production

### Phase 0 — Pre-flight (CP0)
Reference: BƯỚC -1, `CHECKPOINTS.md`

Run `preflight_check.sh`. Gate: must exit 0.
Failure → ERROR_RECOVERY.md §Phase 0.

### Phase 1 — Setup (CP1)
Reference: BƯỚC 0

Create directories. Clone golden standards per week range rule.
Gate: all 38 files (19 ADV + 19 Easy) + AI Tutor file exist.

### Phase 2 — Videos (CP2)
Reference: BƯỚC 1–2

Update `video_queries.json`. Run video fetch. Validate thumbnails.
Gate: `daily_watch.js` in both ADV and Easy directories.

### Phase 3 — Content (CP3)
Reference: BƯỚC 3–4

Delegate to `content-writer` subagent.
Gate: all 39 files (19 ADV + 19 Easy + AI Tutor) saved and named correctly.

**Production loop with Validation:**
After CP3, enter the FIX-THEN-SHIP loop:
1. Delegate to `quality-reviewer` subagent → run VALIDATION_PIPELINE
2. If SHIP → exit loop, proceed to Phase 5
3. If FIX-THEN-SHIP → fix errors → re-validate
4. If BLOCKER → stop

Maximum 3 FIX-THEN-SHIP cycles before escalation.

### Phase 5 — Images (CP5)
Reference: BƯỚC 6

Delegate to `orchestrator.mjs --week NN --skip-existing`.
Resume-safe. Gate: all stations report complete.

### Phase 6 — Audio (CP6)
Reference: BƯỚC 7

On-demand TTS requests per slot. No gate.

### Phase 7 — Build (CP7)
Reference: BƯỚC 8

Run `npm run build`. Gate: exits 0.
Failure → ERROR_RECOVERY.md §Phase 7.

### Phase 8 — Browser test (CP8)
Reference: BƯỚC 9

Open app. Verify all stations render without console errors.
Gate: zero render errors.

### Phase 9 — Commit (CP9)
Reference: BƯỚC 10

Git commit with week number. Gate: commit succeeds.

---

## Stage 4 — QA

Reference: BƯỚC 11

**Re-read `CLAUDE.md` before running QA** — load the §E2E Test Commands section.
Run production kit E2E commands from that section.
Surface any post-commit discrepancies.

---

## Stage 5 — Complete

1. Update `.ai/memory/CURRENT.md` — mark week complete, record last checkpoint
2. Generate production report per canonical workflow format
3. Confirm all 10 checkpoints are confirmed in session log

---

## Session State

Throughout execution, maintain a session state object:

```
week: NN
last_checkpoint: CPn
status: in_progress | blocked | shipped | complete
errors: []
```

Update after each phase completion or error.
