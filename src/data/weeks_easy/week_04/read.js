export default {
  title: "My Happy Things",
  image_url: "/images/week4/read_cover_w04.jpg",
  content_en: "**My name** is Mia. I **play with** my toys **every afternoon**. I **draw pictures** of animals and flowers. I **read books** **before bed**. **When I play**, I smile. **When I draw**, I laugh with joy. **When I read**, I **feel very happy**. I have many **happy things**. I love **every day**. They make me feel good **every day**. **Every afternoon** is a **happy time** for me!",
  content_vi: "Tên tôi là Mia. Tôi thích chơi với đồ chơi của mình vào mỗi buổi chiều. Tôi thích vẽ tranh về động vật và hoa. Tôi thích đọc sách trước khi đi ngủ. Khi tôi chơi, tôi cười. Khi tôi vẽ, tôi cười lớn. Khi tôi đọc, tôi hạnh phúc. Tôi có nhiều thứ hạnh phúc. Tôi yêu mỗi khoảnh khắc. Chúng làm cho tôi cảm thấy tốt mỗi ngày!",
  comprehension_questions: [
    { id: 1, question_en: "What is her name?", answer: ["Mia"], clue_statement: "Her name is Mia.", hint_en: "It starts with 'M'...", hint_vi: "Nó bắt đầu bằng chữ 'M'..." },
    { id: 2, question_en: "Does she like to play?", answer: ["yes", "yes she does"], clue_statement: "She likes to play.", hint_en: "The answer is 'yes' or 'no'...", hint_vi: "Câu trả lời là 'yes' hoặc 'no'..." },
    { id: 3, question_en: "What does she do when she plays?", answer: ["smile", "she smiles"], clue_statement: "She smiles when she plays.", hint_en: "She makes a happy face...", hint_vi: "Cô ấy tạo ra một khuôn mặt vui vẻ..." }
  ],
  question: {
    text_en: "What do you like to do? Do you like to play or draw?",
    text_vi: "Bạn thích làm gì? Bạn có thích chơi hay vẽ không?",
    min_words: 20,
    hint_en: "Talk about what you like...",
    hint_vi: "Nói về những gì bạn thích..."
  }
};

export const chunk_focus = [
  "My name",
  "play with",
  "every afternoon",
  "draw pictures",
  "read books",
  "before bed",
  "When I play",
  "When I draw",
  "When I read",
  "feel very happy",
  "happy things",
  "every day",
  "Every afternoon",
  "happy time"
];

export const dictionary = {
    'Every afternoon': { word: 'Every afternoon', pronunciation: '/every afternoon/', definition_vi: 'mỗi buổi chiều', definition_en: 'meaning of every afternoon', example: 'I read books every afternoon after school.' },
    'My name': { word: 'My name', pronunciation: '/my name/', definition_vi: '(cụm từ: my name)', definition_en: 'Multi-word phrase: my name', example: 'Use of \'my name\' in natural context.' },
    'When I draw': { word: 'When I draw', pronunciation: '/when i draw/', definition_vi: 'Khi tôi vẽ', definition_en: 'meaning of when i draw', example: 'When I draw, I feel very creative and happy.' },
    'When I play': { word: 'When I play', pronunciation: '/when i play/', definition_vi: 'Khi tôi chơi', definition_en: 'meaning of when i play', example: 'When I play, I smile.' },
    'When I read': { word: 'When I read', pronunciation: '/when i read/', definition_vi: 'Khi tôi đọc', definition_en: 'meaning of when i read', example: 'When I read, I feel very happy.' },
    'before bed': { word: 'before bed', pronunciation: '/before bed/', definition_vi: 'trước khi ngủ', definition_en: 'meaning of before bed', example: 'I read books before bed.' },
    'draw pictures': { word: 'draw pictures', pronunciation: '/draw pictures/', definition_vi: 'vẽ tranh', definition_en: 'meaning of draw pictures', example: 'I draw pictures of animals and flowers.' },
    'every afternoon': { word: 'every afternoon', pronunciation: '/every afternoon/', definition_vi: 'mỗi buổi chiều', definition_en: 'meaning of every afternoon', example: 'I read books every afternoon after school.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'feel very happy': { word: 'feel very happy', pronunciation: '/feel very happy/', definition_vi: 'feel very happy', definition_en: 'meaning of feel very happy', example: 'This is an example: feel very happy.' },
    'happy things': { word: 'happy things', pronunciation: '/happy things/', definition_vi: 'những thứ hạnh phúc', definition_en: 'Multi-word phrase: happy things', example: 'The phrase \'happy things\' is commonly used in conversation.' },
    'happy time': { word: 'happy time', pronunciation: '/happy time/', definition_vi: 'thời gian hạnh phúc', definition_en: 'Multi-word phrase: happy time', example: 'The phrase \'happy time\' is commonly used in conversation.' },
    'play with': { word: 'play with', pronunciation: '/play with/', definition_vi: 'chơi với', definition_en: 'meaning of play with', example: 'After lunch, I play with my friends.' },
    'read books': { word: 'read books', pronunciation: '/read books/', definition_vi: 'đọc sách', definition_en: 'meaning of read books', example: 'I read books before bed.' }
};
