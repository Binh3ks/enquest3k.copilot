#!/usr/bin/env node
/**
 * Generate Missing Week 33 Audio Files via Google Cloud TTS Direct
 * 
 * 1. public/audio/week33/shadowing_1.mp3 -> shadowing_8.mp3 (Voice: en-US-Journey-F)
 * 2. public/audio/week33/clil_friction_p1.mp3 (Part 1, Voice: en-US-Journey-F)
 * 3. public/audio/week33/clil_friction_p2.mp3 (Part 2, Voice: en-US-Journey-F)
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

const shadowingSentences = [
  { id: 1, text: "Jake was walking carefully down the school corridor after science class." },
  { id: 2, text: "Suddenly, a boy running fast slipped on the wet floor and fell down heavily." },
  { id: 3, text: "He hurt his knee and lost his balance completely." },
  { id: 4, text: "Jake stopped immediately to help his friend stay calm." },
  { id: 5, text: "He called the school nurse right away." },
  { id: 6, text: "The nurse arrived quickly with a clean bandage and a cold pack to treat the cut." },
  { id: 7, text: "Everyone felt relieved and praised Jake for following safety rules." },
  { id: 8, text: "The headmaster reminded all students never to run in corridors." }
];

const clilParts = [
  {
    name: 'clil_friction_p1.mp3',
    text: "Did you ever wonder why wet floors turn into ice rinks? The secret is an invisible science force called friction! Friction is the friendly grip between your shoe soles and the floor that stops you from sliding. When you walk on dry, smooth tiles, your shoes grip firmly and your body stays balanced. But when water spills, it spreads out into a thin slippery layer. This water layer reduces friction, turning safe floors into a slippery slide!"
  },
  {
    name: 'clil_friction_p2.mp3',
    text: "This morning in our school corridor, Tom was running in a big hurry to science class. Suddenly—whoosh! He slipped on the wet tiles because his old sneakers had smooth plastic soles with no grip! Luckily, Jake was walking carefully nearby. When Jake rushed to help Tom up, he noticed something amazing: his own rubber soles gripped the floor tightly without sliding at all! The school nurse smiled and pointed to the bright yellow warning sign: \"Tom, rubber gives a strong grip, but water always steals your friction!\" Tom rubbed his sore knee and laughed, \"From now on, I will walk like a smart scientist!\""
  },
  {
    name: 'clil_friction.mp3',
    text: "Did you ever wonder why wet floors turn into ice rinks? The secret is an invisible science force called friction! Friction is the friendly grip between your shoe soles and the floor that stops you from sliding. When you walk on dry, smooth tiles, your shoes grip firmly and your body stays balanced. But when water spills, it spreads out into a thin slippery layer. This water layer reduces friction, turning safe floors into a slippery slide!\n\nThis morning in our school corridor, Tom was running in a big hurry to science class. Suddenly—whoosh! He slipped on the wet tiles because his old sneakers had smooth plastic soles with no grip! Luckily, Jake was walking carefully nearby. When Jake rushed to help Tom up, he noticed something amazing: his own rubber soles gripped the floor tightly without sliding at all! The school nurse smiled and pointed to the bright yellow warning sign: \"Tom, rubber gives a strong grip, but water always steals your friction!\" Tom rubbed his sore knee and laughed, \"From now on, I will walk like a smart scientist!\""
  }
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
  console.log('🚀 Generating Week 33 Pre-generated MP3 Audio Assets...');
  
  // 1. Shadowing 1-8
  for (const item of shadowingSentences) {
    const filename = `shadowing_${item.id}.mp3`;
    const dest = path.join(outputDir, filename);
    console.log(`Generating ${filename}: "${item.text.substring(0, 40)}..."`);
    const buffer = await synthesizeGoogleTTS(item.text, 'en-US-Journey-F');
    fs.writeFileSync(dest, buffer);
    console.log(`   ✅ Saved ${dest} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  // 2. CLIL Parts 1 and 2
  for (const item of clilParts) {
    const dest = path.join(outputDir, item.name);
    console.log(`Generating ${item.name}...`);
    const buffer = await synthesizeGoogleTTS(item.text, 'en-US-Journey-F');
    fs.writeFileSync(dest, buffer);
    console.log(`   ✅ Saved ${dest} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('\n🎉 ALL 10 PRE-GENERATED MP3 FILES SUCCESSFULLY CREATED!');
}

run().catch(err => {
  console.error('❌ Error generating audios:', err);
  process.exit(1);
});
