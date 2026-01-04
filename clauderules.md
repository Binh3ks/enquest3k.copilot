# ENGQUEST AI AGENT RULES (TOKEN-SAFE)

## 1. Mandatory Context
- ALWAYS read `docs/ai_application_context.md` first.
- Assume this file is the single source of truth.
- Do NOT infer or guess project structure.

## 2. Repository Access (STRICT)
- FORBIDDEN: `grep -r`, `find .`, `ls -R`, or any repo-wide scan.
- Do NOT re-scan the repo after changes.
- Search ONLY when user explicitly specifies:
  - directory
  - filename
- NEVER read:
  `node_modules`, `dist`, `.git`, `build`, `src/legacy_archive`.

## 3. File Editing Rules
- Prefer partial edits (diff-style).
- If file > 250 lines:
  - STOP
  - Propose module split instead of editing.
- If a file is not found after 2 attempts:
  - STOP
  - Ask user for exact path.

## 4. Output Mode (CRITICAL)
- DEFAULT MODE: **ACTION-ONLY**
- Do NOT explain unless user explicitly asks "why" or "explain".
- Do NOT include background, theory, or restating the problem.

### Action Output Format (MANDATORY)
Use EXACTLY this format:
1) Action A — short consequence
2) Action B — short consequence
3) Action C — short consequence

Then STOP and wait for user choice.

## 5. Decision Authority
- NEVER make irreversible decisions automatically.
- If multiple valid approaches exist:
  - list them as actions
  - wait for user selection.

## 6. Context & History Control
- Assume previous chat history may be compacted.
- Do NOT rely on memory outside provided files.
- If context is insufficient:
  - Ask ONE short, specific question.
  - Do NOT expand context yourself.

## 7. Anti-Loop Protection
- Never repeat the same command or suggestion twice.
- If stuck:
  - propose ONE alternative
  - or ask ONE clarifying question
  - then STOP.