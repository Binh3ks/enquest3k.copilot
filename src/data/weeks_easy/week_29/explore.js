export default {
  title: "Amazing Jobs",
  image_url: "/images/week29/explore_cover_w29.jpg",
  content_en: "Lily met **many people** with amazing jobs on her **magic trip**!\n\nA pilot flies aeroplanes. **The pilot** takes passengers safely from one country to another. **On the ground**, a driver drives buses, taxis, and trucks. A driver helps people travel **every single day**. Without drivers, buses and taxis could not move at all!\n\nA farmer **grows food** **for us**. The farmer works on a farm and grows vegetables, fruit, and rice. We **eat food** **every day** **because of** farmers. Without farmers, there would be no food on our tables!\n\nA teacher helps children learn. The teacher explains **new things** and **answers questions**. A **great teacher** can **change a student's life** forever. Learning is a **great adventure**!\n\nAt the hospital, a doctor helps **sick people** **get better**. A nurse works with **the doctor** and **looks after** patients **every day**. Both **the doctor** and **the nurse** are true heroes!\n\nAll these jobs are very important! Which job do you like best?",
  content_vi: "Lily g\u1eb7p nhi\u1ec1u ng\u01b0\u1eddi c\u00f3 c\u00f4ng vi\u1ec7c tuy\u1ec7t v\u1eddi trong chuy\u1ebfn \u0111i k\u1ef3 di\u1ec7u!\n\nPhi c\u00f4ng l\u00e1i m\u00e1y bay. T\u00e0i x\u1ebf l\u00e1i xe bu\u00fdt v\u00e0 taxi. N\u00f4ng d\u00e2n tr\u1ed3ng l\u01b0\u01a1ng th\u1ef1c cho ch\u00fang ta.\n\nGi\u00e1o vi\u00ean gi\u00fap tr\u1ebb em h\u1ecdc t\u1eadp. B\u00e1c s\u0129 gi\u00fap ng\u01b0\u1eddi b\u1ec7nh kh\u1ecfe l\u1ea1i. Y t\u00e1 ch\u0103m s\u00f3c b\u1ec7nh nh\u00e2n m\u1ed7i ng\u00e0y.\n\nT\u1ea5t c\u1ea3 c\u00e1c c\u00f4ng vi\u1ec7c n\u00e0y \u0111\u1ec1u r\u1ea5t quan tr\u1ecdng!",
  audio_url: "/audio/week29_easy/explore_main.mp3",
  check_questions: [
    {
      id: 1,
      question_en: "What does a pilot do?",
      answer: ["A pilot flies aeroplanes", "The pilot flies planes", "A pilot takes passengers from one place to another by plane"],
      hint_en: "A pilot ___ aeroplanes.",
      hint_vi: "Phi công ___ máy bay.",
      audio_url: "/audio/week29_easy/explore_q1.mp3"
    },
    {
      id: 2,
      question_en: "What does a farmer do?",
      answer: ["A farmer grows food for us", "Farmers grow vegetables, fruit, and rice", "A farmer works on a farm and grows food"],
      hint_en: "A farmer ___ food for us.",
      hint_vi: "Nông dân ___ thức ăn cho chúng ta.",
      audio_url: "/audio/week29_easy/explore_q2.mp3"
    },
    {
      id: 3,
      question_en: "Who works with the doctor at the hospital?",
      answer: ["The nurse", "A nurse works with the doctor", "Nurses work with doctors"],
      hint_en: "At the hospital, the ___ works with the doctor.",
      hint_vi: "Ở bệnh viện, ___ làm việc cùng bác sĩ.",
      audio_url: "/audio/week29_easy/explore_q3.mp3"
    }
  ],
  question: {
    text_en: "Choose two jobs from the article. Write about what each person does and explain why you think their job is important. Use at least four vocabulary words.",
    text_vi: "Chọn hai nghề trong bài. Viết về mỗi người làm gì và giải thích tại sao bạn nghĩ công việc của họ quan trọng. Dùng ít nhất bốn từ vựng.",
    min_words: 35,
    hint_en: "A pilot flies planes and carries passengers. This job is important because... A farmer grows food. Without farmers...",
    hint_vi: "Phi công lái máy bay và chở hành khách. Công việc này quan trọng vì... Nông dân trồng lương thực. Không có nông dân..."
  }
};

export const chunk_focus = [
  "many people",
  "magic trip",
  "The pilot",
  "On the ground",
  "every single day",
  "grows food",
  "for us",
  "eat food",
  "every day",
  "because of",
  "new things",
  "answers questions",
  "great teacher",
  "change a student",
  ",",
  "change a student's life",
  "great adventure",
  "sick people",
  "get better",
  "the doctor",
  "looks after",
  "the nurse"
];

export const dictionary = {
'On the ground': { word: 'On the ground', pronunciation: '/on the ground/', definition_vi: 'trên ground', definition_en: 'English collocation / phrase: on the ground', example: 'It is located on the ground.' },
    'The pilot': { word: 'The pilot', pronunciation: '/the pilot/', definition_vi: 'phi công', definition_en: 'meaning of the pilot', example: 'The pilot flew the airplane safely through the cloudy weather to the destination.' },
    'answers questions': { word: 'answers questions', pronunciation: '/answers questions/', definition_vi: 'trả lời câu hỏi', definition_en: 'meaning of answers questions', example: 'This is an example: answers questions.' },
    'because of': { word: 'because of', pronunciation: '/because of/', definition_vi: 'bởi vì', definition_en: 'meaning of because of', example: 'This is an example: because of.' },
    'change a student\'s life': { word: 'change a student\'s life', pronunciation: '/change a student\'s life/', definition_vi: 'thay đổi cuộc đời của một học sinh', definition_en: 'ESL phrase: change a student\'s life', example: 'The students practiced using \'change a student\'s life\' in class.' },
    'eat food': { word: 'eat food', pronunciation: '/eat food/', definition_vi: 'ăn thức ăn', definition_en: 'English phrase: eat food', example: 'The phrase \'eat food\' means ăn thức ăn.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'every single day': { word: 'every single day', pronunciation: '/every single day/', definition_vi: 'từng ngày một', definition_en: 'meaning of every single day', example: 'This is an example: every single day.' },
    'for us': { word: 'for us', pronunciation: '/for us/', definition_vi: 'cho chúng tôi', definition_en: 'meaning of for us', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'get better': { word: 'get better', pronunciation: '/get better/', definition_vi: 'khá hơn', definition_en: 'meaning of get better', example: 'This is an example: get better.' },
    'great adventure': { word: 'great adventure', pronunciation: '/great adventure/', definition_vi: 'cuộc phiêu lưu tuyệt vời', definition_en: 'meaning of great adventure', example: 'The journey to the hidden island was a great adventure for the explorers.' },
    'great teacher': { word: 'great teacher', pronunciation: '/great teacher/', definition_vi: 'giáo viên tuyệt vời', definition_en: 'Multi-word phrase: great teacher', example: 'The phrase \'great teacher\' is commonly used in conversation.' },
    'grows food': { word: 'grows food', pronunciation: '/grows food/', definition_vi: 'grows thức ăn', definition_en: 'English phrase: grows food', example: 'The phrase \'grows food\' means grows thức ăn.' },
    'looks after': { word: 'looks after', pronunciation: '/looks after/', definition_vi: 'chăm sóc', definition_en: 'takes care of someone or something', example: 'She looks after her little brother at home.' },
    'magic trip': { word: 'magic trip', pronunciation: '/magic trip/', definition_vi: 'chuyến đi kỳ diệu', definition_en: 'meaning of magic trip', example: 'The magic trip took us to a beautiful island surrounded by blue sea.' },
    'many people': { word: 'many people', pronunciation: '/many people/', definition_vi: 'nhiều người', definition_en: 'Multi-word phrase: many people', example: 'The phrase \'many people\' is commonly used in conversation.' },
    'new things': { word: 'new things', pronunciation: '/new things/', definition_vi: 'những thứ mới', definition_en: 'Multi-word phrase: new things', example: 'The phrase \'new things\' is commonly used in conversation.' },
    'sick people': { word: 'sick people', pronunciation: '/sick people/', definition_vi: 'người ốm', definition_en: 'Multi-word phrase: sick people', example: 'The phrase \'sick people\' is commonly used in conversation.' },
    'the doctor': { word: 'the doctor', pronunciation: '/the doctor/', definition_vi: 'bác sĩ', definition_en: 'meaning of the doctor', example: 'The doctor checked the patient carefully and gave her some medicine.' },
    'the nurse': { word: 'the nurse', pronunciation: '/the nurse/', definition_vi: 'y tá', definition_en: 'meaning of the nurse', example: 'The nurse put a bandage on the child’s scraped knee gently.' },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  },
  "change a student's life": {
    word: "change a student's life",
    pronunciation: "/change a student's life/",
    definition_vi: "change a student's life",
    definition_en: "Context phrase: change a student's life",
    example: "We practiced change a student's life today."
  }
};
