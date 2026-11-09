# BÁO CÁO ĐỐI SOÁT BACKLOG WAVE 2 & WAVE 3 VỚI LỊCH MOCK EXAM 39 TUẦN

> **Phiên bản:** Round 65 — Task 3 Cross-Check  
> **Mục tiêu:** Rà soát và loại bỏ triệt để các nguy cơ xung đột lịch thi Mock Exam (`week % 4 === 0`) đối với kế hoạch triển khai Wave 2 (Stage 2 B1 Rotary) và Wave 3 (Stage 2 B2 Rotary), ngăn ngừa tuyệt đối sự cố phát sinh tương tự như W40/W44 ở Wave 1.

---

## I. TỔNG QUAN NGUYÊN TẮC RÀ SOÁT (SCHEDULE INVARIANT)

1. **Cadence Chuẩn:** Bất kỳ tuần nào thỏa mãn `week % 4 === 0` (W4, W8, W12, ... W156) **BẮT BUỘC** là tuần **Mock Exam (`full_mock`)**, KHÔNG ĐƯỢC PHÉP nằm trong danh sách sản xuất Rotary Practice.
2. **Kế thừa các tuần Pilot đã Merge (Round 62):**
   - **W78** (Stage 2 B1 Pilot) đã merge vào Production tại Round 62.
   - **W125** (Stage 2 B2 Pilot) đã merge vào Production tại Round 62.
   - Do đó, W78 và W125 không còn nằm trong danh sách chờ sản xuất của Wave 2 và Wave 3.
3. **Tận dụng các tuần Retired từ Mock cũ:**
   - 16 tuần trước đây là mock theo chu kỳ lẻ ~5 tuần đã được hạ cờ thành `rotary_practice` ở Round 65 (Task 1).
   - Các tuần này nay trở lại làm ứng viên Rotary tiêu chuẩn đầy đủ của Wave 2 & Wave 3.

---

## II. RÀ SOÁT WAVE 2: STAGE 2 B1 PRELIMINARY (PET ROTARY)

### 1. Phân tích xung đột danh sách dự kiến ban đầu
Danh sách Wave 2 ban đầu dự kiến gồm 7 tuần xung quanh cụm W73+:  
`W73, W74, W75, W76, W79, W80, W81` (bỏ qua W77 vì tưởng là mock cũ).

| Tuần | Công thức Modulo | Loại tuần theo Lịch mới | Phát hiện Xung đột | Xử lý |
| :---: | :---: | :---: | :---: | :--- |
| **W73** | $73 \pmod 4 = 1$ | `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 2 |
| **W74** | $74 \pmod 4 = 2$ | `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 2 |
| **W75** | $75 \pmod 4 = 3$ | `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 2 |
| **W76** | $76 \pmod 4 = 0$ | **`full_mock` (PET Mock 1)** | 🚨 **XUNG ĐỘT NGHIÊM TRỌNG** | **LOẠI BỎ KHỎI WAVE 2** — Chuyển sang pipeline Mock Exam |
| **W77** | $77 \pmod 4 = 1$ | `rotary_practice` (Đã Retired) | 💡 **CƠ HỘI BỔ SUNG** | **THÊM VÀO WAVE 2** (Đã giải phóng khỏi mock cũ) |
| **W78** | $78 \pmod 4 = 2$ | `rotary_practice` | ℹ️ Đã merge ở Round 62 | Không cần tạo lại |
| **W79** | $79 \pmod 4 = 3$ | `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 2 |
| **W80** | $80 \pmod 4 = 0$ | **`full_mock` (PET Mock 2)** | 🚨 **XUNG ĐỘT NGHIÊM TRỌNG** | **LOẠI BỎ KHỎI WAVE 2** — Chuyển sang pipeline Mock Exam |
| **W81** | $81 \pmod 4 = 1$ | `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 2 |
| **W82** | $82 \pmod 4 = 2$ | `rotary_practice` (Đã Retired) | 💡 **CƠ HỘI BỔ SUNG** | **THÊM VÀO WAVE 2** (Đã giải phóng khỏi mock cũ) |

### 2. Danh sách 7 tuần Wave 2 Chuẩn hóa (100% Rotary, 0% Xung đột Mock)

| STT | Tuần | CEFR | Level | Chủ đề Syllabus (Blueprint) | Trạng thái Blueprint |
| :---: | :---: | :---: | :---: | :--- | :---: |
| 1 | **W73** | B1 | PET Rotary | Ancient Civilizations: Roman Engineering & Daily Life | `rotary_practice (false)` |
| 2 | **W74** | B1 | PET Rotary | Environmental Science: Rainforest Ecosystems & Biodiversity | `rotary_practice (false)` |
| 3 | **W75** | B1 | PET Rotary | Innovations: History of Aviation & Flight Principles | `rotary_practice (false)` |
| 4 | **W77** | B1 | PET Rotary | Marine Biology: Coral Reefs & Ocean Conservation | `rotary_practice (false)` |
| 5 | **W79** | B1 | PET Rotary | World Geography: Deserts of the World & Adaptations | `rotary_practice (false)` |
| 6 | **W81** | B1 | PET Rotary | Space Exploration: Solar System & Mars Missions | `rotary_practice (false)` |
| 7 | **W82** | B1 | PET Rotary | Arts & Culture: Renaissance Masters & Architecture | `rotary_practice (false)` |

*Ghi chú: Toàn bộ 7 tuần trên đều có `week % 4 !== 0` và cờ `isFullMock: false`.*

---

## III. RÀ SOÁT WAVE 3: STAGE 2 B2 FIRST / UPPER INTERMEDIATE ROTARY

### 1. Phân tích xung đột danh sách dự kiến ban đầu
Danh sách Wave 3 ban đầu dự kiến gồm các tuần xung quanh cụm W125+:  
`W126, W128, W129, W130, W131, W133` (bỏ qua W127 vì tưởng là mock cũ).

| Tuần | Công thức Modulo | Loại tuần theo Lịch mới | Phát hiện Xung đột | Xử lý |
| :---: | :---: | :---: | :---: | :--- |
| **W125**| $125 \pmod 4 = 1$| `rotary_practice` | ℹ️ Đã merge ở Round 62 | Không cần tạo lại |
| **W126**| $126 \pmod 4 = 2$| `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 3 |
| **W127**| $127 \pmod 4 = 3$| `rotary_practice` (Đã Retired) | 💡 **CƠ HỘI BỔ SUNG** | **THÊM VÀO WAVE 3** (Đã giải phóng khỏi mock cũ) |
| **W128**| $128 \pmod 4 = 0$| **`full_mock` (PET Mock 14)** | 🚨 **XUNG ĐỘT NGHIÊM TRỌNG** | **LOẠI BỎ KHỎI WAVE 3** — Chuyển sang pipeline Mock Exam |
| **W129**| $129 \pmod 4 = 1$| `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 3 |
| **W130**| $130 \pmod 4 = 2$| `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 3 |
| **W131**| $131 \pmod 4 = 3$| `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 3 |
| **W132**| $132 \pmod 4 = 0$| **`full_mock` (PET Mock 15)** | 🚨 **XUNG ĐỘT (Mock giữ nguyên)** | Không đưa vào Rotary |
| **W133**| $133 \pmod 4 = 1$| `rotary_practice` | ✅ Không xung đột | Giữ lại Wave 3 |
| **W134**| $134 \pmod 4 = 2$| `rotary_practice` | 💡 **CƠ HỘI BỔ SUNG** | **THÊM VÀO WAVE 3** (Đủ quota 7 tuần) |

### 2. Danh sách 7 tuần Wave 3 Chuẩn hóa (100% Rotary, 0% Xung đột Mock)

| STT | Tuần | CEFR | Level | Chủ đề Syllabus (Blueprint) | Trạng thái Blueprint |
| :---: | :---: | :---: | :---: | :--- | :---: |
| 1 | **W126** | B2 | FCE Rotary | Advanced Robotics & Artificial Intelligence Ethics | `rotary_practice (false)` |
| 2 | **W127** | B2 | FCE Rotary | Global Climate Systems & Renewable Energy | `rotary_practice (false)` |
| 3 | **W129** | B2 | FCE Rotary | Architecture of the Future: Megacities & Sustainability | `rotary_practice (false)` |
| 4 | **W130** | B2 | FCE Rotary | Deep Ocean Exploration & Abyssal Organisms | `rotary_practice (false)` |
| 5 | **W131** | B2 | FCE Rotary | Genetics & Biotechnology: Modern Agriculture | `rotary_practice (false)` |
| 6 | **W133** | B2 | FCE Rotary | Astrophysics: Black Holes, Galaxies & Gravity | `rotary_practice (false)` |
| 7 | **W134** | B2 | FCE Rotary | Economics & International Trade: Globalization | `rotary_practice (false)` |

*Ghi chú: Toàn bộ 7 tuần trên đều có `week % 4 !== 0` và cờ `isFullMock: false`.*

---

## IV. BẢNG TỔNG KẾT SO SÁNH TRƯỚC VÀ SAU ĐỐI SOÁT

| Hạng mục | Dự kiến ban đầu (Chưa đối soát) | Chuẩn hóa sau đối soát Lịch 39 Mock | Lý do điều chỉnh |
| :--- | :--- | :--- | :--- |
| **Wave 2 Scope** | W73, W74, W75, **W76**, W79, **W80**, W81 | **W73, W74, W75, W77, W79, W81, W82** | Loại bỏ W76, W80 (`% 4 === 0`); Bổ sung W77, W82 (retired mock) |
| **Wave 3 Scope** | W126, **W128**, W129, W130, W131, W133 | **W126, W127, W129, W130, W131, W133, W134** | Loại bỏ W128 (`% 4 === 0`); Bổ sung W127 (retired mock), W134 |
| **Xung đột Mock**| Có 3 tuần bị trùng lặp mock (W76, W80, W128) | **0 tuần xung đột (100% sạch)** | Triệt tiêu hoàn toàn nguy cơ lặp lại sự cố W40/W44 |
| **Engine tạo bài**| Chưa phân định rõ | Tách bạch 100%: Rotary dùng Wave generator; Mock dùng Mock engine | Đảm bảo tính nhất quán cấu trúc đề thi |

---

## V. KẾT LUẬN & KIẾN NGHỊ

1. **Backlog sạch 100%:** Cả hai danh sách Wave 2 (7 tuần) và Wave 3 (7 tuần) sau khi chuẩn hóa đều không chứa bất kỳ tuần nào là Mock Exam.
2. **Quy trình triển khai:**
   - Khi chủ dự án phê duyệt Wave 2, chỉ chạy script sinh nội dung Rotary cho `W73, W74, W75, W77, W79, W81, W82`.
   - Các tuần Mock (`W76, W80, W128...`) sẽ được sinh riêng biệt bởi Mock Exam Engine theo định dạng Cambridge PET (Stage 2) sau khi Pilot W36 được phê duyệt.
