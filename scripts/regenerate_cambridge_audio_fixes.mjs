import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY;

if (!GOOGLE_API_KEY) {
  console.error('❌ GOOGLE_API_KEY not found in environment!');
  process.exit(1);
}

function getVoiceForSpeaker(speaker) {
  switch (speaker?.toLowerCase()) {
    case 'boy':
    case 'jake':
    case 'tom':
    case 'milo':
      return 'en-US-Journey-D'; // Young male
    case 'man':
    case 'headmaster':
    case 'cleaner':
      return 'en-US-Neural2-D'; // Adult baritone male
    case 'woman':
    case 'nurse':
    case 'teacher':
      return 'en-US-Neural2-F'; // Adult gentle female
    case 'girl':
    case 'mia':
    case 'emma':
      return 'en-US-Journey-F'; // Young female
    case 'nova':
    case 'narrator':
    default:
      return 'en-US-Journey-F'; // Narrator
  }
}

async function fetchGoogleTTS(text, voice) {
  if (!text || !text.trim()) return Buffer.alloc(0);
  await new Promise(r => setTimeout(r, 120)); // throttle
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
    throw new Error(`Google TTS error HTTP ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return Buffer.from(data.audioContent, 'base64');
}

function parseDialogue(rawText) {
  const speakerPattern = /(Nova|Narrator|Girl|Boy|Man|Woman|Teacher|Nurse|Headmaster|Cleaner|Jake|Tom|Mia|Emma):\s*/gi;
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

async function synthesizeDialogueMP3(scriptText, outFilePath) {
  const lines = parseDialogue(scriptText);
  const chunks = [];
  for (const line of lines) {
    const voice = getVoiceForSpeaker(line.speaker);
    const buf = await fetchGoogleTTS(line.text, voice);
    chunks.push(buf);
  }
  const full = Buffer.concat(chunks);
  fs.mkdirSync(path.dirname(outFilePath), { recursive: true });
  fs.writeFileSync(outFilePath, full);
  return full;
}

async function synthesizeSingleMP3(text, voice, outFilePath) {
  const buf = await fetchGoogleTTS(text, voice);
  fs.mkdirSync(path.dirname(outFilePath), { recursive: true });
  fs.writeFileSync(outFilePath, buf);
  return buf;
}

function computeSha256(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

async function main() {
  console.log('========================================================================');
  console.log('🎙️ REGENERATING CAMBRIDGE AUDIO FIXES (W33 + W34)');
  console.log('========================================================================\n');

  // Load hub data
  const { listeningHub: w33Listening } = await import('../src/data/weeks/week_33/listening_hub.js');
  const { listeningHub: w34Listening } = await import('../src/data/weeks/week_34/listening_hub.js');
  const { readData: w34Read } = await import('../src/data/weeks/week_34/read.js');

  const filesToGen = [
    // W33
    {
      week: 33,
      name: 'listening_p1_full.mp3',
      type: 'dialogue',
      script: w33Listening.listening_p1.passage_audio_script
    },
    {
      week: 33,
      name: 'listening_p4_q1.mp3',
      type: 'dialogue',
      script: `${w33Listening.listening_p4.questions[0].audio_script}\n${w33Listening.listening_p4.questions[1].audio_script}`
    },
    {
      week: 33,
      name: 'listening_p4_q2.mp3',
      type: 'dialogue',
      script: w33Listening.listening_p4.questions[2].audio_script
    },
    {
      week: 33,
      name: 'listening_p4_q3.mp3',
      type: 'dialogue',
      script: w33Listening.listening_p4.questions[3].audio_script
    },
    {
      week: 33,
      name: 'listening_p4_q4.mp3',
      type: 'dialogue',
      script: w33Listening.listening_p4.questions[4].audio_script
    },
    {
      week: 33,
      name: 'listening_p4_q5.mp3',
      type: 'dialogue',
      script: w33Listening.listening_p4.questions[5].audio_script
    },
    {
      week: 33,
      name: 'listening_p5_full.mp3',
      type: 'dialogue',
      script: w33Listening.listening_p5.audio_script
    },
    // W34
    {
      week: 34,
      name: 'listening_p1_full.mp3',
      type: 'dialogue',
      script: w34Listening.listening_p1.passage_audio_script
    },
    {
      week: 34,
      name: 'listening_p4_q1.mp3',
      type: 'dialogue',
      script: `${w34Listening.listening_p4.questions[0].audio_script}\n${w34Listening.listening_p4.questions[1].audio_script}`
    },
    {
      week: 34,
      name: 'listening_p4_q2.mp3',
      type: 'dialogue',
      script: w34Listening.listening_p4.questions[2].audio_script
    },
    {
      week: 34,
      name: 'listening_p4_q3.mp3',
      type: 'dialogue',
      script: w34Listening.listening_p4.questions[3].audio_script
    },
    {
      week: 34,
      name: 'listening_p4_q4.mp3',
      type: 'dialogue',
      script: w34Listening.listening_p4.questions[4].audio_script
    },
    {
      week: 34,
      name: 'listening_p4_q5.mp3',
      type: 'dialogue',
      script: w34Listening.listening_p4.questions[5].audio_script
    },
    {
      week: 34,
      name: 'listening_p5_full.mp3',
      type: 'dialogue',
      script: w34Listening.listening_p5.audio_script
    },
    {
      week: 34,
      name: 'read_stem.mp3',
      type: 'single',
      voice: 'en-US-Journey-F',
      script: w34Read.text_en || w34Read.content_en
    }
  ];

  const results = [];

  for (let i = 0; i < filesToGen.length; i++) {
    const item = filesToGen[i];
    const outPath = path.join(rootDir, `public/audio/week${item.week}/${item.name}`);
    console.log(`[${i + 1}/${filesToGen.length}] Synthesizing Week ${item.week} -> ${item.name}...`);
    
    if (item.type === 'dialogue') {
      await synthesizeDialogueMP3(item.script, outPath);
    } else {
      await synthesizeSingleMP3(item.script, item.voice, outPath);
    }

    const stat = fs.statSync(outPath);
    const sha = computeSha256(outPath);
    console.log(`   ✅ Generated (${stat.size} bytes) | SHA256: ${sha.substring(0, 16)}...`);
    results.push({
      week: item.week,
      file: item.name,
      relPath: `public/audio/week${item.week}/${item.name}`,
      cdnUrl: `https://pub-8f917d02000c4be2a7214afb8d12abd3.r2.dev/audio/week${item.week}/${item.name}`,
      size: stat.size,
      sha256: sha
    });
  }

  console.log('\n========================================================================');
  console.log('📋 SUMMARY TABLE — 15 REGENERATED AUDIO FILES:');
  console.log('========================================================================');
  console.log('| Week | File | Size | SHA256 |');
  console.log('|---|---|---|---|');
  for (const r of results) {
    console.log(`| W${r.week} | \`${r.file}\` | ${r.size} B | \`${r.sha256}\` |`);
  }

  // Save report to docs
  const reportPath = path.join(rootDir, 'docs/audio_regeneration_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n📄 Saved report: ${reportPath}`);
}

main().catch(err => {
  console.error('❌ Regeneration failed:', err);
  process.exit(1);
});
