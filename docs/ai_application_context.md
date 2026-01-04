# EngQuest AI Context (Compact)

_Last Updated: 2026-01-04T08:58:03.626Z_

## TL;DR
- ESL learning app: weekly lessons → stations (reading, vocab, grammar, etc.) → AI tutor
- Client-server: React + Vite → Node/Express backend → PostgreSQL
- Auth: JWT, progress tracking per user/week/station
- AI: **Ms. Nova V3** - Pedagogical AI Engine with guardrails (Gemini proxy)

## Architecture
- **Frontend:** React 18 + Vite + Tailwind v3 + Zustand (state) + Axios (API client)
- **Backend:** Node.js/Express + JWT middleware + Gemini AI proxy
- **Database:** PostgreSQL (users, station_progress tables)
- **AI:** Google Gemini API proxied via backend `/api/chat`

## Tech Stack
- **Frontend:** `react`, `react-router-dom`, `zustand`, `axios`, `lucide-react`, `tailwindcss`, `vite`
- **Backend:** `express`, `pg`, `jsonwebtoken`, `bcryptjs`, `@google/generative-ai`, `cors`, `dotenv`

## Key Paths (Source of Truth)

**Core Application:**
- `src/App.jsx` — main app, routing, layout
- `src/stores/useUserStore.js` — Zustand store (auth, user, settings)
- `src/services/api.js` — centralized API client (Axios)
- `src/data/*.js` — static week/station content

**AI Tutor V3 (Ms. Nova) - MODULAR ARCHITECTURE:**
- `src/services/ai_tutor/novaEngine.js` — Core AI brain: context builder, guardrails, hint engine
- `src/services/ai_tutor/promptLibrary.js` — Persona, prompts, recast examples, scaffolding levels
- `src/modules/ai_tutor/AITutor.jsx` — Main UI orchestrator (tabs, state management)
- `src/modules/ai_tutor/tabs/` — 5 learning modes (Story, FreeTalk, Pronunciation, Quiz, Debate)
- `src/modules/ai_tutor/components/` — Shared UI components (ChatBubble, InputBar, etc.)
- `src/legacy_archive/` — **FORBIDDEN: Old AI Tutor code (DO NOT READ)**

**Backend:**
- `mcp-server/index.js` — Express app entry
- `mcp-server/config/db.js` — PostgreSQL pool
- `mcp-server/database/init.sql` — DB schema
- `mcp-server/routes/auth.js` — register/login endpoints
- `mcp-server/routes/progress.js` — progress CRUD
- `mcp-server/routes/ai.js` — Gemini proxy
- `mcp-server/middleware/authMiddleware.js` — JWT verification

## API Endpoints (Backend)
- `POST /api/chat` — proxy to Gemini AI (requires JWT)
- `POST /api/auth/register` — create user account
- `POST /api/auth/login` — login, returns JWT + user data
- `GET /api/progress/:weekId` — fetch user progress for a week
- `POST /api/progress` — upsert station progress (weekId, stationKey, progressPercent)

## Data Flows (Very Short)
- **Auth:** UI → `/api/auth/login` → DB query → JWT → Zustand store → Axios header
- **Progress:** UI → `/api/progress` → auth middleware → DB upsert → response → UI update
- **AI Tutor V3:** UI → `novaEngine.sendToNova()` → builds syllabus context → `/api/chat` → Gemini → guardrails (tense/ratio/question) → hint generation → structured response

## AI Tutor V3 Architecture (Ms. Nova)
```
User Input
  ↓
novaEngine.sendToNova()
  ↓ buildTutorContext() - Extract week syllabus (vocab, grammar rules)
  ↓ buildNovaPrompt() - Persona + mode instructions from promptLibrary
  ↓ Backend /api/chat - Gemini API proxy
  ↓ applyGuardrails() - Enforce: Tense Guard, Talk Ratio (≤0.8), Question Guard
  ↓ generateHints() - Intent-aware scaffolding
  ↓
Structured Response: {ai_response, pedagogy_note, mission_status, suggested_hints, grammar_focus}
```

**Key Features:**
- **Syllabus-Driven:** Every interaction tied to weekly curriculum
- **Guardrails:** Blocks banned grammar, enforces talk ratio, requires questions
- **Recast Technique:** Never says "wrong" - models correct form naturally
- **Scaffolding:** 4 levels (none → low → medium → high) based on student struggle
- **5 Modes:** Story Mission, Free Talk, Pronunciation, Quiz, Debate

## Local Dev (Minimal)
\`\`\`bash
# Backend
cd mcp-server && npm i
# Edit mcp-server/.env: PG_*, JWT_SECRET, GEMINI_API_KEY
npm run dev  # runs on :5001

# Frontend (new terminal)
cd .. && npm i
# Edit .env: VITE_API_URL=http://localhost:5001/api
npm run dev  # runs on :5173
\`\`\`

**Env vars:**
- Frontend: `VITE_API_URL`
- Backend: `PG_USER`, `PG_HOST`, `PG_DATABASE`, `PG_PASSWORD`, `PG_PORT`, `JWT_SECRET`, `GEMINI_API_KEY`

## AI Rules
- **DO NOT** scan repository unless explicitly asked
- **DO NOT** grep unless explicitly asked
- **ONLY** read files explicitly provided by user or listed in this doc
- **PREFER** asking user for specific file paths rather than searching
- **FORBIDDEN** to read: `node_modules`, `dist`, `.git`, `build`, `src/legacy_archive`

## Development Log & Key Decisions
<!-- AUTO_GENERATED_DEVELOPMENT_LOG -->
- 2026-01-04 11:00:00: **AI TUTOR V3 REBUILD COMPLETE (ALL PHASES)** - Full modular architecture implemented and tested. All 5 tabs functional: StoryMission (V3 engine + scaffolding), FreeTalk (natural conversation), Pronunciation (TTS), Quiz (auto-generated), Debate (opinion practice). Build successful. System ready for production testing.

- 2026-01-04 10:45:00: **AI TUTOR V3 REBUILD COMPLETE (Phase 1-2)** - Modular architecture implemented. Created novaEngine.js (pedagogical brain with guardrails) and promptLibrary.js (persona & scaffolding). Moved old code to legacy_archive. Next: Build UI shell (AITutor.jsx + tabs).

- 2026-01-04 02:19:17: Test context:update command

- 2026-01-04 02:18:02: Compacted AI context: reduced from 226 to ~80 lines; added context-log.mjs script

- 2026-01-02 04:18:58: Khắc phục lỗi đăng nhập tài khoản owner. Đã khởi động lại cả frontend và backend server để đảm bảo các thay đổi trong file .env được áp dụng.
- 2026-01-02 03:32:52: Khắc phục lỗi đăng nhập tài khoản owner (Invalid credentials). Nguyên nhân là do backend không kết nối đúng database. Đã sửa bằng cách thêm require('dotenv').config(); vào mcp-server/config/db.js, khởi động lại backend, và sau đó chạy lại lệnh chèn tài khoản owner.
- 2026-01-02 03:02:21: Xử lý lỗi đăng nhập tài khoản owner (Invalid credentials). Nguyên nhân do mật khẩu hash không khớp. Giải pháp: Tạo tài khoản owner thông qua API /api/auth/register của backend để đảm bảo mật khẩu được hash đúng cách.
- 2026-01-02 02:41:55: Đã tự động cài đặt PostgreSQL, tạo database engquest_db và user engquest_user, chạy script schema init.sql, và chèn tài khoản owner (username: owner, password: owner123, role: admin) vào database.
- 2026-01-01 16:32:22: Hướng dẫn khôi phục tài khoản owner bằng cách chèn trực tiếp vào cơ sở dữ liệu PostgreSQL với username owner và password admin123 (hashed).
- 2026-01-01 15:57:10: Tái cấu trúc ứng dụng EngQuest từ localStorage sang kiến trúc Client-Server với Node.js/Express, PostgreSQL, JWT Auth, và AI proxy.
