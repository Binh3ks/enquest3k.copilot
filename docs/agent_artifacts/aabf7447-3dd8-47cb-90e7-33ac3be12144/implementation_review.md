# IMPLEMENTATION REVIEW — GAP ANALYSIS
### Đối chiếu: Kế hoạch vs Thực tế đã build

**Thời điểm review:** 2026-08-19 | **Reviewer:** Antigravity Agent (self-audit)

> [!CAUTION]
> Báo cáo này liệt kê **trung thực** những gì thực sự đã build vào codebase (verified bằng grep) vs những gì chỉ được mô tả trong báo cáo nhưng chưa tồn tại trong code.

---

## ✅ ĐÃ THỰC THI & TỒN TẠI TRONG CODEBASE

| Epic/Section | Artifact tồn tại | Lưu ý |
|---|---|---|
| **EPIC-0** — SRS Engine | `src/services/srsService.js` | ✅ File có — nhưng **không file nào import** (orphaned) |
| **EPIC-0** — Companion State Engine | `src/services/companionEngine.js` | ✅ File có — nhưng **không file nào import** (orphaned) |
| **EPIC-1** — Explorer Passport | `src/components/cambridge/ExplorerPassport.jsx` | ✅ Component có — nhưng **chưa mount ở Zone 1** |
| **EPIC-2** — Class Co-op Progress Meter | `BattleArenaZone.jsx` | ✅ UI có — hardcoded 82%, không real data |
| **EPIC-2** — Sub-tab 5 màu sắc | `BattleArenaZone.jsx` | ✅ Hoạt động tốt |
| **EPIC-3** — AI Debate age-gate Mode A/B | `AIDebateMode.jsx` | ✅ Logic đúng, starters Mode A đã fix |
| **EPIC-3** — Science Report 3-Step Logic Board | `ScienceReportCreator.jsx` | ✅ Có 3-step board + 3 nhóm pill màu |
| **EPIC-3** — Podcast Sound Board UI + Radio Host Starters | `RetellRecorder.jsx` | ✅ UI có — Sound Board là placeholder (không có audio thật) |
| **EPIC-4** — Dual Mastery Bars + Comeback Shield | `BossBattleZone.jsx` | ✅ UI có — hardcoded 85%/90%, không real data |
| **EPIC-3** — Story Writer 3 ảnh thật | `StoryWriting.jsx` + `writing_panel_1/2/3.png` | ✅ Đã khôi phục |
| **EPIC-7** — Validate W33 | `validate_week.mjs 33` → 7/7 Gatekeepers | ✅ |

---

## 🔴 CHƯA BUILD — QUAN TRỌNG, ĐÃ CÓ TRONG PLAN

### EPIC-0 (Core Engines — nền tảng dùng chung)
- 🔴 **Schema tuần học chuẩn hóa** (`spine_targets`, `spotlight_subjects`, `echo_subjects`, `gear_config`) — không tồn tại
- 🔴 **XP tách riêng** Spine (→ Cambridge Shield) vs Satellite (→ Passport Stamps) — chưa tách
- 🔴 `srsService.js` + `companionEngine.js` **không được import ở bất kỳ đâu** → code chết, không có tác dụng

### EPIC-1 (Zone 1 — Story World)
- 🔴 **Gear 1 — Sticker Album** (mỗi hotspot → 1 sticker) — không có
- 🔴 **Gear 1 — Golden Hotspot ẩn** (XP gấp đôi) — không có
- 🔴 **Gear 1 — Con trỏ kính lúp thám tử** khi hover gần hotspot — không có
- 🔴 **Gear 2 — Duet Mode** (2 waveform Nova vs học sinh) — không có
- 🔴 **Gear 2 — Voice filter** (robot/echo sau khi shadowing đủ số lần) — không có
- 🔴 **Gear 3 — Nhật ký của Nova** (trang minh họa tích lũy theo tuần) — không có
- 🔴 **Gear 4 — Explorer Passport** chưa được mount trong Zone 1
- 🔴 **Gear 4 — Cây Tri Thức (Knowledge Tree)** tích lũy 72 tuần — không có

### EPIC-2 (Zone 2 — Battle Arena)
- 🟡 **Word Blitz — lửa combo + thanh multiplier** — chưa xác minh trong `FlashArena.jsx`
- 🔴 **Sentence Smash — hiệu ứng "phá vỡ bức tường gạch"** khi hoàn thành câu — không có
- 🔴 **Math Quest — rương kho báu bật mở** khi kéo đúng Bar Model — không có
- 🔴 **Science Lab — "bong bóng sủi" + Eureka!** — không có
- 🟡 **Class Co-op Meter** — hardcoded, không real-time

### EPIC-3 (Zone 3 — Creator Studio)
- 🔴 **Story Writer → Podcast data contract** (`final_text` làm kịch bản podcast mặc định, mục 9.3) — không implement
- 🔴 **Story Writer — Auto-illustration nhẹ** (ảnh khớp từ khoá sau khi viết) — không có
- 🔴 **Story Writer — Story Library** (giá sách ảo) — không có
- 🔴 **Podcast — ON AIR UI** (đèn ON AIR, radio dial animation) — không có
- 🔴 **Podcast — Class Radio** (chia sẻ trong lớp + giáo viên duyệt) — không có
- 🔴 **Podcast — Ghép Episode** (microservice nối 3 scene thành 1 file) — không có
- 🔴 **Podcast — Sound Board SFX audio thật** (3 clip < 2s) — UI có nút nhưng không có audio
- 🔴 **Science Report — Criteria Checker real-time** (Cause/Result/Safety fields) — không có
- 🔴 **Science Report — Con dấu "Lab Notebook" real-time** — không có
- 🔴 **AI Debate — Argument Meter** (Claim/Reason/Evidence fill theo pill dùng) — không có
- 🔴 **AI Debate — Nova emotion states** (neutral → thinking → nodding) — không có
- 🔴 **AI Debate — Huy hiệu "Người Lắng Nghe Giỏi"** — không có
- 🔴 **AI Debate Mode B — pill nhóm 🔵** (`however`, `on the other hand`) — chưa tách nhóm
- 🔴 **Retell to Nova — Fading Scaffold** theo số lần thử (Lần 1: 3 starters; Lần 2: 2 starters) — không có
- 🔴 **Retell to Nova — nút "I need a hint"** (starter thứ 4 ẩn) — không có
- 🔴 **Retell to Nova — ASR real-time feedback** (animation Nova khi nhận từ đúng lúc đang nói) — không có
- 🔴 **Retell to Nova — đồng hồ sonar/radar** — không có
- 🔴 **Retell to Nova — Nhật ký Nova** tích lũy theo tuần — không có

### EPIC-4 (Zone 4 — Boss Battle)
- 🔴 **Boss theo chủ đề tuần** (hình dạng thay đổi theo Spotlight subject) — hardcoded
- 🔴 **Mini-Boss giữa tuần** (5 phút, nhẹ nhàng) — không có
- 🔴 **Dual Mastery Bars gắn real data** — hardcoded

### EPIC-5 (Companion & Avatar Shop)
- 🔴 **Nova xuất hiện xuyên suốt 4 Zone** với evolution nhất quán — `companionEngine.js` không được import

### EPIC-6 (Parent/Teacher Dashboard)
- 🔴 **Heatmap kỹ năng** (Nghe/Nói/Đọc/Viết + từng môn CLIL) — cần xác minh
- 🔴 **Danh sách bài nói có cờ "cần giáo viên duyệt"** — không có workflow
- 🔴 **Teacher Panel moderation cho Class Radio** — không có Class Radio

### Section 8 (Universal Systems — dùng chung cho cả 5 hoạt động)
- 🔴 **Shared `CriteriaCheckerField` component** — không tồn tại
- 🔴 **Fading Scaffold System** đọc `activity_mastery_score` từ SRS Engine — không có
- 🔴 **Pill nhóm 🟣 tím ⭐ Bonus** (từ thưởng +5 XP/từ) — không có ở bất kỳ hoạt động nào
- 🟡 **Pill 4 nhóm màu nhất quán** — mới áp dụng một phần, chưa đồng bộ tất cả

---

## 📊 TỔNG KẾT

| Hạng mục | Trong plan | Đã build thực sự |
|---|---|---|
| Engine/Service files | 2 | 2 — nhưng **0 file nào import** = orphaned |
| Zone 1 gamification features | 8 | 0 hoạt động thực sự |
| Zone 2 gamification features | 6 | 2 (UI only, partial) |
| Zone 3 features (5 hoạt động) | ~20 | ~5 (partial) |
| Universal shared systems (Sec 8) | 4 | 0 |
| EPIC-6 Dashboard features | 6 | ~1 (shell only) |

---

## 🎯 ƯU TIÊN TIẾP THEO

### 🔴 CRITICAL — Phải làm (tính năng cốt lõi bị thiếu hoặc dead code)
1. **Mount `ExplorerPassport.jsx` vào Zone 1 Gear 4** — component có nhưng chưa dùng
2. **Data contract Story Writer → Podcast Creator** (mục 9.3) — tính năng quan trọng, bị thiếu hoàn toàn
3. **Science Report Criteria Checker real-time** — không có feedback gì khi viết ngoài submit
4. **AI Debate — Argument Meter** (Claim/Reason/Evidence)

### 🟡 HIGH — Nên làm trong session tiếp theo
5. **Fading Scaffold System** cho Retell to Nova (Lần 1 / Lần 2 / Challenge Mode)
6. **Class Co-op Meter gắn real XP từ store** thay vì hardcoded 82%
7. **Connect `srsService.js`** vào Word Bank/Vocab để engine hoạt động thực sự
8. **Shared `CriteriaCheckerField` component** tái sử dụng

### 🟢 LOW — Backlog (nice-to-have)
- Nhật ký Nova, Knowledge Tree, Story Library, Sticker Album
- Duet Mode, Voice Filter, Sound Board audio thật
- Boss theo chủ đề tuần, Mini-Boss giữa tuần
- Class Radio + Teacher Panel moderation
- ON AIR UI Podcast, Ghép Episode microservice
