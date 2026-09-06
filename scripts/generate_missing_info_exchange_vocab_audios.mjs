#!/usr/bin/env node
/**
 * Generate Missing Week 33 Audio Assets:
 * 1. Info Exchange Model Questions (5)
 * 2. Info Exchange Nova Replies (5)
 * 3. Info Exchange Table B Answers (5)
 * 4. Target Vocabulary Words (20)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || 'AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU';
const outputDir = path.join(rootDir, 'public/audio/week33');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const audiosToGenerate = [
  // 1. Info Exchange Model Questions (Card 2 / Table A)
  { name: 'info_exchange_a1_model.mp3', text: 'Where did Tom get injured? Or: Where did Jake help his friend?', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_a1_m1.mp3', text: 'Where did Tom get injured?', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_a1_m2.mp3', text: 'Where did Jake help his friend?', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_a2_model.mp3', text: 'What did Tom hurt?', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_a3_model.mp3', text: 'When did the accident happen?', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_a4_model.mp3', text: 'Who helped Tom?', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_a5_model.mp3', text: 'How does Tom feel now?', voice: 'en-US-Journey-F' },

  // 2. Info Exchange Nova Replies (Card 2 / Table A)
  { name: 'info_exchange_reply_1.mp3', text: 'Tom got injured in the main school corridor near the science lab, and Jake helped him there.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_reply_2.mp3', text: 'Tom hurt his right knee when he fell on the wet floor.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_reply_3.mp3', text: 'It happened this morning right after science class.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_reply_4.mp3', text: 'Jake stopped walking and called the school nurse right away.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_reply_5.mp3', text: 'Tom feels much better now and his knee is recovering well.', voice: 'en-US-Journey-F' },

  // 3. Info Exchange Table B Answers (Card 1 / Table B)
  { name: 'info_exchange_b1_answer.mp3', text: 'He helped his friend near the science room.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_b2_answer.mp3', text: 'The nurse used a clean bandage and a cold pack.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_b3_answer.mp3', text: 'Within two minutes.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_b4_answer.mp3', text: 'Because the floor was wet after cleaning.', voice: 'en-US-Journey-F' },
  { name: 'info_exchange_b5_answer.mp3', text: 'Walk carefully and never run in corridors.', voice: 'en-US-Journey-F' },

  // 4. Vocabulary Words (20 items)
  { name: 'vocab_corridor.mp3', text: 'corridor', voice: 'en-US-Journey-F' },
  { name: 'vocab_slipped.mp3', text: 'slipped', voice: 'en-US-Journey-F' },
  { name: 'vocab_nurse.mp3', text: 'nurse', voice: 'en-US-Journey-F' },
  { name: 'vocab_bandage.mp3', text: 'bandage', voice: 'en-US-Journey-F' },
  { name: 'vocab_safe.mp3', text: 'safe', voice: 'en-US-Journey-F' },
  { name: 'vocab_mistake.mp3', text: 'mistake', voice: 'en-US-Journey-F' },
  { name: 'vocab_accident.mp3', text: 'accident', voice: 'en-US-Journey-F' },
  { name: 'vocab_fix.mp3', text: 'fix', voice: 'en-US-Journey-F' },
  { name: 'vocab_sorry.mp3', text: 'sorry', voice: 'en-US-Journey-F' },
  { name: 'vocab_careful.mp3', text: 'careful', voice: 'en-US-Journey-F' },
  { name: 'vocab_clumsy.mp3', text: 'clumsy', voice: 'en-US-Journey-F' },
  { name: 'vocab_arm.mp3', text: 'arm', voice: 'en-US-Journey-F' },
  { name: 'vocab_knee.mp3', text: 'knee', voice: 'en-US-Journey-F' },
  { name: 'vocab_leg.mp3', text: 'leg', voice: 'en-US-Journey-F' },
  { name: 'vocab_head.mp3', text: 'head', voice: 'en-US-Journey-F' },
  { name: 'vocab_cold_pack.mp3', text: 'cold pack', voice: 'en-US-Journey-F' },
  { name: 'vocab_get_better.mp3', text: 'get better', voice: 'en-US-Journey-F' },
  { name: 'vocab_explain.mp3', text: 'explain', voice: 'en-US-Journey-F' },
  { name: 'vocab_lesson.mp3', text: 'lesson', voice: 'en-US-Journey-F' },
  { name: 'vocab_terrible.mp3', text: 'terrible', voice: 'en-US-Journey-F' },
];

async function synthesizeGoogleTTS(text, voiceName = 'en-US-Journey-F') {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;
  const isJourney = voiceName.includes('Journey');

  const payload = {
    input: { text },
    voice: {
      languageCode: 'en-US',
      name: voiceName,
      ssmlGender: voiceName.endsWith('-D') ? 'MALE' : 'FEMALE'
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: isJourney ? 0.90 : 0.88,
      pitch: isJourney ? 0.0 : -1.0,
      sampleRateHertz: 24000
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google TTS API HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  if (!data.audioContent) {
    throw new Error('Google TTS response missing audioContent');
  }

  return Buffer.from(data.audioContent, 'base64');
}

async function run() {
  console.log(`🚀 Synthesizing ${audiosToGenerate.length} Week 33 Audio Assets...`);

  let count = 0;
  for (const item of audiosToGenerate) {
    const dest = path.join(outputDir, item.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`   ⏭️ Exists: ${item.name} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
      continue;
    }
    console.log(`Generating ${item.name} (${item.voice}): "${item.text.substring(0, 35)}..."`);
    try {
      const buffer = await synthesizeGoogleTTS(item.text, item.voice);
      fs.writeFileSync(dest, buffer);
      count++;
      console.log(`   ✅ Saved ${item.name} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`   ❌ Failed to synthesize ${item.name}:`, err.message);
    }
  }

  console.log(`\n🎉 DONE! Generated ${count} audio files. Total assets present: ${fs.readdirSync(outputDir).length}`);
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
