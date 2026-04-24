/**
 * audit_read_explore.mjs
 * Checks all 30 weeks × 2 modes for read.js and explore.js
 * Flags questions whose answers are NOT findable in the passage text.
 */

import { readFileSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const ROOT = process.cwd();
const WEEKS = Array.from({ length: 30 }, (_, i) => i + 1);

const MODES = [
  { label: 'advanced', dir: (w) => `src/data/weeks/week_${String(w).padStart(2,'0')}` },
  { label: 'easy',     dir: (w) => `src/data/weeks_easy/week_${String(w).padStart(2,'0')}` },
];

// Strip markdown bold/italic markers, lowercase, remove punctuation
function normalizeText(str) {
  return (str || '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .toLowerCase()
    .replace(/[.,!?;:'"()\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if any answer token appears in passage (at least one answer word ≥ 3 chars)
function answerFoundInPassage(answers, passage) {
  const norm = normalizeText(passage);
  for (const ans of answers) {
    const normAns = normalizeText(ans);
    // Check full answer phrase
    if (norm.includes(normAns)) return true;
    // Check key words (skip articles/short words)
    const words = normAns.split(' ').filter(w => w.length >= 3);
    if (words.length > 0 && words.every(w => norm.includes(w))) return true;
  }
  return false;
}

async function loadModule(filePath) {
  try {
    const url = pathToFileURL(path.resolve(ROOT, filePath)).href;
    const mod = await import(url);
    return mod.default || mod;
  } catch (e) {
    return null;
  }
}

const issues = [];
const checked = [];

for (const week of WEEKS) {
  for (const mode of MODES) {
    const dir = mode.dir(week);
    const weekLabel = `W${String(week).padStart(2,'0')} ${mode.label}`;

    // ── READ.JS ──────────────────────────────────────────────
    const readPath = `${dir}/read.js`;
    if (existsSync(path.resolve(ROOT, readPath))) {
      const data = await loadModule(readPath);
      if (data) {
        const passage = (data.content_en || data.passage_en || data.text_en || '');
        const questions = data.comprehension_questions || data.questions || [];
        checked.push(`${weekLabel} read`);
        for (const q of questions) {
          const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
          if (!answerFoundInPassage(answers, passage)) {
            issues.push({
              week: weekLabel,
              file: 'read.js',
              qid: q.id,
              question: q.question_en,
              answer: answers,
              hint: `Passage snippet: "${passage.slice(0, 120).replace(/\n/g,' ')}..."`
            });
          }
        }
      }
    }

    // ── EXPLORE.JS ───────────────────────────────────────────
    const explorePath = `${dir}/explore.js`;
    if (existsSync(path.resolve(ROOT, explorePath))) {
      const data = await loadModule(explorePath);
      if (data) {
        const passage = (data.content_en || data.passage_en || data.text_en || '');
        const questions = data.check_questions || data.comprehension_questions || data.questions || [];
        checked.push(`${weekLabel} explore`);
        for (const q of questions) {
          const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
          if (!answerFoundInPassage(answers, passage)) {
            issues.push({
              week: weekLabel,
              file: 'explore.js',
              qid: q.id,
              question: q.question_en,
              answer: answers,
              hint: `Passage snippet: "${passage.slice(0, 120).replace(/\n/g,' ')}..."`
            });
          }
        }
      }
    }
  }
}

console.log(`\n✅ Checked: ${checked.length} files\n`);

if (issues.length === 0) {
  console.log('🎉 No issues found! All questions have answers traceable in their passage.');
} else {
  console.log(`⚠️  FOUND ${issues.length} QUESTION(S) WHOSE ANSWER IS NOT IN THE PASSAGE:\n`);
  for (const iss of issues) {
    console.log(`─────────────────────────────────────────`);
    console.log(`📍 ${iss.week} | ${iss.file} | Q${iss.qid}`);
    console.log(`   Q: ${iss.question}`);
    console.log(`   A: ${JSON.stringify(iss.answer)}`);
    console.log(`   ${iss.hint}`);
  }
  console.log(`\n─────────────────────────────────────────`);
  console.log(`\nTotal issues: ${issues.length}`);
}
