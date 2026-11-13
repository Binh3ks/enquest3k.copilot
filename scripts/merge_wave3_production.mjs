/**
 * scripts/merge_wave3_production.mjs
 *
 * Merges Wave 3 weeks (W126, W127, W133, W134) into production:
 * 1. Copies all staged week files from docs/agent_artifacts/staging/week_{w}/
 *    into src/data/weeks/week_{w}/
 * 2. Writes week_{w}/index.js using the Round 80 loader wrapper pattern
 * 3. Copies SVG assets for W133 & W134 into public/images/week{w}/
 * 4. Updates review_status to "MERGED_ROUND86" in both staging and production provenance.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const WEEKS = [
  { num: 126, theme: 'From Essay to Speech', title_vi: 'Chuyển từ Bài viết sang Bài nói', cefr: 'B1+ Academic', svgs: false },
  { num: 127, theme: 'Rebuttal Practice', title_vi: 'Luyện Phản biện', cefr: 'B1+ Academic', svgs: false },
  { num: 133, theme: 'Deep Research & Data', title_vi: 'Nghiên cứu Sâu & Dữ liệu', cefr: 'B1+ Academic', svgs: true },
  { num: 134, theme: 'Identifying Fallacies', title_vi: 'Nhận diện Lỗi Ngụy biện', cefr: 'B1+ Academic', svgs: true },
];

function generateIndexWrapper(w) {
  return `// Index wrapper for Week ${w.num}
import vocabList from './vocab.js';
import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';
import { skillPracticeHubData as skillPracticeHub } from './skill_practice_hub.js';

const normalizedVocab = Array.isArray(vocabList) ? vocabList : (vocabList?.vocab || []);
const new_words = { vocab: normalizedVocab, vocab_list: normalizedVocab };

export const weekData = {
  weekId: ${w.num},
  theme: readingHub.theme || "${w.theme}",
  title: readingHub.theme || "${w.theme}",
  weekTitle_en: readingHub.theme || "${w.theme}",
  title_vi: "${w.title_vi}",
  cefr_level: readingHub.cefr_level || "${w.cefr}",

  // Top-level for InfoExchangeZone direct hydration
  cue_card_info_exchange: speakingHub.info_exchange_cards || null,
  cue_card_prompts: Array.isArray(speakingHub.cue_card_prompts) ? speakingHub.cue_card_prompts : [],
  vocab: normalizedVocab,

  readingHub,
  listeningHub,
  writingHub,
  speakingHub,
  skillPracticeHub,
  reading_hub: readingHub,
  listening_hub: listeningHub,
  writing_hub: writingHub,
  speaking_hub: speakingHub,
  skill_practice_hub: skillPracticeHub,
  stations: {
    new_words,
    reading_hub: readingHub,
    listening_hub: listeningHub,
    writing_hub: writingHub,
    speaking_hub: speakingHub,
    skill_practice_hub: skillPracticeHub
  }
};

export default weekData;
`;
}

for (const w of WEEKS) {
  const stagingDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging', `week_${w.num}`);
  const prodDir = path.join(ROOT_DIR, 'src/data/weeks', `week_${w.num}`);

  fs.mkdirSync(prodDir, { recursive: true });

  // Update provenance in staging first
  const stagingProvPath = path.join(stagingDir, 'provenance.json');
  const prov = JSON.parse(fs.readFileSync(stagingProvPath, 'utf8'));
  prov.review_status = 'MERGED_ROUND86';
  prov.round86_production_merge = {
    round: 86,
    merged_at: new Date().toISOString(),
    baseline_commit: '9d04116b416d1ba5d2d9fca9a56e98ecde7d4014',
    scope: 'PRODUCTION_MERGE_WAVE3',
    destination: `src/data/weeks/week_${w.num}/`,
    esl_signoff: 'Claude C17-b full ESL pedagogy sign-off granted across all 4 weeks',
  };
  fs.writeFileSync(stagingProvPath, JSON.stringify(prov, null, 2) + '\n', 'utf8');

  // Copy files to production
  const filesToCopy = [
    'vocab.js',
    'reading_hub.js',
    'listening_hub.js',
    'writing_hub.js',
    'speaking_hub.js',
    'skill_practice_hub.js',
    'blueprint.json',
    'source_grounding.json',
    'gate_validation.log',
    'provenance.json',
  ];

  for (const f of filesToCopy) {
    const src = path.join(stagingDir, f);
    const dest = path.join(prodDir, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  // Create index.js in production
  const indexPath = path.join(prodDir, 'index.js');
  fs.writeFileSync(indexPath, generateIndexWrapper(w), 'utf8');

  // Handle SVGs
  if (w.svgs) {
    const stagingSvgDir = path.join(stagingDir, 'svg');
    const prodSvgDir = path.join(prodDir, 'svg');
    const publicImgDir = path.join(ROOT_DIR, 'public/images', `week${w.num}`);

    fs.mkdirSync(prodSvgDir, { recursive: true });
    fs.mkdirSync(publicImgDir, { recursive: true });

    if (fs.existsSync(stagingSvgDir)) {
      for (const svgFile of fs.readdirSync(stagingSvgDir)) {
        if (svgFile.endsWith('.svg')) {
          fs.copyFileSync(path.join(stagingSvgDir, svgFile), path.join(prodSvgDir, svgFile));
          fs.copyFileSync(path.join(stagingSvgDir, svgFile), path.join(publicImgDir, svgFile));
        }
      }
    }
  }

  console.log(`✓ Merged Week ${w.num} (${w.theme}) to ${path.relative(ROOT_DIR, prodDir)}`);
}

console.log('\nAll 4 Wave 3 weeks merged to production successfully.');
