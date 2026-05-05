import { readFileSync, writeFileSync } from 'fs';

// === 1. Fix dictionary: add 'wonder' entry ===
const dictPath = 'src/data/dictionary.json';
const dict = JSON.parse(readFileSync(dictPath, 'utf8'));
const hasWonder = dict.some(e => e.word === 'wonder');
if (!hasWonder) {
  // Insert after 'won' entry
  const wonIdx = dict.findIndex(e => e.word === 'won');
  dict.splice(wonIdx + 1, 0, {
    word: "wonder",
    meaning: "sự ngạc nhiên thích thú",
    pronounce: "/ˈwʌndər/",
    definition_en: "a feeling of amazement and admiration at something beautiful or surprising",
    example: "Luna felt wonder when she saw the vivid butterfly.",
    first_taught_week: 31
  });
  writeFileSync(dictPath, JSON.stringify(dict, null, 2));
  console.log('✅ Dictionary: added wonder entry');
} else {
  console.log('ℹ️ Dictionary: wonder already exists');
}
