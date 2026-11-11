/**
 * scripts/verify_round80_loader_fix.mjs
 *
 * Executes REAL src/data/weeks/index.js loadWeekData(w, false) via Vite SSR
 * and src/config/zoneDataMapper.js mapDataToZones(data, w) across:
 *   - Baseline weeks: 33, 34, 35, 36, 37
 *   - 17 Round 80 Priority 1 fixed weeks: 38, 39, 41, 43, 45, 46, 73-82, 125
 *   - Sample blueprint-only dirs without content (e.g. 40, 42)
 *
 * Writes verbatim proof to docs/agent_artifacts/round80_loader_fix_raw.txt
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

const BASELINE_WEEKS = [33, 34, 35, 36, 37];
const FIXED_17_WEEKS = [38, 39, 41, 43, 45, 46, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 125];
const BLUEPRINT_ONLY_SAMPLE = [40, 42];

const lines = [];
const log = (s = '') => {
  lines.push(s);
  console.log(s);
};

let failures = 0;

const vite = await createServer({
  root: ROOT_DIR,
  logLevel: 'silent',
  server: { middlewareMode: true, watch: null, hmr: false },
  appType: 'custom',
});

try {
  const weeksMod = await vite.ssrLoadModule('/src/data/weeks/index.js');
  const mapperMod = await vite.ssrLoadModule('/src/config/zoneDataMapper.js');
  const { loadWeekData, default: weekIndex } = weeksMod;
  const { mapDataToZones } = mapperMod;

  log('========================================================================');
  log('ROUND 80 PRIORITY 1 — REAL VITE SSR loadWeekData(w) + mapDataToZones() PROOF');
  log(`Timestamp: ${new Date().toISOString()}`);
  log(`Target 17 weeks: ${FIXED_17_WEEKS.join(', ')}`);
  log(`Baseline weeks:  ${BASELINE_WEEKS.join(', ')}`);
  log('========================================================================\n');

  const checkGroup = async (label, weekList, expectNonNull) => {
    log(`### ${label}`);
    log('| Week | index.js | loadWeekData != null | meta.hasAdvanced | weekId | Theme/Title | Hubs (R/L/W/S/SPH) | Vocab | Math (barModel) | Grammar | InfoEx |');
    log('|------|----------|----------------------|------------------|--------|-------------|--------------------|-------|-----------------|---------|--------|');
    for (const w of weekList) {
      const hasIndex = fs.existsSync(path.join(ROOT_DIR, `src/data/weeks/week_${w}/index.js`));
      const meta = weekIndex.find((m) => m.id === w);
      let loaded = null;
      let mapped = null;
      let errMsg = null;
      let jsonSafe = false;
      try {
        loaded = await loadWeekData(w, false);
        if (loaded) {
          const cloned = JSON.parse(JSON.stringify(loaded));
          jsonSafe = cloned?.weekId === w;
          mapped = mapDataToZones(cloned, w);
        }
      } catch (e) {
        errMsg = e.message;
      }

      const nonNull = loaded !== null && typeof loaded === 'object';
      if (expectNonNull && (!nonNull || !jsonSafe || !mapped || errMsg)) {
        failures++;
      }

      const hubs = nonNull
        ? [
            Boolean(loaded.readingHub || loaded.reading_hub),
            Boolean(loaded.listeningHub || loaded.listening_hub),
            Boolean(loaded.writingHub || loaded.writing_hub),
            Boolean(loaded.speakingHub || loaded.speaking_hub),
            Boolean(loaded.skillPracticeHub || loaded.skill_practice_hub),
          ]
            .map((b) => (b ? 'Y' : 'N'))
            .join('/')
        : '—';

      const vocabLen = mapped ? mapped.battleArena.vocab.length : 0;
      const mathLen = mapped ? mapped.battleArena.barModel.length : 0;
      const grammarLen = mapped ? mapped.battleArena.grammarDrills.length : 0;
      const infoEx = mapped ? Boolean(mapped.cue_card_info_exchange) : false;
      const theme = nonNull ? (mapped?.theme || loaded.theme || loaded.title || '') : errMsg || 'null';

      log(
        `| W${w} | ${hasIndex ? 'YES' : 'NO'} | ${nonNull ? 'PASS' : 'NULL'} | ${Boolean(meta?.hasAdvanced)} | ${loaded?.weekId ?? '—'} | ${String(theme).replace(/\|/g, '/')} | ${hubs} | ${vocabLen} | ${mathLen} | ${grammarLen} | ${infoEx ? 'Y' : 'N'} |`
      );
    }
    log('');
  };

  await checkGroup('1. Baseline Production Weeks (W33–W37)', BASELINE_WEEKS, true);
  await checkGroup('2. Fixed 17 Content Weeks (W38,39,41,43,45,46,73–82,125)', FIXED_17_WEEKS, true);
  await checkGroup('3. Blueprint-only Control Sample (no content JS expected null)', BLUEPRINT_ONLY_SAMPLE, false);

  const nonNullFixed = [];
  const compatRows = [];
  for (const w of FIXED_17_WEEKS) {
    const d = await loadWeekData(w, false);
    if (d) {
      nonNullFixed.push(w);
      const cloned = JSON.parse(JSON.stringify(d));
      const mapped = mapDataToZones(cloned, w);
      const rh = cloned.readingHub || cloned.reading_hub || {};
      const lh = cloned.listeningHub || cloned.listening_hub || {};
      const sh = cloned.speakingHub || cloned.speaking_hub || {};

      // Mirror BarModelQuest.jsx:33 fallback check
      const barArr = Array.isArray(mapped.battleArena.barModel) ? mapped.battleArena.barModel : [];
      const barHasExpectedAns =
        barArr.length > 0 &&
        barArr.every((q) => Boolean(q.correctAnswer || q.answer_value || Number.isFinite(parseInt(q.answer, 10))));
      const barHasTargetOnly = barArr.some((q) => q.target_answer !== undefined && !q.correctAnswer && !q.answer_value && !q.answer);

      // Mirror SentenceBuilderBattle.jsx:56 word_blocks check
      const gramArr = Array.isArray(mapped.battleArena.grammarDrills) ? mapped.battleArena.grammarDrills : [];
      const gramHasBlocks = gramArr.length > 0 && gramArr.every((q) => Array.isArray(q.word_blocks) && q.word_blocks.length > 0);

      // Mirror ScienceDragDropLab.jsx:105-119 stages/targets check
      const sci = mapped.knowledgeLab.actionLab || {};
      const sciHasStagesOrTargets =
        (Array.isArray(sci.stages) && sci.stages.length > 0) ||
        (Array.isArray(sci.targets) && sci.targets.length > 0) ||
        (Array.isArray(sci.zones) && sci.zones.length > 0);
      const sciScenariosCount = Array.isArray(sci.scenarios) ? sci.scenarios.length : 0;

      // Mirror zoneDataMapper.js:111-113 + BossBattleZone.jsx:47-49,62 rw_part3 drop check
      const hasRawRwP3 = Boolean(rh.rw_part3 || rh.rw_part_3);
      const hasMappedRwP3 = Boolean(mapped.bossBattle.readingWriting.p3);
      const earlyReturnTriggers = Boolean(mapped.bossBattle.readingWriting.p1 || mapped.bossBattle.readingWriting.p2);
      const rwP3Dropped = hasRawRwP3 && !hasMappedRwP3 && earlyReturnTriggers;

      // Check listening_p1..5 coverage
      const listeningParts = ['listening_p1', 'listening_p2', 'listening_p3', 'listening_p4', 'listening_p5']
        .filter((k) => Boolean(lh[k] || (k === 'listening_p2' && lh.listening_p2_notes) || (k === 'listening_p4' && lh.listening_p4_questions)));

      // Check clone/meta notes (e.g. w76 leakage or empty title_vi)
      const jsonStr = JSON.stringify(cloned);
      const cloneFlags = [];
      if (!cloned.title_vi) cloneFlags.push('empty_title_vi');
      if (w !== 76 && /week76|w76_p\d/i.test(jsonStr)) cloneFlags.push('w76_string_leak');
      if (Object.keys(sh).some((k) => /^part\d_/.test(k))) cloneFlags.push('pet_speaking_keys');

      compatRows.push({
        w,
        barStatus: barHasExpectedAns ? 'OK(answer)' : barHasTargetOnly ? 'MISMATCH(target_answer->fallback10)' : 'MISSING',
        gramStatus: gramHasBlocks ? 'OK(word_blocks)' : `MISMATCH(MCQ_only=${gramArr.length},0_word_blocks)`,
        sciStatus: sciHasStagesOrTargets ? 'OK(stages)' : `MISMATCH(scenarios=${sciScenariosCount},0_stages)`,
        bossStatus: `${listeningParts.length}/5 L-parts${rwP3Dropped ? '; RW_P3_DROPPED' : ''}`,
        notes: cloneFlags.length > 0 ? cloneFlags.join(',') : 'none',
      });
    }
  }

  log('### 4. Downstream UI Station Compatibility Audit (Read-Only Diagnostic — NOT Fixed in Round 80)');
  log('| Week | BarModelQuest (`:33`) | SentenceBuilderBattle (`:56`) | ScienceDragDropLab (`:106`) | BossBattle (`zoneDataMapper:113`) | Metadata/Schema Notes |');
  log('|------|------------------------|-------------------------------|-----------------------------|-----------------------------------|-----------------------|');
  for (const r of compatRows) {
    log(`| W${r.w} | ${r.barStatus} | ${r.gramStatus} | ${r.sciStatus} | ${r.bossStatus} | ${r.notes} |`);
  }
  log('');
  const barMismatchCount = compatRows.filter((r) => r.barStatus.startsWith('MISMATCH')).length;
  const gramMismatchCount = compatRows.filter((r) => r.gramStatus.startsWith('MISMATCH')).length;
  const sciMismatchCount = compatRows.filter((r) => r.sciStatus.startsWith('MISMATCH')).length;
  const rwP3DropWeeks = compatRows.filter((r) => r.bossStatus.includes('RW_P3_DROPPED')).map((r) => `W${r.w}`);
  log(`SUMMARY: fixed_non_null=${nonNullFixed.length}/${FIXED_17_WEEKS.length}, loader_mapper_failures=${failures}`);
  log(`DOWNSTREAM_UI_COMPAT_BLOCKERS (pre-existing hub vs UI schema drift): BarModel_fallback10=${barMismatchCount}/17, Grammar_no_word_blocks=${gramMismatchCount}/17, ActionLab_no_stages=${sciMismatchCount}/17, Boss_rw_part3_dropped=${rwP3DropWeeks.length} [${rwP3DropWeeks.join(',')}]`);
} finally {
  await vite.close();
}

const outPath = path.join(ROOT_DIR, 'docs/agent_artifacts/round80_loader_fix_raw.txt');
fs.writeFileSync(outPath, `${lines.join('\n')}\n`, 'utf8');

if (failures > 0) {
  console.error(`\n❌ FAILED with ${failures} loader/mapper failures`);
  process.exit(1);
}
console.log(`\n✓ Wrote ${path.relative(ROOT_DIR, outPath)} with 0 failures.`);
