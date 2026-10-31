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

async function fetchGoogleTTS(text, voice = 'en-US-Journey-F', retries = 3) {
  if (!text || !text.trim()) return Buffer.alloc(0);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
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
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`Retry ${attempt} for voice ${voice}: ${err.message}`);
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
}

async function synthesizeDialogue(lines) {
  const buffers = [];
  for (const line of lines) {
    const buf = await fetchGoogleTTS(line.text, line.voice);
    buffers.push(buf);
    await new Promise(r => setTimeout(r, 200));
  }
  return Buffer.concat(buffers);
}

async function main() {
  console.log("🎙️ Synthesizing Week 34 Listening Part 3 Audio Files...");
  const audioDir = path.join(rootDir, 'public/audio/week34');
  if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

  const tasks = [
    {
      file: 'listening_p3_example.mp3',
      lines: [
        { voice: 'en-US-Journey-F', text: 'Look at the example. Where did Uncle Robert leave his binoculars?' },
        { voice: 'en-US-Journey-F', text: 'Uncle Robert, did you find your binoculars?' },
        { voice: 'en-US-Journey-D', text: 'Yes, I climbed up the wooden tower near the forest edge to watch some birds, and I left them on the railing up there!' },
        { voice: 'en-US-Journey-F', text: 'Can you see the letter H? Now you listen and write a letter in each box.' }
      ]
    },
    {
      file: 'listening_p3_item1.mp3',
      lines: [
        { voice: 'en-US-Journey-F', text: 'What about the wooden trap?' },
        { voice: 'en-US-Journey-D', text: 'We brought the wooden trap into the big forest clearing where the tall grass grows, but we decided not to set it. So it is still lying in the forest clearing.' }
      ]
    },
    {
      file: 'listening_p3_item2.mp3',
      lines: [
        { voice: 'en-US-Journey-F', text: 'Did you take the thick rope with you?' },
        { voice: 'en-US-Journey-D', text: 'No, I left the thick rope hanging by the wooden gate at the hunter camp. You can see it if you walk into the hunter camp.' }
      ]
    },
    {
      file: 'listening_p3_item3.mp3',
      lines: [
        { voice: 'en-US-Journey-F', text: 'And where is our forest map?' },
        { voice: 'en-US-Journey-D', text: 'It started raining earlier, so I rolled up the forest map and tucked it inside a dry tree hollow near the ancient mossy tree.' }
      ]
    },
    {
      file: 'listening_p3_item4.mp3',
      lines: [
        { voice: 'en-US-Journey-F', text: 'I am thirsty, Uncle Robert. Where is the water bottle?' },
        { voice: 'en-US-Journey-D', text: 'Oh, I sat down on a flat stone at the riverbank to wash my boots, and I left the blue water bottle right there on the riverbank.' }
      ]
    },
    {
      file: 'listening_p3_item5.mp3',
      lines: [
        { voice: 'en-US-Journey-F', text: 'We need our compass to find the north path!' },
        { voice: 'en-US-Journey-D', text: "Don't worry, the compass is on top of the big lookout rock. I checked our direction there this morning and forgot to put it back in my pocket!" }
      ]
    }
  ];

  const generatedBuffers = [];

  for (const t of tasks) {
    const outPath = path.join(audioDir, t.file);
    console.log(`Generating ${t.file}...`);
    const buf = await synthesizeDialogue(t.lines);
    fs.writeFileSync(outPath, buf);
    console.log(`✓ Saved ${t.file} (${buf.length} bytes)`);
    generatedBuffers.push(buf);
  }

  // Create listening_p3_full.mp3 combining all of them with short silence gaps
  console.log("Generating listening_p3_full.mp3 composite...");
  const fullComposite = Buffer.concat(generatedBuffers);
  const fullPath = path.join(audioDir, 'listening_p3_full.mp3');
  fs.writeFileSync(fullPath, fullComposite);
  console.log(`✓ Saved listening_p3_full.mp3 (${fullComposite.length} bytes)`);
}

main().catch(err => {
  console.error("FATAL:", err);
  process.exit(1);
});
