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
  console.error('❌ No TTS API key found in environment.');
  process.exit(1);
}

const INTROS = [
  { id: 'exam_intro_L1', text: 'Listen and draw lines. There is one example.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_L2', text: 'Listen and write. There is one example.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_L3', text: 'Listen and write a letter in each box. There is one example.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_L4', text: 'Listen and tick the box. There is one example.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_L5', text: 'Listen and colour and write. There is one example.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_S1', text: 'Look at the two pictures. They are the same, but there are some differences. Tell me the differences.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_S2', text: 'Look at the questions. Ask and answer questions using the information cards.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_S3', text: 'Look at the pictures. They tell a story. Look at the pictures first and tell the story.', voice: 'en-US-Journey-F' },
  { id: 'exam_intro_S4', text: "Now let's talk about you and your daily life. Answer the questions.", voice: 'en-US-Journey-F' }
];

async function fetchGoogleTTS(text, voice) {
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
    const err = await res.text();
    throw new Error(`TTS Error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return Buffer.from(data.audioContent, 'base64');
}

async function main() {
  console.log('Generating Exam Intro Audio files for W33 & W34...');
  for (const week of [33, 34]) {
    const outDir = path.join(rootDir, `public/audio/week${week}`);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    for (const item of INTROS) {
      const outPath = path.join(outDir, `${item.id}.mp3`);
      console.log(`Generating [W${week}] ${item.id}.mp3: "${item.text}"`);
      const buf = await fetchGoogleTTS(item.text, item.voice);
      fs.writeFileSync(outPath, buf);
      await new Promise(r => setTimeout(r, 200));
    }
  }
  console.log('🎉 All Exam Intro Audio files generated successfully!');
}

main().catch(err => {
  console.error('Fatal TTS Generation Error:', err);
  process.exit(1);
});
