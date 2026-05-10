/**
 * shadowingStorage.js
 *
 * Stores audio Blobs from Shadowing recordings in IndexedDB.
 * IndexedDB is a browser-native database that persists to the user's local disk.
 * Free, zero server cost, survives page refresh, ~several GB capacity.
 *
 * DB structure:
 *   database: "engquest_shadowing"
 *   store:    "recordings"
 *   key:      `${weekId}_${sentenceId}`   e.g. "3_s1", "3_full_script"
 *   value:    Blob (audio/webm)
 */

const DB_NAME = 'engquest_shadowing';
const STORE_NAME = 'recordings';
const DB_VERSION = 1;

let _dbPromise = null;

function openDB() {
  if (_dbPromise) return _dbPromise;
  _dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => {
      _dbPromise = null; // allow retry
      reject(e.target.error);
    };
  });
  return _dbPromise;
}

/**
 * Save a Blob to IndexedDB.
 * @param {string} weekId
 * @param {string} sentenceId
 * @param {Blob} blob
 */
export async function saveRecording(weekId, sentenceId, blob) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(blob, `${weekId}_${sentenceId}`);
      tx.oncomplete = resolve;
      tx.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn('[shadowingStorage] saveRecording failed:', err);
  }
}

/**
 * Load a Blob from IndexedDB and return an object URL.
 * Returns null if not found.
 * @param {string} weekId
 * @param {string} sentenceId
 * @returns {Promise<string|null>}
 */
export async function loadRecording(weekId, sentenceId) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(`${weekId}_${sentenceId}`);
      req.onsuccess = (e) => {
        const blob = e.target.result;
        resolve(blob ? URL.createObjectURL(blob) : null);
      };
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn('[shadowingStorage] loadRecording failed:', err);
    return null;
  }
}

/**
 * Load ALL recordings for a week as { sentenceId: blobURL } map.
 * @param {string} weekId
 * @returns {Promise<Object>}
 */
export async function loadAllRecordingsForWeek(weekId) {
  const result = {};
  try {
    const db = await openDB();
    const prefix = `${weekId}_`;
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).openCursor();
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (!cursor) { resolve(); return; }
        if (cursor.key.startsWith(prefix)) {
          const sentenceId = cursor.key.slice(prefix.length);
          result[sentenceId] = URL.createObjectURL(cursor.value);
        }
        cursor.continue();
      };
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn('[shadowingStorage] loadAllRecordingsForWeek failed:', err);
  }
  return result;
}

/**
 * Delete a specific recording.
 * @param {string} weekId
 * @param {string} sentenceId
 */
export async function deleteRecording(weekId, sentenceId) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(`${weekId}_${sentenceId}`);
      tx.oncomplete = resolve;
      tx.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn('[shadowingStorage] deleteRecording failed:', err);
  }
}
