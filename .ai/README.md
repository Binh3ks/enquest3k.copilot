# AgentOS — EngQuest3K Cross-Agent Operating System

AgentOS is the structured knowledge layer at the root of this repository. It gives every agent — Claude Code, Devin, future tools, future humans — the same context, the same lifecycle, and the same exit criteria. The goal: no agent starts blind, and no session ends with its knowledge lost.

## What this folder is

`.ai/` is the canonical home for everything an agent needs to be productive *before* touching code, and the place where it writes back what it learned *after*. It is the source of truth for:

- the live state of the project
- the reasoning behind past choices
- the task board that survives session boundaries
- the long-lived facts the next agent should not have to rediscover

It is deliberately separate from the codebase (`src/`, `public/`) and from the production toolkit (`production_kit/`, `tools/`). Those folders own *how the app works*; `.ai/` owns *how work happens here*.

## Folder map

| Folder | Owns | Anchor file |
|---|---|---|
| `.ai/architecture/` | Project shape, stack, style, rules, patterns | `ARCHITECTURE.md` |
| `.ai/memory/` | Live session state, history, current task | `CURRENT.md`, `SESSION.md`, `HISTORY.md` |
| `.ai/tasks/` | Task board — active, backlog, done | `ACTIVE.md`, `BACKLOG.md`, `DONE.md` |
| `.ai/knowledge/` | Long-lived facts with TTL, indexed | `README.md` |
| `.ai/decisions/` | Architectural Decision Records (ADR) | `DECISIONS.md` |
| `.ai/prompts/` | Reusable instruction sets | `START_PROMPT.md`, `FINISH_PROMPT.md`, `FEATURE.md`, `BUGFIX.md` |
| `.ai/templates/` | Copy-paste skeletons for new entries | `TASK_TEMPLATE.md`, `DECISION_TEMPLATE.md`, etc. |
| `.ai/context/` | Pre-baked read-this-first snapshots | `README.md` |
| `.ai/scripts/` | AgentOS-run automation | (populated as needed) |
| `.ai/bootstrap/` | One-time setup, integrity checks | (populated as needed) |

## Lifecycle

Every agent run follows four phases. The first and last are mandatory; the middle two are where the actual work happens.

```
        ┌────────────┐
        │  BOOTSTRAP │  one-time: verify AgentOS is intact and points at the right repo
        └─────┬──────┘
              ↓
        ┌────────────┐
        │   START    │  load memory, tasks, decisions, knowledge  →  see START.md
        └─────┬──────┘
              ↓
        ┌────────────┐
        │    WORK    │  execute one task; obey RULES.md; ask if blocked
        └─────┬──────┘
              ↓
        ┌────────────┐
        │   FINISH   │  persist state for the next agent  →  see FINISH.md
        └────────────┘
```

- **BOOTSTRAP** — runs once per clone. Verifies the 10 expected subfolders exist and that all `WORKSPACE` / path references inside `.ai/` and the slash-command layer point at this repo.
- **START** — runs at the top of every session. Loads context in priority order, picks up the current task, asserts state into `SESSION.md`. See `START.md`.
- **WORK** — the actual implementation. Guided by `prompts/FEATURE.md` (new work) or `prompts/BUGFIX.md` (regression). Constrained by `architecture/RULES.md`. Outputs go to the codebase; side effects go to `.ai/`.
- **FINISH** — runs before any session ends, voluntary or forced. Updates memory, archives decisions, prunes knowledge, moves tasks. See `FINISH.md`.

## Why this exists

Without `.ai/`, every agent starts cold: it re-reads the project, re-learns the conventions, and forgets at session end what the previous session decided. The cost is paid in tool calls and in subtle drift.

`.ai/` trades a small upfront read cost for:

- **Zero re-discovery** of project shape — `architecture/` answers it once.
- **Decisions with reasoning** — `decisions/` records *why*, not just *what*.
- **A task board that survives** — `tasks/` outlives any single session or model.
- **Knowledge that ages out** — TTLs in `knowledge/` prevent slow drift, not just crash.
- **A clean handoff** — `START.md` + `FINISH.md` make sessions composable.

## How to use it

| If you are... | Read first | Then |
|---|---|---|
| Starting a session | `START.md` | `memory/CURRENT.md` |
| Doing new feature work | `prompts/FEATURE.md` | `architecture/PATTERNS.md` |
| Fixing a regression | `prompts/BUGFIX.md` | `architecture/RULES.md` |
| Closing a session | `FINISH.md` | the 6-step checklist inside |

The cross-agent handoff contract is simple: **START before work, FINISH after.** Skip either, and the next agent pays the cost.
