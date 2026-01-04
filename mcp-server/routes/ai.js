/* eslint-env node */
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes here are protected and require a valid token
router.use(authMiddleware);

// Initialize the Google AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  const { history, message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'A new message is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chat = model.startChat({
      history: (history || []).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content || m.text }]
      })),
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });

  } catch (error) {
    console.error('Error with Google AI API:', error);
    res.status(500).json({ message: 'An error occurred while communicating with the AI service.', details: error.message });
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

module.exports = router;
