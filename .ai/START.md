# START — Session startup sequence

Run this at the top of every agent session. The goal: be productive within the first ~50 tool calls, without re-discovering anything already captured in `.ai/`.

## 1. Bootstrap check (~3 tool calls)

Verify AgentOS is intact and points at the right workspace.

```
Read .ai/architecture/ARCHITECTURE.md (§1: project overview)
Read .ai/memory/CURRENT.md
```

- If an expected subfolder is missing, stop and run `bootstrap/verify.sh` (if present) or report the gap before doing anything else.
- If `CURRENT.md` is older than 3 days, treat context as stale — read `SESSION.md` to reconstruct before trusting the task line.

## 2. Read in priority order

Load files in this order. Stop early if the answer is already clear — reading is a tax.

| # | File | Why |
|---|---|---|
| 1 | `.ai/memory/CURRENT.md` | Live state — task, pending, next action |
| 2 | `.ai/memory/SESSION.md` (tail) | Last 5–10 lines of the previous session |
| 3 | `.ai/tasks/ACTIVE.md` | What is in flight right now |
| 4 | `.ai/decisions/DECISIONS.md` (tail) | The 3 most recent decisions — they may constrain current work |
| 5 | `.ai/knowledge/README.md` | Index of long-lived facts; load only entries your task touches |
| 6 | `.ai/architecture/ARCHITECTURE.md` §5 (Rules) | Hard constraints — the "never" rules |
| 7 | `.ai/architecture/ARCHITECTURE.md` §4 (Patterns) | Conventions the project follows |
| 8 | `.ai/architecture/ARCHITECTURE.md` §3 (Layers) | Module map — only if your task changes structure |

**Skip order is itself a rule.** If the task line in `CURRENT.md` already names the file and the change is small, do not read 1–7 — read the file, do the work, log it, finish.

## 3. Context loading strategy — pick a tier

Match the read set to the task type.

### Tier 1 — Resuming a known task (named in `CURRENT.md`)
1. Read `CURRENT.md` → confirm the task
2. Read the file(s) it named → resume
3. Stop. Do not re-derive context.

### Tier 2 — Picking up a queued task (top of `ACTIVE.md`)
1. Read `ACTIVE.md` → pick the top item
2. Read any linked decision from `DECISIONS.md`
3. Read the file(s) to be modified
4. Stop.

### Tier 3 — New, undefined work
1. Read all of Tier 1 + 2 above
2. Read `architecture/ARCHITECTURE.md` §2 (Tech Stack) and §6 (Style)
3. If the work crosses modules, also read `architecture/ARCHITECTURE.md` §3 (Layers) and `architecture/INDEX.md`
4. Design the task → write it to `tasks/BACKLOG.md` first → promote to `ACTIVE.md` only when you actually start coding

## 4. State assertion — log the session start

Before doing any work, append a single entry to the bottom of `memory/SESSION.md`:

```
### <ISO timestamp> — Started
- Task: <one line, copy from CURRENT.md or describe>
- Tier: 1 | 2 | 3
- Files I read at start: <short list>
```

This makes the session reconstructable from log alone, even if `CURRENT.md` is later overwritten.

## 5. Sanity checks before code

Pause for one beat. Ask:

- Does the task conflict with any rule in `architecture/ARCHITECTURE.md` §5 (Rules)? → ask the human before coding.
- Is there a decision in `DECISIONS.md` that already covers this? → cite it, do not re-decide.
- Is the task in `BACKLOG.md` but not `ACTIVE.md`? → promote it first, then start.
- Will the change require more than ~5 files? → use plan mode and get approval before editing.

## 6. Output discipline during the session

- Lead with the action, not narration.
- One clear next step per response.
- If context grows past ~50 tool calls mid-task, run a compact-equivalent and consider starting a new session (and use `FINISH.md` to hand off).
- Never write to files outside `.ai/` and outside the actual task scope.

## 7. Reading order — short version

```
CURRENT  →  ACTIVE  →  RULES  →  PATTERNS  →  the file(s) you will touch  →  SESSION entry
```

That is the 5-step fast path. The full table above is for when the fast path is ambiguous or when the task is Tier 3.
