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
  console.error('❌ GOOGLE_API_KEY not found in environment!');
  process.exit(1);
}

async function fetchGoogleTTS(text, voice) {
  if (!text || !text.trim()) return Buffer.alloc(0);
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
    throw new Error(`TTS failed (${res.status}): ${errText}`);
  }

  const json = await res.json();
  return Buffer.from(json.audioContent, 'base64');
}

async function main() {
  console.log("Generating W34 Listening P4 Example Audio...");
  const p1 = await fetchGoogleTTS("Look at the example. Where did Milo the mouse run in the morning?", "en-US-Journey-D");
  await new Promise(r => setTimeout(r, 200));
  const p2 = await fetchGoogleTTS("He ran across the mossy rocks.", "en-US-Journey-F");
  await new Promise(r => setTimeout(r, 200));
  const p3 = await fetchGoogleTTS("Can you see the tick? Now you listen and tick the box.", "en-US-Journey-D");

  const combined = Buffer.concat([p1, p2, p3]);
  const outPath = path.join(rootDir, 'public/audio/week34/listening_p4_example.mp3');
  fs.writeFileSync(outPath, combined);
  console.log(`✓ Saved new listening_p4_example.mp3 (${combined.length} bytes) to ${outPath}`);
}

main().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
