/**
 * transcriptUtils.js — Load video transcripts for shadowing station.
 * Tier 1 of transcript pipeline: pre-fetched YouTube transcripts cached in JSON.
 */

const transcriptModules = import.meta.glob('../../data/video_transcripts.json', { eager: true });

let cache = null;

function loadCache() {
  if (cache) return cache;
  try {
    const mod = Object.values(transcriptModules)[0];
    cache = mod.default || mod;
  } catch {
    cache = {};
  }
  return cache;
}

/**
 * Get transcript for a videoId.
 * @param {string} videoId
 * @returns {{text: string, segments: Array}|null}
 */
export function getTranscript(videoId) {
  const data = loadCache();
  const entry = data[videoId];
  if (!entry || entry.error) return null;
  return entry;
}

/**
 * Find segment by current video time.
 * @param {string} videoId
 * @param {number} currentTime - seconds
 * @returns {{text: string, start: number, duration: number, index: number}|null}
 */
export function getActiveSegment(videoId, currentTime) {
  const transcript = getTranscript(videoId);
  if (!transcript) return null;
  for (let i = 0; i < transcript.segments.length; i++) {
    const s = transcript.segments[i];
    if (currentTime >= s.start && currentTime < s.start + s.duration) {
      return { ...s, index: i };
    }
  }
  return null;
}
