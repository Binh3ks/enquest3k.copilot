// Fix Easy vocab + word_power image_url refs for W31
// Only vocab_forest.jpg and vocab_breeze.jpg are shared with ADV (in 21 prompts)
// All other Easy-exclusive image refs must be null

import { readFileSync, writeFileSync } from 'fs';

// === Easy vocab.js ===
const vocabPath = 'src/data/weeks_easy/week_31/vocab.js';
let vocabSrc = readFileSync(vocabPath, 'utf8');

// Top-level cover
vocabSrc = vocabSrc.replace(
  /image_url:\s*"\/images\/week31\/vocab_cover_easy\.jpg"/,
  'image_url: null'
);

// Easy-exclusive vocab words (not forest, not breeze)
const easyExclusiveVocab = ['bird','song','soft','hard','loud','beautiful','quiet','warm','smell','touch','wonder'];
for (const word of easyExclusiveVocab) {
  vocabSrc = vocabSrc.replace(
    new RegExp(`image_url:\\s*"/images/week31/vocab_${word}\\.jpg"`),
    'image_url: null'
  );
}

writeFileSync(vocabPath, vocabSrc);
console.log('Easy vocab.js fixed');

// === Easy word_power.js ===
const wpPath = 'src/data/weeks_easy/week_31/word_power.js';
let wpSrc = readFileSync(wpPath, 'utf8');

// Top-level cover
wpSrc = wpSrc.replace(
  /image_url:\s*"\/images\/week31\/wordpower_cover_easy\.jpg"/,
  'image_url: null'
);

// Easy-exclusive wordpower images (items 3-6)
const easyWpImages = ['wp_feel_soft_grass','wp_see_beautiful_bird','wp_feel_warm_breeze','wp_feel_wonder'];
for (const img of easyWpImages) {
  wpSrc = wpSrc.replace(
    new RegExp(`image_url:\\s*"/images/week31/${img}\\.jpg"`),
    'image_url: null'
  );
}

writeFileSync(wpPath, wpSrc);
console.log('Easy word_power.js fixed');

// Verify
const vocabFinal = readFileSync(vocabPath, 'utf8');
const wpFinal = readFileSync(wpPath, 'utf8');
const vocabNullCount = (vocabFinal.match(/image_url: null/g) || []).length;
const vocabImgCount = (vocabFinal.match(/image_url: "\/images/g) || []).length;
const wpNullCount = (wpFinal.match(/image_url: null/g) || []).length;
const wpImgCount = (wpFinal.match(/image_url: "\/images/g) || []).length;

console.log(`Easy vocab: ${vocabImgCount} image refs, ${vocabNullCount} null (expect 2 imgs: forest+breeze, 12 null)`);
console.log(`Easy word_power: ${wpImgCount} image refs, ${wpNullCount} null (expect 2 imgs: hear_bird+smell_air, 5 null)`);
