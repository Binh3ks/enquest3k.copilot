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
    'In my pencil case': { word: 'In my pencil case', pronunciation: '/in my pencil case/', definition_vi: 'trong hộp bút', definition_en: 'meaning of in my pencil case', example: 'There is glue in my pencil case.' },
    'On the wall': { word: 'On the wall', pronunciation: '/on the wall/', definition_vi: 'trên tường', definition_en: 'meaning of on the wall', example: 'I see a lamp on the table and a mirror on the wall.' },
    'There are': { word: 'There are', pronunciation: '/there are/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there are', example: 'In my classroom, there are twenty desks and one big whiteboard.' },
    'at a desk': { word: 'at a desk', pronunciation: '/at a desk/', definition_vi: 'ở một bàn', definition_en: 'meaning of at a desk', example: 'I sit on a chair at a desk.' },
    'at school': { word: 'at school', pronunciation: '/at school/', definition_vi: 'ở trường', definition_en: 'meaning of at school', example: 'At school, there is a whiteboard in the classroom.' },
    'bright markers': { word: 'bright markers', pronunciation: '/bright markers/', definition_vi: 'bút vẽ sáng màu', definition_en: 'meaning of bright markers', example: 'The children used bright markers to colour the map of the world.' },
    'in my room': { word: 'in my room', pronunciation: '/in my room/', definition_vi: '(cụm từ: in my room)', definition_en: 'Multi-word phrase: in my room', example: 'Use of \'in my room\' in natural context.' },
    'in neat rows': { word: 'in neat rows', pronunciation: '/in neat rows/', definition_vi: 'thành hàng ngay ngắn', definition_en: 'meaning of in neat rows', example: 'There are desks in neat rows.' },
    'look around': { word: 'look around', pronunciation: '/look around/', definition_vi: 'nhìn xung quanh', definition_en: 'meaning of look around', example: 'I look around my classroom.' },
    'my classroom': { word: 'my classroom', pronunciation: '/my classroom/', definition_vi: '(cụm từ: my classroom)', definition_en: 'Multi-word phrase: my classroom', example: 'Use of \'my classroom\' in natural context.' },
    'on the board': { word: 'on the board', pronunciation: '/on the board/', definition_vi: 'trên bảng', definition_en: 'meaning of on the board', example: 'The teacher writes on the board.' },
    'on the desks': { word: 'on the desks', pronunciation: '/on the desks/', definition_vi: 'trên những bàn', definition_en: 'meaning of on the desks', example: 'There are crayons and papers on the desks.' },
    'on the shelves': { word: 'on the shelves', pronunciation: '/on the shelves/', definition_vi: 'trên kệ', definition_en: 'meaning of on the shelves', example: 'There are books on the shelves.' },
    'open my bag': { word: 'open my bag', pronunciation: '/open my bag/', definition_vi: 'mở túi', definition_en: 'meaning of open my bag', example: 'I open my bag and take out my pencil.' },
    'sit on': { word: 'sit on', pronunciation: '/sit on/', definition_vi: 'ngồi trên', definition_en: 'meaning of sit on', example: 'I sit on a chair at the table.' },
    'so many': { word: 'so many', pronunciation: '/so many/', definition_vi: '(cụm từ: so many)', definition_en: 'Multi-word phrase: so many', example: 'Use of \'so many\' in natural context.' },
    'take out': { word: 'take out', pronunciation: '/take out/', definition_vi: 'lấy ra', definition_en: 'meaning of take out', example: 'I open my bag and take out my pencil.' },
    'there are': { word: 'there are', pronunciation: '/there are/', definition_vi: 'có (nhiều)', definition_en: 'meaning of there are', example: 'In my classroom, there are twenty desks and one big whiteboard.' },
    'writes on': { word: 'writes on', pronunciation: '/writes on/', definition_vi: 'viết trên', definition_en: 'meaning of writes on', example: 'The teacher writes on the board.' }
};
