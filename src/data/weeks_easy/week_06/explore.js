export default {
  title_en: "Playing Hide and Seek",
  title_vi: "Chơi trốn tìm",
  image_url: "/images/week6/explore_cover_w06.jpg",
  audio_url: "/audio/week6_easy/explore_main.mp3",
  content_en: "Do you like to play **hide and seek**? This is a **fun game**! **One person** closes their eyes. The other kids hide. Some hide in a box. Some hide **under the desk**. Some hide **next to** the door. Some hide **on the floor** behind the chair. When you finish counting, you seek the kids! You **look in the box**. You **look under** the desk. You look **next to** the window. This game is a hunt for friends! Where do you hide? Where do you seek? **Hide and seek** is fun!",
  content_vi: "Bạn có thích chơi trốn tìm không? Đây là trò chơi vui! Một người nhắm mắt. Những đứa trẻ khác trốn. Một số trốn trong hộp. Một số trốn dưới bàn. Một số trốn bên cạnh cửa. Một số trốn trên sàn phía sau ghế. Khi bạn đếm xong, bạn tìm các bạn! Bạn nhìn trong hộp. Bạn nhìn dưới bàn. Bạn nhìn bên cạnh cửa sổ. Trò chơi này là săn tìm bạn bè! Bạn trốn ở đâu? Bạn tìm ở đâu? Trốn tìm thật vui!",
  check_questions: [
    {
      id: 1,
      question_en: "What game do you play?",
      answer: ["hide and seek", "hide seek", "hiding"],
      hint_en: "You hide and then...",
      hint_vi: "Bạn trốn và sau đó..."
    },
    {
      id: 2,
      question_en: "Where can you hide?",
      answer: ["in a box", "under the desk", "next to the door", "behind the chair"],
      hint_en: "In, under, next to...",
      hint_vi: "Trong, dưới, bên cạnh..."
    },
    {
      id: 3,
      question_en: "Is hide and seek fun?",
      answer: ["yes", "yes it is", "fun"],
      hint_en: "Yes...",
      hint_vi: "Có..."
    }
  ],
  question: {
    text_en: "Where do you like to hide? Do you play hide and seek?",
    text_vi: "Bạn thích trốn ở đâu? Bạn có chơi trốn tìm không?",
    min_words: 20,
    hint_en: "I like to hide...",
    hint_vi: "Tôi thích trốn..."
  }
};

export const chunk_focus = [
  "hide and seek",
  "fun game",
  "One person",
  "under the desk",
  "next to",
  "on the floor",
  "look in the box",
  "look under",
  "Hide and seek"
];

export const dictionary = {
    'Hide and seek': { word: 'Hide and seek', pronunciation: '/hide and seek/', definition_vi: 'trốn tìm', definition_en: 'meaning of hide and seek', example: 'She hide and seek with her friends after school.' },
    'One person': { word: 'One person', pronunciation: '/one person/', definition_vi: 'một người', definition_en: 'Multi-word phrase: one person', example: 'Use of \'one person\' in natural context.' },
    'fun game': { word: 'fun game', pronunciation: '/fun game/', definition_vi: 'trò chơi vui', definition_en: 'Multi-word phrase: fun game', example: 'The phrase \'fun game\' is commonly used in conversation.' },
    'hide and seek': { word: 'hide and seek', pronunciation: '/hide and seek/', definition_vi: 'trốn tìm', definition_en: 'meaning of hide and seek', example: 'She hide and seek with her friends after school.' },
    'look in the box': { word: 'look in the box', pronunciation: '/look in the box/', definition_vi: 'nhìn trong hộp', definition_en: 'meaning of look in the box', example: 'I look in the box.' },
    'look under': { word: 'look under', pronunciation: '/look under/', definition_vi: 'nhìn bên dưới', definition_en: 'meaning of look under', example: 'This is an example: look under.' },
    'next to': { word: 'next to', pronunciation: '/next to/', definition_vi: 'bên cạnh', definition_en: 'meaning of next to', example: 'There is a ruler next to the pen.' },
    'on the floor': { word: 'on the floor', pronunciation: '/on the floor/', definition_vi: 'trên sàn', definition_en: 'meaning of on the floor', example: 'The room has a rug on the floor.' },
    'under the desk': { word: 'under the desk', pronunciation: '/under the desk/', definition_vi: 'dưới bàn', definition_en: 'meaning of under the desk', example: 'The toy car is under the desk!' }
};
