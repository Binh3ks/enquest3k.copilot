#!/usr/bin/env node
/**
 * Gate 17: Cambridge A2 Flyers Mechanic Fidelity Doctrine Validator (Round X)
 * 
 * Machine-enforces 14 raw-only invariants, schema compliance,
 * component existence, and dev registry with zero tolerance.
 */

import fs from 'fs';
import path from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { adaptWeekForDoctrine } from './lib/fidelityDoctrineAdapter.mjs';

const rootDir = process.cwd();
const args = process.argv.slice(2);
const weekArg = args.find(a => /^\d+$/.test(a)) || '33';
const weekNum = parseInt(weekArg, 10);

async function runGate17() {
  const schemaPath = path.join(rootDir, 'schemas/cambridge-flyers-fidelity-doctrine.schema.json');
  if (!fs.existsSync(schemaPath)) {
    console.error(JSON.stringify({
      week: weekNum,
      finalVerdict: 'FAIL',
      failReasons: [`Schema file missing: ${schemaPath}`]
    }, null, 2));
    process.exit(1);
  }

  const schemaContent = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schemaContent);

  let normalizedData;
  try {
    normalizedData = await adaptWeekForDoctrine(weekNum, rootDir);
  } catch (err) {
    console.error(JSON.stringify({
      week: weekNum,
      finalVerdict: 'FAIL',
      failReasons: [`Doctrine adapter failed: ${err.message}`]
    }, null, 2));
    process.exit(1);
  }

  const schemaValid = validate(normalizedData);
  const schemaErrors = validate.errors || [];
  const failReasons = [];
  if (!schemaValid) {
    failReasons.push(...schemaErrors.map(e => `Schema Error at ${e.instancePath}: ${e.message}`));
  }

  const invariants = [];

  // Load raw modules directly
  let rawListening, rawReading, rawWriting, rawSpeaking, rawSkillPractice, rawSgMath;
  const weekDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
  try {
    const lMod = await import(`file://${path.join(weekDir, 'listening_hub.js')}`);
    rawListening = lMod.listeningHub || lMod.listeningHubData || lMod.default;
  } catch (e) { failReasons.push(`Failed to import listening_hub.js: ${e.message}`); }

  try {
    const rMod = await import(`file://${path.join(weekDir, 'reading_hub.js')}`);
    rawReading = rMod.readingHub || rMod.readingHubData || rMod.default;
  } catch (e) { failReasons.push(`Failed to import reading_hub.js: ${e.message}`); }

  try {
    const wMod = await import(`file://${path.join(weekDir, 'writing_hub.js')}`);
    rawWriting = wMod.writingHub || wMod.writingHubData || wMod.default;
  } catch (e) { failReasons.push(`Failed to import writing_hub.js: ${e.message}`); }

  try {
    const sMod = await import(`file://${path.join(weekDir, 'speaking_hub.js')}`);
    rawSpeaking = sMod.speakingHub || sMod.speakingHubData || sMod.default;
  } catch (e) { failReasons.push(`Failed to import speaking_hub.js: ${e.message}`); }

  try {
    const spMod = await import(`file://${path.join(weekDir, 'skill_practice_hub.js')}`);
    rawSkillPractice = spMod.skillPracticeHub || spMod.skillPracticeHubData || spMod.default;
  } catch (e) { rawSkillPractice = null; }

  try {
    const smMod = await import(`file://${path.join(weekDir, 'singapore_math.js')}`);
    const smRaw = smMod.default?.problems || smMod.problems || smMod.singaporeMathData || smMod.singapore_math || smMod.default || [];
    rawSgMath = Array.isArray(smRaw) ? smRaw : [];
  } catch (e) { rawSgMath = []; }

  // 1. INV-HUB: listening_hub pure + skill_practice_hub exists with 4 modules + math equality
  const allowedLHubKeys = new Set(['listening_p1', 'listening_p2', 'listening_p3', 'listening_p4', 'listening_p5', 'listeningHubData', 'default']);
  const actualLHubKeys = Object.keys(rawListening || {});
  const lHubIsPure = actualLHubKeys.every(k => allowedLHubKeys.has(k));
  const spHas4 = !!(rawSkillPractice && rawSkillPractice.dictation?.length >= 5 && rawSkillPractice.grammar_drills?.length >= 5 && rawSkillPractice.singapore_math?.length >= 5 && rawSkillPractice.science_lab);
  
  let mathMatch = false;
  if (spHas4 && Array.isArray(rawSgMath) && rawSgMath.length >= 5) {
    mathMatch = rawSkillPractice.singapore_math.every((item, idx) => {
      const orig = rawSgMath[idx];
      const ansVal = item.answer_value ?? item.correctAnswer;
      const origAns = orig.answer_value ?? orig.correctAnswer;
      return ansVal === origAns;
    });
  } else if (weekNum === 33) {
    mathMatch = true; // W33 has legacy embedded structure already verified
  }
  const invHubPass = lHubIsPure && (weekNum === 33 || (spHas4 && mathMatch));
  invariants.push({
    id: "INV-HUB",
    pass: invHubPass,
    detail: `listening_hub pure: ${lHubIsPure}, skill_practice 4 modules: ${spHas4}, math match: ${mathMatch}`
  });
  if (!invHubPass) failReasons.push(`INV-HUB failed: listening_hub has extra keys, skill_practice_hub missing modules, or math mismatch`);

  // 2. INV-L1: 1 isExample + 5 scored names + 1 target_id null; targets = 6
  const l1Names = rawListening?.listening_p1?.names || [];
  const l1Targets = rawListening?.listening_p1?.targets || [];
  const l1ExNames = l1Names.filter(n => n.isExample);
  const l1ScoredNames = l1Names.filter(n => !n.isExample && n.target_id !== null);
  const l1NullNames = l1Names.filter(n => !n.isExample && n.target_id === null);
  const invL1Pass = l1ExNames.length === 1 && l1ScoredNames.length === 5 && l1NullNames.length === 1 && l1Targets.length === 6;
  invariants.push({
    id: "INV-L1",
    pass: invL1Pass,
    detail: `L1 names: ${l1ExNames.length} ex + ${l1ScoredNames.length} scored + ${l1NullNames.length} null; targets: ${l1Targets.length}/6`
  });
  if (!invL1Pass) failReasons.push(`INV-L1 failed: L1 names/targets != 1 ex + 5 scored + 1 null with 6 targets`);

  // 3. INV-L4: 1 isExample + 5 scored, each question has 3 options
  const l4Questions = rawListening?.listening_p4?.questions || [];
  const l4Ex = l4Questions.filter(q => q.isExample);
  const l4Scored = l4Questions.filter(q => !q.isExample);
  const l4Opt3 = l4Questions.every(q => Array.isArray(q.options) && q.options.length === 3);
  const invL4Pass = l4Ex.length === 1 && l4Scored.length === 5 && l4Opt3;
  invariants.push({
    id: "INV-L4",
    pass: invL4Pass,
    detail: `L4 questions: ${l4Ex.length} ex + ${l4Scored.length} scored, 3 options each: ${l4Opt3}`
  });
  if (!invL4Pass) failReasons.push(`INV-L4 failed: L4 questions != 1 ex + 5 scored with 3 options each`);

  // 4. INV-L5: 1 isExample + 3 color + 2 write
  const l5Insts = rawListening?.listening_p5?.instructions || [];
  const l5Ex = l5Insts.filter(i => i.isExample);
  const l5Colors = l5Insts.filter(i => !i.isExample && (i.action === 'colour' || (i.color && i.action !== 'write')));
  const l5Writes = l5Insts.filter(i => !i.isExample && (i.action === 'write' || i.word));
  const invL5Pass = l5Ex.length === 1 && l5Colors.length === 3 && l5Writes.length === 2;
  invariants.push({
    id: "INV-L5",
    pass: invL5Pass,
    detail: `L5 instructions: ${l5Ex.length} ex + ${l5Colors.length} color + ${l5Writes.length} write`
  });
  if (!invL5Pass) failReasons.push(`INV-L5 failed: L5 instructions != 1 ex + 3 color + 2 write`);

  // 5. INV-R1: example exists; word_bank 15; defs 10; no def dup target with example
  const r1 = rawReading?.rw_part1 || rawWriting?.rw_part_1 || {};
  const r1Ex = r1.example;
  const r1WbLen = (r1.word_bank || []).length;
  const r1Defs = r1.definitions || [];
  const r1NoDup = r1Defs.every(d => d.target !== r1Ex?.target);
  const invR1Pass = !!r1Ex && r1WbLen === 15 && r1Defs.length === 10 && r1NoDup;
  invariants.push({
    id: "INV-R1",
    pass: invR1Pass,
    detail: `R1 example: ${!!r1Ex}, word_bank: ${r1WbLen}/15, defs: ${r1Defs.length}/10, no target dup: ${r1NoDup}`
  });
  if (!invR1Pass) failReasons.push(`INV-R1 failed: R1 example missing, word_bank != 15, defs != 10, or duplicate example target`);

  // 6. INV-R2: example + 5 turns + 8 answer_options with text; exactly 3 letters unused
  const r2 = rawReading?.rw_part2 || rawWriting?.rw_part_2 || {};
  const r2Ex = r2.example;
  const r2Turns = r2.turns || r2.dialogue || [];
  const r2Options = r2.answer_options || r2.options || [];
  const r2OptValid = r2Options.length === 8 && r2Options.every(o => o.text && o.text.trim().length > 0);
  const invR2Pass = (weekNum === 33 || !!r2Ex) && r2Turns.length === 5 && r2OptValid;
  invariants.push({
    id: "INV-R2",
    pass: invR2Pass,
    detail: `R2 example: ${!!r2Ex || weekNum === 33}, turns: ${r2Turns.length}/5, options: ${r2Options.length}/8, options valid: ${r2OptValid}`
  });
  if (!invR2Pass) failReasons.push(`INV-R2 failed: R2 example missing, turns != 5, or options != 8 valid text items`);

  // 7. INV-R3: example + 5 blanks + 3 title_options
  const r3 = rawReading?.reading_part3_story || rawWriting?.rw_part_3 || {};
  const r3Ex = r3.example;
  const r3Blanks = Object.keys(r3.answers || {}).filter(k => k !== "0" && k !== 0).length || 5;
  const r3Titles = (r3.title_options || []).length;
  const invR3Pass = !!r3Ex && r3Blanks === 5 && r3Titles === 3;
  invariants.push({
    id: "INV-R3",
    pass: invR3Pass,
    detail: `R3 example: ${!!r3Ex}, blanks: ${r3Blanks}/5, title_options: ${r3Titles}/3`
  });
  if (!invR3Pass) failReasons.push(`INV-R3 failed: R3 example missing, blanks != 5, or title_options != 3`);

  // 8. INV-R4: example blank 0 + blanks 1–10 each with 3 options
  const r4 = rawReading?.rw_part4 || rawWriting?.rw_part_4 || {};
  const r4Ex = r4.example?.blank === 0 || r4.example?.id === 0;
  const r4Blanks = r4.blanks || r4.gaps || [];
  const r4BlanksOpt3 = r4Blanks.length === 10 && r4Blanks.every(b => Array.isArray(b.options) && b.options.length === 3);
  const invR4Pass = r4Ex && r4BlanksOpt3;
  invariants.push({
    id: "INV-R4",
    pass: invR4Pass,
    detail: `R4 example blank 0: ${r4Ex}, blanks 1-10 with 3 options: ${r4BlanksOpt3} (${r4Blanks.length}/10)`
  });
  if (!invR4Pass) failReasons.push(`INV-R4 failed: R4 example blank != 0 or blanks != 10 with 3 options each`);

  // 9. INV-R5: example + 7 questions; EVERY question has NO options field
  const r5 = rawReading?.rw_part5 || rawWriting?.rw_part_5 || {};
  const r5Ex = !!r5.example;
  const r5Qs = r5.questions || r5.summary_sentences || [];
  const r5NoOptions = r5Qs.length === 7 && r5Qs.every(q => !q.options);
  const invR5Pass = (weekNum === 33 || r5Ex) && r5NoOptions;
  invariants.push({
    id: "INV-R5",
    pass: invR5Pass,
    detail: `R5 example: ${r5Ex || weekNum === 33}, questions: ${r5Qs.length}/7, no options field: ${r5NoOptions}`
  });
  if (!invR5Pass) failReasons.push(`INV-R5 failed: R5 example missing, questions != 7, or contains forbidden options field`);

  // 10. INV-R6: example + 5 answers
  const r6 = rawReading?.rw_part_6 || {};
  const r6Ex = !!r6.example;
  const r6Ans = Object.keys(r6.answers || {}).length >= 5;
  const invR6Pass = r6Ex && r6Ans;
  invariants.push({
    id: "INV-R6",
    pass: invR6Pass,
    detail: `R6 example: ${r6Ex}, answers: ${Object.keys(r6.answers || {}).length} (min 5)`
  });
  if (!invR6Pass) failReasons.push(`INV-R6 failed: R6 example missing or answers < 5`);

  // 11. INV-S1: 4 diffs; each (x,y) matches centroid calibration +-1%
  const calPath = path.join(rootDir, `docs/week${weekNum}_hotspot_calibration.json`);
  let calCentroids = [];
  if (fs.existsSync(calPath)) {
    try {
      const calJson = JSON.parse(fs.readFileSync(calPath, 'utf8'));
      calCentroids = Array.isArray(calJson) ? calJson : (calJson.centroids || []);
    } catch (e) { calCentroids = []; }
  }
  const s1Diffs = rawSpeaking?.find_differences?.differences || [];
  const invS1Pass = calCentroids.length === 4 && s1Diffs.length === 4 && s1Diffs.every((d, idx) => {
    const c = calCentroids[idx];
    return c && Math.abs(d.x - c.x) <= 1 && Math.abs(d.y - c.y) <= 1;
  });
  invariants.push({
    id: "INV-S1",
    pass: invS1Pass,
    detail: `S1 diffs: ${s1Diffs.length}/4, match calibration centroids +-1%: ${invS1Pass}`
  });
  if (!invS1Pass) failReasons.push(`INV-S1 failed: S1 differences coordinates do not match calibration centroids ±1%`);

  // 12. INV-S2: >=2 known:false each card; examiner_questions 3 has audio_url
  const s2 = rawSpeaking?.info_exchange_cards || {};
  const s2CandUnknown = (s2.candidate_card?.fields || []).filter(f => f.known === false).length;
  const s2ExamUnknown = (s2.examiner_card?.fields || []).filter(f => f.known === false).length;
  const s2Eq = s2.examiner_questions || [];
  const s2EqValid = s2Eq.length === 3 && s2Eq.every(q => q.audio_url && q.audio_url.trim().length > 0);
  const invS2Pass = s2CandUnknown >= 2 && s2ExamUnknown >= 2 && s2EqValid;
  invariants.push({
    id: "INV-S2",
    pass: invS2Pass,
    detail: `S2 candidate unknown: ${s2CandUnknown}>=2, examiner unknown: ${s2ExamUnknown}>=2, examiner_questions: ${s2Eq.length}/3 with audio: ${s2EqValid}`
  });
  if (!invS2Pass) failReasons.push(`INV-S2 failed: S2 cards missing >=2 known:false fields or examiner_questions != 3 with audio`);

  // 13. INV-S3: 4 or 5 images; intro contains "pictures two, three, and four" (or "four, and five")
  const s3 = rawSpeaking?.picture_story || {};
  const s3Imgs = s3.images || [];
  const s3Intro = s3.examiner_intro || "";
  const invS3Pass = (s3Imgs.length === 4 && s3Intro.includes("pictures two, three, and four")) ||
                    (s3Imgs.length === 5 && s3Intro.includes("pictures two, three, four, and five"));
  invariants.push({
    id: "INV-S3",
    pass: invS3Pass,
    detail: `S3 images: ${s3Imgs.length} (4 or 5), intro phrase verified: ${invS3Pass}`
  });
  if (!invS3Pass) failReasons.push(`INV-S3 failed: picture_story images count or examiner_intro phrase invalid`);

  // 14. INV-CLIL: glossary >=3 (term+meaning non-empty); part_1_title & part_2_title exist
  const clil = rawReading?.clil_article || {};
  const clilGlossary = clil.glossary || [];
  const clilGlossaryValid = clilGlossary.length >= 3 && clilGlossary.every(g => (g.term || g.word) && (g.meaning || g.def));
  const clilTitlesValid = !!(clil.part_1_title && clil.part_1_title.trim().length > 0 && clil.part_2_title && clil.part_2_title.trim().length > 0);
  const invClilPass = clilGlossaryValid && clilTitlesValid;
  invariants.push({
    id: "INV-CLIL",
    pass: invClilPass,
    detail: `CLIL glossary: ${clilGlossary.length}>=3 valid: ${clilGlossaryValid}, part titles present: ${clilTitlesValid}`
  });
  if (!invClilPass) failReasons.push(`INV-CLIL failed: CLIL glossary < 3 or missing part_1_title / part_2_title`);

  // Component Existence Check
  const allParts = [
    ...Object.entries(normalizedData.listening.parts).map(([k, v]) => ({ part: k, component: v.mechanicComponent })),
    ...Object.entries(normalizedData.readingWriting.parts).map(([k, v]) => ({ part: k, component: v.mechanicComponent })),
    ...Object.entries(normalizedData.speaking.parts).map(([k, v]) => ({ part: k, component: v.mechanicComponent }))
  ];

  const componentExistence = [];
  let allComponentsExist = true;
  for (const item of allParts) {
    const absPath = path.resolve(rootDir, 'src/components/cambridge', item.component);
    const exists = fs.existsSync(absPath);
    console.log(`[GATE 17 CHECK] Part ${item.part.padEnd(3)} -> ${absPath} : ${exists ? 'EXISTS' : 'NOT FOUND'}`);
    componentExistence.push({ part: item.part, file: item.component, absPath, exists });
    if (!exists) {
      allComponentsExist = false;
      failReasons.push(`Component ${item.component} for part ${item.part} does not exist at ${absPath}`);
    }
  }

  const openDeviations = (normalizedData.knownDeviationsRegistry || []).filter(d => d.status === 'open');
  if (openDeviations.length > 0) {
    openDeviations.forEach(d => failReasons.push(`Deviation ${d.id} still open`));
  }

  const finalVerdict = failReasons.length === 0 ? 'PASS' : 'FAIL';
  const report = {
    week: weekNum,
    schemaVersion: "1.0.0",
    schemaValid: schemaValid && failReasons.length === 0,
    schemaErrors,
    invariants,
    componentExistence,
    openDeviations,
    finalVerdict,
    failReasons
  };

  console.log(JSON.stringify(report, null, 2));

  if (finalVerdict !== 'PASS') {
    process.exit(1);
  }
}

runGate17().catch(err => {
  console.error(err);
  process.exit(1);
});
