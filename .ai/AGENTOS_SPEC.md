# 🤖 EngQuest3K AgentOS v2 Specification (Constitution)

## 1. System Architecture & Boundaries
AgentOS is the unified operating system for all coding agents (Claude Code, OpenHands, Cursor, Codex) working on EngQuest3K.
- **Domain Context & Tools:** Defined in `/CLAUDE.md` and `production_kit/`.
- **Agent Memory & Runtime:** Managed strictly inside `/.ai/`.
- **Rule of Law:** No agent is permitted to start a task without reading runtime context, nor finish a task without running production quality gates and updating memory.

## 2. The Multi-Agent Ecosystem
| Agent | Primary Role | Execution Boundary |
| :--- | :--- | :--- |
| **Claude Code** | System Implementation, Architecture, Core Features | Uses `.claude/commands` + `.ai/` |
| **OpenHands** | Autonomous Bug Investigation, Background Fixes | Uses `.devin/workflows` + `.ai/` |
| **Codex / Cursor** | Autocomplete, Refactoring, Syntax Optimization | Reads `.ai/knowledge/` + `.ai/memory/` |

## 3. Standard Operating Procedures (SOP)

### A. Initialization (/agent-start)
1. Read `.ai/memory/CURRENT.md` to understand active state.
2. Read `.ai/tasks/ACTIVE.md` to identify assigned objectives.
3. Load domain tools from `CLAUDE.md`.

### B. Execution & Quality Gates
- All week-related content (W33+) MUST pass validation scripts in `CLAUDE.md` before completion.
- Never truncate printable educational materials or lesson plans.

### C. Termination (/agent-finish)
1. Run relevant `code_quality_gate.sh` or `bug_prevention_check.sh`.
2. Update `.ai/memory/CURRENT.md` and append to `.ai/memory/HISTORY.md`.
3. Log structural changes to `.ai/decisions/DECISIONS_LOG.md`.
4. Move completed tasks from `.ai/tasks/ACTIVE.md` to `.ai/tasks/DONE.md`.
