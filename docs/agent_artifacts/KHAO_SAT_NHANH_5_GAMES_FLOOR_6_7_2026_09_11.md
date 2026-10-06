# BÁO CÁO KHẢO SÁT NHANH CƠ CHẾ VẬN ĐỘNG 5 GAME FLOOR 6 & FLOOR 7 (ĐÃ CẬP NHẬT HOÀN THIỆN)
**Mã khảo sát**: `QUICK-AUDIT-F6-F7-MECHANICS-2026-09-11`  
**Thời gian cập nhật**: 2026-09-11T12:07:00+07:00  
**Tập tin minh chứng JSON**: `docs/agent_artifacts/screenshots/quick_audit_floor_6_7_evidence.json`  

---

## 📊 BẢNG TỔNG HỢP TRẢ LỜI 4 CÂU HỎI KHẢO SÁT CHO 5 GAME

| Game & Cửa | 1. Có điều khiển Leo di chuyển không? | 2. Có Physics / Gravity / Collision? | 3. Có rủi ro mất tim thời gian thực? | 4. Phân loại thực tế |
| :--- | :---: | :---: | :---: | :--- |
| **Connector Relay** (F6D2) | ❌ **KHÔNG** (Không có Leo, phím bấm vô tác dụng; chỉ click 1 trong 4 nút liên từ) | ❌ **KHÔNG** (Giao diện DOM tĩnh, không có canvas/trọng lực) | ❌ **KHÔNG** (Chỉ trừ tim khi click sai đáp án; có timer 75s) | 🚨 **Quiz trắc nghiệm 4 lựa chọn (MCQ Liên từ)** |
| **Story Sequencer** (F6D3) | ❌ **KHÔNG** (Không có Leo; chỉ click thẻ 1 rồi click thẻ 2 để đổi chỗ) | ❌ **KHÔNG** (Danh sách thẻ xếp chồng flexbox tĩnh) | ❌ **KHÔNG** (Không có tim trong game; chỉ có timer 60s) | 🚨 **Bài tập sắp xếp thứ tự thẻ (Card Swap Ordering)** |
| **Word Forge Scramble** (F7D1) | ❌ **KHÔNG** (Không có Leo; chỉ click các ô chữ cái xáo trộn) | ❌ **KHÔNG** (Không có vật lý hay va chạm) | ❌ **KHÔNG** (Chỉ trừ tim khi ghép xong cả từ mà sai chính tả) | 🚨 **Bài tập xếp chữ cái (Anagram / Word Scramble)** |
| **Question Quest** (F7D2) | ❌ **KHÔNG** (Không có Leo; chỉ click chọn 1 trong 3 câu hỏi WH) | ❌ **KHÔNG** (Giao diện trắc nghiệm dạng thẻ văn bản) | ❌ **KHÔNG** (Chỉ trừ tim khi chọn sai thẻ; có timer 75s) | 🚨 **Quiz trắc nghiệm 3 lựa chọn (3-Choice WH-MCQ)** |
| **Word Class Duel** (F7D3) | ❌ **KHÔNG** (Không có Leo; chỉ click chọn 1 trong 4 thẻ câu ngữ cảnh) | ❌ **KHÔNG** (Không có đối kháng hay vật lý dù tên là Duel) | ❌ **KHÔNG** (Chỉ trừ tim khi chọn sai thẻ từ loại; có timer 75s) | 🚨 **Quiz trắc nghiệm 4 lựa chọn (Parts-of-Speech MCQ)** |

---

## 🔍 DUMP NGUYÊN VĂN MẢNG `CONNECTOR_QUESTIONS` TRONG `ConnectorRelayGame.jsx` (VIỆC S)

Trích xuất trực tiếp từ mã nguồn `src/modules/chronicles/games/ConnectorRelayGame.jsx` (Dòng 17–48):

```javascript
const CONNECTOR_QUESTIONS = [
  {
    sentence: "Jake walked carefully down the corridor _____ the floor was wet after science class.",
    answer: "because",
    options: ["because", "although", "so", "unless"],
    hint: "The second clause explains the cause/reason for walking carefully."
  },
  {
    sentence: "The nurse arrived immediately, _____ she quickly wrapped a clean bandage around his knee.",
    answer: "and",
    options: ["and", "but", "although", "because"],
    hint: "Connecting two consecutive actions in the sequence."
  },
  {
    sentence: "Tom lost his balance _____ rubber shoes normally provide good friction.",
    answer: "although",
    options: ["although", "because", "so", "unless"],
    hint: "Contrast between normal expectation and the actual outcome."
  },
  {
    sentence: "Students should always walk slowly _____ dangerous slips can be avoided.",
    answer: "so",
    options: ["so", "because", "although", "since"],
    hint: "Shows the intended result or purpose of walking slowly."
  },
  {
    sentence: "You will slip on the smooth corridor tiles _____ you wear shoes with strong rubber grip.",
    answer: "unless",
    options: ["unless", "because", "although", "so"],
    hint: "'Unless' means 'except if'."
  }
];
```

**Nhận xét**: Cả **5/5 câu (100%)** trong `CONNECTOR_QUESTIONS` đều bị gắn chết vào nội dung Tuần 33 (Corridor Safety, nurse/bandage, Tom/rubber friction, slippery tiles). Khi sang tuần khác (W34 Lion/Mouse, W35 Camping...), cả 5 câu này vẫn hiển thị nguyên vẹn. Toàn bộ 5 segment này cần đưa vào diện Generic Fallback Sanitization.
