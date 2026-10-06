# BÁO CÁO GIẢI TRÌNH VIỆC O & VIỆC P: NGUỒN GỐC SENTENCE POOL & ĐỐI CHIẾU TIMER F2D2 MOBILE
**Mã văn bản**: `FORENSIC-CW02-F2D2-2026-09-11`  
**Thời gian lập**: 2026-09-11T11:30:00+07:00  
**Tập tin minh chứng liên quan**:
- JSON Evidence: `docs/agent_artifacts/screenshots/audit_floor_1_2_evidence.json`
- Ảnh F2D2 Mobile Baseline: `docs/agent_artifacts/screenshots/f2d2_anvil_rush_mobile_baseline_precise.png`
- Ảnh F2D2 Mobile Action: `docs/agent_artifacts/screenshots/f2d2_anvil_rush_mobile_action_precise.png`
- Crop Timer Baseline: `docs/agent_artifacts/screenshots/crop_f2d2_anvil_rush_mobile_baseline_precise.png`
- Crop Timer Action: `docs/agent_artifacts/screenshots/crop_f2d2_anvil_rush_mobile_action_precise.png`

---

## 🏛️ PHẦN 1: VIỆC O — XÁC ĐỊNH NGUỒN GỐC CÂU "WET FLOOR / RUBBER SOLES" & BẢN ĐỒ RỦI RO CROSS-GAME

### 1. Kết luận sơ bộ
Câu *"Suddenly, he lost his balance on the wet floor"* và *"Rubber shoe soles provide a strong grip"* **LÀ 1 POOL DÙNG CHUNG CỦA TOÀN BỘ CHƯƠNG TRÌNH TUẦN W33**, được nạp động từ hệ thống trung tâm `contentService.js` $\to$ `DailyRoomScreen.jsx` và truyền xuống các mini-game qua prop `grammarSentences`.

Đồng thời, khi không có prop hoặc prop không đủ điều kiện, các mini-game này lại có các bộ hằng số fallback nội bộ (`DEFAULT_*_ROUNDS`) **cũng do dev viết xoay quanh cùng chủ đề W33 "Corridor Safety / Friction"**.

---

### 2. Truy vết nguồn gốc chi tiết theo 5 tầng kiến trúc code

#### 📍 Tầng 1: Master Curriculum Story W33 (Gốc rễ nội dung bài đọc)
Tất cả các câu này bắt nguồn từ bài đọc chính khóa tuần 33:
- **Tập tin**: `src/data/weeks/week_33/read.js`
  - Câu 3 (Dòng 9, 33, 100): `"Suddenly, he lost his balance on the wet floor and slipped."`
- **Tập tin**: `src/data/weeks/week_33/reading_hub.js`
  - CLIL Reading Part 2 (Dòng 25): *"How Rubber Shoes Keep Us Safe... his own rubber soles gripped the floor tightly without sliding at all!"*
  - Drill Rule (Dòng 68–70): `"Rubber shoe soles provide strong grip on wet floors to stop accidental slips"`

#### 📍 Tầng 2: Curated Collocation Pool (`extractQuestVocab.js`)
Để phục vụ cơ chế Story Retell & Chunk Catapult chuẩn Linear Thinking ESL, các câu trên được chuẩn hóa thành mảng `{ starter, completion }`:
- **Tập tin**: `src/modules/chronicles/extractQuestVocab.js` (Dòng 294–302):
```javascript
export const WEEKLY_CATAPULT_PAIRS = {
  33: [
    { starter: 'Jake was walking carefully down', completion: 'the school corridor' },
    { starter: 'Suddenly, he lost his balance on', completion: 'the wet floor' },          // <--- CÂU 2
    { starter: 'Jake stopped immediately and called', completion: 'the school nurse' },
    { starter: 'The nurse arrived quickly with', completion: 'a clean bandage' },
    { starter: 'The headmaster reminded all students', completion: 'never to run in corridors' },
    { starter: 'Rubber shoe soles provide', completion: 'a strong grip' },                // <--- CÂU 6
  ],
```

#### 📍 Tầng 3: SRS Grammar Pool Service (`contentService.js`)
Khi hệ thống nạp dữ liệu ngữ pháp cho tuần 33 (`loadBucketPool(33, 'grammar')`), vì `reading_hub.js` và `listening_hub.js` không chứa mảng drill truyền thống có key `sentence`, hàm `extractGrammarFromData` lấy trực tiếp `WEEKLY_CATAPULT_PAIRS[33]`:
- **Tập tin**: `src/services/contentService.js` (Dòng 71–79 & 308–309):
```javascript
  // Add curated Catapult pairs to grammar bucket if present for this week
  if (WEEKLY_CATAPULT_PAIRS[weekId]) {
    sentences.push(...WEEKLY_CATAPULT_PAIRS[weekId].map(p => ({
      sentence: `${sanitizeChunkText(p.starter)} ${sanitizeChunkText(p.completion)}`,
      hint: '',
      starter: sanitizeChunkText(p.starter),
      completion: sanitizeChunkText(p.completion)
    })));
  }
```
Tại Dòng 364 của `getWeeklyPoolWithReview`:
```javascript
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
```
Mảng 6 câu này được xáo trộn ngẫu nhiên và trả về client.

#### 📍 Tầng 4: Bộ phân phối trung tâm `DailyRoomScreen.jsx`
Trong `DailyRoomScreen.jsx`, hook nạp dữ liệu một lần duy nhất khi vào phòng:
- **Tập tin**: `src/modules/chronicles/DailyRoomScreen.jsx` (Dòng 108, 114, 143):
```javascript
  const grammarRes = await getWeeklyPoolWithReview(weekNumber, 'grammar');
  // ...
  const grammarSentences = pools.grammar;
```
Biến `grammarSentences` này chính là **pool dùng chung** được truyền xuống các mini-game.

---

### 3. Bản đồ toàn bộ các Game tiếp nhận Shared Pool `grammarSentences` (Phạm vi ảnh hưởng cross-game)

Không chỉ có 3 game (Word Wagon Jump, Anvil Rush, Titan Grammar Forge), mà có tới **8 Mini-Game** trong `DailyRoomScreen.jsx` đang import và nhận prop `grammarSentences` từ pool trung tâm này:

| STT | Cửa & Tầng | Tên Mini-Game | File Component | Cách sử dụng `grammarSentences` |
| :---: | :---: | :---: | :---: | :--- |
| 1 | **Floor 1 Door 2** | Word Wagon Jump | `WordWagonJump.jsx` | Nhận prop `grammarSentences` (Dòng 297). Tách từ, đục lỗ từ thứ 2 (`he`) và từ cuối (`floor`) $\to$ Sinh banner: *"Suddenly, [ 1: ??? ] lost his balance on the wet [ 2: ??? ]"*. |
| 2 | **Floor 2 Door 2** | Anvil Rush Grammar | `AnvilRushGrammar.jsx` | Nhận prop `grammarSentences` (Dòng 307). Lấy từ thứ 2 (`he` hoặc `shoe`) làm `blankWord` $\to$ Sinh banner: *"Suddenly, ___ lost his balance on the wet floor"* hoặc *"Rubber ___ soles provide a strong grip"*. |
| 3 | **Floor 2 Door 3** | Scroll Chamber Decode | `ScrollChamberDecode.jsx` | Nhận câu đầu tiên `grammarSentences[0]?.fullSentence` (Dòng 314) làm bài giải mã cuộn giấy cổ. |
| 4 | **Floor 3 Door 2** | Chunk Catapult Match | `ChunkCatapultCanvas.jsx` | Nhận các cặp `{ starter, completion }` từ `grammarSentences` (Dòng 337–344) làm đạn bắn đá ghép vế câu. |
| 5 | **Floor 4 Door 2** | Syntax Express Rail | `SyntaxExpressRail.jsx` | Nhận prop `grammarSentences` (Dòng 375). Tách vế `{ stem, correctClause }` làm bài bẻ ghi đường ray xe lửa. |
| 6 | **Floor 5 Door 2** | Titan Grammar Forge | `TitanGrammarForge.jsx` | Nhận prop `grammarSentences` (Dòng 385). Do yêu cầu struct `stem` + 3 options, game chuyển sang dùng `DEFAULT_TITAN_ROUNDS` (chứa câu *"The engineer designed rubber soles so that..."*). |
| 7 | **Floor 6 Door 2** | Connector Relay | `ConnectorRelayGame.jsx` | Nhận prop `grammarSentences` (Dòng 395). (Có thêm hằng số `CONNECTOR_QUESTIONS` chứa *"Tom lost his balance _____ rubber shoes normally provide good friction"*). |
| 8 | **Legacy Fallback** | Spell Train Game | `SpellTrainGame.jsx` | Nhận prop `grammarSentences` (Dòng 413) khi door có `type === 'grammar'`. |

---

### 4. Danh sách các hằng số Fallback Pool cục bộ (`DEFAULT_*_ROUNDS`)

Ngoài pool động dùng chung, từng component còn tự định nghĩa các bộ câu tĩnh đề phòng mất mạng / không có prop, và các bộ câu này cũng khai thác sâu chủ đề W33:
1. **`WordWagonJump.jsx`** (Dòng 49):
   `fullSentence: 'Rubber soles give strong grip on slippery tiles.'`
2. **`AnvilRushGrammar.jsx`** (Dòng 47):
   `sentence: 'Rubber shoes ___ strong grip on wet floor.'`
3. **`ScrollChamberDecode.jsx`** (Dòng 52):
   `fullSentence: 'Rubber shoes create strong friction to prevent dangerous slips on wet corridor floors.'`
4. **`SyntaxExpressRail.jsx`** (Dòng 55):
   `fullSentence: 'Because friction was increased by rubber, Jake walked without falling.'`
5. **`TitanGrammarForge.jsx`** (Dòng 57):
   `fullSentence: 'The engineer designed rubber soles so that workers would stay safe.'`
6. **`RiddleRunMaze.jsx`** (Dòng 52):
   `riddle: 'I have soles made of special rubber that give strong grip on wet floors. What am I?'`
7. **`StorySequencerGame.jsx`** (Dòng 19):
   `text: 'Suddenly, he lost his balance on the wet floor and slipped.'`

> ⚠️ **Đánh giá rủi ro kiến trúc (Mở rộng từ RISK-CW-02)**:  
> Việc một học sinh chơi liên tiếp từ Tầng 1 đến Tầng 5 gặp lại câu *"lost his balance on the wet floor"* và cụm từ *"rubber soles / shoes"* **KHÔNG PHẢI lỗi ngẫu nhiên cá biệt của riêng Titan Grammar Forge**, mà là **hệ quả của 2 cơ chế**:
> 1. Pool động `WEEKLY_CATAPULT_PAIRS[33]` chỉ có 6 câu đại diện cho W33 được chia sẻ cho toàn bộ 8 mini-game ngữ pháp.
> 2. Các fallback hardcoded trong từng file đều lấy cảm hứng từ cùng một bài đọc W33.  
> Để khắc phục lâu dài, cần mở rộng kích thước pool ngữ pháp per week (từ 6 câu lên 15–20 câu đa dạng) để các tầng không bốc trùng câu của nhau.

---

## ⏱️ PHẦN 2: VIỆC P — ĐỐI CHIẾU LẠI TIMER F2D2 MOBILE

### 1. Vấn đề nêu ra
Đối chiếu 2 ảnh:
- `f2d2_anvil_rush_mobile_baseline_precise.png`
- `f2d2_anvil_rush_mobile_action_precise.png`
Có nghi vấn: Cả 2 ảnh đều hiện `1:15` trong khi JSON evidence ghi action = `1:14`. Liệu có phải ảnh action bị chụp nhầm (chụp lại khung baseline) hay JSON ghi sai?

---

### 2. Kết quả kiểm chứng pixel thực tế (Crop 300% vùng đồng hồ HUD)

Thực hiện crop chính xác tọa độ badge Timer góc trên bên phải (`x: 310..385, y: 10..45`) từ 2 file ảnh gốc trên ổ đĩa:

| Loại ảnh | Tên file ảnh gốc | Số hiển thị trên HUD Timer | Trạng thái vị trí Leo | Trạng thái Imp |
| :--- | :--- | :---: | :---: | :---: |
| **Baseline** | `f2d2_anvil_rush_mobile_baseline_precise.png` | ⏱️ **1:15** | $x = 80$ (Bên trái đe `shoe`) | $x = 502$ |
| **Action** | `f2d2_anvil_rush_mobile_action_precise.png` | ⏱️ **1:14** | $x = 224$ (Bên phải đe `shoe`, $\Delta x = +144\text{px}$) | $x = 612$ |

#### 🔍 Ảnh crop phóng đại đối chiếu trực quan:

1. **Crop Timer Baseline (`crop_f2d2_anvil_rush_mobile_baseline_precise.png`)**:
   - Hiển thị rõ ràng chữ số **`1:15`** (chữ số cuối có nét cong tròn đặc trưng của số **`5`**).
2. **Crop Timer Action (`crop_f2d2_anvil_rush_mobile_action_precise.png`)**:
   - Hiển thị rõ ràng chữ số **`1:14`** (chữ số cuối có nét gập vuông hở ở đỉnh đặc trưng của số **`4`**).

---

### 3. Giải thích nguyên nhân nghi vấn

1. **Ảnh Action 100% KHÔNG chụp nhầm baseline**:
   - Nhân vật Leo ở ảnh baseline đứng ở toạ độ $x = 80$ (bên trái cái đe).
   - Ở ảnh action, Leo đã di chuyển $+144\text{px}$ sang toạ độ $x = 224$ (đứng hẳn sang bên phải cái đe).
   - Quái vật Forge Imp ở baseline ở vị trí $x = 502$, sang action đã bay sang $x = 612$.
   - Nếu chụp nhầm baseline, cả 3 đối tượng (Leo, Imp, Timer) sẽ phải trùng khớp hoàn toàn, nhưng ở đây cả 3 đều đã thay đổi trạng thái runtime.
2. **Tại sao nhìn mắt thường trên ảnh mobile nguyên khổ dễ tưởng là 1:15?**:
   - Khung hình mobile có kích thước $390 \times 844$.
   - Badge Timer nằm ở góc phải với cỡ chữ nhỏ (~12–13px), nét font pixel khá dày. Khi xem ở kích thước thu nhỏ trên màn hình máy tính không zoom 100%, nét gập của số **`4`** rất dễ bị ảo giác thị giác nhìn lướt qua thành số **`5`**.
   - Khi crop phóng đại 300% vùng badge này, chữ số **`4`** hiện lên hoàn toàn sắc nét và không thể nhầm lẫn.
3. **Kết luận**:
   - **JSON evidence ghi hoàn toàn chính xác** (`baseline: 1:15`, `action: 1:14`).
   - **File ảnh action hiển thị hoàn toàn chính xác** (`1:14`).
   - Hai nguồn tài liệu khớp nhau 100%, không có sự sai lệch hay chụp nhầm.
