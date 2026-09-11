# Báo Cáo Điều Tra Nguồn Gốc & Chuẩn Hóa Distractor Question Quest (Việc XX)
**Mã Nhiệm Vụ:** Việc XX — Question Quest (Hạng #4 Chronicles Floor 7 Door 2)  
**Ngày thực hiện:** 2026-09-11  
**Trạng thái:** ✅ ĐÃ ĐIỀU TRA GỐC RỄ + RÀ SOÁT TOÀN DIỆN MỌI TUẦN + SỬA VÀ PLAYTEST PASS 100%

---

## 1. Điều Tra Nguồn Gốc Distractor "Who drove the yellow bus?" Trong Tuần 35

### 1.1. Trích Dẫn Dòng Code Cụ Thể
- **File:** `src/services/chroniclesFloor67Service.js` dòng 544
- **Code nguyên văn trước khi sửa:**
  ```javascript
  export const WEEK_35_WH_QUESTIONS = [
    {
      id: 'w35_wh_1',
      sentence: "Early in the morning, the family packed their gear and drove towards Pine Mountain.",
      options: [
        { text: "Where did the family drive towards?", isCorrect: true },
        { text: "Who drove the yellow bus?", isCorrect: false }, // <-- DÒNG 544
        { text: "Why did they return home?", isCorrect: false }, // <-- DÒNG 545
      ],
      hint: "Identify the destination: 'towards Pine Mountain'."
    },
  ```

### 1.2. Nguồn Gốc: Lấy Từ Đâu?
- **Kết luận:** Đây là **hardcode tĩnh được soạn ad-hoc thủ công (handwritten ad-hoc hardcode)** khi agent tạo bộ câu hỏi `WEEK_35_WH_QUESTIONS` trong phiên làm việc trước đó.
- Không phải do lỗi logic trộn tuần (không có tuần nào khác có "yellow bus"), cũng không phải lấy từ generic pool ngẫu nhiên. Người soạn khi nghĩ ra phương án sai (distractor) đã tự tiện đưa vào một câu hỏi mang tính chế biến tùy tiện: `"Who drove the yellow bus?"` (Ai lái xe buýt màu vàng?) trong khi câu chuyện gốc là: `"Early in the morning, the family packed their gear and drove towards Pine Mountain."` (Gia đình chuẩn bị đồ đạc và lái xe ô tô gia đình đi cắm trại).
- Việc đưa vào một danh từ xa lạ ("yellow bus") là lỗi nội dung nghiêm trọng trong khảo thí ESL/Cambridge: làm học sinh loại trừ đáp án quá dễ dàng bằng mẹo (keyword elimination) thay vì phải phân tích ngữ nghĩa và trọng tâm thông tin của câu văn.

---

## 2. Bảng Rà Soát Toàn Bộ Distractor Của Tất Cả Các Tuần Có Nội Dung Tĩnh

### 2.1. Tuần 33 (`WEEK_33_WH_QUESTIONS` — Jake & Wet Corridor)
| Câu Gốc | Đáp Án Đúng | Distractor 1 | Distractor 2 | Đánh Giá Sư Phạm |
|---|---|---|---|---|
| **Câu 1:** Jake was walking carefully down the school corridor after science class. | What was Jake doing? | Where was Jake going? | When was Jake walking? | ✅ **CÙNG NGỮ CẢNH** (Jake/corridor/time) |
| **Câu 2:** Suddenly, he lost his balance on the wet floor and slipped. | What happened suddenly? | Why did he slip? | Where did he fall? | ✅ **CÙNG NGỮ CẢNH** (sàn ướt, trượt ngã) |
| **Câu 3:** Jake stopped immediately to help his friend and called the school nurse. | What did Jake do? | Who did Jake help? | When did Jake stop? | ✅ **CÙNG NGỮ CẢNH** (giúp bạn, y tá) |
| **Câu 4:** The nurse arrived quickly with a clean bandage and a cold pack to treat the cut. | What did the nurse bring? | Who did the nurse help? | When did the nurse arrive? | ✅ **CÙNG NGỮ CẢNH** (y tá, băng gạc) |
| **Câu 5:** Everyone felt relieved, and the headmaster reminded all students never to run. | What did the headmaster remind everyone about? | Why did everyone feel relieved? | Who did the headmaster talk to? | ✅ **CÙNG NGỮ CẢNH** (thầy hiệu trưởng) |
*Kết luận W33:* 10/10 distractors đều chuẩn ngữ cảnh sư phạm.

---

### 2.2. Tuần 34 (`WEEK_34_WH_QUESTIONS` — Lion & Mouse) [TRƯỚC VÀ SAU KHI SỬA]
| Câu Gốc | Đáp Án Đúng | Distractor Cũ (LỖI) | Distractor Mới (ĐÃ CHUẨN HÓA) |
|---|---|---|---|
| **Câu 1:** On a warm afternoon, the mighty lion was sleeping peacefully under the trees. | What was the mighty lion doing under the trees? | ❌ Where did the hunters go?<br>❌ Who woke up the hunters? *(Hunters chưa xuất hiện!)* | ✅ Where was the mighty lion sleeping?<br>✅ When was the mighty lion sleeping peacefully? |
| **Câu 2:** While the lion was resting, a tiny mouse ran across the lion's big front paw. | What ran across the lion's big front paw? | ⚠️ Why was the lion running?<br>⚠️ Where did the mouse sleep? *(Lệch chủ thể)* | ✅ What was the lion doing when the mouse ran by?<br>✅ Where did the tiny mouse run across? |
| **Câu 3:** The mouse begged for mercy and promised to help the lion one day if he let him go. | What did the mouse promise to do? | ⚠️ When did the lion trap the mouse?<br>❌ Who caught the hunters? *(Sai logic)* | ✅ Who begged the mighty lion for mercy?<br>✅ Why did the mouse ask the lion to let him go? |
| **Câu 4:** A few days later, hunters trapped the lion in a strong net made of thick ropes. | Who trapped the lion in a strong net? | ❌ Why did the mouse roar loudly?<br>❌ What did the lion eat? *(Ngoài cốt truyện)* | ✅ What did the hunters trap the lion with?<br>✅ When did the hunters trap the mighty lion? |
| **Câu 5:** The little mouse quickly chewed through the ropes and set the lion completely free. | How did the little mouse set the lion free? | ❌ Where was the hunter's house?<br>❌ Why was the mouse afraid of the net? *(Lạ)* | ✅ Who chewed through the thick ropes?<br>✅ What did the little mouse chew through? |

---

### 2.3. Tuần 35 (`WEEK_35_WH_QUESTIONS` — Pine Mountain Camping) [TRƯỚC VÀ SAU KHI SỬA]
| Câu Gốc | Đáp Án Đúng | Distractor Cũ (LỖI) | Distractor Mới (ĐÃ CHUẨN HÓA) |
|---|---|---|---|
| **Câu 1:** Early in the morning, the family packed their gear and drove towards Pine Mountain. | Where did the family drive towards? | ❌ Who drove the yellow bus?<br>❌ Why did they return home? | ✅ When did the family pack their gear?<br>✅ What did the family pack early in the morning? |
| **Câu 2:** While Dad was pitching the camp tent, the children collected dry firewood. | What was Dad doing while the children collected wood? | ⚠️ Where was the large camp tent?<br>❌ When did the storm arrive? *(Không có bão)* | ✅ Who collected dry firewood for the camp?<br>✅ What did the children collect while Dad was busy? |
| **Câu 3:** They spotted two playful squirrels while hiking along the mountain stream. | What did they spot along the stream? | ❌ Who caught the brown bear?<br>❌ Why was the stream muddy? *(Không có gấu)* | ✅ Where were they hiking when they saw the squirrels?<br>✅ How many playful squirrels did the family spot? |
| **Câu 4:** Dad lit the warm campfire when the golden sun sank behind the ridges. | When did Dad light the campfire? | ❌ Where did they find matches?<br>❌ Who put out the campfire? *(Không có diêm)* | ✅ Who lit the warm campfire in the evening?<br>✅ Where did the golden sun sink? |
| **Câu 5:** Under the starry night sky, they roasted sweet marshmallows and sang happy songs. | What did they roast under the starry night sky? | ❌ Who cooked the fish?<br>❌ Why was the forest noisy? *(Không có cá)* | ✅ Where did they roast sweet marshmallows and sing songs?<br>✅ What did they sing under the starry night sky? |

---

### 2.4. `GENERIC_WH_QUESTIONS` (Astronaut Training Chamber) [ĐÃ CHUẨN HÓA]
- Thay thế toàn bộ distractors lạ (`"Where did the rocket launch?"`, `"Why did the lights flicker?"`, `"Who discovered the new planet?"`) bằng các câu hỏi trích xuất trực tiếp từ các mệnh đề của câu văn không gian:
  - Câu 1: `"Where was the brave astronaut floating?"`, `"How did the astronaut float in the chamber?"`
  - Câu 2: `"What happened suddenly in the training chamber?"`, `"What fluctuated and caused the warning buzzer to beep?"`
  - Câu 3: `"Who calibrated the solar panels?"`, `"When were the solar panels calibrated?"`
  - Câu 4: `"Who discovered the sparkling crystal?"`, `"What did Dr. Nova discover in the lunar crater?"`
  - Câu 5: `"What did the commander award to the crew members?"`, `"Who received the gold badges for courage?"`

---

## 3. Nguyên Tắc Sư Phạm Bắt Buộc Sau Chuẩn Hóa
1. **100% Cùng Ngữ Cảnh & Chia Sẻ Thực Thể:** Mọi danh từ, nhân vật, địa điểm trong distractors BẮT BUỘC phải nằm trong câu chuyện narrative của tuần đó.
2. **Khác Loại Thông Tin (WH-Slot Shift):** Distractor sai vì đổi đại từ nghi vấn (WH-word: *When*, *Where*, *Who*, *Why*, *How many*) nhằm vào các chi tiết thông tin phụ khác trong câu văn, kiểm tra năng lực đọc hiểu sâu sắc của học sinh.

---

## 4. Bằng Chứng Playtest Trực Quan Sau Sửa
- **W35 Hazard Live:** Cổng sai được chọn là `"When did the family pack their gear?"` (cùng ngữ cảnh khởi hành Pine Mountain), trừ 1 tim chính xác.
- **W34 Context Verified:** Cả 3 cổng hiển thị:
  - Cổng đúng: `What was the mighty lion doing under the trees?`
  - Cổng sai 1: `Where was the mighty lion sleeping?`
  - Cổng sai 2: `When was the mighty lion sleeping peacefully?`
- Toàn bộ 4/4 tổ hợp playtest đều PASS tuyệt đối.
