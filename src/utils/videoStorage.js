/**
 * videoStorage.js
 * IndexedDB persistence for VideoChallenge recordings.
 * Stores video blobs so they survive tab-switch and page reload.
 *
 *   database: "engquest_video"
 *   store:    "recordings"
 *   key:      `${weekId}` (one video per week per student)
 */

const DB_NAME = 'engquest_video';
const STORE_NAME = 'recordings';
const DB_VERSION = 1;

let _db = null;

function openDB() {
  if (_db) return Promise.resolve(_db);
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => { _db = req.result; resolve(_db); };
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

/**
 * Save a video blob to IndexedDB.
 * @param {string|number} weekId
 * @param {Blob} blob
 */
export async function saveVideo(weekId, blob) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const key = String(weekId);
      store.put({ blob, savedAt: Date.now() }, key);
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('[videoStorage] saveVideo failed:', err);
  }
}

/**
 * Load a video blob from IndexedDB and return an object URL.
 * Caller is responsible for revoking the URL when done.
 * @param {string|number} weekId
 * @returns {Promise<string|null>} blob URL or null
 */
export async function loadVideo(weekId) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(String(weekId));
      req.onsuccess = () => {
        const record = req.result;
        if (record?.blob) {
          resolve(URL.createObjectURL(record.blob));
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('[videoStorage] loadVideo failed:', err);
    return null;
  }
}

/**
 * Delete the saved video for a week.
 * @param {string|number} weekId
 */
export async function deleteVideo(weekId) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(String(weekId));
      tx.oncomplete = resolve;
      tx.onerror = resolve;
    });
  } catch (err) {
    console.warn('[videoStorage] deleteVideo failed:', err);
  }
}
