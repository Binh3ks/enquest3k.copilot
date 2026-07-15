/* eslint-env node */
const express = require('express');
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');
const { getAPIProviderManager } = require('../services/apiProviderManager');

const router = express.Router();

// AI routes are public - API keys are protected server-side
// authMiddleware removed to allow unauthenticated students to use AI features

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  const { history, message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'A new message is required.' });
  }

  try {
    const apiManager = getAPIProviderManager();
    
    // Use API manager with auto-failover
    const text = await apiManager.callGeminiWithFailover({
      history: (history || []).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content || m.text }]
      })),
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
      message: message
    });

    res.json({ response: text });

  } catch (error) {
    console.error('Error with Google AI API:', error);
    res.status(500).json({ 
      message: 'An error occurred while communicating with the AI service.', 
      details: error.message 
    });
  }
});

// POST /api/ai/tts
router.post('/tts', async (req, res) => {
  const { text, voice, model, speed } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || !apiKey.startsWith('sk-')) {
    // Return successful status but with an error flag if API key is missing
    return res.status(200).json({ audioError: true, message: 'OpenAI API Key missing or invalid.' });
  }

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/audio/speech',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      data: {
        model: model || 'tts-1',
        voice: voice || 'shimmer',
        input: text,
        speed: speed || 1.0
      },
      responseType: 'arraybuffer',
      timeout: 8000 // 8s timeout for OpenAI
    });

    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);

  } catch (error) {
    // If OpenAI fails (quota, network, etc.), return 200 with error flag
    console.warn('[TTS Proxy] OpenAI API failed (likely quota). Signalling frontend to fallback.');
    res.status(200).json({ 
      audioError: true, 
      message: error.response?.data?.error?.message || 'OpenAI TTS Service Error',
      originalStatus: error.response?.status || 500 
    });
  }
});

// POST /api/ai/generate - Universal AI generation proxy
// Replaces all direct frontend calls to Cerebras/Groq/Gemini/Together
// Keys stored securely here on the server, never in the browser bundle
router.post('/generate', async (req, res) => {
  const { messages, options } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: '`messages` array is required' });
  }
  try {
    const apiManager = getAPIProviderManager();
    const result = await apiManager.generateConversation(messages, options || {});
    res.json(result); // { text, provider }
  } catch (error) {
    console.error('[AI generate] Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/ai/google-tts - Google TTS proxy (keeps key server-side)
router.post('/google-tts', async (req, res) => {
  const { text, voice, languageCode } = req.body;
  if (!text) return res.status(400).json({ message: 'text is required' });

  const apiKey = process.env.GOOGLE_TTS_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ message: 'Google TTS not configured on server' });
  }

  try {
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        input: { text },
        voice: { languageCode: languageCode || 'en-US', name: voice || 'en-US-Neural2-C' },
        audioConfig: { audioEncoding: 'MP3' }
      },
      { timeout: 10000 }
    );
    const audioContent = response.data.audioContent; // base64
    const buffer = Buffer.from(audioContent, 'base64');
    res.set('Content-Type', 'audio/mpeg');
    res.send(buffer);
  } catch (error) {
    console.error('[Google TTS proxy] Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET /api/ai/stats - Get API usage statistics
router.get('/stats', async (req, res) => {
  try {
    const apiManager = getAPIProviderManager();
    const stats = apiManager.getStats();
    
    res.json({
      success: true,
      stats: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error getting API stats:', error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
});

// POST /api/ai/deepgram-tts - Deepgram Aura TTS proxy (high quality, cost-effective)
router.post('/deepgram-tts', async (req, res) => {
  const { text, voice } = req.body;
  
  if (!text) {
    return res.status(400).json({ message: 'text is required' });
  }
  
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ message: 'Deepgram TTS not configured on server' });
  }
  
  try {
    // Deepgram Aura TTS voices:
    // - aura-asteria-en (female, warm, friendly) - BEST for Ms. Nova
    // - aura-luna-en (female, calm, clear)
    // - aura-stella-en (female, young, energetic)
    // - aura-orion-en (male, professional)
    const voiceModel = voice || 'aura-asteria-en';
    
    console.log(`🎤 Deepgram TTS: "${text.substring(0, 50)}..." with voice ${voiceModel}`);
    
    const response = await axios({
      method: 'post',
      url: `https://api.deepgram.com/v1/speak?model=${voiceModel}`,
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      },
      data: { text },
      responseType: 'arraybuffer',
      timeout: 10000 // 10s timeout
    });
    
    console.log(`✅ Deepgram TTS success: ${response.data.byteLength} bytes`);
    
    // Deepgram returns MP3 audio
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.data);
    
  } catch (error) {
    console.error('[Deepgram TTS proxy] Error:', error.message);
    
    // Return error but don't crash
    res.status(500).json({ 
      message: error.response?.data?.message || error.message,
      audioError: true
    });
  }
});

module.exports = router;
