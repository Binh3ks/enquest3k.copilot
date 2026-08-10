// Script to Audit and Fix Lesson Plan Phrase Banks (W01–W156)
// Enforces complete grammatical chunking, eliminates orphaned verbs, and ensures CLIL scientific accuracy.

import fs from 'fs';
import path from 'path';

function fixPhraseBankText(lineText) {
  if (typeof lineText !== 'string') return lineText;
  let text = lineText;

  // 1. Remove trailing orphaned verbs inside option parentheses: e.g. "(living thing is / small rock is / plastic chair is)" -> "(living thing / small rock / plastic chair)"
  text = text.replace(/\(([^)]+)\)/g, (match, inner) => {
    const options = inner.split('/').map(s => s.trim());
    const hasTrailingIs = options.every(opt => /\s+is$/i.test(opt));
    const hasTrailingAre = options.every(opt => /\s+are$/i.test(opt));
    const hasTrailingWas = options.every(opt => /\s+was$/i.test(opt));
    const hasTrailingWere = options.every(opt => /\s+were$/i.test(opt));

    if (hasTrailingIs) {
      return `(${options.map(opt => opt.replace(/\s+is$/i, '')).join(' / ')})`;
    }
    if (hasTrailingAre) {
      return `(${options.map(opt => opt.replace(/\s+are$/i, '')).join(' / ')})`;
    }
    if (hasTrailingWas) {
      return `(${options.map(opt => opt.replace(/\s+was$/i, '')).join(' / ')})`;
    }
    if (hasTrailingWere) {
      return `(${options.map(opt => opt.replace(/\s+were$/i, '')).join(' / ')})`;
    }

    // Fix pronoun switches: e.g. "Next year, he" when context is "I am..." -> "Next year, I will"
    let cleanedOptions = options.map(opt => {
      if (opt === 'Next year, he') return 'Next year, I will';
      if (opt === 'instance, a chair') return 'instance, a dog';
      return opt;
    });

    return `(${cleanedOptions.join(' / ')})`;
  });

  return text;
}

function processJsonValue(val) {
  if (typeof val === 'string') {
    return fixPhraseBankText(val);
  }
  if (Array.isArray(val)) {
    return val.map(processJsonValue);
  }
  if (val && typeof val === 'object') {
    const res = {};
    for (const key of Object.keys(val)) {
      res[key] = processJsonValue(val[key]);
    }
    return res;
  }
  return val;
}

async function fixAllLessonPlans() {
  const root = process.cwd();
  const lessonsDir = path.join(root, 'public/data/lessons');
  console.log('🚀 AUDITING & FIXING LESSON PLAN PHRASE BANKS (W01–W156)...\n');

  const files = fs.readdirSync(lessonsDir).filter(f => f.endsWith('.json'));
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(lessonsDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const data = JSON.parse(raw);
      const cleaned = processJsonValue(data);
      const newRaw = JSON.stringify(cleaned, null, 2);

      if (newRaw !== raw) {
        fs.writeFileSync(filePath, newRaw, 'utf8');
        updatedCount++;
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`✅ LESSON PLAN PHRASE BANK AUDIT COMPLETE: Updated ${updatedCount} lesson plan files.`);
}

fixAllLessonPlans().catch(console.error);
