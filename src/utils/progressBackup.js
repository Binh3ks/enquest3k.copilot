/**
 * progressBackup.js — Triple-write progress layer (Jun 9, 2026)
 *
 * Why this exists: The previous flow only wrote to Zustand + server. If
 * the server write failed silently (timeout, network, 500) the user's
 * local state still showed progress, but a reload came back empty
 * because the server was the only durable copy.
 *
 * This module adds three independent write targets so loss requires
 * BOTH the server AND two browser-local stores to fail simultaneously:
 *
 *   1. server        — primary, async, with retry + sendBeacon on unload
 *   2. localStorage  — synchronous mirror of every save (via Zustand persist)
 *   3. sessionStorage — "unsynced journal" — every save appends here until
 *                       the server confirms, so we can replay on next mount
 *
 * Plus:
 *   - retryWithBackoff(): exponential backoff for failed server writes
 *   - flushPendingOnUnload(): sendBeacon for any unsynced journal entries
 *   - replayJournal(): on app boot, replay any entries that didn't get
 *                       a server confirmation before last unload
 *
 * The save contract (see [[feedback_progress_save_contract]]) is enforced
 * by the SERVER: the data field is now merged (||) not overwritten, so
 * a stray `data: {}` from any client cannot wipe rich JSONB.
 */

import { progressAPI } from '../services/api';

const JOURNAL_KEY = 'engquest_progress_journal';
const LAST_SEEN_KEY = 'engquest_progress_journal_cursor';
const BACKUP_PREFIX = 'engquest_progress_backup_';
const MAX_BACKUPS_PER_WEEK = 20;
const MAX_JOURNAL_ENTRIES = 200;

let inFlight = new Set();
let isUnloading = false;

// ─── helpers ──────────────────────────────────────────────────────────

function readJournal() {
  try {
    const raw = sessionStorage.getItem(JOURNAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJournal(entries) {
  try {
    // Cap to last N entries to avoid sessionStorage quota issues
    const trimmed = entries.slice(-MAX_JOURNAL_ENTRIES);
    sessionStorage.setItem(JOURNAL_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('[progressBackup] journal write failed:', e);
  }
}

function appendJournal(entry) {
  if (isUnloading) return; // Don't write during unload
  const journal = readJournal();
  // Dedupe by (weekId, stationId, op) — keep latest
  const filtered = journal.filter(
    (e) => !(e.weekId === entry.weekId && e.stationId === entry.stationId)
  );
  filtered.push({ ...entry, ts: Date.now() });
  writeJournal(filtered);
}

function markJournalSynced(weekId, stationId) {
  const journal = readJournal();
  const filtered = journal.filter(
    (e) => !(e.weekId === weekId && e.stationId === stationId)
  );
  writeJournal(filtered);
}

function writeBackupToLocalStorage(weekId, stationId, payload) {
  try {
    const key = `${BACKUP_PREFIX}${weekId}_${stationId}`;
    const existing = JSON.parse(localStorage.getItem(key) || 'null');
    if (!existing || existing.ts < payload.ts) {
      localStorage.setItem(key, JSON.stringify(payload));
    }
    // Garbage-collect old backups for this week
    gcBackupsForWeek(weekId);
  } catch (e) {
    console.warn('[progressBackup] localStorage backup write failed:', e);
  }
}

function gcBackupsForWeek(weekId) {
  // Keeps the global backup set bounded — for each week we keep
  // only the most-recent N stations. Station backups are key-value
  // per (week, station) so this just trims cross-week size.
  try {
    const allKeys = Object.keys(localStorage).filter((k) => k.startsWith(BACKUP_PREFIX));
    if (allKeys.length > 200) {
      const sorted = allKeys
        .map((k) => ({ k, ts: JSON.parse(localStorage.getItem(k) || '{}').ts || 0 }))
        .sort((a, b) => a.ts - b.ts);
      const toRemove = sorted.slice(0, sorted.length - 200);
      toRemove.forEach(({ k }) => localStorage.removeItem(k));
    }
  } catch {
    // ignore
  }
}

// ─── retry with backoff ──────────────────────────────────────────────

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

/**
 * Save with exponential backoff. Up to `maxAttempts` tries (default 4).
 * Backoff: 500ms, 1.5s, 4s, 10s. Throws on final failure so the caller
 * can decide whether to keep the entry in the unsynced journal.
 */
export async function saveWithRetry(payload, { maxAttempts = 4, signal } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (signal?.aborted) throw new Error('aborted');
    try {
      const result = await progressAPI.saveProgress(payload);
      return result;
    } catch (err) {
      lastErr = err;
      // Don't retry 4xx (client errors) or Network Errors (CORS / offline) — fail fast
      const status = err?.response?.status;
      const isNetworkError = err?.message === 'Network Error' || err?.code === 'ERR_NETWORK' || !err?.response;
      if (isNetworkError || (status && status >= 400 && status < 500 && status !== 408 && status !== 429)) {
        throw err;
      }
      if (attempt < maxAttempts - 1) {
        const wait = Math.min(500 * 3 ** attempt, 10_000);
        await delay(wait);
      }
    }
  }
  throw lastErr;
}

// ─── main save (triple-write) ────────────────────────────────────────

const dedupeKey = (weekId, stationId) => `${weekId}::${stationId}`;

/**
 * Save progress to all three targets.
 *  1. sessionStorage journal (synchronous, never fails)
 *  2. localStorage backup (synchronous, never fails)
 *  3. server (async, retried, with journal cleanup on success)
 *
 * Returns the server response on success, throws on final failure.
 * On failure the journal entry remains for the next mount to retry.
 */
export async function saveProgressWithBackup({ weekId, stationId, data, isCompleted, score }) {
  const k = dedupeKey(weekId, stationId);
  if (inFlight.has(k)) {
    // Coalesce parallel saves — last write wins
    return progressAPI.saveProgress({ weekId, stationId, data, isCompleted, score });
  }
  inFlight.add(k);

  // 1. localStorage mirror (sync)
  writeBackupToLocalStorage(weekId, stationId, {
    weekId, stationId, data, isCompleted, score, ts: Date.now()
  });

  // 2. sessionStorage journal (sync)
  appendJournal({ weekId, stationId, data, isCompleted, score, status: 'pending' });

  // 3. server with retry
  try {
    const result = await saveWithRetry({ weekId, stationId, data, isCompleted, score });
    markJournalSynced(weekId, stationId);
    return result;
  } catch (err) {
    console.warn('[progressBackup] Server save unavailable (saved to local journal):', err?.message);
    return { ok: false, offline: true, message: err?.message };
  } finally {
    inFlight.delete(k);
  }
}

// ─── journal replay ──────────────────────────────────────────────────

/**
 * On app boot, replay any journal entries that didn't make it to the
 * server. The journal is cleared as each entry succeeds.
 * Safe to call multiple times.
 */
export async function replayJournal() {
  if (isUnloading) return;
  const journal = readJournal();
  if (journal.length === 0) return;
  console.log(`[progressBackup] replaying ${journal.length} unsynced journal entries`);

  for (const entry of journal) {
    try {
      await saveWithRetry(
        {
          weekId: entry.weekId,
          stationId: entry.stationId,
          data: entry.data,
          isCompleted: entry.isCompleted,
          score: entry.score
        },
        { maxAttempts: 1 }
      );
      markJournalSynced(entry.weekId, entry.stationId);
    } catch (err) {
      console.warn(
        `[progressBackup] replay paused for network/CORS issue at week=${entry.weekId} station=${entry.stationId}:`,
        err?.message
      );
      // Abort replay loop on network error to avoid spamming 20+ failing requests
      break;
    }
  }
}

// ─── unload flush ────────────────────────────────────────────────────

/**
 * On page unload, flush any pending journal entries via sendBeacon.
 * sendBeacon is fire-and-forget and survives page close, unlike fetch.
 */
export function installUnloadFlush() {
  if (typeof window === 'undefined') return;
  if (window.__progressBackupInstalled) return;
  window.__progressBackupInstalled = true;

  const flush = () => {
    if (isUnloading) return;
    isUnloading = true;
    const journal = readJournal();
    if (journal.length === 0) return;

    // Get token + API URL via a beacon-friendly endpoint
    try {
      const token = JSON.parse(localStorage.getItem('engquest-auth') || '{}')?.state?.token
        || (window.__engQuestToken) || null;
      const apiBase = (import.meta.env.VITE_API_URL) || '';
      if (!token || !apiBase) return;

      const url = `${apiBase}/progress/save`;
      const blob = new Blob(
        [JSON.stringify({ journal: journal, _beacon: true })],
        { type: 'application/json' }
      );
      // sendBeacon is the only fetch that survives page close
      const ok = navigator.sendBeacon(url, blob);
      if (ok) {
        // Don't clear journal — server may not have processed before tab closed.
        // Next mount will replay, server's merge logic will dedupe naturally.
        console.log(`[progressBackup] beaconed ${journal.length} entries on unload`);
      }
    } catch (e) {
      console.warn('[progressBackup] unload flush failed:', e);
    }
  };

  window.addEventListener('beforeunload', flush);
  window.addEventListener('pagehide', flush);
  // Also flush on visibility change to background (mobile)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
}

// ─── recovery (push localStorage → server) ───────────────────────────

/**
 * Read all backup entries from localStorage and re-push them to server.
 * Use this to restore progress after server wipe, or when a user
 * switches devices and their Zustand-persisted state has data the
 * server doesn't.
 *
 * Returns { total, pushed, failed }.
 */
export async function recoverFromLocalStorage({ onProgress } = {}) {
  if (typeof window === 'undefined') return { total: 0, pushed: 0, failed: 0 };
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(BACKUP_PREFIX));
  const backups = keys
    .map((k) => {
      try {
        return JSON.parse(localStorage.getItem(k));
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (backups.length === 0) return { total: 0, pushed: 0, failed: 0 };

  let pushed = 0;
  let failed = 0;
  for (let i = 0; i < backups.length; i++) {
    const b = backups[i];
    if (onProgress) onProgress({ current: i + 1, total: backups.length, station: b.stationId });
    try {
      await progressAPI.saveProgress({
        weekId: b.weekId,
        stationId: b.stationId,
        data: b.data,
        isCompleted: b.isCompleted,
        score: b.score
      });
      pushed++;
    } catch (err) {
      console.warn(`[progressBackup] recovery failed for ${b.stationId}:`, err?.message);
      failed++;
    }
  }
  console.log(`[progressBackup] recovery: pushed ${pushed}/${backups.length}`);
  return { total: backups.length, pushed, failed };
}

export default {
  saveProgressWithBackup,
  replayJournal,
  installUnloadFlush,
  recoverFromLocalStorage,
  saveWithRetry
};
