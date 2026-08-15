import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const dictPath = path.join(rootDir, 'src/data/dictionary.json');
const masterDictPath = path.join(rootDir, 'src/data/weeks/week_33/vocab_dictionary_master.js');

const dictionaryData = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
const masterDictContent = fs.readFileSync(masterDictPath, 'utf8');

// Build base lookup map
const baseDict = Object.fromEntries(
  dictionaryData.map(e => [(e.word || '').toLowerCase().trim(), e])
);

// Import WEEK_33_MASTER_DICTIONARY
const { WEEK_33_MASTER_DICTIONARY } = await import('../src/data/weeks/week_33/vocab_dictionary_master.js');

const masterMap = {};
Object.keys(WEEK_33_MASTER_DICTIONARY).forEach(key => {
  masterMap[key.toLowerCase().trim()] = WEEK_33_MASTER_DICTIONARY[key];
  const item = WEEK_33_MASTER_DICTIONARY[key];
  if (item.aliases && Array.isArray(item.aliases)) {
    item.aliases.forEach(alias => {
      masterMap[alias.toLowerCase().trim()] = item;
    });
  }
});

// Resolver helper (exact + stem variations)
function hasDefinition(rawWord) {
  const clean = rawWord.toLowerCase().trim();
  if (!clean) return true;

  // Helper to check item
  const check = (w) => {
    if (masterMap[w]) return true;
    if (baseDict[w] && (baseDict[w].meaning || baseDict[w].definition_vi || baseDict[w].definition)) return true;
    return false;
  };

  if (check(clean)) return true;
  if (clean.endsWith('s') && check(clean.slice(0, -1))) return true;
  if (clean.endsWith('es') && check(clean.slice(0, -2))) return true;
  if (clean.endsWith('ed') && check(clean.slice(0, -2))) return true;
  if (clean.endsWith('ing') && check(clean.slice(0, -3))) return true;
  if (clean.endsWith('ing') && check(clean.slice(0, -3) + 'e')) return true;
  if (clean.endsWith('ly') && check(clean.slice(0, -2))) return true;

  return false;
}

// Find all text files in Week 33
const w33Files = [
  'src/data/weeks/week_33/read.js',
  'src/data/weeks/week_33/reading_hub.js',
  'src/data/weeks/week_33/listening_hub.js',
  'src/data/weeks/week_33/vocab.js',
  'src/data/weeks/week_33/vocab_dictionary_master.js',
  'src/data/weeks/week_33_real.js',
  'src/data/weeks/week_33_easy_real.js'
];

let aggregatedText = '';
w33Files.forEach(relPath => {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    aggregatedText += ' ' + fs.readFileSync(fullPath, 'utf8');
  }
});

// Extract all valid English words (min length 2)
const tokens = aggregatedText.match(/\b[a-zA-Z]{2,}\b/g) || [];
const stopKeywords = new Set([
  'const', 'export', 'import', 'default', 'return', 'from', 'true', 'false', 'null', 'undefined',
  'function', 'array', 'string', 'object', 'number', 'boolean', 'type', 'props', 'class', 'className',
  'png', 'jpg', 'svg', 'image', 'url', 'id', 'text', 'title', 'description', 'scene', 'hub', 'mode',
  'key', 'value', 'type', 'word', 'chunk', 'chunks', 'lexical', 'level', 'cefr', 'flyers', 'cambridge',
  'easy', 'real', 'adv', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'sub', 'opt', 'opts', 'ref', 'gaps',
  'nh', 'lang', 'ch', 'tr', 'ng', 'audio', 'jake', 'ang', 'th', 'xu', 'sau', 'gi', 'khoa', 'nhi', 'nhanh',
  'ho', 'ngay', 'khen', 'tu', 'quy', 'sinh', 'kh', 'bao', 'trong', 'lab', 'ti', 'hay', 'cho', 'chuy',
  'options', 'theme', 'js', 'vocablist', 'vocab', 'readinghubdata', 'cloze', 'listeninghubdata', 'ah', 'else',
  'item', 'items', 'nteacher', 'hello', 'njake', 'option', 'nboy', 'ngirl', 'iscorrect', 'nwoman', 'nman', 'nnova',
  'vocabulary', 'sai', 'tai', 'ngo', 'mu', 'ph', 'xin', 'tay', 'ra', 'khi', 'lexicalchunks', 'bi', 'au', 'master',
  'dictionary', 'database', 'strict', 'whitelist', 'morphological', 'aliases', 'ed', 'plurals', 'esl', 'definitions',
  'ipa', 'contextual', 'alias', 'mappings', 'collocations', 'collocation', 'sl', 'pt', 'fl', 'meaning', 'audiotext',
  'lo', 'rn', 'sa', 'rt', 'ni', 'sku', 'rs', 'kli', 'nd', 'ko', 'ld', 'rf', 'li', 'dm', 'st', 'se', 'fti', 'kw',
  'core', 'noun', 'verb', 'qu', 'adjective', 'vd', 'ste', 'ks', 'nt', 'ri', 'kl', 'mzi', 'rm', 'sple', 'kinh', 'nghi',
  'backward', 'compatible', 'entries', 'pronounce', 'ai', 'tutor', 'weekid', 'retell', 'personal', 'em', 'card', 'sao', 'vi'
]);

const uniqueWords = Array.from(new Set(tokens.map(t => t.toLowerCase())))
  .filter(w => !stopKeywords.has(w) && !/^\d+$/.test(w));

const missingWords = uniqueWords.filter(w => !hasDefinition(w));

console.log(`\n==================================================`);
console.log(`📊 WEEK 33 ENGLISH DICTIONARY AUDIT REPORT`);
console.log(`==================================================`);
console.log(`Total Unique English Words Audited : ${uniqueWords.length}`);
console.log(`Words Covered with Data            : ${uniqueWords.length - missingWords.length}`);
console.log(`Missing Words Count                : ${missingWords.length}`);
console.log(`Coverage Ratio                     : ${uniqueWords.length > 0 ? (((uniqueWords.length - missingWords.length) / uniqueWords.length) * 100).toFixed(1) : 100.0}%`);
console.log(`==================================================\n`);

if (missingWords.length > 0) {
  console.log(`Missing Words List:\n`, missingWords.join(', '));
  fs.writeFileSync(
    path.join(rootDir, 'scripts/w33_missing_words.json'),
    JSON.stringify(missingWords, null, 2),
    'utf8'
  );
} else {
  console.log(`🎉 CONGRATULATIONS! 100% DICTIONARY COVERAGE ACHIEVED! ZERO MISSING ENGLISH WORDS!`);
}
