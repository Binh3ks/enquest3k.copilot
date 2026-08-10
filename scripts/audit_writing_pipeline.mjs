// Automated Audit & Validation Gatekeeper for Write & Speak Station
// Usage: node scripts/audit_writing_pipeline.mjs

import fs from 'fs';
import path from 'path';

async function auditWritingPipeline() {
  const root = process.cwd();
  const weeksDir = path.join(root, 'src/data/weeks');
  const easyDir = path.join(root, 'src/data/weeks_easy');
  let totalAudited = 0;
  let errors = [];

  console.log('🔍 AUDITING WRITE & SPEAK STATION EASY VS ADVANCED MODE PIPELINE (W01–W48+)...\n');

  for (let i = 1; i <= 48; i++) {
    const pad = String(i).padStart(2, '0');
    const wFileAdv = path.join(weeksDir, `week_${pad}`, 'writing.js');
    const wFileEasy = path.join(easyDir, `week_${pad}`, 'writing.js');

    if (!fs.existsSync(wFileAdv)) {
      continue;
    }

    totalAudited++;
    const targetSentences = i <= 15 ? 6 : (i <= 28 ? 8 : 10);
    const modAdv = (await import(wFileAdv)).default;

    // 1. ADVANCED MODE AUDIT
    const framesAdv = modAdv?.sentence_frames || [];
    if (i <= 35 && framesAdv.length !== targetSentences) {
      errors.push(`W${pad} ADV: Sentence count is ${framesAdv.length}, expected ${targetSentences}`);
    }
    if (i <= 35) {
      framesAdv.forEach((f, idx) => {
        const gapCount = (f.template || '').split('___').length - 1;
        if (gapCount !== 2) {
          errors.push(`W${pad} ADV frame ${idx+1} has ${gapCount} gaps (expected EXACTLY 2 gaps for Advanced mode)`);
        }
      });
    }

    // 2. EASY MODE AUDIT (W01-W35)
    if (fs.existsSync(wFileEasy)) {
      const modEasy = (await import(wFileEasy)).default;
      const framesEasy = modEasy?.sentence_frames || [];
      if (framesEasy.length !== targetSentences) {
        errors.push(`W${pad} EASY: Sentence count is ${framesEasy.length}, expected ${targetSentences}`);
      }
      framesEasy.forEach((f, idx) => {
        const gapCount = (f.template || '').split('___').length - 1;
        if (gapCount !== 1) {
          errors.push(`W${pad} EASY frame ${idx+1} has ${gapCount} gaps (expected EXACTLY 1 gap for Easy mode)`);
        }
      });
    }

    // 3. ASSETS PRESERVATION GUARD (W16-W32)
    if (i >= 16 && i <= 32) {
      const picMode = modAdv?.story_prompts?.picture_mode;
      const expectedImg = `/images/week${pad}/story_writing_pic.jpg`;
      if (!picMode || picMode.image_url !== expectedImg) {
        errors.push(`W${pad}: Production image_url modified! Expected "${expectedImg}", found "${picMode?.image_url}"`);
      }
    }
  }

  console.log(`Audited ${totalAudited} week writing.js files across Easy & Advanced modes.`);
  if (errors.length === 0) {
    console.log('✅ ALL WRITE & SPEAK EASY VS ADVANCED MODE PIPELINE AUDITS PASSED CLEANLY!');
  } else {
    console.error(`❌ FOUND ${errors.length} PIPELINE AUDIT ERRORS:`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
}

auditWritingPipeline().catch(err => {
  console.error(err);
  process.exit(1);
});
