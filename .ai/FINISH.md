# FINISH — Session close sequence

Run this before ending any session — voluntary, timed out, or interrupted. The goal: the next agent (or future-you) should be able to resume in 30 seconds without re-deriving what you learned.

Run the steps in order. Each step is one or two edits. Total cost: a few minutes.

## 1. Memory update — three files, three purposes

### `.ai/memory/SESSION.md` — append the session log
Add a new entry to the bottom (most recent at the bottom), in the same shape other entries use. If a template exists in `templates/SESSION_TEMPLATE.md`, follow it.

Each entry records:
- What you did (1 line)
- Files you touched
- Decisions you made (link to `DECISIONS.md` if formal)
- Surprises, blockers, or lessons worth keeping

### `.ai/memory/CURRENT.md` — overwrite
Replace the file with the live state of the project as you leave it. The next session reads this first, so it must answer "what should I do next" in one read.

Minimum fields:
- **Current task** (1 line)
- **Pending** (1–3 concrete items, not vague intentions)
- **Next action for next session** (1 concrete step the next agent can take immediately)
- **Files in flight** (if any uncommitted changes — list paths and the reason they are uncommitted)

### `.ai/memory/HISTORY.md` — append a one-liner
A condensed, durable log. One line per session:

```
2026-07-03 | EngQuest3K | shadowing W3 Rora fix; corrections v2 bump | commit 6dee6a54
```

`HISTORY.md` is the index, `SESSION.md` is the detail. Do not duplicate — point to the session entry from the history line if the reader needs depth.

## 2. Decision update

If you made a decision that future sessions must respect (architecture, conventions, scope), append it to `.ai/decisions/DECISIONS.md`.

Use the format in `templates/DECISION_TEMPLATE.md` if it exists. Minimum fields:
- **ID** — `D-NNN` (next sequential)
- **Date** — ISO date
- **Status** — `proposed` | `accepted` | `superseded`
- **Context** — what problem prompted the decision
- **Decision** — what you chose
- **Consequences** — trade-offs, follow-ups, things to revisit

If the decision is small (one line, no real trade-off), record it in `SESSION.md` only — do not pollute `DECISIONS.md` with trivia.

## 3. Knowledge update

If you learned a fact that meets **all three** of these tests:
- Is true for more than a week
- Was non-obvious (took time to find out, or you almost got it wrong)
- Is reusable across future tasks

…add it to `.ai/knowledge/` as a new file, and link it from `knowledge/README.md` (the index).

Use `templates/KNOWLEDGE_TEMPLATE.md` if present. Every entry must have a TTL — facts that age out are pruned by the next `memclean` run, not by hand.

Routing guide:
- **Project-specific fact, won't generalize** → goes in `decisions/`
- **Reusable engineering fact** → goes in `knowledge/`
- **Session-specific observation** → goes in `memory/SESSION.md` only

## 4. Task update — move tasks across the boards

| From | To | When |
|---|---|---|
| `BACKLOG.md` | `ACTIVE.md` | You start working on it |
| `ACTIVE.md` | `DONE.md` | You finished, validated, and (if code) committed |
| `ACTIVE.md` | `BACKLOG.md` | You stopped mid-task — describe why in `CURRENT.md` |
| `DONE.md` | `ACTIVE.md` | A regression re-opens it (rare) |

`DONE.md` is **append-only**. Never delete from it. When moving a task to `DONE.md`, include:
- Final commit hash (if code)
- One-line summary of what shipped
- Any follow-up tasks created (link to their entries in `BACKLOG.md`)

## 5. Final sanity check

Before saying "done":

- [ ] `CURRENT.md` answers "what next" in one read
- [ ] `SESSION.md` tail captures this session
- [ ] `HISTORY.md` has a one-liner for this session
- [ ] Any formal decision is recorded in `DECISIONS.md` with reasoning
- [ ] Any reusable fact is in `knowledge/` with a TTL
- [ ] `ACTIVE.md` reflects what you actually worked on
- [ ] `DONE.md` received the tasks you finished
- [ ] No uncommitted code changes (or `CURRENT.md` flags them explicitly)

## 6. If the session was cut short

If you are closing because of context limit, error, or interruption — before stopping:

1. Append a "partial" entry to `SESSION.md` (mark it clearly: `### <ts> — Partial close`)
2. Overwrite `CURRENT.md` with the exact state, including the next 3–5 concrete steps to resume
3. Move the in-flight task from `ACTIVE` back to `BACKLOG` with a "resume from" note
4. **Skip the Knowledge / Decision updates** — those need a clear head, not a rushed close

The next session will read `CURRENT.md` and know exactly where to pick up.

## Short version

```
SESSION.md  ←  append log
CURRENT.md  ←  overwrite state
HISTORY.md  ←  one-liner
DECISIONS   ←  if formal decision
KNOWLEDGE   ←  if reusable fact
TASKS       ←  move ACTIVE → DONE or BACKLOG
```

Six steps. A few minutes. Worth it — the next agent thanks you.
