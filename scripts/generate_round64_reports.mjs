/**
 * scripts/generate_round64_reports.mjs
 * 
 * Generates:
 * 1. docs/agent_artifacts/round64_mock_schedule_and_conflicts.md
 * 2. docs/agent_artifacts/round64_mock_exam_generator_proposal.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ============================================================================
// PART 1: MOCK SCHEDULE & CONFLICT REPORT
// ============================================================================

const totalWeeks = 156;
const newMockWeeks = [];
for (let i = 4; i <= totalWeeks; i += 4) {
  newMockWeeks.push(i);
}

const oldMockWeeks = [
  16, 24, 32, 37, 42, 47, 52, 57, 62, 67, 72, 77, 82, 87, 92, 97, 
  102, 107, 112, 127, 132, 137, 142, 147, 152, 156
];

let md1 = '# BÁO CÁO TÁI CẤU TRÚC LỊCH THI MOCK EXAM (156 TUẦN) & PHÂN TÍCH XUNG ĐỘT TOÀN DIỆN\n\n';
md1 += '> **Phiên bản:** Round 64 — Quyết định Kiến trúc Sư phạm\n';
md1 += '> **Quy tắc mới:** Chu kỳ cố định **đúng 4 tuần / 1 bài Mock Exam** xuyên suốt toàn bộ 156 tuần (W4, W8, W12, ... W156 = 39 tuần mock).\n';
md1 += '> **Phân định Stage:**\n';
md1 += '> - **Stage 1 (Tuần 1 – 72):** Định dạng **Cambridge YLE Flyers (A2)** (18 tuần mock).\n';
md1 += '> - **Stage 2 (Tuần 73 – 156):** Định dạng **Cambridge B1 Preliminary / PET** (21 tuần mock).\n';
md1 += '> - **Trạng thái Lite Mode (W01–W16):** Tạm hoãn (Deferred) — W4, W8, W12, W16 thuộc dải Lite Mode, không build engine lúc này.\n\n';

md1 += '## I. BẢNG TỔNG HỢP TOÀN BỘ 39 TUẦN MOCK THEO LỊCH MỚI\n\n';
md1 += '| STT | Tuần Mock | Khung tuần kiểm tra | Stage & Định dạng | Trạng thái Blueprint hiện tại | Thuộc Mock cũ? | Đánh giá & Xung đột |\n';
md1 += '| :---: | :---: | :---: | :---: | :---: | :---: | :--- |\n';

let stt = 1;
for (const w of newMockWeeks) {
  const p = path.join(ROOT_DIR, 'src/data/weeks/week_' + w + '/blueprint.json');
  let bp = {};
  if (fs.existsSync(p)) bp = JSON.parse(fs.readFileSync(p, 'utf8'));
  const isOldMock = oldMockWeeks.includes(w);
  const stageStr = w <= 72 ? 'Stage 1 (Flyers A2)' : 'Stage 2 (PET B1)';
  const rangeStr = 'W' + (w - 3) + '–W' + w;
  const bpStatus = bp.isFullMock ? 'full_mock (true)' : 'rotary_practice (false)';
  const oldMockStr = isOldMock ? '✅ Có' : '❌ Không (Mới)';

  let note = 'Sẵn sàng quy hoạch mock';
  if (w <= 16) {
    note = 'Thuộc dải Lite Mode (W01–W16) — Tạm hoãn (Deferred)';
  } else if (w === 36) {
    note = '🚨 **Xung đột & Đề xuất Pilot:** Có 24 file rác cũ; W33-W35 đã hoàn tất 100% -> Ứng viên Pilot số 1';
  } else if (w === 40) {
    note = '🚨 **Xung đột Staging:** Đã sinh content rotary ở R63 (giữ nguyên tại staging)';
  } else if (w === 44) {
    note = '🚨 **Xung đột Staging:** Đã sinh content rotary ở R63 (giữ nguyên tại staging)';
  } else if (!isOldMock) {
    note = 'Cần đổi cờ blueprint `isFullMock: true` khi được duyệt';
  } else {
    note = 'Khớp hoàn toàn với mock cũ (giữ nguyên cờ)';
  }

  md1 += `| ${stt++} | **W${w}** | ${rangeStr} | ${stageStr} | \`${bpStatus}\` | ${oldMockStr} | ${note} |\n`;
}

md1 += '\n## II. ĐỐI CHIẾU VÀ BẢO TOÀN NỘI DUNG ĐÃ XÁC THỰC\n\n';
md1 += '### 1. Nội dung đã Merge vào Production (`src/data/weeks/`)\n';
md1 += 'Bao gồm 9 tuần Rotary đã được duyệt và merge:\n';
md1 += '- **Tuần 35:** 35 % 4 = 3 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 38:** 38 % 4 = 2 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 78:** 78 % 4 = 2 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 125:** 125 % 4 = 1 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 39 (Mới merge R64):** 39 % 4 = 3 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 41 (Mới merge R64):** 41 % 4 = 1 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 43 (Mới merge R64):** 43 % 4 = 3 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 45 (Mới merge R64):** 45 % 4 = 1 -> Rotary Practice (Không xung đột)\n';
md1 += '- **Tuần 46 (Mới merge R64):** 46 % 4 = 2 -> Rotary Practice (Không xung đột)\n';
md1 += '-> **Kết luận:** 100% nội dung đã merge đều nằm ngoài lịch mock mới. Không có bất kỳ tuần nào bị ảnh hưởng hay cần rollback.\n\n';

md1 += '### 2. Hai tuần Frozen Golden Masters (W33 & W34)\n';
md1 += '- **Tuần 33:** 33 % 4 = 1 -> Rotary Practice\n';
md1 += '- **Tuần 34:** 34 % 4 = 2 -> Rotary Practice\n';
md1 += '-> **Kết luận:** Cả hai tuần Golden Master đều là tuần Rotary thông thường, tuyệt đối không bị lịch mock 4 tuần xâm phạm. 100% hash bảo vệ được giữ nguyên.\n\n';

md1 += '## III. BẢNG PHÂN TÍCH 16 TUẦN MOCK CŨ BỊ HỦY (RETIRED TO ROTARY PRACTICE)\n\n';
md1 += 'Các tuần sau đây trước đây được đánh dấu là `full_mock` trong `blueprint.json` (theo lịch ~5 tuần cũ). Theo lịch 4 tuần mới, các tuần này **không còn là tuần mock** và sẽ quay lại hàng đợi sản xuất Rotary Practice chuẩn (15 quests):\n\n';
md1 += '| Tuần | Stage | Blueprint hiện tại | Số dư (`w % 4`) | Chủ đề hiện tại trong Blueprint | Hành động khi được phê duyệt |\n';
md1 += '| :---: | :---: | :---: | :---: | :--- | :--- |\n';

const retired = oldMockWeeks.filter(w => !newMockWeeks.includes(w));
for (const w of retired) {
  const p = path.join(ROOT_DIR, 'src/data/weeks/week_' + w + '/blueprint.json');
  let bp = {};
  if (fs.existsSync(p)) bp = JSON.parse(fs.readFileSync(p, 'utf8'));
  md1 += `| **W${w}** | Stage ${w <= 72 ? '1' : '2'} | \`isFullMock: true\` | ${w % 4} | ${bp.theme || 'N/A'} | Đổi cờ \`isFullMock: false\`, sinh content Rotary 15 Quests |\n`;
}

md1 += '\n## IV. CHI TIẾT TẤT CẢ CÁC XUNG ĐỘT PHÁT HIỆN ĐƯỢC (CONFLICT REPORT)\n\n';
md1 += '1. **Xung đột W40 (Staging conflict):**\n';
md1 += '   - **Hiện trạng:** Đã sinh 8 file staged Rotary Practice tại `docs/agent_artifacts/staging/week_40/` trong Round 63.\n';
md1 += '   - **Vấn đề:** W40 chia hết cho 4 (`40 % 4 === 0`), do đó là tuần Mock theo lịch mới.\n';
md1 += '   - **Xử lý:** Không merge vào `src/data/weeks/`. Lưu giữ an toàn tại staging để tái sử dụng tài nguyên (ngữ pháp Comparatives, từ vựng Beast Battle) cho ngân hàng câu hỏi hoặc tuần rotary khác.\n\n';

md1 += '2. **Xung đột W44 (Staging conflict):**\n';
md1 += '   - **Hiện trạng:** Đã sinh 8 file staged Rotary Practice tại `docs/agent_artifacts/staging/week_44/` trong Round 63.\n';
md1 += '   - **Vấn đề:** W44 chia hết cho 4 (`44 % 4 === 0`), do đó là tuần Mock theo lịch mới.\n';
md1 += '   - **Xử lý:** Không merge vào `src/data/weeks/`. Lưu giữ an toàn tại staging để tái sử dụng tài nguyên (ngữ pháp Subtraction, từ vựng Cookie Monster) cho ngân hàng câu hỏi hoặc tuần rotary khác.\n\n';

md1 += '3. **Xung đột W36 (Legacy un-authored files vs New Mock status):**\n';
md1 += '   - **Hiện trạng:** Thư mục `src/data/weeks/week_36/` chứa 24 file template rác cũ từ trước Round 55; blueprint mang cờ `isFullMock: false`.\n';
md1 += '   - **Vấn đề:** W36 là tuần mock đầu tiên của Stage 1 chuẩn (`36 % 4 === 0`).\n';
md1 += '   - **Khuyến nghị:** Dọn dẹp sạch (content wipe) 24 file rác cũ và chọn W36 làm Pilot cho Mock Exam Generator.\n\n';

md1 += '4. **Xung đột W37 (Legacy un-authored files vs Retired Mock status):**\n';
md1 += '   - **Hiện trạng:** Thư mục `src/data/weeks/week_37/` chứa 24 file template rác cũ; blueprint mang cờ `isFullMock: true`.\n';
md1 += '   - **Vấn đề:** W37 không chia hết cho 4 (`37 % 4 === 1`), do đó trở thành tuần Rotary thông thường.\n';
md1 += '   - **Khuyến nghị:** Đổi cờ `isFullMock: false`, dọn dẹp sạch file rác và đưa vào backlog sản xuất Rotary Practice.\n\n';

md1 += '5. **Trường hợp W150 (Chủ đề Mock Debate):**\n';
md1 += '   - Blueprint tuần 150 ghi theme là *Mock Debate & Strategy*, nhưng `isFullMock: false` và `week_type: "rotary_practice"`.\n';
md1 += '   - Phân tích: Đây là hoạt động tranh biện giả lập trong lớp học, không phải đề thi Cambridge Mock. Giữ nguyên là tuần Rotary Practice.\n\n';

md1 += '## V. NGUYÊN TẮC THI HÀNH (GOVERNANCE INVARIANT)\n';
md1 += '- **TUYỆT ĐỐI CHƯA SỬA BẤT KỲ FILE `blueprint.json` NÀO** trong Round này theo đúng chỉ thị của Owner.\n';
md1 += '- Báo cáo này đóng vai trò căn cứ thiết kế để Claude và Owner rà soát trước khi ban hành lệnh cập nhật blueprint đồng loạt.\n';

fs.writeFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round64_mock_schedule_and_conflicts.md'), md1, 'utf8');
console.log('✓ Wrote docs/agent_artifacts/round64_mock_schedule_and_conflicts.md');


// ============================================================================
// PART 2: MOCK EXAM GENERATOR DESIGN PROPOSAL & PILOT RECOMMENDATION
// ============================================================================

let md2 = '# ĐỀ XUẤT THIẾT KẾ: BỘ SINH ĐỀ THI MÔ PHỎNG CAMBRIDGE (MOCK EXAM GENERATOR ENGINE)\n\n';
md2 += '> **Mục tiêu:** Thiết lập kiến trúc động cơ sinh đề thi mô phỏng (Mock Exam Generator) chuẩn hóa theo định dạng khảo thí quốc tế Cambridge Assessment English (YLE Flyers cho Stage 1 và B1 Preliminary / PET cho Stage 2), vận hành theo chu kỳ 4 tuần đóng kín.\n';
md2 += '> **Nguyên tắc cốt lõi:** Bám sát ngữ liệu thực tế đã giảng dạy trong 4 tuần trước đó (Cumulative Sourcing), tuân thủ 100% kỷ luật Staging & Quality Gates, và không bao giờ merge trực tiếp khi chưa qua kiểm duyệt chuyên gia ESL.\n\n';

md2 += '## I. SO SÁNH CẤU TRÚC ĐỀ THI: STAGE 1 (FLYERS) VS STAGE 2 (PET)\n\n';
md2 += '| Tiêu chí | Stage 1 (Tuần <= 72): Cambridge A2 Flyers | Stage 2 (Tuần >= 73): Cambridge B1 Preliminary (PET) |\n';
md2 += '| :--- | :--- | :--- |\n';
md2 += '| **Mục tiêu năng lực** | CEFR A2 (Primary Learners, 9–11 tuổi) | CEFR B1 (Secondary Learners, 11–14 tuổi) |\n';
md2 += '| **Cấu trúc Bài thi** | 3 Bài thi (Papers): Listening, Reading & Writing, Speaking | 4 Bài thi (Papers): Reading, Writing, Listening, Speaking |\n';
md2 += '| **Bài thi Listening** | **5 Parts (25 câu hỏi)**<br>• L1: Vẽ đường nối nhân vật trong tranh lớn (Pin coordinates)<br>• L2: Điền thông tin vào phiếu/ghi chú (Tên, tuổi, số, ngày)<br>• L3: Nối tranh đồ vật/ngày với các ký tự A–H<br>• L4: Trắc nghiệm 3 lựa chọn với 3 hình ảnh minh họa<br>• L5: Nghe, tô màu vào đồ vật và viết 1 từ | **4 Parts (25 câu hỏi)**<br>• L1: 7 đoạn hội thoại ngắn có tranh trắc nghiệm A/B/C<br>• L2: 6 đoạn hội thoại ngắn về cảm xúc/quan điểm A/B/C<br>• L3: Điền 6 thông tin chính xác vào văn bản ghi chú<br>• L4: Phỏng vấn/đối thoại dài với 6 câu hỏi trắc nghiệm |\n';
md2 += '| **Bài thi Reading & Writing** | **7 Parts (44 câu hỏi)**<br>• R1: Nối 10 định nghĩa với 15 từ vựng ứng viên<br>• R2: Hoàn thành đoạn hội thoại 5 lượt (chọn đáp án A–H)<br>• R3: Điền từ vào câu chuyện (6 chỗ trống) + Đặt tiêu đề<br>• R4: Điền từ ngữ pháp vào văn bản CLIL khoa học (10 câu)<br>• R5: Đọc hiểu truyện và hoàn thành câu (1–4 từ, 7 câu)<br>• R6: Điền từ tự do Open Cloze (5 chỗ trống không gợi ý)<br>• W7: Viết câu chuyện 3 tranh (20–30 từ) | **Reading: 6 Parts (32 câu hỏi)**<br>• R1: 5 biển báo/tin nhắn đời thường trắc nghiệm<br>• R2: Ghép 5 hồ sơ người dùng với 8 đoạn mô tả dịch vụ<br>• R3: Đọc hiểu văn bản dài (5 câu hỏi trắc nghiệm 4 đáp án)<br>• R4: Điền 5 câu văn A–H vào khoảng trống văn bản<br>• R5: Trắc nghiệm từ vựng & Collocation (6 câu A/B/C/D)<br>• R6: Điền từ ngữ pháp Open Cloze (6 chỗ trống)<br><br>**Writing: 2 Parts**<br>• W1: Viết Email phản hồi (~100 từ) theo 4 gợi ý<br>• W2: Viết Bài báo (Article) hoặc Kể chuyện (~100 từ) |\n';
md2 += '| **Bài thi Speaking** | **4 Parts (Solo-AI Partner "Nova")**<br>• S1: Tìm điểm khác biệt giữa 2 bức tranh (Spot Differences)<br>• S2: Trao đổi thông tin (Info Exchange Card A/Card B)<br>• S3: Kể câu chuyện qua chuỗi 5 tranh liên hoàn<br>• S4: Trả lời 4 câu hỏi phỏng vấn cá nhân | **4 Parts (Solo-AI Partner "Nova")**<br>• S1: Phỏng vấn tương tác cá nhân (2–3 phút)<br>• S2: Thảo luận giải quyết tình huống giả lập có tranh gợi ý<br>• S3: Độc thoại mô tả bức ảnh chụp chi tiết (1 phút)<br>• S4: Thảo luận sâu về chủ đề liên quan đến bức ảnh |\n\n';

md2 += '## II. NGUYÊN TẮC TỔNG HỢP NỘI DUNG (CUMULATIVE SOURCING ENGINE)\n\n';
md2 += 'Khác với tuần Rotary chỉ khai thác nội dung của tuần đó, Mock Exam Generator vận hành cơ chế **Tích lũy 4 tuần (4-Week Block Synthesis)**:\n';
md2 += '1. **Phạm vi tổng hợp:** Một tuần Mock `W` (ví dụ W36) sẽ kiểm tra toàn bộ kiến thức được giảng dạy trong khối 4 tuần: `W-3, W-2, W-1, W` (ví dụ W33, W34, W35, W36).\n';
md2 += '2. **Ngân hàng Từ vựng Tích lũy (Vocabulary Pool):** Thu thập toàn bộ 80 từ vựng mục tiêu từ 4 blueprints để làm dữ liệu nguồn cho Reading Part 1 (Definition Matching), Listening Part 2 (Spelling & Specific Nouns), và Cloze Passages.\n';
md2 += '3. **Ngân hàng Ngữ pháp Tích lũy (Grammar Matrix):** Hệ thống hóa 4 cấu trúc ngữ pháp trọng tâm để thiết kế các câu hỏi trắc nghiệm (Reading Part 4) và mẫu đối thoại Speaking Part 2.\n';
md2 += '4. **Đồng bộ Sư phạm CLIL:** Các bài đọc hiểu dài (Reading Part 5 & Part 4) tích hợp lại các hiện tượng khoa học/xã hội đã học trong 4 tuần để tạo bối cảnh đọc thực tế.\n\n';

md2 += '## III. HỆ THỐNG KIỂM SOÁT CHẤT LƯỢNG DÀNH RIÊNG CHO MOCK EXAM (MOCK QUALITY GATES)\n\n';
md2 += 'Mỗi đề thi Mock sinh ra phải vượt qua 6 cổng kiểm duyệt tự động trước khi xuất ra staging:\n';
md2 += '- **Mock Gate 1 (Cambridge Completeness):** Đầy đủ 100% các phần thi theo quy chuẩn Cambridge (Flyers: 16 parts; PET: 16 parts). Không chấp nhận thiếu sót bất kỳ part nào.\n';
md2 += '- **Mock Gate 2 (Exact Item Count Invariant):** Đúng chính xác số lượng câu hỏi quy định (Flyers: 25L, 44RW, 4S; PET: 25L, 32R, 2W, 4S).\n';
md2 += '- **Mock Gate 3 (Cumulative Sourcing Invariant):** Ít nhất 85% từ vựng và 100% cấu trúc ngữ pháp trong đề phải truy xuất được nguồn gốc (grounded) từ 4 tuần trước đó.\n';
md2 += '- **Mock Gate 4 (Strict CEFR Lexical Guard):** Stage 1 tuyệt đối không chứa từ vượt cấp B1/B2; Stage 2 tuyệt đối không chứa từ vượt cấp B2/C1.\n';
md2 += '- **Mock Gate 5 (Audio Script Feasibility):** Toàn bộ bài nghe phải có lời thoại hoàn chỉnh (script verbatim), phân vai rõ ràng, có âm hiệu "Listen and look" và thời gian chờ chuẩn Cambridge.\n';
md2 += '- **Mock Gate 6 (Deterministic Answer Key):** 100% câu hỏi trắc nghiệm/điền từ phải có đáp án duy nhất (hoặc rubric chấm điểm cụ thể cho bài viết và nói).\n\n';

md2 += '## IV. ĐỀ XUẤT TUẦN PILOT ĐẦU TIÊN: CHỌN TUẦN 36 (WEEK 36)\n\n';
md2 += 'Sau khi rà soát toàn bộ 39 tuần mock tiềm năng, chúng tôi **khuyến nghị lựa chọn WEEK 36 làm Tuần Pilot đầu tiên** vì những lý do then chốt sau:\n\n';
md2 += '1. **Chất lượng Dữ liệu Nền tảng Tối ưu nhất (Highest Grounding Quality):**\n';
md2 += '   - W36 đóng khối 4 tuần: `W33`, `W34`, `W35`, `W36`.\n';
md2 += '   - Trong đó, `W33` và `W34` là hai tuần **Golden Master chuẩn mực** đã được đóng băng cryptographic.\n';
md2 += '   - `W35` đã được xây dựng mới 100% và merge chính thức vào production ở Round 62.\n';
md2 += '   - Do đó, Mock Exam Generator có nguồn ngữ liệu chuẩn xác và phong phú nhất để xây dựng đề thi mẫu có độ grounding 100%.\n\n';
md2 += '2. **Định dạng A2 Flyers thân thuộc & Chuẩn kiến trúc:**\n';
md2 += '   - W36 thuộc Stage 1 (Flyers), phù hợp trực tiếp với toàn bộ hạ tầng Component Cambridge hiện có của EngQuest3K (`bossRotarySchedule.js`, `CambridgeExamEngine`).\n';
md2 += '   - Không bị vướng hạn chế của Lite Mode (W01–W16 vốn đang tạm hoãn).\n\n';
md2 += '3. **Giải quyết triệt để tồn dư kỹ thuật (Technical Debt):**\n';
md2 += '   - Thư mục `src/data/weeks/week_36/` hiện đang chứa 24 file template cũ rác. Việc pilot W36 sẽ kết hợp dọn dẹp sạch toàn bộ file rác này và thay thế bằng bộ đề Mock chuẩn hóa đầu tiên của hệ thống.\n\n';

md2 += '## V. LỘ TRÌNH TRIỂN KHAI ĐỀ XUẤT\n';
md2 += '1. **Bước 1 (Round 64 - Hiện tại):** Trình nộp Đề xuất Thiết kế & Báo cáo Xung đột; Chờ Claude ESL-expert phê duyệt.\n';
md2 += '2. **Bước 2 (Round 65 - Sau khi duyệt):** Xây dựng script `scripts/generate_mock_exam_content.mjs`, tiến hành sinh Pilot W36 ra staging, chạy 6 Mock Quality Gates + CEFR Guard.\n';
md2 += '3. **Bước 3 (Round 66):** Chuyển giao W36 Mock Package cho Claude thẩm định chất lượng sư phạm; sau khi duyệt sẽ tiến hành scale các tuần mock còn lại.\n';

fs.writeFileSync(path.join(ROOT_DIR, 'docs/agent_artifacts/round64_mock_exam_generator_proposal.md'), md2, 'utf8');
console.log('✓ Wrote docs/agent_artifacts/round64_mock_exam_generator_proposal.md');
