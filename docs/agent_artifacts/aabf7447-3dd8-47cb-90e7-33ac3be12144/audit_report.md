# Audit Report — Engquest3k Codebase
**Date**: 2026-08-20 | **Goal**: Xác định cost thật để "dọn" W01-32 khỏi codebase W33+

---

## 1. Kết quả Audit — Số liệu thật

### Data size
| Vùng | Số file | Disk size |
|:---|:---|:---|
| W01–W32 data (`src/data/weeks/week_01..32`) | **653 files** | ~5.5 MB |
| W33–W37 data (`src/data/weeks/week_33..37`) | **123 files** | ~588 KB |
| W33 baseline (1 tuần chuẩn) | **27 files** | ~184 KB |
| `src/legacy_archive/` | Đã tồn tại | Chứa old AI Tutor, App copy, backup |
| `src/` total | — | **31 MB** |
| `public/` total | — | **189 MB** (audio, images) |

> **Ước lượng thật**: 40 tuần × 27 files = **~1,080 files** cần tạo cho W34–W72
> (Không phải 2,300 file như đã suy diễn trước đó)

---

## 2. Dependency Map — Cái gì đang giữ W01-32 lại trong codebase?

### A. `src/config/gameAdaptation.js` ⚠️ CRITICAL
- **300 dòng**, **105 imports** trực tiếp từ `week_01` → `week_32` (games.js + real.js)
- Được dùng bởi: `FreeTalkTab.jsx`, `GameHub`, `gamePromptBuilder.js`, `tutorPrompts.js`
- **Đây là file gắn chặt nhất với W01-32.** Xóa W01-32 data mà không xử lý file này → crash.

### B. `src/config/stationConfig.js` ⚠️ MEDIUM
- Import `MindMapSpeaking` (V1 component cũ) → đăng ký vào `MODULE_COMPONENTS`
- `App.jsx` dùng `MODULE_COMPONENTS[tabKey]` để render station
- W33+ đang dùng Hub architecture mới (`/hub/station-1..4`), **không dùng** `stationConfig` theo cách cũ nữa — nhưng code vẫn còn đó

### C. `src/data/weeks/index.js` ✅ SAFE — LAZY LOADING
- Dùng `import.meta.glob` → **lazy load theo yêu cầu**
- W01-32 files **không bị bundle vào initial chunk** khi navigate đến W33+
- Xóa W01-32 folder → chỉ cần đảm bảo không có route nào navigate đến week < 33

### D. `src/App.jsx` ✅ LARGELY CLEAN
- Chỉ import **1 file W33**: `week33Data from './data/weeks/week_33/index.js'`
- Routing dùng dynamic param `/:weekId` → không hardcode W01-32
- Có logic redirect: `weekId >= 33` → Hub architecture

### E. `src/components/teacher/TeacherPanel.jsx` ✅ INDEPENDENT
- Import: `teacherAPI`, `useUserStore`, `WarmUpQuizGenerator`, `PeriodicQuizGenerator`
- **Không import bất kỳ week data nào trực tiếp**
- Lesson plans được fetch từ API (`teacherAPI`), không từ local data files
- **Giữ lại hoàn toàn an toàn mà không cần thay đổi gì**

### F. Progress Storage Keys — AN TOÀN KHI XÓA W01-32
- Keys pattern: `station_progress_${weekNumber}_writing`, `checkpoint_w${w}`, `engquest_streak`
- Keys **theo weekNumber** → độc lập với component/schema
- Xóa W01-32 data: progress keys W01-32 trong localStorage sẽ còn nhưng vô hại (orphaned keys)

---

## 3. Kết luận Audit — 3 câu hỏi đã có đáp án thật

| Câu hỏi | Đáp án thực tế |
|:---|:---|
| **Rủi ro mất dữ liệu khi xóa W01-32?** | ❌ Không. Key storage theo weekId, độc lập UI. Orphaned keys vô hại. |
| **Effort thật để xóa W01-32 khỏi codebase?** | **1 ngày**: xóa 653 data files + rewrite `gameAdaptation.js` (file nặng nhất) + cleanup `stationConfig.js` |
| **Teacher Panel có bị ảnh hưởng?** | ✅ Không. Fetch từ API, không phụ thuộc local week data. |

---

## 4. Danh sách việc cần làm để "dọn sạch" (theo thứ tự ưu tiên)

### 🔴 PHẢI LÀM (blocking)
1. **`gameAdaptation.js`** — Xóa toàn bộ 32 import W01-32, giữ lại phần logic W33+ hoặc viết lại slim version cho W33+
2. **Xóa `src/data/weeks/week_01..32`** (653 files, ~5.5MB)
3. **Xóa `src/data/weeks/_OLD_BACKUP_*`** (rác)

### 🟡 NÊN LÀM (non-blocking nhưng clean)
4. **`stationConfig.js`** — Remove `MindMapSpeaking` import nếu W33+ không dùng route cũ nữa
5. **`src/legacy_archive/`** — Xóa toàn bộ (App copy, DailyWatch copy, ai_tutor_old...)
6. **`src/data/weeks/week_99`** — Kiểm tra xem là gì, xóa nếu là test data

### ✅ GIỮ NGUYÊN
7. **`TeacherPanel.jsx`** + toàn bộ `src/components/teacher/` — không đụng
8. **`src/data/weeks/week_33..37`** — giữ nguyên
9. **`src/modules/zones/`** — giữ nguyên (W33+ architecture)
10. **`src/utils/progressBackup.js`**, `userStorage.js` — giữ nguyên

---

## 5. Ước lượng effort thực tế

| Task | Thời gian |
|:---|:---|
| Git tag archive + xóa 653 files W01-32 | 10 phút |
| Rewrite `gameAdaptation.js` cho W33+ only | 2–3 giờ |
| Cleanup `stationConfig.js` | 30 phút |
| Xóa `legacy_archive/` | 5 phút |
| `npm run build` verify | 15 phút |
| **Tổng** | **~4–5 giờ** (1 ngày làm việc) |

---

## 6. Ba câu hỏi bổ sung — Đáp án thật

### A. Lesson plans W01-52 lưu ở đâu? (Ẩn số thật)

**Phát hiện**: Lesson plans KHÔNG lưu trong `src/data/weeks/`. Chúng nằm ở:
- `public/data/lessonPlans.json` — **14.9 MB**, độc lập hoàn toàn với week data
- `public/data/lessonPlans_index.json` — index nhẹ
- `public/data/lessons/W1.json` → `W156.json` — **156 file JSON riêng biệt**, đủ từ W1 đến W156

TeacherPanel fetch qua URL `/data/lessonPlans_index.json` → static file serve từ `public/`.

**Kết luận**: Xóa `src/data/weeks/week_01..32` **KHÔNG ảnh hưởng gì đến lesson plans**.
Lesson plans là static JSON trong `public/`, sống độc lập 100%. TeacherPanel an toàn tuyệt đối.

> ⚠️ **Điểm mới phát sinh**: W33-W52 lesson plans (`public/data/lessons/W33.json` → `W52.json`) đã
> tồn tại sẵn rồi (156 file đến W156). Không cần tạo mới. Teacher panel cho W33-52 đã sẵn sàng.

### B. Tốc độ sản xuất content thật (từ git log)

| Mốc | Ngày | Ghi chú |
|:---|:---|:---|
| W33 content đầu tiên | **2026-05-17** | `feat: Add Week 33 content` |
| W34-37 được tạo | **2026-08-11 → 08-13** | 4 tuần trong ~3 ngày (bulk pipeline) |
| W33 V2 architecture rebuild | **2026-08-17 → 08-20** | Toàn bộ Hub system, Info Exchange, UX overhaul |

**Nhận xét thật**: W34-37 (4 tuần) được tạo trong **2-3 ngày** bằng bulk pipeline — tốc độ
**~1.5 tuần content/ngày** khi pipeline thuần thục. Đây không phải W33 V2 từ đầu (tốn 3 tháng
vì còn xây architecture), mà là data production thuần túy.

**Kết luận tốc độ**: Với pipeline đã ổn định từ W33, 40 tuần × 3 ngày = **~120 ngày sản xuất**
(~4 tháng thuần content), trong 6 tháng thực tế — **khả thi**, nhưng cần pipeline không bị gián đoạn.
Như vậy 1 ngày dọn dẹp infrastructure KHÔNG phải bottleneck quyết định. Claude đúng.

### C. Học sinh active ở W01-32 hiện tại?

**Đáp án từ user**: *"Thực ra hiện tại ko có người dùng thực sự nào trên app này cả, ngoài trừ 1
vài giáo viên đang vào để sử dụng lesson plans soạn sẵn trong teacher panel."*

**Kết luận**: Không có học sinh active. Xóa routes `/week/1..32` ngay lập tức an toàn 100%.

---

## 7. Revised Effort Estimate (đã bao gồm tất cả)

| Task | Thời gian |
|:---|:---|
| Git tag archive | 5 phút |
| Xóa 653 files W01-32 data | 10 phút |
| Rewrite `gameAdaptation.js` slim cho W33+ | 2–3 giờ |
| Cleanup `stationConfig.js` | 30 phút |
| Xóa `legacy_archive/` | 5 phút |
| `npm run build` verify + fix | 30–60 phút |
| Redeploy Cloudflare Pages | 15 phút |
| **Tổng thực tế** | **4–5 giờ (đã bao gồm deploy)** |

---

## 8. Quyết định về "new repo" — Bác bỏ

`TeacherPanel` đã xác nhận là **hoàn toàn độc lập với W01-32 data**.
Tạo repo mới không cần thiết. Chỉ cần clean repo hiện tại.
