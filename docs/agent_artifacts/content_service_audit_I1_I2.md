# Audit Supplement — I.1 Grand Review Mode + I.2 Bug Fixes
**Ngày:** 2026-09-09
**Phạm vi:** Bổ sung song song Mục 9 (không thay thế H.1–H.3)

---

## I.1 — Grand Review Mode: Khả thi với kiến trúc hiện tại?

### Phát hiện quan trọng từ audit code:

**Full Mock detection đã có sẵn trong codebase:**

Từ `src/config/bossRotarySchedule.js` (L122–134) + `BossBattleZone.jsx` (L106):
```javascript
// getBossRotaryConfig(weekNumber) trả về cycleNumber = 5 khi là Full Mock
const offset = ((w - 33) % 5 + 5) % 5;
const cycleKey = offset + 1;
// cycleKey === 5 → Full Mock (W37, W42, W47, W52…)

// BossBattleZone.jsx đã dùng:
const isFullMock = rotaryConfig.cycleNumber === 5 || rotaryConfig.cycleNumber === 0;
```

**Lịch Full Mock thực tế (từ W33+):** W37, W42, W47, W52, W57, W62, W67, W72, ...

**Nguồn nội dung 4 tuần trước Mock:**
- W37 mock → review W33–W36
- W42 mock → review W38–W41
- …

### Trạng thái ChroniclesScreen.jsx (L98–101, L233–243):

```javascript
const [screen, setScreen] = useState('map'); // 'map' | 'room' | 'boss'
// Không có state 'grand_review' — chưa tồn tại
```

**ChroniclesWorldMap không hiển thị entry point Grand Review Arena** — không có component, route, hay state nào cho Grand Review Mode hiện tại.

### Danh sách phần CHƯA tồn tại cần xây:

| Thứ tự | File | Thay đổi | Effort |
|--------|------|----------|--------|
| 1 | `ChroniclesScreen.jsx` | Thêm `'grand_review'` vào state machine; thêm Suspense wrapper render `<GrandReviewArena>` | 30 phút |
| 2 | `ChroniclesWorldMap.jsx` | Thêm entry point UI "⚔️ Grand Review Arena" xuất hiện khi `isFullMockWeek && allQuestsComplete` | 45 phút |
| 3 | `GrandReviewArena.jsx` (NEW) | Component mới: hiển thị pool 25 vocab + 8 grammar, state machine: pool → boss MCQ → reward | 3–4 giờ |
| 4 | `GrandReviewBoss.jsx` (NEW) | Boss synthesis 5 câu MCQ từ pool, reward Grand Crystal | 2 giờ |
| 5 | `extractQuestVocab.js` | Thêm hàm `getGrandReviewPool(weekIds, { count })` gộp vocab + grammar từ nhiều tuần | 1 giờ |
| 6 | `useChroniclesStore.js` | Thêm field `grandCrystals: {}` + action `awardGrandCrystal(weekId)` + `hasGrandCrystal(weekId)` | 30 phút |

**Tổng effort ước tính: ~8 giờ** (không tính test).

### Quyết định phân bổ:

> **Grand Review Mode = Bước 3 riêng, KHÔNG ghép vào Bước 2.**

Lý do:
1. Bước 2 (Content Service `getWeeklyPoolWithReview`) là prerequisite cho Grand Review Pool.
2. `GrandReviewArena.jsx` là component mới hoàn toàn, nếu ghép vào Bước 2 sẽ tăng scope không kiểm soát.
3. Bước 2 phải xong trước để `getGrandReviewPool()` có thể tái dụng `loadBucketPool()` đã xây.

**API `getGrandReviewPool` — đặc tả chính thức cho Bước 3:**

```javascript
/**
 * Lấy pool tổng hợp vocab + grammar từ nhiều tuần (dùng cho Grand Review Arena).
 * @param {number[]} weekIds - mảng weekId, e.g. [33, 34, 35, 36] (4 tuần trước Mock)
 * @param {{ vocabCount?: number, grammarCount?: number }} options
 * @returns {{ vocabItems: Array, grammarSentences: Array }}
 */
export function getGrandReviewPool(weekIds, options = {}) {
  const { vocabCount = 25, grammarCount = 8 } = options;

  const allVocab = [];
  const allGrammar = [];

  for (const weekId of weekIds) {
    // Reuse loadBucketPool từ ContentService (Bước 2)
    allVocab.push(...loadBucketPool(weekId, 'vocab'));
    allGrammar.push(...loadBucketPool(weekId, 'grammar'));
  }

  // Dedup by id (hoặc by word/sentence nếu không có id)
  const seenV = new Set();
  const vocabItems = allVocab
    .filter(v => { const k = v.id || v.word; if (seenV.has(k)) return false; seenV.add(k); return true; })
    .sort(() => Math.random() - 0.5)
    .slice(0, vocabCount);

  const seenG = new Set();
  const grammarSentences = allGrammar
    .filter(g => { const k = g.id || g.sentence; if (seenG.has(k)) return false; seenG.add(k); return true; })
    .sort(() => Math.random() - 0.5)
    .slice(0, grammarCount);

  return { vocabItems, grammarSentences };
}
```

**Trigger condition trong ChroniclesWorldMap:**
```javascript
// Cần thêm vào ChroniclesWorldMap.jsx
const { cycleNumber } = getBossRotaryConfig(weekNumber);
const isFullMockWeek = cycleNumber === 5;

// Đếm tổng quests đã xong trong tuần
const allQuestsCount = QUEST_SCHEDULE.reduce((sum, day) => sum + day.quests.length, 0); // = 15
const completedCount = QUEST_SCHEDULE
  .flatMap(day => day.quests)
  .filter(q => isQuestCompleted(weekNumber, q.id)).length;

const showGrandReview = isFullMockWeek && completedCount >= allQuestsCount;
// → Hiển thị entry point "⚔️ Grand Review Arena" khi điều kiện trên thỏa
```

---

## I.2 — 3 Bug Fixes (Kết quả thực tế)

### Bug 1 ✅ ĐÃ FIX — `SyntaxExpressRail.jsx` field mismatch

**Root cause:** `extractGrammarSentences()` trả về `{ sentence, hint }` nhưng `SyntaxExpressRail` dòng 99 đọc `item.fullSentence` → always undefined → fallback hardcode "If surfaces are smooth..."

**Fix đã áp dụng** — [`SyntaxExpressRail.jsx` dòng 99](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/SyntaxExpressRail.jsx#L99):

```diff
- const full = item.fullSentence || 'If surfaces are smooth, objects slide easily.';
+ const full = item.fullSentence || item.sentence || 'If surfaces are smooth, objects slide easily.';
```

**Kết quả sau fix:** Khi `grammarSentences = [{ sentence: "While Jake was walking...", hint: "Past Cont." }]` được truyền vào, game sẽ build rounds từ câu thật của tuần thay vì fallback W33 hardcode.

---

### Bug 2 ✅ ĐÃ FIX — `StormShieldDefense` thiếu prop `meteorVocabulary`

**Root cause:** `DailyRoomScreen.jsx` dòng 321–322 (case `'meteor_smasher'`) không truyền vocabItems, khiến `StormShieldDefense` luôn dùng `DEFAULT_METEOR_WORDS` hardcode (W33 friction/rubber/slippery).

**StormShieldDefense props signature** ([`StormShieldDefense.jsx` dòng 53–58](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/StormShieldDefense.jsx#L53-L58)):
```javascript
export default function StormShieldDefense({
  meteorVocabulary = DEFAULT_METEOR_WORDS,  // ← đây là prop name thực tế
  duration = 90,
  weekNumber = 33,
  onComplete, onExit,
})
```

**Fix đã áp dụng** — [`DailyRoomScreen.jsx` dòng 321](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/DailyRoomScreen.jsx#L321-L322):

```diff
- return <StormShieldDefense duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;
+ return <StormShieldDefense meteorVocabulary={vocabItems} duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;
```

**Kết quả sau fix:** `vocabItems` từ `extractQuestVocab(weekData, dayIndex)` (đã tính theo tuần) được truyền vào game. Sau khi ContentService (Bước 2) hoàn chỉnh, `vocabItems` sẽ chứa đúng vocab của tuần hiện tại + review.

---

### Bug 3 — `extractZone5Vocab` (KHÔNG phải bug — báo cáo G.4 sai)

**Phát hiện:** Audit G.4 báo `push_calls=0` cho `extractZone5Vocab`, kết luận "chưa implement". **ĐÂY LÀ SAI.**

Bằng chứng thực tế từ [`extractQuestVocab.js` dòng 159–165](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/extractQuestVocab.js#L159-L165):

```javascript
function extractZone5Vocab(readingHub, listeningHub, writingHub, speakingHub) {
  const z1 = extractZone1Vocab(readingHub).slice(0, 3);
  const z2 = extractZone2Vocab(readingHub, listeningHub).slice(0, 3);
  const z3 = extractZone3Vocab(listeningHub).slice(0, 3);
  const z4 = extractZone4Vocab(writingHub, speakingHub).slice(0, 3);
  return dedup([...z1, ...z2, ...z3, ...z4]).slice(0, 15);
}
```

Zone5 đã implement đúng: gọi Zone1–4 (mỗi zone lấy 3 items đầu), dedup, trả về tối đa 15 items tổng hợp.

**Lý do G.4 sai:** Tool đếm `items.push` calls trực tiếp = 0, nhưng hàm này delegate sang `extractZone1/2/3/4Vocab` thay vì push trực tiếp. Tool đếm không nhận ra delegate pattern.

**Hành động:** KHÔNG cần sửa `extractZone5Vocab`. Tuy nhiên, **có một vấn đề thực sự ở Zone5**: kết quả chỉ tối đa 12 items (3×4) sau dedup, ít hơn ngưỡng 15 targets nếu các Zone trả về ít item. Bước 3 nên tăng slice từ `.slice(0, 3)` lên `.slice(0, 5)` để Zone5 đạt 15–20 items. Đây là enhancement, không phải bug.

---

## Tóm tắt

| Mục | Kết quả |
|-----|---------|
| **I.1 Grand Review Mode** | Khả thi kỹ thuật. Effort = ~8h. **Thuộc Bước 3** (sau Bước 2 xong). Full Mock weeks = W37, W42, W47… (cycleNumber===5). Cần 6 file mới/sửa. |
| **I.2 Bug 1 — SyntaxExpressRail** | ✅ **ĐÃ FIX**. `item.fullSentence \|\| item.sentence` — dòng 99. |
| **I.2 Bug 2 — StormShieldDefense** | ✅ **ĐÃ FIX**. `meteorVocabulary={vocabItems}` — DailyRoomScreen dòng 321. |
| **I.2 Bug 3 — Zone5 trống** | ❌ **Không phải bug**. Zone5 đã implement đúng từ trước. Audit G.4 đếm sai pattern. Enhancement nhỏ: tăng slice từ 3→5 trong Bước 3. |
