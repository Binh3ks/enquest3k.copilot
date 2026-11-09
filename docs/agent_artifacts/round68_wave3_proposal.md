# 📑 ĐỀ XUẤT QUY HOẠCH SẢN XUẤT WAVE 3 (STAGE 2 B2 FIRST ROTARY)
**Phiên làm việc:** Round 68  
**Chuẩn đào tạo:** Stage 2: Cambridge Lower Secondary & B2 First / FCE Rotary  
**Mục tiêu:** Quy hoạch 7 tuần học B2 Rotary tiếp theo, đối soát triệt để với Lịch thi Mock Exam 39 tuần (`week % 4 === 0`), và thiết lập mối liên kết cung cấp dữ liệu nền (Cumulative Grounding) cho kỳ thi Mock W128.

---

## 1. 🔍 BỐI CẢNH & ĐỐI SOÁT LỊCH THI MOCK EXAM (`week % 4 === 0`)

Tại Round 62, kế hoạch sơ bộ dự kiến sản xuất Wave 3 tại dải tuần W125+.  
Tại Round 64 & 65, hệ thống đã thiết lập quy tắc bất biến: **Mọi tuần chia hết cho 4 ($week \pmod 4 = 0$) đều là Mock Exam toàn diện.**

### Bảng đối soát từng tuần trong dải W125–W134:
| Tuần | Công thức Modulo | Loại tuần theo Lịch mới | Đánh giá Xung đột | Quyết định điều chỉnh |
| :---: | :---: | :---: | :---: | :--- |
| **W125** | $125 \pmod 4 = 1$ | `rotary_practice` | Đã merge ở Round 62 | Giữ nguyên trong production (làm nguồn từ vựng cho W128) |
| **W126** | $126 \pmod 4 = 2$ | `rotary_practice` | ✅ Không xung đột | **GIỮ TRONG WAVE 3** (Tuần 1) |
| **W127** | $127 \pmod 4 = 3$ | `rotary_practice` | 💡 Đã retired khỏi mock cũ | **THÊM VÀO WAVE 3** (Tuần 2) — Giải phóng làm Rotary |
| **W128** | $128 \pmod 4 = 0$ | **`full_mock` (PET/FCE Mock 14)** | 🚨 **XUNG ĐỘT MOCK** | **LOẠI KHỎI ROTARY WAVE 3** — Chuyển sang Mock Pipeline |
| **W129** | $129 \pmod 4 = 1$ | `rotary_practice` | ✅ Không xung đột | **GIỮ TRONG WAVE 3** (Tuần 3) |
| **W130** | $130 \pmod 4 = 2$ | `rotary_practice` | ✅ Không xung đột | **GIỮ TRONG WAVE 3** (Tuần 4) |
| **W131** | $131 \pmod 4 = 3$ | `rotary_practice` | ✅ Không xung đột | **GIỮ TRONG WAVE 3** (Tuần 5) |
| **W132** | $132 \pmod 4 = 0$ | **`full_mock` (PET/FCE Mock 15)** | 🚨 **XUNG ĐỘT MOCK** | **LOẠI KHỎI ROTARY WAVE 3** — Chuyển sang Mock Pipeline |
| **W133** | $133 \pmod 4 = 1$ | `rotary_practice` | ✅ Không xung đột | **GIỮ TRONG WAVE 3** (Tuần 6) |
| **W134** | $134 \pmod 4 = 2$ | `rotary_practice` | 💡 Ứng viên Rotary tự do | **THÊM VÀO WAVE 3** (Tuần 7) — Đủ quota 7 tuần |

---

## 2. 📋 DANH SÁCH 7 TUẦN WAVE 3 CHUẨN HÓA (100% ROTARY, 0% XUNG ĐỘT)

| STT | Tuần | CEFR | Level | Chủ đề Syllabus (Blueprint) | Trọng tâm Ngữ pháp & CLIL | Toán & Dữ liệu |
| :---: | :---: | :---: | :---: | :--- | :--- | :--- |
| 1 | **W126** | B2 | FCE Rotary | Advanced Robotics & Artificial Intelligence Ethics | Complex Passive Voice & Impersonal Structures; Algorithmic logic | Probability Trees & Algorithm Steps |
| 2 | **W127** | B2 | FCE Rotary | Global Climate Systems & Renewable Energy | Mixed Conditionals & Cause-Effect Sequences; Greenhouse modeling | Quadratic Curves & Solar Output Modeling |
| 3 | **W129** | B2 | FCE Rotary | Architecture of the Future: Megacities & Sustainability | Future Perfect & Future Continuous; Urban planning proposals | 3D Spatial Geometry & Volume Optimization |
| 4 | **W130** | B2 | FCE Rotary | Deep Ocean Exploration & Abyssal Organisms | Advanced Inversion for Emphasis; Hydrothermal ecosystem analysis | Pressure-Depth Linear Functions |
| 5 | **W131** | B2 | FCE Rotary | Genetics & Biotechnology: Modern Agriculture | Relative Clauses (Defining & Non-defining); Genetic modification debate | Ratio Distributions & Punnett Matrices |
| 6 | **W133** | B2 | FCE Rotary | Astrophysics: Black Holes, Galaxies & Gravity | Modals of Deduction (Past & Present); Stellar evolution narrative | Scientific Notation & Gravitational Scaling |
| 7 | **W134** | B2 | FCE Rotary | Economics & International Trade: Globalization | Discourse Markers of Concession & Contrast; Trade equilibrium | Currency Exchange Functions & Percentage Deltas |

---

## 3. 🔗 TÁC ĐỘNG TÍCH HỢP TỚI MOCK EXAM PIPELINE (W128 & W132)

1. **Mở khóa kỳ thi Mock W128:**
   - Khối lũy kế của W128 là: `[W125, W126, W127, W128]`.
   - W125 đã được merge vào production ở Round 62.
   - Khi Wave 3 sản xuất xong W126 và W127, **toàn bộ 100% tiền đề từ vựng của Mock W128 sẽ được thỏa mãn ngay lập tức**.
   - Điều này cho phép sinh Mock W128 hoàn toàn không có lỗ hổng phụ thuộc!

2. **Kế hoạch triển khai kiến nghị:**
   - **Giai đoạn A (Round 69):** Sinh và stage toàn bộ 7 tuần Rotary của Wave 3 (`W126, W127, W129, W130, W131, W133, W134`) theo chuẩn 10 Mechanical Gates + CEFR Guard.
   - **Giai đoạn B (Round 70):** Sinh Mock Exam W128 (PET/FCE Stage 2) dựa trên nguồn dữ liệu thực từ W125, W126, W127.
