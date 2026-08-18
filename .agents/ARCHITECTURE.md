> **Tài liệu chuẩn mực bắt buộc cho toàn bộ chu kỳ phát triển W33–W72.**
> **Cập nhật:** 2026-08-18 | **Trạng thái:** 🔒 100% Golden Standard 2.0 Locked & Frozen (All 4 Hubs + CLIL/Grammar/PBL)

---

## 🔴 1. QUY TẮC BẤT BIẾN: PHÂN TÁCH 2 KIẾN TRÚC

```
┌───────────────────────────────────────┐         ┌────────────────────────────────────────┐
│        W01–W32 (LEGACY STATION)       │   ◄-X-► │      W33–W72 (CAMBRIDGE 4-HUB SUITE)   │
├───────────────────────────────────────┤         ├────────────────────────────────────────┤
│ • 14+ Stations riêng lẻ               │         │ • 4 Hubs tích hợp hoàn chỉnh           │
│ • Easy / Advanced / Full (3 modes)    │         │ • 1 FULL MODE duy nhất                 │
│ • 2 Folders (weeks/ + weeks_easy/)    │         │ • 1 Folder duy nhất (src/data/weeks/)  │
│ • daily_watch.js, week_NN_real.js     │         │ • Không daily_watch, không AI Tutor cũ │
│ • code_quality_gate.sh (48 checks)    │         │ • validate_week.mjs (6 Gatekeepers)    │
└───────────────────────────────────────┘         └────────────────────────────────────────┘
```

> ⚠️ **CẢNH BÁO CHO TOÀN BỘ AI AGENTS**: Tuyệt đối không áp dụng luật, công cụ kiểm tra (validator), hoặc cấu trúc thư mục của W01–32 cho W33+.

---

## 🏛️ 2. KIẾN TRÚC 4 HUBS CHUẨN MỰC (100% LIVE UI & DATA)

Hệ thống W33+ bao phủ toàn diện **15/15 Khiên (16/16 Parts)** của chứng chỉ **Cambridge A2 Flyers** qua 4 Hubs:

```
                                  ENGQUEST3K CAMBRIDGE SUITE (W33+ GOLDEN STANDARD 2.0)
                                                  │
       ┌──────────────────────────┬───────────────┴──────────────┬──────────────────────────┐
       ▼                          ▼                              ▼                          ▼
┌───────────────┐       ┌────────────────────┐         ┌───────────────────┐      ┌────────────────────┐
│     HUB 1     │       │       HUB 2        │         │       HUB 3       │      │       HUB 4        │
│WORLD DISCOVERY│       │ ARENA & LISTENING  │         │  WRITING STUDIO   │      │   NOVA TALK SHOW   │
└───────┬───────┘       └─────────┬──────────┘         └─────────┬─────────┘      └─────────┬──────────┘
        │                         │                              │                          │
  • 🌍 Knowledge Explorer   • 🎧 Listening Missions:       • 📝 Story Writing         • 🎙️ Podcast Shadowing:
    (CLIL Science/Social)     - 🔗 Draw Lines (List P1)      (R&W P7: 3 Pictures,       - Phase 1: Câu ngắn
  • 📖 Story Time             - 📋 Secret Notes (List P2)    20-50w, Word Pills)        - Phase 2: Đoạn văn
  • 🧩 Word Match (R&W P1)    - 🔍 Item Hunt (List P3)     • 🎧 Dictation Engine      • 🔍 Find Diff (Speak P1)
  • 💬 Chat Box (R&W P2)      - 🖼️ Picture Quiz (List P4)    (Listening P2 Notes)     • ❓ Ask & Answer (Speak P2)
  • 📝 Fill Blanks (R&W P4)   - 🎨 Magic Color (List P5)   • 📥 Download Worksheet    • 🖼️ Picture Story (Speak P3)
  • 🕵️ Detective (R&W P5)   • ⚔️ Arena Games:                (Printable A4 PDF +      • 💬 Personal Q&A (Speak P4)
  • 🎯 Check Mode (R&W P6)    - 📘 Learn Grammar (Modal)     PBL Offline Mission)     • 🎤 AI Debate Arena
  • 🔬 Grammar X-Ray          - 🧠 Sentence Builder        • 📊 Narrative Structure     (Discourse Reasoning)
                              - 📐 Bar Model Quest           Analysis (W43+)
                              - ⚡ Flash Arena
                              - 🧪 Science Drag & Drop Lab
```

---

## 📋 3. MA TRẬN 15 KHIÊN CAMBRIDGE FLYERS (ĐÃ ĐẠT 100% TẠI W33)

| Kỹ Năng | Khiên | Cambridge Part | Interaction & Component UI | Data Key trong Week Schema | Trạng Thái |
|:---|:---:|:---|:---|:---|:---:|
| **Listening** | **1** | Part 1 (Draw Lines) | `SVGLineMatcher` (Tọa độ Pin Calibrated) | `listeningHub.listening_p1` | ✅ 100% |
| | **2** | Part 2 (Note Completion) | `NotepadNoteCompleter` (Ghi chép số/từ) | `listeningHub.dictation` | ✅ 100% |
| | **3** | Part 3 (Matching A-H) | `VisualMatchingAH` (5 items $\rightarrow$ 8 cards) | `listeningHub.listening_p3` | ✅ 100% |
| | **4** | Part 4 (3-Picture Quiz) | `PictureTickCards` (Trắc nghiệm âm thanh 3 ảnh) | `listeningHub.listening_p4_questions` | ✅ 100% |
| | **5** | Part 5 (Color & Write) | `SVGColorAndWrite` (Tô màu Vector + Viết chữ) | `listeningHub.listening_p5` | ✅ 100% |
| **Reading & Writing** | **6** | Part 1 (Word Bank Match) | `WordBankMatchingGrid` (15 từ $\rightarrow$ 10 defs) | `readingHub.rw_part1` | ✅ 100% |
| | **7** | Part 2 (Dialogue A-H) | `ChoiceGrid` (Hội thoại 5 lượt, 8 thẻ A-H) | `readingHub.rw_part2` | ✅ 100% |
| | **8** | Part 3 (Comprehension) | `ReadingPart3` (Đoạn văn + 5 câu hỏi MCQ) | `readingHub.reading_part3_story` | ✅ 100% |
| | **9** | Part 4 (10-Gap Cloze) | `InlineTextClozeDropdown` (10 chỗ trống + Tiêu đề)| `readingHub.rw_part4` | ✅ 100% |
| | **10** | Part 5 (Story Detective)| `TextExtractionCompleter` (Trích xuất 1-4 từ) | `readingHub.rw_part5` | ✅ 100% |
| | **11** | Part 6 (Open Cloze) | `OpenClozeCompleter` (5 ô trống không từ gợi ý) | `readingHub.rw_part_6` | ✅ 100% |
| | **12** | Part 7 (Story Writing) | `WritingStudioHub` (Viết truyện 3 tranh Pixar) | `writingHub.writing` | ✅ 100% |
| **Speaking** | **13** | Part 1 (Find Differences) | `DualPictureCompare` (So sánh 6 điểm khác biệt)| `speakingHub.find_differences` | ✅ 100% |
| | **14** | Part 2 (Ask & Answer) | `InformationExchangeP2` (Thẻ Cue-Card W-H) | `speakingHub.cue_card_prompts` | ✅ 100% |
| | **15** | Part 3 & 4 (Story + Q&A)| `NovaTalkShowHub` (Kể truyện 5 tranh + 5 lượt Q&A) | `speakingHub.picture_story_continuation` | ✅ 100% |

---

## 🎯 4. LỘ TRÌNH ĐÁNH GIÁ & MOCK TEST ĐỊNH KỲ (W33 → W72)

Để đảm bảo học sinh đạt 15/15 Khiên thực tế khi tham gia kỳ thi Cambridge, hệ thống triển khai mô hình **Đánh giá đa tầng (Multi-Frequency Assessment Model)**:

```
W33 ── W37 ── W41 ── W45 ── W48 ── W52 ── W56 ── W60 ── W64 ── W68 ── W72
       ▲      ▲      ▲      ▲      ▲      ▲      ▲      ▲      ▲      ▲
    MOCK-1 MOCK-2 MOCK-3 MOCK-4 MOCK-5 MOCK-6 MOCK-7 MOCK-8 MOCK-9 MOCK-10
    (Mini) (Mini) (Mini) (Multi)(FULL) (Mini) (Mini) (Mini) (Multi)(CAPSTONE)
```

### Chi tiết các mốc Mock Test:

1. **Level 1: Weekly Check Mode (Định kỳ hàng tuần)**:
   - Tích hợp sẵn trong Check Mode của 4 Hubs (Kiểm tra Open Cloze, Fast Speed Arena, Timed Writing, Speaking Check).
2. **Level 2: Mini Diagnostic Mock (Mỗi 4 tuần một lần - 20 phút)**:
   - **MOCK-01 (W37)**: Đánh giá tích lũy W33–W37 (Khối ngữ pháp Quá khứ tiếp diễn & Động từ bất quy tắc nhóm 5).
   - **MOCK-02 (W41)**: Đánh giá STEM Vật lý, So sánh hơn/nhất, Kéo nối đường SVG.
   - **MOCK-03 (W45)**: Đánh giá Lịch sử/Văn minh cổ đại, Thể bị động quá khứ, Từ nối thời gian.
   - **MOCK-06 (W56)**: Đánh giá Khoa học môi trường, Từ nối nguyên nhân - kết quả, Kỹ năng tự đặt câu hỏi.
   - **MOCK-07 (W60)**: Đánh giá Văn hóa thế giới, Câu phức, Ghép tranh 8 lựa chọn A-H.
   - **MOCK-08 (W64)**: Đánh giá Công nghệ & Tương lai, Mệnh đề quan hệ, Ngữ điệu Shadowing đoạn văn.
3. **Level 3: Expanded Cumulative Mock (Cột mốc chuyển giao giai đoạn)**:
   - **MOCK-04 (W48)**: Tổng duyệt nửa đầu A2 Flyers trước khi bước vào kỳ thi thử toàn diện.
   - **MOCK-09 (W68)**: Tổng duyệt tăng tốc 16 dạng bài trước tuần thi tốt nghiệp.
4. **Level 4: Full Flyers Exam Simulation (Đề thi thử chuẩn 16 Phần)**:
   - **MOCK-05 (W52 — Mid-Point Benchmark)**: Thi thử Cambridge Flyers 100% thời gian thực (Listening 25 câu, R&W 44 câu, Speaking 4 phần). Dự báo số khiên (Shields Prediction) & Phân tích điểm yếu gửi phụ huynh.
   - **MOCK-10 (W72 — Final Capstone Graduation Mock)**: Bài thi tốt nghiệp 3 năm Tiểu học. Đạt 15/15 Khiên $\rightarrow$ Cấp chứng nhận tốt nghiệp sẵn sàng chuyển tiếp sang **A2 Key for Schools (KET) & B1 Preliminary (PET)**.

---

## 🚀 5. CHIẾN LƯỢC SẢN XUẤT HÀNG LOẠT (MASS PRODUCTION W34 → W72)

### 📐 5.1. 3 LUẬT THÉP CLIL & QUY CHUẨN GRAMMAR SEEDING (THE W37+ STANDARD)
1. **LUẬT 1: SINGLE ACADEMIC FOCUS (MỘT CHỦ ĐỀ DUY NHẤT)**:
   - Mỗi tuần chỉ được phép chọn MỘT góc nhìn học thuật thuần nhất cho `clil_article`:
     - *Nếu là Science*: Tập trung sâu vào Vật lý, Sinh học, Hóa học (Vd: Lực ma sát, Sự quang hợp, Vòng tuần hoàn nước).
     - *Nếu là Social Studies*: Tập trung vào Địa lý, Lịch sử, Văn hóa (Vd: Thăng Long, Ai Cập cổ đại).
   - ❌ **TUYỆT ĐỐI KHÔNG** trộn lẫn Lịch sử và Sinh học vào cùng 1 bài đọc ("Nồi lẩu thập cẩm").
2. **LUẬT 2: MANDATORY GRAMMAR SEEDING (BẮT BUỘC GIEO NGỮ PHÁP)**:
   - Bài đọc CLIL tại Hub 1 bắt buộc phải cài cắm **từ 3–5 câu sử dụng chính xác cấu trúc Target Grammar của tuần** một cách tự nhiên.
   - Regex trong `target_grammar_regex` phải được tinh chỉnh để soi đúng và chuẩn xác cụm ngữ pháp này trên UI Grammar X-Ray.
3. **LUẬT 3: TÁCH BIỆT INPUT (HUB 1) VÀ OUTPUT (HUB 2, 3, 4)**:
   - **Hub 1 (Knowledge Explorer)**: Chỉ cung cấp Văn bản Đọc (Reading Input) + Giải nghĩa từ vựng + Cấu trúc ngữ pháp.
   - **Hub 2, 3, 4 (Arena, Writing, Speaking)**: Chuyển các khái niệm vừa học ở Hub 1 thành Thực hành & Đề thi thực tế (Math Lab, Drag & Drop Lab, Real-life Writing, AI Debate).

### 🌉 5.2. QUY TẮC "CHIẾC CẦU NỐI" (THEMATIC BRIDGE) CHO CÁC TUẦN HƯ CẤU (W34+)
Khi chủ đề của tuần là Truyện Cổ tích hoặc Ngụ ngôn (Ví dụ W34: *The Ant and the Grasshopper*), **KHÔNG ĐƯỢC** để nhân vật động vật biết nói xuất hiện lộn xộn ở bài thi:
- **Công thức chuyển hóa**: `[TỪ VỰNG CHUNG]` $\rightarrow$ `[HUB 1: Truyện ngụ ngôn + Báo khoa học thực tế]` $\rightarrow$ `[HUB 2, 3, 4: Áp dụng từ vựng vào đời sống con người / đề thi thực tế]`.
- **Hub 1 (Khởi động & Bản lề)**:
  - *Story Time (3D Webtoon)*: Kể truyện hư cấu (*The Ant and the Grasshopper*) để nạp từ vựng (`winter, collect, hungry, prepare, lazy`).
  - *CLIL Article (Khoa học thực tế)*: Báo khoa học sinh học (*How Animals Survive Winter: Hibernation & Food Storage*) — **TUYỆT ĐỐI KHÔNG** nhắc tên nhân vật hư cấu ở đây.
- **Hub 2 (Chuyển hóa sang bối cảnh con người)**:
  - *Singapore Math*: Đếm số lượng thực phẩm tích trữ cho mùa đông của gia đình/siêu thị.
  - *Listening P1-P5*: Bối cảnh chuyến dã ngoại mùa đông của trường học (*A School Winter Trip*).
- **Hub 3 (Writing Studio - R&W P7)**: Câu chuyện đời thường của trẻ em mang cùng bài học đạo đức chuẩn bị (*Tom mải chơi quên mang áo khoác, được bạn Jake chia sẻ khăn ấm*).
- **Hub 4 (Speaking & AI Debate)**: Luyện nói phản biện về quản lý thời gian và sự chuẩn bị (*Doing homework first vs Playing games first*).

### 📁 5.3. Quy trình tạo file chuẩn hóa:
1. **Dữ liệu nguồn (Source of Truth)**: Dựa vào Syllabus 3 năm để lấy Chủ đề, Từ vựng cốt lõi (20 từ), 10 Gold Lexical Chunks, và Trọng tâm Ngữ pháp.
2. **Cấu trúc File Bắt Buộc**:
   - `src/data/weeks/week_NN/reading_hub.js` (Bao gồm `clil_article`, `story_scenes`, `rw_part1`, `rw_part2`, `rw_part4`, `rw_part5`, `rw_part_6`, `check_mode_drills`, `reading_part3_story`)
   - `src/data/weeks/week_NN/listening_hub.js` (Bao gồm `listening_p1-p5`, `grammar_drills`, `grammar_lesson`, `flash_arena`, `singapore_math`, `science_lab`, `target_grammar_regex`)
   - `src/data/weeks/week_NN/writing_hub.js` (Bao gồm `picture_story`, `word_bank_pills`, `pbl_mission`)
   - `src/data/weeks/week_NN/speaking_hub.js` (Bao gồm `find_differences`, `cue_card_prompts`, `picture_story_continuation`, `debate_topics`, `podcast_shadowing`)
   - `src/data/weeks/week_NN/index.js` (Xuất `{ readingHub, listeningHub, writingHub, speakingHub, weekId, title }`)
3. **Cổng kiểm duyệt tự động trước khi Commit (7 Gatekeepers)**:
   ```bash
   node scripts/validate_week.mjs <NN>
   npm run build
   ```

### 🎧 5.4. ĐÓNG BĂNG AUDIO PIPELINE & CHUỖI FALLBACK 3 TẦNG BẤT BIẾN (W33 → W72)
1. **Quy tắc Bắt Buộc Khi Tạo Nội Dung Tuần Mới**:
   - Chạy script tạo 100% file static MP3 cho tuần (`dictation_1-5.mp3`, `listening_p1_target1-5.mp3`, `listening_p2_full.mp3`, `listening_p3_item1-5.mp3`, `listening_p5_inst1-5.mp3`, `read_stem.mp3`, `read_social.mp3`, `explore.mp3` / `clil_*.mp3`).
   - Lưu vào thư mục tĩnh `/public/audio/weekXX/` và tải lên Cloudflare R2 / CDN.
2. **Cơ Chế Phát Âm Thanh 3 Tầng Bảo Vệ**:
   - **Tier 1 (0ms)**: IndexedDB Client Cache (`TTSCache`).
   - **Tier 2 (0-10ms)**: Static MP3 trực tiếp từ Cloudflare R2 / Local Assets (`/audio/weekXX/...`).
   - **Tier 3 (Chỉ kích hoạt khi CDN/R2 sập)**: Google Cloud TTS Direct (`en-US-Journey-F` / `en-US-Neural2-F` / `en-US-Neural2-D`).
   - **Tier 4 (Phòng tuyến cuối cùng)**: Native Browser SpeechSynthesis.
   - ❌ **CẤM**: Client không bao giờ được gọi thẳng API Google TTS Direct ở điều kiện bình thường để tránh phát sinh chi phí và triệt tiêu độ trễ.

---

## 🔭 6. ĐỊNH HƯỚNG MỞ RỘNG SAU W72 (POST-FLYERS HORIZON: W73 → W156)

Kiến trúc 4 Hubs được thiết kế để mở rộng liền mạch lên bậc Trung học cơ sở:
* **W73–W114**: Giai đoạn **A2 Key for Schools (KET Bridge)** — Nâng cao văn bản học thuật và bài viết luận 80+ từ.
* **W115–W156**: Giai đoạn **B1 Preliminary for Schools (PET Pathway)** — Làm chủ hoàn toàn tư duy phản biện tiếng Anh độc lập.
