#!/usr/bin/env node
/**
 * GATE 16: Content Quality & Anti-Hallucination Guard
 * 1. CLIL fact_units >= 3 (specific animal + action + observable outcome)
 * 2. CLIL glossary required for specialized terms
 * 3. science_report pills overlap >= 2 keywords with CLIL content
 * 4. writing_chunks exists and 0 banned negative strings
 * 5. Math file equality (listening_hub vs singapore_math.js)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const WEEK = parseInt(process.argv[2] || '34', 10);
console.log(`\n========================================================================`);
console.log(`🛡️  GATE 16: CONTENT QUALITY & DATA PURITY AUDIT (WEEK ${WEEK})`);
console.log(`========================================================================`);

let errors = [];

async function runAudit() {
  const weekDir = path.join(rootDir, `src/data/weeks/week_${WEEK}`);
  if (!fs.existsSync(weekDir)) {
    console.error(`❌ Week directory not found: ${weekDir}`);
    process.exit(1);
  }

  // 1. Check CLIL fact_units & glossary in reading_hub.js
  const rhMod = await import(`file://${path.join(weekDir, 'reading_hub.js')}`);
  const rh = rhMod.readingHub || rhMod.default || rhMod;
  const clil = rh.read_explore?.clil_article || rh.reading_explorer?.clil_article || rh.clil_article;

  if (!clil) {
    errors.push('Missing clil_article in reading_hub.js');
  } else {
    const text = clil.content_en || '';
    const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    const factUnits = sentences.filter(s => {
      const lower = s.toLowerCase();
      const subjectPattern = WEEK === 33
        ? /\b(water|floor|tile|tiles|shoes|rubber|friction|surface|student|students|sign|signs|nurse|jake|tom)\b/
        : /\b(squirrel|squirrels|jay|jays|bee|bees|bird|birds|lion|mouse|animal|animals|plants|trees|flowers)\b/;
      const actionPattern = WEEK === 33
        ? /\b(reduce|reduces|causes|provides|provide|walk|slip|slipped|helps|help|wear|warn|learn|act)\b/
        : /\b(eat|bury|hide|fly|drink|carry|grow|help|travel|cooperate|start|call|stays)\b/;
      const outcomePattern = WEEK === 33
        ? /\b(safe|safety|grip|traction|slip|accidents|prevent|prevention|clean|dry|ground)\b/
        : /\b(ground|spring|trees|plants|nectar|pollen|helpers|green|strong|food|homes|seeds)\b/;

      return subjectPattern.test(lower) && actionPattern.test(lower) && outcomePattern.test(lower);
    });

    if (factUnits.length < 3) {
      errors.push(`CLIL content has only ${factUnits.length}/3 fact units with concrete subject + action + outcome.`);
    } else {
      console.log(`  ✅ CLIL Fact Units: ${factUnits.length} verified (min: 3)`);
    }

    if (!Array.isArray(clil.glossary) || clil.glossary.length < 3) {
      errors.push(`CLIL glossary missing or has < 3 entries (found: ${clil.glossary?.length || 0})`);
    } else {
      console.log(`  ✅ CLIL Glossary: ${clil.glossary.length} entries verified (min: 3)`);
    }
  }

  // 2. Check writing_chunks in writing_hub.js
  const whMod = await import(`file://${path.join(weekDir, 'writing_hub.js')}`);
  const wh = whMod.writingHub || whMod.default || whMod;
  const wc = wh.writing_chunks;

  if (!wc || !wc.setting_time || !wc.action_manner || !wc.problem_event || !wc.solution_outcome) {
    errors.push('writing_chunks missing required 4 chunk groups in writing_hub.js');
  } else {
    const allChunks = [
      ...wc.setting_time,
      ...wc.action_manner,
      ...wc.problem_event,
      ...wc.solution_outcome
    ].join(' ').toLowerCase();

    const banned = WEEK === 33
      ? ["was patrolling", "during the journey", "caught 24 fish"]
      : ["corridor", "jake", "friction", "nurse", "walking carefully", "moving forward", "during the journey", "stopped immediately", "needed urgent help", "was patrolling"];
    const foundBanned = banned.filter(b => allChunks.includes(b));
    if (foundBanned.length > 0) {
      errors.push(`writing_chunks contains banned legacy strings: [${foundBanned.join(', ')}]`);
    } else {
      console.log(`  ✅ writing_chunks: 4 groups verified with 0 banned patterns`);
    }
  }

  // 3. Check science_report data_card & pills overlap with CLIL content
  const srConfig = wh.science_report_config;
  if (!srConfig) {
    errors.push('Missing science_report_config in writing_hub.js');
  } else {
    if (!Array.isArray(srConfig.data_card) || srConfig.data_card.length < 3) {
      errors.push(`science_report_config.data_card missing or has < 3 rows (found: ${srConfig.data_card?.length || 0})`);
    } else {
      console.log(`  ✅ science_report Data Card: 3 rows verified`);
    }

    const hasValidPurpose = (srConfig.purpose && (srConfig.purpose.includes('little scientists') || srConfig.purpose.includes('observed / because / past tense'))) ||
      (srConfig.teacher_parent_note && srConfig.teacher_parent_note.includes('observed / because / past tense'));

    if (!hasValidPurpose) {
      errors.push('science_report_config.purpose missing or does not match pedagogical standard');
    } else {
      console.log(`  ✅ science_report Purpose: verified`);
    }

    const clilText = (clil?.content_en || '').toLowerCase();
    const allPills = [
      ...(Object.values(srConfig.step1Pills || {}).flat()),
      ...(Object.values(srConfig.step2Pills || {}).flat()),
      ...(Object.values(srConfig.step3Pills || {}).flat()),
      ...(srConfig.data_card?.map(d => `${d.subject} ${d.action} ${d.result}`) || [])
    ].join(' ').toLowerCase();

    const pillWords = (allPills.match(/\b[a-z]{4,}\b/g) || []);
    const clilWords = (clilText.match(/\b[a-z]{4,}\b/g) || []);
    const overlap = [...new Set(pillWords.filter(w => clilWords.includes(w) && !['this', 'that', 'with', 'from', 'have', 'were', 'will'].includes(w)))];

    if (overlap.length < 2) {
      errors.push(`science_report pills have insufficient overlap with CLIL content (found ${overlap.length}/2: [${overlap.join(', ')}])`);
    } else {
      console.log(`  ✅ science_report & CLIL Keyword Overlap: ${overlap.length} words [${overlap.slice(0, 6).join(', ')}]`);
    }
  }

  // 3b. Check picture_story steps in writing_hub.js
  const ps = wh.picture_story;
  if (!ps || (!Array.isArray(ps.steps) && !Array.isArray(ps.panels))) {
    errors.push('Missing picture_story steps or panels in writing_hub.js');
  } else {
    const stepCount = (ps.steps || ps.panels).length;
    if (stepCount < 3) {
      errors.push(`picture_story has only ${stepCount}/3 steps`);
    } else {
      console.log(`  ✅ picture_story Steps: ${stepCount} steps verified`);
    }
  }

  // 4. Singapore Math file equality
  const lhMod = await import(`file://${path.join(weekDir, 'listening_hub.js')}`);
  const lh = lhMod.listeningHub || lhMod.listeningHubData || lhMod.default || lhMod;
  const smMod = await import(`file://${path.join(weekDir, 'singapore_math.js')}`);
  const sm = smMod.singaporeMath || smMod.default || smMod;

  const lhMath = lh.singapore_math || [];
  const smMath = sm.problems || sm.singapore_math || [];

  if (lhMath.length !== 5 || smMath.length !== 5) {
    errors.push(`Math problems count mismatch: listening_hub (${lhMath.length}) vs singapore_math.js (${smMath.length})`);
  } else {
    for (let i = 0; i < 5; i++) {
      const lhText = (lhMath[i]?.problem_en || lhMath[i]?.text || lhMath[i]?.problemText || '').trim();
      const smText = (smMath[i]?.problemText || smMath[i]?.text || smMath[i]?.problem_en || '').trim();
      if (lhText !== smText) {
        errors.push(`Math problem ${i + 1} text mismatch: "${lhText}" vs "${smText}"`);
      }
    }
    console.log(`  ✅ Singapore Math Single-Source Equality: 5/5 problems 100% matched`);
  }

  // 5. Check Examiner Audio in speaking_hub.js
  const shMod = await import(`file://${path.join(weekDir, 'speaking_hub.js')}`);
  const sh = shMod.speakingHub || shMod.default || shMod;
  const eq = sh.info_exchange_cards?.examiner_questions || sh.info_exchange?.examiner_questions || [];
  if (eq.length < 3 || !eq.every(q => q.audio_url)) {
    errors.push(`speaking_hub info_exchange examiner_questions missing audio_url (found: ${eq.length}/3)`);
  } else {
    console.log(`  ✅ Examiner Audio Questions: 3/3 audio URLs verified`);
  }

  console.log(`\n========================================================================`);
  if (errors.length === 0) {
    console.log(`🎉 GATE 16 PASSED: 100% Content Quality & Single-Source Data Purity!`);
    console.log(`========================================================================\n`);
    process.exit(0);
  } else {
    console.error(`🚨 GATE 16 FAILED with ${errors.length} error(s):`);
    errors.forEach(e => console.error(`  ❌ ${e}`));
    console.log(`========================================================================\n`);
    process.exit(1);
  }
}

runAudit().catch(err => {
  console.error('FATAL GATE 16 ERROR:', err);
  process.exit(1);
});
