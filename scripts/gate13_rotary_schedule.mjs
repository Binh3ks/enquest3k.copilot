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

  const cycleExpectedSkills = {
    1: ['list_p1', 'list_p2', 'rw_p1', 'spk_p1'],
    2: ['list_p3', 'rw_p2', 'rw_p3', 'spk_p2'],
    3: ['list_p4', 'rw_p4', 'rw_p5', 'spk_p3'],
    4: ['list_p5', 'rw_p6', 'rw_p7', 'spk_p4'],
  };

  const expectedSkills = cycleExpectedSkills[config.cycleNumber] || [];
  const hasSkills = expectedSkills.every(s => config.testedSkills.includes(s));
  if (!hasSkills) {
    errors.push(`Expected skills [${expectedSkills.join(', ')}], found [${config.testedSkills.join(', ')}]`);
  }

  // Verify Week data has required components
  const weekDir = path.join(rootDir, 'src', 'data', 'weeks', `week_${weekNum}`);
  const listeningHubPath = path.join(weekDir, 'listening_hub.js');
  const lh = (await import(`file://${listeningHubPath}`)).listeningHub;

  const writingHubPath = path.join(weekDir, 'writing_hub.js');
  const wh = (await import(`file://${writingHubPath}`)).writingHub;

  const speakingHubPath = path.join(weekDir, 'speaking_hub.js');
  const sh = (await import(`file://${speakingHubPath}`)).speakingHub;

  if (config.testedSkills.includes('list_p1') && !lh.listening_p1) errors.push(`list_p1 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p2') && !lh.listening_p2) errors.push(`list_p2 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p3') && !lh.listening_p3) errors.push(`list_p3 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p4') && !lh.listening_p4) errors.push(`list_p4 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p5') && !lh.listening_p5) errors.push(`list_p5 required but missing in listening_hub.js`);

  if (config.testedSkills.includes('rw_p1') && !wh.rw_part_1) errors.push(`rw_p1 required but missing in writing_hub.js`);
  if (config.testedSkills.includes('rw_p2') && !wh.rw_part_2) errors.push(`rw_p2 required but missing in writing_hub.js`);
  if (config.testedSkills.includes('rw_p3') && !wh.rw_part_3) errors.push(`rw_p3 required but missing in writing_hub.js`);
  if (config.testedSkills.includes('rw_p4') && !wh.rw_part_4) errors.push(`rw_p4 required but missing in writing_hub.js`);
  if (config.testedSkills.includes('rw_p5') && !wh.rw_part_5) errors.push(`rw_p5 required but missing in writing_hub.js`);
  if (config.testedSkills.includes('rw_p6') && !wh.rw_part_6) errors.push(`rw_p6 required but missing in writing_hub.js`);
  if (config.testedSkills.includes('rw_p7') && !wh.rw_part_7) errors.push(`rw_p7 required but missing in writing_hub.js`);

  if (config.testedSkills.includes('spk_p1') && !sh.talkshow_video && !sh.find_differences) errors.push(`spk_p1 required but missing in speaking_hub.js`);
  if (config.testedSkills.includes('spk_p2') && !sh.info_exchange_cards) errors.push(`spk_p2 required but missing in speaking_hub.js`);
  if (config.testedSkills.includes('spk_p3') && !sh.picture_story) errors.push(`spk_p3 required but missing in speaking_hub.js`);
  if (config.testedSkills.includes('spk_p4') && !sh.personal_questions) errors.push(`spk_p4 required but missing in speaking_hub.js`);
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
