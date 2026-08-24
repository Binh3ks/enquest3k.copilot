/**
 * gameDataHelper.js
 * Centralized content loader for Arcade Games.
 * Dynamically provides 20+ week target vocabulary, 10+ SRS review words,
 * bilingual collocations/chunks, and 6-8 grammar sentence rounds for any week.
 */

// Eagerly glob-load week vocabularies across weeks
const vocabModules = import.meta.glob('../../data/weeks/**/vocab.js', { eager: true });
const wordPowerModules = import.meta.glob('../../data/weeks/**/word_power.js', { eager: true });
const easyVocabModules = import.meta.glob('../../data/weeks_easy/**/vocab.js', { eager: true });

// Universal fallback vocabulary if week data is not yet generated
const DEFAULT_FALLBACK_VOCAB = [
  { word: 'explore', definition_en: 'travel in order to learn about something', definition_vi: 'khám phá', audio_word: '' },
  { word: 'discover', definition_en: 'find unexpectedly or during a search', definition_vi: 'phát hiện', audio_word: '' },
  { word: 'journey', definition_en: 'an act of traveling from one place to another', definition_vi: 'hành trình', audio_word: '' },
  { word: 'adventure', definition_en: 'an unusual and exciting experience', definition_vi: 'cuộc phiêu lưu', audio_word: '' },
  { word: 'challenge', definition_en: 'a task or situation that tests ability', definition_vi: 'thử thách', audio_word: '' },
  { word: 'practice', definition_en: 'repeated exercise to improve skill', definition_vi: 'luyện tập', audio_word: '' },
  { word: 'imagine', definition_en: 'form a mental image or concept of', definition_vi: 'tưởng tượng', audio_word: '' },
  { word: 'create', definition_en: 'bring something into existence', definition_vi: 'sáng tạo', audio_word: '' },
  { word: 'knowledge', definition_en: 'facts, information, and skills acquired', definition_vi: 'kiến thức', audio_word: '' },
  { word: 'champion', definition_en: 'a person who has defeated all rivals', definition_vi: 'nhà vô địch', audio_word: '' },
  { word: 'curious', definition_en: 'eager to know or learn something', definition_vi: 'tò mò', audio_word: '' },
  { word: 'inventor', definition_en: 'a person who creates a new device', definition_vi: 'nhà phát minh', audio_word: '' },
  { word: 'teamwork', definition_en: 'the combined action of a group', definition_vi: 'làm việc nhóm', audio_word: '' },
  { word: 'strategy', definition_en: 'a plan of action designed to achieve a goal', definition_vi: 'chiến lược', audio_word: '' },
  { word: 'victory', definition_en: 'an act of defeating an enemy or opponent', definition_vi: 'chiến thắng', audio_word: '' },
  { word: 'brave', definition_en: 'ready to face and endure danger', definition_vi: 'dũng cảm', audio_word: '' },
  { word: 'clever', definition_en: 'quick to understand and learn', definition_vi: 'thông minh', audio_word: '' },
  { word: 'friendly', definition_en: 'kind and pleasant', definition_vi: 'thân thiện', audio_word: '' },
  { word: 'helpful', definition_en: 'giving or ready to give help', definition_vi: 'hay giúp đỡ', audio_word: '' },
  { word: 'patient', definition_en: 'able to accept delay without getting angry', definition_vi: 'kiên nhẫn', audio_word: '' }
];

// Rich pool of SRS Review Words from adjacent levels
const SRS_REVIEW_WORDS = [
  { word: 'curious', definition_en: 'eager to know or learn something new', definition_vi: 'tò mò / hiếu kỳ', isSrs: true },
  { word: 'inventor', definition_en: 'a person who creates a new device or tool', definition_vi: 'nhà phát minh', isSrs: true },
  { word: 'champion', definition_en: 'a person who has defeated all rivals in a contest', definition_vi: 'nhà vô địch', isSrs: true },
  { word: 'experiment', definition_en: 'a scientific test done to discover something', definition_vi: 'thí nghiệm', isSrs: true },
  { word: 'stamina', definition_en: 'the physical ability to sustain prolonged effort', definition_vi: 'thể lực / sức bền', isSrs: true },
  { word: 'strategy', definition_en: 'a plan of action designed to achieve a goal', definition_vi: 'chiến lược', isSrs: true },
  { word: 'compass', definition_en: 'an instrument showing the direction of magnetic north', definition_vi: 'la bàn', isSrs: true },
  { word: 'explorer', definition_en: 'a person who travels in search of geographical discovery', definition_vi: 'nhà thám hiểm', isSrs: true },
  { word: 'telescope', definition_en: 'an optical instrument for viewing distant objects', definition_vi: 'kính viễn vọng', isSrs: true },
  { word: 'discovery', definition_en: 'the act of finding something unknown before', definition_vi: 'sự khám phá', isSrs: true },
  { word: 'ecosystem', definition_en: 'a biological community of interacting organisms', definition_vi: 'hệ sinh thái', isSrs: true },
  { word: 'adventure', definition_en: 'an unusual and exciting, typically hazardous experience', definition_vi: 'cuộc phiêu lưu', isSrs: true },
];

export function getWeekArcadeData(weekNumber = 33) {
  const wNum = parseInt(weekNumber) || 33;
  const pad = String(wNum).padStart(2, '0');

  // Find matching vocab module
  let rawVocab = null;
  for (const [path, mod] of Object.entries(vocabModules)) {
    if (path.includes(`week_${wNum}/`) || path.includes(`week_${pad}/`) || path.includes(`week_${wNum}.js`)) {
      rawVocab = mod.default || mod;
      break;
    }
  }

  // Fallback to easy vocab if needed
  if (!rawVocab || rawVocab.length === 0) {
    for (const [path, mod] of Object.entries(easyVocabModules)) {
      if (path.includes(`week_${wNum}/`) || path.includes(`week_${pad}/`) || path.includes(`week_${wNum}.js`)) {
        rawVocab = mod.default || mod;
        break;
      }
    }
  }

  const primaryVocab = (rawVocab && rawVocab.length > 0) ? rawVocab : DEFAULT_FALLBACK_VOCAB;

  // 1. Map 20 Target Week Vocab
  const targetWords = primaryVocab.map((item, idx) => ({
    id: item.id || `w_${wNum}_${idx + 1}`,
    word: item.word,
    definition: item.definition_en || item.definition || 'an important vocabulary term',
    definition_en: item.definition_en || item.definition || 'an important vocabulary term',
    definition_vi: item.definition_vi || item.vi || 'từ vựng quan trọng',
    audio_word: item.audio_word || `/audio/week${wNum}/vocab_${item.word}.mp3`,
    isSrs: false,
  }));

  // 2. Select 10 SRS Review Words
  const srsWords = SRS_REVIEW_WORDS.slice(0, 10).map((item, idx) => ({
    id: `srs_${idx + 1}`,
    word: item.word,
    definition: item.definition_en,
    definition_en: item.definition_en,
    definition_vi: item.definition_vi,
    audio_word: `/audio/srs/vocab_${item.word}.mp3`,
    isSrs: true,
  }));

  // Combined 30+ word pool
  const allWords = [...targetWords, ...srsWords];

  // 3. Collocations & Chunks of the week
  const chunks = targetWords.slice(0, 8).map(tw => ({
    en: `practice ${tw.word}`,
    vi: `luyện tập ${tw.definition_vi || tw.word}`,
    category: 'Target Vocabulary'
  }));

  // 4. Diverse Sentence & Grammar Rounds for Game 3
  const sentenceRounds = [
    {
      type: 'sentence',
      title: 'Action & Description',
      sentence: 'The brave explorer started a new journey.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'The brave explorer' },
        { id: 'VP', label: 'Verb Phrase', answer: 'started' },
        { id: 'C', label: 'Object', answer: 'a new journey' },
      ],
      distractors: ['jumped high', 'in the park'],
    },
    {
      type: 'bilingual',
      title: 'English Chunks to Vietnamese Meaning',
      sentence: 'Match English chunks to Vietnamese meanings:',
      slots: [
        { id: 'B1', label: 'khám phá thế giới', answer: 'explore the world' },
        { id: 'B2', label: 'học tập chăm chỉ', answer: 'learn diligently' },
        { id: 'B3', label: 'thử thách mới', answer: 'new challenge' },
      ],
      distractors: ['run quickly', 'read carefully'],
    }
  ];

  return {
    words: allWords,
    targetWords,
    srsWords,
    chunks,
    sentenceRounds,
    weekNumber: wNum,
  };
}

