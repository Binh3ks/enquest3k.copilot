# ĐỀ XUẤT THIẾT KẾ: BỘ SINH ĐỀ THI MÔ PHỎNG CAMBRIDGE (MOCK EXAM GENERATOR ENGINE)

> **Mục tiêu:** Thiết lập kiến trúc động cơ sinh đề thi mô phỏng (Mock Exam Generator) chuẩn hóa theo định dạng khảo thí quốc tế Cambridge Assessment English (YLE Flyers cho Stage 1 và B1 Preliminary / PET cho Stage 2), vận hành theo chu kỳ 4 tuần đóng kín.
> **Nguyên tắc cốt lõi:** Bám sát ngữ liệu thực tế đã giảng dạy trong 4 tuần trước đó (Cumulative Sourcing), tuân thủ 100% kỷ luật Staging & Quality Gates, và không bao giờ merge trực tiếp khi chưa qua kiểm duyệt chuyên gia ESL.

## I. SO SÁNH CẤU TRÚC ĐỀ THI: STAGE 1 (FLYERS) VS STAGE 2 (PET)

| Tiêu chí | Stage 1 (Tuần <= 72): Cambridge A2 Flyers | Stage 2 (Tuần >= 73): Cambridge B1 Preliminary (PET) |
| :--- | :--- | :--- |
| **Mục tiêu năng lực** | CEFR A2 (Primary Learners, 9–11 tuổi) | CEFR B1 (Secondary Learners, 11–14 tuổi) |
| **Cấu trúc Bài thi** | 3 Bài thi (Papers): Listening, Reading & Writing, Speaking | 4 Bài thi (Papers): Reading, Writing, Listening, Speaking |
| **Bài thi Listening** | **5 Parts (25 câu hỏi)**<br>• L1: Vẽ đường nối nhân vật trong tranh lớn (Pin coordinates)<br>• L2: Điền thông tin vào phiếu/ghi chú (Tên, tuổi, số, ngày)<br>• L3: Nối tranh đồ vật/ngày với các ký tự A–H<br>• L4: Trắc nghiệm 3 lựa chọn với 3 hình ảnh minh họa<br>• L5: Nghe, tô màu vào đồ vật và viết 1 từ | **4 Parts (25 câu hỏi)**<br>• L1: 7 đoạn hội thoại ngắn có tranh trắc nghiệm A/B/C<br>• L2: 6 đoạn hội thoại ngắn về cảm xúc/quan điểm A/B/C<br>• L3: Điền 6 thông tin chính xác vào văn bản ghi chú<br>• L4: Phỏng vấn/đối thoại dài với 6 câu hỏi trắc nghiệm |
| **Bài thi Reading & Writing** | **7 Parts (44 câu hỏi)**<br>• R1: Nối 10 định nghĩa với 15 từ vựng ứng viên<br>• R2: Hoàn thành đoạn hội thoại 5 lượt (chọn đáp án A–H)<br>• R3: Điền từ vào câu chuyện (6 chỗ trống) + Đặt tiêu đề<br>• R4: Điền từ ngữ pháp vào văn bản CLIL khoa học (10 câu)<br>• R5: Đọc hiểu truyện và hoàn thành câu (1–4 từ, 7 câu)<br>• R6: Điền từ tự do Open Cloze (5 chỗ trống không gợi ý)<br>• W7: Viết câu chuyện 3 tranh (20–30 từ) | **Reading: 6 Parts (32 câu hỏi)**<br>• R1: 5 biển báo/tin nhắn đời thường trắc nghiệm<br>• R2: Ghép 5 hồ sơ người dùng với 8 đoạn mô tả dịch vụ<br>• R3: Đọc hiểu văn bản dài (5 câu hỏi trắc nghiệm 4 đáp án)<br>• R4: Điền 5 câu văn A–H vào khoảng trống văn bản<br>• R5: Trắc nghiệm từ vựng & Collocation (6 câu A/B/C/D)<br>• R6: Điền từ ngữ pháp Open Cloze (6 chỗ trống)<br><br>**Writing: 2 Parts**<br>• W1: Viết Email phản hồi (~100 từ) theo 4 gợi ý<br>• W2: Viết Bài báo (Article) hoặc Kể chuyện (~100 từ) |
| **Bài thi Speaking** | **4 Parts (Solo-AI Partner "Nova")**<br>• S1: Tìm điểm khác biệt giữa 2 bức tranh (Spot Differences)<br>• S2: Trao đổi thông tin (Info Exchange Card A/Card B)<br>• S3: Kể câu chuyện qua chuỗi 5 tranh liên hoàn<br>• S4: Trả lời 4 câu hỏi phỏng vấn cá nhân | **4 Parts (Solo-AI Partner "Nova")**<br>• S1: Phỏng vấn tương tác cá nhân (2–3 phút)<br>• S2: Thảo luận giải quyết tình huống giả lập có tranh gợi ý<br>• S3: Độc thoại mô tả bức ảnh chụp chi tiết (1 phút)<br>• S4: Thảo luận sâu về chủ đề liên quan đến bức ảnh |

## II. NGUYÊN TẮC TỔNG HỢP NỘI DUNG (CUMULATIVE SOURCING ENGINE)

Khác với tuần Rotary chỉ khai thác nội dung của tuần đó, Mock Exam Generator vận hành cơ chế **Tích lũy 4 tuần (4-Week Block Synthesis)**:
1. **Phạm vi tổng hợp:** Một tuần Mock `W` (ví dụ W36) sẽ kiểm tra toàn bộ kiến thức được giảng dạy trong khối 4 tuần: `W-3, W-2, W-1, W` (ví dụ W33, W34, W35, W36).
2. **Ngân hàng Từ vựng Tích lũy (Vocabulary Pool):** Thu thập toàn bộ 80 từ vựng mục tiêu từ 4 blueprints để làm dữ liệu nguồn cho Reading Part 1 (Definition Matching), Listening Part 2 (Spelling & Specific Nouns), và Cloze Passages.
3. **Ngân hàng Ngữ pháp Tích lũy (Grammar Matrix):** Hệ thống hóa 4 cấu trúc ngữ pháp trọng tâm để thiết kế các câu hỏi trắc nghiệm (Reading Part 4) và mẫu đối thoại Speaking Part 2.
4. **Đồng bộ Sư phạm CLIL:** Các bài đọc hiểu dài (Reading Part 5 & Part 4) tích hợp lại các hiện tượng khoa học/xã hội đã học trong 4 tuần để tạo bối cảnh đọc thực tế.

## III. HỆ THỐNG KIỂM SOÁT CHẤT LƯỢNG DÀNH RIÊNG CHO MOCK EXAM (MOCK QUALITY GATES)

Mỗi đề thi Mock sinh ra phải vượt qua 6 cổng kiểm duyệt tự động trước khi xuất ra staging:
- **Mock Gate 1 (Cambridge Completeness):** Đầy đủ 100% các phần thi theo quy chuẩn Cambridge (Flyers: 16 parts; PET: 16 parts). Không chấp nhận thiếu sót bất kỳ part nào.
- **Mock Gate 2 (Exact Item Count Invariant):** Đúng chính xác số lượng câu hỏi quy định (Flyers: 25L, 44RW, 4S; PET: 25L, 32R, 2W, 4S).
- **Mock Gate 3 (Cumulative Sourcing Invariant):** Ít nhất 85% từ vựng và 100% cấu trúc ngữ pháp trong đề phải truy xuất được nguồn gốc (grounded) từ 4 tuần trước đó.
- **Mock Gate 4 (Strict CEFR Lexical Guard):** Stage 1 tuyệt đối không chứa từ vượt cấp B1/B2; Stage 2 tuyệt đối không chứa từ vượt cấp B2/C1.
- **Mock Gate 5 (Audio Script Feasibility):** Toàn bộ bài nghe phải có lời thoại hoàn chỉnh (script verbatim), phân vai rõ ràng, có âm hiệu "Listen and look" và thời gian chờ chuẩn Cambridge.
- **Mock Gate 6 (Deterministic Answer Key):** 100% câu hỏi trắc nghiệm/điền từ phải có đáp án duy nhất (hoặc rubric chấm điểm cụ thể cho bài viết và nói).

## IV. ĐỀ XUẤT TUẦN PILOT ĐẦU TIÊN: CHỌN TUẦN 36 (WEEK 36)

Sau khi rà soát toàn bộ 39 tuần mock tiềm năng, chúng tôi **khuyến nghị lựa chọn WEEK 36 làm Tuần Pilot đầu tiên** vì những lý do then chốt sau:

1. **Chất lượng Dữ liệu Nền tảng Tối ưu nhất (Highest Grounding Quality):**
   - W36 đóng khối 4 tuần: `W33`, `W34`, `W35`, `W36`.
   - Trong đó, `W33` và `W34` là hai tuần **Golden Master chuẩn mực** đã được đóng băng cryptographic.
   - `W35` đã được xây dựng mới 100% và merge chính thức vào production ở Round 62.
   - Do đó, Mock Exam Generator có nguồn ngữ liệu chuẩn xác và phong phú nhất để xây dựng đề thi mẫu có độ grounding 100%.

2. **Định dạng A2 Flyers thân thuộc & Chuẩn kiến trúc:**
   - W36 thuộc Stage 1 (Flyers), phù hợp trực tiếp với toàn bộ hạ tầng Component Cambridge hiện có của EngQuest3K (`bossRotarySchedule.js`, `CambridgeExamEngine`).
   - Không bị vướng hạn chế của Lite Mode (W01–W16 vốn đang tạm hoãn).

3. **Giải quyết triệt để tồn dư kỹ thuật (Technical Debt):**
   - Thư mục `src/data/weeks/week_36/` hiện đang chứa 24 file template cũ rác. Việc pilot W36 sẽ kết hợp dọn dẹp sạch toàn bộ file rác này và thay thế bằng bộ đề Mock chuẩn hóa đầu tiên của hệ thống.

## V. LỘ TRÌNH TRIỂN KHAI ĐỀ XUẤT
1. **Bước 1 (Round 64 - Hiện tại):** Trình nộp Đề xuất Thiết kế & Báo cáo Xung đột; Chờ Claude ESL-expert phê duyệt.
2. **Bước 2 (Round 65 - Sau khi duyệt):** Xây dựng script `scripts/generate_mock_exam_content.mjs`, tiến hành sinh Pilot W36 ra staging, chạy 6 Mock Quality Gates + CEFR Guard.
3. **Bước 3 (Round 66):** Chuyển giao W36 Mock Package cho Claude thẩm định chất lượng sư phạm; sau khi duyệt sẽ tiến hành scale các tuần mock còn lại.
