#!/usr/bin/env node
/**
 * split_with_llm.cjs — Split unpunctuated sentences at natural boundaries
 *
 * Does NOT change timestamps. Only splits text at punctuation and
 * natural dialogue boundaries. Preserves original Deepgram timing.
 *
 * Usage:
 *   node scripts/split_with_llm.cjs <videoId>
 *   node scripts/split_with_llm.cjs all
 */

require('dotenv/config');
const fs = require('fs');
const path = require('path');

const BASE = '/Users/binhnguyen/projects/Engquest3k';
const SENTENCES_DIR = path.join(BASE, 'src/data/video_transcripts_by_id/sentences');

function log(msg) { console.log(`[split] ${msg}`); }

const TURN_WORDS = /^(hi|hello|hey|bye|goodbye|okay|ok|yes|no|nice|great|wow|really|so|well|thank|thanks)\b/i;
const WH_QUESTIONS = /^(how|what|where|when|why|who)\b/i;
const SUBJECT_PRONOUNS = /^(i|you|he|she|it|we|they)\b/i;
const CLAUSE_ENDERS = /^(is|are|was|were|do|does|did|have|has|had|can|could|will|would|shall|should|may|might|must|go|goes|went|come|comes|came|like|likes|liked|live|lives|lived|work|works|worked|study|studies|studied|want|wants|wanted|need|needs|needed|love|loves|loved|say|says|said|tell|tells|told|give|gives|gave|take|takes|took|make|makes|made|see|sees|saw|get|gets|got|eat|eats|ate|drink|drinks|drank|walk|walks|walked|run|runs|ran|play|plays|played|happy|sad|good|bad|great|fine|okay|ok|well|here|there|now|then|today|tomorrow|yesterday|morning|afternoon|evening|night)\b/i;

function splitAtPunctuation(segments) {
  const result = [];
  let splitCount = 0;

  for (const seg of segments) {
    const text = seg.text.trim();
    if (!text || text.length < 3) { result.push(seg); continue; }

    // Step 1: Split at existing punctuation (.?! followed by space + letter)
    let parts = text.split(/(?<=[.!?])\s+(?=[a-zA-Z])/);

    // Step 2: If no punctuation, split at natural dialogue boundaries
    if (parts.length <= 1) {
      const words = text.split(/\s+/);
      if (words.length < 6) { result.push(seg); continue; }

      const splitPoints = [];
      for (let w = 1; w < words.length; w++) {
        const word = words[w].toLowerCase().replace(/[^a-z]/g, '');
        const prevWord = words[w - 1].toLowerCase().replace(/[^a-z]/g, '');

        if (WH_QUESTIONS.test(word)) { splitPoints.push(w); continue; }
        if (SUBJECT_PRONOUNS.test(word) && CLAUSE_ENDERS.test(prevWord)) { splitPoints.push(w); continue; }
        if (/^(but|because|so|and)$/i.test(word) && w >= 4) { splitPoints.push(w); continue; }
      }

      if (splitPoints.length > 0) {
        parts = [];
        let prev = 0;
        for (const sp of splitPoints) {
          if (sp > prev) parts.push(words.slice(prev, sp).join(' '));
          prev = sp;
        }
        if (prev < words.length) parts.push(words.slice(prev).join(' '));
      }
    }

    if (parts.length <= 1) { result.push(seg); continue; }

    // Split: keep original start time for first part, distribute remaining time proportionally
    const totalWords = text.split(/\s+/).length;
    let cursor = seg.start;
    for (const part of parts) {
      const partWords = part.trim().split(/\s+/).length;
      const proportion = partWords / totalWords;
      const partDuration = seg.duration * proportion;
      result.push({
        id: 0,
        text: part.trim(),
        start: cursor,
        duration: Math.round(partDuration * 100) / 100
      });
      cursor += partDuration;
    }
    splitCount++;
  }

  if (splitCount > 0) log(`  Split ${splitCount} segments`);
  return result;
}

function renumberAndSave(segments, outputPath) {
  const numbered = segments.map((seg, i) => ({
    id: i + 1,
    text: seg.text.trim(),
    start: seg.start,
    duration: seg.duration
  }));

  const existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
  existing.segments = numbered;
  existing.formatted = true;
  existing.formattedAt = new Date().toISOString();

  fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2) + '\n');
  return numbered.length;
}

function processWeek(videoId) {
  const sentencesPath = path.join(SENTENCES_DIR, `${videoId}.json`);
  if (!fs.existsSync(sentencesPath)) { log(`ERROR: ${sentencesPath} not found`); return false; }

  const data = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  if (!data.segments || data.segments.length === 0) { log(`ERROR: No segments in ${videoId}`); return false; }

  const unpunctuatedCount = data.segments.filter(s =>
    s.text && s.text.length > 10 && !/[.!?]"\s*$/.test(s.text.trim())
  ).length;

  if (unpunctuatedCount === 0) { log(`  ${videoId}: All punctuated — skipping`); return false; }

  log(`  ${videoId}: ${unpunctuatedCount}/${data.segments.length} unpunctuated — splitting`);
  const segments = splitAtPunctuation(data.segments);
  const finalCount = renumberAndSave(segments, sentencesPath);
  log(`  ${videoId}: ${finalCount} sentences`);
  return true;
}

async function main() {
  const target = process.argv[2];
  if (!target) { console.error('Usage: node scripts/split_with_llm.cjs <videoId|all>'); process.exit(1); }

  if (target === 'all') {
    const files = fs.readdirSync(SENTENCES_DIR).filter(f => f.endsWith('.json'));
    log(`Processing ${files.length} files...`);
    let processed = 0;
    for (const file of files) {
      if (processWeek(file.replace('.json', ''))) processed++;
    }
    log(`Done: ${processed}/${files.length}`);
  } else {
    processWeek(target);
  }
}

main().catch(err => { log(`FATAL: ${err.message}`); process.exit(1); });
