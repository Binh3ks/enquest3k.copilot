/**
 * TTS Cache Service - Client-side MP3 caching for Kokoro TTS
 * 
 * Problem: HF Spaces server slow (8-10s) for every TTS request
 * Solution: Cache MP3 blobs in browser IndexedDB (persistent across sessions)
 * 
 * Features:
 * - IndexedDB storage (works offline after first load)
 * - Cache key: `tts_${station}_${text_hash}`
 * - 30-day expiry (2592000000ms) - Extended for production stability
 * - Auto-cleanup old entries
 * 
 * Usage:
 *   const cachedUrl = await TTSCache.get(text, station);
 *   if (!cachedUrl) {
 *     const blob = await fetch(...);
 *     await TTSCache.set(text, station, blob);
 *   }
 */

const DB_NAME = 'EngQuestTTSCache_v21';
const STORE_NAME = 'tts_audio';
const DB_VERSION = 1;  // Fresh v21 store (Aug 7, 2026): Phonetic Vietnamese Proper Noun TTS cache
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days - Extended for production

class TTSCacheService {
  constructor() {
    this.db = null;
    this.initPromise = this.initDB();
    this.pendingTransactions = 0;
  }

  /**
   * Check if error is benign (connection closing during concurrent operations)
   */
  isConnectionClosingError(error) {
    return error && (
      error.message?.includes('connection is closing') ||
      error.name === 'InvalidStateError'
    );
  }

  /**
   * Initialize IndexedDB
   */
  async initDB() {
    if (!('indexedDB' in window)) {
      console.warn('[TTSCache] IndexedDB not supported');
      return null;
    }

    // Automatically purge old legacy databases (EngQuestTTSCache)
    try {
      indexedDB.deleteDatabase('EngQuestTTSCache');
      indexedDB.deleteDatabase('EngQuestTTSCache_v12');
      indexedDB.deleteDatabase('EngQuestTTSCache_v13');
      indexedDB.deleteDatabase('EngQuestTTSCache_v14');
      indexedDB.deleteDatabase('EngQuestTTSCache_v16');
      indexedDB.deleteDatabase('EngQuestTTSCache_v17');
      indexedDB.deleteDatabase('EngQuestTTSCache_v18');
      indexedDB.deleteDatabase('EngQuestTTSCache_v20');
    } catch {}

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => {
        console.error('[TTSCache] Failed to open IndexedDB:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        console.log('[TTSCache] ✅ IndexedDB v14 fresh ready');
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
          console.log('[TTSCache] 🗑️ Old cache cleared');
        }
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        console.log('[TTSCache] 🆕 Created fresh object store v14');
      };
    });
  }

  /**
   * Generate cache key from text + audioUrl + station + voice
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @param {string|null} voice - Voice ID (e.g., 'en-US-Neural2-J' or 'aura-zeus-en')
   * @param {string|null} audioUrl - Audio URL/path for stale-detection (added Jun 8, 2026)
   * @returns {string} - Cache key
   */
  getCacheKey(text, station, voice = null, audioUrl = null) {
    // Simple hash function (for cache key, not security)
    const hash = text.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);

    // Add voice to cache key for voice-specific caching
    // Extract voice suffix (e.g., 'Neural2-F' -> '_f', 'Journey-F' -> '_f', 'aura-zeus-en' -> '_zeus')
    let voiceSuffix = '';
    if (voice) {
      const voiceMatch = voice.match(/(?:Neural2|Journey)-([A-Z])|aura-(\w+)-/i);
      voiceSuffix = voiceMatch ? `_${(voiceMatch[1] || voiceMatch[2]).toLowerCase()}` : `_${voice.substring(0, 8)}`;
    }

    // Add audioUrl path to key so audio file path changes invalidate stale blobs
    // Strip protocol + domain so relative (/audio/...) and absolute (https://cdn/audio/...) match 100%!
    let pathSuffix = '';
    if (audioUrl) {
      let pathStr = typeof audioUrl === 'string' ? audioUrl : '';
      pathStr = pathStr.replace(/^https?:\/\/[^\/]+/, '');
      const pathHash = pathStr.split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0);
      pathSuffix = `_p${Math.abs(pathHash).toString(36)}`;
    }

    return `tts_${station}_${Math.abs(hash)}${voiceSuffix}${pathSuffix}`;
  }

  /**
   * Get cached audio blob URL
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @param {string|null} voice - Voice ID (e.g., 'en-US-Neural2-J' or 'aura-zeus-en')
   * @param {string|null} audioUrl - Audio URL/path for stale-detection (Jun 8, 2026)
   * @returns {Promise<string|null>} - Blob URL or null if not cached
   */
  async get(text, station, voice = null, audioUrl = null) {
    await this.initPromise;
    if (!this.db) return null;

    const key = this.getCacheKey(text, station, voice, audioUrl);
    
    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);
        
        request.onsuccess = () => {
          const record = request.result;
          
          if (!record) {
            resolve(null);
            return;
          }
          
          // Check expiry
          const now = Date.now();
          if (now - record.timestamp > CACHE_EXPIRY) {
            console.log(`[TTSCache] ⏰ Expired: ${key}`);
            this.delete(key); // Cleanup expired
            resolve(null);
            return;
          }
          
          // Handle both old (string) and new (blob) cache formats
          let blobUrl;
          if (typeof record.blob === 'string') {
            // Old cache format: already a blob URL
            blobUrl = record.blob;
          } else if (record.blob instanceof Blob) {
            // Validate blob size: reject empty/corrupted blobs (< 500 bytes)
            if (record.blob.size < 500) {
              console.warn(`[TTSCache] ⚠️ Corrupted/empty cached blob (${record.blob.size} bytes) for ${key}`);
              this.delete(key);
              resolve(null);
              return;
            }
            blobUrl = URL.createObjectURL(record.blob);
          } else {
            console.warn(`[TTSCache] ⚠️ Invalid cached data type for ${key}`);
            this.delete(key); // Cleanup invalid entry
            resolve(null);
            return;
          }
          
          console.log(`[TTSCache] ✅ HIT: ${key.substring(0, 30)}...`);
          resolve(blobUrl);
        };
        
        request.onerror = () => {
          // Only log non-benign errors
          if (!this.isConnectionClosingError(request.error)) {
            console.error('[TTSCache] Get error:', request.error);
          }
          resolve(null);
        };
      } catch (error) {
        // Silent fail for connection closing errors (race condition)
        if (!this.isConnectionClosingError(error)) {
          console.error('[TTSCache] Get exception:', error);
        }
        resolve(null);
      }
    });
  }

  /**
   * Store audio blob in cache
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @param {Blob} blob - Audio blob (MP3)
   * @param {string|null} voice - Voice ID (e.g., 'en-US-Neural2-J' or 'aura-zeus-en')
   * @param {string|null} audioUrl - Audio URL/path for stale-detection (Jun 8, 2026)
   * @returns {Promise<boolean>} - Success status
   */
  async set(text, station, blob, voice = null, audioUrl = null) {
    await this.initPromise;
    if (!this.db) return false;

    const key = this.getCacheKey(text, station, voice, audioUrl);
    const record = {
      key,
      text: text.substring(0, 100), // Store first 100 chars for debugging
      station,
      voice,  // Store voice for debugging
      blob,
      timestamp: Date.now()
    };
    
    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(record);
        
        request.onsuccess = () => {
          console.log(`[TTSCache] 💾 Saved: ${key.substring(0, 30)}... (${(blob.size / 1024).toFixed(1)}KB)`);
          resolve(true);
        };
        
        request.onerror = () => {
          // Only log non-benign errors
          if (!this.isConnectionClosingError(request.error)) {
            console.error('[TTSCache] Set error:', request.error);
          }
          resolve(false);
        };
      } catch (error) {
        // Silent fail for connection closing errors (race condition)
        if (!this.isConnectionClosingError(error)) {
          console.error('[TTSCache] Set exception:', error);
        }
        resolve(false);
      }
    });
  }

  /**
   * Delete a cache entry
   * @param {string} key - Cache key
   */
  async delete(key) {
    await this.initPromise;
    if (!this.db) return;

    try {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.delete(key);
    } catch (error) {
      console.error('[TTSCache] Delete error:', error);
    }
  }

  /**
   * Clear all cache (for debugging/reset)
   */
  async clear() {
    await this.initPromise;
    if (!this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      
      request.onsuccess = () => {
        console.log('[TTSCache] 🗑️ All cache cleared');
        resolve();
      };
      
      request.onerror = () => {
        console.error('[TTSCache] Clear error:', request.error);
        resolve();
      };
    });
  }

  /**
   * Get cache statistics
   */
  async getStats() {
    await this.initPromise;
    if (!this.db) return { count: 0, size: 0 };

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      
      request.onsuccess = () => {
        const records = request.result;
        const size = records.reduce((acc, r) => acc + r.blob.size, 0);
        resolve({
          count: records.length,
          size: (size / 1024 / 1024).toFixed(2) + ' MB'
        });
      };
      
      request.onerror = () => {
        resolve({ count: 0, size: '0 MB' });
      };
    });
  }
}

// Singleton instance
export const TTSCache = new TTSCacheService();

// Expose to window for debugging
if (typeof window !== 'undefined') {
  window.TTSCache = TTSCache;
}

export default TTSCache;
