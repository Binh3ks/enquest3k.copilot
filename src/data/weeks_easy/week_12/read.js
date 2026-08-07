export default {
  title: "My Talents",
  image_url: "/images/week12/read_cover_w12.jpg",
  audio_url: "/audio/week12_easy/read_explore_main.mp3",
  content_en: "I have many talents! I can **sing happy songs**. I sing **every day** **at home**. I can **dance to music**. I dance and **have fun**. I can **run fast** **in the park**. I run **with my friends**. I can **jump over small boxes**. I jump and laugh. I can **climb on the playground**. I climb up high. I can **draw pictures of** **my family**. I draw with colors. I can **ride my bike to school**. I ride **every morning**. I can **swim in the pool**. I swim in summer. I can cook with **my mom**. I cook easy food. I can **play games** **with my friends**. I **play after school**. What can you do?",
  content_vi: "Tôi có nhiều tài năng! Tôi có thể hát những bài hát vui. Tôi hát mỗi ngày ở nhà. Tôi có thể nhảy khi nghe nhạc. Tôi nhảy và vui chơi. Tôi có thể chạy nhanh trong công viên. Tôi chạy với bạn bè. Tôi có thể nhảy qua những hộp nhỏ. Tôi nhảy và cười. Tôi có thể leo trên sân chơi. Tôi leo lên cao. Tôi có thể vẽ tranh gia đình. Tôi vẽ với màu sắc. Tôi có thể đi xe đạp đến trường. Tôi đi xe mỗi sáng. Tôi có thể bơi trong bể. Tôi bơi vào mùa hè. Tôi có thể nấu ăn với mẹ. Tôi nấu đồ ăn dễ. Tôi có thể chơi game với bạn. Tôi chơi sau giờ học. Bạn có thể làm gì?",
  comprehension_questions: [
    { id: 1, question_en: "What can I do with music?", answer: ["sing", "dance", "sing and dance"], clue_statement: "Sing and dance.", hint_en: "Make sounds or move...", hint_vi: "Tạo âm thanh hoặc di chuyển..." },
    { id: 2, question_en: "Where do I run?", answer: ["park", "in the park", "the park"], clue_statement: "I run in the park.", hint_en: "A place with grass...", hint_vi: "Nơi có cỏ..." },
    { id: 3, question_en: "What do I draw?", answer: ["family", "pictures of family", "my family"], clue_statement: "I draw pictures of my family.", hint_en: "People I love...", hint_vi: "Người tôi yêu..." },
  ],
  question: {
    text_en: "What can you do? What is your talent?",
    text_vi: "Bạn có thể làm gì? Tài năng của bạn là gì?",
    min_words: 25,
    hint_en: "Talk about your abilities...",
    hint_vi: "Nói về khả năng của bạn..."
  }
  };

export const chunk_focus = [
  "sing happy songs",
  "every day",
  "at home",
  "dance to music",
  "have fun",
  "run fast",
  "in the park",
  "with my friends",
  "jump over small boxes",
  "climb on the playground",
  "draw pictures of",
  "my family",
  "ride my bike to school",
  "every morning",
  "swim in the pool",
  "my mom",
  "play games",
  "play after school"
];

export const dictionary = {
    'at home': { word: 'at home', pronunciation: '/at home/', definition_vi: 'ở nhà', definition_en: 'meaning of at home', example: 'I have a happy jar at home.' },
    'climb on the playground': { word: 'climb on the playground', pronunciation: '/climb on the playground/', definition_vi: 'leo trên sân chơi', definition_en: 'meaning of climb on the playground', example: 'I can climb on the playground.' },
    'dance to music': { word: 'dance to music', pronunciation: '/dance to music/', definition_vi: 'nhảy theo nhạc', definition_en: 'move your body when you hear music', example: 'The children love to dance to music.' },
    'draw pictures of': { word: 'draw pictures of', pronunciation: '/draw pictures of/', definition_vi: 'draw pictures of', definition_en: 'meaning of draw pictures of', example: 'This is an example: draw pictures of.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'every morning': { word: 'every morning', pronunciation: '/every morning/', definition_vi: 'mỗi sáng', definition_en: 'each morning', example: 'He walks to school every morning.' },
    'have fun': { word: 'have fun', pronunciation: '/have fun/', definition_vi: 'vui vẻ', definition_en: 'meaning of have fun', example: 'This is an example: have fun.' },
    'in the park': { word: 'in the park', pronunciation: '/in the park/', definition_vi: 'trong công viên', definition_en: 'meaning of in the park', example: 'Last Sunday, the children had a picnic in the park.' },
    'jump over small boxes': { word: 'jump over small boxes', pronunciation: '/jump over small boxes/', definition_vi: 'nhảy qua hộp nhỏ', definition_en: 'meaning of jump over small boxes', example: 'I can jump over small boxes.' },
    'my family': { word: 'my family', pronunciation: '/my family/', definition_vi: '(cụm từ: my family)', definition_en: 'Multi-word phrase: my family', example: 'Use of \'my family\' in natural context.' },
    'my mom': { word: 'my mom', pronunciation: '/my mom/', definition_vi: '(cụm từ: my mom)', definition_en: 'Multi-word phrase: my mom', example: 'Use of \'my mom\' in natural context.' },
    'play after school': { word: 'play after school', pronunciation: '/play after school/', definition_vi: 'chơi sau giờ học', definition_en: 'meaning of play after school', example: 'She play after school with her friends after school.' },
    'play games': { word: 'play games', pronunciation: '/play games/', definition_vi: '(cụm từ: play games)', definition_en: 'Multi-word phrase: play games', example: 'Use of \'play games\' in natural context.' },
    'ride my bike to school': { word: 'ride my bike to school', pronunciation: '/ride my bike to school/', definition_vi: 'đi xe đạp đến trường', definition_en: 'meaning of ride my bike to school', example: 'I can ride my bike to school.' },
    'run fast': { word: 'run fast', pronunciation: '/run fast/', definition_vi: 'chạy nhanh', definition_en: 'meaning of run fast', example: 'The fastest runner on the team can run fast and win every race.' },
    'sing happy songs': { word: 'sing happy songs', pronunciation: '/sing happy songs/', definition_vi: 'hát bài hát vui', definition_en: 'meaning of sing happy songs', example: 'I can sing happy songs.' },
    'swim in the pool': { word: 'swim in the pool', pronunciation: '/swim in the pool/', definition_vi: 'bơi trong bể', definition_en: 'meaning of swim in the pool', example: 'I can swim in the pool.' },
    'with my friends': { word: 'with my friends', pronunciation: '/with my friends/', definition_vi: '(cụm từ: with my friends)', definition_en: 'Multi-word phrase: with my friends', example: 'Use of \'with my friends\' in natural context.' }
};
