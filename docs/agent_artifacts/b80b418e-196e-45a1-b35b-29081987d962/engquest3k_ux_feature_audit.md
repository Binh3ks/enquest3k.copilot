# BÁO CÁO KIỂM TOÁN TÍNH NĂNG & TRẢI NGHIỆM NGUỜI DÙNG (ENGQUEST3K UX AUDIT)

---

## 1. TRẢI NGHIỆM THỰC TẾ CỦA TRẺ (8-11 TUỔI) THEO TỪNG TRẠM

---

### TRẠM 1: WORLD DISCOVERY HUB (READING & NARRATIVE)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ nhìn thấy một khung bìa tiêu đề lớn rực rỡ với tiêu đề bài đọc `"Tom's Clumsy Saturday Morning"` và một bức ảnh 3D Pixar vẽ chú bé Tom vội vã. Phía dưới là thanh menu phụ với 2 chế độ bài học:
  1. **Interactive Story** (Điền từ vào đoạn văn cốt truyện).
  2. **Reading Part 3** (Hoàn thành câu trắc nghiệm A/B/C chuẩn Cambridge Flyers).
* **Adventure Map Overview (Bản đồ chọn tuần phiêu lưu)**: **KHÔNG TÌM THẤY**. Trẻ chọn tuần bằng danh sách cột bên trái (Sidebar Week Journey 1 -> 37), không có bản đồ phiêu lưu đồ họa 3D.
* **Chuyển giữa Learn Mode & Check Mode**: Trẻ chuyển đổi qua 2 tab bấm nút trực tiếp ngay trên thanh điều hướng góc trên bài học.

#### b) Các tính năng tương tác cụ thể
* **Điền từ vào đoạn văn (Open Cloze)**:
  - **Cơ chế chơi**: Trẻ đọc đoạn văn có 5 khoảng trống `[____]`. Khi bấm vào khoảng trống, một ô gợi ý hiện ra 3 lựa chọn từ. Trẻ bấm chọn cụm từ đúng (ví dụ `woke up in a hurry`).
  - **Phản hồi khi đúng**: Khối từ đổi sang màu xanh lá rực rỡ kèm viền lục bảo (`bg-emerald-50 text-emerald-800 border-emerald-300`), xuất hiện biểu tượng tích xanh `CheckCircle2`.
  - **Phản hồi khi sai**: Khối từ đổi sang màu hồng đỏ nhạt (`bg-rose-50 text-rose-800 border-rose-300`), hiện gợi ý Tiếng Việt in nghiêng dưới ô nhập (ví dụ: *Gợi ý: "tỉnh dậy vội vã"*).
  - **HoverWord Tra Từ**: Trẻ bấm vào bất kỳ cụm từ bôi đậm nào (`border-b-[2px] border-blue-200`), một thẻ bong bóng (popup) bật ra hiển thị: Từ vựng, phiên âm IPA, nghĩa Tiếng Việt, câu ví dụ và biểu tượng loa phát âm âm thanh giọng đọc Mỹ.
  - **Thanh tiến độ**: Hiển thị dạng chữ & biểu tượng `"Progress: 3/5 gaps completed"`.
  - **Phần thưởng cuối bài**: Thẻ thông báo hoàn thành bài hiện ra với điểm số phần trăm (ví dụ: `100% Correct`), biểu tượng sao `Star` và huy hiệu hoàn thành.

#### c) Gamification & Động lực
* **Hệ thống Điểm / Khiên / Streak**: Điểm số bài đọc hiển thị ở góc trên màn hình dưới dạng phần trăm (ví dụ `100%`). Không có Streak đếm liên tục trong Trạm 1.
* **Bảng xếp hạng (Leaderboard)**: **KHÔNG TÌM THẤY** trên giao diện học sinh.
* **Linh vật (Nova / Lexio)**: Xuất hiện biểu tượng linh vật Nova ở góc widget gia sư AI hỗ trợ.

#### d) Trạng thái đặc biệt
* **Khi hết bài**: Xuất hiện màn hình chúc mừng `"Station Completed!"` kèm nút bấm chuyển sang Trạm 2.
* **Khi mất kết nối mạng**: Giao diện không bị treo; dữ liệu tiến độ tự động lưu vào bộ nhớ trình duyệt (IndexedDB).
* **Khi micro hỏng / không hỗ trợ**: Trạm 1 dùng thao tác click/gõ nên không ảnh hưởng bởi micro.

---

### TRẠM 2: ARENA HUB & NOVA TALK SHOW (LISTENING & ARENA)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ nhìn thấy giao diện đấu trường Flash Arena hoặc Nova Talk Show với các nút chọn bộ thẻ bài:
  - **Set 1: Nouns & Adjectives**
  - **Set 2: Action Verbs**
  - **Set 3: Chunks & Collocations** (10 cụm từ chuẩn)
  - **Set 4: Definitions**
* **Chế độ chơi**: Trẻ bấm chuyển giữa **Casual Mode (Untimed)** (Luyện tập tự do) và **Speed Battle (30s)** (Đua tốc độ 30 giây).

#### b) Các tính năng tương tác cụ thể
* **Trò chơi ghép thẻ Flash Arena (Speed Battle)**:
  - **Cơ chế chơi**: Màn hình hiện 2 cột thẻ (Cột Tiếng Anh bên trái, Cột Tiếng Việt bên phải). Trẻ bấm 1 thẻ Anh và 1 thẻ Việt tương ứng để ghép đôi.
  - **Phản hồi khi đúng**: 2 thẻ phát sáng viền xanh neon, biến mất khỏi màn hình, cộng +20 điểm và tăng chuỗi Streak lên 1.
  - **Phản hồi khi sai**: 2 thẻ rung nhẹ nhấp nháy đỏ, tự hủy chọn, chuỗi Streak reset về 0.
  - **Thanh tiến độ**: Hiển thị `"MATCHED: 4/10 Pairs"` và đồng hồ đếm ngược `30s` giảm dần.
  - **Phần thưởng cuối bài**: Thẻ kết quả hiển thị tổng điểm `YOUR SCORE: 200 pts`, số cặp ghép đúng và thứ hạng đạt được.

#### c) Gamification & Động lực
* **Streak Counter**: Hiển thị nổi bật ở góc trên `🔥 Streak: 5` tăng dần mỗi khi trẻ trả lời đúng liên tiếp.
* **Leaderboard**: **KHÔNG TÌM THẤY** bảng xếp hạng toàn cầu trên UI.
* **Linh vật**: Biểu tượng Nova hiện ra khi bắt đầu lượt nghe.

#### d) Trạng thái đặc biệt
* **Khi hết giờ (0s trong Speed Battle)**: Trò chơi dừng ngay lập tức, hiển thị bảng kết quả và nút `"Play Again"`.

---

### TRẠM 3: WRITING STUDIO HUB (WRITING)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ nhìn thấy 3 bức tranh minh họa kịch bản 3D Pixar xếp ngang (Panel 1: Chạy trong phòng khách, Panel 2: Va vỡ bình hoa, Panel 3: Xin lỗi mẹ & dọn dẹp). Bên dưới là khung nhập văn bản kịch bản lớn và ngân hàng từ vựng Word Bank Pills.

#### b) Các tính năng tương tác cụ thể
* **Nhập kịch bản & Chèn từ nhanh (Word Bank Pills)**:
  - **Cơ chế chơi**: Trẻ gõ đoạn văn kịch bản (target 35-50 từ). Trẻ có thể bấm trực tiếp vào các viên thuốc từ vựng (Word Bank Pills như `woke up in a hurry`, `slipped on a wet puddle`) để tự động chèn cụm từ đó vào văn bản.
  - **Phản hồi Real-time**: Phía dưới hiện 3 ô đếm chỉ số thực tế:
    - `Word Count`: Đếm số từ thực tế (ví dụ `42 / 35-50 words`).
    - `Past Verbs`: Đếm số động từ quá khứ phát hiện được (ví dụ `3 detected`).
    - `Connectors`: Đếm số từ nối phát hiện được (ví dụ `2 detected`).
  - **Phản hồi sau khi nộp bài (Submit & Analyze)**:
    - Nếu đạt tiêu chuẩn: Hiện ô màu xanh `✅ Layer 1 Rule Check: Pass (Target 35-50 words met)`.
    - Nếu chưa đủ từ: Hiện ô màu vàng `⚠️ Below Target Word Count`.
  - **Phần thưởng / Điểm số**: Hiển thị nhãn **`Practice Score`** / **`Layer 1 Rule Check`** (Không hiển thị bằng cấp chính thức).

#### c) Gamification & Động lực
* **Giao diện viên thuốc (Pills UI)**: Các cụm từ thiết kế dạng nút bấm viên thuốc đầy màu sắc (tím, xanh, cam) giúp trẻ thích thú tương tác.

---

### TRẠM 4: ASK AI / NOVA TALK SHOW (SPEAKING & AI TUTOR)

#### a) Điều hướng & Cấu trúc màn hình
* **Cảnh tượng đầu tiên**: Trẻ thấy linh vật Nova 3D thân thiện chào đón cùng 2 thẻ bài luyện nói **Spark Talk** và 3 sứ mệnh bài tập **Story Missions**. Trẻ có thể bấm nút Micro lớn để nói chuyện bằng giọng nói.

#### b) Các tính năng tương tác cụ thể
* **Hội thoại giọng nói 2 chiều với Nova**:
  - **Cơ chế chơi**: Trẻ bấm giữ/bấm mở Micro lớn, nói câu tiếng Anh vào thiết bị. Giọng nói của trẻ được chuyển thành văn bản chữ hiển thị trong ô chat. Nova phản hồi lại bằng lời nói qua giọng đọc phát âm chuẩn Google Cloud TTS.
  - **Phản hồi khi nói tốt**: Nova khen ngợi và hiển thị ô điểm phát âm: `Pronunciation Score: 85%` kèm số sao đạt được (1-3 Sao `Star`).
  - **Phản hồi khi không nói/nói chưa rõ**: Nova kiên nhẫn hiển thị thẻ gợi ý câu trả lời `Gợi ý trả lời: "In the morning, Tom woke up in a hurry..."`.

#### c) Parent Dashboard (Giao diện Phụ huynh)
* **Xác nhận tồn tại**: **ĐÃ CÓ GIAO DIỆN THỰC TẾ** tại đường dẫn `/dashboard`.
* **Phụ huynh nhìn thấy gì trên màn hình**:
  1. **Báo cáo tuần của con (Weekly Report)**: Tổng số lượt học, tổng số bài kiểm tra, tổng thời gian con đã học (tính bằng phút/giờ).
  2. **Thanh Hướng Dẫn Trạm Học (Station Hints for Parents)**: Danh sách 14 trạm học kèm giải thích ý nghĩa sư phạm và lời khuyên giúp phụ huynh đồng hành cùng con (ví dụ: *"Hỏi con: Bài đọc hôm nay về chủ đề gì? để con tập tóm tắt bằng tiếng Việt"*).
  3. **Hướng dẫn Gia sư AI (AI Tutor Hints)**: Giải thích các tính năng của Nova AI Tutor (Story Mission, Free Talk).
  4. **Bộ Tạo Bài Kiểm Tra Cho Phụ Huynh (Parent Quiz Generator)**: Công cụ cho phép cha mẹ tự tạo câu hỏi kiểm tra nhanh từ vựng của con ở nhà.

---

## 2. ĐỐI CHIẾU VỚI TECHNICAL BRIEF GỐC

### Bảng 1: Trạng thái các tính năng theo Technical Brief gốc

| Tính năng (theo Brief gốc) | Trạng thái | Ghi chú trải nghiệm thực tế trên UI |
|---|---|---|
| **3D Webtoon Story** | **Khác thiết kế** | Hiện là **Ảnh tĩnh 3D Pixar + Audio TTS**, chưa phải engine hoạt hình 3D cuộn chuyển động (animated webtoon engine). |
| **Word Bank Pills Dynamic** | **Có** | Trạm 3 có các viên thuốc từ vựng (Pills) chia 4 nhóm màu (Action Verbs, Connectors, Chunks, Boosters) bấm chèn từ trực tiếp. |
| **Movie Quality Score** | **Khác thiết kế** | Trạm 3 hiện hiển thị nhãn **`Layer 1 Rule Check`** (Đếm từ, động từ quá khứ, từ nối) và `Practice Score`, chưa có điểm số phim ảnh đã calibration. |
| **Pronunciation Radar** | **KHÔNG TÌM THẤY** | Không có biểu đồ đa trục Radar Chart trên UI; hiện hiển thị dạng con số phần trăm `Pronunciation Score: 85%`. |
| **Sandbox Mode (Reset tiến độ)** | **Có** | Có hàm hỗ trợ reset dữ liệu thử nghiệm trong `learnerProgressService.js`. |
| **Adventure Map Overview (Bản đồ chọn tuần 3D)** | **KHÔNG TÌM THẤY** | Không có bản đồ chọn tuần đồ họa dạng phiêu lưu; học sinh chọn tuần qua danh sách Sidebar bên trái. |
| **Nova Talk Show Adaptive State Machine** | **KHÔNG TÌM THẤY** | Hiện chạy theo **kịch bản cố định 5 lượt thoại** (`talkshowTurns`), chưa có nhánh rẽ tự động 20 lượt thoại khi học sinh im lặng. |
| **Global Leaderboard (Bảng xếp hạng)** | **KHÔNG TÌM THẤY** | Không tìm thấy bảng xếp hạng thi đua tuần giữa các học sinh trên giao diện UI. |
| **Global Streak System** | **Khác thiết kế** | Streak counter hiện chỉ hoạt động trong minigame Flash Arena (Trạm 2), không hiển thị xuyên suốt toàn bộ app. |
| **Parent Dashboard (Giao diện Phụ huynh)** | **Có** | Đã có màn hình thực tế tại `/dashboard` hiển thị KPI học tập, gợi ý mẹo đồng hành và công cụ tạo Quiz. |

---

### Bảng 2: Tính năng đang tồn tại trên UI nhưng KHÔNG CÓ trong Brief gốc (Tính năng phát sinh)

| Tính năng phát sinh | Mô tả trải nghiệm người dùng thực tế |
|---|---|
| **HoverWord Song Ngữ (Tra Từ Tức Thì)** | Khi trẻ bấm vào bất kỳ cụm từ bôi đậm nào trong bài đọc/bài nghe, một popup hiện ra ngay tại vị trí từ hiển thị phiên âm IPA, nghĩa Tiếng Việt, ví dụ và nút loa phát âm âm thanh tức thì. |
| **Circuit Breaker & Offline Recovery Banner** | Khi ứng dụng mất mạng hoặc không kết nối được server, hệ thống tự động chuyển sang chế độ Offline mượt mà từ bộ nhớ IndexedDB mà không bắn cửa sổ lỗi gián đoạn việc học của trẻ. |
| **Gold Standard 6 Gatekeepers Validator** | Công cụ tự động quét bảo đảm bài học không bị lỗi chính tả (dấu cách trước dấu chấm), lỗi mã LaTeX thô, hay rò rỉ tên thật của trẻ. |
