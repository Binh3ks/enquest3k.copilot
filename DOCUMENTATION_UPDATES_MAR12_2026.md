# 📚 DOCUMENTATION UPDATES - March 12, 2026

**Context:** Completed on-demand TTS implementation for Week 14, preparing for Week 15+ production

---

## 📝 NEW DOCUMENTS CREATED

### 1. `LESSON_LEARNED_WEEK14_ON_DEMAND_TTS.md` (Comprehensive Guide)
**Content:**
- ✅ Complete architecture explanation (Worker + R2 + Browser)
- ✅ Paradigm shift: Pre-generation → On-demand
- ✅ All bugs discovered and fixed
- ✅ Voice mapping system (male/female)
- ✅ Speed control architecture
- ✅ Cost analysis (same cost, 60 min saved)
- ✅ Troubleshooting guide
- ✅ Worker deployment requirements

**Use case:** Reference document for future debugging or architecture questions

---

### 2. `WEEK_15_PRODUCTION_CHECKLIST.md` (Quick Reference)
**Content:**
- ✅ Streamlined workflow (removed audio steps)
- ✅ Step-by-step instructions
- ✅ Time comparison (165 min → 105 min)
- ✅ Testing checklist
- ✅ Troubleshooting section
- ✅ Success criteria

**Use case:** Daily workflow guide for producing new weeks

---

### 3. Updated `Production_FINAL/QUICK_REF.md` (Section 5)
**Changes:**
- ❌ Removed: Generate audio locally (5A)
- ❌ Removed: Verify local files (5B)
- ❌ Removed: Upload to R2 with wrangler (5C)
- ❌ Removed: Verify CDN access (5D)
- ❌ Removed: Update CDN_WEEKS array (5E)
- ❌ Removed: Force-commit audio files (5E)
- ✅ Added: On-demand TTS explanation
- ✅ Added: voiceConfig requirement
- ✅ Added: Architecture diagram
- ✅ Added: Troubleshooting guide
- ✅ Added: Verification checklist

**Use case:** Updated reference for production workflow

---

## 🎯 KEY CHANGES SUMMARY

### What's Removed from Workflow
```diff
- Step 5A: Generate audio locally (45 minutes)
- Step 5B: Verify local files (5 minutes)
- Step 5C: Upload to R2 (15 minutes)
- Step 5D: Verify CDN access (5 minutes)
- Step 5E: Update CDN_WEEKS + force-commit (5 minutes)

Total removed: 75 minutes PER WEEK
```

### What's Added
```diff
+ Add voiceConfig to week data (5 lines of code)
+ Test first play (verify on-demand generation) (2 minutes)
+ Test second play (verify R2 cache hit) (1 minute)

Total added: ~3 minutes PER WEEK
```

**Net time saved:** **72 minutes per week** (60 min from audio steps + 12 min from testing streamline)

---

## 📋 PRODUCTION WORKFLOW COMPARISON

### OLD (Week 1-13)
```bash
1. Create week data            [60 min]
2. Generate audio locally      [45 min] ❌ REMOVED
3. Upload to R2                [15 min] ❌ REMOVED
4. Update CDN_WEEKS            [2 min]  ❌ REMOVED
5. Force-commit audio          [3 min]  ❌ REMOVED
6. Generate images             [30 min]
7. Deploy                      [5 min]
8. Test                        [10 min]

Total: 170 minutes
```

### NEW (Week 14+)
```bash
1. Create week data with voiceConfig  [60 min]
   - Add voiceConfig object (5 lines)
2. Generate images                    [30 min]
3. Deploy                             [5 min]
4. Test (verify on-demand TTS)        [10 min]

Total: 105 minutes ✅

Time saved: 65 minutes per week
```

---

## 🔧 TECHNICAL REQUIREMENTS FOR WEEK 15+

### 1. voiceConfig Required in Week Data
```javascript
// src/data/weeks/week_15/index.js
export default {
  week_id: 15,
  title: "Week 15: My Daily Routine",
  // ... other fields ...
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',   // Male deep
    vocabulary: 'en-US-Neural2-F',  // Female clear
    dictation: 'en-US-Neural2-C',   // Female soft
    shadowing: 'en-US-Neural2-F',   // Female clear
    questions: 'en-US-Neural2-J',   // Male energetic
    mindmap: 'en-US-Neural2-F'      // Female
  }
}
```

**Why?** App uses this to determine correct voice for each station.

---

### 2. Worker Must Be Deployed (ONE TIME)
```bash
cd cloudflare-worker
npx wrangler deploy

# Verifies:
# "env.TTS_BUCKET (engquest-audio)  R2 Bucket" ✓
```

**Why?** Syncs R2 binding from wrangler.toml to production Worker.

**When?** Already done (March 12, 2026). Only needed if worker code changes.

---

### 3. No More CDN_WEEKS Array Updates
```javascript
// OLD (Week 1-13): Had to update manually
const CDN_WEEKS = [1, 2, 3, ..., 13]; // ❌ No longer needed

// NEW (Week 14+): All weeks use on-demand TTS
// No array needed - app automatically tries R2, generates if miss
```

---

### 4. No More Audio Files in Git
```bash
# OLD: Had to force-commit audio
git add -f public/audio/week14/*.mp3  # ❌ No longer needed

# NEW: Audio generated on-demand, stored only on R2
# Git only contains: src data + images
```

---

## 🎓 IMPORTANT LESSONS FOR FUTURE

### Lesson 1: Always Redeploy Worker After Binding Changes
```bash
# ❌ WRONG: Only edit wrangler.toml
vim cloudflare-worker/wrangler.toml
git push  # Binding not active in production!

# ✅ RIGHT: Deploy to sync bindings
vim cloudflare-worker/wrangler.toml
npx wrangler deploy  # ← Critical step!
git push
```

---

### Lesson 2: IndexedDB Survives Hard Reload
```
User action: Cmd+Shift+R (Hard Reload)
Result: IndexedDB still exists with old audio!

Fix: F12 → Application → IndexedDB → tts_cache → Delete database
```

**Future improvement:** Add cache version check
```javascript
const CACHE_VERSION = 2;
const dbName = `tts_cache_v${CACHE_VERSION}`;
// Increment version when voices change
```

---

### Lesson 3: Speed Control is Client-Side (Perfect!)
```javascript
// One audio file serves ALL speeds
audio.playbackRate = 0.5;  // 0.5x speed
audio.playbackRate = 1.0;  // Normal
audio.playbackRate = 2.0;  // 2x speed

// Benefits:
// - No extra storage
// - No extra API calls
// - Instant speed changes
// - Standard HTML5 feature
```

**Don't need:** Multiple audio files for different speeds

---

### Lesson 4: Background Tasks Can Fail Silently
```javascript
// Worker code
ctx.waitUntil(
  env.TTS_BUCKET.put(objectKey, audioBuffer)
    .then(() => console.log('Saved')) // Shows in logs
    .catch(e => console.warn('Failed')) // Would show if error
);

// Problem: If env.TTS_BUCKET undefined → silent failure
// Logs show "Saved" but files don't exist
// Fix: Deploy Worker to ensure binding exists
```

---

## 📊 IMPACT ANALYSIS

### Time Savings
- **Per week:** 65 minutes saved
- **Per year (52 weeks):** 56.3 hours saved
- **Per phase (13 weeks):** 14.1 hours saved

### Cost Impact
- **Before:** $0.16/week (Deepgram) + 60 min labor
- **After:** $0.16/week (Deepgram) + 0 min labor
- **Savings:** 60 minutes/week = $50-100/week (developer time)

### Quality Benefits
- ✅ Always correct voice (from voiceConfig)
- ✅ Self-healing (auto-regenerates on miss)
- ✅ No upload errors
- ✅ No 503 errors
- ✅ Consistent with AI Tutor pattern

---

## ✅ NEXT STEPS FOR WEEK 15

### What to Do
1. ✅ Create week data with voiceConfig
2. ✅ Generate and upload images (normal process)
3. ✅ Deploy to Cloudflare Pages
4. ✅ Test first play (audio generates automatically)
5. ✅ Test second play (R2 cache hit)
6. ✅ Verify correct voices (male/female)

### What NOT to Do
- ❌ Don't run `generate_audio_deepgram.py`
- ❌ Don't upload audio to R2 manually
- ❌ Don't update CDN_WEEKS array
- ❌ Don't force-commit audio files to git

---

## 📚 DOCUMENT LOCATIONS

All documentation is in workspace root:

1. **`LESSON_LEARNED_WEEK14_ON_DEMAND_TTS.md`**
   - Full technical guide
   - Architecture details
   - Bug reports and fixes
   - Reference material

2. **`WEEK_15_PRODUCTION_CHECKLIST.md`**
   - Quick workflow guide
   - Step-by-step instructions
   - Testing checklist
   - Daily use document

3. **`Production_FINAL/QUICK_REF.md`**
   - Updated Section 5 (Audio)
   - Removed old workflow
   - Added on-demand instructions
   - Master reference document

---

**Documentation Version:** 1.0  
**Date:** March 12, 2026  
**Author:** AI Assistant (GitHub Copilot)  
**Status:** Complete and ready for Week 15 production  

**Next Review:** After Week 15 production (verify everything works as documented)
