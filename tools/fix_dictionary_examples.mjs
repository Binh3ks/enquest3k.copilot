#!/usr/bin/env node
/**
 * fix_dictionary_examples.mjs
 *
 * Fixes broken dictionary examples:
 *   1. Starts mid-sentence (*as a great team...)
 *   2. Ends mid-sentence (truncated)
 *   3. Has stray ** markers
 *   4. Long but no ending punctuation
 *   5. Too short (< 10 chars)
 *
 * Strategy (priority order):
 *   1. Exact word in exactExamples lookup
 *   2. Extract complete sentence from read.js content_en
 *   3. Pattern-based generation
 *
 * Usage:
 *   node tools/fix_dictionary_examples.mjs        # dry-run
 *   node tools/fix_dictionary_examples.mjs --apply  # apply
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE = path.resolve(__dirname, '..');

// ── Load dictionary ────────────────────────────────────────────────────────────

const dictPath = path.join(WORKSPACE, 'src/data/dictionary.json');
const dict = JSON.parse(fs.readFileSync(dictPath, 'utf8'));

// ── Collect all read.js content_en ───────────────────────────────────────────

function collectReadContent() {
  const weeksDirs = fs.readdirSync(path.join(WORKSPACE, 'src/data/weeks')).filter(d => d.startsWith('week_'));
  const allContent = [];
  for (const wd of weeksDirs) {
    for (const mode of ['weeks', 'weeks_easy']) {
      const fp = path.join(WORKSPACE, `src/data/${mode}/${wd}/read.js`);
      if (fs.existsSync(fp)) {
        try {
          const raw = fs.readFileSync(fp, 'utf8');
          const match = raw.match(/content_en:\s*`([^`]+)`/);
          if (match) allContent.push(match[1]);
        } catch {}
      }
    }
  }
  return allContent;
}

// ── Extract complete sentence from text ─────────────────────────────────────

function extractSentence(text, word) {
  const cleanWord = word.replace(/\*\*/g, '');
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z"'])/);
  for (const sent of sentences) {
    const cleanSent = sent.replace(/\*\*/g, '').replace(/[*_]/g, '');
    if (cleanSent.toLowerCase().includes(cleanWord.toLowerCase())) {
      let result = cleanSent.replace(/^\s+/, '').replace(/\s+$/, '').trim()
        .replace(/\n/g, ' ').replace(/\s+/g, ' ');
      if (!/[.!?]$/.test(result)) result += '.';
      if (result.length >= 10 && result.length <= 300 && /^[A-Z]/.test(result)) {
        return result;
      }
    }
  }
  return null;
}

// ── ESL example generator ─────────────────────────────────────────────────────

function generateExample(entry) {
  const { word, meaning, first_taught_week = 15, definition_en = '' } = entry;
  const w = word.toLowerCase();
  const week = first_taught_week;
  const def = definition_en.toLowerCase();

  // Priority 1: Exact phrase lookup
  const exactExamples = {
    // Prepositions
    'about': 'This book is about animals and nature.',
    'above': 'The bird flies above the tall tree.',
    'across': 'We walk across the street carefully.',
    'after': 'I eat lunch after class every day.',
    'against': 'The ladder leans against the wall.',
    'along': 'We walk along the beach together.',
    'among': 'She sits among her good friends at school.',
    'around': 'The children run around the playground.',
    'before': 'I wash my hands before dinner.',
    'behind': 'The cat hides behind the door.',
    'below': 'The fish swims below the water surface.',
    'beside': 'I sit beside my best friend at school.',
    'between': 'The ball is between two chairs.',
    'by': 'I go to school by bus every day.',
    'down': 'The ball rolls down the hill.',
    'during': 'I sleep during the quiet night.',
    'inside': 'The cat stays inside the house.',
    'into': 'I walk into the classroom every morning.',
    'near': 'I live near the park and the school.',
    'over': 'The plane flies over the city.',
    'past': 'We drive past the school every day.',
    'through': 'We walk through the park every day.',
    'under': 'The cat sleeps under the warm table.',
    'until': 'I wait here until you return.',
    'without': 'I go to school without forgetting my bag.',
    'next to': 'The pen is next to the ruler on the desk.',
    // Conjunctions
    'although': 'Although it rains, we still play outside.',
    'because': 'I am happy because today is Friday.',
    'however': 'I like apples, however I prefer oranges.',
    'while': 'I study while my sister plays outside.',
    // Chunks
    'each other': 'The two friends help each other every day.',
    'every day': 'I go to school every day.',
    'every evening': 'We have dinner together every evening.',
    'every morning': 'I wake up every morning at seven.',
    'every afternoon': 'I read books every afternoon after school.',
    'every time': 'I smile every time I see my best friend.',
    'for us': 'My mom cooks for us every single day.',
    'for school': 'I pack my bag and get ready for school.',
    'have dinner': 'We have dinner together as a family.',
    'help me with': 'My brother helps me with my homework.',
    'in detail': 'She describes her project in detail.',
    'in the park': 'We play in the park after school.',
    'in the living room': 'We watch TV in the living room.',
    'in the morning': 'I drink milk in the morning.',
    'in the box': 'The toy is in the box on the table.',
    'in the bathroom': 'I wash my hands in the bathroom.',
    'in the classroom': 'We study in the classroom every day.',
    'in the evening': 'We read books in the evening.',
    'in the house': 'The cat stays in the house all day.',
    'in the kitchen': 'My mom cooks in the kitchen every day.',
    'in the picture': 'I draw a picture for my mom.',
    'in the zoo': 'We see many animals in the zoo.',
    'in the corridor': 'The students walk in the corridor between classes.',
    'on the table': 'The book is on the table in my room.',
    'pick up': 'I pick up my coat from the chair.',
    'play with': 'I play with my friends after school.',
    'put on': 'I put on my boots before going outside.',
    'sing very well': 'My friend can sing very well.',
    'sit at': 'I sit at my desk to write.',
    'stand here': 'I stand here and wait for my turn.',
    'stand up': 'I stand up when the teacher comes in.',
    'take off': 'I take off my shoes at the door.',
    'talk about': 'We talk about our day together at dinner.',
    'thank you': 'Thank you for your help today!',
    'the best': 'You are the best friend ever!',
    'think about': 'I think about my future every day.',
    'to school': 'I walk to school every morning.',
    'together': 'We work together on the project.',
    'very well': 'She sings very well in the concert.',
    'wake up': 'I wake up at seven every morning.',
    'walk to': 'I walk to the park with my dad.',
    'walk to school': 'I walk to school every day.',
    'work together': 'We work together as a team at school.',
    'on Monday': 'I have art class on Monday every week.',
    'on my bed': 'There is a school bag on my bed in my room.',
    'look in the box': 'I look in the box for my toy.',
    'look like': 'My cat looks like a small tiger.',
    'make sure': 'I make sure my homework is done.',
    'look outside the window': 'I look outside the window and see the beautiful sky.',
    'next to the door': 'The ball is next to the door in the room.',
    // Verb phrases
    'a lot': 'I read books a lot in my free time.',
    'a lot of': 'There are a lot of books on the shelf.',
    'fall down': 'The baby is learning to walk and falls down.',
    'fell down': 'He fell down on the playground.',
    'get up': 'I get up early every single morning.',
    'grow up': 'I want to grow up to be a teacher.',
    'had lunch': 'We had lunch at school today.',
    'has lunch': 'She has lunch at twelve every day.',
    'have breakfast': 'I have breakfast before going to school.',
    'have lunch': 'We have lunch at school together.',
    'do homework': 'I do homework every evening after school.',
    'go to bed': 'I go to bed at nine o\'clock every night.',
    'have fun': 'We have fun playing games together.',
    'hide and seek': 'We play hide and seek in the garden.',
    'jump up': 'The frog jumped up from the water.',
    'like to': 'I like to draw pictures of my family.',
    'listen carefully': 'I listen carefully in class.',
    'listen to': 'I listen to music in my free time.',
    'look at': 'I look at the beautiful sunset.',
    'look for': 'I look for my book in my bag.',
    'look forward': 'I look forward to the weekend.',
    'look after': 'I look after my little sister.',
    'make friends': 'I make friends easily at school.',
    'put away': 'I put away my toys before bed.',
    'sit on': 'I sit on a chair at the table.',
    'sit down': 'Please sit down and open your book.',
    'sleep well': 'I sleep well every single night.',
    'take care': 'I take care of my pet every day.',
    'think about': 'I think about my family when I am away.',
    'wait for': 'I wait for my mom at the school gate.',
    'walk around': 'We walk around the park on Sunday.',
    'walk carefully': 'You must walk carefully on the ice.',
    'exploring the city': 'I enjoy exploring the city on weekends.',
    'feel creative': 'I feel creative when I am drawing pictures.',
    'feel proud of my work': 'I feel proud of my work after finishing it.',
    'cheering loudly': 'Our team is playing soccer and everyone is cheering loudly!',
    'count': 'I can count from one to ten in English.',
    'draws pictures': 'My sister draws pictures every single day.',
    'every afternoon': 'I read books every afternoon after school.',
    'falls asleep': 'My little brother falls asleep easily every night.',
    'fell asleep': 'The cat fell asleep on the warm sofa.',
    'flying her red kite': 'My sister is flying her red kite in the park.',
    'from each other': 'We look different from each other in my family.',
    'had solved the case': 'Detective Nova had solved the case once again.',
    'have questions': 'Do you have questions about this lesson?',
    'holds': 'She holds my hand tight when we cross the street.',
    'listens': 'She listens to the teacher carefully in class.',
    'looks': 'He looks at the beautiful picture on the wall.',
    'every time': 'I smile every time I see my best friend.',
    'in my pencil case': 'There is a pen in my pencil case on the desk.',
    // Grammar patterns
    'what time': 'What time does the class start?',
    'what about': 'What about going to the park today?',
    'what kind': 'What kind of fruit do you like best?',
    'why don\'t': 'Why don\'t you come with us?',
    'why not': 'Why not go to the beach this weekend?',
    'would like': 'I would like some water, please.',
    'would you': 'Would you like to play with me?',
    'such a': 'It is such a beautiful day today!',
    'so that': 'I study hard so that I can learn well.',
    'so much': 'I eat so much food at the party!',
    'how about': 'How about we go to the cinema today?',
    'how many': 'How many books do you have in your bag?',
    'how much': 'How much does this book cost?',
    'how old': 'How old are you? I am eleven years old.',
    'how far': 'How far is it from your house to school?',
    'how long': 'How long does it take to get there?',
    'how come': 'How come you are so tired today?',
    'no longer': 'I am no longer afraid of the dark.',
    'not any': 'There are not any cookies left.',
    'not yet': 'I have not yet finished my homework.',
    'not only': 'She is not only smart but also very kind.',
    'not very': 'The movie was not very interesting.',
    'either or': 'You can choose either the red one or the blue one.',
    'neither nor': 'Neither Tom nor Jane came to the party.',
    'rather than': 'I would rather read than watch TV.',
    'had better': 'You had better go to bed early tonight.',
    'used to': 'I used to live in a small town.',
    'a little': 'There is a little milk left in the glass.',
    'fall asleep': 'I fall asleep easily after reading a book.',
    'be careful': 'Be careful when you cross the street!',
    'be quiet': 'Please be quiet in the library.',
    'be proud': 'I am proud of my work.',
    'be ready': 'Are you ready for the test?',
    'be late': 'I do not want to be late for school.',
    'be happy': 'I am happy to see my friends at school.',
    'be sad': 'I feel sad when it rains all day.',
    'be kind': 'It is important to be kind to everyone.',
    'be honest': 'Please be honest about what happened.',
    'be good': 'She is good at playing the piano.',
    'be tired': 'I am tired after playing all day.',
    'be scared': 'Do not be scared of the dark!',
    'be excited': 'I am excited about the school trip!',
    'be afraid': 'I am afraid of spiders and big heights.',
    'at the zoo': 'We saw many animals at the zoo on Sunday.',
    'at the park': 'We played games at the park after school.',
    'calls': 'My mom calls me when I get home.',
    'were happy': 'The children were happy at the birthday party.',
    'was hurt': 'The boy was hurt in the playground accident.',
    'were playing': 'We were playing outside when it rained.',
    'had solved': 'Detective Nova had solved the case once again.',
    'every afternoon': 'I read books every afternoon after school.',
    'every time': 'I smile every time I see my best friend.',
    'cheering': 'Our team is playing soccer and everyone is cheering loudly!',
  };

  if (exactExamples[w]) return exactExamples[w];

  // Priority 2: Multi-word phrases (contain space)
  if (w.includes(' ')) {
    // Detect if phrase starts with a bare verb that needs conjugation
    const firstWord = w.split(' ')[0];
    const bareVerbs = ['do', 'go', 'draw', 'play', 'watch', 'read', 'write', 'run', 'jump', 'swim', 'sing', 'dance', 'sleep', 'eat', 'drink', 'walk', 'talk', 'think', 'look', 'work', 'help', 'wait', 'wash', 'brush', 'comb', 'put', 'pick', 'take', 'make', 'find', 'feel', 'fall', 'fly', 'grow', 'hide', 'hold', 'keep', 'know', 'leave', 'lend', 'lose', 'meet', 'pay', 'ride', 'ring', 'rise', 'sell', 'send', 'shake', 'shine', 'shoot', 'show', 'shut', 'sink', 'sit', 'slide', 'smell', 'snap', 'spell', 'spend', 'spill', 'split', 'spread', 'stand', 'steal', 'stick', 'sting', 'stink', 'strike', 'swear', 'sweep', 'swim', 'swing', 'tear', 'throw', 'understand', 'wake', 'wear', 'weep', 'win', 'wind', 'withdraw', 'wring'];
    if (bareVerbs.includes(firstWord)) {
      const conj = { do: 'does', go: 'goes', draw: 'draws', play: 'plays', watch: 'watches',
        read: 'reads', write: 'writes', run: 'runs', jump: 'jumps', swim: 'swims',
        sing: 'sings', dance: 'dances', sleep: 'sleeps', eat: 'eats', drink: 'drinks',
        walk: 'walks', talk: 'talks', think: 'thinks', look: 'looks', work: 'works',
        help: 'helps', wait: 'waits', wash: 'washes', brush: 'brushes', comb: 'combs',
        put: 'puts', pick: 'picks', take: 'takes', make: 'makes', find: 'finds',
        feel: 'feels', fall: 'falls', fly: 'flies', grow: 'grows', hide: 'hides',
        hold: 'holds', keep: 'keeps', know: 'knows', leave: 'leaves', lend: 'lends',
        lose: 'loses', meet: 'meets', pay: 'pays', ride: 'rides', ring: 'rings',
        rise: 'rises', sell: 'sells', send: 'sends', shake: 'shakes', shine: 'shines',
        shoot: 'shoots', show: 'shows', shut: 'shuts', sink: 'sinks', sit: 'sits',
        slide: 'slides', smell: 'smells', spell: 'spells', spend: 'spends', spill: 'spills',
        split: 'splits', spread: 'spreads', stand: 'stands', steal: 'steals',
        stick: 'sticks', sting: 'stings', stink: 'stinks', strike: 'strikes',
        sweep: 'sweeps', swing: 'swings', tear: 'tears', throw: 'throws',
        understand: 'understands', wake: 'wakes', wear: 'wears', weep: 'weeps',
        win: 'wins', wind: 'winds', withdraw: 'withdraws', wring: 'wrings',
        // Add 's' for simple -s verbs
        call: 'calls', ask: 'asks', need: 'needs', love: 'loves', like: 'likes',
        use: 'uses', want: 'wants', hope: 'hopes', start: 'starts', try: 'tries',
        learn: 'learns', live: 'lives', believe: 'believes', hold: 'holds',
        carry: 'carries', hurry: 'hurries', study: 'studies', copy: 'copies',
        fly: 'flies', cry: 'cries', bury: 'buries', empty: 'empties' };
      const conjugated = conj[firstWord] || (firstWord + 's');
      const rest = w.slice(firstWord.length + 1);
      if (week <= 5) return `I ${firstWord} ${rest} every day.`;
      if (week <= 14) return `She ${conjugated} ${rest} after school.`;
      return `We ${firstWord} ${rest} together whenever we can.`;
    }
    if (week <= 5) return `We use ${w} every day at school.`;
    if (week <= 14) return `She ${w} with her friends after school.`;
    return `We ${w} together whenever we can.`;
  }

  // Priority 3: Single words — pattern-based
  const isVerb = def.startsWith('to ') || def.includes('verb') || w.match(/ing$/) || w.match(/ed$/);
  const isNoun = def.startsWith('a ') || def.startsWith('an ') || def.startsWith('the ') || def.includes('noun');
  const isAdj = def.includes('adjective') || def.includes('feeling') || def.includes('quality');
  const isAdv = def.includes('adverb') || w.match(/ly$/);

  // 3rd person singular verbs (ends in -s, 4+ chars, not plural noun)
  if (w.match(/^[a-z]{4,}s$/) && !isNoun) {
    if (week <= 5) return `He ${w}s to school every day.`;
    if (week <= 14) return `She ${w}s with her friends often.`;
    return `My friend ${w}s every single morning.`;
  }

  if (w.match(/ed$/) && !isNoun && w.length > 3) {
    if (week <= 5) return `I ${w} yesterday at school.`;
    if (week <= 14) return `She ${w} last week with her friends.`;
    return `We ${w} this many times before.`;
  }

  if (w.match(/ing$/) && !meaning?.includes('ing')) {
    if (week <= 5) return `I am ${w} right now.`;
    if (week <= 14) return `She is ${w} at the moment.`;
    return `They have been ${w} for hours.`;
  }

  if (isVerb) {
    if (week <= 5) return `I ${w} every single day.`;
    if (week <= 14) return `She ${w}s at school regularly.`;
    return `We ${w} whenever we can.`;
  }

  if (isNoun) {
    if (week <= 5) return `We use the ${w} at school.`;
    if (week <= 14) return `She put the ${w} in her bag.`;
    return `The ${w} was on the table when we arrived.`;
  }

  if (isAdj) {
    if (week <= 5) return `This looks very ${w} to me.`;
    if (week <= 14) return `My friend seems quite ${w} today.`;
    return `It was a very ${w} experience.`;
  }

  if (isAdv) {
    if (week <= 5) return `I do this ${w} every day.`;
    if (week <= 14) return `She works ${w} at her job.`;
    return `They completed the task ${w} yesterday.`;
  }

  // Fallback
  if (meaning) {
    if (week <= 5) return `I learn the word ${w} at school.`;
    if (week <= 14) return `She used the word ${w} in her story.`;
    return `We practise using ${w} in our writing this week.`;
  }
  if (week <= 5) return `I practise the word ${w} today.`;
  if (week <= 14) return `She wrote the word ${w} in her notebook.`;
  return `We learned the word ${w} in class this week.`;
}

// ── Detect if example is broken ──────────────────────────────────────────────

function isBroken(example) {
  if (!example) return true;
  const ex = example.trim();
  if (ex.length === 0) return true;
  if (/^[a-z*]/.test(ex)) return true;          // mid-sentence start
  if (/\*\*/.test(ex)) return true;             // stray bold markers
  if (ex.length > 50 && !/[.!?]$/.test(ex)) return true; // long no punct
  if (ex.length < 10) return true;             // too short
  return false;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const dryRun = !args.includes('--apply');

console.log(`\n=== fix_dictionary_examples.mjs — ${dryRun ? 'DRY-RUN' : 'APPLY'} ===\n`);

const readContent = collectReadContent();
const allText = readContent.join(' ');
console.log(`Collected ${readContent.length} read.js files`);

const brokenEntries = dict.filter(e => isBroken(e.example));
console.log(`Broken entries: ${brokenEntries.length}\n`);

let fixed = 0;
let fromRead = 0;
let fromLookup = 0;
let fromPattern = 0;
const changes = [];

for (const entry of brokenEntries) {
  let newExample = null;
  let source = '';

  // Try read.js extraction first
  const sentence = extractSentence(allText, entry.word);
  if (sentence) {
    newExample = sentence;
    source = 'read.js';
    fromRead++;
  } else {
    // Use ESL generator
    newExample = generateExample(entry);
    source = 'generated';
    // Check if lookup or pattern
    const exactMatch = Object.keys({
      'about':1,'above':1,'across':1,'after':1,'against':1,'along':1,'among':1,
      'around':1,'before':1,'behind':1,'below':1,'beside':1,'between':1,'by':1,
      'down':1,'during':1,'inside':1,'into':1,'near':1,'over':1,'past':1,
      'through':1,'under':1,'until':1,'without':1,'each other':1,'every day':1,
      'every evening':1,'every morning':1,'for us':1,'have dinner':1,'help me with':1,
      'in detail':1,'in the park':1,'in the living room':1,'in the morning':1,
      'in the box':1,'in the bathroom':1,'in the classroom':1,'in the evening':1,
      'in the house':1,'in the kitchen':1,'in the picture':1,'in the zoo':1,
      'on the table':1,'pick up':1,'play with':1,'put on':1,'sing very well':1,
      'sit at':1,'stand here':1,'stand up':1,'take off':1,'talk about':1,
      'thank you':1,'the best':1,'think about':1,'to school':1,'together':1,
      'very well':1,'wake up':1,'walk to':1,'walk to school':1,'work together':1,
      'a lot':1,'a lot of':1,'fall down':1,'fell down':1,'get up':1,'grow up':1,
      'had lunch':1,'has lunch':1,'have breakfast':1,'have lunch':1,'do homework':1,
      'go to bed':1,'have fun':1,'hide and seek':1,'jump up':1,'like to':1,
      'listen carefully':1,'listen to':1,'look at':1,'look for':1,'look forward':1,
      'look after':1,'make friends':1,'put away':1,'sit on':1,'sit down':1,
      'sleep well':1,'take care':1,'think about':1,'wait for':1,'walk around':1,
      'walk carefully':1,'be careful':1,'be quiet':1,'be proud':1,'be ready':1,
      'be late':1,'be happy':1,'be sad':1,'be kind':1,'be honest':1,'be good':1,
      'be tired':1,'be scared':1,'be excited':1,'be afraid':1,'a little':1,
      'fall asleep':1,'what time':1,'what about':1,'what kind':1,'why don\'t':1,
      'why not':1,'would like':1,'would you':1,'such a':1,'so that':1,'so much':1,
      'how about':1,'how many':1,'how much':1,'how old':1,'how far':1,'how long':1,
      'how come':1,'no longer':1,'not any':1,'not yet':1,'not only':1,
      'not very':1,'either or':1,'neither nor':1,'rather than':1,'had better':1,
      'used to':1,'every afternoon':1,'every time':1,'exploring the city':1,
      'feel creative':1,'feel proud of my work':1,'cheering loudly':1,'count':1,
      'draws pictures':1,'falls asleep':1,'fell asleep':1,'flying her red kite':1,
      'from each other':1,'had solved the case':1,'have questions':1,'holds':1,
      'listens':1,'looks':1,'in my pencil case':1,'in the corridor':1,
      'on Monday':1,'on my bed':1,'look in the box':1,'look like':1,'make sure':1,
      'look outside the window':1,'next to':1,'next to the door':1,'at the zoo':1,
      'calls':1,'were happy':1,'was hurt':1,'were playing':1,'had solved':1,
      'cheering':1,'although':1,'because':1,'however':1,'while':1,'although':1,
      'for school':1,
    }).includes(entry.word.toLowerCase());
    if (exactMatch) fromLookup++; else fromPattern++;
  }

  if (newExample && newExample !== entry.example) {
    changes.push({ word: entry.word, old: entry.example, new: newExample, source });
    if (!dryRun) entry.example = newExample;
    fixed++;
  }
}

console.log(`Fixed: ${fixed} (read.js: ${fromRead}, lookup: ${fromLookup}, pattern: ${fromPattern})\n`);

for (const r of changes.slice(0, 30)) {
  console.log(`─── ${r.word} [${r.source}] ───`);
  console.log(`OLD: ${r.old}`);
  console.log(`NEW: ${r.new}`);
  console.log();
}
if (changes.length > 30) console.log(`... and ${changes.length - 30} more\n`);

if (!dryRun && fixed > 0) {
  fs.writeFileSync(dictPath, JSON.stringify(dict, null, 2), 'utf8');
  console.log(`✅ Written: ${dictPath}`);
  console.log(`Fixed: ${fixed} examples`);
} else if (dryRun) {
  console.log(`⚠️  DRY-RUN — no changes written`);
  console.log(`Run with --apply to write changes`);
}

console.log(`\n=== Done ===\n`);
