export default {
  title: "My Weekend Adventure",
  image_url: "/images/week11/read_cover_w11.jpg",
  audio_url: "/audio/week11/read_main.mp3",
  content_en: "Today is Saturday! I have a **fun weekend** plan. First, I **go to the park**. I **play at the park** **with my friends**. We run and laugh! Then, I **go to the library**. I **read a story book** **at the library**. The book is **about animals**. It is very interesting! **After that**, **my mom** and I **go to** the supermarket. We **buy food** at the supermarket. I help **my mom** carry the bags. Finally, we **go to** the playground. I **slide down** at the playground. I love the slide! **On Sunday**, I **go to** the zoo. I see **many animals** **at the zoo**. I see a lion and a monkey! Then we **have lunch** at a restaurant. The food is **very delicious**! I also **go to school** **on monday** to read and learn. I love my weekend! Every place is special and fun!",
  content_vi: "Hôm nay là thứ Bảy! Tôi có kế hoạch cuối tuần vui vẻ. Đầu tiên, tôi đi đến công viên. Tôi chơi ở công viên với bạn bè. Chúng tôi chạy và cười! Sau đó, tôi đi đến thư viện. Tôi đọc sách ở thư viện. Cuốn sách về động vật. Nó rất thú vị! Sau đó, mẹ tôi và tôi đi siêu thị. Chúng tôi mua thức ăn ở siêu thị. Tôi giúp mẹ mang túi. Cuối cùng, chúng tôi đi sân chơi. Tôi chơi ở sân chơi. Tôi thích cầu trượt! Vào Chủ nhật, tôi đi sở thú. Tôi thấy nhiều động vật ở sở thú. Tôi thấy sư tử và khỉ! Sau đó chúng tôi ăn trưa ở nhà hàng. Đồ ăn rất ngon! Tôi cũng đi học vào thứ Hai để đọc và học. Tôi yêu cuối tuần của mình! Mỗi nơi đều đặc biệt và vui!",
  comprehension_questions: [
    { id: 1, question_en: "What does the child do at the library?", answer: ["read a book", "reads", "read"], clue_statement: "The child reads a book.", hint_en: "Something you do with books...", hint_vi: "Điều bạn làm với sách..." },
    { id: 2, question_en: "What animals does the child see at the zoo?", answer: ["a lion and a monkey", "lion and monkey", "monkey and lion"], clue_statement: "The child sees a lion and a monkey at the zoo.", hint_en: "Two animals...", hint_vi: "Hai con vật..." },
    { id: 3, question_en: "What is the food like?", answer: ["delicious", "The food is delicious"], clue_statement: "The food is delicious.", hint_en: "Think about the food...", hint_vi: "Nghĩ về đồ ăn..." }
  ],
  question: {
    text_en: "What do you do on weekends? Where do you go?",
    text_vi: "Bạn làm gì vào cuối tuần? Bạn đi đâu?",
    min_words: 30,
    hint_en: "Talk about your favorite weekend places...",
    hint_vi: "Nói về những nơi cuối tuần yêu thích..."
  }
  };

export const chunk_focus = [
  "fun weekend",
  "go to the park",
  "play at the park",
  "with my friends",
  "go to the library",
  "read a story book",
  "at the library",
  "about animals",
  "After that",
  "my mom",
  "go to",
  "buy food",
  "slide down",
  "On Sunday",
  "many animals",
  "at the zoo",
  "have lunch",
  "very delicious",
  "go to school",
  "on monday"
];

export const dictionary = {
    'After that': { word: 'After that', pronunciation: '/after that/', definition_vi: 'sau đó', definition_en: 'meaning of after that', example: 'We visited the museum in the morning and after that, we had lunch at a café.' },
    'On Sunday': { word: 'On Sunday', pronunciation: '/on sunday/', definition_vi: 'Vào Chủ Nhật', definition_en: 'meaning of on sunday', example: 'On Sunday, I go to the zoo.' },
    'about animals': { word: 'about animals', pronunciation: '/about animals/', definition_vi: 'về động vật', definition_en: 'Multi-word phrase: about animals', example: 'The phrase \'about animals\' is commonly used in conversation.' },
    'at the library': { word: 'at the library', pronunciation: '/at the library/', definition_vi: 'ở thư viện', definition_en: 'meaning of at the library', example: 'I read a book at the library.' },
    'at the zoo': { word: 'at the zoo', pronunciation: '/at the zoo/', definition_vi: 'ở sở thú', definition_en: 'meaning of at the zoo', example: 'We saw many animals at the zoo on Sunday.' },
    'buy food': { word: 'buy food', pronunciation: '/buy food/', definition_vi: 'mua đồ ăn', definition_en: 'meaning of buy food', example: 'We buy food at the supermarket.' },
    'fun weekend': { word: 'fun weekend', pronunciation: '/fun weekend/', definition_vi: 'cuối tuần vui vẻ', definition_en: 'meaning of fun weekend', example: 'We had a fun weekend camping by the lake with our cousins and grandparents.' },
    'go to': { word: 'go to', pronunciation: '/go to/', definition_vi: 'đến, đi đến', definition_en: 'meaning of go to', example: 'After school, I go to the library to read.' },
    'go to school': { word: 'go to school', pronunciation: '/go to school/', definition_vi: 'đi học', definition_en: 'meaning of go to school', example: 'I also go to school on Monday to read and learn.' },
    'go to the library': { word: 'go to the library', pronunciation: '/go to the library/', definition_vi: 'đi đến thư viện', definition_en: 'to visit the library', example: 'After school, I go to the library to read books.' },
    'go to the park': { word: 'go to the park', pronunciation: '/go to the park/', definition_vi: 'đi công viên', definition_en: 'meaning of go to the park', example: 'First, I go to the park.' },
    'have lunch': { word: 'have lunch', pronunciation: '/have lunch/', definition_vi: 'ăn trưa', definition_en: 'meaning of have lunch', example: 'Then we have lunch at a restaurant.' },
    'many animals': { word: 'many animals', pronunciation: '/many animals/', definition_vi: 'nhiều động vật', definition_en: 'meaning of many animals', example: 'In the city, there are many cars, but here there are many animals.' },
    'my mom': { word: 'my mom', pronunciation: '/my mom/', definition_vi: '(cụm từ: my mom)', definition_en: 'Multi-word phrase: my mom', example: 'Use of \'my mom\' in natural context.' },
    'on monday': { word: 'on monday', pronunciation: '/on monday/', definition_vi: 'vào thứ Hai', definition_en: 'meaning of on monday', example: 'I have art class on Monday every week.' },
    'play at the park': { word: 'play at the park', pronunciation: '/play at the park/', definition_vi: 'chơi ở công viên', definition_en: 'meaning of play at the park', example: 'I play at the park with my friends.' },
    'read a story book': { word: 'read a story book', pronunciation: '/read a story book/', definition_vi: 'đọc sách truyện', definition_en: 'meaning of read a story book', example: 'Before bed, I love to read a story book with my dad or my mum.' },
    'slide down': { word: 'slide down', pronunciation: '/slide down/', definition_vi: 'trượt xuống', definition_en: 'meaning of slide down', example: 'I slide down at the playground.' },
    'very delicious': { word: 'very delicious', pronunciation: '/very delicious/', definition_vi: 'rất ngon', definition_en: 'meaning of very delicious', example: 'Grandma\'s cooking is very delicious — everyone wants second helpings.' },
    'with my friends': { word: 'with my friends', pronunciation: '/with my friends/', definition_vi: '(cụm từ: with my friends)', definition_en: 'Multi-word phrase: with my friends', example: 'Use of \'with my friends\' in natural context.' }
};
