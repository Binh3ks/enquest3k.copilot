# 🎓 LESSON LEARNED: Week 14 On-Demand TTS Implementation

**Date**: March 12, 2026  
**Context**: Paradigm shift from pre-generation workflow to on-demand audio generation  
**Impact**: Eliminates entire audio generation step from production workflow

---

## 🚀 THE PARADIGM SHIFT

### ❌ OLD WORKFLOW (Pre-Generation)
```bash
# Step 1: Generate all audio files locally (30-45 minutes)
python3 tools/generate_audio_deepgram.py 14 --mode all --force

# Step 2: Upload to R2 (10-15 minutes)
./tools/upload_all_audio_r2.sh 14

# Step 3: Verify uploads (5 minutes)
curl -I "https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week14/..."

# Problems:
# - Time consuming (45-60 minutes per week)
# - Manual upload process prone to errors
# - 503 errors from HuggingFace TTS worker
# - Audio files in .gitignore caused missing files
# - Must regenerate if voice config changes
```

### ✅ NEW WORKFLOW (On-Demand)
```javascript
// ZERO STEPS - Audio generates automatically!

// User clicks play → App checks R2 CDN
// ├─ If cached: Serve instantly (~50ms)
// └─ If miss: Generate via Deepgram → Cache forever to R2

// Benefits:
// - Zero manual work
// - Always correct voice (from voiceConfig)
// - Self-healing (auto-regenerates on R2 miss)
// - Deepgram TTFB < 200ms (no perceptible delay)
// - Works exactly like AI Tutor pattern
```

**TIME SAVED**: **45-60 minutes per week** → **0 minutes**

---

## 🏗️ ARCHITECTURE

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                        │
│  ┌──────────────┐    ┌──────────────┐   ┌───────────────┐ │
│  │ voiceService │ ←→ │ IndexedDB    │   │ Audio Player  │ │
│  │    .js       │    │  TTSCache    │   │ (playbackRate)│ │
│  └──────┬───────┘    └──────────────┘   └───────────────┘ │
└─────────┼──────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                     TIER 1: R2 CDN CHECK                    │
│  https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev       │
│         /audio/week14/read_explore_main.mp3                 │
│                                                             │
│  ✅ HIT:  Return audio instantly (~50ms)                   │
│  ❌ MISS: Proceed to Tier 2 ↓                              │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│            TIER 2: DEEPGRAM WORKER (On-Demand)              │
│  https://engquest-tts-worker.binhkhoi08.workers.dev/tts    │
│    ?text=Welcome+to+my+presentation                         │
│    &station=read                                            │
│    &voice=aura-orion-en                                     │
│    &path=audio/week14/read_explore_main.mp3                 │
│                                                             │
│  1. Call Deepgram API (TTFB < 200ms)                       │
│  2. Return audio to browser immediately                     │
│  3. Save to R2 in background (ctx.waitUntil)               │
│                                                             │
│  Binding: TTS_BUCKET → engquest-audio (R2)                 │
└─────────────────────────────────────────────────────────────┘
```

### Voice Mapping System

```javascript
// src/data/weeks/week_14/index.js
voiceConfig: {
  narration: 'en-US-Neural2-D',   // Male deep (read/explore)
  vocabulary: 'en-US-Neural2-F',  // Female clear (new_word/word_power)
  dictation: 'en-US-Neural2-C',   // Female soft (dictation)
  shadowing: 'en-US-Neural2-F',   // Female clear (shadowing)
  questions: 'en-US-Neural2-J',   // Male energetic (logic/questions)
  mindmap: 'en-US-Neural2-F'      // Female (mindmap)
}

// src/services/voiceService.js - Mapping to Deepgram Aura
const GOOGLE_TO_DEEPGRAM_VOICE = {
  'en-US-Neural2-C': 'aura-luna-en',      // Female soft
  'en-US-Neural2-F': 'aura-asteria-en',   // Female clear
  'en-US-Neural2-D': 'aura-orion-en',     // Male deep
  'en-US-Neural2-J': 'aura-zeus-en',      // Male energetic
}

const STATION_VOICE_KEY = {
  'read': 'narration',          // → aura-orion-en (MALE)
  'new_word': 'vocabulary',     // → aura-asteria-en (FEMALE)
  'dictation': 'dictation',     // → aura-luna-en (FEMALE soft)
  'shadowing': 'shadowing',     // → aura-asteria-en (FEMALE)
  'explore': 'narration',       // → aura-orion-en (MALE)
  'word_power': 'vocabulary',   // → aura-asteria-en (FEMALE)
  'ask_ai': 'questions',        // → aura-zeus-en (MALE)
}
```

---

## 🐛 CRITICAL BUGS DISCOVERED & FIXED

### Bug #1: Worker R2 Binding Not Deployed
**Symptom:**
- Worker logs showed: `[Worker] R2 cached Deepgram - 13.9 KB`
- But files didn't exist on R2 (404 on CDN)
- Bucket size increased, proving files were saved SOMEWHERE
- R2 Dashboard showed empty folders

**Root Cause:**
- `wrangler.toml` had R2 binding configured
- But Worker in production didn't have binding active
- Background save (`ctx.waitUntil`) failed silently

**Fix:**
```bash
cd cloudflare-worker
npx wrangler deploy

# Output confirmed:
# Your Worker has access to the following bindings:
# env.TTS_BUCKET (engquest-audio)  R2 Bucket
```

**Lesson:** Always redeploy Worker after changing bindings in `wrangler.toml`

---

### Bug #2: IndexedDB Cache Persistence
**Symptom:**
- User cleared browser cache and hard reloaded
- Still heard old female voice on Read station (should be male)
- Console showed: `[TTSCache] ✅ HIT: tts_read_2955900...`
- Worker never called (cached old audio locally)

**Root Cause:**
- IndexedDB survives hard reload and "Clear site data" (checkbox not selected)
- Old audio with wrong voice persisted in `tts_cache` database
- App checked IndexedDB before R2 CDN

**Fix:**
```javascript
// In DevTools:
// F12 → Application → IndexedDB → tts_cache → Right-click → Delete database

// Or programmatically:
indexedDB.deleteDatabase('tts_cache');
```

**Lesson:** When changing voice config, must manually delete IndexedDB

**Future Improvement:** Add cache version check
```javascript
const CACHE_VERSION = 2; // Increment when voices change
const dbName = `tts_cache_v${CACHE_VERSION}`;
```

---

### Bug #3: Variable Shadowing (Initialization Error)
**Symptom:**
```
Cannot access 'audioUrl' before initialization
```

**Root Cause:**
```javascript
// Line 467 - Parameter
async useCDN(text, station, deepgramVoice, audioUrl) {
  // Line 477 - Local variable with SAME NAME!
  const audioUrl = this.getAudioUrlFromVoiceConfig(...);
  //    ↑ Shadowed the parameter!
}
```

**Fix:**
```javascript
async useCDN(text, station, deepgramVoice, audioUrl) {
  const blobUrl = URL.createObjectURL(audioBlob); // Renamed
  return this.playAudio(blobUrl, true);
}
```

**Lesson:** Never reuse parameter names for local variables

---

## 🎯 SPEED CONTROL ARCHITECTURE

### ✅ Current Implementation: Client-Side (Optimal)

```javascript
// voiceService.js - Line 625
const savedRate = parseFloat(localStorage.getItem('tts_speed') || '1.0');
audio.playbackRate = (savedRate >= 0.5 && savedRate <= 2.0) ? savedRate : 1.0;
```

**How It Works:**
- R2 stores audio at **normal speed (1.0x)** only
- Browser's HTML5 Audio API adjusts speed client-side
- Same file plays at 0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x

**Benefits:**
```
R2: audio/week14/read_explore_main.mp3 (241 KB) ← Single file

Student A: Play 0.75x → Browser playbackRate = 0.75 ✓
Student B: Play 1.0x  → Browser playbackRate = 1.0 ✓
Student C: Play 1.5x  → Browser playbackRate = 1.5 ✓

→ All use the SAME cached file!
→ No extra storage or API calls
→ Instant speed changes (no re-fetch)
```

**Why NOT Server-Side?**
- ❌ Would need 6 files per audio (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
- ❌ 6× storage cost
- ❌ 6× Deepgram API calls
- ❌ Slower first load (cache miss for each speed)

---

## 📋 UPDATED PRODUCTION WORKFLOW FOR WEEK 15+

### ✅ What Changed

**REMOVED STEPS:**
- ~~Generate audio locally (45 min)~~
- ~~Upload to R2 (15 min)~~
- ~~Verify R2 uploads (5 min)~~

**NEW REQUIREMENT:**
```javascript
// ONLY add voiceConfig to week data
export default {
  week_id: 15,
  title: "Week 15: My Daily Routine",
  // ... other fields ...
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',   // Male (read/explore)
    vocabulary: 'en-US-Neural2-F',  // Female (vocab/word_power)
    dictation: 'en-US-Neural2-C',   // Female soft (dictation)
    shadowing: 'en-US-Neural2-F',   // Female clear (shadowing)
    questions: 'en-US-Neural2-J',   // Male energetic (questions)
    mindmap: 'en-US-Neural2-F'      // Female (mindmap)
  }
}
```

**That's it!** Audio generates automatically on first play.

---

## 🛠️ DEPLOYMENT CHECKLIST

### For Week 15+ Production

**1. Code Deployment (Normal)**
```bash
git add src/data/weeks/week_15/
git commit -m "feat: Add Week 15 data with voiceConfig"
git push

# Cloudflare Pages auto-deploys (2-3 minutes)
```

**2. Worker Deployment (IF worker code changed)**
```bash
cd cloudflare-worker
npx wrangler deploy

# Verify binding:
# "env.TTS_BUCKET (engquest-audio)  R2 Bucket" ✓
```

**3. User Cache Clearing (IF voices changed)**
```
Only needed if voiceConfig changed for existing week.
New weeks don't need cache clearing.

Instructions for users:
- F12 → Application → IndexedDB → tts_cache → Delete database
- Or: Clear Site Data (with all checkboxes checked)
```

---

## 💰 COST ANALYSIS

### Old Workflow (Pre-Generation)
```
Week 14 Audio Files:
- read_explore_main.mp3
- explore_main.mp3
- new_word_1.mp3 ... new_word_8.mp3 (8 files)
- word_power_1.mp3 ... word_power_10.mp3 (10 files)
- dictation_1.mp3 ... dictation_7.mp3 (7 files)
- shadowing_1.mp3 ... shadowing_7.mp3 (7 files)
Total: ~35 files

Deepgram Cost: 35 × $0.0045/min = ~$0.16 per week (one-time)
```

### New Workflow (On-Demand)
```
Files Generated on First Play:
- Same 35 files
- But generated by ~20 students concurrently on Week 14 launch day
- Each file generated ONCE, then cached forever

Deepgram Cost: 35 × $0.0045/min = ~$0.16 per week (one-time)
                                    ↑ SAME COST!

But saved: 60 minutes of developer time × 52 weeks = 52 HOURS/year
```

**R2 Storage:**
- Current: 87.09 MB (all weeks)
- Cost: $0.015/GB/month → ~$0.0013/month
- **Negligible**

---

## 🎓 KEY TAKEAWAYS

### 1. **Always Deploy Worker After Config Changes**
```bash
# ❌ WRONG: Only edit wrangler.toml
vim cloudflare-worker/wrangler.toml
git push

# ✅ RIGHT: Deploy to sync bindings
vim cloudflare-worker/wrangler.toml
npx wrangler deploy  # ← Critical step!
git push
```

### 2. **IndexedDB Survives Hard Reload**
- "Empty Cache and Hard Reload" ≠ Clear IndexedDB
- Must explicitly delete database when voices change
- Consider cache versioning for future

### 3. **Background Tasks Can Fail Silently**
```javascript
// Worker: ctx.waitUntil()
// - If env.TTS_BUCKET is undefined: silently fails
// - No error in logs
// - Always verify binding with wrangler deploy output
```

### 4. **On-Demand > Pre-Generation**
- Faster development (zero manual steps)
- Self-healing (auto-regenerates on miss)
- Always correct (uses latest voiceConfig)
- Same cost as pre-generation
- User experience: <200ms first load, instant thereafter

### 5. **Client-Side Speed Control is Perfect**
- Single file serves all speeds (0.5x - 2.0x)
- Instant speed changes (no fetch)
- Zero extra storage or API costs
- Standard HTML5 Audio API

---

## 📝 DOCUMENTATION UPDATES NEEDED

### 1. Update QUICK_REF.md
```markdown
## ✅ 5. Audio (AUTOMATIC - No Action Needed)

Audio files are generated **on-demand** when users first play them.
Simply ensure `voiceConfig` is present in week data:

voiceConfig: {
  narration: 'en-US-Neural2-D',   // Male
  vocabulary: 'en-US-Neural2-F',  // Female
  dictation: 'en-US-Neural2-C',   // Female soft
  shadowing: 'en-US-Neural2-F',   // Female clear
  questions: 'en-US-Neural2-J',   // Male
  mindmap: 'en-US-Neural2-F'
}

Files cache permanently to R2 after first play.
```

### 2. Update Production Workflow
Remove audio generation steps entirely from:
- WEEK_PRODUCTION_WORKFLOW_SIMPLE.md
- Production_FINAL/QUICK_REF.md
- Any production checklist documents

### 3. Add to Master Prompt
```markdown
## AUDIO GENERATION (AUTOMATIC)

⚠️ DO NOT pre-generate audio files!

Audio is generated on-demand via Deepgram Worker:
1. User clicks play
2. App checks R2 CDN
3. If cached: serve instantly
4. If miss: generate via Deepgram → cache forever

ONLY requirement: Add voiceConfig to week data
```

---

## 🚀 NEXT STEPS FOR WEEK 15

**Production Workflow:**
1. ✅ Create week data with voiceConfig
2. ✅ Deploy to Cloudflare Pages
3. ✅ Test first play (generates audio)
4. ✅ Test second play (R2 cache hit)
5. ✅ Verify correct voices (male/female)

**Skip entirely:**
- ❌ ~~Generate audio locally~~
- ❌ ~~Upload to R2~~
- ❌ ~~Verify uploads~~

**Time saved**: **60 minutes per week**

---

**Document Version:** 1.0  
**Last Updated:** March 12, 2026  
**Next Review:** After Week 15 production
