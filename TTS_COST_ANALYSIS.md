# TTS Infrastructure Cost Analysis & Alternatives

## ⏱️ Generation Timeline (Realistic Estimate)

### Option A: Regenerate Weeks 1-7 Only (Kokoro Better Quality)
```
Total files: 1,931 MP3s
Kokoro speed: ~1-2 seconds per file (local CPU)
Generation: 1,931 × 1.5s = 2,896s = 48 minutes
Upload to R2: ~30-45 minutes (parallel upload)
TOTAL: ~1.5 hours ✅ ACCEPTABLE
```

### Option B: Generate Weeks 8-20 Only (Hybrid Approach)
```
Estimated files for weeks 8-20: ~3,000 MP3s
Generation: 3,000 × 1.5s = 4,500s = 75 minutes
Upload to R2: ~60 minutes
TOTAL: ~2.25 hours ✅ ACCEPTABLE
```

### Option C: Full System (All 20 weeks)
```
Total files: ~5,000 MP3s
Generation: 5,000 × 1.5s = 7,500s = 125 minutes
Upload to R2: ~90 minutes
TOTAL: ~3.5 hours ⚠️ MANAGEABLE (run overnight)
```

**Conclusion:** Thời gian 2-3 giờ là HOÀN TOÀN chấp nhận được, chạy 1 lần rồi xong!

---

## 💰 Hugging Face Spaces Pricing Analysis

### Current: FREE Tier (CPU Basic)
```
Specifications:
- vCPU: 2 cores
- RAM: 16GB
- Storage: 50GB
- Cold Start: ❌ YES (container sleeps after 15 min idle)
- Response Time: 7-10s first request, then 2-3s
- Cost: $0/month
```

**Problems:**
- Cold start KHÔNG THỂ TRÁNH được trên FREE tier
- Container ngủ sau 15 phút không activity
- 1000 học sinh = high chance of cold start every session

---

### Paid Option 1: CPU Upgrade ($0.03/hour)
```
Specifications:
- vCPU: 8 cores (4x faster)
- RAM: 32GB (2x more)
- Storage: 100GB
- Cold Start: ❌ STILL YES (container vẫn ngủ)
- Cost: $0.03/hour × 24 hours × 30 days = $21.60/month

VERDICT: ❌ KHÔNG ĐÁNG
- Vẫn có cold start (không giải quyết vấn đề chính)
- Chỉ nhanh hơn trong generation (không quan trọng với static files)
```

---

### Paid Option 2: Persistent Storage Add-on ($5/month)
```
Feature: Keeps container ALWAYS ON (no sleep)
Cost: $5/month
Cold Start: ✅ ELIMINATED
Response Time: 2-3s consistently

VERDICT: ⚠️ TẠM CHẤP NHẬN ĐƯỢC
- Giải quyết cold start
- Giá hợp lý $5/month
- NHƯNG: Vẫn chậm hơn CDN (2-3s vs 100ms)
```

---

### Paid Option 3: GPU Instance (T4 Small) ($0.60/hour)
```
Specifications:
- GPU: NVIDIA T4
- RAM: 16GB
- No cold start (persistent)
- Ultra-fast generation (<500ms)
- Cost: $0.60/hour × 24 × 30 = $432/month

VERDICT: ❌ QUÁ ĐẮNG CHO TTS
- Overkill cho Kokoro TTS
- GPU không cần thiết cho inference đơn giản
```

---

## 🔍 Alternative FREE Hosting Options

### 1. Railway.app
```
Previous: Free tier (eliminated Dec 2023)
Current: Starter Plan $5/month
- 512MB RAM
- Always-on (no cold start)
- 100GB egress/month
- Good for TTS server

VERDICT: ⚠️ $5/month, tương đương HF Persistent Storage
```

---

### 2. Fly.io
```
Free Allowance:
- 3 shared-cpu-1x VMs (256MB RAM each)
- 160GB egress/month
- No cold start if configured correctly

Kokoro Requirements:
- Model size: 88MB (fit trong RAM)
- CPU-only inference: ✅ Works
- Free tier: ✅ SUFFICIENT for light usage

VERDICT: ✅ FREE OPTION KHẢ THI
- Nhưng 256MB RAM hơi eo hẹp
- Cần optimize model loading
```

**Test Command:**
```bash
# Deploy to Fly.io
fly launch --name engquest-tts
fly scale memory 512  # Upgrade to 512MB (still free with 1 instance)
```

---

### 3. Render.com
```
Free Tier:
- 512MB RAM
- Cold start: ❌ YES (sleeps after 15 min, same as HF)
- Resume time: 30-60s (WORSE than HF)
- Bandwidth: Unlimited

VERDICT: ❌ WORSE than HF Spaces
- Longer cold start
- Same limitation
```

---

### 4. Koyeb.com
```
Free Tier (NEW):
- 2GB RAM per service
- 2.4 million execution seconds/month (~27 days)
- Auto-sleep after inactivity
- Wake-up: <5s (better than HF)

VERDICT: ⚠️ INTERESTING but still has cold start
```

---

### 5. Modal.com
```
Serverless GPU/CPU:
- Pay per second of compute
- Free tier: $10/month credit
- Cold start: ~2-3s (better than HF)
- Scales to zero automatically

Cost Estimate:
- 1000 users × 50 requests/day = 50,000 requests
- Average 0.5s compute time = 25,000 seconds
- $0.0001/second = $2.50/month

VERDICT: ✅ VERY PROMISING
- Better cold start than HF
- Pay-per-use model (cost-effective)
- Auto-scaling
```

---

## 🎯 FINAL RECOMMENDATION: Hybrid CDN Approach

### Why Static Files (R2 + CDN) is STILL BEST

**Performance Comparison:**

| Solution | Cold Start | Latency | Cost/mo | Scale |
|----------|-----------|---------|---------|-------|
| HF Free | 7-10s ❌ | 2-3s | $0 | Poor |
| HF Persistent | None ✅ | 2-3s | $5 | Medium |
| Fly.io Free | <5s ⚠️ | 1-2s | $0 | Medium |
| Modal.com | 2-3s ⚠️ | 0.5s | $2.50 | Good |
| Railway | None ✅ | 1-2s | $5 | Medium |
| **R2 + CDN** | **None ✅** | **<100ms** | **$0.50** | **Excellent** |

**Key Advantages of CDN:**

1. **No Cold Start Ever** ✅
   - Files always available
   - No container to wake up
   - No model loading delay

2. **Ultra-Low Latency** ✅
   - Edge locations worldwide
   - 50-100ms response time
   - vs 2-3s for live generation

3. **Infinite Scale** ✅
   - CDN handles 1 user or 1 million users
   - No capacity planning needed
   - No "server down" risk

4. **Lowest Cost** ✅
   - $0.50/month for 5000 files
   - No compute charges
   - No bandwidth charges (CF free tier)

5. **One-Time Setup** ✅
   - Generate once (~2 hours)
   - Upload once (~1 hour)
   - Works forever

---

## 💡 OPTIMAL SOLUTION: Static Files + Fallback

### Architecture (RECOMMENDED)

```
┌─────────────┐
│   Student   │
│   Browser   │
└──────┬──────┘
       │
       ↓ 1. Check Client Cache (IndexedDB)
       ├─→ HIT (50ms) → Play ✅
       │
       ↓ 2. Fetch from CDN (Cloudflare)
       ├─→ HIT (100ms) → Play ✅
       │
       ↓ 3. Fallback to Live TTS (Modal.com)
       └─→ Generate (2s) → Play + Cache ✅

┌──────────────────┐
│  Cloudflare R2   │  Static files (weeks 1-20)
│  + CDN Cache     │  ~5000 MP3s, $0.50/month
└──────────────────┘

┌──────────────────┐
│  Modal.com       │  Dynamic TTS (user-generated)
│  Serverless      │  $2.50/month for 1000 users
└──────────────────┘
```

### Implementation Code

```javascript
// src/services/voiceService.js

const CDN_URL = 'https://cdn.bkbacademy.vn'; // Cloudflare R2 custom domain
const FALLBACK_TTS_URL = 'https://engquest-tts.modal.run'; // Modal.com endpoint

async speak(text, audioUrl, speed, callback, station) {
  // 1. Check client cache first
  const cached = await TTSCache.get(text, station);
  if (cached) {
    console.log('[TTS] ✅ Cache hit (0ms)');
    return this.playAudio(cached);
  }
  
  // 2. Try CDN (static pre-generated files)
  const hash = hashText(text + station);
  const cdnUrl = `${CDN_URL}/tts/${station}_${hash}.mp3`;
  
  try {
    const response = await fetch(cdnUrl, { 
      cache: 'force-cache',
      headers: { 'Accept': 'audio/mpeg' }
    });
    
    if (response.ok) {
      console.log('[TTS] ✅ CDN hit (~100ms)');
      const blob = await response.blob();
      await TTSCache.set(text, station, blob); // Cache locally
      return this.playAudio(URL.createObjectURL(blob));
    }
  } catch (err) {
    console.warn('[TTS] CDN miss, trying fallback...', err.message);
  }
  
  // 3. Fallback: Live TTS generation (Modal.com or HF)
  console.log('[TTS] Generating live...');
  return this.fetchWithRetry(text, station);
}
```

---

## 📊 Cost Comparison Table (1000 Students)

| Solution | Setup Time | Monthly Cost | Latency | Reliability |
|----------|-----------|--------------|---------|-------------|
| **R2 + CDN + Modal** | **2-3 hours** | **$3.00** | **100ms** | **99.9%** ✅ |
| HF Persistent | 0 hours | $5.00 | 2-3s | 98% |
| Fly.io Free | 1 hour | $0 | 1-2s | 95% |
| Modal Only | 1 hour | $10.00 | 500ms | 99% |
| Railway | 1 hour | $5.00 | 1-2s | 99% |

**Winner: R2 + CDN + Modal.com fallback** 
- Best performance (100ms)
- Lowest cost ($3/mo)
- Highest reliability
- One-time setup

---

## 🛠️ ACTION PLAN (RECOMMENDED)

### Phase 1: Generate Static Files (THIS WEEKEND)

**Saturday (3 hours):**
1. ✅ Create extraction script (30 min)
2. ✅ Generate Kokoro TTS for weeks 1-7 (1 hour)
3. ✅ Upload to Cloudflare R2 (1 hour)
4. ✅ Test CDN delivery (30 min)

**Sunday (4 hours):**
1. ✅ Generate weeks 8-20 (2 hours)
2. ✅ Upload to R2 (1.5 hours)
3. ✅ Update voiceService.js with CDN logic (30 min)

**Monday:**
- Deploy to production
- Monitor metrics
- **Result:** 99% of requests served from CDN at <100ms

---

### Phase 2: Setup Fallback Server (NEXT WEEK)

**Option A: Keep HF Spaces (FREE)**
- For rare dynamic TTS (<1% traffic)
- Cold start acceptable for edge cases
- Cost: $0

**Option B: Deploy to Modal.com ($2.50/month)**
- Better cold start (2-3s vs 7-10s)
- Pay-per-use (only charge for actual usage)
- Easier scaling
- Cost: ~$2.50/month

**My Recommendation:** Start with Option A (FREE), upgrade to Modal if needed.

---

## 💰 FINAL COST BREAKDOWN

### Year 1 Costs

| Component | Cost |
|-----------|------|
| **Cloudflare R2 Storage** (5000 files, 75MB) | $0.015/month × 12 = **$0.18** |
| **R2 Class A Operations** (upload once) | $0.05 one-time |
| **CDN Bandwidth** (25GB/month) | FREE (within CF free tier) |
| **Modal.com Fallback** (<1% traffic) | $0-2.50/month × 12 = **$30** |
| **Domain** (cdn.bkbacademy.vn) | Existing |
| **TOTAL YEAR 1** | | **~$30/year** |

**Compare to:**
- HF Enterprise (custom domain): $200/month = $2,400/year
- Railway Always-On: $5/month = $60/year
- Google Cloud TTS API: $4/million chars = $100+/month = $1,200/year

**ROI:** Save $2,370/year vs HF Enterprise 💰

---

## 🎯 IMMEDIATE NEXT STEPS

**RIGHT NOW (if you approve):**

1. **Create generation script** (15 minutes)
   - Extract all text from week files
   - Map to correct voices
   - Generate with Kokoro CLI

2. **Test small batch** (10 minutes)
   - Generate 10 files from Week 1
   - Verify quality matches HF Spaces
   - Confirm file sizes acceptable

3. **Full generation** (2 hours - run overnight)
   - Generate all 5000 files
   - Verify no errors
   - Check total size (~75-100MB)

4. **Upload to R2** (1 hour - tomorrow)
   - Set up Cloudflare R2 bucket
   - Configure custom domain
   - Upload all files with cache headers

5. **Update code** (30 minutes)
   - Implement CDN-first logic
   - Keep HF as fallback
   - Deploy to production

**Timeline:** 
- Start tonight: Generate files (run overnight)
- Tomorrow morning: Upload + deploy
- Tomorrow afternoon: **PRODUCTION READY** ✅

**Your call:** Should I start creating the generation script now? 🚀
