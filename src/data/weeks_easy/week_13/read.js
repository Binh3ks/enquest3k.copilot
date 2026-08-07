export default {
  title: "My Day",
  image_url: "/images/week13/read_cover_w13.jpg",
  audio_url: "/audio/week13_easy/read_explore_main.mp3",
  content_en: "**My name** is Tom. This is **my day**. I **wake up**. **Mom wakes** me up. I **brush my teeth**. I **eat breakfast**. I like bread. I **go to school**. I see my teacher. I play **at school**. I **play with** Ben. We **have fun**. I **have lunch**. Lunch is good. I **come home**. Mom is home. I **do homework**. I write **my name**. I **have dinner**. Dad is home too. Dinner is yummy. I **watch TV**. I **watch cartoons**. I **go to bed**. I close my eyes. **Good night**!",
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
    'Good night': { word: 'Good night', pronunciation: '/ɡʊd naɪt/', definition_vi: 'Chúc ngủ ngon', definition_en: 'A phrase used when parting at night or before going to sleep', example: 'I said good night to my parents before going to sleep.' },
    'Mom wakes': { word: 'Mom wakes', pronunciation: '/mɒm weɪks/', definition_vi: 'mẹ đánh thức', definition_en: 'Mother awakens someone from sleep', example: 'Mom wakes me up every morning for school.' },
    'My name': { word: 'My name', pronunciation: '/maɪ neɪm/', definition_vi: 'tên của tôi', definition_en: 'Used to introduce oneself', example: 'My name is Tom.' },
    'at school': { word: 'at school', pronunciation: '/æt skuːl/', definition_vi: 'ở trường học', definition_en: 'Present in school', example: 'I play with my friends at school.' },
    'brush my teeth': { word: 'brush my teeth', pronunciation: '/brʌʃ maɪ tiːθ/', definition_vi: 'đánh răng', definition_en: 'To clean teeth using a toothbrush', example: 'I brush my teeth every morning and night.' },
    'come home': { word: 'come home', pronunciation: '/kʌm həʊm/', definition_vi: 'trở về nhà', definition_en: 'To return to one\'s house', example: 'I come home after school finishes.' },
    'do homework': { word: 'do homework', pronunciation: '/duː ˈhəʊmwɜːk/', definition_vi: 'làm bài tập', definition_en: 'To complete assigned school tasks', example: 'I do homework before dinner.' },
    'eat breakfast': { word: 'eat breakfast', pronunciation: '/iːt ˈbrekfəst/', definition_vi: 'ăn sáng', definition_en: 'To consume the first meal of the day', example: 'I eat breakfast with my family.' },
    'go to bed': { word: 'go to bed', pronunciation: '/ɡəʊ tuː bed/', definition_vi: 'đi ngủ', definition_en: 'To lie down in bed to sleep', example: 'I go to bed at nine o\'clock.' },
    'go to school': { word: 'go to school', pronunciation: '/ɡəʊ tuː skuːl/', definition_vi: 'đi học', definition_en: 'To travel to school to learn', example: 'I go to school every morning.' },
    'have dinner': { word: 'have dinner', pronunciation: '/hæv ˈdɪnə/', definition_vi: 'ăn tối', definition_en: 'To consume the main evening meal', example: 'We have dinner together at seven.' },
    'have fun': { word: 'have fun', pronunciation: '/hæv fʌn/', definition_vi: 'vui vẻ', definition_en: 'To experience enjoyment and pleasure', example: 'We have fun playing games together.' },
    'have lunch': { word: 'have lunch', pronunciation: '/hæv lʌntʃ/', definition_vi: 'ăn trưa', definition_en: 'To consume the midday meal', example: 'We have lunch at the school cafeteria.' },
    'my day': { word: 'my day', pronunciation: '/maɪ deɪ/', definition_vi: 'ngày của tôi', definition_en: 'A description of one\'s daily routine', example: 'This is my day from morning to night.' },
    'my name': { word: 'my name', pronunciation: '/maɪ neɪm/', definition_vi: 'tên của tôi', definition_en: 'Used to introduce oneself', example: 'I write my name on my notebook.' },
    'play with': { word: 'play with', pronunciation: '/pleɪ wɪð/', definition_vi: 'chơi cùng', definition_en: 'To engage in play alongside someone', example: 'I play with my friends after class.' },
    'wake up': { word: 'wake up', pronunciation: '/weɪk ʌp/', definition_vi: 'thức dậy', definition_en: 'To stop sleeping and become awake', example: 'I wake up early in the morning.' },
    'watch TV': { word: 'watch TV', pronunciation: '/wɒtʃ ˌtiː ˈviː/', definition_vi: 'xem ti vi', definition_en: 'To view television programming', example: 'I watch TV after finishing my homework.' },
    'watch cartoons': { word: 'watch cartoons', pronunciation: '/wɒtʃ kɑːˈtuːnz/', definition_vi: 'xem phim hoạt hình', definition_en: 'To view animated shows', example: 'I watch cartoons on Saturday morning.' }
};
