# EngQuest AI Context (Compact)

_Last Updated: 2026-01-04T02:19:17.821Z_

## TL;DR
- ESL learning app: weekly lessons → stations (reading, vocab, grammar, etc.) → AI tutor
- Client-server: React + Vite → Node/Express backend → PostgreSQL
- Auth: JWT, progress tracking per user/week/station
- AI: Gemini proxy (backend protects API key)

## Architecture
- **Frontend:** React 18 + Vite + Tailwind v3 + Zustand (state) + Axios (API client)
- **Backend:** Node.js/Express + JWT middleware + Gemini AI proxy
- **Database:** PostgreSQL (users, station_progress tables)
- **AI:** Google Gemini API proxied via backend `/api/chat`

## Tech Stack
- **Frontend:** `react`, `react-router-dom`, `zustand`, `axios`, `lucide-react`, `tailwindcss`, `vite`
- **Backend:** `express`, `pg`, `jsonwebtoken`, `bcryptjs`, `@google/generative-ai`, `cors`, `dotenv`

## Key Paths (Source of Truth)
- `src/App.jsx` — main app, routing, layout
- `src/stores/useUserStore.js` — Zustand store (auth, user, settings)
- `src/services/api.js` — centralized API client (Axios)
- `src/data/*.js` — static week/station content
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
- **AI Tutor:** UI → `/api/chat` → auth middleware → Gemini API → response → UI

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

## Development Log & Key Decisions
<!-- AUTO_GENERATED_DEVELOPMENT_LOG -->- 2026-01-04 02:19:17: Test context:update command

- 2026-01-04 02:18:02: Compacted AI context: reduced from 226 to ~80 lines; added context-log.mjs script

- 2026-01-02 04:18:58: Khắc phục lỗi đăng nhập tài khoản owner. Đã khởi động lại cả frontend và backend server để đảm bảo các thay đổi trong file .env được áp dụng.
- 2026-01-02 03:32:52: Khắc phục lỗi đăng nhập tài khoản owner (Invalid credentials). Nguyên nhân là do backend không kết nối đúng database. Đã sửa bằng cách thêm require('dotenv').config(); vào mcp-server/config/db.js, khởi động lại backend, và sau đó chạy lại lệnh chèn tài khoản owner.
- 2026-01-02 03:02:21: Xử lý lỗi đăng nhập tài khoản owner (Invalid credentials). Nguyên nhân do mật khẩu hash không khớp. Giải pháp: Tạo tài khoản owner thông qua API /api/auth/register của backend để đảm bảo mật khẩu được hash đúng cách.
- 2026-01-02 02:41:55: Đã tự động cài đặt PostgreSQL, tạo database engquest_db và user engquest_user, chạy script schema init.sql, và chèn tài khoản owner (username: owner, password: owner123, role: admin) vào database.
- 2026-01-01 16:32:22: Hướng dẫn khôi phục tài khoản owner bằng cách chèn trực tiếp vào cơ sở dữ liệu PostgreSQL với username owner và password admin123 (hashed).
- 2026-01-01 15:57:10: Tái cấu trúc ứng dụng EngQuest từ localStorage sang kiến trúc Client-Server với Node.js/Express, PostgreSQL, JWT Auth, và AI proxy.
