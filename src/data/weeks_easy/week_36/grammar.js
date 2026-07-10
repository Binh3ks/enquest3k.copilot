// WEEK 36: Adventure Stories (Irregular Verbs) — Easy Mode
// Grammar Station — Easy Mode
// Focus: Irregular verbs — simpler verbs (go, see, come, find, give)

export default {
  title: 'Irregular Verbs — Simple Adventure',
  theme: 'adventure_stories',
  rule: {
    en: 'Some verbs do NOT add -ed in past tense. Group 1: go→went, come→came. Group 2: see→saw, find→found. Group 3: give→gave, take→took. Example: I WENT to the museum. She SAW a cave. We FOUND a treasure.',
    vi: 'Một số động từ KHÔNG thêm -ed ở thì quá khứ. Nhóm 1: go→went, come→came. Nhóm 2: see→saw, find→found. Nhóm 3: give→gave, take→took.'
  },
  exercises: [
    { id: 1, type: 'fill_blank', question_en: 'We ___ (go) on a submarine trip.', answer: 'went', hint: 'go → went' },
    { id: 2, type: 'fill_blank', question_en: 'She ___ (see) a beautiful cave.', answer: 'saw', hint: 'see → saw' },
    { id: 3, type: 'fill_blank', question_en: 'They ___ (come) back home.', answer: 'came', hint: 'come → came' },
    { id: 4, type: 'fill_blank', question_en: 'He ___ (find) a gold compass.', answer: 'found', hint: 'find → found' },
    { id: 5, type: 'fill_blank', question_en: 'We ___ (give) the photos to the museum.', answer: 'gave', hint: 'give → gave' },
    { id: 6, type: 'fill_blank', question_en: 'They ___ (take) photos of the cave.', answer: 'took', hint: 'take → took' },
    { id: 7, type: 'fill_blank', question_en: 'I ___ (make) a great discovery.', answer: 'made', hint: 'make → made' },
    { id: 8, type: 'fill_blank', question_en: 'Marco Polo ___ (write) a famous book.', answer: 'wrote', hint: 'write → wrote' },
    { id: 9, type: 'unscramble', question_en: 'Unscramble the words:', words: ['I', 'went', 'home'], answer: 'I went home' },
    { id: 10, type: 'unscramble', question_en: 'Unscramble the words:', words: ['We', 'saw', 'a', 'cave'], answer: 'We saw a cave' },
    { id: 11, type: 'multiple_choice', question_en: 'Yesterday, I ___ to the museum. (go)', options: ['go', 'goed', 'went'], answer: 'went' },
    { id: 12, type: 'multiple_choice', question_en: 'She ___ a treasure. (find)', options: ['finded', 'found', 'finded'], answer: 'found' },
    { id: 13, type: 'multiple_choice', question_en: 'He ___ me a gift. (give)', options: ['gived', 'gave', 'gived'], answer: 'gave' },
    { id: 14, type: 'fill_blank', question_en: 'They ___ (ride) the submarine.', answer: 'rode', hint: 'ride → rode' },
    { id: 15, type: 'fill_blank', question_en: 'He ___ (speak) five languages.', answer: 'spoke', hint: 'speak → spoke' },
    { id: 16, type: 'fill_blank', question_en: 'The ship ___ (sink) long ago.', answer: 'sank', hint: 'sink → sank' },
    { id: 17, type: 'fill_blank', question_en: 'She ___ (win) the race.', answer: 'won', hint: 'win → won' },
    { id: 18, type: 'fill_blank', question_en: 'He ___ (begin) his trip at 17.', answer: 'began', hint: 'begin → began' },
    { id: 19, type: 'sentence_correct', question_en: 'Correct the sentence: He goed to China. (Use correct form)', answer: 'He went to China', hint: 'go → went' },
    { id: 20, type: 'sentence_correct', question_en: 'Correct the sentence: I taked photos. (Use correct form)', answer: 'I took photos', hint: 'take → took' }
  ]
};