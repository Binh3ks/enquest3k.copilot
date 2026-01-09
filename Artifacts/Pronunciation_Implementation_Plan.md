# 🎯 PRONUNCIATION ASSESSMENT - IMPLEMENTATION PLAN

**Project:** EngQuest AI Tutor - Speak Mode Enhancement  
**Created:** January 7, 2026  
**Status:** Phase 1 Complete ✅ | Phase 2 Planning  
**Target Users:** Vietnamese students learning English (Ages 7-12)

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Technical Architecture](#technical-architecture)
3. [Phase 1: MVP (Complete)](#phase-1-mvp-complete)
4. [Phase 2: Hybrid Enhancement](#phase-2-hybrid-enhancement)
5. [Phase 3: Self-Hosted Scale](#phase-3-self-hosted-scale)
6. [Testing Strategy](#testing-strategy)
7. [Monitoring & Metrics](#monitoring--metrics)
8. [Risk Mitigation](#risk-mitigation)

---

## 🎯 EXECUTIVE SUMMARY

### Current State (Phase 1 - MVP)
✅ **Implemented & Running:**
- Browser Web Speech Recognition API (free, client-side)
- Gemini 2.0 Flash Exp for text-based evaluation (free tier)
- Vietnamese feedback generation for students
- Basic word matching with confidence scoring

**Cost:** $0/month  
**Capacity:** 50-100 concurrent users  
**Accuracy:** ~80-85% for basic vocabulary

### Target State (Phase 2 - Production Ready)
🎯 **Goal:**
- Hybrid approach: Browser + Whisper API for difficult cases
- 95%+ accuracy for all word types
- Detailed pronunciation feedback with tips
- Support for 1,000+ active users

**Cost:** $15-30/month  
**Capacity:** 1,000+ concurrent users  
**Accuracy:** ~90-95% for all vocabulary levels

---

## 🏗️ TECHNICAL ARCHITECTURE

### Phase 1 Architecture (Current)

```
┌─────────────────┐
│   Student UI    │
│  (React + Vite) │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Browser Web Speech Recognition API │
│  - continuous: false                │
│  - interimResults: false            │
│  - lang: 'en-US'                    │
│  - maxAlternatives: 3               │
└────────┬────────────────────────────┘
         │ transcript + confidence
         ▼
┌─────────────────────────────────────┐
│     Frontend Logic                  │
│  - Validate transcript              │
│  - Store attempt history            │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│   Backend API (Node.js/Express)     │
│   POST /api/ai/chat                 │
│   - Port: 5001                      │
└────────┬────────────────────────────┘
         │ { history, message }
         ▼
┌─────────────────────────────────────┐
│   Gemini 2.0 Flash Exp              │
│   - Model: gemini-2.0-flash-exp     │
│   - Free tier: 15 RPM, 1.5M RPD     │
│   - Task: Text comparison & scoring │
└────────┬────────────────────────────┘
         │ JSON response
         ▼
┌─────────────────────────────────────┐
│   Evaluation Result                 │
│   { correct, score, feedback, tip } │
└─────────────────────────────────────┘
```

### Phase 2 Architecture (Planned)

```
┌─────────────────┐
│   Student UI    │
└────────┬────────┘
         │
         ▼
    ┌────────────┐
    │ Confidence │
    │   Check    │
    └──┬─────┬───┘
       │     │
   High│     │Low (<0.7)
       │     │
       ▼     ▼
   ┌─────┐ ┌──────────────┐
   │ STT │ │ Capture      │
   │(Free│ │ Audio Blob   │
   └──┬──┘ └──────┬───────┘
      │           │
      │           ▼
      │    ┌─────────────────┐
      │    │ OpenAI Whisper  │
      │    │ API ($0.006/min)│
      │    └──────┬──────────┘
      │           │
      └─────┬─────┘
            ▼
    ┌───────────────┐
    │ Gemini Flash  │
    │  Evaluation   │
    └───────────────┘
```

---

## ✅ PHASE 1: MVP (COMPLETE)

### Completed Tasks

#### Frontend Implementation
- [x] **PronunciationTab.jsx**
  - Created pronunciation practice UI with word display
  - Integrated Web Speech Recognition API
  - Added state management for practice flow
  - Implemented audio playback with TTS
  - Created feedback display with scores

- [x] **Speech Recognition Setup**
  ```javascript
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 3;
  ```

- [x] **State Management**
  - currentWordIndex tracking
  - practiceMode states: listen | recording | evaluating | complete
  - Attempts history tracking
  - Feedback storage with currentFeedback

#### Backend Implementation
- [x] **Fixed Gemini Model**
  - Changed from `gemini-1.5-flash` → `gemini-2.0-flash-exp`
  - Fixed 404 model not found error
  - Updated `/api/ai/chat` endpoint

- [x] **API Integration**
  - Correct request format: `{ history, message }`
  - JSON response parsing with fallback
  - Error handling for API failures

#### Data Structure Support
- [x] **Multiple Field Name Support**
  - `target_vocab` (primary - from week_01_real.js)
  - `global_vocab` (fallback)
  - `vocabulary` (legacy support)
  - Flexible field mapping for word/text, meaning/definition

#### Bug Fixes
- [x] Fixed `currentWord` undefined error with refs
- [x] Fixed Speech Recognition callback capturing stale values
- [x] Fixed API parameter mismatch (400/500 errors)
- [x] Added null checks for safety

### Current Performance Metrics

| Metric | Value |
|--------|-------|
| **Success Rate** | ~85% (basic words) |
| **Response Time** | 0.5-1.5s (realtime) |
| **Cost** | $0 |
| **Uptime** | 99% (free tier) |
| **Concurrent Users** | 3-5 max (15 RPM limit) |

### Known Limitations

1. **Accuracy Issues:**
   - Cannot detect subtle pronunciation errors (th/s, r/l)
   - Only checks word correctness, not pronunciation quality
   - Browser STT accuracy varies with accent/noise

2. **Technical Constraints:**
   - Chrome/Edge only (Firefox not supported)
   - Requires microphone permission
   - Network dependent (no offline mode)

3. **Scale Limitations:**
   - 15 requests/minute limit
   - 1,500 requests/day limit
   - Rate limiting needed for >5 concurrent users

---

## 🚀 PHASE 2: HYBRID ENHANCEMENT

### Objectives
- Improve accuracy to 90-95%
- Handle difficult/challenging words better
- Support 100-1,000 concurrent users
- Add detailed pronunciation tips

### Implementation Timeline: **2-4 weeks**

### Task Breakdown

#### Week 1: Backend Infrastructure

**Task 2.1: Audio Capture & Upload** (3 days)
```javascript
// Frontend: Capture audio blob
const mediaRecorder = new MediaRecorder(stream, {
  mimeType: 'audio/webm'
});

let audioChunks = [];
mediaRecorder.ondataavailable = (e) => {
  audioChunks.push(e.data);
};

mediaRecorder.onstop = async () => {
  const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
  // Send to backend
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('targetWord', currentWord.word);
  
  const result = await fetch('/api/pronunciation/analyze', {
    method: 'POST',
    body: formData
  });
};
```

**Task 2.2: Whisper API Integration** (2 days)
```javascript
// Backend: mcp-server/routes/pronunciation.js
const OpenAI = require('openai');
const openai = new OpenAI();

router.post('/analyze', upload.single('audio'), async (req, res) => {
  const { targetWord } = req.body;
  const audioFile = req.file;
  
  try {
    // Convert webm to mp3 if needed
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
      response_format: 'verbose_json' // Get confidence scores
    });
    
    // Forward to Gemini for evaluation
    const evaluation = await evaluateWithGemini({
      target: targetWord,
      spoken: transcription.text,
      confidence: transcription.confidence
    });
    
    res.json(evaluation);
  } catch (error) {
    console.error('Whisper API error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});
```

**Task 2.3: Confidence Threshold Logic** (1 day)
```javascript
// Frontend: PronunciationTab.jsx
const CONFIDENCE_THRESHOLD = 0.7;
const DIFFICULT_WORDS = new Set(['three', 'rhythm', 'library', ...]);

const handlePractice = async () => {
  const targetWord = currentWord.word || currentWord.text;
  const isDifficult = DIFFICULT_WORDS.has(targetWord.toLowerCase());
  
  // Start browser recognition
  recognitionRef.current.start();
  
  recognitionRef.current.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    const confidence = event.results[0][0].confidence;
    
    // Decision: Use Whisper or not?
    if (confidence < CONFIDENCE_THRESHOLD || isDifficult) {
      console.log('Low confidence - using Whisper for verification');
      await analyzeWithWhisper(transcript, targetWord);
    } else {
      console.log('High confidence - quick evaluation');
      await evaluatePronunciation(transcript, confidence);
    }
  };
};
```

#### Week 2: Frontend Enhancement

**Task 2.4: UI States Update** (2 days)
- Add "Analyzing with AI..." state for Whisper calls
- Display different feedback for quick vs deep analysis
- Show confidence visualization (progress bars)
- Add pronunciation tips panel

**Task 2.5: Retry Mechanism** (1 day)
```javascript
const analyzeWithRetry = async (audioBlob, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await analyzeWithWhisper(audioBlob);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

**Task 2.6: Caching Layer** (2 days)
```javascript
// Backend: Cache common word evaluations
const redis = require('redis');
const client = redis.createClient();

const getCachedEvaluation = async (word, transcript) => {
  const key = `eval:${word}:${transcript}`;
  const cached = await client.get(key);
  if (cached) return JSON.parse(cached);
  return null;
};

const cacheEvaluation = async (word, transcript, result) => {
  const key = `eval:${word}:${transcript}`;
  await client.setex(key, 3600, JSON.stringify(result)); // 1 hour TTL
};
```

#### Week 3-4: Testing & Optimization

**Task 2.7: A/B Testing Setup** (3 days)
- Create test groups: 50% browser-only, 50% hybrid
- Collect metrics: accuracy, latency, cost
- Analyze results and optimize threshold

**Task 2.8: Rate Limiting** (2 days)
```javascript
// Backend: Rate limiter for Whisper API
const rateLimit = require('express-rate-limit');

const whisperLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 requests per minute (to stay under $1/hour)
  message: 'Too many analysis requests, please try again later'
});

router.post('/analyze', whisperLimiter, async (req, res) => {
  // ... whisper logic
});
```

**Task 2.9: Performance Monitoring** (2 days)
- Add logging for all analysis paths
- Track: success rate, avg latency, cost per request
- Setup alerts for error rates >5%

### Phase 2 Success Criteria

- [ ] Whisper integration tested with 100+ samples
- [ ] Accuracy improved to 90%+ (measured on test set)
- [ ] 95% of requests use free browser STT
- [ ] Average cost <$0.02 per active user per month
- [ ] Latency <2s for 95th percentile
- [ ] Error rate <2%

---

## 🌐 PHASE 3: SELF-HOSTED SCALE

### Timeline: **3-6 months** (when >1,000 DAU)

### Infrastructure Setup

**Task 3.1: VPS Deployment** (1 week)
```yaml
# docker-compose.yml
version: '3.8'
services:
  whisper:
    image: fedirz/faster-whisper-server:latest
    ports:
      - "8000:8000"
    volumes:
      - ./models:/models
    environment:
      - MODEL_NAME=small
      - DEVICE=cpu
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - whisper
```

**Task 3.2: Load Balancing** (3 days)
```nginx
# nginx.conf
upstream whisper_backend {
  least_conn;
  server whisper1:8000 max_fails=3 fail_timeout=30s;
  server whisper2:8000 max_fails=3 fail_timeout=30s;
}

server {
  listen 443 ssl http2;
  server_name api.engquest.com;
  
  location /api/whisper {
    proxy_pass http://whisper_backend;
    proxy_set_header Host $host;
    proxy_connect_timeout 10s;
    proxy_read_timeout 30s;
  }
}
```

**Task 3.3: Auto-Scaling** (5 days)
- Setup DigitalOcean Kubernetes cluster
- Configure horizontal pod autoscaling
- Implement health checks
- Add monitoring with Prometheus + Grafana

### Cost Projection (Phase 3)

| Item | Cost/Month |
|------|------------|
| VPS Droplet (2GB RAM) × 2 | $12 |
| Load Balancer | $10 |
| Backup Storage | $2 |
| Monitoring (Grafana Cloud) | $5 |
| **TOTAL** | **~$30/month** |

**ROI Analysis:**
- Saves $270/month vs full Whisper API
- Supports unlimited requests
- Complete data control

---

## 🧪 TESTING STRATEGY

### Unit Tests

```javascript
// tests/pronunciation.test.js
describe('PronunciationTab', () => {
  it('should recognize correct pronunciation', async () => {
    const result = await evaluatePronunciation('apple', 0.9);
    expect(result.correct).toBe(true);
    expect(result.score).toBeGreaterThan(80);
  });
  
  it('should detect mispronunciation', async () => {
    const result = await evaluatePronunciation('aple', 0.6);
    expect(result.correct).toBe(false);
    expect(result.tip).toBeDefined();
  });
  
  it('should use Whisper for low confidence', async () => {
    const spy = jest.spyOn(whisperAPI, 'transcribe');
    await handlePractice({ word: 'three' }, 0.5);
    expect(spy).toHaveBeenCalled();
  });
});
```

### Integration Tests

**Test Case 1: End-to-End Flow**
```javascript
test('Complete pronunciation practice flow', async () => {
  // 1. Load word
  render(<PronunciationTab weekData={mockWeekData} />);
  
  // 2. Listen to Ms. Nova
  fireEvent.click(screen.getByText('Listen to Ms. Nova'));
  await waitFor(() => expect(mockTTS).toHaveBeenCalled());
  
  // 3. Record pronunciation
  fireEvent.click(screen.getByText("I'm Ready to Say It!"));
  mockSpeechRecognition.simulateResult('apple', 0.85);
  
  // 4. Verify feedback
  await waitFor(() => {
    expect(screen.getByText(/Good!/)).toBeInTheDocument();
    expect(screen.getByText(/85/)).toBeInTheDocument();
  });
});
```

### User Acceptance Testing

**Test Group:** 20 students (ages 7-12)  
**Duration:** 2 weeks  
**Metrics:**
- Task completion rate
- User satisfaction (5-point scale)
- Accuracy perceived by teachers
- Engagement time per session

---

## 📊 MONITORING & METRICS

### Key Performance Indicators (KPIs)

```javascript
// Analytics tracking
const trackPronunciationAttempt = (data) => {
  analytics.track('pronunciation_attempt', {
    word: data.word,
    correct: data.correct,
    score: data.score,
    confidence: data.confidence,
    method: data.usedWhisper ? 'whisper' : 'browser',
    latency_ms: data.latency,
    user_id: userId,
    session_id: sessionId
  });
};
```

### Dashboard Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Success Rate | >90% | <85% |
| Avg Latency | <1.5s | >3s |
| Error Rate | <2% | >5% |
| API Cost/User | <$0.05/mo | >$0.10/mo |
| Whisper Usage | ~5% | >15% |
| User Satisfaction | >4.0/5 | <3.5/5 |

### Monitoring Stack

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'engquest-api'
    static_configs:
      - targets: ['localhost:5001']
    metrics_path: '/metrics'
    scrape_interval: 15s

# Grafana Dashboard Panels:
- Pronunciation Attempts (time series)
- Success Rate by Word (pie chart)
- Latency Distribution (histogram)
- Cost Tracking (gauge)
- Error Rate (alert graph)
```

---

## ⚠️ RISK MITIGATION

### Risk 1: API Rate Limits Exceeded

**Impact:** High  
**Probability:** Medium (Phase 2)  
**Mitigation:**
- Implement queue system with Bull/Redis
- Add user-facing queue position indicator
- Upgrade to paid Gemini tier if needed ($0.35/1M input tokens)

### Risk 2: Whisper API Costs Exceed Budget

**Impact:** Medium  
**Probability:** Low (with 5% usage)  
**Mitigation:**
- Monitor cost daily with alerts
- Adjust confidence threshold dynamically
- Fall back to browser-only if budget exceeded

### Risk 3: Browser STT Accuracy Degrades

**Impact:** High  
**Probability:** Low  
**Mitigation:**
- Maintain accuracy baseline metrics
- A/B test different Speech Recognition configs
- Increase Whisper usage threshold if needed

### Risk 4: Gemini API Changes/Deprecation

**Impact:** High  
**Probability:** Very Low  
**Mitigation:**
- Abstract AI provider behind interface
- Have fallback providers ready (Claude, GPT-4)
- Monitor Google AI Studio announcements

### Risk 5: Self-Hosted Infrastructure Downtime

**Impact:** High (Phase 3 only)  
**Probability:** Medium  
**Mitigation:**
- Multi-region deployment
- Auto-failover to cloud API
- 24/7 monitoring with PagerDuty

---

## 📝 NEXT ACTIONS

### Immediate (This Week)
- [ ] Test current MVP with 5 real students
- [ ] Collect feedback on accuracy and UX
- [ ] Document accuracy baseline on test dataset
- [ ] Monitor Gemini API usage vs free limits

### Short-term (This Month)
- [ ] Decide on Phase 2 timeline based on user growth
- [ ] Setup OpenAI account and test Whisper API
- [ ] Create test dataset of 100 challenging words
- [ ] Implement basic analytics tracking

### Long-term (Next Quarter)
- [ ] Evaluate Phase 3 need based on DAU metrics
- [ ] Research VPS providers and costs
- [ ] Plan for scale: caching, CDN, edge computing

---

## 📚 REFERENCES

- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [OpenAI Whisper API Docs](https://platform.openai.com/docs/guides/speech-to-text)
- [Gemini API Reference](https://ai.google.dev/docs)
- [faster-whisper GitHub](https://github.com/guillaumekln/faster-whisper)
- [EngQuest Master Prompt V23](../ENGQUEST%20MASTER%20PROMPT%20V23-FINAL.txt)

---

**Document Version:** 1.0  
**Last Updated:** January 7, 2026  
**Next Review:** February 7, 2026  
**Owner:** EngQuest Development Team
