import { loadWeekData } from '../data/weeks/index';
import { sanitizeChunkText } from '../utils/textSanitize';
import { CURRICULUM_DEFINITIONS } from '../modules/quest/MCQBlitzPopup';
import { WEEKLY_CATAPULT_PAIRS } from '../modules/chronicles/extractQuestVocab';
import { generateStubCatapultPairs } from '../modules/chronicles/generateStubVocab';

/**
 * Normalizes an item to have `word`, `definition` and `type` fields.
 * Adapted from extractQuestVocab.js
 */
function normalizeItem(item, type = 'vocab') {
  let word = '';
  let def = '';

  if (typeof item === 'string') {
    word = sanitizeChunkText(item);
  } else if (item.sentence) {
    word = sanitizeChunkText(item.sentence);
    def = item.hint || item.translation || item.vi || '';
  } else if (item.word || item.term || item.text) {
    word = sanitizeChunkText(item.word || item.term || item.text);
    def = item.definition_en || item.definition || item.meaning || item.vi || '';
  } else if (item.phrase || item.chunk) {
    word = sanitizeChunkText(item.phrase || item.chunk);
    def = item.definition_en || item.meaning || '';
  }

  if (!word) return null;
  const lower = word.trim().toLowerCase();
  if (!def || /[\u00C0-\u1EF9]/.test(def)) {
    def = CURRICULUM_DEFINITIONS?.[lower] || (item.definition_en || item.definition || item.meaning || '');
  }

  // Handle normalizedWord requirement for the new dedup flow
  const normalizedWord = item["word"] ?? item.word ?? item.en ?? word;

  return { 
    ...item, 
    word, 
    definition: def, 
    type,
    normalizedWord 
  };
}

/**
 * Extracts raw grammar items from weekData.
 */
function extractGrammarFromData(weekData, weekId = 33) {
  const reading_hub = weekData?.readingHub || weekData?.reading_hub;
  const listening_hub = weekData?.listeningHub || weekData?.listening_hub;
  const sentences = [];

  if (reading_hub?.clil_article?.sentence_drills) {
    sentences.push(...reading_hub.clil_article.sentence_drills.map(d => ({
      sentence: typeof d === 'string' ? d : (d.sentence || d.text || d.example || ''),
      hint: typeof d === 'string' ? '' : (d.translation || d.vi || ''),
      ...d
    })));
  }

  const gDuel = listening_hub?.sentence_smash || listening_hub?.grammar_duel;
  if (gDuel?.sentences) {
    sentences.push(...gDuel.sentences.map(s => ({
      sentence: typeof s === 'string' ? s : (s.sentence || s.text || ''),
      hint: typeof s === 'string' ? '' : (s.translation || s.vi || ''),
      ...s
    })));
  }
  
  // Add curated Catapult pairs to grammar bucket if present for this week
  if (WEEKLY_CATAPULT_PAIRS[weekId]) {
    sentences.push(...WEEKLY_CATAPULT_PAIRS[weekId].map(p => ({
      sentence: `${sanitizeChunkText(p.starter)} ${sanitizeChunkText(p.completion)}`,
      hint: '',
      starter: sanitizeChunkText(p.starter),
      completion: sanitizeChunkText(p.completion)
    })));
  }

  return sentences.filter(s => s.sentence?.length > 5);
}

/**
 * Extracts raw vocab items from weekData.
 */
function extractVocabFromData(weekData) {
  const reading_hub = weekData?.readingHub || weekData?.reading_hub;
  const listening_hub = weekData?.listeningHub || weekData?.listening_hub;
  const writing_hub = weekData?.writingHub || weekData?.writing_hub;
  const speaking_hub = weekData?.speakingHub || weekData?.speaking_hub;
  let items = [];

  // 0. Dedicated Vocab source (vocab.js / stations.new_words)
  if (weekData?.stations?.new_words && Array.isArray(weekData.stations.new_words)) {
    items.push(...weekData.stations.new_words);
  } else if (weekData?.stations?.vocab && Array.isArray(weekData.stations.vocab)) {
    items.push(...weekData.stations.vocab);
  } else if (weekData?.vocab && Array.isArray(weekData.vocab)) {
    items.push(...weekData.vocab);
  } else if (weekData?.new_words && Array.isArray(weekData.new_words)) {
    items.push(...weekData.new_words);
  }

  // Zone 1
  if (reading_hub?.story_scenes) {
    const scenes = Array.isArray(reading_hub.story_scenes) 
      ? reading_hub.story_scenes 
      : Object.values(reading_hub.story_scenes);
    scenes.forEach(scene => {
      if (scene.vocabulary) items.push(...scene.vocabulary);
      if (scene.vocab) items.push(...scene.vocab);
      if (scene.keywords) items.push(...scene.keywords);
    });
  }
  if (reading_hub?.vocab_focus) {
    items.push(...reading_hub.vocab_focus);
  }
  if (reading_hub?.read_explore?.shadowing_lines) {
    reading_hub.read_explore.shadowing_lines.forEach(line => {
      if (line.focus_words) items.push(...line.focus_words);
    });
  }

  // Zone 2
  if (reading_hub?.clil_article?.vocabulary) {
    items.push(...reading_hub.clil_article.vocabulary);
  }
  if (reading_hub?.clil_article?.vocab_focus) {
    items.push(...reading_hub.clil_article.vocab_focus);
  }
  if (listening_hub?.action_lab?.vocabulary) {
    items.push(...listening_hub.action_lab.vocabulary);
  }
  if (listening_hub?.action_lab?.keywords) {
    items.push(...listening_hub.action_lab.keywords);
  }

  // Zone 3
  if (listening_hub?.word_blitz?.words) {
    items.push(...listening_hub.word_blitz.words);
  } else if (listening_hub?.flash_arena?.words) {
    items.push(...listening_hub.flash_arena.words);
  }

  // Zone 4 (rw_part_1 definitions + speaking keywords; writing_chunks excluded from vocab)
  if (writing_hub?.rw_part_1?.definitions && Array.isArray(writing_hub.rw_part_1.definitions)) {
    items.push(...writing_hub.rw_part_1.definitions.map(d => ({
      word: d.target,
      definition: d.text
    })));
  }
  if (speaking_hub?.info_exchange?.keywords && Array.isArray(speaking_hub.info_exchange.keywords)) {
    items.push(...speaking_hub.info_exchange.keywords);
  }

  // Strict filter: exclude any grammar items or sentences from vocab pool
  return items.filter(item => {
    if (!item) return false;
    if (typeof item === 'string') {
      return item.trim().split(/\s+/).length <= 4 && !/[.!?]$/.test(item.trim());
    }
    if (item.sentence || item.starter || item.completion) return false;
    const wordText = item.word || item.term || item.text || item.phrase || item.chunk || '';
    if (wordText.trim().split(/\s+/).length > 4 || /[.!?]$/.test(wordText.trim())) return false;
    return true;
  });
}

export function computeAllocations(currentWeekId, targetSize, getAvailableCount) {
  const sources = [
    { weekId: currentWeekId, weight: 0.60 },
    { weekId: currentWeekId - 1, weight: 0.20 },
    { weekId: currentWeekId - 2, weight: 0.12 },
    { weekId: currentWeekId - 3, weight: 0.08 }
  ];

  // 1. Check availability
  sources.forEach(s => {
    // Treat invalid week IDs (<= 0) as unavailable
    if (s.weekId <= 0) {
      s.available = 0;
    } else {
      s.available = getAvailableCount(s.weekId);
    }
    s.hasData = s.available > 0;
  });

  const validSources = sources.filter(s => s.hasData);
  if (validSources.length === 0) {
    return { allocations: [], error: true, message: "No data available at all" };
  }

  // 2. Calculate shortfall
  let shortfall = 0;
  let validWeightSum = 0;
  sources.forEach(s => {
    if (!s.hasData) shortfall += s.weight;
    else validWeightSum += s.weight;
  });

  // 3. Distribute shortfall proportionally
  let totalCount = 0;
  sources.forEach(s => {
    if (s.hasData) {
      s.finalWeight = s.weight + shortfall * (s.weight / validWeightSum);
      s.count = Math.min(Math.round(targetSize * s.finalWeight), s.available);
      totalCount += s.count;
    } else {
      s.count = 0;
    }
  });

  // 4. Adjust rounding differences
  let diff = targetSize - totalCount;
  if (diff > 0) {
    validSources.sort((a, b) => b.weight - a.weight);
    for (const s of validSources) {
      const space = s.available - s.count;
      if (space > 0) {
        const add = Math.min(space, diff);
        s.count += add;
        diff -= add;
        if (diff === 0) break;
      }
    }
  }

  return {
    allocations: sources.filter(s => s.count > 0).map(s => ({
      weekId: s.weekId,
      count: s.count,
      graceDegraded: shortfall > 0
    })),
    error: false
  };
}

/**
 * Week-specific theme banks for unauthored weeks (W38–W156)
 * ensuring NO week falls back to W33 corridor/friction words.
 */
function getWeekSpecificStub(weekId, skillBucket) {
  // W40: Electricity, Lightning & Energy Circuits
  const w40Vocab = [
    { word: 'lightning', definition: 'A flash of bright electricity in the sky', type: 'vocab' },
    { word: 'thunder', definition: 'The loud crashing sound caused by lightning', type: 'vocab' },
    { word: 'circuit', definition: 'A complete path for an electric current to flow', type: 'vocab' },
    { word: 'battery', definition: 'A small container that stores electrical energy', type: 'vocab' },
    { word: 'voltage', definition: 'The electric pressure that drives current', type: 'vocab' },
    { word: 'electric', definition: 'Powered by or producing electricity', type: 'vocab' },
    { word: 'conductor', definition: 'A material that allows electricity to pass through', type: 'vocab' },
    { word: 'insulator', definition: 'A material that does not allow electricity to pass through', type: 'vocab' },
    { word: 'switch', definition: 'A device used to connect or break an electric circuit', type: 'vocab' },
    { word: 'current', definition: 'The steady flow of electricity through a wire', type: 'vocab' },
    { word: 'power', definition: 'Energy that can be collected and used for work', type: 'vocab' },
    { word: 'generator', definition: 'A machine that produces electric energy', type: 'vocab' },
  ];

  const w40Grammar = [
    { starter: 'Lightning flashes brightly across', completion: 'the stormy night sky', sentence: 'Lightning flashes brightly across the stormy night sky.' },
    { starter: 'Electric current flows steadily through', completion: 'the closed copper wire', sentence: 'Electric current flows steadily through the closed copper wire.' },
    { starter: 'A chemical battery stores', completion: 'portable electric energy', sentence: 'A chemical battery stores portable electric energy.' },
    { starter: 'Metal paperclips act as', completion: 'good electrical conductors', sentence: 'Metal paperclips act as good electrical conductors.' },
    { starter: 'Plastic coating surrounds the wire to', completion: 'prevent electric shocks', sentence: 'Plastic coating surrounds the wire to prevent electric shocks.' },
    { starter: 'When the switch closes, the', completion: 'light bulb turns on', sentence: 'When the switch closes, the light bulb turns on.' },
  ];

  if (weekId === 40) {
    if (skillBucket === 'vocab') return w40Vocab;
    if (skillBucket === 'grammar') return w40Grammar;
    return [...w40Vocab, ...w40Grammar];
  }

  // Generic week-specific generator for other unauthored weeks
  const genericVocab = [
    { word: `discovery_${weekId}`, definition: 'The act of finding something new or exciting', type: 'vocab' },
    { word: 'experiment', definition: 'A scientific test done to learn something', type: 'vocab' },
    { word: 'observation', definition: 'Looking closely at something to notice facts', type: 'vocab' },
    { word: 'hypothesis', definition: 'An educated guess that can be tested', type: 'vocab' },
    { word: 'evidence', definition: 'Facts or information proving something true', type: 'vocab' },
    { word: 'conclusion', definition: 'A final decision or judgment based on reasoning', type: 'vocab' },
  ];
  const genericGrammar = [
    { starter: 'Young scientists conduct', completion: 'careful daily experiments', sentence: 'Young scientists conduct careful daily experiments.' },
    { starter: 'The research team gathered', completion: 'reliable scientific evidence', sentence: 'The research team gathered reliable scientific evidence.' },
    { starter: 'Students write their observations in', completion: 'their blue lab notebooks', sentence: 'Students write their observations in their blue lab notebooks.' },
    { starter: 'A clear hypothesis helps', completion: 'guide the scientific method', sentence: 'A clear hypothesis helps guide the scientific method.' },
  ];

  if (skillBucket === 'vocab') return genericVocab;
  if (skillBucket === 'grammar') return genericGrammar;
  return [...genericVocab, ...genericGrammar];
}

export async function loadBucketPool(weekId, skillBucket) {
  let weekData = null;
  try {
    weekData = await loadWeekData(weekId, false);
  } catch (e) {
    console.warn(`Failed to load week data for week ${weekId}`);
  }
  
  let rawItems = [];
  if (weekData) {
    if (skillBucket === 'vocab') {
      rawItems = extractVocabFromData(weekData).map(i => normalizeItem(i, 'vocab')).filter(Boolean);
    } else if (skillBucket === 'grammar') {
      rawItems = extractGrammarFromData(weekData, weekId).map(i => normalizeItem(i, 'grammar')).filter(Boolean);
    } else if (skillBucket === 'integration') {
      const v = extractVocabFromData(weekData).map(i => normalizeItem(i, 'vocab')).filter(Boolean);
      rawItems = v.filter(item => item.type === 'vocab' && !item.sentence);
    }
  }

  // Fallback to week-specific stub if weekData does not exist or produced no items
  if (rawItems.length === 0) {
    rawItems = getWeekSpecificStub(weekId, skillBucket).map(i => normalizeItem(i, skillBucket)).filter(Boolean);
  }

  return rawItems.map((item, idx) => {
    const uniqueId = item.id !== undefined ? item.id : idx;
    const globalId = `w${weekId}_${uniqueId}`;
    
    return {
      ...item,
      weekId,
      _globalId: globalId
    };
  });
}

export async function getWeeklyPoolWithReview(currentWeekId, skillBucket, options = {}) {
  const targets = {
    vocab: 18,
    grammar: 8,
    integration: 14
  };
  const targetSize = options.targetSize || targets[skillBucket] || 15;

  // We'll load the last 4 weeks.
  const weekIds = [currentWeekId, currentWeekId - 1, currentWeekId - 2, currentWeekId - 3].filter(id => id > 0);
  const dataCache = {};
  
  for (const wId of weekIds) {
    dataCache[wId] = await loadBucketPool(wId, skillBucket);
  }

  const getAvailableCount = (wId) => {
    return dataCache[wId] ? dataCache[wId].length : 0;
  };

  const { allocations, error, message } = computeAllocations(currentWeekId, targetSize, getAvailableCount);
  
  if (error) {
    return { items: [], meta: { error: true, message } };
  }

  let rawItems = [];
  for (const alloc of allocations) {
    const pool = dataCache[alloc.weekId] || [];
    const isReview = alloc.weekId !== currentWeekId;
    // Shuffle the pool and slice according to count
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, alloc.count).map(item => ({
      ...item,
      isReview
    }));
    rawItems.push(...selected);
  }

  // Dedup based on _globalId
  let items = [];
  const seen = new Set();
  rawItems.forEach(item => {
    if (!seen.has(item._globalId)) {
      seen.add(item._globalId);
      items.push(item);
    }
  });

  return {
    items: items.slice(0, targetSize),
    meta: {
      allocations,
      skillBucket,
      targetSize,
      actualSize: items.length
    }
  };
}
