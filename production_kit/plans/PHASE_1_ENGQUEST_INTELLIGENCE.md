# Phase 1 — EngQuest Intelligence Layer

> **Status:** In progress (2026-07-10)
> **Owner:** Claude Code session
> **Parent strategy:** `production_kit/plans/PHASE_0_INTELLIGENCE_STRATEGY.md` (concept)

## Goal

Three concrete investments that compound across every future session:

1. **Stronger post-edit validation hook** — catch content + integration regressions at write-time, not at commit-time
2. **3 production subagents** — context-isolated execution for content / code / review tasks
3. **Repository map upgrade** — make `src/modules/` discoverable from REPOSITORY_MAP

Each item has an exit criterion that can be mechanically verified.

---

## Exit criteria (must all pass before phase 1 marked done)

- [ ] Editing `src/data/weeks/week_30/read.js` triggers `content_lint.mjs` for week 30
- [ ] Editing a file under `src/modules/ai_tutor/` triggers `npm run build` (already in place — verify)
- [ ] Lint+build failure **auto-rolls back** the edit (already in place — verify)
- [ ] `.claude/agents/{content-writer,code-debugger,quality-reviewer}.md` exist and parse as valid subagent definitions
- [ ] Each subagent declares model, system prompt, scope, and tools it can use
- [ ] `REPOSITORY_MAP.md` has a "src/modules/" table (currently only lists top-level)
- [ ] `git status` clean, commit message references this plan

---

## Item 1 — Extended post-edit-validate hook

### Current state (already in place)

`.claude/hooks/post-edit-validate.cjs` runs on every Edit/Write:

1. TDZ heuristic (forward-reference detector) → rollback on risk
2. `npx eslint` on the changed file → rollback on error
3. `npm run build` (only for `src/(modules|services|components|stores|hooks|config)/`) → rollback on error

### What this phase adds

**Tier 4 — content data validation** when editing files under `src/data/weeks/`, `src/data/weeks_easy/`, or `src/data/dictionary.json`:

```
Edit week_NN/read.js     → run content_lint.mjs --week NN --errors-only
Edit week_NN/singapore_math.js → run validate_sgmath_types.mjs NN
Edit dictionary.json     → run dict_lint.mjs --errors-only
Edit any src/data/weeks/ → run bug_prevention_check.sh NN (only if a sentinel file exists)
```

**Tier 5 — quick smart-build** (only for code modules, replaces the full `npm run build` for fast paths):

```
Edit src/modules/<name>/*.jsx → run npm run build --mode development (faster than production build)
```

Actually — defer Tier 5, full build catches more. Keep current behavior.

### Why this matters

Today: edit a week, lint passes locally, commit → CI fails on quality gate. Cycle: 5-10 min.
With this: edit a week, hook auto-runs `content:lint` and `bug_prevention_check.sh`, blocks the edit if it would fail CI. Cycle: instant.

### Implementation

- Add a section in `post-edit-validate.cjs` after the existing build step (or before, parallel)
- Match file path patterns to decide which validator to run
- Each validator returns exit 0/1 — non-zero = block + rollback
- All validators already exist in the repo — no new code to write, just orchestration

### Files to change

- `.claude/hooks/post-edit-validate.cjs` (add Tier 4 block)
- No new settings.json entry needed (existing PostToolUse matcher covers Edit|Write)

---

## Item 2 — Three production subagents

### Why subagents, not skills

Skills load `SKILL.md` into context on invocation — they instruct the same Claude. Subagents spawn a fresh agent with its own context window, system prompt, and tool access. For tasks that pollute context (reading 6 files, cross-cutting grep, validation across 4 validators), subagents save the parent's context.

### Subagent 1 — `content-writer`

**Scope:** Producing or revising week's 16 content files.

**Tools:** Read, Write, Edit, Grep, Glob, Bash (npm scripts only — `content:lint`, `dict:build`)

**System prompt core:**

```
You are a content production agent for EngQuest3K Vietnamese K-12 English app.
Your job: create or revise week content (read.js, vocab.js, grammar.js, ...).

Workflow:
1. Read production_kit/workflow/AGENT_SELF_CHECK_WORKFLOW.md before editing
2. ALWAYS clone from golden standard week (week_06 for W1-15, week_16 for W16+) — never generate from scratch
3. Always edit .js files with Node, never Python
4. After any edit, run npm run content:lint -- --week NN --errors-only
5. After any edit to singapore_math.js, run node production_kit/tools/validate_sgmath_types.mjs NN
6. Report files created/modified with line counts

Output format:
- Files touched: list
- Validators: PASS/FAIL each
- Open questions: bullet list (if any)
```

**Model:** sonnet (faster than opus, content is template-driven)

**When parent invokes:**

```markdown
Task(subagent_type="general-purpose", prompt=...)
# OR (after file exists):
Task(subagent_type="content-writer", prompt="...")
```

### Subagent 2 — `code-debugger`

**Scope:** Tracing a bug through `src/modules/*`, `src/services/*`, stores, hooks.

**Tools:** Read, Grep, Glob, Bash (git, npm scripts), Grep with file:line output

**System prompt core:**

```
You are a debugging agent for EngQuest3K React/Vite app.
Your job: trace the root cause of a reported bug across modules.

Debugging protocol:
1. Reproduce: write a 3-line description of the bug
2. Localize: grep for the symptom across src/modules, src/services, src/stores
3. Read the top 3 candidate files end-to-end (offset/limit, not full dump)
4. Trace data flow: input → store → selector → render
5. Identify the smallest fix that addresses root cause
6. Verify the fix doesn't break neighboring code

Report format:
- Root cause: file:line, what's wrong
- Fix: code diff
- Side effects: what other files/functions touched
- Verification: how to test (steps)
```

**Model:** opus (debugging requires deeper reasoning)

### Subagent 3 — `quality-reviewer`

**Scope:** Run all relevant validators on a week or PR; produce pass/fail report.

**Tools:** Bash (validators), Read (to read log output), Grep

**System prompt core:**

```
You are a quality gate agent. You run validators, you do NOT modify code.
Your job: execute the production validation chain and produce a final report.

Validation chain (run in order, stop on first failure):
1. bash production_kit/tools/preflight_check.sh (skip if already run this session)
2. bash production_kit/tools/bug_prevention_check.sh NN
3. bash production_kit/tools/code_quality_gate.sh NN | tee /tmp/cq.log
4. node tools/validate_barmodels.js NN (if Singapore math data present)
5. node tools/validate_video_thumbnails.js NN
6. npm run content:lint -- --week NN --errors-only
7. npm run dict:lint -- --errors-only

Report format (always return this):
- week: NN
- validator_1: PASS/FAIL (relevant excerpt)
- ...
- Overall: PASS/FAIL
- Action: ship / fix-then-ship / blocker (list blocker items)
```

**Model:** haiku (mechanical execution, no reasoning needed — haiku saves cost)

### Files to create

- `.claude/agents/content-writer.md`
- `.claude/agents/code-debugger.md`
- `.claude/agents/quality-reviewer.md`

(`.claude/agents/` doesn't exist yet — must create the directory.)

---

## Item 3 — Repository Map: add `src/modules/` table

### Current state

`.ai/architecture/REPOSITORY_MAP.md` lists top-level folders but does NOT enumerate `src/modules/*`. Agents must `ls` or guess. SUBSYSTEMS.md has the data — but it's heavy (~370 lines, cross-cutting concerns mixed with feature modules).

### What this phase adds

Append a "Subsystem module index" table to REPOSITORY_MAP.md that maps:
- `src/modules/<name>/` → feature it implements → linked SUBSYSTEMS entry

This is a 30-line addition, NOT a rewrite. Keep SUBSYSTEMS.md as the deep reference; REPOSITORY_MAP.md gets a quick-scannable top-level index.

### Implementation

Read `src/modules/*` (1-line `ls`), map to SUBSYSTEMS.md IDs, append a table to REPOSITORY_MAP.md.

---

## Not in Phase 1 (deferred)

These are valuable but expand scope. Listed so we don't forget:

- CocoIndex installation + benchmark
- GitHub MCP
- SKILL.md files for the 3 subagents (subagents already work; skills are an alternate entry point)
- LSP setup
- Prompt cache verification
- AgentOS 9→3 file merge

Each of these gets its own phase file when prioritized.

---

## Verification

After implementing, run:

```bash
# Hook works
# Edit a week file → check content_lint auto-ran in /tmp/hook-debug.log

# Subagents parse
ls .claude/agents/*.md

# Repo map updated
grep -c "src/modules/" .ai/architecture/REPOSITORY_MAP.md

# Build still passes
npm run build

# Commit
git add .claude/hooks/post-edit-validate.cjs .claude/agents/ .ai/architecture/REPOSITORY_MAP.md
git commit -m "feat(intelligence): phase 1 — content-aware hooks + 3 subagents + repo-map enrichment"
```

