// Automated Comprehensive Pipeline Schema & Content Auditor for EngQuest3K
// Usage: node scripts/audit_new_week.mjs [weekNumber]

import fs from 'fs';
import path from 'path';

const vnChars = new Set('àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ'.split(''));
const praiseRegex = /^\s*(Awesome|Great|Brilliant|Exciting|Hooray|Wonderful|Great job|Fantastic|Good job)[!\s,]/i;

async function auditWeek(weekNum) {
  const wStr = String(weekNum).padStart(2, '0');
  const advDir = path.join(process.cwd(), 'src/data/weeks', `week_${wStr}`);
  const rootRealFile = path.join(process.cwd(), 'src/data/weeks', `week_${wStr}_real.js`);
  const folderRealFile = path.join(advDir, `week_${wStr}_real.js`);
  
  let errors = [];

  console.log(`\n🔍 AUDITING WEEK ${wStr} PIPELINE REQUIREMENTS...`);

  // 1. Check directories
  if (!fs.existsSync(advDir)) {
    errors.push(`Missing Advanced mode directory: ${advDir}`);
  }

  // 2. Audit vocab.js
  const vPath = path.join(advDir, 'vocab.js');
  if (fs.existsSync(vPath)) {
    const content = fs.readFileSync(vPath, 'utf8');
    if (!content.includes('definition_en')) errors.push(`vocab.js missing definition_en key!`);
    
    // Check for Vietnamese characters in definition_en
    const lines = content.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('definition_en:')) {
        const m = l.match(/definition_en:\s*["']([^"']+)["']/);
        if (m) {
          const val = m[1];
          for (let ch of val.toLowerCase()) {
            if (vnChars.has(ch)) {
              errors.push(`vocab.js L${idx+1}: definition_en contains Vietnamese characters: "${val}"`);
              break;
            }
          }
        }
      }
    });
  } else {
    errors.push(`Missing vocab.js in week_${wStr}`);
  }

  // 3. Audit word_power.js
  const wpPath = path.join(advDir, 'word_power.js');
  if (fs.existsSync(wpPath)) {
    const content = fs.readFileSync(wpPath, 'utf8');
    if (!content.includes('definition_en')) errors.push(`word_power.js missing definition_en key!`);
  } else {
    errors.push(`Missing word_power.js in week_${wStr}`);
  }

  // 4. Audit shadowing.js grammar and ttsScript
  const shPath = path.join(advDir, 'shadowing.js');
  if (fs.existsSync(shPath)) {
    const shContent = fs.readFileSync(shPath, 'utf8');
    if (/\bEveryone were\b/i.test(shContent)) {
      errors.push(`shadowing.js contains incorrect grammar "Everyone were" (must be "Everyone was")`);
    }
  }

  // 5. Audit week_XX_real.js files (No premature praise, target_vocab = 20, synchronization)
  if (fs.existsSync(folderRealFile)) {
    const realMod = (await import(folderRealFile)).default;
    if ((realMod.target_vocab?.length || 0) !== 20) {
      errors.push(`week_${wStr}_real.js (folder) target_vocab count is ${realMod.target_vocab?.length || 0}, expected 20`);
    }

    // Check premature praise in template
    const missions = realMod.story_missions || realMod.missions || [];
    missions.forEach(m => {
      (m.story_arc || []).forEach(arc => {
        (arc.phase_questions || []).forEach(q => {
          if (praiseRegex.test(q.template || '')) {
            errors.push(`Premature praise detected in question template: "${q.template}"`);
          }
        });
      });
    });
  } else {
    errors.push(`Missing week_${wStr}_real.js inside folder week_${wStr}`);
  }

  if (fs.existsSync(rootRealFile) && fs.existsSync(folderRealFile)) {
    const c1 = fs.readFileSync(rootRealFile, 'utf8').trim();
    const c2 = fs.readFileSync(folderRealFile, 'utf8').trim();
    if (c1 !== c2) {
      errors.push(`Desynchronization between root week_${wStr}_real.js and folder week_${wStr}_real.js`);
    }
  } else if (!fs.existsSync(rootRealFile)) {
    errors.push(`Missing root week_${wStr}_real.js file`);
  }

  // 6. Audit Writing Panels & Action Tags (Content Linter)
  const writingFile = path.join(advDir, 'writing.js');
  if (fs.existsSync(writingFile)) {
    const mod = await import(path.resolve(writingFile));
    const writingData = mod.default || mod;
    const panels = writingData.picture_mode?.panels;
    if (Array.isArray(panels)) {
      panels.forEach((p, idx) => {
        if (!Array.isArray(p.action_tags) || p.action_tags.length === 0) {
          errors.push(`writing.js Panel ${idx+1}: missing required 'action_tags' array!`);
        }
        if (!p.sentence_frame || p.sentence_frame.trim().length < 5) {
          errors.push(`writing.js Panel ${idx+1}: missing valid 'sentence_frame'!`);
        }
      });
    }
  }

  // Output results
  if (errors.length === 0) {
    console.log(`✅ WEEK ${wStr} PASSED ALL PIPELINE SCHEMA GATEWAY AUDITS!`);
  } else {
    console.error(`❌ WEEK ${wStr} FAILED PIPELINE AUDIT (${errors.length} errors):`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
}

const targetWeek = process.argv[2] ? parseInt(process.argv[2], 10) : 37;
auditWeek(targetWeek).catch(err => {
  console.error(err);
  process.exit(1);
});
