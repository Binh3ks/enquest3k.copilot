# BÁO CÁO AUDIT CHI TIẾT TÍNH NĂNG VÀ SUB-TABS THEO TRẢI NGHIỆM TRẺ (ENGQUEST3K UX)

---

## 1. MÔ TẢ CHI TIẾT THEO TỪNG TRẠM (TRẠM 1 → 4) VÀ PARENT DASHBOARD

---

### TRẠM 1: WORLD DISCOVERY HUB (READING & NARRATIVE)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ nhìn thấy khung bìa tiêu đề lớn rực rỡ mang tên bài đọc `"Tom's Clumsy Saturday Morning"` kèm hình minh họa chú bé Tom. Phía trên màn hình có 2 tab chuyển đổi chính:
  - **Learn Mode (Chế độ Học)**
  - **Check Mode (Chế độ Kiểm tra 10 câu Drills)**
* **Các Sub-tabs / Sub-modes trong Learn Mode (Tên hiển thị thực tế trên UI)**:
  1. `3D Webtoon Story` (Xem 6 cảnh truyện tranh 3D tương tác Hotspot).
  2. `Interactive Story` (Đoạn văn điền từ Cloze Gap-fill chuẩn Cambridge Reading Part 4).
  3. `Reading Part 3` (Bài tập hoàn thành câu trắc nghiệm A/B/C chuẩn Cambridge Flyers Part 3).
* **Adventure Map Overview (Bản đồ chọn tuần phiêu lưu)**: **KHÔNG TÌM THẤY**. Trẻ chọn tuần bằng danh sách cột bên trái (Sidebar Week Journey 1 -> 37).
* **Chuyển giữa Learn Mode & Check Mode**: Trẻ bấm chuyển tab trực tiếp bằng 2 nút bấm ở đầu màn hình bài học (`Learn Mode` / `Check Mode`).

#### b) Từng tính năng tương tác cụ thể

##### 1. Sub-tab 1: `3D Webtoon Story`
* **Cơ chế chơi**: Trẻ xem 6 khung cảnh kịch bản 3D (Scene 1 đến Scene 6). Trên mỗi ảnh có các điểm nút tương tác (Hotspots). Trẻ bấm vào điểm nút trên ảnh để khám phá các cụm từ vựng liên quan.
* **Phản hồi khi đúng / tương tác**: Khung từ vựng bung ra nổi bật, phát âm thanh giọng đọc tiếng Anh chuẩn qua loa `Volume2`.
* **HoverWord Tra Từ**: Khi trẻ bấm vào từ bôi đậm (`border-b-[2px] border-blue-200`), thẻ bong bóng pop-up mở ra hiển thị: Từ vựng, phiên âm IPA, nghĩa Tiếng Việt, câu ví dụ và loa phát âm.
* **Thanh tiến độ**: Hiển thị dạng thẻ số cảnh `Scene 1 / 6`, `Scene 2 / 6`...

##### 2. Sub-tab 2: `Interactive Story` (Cloze Gap-fill)
* **Cơ chế chơi**: Trẻ đọc đoạn văn có 5 khoảng trống `[____]`. Bấm vào khoảng trống, một menu thả xuống hiện ra 3 lựa chọn. Trẻ bấm chọn cụm từ thích hợp.
* **Phản hồi khi đúng**: Khối từ đổi sang màu xanh lá rực rỡ (`bg-emerald-50 text-emerald-800 border-emerald-300`) kèm biểu tượng `CheckCircle2`.
* **Phản hồi khi sai**: Khối từ đổi sang màu hồng đỏ (`bg-rose-50 text-rose-800 border-rose-300`), hiện gợi ý Tiếng Việt phía dưới ô nhập:
  ```
  Gợi ý: "tỉnh dậy vội vã"
  ```
* **Thanh tiến độ**: Hiển thị `"Progress: 3/5 gaps completed"`.

##### 3. Sub-tab 3: `Reading Part 3` (Cambridge Sentence Completion)
* **Cơ chế chơi**: Trẻ đọc 5 câu hỏi hoàn thành câu trắc nghiệm A, B, C và chọn đáp án đúng.
* **Phản hồi khi đúng**: Nút đáp án đổi sang xanh lá rực rỡ, cộng điểm phần trăm.
* **Phản hồi khi sai**: Nút đáp án đổi sang đỏ nhạt, báo sai.
* **Phần thưởng cuối bài**: Thẻ kết quả hiển thị `Reading Score: 100%`, huy hiệu hoàn thành và điểm số lưu vào hệ thống.

#### c) Gamification & Động lực
* **Hệ thống Điểm / Streak**: Điểm số Trạm 1 hiển thị dạng phần trăm (ví dụ `100%`). Không có chuỗi Streak đếm liên tục ở Trạm 1.
* **Leaderboard (Bảng xếp hạng)**: **KHÔNG TÌM THẤY** trên giao diện học sinh.
* **Linh vật (Nova)**: Xuất hiện ở góc widget gia sư AI Nova để hỗ trợ khi trẻ cần trợ giúp.

#### d) Trạng thái đặc biệt
* **Khi hết nội dung bài**: Xuất hiện màn hình chúc mừng `"Station Completed!"` kèm nút chuyển sang Trạm 2.
* **Khi mất kết nối mạng**: Giao diện không bị ngắt; ứng dụng lưu tiến độ trực tiếp vào bộ nhớ IndexedDB của thiết bị.

---

### TRẠM 2: ARENA HUB & NOVA TALK SHOW (LISTENING & ARENA)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ vào Trạm 2 nhìn thấy màn hình Đấu trường Flash Arena hoặc Nova Talk Show. Phía trên có thanh chọn Sub-tabs:
  1. `Phase 1: 5 Single Sentences` (Luyện nghe & shadowing 5 câu đơn).
  2. `Phase 2: Continuous Story` (Luyện nghe & shadowing đoạn văn liên tục).
  3. `Flash Arena` (Game ghép từ vựng tốc độ).
* **Các Chế độ chơi Flash Arena (Sub-modes trên UI)**:
  - `Casual Mode (Untimed)` (Luyện tập không tính thời gian).
  - `Speed Battle (30s)` (Đua tốc độ ghép từ 30 giây).
* **Các Bộ Thẻ Bài (Card Sets trên UI)**:
  - `Set 1: Nouns & Adjectives`
  - `Set 2: Action Verbs`
  - `Set 3: Chunks & Collocations` (10 Chunks chuẩn)
  - `Set 4: Definitions`

#### b) Từng tính năng tương tác cụ thể

##### 1. Minigame `FlashArena` (Speed Battle 30s)
* **Cơ chế chơi**: Màn hình hiện 2 cột (Cột Tiếng Anh bên trái, Tiếng Việt bên phải). Trẻ bấm 1 thẻ Anh và 1 thẻ Việt tương ứng.
* **Phản hồi khi đúng**: 2 thẻ phát sáng viền xanh neon, biến mất khỏi màn hình, cộng `+20 pts` và tăng `🔥 Streak: 1` -> `2` -> `3`.
* **Phản hồi khi sai**: 2 thẻ rung nhấp nháy đỏ, tự hủy chọn, chuỗi `Streak` reset về 0.
* **Thanh tiến độ**: Hiển thị `MATCHED 4/10 Pairs` và đồng hồ đếm ngược `30s` chạy lùi.
* **Phần thưởng cuối game**: Màn hình tổng kết hiển thị `YOUR SCORE: 200 pts`, số cặp ghép đúng và nút `Play Again`.

##### 2. Sub-tab `Phase 1 & Phase 2` (Listening & Shadowing)
* **Cơ chế chơi**: Trẻ bấm loa `Play` để nghe giọng đọc chuẩn của nhân vật Tom/Nova. Bấm micro để đọc nhại lại theo (shadowing).
* **Phản hồi phát âm**: Màn hình hiển thị điểm số phát âm `Pronunciation Score: 85%` kèm 1-3 Sao `Star`.

#### c) Gamification & Động lực
* **Streak Counter**: Hiển thị trực tiếp ở góc màn hình `🔥 Streak: 5` trong game Flash Arena.
* **Leaderboard**: **KHÔNG TÌM THẤY** bảng xếp hạng toàn cầu trên UI.

---

### TRẠM 3: WRITING STUDIO HUB (WRITING)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ thấy 3 bức tranh kịch bản 3D Pixar xếp hàng ngang đại diện cho 3 cảnh truyện. Phía dưới là ô nhập văn bản lớn và ngân hàng từ vựng viên thuốc Word Bank Pills.

#### b) Từng tính năng tương tác cụ thể

##### 1. Hoạt động Viết Kịch Bản 3 Bức Tranh (Cambridge Writing Part 7)
* **Cơ chế chơi**: Trẻ xem 3 tranh và gõ kịch bản (mục tiêu 35-50 từ). Trẻ bấm vào các viên thuốc từ vựng (Word Bank Pills) để chèn cụm từ vào bài viết.
* **Các Nhóm Từ Vựng Viên Thuốc (Sub-categories trên UI)**:
  - `Action Verbs` (Động từ hành động: broke, fell, slipped, spilled, apologized...)
  - `Connectors` (Từ nối: first, suddenly, finally, while, because, although...)
  - `Cumulative Chunks` (10 cụm từ vàng: woke up in a hurry, slipped on a wet puddle...)
  - `Grammar Boosters` (Cấu trúc bổ trợ: was playing, were climbing...)
* **Phản hồi Real-time khi trẻ gõ**:
  - `Word Count`: Đếm số từ thực tế (`42 / 35-50 words`).
  - `Past Verbs`: Đếm số động từ quá khứ phát hiện (`3 detected`).
  - `Connectors`: Đếm số từ nối phát hiện (`2 detected`).
* **Phản hồi khi bấm "Submit & Analyze Script"**:
  - Nếu đạt tiêu chuẩn: Ô xanh hiện `✅ Layer 1 Rule Check: Pass (Target 35-50 words met)`.
  - Nếu chưa đủ từ: Ô vàng hiện `⚠️ Below Target Word Count`.
* **Nút "Writing Scaffolding Hints"**: Bấm vào mở ô cửa sổ gợi ý chứa dàn ý câu chuyện và cấu trúc câu mẫu song ngữ EN-VI.

---

### TRẠM 4: ASK AI / NOVA TALK SHOW (SPEAKING & AI TUTOR)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ gặp linh vật Nova 3D. Màn hình chia thành các phần bài tập:
  1. `Spark Talk` (Thẻ bài gợi ý chủ đề nói nhanh).
  2. `Story Missions` (3 Sứ mệnh bài tập kể lại câu chuyện tuần).
  3. `Ask AI Voice Chat` (Cửa sổ hội thoại giọng nói trực tiếp với AI Nova).

#### b) Từng tính năng tương tác cụ thể

##### 1. Thẻ bài `Spark Talk`
* **Cơ chế chơi**: Trẻ xem 2 thẻ bài chủ đề (ví dụ `Clumsy Morning` & `Apologizing`). Bấm nút Micro để ghi âm câu trả lời.
* **Phản hồi**: Hiển thị điểm phát âm % và gợi ý câu trả lời Tiếng Việt:
  ```
  Gợi ý trả lời: "In the morning, Tom woke up in a hurry and broke his clock..."
  ```

##### 2. Thẻ bài `Story Missions` (3 Sứ mệnh Nova)
* **Sub-missions trên UI**:
  - `Mission 1: Retell STEM Story` (Kể lại bài đọc Khoa học/Toán).
  - `Mission 2: Retell Social Story` (Kể lại bài đọc Lịch sử/Xã hội).
  - `Mission 3: Personal Connection` (Liên hệ trải nghiệm bản thân).
* **Phản hồi khi hoàn thành**: Nova phát tiếng chúc mừng, mở khóa huy hiệu hoàn thành sứ mệnh và ghi nhận tiến độ vào tài khoản.

---

### PARENT DASHBOARD (GIAO DIỆN DÀNH CHO PHỤ HUYNH)

* **Xác nhận tồn tại**: **ĐÃ CÓ GIAO DIỆN THỰC TẾ** tại tuyến đường `/dashboard`.
* **Những gì phụ huynh nhìn thấy trên màn hình**:
  1. **Báo Cáo Tuần Của Con (Weekly Learning Report)**:
     - Tổng số lượt học (`Total Learn Attempts`).
     - Tổng số bài làm kiểm tra (`Total Check Attempts`).
     - Tổng thời gian con đã ngồi học trên app (tính bằng phút/giờ).
  2. **Thanh Hướng Dẫn Trạm Học Cho Phụ Huynh (Station Hints & Tips)**:
     - Danh sách 14 trạm học kèm giải thích ý nghĩa giáo dục.
     - Lời khuyên cụ thể cho cha mẹ đồng hành (ví dụ: *"Hỏi con bài đọc hôm nay về chủ đề gì để con tập tóm tắt bằng tiếng Việt"*).
  3. **Hướng Dẫn Gia Sư AI Nova (AI Tutor Overview)**: Giải thích các tính năng Story Mission, Free Talk của Nova để cha mẹ đôn đốc con.
  4. **Công Cụ Tạo Bài Kiểm Tra Tại Nhà (Parent Quiz Generator)**: Nút bấm cho phép cha mẹ tự tạo bộ câu hỏi kiểm tra từ vựng của con ở nhà.

---

## 2. ĐỐI CHIẾU VỚI TECHNICAL BRIEF GỐC

### Bảng 1: Trạng thái các tính năng theo Technical Brief gốc

| Tính năng (theo Brief gốc) | Trạng thái | Ghi chú trải nghiệm thực tế trên UI |
|---|---|---|
| **3D Webtoon Story** | **Khác thiết kế** | Hiện là **Ảnh tĩnh 3D Pixar + Audio TTS**, chưa phải engine hoạt hình 3D cuộn chuyển động (animated webtoon engine). |
| **Word Bank Pills Dynamic** | **Có** | Trạm 3 có các viên thuốc từ vựng (Pills) chia 4 nhóm màu bấm chèn từ trực tiếp vào kịch bản. |
| **Movie Quality Score** | **Khác thiết kế** | Trạm 3 hiển thị nhãn **`Layer 1 Rule Check`** (Đếm từ, quá khứ đơn, từ nối) & `Practice Score`, chưa có điểm số phim ảnh đã calibration. |
| **Pronunciation Radar Chart** | **KHÔNG TÌM THẤY** | Không có biểu đồ đa trục Radar Chart trên UI; hiện hiển thị con số phần trăm `Pronunciation Score: 85%`. |
| **Sandbox Mode (Reset tiến độ)** | **Có** | Có hàm reset tiến độ thử nghiệm trong `learnerProgressService.js`. |
| **Adventure Map Overview (Bản đồ chọn tuần 3D)** | **KHÔNG TÌM THẤY** | Không có bản đồ phiêu lưu 3D; trẻ chọn tuần qua danh sách Sidebar bên trái. |
| **Nova Talk Show Adaptive State Machine** | **KHÔNG TÌM THẤY** | Hiện chạy theo **kịch bản cố định 5 lượt thoại** (`talkshowTurns`), chưa có nhánh rẽ tự động 20 lượt thoại khi học sinh im lặng. |
| **Global Leaderboard (Bảng xếp hạng)** | **KHÔNG TÌM THẤY** | Không có bảng xếp hạng thi đua toàn cầu trên giao diện học sinh. |
| **Global Streak System** | **Khác thiết kế** | Streak counter hiện chỉ có trong minigame Flash Arena (Trạm 2), không hiển thị toàn app. |
| **Parent Dashboard (Giao diện Phụ huynh)** | **Có** | Đã có giao diện thực tế tại `/dashboard` hiển thị KPI học tập, mẹo đồng hành và công cụ tạo Quiz. |

---

### Bảng 2: Tính năng đang tồn tại trên UI nhưng KHÔNG CÓ trong Brief gốc (Tính năng phát sinh)

| Tính năng phát sinh | Mô tả trải nghiệm thực tế trên UI |
|---|---|
| **HoverWord Song Ngữ (Tra Từ Tức Thì)** | Bấm vào từ bôi đậm trong bài đọc/nghe, popup hiện ra hiển thị phiên âm IPA, nghĩa Tiếng Việt, câu ví dụ và phát âm tức thì giọng Google Cloud TTS. |
| **Circuit Breaker & Offline Recovery Banner** | Khi mất mạng, hệ thống chuyển sang chế độ Offline mượt mà từ bộ nhớ IndexedDB mà không bắn cửa sổ lỗi làm gián đoạn trẻ. |
| **Gold Standard 6 Gatekeepers Validator** | Bộ kiểm định tự động bảo đảm bài học không bị lỗi chính tả, dấu cách trước dấu chấm, hay rò rỉ tên thật của trẻ. |
