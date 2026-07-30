#!/usr/bin/env node
/**
 * split_with_llm.cjs — LLM-powered sentence splitting for unpunctuated text
 *
 * When Deepgram ASR returns unpunctuated text, this script uses LLM to
 * insert proper sentence boundaries.
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
const { callLLM } = require('./llmClient.cjs');

function log(msg) { console.log(`[split] ${msg}`); }

const SYSTEM_PROMPT = `You are an expert ESL transcript editor. Your task is to add proper sentence boundaries to unpunctuated YouTube auto-caption text.

RULES:
1. Insert periods (. question marks (?) or exclamation marks (!) at logical sentence boundaries.
2. Fix capitalization: First letter of each sentence must be uppercase.
3. NEVER change words or add/remove content — only fix punctuation and capitalization.
4. Each sentence should be a complete thought (5-20 words ideally).
5. Split at natural dialogue turns (greetings, questions, answers, exclamations).
6. Preserve exact wording — do NOT paraphrase or rewrite.

OUTPUT: Return ONLY the corrected text. No explanations, no JSON, no markdown. Just the cleaned text.`;

async function splitTextWithLLM(text, videoId) {
  const prompt = `Add sentence boundaries to this unpunctuated YouTube auto-caption text. Each sentence must be a complete thought. Only fix punctuation and capitalization — do NOT change any words.

TEXT:
${text}`;

  const response = await callLLM(prompt, SYSTEM_PROMPT);
  return response.trim();
}

async function processWeek(videoId) {
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

  // Check if any segment has unpunctuated text (no .?! at end)
  const unpunctuatedCount = data.segments.filter(s =>
    s.text && s.text.length > 10 && !/[.!?]"\s*$/.test(s.text.trim())
  ).length;

  if (unpunctuatedCount === 0) {
    log(`  ${videoId}: No unpunctuated segments — skipping`);
    return false;
  }

  log(`  ${videoId}: ${unpunctuatedCount} unpunctuated segments — splitting with LLM`);

  // Combine all unpunctuated text for LLM processing
  const combinedText = data.segments
    .map(s => s.text.trim())
    .filter(t => t.length > 0)
    .join(' ');

  const cleanedText = await splitTextWithLLM(combinedText, videoId);
  log(`  LLM cleaned text: ${cleanedText.slice(0, 100)}...`);

  // Split cleaned text into sentences
  const cleanedSentences = cleanedText
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .filter(s => s.trim().length > 0);

  // Map back to timestamps using original timing
  const totalWords = combinedText.split(/\s+/).length;
  let cursor = 0;
  const alignedSegments = [];

  for (let i = 0; i < cleanedSentences.length; i++) {
    const sentence = cleanedSentences[i].trim();
    const sentenceWords = sentence.split(/\s+/).length;
    const proportion = sentenceWords / totalWords;
    const start = cursor;
    const duration = 2.0; // approximate

    alignedSegments.push({
      id: i + 1,
      text: sentence,
      start: Math.round(start * 100) / 100,
      duration: Math.round(duration * 100) / 100
    });
    cursor += duration;
  }

  // Save
  data.segments = alignedSegments;
  data.formatted = true;
  data.formattedAt = new Date().toISOString();

  fs.writeFileSync(sentencesPath, JSON.stringify(data, null, 2) + '\n');
  log(`  ${videoId}: ${alignedSegments.length} sentences after LLM split`);

  return true;
}

async function main() {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node scripts/split_with_llm.cjs <videoId|all>');
    process.exit(1);
  }

  if (target === 'all') {
    const files = fs.readdirSync(SENTENCES_DIR).filter(f => f.endsWith('.json'));
    log(`Processing ${files.length} sentence files...`);
    let processed = 0;
    for (const file of files) {
      const vid = file.replace('.json', '');
      if (await processWeek(vid)) processed++;
    }
    log(`Done: ${processed}/${files.length} files processed`);
  } else {
    await processWeek(target);
  }
}

main().catch(err => { log(`FATAL: ${err.message}`); process.exit(1); });
