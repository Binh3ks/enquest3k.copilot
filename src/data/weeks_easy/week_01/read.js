export default {
  title: "My New Classroom",
  image_url: "/images/week1_easy/read_cover_w01.jpg",
  audio_url: "/audio/week1/read_main.mp3",
  content_en: "Hi! **My name** is Alex. I am **at school** today. I am in Grade 1. This is my desk and chair. I **sit next to** my **friend lily**. I have a **blue pen** and a **story book** **in my bag**. I can see a picture **on the wall** and a **big door** **at the front**. **My teacher** is kind. I like **my classroom**! **Every day** is a **happy day**.",
  content_vi: "Chào! Tên mình là Alex. Hôm nay mình ở trường. Mình học lớp 1. Đây là bàn và ghế của mình. Mình ngồi cạnh bạn Lily. Mình có một cây bút và một quyển sách trong cặp. Mình nhìn thấy một bức tranh trên tường và một cánh cửa lớn phía trước. Cô giáo của mình tốt bụng. Mình thích lớp học của mình! Mỗi ngày đều là một ngày vui để học.",
  audio_url: null,
  comprehension_questions: [
    { id: 1, question_en: "What is his name?", answer: ["Alex", "His name is Alex"], clue_statement: "His name is Alex.", hint_en: "My name is...", hint_vi: "Tên tôi là..." },
    { id: 2, question_en: "Who is next to Alex?", answer: ["Lily", "His friend Lily", "His friend"], clue_statement: "His friend Lily is next to Alex.", hint_en: "My friend is...", hint_vi: "Bạn tôi là..." },
    { id: 3, question_en: "What is my teacher like?", answer: ["kind", "My teacher is kind"], clue_statement: "My teacher is kind.", hint_en: "A nice word...", hint_vi: "Một từ tốt..." }
  ]
};

export const chunk_focus = [
  "My name",
  "at school",
  "sit next to",
  "friend lily",
  "blue pen",
  "story book",
  "in my bag",
  "on the wall",
  "big door",
  "at the front",
  "My teacher",
  "my classroom",
  "Every day",
  "happy day"
];

export const dictionary = {
    'Every day': { word: 'Every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'My name': { word: 'My name', pronunciation: '/my name/', definition_vi: '(cụm từ: my name)', definition_en: 'Multi-word phrase: my name', example: 'Use of \'my name\' in natural context.' },
    'My teacher': { word: 'My teacher', pronunciation: '/my teacher/', definition_vi: '(cụm từ: my teacher)', definition_en: 'Multi-word phrase: my teacher', example: 'Use of \'my teacher\' in natural context.' },
    'at school': { word: 'at school', pronunciation: '/at school/', definition_vi: 'ở trường', definition_en: 'meaning of at school', example: 'At school, there is a whiteboard in the classroom.' },
    'at the front': { word: 'at the front', pronunciation: '/at the front/', definition_vi: 'ở phía trước', definition_en: 'meaning of at the front', example: 'I can see a colorful picture on the wall and a big door at the front.' },
    'big door': { word: 'big door', pronunciation: '/big door/', definition_vi: 'cửa lớn', definition_en: 'Multi-word phrase: big door', example: 'The phrase \'big door\' is commonly used in conversation.' },
    'blue pen': { word: 'blue pen', pronunciation: '/blue pen/', definition_vi: 'bút xanh', definition_en: 'meaning of blue pen', example: 'The teacher signed my homework book with a blue pen.' },
    'friend lily': { word: 'friend lily', pronunciation: '/friend lily/', definition_vi: 'bạn Lily', definition_en: 'Multi-word phrase: friend lily', example: 'The phrase \'friend lily\' is commonly used in conversation.' },
    'happy day': { word: 'happy day', pronunciation: '/happy day/', definition_vi: 'happy day', definition_en: 'meaning of happy day', example: 'This is an example: happy day.' },
    'in my bag': { word: 'in my bag', pronunciation: '/in my bag/', definition_vi: 'trong túi', definition_en: 'meaning of in my bag', example: 'I have a pen and a book in my bag.' },
    'my classroom': { word: 'my classroom', pronunciation: '/my classroom/', definition_vi: '(cụm từ: my classroom)', definition_en: 'Multi-word phrase: my classroom', example: 'Use of \'my classroom\' in natural context.' },
    'on the wall': { word: 'on the wall', pronunciation: '/on the wall/', definition_vi: 'trên tường', definition_en: 'meaning of on the wall', example: 'I see a lamp on the table and a mirror on the wall.' },
    'sit next to': { word: 'sit next to', pronunciation: '/sit next to/', definition_vi: 'ngồi cạnh', definition_en: 'to sit beside someone or something', example: 'I sit next to my friend Lily in class.' },
    'story book': { word: 'story book', pronunciation: '/story book/', definition_vi: 'sách truyện', definition_en: 'meaning of story book', example: 'The library has hundreds of story books for children of all ages.' }
};
