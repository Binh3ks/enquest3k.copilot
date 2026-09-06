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

import { generateStubVocab } from './generateStubVocab';

/**
 * Build a flat list of {word, definition?, type} items from a string array or object array.
 */
function normalizeItems(raw = [], type = 'vocab') {
  return raw
    .filter(Boolean)
    .map((item) => {
      if (typeof item === 'string') return { word: item, type };
      if (item.word || item.term || item.text)
        return { word: item.word || item.term || item.text, definition: item.definition || item.meaning || item.vi || '', type };
      if (item.phrase || item.chunk)
        return { word: item.phrase || item.chunk, definition: item.meaning || '', type: 'phrase' };
      return null;
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
