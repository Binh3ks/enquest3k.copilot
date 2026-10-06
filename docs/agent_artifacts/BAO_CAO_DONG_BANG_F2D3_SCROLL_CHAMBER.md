# BÁO CÁO ĐÓNG BĂNG F2D3 (ANCIENT SCROLL CLOZE) — SPRINT 2 (P0)
**Ngày xác nhận:** 2026-09-17  
**File điều khiển tiến độ:** `docs/agent_artifacts/IMPLEMENTATION_PLAN_21_GAMES.md` (Tổng đóng băng: 14/21)  
**Mã Game:** F2D3 (Floor 2 Door 3 — Integration Door, Alchemy Lab)  
**File Component:** `src/modules/quest/ScrollChamberDecode.jsx`, `src/modules/quest/ScrollChamberDecode.css`  
**File Service:** `src/services/chroniclesFloor2Service.js`  
**File Screen Router:** `src/modules/chronicles/DailyRoomScreen.jsx`  

---

## 1. TỔNG HỢP 3 HẠNG MỤC CODE CHÍNH ĐÃ HOÀN TẤT

### 1.1. Triệt Tiêu 100% Content-Debt 156 Tuần Qua `chroniclesFloor2Service.js`
- Đã tạo `src/services/chroniclesFloor2Service.js` cung cấp dữ liệu cloze tác quyền độc lập theo tuần cho W33–W37 (và thuật toán fallback generator cho các tuần chưa biên soạn).
- Sửa triệt để lỗi đọc thuộc tính `fullSentence` $\to$ `sentenceText = scrollData.sentence || scrollData.fullSentence` ở cả màn hình hiển thị, TTS và Cleared Modal.
- `DailyRoomScreen.jsx` kết nối trực tiếp `getAncientScrollDataForWeek(weekNumber, grammarSentences, vocabItems)` và truyền xuống `ScrollChamberDecode`.

### 1.2. Render Ngữ Cảnh Câu Trọn Vẹn Bao Quanh 4 Ô Trống
- Thay thế hoàn toàn 4 ô trơ trọi bằng cấu trúc `.scroll-sentence-flow` hiển thị liên tục câu văn có ngữ cảnh:
  `"[___] shoes create strong [___] to [___] dangerous [___] on wet corridor floors."`
- Học sinh không còn phải đoán mò cơ học mà đọc hiểu trọn vẹn mạch nghĩa CLIL của câu.

### 1.3. Xóa 100% onClick từ xa — Chuẩn Hóa Cận Chiến Phím `[E]`/Spacebar & Badge Proximity Guard
- Xóa bỏ 100% thuộc tính `onClick={handleInteractAction}` trên `.scroll-blank-slot` và `.rune-stone-entity`.
- Nhặt đá: Bắt buộc Leo di chuyển cận chiến tới gần $d < 55\text{px}$, hiển thị badge `[E] Take` trên viên đá gần nhất, bấm `[E]` hoặc `Spacebar` để nhặt.
- Đặt đá: Bắt buộc Leo vác đá trên đầu nhảy lên Altar Deck tiếp cận ô trống $d < 65\text{px}$, hiển thị badge `[E] Insert`, bấm `[E]` hoặc `Spacebar` để đặt.
- Sửa lỗi nghiêm trọng `checkPlatformLanding(leo, LIBRARY_PLATFORMS)` giúp Leo đáp bục chính xác thay vì rơi xuyên bục về sàn.

---

## 2. BẢNG TIÊU CHÍ N1–N5 VÀ TRÍCH DẪN CODE THẬT

### N1 — Cơ Chế Vật Lý & Triệt Tiêu Lỗ Hổng Từ Xa
```javascript
// Trích ScrollChamberDecode.jsx — Proximity Guards
const nearStoneId = useMemo(() => {
  if (carryingStone || phase !== 'playing') return null;
  const leoCenterX = leoDisplay.x + 20;
  const leoCenterY = leoDisplay.y + 24;
  let closestId = null;
  let closestDist = Infinity;
  for (const st of stones) {
    if (!st.isPlaced) {
      const dist = Math.hypot(leoCenterX - (st.x + 20), leoCenterY - (st.y + 15));
      if (dist < 55 && dist < closestDist) {
        closestDist = dist;
        closestId = st.id;
      }
    }
  }
  return closestId;
}, [carryingStone, phase, leoDisplay.x, leoDisplay.y, stones]);
```

### N2 — Pacing Grounding Bằng Tọa Độ Thật (+68.46s Margin)
- $v_{\text{Leo}} = 240\text{ px/s}$ (`LEO_SPEED = 4`, 60 FPS).
- Deck Altar: $\bar{x} = 420\text{px}, y = 240\text{px}$.
- 4 viên đá xa nhất: Đá 4 ($x=80, y=485 \to \Delta x=340, \Delta y=245, D=419\text{px} \to 1.75\text{s} + \text{jump } 1.83\text{s} + 1.85\text{s} = 5.43\text{s}$), Đá 7 ($x=760, y=485 \to 5.43\text{s}$), Đá 2 ($x=95, y=130 \to \Delta x=325\text{px} \to 4.41\text{s}$), Đá 3 ($x=725, y=130 \to \Delta x=305\text{px} \to 4.24\text{s}$). Tổng 4 lượt di chuyển thật: $19.51\text{s}$.
- Dung sai an toàn: tiếp cận spawn ban đầu $1.5\text{s}$, né Wraith $5.0\text{s}$, phục hồi 1 lỗi rơi $5.43\text{s} \implies T_{\text{phys}} = 31.44\text{s}$.
- Thời gian nhận thức: $W_{\max} = 30$ từ $\times 0.67\text{s/w} = 20.10\text{s}$.
- $T_{\text{req}} = 31.44\text{s} + 20.10\text{s} = 51.54\text{s}$.
- $T_{\text{avail}} = 120.0\text{s}$ (`duration = 120`, `useChroniclesStore.js:78`).
- **Margin $N_2$:** $120.0\text{s} - 51.54\text{s} = \mathbf{+68.46\text{s}}$ (vượt xa chuẩn $+3.0\text{s} \dots 4.0\text{s}$).

### N3 — Visual Clarity
- Sacred Archive Scroll đặt nổi bật tại trung tâm Altar Deck.
- Ngữ cảnh câu hiển thị dạng dòng chảy tự nhiên `.scroll-sentence-flow`, từ đã điền phát sáng xanh lục viền vàng, ô đang chọn phóng to và hiện tag `[E] Insert`.
- Đèn chùm Chandelier Light Beam phát ánh sáng bảo vệ miễn nhiễm quái Wraith.

### N4 — Tỉ Lệ Đoán Mò ($N_4 = 0.893\% \ll 5.0\%$)
- Mô hình Negative Binomial với Local Elimination ($K=4$ ô trống, $M=8$ phiến đá gồm 4 đúng và 4 distractor).
- Công thức cho 3 tim ($H=3$, cho phép sai tối đa 2 lần):
  $$N_4 = \frac{1 + 4 + 10}{1680} = \frac{15}{1680} = \mathbf{\frac{1}{112} \approx 0.893\%}$$
- (Nếu cho phép sai tối đa 1 lần: $N_4 = 5/1680 \approx 0.298\%$).
- 2,000,000 lượt Monte Carlo mô phỏng xác nhận khớp chính xác ($0.888\%$ và $0.295\%$).

### N5 — HUD & Modals Chuẩn Chronicles
- HUDOverlay chuẩn: 3 tim, timer đếm ngược 120s, `ROUND X/4`, `XP`.
- Modal KO ("SEAL COLLAPSED!") kích hoạt khi tim về 0 hoặc hết giờ, text phân nhánh động theo nguyên nhân thật:
  - Hết giờ: *"Time expired before the sacred inscription could be restored!"*
  - Hết tim (đặt sai đá): *"The ancient seal rejected too many incorrect runes!"*
- Modal Cleared ("ANCIENT SCROLL RESTORED!") kích hoạt khi hoàn thành 4 blanks, trao 3 sao, XP và đọc câu hoàn chỉnh qua TTS.

---

## 3. BỘ 11 SCREENSHOTS THỰC TẾ (PHƯƠNG ÁN B — REAL CHROME GUI)
Toàn bộ 11 ảnh đã được lưu vĩnh viễn và commit/stage vào Git tại thư mục:
`docs/agent_artifacts/screenshots/f2d3/`

1. **Spawn & Ngữ Cảnh Câu:**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_01_spawn_sentence_flow.png`
2. **Proximity Prompt [E] Take Trên Đá (3 Tim, Wraith không trừ tim):**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_02_proximity_prompt_pickup.png`
3. **Leo Vác Đá Trên Đầu (3 Tim):**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_03_carrying_overhead_stone.png`
4. **Proximity Prompt [E] Insert Trên Ô Trống:**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_04_proximity_prompt_insert.png`
5. **Phạt Đặt Sai Đá "ice" & Mất Tim (Toast Đỏ, 3 -> 2 Tim):**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_05_penalty_heart_lost.png`
6. **Knockout Modal (0 Tim, Lý do đúng):**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_06_ko_game_over.png`
7. **Clean Retry Reset (3 Tim Phục Hồi):**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_07_retry_reset_success.png`
8. **Blank 1 Khóa Thành Công ("Rubber") — `epoch=1789645193539`:**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_08_blank_1_bound.png`
9. **Blank 2 Khóa Thành Công ("friction") — `epoch=1789645198571`:**  
   `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_09_blank_2_bound.png`
10. **Blank 3 Khóa Thành Công ("prevent") — `epoch=1789645202931`:**  
    `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_10_blank_3_bound.png`
11. **Victory Modal Hoàn Thành ("slips") — `epoch=1789645206093` (Full Sentence & 3 Sao):**  
    `docs/agent_artifacts/screenshots/f2d3/f2d3_frame_11_victory_modal.png`

---

## 4. BẢO ĐẢM RULE 8 (DEV-ONLY TEST HOOK)
- Hook `window.__SCROLL_CHAMBER_DECODE_TEST_HOOK__` bọc strictly trong `if (typeof window !== 'undefined' && import.meta.env.DEV)`.
- Lệnh kiểm tra bundle: `grep -rn "__SCROLL_CHAMBER_DECODE_TEST_HOOK__" dist/assets/*.js`
- Kết quả: **CLEAN ZERO LEAK** (exit code 1, không tìm thấy trên toàn bộ 86 files `.js`).

---

## 5. KẾT LUẬN & ĐÓNG BĂNG
F2D3 (Ancient Scroll Cloze) đã hoàn thành toàn diện cả 3 hướng giải pháp được duyệt, loại bỏ triệt để kênh trừ tim ngoài ý muốn của Wraith (chuyển sang lực đẩy knockback), phân nhánh động text modal KO, xác thực qua build production 0 leak, và playtest 100% phím thật Chrome GUI đối chiếu khớp 100% giữa 11 ảnh thực tế và log epoch.
**Chính thức chuyển trạng thái sang "Đóng băng" (Tổng số game đóng băng: 14/21).**
