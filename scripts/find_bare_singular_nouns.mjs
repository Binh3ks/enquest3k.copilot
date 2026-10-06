import fs from 'fs';
import { masterPools } from './verify_84_questions_rigorous_syntax.mjs';

// List of singular countable nouns that MUST have an article or determiner
const countableSingularNouns = new Set([
  'test', 'prize', 'star', 'tail', 'shark', 'bag', 'rope', 'net', 'lion', 'mouse',
  'tent', 'jacket', 'flashlight', 'trail', 'boat', 'suit', 'helmet', 'comet', 'moon',
  'spaceship', 'telescope', 'fish', 'whale', 'crab', 'turtle', 'book', 'pen', 'umbrella',
  'teacher', 'handrail', 'sneaker', 'shoe', 'nurse', 'bandage', 'cut', 'tile', 'bruise',
  'pack', 'bell', 'boot', 'cream', 'laboratory', 'lab'
]);

const determiners = new Set([
  'a', 'an', 'the', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
]);

console.log('--- AUDITING BARE SINGULAR COUNTABLE NOUNS ACROSS ALL 84 SENTENCES ---');

const bareNounIssues = [];

for (const [poolName, list] of Object.entries(masterPools)) {
  list.forEach((item, idx) => {
    // Tokenize sentence
    const cleanSent = item.sentence.replace(/_____/g, ' ').replace(/[,\.]/g, '').trim();
    const tokens = cleanSent.split(/\s+/).map(t => t.toLowerCase());

    tokens.forEach((token, tIdx) => {
      if (countableSingularNouns.has(token)) {
        const prevToken = tIdx > 0 ? tokens[tIdx - 1] : '';
        // If not preceded by a determiner and not preceded by an adjective that is preceded by determiner
        const prevPrevToken = tIdx > 1 ? tokens[tIdx - 2] : '';
        const hasDet = determiners.has(prevToken) || determiners.has(prevPrevToken);
        if (!hasDet) {
          bareNounIssues.push({
            pool: poolName,
            idx: idx + 1,
            noun: token,
            sentence: item.sentence
          });
        }
      }
    });
  });
}

console.log(`Found ${bareNounIssues.length} bare singular noun occurrences:`);
bareNounIssues.forEach(iss => {
  console.log(`- [${iss.pool} #${iss.idx}] Bare noun "${iss.noun}" in: "${iss.sentence}"`);
});
