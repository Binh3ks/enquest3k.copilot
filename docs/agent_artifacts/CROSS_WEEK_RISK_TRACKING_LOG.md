# SỔ THEO DÕI RỦI RO LÂY NHIỄM NỘI DUNG LIÊN TUẦN (CROSS-WEEK CONTENT POLLUTION REGISTER)
*Khởi tạo: 2026-09-10 — Trong khuôn khổ Audit 21 Minigame Chronicles W33*

---

## 🎯 MỤC ĐÍCH
Tài liệu này lưu trữ các điểm nghẽn rủi ro lây nhiễm nội dung liên tuần (Cross-Week Content Pollution) được phát hiện trong quá trình audit từng game riêng lẻ của Tuần 33.
Theo nguyên tắc quản lý dự án: **Không ngắt quãng tiến trình audit game hiện tại (C1 $\to$ C21)**; các điểm nghẽn này được đánh số, phân loại chi tiết và gom lại để xử lý đồng bộ ở đợt nâng cấp multi-week pipeline tiếp theo.

---

## 📋 DANH MỤC CÁC ĐIỂM NGHẼN RỦI RO ĐÃ XÁC NHẬN

### 🔴 RISK-CW-01: `CURRICULUM_DEFINITIONS` — Từ điển định nghĩa tĩnh dùng chung mọi tuần
- **Phát hiện tại**: Audit C5 (`GrandMatrixDungeon.jsx`)
- **Tệp nguồn**: `src/services/contentService.js` (line 7-45)
- **Bản chất kỹ thuật**:
  - `CURRICULUM_DEFINITIONS` là một `const` dictionary tĩnh gồm khoảng 40 từ vựng.
  - Khi một từ vựng trong bài học không có trường `definition_en`, `normalizeItem()` sẽ tra cứu vào từ điển tĩnh này bất kể `weekNumber` là bao nhiêu.
  - Nếu từ vựng ở W34/W35 trùng từ hoặc rơi vào fallback này, định nghĩa hiển thị sẽ là định nghĩa của từ điển tĩnh.
- **5 Điểm chạm hệ thống bị ảnh hưởng**:
  1. `MCQBlitzPopup.jsx`
  2. Floor 1 Door 1 (`ArcaneBubbleChase` / `BubbleStormChase`)
  3. Floor 2 Door 1 (`DungeonRoom` / `CrystalMatchGame`)
  4. `src/modules/chronicles/extractQuestVocab.js`
  5. `src/services/contentService.js`
- **Kế hoạch xử lý**:
  - Xử lý trực tiếp khi hàng đợi audit chạm đến **F1D1 (Arcane Bubble)** và **F2D1 (Crystal Match)**.

---

### 🔴 RISK-CW-02: `DEFAULT_TITAN_ROUNDS` — Hardcode 3 câu Grammar Nâng cao W33
- **Phát hiện tại**: Audit C6 (`TitanGrammarForge.jsx`)
- **Tệp nguồn**: `src/modules/quest/TitanGrammarForge.jsx` (line 43-74)
- **Bản chất kỹ thuật**:
  - `DEFAULT_TITAN_ROUNDS` là một mảng `const` tĩnh 3 câu ngữ pháp nâng cao thuộc chủ đề W33 (Friction, Rubber soles, Jake's corridor accident).
  - Component `TitanGrammarForge` nhận `grammarSentences` từ `DailyRoomScreen` (`pools.grammar`), nhưng kiểm tra điều kiện:
    ```javascript
    const validCustomRounds = grammarSentences.filter(item => 
      item && item.stem && Array.isArray(item.options) && item.options.length >= 3
    );
    if (validCustomRounds.length >= 3) {
      return validCustomRounds.slice(0, 3);
    }
    return DEFAULT_TITAN_ROUNDS;
    ```
  - Hiện tại, `contentService.js` (`extractGrammarFromData`) chỉ cung cấp các đối tượng dạng `{ sentence, hint }` hoặc `{ sentence, starter, completion }`, **HOÀN TOÀN KHÔNG CÓ** schema `{ stem, options: [{ id, text, isCorrect }] }`.
  - Do đó, `validCustomRounds` luôn có độ dài 0 $\implies$ Mọi tuần (W34, W35, ...) khi chơi Titan Grammar Forge đều rơi vào fallback `DEFAULT_TITAN_ROUNDS` của Tuần 33.
- **Kế hoạch xử lý**:
  - **Không sửa ngay bây giờ** (tránh làm sai lệch dữ liệu chuẩn W33 đang kiểm duyệt).
  - Trong đợt xây dựng pipeline cho W34+, viết một adapter chuyên dụng trong `contentService.js` hoặc `DailyRoomScreen.jsx` để tự động chuyển đổi grammar data của tuần đó (hoặc sentence drills) thành cấu trúc `stem + 3 options` theo đúng tuần, thay vì phụ thuộc hằng số tĩnh.

---

## 📌 LỊCH TRÌNH VÀ CAM KẾT KIỂM SOÁT
- [x] **C1 — Chunk Catapult**: Hoàn thành & Đóng.
- [x] **C2 — Highway Runner**: Hoàn thành & Đóng.
- [x] **C3 — Syntax Express Rail**: Hoàn thành & Đóng.
- [x] **C4 — Lexical Riddle**: Hoàn thành & Đóng.
- [x] **C5 — Grand Master Matrix**: Hoàn thành & Đóng (Ghi nhận RISK-CW-01).
- [ ] **C6 — Titan Grammar Forge**: Đã khắc phục toạ độ mobile clamping & tương tác thật; Ghi nhận RISK-CW-02.
- [ ] **C7 — Cambridge Cloze Gauntlet**: Chuẩn bị audit tiếp theo.
- [ ] **F1D1 & F2D1**: Điểm xử lý tập trung cho RISK-CW-01.
