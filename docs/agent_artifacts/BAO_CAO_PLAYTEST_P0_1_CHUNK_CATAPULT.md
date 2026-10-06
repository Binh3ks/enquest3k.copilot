# BÁO CÁO TRIỂN KHAI & PLAYTEST THẬT — TICKET P0-1: CHUNK CATAPULT CANVAS

**Ngày thực hiện:** 2026-09-14  
**Component:** `src/modules/chronicles/games/ChunkCatapultCanvas.jsx`  
**Môi trường kiểm thử:** Google Chrome GUI thật (`1280x800`), Node.js v20, Vite Dev Server (`http://localhost:5173`)  
**Tiêu chuẩn chất lượng:** Tuân thủ 100% Anti-Hallucination Gate & Multi-Agent Review Protocol  

---

## 1. TỔNG QUAN THAY ĐỔI & MỤC TIÊU SƯ PHẠM (P0-1)

| Tiêu chí | Trước khi sửa (Baseline) | Sau khi sửa (P0-1 Redesign) |
|---|---|---|
| **Cơ chế Tim ($H$)** | Không có tim (bắn vô hạn lần đến khi trúng) $\implies N_4 \approx 100\%$ | **3 tim persistent ($H=3$, $L=2$)** dùng chung toàn bộ session |
| **Phạt khi bắn sai/trượt** | Bắn trượt/rơi đất/sai rổ chỉ hiện "Try Again", không có hậu quả | **Trừ 1 tim ngay lập tức** kèm popup cảnh báo `-1 ❤️ (X left)` |
| **Hết tim (KO Phase)** | Không bao giờ thua cuộc | **Game Over KO Modal** xuất hiện khi tim = 0, chặn bắn tiếp, cung cấp nút **Try Again** (reset 3 tim) và **Exit** |
| **Số rounds tối thiểu ($R$)** | Không giới hạn dưới (demo chỉ có 3 pairs $\implies N_4 > 10\%$) | **Bảo vệ trần $R \ge 5$ rounds** (tự động pad nếu input $<5$ câu) |
| **Xác suất đoán mò ($N_4$)** | $\approx 100\%$ (vô hạn lần thử) | **$N_4 = \frac{11}{243} \approx \mathbf{4.53\%} \le 5\%$** ✅ **ĐẠT CHUẨN** |
| **Giao diện HUD** | Chỉ có Score, Pair, Timer | Thêm cụm hiển thị **3 tim đỏ/xám** (`data-testid="chunk-catapult-hearts"`) |

---

## 2. CHỨNG MINH TOÁN HỌC $N_4$ (NEGATIVE BINOMIAL)

- Cấu hình: $R = 5$ rounds, $p = 1/3$ (1 rổ đúng, 2 rổ distractors), $q = 2/3$, 3 tim persistent (cho phép tối đa $L = 2$ lần bắn sai/trượt).
- Công thức:
  $$P(\text{pass}) = \sum_{k=0}^{L} \binom{R - 1 + k}{k} p^R q^k$$
  - $k = 0$: $\binom{4}{0} (1/3)^5 (2/3)^0 = \frac{1}{243} \approx 0.41\%$
  - $k = 1$: $\binom{5}{1} (1/3)^5 (2/3)^1 = 5 \times \frac{2}{729} = \frac{10}{729} \approx 1.37\%$
  - $k = 2$: $\binom{6}{2} (1/3)^5 (2/3)^2 = 15 \times \frac{4}{2187} = \frac{60}{2187} \approx 2.74\%$
  - $\implies N_4 = \frac{9 + 30 + 60}{2187} = \frac{99}{2187} = \frac{11}{243} \approx \mathbf{4.53\%} \le 5\%$ ✅ **ĐẠT CHUẨN**.

---

## 3. KẾT QUẢ VALIDATOR TỰ ĐỘNG (`scripts/test_chunk_catapult_p0.mjs`)

```
🔍 [Chunk Catapult P0 Validator] Starting automated checks...

✅ [PASS] 1. Hearts initialized to 3 in React state & ref
✅ [PASS] 2. Heart deduction on wrong basket hit with popup feedback
✅ [PASS] 3. Heart deduction on ground/off-screen miss
✅ [PASS] 4. KO Game Over phase triggered at 0 hearts
✅ [PASS] 5. Minimum 5 rounds enforced in component & DailyRoomScreen (R >= 5)
✅ [PASS] 6. HUD displays hearts with data-testid="chunk-catapult-hearts"
✅ [PASS] 7. KO Modal with data-testid="chunk-catapult-ko-modal" & Try Again handler
✅ [PASS] 8. Mathematical N4 verification (R=5, p=1/3, L=2: N4 = 4.53% <= 5%)

========================================
Validator Result: 8/8 PASSED
🎉 ALL P0-1 VALIDATION CHECKS PASSED!
```

---

## 4. BẰNG CHỨNG PLAYTEST TRÊN CHROME GUI THẬT (PUPPETEER EVIDENCE)

### Frame 1 — Spawn (Khởi tạo nguyên bản)
- **DOM Evidence:**
  - `heartsCount: 3 / 3` (`opacity: 1` cả 3 tim)
  - `hudText`: `❤️ | ❤️ | ❤️ | Score: 0 | Pair: 1/5 | ⏱️ 59s`
  - `promptText`: `CHUNK CATAPULT — PULL SLINGSHOT & AIM AT THE MATCHING COMPLETION: “Jake was walking ... ?”`
- **Ảnh chụp thực tế:**  
  ![Spawn Frame](/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53/p0_catapult_spawn.png)

---

### Frame 2 — Wrong / Miss (Bắn trượt & Trừ tim)
- **Hành động:** Kéo ná bắn chệch hướng xuống đất / bay ra ngoài.
- **DOM Evidence:**
  - Quả cầu tiếp đất, popup nổi lên: `Off Target! -1 ❤️ (2 left)`.
  - HUD hearts: 2 tim đỏ sáng + 1 tim xám mờ (`opacity: 0.25`).
  - `hudText`: `❤️ | ❤️ | 🖤 | Score: 0 | Pair: 1/5 | ⏱️ 59s`.
- **Ảnh chụp thực tế:**  
  ![Wrong Frame](/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53/p0_catapult_wrong.png)

---

### Frame 3 — KO Phase (Game Over khi hết tim)
- **Hành động:** Thực hiện tiếp 2 lần bắn trượt $\implies$ số tim giảm về 0.
- **DOM Evidence:**
  - `heartsCount: 0 / 3`.
  - `hasKoModal: true`.
  - `koModalText`: `💔 | Catapult Out of Energy! | You ran out of energy hearts. Keep practicing the grammar chunks to aim accurately! | Completed Pairs: 0 / 5 | Language Score: 0 pts | Try Again | Exit`.
- **Ảnh chụp thực tế:**  
  ![KO Modal Frame](/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53/p0_catapult_ko.png)

---

### Frame 4 — Retry / Reset (Bấm nút Try Again)
- **Hành động:** Click vào nút `Try Again` (`data-testid="btn-try-again"`).
- **DOM Evidence:**
  - `heartsCount: 3 / 3` (reset hoàn toàn về 3 tim đỏ).
  - `hasKoModal: false`.
  - `hudText`: `❤️ | ❤️ | ❤️ | Score: 0 | Pair: 1/5 | ⏱️ 60s`.
  - Slingshot và 3 rổ completion được tái lập mới.
- **Ảnh chụp thực tế:**  
  ![Retry Frame](/Users/binhnguyen/.gemini/antigravity-ide/brain/b12565b0-9d8d-4d21-8063-54a8e2575b53/p0_catapult_retry.png)

---

## 5. MULTI-AGENT REVIEW CHECKLIST (BẮT BUỘC)

- [x] **1. Variable Declaration**: Tất cả state (`hearts`, `setHearts`), callbacks (`handleGameOverKO`, `handleRestart`), và helper functions đều được khai báo trước khi sử dụng. Không có TDZ / ReferenceError.
- [x] **2. Cheat-proofing**: Không còn khả năng bắn vô hạn lần; mỗi cú bắn trượt hoặc sai rổ đều trừ đúng 1 tim; hết 3 tim lập tức dừng game và kích hoạt KO Modal.
- [x] **3. Progress Data Integrity**: `onComplete` chỉ kích hoạt khi chiến thắng; khi KO chỉ phát sự kiện `game_over` với `reason: 'out_of_hearts'`, không ghi nhận điểm gian lận hay cấp sao.
- [x] **4. Mode Separation**: Cơ chế tuân thủ tuyệt đối Negative Binomial $N_4 = 4.53\% \le 5\%$.
- [x] **5. Build Verification**: `npm run build` thành công 100% với exit code 0 (`built in 18.38s`).
- [x] **6. Audit Gate**: Validator tự động `test_chunk_catapult_p0.mjs` pass 8/8 checks.

---

## 6. KẾT LUẬN
Ticket **P0-1: Chunk Catapult Canvas** đã hoàn thành xuất sắc 100% yêu cầu kỹ thuật, toán học và kiểm thử thực tế trên Chrome GUI thật. Sẵn sàng tiếp tục sang Ticket **P0-2: Riddle Run Maze** & **P0-3: Titan Grammar Forge**.
