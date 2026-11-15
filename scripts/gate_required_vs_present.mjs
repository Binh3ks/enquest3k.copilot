import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SPEC_FILE = path.join(ROOT_DIR, 'media_requirements.json');
if (!fs.existsSync(SPEC_FILE)) {
  console.error('Error: media_requirements.json not found');
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(SPEC_FILE, 'utf8'));

// Check weeks passed via CLI or default to [33, 34, 39, 41]
const targetWeeks = process.argv.slice(2).map(Number).filter(n => !isNaN(n));
const WEEKS_TO_CHECK = targetWeeks.length > 0 ? targetWeeks : [33, 34, 39, 41];

function checkFiles(dir, filterFn) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => {
    if (!filterFn(f)) return false;
    const full = path.join(dir, f);
    return fs.statSync(full).size > 0;
  });
}

async function run() {
  console.log('========================================================================================================================');
  console.log('GATE: REQUIRED-VS-PRESENT (PHYSICAL ASSETS ON DISK ONLY — NO DATA DECLARATION PROXIES)');
  console.log('========================================================================================================================\n');

  console.log('| Week | Quest ID | Quest Name | Req Img | Present Img | Req Aud | Present Aud | Img Status | Aud Status | Quest % |');
  console.log('|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|');

  const weekSummaries = [];

  for (const w of WEEKS_TO_CHECK) {
    const imgDir = path.join(ROOT_DIR, `public/images/week${w}`);
    const audDir = path.join(ROOT_DIR, `public/audio/week${w}`);

    let weekTotalReqImg = 0;
    let weekTotalPresentImg = 0;
    let weekTotalReqAud = 0;
    let weekTotalPresentAud = 0;

    for (const [qId, qSpec] of Object.entries(spec.quests)) {
      let presentImg = 0;
      let presentAud = 0;

      // Check physical files on disk based on quest type
      if (qId === 'gear1_webtoon') {
        presentImg = checkFiles(imgDir, f => /^scene_[1-5]\.(jpg|png)$/.test(f)).length;
        presentAud = checkFiles(audDir, f => /^scene_[1-5]\.mp3$/.test(f)).length;
      } else if (qId === 'gear2_karaoke') {
        presentImg = 0;
        presentAud = checkFiles(audDir, f => /^shadowing_[1-8]\.mp3$/.test(f)).length;
      } else if (qId === 'gear3_retell') {
        presentImg = 0; // reuses scene images
        presentAud = checkFiles(audDir, f => f.includes('retell')).length;
      } else if (qId === 'gear4_clil') {
        presentImg = checkFiles(imgDir, f => f.startsWith('clil')).length;
        presentAud = checkFiles(audDir, f => f.startsWith('clil')).length;
      } else if (qId === 'science_lab') {
        presentImg = checkFiles(imgDir, f => f.includes('action_lab') || f.includes('science_lab')).length;
        presentAud = 0;
      } else if (qId === 'science_report') {
        presentImg = checkFiles(imgDir, f => f.includes('discovery') || f.includes('report') || f.includes('hotspot')).length;
        presentAud = 0;
      } else if (qId === 'word_blitz') {
        presentImg = checkFiles(imgDir, f => f.startsWith('vocab_') || f.startsWith('card_')).length;
        presentAud = checkFiles(audDir, f => f.startsWith('vocab_')).length;
      } else if (qId === 'sentence_smash') {
        presentImg = 0;
        presentAud = 0;
      } else if (qId === 'math_quest') {
        presentImg = checkFiles(imgDir, f => f.startsWith('barmodel_') && f.endsWith('.svg')).length;
        presentAud = 0;
      } else if (qId === 'story_writer') {
        presentImg = checkFiles(imgDir, f => f.startsWith('writing_panel_')).length;
        presentAud = checkFiles(audDir, f => f.startsWith('writing_scene_')).length;
      } else if (qId === 'broadcast_studio') {
        presentImg = 0; // reuses panels
        presentAud = checkFiles(audDir, f => f.includes('broadcast') || f.includes('video_challenge')).length;
      } else if (qId === 'info_exchange') {
        presentImg = checkFiles(imgDir, f => /^card_[ab]\.jpg$/.test(f) || /^speaking_p2.*\.jpg$/.test(f)).length;
        presentAud = checkFiles(audDir, f => f.includes('speaking_p2') || f.includes('cue_')).length;
      } else if (qId === 'boss_listening') {
        presentImg = checkFiles(imgDir, f => f.includes('listening') || /^card_[a-h]\.jpg$/.test(f)).length;
        presentAud = checkFiles(audDir, f => f.startsWith('listening_part')).length;
      } else if (qId === 'boss_reading') {
        presentImg = 0;
        presentAud = 0;
      } else if (qId === 'weekly_review') {
        presentImg = checkFiles(imgDir, f => f.startsWith('spot_diff_')).length;
        presentAud = 0;
      }

      // Clamp present to required for percentage calculation
      const cappedImg = Math.min(qSpec.required_images, presentImg);
      const cappedAud = Math.min(qSpec.required_audio, presentAud);

      weekTotalReqImg += qSpec.required_images;
      weekTotalPresentImg += presentImg;
      weekTotalReqAud += qSpec.required_audio;
      weekTotalPresentAud += presentAud;

      const totalReq = qSpec.required_images + qSpec.required_audio;
      const totalPresent = cappedImg + cappedAud;
      const pct = totalReq === 0 ? 100 : Math.round((totalPresent / totalReq) * 100);

      const imgStatus = qSpec.required_images === 0 ? 'N/A' : presentImg >= qSpec.required_images ? '✅ PASS' : `❌ ${presentImg}/${qSpec.required_images}`;
      const audStatus = qSpec.required_audio === 0 ? 'N/A' : presentAud >= qSpec.required_audio ? '✅ PASS' : `❌ ${presentAud}/${qSpec.required_audio}`;

      console.log(`| W${w} | \`${qId}\` | ${qSpec.quest_name} | ${qSpec.required_images} | ${presentImg} | ${qSpec.required_audio} | ${presentAud} | ${imgStatus} | ${audStatus} | ${pct}% |`);
    }

    const totalReq = weekTotalReqImg + weekTotalReqAud;
    const totalPresent = Math.min(weekTotalReqImg, weekTotalPresentImg) + Math.min(weekTotalReqAud, weekTotalPresentAud);
    const weekPct = Math.round((totalPresent / totalReq) * 100);

    weekSummaries.push({
      week: w,
      reqImg: weekTotalReqImg,
      presentImg: weekTotalPresentImg,
      reqAud: weekTotalReqAud,
      presentAud: weekTotalPresentAud,
      pct: weekPct
    });

    console.log(`| **W${w} TOTAL** | - | **ALL 15 QUESTS** | **${weekTotalReqImg}** | **${weekTotalPresentImg}** | **${weekTotalReqAud}** | **${weekTotalPresentAud}** | **${weekTotalPresentImg >= weekTotalReqImg ? '✅ PASS' : '❌ SHORT'}** | **${weekTotalPresentAud >= weekTotalReqAud ? '✅ PASS' : '❌ SHORT'}** | **${weekPct}%** |`);
    console.log('|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|');
  }

  console.log('\n========================================================================================================================');
  console.log('SUMMARY TABLE: WEEK LEVEL MEDIA READINESS');
  console.log('========================================================================================================================');
  console.log('| Week | Reference / Target | Req Img | Present Img | Req Aud | Present Aud | Total Req | Total Present | Overall Readiness |');
  console.log('|:---:|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|');
  for (const s of weekSummaries) {
    const tag = s.week === 33 ? 'Gold Standard Baseline' : s.week === 34 ? 'Rotary Freeze Baseline' : 'Batch Round 103 Target';
    console.log(`| W${s.week} | ${tag} | ${s.reqImg} | ${s.presentImg} | ${s.reqAud} | ${s.presentAud} | ${s.reqImg + s.reqAud} | ${s.presentImg + s.presentAud} | ${s.pct}% |`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
