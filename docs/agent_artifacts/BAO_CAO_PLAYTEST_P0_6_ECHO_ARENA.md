# BÁO CÁO PLAYTEST & KIỂM ĐỊNH P0-6: ECHO ARENA SHOOTER (FLOOR 3 DOOR 1) — V2

**Ngày kiểm định**: 2026-09-14  
**Game**: Echo Arena Shooter (`src/modules/quest/EchoArenaShooter.jsx`, `EchoArenaShooter.css`)  
**Ticket**: P0-6 ($N_1$ Exploit Click trực tiếp vào Drone) + P1-1 ($N_4$ và Va chạm Gremlin/Jammer)  
**Trạng thái**: ⏳ ĐÃ TRIỂN KHAI — CHỜ OWNER DUYỆT (Đã xử lý 2 phản biện: Jammer Clearance & Bolt Flight)

---

## 1. GIẢI TRÌNH 2 YÊU CẦU PHẢN BIỆN CỦA OWNER

### 1.1. Vấn đề 1: Jammer Che Lấp Orb & Tách Biệt Độ Cao (Altitude Separation)
- **Nguyên nhân baseline**: Code cũ đặt Jammer bay ở $y = 130$px, trùng đúng cao độ với hàng orb thứ 2 ($y = 120..125$px), khiến Jammer bay ngang cắt qua thân orb và badge `JAMMER` che khuất nhãn chữ.
- **Giải pháp dứt điểm bằng code**:
  - Tách tầng cao độ vật lý (Altitude Layering): Đặt `gremlin.y = 235`px (hạ thấp $105$px so với orb).
  - Khoảng cách an toàn (Vertical Clearance): Orbs nằm ở $y \in [80, 125]$px theo công thức `y: 80 + (i % 2) * 45` (`EchoArenaShooter.jsx:193`), đáy orb thấp nhất tại $125 + 69 = 194$px (`height: 68px` + border 2px trong `EchoArenaShooter.css:153`). Đỉnh của Jammer tại $y = 235$px (`EchoArenaShooter.jsx:143, 417`).
  - Khoảng trống không gian: $\Delta y = 235 - 194 = \mathbf{41}\text{px} \ge 40$px (luôn luôn có ít nhất 41px khoảng trống trên đầu Jammer).
  - **Kết luận**: Jammer **KHÔNG BAO GIỜ** chạm hoặc che khuất bất kỳ chữ cái nào của bất kỳ orb nào trong suốt round.
- **Tái tính toán $N_2$ (Pacing)**:
  - Worst-case đọc 4 từ $\le 6$ ký tự $= 2.0$s.
  - Phân biệt phoneme: $+1.5$s.
  - Thời gian đạn bay ($350$px tại $14$px/frame): $+0.42$s.
  - Thời gian chờ Jammer bay qua khỏi hành lang bắn ($80$px / $132$px/s $\approx 0.61$s $\times 3$): $+1.8$s.
  - Tổng thời gian cần thiết: $T_{\text{req}} = 2.0 + 1.5 + 0.42 + 1.8 = \mathbf{5.72}$s.
  - Thời gian cấp: $90\text{s} / 4 = \mathbf{22.5}$s/round.
  - Biên an toàn: $\Delta T = 22.5 - 5.72 = \mathbf{+16.78}$s $\gg +2.0$s ✅ **HOÀN TOÀN DƯƠNG & AN TOÀN**.

### 1.2. Vấn đề 2: Bằng chứng Cơ chế Bắn Đạn Thật (Ray Aiming Proof)
- **Bằng chứng Frame 2 (`p0_6_echo_bolt_flight.png`)**: Bắt trọn viên đạn plasma màu vàng phát sáng (`.resonance-bolt-entity` kèm icon `<Zap size={16} />`, box-shadow $20$px vàng) đang bay lơ lửng giữa không trung tại tọa độ $(x=461, y=418)$ theo hướng từ súng của Leo bắn ngược lên trên về phía distractor.
- **DOM Evidence**: Ghi nhận trực tiếp từ DOM khi đạn đang bay, tọa độ Leo ở đáy, vector vận tốc $14$px/frame.

---

## 2. BẢNG THÔNG SỐ TOÁN HỌC & CƠ CHẾ CHUẨN HÓA (N1, N2, N4)

| Chỉ số | Tiêu chuẩn | Hiện trạng Baseline | Sau khi chuẩn hóa (P0-6 & P1-1 v2) | Đánh giá |
| :--- | :--- | :--- | :--- | :--- |
| **$N_1$ (Game Mechanics)** | Bắt buộc cơ chế ray aiming/vật lý, cấm click trực tiếp ăn điểm | Click chuột trực tiếp vào drone (`handleOrbDirectPop`) bỏ qua toàn bộ định hướng | Gỡ bỏ `handleOrbDirectPop`, xóa `onClick` trên orb, set `pointer-events: none` trên `.acoustic-orb-entity`. Bắt buộc ngắm bắn tia từ Leo (`originX`, `originY`, tốc độ $14$px/frame). Đạn bay giữa không trung có visual plasma bolt | ✅ **GAME THẬT** |
| **$N_2$ (Pacing / Reading Time)** | Biên an toàn $\Delta T \ge +2.0$s trên worst-case content | Không tính pacing, drone bay tự do đè chữ | 4 từ $\le 6$ ký tự $= 2.0$s đọc + $1.5$s phoneme + $0.42$s đạn bay + $1.8$s né Jammer = $5.72$s. Cấp $22.5$s/round. $\Delta T = 22.5 - 5.72 = \mathbf{+16.78}$s | ✅ **AN TOÀN** |
| **$N_4$ (Guessing Probability)** | $N_4 \le 5\%$ (Negative Binomial) | 4 orbs nhưng có 2 đúng ($p = 0.5$) $\to N_4 \gg 10\%$ | $R = 4$ rounds, 4 orbs/round (1 đúng, 3 sai, $p = 0.25$), 3 tim persistent ($L \le 2$): $\sum_{k=0}^2 \binom{3+k}{k}(0.25)^4(0.75)^k = \frac{9.625}{256} = \mathbf{3.76\%} \le 5\%$ | ✅ **ĐẠT CHUẨN** |
| **Orb-to-Orb Spacing** | Khoảng cách tối thiểu giữa orbs $\ge 120$px | Không kiểm tra khoảng cách | Spacing $= \text{width} / (4 + 1) = 800 / 5 = \mathbf{160}$px $> 120$px | ✅ **ĐẠT CHUẨN** |
| **Jammer Clearance** | Jammer không che lấp chữ của orb ($\ge 40$px) | Jammer bay $y=130$ ngang hàng orb | Jammer bay tầng $y=235$, orb đáy $\le 194$px $\implies$ clearance $\ge \mathbf{41}$px hoàn toàn sạch chữ | ✅ **KHÔNG CHE CHỮ** |
| **Transform Isolation** | Sprite icon lật hướng, label text upright | Lật hướng có nguy cơ lật chữ JAMMER | Tách riêng: chỉ áp `scaleX(-1)` lên `.gremlin-icon` (`🦇`), giữ `.gremlin-tag` (`JAMMER`) không transform (`none`) | ✅ **KHÔNG LẬT CHỮ** |

---

## 3. BẰNG CHỨNG THỰC TẾ TRÊN CHROME THẬT (PUPPETEER RUNTIME EVIDENCE)

### Frame 1: Spawn (4 Orbs, 3 Hearts, Round 1/4, Jammer ở tầng y=235 cách đáy Orb 41px)
![p0_6_echo_spawn](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_6_echo_spawn.png)

```json
{
  "fullHearts": 3,
  "emptyHearts": 0,
  "roundPill": "ROUND 1/4",
  "roundTag": "1/4",
  "floorBadge": "FLOOR 3 DOOR 1 — ECHO ARENA SHOOTER",
  "sound": "/sh/",
  "orbCount": 4,
  "orbs": [
    { "label": "chair", "isCorrect": false },
    { "label": "shoe", "isCorrect": true },
    { "label": "think", "isCorrect": false },
    { "label": "chin", "isCorrect": false }
  ],
  "gremlinPresent": true,
  "gremlinTag": "JAMMER",
  "jammerAltitudeClearance": {
    "lowestOrbBottom": 194,
    "gremlinTop": 235,
    "verticalClearancePx": 41,
    "isNeverOccluded": true
  }
}
```

---

### Frame 2: Bolt in Mid-Air Flight (Bằng chứng bắn đạn thật: viên đạn plasma vàng đang bay từ Leo lên distractor)
![p0_6_echo_bolt_flight](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_6_echo_bolt_flight.png)

```json
{
  "boltActive": true,
  "boltScreenPos": {
    "x": 461,
    "y": 418,
    "w": 26,
    "h": 26
  },
  "boltViewportRel": {
    "x": 461,
    "y": 418
  }
}
```

---

### Frame 3: Wrong Answer (Sau khi đạn chạm distractor "chin", mất 1 tim, toast đỏ dưới banner không đè chữ)
![p0_6_echo_wrong](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_6_echo_wrong.png)

```json
{
  "fullHearts": 2,
  "emptyHearts": 1,
  "feedbackToast": "❌ \"chin\" does NOT match!",
  "feedbackClass": "echo-feedback-toast feedback-wrong"
}
```

---

### Frame 4: Knockout (KO) Modal (Hết 3 tim sau 3 lần bắn trượt distractor, hiện SOUND OVERLOAD)
![p0_6_echo_ko](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_6_echo_ko.png)

```json
{
  "koModalVisible": true,
  "emptyHearts": 3,
  "modalTitle": "SOUND OVERLOAD!",
  "retryBtnText": "Try Again"
}
```

---

### Frame 5: Retry Reset (Bấm "Try Again", khôi phục 3 tim, tái tạo ĐẦY ĐỦ 4 orbs, round 1/4)
![p0_6_echo_retry](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_6_echo_retry.png)

```json
{
  "fullHearts": 3,
  "emptyHearts": 0,
  "roundPill": "ROUND 1/4",
  "roundTag": "1/4",
  "activeOrbsCount": 4,
  "activeOrbs": [
    "chin",
    "chair",
    "think",
    "shoe"
  ]
}
```

---

### Frame 6: Hazard Jammer dir < 0 & Transform Isolation Proof (Icon dơi lật scaleX(-1), nhãn JAMMER thẳng đứng, clearance 41px)
![p0_6_jammer_dir_left](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_6_jammer_dir_left.png)

```json
{
  "spriteTransform": "none",
  "iconInlineTransform": "scaleX(-1)",
  "iconComputedTransform": "matrix(-1, 0, 0, 1, 0, 0)",
  "tagComputedTransform": "none",
  "tagText": "JAMMER",
  "lowestOrbBottom": 194,
  "jammerTop": 235,
  "verticalClearancePx": 41
}
```

---

## 4. KẾT QUẢ AUTOMATED VALIDATOR (`scripts/test_p0_6_echo_arena.mjs`)

```
=== P0-6 ECHO ARENA SHOOTER AUTOMATED VALIDATION ===

✅ [CHECK-1] Default phonics rounds count R = 4: PASS (found 4 rounds: sh, ch, th, wh)
✅ [CHECK-2] Orbs per round = 4 (1 correct, 3 distractors, p = 0.25): PASS (R1:1T/3F, R2:1T/3F, R3:1T/3F, R4:1T/3F)
✅ [CHECK-3] Mathematical N4 guessing probability <= 5%: PASS (N4 = 3.76% (k=0: 0.391%, k=1: 1.172%, k=2: 2.197%))
✅ [CHECK-4] N1 exploit removal (no handleOrbDirectPop, no orb onClick): PASS (hasDirectPop: false, hasOrbOnClick: false)
✅ [CHECK-5] CSS .acoustic-orb-entity has pointer-events: none: PASS (taps fall through to arena viewport)
✅ [CHECK-6] Physical ray aiming from Leo (originX, originY, fireBoltTowards): PASS (projectile originates at Leo coordinates)
✅ [CHECK-7] Gremlin transform isolation (icon scaleX(-1), JAMMER label un-mirrored): PASS (parent has no scaleX, only gremlin-icon flips)
✅ [CHECK-8] Orb anti-spawn overlap (spacing >= 120px): PASS (spacing at 800px = 160px > 120px)
✅ [CHECK-9] N2 pacing worst-case reading time safety margin >= +2.0s: PASS (T_req = 5.72s <= 22.5s, margin = +16.78s)
✅ [CHECK-10] Jammer altitude separation (>= 40px below all orbs, no text occlusion): PASS (y_jammer = 235, max_orb_bottom = 194px, clearance = 41px)

=== SUMMARY ===
Total checks: 10, Passed: 10, Failed: 0
🎉 ALL 10 P0-6 CHECKS PASSED PERFECTLY!
```
