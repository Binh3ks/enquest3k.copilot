# EngQuest3K — Architecture Separation Guide

> **Tài liệu bắt buộc đọc trước khi làm việc với bất kỳ tuần nào.**
> Cập nhật: 2026-08-17

---

## 🔴 QUY TẮC SỐ 1

```
W01–W32  ←→  W33–W72
   ↑               ↑
LEGACY         CAMBRIDGE SUITE
  (Cũ)            (Mới hoàn toàn)

HAI KIẾN TRÚC NÀY HOÀN TOÀN ĐỘC LẬP.
KHÔNG ÁP DỤNG RULE / VALIDATOR / SCHEMA CỦA BÊN NÀY CHO BÊN KIA.
```

---

## 📐 Bảng So Sánh Toàn Diện

| Tiêu Chí | W01–W32 (Legacy) | W33–W72 (Cambridge Suite) |
|---|---|---|
| **Tên giai đoạn** | Legacy / Station Phase | Cambridge 4-Hub Suite |
| **Số Hub / Station** | 14+ stations riêng lẻ | 4 Hubs tích hợp |
| **URL pattern** | `/week/NN/station/X` | `/week/NN/hub/1` → `/hub/4` |
| **Mode học** | Easy + Advanced + Full (3 modes) | **Full Mode duy nhất** |
| **Data folder** | `weeks/week_NN/` **VÀ** `weeks_easy/week_NN/` | `weeks/week_NN/` **(1 folder)** |
| **Index schema** | `weekData.stations: { read_explore, grammar, ... }` | `weekData: { readingHub, listeningHub, writingHub, speakingHub }` |

---

## 📁 Data File Mapping

### W01–W32 — Files tồn tại

| File | Mục đích | Còn trong W33+? |
|---|---|---|
| `read.js` | STEM/Social reading | ❌ → replaced bởi `reading_hub.js` |
| `explore.js` | World explore text | ❌ → tích hợp vào `reading_hub.js` |
| `vocab.js` | 20 vocab items | ✅ Vẫn dùng (imported vào `reading_hub.js`) |
| `word_match.js` | Word matching pairs | 🟡 Giữ nhưng không phải station riêng |
| `word_power.js` | 8 multi-word phrases | 🟡 Giữ |
| `grammar.js` | Grammar exercises | ❌ → tích hợp vào `listeningHub` / Arena |
| `daily_watch.js` | 5 YouTube videos | ❌ **KHÔNG CÒN trong W33+** |
| `logic_lab.js` | 3-tab logic puzzles | ❌ → tích hợp vào `ArenaHub` |
| `mindmap.js` | 6×6 speaking branches | ✅ Giữ (imported vào `speaking_hub.js`) |
| `ask_ai.js` | AI dialogue turns | ✅ Giữ (format mới: 5-turn array) |
| `writing.js` | Story writing data | ✅ Giữ (imported vào `writing_hub.js`) |
| `dictation.js` | Dictation sentences | ✅ Giữ (imported vào `listening_hub.js`) |
| `shadowing.js` | Shadowing sentences | ✅ Giữ (imported vào `listening_hub.js` + `speaking_hub.js`) |
| `week_NN_real.js` | AI Tutor story missions | ❌ **KHÔNG CÒN trong W33+** |
| `week_NN_easy_real.js` | AI Tutor Easy mode | ❌ **KHÔNG CÒN trong W33+** |

### W33–W72 — Files bắt buộc (4 Hub files)

| File | Mục đích | Hub |
|---|---|---|
| `reading_hub.js` | Story scenes, open cloze, check drills, RW P6 | Hub 1 |
| `listening_hub.js` | Listening P1–P5, dictation, shadowing | Hub 2 |
| `writing_hub.js` | Writing studio wrapper | Hub 3 |
| `speaking_hub.js` | Speaking P1–P4, shadowing sentences, podcast | Hub 4 |
| `index.js` | Exports `{ readingHub, listeningHub, writingHub, speakingHub, weekId, title }` | All |

---

## ⚙️ Audit & Validator Mapping

| Tool | Dùng cho | KHÔNG dùng cho |
|---|---|---|
| `node scripts/validate_week.mjs <NN>` | ✅ **W33+** (6 Gatekeepers) | ❌ W01-32 |
| `bash production_kit/tools/code_quality_gate.sh <NN>` | ✅ W01-32 (48 checks) | ❌ W33+ |
| `bash production_kit/tools/bug_prevention_check.sh <NN>` | ✅ W01-32 | ❌ W33+ |
| `npm run content:lint -- --week NN` | ✅ W01-32 | ❌ W33+ |
| `npm run audit:week <NN>` | ✅ W01-32 | ❌ W33+ |

### ✅ Chỉ dùng cái này cho W33+:
```bash
node scripts/validate_week.mjs 33   # 6 Gatekeepers — Pass/Fail rõ ràng
npm run build                        # Exit code 0 là đủ
```

---

## 🏗️ Component Routing

### W33–W72 — 4 Hub Components
```
/week/NN/hub/1  → WorldDiscoveryHub.jsx   (Reading + Vocab)
/week/NN/hub/2  → ArenaHub.jsx            (Listening + Games)
/week/NN/hub/3  → WritingStudioHub.jsx    (Writing + Dictation)
/week/NN/hub/4  → NovaTalkShowHub.jsx     (Speaking + Shadowing)
```

**Điều kiện phân nhánh trong App.jsx:**
```js
const isV2Hub = weekId >= 33;   // ← ngưỡng phân biệt
```

---

## 🚫 Forbidden Patterns cho W33+

KHÔNG được làm:
1. ❌ Tạo file `daily_watch.js` trong `weeks/week_NN/`
2. ❌ Tạo file `week_NN_real.js` hoặc `week_NN_easy_real.js`
3. ❌ Tạo folder `weeks_easy/week_NN/` cho W33+
4. ❌ Chạy `code_quality_gate.sh` hay `bug_prevention_check.sh` cho W33+
5. ❌ Chạy `npm run content:lint` cho W33+
6. ❌ Tạo mode Easy/Advanced riêng
7. ❌ Thêm `stations:` key vào `index.js` của W33+

---

## 🛡️ Cambridge Flyers Coverage (W33+)

```
15 Shields — Lộ trình 72 tuần:

Listening (5 Shields): ✅✅✅✅✅ = 5/5 (W33 đã đủ)
Reading & Writing (7 Shields): ✅✅🟡🟡❌🟡🟡 = 3 full / 3 partial / 1 missing
Speaking (3+1 parts = 3 Shields): ✅🟡✅✅ = 3 full / 1 partial

W33 hiện tại: 10/15 Shields
W52 target: 14/15 Shields (Phase B xong)
W72 target: 15/15 Shields (Phase C xong)
```

---

## 📅 Golden Standard Locks

| Tuần | Status | Ghi chú |
|---|---|---|
| **W33** | ✅ **GOLD — Locked 2026-08-17** | Commit `b7554e09`, 6/6 GK PASS, 10/15 Shields |
| W34–W37 | 🔄 Production queue | Dùng W33 schema làm template |
| W38–W52 | 📋 Phase B | Build ChoiceGrid, QuestionBuilder, 10-gap |
| W53–W72 | 📋 Phase C | R&W P5 UI, TalkShowStateMachine |

---

## 🔍 Quick Check — Tuần này là kiến trúc nào?

```bash
# Kiểm tra nhanh:
# weekNum < 33  → Legacy W01-32
# weekNum >= 33 → Cambridge Suite W33+
```
