#!/usr/bin/env node
/**
 * validate_hub_structure.mjs — Golden Standard v1.0 Gates S1–S8, A3–A7
 *
 * Usage: node scripts/validate_hub_structure.mjs <weekNum>
 * Exit 1 = CRITICAL gate failure (blocks generation).
 * Exit 0 = all CRITICAL gates pass.
 */
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const weekNum = process.argv[2];
if (!weekNum) { console.error('Usage: node validate_hub_structure.mjs <weekNum>'); process.exit(1); }

const weekDir = path.resolve(`src/data/weeks/week_${weekNum}`);
let criticalFails = 0;
let highFails = 0;

function fail(gate, msg) {
  console.error(`  ❌ [${gate}] CRITICAL: ${msg}`);
  criticalFails++;
}
function warn(gate, msg) {
  console.warn(`  ⚠️  [${gate}] HIGH: ${msg}`);
  highFails++;
}
function pass(gate, msg) {
  console.log(`  ✅ [${gate}] ${msg}`);
}

// ── Gate S1: Hub files load ────────────────────────────────────────────────
console.log('\n[Gate S1] Hub files load without error');
const hubs = {};
const hubFiles = {
  listening: `listening_hub.js`,
  reading:   `reading_hub.js`,
  speaking:  `speaking_hub.js`,
  writing:   `writing_hub.js`,
};
for (const [key, file] of Object.entries(hubFiles)) {
  const filePath = path.join(weekDir, file);
  if (!fs.existsSync(filePath)) {
    warn('S1', `${file} missing`);
    continue;
  }
  try {
    const mod = await import(pathToFileURL(filePath).href);
    hubs[key] = mod.default || mod.listeningHub || mod.listeningHubData ||
                mod.readingHub || mod.speakingHub || mod.writingHub || mod;
    pass('S1', `${file} loaded`);
  } catch (e) {
    fail('S1', `${file} failed to load: ${e.message}`);
  }
}

const lh = hubs.listening;
if (!lh) { fail('S1', 'listening_hub.js did not export valid data'); }

// ── Gate S3: dialogue_script[] structure ──────────────────────────────────
console.log('\n[Gate S3] dialogue_script[] validity');
function validateDialogue(ds, taskId) {
  if (!Array.isArray(ds)) { fail('S3', `${taskId}: dialogue_script is not an array`); return; }
  if (ds.length < 2)       { fail('S3', `${taskId}: dialogue_script has < 2 turns (got ${ds.length})`); return; }
  ds.forEach((turn, i) => {
    if (!turn.speaker) fail('S3', `${taskId} turn ${i}: missing speaker field`);
    if (!turn.text)    fail('S3', `${taskId} turn ${i}: missing text field`);
  });
  pass('S3', `${taskId}: dialogue_script valid (${ds.length} turns)`);
}

// Gate S4: required_speakers present
function validateRequiredSpeakers(ds, required, taskId) {
  const present = new Set((ds||[]).map(t => t.speaker?.toLowerCase()));
  (required||[]).forEach(req => {
    if (!present.has(req)) fail('S4', `${taskId}: required speaker '${req}' not found in dialogue_script`);
    else pass('S4', `${taskId}: speaker '${req}' present`);
  });
}

// Gate S5: no speaker labels in text
function checkNoLabels(text, taskId) {
  if (/\b(Man|Woman|Girl|Boy|Speaker\s*\d)\s*:/.test(text)) {
    fail('S5', `${taskId}: raw speaker label found in text: "${text.slice(0,80)}"`);
    return false;
  }
  return true;
}

if (lh) {
  // L2
  console.log('\n[Gate S3/S4/S5] L2 dialogue_script');
  const p2 = lh.listening_p2;
  if (p2?.dialogue_script) {
    validateDialogue(p2.dialogue_script, 'L2');
    validateRequiredSpeakers(p2.dialogue_script, p2.required_speakers, 'L2');
    p2.dialogue_script.forEach((t,i) => checkNoLabels(t.text||'', `L2 turn ${i}`));
  } else {
    fail('S3', 'L2: dialogue_script missing');
  }

  // L4
  console.log('\n[Gate S3/S4/S5] L4 questions');
  (lh.listening_p4?.questions || []).forEach(q => {
    if (q.audio_script && !q.dialogue_script) {
      fail('S3', `${q.id}: has audio_script string but no dialogue_script[]`);
      checkNoLabels(q.audio_script, `${q.id}.audio_script`);
    } else if (q.dialogue_script) {
      validateDialogue(q.dialogue_script, q.id);
      q.dialogue_script.forEach((t,i) => checkNoLabels(t.text||'', `${q.id} turn ${i}`));
    } else if (!q.isExample) {
      fail('S3', `${q.id}: no dialogue_script and no audio_script`);
    }
  });

  // Gate S6: audio_text in L3 items
  console.log('\n[Gate S6] L3 items audio_text');
  (lh.listening_p3?.items || []).forEach(item => {
    if (item.audio_text) pass('S6', `L3 item ${item.id} (${item.name}): audio_text present`);
    else fail('S6', `L3 item ${item.id} (${item.name}): audio_text MISSING`);
  });

  // Gate S7: L4 uses dialogue_script, not audio_script string
  console.log('\n[Gate S7] L4 format (dialogue_script required)');
  let l4AudioScriptCount = 0;
  (lh.listening_p4?.questions || []).forEach(q => {
    if (q.audio_script && !q.dialogue_script) l4AudioScriptCount++;
  });
  if (l4AudioScriptCount > 0)
    fail('S7', `L4: ${l4AudioScriptCount} question(s) still use legacy audio_script string`);
  else
    pass('S7', 'L4: all questions use dialogue_script[]');
}

// ── Gate A1/A2: L4 answer distribution ───────────────────────────────────
console.log('\n[Gate A1/A2] L4 answer distribution');
if (lh?.listening_p4) {
  const scored = (lh.listening_p4.questions || []).filter(q => !q.isExample);
  const dist = {};
  scored.forEach(q => dist[q.answer] = (dist[q.answer]||0)+1);
  const letters = Object.keys(dist);
  const maxCount = Math.max(...Object.values(dist));
  const allSame = scored.length > 0 && letters.length === 1;

  console.log(`  Distribution: ${JSON.stringify(dist)}`);

  if (allSame) {
    fail('A1', `All ${scored.length} scored answers are "${letters[0]}" — answer leakage`);
  } else if (maxCount > 3) {
    warn('A1', `One letter appears ${maxCount} times — high clustering risk`);
  } else {
    pass('A1', `Answer distribution valid: ${JSON.stringify(dist)}`);
  }

  if (letters.length < 2) {
    fail('A2', `Only ${letters.length} distinct answer letter(s) — need ≥ 2`);
  } else {
    pass('A2', `${letters.length} distinct answer letters: [${letters.join(', ')}]`);
  }
}

// ── Gate A3: L3 item count ─────────────────────────────────────────────────
console.log('\n[Gate A3] L3 item count (8 cards, 5 scored, 1 example)');
if (lh?.listening_p3) {
  const items = lh.listening_p3.items || [];
  const cards = lh.listening_p3.cards || [];
  const ex = lh.listening_p3.example;

  if (items.length === 5) pass('A3', `L3: 5 scored items ✅`);
  else warn('A3', `L3: expected 5 scored items, got ${items.length}`);

  if (cards.length === 8) pass('A3', `L3: 8 option cards (A–H) ✅`);
  else warn('A3', `L3: expected 8 cards, got ${cards.length}`);

  if (ex) pass('A3', 'L3: example present ✅');
  else warn('A3', 'L3: example missing');
}

// ── Gate A4: L2 fields ────────────────────────────────────────────────────
console.log('\n[Gate A4] L2 answer fields (5 + 1 example)');
if (lh?.listening_p2) {
  const fields = lh.listening_p2.fields || [];
  const ex = lh.listening_p2.example;

  if (fields.length === 5) pass('A4', `L2: 5 answer fields ✅`);
  else warn('A4', `L2: expected 5 fields, got ${fields.length}`);

  if (ex) pass('A4', 'L2: example present ✅');
  else warn('A4', 'L2: example missing');
}

// ── Gate A5: L5 instruction counts ───────────────────────────────────────
console.log('\n[Gate A5] L5 colour (3) + write (2) + example (1)');
if (lh?.listening_p5) {
  const insts = (lh.listening_p5.instructions || []).filter(i => !i.isExample);
  const colours = insts.filter(i => i.action === 'colour' || i.color);
  const writes  = insts.filter(i => i.action === 'write' || i.word);
  const ex = lh.listening_p5.instructions?.find(i => i.isExample);

  if (colours.length === 3) pass('A5', `L5: 3 colour instructions ✅`);
  else warn('A5', `L5: expected 3 colour, got ${colours.length}`);

  if (writes.length === 2) pass('A5', `L5: 2 write instructions ✅`);
  else warn('A5', `L5: expected 2 write, got ${writes.length}`);

  if (ex) pass('A5', 'L5: example present ✅');
  else warn('A5', 'L5: example missing');
}

// ── Final summary ─────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════════');
console.log(`GATE RESULTS — Week ${weekNum}`);
console.log(`  🔴 CRITICAL failures: ${criticalFails}`);
console.log(`  ⚠️  HIGH failures:     ${highFails}`);
if (criticalFails === 0 && highFails === 0) {
  console.log('  ✅ ALL GATES PASS');
} else if (criticalFails > 0) {
  console.log('  ❌ CRITICAL GATE FAILURES — generation BLOCKED');
}
console.log('══════════════════════════════════════════════\n');

process.exit(criticalFails > 0 ? 1 : 0);
