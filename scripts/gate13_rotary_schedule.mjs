import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const weekNum = parseInt(process.argv[2], 10) || 34;

console.log(`========================================================================`);
console.log(`🛡️  GATE 13: BOSS ROTARY SCHEDULE & SKILLS AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

let errors = [];

try {
  const schedulePath = path.join(rootDir, 'src', 'config', 'bossRotarySchedule.js');
  const scheduleModule = await import(`file://${schedulePath}`);
  const getRotaryConfig = scheduleModule.default || scheduleModule.getBossRotaryConfig;
  const config = getRotaryConfig(weekNum);

  console.log(`ℹ️  Rotary Config for Week ${weekNum}: Cycle ${config.cycleNumber} — "${config.cycleName}" (Boss: ${config.bossTitle})`);

  if (weekNum === 34) {
    if (config.cycleNumber !== 2) {
      errors.push(`Expected Cycle 2 for Week 34, found Cycle ${config.cycleNumber}`);
    }
    const expectedSkills = ["listening_p4", "listening_p5", "rw_p1"];
    const hasSkills = expectedSkills.every(s => config.testedSkills.includes(s));
    if (!hasSkills) {
      errors.push(`Expected skills [${expectedSkills.join(', ')}], found [${config.testedSkills.join(', ')}]`);
    }
  }

  // Verify Week 34 data has required components
  const weekDir = path.join(rootDir, 'src', 'data', 'weeks', `week_${weekNum}`);
  const listeningHubPath = path.join(weekDir, 'listening_hub.js');
  const lh = (await import(`file://${listeningHubPath}`)).listeningHub;

  const writingHubPath = path.join(weekDir, 'writing_hub.js');
  const wh = (await import(`file://${writingHubPath}`)).writingHub;

  if (config.testedSkills.includes('listening_p4') && !lh.listening_p4) {
    errors.push(`listening_p4 skill required by Cycle ${config.cycleNumber} but missing in listening_hub.js`);
  }
  if (config.testedSkills.includes('listening_p5') && !lh.listening_p5) {
    errors.push(`listening_p5 skill required by Cycle ${config.cycleNumber} but missing in listening_hub.js`);
  }
  if (config.testedSkills.includes('rw_p1') && !wh.rw_part_1) {
    errors.push(`rw_p1 skill required by Cycle ${config.cycleNumber} but missing in writing_hub.js`);
  }
} catch (e) {
  errors.push(`Error auditing rotary schedule: ${e.message}`);
}

if (errors.length > 0) {
  console.error(`\n❌ GATE 13 FAILED with ${errors.length} errors:`);
  errors.forEach((err, idx) => console.error(`   ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 13 PASSED: Rotary Schedule & Required Skills 100% Verified!`);
  process.exit(0);
}
