/**
 * transcriptUtils.js — Load video transcripts for shadowing station.
 * Per-video files (video_transcripts_by_id/{cleaned,sentences,raw}/<id>.json).
 *
 * Map lazily built on first access. Keyed by videoId field injected by
 * tools/split_transcripts.py.
 */

function buildMap(modules) {
  const map = {};
  for (const mod of Object.values(modules)) {
    const entry = mod.default || mod;
    const id = entry && entry.videoId;
    if (id) map[id] = entry;
  }
  return map;
}

const sentenceModules = import.meta.glob('../../data/video_transcripts_by_id/sentences/*.json', { eager: true, import: 'default' });
let SENTENCE_MAP = null;
function getSentenceMap() {
  if (!SENTENCE_MAP) SENTENCE_MAP = buildMap(sentenceModules);
  return SENTENCE_MAP;
}

const cleanedModules = import.meta.glob('../../data/video_transcripts_by_id/cleaned/*.json', { eager: true, import: 'default' });
let CLEANED_MAP = null;
function getCleanedMap() {
  if (!CLEANED_MAP) CLEANED_MAP = buildMap(cleanedModules);
  return CLEANED_MAP;
}

const rawModules = import.meta.glob('../../data/video_transcripts_by_id/raw/*.json', { eager: true, import: 'default' });
let RAW_MAP = null;
function getRawMap() {
  if (!RAW_MAP) RAW_MAP = buildMap(rawModules);
  return RAW_MAP;
}export function getTranscript(videoId) {
  const cleaned = getCleanedMap()[videoId];
  if (cleaned && !cleaned.error) return cleaned;
  const entry = getRawMap()[videoId];
  if (!entry || entry.error) return null;
  return entry;
}

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

export function getCleanedTranscriptSentences(videoId) {
  const entry = getSentenceMap()[videoId];
  if (!entry || entry.error || !entry.segments) return [];
  return entry.segments
    .map((s, idx) => ({
      id: s.id ?? (idx + 1),
      text: (s.text || '').trim(),
      start: s.start,
      duration: s.duration,
      _isTranscript: true,
    }))
    .filter((s) => {
      const words = (s.text.match(/[A-Za-z']+/g) || []);
      if (words.length === 0) return false;
      const wps = s.duration > 0 ? words.length / s.duration : 0;
      if (wps < 0.3) return false;
      return true;
    });
}