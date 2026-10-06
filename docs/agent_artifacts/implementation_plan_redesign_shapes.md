# Implementation Plan — Redesign Theo Nhóm Cơ Chế (Batch 0, Batch 1, Batch 2, Batch 3) — Lần 13

**Tài liệu tham chiếu**:
- [ENGQUEST3K_REDESIGN_THEO_NHOM_CO_CHE.md](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/ENGQUEST3K_REDESIGN_THEO_NHOM_CO_CHE.md)
- [BAO_CAO_AUDIT_TOAN_BO_21_GAMES_THEO_KHUNG_THIET_KE_2026_09_12.md](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/BAO_CAO_AUDIT_TOAN_BO_21_GAMES_THEO_KHUNG_THIET_KE_2026_09_12.md)

---

## 1. Rà Soát Mức Độ Nghiêm Ngặt Của Các Game Còn Lại (Batch 1, 2, 3)

| Batch / Nhóm | Game | Trạng thái Toán học & Pacing | Bảng Xác Minh Từng Round? | Validator Tự Động (Build Gate)? | Hành động Xử lý Song song |
|---|---|:---:|:---:|:---:|---|
| **Batch 3** | **WordWagonJump** | ✅ Xong ($1.78\%$, Worst-case $10.24$s, Timer $145$s) | ✅ Đã lập ($N=12$w, $+5.14$s) | ✅ `verify_wordwagon_content_length.mjs` | Đã sẵn sàng Playtest Puppeteer |
| **Batch 3** | **BubbleStormChase** | ⚠️ Đã có $N4=1.56\%$, $12$s/wave | ❌ Chưa lập bảng từng wave | ❌ Chưa có validator riêng | **Cần xử lý**: Khóa trần định nghĩa $\le 8$w, mở rộng validator cho Bubble |
| **Batch 3** | **Anvil Rush, Riddle Run, Titan Forge** | ⚠️ Đã chốt $R=6, L=1 \rightarrow 1.78\%$ | ❌ Chưa lập bảng từng round | ❌ Chưa có validator riêng | Lập bảng pacing và validator khi code Batch 3 |
| **Batch 1 (Shape A)** | **QuestionQuestRunner** | ✅ Xong ($50$px/s, $0.686\%$) | ✅ Đã cân bằng độ dài câu | ❌ Chưa có script chặn build | Bổ sung validator kiểm tra độ dài câu khi code Batch 1 |
| **Batch 1 (Shape A)** | **ConnectorRelay, HighwaySprint, SyntaxExpress** | ✅ Đã chốt $R=6, L=1 \rightarrow 0.686\%$ (NegBinomial) | ❌ Chưa lập bảng từng round | ❌ Chưa có script chặn build | Bổ sung bảng worst-case và validator khi code Batch 1 |
| **Batch 2 (Shape D)** | **ScrollChamber, ShadowVault, PotionFlip, ClozeGauntlet** | ✅ Đã chốt mô hình xác suất & Pacing | ⚠️ Mới có bảng của ShadowVault ($123$s/$135$s) | ❌ Chưa có script chặn build | Bổ sung bảng worst-case và validator khi code Batch 2 |

*Chiến lược xử lý song song*: Khi bước vào triển khai từng Batch, Agent BẮT BUỘC phải tạo validator kiểm định trần từ tự động và lập bảng worst-case cho các game của Batch đó, không để nợ kỹ thuật hay dồn vào cuối.

---

## 2. Giao Thức Playtest Puppeteer Bàn Phím Thật (Mandatory Verification Gate)

Tuân thủ nghiêm ngặt **MANDATORY ANTI-HALLUCINATION ENFORCEMENT GATE** (AGENTS.md):
**TUYỆT ĐỐI KHÔNG TICK HOÀN THÀNH BẤT KỲ GAME NÀO NẾU CHƯA CÓ BẰNG CHỨNG PLAYTEST PUPPETEER THẬT.**

### 3 Bằng chứng bắt buộc phải nộp (Embed Ảnh + Stdout Log) cho WordWagonJump:
1. **(a) Bằng chứng Khóa Quyết Định (Magnetic Coupler Latch)**:
   - Script gửi phím nhảy `Space` lên toa $\rightarrow$ Leo tiếp đất $\rightarrow$ Script gửi tiếp phím `ArrowRight`/`Space` $\rightarrow$ Xác nhận tọa độ `x` của Leo bị khóa cố định theo toa, không thể nhảy sang toa khác. Chụp ảnh màn hình hiển thị icon khóa / hiệu ứng dính chặt.
2. **(b) Bằng chứng Rơi Vực Khi Không Nhảy (Fall into Chasm)**:
   - Script không gửi phím điều khiển, để đoàn tàu trôi qua $x = 100 \rightarrow 0$ $\rightarrow$ Chụp ảnh màn hình khoảnh khắc bệ đá sụp đổ, Leo rơi xuống vực sâu và HUD tim bị trừ: `❤️❤️` $\rightarrow$ `❤️` (hoặc KO).
3. **(c) Bằng chứng Thực Tế Timer 145s & Shield Qua Hầm**:
   - Script điều khiển Leo nhảy đúng toa $\rightarrow$ Chụp ảnh Energy Shield phát sáng vàng bảo vệ Leo qua cửa hầm an toàn $\rightarrow$ Chụp HUD Timer tại Round 6 xác nhận đồng hồ đếm lùi vẫn còn dư thời gian (dư $\ge 12$s theo tính toán).

---

## 3. Trạng Thái & Lộ Trình Triển Khai

- **Batch 0**: Đã hoàn thành 100%.
- **WordWagonJump**: Thiết kế toán học & validator đã đóng 100%.
- **Kế hoạch tiếp theo**:
  - Triển khai code Batch 1 (Shape A: 4 games) $\rightarrow$ Playtest Puppeteer bàn phím thật $\rightarrow$ Báo cáo bằng chứng ảnh thật.
  - Sau đó chuyển sang Batch 2 (Shape D) và Batch 3 (Shape C & B, bao gồm WordWagonJump & BubbleStormChase).
