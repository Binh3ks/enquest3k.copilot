/**
 * extractQuestVocab.js — Dynamic Curriculum Binding Utility
 *
 * Extracts vocabulary and grammar content from Hub data files
 * for each zone/day, to feed mini-games in Daily Rooms.
 *
 * Content source priority:
 *   Zone 1 (Day 1): reading_hub → story_scenes vocab + clil vocab_focus
 *   Zone 2 (Day 2): reading_hub.clil_article + listening_hub.action_lab
 *   Zone 3 (Day 3): listening_hub.word_blitz + grammar sentences
 *   Zone 4 (Day 4): writing_hub + speaking_hub key phrases
 *   Zone 5 (Day 5): ALL hubs — full week integration
 *
 *   Lite Mode (weekId 1–16): Uses simplified phonics-forward vocab.
 *   Stub Mode (no hub data): Falls back to generateStubVocab theme banks.
 */

import { generateStubVocab, generateStubCatapultPairs } from './generateStubVocab';
import { sanitizeChunkText } from '../../utils/textSanitize';
import { CURRICULUM_DEFINITIONS } from '../quest/MCQBlitzPopup';

/**
 * Build a flat list of {word, definition?, type} items from a string array or object array.
 */
function normalizeItems(raw = [], type = 'vocab') {
  return raw
    .filter(Boolean)
    .map((item) => {
      let word = '';
      let def = '';

      if (typeof item === 'string') {
        word = sanitizeChunkText(item);
      } else if (item.word || item.term || item.text) {
        word = sanitizeChunkText(item.word || item.term || item.text);
        def = item.definition_en || item.definition || item.meaning || item.vi || '';
      } else if (item.phrase || item.chunk) {
        word = sanitizeChunkText(item.phrase || item.chunk);
        def = item.definition_en || item.meaning || '';
      }

      if (!word) return null;
      const lower = word.trim().toLowerCase();
      // If definition is missing or in Vietnamese, fallback to CURRICULUM_DEFINITIONS
      if (!def || /[\u00C0-\u1EF9]/.test(def)) {
        def = CURRICULUM_DEFINITIONS?.[lower] || (item.definition_en || item.definition || item.meaning || '');
      }

      return { word, definition: def, type };
    })
    .filter(Boolean);
}

/**
 * Extract vocab items from reading_hub for Zone 1 (Day 1).
 * Sources: scene words + karaoke key words + story vocab
 */
function extractZone1Vocab(readingHub) {
  const items = [];

  // Story scene vocabulary
  if (readingHub?.story_scenes) {
    const scenes = Array.isArray(readingHub.story_scenes)
      ? readingHub.story_scenes
      : Object.values(readingHub.story_scenes);
    for (const scene of scenes) {
      if (scene?.vocab) items.push(...normalizeItems(scene.vocab, 'vocab'));
      if (scene?.keywords) items.push(...normalizeItems(scene.keywords, 'vocab'));
    }
  }

  // Shadowing/karaoke focus words
  if (readingHub?.read_explore?.shadowing_lines) {
    const lines = readingHub.read_explore.shadowing_lines.slice(0, 3);
    for (const line of lines) {
      if (line?.focus_words) items.push(...normalizeItems(line.focus_words, 'vocab'));
    }
  }

  // Fallback: CLIL vocab_focus (first 6 items)
  if (items.length < 5 && readingHub?.clil_article?.vocab_focus) {
    items.push(...normalizeItems(readingHub.clil_article.vocab_focus.slice(0, 6), 'vocab'));
  }

  return dedup(items).slice(0, 12);
}

/**
 * Extract vocab + grammar items for Zone 2 (Day 2: Knowledge Lab).
 * Sources: clil_article vocab_focus + action_lab keywords
 */
function extractZone2Vocab(readingHub, listeningHub) {
  const items = [];

  // CLIL vocab focus
  if (readingHub?.clil_article?.vocab_focus) {
    items.push(...normalizeItems(readingHub.clil_article.vocab_focus, 'vocab'));
  }

  // Action Lab keywords
  const actionLab = listeningHub?.action_lab || listeningHub?.science_lab;
  if (actionLab?.keywords) items.push(...normalizeItems(actionLab.keywords, 'vocab'));
  if (actionLab?.stages) {
    for (const stage of actionLab.stages) {
      if (stage?.vocab) items.push(...normalizeItems(stage.vocab, 'vocab'));
      if (stage?.key_terms) items.push(...normalizeItems(stage.key_terms, 'vocab'));
    }
  }

  return dedup(items).slice(0, 12);
}

/**
 * Extract vocab for Zone 3 (Day 3: Battle Arena).
 * Sources: word_blitz word list + grammar_duel sentences
 */
function extractZone3Vocab(listeningHub) {
  const items = [];

  // Speed Match words
  const wordBlitz = listeningHub?.word_blitz || listeningHub?.speed_match;
  if (wordBlitz?.words) items.push(...normalizeItems(wordBlitz.words, 'vocab'));
  if (wordBlitz?.items) items.push(...normalizeItems(wordBlitz.items, 'vocab'));

  // Grammar Duel vocab extraction (pull content words from sentences)
  const grammarDuel = listeningHub?.sentence_smash || listeningHub?.grammar_duel;
  if (grammarDuel?.sentences) {
    grammarDuel.sentences.slice(0, 4).forEach((s) => {
      const sentence = typeof s === 'string' ? s : (s.sentence || s.text || '');
      const words = sentence.split(/\s+/).filter((w) => w.length > 4);
      items.push(...words.map((w) => ({ word: w.replace(/[^a-zA-Z]/g, ''), type: 'vocab' })));
    });
  }

  return dedup(items).slice(0, 12);
}

/**
 * Extract vocab for Zone 4 (Day 4: Creator Studio).
 * Sources: writing_hub prompts + speaking_hub info_exchange cards
 */
function extractZone4Vocab(writingHub, speakingHub) {
  const items = [];

  if (writingHub?.vocab_prompts) items.push(...normalizeItems(writingHub.vocab_prompts, 'vocab'));
  if (writingHub?.word_bank) items.push(...normalizeItems(writingHub.word_bank, 'vocab'));

  const infoExchange = speakingHub?.info_exchange || speakingHub?.info_exchange_cards;
  if (infoExchange?.key_phrases) items.push(...normalizeItems(infoExchange.key_phrases, 'phrase'));
  if (infoExchange?.vocab) items.push(...normalizeItems(infoExchange.vocab, 'vocab'));

  return dedup(items).slice(0, 12);
}

/**
 * Extract ALL vocab for Zone 5 (Day 5: Boss Castle — full week).
 * Combines highlights from all zones.
 */
function extractZone5Vocab(readingHub, listeningHub, writingHub, speakingHub) {
  const z1 = extractZone1Vocab(readingHub).slice(0, 3);
  const z2 = extractZone2Vocab(readingHub, listeningHub).slice(0, 3);
  const z3 = extractZone3Vocab(listeningHub).slice(0, 3);
  const z4 = extractZone4Vocab(writingHub, speakingHub).slice(0, 3);
  return dedup([...z1, ...z2, ...z3, ...z4]).slice(0, 15);
}

/**
 * Extract grammar patterns from hub data as sentence arrays for Sentence Train game.
 */
function extractGrammarSentences(readingHub, listeningHub, zoneIndex) {
  const sentences = [];

  // CLIL article sentence drills (Zone 2)
  if (zoneIndex === 1 && readingHub?.clil_article?.sentence_drills) {
    const drills = readingHub.clil_article.sentence_drills.slice(0, 5);
    sentences.push(
      ...drills.map((d) => ({
        sentence: typeof d === 'string' ? d : (d.sentence || d.text || d.example || ''),
        hint: d.translation || d.vi || '',
      }))
    );
  }

  // Retell sentences (Zone 1)
  if (zoneIndex === 0 && readingHub?.read_explore?.retell_items) {
    const items = readingHub.read_explore.retell_items.slice(0, 5);
    sentences.push(...items.map((r) => ({ sentence: r.sentence || r.text || r, hint: r.hint || '' })));
  }

  // Grammar Duel sentences (Zone 3)
  const gDuel = listeningHub?.sentence_smash || listeningHub?.grammar_duel;
  if (zoneIndex === 2 && gDuel?.sentences) {
    sentences.push(
      ...gDuel.sentences.slice(0, 5).map((s) => ({
        sentence: typeof s === 'string' ? s : (s.sentence || s.text || ''),
        hint: s.translation || s.vi || '',
      }))
    );
  }

  // Fallback: pull from clil grammar_patterns
  if (sentences.length < 3 && readingHub?.clil_article?.grammar_patterns) {
    // Build example sentences from pattern context
    sentences.push({ sentence: 'Water reduces friction on wet tiles.', hint: 'Cause & Effect' });
    sentences.push({ sentence: 'Tom was running when he slipped on the floor.', hint: 'Past Continuous vs Past Simple' });
    sentences.push({ sentence: 'Jake walked carefully down the corridor.', hint: 'Past Simple + Adverb' });
  }

  return sentences.filter((s) => s.sentence.length > 5).slice(0, 5);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Main extractor — returns { vocabItems, grammarSentences, audioClips }
 * for a given zone/day.
 *
 * @param {object} weekData  - { reading_hub, listening_hub, writing_hub, speaking_hub }
 * @param {number} zoneIndex - 0-based (0=Day1 … 4=Day5)
 * @param {number} [weekId]  - Week number (1–156). Used for lite mode detection.
 * @returns {{ vocabItems: Array, grammarSentences: Array, audioClips: Array }}
 */
export function extractQuestVocab(weekData, zoneIndex, weekId) {
  const wk = parseInt(weekId) || 33;

  // ── Lite Mode (W1–W16: Pre-A1 Starters, 10-quest weeks) ─────────────────
  // Simplified phonics-forward vocab, max 8 items, no CLIL complexity.
  if (wk <= 16) {
    const { vocabItems: liteVocab, grammarSentences: liteGrammar } = generateStubVocab(wk, zoneIndex, 8);
    return { vocabItems: liteVocab, grammarSentences: liteGrammar, audioClips: [] };
  }

  const {
    reading_hub: r = {},
    listening_hub: l = {},
    writing_hub: w = {},
    speaking_hub: s = {},
  } = weekData || {};

  let vocabItems = [];
  switch (zoneIndex) {
    case 0: vocabItems = extractZone1Vocab(r); break;
    case 1: vocabItems = extractZone2Vocab(r, l); break;
    case 2: vocabItems = extractZone3Vocab(l); break;
    case 3: vocabItems = extractZone4Vocab(w, s); break;
    case 4: vocabItems = extractZone5Vocab(r, l, w, s); break;
    default: vocabItems = extractZone1Vocab(r);
  }

  const grammarSentences = extractGrammarSentences(r, l, zoneIndex);

  // Audio clips: reuse listening hub clips if available
  const audioClips = [];
  if (l?.listening_p2?.questions) {
    audioClips.push(
      ...l.listening_p2.questions.slice(0, 3).map((q) => ({
        audio: q.audio_url || '',
        options: q.options || [],
        answer: q.answer || q.correct || 0,
      }))
    );
  }

  // ── Stub fallback: use theme-aware vocab when hub data is missing ─────────
  // Avoids forever showing W33 "corridor/slippery" for future weeks.
  if (vocabItems.length < 4) {
    const { vocabItems: stubVocab, grammarSentences: stubGrammar } = generateStubVocab(wk, zoneIndex, 8);
    vocabItems = dedup([...vocabItems, ...stubVocab]).slice(0, 8);
    // Only use stub grammar if we have nothing
    if (grammarSentences.length < 2) {
      return { vocabItems, grammarSentences: stubGrammar, audioClips };
    }
  }

  return { vocabItems, grammarSentences, audioClips };
}

/** Deduplicate by word (case-insensitive) */
function dedup(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item?.word) return false;
    const key = item.word.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Curated Story Retell Chunks & Collocations for validated weeks (W33–W37).
 * Conforms to Cambridge Young Learners & Linear Thinking ESL standards.
 */
export const WEEKLY_CATAPULT_PAIRS = {
  33: [
    { starter: 'Jake was walking carefully down', completion: 'the school corridor' },
    { starter: 'Suddenly, he lost his balance on', completion: 'the wet floor' },
    { starter: 'Jake stopped immediately and called', completion: 'the school nurse' },
    { starter: 'The nurse arrived quickly with', completion: 'a clean bandage' },
    { starter: 'The headmaster reminded all students', completion: 'never to run in corridors' },
    { starter: 'Rubber shoe soles provide', completion: 'a strong grip' },
  ],
  34: [
    { starter: 'One warm afternoon, a huge lion was sleeping under', completion: 'a shady tree' },
    { starter: 'While he was sleeping, a tiny mouse ran across', completion: 'his front paw' },
    { starter: 'The tiny mouse promised to', completion: 'help him one day' },
    { starter: 'Two hunters trapped the lion in', completion: 'a heavy net' },
    { starter: 'The mouse chewed through', completion: 'the thick ropes' },
    { starter: 'The tiny mouse and mighty lion became', completion: 'best friends' },
  ],
  35: [
    { starter: 'The family packed backpacks and drove to', completion: 'Pine Valley Mountain' },
    { starter: 'While parents set up the tent, the children collected', completion: 'dry pine branches' },
    { starter: 'In the afternoon, they went hiking along', completion: 'a crystal clear stream' },
    { starter: 'While walking in the forest, they spotted', completion: 'two playful squirrels' },
    { starter: 'They sat around the warm campfire and roasted', completion: 'sweet marshmallows' },
    { starter: 'Looking up at the night sky, they saw', completion: 'bright constellations' },
  ],
  36: [
    { starter: 'Young authors write and illustrate', completion: 'their own trip stories' },
    { starter: 'Last month, Leo wrote an adventure book about', completion: 'a trip to the beach' },
    { starter: 'He packed his backpack with', completion: 'a camera and notebook' },
    { starter: 'When they arrived at the coast, they saw', completion: 'colourful seashells' },
    { starter: 'Leo took beautiful photos of', completion: 'the ocean waves' },
    { starter: 'He bound the pages together with', completion: 'a shiny ribbon' },
  ],
  37: [
    { starter: 'A puppy is a living thing because it breathes', completion: 'fresh air every day' },
    { starter: 'A green tree needs water and sunlight to', completion: 'grow bigger and survive' },
    { starter: 'A grey rock is non-living because it does not', completion: 'breathe, grow, or eat' },
    { starter: 'A plastic toy car is non-living because it cannot', completion: 'move by itself' },
    { starter: 'Living things absorb nutrients to carry out', completion: 'vital life processes' },
    { starter: 'Young scientists use clues in nature to classify', completion: 'living and non-living things' },
  ],
};

/**
 * Dynamically extract { starter, completion } pairs from retell_questions containing chips.
 */
function extractFromRetellQuestions(retellQuestions) {
  const pairs = [];
  for (const rq of retellQuestions) {
    const s = rq.sentence || '';
    const chips = rq.chips || [];
    let matchedChip = null;
    let matchIdx = -1;

    for (const chip of chips) {
      const idx = s.toLowerCase().indexOf(chip.toLowerCase());
      if (idx > 6) {
        if (!matchedChip || (chip.includes(' ') && !matchedChip.includes(' ')) || idx > matchIdx) {
          matchedChip = chip;
          matchIdx = idx;
        }
      }
    }

    if (matchedChip && matchIdx > 0) {
      let starter = s.substring(0, matchIdx).trim();
      let completion = s.substring(matchIdx, matchIdx + matchedChip.length).trim();
      const artMatch = starter.match(/^(.*)\s+(the|a|an)$/i);
      if (artMatch) {
        starter = artMatch[1];
        completion = `${artMatch[2].toLowerCase()} ${completion}`;
      }
      starter = starter.replace(/[,;:]$/, '').trim();
      completion = completion.replace(/[,;.!?]$/, '').trim();
      pairs.push({
        starter: sanitizeChunkText(starter),
        completion: sanitizeChunkText(completion),
      });
    }
  }
  return pairs;
}

/**
 * Extract paired chunks for Chunk Catapult game (starter chunk ↔ completion chunk).
 * Priority:
 * 1. Curated week-specific chunks from Story Retell / CLIL (W33–W37)
 * 2. Dynamic extraction from read.retell_questions chips
 * 3. Fallback to week-scoped word ↔ definition pairs (to be replaced in Part 2)
 *
 * @param {object} weekData
 * @param {number} zoneIndex
 * @param {number} [weekId]
 * @returns {Array<{ starter: string, completion: string }>}
 */
export function extractCatapultPairs(weekData, zoneIndex, weekId) {
  const wk = parseInt(weekId) || 33;

  // 1. Curated Story Retell & Collocation pairs for validated weeks
  if (WEEKLY_CATAPULT_PAIRS[wk]) {
    return WEEKLY_CATAPULT_PAIRS[wk].map((p) => ({
      starter: sanitizeChunkText(p.starter),
      completion: sanitizeChunkText(p.completion),
    }));
  }

  // 2. Dynamic extraction from weekData retell_questions if available
  const read = weekData?.reading_hub?.read_explore 
    || weekData?.stations?.read_explore 
    || weekData?.read_explore 
    || weekData?.readingHub?.read_explore;

  if (Array.isArray(read?.retell_questions) && read.retell_questions.length > 0) {
    const dynamicPairs = extractFromRetellQuestions(read.retell_questions);
    if (dynamicPairs.length >= 4) {
      return dynamicPairs.slice(0, 6);
    }
  }

  // 3. Theme-aware Chunk Catapult pairs (Pre-A1 Lite Mode + 7 Chapters)
  return generateStubCatapultPairs(wk, 6).map((p) => ({
    starter: sanitizeChunkText(p.starter),
    completion: sanitizeChunkText(p.completion),
  }));
}


// ─── Content Service — getContentPool() ──────────────────────────────────────

/**
 * Convert a raw {word, definition} or {starter, completion} object to a ContentItem.
 * ContentItem.id is a deterministic hash for anti-repetition tracking.
 *
 * @param {'vocab'|'chunk_pair'|'grammar_cloze'|'syntax_order'} type
 * @param {number} weekId
 * @param {string} prompt   — word or sentence starter
 * @param {string} answer   — definition or sentence completion
 * @param {string[]} distractors
 * @param {'week_real'|'curated'|'chapter_pool'} source
 * @returns {ContentItem}
 */
function toContentItem(type, weekId, prompt, answer, distractors = [], source = 'week_real') {
  // Simple deterministic id: avoids crypto dependency
  const raw = `${weekId}|${type}|${prompt}|${answer}`;
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (Math.imul(31, h) + raw.charCodeAt(i)) | 0;
  }
  const id = `ci_${(h >>> 0).toString(36)}`;

  const wk = parseInt(weekId) || 33;
  // Difficulty by week range: 1=Pre-A1, 2=Movers A1, 3=Flyers A2
  const difficulty = wk <= 16 ? 1 : wk <= 72 ? 2 : 3;

  return { id, type, prompt, answer, distractors, weekId: wk, source, difficulty };
}

/**
 * Extract vocab items from weekData as ContentItem[] for vocab-type games.
 */
function extractVocabAsItems(weekData, weekId, zoneIndex) {
  const wk = parseInt(weekId) || 33;

  if (wk <= 16) {
    const { vocabItems } = generateStubVocab(wk, zoneIndex, 8);
    return vocabItems.map((v) =>
      toContentItem('vocab', wk, v.word, v.definition || '', [], 'chapter_pool')
    );
  }

  const { reading_hub: r = {}, listening_hub: l = {}, writing_hub: w = {}, speaking_hub: s = {} } = weekData || {};

  let vocabItems = [];
  switch (zoneIndex) {
    case 0: vocabItems = extractZone1Vocab(r); break;
    case 1: vocabItems = extractZone2Vocab(r, l); break;
    case 2: vocabItems = extractZone3Vocab(l); break;
    case 3: vocabItems = extractZone4Vocab(w, s); break;
    case 4: vocabItems = extractZone5Vocab(r, l, w, s); break;
    default: vocabItems = extractZone1Vocab(r);
  }

  const source = vocabItems.length >= 4 ? 'week_real' : 'chapter_pool';

  if (vocabItems.length < 4) {
    const { vocabItems: stub } = generateStubVocab(wk, zoneIndex, 8);
    vocabItems = dedup([...vocabItems, ...stub]).slice(0, 8);
  }

  // Build distractors: other words from same pool
  const allWords = vocabItems.map((v) => v.word);
  return vocabItems.map((v) => {
    const distractors = allWords
      .filter((w2) => w2.toLowerCase() !== v.word.toLowerCase())
      .slice(0, 3);
    return toContentItem('vocab', wk, v.word, v.definition || '', distractors, source);
  });
}

/**
 * Extract grammar sentences from weekData as ContentItem[] for cloze-type games.
 */
function extractGrammarAsItems(weekData, weekId, zoneIndex) {
  const wk = parseInt(weekId) || 33;
  const { reading_hub: r = {}, listening_hub: l = {} } = weekData || {};
  const sentences = extractGrammarSentences(r, l, zoneIndex);

  const source = sentences.length >= 2 ? 'week_real' : 'chapter_pool';

  const final = sentences.length >= 2 ? sentences : (() => {
    const { grammarSentences: stub } = generateStubVocab(wk, zoneIndex, 8);
    return stub;
  })();

  return final.slice(0, 8).map((s) => {
    const sentence = typeof s === 'string' ? s : (s.sentence || s.fullSentence || '');
    // For cloze: prompt = sentence with blank placeholder, answer = full sentence
    return toContentItem('grammar_cloze', wk, sentence, sentence, [], source);
  });
}

/**
 * Extract syntax ordering items from retell_questions for SyntaxExpress game.
 * Each item: prompt = shuffled words array (as JSON string), answer = correct sentence.
 */
function extractSyntaxItems(weekData, weekId) {
  const wk = parseInt(weekId) || 33;

  // Try real retell_questions first (have full sentence + chips)
  const read = weekData?.reading_hub?.read_explore
    || weekData?.read_explore
    || weekData?.readingHub?.read_explore;

  const retellQs = read?.retell_questions;

  if (Array.isArray(retellQs) && retellQs.length > 0) {
    const items = retellQs.slice(0, 6).map((rq) => {
      const sentence = rq.sentence || '';
      const chips = rq.chips || [];
      // Use chips as the syntax units to order; distractors = other chips from pool
      const allChips = retellQs.flatMap((q) => q.chips || []);
      const distractors = allChips.filter((c) => !chips.includes(c)).slice(0, 2);
      return toContentItem('syntax_order', wk, sentence, sentence, distractors, 'week_real');
    });
    if (items.length >= 3) return items;
  }

  // Fallback: grammar sentences → treat as syntax ordering
  const { grammarSentences } = generateStubVocab(wk, 0, 6);
  return grammarSentences.slice(0, 4).map((s) => {
    const sentence = typeof s === 'string' ? s : (s.sentence || s.fullSentence || '');
    return toContentItem('syntax_order', wk, sentence, sentence, [], 'chapter_pool');
  });
}

/**
 * Route content extraction by game type.
 * @private
 */
function extractByGameType(weekData, weekId, gameType, zoneIndex = 0) {
  switch (gameType) {
    case 'chunk_catapult': {
      const pairs = extractCatapultPairs(weekData, zoneIndex, weekId);
      const src = WEEKLY_CATAPULT_PAIRS[parseInt(weekId)] ? 'curated'
                : (pairs.length > 0 ? 'week_real' : 'chapter_pool');
      return pairs.map((p) =>
        toContentItem('chunk_pair', weekId, p.starter, p.completion, [], src)
      );
    }

    case 'syntax_express':
    case 'spell_train':
    case 'spell_train_express':
      return extractSyntaxItems(weekData, weekId);

    case 'rune_forge':
    case 'titan_forge':
    case 'ancient_scroll':
    case 'cambridge_cloze':
      return extractGrammarAsItems(weekData, weekId, zoneIndex);

    // All vocab-type games share the same pool
    case 'highway_runner':
    case 'meteor_smasher':
    case 'arcane_bubble':
    case 'lexical_detective':
    case 'crystal_match':
    case 'grand_matrix':
    case 'phonics_bubble':
    case 'lexical_riddle':
    default:
      return extractVocabAsItems(weekData, weekId, zoneIndex);
  }
}

/** Fisher-Yates shuffle (in-place, returns array) */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * getContentPool — Single entry point for all mini-game content.
 *
 * Replaces direct calls to extractQuestVocab() / extractCatapultPairs() in DailyRoomScreen.
 * Implements session-level anti-repetition: fresh items are served first.
 *
 * @param {object} weekData   - { reading_hub, listening_hub, writing_hub, speaking_hub }
 * @param {number} weekId     - Week number (1–156)
 * @param {object} options
 * @param {'chest'|'boss_day'|'boss_week'|'mock_test'} [options.context='chest']
 * @param {string}  [options.gameType='arcane_bubble']
 * @param {number}  [options.zoneIndex=0]
 * @param {number}  [options.count]        - Override default count for context
 * @param {Set}     [options.usedIds]      - Item IDs already shown this session
 * @returns {ContentItem[]}
 */
export function getContentPool(weekData, weekId, {
  context = 'chest',
  gameType = 'arcane_bubble',
  zoneIndex = 0,
  count,
  usedIds = new Set(),
} = {}) {
  // Default count by context (Bước 2 §2 — Mock Test = Option D fixed 25)
  const defaultCount = {
    chest:     10,
    boss_day:  15,
    boss_week: 20,
    mock_test: 25,
  }[context] ?? 10;
  const n = count ?? defaultCount;

  // For boss_week and mock_test: gather items from multiple zones
  let rawItems;
  if (context === 'boss_week') {
    // Aggregate from all 5 zones, deduplicate by id
    const allIds = new Set();
    rawItems = [0, 1, 2, 3, 4].flatMap((z) => {
      const zItems = extractByGameType(weekData, weekId, gameType, z);
      return zItems.filter((item) => {
        if (allIds.has(item.id)) return false;
        allIds.add(item.id);
        return true;
      });
    });
  } else if (context === 'mock_test') {
    // Fixed pool: use zone 0 (broadest) with count=25
    // In practice DailyRoomScreen will pass weekData for each of the 4 weeks
    rawItems = extractByGameType(weekData, weekId, gameType, zoneIndex);
  } else {
    rawItems = extractByGameType(weekData, weekId, gameType, zoneIndex);
  }

  // Anti-repetition: fresh items first, already-seen items fill remainder
  const fresh = rawItems.filter((item) => !usedIds.has(item.id));
  const seen  = rawItems.filter((item) =>  usedIds.has(item.id));
  const pool  = [...shuffle(fresh), ...shuffle(seen)];

  return pool.slice(0, n);
}

