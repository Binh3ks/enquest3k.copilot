/**
 * generateStubVocab.js — Theme-aware fallback vocab when week data not yet available.
 *
 * Used by extractQuestVocab when a week folder doesn't exist yet (W38–W156 stubs,
 * or W1–W32 before full content is produced).
 *
 * Returns content relevant to the chapter's theme so mini-games feel thematic
 * rather than always showing W33 "corridor/friction" vocab.
 */

import { getChapterForWeek } from '../../stores/useChroniclesStore';

// ─── Theme Vocab Banks ───────────────────────────────────────────────────────

const THEME_VOCAB = {
  library: [
    { word: 'chapter',    definition: 'a section of a book',                    type: 'vocab' },
    { word: 'author',     definition: 'the person who writes a book',           type: 'vocab' },
    { word: 'paragraph',  definition: 'a group of sentences about one idea',    type: 'vocab' },
    { word: 'summarize',  definition: 'to give a short description of the main points', type: 'vocab' },
    { word: 'vocabulary', definition: 'the words used in a language',           type: 'vocab' },
    { word: 'library',    definition: 'a place where books are kept',           type: 'vocab' },
    { word: 'recall',     definition: 'to remember something',                  type: 'vocab' },
    { word: 'title',      definition: 'the name of a book or story',            type: 'vocab' },
    { word: 'character',  definition: 'a person in a story',                    type: 'vocab' },
    { word: 'fiction',    definition: 'stories that are not real',              type: 'vocab' },
    { word: 'spine',      definition: 'the back of a book',                     type: 'vocab' },
    { word: 'index',      definition: 'a list of topics at the end of a book',  type: 'vocab' },
  ],
  ocean: [
    { word: 'current',    definition: 'the flow of water in the sea',           type: 'vocab' },
    { word: 'submarine',  definition: 'a vehicle that travels under water',     type: 'vocab' },
    { word: 'pressure',   definition: 'a pushing force on something',           type: 'vocab' },
    { word: 'navigate',   definition: 'to plan and follow a route',             type: 'vocab' },
    { word: 'marine',     definition: 'relating to the sea',                    type: 'vocab' },
    { word: 'coral',      definition: 'a rock-like substance found in the sea', type: 'vocab' },
    { word: 'buoyant',    definition: 'able to float',                          type: 'vocab' },
    { word: 'tide',       definition: 'the regular rise and fall of the sea',   type: 'vocab' },
    { word: 'depth',      definition: 'the distance from top to bottom',        type: 'vocab' },
    { word: 'species',    definition: 'a group of living things of the same kind', type: 'vocab' },
    { word: 'sonar',      definition: 'a system using sound waves to find objects', type: 'vocab' },
    { word: 'plankton',   definition: 'tiny plants and animals in the sea',     type: 'vocab' },
  ],
  storm: [
    { word: 'friction',   definition: 'the force that slows things sliding',    type: 'vocab' },
    { word: 'corridor',   definition: 'a long passage in a building',           type: 'vocab' },
    { word: 'slippery',   definition: 'difficult to walk on without falling',   type: 'vocab' },
    { word: 'balanced',   definition: 'steady and not likely to fall',          type: 'vocab' },
    { word: 'careful',    definition: 'giving close attention to avoid mistakes', type: 'vocab' },
    { word: 'bandage',    definition: 'a strip of cloth used to cover a wound', type: 'vocab' },
    { word: 'warning',    definition: 'a sign that danger is coming',           type: 'vocab' },
    { word: 'rubber',     definition: 'a strong material that can stretch',     type: 'vocab' },
    { word: 'traction',   definition: 'the grip between a shoe and the floor',  type: 'vocab' },
    { word: 'spill',      definition: 'when liquid falls accidentally',         type: 'vocab' },
    { word: 'safety',     definition: 'the state of being protected from danger', type: 'vocab' },
    { word: 'crystal',    definition: 'a clear, hard mineral with flat surfaces', type: 'vocab' },
  ],
  forest: [
    { word: 'photosynthesis', definition: 'how plants make food from sunlight', type: 'vocab' },
    { word: 'ecosystem',  definition: 'all living things in an area and their environment', type: 'vocab' },
    { word: 'habitat',    definition: 'the natural home of an animal or plant', type: 'vocab' },
    { word: 'oxygen',     definition: 'the gas in the air we breathe',          type: 'vocab' },
    { word: 'roots',      definition: 'the part of a plant that grows underground', type: 'vocab' },
    { word: 'canopy',     definition: 'the top layer of tree branches in a forest', type: 'vocab' },
    { word: 'nutrients',  definition: 'substances that help plants and animals grow', type: 'vocab' },
    { word: 'deciduous',  definition: 'trees that lose their leaves in autumn', type: 'vocab' },
    { word: 'predator',   definition: 'an animal that hunts other animals',     type: 'vocab' },
    { word: 'symbiosis',  definition: 'when two living things help each other', type: 'vocab' },
    { word: 'chlorophyll',definition: 'the green substance in leaves',          type: 'vocab' },
    { word: 'biodiversity', definition: 'the variety of life in an area',      type: 'vocab' },
  ],
  forge: [
    { word: 'clause',     definition: 'a group of words with a subject and verb', type: 'vocab' },
    { word: 'grammar',    definition: 'the rules of a language',                type: 'vocab' },
    { word: 'predicate',  definition: 'the part of a sentence that says what the subject does', type: 'vocab' },
    { word: 'conjunction',definition: 'a word that joins two parts of a sentence', type: 'vocab' },
    { word: 'syntax',     definition: 'the arrangement of words in a sentence', type: 'vocab' },
    { word: 'prefix',     definition: 'letters added at the start of a word',   type: 'vocab' },
    { word: 'suffix',     definition: 'letters added at the end of a word',     type: 'vocab' },
    { word: 'tense',      definition: 'the form of a verb that shows time',     type: 'vocab' },
    { word: 'passive',    definition: 'when the subject receives the action',   type: 'vocab' },
    { word: 'phrase',     definition: 'a small group of words',                 type: 'vocab' },
    { word: 'collocation',definition: 'words that naturally go together',       type: 'vocab' },
    { word: 'auxiliary',  definition: 'a helping verb like "have" or "be"',     type: 'vocab' },
  ],
  space: [
    { word: 'atmosphere', definition: 'the layers of air around Earth',         type: 'vocab' },
    { word: 'gravity',    definition: 'the force that pulls objects down',      type: 'vocab' },
    { word: 'orbit',      definition: 'the path a planet takes around a star',  type: 'vocab' },
    { word: 'telescope',  definition: 'a tool used to see distant objects',     type: 'vocab' },
    { word: 'constellation', definition: 'a group of stars forming a pattern', type: 'vocab' },
    { word: 'satellite',  definition: 'an object orbiting a larger body',       type: 'vocab' },
    { word: 'galaxy',     definition: 'a system of millions of stars',          type: 'vocab' },
    { word: 'asteroid',   definition: 'a rocky object orbiting the sun',        type: 'vocab' },
    { word: 'eclipse',    definition: 'when one space body blocks another',     type: 'vocab' },
    { word: 'nebula',     definition: 'a cloud of gas and dust in space',       type: 'vocab' },
    { word: 'solar',      definition: 'relating to the sun',                    type: 'vocab' },
    { word: 'comet',      definition: 'an icy object with a bright tail',       type: 'vocab' },
  ],
  throne: [
    { word: 'fluency',    definition: 'the ability to speak smoothly and naturally', type: 'vocab' },
    { word: 'eloquent',   definition: 'speaking very clearly and effectively',  type: 'vocab' },
    { word: 'persuade',   definition: 'to convince someone to do or believe something', type: 'vocab' },
    { word: 'articulate', definition: 'able to express ideas clearly',          type: 'vocab' },
    { word: 'coherent',   definition: 'logical and easy to understand',         type: 'vocab' },
    { word: 'rhetoric',   definition: 'the art of speaking or writing effectively', type: 'vocab' },
    { word: 'debate',     definition: 'a formal discussion on a topic',         type: 'vocab' },
    { word: 'nuance',     definition: 'a small difference in meaning or feeling', type: 'vocab' },
    { word: 'critique',   definition: 'a detailed analysis and judgment',       type: 'vocab' },
    { word: 'thesis',     definition: 'the main argument or idea',              type: 'vocab' },
    { word: 'infer',      definition: 'to work out meaning from evidence',      type: 'vocab' },
    { word: 'paraphrase', definition: 'to express something in different words', type: 'vocab' },
  ],
};

// ─── Lite Mode (W1–W16 Pre-A1) — simpler, phonics-forward vocab ────────────

const LITE_VOCAB = [
  { word: 'cat',    definition: 'a small furry pet animal',     type: 'phonics' },
  { word: 'hat',    definition: 'something you wear on your head', type: 'phonics' },
  { word: 'dog',    definition: 'a friendly pet animal',        type: 'phonics' },
  { word: 'bag',    definition: 'something you carry things in', type: 'phonics' },
  { word: 'sun',    definition: 'the bright star in the sky',   type: 'phonics' },
  { word: 'run',    definition: 'to move your legs fast',       type: 'phonics' },
  { word: 'book',   definition: 'pages with words and pictures',type: 'vocab'   },
  { word: 'tree',   definition: 'a tall plant with a trunk',    type: 'vocab'   },
  { word: 'happy',  definition: 'feeling good and glad',        type: 'vocab'   },
  { word: 'school', definition: 'a place where you learn',      type: 'vocab'   },
  { word: 'friend', definition: 'someone you like to be with',  type: 'vocab'   },
  { word: 'family', definition: 'parents, brothers, and sisters', type: 'vocab' },
];

// ─── Grammar sentences per theme ─────────────────────────────────────────────

const THEME_GRAMMAR = {
  library: [
    { sentence: 'The librarian organized the books on the shelf.', hint: 'Past Simple' },
    { sentence: 'She has been reading the same chapter for an hour.', hint: 'Present Perfect Continuous' },
    { sentence: 'The author who wrote this book is very famous.', hint: 'Relative Clause' },
  ],
  ocean: [
    { sentence: 'The submarine dived deep beneath the ocean surface.', hint: 'Past Simple' },
    { sentence: 'Fish are being studied by marine biologists every day.', hint: 'Passive Voice' },
    { sentence: 'The current was so strong that the boat could not move.', hint: 'So...that' },
  ],
  storm: [
    { sentence: 'Water reduces friction on wet tiles.', hint: 'Present Simple — Cause & Effect' },
    { sentence: 'Tom was running when he slipped on the floor.', hint: 'Past Continuous vs Simple' },
    { sentence: 'Jake walked carefully down the corridor.', hint: 'Past Simple + Adverb' },
  ],
  forest: [
    { sentence: 'Plants absorb sunlight through their green leaves.', hint: 'Present Simple + Preposition' },
    { sentence: 'The forest ecosystem has been damaged by pollution.', hint: 'Present Perfect Passive' },
    { sentence: 'If we cut down more trees, animals will lose their habitat.', hint: 'Conditional Type 1' },
  ],
  forge: [
    { sentence: 'Grammar rules help us communicate clearly and correctly.', hint: 'Simple sentence with adverbs' },
    { sentence: 'The sentence was rewritten by the student very carefully.', hint: 'Passive Voice' },
    { sentence: 'Although the prefix changes the meaning, the root stays the same.', hint: 'Contrast Clause' },
  ],
  space: [
    { sentence: 'The Earth orbits the Sun once every 365 days.', hint: 'Present Simple — Scientific fact' },
    { sentence: 'The telescope was invented to observe distant planets.', hint: 'Passive Voice' },
    { sentence: 'Astronauts have been living on the space station for months.', hint: 'Present Perfect Continuous' },
  ],
  throne: [
    { sentence: 'A fluent speaker chooses words carefully and speaks with confidence.', hint: 'Present Simple' },
    { sentence: 'The debate was won by the team with the most coherent argument.', hint: 'Passive Voice' },
    { sentence: 'If you practise every day, you will become more articulate.', hint: 'Conditional Type 1' },
  ],
};

// ─── Public API ────────────────────────────────────────────────────────────────

/**
 * Generate theme-aware stub vocab for weeks that don't have full hub data yet.
 *
 * @param {number} weekId     - Week number (1–156)
 * @param {number} zoneIndex  - 0-based zone (0=Day1 … 4=Day5)
 * @param {number} count      - max items to return (default 12)
 * @returns {{ vocabItems: Array, grammarSentences: Array }}
 */
export function generateStubVocab(weekId, zoneIndex, count = 12) {
  const isLite = weekId <= 16;

  if (isLite) {
    const vocabItems = LITE_VOCAB.slice(0, count);
    const grammarSentences = [
      { sentence: 'The cat sat on the mat.', hint: 'Simple sentence' },
      { sentence: 'I like to run in the park.', hint: 'Present Simple' },
      { sentence: 'She has a red bag.', hint: 'Has + noun phrase' },
    ];
    return { vocabItems, grammarSentences };
  }

  const chapter = getChapterForWeek(weekId);
  const theme   = chapter?.theme || 'storm';

  const allVocab    = THEME_VOCAB[theme] || THEME_VOCAB.storm;
  const allGrammar  = THEME_GRAMMAR[theme] || THEME_GRAMMAR.storm;

  // Rotate selection by zone so each zone gets a different subset
  const offset    = (zoneIndex * 3) % allVocab.length;
  const vocabItems = [
    ...allVocab.slice(offset),
    ...allVocab.slice(0, offset),
  ].slice(0, count);

  const grammarSentences = allGrammar;

  return { vocabItems, grammarSentences };
}
