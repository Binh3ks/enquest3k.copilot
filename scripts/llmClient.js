/**
 * llmClient.js — Lightweight LLM client for mass_updater pipeline
 *
 * Uses fable-5 API (Gemini Flash) for dynamic query generation
 * and semantic transcript evaluation. Falls back to Groq if Gemini fails.
 */

require('dotenv/config');
const { execSync } = require('child_process');

const GEMINI_KEY = process.env.VITE_GEMINI_API_KEY_2 || process.env.VITE_GEMINI_API_KEY;
const GROQ_KEY = process.env.VITE_GROQ_API_KEY;

/**
 * Call Gemini Flash via REST API
 * @param {string} prompt - The user prompt
 * @param {string} systemPrompt - Optional system instruction
 * @returns {Promise<string>} - The LLM response text
 */
async function callGemini(prompt, systemPrompt = '') {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

  const body = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  if (!data.candidates || !data.candidates[0]) {
    throw new Error('Gemini returned no candidates');
  }

  return data.candidates[0].content.parts[0].text;
}

/**
 * Call Groq API (fallback)
 */
async function callGroq(prompt, systemPrompt = '') {
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const messages = [];
  if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
  messages.push({ role: 'user', content: prompt });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages,
      temperature: 0.3,
      max_tokens: 2048,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

/**
 * Call LLM with fallback chain
 */
async function callLLM(prompt, systemPrompt = '') {
  try {
    return await callGemini(prompt, systemPrompt);
  } catch (geminiErr) {
    console.log(`  ⚠️  Gemini failed: ${geminiErr.message}, trying Groq...`);
    try {
      return await callGroq(prompt, systemPrompt);
    } catch (groqErr) {
      console.log(`  ❌ Groq also failed: ${groqErr.message}`);
      throw new Error(`All LLM providers failed: ${geminiErr.message}`);
    }
  }
}

module.exports = { callLLM, callGemini, callGroq };
