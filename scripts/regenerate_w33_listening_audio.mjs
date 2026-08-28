/**
 * regenerate_w33_listening_audio.mjs
 * Regenerates W33 Listening Parts 1-5 MP3s with Cambridge-compliant Dual Voices.
 * 
 * Distinct Voice Profiles:
 *   - Adult Female Teacher / Examiner (woman / teacher): en-US-Neural2-F (pitch: -1.5, rate: 0.86) — warm, mature, authoritative
 *   - Young Female Student Mia (girl / mia):            en-US-Neural2-C (pitch: +4.0, rate: 0.98) — bright, cheerful, high-pitch child tone
 *   - Male Student Jake / Examiner (man / boy):          en-US-Neural2-D (pitch: +1.0, rate: 0.95) — natural young male tone
 *
 * Usage: node scripts/regenerate_w33_listening_audio.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const OUT_DIR = path.join(rootDir, 'public/audio/week33');

const API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY;
if (!API_KEY) { console.error('❌ No TTS API key. Set VITE_GOOGLE_TTS_API_KEY in .env'); process.exit(1); }

// ── Voice Configurations with Custom Pitch & Speaking Rate ──────────────────
const SPEAKER_CONFIG = {
  woman:   { voice: 'en-US-Neural2-F', pitch: -1.5, rate: 0.86 }, // Adult Teacher / Examiner
  teacher: { voice: 'en-US-Neural2-F', pitch: -1.5, rate: 0.86 },
  girl:    { voice: 'en-US-Neural2-C', pitch: 4.0,  rate: 0.98 }, // Young Girl Student (Mia)
  mia:     { voice: 'en-US-Neural2-C', pitch: 4.0,  rate: 0.98 },
  man:     { voice: 'en-US-Neural2-D', pitch: 1.0,  rate: 0.95 }, // Male Student (Jake) / Narrator
  boy:     { voice: 'en-US-Neural2-D', pitch: 1.0,  rate: 0.95 },
};

// ── Silence padding between dialogue turns (200ms silent MP3 frame) ──────────
const SILENCE_200MS = Buffer.from(
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  'base64'
);

// ── Core TTS call ────────────────────────────────────────────────────────────
async function tts(text, speakerOrConfig = 'woman') {
  if (!text || !text.trim()) throw new Error('tts(): empty text passed');

  let config = SPEAKER_CONFIG.woman;
  if (typeof speakerOrConfig === 'string') {
    config = SPEAKER_CONFIG[speakerOrConfig.toLowerCase()] || SPEAKER_CONFIG.woman;
  } else if (typeof speakerOrConfig === 'object') {
    config = speakerOrConfig;
  }

  // Safety guard — ensure no speaker label leaked into TTS input
  const labelPattern = /\b(Man|Woman|Girl|Boy|Nova|Teacher|Mia)\s*:/i;
  if (labelPattern.test(text)) {
    throw new Error(
      `tts() REJECTED: Speaker label detected in text.\n` +
      `  Input: "${text.slice(0, 80)}..."\n` +
      `  Speaker identity must be metadata, not spoken content.`
    );
  }

  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: 'en-US', name: config.voice },
      audioConfig: { audioEncoding: 'MP3', speakingRate: config.rate, pitch: config.pitch }
    })
  });
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`);
  return Buffer.from((await res.json()).audioContent, 'base64');
}

function save(filename, buf) {
  fs.writeFileSync(path.join(OUT_DIR, filename), buf);
  console.log(`  ✅ ${filename} (${buf.length} bytes)`);
}

// ── Cambridge Dialogue Validator ─────────────────────────────────────────────
function validateDialogueScript(dialogueScript, requiredSpeakers = []) {
  const labelPattern = /\b(Man|Woman|Girl|Boy|Nova|Teacher|Mia)\s*:/i;

  if (!Array.isArray(dialogueScript) || dialogueScript.length < 2) {
    throw new Error(`validateDialogueScript: dialogue_script must have >= 2 turns. Got ${dialogueScript?.length ?? 0}.`);
  }

  const usedSpeakers = new Set();
  const usedVoices = new Set();

  for (let i = 0; i < dialogueScript.length; i++) {
    const turn = dialogueScript[i];

    if (!turn.speaker || typeof turn.speaker !== 'string') {
      throw new Error(`validateDialogueScript: Turn ${i} is missing a 'speaker' field.`);
    }
    if (!turn.text || typeof turn.text !== 'string' || !turn.text.trim()) {
      throw new Error(`validateDialogueScript: Turn ${i} (speaker='${turn.speaker}') has empty 'text'.`);
    }

    const speakerKey = turn.speaker.toLowerCase();
    const config = SPEAKER_CONFIG[speakerKey];
    if (!config) {
      throw new Error(
        `validateDialogueScript: Unknown speaker '${turn.speaker}' at turn ${i}. ` +
        `Known speakers: ${Object.keys(SPEAKER_CONFIG).join(', ')}.`
      );
    }

    if (labelPattern.test(turn.text)) {
      throw new Error(
        `validateDialogueScript: Turn ${i} (speaker='${turn.speaker}') contains a raw speaker label in 'text'.\n` +
        `  text: "${turn.text.slice(0, 100)}"\n` +
        `  Speaker identity must be in the 'speaker' field, never in 'text'.`
      );
    }

    usedSpeakers.add(speakerKey);
    usedVoices.add(`${config.voice}_p${config.pitch}`);
  }

  // Check required speakers are present
  for (const req of requiredSpeakers) {
    if (!usedSpeakers.has(req.toLowerCase())) {
      throw new Error(`validateDialogueScript: Required speaker '${req}' not found in dialogue_script.`);
    }
  }

  // Cambridge 2-speaker dialogue must use 2 DISTINCT voices/tones
  if (requiredSpeakers.length >= 2 && usedVoices.size < 2) {
    throw new Error(
      `validateDialogueScript: Cambridge 2-speaker dialogue resolved to only 1 voice profile.`
    );
  }

  console.log(
    `  ✔ dialogue_script valid: ${dialogueScript.length} turns, ` +
    `${usedSpeakers.size} speakers (${[...usedSpeakers].join(', ')}), ` +
    `${usedVoices.size} distinct voice profiles.`
  );
}

// ── Cambridge Dialogue Generator ─────────────────────────────────────────────
async function generateDialogueAudio(dialogueScript, pauseMs = 200) {
  const buffers = [];
  let prevSpeaker = null;

  for (let i = 0; i < dialogueScript.length; i++) {
    const turn = dialogueScript[i];
    const speakerKey = turn.speaker.toLowerCase();
    const config = SPEAKER_CONFIG[speakerKey] || SPEAKER_CONFIG.woman;

    // Insert silence when speaker switches
    if (prevSpeaker !== null && speakerKey !== prevSpeaker) {
      buffers.push(SILENCE_200MS);
    }

    console.log(`    [${i + 1}/${dialogueScript.length}] ${turn.speaker.padEnd(7)} → ${config.voice.split('-').pop()} (pitch ${config.pitch}) ...`);
    const buf = await tts(turn.text, config);
    buffers.push(buf);
    prevSpeaker = speakerKey;
  }

  return Buffer.concat(buffers);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('🔊 W33 Listening Audio Regeneration — Distinct Cambridge Multi-Voice\n');

  // ── Load W33 listening_hub.js as authoritative source ─────────────────────
  const hubPath = path.join(rootDir, 'src/data/weeks/week_33/listening_hub.js');
  const hubModule = await import(`file://${hubPath}`);
  const hub = hubModule.listeningHub || hubModule.listeningHubData || hubModule.default;
  if (!hub) throw new Error('Failed to load listening_hub.js.');
  console.log('📂 Loaded listening_hub.js as data source.\n');

  // ── L1: Draw a Line (Teacher & Mia — Adult vs Child) ───────────────────────
  console.log('🎧 L1: Draw a Line (Teacher Neural2-F pitch -1.5 vs Mia Neural2-C pitch +4.0)...');
  const p1 = hub.listening_p1;
  if (!p1.dialogue_script) throw new Error('listening_p1 missing dialogue_script');
  validateDialogueScript(p1.dialogue_script, ['woman', 'girl']);
  const l1Buf = await generateDialogueAudio(p1.dialogue_script, 250);
  save('listening_p1_full.mp3', l1Buf);
  console.log('');

  // ── L2: Note Completion (Examiner Female vs Jake Male) ─────────────────────
  console.log('📝 L2: Note Completion (Examiner Neural2-F vs Jake Neural2-D)...');
  const p2 = hub.listening_p2;
  if (!p2.dialogue_script) throw new Error('listening_p2 missing dialogue_script');
  validateDialogueScript(p2.dialogue_script, ['woman', 'man']);
  const l2Buf = await generateDialogueAudio(p2.dialogue_script, 200);
  save('listening_p2_full.mp3', l2Buf);
  console.log('');

  // ── L3: Visual Matching A-H (Examiner Female vs Jake Male) ────────────────
  console.log('🔤 L3: Matching A-H (Reading dialogue directly from listening_hub.js)...');
  const p3 = hub.listening_p3;
  if (!p3.example?.dialogue_script) throw new Error('listening_p3 example missing dialogue_script');
  
  console.log('  Generating L3 Example (School Backpack)...');
  validateDialogueScript(p3.example.dialogue_script, ['woman', 'man']);
  const l3ExBuf = await generateDialogueAudio(p3.example.dialogue_script, 200);
  save('listening_p3_example.mp3', l3ExBuf);

  const l3Bufs = [l3ExBuf];
  for (let idx = 0; idx < p3.items.length; idx++) {
    const item = p3.items[idx];
    console.log(`  Generating L3 Item ${item.id} (${item.name})...`);
    validateDialogueScript(item.dialogue_script, ['woman', 'man']);
    const itemBuf = await generateDialogueAudio(item.dialogue_script, 200);
    save(`listening_p3_item${item.id}.mp3`, itemBuf);
    l3Bufs.push(itemBuf);
  }
  save('listening_p3_full.mp3', Buffer.concat(l3Bufs));
  console.log('');

  // ── L4: 3-Picture Quiz (Example Female, Questions Male) ───────────────────
  console.log('☑️  L4: 3-Picture Quiz (example + Q1-Q5)...');
  const l4Scripts = [
    { f: 'listening_p4_example.mp3', s: 'woman',
      t: `Look at the example. Where was Jake walking after class? He was walking carefully in the school corridor. Can you see the tick next to picture A? Now you listen and tick the box.` },
    { f: 'listening_p4_q1.mp3',    s: 'man',
      t: `Question 1. Why was the floor slippery near the science room? The cleaner had just washed the tiles with water.` },
    { f: 'listening_p4_q2.mp3',    s: 'man',
      t: `Question 2. What happened when the boy ran fast? He slipped on the wet floor and hurt his knee.` },
    { f: 'listening_p4_q3.mp3',    s: 'man',
      t: `Question 3. What did Jake do immediately? He ran to the nurse room to call for help.` },
    { f: 'listening_p4_q4.mp3',    s: 'man',
      t: `Question 4. What did the nurse use to treat the knee? She used a clean bandage and a cold pack.` },
    { f: 'listening_p4_q5.mp3',    s: 'man',
      t: `Question 5. What did the headmaster say during assembly? He praised Jake for following safety habits.` },
  ];
  const l4Bufs = [];
  for (const s of l4Scripts) {
    const buf = await tts(s.t, s.s);
    save(s.f, buf);
    l4Bufs.push(buf);
  }
  save('listening_p4_full.mp3', Buffer.concat(l4Bufs));
  console.log('');

  // ── L5: Colour and Write (Examiner Female vs Jake Male) ───────────────────
  console.log('🎨 L5: Colour and Write (CARE pronunciation fix)...');
  const l5Turns = [
    { speaker: 'woman', text: 'Listen and colour and write. There is one example.' },
    { speaker: 'woman', text: "Look at this picture of the school corridor. Can you see Jake's friend sitting on the bench?" },
    { speaker: 'man',   text: 'Yes, I can see him.' },
    { speaker: 'woman', text: 'Good. Colour his notebook yellow.' },
    { speaker: 'woman', text: "Can you see the yellow notebook? That is the example. Now you listen and colour and write." },
    { speaker: 'woman', text: 'Now look at Jake. He is carrying a backpack.' },
    { speaker: 'man',   text: 'Shall I colour his backpack blue?' },
    { speaker: 'woman', text: "Yes, colour Jake's backpack blue." },
    { speaker: 'woman', text: 'Look at the warning sign near the wet tiles. Can you write a word on it?' },
    { speaker: 'man',   text: 'Sure. What word should I write?' },
    { speaker: 'woman', text: 'Write the word wet on the sign.' },
    { speaker: 'woman', text: 'Can you find the science lab door frame?' },
    { speaker: 'man',   text: 'Yes, it is next to the lockers.' },
    { speaker: 'woman', text: 'Colour the door frame bright green.' },
    { speaker: 'woman', text: 'Look at the notice board on the wall. Can you write one more word?' },
    { speaker: 'man',   text: 'Yes, what should I write?' },
    { speaker: 'woman', text: 'Write the word care on the board.' },
    { speaker: 'woman', text: 'Now look at the nurse room door at the end of the corridor.' },
    { speaker: 'man',   text: 'Should I colour it red?' },
    { speaker: 'woman', text: 'Yes, colour the nurse room door red.' },
  ];

  validateDialogueScript(l5Turns, ['man', 'woman']);
  const l5Buf = await generateDialogueAudio(l5Turns, 150);
  save('listening_p5_full.mp3', l5Buf);

  const l5Insts = [
    { f: 'listening_p5_inst1.mp3', t: "Colour Jake's backpack blue" },
    { f: 'listening_p5_inst2.mp3', t: 'Write the word wet on the warning sign' },
    { f: 'listening_p5_inst3.mp3', t: 'Colour the science lab door frame bright green' },
    { f: 'listening_p5_inst4.mp3', t: 'Write the word care on the notice board' },
    { f: 'listening_p5_inst5.mp3', t: 'Colour the nurse room door red' },
  ];
  for (const inst of l5Insts) {
    save(inst.f, await tts(inst.t, 'woman'));
  }
  console.log('');

  console.log('✅ ALL DONE — W33 Listening audio regenerated with highly distinct multi-voices.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
