import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const GOOGLE_API_KEY = process.env.GOOGLE_TTS_API_KEY || "AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU";

const PART1_SCRIPT_LINES = [
  { speaker: 'nova', text: 'Look at Part 1. Listen and draw lines.' },
  { speaker: 'girl', text: 'Look at that boy in the corridor! Is he running?' },
  { speaker: 'man', text: 'No, the boy slipping on the wet floor in the red shirt is Tom! Look at the boy walking carefully in the blue shirt.' },
  { speaker: 'girl', text: 'Oh, I see him now. Is that Jake?' },
  { speaker: 'man', text: "Yes, that's right. Jake is walking carefully." },
  { speaker: 'girl', text: 'Who is the lady in the white uniform carrying a bandage?' },
  { speaker: 'man', text: "That's the school nurse! She is rushing to help Tom." },
  { speaker: 'girl', text: 'And who is the tall man in the blue suit talking to students?' },
  { speaker: 'man', text: "That's the headmaster. He is making sure everyone stays safe." },
  { speaker: 'girl', text: 'Look at the girl near the yellow wet floor sign holding a mop.' },
  { speaker: 'man', text: "Ah, that's Mia. She is cleaning the wet floor so nobody else falls." }
];

const VOICE_MAP = {
  nova: { name: 'en-US-Journey-F', rate: 1.0 },
  girl: { name: 'en-US-Journey-F', rate: 1.05 },
  man: { name: 'en-US-Neural2-D', rate: 0.98 }
};

async function synthesizeGoogleTTS(text, voiceName, speakingRate = 1.0) {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: 'en-US', name: voiceName },
      audioConfig: { audioEncoding: 'MP3', speakingRate }
    })
  });
  if (!resp.ok) {
    throw new Error(`Google TTS API error: ${resp.status} ${resp.statusText}`);
  }
  const data = await resp.json();
  return Buffer.from(data.audioContent, 'base64');
}

async function main() {
  const outputDir = path.join(ROOT, 'public', 'audio', 'week33');
  fs.mkdirSync(outputDir, { recursive: true });
  const tempDir = path.join(outputDir, 'temp_p1');
  fs.mkdirSync(tempDir, { recursive: true });

  console.log(`🎙️ Generating Multi-Voice Dialogue MP3 for Listening Part 1...`);

  const lineFiles = [];
  for (let i = 0; i < PART1_SCRIPT_LINES.length; i++) {
    const line = PART1_SCRIPT_LINES[i];
    const profile = VOICE_MAP[line.speaker] || VOICE_MAP.girl;
    console.log(`   [Line ${i + 1}/${PART1_SCRIPT_LINES.length}] ${line.speaker.toUpperCase()} (${profile.name}) -> "${line.text}"`);

    const audioBuf = await synthesizeGoogleTTS(line.text, profile.name, profile.rate);
    const lineFile = path.join(tempDir, `p1_line_${i + 1}.mp3`);
    fs.writeFileSync(lineFile, audioBuf);
    lineFiles.push(lineFile);
  }

  // Create silence audio file (350ms) using ffmpeg
  const silenceFile = path.join(tempDir, 'silence.mp3');
  execSync(`ffmpeg -y -f lavfi -i anullsrc=r=24000:cl=mono -t 0.35 -q:a 9 "${silenceFile}"`, { stdio: 'ignore' });

  // Build ffmpeg concat list
  const concatListFile = path.join(tempDir, 'p1_concat.txt');
  let concatContent = '';
  for (let i = 0; i < lineFiles.length; i++) {
    concatContent += `file '${lineFiles[i]}'\n`;
    if (i < lineFiles.length - 1) {
      concatContent += `file '${silenceFile}'\n`;
    }
  }
  fs.writeFileSync(concatListFile, concatContent);

  // Concat into final MP3
  const finalFile = path.join(outputDir, 'listening_p1_full.mp3');
  execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c copy "${finalFile}"`, { stdio: 'ignore' });
  console.log(`\n✅ Created composite multi-voice Listening Part 1 MP3: ${finalFile} (${fs.statSync(finalFile).size} bytes)`);

  // Cleanup temp files
  fs.rmSync(tempDir, { recursive: true, force: true });
}

main().catch(err => {
  console.error("❌ Error generating Part 1 audio:", err);
  process.exit(1);
});
