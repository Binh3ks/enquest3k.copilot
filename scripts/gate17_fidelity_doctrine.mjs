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

  // INV-7: speaking.S4.mustExistAsStandaloneObject === true
  const s4 = normalizedData.speaking.parts.S4;
  const inv7Pass = s4.mustExistAsStandaloneObject === true && s4.scoredQuestionCount >= 3 && s4.scoredQuestionCount <= 5;
  invariants.push({
    id: "INV-7",
    pass: inv7Pass,
    detail: `S4 standalone object verified: ${s4.mustExistAsStandaloneObject}, questionCount: ${s4.scoredQuestionCount} in [3,5]`
  });
  if (!inv7Pass) failReasons.push(`INV-7 failed: S4 standalone object or question count outside [3,5]`);

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
