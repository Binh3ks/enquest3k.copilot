# Architecture Decision Records (ADR_LOG)

> Stack-level architectural decisions for EngQuest3K. Use this file when adding new modules, services, or migrations. Each entry has: Status, Context, Decision, Consequences.

---

## ADR-001 — Frontend Framework: React 19 + Vite 7

- **Status**: Accepted (2025-10)
- **Context**: K-12 SPA with 156-week curriculum, 16 stations/week, fast iteration required
- **Decision**: React 19.2 + Vite 7 build pipeline, ESM (`"type": "module"` in package.json)
- **Consequences**:
  - ✅ Fast HMR, modern Suspense + concurrent features
  - ⚠️ All custom Node scripts must be `.cjs` (not `.js`) due to ESM scope — see `agent-start.cjs`, `agent-finish.cjs`, hooks in `~/.claude/scripts/hooks/`
  - ⚠️ No CommonJS `require()` allowed in `src/`

## ADR-002 — State Management: Zustand 5 with persist

- **Status**: Accepted (2025-11)
- **Context**: Multi-station progress tracking, dual-mode (Easy/Advanced), Supabase sync
- **Decision**: Zustand 5 + `persist` middleware, versioned + migrated (CRITICAL — see `feedback_persist_versioning.md`)
- **Consequences**:
  - ✅ Lightweight (~1KB), no Provider hell
  - ⚠️ MUST include `version`, `partialize`, `merge`, `migrate` or progress is lost on deploy
  - ⚠️ Easy-mode station keys MUST strip `_easy` suffix before `STATION_ID_TO_TAB` lookup (Jun 7 fix)
  - ⚠️ `handleReportProgress` / `updateLocalProgress` must merge with existing `progressCache`, NEVER pass `data: {}`

## ADR-003 — Database: Supabase (migrated from Neon)

- **Status**: Accepted (2026-05)
- **Context**: Neon Postgres required manual provisioning; need auth + realtime + RLS
- **Decision**: Supabase for auth, realtime progress sync, Row-Level Security
- **Consequences**:
  - ✅ Built-in auth, realtime subscriptions, RLS policies
  - ⚠️ Service role key in `.env` ONLY (never commit)
  - ⚠️ Backup system runs nightly — see `neon_migration.md` for historical context

## ADR-004 — TTS & Audio: Cloudflare R2 + Gemini TTS / Deepgram

- **Status**: Accepted (2026-03)
- **Context**: 156 weeks × 16 stations × ~20 sentences = massive audio cache; need edge delivery in Vietnam
- **Decision**:
  - Cloudflare R2 for audio object storage (S3-compatible, zero egress fees)
  - Gemini TTS (primary) + Deepgram (fallback) + Puter + Browser TTS
  - Text-hash cache (`tools/generate_audio_deepgram.py`) — stale audio prevention
- **Consequences**:
  - ✅ Free egress for VN users, fast cold-start
  - ⚠️ TTS text changes require `npx wrangler r2 object delete` + regenerate workflow
  - ⚠️ `**bold**` markers MUST NOT appear in TTS files — see `feedback_shadowing_playback_bugs.md`
  - ⚠️ Multi-source architecture means fallback chain MUST be tested per station

## ADR-005 — App Architecture: SPA (no Node server)

- **Status**: Accepted (2025-10)
- **Context**: Simple deployment, edge-friendly, low ops cost
- **Decision**: Single-page React app, no Node backend — all logic client-side; Supabase + R2 + Cloudflare Workers handle serverless needs
- **Consequences**:
  - ✅ Trivial deploy (`npm run build` → Cloudflare Pages)
  - ✅ No server cold-starts, infinite scale
  - ⚠️ Secrets MUST stay client-side (API keys in `.env` with `VITE_` prefix)
  - ⚠️ LLM calls proxied through `apiProviderManager.js` for multi-provider fallback
  - ⚠️ ALL bundle is public — no proprietary algorithms client-side

## ADR-006 — Routing: react-router-dom 7

- **Status**: Accepted (2026-01)
- **Context**: Need deep-linking to specific stations/weeks
- **Decision**: `react-router-dom` v7 with file-based content routing
- **Consequences**:
  - ✅ `/week/:id/:station` pattern works for sharing/bookmarks
  - ⚠️ Progress save contract applies to route transitions — never pass empty `data`

## ADR-007 — Styling: Tailwind 3

- **Status**: Accepted (2025-11)
- **Context**: Dual-mode UI (Easy vs Advanced) with shared components but different themes
- **Decision**: Tailwind 3 + component-level CSS modules for complex animations
- **Consequences**:
  - ✅ Theme switching via className prefix
  - ⚠️ PostCSS config required (`postcss.config.js`)
  - ⚠️ Avoid utility soup — extract to component when used >3 times

## ADR-008 — Testing: Playwright E2E only (no unit tests)

- **Status**: Accepted (2026-02)
- **Context**: K-12 UX must feel native; unit tests on UI are brittle
- **Decision**: Playwright 1.59 for E2E, ESLint for static checks, custom content/dict linters for content quality
- **Consequences**:
  - ✅ Tests run against actual dev server
  - ⚠️ CI runs must include `npm run build` for full validation
  - ⚠️ Tests in `tests/e2e/week_production.spec.js` per week
  - ⚠️ NO unit tests — manual smoke + Playwright only

## ADR-009 — Multi-Agent Ecosystem (AgentOS v2)

- **Status**: Accepted (2026-07)
- **Context**: Need consistent behavior across Claude Code, OpenHands, Codex/Cursor
- **Decision**: AgentOS v2 framework with canonical `.ai/` directory, native slash commands, hook-based auto-memsave
- **Consequences**:
  - ✅ Single source of truth in `.ai/memory/`, `.ai/tasks/`, `.ai/decisions/`, `.ai/knowledge/`
  - ⚠️ All custom Node scripts MUST be `.cjs` (ESM-scope safe)
  - ⚠️ `/start` and `/finish` are the canonical entry/exit points
  - ⚠️ Hooks (`~/.claude/scripts/hooks/auto-memsave.js`) write to canonical `.ai/memory/CURRENT.md`

## ADR-010 — Content Delivery: Per-week JavaScript modules

- **Status**: Accepted (2025-10)
- **Context**: 156 weeks × 16 stations = 2,496 content files; need fast load + tree-shakeable
- **Decision**: Per-week JS modules (`src/data/weeks/week_NN/` + `src/data/weeks_easy/week_NN/`)
- **Consequences**:
  - ✅ Vite code-splits per week automatically
  - ⚠️ Schema drift is the #1 production risk — `npm run content:lint -- --week N --errors-only` is MANDATORY
  - ⚠️ Easy mode MUST stay in sync with Advanced mode — drift causes station mismatches

---

**Last updated**: 2026-07-05 (auto-generated from project stack audit)
**Owner**: AgentOS runtime