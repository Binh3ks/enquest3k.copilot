import { readFileSync } from 'fs';

const dict = JSON.parse(readFileSync('src/data/dictionary.json', 'utf-8'));
const dictWords = new Set(dict.map(e => e.word.toLowerCase()));

const w1 = readFileSync('src/data/weeks_easy/week_01/read.js', 'utf-8');
const contentMatch = w1.match(/content_en:\s*"([^"]+)"/);
if (!contentMatch) {
  console.log('Cannot parse content_en');
  process.exit(1);
}
const content = contentMatch[1];

const allWords = [...content.matchAll(/\b[\w'-]+\b/g)].map(m => m[0].toLowerCase());
const unique = [...new Set(allWords)].filter(w => w.length >= 2);

const boldWords = [...content.matchAll(/\*\*([\w'-]+)\*\*/g)].map(m => m[1].toLowerCase());
const uniqueBold = [...new Set(boldWords)];

const nonBold = unique.filter(w => !uniqueBold.includes(w));
const inDict = nonBold.filter(w => dictWords.has(w));
const notInDict = nonBold.filter(w => !dictWords.has(w));

console.log('📊 Week 1 Coverage Analysis:\n');
console.log('Total unique words:', unique.length);
console.log('  📌 Bold (Tier 1):', uniqueBold.length);
console.log('     Examples:', uniqueBold.slice(0,12).join(', '));
console.log('\n  Non-bold words:', nonBold.length);
console.log('    ✅ In dictionary (Tier 2/3):', inDict.length);
console.log('       Examples:', inDict.slice(0,10).join(', '));
console.log('\n    ❌ NOT in dictionary (plain):', notInDict.length);
console.log('       Examples:', notInDict.join(', '));

// Check stopwords
const STOPWORDS = new Set([
  'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had',
  'a', 'an', 'the',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'them', 'their', 'my', 'your', 'his', 'her', 'its', 'our',
  'in', 'on', 'at', 'to', 'of', 'for', 'and', 'or', 'but',
  'will', 'can', 'could', 'would', 'should', 'may', 'might', 'must',
  'this', 'that', 'these', 'those', 'do', 'does', 'did', 'not', "n't",
]);

const stopwordsInStory = notInDict.filter(w => STOPWORDS.has(w));
const nonStopwords = notInDict.filter(w => !STOPWORDS.has(w));

console.log('\n📋 Why NOT in dictionary?');
console.log('  🚫 Stopwords (excluded by design):', stopwordsInStory.length);
console.log('     ', stopwordsInStory.join(', '));
console.log('  ⚠️  Other (should be added?):', nonStopwords.length);
console.log('     ', nonStopwords.join(', '));
