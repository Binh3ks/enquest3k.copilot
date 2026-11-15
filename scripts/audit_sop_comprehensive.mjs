import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// 60 weeks in scope: W33–W72, W73–W82, W125–W134
const WEEKS_PRIMARY = Array.from({ length: 72 - 33 + 1 }, (_, i) => 33 + i);
const WEEKS_SECONDARY = [
  ...Array.from({ length: 82 - 73 + 1 }, (_, i) => 73 + i),
  ...Array.from({ length: 134 - 125 + 1 }, (_, i) => 125 + i)
];
const ALL_60_WEEKS = [...WEEKS_PRIMARY, ...WEEKS_SECONDARY];

async function loadWeekDataRobust(w) {
  const liveDir = path.resolve(`src/data/weeks/week_${w}`);
  const stagedDir = path.resolve(`docs/agent_artifacts/staging/week_${w}`);

  let dir = null;
  let location = 'MISSING';

  const liveHasHubs = fs.existsSync(liveDir) && (fs.existsSync(path.join(liveDir, 'index.js')) || fs.existsSync(path.join(liveDir, 'reading_hub.js')));
  const stagedHasHubs = fs.existsSync(stagedDir) && (fs.existsSync(path.join(stagedDir, 'index.js')) || fs.existsSync(path.join(stagedDir, 'reading_hub.js')));

  if (liveHasHubs) {
    dir = liveDir;
    location = 'LIVE (src)';
  } else if (stagedHasHubs) {
    dir = stagedDir;
    location = 'STAGED';
  } else if (fs.existsSync(liveDir)) {
    dir = liveDir;
    location = 'LIVE (stub/blueprint only)';
  }

  if (!dir) return { location: 'MISSING', data: null, error: 'No directory' };

  let data = {};
  const indexPath = path.join(dir, 'index.js');
  let loadedVia = 'DIRECT_HUBS';

  if (fs.existsSync(indexPath)) {
    try {
      const mod = await import(pathToFileURL(indexPath).href);
      data = mod.default || mod[`week${w}Data`] || mod;
      loadedVia = 'loadWeekData (index.js)';
    } catch (e) {
      loadedVia = `index.js ERROR (${e.message})`;
    }
  }

  // Fallback / complement directly from hub files
  const hubs = ['reading_hub', 'listening_hub', 'writing_hub', 'speaking_hub', 'skill_practice_hub', 'vocab', 'shadowing'];
  for (const h of hubs) {
    if (!data[h]) {
      const hFile = path.join(dir, `${h}.js`);
      if (fs.existsSync(hFile)) {
        try {
          const mod = await import(pathToFileURL(hFile).href);
          data[h] = mod.default || mod[`${h}Data`] || mod[h] || mod;
        } catch (e) {
          // ignore
        }
      }
    }
  }

  return { location, data, loadedVia };
}

function checkFiles(dir, filterFn) {
  if (!fs.existsSync(dir)) return { count: 0, validBytes: 0, files: [] };
  const all = fs.readdirSync(dir);
  const matched = all.filter(filterFn);
  let validBytes = 0;
  for (const f of matched) {
    const stat = fs.statSync(path.join(dir, f));
    if (stat.size > 0) validBytes++;
  }
  return { count: matched.length, validBytes, files: matched };
}

async function runAudit() {
  console.log('========================================================================================================================');
  console.log('SOP v2.3.0 GIAI ĐOẠN 2 & MEDIA ASSET AUDIT REPORT (C4/C15 READ-ONLY SCRIPT)');
  console.log('========================================================================================================================');
  console.log('| Week | Status | loadWeekData Status | HM1 CLIL (Txt/Aud>0) | HM2 Vocab (Txt/Aud>0) | HM3 Shd (Txt/Aud>0) | HM4 R&W Parts | HM5 Lab/Math/SW | SW Img/Aud (>0B) | Total Img Disk | Total Aud Disk |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');

  for (const w of ALL_60_WEEKS) {
    const { location, data, loadedVia } = await loadWeekDataRobust(w);
    if (!data || Object.keys(data).length === 0) {
      console.log(`| W${String(w).padEnd(3)} | ${location.padEnd(10)} | ❌ FAIL (No data)    | -                    | -                     | -                   | -             | -               | 0 / 0             | 0              | 0              |`);
      continue;
    }

    const rHub = data.reading_hub || {};
    const lHub = data.listening_hub || {};
    const wHub = data.writing_hub || {};
    const sHub = data.skill_practice_hub || {};

    const audioDir1 = path.resolve(`public/audio/week${w}`);
    const audioDir2 = path.resolve(`public/audio/week_${w}`);
    const imgDir1 = path.resolve(`public/images/week${w}`);
    const imgDir2 = path.resolve(`public/images/week_${w}`);

    // HM1: CLIL
    const hasClil = Boolean(rHub.clil_article || rHub.clil);
    const clilAud1 = checkFiles(audioDir1, f => f.startsWith('clil'));
    const clilAud2 = checkFiles(audioDir2, f => f.startsWith('clil'));
    const clilAudCount = clilAud1.validBytes + clilAud2.validBytes;

    // HM2: Vocab
    const rawVocab = data.vocab || data.vocabulary || rHub.vocab || [];
    let vocabList = [];
    if (Array.isArray(rawVocab)) vocabList = rawVocab;
    else if (Array.isArray(rawVocab.vocab)) vocabList = rawVocab.vocab;
    else if (Array.isArray(rawVocab.vocabulary)) vocabList = rawVocab.vocabulary;
    const vocabAud1 = checkFiles(audioDir1, f => f.startsWith('vocab_'));
    const vocabAud2 = checkFiles(audioDir2, f => f.startsWith('vocab_'));
    const vocabAudCount = vocabAud1.validBytes + vocabAud2.validBytes;

    // HM3: Shadowing
    const rawShd = data.shadowing?.sentences || rHub.shadowing?.sentences || rHub.shadowingData?.sentences || rHub.shadowing_sentences || [];
    const shdCount = Array.isArray(rawShd) ? rawShd.length : 0;
    const shdAud1 = checkFiles(audioDir1, f => f.startsWith('shadowing_'));
    const shdAud2 = checkFiles(audioDir2, f => f.startsWith('shadowing_'));
    const shdAudCount = shdAud1.validBytes + shdAud2.validBytes;

    // HM4: R&W Parts (Can be in reading_hub or writing_hub)
    const rwParts = [
      rHub.rw_part1 || rHub.rw_part_1 || wHub.rw_part_1 || wHub.rw_part1,
      rHub.rw_part2 || rHub.rw_part_2 || wHub.rw_part_2 || wHub.rw_part2,
      rHub.reading_part3_story || rHub.rw_part3 || rHub.rw_part_3 || wHub.rw_part_3 || wHub.reading_part3_story,
      rHub.rw_part4 || rHub.rw_part_4 || wHub.rw_part_4 || wHub.rw_part4,
      rHub.rw_part5 || rHub.rw_part_5 || wHub.rw_part_5 || wHub.rw_part5,
      rHub.rw_part6 || rHub.rw_part_6 || wHub.rw_part_6 || wHub.rw_part6
    ].filter(Boolean).length;

    // HM5: Interactive Lab, Math, Story Writer
    const labStages = (sHub.science_lab?.stages || sHub.science_lab?.scenarios || lHub.science_lab?.stages || lHub.science_lab?.scenarios || []).length;
    const rawMath = sHub.singapore_math || lHub.singapore_math;
    const mathCount = Array.isArray(rawMath) ? rawMath.length : (rawMath?.questions?.length || 0);

    const rawSW = wHub.picture_story || wHub.picture_mode;
    const swSteps = (rawSW?.steps || rawSW?.panels || rawSW?.image_panels || rawSW?.sentence_starters || []).length;

    // SW Images & Audios on disk
    const swImg1 = checkFiles(imgDir1, f => f.startsWith('writing_panel') || f.startsWith('ps_'));
    const swImg2 = checkFiles(imgDir2, f => f.startsWith('writing_panel') || f.startsWith('ps_'));
    const swImgCount = swImg1.validBytes + swImg2.validBytes;

    const swAud1 = checkFiles(audioDir1, f => f.startsWith('scene_') || f.startsWith('writing_'));
    const swAud2 = checkFiles(audioDir2, f => f.startsWith('scene_') || f.startsWith('writing_'));
    const swAudCount = swAud1.validBytes + swAud2.validBytes;

    // Total media on disk
    const totImg1 = checkFiles(imgDir1, () => true);
    const totImg2 = checkFiles(imgDir2, () => true);
    const totalImgDisk = totImg1.validBytes + totImg2.validBytes;

    const totAud1 = checkFiles(audioDir1, () => true);
    const totAud2 = checkFiles(audioDir2, () => true);
    const totalAudDisk = totAud1.validBytes + totAud2.validBytes;

    const hm1Str = `${hasClil ? 'YES' : 'NO'}/${clilAudCount} aud`;
    const hm2Str = `${vocabList.length}w/${vocabAudCount} aud`;
    const hm3Str = `${shdCount}s/${shdAudCount} aud`;
    const hm4Str = `${rwParts}/6 parts`;
    const hm5Str = `L:${labStages} M:${mathCount} S:${swSteps}`;
    const swDiskStr = `${swImgCount} img / ${swAudCount} aud`;
    const loadStr = loadedVia.startsWith('loadWeekData') ? '✅ index.js' : (loadedVia.startsWith('DIRECT') ? '⚠️ hubs only' : '❌ ERROR');

    console.log(`| W${String(w).padEnd(3)} | ${location.padEnd(10)} | ${loadStr.padEnd(19)} | ${hm1Str.padEnd(20)} | ${hm2Str.padEnd(21)} | ${hm3Str.padEnd(19)} | ${hm4Str.padEnd(13)} | ${hm5Str.padEnd(15)} | ${swDiskStr.padEnd(17)} | ${String(totalImgDisk).padEnd(14)} | ${String(totalAudDisk).padEnd(14)} |`);
  }

  console.log('========================================================================================================================');
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
