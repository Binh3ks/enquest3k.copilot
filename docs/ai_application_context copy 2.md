# EngQuest Application Context for AI Analysis (AUTO-GENERATED)

_Last Updated: 2026-01-03T14:51:44.767Z_

## 1. Overall Description
EngQuest is a comprehensive ESL (English as a Second Language) learning application designed to help users learn English through structured weekly lessons, interactive stations, and an AI-powered tutor. The application focuses on providing a personalized and engaging learning experience.

## 2. Core Features
*   **Weekly Learning Structure:** Content is organized into weeks, each containing multiple learning "stations" (e.g., Read & Explore, Word Power, Grammar, Dictation, Writing, Shadowing, Review).
*   **User Authentication & Progress Tracking:** Secure user registration/login, guest access, and detailed progress tracking for each user across weeks and stations.
*   **AI-Powered Tutor:** An integrated AI tutor (powered by Google Gemini) provides interactive assistance and explanations.
*   **Spaced Repetition System (SRS):** Smart review generation to reinforce learning.
*   **Gamification:** Elements like stars and streaks to motivate learners.
*   **Learning Modes:** "Easy" and "Advanced" modes to cater to different proficiency levels.
*   **Admin/Teacher Panel:** Tools for administrators to manage content, users, and billing (partially implemented).
*   **Worksheet Generation:** Ability to print worksheets for offline practice.

## 3. Architecture Overview

```mermaid
graph TD
    subgraph Frontend (React App)
        A[EngQuest UI - React.js]
    end

    subgraph Backend (MCP Server - Node.js/Express)
        B[API Server]
        B -- Yêu cầu API bảo mật --> C[Auth Middleware]
        C -- Xác thực JWT --> B
        B -- Quản lý API Key --> D[AI Proxy Service]
        B -- Truy vấn/Cập nhật dữ liệu --> E[Database Service]
    end

    subgraph Database (PostgreSQL)
        E -- Lưu trữ dữ liệu --> F[Bảng users]
        E -- Lưu trữ dữ liệu --> G[Bảng station_progress]
        E -- Lưu trữ dữ liệu --> H[Các bảng khác (nếu có)]
    end

    subgraph Third-Party AI
        D -- Gọi Gemini API --> I[Google Gemini AI]
    end

    A -- "Yêu cầu API (HTTPS)" --> B
    D -- "Phản hồi AI" --> A
    E -- "Phản hồi dữ liệu" --> B
    B -- "Phản hồi API" --> A
```

**Key Architectural Changes:**
*   **Client-Server Model:** Moved from client-side `localStorage` to a dedicated backend with a PostgreSQL database.
*   **Centralized State Management (Frontend):** Uses Zustand for global state, with `persist` middleware for UI preferences and authentication token.
*   **Secure API Communication:** Frontend communicates with backend via RESTful APIs, protected by JWT authentication.
*   **AI API Proxy:** All Google Gemini API calls are routed through the backend to protect API keys, control access, and enable future features like caching/logging.

## 4. Technologies Used

### Frontend (from `package.json`):
*   **Dependencies:** `@google/generative-ai`, `bcryptjs`, `cors`, `dotenv`, `express`, `jsonwebtoken`, `pg`
*   **Dev Dependencies:** `@eslint/js`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react`, `autoprefixer`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `glob`, `globals`, `postcss`, `tailwindcss`, `vite`
*   **Scripts:** `dev`, `build`, `lint`, `preview`, `context:build`, `memory:add`, `memory:chat`, `generate:ai-context`

### Backend (from `mcp-server/package.json`):
*   **Dependencies:** `@google/generative-ai`, `bcryptjs`, `cors`, `dotenv`, `express`, `jsonwebtoken`, `pg`
*   **Dev Dependencies:** `nodemon`
*   **Scripts:** `start`, `dev`, `test`

## 5. Key Directory Structure

*   `/`: Project root.
*   [`src/`](src/): Frontend (React) source code.
    *   [`src/App.jsx`](src/App.jsx): Main React application component, handles routing and global layout.
    *   [`src/stores/useUserStore.js`](src/stores/useUserStore.js): Zustand store for user authentication, profile, and app settings.
    *   [`src/services/api.js`](src/services/api.js): Centralized API client for all backend interactions.
    *   [`src/components/`](src/components/): Reusable UI components.
    *   [`src/modules/`](src/modules/): Feature-specific modules/pages (e.g., `ai_tutor`, `review`, `dictation`).
    *   [`src/utils/`](src/utils/): Utility functions and custom hooks.
    *   [`src/data/`](src/data/): Static week/station data.
*   [`mcp-server/`](mcp-server/): Backend (Node.js/Express) source code.
    *   [`mcp-server/index.js`](mcp-server/index.js): Main Express application file, sets up middleware and registers routes.
    *   [`mcp-server/config/db.js`](mcp-server/config/db.js): Database connection pool configuration.
    *   [`mcp-server/database/init.sql`](mcp-server/database/init.sql): SQL script for initializing database schema.
    *   [`mcp-server/middleware/authMiddleware.js`](mcp-server/middleware/authMiddleware.js): Middleware for JWT authentication.
    *   [`mcp-server/routes/auth.js`](mcp-server/routes/auth.js): API routes for user registration and login.
    *   [`mcp-server/routes/progress.js`](mcp-server/routes/progress.js): API routes for managing user learning progress.
    *   [`mcp-server/routes/ai.js`](mcp-server/routes/ai.js): API route acting as a proxy for Google Gemini AI.
*   [`scripts/`](scripts/): Utility scripts (e.g., for build context, memory, etc.).
*   [`docs/`](docs/): Project documentation.

### Backend API Endpoints (from `mcp-server/routes/`):
*   `ai.js`:
    *   `POST /api/chat` (Proxies Google Gemini AI requests)
*   `auth.js`:
    *   `POST /api/auth/register` (User registration)
    *   `POST /api/auth/login` (User login, returns JWT)
*   `progress.js`:
    *   `GET /api/progress/:weekId` (Fetch user progress for a week)
    *   `POST /api/progress` (Create/update user progress for a station)


## 6. Database Schema (from `mcp-server/database/init.sql`)
```sql
-- EngQuest Database Initialization Script
-- This script creates the necessary tables for the application to run.

-- ========= USERS TABLE =========
-- Stores core user information, credentials, and roles.

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier for each user.
    username VARCHAR(50) UNIQUE NOT NULL, -- User's login name, must be unique.
    email VARCHAR(100) UNIQUE NOT NULL, -- User's email, must be unique for password recovery, etc.
    password_hash VARCHAR(255) NOT NULL, -- NEVER store plain text passwords. This will store a secure hash.
    role VARCHAR(20) NOT NULL DEFAULT 'student', -- Role of the user, e.g., 'student', 'admin'.
    avatar_url VARCHAR(255), -- URL for the user's profile picture.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the account was created.
    last_login TIMESTAMP WITH TIME ZONE -- To track the last login time, can be updated by a trigger or application logic.
);

-- ========= STATION_PROGRESS TABLE =========
-- Tracks the learning progress of each user for each station.
-- This normalized structure is much more scalable than storing progress in a JSON blob.

CREATE TABLE station_progress (
    id SERIAL PRIMARY KEY, -- Unique identifier for each progress entry.
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to the users table. If a user is deleted, their progress is also deleted.
    week_id INTEGER NOT NULL, -- The week number (e.g., 1, 2, 19).
    station_key VARCHAR(50) NOT NULL, -- The key for the station (e.g., 'read_explore', 'word_power').
    progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100), -- The completion percentage.
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- This constraint ensures that there is only one progress entry per user, per week, per station.
    UNIQUE(user_id, week_id, station_key)
);

-- ========= INDEXES =========
-- Indexes are crucial for performance, especially as the tables grow.

CREATE INDEX idx_station_progress_user_week ON station_progress (user_id, week_id);

-- Log script completion
-- (This is just a note for anyone running the script manually)

-- End of script.

```

## 7. Main Data Flows

### A. User Authentication (Login/Register)
1.  **Frontend:** User inputs credentials in `LoginScreen`.
2.  **Frontend (Zustand):** `useUserStore.login/register` action is dispatched.
3.  **Frontend (API Service):** `src/services/api.js` calls `apiClient.post('/auth/login')` or `('/auth/register')` to `mcp-server`.
4.  **Backend (Auth Route):** `mcp-server/routes/auth.js` receives request.
5.  **Backend (Auth Logic):** Hashes password (for register), queries `users` table, verifies password (for login), generates JWT.
6.  **Backend (Response):** Sends JWT and user data back to frontend.
7.  **Frontend (Zustand):** `useUserStore` updates `currentUser` and `token` state. `setAuthToken()` is called to configure Axios with the new token.

### B. User Progress Tracking
1.  **Frontend (UI Interaction):** User completes a part of a station.
2.  **Frontend (Component):** Calls `handleReportProgress` with updated percentage.
3.  **Frontend (API Service):** `src/services/api.js` calls `apiClient.post('/progress')` with `weekId`, `stationKey`, `progressPercent`.
4.  **Backend (Auth Middleware):** `mcp-server/middleware/authMiddleware.js` verifies JWT.
5.  **Backend (Progress Route):** `mcp-server/routes/progress.js` receives request.
6.  **Backend (DB Interaction):** Performs an `UPSERT` operation on the `station_progress` table based on `user_id`, `week_id`, `station_key`.
7.  **Backend (Response):** Sends success message/updated progress back to frontend.
8.  **Frontend (UI Update):** `App.jsx` updates its local `weekProgress` state.

### C. AI Tutor Interaction
1.  **Frontend (UI Interaction):** User sends a message to AI Tutor in `AITutor.jsx`.
2.  **Frontend (API Service):** Calls `src/services/api.js:getAiTutorResponse` with `history` and `message`.
3.  **Backend (Auth Middleware):** `mcp-server/middleware/authMiddleware.js` verifies JWT.
4.  **Backend (AI Route):** `mcp-server/routes/ai.js` receives request.
5.  **Backend (AI Service):** Uses `@google/generative-ai` library with `GEMINI_API_KEY` (from `.env`) to call Google Gemini API.
6.  **Backend (Response):** Receives AI response, processes it, and sends back to frontend.
7.  **Frontend (UI Update):** `AITutor.jsx` displays the AI's response.

## 8. Development Setup

To run this application locally, you need both the frontend and backend servers running.

### Prerequisites:
*   Node.js (v18+) and npm.
*   PostgreSQL database instance running locally or accessible remotely.

### Steps:
1.  **Clone the repository:** (Assuming you have already done this)
2.  **Backend Setup (`mcp-server/`):**
    *   Navigate to the `mcp-server` directory: `cd mcp-server`
    *   Install dependencies: `npm install`
    *   Create a `.env` file from `.env.example`: `cp .env.example .env`
    *   **Edit `.env`:** Fill in your `PG_USER`, `PG_HOST`, `PG_DATABASE`, `PG_PASSWORD`, `PG_PORT`, `JWT_SECRET`, and `GEMINI_API_KEY`.
        *   For `JWT_SECRET`, you can generate a strong random string using `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
    *   Initialize your PostgreSQL database using the provided schema script:
        *   First, ensure you have a PostgreSQL client installed (`psql`, pgAdmin, DBeaver).
        *   Connect to your database: `psql -U your_db_user -d engquest_db -h localhost` (replace with your details)
        *   Execute the schema script: `\i database/init.sql` (if using psql from `mcp-server` directory) or load it through your GUI client.
    *   Start the backend server in development mode: `npm run dev` (It should run on `http://localhost:5001`).
3.  **Frontend Setup (`/` - project root):**
    *   Navigate to the project root: `cd ..` (if you were in `mcp-server`)
    *   Install dependencies: `npm install`
    *   Create a `.env` file from `.env.example`: `cp .env.example .env`
    *   **Edit `.env` (Frontend):** Add `VITE_API_URL=http://localhost:5001/api`.
    *   Start the frontend development server: `npm run dev` (It will likely run on `http://localhost:5173` or similar).

## 9. How AI Tools Can Use This Context

This document is designed to give AI agents (like Copilot, or specialized analysis agents) a high-level, human-readable understanding of the application.

**For analysis/upgrades:**
*   **Start with this document:** Instruct the AI to read [`docs/ai_application_context.md`](docs/ai_application_context.md) first to get the overall picture.
*   **Ask for clarification:** The AI can then ask follow-up questions or request specific code files (e.g., `src/App.jsx`, `mcp-server/routes/auth.js`, etc.) based on the information in this document.
*   **Focus on relevant sections:** If debugging a frontend issue, the AI can prioritize `Frontend` sections and related code files. If a backend issue, focus on `Backend`, `Database`, and corresponding code.
*   **Trace data flows:** The `Main Data Flows` section provides a roadmap for understanding how different parts of the system interact.

By providing this comprehensive context, you empower AI tools to be much more effective in understanding, debugging, and enhancing your EngQuest application.

## 10. Development Log & Key Decisions
<!-- AUTO_GENERATED_DEVELOPMENT_LOG -->
*   **2026-01-02 04:18:58:** Khắc phục lỗi đăng nhập tài khoản owner. Đã khởi động lại cả frontend và backend server để đảm bảo các thay đổi trong file `.env` được áp dụng.
*   **2026-01-02 03:32:52:** Khắc phục lỗi đăng nhập tài khoản owner (`Invalid credentials`). Nguyên nhân là do backend không kết nối đúng database. Đã sửa bằng cách thêm `require('dotenv').config();` vào `mcp-server/config/db.js`, khởi động lại backend, và sau đó chạy lại lệnh chèn tài khoản owner. Tài khoản owner với username `owner` và password `owner123` (đã hash bởi backend) đã được chèn thành công vào database. Frontend được cập nhật `VITE_API_URL` để kết nối đúng backend.
*   **2026-01-02 03:02:21:** Xử lý lỗi đăng nhập tài khoản owner (`Invalid credentials`). Nguyên nhân do mật khẩu hash không khớp. Giải pháp: Tạo tài khoản owner thông qua API `/api/auth/register` của backend để đảm bảo mật khẩu được hash đúng cách.
*   **2026-01-02 02:41:55:** Đã tự động cài đặt PostgreSQL, tạo database `engquest_db` và user `engquest_user`, chạy script schema `init.sql`, và chèn tài khoản owner (username: `owner`, password: `owner123`, role: `admin`) vào database. Gemini API Key đã được tự động lấy từ `API keys.txt` và cấu hình trong `mcp-server/.env`.
*   **2026-01-01 16:32:22:** Hướng dẫn khôi phục tài khoản owner bằng cách chèn trực tiếp vào cơ sở dữ liệu PostgreSQL với username `owner` và password `admin123` (hashed).
*   **2026-01-01 15:57:10:** Tái cấu trúc ứng dụng EngQuest từ `localStorage` sang kiến trúc Client-Server với Node.js/Express, PostgreSQL, JWT Auth, và AI proxy. Bao gồm việc tạo backend, thiết kế DB schema, tích hợp frontend với API mới, và phát triển script tự động cập nhật ngữ cảnh ứng dụng. Sau đó, theo yêu cầu, đã tạo và triển khai một quy trình 'AI-assisted logging' để AI agent (tôi) có thể tự động ghi lại các tóm tắt quan trọng từ phiên chat vào tài liệu ngữ cảnh `docs/ai_application_context.md`.
