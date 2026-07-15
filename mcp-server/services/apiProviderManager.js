/**
 * API Provider Manager with Auto-Failover
 * Handles multiple API keys and automatic fallback when quota exceeded
 *
 * Provider priority for generateConversation:
 *   Cerebras → Groq → Together → Gemini
 * All keys are stored as server-side env vars (never exposed to browser)
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

class APIProviderManager {
  constructor() {
    // Gemini API keys with priority order
    this.geminiKeys = [
      process.env.GEMINI_API_KEY,
      process.env.GEMINI_API_KEY_BACKUP_1,
      process.env.GEMINI_API_KEY_BACKUP_2
    ].filter(Boolean);
    
    this.currentGeminiKeyIndex = 0;
    this.geminiKeyFailures = new Map(); // Track failures per key
    
    // OpenAI - lazy initialization
    this.openai = null;
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    
    // Phase 2 settings
    this.enableWhisperFallback = process.env.ENABLE_WHISPER_FALLBACK === 'true';
    this.whisperThreshold = parseFloat(process.env.WHISPER_CONFIDENCE_THRESHOLD) || 0.7;
    this.maxDailyCost = parseFloat(process.env.WHISPER_MAX_COST_PER_DAY) || 5;
    
    // Cost tracking
    this.dailyWhisperCost = 0;
    this.lastResetDate = new Date().toDateString();
    
    console.log('✅ API Provider Manager initialized');
    console.log(`   - Gemini keys available: ${this.geminiKeys.length}`);
    console.log(`   - OpenAI configured: ${!!this.openaiApiKey}`);
    console.log(`   - Whisper fallback: ${this.enableWhisperFallback ? 'ENABLED' : 'DISABLED'}`);
  }
  
  /**
   * Get OpenAI instance (lazy initialization)
   */
  getOpenAI() {
    if (!this.openai) {
      if (!this.openaiApiKey) {
        throw new Error('OpenAI API key not configured');
      }
      this.openai = new OpenAI({
        apiKey: this.openaiApiKey
      });
    }
    return this.openai;
  }
  
  /**
   * Get Gemini AI instance with current active key
   */
  getGeminiAI() {
    const apiKey = this.geminiKeys[this.currentGeminiKeyIndex];
    if (!apiKey) {
      throw new Error('No Gemini API keys available');
    }
    return new GoogleGenerativeAI(apiKey);
  }
  
  /**
   * Get Gemini model with auto-retry on quota exceeded
   */
  async getGeminiModel(modelName = 'gemini-2.5-flash') {
    const genAI = this.getGeminiAI();
    return genAI.getGenerativeModel({ model: modelName });
  }

  /**
   * Try multiple model names in order of preference
   */
  async getGeminiModelWithFallback() {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash'];
    const genAI = this.getGeminiAI();
    let lastError = null;
    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        // Quick test
        await model.generateContent('hi');
        return model;
      } catch (error) {
        lastError = error;
        const isNotFound = error?.message?.includes('not found') || error?.message?.includes('not supported');
        if (!isNotFound) throw error;
        console.warn(`⚠️ Gemini model ${modelName} not available, trying next...`);
      }
    }
    throw lastError || new Error('No Gemini model available');
  }

  /**
   * Call Gemini API with automatic failover to backup keys
   */
  async callGeminiWithFailover(chatConfig) {
    const maxAttempts = this.geminiKeys.length;
    let lastError = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const model = await this.getGeminiModelWithFallback();
        const chat = model.startChat(chatConfig);
        const result = await chat.sendMessage(chatConfig.message);
        const response = await result.response;

        // Success - reset failure counter
        this.geminiKeyFailures.set(this.currentGeminiKeyIndex, 0);

        return response.text();
      } catch (error) {
        lastError = error;

        // Check if it's a quota/rate limit error
        const isQuotaError = this.isQuotaError(error);
        
        if (isQuotaError) {
          console.warn(`⚠️ Gemini API quota exceeded for key #${this.currentGeminiKeyIndex + 1}`);
          
          // Track failure
          const failures = (this.geminiKeyFailures.get(this.currentGeminiKeyIndex) || 0) + 1;
          this.geminiKeyFailures.set(this.currentGeminiKeyIndex, failures);
          
          // Switch to next key
          this.currentGeminiKeyIndex = (this.currentGeminiKeyIndex + 1) % this.geminiKeys.length;
          console.log(`🔄 Switching to backup Gemini key #${this.currentGeminiKeyIndex + 1}`);
          
          // Wait a bit before retry
          await this.sleep(1000);
          continue;
        }
        
        // If not quota error, throw immediately
        throw error;
      }
    }
    
    // All keys failed
    throw new Error(`All Gemini API keys exhausted. Last error: ${lastError?.message}`);
  }
  
  /**
   * Check if error is quota/rate limit related
   */
  isQuotaError(error) {
    const errorMessage = error?.message || '';
    const quotaKeywords = [
      'quota',
      'rate limit',
      'too many requests',
      '429',
      'resource exhausted',
      'RESOURCE_EXHAUSTED'
    ];
    
    return quotaKeywords.some(keyword => 
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
  /**
   * Check if should use Whisper based on confidence and cost
   */
  shouldUseWhisper(confidence, isDifficultWord = false) {
    if (!this.enableWhisperFallback) return false;
    
    // Reset daily cost at midnight
    const today = new Date().toDateString();
    if (today !== this.lastResetDate) {
      this.dailyWhisperCost = 0;
      this.lastResetDate = today;
      console.log('🔄 Reset daily Whisper cost tracking');
    }
    
    // Check cost limit
    if (this.dailyWhisperCost >= this.maxDailyCost) {
      console.warn(`⚠️ Daily Whisper cost limit reached ($${this.maxDailyCost})`);
      return false;
    }
    
    // Use Whisper if confidence is low or word is difficult
    return confidence < this.whisperThreshold || isDifficultWord;
  }
  
  /**
   * Call Whisper API for audio transcription
   */
  async transcribeWithWhisper(audioFile, options = {}) {
    try {
      const openai = this.getOpenAI(); // Lazy init
      const startTime = Date.now();
      
      const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: options.language || 'en',
        response_format: 'verbose_json'
      });
      
      const duration = (Date.now() - startTime) / 1000; // seconds
      const audioDuration = transcription.duration || 30; // estimate
      const cost = (audioDuration / 60) * 0.006; // $0.006 per minute
      
      // Track cost
      this.dailyWhisperCost += cost;
      
      console.log(`✅ Whisper transcription: ${transcription.text}`);
      console.log(`   Duration: ${audioDuration.toFixed(1)}s | Cost: $${cost.toFixed(4)} | Daily total: $${this.dailyWhisperCost.toFixed(4)}`);
      
      return {
        text: transcription.text,
        confidence: this.calculateConfidence(transcription),
        duration: audioDuration,
        cost: cost
      };
    } catch (error) {
      console.error('❌ Whisper API error:', error.message);
      throw error;
    }
  }
  
  /**
   * Calculate confidence from Whisper verbose response
   */
  calculateConfidence(transcription) {
    // Whisper doesn't provide direct confidence, estimate from segments
    if (!transcription.segments || transcription.segments.length === 0) {
      return 0.8; // default
    }
    
    // Average no_speech_prob (inverse for confidence)
    const avgNoSpeech = transcription.segments.reduce((sum, seg) => 
      sum + (seg.no_speech_prob || 0), 0
    ) / transcription.segments.length;
    
    return Math.max(0, Math.min(1, 1 - avgNoSpeech));
  }
  
  /**
   * Generate AI conversation response with multi-provider failover
   * Provider order: Cerebras → Groq → Together → Gemini
   * All API keys are server-side env vars — NEVER sent to browser
   *
   * @param {Array}  messages - OpenAI-compatible [{role, content}] array
   * @param {Object} options  - { maxTokens, temperature }
   * @returns {Promise<{text: string, provider: string}>}
   */
  async generateConversation(messages, options = {}) {
    const { maxTokens = 1024, temperature = 0.7 } = options;

    // Normalize roles: Gemini 'model' → OpenAI 'assistant'
    const normalizedMessages = messages
      .map(m => ({
        role: m.role === 'model' ? 'assistant' : m.role,
        content: m.content || m.text || ''
      }))
      .filter(m => m.content.trim().length > 0);

    // OpenAI-compatible providers (faster, cheaper)
    const openaiCompatible = [
      {
        name: 'cerebras',
        key: process.env.CEREBRAS_API_KEY,
        baseURL: 'https://api.cerebras.ai/v1',
        model: 'llama3.1-8b'
      },
      {
        name: 'groq',
        key: process.env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
        model: 'llama-3.3-70b-versatile'
      },
      {
        name: 'together',
        key: process.env.TOGETHER_API_KEY,
        baseURL: 'https://api.together.xyz/v1',
        model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo'
      }
    ].filter(p => p.key);

    for (const provider of openaiCompatible) {
      try {
        const client = new OpenAI({
          apiKey: provider.key,
          baseURL: provider.baseURL
        });
        const completion = await client.chat.completions.create(
          {
            model: provider.model,
            messages: normalizedMessages,
            max_tokens: maxTokens,
            temperature,
            response_format: { type: 'json_object' }
          },
          { timeout: 10000 }
        );
        const text = completion.choices[0].message.content;
        console.log(`✅ generateConversation via ${provider.name}`);
        return { text, provider: provider.name };
      } catch (err) {
        console.warn(`⚠️  ${provider.name} failed: ${err.message}`);
      }
    }

    // Final fallback: Gemini (native SDK)
    return this._callGeminiConversation(normalizedMessages, { maxTokens, temperature });
  }

  /**
   * Internal: call Gemini for conversation (fallback when all OpenAI-compat fail)
   */
  async _callGeminiConversation(normalizedMessages, { maxTokens, temperature }) {
    // Split system instruction from conversation
    const systemMsg = normalizedMessages.find(m => m.role === 'system');
    const chatMsgs  = normalizedMessages.filter(m => m.role !== 'system');

    const geminiContents = chatMsgs.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const model = await this.getGeminiModel('gemini-2.5-flash');
    const reqBody = {
      contents: geminiContents,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
        responseMimeType: 'application/json'
      }
    };
    if (systemMsg) {
      reqBody.systemInstruction = { parts: [{ text: systemMsg.content }] };
    }

    const result = await model.generateContent(reqBody);
    const text = result.response.text();
    console.log('✅ generateConversation via gemini (fallback)');
    return { text, provider: 'gemini' };
  }

  /**
   * Get API usage statistics
   */
  getStats() {
    return {
      gemini: {
        currentKeyIndex: this.currentGeminiKeyIndex,
        totalKeys: this.geminiKeys.length,
        failures: Object.fromEntries(this.geminiKeyFailures)
      },
      whisper: {
        enabled: this.enableWhisperFallback,
        dailyCost: this.dailyWhisperCost.toFixed(4),
        maxDailyCost: this.maxDailyCost,
        remainingBudget: (this.maxDailyCost - this.dailyWhisperCost).toFixed(4)
      }
    };
  }
  
  /**
   * Helper: Sleep function
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
let instance = null;

function getAPIProviderManager() {
  if (!instance) {
    instance = new APIProviderManager();
  }
  return instance;
}

module.exports = {
  APIProviderManager,
  getAPIProviderManager
};
