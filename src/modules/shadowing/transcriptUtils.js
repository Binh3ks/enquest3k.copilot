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
  // Priority 1: sentences/ (Deepgram-aligned L3 with words[])
  const sentence = getSentenceMap()[videoId];
  if (sentence && !sentence.error && sentence.segments?.length > 0) return sentence;
  // Priority 2: cleaned/ (older cleaned transcripts)
  const cleaned = getCleanedMap()[videoId];
  if (cleaned && !cleaned.error) return cleaned;
  // Priority 3: raw/ (raw auto-captions)
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
  let entry = getSentenceMap()[videoId];
  if (!entry || entry.error || !entry.segments) return [];
  
  const rawSegments = entry.segments;
  const merged = [];
  let current = null;

  for (const s of rawSegments) {
    const text = (s.text || '').trim();
    if (!text) continue;

    if (!current) {
      current = { id: s.id, text, start: s.start, duration: s.duration, vi: s.vi };
    } else {
      current.text = current.text + ' ' + text;
      current.duration = (s.start + s.duration) - current.start;
    }

    // Check if segment ends with terminal punctuation or is at sentence boundary
    if (/[.?!]$/.test(text) || current.text.length > 80) {
      merged.push(current);
      current = null;
    }
  }
  if (current) merged.push(current);

  return merged
    .map((s, idx) => ({
      id: s.id ?? (idx + 1),
      text: (s.text || '').trim(),
      start: s.start,
      duration: s.duration,
      vi: s.vi || null,
      _isTranscript: true,
    }))
    .filter((s) => {
      const words = (s.text.match(/[A-Za-z']+/g) || []);
      return words.length > 0;
    });
}