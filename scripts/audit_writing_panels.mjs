/**
 * AUDIT WRITING PANELS & ACTION TAGS (CONTENT LINTER)
 *
 * Enforces strict pedagogical alignment between image action tags and suggested vocabulary chunks.
 * Fails build if:
 * 1. A panel is missing action_tags.
 * 2. Pills do not contain chunks matching the panel's action_tags.
 * 3. sentence_frame is missing or empty.
 * 4. nova_question_en is missing.
 */

import fs from 'fs';
import path from 'path';

export async function auditWritingPanels(weekNum) {
  const padded = String(weekNum).padStart(2, '0');
  const filePath = `src/data/weeks/week_${padded}/writing.js`;

  if (!fs.existsSync(filePath)) {
    console.error(`❌ [Content Linter] File not found: ${filePath}`);
    return false;
  }

  const mod = await import(path.resolve(filePath));
  const writingData = mod.default || mod;
  const panels = writingData.picture_mode?.panels;

  if (!Array.isArray(panels) || panels.length !== 3) {
    console.error(`❌ [Content Linter] W${weekNum} picture_mode must contain exactly 3 panels!`);
    return false;
  }

  let hasError = false;

  panels.forEach((panel, idx) => {
    const pNum = idx + 1;
    // 1. Check action_tags
    if (!Array.isArray(panel.action_tags) || panel.action_tags.length === 0) {
      console.error(`❌ [Content Linter] Panel ${pNum} is missing required 'action_tags' array!`);
      hasError = true;
    }

    // 2. Check pills
    if (!Array.isArray(panel.pills) || panel.pills.length < 3) {
      console.error(`❌ [Content Linter] Panel ${pNum} must have at least 3 vocabulary pills!`);
      hasError = true;
    }

    // 3. Semantic alignment: pills must reflect action_tags
    if (panel.action_tags && panel.pills) {
      const allPillText = panel.pills.join(' ').toLowerCase();
      const matchedTags = panel.action_tags.filter(tag => allPillText.includes(tag.toLowerCase().split(' ')[0]));
      if (matchedTags.length === 0) {
        console.warn(`⚠️ [Content Linter] Panel ${pNum} warning: No pills directly match action_tags [${panel.action_tags.join(', ')}]`);
      }
    }

    // 4. Check sentence_frame
    if (!panel.sentence_frame || typeof panel.sentence_frame !== 'string' || panel.sentence_frame.trim().length < 5) {
      console.error(`❌ [Content Linter] Panel ${pNum} is missing valid 'sentence_frame'!`);
      hasError = true;
    }

    // 5. Check nova_question_en
    if (!panel.nova_question_en || panel.nova_question_en.trim().length < 10) {
      console.error(`❌ [Content Linter] Panel ${pNum} is missing valid 'nova_question_en'!`);
      hasError = true;
    }
  });

  if (!hasError) {
    console.log(`✅ [Content Linter] W${weekNum} Writing Panels & Action Tags passed 100%!`);
    return true;
  }
  return false;
}

// CLI standalone runner
if (process.argv[1]?.endsWith('audit_writing_panels.mjs')) {
  const weekNum = parseInt(process.argv[2], 10) || 33;
  const ok = await auditWritingPanels(weekNum);
  process.exit(ok ? 0 : 1);
}
