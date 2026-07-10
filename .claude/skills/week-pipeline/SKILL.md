---
name: week-pipeline
description: Chains subagents to produce and validate a week of EngQuest3K content. Content-writer creates files, quality-reviewer validates. Use when building a complete week from Syllabus. Invoked as: `/week-pipeline 36` or "build week 36 via pipeline"
---

# Week Pipeline — Subagent Orchestration

Chain content-writer + quality-reviewer subagents to produce and validate a week.

## When to invoke

- User says "build week N", "produce W36", "run week pipeline for 38"
- For complete week production with isolated content creation + validation
- NOT for: editing one file (use normal editing), or validation only (use `/content-check`)

## Orchestration sequence

Run these steps **in order**. Each step is a subagent call.

### Step 0: Pre-flight (Claude main context)

Read the Syllabus for the target week. Identify:
- Week number: N
- Golden standard to clone: W6 (for W1–15) or W16 (for W16+)
- Grammar focus, vocab list, reading topic, writing task

### Step 1: Content-writer agent

Spawn with full context:

```python
# Pseudocode — the actual call is Agent(subagent_type="content-writer", prompt=...)
```

Prompt should contain:
- Week number N
- Source of truth: `production_kit/reference/Syllabus_V5_PublicationReady.docx`
- Golden standard week to clone from
- Files to produce (full list per workflow)

```bash
# Verify files were created (quick)
ls src/data/weeks/week_NN/ | wc -l
```

**Exit**: content-writer returns file list + any immediate validation results.

### Step 2: Quality-reviewer agent

Spawn AFTER content-writer completes:

```python
Agent(
    subagent_type="quality-reviewer",
    prompt="Validate week N — run full 7-validator chain"
)
```

Quality-reviewer runs:
```bash
npm run content:lint -- --week N --errors-only
npm run dict:lint -- --errors-only
bash production_kit/tools/bug_prevention_check.sh N
bash production_kit/tools/code_quality_gate.sh N
node production_kit/tools/validate_sgmath_types.mjs N
node tools/validate_barmodels.js N
node tools/validate_video_thumbnails.js N
```

**Exit**: quality-reviewer returns pass/fail report.

### Step 3: Decision (Claude main context)

If quality-reviewer reports:
- **SHIP** → commit and report
- **FAIL** → Claude fixes specific errors, then re-runs quality-reviewer on the specific validator that failed (Step 2 repeated, not the full pipeline)

### Step 4: Build + smoke (Claude main context)

```bash
npm run build
TEST_WEEK=N npx playwright test --grep "Smoke" --project=chromium
```

**Do NOT spawn a subagent for this** — build verification is fast and benefits from full context.

## Context budget

| Step | Estimated context | Notes |
|---|---|---|
| Step 0 (pre-flight) | ~3K | Read Syllabus excerpt |
| Step 1 (content-writer) | 80-120K | SEPARATE context — does not affect parent |
| Step 2 (quality-reviewer) | 20-40K | SEPARATE context — runs bash validators |
| Step 3 (decision) | ~2-3K | Parent reads quality-reviewer output |
| Step 4 (build) | ~5K | npm run build output |
| **Total parent context** | **~13K** | vs ~150K without subagents |

## Report format

```markdown
## Week N Pipeline Complete

| Step | Status | Detail |
|---|---|---|
| Pre-flight | ✅ | Syllabus read, golden standard identified |
| Content-writer | ✅ | 16 files created (list) |
| Quality-reviewer | ✅ / ❌ | 7/7 validators PASS / list failures |
| Build | ✅ / ❌ | npm run build passed |
| E2E smoke | ✅ / ❌ / ⏭ skipped | pass / fail / deferred |

**Decision: SHIP / FIX-THEN-SHIP / BLOCKER**
```

## Error handling

If content-writer fails (subagent error, API timeout):
- Do NOT retry automatically — report error, wait for direction
- The parent context is clean (subagent pollution is isolated)

If quality-reviewer finds failures:
- Identify the failing validator from the report
- Fix ONLY the files that validator checks
- Re-run ONLY that validator (not the full 7-validator chain)

## Key principle: context isolation

Each subagent runs in its own context. The parent orchestrator never reads:
- The full content of files written by content-writer
- The full output of all 7 validators (quality-reviewer summarizes)

This keeps the orchestrator's context lean and prevents context collapse across long production sessions.
