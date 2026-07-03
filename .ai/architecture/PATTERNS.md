# Patterns — EngQuest3K conventions

The conventions that make the codebase recognizable. Anything here is a *default*, not a hard rule — when a pattern conflicts with `RULES.md`, rules win.

## 1. Week-isolated content

Each week is a folder. Adding a new week means adding a new folder; it never means editing shared code.

```
src/data/weeks/week_NN/         # 16 files (W16+) or 15 files (W1–W15)
src/data/weeks_easy/week_NN/    # mirror, 16 files
src/data/weeks/week_NN_real.js  # AI Tutor data (Advanced mode)
```

Cross-week concerns (e.g., a new station type) are added in `src/` and discovered from data; they are never coded per-week.

## 2. Dual-mode parity, dual-mode independence

Easy and Advanced modes:
- share **station layout** (same 16 stations per week)
- share **validation rules** (same lint, same gate)
- differ in **content** (depth, vocabulary, scaffold, examples)

A change in one mode must not silently propagate. When content overlaps are intentional, that overlap is documented, not assumed.

## 3. Chunk-first content

Multi-word collocations are the primary teaching unit. Single-word bolds are not used; single-word dictionary lookups are a fallback.

- Reading passages: ≥10 multi-word chunks per passage (W28+), 1–3 per sentence.
- Bolded pattern: `**chunk of two or more words**` (e.g., `**ran down**`, not `**ran**`).
- Each bolded chunk must have a dictionary entry — clicking a chunk shows meaning, never "Chưa có trong từ điển".
- Vietnamese content (`content_vi`) carries no `**bold**` markers — they would trigger the dictionary popup in the wrong language.

## 4. Singapore Math CPA progression

Math content follows a Concrete → Pictorial → Abstract progression tied to week number:

| Week range | CPA stage | Bar model rendered? | Problem types |
|---|---|---|---|
| W1–W16 | language | no | part_whole (add/sub) |
| W17–W34 Easy | concrete | yes | + missing_part, comparison |
| W17–W34 Advanced | pictorial | yes | + groups, before_after |

The CPA stage is a property of the week, not a per-problem toggle. It is set when the week is created and does not drift.

## 5. AI Tutor data shape

`week_NN_real.js` exports a structured object. Required fields:

- `chunk_focus[]` — 3–5 key collocations from that week's `read.js`. The LLM reinforces these in conversation.
- `knowledge_base` — week-specific rules the AI must follow (empathy contract, vocabulary constraints, etc.).
- `opening_narrative` — the AI's opening, from the AI's perspective ("I am your AI teacher…"), not the student's.
- `phase_questions` — the questions the AI asks during story missions; framing is empathetic.
- `spark_talk` — deterministic frame list for off-script conversation.

The empathy contract in `knowledge_base` is non-negotiable: the AI must not say "Great!" after a learner describes an injury or negative event. Use "I am sorry" or "That sounds painful/scary" instead.

## 6. TTS text-hash caching

Generated audio is keyed by a **hash of the source text**. When `read.js` (or any TTS source) changes, only the affected entries are regenerated. The cache is per-week.

This means: when you change a text string, expect the corresponding audio to be regenerated. When you do not change the text, do not regenerate the audio — the cache will serve the existing one.

## 7. Persistence versioning

Zustand stores that persist (`persist` middleware) must declare:
- a `version` number
- a `partialize` selector (what to persist)
- a `merge` function (how to combine on rehydrate)
- a `migrate` function (how to upgrade across versions)

Without all four, progress can be silently lost on deploy. This is a pattern that becomes a rule in `RULES.md`.

## 8. Server station-key → UI tab-key mapping

The server returns station keys with an `_easy` suffix for Easy mode. The UI strips that suffix before looking up the tab component. This is a single, central mapping — not a per-component check. The pattern is: strip at the boundary, use the un-suffixed key inside the UI.

## 9. Validators are loud

Validators (B-checks, C-checks, content lint) report pass/fail explicitly. There are no soft warnings that can be ignored. A week that fails a check does not ship.

## 10. Lessons learned are persisted

When a bug is fixed, the **pattern** that caused it is captured in:
- `production_kit/never_rules/PRODUCTION_NEVER_RULES.md` (if it is a hard "never")
- `.ai/knowledge/` (if it is a durable, reusable fact)
- `.ai/decisions/` (if it is an architectural choice with trade-offs)

Future agents should not have to re-derive what the previous session learned.

## TODO — patterns not yet captured here

- The exact cross-station data contract (what `read.js` exports and what `shadowing.js` / `dictation.js` / `writing.js` import) — confirm from a golden-standard week (W7 or W16).
- The full LLM provider cascade trigger conditions.
- The shadowing transcript alignment algorithm (per `feedback_shadowing_transcript_sync.md`).
- The corrections cache shape and where it is stored (R2 KV vs localStorage).
