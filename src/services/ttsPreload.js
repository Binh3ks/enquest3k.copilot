/**
 * TTS Preload Service
 * Pre-warms HF Spaces server and pre-caches common phrases
 * 
 * Problem: HF Spaces cold start = 7-10s delay for first request
 * Solution: 
 * 1. Ping server on app startup (wake up from sleep)
 * 2. Pre-fetch + cache 20 most common phrases
 * 3. User gets instant playback for common content
 */

import { TTSCache } from './ttsCache';
import { markServerWarm } from './voiceService';

const TTS_SERVER_URL = import.meta.env.VITE_TTS_SERVER_URL || import.meta.env.VITE_EDGE_TTS_URL || 'https://binh3k-engquest3k.hf.space';

// 20 most common phrases across all stations (based on usage data)
const COMMON_PHRASES = [
  // AI Tutor greetings (ask_ai)
  { text: "Hello! I am Miss Nova. Click a button below to Roleplay or Chat!", station: "ask_ai" },
  { text: "Great job!", station: "ask_ai" },
  { text: "Try again!", station: "ask_ai" },
  { text: "Perfect!", station: "ask_ai" },
  { text: "Good work!", station: "ask_ai" },
  
  // Story Mission (read)
  { text: "Hello! I am Miss Nova, your English teacher. What is your name?", station: "read" },
  { text: "Nice to meet you!", station: "read" },
  { text: "Let's start the story!", station: "read" },
  
  // New Words (new_word)
  { text: "Pen", station: "new_word" },
  { text: "Book", station: "new_word" },
  { text: "Desk", station: "new_word" },
  { text: "Chair", station: "new_word" },
  
  // Dictation (dictation)
  { text: "Listen carefully.", station: "dictation" },
  { text: "Today I play a game.", station: "dictation" },
  { text: "I look for my toy car.", station: "dictation" },
  
  // Word Power (word_power)
  { text: "Under the bed", station: "word_power" },
  { text: "In the bag", station: "word_power" },
  { text: "On the desk", station: "word_power" },
  
  // Explore (explore)
  { text: "Let's explore!", station: "explore" }
];

class TTSPreloadService {
  constructor() {
    this.isPreloading = false;
    this.preloadComplete = false;
    this.serverWarmed = false;
  }

  /**
   * Warm up TTS server (wake from sleep)
   * Send actual TTS request to ensure Deepgram Worker is ready
   * @returns {Promise<boolean>}
   */
  async warmServer() {
    if (this.serverWarmed) return true;
    
    try {
      console.log('[TTS Preload] 🔥 Warming up TTS server (Deepgram)...');
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
      
      // Use actual TTS request with station=read to warm server
      const response = await fetch(`${TTS_SERVER_URL}/tts?text=hello&station=read`, { 
        signal: controller.signal 
      });
      clearTimeout(timeout);
      
      if (response.ok) {
        this.serverWarmed = true;
        markServerWarm(); // signal voiceService to use shorter race timeout
        console.log('[TTS Preload] ✅ TTS server ready (Deepgram)');
        return true;
      }
    } catch (error) {
      console.warn('[TTS Preload] ⚠️ TTS warm-up failed:', error.message);
    }
    return false;
  }

  /**
   * Pre-fetch and cache common phrases in background
   * @param {number} maxConcurrent - Max parallel requests (default: 3)
   * @returns {Promise<void>}
   */
  async preloadCommonPhrases(maxConcurrent = 3) {
    if (this.isPreloading || this.preloadComplete) return;
    
    this.isPreloading = true;
    console.log(`[TTS Preload] 🚀 Pre-caching ${COMMON_PHRASES.length} common phrases...`);
    
    let cached = 0;
    let skipped = 0;
    let failed = 0;
    
    // Process in batches to avoid overwhelming server
    for (let i = 0; i < COMMON_PHRASES.length; i += maxConcurrent) {
      const batch = COMMON_PHRASES.slice(i, i + maxConcurrent);
      
      await Promise.all(batch.map(async ({ text, station }) => {
        try {
          // Skip if already cached
          const existing = await TTSCache.get(text, station);
          if (existing) {
            skipped++;
            URL.revokeObjectURL(existing); // Clean up check
            return;
          }
          
          // Fetch from server
          const url = `${TTS_SERVER_URL}/tts?text=${encodeURIComponent(text)}&station=${encodeURIComponent(station)}`;
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout
          
          const response = await fetch(url, { signal: controller.signal });
          clearTimeout(timeout);
          
          if (response.ok) {
            const blob = await response.blob();
            await TTSCache.set(text, station, blob);
            cached++;
          } else {
            failed++;
          }
        } catch (error) {
          failed++;
          // Silent fail - not critical
        }
      }));
      
      // Small delay between batches
      if (i + maxConcurrent < COMMON_PHRASES.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    this.isPreloading = false;
    this.preloadComplete = true;
    
    console.log(`[TTS Preload] ✅ Pre-cache complete: ${cached} cached, ${skipped} skipped, ${failed} failed`);
  }

  /**
   * Full initialization: warm server + preload phrases
   * @returns {Promise<void>}
   */
  async initialize() {
    // 1. Warm server first
    await this.warmServer();
    
    // 2. Pre-cache common phrases (don't block app startup)
    this.preloadCommonPhrases().catch(err => {
      console.warn('[TTS Preload] Background preload failed:', err);
    });
  }

  /**
   * Get preload statistics
   */
  getStats() {
    return {
      serverWarmed: this.serverWarmed,
      isPreloading: this.isPreloading,
      preloadComplete: this.preloadComplete,
      totalPhrases: COMMON_PHRASES.length
    };
  }
}

// Singleton instance
export const TTSPreload = new TTSPreloadService();

// Expose to window for debugging
if (typeof window !== 'undefined') {
  window.TTSPreload = TTSPreload;
}

export default TTSPreload;
