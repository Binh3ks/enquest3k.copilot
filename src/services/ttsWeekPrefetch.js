/**
 * TTS Week Pre-fetch Service
 * Automatically cache TTS audio for ALL stations of current week
 * Runs in background after app loads
 */

import { loadWeekData } from '../data/weeks/index';
import { TTSCache } from './ttsCache';

const TTS_SERVER_URL = import.meta.env.VITE_TTS_SERVER_URL || import.meta.env.VITE_EDGE_TTS_URL || 'https://binh3k-engquest3k.hf.space';

// Voice mapping for stations
const STATION_VOICES = {
  read: 'read',
  new_word: 'new_word', 
  word_match: 'new_word',
  mindmap: 'read',
  ask_ai: 'ask_ai',
  dictation: 'dictation',
  shadowing: 'shadowing',
  explore: 'explore',
  logic_lab: 'read',
  word_power: 'word_power',
  gamehub: 'read',
  ai_tutor: 'ask_ai'
};

class TTSWeekPrefetchService {
  constructor() {
    this.isRunning = false;
    this.stats = { total: 0, cached: 0, failed: 0, skipped: 0 };
  }

  /**
   * Fetch and cache single text
   */
  async cacheSingle(text, station) {
    if (!text || text.length < 3) return false;

    // Check if already cached
    const cached = await TTSCache.get(text, station);
    if (cached) {
      URL.revokeObjectURL(cached);
      this.stats.skipped++;
      return true;
    }

    try {
      const url = `${TTS_SERVER_URL}/tts?text=${encodeURIComponent(text)}&station=${encodeURIComponent(station)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000); // 45s timeout for long content

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (response.ok) {
        const blob = await response.blob();
        await TTSCache.set(text, station, blob);
        this.stats.cached++;
        console.log(`[Week Prefetch] ✅ Cached: ${text.substring(0, 30)}... (${station})`);
        return true;
      }
    } catch (error) {
      // Silent fail for non-critical prefetch
      if (error.name !== 'AbortError') {
        console.warn(`[Week Prefetch] ⚠️ Failed for ${station}:`, error.message);
      }
      this.stats.failed++;
    }

    return false;
  }

  /**
   * Extract PRIORITY content (long-form only, limit items)
   * Priority 1: Current station (MAX 8 ITEMS) - HF Free tier protection
   * Priority 2: Other long-form content (MAX 5 ITEMS)
   * Priority 3: Skip vocab (too many, low priority)
   */
  extractPriorityTexts(weekData, currentStation = 'read_explore') {
    const priority1 = []; // Current station - immediate (MAX 8)
    const priority2 = []; // Other stations - delayed 10s (MAX 5)
    const priority3 = []; // SKIP - too many items
    const stations = weekData?.stations;
    if (!stations) return { priority1, priority2, priority3 };

    // Helper to determine priority with HARD LIMITS
    const addToPriority = (text, station, stationKey) => {
      const item = { text, station };
      if (currentStation === stationKey || currentStation === station) {
        if (priority1.length < 8) { // MAX 8 items for priority 1
          priority1.push(item);
        }
      } else if (text.length > 100) { // Long content
        if (priority2.length < 5) { // MAX 5 items for priority 2
          priority2.push(item);
        }
      }
      // Priority 3 skipped entirely
    };

    // 1. READ STATION - Long form content
    if (stations.read_explore?.content_en) {
      const cleanText = stations.read_explore.content_en.replace(/\*\*/g, '');
      addToPriority(cleanText, 'read', 'read_explore');
    }

    // 2. EXPLORE STATION - Long form content
    if (stations.explore?.content_en) {
      const cleanText = stations.explore.content_en.replace(/\*\*/g, '');
      addToPriority(cleanText, 'explore', 'explore');
    }

    // 3. DICTATION - First 8 sentences only
    if (stations.dictation?.sentences) {
      stations.dictation.sentences.slice(0, 8).forEach(item => {
        if (item.text_en) addToPriority(item.text_en, 'dictation', 'dictation');
      });
    }

    // 4. SHADOWING - First 4 items only
    if (stations.shadowing?.script) {
      stations.shadowing.script.slice(0, 4).forEach(item => {
        if (item.text_en) addToPriority(item.text_en, 'shadowing', 'shadowing');
      });
    }

    // 5. LOGIC LAB - Long content
    if (stations.logic_lab?.content_en) {
      const cleanText = stations.logic_lab.content_en.replace(/\*\*/g, '');
      addToPriority(cleanText, 'read', 'logic_lab');
    }

    // 6. MINDMAP - Content only (skip individual stems)
    if (stations.mindmap?.content_en) {
      const cleanText = stations.mindmap.content_en.replace(/\*\*/g, '');
      addToPriority(cleanText, 'read', 'mindmap');
    }

    // 7-8. SKIP VOCAB - Too many items, low priority
    // Vocab will be cached on-demand when user clicks speaker icon

    return { priority1, priority2, priority3 };
  }

  /**
   * Cache items with controlled delay
   */
  async cacheItems(items, delayMs = 2500) {
    for (let i = 0; i < items.length; i++) {
      const { text, station } = items[i];
      await this.cacheSingle(text, station);
      
      // Delay between requests to avoid overwhelming FREE tier server
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  /**
   * Smart prefetch with priority system
   * @param {number} weekId - Week number
   * @param {boolean} isEasy - Easy mode flag
   * @param {string} currentStation - Current active station
   */
  async prefetchWeek(weekId, isEasy = false, currentStation = 'read_explore') {
    if (this.isRunning) {
      console.log('[Week Prefetch] ⚠️ Already running, skipping...');
      return this.stats;
    }

    this.isRunning = true;
    this.stats = { total: 0, cached: 0, failed: 0, skipped: 0 };

    try {
      console.log(`[Week Prefetch] 🚀 Loading Week ${weekId} (${isEasy ? 'EASY' : 'ADVANCED'})...`);
      
      // Load week data
      const weekData = await loadWeekData(weekId, isEasy);
      if (!weekData) {
        console.warn(`[Week Prefetch] ❌ Week ${weekId} data not found`);
        this.isRunning = false;
        return this.stats;
      }

      // Extract with priority
      const { priority1, priority2, priority3 } = this.extractPriorityTexts(weekData, currentStation);
      this.stats.total = priority1.length + priority2.length + priority3.length;
      
      console.log(`[Week Prefetch] 📦 Priority plan: ${priority1.length} immediate, ${priority2.length} delayed 10s, ${priority3.length} delayed 30s`);

      // PRIORITY 1: Current station (immediate, slow)
      if (priority1.length > 0) {
        console.log(`[Week Prefetch] 🔥 Caching current station (${currentStation})...`);
        await this.cacheItems(priority1, 3000); // 3s delay between each
      }

      // PRIORITY 2: Other long-form stations (after 10s)
      if (priority2.length > 0) {
        setTimeout(async () => {
          console.log(`[Week Prefetch] ⏳ Caching other stations (${priority2.length} items)...`);
          await this.cacheItems(priority2, 3000);
        }, 10000);
      }

      // PRIORITY 3: SKIPPED (vocab cached on-demand)
      // Log completion after priority 2
      setTimeout(() => {
        console.log(`[Week Prefetch] ✅ All done: ${this.stats.cached} cached, ${this.stats.skipped} skipped, ${this.stats.failed} failed`);
        console.log(`[Week Prefetch] 📊 Vocab items will be cached when user clicks speaker`);
      }, 20000);

      console.log(`[Week Prefetch] ✅ Priority 1 complete: ${this.stats.cached} cached so far`);
    } catch (error) {
      console.error('[Week Prefetch] ❌ Error:', error);
    } finally {
      // Keep running flag until all priorities complete
      setTimeout(() => {
        this.isRunning = false;
      }, 60000); // Release after 60s
    }

    return this.stats;
  }

  /**
   * Initialize prefetch for current week
   * Call this after TTSPreload completes
   */
  async initialize(weekId, isEasy = false, currentStation = 'read_explore') {
    // Wait 5 seconds after app load to avoid blocking UI
    await new Promise(resolve => setTimeout(resolve, 5000));
    return this.prefetchWeek(weekId, isEasy, currentStation);
  }

  getStats() {
    return { ...this.stats, isRunning: this.isRunning };
  }
}

// Export singleton instance
export const TTSWeekPrefetch = new TTSWeekPrefetchService();

// Expose for debugging in console
if (typeof window !== 'undefined') {
  window.TTSWeekPrefetch = TTSWeekPrefetch;
}

export default TTSWeekPrefetch;
