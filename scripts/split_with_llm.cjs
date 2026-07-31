#!/usr/bin/env node
/**
 * split_with_llm.cjs — LLM-powered sentence splitting for unpunctuated text
 *
 * Flow:
 *   1. Combine ALL text from segments into one string
 *   2. Send to LLM once to add sentence boundaries
 *   3. Split LLM output at new punctuation marks
 *   4. Map back to original timestamps proportionally
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

const SYSTEM_PROMPT = `You are a punctuation editor for ESL transcripts. Your ONLY job is to add sentence boundaries to unpunctuated or poorly-punctuated text.

RULES:
1. Insert periods (. ), question marks (? ), and exclamation marks (! ) at logical sentence boundaries.
2. Fix capitalization: first letter of each sentence must be uppercase.
3. NEVER change any words — only add/fix punctuation and capitalization.
4. Each sentence must be a complete thought (5-20 words).
5. Split at dialogue turns: greetings, questions, answers, exclamations.
6. Return ONLY the corrected text. No explanations, no JSON, no markdown.`;

async function addPunctuation(text) {
  const prompt = `Add sentence boundaries to this text. Insert periods, question marks, and exclamation marks at logical sentence boundaries. Fix capitalization. Do NOT change any words.

TEXT:
${text}`;

  return await callLLM(prompt, SYSTEM_PROMPT);
}

async function processWeek(videoId) {
  const sentencesPath = path.join(SENTENCES_DIR, `${videoId}.json`);
  if (!fs.existsSync(sentencesPath)) { log(`ERROR: ${sentencesPath} not found`); return false; }

  const data = JSON.parse(fs.readFileSync(sentencesPath, 'utf8'));
  if (!data.segments || data.segments.length === 0) { log(`ERROR: No segments in ${videoId}`); return false; }

  const unpunctuatedCount = data.segments.filter(s =>
    s.text && s.text.length > 10 && !/[.!?]"\s*$/.test(s.text.trim())
  ).length;

  if (unpunctuatedCount === 0) { log(`  ${videoId}: All punctuated — skipping`); return false; }

  log(`  ${videoId}: ${unpunctuatedCount}/${data.segments.length} unpunctuated — sending to LLM`);

  // Step 1: Combine ALL text into one string
  const combinedText = data.segments.map(s => s.text.trim()).filter(t => t.length > 0).join(' ');

  // Step 2: Send entire text to LLM ONCE
  const cleanedText = await addPunctuation(combinedText);
  log(`  LLM output: ${cleanedText.slice(0, 100)}...`);

  // Step 3: Split at new punctuation boundaries
  const sentences = cleanedText.split(/(?<=[.!?])\s+(?=[A-Za-z])/).filter(s => s.trim().length > 0);
  log(`  Split into ${sentences.length} sentences`);

  // Step 4: Map back to timestamps using word-position → time mapping
  const wordToTime = [];
  for (const seg of data.segments) {
    const words = seg.text.split(/\s+/);
    for (let w = 0; w < words.length; w++) {
      wordToTime.push(seg.start + (w / words.length) * seg.duration);
    }
  }

  let wordCursor = 0;
  const alignedSegments = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    const sentenceWords = sentence.split(/\s+/).length;
    const startIdx = Math.min(wordCursor, wordToTime.length - 1);
    const start = wordToTime[startIdx] || 0;
    const endIdx = Math.min(wordCursor + sentenceWords - 1, wordToTime.length - 1);
    const end = wordToTime[endIdx] || start + 2;
    const duration = Math.round((end - start) * 100) / 100;

    alignedSegments.push({
      id: i + 1,
      text: sentence,
      start: Math.round(start * 100) / 100,
      duration: Math.max(duration, 0.5)
    });
    wordCursor += sentenceWords;
  }

  // Save
  data.segments = alignedSegments;
  data.formatted = true;
  data.formattedAt = new Date().toISOString();
  fs.writeFileSync(sentencesPath, JSON.stringify(data, null, 2) + '\n');
  log(`  ${videoId}: ${alignedSegments.length} sentences`);

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
      if (await processWeek(file.replace('.json', ''))) processed++;
    }
    log(`Done: ${processed}/${files.length}`);
  } else {
    await processWeek(target);
  }
}

main().catch(err => { log(`FATAL: ${err.message}`); process.exit(1); });
