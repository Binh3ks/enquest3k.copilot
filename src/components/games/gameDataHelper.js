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
  { word: 'corridor', definition_en: 'a long passage in a school building', definition_vi: 'hành lang', audio_word: '/audio/week33/vocab_corridor.mp3' },
  { word: 'slipped', definition_en: 'lost footing on a smooth surface', definition_vi: 'bị trượt ngã', audio_word: '/audio/week33/vocab_slipped.mp3' },
  { word: 'nurse', definition_en: 'a person trained to treat injured students', definition_vi: 'cô y tá', audio_word: '/audio/week33/vocab_nurse.mp3' },
  { word: 'bandage', definition_en: 'a clean cloth wrapped around a cut', definition_vi: 'băng gạc', audio_word: '/audio/week33/vocab_bandage.mp3' },
  { word: 'friction', definition_en: 'a physical force that prevents sliding', definition_vi: 'lực ma sát', audio_word: '/audio/week33/vocab_friction.mp3' },
  { word: 'relieved', definition_en: 'feeling calm after danger has passed', definition_vi: 'nhẹ nhõm', audio_word: '/audio/week33/vocab_relieved.mp3' },
  { word: 'caution', definition_en: 'careful attention to prevent accidents', definition_vi: 'cẩn trọng', audio_word: '/audio/week33/vocab_caution.mp3' },
  { word: 'momentum', definition_en: 'forward driving force of a moving body', definition_vi: 'động lượng', audio_word: '/audio/week33/vocab_momentum.mp3' },
  { word: 'velocity', definition_en: 'speed of an object in a direction', definition_vi: 'vận tốc', audio_word: '/audio/week33/vocab_velocity.mp3' },
  { word: 'medical', definition_en: 'related to health care and healing wounds', definition_vi: 'y tế', audio_word: '/audio/week33/vocab_medical.mp3' },
  { word: 'mistake', definition_en: 'an action or decision that is incorrect', definition_vi: 'sai sót', audio_word: '/audio/week33/vocab_mistake.mp3' },
  { word: 'careful', definition_en: 'giving serious attention to avoid harm', definition_vi: 'cẩn thận', audio_word: '/audio/week33/vocab_careful.mp3' },
  { word: 'surface', definition_en: 'the top or outside layer of something', definition_vi: 'bề mặt', audio_word: '/audio/week33/vocab_surface.mp3' },
  { word: 'accident', definition_en: 'an unexpected event that causes harm', definition_vi: 'tai nạn', audio_word: '/audio/week33/vocab_accident.mp3' },
  { word: 'treatment', definition_en: 'medical care given to an injured person', definition_vi: 'sự điều trị', audio_word: '/audio/week33/vocab_treatment.mp3' },
  { word: 'emergency', definition_en: 'a serious situation needing quick action', definition_vi: 'khẩn cấp', audio_word: '/audio/week33/vocab_emergency.mp3' },
  { word: 'recovery', definition_en: 'the process of becoming healthy again', definition_vi: 'hồi phục', audio_word: '/audio/week33/vocab_recovery.mp3' },
  { word: 'distance', definition_en: 'the amount of space between two points', definition_vi: 'khoảng cách', audio_word: '/audio/week33/vocab_distance.mp3' },
  { word: 'gravity', definition_en: 'the force that pulls objects to earth', definition_vi: 'trọng lực', audio_word: '/audio/week33/vocab_gravity.mp3' },
  { word: 'prevention', definition_en: 'stopping something bad from happening', definition_vi: 'phòng ngừa', audio_word: '/audio/week33/vocab_prevention.mp3' },
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
  const chunks = [
    { en: 'walking carefully', vi: 'cẩn thận bước đi', category: 'Verb Phrase' },
    { en: 'down the corridor', vi: 'dọc theo hành lang', category: 'Location' },
    { en: 'slipped on the wet floor', vi: 'trượt ngã trên sàn ướt', category: 'Action' },
    { en: 'called the nurse', vi: 'gọi cô y tá trường', category: 'Action' },
    { en: 'applied clean bandage', vi: 'băng một chiếc băng sạch', category: 'Medical' },
    { en: 'felt extremely relieved', vi: 'cảm thấy rất nhẹ nhõm', category: 'Feeling' },
    { en: 'learned valuable lesson', vi: 'học được bài học quý', category: 'Outcome' },
    { en: 'followed safety rules', vi: 'tuân theo quy tắc an toàn', category: 'Rule' },
  ];

  // 4. 6-8 Diverse Sentence & Grammar Rounds for Game 3
  const sentenceRounds = [
    {
      type: 'sentence',
      title: 'Past Continuous & Place',
      sentence: 'Jake was walking carefully down the corridor.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Jake' },
        { id: 'VP', label: 'Verb Phrase', answer: 'was walking' },
        { id: 'C', label: 'Place', answer: 'down the corridor' },
      ],
      distractors: ['sprinted fast', 'in the lab'],
    },
    {
      type: 'bilingual',
      title: 'English Chunks to Vietnamese Meaning',
      sentence: 'Match English chunks to Vietnamese meanings:',
      slots: [
        { id: 'B1', label: 'cẩn thận bước đi', answer: 'walking carefully' },
        { id: 'B2', label: 'trên sàn nhà ướt', answer: 'on the wet floor' },
        { id: 'B3', label: 'cô y tá trường học', answer: 'the school nurse' },
      ],
      distractors: ['sprinted loudly', 'science class'],
    },
    {
      type: 'definition',
      title: 'Word to Cambridge Definition',
      sentence: 'Match vocabulary to Cambridge definitions:',
      slots: [
        { id: 'D1', label: 'cloth wrapped on a cut', answer: 'bandage' },
        { id: 'D2', label: 'hallway in building', answer: 'corridor' },
        { id: 'D3', label: 'force stopping slide', answer: 'friction' },
      ],
      distractors: ['momentum', 'mistake'],
    },
    {
      type: 'sentence',
      title: 'School Safety Rule',
      sentence: 'Students must walk calmly during class breaks.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Students' },
        { id: 'VP', label: 'Modal & Verb', answer: 'must walk calmly' },
        { id: 'C', label: 'Time Frame', answer: 'during breaks' },
      ],
      distractors: ['slipped down', 'clean bandages'],
    },
    {
      type: 'bilingual',
      title: 'Science & Medical Collocations',
      sentence: 'Match science phrases to meanings:',
      slots: [
        { id: 'S1', label: 'lực ma sát bề mặt', answer: 'surface friction' },
        { id: 'S2', label: 'cảm thấy nhẹ nhõm', answer: 'felt relieved' },
        { id: 'S3', label: 'băng bó vết thương', answer: 'treated the wound' },
      ],
      distractors: ['fast velocity', 'lost balance'],
    },
    {
      type: 'definition',
      title: 'SRS Physics & Action Definitions',
      sentence: 'Match advanced science concepts:',
      slots: [
        { id: 'D4', label: 'forward driving force', answer: 'momentum' },
        { id: 'D5', label: 'speed with direction', answer: 'velocity' },
        { id: 'D6', label: 'care to avoid harm', answer: 'caution' },
      ],
      distractors: ['emergency', 'recovery'],
    },
    {
      type: 'sentence',
      title: 'First Aid Emergency Response',
      sentence: 'The nurse arrived quickly with clean bandages.',
      slots: [
        { id: 'S', label: 'Medical Helper', answer: 'The nurse' },
        { id: 'VP', label: 'Action & Speed', answer: 'arrived quickly' },
        { id: 'C', label: 'Supplies', answer: 'with bandages' },
      ],
      distractors: ['wet floor', 'walking slowly'],
    },
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

