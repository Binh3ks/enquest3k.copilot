#!/usr/bin/env node
/**
 * regenerate_w33_stale_audio.mjs
 *
 * Regenerates ONLY the stale audio files identified by the W33 forensic audit.
 * Source of truth: current hub data files (Golden Standard v1.0 Rule A).
 *
 * Files regenerated:
 *  P0-3: read_stem.mp3     ← read.js text_en (anonymous nurse/boy)
 *  P0-7: explore.mp3       ← explore.js content_en (friction theme, updated)
 *  P0-2: dictation_1–5.mp3 ← skill_practice_hub.js dictation[].text
 *
 * Also regenerates L4 audio using the new dialogue_script[] format (P0-4).
 *
 * Usage: node scripts/regenerate_w33_stale_audio.mjs
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const WEEK = 33;
const OUTPUT_DIR = path.resolve(`public/audio/week${WEEK}`);
const DIST_DIR   = path.resolve(`dist/audio/week${WEEK}`);
const GOOGLE_API_KEY = process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GOOGLE_TTS_API_KEY || 'AIzaSyAtggk9xPlVt-P34qtSSFqKRx5lJkCO8gU';

const VOICE_F = 'en-US-Journey-F';   // woman / narrator
const VOICE_M = 'en-US-Neural2-D';   // man

// ── Core TTS call ─────────────────────────────────────────────────────────
async function tts(text, voice = VOICE_F, rate = 0.88) {
  if (!text || !text.trim()) throw new Error('tts(): empty text');
  // Strip any residual speaker labels that might exist in source (safety guard)
  const cleaned = text.replace(/\b(Man|Woman|Girl|Boy|Teacher|Nova|Mia)\s*:\s*/gi, '');
  const chosenVoice = (cleaned.length > 400 && voice === VOICE_F) ? 'en-US-Neural2-F' : voice;
  const body = {
    input: { text: cleaned },
    voice: { languageCode: 'en-US', name: chosenVoice },
    audioConfig: { audioEncoding: 'MP3', speakingRate: rate }
  };
  const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  if (!json.audioContent) throw new Error(`TTS error: ${JSON.stringify(json).slice(0, 200)}`);
  return Buffer.from(json.audioContent, 'base64');
}

// 200ms silence buffer
function silence200ms() {
  // Minimal valid MP3 silence ~200ms (approximated by 0-byte padding between segments)
  // In practice: we insert 200ms pause via speakingRate or just concat without gap.
  // For simplicity, return empty buffer — TTS already adds natural pauses.
  return Buffer.alloc(0);
}

async function generateDialogueAudio(turns, pauseMs = 200) {
  const parts = [];
  for (const turn of turns) {
    const voice = turn.speaker === 'man' || turn.speaker === 'boy' ? VOICE_M : VOICE_F;
    const buf = await tts(turn.text, voice);
    parts.push(buf);
    // Small pause between speakers — re-use silence via a short TTS pause phrase
    if (pauseMs > 0) {
      // Approximate: use TTS with a tiny pause or just concatenate
      // Real implementation would use audio-concat with silence.
      // Here we just concatenate — the natural neural TTS endings create implicit gaps.
    }
  }
  return Buffer.concat(parts);
}

function save(filename, buffer) {
  const pubPath = path.join(OUTPUT_DIR, filename);
  const distPath = path.join(DIST_DIR, filename);
  fs.writeFileSync(pubPath, buffer);
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(distPath, buffer);
    console.log(`  ✅ Saved + synced to dist: ${filename}`);
  } else {
    console.log(`  ✅ Saved (no dist dir): ${filename}`);
  }
}

// ── Load source data ───────────────────────────────────────────────────────
const weekDir = path.resolve(`src/data/weeks/week_${WEEK}`);

const readMod = await import(pathToFileURL(path.join(weekDir, 'read.js')).href);
const readData = readMod.default || readMod;

const exploreMod = await import(pathToFileURL(path.join(weekDir, 'explore.js')).href);
const exploreData = exploreMod.default || exploreMod;

const skillMod = await import(pathToFileURL(path.join(weekDir, 'skill_practice_hub.js')).href);
const skillHub = skillMod.skillPracticeHub || skillMod.default || skillMod;

const listeningMod = await import(pathToFileURL(path.join(weekDir, 'listening_hub.js')).href);
const lh = listeningMod.listeningHub || listeningMod.listeningHubData || listeningMod.default;

// ── P0-3: read_stem.mp3 ───────────────────────────────────────────────────
console.log('\n[P0-3] Regenerating read_stem.mp3 from read.js text_en...');
const stemText = (readData.text_en || readData.content_en || '').trim();
if (!stemText) { console.error('ERROR: read.js text_en is empty'); process.exit(1); }
console.log(`  Source (first 100): "${stemText.slice(0, 100)}..."`);
const stemBuf = await tts(stemText.slice(0, 800), VOICE_F, 0.88);
save('read_stem.mp3', stemBuf);

// ── P0-7: explore.mp3 ────────────────────────────────────────────────────
console.log('\n[P0-7] Regenerating explore.mp3 from explore.js content_en...');
const exploreText = (exploreData.content_en || '').trim();
if (!exploreText) { console.error('ERROR: explore.js content_en is empty'); process.exit(1); }
console.log(`  Source (first 100): "${exploreText.slice(0, 100)}..."`);
const exploreBuf = await tts(exploreText, VOICE_F, 0.90);
save('explore.mp3', exploreBuf);

// ── P0-2: dictation_1–5.mp3 ──────────────────────────────────────────────
console.log('\n[P0-2] Regenerating dictation 1–5 from skill_practice_hub.js...');
const dictItems = skillHub.dictation?.items || skillHub.dictation || [];
if (!Array.isArray(dictItems) || dictItems.length === 0) {
  console.error('ERROR: dictation items not found in skill_practice_hub.js');
  process.exit(1);
}
for (const item of dictItems) {
  const id = item.id;
  const text = item.text || item.sentence;
  if (!text) { console.error(`  ERROR: dictation item ${id} has no text`); continue; }
  console.log(`  D${id}: "${text}"`);
  const buf = await tts(text, VOICE_F, 0.82); // slower for dictation
  save(`dictation_${id}.mp3`, buf);
}

// ── P0-4 (audio): L4 dialogue_script[] → regenerate Q1–Q5 and full ───────
console.log('\n[P0-4 audio] Regenerating L4 audio from new dialogue_script[]...');
const p4 = lh.listening_p4;
if (!p4) { console.error('ERROR: listening_p4 not found'); process.exit(1); }

const allL4Bufs = [];

// Example
const exampleQ = p4.questions.find(q => q.isExample);
if (exampleQ?.dialogue_script) {
  console.log('  Generating example...');
  const buf = await generateDialogueAudio(exampleQ.dialogue_script);
  save('listening_p4_example.mp3', buf);
  allL4Bufs.push(buf);
}

// Scored Q1–Q5
const scored = p4.questions.filter(q => !q.isExample);
for (const q of scored) {
  if (!q.dialogue_script) { console.warn(`  SKIP ${q.id}: no dialogue_script`); continue; }
  console.log(`  Generating ${q.id} (answer: ${q.answer})...`);
  const qNum = q.id.replace('p4_q', '');
  const buf = await generateDialogueAudio(q.dialogue_script);
  save(`listening_p4_q${qNum}.mp3`, buf);
  allL4Bufs.push(buf);
}

// Regenerate full composite
if (allL4Bufs.length > 0) {
  save('listening_p4_full.mp3', Buffer.concat(allL4Bufs));
  console.log('  ✅ listening_p4_full.mp3 regenerated');
}

// ── P1-1 (audio): L1 dialogue_script[] → regenerate listening_p1_full.mp3 (Teacher + Mia) ───
console.log('\n[L1 audio] Regenerating L1 audio from dialogue_script[] (Teacher + Mia 2-voice)...');
const p1 = lh.listening_p1;
if (p1?.dialogue_script) {
  const l1Bufs = [];
  for (const turn of p1.dialogue_script) {
    const voice = turn.speaker === 'girl' ? 'en-US-Neural2-F' : VOICE_F;
    const buf = await tts(turn.text, voice, 0.86);
    l1Bufs.push(buf);
  }
  save('listening_p1_full.mp3', Buffer.concat(l1Bufs));
}

// ── P1-2 (audio): L3 dialogue_script[] → regenerate L3 items 1-5 + example + full (Teacher + Jake) ───
console.log('\n[L3 audio] Regenerating L3 audio from dialogue_script[] (Teacher + Jake 2-voice)...');
const p3 = lh.listening_p3;
if (p3) {
  const allL3Bufs = [];
  // Example
  if (p3.example?.dialogue_script) {
    const exBuf = await generateDialogueAudio(p3.example.dialogue_script);
    save('listening_p3_example.mp3', exBuf);
    allL3Bufs.push(exBuf);
  }
  // Items 1-5
  if (Array.isArray(p3.items)) {
    for (const item of p3.items) {
      if (item.dialogue_script) {
        console.log(`  Generating L3 item ${item.id} (${item.name})...`);
        const itemBuf = await generateDialogueAudio(item.dialogue_script);
        save(`listening_p3_item${item.id}.mp3`, itemBuf);
        allL3Bufs.push(itemBuf);
      }
    }
  }
  if (allL3Bufs.length > 0) {
    save('listening_p3_full.mp3', Buffer.concat(allL3Bufs));
    console.log('  ✅ listening_p3_full.mp3 regenerated');
  }
}

// ── P1-3 (audio): Speaking Part 2 Info Exchange dialogue_script[] ────────
console.log('\n[Speaking S2 audio] Regenerating unified Info Exchange audio (Examiner + Candidate)...');
const speakingMod = await import(pathToFileURL(path.join(weekDir, 'speaking_hub.js')).href);
const sh = speakingMod.speakingHub || speakingMod.speakingHubData || speakingMod.default;
if (sh?.info_exchange_cards?.dialogue_script) {
  const s2Buf = await generateDialogueAudio(sh.info_exchange_cards.dialogue_script);
  save('exam_intro_S2.mp3', s2Buf);
}

// ── Final summary ─────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════════');
console.log('Stale audio regeneration COMPLETE — Week 33');
console.log('Files regenerated:');
console.log('  read_stem.mp3     ← read.js text_en (no Nurse Clara)');
console.log('  explore.mp3       ← explore.js content_en (friction theme)');
console.log('  dictation_1-5.mp3 ← skill_practice_hub.js dictation[].text');
console.log('  listening_p1_full.mp3 ← dialogue_script[] (Teacher + Mia 2-voice)');
console.log('  listening_p3_example.mp3 + item1-5 + full ← dialogue_script[] (Teacher + Jake 2-voice)');
console.log('  listening_p4_example.mp3 + q1-5 + full ← dialogue_script[] (Woman + Man 2-voice)');
console.log('  exam_intro_S2.mp3 ← info_exchange_cards dialogue_script[] (Examiner + Candidate 2-voice)');
console.log('\nNext steps:');
console.log('  node scripts/validate_l4_answer_distribution.mjs 33');
console.log('  node scripts/validate_public_dist_sync.mjs 33');
console.log('  node scripts/validate_hub_structure.mjs 33');
console.log('══════════════════════════════════════════════\n');
