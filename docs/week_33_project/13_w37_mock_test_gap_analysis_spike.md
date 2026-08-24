# 🔬 SPIKE FINDINGS: W37 CAMBRIDGE MOCK TEST GAP ANALYSIS
> **Mục tiêu:** Kiểm tra thực tế mã nguồn 6 Gaps kỹ thuật trong hệ thống thi thử Cambridge A2 Flyers tại `BossBattleZone.jsx` và toàn bộ codebase.

---

## 📊 TỔNG HỢP KẾT QUẢ SPIKE (DECISION MATRIX)

| Gap # | Tên Hạng Mục | Trạng Thái Trong Code | Đánh Giá Mức Độ | Thời Gian Hoàn Thiện |
|---|---|:---:|---|:---:|
| **Gap 1** | **Global Exam Countdown Timer** | ❌ Chưa có timer tổng | Cần thêm timer đếm ngược cấp Zone khi `isFullMock = true` | ~1.5 giờ |
| **Gap 2** | **Exam Proctoring Mode (Anti-cheat)** | ⚠️ Đã có 50% | Tiến trình 1 chiều (No back button). Cần thêm cờ ẩn phao cứu sinh | ~1.5 giờ |
| **Gap 3** | **Shield Aggregation Logic (15 Shields)** | ⚠️ Đã có mảng shields | Cần hàm quy đổi điểm thô $\rightarrow$ Khiên theo từng Paper (5/5/5) | ~1.5 giờ |
| **Gap 4** | **Statement of Results & Radar Chart UI** | ⚠️ Đã có Victory Card | Cần thiết kế bảng điểm Cambridge chính thức + SVG Radar Chart | ~3.0 giờ |
| **Gap 5** | **Continuous Audio vs Per-Part Audio** | ✅ Đã tối ưu (Per-part) | Từng Part tự phát audio 2 lần theo chuẩn YLE (Tốt hơn 1 file 25 min) | **0 giờ (Đã chuẩn)** |
| **Gap 6** | **Speaking Exam Complete Flow (Parts 1-4)** | ⚠️ Đã có P1 & P2 | Cần mount thêm P3 (5-Picture Story) và P4 (Personal Qs) vào `isFullMock` | ~2.5 giờ |

**👉 TỔNG THỜI GIAN ĐỂ HOÀN THIỆN 100% W37 MOCK TEST ENGINE:** **~10 giờ phát triển tập trung** (khoảng 1 - 1.5 ngày làm việc).

---

## 🔍 CHI TIẾT TỪNG GAP DỰA TRÊN CODE THỰC TẾ

### 1. Gap #1: Global Exam Timer vs Per-Quest Timers
- **Thực tế mã nguồn (`BossBattleZone.jsx`):**
  - Hiện tại mỗi component con (`SVGLineMatcher`, `NotepadNoteCompleter`) tự quản lý nhịp độ làm bài.
  - `BossBattleZone` chưa có `setInterval` đếm ngược tổng thời gian (ví dụ 45 phút cho Full Mock hoặc 25 phút cho Listening).
- **Giải pháp kiến trúc:**
  - Bổ sung `ExamTimer` gắn trên thanh Header của `BossBattleZone` khi `isFullMock = true`. Khi hết giờ, tự động gọi `setExamFinished(true)`.

---

### 2. Gap #2: Exam Proctoring Mode (Anti-Cheat)
- **Thực tế mã nguồn:**
  - Logic chuyển bài tại lines 120-127 là **tiến trình một chiều nghiêm ngặt** (`setActiveTaskIndex(prev => prev + 1)`), không có nút Back quay lại sửa đáp án cũ.
  - Tuy nhiên, cần truyền prop `isExamMode={isFullMock}` vào các component con để ẩn nút bóng gợi ý (Hints) và tắt từ điển tra từ.

---

### 3. Gap #3: Shield Aggregation Logic
- **Thực tế mã nguồn:**
  - `earnedShields` hiện lưu danh sách các Part hoàn thành (`['list_p1', 'list_p2', ...]`).
  - Cambridge A2 Flyers yêu cầu cấu trúc 3 Paper:
    - **Listening Paper** (Parts 1–5): Tối đa 5 Khiên
    - **Reading & Writing Paper** (Parts 1–7): Tối đa 5 Khiên
    - **Speaking Paper** (Parts 1–4): Tối đa 5 Khiên
    - **Tổng cộng**: Tối đa 15 Khiên.
- **Giải pháp kiến trúc:** Viết helper `calculateCambridgeShields(rawResults)` ánh xạ tỷ lệ % điểm đúng $\ge 80\% \rightarrow 5$ Khiên, $\ge 60\% \rightarrow 4$ Khiên, v.v.

---

### 4. Gap #4: Statement of Results UI & Radar Chart
- **Thực tế mã nguồn:**
  - Lines 143-185 hiện tại render một thẻ chiến thắng cơ bản (`🏆 BOSS BATTLE VICTORY!`) hiển thị các icon Khiên đạt được.
  - Cần nâng cấp giao diện màn hình kết thúc này thành **Bảng Chứng Nhận Cambridge A2 Flyers Chính Thức**:
    - Hiển thị 3 thanh tiến độ Khiên (Listening / R&W / Speaking)
    - Tích hợp biểu đồ mạng nhện SVG Radar Chart trực quan
    - Nút bấm In / Tải chứng chỉ (Print / Save Certificate)

---

### 5. Gap #5: Audio Format (Per-Part vs Continuous)
- **Đánh giá chuyên sâu về EdTech UX:**
  - Trong ứng dụng web tương tác thiếu nhi, việc chia thành **các file audio độc lập per-part** (`listening_p1_full.mp3`, `listening_p2_full.mp3`, `listening_p3_full.mp3`...) vượt trội hơn hẳn so với 1 file 25 phút nguyên khối:
    - Tải nhanh hơn, không tốn băng thông ban đầu.
    - Cho phép component tự động lặp lại 2 lần (*Listen twice*) đúng chuẩn Cambridge mà không bị lệch timecode.
  - **Kết luận:** Giữ nguyên mô hình Per-Part Audio hiện tại!

---

### 6. Gap #6: Speaking Test Flow trong Mock Exam
- **Thực tế mã nguồn:**
  - `currentTasks` trong `BossBattleZone.jsx` lines 68-69 hiện mới khai báo `spk_p1` (Find Diff) và `spk_p2` (Info Exchange).
  - Cần bổ sung thêm:
    - `spk_p3`: Kể chuyện liên hoàn 5 bức tranh (`PictureStoryExaminer.jsx`)
    - `spk_p4`: Phỏng vấn 4 câu hỏi cá nhân với AI Nova (`MascotPersonalInterview.jsx`)

---

## 🚀 KẾT LUẬN & ĐỀ XUẤT HÀNH ĐỘNG

Nhận định ban đầu **"Kiến trúc W37 đã sẵn sàng ~90%"** là hoàn toàn chính xác. 10% còn lại là các tinh chỉnh nâng cao giao diện phòng thi và công thức tính điểm (khoảng 10 giờ làm việc).

### Lộ trình thực hiện khuyến nghị:
1. **Bước 1 (Hôm nay)**: Hoàn tất trọn bộ dữ liệu và Media cho **W34, W35, W36** (3 Instructional Weeks).
2. **Bước 2 (Tiếp theo)**: Tiến hành vá 5 Gaps kỹ thuật trên vào `BossBattleZone.jsx` và biên soạn dữ liệu đề thi W37.
3. **Bước 3 (Đóng gói Chặng)**: Chạy full test mô phỏng kỳ thi W37 và chính thức bàn giao trọn vẹn **Milestone Cycle 7 (W33 – W37)**!
