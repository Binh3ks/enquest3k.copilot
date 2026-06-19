/**
 * transcriptAligner.js - Aligns raw YouTube transcript segments to
 * clean shadowing.js script sentences.
 *
 * Problem: Raw YouTube transcripts have ASR errors ("D hey" instead of "Hey"),
 * no punctuation, and arbitrary segmentation. The script.js data has clean
 * human-written sentences but no timestamps.
 *
 * Solution: Match each script.js sentence to a chunk of raw transcript
 * segments, using word count as the primary alignment signal.
 * The clean text comes from script.js, timestamps from raw transcript.
 */

function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function normalize(text) {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-z0-9\s']/g, '').replace(/\s+/g, ' ').trim();
}

function wordOverlap(a, b) {
  const aWords = new Set(normalize(a).split(/\s+/).filter(w => w.length > 2));
  const bWords = new Set(normalize(b).split(/\s+/).filter(w => w.length > 2));
  if (aWords.size === 0 || bWords.size === 0) return 0;
  let matches = 0;
  for (const w of aWords) {
    if (bWords.has(w)) matches++;
  }
  return matches / Math.max(aWords.size, bWords.size);
}

export function alignTranscriptToScript(script, rawSegments) {
  if (!script || !rawSegments || script.length === 0 || rawSegments.length === 0) {
    return [];
  }

  const aligned = [];
  let segIdx = 0;

  for (let i = 0; i < script.length; i++) {
    const scriptSent = script[i];
    const targetWordCount = countWords(scriptSent.text);
    let accumulated = [];
    let startTime = null;
    let endTime = null;

    while (segIdx < rawSegments.length) {
      const seg = rawSegments[segIdx];
      if (accumulated.length === 0) {
        startTime = seg.start;
      }
      accumulated.push(seg.text);
      endTime = seg.start + seg.duration;
      segIdx++;

      const currentWordCount = countWords(accumulated.join(' '));

      if (currentWordCount >= targetWordCount - 1) {
        const combined = accumulated.join(' ');
        const score = wordOverlap(scriptSent.text, combined);
        if (score >= 0.25 || currentWordCount >= targetWordCount + 2) {
          break;
        }
      }
    }

    if (accumulated.length > 0) {
      aligned.push({
        id: scriptSent.id,
        text: scriptSent.text,
        vi: scriptSent.vi || null,
        start: startTime,
        duration: (endTime - startTime),
        _isTranscript: true,
        _rawText: accumulated.join(' '),
      });
    } else {
      aligned.push({
        ...scriptSent,
        start: null,
        duration: 0,
        _isTranscript: true,
      });
    }
  }

  return aligned;
}

export function cleanRawTranscript(text) {
  if (!text) return '';
  let cleaned = text;
  cleaned = cleaned.replace(/\bD hey\b/gi, 'Hey');
  cleaned = cleaned.replace(/\bD he\b/gi, 'He');
  cleaned = cleaned.replace(/\bIm\b/g, "I'm");
  cleaned = cleaned.replace(/\bIve\b/g, "I've");
  cleaned = cleaned.replace(/\bIll\b/g, "I'll");
  cleaned = cleaned.replace(/\bId\b/g, "I'd");
  cleaned = cleaned.replace(/\bdont\b/g, "don't");
  cleaned = cleaned.replace(/\bcant\b/g, "can't");
  cleaned = cleaned.replace(/\bwont\b/g, "won't");
  cleaned = cleaned.replace(/\bisnt\b/g, "isn't");
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  return cleaned;
}
