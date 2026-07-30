#!/usr/bin/env node
/**
 * fix_sentence_formatting.cjs — Post-process sentence transcripts
 *
 * Fixes:
 * 1. Multi-sentence chunks: split at .?! boundaries
 * 2. Too-short chunks: merge consecutive short fragments
 * 3. Dangling prepositions: strip period and merge with next
 *
 * Usage:
 *   node scripts/fix_sentence_formatting.cjs 07
 *   node scripts/fix_sentence_formatting.cjs all
 */

const fs = require('fs');
const path = require('path');

const BASE = '/Users/binhnguyen/projects/Engquest3k';
const SENTENCES_DIR = path.join(BASE, 'src/data/video_transcripts_by_id/sentences');

// ── Constants ───────────────────────────────────────────────────────
const INCOMPLETE_ENDINGS = /^(I|he|she|it|we|they|a|an|the|my|your|his|her|its|our|their|to|in|on|at|for|with|and|but|or|so|yet|if|when|while|because|that|which|who|whom|where|how|what|why|is|are|was|were|do|does|did|have|has|had|can|could|will|would|shall|should|may|might|must|please|about|over|out|up|down|back|here|there|some|any|more|much|many|quite|rather)\b/i;

const DANGLING_WORDS = /^(and|to|the|a|an|my|your|his|her|its|our|their|in|on|at|for|with|is|are|was|were|do|does|did|have|has|had|can|could|will|would|shall|should|may|might|must|but|or|so|yet|if|when|while|that|which|who|whom|where|how|what|why|of|from|by|about|into|through|during|before|after|above|below|between|under|over)\.?\s*$/i;

const PRONOUN_BE = /\b(I'm|he's|she's|it's|we're|they're|you're|that's|there's|here's|let's|what's|where's|how's|who's)\.?\s*$/i;

const MIN_WORDS = 3;

function log(msg) { console.log(`[fix] ${msg}`); }

function isCompleteSentence(text) {
  const t = text.trim();
  if (t.length < 3) return false;
  if (!/[.!?]"?\s*$/.test(t)) return false;
  const clean = t.replace(/[.!?]"?\s*$/, "").trim();
  const words = clean.split(/\s+/);
  if (words.length >= 4) return true;
  if (words.length <= 3) {
    const lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, "");
    if (INCOMPLETE_ENDINGS.test(lastWord) && words.length <= 2) return false;
    return true;
  }
  return true;
}

// ── Step 1: Split multi-sentence chunks ─────────────────────────────
function splitMultiSentence(segments) {
  const result = [];
  let splitCount = 0;

  for (const seg of segments) {
    const text = seg.text.trim();
    if (!text || text.length < 3) { result.push(seg); continue; }

    // Split at sentence boundaries: . ? ! followed by space + uppercase
    const parts = text.split(/(?<=[.!?])\s+(?=[A-Z])/);

    if (parts.length <= 1) {
      result.push(seg);
    } else {
      // Distribute time proportionally
      const totalWords = text.split(/\s+/).length;
      let cursor = seg.start;

      for (let p = 0; p < parts.length; p++) {
        const partWords = parts[p].trim().split(/\s+/).length;
        const proportion = partWords / totalWords;
        const partDuration = seg.duration * proportion;

        result.push({
          id: 0, // will be renumbered
          text: parts[p].trim(),
          start: cursor,
          duration: Math.round(partDuration * 100) / 100
        });
        cursor += partDuration;
      }
      splitCount++;
    }
  }

  if (splitCount > 0) log(`  Split ${splitCount} multi-sentence chunks`);
  return result;
}

// ── Step 2: Fix dangling prepositions ────────────────────────────────
function fixDanglingPrepositions(segments) {
  let fixCount = 0;
  for (let i = 0; i < segments.length; i++) {
    const text = segments[i].text.trim();
    const wordCount = text.split(/\s+/).length;

    // Check if segment ends with dangling word + period
    if (DANGLING_WORDS.test(text) && /[.!?]$/.test(text) && wordCount <= 4) {
      segments[i].text = text.replace(/[.!?]+$/, '').trim();
      segments[i]._isFragment = true; // Mark for merge
      fixCount++;
    }
    // Check for pronoun+be verb hallucinations
    if (PRONOUN_BE.test(text) && /[.!?]$/.test(text) && wordCount <= 4) {
      segments[i].text = text.replace(/[.!?]+$/, '').trim();
      segments[i]._isFragment = true;
      fixCount++;
    }
  }
  if (fixCount > 0) log(`  Fixed ${fixCount} dangling prepositions`);
  return segments;
}

// ── Step 3: Merge consecutive short fragments ────────────────────────
function mergeShortFragments(segments) {
  const result = [];
  let mergeCount = 0;

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    const wordCount = seg.text.split(/\s+/).length;
    const isFragment = seg._isFragment || wordCount < MIN_WORDS;
    const hasTerminal = /[.!?]"?\s*$/.test(seg.text.trim());

    // If this is a short fragment and next segment exists, try to merge
    if (isFragment && !hasTerminal && i + 1 < segments.length) {
      const next = segments[i + 1];
      const nextIsFragment = next._isFragment || (next.text.split(/\s+/).length < MIN_WORDS);
      const combinedWords = wordCount + next.text.split(/\s+/).length;

      // Only merge if combined is reasonable (≤40 words) and next is not a dialogue turn
      if (combinedWords <= 40 && !next._isFragment) {
        result.push({
          id: seg.id,
          text: seg.text + ' ' + next.text,
          start: seg.start,
          duration: Math.round(((next.start + next.duration) - seg.start) * 100) / 100
        });
        mergeCount++;
        i++; // Skip next segment (merged)
        continue;
      }
    }

    result.push(seg);
  }

  if (mergeCount > 0) log(`  Merged ${mergeCount} short fragments`);
  return result;
}

// ── Step 4: Renumber and save ────────────────────────────────────────
function renumberAndSave(segments, outputPath) {
  const numbered = segments.map((seg, i) => ({
    id: i + 1,
    text: seg.text.trim(),
    start: seg.start,
    duration: seg.duration
  }));

  // Load existing file to preserve metadata
  const existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  existing.segments = numbered;
  existing.formatted = true;
  existing.formattedAt = new Date().toISOString();

  fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2) + '\n');
  return numbered.length;
}

// ── Main ────────────────────────────────────────────────────────────
function processWeek(videoId) {
  const sentencesPath = path.join(SENTENCES_DIR, `${videoId}.json`);
  if (!fs.existsSync(sentencesPath)) {
    log(`ERROR: ${sentencesPath} not found`);
    return false;
  }

  const data = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  if (!data.segments || data.segments.length === 0) {
    log(`ERROR: No segments in ${videoId}`);
    return false;
  }

  log(`Processing ${videoId} (${data.segments.length} segments)...`);

  // Step 1: Split multi-sentence chunks
  let segments = splitMultiSentence(data.segments);

  // Step 2: Fix dangling prepositions
  segments = fixDanglingPrepositions(segments);

  // Step 3: Merge short fragments
  segments = mergeShortFragments(segments);

  // Step 4: Save
  const finalCount = renumberAndSave(segments, sentencesPath);

  // Verify no issues remain
  let issues = 0;
  for (const seg of segments) {
    const text = seg.text.trim();
    if (text.match(/([.!?])\s+[A-Z]/g)) issues++;
    if (DANGLING_WORDS.test(text) && /[.!?]$/.test(text) && text.split(/\s+/).length <= 4) issues++;
  }

  log(`  Result: ${finalCount} segments, ${issues} remaining issues`);
  return true;
}

// ── Entry ───────────────────────────────────────────────────────────
const target = process.argv[2];
if (!target) {
  console.error('Usage: node scripts/fix_sentence_formatting.cjs <weekNum|all>');
  process.exit(1);
}

if (target === 'all') {
  const files = fs.readdirSync(SENTENCES_DIR).filter(f => f.endsWith('.json'));
  log(`Processing ${files.length} sentence files...`);
  let success = 0;
  for (const file of files) {
    const vid = file.replace('.json', '');
    if (processWeek(vid)) success++;
  }
  log(`Done: ${success}/${files.length} files processed`);
} else {
  // Find videoId for this week
  const padded = target.padStart(2, '0');
  const shadowingPath = path.join(BASE, `src/data/weeks/week_${padded}/shadowing.js`);
  const content = fs.readFileSync(shadowingPath, 'utf8');
  const vid = content.match(/videoId:\s*["'`]([^"'`]+)["'`]/)?.[1];
  if (!vid) { log('ERROR: No videoId'); process.exit(1); }
  processWeek(vid);
}
