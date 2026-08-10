// Automated Comprehensive Pipeline Schema & Content Auditor for EngQuest3K
// Usage: node scripts/audit_new_week.mjs [weekNumber]

import fs from 'fs';
import path from 'path';

const vnChars = new Set('àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ'.split(''));

function auditWeek(weekNum) {
  const wStr = String(weekNum).padStart(2, '0');
  const advDir = path.join(process.cwd(), 'src/data/weeks', `week_${wStr}`);
  const easyDir = path.join(process.cwd(), 'src/data/weeks_easy', `week_${wStr}`);
  
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
auditWeek(targetWeek);
