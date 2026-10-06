# Bước 2 — THIẾT KẾ Content Service (Đề xuất văn bản, chờ duyệt)
**Ngày:** 2026-09-09 | **Trạng thái:** Đề xuất — KHÔNG code trước khi được duyệt

---

## 0. Nguyên tắc thiết kế

> **Không tạo hệ thống mới.** Kiến trúc `extractQuestVocab.js → DailyRoomScreen → prop game` đã được định nghĩa đúng trong `SUPER_LEO_GAME_SYSTEM_ARCHITECTURE.md` §10. Nhiệm vụ của Bước 2 là **hoàn thiện** những gì còn thiếu trong kiến trúc đó, không phải thay thế nó.

**3 thứ còn thiếu:**
1. `ContentItem` schema chưa đủ trường để game phân biệt type/context
2. Chưa có `getContentPool()` chọn đúng pool theo game type và ngữ cảnh
3. Không có anti-repetition trong session

---

## 1. ContentItem Schema Mở Rộng

Giữ nguyên `vocabItems[]` và `grammarSentences[]` hiện tại (tránh breaking changes). Thêm trường type-safe:

```typescript
// Mở rộng ExtractedVocabData (đã có trong §10 SUPER_LEO_GAME_SYSTEM_ARCHITECTURE.md)
interface ContentItem {
  id:          string;    // hash(week + type + word/sentence) — dùng cho anti-repetition
  type:        'vocab' | 'chunk_pair' | 'grammar_cloze' | 'syntax_order';
  prompt:      string;    // Nội dung hiển thị cho học sinh
  answer:      string;    // Đáp án đúng
  distractors: string[];  // Đáp án nhiễu (2–3 items)
  weekId:      number;    // Tuần nguồn (33, 34, ...) — cho anti-repetition và Mock Test
  source:      'week_real' | 'curated' | 'chapter_pool'; // Để debug & analytics
  difficulty:  1 | 2 | 3; // 1=Pre-A1, 2=Movers/A1, 3=Flyers/A2
}
```

**Mapping loại item → game:**

| type | Dùng cho game |
|---|---|
| `vocab` | MeteorSmasher, HighwayRunner, ArcaneBubble, LexicalDetective, CrystalMatch, GrandMatrix |
| `chunk_pair` | **ChunkCatapult** (starter → completion) |
| `grammar_cloze` | RuneForge, TitanForge, AncientScroll, CambridgeCloze |
| `syntax_order` | **SyntaxExpress** (câu cần sắp xếp lại thứ tự từ) |

---

## 2. Hàm `getContentPool()` — Bổ sung vào `extractQuestVocab.js`

```javascript
/**
 * Lấy pool nội dung cho 1 lần chơi game cụ thể.
 * Gọi bởi DailyRoomScreen, thay thế các hàm extractCatapultPairs / extractQuestVocab riêng lẻ.
 *
 * @param {object} weekData     - Hub data của tuần (reading_hub, listening_hub, ...)
 * @param {number} weekId       - Số tuần (1–156)
 * @param {object} options
 * @param {'chest'|'boss_day'|'boss_week'|'mock_test'} options.context
 * @param {'chunk_catapult'|'highway_runner'|'meteor_smasher'|'syntax_express'|...} options.gameType
 * @param {number}   options.count       - Số item cần lấy
 * @param {Set}      options.usedIds     - Set id đã dùng trong session này (anti-repetition)
 * @returns {ContentItem[]}
 */
export function getContentPool(weekData, weekId, { context, gameType, count, usedIds = new Set() }) {
  // 1. Xác định count mặc định theo context
  const defaultCount = {
    chest:     10,
    boss_day:  15,
    boss_week: 20,
    mock_test: 25,  // Option D: fixed 25 (đơn giản, consistent UX)
  }[context] || 10;
  const n = count ?? defaultCount;

  // 2. Lấy raw items từ week data theo gameType
  const rawItems = extractByGameType(weekData, weekId, gameType);

  // 3. Anti-repetition: ưu tiên items chưa dùng
  const fresh = rawItems.filter(item => !usedIds.has(item.id));
  const used  = rawItems.filter(item =>  usedIds.has(item.id));
  const pool  = [...shuffle(fresh), ...shuffle(used)]; // fresh trước, used sau nếu cần

  // 4. Trả về đúng count
  return pool.slice(0, n);
}
```

**Quyết định Mock Test:** Option D — Fixed 25 items, lấy từ pool gộp 4 tuần gần nhất, shuffle tự nhiên (không cần per-item tracking). Đơn giản, consistent, hoạt động tốt cho 97% tuần chưa có data.

---

## 3. Hàm `extractByGameType()` — Nội bộ trong `extractQuestVocab.js`

```javascript
function extractByGameType(weekData, weekId, gameType) {
  switch (gameType) {
    case 'chunk_catapult':
      // Giữ nguyên logic 3 tầng hiện tại của extractCatapultPairs()
      return extractCatapultPairs(weekData, 0, weekId)
        .map(p => toContentItem('chunk_pair', weekId, p.starter, p.completion, []));

    case 'syntax_express':
      // FIX: Lấy từ retell_questions + writing ordered_chips (thay vì DEFAULT hardcode)
      return extractSyntaxItems(weekData, weekId);

    case 'highway_runner':
    case 'meteor_smasher':
    case 'arcane_bubble':
    case 'lexical_detective':
    case 'crystal_match':
    case 'grand_matrix':
      // Tất cả vocab games dùng chung pool vocab 20 từ
      return extractVocabItems(weekData, weekId);

    case 'rune_forge':
    case 'titan_forge':
    case 'ancient_scroll':
    case 'cambridge_cloze':
      // Grammar games dùng grammarSentences (cloze)
      return extractGrammarItems(weekData, weekId);

    default:
      return extractVocabItems(weekData, weekId);
  }
}
```

---

## 4. Anti-Repetition — Session-Level (đơn giản, không cần DB)

**Cơ chế:** `usedIds` là một `Set<string>` được tạo một lần khi vào `DailyRoomScreen` (hoặc `BossBattleScreen`), truyền xuống qua props, và accumulate sau mỗi lần game kết thúc.

```javascript
// Trong DailyRoomScreen.jsx
const usedItemIds = useRef(new Set());

// Khi gọi getContentPool:
const pool = getContentPool(weekData, weekNumber, {
  context: 'chest',
  gameType: door.gameId,
  count: 10,
  usedIds: usedItemIds.current,
});

// Sau khi game xong:
pool.forEach(item => usedItemIds.current.add(item.id));
```

**Phạm vi anti-repetition:**
- `chest` game: reset khi thoát DailyRoomScreen (1 session = 1 ngày)
- `boss_day`: usedIds nhận thêm ids từ 3 chest games trong ngày đó
- `boss_week`: usedIds nhận thêm ids từ toàn bộ 5 boss_day
- `mock_test`: pool gộp 4 tuần, usedIds reset mỗi buổi Mock Test

---

## 5. Fix 2 Game Broken (thực hiện cùng Bước 3)

### Fix SyntaxExpressGame (IGNORE prop → USE prop):
- **Vấn đề:** `useMemo(() => DEFAULT_EXPRESS_ROUNDS)` không dùng `grammarSentences`
- **Fix:** Thay `DEFAULT_EXPRESS_ROUNDS` bằng `buildExpressRounds(grammarSentences)` — convert `grammarSentences[].chips` thành các toa tàu có thứ tự đúng
- **Fallback:** Nếu `grammarSentences` rỗng → 4 câu DEFAULT vẫn dùng nhưng được tag `source: 'chapter_pool'` thay vì W33 forever

### Fix MeteorSmasherGame (MISSING prop → ADD prop):
- **Vấn đề:** `DailyRoomScreen` không truyền `vocabItems` cho `meteor_smasher`
- **Fix:** 1 dòng thêm prop — `<StormShieldDefense vocabItems={vocabItems} ...>`

---

## 6. Thứ tự ưu tiên nguồn (Source Hierarchy) — Không thay đổi, chỉ làm rõ

```
Tầng 1: week_real   — Dữ liệu hub thật của đúng tuần (W33–W37, và W38+ khi build song song)
Tầng 2: curated     — Pairs đã được duyệt thủ công (WEEKLY_CATAPULT_PAIRS W33–W37)
Tầng 3: chapter_pool — THEME_CATAPULT_PAIRS / THEME_VOCAB / THEME_GRAMMAR (6 items/chapter)
                        → 48 câu chapter-pool đã duyệt KHÔNG bị xóa, chỉ đổi vai trò thành last resort
```

---

## 7. Các File Sẽ Thay Đổi trong Bước 3

| File | Thay đổi |
|---|---|
| `extractQuestVocab.js` | +`getContentPool()`, +`extractByGameType()`, +`toContentItem()`, +`extractSyntaxItems()` |
| `DailyRoomScreen.jsx` | Dùng `getContentPool()` thay `extractQuestVocab()` trực tiếp; thêm `usedItemIds` ref; fix `meteor_smasher` prop |
| `games/SyntaxExpressGame.jsx` | Replace `DEFAULT_EXPRESS_ROUNDS` hardcode bằng `buildExpressRounds(grammarSentences)` |
| `games/ChunkCatapultCanvas.jsx` | Nhận `items: ContentItem[]` thay `pairs[]` (backward compatible với adapter) |
| `games/HighwayRunnerGame.jsx` | Nhận `items: ContentItem[]` thay `vocabItems[]` (backward compatible) |
| `phaser/scenes/HighwayRunnerScene.js` | Xóa fallback W33 hardcode, dùng items từ sceneData |

**Không tạo file service mới.** Tất cả logic nằm trong `extractQuestVocab.js` (đúng kiến trúc đã có).

---

## 8. Tóm tắt các quyết định kiến trúc

| Quyết định | Lựa chọn | Lý do |
|---|---|---|
| Mock Test policy | **Option D: Fixed 25 items** | Đơn giản, không cần item-level tracking, phù hợp 97% tuần chưa có data |
| Anti-repetition scope | **Session-level Set<id>** | Không cần server, reset tự nhiên khi sang session mới |
| New file vs extend existing | **Extend `extractQuestVocab.js`** | Tôn trọng kiến trúc đã có, tránh tạo abstraction thừa |
| SyntaxExpress fix | **Build từ `grammarSentences.chips`** | Cùng nguồn data với ChunkCatapult, tái dụng |
| MeteorSmasher fix | **1 dòng add prop** | Đơn giản, không cần re-architect |
| Breaking changes | **Không có** | Các game cũ vẫn nhận `vocabItems[]`/`grammarSentences[]`, chỉ thêm `items[]` song song |

---

## Câu hỏi mở (nếu có) để duyệt

Không còn câu hỏi mở. Tất cả quyết định đã được chốt dựa trên:
- Mock Test: Option D (bạn chọn — consistent, đơn giản)
- Scope: Sửa tất cả 4 game (bạn chọn — audit xong thì fix từng game)
- Timeline W38+: Song song (bạn xác nhận — thiết kế graceful fallback là đủ)
- Kiến trúc: Extend existing, không tạo mới (theo kiến trúc đã định nghĩa)

**→ Chờ duyệt để tiến hành Bước 3 (code + verify).**
