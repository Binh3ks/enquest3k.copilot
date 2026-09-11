# Báo Cáo Siết Chặt Assertion Hồi Quy & Kiểm Tra Vùng Va Chạm (Việc WW)
**Mã Nhiệm Vụ:** Việc WW — Question Quest (Hạng #4 Chronicles Floor 7 Door 2)  
**Ngày thực hiện:** 2026-09-11  
**Trạng thái:** ✅ ĐÃ KIỂM TRA 9/9 ĐIỂM + ĐO ĐẠC TOAST HUD + PASS 100% 4/4 TỔ HỢP

---

## 1. Nâng Cấp Assertion Occlusion 3 Điểm Cho Từng Plaque (Tổng 9 Điểm)

### 1.1. Phương Pháp Đo
Tại thời điểm chụp ảnh (khi feedback toast hiển thị), mỗi plaque được kiểm tra tại 3 vị trí dọc theo đường trung tâm:
1. `top-center`: `x = left + width/2`, `y = top + 6px` (cách đỉnh plaque 6px)
2. `center`: `x = left + width/2`, `y = top + height/2` (tâm plaque)
3. `bottom-center`: `x = left + width/2`, `y = bottom - 6px` (cách đáy plaque 6px)

Tổng cộng: **3 plaques × 3 điểm = 9 điểm kiểm tra**.  
Điều kiện PASS: `document.elementFromPoint(x, y)` tại toàn bộ 9 điểm bắt buộc phải trúng chính `.vault-door-plaque-220` hoặc thẻ con bên trong nó (`isClear === true`).

### 1.2. Bằng Chứng Thực Tế (9/9 Điểm Clear 100% Cho Cả 4 Tổ Hợp)

#### Tổ hợp 1: W33 Success
- **Cổng 0 (Trái)**:
  - top-center `(160, 286)`: `DIV.vault-door-plaque-220` (PASS ✅)
  - center `(160, 304)`: `SPAN.vault-question-text` (PASS ✅)
  - bottom-center `(160, 322)`: `DIV.vault-door-plaque-220` (PASS ✅)
- **Cổng 1 (Giữa — High Apex Altar)**:
  - top-center `(450, 136)`: `DIV.vault-door-plaque-220` (PASS ✅)
  - center `(450, 154)`: `SPAN.vault-question-text` (PASS ✅)
  - bottom-center `(450, 172)`: `DIV.vault-door-plaque-220` (PASS ✅)
- **Cổng 2 (Phải)**:
  - top-center `(740, 286)`: `DIV.vault-door-plaque-220` (PASS ✅)
  - center `(740, 304)`: `SPAN.vault-question-text` (PASS ✅)
  - bottom-center `(740, 322)`: `DIV.vault-door-plaque-220` (PASS ✅)

#### Tổ hợp 2: W33 Hazard
- Cả 9/9 điểm của 3 cổng đều `isClear: true` (PASS ✅).

#### Tổ hợp 3: W35 Success
- Cả 9/9 điểm của 3 cổng đều `isClear: true` (PASS ✅).

#### Tổ hợp 4: W35 Hazard
- Cả 9/9 điểm của 3 cổng đều `isClear: true` (PASS ✅).

---

## 2. Đo Đạc Chính Xác BoundingClientRect Của Toast Sau Khi Đổi CSS (`top: 6px`)

### 2.1. Số Đo Cụ Thể Của Toast và HUD Elements (Viewport 1200 × 750)

| Element | Top (px) | Bottom (px) | Left (px) | Right (px) | Width (px) | Height (px) |
|---|---|---|---|---|---|---|
| **.hud-overlay** (container) | 0 | 82 | 0 | 1200 | 1200 | 82 |
| **.hud-top-bar** (flex bar) | 0 | 48 | 0 | 1200 | 1200 | 48 |
| **.floating-exit-btn** (Exit) | 10 | 44 | 10 | 138 | 128 | 34 |
| **.hud-hearts** (3 Tim) | 14 | 36 | 130 | 207 | 77 | 22 |
| **.hud-score-display** (XP) | 66 | 94 | 14 | 68 | 54 | 28 |
| **.hud-timer** (Đồng hồ) | 8 | 42 | 1106 | 1186 | 80 | 34 |
| **Toast W33 Success** | 7 | 42 | 290 | 910 | 619 | 35 |
| **Toast W33 Hazard** | 7 | 42 | 349 | 851 | 503 | 35 |
| **Toast W35 Success (dài nhất)** | 7 | 42 | 244 | 956 | 713 | 35 |
| **Toast W35 Hazard** | 7 | 42 | 338 | 862 | 523 | 35 |

### 2.2. Xác Nhận Toast Có Overlap HUD Không?
- **Khoảng cách tới Tim (`.hud-hearts`):**
  - Cạnh phải của Tim: `right = 207px`.
  - Cạnh trái của Toast ngắn nhất: `left = 349px` $\rightarrow$ Khoảng cách an toàn: **142px**.
  - Cạnh trái của Toast dài nhất (W35 Success, width 713px): `left = 244px` $\rightarrow$ Khoảng cách an toàn: **37px**.
  - **Kết luận:** Toast **KHÔNG OVERLAP TIM** trong mọi trường hợp (luôn cách xa tối thiểu 37px về bên phải).
- **Khoảng cách tới Timer (`.hud-timer`):**
  - Cạnh trái của Timer: `left = 1106px`.
  - Cạnh phải của Toast dài nhất: `right = 956px`.
  - Khoảng cách an toàn: $1106 - 956 = \mathbf{150px}$.
  - **Kết luận:** Toast **KHÔNG OVERLAP TIMER** trong mọi trường hợp (luôn cách xa tối thiểu 150px về bên trái).
- **Khoảng cách tới Score XP (`.hud-score-display`):**
  - Score XP nằm ở `top: 66px - 94px, left: 14px - 68px`.
  - Toast nằm ở `top: 7px - 42px`.
  - **Kết luận:** Toast **KHÔNG OVERLAP XP** (cách xa cả trục X lẫn Y).
- **Tổng kết:** Toast nằm chính xác ở khoảng trống trung tâm của HUD (`left: 208px` đến `1105px`), hoàn toàn không che khuất bất kỳ phần tử con nào của HUD.

---

## 3. Đo Width Thật Của Toast Dài Nhất Ở Cả 3 Vị Trí Cổng Trái / Giữa / Phải

### 3.1. Các Kịch Bản Chọn Sai Cổng (Toast "SEALED! ... does not match this event!")

1. **Khi chọn sai Cổng Trái (Door 0):**
   - Text: `🔒 SEALED! "Where did he fall?" does not match this event!`
   - Rect: `{ top: 7, bottom: 42, left: 367, right: 833, width: 466, height: 35 }`
2. **Khi chọn sai Cổng Giữa (Door 1):**
   - Text: `🔒 SEALED! "Who drove the yellow bus?" does not match this event!`
   - Rect: `{ top: 7, bottom: 42, left: 338, right: 862, width: 523, height: 35 }`
3. **Khi chọn sai Cổng Phải (Door 2):**
   - Text: `🔒 SEALED! "Why did they return home?" does not match this event!`
   - Rect: `{ top: 7, bottom: 42, left: 337, right: 863, width: 526, height: 35 }`

### 3.2. Đối Chiếu Tọa Độ Trực Quan Với Plaque Cổng Trái và Phải

| Đối tượng | Top (px) | Bottom (px) | Left (px) | Right (px) |
|---|---|---|---|---|
| **Toast SEALED Dài Nhất (526px)** | **7** | **42** | **337** | **863** |
| **Plaque Cổng Trái (Door 0)** | **280** | **328** | **50** | **270** |
| **Plaque Cổng Phải (Door 2)** | **280** | **328** | **630** | **850** |

- **Về trục dọc Y:**
  - Toast nằm ở `y = 7px - 42px`.
  - Plaque cổng trái và cổng phải đều nằm ở `y = 280px - 328px`.
  - Khoảng cách thẳng đứng:
    $$280 - 42 = \mathbf{238px}!$$
  - Toast cách xa đỉnh của cả 2 cổng tầng dưới **238 pixel**, hoàn toàn không thể chạm tới hoặc che khuất dù chỉ 1 pixel!
- **Về trục ngang X:**
  - Plaque cổng trái kết thúc tại `right = 270px`. Cạnh trái của toast bắt đầu tại `left = 337px`.
  - Khoảng cách ngang: $337 - 270 = \mathbf{67px}$ về bên phải. Toast không hề chiếm chung dải tọa độ X với Cổng Trái.
  - Với Cổng Phải (`630px - 850px`): Do khoảng cách dọc cách nhau tới 238px, việc trùng tọa độ X ở tầng trên là hoàn toàn bình thường và không gây bất kỳ sự che khuất nào (như mây trên trời so với bệ đá dưới đất).

---

## 4. Kết Luận
Việc WW đã hoàn tất 100%:
- 9/9 điểm kiểm tra trên 3 plaques đều đạt `isClear: true`.
- Toast tại `top: 6px` không overlap Tim, Timer hay XP của HUD.
- Toast không tràn ngang che khuất Cổng Trái hay Cổng Phải.
- Hạng #4 (Question Quest) chính thức hoàn tất xác minh toàn diện.
