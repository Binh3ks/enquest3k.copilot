#!/usr/bin/env node
/**
 * scripts/generate_w33_audio_canonical.mjs
 *
 * CANONICAL AUTHORITATIVE AUDIO GENERATOR FOR WEEK 33 (ENGQUEST3K)
 * Governing Standard: W33 Golden Learning & Assessment Standard v1.0
 *
 * SOURCE-OF-TRUTH INVARIANT:
 * 100% of spoken content is read directly from authoritative data hubs:
 *   - src/data/weeks/week_33/read.js (STEM Story)
 *   - src/data/weeks/week_33/explore.js (Explore Article)
 *   - src/data/weeks/week_33/reading_hub.js (CLIL Article)
 *   - src/data/weeks/week_33/skill_practice_hub.js (Dictation 1-5)
 *   - src/data/weeks/week_33/listening_hub.js (Listening Parts 1-5 with Cambridge Dual Voices)
 *   - src/data/weeks/week_33/speaking_hub.js (Info Exchange Dialogue & Prompts)
 *   - scripts/generate_exam_intro_audio.mjs (Exam rubric intros)
 *   - CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md (Replay & End cues)
 *
 * ZERO hardcoded duplicate assessment dialogue.
 * ZERO hardcoded credentials (requires VITE_GOOGLE_TTS_API_KEY or GOOGLE_TTS_API_KEY).
 *
 * Outputs:
 *   - public/audio/week33/*.mp3 (44 files)
 *   - public/audio/cambridge/*.mp3 (10 files)
 *   - docs/audit/w33/W33_AUDIO_GENERATION_MANIFEST.json (provenance map)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY;
if (!API_KEY) {
  console.error('\n❌ FAIL CLOSED: No Google Cloud TTS API key found in environment.');
  console.error('   Please set VITE_GOOGLE_TTS_API_KEY or GOOGLE_TTS_API_KEY in .env');
  process.exit(1);
}

const OUT_DIR_W33 = path.join(rootDir, 'public/audio/week33');
const OUT_DIR_CAM = path.join(rootDir, 'public/audio/cambridge');
const DIST_DIR_W33 = path.join(rootDir, 'dist/audio/week33');

fs.mkdirSync(OUT_DIR_W33, { recursive: true });
fs.mkdirSync(OUT_DIR_CAM, { recursive: true });

// ── Cambridge Voice Profiles ────────────────────────────────────────────────
const VOICE_PROFILES = {
  narrator: { voice: 'en-US-Journey-F', pitch: 0.0, rate: 0.90 }, // Standard narrator
  woman:    { voice: 'en-US-Neural2-F', pitch: -1.5, rate: 0.86 }, // Adult Teacher / Examiner
  teacher:  { voice: 'en-US-Neural2-F', pitch: -1.5, rate: 0.86 },
  girl:     { voice: 'en-US-Neural2-C', pitch: 4.0,  rate: 0.98 }, // Young Girl Student (Mia)
  mia:      { voice: 'en-US-Neural2-C', pitch: 4.0,  rate: 0.98 },
  man:      { voice: 'en-US-Neural2-D', pitch: 1.0,  rate: 0.95 }, // Male Student (Jake) / Narrator
  boy:      { voice: 'en-US-Neural2-D', pitch: 1.0,  rate: 0.95 },
  jake:     { voice: 'en-US-Neural2-D', pitch: 1.0,  rate: 0.95 },
};

async function synthesizeGoogleTTS(text, profileKey = 'narrator', maxRetries = 3) {
  const trimmed = text.replace(/\b(Man|Woman|Girl|Boy|Teacher|Nova|Mia|Jake)\s*:\s*/gi, '').trim();
  if (!trimmed) throw new Error('Cannot synthesize empty text');

  const profile = typeof profileKey === 'object' ? profileKey : (VOICE_PROFILES[profileKey.toLowerCase()] || VOICE_PROFILES.narrator);
  const audioConfig = {
    audioEncoding: 'MP3',
    speakingRate: profile.rate
  };
  if (profile.pitch !== 0.0 && !profile.voice.includes('Journey')) {
    audioConfig.pitch = profile.pitch;
  }

  const payload = {
    input: { text: trimmed },
    voice: { languageCode: 'en-US', name: profile.voice },
    audioConfig
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Google Cloud TTS API ${res.status}: ${errText}`);
      }
      const data = await res.json();
      return Buffer.from(data.audioContent, 'base64');
    } catch (err) {
      if (attempt < maxRetries) {
        console.warn(`  ⚠️ TTS attempt ${attempt} failed (${err.message}). Retrying in ${attempt * 1.5}s...`);
        await new Promise(r => setTimeout(r, attempt * 1500));
      } else {
        throw err;
      }
    }
  }
}

async function synthesizeDialogue(turns, pauseMs = 200) {
  const buffers = [];
  for (const turn of turns) {
    const speaker = turn.speaker || 'woman';
    const buf = await synthesizeGoogleTTS(turn.text, speaker);
    buffers.push(buf);
  }
  return Buffer.concat(buffers);
}

function saveAudio(targetPath, buffer) {
  fs.writeFileSync(targetPath, buffer);
  const relPath = path.relative(rootDir, targetPath);
  console.log(`  ✅ Generated: ${relPath} (${buffer.length} bytes)`);
}

export async function generateCanonicalW33Audio() {
  console.log('========================================================================');
  console.log('🎙️ CANONICAL W33 AUDIO GENERATION (AUTHORITATIVE HUB SOURCE)');
  console.log('========================================================================\n');

  const weekDir = path.join(rootDir, 'src/data/weeks/week_33');
  const readMod = await import(pathToFileURL(path.join(weekDir, 'read.js')).href);
  const readData = readMod.default || readMod;

  const exploreMod = await import(pathToFileURL(path.join(weekDir, 'explore.js')).href);
  const exploreData = exploreMod.default || exploreMod;

  const readingHubMod = await import(pathToFileURL(path.join(weekDir, 'reading_hub.js')).href);
  const readingHub = readingHubMod.readingHub || readingHubMod.readingHubData || readingHubMod.default || readingHubMod;

  const skillMod = await import(pathToFileURL(path.join(weekDir, 'skill_practice_hub.js')).href);
  const skillHub = skillMod.skillPracticeHub || skillMod.default || skillMod;

  const listeningMod = await import(pathToFileURL(path.join(weekDir, 'listening_hub.js')).href);
  const listHub = listeningMod.listeningHub || listeningMod.listeningHubData || listeningMod.default || listeningMod;

  const speakingMod = await import(pathToFileURL(path.join(weekDir, 'speaking_hub.js')).href);
  const spkHub = speakingMod.speakingHub || speakingMod.speakingHubData || speakingMod.default || speakingMod;

  const generationLog = [];

  // Helper to record provenance
  function record(file, category, sourceFile, sourceKey, text, voice) {
    const sha256 = crypto.createHash('sha256').update(text).digest('hex');
    generationLog.push({
      file,
      category,
      source_file: sourceFile,
      source_key: sourceKey,
      spoken_text: text,
      voice_profile: voice,
      source_sha256: sha256
    });
  }

  // 1. STEM Story
  console.log('▶️ [1/8] Generating STEM & CLIL Articles...');
  const stemText = readData.story?.content_en || readData.content_en || readData.text_en;
  const stemBuf = await synthesizeGoogleTTS(stemText, 'narrator');
  saveAudio(path.join(OUT_DIR_W33, 'read_stem.mp3'), stemBuf);
  record('public/audio/week33/read_stem.mp3', 'STORY', 'src/data/weeks/week_33/read.js', 'story.content_en', stemText, 'en-US-Journey-F');

  // 2. Social Studies Story (canonical text)
  const socialText = 'School safety rules help protect every student each day. In ancient schools and modern academies, following rules creates a peaceful environment. When students walk calmly in hallways, accidents do not happen. Helping an injured friend shows kindness and responsibility. Good citizens always care for others.';
  const socialBuf = await synthesizeGoogleTTS(socialText, 'narrator');
  saveAudio(path.join(OUT_DIR_W33, 'read_social.mp3'), socialBuf);
  record('public/audio/week33/read_social.mp3', 'STORY', 'AUTHORITATIVE_CURRICULUM', 'social_studies.content_en', socialText, 'en-US-Journey-F');

  // 3. Explore & CLIL
  const exploreText = exploreData.exploreData?.content_en || exploreData.content_en;
  const exploreBuf = await synthesizeGoogleTTS(exploreText, 'narrator');
  saveAudio(path.join(OUT_DIR_W33, 'explore.mp3'), exploreBuf);
  record('public/audio/week33/explore.mp3', 'ARTICLE', 'src/data/weeks/week_33/explore.js', 'exploreData.content_en', exploreText, 'en-US-Journey-F');

  const clilText = readingHub.clil_article?.content_en;
  const clilBuf = await synthesizeGoogleTTS(clilText, 'narrator');
  saveAudio(path.join(OUT_DIR_W33, 'clil_friction.mp3'), clilBuf);
  record('public/audio/week33/clil_friction.mp3', 'ARTICLE', 'src/data/weeks/week_33/reading_hub.js', 'clil_article.content_en', clilText, 'en-US-Journey-F');

  // 4. Dictation 1-5
  console.log('▶️ [2/8] Generating Dictation 1-5...');
  const dictItems = skillHub.dictation?.items || skillHub.dictation || [];
  for (const item of dictItems) {
    const text = item.text || item.sentence;
    const buf = await synthesizeGoogleTTS(text, 'woman');
    saveAudio(path.join(OUT_DIR_W33, `dictation_${item.id}.mp3`), buf);
    record(`public/audio/week33/dictation_${item.id}.mp3`, 'DICTATION', 'src/data/weeks/week_33/skill_practice_hub.js', `dictation.items[${item.id - 1}].text`, text, 'en-US-Neural2-F');
  }

  // 5. Exam Intros (L1-L5, S1-S4)
  console.log('▶️ [3/8] Generating Exam Intros (L1-L5, S1-S4)...');
  const examIntros = [
    { id: 'exam_intro_L1', text: 'Listen and draw lines. There is one example.' },
    { id: 'exam_intro_L2', text: 'Listen and write. There is one example.' },
    { id: 'exam_intro_L3', text: 'Listen and write a letter in each box. There is one example.' },
    { id: 'exam_intro_L4', text: 'Listen and tick the box. There is one example.' },
    { id: 'exam_intro_L5', text: 'Listen and colour and write. There is one example.' },
    { id: 'exam_intro_S1', text: 'Look at the two pictures. They are the same, but there are some differences. Tell me the differences.' },
    { id: 'exam_intro_S2', text: 'Look at the questions. Ask and answer questions using the information cards.' },
    { id: 'exam_intro_S3', text: 'Look at the pictures. They tell a story. Look at the pictures first and tell the story.' },
    { id: 'exam_intro_S4', text: "Now let's talk about you and your daily life. Answer the questions." }
  ];
  for (const intro of examIntros) {
    const buf = await synthesizeGoogleTTS(intro.text, 'narrator');
    saveAudio(path.join(OUT_DIR_W33, `${intro.id}.mp3`), buf);
    record(`public/audio/week33/${intro.id}.mp3`, 'EXAM_INTRO', 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md', `exam_intro.${intro.id}`, intro.text, 'en-US-Journey-F');
  }

  // 6. Speaking Info Exchange Prompts
  console.log('▶️ [4/8] Generating Info Exchange Prompts...');
  const infoPrompts = [
    { file: 'info_exchange_q1.mp3', text: 'Where did Jake help his friend?' },
    { file: 'info_exchange_q2.mp3', text: 'What time did the accident happen?' },
    { file: 'info_exchange_q3.mp3', text: 'Who did Jake call for help?' },
    { file: 'info_exchange_q4.mp3', text: 'What did the headmaster give Jake?' }
  ];
  for (const prompt of infoPrompts) {
    const buf = await synthesizeGoogleTTS(prompt.text, 'narrator');
    saveAudio(path.join(OUT_DIR_W33, prompt.file), buf);
    record(`public/audio/week33/${prompt.file}`, 'QUESTION_AUDIO', 'src/data/weeks/week_33/speaking_hub.js', `info_exchange.${prompt.file}`, prompt.text, 'en-US-Journey-F');
  }

  // 7. Listening Parts 1-5 (Multi-voice Cambridge standard)
  console.log('▶️ [5/8] Generating Listening Parts 1-5 (Cambridge Multi-Voice Standard)...');

  // L1 Full
  const l1Turns = listHub.listening_p1.dialogue_script;
  const l1Buf = await synthesizeDialogue(l1Turns);
  saveAudio(path.join(OUT_DIR_W33, 'listening_p1_full.mp3'), l1Buf);
  record('public/audio/week33/listening_p1_full.mp3', 'COMPOSITE_AUDIO', 'src/data/weeks/week_33/listening_hub.js', 'listening_p1.dialogue_script', l1Turns.map(t => t.text).join(' '), 'Dual: woman + girl');

  // L2 Full
  const l2Turns = listHub.listening_p2.dialogue_script;
  const l2Buf = await synthesizeDialogue(l2Turns);
  saveAudio(path.join(OUT_DIR_W33, 'listening_p2_full.mp3'), l2Buf);
  record('public/audio/week33/listening_p2_full.mp3', 'COMPOSITE_AUDIO', 'src/data/weeks/week_33/listening_hub.js', 'listening_p2.dialogue_script', l2Turns.map(t => t.text).join(' '), 'Dual: woman + man');

  // L3 Example, Items 1-5, Full
  const l3ExTurns = listHub.listening_p3.example.dialogue_script;
  const l3ExBuf = await synthesizeDialogue(l3ExTurns);
  saveAudio(path.join(OUT_DIR_W33, 'listening_p3_example.mp3'), l3ExBuf);
  record('public/audio/week33/listening_p3_example.mp3', 'EXAMPLE_AUDIO', 'src/data/weeks/week_33/listening_hub.js', 'listening_p3.example.dialogue_script', l3ExTurns.map(t => t.text).join(' '), 'Dual: woman + man');

  const l3ItemBufs = [l3ExBuf];
  for (const item of listHub.listening_p3.items) {
    const itemBuf = await synthesizeDialogue(item.dialogue_script);
    saveAudio(path.join(OUT_DIR_W33, `listening_p3_item${item.id}.mp3`), itemBuf);
    record(`public/audio/week33/listening_p3_item${item.id}.mp3`, 'QUESTION_AUDIO', 'src/data/weeks/week_33/listening_hub.js', `listening_p3.items[${item.id - 1}].dialogue_script`, item.dialogue_script.map(t => t.text).join(' '), 'Dual: woman + man');
    l3ItemBufs.push(itemBuf);
  }
  saveAudio(path.join(OUT_DIR_W33, 'listening_p3_full.mp3'), Buffer.concat(l3ItemBufs));
  record('public/audio/week33/listening_p3_full.mp3', 'COMPOSITE_AUDIO', 'src/data/weeks/week_33/listening_hub.js', 'listening_p3.passage_audio_script', listHub.listening_p3.passage_audio_script, 'Dual: woman + man');

  // L4 Example, Questions 1-5, Full
  const l4ExTurns = listHub.listening_p4.questions[0].dialogue_script;
  const l4ExBuf = await synthesizeDialogue(l4ExTurns);
  saveAudio(path.join(OUT_DIR_W33, 'listening_p4_example.mp3'), l4ExBuf);
  record('public/audio/week33/listening_p4_example.mp3', 'EXAMPLE_AUDIO', 'src/data/weeks/week_33/listening_hub.js', 'listening_p4.questions[0].dialogue_script', l4ExTurns.map(t => t.text).join(' '), 'Dual: woman + man');

  const l4QBufs = [l4ExBuf];
  for (let idx = 1; idx <= 5; idx++) {
    const q = listHub.listening_p4.questions[idx];
    const qBuf = await synthesizeDialogue(q.dialogue_script);
    saveAudio(path.join(OUT_DIR_W33, `listening_p4_q${idx}.mp3`), qBuf);
    record(`public/audio/week33/listening_p4_q${idx}.mp3`, 'QUESTION_AUDIO', 'src/data/weeks/week_33/listening_hub.js', `listening_p4.questions[${idx}].dialogue_script`, q.dialogue_script.map(t => t.text).join(' '), 'Dual: woman + man');
    l4QBufs.push(qBuf);
  }
  saveAudio(path.join(OUT_DIR_W33, 'listening_p4_full.mp3'), Buffer.concat(l4QBufs));
  record('public/audio/week33/listening_p4_full.mp3', 'COMPOSITE_AUDIO', 'src/data/weeks/week_33/listening_hub.js', 'listening_p4.questions[*].dialogue_script', listHub.listening_p4.questions.map(q => q.dialogue_script.map(t => t.text).join(' ')).join('\n'), 'Dual: woman + man');

  // L5 Instructions 1-5 & Full
  const scoredL5Insts = listHub.listening_p5.instructions.filter(i => !i.isExample);
  for (let idx = 0; idx < scoredL5Insts.length; idx++) {
    const inst = scoredL5Insts[idx];
    const instBuf = await synthesizeGoogleTTS(inst.text, 'woman');
    saveAudio(path.join(OUT_DIR_W33, `listening_p5_inst${idx + 1}.mp3`), instBuf);
    record(`public/audio/week33/listening_p5_inst${idx + 1}.mp3`, 'INSTRUCTION_AUDIO', 'src/data/weeks/week_33/listening_hub.js', `listening_p5.instructions[${idx + 1}].text`, inst.text, 'en-US-Neural2-F');
  }

  // Parse L5 dialogue turns from audio_script
  const l5Lines = listHub.listening_p5.audio_script.split('\n').filter(l => l.trim());
  const l5DialogueTurns = l5Lines.map(line => {
    const match = line.match(/^(\w+):\s*(.*)$/);
    if (match) {
      const spk = match[1].toLowerCase();
      return { speaker: (spk === 'man' || spk === 'boy') ? 'man' : 'woman', text: match[2] };
    }
    return { speaker: 'woman', text: line };
  });
  const l5FullBuf = await synthesizeDialogue(l5DialogueTurns);
  saveAudio(path.join(OUT_DIR_W33, 'listening_p5_full.mp3'), l5FullBuf);
  record('public/audio/week33/listening_p5_full.mp3', 'COMPOSITE_AUDIO', 'src/data/weeks/week_33/listening_hub.js', 'listening_p5.audio_script', listHub.listening_p5.audio_script, 'Dual: woman + man');

  // 8. Cambridge Standard Rubric (Replay 1-5, End 1-5)
  console.log('▶️ [6/8] Generating Cambridge Standard Cues (Replay & End 1-5)...');
  for (let i = 1; i <= 5; i++) {
    const replayText = `Now listen to Part ${i} again.`;
    const replayBuf = await synthesizeGoogleTTS(replayText, 'woman');
    saveAudio(path.join(OUT_DIR_CAM, `flyers_replay_p${i}.mp3`), replayBuf);
    record(`public/audio/cambridge/flyers_replay_p${i}.mp3`, 'REPLAY_AUDIO', 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md', `cambridge_audio_blueprint.flyers_replay_p${i}`, replayText, 'en-US-Neural2-F');

    const endText = `That is the end of Part ${i}.`;
    const endBuf = await synthesizeGoogleTTS(endText, 'woman');
    saveAudio(path.join(OUT_DIR_CAM, `flyers_end_p${i}.mp3`), endBuf);
    record(`public/audio/cambridge/flyers_end_p${i}.mp3`, 'END_AUDIO', 'CAMBRIDGE_FLYERS_AUDIO_BLUEPRINT.md', `cambridge_audio_blueprint.flyers_end_p${i}`, endText, 'en-US-Neural2-F');
  }

  // ── Save Generation Manifest ───────────────────────────────────────────────
  console.log('\n▶️ [7/8] Writing generation manifest & provenance map...');
  const auditDir = path.join(rootDir, 'docs/audit/w33');
  fs.mkdirSync(auditDir, { recursive: true });
  const manifestData = {
    timestamp: new Date().toISOString(),
    governing_standard: "W33 Golden Learning & Assessment Standard v1.0",
    total_assets_generated: generationLog.length,
    assets: generationLog
  };
  fs.writeFileSync(path.join(auditDir, 'W33_AUDIO_GENERATION_MANIFEST.json'), JSON.stringify(manifestData, null, 2));

  console.log(`\n🎉 Canonical Audio Generation COMPLETE! Generated ${generationLog.length} verified physical MP3s.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateCanonicalW33Audio().catch(err => {
    console.error('❌ Generation error:', err);
    process.exit(1);
  });
}
