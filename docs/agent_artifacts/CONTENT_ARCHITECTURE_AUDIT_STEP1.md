# Bước 1 — AUDIT: Nguồn Nội Dung Mini-Game EngQuest3K
**Ngày:** 2026-09-09 | **Phạm vi:** 156 tuần × 17 mini-game | **Trạng thái:** Báo cáo thuần — KHÔNG sửa code

---

## PHẦN A: DỮ LIỆU TUẦN HIỆN CÓ

### A.1 — Chỉ có 5 tuần có dữ liệu thật (W33–W37)

```
src/data/weeks/
├── week_33/  ← 28 files, ~4,000 dòng (đầy đủ nhất)
├── week_34/  ← ~2,000 dòng
├── week_35/  ← ~2,000 dòng
├── week_36/  (dự kiến tương tự)
└── week_37/  (dự kiến tương tự)
```

> **⚠️ CRITICAL:** 151/156 tuần (W1–W32, W38–W156) KHÔNG có file dữ liệu. Mini-game chỉ dùng được fallback static.

### A.2 — Fields Có Nội Dung Dùng Được (đại diện W33)

| Hub File | Field | Items |
|---|---|---|
| `reading_hub.js` | `read_explore.retell_questions[].sentence` + `.chips[]` | 5 câu × 3 chips |
| `reading_hub.js` | `read_explore.vocab_focus[]` | ~8 từ |
| `reading_hub.js` | `reading_part3_story.story_text` | 1 passage, 6 blanks |
| `vocab.js` | Array `{word, definition_en, example_en, audio_word}` | **20 từ** |
| `listening_hub.js` | `listening_p3.items[].audio_text` | 5 items |
| `listening_hub.js` | `listening_p4.questions[].dialogue_script` | 5–6 Q&A |
| `writing_hub.js` | `writing_chunks` (setting/action/problem/solution) | 3–4 phrases/group |
| `writing_hub.js` | `picture_story.paragraphs[].ordered_chips[]` | 5 đoạn × ~5 chips |
| `speaking_hub.js` | `info_exchange_cards.table_a.fields[]` | ~6 Q&A fields |

**Retell question sample (nguồn Catapult hiện tại):**
```json
{
  "step": 1,
  "sentence": "Jake was walking carefully down the school corridor after science class.",
  "chips": ["after science class", "walking carefully", "school corridor"]
}
```

### A.3 — Chapter Config: 7 chapters, W17–W156

| Chapter | Weeks | Theme | Tuần có data thật |
|---|---|---|---|
| Pre-A1 Lite | W01–W16 | — | **0 tuần** |
| Ch.1 Grand Library | W17–W24 | library | **0 tuần** |
| Ch.2 Aqua Vault | W25–W32 | ocean | **0 tuần** |
| **Ch.3 Storm Tower** | **W33–W40** | storm | **W33, W34, W35** ✅ |
| Ch.4 Ancient Greenhouse | W41–W48 | forest | **0 tuần** |
| Ch.5 Forge of Words | W49–W56 | forge | **0 tuần** |
| Ch.6 Observatory | W57–W72 | space | **0 tuần** |
| Ch.7 Throne of Mastery | W73–W156 | throne | **0 tuần** |

---

## PHẦN B: AUDIT TỪNG MINI-GAME

### B.1 — ChunkCatapultCanvas ✅ Pipe tốt nhất hiện tại

**Flow:** `DailyRoomScreen` → `extractCatapultPairs(weekData, dayIndex, weekNumber)` → prop `pairs`

**3 tầng hiện tại:**
1. **W33–W37:** Curated 6 pairs/tuần (hardcode trong `WEEKLY_CATAPULT_PAIRS`)  
2. **Dynamic:** Extract từ `read_explore.retell_questions.chips` nếu có ≥4 pairs  
3. **Fallback:** `generateStubCatapultPairs(wk, 6)` → **6 câu/chapter dùng chung 8 tuần**  

**Vấn đề:** Tầng 3 chỉ có 6 pairs cho 8 tuần → lặp hoàn toàn sau 1 lần chơi trong ngày.

---

### B.2 — HighwayRunnerScene (Phaser)

**Flow:** `DailyRoomScreen` → `sceneData.vocabItems` (từ `extractQuestVocab`)

**Fallback nội bộ (lines 27–33):**
```js
{ word: 'friction', definition: 'The force that slows things down...' },
{ word: 'slippery', definition: 'Very smooth...' },
{ word: 'corridor', definition: 'A long indoor passage...' },
```
→ **W33 hardcode cho 151 tuần còn lại**

---

### B.3 — RuneForgeGame / AnvilRushGrammar

**Flow:** `grammarSentences` → `buildFillItems()` → cloze (random blank 1 từ)

**Fallback nội bộ:**
```js
{ sentence: 'Friction keeps shoes firmly on the floor.' },
{ sentence: 'Rubber soles have strong grip.' },
{ sentence: 'Water makes the smooth floor very slippery.' },
```
→ **W33 hardcode**. Logic cloze tốt, nhưng phụ thuộc chất lượng input.

---

### B.4 — MeteorSmasherGame / StormShieldDefense 🔴 BROKEN

**Vấn đề phát hiện:** `DailyRoomScreen` routing KHÔNG truyền `vocabItems`:
```js
case 'meteor_smasher':
  return <StormShieldDefense duration={door.duration} weekNumber={weekNumber} onExit={handleExit} {...commonProps} />;
  // ← THIẾU vocabItems prop!
```
→ Game nhận mảng rỗng, hiển thị nội dung hardcode nội bộ riêng.

---

### B.5 — SyntaxExpressGame 🔴 BROKEN

**Vấn đề phát hiện:** Game nhận `grammarSentences` nhưng HOÀN TOÀN IGNORE prop:
```js
const rounds = useMemo(() => {
  return DEFAULT_EXPRESS_ROUNDS; // ← KHÔNG dùng grammarSentences!
}, []);
```

**DEFAULT_EXPRESS_ROUNDS** = 4 câu hardcode về Jake/Nurse Sarah/janitor/running shoes → **W33 forever**.

---

### B.6 — Các Game Khác (pattern chung)

| Game | Nhận prop | Fallback nội bộ |
|---|---|---|
| `AncientScrollFillGame` | `vocabItems` + `grammarSentences` | Passage friction/corridor (W33) |
| `LexicalDetectiveGame` | `vocabItems` | shoe soles/friction/slippery/banana (W33) |
| `CambridgeClozeGame` | `vocabItems` + `grammarSentences` | corridor/friction blanks hardcode (W33) |
| `GrandMasterMatrixGame` | `vocabItems` | groupId: 'friction', 'corridor' (W33) |
| `TitanForgeGame` | `grammarSentences` | "Water on smooth tiles reduce friction." (W33) |

**Pattern:** Mọi fallback đều là W33. Kể cả khi prop được truyền đúng, nếu `extractQuestVocab` không có week data → game hiện W33.

---

## PHẦN C: BẢNG MA TRẬN TỔNG HỢP

| Mini-game | Nhận gì | W33–W37 real | Chapter pool | Hardcode fallback |
|---|---|---|---|---|
| ChunkCatapultCanvas | `pairs` (curated/dynamic) | ✅ 6 pairs/tuần | ✅ 6/chapter | W33 story |
| HighwayRunnerScene | `vocabItems` | ✅ via extractQuestVocab | ✅ stub | W33 words |
| RuneForgeGame | `grammarSentences` | ✅ via extractQuestVocab | ✅ stub | W33 sentences |
| **MeteorSmasherGame** | **❌ MISSING prop** | ❌ | ❌ | Nội bộ |
| **SyntaxExpressGame** | **❌ IGNORES prop** | ❌ | ❌ | 4 câu Jake/nurse |
| AncientScrollFill | `vocabItems` + `grammar` | ✅ partial | ✅ partial | W33 passage |
| LexicalDetective | `vocabItems` | ✅ partial | ✅ partial | W33 words |
| CambridgeClozeGame | `vocabItems` + `grammar` | ✅ partial | ✅ partial | W33 blanks |
| GrandMasterMatrix | `vocabItems` | ✅ partial | ✅ partial | W33 groups |
| TitanForgeGame | `grammarSentences` | ✅ partial | ✅ partial | W33 sentence |

---

## PHẦN D: VẤN ĐỀ ĐÃ ĐỦ RÕ ĐỂ CHỐT

### D.1 — Không có anti-repetition logic ở bất kỳ đâu

Hiện tại: mỗi lần game khởi động → đọc cùng một pool tĩnh → với chapter pool 6 items và tần suất chơi 15+ lần/tuần, học sinh thấy đủ tất cả items trong ngày đầu tiên.

### D.2 — Không phân biệt Chest Game vs Boss Day vs Boss Week

Ba bối cảnh chơi dùng cùng hàm `extractCatapultPairs` với cùng output → không có tổng hợp hay tăng độ phủ như mong đợi ở Boss.

---

## PHẦN E: CÂU HỎI CẦN BẠN TRẢ LỜI TRƯỚC BƯỚC 2

> [!IMPORTANT]
> Bước 2 (thiết kế Content Service) bị block bởi 3 quyết định dưới đây. Antigravity cần câu trả lời của bạn trước khi đề xuất schema và API.

### ❓ E.1 — Mock Test content policy (Critical)

Tuần Mock Test dùng nội dung từ 4+ tuần trước. Cần chọn **1 trong 4 phương án**:

| Option | Mô tả | Implications |
|---|---|---|
| **A — Đại diện/tuần** | ~3 items/tuần × 4 tuần = ~12 items | Cần ghi nhận per-week performance |
| **B — Weighted by error** | Lấy tất cả, shuffle theo trọng số lỗi | Cần item-level accuracy tracking |
| **C — Giới hạn thời gian** | Cap tổng session (ví dụ 20 phút), chia đều | Đơn giản, không cần tracking |
| **D — Fixed volume** | Luôn 25 items bất kể ôn bao nhiêu tuần | Consistent UX, không adaptive |

### ❓ E.2 — Scope fix Bước 3

Bước 3 fix "Chunk Catapult trước" + "Highway Runner theo kiến trúc mới". Nhưng SyntaxExpress và Meteor đang broken — có fix chúng trong Bước 3 luôn không, hay để sang issue riêng?

### ❓ E.3 — Timeline data W38–W156

Khi nào các tuần W38+ sẽ có hub data? Content Service có cần optimize cho "gần như 100% tuần thiếu data" hay "dần dần sẽ có data"? Điều này ảnh hưởng mức độ đầu tư vào fallback hierarchy.

---

## KẾT LUẬN BƯỚC 1

1. ✅ **5 tuần W33–W37** có đủ data để Content Service hoạt động tốt ngay
2. ✅ **4 content types phong phú nhất:** vocab 20 từ, retell chips, writing chunks, listening P3/P4
3. 🔴 **2 game broken ngay cả với W33 data:** SyntaxExpress (ignore prop), MeteorSmasher (missing prop)
4. 🔴 **151 tuần chỉ có 6 items/chapter** → lặp sau 1–2 lần chơi
5. ❌ **Không có anti-repetition logic** ở bất kỳ đâu

**→ Chờ câu trả lời cho E.1, E.2, E.3 để viết Bước 2.**
