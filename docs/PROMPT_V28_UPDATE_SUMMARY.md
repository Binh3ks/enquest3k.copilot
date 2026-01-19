# ✅ ĐÃ CẬP NHẬT PROMPT V28 - TÓM TẮT THAY ĐỔI

## 🔧 CÁC ĐIỀU CHỈNH ĐÃ THỰC HIỆN

### 1. READ.JS - SỐ LƯỢNG CÂU (Section IV.2)
**Trước**: Advanced 10-12 câu, Easy 8-10 câu  
**Sau**: 
- **Advanced**: 12-15 câu, 6-14 từ/câu (min 6 từ)
- **Easy**: 10-12 câu, 5-10 từ/câu (min 5 từ)

### 2. VOCAB.JS - AUDIO COUNT (Section IV.3)
**Trước**: 10 words × 1 audio = 10 files  
**Sau**: 10 words × 4 audios = 40 files
- vocab_[word].mp3
- vocab_def_[word].mp3
- vocab_ex_[word].mp3
- vocab_coll_[word].mp3

**Thêm note chi tiết** về audio generation

### 3. WORD_POWER.JS - AUDIO COUNT (Section IV.6)
**Trước**: 3 words × 1 audio = 3 files  
**Sau**: 3 words × 5 audios = 15 files
- wordpower_[word].mp3
- wordpower_def_[word].mp3
- wordpower_ex_[word].mp3
- wordpower_model_[word].mp3
- wordpower_coll_[word].mp3

**Thêm note chi tiết** về audio generation

### 4. GRAMMAR.JS - MANDATORY RATIO (Section IV.7)
**Trước**: "MUST INCLUDE" (mơ hồ)  
**Sau**: "⚠️ MANDATORY RATIO" (rõ ràng)
- 30% Affirmative (6 exercises)
- 30% Negative (6 exercises)  
- 40% Questions (8 exercises)

**Thêm warning**: "Câu phủ định và câu hỏi là BẮT BUỘC"

### 5. DICTATION/SHADOWING - DYNAMIC COUNT (Section IX.2)
**Trước**: "18-20 sentences" (fixed)  
**Sau**: "Number of sentences = read.js sentence count" (dynamic)

Shadowing: Read sentences + 1 full audio

### 6. TOTAL AUDIO COUNT SUMMARY (Section IX.3 - MỚI)
**Thêm bảng tổng hợp**:

Advanced Mode:
- Calculated: 141 files
- Actual (Week 2): 161 files
- Breakdown chi tiết từng station

Easy Mode:
- Estimated: 130-135 files
- Actual (Week 2): 143 files

**Validation targets**: 140-145 (Adv), 130-135 (Easy)

---

## 📊 SỐ LIỆU CHÍNH XÁC (WEEK 2 BASELINE)

### Audio Files Per Station:
| Station | Advanced | Easy |
|---------|----------|------|
| vocab.js | 40 | 40 |
| read.js | 1 | 1 |
| explore.js | 1 | 1 |
| dictation.js | 18 | 9 |
| shadowing.js | 19 | 10 |
| ask_ai.js | 5 | 5 |
| mindmap.js | 42 | 42 |
| word_power.js | 15 | 15 |
| grammar.js | 0 | 0 |
| **TOTAL** | **141** | **122** |
| **Actual files** | **161** | **143** |

### Sentences in Read.js:
- **Advanced Week 2**: 18 câu (4-8 từ/câu)
- **Easy Week 2**: 9 câu (4-9 từ/câu)

**Note**: Các tuần sau nên dài hơn (12-15 câu Adv, 10-12 câu Easy)

---

## 📝 TỆP ĐÃ CẬP NHẬT

1. **ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt**:
   - Section IV.2: read.js schema
   - Section IV.3: vocab.js audio note
   - Section IV.6: word_power.js audio note
   - Section IV.7: grammar.js mandatory ratio
   - Section IX.2: Audio naming convention
   - Section IX.3: Total audio count summary (NEW)

2. **tools/count_audio_urls.js**:
   - Cập nhật vocab: × 4
   - Cập nhật word_power: × 5
   - Thêm thông tin actual file count

3. **docs/CORRECTIONS_FOR_PROMPT_V28.md**:
   - Tài liệu chi tiết tất cả thay đổi
   - Phục vụ tham khảo nhanh

---

## ✅ VALIDATION CHECKLIST MỚI

Khi validate Week 3+, phải kiểm tra:

1. **Read.js structure**:
   - [ ] 12-15 câu (Advanced) hoặc 10-12 câu (Easy)
   - [ ] Mỗi câu >= 6 từ (Adv) hoặc >= 5 từ (Easy)
   - [ ] Exactly 10 bold words từ vocab.js

2. **Audio URLs**:
   - [ ] vocab.js: 10 words × 4 = 40 URLs
   - [ ] word_power.js: 3 words × 5 = 15 URLs
   - [ ] dictation.js: = read.js sentence count
   - [ ] shadowing.js: = read.js sentence count + 1
   - [ ] Total: 140-145 (Adv), 130-135 (Easy)

3. **Grammar.js ratio**:
   - [ ] 6 Affirmative (30%)
   - [ ] 6 Negative (30%)
   - [ ] 8 Questions (40%)

4. **Dictation/Shadowing sync**:
   - [ ] Số câu match read.js exactly
   - [ ] Không hard-code số lượng

---

## 🎯 HÀNH ĐỘNG TIẾP THEO

1. **Áp dụng cho Week 3**:
   - Tạo read.js với 12-15 câu (Adv), 10-12 câu (Easy)
   - Script tự động sync dictation/shadowing
   - Validate audio count: 140+ (Adv), 130+ (Easy)

2. **Cập nhật validation script** (nếu chưa):
   ```bash
   node tools/validate_week.js 3
   ```
   Phải check:
   - Read sentence count
   - Audio URL count per file
   - Total audio count per mode
   - Grammar ratio

3. **Test mass production**:
   ```bash
   bash tools/mass_production_final.sh 3
   ```
   Xác nhận audio generation tạo đủ files (vocab × 4, wordpower × 5)

---

**Ngày cập nhật**: 16/01/2026  
**Phiên bản Prompt**: V28-RECAST-FIX  
**Trạng thái**: ✅ HOÀN THÀNH
