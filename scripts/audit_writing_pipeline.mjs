// Automated Audit & Validation Gatekeeper for Write & Speak Station
// Usage: node scripts/audit_writing_pipeline.mjs

import fs from 'fs';
import path from 'path';

async function auditWritingPipeline() {
  const root = process.cwd();
  const weeksDir = path.join(root, 'src/data/weeks');
  let totalAudited = 0;
  let errors = [];

  console.log('🔍 AUDITING WRITE & SPEAK STATION PIPELINE REQUIREMENTS (W01–W48+)...\n');

  for (let i = 1; i <= 48; i++) {
    const pad = String(i).padStart(2, '0');
    const wDir = path.join(weeksDir, `week_${pad}`);
    const wFile = path.join(wDir, 'writing.js');

    if (!fs.existsSync(wFile)) {
      continue;
    }

    totalAudited++;
    const mod = (await import(wFile)).default;

    // 1. ASSETS PRESERVATION GUARD (W16-W32)
    if (i >= 16 && i <= 32) {
      const picMode = mod?.story_prompts?.picture_mode;
      const expectedImg = `/images/week${pad}/story_writing_pic.jpg`;
      if (!picMode || picMode.image_url !== expectedImg) {
        errors.push(`W${pad}: Production image_url modified! Expected "${expectedImg}", found "${picMode?.image_url}"`);
      }
    }

    // 2. FOUNDATION LEVEL (W01-W15)
    if (i <= 15) {
      const frames = mod?.sentence_frames || [];
      if (frames.length === 0) {
        errors.push(`W${pad}: Missing sentence_frames for Foundation Level`);
      }
    }

    // 3. ADVANCED STORYTELLING (W16+)
    if (i >= 16) {
      if (!mod?.story_prompts?.picture_mode && !mod?.story_prompts?.topic_mode) {
        errors.push(`W${pad}: Missing story_prompts for Advanced Storytelling stage`);
      }
    }
  }

  console.log(`Audited ${totalAudited} week writing.js files.`);
  if (errors.length === 0) {
    console.log('✅ ALL WRITE & SPEAK PIPELINE AUDITS PASSED CLEANLY!');
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
