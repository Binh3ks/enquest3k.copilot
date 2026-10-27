# KIẾN TRÚC HIỆN TẠI HỆ THỐNG ENGQUEST3K (W33+ GOLDEN STANDARD)
> **Tài liệu tham chiếu chuẩn xác minh từ mã nguồn thực tế (Code Truth)**  
> **Trạng thái**: Bản thảo kiến trúc chuẩn hóa — Cập nhật ngày 27/10/2026 (Đã qua Audit 3 Lớp C17). KHÔNG COMMIT cho tới khi Owner duyệt.

---

## 1. TỔNG QUAN HỆ THỐNG: 5 NGÀY = 5 ZONES = 15 QUESTS CHUẨN

Hệ thống EngQuest3K từ Tuần 33 trở đi hoạt động trên quy chuẩn **15 Quests / 5 Ngày học (5 Zones)**. Mỗi ngày học tương ứng đúng 3 Quests, dẫn dắt học sinh qua chu trình từ tiếp nhận cốt truyện, khám phá liên môn, luyện phản xạ chiến đấu, sáng tạo nội dung, đến chinh phục bài thi khảo thí Cambridge A2 Flyers.

### 1.1. BẢNG TRA CỨU 15 QUESTS / 5 ZONES CHI TIẾT (NGUYÊN VĂN TỪ CODE)
*Nguồn tham chiếu: [src/config/questSchedule.js:33-85](file:///Users/binhnguyen/projects/Engquest3k/src/config/questSchedule.js#L33-L85), [src/components/questmap/TaskScreen.jsx:45-70](file:///Users/binhnguyen/projects/Engquest3k/src/components/questmap/TaskScreen.jsx#L45-L70), [src/config/zoneDataMapper.js:40-120](file:///Users/binhnguyen/projects/Engquest3k/src/config/zoneDataMapper.js#L40-L120)*

| STT | Day / Zone | ID Nội Bộ | Tên Hiển Thị UI | Component Trực Tiếp | Data Hub Cung Cấp | Kỹ Năng Chính | Loại | XP Data (questSchedule) | XP Hiển Thị UI | Thời Lượng |
|:---:|---|---|---|---|---|---|---|:---:|:---:|:---:|
| **1** | **Day 1: Story World** | `gear1_webtoon` | **Scene Explorer** | `StoryWorldZone.jsx` (Gear 1: Webtoon) | `reading_hub.js` (`scenes`) | Reading, Visual Literacy | Practice | 0 XP (Milestone) | +50 XP (fallback) | 8 phút |
| **2** | **Day 1: Story World** | `gear2_karaoke` | **Voice Shadow** | `StoryWorldZone.jsx` (Gear 2: Karaoke) | `reading_hub.js` (`shadowingData.sentences`), `read.js` / `read_stem.mp3` | Speaking, Phonology | Practice | 0 XP (Milestone) | +50 XP (fallback) | 7 phút |
| **3** | **Day 1: Story World** | `gear3_retell` | **Story Retell** | `StoryWorldZone.jsx` (Gear 3: `RetellRecorder.jsx`) | `reading_hub.js` (`retell_questions`) | Speaking, Retelling | Practice | 50 XP | +50 XP | 8 phút |
| **4** | **Day 2: Knowledge Lab** | `gear4_clil` | **Fact Finder** | `KnowledgeLabZone.jsx` $\rightarrow$ `CLILExplorer.jsx` | `reading_hub.js` (`clil_article`) | CLIL, Reading, Vocab | Practice | 0 XP (Milestone) | +50 XP (hardcode) | 8 phút |
| **5** | **Day 2: Knowledge Lab** | `science_lab` | **Action Lab** | `KnowledgeLabZone.jsx` $\rightarrow$ `ScienceDragDropLab.jsx` | `skill_practice_hub.js` (`science_lab`) | Inquiry, Problem Solving | Practice | 50 XP | +50 XP (hardcode) | 6 phút |
| **6** | **Day 2: Knowledge Lab** | `science_report` | **Discovery Report** | `KnowledgeLabZone.jsx` $\rightarrow$ `ScienceReportCreator.jsx` | `reading_hub.js` (`clil_article`) | Writing, Critical Thinking | Practice | 50 XP | +50 XP (hardcode) | 7 phút |
| **7** | **Day 3: Battle Arena** | `word_blitz` | **Speed Match** | `BattleArenaZone.jsx` $\rightarrow$ `FlashArena.jsx` | `vocab.js` / `skill_practice_hub.js` (`flash_arena`) | Vocabulary Speed Recall | Practice | 45 XP | +45 XP | 5 phút |
| **8** | **Day 3: Battle Arena** | `sentence_smash` | **Grammar Duel** | `BattleArenaZone.jsx` $\rightarrow$ `SentenceBuilderBattle.jsx` | `skill_practice_hub.js` (`grammar_drills`) | Syntax, Grammar | Practice | 50 XP | +50 XP | 5 phút |
| **9** | **Day 3: Battle Arena** | `math_quest` | **Math Quest** | `BattleArenaZone.jsx` $\rightarrow$ `BarModelQuest.jsx` | `skill_practice_hub.js` (`singapore_math`) | Singapore Math, Visual Logic | Practice | 40 XP | +40 XP | 6 phút |
| **10** | **Day 4: Creator Studio** | `story_writer` | **Story Writer** | `CreatorStudioZone.jsx` $\rightarrow$ `StoryWriting.jsx` | `writing_hub.js` (`picture_story`, `word_bank_pills`) | Creative Writing (P7) | Practice | 50 XP | +50 XP | 10 phút |
| **11** | **Day 4: Creator Studio** | `broadcast_studio` | **Video Challenge** | `CreatorStudioZone.jsx` $\rightarrow$ `BroadcastStudio.jsx` | `speaking_hub.js` (`talkshow_video`, `dialogue_lines`) | Presentation, Speaking | Practice | 50 XP | +50 XP | 7 phút |
| **12** | **Day 4: Creator Studio** | `info_exchange` | **Info Exchange** | `InfoExchangeZone.jsx` $\rightarrow$ `InformationExchangeP2.jsx` | `speaking_hub.js` (`info_exchange_cards`) | Interactive Speaking (S2) | Practice | 20 XP | +20 XP | 7 phút |
| **13** | **Day 5: Boss Castle** | `boss_listening` | **Listening Shield** | `BossBattleZone.jsx` (`listening_boss` P1–P5) | `listening_hub.js` (`listening_p1..p5`) | Cambridge Listening (5 Shields) | Assessment | 0 XP (Milestone) | 5 Shields | 10 phút |
| **14** | **Day 5: Boss Castle** | `boss_reading` | **Reading & Writing Shield** | `BossBattleZone.jsx` (`rw_boss` P1–P6) | `reading_hub.js` / `writing_hub.js` (`rw_part_1..6`) | Cambridge R&W (5 Shields) | Assessment | 0 XP (Milestone) | 5 Shields | 10 phút |
| **15** | **Day 5: Boss Castle** | `weekly_review` | **Speaking & Passport** | `BossBattleZone.jsx` (`review` S1–S4 + Passport) | `speaking_hub.js` (`find_differences`, `info_exchange`, `picture_story`, `personal_qs`) | Cambridge Speaking + Certification | Assessment | 0 XP (Milestone) | 5 Shields + Cert | 15 phút |

### 1.2. Giải Trình Lệch Pha XP Giữa Data Model và UI
1. **Trong Data Model (`src/config/questSchedule.js:36, 37, 45, 72, 73, 74`)**:
   - 6 Quests gồm `gear1_webtoon`, `gear2_karaoke`, `gear4_clil`, `boss_listening`, `boss_reading`, `weekly_review` được khai báo:
     `xp: 0, isMilestone: true`
   - **Lý do**: Đây là các nhiệm vụ cột mốc (Milestones). Trong thiết kế gamification gốc, các nhiệm vụ này trao tặng danh hiệu/khiên khảo thí (Shields) thay vì điểm XP số học thông thường.
2. **Trong Giao Diện Người Dùng (UI Runtime)**:
   - Tại [src/components/questmap/TaskScreen.jsx:224](file:///Users/binhnguyen/projects/Engquest3k/src/components/questmap/TaskScreen.jsx#L224):
     `const questXp = currentQuest?.xp || 50;`
     Do `0` là falsy value trong JavaScript, `questXp` tự động nhận giá trị fallback là `50`.
   - Tại [src/components/questmap/QuestMap3D.jsx:627](file:///Users/binhnguyen/projects/Engquest3k/src/components/questmap/QuestMap3D.jsx#L627):
     `+{quest.xp || 50} XP`
   - Tại các nút bấm hoàn thành nhiệm vụ:
     - [src/components/cambridge/CLILExplorer.jsx:324](file:///Users/binhnguyen/projects/Engquest3k/src/components/cambridge/CLILExplorer.jsx#L324): Nút bấm hiển thị tĩnh `✓ Finish Quest & Return to Map (+50 XP)`.
     - [src/components/cambridge/ScienceDragDropLab.jsx:450](file:///Users/binhnguyen/projects/Engquest3k/src/components/cambridge/ScienceDragDropLab.jsx#L450): Nút bấm hiển thị tĩnh `✓ Return to Map (+50 XP)`.
     - [src/components/cambridge/ScienceReportCreator.jsx:280](file:///Users/binhnguyen/projects/Engquest3k/src/components/cambridge/ScienceReportCreator.jsx#L280): Nút bấm hiển thị tĩnh `✓ Hoàn Thành (+50 XP)`.
3. **Chuẩn Hóa Đề Xuất**:
   - Cần thống nhất trường `xp` trong `questSchedule.js`: Nếu UI trao 50 XP thì gán `xp: 50` trực tiếp trong data model để loại bỏ biểu thức fallback `quest.xp || 50`. Với Day 5 Boss Castle, hiển thị rõ "5 Khiên" thay vì điểm XP.

---

## 2. QUAN HỆ NGÀY (DAY) — TRẠM (STATION) — VÙNG (ZONE) & CƠ CHẾ KHÓA

### 2.1. Bản Đồ Điều Hướng Trên UI Production
- Trên UI production (`/week/:weekId/hub/1`), bản đồ học tập hiển thị theo **5 Ngày (Day 1 $\rightarrow$ Day 5)** tương ứng **5 Trạm (Station 1 $\rightarrow$ Station 5)**.
- Khi click vào bất kỳ Quest nào, router chuyển sang `/week/:weekId/task/:taskId`.
- Tại [src/components/questmap/TaskScreen.jsx:45-70](file:///Users/binhnguyen/projects/Engquest3k/src/components/questmap/TaskScreen.jsx#L45-L70), `TASK_ROUTING` ánh xạ `taskId` vào container tương ứng:
  - `gear1_webtoon`, `gear2_karaoke`, `gear3_retell` $\rightarrow$ `StoryWorldZone` (Zone 1)
  - `gear4_clil`, `science_lab`, `science_report` $\rightarrow$ `KnowledgeLabZone` (Zone 2)
  - `word_blitz`, `sentence_smash`, `math_quest` $\rightarrow$ `BattleArenaZone` (Zone 3)
  - `story_writer`, `broadcast_studio` $\rightarrow$ `CreatorStudioZone` (Zone 4)
  - `info_exchange` $\rightarrow$ `InfoExchangeZone` (Zone 4)
  - `boss_listening`, `boss_reading`, `weekly_review` $\rightarrow$ `BossBattleZone` (Zone 5)

### 2.2. Cơ Chế Khóa Tuần Tự (Sequential Locking Rules)
1. **Khóa Tuần Tự Trong Ngày (Intra-Day Soft Guide)**:
   - *Code nguồn*: [src/components/questmap/QuestMap3D.jsx:602-635](file:///Users/binhnguyen/projects/Engquest3k/src/components/questmap/QuestMap3D.jsx#L602-L635)
   - Trong drawer của từng ngày:
     - Quest chưa hoàn thành đầu tiên được đánh dấu `isNextUp = true` $\rightarrow$ Nút bấm đổi sang màu hổ phách, chữ `Start ▶`, có hiệu ứng nhấp nháy `animate-pulse` ("▶ Do this next!").
     - Các quest tiếp theo sau quest đó được đánh dấu `isWaiting = true` $\rightarrow$ Hiển thị nhãn `✦ Available after above` kèm nút xám `Next up`.
     - **Bản chất kỹ thuật**: Đây là **Soft Guide** (hướng dẫn sư phạm mềm dẻo). Học sinh vẫn có thể click vào quest đang waiting để học nếu muốn, không bị chặn cứng sự kiện click.
2. **Khóa Cứng Giữa Các Ngày (Inter-Day Hard Gate)**:
   - *Code nguồn*: [src/stores/useDailyQuestStore.js:254-260](file:///Users/binhnguyen/projects/Engquest3k/src/stores/useDailyQuestStore.js#L254-L260)
     ```javascript
     isDayUnlocked: (weekId, dayIndex, teacherOverride = false) => {
       if (teacherOverride) return true;
       if (dayIndex <= 0) return true;
       const prevDayConfig = QUEST_SCHEDULE[dayIndex - 1];
       if (!prevDayConfig) return true;
       return prevDayConfig.quests.every((q) => get().isQuestCompleted(weekId, q.id));
     }
     ```
   - **Quy tắc cứng**: Ngày học $N$ ($N \ge 2$) CHỈ ĐƯỢC MỞ khi học sinh đã hoàn thành **ĐỦ CẢ 3 QUESTS** của Ngày $N-1$ (`prevDayConfig.quests.every(...)`).
   - **Quy tắc ngoại lệ (Bypass)**: Cơ chế khóa ngày tự động mở khóa nếu `teacherOverride = true`.
     Tại [src/components/questmap/QuestMap3D.jsx:198-204](file:///Users/binhnguyen/projects/Engquest3k/src/components/questmap/QuestMap3D.jsx#L198-L204), các vai trò thuộc `BYPASS_ROLES` (`super_admin`, `admin`, `teacher`, `team_leader`, `center_director`) hoặc người nhập mã PIN phụ huynh sẽ được gán `teacherOverride = true` và truy cập tự do toàn bộ 5 Ngày học.
3. **Tiêu Chí Đánh Dấu "Hoàn Thành" Quest (`isQuestCompleted`) & Phạm Vi Bằng Chứng**:
   - *Đã xác nhận có bằng chứng mã nguồn*: Quest 3 `gear3_retell` (Story Retell) tại [StoryWorldZone.jsx:1700-1708](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/StoryWorldZone.jsx#L1700-L1708) xác nhận **không có ngưỡng điểm chặn cứng** (zero hard score threshold). Học sinh bấm lần lượt qua 5 câu hỏi và nhấn `Complete Retell ▶` là quest được ghi nhận hoàn thành và mở khóa, bất kể điểm STT micro là bao nhiêu (có hỗ trợ ô gõ phím `MicFallbackInput`). Trẻ 6–12 tuổi hoàn toàn không có nguy cơ bị kẹt ở Ngày 1 vì lý do phát âm hay mic lỗi.
   - *Xác nhận mở rộng trên Quest Assessment*: Kiểm tra trực tiếp Quest 13 `boss_listening` (Part 1 SVGLineMatcher tại [SVGLineMatcher.jsx:136-139](file:///Users/binhnguyen/projects/Engquest3k/src/components/cambridge/SVGLineMatcher.jsx#L136-L139)) cũng cho thấy `onComplete(finalScore)` được gọi ngay khi bấm `Check` để nộp bài, kích hoạt `handleTaskComplete` và ghi nhận hoàn thành part mà không bị chặn bởi ngưỡng điểm tối thiểu.
   - *Phạm vi bằng chứng (Caveat)*: Kết luận trên được xác nhận cụ thể cho `gear3_retell` và `boss_listening`. Chưa kiểm tra mã nguồn tương tự cho 13 quest còn lại (đặc biệt `boss_reading`, `weekly_review`). Điều này sẽ được kiểm toán thêm khi đi sâu vào từng zone, nhưng không cản trở việc thực thi Gói 003A.

### 2.3. Ánh Xạ Cambridge Part $\rightarrow$ Khiên Khảo Thí (6 Parts R&W = 5 Khiên; 3 Paper Cùng Chung Logic)
1. **Quy Chuẩn Khảo Thí Cambridge Young Learners English (Flyers)**:
   - Bài thi Cambridge Flyers chính thức chia thành 3 bài thi kỹ năng độc lập:
     - **Listening Paper**: 5 Parts $\rightarrow$ Tối đa **5 Khiên (Shields)**.
     - **Reading & Writing Paper**: 6 Parts $\rightarrow$ Tối đa **5 Khiên (Shields)**.
     - **Speaking Paper**: 4 Parts $\rightarrow$ Tối đa **5 Khiên (Shields)**.
   - Tổng cộng toàn bộ chứng chỉ Cambridge Flyers tối đa là **15 Khiên**.
2. **Mã Nguồn Tính Khiên Thật Trong `MockAssessmentEngine.js` (Xác Nhận 3 Papers Cùng Chung Logic)**:
   - *Code nguồn*: [src/services/assessment/MockAssessmentEngine.js:44-98](file:///Users/binhnguyen/projects/Engquest3k/src/services/assessment/MockAssessmentEngine.js#L44-L98)
   
   - **Paper 1: Reading & Writing** (Dòng 44–45):
     ```javascript
     44:   const rwPct = Math.round((rwCorrect / rwTotal) * 100);
     45:   const rwShields = Math.min(5, Math.max(1, Math.round((rwPct / 100) * 5)));
     ```
   - **Paper 2: Listening** (Dòng 76–77):
     ```javascript
     76:   const listenPct = Math.round((listenCorrect / listenTotal) * 100);
     77:   const listenShields = Math.min(5, Math.max(1, Math.round((listenPct / 100) * 5)));
     ```
   - **Paper 3: Speaking** (Dòng 88):
     ```javascript
     88:   const speakingShields = Math.min(5, Math.max(1, Math.round((speakingScorePct / 100) * 5)));
     ```
   - **Tổng Điểm Toàn Bài Boss Castle** (Dòng 98):
     ```javascript
     98:   const totalShieldsEarned = rwShields + listenShields + speakingShields;
     ```
   - **Kết Luận Kiểm Toán**:
     Cả 3 kỹ năng đều sử dụng **CHÍNH XÁC CÙNG MỘT CÔNG THỨC TOÁN HỌC VÀ LOGIC LÀM TRÒN**:
     $$\text{Shields} = \min\left(5, \max\left(1, \text{round}\left(\frac{\text{ScorePct}}{100} \times 5\right)\right)\right)$$
     - Điểm tối thiểu luôn là **1 Khiên** (Cambridge khích lệ sự tham gia, không bao giờ cho 0 khiên).
     - Điểm tối đa là **5 Khiên**.
     - Hàm làm tròn `Math.round` chia đều dải điểm $0\% \dots 100\%$ vào 5 nấc khiên.
     - 6 Parts của bài Reading & Writing được gộp thành tổng số câu đúng `rwCorrect` trên tổng số câu hỏi `rwTotal` để tính ra `rwPct`, từ đó quy về thang 5 Khiên.
   - Tại [src/modules/zones/BossBattleZone.jsx:401](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/BossBattleZone.jsx#L401):
     Hiển thị UI chuẩn: `{mockPaperScores.shields?.rwShields ?? 5}/5`.

---

## 3. KIẾN TRÚC DỮ LIỆU: CÁC DATA HUBS VÀ PHÂN BỔ NHIỆM VỤ

*Tham chiếu: [src/config/zoneDataMapper.js:15-125](file:///Users/binhnguyen/projects/Engquest3k/src/config/zoneDataMapper.js#L15-L125)*

### 3.1. Các File Data Cung Cấp Cho 15 Quests
1. **`reading_hub.js`**:
   - `scenes`: Cung cấp hình ảnh, hội thoại và hotspots cho Quest 1 (**Scene Explorer**).
   - `shadowingData.sentences`: Cung cấp 8 câu nhại giọng cho Quest 2 (**Voice Shadow**).
   - `retell_questions`: Cung cấp 5 câu hỏi tóm tắt cho Quest 3 (**Story Retell**).
   - `clil_article`: Cung cấp bài đọc và từ vựng mở rộng cho Quest 4 (**Fact Finder**) và Quest 6 (**Discovery Report**).
   - `rw_part_1`, `rw_part_2`, `rw_part_3`, `rw_part_4`, `rw_part_5`: Cung cấp bài tập đọc hiểu cho Quest 14 (**Reading & Writing Shield**).
2. **`listening_hub.js`**:
   - `listening_p1`: Cambridge Part 1 (Draw the lines) cho Quest 13 (**Listening Shield**).
   - `listening_p2`: Cambridge Part 2 (Note completion) cho Quest 13.
   - `listening_p3`: Cambridge Part 3 (Visual matching) cho Quest 13.
   - `listening_p4`: Cambridge Part 4 (Multiple choice 3 pictures) cho Quest 13.
   - `listening_p5`: Cambridge Part 5 (Color and write) cho Quest 13.
3. **`writing_hub.js`**:
   - `picture_story`, `word_bank_pills`, `sentence_frames`: Cung cấp ảnh 3 cảnh và gợi ý cho Quest 10 (**Story Writer**).
   - `rw_part_6`: Cung cấp bài viết Cambridge Part 6 cho Quest 14 (**Reading & Writing Shield**).
4. **`speaking_hub.js`**:
   - `talkshow_video`, `dialogue_lines`: Cung cấp video và kịch bản cho Quest 11 (**Video Challenge**).
   - `info_exchange_cards`: Cung cấp thẻ hỏi đáp cho Quest 12 (**Info Exchange**) và Quest 15 Part 2.
   - `find_differences`: Cung cấp cặp tranh A/B cho Quest 15 Part 1 (**Speaking & Passport**).
   - `picture_story`: Cung cấp tranh kể chuyện 4 cảnh cho Quest 15 Part 3.
   - `personal_questions`: Cung cấp câu hỏi đời thường cho Quest 15 Part 4.
5. **`skill_practice_hub.js`**:
   - `science_lab`: Cung cấp 3 kịch bản tương tác vật lý/khoa học cho Quest 5 (**Action Lab**).
   - `flash_arena`: Cung cấp các bộ thẻ từ vựng phản xạ cho Quest 7 (**Speed Match**).
   - `grammar_drills`: Cung cấp các câu lắp ráp cú pháp cho Quest 8 (**Grammar Duel**).
   - `singapore_math`: Cung cấp 5 bài toán thanh Bar Model cho Quest 9 (**Math Quest**).
6. **`vocab.js`**:
   - Cung cấp danh mục 20-23 từ vựng mục tiêu tuần kèm định nghĩa, IPA, ví dụ dùng cho `FlashArena` và hệ thống ôn tập Spaced Repetition (SRS).

### 3.2. Vai Trò Thực Tế Của `read.js` và `read_stem.mp3`
1. **Nơi Import / Tham Chiếu Trong Mã Nguồn**:
   - Tại Tuần 33: [src/data/weeks/week_33/reading_hub.js:6](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/reading_hub.js#L6) thực hiện:
     `import read_explore from './read.js';`
     và [src/data/weeks/week_33/index.js:2](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_33/index.js#L2) export `read_explore`.
   - Tại Tuần 34: [src/data/weeks/week_34/index.js:2](file:///Users/binhnguyen/projects/Engquest3k/src/data/weeks/week_34/index.js#L2) vẫn import `read.js`.
2. **Ai Sinh `read_stem.mp3`**:
   - Script [scripts/generate_week_audio_universal.mjs:189-193](file:///Users/binhnguyen/projects/Engquest3k/scripts/generate_week_audio_universal.mjs#L189-L193) đọc text từ `readMod.text_en` hoặc `readMod.text` và gọi Google Cloud TTS sinh ra `read_stem.mp3`.
3. **`read_stem.mp3` Phục Vụ Quest Nào**:
   - Tại [src/modules/zones/StoryWorldZone.jsx:443](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/StoryWorldZone.jsx#L443):
     `const fullAudioUrl = readExplore?.audio_url || `/audio/week${activeWeek || 33}/read_stem.mp3`;`
     File này phục vụ nút **"Full Audio"** trong Quest 2 (**Voice Shadow**), cho phép học sinh nghe toàn bộ bài đọc truyện.
   - **Kết luận**: File audio `read_stem.mp3` **ĐANG ĐƯỢC DÙNG THỰC TẾ** ở Quest 2. File dữ liệu `read.js` là nguồn cấp dữ liệu cho `read_stem.mp3` và vẫn được import bởi `reading_hub.js` (W33) và `index.js` (W34). Do đó, `read.js` KHÔNG PHẢI là file chết có thể tự tiện xóa bỏ mà phải được tái cấu trúc đồng bộ qua amendment.

---

## 4. QUY CHUẨN ÂM THANH (AUDIO SUBSYSTEM) VÀ KIỂM KÊ 15 QUESTS

### 4.1. Nguyên Tắc Âm Thanh Bắt Buộc (Owner Decisions Locked)
1. **Âm thanh bài học bắt buộc là file vật lý MP3 tĩnh**:
   - 100% audio nội dung bài học (Story scenes, Voice Shadowing, CLIL, Discovery hotspots, Flash Arena vocab, Cambridge Listening P1–P5, Cambridge Speaking Intros, Model dialogue) BẮT BUỘC phải tồn tại dưới dạng file vật lý `.mp3` tại `public/audio/week{N}/`.
2. **Cấm dùng Google TTS làm fallback cho bài học**:
   - Google TTS Direct runtime CHỈ ĐƯỢC PHÉP kích hoạt cho nội dung động do chính học sinh gõ trên bàn phím (dynamic user-generated text).
   - **Cổng chặn Gate 15 / Gate Firewall**: Bất kỳ request nào tới Google Cloud TTS API (`texttospeech.googleapis.com`) trong quá trình thực hiện 15 Quests đều bị đánh trượt (**FAIL**).
3. **Quy tắc bắt buộc truyền `weekNumber` (Forbidden Fallbacks)**:
   - Nghiêm cấm tuyệt đối mọi hình thức fallback tĩnh dạng `weekNumber || 33` hoặc `activeWeek || 33`.
   - Mọi component dùng chung (`InformationExchangeP2`, `InfoExchangeZone`, `CLILExplorer`, `ScienceReportCreator`, `ExamIntroAudioButton`, `VisualMatchingAH`, `MultipleChoice3Pic`, `StoryWorldZone`) BẮT BUỘC phải nhận prop `weekNumber` rõ ràng. Nếu thiếu `weekNumber`, component PHẢI throw error hoặc ghi log cảnh báo thay vì âm thầm phát âm thanh của Tuần 33.

### 4.2. Kiểm Kê Danh Mục Audio Chi Tiết Theo Từng Quest (W34 Standard)
*Reconcile: 73 file vật lý = 43 Đang dùng & khớp + 8 Đang dùng nhưng kịch bản lệch + 4 Bỏ rơi do data trỏ sai + 5 Exam intro chưa map + 13 Legacy cần dọn dẹp.*
*(Giải trình số liệu: Bản thảo trước ghi nhầm "51" do gộp $43 + 8 = 51$ tổng số file active trong 15 quests vào vị trí của nhóm 1. Con số chính xác của nhóm 1 là **43**).*

#### A. Danh Mục File Theo 15 Quests (Cần Có Cho Học Tập)
1. **Quest 1: Scene Explorer (`gear1_webtoon`)**:
   - `scene_1.mp3` $\dots$ `scene_5.mp3` (5 files — *hiện đang thiếu, cần sinh*).
2. **Quest 2: Voice Shadow (`gear2_karaoke`)**:
   - `shadowing_1.mp3` $\dots$ `shadowing_8.mp3` (8 files — *đã có*).
   - `read_stem.mp3` (1 file — *phục vụ nút "Full Audio", đã có*).
3. **Quest 3: Story Retell (`gear3_retell`)**:
   - Sử dụng STT microphone của học sinh và model giọng Nova.
4. **Quest 4: Fact Finder (`gear4_clil`)**:
   - `explore.mp3` (1 file — *đã có*).
5. **Quest 5: Action Lab (`science_lab`)**:
   - Tương tác kéo thả thí nghiệm khoa học, sound effects FX.
6. **Quest 6: Discovery Report (`science_report`)**:
   - `discovery_hotspot_1.mp3` $\dots$ `discovery_hotspot_3.mp3` (3 files — *hiện đang thiếu, cần sinh*).
7. **Quest 7: Speed Match (`word_blitz`)**:
   - `vocab_*.mp3` (23 files mục tiêu tuần — *đã có*).
8. **Quest 8: Grammar Duel (`sentence_smash`)**:
   - Kéo thả ghép câu cú pháp, không sử dụng audio thoại.
9. **Quest 9: Math Quest (`math_quest`)**:
   - Toán tư duy thanh Bar Model, sound effects FX.
10. **Quest 10: Story Writer (`story_writer`)**:
    - Sáng tác viết truyện 3 cảnh, TTS hỗ trợ đọc chữ học sinh gõ.
11. **Quest 11: Video Challenge (`broadcast_studio`)**:
    - Video thử thách thuyết trình đa phương tiện.
12. **Quest 12: Info Exchange (`info_exchange`)**:
    - `ie_examiner_q1.mp3` $\dots$ `ie_examiner_q3.mp3` (3 files giám khảo hỏi — *cần sửa data trỏ đúng*).
    - `info_exchange_a1_model.mp3` $\dots$ `info_exchange_a4_model.mp3` (4 files câu hỏi mẫu — *cần sinh*).
13. **Quest 13: Listening Shield (`boss_listening`)**:
    - Part 1: `listening_p1_full.mp3` (1 file — *sửa audio có Sammy*).
    - Part 2: `listening_p2_full.mp3` (1 file — *sửa bỏ nhãn Student*).
    - Part 3: `listening_p3_full.mp3` + `listening_p3_item1.mp3` $\dots$ `listening_p3_item5.mp3` (6 files — *sửa audio theo đồ vật*).
    - Part 4: `listening_p4_example.mp3` + `listening_p4_q1.mp3` $\dots$ `listening_p4_q5.mp3` (6 files — *cắt ví dụ q1, sửa q4/q5*).
    - Part 5: `listening_p5_full.mp3` (1 file — *thu lại theo kịch bản chuẩn NET/brown/FOREST/dark green*).
14. **Quest 14: Reading & Writing Shield (`boss_reading`)**:
    - Bài thi Đọc - Viết 6 Parts, không yêu cầu audio bài nghe.
15. **Quest 15: Speaking & Passport (`weekly_review`)**:
    - `exam_intro_S1.mp3` $\dots$ `exam_intro_S4.mp3` (4 files lời dẫn giám khảo cho 4 phần thi Speaking).

#### B. Phân Loại Toàn Bộ 73 File Vật Lý Hiện Có Trong `public/audio/week34/`
1. **Đang Dùng & Khớp (43 files)**:
   - `shadowing_1..8.mp3` (8 files)
   - `explore.mp3` (1 file)
   - `read_stem.mp3` (1 file)
   - `vocab_*.mp3` (23 files)
   - `listening_p1_full.mp3`, `listening_p2_full.mp3`, `listening_p3_full.mp3`, `listening_p4_example.mp3`, `listening_p4_q2.mp3`, `listening_p4_q3.mp3`, `listening_p5_full.mp3` (7 files)
   - `exam_intro_S2.mp3` $\dots$ `exam_intro_S4.mp3` (3 files)
2. **Đang Dùng Nhưng Kịch Bản Lệch (8 files — cần thu lại)**:
   - `listening_p3_item1.mp3` $\dots$ `listening_p3_item5.mp3` (5 files — lệch đồ vật vs động vật)
   - `listening_p4_q1.mp3` (dính ví dụ), `listening_p4_q4.mp3`, `listening_p4_q5.mp3` (3 files — lệch sang CLIL)
3. **Bị Bỏ Rơi Do Data Trỏ Sai (4 files — cần sửa data trỏ lại)**:
   - `ie_examiner_q1.mp3` $\dots$ `ie_examiner_q3.mp3` (3 files — data trỏ nhầm sang `exam_intro_S2..S4`)
   - `exam_intro_S1.mp3` (1 file — data speaking_hub thiếu trường examiner_intro)
4. **Lời Dẫn Khảo Thí Chưa Được Ánh Xạ (5 files)**:
   - `exam_intro_L1.mp3` $\dots$ `exam_intro_L5.mp3` (5 files — lời dẫn Cambridge Listening P1-P5)
5. **Legacy Thật Cần Dọn Dẹp (13 files)**:
   - `dictation_1.mp3` $\dots$ `dictation_8.mp3` (8 files — tàn dư kiến trúc Dictation đã xóa)
   - `listening_p5_inst1.mp3` $\dots$ `listening_p5_inst5.mp3` (5 files — tàn dư instruction rời cũ)
*Phương trình cân bằng*: $43 + 8 + 4 + 5 + 13 = 73$ physical files.
