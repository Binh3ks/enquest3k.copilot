import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeStorySteps } from '../src/utils/storyWritingAdapter.js';

async function scanAllWeeks() {
  const srcWeeks = fs.readdirSync('src/data/weeks')
    .filter(d => /^week_\d+$/.test(d))
    .map(d => parseInt(d.replace('week_', ''), 10))
    .sort((a, b) => a - b);

  const stagingWeeks = fs.existsSync('docs/agent_artifacts/staging')
    ? fs.readdirSync('docs/agent_artifacts/staging')
        .filter(d => /^week_\d+$/.test(d))
        .map(d => parseInt(d.replace('week_', ''), 10))
        .sort((a, b) => a - b)
    : [];

  const allWeeks = Array.from(new Set([...srcWeeks, ...stagingWeeks])).sort((a, b) => a - b);

  console.log(`Auditing normalizeStorySteps across ${allWeeks.length} weeks in repo:`);
  console.log('| Week | Location | Has writing_hub? | Schema Detected | Steps Count | Status |');
  console.log('|---|---|---|---|---|---|');

  let passed = 0;
  let skippedNull = 0;

  for (const w of allWeeks) {
    const srcWriting = path.join(`src/data/weeks/week_${w}`, 'writing_hub.js');
    const stagingWriting = path.join(`docs/agent_artifacts/staging/week_${w}`, 'writing_hub.js');

    let writingFile = null;
    let location = '';

    if (fs.existsSync(srcWriting)) {
      writingFile = srcWriting;
      location = 'src/data/weeks';
    } else if (fs.existsSync(stagingWriting)) {
      writingFile = stagingWriting;
      location = 'staging';
    }

    if (!fs.existsSync(writingFile)) {
      console.log(`| W${String(w).padEnd(3)} | ${location.padEnd(14)} | NO               | -               | -           | SKIPPED (No writing_hub) |`);
      skippedNull++;
      continue;
    }

    try {
      const mod = await import(pathToFileURL(writingFile).href);
      const hub = mod.default || mod.writingHubData || mod.writing_hub || mod;
      const rawStory = hub.picture_story || hub.picture_mode || hub;

      let schemaType = 'Unknown';
      if (Array.isArray(rawStory?.steps)) schemaType = 'steps[]';
      else if (Array.isArray(rawStory?.ladder_stages)) schemaType = 'ladder_stages[]';
      else if (Array.isArray(rawStory?.panels)) schemaType = 'panels[]';
      else if (Array.isArray(rawStory?.image_panels)) schemaType = 'image_panels[]';
      else if (Array.isArray(rawStory?.sentence_starters)) schemaType = 'sentence_starters[]';

      const norm = normalizeStorySteps(rawStory, w);

      if (norm && norm.length >= 3) {
        console.log(`| W${String(w).padEnd(3)} | ${location.padEnd(14)} | YES              | ${schemaType.padEnd(17)} | ${norm.length} steps     | ✅ NORMALIZED |`);
        passed++;
      } else {
        console.log(`| W${String(w).padEnd(3)} | ${location.padEnd(14)} | YES              | ${schemaType.padEnd(17)} | NULL        | ⚠️ RETURNED NULL (Fail-Loud) |`);
        skippedNull++;
      }
    } catch (err) {
      console.log(`| W${String(w).padEnd(3)} | ${location.padEnd(14)} | YES              | ERROR           | NULL        | ❌ IMPORT ERROR: ${err.message} |`);
    }
  }

  console.log('========================================================================');
  console.log(`Total weeks scanned: ${allWeeks.length}`);
  console.log(`Normalized successfully: ${passed}`);
  console.log(`Returned null / skipped: ${skippedNull}`);
}

scanAllWeeks().catch(console.error);
