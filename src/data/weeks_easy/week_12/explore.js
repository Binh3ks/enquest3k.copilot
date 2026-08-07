export default {
  title_en: "Hobbies I Love",
  title_vi: "So Thich Cua Toi",
  image_url: "/images/week12/explore_cover_w12.jpg",
  audio_url: "/audio/week12_easy/explore_main.mp3",
  content_en: `I have many hobbies! I sing **my favorite** songs **at home** **every day**. I **dance when** I **listen to** music. **On weekends**, I **ride my bike in** the park. Sometimes I **draw pictures of** **my family** and my pets. I like to **swim in the** summer. I also **cook simple food** with **my mom** **in the kitchen**. I love to try **new things** and **practice every day**! All my hobbies make me **happy and healthy**.`,
  content_vi: `Toi co nhieu so thich! Toi co the hat nhung bai hat yeu thich o nha. Toi co the nhay khi nghe nhac. Cuoi tuan, toi dap xe trong cong vien. Doi khi toi ve tranh gia dinh va thu cung. Toi thich boi vao mua he. Toi cung nau mon an don gian voi me. Toi thich thu nhung dieu moi va luyen tap moi ngay!`,
  check_questions: [
    {
      id: 1,
      question_en: "What can the writer do when listening to music?",
      answer: ["dance", "dancing"],
      hint_en: "Read the sentence about music...",
      hint_vi: "Doc cau ve nhac..."
    },
    {
      id: 2,
      question_en: "Where does the writer ride a bike?",
      answer: ["in the park", "park"],
      hint_en: "Read the sentence about weekends...",
      hint_vi: "Doc cau ve cuoi tuan..."
    },
    {
      id: 3,
      question_en: "Who does the writer cook food with?",
      answer: ["mom", "my mom", "mother"],
      hint_en: "Read the sentence about cooking...",
      hint_vi: "Doc cau ve nau an..."
    }
  ],
  question: {
    text_en: "What hobbies do YOU have? Write 2 or 3 things you can do.",
    text_vi: "Ban co so thich gi? Viet 2 hoac 3 dieu ban co the lam.",
    min_words: 20,
    hint_en: "I can sing... I can dance... I can...",
    hint_vi: "Toi co the hat... Toi co the nhay... Toi co the..."
  }
};

export const chunk_focus = [
  "my favorite",
  "at home",
  "every day",
  "dance when",
  "listen to",
  "On weekends",
  "ride my bike in",
  "draw pictures of",
  "my family",
  "swim in the",
  "cook simple food",
  "my mom",
  "in the kitchen",
  "new things",
  "practice every day",
  "happy and healthy"
];

export const dictionary = {
    'On weekends': { word: 'On weekends', pronunciation: '/on weekends/', definition_vi: 'vào cuối tuần', definition_en: 'meaning of on weekends', example: 'This is an example: on weekends.' },
    'at home': { word: 'at home', pronunciation: '/at home/', definition_vi: 'ở nhà', definition_en: 'meaning of at home', example: 'I have a happy jar at home.' },
    'cook simple food': { word: 'cook simple food', pronunciation: '/cook simple food/', definition_vi: 'nấu món ăn đơn giản', definition_en: 'English phrase: cook simple food', example: 'The phrase \'cook simple food\' means nấu món ăn đơn giản.' },
    'dance when': { word: 'dance when', pronunciation: '/dance when/', definition_vi: 'nhảy khi', definition_en: 'Multi-word phrase: dance when', example: 'The phrase \'dance when\' is commonly used in conversation.' },
    'draw pictures of': { word: 'draw pictures of', pronunciation: '/draw pictures of/', definition_vi: 'vẽ những bức tranh về', definition_en: 'English phrase: draw pictures of', example: 'The phrase \'draw pictures of\' means vẽ những bức tranh về.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'happy and healthy': { word: 'happy and healthy', pronunciation: '/happy and healthy/', definition_vi: 'vui vẻ và khỏe mạnh', definition_en: 'feeling good and in good health', example: 'They stayed happy and healthy all year long.' },
    'in the kitchen': { word: 'in the kitchen', pronunciation: '/in the kitchen/', definition_vi: 'trong bếp', definition_en: 'meaning of in the kitchen', example: 'In the kitchen, I open the cabinet and look in the fridge.' },
    'listen to': { word: 'listen to', pronunciation: '/listen to/', definition_vi: 'listen đến', definition_en: 'Key collocation: listen to', example: 'Natural usage of \'listen to\' in sentence context.' },
    'my family': { word: 'my family', pronunciation: '/my family/', definition_vi: 'my gia đình', definition_en: 'Key collocation: my family', example: 'Natural usage of \'my family\' in sentence context.' },
    'my favorite': { word: 'my favorite', pronunciation: '/my favorite/', definition_vi: 'my yêu thích', definition_en: 'Key collocation: my favorite', example: 'Natural usage of \'my favorite\' in sentence context.' },
    'my mom': { word: 'my mom', pronunciation: '/my mom/', definition_vi: 'cụm từ vựng: my mom', definition_en: 'Collocation: my mom', example: 'The students learned \'my mom\' in their English lesson.' },
    'new things': { word: 'new things', pronunciation: '/new things/', definition_vi: 'những thứ mới', definition_en: 'Multi-word phrase: new things', example: 'The phrase \'new things\' is commonly used in conversation.' },
    'practice every day': { word: 'practice every day', pronunciation: '/practice every day/', definition_vi: 'luyện tập mỗi ngày', definition_en: 'meaning of practice every day', example: 'This is an example: practice every day.' },
    'ride my bike in': { word: 'ride my bike in', pronunciation: '/ride my bike in/', definition_vi: 'ride my bike trong', definition_en: 'Key collocation: ride my bike in', example: 'Natural usage of \'ride my bike in\' in sentence context.' },
    'swim in the': { word: 'swim in the', pronunciation: '/swim in the/', definition_vi: 'swim trong the', definition_en: 'Key collocation: swim in the', example: 'Natural usage of \'swim in the\' in sentence context.' }
};
