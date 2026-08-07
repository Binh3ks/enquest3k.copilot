export default {
  title_en: "My Day",
  title_vi: "Ngày Của Tôi",
  image_url: "/images/week13/explore_cover_w13.jpg",
  audio_url: "/audio/week13_easy/explore_main.mp3",
  content_en: "**Every child** has a day! **In the morning**, you **wake up**. You **brush your teeth**. Then you **eat breakfast**. **Some children** **eat rice**. **Some children** eat bread. **After breakfast**, you **go to school**. **At school**, you **play with friends**. You **have lunch**. **After school**, you **do homework**. **In the evening**, you **eat dinner** with your family. You **watch tv**. Then it is time for sleep! You **brush your teeth** again and **go to bed**. **Every day** you do the same things. This is your routine! Routines are good. They help you **every day**!",
  content_vi: "Mọi trẻ em đều có một ngày! Vào buổi sáng, bạn thức dậy. Bạn đánh răng. Sau đó bạn ăn sáng. Một số trẻ ăn cơm. Một số trẻ ăn bánh mì. Sau bữa sáng, bạn đi học. Ở trường, bạn chơi với bạn bè. Bạn ăn trưa. Sau giờ học, bạn làm bài tập. Vào buổi tối, bạn ăn tối với gia đình. Bạn xem TV. Sau đó đến giờ đi ngủ! Bạn đánh răng lại và đi ngủ. Mỗi ngày bạn đều làm những điều giống nhau. Đây là thói quen của bạn! Thói quen rất tốt. Chúng giúp bạn mỗi ngày!",
  check_questions: [
    {
      id: 1,
      question_en: "What do you do in the morning?",
      answer: ["wake up", "brush teeth", "eat breakfast", "eat"],
      hint_en: "Think about morning time...",
      hint_vi: "Nghĩ về buổi sáng..."
    },
    {
      id: 2,
      question_en: "What do you do after school?",
      answer: ["homework", "do homework", "play", "play with friends"],
      hint_en: "After school you...",
      hint_vi: "Sau giờ học bạn..."
    },
    {
      id: 3,
      question_en: "What do you do before bed?",
      answer: ["brush teeth", "watch TV", "brush my teeth"],
      hint_en: "Before sleep you...",
      hint_vi: "Trước khi ngủ bạn..."
    }
  ],
  question: {
    text_en: "What do you do every day? Tell me about your day!",
    text_vi: "Bạn làm gì mỗi ngày? Kể cho mình về ngày của bạn!",
    min_words: 20,
    hint_en: "Think about morning, school, and night...",
    hint_vi: "Nghĩ về buổi sáng, trường, và buổi tối..."
  }
};

export const chunk_focus = [
  "Every child",
  "In the morning",
  "wake up",
  "brush your teeth",
  "eat breakfast",
  "Some children",
  "eat rice",
  "After breakfast",
  "go to school",
  "At school",
  "play with friends",
  "have lunch",
  "After school",
  "do homework",
  "In the evening",
  "eat dinner",
  "watch tv",
  "go to bed",
  "Every day",
  "every day"
];

export const dictionary = {
    'After breakfast': { word: 'After breakfast', pronunciation: '/after breakfast/', definition_vi: 'sau bữa sáng', definition_en: 'Multi-word phrase: after breakfast', example: 'The phrase \'after breakfast\' is commonly used in conversation.' },
    'After school': { word: 'After school', pronunciation: '/after school/', definition_vi: 'sau giờ học', definition_en: 'Multi-word phrase: after school', example: 'The phrase \'after school\' is commonly used in conversation.' },
    'At school': { word: 'At school', pronunciation: '/at school/', definition_vi: 'ở trường', definition_en: 'meaning of at school', example: 'At school, there is a whiteboard in the classroom.' },
    'Every child': { word: 'Every child', pronunciation: '/every child/', definition_vi: 'mỗi đứa trẻ', definition_en: 'Multi-word phrase: every child', example: 'The phrase \'every child\' is commonly used in conversation.' },
    'Every day': { word: 'Every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'In the evening': { word: 'In the evening', pronunciation: '/in the evening/', definition_vi: '(cụm từ: in the evening)', definition_en: 'Multi-word phrase: in the evening', example: 'Use of \'in the evening\' in natural context.' },
    'In the morning': { word: 'In the morning', pronunciation: '/in the morning/', definition_vi: '(cụm từ: in the morning)', definition_en: 'Multi-word phrase: in the morning', example: 'Use of \'in the morning\' in natural context.' },
    'Some children': { word: 'Some children', pronunciation: '/some children/', definition_vi: 'vài trẻ em', definition_en: 'Multi-word phrase: some children', example: 'The phrase \'some children\' is commonly used in conversation.' },
    'brush your teeth': { word: 'brush your teeth', pronunciation: '/brush your teeth/', definition_vi: 'chải răng', definition_en: 'meaning of brush your teeth', example: 'Remember to brush your teeth twice a day, morning and night.' },
    'do homework': { word: 'do homework', pronunciation: '/do homework/', definition_vi: 'làm bài tập', definition_en: 'meaning of do homework', example: 'I do homework every evening after school.' },
    'eat breakfast': { word: 'eat breakfast', pronunciation: '/eat breakfast/', definition_vi: 'ăn sáng', definition_en: 'meaning of eat breakfast', example: 'Then I eat breakfast with my family.' },
    'eat dinner': { word: 'eat dinner', pronunciation: '/eat dinner/', definition_vi: 'ăn tối', definition_en: 'meaning of eat dinner', example: 'This is an example: eat dinner.' },
    'eat rice': { word: 'eat rice', pronunciation: '/eat rice/', definition_vi: 'ăn cơm', definition_en: 'Multi-word phrase: eat rice', example: 'The phrase \'eat rice\' is commonly used in conversation.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'go to bed': { word: 'go to bed', pronunciation: '/go to bed/', definition_vi: 'đi ngủ', definition_en: 'meaning of go to bed', example: 'I go to bed at nine oclock every night.' },
    'go to school': { word: 'go to school', pronunciation: '/go to school/', definition_vi: 'đi học', definition_en: 'meaning of go to school', example: 'I also go to school on Monday to read and learn.' },
    'have lunch': { word: 'have lunch', pronunciation: '/have lunch/', definition_vi: 'ăn trưa', definition_en: 'meaning of have lunch', example: 'Then we have lunch at a restaurant.' },
    'play with friends': { word: 'play with friends', pronunciation: '/play with friends/', definition_vi: 'chơi với bạn bè', definition_en: 'meaning of play with friends', example: 'This is an example: play with friends.' },
    'wake up': { word: 'wake up', pronunciation: '/wake up/', definition_vi: 'thức dậy', definition_en: 'meaning of wake up', example: 'Every morning, I wake up early and get ready for school.' },
    'watch tv': { word: 'watch tv', pronunciation: '/watch tv/', definition_vi: 'xem ti vi', definition_en: 'meaning of watch tv', example: 'After dinner, I watch TV and watch cartoons.' }
};
