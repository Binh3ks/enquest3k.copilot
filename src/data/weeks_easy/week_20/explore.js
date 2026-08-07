export default {
  title_en: "Old Towns and New Towns",
  title_vi: "Thị Trấn Cũ và Thị Trấn Mới",
  image_url: "/images/week20/explore_cover_w20.jpg",
  audio_url: "/audio/week20_easy/explore_main.mp3",

  content_en: `
 **Look at** an **old town**! **Long ago**, people **went to the market** to **buy food** and things. **There were** trees on every road. People walked under the trees. **There was** a **bridge over** the river. People used the bridge to **cross the river**.

 **There was** a temple **in the center of** the village. People **went to the temple** to pray. The temple was very beautiful.

 Now towns are different! **There are** **new buildings**. **There are** new roads. **There is** a **new bridge**. Some old places are gone.

 But some old places are still there! Old temples are **still standing**. They are **important to us**. They show us the past.

 Can you find an old place in your town? Is there an **old temple**? These are special. They are **part of our history**!
 `,

  content_vi: `
    Nhìn thị trấn cũ! Ngày xưa, người ta đến chợ để mua thực phẩm. Có cây trên mỗi đường. Người ta đi bộ dưới những cây đó. Có cầu bắc qua sông. Người ta dùng cầu để sang bờ bên kia.

    Có đền ở trung tâm làng. Người ta đến đền để cầu nguyện. Ngôi đền rất đẹp.

    Bây giờ thị trấn khác rồi! Có tòa nhà mới. Có đường mới. Có cầu mới. Một số nơi cũ đã biến mất.

    Nhưng một số nơi vẫn còn đó! Đền cũ vẫn còn đứng đó. Chúng quan trọng với chúng ta. Chúng cho ta thấy quá khứ.

    Bạn có thể tìm nơi cũ trong thị trấn của bạn không? Có đền cũ không? Những nơi này đặc biệt. Chúng là một phần lịch sử của chúng ta!
  `,

  check_questions: [
    {
      id: 1,
      question_en: "What was in every old town?",
      question_vi: "Ở mỗi thị trấn cũ có gì?",
      options_en: ["A. A bridge", "B. A market", "C. A road", "D. A building"],
      options_vi: ["A. Một cây cầu", "B. Một khu chợ", "C. Một con đường", "D. Một tòa nhà"],
      correct_answer: "B",
      answer: ["A market", "market", "B"],
      explanation_vi: "Ngày xưa, có một khu chợ ở mỗi thị trấn.",
      audio_url: "/audio/week20_easy/explore_q1.mp3"
    },
    {
      id: 2,
      question_en: "What is still standing in old towns?",
      question_vi: "Cái gì vẫn còn đứng ở thị trấn cũ?",
      options_en: ["A. New buildings", "B. Old trees", "C. Old temples", "D. New roads"],
      options_vi: ["A. Tòa nhà mới", "B. Cây cũ", "C. Đền cũ", "D. Đường mới"],
      correct_answer: "C",
      answer: ["Old temples", "temples", "C"],
      explanation_vi: "Các đền cũ vẫn còn đứng đó. Chúng cho ta thấy quá khứ.",
      audio_url: "/audio/week20_easy/explore_q2.mp3"
    }
  ]
};

export const chunk_focus = [
  "Look at",
  "old town",
  "Long ago",
  "went to the market",
  "buy food",
  "There were",
  "There was",
  "bridge over",
  "cross the river",
  "in the center of",
  "went to",
  "There are",
  "new buildings",
  "There is",
  "new bridge",
  "still standing",
  "important to us",
  "old temple",
  "part of our history"
];

export const dictionary = {
    'Long ago': { word: 'Long ago', pronunciation: '/long ago/', definition_vi: 'lâu rồi', definition_en: 'meaning of long ago', example: 'This is an example: long ago.' },
    'Look at': { word: 'Look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'There are': { word: 'There are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'English collocation / phrase: there are', example: 'There are forty students in our class.' },
    'There is': { word: 'There is', pronunciation: '/there is/', definition_vi: 'có (một)', definition_en: 'meaning of there is', example: 'There is a big house on the hill.' },
    'There was': { word: 'There was', pronunciation: '/there was/', definition_vi: 'có (nghĩa tồn tại)', definition_en: 'meaning of there was', example: 'There was a big market near the river.' },
    'There were': { word: 'There were', pronunciation: '/there were/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there were', example: 'There were tall trees along the road.' },
    'bridge over': { word: 'bridge over', pronunciation: '/bridge over/', definition_vi: 'cầu bắc qua', definition_en: 'Multi-word phrase: bridge over', example: 'The phrase \'bridge over\' is commonly used in conversation.' },
    'buy food': { word: 'buy food', pronunciation: '/buy food/', definition_vi: 'mua đồ ăn', definition_en: 'meaning of buy food', example: 'We buy food at the supermarket.' },
    'cross the river': { word: 'cross the river', pronunciation: '/cross the river/', definition_vi: 'băng qua sông', definition_en: 'go from one side of the river to the other', example: 'People used the bridge to cross the river.' },
    'important to us': { word: 'important to us', pronunciation: '/important to us/', definition_vi: 'quan trọng đến us', definition_en: 'Key collocation: important to us', example: 'Natural usage of \'important to us\' in sentence context.' },
    'in the center of': { word: 'in the center of', pronunciation: '/in the center of/', definition_vi: 'trong center of', definition_en: 'ESL phrase: in the center of', example: 'The students practiced using \'in the center of\' in class.' },
    'new bridge': { word: 'new bridge', pronunciation: '/new bridge/', definition_vi: 'cây cầu mới', definition_en: 'Multi-word phrase: new bridge', example: 'The phrase \'new bridge\' is commonly used in conversation.' },
    'new buildings': { word: 'new buildings', pronunciation: '/new buildings/', definition_vi: 'những tòa nhà mới', definition_en: 'Multi-word phrase: new buildings', example: 'The phrase \'new buildings\' is commonly used in conversation.' },
    'old temple': { word: 'old temple', pronunciation: '/old temple/', definition_vi: 'đền cổ', definition_en: 'meaning of old temple', example: 'The old temple at the top of the hill was built over three hundred years ago.' },
    'old town': { word: 'old town', pronunciation: '/old town/', definition_vi: 'thị trấn cổ', definition_en: 'Multi-word phrase: old town', example: 'The phrase \'old town\' is commonly used in conversation.' },
    'part of our history': { word: 'part of our history', pronunciation: '/part of our history/', definition_vi: 'một phần lịch sử của chúng ta', definition_en: 'something that belongs to our shared past', example: 'Old buildings are part of our history.' },
    'still standing': { word: 'still standing', pronunciation: '/still standing/', definition_vi: 'cụm từ vựng: still standing', definition_en: 'Collocation: still standing', example: 'The students learned \'still standing\' in their English lesson.' },
    'went to': { word: 'went to', pronunciation: '/went to/', definition_vi: 'đến (nơi nào đó)', definition_en: 'meaning of went to', example: 'After breakfast, the family went to the park for a morning walk.' },
    'went to the market': { word: 'went to the market', pronunciation: '/went to the market/', definition_vi: 'đã đi đến chợ', definition_en: 'went to a market to buy things', example: 'Long ago, people went to the market to buy food.' }
};
