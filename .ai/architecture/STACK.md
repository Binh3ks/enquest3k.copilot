# Stack — EngQuest3K

The technology choices, grouped by concern. No component-level detail here — see the codebase for that.

## Runtime and build

| Layer | Choice | Why |
|---|---|---|
| UI framework | React 19 | Standard; large ecosystem; fast enough for our scale |
| Build tool | Vite | Fast dev loop; ESM-native; small config surface |
| Routing | react-router-dom v7 | The only router worth using with React 19 |
| Language | JavaScript (ESM) | The codebase is `type: "module"`. TypeScript is not used. |
| Styling | Vanilla CSS | No CSS-in-JS, no Tailwind. Per-project convention. |
| Package manager | npm | `package-lock.json` is the lockfile. |

## State and data

| Layer | Choice | Why |
|---|---|---|
| Client state | Zustand | Lightweight; no provider tree; persists cleanly |
| Persistence | Browser storage (Zustand `persist`) | Versioned + partialize; see `RULES.md` |
| Server state / auth | Supabase | Postgres + auth + storage in one service |
| Database | Postgres (via Supabase) | Per-session, per-user, per-progress data |

## AI and media

| Layer | Choice | Why |
|---|---|---|
| LLM provider chain | Cerebras → Groq → Together → Gemini (in that order) | Fallback cascade; first-healthy wins |
| TTS (batch) | Deepgram | Scripted batch generation with text-hash cache |
| TTS (runtime, dict) | Browser Speech Synthesis API | Per-entry lookups during reading |
| Audio storage | Cloudflare R2 | Cheap, durable, CDN-fronted |
| Video transcripts | youtube-transcript npm package | Daily-watch content sourcing |
| Dictionary | Local `public/dictionary.json` | Single file, regenerated, served as static asset |

## Validation and quality

| Layer | Choice | Why |
|---|---|---|
| Lint | ESLint | Standard, with React + hooks plugins |
| Content lint | Custom Node script (`tools/content_lint.mjs`) | Week-content rules |
| Dictionary lint | Custom Node script (`tools/dict_lint.mjs`) | Dictionary consistency |
| Bug prevention | `production_kit/tools/bug_prevention_check.sh` (B-checks) | Pattern-based anti-pattern detection |
| Code quality gate | `production_kit/tools/code_quality_gate.sh` (C-checks) | 48 rule slots, content + code |
| Singapore Math types | `production_kit/tools/validate_sgmath_types.mjs` | Bar-model type whitelist |
| E2E tests | Playwright (`tests/e2e/week_production.spec.js`) | Per-week smoke + regression |
| Audit pipeline (Python) | `production_kit/tools/layer*_*.py` | 4-layer chunk / collocation audit |

## Tooling and operations

| Layer | Choice | Why |
|---|---|---|
| LLM context build | Custom Node scripts (`scripts/build-context.mjs`, `generate_ai_context.cjs`) | Pre-baked snapshots for agents |
| R2 CLI | wrangler | Upload + listing |
| Deployment | TODO — confirm target (Cloudflare Pages or similar) |

## Languages used

| Language | Where | Notes |
|---|---|---|
| JavaScript / JSX | App, data, validators, scripts | Primary |
| Python | TTS scripts, audit pipeline, lesson-plan builder | Used only where it is the right tool |
| Bash | Validator entry points, ops scripts | Glue only |
| JSON / JSONL | Dictionary, datasets, audit outputs, session logs | Data only |

## TODO — unknown or unconfirmed

- Exact deployment target (Cloudflare Pages, Vercel, Netlify, custom?) — confirm from `.railway/` / `.wrangler/` state.
- Whether any portion of the backend is Supabase Edge Functions vs. an external API.
- AI provider account / billing ownership (not stored in this repo).

See `RULES.md` for hard constraints on what cannot change without explicit approval.
