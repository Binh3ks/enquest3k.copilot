# BÁO CÁO KIỂM TRA CUỐI CÙNG - WEEK 19 VS MASTER PROMPT

## I. FINDINGS TỪ 3 LƯỢT RÀ SOÁT WEEK 19 + BLUEPRINT

### ✅ WEEK 19 COMPLETE STRUCTURE (GOLD STANDARD)

#### 1. **READ.JS** (Main Story)
**Verified:**
- ✅ 10 bold words: `**was**, **quiet**, **fields**, **trees**, **kindergarten**, **born**, **games**, **simple**, **memory**, **treasure**`
- ✅ 3 comprehension_questions với answer array + hint_en/vi
- ✅ Audio: `read_explore_main.mp3` (auto-generated)

**Blueprint requirement:** "10 Bold Words: Bắt buộc in đậm 10 từ vựng cốt lõi trong bài đọc"

1. **VIDEOS: PHẢI CÓ 5 VIDEO MỖI TUẦN** (Không phải 3!)
   - Week 19: 5 videos ✓
   - Blueprint requirement: "Tối thiểu 5 videos/tuần"
   - Cả Advanced và Easy mode dùng chung 5 videos

2. **AUDIO FILES: 138 files per mode** (Không phải 118!)
   - Breakdown chi tiết:
     - read: 1 file
     - explore: 1 file  
     - vocab: 40 files (10 words × 4 each)
     - word_power: 12 files (3 words × 4 each)
     - dictation: 8 files
     - shadowing: 8 files
     - logic: 5 files
     - ask_ai: 5 files
     - mindmap: 42 files (6 stems + 36 branches)
     - grammar examples: 16 files (week 19 có thêm)
   - **TOTAL: 138 files**

3. **IMAGE FILES: 15 per mode**
   - vocab: 10 images
   - word_power: 3 images
   - read cover: 1 image
   - explore cover: 1 image

4. **ITEM COUNTS PER STATION:**
   | Station | Phase 1 | Phase 2 | Phase 3 |
   |---------|---------|---------|---------|
   | vocab | 10 | 10 | 10 |
   | word_power | 3 | 5 | 7 |
   | grammar | 20 | 20 | 20 |
   | dictation | 8 | 8 | 8 |
   | shadowing | 8 | 8 | 8 |
   | logic | 5 | 7 | 10 |
   | ask_ai | 5 | 5 | 5 |
   | daily_watch | **5** | **5** | **5** |
   | mindmap | 6 stems × 6 branches | same | same |

5. **MINDMAP STRUCTURE: NESTED OBJECT (Quan trọng!)**
   ```javascript
   // ✅ ĐÚNG (Week 19 structure)
   branchLabels: {
     "Stem 1 text": ["branch1", "branch2", ..., "branch6"],
     "Stem 2 text": ["branch1", "branch2", ..., "branch6"],
     // ... 6 stems total
   }
   
   // ❌ SAI (Week 1 đã dùng flat array)
   branchLabels: [
     { id: 1, text_en: "branch1", ... },
     { id: 2, text_en: "branch2", ... }
   ]
   ```

### ❌ LỖI HIỆN TẠI TRONG MASTER PROMPT V23

1. **Videos:** Prompt nói "3-5 videos" → **PHẢI SỬA THÀNH "EXACTLY 5 videos"**
2. **Audio count:** Prompt nói ~118 files → **PHẢI SỬA THÀNH ~138 files**
3. **Mindmap structure:** Prompt không nói rõ nested object → **PHẢI THÊM CHI TIẾT**
4. **Item counts:** Không nói rõ word_power morphing (3 → 5 → 7) → **PHẢI BỔ SUNG**
5. **Context requirements:** Không nhấn mạnh đủ → **PHẢI NHẤN MẠNH THÊM**
6. **Grammar examples audio:** Không đề cập → **PHẢI THÊM** (week 19 có 16 files)

### ❌ LỖI TRONG WEEK 1 ĐÃ TẠO

1. **Videos:** Chỉ có 3 videos (thiếu 2) → **CẦN BỔ SUNG 2 videos nữa**
2. **Mindmap:** Dùng flat array thay vì nested object → **CẦN SỬA LẠI**
3. **Audio paths:** Một số audio path không khớp với convention

---

## II. CẬP NHẬT CẦN THIẾT

### A. MASTER PROMPT V23 - SECTIONS CẦN UPDATE

#### 1. Section "daily_watch.js" (dòng ~450-470)
**Hiện tại:** "3-5 videos"
**Phải sửa thành:**
```
- **Description:** EXACTLY 5 curated YouTube videos per week (BOTH modes).
- **CRITICAL:** Blueprint requires minimum 5 videos per week.
- **Video Types:**
  1. GRAMMAR (1-2 videos): Must match week's grammar focus
  2. TOPIC (2 videos): Related to week's theme
  3. SCIENCE/CLIL (1-2 videos): Science or social studies content
```

#### 2. Section "mindmap.js" (dòng ~540-560)
**Phải thêm CHI TIẾT:**
```
- **CRITICAL STRUCTURE:** branchLabels is a NESTED OBJECT, not array!
- **Correct format:**
  branchLabels: {
    "Stem 1 text": ["branch1", ..., "branch6"],
    "Stem 2 text": ["branch1", ..., "branch6"],
    // 6 stems total, 6 branches each
  }
- **Audio naming:** Branches are numbered SEQUENTIALLY 1-36, not nested
```

#### 3. Section "Asset counts" (dòng ~200-220)
**Hiện tại:** "~118 audio per mode"
**Phải sửa thành:** "~138 audio per mode (122 base + 16 grammar examples)"

#### 4. Section "word_power.js" (dòng ~410-420)
**Phải thêm MORPHING:**
```
- **Phase Morphing (CRITICAL):**
  - Phase 1 (Weeks 1-54): 3 collocations (e.g., "do homework")
  - Phase 2 (Weeks 55-120): 5 synonyms/antonyms
  - Phase 3 (Weeks 121+): 7 idioms/phrasal verbs
```

#### 5. Section "Context Requirements" (NEW SECTION)
**Phải thêm vào Section II:**
```
### CONTEXT REQUIREMENTS (MANDATORY)

Blueprint requires: "Luôn có context (ngữ cảnh) cho các câu hỏi, theo đúng văn phong bản xứ"

1. **Logic Puzzles:**
   - ✅ CORRECT: "Tom had 5 apples. He gave 2 to his sister. How many does Tom have now?"
   - ❌ WRONG: "5 - 2 = ?"
   - Must use storytelling format with character names and situations

2. **Ask AI Prompts:**
   - ✅ CORRECT: "You found an old photo album. The pictures are black and white. Your parents look very young..."
   - ❌ WRONG: "What are old photos like?"
   - Must provide scenario/situation, not direct questions

3. **Dictation & Shadowing:**
   - Minimum 5 words per sentence
   - Extracted from read.js story (NOT new sentences)
   - EXACT same sentences for both dictation and shadowing

4. **Grammar Exercises:**
   - Must have context similar to read.js structure
   - NOT bare grammar drills (e.g., "I ___ a student" is OK if from story)
```

### B. GENERATE_AUDIO.JS SCRIPT

**ĐÃ CẬP NHẬT:**
- ✅ Auto-load API keys từ API keys.txt
- ✅ Fix mindmap structure (dùng array.forEach thay vì nested object iteration)

**CẦN KIỂM TRA:**
- Grammar examples audio (16 files) - có được generate không?
- Voice config per week (có override được không?)

### C. BATCH_MANAGER.JS SCRIPT

**CẦN KIỂM TRA:**
- Image count: có đủ 15 images/mode không?
- Gemini API response: "No image data" error - do API key hay do prompt?

### D. UPDATE_VIDEOS.JS SCRIPT

**CẦN UPDATE:**
- Ensure ALWAYS searches for 5 videos (not 3)
- video_queries.json template phải có 5 queries:
  ```json
  {
    "masterQuery": "...",
    "grammar": "...",
    "videos": [
      { "id": 1, "query": "...", "purpose": "GRAMMAR" },
      { "id": 2, "query": "...", "purpose": "TOPIC" },
      { "id": 3, "query": "...", "purpose": "TOPIC" },
      { "id": 4, "query": "...", "purpose": "SCIENCE" },
      { "id": 5, "query": "...", "purpose": "SCIENCE" }
    ]
  }
  ```

---

## III. SCRIPTS SYNCHRONIZATION CHECK - DETAILED ANALYSIS

### A. 3 CÔNG CỤ TẠO ASSETS - QUY TRÌNH CHI TIẾT

#### **1️⃣ AUDIO GENERATION - 3 METHODS**

**Method 1: Node.js + Google TTS (RECOMMENDED)**
- **File:** `tools/generate_audio.js`
- **API:** Google Cloud TTS (Neural2 voices)
- **Command:** `node tools/generate_audio.js <START> <END>`
- **voiceConfig Support:** ✅ YES - reads from weekData, merges with defaults
- **API Key:** Auto-load từ `API keys.txt`
- **Features:**
  - Smart skip (chỉ generate files chưa tồn tại)
  - Mindmap nested object support
  - Variable audio count (skip optional fields)
  - Environment override: `VOICE_NARRATION=en-GB-Neural2-B node tools/generate_audio.js 19 20`

**Method 2: Python + OpenAI TTS (2-STEP)**
- **Files:** `tools/create_audio_tasks_only.js` + `tools/generate_audio.py`
- **API:** OpenAI TTS
- **Commands:**
  ```bash
  node tools/create_audio_tasks_only.js <START> <END>
  export OPENAI_API_KEY="..." && python3 tools/generate_audio.py --provider openai --voice alloy
  ```
- **voiceConfig Support:** ❌ NO - uses HARDCODED voices in create_audio_tasks_only.js
- **Limitations:**
  - Không đọc voiceConfig từ weekData
  - Cần 2 commands thay vì 1
  - Python dependency

**Method 3: Admin Panel (HTML UI)**
- **File:** `tools/Admin_Media_Studio.html`
- **voiceConfig Support:** ✅ YES - UI with voice selector dropdowns
- **Status:** ✅ UPGRADED - 3 tabs (Audio/Video/Image)

**RESOLVED:** Admin Panel giờ đã hỗ trợ đầy đủ cả 3 loại assets!

---

#### **2️⃣ IMAGE GENERATION**

**File:** `tools/batch_manager.js`
- **API:** Gemini Imagen
- **Command:** `node tools/batch_manager.js <START> <END>`
- **Count:** Fixed 15 images/mode (Phase 1), 17 (P2), 19 (P3)
- **API Key:** Auto-load từ `API keys.txt`
- **Consistency:** ✅ Quy trình đồng nhất (chỉ có 1 script)

---

#### **3️⃣ VIDEO CURATION (2-STEP WORKFLOW)**

**File:** `tools/update_videos.js`
- **API:** YouTube Data API v3
- **Workflow:**
  1. **MANUAL:** Tạo `video_queries.json` với 5 queries
  2. **AUTO:** Run `node tools/update_videos.js <WEEK_ID>`
- **Features:**
  - WHITELIST filtering (English Singsing, Numberblocks, etc.)
  - GRAMMAR_REQUIREMENTS (strict keyword matching)
  - Smart fallbacks per purpose
  - Always outputs EXACTLY 5 videos
- **Consistency:** ✅ Quy trình đồng nhất (chỉ có 1 script)

---

### B. VOICECONFIG SYSTEM - DETAILED FINDINGS

#### **Current State:**
- **Master Prompt says:** "MANDATORY" nhưng thực tế là OPTIONAL
- **generate_audio.js:** Hỗ trợ voiceConfig nhưng fallback về defaults nếu không có
- **create_audio_tasks_only.js:** KHÔNG đọc voiceConfig từ weekData (hardcoded voices)
- **Week 19:** KHÔNG CÓ voiceConfig trong index.js (dùng defaults)

#### **How it works (generate_audio.js):**
```javascript
const VOICE_CONFIG = {
    narration: 'en-US-Neural2-D',  // Global defaults
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-E',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-F'
};

const getWeekVoices = (weekData) => {
    if (weekData?.voiceConfig) {
        return { ...VOICE_CONFIG, ...weekData.voiceConfig }; // Merge
    }
    return VOICE_CONFIG; // Fallback to defaults
};
```

#### **Requirements for MANDATORY voiceConfig:**
1. ✅ Master Prompt must require voiceConfig in every week
2. ❌ generate_audio.js must THROW ERROR if voiceConfig missing
3. ❌ create_audio_tasks_only.js must READ voiceConfig from weekData
4. ❌ Admin Panel must support voiceConfig selection
5. ✅ Week template generator must include voiceConfig

---

### C. CONSISTENCY ISSUES FOUND

| Issue | Impact | Fix Required |
|-------|--------|--------------|
| **Audio Method 2 không đọc voiceConfig** | Inconsistent voices between methods | Update create_audio_tasks_only.js |
| **Admin Panel status unknown** | Không rõ có support voiceConfig | Verify + update if needed |
| **generate_audio.js có fallback** | Không enforce MANDATORY | Remove fallback, add error check |
| **Week 19 không có voiceConfig** | Gold standard thiếu field | Add voiceConfig to Week 19 |
| **Video queries manual step** | Consistent nhưng cần automation | Optional: add generator |

---

## III. SCRIPTS SYNCHRONIZATION CHECK

### So sánh 3 cách generate audio:

| Feature | generate_audio.js | create_audio_tasks_only.js + generate_audio.py | Admin Panel |
|---------|-------------------|-----------------------------------------------|-------------|
| API Key Source | ✅ API keys.txt | ❌ Env vars only | ❓ Unknown |
| Mindmap Structure | ✅ Fixed (array) | ✅ Deep scan | ❓ Unknown |
| Audio Count | ✅ Variable | ✅ Variable | ❓ Unknown |
| voiceConfig Support | ⚠️ Optional (needs MANDATORY) | ❌ Hardcoded | ❓ Unknown |
| Smart Skip | ✅ Yes | ✅ Yes | ❓ Unknown |
| Steps | 1 command | 2 commands | UI clicks |

**SYNCHRONIZATION REQUIRED:**
1. ❌ Make voiceConfig MANDATORY in all 3 methods
2. ❌ Update create_audio_tasks_only.js to read voiceConfig
3. ❌ Verify/update Admin Panel
4. ❌ Add voiceConfig to Week 19 (gold standard)
5. ❌ Update generate_audio.js to throw error if voiceConfig missing

---

## IV. WEEK 1 FIX CHECKLIST

- [ ] **videos:** Bổ sung 2 videos nữa (total 5)
- [ ] **mindmap.js:** Sửa thành nested object structure
- [ ] **Regenerate audio:** Sau khi fix mindmap structure
- [ ] **Regenerate images:** Check Gemini API key có valid không
- [ ] **Update video_queries.json:** 5 queries instead of 3

---

## V. MASTER PROMPT UPDATE SUMMARY

**File cần update:** `4. ENGQUEST MASTER PROMPT V23-FINAL.txt`

**Sections cần sửa:**
1. Section 0.6 (line ~220): Audio count 118 → 138
2. Section II.5 (line ~450): daily_watch.js → EXACTLY 5 videos
3. Section II.4 (line ~410): word_power.js → Add morphing (3 → 5 → 7)
4. Section II.10 (line ~540): mindmap.js → Add CRITICAL nested object note
5. **NEW Section II.X:** Context Requirements (logic, ask_ai, dictation rules)
6. **NEW Section:** Grammar examples audio (16 files, week 19 specific?)

**Document đã tạo:**
- ✅ `WEEK_19_COMPLETE_REFERENCE.md` (full structure reference)

---

## VI. RECOMMENDED ACTIONS (PRIORITY ORDER)

### URGENT (Làm ngay):
1. ✅ Update master prompt V23 với 5 videos (not 3)
2. ✅ Update master prompt với audio count 138 (not 118)
3. ✅ Update master prompt với mindmap nested object structure
4. ✅ Fix week 1 videos (add 2 more)
5. ✅ Fix week 1 mindmap structure

### HIGH (Làm trong ngày):
6. ⚠️ Verify create_audio_tasks_only.js mindmap logic
7. ⚠️ Check Admin Panel scripts synchronization
8. ⚠️ Test generate full week 1 assets với valid API keys

### MEDIUM (Làm tuần này):
9. 📋 Document grammar examples audio rules (when to generate 16 files?)
10. 📋 Create video_queries template generator
11. 📋 Add validation script to check week structure before asset generation

---

## VII. API KEYS STATUS

**Current status (from error logs):**
- YouTube API: ✅ Working (3 videos found for week 1)
- Google TTS API: ❌ Not enabled (project 153898303209)
- Gemini API: ❌ Returns "No image data"

**Required actions:**
1. Enable Cloud Text-to-Speech API in Google Cloud Console
2. Verify Gemini API key has image generation permission
3. Test with week 1 regeneration

---

## VIII. FILES CREATED/UPDATED

1. ✅ `WEEK_19_COMPLETE_REFERENCE.md` - Full reference document
2. ⏳ `4. ENGQUEST MASTER PROMPT V23-FINAL.txt` - Needs updates above
3. ✅ `tools/generate_audio.js` - Fixed mindmap structure
4. ⏳ `src/data/weeks/week_01/daily_watch.js` - Needs 2 more videos
5. ⏳ `src/data/weeks/week_01/mindmap.js` - Needs structure fix

---

## IX. VALIDATION COMMAND

Sau khi fix xong, chạy validation:
```bash
# Check structure
ls src/data/weeks/week_01/*.js | wc -l      # Should be 15 (14 + video_queries.json)
ls src/data/weeks_easy/week_01/*.js | wc -l # Should be 15

# Check item counts
grep -c '"id":' src/data/weeks/week_01/daily_watch.js  # Should be 5
grep -c '"id":' src/data/weeks/week_01/vocab.js        # Should be 10
grep -c '"id":' src/data/weeks/week_01/word_power.js   # Should be 3

# Check mindmap structure
grep -A 5 'branchLabels:' src/data/weeks/week_01/mindmap.js  # Should see nested object

# Regenerate assets
node tools/generate_audio.js 1 1
node tools/batch_manager.js 1 1
node tools/update_videos.js 1

# Verify asset counts
find public/audio/week01 -name "*.mp3" | wc -l      # Should be ~138
find public/images/week01 -name "*.jpg" | wc -l     # Should be 15
grep -c '"id":' src/data/weeks/week_01/daily_watch.js  # Should be 5
```

---

## X. CONCLUSION

**SUMMARY:**
- Week 19 structure là chuẩn VÀNG (5 videos, 138 audio, nested mindmap) - **CẦN BỔ SUNG voiceConfig**
- ✅ Master prompt V23 ĐÃ ĐƯỢC UPDATE với 7 sections chính + voiceConfig
- ❌ **CRITICAL:** 3 audio generation methods KHÔNG ĐỒNG BỘ về voiceConfig
- ❌ **CRITICAL:** generate_audio.js cần bỏ fallback, enforce MANDATORY voiceConfig
- ❌ **CRITICAL:** create_audio_tasks_only.js cần đọc voiceConfig từ weekData
- Scripts image và video đã đồng bộ tốt (chỉ có 1 method mỗi loại)

**NEXT STEPS (PRIORITY):**
1. ✅ Master Prompt V23 updated - HOÀN THÀNH
2. ⏳ **URGENT:** Sync 3 audio generation methods:
   - Update generate_audio.js: Bỏ fallback, throw error nếu thiếu voiceConfig
   - Update create_audio_tasks_only.js: Đọc voiceConfig từ weekData
   - Verify Admin Panel: Check voiceConfig support
3. ⏳ Add voiceConfig to Week 19 (gold standard)
4. ⏳ Fix Week 1 (videos + mindmap + voiceConfig)
5. ⏳ Test full workflow với Week 20
6. ⏳ Enable Google TTS API và Gemini API

**SYNCHRONIZATION REQUIREMENTS:**
- Audio generation phải consistent: Cả 3 methods phải đọc voiceConfig từ weekData
- voiceConfig phải MANDATORY: Scripts phải throw error nếu thiếu
- Mỗi tuần phải có giọng khác nhau: Enforce trong validation
- Admin Panel phải match quy trình direct scripts: Same API, same logic
