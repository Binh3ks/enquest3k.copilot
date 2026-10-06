# TICKET KỸ THUẬT: DEFECT-CW-CROSS-WEEK-FALLBACKS (MỞ RỘNG TỪ RISK-CW-02)
**Mã phiếu lỗi**: `DEFECT-CW-CROSS-WEEK-FALLBACKS`  
**Mức độ ưu tiên**: Medium (Không chặn việc đóng Batch Mechanics F1–F2; Bắt buộc xử lý trước khi kích hoạt học sinh tuần W34+)  
**Thời gian tạo**: 2026-09-11T11:35:00+07:00  
**Tập tin bị ảnh hưởng chính**:
- `src/modules/chronicles/DailyRoomScreen.jsx`
- `src/modules/quest/TitanGrammarForge.jsx`
- `src/modules/quest/ScrollChamberDecode.jsx`
- `src/modules/chronicles/games/ConnectorRelayGame.jsx`
- `src/modules/chronicles/games/StorySequencerGame.jsx`
- `src/modules/quest/RiddleRunMaze.jsx`
- `src/modules/quest/WordWagonJump.jsx`
- `src/modules/quest/AnvilRushGrammar.jsx`
- `src/modules/quest/SyntaxExpressRail.jsx`

---

## 1. MÔ TẢ LỖI (DEFECT DESCRIPTION)
Trong quá trình audit đối chiếu batch mini-game Floor 1–2, phát hiện các mini-game ngữ pháp và tích hợp trong The Lexio Chronicles đều xuất hiện các câu hardcoded cố định về chủ đề Tuần 33 (*"Corridor Safety / Friction / Rubber soles"*). 

Điều tra chuyên sâu mã nguồn xác nhận: **Các fallback này không phải là nội dung mẫu generic ngẫu nhiên**, mà là tàn dư của giai đoạn phát triển prototype W33 bị gắn cứng vĩnh viễn vào mã nguồn. Nghiêm trọng hơn, do sai lệch cấu trúc dữ liệu giữa bộ cấp phát `DailyRoomScreen.jsx` và các component con, **có tới 5 mini-game luôn luôn rơi vào fallback W33 với tỷ lệ 100% ở mọi tuần học (W33, W34, W35, v.v.)**.

---

## 2. BẢNG PHÂN TÍCH TẦN SUẤT RƠI VÀO FALLBACK RUNTIME THỰC TẾ

| STT | Game & Cửa | File Component | Tần suất Fallback W33 | Nguyên nhân kỹ thuật gốc (Root Cause) |
| :---: | :---: | :---: | :---: | :--- |
| 1 | **Titan Grammar Forge** (F5D2) | `TitanGrammarForge.jsx` | **100% ở mọi tuần** | Component yêu cầu `item.stem` và `item.options.length >= 3` (Dòng 103–105). Tuy nhiên, `contentService.js` chỉ sinh `{ sentence, starter, completion }`. Do điều kiện filter luôn trả về mảng rỗng, game luôn rơi vào `DEFAULT_TITAN_ROUNDS` (câu rubber soles/Jake/friction). |
| 2 | **Scroll Chamber Decode** (F2D3) | `ScrollChamberDecode.jsx` / `DailyRoomScreen.jsx` | **100% ở mọi tuần** | Trong `DailyRoomScreen.jsx` (Dòng 313–321), `title: 'The Principles of Friction & Safety'` và `distractors: ['Smooth', 'ice', 'cause', 'falls']` bị hardcode chết. Ngoài ra, code đọc `grammarSentences[0]?.fullSentence`, nhưng `contentService.js` chỉ cấp key `sentence` $\to$ luôn undefined và luôn dùng fallback *"Rubber shoes create strong friction..."*. |
| 3 | **Connector Relay** (F6D2) | `ConnectorRelayGame.jsx` | **100% ở mọi tuần** | `DailyRoomScreen.jsx` có truyền prop `grammarSentences`, nhưng `ConnectorRelayGame.jsx` (Dòng 50) **hoàn toàn không nhận prop này** vào component, luôn sử dụng mảng cố định `CONNECTOR_QUESTIONS` (chứa câu *"Tom lost his balance _____ rubber shoes normally provide good friction"*). |
| 4 | **Story Sequencer** (F6D3) | `StorySequencerGame.jsx` | **100% ở mọi tuần** | `DailyRoomScreen.jsx` không truyền bất kỳ prop câu chuyện tuần nào. Component luôn sử dụng `DEFAULT_STORY_SCENES` cố định về W33 (Jake, wet floor, nurse, bandage). |
| 5 | **Riddle Run Maze** (F4D3) | `RiddleRunMaze.jsx` | **100% ở mọi tuần** | `DailyRoomScreen.jsx` không truyền câu đố theo tuần. Component luôn dùng hằng số `RIDDLE_DATA` (câu đố về School Corridor, Rubber Shoes, First Aid Kit). |
| 6 | **Word Wagon Jump** (F1D2) | `WordWagonJump.jsx` | Phụ thuộc độ dài câu | Chạy động từ `grammarSentences` nếu câu có $\ge 6$ từ. Chỉ rơi vào fallback `DEFAULT_SENTENCES` khi câu quá ngắn hoặc pool cạn. |
| 7 | **Anvil Rush Grammar** (F2D2) | `AnvilRushGrammar.jsx` | Thấp (khi pool cạn) | Chạy động từ `grammarSentences`. Chỉ rơi vào `DEFAULT_GRAMMAR_ROUNDS` khi `grammarSentences` rỗng. |
| 8 | **Syntax Express Rail** (F4D2) | `SyntaxExpressRail.jsx` | Thấp (khi pool cạn) | Chạy động nếu item có `starter && completion`. Chỉ rơi vào `DEFAULT_SYNTAX_ROUNDS` khi thiếu cặp vế câu. |

---

## 3. GIẢI TRÌNH NHÂN VẬT "TOM" TRONG CONNECTOR RELAY GAME

- **Nguồn gốc**: Trong bài đọc CLIL Part 2 của Tuần 33 (`src/data/weeks/week_33/reading_hub.js` dòng 24–27), nhân vật học sinh chạy vội bị trượt ngã được đặt tên là **Tom**, còn **Jake** là người bạn đi ủng đế cao su đến đỡ Tom dậy và sơ cứu.
- **Vấn đề phát sinh**: 
  1. Trong bài đọc chính `read.js` và toàn bộ các station Story Retell, nhân vật bị trượt chân chỉ được gọi ẩn danh là *"a boy / his friend"*, còn người duy nhất có tên là **Jake**. 
  2. Khi `ConnectorRelayGame` sử dụng câu *"Tom lost his balance _____ rubber shoes normally provide good friction"*, học sinh không theo dõi kỹ bài đọc mở rộng CLIL sẽ thấy nhân vật "Tom" xuất hiện đột ngột, gây bối rối về tính nhất quán.
  3. Quan trọng hơn, do `ConnectorRelayGame` bị hardcode 100%, câu chuyện về Tom và Rubber shoes này sẽ tiếp tục xuất hiện ở Tuần 34 (chủ đề Sư tử và Chuột), Tuần 35 (Cắm trại trên núi), gây sai lệch hoàn toàn về mặt khảo thí và sư phạm.

---

## 4. KẾ HOẠCH HÀNH ĐỘNG VÀ KHẮC PHỤC (REMEDIATION PLAN)

### Nhiệm vụ 1: Chuẩn hoá Interface Data Pipeline giữa `DailyRoomScreen` và các Game
- **TitanGrammarForge**: Sửa `DailyRoomScreen.jsx` hoặc `TitanGrammarForge.jsx` để tự động biến đổi cặp `{ starter, completion }` hoặc `sentence` thành format `{ stem, correctClause, options }` động theo tuần, thay vì yêu cầu format tĩnh.
- **ScrollChamberDecode**: Sửa `fullSentence` $\to$ `item.sentence || item.fullSentence`. Động hoá `title` và `distractors` lấy từ `vocabItems` của tuần hiện tại thay vì hardcode "Friction & Safety".
- **ConnectorRelayGame**: Thêm prop `grammarSentences` vào component `ConnectorRelayGame.jsx`, bổ sung hàm sinh câu nối tự động (`because, although, so, unless, if`) dựa trên ngữ liệu của tuần.
- **StorySequencerGame**: Truyền `weekData.story_scenes` hoặc 5 câu bài đọc chính của tuần vào component thay vì dùng `DEFAULT_STORY_SCENES`.
- **RiddleRunMaze**: Kết nối dữ liệu câu đố từ `weekData` hoặc sinh câu đố định nghĩa từ vựng tuần.

### Nhiệm vụ 2: Thay thế toàn bộ Fallback Hardcoded W33 bằng Nội dung Trung tính (Generic Fallbacks)
Xoá bỏ hoàn toàn các câu liên quan đến *"rubber soles / wet floor / friction / corridor"* khỏi các mảng `DEFAULT_*_ROUNDS` của cả 7 file, thay bằng các câu tiếng Anh Cambridge trung tính, kinh điển, không gắn với bất kỳ tuần học cụ thể nào:
- *Ví dụ*: 
  - *"The brave explorer walked carefully into the ancient cave."*
  - *"Students must always listen attentively to the teacher's instructions."*
  - *"Clear planning helps people achieve their goals easily."*

### Nhiệm vụ 3: Sửa nhân vật "Tom" $\to$ "Jake" trong các bài tập W33
Đối với các câu thuộc mạch truyện chính W33, chuẩn hoá nhân vật về danh xưng chính thức **Jake** hoặc làm rõ ngữ cảnh *"Tom and Jake"* để đảm bảo tính nhất quán 100% trong toàn bộ bài học.
