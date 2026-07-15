📘 MASTER ARTIFACT: UNIVERSAL PROGRESS SYSTEM (FULL EDITION)
Scope: 100% Modules Coverage (20 Stations) Structure: Database -> Backend API -> Frontend Infrastructure -> Modules Integration

PHẦN 1: DATABASE LAYER (PostgreSQL)
Chạy lệnh SQL này để tạo bảng lưu trữ duy nhất. Bảng này dùng JSONB để lưu dữ liệu động cho mọi loại tính năng.

SQL

-- Xóa bảng cũ nếu cần thiết (CẨN THẬN DỮ LIỆU)
-- DROP TABLE IF EXISTS user_progress;

CREATE TABLE IF NOT EXISTS user_progress (
    user_id INTEGER NOT NULL,
    week_id INTEGER NOT NULL,          -- Syllabus Week (1-156)
    station_id VARCHAR(50) NOT NULL,   -- ID định danh tính năng (xem danh sách chi tiết ở Phần 4)
    
    -- TRẠNG THÁI HIỂN THỊ UI
    is_completed BOOLEAN DEFAULT FALSE, -- True = Hiện tick xanh hoàn thành
    score INTEGER DEFAULT 0,            -- Điểm số (0-100 hoặc điểm game)
    
    -- DỮ LIỆU CHI TIẾT (STATE RESTORATION)
    -- Cột này chứa JSON tùy biến cho từng trạm
    data JSONB DEFAULT '{}'::jsonb,     
    
    -- METADATA
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- CONSTRAINT: Một User chỉ có 1 bản ghi cho 1 Trạm trong 1 Tuần
    PRIMARY KEY (user_id, week_id, station_id)
);

-- Index để query nhanh toàn bộ tiến độ của 1 tuần (cho màn hình Dashboard)
CREATE INDEX idx_progress_user_week ON user_progress(user_id, week_id);
PHẦN 2: BACKEND API (Node.js/Express)
Cập nhật hoặc tạo mới file mcp-server/routes/progress.js. Code này xử lý việc đọc/ghi dữ liệu JSONB.

JavaScript

// FILE: mcp-server/routes/progress.js
const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * GET /api/progress/:weekId
 * Lấy toàn bộ tiến độ của user trong 1 tuần (để render map/dashboard)
 */
router.get('/:weekId', authenticateToken, async (req, res) => {
  try {
    const { weekId } = req.params;
    const userId = req.user.id;

    const query = `
      SELECT station_id, data, is_completed, score, updated_at 
      FROM user_progress 
      WHERE user_id = $1 AND week_id = $2
    `;
    const result = await pool.query(query, [userId, weekId]);
    
    // Convert Array -> Map Object để Frontend dễ truy xuất theo Key
    // Output: { 'daily_watch': { ... }, 'game_word_match': { ... } }
    const progressMap = result.rows.reduce((acc, row) => {
      acc[row.station_id] = {
        data: row.data,
        isCompleted: row.is_completed,
        score: row.score,
        updatedAt: row.updated_at
      };
      return acc;
    }, {});

    res.json(progressMap);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /api/progress/save
 * Lưu hoặc Cập nhật tiến độ cho 1 trạm cụ thể (Upsert)
 */
router.post('/save', authenticateToken, async (req, res) => {
  try {
    const { weekId, stationId, data, isCompleted, score } = req.body;
    const userId = req.user.id;

    // Logic Upsert: Nếu chưa có thì Insert, có rồi thì Update
    const query = `
      INSERT INTO user_progress (user_id, week_id, station_id, data, is_completed, score, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (user_id, week_id, station_id) 
      DO UPDATE SET 
        data = $4, 
        is_completed = $5, 
        score = $6,
        updated_at = NOW()
      RETURNING *;
    `;
    
    // Đảm bảo data là valid JSON object
    const safeData = data || {};
    const safeScore = score || 0;
    const safeCompleted = isCompleted || false;

    const result = await pool.query(query, [userId, weekId, stationId, safeData, safeCompleted, safeScore]);
    res.json(result.rows[0]);

  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
PHẦN 3: FRONTEND INFRASTRUCTURE (React Core)
Đây là phần nền móng để các UI component gọi xuống.

1. API Service (src/services/api.js)
Thêm các hàm gọi API vào file service hiện có.

JavaScript

// Thêm vào src/services/api.js

export const progressAPI = {
  // Lấy tiến độ tuần
  fetchWeekProgress: async (weekId) => {
    const response = await api.get(`/progress/${weekId}`);
    return response.data;
  },

  // Lưu tiến độ trạm
  saveProgress: async ({ weekId, stationId, data, isCompleted, score }) => {
    const response = await api.post('/progress/save', {
      weekId,
      stationId,
      data,
      isCompleted,
      score
    });
    return response.data;
  }
};
2. Global Store (src/stores/useUserStore.js)
Cập nhật Store để quản lý cache tiến độ, giúp UI phản hồi tức thì (Optimistic UI).

JavaScript

// Cập nhật src/stores/useUserStore.js
import { create } from 'zustand';
import { progressAPI } from '../services/api';

const useUserStore = create((set, get) => ({
  // ... (State Authentication cũ giữ nguyên) ...
  
  // State mới cho Progress
  progressCache: {}, // Structure: { weekId: { stationId: { data, isCompleted, score } } }

  // ACTIONS
  
  // 1. Load Data khi vào tuần học
  loadWeekProgress: async (weekId) => {
    // Nếu đã có cache tuần này thì không gọi API nữa (tiết kiệm request)
    if (get().progressCache[weekId]) return; 

    try {
      const data = await progressAPI.fetchWeekProgress(weekId);
      set((state) => ({
        progressCache: {
          ...state.progressCache,
          [weekId]: data
        }
      }));
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  },

  // 2. Update UI ngay lập tức (Optimistic)
  updateLocalProgress: (weekId, stationId, payload) => {
    set((state) => ({
      progressCache: {
        ...state.progressCache,
        [weekId]: {
          ...(state.progressCache[weekId] || {}),
          [stationId]: { ...payload, updatedAt: new Date().toISOString() }
        }
      }
    }));
  },

  // 3. Sync xuống Server (Background)
  syncProgressToServer: async ({ weekId, stationId, data, isCompleted, score }) => {
    try {
      await progressAPI.saveProgress({ weekId, stationId, data, isCompleted, score });
    } catch (error) {
      console.error("Failed to sync progress:", error);
      // Ở đây có thể thêm logic rollback nếu cần thiết
    }
  }
}));

export default useUserStore;
3. The "God Hook" (src/hooks/useStationProgress.js)
Đây là file QUAN TRỌNG NHẤT. Tạo mới file này. Nó chứa logic debounce để tránh spam server (ví dụ user kéo thanh video liên tục).

JavaScript

// FILE: src/hooks/useStationProgress.js
import { useEffect, useCallback, useRef } from 'react';
import useUserStore from '../stores/useUserStore';
import { debounce } from 'lodash'; // Cần: npm install lodash

/**
 * Hook quản lý tiến độ cho MỌI Station.
 * @param {number} weekId 
 * @param {string} stationId (phải khớp với danh sách ở Phần 4)
 */
export const useStationProgress = (weekId, stationId) => {
  const { 
    progressCache, 
    loadWeekProgress, 
    updateLocalProgress, 
    syncProgressToServer 
  } = useUserStore();

  // 1. Auto Load Data khi mount
  useEffect(() => {
    if (weekId) loadWeekProgress(weekId);
  }, [weekId, loadWeekProgress]);

  // 2. Lấy dữ liệu hiện tại từ Cache
  const stationState = progressCache[weekId]?.[stationId] || {};
  const savedData = stationState.data || {};
  const isCompleted = stationState.isCompleted || false;
  const savedScore = stationState.score || 0;

  // 3. Debounced Sync (Chỉ gọi API sau khi user ngừng thao tác 1.5s)
  const debouncedSync = useRef(
    debounce((wId, sId, data, completed, score) => {
      syncProgressToServer({ weekId: wId, stationId: sId, data, isCompleted: completed, score });
    }, 1500)
  ).current;

  // 4. Hàm Save chính (Dùng trong Component)
  const saveProgress = useCallback((partialData, completed = isCompleted, score = savedScore) => {
    if (!weekId || !stationId) return;

    // Merge data cũ với mới (để không mất các field khác)
    const newData = { ...savedData, ...partialData };
    
    // A. Cập nhật UI ngay
    updateLocalProgress(weekId, stationId, { data: newData, isCompleted: completed, score });
    
    // B. Đẩy vào hàng đợi sync server
    debouncedSync(weekId, stationId, newData, completed, score);
  }, [weekId, stationId, savedData, isCompleted, savedScore, updateLocalProgress, debouncedSync]);

  // 5. Hàm Finish nhanh (Dành cho nút "Hoàn thành")
  const markComplete = useCallback((finalScore = 100) => {
    saveProgress({}, true, finalScore);
  }, [saveProgress]);

  return {
    savedData,      // Object chứa dữ liệu đã lưu
    isCompleted,    // Boolean
    savedScore,     // Number
    saveProgress,   // Func: saveProgress({ key: val })
    markComplete    // Func: markComplete()
  };
};
PHẦN 4: CHI TIẾT TÍCH HỢP TỪNG STATION (20 MODULES)
Đây là phần hướng dẫn chi tiết cho Coder. Với mỗi file, tôi cung cấp stationId chuẩn và data schema cần lưu.

NHÓM 1: VIDEO & KHÁM PHÁ
1. Daily Watch

File: src/modules/watch/DailyWatch.jsx

Station ID: daily_watch

Schema: timestamp (float), duration (float), watchedPercent (int)

Cách dùng:

JavaScript

// Trong onProgress của Video Player
saveProgress({ timestamp: currentTime, watchedPercent: percent });
// Trong onEnded
markComplete();
2. Video Challenge

File: src/modules/video/VideoChallenge.jsx

Station ID: video_challenge

Schema: currentQuestionIndex (int), correctCount (int), answers (object: {q1: "A"})

Cách dùng:

JavaScript

// Khi trả lời câu hỏi
saveProgress({ answers: {...savedData.answers, [qId]: choice} });
3. Explore

File: src/modules/explore/Explore.jsx

Station ID: explore

Schema: visitedNodes (array of IDs), readArticles (array)

Cách dùng:

JavaScript

// Khi click vào một topic node
saveProgress({ visitedNodes: [...savedData.visitedNodes, nodeId] });
NHÓM 2: AI TUTOR (Thông minh)
4. Story Mission

File: src/modules/ai_tutor/tabs/StoryMissionTab.jsx

Station ID: ai_story

Schema: lastMissionId (int), completedMissions (array), turnCount (int)

Cách dùng:

JavaScript

// Khi AI trả lời xong
saveProgress({ turnCount: turnManager.totalTurns, lastMissionId: mission.id });
// Khi hoàn thành Mission
if (status === 'completed') markComplete();
5. Free Talk

File: src/modules/ai_tutor/tabs/FreeTalkTab.jsx

Station ID: ai_freetalk

Schema: totalTurns (int), vocabUsed (array)

Cách dùng:

JavaScript

// Mỗi lần user gửi tin nhắn
saveProgress({ totalTurns: savedData.totalTurns + 1 });
6. Pronunciation Tab

File: src/modules/ai_tutor/tabs/PronunciationTab.jsx

Station ID: ai_pronunciation

Schema: wordsPracticed (object: word -> score)

Cách dùng:

JavaScript

// Khi có kết quả chấm điểm
saveProgress({ wordsPracticed: { ...savedData.wordsPracticed, [word]: score } });
7. Ask AI

File: src/modules/ask_ai/AskAi.jsx

Station ID: ask_ai

Schema: interactionCount (int), lastQuery (string)

Cách dùng:

JavaScript

// Khi gửi câu hỏi
saveProgress({ interactionCount: (savedData.interactionCount || 0) + 1 }, true);
NHÓM 3: GAMES (Trò chơi)
8. Game Hub (Tổng hợp)

File: src/modules/games/GameHub.jsx

Station ID: game_hub

Schema: totalStars (int), unlockedGames (array)

9. Word Match

File: src/modules/match/WordMatch.jsx

Station ID: game_word_match

Schema: highScore (int), level (int)

Cách dùng:

JavaScript

// Khi thắng game
if (score > savedData.highScore) saveProgress({ highScore: score }, true, score);
10. Word Power

File: src/modules/power/WordPower.jsx

Station ID: game_word_power

Schema: batteryLevel (int), wordsCharged (array)

11. Logic Lab

File: src/modules/logic/LogicLab.jsx

Station ID: game_logic

Schema: puzzlesSolved (int), currentLevel (int)

12. Quiz / Match (Legacy)

File: src/modules/quiz/Quiz.jsx (Nếu có) hoặc match

Station ID: game_quiz

Schema: lastScore (int)

NHÓM 4: SKILLS (Kỹ năng)
13. Vocab Mastery

File: src/modules/vocab/VocabManager.jsx

Station ID: vocab_mastery

Schema: learnedWords (array), flashcardIndex (int)

Cách dùng:

JavaScript

// Khi lật thẻ flashcard
saveProgress({ flashcardIndex: currentIndex });
14. Grammar Engine

File: src/modules/grammar/GrammarEngine.jsx

Station ID: grammar_lab

Schema: completedDrills (array), score (int)

15. Dictation

File: src/modules/dictation/DictationEngine.jsx

Station ID: skill_dictation

Schema: correctSentences (int), totalSentences (int)

16. Reading

File: src/modules/read/ReadingExplore.jsx

Station ID: skill_reading

Schema: lastPage (int), isFinished (bool)

17. Shadowing

File: src/modules/shadowing/Shadowing.jsx

Station ID: skill_shadowing

Schema: recordedSegments (array of IDs)

18. Writing

File: src/modules/writing/Writing.jsx

Station ID: skill_writing

Schema: draft (string), isSubmitted (bool)

19. MindMap Speaking

File: src/modules/production/MindMapSpeaking.jsx

Station ID: production_mindmap

Schema: completedBranches (array), recordings (object: branchId -> url)

Cách dùng:

JavaScript

// Khi ghi âm xong 1 nhánh
const newCompleted = [...savedData.completedBranches, branchId];
saveProgress({ completedBranches: newCompleted });
if (newCompleted.length === totalBranches) markComplete();
NHÓM 5: KHÁC
20. Review Dashboard & Drill

File: src/modules/review/ReviewDashboard.jsx

Station ID: review_session

Schema: itemsReviewed (int), accuracy (int)

21. Self Regulation

File: src/modules/self_regulation/SelfRegulation.jsx

Station ID: self_regulation

Schema: mood (string), goalsChecked (array)

HƯỚNG DẪN COPY-PASTE CHO CODER
Quy trình thực hiện:

Chạy SQL tạo bảng (Phần 1).

Tạo file Backend mcp-server/routes/progress.js (Phần 2).

Cập nhật file src/services/api.js (Phần 3.1).

Cập nhật file src/stores/useUserStore.js (Phần 3.2).

Tạo file src/hooks/useStationProgress.js (Phần 3.3).

QUAN TRỌNG: Mở lần lượt 20 file component được liệt kê ở Phần 4.

Thêm dòng: import { useStationProgress } from 'path/to/hooks';

Thêm dòng: const { saveProgress, markComplete } = useStationProgress(weekId, 'STATION_ID_TUONG_UNG');

Gắn hàm saveProgress vào các sự kiện tương tác (click, type, finish).