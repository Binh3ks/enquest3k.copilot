# REDESIGN THEO NHÓM CƠ CHẾ (SHAPE) — 21 GAME ENGQUEST3K
**Dựa trên**: BAO_CAO_AUDIT_TOAN_BO_21_GAMES + 42 ảnh playtest thật, 2026-09-12
**Vai trò**: Game designer giáo dục + ESL — Phase 2, thay thế hoàn toàn cách sửa từng game.

---

## 0. Phát hiện quan trọng nhất từ audit: đây KHÔNG phải 21 lỗi riêng lẻ

Cùng 1 con số xác suất **70.37%** xuất hiện GIỐNG HỆT NHAU ở 5 game khác nhau (Word Wagon Jump, Anvil Rush Grammar, Syntax Express Rail, Riddle Run Maze, Titan Grammar Forge) — không phải trùng hợp, mà vì cả 5 game copy cùng 1 template mặc định "3 lựa chọn / 3 round / cho sai 2 lần" mà KHÔNG hề tính lại theo nội dung thật. Tương tự, lỗi N2 (đọc không kịp) lặp lại ở 6/6 game dạng "đường chạy cuộn" vì tốc độ cuộn là hằng số cứng, không phụ thuộc độ dài câu.

**Kết luận**: sửa từng game sẽ luôn thất bại (đã thất bại 2 lần). Phải sửa ở **tầng công thức tham số dùng chung**, áp cho từng NHÓM cơ chế (shape), không phải từng game riêng.

---

## 1. Phân nhóm 21 game theo Shape (cơ chế lõi giống nhau)

| Shape | Game thành viên | Lỗi chung chủ đạo |
|---|---|---|
| **A — Lane Runner** (đường chạy cuộn 3 làn, chọn làn) | Connector Relay (F6D2), Highway Word Runner (F4D1), Syntax Express Rail (F4D2), Question Quest Runner (F7D2) | N2 nặng nhất cả bộ: Highway Word Runner T_đọc=15.23s vs T_engine=2.78s (gấp 5.5 lần); Question Quest 25.11s vs 7.5s. Tốc độ cuộn là hằng số, không theo độ dài câu |
| **B — Falling Defense** (vật rơi từ trên, dùng khiên đỡ) | Synonym Storm (F6D1), Storm Shield Defense (F3D3) | N4: quá nhiều tim so với tỷ lệ đúng/sai (Synonym Storm 86.83% do 4 tim quá hào phóng; Storm Shield 50% do nhị phân đúng/sai) |
| **C — Platform Hop & Collect/Strike** (nền tảng cố định, nhảy tới chọn) | Word Forge Scramble (F7D1), Anvil Rush Grammar (F2D2), Titan Grammar Forge (F5D2), Riddle Run Maze (F4D3), Grand Matrix Dungeon (F5D1), Bubble Storm Chase (F1D1) | N4: 4/6 game dính đúng bug template "70.37%"; Word Forge N1 fail (không có áp lực thời gian tại thời điểm đọc, Leo đi trên mặt phẳng) |
| **D — Carry & Place / Match** (nhặt vật, né quái, đặt đúng ô hoặc lật ghép cặp) | Scroll Chamber Decode (F2D3), Cambridge Cloze Gauntlet (F5D3), Shadow Vault Infiltrate (F1D3), Potion Flip Dungeon (F2D1) | **Potion Flip là lỗi nặng nhất toàn bộ 21 game**: lật sai thẻ KHÔNG bị trừ tim (chỉ patrol chạm mới trừ) → giải được 100% bằng trí nhớ vị trí, không cần biết 1 từ tiếng Anh nào |
| **E — Static Puzzle/Order** (đọc rồi sắp xếp, không real-time) | Story Sequencer (F6D3) | Duy nhất — N4 tốt (1.67%) nhưng N1 fail theo định nghĩa "đồng thời" vì bản chất là suy luận có thời gian nghĩ, không phải phản xạ. **Cần Owner quyết định**: đây có nên là ngoại lệ hợp lệ (kỹ năng sequencing vốn cần suy luận, không cần phản xạ) hay bắt buộc thêm áp lực thời gian? |
| **F — Arena Shooter** (ngắm bắn/ném vào mục tiêu) | Echo Arena Shooter (F3D1), Chunk Catapult Match (F3D2) | Lỗi thiết kế nội dung, không chỉ tham số: Echo Arena có **2/4 mục tiêu đều "đúng"** (distractor thiết kế sai khiến random cũng ăn 50%); Chunk Catapult **không có Game Over**, bắn spam vô hạn đến khi trúng = 100% brute-force, và thiếu hoàn toàn HUD tim |
| **G — Custom/Unique** | Word Class Balance (F7D3) | N3: cơ chế "Aim rồi Strike" 2 bước không tự hiểu trong 5s đầu |

**N5 (thiếu HUD Floor/Door, Tim, hoặc Round)**: 12/21 game thiếu ít nhất 1 mục — xảy ra RẢI RÁC ở mọi shape → xác nhận đây là lỗi ở tầng component dùng chung (`HUDOverlay.jsx` tồn tại nhưng không được gọi/truyền props nhất quán ở mọi game), không phải lỗi riêng từng game.

---

## 2. Công thức chuẩn bắt buộc — thay thế mọi hằng số cứng

### Công thức 1 — Ngân sách thời gian (áp dụng Shape A, B, C — mọi cơ chế real-time)

```
T_đọc = N_từ × t_mỗi_từ + t_quyết_định
  t_mỗi_từ = 0.6–0.7s (tốc độ đọc A2, giữ nguyên chuẩn đã dùng trong audit)
  t_quyết_định = 1.2–3.0s tùy số lựa chọn/độ phức tạp

T_engine_tối_thiểu = T_đọc × 1.3   (hệ số an toàn, học sinh đọc chậm hơn ước tính)

tốc_độ_tối_đa = khoảng_cách_đến_điểm_quyết_định / T_engine_tối_thiểu
```

**Bắt buộc**: mọi game Shape A/B/C phải tính `tốc_độ_tối_đa` từ nội dung THẬT của round đó (câu dài nhất trong pool), KHÔNG dùng hằng số px/s cố định trong code.

### Công thức 2 — Anti-guess (áp dụng MỌI shape có nhiều lựa chọn)

```
q = (n-1)/n     (xác suất đoán sai 1 round, n = số lựa chọn)
P(qua bằng đoán mò) = Σ_{k=0}^{L} C(R,k) · q^k · (1-q)^(R-k)
  n = số lựa chọn mỗi round
  R = tổng số round
  L = số tim tối đa cho phép mất (bao nhiêu lần sai vẫn qua được)
```

**Bắt buộc**: chọn (n, R, L) sao cho P < 5%. Bảng tham chiếu nhanh (đã verify công thức, Antigravity tính chính xác lại cho từng game):

| n | R | L | P(đoán mò qua) | Kết luận |
|---|---|---|---|---|
| 3 | 3 | 2 | 70.37% | ❌ default bug — đang dùng sai ở 5 game |
| 3 | 6 | 1 | 1.78% | ✅ đã verify đúng ở Question Quest Runner |
| 3 | 5 | 1 | ~4.6% | ✅ biên an toàn, cần Antigravity verify chính xác |
| 4 | 4 | 1 | ~5-6% | ⚠️ biên giới hạn, cần verify |
| 4 | 5 | 1 | ~2-3% | ✅ cần verify |

→ Các game Shape C đang dính "70.37%" (Anvil Rush, Titan Grammar Forge, Riddle Run Maze) chọn 1 trong 2 hướng: tăng R lên 5-6 + giảm L xuống 1, HOẶC tăng n (thêm bệ/lựa chọn gây nhiễu) giữ nguyên R=3.

### Công thức 3 — Shared HUD component (áp dụng TẤT CẢ 21 game, không ngoại lệ)

Mọi game PHẢI render qua `HUDOverlay` dùng chung với đủ 4 prop bắt buộc: `floorDoorLabel`, `hearts`, `round` (hoặc tương đương wave/trial/riddle — miễn hiển thị dạng `x/y`), `xp`. Không game nào được tự vẽ header riêng thiếu 1 trong 4 prop này.

---

## 3. Lỗi thiết kế KHÔNG PHẢI tham số — phải sửa luật chơi trước khi tính lại số

| Game | Lỗi luật chơi (không phải chỉnh số) |
|---|---|
| Potion Flip Dungeon (Shape D) | Lật sai thẻ phải trừ tim (hoặc phạt thời gian nặng) — hiện tại lật sai miễn phí, chỉ patrol mới trừ tim |
| Chunk Catapult Match (Shape F) | Phải thêm điều kiện Game Over thật (hết tim/hết đạn), cấm bắn spam vô hạn; thêm HUD tim |
| Echo Arena Shooter (Shape F) | Phải sửa nội dung: mỗi round chỉ 1 mục tiêu đúng duy nhất, không được có 2/4 quả cầu cùng "đúng" |
| Word Class Balance (Shape G) | Thêm hint 1 câu ở round đầu giải thích luồng Aim→Strike |
| Story Sequencer (Shape E) | Owner quyết định: chấp nhận là ngoại lệ "puzzle suy luận" hay bắt buộc thêm áp lực thời gian |

---

## 4. Thứ tự batch mới — theo SHAPE, không theo game đơn lẻ

1. **Batch 0 (nền tảng, làm trước tất cả)**: cài đặt 2 hàm dùng chung `calcPacingBudget()` và `calcAntiGuessParams()` + ép mọi game gọi `HUDOverlay` đủ 4 prop. Đây là hạ tầng, không phải "sửa 1 game".
2. **Batch 1 — Shape A (Lane Runner, 4 game)**: lỗi N2 nặng nhất toàn bộ dự án, sửa 1 lần bằng Công thức 1 cho cả 4 game cùng lúc.
3. **Batch 2 — Shape D (Carry & Place, 4 game)**: ưu tiên vì có lỗi luật chơi nghiêm trọng nhất (Potion Flip 100% brute-force).
4. **Batch 3 — Shape C (Platform Hop, 6 game)**: áp Công thức 2 đồng loạt, sửa bug "70.37%" lặp lại.
5. **Batch 4 — Shape F (Arena Shooter, 2 game)** + **Shape B (Falling Defense, 2 game)**: sửa luật chơi (Echo Arena, Chunk Catapult) + tính lại tim theo Công thức 2.
6. **Batch 5 — Shape E + G (2 game còn lại)**: Story Sequencer (chờ quyết định Owner) + Word Class Balance (thêm tutorial).

Owner xác nhận bằng ảnh/video thật sau MỖI batch mới mở batch tiếp theo — không đổi từ nguyên tắc này.

---

## 5. Bảng điền lại (dùng schema Mục 6 của KHUNG_THIET_KE_21_GAMES.md) cho mỗi game sau khi áp công thức, thêm 1 dòng:
```
- Công thức áp dụng: [Formula 1 / Formula 2 / cả hai] — giá trị cũ → giá trị mới
- Lỗi luật chơi đã sửa (nếu có): [mô tả]
```
