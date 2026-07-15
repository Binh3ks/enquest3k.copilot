#!/usr/bin/env node
/**
 * clean_transcripts.mjs — Merge & clean YouTube transcript segments.
 *
 * Reads from video_transcripts.json (fetched by fetch_transcripts.py).
 * Outputs video_transcripts_cleaned.json.
 *
 * Strategy:
 * - Manual captions (already punctuated): merge segments where previous
 *   doesn't end with sentence-ending punctuation (. ! ?)
 * - Auto-generated captions (no punctuation): apply ASR error fixes,
 *   capitalize, add period at end
 *
 * Usage: node tools/clean_transcripts.mjs [--video VIDEO_ID] [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const INPUT = path.join(ROOT, 'src/data/video_transcripts.json');
const OUTPUT = path.join(ROOT, 'src/data/video_transcripts_cleaned.json');
const CURATED = path.join(ROOT, 'src/data/curated_transcripts.json');

// Load curated sentences (manually curated for auto-gen with poor splits)
let CURATED_DATA = {};
try {
  if (fs.existsSync(CURATED)) {
    CURATED_DATA = JSON.parse(fs.readFileSync(CURATED, 'utf8')).curated || {};
  }
} catch (e) {
  console.warn('Failed to load curated transcripts:', e.message);
}

// ASR error fixes (primarily for auto-generated captions)
const ASR_FIXES = [
  [/\bD hey\b/gi, 'Hey'],
  [/\bD he\b/gi, 'He'],
  [/\bD it\b/gi, 'It'],
  [/\bD they\b/gi, 'They'],
  [/\bD I\b/g, 'I'],
  [/\bIm\b/g, "I'm"],
  [/\bIve\b/g, "I've"],
  [/\bIll\b/g, "I'll"],
  [/\bId\b/g, "I'd"],
  [/\bdont\b/g, "don't"],
  [/\bcant\b/g, "can't"],
  [/\bwont\b/g, "won't"],
  [/\bisnt\b/g, "isn't"],
  [/\bdidnt\b/g, "didn't"],
  [/\bdoesnt\b/g, "doesn't"],
  [/\bcouldnt\b/g, "couldn't"],
  [/\bwouldnt\b/g, "wouldn't"],
  [/\bshes\b/g, "she's"],
  [/\bhes\b/g, "he's"],
  [/\bwhos\b/g, "who's"],
];

function cleanAutoText(text) {
  let c = text;
  for (const [pat, rep] of ASR_FIXES) c = c.replace(pat, rep);
  c = c.replace(/\s+/g, ' ').trim();
  // Strip speaker change markers (>>, -->, etc.)
  c = c.replace(/^>>\s*/, '').replace(/\s*>>\s*/g, ' ').replace(/\s*-->\s*/g, ' ');
  if (c.length > 0) c = c[0].toUpperCase() + c.slice(1);
  // Collapse double periods and trailing single periods
  c = c.replace(/\.\s*\./g, '.').replace(/\s+/g, ' ').trim();
  if (c.length > 0 && !/[.!?]$/.test(c)) c += '.';
  return c;
}

// ── Auto-generated caption NLP splitting ──────────────────────────

const MIN_WORDS = 4;
const MAX_WORDS = 9;
const SOFT_MAX = 6;

// Words that strongly indicate a new sentence
const STRONG_STARTERS = new Set([
  'hey', 'so', 'yes', 'no', 'well', 'now', 'then', 'oh', 'ok', 'okay',
  'do', 'does', 'did', 'is', 'are', 'was', 'were',
  'have', 'has', 'had', 'can', 'could', 'will', 'would',
  'this', 'that', 'these', 'those', 'if', 'when', 'where',
  'how', 'what', 'why', 'which', 'who', 'no', 'come', 'lets',
  'thank', 'thanks', 'sorry', 'im', 'ive',
]);

// Words that almost never end a sentence
const FRAGMENT_ENDERS = new Set([
  'a', 'an', 'the', 'of', 'for', 'in', 'on', 'at', 'to', 'from',
  'with', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'has',
  'have', 'had', 'be', 'been', 'which', 'who', 'that', 'it',
  'they', 'he', 'she', 'we', 'you', 'my', 'your', 'their',
  'into', 'about', 'than', 'not', 'if', 'when', 'while', 'as',
  'i', 'me', 'we', 'us',
]);

// Check if a segment is just a [Music]/[Applause] tag
function isMusicOnly(text) {
  return /^\s*\[(music|applause|laughter|inaudible|.*?)\]\s*$/i.test(text.trim());
}

// Strip [Music], [Applause], etc. tags from text
function stripBrackets(text) {
  return text.replace(/\[.*?\]/g, '').replace(/\s+/g, ' ').trim();
}

function shouldSplitAuto(words, nextWord) {
  const wc = words.length;
  const lastWord = words[words.length - 1]?.word?.toLowerCase().replace(/[^a-z\']/g, '');
  const last2 = words.slice(-2).map(w => w.word.toLowerCase().replace(/[^a-z\']/g, '')).join(' ');

  if (wc < MIN_WORDS) return false;
  if (wc >= MAX_WORDS) return true;
  if (FRAGMENT_ENDERS.has(lastWord)) return false;

  // Check if accumulated ends with complete-sentence patterns
  const looksComplete = /\b(happy birthday|happy new year|merry christmas|thank you|thanks|sorry|hello|hi|bye|goodbye|yes,?|no,?|okay,?|great,?|all right,?|let me|wait|hmm|wow|oh,?)\s*$/.test(last2);
  if (looksComplete) return true;

  if (nextWord && STRONG_STARTERS.has(nextWord)) return true;
  if (nextWord && ['and', 'but', 'or', 'so'].includes(nextWord) && wc >= SOFT_MAX) return true;
  return false;
}

function splitAutoSegments(segments) {
  // YouTube ASR auto-captions over-split: each phrase of 3-5 words gets
  // its own segment with a fake period at the end. Merging by punctuation
  // produces fragments like "Anna how are you." / "I'm good thank you."
  // / "How." / "About." which break karaoke sync with the actual voice.
  //
  // Smart merge: accumulate consecutive segments into a sentence that
  // spans ~6-8 seconds. Strip the fake ASR periods so merged text
  // doesn't contain "Anna how are you. About." mid-sentence.
  const TITLE_PREFIX_RE = /^[.\s]*(?:[A-Za-z][A-Za-z0-9]*[,\s]+){1,3}(?=[A-Z])/;
  const TARGET_DURATION = 9.0;  // seconds per sentence (longer to absorb ASR over-split)
  const MIN_DURATION = 5.0;       // don't end mid-thought if too short
  const sentences = [];
  let cur = null;
  for (const seg of segments) {
    let text = (seg.text || '').trim();
    if (!text || isMusicOnly(text)) continue;
    text = text.replace(/^(English\s+Sing[\s\-]*sing|Theme\s+\d+\s*|Maple\s+Leaf\s+Learning|ELF\s+Kids?|Smile\s+and\s+Learn|Little\s+Fox|Vooks|Vooks\s+Narrated\s+Storybooks?|Storyline\s+Online|Dr\.\s+Binocs|Peekaboo\s+Kidz|Brightly|Homeschool\s+Pop)\s*/i, '');
    const titleStripped = text.replace(TITLE_PREFIX_RE, '');
    if (titleStripped !== text) text = titleStripped;
    const cleaned = cleanAutoText(stripBrackets(text));
    if (!cleaned) continue;
    // Strip trailing period from this segment (ASR inserts fake ones)
    const cleanedNoPeriod = cleaned.replace(/[.!?]+$/, '');
    const segEnd = seg.start + seg.duration;
    if (!cur) {
      cur = { text: cleanedNoPeriod, start: seg.start, end: segEnd };
    } else {
      const combined = (cur.text + ' ' + cleanedNoPeriod).replace(/\s+/g, ' ').trim();
      cur = { text: combined, start: cur.start, end: segEnd };
    }
    const dur = cur.end - cur.start;
    const isRealEnd = /[?!]$/.test(cur.text);
    const isLongEnough = dur >= TARGET_DURATION;
    if ((isRealEnd && dur >= MIN_DURATION) || isLongEnough) {
      // Add a single period at the very end (sentence terminator)
      const finalText = cur.text + '.';
      sentences.push({
        text: finalText,
        start: Math.round(cur.start * 100) / 100,
        duration: Math.round(dur * 100) / 100,
      });
      cur = null;
    }
  }
  if (cur) {
    const dur = cur.end - cur.start;
    sentences.push({
      text: cur.text + '.',
      start: Math.round(cur.start * 100) / 100,
      duration: Math.round(dur * 100) / 100,
    });
  }
  return sentences;
}



function cleanManualText(text) {
  // Light cleanup: normalize whitespace, trim
  let c = text.replace(/\s+/g, ' ').trim();
  // Strip common channel-name prefixes that YouTube manual captions include
  c = c.replace(/^(English\s+Sing[\s\-]*sing|Theme\s+\d+\s*|Maple\s+Leaf\s+Learning|ELF\s+Kids?|Smile\s+and\s+Learn|Little\s+Fox|Vooks|Vooks\s+Narrated\s+Storybooks?|Storyline\s+Online|Dr\.\s+Binocs|Peekaboo\s+Kidz|Brightly|Homeschool\s+Pop)\s*/i, '');
  // Strip topic prefix in parens: 'Foo (Bar) Content...' -> 'Content...'
  c = c.replace(/^[A-Z][A-Za-z0-9\s]+\([^)]+\)\s+(?=[A-Z])/, '');
  // Capitalize first letter if not already
  if (c.length > 0 && c[0] !== c[0].toUpperCase()) {
    c = c[0].toUpperCase() + c.slice(1);
  }
  return c;
}

function endsSentence(text) {
  const trimmed = text.trim();
  return /[.!?]["'”’]?$/.test(trimmed);
}

// For manual captions: also split when accumulated words exceed a soft cap,
// OR when a segment ends with sentence-ending punctuation (`.!?`),
// OR when a segment ends with a comma/dash and accumulated > 10 words
// (commas signal natural break points for sentence splitting).
function mergeSegments(segments, isManual, videoId) {
  if (!segments || segments.length === 0) return [];

  // If curated sentences available for this video, use them
  if (!isManual && videoId && CURATED_DATA[videoId]) {
    // For curated videos: align each sentence to YouTube's actual segments
    // using greedy word-count matching with per-segment position tracking.
    const sentences = CURATED_DATA[videoId];
    const newSegs = [];
    // Skip initial [Music]/[Applause] segments to find first real speech start
    let sIdx = 0;
    while (sIdx < segments.length && isMusicOnly((segments[sIdx].text || '').trim())) sIdx++;
    let sStart = segments[sIdx]?.start || 0;
    let sEnd = sStart;
    let segWordPos = 0;  // words consumed in current segment

    for (const text of sentences) {
      const targetWords = text.split(/\s+/).filter(Boolean).length;
      let counted = 0;
      const sentenceStart = sStart;
      while (sIdx < segments.length && counted < targetWords) {
        const cur = segments[sIdx];
        // Skip bracket-tag segments in curated path too
        if (isMusicOnly((cur.text || '').trim())) { sIdx++; segWordPos = 0; continue; }
        const segWords = cur.text.split(/\s+/).filter(Boolean);
        const remaining = segWords.length - segWordPos;
        if (remaining <= 0) {
          // Fully consumed, move to next segment
          sIdx++;
          segWordPos = 0;
          continue;
        }
        const needed = targetWords - counted;
        // Use the later of sStart or cur.start as effective start
        const effectiveStart = Math.max(sStart, cur.start);
        const wordsBefore = Math.ceil((effectiveStart - cur.start) / cur.duration * segWords.length);
        const totalToUse = Math.min(needed, remaining - (wordsBefore - segWordPos));
        const segTotal = segWords.length;
        const wordDur = cur.duration / segTotal;
        sEnd = effectiveStart + totalToUse * wordDur;
        if (remaining - (wordsBefore - segWordPos) <= needed) {
          counted += (remaining - (wordsBefore - segWordPos));
          segWordPos = 0;
          sIdx++;
        } else {
          counted += needed;
          segWordPos = wordsBefore + needed;
        }
      }
      newSegs.push({
        text: text,
        start: Math.round(sentenceStart * 100) / 100,
        duration: Math.round((sEnd - sentenceStart) * 100) / 100,
      });
      sStart = sEnd;
    }
    return newSegs;
  }

  const merged = [];
  let accText = '';
  let accStart = null;
  let accEnd = null;
  const accWords = () => accText.split(/\s+/).filter(Boolean).length;

  const cleanFn = isManual ? cleanManualText : cleanAutoText;
  const MAX_WORDS = 8;
  const SOFT_MAX = 5;  // Comma break threshold

  // Title-prefix patterns: YouTube ASR puts the video title into the very first
  // caption block, contaminating segment 1.  Two flavours:
  //   (a) merged with dialogue in same segment (e.g. "Theme 11 Where Mom...")
  //   (b) standalone short segment (e.g. {"text":"Family","duration":1.24})
  const TITLE_PREFIX_RE = /^[.\s]*(?:[A-Za-z][A-Za-z0-9]*[,\s]+){1,3}(?=[A-Z])/;
  const TITLE_ONLY_RE = /^[A-Z][a-z]{1,15}\.?$/;

  // Question starters and complete sentence patterns
  const SENTENCE_BOUNDARIES = [
    /^[Cc]an you /, /^[Dd]o you /, /^[Ww]hat /, /^[Ww]here /, /^[Hh]ow /, /^[Ww]ho /, /^[Ww]hy /,
    /^[Ww]here's /, /^[Hh]ow's /, /^[Ww]hat's /,
    /^[Yy]es,? /, /^[Nn]o,? /, /^[Tt]hank you,? /, /^[Tt]hanks,? /, /^[Ss]orry,? /,
    /^[Tt]his is /, /^[Tt]hat is /, /^[Tt]hese are /, /^[Tt]hose are /,
    /^[Hh]ello,? /, /^[Hh]i,? /, /^[Bb]ye,? /, /^[Gg]oodbye,? /,
    /^[Ii] (can|can't|cannot|don't|did|will|am|have|need|want|like|see|hear|love|hate|think|know|go|come) /,
    /^[Ll]et's /, /^[Ww]e (can|are|have|will|don't|need|should) /,
    /^[Aa]ll right,? /, /^[Ss]ure,? /, /^[Oo]kay,? /, /^[Gg]reat,? /,
    /^[Hh]appy birthday\.?/, /^[Gg]ood (morning|afternoon|evening|night|job|bye)/,
    /^[Tt]his is (a|an|for) /, /^[Ii]t's (a|an|for|time|so) /,
  ];

  const isSentenceStart = (text) => {
    const t = text.trim();
    return SENTENCE_BOUNDARIES.some(re => re.test(t));
  };

  const flush = () => {
    const cleaned = cleanFn(accText);
    if (cleaned.length > 0) {
      // Apply title-prefix strip to the first merged sentence (manual captions
      // sometimes have merged title text like "Theme 13. How many Wow! The Zoo."
      // where strip at raw-segment level only removed "Theme 13. How many" but
      // the next segment "Wow!" got merged in — now strip leading title words
      // from the final merged text too).
      let finalText = cleaned;
      if (merged.length === 0) {
        const stripped = cleaned.replace(TITLE_PREFIX_RE, '');
        if (stripped !== cleaned && stripped.trim().length > 0) {
          finalText = stripped;
        }
      }
      merged.push({
        text: finalText,
        start: Math.round(accStart * 100) / 100,
        duration: Math.round((accEnd - accStart) * 100) / 100,
      });
    }
    accText = '';
    accStart = null;
    accEnd = null;
  };

  // (a) Title merged into same segment as dialogue (e.g. "Theme 11 Where Mom,...")
  //     → strip leading 1-3 title/connector words before the first capital-letter
  //     dialogue. Applied per-raw-segment to preserve correct start time.
  //
  // (b) Title in its own segment (e.g. {"text":"Family","start":6.68,"duration":1.24}
  //     followed by {"text":"Hello! Let me introduce my family.","start":10.26,...})
  //     → detect by short duration + small word count, skip the segment entirely.
  let skippedFirstTitleSeg = false;
  let prevTextLower = '';

  for (const seg of segments) {
    let text = (seg.text || '').trim();
    if (!text) continue;
    // Strip channel/topic prefix from EACH segment
    text = text.replace(/^(English\s+Sing[\s\-]*sing|Theme\s+\d+\s*|Maple\s+Leaf\s+Learning|ELF\s+Kids?|Smile\s+and\s+Learn|Little\s+Fox|Vooks|Vooks\s+Narrated\s+Storybooks?|Storyline\s+Online|Dr\.\s+Binocs|Peekaboo\s+Kidz|Brightly|Homeschool\s+Pop)\s*/i, '');
    text = text.replace(/^[A-Z][A-Za-z0-9\s]+\([^)]+\)\s+(?=[A-Z])/, '');
    // Strip YouTube title contamination: "Family Hello!" → "Hello!"
    const titleStripped = text.replace(TITLE_PREFIX_RE, '');
    if (titleStripped !== text) text = titleStripped;
    if (!text) continue;

    // Skip bracket-tag-only segments (e.g. [Music]) — they inflate accEnd
    // without contributing any real spoken content.
    if (isMusicOnly(text)) continue;

    // Skip standalone title-only segments (a single short title-case word).
    // These are YouTube injecting the video title before real dialogue starts.
    if (!skippedFirstTitleSeg && TITLE_ONLY_RE.test(text)) {
      skippedFirstTitleSeg = true;
      continue;
    }

    // Gap-based split (manual captions): a pause of >0.6s between segments
    // signals a distinct utterance (e.g. song phrase "Wake up" → pause →
    // "Wake up" → pause → "Go to the toilet"). Without this, all three merge
    // into one mega-segment with inflated duration, and the highlight
    // distributes words evenly across the full window — running ahead of
    // the actual voice.
    if (isManual && accText) {
      const gap = seg.start - accEnd;
      if (gap > 0.5) flush();
      // Repetition split: when segment text matches previous, always flush.
      // ESL drills ("father father", "grandmother grandmother", "Wake up
      // Wake up") have each repetition as a separate spoken utterance with
      // tiny inter-word gaps (0.1-0.5s). Without this split, repetitions
      // merge into a mega-segment whose even word distribution runs ahead
      // of the actual voice.
      const textLower = text.toLowerCase();
      if (textLower === prevTextLower) flush();
    }

    if (!accText) accStart = seg.start;
    accText += (accText ? ' ' : '') + text;
    accEnd = seg.start + seg.duration;

    if (isManual) {
      const endsWithPeriod = /[.!?]["'”’]?$/.test(text);
      const endsWithComma = /[,;:]["'”’]?$/.test(text);
      const words = accWords();
      // Check if accumulated text contains complete sentence patterns
      const looksComplete = /\b(happy birthday|happy new year|merry christmas|thank you|thanks|sorry|hello|hi|bye|goodbye|i (can|can't|cannot|will|am|have|do|don't|need|want|like|see|hear|love|hate|think|know|go|come|am not|is not|are not)\b|this is|that is|it's|let's|we (can|are|have|will|don't|need|should)|yes,?|no,?|okay,?|great,?|all right,?)\s*[.!?,]?\s*$/i.test(accText);
      // Flush on: sentence end, hard cap, soft cap with comma, or complete sentence
      if (endsWithPeriod || words >= MAX_WORDS || (endsWithComma && words >= SOFT_MAX) || looksComplete) {
        flush();
      }
    }

    prevTextLower = text.toLowerCase();
  }

  if (accText.trim().length > 0) flush();
  return merged;
}

// --- Main ---
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const videoIdx = args.indexOf('--video');
const filterVideo = videoIdx >= 0 ? args[videoIdx + 1] : null;

const data = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
const cleaned = {};
let total = 0, errors = 0, manualCount = 0, autoCount = 0;

for (const [videoId, entry] of Object.entries(data)) {
  if (entry.error) {
    cleaned[videoId] = { error: entry.error, videoId };
    errors++;
    continue;
  }
  if (filterVideo && videoId !== filterVideo) continue;
  total++;

  // Detect caption type: prefer the captionType from fetch, fall back to heuristic
  const segments = entry.segments || [];
  let isManual;
  if (entry.captionType === 'manual') {
    isManual = true;
  } else if (entry.captionType === 'auto') {
    isManual = false;
  } else {
    // Fallback heuristic
    const punctuatedCount = segments.filter(s => /[.!?]/.test(s.text || '')).length;
    isManual = punctuatedCount > segments.length * 0.5;
  }

  if (isManual) manualCount++;
  else autoCount++;

  // Use curated sentences when available (manual or auto captions).
  // Curated lists are manually written to match the actual video dialogue
  // when ASR auto-captions over-split (e.g. dialogues with back-and-forth
  // greetings, where each 3-word phrase becomes its own segment).
  const isCurated = videoId && CURATED_DATA[videoId];
  let mergedSegments;
  if (isCurated) {
    mergedSegments = mergeSegments(entry.segments || [], false, videoId);
  } else if (isManual) {
    mergedSegments = mergeSegments(entry.segments || [], isManual, videoId);
  } else {
    mergedSegments = splitAutoSegments(entry.segments || []);
  }

  cleaned[videoId] = {
    text: mergedSegments.map(s => s.text).join(' '),
    segments: mergedSegments,
    fetchedAt: entry.fetchedAt || new Date().toISOString(),
    captionType: isManual ? 'manual' : 'auto',
  };

  if (filterVideo) {
    console.log(`\n${videoId}: ${(entry.segments || []).length} raw -> ${mergedSegments.length} sentences (${isManual ? 'manual' : 'auto'})`);
    mergedSegments.forEach((s, i) => {
      console.log(`  ${(i + 1).toString().padStart(2)}. ${s.text}  [${s.start.toFixed(1)}-${(s.start + s.duration).toFixed(1)}s]`);
    });
  }
}

if (!dryRun) {
  fs.writeFileSync(OUTPUT, JSON.stringify(cleaned, null, 2), 'utf8');
  console.log(`Output: ${OUTPUT}`);
}

console.log(`\nProcessed ${total} videos, ${errors} errors`);
console.log(`Manual: ${manualCount}, Auto: ${autoCount}`);
