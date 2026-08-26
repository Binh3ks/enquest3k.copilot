#!/usr/bin/env node
/**
 * Gate 17: Cambridge A2 Flyers Mechanic Fidelity Doctrine Validator
 * 
 * Machine-enforces JSON Schema validation, 8 runtime invariants,
 * component existence checks, and known deviations registry checks.
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

  // Runtime Invariants (INV-1 through INV-8)
  const invariants = [];

  // INV-1: sum(listening.parts.*.scoredQuestionCount) === 25
  const lParts = Object.values(normalizedData.listening.parts);
  const lScoreSum = lParts.reduce((sum, p) => sum + (p.scoredQuestionCount || 0), 0);
  const inv1Pass = lScoreSum === 25;
  invariants.push({
    id: "INV-1",
    pass: inv1Pass,
    detail: `Listening scoredQuestionCount sum: ${lScoreSum}/25`
  });
  if (!inv1Pass) failReasons.push(`INV-1 failed: Listening sum is ${lScoreSum} (expected 25)`);

  // INV-2: sum(readingWriting.parts.*.scoredQuestionCount) === 44
  const rwParts = Object.values(normalizedData.readingWriting.parts);
  const rwScoreSum = rwParts.reduce((sum, p) => sum + (p.scoredQuestionCount || 0), 0);
  const inv2Pass = rwScoreSum === 44;
  invariants.push({
    id: "INV-2",
    pass: inv2Pass,
    detail: `Reading & Writing scoredQuestionCount sum: ${rwScoreSum}/44`
  });
  if (!inv2Pass) failReasons.push(`INV-2 failed: Reading & Writing sum is ${rwScoreSum} (expected 44)`);

  // INV-3: L5.colorInstructions + L5.writeInstructions === L5.scoredQuestionCount
  const l5 = normalizedData.listening.parts.L5;
  const l5InstructionSum = (l5.colorInstructions || 0) + (l5.writeInstructions || 0);
  const inv3Pass = l5InstructionSum === l5.scoredQuestionCount && l5.scoredQuestionCount === 5;
  invariants.push({
    id: "INV-3",
    pass: inv3Pass,
    detail: `L5 subCounts: ${l5.colorInstructions} color + ${l5.writeInstructions} write === ${l5.scoredQuestionCount} scored`
  });
  if (!inv3Pass) failReasons.push(`INV-3 failed: L5 instructions (${l5InstructionSum}) != scoredQuestionCount (${l5.scoredQuestionCount})`);

  // INV-4: R3.gapFillQuestions + R3.titleChoiceQuestions === R3.scoredQuestionCount
  const r3 = normalizedData.readingWriting.parts.R3;
  const r3Sum = (r3.gapFillQuestions || 0) + (r3.titleChoiceQuestions || 0);
  const inv4Pass = r3Sum === r3.scoredQuestionCount && r3.scoredQuestionCount === 6;
  invariants.push({
    id: "INV-4",
    pass: inv4Pass,
    detail: `R3 subCounts: ${r3.gapFillQuestions} gaps + ${r3.titleChoiceQuestions} title === ${r3.scoredQuestionCount} scored`
  });
  if (!inv4Pass) failReasons.push(`INV-4 failed: R3 subcounts (${r3Sum}) != scoredQuestionCount (${r3.scoredQuestionCount})`);

  // INV-5: examMeta.totalParts === 16
  const totalParts = normalizedData.examMeta?.totalParts;
  const inv5Pass = totalParts === 16;
  invariants.push({
    id: "INV-5",
    pass: inv5Pass,
    detail: `examMeta.totalParts: ${totalParts} (16 required)`
  });
  if (!inv5Pass) failReasons.push(`INV-5 failed: totalParts is ${totalParts} (expected 16)`);

  // INV-6: speaking.S1.hotspotCoordinateSource === 'calibration-file-derived'
  const s1 = normalizedData.speaking.parts.S1;
  const inv6Pass = s1.hotspotCoordinateSource === 'calibration-file-derived';
  invariants.push({
    id: "INV-6",
    pass: inv6Pass,
    detail: `S1 hotspotCoordinateSource: ${s1.hotspotCoordinateSource}`
  });
  if (!inv6Pass) failReasons.push(`INV-6 failed: S1 hotspotCoordinateSource is '${s1.hotspotCoordinateSource}' (build fails on 'hardcoded-literal')`);

  // Direct Raw Data Invariants (W5 - No Adapter Fallback)
  let rawListening, rawSpeaking;
  try {
    const lMod = await import(`file://${path.resolve(rootDir, `src/data/weeks/week_${weekNum}/listening_hub.js`)}`);
    rawListening = lMod.listeningHub || lMod.listeningHubData || lMod.default;
    const sMod = await import(`file://${path.resolve(rootDir, `src/data/weeks/week_${weekNum}/speaking_hub.js`)}`);
    rawSpeaking = sMod.speakingHub || sMod.speakingHubData || sMod.default;
  } catch (e) {
    failReasons.push(`Failed to import raw data for week ${weekNum}: ${e.message}`);
  }

  if (rawListening) {
    // INV-L1: names has exactly 1 isExample + 5 scored targets + 1 distractor
    const names = rawListening.listening_p1?.names || [];
    const l1Examples = names.filter(n => n.isExample);
    const l1Targets = names.filter(n => !n.isExample && n.target_id !== null);
    const l1Distractors = names.filter(n => !n.isExample && n.target_id === null);
    const invL1Pass = l1Examples.length === 1 && l1Targets.length === 5 && l1Distractors.length === 1;
    invariants.push({
      id: "INV-L1",
      pass: invL1Pass,
      detail: `L1 raw names: ${l1Examples.length} example + ${l1Targets.length} scored + ${l1Distractors.length} distractor (total ${names.length})`
    });
    if (!invL1Pass) failReasons.push(`INV-L1 failed: raw L1 names (${names.length}) != 1 example + 5 scored + 1 distractor`);

    // INV-L4: raw questions has exactly 1 isExample + 5 scored, each with 3 options
    const l4Questions = rawListening.listening_p4?.questions || [];
    const l4Examples = l4Questions.filter(q => q.isExample);
    const l4Scored = l4Questions.filter(q => !q.isExample);
    const l4AllHave3Options = l4Questions.every(q => Array.isArray(q.options) && q.options.length === 3);
    const invL4Pass = l4Examples.length === 1 && l4Scored.length === 5 && l4AllHave3Options;
    invariants.push({
      id: "INV-L4",
      pass: invL4Pass,
      detail: `L4 raw questions: ${l4Examples.length} example + ${l4Scored.length} scored (3 options each: ${l4AllHave3Options})`
    });
    if (!invL4Pass) failReasons.push(`INV-L4 failed: raw L4 questions != 1 example + 5 scored, or not all have 3 options`);

    // INV-L5: raw instructions has exactly 1 isExample + 3 color + 2 write
    const l5Instructions = rawListening.listening_p5?.instructions || [];
    const l5Examples = l5Instructions.filter(i => i.isExample);
    const l5Colors = l5Instructions.filter(i => !i.isExample && (i.action === 'colour' || i.color));
    const l5Writes = l5Instructions.filter(i => !i.isExample && (i.action === 'write' || i.word));
    const invL5Pass = l5Examples.length === 1 && l5Colors.length === 3 && l5Writes.length === 2;
    invariants.push({
      id: "INV-L5",
      pass: invL5Pass,
      detail: `L5 raw instructions: ${l5Examples.length} example + ${l5Colors.length} color + ${l5Writes.length} write`
    });
    if (!invL5Pass) failReasons.push(`INV-L5 failed: raw L5 instructions != 1 example + 3 color + 2 write`);
  }

  if (rawSpeaking) {
    // INV-S1: differences[].x/y match calibration centroids +-1%, calibration file exists and has 4 clusters
    const calPath = path.join(rootDir, `docs/week${weekNum}_hotspot_calibration.json`);
    let calCentroids = [];
    if (fs.existsSync(calPath)) {
      try {
        const calJson = JSON.parse(fs.readFileSync(calPath, 'utf8'));
        calCentroids = Array.isArray(calJson) ? calJson : (calJson.centroids || []);
      } catch (e) {
        calCentroids = [];
      }
    }
    const diffs = rawSpeaking.find_differences?.differences || [];
    const calPass = calCentroids.length === 4 && diffs.length === 4 && diffs.every((d, idx) => {
      const c = calCentroids[idx];
      return c && Math.abs(d.x - c.x) <= 1 && Math.abs(d.y - c.y) <= 1;
    });
    invariants.push({
      id: "INV-S1",
      pass: calPass,
      detail: `S1 differences centroids match calibration: ${calPass} (diffs: ${diffs.length}, cal: ${calCentroids.length})`
    });
    if (!calPass) failReasons.push(`INV-S1 failed: differences coordinates do not match calibration centroids ±1%`);

    // INV-S3: picture_story.images.length === 4 and examiner_intro says "pictures two, three, and four"
    const psImages = rawSpeaking.picture_story?.images || [];
    const psIntro = rawSpeaking.picture_story?.examiner_intro || "";
    const invS3Pass = psImages.length === 4 && psIntro.includes("pictures two, three, and four");
    invariants.push({
      id: "INV-S3",
      pass: invS3Pass,
      detail: `S3 picture story: ${psImages.length} images, examiner_intro contains 'pictures two, three, and four': ${invS3Pass}`
    });
    if (!invS3Pass) failReasons.push(`INV-S3 failed: picture_story images (${psImages.length}) != 4 or examiner_intro missing required phrase`);
  }

  // INV-8: Component existence check
  const componentExistence = [];
  const allParts = [
    ...Object.entries(normalizedData.listening.parts).map(([k, v]) => ({ part: k, component: v.mechanicComponent })),
    ...Object.entries(normalizedData.readingWriting.parts).map(([k, v]) => ({ part: k, component: v.mechanicComponent })),
    ...Object.entries(normalizedData.speaking.parts).map(([k, v]) => ({ part: k, component: v.mechanicComponent }))
  ];

  let allComponentsExist = true;
  for (const item of allParts) {
    const absPath = path.resolve(rootDir, 'src/components/cambridge', item.component);
    const exists = fs.existsSync(absPath);
    console.log(`[GATE 17 CHECK] Part ${item.part.padEnd(3)} -> ${absPath} : ${exists ? 'EXISTS' : 'NOT FOUND'}`);
    componentExistence.push({
      part: item.part,
      file: item.component,
      absPath,
      exists
    });
    if (!exists) {
      allComponentsExist = false;
      failReasons.push(`INV-8 failed: Component ${item.component} for part ${item.part} does not exist at ${absPath}`);
    }
  }

  invariants.push({
    id: "INV-8",
    pass: allComponentsExist,
    detail: `Component existence verified: ${allParts.length}/${allParts.length} present`
  });

  // Check known deviations registry
  const openDeviations = [];
  const deviationsRegistry = normalizedData.knownDeviationsRegistry || [];
  for (const dev of deviationsRegistry) {
    if (dev.status === 'open') {
      openDeviations.push(dev);
      failReasons.push(`Week ${weekNum} cannot be Flyers-compliant: ${dev.id} (${dev.severity}) still open for part ${dev.part}`);
    }
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
