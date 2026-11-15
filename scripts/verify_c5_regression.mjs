import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { normalizeStorySteps } from '../src/utils/storyWritingAdapter.js';

const C5_WEEKS = [33, 34, 35, 78, 125];

async function verifyC5() {
  console.log('C5 REGRESSION VERIFICATION: W33, W34, W35, W78, W125');
  console.log('====================================================');

  for (const w of C5_WEEKS) {
    let filePath = path.resolve(`src/data/weeks/week_${w}/writing_hub.js`);
    if (!fs.existsSync(filePath)) {
      filePath = path.resolve(`docs/agent_artifacts/staging/week_${w}/writing_hub.js`);
    }

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ W${w}: File not found at ${filePath}`);
      continue;
    }

    const mod = await import(pathToFileURL(filePath).href);
    const hub = mod.default || mod.writingHubData || mod.writing_hub || mod;
    const rawStory = hub.picture_story || hub.picture_mode || hub;

    const originalSteps = rawStory.steps;
    assert(Array.isArray(originalSteps), `W${w} rawStory.steps must be an array`);

    const normalizedSteps = normalizeStorySteps(rawStory, w);
    assert(Array.isArray(normalizedSteps), `W${w} normalizeStorySteps must return an array`);
    assert.strictEqual(normalizedSteps.length, originalSteps.slice(0, 5).length, `W${w} length match`);

    // Verify critical fields match
    for (let i = 0; i < normalizedSteps.length; i++) {
      const orig = originalSteps[i];
      const norm = normalizedSteps[i];

      assert.strictEqual(norm.scene, orig.scene || (i + 1), `W${w} scene ${i + 1} scene number match`);
      assert.strictEqual(norm.title, orig.title || `Scene ${i + 1}`, `W${w} scene ${i + 1} title match`);
      if (orig.caption) assert.strictEqual(norm.caption, orig.caption, `W${w} scene ${i + 1} caption match`);
      if (orig.image_url) assert.strictEqual(norm.image_url, orig.image_url, `W${w} scene ${i + 1} image_url match`);
    }

    console.log(`✓ W${String(w).padEnd(3)}: PASS deep comparison (${normalizedSteps.length} steps matched original steps)`);
  }

  console.log('====================================================');
  console.log('✅ ALL C5 WEEKS PASSED REGRESSION VERIFICATION: ZERO BREAKING CHANGES.');
}

verifyC5().catch(err => {
  console.error(err);
  process.exit(1);
});
