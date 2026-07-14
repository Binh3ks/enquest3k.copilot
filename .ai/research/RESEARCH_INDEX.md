# Research Index — EngQuest3K
> Single entry point for all future AI sessions. As of 2026-07-13.

---

## 1. Overview

The `.ai/research/` directory contains three research documents produced by
reverse-engineering the repository. They are **outputs, not specifications** —
they describe what currently exists, not what should exist.

When in doubt about any production rule, schema, or workflow step, consult the
**authoritative source documents** listed in §4 below, not the research files.

---

## 2. Reading Order

| When you are… | Read this first |
|---|---|
| Starting a week production session | `week-builder/SKILL.md` → then relevant research docs below |
| Debugging stale references / routing | `production-environment-audit.md` |
| Understanding the production pipeline history | `canonical-production-pipeline.md` |
| Reviewing week data schemas / rules | `week-production-analysis.md` |

Do not read research documents as instructions. They are reference descriptions.

---

## 3. Document Index

### `canonical-production-pipeline.md`
**Purpose:** Maps which workflow documents are active, obsolete, or archived.
**Use when:** Investigating why an agent is following the wrong production steps,
or confirming which workflow to load for a given task.

Key findings:
- Exactly 1 workflow is authoritative: `.claude/skills/week-builder/SKILL.md`
- 3 other workflow files exist at various stages of obsolescence
- `Production_FINAL/` and `MASS_Final/` are archived (moved to `Production_FINAL_DEPRECATED/`)

### `production-environment-audit.md`
**Purpose:** Catalog of all stale references in the repository.
**Use when:** Cleaning up outdated paths, golden standards, or workflow citations.

Contains 18 labeled findings (D1–D18) with file paths, line numbers, and
recommended migrations. Findings are classified Critical / High / Medium /
Archive.

Note: All items from the 2026-07-13 audit have been addressed.

### `week-production-analysis.md`
**Purpose:** Technical inventory of week production artifacts.
**Use when:** Looking up golden standard locations, file naming conventions,
schema examples, or prompt-file structure.

Covers: W36 golden standards, 19-file ADV/Easy schema, image/audio naming
conventions, 50+ production rules, skill index, and 23 documented missing
schemas.

---

## 4. Authoritative Documents

These are the **live source-of-truth documents** — always prefer them over
research descriptions.

| Topic | Authoritative document |
|---|---|
| Week production workflow (W36+) | `.claude/skills/week-builder/SKILL.md` |
| Subagent orchestration | `.claude/skills/week-pipeline/SKILL.md` |
| Content validation | `.claude/skills/content-check/SKILL.md` |
| Hard production rules | `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` |
| Curriculum reference | `production_kit/reference/Syllabus_V5_PublicationReady.docx` |
| Spec reference | `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` |
| Runtime context (Claude Code) | `CLAUDE.md` (root) |
| Week data (golden standard) | `src/data/weeks/week_36/` and `src/data/weeks_easy/week_36/` |
| AI Tutor data (golden standard) | `src/data/weeks/week_36_real.js` |

---

## 5. Recommended Workflow for New AI Sessions

### Step 1 — Orient
1. Read `.ai/memory/CURRENT.md`
2. Read `.ai/architecture/REPOSITORY_MAP.md` (entry point for folder guidance)
3. Load `.claude/skills/week-builder/SKILL.md`

### Step 2 — Act
Follow the authoritative workflow for your task type:

| Task | Entry point |
|---|---|
| Produce a new week | `.claude/skills/week-builder/SKILL.md` |
| Validate existing content | `.claude/skills/content-check/SKILL.md` |
| Fix a production bug | `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` |
| Onboard to the project | `CLAUDE.md` (root) |

### Step 3 — Verify
Before committing:
- Run preflight: `bash production_kit/tools/preflight_check.sh`
- Run full validator chain: see BƯỚC 5 of `week-builder` SKILL

---

## 6. Maintenance Notes

**When the canonical workflow changes (new week number, new file count, new schema):**

1. Update `.claude/skills/week-builder/SKILL.md`
2. Update golden standard copies in `src/data/weeks/week_NN/`
3. Run a new production-environment-audit to find stale references
4. Apply the same migration pattern as the 2026-07-13 audit (see §D1–D18 in
   `production-environment-audit.md`)

**When adding a new skill or agent:**
- Add to `.claude/skills/` or `.claude/agents/`
- Update REPOSITORY_MAP.md §Prompt Files and §Skills
- Update CLAUDE.md §Production Workflow

**Do not add new research documents** unless a new discovery phase requires it.
Research documents are snapshots, not living references.

---

*This index was created from the 2026-07-13 research phase.
Next review: when the canonical workflow changes.*
