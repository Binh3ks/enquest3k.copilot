# 🛡️ PRODUCTION LESSONS LEARNED — ALL WEEKS (Permanent Reference)

> **Mục đích:** Tổng hợp TẤT CẢ lỗi đã gặp qua các tuần sản xuất, dùng chung cho mọi tuần tương lai.  
> **Cách dùng:** Agent PHẢI đọc file này TRƯỚC khi bắt đầu production bất kỳ tuần nào.  
> **Last Updated:** March 13, 2026 (after Week 15 - COMPLETE AUDIT)

---

## 🔴 CATEGORY A: AGENT EXECUTION FAILURES (Lỗi Agent chạy mà không chạy)

### A1. Agent Báo Xong Nhưng UI Trống — File Không Thực Sự Được Tạo

**Nguồn:** Week 12, Week 13  
**Mức độ:** 🔴 CRITICAL — Mất toàn bộ thời gian session

**Triệu chứng:**
- Agent chạy hết các bước, báo cáo "✅ COMPLETE"
- Mở browser → UI trống, ko có nội dung tuần mới
- Console: `Cannot find module './week_N/read.js'` hoặc fallback về Week 7

**Nguyên nhân gốc:**
1. Agent "viết file" bằng cách mô tả nội dung thay vì thực sự tạo file trên disk
2. Agent dùng Python `print()` pipe → file bị lỗi encoding/syntax
3. Agent tạo file nhưng KHÔNG validate → lỗi syntax im lặng
4. Agent bỏ qua index.js → app không load được week data

**🚨 MANDATORY VERIFICATION — SAU MỖI BƯỚC TẠO FILE:**

```bash
# BƯỚC XÁC NHẬN BẮT BUỘC — Chạy sau khi tạo MỖI file .js:

# 1. File có tồn tại không?
ls -la src/data/weeks/week_N/read.js
# Nếu "No such file" → file CHƯA ĐƯỢC TẠO → DỪNG LẠI

# 2. File có nội dung không? (> 100 bytes cho station, > 1000 bytes cho AI Tutor)
wc -c src/data/weeks/week_N/read.js
# Nếu < 100 bytes → file rỗng hoặc stub → LÀM LẠI

# 3. Syntax có đúng không?
node -e "import('./src/data/weeks/week_N/read.js').then(m => console.log('✅ OK, keys:', Object.keys(m.default)))" 2>&1
# Nếu SyntaxError hoặc TypeError → DỪNG LẠI, SỬA TRƯỚC

# 4. Nội dung có đúng theme không?
grep -ic "THEME_KEYWORD" src/data/weeks/week_N/read.js
# Nếu 0 → nội dung vẫn là clone cũ → CHƯA SỬA NỘI DUNG
```

**Quy tắc CỨNG:**
> Sau mỗi bước tạo file, agent PHẢI chạy 4 lệnh xác nhận trên.  
> Nếu BẤT KỲ lệnh nào fail → DỪNG LẠI, SỬA, rồi mới tiếp tục.  
> KHÔNG BAO GIỜ được phép bỏ qua bước xác nhận để "tiết kiệm thời gian".

---

### A2. Python Scripts Tạo File JS Sai — BAN TUYỆT ĐỐI

**Nguồn:** Week 12  
**Mức độ:** 🔴 CRITICAL — Gây domino effect

**Vấn đề:**
- Agent dùng `python3 -c "print(...)"` hoặc Python script để tạo .js files
- Python KHÔNG THỂ validate JS syntax, encoding khác, line-wrapping sai
- File "tồn tại" nhưng `import()` → SyntaxError → app fallback về tuần cũ

**Chuỗi lỗi domino:**
```
Python tạo file JS lỗi syntax
  → import() crash
  → Build fails hoặc fallback Week 7
  → AI Tutor hiện nội dung tuần cũ
  → Tất cả station bị ảnh hưởng
  → Launch bị delay, hotfix khẩn cấp
```

**Quy tắc:**
```bash
# ❌ CẤM TUYỆT ĐỐI:
python3 -c "print('export default...')" > file.js
python3 script.py > file.js

# ✅ BẮT BUỘC dùng Node.js:
node -e "const fs=require('fs'); fs.writeFileSync('file.js', content)"
# HOẶC clone từ golden standard rồi sửa
```

---

### A3. Clone Golden Standard Nhưng Không Sửa Nội Dung

**Nguồn:** Week 13  
**Mức độ:** 🔴 CRITICAL — Tuần mới hiện nội dung tuần cũ

**Triệu chứng:**
- File tồn tại, syntax OK, nhưng nội dung vẫn là Week 6/7
- Ask AI, Explore, Games, Conversation Cards chứa nội dung tuần cũ
- Audio đã generate cho nội dung cũ → tất cả sai

**Phòng tránh:**
```bash
# SAU KHI clone + sửa tất cả file, chạy:
for f in src/data/weeks/week_N/*.js; do
  count=$(grep -icE "THEME_WORD_1|THEME_WORD_2|THEME_WORD_3" "$f")
  echo "$f: $count matches"
done
# File nào = 0 matches → NỘI DUNG CHƯA ĐƯỢC SỬA!
# Ví dụ Week 13 (Daily Routines): grep "routine|daily|morning|breakfast"
```

---

### A4. Agent Không Tạo Easy Mode Files Trong Lượt Đầu

**Nguồn:** Week 15 (first production run)  
**Mức độ:** 🔴 CRITICAL — Easy mode hoàn toàn không load

**Triệu chứng:**
- Agent báo cáo "✅ Week 15 COMPLETE" 
- Advanced mode: 100% hoạt động, tất cả stations load đúng
- Easy mode: UI trống hoàn toàn, không có content gì
- Console: "Cannot find module './weeks_easy/week_15/read.js'" hoặc fallback về Week 7

**Nguyên nhân gốc:**
1. Agent chỉ focus vào Advanced mode (`src/data/weeks/week_N/`)
2. Quên HOÀN TOÀN folder Easy mode (`src/data/weeks_easy/week_N/`)
3. Hoặc: Clone folder nhưng không sửa nội dung (A3 applies to Easy too)
4. Hoặc: Tạo 1 vài files nhưng thiếu index.js (B1)

**🚨 MANDATORY CHECKLIST - EASY MODE:**

```bash
# BƯỚC 1: Verify folder tồn tại
ls -la src/data/weeks_easy/week_N/
# Expected: 15 files (14 stations + index.js)

# BƯỚC 2: Count files
ls src/data/weeks_easy/week_N/*.js | wc -l
# Expected: 15 (NOT 0, NOT 14)

# BƯỚC 3: Verify index.js exists
test -f src/data/weeks_easy/week_N/index.js && echo "✅ index.js exists" || echo "❌ MISSING index.js"

# BƯỚC 4: Test import syntax
node -e "import('./src/data/weeks_easy/week_N/read.js').then(m => console.log('✅ Easy read.js OK'))"
# If error → syntax issue

# BƯỚC 5: Check content là Easy mode (KHÔNG phải copy Advanced)
grep -c "I " src/data/weeks_easy/week_N/read.js
# Easy mode: first-person (I, my, we)
# Advanced mode: third-person (There is, The park, etc.)
# If Easy has "There is" without "I" → WRONG, copied from Advanced

# BƯỚC 6: Verify trong browser
# Navigate to Week N → Switch to EASY MODE toggle
# All 14 stations must load (not "Station unavailable")
```

**Common Mistakes:**

❌ **Mistake #1: Chỉ tạo Advanced mode**
```bash
# Agent làm:
cp -r src/data/weeks/week_06/ src/data/weeks/week_15/
# Edit files in src/data/weeks/week_15/
# ✅ Done!

# Thiếu:
cp -r src/data/weeks_easy/week_06/ src/data/weeks_easy/week_15/
# Edit files với Easy mode content requirements
```

❌ **Mistake #2: Clone Easy nhưng không sửa**
```bash
# Agent làm:
cp -r src/data/weeks_easy/week_06/ src/data/weeks_easy/week_15/
# Báo "Done!"

# Nhưng files vẫn chứa Week 6 content (A3 violation)
# Phải sửa TỪNG FILE với Week 15 content
```

❌ **Mistake #3: Tạo 14 files, thiếu index.js**
```bash
# Agent tạo:
vocab.js, word_power.js, read.js, ... (14 files)

# Thiếu:
index.js  # ← CRITICAL, app không load được week
```

**Prevention Workflow:**

1. **Generate Advanced mode FIRST** (với 100% validation)
2. **Then generate Easy mode SEPARATELY** (đừng copy/paste)
3. **Validate BOTH modes** trước khi báo "Done"
4. **Test BOTH modes** trong browser

**Quick Validation Script:**
```bash
#!/bin/bash
WEEK=$1

echo "🔍 Validating Week $WEEK - BOTH MODES..."

# Advanced mode
ADV_COUNT=$(ls src/data/weeks/week_$WEEK/*.js 2>/dev/null | wc -l)
echo "Advanced files: $ADV_COUNT (expected: 15)"

# Easy mode
EASY_COUNT=$(ls src/data/weeks_easy/week_$WEEK/*.js 2>/dev/null | wc -l)
echo "Easy files: $EASY_COUNT (expected: 15)"

if [ $ADV_COUNT -ne 15 ] || [ $EASY_COUNT -ne 15 ]; then
  echo "❌ FAIL: Files missing!"
  exit 1
fi

# Test imports
node -e "import('./src/data/weeks/week_$WEEK/read.js').then(() => console.log('✅ Advanced read.js OK'))" || exit 1
node -e "import('./src/data/weeks_easy/week_$WEEK/read.js').then(() => console.log('✅ Easy read.js OK'))" || exit 1

echo "✅ PASS: Both modes validated"
```

**Week 15 Impact:**
- First run: ❌ Easy mode files NOT created → User reported "Easy ko load gì cả"
- Subsequent fixes: ✅ Files created, but had other bugs (C4 schema, C5 definitions)
- Lesson: ALWAYS validate BOTH modes before reporting "Complete"

---

## 🟠 CATEGORY B: STRUCTURE & FILE ERRORS

### B1. Thiếu index.js — Week Không Load Được

**Nguồn:** Week 13  
**Mức độ:** 🔴 CRITICAL

**Vấn đề:** Mỗi mode cần **15 files** (14 stations + 1 index.js), KHÔNG PHẢI 14.  
index.js chứa voiceConfig, weekTitle, và import tất cả stations.

**Phòng tránh:**
```bash
# Sau khi tạo 14 stations, LUÔN copy index.js:
cp src/data/weeks/week_06/index.js src/data/weeks/week_N/index.js
cp src/data/weeks_easy/week_06/index.js src/data/weeks_easy/week_N/index.js
# Rồi sửa: weekTitle, voiceConfig, import paths
```

### B2. UI Imports Thiếu — Week Hiện Fallback Content

**Nguồn:** Week 12  
**Mức độ:** 🔴 CRITICAL

**3 files BẮT BUỘC cập nhật:**
1. `StoryMissionTab.jsx` — import + ternary
2. `FreeTalkTab.jsx` — import + ternary
3. `gameAdaptation.js` — 3 imports + 2 object entries

**Verify:**
```bash
grep -c "weekNRealData" src/modules/ai_tutor/tabs/StoryMissionTab.jsx  # = 2
grep -c "weekNRealData" src/modules/ai_tutor/tabs/FreeTalkTab.jsx      # = 2
grep -c "weekN" src/config/gameAdaptation.js                           # = 6
```

### B3. CDN_WEEKS Không Cập Nhật

**Nguồn:** Week 12  
**Mức độ:** 🟠 HIGH — Audio fallback về browser TTS

```bash
# Cập nhật voiceService.js:
# const CDN_WEEKS = [1,2,3,4,...,N]; ← thêm N mới
```

### B4. story_arc Format Mixed — AI Tutor Crash

**Nguồn:** Week 12  
**Mức độ:** 🔴 CRITICAL

- Không bao giờ MIX format cũ (có `turns: "1-4"`) với format mới (chỉ `phase_questions`)
- Tất cả phases trong 1 mission phải CÙNG format

```bash
node -e "
import('./src/data/weeks/week_N_real.js').then(m => {
  m.default.missions.forEach((mission, i) => {
    const all = mission.story_arc.every(p => p.turns);
    const none = mission.story_arc.every(p => !p.turns);
    console.log('Mission', i+1, all||none ? '✅' : '❌ MIXED FORMAT');
  });
});
"
```

### B5. opening_narrative = phase_questions[0] — Hỏi trùng

**Nguồn:** Week 12  
**Mức độ:** 🟠 HIGH

- `opening_narrative` = câu hỏi mở đầu (turn 0)
- `phase_questions[0]` = câu hỏi TIẾP THEO sau khi học sinh trả lời
- Hai cái PHẢI KHÁC NHAU

---

### B6. metadata.js Không Cập Nhật — Sidebar Hiện "Week N" Generic

**Nguồn:** Week 13, Week 14, **Week 15**  
**Mức độ:** 🟠 HIGH — Ảnh hưởng UX nghiêm trọng, tái diễn nhiều lần

**Triệu chứng:**
- Agent tạo xong tuần N, tất cả file tồn tại, app chạy OK
- Nhưng sidebar hiển thị "Week N" (generic) thay vì theme title
- Ví dụ: 
  - Week 14: Hiển thị "Week 14" thay vì "Welcome to My World (Project Showcase)"
  - **Week 15: Hiển thị "Week 15" thay vì "The Busy Park (Actions Now)"** ← TÁI DIỄN

**Nguyên nhân gốc:**
- Agent cập nhật `week_N_real.js` với `week_title_en` đầy đủ
- Nhưng QUÊN cập nhật `src/data/weeks/metadata.js`
- Sidebar load từ metadata.js (lazy loading), KHÔNG load từ week_N_real.js

**File cần sửa:**
```javascript
// File: src/data/weeks/metadata.js
export const weekTitles = {
  // ... existing weeks ...
  14: { 
    title_en: "Welcome to My World (Project Showcase)",  // ← Phải lấy từ syllabus
    title_vi: "Chào mừng đến Thế giới của Tôi" 
  },
};
```

**Phòng tránh:**
```bash
# 🚨 MANDATORY: Sau khi tạo week_N_real.js, LUÔN LUÔN xác nhận metadata.js:
grep -A 1 "  N:" src/data/weeks/metadata.js | grep "title_en"
# Expected: Shows proper theme (NOT "Week N")

# Nếu vẫn là "Week N", sửa metadata.js:
# 1. Đọc theme từ syllabus
grep "Week N:" "1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt"
# Example output for Week 15:
# "Week 15: The Busy Park (Actions Now) (Tuần 15: Công viên Bận rộn - Hành động ngay lúc này)"

# 2. Cập nhật metadata.js với title_en + title_vi
vim src/data/weeks/metadata.js
# Change:
# 15: { title_en: "Week 15", title_vi: "Tuần 15" },
# To:
# 15: { title_en: "The Busy Park (Actions Now)", title_vi: "Công viên Bận rộn" },

# 3. Verify lại bằng grep command trên
grep -A 1 "  15:" src/data/weeks/metadata.js
# Should show: title_en: "The Busy Park (Actions Now)"
```

**🚨 AUTOMATED VALIDATION - RUN BEFORE COMMIT:**
```bash
#!/bin/bash
WEEK=$1

echo "🔍 Validating metadata.js for Week $WEEK..."

# Check if metadata has proper theme (NOT "Week N")
TITLE=$(grep -A 1 "  $WEEK:" src/data/weeks/metadata.js | grep title_en | grep -v "Week $WEEK")

if [ -z "$TITLE" ]; then
  echo "❌ FAIL: metadata.js still shows generic 'Week $WEEK'"
  echo "Expected: Theme from syllabus"
  echo "Found:"
  grep -A 1 "  $WEEK:" src/data/weeks/metadata.js
  exit 1
fi

echo "✅ PASS: metadata.js has proper theme"
echo "$TITLE"
```

**Impact:**
- ❌ Sidebar navigation hiển thị generic "Week N" thay vì theme
- ❌ UX degradation: Users không biết tuần này học gì
- ❌ Navigation inefficient: Phải click vào mới biết content
- ✅ App vẫn chạy OK (không crash)
- ✅ Content tuần vẫn đúng (chỉ title sai)

**Week 15 Status:** 
- First production: ❌ FAILED (showed "Week 15")
- Fixed: March 13, 2026 (updated to "The Busy Park (Actions Now)")
- Lesson: Lỗi này TÁI DIỄN Week 13 → 14 → 15, cần automated check

---

## 🟡 CATEGORY C: CONTENT QUALITY ERRORS

### C1. Easy Mode = Copy Advanced Mode

**Nguồn:** Week 12  
**Mức độ:** 🟠 HIGH

- Easy mode PHẢI có nội dung ĐỘC LẬP (personal context), KHÔNG copy Advanced (school context)
- First sentence phải KHÁC nhau giữa 2 mode
- Vocabulary tier: Easy = Tier 1 (concrete), Advanced = Tier 2/3 (abstract)

### C2. Dictation/Shadowing Không Copy Từ read.js

**Nguồn:** Week 12  
**Mức độ:** 🟠 HIGH

- dictation.js câu 1 PHẢI = read.js câu 1 (CHÍNH XÁC)
- shadowing.js câu 1 PHẢI = read.js câu 1
- Tự viết câu mới = SAI

### C3. Daily Watch — VideoId Giả/Không Tồn Tại

**Nguồn:** Week 13, Week 15  
**Mức độ:** 🔴 CRITICAL — Videos không chạy, gray thumbnails

**Triệu chứng:**
- Gray thumbnails thay vì colored thumbnails
- Videos không play khi click
- Console error: "Video unavailable" hoặc "Playback ID invalid"

**Nguyên nhân gốc:**
1. Agent bịa videoId thay vì tìm video thật trên YouTube
2. Agent copy videoId từ tuần cũ mà không validate
3. Agent KHÔNG RUN `update_videos.js` script → dùng placeholder IDs
4. Queries trong `video_queries.json` SAI → script tìm video không đúng

**🚨 MANDATORY WORKFLOW — NEVER MANUALLY EDIT DAILY_WATCH.JS:**

```bash
# ❌ CẤM TUYỆT ĐỐI:
# - Tự nghĩ ra videoId
# - Copy videoId từ tuần khác
# - Manually edit daily_watch.js

# ✅ BẮT BUỘC:
# 1. Tạo video_queries.json với queries CỤ THỂ
# 2. Run script để tìm videos thật từ YouTube API
node tools/update_videos.js N --reset

# 3. VALIDATE MỌI VIDEO trong browser TRƯỚC KHI COMMIT
```

**Video Queries Construction Rules (CRITICAL):**

Mỗi query PHẢI kết hợp ĐỦ 3 YẾU TỐ:

1. **Grammar Focus** (ngữ pháp tuần đang học)
   ```
   Week 15 (Present Continuous):
   ✅ "present continuous", "what are you doing", "I am V-ing"
   ❌ "actions", "verbs" (quá chung, có thể match past/future)
   ```

2. **Theme Keywords** (chủ đề của tuần)
   ```
   Week 15 (Park):
   ✅ "park", "playground", "playing outside"
   ❌ "outdoor" (quá chung, match beach/zoo/camping)
   ```

3. **Target Audience** (LUÔN BẮT BUỘC)
   ```
   ✅ "ESL", "for kids", "children", "primary school"
   ❌ Thiếu keywords này → match video người lớn
   ```

**✅ CORRECT Query Examples (Week 15):**

```json
{
  "id": 1,
  "purpose": "GRAMMAR",
  "priority_search": "English Singsing present continuous what are you doing ESL for kids",
  "backup_search": "British Council Learn English Kids present continuous grammar",
  "target_channel": "English Singsing"
}

{
  "id": 2,
  "purpose": "GRAMMAR",  
  "priority_search": "English Singsing present progressive action verbs running playing ESL",
  "backup_search": "British Council what are they doing present continuous kids",
  "target_channel": "English Singsing"
}

{
  "id": 3,
  "purpose": "STORY",
  "priority_search": "Little Fox story park playing friends kids",
  "backup_search": "Vooks playground story kids friends",
  "target_channel": "Little Fox"
}
```

**❌ WRONG Query Examples (Week 15):**

```json
// SAI #1: Thiếu grammar focus
{
  "priority_search": "Super Simple Songs actions running jumping ESL kids"
  // ❌ Không có "present continuous" → match bất kỳ thì nào
  // → Kết quả: Video dùng past tense hoặc simple present
}

// SAI #2: Thiếu theme context
{
  "priority_search": "British Council present continuous actions ESL"
  // ❌ Không có "park" hoặc theme keywords
  // → Kết quả: Video về daily routines/school/family (không liên quan park)
}

// SAI #3: Query quá chung chung
{
  "priority_search": "Little Fox park story ESL for kids"
  // ❌ Không có "present continuous"
  // → Kết quả: "Camping Trip" video (dùng past tense)
}
```

**Week 15 Actual Errors:**
- Video #2: Query thiếu "present continuous" → script dùng fallback → không chạy
- Video #3: Query "park story" thiếu "present continuous" → match "Camping Trip" (past tense)
- Video #4: Query quá abstract → fallback generic "Super Simple Songs"

**Phòng tránh:**

1. **Trước khi run script:** Review video_queries.json
   ```bash
   # Check mỗi query có đủ 3 yếu tố không:
   # - Grammar keywords (present continuous, past tense, can cannot, etc.)
   # - Theme keywords (park, family, school, food, etc.)
   # - Audience keywords (ESL, kids, children, primary)
   
   cat src/data/weeks/week_N/video_queries.json | grep priority_search
   ```

2. **Sau khi run script:** Validate console output
   ```bash
   node tools/update_videos.js N --reset
   
   # Check output:
   # ✅ "⭐ Priority channel (GRAMMAR): English Singsing" = GOOD
   # ⚠️ "Using GRAMMAR fallback for #2" = BAD (query không tìm được video)
   # ⚠️ "No video for #X, trying backup" = BAD (priority search fail)
   ```

3. **Sau khi script xong:** Read daily_watch.js titles
   ```bash
   cat src/data/weeks/week_N/daily_watch.js | grep title
   
   # Validate MỖI title:
   # ✅ Có grammar keywords (present continuous, -ing, "what are you doing")
   # ✅ Có theme keywords (park, playground, playing)
   # ❌ KHÔNG có wrong grammar (past tense: "went", "was", "did")
   # ❌ KHÔNG có wrong theme (beach, zoo, camping khi theme là park)
   ```

4. **TRƯỚC KHI COMMIT:** Test MỌI video trong browser
   ```bash
   # Hard refresh browser (Cmd+Shift+R)
   # Navigate to Week N → Daily Watch
   
   # Check MỖI video (1-5):
   # [ ] Thumbnail có màu (không gray)
   # [ ] Video plays khi click
   # [ ] Nội dung đúng grammar (present continuous, không phải past)
   # [ ] Nội dung đúng theme (park activities, không phải beach/camping)
   # [ ] Age-appropriate (6-12 years, không quá easy/hard)
   ```

5. **Nếu BẤT KỲ video nào fail:** KHÔNG commit, sửa queries và re-run
   ```bash
   # Edit video_queries.json
   # Make queries MORE SPECIFIC (add more grammar + theme keywords)
   # Re-run script
   node tools/update_videos.js N --reset
   
   # Re-test in browser
   # Only commit when ALL 5 videos pass validation
   ```

**Verify VideoId Thật:**
```bash
# Test videoId works:
curl -I "https://www.youtube.com/watch?v=<videoId>" | grep "200 OK"

# Verify channel từ whitelist:
# English Singsing, Little Fox, Vooks, British Council, 
# Maple Leaf Learning, Fun Kids English, SciShow Kids, etc.
```

**Target Channels by Purpose:**
- **GRAMMAR**: English Singsing (⭐ priority), British Council
- **STORY**: Little Fox (⭐ priority), Vooks (⭐ priority)
- **VOCABULARY**: British Council, Maple Leaf Learning, Fun Kids English
- **SCIENCE**: SciShow Kids, National Geographic Kids

**Checklist Before Commit:**
- [ ] All 5 video thumbnails show colored images (not gray)
- [ ] All 5 videos play correctly when clicked
- [ ] At least 3/5 videos from priority channels (not fallbacks)
- [ ] Titles contain grammar keywords (present continuous, -ing, etc.)
- [ ] Titles contain theme keywords (park, playground, etc.)
- [ ] No past tense videos (no "went", "was", "did" without -ing)
- [ ] No wrong theme videos (no camping/beach when theme is park)

### C4. Word Power Wrong Schema Structure — UI Stuck Loading

**Nguồn:** Week 15  
**Mức độ:** 🔴 CRITICAL — Entire station broken

**Triệu chứng:**
- Word Power shows "Loading Word Power..." forever
- UI never renders word cards
- No console errors (silent failure)

**Nguyên nhân gốc:**
Agent cloned from deprecated schema hoặc manually created wrong structure:

```javascript
// ❌ WRONG SCHEMA (deprecated):
export default {
  collocations: [  // Wrong key name
    { id: 1, word: "running fast", ... }
  ]
};

// ✅ CORRECT SCHEMA (current):
export default {
  words: [  // Correct key name
    { id: 1, word: "running fast", ... }
  ]
};
```

**Component code expects `data.words`:**
```javascript
// WordPower.jsx
if (!data || !data.words) {
  return <div>Loading Word Power...</div>;  // Infinite loading
}
```

**Phòng tránh:**

1. **LUÔN clone từ Golden Standard (Week 6)**
   ```bash
   cp src/data/weeks/week_06/word_power.js src/data/weeks/week_N/word_power.js
   ```

2. **Validate schema sau khi tạo:**
   ```bash
   # Check có key "words" không (KHÔNG phải "collocations"):
   grep -c "words:" src/data/weeks/week_N/word_power.js
   # Output phải = 1 (exactly 1 occurrence)
   
   # Check không có key "collocations" (deprecated):
   grep -c "collocations:" src/data/weeks/week_N/word_power.js
   # Output phải = 0
   ```

3. **Test import trong Node:**
   ```bash
   node -e "import('./src/data/weeks/week_N/word_power.js').then(m => {
     if (!m.default.words) throw new Error('Missing words array');
     console.log('✅ Schema valid, word count:', m.default.words.length);
   })"
   ```

4. **Verify trong browser TRƯỚC commit:**
   - Navigate to Week N → Word Power station
   - Should see 3/5/7 word cards (not "Loading...")
   - Click through each card to verify content loads

**Schema Checklist (word_power.js):**
- [ ] Top-level key = `words` (NOT `collocations`)
- [ ] Array length = 3 (Phase 1), 5 (Phase 2), 7 (Phase 3)
- [ ] Each word has 11 fields: id, word, pronunciation, cefr_level, definition_en, definition_vi, example, model_sentence, collocation, image_url, 5 audio fields
- [ ] Both Advanced and Easy modes use same schema

### C5. Vocab Definitions Identical Between Easy/Advanced Modes

**Nguồn:** Week 15  
**Mức độ:** 🟠 HIGH — Violates pedagogical Blueprint

**Triệu chứng:**
- Easy mode và Advanced mode có cùng definitions cho vocab words
- Cả 2 modes dùng dictionary-style hoặc cả 2 dùng action-based
- Học sinh không thấy sự khác biệt giữa 2 modes

**Nguyên nhân gốc:**
- Agent copy/paste definitions từ Advanced sang Easy
- Agent không hiểu Blueprint rule về definition differentiation
- Prompt không explicit về action-based vs dictionary-style

**Blueprint Rule:**

| Mode | Definition Style | Vocabulary Tier | Example |
|------|-----------------|----------------|----------|
| **Easy (A0)** | Action-based, kid-friendly<br>"You [verb]..." format | Tier 1 words only | "You sit on it." |
| **Advanced (A1)** | Simple dictionary/encyclopedia | Tier 2-3 words allowed | "A piece of furniture for sitting." |

**Week 15 Example (word: "running fast"):**
```javascript
// ❌ WRONG - Definitions giống nhau:
// Easy:
definition_en: "moving quickly on foot"  // Tier 2 vocabulary

// Advanced:
definition_en: "moving quickly on foot"  // Same as Easy

// ✅ CORRECT - Definitions khác nhau:
// Easy:
definition_en: "You move fast with your feet."  // Action-based, Tier 1

// Advanced:
definition_en: "Moving quickly on foot."  // Dictionary-style, Tier 2
```

**Validation Checklist:**

1. **Easy Mode MUST use action-based format:**
   ```bash
   # Check Easy definitions start with "You" or action verbs:
   grep 'definition_en:' src/data/weeks_easy/week_N/vocab.js | head -3
   
   # Should see patterns like:
   # - "You [verb]..."
   # - "When you [verb]..."
   # - "Something you [verb]..."
   ```

2. **Advanced Mode MUST use dictionary format:**
   ```bash
   # Check Advanced definitions are noun/verb phrases:
   grep 'definition_en:' src/data/weeks/week_N/vocab.js | head -3
   
   # Should see patterns like:
   # - "A [noun] that..."
   # - "The act of..."
   # - "Someone who..."
   ```

3. **Definitions MUST NOT be identical:**
   ```bash
   # Extract Easy definitions:
   grep 'definition_en:' src/data/weeks_easy/week_N/vocab.js > /tmp/easy_defs.txt
   
   # Extract Advanced definitions:
   grep 'definition_en:' src/data/weeks/week_N/vocab.js > /tmp/adv_defs.txt
   
   # Compare (should have differences):
   diff /tmp/easy_defs.txt /tmp/adv_defs.txt
   # If output is empty → DEFINITIONS ARE IDENTICAL → FAIL
   ```

4. **Easy Mode MUST use Tier 1 vocabulary ONLY:**
   ```bash
   # Check definitions for Tier 2+ words:
   grep -iE 'quickly|rapidly|swiftly|enormous|magnificent' src/data/weeks_easy/week_N/vocab.js
   # Should return 0 matches (these are Tier 2 words)
   ```

**Phòng tránh:**

1. **Generate Easy and Advanced SEPARATELY:**
   - DO NOT copy Advanced → Easy với find/replace
   - Generate Easy từ scratch với action-based prompt
   - Validate definitions khác nhau trước commit

2. **Use Tier 1 Word List for Easy:**
   ```
   Tier 1 allowed: you, I, it, go, run, sit, stand, eat, play, look, make, do, have, get, put, take, give, come, want, like, see, know, think, say, tell, use, work, feel, move, etc.
   
   Tier 2 FORBIDDEN in Easy: quickly, rapidly, enormous, magnificent, conduct, analyze, utilize, demonstrate, etc.
   ```

3. **Follow Format Templates:**
   ```javascript
   // Easy Mode Template:
   definition_en: "You [verb] [object]."  // Simple action
   definition_en: "Something you [verb] with."  // Tool/object
   definition_en: "When you [verb], you [result]."  // Cause-effect
   
   // Advanced Mode Template:
   definition_en: "A [noun] used for [purpose]."  // Dictionary
   definition_en: "The act of [verb]ing."  // Nominal
   definition_en: "Someone who [verb]s."  // Agent noun
   ```

**Automated Validation Script:**
```bash
#!/bin/bash
WEEK=$1

echo "📝 Validating vocab definitions for Week $WEEK..."

# Extract definitions
grep 'definition_en:' src/data/weeks/week_$WEEK/vocab.js > /tmp/adv.txt
grep 'definition_en:' src/data/weeks_easy/week_$WEEK/vocab.js > /tmp/easy.txt

# Count identical definitions
IDENTICAL=$(comm -12 <(sort /tmp/adv.txt) <(sort /tmp/easy.txt) | wc -l)

if [ $IDENTICAL -gt 0 ]; then
  echo "❌ FAIL: Found $IDENTICAL identical definitions between modes"
  echo "Review and differentiate these:"
  comm -12 <(sort /tmp/adv.txt) <(sort /tmp/easy.txt)
  exit 1
else
  echo "✅ PASS: All definitions differentiated"
fi

# Check Easy uses Tier 1
TIER2=$(grep -iEc 'quickly|rapidly|enormous|magnificent|utilize|demonstrate' src/data/weeks_easy/week_$WEEK/vocab.js)

if [ $TIER2 -gt 0 ]; then
  echo "⚠️  WARNING: Found $TIER2 Tier 2+ words in Easy mode definitions"
else
  echo "✅ PASS: Easy mode uses Tier 1 vocabulary only"
fi
```

**Run before commit:**
```bash
chmod +x tools/validate_vocab_defs.sh
./tools/validate_vocab_defs.sh 15
```

### C6. Lỗi Chính Tả trong Word Power

**Nguồn:** Week 13 ("go bed" → "go to bed")  
**Mức độ:** 🟡 MEDIUM

- Thiếu giới từ: "go bed" → "go to bed", "go school" → "go to school"
- Thiếu mạo từ: "play piano" → "play the piano"
- Sai thì: "I goes" → "I go"

### C5. Grammar.js Thiếu Phần Instruction

**Nguồn:** Week 13  
**Mức độ:** 🟡 MEDIUM

- grammar.js PHẢI có `instruction` hoặc `grammar_explanation` giải thích ngữ pháp
- Học sinh cần hiểu rule trước khi làm bài tập

### C6. phase_questions Vi Phạm Grammar Guard

**Nguồn:** Week 12  
**Mức độ:** 🟡 MEDIUM

- Nếu `grammar_guard.forbidden_structures` cấm past tense → KHÔNG được có "did", "was", "went"
- Card Mode gửi text TRỰC TIẾP → mọi lỗi ngữ pháp hiện lên cho học sinh

### C7. phase_questions Bắt Đầu Bằng ACK Words

**Nguồn:** Week 12  
**Mức độ:** 🟡 MEDIUM

- Engine TỰ ĐỘNG thêm "Great!", "Wonderful!" trước câu hỏi
- Nếu phase_questions bắt đầu bằng "Great!" → học sinh thấy "Great! Great! ..."
- KHÔNG bao giờ bắt đầu phase_questions bằng ACK words

---

## 🔵 CATEGORY D: AUDIO & TTS ERRORS

### D1. Deepgram Model Names SAI — 400 Error

**Nguồn:** Week 13  
**Mức độ:** 🔴 CRITICAL — 100% audio fail

| Role | ✅ ĐÚNG | ❌ SAI (gây 400) |
|------|---------|------------------|
| Narration | `aura-orion-en` | `aura-2-orion-en` |
| Vocabulary | `aura-asteria-en` | `aura-2-asteria-en` |
| Dictation | `aura-luna-en` | `aura-2-luna-en` |
| Questions | `aura-zeus-en` | `aura-2-zeus-en` |
| Mindmap | `aura-helios-en` | `aura-2-helios-en` |

**Phòng tránh:** Test 1 API call TRƯỚC khi chạy batch 300+ files.

### D2. Audio Bị Cắt Âm Cuối (Cutoff)

**Nguồn:** Week 13  
**Mức độ:** 🟡 MEDIUM

- Deepgram Aura cắt âm tiết cuối với từ/cụm từ ngắn
- **Đã fix trong code:** Append `. ...` trailing padding trước khi gửi API
- Fix áp dụng cả `generate_audio_deepgram.py` và `tts-worker.js`

### D3. voiceConfig Dùng Chung Voice — Không Đa Dạng

**Nguồn:** Week 13  
**Mức độ:** 🟡 MEDIUM

- index.js voiceConfig PHẢI có **5 VOICE KHÁC NHAU**
- Sai: tất cả dùng `en-US-Neural2-D` và `en-US-Neural2-F`
- Đúng: D, F, C, J, GB-B (5 giọng khác nhau)

### D4. R2 Upload Thiếu `--remote` — CDN 404

**Nguồn:** Week 12  
**Mức độ:** 🔴 CRITICAL

```bash
# ❌ wrangler mặc định upload LOCAL:
npx wrangler r2 object put ... --file=...

# ✅ PHẢI có --remote:
npx wrangler r2 object put ... --file=... --remote
```

### D5. R2 API Token Thiếu Permission — 403

**Nguồn:** Week 13  
**Mức độ:** 🟠 HIGH

- Test upload 1 file TRƯỚC khi upload 300 files
- Nếu 403 → Token thiếu R2 Object Write permission

### D6. R2 File Cũ Không Overwrite Được — 403

**Nguồn:** Week 12  
**Mức độ:** 🟡 MEDIUM

- Nếu re-upload file cũ bị 403 → set `audio_url: null` trong data file
- voiceService sẽ skip R2 → fallback Deepgram Worker (~300ms)

### D7. R2 Upload Script: `echo "y" |` Không Hoạt Động — Silent Failure

**Nguồn:** Week 14  
**Mức độ:** 🔴 CRITICAL — Exit 0 nhưng không upload gì

**Triệu chứng:**
- Chạy `echo "y" | ./tools/upload_all_audio_r2.sh 14`
- Script exit code 0 (success)
- Nhưng không có file nào được upload lên R2
- CDN trả về 404 cho tất cả audio files

**Nguyên nhân gốc:**
```bash
# Script dùng:
read -p "🚦 Start upload? (y/n): " -n 1 -r

# Agent chạy:
echo "y" | ./script.sh
# ❌ Pipe (|) KHÔNG hoạt động với read -n 1
# → $REPLY rỗng → không match [Yy] → script exit 0 (cancelled)
# → Exit code 0 (success) nhưng không upload gì!
```

**Tại sao nguy hiểm:**
- Exit code 0 → Agent tưởng thành công
- Không có error message rõ ràng
- Files không có trên CDN → app fallback về Deepgram Worker
- Phát hiện muộn (khi user test UI)

**🚨 FIX ĐÃ ÁP DỤNG:**

```bash
# Thêm --yes flag vào script:
./tools/upload_all_audio_r2.sh 14 --yes  # ✅ Skip confirmation

# Hoặc dùng here-string:
./tools/upload_all_audio_r2.sh 14 <<< "y"  # ✅ Cũng hoạt động

# KHÔNG dùng pipe:
echo "y" | ./tools/upload_all_audio_r2.sh 14  # ❌ KHÔNG hoạt động
```

**Script updated với --yes flag:**
```bash
# Parse flags
AUTO_CONFIRM=false
for arg in "$@"; do
  case $arg in
    --yes|-y)
      AUTO_CONFIRM=true
      shift
      ;;
  esac
done

# Skip confirmation if --yes
if [ "$AUTO_CONFIRM" = false ]; then
    read -p "🚦 Start upload? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Cancelled"
        exit 0
    fi
else
    echo "🚦 Auto-confirm enabled (--yes flag)"
fi
```

**Phòng tránh:**
1. LUÔN dùng `--yes` flag khi chạy upload scripts từ automation
2. Test upload 1 file trước để verify R2 connection
3. Verify files trên CDN sau upload (curl -I để check HTTP 200)
4. Đếm số files uploaded vs số files expected

**Validation sau upload:**
```bash
# 1. Đếm files uploaded vs expected
EXPECTED=$(ls public/audio/week14/*.mp3 | wc -l)
curl -s "https://cdn.../audio/week14/" | grep -c ".mp3"

# 2. Test random file
curl -I "https://cdn.../audio/week14/dictation_1.mp3" | grep "200 OK"

# 3. Check script output có "✅ Done:" không (không phải "❌ Cancelled")
```

### D8. useTTSStore ↔ voiceService Sync Broken

**Nguồn:** Week 13  
**Mức độ:** 🟠 HIGH — **Đã fix trong code**

- `useTTSStore` lưu speed vào key `tts-settings` (JSON)
- `voiceService.playAudio()` đọc key `tts_speed` (string)
- Đã fix: `setSpeed()` sync sang `localStorage.tts_speed`

---

## 📊 TỔNG HỢP — TẤT CẢ LỖI THEO MỨC ĐỘ

| # | Lỗi | Danh mục | Mức độ | Tuần phát hiện |
|---|------|----------|--------|----------------|
| A1 | Agent báo xong nhưng file không tồn tại | Execution | 🔴 Critical | W12, W13 |
| A2 | Python tạo JS file sai | Execution | 🔴 Critical | W12 |
| A3 | Clone nhưng không sửa nội dung | Execution | 🔴 Critical | W13 |
| **A4** | **Agent không tạo Easy mode files lượt đầu** | **Execution** | **🔴 Critical** | **W15** |
| B1 | Thiếu index.js | Structure | 🔴 Critical | W13 |
| B2 | Thiếu UI imports (3 files) | Structure | 🔴 Critical | W12 |
| B3 | CDN_WEEKS không cập nhật | Structure | 🟠 High | W12 |
| B4 | story_arc mixed format | Structure | 🔴 Critical | W12 |
| B5 | opening_narrative trùng phase_questions[0] | Structure | 🟠 High | W12 |
| **B6** | **metadata.js sidebar title generic** | **Structure** | **🟠 High** | **W13, W14, W15** |
| C1 | Easy mode = copy Advanced | Content | 🟠 High | W12 |
| C2 | Dictation/shadowing không copy từ read.js | Content | 🟠 High | W12 |
| C3 | Daily Watch videos không chạy/sai | Content | 🔴 Critical | W13, **W15** |
| C4 | Word Power schema sai (collocations vs words) | Content | 🔴 Critical | **W15** |
| C5 | Vocab definitions giống nhau Easy/Advanced | Content | 🟠 High | **W15** |
| C6 | Lỗi chính tả word_power | Content | 🟡 Medium | W13 |
| C7 | Grammar thiếu instruction | Content | 🟡 Medium | W13 |
| C8 | phase_questions vi phạm grammar guard | Content | 🟡 Medium | W12 |
| C9 | phase_questions có ACK words | Content | 🟡 Medium | W12 |
| D1 | Deepgram model names sai (aura-2-*) | Audio | 🔴 Critical | W13 |
| D2 | Audio cutoff âm cuối | Audio | 🟡 Medium | W13 |
| D3 | voiceConfig dùng chung voice | Audio | 🟡 Medium | W13 |
| D4 | R2 upload thiếu --remote | Audio | 🔴 Critical | W12 |
| D5 | R2 token thiếu permission | Audio | 🟠 High | W13 |
| D6 | R2 file cũ không overwrite | Audio | 🟡 Medium | W12 |
| D7 | TTS store sync broken | Audio | 🟠 High | W13 |

**Tổng: 11 Critical, 9 High, 6 Medium = 26 lỗi known**

**Week 15 All Bugs:**
- **A4:** Easy mode files not created (first run) - UI completely blank (NEW - 🔴 CRITICAL)
- **B6:** metadata.js sidebar title generic (RECURRENCE - 🟠 HIGH)
- **C3:** Daily Watch videos broken - Upgraded from 🟠 High → 🔴 Critical
- **C4:** Word Power schema error - UI stuck loading (NEW - 🔴 CRITICAL)
- **C5:** Vocab definition differentiation violation (NEW - 🟠 HIGH)

**Week 15 Impact:** 5 bugs total (3 new, 1 recurrence, 1 severity upgrade)

---

## ✅ MANDATORY PRE-FLIGHT VALIDATION SCRIPT

Chạy script này TRƯỚC KHI bắt đầu sản xuất tuần mới:

```bash
#!/bin/bash
# pre_flight_check.sh — Chạy trước khi bắt đầu production tuần N
WEEK=$1

echo "=========================================="
echo "PRE-FLIGHT CHECK — Week ${WEEK}"
echo "=========================================="

ERRORS=0

# 1. Deepgram API test
echo "🔍 Testing Deepgram API..."
python3 -c "
import os, json, urllib.request
from dotenv import load_dotenv; load_dotenv()
key = os.getenv('DEEPGRAM_API_KEY')
if not key: print('❌ DEEPGRAM_API_KEY not set'); exit(1)
url = 'https://api.deepgram.com/v1/speak?model=aura-orion-en&encoding=mp3'
data = json.dumps({'text': 'Hello test.'}).encode()
req = urllib.request.Request(url, data=data, headers={'Authorization': f'Token {key}', 'Content-Type': 'application/json'}, method='POST')
try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        print(f'✅ Deepgram OK: {len(resp.read())} bytes')
except Exception as e:
    print(f'❌ Deepgram FAILED: {e}')
    exit(1)
" || ERRORS=$((ERRORS+1))

# 2. R2 permission test
echo "🔍 Testing R2 upload permission..."
echo "test" > /tmp/r2_test.txt
npx wrangler r2 object put engquest-audio/audio/test_preflight.txt \
  --file=/tmp/r2_test.txt --remote 2>&1 | grep -q "complete"
if [ $? -eq 0 ]; then echo "✅ R2 upload OK"; else echo "❌ R2 FAILED (403?)"; ERRORS=$((ERRORS+1)); fi

# 3. Golden standards exist
echo "🔍 Checking golden standards..."
[ -f src/data/weeks/week_06/read.js ] && echo "✅ Week 6 Adv exists" || { echo "❌ Week 6 Adv missing"; ERRORS=$((ERRORS+1)); }
[ -f src/data/weeks_easy/week_06/read.js ] && echo "✅ Week 6 Easy exists" || { echo "❌ Week 6 Easy missing"; ERRORS=$((ERRORS+1)); }
[ -f src/data/weeks/week_07_real.js ] && echo "✅ Week 7 AI Tutor exists" || { echo "❌ Week 7 AI Tutor missing"; ERRORS=$((ERRORS+1)); }

echo ""
if [ $ERRORS -eq 0 ]; then
  echo "✅ ALL PRE-FLIGHT CHECKS PASSED — Ready for Week ${WEEK} production"
else
  echo "❌ ${ERRORS} CHECK(S) FAILED — FIX BEFORE STARTING PRODUCTION"
  exit 1
fi
```

## ✅ MANDATORY POST-FILE VERIFICATION

Chạy SAU KHI tạo xong TẤT CẢ files của 1 mode:

```bash
#!/bin/bash
# verify_week_files.sh — Verify Week N files after creation
WEEK=$1
MODE=$2  # "advanced" or "easy"

if [ "$MODE" = "easy" ]; then
  DIR="src/data/weeks_easy/week_${WEEK}"
else
  DIR="src/data/weeks/week_${WEEK}"
fi

echo "=========================================="
echo "VERIFYING: $DIR"
echo "=========================================="

ERRORS=0
EXPECTED_FILES="vocab word_power read explore dictation shadowing grammar logic word_match ask_ai mindmap writing daily_watch games index"

for file in $EXPECTED_FILES; do
  path="$DIR/$file.js"
  if [ ! -f "$path" ]; then
    echo "❌ MISSING: $path"
    ERRORS=$((ERRORS+1))
    continue
  fi
  
  # Check file size > 100 bytes
  size=$(wc -c < "$path")
  if [ "$size" -lt 100 ]; then
    echo "❌ TOO SMALL ($size bytes): $path"
    ERRORS=$((ERRORS+1))
    continue
  fi
  
  # Check JS syntax
  node -e "import('./$path').then(() => {}).catch(e => { console.error('❌ SYNTAX ERROR:', '$file.js', e.message); process.exit(1); })" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "✅ $file.js ($size bytes)"
  else
    echo "❌ SYNTAX ERROR: $file.js"
    ERRORS=$((ERRORS+1))
  fi
done

echo ""
COUNT=$(ls -1 $DIR/*.js 2>/dev/null | wc -l | tr -d ' ')
echo "Files found: $COUNT / 15 expected"

if [ $ERRORS -eq 0 ] && [ "$COUNT" -eq 15 ]; then
  echo "✅ ALL FILES VERIFIED — Mode $MODE ready"
else
  echo "❌ $ERRORS ERROR(S) — FIX BEFORE PROCEEDING"
fi
```

---

**Quy tắc cập nhật file này:**  
- Khi phát hiện lỗi mới ở tuần bất kỳ → thêm vào category phù hợp (A/B/C/D/E)  
- Cập nhật bảng tổng hợp ở cuối  
- KHÔNG tạo file riêng cho từng tuần

---

## 🟠 CATEGORY E: REVIEW WEEK FAILURES (Week 14, 28, 42, 54)

> **Nguồn:** Week 14 (March 12, 2026)  
> **Scope:** Weeks 14, 28, 42, 54 (every 14 weeks = review weeks)  
> **Impact:** SYSTEMIC FAILURE — Entire week content wrong

**Review Week Structure:**
- Every 14 weeks: 12 regular weeks + 1 transition week + 1 review week
- Week 14 reviews Weeks 1-12 grammar
- Week 28 reviews Weeks 15-26 grammar
- NO unique grammar — aggregate from previous 12 weeks
- Unique theme from current week's read.js/explore.js
- Video strategy: Reuse quality videos + new theme-specific content

---

### E1. Review Week Structure Not Recognized — Content Cloned from Week N-1

**Nguồn:** Week 14  
**Mức độ:** 🔴 CRITICAL — 100% of content wrong

**Triệu chứng:**
- Week 14 all stations show Week 13 "daily routine" content
- Vocabulary: wake, brush, morning, breakfast (Week 13) instead of present, poster, confident (Week 14)
- Grammar: Present simple daily routine (Week 13) instead of aggregate Weeks 1-12 (pronouns, possessives, can/can't)
- Easy mode: ALL 11 stations cloned from Week 13 but never updated
- Games.js: Week 13 vocabulary in GameHub

**Nguyên nhân gốc:**
1. Agent không biết Week 14 là review week (occurs every 14 weeks)
2. Cloned Week 13 as template (WRONG - Week 13 also review week)
3. Didn't aggregate Weeks 1-12 grammar as required by Blueprint
4. No detection logic: `if (week % 14 === 0) { /* review week */ }`
5. Easy mode completely skipped in initial generation

**Chi tiết lỗi:**
```bash
# All files had Week 13 content:
grep -r "wake.*up\|brush.*teeth\|breakfast" src/data/weeks/week_14/
# Output: 15+ matches (should be 0)

grep -r "present\|poster\|confident" src/data/weeks/week_14/
# Output: 0 matches in initial commit (should be 30+)

# Easy mode was 100% Week 13:
ls src/data/weeks_easy/week_14/*.js
# All files existed but content = Week 13
```

**Impact:**
- Round 1-3: 13 bugs fixing blueprint violations (read.js, explore.js, shadowing, dictation)
- Round 4: 3 bugs fixing GameHub and Daily Watch (games.js, video generation)
- Total: 19 bugs across 4 rounds
- Time cost: ~4 hours debugging + regenerating 290+ audio files
- Easy mode: Complete regeneration required (159 audio files)

**🚨 MANDATORY DETECTION — AT START OF EVERY WEEK:**

```bash
#!/bin/bash
# Add to start of production workflow

WEEK_NUM=$1

echo "🔍 Checking if Week $WEEK_NUM is a review week..."

# Review weeks occur every 14 weeks: 14, 28, 42, 54
if (( WEEK_NUM % 14 == 0 )); then
  echo ""
  echo "🔴🔴🔴 REVIEW WEEK DETECTED 🔴🔴🔴"
  echo ""
  echo "⚠️  Week $WEEK_NUM is a REVIEW WEEK (not regular sequential week)"
  echo ""
  echo "📚 DIFFERENT WORKFLOW REQUIRED:"
  echo "   1. Grammar: AGGREGATE from Weeks $((WEEK_NUM-13)) to $((WEEK_NUM-2))"
  echo "      (For Week 14: aggregate Weeks 1-12)"
  echo "   2. Theme: Use Week $WEEK_NUM read.js/explore.js for specific theme"
  echo "   3. Vocabulary: 10 words from Week $WEEK_NUM theme (NOT Week $((WEEK_NUM-1)))"
  echo "   4. Videos: Grammar review + theme-specific content"
  echo "   5. DO NOT CLONE Week $((WEEK_NUM-1)) (also review week)"
  echo ""
  echo "📖 READ MANDATORY CHECKLIST:"
  echo "   - REVIEW_WEEK_CHECKLIST.md"
  echo "   - Blueprint Section 14: Review Week Rules"
  echo ""
  read -p "Press ENTER to confirm you understand review week structure..." confirm
  
  if [[ -z "$confirm" ]]; then
    echo "❌ Must confirm before proceeding with review week"
    exit 1
  fi
  
  echo "✅ Review week workflow activated"
else
  echo "✅ Regular week workflow"
fi
```

**Phòng tránh:**
1. Run detection script BEFORE starting ANY week production
2. Read REVIEW_WEEK_CHECKLIST.md for review weeks (14, 28, 42, 54)
3. Aggregate grammar from previous 12 weeks, DON'T clone Week N-1
4. Verify vocabulary matches current week theme (not Week N-1)
5. Validate Easy mode content DIFFERENT from Advanced
6. Check games.js not forgotten (not part of 11-station workflow)

---

### E2. Blueprint Data Missing for Review Week — Video Generation Falls Back to Generic

**Nguồn:** Week 14  
**Mức độ:** 🔴 CRITICAL — Videos don't match theme/age group

**Triệu chứng:**
- Daily Watch videos show "My Day - Daily Routine" (generic)
- Video #1: Super Simple Songs puppet show (preschool ages 2-4)
- Video #4: Cocomelon "Getting Ready" nursery rhyme (preschool)
- NOT aligned with Week 14 review week (grammar review + presentation theme)
- Target: Ages 6-12 primary school (NOT preschool)

**Nguyên nhân gốc:**
```javascript
// tools/generate_video_queries.js:
const BLUEPRINT_WEEKS = {
  1: { theme: "All About Me", grammar: "subject pronouns" },
  2: { theme: "My Family", grammar: "possessive adjectives" },
  // ...
  13: { theme: "Daily Routine", grammar: "present simple" }
  // Week 14 MISSING! ← Blueprint data only went to Week 13
};

// No review week detection:
// function isReviewWeek(weekId) { ... }  ← DIDN'T EXIST

// No age-appropriate filtering:
// const PRIMARY_SCHOOL_CHANNELS = [...];  ← DIDN'T EXIST
```

**Impact:**
- Video generation fell back to generic YouTube search
- Returned preschool content (puppets, nursery rhymes)
- User complained: "daily watch cũng ko tìm đủ video? sao vậy?"
- Required manual curation and re-generation

**🚨 FIX APPLIED:**

```javascript
// tools/generate_video_queries.js - UPDATED:

// 1. Add Week 14 (and future review weeks) to Blueprint:
const BLUEPRINT_WEEKS = {
  // ... existing weeks 1-13
  14: {
    theme: "Welcome to My World",
    grammar: "REVIEW: subject pronouns, possessive adjectives, verb to be, articles, demonstratives, prepositions, present simple, can/can't (Weeks 1-12)",
    vocabulary: ["present", "poster", "introduce", "family", "talented", "confident", "proud", "describe", "audience", "project"],
    review_of_weeks: "1-12",
    note: "Review week - aggregate grammar from previous 12 weeks"
  },
  // Future: Add Weeks 28, 42, 54 with same pattern
};

// 2. Add review week detection:
const isReviewWeek = (weekId) => {
  return weekId % 14 === 0;  // Weeks 14, 28, 42, 54
};

// 3. Add grammar aggregation:
const aggregateReviewContent = (weekId) => {
  const startWeek = weekId - 13;  // For Week 14: Weeks 1-12
  const endWeek = weekId - 2;
  
  let aggregatedGrammar = [];
  for (let i = startWeek; i <= endWeek; i++) {
    if (BLUEPRINT_WEEKS[i]) {
      aggregatedGrammar.push(BLUEPRINT_WEEKS[i].grammar);
    }
  }
  
  return {
    review_of_weeks: `${startWeek}-${endWeek}`,
    grammar_focus: aggregatedGrammar.join(", "),
    note: "Review week - aggregate content from previous 12 weeks"
  };
};

// 4. Add age-appropriate channel filtering:
const PRIMARY_SCHOOL_CHANNELS = [
  "English Singsing",         // Grammar lessons, educational
  "Little Fox",               // Stories with subtitles
  "British Council LearnEnglish Kids",
  "SciShow Kids",
  "National Geographic Kids"
];

const PRESCHOOL_CHANNELS = [
  "Super Simple Songs",       // Puppet shows, nursery rhymes
  "Cocomelon",                // Animated babies, ages 2-4
  "Dave and Ava",
  "Blippi"
];

const filterByAgeGroup = (videos, ageGroup) => {
  if (ageGroup === "6-12 primary") {
    return videos.filter(v => 
      PRIMARY_SCHOOL_CHANNELS.some(ch => v.channelTitle.includes(ch)) &&
      !PRESCHOOL_CHANNELS.some(ch => v.channelTitle.includes(ch))
    );
  }
  return videos;
};
```

**Validation:**
```bash
# Before video generation:
node -e "const bp=require('./tools/generate_video_queries.js'); if(!bp.BLUEPRINT_WEEKS[$WEEK]) throw Error('Week $WEEK missing from Blueprint')"

# After video generation:
grep "channelTitle" src/data/weeks/week_14/daily_watch.js | grep -i "cocomelon\|blippi\|super simple"
# Should be EMPTY (no preschool channels)

grep "channelTitle" src/data/weeks/week_14/daily_watch.js | grep -i "english singsing\|little fox\|british council"
# Should have matches (primary school channels)
```

**Phòng tránh:**
1. Add review weeks to BLUEPRINT_WEEKS BEFORE production: Weeks 14, 28, 42, 54
2. Implement isReviewWeek() detection in video generation script
3. Add age-appropriate channel filtering (PRIMARY_SCHOOL vs PRESCHOOL)
4. Verify Blueprint data exists before running video generation
5. Test video queries with sample API call BEFORE batch generation

---

### E3. Games.js Forgotten in Station Validation — GameHub Shows Week N-1 Content

**Nguồn:** Week 14  
**Mức độ:** 🔴 CRITICAL — UI renders wrong week

**Triệu chứng:**
- User opens GameHub → Sentence Expander (Make Sentence)
- Expected: Week 14 presentation vocabulary (present, poster, introduce, confident)
- Actual: Week 13 daily routine vocabulary (wake up, brush teeth, breakfast)
- UI rendered correctly, but game data completely wrong week
- User complaint: "Gamehub ở advanced vẫn là của tuần 13???"

**Nguyên nhân gốc:**
```bash
# Round 1-3 validated 11 MAIN STATIONS:
STATIONS=(
  read explore vocab mindmap shadowing dictation
  conversation_cards ask_ai quiz daily_watch grammar
)

# games.js was FORGOTTEN → not included in validation checklist
# File was cloned from Week 13 template but content never transformed

$ head -20 src/data/weeks/week_14/games.js
export const gameData = {
  vocabulary: [
    { word: "wake", translation: "thức dậy" },     # ← Week 13!
    { word: "morning", translation: "buổi sáng" }, # ← Week 13!
    { word: "brush", translation: "chải" },        # ← Week 13!
    // ... all 10 words from Week 13
  ],
  
  make_sentence: {
    sentences_advanced: [
      "I wake up at six o'clock every morning",  # ← Week 13 theme!
      "I brush my teeth after breakfast",        # ← Week 13 theme!
    ]
  }
};
```

**Impact:**
- Games.js had 294 lines of Week 13 content
- GameHub UI showed completely wrong vocabulary
- Required complete file rewrite
- Backup created: games_BACKUP_WEEK13_CONTENT.js

**🚨 FIX: ADD GAMES.JS TO VALIDATION CHECKLIST:**

```bash
#!/bin/bash
# validation_all_stations.sh - UPDATED

WEEK_NUM=$1
MODE=${2:-"advanced"}  # advanced or easy

if [ "$MODE" = "advanced" ]; then
  DIR="src/data/weeks/week_$WEEK_NUM"
else
  DIR="src/data/weeks_easy/week_$WEEK_NUM"
fi

# UPDATED: 12 stations (added games.js)
STATIONS=(
  read explore vocab mindmap shadowing dictation
  conversation_cards ask_ai quiz daily_watch grammar
  games  # ← ADD THIS!
)

echo "🔍 Validating Week $WEEK_NUM ($MODE mode) - 12 STATIONS"
echo "Directory: $DIR"
echo ""

ERRORS=0

for station in "${STATIONS[@]}"; do
  FILE="$DIR/$station.js"
  
  # 1. File exists?
  if [ ! -f "$FILE" ]; then
    echo "❌ MISSING: $station.js"
    ERRORS=$((ERRORS+1))
    continue
  fi
  
  # 2. File size OK? (> 100 bytes for station, some exceptions)
  SIZE=$(wc -c < "$FILE" | tr -d ' ')
  if [ "$SIZE" -lt 100 ]; then
    echo "❌ TOO SMALL: $station.js ($SIZE bytes)"
    ERRORS=$((ERRORS+1))
    continue
  fi
  
  # 3. Check Week N-1 content
  if grep -qi "week.?$((WEEK_NUM-1))\|wake.*up\|brush.*teeth" "$FILE"; then
    echo "❌ WEEK N-1 CONTENT DETECTED: $station.js"
    ERRORS=$((ERRORS+1))
  fi
  
  # 4. Syntax check
  node -e "import('$FILE').then(() => {}).catch(e => { console.error('SYNTAX:', e.message); process.exit(1); })" 2>/dev/null
  if [ $? -eq 0 ]; then
    echo "✅ $station.js ($SIZE bytes)"
  else
    echo "❌ SYNTAX ERROR: $station.js"
    ERRORS=$((ERRORS+1))
  fi
done

echo ""
COUNT=$(ls -1 "$DIR"/*.js 2>/dev/null | wc -l | tr -d ' ')
echo "Files found: $COUNT / 12 expected (was 11 before, now includes games.js)"

if [ $ERRORS -eq 0 ] && [ "$COUNT" -eq 12 ]; then
  echo "✅ ALL 12 STATIONS VERIFIED — Mode $MODE ready"
else
  echo "❌ $ERRORS ERROR(S) — FIX BEFORE PROCEEDING"
  exit 1
fi
```

**Phòng tránh:**
1. Update validation script to include games.js (12 stations, not 11)
2. Run validation after EVERY station file creation
3. Grep check for Week N-1 content in games.js
4. Verify vocabulary array matches current week theme
5. Don't assume games.js updated just because 11 other stations OK

---

### E4. Field Names Don't Match UI Components — UI Renders Empty Despite Correct Data

**Nguồn:** Week 14  
**Mức độ:** 🔴 CRITICAL — UI shows section but no content tiles

**Triệu chứng:**
- After fixing games.js content (Bug #E3), user still reports empty UI
- User: "vẫn ko có nội dung gì cả?" (still no content at all?)
- UI shows "Scrambled Words" section header
- But NO word tiles/buttons rendering
- Console shows data loading successfully
- React component renders but children empty

**Nguyên nhân gốc — FIELD NAME MISMATCH:**
```javascript
// src/data/weeks/week_14/games.js (WRONG):
export const gameData = {
  sentence_expander: {  // ← Agent named by PURPOSE (logical)
    sentences_advanced: [...],
    sentences_easy: [...]
  }
};

// src/components/games/MakeSentenceGame.jsx (EXPECTED):
const gameData = weekData.games;
const sentences = gameData.make_sentence.sentences_advanced;
//                         ^^^^^^^^^^^^^ 
//                         Component expects "make_sentence"

// Result: gameData.make_sentence = undefined
//         Component renders empty (no error thrown)
```

**Why it happened:**
1. Agent named field by GAME PURPOSE: `sentence_expander` (describes what game does)
2. Component expects TECHNICAL NAME: `make_sentence` (matches component file MakeSentenceGame.jsx)
3. No validation step to grep component code for expected field name
4. React didn't throw error because `gameData.make_sentence` simply returned `undefined`
5. Component rendered empty UI (no crash, just no tiles)

**Impact:**
- UI appeared "working" (section visible) but no interactive elements
- Hard to debug because no console errors
- Required grep component code to discover expectation
- Quick fix once identified (rename field)

**🚨 MANDATORY FIELD NAME VALIDATION:**

```bash
#!/bin/bash
# validate_games_field_names.sh

WEEK_NUM=$1

echo "🔍 Validating games.js field names against UI components..."

# 1. Find MakeSentenceGame component
COMPONENT=$(find src/components/games -name "MakeSentenceGame.jsx" -o -name "MakeSentence.tsx")

if [ -z "$COMPONENT" ]; then
  echo "❌ Component not found: MakeSentenceGame"
  exit 1
fi

echo "Component found: $COMPONENT"

# 2. Grep component to find expected field name
EXPECTED_FIELD=$(grep "gameData\.[a-z_]*\." "$COMPONENT" | head -1 | sed -E 's/.*gameData\.([a-z_]*)\..*/\1/')

if [ -z "$EXPECTED_FIELD" ]; then
  echo "❌ Could not extract expected field name from component"
  exit 1
fi

echo "Component expects field: $EXPECTED_FIELD"

# 3. Check if games.js uses correct field name
GAMES_FILE="src/data/weeks/week_$WEEK_NUM/games.js"

if ! grep -q "^  $EXPECTED_FIELD:" "$GAMES_FILE"; then
  echo "❌ FIELD NAME MISMATCH!"
  echo ""
  echo "Component expects: $EXPECTED_FIELD"
  echo "Games.js has:"
  grep "^  [a-z_]*:" "$GAMES_FILE" | sed 's/:$//'
  echo ""
  echo "FIX: Rename field in games.js to match component expectation"
  exit 1
fi

echo "✅ Field name matches: $EXPECTED_FIELD"

# 4. Test data loads in Node.js environment
node -e "import('$GAMES_FILE').then(m => {
  if (!m.gameData.$EXPECTED_FIELD) {
    console.error('❌ Field $EXPECTED_FIELD not found in gameData');
    process.exit(1);
  }
  console.log('✅ Data structure valid');
})" 2>&1

if [ $? -ne 0 ]; then
  echo "❌ Data validation failed"
  exit 1
fi

echo ""
echo "✅ ALL CHECKS PASSED — games.js field names valid"
```

**Common Mistakes:**
```javascript
// ❌ Naming by PURPOSE (logical but WRONG):
export const gameData = {
  sentence_expander: { ... },   // Component won't find this
  word_scrambler: { ... },      // Component expects different name
  story_builder: { ... }        // Doesn't match component code
};

// ✅ Naming by COMPONENT (matches code):
export const gameData = {
  make_sentence: { ... },       // ← MakeSentenceGame.jsx expects this
  word_matching: { ... },       // ← WordMatchingGame.jsx expects this
  story_sequence: { ... }       // ← StorySequenceGame.jsx expects this
};
```

**Validation workflow:**
```bash
# After creating games.js:

# 1. Find component file
GAME="MakeSentence"  # Based on station name
COMPONENT=$(find src/components/games -name "${GAME}Game.jsx")

# 2. Grep for expected field name
echo "Component expects field:"
grep "gameData\.[a-z_]*\." "$COMPONENT" | head -1

# Example output: 
#   const sentences = gameData.make_sentence.sentences_advanced;
#                              ^^^^^^^^^^^^
#                              USE THIS NAME (not sentence_expander)

# 3. Verify games.js uses correct field
grep -n "^  make_sentence:" src/data/weeks/week_$WEEK/games.js
# Should output line number (not empty)

# 4. Test in browser console (after deploy):
# weekData.games.make_sentence.sentences_advanced
# Should return array of sentences (not undefined)
```

**Phòng tránh:**
1. ALWAYS grep component code BEFORE naming fields in games.js
2. Don't assume logical names (sentence_expander, word_scrambler)
3. Use TECHNICAL names that match component expectations (make_sentence)
4. Run validation script after creating games.js
5. Test data loads in browser console before considering complete

---

## 📊 REVIEW WEEK CHECKLIST SUMMARY

### Before Starting Review Week Production (14, 28, 42, 54):

**1. Detection (Mandatory):**
```bash
if (( WEEK_NUM % 14 == 0 )); then
  echo "🔴 REVIEW WEEK - Different workflow required"
  read REVIEW_WEEK_CHECKLIST.md
fi
```

**2. Blueprint Study (10 minutes):**
- Aggregate grammar from previous 12 weeks (Week 14 → Weeks 1-12)
- Read current week theme from read.js/explore.js
- DON'T clone Week N-1 (also review week)

**3. Script Verification:**
```bash
# Verify Blueprint data exists:
node -e "const bp=require('./tools/generate_video_queries.js'); if(!bp.BLUEPRINT_WEEKS[$WEEK]) throw Error('Missing')"

# Verify isReviewWeek() function exists:
grep -n "isReviewWeek" tools/generate_video_queries.js
```

**4. Validation (After Generation):**
```bash
# All 12 stations (including games.js):
./validation_all_stations.sh $WEEK_NUM advanced
./validation_all_stations.sh $WEEK_NUM easy

# Field names match components:
./validate_games_field_names.sh $WEEK_NUM

# Videos age-appropriate (6-12 primary, not preschool 2-4):
grep "channelTitle" src/data/weeks/week_$WEEK/daily_watch.js | grep -i "cocomelon\|blippi"
# Should be EMPTY

# No Week N-1 content:
grep -r "week.?$((WEEK_NUM-1))" src/data/weeks/week_$WEEK/
# Should be EMPTY
```

**5. Deployment:**
```bash
# Standard workflow:
python3 auto_rename.py $WEEK_NUM
python3 tools/upload_week_images_r2.py $WEEK_NUM
echo "y" | ./tools/upload_all_audio_r2.sh $WEEK_NUM &
git add src/data/weeks/week_$WEEK_NUM/ public/images/week$WEEK_NUM*/
git commit -m "feat(week$WEEK_NUM): Review Week - aggregate Weeks X-Y grammar"
git push origin main
```

### Success Criteria:
- ✅ Vocabulary matches Week N theme (NOT Week N-1)
- ✅ Grammar mentions aggregate Weeks X-Y (NOT unique grammar)
- ✅ Videos have review_of_weeks metadata
- ✅ No preschool channels (ages 2-4) in Daily Watch
- ✅ games.js field names match component code
- ✅ All 12 stations validated (including games.js)
- ✅ Easy mode content DIFFERENT from Advanced
- ✅ Hard refresh browser → UI shows Week N content

---

**Next Review Weeks: 28, 42, 54**  
**Use Category E lessons for ALL review weeks!**
