export default {
  title_en: "Talents Around the World",
  title_vi: "Tai Nang Tren The Gioi",
  image_url: "/images/week12/explore_cover_w12.jpg",
  audio_url: "/audio/week12/explore_main.mp3",
  content_en: `People **around the world** have amazing talents! In Spain, children learn to dance flamenco with passion and energy. In Kenya, **many children** can **run long distances** **every day** — they practice very hard to **build their strength**. In Japan, students learn calligraphy and can draw beautiful characters with brushes. In Brazil, kids play football with incredible skill **from childhood**. In India, **young people** sing **classical music** beautifully in large concerts. People from all nations perform their special abilities **with pride**. Every culture has a different tradition of celebrating talent. **No matter where** you live, you can discover and develop your own **amazing abilities**!`,
  content_vi: `Con nguoi tren the gioi co nhung tai nang tuyet voi! O Tay Ban Nha, tre em hoc nhay flamenco voi dam me va nang luong. O Kenya, nhieu tre em co the chay duong dai moi ngay - chung luyen tap rat cham chi. O Nhat Ban, hoc sinh hoc thu phap va co the ve nhung chu dep. O Brazil, tre em choi bong da voi ky nang dang kinh ngac tu rat nho. O An Do, nguoi tre hat nhac co dien tuyet dep trong nhung buoi hoa nhac lon. Nguoi tu tat ca cac quoc gia bieu dien kha nang dac biet cua ho voi su tu hao. Moi nen van hoa co mot truyen thong khac nhau de ton vinh tai nang. Du ban song o dau, ban cung co the kham pha va phat trien nhung kha nang tuyet voi cua rieng minh!`,
  check_questions: [
    {
      id: 1,
      question_en: "Which country is famous for flamenco dancing?",
      answer: ["Spain"],
      hint_en: "This country is in Europe, famous for this special dance...",
      hint_vi: "Day la mot quoc gia o chau Au, noi tieng voi dieu nhay dac biet nay..."
    },
    {
      id: 2,
      question_en: "What do students in Japan practice with brushes?",
      answer: ["calligraphy", "drawing characters", "calligraphy and drawing"],
      hint_en: "In Japan, students use brushes to draw beautiful writing...",
      hint_vi: "O Nhat Ban, hoc sinh dung but long de ve chu dep..."
    },
    {
      id: 3,
      question_en: "What is the main message of this article?",
      answer: ["people everywhere have talents", "everyone has a talent", "people around the world have amazing talents", "talents"],
      hint_en: "Think about what the last sentence says...",
      hint_vi: "Hay nghi ve dieu cau cuoi muon noi..."
    }
  ],
  question: {
    text_en: "Which country and talent from the article interests you the most? Why?",
    text_vi: "Quoc gia va tai nang nao trong bai viet thu vi nhat doi voi ban? Tai sao?",
    min_words: 30,
    hint_en: "I am interested in... because... I think...",
    hint_vi: "Toi thich... vi... Toi nghi..."
  }
};

export const chunk_focus = [
  "around the world",
  "many children",
  "run long distances",
  "every day",
  "build their strength",
  "from childhood",
  "young people",
  "classical music",
  "with pride",
  "No matter where",
  "amazing abilities"
];

export const dictionary = {
    'No matter where': { word: 'No matter where', pronunciation: '/no matter where/', definition_vi: 'không quan trọng ở đâu', definition_en: 'meaning of no matter where', example: 'This is an example: no matter where.' },
    'amazing abilities': { word: 'amazing abilities', pronunciation: '/amazing abilities/', definition_vi: 'khả năng đáng kinh ngạc', definition_en: 'meaning of amazing abilities', example: 'This is an example: amazing abilities.' },
    'around the world': { word: 'around the world', pronunciation: '/around the world/', definition_vi: 'khắp thế giới', definition_en: 'meaning of around the world', example: 'This is an example: around the world.' },
    'build their strength': { word: 'build their strength', pronunciation: '/build their strength/', definition_vi: 'xây dựng sức mạnh của họ', definition_en: 'become stronger through practice', example: 'Running every day helps children build their strength.' },
    'classical music': { word: 'classical music', pronunciation: '/classical music/', definition_vi: 'nhạc cổ điển', definition_en: 'ESL phrase: classical music', example: 'The students practiced using \'classical music\' in class.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'from childhood': { word: 'from childhood', pronunciation: '/from childhood/', definition_vi: 'từ thời thơ ấu', definition_en: 'since someone was a child', example: 'She loved music from childhood.' },
    'many children': { word: 'many children', pronunciation: '/many children/', definition_vi: 'nhiều trẻ em', definition_en: 'Multi-word phrase: many children', example: 'The phrase \'many children\' is commonly used in conversation.' },
    'run long distances': { word: 'run long distances', pronunciation: '/run long distances/', definition_vi: 'chạy long distances', definition_en: 'English phrase: run long distances', example: 'The phrase \'run long distances\' means chạy long distances.' },
    'with pride': { word: 'with pride', pronunciation: '/with pride/', definition_vi: 'với niềm tự hào', definition_en: 'meaning of with pride', example: 'This is an example: with pride.' },
    'young people': { word: 'young people', pronunciation: '/young people/', definition_vi: 'người trẻ', definition_en: 'Multi-word phrase: young people', example: 'The phrase \'young people\' is commonly used in conversation.' }
};
