import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const GOOGLE_API_KEY = process.env.GOOGLE_TTS_API_KEY || "AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU";

const PICTURE_QUIZ_SCRIPTS = [
  {
    id: 'chk_w33_p4_01',
    lines: [
      { speaker: 'girl', text: 'Did Tom slip inside the science lab?' },
      { speaker: 'boy', text: 'No, he was walking past the science lab, but he actually slipped on wet tiles in the school corridor!' },
      { speaker: 'girl', text: 'Oh, so it was in the corridor, not in the lab or playground!' }
    ]
  },
  {
    id: 'chk_w33_p4_02',
    lines: [
      { speaker: 'man', text: 'Did Jake run to find his teacher in class?' },
      { speaker: 'woman', text: 'No, Jake stopped right away and walked quickly to call the school nurse for help!' },
      { speaker: 'man', text: 'Ah, he called the school nurse immediately!' }
    ]
  },
  {
    id: 'chk_w33_p4_03',
    lines: [
      { speaker: 'woman', text: 'Did the nurse give Tom a glass of orange juice?' },
      { speaker: 'man', text: 'Tom was thirsty, but the nurse first applied a clean bandage and a cold pack to his knee.' },
      { speaker: 'woman', text: 'So she applied a clean bandage and a cold pack!' }
    ]
  },
  {
    id: 'chk_w33_p4_04',
    lines: [
      { speaker: 'girl', text: "Was Tom's knee severely injured?" },
      { speaker: 'boy', text: 'No, the nurse treated his knee gently, and everyone felt relieved and safe!' },
      { speaker: 'girl', text: 'That was a big relief for everyone!' }
    ]
  },
  {
    id: 'chk_w33_p4_05',
    lines: [
      { speaker: 'man', text: 'Did the headmaster give Jake a difficult test?' },
      { speaker: 'woman', text: 'Yes, the headmaster praised Jake publicly during Monday assembly for taking responsible action!' }
    ]
  }
];

// Voice Profiles
const VOICE_MAP = {
  girl: { name: 'en-US-Journey-F', rate: 1.05 },
  woman: { name: 'en-US-Journey-F', rate: 1.0 },
  boy: { name: 'en-US-Neural2-D', rate: 1.05 },
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
  const tempDir = path.join(outputDir, 'temp_lines');
  fs.mkdirSync(tempDir, { recursive: true });

  console.log(`🎙️ Generating Multi-Voice Dialogue MP3s for W33 Picture Quiz...`);

  for (let qIdx = 0; qIdx < PICTURE_QUIZ_SCRIPTS.length; qIdx++) {
    const q = PICTURE_QUIZ_SCRIPTS[qIdx];
    const qNum = qIdx + 1;
    console.log(`\n▶ Processing Question ${qNum} (${q.lines.length} lines)...`);

    const lineFiles = [];
    for (let lIdx = 0; lIdx < q.lines.length; lIdx++) {
      const line = q.lines[lIdx];
      const profile = VOICE_MAP[line.speaker] || VOICE_MAP.girl;
      console.log(`   [Line ${lIdx + 1}] Speaker: ${line.speaker.toUpperCase()} (${profile.name}) -> "${line.text}"`);

      const audioBuffer = await synthesizeGoogleTTS(line.text, profile.name, profile.rate);
      const lineFile = path.join(tempDir, `q${qNum}_line${lIdx + 1}.mp3`);
      fs.writeFileSync(lineFile, audioBuffer);
      lineFiles.push(lineFile);
    }

    // Create silence audio file (350ms) using ffmpeg
    const silenceFile = path.join(tempDir, 'silence.mp3');
    if (!fs.existsSync(silenceFile)) {
      execSync(`ffmpeg -y -f lavfi -i anullsrc=r=24000:cl=mono -t 0.35 -q:a 9 "${silenceFile}"`, { stdio: 'ignore' });
    }

    // Build ffmpeg concat list
    const concatListFile = path.join(tempDir, `q${qNum}_concat.txt`);
    let concatContent = '';
    for (let i = 0; i < lineFiles.length; i++) {
      concatContent += `file '${lineFiles[i]}'\n`;
      if (i < lineFiles.length - 1) {
        concatContent += `file '${silenceFile}'\n`;
      }
    }
    fs.writeFileSync(concatListFile, concatContent);

    // Concat into final MP3
    const finalFile = path.join(outputDir, `listening_p4_q${qNum}.mp3`);
    execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c copy "${finalFile}"`, { stdio: 'ignore' });
    console.log(`   ✅ Created composite dialogue MP3: ${finalFile} (${fs.statSync(finalFile).size} bytes)`);
  }

  // Cleanup temp files
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`\n🎉 All 5 Picture Quiz multi-voice MP3 files generated successfully!`);
}

main().catch(err => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
