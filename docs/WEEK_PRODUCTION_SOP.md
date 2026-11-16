# 🏭 ENGQUEST3K — WEEK PRODUCTION SOP (STANDARD OPERATING PROCEDURE)
**Document Reference**: `docs/agent_artifacts/sop_draft/WEEK_PRODUCTION_SOP_v2.4.0_DRAFT.md`  
**Version**: 2.4.0 (Release Candidate — Profile-Based Asset Contract, Data-Driven Gate & 3-Layer Mass Production)  
**Governing Documents**: AGENTS.md, docs/ARCHITECTURE_CURRENT.md, docs/MASTER_ARCHITECTURE_W01_W156.md  
**Effective Date**: 2026-11-15 (RELEASE CANDIDATE)  
**Status**: 🟠 **RELEASE CANDIDATE — Chờ Owner và Claude QA phê duyệt chính thức (CẤM SỬA CANONICAL CHO ĐẾN KHI KÝ DUYỆT)**

---

## 📑 MỤC LỤC 3 LỚP KIẾN TRÚC SOP

### LỚP 1: HIẾN PHÁP SƯ PHẠM & BẤT BIẾN KỸ THUẬT (PEDAGOGICAL CONSTITUTION & TECHNICAL INVARIANTS)
- §1. Bất biến 15 Quests / 5 Zones / 5 Ngày (W17–W156) & Ngoại lệ Lite Mode (W01–W16)
- §2. Bất biến 4 Data Hubs Tập Trung per Week
- §3. Quy chuẩn Danh pháp & Sư phạm CLIL
- §4. Bất biến Giàn giáo Sư phạm Story Retell (Scaffolding Invariant)
- §5. Bất biến Kịch bản Thực nghiệm Action Lab (3-Scenario Invariant)
- §6. Zero Fallback & Forbidden Defaults
- §7. Universal Progress Persistence & Return-to-Map Navigation Standards (W01–W156)
- §8. Audio Fallback Hierarchy & Fail-Loud Doctrine
- §9. Mock Exam Cadence (34 Checkpoints Interpolated)
- §10. Story Writer Dual Standard
- §11. 5-Feature Data Contracts (v2.0.0 — 2026-09-05)

### LỚP 2: HỢP ĐỒNG TÀI SẢN THEO PROFILE (PROFILE-BASED QUEST ASSET CONTRACT)
- §12. Ma trận 6 Profiles Khảo thí & Năng lực (v2.2.0)
- §13. Phân tầng Tài sản Truyền thông: Core vs Extended Assets
- §14. Bảng Đặc tả Hợp đồng Tài sản 15 Quests theo Profile (15 Quests x 6 Profiles)
- §15. [SUSPENDED & ABOLISHED ARCHITECTURE — DANH MỤC KIẾN TRÚC TẠM DỪNG & ĐÃ KHAI TỬ] (Super Leo Chronicles [SUSPENDED], Dictation [ABOLISHED], 20 Vocab / vocab_*.mp3 [ABOLISHED], Flash Arena Vocab [ABOLISHED])

### LỚP 3: QUY TRÌNH SẢN XUẤT TUẦN HÀNG LOẠT (MASS PRODUCTION WORKFLOW)
- §16. Nguyên Tắc Nộp Bài & Kiểm Toán Bằng Chứng (Rule 0 Compliance)
- §17. Multi-Agent Review Protocol & Verification Checklist
- §18. Quy Tắc Nhóm Sản Xuất (Batch Production Rules)
- §19. Quy Trình PILOT Tiên Phong (Bắt Buộc Cho Profile Mới)
- §20. Pipeline Sản Xuất Tuần Chuẩn Hóa (7 Bước Tuần Tự)
- §21. Hệ Thống Quality Gates Tự Động, Gate 15 Spec-Based Runner & Danh Mục Việc Chặn Mass Production
- §22. Quản Lý Dung Lượng & Contact Sheet Mỹ Thuật
- §23. Quy Trình Quản Trị Thay Đổi (Governance Change Control)

---
# LỚP 1: HIẾN PHÁP SƯ PHẠM & BẤT BIẾN KỸ THUẬT

### §1. Bất biến 15 Quests / 5 Zones / 5 Ngày (W17–W156) & Ngoại lệ Lite Mode (W01–W16)
- **15 Quests Tiêu chuẩn**: Từ Tuần 17 trở đi, hệ thống vận hành cố định trên **15 Quests phân bổ đều qua 5 Ngày học = 5 Zones** (mỗi ngày đúng 3 Quests). Loại bỏ hoàn toàn khái niệm Station rời rạc.
  - **Day 1 (Zone 1 — Story World)**: `gear1_webtoon` (Scene Explorer), `gear2_karaoke` (Voice Shadow), `gear3_retell` (Story Retell).
  - **Day 2 (Zone 2 — Knowledge Lab)**: `gear4_clil` (Fact Finder), `science_lab` (Action Lab), `science_report` (Discovery Report).
  - **Day 3 (Zone 3 — Battle Arena)**: `word_blitz` (Speed Match), `sentence_smash` (Grammar Duel), `math_quest` (Math Quest).
  - **Day 4 (Zone 4 — Creator Studio)**: `story_writer` (Story Writer), `broadcast_studio` (Video Challenge), `info_exchange` (Info Exchange).
  - **Day 5 (Zone 5 — Boss Castle)**: `boss_listening` (Listening Shield), `boss_reading` (Reading & Writing Shield), `weekly_review` (Speaking & Passport).
- **⚠️ Lite Mode Exception (W01–W16)**: Tuần 01–16 (Pre-A1 Starters, trẻ 6–7 tuổi) hoạt động ở chế độ **10 Quests / 5 Zones (2 Quests/Day)** do giới hạn attention span. 5 quests giản lược: `gear3_retell` → tích hợp vào `gear2_karaoke`, `science_report` → Draw & Say, `math_quest` → Count & Match, `broadcast_studio` → Listen & Repeat, `boss_reading` → tích hợp vào `boss_listening` (*Dẫn chứng: docs/MASTER_ARCHITECTURE_W01_W156.md:56, 250-284*).

### §2. Bất biến 4 Data Hubs Tập Trung per Week
- Dữ liệu mỗi tuần BẮT BUỘC lưu trữ tập trung tại đúng 4 Hubs:
  - `reading_hub.js`: Cung cấp dữ liệu cho Zone 1, Zone 2, Zone 5 (Scene Explorer, Voice Shadow, Story Retell, Fact Finder, Reading Shield).
  - `listening_hub.js`: Cung cấp dữ liệu cho Zone 2, Zone 3, Zone 5 (Action Lab, Speed Match, Grammar Duel, Math Quest, Listening Shield).
  - `writing_hub.js`: Cung cấp dữ liệu cho Zone 4, Zone 5 (Story Writer, Reading & Writing Shield).
  - `speaking_hub.js`: Cung cấp dữ liệu cho Zone 4, Zone 5 (Video Challenge, Info Exchange, Speaking & Passport).
- CẤM TUYỆT ĐỐI tạo mới hoặc phụ thuộc vào các file rác cũ như `explore.js`, `logic_lab.js`, `daily_watch.js`, [ABOLISHED] `dictation.js` như một nguồn dữ liệu độc lập (*Dẫn chứng: AGENTS.md:120-128*).

### §3. Quy chuẩn Danh pháp & Sư phạm CLIL
- **`science_lab` BẮT BUỘC hiển thị là `Action Lab`**: CLIL bao hàm Khoa học, Xã hội, Địa lý, Lịch sử và Kỹ năng thực nghiệm giải quyết vấn đề. CẤM hiển thị nhầm thành `Science Lab` (*Dẫn chứng: AGENTS.md:138*).
- **`science_report` BẮT BUỘC hiển thị là `Discovery Report`**: Đúc kết phát hiện thực tế sau quá trình điều tra của Thám tử Khám phá (Discovery Detective) (*Dẫn chứng: AGENTS.md:139*).
- **`sentence_smash` BẮT BUỘC hiển thị là `Grammar Duel`**: Đấu trường ngữ pháp, sắp xếp trật tự câu.
- **`math_quest` BẮT BUỘC hiển thị là `Math Quest`**: Toán tư duy & Bar Models Singapore.
- **`broadcast_studio` BẮT BUỘC hiển thị là `Video Challenge`**: Thử thách thuyết trình / quay video.

### §4. Bất biến Giàn giáo Sư phạm Story Retell (Scaffolding Invariant)
- **`full` (Maximum Scaffolding)**: Hiển thị 100% câu mẫu kèm nút nghe audio mẫu. Dành cho học sinh cần mô hình đầy đủ trước khi nói.
- **`half` (Moderate Scaffolding)**: Hiển thị 50% đầu câu (`w.slice(0, half).join(' ') + ' ___ ...'`) làm Sentence Starter.
- **`chunks` (Linear Thinking ESL Collocation Scaffolding)**: CẤM TUYỆT ĐỐI che từ cơ học so le (`i % 2 === 0`). BẮT BUỘC hiển thị theo cụm từ Linear Thinking ESL dựa trên sense units và ranh giới ngữ pháp (*Dẫn chứng: AGENTS.md:143-150*).

### §5. Bất biến Kịch bản Thực nghiệm Action Lab (3-Scenario Invariant)
- Action Lab (`ActionLab.jsx` / `ScienceDragDropLab.jsx`) KHÔNG được phép chỉ là 1 hình sơ sài.
- BẮT BUỘC cung cấp tối thiểu **3 kịch bản thực nghiệm tương tác** (`stages: [Stage 1, Stage 2, Stage 3]`) để khai thác sâu sắc kiến thức liên môn CLIL:
  - Scenario 1: Hiện tượng / Nguyên nhân vật lý (e.g. Sàn ướt & Vùng giảm ma sát).
  - Scenario 2: So sánh vật liệu / Cơ chế đối ứng (e.g. Đế cao su ma sát cao vs đế nhựa trơn trượt).
  - Scenario 3: Quy trình xử lý thực tế / Sơ cứu / An toàn (e.g. Túi chườm lạnh, băng gạc, chăm sóc y tế) (*Dẫn chứng: AGENTS.md:152-160*).

### §6. Zero Fallback & Forbidden Defaults
- CẤM TUYỆT ĐỐI fallback cứng `weekNumber || 33` hoặc `activeWeek || 33` trong mọi component dùng chung. Mọi component phải nhận prop `weekNumber` tường minh. Nếu thiếu, component phải fail-loud hoặc log cảnh báo (*Dẫn chứng: docs/ARCHITECTURE_CURRENT.md:204-208*).
- CẤM TUYỆT ĐỐI mượn ảnh hoặc audio của tuần khác khi chưa có sự cho phép bằng văn bản của Owner.

### §7. Universal Progress Persistence & Return-to-Map Navigation Standards (W01–W156)

#### 7.1. The Dual-Store Architecture
Hệ thống tiến độ EngQuest3K vận hành đồng thời 2 kho lưu trữ:
1. **`useDailyQuestStore` (`src/stores/useDailyQuestStore.js`)**:
   - Quản lý tiến trình mở khóa Day 1–5, ma trận hoàn thành 15 Quests (`completedQuests['w' + weekId][questId]`), và XP/streak gamification.
   - Dispatcher duy nhất: `completeQuest(weekId, questId, options)`.
   - Cơ chế tự động giải mã alias: `QUEST_ALIAS_MAP` tự động ánh xạ `science_lab` ↔ `action_lab`, `story_writer` ↔ `story_writing`, `broadcast_studio` ↔ `video_challenge`, `gear4_clil` ↔ `clil`.
2. **`useUserStore` (`src/stores/useUserStore.js`)**:
   - Quản lý hồ sơ học sinh toàn cục, cache tiến độ (`progressCache[weekId][stationId]`), và kích hoạt đồng bộ Supabase Cloud DB (`syncProgressToServer`).
   - Tự động cập nhật đồng bộ khi `useDailyQuestStore.completeQuest` được gọi.
3. **Hook `useStationProgress` (`src/hooks/useStationProgress.js`)**:
   - Cung cấp trạng thái cấp station (`saveProgress`, `isCompleted`, `score`).
   - Tự động đồng bộ sang `useDailyQuestStore.completeQuest` mỗi khi `saveProgress(partialData, true, score)` được kích hoạt.

#### 7.2. 15-Quest Completion & Navigation Checklist
Mọi component đại diện cho một trong 15 Quests BẮT BUỘC tuân thủ mẫu UX sau:
1. **Tiếp nhận Prop**: Nhận `onBackToMap` và `onComplete` truyền từ `TaskScreen.jsx` và Zone container.
2. **Nhận diện Hoàn thành**: Đọc cả 2 stores khi mount (`useDailyQuestStore.isQuestCompleted` hoặc `useStationProgress.isCompleted`). Nếu đã hoàn thành:
   - Hiển thị huy hiệu `✓ Đã Hoàn Thành` (`CompletedBadge`) nổi bật trên hero card / header.
   - Cho phép học sinh chơi lại (Replay) tự do mà không làm mất tiến độ đã lưu.
3. **Hành động Kết thúc**: Khi hoàn thành quest:
   - Gọi `useDailyQuestStore.getState().completeQuest(weekId, questId, { score })` hoặc `saveProgress(..., true, score)` để lưu trạng thái TRƯỚC.
   - Cung cấp nút chiến thắng rõ ràng: e.g. `✓ Return to Map (+50 XP)` hoặc `✓ Finish Quest & Return to Map`.
   - Kích hoạt callback `onBackToMap()` hoặc `onComplete()` để điều hướng mượt mà về `/week/${weekId}/hub/1`, không bao giờ để học sinh bị kẹt lại màn hình.

### §8. Audio Fallback Hierarchy & Fail-Loud Doctrine
- **TẦNG 0 (Pre-generated Static MP3 / R2 CDN)**: 100% audio nội dung bài học BẮT BUỘC phải có file vật lý MP3 tĩnh trong `public/audio/week{N}/`. Mọi component khi gọi `speakText(text, audioUrl)` hoặc `VoiceService.speak` BẮT BUỘC truyền `audioUrl` hợp lệ.
- **TẦNG 1 (Local Client / IndexedDB Cache)**: Kiểm tra `TTSCache.get()` (0ms latency, không tốn API call).
- **TẦNG 2 (Google Cloud TTS Direct Synthesis)**: CHỈ được kích hoạt khi học sinh tự gõ chữ (dynamic user-generated text). BẤT KỲ request nào tới Google Cloud TTS trong quá trình học 15 Quests đều bị Gate Firewall đánh trượt (**FAIL**).
- **TẦNG 3 (Browser SpeechSynthesis Fallback)**: Chỉ kích hoạt khi mất mạng hoàn toàn (*Dẫn chứng: AGENTS.md:184-194; docs/ARCHITECTURE_CURRENT.md:199-203*).

### §9. Mock Exam Cadence (34 Checkpoints Interpolated)
- Căn cứ Quyết định Owner R75/R80/R81 (10–11/11/2026): Mock Exam là **tuần chèn thêm**, không chiếm tuần nội dung Source B. Toàn bộ 156 tuần nội dung (W01–W156) được giữ nguyên vẹn.
- Toàn khóa gồm **34 Mock Checkpoints** phân bổ đều giữa các tuần nội dung (tổng 190 tuần lịch biểu):
  - **3 Mock Đầu Khóa (EARLY: M01–M03)**:
    - `M01` (sau W16, trước W17): Starters Shield Festival — *Tạm hoãn/giản lược theo Lite Mode do giới hạn tải nhận thức của trẻ 6–7 tuổi (Dẫn chứng: docs/MASTER_ARCHITECTURE_W01_W156.md:17, 245-289)*.
    - `M02` (sau W24, trước W25): Mid-Movers Mock Exam — *Đánh giá giữa kỳ A1 Movers*.
    - `M03` (sau W32, trước W33): Final Movers Mock Exam — *Đánh giá tốt nghiệp A1 Movers trước khi vào A2 Flyers*.
  - **10 Mock Flyers (FLYERS: M04–M13)**:
    - Chèn trước tuần $W33 + 4n$ ($n = 1..10$), tức sau các tuần nội dung $W36, W40, W44, W48, W52, W56, W60, W64, W68, W72$.
    - Định dạng: `FULL_MOCK` Flyers (Cycle 0, 16 Cambridge parts: 5 Listening + 7 Reading & Writing + 4 Speaking).
  - **21 Mock PET (PET: M14–M34)**:
    - Chèn sau các tuần nội dung $W72 + 4k$ ($k = 1..21$), tức sau $W76, W80, W84, W88, W92, W96, W100, W104, W108, W112, W116, W120, W124, W128, W132, W136, W140, W144, W148, W152, W156$.
    - Định dạng: Cambridge B1 Preliminary (PET) áp dụng xuyên suốt cho 100% mock sau W72 per Owner Decision R80 & R81. Mock cuối cùng (M34) chèn sau khi hoàn thành tuần nội dung W156.

#### Bảng Tra Cứu 34 Mốc Khảo Thí Cambridge (Kiểm Chứng 100% Qua `scripts/verify_mock_schedule.mjs`)

| Checkpoint | Tier | Tên Mock Exam | Chèn Sau Tuần | Trước Tuần | Định Dạng Khảo Thí | Trạng Thái |
|:---:|:---:|:---|:---:|:---:|:---|:---|
| **M01** | EARLY | Starters Shield Festival | W16 | W17 | `STARTERS_LITE` | DEFERRED_LITE_MODE |
| **M02** | EARLY | Mid-Movers Mock Exam | W24 | W25 | `CAMBRIDGE_MOVERS` | PLANNED |
| **M03** | EARLY | Final Movers Mock Exam | W32 | W33 | `CAMBRIDGE_MOVERS` | PLANNED |
| **M04** | FLYERS | Flyers Mock Exam 1 | W36 | W37 | `FLYERS_FULL_MOCK_CYCLE_0` | PILOT_CANDIDATE |
| **M05** | FLYERS | Flyers Mock Exam 2 | W40 | W41 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M06** | FLYERS | Flyers Mock Exam 3 | W44 | W45 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M07** | FLYERS | Flyers Mock Exam 4 | W48 | W49 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M08** | FLYERS | Flyers Mock Exam 5 | W52 | W53 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M09** | FLYERS | Flyers Mock Exam 6 | W56 | Tuần 57 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M10** | FLYERS | Flyers Mock Exam 7 | W60 | W61 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M11** | FLYERS | Flyers Mock Exam 8 | W64 | W65 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M12** | FLYERS | Flyers Mock Exam 9 | W68 | W69 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M13** | FLYERS | Flyers Official Gate Mock Exam | W72 | W73 | `FLYERS_FULL_MOCK_CYCLE_0` | PLANNED |
| **M14** | PET | B1 PET Mock Exam 1 | W76 | W77 | `CAMBRIDGE_B1_PET` | PILOT_CANDIDATE |
| **M15** | PET | B1 PET Mock Exam 2 | W80 | W81 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M16** | PET | B1 PET Mock Exam 3 | W84 | W85 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M17** | PET | B1 PET Mock Exam 4 | W88 | W89 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M18** | PET | B1 PET Mock Exam 5 | W92 | W93 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M19** | PET | B1 PET Mock Exam 6 | W96 | W97 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M20** | PET | B1 PET Mock Exam 7 | W100 | W101 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M21** | PET | B1 PET Mock Exam 8 | W104 | W105 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M22** | PET | B1 PET Mock Exam 9 | W108 | W109 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M23** | PET | B1 PET Mock Exam 10 | W112 | W113 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M24** | PET | B1 PET Mock Exam 11 | W116 | W117 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M25** | PET | B1 PET Mock Exam 12 | W120 | W121 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M26** | PET | B1 PET Mock Exam 13 | W124 | W125 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M27** | PET | B1 PET Mock Exam 14 | W128 | W129 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M28** | PET | B1 PET Mock Exam 15 | W132 | W133 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M29** | PET | B1 PET Mock Exam 16 | W136 | W137 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M30** | PET | B1 PET Mock Exam 17 | W140 | W141 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M31** | PET | B1 PET Mock Exam 18 | W144 | W145 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M32** | PET | B1 PET Mock Exam 19 | W148 | W149 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M33** | PET | B1 PET Mock Exam 20 | W152 | W153 | `CAMBRIDGE_B1_PET` | PLANNED |
| **M34** | PET | B1 PET Final Capstone Mock Exam | W156 | — (Cuối khóa) | `CAMBRIDGE_B1_PET` | PLANNED |

- **Quy chế Tuần Nội dung W33–W72**: Toàn bộ 40 tuần nội dung W33–W72 vận hành xoay vòng trên **4 Rotary Cycles (Cycle 1–4)**, mỗi tuần gồm 4 Cambridge Parts (tổng 16 parts hoàn chỉnh sau 4 tuần). Các tuần nội dung KHÔNG chạy Mock. [LEGACY, ĐÃ BÃI BỎ]: CẤM mô tả mô hình cũ "Cycle 5 (Mock) W37, W42..." vì mâu thuẫn với lịch chèn mock R75.
- **Mock Checkpoints (M04–M13)**: Hoạt động ở chế độ `FULL_MOCK` (Cycle 0 trong `bossRotarySchedule.js`, bao gồm đầy đủ 16 Cambridge Parts: 5 Listening + 7 Reading & Writing + 4 Speaking).
- **Hiện Trạng Code & Đối Chiếu Kỹ Thuật Rotary Schedule**:
  - Tại `src/config/bossRotarySchedule.js:132-133`, code thực thi runtime là modulo 4: `const offset = ((w - 33) % 4 + 4) % 4; const cycleKey = isMock ? 0 : (offset + 1);`. Logic này đảm bảo các tuần nội dung xoay vòng chuẩn qua Cycles 1–4 mà không bị mock xen ngang làm lệch pha (*Dẫn chứng: raw_outputs/r111_f_rotary_reconciliation.txt*).
  - Ghi nhận tại `docs/Claude_handoff.txt:265-266` phản ánh phiên bản cũ trước Round 81 khi code còn chạy modulo 5 tại dòng 127.
  - [LEGACY / CODE DEBT, ĐÃ BÃI BỎ]: Dòng 85 của `src/config/bossRotarySchedule.js` còn comment cũ `// Cycle 0 = Full Mock (Week 5 of each 5-week rotation: W37, W42…)`, đây là comment rác cần dọn khi mở băng `src/`.
- **Quy chế Miễn trừ Toán (Capstone / Mock Exemption)**: Các tuần mang cờ `mode: "FULL_MOCK_ASSESSMENT"` hoặc `mode: "CAPSTONE_PROJECT"` được **MIỄN TRỪ HOÀN TOÀN** yêu cầu mảng `singapore_math` 5/5 theo thiết kế kiến trúc sư phạm (*Dẫn chứng: docs/MASTER_ARCHITECTURE_W01_W156.md:309-322*).

### §10. Story Writer Dual Standard
- **Day 4 `story_writer` (Creator Studio)**: Xưởng học tập viết sáng tạo có giàn giáo 5 cảnh (`writing_panel_1..5.png`) theo chuẩn S3 và `WEEK_CONTENT_SOP_W34_PLUS.md`, yêu cầu tối thiểu **40 từ** (~8 từ/cảnh).
- **Day 5 `boss_reading` Part 7 (Boss Castle)**: Phòng thi Cambridge Flyers chính thức theo Handbook for Teachers và `src/config/cambridgeExamStandards.js:141-144`, gồm đúng **3 tranh**, yêu cầu viết **≥ 20 từ**.

### §11. 5-Feature Data Contracts (v2.0.0 — 2026-09-05)

Các tính năng nâng cao trong EngQuest3K yêu cầu hợp đồng dữ liệu chuẩn xác trong 4 Data Hubs:

#### 11.1. Feature-to-Data Mapping

| Feature | Data Location | Required Fields | First Week Required |
|---|---|---|---|
| **SRS Leitner 5-Box** | `reading_hub.js → vocab[]` | `word`, `definition_en`, `definition_vi` | W17 (auto-enroll) |
| **Inference Questions** | `reading_hub.js → clil_article.inference_questions[]` | `id`, `text`, `type`, + type-specific fields | W38 (optional), **W49+ enforced** |
| **Quick Write Panel** | Dynamic prompts from context | — | — |
| **Placement Test** | `data/placementTest.js` (one-time) | — | — |
| **Parent Dashboard Radar** | Computed from 15-quest completion data | — | — |

#### 11.2. Inference Questions Contract
Mỗi `clil_article` trong `reading_hub.js` BẮT BUỘC cung cấp mảng `inference_questions`:
```javascript
inference_questions: [
  {
    id: 'infer_1',                             // Bắt đầu bằng "infer_"
    text: 'Why did Jake help the new student?', // Dạng "Why?" hoặc "What can we learn?"
    type: 'mcq_with_evidence',                 // hoặc 'open_response'
    options: ['Because...', 'Since...', 'Due to...'], // 3–4 phương án (chỉ MCQ)
    correct: 0,                                // Index đáp án đúng (chỉ MCQ)
    scaffoldHint: 'Look at paragraph 2...',    // Gợi ý giàn giáo
  },
  {
    id: 'infer_2',
    text: 'What can we learn from this experiment?',
    type: 'open_response',
    modelAnswer: 'We can learn that...',       // Câu trả lời mẫu (bắt buộc cho open_response)
    acceptableKeywords: ['friction', 'force', 'surface'], // Từ khóa chấm điểm
  }
]
```
**Số lượng tối thiểu theo thế hệ:**
- Thế hệ 1 (W33–W72, A2 Flyers): $\ge 2$ câu
- Thế hệ 2 (W73–W120, B1 PET): $\ge 2$ câu (Theo Quyết định Owner R81: PET áp dụng xuyên suốt đến hết W120)
- Thế hệ 3 (W121–W156, B1+ Academic): $\ge 3$ câu phân tích sâu (B1+ Academic bắt đầu từ W121 per Source B Phase 3 & Owner R81)

#### 11.3. Vocab SRS Contract (Dynamic Count, Không Có Số Cố Định)
Mảng `vocab` trong `reading_hub.js` chứa các mục từ vựng trọng tâm sư phạm theo chủ đề tuần (Dynamic lexical count — KHÔNG áp đặt số lượng cố định), mỗi mục gồm:
- `word` (string) — Từ vựng mục tiêu
- `definition_en` (string) — Định nghĩa tiếng Anh chuẩn CEFR
- `definition_vi` (string) — Định nghĩa tiếng Việt có dấu đầy đủ
Các mục này được hệ thống SRS Leitner 5-Box tự động ghi danh vào flashcard học tập của học sinh.

#### 11.4. Golden Templates
Bộ template mẫu chuẩn hóa dành cho subagents và tác giả nội dung:

| Template | Range / Checkpoints | Path |
|---|---|---|
| Flyers Rotary (Content Weeks) | W33–W72 (Tuần nội dung) | `production_kit/templates/template_flyers_rotary.js` |
| Flyers Full Mock (Checkpoints) | M04–M13 (Chèn sau W36, 40, ..., 72) | `production_kit/templates/template_flyers_mock.js` |
| PET Transition | W73–W120 | `production_kit/templates/template_pet_transition.js` |
| B1+ Academic Transition | W121–W156 | `production_kit/templates/template_b1plus_transition.js` |

#### 11.5. Automated Gate Validation (gate18)
```bash
# Chạy thẩm định tuân thủ 5 tính năng trước khi commit
node scripts/gate18_feature_compliance.mjs <weekNumber>
```
**Lộ trình áp dụng:**
- **W33–W48**: Chế độ cảnh báo (Warnings only, exit 0).
- **W49+**: Chế độ cưỡng chế nghiêm ngặt (Fail gate, exit 1 nếu thiếu dữ liệu).

---

# LỚP 2: HỢP ĐỒNG TÀI SẢN THEO PROFILE (PROFILE-BASED QUEST ASSET CONTRACT)

### §12. Ma trận 6 Profiles Khảo thí & Năng lực (v2.2.0)
*Toàn bộ dữ liệu bảng này được sinh tự động trực tiếp từ `docs/agent_artifacts/sop_draft/quest_asset_contract.json` qua script `scripts/render_contract_tables.mjs`.*

| Profile ID | Tên Profile | Khoảng Tuần | CEFR | Quests/Ngày (Tổng Quests) | Core Ảnh | Core Audio | Ext Ảnh | Ext Audio | Panels Story | Ngưỡng Từ | Cambridge Shield Parts | Trạng Thái Quy Trình (Pilot Gate) |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **LITE** | Pre-A1 Starters (Lite Mode) | W01–W16 | Pre-A1 | 2 Quests/Ngày (10 Quests) | **15** | **16** | 0 | 0 | 1 panel | ≥ 10 từ | L:3, R:0, S:2 | DRAFT — PILOT-GATED: Cấm mass production cho đến khi tuần pilot được duyệt và contract được cập nhật. |
| **YLE** | A1 Movers (Full 15-Quest Mode) | W17–W32 | A1 Movers | 3 Quests/Ngày (15 Quests) | **28** | **30** | 2 | 1 | 4 panels | ≥ 30 từ | L:5, R:6, S:4 | DRAFT — PILOT-GATED: Cấm mass production cho đến khi tuần pilot được duyệt và contract được cập nhật. |
| **FLYERS** | A2 Flyers (North Star 1 — Golden Standard) | W33–W72 | A2 Flyers | 3 Quests/Ngày (15 Quests) | **29** | **39** | 2 | 1 | 5 panels | ≥ 40 từ | L:5, R:6, S:4 | ĐÃ ĐỐI CHIẾU & KIỂM CHỨNG CHÍNH THỨC (W33 GOLDEN MASTER) — DUY NHẤT ĐƯỢC CHẠY MASS PRODUCTION NGAY. |
| **PET** | B1 Preliminary (Level 1 Post-Flyers) | W73–W120 | B1 Preliminary | 3 Quests/Ngày (15 Quests) | **19** | **29** | 0 | 0 | 1 panel | ≥ 100 từ | L:4, R:6, S:4 | DRAFT — PILOT-GATED: Cấm mass production cho đến khi tuần pilot W73 được duyệt và contract được cập nhật. |
| **B1PLUS** | B1+ Strong Academic (Level 2 Post-Flyers) | W121–W156 | B1+ / B2 Prep | 3 Quests/Ngày (15 Quests) | **19** | **29** | 0 | 0 | 1 panel | ≥ 140 từ | L:4, R:6, S:4 | DRAFT — PILOT-GATED: Cấm mass production cho đến khi tuần pilot W121 được duyệt và contract được cập nhật. |
| **MOCK** | Cambridge Mock Exam Checkpoints | Interpolated between content weeks (every 4 weeks: 3 early + 10 Flyers + 21 PET = 34 checkpoints total) | Theo cấp độ | 3 Quests/Ngày (15 Quests) | *Miễn trừ Singapore Math* | *Theo đề thi* | 0 | 0 | Format đề thi | Chuẩn đề | 100% Format đề thi thật | DRAFT — PILOT-GATED: Pilot M04 (Flyers) và M14 (PET đầu tiên) phải được duyệt trước khi nhân rộng. |

### §13. Phân tầng Tài sản Truyền thông: Core vs Extended Assets
- **Core Assets (Tài sản Cốt lõi — Tier 1)**:
  - BẮT BUỘC 100% phải có mặt trên đĩa (`fs.existsSync`, size > 0, đúng định dạng).
  - Thiếu bất kỳ 1 tài sản Core nào -> Tuần học bị đánh trượt (**FAIL**), cấm đóng băng, cấm merge vào production.
  - Chuẩn mẫu FLYERS (W33): **29 Core Images + 39 Core Audio = 68 Media Files** (Chi tiết: 29 ảnh = 5 Webtoon + 1 CLIL + 5 Math + 5 Story + 11 Listening + 2 Speaking; 39 audio = 5 Webtoon + 8 Voice Shadow + 1 CLIL + 4 Discovery + 1 Video Prompt + 11 Info Exchange + 5 Listening + 4 Speaking).
- **Extended Assets (Tài sản Mở rộng — Tier 2)**:
  - Tài sản minh họa bổ trợ, hướng dẫn mở rộng (Diagram Action Lab, Diagram Discovery Report, Audio mẫu Retell).
  - Thuộc diện "Polish Layer": KHÔNG chặn hoàn thành tuần, được phép sản xuất ở lượt polish.
  - Tuần bàn giao BẮT BUỘC phải báo cáo rõ ràng tỷ lệ % Ext (không được gộp Ext vào để bù thiếu Core).
  - Đánh dấu trạng thái: `MẶC ĐỊNH CỦA ANTIGRAVITY — chờ duyệt Claude`.

### §14. Bảng Đặc tả Hợp đồng Tài sản 15 Quests theo Profile (15 Quests x 6 Profiles)
*Sinh tự động từ `quest_asset_contract.json` qua `scripts/render_contract_tables.mjs`.*

| Quest ID | Tên Hiển Thị UI Chuẩn | Zone | LITE (Img/Aud) | YLE (Img/Aud) | FLYERS (Img/Aud) | PET (Img/Aud) | B1PLUS (Img/Aud) | Missing Behavior |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `gear1_webtoon` | Scene Explorer (Interactive Comic) | Zone 1 — Story World | 4 ảnh / 4 aud | 5 ảnh / 5 aud | **5 ảnh / 5 aud** | 5 ảnh / 5 aud | 5 ảnh / 5 aud | `FAIL_LOUD` |
| `gear2_karaoke` | Voice Shadow (Karaoke Recording) | Zone 1 — Story World | 0 ảnh / 6 aud | 0 ảnh / 8 aud | **0 ảnh / 8 aud** | 0 ảnh / 8 aud | 0 ảnh / 8 aud | `FAIL_LOUD` |
| `gear3_retell` | Story Retell (Linear Scaffold) | Zone 1 — Story World | — *(Giản lược)* | 0 ảnh / 0 aud *(+0e/1e)* | **0 ảnh / 0 aud *(+0e/1e)*** | 0 ảnh / 0 aud | 0 ảnh / 0 aud | `FAIL_LOUD` |
| `gear4_clil` | Fact Finder (CLIL Discovery) | Zone 2 — Knowledge Lab | 1 ảnh / 1 aud | 1 ảnh / 1 aud | **1 ảnh / 1 aud** | 1 ảnh / 1 aud | 1 ảnh / 1 aud | `FAIL_LOUD` |
| `science_lab` | Action Lab (Interactive Experiments) | Zone 2 — Knowledge Lab | 1 ảnh / 0 aud | 0 ảnh / 0 aud *(+1e/0e)* | **0 ảnh / 0 aud *(+1e/0e)*** | 0 ảnh / 0 aud | 0 ảnh / 0 aud | `FAIL_LOUD` |
| `science_report` | Discovery Report (Discovery Detective) | Zone 2 — Knowledge Lab | — *(Giản lược)* | 0 ảnh / 4 aud *(+1e/0e)* | **0 ảnh / 4 aud *(+1e/0e)*** | 0 ảnh / 0 aud | 0 ảnh / 0 aud | `FAIL_LOUD` |
| `word_blitz` | Speed Match (Vocabulary Duel) | Zone 3 — Battle Arena | 0 ảnh / 0 aud | 0 ảnh / 0 aud | **0 ảnh / 0 aud** | 0 ảnh / 0 aud | 0 ảnh / 0 aud | `DYNAMIC_EVAL` |
| `sentence_smash` | Grammar Duel (Sentence Builder) | Zone 3 — Battle Arena | 0 ảnh / 0 aud | 0 ảnh / 0 aud | **0 ảnh / 0 aud** | 0 ảnh / 0 aud | 0 ảnh / 0 aud | `DYNAMIC_EVAL` |
| `math_quest` | Math Quest (Singapore Bar Models) | Zone 3 — Battle Arena | — *(Giản lược)* | 5 ảnh / 0 aud | **5 ảnh / 0 aud** | 5 ảnh / 0 aud | 5 ảnh / 0 aud | `FAIL_LOUD` |
| `story_writer` | Story Writer (Picture Story / Essay) | Zone 4 — Creator Studio | 1 ảnh / 0 aud | 4 ảnh / 0 aud | **5 ảnh / 0 aud** | 1 ảnh / 0 aud | 1 ảnh / 0 aud | `FAIL_LOUD` |
| `broadcast_studio`| Video Challenge (Talkshow / Report) | Zone 4 — Creator Studio | — *(Giản lược)* | 0 ảnh / 1 aud | **0 ảnh / 1 aud** | 0 ảnh / 1 aud | 0 ảnh / 1 aud | `FAIL_LOUD` |
| `info_exchange` | Info Exchange (Information Gap) | Zone 4 — Creator Studio | 1 ảnh / 1 aud | 0 ảnh / 2 aud | **0 ảnh / 11 aud** | 1 ảnh / 2 aud | 1 ảnh / 2 aud | `FAIL_LOUD` |
| `boss_listening` | Listening Shield (Cambridge Exam) | Zone 5 — Boss Castle | 6 ảnh / 3 aud | 11 ảnh / 5 aud | **11 ảnh / 5 aud** | 4 ảnh / 4 aud | 4 ảnh / 4 aud | `FAIL_LOUD` |
| `boss_reading` | Reading & Writing Shield | Zone 5 — Boss Castle | — *(Giản lược)* | 0 ảnh / 0 aud | **0 ảnh / 0 aud** | 0 ảnh / 0 aud | 0 ảnh / 0 aud | `DYNAMIC_EVAL` |
| `weekly_review` | Speaking & Passport (Cambridge Exam)| Zone 5 — Boss Castle | 1 ảnh / 1 aud | 2 ảnh / 4 aud | **2 ảnh / 4 aud** | 2 ảnh / 4 aud | 2 ảnh / 4 aud | `FAIL_LOUD` |

#### Quy Chuẩn Âm Thanh Bắt Buộc Của `info_exchange` (Dựa Theo Hub Khai Báo)
- **Chuẩn Mực Bắt Buộc FLYERS Profile (W33 Golden Standard — 11 Files Audio Core)**:
  - 100% audio hội thoại mẫu của `info_exchange` trong FLYERS Profile BẮT BUỘC tuân thủ cấu trúc đầy đủ của W33 Golden Standard gồm đúng 11 file audio tĩnh:
    - 1 file Cambridge Speaking Intro Part 2: `/audio/week{W}/exam_intro_S2.mp3`
    - 5 câu hỏi mẫu Table A: `/audio/week{W}/info_exchange_a1_model.mp3` .. `/audio/week{W}/info_exchange_a5_model.mp3`
    - 5 câu trả lời mẫu Table A: `/audio/week{W}/info_exchange_reply_1.mp3` .. `/audio/week{W}/info_exchange_reply_5.mp3`
  - CẤM TUYỆT ĐỐI mọi quy tắc nới lỏng hoặc dùng "HOẶC" (không chấp nhận phương án chỉ cung cấp 2 file intro thay thế cho bộ 10 file Model Dialogue).
- **Ghi Nhận Nợ Tuân Thủ Của W34 (Compliance Debt Documentation)**:
  - `speaking_hub.js` của W34 chỉ khai báo `exam_intro_S2.mp3` cùng 2 file intro tổng quan (`info_exchange_intro_p1.mp3`, `info_exchange_intro_p2.mp3`), hoàn toàn THIẾU 10 file Model Dialogue (`a1..a5_model.mp3` và `reply_1..5.mp3`).
  - Đây là **Nợ tuân thủ (Compliance Debt)** của W34 so với W33 Golden Standard.
  - Toàn bộ các tuần sản xuất mới W35+ BẮT BUỘC chuẩn hóa 100% theo đầy đủ 11 file audio của W33 Golden Standard.

---

### §15. [SUSPENDED & ABOLISHED ARCHITECTURE — DANH MỤC KIẾN TRÚC TẠM DỪNG & ĐÃ KHAI TỬ]
> [!NOTE]
> Bảng đối chiếu sự lệch R107 và Sổ nợ kỹ thuật chi tiết của W33/W34 đã được chuyển sang tài liệu riêng: `docs/agent_artifacts/sop_draft/SOP_APPENDIX_BACKLOG.md`.

#### 15.1. [SUSPENDED] Super Leo Chronicles 21 Mini-Game Mode Architecture & Release Gating Standards
> [!IMPORTANT]
> **TRẠNG THÁI HIỆN TẠI: TẠM DỪNG HOÀN TOÀN (SUSPENDED)**  
> Căn cứ chỉ đạo trực tiếp của Project Owner (Owner Decision R75, R80 và `docs/Claude_handoff.txt:25`):
> - Game track Super Leo Chronicles **TẠM DỪNG HOÀN TOÀN** (không viết code mới, không kiểm toán, không đưa vào pipeline sản xuất tuần).
> - **KHÔNG** thuộc quy trình sản xuất tuần, **KHÔNG** có quality gate tuần và **KHÔNG** có tài sản bắt buộc mỗi tuần.
> - CẤM sản xuất `wh_questions.js` và `word_class_duel.js` trong các tuần nội dung mới.
> - **ĐIỀU KIỆN MỞ LẠI**: CHỈ ĐƯỢC PHÉP mở lại khi có quyết định bằng văn bản chính thức của Owner.
> - Toàn bộ cấu trúc dưới đây được lưu trữ như tài liệu tham chiếu kỹ thuật (Technical Archive) khi track được kích hoạt lại.

**1. The Master 21 Mini-Game Roster (7 Floors × 3 Doors = 21 Mini-Games)**:  
Super Leo Chronicles tổ chức hành trình thám hiểm ngục tối qua 7 Tầng (Floor 1–7), mỗi tầng gồm đúng 3 cánh cửa tương ứng 3 kỹ năng:

| Floor | Door 1: Vocab | Door 2: Grammar | Door 3: Integration | Component File |
|---|---|---|---|---|
| **F1** | `arcane_bubble` (Arcane Bubble) | `spell_train` (Spell Train) | `lexical_det` (Lexical Detective) | `ShadowVaultInfiltrate.jsx` / `SyntaxExpressRail.jsx` |
| **F2** | `crystal_match` (Crystal Match) | `rune_forge` (Rune Forge) | `ancient_scroll` (Ancient Scroll) | `CrystalMatch.jsx` / `AncientScrollLab.jsx` |
| **F3** | `phonics_bubble` (Phonics Bubble) | `chunk_catapult` (Chunk Catapult) | `meteor_smasher` (Meteor Smasher) | `ChunkCatapultCanvas.jsx` / `MeteorSmasher.jsx` |
| **F4** | `highway_runner` (Highway Runner) | `spell_train_express` (Syntax Express) | `lexical_riddle` (Lexical Riddle) | `HighwayRunnerGame.jsx` / `SyntaxExpressGame.jsx` |
| **F5** | `grand_matrix` (Grand Matrix) | `titan_forge` (Titan Forge) | `cambridge_cloze` (Cambridge Cloze) | `GrandMatrixGrid.jsx` / `CambridgeClozeLab.jsx` |
| **F6** | `synonym_storm` (Synonym Storm) | `connector_relay` (Connector Relay) | `story_sequencer` (Story Sequencer) | `SynonymStormGame.jsx` / `ConnectorRelayGame.jsx` / `StorySequencerGame.jsx` |
| **F7** | `word_forge_scramble` (Word Forge) | `question_quest` (Question Quest) | `rune_balance_scale` (Word Class Duel) | `WordForgeScrambleGame.jsx` / `QuestionQuestGame.jsx` / `WordClassDuelGame.jsx` |

- **Bất biến Điều hướng Floor**: Trong `ChroniclesScreen.jsx`, điều kiện chặn Mystery Vault / Boss Chamber BẮT BUỘC là `activeDayIndex >= 7` (đủ 7 ngày). CẤM đặt `activeDayIndex >= 5` vì sẽ khóa sớm Floors 5 và 6.

**2. Required Weekly Chronicles Content Assets (W34+) [THAM CHIẾU LƯU TRỮ KHI MỞ LẠI]**:  
Khi kích hoạt sản xuất nội dung game track, mỗi tuần tác giả cung cấp 2 file dữ liệu chuyên biệt song song cùng 4 Data Hubs:
- **`src/data/weeks/week_{N}/wh_questions.js`**: 5 câu hỏi WH tạo sẵn dựa trên Story Scenes & CLIL Article của tuần. Nhận diện hậu tố quá khứ BẮT BUỘC kiểm tra `-ed` (`length >= 4 && endsWith('ed')`). CẤM khớp `-d` trần. Tuyệt đối không sinh sở hữu cách kép (`Maria's's`).
- **`src/data/weeks/week_{N}/word_class_duel.js`**: 4 từ mục tiêu lưỡng tính ngữ pháp (dual-class words, e.g. `grip`, `slide`, `care`, `help`). Round 1 ưu tiên từ thực tế trong bài đọc CLIL; Rounds 2–4 ghi rõ nguồn gốc câu văn trong comment.

**3. BUG-002 Prevention & Pure Lexical Isolation**:  
- **Cấm Dummy Fallback**: CẤM TUYỆT ĐỐI chuỗi `"Related to " + word` fallback trong `contentService.js`, `extractQuestVocab.js`, `DailyRoomScreen.jsx`, và `ShadowVaultInfiltrate.jsx`.
- **Cách ly Từ vựng thuần khiết**: Hàm trích xuất từ vựng mini-game tích hợp phải lọc bỏ bất kỳ mục nào chứa `.sentence` hoặc văn bản có $> 3$ từ để tránh câu ngữ pháp làm ô nhiễm kho từ vựng.

**4. Transparent Data Sizing & Assessment Metrics**:  
- Trình nạp từ vựng nạp từ `reading_hub.vocab` và định nghĩa từ `writing_hub`.
- Tuyệt đối không báo cáo số lượng mẫu tạm thời (mock placeholder) thành "từ vựng đã thẩm định" khi tuần chưa hoàn tất tác quyền.

**5. Release Gating & Pedagogical Sign-off Protocol**:  
- Nội dung trong `wh_questions.js`, `word_class_duel.js`, và Connector Relay BẮT BUỘC trải qua thẩm duyệt sư phạm trước khi bật cho học sinh thực tế.
- Pre-release gate checklist:
  - [ ] Thẩm duyệt các câu lưỡng tính ngữ pháp trong `word_class_duel.js`.
  - [ ] Thẩm duyệt câu hỏi WH và gợi ý trong `wh_questions.js`.
  - [ ] Thẩm duyệt bài luyện từ nối trong `ConnectorRelayGame.jsx`.
  - [ ] Xác thực định nghĩa thuần khiết trên Floors 1–7 (0 trường hợp `"Related to "`).
  - [ ] `npx eslint src/modules/chronicles/games/*.jsx` exit 0, `npm run build` exit 0.

#### 15.2. [ABOLISHED] Dictation 3-Step Engine & Dictation Notepad
- Khai tử hoàn toàn theo Quyết định Kiến trúc Gói 003B (`commit c30ab03e` & `commit efe32bb3`).
- CẤM sinh file `dictation.js`, CẤM sinh audio `dictation_1..8.mp3`. 0% hiện diện trên UI (*Dẫn chứng: AGENTS.md:214*).

#### 15.3. [ABOLISHED] Trạm Vocab Rời & 20 Audio Từ Vựng Cố Định (vocab_*.mp3)
- Khai tử theo Quyết định Owner Round 104 (*"Vocab là của cấu trúc cũ đã xoá bỏ từ lâu rồi mà????? SOP vẫn còn thì phải xoá đi"*).
- Không còn trạm Vocab độc lập, không sản xuất `vocab.js`, không sinh 20 file `vocab_*.mp3`.
- Từ vựng được tích hợp trực tiếp vào `reading_hub.vocab` với số lượng động theo chủ đề, không có số lượng 20 cố định.

#### 15.4. [ABOLISHED] Flash Arena vocab Độc Lập
- `word_blitz` (Speed Match) sử dụng trực tiếp các thẻ từ vựng trích xuất động từ reading hub và listening hub, không yêu cầu kho audio vocab riêng biệt (*Dẫn chứng: docs/ARCHITECTURE_CURRENT.md:231*).

---

# LỚP 3: QUY TRÌNH SẢN XUẤT TUẦN HÀNG LOẠT (MASS PRODUCTION WORKFLOW)

### §16. Nguyên Tắc Nộp Bài & Kiểm Toán Bằng Chứng (Rule 0 Compliance)
- Mọi báo cáo kết thúc bằng đường dẫn zip + `sha256sum` thật + dán `unzip -l`.
- Mỗi round nộp **đúng 1 zip duy nhất** đặt tại `docs/review_packages/roundXX_YYYYMMDD.zip`.
- Zip bắt buộc chứa đầy đủ 5 thư mục thành phần:
  1. `raw_outputs/`: Toàn bộ stdout/stderr của mọi lệnh shell chạy qua wrapper.
  2. `screenshots/`: Ảnh chụp bằng chứng từ Headless/Visible Browser thực tế.
  3. `media/`: Các tài sản media mới sản xuất (nếu có).
  4. `scripts/`: Mọi script kiểm toán, tự động hóa và đóng gói.
  5. `src_diff.patch` + `MANIFEST.txt`: File danh sách thay đổi và bảng kê SHA-256 xác thực.
- CẤM nộp file rời, cấm nộp nhiều zip chồng chéo. Script `package_check.mjs` kiểm tra và FAIL (exit 1) nếu thiếu thư mục hoặc thiếu file đã nêu trong báo cáo.

### §17. Multi-Agent Review Protocol & Verification Checklist
Trước khi commit bất kỳ thay đổi nào lên mã nguồn, Agent thực thi BẮT BUỘC phải spawn **Reviewer Agent** (ở chế độ phản biện độc lập / adversarial review) để thẩm định theo checklist 7 tiêu chí:
- [ ] **1. Variable Declarations**: Mọi biến sử dụng trong hàm phải được khai báo trước đó; không có nguy cơ ReferenceError hoặc Temporal Dead Zone (TDZ).
- [ ] **2. Cheat-proofing**: Không có fallback text injection; nhận dạng giọng nói bắt buộc từ microphone thật; không dùng độ dài chuỗi mock để bypass bài thi Speaking.
- [ ] **3. Progress Data Integrity**: Hàm `logAttempt` chỉ được gọi khi `isAttempted: true`; không ghi nhận dữ liệu rác vào hệ thống analytics.
- [ ] **4. Build Verification**: Lệnh `npm run build` BẮT BUỘC thoát mã 0 (exit code 0).
- [ ] **5. Manifest Drift Test**: Lệnh `npm run test:manifest:drift` pass 100%.
- [ ] **6. 5-Feature Compliance**: Lệnh `node scripts/gate18_feature_compliance.mjs <week>` pass (hoặc cảnh báo hợp lệ cho W33–W48).
- [ ] **7. Reviewer Report**: Báo cáo phản biện độc lập được lập thành văn bản rõ ràng trước khi đóng gói nộp bài.

### §18. Quy Tắc Nhóm Sản Xuất (Batch Production Rules)
- **Quy mô lô sản xuất**: Đúng **2–4 tuần / round**.
- **Tiêu chí Hoàn thành Lô (Completion Criterion)**: Tuần nào làm là phải đạt **100% Core Assets** theo hợp đồng profile (ảnh, audio, code hub, bài tập) TRƯỚC KHI chuyển sang tuần kế tiếp.
- Tuyệt đối cấm làm dàn trải, cấm mở tuần mới khi tuần hiện tại chưa đạt 100% Core.

### §19. Quy Trình PILOT Tiên Phong (Bắt Buộc Cho Profile Mới)
- Trước khi sản xuất hàng loạt cho bất kỳ profile nào (LITE, YLE, PET, B1PLUS), BẮT BUỘC phải thực hiện **1 tuần Pilot tiên phong**:
  - LITE: Pilot Tuần 01.
  - YLE: Pilot Tuần 17.
  - PET: Pilot Tuần 73.
  - B1PLUS: Pilot Tuần 121.
- Tuần Pilot phải được kiểm thử toàn diện trên trình duyệt thực tế, nghiệm thu sư phạm và đóng băng (Frozen Standard) trước khi mở khóa sản xuất hàng loạt cho các tuần còn lại của profile đó.

### §20. Pipeline Sản Xuất Tuần Chuẩn Hóa
Quy trình sản xuất gồm 7 bước tuần tự nghiêm ngặt (Game track Chronicles đã tạm dừng hoàn toàn theo chỉ thị Owner, không có bước sản xuất Chronicles):
1. **Bước 1 — Ingestion**: Đọc syllabus và thông số tuần từ Source B và ma trận profile.
2. **Bước 2 — Hub Authoring & Schema Validation**: Tạo 4 Data Hubs (`reading_hub.js`, `listening_hub.js`, `writing_hub.js`, `speaking_hub.js`). Ngay sau khi tạo xong dữ liệu hub, BẮT BUỘC chạy `node scripts/gate_schema_validation.mjs --generate-mode` để khóa và xác thực cấu trúc schema, ngăn chặn triệt để hiện tượng trôi dạt cấu trúc (schema drift) trước khi tiến hành sinh media.
3. **Bước 3 — Media Generation**: Sinh ảnh vector Bar Model SVG (Quest 9), ảnh Story Writer panels (Quest 10), và ảnh Cambridge Listening (Quest 13).
4. **Bước 4 — Audio Production**: Đảm bảo 100% audio Core theo Tầng 2 (Story scenes, Voice Shadowing, CLIL, Discovery Hotspots & Report, Cambridge Listening P1–P5, Cambridge Speaking Intros, Model Dialogue, Video Prompts) có file vật lý MP3 tĩnh trong `public/audio/week{N}/`.
5. **Bước 5 — Automated Quality Gates Sweep & Git-Tracked Verification**:
   - Chạy toàn bộ các Quality Gates tự động (Gate 1–Gate 19).
   - Chạy `node scripts/gate_declared_media_tracked.mjs <week>`: Bắt buộc 100% media (ảnh, audio, svg) được khai báo trong 5 hub phải tồn tại trên đĩa vật lý, được theo dõi trong chỉ mục Git (`git ls-files --error-unmatch`), và không bị loại trừ bởi `.gitignore`. Đây là điều kiện tiên quyết (prerequisite) để CI/CD triển khai tài nguyên lên Cloudflare Pages.
6. **Bước 6 — Gate 15 Browser Playtest & Live CDN Verification**:
   - Chạy kiểm thử tự động trên Chrome thật với fake media stream theo đúng kịch bản Rotary Cycle / Spec của tuần.
   - Chạy `node scripts/test_production_media_assets.mjs <week>` kiểm tra trên URL production live (`https://app.bkbacademy.vn`), xác nhận 100% asset trả về mã HTTP 200 và đúng Content-Type chuẩn (`audio/mpeg`, `image/png`, `image/jpeg`, `image/svg+xml`), tuyệt đối không chấp nhận mã 200 trả về `text/html` (bẫy fallback của Cloudflare Pages SPA router).
7. **Bước 7 — Quality Sign-off & Freeze**: Khóa hash manifest (`docs/W{N}_GOLDEN_FREEZE_MANIFEST.json` với key `protectedFileHashes`) và thực hiện Multi-Agent Review.

> 🔒 **BẤT BIẾN DUYỆT TUẦN (PRODUCTION RELEASE INVARIANT)**:  
> Báo cáo nghiệm thu tuần chỉ được công nhận **PASS** và sẵn sàng bàn giao khi hội đủ 4 điều kiện bất khả xâm phạm:  
> 1. Toàn bộ file media Core/Extended hiện diện 100% trên đĩa vật lý (Gate 3).  
> 2. 100% media khai báo trong Hub được git-tracked (`gate_declared_media_tracked.mjs` PASS 100%).  
> 3. 100% asset trên CDN production live trả về HTTP 200 và đúng Content-Type chuẩn (`audio/mpeg`, `image/png`, `image/jpeg`, `image/svg+xml`), không dính bẫy fallback `text/html` (`test_production_media_assets.mjs` PASS 100%).  
> 4. Gate 15 Browser Playtest PASS theo đúng kịch bản Rotary Cycle của tuần.

### §21. Hệ Thống Quality Gates Tự Động, Gate 15 Spec-Based Runner & Danh Mục Việc Chặn Mass Production
1. **Bộ Quality Gates Tự Động Toàn Diện**:
   - `Gate 1`: Blueprint Conformance
   - `Gate 2`: Atomic Alignment
   - `Gate 3`: Media Integrity (fs.existsSync, size > 0)
   - `Gate 4`: Chunk Bolding & Retell Scaffolding
   - `Gate 6`: XP Economy Consistency
   - `Gate 8`: Zero Fallback Sweep
   - `Gate 10`: Example Grammaticality
   - `Gate 11`: Content Richness
   - `Gate 12`: CEFR Vocabulary & Sentence Length
   - `Gate 13`: 5-Zone / 15-Quest Structural & Rotary Cadence
   - `Gate 15`: Browser DOM & Spec-Based Playtest Runner
   - `Gate 18`: 5-Feature Data Compliance
   - `Gate 19`: Data Hub Schema Validation (`scripts/gate_schema_validation.mjs --generate-mode`) — Chặn drift schema ngay sau bước sinh dữ liệu hub.
   - `Gate Media Tracked`: Hub-Declared Media Git-Tracked Integrity (`scripts/gate_declared_media_tracked.mjs`) — Chặn tình trạng media có trên đĩa nhưng chưa được `git add/commit`, dẫn tới lỗi 404 trên CDN.
   - `Gate Production CDN`: Live Production Media & Content-Type Assertion (`scripts/test_production_media_assets.mjs`) — Xác thực asset live trên domain production thật với Content-Type chuẩn (`audio/mpeg`, `image/*`).

2. **Gate 15 Spec-Based Runner Architecture**:
   - Runner `scripts/gate15_production_dom_assertions.mjs` hiện tại được viết cứng theo tương tác của Cycle 1 (W33). Khi chạy trên Cycle 2 (W34), runner bị kẹt do Part 3 Listening và Part 2 Reading & Writing có UI/DOM khác biệt, dẫn đến false negative trên dedup screenshot.
   - **Kiến trúc Runner Dựa Spec**: Runner phải được tái cấu trúc để đọc file đặc tả kiểm thử theo tuần: `docs/GATE15_SPEC_W{N}.json` (hoặc spec ma trận Cycle 1–4). Mỗi spec xác định chính xác selector tương tác thực tế (`data-testid`), các bước bấm nút, và điều kiện khẳng định thành công (assertions).

3. **Danh Mục Việc Bắt Buộc Trước Mass Production (Blocking Pre-requisites)**:
   Trước khi kích hoạt sản xuất hàng loạt cho các tuần mới (W35+), 4 hạng mục kỹ thuật cốt lõi sau bắt buộc phải được giải quyết:
   - **(a) Sửa Runner tương tác theo Cycle/Spec**:
     - File: `scripts/gate15_production_audit_spec_runner.mjs` (hoặc `scripts/gate15_production_dom_assertions.mjs`).
     - Ước lượng phạm vi: ~150–200 dòng code.
     - Thẩm quyền duyệt: Owner phê duyệt mở khóa `scripts/` (ngoài governance lock).
   - **(b) Bổ sung `data-testid` chuẩn cho 4 Component thiếu**:
     - `src/components/cambridge/NotepadNoteCompleter.jsx`: Bổ sung `data-testid="notepad-gap-input-${idx}"`, `data-testid="notepad-submit-btn"`. Phạm vi: ~15–25 dòng code.
     - `src/components/cambridge/PictureStoryContinuation.jsx`: Bổ sung `data-testid="story-continuation-textarea"`, `data-testid="story-submit-btn"`. Phạm vi: ~15–25 dòng code.
     - `src/components/cambridge/PersonalQuestionsCompleter.jsx`: Bổ sung `data-testid="personal-answer-input-${idx}"`, `data-testid="personal-submit-btn"`. Phạm vi: ~15–25 dòng code.
     - `src/components/cambridge/InformationExchangeP2.jsx`: Bổ sung `data-testid="info-exchange-card-a"`, `data-testid="info-exchange-card-b"`, `data-testid="info-exchange-mic-btn"`, `data-testid="info-exchange-submit-btn"`. Phạm vi: ~20–30 dòng code.
     - Thẩm quyền duyệt: Owner phê duyệt mở khóa `src/`.
   - **(c) Sửa `bossRotarySchedule.js` tương thích lịch chèn Mock R75**:
     - File: `src/config/bossRotarySchedule.js`.
     - Ước lượng phạm vi: ~20–40 dòng code (tách biến `contentWeekIndex` khỏi `calendarWeekNumber`, loại bỏ nợ code `(w-33)%5`).
     - Thẩm quyền duyệt: Owner phê duyệt mở khóa `src/`.
   - **(d) Cập nhật trạng thái Hotfix W34 & Khuyến nghị CI Guard W34**:
     - *Thực tế triển khai R115*: Hotfix W34 đã được Owner ủy quyền và triển khai thành công qua 2 commits trên branch `main`: commit `9840d0d5` (bổ sung `info_exchange_q5.mp3`, cập nhật freeze manifest) và commit `d9cc20cb` (bổ sung 4 file hub khai báo: `listening_p4_full.mp3`, `writing_scene_1.mp3`, `writing_scene_2.mp3`, `writing_scene_3.mp3`). Toàn bộ 5 file này đã live 100% trên production (`https://app.bkbacademy.vn`), xác nhận phát được audio và trả về header `Content-Type: audio/mpeg`.
     - *Tồn đọng 5 file Orphan*: 5 file không được hub khai báo (`shadowing_9.mp3`, `shadowing_10.mp3`, `writing_panel_1.png`, `writing_panel_2.png`, `writing_panel_3.png`) tiếp tục được giữ nguyên trạng thái untracked tại local `public/` và được bảo vệ mã băm trong `docs/W34_GOLDEN_FREEZE_MANIFEST.json` chờ xử lý qua change control trong tương lai.
     - *Bài học kiểm soát CI*: CI hiện tại trên GitHub Actions (`.github/workflows/deploy.yml:32`) chạy trực tiếp `node scripts/guard_golden_w33_freeze.mjs` (trong `package.json` định nghĩa lệnh `"guard:freeze:w33"`, hoàn toàn không có script `test:manifest`), và workflow này CHƯA CÓ bước chạy `scripts/guard_golden_w34_freeze.mjs`. Bắt buộc phải bổ sung guard W34 vào CI workflow khi mở băng repo.

4. **Quy Tắc Bài Học Đúc Kết Từ R113–R115 (Operational & Forensic Invariants)**:
   - **Quy tắc Cập nhật Freeze Manifest**: Khi cập nhật mã băm file đóng băng, trường mục tiêu BẮT BUỘC là `protectedFileHashes` trong file manifest (CẤM dùng trường `files` vì sẽ gây lỗi cú pháp runner guard).
   - **Quy tắc Kiểm thử Production Thực tế**: Mọi phép thử hồi quy hoặc nghiệm thu truyền thông BẮT BUỘC phải thực hiện trên domain thật `https://app.bkbacademy.vn`. Tuyệt đối không suy diễn trạng thái live từ kết quả chạy trên localhost hay file system.
   - **Quy tắc Kiểm tra HTTP Content-Type**: Khi dùng `curl` kiểm tra CDN, bắt buộc phải đối soát header `Content-Type` (`audio/mpeg`, `image/png`, `image/jpeg`, `image/svg+xml`). CẤM coi HTTP status 200 là bằng chứng tồn tại file, do Cloudflare Pages SPA router tự động trả về HTTP 200 kèm `text/html` khi đường dẫn tài nguyên không tồn tại (SPA fallback 404).
   - **Chiến lược Quản Trị Nội Dung Cũ (No Legacy Migration & Phân Lập Staged Data)**: Nội dung legacy/staged trước pipeline mới (kể cả các thư mục tuần W35–W46, W73–W82, W125–W134 hiện có trong `src/data/weeks`) KHÔNG được tái sử dụng hay di trú (migration); mọi tuần mới phải được sinh mới 100% từ Blueprint v2 và vượt qua Gate 19 Schema Validation. Bản cũ chỉ được gỡ bỏ khi bản thay thế mới của đúng tuần đó đã được nghiệm thu và duyệt chính thức, thông qua một hành động quản trị thay đổi (change control) riêng biệt để bảo toàn toàn vẹn lịch sử Git (git history). Trong thời gian chờ hoàn thiện tuần mới, hotfix giới hạn số tuần hiển thị trên UI tại `TOTAL_TRIPS = 34` (`src/components/questmap/QuestSidebar.jsx:12` và `src/pages/PassportTracker.jsx:12`) tiếp tục được giữ nguyên.
   - **Nợ Kỹ Thuật UI Playback Part 4 W34**: Audio `listening_p4_full.mp3` của W34 đã hiện diện đầy đủ trên đĩa và CDN live, nhưng chưa thể kiểm thử phát trực tiếp trên UI do cơ chế thi tuần tự của Boss Castle Cycle 2 hiển thị Part 3 Listening. Hạng mục này được ghi nhận vào Sổ Nợ Kỹ Thuật (SOP Appendix & Backlog) và gắn vào kịch bản kiểm thử tự động của Gate 15 Cycle 3 spec.

### §22. Quản Lý Dung Lượng & Contact Sheet Mỹ Thuật
- Ảnh thumbnail/cards nén WebP/JPG tối ưu ($\le 250$ KB/ảnh). Ảnh Story Writer $\le 400$ KB/ảnh.
- Audio MP3 nén bitrate 64–128 kbps mono/stereo tối ưu cho học trực tuyến.
- Mỗi tuần sản xuất phải sinh Contact Sheet ảnh chụp trực quan để hội đồng sư phạm nghiệm thu mỹ thuật.

### §23. Quy Trình Quản Trị Thay Đổi (Governance Change Control)
- CẤM TUYỆT ĐỐI sửa trực tiếp các file hiến pháp bị khóa hash (`AGENTS.md`, `docs/ARCHITECTURE_CURRENT.md`, `docs/WEEK_PRODUCTION_SOP.md`).
- Mọi đề xuất thay đổi phải lập thành bản nháp Patch Diff (`governance_amendment_draft.diff`), kiểm tra bằng `git apply --check` trên bản sao tạm, và chỉ được áp dụng khi có phê duyệt chính thức bằng văn bản của Owner và Claude QA.
