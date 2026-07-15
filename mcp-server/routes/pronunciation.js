/* eslint-env node */
const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const fetch = require('node-fetch');
const authMiddleware = require('../middleware/authMiddleware');
const { getAPIProviderManager } = require('../services/apiProviderManager');

const router = express.Router();

// Configure multer for audio file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    // Browser MediaRecorder sends MIME like 'audio/webm;codecs=opus' - strip params before comparing
    const baseType = (file.mimetype || '').split(';')[0].trim().toLowerCase();
    const allowedTypes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg', 'audio/mp4', 'audio/x-m4a', 'audio/m4a'];
    if (allowedTypes.includes(baseType)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`));
    }
  }
});

/**
 * OPTIONS /api/pronunciation/*
 * CORS preflight handler - MUST be before authMiddleware
 */
router.options('/evaluate-deepgram', (req, res) => {
  res.sendStatus(200);
});

router.options('/analyze', (req, res) => {
  res.sendStatus(200);
});

router.options('/evaluate', (req, res) => {
  res.sendStatus(200);
});

// All routes protected (except OPTIONS above)
router.use(authMiddleware);

/**
 * POST /api/pronunciation/evaluate-deepgram
 * Evaluate pronunciation using Deepgram STT (high accuracy)
 * Body: multipart/form-data with audio file, targetText, mode
 */
router.post('/evaluate-deepgram', upload.single('audio'), async (req, res) => {
  try {
    const { targetText, mode } = req.body;
    const audioFile = req.file;
    if (!audioFile) {
      return res.status(400).json({ 
        success: false,
        message: 'Audio file is required' 
      });
    }
    
    if (targetText === undefined || targetText === null) {
      return res.status(400).json({ 
        success: false,
        message: 'targetText is required' 
      });
    }

    if (!process.env.DEEPGRAM_API_KEY) {
      console.error('❌ DEEPGRAM_API_KEY not configured');
      return res.status(500).json({
        success: false,
        message: 'Deepgram API not configured'
      });
    }
    
    console.log(`🎤 Deepgram STT - Processing ${mode || 'word'} practice:`, targetText);
    console.log(`📦 Audio size: ${audioFile.size} bytes, type: ${audioFile.mimetype}`);
    
    // Step 1: Transcribe with Deepgram STT
    const deepgramResult = await transcribeWithDeepgram(audioFile);
    
    if (!deepgramResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Deepgram transcription failed',
        error: deepgramResult.error
      });
    }
    
    const { transcript, confidence, words } = deepgramResult;
    
    console.log(`✅ Deepgram transcript: "${transcript}" (confidence: ${(confidence * 100).toFixed(1)}%)`);

    // Step 2: Local scoring — fast, no AI call, not over-strict
    const isWordMode = (mode || 'word') === 'word';
    const score = localScore(transcript, targetText, isWordMode);
    const isCorrect = score >= 70;
    const evaluation = {
      correct: isCorrect,
      score,
      feedback: isCorrect
        ? score >= 90
          ? `Xuất sắc! Phát âm rất chuẩn! 🌟 ("${transcript}")`
          : `Tốt lắm! Khá chuẩn rồi! 👍 ("${transcript}")`
        : `Cô nghe: "${transcript}". Hãy thử nói "${targetText}" rõ hơn nhé.`,
    };
    
    res.json({
      success: true,
      transcript,
      confidence,
      words,
      evaluation,
      provider: 'deepgram'
    });
    
  } catch (error) {
    console.error('❌ Deepgram evaluation error:', error);
    res.status(500).json({
      success: false,
      message: 'Evaluation failed',
      error: error.message
    });
  }
});

/**
 * Helper: Transcribe audio with Deepgram STT
 */
async function transcribeWithDeepgram(audioFile) {
  try {
    const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;
    const DEEPGRAM_URL = 'https://api.deepgram.com/v1/listen';
    
    // Build query parameters for Deepgram
    const params = new URLSearchParams({
      model: 'nova-2',           // Latest Deepgram model (best accuracy)
      language: 'en-US',          // English (US)
      smart_format: 'true',       // Smart formatting
      punctuate: 'false',         // Don't add punctuation (not needed for pronunciation)
      utterances: 'true',         // Detect utterance boundaries
      diarize: 'false'            // Don't need speaker diarization
    });
    
    const url = `${DEEPGRAM_URL}?${params.toString()}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': audioFile.mimetype
      },
      body: audioFile.buffer
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Deepgram API error ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Extract transcript and confidence
    const channel = data.results?.channels?.[0];
    const alternative = channel?.alternatives?.[0];
    
    if (!alternative) {
      throw new Error('No transcription result from Deepgram');
    }
    
    return {
      success: true,
      transcript: alternative.transcript || '',
      confidence: alternative.confidence || 0,
      words: alternative.words || []
    };
    
  } catch (error) {
    console.error('❌ Deepgram transcription error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * POST /api/pronunciation/analyze
 * Analyze pronunciation with Whisper API (Phase 2 feature)
 */
router.post('/analyze', upload.single('audio'), async (req, res) => {
  try {
    const { targetWord, confidence } = req.body;
    const audioFile = req.file;
    
    if (!audioFile) {
      return res.status(400).json({ 
        success: false,
        message: 'Audio file is required' 
      });
    }
    
    if (!targetWord) {
      return res.status(400).json({ 
        success: false,
        message: 'Target word is required' 
      });
    }
    
    const apiManager = getAPIProviderManager();
    
    // Check if should use Whisper based on confidence
    const browserConfidence = parseFloat(confidence) || 0;
    const shouldUseWhisper = apiManager.shouldUseWhisper(
      browserConfidence, 
      isDifficultWord(targetWord)
    );
    
    if (!shouldUseWhisper) {
      return res.json({
        success: false,
        message: 'Whisper not needed for this case',
        usesBrowserOnly: true
      });
    }
    
    console.log(`🎤 Analyzing pronunciation: "${targetWord}" with Whisper`);
    
    // Create a File-like object for OpenAI API
    const audioBuffer = audioFile.buffer;
    const audioBlob = new Blob([audioBuffer], { type: audioFile.mimetype });
    
    // Transcribe with Whisper
    const whisperResult = await apiManager.transcribeWithWhisper(audioBlob, {
      language: 'en'
    });
    
    // Evaluate with Gemini
    const evaluation = await evaluateWithGemini(
      apiManager,
      targetWord,
      whisperResult.text,
      whisperResult.confidence
    );
    
    res.json({
      success: true,
      transcript: whisperResult.text,
      confidence: whisperResult.confidence,
      evaluation: evaluation,
      cost: whisperResult.cost,
      usedWhisper: true
    });
    
  } catch (error) {
    console.error('❌ Pronunciation analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Analysis failed',
      error: error.message
    });
  }
});

/**
 * POST /api/pronunciation/evaluate
 * Quick evaluation using browser transcript only (Phase 1)
 */
router.post('/evaluate', async (req, res) => {
  try {
    const { targetWord, spokenText, confidence } = req.body;
    
    if (!targetWord || !spokenText) {
      return res.status(400).json({
        success: false,
        message: 'targetWord and spokenText are required'
      });
    }
    
    const apiManager = getAPIProviderManager();
    
    // Quick evaluation with Gemini
    const evaluation = await evaluateWithGemini(
      apiManager,
      targetWord,
      spokenText,
      confidence || 0.8
    );
    
    res.json({
      success: true,
      evaluation: evaluation,
      usedWhisper: false
    });
    
  } catch (error) {
    console.error('❌ Evaluation error:', error);
    res.status(500).json({
      success: false,
      message: 'Evaluation failed',
      error: error.message
    });
  }
});

/**
 * Helper: Local pronunciation scoring (Levenshtein + word overlap)
 */
function localScore(transcript, target, isWordMode) {
  const t = (transcript || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const tgt = (target || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  if (!t) return 0;
  if (t === tgt) return 100;
  if (isWordMode) {
    if (t.includes(tgt) || tgt.includes(t)) return 90;
    return Math.round(calculateSimilarity(t, tgt) * 100);
  } else {
    const tWords = t.split(/\s+/).filter(Boolean);
    const tgtWords = tgt.split(/\s+/).filter(Boolean);
    if (!tgtWords.length) return 0;
    const overlapCount = tWords.filter(w => tgtWords.includes(w)).length;
    const overlapScore = overlapCount / tgtWords.length;
    const simScore = calculateSimilarity(t, tgt);
    return Math.round(Math.max(overlapScore, simScore) * 100);
  }
}

/**
 * Helper: Evaluate pronunciation with Gemini (kept for /evaluate route)
 */
async function evaluateWithGemini(apiManager, targetWord, spokenText, confidence) {
  const prompt = `You are Ms. Nova, an expert pronunciation teacher. A student is practicing the word "${targetWord}".

**Target Word:** ${targetWord}
**Student Said:** "${spokenText}"
**Speech Recognition Confidence:** ${(confidence * 100).toFixed(1)}%

**Your Task:**
1. Check if the student said the correct word (allow minor variations like plural, different tenses)
2. Evaluate pronunciation accuracy (0-100)
3. Provide encouraging, specific feedback in Vietnamese

**Response Format (JSON):**
{
  "correct": true/false,
  "score": 0-100,
  "feedback": "Short, encouraging comment in Vietnamese (max 30 words)",
  "tip": "Optional pronunciation tip in Vietnamese if score < 80"
}

**Examples:**
- Student said "apple" for "apple" → {"correct": true, "score": 95, "feedback": "Hoàn hảo! Phát âm rất tốt! 🌟"}
- Student said "aple" for "apple" → {"correct": true, "score": 75, "feedback": "Tốt lắm! Hãy nhấn mạnh âm 'pp' hơn một chút.", "tip": "Nói chậm: 'A-ppul'"}
- Student said "banana" for "apple" → {"correct": false, "score": 0, "feedback": "Ối! Đó không phải là từ đúng đâu. Hãy nghe lại và thử 'apple' nhé."}

Respond ONLY with valid JSON.`;

  try {
    const responseText = await apiManager.callGeminiWithFailover({
      history: [],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
      message: prompt
    });
    
    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const evaluation = JSON.parse(jsonMatch[0]);
      return evaluation;
    }
    
    throw new Error('No JSON found in Gemini response');
    
  } catch (error) {
    console.error('Gemini evaluation error:', error);
    
    // Fallback: Simple text matching
    const targetLower = targetWord.toLowerCase().trim();
    const spokenLower = spokenText.toLowerCase().trim();
    const isMatch = spokenLower.includes(targetLower) || targetLower.includes(spokenLower);
    const similarity = calculateSimilarity(targetLower, spokenLower);
    
    return {
      correct: isMatch && similarity > 0.6,
      score: isMatch ? Math.round(similarity * 100) : 0,
      feedback: isMatch 
        ? `Tốt! Bạn đã nói "${spokenText}". Tiếp tục luyện tập!`
        : `Mình nghe "${spokenText}". Hãy thử nói "${targetWord}" rõ ràng hơn nhé.`,
      fallback: true
    };
  }
}

/**
 * Helper: Check if word is difficult
 */
function isDifficultWord(word) {
  const difficultWords = new Set([
    'three', 'rhythm', 'library', 'squirrel', 'thorough',
    'worcestershire', 'colonel', 'corps', 'anemone',
    'rural', 'sixth', 'month', 'clothes'
  ]);
  
  return difficultWords.has(word.toLowerCase());
}

/**
 * Helper: Calculate Levenshtein distance similarity
 */
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = (s1, s2) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };
  
  const distance = editDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

module.exports = router;
