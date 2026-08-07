export default {
  title: "Exploring the City",
  image_url: "/images/week09/read_cover_w09.jpg",
  audio_url: "/audio/week09/read_explore_main.mp3",
  content_en: "Today I **visit the city**! I **walk on** a **busy street**. **There are** many **people and cars**. It is a **noisy place**. I **hear car horns** and **people talking**. I see a **tall building**. It is **very high**! It is a **modern building** with glass windows. A **yellow bus** **stops near** me. **Many people get** on the bus. The traffic is heavy. Many **vehicles move slowly**. I **see another street**. It is **less busy** **than the main street**. I **walk there** and it is quieter. The city has **tall buildings** and **busy streets**. But it is exciting! I like **exploring the city**!",
  content_vi: "Hôm nay tôi đến thành phố! Tôi đi bộ trên một con phố đông đúc. Có nhiều người và xe hơi. Đó là một nơi ồn ào. Tôi nghe tiếng còi xe và tiếng người nói chuyện. Tôi nhìn thấy một tòa nhà cao. Nó rất cao! Đó là một tòa nhà hiện đại với cửa sổ kính. Một chiếc xe buýt màu vàng dừng gần tôi. Nhiều người lên xe buýt. Giao thông đông đúc. Nhiều phương tiện di chuyển chậm. Tôi thấy một con phố khác. Nó ít đông đúc hơn con phố chính. Tôi đi bộ ở đó và nó yên tĩnh hơn. Thành phố có những tòa nhà cao, đường phố đông đúc. Nhưng nó rất thú vị! Tôi thích khám phá thành phố mỗi lần!",
  comprehension_questions: [
    { id: 1, question_en: "What kind of building does the child see?", answer: ["tall building", "modern building", "tall", "modern"], clue_statement: "It is a tall building.", hint_en: "Very high...", hint_vi: "Rất cao..." },
    { id: 2, question_en: "How is the traffic?", answer: ["heavy", "heavy traffic", "busy"], clue_statement: "The traffic is heavy.", hint_en: "Many vehicles...", hint_vi: "Nhiều phương tiện..." },
    { id: 3, question_en: "How many people and cars are there?", answer: ["many", "There are many people and cars"], clue_statement: "There are many people and cars.", hint_en: "A number...", hint_vi: "Một con số..." }
  ],
  question: {
    text_en: "Have you been to a city? What did you see? What sounds did you hear?",
    text_vi: "Bạn đã đến thành phố chưa? Bạn nhìn thấy gì? Bạn nghe thấy âm thanh gì?",
    min_words: 30,
    hint_en: "Talk about buildings, streets, vehicles, and sounds...",
    hint_vi: "Nói về tòa nhà, đường phố, phương tiện, và âm thanh..."
  }
  };

export const chunk_focus = [
  "visit the city",
  "walk on",
  "busy street",
  "There are",
  "people and cars",
  "noisy place",
  "hear car horns",
  "people talking",
  "tall building",
  "very high",
  "modern building",
  "yellow bus",
  "stops near",
  "Many people get",
  "vehicles move slowly",
  "see another street",
  "less busy",
  "than the main street",
  "walk there",
  "tall buildings",
  "busy streets",
  "exploring the city"
];

export const dictionary = {
    'Many people get': { word: 'Many people get', pronunciation: '/many people get/', definition_vi: 'nhiều người nhận được', definition_en: 'Multi-word phrase: many people get', example: 'The phrase \'many people get\' is commonly used in conversation.' },
    'There are': { word: 'There are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'English collocation / phrase: there are', example: 'There are forty students in our class.' },
    'busy street': { word: 'busy street', pronunciation: '/busy street/', definition_vi: 'đường phố đông đúc', definition_en: 'meaning of busy street', example: 'The busy street was full of shops, restaurants and lots of people.' },
    'busy streets': { word: 'busy streets', pronunciation: '/busy streets/', definition_vi: 'những đường phố đông đúc', definition_en: 'meaning of busy streets', example: 'Big cities have busy streets with thousands of cars and pedestrians.' },
    'exploring the city': { word: 'exploring the city', pronunciation: '/exploring the city/', definition_vi: 'khám phá thành phố', definition_en: 'meaning of exploring the city', example: 'She exploring the city with her friends after school.' },
    'hear car horns': { word: 'hear car horns', pronunciation: '/hear car horns/', definition_vi: 'nghe còi xe', definition_en: 'meaning of hear car horns', example: 'I hear car horns and people talking.' },
    'less busy': { word: 'less busy', pronunciation: '/less busy/', definition_vi: 'ít đông hơn', definition_en: 'meaning of less busy', example: 'The small town is less busy than the big city, so it is very peaceful.' },
    'modern building': { word: 'modern building', pronunciation: '/modern building/', definition_vi: 'tòa nhà hiện đại', definition_en: 'Multi-word phrase: modern building', example: 'The phrase \'modern building\' is commonly used in conversation.' },
    'noisy place': { word: 'noisy place', pronunciation: '/noisy place/', definition_vi: 'nơi ồn ào', definition_en: 'meaning of noisy place', example: 'The construction site is a noisy place with hammers and machines working.' },
    'people and cars': { word: 'people and cars', pronunciation: '/people and cars/', definition_vi: 'người và xe', definition_en: 'meaning of people and cars', example: 'The busy road was full of people and cars going in all directions.' },
    'people talking': { word: 'people talking', pronunciation: '/people talking/', definition_vi: 'mọi người đang nói chuyện', definition_en: 'Multi-word phrase: people talking', example: 'The phrase \'people talking\' is commonly used in conversation.' },
    'see another street': { word: 'see another street', pronunciation: '/see another street/', definition_vi: 'thấy con đường khác', definition_en: 'Multi-word phrase: see another street', example: 'The phrase \'see another street\' is commonly used in conversation.' },
    'stops near': { word: 'stops near', pronunciation: '/stops near/', definition_vi: 'dừng gần', definition_en: 'Multi-word phrase: stops near', example: 'The phrase \'stops near\' is commonly used in conversation.' },
    'tall building': { word: 'tall building', pronunciation: '/tall building/', definition_vi: 'tòa nhà cao', definition_en: 'meaning of tall building', example: 'I see a tall building.' },
    'tall buildings': { word: 'tall buildings', pronunciation: '/tall buildings/', definition_vi: 'nhà cao tầng', definition_en: 'meaning of tall buildings', example: 'New York has many tall buildings in the city centre.' },
    'than the main street': { word: 'than the main street', pronunciation: '/than the main street/', definition_vi: 'hơn đường chính', definition_en: 'meaning of than the main street', example: 'It is less busy than the main street.' },
    'vehicles move slowly': { word: 'vehicles move slowly', pronunciation: '/vehicles move slowly/', definition_vi: 'phương tiện di chuyển chậm', definition_en: 'Multi-word phrase: vehicles move slowly', example: 'The phrase \'vehicles move slowly\' is commonly used in conversation.' },
    'very high': { word: 'very high', pronunciation: '/very high/', definition_vi: 'rất cao', definition_en: 'meaning of very high', example: 'The kite flew very high in the sky until it looked like a tiny dot.' },
    'visit the city': { word: 'visit the city', pronunciation: '/visit the city/', definition_vi: 'thăm thành phố', definition_en: 'meaning of visit the city', example: 'During summer, many families visit the city to see the museums and theatres.' },
    'walk on': { word: 'walk on', pronunciation: '/walk on/', definition_vi: 'đi trên', definition_en: 'meaning of walk on', example: 'I walk on a busy street.' },
    'walk there': { word: 'walk there', pronunciation: '/walk there/', definition_vi: 'đi đến đó', definition_en: 'meaning of walk there', example: 'I walk there and it is quieter.' },
    'yellow bus': { word: 'yellow bus', pronunciation: '/yellow bus/', definition_vi: 'xe buýt màu vàng', definition_en: 'meaning of yellow bus', example: 'A yellow bus get on the bus near me.' }
};
