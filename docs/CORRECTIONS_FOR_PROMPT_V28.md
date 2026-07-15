# CÁC ĐIỀU CHỈNH CẦN THIẾT CHO PROMPT V28

## 1. READ.JS - SỐ LƯỢNG CÂU VÀ ĐỘ DÀI

### ❌ SAI (trong Prompt hiện tại):
```
Advanced: 10-12 sentences (8-14 words each)
Easy: 8-10 sentences (5-8 words each)
```

### ✅ ĐÚNG (theo Week 2 thực tế):
```
Advanced Mode:
- 12-15 câu
- Mỗi câu: 6-14 từ
- Không được ngắn hơn 6 từ

Easy Mode:
- 10-12 câu  
- Mỗi câu: 5-10 từ
- Không được ngắn hơn 5 từ
```

**Thực tế Week 2**:
- Advanced: 18 câu (4-8 từ/câu) - Cần điều chỉnh lên 12-15 câu để dài hơn
- Easy: 9 câu (4-9 từ/câu) - Cần điều chỉnh lên 10-12 câu

---

## 2. DICTATION.JS & SHADOWING.JS - COPY NGUYÊN XI TỪ READ.JS

### ✅ ĐÚNG:
- dictation.js: Copy NGUYÊN XI số lượng câu từ read.js
- shadowing.js: Copy NGUYÊN XI số lượng câu từ read.js + 1 audio_full

**Không cần fix cứng số 8 câu**. Số lượng câu = số câu trong read.js (12-15 cho Advanced, 10-12 cho Easy)

**Week 2 thực tế**:
- Advanced read.js: 18 câu
- Advanced dictation.js: 18 câu (match)
- Advanced shadowing.js: 18 câu + 1 full audio = 19 files (match)

---

## 3. AUDIO URL COUNT - CHÍNH XÁC

### ❌ SAI (trong script cũ):
```
vocab.js: 10 words × 1 audio = 10 audios
word_power.js: 3 words × 1 audio = 3 audios
```

### ✅ ĐÚNG (theo thực tế Week 2):

#### vocab.js - 10 words × 4 audios each:
```
vocab_[word].mp3           (từ)
vocab_def_[word].mp3       (definition)
vocab_ex_[word].mp3        (example)
vocab_coll_[word].mp3      (collocation)
= 10 words × 4 = 40 audio files
```

#### word_power.js - 3 words × 5 audios each:
```
wordpower_[word].mp3       (từ)
wordpower_def_[word].mp3   (definition)
wordpower_ex_[word].mp3    (example)
wordpower_model_[word].mp3(model sentence)
wordpower_coll_[word].mp3  (collocation)
= 3 words × 5 = 15 audio files
```

---

## 4. TOTAL AUDIO COUNT PER MODE

### Breakdown chi tiết (Week 2 Advanced):

| Station | Calculation | Count |
|---------|-------------|-------|
| vocab.js | 10 words × 4 | 40 |
| read.js | 1 main audio | 1 |
| explore.js | 1 main audio | 1 |
| dictation.js | 18 sentences | 18 |
| shadowing.js | 18 sentences + 1 full | 19 |
| ask_ai.js | 5 prompts | 5 |
| mindmap.js | 6 stems + 36 branches | 42 |
| word_power.js | 3 words × 5 | 15 |
| grammar.js | NO AUDIO | 0 |
| **TOTAL** | | **141** |

**Thực tế từ file system**: 161 files (chênh 20 files có thể do placeholder/test files)

### Easy Mode (ước tính):
- Cấu trúc tương tự Advanced
- Khác biệt: ít câu hơn trong dictation/shadowing (10-12 vs 18)
- Total: ~130 files

---

## 5. GRAMMAR.JS - PHẢI CÓ CÂU PHỦ ĐỊNH VÀ CÂU HỎI

### ✅ ĐÚNG (Week 2 đã implement):
```javascript
exercises: [
  // 30% AFFIRMATIVE (6 exercises)
  { type: "fill", question: "This is _____ mother.", answer: "my" },
  
  // 30% NEGATIVE (6 exercises)
  { type: "fill", question: "This is _____ my brother.", answer: "not" },
  { type: "mc", question: "He is _____ my father.", options: ["not", "no", "don't"], answer: "not" },
  
  // 40% QUESTIONS (8 exercises)
  { type: "fill", question: "_____ this your mother?", answer: "Is" },
  { type: "unscramble", words: ["is", "Who", "this"], answer: "Who is this?" }
]  // EXACTLY 20 exercises total
```

**Tỉ lệ bắt buộc**:
- 30% Affirmative (6 câu)
- 30% Negative (6 câu)
- 40% Questions (8 câu)

---

## 6. VALIDATION CHECKS CẦN BỔ SUNG

### Kiểm tra số lượng audio URLs:

#### Trong từng file:
- ✅ read.js: 1 audio_url
- ✅ vocab.js: 10 words × 4 audios = 40 URLs (audio_word, audio_def, audio_ex, audio_coll)
- ✅ dictation.js: số câu = số câu read.js
- ✅ shadowing.js: số câu + 1 audio_full
- ✅ ask_ai.js: 5 audio_url
- ✅ mindmap.js: 6 stems + 36 branches = 42 audio URLs
- ✅ explore.js: 1 audio_url
- ✅ word_power.js: 3 words × 5 = 15 URLs
- ❌ grammar.js: NO AUDIO

#### Tổng thể mỗi mode:
- Advanced: ~140-145 files
- Easy: ~130-135 files

### Validation script phải kiểm tra:
```bash
node tools/validate_week.js 3

Checks:
1. File existence (15 files per mode)
2. CEFR level match week range
3. vocab.js: 10 words with 4 audio fields each
4. read.js: 12-15 sentences (Advanced), 10-12 (Easy)
5. read.js: word length 6-14 (Adv), 5-10 (Easy)
6. read.js: EXACTLY 10 bold words FROM vocab.js
7. explore.js: 10 NEW words, max 2 overlap
8. ask_ai.js: Context ≤10 words, A0 patterns only
9. grammar.js: 20 exercises (6 Aff / 6 Neg / 8 Quest)
10. dictation.js: matches read.js sentence count
11. shadowing.js: matches read.js sentence count + 1
12. word_power.js: 3 words with 5 audio fields each
13. Total audio count: 140-145 (Adv), 130-135 (Easy)
```

---

## 7. MASS PRODUCTION WORKFLOW UPDATES

### [3] Sync Data - Phải sync dictation/shadowing:
```python
# sync_week_data.py
- Extract ALL sentences từ read.js → dictation.js
- Extract ALL sentences từ read.js → shadowing.js (with `vi` field + audio_full)
- Không hard-code số lượng câu (8)
- Auto-fill audio_url cho tất cả fields
```

### [5] Generate Audio - Phải tạo đủ audio:
```python
# generate_audio_final.py
For vocab.js (10 words):
  - vocab_[word].mp3
  - vocab_def_[word].mp3
  - vocab_ex_[word].mp3
  - vocab_coll_[word].mp3

For word_power.js (3 words):
  - wordpower_[word].mp3
  - wordpower_def_[word].mp3
  - wordpower_ex_[word].mp3
  - wordpower_model_[word].mp3
  - wordpower_coll_[word].mp3
```

---

## TÓM TẮT CÁC SỐ LIỆU CHÍNH XÁC

### Read.js:
- **Advanced**: 12-15 câu, 6-14 từ/câu
- **Easy**: 10-12 câu, 5-10 từ/câu

### Audio Count:
- **vocab.js**: 10 words × 4 = 40 files
- **word_power.js**: 3 words × 5 = 15 files
- **dictation/shadowing**: = số câu read.js (không cố định)
- **Total Advanced**: ~140-145 files
- **Total Easy**: ~130-135 files

### Grammar.js:
- **20 exercises**: 6 Aff + 6 Neg + 8 Quest
- **MUST HAVE** câu phủ định và câu hỏi

### Validation:
- Phải kiểm tra số lượng audio trong từng file
- Phải kiểm tra tổng số audio per mode
- Phải kiểm tra dictation/shadowing match read.js
