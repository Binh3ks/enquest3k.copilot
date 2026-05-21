#!/usr/bin/env node
/**
 * tools/fix_weak_collocations.mjs
 * Fix specific weak collocations identified in audit.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const WORKSPACE = '/Users/binhnguyen/Downloads/Engquest3k';

// Map: `${mode}/week_N` → array of {from, to} replacements
const FIXES = [
  // W14 EASY: weak collocations for certain words
  {
    file: 'weeks_easy/week_14/vocab.js',
    replacements: [
      { word: 'picture', from: ['show my picture', 'show something'], to: ['a nice picture', 'my favorite picture'] },
      { word: 'story',   from: ['tell a story', 'tell my friend'], to: ['a funny story', 'an interesting story'] },
      { word: 'name',    from: ['my name', 'first name'], to: ['first name', 'full name'] },
      { word: 'family',  from: ['big family', 'my family'], to: ['large family', 'small family'] },
      { word: 'help',    from: ['I can sing', 'can you help'], to: ['help me please', 'can you help'] },
    ]
  },
  // W15 EASY: walking/running collocations
  {
    file: 'weeks_easy/week_15/vocab.js',
    replacements: [
      { word: 'running', from: ['running fast', 'running exercise'], to: ['running in the park', 'running to school'] },
      { word: 'walking', from: ['walking slowly', 'walking to school'], to: ['walking in the park', 'walking to school'] },
      { word: 'sitting', from: ['sitting down', 'sitting on a chair'], to: ['sitting comfortably', 'sitting on the grass'] },
      { word: 'eating',  from: ['eating snacks', 'eating lunch'], to: ['eating fruit', 'eating breakfast'] },
      { word: 'flying',  from: ['flying a kite', 'flying kites'], to: ['flying a kite', 'flying in the sky'] },
    ]
  },
  // W18 ADV: TV camera is not a real collocation
  {
    file: 'weeks/week_18/vocab.js',
    replacements: [
      { word: 'camera', from: ['TV camera', 'live report'], to: ['digital camera', 'film camera'] },
      { word: 'reporter', from: ['news reporter', 'live report'], to: ['news reporter', 'TV reporter'] },
    ]
  },
  // W20 ADV: old town repetition
  {
    file: 'weeks/week_20/vocab.js',
    replacements: [
      { word: 'building', from: ['tall building', 'old town'], to: ['tall building', 'new building'] },
      { word: 'bridge',   from: ['new bridge', 'old town'], to: ['new bridge', 'wooden bridge'] },
    ]
  },
  // W21 ADV: yesterday morning is wrong
  {
    file: 'weeks/week_21/vocab.js',
    replacements: [
      { word: 'walked', from: ['walk to school', 'yesterday morning'], to: ['walked to school', 'walked home'] },
      { word: 'looked', from: ['look at the stars', 'last night'], to: ['looked at the moon', 'looked at the stars'] },
    ]
  },
  // W21 EASY: some weak ones
  {
    file: 'weeks_easy/week_21/vocab.js',
    replacements: [
      { word: 'looked',  from: ['looked at', 'looked around'], to: ['looked at the stars', 'looked around the room'] },
    ]
  },
];

for (const fix of FIXES) {
  const fp = join(WORKSPACE, 'src/data', fix.file);
  let content = readFileSync(fp, 'utf8');

  for (const rep of fix.replacements) {
    // Find the word's collocation array and replace
    // Pattern: word: "walked", ... collocation: ["walk to school", "yesterday morning"]
    // Need to replace the array entries
    const wordPat = new RegExp(`word:\\s*"${rep.word}"[^}]+collocation:\\s*\\[([^\\]]+)\\]`, 'g');
    content = content.replace(wordPat, (match, arrContent) => {
      const existing = arrContent.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      const newArr = [...existing];
      for (let i = 0; i < rep.from.length; i++) {
        const idx = newArr.findIndex(v => v === rep.from[i]);
        if (idx !== -1) {
          newArr[idx] = rep.to[i];
        }
      }
      const quoted = newArr.map(v => `"${v}"`).join(', ');
      return match.replace(arrContent, quoted);
    });
  }

  writeFileSync(fp, content);
  console.log('Fixed:', fix.file);
}
console.log('Done.');
