export default {
  title: "My Happy Jar",
  image_url: "/images/week4/read_cover_w04.jpg",
  content_en: "**My name** is Sam. I have a **happy jar** **at home**. **Every day**, I put **happy things** in my jar. When I am **playing with my dog**, I **feel excited**. I put a yellow star in my jar. When I am **reading a good book**, I **feel calm** and **feel happy**. I put a blue heart in my jar. When I am **drawing colorful pictures**, I **feel creative**. I put a green circle in my jar. **My mom** is **friendly and funny**. She **makes me laugh** **every day**. I love my **happy jar**. It helps me **remember all the happy moments**. My jar is now full of **happy things**!",
  content_vi: "Tên tôi là Sam. Tôi có một chiếc hũ hạnh phúc ở nhà. Mỗi ngày, tôi bỏ những thứ hạnh phúc vào hũ của mình. Khi tôi chơi với con chó của mình, tôi cảm thấy phấn khích. Tôi bỏ một ngôi sao màu vàng vào hũ của mình. Khi tôi đọc một cuốn sách hay, tôi cảm thấy bình tĩnh và hạnh phúc. Tôi bỏ một trái tim màu xanh vào hũ của mình. Khi tôi vẽ tranh, tôi cảm thấy sáng tạo. Tôi bỏ một hình tròn màu xanh lá vào hũ của mình. Mẹ tôi rất thân thiện và hài hước. Bà làm tôi cười mỗi ngày. Tôi yêu chiếc hũ hạnh phúc của mình. Nó giúp tôi nhớ lại tất cả những khoảnh khắc tốt đẹp trong cuộc sống của mình. Bây giờ hũ của tôi đầy những thứ hạnh phúc!",
  comprehension_questions: [
    { id: 1, question_en: "What does Sam have at home?", answer: ["a happy jar", "happy jar"], clue_statement: "Sam has a happy jar at home.", hint_en: "It starts with 'h'...", hint_vi: "Nó bắt đầu bằng chữ 'h'..." },
    { id: 2, question_en: "What color is the star?", answer: ["yellow", "yellow star"], clue_statement: "Yellow star.", hint_en: "The color of the sun...", hint_vi: "Màu của mặt trời..." },
    { id: 3, question_en: "Who is friendly and funny?", answer: ["mom", "his mom", "Sam's mom", "mother"], clue_statement: "Sam's mom is friendly and funny.", hint_en: "She makes Sam laugh...", hint_vi: "Bà làm Sam cười..." }
  ],
  question: {
    text_en: "What makes you feel happy? What do you like to do?",
    text_vi: "�iều gì làm bạn cảm thấy hạnh phúc? Bạn thích làm gì?",
    min_words: 30,
    hint_en: "Think about things you enjoy doing...",
    hint_vi: "Hãy nghĩ về những điều bạn thích làm..."
  }
};

export const chunk_focus = [
  "My name",
  "happy jar",
  "at home",
  "Every day",
  "happy things",
  "playing with my dog",
  "feel excited",
  "reading a good book",
  "feel calm",
  "feel happy",
  "drawing colorful pictures",
  "feel creative",
  "My mom",
  "friendly and funny",
  "makes me laugh",
  "every day",
  "remember all the happy moments"
];

export const dictionary = {
    'Every day': { word: 'Every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'My mom': { word: 'My mom', pronunciation: '/my mom/', definition_vi: '(cụm từ: my mom)', definition_en: 'Multi-word phrase: my mom', example: 'Use of \'my mom\' in natural context.' },
    'My name': { word: 'My name', pronunciation: '/my name/', definition_vi: '(cụm từ: my name)', definition_en: 'Multi-word phrase: my name', example: 'Use of \'my name\' in natural context.' },
    'at home': { word: 'at home', pronunciation: '/at home/', definition_vi: 'ở nhà', definition_en: 'meaning of at home', example: 'I have a happy jar at home.' },
    'drawing colorful pictures': { word: 'drawing colorful pictures', pronunciation: '/drawing colorful pictures/', definition_vi: 'vẽ tranh nhiều màu', definition_en: 'meaning of drawing colorful pictures', example: 'The artist sat on the grass, drawing colorful pictures of the garden.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'feel calm': { word: 'feel calm', pronunciation: '/feel calm/', definition_vi: 'cảm thấy bình tĩnh', definition_en: 'meaning of feel calm', example: 'When I am reading a good book, I feel calm and feel happy.' },
    'feel creative': { word: 'feel creative', pronunciation: '/feel creative/', definition_vi: 'cảm thấy sáng tạo', definition_en: 'meaning of feel creative', example: 'I feel creative when I am drawing pictures.' },
    'feel excited': { word: 'feel excited', pronunciation: '/feel excited/', definition_vi: 'cảm thấy hào hứng', definition_en: 'meaning of feel excited', example: 'When I am playing with my dog, I feel excited.' },
    'feel happy': { word: 'feel happy', pronunciation: '/feel happy/', definition_vi: 'cảm thấy hạnh phúc', definition_en: 'meaning of feel happy', example: 'When I am reading a good book, I feel calm and feel happy.' },
    'friendly and funny': { word: 'friendly and funny', pronunciation: '/friendly and funny/', definition_vi: 'thân thiện và vui nhộn', definition_en: 'meaning of friendly and funny', example: 'Our neighbour is friendly and funny — he always makes us laugh.' },
    'happy jar': { word: 'happy jar', pronunciation: '/happy jar/', definition_vi: 'hũ hạnh phúc', definition_en: 'Multi-word phrase: happy jar', example: 'The phrase \'happy jar\' is commonly used in conversation.' },
    'happy things': { word: 'happy things', pronunciation: '/happy things/', definition_vi: 'những thứ hạnh phúc', definition_en: 'Multi-word phrase: happy things', example: 'The phrase \'happy things\' is commonly used in conversation.' },
    'makes me laugh': { word: 'makes me laugh', pronunciation: '/makes me laugh/', definition_vi: 'làm tôi cười', definition_en: 'meaning of makes me laugh', example: 'My little brother is so funny — his jokes always makes me laugh out loud.' },
    'playing with my dog': { word: 'playing with my dog', pronunciation: '/playing with my dog/', definition_vi: 'chơi với chó của tôi', definition_en: 'meaning of playing with my dog', example: 'After school, I enjoy playing with my dog in the garden.' },
    'reading a good book': { word: 'reading a good book', pronunciation: '/reading a good book/', definition_vi: 'đọc sách hay', definition_en: 'meaning of reading a good book', example: 'Spending an afternoon reading a good book is one of the best ways to relax.' },
    'remember all the happy moments': { word: 'remember all the happy moments', pronunciation: '/remember all the happy moments/', definition_vi: 'nhớ những khoảnh khắc hạnh phúc', definition_en: 'meaning of remember all the happy moments', example: 'Photos help us remember all the happy moments from our summer holiday.' }
};
