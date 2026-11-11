import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const arg2 = process.argv[2];
const isMockFlag = process.argv.includes('--mock');
const weekNum = parseInt(arg2, 10) || 34;

console.log(`========================================================================`);
console.log(`🛡️  GATE 13: BOSS ROTARY SCHEDULE & SKILLS AUDIT (WEEK ${weekNum}${isMockFlag ? ' [MOCK]' : ''})`);
console.log(`========================================================================`);

let errors = [];

try {
  const schedulePath = path.join(rootDir, 'src', 'config', 'bossRotarySchedule.js');
  const scheduleModule = await import(`file://${schedulePath}`);
  const getRotaryConfig = scheduleModule.default || scheduleModule.getBossRotaryConfig;
  const config = getRotaryConfig(weekNum, { isMock: isMockFlag });

  console.log(`ℹ️  Rotary Config for Week ${weekNum}: ${config.isMock ? 'FULL MOCK (Cycle 0)' : `Cycle ${config.cycleNumber}/4`} — "${config.cycleName}" (Boss: ${config.bossTitle})`);

  if (!isMockFlag && (config.cycleNumber < 1 || config.cycleNumber > 4 || config.mode === 'FULL_MOCK')) {
    errors.push(`Content week ${weekNum} misfired FULL_MOCK / out-of-range cycleNumber=${config.cycleNumber}`);
  }

  const cycleExpectedSkills = {
    0: ['list_p1', 'list_p2', 'list_p3', 'list_p4', 'list_p5', 'rw_p1', 'rw_p2', 'rw_p3', 'rw_p4', 'rw_p5', 'rw_p6', 'rw_p7', 'spk_p1', 'spk_p2', 'spk_p3', 'spk_p4'],
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
  const resolveHub = async (fileName, namedKeys) => {
    const p = path.join(weekDir, fileName);
    if (!fs.existsSync(p)) return {};
    const mod = await import(`file://${p}`);
    for (const k of namedKeys) {
      if (mod[k] && typeof mod[k] === 'object') return mod[k];
    }
    return mod.default || {};
  };

  const lh = await resolveHub('listening_hub.js', ['listeningHub', 'listeningHubData']);
  const wh = await resolveHub('writing_hub.js', ['writingHub', 'writingHubData']);
  const rh = await resolveHub('reading_hub.js', ['readingHub', 'readingHubData']);
  const sh = await resolveHub('speaking_hub.js', ['speakingHub', 'speakingHubData']);

  if (config.testedSkills.includes('list_p1') && !lh.listening_p1) errors.push(`list_p1 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p2') && !lh.listening_p2) errors.push(`list_p2 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p3') && !lh.listening_p3) errors.push(`list_p3 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p4') && !lh.listening_p4) errors.push(`list_p4 required but missing in listening_hub.js`);
  if (config.testedSkills.includes('list_p5') && !lh.listening_p5) errors.push(`list_p5 required but missing in listening_hub.js`);

  const hasRWPart = (idx) => Boolean(wh[`rw_part_${idx}`] || wh[`rw_part${idx}`] || rh[`rw_part_${idx}`] || rh[`rw_part${idx}`]);
  for (let i = 1; i <= 7; i++) {
    if (config.testedSkills.includes(`rw_p${i}`) && !hasRWPart(i)) {
      errors.push(`rw_p${i} required but missing in writing_hub.js / reading_hub.js`);
    }
  }

  if (config.testedSkills.includes('spk_p1') && !sh.talkshow_video && !sh.find_differences) errors.push(`spk_p1 required but missing in speaking_hub.js`);
  if (config.testedSkills.includes('spk_p2') && !sh.info_exchange_cards && !sh.info_exchange) errors.push(`spk_p2 required but missing in speaking_hub.js`);
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
