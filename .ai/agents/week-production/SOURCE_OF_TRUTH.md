# Source of Truth — Week Production Runtime

---

## Workflow

### `.claude/skills/week-builder/SKILL.md`
- **Purpose:** Canonical 11-step production workflow (BƯỚC -1 → 11)
- **Why authoritative:** It is the sole active workflow for W36+ production, verified against the repository structure
- **Consumed by:** Runtime (phase sequencing), content-writer subagent

### `.claude/skills/week-pipeline/SKILL.md`
- **Purpose:** Subagent orchestration (content-writer → quality-reviewer → post-validation → decision)
- **Why authoritative:** Defines when each subagent is called and what context each receives
- **Consumed by:** Runtime (subagent routing)

---

## Business Rules

### `production_kit/never_rules/PRODUCTION_NEVER_RULES.md`
- **Purpose:** Hard rules that block production if violated
- **Why authoritative:** Each rule has a `Why:` and `Source:` field; they are non-negotiable
- **Consumed by:** Runtime (blocking decisions), content-writer subagent (authoring constraints)

### `production_kit/reference/Syllabus_V5_PublicationReady.docx`
- **Purpose:** Curriculum source — grammar focus, vocab list, reading topic, writing task per week
- **Why authoritative:** Publication-ready curriculum document
- **Consumed by:** Runtime (extracting week parameters at BƯỚC -1)

### `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md`
- **Purpose:** Detailed spec — especially §VII.b chunk-first authoring rules
- **Why authoritative:** Master spec document
- **Consumed by:** content-writer subagent (chunk authoring rules)

---

## Validation

### `.claude/skills/content-check/SKILL.md`
- **Purpose:** Full 7-validator chain
- **Why authoritative:** Canonical validation logic for week content
- **Consumed by:** quality-reviewer subagent

### `production_kit/tools/preflight_check.sh`
- **Purpose:** System integrity check before production begins
- **Why authoritative:** Checks that all required directories, tools, and references are present
- **Consumed by:** Runtime (BƯỚC -1 gate)

---

## Golden Standards

### `src/data/weeks/week_36/` (ADV, 19 files)
- **Purpose:** ADV mode template — all content file schemas and structure
- **Why authoritative:** W36 is the current golden standard for W36+
- **Consumed by:** content-writer subagent (clone + adapt)

### `src/data/weeks_easy/week_36/` (Easy, 19 files)
- **Purpose:** Easy mode template
- **Why authoritative:** W36 Easy is the current golden standard for W36+
- **Consumed by:** content-writer subagent (clone + adapt)

### `src/data/weeks/week_36_real.js`
- **Purpose:** AI Tutor data (V28 format) — spark_talk, empathy contract, phase structure
- **Why authoritative:** W36 AI Tutor is the current golden standard
- **Consumed by:** content-writer subagent (AI Tutor file authoring)

---

## Runtime Context

### `CLAUDE.md` (root)
- **Purpose:** Master spec reference — validators, E2E commands, week schemas
- **Why authoritative:** Primary runtime context for Claude Code
- **Consumed by:** All agents and subagents

### `.ai/architecture/REPOSITORY_MAP.md`
- **Purpose:** Folder layout, file inventory, subsystem ownership
- **Why authoritative:** Maintained architecture map
- **Consumed by:** Runtime (path resolution)


## Subagent Invocation

To invoke any subagent:
1. Load its agent file (e.g. `.claude/agents/content-writer.md`)
2. Use the `delegate` tool, targeting the subagent name
3. Pass the current week number and relevant context as instructions
