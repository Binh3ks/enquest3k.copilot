#!/usr/bin/env node
/**
 * scripts/apply_round87_map_cleanup.mjs
 *
 * Updates docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md:
 *   1. Cleans all 27 numbered content week rows so none carry "★ FULL MOCK N" labels
 *   2. Replaces Section 2 with the finalized 34 Interleaved Mock Checkpoint table
 *   3. Updates Mock Test Cadence in Section 1 and Milestone invariant in Section 4
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
let content = fs.readFileSync(MAP_PATH, 'utf8');

// 1. Update Mock Test Cadence header (line ~7)
content = content.replace(
  /\*\*Mock Test Cadence\*\*:\s*28 Full Mock Test Weeks on a strict pedagogical cycle/,
  '**Mock Test Cadence**: 34 Interleaved Mock Checkpoints (33 ngoài Lite Mode + 1 M01 Deferred Lite Mode; `M14–M34` = B1 PET [Confirmed Decision 6 — Owner 2026-11-11])'
);

// 2. Update Two Week Modalities description (Section 1)
const oldModalities = `### Hai Hình Thái Tuần Học (Two Week Modalities):
1. **Tuần Luyện Tập Xoay Vòng (Rotary Practice Weeks)**: 4 ngày đầu học kiến thức mới & sáng tạo (Quests 1–12); ngày thứ 5 (Zone 5) đánh giá quá trình tập trung sâu vào **4 Cambridge Parts xoay vòng**.
2. **Tuần Thi Thử Trọn Vẹn (Full Mock Test Weeks — 28 tuần)**: 4 ngày đầu ôn tập chuyên đề và sửa lỗi; ngày thứ 5 (Zone 5) kích hoạt **Bài thi Chuẩn hóa Toàn phần** có đồng hồ đếm ngược (Full Complete Exam Battery).`;

const newModalities = `### Hai Hình Thái Học Tập & Khảo Thí:
1. **Tuần Nội Dung Luyện Tập Xoay Vòng (156 Content Weeks W01–W156)**: 100% là các tuần nội dung độc lập. 4 ngày đầu học kiến thức mới & liên môn (Quests 1–12); ngày thứ 5 (Zone 5) đánh giá quá trình tập trung sâu vào **4 Cambridge Parts xoay vòng (% 4)**. Không có tuần nội dung nào bị gộp hay biến thành Full Mock.
2. **Mốc Thi Thử Xen Kẽ (Interleaved Mock Checkpoints — 34 mốc quy hoạch)**: Chèn xen kẽ giữa các tuần nội dung (\`M01\` sau W16 [Deferred Lite Mode]; \`M02–M03\` sau W24/W32; \`M04–M13\` Flyers sau \`W36..W72\`; \`M14–M34\` B1 PET sau \`W76..W156\` theo Decision 6 — Owner Ruling 2026-11-11), không gộp lên tuần nội dung Source B.`;

content = content.replace(oldModalities, newModalities);

// 3. Update Section 2: 34 Interleaved Mock Checkpoint table
const oldSection2Regex = /## 2\. Bảng Phân Bổ 28 Tuần Full Mock Test[\s\S]*?---\s*\n\s*## 3\./;
const newSection2 = `## 2. Bảng Phân Bổ 34 Mốc Mock Checkpoint Xen Kẽ

\`\`\`text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│         BẢNG PHÂN BỔ 34 MỐC MOCK CHECKPOINT XEN KẼ (156 TUẦN NỘI DUNG + 34 MOCK = 190 TUẦN)     │
│  [PROPOSED v2 — Source B Part II 156w + Mock xen kẽ giữa tuần nội dung, không gộp vào tuần học] │
├──────────────────────┬─────────────────────────────────┬────────────────────────────────────────┤
│ Giai Đoạn            │ Mốc Chèn Sau Tuần Nội Dung      │ Trạng Thái / Quy Chuẩn Kiểm Tra        │
├──────────────────────┼─────────────────────────────────┼────────────────────────────────────────┤
│ Pre-A1 Starters (1)  │ M01 (Sau W16)                   │ [DEFERRED — Lite Mode round64:L8]      │
│ A1 Movers (2)        │ M02 (Sau W24), M03 (Sau W32)    │ Sẵn sàng build (Ngoài Lite Mode)       │
│ A2 Flyers (10)       │ M04–M13 (Sau W36, 40, ..., 72)  │ Chu kỳ 32+4n (n=1..10); M13 Official   │
│ B1 PET (10+11 = 21)  │ M14–M23 (Sau W76..W112)         │ PET (32+4n, n=11..20; chờ spec code)  │
│ B1 PET (Confirmed)   │ M24–M34 (Sau W116, 120, ...,156)│ PET (Decision 6 Confirmed 2026-11-11)  │
├──────────────────────┴─────────────────────────────────┴────────────────────────────────────────┤
│ TỔNG: 34 Mock quy hoạch (33 khả build ngoài Lite Mode + 1 M01 deferred) | 156w + 34m = 190 tuần │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

## 3.`;

content = content.replace(oldSection2Regex, newSection2);

// 4. Clean the 27 content week rows
const replacements = [
  // W16
  {
    target: '| **W16** | **Sports Commentary (Dynamic Verbs)** | **★ FULL MOCK 01 (Starters)** | Bình luận Thể thao: Use action verbs with energy | **Tier 1 (Festival)**| **Bài thi thử Starters trọn vẹn: L1–L4, R1–R5, S1–S3; Lễ trao Khiên Starters** |',
    replacement: '| **W16** | Sports Commentary (Dynamic Verbs) | Pre-A1 · Rotary Practice | Bình luận Thể thao: Use action verbs with energy | Tier 1 (Festival) | Bài thực hành Starters: L1–L4, R1–R5, S1–S3; Lễ trao Khiên Starters |'
  },
  // W24
  {
    target: '| **W24** | **Feelings in the Past (Was/Were + Adjectives)** | **★ FULL MOCK 02 (Movers)** | Cảm xúc trong Quá khứ: Express past emotions and reasons | **Tier 2 (Exam)** | **Full Mock Movers 1: Đánh giá giữa kỳ L1–L5, R1–R6, S1–S4; Kiểm tra Notepad** |',
    replacement: '| **W24** | Feelings in the Past (Was/Were + Adjectives) | A1 Movers · Rotary Practice | Cảm xúc trong Quá khứ: Express past emotions and reasons | Tier 2 (Chunks) | Đánh giá giữa kỳ L1–L5, R1–R6, S1–S4; Kiểm tra Notepad |'
  },
  // W32
  {
    target: '| **W32** | **The Busy Day (Irregular Verbs 4: Tasks)** | **★ FULL MOCK 03 (Movers)** | Ngày Bận rộn - Động từ Bất quy tắc nhóm 4: Describe completed tasks | **Tier 2 (Official)**| **Full Mock Movers 2: Cấp Chứng chỉ Hoàn thành Movers; Lễ phong Khiên A1** |',
    replacement: '| **W32** | The Busy Day (Irregular Verbs 4: Tasks) | A1 Movers · Rotary Practice | Ngày Bận rộn - Động từ Bất quy tắc nhóm 4: Describe completed tasks | Tier 2 (Official) | Cấp Chứng chỉ Hoàn thành Movers; Lễ phong Khiên A1 |'
  },
  // W37
  {
    target: '| **W37** | **Living vs. Non-Living (Reasoning)** | **★ FULL MOCK 04 (Flyers)** | Vật sống & Không sống: Explain why something is living or non-living using "Because" | **Tier 2 (Exam)** | **Full Mock Flyers 1: Trọn vẹn 16 Parts Cambridge (L1–L5, R1–R7, S1–S4)** |',
    replacement: '| **W37** | Living vs. Non-Living (Reasoning) | A2 Flyers · Rotary 1 | Vật sống & Không sống: Explain why something is living or non-living using "Because" | Tier 2 (Chunks) | Trọn vẹn 16 Parts Cambridge (L1–L5, R1–R7, S1–S4); Rotary Cycle 1 |'
  },
  // W42
  {
    target: "| **W42** | **The Water Journey (Cycle)** | **★ FULL MOCK 05 (Flyers)** | Hành trình của Nước: Sequence nature's events | **Tier 2 (Exam)** | **Full Mock Flyers 2: Bấm giờ 3 bài thi chính thức; Cập nhật Hộ chiếu Khiên** |",
    replacement: "| **W42** | The Water Journey (Cycle) | A2 Flyers · Rotary 2 | Hành trình của Nước: Sequence nature's events | Tier 2 (Chunks) | Bấm giờ 3 bài thi chính thức; Cập nhật Hộ chiếu Khiên; Rotary Cycle 2 |"
  },
  // W47
  {
    target: '| **W47** | **Big Numbers (Place Value)** | **★ FULL MOCK 06 (Flyers)** | Số lớn - Giá trị hàng: Read and write numbers up to 100 correctly in English | **Tier 2 (Exam)** | **Full Mock Flyers 3: Rà soát lỗi đọc Part 5 (1-4 từ) và viết Part 7** |',
    replacement: '| **W47** | Big Numbers (Place Value) | A2 Flyers · Rotary 3 | Số lớn - Giá trị hàng: Read and write numbers up to 100 correctly in English | Tier 2 (Chunks) | Rà soát lỗi đọc Part 5 (1-4 từ) và viết Part 7; Rotary Cycle 3 |'
  },
  // W52
  {
    target: '| **W52** | **Have You Ever" Bingo (Seeding)** | **★ FULL MOCK 07 (Flyers)** | Bingo "Bạn đã bao giờ...?" - Gieo hạt: Use specific chunks to ask about experiences (Preparation for | **Tier 2 (Exam)** | **Full Mock Flyers 4: Đo lường tốc độ làm bài và độ chính xác Speaking** |',
    replacement: '| **W52** | Have You Ever" Bingo (Seeding) | A2 Flyers · Rotary 4 | Bingo "Bạn đã bao giờ...?" - Gieo hạt: Use specific chunks to ask about experiences | Tier 2 (Chunks) | Đo lường tốc độ làm bài và độ chính xác Speaking; Rotary Cycle 4 |'
  },
  // W57
  {
    target: '| **W57** | **ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts  / Toán: Khái niệm Phép nhân)** | **★ FULL MOCK 08 (Flyers)** | ELA: Vấn đề & Giải pháp (Câu: Write sentences proposing a solution using modals | **Tier 2 (Exam)** | **Full Mock Flyers 5: Bắt đầu áp dụng chuẩn chấm gắt gao của giám khảo Cambridge** |',
    replacement: '| **W57** | ELA: Problem & Solution (Sentences) / Math: Multiplication Concepts | A2 Flyers · Rotary 1 | ELA: Vấn đề & Giải pháp (Câu: Write sentences proposing a solution using modals | Tier 2 (Chunks) | Bắt đầu áp dụng chuẩn chấm gắt gao của giám khảo Cambridge; Rotary Cycle 1 |'
  },
  // W62
  {
    target: '| **W62** | **ELA: The Movie Trailer (Summarizing) / Math: Rounding** | **★ FULL MOCK 09 (Flyers)** | ELA: Trailer Phim - Tóm tắt / Toán: Làm tròn: Paraphrase a text in 3 sentences | **Tier 2 (Exam)** | **Full Mock Flyers 6: Đánh giá độ ổn định 15 Khiên trên cả 3 bài thi** |',
    replacement: '| **W62** | ELA: The Movie Trailer (Summarizing) / Math: Rounding | A2 Flyers · Rotary 2 | ELA: Trailer Phim - Tóm tắt / Toán: Làm tròn: Paraphrase a text in 3 sentences | Tier 2 (Chunks) | Đánh giá độ ổn định 15 Khiên trên cả 3 bài thi; Rotary Cycle 2 |'
  },
  // W67
  {
    target: '| **W67** | **ELA: The OREO Structure / Math: Measuring Mass** | **★ FULL MOCK 10 (Flyers)** | ELA: Cấu trúc OREO / Toán: Đo khối lượng: Identify and label parts: Opinion, Reason, Example, Opinion Restated | **Tier 2 (Exam)** | **Full Mock Flyers 7: Tiền tổng duyệt trước kỳ thi chính thức** |',
    replacement: '| **W67** | ELA: The OREO Structure / Math: Measuring Mass | A2 Flyers · Rotary 3 | ELA: Cấu trúc OREO / Toán: Đo khối lượng: Identify and label parts: Opinion, Reason, Example, Opinion Restated | Tier 2 (Chunks) | Tiền tổng duyệt trước kỳ thi chính thức; Rotary Cycle 3 |'
  },
  // W72
  {
    target: '| **W72** | **Science/ELA: Photosynthesis / Math: Area & Perimeter** | **★ FULL MOCK 11 (OFFICIAL)**| Khoa học/ELA: Quang hợp / Toán: Diện tích & Chu vi: Explain the process of photosynthesis | **Tier 2 (Official)**| **KỲ THI CHÍNH THỨC CAMBRIDGE FLYERS — MỤC TIÊU TUYỆT ĐỐI 15/15 KHIÊN!** |',
    replacement: '| **W72** | Science/ELA: Photosynthesis / Math: Area & Perimeter | A2 Flyers · Rotary 4 | Khoa học/ELA: Quang hợp / Toán: Diện tích & Chu vi: Explain the process of photosynthesis | Tier 2 (Official) | KỲ THI CHÍNH THỨC CAMBRIDGE FLYERS — MỤC TIÊU TUYỆT ĐỐI 15/15 KHIÊN!; Rotary Cycle 4 |'
  },
  // W77
  {
    target: '| **W77** | **Social Studies/ELA: World Landmarks / Math: 3D Geometry** | **★ FULL MOCK 12 (PET)** | Xã hội/ELA: Kỳ quan Thế giới / Toán: Hình học 3D: Write a technical description of a landmark | **Tier 3 (Exam)** | **Full Mock B1 PET 1 (4 Parts Listening, 6 Parts Reading, 2 Parts Writing, Speaking)** |',
    replacement: '| **W77** | Social Studies/ELA: World Landmarks / Math: 3D Geometry | B1 PET · Rotary 1 | Xã hội/ELA: Kỳ quan Thế giới / Toán: Hình học 3D: Write a technical description of a landmark | Tier 3 (Guided CER) | Full Mock B1 PET 1 (4 Parts Listening, 6 Parts Reading, 2 Parts Writing, Speaking); Rotary Cycle 1 |'
  },
  // W82
  {
    target: '| **W82** | **ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data** | **★ FULL MOCK 13 (PET)** | ELA: Vlogger Du Lịch - Viết nháp / Toán: Phân tích Dữ liệu: Write a descriptive essay draft | **Tier 3 (Exam)** | **Full Mock B1 PET 2: Chấm bài viết email 100 từ và bài đọc dài Part 3** |',
    replacement: '| **W82** | ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data | B1 PET · Rotary 2 | ELA: Vlogger Du Lịch - Viết nháp / Toán: Phân tích Dữ liệu: Write a descriptive essay draft | Tier 3 (Guided CER) | Chấm bài viết email 100 từ và bài đọc dài Part 3; Rotary Cycle 2 |'
  },
  // W87
  {
    target: "| **W87** | **Human Body / Math: Elapsed Time** | **★ FULL MOCK 14 (PET)** | Cơ thể Người / Toán: Thời gian trôi qua: Explain a body system's function (e.g., Circulatory) | **Tier 3 (Exam)** | **Full Mock B1 PET 3: Đánh giá khả năng thảo luận hai chiều Speaking Part 3** |",
    replacement: "| **W87** | Human Body / Math: Elapsed Time | B1 PET · Rotary 3 | Cơ thể Người / Toán: Thời gian trôi qua: Explain a body system's function (e.g., Circulatory) | Tier 3 (Guided CER) | Đánh giá khả năng thảo luận hai chiều Speaking Part 3; Rotary Cycle 3 |"
  },
  // W92
  {
    target: '| **W92** | **Community Helpers / Math: Surveys** | **★ FULL MOCK 15 (PET)** | Người giúp đỡ Cộng đồng / Toán: Khảo sát: Write an interview report about a job | **Tier 3 (Exam)** | **Full Mock B1 PET 4: Nâng cao độ khó bài đọc Gapped Text (Part 4)** |',
    replacement: '| **W92** | Community Helpers / Math: Surveys | B1+ PET · Rotary 4 | Người giúp đỡ Cộng đồng / Toán: Khảo sát: Write an interview report about a job | Tier 3 (Guided CER) | Nâng cao độ khó bài đọc Gapped Text (Part 4); Rotary Cycle 4 |'
  },
  // W97
  {
    target: '| **W97** | **Government / Math: Percentages Intro** | **★ FULL MOCK 16 (PET)** | Chính phủ / Toán: Giới thiệu Phần trăm: Define Government and its role | **Tier 3 (Exam)** | **Full Mock B1 PET 5: Đánh giá độc lập trên thang điểm Cambridge English Scale** |',
    replacement: '| **W97** | Government / Math: Percentages Intro | B1+ PET · Rotary 1 | Chính phủ / Toán: Giới thiệu Phần trăm: Define Government and its role | Tier 3 (Autonomous) | Đánh giá độc lập trên thang điểm Cambridge English Scale; Rotary Cycle 1 |'
  },
  // W102
  {
    target: '| **W102**| **Goods & Services / Math: Total Costs** | **★ FULL MOCK 17 (PET)** | Hàng hóa & Dịch vụ / Toán: Tổng chi phí: Classify goods and services | **Tier 3 (Exam)** | **Full Mock B1 PET 6: Chấm bài viết bài báo 100 từ Part 2** |',
    replacement: '| **W102**| Goods & Services / Math: Total Costs | B1+ PET · Rotary 2 | Hàng hóa & Dịch vụ / Toán: Tổng chi phí: Classify goods and services | Tier 3 (Autonomous) | Chấm bài viết bài báo 100 từ Part 2; Rotary Cycle 2 |'
  },
  // W107
  {
    target: '| **W107**| **The Note-Taker (Summary)** | **★ FULL MOCK 18 (PET)** | Người Ghi chép - Tóm tắt: Convert a paragraph into bullet points (keywords only) | **Tier 3 (Exam)** | **Full Mock B1 PET 7: Tổng duyệt kỹ năng làm bài trước kỳ thi chính thức** |',
    replacement: '| **W107**| The Note-Taker (Summary) | B1+ PET · Rotary 3 | Người Ghi chép - Tóm tắt: Convert a paragraph into bullet points (keywords only) | Tier 3 (Autonomous) | Tổng duyệt kỹ năng làm bài trước kỳ thi chính thức; Rotary Cycle 3 |'
  },
  // W112
  {
    target: "| **W112**| **The Editor's Eye (Review)** | **★ FULL MOCK 19 (OFFICIAL)**| Con mắt Biên tập viên - Chỉnh sửa: Self-correct spelling and basic grammar errors | **Tier 3 (Official)**| **KỲ THI CHÍNH THỨC B1 PET — MỤC TIÊU: PASS WITH MERIT / DISTINCTION!** |",
    replacement: "| **W112**| The Editor's Eye (Review) | B1+ PET · Rotary 4 | Con mắt Biên tập viên - Chỉnh sửa: Self-correct spelling and basic grammar errors | Tier 3 (Official) | KỲ THI CHÍNH THỨC B1 PET — MỤC TIÊU: PASS WITH MERIT / DISTINCTION!; Rotary Cycle 4 |"
  },
  // W117
  {
    target: '| **W117**| **The Knowledge Fair (Group A)** | **★ FULL MOCK (Presentation A)**| **Hội chợ Tri thức Nhóm A: Báo cáo dự án Passion Project** | **Tier 3 (Exam)** | **Thuyết trình 3 phút + Q&A; Đánh giá năng lực thuyết trình B1 Part A** |',
    replacement: '| **W117**| The Knowledge Fair (Group A) | Phase 2 (B1 PET) · Rotary 1 | Hội chợ Tri thức Nhóm A: Báo cáo dự án Passion Project | Tier 3 (Autonomous) | Thuyết trình 3 phút + Q&A; Đánh giá năng lực thuyết trình B1 Part A; Rotary Cycle 1 |'
  },
  // W127 (Was LIVE in Col 5, retain LIVE)
  {
    target: '| **W127**| **Rebuttal Practice** | **★ FULL MOCK 20 (B1+)**| Luyện Phản biện: Use "They say... but I say..." structure | **LIVE** | **Full Mock B1+ Academic 1: Reading 500–800w passages + Opinion Essay 140–190w** |',
    replacement: '| **W127**| Rebuttal Practice | B1+ Academic · Rotary 3 | Luyện Phản biện: Use "They say... but I say..." structure | LIVE | Luyện Phản biện: Use "They say... but I say..." structure; Rotary Cycle 3 |'
  },
  // W132
  {
    target: '| **W132**| **B1+ Academic Assessment Mock 2** | **★ FULL MOCK 21 (B1+)**| **Khảo sát Năng lực Chuẩn hóa B1+ 2** | **Tier 3 (Exam)** | **Full Mock B1+ Academic 2: Chấm bài luận Opinion Essay theo Rubric** |',
    replacement: '| **W132**| Review & Math Logic Cycle (W129–132) | B1+ Academic · Rotary 4 · Review Cycle | Consolidate writing skills + Math Fractions/Decimals review | Tier 3 (Opinion) | Consolidate writing skills + Math Fractions/Decimals review; Rotary Cycle 4 |'
  },
  // W137
  {
    target: '| **W137**| **Editing & Polishing (Word Choice)** | **★ FULL MOCK 22 (B1+)**| Chỉnh sửa & Trau chuốt - Dùng từ: Replace weak verbs/adjectives with stronger ones (e.g., "bad" -> "harmful", "good" -> "beneficial") | **Tier 3 (Exam)** | **Full Mock B1+ Academic 3: Đọc bài khoa học 600w + Nghe bài giảng + Opinion Essay** |',
    replacement: '| **W137**| Editing & Polishing (Word Choice) | B1+ Academic · Rotary 1 | Chỉnh sửa & Trau chuốt - Dùng từ: Replace weak verbs/adjectives with stronger ones (e.g., "bad" -> "harmful", "good" -> "beneficial") | Tier 3 (Research) | Đọc bài khoa học 600w + Nghe bài giảng + Opinion Essay; Rotary Cycle 1 |'
  },
  // W142
  {
    target: '| **W142**| **Geometry Review - Area & Volume** | **★ FULL MOCK 23 (B1+)**| Ôn tập Hình học - Diện tích & Thể tích: Calculate volume of cubes and cuboids | **Tier 3 (Exam)** | **Full Mock B1+ Academic 4: Đọc liên môn + Toán lời văn + Opinion Essay** |',
    replacement: '| **W142**| Geometry Review - Area & Volume | B1+ Academic · Rotary 2 | Ôn tập Hình học - Diện tích & Thể tích: Calculate volume of cubes and cuboids | Tier 3 (Autonomous) | Đọc liên môn + Toán lời văn + Opinion Essay; Rotary Cycle 2 |'
  },
  // W147
  {
    target: '| **W147**| **Advanced Thesis Writing** | **★ FULL MOCK 24 (B1+)**| Viết Luận đề Nâng cao: Write a thesis that acknowledges complexity ("While X is true, Y is better because...") | **Tier 3 (Exam)** | **Full Mock B1+: 4 Kỹ năng Nghe, Nói, Đọc, Viết theo chuẩn B1+ học thuật** |',
    replacement: '| **W147**| Advanced Thesis Writing | B1+ Academic · Rotary 3 | Viết Luận đề Nâng cao: Write a thesis that acknowledges complexity ("While X is true, Y is better because...") | Tier 3 (Autonomous) | 4 Kỹ năng Nghe, Nói, Đọc, Viết theo chuẩn B1+ học thuật; Rotary Cycle 3 |'
  },
  // W152
  {
    target: '| **W152**| **Genre Review: Narrative** | **★ FULL MOCK 25 (B1+)**| Ôn tập Thể loại: Tường thuật: Write a complete story in 45 minutes | **Tier 3 (Exam)** | **Full Mock B1+ Academic Tổng hợp: Đọc 800w + Opinion Essay + Nghe bài giảng + Thuyết trình** |',
    replacement: '| **W152**| Genre Review: Narrative | B1+ Academic · Rotary 4 | Ôn tập Thể loại: Tường thuật: Write a complete story in 45 minutes | Tier 3 (Autonomous) | Đọc 800w + Opinion Essay + Nghe bài giảng + Thuyết trình; Rotary Cycle 4 |'
  },
  // W156
  {
    target: '| **W156**| **GRADUATION CEREMONY & FINAL SHOWCASE** | **★ FULL MOCK 26 / GRADUATION**| LỄ TỐT NGHIỆP & TRÌNH DIỄN CUỐI CÙNG: The Graduation Ceremony | **★ GRADUATION** | **LỄ TỐT NGHIỆP — TRÌNH BÀY EXTENDED PROJECT & NHẬN BẰNG B1+ ACADEMIC PROFICIENCY!** |',
    replacement: '| **W156**| GRADUATION CEREMONY & FINAL SHOWCASE | B1+ Academic · Rotary 4 · Graduation Showcase | LỄ TỐT NGHIỆP & TRÌNH DIỄN CUỐI CÙNG: The Graduation Ceremony | ★ GRADUATION | LỄ TỐT NGHIỆP — TRÌNH BÀY EXTENDED PROJECT & NHẬN BẰNG B1+ ACADEMIC PROFICIENCY! |'
  },
];

let replacedCount = 0;
for (const item of replacements) {
  if (content.includes(item.target)) {
    content = content.replace(item.target, item.replacement);
    replacedCount++;
  } else {
    console.warn(`⚠️ Target not found in file: ${item.target.slice(0, 40)}...`);
  }
}

// 5. Update Section 4 Milestone Invariant
content = content.replace(
  /2\. \*\*Khai Báo Cột Milestone\*\*: Các tuần có gắn mác `★ FULL MOCK` bắt buộc phải cấu hình cờ `isFullMock: true` trong file metadata `index\.js` của tuần đó, kích hoạt chế độ tính giờ làm bài và bộ đề thi trọn gói tại Zone 5\./,
  '2. **Khai Báo Cột Milestone (Mốc Xen Kẽ)**: Tất cả 156 tuần nội dung (`W01–W156`) là tuần nội dung độc lập (`isFullMock: false`). Cờ `isFullMock: true` chỉ áp dụng cho 34 mốc Mock Checkpoints xen kẽ (`M01–M34`), kích hoạt chế độ tính giờ làm bài và bộ đề thi trọn gói tại Zone 5.'
);

fs.writeFileSync(MAP_PATH, content, 'utf8');
console.log(`✓ Cleaned ${replacedCount}/${replacements.length} content week rows in ${path.relative(ROOT_DIR, MAP_PATH)}`);
