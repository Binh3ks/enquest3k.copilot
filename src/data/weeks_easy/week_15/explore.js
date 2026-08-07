export default {
  title: "Explore My World - I Love Parks!",
  image_url: "/images/week15/explore_cover_w15.jpg",
  audio_url: "/audio/week15_easy/explore_main.mp3",
  content_en: "I love **going to the park**! The park near **my house** is my **favorite place**. Every weekend, **my family** goes there together. **My dad** is jogging on the big path. He is wearing his red sports shirt. I can see him running! **My mom** is **sitting on a bench**. She is reading her book and relaxing. Sometimes she is watching me play. I am running and playing **with my friends**. We are laughing and **having so much fun**! My **little brother** is **flying his yellow kite**. The kite is **going very high**! Near the fountain, other kids are playing too. Some families are **having picnics** on the grass. They are eating yummy food together. I am relaxing **under a big tree**. The tree gives me **nice shade**. The park is so fun and beautiful. I go there every week!",
  content_vi: "Tôi thích đi công viên! Công viên gần nhà tôi là nơi yêu thích của tôi. Mỗi cuối tuần, gia đình tôi đều đến đó cùng nhau. Chúng tôi làm gì ở công viên? Bố tôi đang chạy bộ quanh con đường lớn. Bố đang mặc áo thể thao màu đỏ. Tôi có thể thấy bố đang chạy! Mẹ tôi đang ngồi trên ghế. Mẹ đang đọc sách và thư giãn. Đôi khi mẹ đang quan sát tôi chơi. Tôi đang chạy và chơi với bạn bè. Chúng tôi đang cười và vui lắm! Em trai nhỏ của tôi đang thả diều màu vàng. Con diều đang bay rất cao trên trời. Em ấy vui lắm! Gần đài phun nước, những đứa trẻ khác cũng đang chơi. Chúng đang tạt nước và chạy xung quanh. Một số gia đình đang dã ngoại trên cỏ. Họ đang cùng nhau ăn đồ ăn ngon. Một ông già đang dắt chó đi dạo. Con chó dễ thương và thân thiện. Tôi muốn vuốt nó! Tôi đang thư giãn dưới một cái cây lớn bây giờ. Cái cây cho tôi bóng mát dễ chịu. Công viên vui và đẹp quá. Tôi đến đó mỗi tuần!",
  check_questions: [
    {
      id: 1,
      question_en: "What color is the writer's dad's sports shirt?",
      answer: ["red", "red shirt"],
      hint_en: "A color...",
      hint_vi: "Một màu sắc..."
    },
    {
      id: 2,
      question_en: "What is mom doing on the bench?",
      answer: ["reading her book", "reading", "reading and relaxing"],
      hint_en: "An activity with a book...",
      hint_vi: "Một hoạt động với sách..."
    },
    {
      id: 3,
      question_en: "What color is little brother's kite?",
      answer: ["yellow", "yellow kite"],
      hint_en: "A color...",
      hint_vi: "Một màu sắc..."
    }
  ],
  question: {
    text_en: "What do you and your family do at the park? Write 2 or more sentences using is/are + verb-ing.",
    text_vi: "Bạn và gia đình làm gì ở công viên? Viết 2 câu trở lên dùng is/are + động từ-ing.",
    min_words: 20,
    hint_en: "Try: 'My dad is jogging. My mom is ... I am ...'",
    hint_vi: "Thử: 'Bố tôi đang chạy bộ. Mẹ tôi đang ... Tôi đang ...'"
  }
};

export const chunk_focus = [
  "going to the park",
  "my house",
  "favorite place",
  "my family",
  "My dad",
  "My mom",
  "sitting on a bench",
  "with my friends",
  "having so much fun",
  "little brother",
  "flying his yellow kite",
  "going very high",
  "having picnics",
  "under a big tree",
  "nice shade"
];

export const dictionary = {
    'My dad': { word: 'My dad', pronunciation: '/my dad/', definition_vi: '(cụm từ: my dad)', definition_en: 'Multi-word phrase: my dad', example: 'Use of \'my dad\' in natural context.' },
    'My mom': { word: 'My mom', pronunciation: '/my mom/', definition_vi: '(cụm từ: my mom)', definition_en: 'Multi-word phrase: my mom', example: 'Use of \'my mom\' in natural context.' },
    'favorite place': { word: 'favorite place', pronunciation: '/favorite place/', definition_vi: 'favorite place', definition_en: 'meaning of favorite place', example: 'This is an example: favorite place.' },
    'flying his yellow kite': { word: 'flying his yellow kite', pronunciation: '/flying his yellow kite/', definition_vi: 'thả chiếc diều vàng của cậu ấy', definition_en: 'making his yellow kite move in the sky', example: 'The boy is flying his yellow kite in the park.' },
    'going to the park': { word: 'going to the park', pronunciation: '/going to the park/', definition_vi: 'going to the park', definition_en: 'meaning of going to the park', example: 'This is an example: going to the park.' },
    'going very high': { word: 'going very high', pronunciation: '/going very high/', definition_vi: 'bay rất cao', definition_en: 'meaning of going very high', example: 'It is going very high!' },
    'having picnics': { word: 'having picnics', pronunciation: '/having picnics/', definition_vi: 'having picnics', definition_en: 'meaning of having picnics', example: 'This is an example: having picnics.' },
    'having so much fun': { word: 'having so much fun', pronunciation: '/having so much fun/', definition_vi: 'having so much fun', definition_en: 'meaning of having so much fun', example: 'This is an example: having so much fun.' },
    'little brother': { word: 'little brother', pronunciation: '/little brother/', definition_vi: 'em trai', definition_en: 'Multi-word phrase: little brother', example: 'The phrase \'little brother\' is commonly used in conversation.' },
    'my family': { word: 'my family', pronunciation: '/my family/', definition_vi: '(cụm từ: my family)', definition_en: 'Multi-word phrase: my family', example: 'Use of \'my family\' in natural context.' },
    'my house': { word: 'my house', pronunciation: '/my house/', definition_vi: '(cụm từ: my house)', definition_en: 'Multi-word phrase: my house', example: 'Use of \'my house\' in natural context.' },
    'nice shade': { word: 'nice shade', pronunciation: '/nice shade/', definition_vi: 'bóng mát đẹp', definition_en: 'Multi-word phrase: nice shade', example: 'The phrase \'nice shade\' is commonly used in conversation.' },
    'sitting on a bench': { word: 'sitting on a bench', pronunciation: '/sitting on a bench/', definition_vi: 'ngồi trên ghế dài', definition_en: 'meaning of sitting on a bench', example: 'We sitting on a bench together whenever we can.' },
    'under a big tree': { word: 'under a big tree', pronunciation: '/under a big tree/', definition_vi: 'under a big tree', definition_en: 'meaning of under a big tree', example: 'This is an example: under a big tree.' },
    'with my friends': { word: 'with my friends', pronunciation: '/with my friends/', definition_vi: '(cụm từ: with my friends)', definition_en: 'Multi-word phrase: with my friends', example: 'Use of \'with my friends\' in natural context.' }
};
