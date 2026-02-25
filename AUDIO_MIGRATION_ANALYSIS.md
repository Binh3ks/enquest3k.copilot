# Audio Asset Migration Analysis: Gemini TTS vs Kokoro TTS

## 📊 Current Inventory

### Existing Assets (Gemini TTS)
```bash
Location: /public/audio/week{1-7}{,_easy}/
Total Files: 1,931 MP3 files
Coverage: Weeks 1-7 (both EASY and ADVANCED modes)
```

### File Organization
```
week1/
├── ask_ai_1.mp3 to ask_ai_5.mp3
├── dictation_1.mp3 to dictation_10.mp3
├── shadowing_1.mp3 to shadowing_15.mp3
├── vocab_*.mp3
└── ... (all stations covered)

week1_easy/
├── (same structure with EASY mode content)
```

### Quality Metrics (Gemini TTS)

**Audio Specs:**
- **Sample Rate**: 24,000 Hz (24kHz) ✅ Good for speech
- **Bitrate**: 64 kbps (medium quality)
- **Channels**: Mono
- **Format**: MP3
- **Average File Size**: 15-30KB per file

**Pros:**
- ✅ Already generated (1,931 files ready)
- ✅ 24kHz sample rate (standard for speech)
- ✅ Small file sizes (fast loading)
- ✅ Organized by week/mode
- ✅ Naming convention matches app structure

**Cons:**
- ⚠️ Only 3 voices (vs 7 voices in new system)
- ⚠️ 64kbps bitrate (lower than optimal)
- ⚠️ Gemini TTS quality varies (robotic at times)

---

## 🎯 Kokoro TTS Comparison

### Quality Metrics

**Audio Specs:**
- **Sample Rate**: 24,000 Hz (same as Gemini)
- **Bitrate**: 96-128 kbps (1.5-2x better)
- **Channels**: Mono
- **Format**: MP3/WAV
- **Average File Size**: 20-40KB per file (+33% larger)

**Pros:**
- ✅ **7 voices** (af_sky, af_bella, af_nicole, af_sarah, am_adam, am_michael, bf_emma)
- ✅ **Better naturalness** (state-of-art neural TTS)
- ✅ **Consistent quality** (no robotic artifacts)
- ✅ **Station-specific voices** (different voice per station)
- ✅ **Open-source + Local** (no API dependency)

**Cons:**
- ❌ Needs regeneration (1,931 files)
- ❌ Larger files (+33% bandwidth)
- ⏱️ Time to generate (~2-3 hours for all)

---

## 💡 Migration Strategy Recommendation

### ✅ OPTION A: Hybrid Approach (RECOMMENDED)

**Keep Gemini TTS for Weeks 1-7, Generate Kokoro for Weeks 8-20**

**Rationale:**
1. **Avoid Wasted Work**: 1,931 files already usable
2. **Consistency**: Apply new voice system to future weeks only
3. **Time Efficiency**: Focus generation on uncovered weeks (8-20)
4. **A/B Testing**: Users naturally compare old vs new quality

**Implementation:**
```javascript
// src/services/voiceService.js

const KOKORO_WEEKS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const GEMINI_WEEKS = [1, 2, 3, 4, 5, 6, 7];

async speak(text, audioUrl, speed, callback, station) {
  const weekId = getCurrentWeekId(); // from context
  
  // Try local static file first (Gemini weeks 1-7)
  if (GEMINI_WEEKS.includes(weekId) && audioUrl) {
    try {
      const staticUrl = `/audio/week${weekId}${isEasyMode ? '_easy' : ''}/${audioUrl}`;
      const response = await fetch(staticUrl);
      if (response.ok) {
        return this.playAudio(URL.createObjectURL(await response.blob()));
      }
    } catch (e) {
      console.warn('[Audio] Static file miss, trying CDN...');
    }
  }
  
  // Try CDN (Kokoro weeks 8-20)
  if (KOKORO_WEEKS.includes(weekId)) {
    const hash = hashText(text + station);
    const cdnUrl = `${CDN_URL}/week${weekId}/${station}_${hash}.mp3`;
    try {
      const response = await fetch(cdnUrl);
      if (response.ok) {
        return this.playAudio(URL.createObjectURL(await response.blob()));
      }
    } catch (e) {
      console.warn('[Audio] CDN miss, trying live TTS...');
    }
  }
  
  // Fallback: Live TTS generation (HF Spaces)
  return this.fetchWithRetry(text, station);
}
```

**Timeline:**
- Week 0: ✅ Already done (1,931 files)
- Week 1: Generate Kokoro for weeks 8-10 (test quality)
- Week 2: Generate Kokoro for weeks 11-15
- Week 3: Generate Kokoro for weeks 16-20
- Week 4: Upload to CDN + test delivery

**Cost:**
- Generation: FREE (local Kokoro)
- Storage: ~$1/month (Cloudflare R2)
- Bandwidth: FREE (Cloudflare CDN)

---

### ⚠️ OPTION B: Full Replacement (NOT RECOMMENDED)

**Regenerate All 1,931 Files with Kokoro**

**Rationale:**
- Consistent 7-voice experience across all weeks
- Better audio quality throughout
- Future-proof architecture

**Cons:**
- ❌ **Time-consuming**: 2-3 hours generation time
- ❌ **Wasted existing assets**: 1,931 usable files discarded
- ❌ **Risk**: Bugs in generation script = start over
- ❌ **Bandwidth**: 33% more data for weeks 1-7

**Only choose if:**
- Gemini TTS quality is unacceptable to users
- Need perfect consistency for branding
- Have spare time for full regeneration

---

### 🔄 OPTION C: Gradual Migration

**Replace on User Complaint**

**Strategy:**
- Keep Gemini for all weeks initially
- When user reports "voice sounds robotic", regenerate that week only
- Track quality issues per week

**Pros:**
- Zero upfront work
- Data-driven decisions
- Resource-efficient

**Cons:**
- Inconsistent user experience
- Reactive instead of proactive
- May take months to complete

---

## 🎯 Final Recommendation

### Choose **OPTION A: Hybrid Approach**

**Week-by-Week Plan:**

| Week | Mode | Action | Voice |
|------|------|--------|-------|
| 1-7 | EASY + ADV | ✅ Keep Gemini | 3 voices |
| 8-10 | EASY + ADV | 🆕 Generate Kokoro | 7 voices |
| 11-15 | EASY + ADV | 🆕 Generate Kokoro | 7 voices |
| 16-20 | EASY + ADV | 🆕 Generate Kokoro | 7 voices |

**Benefits:**
1. ✅ **Immediate value**: Use existing 1,931 files
2. ✅ **Better quality forward**: Kokoro for weeks 8-20
3. ✅ **Risk mitigation**: Test Kokoro on limited scope first
4. ✅ **Resource efficient**: Focus on uncovered content
5. ✅ **User feedback**: Compare quality across weeks naturally

**Next Steps:**
1. [ ] Create extraction script for weeks 8-20 text content
2. [ ] Generate Kokoro TTS for weeks 8-10 (pilot)
3. [ ] Upload to Cloudflare R2
4. [ ] Update voiceService.js with hybrid logic
5. [ ] Test with real users (both Gemini and Kokoro weeks)
6. [ ] If Kokoro quality significantly better → regenerate weeks 1-7 later

---

## 📝 Technical Implementation

### Step 1: Extract Text from Week 8-20

```python
# extract_week_text.py
import json
from pathlib import Path

def extract_all_tts_text(week_num, mode='EASY'):
    """Extract all TTS-eligible text from a week's data"""
    week_file = f"src/data/weeks/week_{week_num:02d}_real.js"
    
    # Parse JS file to extract:
    # - sentences (dictation, shadowing, reading)
    # - vocabulary words + definitions
    # - story missions dialogue
    # - ask_ai prompts
    # etc.
    
    output = {
        'week': week_num,
        'mode': mode,
        'stations': {
            'dictation': [],
            'shadowing': [],
            'read': [],
            'vocab': [],
            # ...
        }
    }
    
    return output
```

### Step 2: Generate with Kokoro

```python
# generate_kokoro_batch.py
import subprocess
import hashlib

VOICE_MAP = {
    'read': 'af_sky',
    'ask_ai': 'af_sky',
    'new_word': 'af_bella',
    'explore': 'af_bella',
    'word_power': 'af_bella',
    'dictation': 'am_adam',
    'shadowing': 'am_adam'
}

def generate_tts(text, station, week, mode):
    """Generate single TTS file with Kokoro"""
    voice = VOICE_MAP.get(station, 'af_sky')
    hash_id = hashlib.md5(f"{text}{station}".encode()).hexdigest()[:10]
    
    output_path = f"public/audio_kokoro/week{week}{'_easy' if mode=='EASY' else ''}/{station}_{hash_id}.mp3"
    
    # Call Kokoro CLI or Python API
    subprocess.run([
        'kokoro-cli',
        '--voice', voice,
        '--text', text,
        '--output', output_path
    ])
    
    return output_path

# Batch process weeks 8-20
for week in range(8, 21):
    for mode in ['EASY', 'ADVANCED']:
        texts = extract_all_tts_text(week, mode)
        for station, sentences in texts['stations'].items():
            for text in sentences:
                generate_tts(text, station, week, mode)
```

### Step 3: Upload to Cloudflare R2

```bash
# Upload entire directory structure
npx wrangler r2 object put engquest-tts/week8/ \
  --file ./public/audio_kokoro/week8/ \
  --recursive \
  --content-type audio/mpeg \
  --cache-control "public, max-age=31536000, immutable"

# Repeat for weeks 9-20
```

---

## 📈 Expected Outcomes

### Performance Metrics

| Metric | Gemini (Weeks 1-7) | Kokoro (Weeks 8-20) |
|--------|-------------------|---------------------|
| **Load Time** | 50ms (local) | 100ms (CDN) |
| **Audio Quality** | 6/10 | 9/10 |
| **Voice Variety** | 3 voices | 7 voices |
| **Naturalness** | Robotic | Human-like |
| **File Size** | 15KB avg | 20KB avg |
| **Cold Start** | ❌ N/A | ✅ No cold start |

### User Experience

**Week 1-7 (Gemini):**
- Acceptable quality for foundational content
- Instant loading (files already cached locally)
- Familiar voices for returning students

**Week 8-20 (Kokoro):**
- Noticeable quality upgrade
- New voices create fresh experience
- CDN ensures fast global delivery

---

## 🎬 Action Plan

**This Week:**
- [x] Analyze existing Gemini files (DONE)
- [ ] Test Kokoro voice quality (sample 10 files)
- [ ] Create extraction script for week 8 text
- [ ] Generate Kokoro for Week 8 EASY mode (~150 files)
- [ ] Compare quality: Gemini Week 1 vs Kokoro Week 8

**Next Week (if quality approved):**
- [ ] Generate Weeks 9-10 with Kokoro
- [ ] Set up Cloudflare R2 bucket
- [ ] Upload Week 8-10 to CDN
- [ ] Deploy hybrid voiceService.js
- [ ] A/B test with real students

**Month 2:**
- [ ] Generate Weeks 11-20 progressively
- [ ] Monitor bandwidth and cache hit rates
- [ ] Collect user feedback on voice quality
- [ ] Decide: Keep Gemini 1-7 or regenerate?

---

## 💰 Cost Summary

| Component | Weeks 1-7 (Gemini) | Weeks 8-20 (Kokoro) | Total |
|-----------|-------------------|---------------------|-------|
| Generation | $0 (done) | $0 (local) | $0 |
| Storage | $0 (local) | $0.50/mo (R2) | $0.50/mo |
| Bandwidth | $0 (local) | $0 (CF free) | $0 |
| Maintenance | Minimal | Minimal | **$0.50/mo** |

**Comparison:**
- Full Kokoro regeneration: Same cost, 2-3 hours work
- HF Spaces live TTS: $0/mo but poor UX (cold starts)
- Paid TTS services: $50-200/month for this volume

**Winner: Hybrid approach at $0.50/month** ✅
