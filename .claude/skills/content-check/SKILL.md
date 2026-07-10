---
name: content-check
description: Runs the full content validation suite on a week (content lint, bug prevention, quality gate, sgmath, bar models, thumbnails) and produces a structured pass/fail report. Use before committing any week content changes, or when asked to check / validate a specific week.
---

# Content Check

Run the full EngQuest3K content validation suite for a specified week.

## When to invoke

- User says "check week 40", "validate W38", "check content for week 35"
- Before committing any changes in `src/data/weeks/week_NN/` or `src/data/weeks_easy/week_NN/`
- After a multi-file edit to a week's content
- NOT for: checking app code (use `npm run build` instead)

## Validation commands (run in order, collect all results)

Pass the week number as `NN` (zero-padded is fine):

```bash
# 1. Content lint (read.js + explore.js)
npm run content:lint -- --week NN --errors-only

# 2. Dictionary lint (global)
npm run dict:lint -- --errors-only

# 3. Bug prevention (13 checks over week data)
bash production_kit/tools/bug_prevention_check.sh NN

# 4. Code quality gate (48 checks)
bash production_kit/tools/code_quality_gate.sh NN

# 5. Singapore Math types
node production_kit/tools/validate_sgmath_types.mjs NN

# 6. Bar model paths (if singapore_math.js has bar models)
node tools/validate_barmodels.js NN

# 7. Video thumbnails (if daily_watch.js exists)
node tools/validate_video_thumbnails.js NN
```

**Run all steps even if an early step fails** — collect the full picture.

## Report format

```markdown
## Content Check — Week NN

| # | Validator | Status |
|---|-----------|--------|
| 1 | content:lint | PASS / FAIL (N errors) |
| 2 | dict:lint | PASS / FAIL (N errors) |
| 3 | bug_prevention | PASS / FAIL (X/13 checks passed) |
| 4 | quality_gate | PASS / FAIL (X/48 checks passed) |
| 5 | sgmath_types | PASS / FAIL / SKIP |
| 6 | barmodels | PASS / FAIL / SKIP |
| 7 | thumbnails | PASS / FAIL / SKIP |

**Overall: SHIP / FIX-THEN-SHIP / BLOCKER**

### Errors (if any):
- [E#] <validator>: <error message + file:line>
```

## Rules

- Never skip a step, even if a prior step failed
- SKIP is valid when the data file doesn't exist (e.g. no `singapore_math.js` in W1-W16)
- Always run `dict:lint` even for per-week changes — a new vocab word might break dictionary rules
- If overall is BLOCKER, list every failing check with its specific error message
