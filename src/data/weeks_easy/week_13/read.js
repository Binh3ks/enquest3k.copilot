export default {
  title: "My Day",
  image_url: "/images/week13/read_cover_w13.jpg",
  audio_url: "/audio/week13_easy/read_explore_main.mp3",
  content_en: "**My name** is Tom. This is **my day**. I **wake up**. **Mom wakes** me up. I **brush my teeth**. I **eat breakfast**. I like bread. I **go to school**. I see **my teacher**. I play **at school**. I **play with** Ben. We **have fun**. I **have lunch**. Lunch is good. I **come home**. Mom is home. I **do homework**. I write **my name**. I **have dinner**. Dad is home too. Dinner is yummy. I **watch TV**. I **watch cartoons**. I **go to bed**. I close my eyes. **Good night**!",
  content_vi: "Tên tôi là Tom. Đây là một ngày của tôi. Tôi thức dậy. Mẹ đánh thức tôi. Tôi đánh răng. Tôi ăn sáng. Tôi thích bánh mì. Tôi đi học. Tôi gặp cô giáo. Tôi chơi ở trường. Tôi chơi với Ben. Chúng tôi vui. Tôi ăn trưa. Bữa trưa ngon. Tôi về nhà. Mẹ ở nhà. Tôi làm bài tập. Tôi viết tên tôi. Tôi ăn tối. Bố cũng ở nhà. Bữa tối ngon. Tôi xem ti vi. Tôi xem hoạt hình. Tôi đi ngủ. Tôi nhắm mắt. Chúc ngủ ngon!",
  comprehension_questions: [
    { id: 1, question_en: "What is the child's name?", answer: ["Tom"], clue_statement: "The child's name is Tom.", hint_en: "The name...", hint_vi: "Tên..." },
    { id: 2, question_en: "What does Tom eat for breakfast?", answer: ["bread"], clue_statement: "Tom eats bread for breakfast.", hint_en: "Food...", hint_vi: "Thức ăn..." },
    { id: 3, question_en: "What does Tom watch?", answer: ["TV", "cartoons", "television"], clue_statement: "Tom watches TV.", hint_en: "On TV...", hint_vi: "Trên ti vi..." },
  ],
  question: {
    text_en: "What is YOUR day? Tell me!",
    text_vi: "Ngày của BẠN thế nào? Kể cho mình!",
    min_words: 10,
    hint_en: "I wake up, I eat, I play...",
    hint_vi: "Tôi thức dậy, tôi ăn, tôi chơi..."
  }
  };

export const chunk_focus = [
  "My name",
  "my day",
  "wake up",
  "Mom wakes",
  "brush my teeth",
  "eat breakfast",
  "go to school",
  "my teacher",
  "at school",
  "play with",
  "have fun",
  "have lunch",
  "come home",
  "do homework",
  "my name",
  "have dinner",
  "watch TV",
  "watch cartoons",
  "go to bed",
  "Good night"
];

export const dictionary = {
    'Good night': { word: 'Good night', pronunciation: '/good night/', definition_vi: '(cụm từ: good night)', definition_en: 'Multi-word phrase: good night', example: 'Use of \'good night\' in natural context.' },
    'Mom wakes': { word: 'Mom wakes', pronunciation: '/mom wakes/', definition_vi: 'mẹ đánh thức', definition_en: 'Multi-word phrase: mom wakes', example: 'The phrase \'mom wakes\' is commonly used in conversation.' },
    'My name': { word: 'My name', pronunciation: '/my name/', definition_vi: '(cụm từ: my name)', definition_en: 'Multi-word phrase: my name', example: 'Use of \'my name\' in natural context.' },
    'at school': { word: 'at school', pronunciation: '/at school/', definition_vi: 'ở trường', definition_en: 'meaning of at school', example: 'At school, there is a whiteboard in the classroom.' },
    'brush my teeth': { word: 'brush my teeth', pronunciation: '/brush my teeth/', definition_vi: 'đánh răng', definition_en: 'meaning of brush my teeth', example: 'I brush my teeth with my blue toothbrush.' },
    'come home': { word: 'come home', pronunciation: '/come home/', definition_vi: '(cụm từ: come home)', definition_en: 'Multi-word phrase: come home', example: 'Use of \'come home\' in natural context.' },
    'do homework': { word: 'do homework', pronunciation: '/do homework/', definition_vi: 'làm bài tập', definition_en: 'meaning of do homework', example: 'I do homework every evening after school.' },
    'eat breakfast': { word: 'eat breakfast', pronunciation: '/eat breakfast/', definition_vi: 'ăn sáng', definition_en: 'meaning of eat breakfast', example: 'Then I eat breakfast with my family.' },
    'go to bed': { word: 'go to bed', pronunciation: '/go to bed/', definition_vi: 'đi ngủ', definition_en: 'meaning of go to bed', example: 'I go to bed at nine oclock every night.' },
    'go to school': { word: 'go to school', pronunciation: '/go to school/', definition_vi: 'đi học', definition_en: 'meaning of go to school', example: 'I also go to school on Monday to read and learn.' },
    'have dinner': { word: 'have dinner', pronunciation: '/have dinner/', definition_vi: 'ăn tối', definition_en: 'meaning of have dinner', example: 'At 7 o\'clock, I have dinner with my family.' },
    'have fun': { word: 'have fun', pronunciation: '/have fun/', definition_vi: 'vui vẻ', definition_en: 'meaning of have fun', example: 'This is an example: have fun.' },
    'have lunch': { word: 'have lunch', pronunciation: '/have lunch/', definition_vi: 'ăn trưa', definition_en: 'meaning of have lunch', example: 'Then we have lunch at a restaurant.' },
    'my day': { word: 'my day', pronunciation: '/my day/', definition_vi: '(cụm từ: my day)', definition_en: 'Multi-word phrase: my day', example: 'Use of \'my day\' in natural context.' },
    'my name': { word: 'my name', pronunciation: '/my name/', definition_vi: '(cụm từ: my name)', definition_en: 'Multi-word phrase: my name', example: 'Use of \'my name\' in natural context.' },
    'my teacher': { word: 'my teacher', pronunciation: '/my teacher/', definition_vi: '(cụm từ: my teacher)', definition_en: 'Multi-word phrase: my teacher', example: 'Use of \'my teacher\' in natural context.' },
    'play with': { word: 'play with', pronunciation: '/play with/', definition_vi: 'chơi với', definition_en: 'meaning of play with', example: 'After lunch, I play with my friends.' },
    'wake up': { word: 'wake up', pronunciation: '/wake up/', definition_vi: 'thức dậy', definition_en: 'meaning of wake up', example: 'Every morning, I wake up early and get ready for school.' },
    'watch TV': { word: 'watch TV', pronunciation: '/watch tv/', definition_vi: 'xem ti vi', definition_en: 'meaning of watch tv', example: 'After dinner, I watch TV and watch cartoons.' },
    'watch cartoons': { word: 'watch cartoons', pronunciation: '/watch cartoons/', definition_vi: 'xem phim hoạt hình', definition_en: 'Multi-word phrase: watch cartoons', example: 'The phrase \'watch cartoons\' is commonly used in conversation.' }
};
