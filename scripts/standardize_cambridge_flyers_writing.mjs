// Script to standardize writing.js files W33–W70+ for Cambridge Flyers 15-Shield Master Scaffolding System
import fs from 'fs';
import path from 'path';

function sanitizeText(str) {
  if (typeof str !== 'string') return str;
  let text = str;

  // 1. Fix spacing before punctuation: "word ." -> "word."
  text = text.replace(/\s+([.,!?:;])/g, '$1');

  // 2. Remove trailing illegal adverbs at end of sentences: e.g. "every day then." -> "every day."
  text = text.replace(/\b(slowly|carefully|happily|then|so|next|finally)\s*\./gi, '.');

  return text;
}

function processObject(obj) {
  if (typeof obj === 'string') return sanitizeText(obj);
  if (Array.isArray(obj)) return obj.map(processObject);
  if (obj && typeof obj === 'object') {
    const res = {};
    for (const key of Object.keys(obj)) {
      res[key] = processObject(obj[key]);
    }
    return res;
  }
  return obj;
}

async function standardizeCambridgeWriting() {
  const root = process.cwd();
  console.log('🚀 STANDARDIZING CAMBRIDGE FLYERS WRITING DATA (W33–W70+)...\n');

  const baseDirs = [
    path.join(root, 'src/data/weeks'),
    path.join(root, 'src/data/weeks_easy')
  ];

  let updatedCount = 0;

  for (const baseDir of baseDirs) {
    if (!fs.existsSync(baseDir)) continue;
    const weekDirs = fs.readdirSync(baseDir).filter(d => d.startsWith('week_'));

    for (const weekDir of weekDirs) {
      const weekNum = parseInt(weekDir.replace('week_', ''), 10);
      const writingPath = path.join(baseDir, weekDir, 'writing.js');

      if (!fs.existsSync(writingPath)) continue;

      try {
        const rawContent = fs.readFileSync(writingPath, 'utf8');

        // Sanitize punctuation spaces
        let cleanedContent = sanitizeText(rawContent);

        if (cleanedContent !== rawContent) {
          fs.writeFileSync(writingPath, cleanedContent, 'utf8');
          updatedCount++;
          console.log(`✅ Sanitized punctuation & text in: ${path.relative(root, writingPath)}`);
        }
      } catch (err) {
        console.error(`Error processing ${writingPath}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 CAMBRIDGE FLYERS WRITING DATA STANDARDIZATION COMPLETE! Processed ${updatedCount} writing.js files.`);
}

standardizeCambridgeWriting().catch(console.error);
