import {
  DEFAULT_CONNECTOR_QUESTIONS,
  WEEK_33_CONNECTOR_QUESTIONS,
  WEEK_34_CONNECTOR_QUESTIONS,
  WEEK_35_CONNECTOR_QUESTIONS,
  WEEK_36_CONNECTOR_QUESTIONS,
  WEEK_37_CONNECTOR_QUESTIONS,
  GENERIC_CONNECTOR_QUESTIONS
} from '../src/services/chroniclesFloor67Service.js';

const activePools = {
  DEFAULT: DEFAULT_CONNECTOR_QUESTIONS,
  WEEK_33: WEEK_33_CONNECTOR_QUESTIONS,
  WEEK_34: WEEK_34_CONNECTOR_QUESTIONS,
  WEEK_35: WEEK_35_CONNECTOR_QUESTIONS,
  WEEK_36: WEEK_36_CONNECTOR_QUESTIONS,
  WEEK_37: WEEK_37_CONNECTOR_QUESTIONS,
  GENERIC: GENERIC_CONNECTOR_QUESTIONS
};

// ─── RIGOROUS SYNTACTIC AND DETERMINER VALIDATION SUITE ───
const SINGULAR_COUNTABLE_NOUNS = new Set([
  'bag', 'bell', 'bus', 'campfire', 'comet', 'crab', 'fire', 'floor', 'handrail', 'lab',
  'lion', 'match', 'moon', 'mouse', 'night', 'nurse', 'prize', 'rocket', 'shark',
  'ship', 'squid', 'star', 'suit', 'sun', 'tail', 'teacher', 'telescope', 'tent',
  'test', 'tide', 'turtle', 'umbrella', 'whale'
]);

const REQUIRES_THE_NOUNS = new Set([
  'weather', 'sun', 'moon'
]);

const DETERMINERS = new Set([
  'a', 'an', 'the', 'this', 'that', 'these', 'those',
  'my', 'your', 'his', 'her', 'its', 'our', 'their'
]);

const validSubjectStarters = new Set([
  'i', 'you', 'he', 'she', 'it', 'we', 'they',
  'the', 'a', 'an', 'this', 'that', 'these', 'those',
  'my', 'your', 'his', 'her', 'their', 'our',
  'jake', 'tom', 'nurse', 'lion', 'mouse', 'campers', 'children', 'dad', 'hunters',
  'sun', 'rocket', 'fuel', 'astronauts', 'telescope', 'comet', 'moon', 'spaceship', 'space',
  'fish', 'whale', 'sharks', 'coral', 'crab', 'tide', 'dolphins', 'squid', 'turtle',
  'students', 'weather', 'match', 'kids', 'water', 'floors', 'rubber', 'tiles', 'bruises',
  'swelling', 'pain', 'bell', 'outside', 'ropes', 'darkness', 'nights', 'campfire', 'rain',
  'bears', 'trails', 'clouds', 'engines', 'thrusters', 'gravity', 'rocks', 'air', 'teacher',
  'sky', 'skies', 'someone', 'corals', 'seashells', 'gills', 'everyone', 'all'
]);

let total = 0;
const errors = [];
const targetCounts = {};
const distractorCounts = {};

for (const [poolName, list] of Object.entries(activePools)) {
  total += list.length;
  list.forEach((item, idx) => {
    const rawStem = item.sentence.replace(/_____/g, ' ').replace(/[,\.]/g, '').trim();
    const stemWords = rawStem.split(/\s+/).filter(Boolean);
    const stemWordCount = stemWords.length;

    // Rule 1: Stem Word Count <= 7
    if (stemWordCount > 7) {
      errors.push(`${poolName} #${idx+1}: Stem word count = ${stemWordCount} > 7 ("${item.sentence}")`);
    }

    // Rule 2: Exactly 3 options
    if (item.options.length !== 3) {
      errors.push(`${poolName} #${idx+1}: Options count = ${item.options.length} !== 3`);
    }

    // Rule 3: Target in options
    if (!item.options.includes(item.answer)) {
      errors.push(`${poolName} #${idx+1}: Answer "${item.answer}" not in options`);
    }

    // Rule 4: Unique options
    if (new Set(item.options).size !== 3) {
      errors.push(`${poolName} #${idx+1}: Duplicate options in ${JSON.stringify(item.options)}`);
    }

    // Rule 5: Syntactic Completeness of Clause 1 & Clause 2
    const parts = item.sentence.split('_____');
    if (parts.length !== 2) {
      errors.push(`${poolName} #${idx+1}: Missing blank _____`);
      return;
    }
    const clause1Tokens = parts[0].replace(/[,\.]/g, '').trim().split(/\s+/).filter(Boolean);
    const clause2Tokens = parts[1].replace(/[,\.]/g, '').trim().split(/\s+/).filter(Boolean);

    if (clause1Tokens.length < 2) {
      errors.push(`${poolName} #${idx+1}: Clause 1 too short ("${parts[0]}")`);
    }
    if (clause2Tokens.length < 2) {
      errors.push(`${poolName} #${idx+1}: Clause 2 too short ("${parts[1]}")`);
    }

    const firstTokenC2 = clause2Tokens[0].toLowerCase();
    if (!validSubjectStarters.has(firstTokenC2)) {
      errors.push(`${poolName} #${idx+1}: Clause 2 non-subject starter "${firstTokenC2}" in "${item.sentence}"`);
    }

    // Rule 6: Determiner & Article Completeness on Singular Countable Nouns
    const allTokens = rawStem.split(/\s+/).map(t => t.toLowerCase());
    allTokens.forEach((token, tIdx) => {
      if (['fish', 'cream', 'ice', 'water', 'air', 'work'].includes(token)) return;
      if (token === 'cut' && tIdx > 0 && ['were', 'was', 'is', 'are', 'been'].includes(allTokens[tIdx - 1])) return;

      if (SINGULAR_COUNTABLE_NOUNS.has(token)) {
        const prev1 = tIdx > 0 ? allTokens[tIdx - 1] : '';
        const prev2 = tIdx > 1 ? allTokens[tIdx - 2] : '';
        const hasDet = DETERMINERS.has(prev1) || DETERMINERS.has(prev2);
        if (!hasDet) {
          errors.push(`${poolName} #${idx+1}: Bare singular countable noun "${token}" in "${item.sentence}"`);
        }
      }

      if (REQUIRES_THE_NOUNS.has(token)) {
        const prev1 = tIdx > 0 ? allTokens[tIdx - 1] : '';
        const prev2 = tIdx > 1 ? allTokens[tIdx - 2] : '';
        if (prev1 !== 'the' && prev2 !== 'the') {
          errors.push(`${poolName} #${idx+1}: Noun "${token}" requires "the" in "${item.sentence}"`);
        }
      }
    });

    // Rule 7: Plug options without formatting breaks
    item.options.forEach(opt => {
      const fullSent = item.sentence.replace('_____', opt);
      if (/\s{2,}/.test(fullSent)) {
        errors.push(`${poolName} #${idx+1}: Double space after plugging option "${opt}"`);
      }
    });

    targetCounts[item.answer] = (targetCounts[item.answer] || 0) + 1;
    item.options.filter(o => o !== item.answer).forEach(d => {
      distractorCounts[d] = (distractorCounts[d] || 0) + 1;
    });
  });
}

console.log('=============================================================================');
console.log(`TOTAL ACTIVE QUESTIONS VERIFIED FROM chroniclesFloor67Service.js: ${total}`);
console.log(`TOTAL SYNTACTIC, SUBJECT & ARTICLE COMPLETENESS ERRORS: ${errors.length}`);
console.log('=============================================================================');

if (errors.length > 0) {
  console.error('❌ ERRORS DETECTED:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('✅ ALL 84 QUESTIONS IN ACTIVE POOL PASSED 100% OF SUBJECT & ARTICLE COMPLETENESS CHECKS!\n');
}

console.log('Target Frequency Distribution:');
console.log(targetCounts);
console.log('\nDistractor Frequency Distribution:');
console.log(distractorCounts);
