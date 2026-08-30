import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { listeningHubData } from '../src/data/weeks/week_33/listening_hub.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error('❌ No TTS API key found in environment.');
  process.exit(1);
}
const OUTPUT_DIR = path.resolve(__dirname, '../public/audio/week33');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getVoiceForSpeaker(speaker) {
  switch (speaker.toLowerCase()) {
    case 'boy':
    case 'jake':
    case 'tom':
      return 'en-US-Journey-D'; // Young energetic male voice
    case 'man':
    case 'headmaster':
      return 'en-US-Neural2-D'; // Adult baritone male voice
    case 'woman':
    case 'nurse':
    case 'teacher':
    case 'mrs. wilson':
      return 'en-US-Neural2-F'; // Adult gentle female voice
    case 'girl':
    case 'mia':
      return 'en-US-Journey-F'; // Young female voice
    case 'nova':
    default:
      return 'en-US-Journey-F'; // Host / Narrator
  }
}

async function fetchGoogleTTSChunk(text, voice) {
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

function parseDialogue(rawText) {
  const speakerPattern = /(Nova|Girl|Boy|Man|Woman|Teacher|Nurse|Headmaster|Jake|Tom):\s*/gi;
  const tagMatches = [...rawText.matchAll(speakerPattern)];
  const lines = [];

  if (tagMatches.length > 0) {
    if (tagMatches[0].index > 0) {
      const intro = rawText.substring(0, tagMatches[0].index).trim();
      if (intro) lines.push({ speaker: 'nova', text: intro });
    }

    for (let i = 0; i < tagMatches.length; i++) {
      const currentMatch = tagMatches[i];
      const speaker = currentMatch[1].toLowerCase();
      const startPos = currentMatch.index + currentMatch[0].length;
      const endPos = (i + 1 < tagMatches.length) ? tagMatches[i + 1].index : rawText.length;
      const speechContent = rawText.substring(startPos, endPos).trim();
      if (speechContent) lines.push({ speaker, text: speechContent });
    }
  } else {
    lines.push({ speaker: 'nova', text: rawText });
  }
  return lines;
}

async function generateCompositeMP3(scriptText, outFilePath) {
  const lines = parseDialogue(scriptText);
  const chunks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const voice = getVoiceForSpeaker(line.speaker);
    console.log(`   [Line ${i+1}/${lines.length}] ${line.speaker.toUpperCase()} (${voice}) -> "${line.text.substring(0, 40)}..."`);
    const buffer = await fetchGoogleTTSChunk(line.text, voice);
    chunks.push(buffer);
  }

  const fullBuffer = Buffer.concat(chunks);
  fs.writeFileSync(outFilePath, fullBuffer);
  console.log(`✅ Saved: ${outFilePath} (${fullBuffer.length} bytes)\n`);
}

async function main() {
  console.log('🎙️ Starting Full Week 33 Cambridge Audio Generation...');

  // 1. Listening Part 1 Full Dialogue
  console.log('\n--- 1. Generating Listening Part 1 Full Audio ---');
  await generateCompositeMP3(
    listeningHubData.listening_p1.passage_audio_script,
    path.join(OUTPUT_DIR, 'listening_p1_full.mp3')
  );

  // 2. Listening Part 3 Full Dialogue
  console.log('\n--- 2. Generating Listening Part 3 Full Audio ---');
  await generateCompositeMP3(
    listeningHubData.listening_p3.passage_audio_script,
    path.join(OUTPUT_DIR, 'listening_p3_full.mp3')
  );

  // 3. Listening Part 3 Per-Item Dialogues
  console.log('\n--- 3. Generating Listening Part 3 Item Audios ---');
  for (const item of listeningHubData.listening_p3.items) {
    const fileName = path.basename(item.audio_url);
    await generateCompositeMP3(item.audio_text, path.join(OUTPUT_DIR, fileName));
  }

  // 4. Listening Part 4 Questions Dialogues (with Distractors)
  console.log('\n--- 4. Generating Listening Part 4 Question Audios ---');
  for (const q of listeningHubData.listening_p4_questions) {
    const fileName = path.basename(q.audio_url);
    await generateCompositeMP3(q.audio_script, path.join(OUTPUT_DIR, fileName));
  }

  // 5. Listening Part 5 Full Dialogue
  console.log('\n--- 5. Generating Listening Part 5 Full Audio ---');
  await generateCompositeMP3(
    listeningHubData.listening_p5.audio_script,
    path.join(OUTPUT_DIR, 'listening_p5_full.mp3')
  );

  console.log('\n🎉 ALL Week 33 Cambridge Audio MP3 files successfully generated in public/audio/week33/!');
}

main().catch(err => {
  console.error('❌ Audio generation failed:', err);
  process.exit(1);
});
