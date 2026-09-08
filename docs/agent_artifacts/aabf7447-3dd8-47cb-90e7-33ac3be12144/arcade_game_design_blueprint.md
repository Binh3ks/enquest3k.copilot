# EngQuest3K Arcade — 12 Game Design Blueprint
**Version 3.0 — Post-Critique Refinement**
*Cập nhật 2026-08-21 sau phiên phản biện sư phạm sâu.*

---

## 6 Nguyên tắc Bất biến (Design Invariants) — ĐÃ CẬP NHẬT

1. **Khác nhau về cơ thể** — Mỗi game có motor skill *phân biệt rõ*: Tap ≠ Drag ≠ Swipe ≠ Type. Kiểm tra: nếu bỏ hình ảnh, trẻ vẫn nhận ra 2 game khác nhau qua cảm giác tay.
2. **Vật lý trực quan** — Đối tượng có trọng lực, quán tính, bật nảy. Học sinh *cảm nhận* phản hồi vật lý rõ ràng.
3. **Độ khó thuộc về ngôn ngữ, không về vận động** ← **NGUYÊN TẮC MỚI**: Cơ chế nào cần đo *kiến thức ngôn ngữ* (nghe, đọc hiểu, chính tả) KHÔNG ĐƯỢC bị ô nhiễm bởi yêu cầu vận động tinh (độ ổn định tay, canh timing mili-giây, góc hình học). Độ khó tăng bằng cách rút ngắn thời gian hoặc tăng số lượng lựa chọn — không phải bằng độ chính xác vật lý.
4. **Sai không làm lượt sau khó hơn** ← **NGUYÊN TẮC MỚI**: Penalty dừng lại ở mất điểm + hiệu ứng hình ảnh. Không compound difficulty lên trẻ đang gặp khó. Round reset về trạng thái chuẩn, không về trạng thái tệ hơn.
5. **Feedback đáp án đúng sau khi sai — BẮT BUỘC** ← **NGUYÊN TẮC MỚI**: Sau mỗi lần sai, bắt buộc hiển thị "Đáp án đúng: [X]" trong 1.5 giây (với màu xanh nổi bật) trước khi tiếp tục. Không có game nào chỉ có hiệu ứng nổ/khói mà không có feedback học tập.
6. **Accessibility: Màu + Shape, không bao giờ chỉ màu** ← **NGUYÊN TẮC MỚI**: Mọi phân loại trực quan PHẢI có ít nhất 2 kênh: màu sắc + biểu tượng/hình dạng. Không bao giờ phân biệt chỉ bằng màu đơn (8% trẻ nam mù màu đỏ-xanh).
7. **Content Agnostic Shell** — Engine tách hoàn toàn khỏi data. Từ vựng/cụm từ inject từ `weekData`. Không hard-code.
8. **True Fullscreen** — Khi chơi: `position: fixed; inset: 0; z-index: 9999`. Nút thoát: góc trên-trái, cỡ tối thiểu `44×44px` (mobile tap target standard), luôn hiển thị.

---

## 12 Game — Thiết kế V3 (Verdict + Spec)

---

### ✅ Game 1: 🫧 BUBBLE POP DASH (W01+) — GIỮ
**Motor Skill**: TAP chính xác vào đối tượng di chuyển
**Verdict**: Đúng skill, penalty (ink splat) chỉ ảnh hưởng tầm nhìn 1s không làm vòng sau khó hơn.

**Spec V3 (chỉ thêm feedback đáp án):**
- Tap nhầm → ink splat 1s + **hiển thị banner: "Target was: [từ đúng]" 1.5s** trước khi tiếp tục.
- Bóng target bay mất → −5pts + **flash banner: "Missed: [từ]" 1.5s** + spawn wave mới.
- Còn nguyên: 8-12 bóng bay, wall bounce, Golden Bubble combo x3.

---

### 🔧 Game 2: 🛸 METEOR SMASHER (W11+) — SỬA CƠ CHẾ LASER
**Motor Skill**: SWIPE về phía đúng meteor (proximity-based, không phải angle-based)
**Vấn đề sửa**: Bỏ yêu cầu góc swipe chính xác về mặt hình học. Trẻ hiểu đúng nghĩa nhưng canh góc sai vẫn thua = đo kỹ năng hình học, không đo ngôn ngữ.

**Spec V3:**
- Swipe bắt đầu từ bất kỳ đâu → laser tự động **khóa vào meteor gần nhất trong vùng 120° theo hướng swipe**. Học sinh không cần canh góc pixel-perfect, chỉ cần swipe đại loại về phía meteor đúng.
- Độ khó tăng bằng: tốc độ rơi nhanh hơn (phase 2: +20%, phase 3: +40%) + nhiều meteor hơn (5 → 7 → 9) — không phải bằng yêu cầu góc.
- Sai meteor → shield −1 + **highlight meteor đúng sáng lên 1.5s với label "✓ [từ đúng]"**.
- Meteor target thoát đáy → shield −1 + **banner "Escaped: [từ] — [định nghĩa]"**.
- 3 shields → game over. Giữ nguyên: curved trajectories, rotation, SVG laser glow.

---

### ✅ Game 3: 🚗 PHYSICS DRIFT RACE (W21+) — GIỮ
**Motor Skill**: SWIPE vertical (đổi làn) + SWIPE horizontal (decision)
**Verdict**: Cơ chế gắn chặt với CLIL topic, decision dưới countdown 3s là đo hiểu biết khái niệm thật (chọn loại lốp/vật liệu), không phải phản xạ đơn thuần vì phải đọc 2 lựa chọn có nội dung.

**Spec V3 (chỉ thêm feedback):**
- Sai decision → spin-out 1.8s + **overlay: "✗ [lý do sai] → Đúng là: [lựa chọn đúng]" 2s**.
- Giữ nguyên: auto-runner, obstacle data inject từ DRIFT_OBSTACLES[weekNumber].

*Lưu ý*: Swipe ở Game 3 khác Game 2 về mặt context: Game 2 là swipe attack (tấn công đối tượng cụ thể trên màn hình), Game 3 là swipe navigation (chọn hướng/làn). Trẻ sẽ phân biệt được vì context hoàn toàn khác nhau.

---

### 🔧 Game 4: 🧩 CHUNK CATAPULT (W31+) — SỬA PENALTY
**Motor Skill**: DRAG với fluid inertia → precision placement
**Vấn đề sửa**: Bỏ cơ chế compound penalty "chunk văng xa hơn sau khi thả sai".

**Spec V3:**
- Thả vào SLOT SAI → chunk **nảy lại về vị trí xuất phát ban đầu** (animation bounce-back 0.5s) + −3pts. **Tốc độ trôi không thay đổi**.
- Thả NGOÀI VÙNG → chunk trở về vị trí cũ, không văng đi đâu. Mất 0 điểm (chỉ tốn thời gian).
- Giữ nguyên: snap-on-correct với click sound, round timer 15s, decoy từ Round 3.
- Thêm: Thả sai slot → **banner "✗ [chunk] không thuộc [slot label] — Đặt vào [slot đúng]" 1.5s**.

---

### 🔧 Game 5: 🏹 SOUND SNIPER (W41+) — SỬA HOÀN TOÀN CƠ CHẾ AIM
**Motor Skill**: TAP vào mục tiêu đang di chuyển trong cửa sổ thời gian
**Vấn đề sửa**: Bỏ cơ chế "hold + crosshair rung theo độ ổn định tay". Crosshair rung = đo motor skill trẻ, không đo khả năng nghe phân biệt âm.

**Spec V3 — Redesigned:**
- 6 mục tiêu di chuyển trên màn theo đường khác nhau (không ngẫu nhiên hoàn toàn — mỗi mục tiêu có trajectory riêng, có thể dự đoán).
- TTS phát âm từ. Đồng thời, mục tiêu đúng **nhấp nháy nhẹ trong 0.4 giây** (chỉ 1 lần, phải nhìn đúng lúc). Sau đó tất cả mục tiêu tiếp tục di chuyển bình thường.
- Học sinh có **1.5 giây** sau hiệu ứng nhấp nháy để **tap vào mục tiêu mình nghĩ là đúng** — chỉ cần tap, không cần hold/aim.
- Đúng → mục tiêu nổ hoa văn màu sắc đẹp +15pts.
- Sai → highlight mục tiêu đúng 1.5s + "✗ Đáp án: [từ đúng]".
- Độ khó tăng: rút ngắn window 1.5s → 1.2s → 1s theo phase. Tốc độ di chuyển mục tiêu tăng. Không có yêu cầu hand-steadiness.

---

### 🔧 Game 6: 🏰 CASTLE TOWER DEFENSE (W51+) — SỬA ACCESSIBILITY
**Motor Skill**: TAP để đặt tháp, DRAG để di chuyển real-time
**Vấn đề sửa**: Phân loại chỉ dựa màu = bất lợi cho 8% trẻ mù màu đỏ-xanh.

**Spec V3:**
- Tháp loại A (tích cực): màu xanh lá + biểu tượng **☀ (sun/positive)** in đè lên.
- Tháp loại B (tiêu cực): màu đỏ + biểu tượng **✕ (negative)** in đè lên.
- Quân từ tích cực: mặc áo sáng + halo nhỏ. Quân từ tiêu cực: mặc áo tối + thorns nhỏ.
- Phân loại dựa vào: màu + shape + icon — 3 kênh đồng thời.
- Sai tower → quân vượt qua + **banner "✗ [từ] là [loại] — dùng tháp [☀/✕]" 1.5s**.

---

### ✅ Game 7: ⚡ LIGHTNING WORD CONNECT (W61+) — GIỮ
**Motor Skill**: HOLD và kéo không nhấc tay qua nhiều từ cùng nhóm
**Verdict**: Cơ chế độc đáo, không trùng với bất kỳ game nào. Chuỗi liên kết dài trực tiếp đo khả năng nhận ra semantic field.

**Spec V3 (thêm feedback):**
- Chạm nhầm từ sai nhóm → tia chớp bị cắt + từ sai highlight đỏ + **banner "✗ [từ] thuộc nhóm [nhóm khác]" 1.5s**.
- Hoàn thành nhóm → hiển thị tên nhóm semantic + tất cả từ đúng highlight 1s.

---

### ✅ Game 8: 🧪 POTION CHEMISTRY LAB (W71+) — GIỮ
**Motor Skill**: DRAG chính xác vào đúng ống nghiệm (Root/Prefix/Suffix)
**Verdict**: 3 ống nghiệm ánh xạ đúng cấu trúc hình thái học từ vựng. Cơ chế drag khác Chunk Catapult vì target là *loại thành phần* (Root/Prefix/Suffix), không phải *vị trí ngữ pháp* (Subject/VP/Complement).

**Spec V3 (thêm feedback):**
- Nhầm ống → ống nghiệm bốc khói 1s + **highlight ống đúng + banner "✗ [thành phần] là [Root/Prefix/Suffix]" 1.5s**.
- Không reset toàn bộ — chỉ trả nguyên liệu sai về bàn.

---

### ❌ Game 9: THAY HẲN → 🌉 BRIDGE BUILDER (W81+)
**Motor Skill**: DRAG tấm ván nối từ đảo này sang đảo kia (khác drag Chunk vì là kết nối 2 điểm, không phải đặt vào slot)
**Lý do thay**: Temple Runner là game swipe-dưới-áp-lực-thời-gian **thứ 3** (sau Meteor, Physics Drift). Cơ chế quẹt-chọn-cổng không liên hệ đến ý nghĩa connector.
**Ẩn dụ trực quan**: "Bắc cầu nối 2 đảo" = ẩn dụ cụ thể, trực quan cho "dùng connector để nối 2 mệnh đề" — trẻ vừa chơi vừa hiểu bản chất ngữ pháp.

**Spec V3 — Bridge Builder:**
- 2 hòn đảo nổi, mỗi đảo hiển thị 1 mệnh đề (clause) ngắn.
- 3-4 tấm ván lơ lửng, mỗi tấm ghi 1 linker (`because`, `although`, `so`, `but`, `when`...).
- Học sinh **DRAG tấm ván** kéo từ đảo trái sang đảo phải → nếu connector đúng quan hệ ngữ nghĩa: cầu lock vào, nhân vật tự chạy qua, hiệu ứng đẹp + +15pts.
- Connector sai → cầu gãy, nhân vật rơi xuống nước (animation hài hước, không đau, chỉ mất 3pts) + **banner "✗ [connector] = [loại quan hệ]. Câu này cần [connector đúng] vì [nguyên nhân]" 2s**.
- Timer: 20s mỗi câu. Không có time-out penalty compound (chỉ +0pts, hiển thị đáp án, chuyển câu mới).
- Độ khó tăng: thêm tấm ván decoy, rút ngắn mệnh đề (khó nhận quan hệ hơn).
- **Không có thao tác swipe thời gian** — thuần drag-and-place, giống Chunk nhưng ở cấp câu-với-câu.

---

### ❌ Game 10: THAY HẲN → ✨ STRESS BEACON (W91+)
**Motor Skill**: TAP đơn giản vào đúng hành tinh (âm tiết trọng âm)
**Lý do thay**: Yêu cầu "giữ tay đúng bằng độ dài âm tiết" = rhythm-game chuyên nghiệp đòi hỏi muscle memory không thể học trong 1 phút. Trẻ sẽ đoán mò timing, không liên hệ đến việc nghe trọng âm thật.
**Giữ nguyên**: Visual không gian hành tinh (trẻ vẫn thấy game khác biệt). **Thay hẳn**: input từ hold-duration → single tap.

**Spec V3 — Stress Beacon:**
- Từ được chia thành chuỗi hành tinh xếp ngang (mỗi hành tinh = 1 âm tiết).
- Hành tinh trọng âm: kích thước **to hơn 1.5x + sáng hơn** nhưng *không label* (trẻ phải tự nhận bằng tai).
- TTS đọc từ **1 lần duy nhất** với trọng âm rõ. Sau đó im lặng.
- Học sinh **TAP vào hành tinh mình nghe là trọng âm** — 1 cú tap, không cần giữ.
- Đúng → hành tinh nổ phóng to, tia sáng tỏa ra + +10pts.
- Sai → hành tinh đúng tự phát sáng rực + TTS đọc lại từ lần 2 nhấn mạnh hơn + **"✓ Trọng âm: [ÂM TIẾT ĐÚNG]" highlight đỏ trên chính hành tinh đó** 2s.
- Độ khó tăng: từ dài hơn (3→4→5 âm tiết), từ có trọng âm ít gặp hơn. Không tăng yêu cầu tay.

---

### 🔧 Game 11: 🐉 DRAGON SPELL DUEL (W101+) — SỬA SCORING
**Motor Skill**: TYPE chính xác (bàn phím ảo/thật)
**Vấn đề sửa**: Tốc độ gõ ảnh hưởng đến khả năng hạ Boss — bất công với trẻ gõ chậm trên bàn phím ảo dù đánh vần đúng.

**Spec V3:**
- Gõ đúng chính tả (dù chậm bao lâu) → **luôn** hạ Boss −1 HP. Đây là quyết định bất biến, không thương lượng.
- Tốc độ chỉ ảnh hưởng **hệ số điểm thưởng**: gõ đúng < 3s = +20pts (x2), 3-5s = +10pts (x1), > 5s = +5pts (x0.5).
- Boss không phản công nếu trẻ đang gõ (chỉ phản công nếu sai chính tả). Gõ sai → sửa lại được (backspace), không penalty lập tức — chỉ mất thời gian.
- Gõ sai và submit → Boss phản công −1 HP của trẻ + **"✗ Chính tả đúng: [từ] — Lỗi: [vị trí sai]" 2s**.
- Giữ nguyên: Boss HP bar, từ khó dần, typing muscle memory value.

---

### ✅ Game 12: 👑 GRAND MASTER ARENA (W111+) — GIỮ (tự cải thiện khi game con được sửa)
**Motor Skill**: 4 loại mechanics xoay vòng theo phase
**Verdict**: Boss tổng hợp 4 phase. Sau khi Games 1, 2, 4, 5 được sửa, Grand Arena tự động sử dụng cơ chế đã chuẩn.

**Spec V3:**
- Phase 1 (30s): Bubble Pop mini-wave (V3).
- Phase 2 (30s): Meteor Smasher proximity-laser mini-wave (V3).
- Phase 3 (30s): Chunk Catapult speed round, no compound penalty (V3).
- Phase 4 (30s): Stress Beacon final challenge (thay thế Galaxy Orbit đã bị loại).
- Pass condition: ≥60% accuracy mỗi phase. Fail → phase repeat (không game over).

---

## Tổng bảng Verdict V3

| # | Game | Verdict | Motor Skill | Thay đổi chính |
|---|---|---|---|---|
| 1 | 🫧 Bubble Pop Dash | ✅ Giữ | TAP moving target | + Feedback đáp án sau sai |
| 2 | 🛸 Meteor Smasher | 🔧 Sửa | SWIPE proximity (bỏ angle) | Bỏ angle-precision, dùng 120° cone lock |
| 3 | 🚗 Physics Drift Race | ✅ Giữ | SWIPE nav + decision | + Feedback đáp án sau sai |
| 4 | 🧩 Chunk Catapult | 🔧 Sửa nhẹ | DRAG fluid physics | Bỏ compound penalty, chunk bounce về chỗ cũ |
| 5 | 🏹 Sound Sniper | 🔧 Sửa hoàn toàn | TAP trong time window | Bỏ hold/crosshair, thay bằng flash 0.4s + 1.5s window |
| 6 | 🏰 Castle Tower Defense | 🔧 Sửa nhẹ | TAP + DRAG towers | Thêm icon ☀/✕ kèm màu (3 kênh accessibility) |
| 7 | ⚡ Lightning Connect | ✅ Giữ | HOLD + DRAG chain | + Feedback nhóm đúng sau hoàn thành |
| 8 | 🧪 Potion Lab | ✅ Giữ | DRAG → ống nghiệm | + Feedback không reset toàn bộ khi sai |
| 9 | 🌉 Bridge Builder | ❌→ Thay mới | DRAG ván bắc cầu | Thay Temple Runner; ẩn dụ bắc cầu = nối mệnh đề |
| 10 | ✨ Stress Beacon | ❌→ Thay mới | TAP âm tiết trọng âm | Thay Galaxy Orbit; bỏ timing mili-giây |
| 11 | 🐉 Dragon Spell Duel | 🔧 Sửa | TYPE chính xác | Spelling = luôn hạ HP; speed = điểm bonus only |
| 12 | 👑 Grand Master Arena | ✅ Giữ | 4 mechanics xoay | Tự cải thiện khi game con sửa xong |

---

## Nguyên tắc Feedback bắt buộc cho tất cả 12 game

Mọi game phải implement **"Answer Reveal" protocol**:
```
Khi sai:
1. Hiệu ứng sai (0.3s): nhấp nháy đỏ, âm thanh
2. Reveal đáp án đúng (1.5s): banner xanh nổi bật với label rõ ràng
   Format: "✓ Đúng là: [ĐÁP ÁN]" hoặc "[KHÁI NIỆM] = [GIẢI THÍCH]"
3. Continue: tự động tiếp tục sau 1.5s (không cần tap)

Khi đúng:
1. Celebration (0.5s): hiệu ứng đẹp
2. Reinforce (0.8s): brief label xác nhận "[ĐÁP ÁN] ✓"
3. Next immediately
```

---

## Nút thoát Fullscreen — Spec chuẩn

```css
/* Nút Back — bắt buộc cho tất cả games */
.arcade-back-btn {
  position: fixed;
  top: 12px;
  left: 12px;
  min-width: 44px;
  min-height: 44px;
  z-index: 99999;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(0,0,0,0.6);
  border: 1.5px solid rgba(255,255,255,0.2);
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
/* Icon ← cỡ 20px, text "Back" — đủ dễ bấm cho ngón tay nhỏ */
```

---

## Effort thực tế — So sánh V2 vs V3

| Task | V2 gốc | V3 sau sửa |
|---|---|---|
| Game 2 Meteor | Angle-based laser (phức tạp) | Cone-based proximity lock (đơn giản hơn) |
| Game 4 Chunk | Compound velocity penalty | Simple bounce-back (đơn giản hơn) |
| Game 5 Sound Sniper | Hold + rung physics | Flash + 1-tap window (rất đơn giản) |
| Game 9 Temple Runner | Engine mới (swipe racing) | Bridge Builder: tái dùng drag engine từ Chunk ~60% |
| Game 10 Galaxy Orbit | Duration-based timing (phức tạp) | Stress Beacon: single tap (rất đơn giản hơn) |
| Thêm Answer Reveal | Không có | Thêm vào tất cả 12 game |
| **Tổng** | **Như cũ** | **Tổng effort ≤ V2 (Bridge/Beacon đơn giản hơn, bù cho Answer Reveal)** |

---

## Điều anh cần quyết định trước khi triển khai

> **[OWNER DECISION REQUIRED]** Timeline: 12 game V3 vs. W34-W72 content production — hai luồng này chạy song song hay tuần tự? Nếu song song, game development sẽ không block content. Nếu tuần tự, cần xác định game nào implement trước tuần content nào ra mắt.
