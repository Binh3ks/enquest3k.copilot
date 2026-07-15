import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'src/data');

function readMindmap(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const mindMapContent\s*=\s*(\{[\s\S]*?\});\s*\nexport default mindMapContent/);
  if (!match) return null;
  try { return eval('(' + match[1] + ')'); } catch { return null; }
}

const FORBIDDEN_AUX = ['are', 'is', 'am', 'was', 'were', 'be', 'been', 'being'];
const PAST_TENSE = ['went', 'ate', 'ran', 'saw', 'had', 'said', 'made', 'took', 'came', 'gave', 'got', 'found', 'left', 'lost', 'met', 'stood', 'told', 'thought', 'woke', 'wore', 'won', 'wrote', 'taught', 'bought', 'brought', 'caught', 'chose', 'drank', 'drove', 'fell', 'flew', 'forgot', 'grew', 'hid', 'held', 'kept', 'meant', 'paid', 'rode', 'sang', 'sank', 'shook', 'shone', 'shot', 'slept', 'spoke', 'spent', 'swam', 'felt', 'knew', 'understood'];

function grammarIssues(stem, branch) {
  const issues = [];
  const s = stem.text;
  const sL = s.toLowerCase();
  const b = branch.text;
  const bL = b.toLowerCase();

  // Rule: "How do you ___" needs sense/linking verb
  if (/^how do you ___/.test(sL)) {
    const invalid = ['are', 'is', 'am', 'was', 'were', 'being', 'be', 'do', 'does', 'did', 'done', 'doing', 'have', 'has', 'had', 'having', 'go', 'come', 'run', 'walk', 'eat', 'drink', 'sleep'];
    if (invalid.includes(bL)) {
      issues.push(`"How do you" needs a sense/linking verb (feel/look/seem), not "${b}"`);
    }
  }

  // Rule: "Do you ___" needs base verb
  if (/^do you ___/.test(sL)) {
    if (FORBIDDEN_AUX.includes(bL)) {
      issues.push(`"Do you" needs a base verb, not "${b}"`);
    }
  }

  // Rule: "Does ___" needs base verb (no -s)
  if (/^does \w/.test(sL)) {
    if (FORBIDDEN_AUX.includes(bL)) {
      issues.push(`"Does" needs a base verb, not "${b}"`);
    }
    if (bL.endsWith('s') && !bL.endsWith('ss') && !bL.endsWith('sh')) {
      issues.push(`"Does" needs base form (no -s), got "${b}"`);
    }
  }

  // Rule: "Did ___" needs base verb (not past tense)
  if (/^did /.test(sL) || /did not |didn't /.test(sL)) {
    if (FORBIDDEN_AUX.includes(bL)) {
      issues.push(`"Did" needs a base verb, not "${b}"`);
    }
    if (PAST_TENSE.includes(bL)) {
      issues.push(`"Did" needs base form, not past tense "${b}"`);
    }
  }

  // Rule: "do not / does not / don't / doesn't ___" needs base verb
  if (/(do not|does not|don't|doesn't) ___/.test(sL)) {
    if (FORBIDDEN_AUX.includes(bL)) {
      issues.push(`Negative needs a base verb, not "${b}"`);
    }
  }

  // Rule: modal + ___ needs base verb
  if (/ (can|cannot|can't|could|couldn't|will|won't|would|wouldn't|shall|should|shouldn't|may|might|must) ___/.test(sL)) {
    if (FORBIDDEN_AUX.includes(bL)) {
      issues.push(`Modal needs a base verb, not "${b}"`);
    }
  }

  // Rule: "There is/are ___" needs a noun, not adjective or verb
  if (/^there (is|are) .*___/.test(sL) || /^is there ___/.test(sL)) {
    const verbs = ['go', 'come', 'run', 'walk', 'eat', 'sleep', 'play', 'work', 'study', 'teach', 'learn', 'read', 'write', 'speak', 'listen', 'watch', 'look', 'see', 'hear', 'feel', 'love', 'like', 'hate', 'enjoy', 'want', 'need', 'have', 'do'];
    const adj = ['happy', 'sad', 'good', 'bad', 'big', 'small', 'new', 'old', 'beautiful', 'ugly', 'bright', 'dark', 'clean', 'dirty', 'quiet', 'loud', 'hot', 'cold', 'warm', 'cool', 'wet', 'dry', 'fast', 'slow', 'tall', 'short', 'long', 'wide', 'deep', 'high', 'low', 'expensive', 'cheap', 'rich', 'poor', 'famous', 'popular', 'important', 'special', 'different', 'same', 'best', 'worst', 'interesting', 'exciting', 'boring', 'tiring', 'amazing', 'wonderful', 'great', 'nice', 'kind', 'polite', 'rude', 'shy', 'friendly', 'busy', 'free', 'ready', 'late', 'early', 'sick', 'healthy', 'strong', 'weak', 'pretty', 'cute', 'lovely', 'gentle', 'brave', 'calm'];
    if (verbs.includes(bL)) {
      issues.push(`"There is/are" needs a noun, not verb "${b}"`);
    } else if (adj.includes(bL)) {
      issues.push(`"There is/are" needs a noun, not adjective "${b}"`);
    }
  }

  return issues;
}

function audit(filePath, fileLabel) {
  const issues = [];
  const mm = readMindmap(filePath);
  if (!mm) { issues.push({ severity: 'error', message: `Cannot parse` }); return issues; }

  const stems = mm.centerStems;
  const bl = mm.branchLabels;

  const types = stems.map(s => s.type);
  const aff = types.filter(t => t === 'affirmative').length;
  const neg = types.filter(t => t === 'negative').length;
  const q = types.filter(t => t === 'question').length;
  if (aff !== 2 || neg !== 2 || q !== 2) {
    issues.push({ severity: 'error', message: `Types: ${aff}aff + ${neg}neg + ${q}q` });
  }

  for (const stem of stems) {
    const branches = bl[stem.text] || [];
    for (const branch of branches) {
      for (const msg of grammarIssues(stem, branch)) {
        issues.push({ severity: 'error', message: `"${stem.text}" → "${branch.text}": ${msg}` });
      }
    }
  }

  const stemTexts = new Set(stems.map(s => s.text));
  for (const key of Object.keys(bl)) {
    if (!stemTexts.has(key)) issues.push({ severity: 'error', message: `Orphan key "${key}"` });
  }

  return issues;
}

console.log('='.repeat(90));
console.log('MINDMAP GRAMMAR AUDIT — Stem-Branch Compatibility');
console.log('='.repeat(90));

let errors = [];

for (let w = 1; w <= 35; w++) {
  const ws = String(w).padStart(2, '0');
  for (const [dir, label] of [['weeks', 'ADV'], ['weeks_easy', 'Easy']]) {
    const fp = path.join(BASE, dir, `week_${ws}`, 'mindmap.js');
    if (!fs.existsSync(fp)) continue;
    const iss = audit(fp, `W${ws} ${label}`);
    errors.push(...iss.map(x => ({ ...x, week: `W${ws} ${label}` })));
  }
}

if (errors.length) {
  console.log(`\n${errors.length} grammar/structure issue(s):\n`);
  for (const e of errors) {
    console.log(`  [${e.week}] ${e.message}`);
  }
  console.log('');
} else {
  console.log('\n✅ All clean — no grammar mismatches.\n');
}
console.log('='.repeat(90));
