---
name: listening-p1-pins
description: |
  Pipeline chuẩn để tạo và hiệu chỉnh tọa độ pin cho Cambridge Listening Part 1 "Draw the Lines"
  trong listening_hub.js. Dùng khi tạo tuần mới (W33+) hoặc khi pin bị lệch so với nhân vật thực tế.
  Bao gồm: schema mẫu, quy trình calibration tự động, và hướng dẫn dùng Visual Calibrator Tool.
---

# Cambridge Listening Part 1 — Pin Calibration Pipeline

## Khi nào dùng skill này

- Tạo `listening_hub.js` cho tuần mới (W33+)
- User báo cáo pin lệch vị trí so với nhân vật trong ảnh
- Sau khi thay ảnh scene mới (`wNN_listening_p1_scene.jpg`)

---

## 1. Cấu Trúc File `listening_hub.js`

### Vị trí file
```
src/data/weeks/week_NN/listening_hub.js
```

### Schema chuẩn `listening_p1`

```js
listening_p1: {
  image_url: '/images/weekNN/wNN_listening_p1_scene.jpg',
  audio_url: '/audio/weekNN/listening_p1_full.mp3',
  passage_audio_script: "...",    // Full dialogue script
  names: [
    { id: 'n1', text: 'NAME_1', target_id: 't1', isExample: true }, // Luôn là ví dụ mẫu
    { id: 'n2', text: 'NAME_2', target_id: 't2' },
    { id: 'n3', text: 'NAME_3', target_id: 't3' },
    { id: 'n4', text: 'NAME_4', target_id: 't4' },
    { id: 'n5', text: 'NAME_5', target_id: 't5' },
    { id: 'n6', text: 'DISTRACTOR', target_id: null } // Nhân vật KHÔNG có mặt trong ảnh
  ],
  targets: [
    // ⚠️ x, y là % của KÍCH THƯỚC ẢNH (không phải viewport)
    // Điểm (0,0) = góc trên trái | (100,100) = góc dưới phải
    { id: 't1', label: 'Mô tả nhân vật 1', x: ??, y: ??, isExample: true },
    { id: 't2', label: 'Mô tả nhân vật 2', x: ??, y: ?? },
    { id: 't3', label: 'Mô tả nhân vật 3', x: ??, y: ?? },
    { id: 't4', label: 'Mô tả nhân vật 4', x: ??, y: ?? },
    { id: 't5', label: 'Mô tả nhân vật 5', x: ??, y: ?? }
  ]
}
```

**Quy tắc bất biến:**
- `names[0]` phải có `isExample: true` và `target_id: 't1'`
- Luôn có đúng **1 distractor** (`target_id: null`) — nhân vật vắng mặt trong ảnh
- `targets` gồm đúng **5 phần tử** ứng với 5 nhân vật hiện diện trong ảnh
- `t1.isExample = true` phải tương ứng với nhân vật EXAMPLE

---

## 2. Hệ Tọa Độ Pin (Critical)

```
Image coordinate system:
  (0,0) ─────────────────── (100,0)
    │    TOP LEFT             │
    │     x% →               │
    │     ↓ y%               │
  (0,100) ──────────────── (100,100)
              BOTTOM RIGHT
```

**Nguyên tắc đặt pin:**
- Pin render tại `style={{ left: x%, top: y% }}` bên trong image div
- Nên trỏ vào **vùng ngực/vai** nhân vật (không phải đỉnh đầu)
- Ước lượng ban đầu theo vị trí ngang:

| Vị trí trong ảnh     | x ước lượng |
|----------------------|-------------|
| Cực trái (sát rìa)   | 15–22%      |
| Trái-giữa            | 28–38%      |
| Giữa                 | 45–58%      |
| Phải-giữa            | 60–68%      |
| Cực phải             | 74–85%      |

---

## 3. Quy Trình Tạo Cho Tuần Mới

### Bước 1: Tạo ảnh scene (nếu chưa có)

```
Prompt chuẩn (Golden Cover Standard):
"Cute 3D render of [5 characters doing specific actions in the scene],
Pixar animation style, vibrant colors, soft studio lighting, clean background.
No text or letters in the image."

Lưu tại: /public/images/weekNN/wNN_listening_p1_scene.jpg
Aspect ratio bắt buộc: 1264×848 (ratio ≈ 1.49:1)
```

### Bước 2: Tạo `listening_hub.js` với tọa độ ước lượng

Dựa vào mô tả nhân vật trong audio script, ước lượng x,y ban đầu.

### Bước 3: Build + Deploy + Dùng Visual Calibrator Tool

```bash
npm run build && git add -A && git commit -m "feat(wNN): add listening_p1 initial pin estimates" && git push
```

Sau khi deploy lên `app.bkbacademy.vn`:

1. Vào `Week N → Hub 2 → Draw the Lines`
2. Click nút **🎯 Calibrate Pins** (góc trên phải header)
3. Ảnh hiện chế độ **crosshair** + **live HUD tọa độ** (`x:XX% y:YY%`) theo con trỏ
4. Click chọn target cần chỉnh (vd: `t1 Jake`) trong danh sách calibrator
5. Di chuột đến vùng ngực/vai nhân vật → đọc HUD → **Click** để set pin
6. Lặp lại cho tất cả 5 targets
7. Click **📋 Copy JSON Targets** → copy toàn bộ JSON tọa độ

### Bước 4: Paste tọa độ chính xác vào code

Thay `targets: [...]` trong `listening_hub.js` bằng JSON từ Calibrator.

### Bước 5: Build + Push final

```bash
npm run build && git add -A && git commit -m "fix(wNN): calibrate listening_p1 pin coordinates [multi-agent-review]" && git push
```

---

## 4. Checklist Trước Khi Ship

```
[ ] names[0] có isExample: true
[ ] targets[0] có isExample: true và id = 't1'
[ ] Có đúng 1 distractor (target_id: null) trong names[]
[ ] Tất cả 5 targets có x,y trong khoảng 5–95 (không sát rìa)
[ ] Ảnh scene đúng tỷ lệ 1264×848
[ ] Visual Calibrator đã verify vị trí thực tế trên browser
[ ] npm run build exit code 0
```

---

## 5. Anti-Bug Memory (Lessons từ W33)

| Bug                              | Root Cause                              | Fix                                      |
|----------------------------------|-----------------------------------------|------------------------------------------|
| Pin lơ lửng giữa không khí       | Tọa độ ước lượng sai, bỏ qua Calibrator | LUÔN dùng Calibrator Tool sau deploy     |
| EXAMPLE badge bay sai chỗ        | Badge = midpoint giữa name pill và pin  | Fix pin đúng vị trí → badge tự căn chỉnh|
| Pin không update sau resize       | Thiếu ResizeObserver + onLoad handler   | Đã fix trong SVGLineMatcher.jsx (W33+)   |
| Easy mode load sai data W33+      | isEasy chưa force=false cho W33+        | Đã fix trong loadWeekData() index.js     |
| Pins đồng loạt lệch 1 chiều       | Perspective ảnh 3D làm shift nhân vật   | Dịch nhóm pins ±3% theo chiều lệch      |

---

## 6. Architecture Tham Khảo

```
SVGLineMatcher.jsx
├── masterContainerRef        → bao toàn bộ (name ribbon + image)
├── imageRef                  → div aspect-[1264/848] chứa ảnh scene
├── ResizeObserver            → recalculate positions khi container resize
├── onLoad={recalculate}      → positions sẵn sàng sau khi ảnh load
├── Calibrator Tool           → click target → click ảnh → set x,y
│   └── Live HUD (hover)      → hiển thị x%,y% realtime trên image
└── SVG overlay (z-20)        → vẽ dashed lines từ name pills đến pins
```

**Note quan trọng:** `x, y` trong `targets[]` là **% của image** (`imageRef`),
KHÔNG phải % của `masterContainerRef`. `recalculatePositions()` tự chuyển đổi
từ image-space sang master-container-space để SVG lines render đúng.
