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

const DB_NAME = 'EngQuestTTSCache';
const STORE_NAME = 'tts_audio';
const DB_VERSION = 2;  // Bumped Feb 2026: clears old Kokoro cache, forces fresh Deepgram audio from R2
const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days - Extended for production

class TTSCacheService {
  constructor() {
    this.db = null;
    this.initPromise = this.initDB();
  }

  /**
   * Initialize IndexedDB
   */
  async initDB() {
    if (!('indexedDB' in window)) {
      console.warn('[TTSCache] IndexedDB not supported');
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = () => {
        console.error('[TTSCache] Failed to open IndexedDB:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        console.log('[TTSCache] ✅ IndexedDB ready');
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        // Delete old store on version upgrade — clears stale Kokoro-cached audio
        // so fresh Deepgram files from R2 are fetched on next play
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
          console.log('[TTSCache] 🗑️ Old cache cleared (version upgrade)');
        }
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        console.log('[TTSCache] 🆕 Created object store');
      };
    });
  }

  /**
   * Generate cache key from text + station
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @returns {string} - Cache key
   */
  getCacheKey(text, station) {
    // Simple hash function (for cache key, not security)
    const hash = text.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return `tts_${station}_${Math.abs(hash)}`;
  }

  /**
   * Get cached audio blob URL
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @returns {Promise<string|null>} - Blob URL or null if not cached
   */
  async get(text, station) {
    await this.initPromise;
    if (!this.db) return null;

    const key = this.getCacheKey(text, station);
    
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
            // New cache format: create URL from blob
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
          console.error('[TTSCache] Get error:', request.error);
          resolve(null);
        };
      } catch (error) {
        console.error('[TTSCache] Get exception:', error);
        resolve(null);
      }
    });
  }

  /**
   * Store audio blob in cache
   * @param {string} text - Text to speak
   * @param {string} station - Station ID
   * @param {Blob} blob - Audio blob (MP3)
   * @returns {Promise<boolean>} - Success status
   */
  async set(text, station, blob) {
    await this.initPromise;
    if (!this.db) return false;

    const key = this.getCacheKey(text, station);
    const record = {
      key,
      text: text.substring(0, 100), // Store first 100 chars for debugging
      station,
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
          console.error('[TTSCache] Set error:', request.error);
          resolve(false);
        };
      } catch (error) {
        console.error('[TTSCache] Set exception:', error);
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
