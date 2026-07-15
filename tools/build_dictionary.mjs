/**
 * build_dictionary.mjs
 *
 * Quy trình sản xuất: chạy sau khi tạo xong vocab.js của tuần mới.
 *
 * Chức năng:
 *   1. Load keywords_extracted.json (từ extract_keywords.mjs)
 *   2. Đọc tất cả vocab.js (ADV + Easy, tuần 1-40)
 *   3. Merge vào src/data/dictionary.json chỉ với words trong keywords list
 *   4. Words trong keywords nhưng không có trong vocab.js → tạo minimal entry (word only)
 *   5. ADV ưu tiên hơn Easy khi trùng từ
 *   6. Dictionary được import trực tiếp trong ReadingExplore.jsx (bundled by Vite)
 *   7. In báo cáo: bao nhiêu từ mới, bao nhiêu từ được cập nhật
 *
 * Cách dùng:
 *   node tools/build_dictionary.mjs
 *   node tools/build_dictionary.mjs --week 29   # chỉ xử lý tuần 29
 *   node tools/build_dictionary.mjs --dry-run   # chỉ in báo cáo, không ghi file
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ── Load keywords whitelist ────────────────────────────────────────────────────
const KEYWORDS_PATH = resolve(ROOT, 'tools/keywords_extracted.json');
let keywordsSet = new Set();
if (existsSync(KEYWORDS_PATH)) {
  const kw = JSON.parse(readFileSync(KEYWORDS_PATH, 'utf-8'));
  keywordsSet = new Set(kw.keywords || []);
  console.log(`📋 Loaded ${keywordsSet.size} keywords from keywords_extracted.json`);
} else {
  console.warn('⚠️  keywords_extracted.json not found — building full dictionary');
}

// ── Paths ──────────────────────────────────────────────────────────────────────
const DICT_SRC = resolve(ROOT, 'src/data/dictionary.json');
const DICT_PUBLIC = resolve(ROOT, 'public/dictionary.json');  // Legacy path (not used)

// ── CLI args ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN  = args.includes('--dry-run');
const weekArg  = args.indexOf('--week');
const ONLY_WEEK = weekArg !== -1 ? parseInt(args[weekArg + 1]) : null;
const MAX_WEEK = 40;

// ── Load existing dictionary ───────────────────────────────────────────────────
let existing = {};
if (existsSync(DICT_SRC)) {
  const raw = JSON.parse(readFileSync(DICT_SRC, 'utf-8'));
  const arr = Array.isArray(raw) ? raw : Object.values(raw);
  for (const entry of arr) {
    if (entry.word) existing[entry.word.toLowerCase()] = entry;
  }
  console.log(`📖 Loaded ${Object.keys(existing).length} existing entries from dictionary.json`);
}

// ── Auto-generate example sentences for new words ───────────────────────────────
/**
 * Comprehensive example generator - generates natural examples for any word
 * Based on word patterns, part of speech, and week level
 */
function generateComprehensiveExample(entry) {
  const { word, meaning, first_taught_week, definition_en } = entry;
  const w = word.toLowerCase();
  const week = first_taught_week || 15;
  
  // LEVEL 1: EXACT MATCHES (most common 100+ words)
  const exactExamples = {
    'about': 'This book is about animals.',
    'above': 'The bird flies above the tree.',
    'across': 'We walk across the street carefully.',
    'after': 'I eat lunch after class.',
    'against': 'The ladder leans against the wall.',
    'along': 'We walk along the beach together.',
    'among': 'She sits among her friends.',
    'around': 'The children run around the playground.',
    'before': 'I wash my hands before dinner.',
    'behind': 'The cat hides behind the door.',
    'below': 'The fish swims below the surface.',
    'beside': 'I sit beside my best friend.',
    'between': 'The ball is between two chairs.',
    'beyond': 'The mountains lie beyond the valley.',
    'by': 'I go to school by bus.',
    'despite': 'Despite the rain, we played outside.',
    'down': 'The ball rolls down the hill.',
    'during': 'I sleep during the night.',
    'except': 'Everyone came except my brother.',
    'inside': 'The cat stays inside the house.',
    'into': 'I walk into the classroom.',
    'near': 'I live near the park.',
    'opposite': 'She sits opposite me at lunch.',
    'outside': 'The dog plays outside in the yard.',
    'over': 'The plane flies over the city.',
    'past': 'We drive past the school.',
    'since': 'I have known her since kindergarten.',
    'through': 'We walk through the park daily.',
    'under': 'The cat sleeps under the table.',
    'until': 'I wait here until you return.',
    'without': 'I go to school without my bag.',
    'although': 'Although it rains, we still play.',
    'because': 'I am happy because today is Friday.',
    'however': 'I like apples, however I prefer oranges.',
    'therefore': 'It is raining, therefore I need an umbrella.',
    'unless': 'I cannot go unless you come too.',
    'whenever': 'Whenever it rains, I stay inside.',
    'wherever': 'Wherever you go, I will follow you.',
    'whether': 'I don\'t know whether she is coming.',
    'while': 'I study while my sister plays.',
  };
  
  if (exactExamples[w]) return exactExamples[w];

  // LEVEL 2: No data - use generic patterns
  if (!meaning && !definition_en) {
    if (w.match(/s$/) && w !== 'yes' && w !== 'was' && w !== 'is' && w !== 'as') {
      return `These ${w} are interesting to study.`;
    }
    if (w.match(/ed$/) && w !== 'red' && w !== 'bed') {
      return `We ${w} together last week.`;
    }
    if (w.match(/ing$/) && w !== 'thing' && w !== 'king' && w !== 'ring') {
      return `They are ${w} at the moment.`;
    }
    return `This involves ${w} in some way.`;
  }

  // LEVEL 3: Pattern-based generation
  const def = (definition_en || '').toLowerCase();
  const isVerb = def.startsWith('to ') || def.includes('verb') || w.match(/ing$/) || w.match(/ed$/);
  const isNoun = def.startsWith('a ') || def.startsWith('an ') || def.startsWith('the ') || def.includes('noun');
  const isAdjective = def.includes('adjective') || def.includes('feeling') || def.includes('quality');
  const isAdverb = def.includes('adverb') || w.match(/ly$/);
  
  // Conjugated forms
  if (w.match(/s$/) && !isNoun) {
    if (week <= 5) return `He ${w} to school every day.`;
    if (week <= 14) return `She ${w} with her friends often.`;
    return `My friend ${w} this activity regularly.`;
  }
  if (w.match(/ed$/) && !isNoun) {
    if (week <= 5) return `I ${w} yesterday at school.`;
    if (week <= 14) return `She ${w} last week with friends.`;
    return `We ${w} this many times before.`;
  }
  if (w.match(/ing$/) && !meaning.includes('ing')) {
    if (week <= 5) return `I am ${w} right now.`;
    if (week <= 14) return `She is ${w} at the moment.`;
    return `They have been ${w} for hours.`;
  }
  
  // Type-based patterns
  if (isVerb) {
    if (week <=  5) return `I ${w} every single day.`;
    if (week <= 14) return `She ${w}s at school regularly.`;
    return `We ${w} whenever we can.`;
  }
  if (isNoun) {
    if (week <= 5) return `We use the ${w} at school.`;
    if (week <= 14) return `She put the ${w} in her bag.`;
    return `The ${w} was on the table when we arrived.`;
  }
  if (isAdjective) {
    if (week <= 5) return `This looks very ${w} to me.`;
    if (week <= 14) return `My friend seems quite ${w} today.`;
    return `It was a very ${w} experience.`;
  }
  if (isAdverb) {
    if (week <= 5) return `I do this ${w} every day.`;
    if (week <= 14) return `She works ${w} at her job.`;
    return `They completed the task ${w} yesterday.`;
  }
  
  // Meaning-based fallback
  if (meaning) {
    if (week <= 5) return `I learn the word ${w} at school.`;
    if (week <= 14) return `She used the word ${w} in her story.`;
    return `We practised using ${w} in our writing this week.`;
  }
  
  // Ultimate fallback
  if (week <= 5) return `I practise the word ${w} today.`;
  if (week <= 14) return `She wrote the word ${w} in her notebook.`;
  return `We learned the word ${w} in class this week.`;
}

// ── Fallback definitions for common stopwords (now included in W1-14) ──────────
const FALLBACK_DEFINITIONS = {
  // To be (with subject info for Vietnamese learners)
  'am': {
    meaning: 'thì, là (dùng với "I")',
    pronounce: '/æm/',
    definition_en: 'First person singular present tense of "to be" (used with "I")',
    example: 'I am happy.',
    first_taught_week: 1,
  },
  'is': {
    meaning: 'thì, là (dùng với he/she/it)',
    pronounce: '/ɪz/',
    definition_en: 'Third person singular present tense of "to be" (used with he/she/it)',
    example: 'She is my friend.',
    first_taught_week: 1,
  },
  'are': {
    meaning: 'thì, là (dùng với you/we/they)',
    pronounce: '/ɑːr/',
    definition_en: 'Present tense of "to be" (used with you/we/they)',
    example: 'We are students.',
    first_taught_week: 2,
  },
  'was': {
    meaning: 'đã là, đã thì (quá khứ, dùng với I/he/she/it)',
    pronounce: '/wɒz/',
    definition_en: 'Past tense of "to be" (used with I/he/she/it)',
    first_taught_week: 3,
  },
  'were': {
    meaning: 'đã là, đã thì (quá khứ, dùng với you/we/they)',
    pronounce: '/wɜːr/',
    definition_en: 'Past tense of "to be" (used with you/we/they)',
    first_taught_week: 3,
  },
  'be': {
    meaning: 'là, thì (dạng nguyên mẫu)',
    pronounce: '/biː/',
    definition_en: 'Infinitive form of "to be"',
    first_taught_week: 3,
  },
  // Possessive pronouns (important for beginners)
  'my': {
    meaning: 'của tôi',
    pronounce: '/maɪ/',
    definition_en: 'Belonging to me',
    example: 'This is my book.',
    first_taught_week: 1,
  },
  'your': {
    meaning: 'của bạn',
    pronounce: '/jɔːr/',
    definition_en: 'Belonging to you',
    first_taught_week: 2,
  },
  'his': {
    meaning: 'của anh ấy',
    pronounce: '/hɪz/',
    definition_en: 'Belonging to him',
    first_taught_week: 2,
  },
  'her': {
    meaning: 'của cô ấy',
    pronounce: '/hɜːr/',
    definition_en: 'Belonging to her',
    first_taught_week: 2,
  },
  'its': {
    meaning: 'của nó',
    pronounce: '/ɪts/',
    definition_en: 'Belonging to it',
    first_taught_week: 3,
  },
  'our': {
    meaning: 'của chúng tôi',
    pronounce: '/aʊr/',
    definition_en: 'Belonging to us',
    first_taught_week: 2,
  },
  'their': {
    meaning: 'của họ',
    pronounce: '/ðer/',
    definition_en: 'Belonging to them',
    first_taught_week: 3,
  },
  // Common pronouns
  'i': {
    meaning: 'tôi (chủ ngữ)',
    pronounce: '/aɪ/',
    definition_en: 'First person singular subject pronoun',
    first_taught_week: 1,
  },
  'you': {
    meaning: 'bạn, các bạn',
    pronounce: '/juː/',
    definition_en: 'Second person pronoun (singular or plural)',
    first_taught_week: 1,
  },
  'he': {
    meaning: 'anh ấy, ông ấy',
    pronounce: '/hiː/',
    definition_en: 'Third person singular masculine pronoun',
    first_taught_week: 2,
  },
  'she': {
    meaning: 'cô ấy, bà ấy',
    pronounce: '/ʃiː/',
    definition_en: 'Third person singular feminine pronoun',
    first_taught_week: 1,
  },
  'it': {
    meaning: 'nó (vật, động vật)',
    pronounce: '/ɪt/',
    definition_en: 'Third person singular neuter pronoun',
    first_taught_week: 1,
  },
  'we': {
    meaning: 'chúng tôi, chúng ta',
    pronounce: '/wiː/',
    definition_en: 'First person plural pronoun',
    first_taught_week: 2,
  },
  'they': {
    meaning: 'họ, chúng',
    pronounce: '/ðeɪ/',
    definition_en: 'Third person plural pronoun',
    first_taught_week: 2,
  },
  'them': {
    meaning: 'họ (tân ngữ)',
    pronounce: '/ðem/',
    definition_en: 'Third person plural object pronoun',
    first_taught_week: 3,
  },
  // Articles (basic but needed for Pre-A1)
  'a': {
    meaning: 'một (trước phụ âm)',
    pronounce: '/ə/',
    definition_en: 'Indefinite article (before consonant sounds)',
    example: 'I have a pen.',
    first_taught_week: 1,
  },
  'an': {
    meaning: 'một (trước nguyên âm)',
    pronounce: '/æn/',
    definition_en: 'Indefinite article (before vowel sounds)',
    first_taught_week: 1,
  },
  'the': {
    meaning: 'cái, chiếc (mạo từ xác định)',
    pronounce: '/ðə/',
    definition_en: 'Definite article',
    example: 'The book is on the table.',
    first_taught_week: 1,
  },
  // Common prepositions
  'in': {
    meaning: 'trong, ở trong',
    pronounce: '/ɪn/',
    definition_en: 'Inside, within',
    example: 'I am in the classroom.',
    first_taught_week: 1,
  },
  'on': {
    meaning: 'trên, ở trên',
    pronounce: '/ɒn/',
    definition_en: 'On top of, upon',
    example: 'The book is on the desk.',
    first_taught_week: 1,
  },
  'at': {
    meaning: 'ở, tại',
    pronounce: '/æt/',
    definition_en: 'In a particular place or position',
    example: 'I am at school.',
    first_taught_week: 1,
  },
  'to': {
    meaning: 'đến, tới',
    pronounce: '/tuː/',
    definition_en: 'Toward, in the direction of',
    example: 'I go to school every day.',
    first_taught_week: 1,
  },
  'of': {
    meaning: 'của',
    pronounce: '/əv/',
    definition_en: 'Belonging to, relating to',
    first_taught_week: 1,
  },
  'for': {
    meaning: 'cho, vì',
    pronounce: '/fɔːr/',
    definition_en: 'Intended for, in favor of',
    first_taught_week: 2,
  },
  // Conjunctions
'and': {
    meaning: 'và',
    pronounce: '/ænd/',
    definition_en: 'Connects words or clauses',    example: 'I like apples and oranges.',    first_taught_week: 1,
  },
  'or': {
    meaning: 'hoặc',
    pronounce: '/ɔːr/',
    definition_en: 'Indicates alternatives',
    first_taught_week: 2,
  },
  'but': {
    meaning: 'nhưng',
    pronounce: '/bʌt/',
    definition_en: 'Indicates contrast or exception',
    first_taught_week: 2,
  },
  // To have
  'have': {
    meaning: 'có (dùng với I/you/we/they)',
    pronounce: '/hæv/',
    definition_en: 'To possess, to own (used with I/you/we/they)',
    example: 'I have a new bag.',
    first_taught_week: 1,
  },
  'has': {
    meaning: 'có (dùng với he/she/it)',
    pronounce: '/hæz/',
    definition_en: 'To possess, to own (used with he/she/it)',
    first_taught_week: 2,
  },
  'had': {
    meaning: 'đã có (quá khứ)',
    pronounce: '/hæd/',
    definition_en: 'Past tense of "to have"',
    first_taught_week: 3,
  },
  // Demonstratives
  'this': {
    meaning: 'cái này, điều này',
    pronounce: '/ðɪs/',
    definition_en: 'Refers to something nearby (singular)',
    first_taught_week: 1,
  },
  'that': {
    meaning: 'cái đó, điều đó',
    pronounce: '/ðæt/',
    definition_en: 'Refers to something distant (singular)',
    first_taught_week: 2,
  },
  'these': {
    meaning: 'những cái này',
    pronounce: '/ðiːz/',
    definition_en: 'Refers to things nearby (plural)',
    first_taught_week: 3,
  },
  'those': {
    meaning: 'những cái đó',
    pronounce: '/ðoʊz/',
    definition_en: 'Refers to things distant (plural)',
    first_taught_week: 3,
  },
  // Auxiliary verbs
  'do': {
    meaning: 'làm (trợ động từ)',
    pronounce: '/duː/',
    definition_en: 'Auxiliary verb for questions and negatives',
    first_taught_week: 2,
  },
  'does': {
    meaning: 'làm (dùng với he/she/it)',
    pronounce: '/dʌz/',
    definition_en: 'Third person singular of "do"',
    first_taught_week: 3,
  },
  'did': {
    meaning: 'đã làm (quá khứ)',
    pronounce: '/dɪd/',
    definition_en: 'Past tense of "do"',
    first_taught_week: 3,
  },
  // Common additions found in Week 1
  'hi': {
    meaning: 'chào (thân mật)',
    pronounce: '/haɪ/',
    definition_en: 'Informal greeting',
    first_taught_week: 1,
  },
  'me': {
    meaning: 'tôi (tân ngữ)',
    pronounce: '/miː/',
    definition_en: 'First person singular object pronoun',
    first_taught_week: 1,
  },
  // Common beginner verbs (Pre-A1 level)
  'sit': {
    meaning: 'ngồi',
    pronounce: '/sɪt/',
    definition_en: 'To rest in a seated position',
    example: 'I sit at my desk.',
    first_taught_week: 1,
  },
  'make': {
    meaning: 'làm, tạo ra',
    pronounce: '/meɪk/',
    definition_en: 'To create or produce something',
    example: 'My mother makes breakfast.',
    first_taught_week: 2,
  },
  'play': {
    meaning: 'chơi',
    pronounce: '/pleɪ/',
    definition_en: 'To engage in games or activities for enjoyment',
    example: 'I play with my friends.',
    first_taught_week: 2,
  },
  'work': {
    meaning: 'làm việc',
    pronounce: '/wɜːrk/',
    definition_en: 'To do a job or task',
    example: 'We work together.',
    first_taught_week: 2,
  },
  'learn': {
    meaning: 'học',
    pronounce: '/lɜːrn/',
    definition_en: 'To gain knowledge or skill',
    example: 'I learn English every day.',
    first_taught_week: 1,
  },
  'go': {
    meaning: 'đi',
    pronounce: '/ɡoʊ/',
    definition_en: 'To move from one place to another',
    example: 'I go to school.',
  },
  'come': {
    meaning: 'đến',
    pronounce: '/kʌm/',
    definition_en: 'To move toward or arrive',
    example: 'Come here, please.',
  },
  'walk': {
    meaning: 'đi bộ',
    pronounce: '/wɔːk/',
    definition_en: 'To move on foot',
    example: 'I walk to school.',
  },
  'run': {
    meaning: 'chạy',
    pronounce: '/rʌn/',
    definition_en: 'To move fast on foot',
    example: 'He runs very fast.',
  },
  'eat': {
    meaning: 'ăn',
    pronounce: '/iːt/',
    definition_en: 'To consume food',
    example: 'We eat lunch at 12.',
  },
  'drink': {
    meaning: 'uống',
    pronounce: '/drɪŋk/',
    definition_en: 'To consume liquid',
    example: 'I drink water every day.',
  },
  'read': {
    meaning: 'đọc',
    pronounce: '/riːd/',
    definition_en: 'To look at and understand written words',
    example: 'She reads a book.',
  },
  'write': {
    meaning: 'viết',
    pronounce: '/raɪt/',
    definition_en: 'To make letters or words with a pen or pencil',
    example: 'I write my name.',
  },
  'get': {
    meaning: 'lấy, nhận',
    pronounce: '/ɡet/',
    definition_en: 'To obtain or receive',
    example: 'I get a gift.',
  },
  'want': {
    meaning: 'muốn',
    pronounce: '/wɑːnt/',
    definition_en: 'To desire or wish for',
    example: 'I want to play.',
  },
  'give': {
    meaning: 'cho',
    pronounce: '/ɡɪv/',
    definition_en: 'To hand over or provide',
    example: 'Give me your hand.',
  },
  // Additional common beginner adjectives & adverbs
  'big': {
    meaning: 'lớn, to',
    pronounce: '/bɪɡ/',
    definition_en: 'Large in size',
    example: 'It is a big door.',
    first_taught_week: 1,
  },
  'small': {
    meaning: 'nhỏ',
    pronounce: '/smɔːl/',
    definition_en: 'Little in size',
    example: 'This is a small dog.',
    first_taught_week: 2,
  },
  'good': {
    meaning: 'tốt',
    pronounce: '/ɡʊd/',
    definition_en: 'Of high quality, pleasant',
    example: 'She is a good student.',
    first_taught_week: 2,
  },
  'bad': {
    meaning: 'xấu, tồi',
    pronounce: '/bæd/',
    definition_en: 'Not good, unpleasant',
    example: 'Bad weather today.',
    first_taught_week: 3,
  },
  'kind': {
    meaning: 'tử tế, tốt bụng',
    pronounce: '/kaɪnd/',
    definition_en: 'Friendly, caring, or helpful',
    example: 'My teacher is kind.',
    first_taught_week: 1,
  },
  'happy': {
    meaning: 'vui vẻ, hạnh phúc',
    pronounce: '/ˈhæpi/',
    definition_en: 'Feeling or showing pleasure',
    example: 'I am happy to see you.',
    first_taught_week: 1,
  },
  'great': {
    meaning: 'tuyệt vời, tốt',
    pronounce: '/ɡreɪt/',
    definition_en: 'Very good, excellent',
    example: 'This is a great book.',
    first_taught_week: 2,
  },
  'lucky': {
    meaning: 'may mắn',
    pronounce: '/ˈlʌki/',
    definition_en: 'Having good fortune',
    example: 'I am very lucky.',
    first_taught_week: 2,
  },
  'very': {
    meaning: 'rất',
    pronounce: '/ˈveri/',
    definition_en: 'To a high degree, extremely',
    example: 'It is very big.',
    first_taught_week: 1,
  },
  'many': {
    meaning: 'nhiều',
    pronounce: '/ˈmeni/',
    definition_en: 'A large number of',
    example: 'I have many friends.',
  },
  'every': {
    meaning: 'mọi, mỗi',
    pronounce: '/ˈevri/',
    definition_en: 'Each one of a group',
    first_taught_week: 1,
  },
  'each': {
    meaning: 'mỗi',
    pronounce: '/iːtʃ/',
    definition_en: 'Every one of two or more, considered individually',
    first_taught_week: 2,
  },
  'other': {
    meaning: 'khác',
    pronounce: '/ˈʌðər/',
    definition_en: 'Different from the one mentioned',
    example: 'I want the other book.',
    first_taught_week: 2,
  },
  // Common beginner nouns
  'food': {
    meaning: 'thức ăn',
    pronounce: '/fuːd/',
    definition_en: 'Things we eat',
    example: 'My mother makes food.',
    first_taught_week: 2,
  },
  'place': {
    meaning: 'nơi, vị trí',
    pronounce: '/pleɪs/',
    definition_en: 'A particular position or area',
    example: 'This is a happy place.',
    first_taught_week: 1,
  },
  'front': {
    meaning: 'phía trước',
    pronounce: '/frʌnt/',
    definition_en: 'The forward-facing part',
    example: 'There is a door at the front.',
    first_taught_week: 1,
  },
  'happiness': {
    meaning: 'hạnh phúc, niềm vui',
    pronounce: '/ˈhæpinəs/',
    definition_en: 'The state of being happy',
    example: 'My family is full of happiness.',
    first_taught_week: 2,
  },
  'full': {
    meaning: 'đầy',
    pronounce: '/fʊl/',
    definition_en: 'Containing as much as possible',
    example: 'The box is full.',
    first_taught_week: 2,
  },
  // Common prepositions/adverbs
  'with': {
    meaning: 'với',
    pronounce: '/wɪð/',
    definition_en: 'Accompanied by, together with',
    example: 'I go with my friend.',
    first_taught_week: 2,
  },
  'us': {
    meaning: 'chúng tôi (tân ngữ)',
    pronounce: '/ʌs/',
    definition_en: 'First person plural object pronoun',
    example: 'Come with us.',
    first_taught_week: 2,
  },
  'here': {
    meaning: 'ở đây',
    pronounce: '/hɪr/',
    definition_en: 'In or at this place',
    example: 'I sit here every day.',
    first_taught_week: 1,
  },
  'next': {
    meaning: 'kế tiếp, bên cạnh',
    pronounce: '/nekst/',
    definition_en: 'Coming immediately after, or nearest to',
    example: 'She sits next to me.',
    first_taught_week: 1,
  },
  'together': {
    meaning: 'cùng nhau',
    pronounce: '/təˈɡeðər/',
    definition_en: 'With or in proximity to another person or people',
    example: 'We work together.',
    first_taught_week: 2,
  },
  // Additional adjectives
  'colourful': {
    meaning: 'đầy màu sắc',
    pronounce: '/ˈkʌlərfəl/',
    definition_en: 'Having many colors, bright',
    example: 'I see a colourful picture.',
    first_taught_week: 1,
  },
  'today': {
    meaning: 'hôm nay',
    pronounce: '/təˈdeɪ/',
    definition_en: 'This present day',
    example: 'I am at school today.',
    first_taught_week: 1,
  },
  'grade': {
    meaning: 'lớp, cấp',
    pronounce: '/ɡreɪd/',
    definition_en: 'A level or class in school',
    example: 'I am in grade 1.',
    first_taught_week: 1,
  },
};


// ── Process vocab files ────────────────────────────────────────────────────────
let added = 0, updated = 0, skipped = 0;

const ranges = ONLY_WEEK
  ? [ONLY_WEEK]
  : Array.from({ length: MAX_WEEK }, (_, i) => i + 1);

for (const week of ranges) {
  const paths = [
    resolve(ROOT, `src/data/weeks/week_${week.toString().padStart(2,'0')}/vocab.js`),
    // Also accept short-form week numbers e.g. week_1 (fallback)
    resolve(ROOT, `src/data/weeks/week_${week}/vocab.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week.toString().padStart(2,'0')}/vocab.js`),
    resolve(ROOT, `src/data/weeks_easy/week_${week}/vocab.js`),
  ];

  // Group by ADV (first 2 paths) vs Easy (last 2) — ADV processed first → takes priority
  const found = [];
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    if (existsSync(p)) found.push({ path: p, isEasy: i >= 2 });
  }
  // De-duplicate same file found via both pad/no-pad variants
  const seen = new Set();
  const unique = found.filter(f => !seen.has(f.path) && seen.add(f.path));

  // Sort: ADV first, Easy second
  unique.sort((a, b) => a.isEasy - b.isEasy);

  for (const { path: vocabPath, isEasy } of unique) {
    let mod;
    try {
      mod = await import(pathToFileURL(vocabPath).href + `?t=${Date.now()}`);
    } catch (err) {
      console.warn(`⚠️  Import error ${vocabPath}: ${err.message}`);
      continue;
    }

    const data = mod.default;
    const vocabArray = data?.vocab || (Array.isArray(data) ? data : null);
    if (!Array.isArray(vocabArray)) {
      console.warn(`⚠️  Unexpected shape in ${vocabPath}`);
      continue;
    }

    for (const item of vocabArray) {
      const word = item.word?.trim();
      if (!word) continue;
      const key = word.toLowerCase();

      // Skip if not in keywords whitelist (when whitelist exists)
      if (keywordsSet.size > 0 && !keywordsSet.has(key)) {
        continue;
      }

      const incoming = {
        word: key,
        meaning: item.definition_vi || '',
        pronounce: item.pronunciation || '',
        definition_en: item.definition_en || '',
        first_taught_week: week, // Track which week this word was first formally taught
        // type left as-is from existing or undefined (vocab.js has no type field)
      };

      if (existing[key]) {
        // Update: backfill missing fields only — never overwrite hand-curated data
        let changed = false;
        const ex = existing[key];
        if (!ex.definition_en && incoming.definition_en) {
          ex.definition_en = incoming.definition_en;
          changed = true;
        }
        if (!ex.pronounce && incoming.pronounce) {
          ex.pronounce = incoming.pronounce;
          changed = true;
        }
        if (!ex.meaning && incoming.meaning) {
          ex.meaning = incoming.meaning;
          changed = true;
        }
        // Keep earliest taught week (don't overwrite with later week)
        if (!ex.first_taught_week && incoming.first_taught_week) {
          ex.first_taught_week = incoming.first_taught_week;
          changed = true;
        } else if (ex.first_taught_week && incoming.first_taught_week && incoming.first_taught_week < ex.first_taught_week) {
          ex.first_taught_week = incoming.first_taught_week;
          changed = true;
        }
        // If Easy variant tries to overwrite, skip gracefully
        if (isEasy && ex._source === 'adv') {
          skipped++;
          continue;
        }
        if (changed) {
          updated++;
        } else {
          skipped++;
        }
      } else {
        // New entry
        existing[key] = {
          ...incoming,
          _source: isEasy ? 'easy' : 'adv',
        };
        added++;
      }
    }
  }
}

// ── Add minimal entries for keywords not found in vocab.js ────────────────────
if (keywordsSet.size > 0) {
  let minimalAdded = 0;
  let weekTracked = 0;
  for (const keyword of keywordsSet) {
    if (!existing[keyword]) {
      // Check if we have a fallback definition for this common stopword/beginner word
      const fallback = FALLBACK_DEFINITIONS[keyword];
      existing[keyword] = {
        word: keyword,
        meaning: fallback?.meaning || '',
        pronounce: fallback?.pronounce || '',
        definition_en: fallback?.definition_en || '',
        example: fallback?.example || '',
        first_taught_week: fallback?.first_taught_week, // Track when word first appears
      };
      minimalAdded++;
      added++;
    } else if (existing[keyword]) {
      // Entry exists — backfill with fallback if available
      const fallback = FALLBACK_DEFINITIONS[keyword];
      if (fallback) {
        let changed = false;
        // Update missing fields
        if (!existing[keyword].meaning && fallback.meaning) {
          existing[keyword].meaning = fallback.meaning;
          changed = true;
        }
        if (!existing[keyword].pronounce && fallback.pronounce) {
          existing[keyword].pronounce = fallback.pronounce;
          changed = true;
        }
        if (!existing[keyword].definition_en && fallback.definition_en) {
          existing[keyword].definition_en = fallback.definition_en;
          changed = true;
        }
        // Add example sentence if not present
        if (!existing[keyword].example && fallback.example) {
          existing[keyword].example = fallback.example;
          changed = true;
        }
        // ALWAYS update first_taught_week if entry doesn't have it yet
        if (fallback.first_taught_week && !existing[keyword].first_taught_week) {
          existing[keyword].first_taught_week = fallback.first_taught_week;
          weekTracked++;
          changed = true;
        }
        if (changed) updated++;
      }
      
      // AUTO-GENERATE example if still missing (no fallback or fallback has no example)
      if (!existing[keyword].example) {
        const generated = generateComprehensiveExample(existing[keyword]);
        if (generated) {
          existing[keyword].example = generated;
          updated++;
        }
      }
    }
  }
  if (minimalAdded > 0) {
    console.log(`📝 Added ${minimalAdded} minimal entries for keywords not in vocab.js`);
  }
  if (weekTracked > 0) {
    console.log(`📅 Tracked first_taught_week for ${weekTracked} existing entries`);
  }
}

// ── Clean internal _source field before writing ────────────────────────────────
const finalArray = Object.values(existing)
  .map(({ _source, ...rest }) => rest)  // strip _source
  .sort((a, b) => a.word.localeCompare(b.word));

// ── Write output ───────────────────────────────────────────────────────────────
const json = JSON.stringify(finalArray, null, 2);

if (DRY_RUN) {
  console.log('\n🔍 DRY RUN — no files written');
} else {
  writeFileSync(DICT_SRC, json, 'utf-8');
  console.log(`\n✅ Written to src/data/dictionary.json (${finalArray.length} entries, ${(json.length / 1024).toFixed(1)}KB)`);
  console.log('   📦 Dictionary will be bundled by Vite (no runtime fetch needed)');
}

console.log(`\n📊 Report:`);
console.log(`   ➕ Added   : ${added} new entries`);
console.log(`   🔄 Updated : ${updated} entries (backfilled missing fields)`);
console.log(`   ⏭  Skipped : ${skipped} already complete entries`);
console.log(`   📚 Total   : ${finalArray.length} entries in dictionary`);
