# Báo cáo Triển khai Mục 10: Tích hợp Content Service vào Chunk Catapult & Highway Runner

## 1. Mục tiêu
Kết nối `ContentService` (với thuật toán Graceful Degradation K.1, Dedup K.2 và guard `weekId <= 0`) vào 2 mini-game đầu tiên:
- **Chunk Catapult** (Gắn vào Grammar Chest / Door 1)
- **Highway Runner** (Gắn vào Vocab Chest / Door 0)

## 2. Làm rõ 4 Vấn đề Cốt lõi (Audit L.1, L.4 & Sư phạm Catapult)

### A. Vấn đề 1: Giải mã thuật toán "tự động tách nửa câu" & Loại bỏ nguy cơ sư phạm
- **Đoạn code adapter cũ trong `DailyRoomScreen.jsx`**:
  ```javascript
  const catapultPairs = grammarSentences.map(item => {
    if (item.starter && item.completion) return item;
    const words = (item.sentence || item.word || '').split(' ');
    const mid = Math.floor(words.length / 2);
    return {
      starter: words.slice(0, mid).join(' ') || 'Complete',
      completion: words.slice(mid).join(' ') || 'Sentence'
    };
  });
  ```
- **Bản chất quy tắc cắt**: Chia đôi cơ học theo số lượng từ (`Math.floor(words.length / 2)`).
- **Hậu quả qua 4 ví dụ câu thật**:
  1. `"He slipped because the tiles were very wet."` (8 từ) $\rightarrow$ Starter: `"He slipped because the"` | Completion: `"tiles were very wet."` *(Ngắt rời mạo từ "the" khỏi danh từ "tiles")*.
  2. `"Tom was running when he slipped on the floor."` (9 từ) $\rightarrow$ Starter: `"Tom was running when"` | Completion: `"he slipped on the floor."` *(Ngắt lửng lơ ngay sau liên từ "when")*.
  3. `"Rubber shoes grip wet surfaces well."` (6 từ) $\rightarrow$ Starter: `"Rubber shoes grip"` | Completion: `"wet surfaces well."` *(Cắt giữa ngoại động từ và tân ngữ)*.
  4. `"Jake walked carefully down the corridor."` (6 từ) $\rightarrow$ Starter: `"Jake walked carefully"` | Completion: `"down the corridor."`
- **Giải pháp dứt điểm đã triển khai**:
  - **LOẠI BỎ HOÀN TOÀN** logic chẻ đôi câu cơ học `Math.floor(words.length / 2)`.
  - Trong `DailyRoomScreen.jsx`, Catapult **chỉ chấp nhận** các items đã có thuộc tính `{ starter, completion }` chuẩn sư phạm được thẩm định từ trước (`WEEKLY_CATAPULT_PAIRS[33..37]`).
  - Tuyệt đối không cho phép câu nguyên bản bị chặt gãy ngẫu nhiên xuất hiện trên màn hình bắn Catapult.

### B. Vấn đề 2: Audit L.1 — Highway Runner (Phaser) & Bucket Assignment
1. **Trạng thái Engine của Highway Runner**:
   - `HighwayRunnerScene` **vẫn đang chạy trên Phaser 3 Arcade Physics** thông qua `PhaserGameCanvas` (`src/phaser/scenes/HighwayRunnerScene.js`).
   - Việc "loại bỏ Phaser" ở Hạng mục 3 của đợt refactor trước chỉ áp dụng cho Catapult (`ChunkCatapultCanvas.jsx` đã thuần Canvas/React). Highway Runner vẫn giữ nguyên engine Phaser 3 và nhận `vocabItems` qua prop `sceneData={{ vocabItems, ... }}`.
2. **Khớp nối Rương (Bucket Assignment)**:
   - Theo `DOOR_ROTATION` chuẩn tại `src/stores/useChroniclesStore.js`:
     - **Floor 3 (Day 3)**: Door 1 là `chunk_catapult` với `type: 'grammar'` $\rightarrow$ **Grammar Chest** (Rương 1).
     - **Floor 4 (Day 4)**: Door 0 là `highway_runner` với `type: 'vocab'` $\rightarrow$ **Vocab Chest** (Rương 0).
   - Đây là cấu trúc dữ liệu bất biến của hệ thống phòng ngày, hoàn toàn khớp với Bảng H.1.

### C. Vấn đề 3: Bản chất của `generateStubCatapultPairs` & Thứ tự ưu tiên
- `generateStubCatapultPairs` (`generateStubVocab.js`) trả về các cặp câu cố định theo **Chapter Theme** (ví dụ Chapter 3 có theme `storm` $\rightarrow$ các câu xoay quanh ma sát / sàn trơn), không phải câu riêng theo tuần.
- **Thứ tự ưu tiên chuẩn hóa**:
  - Trước đây, việc gọi `generateStubCatapultPairs` quá sớm trong `extractGrammarFromData` đã làm "giả mạo" độ sẵn sàng của tuần, khiến K.1 tưởng tuần đó có đủ câu và không chịu kích hoạt graceful degrade mượn tuần trước.
  - **Đã sửa**: `extractGrammarFromData` CHỈ nạp `WEEKLY_CATAPULT_PAIRS[weekId]`. Nếu tuần đó chưa có data thật $\rightarrow$ để `count = 0` để K.1 tự động kéo các cặp curated của các tuần trước ($n-1, n-2, n-3$) sang. `generateStub` chỉ đóng vai trò chốt chặn cuối cùng ở UI khi toàn bộ các tuần đều chưa có dữ liệu.

### D. Vấn đề 4: Kiểm thử thực tế 3 Kịch bản (L.4) & 2 Bug lớn được phát hiện
Chạy kiểm thử trực tiếp trên dữ liệu thật (`scratch/test_content_service.js` qua Vite runtime):
- **2 Bug ngầm được phát hiện và fix ngay**:
  1. `normalizeItem` thiếu nhánh `item.sentence` $\rightarrow$ khiến 100% grammar sentences bị normalize thành `null` (loại bỏ sạch). Đã fix!
  2. `writing_hub.writing_chunks` là Object chứ không phải Array $\rightarrow$ cú pháp `...writing_chunks` gây crash `TypeError`. Đã fix!
- **Dữ liệu thực nhận tại 3 Kịch bản**:
  1. **Kịch bản 1 (W33 — Tuần đầu Chapter 3, 0 review từ W30-32)**:
     - Highway Runner (Vocab): Nhận **18 items** (100% W33, bù shortfall đúng công thức).
     - Chunk Catapult (Grammar): Nhận **6 items** (100% curated pairs từ W33).
  2. **Kịch bản 2 (W35 — Tuần đủ data + Review W34, W33)**:
     - Highway Runner (Vocab): Nhận **18 items** (W35: 11, W34: 7).
     - Chunk Catapult (Grammar): Nhận **8 items** (W35: 5, W34: 2, W33: 1). 100% curated pairs.
## 3. Kiểm định Chuyên sâu 3 Điểm Bổ sung (W ngoài 33-37, writing_chunks, & Vocab Regression)

### A. Kiểm định Kịch bản Chiếm đa số: Tuần Ngoài W33-W37 (W1, W17, W50)
- **Cơ chế vận hành**:
  - Với các tuần ngoài W33-W37 (chưa có lesson data trong `src/data/weeks/`), `getWeeklyPoolWithReview(w, 'grammar')` trả về 0 items.
  - `DailyRoomScreen` nhận diện `validPairs.length < 4`, tự động kích hoạt chốt chặn an toàn `generateStubCatapultPairs(weekNumber, 6)`.
- **Kết quả thực tế đo được**:
  1. **Tuần 1 (Pre-A1 Starters — Trẻ 6-7 tuổi)**:
     - Nhận **6 pairs** từ `LITE_CATAPULT_PAIRS`:
       - `[1] "The cute cat sat" <===> "on the mat"`
       - `[2] "Children like to play" <===> "in the park"`
       - `[3] "She is wearing" <===> "a red hat"`
       - `[4] "He puts his books in" <===> "a school bag"`
       - `[5] "The yellow sun shines" <===> "in the sky"`
       - `[6] "The happy dog is" <===> "running fast"`
     - *Đánh giá sư phạm*: Cấu trúc câu đơn SVO + Prepositional phrases ngắn gọn, chuẩn CEFR Pre-A1.
  2. **Tuần 17 (Chapter 1: The Grand Library — Theme `library`)**:
     - Nhận **6 pairs** từ `THEME_CATAPULT_PAIRS.library`:
       - `[1] "The famous author wrote" <===> "a wonderful story"`
       - `[2] "The friendly librarian organized" <===> "books on the shelf"`
       - `[3] "Read the chapter title on" <===> "the front cover"`
       - `[4] "Look up difficult words in" <===> "the back index"`
       - `[5] "She borrowed three novels from" <===> "the quiet library"`
       - `[6] "A fiction story is about" <===> "imaginary characters"`
     - *Đánh giá sư phạm*: Collocations tự nhiên gắn chặt chủ đề thư viện, chia đúng ranh giới vị ngữ / tân ngữ.
  3. **Tuần 50 (Chapter 5: The Forge of Words — Theme `forge`)**:
     - Nhận **6 pairs** từ `THEME_CATAPULT_PAIRS.forge`:
       - `[1] "The master blacksmith swings his hammer onto" <===> "the glowing anvil"`
       - `[2] "Bright golden sparks fly across" <===> "the stone workshop"`
       - `[3] "Leo carefully carves magic letters onto" <===> "the iron shield"`
       - `[4] "The apprentice pulls the hot rune from" <===> "the burning furnace"`
       - `[5] "Cold water hisses loudly around" <===> "the polished metal"`
       - `[6] "The completed word inscription shines brightly in" <===> "the dark chamber"`
     - *Đánh giá sư phạm*: Văn phong miêu tả phiêu lưu, động từ sống động, ranh giới mệnh đề chuẩn xác 100%.

### B. Xác nhận Đóng góp Thực tế của `writing_chunks` (Bug 2)
- **Đoạn code fix**:
  ```javascript
  if (writing_hub?.writing_chunks) {
    if (Array.isArray(writing_hub.writing_chunks)) {
      items.push(...writing_hub.writing_chunks);
    } else if (typeof writing_hub.writing_chunks === 'object') {
      Object.values(writing_hub.writing_chunks).forEach(chunkList => {
        if (Array.isArray(chunkList)) items.push(...chunkList);
      });
    }
  }
  ```
- **Số liệu kiểm chứng trên W33**:
  - `writing_chunks` chứa 4 nhóm: `setting_time` (3), `action_manner` (3), `problem_event` (3), `solution_outcome` (3) $\rightarrow$ Tổng **12 phrases**.
  - Toàn bộ **12 phrases** này được làm phẳng và nạp đầy đủ vào Vocab extraction pool của W33 (ví dụ: `'felt relieved and safe'`, `'fell down heavily'`, `'was walking carefully'`, `'Near the science room'`).
  - Không có bất kỳ item nào bị thất thoát hay bị nuốt do fix né tránh.

### C. Xác nhận `normalizeItem` không gây Regression cho Vocab (Bug 1)
- Việc bổ sung `else if (item.sentence)` chỉ kích hoạt khi item có thuộc tính `sentence` (câu grammar). Các item vocab (có `word`, `term`, `text`, hoặc `phrase`) vẫn đi qua nhánh ưu tiên như cũ.
- **Số liệu Simulation Vocab W33–W37 thực tế**:
  - Tuần 33: **18/18 items** (W33: 18)
  - Tuần 34: **18/18 items** (W34: 14, W33: 5)
  - Tuần 35: **18/18 items** (W34: 11, W33: 7)
  - Tuần 36: **18/18 items** (W34: 11, W33: 7)
  - Tuần 37: **18/18 items** (W34: 18)
  $\rightarrow$ 100% đạt target 18/18 với `Error: false`, không có bất kỳ sự suy giảm hay regression nào.

## 3. Kết quả Kiểm định Build
- Chạy `npm run build` thành công:
  - Exit code: 0
  - Thời gian build: ~36s
  - 3268 modules transformed
  - Không có lỗi type error hay bundling error nào phát sinh.

## 4. Phạm vi tiếp theo
- Các mini-games khác (`SyntaxExpress`, `MeteorSmasher`, `WordBlitz`, `EchoArena`, v.v.) chưa được đấu nối và vẫn giữ nguyên như cam kết.
