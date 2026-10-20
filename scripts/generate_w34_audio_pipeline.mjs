#!/usr/bin/env node
/**
 * scripts/generate_w34_audio_pipeline.mjs
 * Generates authoritative MP3 assets for Week 34:
 * 1. 20 Target Vocabulary MP3s (public/audio/week34/vocab_${word}.mp3)
 * 2. 8 Cambridge Dictation Dialogue MP3s (public/audio/week34/dictation_${id}.mp3)
 * 3. CLIL Article Audio (public/audio/week34/explore.mp3)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error('❌ FAIL: No Google Cloud TTS API key found in environment.');
  process.exit(1);
}

const OUT_DIR = path.join(rootDir, 'public/audio/week34');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function fetchGoogleTTSChunk(text, voice = 'en-US-Journey-F') {
  if (!text || text.trim().length === 0) return Buffer.alloc(0);
  await new Promise(r => setTimeout(r, 120)); // rate limiting
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: 'en-US', name: voice },
      audioConfig: { audioEncoding: 'MP3' }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Cloud TTS API ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return Buffer.from(data.audioContent, 'base64');
}

async function main() {
  console.log('🎙️ Starting Week 34 Audio Generation Pipeline...\n');

  // 1. Target Vocabulary (20 words)
  const vocabPath = path.join(rootDir, 'src/data/weeks/week_34/vocab.js');
  const vocabModule = await import(`file://${vocabPath}`);
  const vocabList = vocabModule.week34Vocab || vocabModule.vocabList || vocabModule.default;

  console.log('--- 1. Generating 20 Vocab Audio Files ---');
  for (const item of vocabList) {
    const word = item.word.toLowerCase();
    const outPath = path.join(OUT_DIR, `vocab_${word}.mp3`);
    console.log(`   🔊 Synthesizing vocab: "${word}" -> ${path.basename(outPath)}`);
    const buf = await fetchGoogleTTSChunk(word, 'en-US-Journey-F');
    fs.writeFileSync(outPath, buf);
  }

  // 2. Dictation (8 Dialogue Sentences)
  const dictationPath = path.join(rootDir, 'src/data/weeks/week_34/dictation.js');
  const dictationModule = await import(`file://${dictationPath}`);
  const dictationList = dictationModule.default || dictationModule.dictationData;

  console.log('\n--- 2. Generating 8 Dictation Audio Files ---');
  for (const item of dictationList) {
    const outPath = path.join(OUT_DIR, `dictation_${item.id}.mp3`);
    const voice = item.speaker === 'Miss Green' ? 'en-US-Neural2-F' : 'en-US-Journey-D';
    console.log(`   🗣️ Synthesizing dictation ${item.id} [${item.speaker}]: "${item.text}"`);
    const buf = await fetchGoogleTTSChunk(item.text, voice);
    fs.writeFileSync(outPath, buf);
  }

  // 3. CLIL Explore Audio
  const readingHubPath = path.join(rootDir, 'src/data/weeks/week_34/reading_hub.js');
  const rhModule = await import(`file://${readingHubPath}`);
  const rh = rhModule.readingHub || rhModule.default;
  const clilText = rh.clil_article?.content_en;

  if (clilText) {
    console.log('\n--- 3. Generating CLIL Article Explore Audio ---');
    const outPath = path.join(OUT_DIR, 'explore.mp3');
    console.log(`   📖 Synthesizing CLIL Explore (${clilText.split(/\s+/).length} words)...`);
    const buf = await fetchGoogleTTSChunk(clilText, 'en-US-Journey-F');
    fs.writeFileSync(outPath, buf);
  }

  console.log('\n✅ Week 34 Audio Generation Pipeline Complete!');
}

main().catch(err => {
  console.error('\n❌ Audio Pipeline Error:', err);
  process.exit(1);
});
