const path = require('path');
const dict = require(path.join(__dirname, '../src/data/dictionary.json'));
const noExample = dict.filter(e => e.example === undefined || e.example === '');
const hasExample = dict.filter(e => e.example && e.example !== '');

console.log('Total:', dict.length);
console.log('Has example:', hasExample.length);
console.log('No example:', noExample.length);

console.log('\nSample WITHOUT example:');
noExample.slice(0, 20).forEach(e => {
  console.log('  ', e.word.padEnd(20), '|', e.meaning || e.definition_en || 'NO DATA');
});

console.log('\nSample WITH example:');
hasExample.slice(50, 60).forEach(e => {
  console.log('  ', e.word.padEnd(20), '|', e.example);
});
