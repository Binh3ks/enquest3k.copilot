# Rules — EngQuest3K hard constraints

Rules in this file are **non-negotiable**. They are not defaults and not conventions — violating them breaks production, the curriculum, or the user experience. If a rule and a request conflict, the rule wins. Get explicit human approval before changing any rule.

The canonical, full version of these rules lives in `production_kit/never_rules/PRODUCTION_NEVER_RULES.md`. This file is the architecture-level summary; the production file is the source of truth.

## Path and config protection

| File / location | Rule |
|---|---|
| `public/_redirects` | Do not modify without explicit human approval. |
| `public/_headers` | Do not modify without explicit human approval. |
| `vite.config.js` | Do not modify without explicit human approval. |
| `.env`, `.env.local`, `.env.production` | Do not commit secrets. Do not edit without approval. |
| `public/_redirects` / `_headers` edits | Surfaces in the host config; wrong edits take the deploy down. |

## Code and data rules

- **NEVER use Python to create `.js` files.** Python is for tooling (TTS, audit, lesson-plan pipeline). `.js` files are produced by Node, by hand, or by validators.
- **NEVER copy `**bold**` text into `dictation.js` or `shadowing.js`** — they are selection-only fields. Bolds live in `read.js`.
- **ALWAYS use `answer:`**, not `correct:`, in grammar exercises. The grammar engine ignores `correct:`.
- **ALWAYS use valid Singapore Math types**: `part_whole`, `comparison`, `missing_part`, `groups`, `before_after`. Anything else silently falls back to `part_whole` and the math becomes invisible to the student.
- **ALWAYS run `bash production_kit/tools/code_quality_gate.sh N`** before committing a week.

## Content rules (chunk-first)

- **Single-word bolds = 0 allowed.** Across all 156 weeks. Enforced by CHECK 20c. Pattern: `**ran down**` ✅, `**ran**` ❌.
- **W28+ requires ≥10 multi-word chunks per passage**, 1–3 per sentence.
- **Canonical-longest bold policy (NEW content, W36+):** when a concept has multiple lengths in the dictionary (e.g., `every day` vs `practice every day`), bold the **longest** form at every occurrence. Do not bold sub-chunks separately inside the super-chunk. Do **not** retroactively fix W1–W35 — the renderer handles both equally.
- **Chunks must be natural collocations.** Do not force combinations like `kind chef`, `nice scientist`, `friendly artist`, `very very tall`, `big big lion`. Use `good cook`, `engineer`, `artist`, `very tall`, `big lion` instead.
- **No doubled modifiers** (`tall trees tall trees`, `wooden wooden bridge`).
- **No orphan chunks** — a bolded chunk must be supported by the surrounding grammar.
- **No circular topic** — the same chunk / adverb must not appear in two adjacent sentences.
- **content_vi carries no `**bold**`** — Vietnamese text must not trigger dictionary popups.
- **If `read.js` text changes, `dictation.js` and `shadowing.js` must stay aligned** with it.

## AI Tutor rules

- AI Tutor data lives in `src/data/weeks/week_NN_real.js` — **not** in `ask_ai.js`.
- `chunk_focus[]` is **required** — 3–5 key collocations from that week's `read.js`.
- `knowledge_base` empathy rule is **required** — the AI must not say "Great!" after a learner describes an injury or negative event. Use "I am sorry" or "That sounds painful/scary" instead.
- `opening_narrative` is from the AI's perspective ("I am your AI teacher…"), not the student's.
- `phase_questions` use empathetic framing ("That sounds stressful!", "Poor Jake!").
- `spark_talk` includes an empathetic bridge after safety/accident topics.

## Persistence and state

- Any Zustand `persist` store must declare **`version` + `partialize` + `merge` + `migrate`**. Skipping any of these can silently wipe progress on deploy.
- Progress save flow must **never** pass `data: {}` — it must read the existing progress cache and merge. A `data: {}` payload silently wipes station data.
- Server station keys with the `_easy` suffix must be **stripped** before the UI tab lookup, or progress silently disappears in Easy mode.

## Workflow rules

- **Read `CLAUDE.md` first** for week-specific context, then read the relevant week data files.
- **Read the file you are about to edit** before editing. No "edit from memory".
- **For any change >5 files**, use plan mode (`EnterPlanMode`) and get approval first.
- **Never run global scripts** (sed, find -exec, Python batch) without explicit approval.
- **Never** `git reset --hard`, `git push --force`, `rm -rf` on broad paths, or `DROP`/`TRUNCATE` SQL — always confirm first.
- **Always run `/review` before committing.**
- **Always run `FINISH.md` sequence** at the end of every session.

## TODO — rules not yet captured here

- Concrete deployment rules (depends on the deployment target — see `STACK.md` TODO).
- TTS regeneration policy: when a text change invalidates audio, who owns the re-upload? See `tools/generate_audio_deepgram.py` flow.
- What the AI Tutor must do when the LLM cascade is fully exhausted.
