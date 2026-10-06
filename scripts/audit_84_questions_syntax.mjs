import fs from 'fs';

const content = fs.readFileSync('docs/agent_artifacts/F6D2_CONNECTOR_BURST_84_POOL_SPEC.md', 'utf8');

const tableRegex = /### POOL \d: ([\w_]+)[\s\S]*?\| # \| Câu hỏi[\s\S]*?\n((?:\| \d+ \|[\s\S]*?\n)+)/g;
let match;
const allQuestions = [];

while ((match = tableRegex.exec(content)) !== null) {
  const poolName = match[1];
  const rows = match[2].trim().split('\n');
  rows.forEach(row => {
    const cols = row.split('|').map(c => c.trim()).filter(Boolean);
    if (cols.length >= 6) {
      allQuestions.push({
        pool: poolName,
        idx: cols[0],
        sentence: cols[1].replace(/\*\"|\"\*/g, '').replace(/\"/g, ''),
        target: cols[2].replace(/`/g, ''),
        dist1: cols[3].replace(/`/g, ''),
        dist2: cols[4].replace(/`/g, ''),
        options: JSON.parse(cols[5].replace(/`/g, '').replace(/'/g, '"')),
        note: cols[6]
      });
    }
  });
}

console.log('Total parsed questions:', allQuestions.length);

const subConjunctions = new Set(['because', 'although', 'unless', 'when', 'while', 'before', 'after', 'until', 'so', 'if']);

// Known common English verbs in past or present
const knownVerbs = new Set([
  'ate', 'passed', 'won', 'applied', 'let', 'spotted', 'escaped', 'looked', 'thanked',
  'read', 'left', 'took', 'fell', 'ran', 'lit', 'shone', 'blew', 'shivered', 'stayed',
  'walked', 'slipped', 'splashed', 'shot', 'cleaned', 'chewed', 'hit', 'miss'
]);

// Pronouns, determiners, nouns
const subjects = new Set([
  'i', 'you', 'he', 'she', 'it', 'we', 'they',
  'the', 'a', 'an', 'this', 'that', 'these', 'those',
  'my', 'your', 'his', 'her', 'their', 'our',
  'jake', 'tom', 'nurse', 'lion', 'mouse', 'campers', 'children', 'dad', 'hunters',
  'sun', 'rocket', 'fuel', 'astronauts', 'telescope', 'comet', 'moon', 'spaceship',
  'fish', 'whale', 'sharks', 'coral', 'crab', 'tide', 'dolphins', 'squid', 'turtle',
  'students', 'weather', 'match', 'kids', 'water', 'floors', 'rubber', 'tiles', 'bruises',
  'swelling', 'pain', 'bell', 'outside', 'ropes', 'darkness', 'nights', 'campfire', 'rain',
  'bears', 'trails', 'clouds', 'engines', 'thrusters', 'gravity', 'rocks', 'air', 'teacher',
  'sky', 'legs', 'someone', 'corals', 'seashells', 'gills'
]);

allQuestions.forEach(q => {
  const parts = q.sentence.split('_____');
  const clause1 = parts[0].trim();
  const clause2 = parts[1].trim();
  const clause2Words = clause2.split(/\s+/).map(w => w.toLowerCase().replace(/[^a-z]/g, ''));
  const firstWord = clause2Words[0] || '';

  // Check if firstWord is in knownVerbs or not in subjects
  const isVerb = knownVerbs.has(firstWord);
  const isSub = subjects.has(firstWord);

  // Check if any option is a subordinating conjunction
  const hasSub = q.options.some(opt => subConjunctions.has(opt));

  if (isVerb || (!isSub && !firstWord.endsWith('s'))) {
    console.log(`[SYNTAX WARNING] ${q.pool} #${q.idx}: target=${q.target}, opts=${JSON.stringify(q.options)}`);
    console.log(`  Sentence: "${q.sentence}"`);
    console.log(`  Clause 2 starts with: "${firstWord}" (isVerb=${isVerb}, isSub=${isSub})\n`);
  }
});
