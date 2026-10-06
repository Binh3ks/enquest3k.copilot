# BÁO CÁO AUDIT & ĐÍNH KÈM MINH CHỨNG THỰC TẾ: VIỆC H & VIỆC I (2026-09-11)

---

## 📌 PHẦN 1: XÁC NHẬN KIẾN TRÚC HÌNH HỌC F4D3 (VIỆC I)

### Xác nhận dứt khoát: F4D3 CHỈ CÓ ĐÚNG 1 TEMPLATE HÌNH HỌC DUY NHẤT
- **Không có các bộ bục/cửa luân phiên**:
  Trong source code `RiddleRunMaze.jsx`, `MAZE_PLATFORMS` là một mảng hằng số tĩnh (`const MAZE_PLATFORMS = [...]`, dòng 35–43).
  Toạ độ 3 cánh cửa cũng được tính toán tại vị trí cố định trên 3 bục này (`door_0: x=100, y=300`, `door_1: x=390, y=115`, `door_2: x=680, y=300`, dòng 99–106).
- **Riddle 1/3, Riddle 2/3, Riddle 3/3 dùng chung 100% không gian hình học**:
  Khi người chơi hoàn thành câu đố 1 và chuyển sang câu đố 2, 3 (`riddleIdx` tăng từ 0 lên 1, 2):
  - Hệ thống **không** sinh map mới, **không** đổi toạ độ bệ hay toạ độ cửa.
  - Toàn bộ bệ đá, vị trí cửa, vị trí quái Minotaur và vị trí spawn của Leo vẫn nằm nguyên tại các toạ độ gốc.
  - Thứ duy nhất thay đổi giữa các vòng đố là **nội dung câu hỏi (prompt)** và **3 từ vựng đáp án (`opts`)** được gán ngẫu nhiên vào 3 cánh cửa.
- **Tính bất biến hình học (Geometric Invariant)**:
  Vì template hình học là duy nhất và cố định:
  - Leo xuất phát tại: `(worldLeft: 430px, worldTop: 250px)` trên Central Spawn Perch (`y: 310px`).
  - Cửa 1 nằm tại: `(worldLeft: 390px, worldTop: 115px)` trên High Apex Altar (`y: 185px`).
  - Khoảng cách thẳng đứng giữa đáy Cửa 1 và đỉnh đầu Leo: $250 - (115 + 70) = \mathbf{65px}$.
  - Khoảng cách ngang tới Cửa Trái: $430 - 100 = 330\text{px}$ (tâm tới tâm: 290px).
  - Khoảng cách ngang tới Cửa Phải: $680 - 430 = 250\text{px}$ (tâm tới tâm: 290px).
  - Kết quả `hasOverlapWithLeo` luôn luôn là **`false` tuyệt đối** trong mọi lượt chơi, mọi Riddle (1/3, 2/3, 3/3).
- **Nhận định về báo cáo lượt trước**: Việc trình bày "5 chu kỳ ngẫu nhiên" ở lượt trước thực chất chỉ là kiểm tra 5 lần hoán vị từ vựng ngẫu nhiên (`opts`) trên cùng 1 template bục duy nhất. Báo cáo này xác nhận minh bạch bản chất kiến trúc 1 template của F4D3.

---

## 🖼️ PHẦN 2: 6 HÌNH ẢNH MINH CHỨNG THỰC TẾ (VIỆC H) — RE-RUN HOÀN TẤT (09:34)

*Tất cả hình ảnh và file JSON bên dưới đều được ghi đè mới nhất lúc **09:34:40 ngày 11/09/2026** trực tiếp vào thư mục `docs/agent_artifacts/screenshots/`.*

### 1. F3D3: Storm Shield Defense — Desktop Baseline (`⏱️ 0:45`, 3 Tim, 0% Pin)
*Ảnh chụp ngay lúc mount (`t = 0`), chưa có thiên thạch nào rơi trúng Leo, pin 0%, 3 tim nguyên vẹn.*

![F3D3 Desktop Baseline](./screenshots/f3d3_storm_shield_desktop_baseline_fixed.png)

---

### 2. F3D3: Storm Shield Defense — Desktop Action (`⏱️ 0:39`, 3 Tim, 40% Pin)
*Leo dịch chuyển sang phải đón đỡ 2 thiên thạch vàng liên tiếp (`playground`), pin tăng 40%, hiện toast DEFLECTED.*

![F3D3 Desktop Action](./screenshots/f3d3_storm_shield_desktop_action_fixed.png)

---

### 3. F3D3: Storm Shield Defense — Mobile Baseline (`⏱️ 0:45`, 3 Tim, 0% Pin)
*Ảnh chụp ngay lúc mount trên Mobile (390x844), thanh banner thu gọn 1 hàng, 3 tim trọn vẹn, không có sát thương.*

![F3D3 Mobile Baseline](./screenshots/f3d3_storm_shield_mobile_baseline_fixed.png)

---

### 4. F3D3: Storm Shield Defense — Mobile Action (`⏱️ 0:41`, 3 Tim, 40% Pin)
*Leo đỡ 2 quả vàng `lesson` (+20% mỗi lần), pin đạt 40%, 3 tim trọn vẹn.*

![F3D3 Mobile Action](./screenshots/f3d3_storm_shield_mobile_action_fixed.png)

---

### 5. F4D3: Riddle Run Maze — Desktop Baseline (`⏱️ 1:29`, 3 Tim)
*Leo xuất phát tại thềm trung tâm `(worldLeft: 430, worldTop: 250)`, Cửa 1 trên bục Apex cao `(390, 115)` cách 65px không trùng lặp, thanh HUD hiển thị nút Guide + Timer.*

![F4D3 Desktop Baseline](./screenshots/f4d3_riddle_run_desktop_baseline_fixed.png)

---

### 6. F4D3: Riddle Run Maze — Desktop Action (`⏱️ 1:28`, 3 Tim)
*Leo di chuyển sang phải (`x = 574`), bước hẫng khỏi mép thềm trung tâm (`x = 560`) và đang rơi tự do trong không trung (`worldTop: 331.6px`) phía trên bục Step Right, chưa chạm sàn (sàn chung ở `y: 460px` nơi Chaser Beast `x: 383.8, y: 475` đang tuần tra).*

![F4D3 Desktop Action](./screenshots/f4d3_riddle_run_desktop_action_fixed.png)


