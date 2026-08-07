export default {
  title: "My New Classroom",
  image_url: "/images/week1_easy/read_cover_w01.jpg",
  audio_url: "/audio/week1/read_main.mp3",
  content_en: "Hi! **My name** is Alex. I am **at school** today. I am in Grade 1. This is my desk and chair. I **sit next to** my **friend lily**. I have a **blue pen** and a **story book** **in my bag**. I can see a picture **on the wall** and a **big door** **at the front**. My teacher is kind. I like **my classroom**! **Every day** is a **happy day**.",
  content_vi: "Chào! Tên mình là Alex. Hôm nay mình ở trường. Mình học lớp 1. Đây là bàn và ghế của mình. Mình ngồi cạnh bạn Lily. Mình có một cây bút xanh và một quyển sách truyện trong cặp. Mình nhìn thấy một bức tranh trên tường và một cánh cửa lớn phía trước. Cô giáo của mình tốt bụng. Mình thích lớp học của mình! Mỗi ngày đều là một ngày vui vẻ.",
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
  "my classroom",
  "Every day",
  "happy day"
];

export const dictionary = {
    'Every day': { word: 'Every day', pronunciation: '/ˈevri deɪ/', definition_vi: 'mỗi ngày', definition_en: 'Each day without exception', example: 'I go to school every day.' },
    'My name': { word: 'My name', pronunciation: '/maɪ neɪm/', definition_vi: 'tên của tôi', definition_en: 'Used to introduce oneself', example: 'My name is Alex.' },
    'at school': { word: 'at school', pronunciation: '/æt skuːl/', definition_vi: 'ở trường học', definition_en: 'Present in an educational institution', example: 'Children learn many subjects at school.' },
    'at the front': { word: 'at the front', pronunciation: '/æt ðə frʌnt/', definition_vi: 'ở phía trước', definition_en: 'In the forward part of a space', example: 'The teacher stands at the front of the class.' },
    'big door': { word: 'big door', pronunciation: '/bɪɡ dɔː/', definition_vi: 'cánh cửa lớn', definition_en: 'A large entrance barrier', example: 'The classroom has a big door.' },
    'blue pen': { word: 'blue pen', pronunciation: '/bluː pen/', definition_vi: 'cây bút màu xanh', definition_en: 'A writing instrument with blue ink', example: 'I write my homework with a blue pen.' },
    'friend lily': { word: 'friend lily', pronunciation: '/frend ˈlɪli/', definition_vi: 'bạn Lily', definition_en: 'A friend named Lily', example: 'I sit next to my friend Lily.' },
    'happy day': { word: 'happy day', pronunciation: '/ˈhæpi deɪ/', definition_vi: 'ngày vui vẻ', definition_en: 'A day filled with joy', example: 'Every day at school is a happy day.' },
    'in my bag': { word: 'in my bag', pronunciation: '/ɪn maɪ bæɡ/', definition_vi: 'trong cặp/túi của tôi', definition_en: 'Inside my backpack or bag', example: 'I have books in my bag.' },
    'my classroom': { word: 'my classroom', pronunciation: '/maɪ ˈklɑːsruːm/', definition_vi: 'lớp học của tôi', definition_en: 'The room where one learns at school', example: 'I love studying in my classroom.' },
    'on the wall': { word: 'on the wall', pronunciation: '/ɒn ðə wɔːl/', definition_vi: 'trên tường', definition_en: 'Attached to a vertical surface', example: 'There is a map on the wall.' },
    'sit next to': { word: 'sit next to', pronunciation: '/sɪt nekst tuː/', definition_vi: 'ngồi cạnh', definition_en: 'To occupy a seat beside someone', example: 'I sit next to my best friend.' },
    'story book': { word: 'story book', pronunciation: '/ˈstɔːri bʊk/', definition_vi: 'sách truyện', definition_en: 'A book containing stories for children', example: 'I enjoy reading a colorful story book.' }
};
