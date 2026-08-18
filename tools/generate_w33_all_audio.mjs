import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const GOOGLE_API_KEY = process.env.GOOGLE_TTS_API_KEY || "AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU";

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

const STATIC_AUDIO_TASKS = [
  // 1. Dictation
  { filename: 'dictation_1.mp3', text: 'Jake was walking carefully down the school corridor.', voice: 'en-US-Neural2-F' },
  { filename: 'dictation_2.mp3', text: 'A boy running fast slipped on the wet floor.', voice: 'en-US-Neural2-F' },
  { filename: 'dictation_3.mp3', text: 'Jake called the school nurse immediately for help.', voice: 'en-US-Neural2-F' },
  { filename: 'dictation_4.mp3', text: 'The nurse applied a clean bandage and a cold pack.', voice: 'en-US-Neural2-F' },
  { filename: 'dictation_5.mp3', text: 'Everyone felt relieved and praised Jake for safety.', voice: 'en-US-Neural2-F' },

  // 2. Listening P1 (Draw Lines)
  { filename: 'listening_p1_target1.mp3', text: 'Tom is the boy in the blue shirt who slipped on the wet floor near the stairs.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p1_target2.mp3', text: 'Jake is the boy wearing a green shirt holding his notebook and calling for help.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p1_target3.mp3', text: 'Nurse Clara is the kind school nurse carrying a clean first aid medical kit.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p1_target4.mp3', text: 'Mr. Davis is the tall headmaster in a dark suit standing near the science lab.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p1_target5.mp3', text: 'Emma is the helpful girl wearing yellow putting down a bright orange warning sign.', voice: 'en-US-Journey-F' },

  // 3. Listening P2 (Secret Notes)
  { filename: 'listening_p2_full.mp3', text: 'The incident happened down the school corridor after science class. The classmate running fast slipped on the wet floor. Jake stopped immediately and called the school nurse. The nurse treated his cut knee gently with a clean bandage. The headmaster reminded all students never to run in corridors.', voice: 'en-US-Neural2-D' },

  // 4. Listening P3 (Item Hunt / Visual Matching)
  { filename: 'listening_p3_item1.mp3', text: 'The first aid box with white bandages was placed on the nurse office desk.', voice: 'en-US-Neural2-D' },
  { filename: 'listening_p3_item2.mp3', text: 'The cold pack with ice cubes was kept in the teacher staffroom fridge.', voice: 'en-US-Neural2-D' },
  { filename: 'listening_p3_item3.mp3', text: 'The bright yellow warning sign was standing in the wet corridor hallway.', voice: 'en-US-Neural2-D' },
  { filename: 'listening_p3_item4.mp3', text: 'The red backpack with school books was sitting on the corridor bench.', voice: 'en-US-Neural2-D' },
  { filename: 'listening_p3_item5.mp3', text: 'The blue water bottle was dropped near the front reception entrance.', voice: 'en-US-Neural2-D' },

  // 5. Listening P5 (Color & Write)
  { filename: 'listening_p5_inst1.mp3', text: 'Find the wet floor warning sign and color it bright orange.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p5_inst2.mp3', text: 'Now find the school bag on the wooden bench and color it blue.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p5_inst3.mp3', text: 'Look at the wall clock near the classroom door. Color the clock green.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p5_inst4.mp3', text: 'Can you see the coat hanging on the wall? Color it red.', voice: 'en-US-Journey-F' },
  { filename: 'listening_p5_inst5.mp3', text: 'Now write the word SAFE on the noticeboard above the bench.', voice: 'en-US-Journey-F' },

  // 6. Stories & CLIL Knowledge Explorer
  { filename: 'read_stem.mp3', text: 'On Monday morning, Jake was walking carefully down the school corridor after science class. Suddenly, Tom was running fast because he was late. Tom slipped on the wet floor and fell down heavily near the stairs. Jake stopped immediately. He did not run away. Jake called the school nurse right away. Nurse Clara arrived with a clean bandage and a cold pack. She treated Tom gently. Later, the headmaster praised Jake for staying calm. Everyone felt relieved.', voice: 'en-US-Journey-F' },
  { filename: 'read_social.mp3', text: 'School safety rules help protect every student each day. In ancient schools and modern academies, following rules creates a peaceful environment. When students walk calmly in hallways, accidents do not happen. Helping an injured friend shows kindness and responsibility. Good citizens always care for others.', voice: 'en-US-Journey-F' },
  { filename: 'explore.mp3', text: 'Why do we fall on wet floors? The answer is a science concept called Friction. Friction is a force that stops things from sliding. While Jake was walking down the corridor, his rubber shoes created high friction with the dry floor. This kept him safe. But water changes everything! Water acts like a lubricant. While Tom was running fast, his shoes hit the wet puddle. The water reduced the friction to zero! While the school nurse was applying the clean bandage, she explained that we must always look for the yellow warning sign. To stay safe, walk carefully and let friction do its job!', voice: 'en-US-Journey-F' },
  { filename: 'clil_friction.mp3', text: 'Why do we fall on wet floors? The answer is a science concept called Friction. Friction is a force that stops things from sliding. While Jake was walking down the corridor, his rubber shoes created high friction with the dry floor. This kept him safe. But water changes everything! Water acts like a lubricant. While Tom was running fast, his shoes hit the wet puddle. The water reduced the friction to zero! While the school nurse was applying the clean bandage, she explained that we must always look for the yellow warning sign. To stay safe, walk carefully and let friction do its job!', voice: 'en-US-Journey-F' }
];

async function generateAll() {
  const outputDir = path.join(ROOT, 'public', 'audio', 'week33');
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`🎙️ Generating ${STATIC_AUDIO_TASKS.length} Static Audio MP3s for Week 33...`);

  for (let i = 0; i < STATIC_AUDIO_TASKS.length; i++) {
    const task = STATIC_AUDIO_TASKS[i];
    const targetFile = path.join(outputDir, task.filename);
    console.log(`[${i + 1}/${STATIC_AUDIO_TASKS.length}] Synthesizing ${task.filename} (${task.voice})...`);

    const audioBuf = await synthesizeGoogleTTS(task.text, task.voice);
    fs.writeFileSync(targetFile, audioBuf);
    console.log(`   ✅ Saved: ${targetFile} (${audioBuf.length} bytes)`);
  }

  console.log(`\n🎉 Week 33 Audio Generation 100% COMPLETE! Total files in /public/audio/week33/: ${fs.readdirSync(outputDir).length}`);
}

generateAll().catch(err => {
  console.error("❌ Generation error:", err);
  process.exit(1);
});
