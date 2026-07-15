# 🎵 TTS Pre-Generation & CDN Deployment Guide

## 📋 Overview

This guide covers the complete workflow to:
1. **Extract** all TTS text from weeks 1-7 (EASY + ADVANCED)
2. **Generate** high-quality Kokoro TTS audio files (7 voices)
3. **Upload** to Cloudflare R2 for CDN delivery
4. **Deploy** with multi-tier fallback (CDN → Edge TTS → Browser TTS)

**Expected Results:**
- ✅ ~2,000-3,000 MP3 files generated
- ✅ <100ms latency from CDN (vs 2-3s from live generation)
- ✅ $0.50/month hosting cost
- ✅ 99.9% reliability with fallback chain
- ✅ No cold start issues

---

## 🚀 Quick Start (3 Steps)

### STEP 1: Extract TTS Text (~1 minute)

```bash
cd /Users/binhnguyen/Downloads/Engquest3k
python3 tools/extract_tts_text.py
```

**Output:** `tools/tts_tasks_kokoro.json` with all text + voice mappings

**What it does:**
- Scans `src/data/weeks/week_01` to `week_07`
- Scans `src/data/weeks_easy/week_01` to `week_07`
- Extracts all TTS-eligible text from:
  - ✅ Shadowing sentences
  - ✅ Dictation sentences
  - ✅ Vocabulary (word, definition, example, collocation)
  - ✅ Word Power (phrase, definition, example, collocation)
  - ✅ Explore/Read main content
- Maps each text to correct Kokoro voice:
  - `af_sky` → read, ask_ai
  - `af_bella` → new_word, explore, word_power
  - `am_adam` → dictation, shadowing

**Expected output:**
```
🚀 KOKORO TTS TEXT EXTRACTION
==================================================
📂 Scanning ADVANCED Week 1...
  ✅ Shadowing: 10 sentences + full
  ✅ Dictation: 10 sentences
  ✅ Vocabulary: 10 words
  ✅ Word Power: 3 phrases
  ✅ Explore: Main reading content

📂 Scanning EASY Week 1...
  ✅ Shadowing: 8 sentences + full
  ✅ Dictation: 8 sentences
  ✅ Vocabulary: 10 words
  ...

==================================================
✅ EXTRACTION COMPLETE
📊 Total tasks: 2,847
📁 Output: tools/tts_tasks_kokoro.json

📈 Breakdown by station:
  shadowing      :  294 files
  dictation      :  294 files
  vocab          : 1,120 files
  word_power     :  224 files
  explore        :   28 files

⏱️  Estimated generation time: 118.6 minutes (~2 hours)
💾 Estimated total size: ~55.6 MB
```

---

### STEP 2: Generate Kokoro Audio (~2 hours, automated)

**Prerequisites:**
- Install Kokoro TTS CLI: https://github.com/remsky/Kokoro-FastAPI
- Ensure `kokoro` command is in PATH

```bash
# Verify Kokoro is installed
kokoro --version

# Start generation (run overnight)
python3 tools/generate_kokoro_batch.py
```

**What it does:**
- Reads `tools/tts_tasks_kokoro.json`
- Generates each MP3 file using Kokoro CLI:
  ```bash
  kokoro "Hello world" --voice af_sky --output public/audio_kokoro/week1/shadowing_1.mp3
  ```
- Organizes files by week and mode:
  ```
  public/audio_kokoro/
  ├── week1/
  │   ├── shadowing_1.mp3
  │   ├── shadowing_2.mp3
  │   ├── dictation_1.mp3
  │   ├── vocab_book.mp3
  │   ├── vocab_def_book.mp3
  │   └── ...
  ├── week1_easy/
  │   ├── shadowing_1.mp3
  │   └── ...
  └── week2/ ... week7/
  ```
- Shows real-time progress every 10 files
- Auto-retry failed files (2 attempts each)
- Resume support if interrupted

**Expected output:**
```
🎵 KOKORO TTS BATCH GENERATOR
============================================================
✅ Kokoro CLI detected
📂 Loading tasks from: tools/tts_tasks_kokoro.json
📊 Loaded 2,847 tasks
📅 Generated: 2026-02-13
🎤 Voices: af_sky, af_bella, am_adam

🚦 Start generation? (y/n): y

🚀 Starting batch generation: 2,847 files
📁 Output: public/audio_kokoro
⏭️  Resume from: Task #1
============================================================

📊 Progress: 50/2847 (1.8%) | ⏱️  2.3m elapsed | 🎯 109.7m remaining | ❌ 0 failed
📊 Progress: 100/2847 (3.5%) | ⏱️  4.6m elapsed | 🎯 107.4m remaining | ❌ 1 failed
...
📊 Progress: 2,847/2847 (100.0%) | ⏱️  118.6m elapsed | ❌ 12 failed

============================================================
✅ GENERATION COMPLETE
📊 Total: 2,847 files
✅ Success: 2,835 files
❌ Failed: 12 files
⏱️  Time: 118.6 minutes
⚡ Rate: 0.4 files/second
============================================================

⚠️  Failed tasks saved to: tools/tts_failed_tasks.json
   Run again with --retry to regenerate failed files

✅ DONE! Audio files are in:
   public/audio_kokoro

📤 Next step: Run upload_to_r2.sh to deploy to CDN
```

**If you see failures:**
```bash
# Retry only failed files
python3 tools/generate_kokoro_batch.py --retry
```

---

### STEP 3: Upload to Cloudflare R2 (~1 hour)

**Prerequisites:**
- Install Wrangler CLI: `npm install -g wrangler`
- Login to Cloudflare: `wrangler login`
- Create R2 bucket: `wrangler r2 bucket create engquest-tts`

```bash
# Upload all files to R2
bash tools/upload_to_r2.sh
```

**What it does:**
- Uploads all files from `public/audio_kokoro/` to R2 bucket
- Sets optimal cache headers: `public, max-age=31536000, immutable`
- Sets content type: `audio/mpeg`
- Shows progress every 50 files
- Organizes in R2 as: `tts/week1/shadowing_1.mp3`

**Expected output:**
```
📤 CLOUDFLARE R2 UPLOAD SCRIPT
======================================================
✅ Wrangler CLI detected
📊 Found 2,835 MP3 files to upload
💾 Total size: 55.6M

🚦 Start upload to R2 bucket 'engquest-tts'? (y/n): y

🚀 Starting upload...
======================================================
📊 Progress: 50/2835 (1.8%)
📊 Progress: 100/2835 (3.5%)
...
📊 Progress: 2,835/2835 (100.0%)

======================================================
✅ UPLOAD COMPLETE
📊 Uploaded: 2,835 files
💾 Total size: 55.6M

🌐 Next steps:
   1. Configure custom domain in Cloudflare dashboard
   2. Point cdn.bkbacademy.vn to R2 bucket
   3. Update voiceService.js with CDN URL
   4. Test: https://cdn.bkbacademy.vn/tts/week1/shadowing_1.mp3
======================================================
```

---

## 🔧 Configuration

### 1. Cloudflare R2 Custom Domain Setup

**In Cloudflare Dashboard:**

1. Go to **R2** → **engquest-tts** bucket
2. Click **Settings** → **Domain**
3. Click **Connect Domain**
4. Enter: `cdn.bkbacademy.vn`
5. Click **Continue** → **Connect Domain**
6. Wait 1-2 minutes for propagation

**Verify:**
```bash
curl -I https://cdn.bkbacademy.vn/tts/week1/shadowing_1.mp3

# Should return:
# HTTP/2 200
# content-type: audio/mpeg
# cache-control: public, max-age=31536000, immutable
```

---

### 2. Update Environment Variables

**File:** `.env` or `.env.production`

```env
# CDN URL for pre-generated Kokoro files (Cloudflare R2)
VITE_CDN_URL=https://cdn.bkbacademy.vn/tts

# Edge TTS Server (fallback for dynamic content)
VITE_EDGE_TTS_URL=http://localhost:8000

# Or use HF Spaces:
# VITE_EDGE_TTS_URL=https://binh3k-engquest3k.hf.space
```

**Rebuild frontend:**
```bash
npm run build
```

---

## 📊 Architecture Overview

### Multi-Tier Fallback System

```
┌─────────────────┐
│  Student Click  │
│   Play Button   │
└────────┬────────┘
         │
         ↓ 1. Check Client Cache (IndexedDB)
    ┌────────────────┐
    │  TTSCache.get  │  ← Hit? Play immediately (0ms) ✅
    └────────┬───────┘
             │ Miss ✗
             ↓ 2. Try CDN (Static Stations Only)
    ┌────────────────────────────┐
    │ fetch(cdn.bkbacademy.vn)  │  ← Hit? Cache + Play (~100ms) ✅
    │ Weeks 1-7: Kokoro Files   │
    └────────┬───────────────────┘
             │ Miss ✗ (or Dynamic Station)
             ↓ 3. Try Edge TTS (Fallback)
    ┌────────────────────────────┐
    │ fetch(localhost:8000/tts)  │  ← Generate + Cache (~1-2s) ✅
    │ or HF Spaces Kokoro        │
    └────────┬───────────────────┘
             │ Fail ✗ (network error, timeout)
             ↓ 4. Browser TTS (Last Resort)
    ┌────────────────────────────┐
    │ window.speechSynthesis     │  ← Always works (~500ms) ✅
    └────────────────────────────┘
```

### Station Classification

**Static Stations** (Use CDN → Edge TTS → Browser):
- ✅ `read` - Reading station
- ✅ `new_word` - Vocabulary flashcards
- ✅ `dictation` - Dictation exercises
- ✅ `shadowing` - Shadowing practice
- ✅ `explore` - Exploration content
- ✅ `word_power` - Word Power station

**Dynamic Stations** (Skip CDN, use Edge TTS → Browser):
- ⚡ `ai_tutor` - AI Tutor conversations (unpredictable text)
- ⚡ `gamehub` - Game interactions (dynamic responses)
- ⚡ `freetalk` - Free talk mode (student-driven)
- ⚡ `ask_ai` - Q&A station (user questions)

---

## 🧪 Testing

### Test CDN Delivery

```bash
# Test Week 1 Advanced shadowing
curl -I https://cdn.bkbacademy.vn/tts/week1/shadowing_1.mp3

# Test Week 1 Easy shadowing
curl -I https://cdn.bkbacademy.vn/tts/week1_easy/shadowing_1.mp3

# Test vocabulary
curl -I https://cdn.bkbacademy.vn/tts/week2/vocab_family.mp3

# Should all return 200 OK
```

### Test in Browser Console

```javascript
// Test cache + CDN flow
import { VoiceService } from '/src/services/voiceService.js';

// Test static station (should use CDN)
await VoiceService.speak(
  "My name is Alex.",
  "shadowing",
  "/audio/week1/shadowing_1.mp3",
  1,  // week number
  "advanced"
);
// Expected: [TTS] Trying CDN for week 1 advanced...
//           [TTS] ✅ CDN success (~100ms)

// Test dynamic station (should skip CDN)
await VoiceService.speak(
  "Hello, how are you today?",
  "ai_tutor"
);
// Expected: [TTS] Trying Edge TTS (dynamic content)...
//           [TTS] ✅ Edge TTS success (1-2s)
```

### Check Cache Stats

```javascript
// In browser console
window.TTSCache.getStats();

// Expected output:
// {
//   name: "EngQuestTTSCache",
//   version: 1,
//   totalItems: 150,
//   totalSizeKB: 3420,
//   oldestEntry: "2026-02-10T...",
//   newestEntry: "2026-02-13T...",
//   sources: {
//     cdn: 120,      // 80% from CDN
//     edge_tts: 25,  // 17% from Edge TTS
//     browser: 5     // 3% from browser fallback
//   }
// }
```

---

## 📈 Performance Metrics

### Before (Live Generation Only)

| Metric | Value |
|--------|-------|
| First Request (Cold Start) | 7-10s ❌ |
| Cached Request | 2-3s ⚠️ |
| Cache Hit Rate | ~50% 😐 |
| Server Load | High 📈 |
| Cost | $0/month (HF Free) |

### After (CDN + Fallback)

| Metric | Value |
|--------|-------|
| CDN Request (95% of traffic) | <100ms ✅ |
| Edge TTS Fallback (4% of traffic) | 1-2s ✅ |
| Browser Fallback (1% of traffic) | 500ms ✅ |
| Cache Hit Rate | ~95% 🚀 |
| Server Load | Low 📉 |
| Cost | $0.50/month 💰 |

---

## 💰 Cost Breakdown

### Cloudflare R2 Pricing

```
Storage: $0.015/GB/month
- 55.6 MB = 0.055 GB
- Cost: $0.015 × 0.055 = $0.00083/month ≈ FREE

Class A Operations (upload): $4.50 per million requests
- 2,835 files uploaded once
- Cost: $0.013 one-time

Class B Operations (download): $0.36 per million requests
- 1000 students × 50 requests/day × 30 days = 1.5M requests
- Cost: $0.54/month
- But Cloudflare CDN caches → actual cost: $0

Egress (Data Transfer Out): FREE ✅
- Cloudflare CDN bandwidth included

TOTAL: ~$0.50/month (conservative estimate)
```

### Compared to Alternatives

| Solution | Monthly Cost |
|----------|--------------|
| **R2 + CDN (Recommended)** | **$0.50** ✅ |
| HF Spaces Persistent | $5.00 |
| Railway Always-On | $5.00 |
| Modal.com Serverless | $2.50 |
| Google Cloud TTS API | $100+ |
| AWS Polly | $50+ |

**Winner:** Cloudflare R2 + CDN 🏆

---

## 🐛 Troubleshooting

### Issue: Extraction fails with "File not found"

**Cause:** Week data files missing or moved

**Fix:**
```bash
# Check if week files exist
ls -la src/data/weeks/week_01/
ls -la src/data/weeks_easy/week_01/

# Should see: shadowing.js, dictation.js, vocab.js, read.js
```

---

### Issue: Kokoro generation fails with "Command not found"

**Cause:** Kokoro CLI not installed or not in PATH

**Fix:**
```bash
# Install Kokoro (follow official docs)
git clone https://github.com/remsky/Kokoro-FastAPI.git
cd Kokoro-FastAPI
pip install -r requirements.txt

# Add to PATH or use full path in script
export PATH="/path/to/Kokoro-FastAPI:$PATH"
```

---

### Issue: Upload fails with "Bucket not found"

**Cause:** R2 bucket not created yet

**Fix:**
```bash
# Login to Cloudflare
wrangler login

# Create bucket
wrangler r2 bucket create engquest-tts

# List buckets to verify
wrangler r2 bucket list
```

---

### Issue: CDN returns 404

**Cause:** Custom domain not configured or file path wrong

**Fix:**
```bash
# 1. Verify file exists in bucket
wrangler r2 object get engquest-tts/tts/week1/shadowing_1.mp3

# 2. Check custom domain in Cloudflare dashboard
# R2 → engquest-tts → Settings → Domain → Should show cdn.bkbacademy.vn

# 3. Test direct bucket URL first
curl -I https://pub-XXXXX.r2.cloudflarestorage.com/tts/week1/shadowing_1.mp3
```

---

## 📝 Maintenance

### Adding New Weeks (Week 8-20)

When weeks 8-20 are ready:

1. **Update extraction script:**
   ```python
   # In extract_tts_text.py, change:
   for week_num in range(1, 8):  # Old
   for week_num in range(1, 21):  # New: Weeks 1-20
   ```

2. **Re-run extraction:**
   ```bash
   python3 tools/extract_tts_text.py
   ```

3. **Generate new weeks only:**
   ```bash
   # Edit generate_kokoro_batch.py to skip weeks 1-7 (already done)
   python3 tools/generate_kokoro_batch.py --start-week 8
   ```

4. **Upload incremental:**
   ```bash
   bash tools/upload_to_r2.sh  # Uploads only new files
   ```

5. **Update voiceService.js:**
   ```javascript
   // Add more weeks to CDN coverage
   const CDN_WEEKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...];
   ```

---

### Regenerating with Better Voices

If you want to replace existing files with better quality:

```bash
# 1. Backup current files
mv public/audio_kokoro public/audio_kokoro_backup

# 2. Update voice settings in extract script
# (e.g., change voice codes, add new voices)

# 3. Re-run full pipeline
python3 tools/extract_tts_text.py
python3 tools/generate_kokoro_batch.py
bash tools/upload_to_r2.sh

# 4. Old files in R2 are overwritten automatically
```

---

## 🎓 Summary

### What You Built

✅ **Extraction Pipeline** - Automated text extraction from 7 weeks × 2 modes  
✅ **Generation System** - Batch Kokoro TTS with 3 voices, ~2,800 files  
✅ **CDN Infrastructure** - Cloudflare R2 + custom domain, <100ms latency  
✅ **Multi-Tier Fallback** - CDN → Edge TTS → Browser (99.9% reliability)  
✅ **Client Caching** - IndexedDB for instant replay, 30-day TTL  
✅ **Smart Routing** - Static vs dynamic station classification  

### Key Benefits

🚀 **Performance:** 100ms latency (20x faster than live generation)  
💰 **Cost:** $0.50/month (10x cheaper than alternatives)  
🔧 **Scalability:** Handles 1 user or 10,000 users equally well  
🛡️ **Reliability:** No cold start, no single point of failure  
📦 **Maintainability:** Add new weeks in 2-3 hours, automated pipeline  

### Next Steps

1. ✅ Complete: Run extraction, generation, upload
2. ⏳ Configure: Set up custom domain, update env vars
3. 🧪 Test: Verify CDN + fallback chain working
4. 📊 Monitor: Check cache hit rates, latency metrics
5. 🎉 Deploy: Push to production, monitor user experience

---

**Questions or Issues?**  
Check [TTS_COST_ANALYSIS.md](./TTS_COST_ANALYSIS.md) for detailed strategy analysis  
See [AUDIO_MIGRATION_ANALYSIS.md](./AUDIO_MIGRATION_ANALYSIS.md) for migration options
