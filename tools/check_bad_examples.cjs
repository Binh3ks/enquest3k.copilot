const path = require('path');
const dict = require(path.join(__dirname, '../src/data/dictionary.json'));

const patterns = {
  'I like this': 0,
  'This involves': 0,
  'helps us daily': 0,
  'is important to me': 0,
  'This helps us': 0,
  'is something we should know': 0,
  'are interesting to study': 0,
};

dict.forEach(e => {
  if (!e.example) return;
  Object.keys(patterns).forEach(p => {
    if (e.example.includes(p)) patterns[p]++;
  });
});

console.log('Bad pattern counts:');
Object.entries(patterns)
  .sort((a, b) => b[1] - a[1])
  .forEach(([p, c]) => {
    if (c > 0) console.log('  ', p.padEnd(40), ':', c);
  });

console.log('\nSample bad examples:');
const bad = dict.filter(e => e.example && (
  e.example.includes('I like this') ||
  e.example.includes('This involves') ||
  e.example.includes('helps us daily') ||
  e.example.includes('are interesting to study')
));

bad.slice(0, 30).forEach(e => {
  console.log('  ', e.word.padEnd(25), '|', e.example);
});

console.log(`\nTotal bad examples: ${bad.length} / ${dict.length}`);
