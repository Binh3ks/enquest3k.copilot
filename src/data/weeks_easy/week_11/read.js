export default {
  title: "My Weekend",
  image_url: "/images/week11/read_cover_w11.jpg",
  audio_url: "/audio/week11_easy/read_main_easy.mp3",
  content_en: "Today is Saturday! I am happy. I **go to the park**. I **play at** the park. It is fun! Then I **go to the library**. I **read a book** **at the library**. I like books! **My mom** and I **go to the store**. We **buy food** **at the store**. I **help mom**! We **go to** the playground. I **play at** the playground. I **slide down**! **On Sunday**, I **go to** the zoo. I see a **big lion** **at the zoo**! Then I **eat lunch** **at home**. The food is good! I **go to school** **on Monday**. I like my weekend!",
  content_vi: "Hôm nay là thứ Bảy! Tôi vui. Tôi đi công viên. Tôi chơi ở công viên. Nó vui! Sau đó tôi đi thư viện. Tôi đọc sách ở thư viện. Tôi thích sách! Mẹ tôi và tôi đi cửa hàng. Chúng tôi mua thức ăn ở cửa hàng. Tôi giúp mẹ! Chúng tôi đi sân chơi. Tôi chơi ở sân chơi. Tôi trượt xuống! Vào Chủ nhật, tôi đi sở thú. Tôi thấy con sư tử lớn ở sở thú! Sau đó tôi ăn trưa ở nhà. Đồ ăn ngon! Tôi đi học vào thứ Hai. Tôi thích cuối tuần!",
  comprehension_questions: [
    { id: 1, question_en: "What do I do at the library?", answer: ["read a book", "read", "read books"], clue_statement: "I read a book at the library.", hint_en: "With books...", hint_vi: "Với sách..." },
    { id: 2, question_en: "What animal do I see?", answer: ["lion", "a lion", "big lion"], clue_statement: "I see a big lion.", hint_en: "A big animal...", hint_vi: "Một con vật lớn..." },
    { id: 3, question_en: "What is the food like?", answer: ["good", "The food is good"], clue_statement: "The food is good.", hint_en: "Think about the food...", hint_vi: "Nghĩ về đồ ăn..." }
  ],
  question: {
    text_en: "What do you do on weekends?",
    text_vi: "Bạn làm gì vào cuối tuần?",
    min_words: 20,
    hint_en: "Tell me about your weekend...",
    hint_vi: "Nói cho tôi về cuối tuần..."
  }
  };

export const chunk_focus = [
  "go to the park",
  "play at",
  "go to the library",
  "read a book",
  "at the library",
  "My mom",
  "go to the store",
  "buy food",
  "at the store",
  "help mom",
  "go to",
  "slide down",
  "On Sunday",
  "big lion",
  "at the zoo",
  "eat lunch",
  "at home",
  "go to school",
  "on Monday"
];

export const dictionary = {
    'My mom': { word: 'My mom', pronunciation: '/my mom/', definition_vi: 'cụm từ vựng: my mom', definition_en: 'Collocation: my mom', example: 'The students learned \'my mom\' in their English lesson.' },
    'On Sunday': { word: 'On Sunday', pronunciation: '/on sunday/', definition_vi: 'Vào Chủ Nhật', definition_en: 'meaning of on sunday', example: 'On Sunday, I go to the zoo.' },
    'at home': { word: 'at home', pronunciation: '/at home/', definition_vi: 'ở nhà', definition_en: 'meaning of at home', example: 'I have a happy jar at home.' },
    'at the library': { word: 'at the library', pronunciation: '/at the library/', definition_vi: 'ở thư viện', definition_en: 'meaning of at the library', example: 'I read a book at the library.' },
    'at the store': { word: 'at the store', pronunciation: '/at the store/', definition_vi: 'ở cửa hàng', definition_en: 'meaning of at the store', example: 'We buy food at the store.' },
    'at the zoo': { word: 'at the zoo', pronunciation: '/at the zoo/', definition_vi: 'ở sở thú', definition_en: 'meaning of at the zoo', example: 'We saw many animals at the zoo on Sunday.' },
    'big lion': { word: 'big lion', pronunciation: '/big lion/', definition_vi: 'sư tử to', definition_en: 'meaning of big lion', example: 'The big lion lay in the shade of a tall tree.' },
    'buy food': { word: 'buy food', pronunciation: '/buy food/', definition_vi: 'mua đồ ăn', definition_en: 'meaning of buy food', example: 'We buy food at the supermarket.' },
    'eat lunch': { word: 'eat lunch', pronunciation: '/eat lunch/', definition_vi: 'ăn trưa', definition_en: 'meaning of eat lunch', example: 'Then I eat lunch at home.' },
    'go to': { word: 'go to', pronunciation: '/go to/', definition_vi: 'đến, đi đến', definition_en: 'meaning of go to', example: 'After school, I go to the library to read.' },
    'go to school': { word: 'go to school', pronunciation: '/go to school/', definition_vi: 'đi học', definition_en: 'meaning of go to school', example: 'I also go to school on Monday to read and learn.' },
    'go to the library': { word: 'go to the library', pronunciation: '/go to the library/', definition_vi: 'đi đến thư viện', definition_en: 'to visit the library', example: 'After school, I go to the library to read books.' },
    'go to the park': { word: 'go to the park', pronunciation: '/go to the park/', definition_vi: 'đi công viên', definition_en: 'meaning of go to the park', example: 'First, I go to the park.' },
    'go to the store': { word: 'go to the store', pronunciation: '/go to the store/', definition_vi: 'đi đến cửa hàng', definition_en: 'meaning of go to the store', example: 'This is an example: go to the store.' },
    'help mom': { word: 'help mom', pronunciation: '/help mom/', definition_vi: 'giúp mẹ', definition_en: 'meaning of help mom', example: 'I help mom!' },
    'on Monday': { word: 'on Monday', pronunciation: '/on monday/', definition_vi: 'vào thứ Hai', definition_en: 'meaning of on monday', example: 'I have art class on Monday every week.' },
    'play at': { word: 'play at', pronunciation: '/play at/', definition_vi: 'chơi ở', definition_en: 'meaning of play at', example: 'I play at the park with my friends.' },
    'read a book': { word: 'read a book', pronunciation: '/read a book/', definition_vi: 'đọc sách', definition_en: 'meaning of read a book', example: 'I read a book at the library.' },
    'slide down': { word: 'slide down', pronunciation: '/slide down/', definition_vi: 'trượt xuống', definition_en: 'meaning of slide down', example: 'I slide down at the playground.' }
};
