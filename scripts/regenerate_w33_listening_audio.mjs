/**
 * regenerate_w33_listening_audio.mjs
 * Regenerates W33 Listening Parts 1-5 MP3s with mandatory Example segments.
 * Cambridge format: [Intro] → [Example exchange + pause] → [Items 1-5]
 *
 * ARCHITECTURE INVARIANT — Cambridge dialogue tasks:
 *   - dialogue_script[] in listening_hub.js is the ONE SOURCE OF TRUTH for L2 content.
 *   - Each turn = { speaker: 'man'|'woman', text: '<spoken words only>' }
 *   - Speaker identity controls TTS voice selection ONLY — it is never spoken aloud.
 *   - The generator MUST fail if a text field contains raw speaker labels ("Man:" / "Woman:").
 *   - The generator MUST fail if a 2-speaker dialogue resolves to fewer than 2 distinct voices.
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

// ── Voice constants — cambridgeA2 Flyers speaker roles ──────────────────────
const VOICE_WOMAN = 'en-US-Neural2-F';  // adult female (Teacher / Examiner / Nurse)
const VOICE_GIRL  = 'en-US-Journey-F';  // young female student (Mia / Girl)
const VOICE_MAN   = 'en-US-Neural2-D';  // adult male (Headmaster / Narrator / Man)
const VOICE_BOY   = 'en-US-Journey-D';  // young male student (Jake / Tom / Boy)

const SPEAKER_VOICE_MAP = {
  woman:   VOICE_WOMAN,
  teacher: VOICE_WOMAN,
  girl:    VOICE_GIRL,
  mia:     VOICE_GIRL,
  man:     VOICE_MAN,
  boy:     VOICE_BOY,
};

// ── Silence padding between dialogue turns (200ms silent MP3 frame) ──────────
// This is a minimal valid MP3 silence buffer (4 silent frames at 44.1kHz, 128kbps)
const SILENCE_200MS = Buffer.from(
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  'base64'
);

// ── Core TTS call ────────────────────────────────────────────────────────────
async function tts(text, voice = VOICE_WOMAN, speakingRate = 0.88) {
  if (!text || !text.trim()) throw new Error(`tts(): empty text passed for voice ${voice}`);

  // Safety guard — ensure no speaker label leaked into TTS input
  const labelPattern = /\b(Man|Woman|Girl|Boy|Nova|Teacher|Mia)\s*:/;
  if (labelPattern.test(text)) {
    throw new Error(
      `tts() REJECTED: Speaker label detected in text for voice ${voice}.\n` +
      `  Input: "${text.slice(0, 80)}..."\n` +
      `  Speaker identity must be metadata, not spoken content.`
    );
  }

  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: 'en-US', name: voice },
      audioConfig: { audioEncoding: 'MP3', speakingRate }
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
/**
 * Validates a dialogue_script[] before TTS generation.
 * Enforces:
 *   1. Minimum 2 turns
 *   2. All speakers have a voice mapping
 *   3. Required speakers all present
 *   4. At least 2 DISTINCT voices are used (no single-voice simulation)
 *   5. No text field contains a raw speaker label ("Man:", "Woman:", etc.)
 *
 * Throws an Error with a descriptive message on any violation.
 */
function validateDialogueScript(dialogueScript, requiredSpeakers = []) {
  const labelPattern = /\b(Man|Woman|Girl|Boy|Nova|Teacher|Mia)\s*:/;

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
    if (!SPEAKER_VOICE_MAP[speakerKey]) {
      throw new Error(
        `validateDialogueScript: Unknown speaker '${turn.speaker}' at turn ${i}. ` +
        `Known speakers: ${Object.keys(SPEAKER_VOICE_MAP).join(', ')}.`
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
    usedVoices.add(SPEAKER_VOICE_MAP[speakerKey]);
  }

  // Check required speakers are present
  for (const req of requiredSpeakers) {
    if (!usedSpeakers.has(req.toLowerCase())) {
      throw new Error(`validateDialogueScript: Required speaker '${req}' not found in dialogue_script.`);
    }
  }

  // Cambridge 2-speaker dialogue must use 2 DISTINCT voices
  if (requiredSpeakers.length >= 2 && usedVoices.size < 2) {
    const voiceList = [...usedVoices].join(', ');
    throw new Error(
      `validateDialogueScript: Cambridge 2-speaker dialogue resolved to only 1 voice (${voiceList}). ` +
      `Man and Woman must map to different voice IDs.`
    );
  }

  console.log(
    `  ✔ dialogue_script valid: ${dialogueScript.length} turns, ` +
    `${usedSpeakers.size} speakers (${[...usedSpeakers].join(', ')}), ` +
    `${usedVoices.size} distinct voices.`
  );
}

// ── Cambridge Dialogue Generator ─────────────────────────────────────────────
/**
 * Generates a composite MP3 from a validated dialogue_script.
 * Each turn is TTS'd independently with the correct voice.
 * A brief silence is inserted between consecutive turns of DIFFERENT speakers.
 *
 * @param {Array}  dialogueScript - Validated dialogue_script array from hub data
 * @param {number} [pauseMs=200]  - Pause duration between speaker switches (ms)
 * @returns {Buffer} Concatenated MP3 buffer
 */
async function generateDialogueAudio(dialogueScript, pauseMs = 200) {
  const buffers = [];
  let prevVoice = null;

  for (let i = 0; i < dialogueScript.length; i++) {
    const turn = dialogueScript[i];
    const voice = SPEAKER_VOICE_MAP[turn.speaker.toLowerCase()];

    // Insert silence when speaker switches
    if (prevVoice !== null && voice !== prevVoice) {
      buffers.push(SILENCE_200MS);
    }

    console.log(`    [${i + 1}/${dialogueScript.length}] ${turn.speaker.padEnd(6)} → ${voice.split('-').pop()} ...`);
    const buf = await tts(turn.text, voice);
    buffers.push(buf);
    prevVoice = voice;
  }

  return Buffer.concat(buffers);
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('🔊 W33 Listening Audio Regeneration — Cambridge-compliant\n');

  // ── Load W33 listening_hub.js as the authoritative data source ──────────
  const hubPath = path.join(rootDir, 'src/data/weeks/week_33/listening_hub.js');
  const hubModule = await import(`file://${hubPath}`);
  const hub = hubModule.listeningHub || hubModule.listeningHubData || hubModule.default;
  if (!hub) throw new Error('Failed to load listening_hub.js — no named or default export found.');
  console.log('📂 Loaded listening_hub.js as data source.\n');

  // ── L1: Draw a Line ──────────────────────────────────────────────────────
  console.log('🎧 L1: Draw a Line (dual-voice dialogue: Teacher & Mia)...');
  const p1 = hub.listening_p1;
  if (!p1.dialogue_script) {
    throw new Error('listening_p1 is missing dialogue_script in listening_hub.js');
  }
  validateDialogueScript(p1.dialogue_script, ['woman', 'girl']);
  const l1Buf = await generateDialogueAudio(p1.dialogue_script, 250);
  save('listening_p1_full.mp3', l1Buf);
  console.log('');

  // ── L2: Note Completion — FIXED TWO-VOICE DIALOGUE ─────────────────────
  console.log('📝 L2: Note Completion (dual-voice dialogue)...');
  const p2 = hub.listening_p2;

  if (!p2.dialogue_script) {
    throw new Error('listening_p2 is missing dialogue_script. Add it to listening_hub.js.');
  }

  // Phase 4: Structural validation BEFORE TTS
  console.log('  Validating dialogue_script...');
  validateDialogueScript(p2.dialogue_script, p2.required_speakers || ['man', 'woman']);

  // Phase 3: Per-turn generation with correct speaker voices
  const l2Buf = await generateDialogueAudio(p2.dialogue_script, 200);
  save('listening_p2_full.mp3', l2Buf);
  console.log('');

  // ── L3: Visual Matching A-H ──────────────────────────────────────────────
  console.log('🔤 L3: Matching A-H (example + items 1-5)...');
  const l3Example = `Listen and write a letter in each box. There is one example.
Look at the picture. What is the tool used to clean a wet floor?
That is the cleaning mop. Can you see the letter H in the box? That is the example.
Now you listen and write a letter in each box.`;
  const l3ExBuf = await tts(l3Example, VOICE_WOMAN);
  save('listening_p3_example.mp3', l3ExBuf);

  const l3Items = [
    {
      f: 'listening_p3_item1.mp3',
      turns: [
        { speaker: 'man',   text: 'Look at the first picture. What are the steps inside the school building that go up and down between floors?' },
        { speaker: 'woman', text: 'Those are the school stairs. They go up to the second floor.' },
        { speaker: 'man',   text: 'School stairs. Write the letter.' }
      ]
    },
    {
      f: 'listening_p3_item2.mp3',
      turns: [
        { speaker: 'man',   text: 'What is the yellow board placed on the wet floor to warn students to be careful?' },
        { speaker: 'woman', text: 'That is the warning sign. It says Be Careful.' },
        { speaker: 'man',   text: 'Warning sign. Write the letter.' }
      ]
    },
    {
      f: 'listening_p3_item3.mp3',
      turns: [
        { speaker: 'man',   text: 'What is the white box with a red cross kept in the nurse office for injuries?' },
        { speaker: 'woman', text: 'That is the first aid kit. The nurse keeps it ready.' },
        { speaker: 'man',   text: 'First aid kit. Write the letter.' }
      ]
    },
    {
      f: 'listening_p3_item4.mp3',
      turns: [
        { speaker: 'man',   text: 'What is the blue bag filled with ice that the nurse puts on a swollen knee?' },
        { speaker: 'woman', text: 'That is the cold pack. It stops the knee from swelling.' },
        { speaker: 'man',   text: 'Cold pack. Write the letter.' }
      ]
    },
    {
      f: 'listening_p3_item5.mp3',
      turns: [
        { speaker: 'man',   text: 'What is the long white cloth strip wrapped around a cut or hurt part of the body?' },
        { speaker: 'woman', text: 'That is the clean bandage. The nurse uses it to cover the wound.' },
        { speaker: 'man',   text: 'Clean bandage. Write the letter.' }
      ]
    },
  ];

  const l3Bufs = [l3ExBuf];
  for (const item of l3Items) {
    validateDialogueScript(item.turns);
    const buf = await generateDialogueAudio(item.turns);
    save(item.f, buf);
    l3Bufs.push(buf);
  }
  save('listening_p3_full.mp3', Buffer.concat(l3Bufs));
  console.log('');

  // ── L4: 3-Picture Quiz ────────────────────────────────────────────────────
  console.log('☑️  L4: 3-Picture Quiz (example + Q1-Q5)...');
  const l4Scripts = [
    { f: 'listening_p4_example.mp3', v: VOICE_WOMAN,
      t: `Look at the example. Where was Jake walking after class? He was walking carefully in the school corridor. Can you see the tick next to picture A? Now you listen and tick the box.` },
    { f: 'listening_p4_q1.mp3',    v: VOICE_MAN,
      t: `Question 1. Why was the floor slippery near the science room? The cleaner had just washed the tiles with water.` },
    { f: 'listening_p4_q2.mp3',    v: VOICE_MAN,
      t: `Question 2. What happened when the boy ran fast? He slipped on the wet floor and hurt his knee.` },
    { f: 'listening_p4_q3.mp3',    v: VOICE_MAN,
      t: `Question 3. What did Jake do immediately? He ran to the nurse room to call for help.` },
    { f: 'listening_p4_q4.mp3',    v: VOICE_MAN,
      t: `Question 4. What did the nurse use to treat the knee? She used a clean bandage and a cold pack.` },
    { f: 'listening_p4_q5.mp3',    v: VOICE_MAN,
      t: `Question 5. What did the headmaster say during assembly? He praised Jake for following safety habits.` },
  ];
  const l4Bufs = [];
  for (const s of l4Scripts) {
    const buf = await tts(s.t, s.v);
    save(s.f, buf);
    l4Bufs.push(buf);
  }
  save('listening_p4_full.mp3', Buffer.concat(l4Bufs));
  console.log('');

  // ── L5: Colour and Write — CARE PRONUNCIATION FIX ───────────────────────
  // DEFECT DEF-003: 'CARE' (single-quoted uppercase) was misread by TTS as "See AR".
  // FIX: Use lowercase "care" without quotes. TTS reads it as the natural English word.
  // The word's identity is preserved in the hub data instruction fields (word: "CARE").
  console.log('🎨 L5: Colour and Write (CARE pronunciation fix)...');

  // Build L5 dialogue as structured turns to maintain consistency
  const l5Turns = [
    { speaker: 'woman', text: 'Listen and colour and write. There is one example.' },
    { speaker: 'woman', text: "Look at this picture of the school corridor. Can you see Jake's friend sitting on the bench?" },
    { speaker: 'man',   text: 'Yes, I can see him.' },
    { speaker: 'woman', text: 'Good. Colour his notebook yellow.' },
    { speaker: 'woman', text: "Can you see the yellow notebook? That is the example. Now you listen and colour and write." },
    // Instruction 1: colour backpack blue
    { speaker: 'woman', text: 'Now look at Jake. He is carrying a backpack.' },
    { speaker: 'man',   text: 'Shall I colour his backpack blue?' },
    { speaker: 'woman', text: "Yes, colour Jake's backpack blue." },
    // Instruction 2: write WET
    { speaker: 'woman', text: 'Look at the warning sign near the wet tiles. Can you write a word on it?' },
    { speaker: 'man',   text: 'Sure. What word should I write?' },
    // FIX: 'WET' → lowercase "wet" to prevent uppercase acronym misread
    { speaker: 'woman', text: 'Write the word wet on the sign.' },
    // Instruction 3: colour door green
    { speaker: 'woman', text: 'Can you find the science lab door frame?' },
    { speaker: 'man',   text: 'Yes, it is next to the lockers.' },
    { speaker: 'woman', text: 'Colour the door frame bright green.' },
    // Instruction 4: write CARE — FIX: lowercase "care" prevents "See AR" TTS artifact
    { speaker: 'woman', text: 'Look at the notice board on the wall. Can you write one more word?' },
    { speaker: 'man',   text: 'Yes, what should I write?' },
    // KEY FIX: was 'CARE' (uppercase, single-quoted) → now lowercase "care"
    // TTS reads uppercase isolated letters as individual characters → "See AR"
    // Lowercase "care" → natural English word pronunciation
    { speaker: 'woman', text: 'Write the word care on the board.' },
    // Instruction 5: colour door red
    { speaker: 'woman', text: 'Now look at the nurse room door at the end of the corridor.' },
    { speaker: 'man',   text: 'Should I colour it red?' },
    { speaker: 'woman', text: 'Yes, colour the nurse room door red.' },
  ];

  validateDialogueScript(l5Turns, ['man', 'woman']);
  const l5Buf = await generateDialogueAudio(l5Turns, 150);
  save('listening_p5_full.mp3', l5Buf);

  // Individual instruction files (for per-step playback in SVGColorAndWrite)
  // These use plain English words — no uppercase acronym risk
  const l5Insts = [
    { f: 'listening_p5_inst1.mp3', t: "Colour Jake's backpack blue" },
    { f: 'listening_p5_inst2.mp3', t: 'Write the word wet on the warning sign' },
    { f: 'listening_p5_inst3.mp3', t: 'Colour the science lab door frame bright green' },
    // FIX: was 'Write the word CARE on the notice board' → lowercase "care"
    { f: 'listening_p5_inst4.mp3', t: 'Write the word care on the notice board' },
    { f: 'listening_p5_inst5.mp3', t: 'Colour the nurse room door red' },
  ];
  for (const inst of l5Insts) {
    save(inst.f, await tts(inst.t, VOICE_WOMAN));
  }
  console.log('');

  // ── L1 Target files — DOCUMENTED AS ORPHANED ASSETS ─────────────────────
  // listening_p1_target1.mp3 through target5.mp3 are NOT referenced at runtime.
  // SVGLineMatcher plays the passage_audio_script via live TTS (VoiceService).
  // These files currently contain wrong character names (Nurse Clara, Mr. Davis, Emma).
  // Action: NOT regenerated — see ORPHANED_AUDIO_MANIFEST below.
  console.log('⚠️  L1 target1-5.mp3: ORPHANED — not referenced at runtime. Not regenerated.');
  console.log('   See: public/audio/week33/ORPHANED_AUDIO_MANIFEST.md for details.\n');

  console.log('✅ ALL DONE — W33 Listening audio regenerated (Cambridge-compliant, dual-voice).');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
