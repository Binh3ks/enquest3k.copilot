# 🌟 MASTER UPGRADE & MASS PRODUCTION ROADMAP (W33 — W72)

**Status:** 🔒 **WEEK 33 GOLDEN MASTER 2.0 LOCKED & FROZEN** (Commit `11bffef0`)  
**Target:** 15/15 Cambridge A2 Flyers Shields Standard across all 39 weeks (W34 to W72)  
**Standard Version:** 2026-08-18 | **Architectural Tier:** Tier 4 Scaled Swarm Pipeline (All 4 Hubs + Frozen Audio + Balanced Subtabs)

---

## 1. W33+ CANONICAL ARCHITECTURE BASELINE (100% GOLDEN MASTER LOCKED)

* **Source of Truth**: Live W33+ UI (`https://app.bkbacademy.vn/week/33/hub/1-4`) and active router bindings (`src/App.jsx:897-910`).
* **Canonical 4-Hub Structure**:
  - `Hub 1 = World Discovery` (`WorldDiscoveryHub.jsx` — 5 Sub-tabs: Story Time, Word Match P1, Chat Box P2, Fill Blanks P4, Story Detective P5, Check Mode P6)
  - `Hub 2 = Arena & Listening` (`ArenaHub.jsx` — Listening Missions P1–P5 + Arena Games: Sentence Builder, Bar Model, Flash Arena)
  - `Hub 3 = Writing Studio` (`WritingStudioHub.jsx` — 3-Picture Story Scripting P7 + Word Bank Pills + Dictation Engine P2)
  - `Hub 4 = Nova Talk Show` (`NovaTalkShowHub.jsx` — Podcast Shadowing Phases 1 & 2 + Find Diff P1, Cue-Card P2, Picture Story P3, Personal Q&A P4)
* **Legacy W01–W32 Excluded**: `daily_watch.js`, `week_NN_real.js`, `weeks_easy/`, and 14 legacy station routes belong strictly to pre-W33 architecture and are **NOT USED IN W33+**.

---

## 2. CAMBRIDGE A2 FLYERS 15-SHIELD COVERAGE MATRIX

| Hub Name | Primary ESL Skill Domain | Cambridge Flyers Exam Tasks Covered | UI Interaction Engine & Component |
|---|---|---|---|
| **Hub 1** | Reading & Context | R&W Part 1, Part 2, Part 3, Part 4, Part 5, Part 6 | `WordBankMatchingGrid`, `ChoiceGrid`, `ReadingPart3`, `InlineTextClozeDropdown`, `TextExtractionCompleter`, `OpenClozeCompleter` |
| **Hub 2** | Listening & Speed Logic | Listening Part 1, Part 2, Part 3, Part 4, Part 5 & Arena Games | `SVGLineMatcher`, `NotepadNoteCompleter`, `VisualMatchingAH`, `PictureTickCards`, `SVGColorAndWrite`, `SentenceBuilderBattle`, `BarModelQuest`, `FlashArena` |
| **Hub 3** | Composition & Scaffolding | R&W Part 7 & Listening Part 2 | `WritingStudioHub` (3-Picture Pixar panels, Word Bank Pills, Word/Verb Rule Trackers) & `DictationEngine` |
| **Hub 4** | Speaking & Shadowing | Speaking Part 1, Part 2, Part 3, Part 4 & Audio Shadowing | `DualPictureCompare`, `InformationExchangeP2`, `NovaTalkShowHub` (5-Picture Story Continuation & 5-Turn Voice Q&A Dialogue), `PodcastShadowing` |

---

## 3. MULTI-FREQUENCY ASSESSMENT & MOCK TEST ROADMAP (W33 → W72)

```
W33 ── W37 ── W41 ── W45 ── W48 ── W52 ── W56 ── W60 ── W64 ── W68 ── W72
       ▲      ▲      ▲      ▲      ▲      ▲      ▲      ▲      ▲      ▲
    MOCK-1 MOCK-2 MOCK-3 MOCK-4 MOCK-5 MOCK-6 MOCK-7 MOCK-8 MOCK-9 MOCK-10
    (Mini) (Mini) (Mini) (Multi)(FULL) (Mini) (Mini) (Mini) (Multi)(CAPSTONE)
```

| Mock ID | Mốc Tuần | Loại Hình | Nội Dung Đánh Giá Tích Lũy | Mục Tiêu Chuẩn Đầu Ra |
|---|---|---|---|---|
| **MOCK-01** | **W37** | Mini Diagnostic Mock | W33–W37 (Quá khứ tiếp diễn vs Quá khứ đơn, Động từ BQT nhóm 5) | Đánh giá phản xạ ngữ pháp và độ chính xác 10 Gold Chunks. |
| **MOCK-02** | **W41** | Mini Diagnostic Mock | W33–W41 (STEM Vật lý, So sánh hơn/nhất, Tọa độ nối dây SVG) | Đánh giá khả năng nghe chi tiết và phân tích sơ đồ toán Bar Model. |
| **MOCK-03** | **W45** | Mini Diagnostic Mock | W33–W45 (Lịch sử/Văn minh cổ đại, Thể bị động quá khứ, Từ nối) | Đánh giá khả năng hiểu bài đọc dài và hội thoại 8 lựa chọn A-H. |
| **MOCK-04** | **W48** | Expanded Cumulative Mock | W33–W48 (Đánh giá chuyển giao 4 kỹ năng nửa đầu A2 Flyers) | Báo cáo radar năng lực 4 kỹ năng chi tiết gửi phụ huynh. |
| **MOCK-05** | **W52** | **Full Flyers Mock (Cycle 1)** | **W33–W52 (Kỳ thi thử toàn diện 16 Phần chuẩn Cambridge)** | **Dự báo số Khiên Flyers đạt được (Baseline Readiness: 13-14/15 Khiên).** |
| **MOCK-06** | **W56** | Mini Diagnostic Mock | W33–W56 (Khoa học môi trường, Nguyên nhân - kết quả, Đặt câu hỏi) | Đánh giá kỹ năng tự đặt câu hỏi (Candidate Question Formation). |
| **MOCK-07** | **W60** | Mini Diagnostic Mock | W33–W60 (Văn hóa & Lễ hội toàn cầu, Câu phức, Ghép tranh 8 lựa chọn) | Đánh giá độ trôi chảy khi miêu tả sự khác biệt giữa 2 bức tranh. |
| **MOCK-08** | **W64** | Mini Diagnostic Mock | W33–W64 (Công nghệ & Vũ trụ, Mệnh đề quan hệ, Shadowing đoạn văn) | Đánh giá ngữ điệu phát âm và năng lực kể chuyện liên hoàn 5 bức tranh. |
| **MOCK-09** | **W68** | Expanded Cumulative Mock | W33–W68 (Tổng duyệt tăng tốc 16 dạng bài trước tốt nghiệp) | Tối ưu hóa điểm số và khắc phục các lỗ hổng kỹ năng cuối cùng. |
| **MOCK-10** | **W72** | **Full Flyers Mock (Cycle 2)** | **W33–W72 (Kỳ thi tốt nghiệp Capstone 3 năm Tiểu học)** | **Đạt 15/15 Khiên Cambridge A2 Flyers 100% $\rightarrow$ Cấp chứng nhận tốt nghiệp sẵn sàng chuyển tiếp A2 Key / B1 Preliminary.** |

---

## 4. 4-STAGE PEDAGOGICAL LADDER & CONTENT RECYCLING

1. **Stage 1: Learn (Discovery & Scaffolding)**: Học sinh khám phá ngữ liệu qua 5 cảnh Webtoon 3D Pixar, Hotspots phát âm tức thì, Word Bank Pills hỗ trợ gợi ý.
2. **Stage 2: Practice (Drills & Speed Arena)**: Luyện tập phản xạ nhanh 30s Flash Arena, Sentence Builder Battle ghép câu cú pháp, Podcast Shadowing 2 giai đoạn.
3. **Stage 3: Format Familiarization (Cambridge Exam Formats)**: Làm quen với cấu trúc đề thi chính thức: Nối định nghĩa 15 từ, Hội thoại 8 lựa chọn A-H, Cloze 10 chỗ trống, Trích xuất 1-4 từ, Kéo dây SVG, Tô màu Vector.
4. **Stage 4: Check (Exam Simulation)**: Chế độ kiểm tra độc lập (Check Mode) tắt toàn bộ gợi ý, tính giờ, chấm điểm tự động và ghi nhận tiến độ vào `learnerProgressService`.

---

## 5. POST-W72 CONTINUITY HORIZON (W73 → W156)

* **W73–W114 (A2 Key for Schools / KET Bridge)**: Mở rộng bài đọc học thuật, viết thư điện tử và bài luận 80+ từ, đối thoại tranh biện.
* **W115–W156 (B1 Preliminary / PET Pathway)**: Làm chủ hoàn toàn cấu trúc ngữ pháp nâng cao (Hiện tại hoàn thành, Câu điều kiện, Gián tiếp) và kỹ năng thuyết trình tự do.
