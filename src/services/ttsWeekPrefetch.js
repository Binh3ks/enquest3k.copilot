/**
 * TTS Week Pre-fetch Service
 * Automatically cache TTS audio for ALL stations of current week
 * Runs in background after app loads
 */

import { loadWeekData } from '../data/weeks/index';
import { TTSCache } from './ttsCache';
import { VoiceService, AURA2_VOICES } from './voiceService';

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
    this.isCancelled = false;
    this.stats = { total: 0, cached: 0, failed: 0, skipped: 0 };
  }

  /**
   * Cancel any in-progress prefetch (e.g. when user navigates to a new week).
   * Safe to call multiple times.
   */
  cancel() {
    if (this.isRunning) {
      console.log('[Week Prefetch] 🛑 Cancelled (week navigation)');
      this.isCancelled = true;
      this.isRunning = false;
    }
    // If nothing is running, cancel() is a no-op — do NOT set isCancelled,
    // otherwise the immediately-following initialize() would silently return.
  }

  /**
   * Fetch and cache single text with audio path and voice
   */
  async cacheSingle(item) {
    const { text, station, audioPath, weekNumber, mode, voice } = item;
    if (!text || text.length < 3) return false;

    // Check if already cached (with voice-specific key)
    const cached = await TTSCache.get(text, station, voice);
    if (cached) {
      URL.revokeObjectURL(cached);
      this.stats.skipped++;
      return true;
    }

    try {
      await VoiceService.prefetch(text, station, audioPath, weekNumber, mode, voice);
      this.stats.cached++;
      console.log(`[Week Prefetch] ✅ Cached: ${text.substring(0, 30)}... (${station})`);
      return true;
    } catch (error) {
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

    const weekNumber = weekData.weekId || weekData.week_id;
    const mode = weekData.isEasy ? 'easy' : 'advanced';
    const voiceConfig = weekData.voiceConfig || {};

    // Helper to get Aura-2 voice for station (rotation by week number)
    // Passes null so VoiceService.prefetch() auto-resolves via getAura2Voice()
    const getVoice = (_stationKey) => null;

    // Helper to determine priority with HARD LIMITS
    const addToPriority = (text, station, stationKey, audioPath = null) => {
      const item = { 
        text, 
        station, 
        audioPath,
        weekNumber,
        mode,
        voice: getVoice(stationKey)
      };
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
      const audioPath = stations.read_explore.audio_url;
      addToPriority(cleanText, 'read', 'read_explore', audioPath);
    }

    // 2. EXPLORE STATION - Long form content
    if (stations.explore?.content_en) {
      const cleanText = stations.explore.content_en.replace(/\*\*/g, '');
      const audioPath = stations.explore.audio_url || stations.explore.explore_audio_url;
      addToPriority(cleanText, 'explore', 'explore', audioPath);
    }

    // 3. DICTATION - First 8 sentences only
    if (stations.dictation?.sentences) {
      stations.dictation.sentences.slice(0, 8).forEach((item, idx) => {
        const itemText = item.text_en || item.text;
        if (itemText) {
          const audioPath = item.audio_url || `audio/week${weekNumber}/dictation_${idx + 1}.mp3`;
          addToPriority(itemText, 'dictation', 'dictation', audioPath);
        }
      });
    }

    // 4. SHADOWING - First 4 items only
    if (stations.shadowing?.script) {
      stations.shadowing.script.slice(0, 4).forEach((item, idx) => {
        const itemText = item.text_en || item.text;
        if (itemText) {
          const audioPath = item.audio_url || `audio/week${weekNumber}/shadowing_${idx + 1}.mp3`;
          addToPriority(itemText, 'shadowing', 'shadowing', audioPath);
        }
      });
    }

    // 5. LOGIC LAB - Long content
    if (stations.logic_lab?.content_en) {
      const cleanText = stations.logic_lab.content_en.replace(/\*\*/g, '');
      const audioPath = stations.logic_lab.audio_url;
      addToPriority(cleanText, 'read', 'logic_lab', audioPath);
    }

    // 6. MINDMAP - Content only (skip individual stems)
    if (stations.mindmap?.content_en) {
      const cleanText = stations.mindmap.content_en.replace(/\*\*/g, '');
      const audioPath = stations.mindmap.audio_url;
      addToPriority(cleanText, 'read', 'mindmap', audioPath);
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
      if (this.isCancelled) return; // stop if cancelled
      await this.cacheSingle(items[i]);
      
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
    const mode = isEasy ? 'easy' : 'advanced';
    console.log(`[Week Prefetch] 🚀 Triggering Full Instant Google Direct TTS Pre-generation for Week ${weekId} (${mode})...`);
    return VoiceService.prefetchEntireWeek(weekId, mode);
  }

  /**
   * Initialize prefetch for current week
   * Call this after TTSPreload completes
   */
  async initialize(weekId, isEasy = false, currentStation = 'read_explore') {
    // prefetchWeek() resets isCancelled internally — no check needed here.
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
