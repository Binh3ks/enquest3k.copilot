export default {
  title_en: "Fun Weekend Places",
  title_vi: "Những Nơi Cuối Tuần Vui",
  image_url: "/images/week11/explore_cover_w11.jpg",
  audio_url: "/audio/week11_easy/explore_main_easy.mp3",
  content_en: "Children like to **go to** **fun places**! The park is a **fun place**. Children **play at the park**. They run and jump! The playground is fun too. At the playground, you can swing and slide! The library is a **quiet place**. You **read books** **at the library**. Books are fun! People **go to the store** to **buy things**. You can **buy food** and toys **at the store**! The zoo is exciting! You can see animals **at the zoo**. **There are** lions and monkeys! **Some people** eat at restaurants. The food is yummy! Children **go to school** **to learn** and play. Every place is special!",
  content_vi: "Trẻ em thích đến những nơi vui! Công viên là một nơi vui. Trẻ em chơi ở công viên. Chúng chạy và nhảy! Sân chơi cũng vui. Ở sân chơi, bạn có thể đánh xích đu và trượt! Thư viện là một nơi yên tĩnh. Bạn đọc sách ở thư viện. Sách rất vui! Mọi người đi cửa hàng để mua đồ. Bạn có thể mua thức ăn và đồ chơi ở cửa hàng! Sở thú thật thú vị! Bạn có thể thấy động vật ở sở thú. Có sư tử và khỉ! Một số người ăn ở nhà hàng. Đồ ăn ngon! Trẻ em đi học để học và chơi. Mỗi nơi đều đặc biệt!",
  check_questions: [
    {
      id: 1,
      question_en: "What do children do at the park?",
      answer: ["play", "run jump", "run and jump"],
      hint_en: "They have fun...",
      hint_vi: "Chúng vui chơi..."
    },
    {
      id: 2,
      question_en: "Where do you read books?",
      answer: ["library", "at the library", "the library"],
      hint_en: "A quiet place...",
      hint_vi: "Một nơi yên tĩnh..."
    },
    {
      id: 3,
      question_en: "What can you see at the zoo?",
      answer: ["animals", "lions monkeys", "lions", "monkeys"],
      hint_en: "Living things...",
      hint_vi: "Sinh vật..."
    },
    {
      id: 4,
      question_en: "Where do you buy things?",
      answer: ["store", "at the store", "the store"],
      hint_en: "A place to shop...",
      hint_vi: "Nơi mua sắm..."
    },
    {
      id: 5,
      question_en: "What word do we use with places? (I play ___ the park)",
      answer: ["at"],
      hint_en: "A little word...",
      hint_vi: "Một từ nhỏ..."
    }
  ],
  question: {
    text_en: "Which place do you like?",
    text_vi: "Bạn thích nơi nào?",
    min_words: 20,
    hint_en: "Tell me about your favorite place...",
    hint_vi: "Nói về nơi yêu thích..."
  }
};

export const chunk_focus = [
  "go to",
  "fun places",
  "fun place",
  "play at the park",
  "quiet place",
  "read books",
  "at the library",
  "go to the store",
  "buy things",
  "buy food",
  "at the store",
  "at the zoo",
  "There are",
  "Some people",
  "go to school",
  "to learn"
];

export const dictionary = {
    'Some people': { word: 'Some people', pronunciation: '/some people/', definition_vi: '(cụm từ: some people)', definition_en: 'Multi-word phrase: some people', example: 'Use of \'some people\' in natural context.' },
    'There are': { word: 'There are', pronunciation: '/there are/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there are', example: 'In my classroom, there are twenty desks and one big whiteboard.' },
    'at the library': { word: 'at the library', pronunciation: '/at the library/', definition_vi: 'ở thư viện', definition_en: 'meaning of at the library', example: 'I read a book at the library.' },
    'at the store': { word: 'at the store', pronunciation: '/at the store/', definition_vi: 'ở cửa hàng', definition_en: 'meaning of at the store', example: 'We buy food at the store.' },
    'at the zoo': { word: 'at the zoo', pronunciation: '/at the zoo/', definition_vi: 'ở sở thú', definition_en: 'meaning of at the zoo', example: 'We saw many animals at the zoo on Sunday.' },
    'buy food': { word: 'buy food', pronunciation: '/buy food/', definition_vi: 'mua đồ ăn', definition_en: 'meaning of buy food', example: 'We buy food at the supermarket.' },
    'buy things': { word: 'buy things', pronunciation: '/buy things/', definition_vi: 'buy things', definition_en: 'meaning of buy things', example: 'This is an example: buy things.' },
    'fun place': { word: 'fun place', pronunciation: '/fun place/', definition_vi: 'nơi vui vẻ', definition_en: 'meaning of fun place', example: 'This is an example: fun place.' },
    'fun places': { word: 'fun places', pronunciation: '/fun places/', definition_vi: 'những nơi vui vẻ', definition_en: 'enjoyable locations', example: 'Children like to go to fun places like the park and the playground.' },
    'go to': { word: 'go to', pronunciation: '/go to/', definition_vi: 'đến, đi đến', definition_en: 'meaning of go to', example: 'After school, I go to the library to read.' },
    'go to school': { word: 'go to school', pronunciation: '/go to school/', definition_vi: 'đi học', definition_en: 'meaning of go to school', example: 'I also go to school on Monday to read and learn.' },
    'go to the store': { word: 'go to the store', pronunciation: '/go to the store/', definition_vi: 'đi đến cửa hàng', definition_en: 'meaning of go to the store', example: 'This is an example: go to the store.' },
    'play at the park': { word: 'play at the park', pronunciation: '/play at the park/', definition_vi: 'chơi ở công viên', definition_en: 'meaning of play at the park', example: 'I play at the park with my friends.' },
    'quiet place': { word: 'quiet place', pronunciation: '/quiet place/', definition_vi: 'nơi yên tĩnh', definition_en: 'meaning of quiet place', example: 'This is an example: quiet place.' },
    'read books': { word: 'read books', pronunciation: '/read books/', definition_vi: 'đọc sách', definition_en: 'meaning of read books', example: 'I read books before bed.' },
    'to learn': { word: 'to learn', pronunciation: '/to learn/', definition_vi: 'để học', definition_en: 'meaning of to learn', example: 'I want to learn English every day.' }
};
