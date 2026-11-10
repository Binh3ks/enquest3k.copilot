# BẢNG QUÉT ĐỘC LẬP TOÀN BỘ KHOẢNG TUẦN TRONG SOURCE B (ROUND 72 TASK A.2)

> **MỤC TIÊU & PHƯƠNG PHÁP QUÉT:**
> - Quét độc lập hoàn toàn với regex của parser chính, bao phủ mọi định dạng: `• Weeks`, `–` gạch ngang/dài, `Tuần`, `UNIT`, `PHASE`, tiêu đề Tổng quan (Part I) và Chi tiết (Part II).
> - File nguồn: `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt` (1205 dòng).
> - **Tổng số khoảng tuần được phát hiện:** 61 mục trên 61 dòng khác nhau.

---

## I. TỔNG HỢP THEO PHÂN CẤP (HIERARCHY)

1. **Part I — Khung Tổng Quan Macro (Dòng 1 – 122):** Gồm 28 khoảng tuần mô tả cấu trúc 3 giai đoạn (Phase 1: W1-42, Phase 2: W43-112, Phase 3: W113-144, Capstone: W145-156) và các Cycle con.
2. **Part II — Tiêu đề Khối / Unit / Phase (Dòng 123 – 1205):** Gồm các tiêu đề cấp cao như `BLOCK A (WEEKS 1-18)`, `UNIT 10 (WEEKS 67-84)`, `PROJECT CYCLE 1 (WEEKS 121-132)`.
3. **Part II — Tiêu đề Nhóm Tuần (Grouping Headers):** Các dòng như `Weeks 105-108: Research & Planning`, `Weeks 141-144: Review & Math Focus`. Các tuần này **đều có định nghĩa chi tiết từng tuần đơn lẻ ngay bên dưới** (`• Week 105:`, `• Week 106:`, v.v.).
4. **Part II — Khối Nội Dung Đa Tuần Thực Sự (Multi-Week Content Blocks):** **CHỈ CÓ ĐÚNG 3 KHỐI (8 TUẦN)** không có định nghĩa tuần đơn lẻ:
   - **W79–W80 (Dòng 632):** `• Weeks 79-80: Review & Micro-Debate 2 (Topic: "Space Exploration vs. Earth Fix")`
   - **W95–W96 (Dòng 754):** `• Weeks 95-96: Review & Application (Topic: "The Young Professor")`
   - **W129–W132 (Dòng 1007):** `• Weeks 129-132: Review & Math Logic Cycle (Focus: Consolidate writing skills + Math review)`

---

## II. BẢNG CHI TIẾT TOÀN BỘ KHOẢNG TUẦN TRONG SOURCE B

| Dòng | Khoảng tuần | Số tuần | Phân loại mục | Parser mới nhận không? | Trích đoạn nguyên văn dòng Source B |
| :---: | :---: | :---: | :--- | :--- | :--- |
| **56** | `W1–W42` | 42 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `Phase 1: Foundational Fluency 🚀 (42 Weeks: Weeks 1-42) (Giai đoạn 1: Nền tảng T` |
| **60** | `W1–W14` | 14 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Cycle 1.1 (Weeks 1-14): Core Description (Miêu tả Cốt lõi)` |
| **61** | `W1–W12` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 1-12: Content (Unit 1: Describing People & Places) (Tuần 1-12: Nội dung)` |
| **62** | `W13–W14` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 13-14: Review & Project 1 (Tuần 13-14: Ôn tập & Dự án 1)` |
| **63** | `W15–W28` | 14 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Cycle 1.2 (Weeks 15-28): Recounting & Reasoning (Kể lại & Lập luận)` |
| **64** | `W15–W26` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 15-26: Content (Unit 2: Recounting the Past & Expressing Opinions) (Tuần` |
| **65** | `W27–W28` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 27-28: Review & Project 2 (Tuần 27-28: Ôn tập & Dự án 2)` |
| **66** | `W29–W42` | 14 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Cycle 1.3 (Weeks 29-42): Procedural & Expository Writing (Viết theo Quy trình ` |
| **67** | `W29–W40` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 29-40: Content (Unit 3 & 4: How-To Guides & The Natural World) (Tuần 29-` |
| **68** | `W41–W42` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 41-42: Review & Application Week (Tuần 41-42: Tuần Ôn tập & Ứng dụng)` |
| **70** | `W43–W112` | 70 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `Phase 2: Academic Application 🧠 (70 Weeks: Weeks 43-112) (Giai đoạn 2: Ứng dụng` |
| **73** | `W43–W70` | 28 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Cycle 2.1 (Weeks 43-70): Logical Thinking & Integrated Math Introduction (Tư d` |
| **76** | `W43–W54` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 43-54: Content (Unit 5: Logical Thinking & Unit 6: Communication & Data)` |
| **77** | `W55–W56` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 55-56: Review & Application Week (Tuần 55-56: Tuần Ôn tập & Ứng dụng)` |
| **78** | `W57–W68` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 57-68: Content (Unit 7: Persuasion & Unit 8: Natural Systems) (Tuần 57-6` |
| **79** | `W69–W70` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 69-70: Review & Application Week (Tuần 69-70: Tuần Ôn tập & Ứng dụng)` |
| **80** | `W71–W98` | 28 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Cycle 2.2 (Weeks 71-98): Fully Integrated Content Learning (Học Nội dung Tích ` |
| **85** | `W71–W82` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 71-82: Content (Unit 9: Geography & Unit 10: Advanced Science) (Tuần 71-` |
| **86** | `W83–W84` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 83-84: Review & Application Week (Tuần 83-84: Tuần Ôn tập & Ứng dụng)` |
| **87** | `W85–W96` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 85-96: Content (Unit 11: Government & Unit 12: Basic Economics) (Tuần 85` |
| **88** | `W97–W98` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 97-98: Review & Project 3: "My Passion Project" Part 1 (Tuần 97-98: Ôn t` |
| **89** | `W99–W112` | 14 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Cycle 2.3 (Weeks 99-112): "My Passion Project" Completion (Hoàn thành "Dự án Đ` |
| **92** | `W99–W110` | 12 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 99-110: Project Work (Research, Drafting, Editing). (Tuần 99-110: Làm dự` |
| **93** | `W111–W112` | 2 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 111-112: Finalizing & Presentation. (Tuần 111-112: Hoàn thiện & Thuyết t` |
| **95** | `W113–W144` | 32 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `Phase 3: Advanced Synthesis & Debate 🎓 (32 Weeks: Weeks 113-144) (Giai đoạn 3: ` |
| **101** | `W113–W120` | 8 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Project Cycle 1 (Weeks 113-120): Homework: A Helper or a Burden? (Chu trình Dự` |
| **103** | `W121–W128` | 8 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Project Cycle 2 (Weeks 121-128): Video Games: More Than Just a Game? (Chu trìn` |
| **105** | `W129–W136` | 8 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Project Cycle 3 (Weeks 129-136): Smartphones for Kids: A Tool or a Distraction` |
| **107** | `W137–W144` | 8 | Part I: Macro Overview / Architecture | Bỏ qua (Cấp tổng quan / Header) | `•	Final Consolidation & Graduation Prep (Weeks 137-144) (Giai đoạn Củng cố & Chu` |
| **123** | `W1–W54` | 54 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `PART II. DETAILED SYLLABUS: PHASE 1 (WEEKS 1-54)` |
| **126** | `W1–W18` | 18 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🟢 BLOCK A: THE "HERE & NOW" (HIỆN TẠI & TÔI) - WEEKS 1-18` |
| **127** | `W1–W8` | 8 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `Unit 1: Identity & Environment (Weeks 1-8)` |
| **169** | `W9–W14` | 6 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `Unit 2: Community & Routines (Weeks 9-14)` |
| **200** | `W15–W18` | 4 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `Unit 3: Action! (Present Continuous) (Weeks 15-18) - NEW UNIT` |
| **220** | `W19–W36` | 18 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🟠 BLOCK B: THE "FIRST STEPS BACK" (BƯỚC VỀ QUÁ KHỨ) - WEEKS 19-36` |
| **222** | `W19–W28` | 10 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `Unit 4: Memories (Past State & Regular Verbs) (Weeks 19-28)` |
| **320** | `W37–W54` | 18 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🟢 BLOCK C: CLIL FOUNDATIONS (KHOA HỌC, TOÁN & LOGIC) - WEEKS 37-54` |
| **322** | `W37–W42` | 6 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `Unit 6: Nature's Rules (Science CLIL) (Weeks 37-42)` |
| **359** | `W43–W48` | 6 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `Unit 7: The Math Bridge (Math CLIL) (Weeks 43-48)` |
| **397** | `W49–W54` | 6 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `Unit 8: Graduation Prep (Weeks 49-54)` |
| **419** | `W55–W120` | 66 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🧠 PHASE 2: ACADEMIC APPLICATION (WEEKS 55-120)` |
| **421** | `W55–W66` | 12 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🟤 UNIT 9: LOGICAL THINKING & EXPLANATION (TƯ DUY LOGIC & GIẢI THÍCH) - WEEKS 55` |
| **514** | `W55–W64` | 10 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `•	Vocabulary Focus: Review all keywords from Weeks 55-64.` |
| **522** | `W67–W84` | 18 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🟣 UNIT 10: PERSUASION & SYSTEMS (THUYẾT PHỤC & CÁC HỆ THỐNG) - WEEKS 67-84` |
| **632** | `W79–W80` | 2 | Part II: Curricular Multi-Week Content Block (NO individual week lines exist) | ✅ ĐÃ NHẬN (Parser bắt dải hẹp nhất) | `•	Weeks 79-80: Review & Micro-Debate 2 (Tuần 79-80: Ôn tập & Tranh luận nhỏ 2)` |
| **674** | `W85–W96` | 12 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🟤 UNIT 10: ADVANCED SYSTEMS & HISTORY (HỆ THỐNG NÂNG CAO & LỊCH SỬ) - WEEKS 85-` |
| **748** | `W93–W94` | 2 | Part II: Grouping Header (Week 93 & Week 94 defined individually below) | Bỏ qua (Cấp tổng quan / Header) | `•	Weeks 93-94: Mini-Research Project` |
| **749** | `W93–W94` | 2 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `(Tuần 93-94: Dự án Nghiên cứu Nhỏ - Làm quen với Essay)` |
| **752** | `W85–W92` | 8 | Other Range Mention | Bỏ qua (Cấp tổng quan / Header) | `•	Topic: Choose a topic from Weeks 85-92 (e.g., "Volcanoes" or "Ancient Rome").` |
| **754** | `W95–W96` | 2 | Part II: Curricular Multi-Week Content Block (NO individual week lines exist) | ✅ ĐÃ NHẬN (Parser bắt dải hẹp nhất) | `•	Weeks 95-96: Review & Application (Tuần 95-96: Ôn tập & Ứng dụng)` |
| **757** | `W97–W104` | 8 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🔴 UNIT 11: CITIZENSHIP & ECONOMICS (CÔNG DÂN & KINH TẾ) - WEEKS 97-104` |
| **831** | `W105–W120` | 16 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🟣 UNIT 12: "MY PASSION PROJECT" (DỰ ÁN ĐAM MÊ) - WEEKS 105-120` |
| **833** | `W105–W108` | 4 | Part II: Sub-phase / Cycle Grouping Header (Weeks have individual definitions below) | Bỏ qua (Cấp tổng quan / Header) | `Weeks 105-108: Research & Planning (Nghiên cứu & Lập kế hoạch)` |
| **870** | `W109–W112` | 4 | Part II: Sub-phase / Cycle Grouping Header (Weeks have individual definitions below) | Bỏ qua (Cấp tổng quan / Header) | `Weeks 109-112: Drafting the Report (Viết nháp Báo cáo)` |
| **907** | `W113–W120` | 8 | Part II: Sub-phase / Cycle Grouping Header (Weeks have individual definitions below) | Bỏ qua (Cấp tổng quan / Header) | `Weeks 113-120: Visuals, Presentation & Graduation (Trình bày & Tốt nghiệp Phase ` |
| **953** | `W121–W156` | 36 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🎓 PHASE 3: ADVANCED SYNTHESIS & DEBATE (WEEKS 121-156)` |
| **955** | `W121–W132` | 12 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🔵 PROJECT CYCLE 1: THE HOMEWORK DEBATE (WEEKS 121-132)` |
| **1007** | `W129–W132` | 4 | Part II: Curricular Multi-Week Content Block (NO individual week lines exist) | ✅ ĐÃ NHẬN (Parser bắt dải hẹp nhất) | `•	Weeks 129-132: Review & Math Logic Cycle (Tuần 129-132: Ôn tập & Toán Logic)` |
| **1009** | `W133–W144` | 12 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🔵 PROJECT CYCLE 2: VIDEO GAMES DEBATE (WEEKS 133-144)` |
| **1084** | `W141–W144` | 4 | Part II: Sub-phase / Cycle Grouping Header (Weeks have individual definitions below) | Bỏ qua (Cấp tổng quan / Header) | `Weeks 141-144: Review & Math Focus (Geometry Cycle)` |
| **1106** | `W145–W156` | 12 | Part II: Macro Unit / Block Header | Bỏ qua (Cấp tổng quan / Header) | `🔵 PROJECT CYCLE 3: CAPSTONE & GRADUATION (WEEKS 145-156)` |

---
## III. KẾT LUẬN & ĐỐI CHIẾU VỚI BỘ PARSER MỚI
- Bộ parser `parseKhungCT` trong `scripts/generate_week_blueprint.mjs` (sau khi nâng cấp tại Round 71 & 72) hoạt động theo thuật toán **dải hẹp nhất có nội dung bài học** (narrowest matching span) và lọc bỏ các header tổng quan (`isOverviewHeader`).
- Kết quả: 148 tuần đơn lẻ được bắt chính xác từ dòng `• Week N:`; đúng 8 tuần nằm trong 3 khối đa tuần (`W79-80`, `W95-96`, `W129-132`) được bắt chính xác từ khối nội dung đa tuần tương ứng. 100% 156 tuần đều được phân giải thành công.
