import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetWeek = parseInt(process.argv[2] || '34', 10);
const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY;
if (!GOOGLE_API_KEY) {
  console.error('❌ No TTS API key found in environment.');
  process.exit(1);
}
const OUTPUT_DIR = path.resolve(__dirname, `../public/audio/week${targetWeek}`);
const WEEK_DATA_DIR = path.resolve(__dirname, `../src/data/weeks/week_${targetWeek}`);

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getVoiceForSpeaker(speaker) {
  switch (speaker?.toLowerCase()) {
    case 'boy':
    case 'jake':
    case 'tom':
    case 'oliver':
    case 'harry':
    case 'jack':
      return 'en-US-Journey-D'; // Young energetic male
    case 'man':
    case 'headmaster':
    case 'uncle robert':
    case 'dad':
      return 'en-US-Neural2-D'; // Adult baritone male
    case 'woman':
    case 'nurse':
    case 'teacher':
    case 'mrs. wilson':
    case 'aunt sarah':
    case 'emma':
      return 'en-US-Neural2-F'; // Adult gentle female
    case 'girl':
    case 'mia':
    case 'lily':
      return 'en-US-Journey-F'; // Young female
    case 'nova':
    default:
      return 'en-US-Journey-F'; // Narrator
  }
}

async function fetchGoogleTTSChunk(text, voice) {
  if (!text || text.trim().length === 0) return Buffer.alloc(0);
  await new Promise(r => setTimeout(r, 100)); // Rate-limit throttle
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
  const speakerPattern = /(Nova|Girl|Boy|Man|Woman|Teacher|Nurse|Headmaster|Jake|Tom|Oliver|Lily|Harry|Jack|Emma):\s*/gi;
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
  if (!scriptText) return;
  if (fs.existsSync(outFilePath) && fs.statSync(outFilePath).size > 1000) {
    console.log(`   ⏭️ Skipping existing: ${path.basename(outFilePath)}`);
    return;
  }
  const lines = parseDialogue(scriptText);
  const chunks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const voice = getVoiceForSpeaker(line.speaker);
    const buffer = await fetchGoogleTTSChunk(line.text, voice);
    chunks.push(buffer);
  }

  const fullBuffer = Buffer.concat(chunks);
  fs.writeFileSync(outFilePath, fullBuffer);
  console.log(`   ✅ Saved: ${path.basename(outFilePath)} (${fullBuffer.length} bytes)`);
}

async function generateSingleMP3(text, voice, outFilePath) {
  if (!text) return;
  if (fs.existsSync(outFilePath) && fs.statSync(outFilePath).size > 1000) {
    console.log(`   ⏭️ Skipping existing: ${path.basename(outFilePath)}`);
    return;
  }
  const buffer = await fetchGoogleTTSChunk(text, voice);
  fs.writeFileSync(outFilePath, buffer);
  console.log(`   ✅ Saved: ${path.basename(outFilePath)} (${buffer.length} bytes)`);
}

async function main() {
  console.log(`🎙️ Starting Universal Audio Generation for Week ${targetWeek}...`);

  // Load modules dynamically
  const listeningHubPath = path.join(WEEK_DATA_DIR, 'listening_hub.js');
  const readingHubPath = path.join(WEEK_DATA_DIR, 'reading_hub.js');
  const dictationPath = path.join(WEEK_DATA_DIR, 'dictation.js');
  const explorePath = path.join(WEEK_DATA_DIR, 'explore.js');
  const readPath = path.join(WEEK_DATA_DIR, 'read.js');

  const readingRaw = fs.existsSync(readingHubPath) ? await import(pathToFileURL(readingHubPath).href) : {};
  const readingMod = readingRaw.default || readingRaw.readingHub || readingRaw;

  // --- 0. Generating Shadowing Sentences ---
  console.log('\n--- 0. Generating Shadowing Audios ---');
  const sentences = readingMod.shadowingData?.sentences || [];
  for (let sIdx = 0; sIdx < sentences.length; sIdx++) {
    const s = sentences[sIdx];
    const sFile = path.join(OUTPUT_DIR, `shadowing_${s.id || sIdx + 1}.mp3`);
    await generateSingleMP3(s.text, 'en-US-Journey-F', sFile);
  }

  const listeningRaw = fs.existsSync(listeningHubPath) ? await import(pathToFileURL(listeningHubPath).href) : {};
  const listeningMod = listeningRaw.default || listeningRaw.listeningHubData || listeningRaw;

  const dictationRaw = fs.existsSync(dictationPath) ? await import(pathToFileURL(dictationPath).href) : {};
  const dictationMod = dictationRaw.default || dictationRaw.dictationData || dictationRaw;

  const exploreRaw = fs.existsSync(explorePath) ? await import(pathToFileURL(explorePath).href) : {};
  const exploreMod = exploreRaw.default || exploreRaw.exploreData || exploreRaw;

  const readRaw = fs.existsSync(readPath) ? await import(pathToFileURL(readPath).href) : {};
  const readMod = readRaw.default || readRaw.readData || readRaw;

  // 1. Dictation files (1-5)
  if (Array.isArray(dictationMod)) {
    console.log('\n--- 1. Generating Dictation Audios ---');
    for (const d of dictationMod) {
      const fileName = path.basename(d.audio_url || `dictation_${d.id}.mp3`);
      await generateSingleMP3(d.text, 'en-US-Neural2-F', path.join(OUTPUT_DIR, fileName));
    }
  }

  // 2. Explore & CLIL audio
  if (exploreMod && exploreMod.content_en) {
    console.log('\n--- 2. Generating Explore / CLIL Audio ---');
    await generateSingleMP3(exploreMod.content_en, 'en-US-Journey-F', path.join(OUTPUT_DIR, 'explore.mp3'));
  }

  // 3. Main Reading / Story audio
  if (readMod && (readMod.text_en || readMod.text)) {
    console.log('\n--- 3. Generating Main Story Audio ---');
    const storyText = (readMod.text_en || readMod.text).substring(0, 800);
    await generateSingleMP3(storyText, 'en-US-Journey-F', path.join(OUTPUT_DIR, 'read_stem.mp3'));
  }

  // 4. Cambridge Listening Hub Parts
  if (listeningMod) {
    console.log('\n--- 4. Generating Cambridge Listening Parts ---');
    
    // Part 1 Full
    if (listeningMod.listening_p1?.passage_audio_script) {
      await generateCompositeMP3(listeningMod.listening_p1.passage_audio_script, path.join(OUTPUT_DIR, 'listening_p1_full.mp3'));
    }

    // Part 2 Full
    if (Array.isArray(listeningMod.listening_p2_notes)) {
      const p2Script = listeningMod.listening_p2_notes.map(n => `Teacher: ${n.label}\nStudent: ${n.audio_text}`).join('\n');
      await generateCompositeMP3(p2Script, path.join(OUTPUT_DIR, 'listening_p2_full.mp3'));
    }

    // Part 3 Full & Per-Item
    if (listeningMod.listening_p3?.passage_audio_script) {
      await generateCompositeMP3(listeningMod.listening_p3.passage_audio_script, path.join(OUTPUT_DIR, 'listening_p3_full.mp3'));
    }
    if (Array.isArray(listeningMod.listening_p3?.items)) {
      for (const item of listeningMod.listening_p3.items) {
        if (item.audio_text && item.audio_url) {
          const fileName = path.basename(item.audio_url);
          await generateCompositeMP3(item.audio_text, path.join(OUTPUT_DIR, fileName));
        }
      }
    }

    // Part 4 Questions
    if (Array.isArray(listeningMod.listening_p4_questions)) {
      for (const q of listeningMod.listening_p4_questions) {
        if (q.audio_text) {
          const fileName = `listening_p4_q${q.id}.mp3`;
          await generateCompositeMP3(q.audio_text, path.join(OUTPUT_DIR, fileName));
        }
      }
    }

    // Part 5 Instructions
    if (listeningMod.listening_p5?.instructions) {
      const p5Script = listeningMod.listening_p5.instructions.map(inst => `Nova: ${inst.audio_text}`).join('\n');
      await generateCompositeMP3(p5Script, path.join(OUTPUT_DIR, 'listening_p5_full.mp3'));
      for (const inst of listeningMod.listening_p5.instructions) {
        const fileName = `listening_p5_inst${inst.id}.mp3`;
        await generateCompositeMP3(inst.audio_text, path.join(OUTPUT_DIR, fileName));
      }
    }
  }

  const generatedCount = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.mp3')).length;
  console.log(`\n🎉 Generated ${generatedCount} MP3 files in public/audio/week${targetWeek}/!`);
}

main().catch(err => {
  console.error('❌ Audio generation failed:', err);
  process.exit(1);
});
