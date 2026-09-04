#!/usr/bin/env node
/**
 * scripts/generate_w33_story_audios.mjs
 * 
 * Generates authoritative audio assets for Week 33 Story World:
 * 1. read_stem.mp3 (Full STEM Story from read.js)
 * 2. shadowing_1.mp3 -> shadowing_8.mp3 (8 sentences from shadowing.js)
 * 3. scene_1.mp3 -> scene_5.mp3 (5 Scene Explorer scene narratives from read.js)
 *
 * Voice: en-US-Journey-F (speakingRate: 0.90, pitch: 0.0)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY || 'AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU';
const outputDir = path.join(rootDir, 'public/audio/week33');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Import data dynamically
import readData from '../src/data/weeks/week_33/read.js';
import shadowingData from '../src/data/weeks/week_33/shadowing.js';

async function synthesizeGoogleTTS(text, voiceName = 'en-US-Journey-F') {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;
  const isJourney = voiceName.includes('Journey');
  
  const payload = {
    input: { text },
    voice: {
      languageCode: 'en-US',
      name: voiceName,
      ssmlGender: 'FEMALE'
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
  console.log('🚀 Generating Week 33 Story & Shadowing Audio Assets...');

  // 1. Full story audio (read_stem.mp3)
  const fullStoryText = readData.content_en || readData.text_en;
  console.log(`\n📖 1. Generating Full Story Audio (read_stem.mp3):`);
  console.log(`   "${fullStoryText.substring(0, 70)}..."`);
  const fullStoryBuf = await synthesizeGoogleTTS(fullStoryText);
  const fullStoryDest = path.join(outputDir, 'read_stem.mp3');
  fs.writeFileSync(fullStoryDest, fullStoryBuf);
  console.log(`   ✅ Saved ${fullStoryDest} (${(fullStoryBuf.length / 1024).toFixed(1)} KB)`);

  // 2. Shadowing sentences 1 to 8
  console.log(`\n🎙️ 2. Generating Shadowing Sentences (shadowing_1.mp3 -> shadowing_8.mp3):`);
  for (const item of shadowingData.sentences) {
    const filename = `shadowing_${item.id}.mp3`;
    const dest = path.join(outputDir, filename);
    console.log(`   [Sentence ${item.id}] "${item.text}"`);
    const buffer = await synthesizeGoogleTTS(item.text);
    fs.writeFileSync(dest, buffer);
    console.log(`      ✅ Saved ${dest} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  // 3. Scene Explorer scenes 1 to 5
  console.log(`\n🖼️ 3. Generating Scene Explorer Audios (scene_1.mp3 -> scene_5.mp3):`);
  for (let i = 0; i < readData.story_scenes.length; i++) {
    const scene = readData.story_scenes[i];
    const sceneNum = scene.scene_number || (i + 1);
    const cleanText = (scene.narration_en || scene.description_en || scene.description || '')
      .replace(/\*\*/g, '')
      .trim();
    const filename = `scene_${sceneNum}.mp3`;
    const dest = path.join(outputDir, filename);
    console.log(`   [Scene ${sceneNum}] "${cleanText}"`);
    const buffer = await synthesizeGoogleTTS(cleanText);
    fs.writeFileSync(dest, buffer);
    console.log(`      ✅ Saved ${dest} (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('\n🎉 ALL AUDIO ASSETS SUCCESSFULLY GENERATED & VALIDATED!');
}

run().catch(err => {
  console.error('❌ Error generating audios:', err);
  process.exit(1);
});
