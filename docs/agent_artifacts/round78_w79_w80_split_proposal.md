# ĐỀ XUẤT TÁCH DỮ LIỆU W79 / W80: SOURCE B NGUYÊN VĂN VS SUPPLEMENT (ROUND 78 — TASK D.9)

> **NGUYÊN TẮC BẮT BUỘC (TRÍCH SOURCE B PART II, KHÔNG SỬA PRODUCTION/STAGING):**
> - Chỉ những gì ghi trực tiếp trong `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` mới được xem là **SOURCE B**. 
> - Mọi thành phần không có trong `L632–L637` (bao gồm toàn bộ Toán học của W79–80 và 13 từ vựng mở rộng để đủ chuẩn 20 từ của app) BẮT BUỘC đánh dấu **`SUPPLEMENT`**, nêu rõ nguồn/lý do và ghi người duyệt = **`Owner chờ duyệt`** (theo Quyết định Owner (3)).

## 1. Nguyên Văn Source B Cho Khối W79–80 (Kèm Ranh Giới W78 & W81)

- Ranh giới trước — W78 (`L623–L631`): `Topic (Math)` = `Collecting Data. (Toán: Thu thập dữ liệu.)`
- **Khối W79–80 (`L632–L637`):**
```text
632: 	•	Weeks 79-80: Review & Micro-Debate 2 (Tuần 79-80: Ôn tập & Tranh luận nhỏ 2)
633: 	•	Topic: "Space Exploration vs. Earth Fix". (Chủ đề: Khám phá Vũ trụ hay Sửa chữa Trái đất?)
634: 	•	Activity: Micro-Debate. (Hoạt động: Tranh luận nhỏ.)
635: 	•	Skill Focus: Rebuttal Intro ("Yes, but..."). (Kỹ năng: Giới thiệu Phản biện.)
636: 	•	Grammar Review: Passive Voice, Conditionals, Comparatives.
637: 	•	Vocabulary Focus: space, earth, money, spend, fix, problem, important.
```
- Ranh giới sau — W81 (`L638–L646`): `Topic (Math)` = `Representing Data. (Toán: Biểu diễn Dữ liệu.)`
- Kiểm tra động các trường Toán trong `L632–L637`: `Topic (Math)` = `KHÔNG CÓ` | `Key Learning Outcome (Math)` = `KHÔNG CÓ` | `Math Vocabulary` = `KHÔNG CÓ` -> **Source B có ZERO nội dung Toán cho W79 và W80.**

## 2. Hiện Trạng Đọc Từ Đĩa Trước Khi Chỉnh Sửa (Chỉ Đọc)

| Thư Mục | `reading_hub.theme` | `blueprint.theme` | `isFullMock` / `mockFormat` |
| :--- | :--- | :--- | :--- |
| Production W79 (`src/data/weeks/week_79`) | Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate | The Industrial Revolution | false / none |
| Staged W79 (`docs/agent_artifacts/staging/week_79`) | The Industrial Revolution | Space Exploration vs. Earth Fix | false / none |
| Production W80 (`src/data/weeks/week_80`) | Supply, Demand & Market Prices / Math: Market Equilibrium Graphs | Supply, Demand & Market Prices | true / pet |
| Staged W80 Mock (`docs/agent_artifacts/staging/week_80_mock`) | Supply, Demand & Market Prices / Math: Market Equilibrium Graphs | Supply, Demand & Market Prices / Math: Market Equilibrium Graphs | true / pet |

## 3. Bảng Tách Source B vs SUPPLEMENT Cho W79 & W80 (Đề Xuất)

| Hạng Mục / Trường Dữ Liệu | Phân Loại | Giá Trị Đề Xuất Cho W79 & W80 | Nguồn / Tham Chiếu | Lý Do Bổ Sung (Nếu SUPPLEMENT) | Người Duyệt |
| :--- | :---: | :--- | :--- | :--- | :---: |
| **Tiêu đề chu kỳ chung (Title)** | **SOURCE B** | `Review & Micro-Debate 2` | Source B Part II `L632` | — (Nguyên văn Source B) | Đã chốt (Source B) |
| **Chủ đề trọng tâm (Topic)** | **SOURCE B** | `"Space Exploration vs. Earth Fix". (Chủ đề: Khám phá Vũ trụ hay Sửa chữa Trái đất?)` | Source B Part II `L633` | — (Nguyên văn Source B) | Đã chốt (Source B) |
| **Hoạt động cốt lõi (Activity)** | **SOURCE B** | `Micro-Debate. (Hoạt động: Tranh luận nhỏ.)` | Source B Part II `L634` | — (Nguyên văn Source B) | Đã chốt (Source B) |
| **Kỹ năng phản biện (Skill Focus)** | **SOURCE B** | `Rebuttal Intro ("Yes, but..."). (Kỹ năng: Giới thiệu Phản biện.)` | Source B Part II `L635` | — (Nguyên văn Source B) | Đã chốt (Source B) |
| **Ngữ pháp (Grammar Review)** | **SOURCE B** | `Passive Voice, Conditionals, Comparatives.` | Source B Part II `L636` | — (Nguyên văn Source B) | Đã chốt (Source B) |
| **Từ vựng cốt lõi (7 từ)** | **SOURCE B** | `space, earth, money, spend, fix, problem, important` | Source B Part II `L637` | — (Nguyên văn 7/7 từ Source B) | Đã chốt (Source B) |
| **Từ vựng bổ sung (13 từ để đủ 20 từ)** | **SUPPLEMENT** | `explore, planet, budget, environment, pollution, poverty, research, satellite, invest, solution, priority, debate, evidence` | Từ vựng học thuật B1/PET chủ đề Space vs Earth Debate | Source B chỉ cho 7 từ tại `L637`; schema app (`vocab.js` / SRS 20 từ) yêu cầu 20 từ/tuần (dùng chung bộ từ lõi hoặc phân vai W79/W80; bài đọc phải đạt >= 60%). | Owner chờ duyệt |
| **Phân vai W79 vs W80 trong 2 tuần liên tiếp** | **SUPPLEMENT** | **W79**: `Review & Micro-Debate 2 (Part 1: Pros/Cons & Passive/Comparatives)`<br>**W80**: `Review & Micro-Debate 2 (Part 2: Rebuttal "Yes, but..." & Conditionals)` *(tách khỏi M15 Mock)* | Source B gộp 2 tuần trong 1 khối `Weeks 79-80` (L632–637) | Source B chưa chia chi tiết ngày/tuần riêng cho W79 và W80; tách 2 pha để tránh trùng lặp bài đọc/hội thoại nhưng vẫn giữ nguyên chủ đề gốc `Space Exploration vs. Earth Fix`. | Owner chờ duyệt |
| **Toàn bộ Singapore Math (W79: 5 bài, W80: 5 bài)** | **SUPPLEMENT** | **100% SUPPLEMENT**: Ôn tập tỷ lệ / biểu đồ / ngân sách gắn ngữ cảnh phân bổ ngân sách `Space Exploration vs. Earth Fix` (kế thừa Unit 10 Math từ W78 Surveys -> trước W81 Graphing Data) | **Source B L632–637 có ZERO dòng Toán** (xác nhận từ file: không có `Topic (Math)`, `Key Learning Outcome (Math)`, `Math Vocabulary`) | Kiến trúc 15-Quest/4-Hub bắt buộc `skill_practice_hub.singapore_math` có 5 bài/tuần rotary; phải gắn nhãn `SUPPLEMENT` rõ ràng và KHÔNG được tự coi là chuẩn Source B. | Owner chờ duyệt |
| **Nội dung 4 Hubs chi tiết (Story, CLIL, Listening Parts, Writing, Video Challenge)** | **SUPPLEMENT** | Kịch bản 5 scenes, bài đọc CLIL 150–250 từ (>= 60% target vocab), Action Lab 3 scenarios, Audio script & câu hỏi | Sinh theo khuôn mẫu 15 Quests từ khung Topic/Grammar Source B | Source B chỉ là syllabus đề mục 6 dòng, không chứa văn bản thô từng station. | Owner chờ duyệt |

## 4. Ghi Chú Riêng Về Độ Phủ Từ Vựng Bài Đọc & Tách Mock W80

- Với 7 từ Source B (`space, earth, money, spend, fix, problem, important`) + 13 từ SUPPLEMENT = 20 từ mục tiêu, **bài đọc `reading_hub.js` của cả W79 và W80 phải chứa >= 60%** từ vựng (cụ thể: **>= 5/7 từ Source B** — khuyến nghị **7/7** — và **>= 12/20 từ tổng**).
- Do `src/data/weeks/week_80` hiện đang chứa bản merge của **Mock M15 (PET)** (khớp với `docs/agent_artifacts/staging/week_80_mock`), khi Owner kích hoạt lịch xen kẽ `156 + 34`, thư mục nội dung học của W80 (`Review & Micro-Debate 2 Part 2`) sẽ nằm ở tuần nội dung W80 riêng biệt, còn Mock M15 tách ra slot mock chèn sau W80.
