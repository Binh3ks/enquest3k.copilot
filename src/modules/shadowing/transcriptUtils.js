/**
 * transcriptUtils.js — Load video transcripts for shadowing station.
 * Source of truth: per-video files (video_transcripts_by_id/{cleaned,sentences,raw}/<id>.json)
 * Monolithic JSONs (video_transcripts_cleaned.json, etc.) kept only for
 * offline regeneration via tools/split_transcripts.py — NOT imported at runtime.
 */

function buildMap(modules, label) {
  const map = {};
  let withId = 0;
  for (const mod of Object.values(modules)) {
    const entry = mod && (mod.default || mod);
    const id = entry && entry.videoId;
    if (id) { map[id] = entry; withId++; }
  }
  if (typeof window !== 'undefined') {
    console.log(`[transcriptUtils] ${label}: ${Object.keys(modules).length} files, ${withId} mapped`);
  }
  return map;
}

// Side-effect: import.meta.glob wrapped in exported const so Vite keeps
// the eager glob (otherwise tree-shaker may drop unused imports).
export const _GLOBS = {
  sentence: import.meta.glob('../../data/video_transcripts_by_id/sentences/*.json', { eager: true, import: 'default' }),
  cleaned: import.meta.glob('../../data/video_transcripts_by_id/cleaned/*.json', { eager: true, import: 'default' }),
  raw: import.meta.glob('../../data/video_transcripts_by_id/raw/*.json', { eager: true, import: 'default' }),
};

let SENTENCE_MAP = null;
function getSentenceMap() {
  if (!SENTENCE_MAP) SENTENCE_MAP = buildMap(_GLOBS.sentence, 'sentences');
  return SENTENCE_MAP;
}

let CLEANED_MAP = null;
function getCleanedMap() {
  if (!CLEANED_MAP) CLEANED_MAP = buildMap(_GLOBS.cleaned, 'cleaned');
  return CLEANED_MAP;
}

let RAW_MAP = null;
function getRawMap() {
  if (!RAW_MAP) RAW_MAP = buildMap(_GLOBS.raw, 'raw');
  return RAW_MAP;
}

export function getTranscript(videoId) {
  const cleaned = getCleanedMap()[videoId];
  if (cleaned && !cleaned.error) return cleaned;
  const entry = getRawMap()[videoId];
  if (entry && !entry.error) return entry;
  return null;
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
  let entry = getCleanedMap()[videoId];
  if (!entry || entry.error || !entry.segments) return [];

  const MIN_WORDS = 6;
  const breaks = new Set(entry.speaker_breaks || []);

  const merged = entry.segments.reduce((acc, seg, idx) => {
    const text = (seg.text || '').trim();
    if (!text) return acc;
    const words = (text.match(/[A-Za-z']+/g) || []);
    if (words.length === 0) return acc;

    const last = acc[acc.length - 1];
    const short = words.length < MIN_WORDS;
    const lastShort = last ? (last.text.match(/[A-Za-z']+/g) || []).length < MIN_WORDS : false;
    const isBreak = breaks.has(idx);

    if (last && lastShort && short && !isBreak) {
      last.text += ' ' + text;
      last.duration = (seg.start + seg.duration) - last.start;
    } else {
      acc.push({
        text,
        start: seg.start,
        duration: seg.duration,
        _isTranscript: true,
      });
    }
    return acc;
  }, []);

  return merged
    .map((s, idx) => ({ ...s, id: idx + 1 }))
    .filter((s) => {
      const words = (s.text.match(/[A-Za-z']+/g) || []);
      if (words.length === 0) return false;
      const wps = s.duration > 0 ? words.length / s.duration : 0;
      if (wps < 0.3) return false;
      return true;
    });
}