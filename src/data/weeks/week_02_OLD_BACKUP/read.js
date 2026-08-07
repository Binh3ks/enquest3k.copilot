export default {
  title: "My Family Squad",
  image_url: "/images/week2/read_cover_w2.jpg",
  content_en: "**This** is my **family**. We are a **team**. **This** is my **father**. He is the **leader**. **This** is my **mother**. She is kind. **This** is my **brother**. He is a good **helper**. **This** is my **sister**. She is funny. We **love** each other. We play **together**. We are a happy **family**!",
  content_vi: "Đây là gia đình tôi. Chúng tôi là một đội. Đây là bố tôi. Ông ấy là người lãnh đạo. Đây là mẹ tôi. Bà ấy tốt bụng. Đây là anh trai tôi. Anh ấy là người giúp đỡ tốt. Đây là em gái tôi. Em ấy vui tính. Chúng tôi yêu thương nhau. Chúng tôi chơi cùng nhau. Chúng tôi là một gia đình hạnh phúc!",
  audio_url: null,
  comprehension_questions: [
    {
      id: 1,
      question_en: "Who is the leader?",
      answer: ["The father", "My father", "Father"],
      hint_en: "Look for 'He is the leader'",
      hint_vi: "Tìm 'Ông ấy là người lãnh đạo'"
    },
    {
      id: 2,
      question_en: "Is the brother a good helper?",
      answer: ["Yes", "Yes, he is", "Yes, he is a good helper"],
      hint_en: "Is he a good helper?",
      hint_vi: "Anh ấy có phải người giúp đỡ tốt không?"
    },
    {
      id: 3,
      question_en: "Are they a team?",
      answer: ["Yes", "Yes, they are", "Yes, they are a team"],
      hint_en: "We are a...",
      hint_vi: "Chúng tôi là một..."
    }
  ]
};

export const chunk_focus = [
  "This",
  "family",
  "team",
  "father",
  "leader",
  "mother",
  "brother",
  "helper",
  "sister",
  "love",
  "together"
];

export const dictionary = {
    'This': { word: 'This', pronunciation: '/this/', definition_vi: 'cái này, điều này', definition_en: 'Refers to something nearby (singular)', example: 'This is my new book.' },
    'brother': { word: 'brother', pronunciation: '/brother/', definition_vi: 'anh trai, em trai', definition_en: 'A boy who has the same parents as you.', example: 'I have a brother.' },
    'family': { word: 'family', pronunciation: '/family/', definition_vi: 'Gia đình', definition_en: 'People who are related to each other, like parents and children.', example: 'I love my big family.' },
    'father': { word: 'father', pronunciation: '/father/', definition_vi: 'Cha, bố', definition_en: 'A male parent who takes care of his children.', example: 'I have a father.' },
    'helper': { word: 'helper', pronunciation: '/helper/', definition_vi: 'Người giúp đỡ', definition_en: 'A person who gives help to others.', example: 'I have a helper.' },
    'leader': { word: 'leader', pronunciation: '/leader/', definition_vi: 'Người lãnh đạo', definition_en: 'A person who guides and helps others.', example: 'I have a leader.' },
    'love': { word: 'love', pronunciation: '/love/', definition_vi: 'Yêu thương', definition_en: 'A strong feeling of care and affection.', example: 'I love my family dearly.' },
    'mother': { word: 'mother', pronunciation: '/mother/', definition_vi: 'Mẹ', definition_en: 'A female parent who takes care of her children.', example: 'I have a mother.' },
    'sister': { word: 'sister', pronunciation: '/sister/', definition_vi: 'Chị gái, em gái', definition_en: 'A girl who has the same parents as you.', example: 'I have a sister.' },
    'team': { word: 'team', pronunciation: '/team/', definition_vi: 'Đội, nhóm', definition_en: 'A group of people who work together.', example: 'I have a team.' },
    'together': { word: 'together', pronunciation: '/together/', definition_vi: 'cùng nhau', definition_en: 'With or in proximity to another person or people', example: 'We work together.' }
};
