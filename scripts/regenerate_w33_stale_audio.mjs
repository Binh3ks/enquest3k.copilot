#!/usr/bin/env node
/**
 * regenerate_w33_stale_audio.mjs
 *
 * Authoritative W33 Audio Generator — Source-of-Truth Architecture:
 * HUB DATA → VALIDATION → TTS
 *
 * Reads 100% of spoken scripts directly from authoritative hub data files:
 *  - read.js: text_en → read_stem.mp3
 *  - explore.js: content_en → explore.mp3
 *  - reading_hub.js: clil_article.content_en → clil_friction.mp3
 *  - skill_practice_hub.js: dictation[].text → dictation_1–5.mp3
 *  - listening_hub.js:
 *      * listening_p1.dialogue_script → listening_p1_full.mp3
 *      * listening_p2.dialogue_script → listening_p2_full.mp3
 *      * listening_p3.example + items[].dialogue_script → listening_p3_example.mp3, listening_p3_item1–5.mp3, listening_p3_full.mp3
 *      * listening_p4.questions[].dialogue_script → listening_p4_example.mp3, listening_p4_q1–5.mp3, listening_p4_full.mp3
 *      * listening_p5.instructions[] + audio_script → listening_p5_inst1–5.mp3, listening_p5_full.mp3
 *  - speaking_hub.js: info_exchange_cards.dialogue_script → exam_intro_S2.mp3
 *
 * ZERO hardcoded duplicate assessment dialogue.
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const WEEK = 33;
const OUTPUT_DIR = path.resolve(`public/audio/week${WEEK}`);
const DIST_DIR   = path.resolve(`dist/audio/week${WEEK}`);
const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY || 'AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU';

const VOICE_F = 'en-US-Journey-F';   // woman / narrator (adult female)
const VOICE_M = 'en-US-Neural2-D';   // man / boy (male)
const VOICE_G = 'en-US-Neural2-C';   // child / girl student (youthful female)

// ── Core TTS with Exponential Backoff Retry ───────────────────────────────
async function tts(text, voice = VOICE_F, rate = 0.88, pitch = 0.0, maxRetries = 4) {
  if (!text || !text.trim()) throw new Error('tts(): empty text');
  const cleaned = text.replace(/\b(Man|Woman|Girl|Boy|Teacher|Nova|Mia|Jake)\s*:\s*/gi, '').trim();
  const chosenVoice = voice;
  const audioConfig = { audioEncoding: 'MP3', speakingRate: rate };
  if (pitch !== 0.0 && !chosenVoice.includes('Journey')) {
    audioConfig.pitch = pitch;
  }
  const body = {
    input: { text: cleaned },
    voice: { languageCode: 'en-US', name: chosenVoice },
    audioConfig
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.audioContent) {
        return Buffer.from(json.audioContent, 'base64');
      }
      if (attempt < maxRetries && (json.error?.code === 503 || json.error?.code === 429)) {
        console.warn(`  ⚠️ TTS ${json.error?.code} on attempt ${attempt}, retrying in ${attempt * 1.5}s...`);
        await new Promise(r => setTimeout(r, attempt * 1500));
        continue;
      }
      throw new Error(`TTS error: ${JSON.stringify(json).slice(0, 200)}`);
    } catch (err) {
      if (attempt < maxRetries) {
        console.warn(`  ⚠️ TTS fetch error on attempt ${attempt} (${err.message}), retrying in ${attempt * 1.5}s...`);
        await new Promise(r => setTimeout(r, attempt * 1500));
      } else {
        throw err;
      }
    }
  }
}

async function generateDialogueAudio(turns, rate = 0.88) {
  const parts = [];
  for (const turn of turns) {
    let voice = VOICE_F;
    if (turn.speaker === 'man' || turn.speaker === 'boy') {
      voice = VOICE_M;
    } else if (turn.speaker === 'girl') {
      voice = VOICE_G;
    }
    const buf = await tts(turn.text, voice, rate);
    parts.push(buf);
  }
  return Buffer.concat(parts);
}

function save(filename, buffer) {
  const pubPath = path.join(OUTPUT_DIR, filename);
  const distPath = path.join(DIST_DIR, filename);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(pubPath, buffer);
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(distPath, buffer);
    console.log(`  ✅ Saved + synced to dist: ${filename}`);
  } else {
    console.log(`  ✅ Saved (no dist): ${filename}`);
  }
}

// ── Load Hub Modules (Source of Truth) ────────────────────────────────────
const weekDir = path.resolve(`src/data/weeks/week_${WEEK}`);

const readMod = await import(pathToFileURL(path.join(weekDir, 'read.js')).href);
const readData = readMod.default || readMod;

const exploreMod = await import(pathToFileURL(path.join(weekDir, 'explore.js')).href);
const exploreData = exploreMod.default || exploreMod;

const readingHubMod = await import(pathToFileURL(path.join(weekDir, 'reading_hub.js')).href);
const readingHub = readingHubMod.readingHub || readingHubMod.readingHubData || readingHubMod.default || readingHubMod;

const skillMod = await import(pathToFileURL(path.join(weekDir, 'skill_practice_hub.js')).href);
const skillHub = skillMod.skillPracticeHub || skillMod.default || skillMod;

const listeningMod = await import(pathToFileURL(path.join(weekDir, 'listening_hub.js')).href);
const lh = listeningMod.listeningHub || listeningMod.listeningHubData || listeningMod.default || listeningMod;

const speakingMod = await import(pathToFileURL(path.join(weekDir, 'speaking_hub.js')).href);
const sh = speakingMod.speakingHub || speakingMod.speakingHubData || speakingMod.default || speakingMod;

// ─── 1. read_stem.mp3 from read.js ────────────────────────────────────────
console.log('\n[1/10] Regenerating read_stem.mp3 from read.js text_en...');
const stemText = (readData.text_en || readData.content_en || '').trim();
if (!stemText) throw new Error('read.js text_en is empty');
save('read_stem.mp3', await tts(stemText.slice(0, 1000), VOICE_F, 0.88));

// ─── 2. explore.mp3 from explore.js ───────────────────────────────────────
console.log('\n[2/10] Regenerating explore.mp3 from explore.js content_en...');
const exploreText = (exploreData.content_en || '').trim();
if (!exploreText) throw new Error('explore.js content_en is empty');
save('explore.mp3', await tts(exploreText, VOICE_F, 0.90));

// ─── 3. clil_friction.mp3 from reading_hub.js ─────────────────────────────
console.log('\n[3/10] Regenerating clil_friction.mp3 from reading_hub.js clil_article.content_en...');
const clilText = (readingHub.clil_article?.content_en || '').trim();
if (!clilText) throw new Error('reading_hub.js clil_article.content_en is empty');
save('clil_friction.mp3', await tts(clilText, VOICE_F, 0.90));

// ─── 4. dictation_1–5.mp3 from skill_practice_hub.js ──────────────────────
console.log('\n[4/10] Regenerating dictation 1–5 from skill_practice_hub.js...');
const dictItems = skillHub.dictation?.items || skillHub.dictation || [];
for (const item of dictItems) {
  const text = item.text || item.sentence;
  if (!text) continue;
  save(`dictation_${item.id}.mp3`, await tts(text, VOICE_F, 0.82));
}

// ─── 5. listening_p1_full.mp3 from listening_hub.js ───────────────────────
console.log('\n[5/10] Regenerating listening_p1_full.mp3 from listening_hub.js dialogue_script...');
if (lh.listening_p1?.dialogue_script) {
  const l1Bufs = [];
  for (const turn of lh.listening_p1.dialogue_script) {
    const voice = turn.speaker === 'girl' ? VOICE_G : VOICE_F;
    l1Bufs.push(await tts(turn.text, voice, 0.88));
  }
  save('listening_p1_full.mp3', Buffer.concat(l1Bufs));
}

// ─── 6. listening_p2_full.mp3 from listening_hub.js ───────────────────────
console.log('\n[6/10] Regenerating listening_p2_full.mp3 from listening_hub.js dialogue_script...');
if (lh.listening_p2?.dialogue_script) {
  save('listening_p2_full.mp3', await generateDialogueAudio(lh.listening_p2.dialogue_script, 0.86));
}

// ─── 7. listening_p3 (example + items 1-5 + full) from listening_hub.js ───
console.log('\n[7/10] Regenerating listening_p3 from listening_hub.js dialogue_script...');
if (lh.listening_p3) {
  const allL3Bufs = [];
  if (lh.listening_p3.example?.dialogue_script) {
    const exBuf = await generateDialogueAudio(lh.listening_p3.example.dialogue_script);
    save('listening_p3_example.mp3', exBuf);
    allL3Bufs.push(exBuf);
  }
  if (Array.isArray(lh.listening_p3.items)) {
    for (const item of lh.listening_p3.items) {
      if (item.dialogue_script) {
        const itemBuf = await generateDialogueAudio(item.dialogue_script);
        save(`listening_p3_item${item.id}.mp3`, itemBuf);
        allL3Bufs.push(itemBuf);
      }
    }
  }
  if (allL3Bufs.length > 0) {
    save('listening_p3_full.mp3', Buffer.concat(allL3Bufs));
  }
}

// ─── 8. listening_p4 (example + q1-5 + full) from listening_hub.js ────────
console.log('\n[8/10] Regenerating listening_p4 from listening_hub.js dialogue_script...');
if (lh.listening_p4?.questions) {
  const allL4Bufs = [];
  const exQ = lh.listening_p4.questions.find(q => q.isExample);
  if (exQ?.dialogue_script) {
    const buf = await generateDialogueAudio(exQ.dialogue_script);
    save('listening_p4_example.mp3', buf);
    allL4Bufs.push(buf);
  }
  const scored = lh.listening_p4.questions.filter(q => !q.isExample);
  for (const q of scored) {
    if (q.dialogue_script) {
      const qNum = q.id.replace('p4_q', '');
      const buf = await generateDialogueAudio(q.dialogue_script);
      save(`listening_p4_q${qNum}.mp3`, buf);
      allL4Bufs.push(buf);
    }
  }
  if (allL4Bufs.length > 0) {
    save('listening_p4_full.mp3', Buffer.concat(allL4Bufs));
  }
}

// ─── 9. listening_p5 (inst1-5 + full) from listening_hub.js ──────────────
console.log('\n[9/10] Regenerating listening_p5 from listening_hub.js instructions & audio_script...');
if (lh.listening_p5) {
  // Generate individual instruction MP3s from instructions array (skipping example inst_0)
  const scoredInsts = (lh.listening_p5.instructions || []).filter(i => !i.isExample);
  for (let idx = 0; idx < scoredInsts.length; idx++) {
    const inst = scoredInsts[idx];
    const text = inst.text || `Color the ${inst.item} ${inst.color || 'blue'}`;
    save(`listening_p5_inst${idx + 1}.mp3`, await tts(text, VOICE_F, 0.88));
  }
  // Full composite passage from audio_script
  if (lh.listening_p5.audio_script) {
    // Parse turns or synthesize script directly
    const lines = lh.listening_p5.audio_script.split('\n').filter(l => l.trim());
    const turns = lines.map(line => {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const speaker = match[1].toLowerCase();
        return { speaker: (speaker === 'man' || speaker === 'boy') ? 'man' : 'woman', text: match[2] };
      }
      return { speaker: 'woman', text: line };
    });
    save('listening_p5_full.mp3', await generateDialogueAudio(turns, 0.88));
  }
}

// ─── 10. exam_intro_S2.mp3 from speaking_hub.js ───────────────────────────
console.log('\n[10/10] Regenerating exam_intro_S2.mp3 from speaking_hub.js dialogue_script...');
if (sh.info_exchange_cards?.dialogue_script) {
  save('exam_intro_S2.mp3', await generateDialogueAudio(sh.info_exchange_cards.dialogue_script, 0.88));
}

console.log('\n══════════════════════════════════════════════');
console.log('Authoritative Source-of-Truth Audio Generation COMPLETE — Week 33');
console.log('All audio synthesized directly from hub data files.');
console.log('══════════════════════════════════════════════\n');
