# ✅ WEEK 15 PRODUCTION CHECKLIST (Updated March 2026)

**🚀 NEW: Audio generation now AUTOMATIC - No manual steps!**

---

## 📋 STREAMLINED WORKFLOW

### 1️⃣ Create Week Data (45-60 minutes)
```bash
# Create folders
mkdir -p src/data/weeks/week_15
mkdir -p src/data/weeks_easy/week_15
mkdir -p public/images/week15
mkdir -p public/images/week15_easy
```

**Files to create:**
- `src/data/weeks/week_15/index.js` (with voiceConfig ✅)
- `src/data/weeks/week_15/read.js`
- `src/data/weeks/week_15/dictation.js`
- `src/data/weeks/week_15/shadowing.js`
- `src/data/weeks/week_15/vocab.js`
- `src/data/weeks/week_15/word_power.js`
- (Same structure for `weeks_easy/week_15/`)

**⚠️ CRITICAL: Include voiceConfig**
```javascript
// src/data/weeks/week_15/index.js
export default {
  week_id: 15,
  title: "Week 15: My Daily Routine",
  // ... other fields ...
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',   // Male (read/explore)
    vocabulary: 'en-US-Neural2-F',  // Female (vocab/word_power)
    dictation: 'en-US-Neural2-C',   // Female soft (dictation)
    shadowing: 'en-US-Neural2-F',   // Female clear (shadowing)
    questions: 'en-US-Neural2-J',   // Male (logic/questions)
    mindmap: 'en-US-Neural2-F'      // Female (mindmap)
  }
}
```

---

### 2️⃣ ~~Generate Audio~~ ❌ REMOVED!
**No longer needed!** Audio generates automatically on first play.

**Time saved:** 60 minutes → 0 minutes ✅

---

### 3️⃣ Generate & Upload Images (20-30 minutes)
```bash
# Generate image prompts
node tools/generate_images_nano.js 15

# Manual process:
# 1. Use prompts from public/images/Prompts/week_15_image_prompts.txt
# 2. Generate via Ideogram/Midjourney
# 3. Save to public/images/week15/
# 4. Upload to R2
```

**Upload images to R2:**
```bash
cd public/images

# Advanced mode
find week15 -name "*.jpg" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/images/"$file" \
    --file="$file" \
    --content-type="image/jpeg" \
    --remote
done

# Easy mode
find week15_easy -name "*.jpg" -type f | while read file; do
  npx wrangler r2 object put engquest-audio/images/"$file" \
    --file="$file" \
    --content-type="image/jpeg" \
    --remote
done
```

**Verify uploads:**
```bash
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/images/week15/bag.jpg"
# Should return: HTTP/1.1 200 OK
```

---

### 4️⃣ Deploy to Production (5 minutes)
```bash
# Commit and push
git add src/data/weeks/week_15/ src/data/weeks_easy/week_15/
git add public/images/week15/ public/images/week15_easy/
git commit -m "feat: Add Week 15 - My Daily Routine"
git push

# Cloudflare Pages auto-deploys (2-3 minutes)
```

**⚠️ Note:** Audio files stay in .gitignore - they generate on-demand!

---

### 5️⃣ Post-Deployment Testing (10 minutes)

**Test on production site:**
1. Go to: https://engquest3k.pages.dev/week/15/read
2. **First play test** (audio generation)
   - Click play button
   - Check console logs:
     ```
     [TTS] Trying R2 CDN for week 15...
     [TTS] R2 miss (404) - generating on-demand...
     [TTS] 🎤 Generating on-demand: read with aura-orion-en
     [TTS] ✅ Generated (250KB) - cached to R2: audio/week15/read_main.mp3
     ```
   - Audio should play smoothly (< 1 second delay first time)
   - **Verify MALE voice** for Read/Explore stations

3. **Second play test** (R2 cache hit)
   - Click play again
   - Check console logs:
     ```
     [TTS] Trying R2 CDN for week 15...
     [TTS] ✅ R2 CDN success (~50ms)
     ```
   - Audio should play **instantly** (no delay)

4. **Test other stations:**
   - New Word: Female voice (aura-asteria-en)
   - Dictation: Female soft (aura-luna-en)
   - Shadowing: Female clear (aura-asteria-en)
   - Word Power: Female voice (aura-asteria-en)

5. **Speed control test:**
   - Change speed to 0.75x, 1.5x, 2.0x
   - Audio should adjust instantly (no re-fetch)
   - Same cached file plays at different speeds ✅

6. **Verify R2 Dashboard:**
   - Go to: Cloudflare Dashboard → R2 → engquest-audio
   - Navigate to: `audio/week15/`
   - Should see files with today's date
   - Typical sizes: ~200-300 KB for read, ~10-20 KB for vocab

---

## 📊 TIME COMPARISON

| Step | Old Workflow | New Workflow | Time Saved |
|------|-------------|-------------|-----------|
| Create week data | 60 min | 60 min | 0 min |
| ~~Generate audio~~ | ~~45 min~~ | **0 min** ✅ | **45 min** |
| ~~Upload to R2~~ | ~~15 min~~ | **0 min** ✅ | **15 min** |
| Generate images | 30 min | 30 min | 0 min |
| Deploy | 5 min | 5 min | 0 min |
| Testing | 10 min | 10 min | 0 min |
| **TOTAL** | **165 min** | **105 min** | **60 min** |

**Time saved per week:** 1 hour  
**Time saved per year (52 weeks):** 52 hours  

---

## 🚨 TROUBLESHOOTING

### Issue: Wrong voice (female instead of male)
**Cause:** IndexedDB cache has old audio

**Fix:**
```javascript
// In DevTools: F12 → Application → IndexedDB → tts_cache → Right-click → Delete database
indexedDB.deleteDatabase('tts_cache');
```

### Issue: Audio not generating (no logs)
**Cause:** Worker not deployed or binding missing

**Fix:**
```bash
cd cloudflare-worker
npx wrangler deploy

# Verify output shows:
# "env.TTS_BUCKET (engquest-audio)  R2 Bucket" ✓
```

### Issue: R2 shows empty (files not saving)
**Cause:** Worker R2 binding not configured

**Fix:** See above (redeploy Worker)

---

## ✅ SUCCESS CRITERIA

- [ ] Week 15 data files created (both modes)
- [ ] voiceConfig included in `index.js`
- [ ] Images uploaded to R2 (verify with curl)
- [ ] Code deployed to Cloudflare Pages
- [ ] First play generates audio (~1s delay OK)
- [ ] Second play instant (R2 cache hit)
- [ ] Correct voices: Male for read, Female for vocab
- [ ] Speed control works (0.5x - 2.0x)
- [ ] R2 Dashboard shows files with today's date
- [ ] ~~Audio files uploaded~~ ❌ NOT NEEDED!
- [ ] ~~CDN_WEEKS updated~~ ❌ NOT NEEDED!

---

**Document Version:** 2.0 (On-Demand TTS)  
**Last Updated:** March 12, 2026  
**Previous Version:** Week 1-14 (Pre-Generation)  

**📚 References:**
- Full architecture: `LESSON_LEARNED_WEEK14_ON_DEMAND_TTS.md`
- Updated workflow: `Production_FINAL/QUICK_REF.md` (Section 5)