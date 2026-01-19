# 🎯 ASSET GENERATION SCRIPTS - CHÍNH XÁC

**Dựa trên phân tích code thực tế và Week 4**

---

## 📋 TÓM TẮT: 3 LOẠI ASSETS

| Asset | Script | Output | Count (Week 4) |
|-------|--------|--------|----------------|
| **VIDEO** | `update_videos.js` | `daily_watch.js` | 5 videos |
| **AUDIO** | `generate_audio.js` hoặc `generate_audio.py` | `public/audio/weekXX/*.mp3` | **138 files** |
| **IMAGE** | `generate_images_nano.js` | `public/images/weekXX/*.jpg` | 15-19 images |

---

## 1️⃣ VIDEO GENERATION

### Script: `tools/update_videos.js`

**Quy trình**:
1. Đọc `video_queries.json` (5 queries: 1 GRAMMAR + 2 TOPIC + 2 SCIENCE)
2. Search YouTube API với whitelist 17 kênh ESL kids
3. Lọc video: 1-15 phút duration
4. Fallback nếu không tìm được (GRAMMAR/TOPIC/SCIENCE defaults)
5. Update `daily_watch.js` với đúng 5 videos

**Usage**:
```bash
# Bước 1: Tạo video_queries.json (MANUAL)
cat > src/data/weeks/week_XX/video_queries.json << 'EOF'
{
  "masterQuery": "emotions feelings kids ESL",
  "grammar": "I like V-ing grammar kids",
  "videos": [
    { "id": 1, "query": "I like V-ing English lesson kids", "purpose": "GRAMMAR" },
    { "id": 2, "query": "emotions feelings kids educational", "purpose": "TOPIC" },
    { "id": 3, "query": "happy sad emotions kids learning", "purpose": "TOPIC" },
    { "id": 4, "query": "science emotions brain kids", "purpose": "SCIENCE" },
    { "id": 5, "query": "how emotions work kids educational", "purpose": "SCIENCE" }
  ]
}
EOF

# Bước 2: Chạy script
node tools/update_videos.js XX
```

**API**: YouTube Data API (tự động load từ `API keys.txt`)

**Whitelist 17 kênh**:
- English Singsing
- Super Simple Songs
- British Council
- WOW English
- Dream English
- Numberblocks
- SciShow Kids
- Nat Geo Kids
- Smile and Learn
- Homeschool Pop
- Storyline Online
- Peppa Pig
- Cocomelon
- Little Baby Bum
- Dr Binocs
- Happy Learning
- Jack Hartmann

---

## 2️⃣ AUDIO GENERATION

### Script Chính: `tools/generate_audio.js` (Node.js)

**Số lượng**: **~130-140 files** (không phải 76!)

**Breakdown Week 4 thực tế**:
```
📊 AUDIO COUNT PER STATION:

  vocab           50 files  (10 words × 5 fields: word + def + ex + coll + pron)
  word_power      15 files  (3 words × 5 fields)
  grammar          0 files  (no audio in grammar exercises)
  dictation       14 files  (14 sentences)
  shadowing       14 files  (14 sentences)
  ask_ai           5 files  (5 questions)
  logic            5 files  (5 puzzles)
  mindmap         42 files  (6 stems + 36 branches = 6 stems × 7 items each)
  ─────────────────────────
  TOTAL          145 expected
  ACTUAL         138 files   (some fields optional)
```

**Quy trình**:
1. Đọc `voiceConfig` từ `index.js` (MANDATORY)
2. Quét tất cả stations:
   - **vocab.js**: 10 words × 5 audio (word, def, ex, coll, pron)
   - **word_power.js**: 3 words × 5 audio
   - **dictation.js**: 14 sentences
   - **shadowing.js**: 14 sentences
   - **ask_ai.js**: 5 questions
   - **logic.js**: 5 puzzles
   - **mindmap.js**: 6 stems + 36 branches
3. Generate audio qua Google Cloud TTS (Neural2 voices)
4. Smart skip: không tạo lại file đã có

**Usage**:
```bash
# Method 1: Node.js (RECOMMENDED)
node tools/generate_audio.js <START> <END>

# Ví dụ:
node tools/generate_audio.js 4 4

# Method 2: Python + OpenAI TTS
node tools/create_audio_tasks_only.js 4 4
export OPENAI_API_KEY="sk-proj-..." && python3 tools/generate_audio.py --provider openai --voice alloy
```

**voiceConfig Example** (trong `index.js`):
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-D',   // Male
  vocabulary: 'en-US-Neural2-F',  // Female
  dictation: 'en-US-Neural2-F',   // Female
  questions: 'en-US-Neural2-D',   // Male
  mindmap: 'en-US-Neural2-D'      // Male
}
```

**API**: Google Cloud Text-to-Speech

**⚠️ LƯU Ý QUAN TRỌNG**:
- Số lượng **130-140 files**, KHÔNG PHẢI 76!
- 76 chỉ là audio_url trong structure, còn vocab có thêm audio_word, audio_def, audio_ex, audio_coll
- Mindmap có 42 files (6 stems + 36 branches)
- Word Power có 15 files (3 words × 5 fields)

---

## 3️⃣ IMAGE GENERATION

### Script Chính: `tools/generate_images_nano.js` (Gemini Nano Banana)

**Số lượng**: 15 images (Phase 1)

**Breakdown**:
```
📊 IMAGE COUNT:

  Vocab images       10 files  (happy.jpg, sad.jpg, funny.jpg, ...)
  Word Power          3 files  (wordpower_feel_happy.jpg, ...)
  Read cover          1 file   (read_cover_w04.jpg)
  Explore cover       1 file   (explore_cover_w04.jpg)
  ─────────────────────────────
  TOTAL              15 files  (Phase 1: Week 1-54)
```

**Phase-based counts**:
- Phase 1 (Week 1-54): **15 images**
- Phase 2 (Week 55-120): **17 images** (thêm 2 wordpower)
- Phase 3 (Week 121-144): **19 images** (thêm 4 wordpower)

**Quy trình**:
1. Quét `vocab.js`: extract 10 words
2. Quét `word_power.js`: extract 3 words (P1) / 5 (P2) / 7 (P3)
3. Đọc `read.js`: lấy title cho covers
4. Generate prompts:
   - Vocab: `"cartoon vector illustration of {word}, simple, educational, white background"`
   - Covers: `"{topic} storybook cover illustration, kids education"`
5. Gọi Gemini API (gemini-3-pro-image-preview)
6. Delay 2s giữa các request (tránh 429 rate limit)
7. Smart skip: không tạo lại file đã có

**Usage**:
```bash
node tools/generate_images_nano.js <WEEK_NUMBER>

# Ví dụ:
node tools/generate_images_nano.js 4
```

**API**: Gemini Imagen 3 (`gemini-3-pro-image-preview` - FREE tier Nano Banana)

**Aspect Ratios**:
- Vocab/Word Power: 1:1 (square)
- Covers: 16:9 (landscape)

**Naming Convention**:
- Vocab: `{word}.jpg` (lowercase, underscores for spaces)
- Word Power: `wordpower_{word}.jpg`
- Covers: `read_cover_w04.jpg`, `explore_cover_w04.jpg`
- Easy mode: thêm `_easy` suffix

---

## 🔄 WORKFLOW HOÀN CHỈNH

### Tạo Week mới từ đầu:

```bash
# 1. Generate week structure (nếu chưa có)
node tools/generate_week.js XX

# 2. Fill content vào 13 stations + ADD voiceConfig vào index.js

# 3. Tạo video_queries.json (MANUAL)
cat > src/data/weeks/week_XX/video_queries.json << 'EOF'
{
  "masterQuery": "...",
  "grammar": "...",
  "videos": [ ... 5 queries ... ]
}
EOF

# 4. Generate videos
node tools/update_videos.js XX

# 5. Generate audio (~130-140 files)
node tools/generate_audio.js XX XX

# 6. Generate images (15 files Phase 1)
node tools/generate_images_nano.js XX

# 7. Verify
find public/audio/weekXX -name "*.mp3" | wc -l    # Should be ~130-140
find public/images/weekXX -name "*.jpg" | wc -l   # Should be 15 (Phase 1)
grep -c '"id":' src/data/weeks/week_XX/daily_watch.js  # Should be 5
```

---

## 🔍 VALIDATION

### Kiểm tra sau khi generate:

```bash
# 1. Kiểm tra audio count
find public/audio/week4 -name "*.mp3" | wc -l
# Expected: 130-140 files

# 2. Kiểm tra image count
find public/images/week4 -name "*.jpg" | wc -l
# Expected: 15 (Phase 1), 17 (Phase 2), 19 (Phase 3)

# 3. Kiểm tra video count
grep -c '"id":' src/data/weeks/week_04/daily_watch.js
# Expected: 5

# 4. Kiểm tra voiceConfig
grep -A 6 "voiceConfig:" src/data/weeks/week_04/index.js
# Should show 5 voice entries

# 5. List audio by type
ls public/audio/week4/ | grep -E "^vocab_" | wc -l    # ~50 vocab audios
ls public/audio/week4/ | grep -E "^mindmap_" | wc -l  # ~42 mindmap audios
ls public/audio/week4/ | grep -E "^dictation_" | wc -l # ~14 dictation
ls public/audio/week4/ | grep -E "^shadowing_" | wc -l # ~14 shadowing
```

---

## ⚠️ ĐIỂM QUAN TRỌNG CẦN NHỚ

1. **Audio count**: **130-140 files**, KHÔNG PHẢI 76
   - Vocab có 5 audio per word (word, def, ex, coll, pron)
   - Word Power tương tự
   - Mindmap có 42 files (stems + branches)

2. **Image script**: Phải dùng `generate_images_nano.js` (có chữ "nano")
   - Dùng Gemini Nano Banana (FREE)
   - Không phải `batch_manager.js`

3. **Video queries**: Phải tạo manual `video_queries.json`
   - 5 queries: 1 GRAMMAR + 2 TOPIC + 2 SCIENCE
   - Script không tự generate queries

4. **voiceConfig**: MANDATORY trong `index.js`
   - Scripts sẽ fail nếu thiếu
   - Rotate voices để tạo variety

5. **Week 4 structure**: 13 files
   - read.js, vocab.js, grammar.js, word_power.js
   - ask_ai.js, logic.js, dictation.js, shadowing.js
   - writing.js, explore.js, mindmap.js, daily_watch.js
   - index.js (+ voiceConfig + video_queries.json)

---

## 🔗 FILES LIÊN QUAN

- [ASSET_GENERATION_WORKFLOW.md](../ASSET_GENERATION_WORKFLOW.md) - Workflow tổng quan
- [tools/update_videos.js](../tools/update_videos.js) - Video script
- [tools/generate_audio.js](../tools/generate_audio.js) - Audio script (Node.js)
- [tools/generate_images_nano.js](../tools/generate_images_nano.js) - Image script (Nano Banana)
- [API keys.txt](../API%20keys.txt) - API keys storage

---

**Last Updated**: January 18, 2026  
**Verified Against**: Week 4 actual structure (138 audio files, 15 images, 5 videos)
