# BÁO CÁO XỬ LÝ 3 VIỆC — AUDIT & GIT EVIDENCE (2026-09-12)

## VIỆC 1: Bổ sung Git Evidence cho Bản Fix Jump (QuestionQuestGame.jsx)

1. **Xác nhận trạng thái sản xuất:**
   - **Xác nhận:** `QuestionQuestGame.jsx` **ĐANG ĐƯỢC COI LÀ SẢN XUẤT**.
   - **Bằng chứng:** Trong `docs/Claude_handoff.txt` (dòng 30), Game #4 Question Quest (F7D2) đã được tick `✅ HOÀN THÀNH`. Tại `DailyRoomScreen.jsx:406`, component này được import trực tiếp từ `../quest` để chạy Room 6 (Floor 7 Door 2).
   - **Đánh giá vi phạm & Xử lý:** Việc sửa trực tiếp trước đó mà chưa tách commit độc lập đã vi phạm Rule #2. Thực hiện đúng Rule #8 (cấm `add -A`, add từng file tường minh), bản fix jump đã được cô lập hoàn toàn thành 1 commit độc lập duy nhất trên git.

2. **Commit Hash:** `ff2267a8f0e8a569abf424fa73ee4cfb5e267438`
3. **Ngày giờ commit:** `Sat Sep 12 10:12:07 2026 +0700`
4. **RAW `git show ff2267a8` (Diff đúng 2 vị trí L293/L303):**

```diff
commit ff2267a8f0e8a569abf424fa73ee4cfb5e267438
Author: binh4k <binh4k@users.noreply.github.com>
Date:   Sat Sep 12 10:12:07 2026 +0700

    fix(quest): correct jump velocity sign and grounding in QuestionQuestGame

diff --git a/src/modules/quest/QuestionQuestGame.jsx b/src/modules/quest/QuestionQuestGame.jsx
index b49835cb..61490efe 100644
--- a/src/modules/quest/QuestionQuestGame.jsx
+++ b/src/modules/quest/QuestionQuestGame.jsx
@@ -290,7 +290,7 @@ export default function QuestionQuestGame({
 
       // Jump
       if (keysPressed.current.up && leo.isGrounded) {
-        leo.vy = -LEO_JUMP_FORCE * 1.08;
+        leo.vy = -Math.abs(LEO_JUMP_FORCE) * 1.08;
         leo.isGrounded = false;
       }
 
@@ -300,7 +300,8 @@ export default function QuestionQuestGame({
       leo.y += leo.vy;
 
       // Platform Collisions
-      checkPlatformLanding(leo, MAZE_PLATFORMS, LEO_HITBOX);
+      const landed = checkPlatformLanding(leo, MAZE_PLATFORMS, LEO_HITBOX);
+      leo.isGrounded = landed;
 
       // Boundaries
       leo.x = clamp(leo.x, 0, ROOM_WIDTH - LEO_HITBOX.width);
```

5. **Giải trình độ lệch dòng (GAP 1 — vì sao từng báo L297/L307 nhưng commit là L293/L303):**
   - Lệnh kiểm chứng: `git blame -L 285,315 ff2267a8^ -- src/modules/quest/QuestionQuestGame.jsx`
   - Vị trí gốc trong commit `f085bb94c` (trước khi commit `ff2267a8` tạo ra) chính xác là **L293** (jump force) và **L303** (checkPlatformLanding).
   - Lý do phiên trước đọc thành **L297** và **L307** (+4 dòng): Khi đó working tree đang chứa các test hook chưa commit (`window.__QQ_LAST_FEEDBACK__` được chèn ở L165 (+2 dòng) và L193 (+2 dòng) -> 2 + 2 = +4 dòng).
   - Khi chạy `git checkout HEAD` để làm sạch working tree trước khi commit cô lập, 4 dòng uncommitted trên bị gỡ bỏ, đưa vị trí về đúng số dòng gốc trên Git: **L293 và L303**.

---

## VIỆC 2: Làm Lại Số Liệu Phase 3 / Mục 5 Với Raw Output Thật

- **Script kiểm chứng duy nhất:** `scripts/count_week33_curriculum.mjs` (import trực tiếp `weekData` từ `src/data/weeks/week_33/index.js`).

### 1. FULL RAW CONSOLE OUTPUT:

```text
=== RAW CONSOLE OUTPUT: BẢNG { hub, field, count } ===
┌─────────┬─────────────────┬────────────────────────────────┬───────┐
│ (index) │ hub             │ field                          │ count │
├─────────┼─────────────────┼────────────────────────────────┼───────┤
│ 0       │ 'reading_hub'   │ 'story_scenes'                 │ 5     │
│ 1       │ 'reading_hub'   │ 'clil_article.content_en'      │ 12    │
│ 2       │ 'reading_hub'   │ 'clil_article.sentence_drills' │ 2     │
│ 3       │ 'reading_hub'   │ 'interactive_story'            │ 5     │
│ 4       │ 'reading_hub'   │ 'check_mode_drills'            │ 10    │
│ 5       │ 'reading_hub'   │ 'reading_part3_story'          │ 10    │
│ 6       │ 'reading_hub'   │ 'rw_part_4'                    │ 11    │
│ 7       │ 'listening_hub' │ 'listening_p1'                 │ 16    │
│ 8       │ 'listening_hub' │ 'listening_p2'                 │ 15    │
│ 9       │ 'listening_hub' │ 'listening_p3'                 │ 20    │
│ 10      │ 'listening_hub' │ 'listening_p4'                 │ 6     │
│ 11      │ 'listening_hub' │ 'listening_p5'                 │ 6     │
│ 12      │ 'writing_hub'   │ 'rw_part_1'                    │ 10    │
│ 13      │ 'writing_hub'   │ 'rw_part_2'                    │ 13    │
│ 14      │ 'writing_hub'   │ 'rw_part_3'                    │ 8     │
│ 15      │ 'writing_hub'   │ 'rw_part_4'                    │ 11    │
│ 16      │ 'writing_hub'   │ 'rw_part_5'                    │ 15    │
│ 17      │ 'speaking_hub'  │ 'info_exchange_cards'          │ 22    │
│ 18      │ 'speaking_hub'  │ 'personal_questions'           │ 4     │
│ 19      │ 'speaking_hub'  │ 'find_differences'             │ 12    │
└─────────┴─────────────────┴────────────────────────────────┴───────┘

=== RAW CONSOLE OUTPUT: CHI TIẾT BẢN CHẤT DỮ LIỆU ===
┌─────────┬─────────────────┬────────────────────────────────┬────────────────┬────────────┬──────────────────────────────────────────────┐
│ (index) │ hub             │ field                          │ sentence_count │ item_count │ unit                                         │
├─────────┼─────────────────┼────────────────────────────────┼────────────────┼────────────┼──────────────────────────────────────────────┤
│ 0       │ 'reading_hub'   │ 'story_scenes'                 │ 5              │ 5          │ 'scenes (10 câu mô tả qua 5 scene)'          │
│ 1       │ 'reading_hub'   │ 'clil_article.content_en'      │ 12             │ 1          │ '1 bài đọc (12 câu)'                         │
│ 2       │ 'reading_hub'   │ 'clil_article.sentence_drills' │ 2              │ 2          │ 'câu bài tập ghép'                           │
│ 3       │ 'reading_hub'   │ 'interactive_story'            │ 5              │ 5          │ 'câu trong story template (5 gaps)'          │
│ 4       │ 'reading_hub'   │ 'check_mode_drills'            │ 10             │ 10         │ 'câu drill trắc nghiệm'                      │
│ 5       │ 'reading_hub'   │ 'reading_part3_story'          │ 10             │ 1          │ 'câu trong đoạn văn story_text'              │
│ 6       │ 'reading_hub'   │ 'rw_part_4'                    │ 11             │ 11         │ 'câu cloze template (11 câu, 10 blanks)'     │
│ 7       │ 'listening_hub' │ 'listening_p1'                 │ 16             │ 6          │ 'lượt thoại dialogue (6 target pins)'        │
│ 8       │ 'listening_hub' │ 'listening_p2'                 │ 15             │ 5          │ 'lượt thoại dialogue (5 câu hỏi điền field)' │
│ 9       │ 'listening_hub' │ 'listening_p3'                 │ 20             │ 5          │ 'câu passage script (5 item ghép tranh)'     │
│ 10      │ 'listening_hub' │ 'listening_p4'                 │ 6              │ 6          │ 'câu hỏi trắc nghiệm MCQ'                    │
│ 11      │ 'listening_hub' │ 'listening_p5'                 │ 6              │ 6          │ 'chỉ dẫn tô màu/viết'                        │
│ 12      │ 'writing_hub'   │ 'rw_part_1'                    │ 10             │ 10         │ 'câu định nghĩa từ vựng'                     │
│ 13      │ 'writing_hub'   │ 'rw_part_2'                    │ 13             │ 5          │ 'câu thoại hỏi/đáp (5 lượt + 8 đáp án)'      │
│ 14      │ 'writing_hub'   │ 'rw_part_3'                    │ 8              │ 5          │ 'câu trong story_text (5 chỗ trống)'         │
│ 15      │ 'writing_hub'   │ 'rw_part_4'                    │ 11             │ 10         │ 'câu trong text_template (10 blanks)'        │
│ 16      │ 'writing_hub'   │ 'rw_part_5'                    │ 15             │ 7          │ 'câu (8 câu story_text + 7 câu hỏi)'         │
│ 17      │ 'speaking_hub'  │ 'info_exchange_cards'          │ 22             │ 10         │ 'lượt thoại mẫu (10 cue card prompts)'       │
│ 18      │ 'speaking_hub'  │ 'personal_questions'           │ 4              │ 4          │ 'câu hỏi phỏng vấn giám khảo'                │
│ 19      │ 'speaking_hub'  │ 'find_differences'             │ 12             │ 6          │ 'câu mô tả khác biệt (6 cặp)'                │
└─────────┴─────────────────┴────────────────────────────────┴────────────────┴────────────┴──────────────────────────────────────────────┘

TỔNG SỐ CÂU THỰC TẾ: 213 câu
TỔNG SỐ ITEM / CÂU HỎI THỰC TẾ: 120 items
```

### 2. Đối chiếu & Giải trình sai lệch so với báo cáo trước:
- **Nguồn gốc số "474 dòng":** Báo cáo trước đã lấy trực tiếp số dòng vật lý của file `src/data/weeks/week_33/reading_hub.js` (`wc -l` = 474 dòng) thay vì đếm nội dung dữ liệu thật bên trong.
- **Nguồn gốc số "556 câu":** Số liệu 556 câu trước đó là phép cộng ước lượng lỏng lẻo không qua script đếm parser AST/JSON thực tế.
- **Số liệu chính xác chạy lại:**
  - **213 câu hoàn chỉnh** (distinct English sentences qua 4 Hubs).
  - **120 bài tập / item câu hỏi khảo thí riêng biệt** (drill questions, gaps, cloze blanks, target pins, cue prompts).
- **Kiểm tra sự tồn tại của các field:** Toàn bộ **19/19 fields** liệt kê trong yêu cầu đều **TỒN TẠI THẬT SỰ** trong cấu trúc dữ liệu `weekData` của Week 33, không có field nào bị thiếu hay sai path.

---

## VIỆC 3: Khóa Thiết Kế Phương Án A (Cửa Sổ Nhận Thức Co Giãn) Ở Trạng Thái ĐỀ XUẤT

- **Xác nhận bằng văn bản:** Cơ chế **Phương án A (Spectral Warden + Context Shards)** và mô hình **Adaptive Cognitive Time Window** (co giãn cửa sổ thời gian theo độ khó/SRS Box) **ĐƯỢC KHÓA HOÀN TOÀN Ở TRẠNG THÁI ĐỀ XUẤT (PROPOSAL ONLY)**.
- **Cam kết thực thi:**
  - **CẤM và KHÔNG bắt đầu code** bất kỳ logic nào cho Phương án A cho đến khi nhận được phản hồi duyệt riêng của Owner.
  - **KHÔNG tự ý tick "hoàn thành"** bất kỳ game nào.
  - **KHÔNG bắt đầu** Word Class Duel (#6) hay Story Sequencer (#5). Toàn bộ hệ thống dừng tại đây chờ Owner review.
