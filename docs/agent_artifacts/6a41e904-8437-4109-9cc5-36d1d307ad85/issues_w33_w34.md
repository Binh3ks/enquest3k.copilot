# Báo cáo Vấn đề W33 & W34 — Tư vấn kỹ thuật
*Thời điểm xuất: 2026-08-26 11:57 +07*
*Commit HEAD: `5c32195d` (main)*

---

## 🔴 VẤN ĐỀ 1 — CRITICAL: W34 Listening P4 — Ảnh card không khớp nội dung

### Mô tả chính xác
`listening_hub.js` W34 câu hỏi L4 sử dụng các file ảnh có **nội dung không khớp** với text options:

| File ảnh | Text option trong data | Nội dung ảnh |
|---|---|---|
| `/images/week34/card_b.jpg` | "Near the hunter camp" | Ảnh 300 DPI, 799K — không có generation log xác nhận prompt |
| `/images/week34/card_d.jpg` | "Around the water river" | Ảnh 300 DPI, 830K — không có generation log |
| `/images/week34/mossy_rocks.jpg` | "Across the mossy rocks" (example) | **PIL ImageDraw canvas thủ công**, chỉ 66K |

### Raw evidence
```
git log --diff-filter=A -- public/images/week34/card_b.jpg
→ d0f4f8be "feat(w34): reproduce pure Week 34 with SOP, 0 hardcoded fallbacks, authentic assets"

ls -lh public/images/week34/
→ card_b.jpg: 799K  card_d.jpg: 830K  mossy_rocks.jpg: 66K

# mossy_rocks.jpg được tạo bởi (scripts/prepare_w33_w34_cards.py lines 157-174):
img = Image.new("RGB", (w, h), color="#064e3b")
draw.ellipse([250, 450, 520, 680], fill="#475569")  # fake rock
draw.arc([150, 650, 874, 850], fill="#38bdf8")       # fake water
```

Không có W34_CARDS array trong `generate_w33_w34_flux_cards.py` — script chỉ có `W33_CARDS`.
Section W34 trong script chỉ convert JPG↔PNG, không generate mới.

### Mức độ ảnh hưởng
- Học sinh nhìn ảnh L4 example nhưng ảnh là PIL gradient 2D, không phải minh họa forest/mossy rocks
- card_b/card_d: không thể verify bằng code nội dung có khớp "hunter camp"/"water river" không

### Hành động cần thiết
Regenerate 3 ảnh bằng Together AI FLUX.1-schnell với prompts forest-themed:
- `mossy_rocks.jpg` → "peaceful mountain stream with large green mossy rocks, Pixar animation style"
- `card_b.jpg` → "hunters rope trap between tall forest trees, Pixar animation style"
- `card_d.jpg` → "flowing river with mossy banks in a magical forest, Pixar animation style"

---

## 🟡 VẤN ĐỀ 2 — HIGH: W34 S1 Hotspot d3/d4 — Khoảng cách 15.6% — Borderline mobile

### Raw evidence
```json
docs/week34_hotspot_calibration.json:
{
  "min_pairwise_distance": 15.6,
  "centroids": [
    {"x": 16, "y": 10},
    {"x": 79, "y": 50},
    {"x": 18, "y": 60},
    {"x": 28, "y": 72}
  ]
}
```

Pairwise distances:
```
d1<->d2: 74.63%  OK
d1<->d3: 50.04%  OK
d1<->d4: 63.15%  OK
d2<->d3: 61.81%  OK
d2<->d4: 55.54%  OK
d3<->d4: 15.62%  ⚠️ BORDERLINE
```

`FindDifferencesInteractive.jsx` hitbox = `w-12 h-12` = **48×48px fixed div**.

Tại container width 400px: 15.62% = 62px tâm-tâm > 48px → không chồng.
Tại container width < 307px: 15.62% × 307px = 48px → **hitboxes chạm nhau**.

Script threshold: `calibrate_find_differences.mjs` line 170: `if (d < 10.0)` warn only.
Calibration PASS vì 15.6% > 10.0%.

### Mức độ ảnh hưởng
Trên mobile nhỏ (<307px container), click d3 có thể kích hoạt d4.

### Hành động cần thiết
Option A: Raise threshold từ 10% → 20% trong `calibrate_find_differences.mjs`
Option B: Regenerate `w34_diff_scene_b.jpg` với 4 differences cách xa hơn, recalibrate

---

## 🟡 VẤN ĐỀ 3 — HIGH: INV-S3 Gate Permissive "or 5" — ĐÃ SỬA

### Mô tả
Gate 17 trước Round Z chấp nhận cả 4 VÀ 5 ảnh (nhánh OR sai):
```javascript
// CŨ (sai)
const invS3Pass = (s3Imgs.length === 4 && s3Intro.includes("pictures two, three, and four")) ||
                  (s3Imgs.length === 5 && s3Intro.includes("pictures two, three, four, and five"));
```

### Trạng thái: ✅ FIXED commit `5c32195d`
```javascript
// MỚI (đúng doctrine)
const invS3Pass = s3Imgs.length === 4 && s3Intro.includes("pictures two, three, and four");
```
W33 PASS, W34 PASS sau khi sửa.

---

## 🔵 VẤN ĐỀ 4 — MEDIUM: W34 Calibration Overwrite 3 Lần — Distance Giảm

### Raw evidence
```
git log --follow -p docs/week34_hotspot_calibration.json | grep calibratedAt|min_pairwise

commit 02dd8617 (tạo)  calibratedAt: 2026-08-25T05:44  min_pairwise: N/A (field missing)
commit c464a61b (Round V) calibratedAt: 2026-08-25T13:56  min_pairwise: 26.5%
commit c5f94399 (Round W) calibratedAt: 2026-08-26T03:31  min_pairwise: 15.6%
```

26.5% → 15.6%: scene ảnh diff bị thay đổi giữa Round V và Round W, khiến clusters pixel mới tệ hơn.

### Hành động cần thiết
Kiểm tra `w34_diff_scene_a.jpg`/`_b.jpg` hiện tại về việc 4 vùng differences có phân bố rõ ràng không.
Nếu Round V (26.5%) scene tốt hơn, revert về scene đó và recalibrate.

---

## 🔵 VẤN ĐỀ 5 — MEDIUM: listening_p4_full.mp3 Thiếu

### Raw evidence
```
listening_hub.js W34:
  listening_p4: { audio_url: "/audio/week34/listening_p4_full.mp3" }

ls public/audio/week34/:
  listening_p4_example.mp3  ✅  40K
  listening_p4_q1.mp3       ✅  61K
  listening_p4_q2.mp3       ✅  26K
  listening_p4_q3.mp3       ✅  24K
  listening_p4_q4.mp3       ✅  26K
  listening_p4_q5.mp3       ✅  28K
  listening_p4_full.mp3     ❌  MISSING
```

### Mức độ ảnh hưởng
Nếu `MultipleChoice3Pic.jsx` dùng `audio_url` top-level để play full audio trước khi break thành questions, Part 4 không phát được.

---

## 📋 Bảng Tóm Tắt

| # | Vấn đề | Mức độ | Tuần | Trạng thái |
|---|---|---|---|---|
| 1 | card_b/card_d/mossy_rocks content mismatch + PIL quality | 🔴 CRITICAL | W34 | OPEN |
| 2 | Hotspot d3/d4 = 15.6% — mobile hitbox collision risk | 🟡 HIGH | W34 | OPEN |
| 3 | INV-S3 gate nới lỏng "or 5" | 🟡 HIGH | W33+W34 | ✅ FIXED 5c32195d |
| 4 | Calibration overwrite 3 lần — quality giảm | 🔵 MEDIUM | W34 | OPEN |
| 5 | listening_p4_full.mp3 missing | 🔵 MEDIUM | W34 | OPEN |

**W33:** Gate 17 PASS 14/14. Không có vấn đề OPEN.

---

## Câu hỏi tư vấn

1. **Visual QA:** Cách nào automated-verify ảnh khớp text label? (vision model hay human QA?)
2. **Hotspot:** Nên raise threshold 10%→20% hay regenerate scene ảnh?
3. **Audio:** `listening_p4_full.mp3` có cần generate không, hay component dùng individual files?
4. **FLUX API:** Cần Together AI key để regenerate 3 ảnh card — ai cung cấp?
