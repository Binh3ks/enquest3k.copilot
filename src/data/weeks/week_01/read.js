export default {
  title: "Alex's School Day",
  image_url: "/images/week1/read_cover_w01.jpg",
  content_en: "**My name** is Alex. I am a **new student** at Greenwood **elementary school**. **Every morning**, I **wake up early** and **get ready for school**. My backpack is heavy because I carry my **story book** and **small notebook** **every day**. In **my classroom**, **there are** twenty desks and one big whiteboard. My teacher, Ms. Johnson, is **very kind and patient**. She teaches us English, Math, and Science. I love **learning new things** and **studying every day**. **After school**, I **go to the library** to read. I want to become a **young scientist** when I grow up.",
  content_vi: "Tên tôi là Alex. Tôi là một học sinh ở Trường Tiểu học Greenwood. Mỗi buổi sáng, tôi thức dậy sớm và chuẩn bị đi học. Ba lô của tôi nặng vì ngày nào tôi cũng mang theo sách và vở. Trong lớp học của tôi, có hai mươi cái bàn và một bảng trắng lớn. Cô giáo của tôi, cô Johnson, rất tốt bụng và kiên nhẫn. Cô dạy chúng tôi tiếng Anh, Toán và Khoa học. Tôi thích học những điều mới mỗi ngày. Sau giờ học, tôi đi đến thư viện để đọc sách. Tôi muốn trở thành một nhà khoa học khi lớn lên.",
  audio_url: null,
  comprehension_questions: [
    { id: 1, question_en: "What is the student's name?", answer: ["Alex", "His name is Alex"], clue_statement: "His name is Alex.", hint_en: "The first word...", hint_vi: "Tên bắt đầu bằng..." },
    { id: 2, question_en: "Who is Alex's teacher?", answer: ["Ms. Johnson", "Ms Johnson", "Johnson"], clue_statement: "Ms. Johnson is Alex's teacher.", hint_en: "Ms. J...", hint_vi: "Cô J..." },
    { id: 3, question_en: "What does Alex want to become?", answer: ["A scientist", "Scientist"], clue_statement: "Alex wants to become a scientist.", hint_en: "When I grow up...", hint_vi: "Khi lớn lên..." }
  ]
};

export const chunk_focus = [
  "My name",
  "new student",
  "elementary school",
  "Every morning",
  "wake up early",
  "get ready for school",
  "story book",
  "small notebook",
  "every day",
  "my classroom",
  "there are",
  "very kind and patient",
  "learning new things",
  "studying every day",
  "After school",
  "go to the library",
  "young scientist"
];

export const dictionary = {
    'After school': { word: 'After school', pronunciation: '/ˈɑːftə skuːl/', definition_vi: 'sau giờ học', definition_en: 'In the time following the end of the school day', example: 'After school, I go to the library to read.' },
    'Every morning': { word: 'Every morning', pronunciation: '/ˈevri ˈmɔːnɪŋ/', definition_vi: 'mỗi buổi sáng', definition_en: 'On each morning without exception', example: 'I wake up early every morning.' },
    'My name': { word: 'My name', pronunciation: '/maɪ neɪm/', definition_vi: 'tên của tôi', definition_en: 'Used to introduce oneself', example: 'My name is Alex.' },
    'elementary school': { word: 'elementary school', pronunciation: '/ˌelɪˈmentri skuːl/', definition_vi: 'trường tiểu học', definition_en: 'A school for children aged roughly 5 to 11', example: 'Alex is a new student at elementary school.' },
    'every day': { word: 'every day', pronunciation: '/ˈevri deɪ/', definition_vi: 'mỗi ngày', definition_en: 'Each day continuously', example: 'I study English every day.' },
    'get ready for school': { word: 'get ready for school', pronunciation: '/ɡet ˈredi fə skuːl/', definition_vi: 'chuẩn bị đi học', definition_en: 'To prepare oneself to attend school', example: 'I get ready for school at seven o\'clock.' },
    'go to the library': { word: 'go to the library', pronunciation: '/ɡəʊ tuː ðə ˈlaɪbrəri/', definition_vi: 'đi đến thư viện', definition_en: 'To visit a library to read or borrow books', example: 'I go to the library after class.' },
    'learning new things': { word: 'learning new things', pronunciation: '/ˈlɜːnɪŋ njuː θɪŋz/', definition_vi: 'học những điều mới', definition_en: 'Acquiring fresh knowledge or skills', example: 'I love learning new things every day.' },
    'my classroom': { word: 'my classroom', pronunciation: '/maɪ ˈklɑːsruːm/', definition_vi: 'lớp học của tôi', definition_en: 'The room in school where one learns', example: 'There are twenty desks in my classroom.' },
    'new student': { word: 'new student', pronunciation: '/njuː ˈstjuːdnt/', definition_vi: 'học sinh mới', definition_en: 'A student who recently joined a school', example: 'Alex is a new student in Grade 1.' },
    'small notebook': { word: 'small notebook', pronunciation: '/smɔːl ˈnəʊtbʊk/', definition_vi: 'cuốn sổ tay nhỏ', definition_en: 'A compact book for taking notes', example: 'I write clues in my small notebook.' },
    'story book': { word: 'story book', pronunciation: '/ˈstɔːri bʊk/', definition_vi: 'sách truyện', definition_en: 'A book containing story tales for reading', example: 'I carry a story book in my bag.' },
    'studying every day': { word: 'studying every day', pronunciation: '/ˈstʌdiɪŋ ˈevri deɪ/', definition_vi: 'học tập mỗi ngày', definition_en: 'Engaging in learning daily', example: 'Studying every day helps you improve.' },
    'there are': { word: 'there are', pronunciation: '/ðeər ɑːr/', definition_vi: 'có (nhiều)', definition_en: 'Used to indicate the existence of plural items', example: 'There are twenty desks in the room.' },
    'very kind and patient': { word: 'very kind and patient', pronunciation: '/ˈveri kaɪnd ənd ˈpeɪʃnt/', definition_vi: 'rất tốt bụng và kiên nhẫn', definition_en: 'Gentle, considerate, and willing to take time', example: 'Our teacher is very kind and patient.' },
    'wake up early': { word: 'wake up early', pronunciation: '/weɪk ʌp ˈɜːli/', definition_vi: 'thức dậy sớm', definition_en: 'To awake near the start of morning', example: 'I wake up early to catch the bus.' },
    'young scientist': { word: 'young scientist', pronunciation: '/jʌŋ ˈsaɪəntɪst/', definition_vi: 'nhà khoa học trẻ', definition_en: 'A youthful person studying science', example: 'He hopes to become a young scientist.' }
};
