export default {
  title: "The Mystery House",
  image_url: "/images/week5/read_cover_w05.jpg",
  audio_url: "/audio/week5/read_explore_main.mp3",
  content_en: "**On the hill** **there is** a **big house**. It is a **mystery house**. Nobody knows what is inside. **One day**, I **open the door** slowly. Upstairs, **there is** **a nice bedroom**. I see a lamp **on the table** and a mirror **on the wall**. The room has a rug **on the floor**. Downstairs, I find **the living room**. **There is** a **big sofa** and many **shelves with books**. **In the kitchen**, I **open the cabinet carefully** and **look in** the fridge. **There is** food and drink inside! This **mystery house** has beautiful furniture. Now it is my **new home**. I love this **mystery house**!",
  content_vi: "Có một ngôi nhà lớn trên đồi. Đó là một ngôi nhà bí ẩn. Không ai biết bên trong có gì. Một ngày, tôi mở cửa. Ở lầu trên, có một phòng ngủ đẹp. Tôi thấy một chiếc đèn trên bàn và một tấm gương trên tường. Căn phòng có một tấm thảm trên sàn. Ở tầng dưới, tôi tìm thấy phòng khách. Có một chiếc ghế sofa lớn và nhiều kệ sách. Trong bếp, tôi mở tủ và nhìn vào tủ lạnh. Có thức ăn và đồ uống bên trong! Ngôi nhà bí ẩn này có đồ đạc đẹp. Bây giờ đây là ngôi nhà mới của tôi. Tôi yêu ngôi nhà bí ẩn này!",
  comprehension_questions: [
    { id: 1, question_en: "Where is the mystery house?", answer: ["on the hill", "hill"], clue_statement: "The mystery house is on the hill.", hint_en: "It's high up...", hint_vi: "Nó ở trên cao..." },
    { id: 2, question_en: "What is upstairs?", answer: ["a nice bedroom", "bedroom"], clue_statement: "Upstairs there is a nice bedroom.", hint_en: "Where you sleep...", hint_vi: "Nơi bạn ngủ..." },
    { id: 3, question_en: "What is in the kitchen?", answer: ["a cabinet and a fridge", "cabinet", "fridge"], clue_statement: "There is a cabinet and a fridge in the kitchen.", hint_en: "Things to store food...", hint_vi: "Đồ để cất giữ thức ăn..." },
    { id: 4, question_en: "What is on the hill?", answer: ["a big house", "There is a big house"], clue_statement: "There is a big house on the hill.", hint_en: "Look on the hill...", hint_vi: "Nhìn trên đồi..." },
    { id: 5, question_en: "What does the room have?", answer: ["a rug on the floor", "rug on the floor"], clue_statement: "The room has a rug on the floor.", hint_en: "Think about the room...", hint_vi: "Nghĩ về căn phòng..." }
  ],
  question: {
    text_en: "What rooms are in your house? What furniture do you have?",
    text_vi: "Ngôi nhà của bạn có những phòng nào? Bạn có đồ đạc gì?",
    min_words: 30,
    hint_en: "Talk about your bedroom, living room, kitchen...",
    hint_vi: "Nói về phòng ngủ, phòng khách, bếp của bạn..."
  }
};

export const chunk_focus = [
  "On the hill",
  "there is",
  "big house",
  "mystery house",
  "One day",
  "open the door",
  "a nice bedroom",
  "on the table",
  "on the wall",
  "on the floor",
  "the living room",
  "There is",
  "big sofa",
  "shelves with books",
  "In the kitchen",
  "open the cabinet carefully",
  "look in",
  "new home"
];

export const dictionary = {
    'In the kitchen': { word: 'In the kitchen', pronunciation: '/in the kitchen/', definition_vi: 'trong bếp', definition_en: 'meaning of in the kitchen', example: 'In the kitchen, I open the cabinet and look in the fridge.' },
    'On the hill': { word: 'On the hill', pronunciation: '/on the hill/', definition_vi: 'trên đồi', definition_en: 'located on a hill', example: 'There is a big house on the hill.' },
    'One day': { word: 'One day', pronunciation: '/one day/', definition_vi: 'một ngày', definition_en: 'on a particular day in the past or future', example: 'One day, I will travel to the moon.' },
    'There is': { word: 'There is', pronunciation: '/there is/', definition_vi: 'có (một)', definition_en: 'meaning of there is', example: 'There is a big house on the hill.' },
    'a nice bedroom': { word: 'a nice bedroom', pronunciation: '/a nice bedroom/', definition_vi: 'phòng ngủ đẹp', definition_en: 'meaning of a nice bedroom', example: 'Upstairs, there is a nice bedroom.' },
    'big house': { word: 'big house', pronunciation: '/big house/', definition_vi: 'ngôi nhà lớn', definition_en: 'Multi-word phrase: big house', example: 'The phrase \'big house\' is commonly used in conversation.' },
    'big sofa': { word: 'big sofa', pronunciation: '/big sofa/', definition_vi: 'sofa lớn', definition_en: 'meaning of big sofa', example: 'The family sat together on the big sofa to watch a film.' },
    'look in': { word: 'look in', pronunciation: '/look in/', definition_vi: 'nhìn vào', definition_en: 'meaning of look in', example: 'In the kitchen, I open the cabinet and look in the fridge.' },
    'mystery house': { word: 'mystery house', pronunciation: '/mystery house/', definition_vi: 'ngôi nhà bí ẩn', definition_en: 'meaning of mystery house', example: 'At the end of the road, there is an old mystery house that nobody visits.' },
    'new home': { word: 'new home', pronunciation: '/new home/', definition_vi: 'nhà mới', definition_en: 'Multi-word phrase: new home', example: 'The phrase \'new home\' is commonly used in conversation.' },
    'on the floor': { word: 'on the floor', pronunciation: '/on the floor/', definition_vi: 'trên sàn', definition_en: 'meaning of on the floor', example: 'The room has a rug on the floor.' },
    'on the table': { word: 'on the table', pronunciation: '/on the table/', definition_vi: '(cụm từ: on the table)', definition_en: 'Multi-word phrase: on the table', example: 'Use of \'on the table\' in natural context.' },
    'on the wall': { word: 'on the wall', pronunciation: '/on the wall/', definition_vi: 'trên tường', definition_en: 'meaning of on the wall', example: 'I see a lamp on the table and a mirror on the wall.' },
    'open the cabinet carefully': { word: 'open the cabinet carefully', pronunciation: '/open the cabinet carefully/', definition_vi: 'mở tủ cẩn thận', definition_en: 'meaning of open the cabinet carefully', example: 'The nurse told Sam to open the cabinet carefully so nothing fell out.' },
    'open the door': { word: 'open the door', pronunciation: '/open the door/', definition_vi: '(cụm từ: open the door)', definition_en: 'Multi-word phrase: open the door', example: 'Use of \'open the door\' in natural context.' },
    'shelves with books': { word: 'shelves with books', pronunciation: '/shelves with books/', definition_vi: 'kệ sách', definition_en: 'meaning of shelves with books', example: 'The library has tall shelves with books arranged neatly by colour and size.' },
    'the living room': { word: 'the living room', pronunciation: '/the living room/', definition_vi: 'phòng khách', definition_en: 'meaning of the living room', example: 'Downstairs, I find the living room.' },
    'there is': { word: 'there is', pronunciation: '/there is/', definition_vi: 'có (một)', definition_en: 'meaning of there is', example: 'There is a big house on the hill.' }
};
