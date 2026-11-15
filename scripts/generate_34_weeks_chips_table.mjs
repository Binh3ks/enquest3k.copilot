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

async function loadWeekData(weekNum) {
  const isLive = LIVE_WEEKS.includes(weekNum);
  const baseDir = isLive
    ? path.resolve(`src/data/weeks/week_${weekNum}`)
    : path.resolve(`docs/agent_artifacts/staging/week_${weekNum}`);

  const writingFile = path.join(baseDir, 'writing_hub.js');
  const vocabFile = path.join(baseDir, 'vocab.js');

  let rawStory = null;
  let vocab = [];

  if (fs.existsSync(writingFile)) {
    const mod = await import(pathToFileURL(writingFile).href);
    const hub = mod.default || mod.writingHubData || mod.writing_hub || mod;
    rawStory = hub.picture_story || hub.picture_mode || hub;
  }

  if (fs.existsSync(vocabFile)) {
    try {
      const vmod = await import(pathToFileURL(vocabFile).href);
      const vdata = vmod.default?.vocab || vmod.vocabData?.vocab || vmod.vocab || vmod.vocabulary || vmod;
      if (Array.isArray(vdata)) {
        vocab = vdata.map(v => typeof v === 'string' ? v : (v.word || v.term || '')).filter(Boolean);
      }
    } catch (e) {
      // ignore
    }
  }

  return { rawStory, vocab };
}

async function run() {
  console.log('| Week | Type | Total Scenes | Scene 1 Chips | Scene 2 Chips | Scene 3 Chips | Scene 4 Chips | Scene 5 Chips |');
  console.log('|---|---|---|---|---|---|---|---|');

  for (const w of ALL_34_WEEKS) {
    const isLive = LIVE_WEEKS.includes(w);
    const type = isLive ? 'LIVE' : 'STAGED';
    const { rawStory, vocab } = await loadWeekData(w);
    const steps = normalizeStorySteps(rawStory, w, { vocab });

    if (!steps) {
      console.log(`| W${w} | ${type} | NULL | - | - | - | - | - |`);
      continue;
    }

    const sChips = steps.map(s => {
      const chips = s.pills || s.ordered_chips || [];
      return chips.length > 0 ? chips.map(c => `\`${c}\``).join(', ') : '*(none)*';
    });

    while (sChips.length < 5) {
      sChips.push('-');
    }

    console.log(`| W${w} | ${type} | ${steps.length} | ${sChips[0]} | ${sChips[1]} | ${sChips[2]} | ${sChips[3]} | ${sChips[4]} |`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
