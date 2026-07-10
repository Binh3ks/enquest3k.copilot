// WEEK 36: Adventure Stories (Irregular Verbs)
// Grammar Station — Advanced Mode
// Focus: Irregular verbs (5 groups: went/saw/took/came/spoke)

export default {
  title: 'Irregular Verbs — Adventure Stories',
  theme: 'adventure_stories',
  rule: {
    en: 'Irregular verbs do NOT follow the normal -ed pattern. Group 1: go→went, come→came. Group 2: see→saw, speak→spoke. Group 3: take→took, give→gave. Group 4: find→found, ride→rode. Group 5: write→wrote, make→made. Example: Marco Polo WENT to China. He SAW amazing things. He TOOKE the job seriously.',
    vi: 'Động từ bất quy tắc KHÔNG theo quy tắc thêm -ed. Nhóm 1: go→went, come→came. Nhóm 2: see→saw, speak→spoke. Nhóm 3: take→took, give→gave. Nhóm 4: find→found, ride→rode. Nhóm 5: write→wrote, make→made.'
  },
  exercises: [
    { id: 1, type: 'fill_blank', question_en: 'Marco Polo ___ (go) from Italy to China in the 1200s.', answer: 'went', hint: 'go → went (Group 1)' },
    { id: 2, type: 'fill_blank', question_en: 'He ___ (see) amazing things on the Silk Road.', answer: 'saw', hint: 'see → saw (Group 2)' },
    { id: 3, type: 'fill_blank', question_en: 'He ___ (take) the job very seriously.', answer: 'took', hint: 'take → took (Group 3)' },
    { id: 4, type: 'fill_blank', question_en: 'The emperor ___ (give) him an important job.', answer: 'gave', hint: 'give → gave (Group 3)' },
    { id: 5, type: 'fill_blank', question_en: 'We ___ (find) an underwater cave!', answer: 'found', hint: 'find → found (Group 4)' },
    { id: 6, type: 'fill_blank', question_en: 'He ___ (write) a famous book about his travels.', answer: 'wrote', hint: 'write → wrote (Group 5)' },
    { id: 7, type: 'fill_blank', question_en: 'She ___ (come) back home after 24 years.', answer: 'came', hint: 'come → came (Group 1)' },
    { id: 8, type: 'fill_blank', question_en: 'They ___ (ride) horses across the mountains.', answer: 'rode', hint: 'ride → rode (Group 4)' },
    { id: 9, type: 'unscramble', question_en: 'Unscramble the words:', words: ['Marco', 'went', 'to', 'China'], answer: 'Marco went to China' },
    { id: 10, type: 'unscramble', question_en: 'Unscramble the words:', words: ['They', 'saw', 'amazing', 'things'], answer: 'They saw amazing things' },
    { id: 11, type: 'multiple_choice', question_en: 'Choose the correct past tense: Marco ___ to China. (go)', options: ['goed', 'went', 'gone'], answer: 'went' },
    { id: 12, type: 'multiple_choice', question_en: 'Choose the correct past tense: She ___ a beautiful cave. (see)', options: ['saw', 'seed', 'seen'], answer: 'saw' },
    { id: 13, type: 'multiple_choice', question_en: 'Choose the correct past tense: He ___ the job seriously. (take)', options: ['taked', 'took', 'taken'], answer: 'took' },
    { id: 14, type: 'fill_blank', question_en: 'They ___ (speak) five different languages.', answer: 'spoke', hint: 'speak → spoke (Group 2)' },
    { id: 15, type: 'fill_blank', question_en: 'We ___ (make) an amazing discovery.', answer: 'made', hint: 'make → made (Group 5)' },
    { id: 16, type: 'fill_blank', question_en: 'The expedition ___ (begin) in the morning.', answer: 'began', hint: 'begin → began' },
    { id: 17, type: 'fill_blank', question_en: 'He ___ (win) the emperor trust completely.', answer: 'won', hint: 'win → won (Group 5)' },
    { id: 18, type: 'fill_blank', question_en: 'The ship ___ (sink) many hundreds of years ago.', answer: 'sank', hint: 'sink → sank (Group 4)' },
    { id: 19, type: 'sentence_correct', question_en: 'Correct the sentence: He goed to China. (Use correct irregular form)', answer: 'He went to China', hint: 'go → went, không dùng goed' },
    { id: 20, type: 'sentence_correct', question_en: 'Correct the sentence: She taked the job seriously. (Use correct irregular form)', answer: 'She took the job seriously', hint: 'take → took, không dùng taked' }
  ]
};