#!/usr/bin/env node
/**
 * GATE 6: XP Economy & Badge Consistency Auditor
 * Validates:
 * 1. QUEST_SCHEDULE contains exact 8 scored quests (355 XP) and 7 milestone quests (0 XP)
 * 2. 5 Daily Bonuses equal 125 XP (5 * 25)
 * 3. Total Earned XP = 480 XP; Final Display = 1730 XP (Baseline 1250 + 480)
 * 4. TaskScreen badge consistency: milestone quests show 'Milestone' badge, never '+50'
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '34';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`🛡️  GATE 6: XP ECONOMY & BADGE CONSISTENCY AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

const schedulePath = path.join(rootDir, 'src/config/questSchedule.js');
const scheduleModule = await import(schedulePath);
const schedule = scheduleModule.QUEST_SCHEDULE;

let errors = [];
let totalDirectXP = 0;
let scoredCount = 0;
let milestoneCount = 0;

schedule.forEach(day => {
  day.quests.forEach(q => {
    if (q.isMilestone || q.xp === 0) {
      milestoneCount++;
      if (q.xp > 0) {
        errors.push(`Quest ${q.id} marked as isMilestone but has non-zero xp: ${q.xp}`);
      }
    } else {
      scoredCount++;
      totalDirectXP += q.xp;
    }
  });
});

console.log(`📊 Scored Quests:    ${scoredCount} quests (Total Direct XP: ${totalDirectXP} XP)`);
console.log(`⭐ Milestone Quests: ${milestoneCount} quests (0 Direct XP)`);

if (scoredCount !== 8) {
  errors.push(`Expected exactly 8 scored quests in schedule, found: ${scoredCount}`);
}
if (milestoneCount !== 7) {
  errors.push(`Expected exactly 7 milestone quests in schedule, found: ${milestoneCount}`);
}
if (totalDirectXP !== 355) {
  errors.push(`Expected total direct scored XP to equal 355 XP, found: ${totalDirectXP} XP`);
}

const dailyBonusTotal = 5 * (scheduleModule.DAILY_BONUS_XP || 25);
const totalEarned = totalDirectXP + dailyBonusTotal;
const finalDisplay = 1250 + totalEarned;

console.log(`🎁 Daily Bonuses:    5 × 25 = ${dailyBonusTotal} XP`);
console.log(`💰 Total Earned XP:  ${totalDirectXP} + ${dailyBonusTotal} = ${totalEarned} XP`);
console.log(`🏆 Final User XP:    1250 (Baseline) + ${totalEarned} = ${finalDisplay} XP`);

if (totalEarned !== 480) {
  errors.push(`Expected Total Earned XP = 480 XP, got: ${totalEarned} XP`);
}
if (finalDisplay !== 1730) {
  errors.push(`Expected Final User XP = 1730 XP, got: ${finalDisplay} XP`);
}

// Verify TaskScreen badge logic in code
const taskScreenPath = path.join(rootDir, 'src/components/questmap/TaskScreen.jsx');
const taskScreenContent = fs.readFileSync(taskScreenPath, 'utf8');
if (taskScreenContent.includes('taskInfo.xp || 50')) {
  errors.push(`TaskScreen.jsx still contains legacy hardcoded badge fallback 'taskInfo.xp || 50'!`);
}

console.log(`\n------------------------------------------------------------------------`);
if (errors.length > 0) {
  console.error(`❌ GATE 6 FAILED with ${errors.length} error(s):`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 6 PASSED: 100% XP Economy & Badge Consistency!`);
  process.exit(0);
}
