# Architecture Index

Entry point for `.ai/architecture/`. Read this first; jump to the linked file for the section that matters.

## What is in this folder

| File | Owns | Read when… |
|---|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | **Everything**: project overview, tech stack, architectural layers, patterns, rules, style conventions | You need to know **how** the project is organized |
| [REPOSITORY_MAP.md](REPOSITORY_MAP.md) | Top-level file inventory with read/recurse guidance | You need to know **where** something lives |
| [SUBSYSTEMS.md](SUBSYSTEMS.md) | Deep per-subsystem inventory (37 subsystems) | You need **detail** on a specific station or service |
| [INDEX.md](INDEX.md) | This file | You are **lost** |

> **Note:** As of Phase 4 (2026-07-10), PROJECT.md, STACK.md, PATTERNS.md, RULES.md, and STYLE.md were merged into ARCHITECTURE.md to reduce context overhead from 9 files to 4. All content is preserved in ARCHITECTURE.md under numbered sections.

## Reading order for a new agent

1. [../README.md](../README.md) — what AgentOS is, the lifecycle.
2. [../START.md](../START.md) — how to start a session.
3. [ARCHITECTURE.md](ARCHITECTURE.md) — project overview, stack, layers, patterns, rules, and style (all in one).
4. [REPOSITORY_MAP.md](REPOSITORY_MAP.md) — where things live.
5. [SUBSYSTEMS.md](SUBSYSTEMS.md) — deep dive on the subsystem you're touching.

## Section guide in ARCHITECTURE.md

| Section | What it covers |
|---|---|
| §1 Project overview | What EngQuest3K is, audience, philosophy, scope |
| §2 Tech stack | All technology choices with rationale |
| §3 Architectural layers | 4-layer diagram + folder responsibilities |
| §4 Patterns | 9 conventions (week isolation, dual-mode, chunk-first, CPA, AI Tutor, TTS hash, persistence, validators, lessons learned) |
| §5 Rules | Hard constraints: path protection, code/data, content/chunk, AI Tutor, persistence, workflow |
| §6 Style | File naming, JS/Python/Bash style, content style, comprehension questions, writing station, git style |

## When in doubt

- "Should I do X?" → ARCHITECTURE.md §5 (Rules). If it is a rule, ask. If it is not a rule, do it.
- "How do I do X?" → ARCHITECTURE.md §4 (Patterns). The convention is the answer.
- "What does the code look like?" → this folder stays at architecture level. Open the source.
- "Why is the project shaped like this?" → ARCHITECTURE.md §1 (engineering philosophy) and [../decisions/DECISIONS.md](../../decisions/DECISIONS.md).

## Source of truth

Production-level sources:
- `CLAUDE.md` (project root) — operational rules, scripts, workflow
- `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` — full "never" rules
- `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` — 11-step production workflow
- `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` — curriculum spec
- `production_kit/reference/Syllabus_V5_PublicationReady.docx` — 156-week syllabus

When this folder disagrees with those, those win.

## See also

- [../README.md](../README.md) — AgentOS overview
- [../START.md](../START.md) — session startup
- [../FINISH.md](../FINISH.md) — session close
