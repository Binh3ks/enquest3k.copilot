# Content Service Pre-Design Audit — H.1 / H.2 / H.3
**Ngày:** 2026-09-09
**Mục đích:** Báo cáo audit trước khi code Bước 2 (Content Service). Không code khi chưa có báo cáo này.
**Trạng thái H.1 + H.2:** Đủ điều kiện tiến hành Bước 2.
**Trạng thái H.3:** Báo cáo hoàn chỉnh — cần đọc trước khi ai đó nhắc lại SRS đầy đủ.

---

## H.1 — Xác nhận kiến trúc Week-level Bucket (không Quest-level)

### CHÍNH THỨC XÁC NHẬN — 4 điểm bất biến:

1. **3 Rương map theo skill bucket cấp tuần:**
   - Chest 0 (Rương 1) = **Vocab bucket** — từ vựng tuần hiện tại + review
   - Chest 1 (Rương 2) = **Grammar bucket** — ngữ pháp tuần hiện tại + review
   - Chest 2 (Rương 3) = **Integration bucket** — tổng hợp cả hai + context phrases

2. **Gating giữ nguyên:** `getDoorStatus()` trong `DailyRoomScreen.jsx` dòng 154–158 KHÔNG sửa. Học sinh chọn tự do.

3. **QUEST_SKILL_ROUTING_MAP — HỦY BỎ HOÀN TOÀN.** Bảng 15 dòng đề xuất ở Mục 6 không được triển khai.

4. **Content Service nhận input:** `(weekId, skillBucket, options)` — không nhận `questId`.

---

## H.2 — Thiết kế SRS Nhẹ + Simulation W33–W37

### Hàm `getWeeklyPoolWithReview` — Đặc tả

```
getWeeklyPoolWithReview(currentWeekId, skillBucket, options = {})
@param currentWeekId: number (e.g. 36)
@param skillBucket: 'vocab' | 'grammar' | 'integration'
@param options: { targetSize?: number, sessionSeen?: Set<string> }
@returns { items: Array, meta: { currentItems, reviewItems, graceDegraded } }
```

### Công thức phân bổ:

| Nguồn         | Tỉ lệ | Điều kiện          |
|---------------|-------|--------------------|
| Current (W_n) | 60%   | Luôn ưu tiên       |
| W_{n-1}       | 20%   | Nếu tồn tại data   |
| W_{n-2}       | 12%   | Nếu tồn tại data   |
| W_{n-3}       | 8%    | Nếu tồn tại data   |

**Graceful degrade:** Nếu W_{n-k} thiếu data → phần % đó cộng vào Current week.

**targetSize theo bucket:**
- Vocab: 18 items (~144s = 2.4 phút)
- Grammar: 8 sentences (~96s = 1.6 phút)
- Integration: 14 items (10 vocab + 4 grammar)

---

### Simulation W36 = current, review W33–W35

#### Dữ liệu thực tế đo từ codebase:

| Tuần | Vocab items | Grammar items | Nguồn vocab          | Nguồn grammar                          |
|------|-------------|---------------|----------------------|----------------------------------------|
| W33  | 36 (10+26)  | 5             | vocab.js + flash_arena | skill_practice_hub.grammar_drills    |
| W34  | 20          | 5             | vocab.js             | skill_practice_hub.grammar_drills      |
| W35  | 20          | 5             | vocab.js             | skill_practice_hub.grammar_drills      |
| W36  | 20          | 0 (MISSING)   | vocab.js             | skill_practice_hub.js KHÔNG TỒN TẠI   |

#### Bucket VOCAB (targetSize = 18):

| Nguồn         | Tỉ lệ | Lý thuyết | Thực có | Lấy  |
|---------------|-------|-----------|---------|------|
| W36 (current) | 60%   | 11        | 20      | 11   |
| W35 (n-1)     | 20%   | 4         | 20      | 4    |
| W34 (n-2)     | 12%   | 2         | 20      | 2    |
| W33 (n-3)     | 8%    | 1         | 36      | 1    |
| **TỔNG**      |       | **18**    |         | **18 ✅** |

#### Bucket GRAMMAR (targetSize = 8) — Graceful degrade W36:

| Nguồn         | Tỉ lệ (degrade)   | Lý thuyết | Thực có | Lấy      |
|---------------|-------------------|-----------|---------|----------|
| W36 (current) | 60% → 0% (thiếu)  | 0         | 0       | 0        |
| W35 (n-1)     | 20% + 40% bonus = 60% | 4.8  | 5       | 5        |
| W34 (n-2)     | 12%               | 1         | 5       | 1        |
| W33 (n-3)     | 8%                | 1         | 5       | 1        |
| Bổ sung       | từ W35            | +1        | 5       | 1        |
| **TỔNG**      |                   | **8**     |         | **8 ✅** |

**Kết luận simulation:**
- Vocab: PASS (18/18) — không cần degrade
- Grammar: PASS (8/8) — degrade hoạt động đúng khi W36 thiếu skill_practice_hub
- Integration: PASS (14/14) — mix từ 2 pool trên

---

### API Contract chính thức Bước 2:

```javascript
// src/services/contentService.js
export function getWeeklyPoolWithReview(currentWeekId, skillBucket, options = {}) {
  const { targetSize, sessionSeen = new Set() } = options;
  const sizes = { vocab: 18, grammar: 8, integration: 14 };
  const total = targetSize ?? sizes[skillBucket];

  const allocations = computeAllocations(currentWeekId, total);
  // [{ weekId: 36, count: 11 }, { weekId: 35, count: 4, graceDegraded: false }, ...]

  let items = [];
  for (const { weekId, count } of allocations) {
    const pool = loadBucketPool(weekId, skillBucket);
    const filtered = pool.filter(item => !sessionSeen.has(item.id));
    items.push(...shuffle(filtered).slice(0, count));
  }

  // Dedup by id
  const seen = new Set();
  items = items.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  return {
    items: items.slice(0, total),
    meta: {
      currentItems: items.filter(i => i.weekId === currentWeekId).length,
      reviewItems: items.filter(i => i.weekId !== currentWeekId).length,
      graceDegraded: allocations.some(a => a.graceDegraded),
    }
  };
}
```

**loadBucketPool sources:**

| skillBucket   | Nguồn chính                             | Fallback                          |
|---------------|-----------------------------------------|-----------------------------------|
| 'vocab'       | vocab.js (normalize: word/"word"/en)    | skill_practice_hub.flash_arena    |
| 'grammar'     | skill_practice_hub.grammar_drills[].text_en | reading_hub.clil_article.sentence_drills |
| 'integration' | Mix 70% vocab + 30% grammar tuần đó    | —                                 |

> WARNING: vocab.js format không nhất quán: W33 dùng `id:` (integer), W34-W35 dùng `"id":` (JSON string). Normalize: `item["word"] ?? item.word ?? item.en`.

---

## H.3 — Audit Hạ tầng Tracking

### H.3.a — Cấp độ lưu trữ hiện tại

**Kết luận: Cấp (a) — CHỈ lưu tiến trình tổng hợp. KHÔNG có item-level detail.**

Bằng chứng — `useChroniclesStore.js` dòng 138–162 (`loadState` defaults):

```javascript
const defaults = {
  unlockedRooms: {},          // 'w33_d1': true
  roomStars: {},              // 'w33_d1': { door0: 2, door1: 3, door2: 1 }
  weeklyPP: {},               // 'w33': 80
  bossDefeated: {},           // 'w33': true
  bossAccessTier: {},         // 'w33': 'silver'
  lexioCoins: 0,
  collectiblesFound: {},
  bossFragments: {},
  chapterFinalBossDefeated: {},
  personalBests: {},          // { 'syntax_express_rail': 24.5 } — thời gian PB
};
```

Không tồn tại bất kỳ field nào như `itemsAnsweredCorrectly`, `vocabSeen`, `wordHistory`.

### H.3.b — Mini-games có log item-level không?

**Có item-level logging — nhưng KHÔNG phải trong Chronicles games:**

| File gọi                                      | Module          | Ghi gì                                               | Storage          |
|-----------------------------------------------|-----------------|------------------------------------------------------|------------------|
| `learnerProgressService.logAttempt()`         | Cambridge Suite, Station2CheckMode, WorldDiscoveryHub, ArenaHub | `{ contentId, result, timestamp, hint_used, score }` | localStorage `'engquest_learner_progress_v1'` |
| `srsService.recordReview(word, isCorrect)`    | SRSFlashcardReview, VisualMatchingAH (Cambridge) | `{ word, box, nextReview }` Leitner 5-box | localStorage `'engquest3k_srs_vocab_v2'` |

**KHÔNG có file nào trong `src/modules/chronicles/games/` gọi `srsService.recordReview()` hay `learnerProgressService.logAttempt()`.**

Chronicles games chỉ gọi: `useChroniclesStore.recordDoorStars(weekId, dayIndex, doorIndex, stars)` — aggregate score, không phải item detail.

### H.3.c — Local hay Backend?

**Kết luận: 100% localStorage. Không có backend sync thực tế.**

- `useChroniclesStore.js` L172–188: `localStorage.setItem('engquest_chronicles_' + uid, ...)`
- `learnerProgressService.js` L127: `localStorage.setItem('engquest_learner_progress_v1', ...)`
- `srsService.js` L104: `localStorage.setItem('engquest3k_srs_vocab_v2', ...)`
- `useUserStore.js` L4: `// import { supabaseAuth } from '../services/supabase';` — **commented out**

**Hệ quả:** Data mất khi học sinh đổi máy / xóa browser data.

### H.3.d — Khoảng cách đến SRS thật

| Thành phần cần cho SRS thật       | Hiện tại                                 | Gap                                                    |
|------------------------------------|------------------------------------------|--------------------------------------------------------|
| Engine Leitner 5-box               | ✅ Có đầy đủ: `srsService.js`            | Không có gap                                           |
| Vocab seed từ hub files            | ⚠️ Có 67 từ hardcode W1–W32             | Cần `seedWeekVocab(weekId)` tự động đọc vocab.js       |
| Chronicles games ghi kết quả item | ❌ Không có                              | Cần `onItemResult(id, isCorrect)` callback → srsService |
| Đồng bộ cross-device               | ❌ Local only                            | Cần Supabase integration (hiện commented out)          |
| Dashboard SRS                      | ✅ UI có: SRSFlashcardReview + ParentDashboard | Thiếu data source từ Chronicles               |

**Phần phải xây mới cho SRS thật (nếu làm):**
1. `seedWeekVocab(weekId)` — đọc vocab.js → add vào srsService
2. `onItemResult` callback trong 15 Chronicles mini-games
3. Supabase sync schema mới
4. Lịch ôn tập teacher-configurable (không chỉ wall-clock Leitner)

> CAUTION: SRS đầy đủ = dự án riêng (3–4 sprints). Không ghép vào Bước 2 Content Service.

---

## Kết luận

| Mục  | Trạng thái                                                                |
|------|---------------------------------------------------------------------------|
| H.1  | ✅ Confirmed. Week-level bucket. QUEST_SKILL_ROUTING_MAP = huỷ.           |
| H.2  | ✅ Simulation PASS. Vocab 18/18, Grammar 8/8 (W36 degrade hoạt động đúng). |
| H.3  | ✅ Báo cáo đầy đủ. SRS thật = dự án riêng, KHÔNG làm trong Bước 2.       |

**Bước 2 (Content Service) được phép tiến hành.**
