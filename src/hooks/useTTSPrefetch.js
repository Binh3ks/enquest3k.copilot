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

export function useTTSPrefetch(station = 'read', weekNumber = null, mode = 'advanced') {
  const prefetchQueueRef = useRef(new Set());
  const isPrefetchingRef = useRef(false);

  /**
   * Prefetch single text or item object
   * @param {string|Object} textOrItem - Text string OR {text, audioPath, voice}
   * @returns {Promise<boolean>} - Success status
   */
  const prefetchText = async (textOrItem) => {
    // Support both old string format and new object format
    const text = typeof textOrItem === 'string' ? textOrItem : textOrItem?.text;
    const audioPath = typeof textOrItem === 'object' ? textOrItem?.audioPath : null;
    const voice = typeof textOrItem === 'object' ? textOrItem?.voice : null;
    
    if (!text || text.length < 3) return false; // Skip empty/short text
    
    // Check if already cached
    const cached = await TTSCache.get(text, station);
    if (cached) {
      URL.revokeObjectURL(cached); // Cleanup check
      return true; // Already cached
    }
    
    // Check if already in queue
    const queueKey = audioPath || text;
    if (prefetchQueueRef.current.has(queueKey)) {
      return false; // Already prefetching
    }
    
    // Add to queue and prefetch via VoiceService (goes through HF semaphore)
    prefetchQueueRef.current.add(queueKey);
    
    try {
      // Pass audioPath, weekNumber and voice to VoiceService for proper caching
      await VoiceService.prefetch(text, station, audioPath, weekNumber, mode, voice);
      console.log(`[Prefetch] ✅ Cached for ${station}: ${text.substring(0, 30)}...`);
      return true;
    } catch (error) {
      console.warn(`[Prefetch] ⚠️ Failed for ${station}:`, error.message);
    } finally {
      prefetchQueueRef.current.delete(queueKey);
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
   * @param {string} audioKey - Key to extract audioPath from (e.g., 'audio_url')
   * @param {string} voice - Voice to use for TTS
   * @returns {Promise<void>}
   */
  const prefetchFromArray = (items, textKey = 'text_en', audioKey = 'audio_url', voice = null) => {
    if (!items || !Array.isArray(items)) return Promise.resolve();

    const itemObjects = items
      .map(item => ({
        text: item[textKey] || item.text,
        audioPath: item[audioKey] || item.audio,
        voice: voice
      }))
      .filter(obj => obj.text)
      .slice(0, 12);

    if (itemObjects.length > 0) {
      return prefetchMultiple(itemObjects, 1000);
    }

    return Promise.resolve();
  };

  /**
   * Prefetch vocab word audio — maps {text, audioUrl, type} objects.
   * @param {Array<Object>} words - Array of {text, audioUrl, type} objects
   * @returns {Promise<void>}
   */
  const prefetchWordAudio = (words) => {
    if (!words || !Array.isArray(words)) return;
    const items = words.map(w => ({
      text: w.text || w.word,
      audioPath: w.audioUrl || w.audio_word,
      type: w.type
    })).filter(obj => obj.text);
    if (items.length > 0) {
      prefetchMultiple(items, 500).catch(err => {
        console.warn('[useTTSPrefetch] prefetchWordAudio failed:', err);
      });
    }
  };

  return {
    prefetchText,
    prefetchMultiple,
    prefetchFromArray,
    prefetchWordAudio
  };
}

export default useTTSPrefetch;
