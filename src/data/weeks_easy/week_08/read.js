export default {
  title: "Counting in Class",
  image_url: "/images/week8/read_cover_w08.jpg",
  audio_url: "/audio/week8_easy/read_explore_main.mp3",
  content_en: "Today I am **at school**. I **look around** **my classroom**. **There are** desks **in neat rows** **in my room**. **There are** chairs too. I **sit on** a chair **at a desk**. I **open my bag** and **take out** my pencil. **In my pencil case** **there are** **bright markers**. The teacher **writes on** the board. **There are** words **on the board**! **On the wall** **there are** shelves. **There are** books **on the shelves**. We do art today. **There are** crayons and papers **on the desks**. I love **my classroom**! **There are** **so many** things here.",
  content_vi: "Hôm nay tôi đến trường. Tôi nhìn quanh lớp học của mình. Có những cái bàn xếp thẳng hàng trong phòng. Cũng có những chiếc ghế. Tôi ngồi trên ghế ở bàn. Tôi mở túi và lấy bút chì. Trong hộp bút có bút lông. Giáo viên viết lên bảng. Có chữ trên bảng! Trên tường có kệ sách. Có sách trên kệ. Hôm nay chúng tôi làm nghệ thuật. Có bút sáp và giấy trên bàn. Tôi yêu lớp học của mình! Có rất nhiều thứ ở đây.",
  comprehension_questions: [
    { id: 1, question_en: "What is in the student's bag?", answer: ["pencils", "markers", "pencils and markers"], clue_statement: "There are pencils and markers in the bag.", hint_en: "Look in the bag...", hint_vi: "Nhìn vào trong túi..." },
    { id: 2, question_en: "What is on the shelves?", answer: ["books", "there are books", "books on the shelves"], clue_statement: "There are books on the shelves.", hint_en: "The shelves have...", hint_vi: "Kệ có..." },
    { id: 3, question_en: "What do they use for art today?", answer: ["crayons and papers", "crayons", "papers"], clue_statement: "They use crayons and papers for art today.", hint_en: "They use... for art", hint_vi: "Họ dùng... cho nghệ thuật" }
  ],
  question: {
    text_en: "What is in your classroom? Tell me: There are...",
    text_vi: "Trong lớp học của bạn có gì? Kể cho tôi nghe: There are...",
    min_words: 20,
    hint_en: "Use There are + plural noun",
    hint_vi: "Dùng There are + danh từ số nhiều"
  }
};

export const chunk_focus = [
  "at school",
  "look around",
  "my classroom",
  "There are",
  "in neat rows",
  "in my room",
  "sit on",
  "at a desk",
  "open my bag",
  "take out",
  "In my pencil case",
  "there are",
  "bright markers",
  "writes on",
  "on the board",
  "On the wall",
  "on the shelves",
  "on the desks",
  "so many"
];

export const dictionary = {
    'In my pencil case': { word: 'In my pencil case', pronunciation: '/ɪn maɪ ˈpensl keɪs/', definition_vi: 'trong hộp bút của tôi', definition_en: 'English collocation / phrase: in my pencil case', example: 'I have three markers in my pencil case.' },
    'On the wall': { word: 'On the wall', pronunciation: '/ɒn ðə wɔːl/', definition_vi: 'trên tường', definition_en: 'English collocation / phrase: on the wall', example: 'There is a beautiful picture on the wall.' },
    'There are': { word: 'There are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'English collocation / phrase: there are', example: 'There are forty students in our class.' },
    'at a desk': { word: 'at a desk', pronunciation: '/æt ə desk/', definition_vi: 'tại bàn học', definition_en: 'English collocation / phrase: at a desk', example: 'Students sit at a desk to write.' },
    'at school': { word: 'at school', pronunciation: '/æt skuːl/', definition_vi: 'ở trường học', definition_en: 'English collocation / phrase: at school', example: 'Children learn many subjects at school.' },
    'bright markers': { word: 'bright markers', pronunciation: '/braɪt ˈmɑːkərz/', definition_vi: 'bút lông màu tươi sáng', definition_en: 'English collocation / phrase: bright markers', example: 'She drew a picture using bright markers.' },
    'in my room': { word: 'in my room', pronunciation: '/ɪn maɪ ruːm/', definition_vi: 'trong phòng của tôi', definition_en: 'English collocation / phrase: in my room', example: 'I keep my books in my room.' },
    'in neat rows': { word: 'in neat rows', pronunciation: '/ɪn niːt rəʊz/', definition_vi: 'thành những hàng ngăn nắp', definition_en: 'English collocation / phrase: in neat rows', example: 'The desks were placed in neat rows.' },
    'look around': { word: 'look around', pronunciation: '/lʊk əˈraʊnd/', definition_vi: 'nhìn xung quanh', definition_en: 'English collocation / phrase: look around', example: 'Look around the room to find your pencil.' },
    'my classroom': { word: 'my classroom', pronunciation: '/maɪ ˈklɑːsruːm/', definition_vi: 'lớp học của tôi', definition_en: 'English collocation / phrase: my classroom', example: 'I love studying in my classroom.' },
    'on the board': { word: 'on the board', pronunciation: '/ɒn ðə bɔːd/', definition_vi: 'trên bảng', definition_en: 'English collocation / phrase: on the board', example: 'Read the sentence written on the board.' },
    'on the desks': { word: 'on the desks', pronunciation: '/ɒn ðə desks/', definition_vi: 'trên bàn học', definition_en: 'English collocation / phrase: on the desks', example: 'Paper and crayons are on the desks.' },
    'on the shelves': { word: 'on the shelves', pronunciation: '/ɒn ðə ʃelvz/', definition_vi: 'trên kệ sách', definition_en: 'English collocation / phrase: on the shelves', example: 'Books are arranged neatly on the shelves.' },
    'open my bag': { word: 'open my bag', pronunciation: '/ˈəʊpən maɪ bæɡ/', definition_vi: 'mở cặp của tôi', definition_en: 'English collocation / phrase: open my bag', example: 'I open my bag to get my homework.' },
    'sit on': { word: 'sit on', pronunciation: '/sɪt ɒn/', definition_vi: 'ngồi trên', definition_en: 'English collocation / phrase: sit on', example: 'I sit on a chair at my desk.' },
    'so many': { word: 'so many', pronunciation: '/səʊ ˈmeni/', definition_vi: 'rất nhiều', definition_en: 'English collocation / phrase: so many', example: 'There are so many books in the library.' },
    'take out': { word: 'take out', pronunciation: '/teɪk aʊt/', definition_vi: 'lấy ra', definition_en: 'English collocation / phrase: take out', example: 'Please take out your notebook.' },
    'there are': { word: 'there are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'English collocation / phrase: there are', example: 'There are forty students in our class.' },
    'writes on': { word: 'writes on', pronunciation: '/raɪts ɒn/', definition_vi: 'viết lên', definition_en: 'English collocation / phrase: writes on', example: 'The teacher writes on the whiteboard.' }
};
