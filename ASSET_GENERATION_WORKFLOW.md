# ASSET GENERATION WORKFLOW - STANDARDIZED

## ⚠️ CRITICAL REQUIREMENTS

### voiceConfig is MANDATORY
- **Every week MUST have voiceConfig in index.js**
- Scripts will throw error if voiceConfig is missing
- Each week should use different voice combinations for variety

---

## 📋 PRE-GENERATION CHECKLIST

Before running any asset generation tool, ensure:

1. ✅ **Week data structure complete:**
   - 15 files in `src/data/weeks/week_XX/` folder
   - 15 files in `src/data/weeks_easy/week_XX/` folder
   - Both modes have `index.js` with complete stations data

2. ✅ **voiceConfig present in index.js:**
   ```javascript
   voiceConfig: {
     narration: 'en-XX-Neural2-X',
     vocabulary: 'en-XX-Neural2-X',
     dictation: 'en-XX-Neural2-X',
     questions: 'en-XX-Neural2-X',
     mindmap: 'en-XX-Neural2-X'
   }
   ```

3. ✅ **API keys configured in `API keys.txt`:**
   ```
   YOUTUBE_API_KEY=AIzaSy...
   GEMINI_API_KEY=AIzaSy...
   GOOGLE_TTS_API_KEY=AIzaSy...
   OPENAI_API_KEY=sk-proj-...
   ```

4. ✅ **video_queries.json created:**
   - 5 queries (1 GRAMMAR + 2 TOPIC + 2 SCIENCE)
   - Located in `src/data/weeks/week_XX/video_queries.json`

---

## 🎯 STANDARDIZED WORKFLOW (3 ASSETS)

### 1️⃣ VIDEO GENERATION (2-Step Process)

**Step 1: Create video_queries.json** (MANUAL)
```json
{
  "masterQuery": "Topic keywords for kids ESL",
  "grammar": "grammar focus keywords",
  "videos": [
    { "id": 1, "query": "grammar topic + English lesson kids", "purpose": "GRAMMAR" },
    { "id": 2, "query": "week topic + kids educational", "purpose": "TOPIC" },
    { "id": 3, "query": "week theme + kids learning", "purpose": "TOPIC" },
    { "id": 4, "query": "science/CLIL topic + kids", "purpose": "SCIENCE" },
    { "id": 5, "query": "science/CLIL + educational kids", "purpose": "SCIENCE" }
  ]
}
```

**Step 2: Run automated search** (AUTOMATED)
```bash
# Direct command (RECOMMENDED)
node tools/update_videos.js <WEEK_ID>

# Example:
node tools/update_videos.js 19

# Admin Panel: NOT APPLICABLE (video search requires video_queries.json)
```

**Output:** Updates `daily_watch.js` with EXACTLY 5 videos

---

### 2️⃣ AUDIO GENERATION (3 Methods - All Synchronized)

All 3 methods now enforce MANDATORY voiceConfig and use identical logic.

#### Method 1: Node.js + Google TTS (RECOMMENDED ⭐)
```bash
node tools/generate_audio.js <START_WEEK> <END_WEEK>

# Example:
node tools/generate_audio.js 19 20
```

**Features:**
- ✅ Reads voiceConfig from weekData
- ✅ Throws error if voiceConfig missing
- ✅ Auto-loads API key from API keys.txt
- ✅ Smart skip (existing files)
- ✅ Handles nested mindmap structure
- ✅ Variable audio count (skips optional fields)

**API Used:** Google Cloud Text-to-Speech (Neural2 voices)

---

#### Method 2: Python + OpenAI TTS (2-Step)
```bash
# Step 1: Create task list
node tools/create_audio_tasks_only.js <START> <END>

# Step 2: Generate audio
export OPENAI_API_KEY="sk-proj-..." && \
python3 tools/generate_audio.py --provider openai --voice alloy

# Example:
node tools/create_audio_tasks_only.js 19 20
export OPENAI_API_KEY="sk-..." && python3 tools/generate_audio.py --provider openai
```

**Features:**
- ✅ Reads voiceConfig from weekData (UPDATED)
- ✅ Throws error if voiceConfig missing (UPDATED)
- ✅ Deep scan for nested structures
- ✅ Smart skip (existing files)
- ⚠️ Requires 2 commands
- ⚠️ Python dependency

**API Used:** OpenAI Text-to-Speech

**Voice Mapping:**
- Neural2-D → alloy (male)
- Neural2-F → nova (female)
- Neural2-E → echo (neutral)

---

#### Method 3: Admin Panel (HTML UI)
```
Open: tools/Admin_Media_Studio.html
⚠️ STATUS: NOT UPDATED - Does not support audio generation
Currently only generates batch_manager.js commands for images
```

**Action Required:** Extend Admin Panel to support audio with voiceConfig UI

---

### 3️⃣ IMAGE GENERATION (Gemini Imagen)

```bash
# Direct command (RECOMMENDED)
node tools/batch_manager.js <START_WEEK> <END_WEEK>

# Example:
node tools/batch_manager.js 19 20

# Admin Panel Alternative:
# Open tools/Admin_Media_Studio.html → Enter weeks → Click "TẠO LỆNH TERMINAL"
# Copy generated command → Paste in terminal
```

**Features:**
- ✅ Fixed image count per phase:
  - Phase 1 (weeks 1-54): 15 images
  - Phase 2 (weeks 55-120): 17 images
  - Phase 3 (weeks 121-144): 19 images
- ✅ Auto-loads API key from API keys.txt
- ✅ Aspect ratios: 16:9 (covers), 1:1 (vocab/word_power)
- ✅ Educational illustration style with no-crop requirement

**Output:** Generates images in `/public/images/weekXX/` and `/public/images/weekXX_easy/`

---

## 🔄 CONSISTENCY VERIFICATION

### Before Generation:
```bash
# Check voiceConfig exists
grep -A 10 "voiceConfig:" src/data/weeks/week_19/index.js

# Check video_queries.json exists
cat src/data/weeks/week_19/video_queries.json

# Check API keys loaded
cat "API keys.txt" | grep -E "YOUTUBE|GEMINI|GOOGLE_TTS|OPENAI"
```

### After Generation:
```bash
# Verify audio count (~115-155 files depending on content)
find public/audio/week19 -name "*.mp3" | wc -l

# Verify image count (15 for Phase 1)
find public/images/week19 -name "*.jpg" | wc -l

# Verify video count (EXACTLY 5)
grep -c '"id":' src/data/weeks/week_19/daily_watch.js
```

---

## 🚨 TROUBLESHOOTING

### Error: "MANDATORY voiceConfig missing"
**Cause:** Week index.js doesn't have voiceConfig object
**Fix:** Add voiceConfig to week_XX/index.js:
```javascript
voiceConfig: {
  narration: 'en-US-Neural2-D',
  vocabulary: 'en-US-Neural2-F',
  dictation: 'en-US-Neural2-E',
  questions: 'en-US-Neural2-D',
  mindmap: 'en-US-Neural2-F'
}
```

### Error: "API key not found"
**Cause:** API keys.txt missing or incorrectly formatted
**Fix:** Check `API keys.txt` exists in root with format:
```
YOUTUBE_API_KEY=AIzaSy...
GEMINI_API_KEY=AIzaSy...
```

### Video search returns 0 results
**Cause:** video_queries.json missing or queries too specific
**Fix:** 
1. Create video_queries.json with 5 queries
2. Use broader keywords (e.g., "was were English kids" not "was were past tense lesson")
3. Script will use purpose-based fallbacks if search fails

### Audio count mismatch
**Cause:** Week content has variable fields (grammar examples, word_power morphing)
**Expected:** 115-155 files depending on:
- Grammar examples: 0-16 files (week-specific)
- Word Power items: 3 (P1) / 5 (P2) / 7 (P3) = +8/+16 files
- Logic puzzles: 5 (P1) / 7 (P2) / 10 (P3) = +4/+10 files

---

## 📊 WORKFLOW COMPARISON

| Feature | Video | Audio (Method 1) | Audio (Method 2) | Image |
|---------|-------|------------------|------------------|-------|
| **Steps** | 2 (manual + auto) | 1 command | 2 commands | 1 command |
| **voiceConfig** | N/A | ✅ Required | ✅ Required | N/A |
| **API Key Source** | API keys.txt | API keys.txt | Env var | API keys.txt |
| **Admin Panel** | ❌ Not supported | ❌ Not supported | ❌ Not supported | ✅ Supported |
| **Output Count** | Fixed 5 | Variable 115-155 | Variable 115-155 | Fixed 15-19 |
| **Smart Skip** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |

---

## ✅ RECOMMENDED WORKFLOW FOR NEW WEEK

```bash
# 1. Create week data structure
node tools/generate_week.js 20

# 2. Fill content + ADD voiceConfig to index.js

# 3. Create video_queries.json manually

# 4. Generate all assets (order matters for dependencies)
node tools/update_videos.js 20        # Videos first (no dependencies)
node tools/generate_audio.js 20 20    # Audio (requires voiceConfig)
node tools/batch_manager.js 20 20     # Images (no dependencies)

# 5. Verify counts
find public/audio/week20 -name "*.mp3" | wc -l    # ~115-155
find public/images/week20 -name "*.jpg" | wc -l   # 15 (Phase 1)
grep -c '"id":' src/data/weeks/week_20/daily_watch.js  # 5
```

---

## 🎤 voiceConfig ROTATION STRATEGY

To maintain variety, rotate voices across weeks:

```javascript
// Week 1: US Default
voiceConfig: {
  narration: 'en-US-Neural2-D',
  vocabulary: 'en-US-Neural2-F',
  dictation: 'en-US-Neural2-E',
  questions: 'en-US-Neural2-D',
  mindmap: 'en-US-Neural2-F'
}

// Week 2: GB Accent
voiceConfig: {
  narration: 'en-GB-Neural2-A',
  vocabulary: 'en-GB-Neural2-B',
  dictation: 'en-GB-Neural2-C',
  questions: 'en-GB-Neural2-D',
  mindmap: 'en-GB-Neural2-E'
}

// Week 3: AU Accent
voiceConfig: {
  narration: 'en-AU-Neural2-A',
  vocabulary: 'en-AU-Neural2-B',
  dictation: 'en-AU-Neural2-C',
  questions: 'en-AU-Neural2-D',
  mindmap: 'en-AU-Neural2-A'
}

// Week 4: Mixed
voiceConfig: {
  narration: 'en-US-Neural2-G',
  vocabulary: 'en-GB-Neural2-F',
  dictation: 'en-AU-Neural2-D',
  questions: 'en-US-Neural2-H',
  mindmap: 'en-GB-Neural2-A'
}
```

**Available Voices:**
- US: A, B, C, D, E, F, G, H, I, J (10 voices)
- GB: A, B, C, D, E, F (6 voices)
- AU: A, B, C, D (4 voices)
- **Total: 20 unique voices**

---

## 📝 NOTES

1. **voiceConfig is now MANDATORY** - scripts will fail without it
2. **All 3 audio methods are synchronized** - same voiceConfig logic
3. **Admin Panel needs update** - currently only supports image generation
4. **Video requires manual queries** - no automation for video_queries.json creation
5. **Asset counts are variable** - depends on content and phase morphing
