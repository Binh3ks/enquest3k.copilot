# Architecture Index

Entry point for the `.ai/architecture/` folder. Read this first when you need to understand the project; jump to the linked file for the section that matters.

## What is in this folder

| File | Owns | Read when… |
|---|---|---|
| [PROJECT.md](PROJECT.md) | Goals, mission, user base, scope, engineering philosophy | You need to know **why** the project exists |
| [STACK.md](STACK.md) | Tech choices by concern (build, state, AI, TTS, validation) | You need to know **what** we built it with |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Repo organization, architectural layers, folder responsibilities | You need to know **how** it is laid out |
| [PATTERNS.md](PATTERNS.md) | Conventions: week isolation, dual-mode, chunk-first, persistence | You are about to **add or change** content or code |
| [RULES.md](RULES.md) | Hard constraints (paths, content, AI Tutor, persistence, workflow) | You are about to do something **risky** |
| [STYLE.md](STYLE.md) | Code and content style, naming, formatting | You are **writing** code or content |
| [INDEX.md](INDEX.md) | This file | You are **lost** |

## Reading order for a new agent

1. [../README.md](../README.md) — what AgentOS is, the lifecycle.
2. [../START.md](../START.md) — how to start a session.
3. [PROJECT.md](PROJECT.md) — what the product is.
4. [ARCHITECTURE.md](ARCHITECTURE.md) — how the repo is organized.
5. [STACK.md](STACK.md) — what is in the toolbox.
6. [PATTERNS.md](PATTERNS.md) + [RULES.md](RULES.md) + [STYLE.md](STYLE.md) — only the parts relevant to your current task.

For the next session, the [../START.md](../START.md) fast path is enough — the 5-step reading order is already there. This folder is the deep dive.

## When in doubt

- "Should I do X?" → [RULES.md](RULES.md). If it is a rule, ask. If it is not a rule, do it.
- "How do I do X?" → [PATTERNS.md](PATTERNS.md). The convention is the answer.
- "What does the code look like?" → this folder deliberately stays at the architecture level. Open the source.
- "Why is the project shaped like this?" → [PROJECT.md](PROJECT.md) (engineering philosophy) and [../decisions/DECISIONS.md](../../decisions/DECISIONS.md) (specific decisions with reasoning).

## Source of truth

The production-level sources are:
- `CLAUDE.md` (project root) — operational rules, scripts, week-production workflow
- `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` — full list of "never" rules
- `production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md` — the 11-step production workflow
- `production_kit/reference/ENGQUEST_BLUEPRINT_DETAILED_SPECS_V5.0.md` — the curriculum and station spec
- `production_kit/reference/Syllabus_V5_PublicationReady.docx` — the 156-week syllabus

When this folder disagrees with those, those win. This folder is the *summary*; they are the *spec*.

## See also

- [../README.md](../README.md) — AgentOS overview
- [../START.md](../START.md) — session startup
- [../FINISH.md](../FINISH.md) — session close
