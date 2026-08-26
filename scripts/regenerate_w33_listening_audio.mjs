/**
 * regenerate_w33_listening_audio.mjs
 * Regenerates W33 Listening Parts 1-5 MP3s with mandatory Example segments.
 * Cambridge format: [Intro] → [Example exchange + pause] → [Items 1-5]
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

const VOICE_F = 'en-US-Journey-F';
const VOICE_M = 'en-US-Neural2-D';

async function tts(text, voice = VOICE_F) {
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: { text }, voice: { languageCode: 'en-US', name: voice },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 0.88 } })
  });
  if (!res.ok) throw new Error(`TTS ${res.status}: ${await res.text()}`);
  return Buffer.from((await res.json()).audioContent, 'base64');
}

function save(filename, buf) {
  fs.writeFileSync(path.join(OUT_DIR, filename), buf);
  console.log(`  ✅ ${filename} (${buf.length} bytes)`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log('🔊 W33 Listening Audio Regeneration — with Example segments\n');

  // ── L1: Draw a Line ──────────────────────────────────────
  console.log('🎧 L1 full...');
  const l1Full = `Look at Part 1. Now look at the picture. Listen and look. There is one example.
Mia: Look at that boy in the corridor! Is he running?
Teacher: No. That is Jake. He is walking carefully in the blue shirt.
Mia: Oh, I see him now.
Teacher: Can you see the example line? Now you listen and draw lines.
Mia: Who is the woman with the first aid kit rushing near the wall?
Teacher: That is Nurse Sarah. She is bringing bandages to help.
Mia: Look at the man wearing glasses near the notice board.
Teacher: That is Headmaster Brown. He is watching the corridor.
Mia: Is that Cleaner Bob holding the yellow warning sign and mop?
Teacher: Yes. That is Cleaner Bob. He is drying the wet tiles.
Mia: Who is the teacher walking near the science lab?
Teacher: That is Teacher David. He is guiding students into the classroom.`;
  save('listening_p1_full.mp3', await tts(l1Full, VOICE_F));

  // ── L2: Note Completion ───────────────────────────────────
  console.log('📝 L2 full...');
  const l2Full = `Listen and write. There is one example.
Man: Hi. My name is Jake. Can I answer some questions?
Woman: Of course. What classroom are you in?
Man: I am in Room 4B.
Woman: That is the example. Room 4B. Now you listen and write.
Woman: What is your favourite subject at school?
Man: My favourite subject is Science.
Woman: And where did the accident happen today?
Man: It happened in the school corridor, near the science room.
Woman: How quickly did the nurse arrive?
Man: She arrived in about 2 minutes.
Woman: What did the nurse use to help the hurt knee?
Man: She used a clean bandage and a cold pack.
Woman: Did the headmaster say anything at assembly?
Man: Yes. He gave Jake a safety badge in front of the whole school.`;
  save('listening_p2_full.mp3', await tts(l2Full, VOICE_M));

  // ── L3: Visual Matching A-H ───────────────────────────────
  console.log('🔤 L3 example + items 1-5...');
  const l3Example = `Listen and write a letter in each box. There is one example.
Man: Look at the picture. What is the tool used to clean a wet floor?
Woman: That is the cleaning mop.
Man: Cleaning mop. Can you see the letter H in the box? That is the example.
Now you listen and write a letter in each box.`;
  const l3ExBuf = await tts(l3Example, VOICE_F);
  save('listening_p3_example.mp3', l3ExBuf);

  const l3Items = [
    { f: 'listening_p3_item1.mp3', t: `Man: Look at the first picture. What are the steps inside the school building that go up and down between floors?\nWoman: Those are the school stairs. They go up to the second floor.\nMan: School stairs. Write the letter.` },
    { f: 'listening_p3_item2.mp3', t: `Man: What is the yellow board placed on the wet floor to warn students to be careful?\nWoman: That is the warning sign. It says Be Careful.\nMan: Warning sign. Write the letter.` },
    { f: 'listening_p3_item3.mp3', t: `Man: What is the white box with a red cross kept in the nurse office for injuries?\nWoman: That is the first aid kit. The nurse keeps it ready.\nMan: First aid kit. Write the letter.` },
    { f: 'listening_p3_item4.mp3', t: `Man: What is the blue bag filled with ice that the nurse puts on a swollen knee?\nWoman: That is the cold pack. It stops the knee from swelling.\nMan: Cold pack. Write the letter.` },
    { f: 'listening_p3_item5.mp3', t: `Man: What is the long white cloth strip wrapped around a cut or hurt part of the body?\nWoman: That is the clean bandage. The nurse uses it to cover the wound.\nMan: Clean bandage. Write the letter.` },
  ];
  const l3Bufs = [l3ExBuf];
  for (const item of l3Items) {
    const buf = await tts(item.t, VOICE_M);
    save(item.f, buf);
    l3Bufs.push(buf);
  }
  save('listening_p3_full.mp3', Buffer.concat(l3Bufs));

  // ── L4: Tick the Box — Example already in data, just rebuild full ────
  console.log('☑️  L4 full (example + Q1-Q5)...');
  const l4Scripts = [
    { f: 'listening_p4_example.mp3', v: VOICE_F, t: `Look at the example. Where was Jake walking after class?\nHe was walking carefully in the school corridor.\nCan you see the tick next to picture A? Now you listen and tick the box.` },
    { f: 'listening_p4_q1.mp3', v: VOICE_M, t: `Question 1. Why was the floor slippery near the science room?\nThe cleaner had just washed the tiles with water.` },
    { f: 'listening_p4_q2.mp3', v: VOICE_M, t: `Question 2. What happened when the boy ran fast?\nHe slipped on the wet floor and hurt his knee.` },
    { f: 'listening_p4_q3.mp3', v: VOICE_M, t: `Question 3. What did Jake do immediately?\nHe ran to the nurse room to call for help.` },
    { f: 'listening_p4_q4.mp3', v: VOICE_M, t: `Question 4. What did the nurse use to treat the knee?\nShe used a clean bandage and a cold pack.` },
    { f: 'listening_p4_q5.mp3', v: VOICE_M, t: `Question 5. What did the headmaster say during assembly?\nHe praised Jake for following safety habits.` },
  ];
  const l4Bufs = [];
  for (const s of l4Scripts) {
    const buf = await tts(s.t, s.v);
    save(s.f, buf);
    l4Bufs.push(buf);
  }
  save('listening_p4_full.mp3', Buffer.concat(l4Bufs));

  // ── L5: Colour and Write — Example already embedded in audio_script ──
  console.log('🎨 L5 full + inst 1-5...');
  const l5Full = `Listen and colour and write. There is one example.
Woman: Look at this picture of the school corridor. Can you see Jake's friend sitting on the bench?
Man: Yes, I can see him.
Woman: Good. Colour his notebook yellow.
Man: Can you see the yellow notebook? That is the example. Now you listen and colour and write.
Woman: Now look at Jake. He is carrying a backpack.
Man: Shall I colour his backpack blue?
Woman: Yes, colour Jake's backpack blue.
Woman: Look at the warning sign near the wet tiles. Can you write a word on it?
Man: Sure. What word should I write?
Woman: Write the word WET on the sign.
Woman: Can you find the science lab door frame?
Man: Yes, it is next to the lockers.
Woman: Colour the door frame bright green.
Woman: Look at the notice board on the wall. Can you write one more word?
Man: Yes, what should I write?
Woman: Write the word CARE on the board.
Woman: Now look at the nurse room door at the end of the corridor.
Man: Should I colour it red?
Woman: Yes, colour the nurse room door red.`;
  save('listening_p5_full.mp3', await tts(l5Full, VOICE_F));

  const l5Insts = [
    `Colour Jake's backpack blue`,
    `Write the word WET on the warning sign`,
    `Colour the science lab door frame bright green`,
    `Write the word CARE on the notice board`,
    `Colour the nurse room door red`
  ];
  for (let i = 0; i < l5Insts.length; i++) {
    save(`listening_p5_inst${i+1}.mp3`, await tts(l5Insts[i], VOICE_F));
  }

  console.log('\n✅ ALL DONE — W33 Listening audio regenerated with Example segments.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
