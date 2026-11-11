# ĐẶC TẢ NGHIỆM THU ROUND 79 (v2) — CẬP NHẬT RENDERING TOÁN HỌC THỰC TẾ CHO W133 & W134

> Kế thừa toàn bộ tiêu chí Source B của `docs/agent_artifacts/round78_wave3_acceptance_spec.md`, và **cập nhật riêng mục Toán học (`D.9`) dựa trên khảo sát trực tiếp runtime UI trong `src/`** (không mặc định ép Bar Model cho bài Hình học `W133` Góc & `W134` Tam giác).

## 0. Kết Quả Kiểm Chứng Code Render UI Toán (`math_quest`) Trong `src/`

- **Component chính đang chạy trong Quest Map & Battle Arena:** `BarModelQuest` (`src/modules/zones/BattleArenaZone.jsx:L160`, đọc `arenaData.barModel` từ `zoneDataMapper.js:L79` / `TaskScreen.jsx:L243`).
- **Cơ chế render hình minh họa (`src/modules/hubs/station2/LearnMode/BarModelQuest.jsx:L262–L273`):**
  1. Nếu câu hỏi có `modelData` truthy -> gọi `<BarModelSVG modelData={currentQ.modelData} />` (`src/modules/hubs/station2/components/BarModelSVG.jsx:L37–L160`), component này **CHỈ hỗ trợ 2 kiểu thanh ngang tỷ lệ**: `type === "part_whole"` (L50) và `type === "comparison"` (L106) -> **KHÔNG thể vẽ góc hình học, thước đo độ, hay tam giác**.
  2. Nếu `modelData` là `null` / vắng mặt -> chuyển thẳng sang render ảnh tĩnh `<img src={currentQ.svg_url} alt={currentQ.title} ... />` (`BarModelQuest.jsx:L265–L272`, fallback URL mặc định `/images/week{weekNumber}/barmodel_w{weekNumber}_adv_p{idx+1}.svg` ở `L34`) -> **Hỗ trợ MỌI hình vẽ SVG hình học tĩnh** (góc kề/góc vuông/góc nhọn/góc tù, tam giác gắn ký hiệu cạnh & góc).
- **Hợp đồng trường dữ liệu & bộ chấm đáp án hiện tại (`BarModelQuest.jsx:L30–L36, L280` & `src/utils/barModelEvaluator.js:L6–L36`):**
  - `BarModelQuest.jsx:L32–33` CHỈ đọc `problemText || problem_en || text` (fallback `"Solve the Bar Model problem below:"`) và `correctAnswer || answer_value || parseInt(answer) || 10`.
  - **Cảnh báo Schema trên dữ liệu staging hiện tại:**
    - Staged W79 (`5` bài): đang dùng khóa `id, type, title, question, storyContext, modelData, target_answer, unit, steps` — thiếu `problemText`/`problem_en` (`false`) và `correctAnswer`/`answer_value` (`false`) -> nếu không bổ sung đúng khóa hợp đồng, runtime `BarModelQuest.jsx:L32–33` sẽ rơi về đề mặc định và đáp án `10`.
    - Staged W126 (`5` bài): đang dùng khóa `id, type, title, question, storyContext, modelData, target_answer, unit, steps` — thiếu `problemText`/`problem_en` (`false`) và `correctAnswer`/`answer_value` (`false`) -> nếu không bổ sung đúng khóa hợp đồng, runtime `BarModelQuest.jsx:L32–33` sẽ rơi về đề mặc định và đáp án `10`.
    - Staged W127 (`5` bài): đang dùng khóa `id, type, title, question, storyContext, modelData, target_answer, unit, steps` — thiếu `problemText`/`problem_en` (`false`) và `correctAnswer`/`answer_value` (`false`) -> nếu không bổ sung đúng khóa hợp đồng, runtime `BarModelQuest.jsx:L32–33` sẽ rơi về đề mặc định và đáp án `10`.
    - Staged W133 (`5` bài): đang dùng khóa `id, type, title, question, storyContext, modelData, target_answer, unit, steps` — thiếu `problemText`/`problem_en` (`false`) và `correctAnswer`/`answer_value` (`false`) -> nếu không bổ sung đúng khóa hợp đồng, runtime `BarModelQuest.jsx:L32–33` sẽ rơi về đề mặc định và đáp án `10`.
    - Staged W134 (`5` bài): đang dùng khóa `id, type, title, question, storyContext, modelData, target_answer, unit, steps` — thiếu `problemText`/`problem_en` (`false`) và `correctAnswer`/`answer_value` (`false`) -> nếu không bổ sung đúng khóa hợp đồng, runtime `BarModelQuest.jsx:L32–33` sẽ rơi về đề mặc định và đáp án `10`.
  - Ô nhập & evaluator (`BarModelQuest.jsx:L280` `<input type="number">` + `barModelEvaluator.js:L14–L30`): hiện tại chỉ chấp nhận **số nguyên không âm** (`0, 1, 2, ...`; từ chối số thập phân & số âm; chưa có giao diện nút bấm MCQ chữ trực tiếp).


> **TRẠNG THÁI TÀI LIỆU:** ĐỀ XUẤT NGHIỆM THU — KHÔNG TÁI SINH NỘI DUNG TRONG ROUND 79 (ĐỀ XUẤT — CHƯA TÁI SINH).
> **NGUỒN SỰ THẬT:** 100% trích xuất từ Part II của `docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt`.
> **ĐỘ KHÓ / THANG ĐO CAMBRIDGE:** Ghi rõ **`"chờ tài liệu Cambridge"`** (không tự bịa ngưỡng lexile / word count ngoài chuẩn nguồn).

## 1. Bảng Tóm Tắt Tiêu Chí Nghiệm Thu Tổng Hợp

| Tuần / Khối | Tiêu Đề Chuẩn Source B (Part II) | Dòng Source B | Từ Vựng Source B | Ngưỡng Từ Vựng Trong Bài Đọc | Tiêu Chí Toán Source B (5/5 bài) | Độ Khó / Chuẩn Khảo Thí |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **W79–W80** | Review & Micro-Debate 2 | L632–L637 | 7 từ (`space, earth, money, spend, fix, problem, important`) | >= 60% (5/7 từ Source B + >= 12/20 từ tổng trong `reading_hub`) | **100% SUPPLEMENT (Chờ Owner duyệt)**: Source B L632–637 KHÔNG có mục Toán nào (`Topic (Math)` vắng). Đề xuất tỷ lệ/ngân sách Space vs Earth. | chờ tài liệu Cambridge |
| **W126** | From Essay to Speech | L993–L997 | 0 từ trong Source B -> `SUPPLEMENT` 20 từ (Chờ Owner) | >= 60% (>= 12/20 từ `SUPPLEMENT` đã duyệt trong `reading_hub`) | **Logic Puzzles** (`L997`): Bắt buộc suy luận logic (loại trừ, sắp xếp thứ tự, ràng buộc điều kiện); CẤM phép cộng/trừ 1 bước lấy số có sẵn. | chờ tài liệu Cambridge |
| **W127** | Rebuttal Practice | L998–L1003 | 5 từ (`disagree, counter, point, false, true`) | >= 60% (3/5 từ Source B + >= 12/20 từ tổng trong `reading_hub`) | **Critical Thinking Math** (`L1003`): Bắt buộc kiểm chứng khẳng định định lượng (tìm mâu thuẫn, đối chiếu tính hợp lệ giả thiết); CẤM cộng/trừ đơn thuần. | chờ tài liệu Cambridge |
| **W129–132** | Review & Math Logic Cycle | L1007–L1008 | 0 từ trong Source B -> `SUPPLEMENT` 20 từ (Chờ Owner) | >= 60% (>= 12/20 từ `SUPPLEMENT` đã duyệt trong `reading_hub`) | **Review & Math Logic Cycle** (`L1007–1008`): Ôn tập Phân số/Số thập phân (`Fractions/Decimals review`) + Câu đố Toán Logic (`Math Logic Cycle`). | chờ tài liệu Cambridge |
| **W133** | Deep Research & Data | L1012–L1020 | 8 từ (`statistic, percent, study, data, majority, minority, survey, population`) | >= 60% (5/8 từ Source B + >= 12/20 từ tổng trong `reading_hub`) | **Geometry: Angles** (`L1018–1020`): Nhận diện góc vuông (`=90°`), nhọn (`<90°`), tù (`>90°,<180°`) trong hình hoặc đo góc bằng thước đo góc; KHÔNG lộ tên loại góc trong đề. | chờ tài liệu Cambridge |
| **W134** | Identifying Fallacies | L1021–L1029 | 8 từ (`fallacy, generalization, assumption, true, false, valid, invalid, logic`) | >= 60% (5/8 từ Source B + >= 12/20 từ tổng trong `reading_hub`) | **Geometry: Triangles** (`L1027–1029`): Phân loại tam giác theo cạnh (`equilateral`, `isosceles`, `scalene`, thỏa bất đẳng thức tam giác); KHÔNG lộ tên loại tam giác trong đề. | chờ tài liệu Cambridge |

> **Lưu ý quan trọng về W129–132 (Part I vs Part II):** Trong Part I Tổng quan (`L105`: `•	Project Cycle 3 (Weeks 129-136): Smartphones for Kids: A Tool or a Distraction? (Chu trình Dự án 3 (Tuần 129-136): Điện thoại Thông minh cho Trẻ em: Công cụ hay Sự xao lãng?)`), đề mục `Smartphones` từng nằm ở W129–136. Tuy nhiên trong **Part II Chi tiết** (nguồn chuẩn 156 tuần theo Quyết định Owner), `Smartphones` đã chuyển sang **Project Cycle 3 (W145–156, `L1106`)**, còn **W129–132** là **`Review & Math Logic Cycle` (`L1007–1008`)**.

## 2. Đặc Tả Chi Tiết Từng Tuần / Khối (Kèm Nguyên Văn Source B)

### W79–W80: Review & Micro-Debate 2 (Source B `L632–L637`)

- **Nguyên văn Source B (Part II):**
```text
632: 	•	Weeks 79-80: Review & Micro-Debate 2 (Tuần 79-80: Ôn tập & Tranh luận nhỏ 2)
633: 	•	Topic: "Space Exploration vs. Earth Fix". (Chủ đề: Khám phá Vũ trụ hay Sửa chữa Trái đất?)
634: 	•	Activity: Micro-Debate. (Hoạt động: Tranh luận nhỏ.)
635: 	•	Skill Focus: Rebuttal Intro ("Yes, but..."). (Kỹ năng: Giới thiệu Phản biện.)
636: 	•	Grammar Review: Passive Voice, Conditionals, Comparatives.
637: 	•	Vocabulary Focus: space, earth, money, spend, fix, problem, important.
```
- **Tiêu chí nghiệm thu bắt buộc:**
  1. **Trục Theme / Tiêu đề (`reading_hub.theme`, `blueprint.theme`):** Phải khớp đúng `Review & Micro-Debate 2` (Topic: `"Space Exploration vs. Earth Fix". (Chủ đề: Khám phá Vũ trụ hay Sửa chữa Trái đất?)`). Không được dùng chủ đề cũ/lệch (Part I hoặc Source A).
  2. **Trục CLIL / Skill / Grammar (`writing_hub`, `speaking_hub`, `skill_practice_hub.grammar_drills`):**
     - Outcome / Activity / Focus: Outcome / Activity: `Micro-Debate. (Hoạt động: Tranh luận nhỏ.)` | Skill Focus / Focus: `Rebuttal Intro ("Yes, but..."). (Kỹ năng: Giới thiệu Phản biện.)`
     - Grammar Focus: `Passive Voice, Conditionals, Comparatives.`
  3. **Trục Từ vựng & Độ phủ bài đọc (`vocab.js`, `reading_hub.js`):**
     - Từ vựng Source B bắt buộc (**7 từ**): `space, earth, money, spend, fix, problem, important`.
     - Bổ sung `13` từ còn lại: gắn nhãn `SUPPLEMENT (Chờ Owner duyệt)` để đạt đủ 20 từ.
     - **Điều kiện PASS bài đọc (`reading_hub.js`):** Bài đọc chính phải chứa **>= 60%** từ vựng mục tiêu (tối thiểu **5/7** từ Source B — khuyến nghị 100%, và tối thiểu **12/20** từ của toàn bộ bảng từ vựng).
  4. **Trục Singapore Math (`skill_practice_hub.singapore_math` — 5/5 bài):**
     - Target Math Source B: `Topic (Math)` = `KHÔNG CÓ` | `Outcome (Math)` = `KHÔNG CÓ` | `Math Vocabulary` = `KHÔNG CÓ`.
     - Điều kiện PASS Toán: **100% SUPPLEMENT (Chờ Owner duyệt)**: Source B L632–637 KHÔNG có mục Toán nào (`Topic (Math)` vắng). Đề xuất tỷ lệ/ngân sách Space vs Earth.
  5. **Hiệu chỉnh độ khó / Cambridge calibration:** **`chờ tài liệu Cambridge`** (tạm chưa khóa trần độ dài câu/bài đọc/rubric cho tới khi Owner cung cấp tài liệu chuẩn Cambridge B1 / B1+).

### W126: From Essay to Speech (Source B `L993–L997`)

- **Nguyên văn Source B (Part II):**
```text
993: 	•	Week 126: From Essay to Speech (Tuần 126: Chuyển từ Bài viết sang Bài nói)
994: 	•	Topic (Debate): Making it spoken. (Chủ đề: Văn nói.)
995: 	•	Key Learning Outcome (ELA): Create cue cards and practice signposting. (Kết quả: Làm thẻ ghi chú và luyện từ dẫn đường.)
996: 	•	Grammar Focus: Signposting: "Moving on to...", "Let's look at...". (Ngữ pháp: Từ dẫn hướng.)
997: 	•	Topic (Math): Logic Puzzles. (Toán: Câu đố Logic.)
```
- **Tiêu chí nghiệm thu bắt buộc:**
  1. **Trục Theme / Tiêu đề (`reading_hub.theme`, `blueprint.theme`):** Phải khớp đúng `From Essay to Speech` (Topic: `Making it spoken. (Chủ đề: Văn nói.)`). Không được dùng chủ đề cũ/lệch (Part I hoặc Source A).
  2. **Trục CLIL / Skill / Grammar (`writing_hub`, `speaking_hub`, `skill_practice_hub.grammar_drills`):**
     - Outcome / Activity / Focus: Outcome / Activity: `Create cue cards and practice signposting. (Kết quả: Làm thẻ ghi chú và luyện từ dẫn đường.)`
     - Grammar Focus: `Signposting: "Moving on to...", "Let's look at...". (Ngữ pháp: Từ dẫn hướng.)`
  3. **Trục Từ vựng & Độ phủ bài đọc (`vocab.js`, `reading_hub.js`):**
     - Source B **không định nghĩa Vocabulary Focus (0 từ)** tại đoạn `L993–L997`.
     - Toàn bộ 20 từ trong `vocab.js` đánh dấu **`SUPPLEMENT (Chờ Owner duyệt)`**, bám sát Topic/Skill của tuần.
     - **Điều kiện PASS bài đọc (`reading_hub.js`):** Bài đọc chính phải chứa **>= 60%** (**>= 12/20** từ đã được duyệt).
  4. **Trục Singapore Math (`skill_practice_hub.singapore_math` — 5/5 bài):**
     - Target Math Source B: `Topic (Math)` = `Logic Puzzles. (Toán: Câu đố Logic.)` | `Outcome (Math)` = `KHÔNG CÓ` | `Math Vocabulary` = `KHÔNG CÓ`.
     - Điều kiện PASS Toán: **Logic Puzzles** (`L997`): Bắt buộc suy luận logic (loại trừ, sắp xếp thứ tự, ràng buộc điều kiện); CẤM phép cộng/trừ 1 bước lấy số có sẵn.
  5. **Hiệu chỉnh độ khó / Cambridge calibration:** **`chờ tài liệu Cambridge`** (tạm chưa khóa trần độ dài câu/bài đọc/rubric cho tới khi Owner cung cấp tài liệu chuẩn Cambridge B1 / B1+).

### W127: Rebuttal Practice (Source B `L998–L1003`)

- **Nguyên văn Source B (Part II):**
```text
998: 	•	Week 127: Rebuttal Practice (Tuần 127: Luyện Phản biện)
999: 	•	Topic (Debate): Disagreeing politely. (Chủ đề: Phản đối lịch sự.)
1000: 	•	Key Learning Outcome (ELA): Use "They say... but I say..." structure. (Kết quả: Dùng cấu trúc Họ nói... nhưng tôi nói...)
1001: 	•	Grammar Focus: Contrast Connectors: "On the contrary", "However". (Ngữ pháp: Từ nối tương phản.)
1002: 	•	Vocabulary Focus: disagree, counter, point, false, true.
1003: 	•	Topic (Math): Critical Thinking Math. (Toán: Toán tư duy phản biện.)
```
- **Tiêu chí nghiệm thu bắt buộc:**
  1. **Trục Theme / Tiêu đề (`reading_hub.theme`, `blueprint.theme`):** Phải khớp đúng `Rebuttal Practice` (Topic: `Disagreeing politely. (Chủ đề: Phản đối lịch sự.)`). Không được dùng chủ đề cũ/lệch (Part I hoặc Source A).
  2. **Trục CLIL / Skill / Grammar (`writing_hub`, `speaking_hub`, `skill_practice_hub.grammar_drills`):**
     - Outcome / Activity / Focus: Outcome / Activity: `Use "They say... but I say..." structure. (Kết quả: Dùng cấu trúc Họ nói... nhưng tôi nói...)`
     - Grammar Focus: `Contrast Connectors: "On the contrary", "However". (Ngữ pháp: Từ nối tương phản.)`
  3. **Trục Từ vựng & Độ phủ bài đọc (`vocab.js`, `reading_hub.js`):**
     - Từ vựng Source B bắt buộc (**5 từ**): `disagree, counter, point, false, true`.
     - Bổ sung `15` từ còn lại: gắn nhãn `SUPPLEMENT (Chờ Owner duyệt)` để đạt đủ 20 từ.
     - **Điều kiện PASS bài đọc (`reading_hub.js`):** Bài đọc chính phải chứa **>= 60%** từ vựng mục tiêu (tối thiểu **3/5** từ Source B — khuyến nghị 100%, và tối thiểu **12/20** từ của toàn bộ bảng từ vựng).
  4. **Trục Singapore Math (`skill_practice_hub.singapore_math` — 5/5 bài):**
     - Target Math Source B: `Topic (Math)` = `Critical Thinking Math. (Toán: Toán tư duy phản biện.)` | `Outcome (Math)` = `KHÔNG CÓ` | `Math Vocabulary` = `KHÔNG CÓ`.
     - Điều kiện PASS Toán: **Critical Thinking Math** (`L1003`): Bắt buộc kiểm chứng khẳng định định lượng (tìm mâu thuẫn, đối chiếu tính hợp lệ giả thiết); CẤM cộng/trừ đơn thuần.
  5. **Hiệu chỉnh độ khó / Cambridge calibration:** **`chờ tài liệu Cambridge`** (tạm chưa khóa trần độ dài câu/bài đọc/rubric cho tới khi Owner cung cấp tài liệu chuẩn Cambridge B1 / B1+).

### W129–132: Review & Math Logic Cycle (Source B `L1007–L1008`)

- **Nguyên văn Source B (Part II):**
```text
1007: 	•	Weeks 129-132: Review & Math Logic Cycle (Tuần 129-132: Ôn tập & Toán Logic)
1008: 	•	Focus: Consolidate writing skills + Math Fractions/Decimals review.
```
- **Tiêu chí nghiệm thu bắt buộc:**
  1. **Trục Theme / Tiêu đề (`reading_hub.theme`, `blueprint.theme`):** Phải khớp đúng `Review & Math Logic Cycle`. Không được dùng chủ đề cũ/lệch (Part I hoặc Source A).
  2. **Trục CLIL / Skill / Grammar (`writing_hub`, `speaking_hub`, `skill_practice_hub.grammar_drills`):**
     - Outcome / Activity / Focus: Skill Focus / Focus: `Consolidate writing skills + Math Fractions/Decimals review.`
     - Grammar Focus: `[Không có dòng riêng — SUPPLEMENT ôn tập phù hợp B1+]`
  3. **Trục Từ vựng & Độ phủ bài đọc (`vocab.js`, `reading_hub.js`):**
     - Source B **không định nghĩa Vocabulary Focus (0 từ)** tại đoạn `L1007–L1008`.
     - Toàn bộ 20 từ trong `vocab.js` đánh dấu **`SUPPLEMENT (Chờ Owner duyệt)`**, bám sát Topic/Skill của tuần.
     - **Điều kiện PASS bài đọc (`reading_hub.js`):** Bài đọc chính phải chứa **>= 60%** (**>= 12/20** từ đã được duyệt).
  4. **Trục Singapore Math (`skill_practice_hub.singapore_math` — 5/5 bài):**
     - Target Math Source B: `Topic (Math)` = `KHÔNG CÓ` | `Outcome (Math)` = `KHÔNG CÓ` | `Math Vocabulary` = `KHÔNG CÓ`.
     - Điều kiện PASS Toán: **Review & Math Logic Cycle** (`L1007–1008`): Ôn tập Phân số/Số thập phân (`Fractions/Decimals review`) + Câu đố Toán Logic (`Math Logic Cycle`).
  5. **Hiệu chỉnh độ khó / Cambridge calibration:** **`chờ tài liệu Cambridge`** (tạm chưa khóa trần độ dài câu/bài đọc/rubric cho tới khi Owner cung cấp tài liệu chuẩn Cambridge B1 / B1+).

### W133: Deep Research & Data (Source B `L1012–L1020`)

- **Nguyên văn Source B (Part II):**
```text
1012: 	•	Week 133: Deep Research & Data (Tuần 133: Nghiên cứu Sâu & Dữ liệu) 
1013: 	•	Topic (ELA): Finding statistics to support arguments. (Chủ đề: Tìm số liệu thống kê để hỗ trợ lập luận.)
1014: 	•	Key Learning Outcome (ELA): Find and cite one statistic about video games (e.g., "70% of kids play..."). (Kết quả: Tìm và trích dẫn 1 số liệu về video game.)
1015: 	•	Skill Focus: Using data as evidence. (Kỹ năng: Dùng dữ liệu làm bằng chứng.)
1016: 	•	Grammar Focus: Citation Phrases: "According to a study by...", "Statistics show that...". (Ngữ pháp: Cụm từ trích dẫn.)
1017: 	•	Vocabulary Focus: statistic, percent, study, data, majority, minority, survey, population.
1018: 	•	Topic (Math): Geometry: Angles. (Toán: Hình học - Góc.)
1019: 	•	Key Learning Outcome (Math): Identify right, acute, and obtuse angles in shapes. (Kết quả: Nhận biết góc vuông, nhọn, tù.)
1020: 	•	Math Vocabulary: angle, degree, right angle, acute, obtuse, protractor, measure.
```
- **Tiêu chí nghiệm thu bắt buộc:**
  1. **Trục Theme / Tiêu đề (`reading_hub.theme`, `blueprint.theme`):** Phải khớp đúng `Deep Research & Data` (Topic: `Finding statistics to support arguments. (Chủ đề: Tìm số liệu thống kê để hỗ trợ lập luận.)`). Không được dùng chủ đề cũ/lệch (Part I hoặc Source A).
  2. **Trục CLIL / Skill / Grammar (`writing_hub`, `speaking_hub`, `skill_practice_hub.grammar_drills`):**
     - Outcome / Activity / Focus: Outcome / Activity: `Find and cite one statistic about video games (e.g., "70% of kids play..."). (Kết quả: Tìm và trích dẫn 1 số liệu về video game.)` | Skill Focus / Focus: `Using data as evidence. (Kỹ năng: Dùng dữ liệu làm bằng chứng.)`
     - Grammar Focus: `Citation Phrases: "According to a study by...", "Statistics show that...". (Ngữ pháp: Cụm từ trích dẫn.)`
  3. **Trục Từ vựng & Độ phủ bài đọc (`vocab.js`, `reading_hub.js`):**
     - Từ vựng Source B bắt buộc (**8 từ**): `statistic, percent, study, data, majority, minority, survey, population`.
     - Bổ sung `12` từ còn lại: gắn nhãn `SUPPLEMENT (Chờ Owner duyệt)` để đạt đủ 20 từ.
     - **Điều kiện PASS bài đọc (`reading_hub.js`):** Bài đọc chính phải chứa **>= 60%** từ vựng mục tiêu (tối thiểu **5/8** từ Source B — khuyến nghị 100%, và tối thiểu **12/20** từ của toàn bộ bảng từ vựng).
  4. **Trục Singapore Math (`skill_practice_hub.singapore_math` — 5/5 bài):**
     - Target Math Source B: `Topic (Math)` = `Geometry: Angles. (Toán: Hình học - Góc.)` | `Outcome (Math)` = `Identify right, acute, and obtuse angles in shapes. (Kết quả: Nhận biết góc vuông, nhọn, tù.)` | `Math Vocabulary` = `angle, degree, right angle, acute, obtuse, protractor, measure.`.
     - **Điều kiện PASS Toán — Geometry: Angles (`L1018–1020`, KHÔNG mặc định ép Bar Model):**
       - *Hình thức biểu diễn được phép trên UI:* (a) **Khuyến nghị cho Hình học:** Dùng **SVG hình học tĩnh** (`svg_url: "/images/week133/..."`, đặt `modelData: null` để `BarModelQuest.jsx:L265` render `<img src={currentQ.svg_url}>`) vẽ các góc/hình đa giác/thước đo góc; HOẶC (b) **Bài toán mô tả trực quan kèm số đo góc bằng chữ** (`problemText`/`problem_en`) có hình minh họa SVG hoặc đối chiếu góc phụ/kề bù.
       - *Dạng câu hỏi tương thích runtime hiện tại (`<input type="number">` + `barModelEvaluator.js`):* (1) **Đo / tính số đo góc chưa biết** (đáp án số nguyên độ, ví dụ góc phụ `90 - 35 = 55`, góc kề bù `180 - 115 = 65`); (2) **Nhận diện & đếm số lượng góc** (ví dụ *"How many acute angles are inside Figure B?"* -> đáp án `3`); (3) **Nhận diện phân loại góc (Identification MCQ đánh số trên hình/đề):** Ví dụ *"Which angle shown is obtuse? Enter 1 (Angle A: 45°), 2 (Angle B: 90°), or 3 (Angle C: 125°)"* -> cho phép học sinh nhận biết `right, acute, obtuse` ngay mà KHÔNG cần sửa code UI; *(Ghi chú mở rộng: nếu muốn câu hỏi MCQ bấm chữ `Acute / Right / Obtuse`, phải bổ sung nhánh render `options[]` trong `BarModelQuest.jsx` — ghi rõ tách biệt khỏi phần không sửa code).*
       - *Ràng buộc chống lỗi sư phạm:* Không ép vẽ Bar Model thanh ngang cho câu hỏi nhận diện/đo góc; KHÔNG lộ tên loại góc cần đoán trong đề (cấm kiểu *"An acute angle measures 45°..."* rồi hỏi đáp án từ gợi ý lộ); bắt buộc tuân thủ schema runtime (`problemText`, `correctAnswer`, `svg_url` + `modelData: null` nếu vẽ hình học).
  5. **Hiệu chỉnh độ khó / Cambridge calibration:** **`chờ tài liệu Cambridge`** (tạm chưa khóa trần độ dài câu/bài đọc/rubric cho tới khi Owner cung cấp tài liệu chuẩn Cambridge B1 / B1+).

### W134: Identifying Fallacies (Source B `L1021–L1029`)

- **Nguyên văn Source B (Part II):**
```text
1021: 	•	Week 134: Identifying Fallacies (Tuần 134: Nhận diện Lỗi Ngụy biện) 
1022: 	•	Topic (Debate): Spotting bad arguments. (Chủ đề: Phát hiện lập luận tồi.)
1023: 	•	Key Learning Outcome (ELA): Identify a "Generalization" fallacy (e.g., "All gamers are lazy"). (Kết quả: Nhận diện lỗi "Khái quát hóa vội vã".)
1024: 	•	Skill Focus: Critical Thinking/Logic. (Kỹ năng: Tư duy Phản biện/Logic.)
1025: 	•	Grammar Focus: Qualifiers: "Some", "Many", "Often", "Tend to" (to avoid generalizing). (Ngữ pháp: Từ hạn định để tránh vơ đũa cả nắm.)
1026: 	•	Vocabulary Focus: fallacy, generalization, assumption, true, false, valid, invalid, logic.
1027: 	•	Topic (Math): Geometry: Triangles. (Toán: Hình học - Tam giác.)
1028: 	•	Key Learning Outcome (Math): Classify triangles by sides (equilateral, isosceles, scalene). (Kết quả: Phân loại tam giác theo cạnh.)
1029: 	•	Math Vocabulary: triangle, side, equal, length, equilateral, isosceles, scalene.
```
- **Tiêu chí nghiệm thu bắt buộc:**
  1. **Trục Theme / Tiêu đề (`reading_hub.theme`, `blueprint.theme`):** Phải khớp đúng `Identifying Fallacies` (Topic: `Spotting bad arguments. (Chủ đề: Phát hiện lập luận tồi.)`). Không được dùng chủ đề cũ/lệch (Part I hoặc Source A).
  2. **Trục CLIL / Skill / Grammar (`writing_hub`, `speaking_hub`, `skill_practice_hub.grammar_drills`):**
     - Outcome / Activity / Focus: Outcome / Activity: `Identify a "Generalization" fallacy (e.g., "All gamers are lazy"). (Kết quả: Nhận diện lỗi "Khái quát hóa vội vã".)` | Skill Focus / Focus: `Critical Thinking/Logic. (Kỹ năng: Tư duy Phản biện/Logic.)`
     - Grammar Focus: `Qualifiers: "Some", "Many", "Often", "Tend to" (to avoid generalizing). (Ngữ pháp: Từ hạn định để tránh vơ đũa cả nắm.)`
  3. **Trục Từ vựng & Độ phủ bài đọc (`vocab.js`, `reading_hub.js`):**
     - Từ vựng Source B bắt buộc (**8 từ**): `fallacy, generalization, assumption, true, false, valid, invalid, logic`.
     - Bổ sung `12` từ còn lại: gắn nhãn `SUPPLEMENT (Chờ Owner duyệt)` để đạt đủ 20 từ.
     - **Điều kiện PASS bài đọc (`reading_hub.js`):** Bài đọc chính phải chứa **>= 60%** từ vựng mục tiêu (tối thiểu **5/8** từ Source B — khuyến nghị 100%, và tối thiểu **12/20** từ của toàn bộ bảng từ vựng).
  4. **Trục Singapore Math (`skill_practice_hub.singapore_math` — 5/5 bài):**
     - Target Math Source B: `Topic (Math)` = `Geometry: Triangles. (Toán: Hình học - Tam giác.)` | `Outcome (Math)` = `Classify triangles by sides (equilateral, isosceles, scalene). (Kết quả: Phân loại tam giác theo cạnh.)` | `Math Vocabulary` = `triangle, side, equal, length, equilateral, isosceles, scalene.`.
     - **Điều kiện PASS Toán — Geometry: Triangles (`L1027–1029`, KHÔNG mặc định ép Bar Model):**
       - *Hình thức biểu diễn được phép trên UI:* (a) **Khuyến nghị cho Hình học:** Dùng **SVG hình học tĩnh** (`svg_url: "/images/week134/..."`, đặt `modelData: null` tại `BarModelQuest.jsx:L265`) vẽ tam giác ghi rõ độ dài 3 cạnh / ký hiệu cạnh bằng nhau; HOẶC (b) **Bài toán mô tả cạnh tam giác** kết hợp SVG tĩnh. *(Chỉ dùng `BarModelSVG` nếu có tiểu bài tính chu vi/so sánh độ dài 3 cạnh thuần số học, KHÔNG ép Bar Model cho bài phân loại tam giác).*
       - *Dạng câu hỏi tương thích runtime hiện tại (`<input type="number">` + `barModelEvaluator.js`):* (1) **Phân loại tam giác theo cạnh (Identification / Classification):** Cho độ dài 3 cạnh thỏa bất đẳng thức tam giác `(a + b > c)` trên hình SVG hoặc đề văn bản, đánh số lựa chọn `1 = Equilateral`, `2 = Isosceles`, `3 = Scalene` (tương thích `<input type="number">` hiện hành, hoặc mở rộng MCQ nút bấm nếu sửa `BarModelQuest.jsx` sau); (2) **Tìm cạnh chưa biết / số cạnh bằng nhau / chu vi** dựa trên tính chất phân loại tam giác (ví dụ *"An isosceles triangle has perimeter 26 cm and base 8 cm. What is the length of each equal side?"* -> `(26 - 8) / 2 = 9`); (3) **Đếm số tam giác cùng loại trong hình ghép SVG**.
       - *Ràng buộc chống lỗi sư phạm:* Không nhồi tên phân loại vào câu hỏi nếu bài đang kiểm tra nhận diện loại tam giác; mọi bộ 3 cạnh bắt buộc thỏa bất đẳng thức tam giác (`a + b > c`); bắt buộc đủ trường `problemText`, `correctAnswer`.
  5. **Hiệu chỉnh độ khó / Cambridge calibration:** **`chờ tài liệu Cambridge`** (tạm chưa khóa trần độ dài câu/bài đọc/rubric cho tới khi Owner cung cấp tài liệu chuẩn Cambridge B1 / B1+).

