/**
 * gameDataHelper.js
 * Centralized content loader for Arcade Games.
 * Dynamically provides all 20+ vocab words with definitions, bilingual chunks,
 * and grammar sentences for any week.
 */

import week33Vocab from '../../data/weeks/week_33/vocab.js';
import week33Explore from '../../data/weeks/week_33/explore.js';

export function getWeekArcadeData(weekNumber = 33) {
  // Base default fallback if week files not yet imported
  const defaultVocab = week33Vocab || [
    { word: 'corridor', definition_en: 'a long passage inside a school building', definition_vi: 'hành lang', audio_word: '/audio/week33/vocab_corridor.mp3' },
    { word: 'slipped', definition_en: 'lost footing on a smooth or wet surface', definition_vi: 'bị trượt ngã', audio_word: '/audio/week33/vocab_slipped.mp3' },
    { word: 'nurse', definition_en: 'a person trained to treat injured students', definition_vi: 'cô y tá', audio_word: '/audio/week33/vocab_nurse.mp3' },
    { word: 'bandage', definition_en: 'a clean cloth strip wrapped around a cut', definition_vi: 'băng gạc', audio_word: '/audio/week33/vocab_bandage.mp3' },
    { word: 'friction', definition_en: 'a physical force that prevents sliding', definition_vi: 'lực ma sát', audio_word: '/audio/week33/vocab_friction.mp3' },
    { word: 'relieved', definition_en: 'feeling calm after danger has passed', definition_vi: 'nhẹ nhõm', audio_word: '/audio/week33/vocab_relieved.mp3' },
    { word: 'caution', definition_en: 'careful attention to prevent accidents', definition_vi: 'cẩn trọng', audio_word: '/audio/week33/vocab_caution.mp3' },
    { word: 'momentum', definition_en: 'the forward driving force of a moving body', definition_vi: 'động lượng', audio_word: '/audio/week33/vocab_momentum.mp3' },
    { word: 'velocity', definition_en: 'the speed of an object in a direction', definition_vi: 'vận tốc', audio_word: '/audio/week33/vocab_velocity.mp3' },
    { word: 'medical', definition_en: 'related to health care and healing wounds', definition_vi: 'y tế', audio_word: '/audio/week33/vocab_medical.mp3' },
  ];

  const words = (week33Vocab && week33Vocab.length > 0 ? week33Vocab : defaultVocab).map((item, idx) => ({
    id: item.id || idx + 1,
    word: item.word,
    definition: item.definition_en || item.definition || 'an important vocabulary term',
    definition_en: item.definition_en || item.definition || 'an important vocabulary term',
    definition_vi: item.definition_vi || item.vi || 'từ vựng quan trọng',
    audio_word: item.audio_word || `/audio/week${weekNumber}/vocab_${item.word}.mp3`,
  }));

  const chunks = [
    { en: 'walking carefully', vi: 'cẩn thận bước đi', category: 'Verb Phrase' },
    { en: 'down the school corridor', vi: 'dọc theo hành lang trường', category: 'Location' },
    { en: 'slipped on the wet floor', vi: 'trượt ngã trên sàn ướt', category: 'Action' },
    { en: 'called the school nurse', vi: 'gọi cô y tá trường', category: 'Action' },
    { en: 'applied a clean bandage', vi: 'băng một chiếc băng sạch', category: 'Medical' },
    { en: 'felt extremely relieved', vi: 'cảm thấy cực kỳ nhẹ nhõm', category: 'Feeling' },
    { en: 'learned a valuable lesson', vi: 'học được bài học quý giá', category: 'Outcome' },
    { en: 'followed safety rules', vi: 'tuân theo quy tắc an toàn', category: 'Rule' },
  ];

  const sentenceRounds = [
    {
      type: 'sentence',
      title: 'Grammar Chunking',
      sentence: 'Jake was walking carefully down the corridor.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Jake' },
        { id: 'VP', label: 'Verb Phrase', answer: 'was walking carefully' },
        { id: 'C', label: 'Location', answer: 'down the corridor' },
      ],
      distractors: ['running fast', 'in the lab'],
    },
    {
      type: 'bilingual',
      title: 'English Chunk to Vietnamese Meaning',
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
      title: 'Word to Cambridge Definition Match',
      sentence: 'Match vocabulary to Cambridge definitions:',
      slots: [
        { id: 'D1', label: 'cloth wrapped around a wound', answer: 'bandage' },
        { id: 'D2', label: 'hallway inside a building', answer: 'corridor' },
        { id: 'D3', label: 'force that stops sliding', answer: 'friction' },
      ],
      distractors: ['momentum', 'mistake'],
    },
    {
      type: 'sentence',
      title: 'Corridor Safety Advice',
      sentence: 'Students must walk calmly during class breaks.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Students' },
        { id: 'VP', label: 'Modal & Verb', answer: 'must walk calmly' },
        { id: 'C', label: 'Time & Place', answer: 'during class breaks' },
      ],
      distractors: ['slipped down', 'clean bandages'],
    },
  ];

  return {
    words,
    chunks,
    sentenceRounds,
    weekNumber,
  };
}
