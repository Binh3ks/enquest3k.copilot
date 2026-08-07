export default {
  title: "The Treasure Hunt",
  image_url: "/images/week6/read_cover_w06.jpg",
  audio_url: "/audio/week6/read_explore_main.mp3",
  content_en: "Today is **treasure hunt** day! **My friends** and I **look for** **hidden treasure**. I **look on the floor**. No treasure there! I **look in the box**. Nothing! **My friend** finds a clue! The clue says: 'Look **next to** the window.' We run to the window. **There is** **another clue** **on the wall**! It says: 'The treasure is **in the room**. Look **under the desk**.' We **look under** the **big desk**. We **find it**! A box full of gold coins! The treasure is ours! We are happy. **Hide and seek** is fun. Hunting for treasure makes us **work together**. **Next time**, I will hide the treasure **next to** the door!",
  content_vi: "Hôm nay là ngày săn kho báu! Bạn bè tôi và tôi tìm kiếm kho báu ẩn giấu. Tôi nhìn dưới bàn. Không có kho báu ở đó! Tôi nhìn trên sàn. Không có gì! Bạn tôi nhìn trong hộp. Cậu ấy tìm thấy một manh mối! Manh mối nói: 'Hãy nhìn bên cạnh cửa sổ.' Chúng tôi chạy đến cửa sổ. Có một manh mối khác trên tường! Nó nói: 'Kho báu ở trong phòng. Hãy nhìn dưới thứ gì đó lớn.' Chúng tôi nhìn dưới cái bàn lớn. Chúng tôi tìm thấy nó! Một hộp đầy tiền vàng! Kho báu là của chúng tôi! Chúng tôi vui lắm. Trốn tìm thật vui. Săn tìm kho báu khiến chúng tôi làm việc cùng nhau. Lần sau, tôi sẽ giấu kho báu bên cạnh cửa ra vào!",
  comprehension_questions: [
    { id: 1, question_en: "What are the children looking for?", answer: ["hidden treasure", "treasure", "gold coins"], clue_statement: "The children are looking for hidden treasure.", hint_en: "Something valuable...", hint_vi: "Thứ gì đó quý giá..." },
    { id: 2, question_en: "Where did they find the first clue?", answer: ["in the box", "box"], clue_statement: "They find the first clue in the box.", hint_en: "A container...", hint_vi: "Một cái hộp..." },
    { id: 3, question_en: "Where was the treasure hiding?", answer: ["under the big desk", "under the desk", "desk"], clue_statement: "Under the big desk.", hint_en: "Below something you work on...", hint_vi: "Dưới thứ bạn làm việc trên đó..." },
    { id: 4, question_en: "Where do I look?", answer: ["on the floor", "floor"], clue_statement: "I look on the floor.", hint_en: "A place...", hint_vi: "Một nơi..." },
    { id: 5, question_en: "What is on the wall?", answer: ["another clue", "There is another clue"], clue_statement: "There is another clue on the wall.", hint_en: "Look on the wall...", hint_vi: "Nhìn trên tường..." }
  ],
  question: {
    text_en: "Where do you hide things? What games do you play with friends?",
    text_vi: "Bạn giấu đồ ở đâu? Bạn chơi trò chơi gì với bạn bè?",
    min_words: 30,
    hint_en: "Talk about your favorite hiding places and games...",
    hint_vi: "Nói về nơi ẩn nấp yêu thích và trò chơi của bạn..."
  }
};

export const chunk_focus = [
  "treasure hunt",
  "My friends",
  "look for",
  "hidden treasure",
  "look on the floor",
  "look in the box",
  "My friend",
  "next to",
  "There is",
  "another clue",
  "on the wall",
  "in the room",
  "under the desk",
  "look under",
  "big desk",
  "find it",
  "Hide and seek",
  "work together",
  "Next time"
];

export const dictionary = {
    'Hide and seek': { word: 'Hide and seek', pronunciation: '/hide and seek/', definition_vi: 'trốn tìm', definition_en: 'meaning of hide and seek', example: 'She hide and seek with her friends after school.' },
    'My friend': { word: 'My friend', pronunciation: '/my friend/', definition_vi: 'cụm từ vựng: my friend', definition_en: 'Collocation: my friend', example: 'The students learned \'my friend\' in their English lesson.' },
    'My friends': { word: 'My friends', pronunciation: '/my friends/', definition_vi: 'my những người bạn', definition_en: 'Key collocation: my friends', example: 'Natural usage of \'my friends\' in sentence context.' },
    'Next time': { word: 'Next time', pronunciation: '/next time/', definition_vi: 'Lần sau', definition_en: 'meaning of next time', example: 'Next time, I will hide the treasure next to the door!' },
    'There is': { word: 'There is', pronunciation: '/there is/', definition_vi: 'có (một)', definition_en: 'meaning of there is', example: 'There is a big house on the hill.' },
    'another clue': { word: 'another clue', pronunciation: '/another clue/', definition_vi: 'một manh mối khác', definition_en: 'Multi-word phrase: another clue', example: 'The phrase \'another clue\' is commonly used in conversation.' },
    'big desk': { word: 'big desk', pronunciation: '/big desk/', definition_vi: 'cái bàn lớn', definition_en: 'Multi-word phrase: big desk', example: 'The phrase \'big desk\' is commonly used in conversation.' },
    'find it': { word: 'find it', pronunciation: '/find it/', definition_vi: 'tìm thấy nó', definition_en: 'meaning of find it', example: 'We find it!' },
    'hidden treasure': { word: 'hidden treasure', pronunciation: '/hidden treasure/', definition_vi: 'kho báu giấu', definition_en: 'Multi-word phrase: hidden treasure', example: 'The phrase \'hidden treasure\' is commonly used in conversation.' },
    'in the room': { word: 'in the room', pronunciation: '/in the room/', definition_vi: 'trong phòng', definition_en: 'meaning of in the room', example: 'It says: \'The treasure is in the room.' },
    'look for': { word: 'look for', pronunciation: '/look for/', definition_vi: 'tìm kiếm', definition_en: 'meaning of look for', example: 'My friends and I look for hidden treasure.' },
    'look in the box': { word: 'look in the box', pronunciation: '/look in the box/', definition_vi: 'nhìn trong hộp', definition_en: 'meaning of look in the box', example: 'I look in the box.' },
    'look on the floor': { word: 'look on the floor', pronunciation: '/look on the floor/', definition_vi: 'nhìn trên sàn', definition_en: 'meaning of look on the floor', example: 'Today is treasure hunt day! My friends and I look for hidden treasure. I look on the floor. No treasure there! I look in the box. Nothing!' },
    'look under': { word: 'look under', pronunciation: '/look under/', definition_vi: 'nhìn bên dưới', definition_en: 'meaning of look under', example: 'This is an example: look under.' },
    'next to': { word: 'next to', pronunciation: '/next to/', definition_vi: 'bên cạnh', definition_en: 'meaning of next to', example: 'There is a ruler next to the pen.' },
    'on the wall': { word: 'on the wall', pronunciation: '/ɒn ðə wɔːl/', definition_vi: 'trên tường', definition_en: 'English collocation / phrase: on the wall', example: 'There is a beautiful picture on the wall.' },
    'treasure hunt': { word: 'treasure hunt', pronunciation: '/treasure hunt/', definition_vi: 'săn kho báu', definition_en: 'Multi-word phrase: treasure hunt', example: 'The phrase \'treasure hunt\' is commonly used in conversation.' },
    'under the desk': { word: 'under the desk', pronunciation: '/under the desk/', definition_vi: 'dưới bàn', definition_en: 'meaning of under the desk', example: 'The toy car is under the desk!' },
    'work together': { word: 'work together', pronunciation: '/work together/', definition_vi: 'làm việc cùng nhau', definition_en: 'meaning of work together', example: 'We work together.' }
};
