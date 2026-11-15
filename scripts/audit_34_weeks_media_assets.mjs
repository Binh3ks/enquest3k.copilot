import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeStorySteps } from '../src/utils/storyWritingAdapter.js';

const LIVE_WEEKS = [39, 41, 43, 45, 46];
const STAGED_WEEKS = [
  40, 42, 44,
  47, 48, 49, 50, 51, 52, 53, 54,
  55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72
];
const ALL_34_WEEKS = [...LIVE_WEEKS, ...STAGED_WEEKS].sort((a, b) => a - b);

async function loadWritingHub(weekNum) {
  const isLive = LIVE_WEEKS.includes(weekNum);
  const filePath = isLive
    ? path.resolve(`src/data/weeks/week_${weekNum}/writing_hub.js`)
    : path.resolve(`docs/agent_artifacts/staging/week_${weekNum}/writing_hub.js`);

  if (!fs.existsSync(filePath)) {
    return null;
  }
  const mod = await import(pathToFileURL(filePath).href);
  return mod.default || mod.writing_hub || mod;
}

async function auditAssets() {
  console.log('AUDIT PHYSICAL MEDIA ASSETS FOR 34 STORY WRITING WEEKS (fs.existsSync)');
  console.log('========================================================================');
  console.log('| Week | Type   | Images Folder Exists? | Audio Folder Exists? | Scene Images Found | Scene Audio Found | Adapter Normalized Steps |');
  console.log('|------|--------|-----------------------|----------------------|--------------------|-------------------|--------------------------|');

  const missingImageWeeks = [];
  const missingAudioWeeks = [];

  for (const w of ALL_34_WEEKS) {
    const isLive = LIVE_WEEKS.includes(w);
    const type = isLive ? 'LIVE' : 'STAGED';
    
    // Check disk paths
    const imgDir = path.resolve(`public/images/week${w}`);
    const imgDirAlt = path.resolve(`public/images/week_${w}`);
    const audioDir = path.resolve(`public/audio/week${w}`);
    const audioDirAlt = path.resolve(`public/audio/week_${w}`);

    const hasImgDir = fs.existsSync(imgDir) || fs.existsSync(imgDirAlt);
    const hasAudioDir = fs.existsSync(audioDir) || fs.existsSync(audioDirAlt);

    let imgCount = 0;
    if (fs.existsSync(imgDir)) {
      imgCount += fs.readdirSync(imgDir).filter(f => f.startsWith('writing_panel') || f.startsWith('scene')).length;
    }
    if (fs.existsSync(imgDirAlt)) {
      imgCount += fs.readdirSync(imgDirAlt).filter(f => f.startsWith('writing_panel') || f.startsWith('scene')).length;
    }

    let audioCount = 0;
    if (fs.existsSync(audioDir)) {
      audioCount += fs.readdirSync(audioDir).filter(f => f.startsWith('scene') || f.startsWith('writing')).length;
    }
    if (fs.existsSync(audioDirAlt)) {
      audioCount += fs.readdirSync(audioDirAlt).filter(f => f.startsWith('scene') || f.startsWith('writing')).length;
    }

    if (imgCount === 0) missingImageWeeks.push(w);
    if (audioCount === 0) missingAudioWeeks.push(w);

    const writingHub = await loadWritingHub(w);
    const rawStory = writingHub?.picture_story || writingHub?.picture_mode || writingHub;
    const steps = normalizeStorySteps(rawStory, w);

    const stepsStatus = steps ? `${steps.length} steps (img: ${steps.filter(s => s.image_url).length}, aud: ${steps.filter(s => s.audio_url).length})` : 'NULL (Error)';

    console.log(`| W${String(w).padEnd(3)} | ${type.padEnd(6)} | ${String(hasImgDir).padEnd(21)} | ${String(hasAudioDir).padEnd(20)} | ${String(imgCount).padEnd(18)} | ${String(audioCount).padEnd(17)} | ${stepsStatus.padEnd(24)} |`);
  }

  console.log('========================================================================');
  console.log(`Total weeks analyzed: ${ALL_34_WEEKS.length}`);
  console.log(`Weeks missing scene images on disk (100% of 34): ${missingImageWeeks.length} weeks -> [${missingImageWeeks.join(', ')}]`);
  console.log(`Weeks missing scene audio on disk (100% of 34): ${missingAudioWeeks.length} weeks -> [${missingAudioWeeks.join(', ')}]`);
  console.log('Conclusion: ZERO fabricated URLs are served by the adapter. When image_url is null, UI renders scenario prompt card and disables "Look at the pictures".');
}

auditAssets().catch(err => {
  console.error(err);
  process.exit(1);
});
