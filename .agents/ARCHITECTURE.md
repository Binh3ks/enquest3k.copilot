# EngQuest3K — Golden Master Architecture & Long-Term Roadmap (W33 → W72)

> **Tài liệu chuẩn mực bắt buộc cho toàn bộ chu kỳ phát triển W33–W72.**
> **Cập nhật:** 2026-08-17 | **Trạng thái:** 100% Golden Master Locked (Commit `f2f7675d`)

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
                                  ENGQUEST3K CAMBRIDGE SUITE (W33+)
                                                  │
       ┌──────────────────────────┬───────────────┴──────────────┬──────────────────────────┐
       ▼                          ▼                              ▼                          ▼
┌───────────────┐       ┌────────────────────┐         ┌───────────────────┐      ┌────────────────────┐
│     HUB 1     │       │       HUB 2        │         │       HUB 3       │      │       HUB 4        │
│WORLD DISCOVERY│       │ ARENA & LISTENING  │         │  WRITING STUDIO   │      │   NOVA TALK SHOW   │
└───────┬───────┘       └─────────┬──────────┘         └─────────┬─────────┘      └─────────┬──────────┘
        │                         │                              │                          │
  • 📖 Story Time           • 🎧 Listening Missions:       • 📝 Story Writing         • 🎙️ Podcast Shadowing:
  • 🧩 Word Match (R&W P1)    - 🔗 Draw Lines (List P1)      (R&W P7: 3 Pictures,       - Phase 1: Câu ngắn
  • 💬 Chat Box (R&W P2)      - 📋 Secret Notes (List P2)    20-50w, Word Pills)        - Phase 2: Đoạn văn
  • 📝 Fill Blanks (R&W P4)   - 🔍 Item Hunt (List P3)     • 🎧 Dictation Engine      • 🔍 Find Diff (Speak P1)
  • 🕵️ Detective (R&W P5)     - 🖼️ Picture Quiz (List P4)    (Listening P2 Notes)     • ❓ Ask & Answer (Speak P2)
  • 🎯 Check Mode (R&W P6)    - 🎨 Magic Color (List P5)                              • 🖼️ Picture Story (Speak P3)
                          • ⚔️ Arena Games:                                           • 💬 Personal Q&A (Speak P4)
                            - 🧠 Sentence Builder
                            - 📐 Bar Model Quest
                            - ⚡ Flash Arena
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

Mọi tuần sản xuất mới bắt buộc tuân theo quy trình chuẩn hóa:
1. **Dữ liệu nguồn (Source of Truth)**: Dựa vào Syllabus 3 năm để lấy Chủ đề, Từ vựng cốt lõi (20 từ), 10 Gold Lexical Chunks, và Trọng tâm Ngữ pháp.
2. **Cấu trúc File Bắt Buộc**:
   - `src/data/weeks/week_NN/reading_hub.js` (Bao gồm `story_scenes`, `rw_part1`, `rw_part2`, `rw_part4`, `rw_part5`, `rw_part_6`, `check_mode_drills`, `reading_part3_story`)
   - `src/data/weeks/week_NN/listening_hub.js` (Bao gồm `listening_p1`, `listening_p3`, `listening_p4_questions`, `listening_p5`, `dictation`, `shadowing`)
   - `src/data/weeks/week_NN/writing_hub.js` (Wrapper import `writing.js`)
   - `src/data/weeks/week_NN/speaking_hub.js` (Bao gồm `find_differences`, `cue_card_prompts`, `picture_story_continuation`, `shadowing_sentences`, `podcast_shadowing`)
   - `src/data/weeks/week_NN/index.js` (Xuất `{ readingHub, listeningHub, writingHub, speakingHub, weekId, title }`)
3. **Tiêu chuẩn Hình ảnh (Pixar 3D Standard)**:
   - 5 Webtoon scenes (`webtoon_scene_1–5.png`)
   - 3 Writing panels (`writing_panel_1–3.png`)
   - 2 Speaking difference scenes (`wXX_diff_scene_a/b.jpg`)
   - 1 Listening P1 background scene (`wXX_listening_p1_scene.jpg`)
   - 20 Vocab card visuals (`vocab_*.jpg`)
4. **Cổng kiểm duyệt tự động trước khi Commit (6 Gatekeepers)**:
   ```bash
   node scripts/validate_week.mjs <NN>
   npm run build
   ```

---

## 🔭 6. ĐỊNH HƯỚNG MỞ RỘNG SAU W72 (POST-FLYERS HORIZON: W73 → W156)

Kiến trúc 4 Hubs được thiết kế để mở rộng liền mạch lên bậc Trung học cơ sở:
* **W73–W114**: Giai đoạn **A2 Key for Schools (KET Bridge)** — Nâng cao văn bản học thuật và bài viết luận 80+ từ.
* **W115–W156**: Giai đoạn **B1 Preliminary for Schools (PET Pathway)** — Làm chủ hoàn toàn tư duy phản biện tiếng Anh độc lập.
