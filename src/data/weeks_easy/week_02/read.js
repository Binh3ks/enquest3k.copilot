export default {
  title: "My Family",
  image_url: "/images/week2/read_cover_w02.jpg",
  content_en: "This is **my family**. My **lovely mother** is kind. She **makes food** **for us** **every day**. My **funny father** is strong. He **plays with me** **in the park**. My **big brother** **helps me with** my homework. My **little sister** is funny. She **draws pictures** for me. We love **each other**. We **work together** as a great team. **Our home** is full of happiness. We **have dinner** together **every evening** and **talk about** our day. I am very lucky **to be with** **my family**!",
  content_vi: "Đây là gia đình tôi. Đây là mẹ tôi. Bà tốt bụng. Đây là bố tôi. Ông mạnh mẽ. Đây là anh trai tôi. Anh ấy giúp tôi. Đây là em gái tôi. Em ấy vui tính. Chúng tôi là một đội. Chúng tôi yêu nhau. Tôi hạnh phúc ở nhà.",
  audio_url: null,
  comprehension_questions: [
    { id: 1, question_en: "Who is kind?", answer: ["Mother", "My mother", "The mother"], clue_statement: "The mother is kind.", hint_en: "The mother is...", hint_vi: "Mẹ là..." },
    { id: 2, question_en: "Who is strong?", answer: ["Father", "My father", "The father"], clue_statement: "The father is strong.", hint_en: "The father is...", hint_vi: "Bố là..." },
    { id: 3, question_en: "Are they a team?", answer: ["Yes", "Yes they are", "Yes, they are"], clue_statement: "Yes, they are.", hint_en: "Yes...", hint_vi: "Có..." },
    { id: 4, question_en: "What is my mother like?", answer: ["kind", "My mother is kind"], clue_statement: "My mother is kind and makes food for us.", hint_en: "A describing word...", hint_vi: "Một từ miêu tả..." },
    { id: 5, question_en: "What is my father like?", answer: ["strong", "My father is strong"], clue_statement: "My father is strong and plays with me.", hint_en: "A describing word...", hint_vi: "Một từ miêu tả..." },
    { id: 6, question_en: "What is my sister like?", answer: ["funny", "My sister is funny"], clue_statement: "My sister is funny and draws pictures.", hint_en: "A describing word...", hint_vi: "Một từ miêu tả..." }
  ]
};

export const chunk_focus = [
  "my family",
  "lovely mother",
  "makes food",
  "for us",
  "every day",
  "funny father",
  "plays with me",
  "in the park",
  "big brother",
  "helps me with",
  "little sister",
  "draws pictures",
  "each other",
  "work together",
  "Our home",
  "have dinner",
  "every evening",
  "talk about",
  "to be with"
];

export const dictionary = {
    'Our home': { word: 'Our home', pronunciation: '/our home/', definition_vi: 'our nhà', definition_en: 'English phrase: our home', example: 'The phrase \'our home\' means our nhà.' },
    'big brother': { word: 'big brother', pronunciation: '/big brother/', definition_vi: 'anh trai', definition_en: 'meaning of big brother', example: 'My big brother helps me with my homework every evening.' },
    'draws pictures': { word: 'draws pictures', pronunciation: '/draws pictures/', definition_vi: 'vẽ tranh', definition_en: 'meaning of draws pictures', example: 'My sister draws pictures every single day.' },
    'each other': { word: 'each other', pronunciation: '/each other/', definition_vi: 'nhau, lẫn nhau', definition_en: 'meaning of each other', example: 'We love each other very much.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'every evening': { word: 'every evening', pronunciation: '/every evening/', definition_vi: 'mỗi buổi tối', definition_en: 'meaning of every evening', example: 'We have dinner together every evening and talk about our day.' },
    'for us': { word: 'for us', pronunciation: '/for us/', definition_vi: 'cho chúng tôi', definition_en: 'meaning of for us', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'funny father': { word: 'funny father', pronunciation: '/funny father/', definition_vi: 'bố vui nhộn', definition_en: 'meaning of funny father', example: 'My funny father always tells jokes that make the whole family laugh.' },
    'have dinner': { word: 'have dinner', pronunciation: '/have dinner/', definition_vi: 'ăn tối', definition_en: 'meaning of have dinner', example: 'At 7 o\'clock, I have dinner with my family.' },
    'helps me with': { word: 'helps me with', pronunciation: '/helps me with/', definition_vi: 'giúp tôi với', definition_en: 'meaning of helps me with', example: 'He helps me with homework.' },
    'in the park': { word: 'in the park', pronunciation: '/in the park/', definition_vi: 'trong công viên', definition_en: 'meaning of in the park', example: 'Last Sunday, the children had a picnic in the park.' },
    'little sister': { word: 'little sister', pronunciation: '/little sister/', definition_vi: 'em gái', definition_en: 'meaning of little sister', example: 'My little sister always follows me around the house.' },
    'lovely mother': { word: 'lovely mother', pronunciation: '/lovely mother/', definition_vi: 'mẹ yêu dấu', definition_en: 'meaning of lovely mother', example: 'My lovely mother reads me a bedtime story every single night.' },
    'makes food': { word: 'makes food', pronunciation: '/makes food/', definition_vi: 'nấu đồ ăn', definition_en: 'meaning of makes food', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'my family': { word: 'my family', pronunciation: '/my family/', definition_vi: 'my gia đình', definition_en: 'Key collocation: my family', example: 'Natural usage of \'my family\' in sentence context.' },
    'plays with me': { word: 'plays with me', pronunciation: '/plays with me/', definition_vi: 'chơi với tôi', definition_en: 'meaning of plays with me', example: 'He plays with me in the park.' },
    'talk about': { word: 'talk about', pronunciation: '/talk about/', definition_vi: 'nói về', definition_en: 'meaning of talk about', example: 'We talk about our day together at dinner.' },
    'to be with': { word: 'to be with', pronunciation: '/to be with/', definition_vi: 'được ở cùng với', definition_en: 'to stay together with someone', example: 'I am happy to be with my family.' },
    'work together': { word: 'work together', pronunciation: '/work together/', definition_vi: 'làm việc cùng nhau', definition_en: 'meaning of work together', example: 'We work together.' }
};
