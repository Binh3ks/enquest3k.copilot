/**
 * add_missing_to_dict.mjs
 *
 * Add missing words to dictionary with simple example sentences
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const dictPath = resolve(ROOT, 'src/data/dictionary.json');
const dictionary = JSON.parse(readFileSync(dictPath, 'utf-8'));

console.log('📖 Current dictionary:', dictionary.length, 'entries\n');

// Missing words with manually crafted examples (child-friendly)
const newEntries = [
  // Grammar words (Past Simple week - Week 26)
  {
    word: "was",
    meaning: "quá khứ của 'is' (I/he/she/it)",
    example: "Yesterday was a sunny day.",
    tier: "grammar"
  },
  {
    word: "were",
    meaning: "quá khứ của 'are' (you/we/they)",
    example: "We were at the park yesterday.",
    tier: "grammar"
  },
  {
    word: "had",
    meaning: "quá khứ của 'have' (có, đã có)",
    example: "I had a great time at the party.",
    tier: "grammar"
  },
  {
    word: "did",
    meaning: "quá khứ của 'do' (làm, đã làm)",
    example: "I did my homework yesterday.",
    tier: "grammar"
  },
  {
    word: "been",
    meaning: "quá khứ phân từ của 'be'",
    example: "I have been to Japan.",
    tier: "grammar"
  },
  {
    word: "being",
    meaning: "hiện tại phân từ của 'be'",
    example: "I like being helpful.",
    tier: "grammar"
  },
  
  // Modal verbs
  {
    word: "could",
    meaning: "có thể (quá khứ của can)",
    example: "When I was young, I could run fast.",
    tier: "grammar"
  },
  {
    word: "would",
    meaning: "sẽ (quá khứ của will)",
    example: "I said I would help you.",
    tier: "grammar"
  },
  {
    word: "might",
    meaning: "có thể, có lẽ",
    example: "It might rain tomorrow.",
    tier: "grammar"
  },
  
  // Function words
  {
    word: "if",
    meaning: "nếu",
    example: "If it rains, we will stay home.",
    tier: "function"
  },
  {
    word: "by",
    meaning: "bởi, bằng",
    example: "I go to school by bus.",
    tier: "function"
  },
  {
    word: "its",
    meaning: "của nó",
    example: "The cat licked its paw.",
    tier: "function"
  },
  {
    word: "those",
    meaning: "những cái kia",
    example: "Those books are on the table.",
    tier: "function"
  },
  
  // Compound words
  {
    word: "adventure-filled",
    meaning: "đầy phiêu lưu",
    example: "It was an adventure-filled day.",
    tier: "compound"
  },
  {
    word: "knife-like",
    meaning: "như dao, sắc nhọn",
    example: "The leaves have knife-like edges.",
    tier: "compound"
  },
  {
    word: "panel-by-panel",
    meaning: "từng khung một",
    example: "Read the comic panel-by-panel.",
    tier: "compound"
  },
  
  // Other vocabulary
  {
    word: "folding",
    meaning: "gấp, đang gấp",
    example: "She is folding the paper.",
    tier: "verb"
  },
  {
    word: "km",
    meaning: "kilômét (đơn vị đo)",
    example: "The school is 5 km away.",
    tier: "unit"
  },
  {
    word: "mr",
    meaning: "ông (Mr.)",
    example: "Mr. Smith is my teacher.",
    tier: "title"
  },
  {
    word: "oh",
    meaning: "ồ, ối (cảm thán)",
    example: "Oh! I forgot my bag.",
    tier: "interjection"
  }
];

console.log('➕ Adding', newEntries.length, 'new entries...\n');

// Add new entries to dictionary
newEntries.forEach(entry => {
  // Check if already exists
  const existing = dictionary.find(e => e.word.toLowerCase() === entry.word.toLowerCase());
  if (existing) {
    console.log('   ⚠️  Already exists:', entry.word);
    return;
  }
  
  // Add new entry
  dictionary.push({
    word: entry.word,
    meaning: entry.meaning,
    example: entry.example,
    tier: entry.tier,
    first_taught_week: entry.word === 'was' || entry.word === 'were' ? 26 : null
  });
  
  console.log('   ✅ Added:', entry.word, '→', entry.example);
});

// Sort by word
dictionary.sort((a, b) => a.word.localeCompare(b.word));

// Save
writeFileSync(dictPath, JSON.stringify(dictionary, null, 2), 'utf-8');

const finalSize = (JSON.stringify(dictionary).length / 1024).toFixed(1);
console.log('\n✅ Dictionary updated!');
console.log('   Total entries:', dictionary.length);
console.log('   File size:', finalSize, 'KB');
console.log('   Saved to:', dictPath);
