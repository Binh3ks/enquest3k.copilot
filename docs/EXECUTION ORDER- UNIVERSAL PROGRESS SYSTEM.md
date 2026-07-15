🚀 EXECUTION ORDER: UNIVERSAL PROGRESS SYSTEM
Target: EngQuest 3K Repo Status: REQUIRED IMMEDIATE IMPLEMENTATION

🛑 PHẦN 0: DỌN DẸP HỆ THỐNG CŨ (MANDATORY)
Yêu cầu Coder thực hiện trước khi viết bất kỳ dòng code mới nào để tránh xung đột logic.

XÓA FILE (DELETE): src/utils/stationStateHelper.js

Lý do: Logic lưu trạng thái cũ, gây xung đột với Hook mới.

XÓA FILE (DELETE): src/utils/progressHelper.js

Lý do: Logic tính điểm cũ không đồng bộ với Database.

SỬA FILE: src/utils/userStorage.js

Hành động: Xóa các hàm saveProgress, getProgress. Chỉ giữ lại logic liên quan đến token và user_info.

🛠️ PHẦN 1: BACKEND & DATABASE
Bước 1.1: Cập nhật Database
Chạy câu lệnh SQL sau trong PostgreSQL (thông qua pgAdmin hoặc CLI):

SQL

CREATE TABLE IF NOT EXISTS user_progress (
    user_id INTEGER NOT NULL,
    week_id INTEGER NOT NULL,
    station_id VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    score INTEGER DEFAULT 0,
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, week_id, station_id)
);
CREATE INDEX IF NOT EXISTS idx_progress_user_week ON user_progress(user_id, week_id);
Bước 1.2: Tạo API Route
Tạo file: mcp-server/routes/progress.js Nội dung: Copy toàn bộ code từ Phần 2 (Backend API) của Master Artifact V4.0.

Bước 1.3: Đăng ký Route
Sửa file: mcp-server/index.js Thêm dòng sau vào danh sách routes:

JavaScript

const progressRoutes = require('./routes/progress');
app.use('/api/progress', progressRoutes);
🧠 PHẦN 2: FRONTEND CORE (HẠ TẦNG)
Bước 2.1: Cập nhật Service
Sửa file: src/services/api.js Hành động: Thêm object progressAPI (gồm fetchWeekProgress và saveProgress) từ Phần 3.1 của Master Artifact V4.0.

Bước 2.2: Cập nhật Store
Sửa file: src/stores/useUserStore.js Hành động: Thay thế toàn bộ nội dung file bằng code từ Phần 3.2 của Master Artifact V4.0. Đảm bảo store có progressCache và updateLocalProgress.

Bước 2.3: Tạo Hook Thần Thánh
Tạo file mới: src/hooks/useStationProgress.js Hành động: Copy toàn bộ nội dung từ Phần 3.3 của Master Artifact V4.0. Lưu ý: Cần cài lodash: npm install lodash (nếu chưa có).

Bước 2.4: Đấu nối vào App
Sửa file: src/App.jsx Hành động: Thêm useEffect để gọi loadWeekProgress(currentWeekId) khi user đã đăng nhập. (Xem hướng dẫn Phần 3 của Artifact V4).

🔌 PHẦN 3: TÍCH HỢP MODULE (INTEGRATION)
Coder phải mở từng file dưới đây, import hook và gắn hàm saveProgress vào đúng sự kiện.

Cú pháp chung cho tất cả các file:

JavaScript

import { useStationProgress } from '../../hooks/useStationProgress'; // Chỉnh path ../ cho đúng
// Trong component:
const { saveProgress, markComplete, savedData } = useStationProgress(weekData.id, 'STATION_ID');
DANH SÁCH FILE CẦN SỬA & STATION ID TƯƠNG ỨNG:
Video Player:

File: src/modules/watch/DailyWatch.jsx

Station ID: 'daily_watch'

Data: { timestamp: currentTime, watchedPercent: percent }

Video Interactive:

File: src/modules/video/VideoChallenge.jsx

Station ID: 'video_challenge'

Data: { answers: {...}, score: currentScore }

Story Mission:

File: src/modules/ai_tutor/tabs/StoryMissionTab.jsx

Station ID: 'ai_story'

Data: { lastMissionId: mission.id, turnCount: turnManager.totalTurns }

Free Talk:

File: src/modules/ai_tutor/tabs/FreeTalkTab.jsx

Station ID: 'ai_freetalk'

Data: { totalTurns: count }

Pronunciation:

File: src/modules/ai_tutor/tabs/PronunciationTab.jsx

Station ID: 'ai_pronunciation'

Data: { wordsPracticed: { word: score } }

Ask AI:

File: src/modules/ask_ai/AskAi.jsx

Station ID: 'ask_ai'

Data: { interactionCount: count }

Game Hub:

File: src/modules/games/GameHub.jsx

Station ID: 'game_hub'

Data: { totalStars: stars }

Word Match:

File: src/modules/match/WordMatch.jsx

Station ID: 'game_word_match'

Data: { highScore: score }

Word Power:

File: src/modules/power/WordPower.jsx

Station ID: 'game_word_power'

Data: { batteryLevel: level }

Logic Lab:

File: src/modules/logic/LogicLab.jsx

Station ID: 'game_logic'

Data: { currentLevel: level }

Vocab Manager:

File: src/modules/vocab/VocabManager.jsx

Station ID: 'vocab_mastery'

Data: { flashcardIndex: index, learnedWords: [...] }

Grammar:

File: src/modules/grammar/GrammarEngine.jsx

Station ID: 'grammar_lab'

Data: { completedDrills: [...], score: score }

Dictation:

File: src/modules/dictation/DictationEngine.jsx

Station ID: 'skill_dictation'

Data: { correctSentences: count }

Reading:

File: src/modules/read/ReadingExplore.jsx

Station ID: 'skill_reading'

Data: { lastPage: page }

Shadowing:

File: src/modules/shadowing/Shadowing.jsx

Station ID: 'skill_shadowing'

Data: { recordedSegments: [...] }

Writing:

File: src/modules/writing/Writing.jsx

Station ID: 'skill_writing'

Data: { draft: text, isSubmitted: bool }

MindMap:

File: src/modules/production/MindMapSpeaking.jsx

Station ID: 'production_mindmap'

Data: { completedBranches: [...] }

Review Dashboard:

File: src/modules/review/ReviewDashboard.jsx

Station ID: 'review_session'

Data: { itemsReviewed: count }

Explore:

File: src/modules/explore/Explore.jsx

Station ID: 'explore'

Data: { visitedNodes: [...] }

Self Regulation:

File: src/modules/self_regulation/SelfRegulation.jsx

Station ID: 'self_regulation'

Data: { mood: string }

✅ CHECKLIST KIỂM TRA (VERIFICATION)
Sau khi Coder hoàn thành, hãy kiểm tra theo quy trình sau:

Start App: Console log phải hiện 📥 Loading progress for Week X... (từ useUserStore).

Test Video: Mở Daily Watch, xem 10 giây, reload trang. Video phải tự động tua đến giây thứ 10.

Test Story: Chat với Ms. Nova 3 câu, reload trang. Chat history phải được giữ nguyên hoặc biến đếm turn không bị reset.

Test Database: Query bảng user_progress, phải thấy các dòng dữ liệu JSONB tương ứng.

Đây là bản hướng dẫn thực thi cuối cùng và chính xác nhất. Coder không cần phải đoán hay tự suy luận nữa.