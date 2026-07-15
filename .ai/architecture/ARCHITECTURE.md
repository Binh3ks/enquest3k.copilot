# Architecture — EngQuest3K

All project knowledge in one file: what the project is, what it's built with, how it's organized, and what cannot change. The canonical deep references for repository layout and subsystem detail are in [REPOSITORY_MAP.md](REPOSITORY_MAP.md) and [SUBSYSTEMS.md](SUBSYSTEMS.md).

---

## 1. Project overview

An English-learning web app for Vietnamese K-12 students: A1 → B1+ in 3 years via a **156-week curriculum** delivered across 16 stations per week. A student is always in a specific week, working through specific stations — never "in the app" abstractly.

### Audience

| Tier | Mode | Audience |
|---|---|---|
| Tier 1 | Easy | Personal/domestic students; first contact with English |
| Tier 2–3 | Advanced | Global/international-track students; exam-oriented |

The same week is taught twice — Easy and Advanced — with **differentiated content depth**, not just translated strings.

### Engineering philosophy

- **Weeks are the atomic unit of change.** A week ships or it does not; no "half-week".
- **Content is data, not code.** Curriculum lives in JS data files, versioned with the app. Content edits go through the same pipeline as code edits.
- **Dual modes are siblings, not forks.** Easy and Advanced share station layout and validation rules; content differs.
- **Validation is a gate, not a check.** A week that fails any validator does not deploy.
- **The next agent should not have to re-derive anything.** Memory, decisions, knowledge, and this folder exist so the next session starts with full context.

### Scope (today — update this table, not hardcoded counts elsewhere)

| | |
|---|---|
| Curriculum total | 156 weeks |
| Stations per week | 16 (Read, Vocab, Grammar, Logic, AI Tutor, Games, …) |
| Current production | ~34 deployed; W33+ in production |

Up-to-date numbers live in `memory/CURRENT.md` and the `Production Progress` tables in `CLAUDE.md`.

---

## 2. Tech stack

| Layer | Choice | Why |
|---|---|---|
| UI framework | React 19 | Standard; large ecosystem; fast enough at our scale |
| Build tool | Vite | Fast dev loop; ESM-native; small config surface |
| Routing | react-router-dom v7 | The only router worth using with React 19 |
| Language | JavaScript (ESM) | `type: "module"`. No TypeScript. |
| Styling | Vanilla CSS | No CSS-in-JS, no Tailwind. Per-project convention. |
| Package manager | npm | `package-lock.json` is the lockfile. |
| Client state | Zustand | Lightweight; no provider tree; persists cleanly |
| Persistence | Browser storage (Zustand `persist`) | Versioned + partialize — see **Rules** below |
| Auth / server state | Supabase | Postgres + auth + storage in one service |
| LLM chain | Cerebras → Groq → Together → Gemini | Fallback cascade; first-healthy wins |
| TTS (batch) | Deepgram Aura-2 | Scripted batch generation with text-hash cache |
| TTS (runtime dict) | Browser Speech Synthesis API | Per-entry lookups during reading |
| Audio storage | Cloudflare R2 | Cheap, durable, CDN-fronted |
| Video transcripts | youtube-transcript npm package | Daily-watch content sourcing |
| Dictionary | Local `public/dictionary.json` | Single regenerated file served as static asset |
| Lint | ESLint | Standard, React + hooks plugins |
| Content lint | `tools/content_lint.mjs` | Week-content rules |
| Bug prevention | `production_kit/tools/bug_prevention_check.sh` | Pattern-based anti-pattern detection |
| Quality gate | `production_kit/tools/code_quality_gate.sh` | 48 rule slots, content + code |
| E2E tests | Playwright (`tests/e2e/`) | Per-week smoke + regression |
| Audit pipeline | `production_kit/tools/layer*_*.py` | 4-layer chunk/collocation audit |
| R2 CLI | wrangler | Upload + listing |

**Languages used:** JavaScript/JSX (primary), Python (TTS/audit/lesson-plan only), Bash (validator entry points, ops glue), JSON/JSONL (data only).

**Unknown / unconfirmed:** Exact deployment target (Cloudflare Pages, Vercel, Netlify?); whether any backend is Supabase Edge Functions vs. external API.

---

## 3. Architectural layers

```
  ┌──────────────────────────────────────────────────────────┐
  │  Public assets   public/audio, public/images, dictionary │
  ├──────────────────────────────────────────────────────────┤
  │  Content data    src/data/weeks/, src/data/weeks_easy/   │
  │                  (per-week, dual-mode, declarative)      │
  ├──────────────────────────────────────────────────────────┤
  │  App shell       src/pages, src/modules, src/components  │
  │                  (UI, station implementations)           │
  ├──────────────────────────────────────────────────────────┤
  │  App services    src/services, src/stores, src/hooks,    │
  │                  src/config, src/utils                   │
  │                  (state, persistence, AI, TTS, routing)  │
  └──────────────────────────────────────────────────────────┘
```

Each layer depends only on the layer below it. Content data does not import from the app shell; the app shell reads content as data.

### Folder responsibilities (one-liner)

| Folder | Role |
|---|---|
| `.ai/` | AgentOS — memory, tasks, knowledge, decisions, architecture |
| `src/data/` | Week data (declarative) + dictionaries |
| `src/modules/` | Feature modules (one per major capability) |
| `src/components/` | Reusable UI primitives |
| `src/pages/` | Page-level compositions |
| `src/services/` | External integrations (AI, TTS, Supabase) |
| `src/stores/` | Zustand stores (auth, user, progress) |
| `src/hooks/` | Shared React hooks |
| `src/config/` | Static configuration |
| `src/utils/` | Pure helpers |
| `src/ai/` | AI client adapters and provider management |
| `public/audio/` | TTS-generated audio (regenerated, not edited) |
| `public/images/` | Visual assets |
| `production_kit/workflow/` | Production workflow files (deprecated — use `.claude/skills/week-builder/SKILL.md` as entry point) |
| `production_kit/never_rules/` | 50+ "never" rules (source of truth for Rules section below) |
| `production_kit/tools/` | Validation scripts |
| `production_kit/reference/` | Syllabus, Blueprint, STEM integration |
| `tools/` | Project-local scripts (dictionary, TTS, validators) |
| `tests/e2e/` | Playwright |

---

## 4. Patterns

Conventions that make the codebase recognizable. These are *defaults* — when a pattern conflicts with **Rules** (§5), rules win.

### 1. Week-isolated content

Each week is a folder. Adding a new week means adding a new folder, never editing shared code:

```
src/data/weeks/week_NN/         # 16 files (W16+) or 15 files (W1–W15)
src/data/weeks_easy/week_NN/    # mirror, 16 files
src/data/weeks/week_NN_real.js  # AI Tutor data (Advanced only)
```

Cross-week concerns (new station types, shared logic) go in `src/`, discovered from data.

### 2. Dual-mode parity and independence

Easy and Advanced modes share station layout and validation rules; content differs. A change in one mode must not silently propagate. When content overlaps are intentional, that overlap is documented, not assumed.

### 3. Chunk-first content

Multi-word collocations are the primary teaching unit. Single-word bolds do not exist.

- Reading passages: ≥10 multi-word chunks per passage (W28+), 1–3 per sentence.
- Bold pattern: `**chunk of two or more words**` (e.g. `**ran down**` ✅, `**ran**` ❌).
- Each bolded chunk must have a dictionary entry — clicking shows meaning, never "Chưa có trong từ điển".
- `content_vi` carries no `**bold**` markers.

### 4. Singapore Math CPA progression

| Week range | CPA stage | Bar model rendered? | Problem types |
|---|---|---|---|
| W1–W16 | `language` | no | `part_whole` (add/sub) |
| W17–W34 Easy | `concrete` | yes | + `missing_part`, `comparison` |
| W17–W34 Advanced | `pictorial` | yes | + `groups`, `before_after` |

### 5. AI Tutor data shape

`week_NN_real.js` exports a structured object. Required fields: `chunk_focus[]` (3–5 collocations from `read.js`), `knowledge_base` (empathy contract + week rules), `opening_narrative` (from AI's perspective), `phase_questions` (empathetic framing), `spark_talk` (deterministic off-script frames).

### 6. TTS text-hash caching

Audio is keyed by a hash of the source text. Changing `read.js` invalidates the affected audio; not changing it keeps the cache. Regeneration is explicit.

### 7. Persistence versioning

Zustand stores using `persist` must declare: `version` + `partialize` + `merge` + `migrate`. Omitting any one can silently wipe progress on deploy.

### 8. Validators are loud

There are no soft warnings that can be ignored. A week that fails any check does not ship.

### 9. Lessons learned are persisted

When a bug is fixed, the pattern is captured in: `production_kit/never_rules/` (hard never), `.ai/knowledge/` (durable fact), or `.ai/decisions/` (architectural choice with trade-offs).

---

## 5. Rules (hard constraints)

Rules in this section are **non-negotiable**. Violating them breaks production, the curriculum, or the user experience. The canonical, full version lives in `production_kit/never_rules/PRODUCTION_NEVER_RULES.md`.

### Path and config protection

| File | Rule |
|---|---|
| `public/_redirects` | Do not modify without explicit human approval. |
| `public/_headers` | Do not modify without explicit human approval. |
| `vite.config.js` | Do not modify without explicit human approval. |
| `.env*` | Do not commit secrets. Do not edit without approval. |

### Code and data rules

- **NEVER use Python to create `.js` files.** Python is for tooling only.
- **NEVER copy `**bold**` text into `dictation.js` or `shadowing.js`.** Bolds live in `read.js`.
- **ALWAYS use `answer:`**, not `correct:`, in grammar exercises.
- **ALWAYS use valid Singapore Math types**: `part_whole`, `comparison`, `missing_part`, `groups`, `before_after`.
- **ALWAYS run `bash production_kit/tools/code_quality_gate.sh N`** before committing a week.

### Content rules (chunk-first)

- **Single-word bolds = 0 allowed** (all 156 weeks). Enforced by CHECK 20c.
- **W28+ requires ≥10 multi-word chunks per passage**, 1–3 per sentence.
- **Canonical-longest bold policy (W36+ new content only):** bold the longest form at every occurrence. Do not bold sub-chunks inside super-chunks. Do not retroactively fix W1–W35.
- **Chunks must be natural collocations.** No `kind chef`, `nice scientist`, `friendly artist`, `very very tall`. Use `good cook`, `engineer`, `very tall`.
- **No doubled modifiers.** No circular topics. No orphan chunks.
- **`content_vi` carries no `**bold**` markers.**
- **If `read.js` changes, `dictation.js` and `shadowing.js` must stay aligned.**

### AI Tutor rules

- AI Tutor data: `src/data/weeks/week_NN_real.js` — **not** `ask_ai.js`.
- `chunk_focus[]` is required (3–5 collocations from `read.js`).
- Empathy rule is required: NEVER say "Great!" after injury/negative events.
- `opening_narrative` from AI's perspective, not the student's.

### Persistence and state

- Zustand `persist` stores: declare `version` + `partialize` + `merge` + `migrate`.
- Progress save must never pass `data: {}` — always merge with existing cache.
- Server station keys with `_easy` suffix must be stripped before UI tab lookup.

### Workflow rules

- Read `CLAUDE.md` first for week-specific context.
- Read the file you are about to edit before editing.
- Changes >5 files: use `EnterPlanMode` and get approval.
- Never run global scripts (`sed`, `find -exec`, Python batch) without approval.
- Never `git reset --hard`, `git push --force`, `rm -rf` on broad paths, or `DROP`/`TRUNCATE` without confirmation.
- Always run `/review` before committing.
- Always run `FINISH.md` at end of session.

---

## 6. Style conventions

Style rules the codebase consistently follows. These are not enforced by validators (unlike Rules in §5); they are observed by agents working on the project.

### File and folder naming

- **Folders:** lowercase, no separators. `weeks_easy/` is the historic Easy-mode exception.
- **Files:** lowercase, dots, hyphen-separated descriptors. `build_week_lesson_plan.py` ✅
- **Week folders:** zero-padded two digits: `week_01/`, not `week_1/`.
- **Per-week files:** canonical names. Do not invent new file names inside a week; station layout is fixed.

### JavaScript / JSX

- 2-space indentation, single quotes, ESM (`import`/`export`), functional components/hooks only.
- `camelCase` for variables/functions, `PascalCase` for components, `UPPER_SNAKE_CASE` for module-level constants.
- Comments explain *why*, not *what*. Delete dead code; don't comment it out.

### Python

- 4-space indentation. `pathlib.Path` for paths. Use `argparse` or `click` for CLI.
- Used only for TTS generation, audit pipeline, lesson-plan builder.

### Bash

- 2-space indentation, `#!/usr/bin/env bash`, always quote variables.

### Content style (read.js / explore.js)

- Voice: natural, age-appropriate for CEFR level. No "translation-ese".
- Chunk selection: every bold chunk must be a real collocation the student will encounter.
- Character names and locations: consistent within a week.

### Comprehension questions

| Level | Weeks | Count |
|---|---|---|
| A1 | W1–W16 | 3 |
| A2–B1 | W17–W156 | 4 |

Every question requires: `answer: [...]` (≥2), `clue_statement`, `hint_en`, `hint_vi`. `explore.js` carries 0 questions.

### Writing station

| Mode | `min_words` | Frames |
|---|---|---|
| Advanced | 45 | 8 frames (`template` + `answers[]`, 1–4 blanks) |
| Easy | 30 | 6–7 frames (`template` + `blank_labels[]`, 2–3 blanks) |

Each frame exposes `hints.vocabulary_bank`, `scaffolding_stage`, and `show_by_default`.

### Git style

Commit messages: imperative mood, ≤72 chars subject. Use type prefix: `fix(shadowing):`, `feat(read):`, `chore(kit):`. One concern per commit. PRs describe the why, not the diff.

---

## What does not belong in `src/`

- Hard-coded curriculum content (lives in `src/data/`)
- Production prompts (lives at repo root)
- Agent context (lives in `.ai/`)

## See also

- [REPOSITORY_MAP.md](REPOSITORY_MAP.md) — top-level inventory with per-folder read/recurse guidance
- [SUBSYSTEMS.md](SUBSYSTEMS.md) — deep per-subsystem inventory (37 subsystems)
- [INDEX.md](INDEX.md) — architecture folder entry point
