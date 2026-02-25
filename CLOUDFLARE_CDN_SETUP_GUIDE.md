# Cloudflare CDN Setup Guide for EngQuest TTS

## Architecture Overview

```
Frontend (Vite) → Cloudflare CDN → Hugging Face Spaces → Kokoro TTS
                      ↓ (95% cache hit after Week 1)
                  Cached MP3 (1 month TTL)
```

## Cost Model (1000 users, 25 requests/day/user)

| Period | Cache Hit Rate | Server Requests | Cloudflare Cost | Notes |
|--------|---------------|-----------------|-----------------|-------|
| Day 1 | 0% | 25,000 | $0 | Cold start, all misses |
| Day 2 | 80% | 5,000 | $0 | Most content cached |
| Week 2+ | 95% | 1,250/day | $0-5/month | Steady state |

**Total cost**: $0-70/month (vs $7,200/month Azure-only)

---

## Phase 1: Deploy TTS Server to Hugging Face Spaces

### 1.1 Create Hugging Face Space

1. Go to https://huggingface.co/spaces
2. Click "Create new Space"
3. Settings:
   - Name: `engquest-tts-server`
   - SDK: Docker
   - Hardware: CPU Basic (FREE, 2 vCPU, 16GB RAM)
   - Visibility: Public

### 1.2 Create Dockerfile

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install ffmpeg for WAV→MP3 conversion
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download Kokoro models
RUN curl -L -o kokoro-v1.0.int8.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx && \
    curl -L -o voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin

# Copy app
COPY app.py .

# Create cache directory
RUN mkdir -p cache

# Expose port 7860 (Hugging Face default)
EXPOSE 7860

# Run server
ENV PORT=7860
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "7860"]
```

### 1.3 Create requirements.txt

```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
kokoro-onnx==0.5.0
edge-tts==6.1.9
soundfile==0.12.1
onnxruntime==1.24.1
```

### 1.4 Upload Files to HF Space

```bash
# Clone Space repository
git clone https://huggingface.co/spaces/YOUR_USERNAME/engquest-tts-server
cd engquest-tts-server

# Copy files
cp esl_server/app.py .
cp esl_server/requirements.txt .
# Create Dockerfile (paste content above)

# Commit and push
git add .
git commit -m "Deploy Kokoro TTS server"
git push
```

### 1.5 Wait for Build (5-10 minutes)

Check logs at: `https://huggingface.co/spaces/YOUR_USERNAME/engquest-tts-server/logs`

Expected output:
```
🎙️ Initializing Kokoro TTS...
✅ Kokoro TTS ready (88MB int8 model)
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:7860
```

### 1.6 Test HF Space

```bash
# Test health endpoint
curl https://YOUR_USERNAME-engquest-tts-server.hf.space/health

# Test TTS generation
curl "https://YOUR_USERNAME-engquest-tts-server.hf.space/tts?text=Hello&station=read" -o test.mp3
```

---

## Phase 2: Setup Cloudflare CDN Caching

### 2.1 Add Domain to Cloudflare

1. Sign up at https://cloudflare.com (Free plan)
2. Add your domain (e.g., `engquest.com`)
3. Update nameservers at your domain registrar
4. Wait for DNS propagation (5-60 minutes)

### 2.2 Create Cloudflare Worker (Option A - Recommended)

Go to Workers & Pages → Create Worker → Paste this code:

```javascript
// Cloudflare Worker for TTS Caching
const TTS_BACKEND = 'https://YOUR_USERNAME-engquest-tts-server.hf.space';
const CACHE_TTL = 2592000; // 1 month in seconds

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Only cache TTS endpoints
  if (!url.pathname.startsWith('/tts') && !url.pathname.startsWith('/speak')) {
    // Forward other requests directly
    return fetch(TTS_BACKEND + url.pathname + url.search);
  }
  
  // Create cache key from URL (includes text + station parameters)
  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;
  
  // Try to get from cache
  let response = await cache.match(cacheKey);
  
  if (response) {
    console.log('Cache HIT:', url.pathname);
    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': `public, max-age=${CACHE_TTL}`,
        'X-Cache': 'HIT',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  // Cache MISS - forward to TTS server
  console.log('Cache MISS:', url.pathname);
  const backendUrl = TTS_BACKEND + url.pathname + url.search;
  response = await fetch(backendUrl);
  
  if (response.ok) {
    // Clone response for caching
    const responseToCache = response.clone();
    
    // Cache the response
    const headers = new Headers(responseToCache.headers);
    headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`);
    headers.set('X-Cache', 'MISS');
    headers.set('Access-Control-Allow-Origin', '*');
    
    const cachedResponse = new Response(responseToCache.body, {
      status: responseToCache.status,
      headers: headers
    });
    
    // Store in cache (async, don't wait)
    event.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
    
    return cachedResponse;
  }
  
  return response;
}
```

Deploy Worker:
- Worker name: `engquest-tts-cache`
- Route: `tts.engquest.com/*`
- Save and Deploy

### 2.3 Setup Custom Domain for Worker

1. Workers & Pages → engquest-tts-cache → Settings → Triggers
2. Add Custom Domain: `tts.engquest.com`
3. Cloudflare will auto-create DNS record

### 2.4 Update Frontend Environment Variable

```bash
# .env
VITE_TTS_SERVER_URL=https://tts.engquest.com
```

Rebuild frontend:
```bash
npm run build
```

---

## Phase 3: Verify Caching Works

### 3.1 Test Cache MISS (First Request)

```bash
curl -I "https://tts.engquest.com/tts?text=Hello&station=read"
```

Expected headers:
```
HTTP/2 200
content-type: audio/mpeg
cache-control: public, max-age=2592000
x-cache: MISS
cf-cache-status: MISS
```

### 3.2 Test Cache HIT (Second Request)

```bash
curl -I "https://tts.engquest.com/tts?text=Hello&station=read"
```

Expected headers:
```
HTTP/2 200
content-type: audio/mpeg
cache-control: public, max-age=2592000
x-cache: HIT
cf-cache-status: HIT
age: 5  ← seconds since cached
```

### 3.3 Monitor Cache Hit Rate

Cloudflare Dashboard → Analytics → Caching

**Target**: 95% cache hit rate after 1 week

---

## Phase 4: Production Monitoring

### 4.1 Hugging Face Spaces Monitoring

Check logs daily:
```
https://huggingface.co/spaces/YOUR_USERNAME/engquest-tts-server/logs
```

Watch for:
- Memory usage (should stay <8GB)
- Request rate (should be ~1,250/day with 95% cache)
- Errors (Kokoro failures)

### 4.2 Cloudflare Analytics

Monitor:
- Cache hit rate (target: >95%)
- Bandwidth usage (target: <10GB/month)
- Request count (25,000/day = 750K/month)

### 4.3 Cost Tracking

**Free Tier Limits:**
- HF Spaces: Unlimited requests (CPU Basic)
- Cloudflare: 100K requests/day FREE
- Cloudflare Workers: 100K requests/day FREE

**Paid Threshold:**
- HF Spaces: Never (always free with cache)
- Cloudflare: $5/10M requests if >100K/day

**Expected Monthly Cost:**
- Month 1: $0 (under free limits)
- Month 2+: $0-5 (95% cache hit rate)

---

## Phase 5: Backup Strategy (Azure TTS Fallback)

### 5.1 Add Azure TTS as Overflow

Only needed if HF Space goes down or traffic spikes.

Update `voiceService.js`:

```javascript
const TTS_SERVER_URL = import.meta.env.VITE_TTS_SERVER_URL || 'http://localhost:8000';
const AZURE_TTS_KEY = import.meta.env.VITE_AZURE_TTS_KEY; // Only if needed

async useServerTTS(text, station = 'read') {
  try {
    // Try Cloudflare → HF Spaces (primary)
    const response = await fetch(`${TTS_SERVER_URL}/tts?text=${encodeURIComponent(text)}&station=${station}`);
    if (response.ok) return await this.playAudio(response);
  } catch (err) {
    console.warn('Primary TTS failed, trying Azure fallback:', err);
  }
  
  // Fallback to Azure (only if primary fails)
  if (AZURE_TTS_KEY) {
    try {
      const azureResponse = await fetch('https://eastus.tts.speech.microsoft.com/cognitiveservices/v1', {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_TTS_KEY,
          'Content-Type': 'application/ssml+xml'
        },
        body: this.buildAzureSSML(text, station)
      });
      if (azureResponse.ok) return await this.playAudio(azureResponse);
    } catch (azureErr) {
      console.error('Azure TTS also failed:', azureErr);
    }
  }
  
  // Final fallback: browser TTS
  throw new Error('All TTS services failed');
}
```

---

## Troubleshooting

### Issue 1: HF Space "Sleeping"

**Symptom**: First request after 1 hour takes 30+ seconds

**Solution**: 
- Upgrade to persistent hardware (GPU T4 Small: $0.60/hour)
- OR: Accept cold start (Cloudflare will still cache result)

### Issue 2: Cache Not Working

**Check 1**: Verify cache headers in response
```bash
curl -I https://tts.engquest.com/tts?text=test&station=read | grep -i cache
```

**Check 2**: Cloudflare Page Rules
- Go to Rules → Page Rules
- Ensure "Cache Everything" is enabled for `tts.engquest.com/*`

### Issue 3: High Server Load

**Symptom**: >5,000 requests/day to HF Space

**Diagnosis**: Low cache hit rate (<80%)

**Solutions**:
1. Check URL consistency (same text = same URL)
2. Increase cache TTL to 3 months
3. Pre-cache common phrases (Week 1 content)

---

## Success Metrics

### Week 1
- ✅ HF Space deployed and stable
- ✅ Cloudflare Worker caching 50%+ requests
- ✅ All 7 voices working correctly

### Week 2
- ✅ Cache hit rate >80%
- ✅ <1,000 requests/day to HF Space
- ✅ Zero cost (<100K CF requests/day)

### Week 4
- ✅ Cache hit rate >95%
- ✅ <500 requests/day to HF Space  
- ✅ Total cost $0-5/month

---

## Maintenance Schedule

### Daily (Automated)
- Monitor HF Space uptime (UptimeRobot)
- Check error logs

### Weekly
- Review Cloudflare Analytics
- Check cache hit rate trend
- Verify audio quality (spot checks)

### Monthly
- Review costs (should be $0-5)
- Update Kokoro models if new release
- Clear cache if content updated

---

## Comparison: With vs Without Cloudflare CDN

| Metric | Without CDN | With CDN (95% cache) |
|--------|-------------|---------------------|
| Server requests/day | 25,000 | 1,250 |
| Generation time/request | 3-5s | <100ms (cached) |
| Monthly cost | $600 (24/7 GPU) | $0-5 (CPU + cache) |
| Scalability | Limited by GPU | Unlimited (CDN) |
| Reliability | Single point of failure | Redundant (CDN + HF) |

**Conclusion**: Cloudflare CDN reduces costs by 99% while improving performance 30x.

---

## Contact & Support

- Hugging Face Spaces: https://discuss.huggingface.co/
- Cloudflare Community: https://community.cloudflare.com/
- Kokoro Issues: https://github.com/thewh1teagle/kokoro-onnx/issues
