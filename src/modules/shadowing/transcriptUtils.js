/**
 * transcriptUtils.js — Load cleaned video transcripts for shadowing station.
 * Tier 1 of transcript pipeline: pre-fetched + cleaned YouTube transcripts.
 */

// SENTENCE-SEGMENTED transcripts (cleaned + re-segmented by split_sentences.mjs)
const sentencesModule = import.meta.glob('../../data/video_transcripts_sentences.json', { eager: true });
let SENTENCES = null;
function getSentences() {
  if (!SENTENCES) {
    const mod = Object.values(sentencesModule)[0];
    SENTENCES = mod?.default || {};
  }
  return SENTENCES;
}

// CLEANED transcripts (fallback for getTranscript which needs raw segments)
const cleanedTranscriptModule = import.meta.glob('../../data/video_transcripts_cleaned.json', { eager: true });
let CLEANED = null;
function getCleaned() {
  if (!CLEANED) {
    const mod = Object.values(cleanedTranscriptModule)[0];
    CLEANED = mod?.default || {};
  }
  return CLEANED;
}

// Raw transcripts (fallback)
const transcriptModules = import.meta.glob('../../data/video_transcripts.json', { eager: true });
let RAW = null;
function getRaw() {
  if (!RAW) {
    const mod = Object.values(transcriptModules)[0];
    RAW = mod?.default || {};
  }
  return RAW;
}

/**
 * Get transcript for a videoId (uses cleaned version).
 */
export function getTranscript(videoId) {
  const cleaned = getCleaned()[videoId];
  if (cleaned && !cleaned.error) return cleaned;
  // Fallback to raw
  const entry = getRaw()[videoId];
  if (!entry || entry.error) return null;
  return entry;
}

/**
 * Find segment by current video time.
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

/**
 * Get cleaned transcript segments as a script-compatible array.
 * Uses the pre-segmented sentences file (already has id, text, start, duration).
 */
export function getCleanedTranscriptSentences(videoId) {
  const entry = getSentences()[videoId];
  if (!entry || entry.error || !entry.segments) return [];
  return entry.segments.map(s => ({
    id: s.id,
    text: s.text,
    start: s.start,
    duration: s.duration,
    _isTranscript: true,
  }));
}
