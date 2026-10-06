import fs from 'fs';
import path from 'path';

// Load chroniclesFloor67Service.js to inspect getWordClassDuelForWeek and target words
const servicePath = path.resolve('src/services/chroniclesFloor67Service.js');
const serviceCode = fs.readFileSync(servicePath, 'utf8');

// Load WordClassBalanceGame.jsx to inspect CURRICULUM_WORDS
const balanceGamePath = path.resolve('src/modules/chronicles/games/WordClassBalanceGame.jsx');
const balanceGameCode = fs.readFileSync(balanceGamePath, 'utf8');

// Load week 33 word_class_duel.js
const w33DuelPath = path.resolve('src/data/weeks/week_33/word_class_duel.js');
const w33DuelCode = fs.readFileSync(w33DuelPath, 'utf8');

console.log("=== SCANNING WORD CLASS DUEL & BALANCE GAME POOLS ===");

// 1. Extract from chroniclesFloor67Service & word_class_duel.js
// Look ONLY for target words in WEEK_33_WORD_CLASS_DUEL, WEEK_34_WORD_CLASS_DUEL, GENERIC_WORD_CLASS_DUEL
function extractDuelTargetWords(code) {
  // Extract Section 4: between WORD CLASS DUEL (F7D3) and SYNONYM STORM
  const sec4Match = code.match(/\/\/\s*───\s*4\.\s*WORD CLASS DUEL \(F7D3\)[\s\S]*?\/\/\s*───\s*5\.\s*SYNONYM STORM/);
  const sec4Code = sec4Match ? sec4Match[0] : code;
  
  const matches = [];
  const regex = /id:\s*['"]([a-z0-9_]+)['"],\s*word:\s*['"]([^'"]+)['"],\s*targetRole:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(sec4Code)) !== null) {
    matches.push({ id: m[1], word: m[2].toLowerCase(), targetRole: m[3] });
  }
  return matches;
}

const duelWords = extractDuelTargetWords(serviceCode);
console.log(`Extracted from chroniclesFloor67Service: ${duelWords.length} round targets`);

// 2. Extract from WordClassBalanceGame
function extractBalanceWords(code) {
  const matches = [];
  const regex = /{\s*word:\s*['"]([^'"]+)['"],\s*role:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(code)) !== null) {
    matches.push({ word: m[1].toLowerCase(), assignedRole: m[2] });
  }
  return matches;
}

const balanceWords = extractBalanceWords(balanceGameCode);
console.log(`Extracted from WordClassBalanceGame: ${balanceWords.length} words`);

// Cambridge English / CEFR Dictionary Parts of Speech truth reference
// Check if word can be both NOUN and VERB in standard English:
const LEXICON = {
  // Duel pool words:
  'grip': { noun: true, verb: true, pos: 'DUAL' },
  'slide': { noun: true, verb: true, pos: 'DUAL' },
  'care': { noun: true, verb: true, pos: 'DUAL' },
  'help': { noun: true, verb: true, pos: 'DUAL' },
  'trap': { noun: true, verb: true, pos: 'DUAL' },
  'roar': { noun: true, verb: true, pos: 'DUAL' },
  'escape': { noun: true, verb: true, pos: 'DUAL' },
  'promise': { noun: true, verb: true, pos: 'DUAL' },
  'light': { noun: true, verb: true, pos: 'DUAL' },
  'watch': { noun: true, verb: true, pos: 'DUAL' },
  'call': { noun: true, verb: true, pos: 'DUAL' },
  'plant': { noun: true, verb: true, pos: 'DUAL' },

  // Balance Game words:
  // Week 33
  'corridor': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'slipped': { noun: false, verb: true, pos: 'VERB_ONLY' }, // past tense inflected verb form
  'bandage': { noun: true, verb: true, pos: 'DUAL' }, // to bandage a wound, a bandage
  'treat': { noun: true, verb: true, pos: 'DUAL' }, // a special treat, to treat
  'nurse': { noun: true, verb: true, pos: 'DUAL' }, // to nurse a patient, a school nurse
  'walk': { noun: true, verb: true, pos: 'DUAL' }, // go for a walk, walk to school
  'mistake': { noun: true, verb: true, pos: 'DUAL' }, // make a mistake, mistake A for B
  'floor': { noun: true, verb: true, pos: 'DUAL' }, // tile floor, floor an opponent (informal, though primarily noun)
  'stop': { noun: true, verb: true, pos: 'DUAL' }, // bus stop, stop the car
  'shoes': { noun: true, verb: false, pos: 'NOUN_ONLY' }, // plural noun (inflected)
  // Week 35
  'tent': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'climb': { noun: true, verb: true, pos: 'DUAL' }, // a steep climb, climb a tree
  'campfire': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'roast': { noun: true, verb: true, pos: 'DUAL' }, // pot roast, roast marshmallows
  'mountain': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'hike': { noun: true, verb: true, pos: 'DUAL' }, // a long hike, hike the trail
  'stream': { noun: true, verb: true, pos: 'DUAL' }, // stream of water, stream a video
  'hunter': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'rescue': { noun: true, verb: true, pos: 'DUAL' }, // come to the rescue, rescue a friend
  'rope': { noun: true, verb: true, pos: 'DUAL' }, // thick rope, rope cattle
  'sleep': { noun: true, verb: true, pos: 'DUAL' }, // get some sleep, sleep well
  // Generic
  'castle': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'explore': { noun: false, verb: true, pos: 'VERB_ONLY' },
  'compass': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'discover': { noun: false, verb: true, pos: 'VERB_ONLY' },
  'bridge': { noun: true, verb: true, pos: 'DUAL' }, // wooden bridge, bridge the gap
  'navigate': { noun: false, verb: true, pos: 'VERB_ONLY' },
  'lantern': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'protect': { noun: false, verb: true, pos: 'VERB_ONLY' },
  'island': { noun: true, verb: false, pos: 'NOUN_ONLY' },
  'ignite': { noun: false, verb: true, pos: 'VERB_ONLY' },
};

console.log("\n=======================================================");
console.log("POOL A: chroniclesFloor67Service (WordClassDuelGame target words)");
console.log("=======================================================");
const uniqueDuelWords = [...new Set(duelWords.map(d => d.word))];
let duelDualCount = 0;
let duelSingleCount = 0;

for (const w of uniqueDuelWords) {
  const lex = LEXICON[w] || { pos: 'UNKNOWN' };
  const isDual = lex.pos === 'DUAL';
  if (isDual) duelDualCount++;
  else duelSingleCount++;
  console.log(`- "${w}": ${lex.pos} (Noun: ${lex.noun}, Verb: ${lex.verb})`);
}

const duelTotal = uniqueDuelWords.length;
console.log(`\nTổng số từ mục tiêu trong WordClassDuel: ${duelTotal}`);
console.log(`-> Lưỡng tính thật (Dual-class: Noun + Verb): ${duelDualCount}/${duelTotal} (${((duelDualCount/duelTotal)*100).toFixed(1)}%)`);
console.log(`-> Đơn nghĩa (Single-class): ${duelSingleCount}/${duelTotal} (${((duelSingleCount/duelTotal)*100).toFixed(1)}%)`);

console.log("\n=======================================================");
console.log("POOL B: WordClassBalanceGame.jsx (Falling Words Pool)");
console.log("=======================================================");
const uniqueBalanceWords = [...new Set(balanceWords.map(b => b.word))];
let balanceDualCount = 0;
let balanceSingleCount = 0;

for (const w of uniqueBalanceWords) {
  const item = balanceWords.find(b => b.word === w);
  const lex = LEXICON[w] || { pos: 'UNKNOWN' };
  const isDual = lex.pos === 'DUAL';
  if (isDual) balanceDualCount++;
  else balanceSingleCount++;
  console.log(`- "${w}" [gán ${item.assignedRole}]: ${lex.pos} (Noun: ${lex.noun}, Verb: ${lex.verb})`);
}

const balanceTotal = uniqueBalanceWords.length;
console.log(`\nTổng số từ trong WordClassBalanceGame: ${balanceTotal}`);
console.log(`-> Lưỡng tính thật (Dual-class: Noun + Verb): ${balanceDualCount}/${balanceTotal} (${((balanceDualCount/balanceTotal)*100).toFixed(1)}%)`);
console.log(`-> Đơn nghĩa (Single-class): ${balanceSingleCount}/${balanceTotal} (${((balanceSingleCount/balanceTotal)*100).toFixed(1)}%)`);

