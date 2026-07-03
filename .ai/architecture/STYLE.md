# Style — EngQuest3K code and content conventions

Style rules that the codebase consistently follows. These are not enforced by validators (unlike `RULES.md`); they are observed and upheld by humans and agents working on the project.

## File and folder naming

- **Folders:** lowercase, no separators. `weekdata/` not `week-data/` or `weekData/`. Exception: `weeks_easy/` is the historic Easy-mode path.
- **Files:** lowercase, dots, hyphen-separated descriptors. `build_week_lesson_plan.py` ✅, `buildWeekLessonPlan.py` ❌.
- **Week folders:** zero-padded two digits. `week_01/` not `week_1/`.
- **Per-week files:** canonical names. Do not invent new file names inside a week; the station layout is fixed.

## JavaScript / JSX

- **Indentation:** 2 spaces. No tabs.
- **Quotes:** single quotes by default; double quotes only inside JSX attributes where required.
- **Modules:** ESM (`type: "module"`). Use `import` / `export`, not `require` / `module.exports`.
- **Components:** functional. Hooks, not class components.
- **State:** Zustand stores, lifted to the highest component that needs the data.
- **Naming:** `camelCase` for variables and functions; `PascalCase` for components and types; `UPPER_SNAKE_CASE` for module-level constants.
- **Comments:** explain *why*, not *what*. No narrating the code in prose. No block-comment essays.
- **Dead code:** delete it. Do not comment out alternatives. Do not leave "TODO: refactor" without a follow-up task in `.ai/tasks/`.

## Python

- **Indentation:** 4 spaces.
- **Used for:** TTS generation, audit pipeline, lesson-plan builder. Not for the app itself, not for `.js` files.
- **Path handling:** `pathlib.Path`, not string concatenation.
- **CLI entry points:** use `argparse` or `click`, not positional `sys.argv` parsing.

## Bash

- **Indentation:** 2 spaces.
- **Shebang:** `#!/usr/bin/env bash` (not `#!/bin/bash`).
- **Quoting:** always quote variables (`"$VAR"`, not `$VAR`).
- **Used for:** validator entry points and ops glue. Not for app logic.

## Content style — `read.js` / `explore.js`

- **Voice:** natural, age-appropriate for the target CEFR level. No "translation-ese".
- **Sentence length:** varies; never more than one long compound sentence per paragraph.
- **Chunk selection:** every bolded chunk must be a real collocation the student will see in real English. Force-fitting chunks (e.g., `**kind chef**`) is forbidden.
- **Character names:** consistent within a week. The same character is referred to the same way throughout.
- **Locations:** consistent within a week. Do not move characters between places without a reason in the story.

## Comprehension questions (A1 = 3, A2–B1 = 4)

| Level | Weeks | Question count |
|---|---|---|
| A1 | W1–W16 | 3 |
| A2–B1 | W17–W156 | 4 |

Every question must include:

- `answer: [...]` — at least 2 acceptable answers.
- `clue_statement` — a short sentence that gives the answer away.
- `hint_en` — a hint in English.
- `hint_vi` — a hint in Vietnamese.

`explore.js` carries 0 questions — it is a free exploration activity.

## Writing station

| Mode | `min_words` | Frames |
|---|---|---|
| Advanced | 45 | 8 sentence frames; each has `template` + `answers[]`; 1–4 blanks per frame |
| Easy | 30 | 6–7 sentence frames; each has `template` + `blank_labels[]`; 2–3 blanks per frame |

Every frame exposes `hints.vocabulary_bank`, `scaffolding_stage`, and `show_by_default`.

## AI Tutor style

- The AI's first person is "I". It introduces itself as "your AI teacher".
- It speaks in short, supportive turns. It does not lecture.
- It mirrors the student's CEFR level — A1 weeks get simple sentences; B1 weeks get richer prose.
- It does not patronize, does not say "Great!" after sad news, and does not invent facts about the student's life.

## Git and PR style

- **Commit messages:** imperative mood, ≤72 chars on the subject line. `fix(shadowing): …`, `feat(read): …`, `chore(kit): …` for the type prefix.
- **One concern per commit.** A commit that fixes two unrelated bugs is two commits.
- **PRs:** describe the why, not the diff. The diff is the diff; the PR explains the reason it exists.

## Comments and documentation

- Inline comments: only when the *why* is non-obvious.
- File-level JSDoc / docstrings: only when the file's role is not obvious from its name and path.
- Generated docs (architecture, rules, style) live in `.ai/architecture/` — keep them in sync with the codebase, do not let them drift.

## TODO — style points not yet captured

- Exact ESLint rule config (extends from `eslint-config-react` and `eslint-plugin-react-hooks`; the rest is TODO).
- Prettier config (if any) — TODO.
- How to format imports (alphabetical, grouped) — TODO.
- The exact Python style (black? ruff? formatters not yet committed).
