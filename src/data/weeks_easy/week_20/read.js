export default {
  title: "My Neighborhood",
  image_url: "/images/week20/read_cover_w20.jpg",
  audio_url: "/audio/week20_easy/read_main.mp3",
  content_en: "I live in a town. My town has changed! **Look at** this **old photo**. **There was** a **local market** near **my house**. **There were** **big trees** **on the road**. **There was** a **bridge over** the river. **There was** a temple **next to** the market. **There were** **small buildings** **near the road**. Now my town is different. **There is** a **new road**. **There are** **new buildings**. **There is** a **new bridge**. But the **old temple** is still there. My grandmother says, \"**There was** a village here before.\" Now it is a big town. The **new buildings** are tall and bright. The **old market** is gone. But the temple is still beautiful. It is our old history. I **love my town**!",
  content_vi: "Tôi sống ở một thị trấn. Thị trấn của tôi đã thay đổi! Nhìn ảnh cũ này. Có một chợ gần nhà tôi. Có nhiều cây lớn trên đường. Có một cầu bắc qua sông. Có một ngôi đền bên cạnh chợ. Có nhiều tòa nhà nhỏ gần đường. Bây giờ thị trấn của tôi khác rồi. Có một đường mới. Có nhiều tòa nhà mới. Có một cầu mới. Nhưng ngôi đền cũ vẫn còn đó. Bà tôi nói, 'Có một làng ở đây trước kia.' Bây giờ là một thị trấn lớn. Những tòa nhà mới cao và sáng. Chợ cũ không còn nữa. Nhưng ngôi đền vẫn đẹp. Đó là lịch sử cũ của chúng tôi. Tôi yêu thị trấn của tôi!",
  comprehension_questions: [
    { id: 1, question_en: "What was near the narrator's house?", answer: ["A market", "The market"], clue_statement: "There was a market near the house.", hint_en: "There was a...", hint_vi: "Có một..." },
    { id: 2, question_en: "What is still there today?", answer: ["The temple", "A temple"], clue_statement: "The temple is still there today.", hint_en: "The old ___ is still there.", hint_vi: "Ngôi ___ cũ vẫn còn..." },
    { id: 3, question_en: "How is the town now?", answer: ["Big", "Different", "A big town"], clue_statement: "The town is big now.", hint_en: "The town is now...", hint_vi: "Thị trấn bây giờ..." },
    { id: 4, question_en: "Where do I live?", answer: ["town", "in a town"], clue_statement: "I live in a town.", hint_en: "A place...", hint_vi: "Một nơi..." }
  ]
};

export const chunk_focus = [
  "Look at",
  "old photo",
  "There was",
  "local market",
  "my house",
  "There were",
  "big trees",
  "on the road",
  "bridge over",
  "next to",
  "small buildings",
  "near the road",
  "There is",
  "new road",
  "There are",
  "new buildings",
  "new bridge",
  "old temple",
  "old market",
  "love my town"
];

export const dictionary = {
    'Look at': { word: 'Look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'There are': { word: 'There are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'English collocation / phrase: there are', example: 'There are forty students in our class.' },
    'There is': { word: 'There is', pronunciation: '/there is/', definition_vi: 'có (một)', definition_en: 'meaning of there is', example: 'There is a big house on the hill.' },
    'There was': { word: 'There was', pronunciation: '/there was/', definition_vi: 'có (nghĩa tồn tại)', definition_en: 'meaning of there was', example: 'There was a big market near the river.' },
    'There were': { word: 'There were', pronunciation: '/there were/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there were', example: 'There were tall trees along the road.' },
    'big trees': { word: 'big trees', pronunciation: '/big trees/', definition_vi: 'những cây lớn', definition_en: 'Multi-word phrase: big trees', example: 'The phrase \'big trees\' is commonly used in conversation.' },
    'bridge over': { word: 'bridge over', pronunciation: '/bridge over/', definition_vi: 'cầu bắc qua', definition_en: 'Multi-word phrase: bridge over', example: 'The phrase \'bridge over\' is commonly used in conversation.' },
    'local market': { word: 'local market', pronunciation: '/local market/', definition_vi: 'chợ địa phương', definition_en: 'meaning of local market', example: 'Mum buys fresh vegetables at the local market every Saturday morning.' },
    'love my town': { word: 'love my town', pronunciation: '/love my town/', definition_vi: 'yêu thị trấn của tôi', definition_en: 'meaning of love my town', example: 'I love my town because I know every street and every friendly face.' },
    'my house': { word: 'my house', pronunciation: '/my house/', definition_vi: 'cụm từ vựng: my house', definition_en: 'Collocation: my house', example: 'The students learned \'my house\' in their English lesson.' },
    'near the road': { word: 'near the road', pronunciation: '/near the road/', definition_vi: 'gần đường', definition_en: 'meaning of near the road', example: 'The old oak tree stands near the road and gives shade in summer.' },
    'new bridge': { word: 'new bridge', pronunciation: '/new bridge/', definition_vi: 'cây cầu mới', definition_en: 'Multi-word phrase: new bridge', example: 'The phrase \'new bridge\' is commonly used in conversation.' },
    'new buildings': { word: 'new buildings', pronunciation: '/new buildings/', definition_vi: 'những tòa nhà mới', definition_en: 'Multi-word phrase: new buildings', example: 'The phrase \'new buildings\' is commonly used in conversation.' },
    'new road': { word: 'new road', pronunciation: '/new road/', definition_vi: 'con đường mới', definition_en: 'Multi-word phrase: new road', example: 'The phrase \'new road\' is commonly used in conversation.' },
    'next to': { word: 'next to', pronunciation: '/next to/', definition_vi: 'bên cạnh', definition_en: 'meaning of next to', example: 'There is a ruler next to the pen.' },
    'old market': { word: 'old market', pronunciation: '/old market/', definition_vi: 'chợ cũ', definition_en: 'Multi-word phrase: old market', example: 'The phrase \'old market\' is commonly used in conversation.' },
    'old photo': { word: 'old photo', pronunciation: '/old photo/', definition_vi: 'ảnh cũ', definition_en: 'Multi-word phrase: old photo', example: 'The phrase \'old photo\' is commonly used in conversation.' },
    'old temple': { word: 'old temple', pronunciation: '/old temple/', definition_vi: 'đền cổ', definition_en: 'meaning of old temple', example: 'The old temple at the top of the hill was built over three hundred years ago.' },
    'on the road': { word: 'on the road', pronunciation: '/on the road/', definition_vi: 'trên đường', definition_en: 'meaning of on the road', example: 'A group of workers were standing on the road directing the traffic.' },
    'small buildings': { word: 'small buildings', pronunciation: '/small buildings/', definition_vi: 'những tòa nhà nhỏ', definition_en: 'Multi-word phrase: small buildings', example: 'The phrase \'small buildings\' is commonly used in conversation.' }
};
