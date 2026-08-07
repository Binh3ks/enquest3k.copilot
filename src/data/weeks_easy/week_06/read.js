export default {
  title: "My Toy Hunt",
  image_url: "/images/week6/read_cover_w06.jpg",
  audio_url: "/audio/week6_easy/read_explore_main.mp3",
  content_en: "Today I **play a game**. I **look for** my **toy car**. I **look on** the floor. It is not there! I **look in** the box. No toy! **My friend** helps me. He **looks under** the desk. He finds it! The **toy car** is **under the desk**! Now I **look for** my ball. It is **next to** the door. Now we play **hide and seek**. I **hide my ball** **in the box**. **My friend** **hides his toy** **next to** the window. We **seek them** again. This game is **so much** fun!",
  content_vi: "Hôm nay tôi chơi trò chơi. Tôi tìm xe ô tô đồ chơi của mình. Tôi nhìn trên sàn. Nó không ở đó! Tôi nhìn trong hộp. Không có đồ chơi! Bạn tôi giúp tôi. Cậu ấy nhìn dưới bàn. Cậu ấy tìm thấy nó! Xe ô tô đồ chơi ở dưới bàn! Tiếp theo tôi tìm quả bóng của mình. Nó ở bên cạnh cửa. Bây giờ chúng tôi chơi trốn tìm. Tôi giấu quả bóng trong hộp. Bạn tôi giấu đồ chơi của cậu ấy bên cạnh cửa sổ. Chúng tôi tìm chúng lại. Trò chơi này vui quá!",
  comprehension_questions: [
    { id: 1, question_en: "Where is the toy car?", answer: ["under the desk", "desk"], clue_statement: "The toy car is under the desk.", hint_en: "Below the table...", hint_vi: "Dưới bàn..." },
    { id: 2, question_en: "Where is the ball?", answer: ["next to the door", "door"], clue_statement: "The ball is next to the door.", hint_en: "Beside the entrance...", hint_vi: "Bên cạnh cửa..." },
    { id: 3, question_en: "What game do they play?", answer: ["hide and seek", "hiding game", "seeking"], clue_statement: "They play hide and seek.", hint_en: "A game about hiding...", hint_vi: "Trò chơi về ẩn nấp..." },
    { id: 4, question_en: "Where do I look?", answer: ["floor", "on the floor"], clue_statement: "I look on the floor.", hint_en: "A place...", hint_vi: "Một nơi..." }
  ],
  question: {
    text_en: "Where do you hide your toys? What games do you like?",
    text_vi: "Bạn giấu đồ chơi ở đâu? Bạn thích trò chơi gì?",
    min_words: 25,
    hint_en: "Talk about your favorite hiding places...",
    hint_vi: "Nói về nơi ẩn nấp yêu thích của bạn..."
  }
};

export const chunk_focus = [
  "play a game",
  "look for",
  "toy car",
  "look on",
  "look in",
  "My friend",
  "looks under",
  "under the desk",
  "next to",
  "hide and seek",
  "hide my ball",
  "in the box",
  "hides his toy",
  "seek them",
  "so much"
];

export const dictionary = {
    'My friend': { word: 'My friend', pronunciation: '/my friend/', definition_vi: '(cụm từ: my friend)', definition_en: 'Multi-word phrase: my friend', example: 'Use of \'my friend\' in natural context.' },
    'hide and seek': { word: 'hide and seek', pronunciation: '/hide and seek/', definition_vi: 'trốn tìm', definition_en: 'meaning of hide and seek', example: 'She hide and seek with her friends after school.' },
    'hide my ball': { word: 'hide my ball', pronunciation: '/hide my ball/', definition_vi: 'giấu bóng', definition_en: 'meaning of hide my ball', example: 'I hide my ball in the box.' },
    'hides his toy': { word: 'hides his toy', pronunciation: '/hides his toy/', definition_vi: 'giấu đồ chơi', definition_en: 'meaning of hides his toy', example: 'My friend hides his toy next to the window.' },
    'in the box': { word: 'in the box', pronunciation: '/in the box/', definition_vi: 'trong hộp', definition_en: 'meaning of in the box', example: 'I look in the box.' },
    'look for': { word: 'look for', pronunciation: '/look for/', definition_vi: 'tìm kiếm', definition_en: 'meaning of look for', example: 'My friends and I look for hidden treasure.' },
    'look in': { word: 'look in', pronunciation: '/look in/', definition_vi: 'nhìn vào', definition_en: 'meaning of look in', example: 'In the kitchen, I open the cabinet and look in the fridge.' },
    'look on': { word: 'look on', pronunciation: '/look on/', definition_vi: 'nhìn, xem', definition_en: 'meaning of look on', example: 'I look on the floor.' },
    'looks under': { word: 'looks under', pronunciation: '/looks under/', definition_vi: 'nhìn dưới', definition_en: 'meaning of looks under', example: 'He looks under the desk.' },
    'next to': { word: 'next to', pronunciation: '/next to/', definition_vi: 'bên cạnh', definition_en: 'meaning of next to', example: 'There is a ruler next to the pen.' },
    'play a game': { word: 'play a game', pronunciation: '/play a game/', definition_vi: '(cụm từ: play a game)', definition_en: 'Multi-word phrase: play a game', example: 'Use of \'play a game\' in natural context.' },
    'seek them': { word: 'seek them', pronunciation: '/seek them/', definition_vi: 'tìm chúng', definition_en: 'meaning of seek them', example: 'She seek them with her friends after school.' },
    'so much': { word: 'so much', pronunciation: '/so much/', definition_vi: '(cụm từ: so much)', definition_en: 'Multi-word phrase: so much', example: 'Use of \'so much\' in natural context.' },
    'toy car': { word: 'toy car', pronunciation: '/toy car/', definition_vi: 'xe đồ chơi', definition_en: 'Multi-word phrase: toy car', example: 'The phrase \'toy car\' is commonly used in conversation.' },
    'under the desk': { word: 'under the desk', pronunciation: '/under the desk/', definition_vi: 'dưới bàn', definition_en: 'meaning of under the desk', example: 'The toy car is under the desk!' }
};
