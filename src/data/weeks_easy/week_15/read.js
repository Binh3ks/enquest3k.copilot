export default {
  title: "My Day at the Park",
  image_url: "/images/week15/read_cover_w15.jpg",
  audio_url: "/audio/week15_easy/read_explore_main.mp3",
  content_en: "Today I am **going to the park** with **my family**. The park is busy and fun! I am **walking with my mom**. She is **holding my hand**. **My dad** is **jogging ahead of us**. I see a boy. He is **running very fast**! His dog is running too. An **old man** is **sitting on a bench**. He is **reading a book**. Near the fountain, some kids are playing. They are laughing. **My family** is **having a picnic** now. We are **eating yummy sandwiches**. I am **drinking apple juice**. **My sister** is **flying her red kite**. It is **going very high**! I am **relaxing under the trees**. The grass is soft. I see flowers everywhere. A girl is **walking her small dog**. The dog is cute! The park is my **favorite place**!",
  content_vi: "Hôm nay tôi đang đi công viên với gia đình. Công viên đông đúc và vui! Tôi đang đi bộ với mẹ. Mẹ đang nắm tay tôi. Bố tôi đang chạy bộ phía trước chúng tôi. Tôi thấy một cậu bé. Cậu ấy đang chạy rất nhanh! Con chó của cậu ấy cũng đang chạy. Một ông già đang ngồi trên ghế dài. Ông ấy đang đọc sách. Gần đài phun nước, một số trẻ đang chơi. Chúng đang cười. Gia đình tôi đang dã ngoại bây giờ. Chúng tôi đang ăn bánh sandwich ngon. Tôi đang uống nước táo. Em gái tôi đang thả diều đỏ. Nó bay rất cao! Tôi đang thư giãn trên cỏ. Cỏ mềm. Tôi thấy hoa khắp nơi. Một cô bé đang dắt chó nhỏ. Con chó dễ thương! Công viên là nơi yêu thích của tôi!",
  comprehension_questions: [
    { id: 1, question_en: "What am I doing with my mom?", answer: ["walking", "walking with mom", "holding hands"], clue_statement: "I am walking with my mom.", hint_en: "Moving slowly...", hint_vi: "Di chuyển chậm..." },
    { id: 2, question_en: "What color is the sister's kite?", answer: ["red", "red kite"], clue_statement: "The kite is red.", hint_en: "A color...", hint_vi: "Một màu..." },
    { id: 3, question_en: "What is the family eating?", answer: ["sandwiches", "yummy sandwiches"], clue_statement: "The family is eating yummy sandwiches.", hint_en: "Food for picnic...", hint_vi: "Đồ ăn dã ngoại..." },
  ],
  question: { text_en: "What do you do at the park? Who do you go with?", text_vi: "Bạn làm gì ở công viên? Bạn đi với ai?", min_words: 25, hint_en: "Talk about your park activities and who you go with...", hint_vi: "Nói về hoạt động ở công viên và ai đi cùng bạn..." }
};

export const chunk_focus = [
  "going to the park",
  "my family",
  "walking with my mom",
  "holding my hand",
  "My dad",
  "jogging ahead of us",
  "running very fast",
  "old man",
  "sitting on a bench",
  "reading a book",
  "My family",
  "having a picnic",
  "eating yummy sandwiches",
  "drinking apple juice",
  "My sister",
  "flying her red kite",
  "going very high",
  "relaxing under the trees",
  "walking her small dog",
  "favorite place"
];

export const dictionary = {
    'My dad': { word: 'My dad', pronunciation: '/my dad/', definition_vi: 'my bố', definition_en: 'Collocation: my dad', example: 'The students learned \'my dad\' in their English lesson.' },
    'My family': { word: 'My family', pronunciation: '/my family/', definition_vi: 'my gia đình', definition_en: 'Key collocation: my family', example: 'Natural usage of \'my family\' in sentence context.' },
    'My sister': { word: 'My sister', pronunciation: '/my sister/', definition_vi: 'cụm từ vựng: my sister', definition_en: 'Collocation: my sister', example: 'The students learned \'my sister\' in their English lesson.' },
    'drinking apple juice': { word: 'drinking apple juice', pronunciation: '/drinking apple juice/', definition_vi: 'đang uống nước táo', definition_en: 'meaning of drinking apple juice', example: 'I am drinking apple juice.' },
    'eating yummy sandwiches': { word: 'eating yummy sandwiches', pronunciation: '/eating yummy sandwiches/', definition_vi: 'đang ăn bánh sandwich ngon', definition_en: 'meaning of eating yummy sandwiches', example: 'We are eating yummy sandwiches.' },
    'favorite place': { word: 'favorite place', pronunciation: '/favorite place/', definition_vi: 'yêu thích địa điểm', definition_en: 'Key collocation: favorite place', example: 'Natural usage of \'favorite place\' in sentence context.' },
    'flying her red kite': { word: 'flying her red kite', pronunciation: '/flying her red kite/', definition_vi: 'thả diều đỏ', definition_en: 'meaning of flying her red kite', example: 'We flying her red kite together whenever we can.' },
    'going to the park': { word: 'going to the park', pronunciation: '/going to the park/', definition_vi: 'tiếp tục đến the park', definition_en: 'Key collocation: going to the park', example: 'Natural usage of \'going to the park\' in sentence context.' },
    'going very high': { word: 'going very high', pronunciation: '/going very high/', definition_vi: 'bay rất cao', definition_en: 'meaning of going very high', example: 'It is going very high!' },
    'having a picnic': { word: 'having a picnic', pronunciation: '/having a picnic/', definition_vi: 'đang dã ngoại', definition_en: 'meaning of having a picnic', example: 'A family is having a picnic.' },
    'holding my hand': { word: 'holding my hand', pronunciation: '/holding my hand/', definition_vi: 'nắm tay tôi', definition_en: 'meaning of holding my hand', example: 'She is holding my hand.' },
    'jogging ahead of us': { word: 'jogging ahead of us', pronunciation: '/jogging ahead of us/', definition_vi: 'chạy bộ phía trước', definition_en: 'meaning of jogging ahead of us', example: 'My dad is jogging ahead of us.' },
    'my family': { word: 'my family', pronunciation: '/my family/', definition_vi: 'my gia đình', definition_en: 'Key collocation: my family', example: 'Natural usage of \'my family\' in sentence context.' },
    'old man': { word: 'old man', pronunciation: '/old man/', definition_vi: 'ông lão', definition_en: 'Multi-word phrase: old man', example: 'The phrase \'old man\' is commonly used in conversation.' },
    'reading a book': { word: 'reading a book', pronunciation: '/reading a book/', definition_vi: 'đọc sách', definition_en: 'meaning of reading a book', example: 'He is reading a book.' },
    'relaxing under the trees': { word: 'relaxing under the trees', pronunciation: '/relaxing under the trees/', definition_vi: 'thư giãn dưới những cây', definition_en: 'meaning of relaxing under the trees', example: 'I am relaxing under the trees.' },
    'running very fast': { word: 'running very fast', pronunciation: '/running very fast/', definition_vi: 'chạy rất nhanh', definition_en: 'meaning of running very fast', example: 'I am running very fast.' },
    'sitting on a bench': { word: 'sitting on a bench', pronunciation: '/sitting on a bench/', definition_vi: 'ngồi trên ghế dài', definition_en: 'meaning of sitting on a bench', example: 'We sitting on a bench together whenever we can.' },
    'walking her small dog': { word: 'walking her small dog', pronunciation: '/walking her small dog/', definition_vi: 'dắt chó nhỏ', definition_en: 'meaning of walking her small dog', example: 'A girl is walking her small dog.' },
    'walking with my mom': { word: 'walking with my mom', pronunciation: '/walking with my mom/', definition_vi: 'đi bộ với mẹ', definition_en: 'meaning of walking with my mom', example: 'I am walking with my mom.' }
};
