/**
 * useTTSPrefetch Hook
 * Automatically pre-cache TTS audio when user enters a station
 * 
 * Usage:
 * const { prefetchText, prefetchMultiple } = useTTSPrefetch('read');
 * 
 * useEffect(() => {
 *   prefetchText("Long reading passage...");
 * }, [data]);
 */

import { useEffect, useRef } from 'react';
import { TTSCache } from '../services/ttsCache';
import { VoiceService } from '../services/voiceService';

export function useTTSPrefetch(station = 'read') {
  const prefetchQueueRef = useRef(new Set());
  const isPrefetchingRef = useRef(false);

  /**
   * Prefetch single text
   * @param {string} text - Text to pre-cache
   * @returns {Promise<boolean>} - Success status
   */
  const prefetchText = async (text) => {
    if (!text || text.length < 3) return false; // Skip empty/short text
    
    // Check if already cached
    const cached = await TTSCache.get(text, station);
    if (cached) {
      URL.revokeObjectURL(cached); // Cleanup check
      return true; // Already cached
    }
    
    // Check if already in queue
    if (prefetchQueueRef.current.has(text)) {
      return false; // Already prefetching
    }
    
    // Add to queue and prefetch via VoiceService (goes through HF semaphore)
    prefetchQueueRef.current.add(text);
    
    try {
      await VoiceService.prefetch(text, station);
      console.log(`[Prefetch] ✅ Cached for ${station}: ${text.substring(0, 30)}...`);
      return true;
    } catch (error) {
      console.warn(`[Prefetch] ⚠️ Failed for ${station}:`, error.message);
    } finally {
      prefetchQueueRef.current.delete(text);
    }
    
    return false;
  };

  /**
   * Prefetch multiple texts sequentially (avoid overwhelming server)
   * @param {Array<string>} texts - Array of texts to pre-cache
   * @param {number} delay - Delay between requests (ms)
   */
  const prefetchMultiple = async (texts, delay = 500) => {
    if (isPrefetchingRef.current) return; // Already prefetching
    
    isPrefetchingRef.current = true;
    
    for (const text of texts) {
      await prefetchText(text);
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    isPrefetchingRef.current = false;
  };

  /**
   * Prefetch all sentences from an array of objects (e.g., dictation)
   * @param {Array<Object>} items - Array of items with text/text_en property
   * @param {string} textKey - Key to extract text from (e.g., 'text', 'text_en')
   * @returns {Promise<void>}
   */
  const prefetchFromArray = (items, textKey = 'text_en') => {
    if (!items || !Array.isArray(items)) return Promise.resolve();
    
    const texts = items
      .map(item => item[textKey] || item.text)
      .filter(Boolean)
      .slice(0, 6); // Limit to first 6 items to avoid HF server overload
    
    if (texts.length > 0) {
      return prefetchMultiple(texts, 1000); // 1s delay to protect HF FREE tier
    }
    
    return Promise.resolve();
  };

  return {
    prefetchText,
    prefetchMultiple,
    prefetchFromArray
  };
}

export default useTTSPrefetch;
