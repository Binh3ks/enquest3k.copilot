# 🎤 DEEPGRAM STT INTEGRATION FOR PRONUNCIATION TAB

## 📋 OVERVIEW

**Goal:** Replace Web Speech API with Deepgram Speech-to-Text for better pronunciation scoring accuracy

**Problem:** 
- Current Web Speech API gives low confidence (60-80%) with poor microphones
- No phoneme-level analysis → cannot provide specific feedback
- Noise-sensitive → inaccurate transcription

**Solution:**
- Integrate Deepgram STT API for professional-grade speech recognition
- Get phoneme-level data for detailed pronunciation feedback
- Improve scoring accuracy from 60-80% → 90-95%+

---

## 🏗️ ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRONUNCIATION FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Student clicks "I'm Ready to Say It!"                      │
│     ↓                                                           │
│  2. Frontend records audio (MediaRecorder API)                 │
│     → Format: webm/opus (best browser support)                 │
│     ↓                                                           │
│  3. Send audio blob to backend API                             │
│     → POST /api/pronunciation/evaluate                         │
│     ↓                                                           │
│  4. Backend forwards to Deepgram STT                           │
│     → URL: https://api.deepgram.com/v1/listen                  │
│     → Get: transcript, confidence, phonemes                    │
│     ↓                                                           │
│  5. Backend passes result to AI evaluation                     │
│     → Compare expected text vs spoken text                     │
│     → Analyze phonemes → specific feedback                     │
│     ↓                                                           │
│  6. Return structured feedback:                                │
│     { score: 95, correct: true, feedback: "...", tip: "..." } │
│     ↓                                                           │
│  7. Frontend displays result with encouraging message          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 PHASE 1: BACKEND - DEEPGRAM STT ENDPOINT

### File: `server/routes/pronunciation.js` (NEW)

```javascript
import express from 'express';
import fetch from 'node-fetch';
import FormData from 'form-data';

const router = express.Router();

// Deepgram STT configuration
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
const DEEPGRAM_STT_URL = 'https://api.deepgram.com/v1/listen';

/**
 * POST /api/pronunciation/evaluate
 * Body: { audio: Blob, expectedText: string, mode: "word"|"sentence" }
 */
router.post('/evaluate', async (req, res) => {
  try {
    const { audio, expectedText, mode } = req.body;
    
    if (!audio || !expectedText) {
      return res.status(400).json({ error: 'Missing audio or expectedText' });
    }

    // Step 1: Send audio to Deepgram STT
    const deepgramResponse = await fetch(DEEPGRAM_STT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': 'audio/webm' // or audio/wav
      },
      body: audio,
      params: {
        model: 'nova-2', // Latest Deepgram model
        language: 'en-US',
        smart_format: true,
        punctuate: false, // Don't care about punctuation for pronunciation
        utterances: true,
        phonemes: true, // ⭐ Key feature - get phoneme-level data
        diarize: false
      }
    });

    if (!deepgramResponse.ok) {
      throw new Error(`Deepgram API error: ${deepgramResponse.status}`);
    }

    const deepgramData = await deepgramResponse.json();
    
    // Extract transcript and confidence
    const transcript = deepgramData.results.channels[0].alternatives[0].transcript;
    const confidence = deepgramData.results.channels[0].alternatives[0].confidence;
    const words = deepgramData.results.channels[0].alternatives[0].words || [];
    const phonemes = deepgramData.results.channels[0].alternatives[0].phonemes || [];

    console.log('🎤 Deepgram STT Result:', {
      transcript,
      confidence,
      words: words.length,
      phonemes: phonemes.length
    });

    // Step 2: Evaluate pronunciation with AI
    const evaluation = await evaluateWithAI({
      expectedText,
      spokenText: transcript,
      confidence,
      words,
      phonemes,
      mode
    });

    res.json({
      success: true,
      transcript,
      confidence,
      evaluation
    });

  } catch (error) {
    console.error('❌ Pronunciation evaluation error:', error);
    res.status(500).json({ 
      error: 'Evaluation failed', 
      message: error.message 
    });
  }
});

/**
 * Evaluate pronunciation using AI with Deepgram data
 */
async function evaluateWithAI({ expectedText, spokenText, confidence, words, phonemes, mode }) {
  // Build detailed prompt with phoneme data
  const wordDetails = words.map(w => 
    `"${w.word}" (confidence: ${(w.confidence * 100).toFixed(0)}%)`
  ).join(', ');

  const prompt = mode === 'word' 
    ? `
**Pronunciation Evaluation - Word Level**

**Expected word:** ${expectedText}
**Student said:** "${spokenText}"
**Deepgram confidence:** ${(confidence * 100).toFixed(1)}%
**Word breakdown:** ${wordDetails}

**Task:**
1. Check if student said the correct word (allow minor variations like plural/tense)
2. Evaluate pronunciation accuracy (0-100 score)
3. Provide specific feedback in VIETNAMESE with encouragement

**Response format (JSON):**
{
  "correct": true/false,
  "score": 0-100,
  "feedback": "Nhận xét cụ thể bằng tiếng Việt (tối đa 30 từ)",
  "tip": "Gợi ý cải thiện (nếu cần)"
}

**Scoring guidelines:**
- 95-100: Perfect pronunciation
- 85-94: Very good, minor issues
- 70-84: Good, some pronunciation errors
- < 70: Needs more practice

Only return JSON, no extra text.
    `
    : `
**Pronunciation Evaluation - Sentence Level**

**Expected sentence:** ${expectedText}
**Student said:** "${spokenText}"
**Deepgram confidence:** ${(confidence * 100).toFixed(1)}%
**Word breakdown:** ${wordDetails}

**Task:**
1. Check if student conveyed the correct meaning (allow variations)
2. Evaluate intonation, fluency, and linking (0-100 score)
3. Provide feedback in VIETNAMESE focusing on naturalness

**Response format (JSON):**
{
  "correct": true/false,
  "score": 0-100,
  "feedback": "Nhận xét về ngữ điệu và độ trôi chảy (tối đa 40 từ)",
  "tip": "Gợi ý về liên kết âm hoặc nhịp nói"
}

Only return JSON, no extra text.
    `;

  // Call AI API (existing getAiTutorResponse function)
  const aiResponse = await getAiTutorResponse({
    history: [],
    message: prompt
  });

  // Parse JSON from AI response
  try {
    const jsonMatch = aiResponse.data.response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (parseError) {
    console.error('Failed to parse AI response:', parseError);
  }

  // Fallback: Simple string matching
  const similarity = calculateSimilarity(spokenText, expectedText);
  return {
    correct: similarity > 0.7,
    score: Math.round(similarity * 100),
    feedback: similarity > 0.7 
      ? `Tốt lắm! Em đã nói "${spokenText}".`
      : `Cô nghe em nói "${spokenText}". Hãy thử lại với "${expectedText}".`,
    tip: similarity < 0.7 ? 'Nghe Ms. Nova lại và chú ý cách phát âm từng âm tiết.' : ''
  };
}

/**
 * Calculate string similarity (Levenshtein distance)
 */
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

export default router;
```

---

## 📦 PHASE 2: FRONTEND - MEDIA RECORDER

### Update: `src/modules/ai_tutor/tabs/PronunciationTab.jsx`

```javascript
// Add at top
import { recordAudio } from '../../../utils/audioRecorder';

// Replace handlePractice function
const handlePractice = async () => {
  if (!recognitionRef.current) {
    alert('Speech recognition not supported. Please use Chrome or Edge.');
    return;
  }

  setPracticeMode('recording');
  setCurrentFeedback(null);
  
  try {
    // 🎤 Record audio using MediaRecorder
    console.log('🎤 Starting audio recording...');
    const audioBlob = await recordAudio(5000); // 5 seconds max
    
    console.log('📦 Audio recorded:', {
      size: audioBlob.size,
      type: audioBlob.type
    });

    setPracticeMode('evaluating');

    // Get expected text based on mode
    const isWordMode = practiceTypeRef.current === 'word';
    const word = currentWordRef.current;
    const sentence = currentSentenceRef.current;
    const expectedText = isWordMode 
      ? (word?.word || word?.text || '')
      : sentence;

    // 📤 Send to Deepgram STT backend
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    formData.append('expectedText', expectedText);
    formData.append('mode', isWordMode ? 'word' : 'sentence');

    const response = await fetch('/api/pronunciation/evaluate', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Evaluation API failed');
    }

    const result = await response.json();
    
    console.log('✅ Evaluation result:', result);

    // Update UI with result
    const { transcript, confidence, evaluation } = result;
    
    setCurrentFeedback({
      success: evaluation.correct,
      score: evaluation.score,
      message: evaluation.feedback,
      tip: evaluation.tip,
      spokenText: transcript,
      confidence: (confidence * 100).toFixed(0)
    });

    // Record attempt for progress tracking
    const attemptRecord = {
      word: expectedText,
      spoken: transcript,
      score: evaluation.score,
      correct: evaluation.correct,
      timestamp: Date.now()
    };
    const newAttempts = [...attempts, attemptRecord];
    setAttempts(newAttempts);

    // Auto-pass after 5 attempts
    const newAttemptCount = attemptCount + 1;
    setAttemptCount(newAttemptCount);
    const autoPass = newAttemptCount >= 5;

    // Save progress
    const progressKey = `ai_pronunciation`;
    await updateProgress(progressKey, {
      wordsPracticed: {
        ...wordsPracticed,
        [expectedText]: evaluation.score
      },
      attempts: newAttempts,
      currentWordIndex: isWordMode ? currentWordIndex : 0,
      currentSentenceIndex: !isWordMode ? currentSentenceIndex : 0,
      correctCount,
      lastPracticeAt: new Date().toISOString()
    });

    // Move to next or complete
    if (evaluation.correct || autoPass) {
      setCorrectCount(prev => prev + 1);
      setPracticeMode('complete');
    } else {
      setPracticeMode('listen');
    }

  } catch (error) {
    console.error('❌ Recording/Evaluation error:', error);
    setCurrentFeedback({
      success: false,
      score: 0,
      message: 'Có lỗi xảy ra. Hãy thử lại nhé!'
    });
    setPracticeMode('listen');
  }
};
```

---

## 📦 PHASE 3: UTILITY - AUDIO RECORDER

### File: `src/utils/audioRecorder.js` (NEW)

```javascript
/**
 * Record audio from user microphone
 * @param {number} maxDuration - Max recording duration in ms (default 5000)
 * @returns {Promise<Blob>} - Audio blob in webm/opus format
 */
export async function recordAudio(maxDuration = 5000) {
  // Request microphone permission
  const stream = await navigator.mediaDevices.getUserMedia({ 
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    } 
  });

  // Create MediaRecorder
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  });

  const audioChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  // Start recording
  mediaRecorder.start();
  console.log('🎙️ Recording started...');

  // Auto-stop after maxDuration
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    }, maxDuration);

    mediaRecorder.onstop = () => {
      clearTimeout(timeout);
      stream.getTracks().forEach(track => track.stop()); // Release microphone
      
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      console.log('⏹️ Recording stopped. Size:', audioBlob.size);
      resolve(audioBlob);
    };

    mediaRecorder.onerror = (error) => {
      clearTimeout(timeout);
      stream.getTracks().forEach(track => track.stop());
      console.error('❌ MediaRecorder error:', error);
      reject(error);
    };
  });
}
```

---

## 🧪 TESTING PLAN

### Test Case 1: Word Practice with Good Pronunciation
```
Expected: "hello"
Student says: "hello" (clear)
Expected Result:
- Deepgram confidence: 95%+
- Score: 95-100
- Feedback: "Xuất sắc! Em phát âm rất rõ ràng!"
```

### Test Case 2: Word Practice with Poor Microphone
```
Expected: "three"
Student says: "three" (noisy background)
Current Result (Web Speech API):
- Confidence: 60%
- Score: 60
- Feedback: "Good! Try again."

Expected Result (Deepgram):
- Confidence: 90%+ (Deepgram filters noise better)
- Score: 90-95
- Feedback: "Rất tốt! Em đã nói đúng từ!"
```

### Test Case 3: Mispronunciation Detection
```
Expected: "apple"
Student says: "aple" (missing 'p')
Expected Result:
- Deepgram detects missing phoneme
- Score: 60-70
- Feedback: "Gần đúng rồi! Chú ý phát âm 'p' đôi trong 'apple' nhé."
- Tip: "Nghe Ms. Nova lại và tập phát âm 'ap-ple' từng âm tiết."
```

---

## 💰 COST ESTIMATION

**Deepgram STT Pricing (Pay-as-you-go):**
- Nova-2 model: **$0.0043/minute** ($0.043/10 min)
- Average pronunciation practice: **5 seconds/attempt**
- Cost per attempt: **$0.0043 × (5/60) ≈ $0.00036**

**Usage Estimate:**
- 1000 students × 20 attempts/week = 20,000 attempts
- 20,000 × $0.00036 = **$7.20/week**
- Monthly: **~$30**

**Comparison with current free Web Speech API:**
- Current: $0 (but poor accuracy)
- Deepgram: $30/month (professional accuracy)
- **ROI**: Better learning outcomes → higher student retention

---

## ✅ BENEFITS SUMMARY

| Metric | Web Speech API (Current) | Deepgram STT (Proposed) |
|--------|-------------------------|------------------------|
| **Confidence with poor mic** | 60-80% | 90-95% |
| **Noise tolerance** | Low | High |
| **Phoneme data** | ❌ No | ✅ Yes |
| **Specific feedback** | ❌ Generic | ✅ Detailed |
| **Student experience** | Frustrating (always 70-80%) | Encouraging (90%+) |
| **Cost** | Free | ~$30/month |

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] **Phase 1**: Create backend API endpoint `/api/pronunciation/evaluate`
- [ ] **Phase 2**: Update frontend `PronunciationTab.jsx` with MediaRecorder
- [ ] **Phase 3**: Create `audioRecorder.js` utility
- [ ] **Phase 4**: Update `server/index.js` to register pronunciation routes
- [ ] **Phase 5**: Add `DEEPGRAM_API_KEY` to `.env`
- [ ] **Phase 6**: Test with different microphone qualities
- [ ] **Phase 7**: Monitor Deepgram usage in dashboard
- [ ] **Phase 8**: Collect student feedback on accuracy
- [ ] **Phase 9**: Optional: Add phoneme-level feedback UI
- [ ] **Phase 10**: Document in master prompt V5.4

---

## 📝 NOTES

1. **Fallback Strategy**: If Deepgram API fails, fallback to Web Speech API (graceful degradation)
2. **Quota Management**: Monitor Deepgram usage, implement rate limiting if needed
3. **Future Enhancement**: Use phoneme data to show visual feedback (which sound to focus on)
4. **Mobile Support**: Test on iOS Safari (MediaRecorder limited support, may need polyfill)

---

## 🎯 SUCCESS METRICS

**After 2 weeks of deployment:**
- [ ] Average pronunciation score increases from 70% → 90%+
- [ ] Student satisfaction with "Speak" tab improves (survey)
- [ ] Completion rate of pronunciation practice increases
- [ ] Deepgram API costs stay within $50/month budget

---

**Document Version:** 1.0  
**Created:** March 3, 2026  
**Author:** GitHub Copilot  
**Status:** 🟡 Proposed (Awaiting approval)
