export default {
  title: "My House",
  image_url: "/images/week5/read_cover_w05.jpg",
  audio_url: "/audio/week5_easy/read_explore_main.mp3",
  content_en: "**My name** is Tim. I live in a house. **My house** has many rooms. I sleep **in my bedroom**. I have a **soft bed** **in my bedroom**. I eat **in the kitchen**. I **sit on** a chair **at the table**. I **wash my hands** **in the bathroom**. I **watch TV** **in the living room** **every evening**. I like **to explore** **every room**. **Every room** in **my house** is fun. I love **my house**!",
  content_vi: "Tên tôi là Tim. Tôi sống trong một ngôi nhà. Ngôi nhà của tôi có nhiều phòng. Tôi ngủ trong phòng ngủ của tôi. Tôi có một cái giường trong phòng ngủ. Tôi ăn trong bếp. Tôi ngồi trên ghế ở bàn. Tôi rửa tay trong phòng tắm. Tôi xem TV trong phòng khách. Tôi thích khám phá ngôi nhà của mình. Mỗi phòng đều vui. Tôi yêu ngôi nhà của mình!",
  comprehension_questions: [
    { id: 1, question_en: "What is his name?", answer: ["Tim"], clue_statement: "His name is Tim.", hint_en: "It starts with 'T'...", hint_vi: "Nó bắt đầu bằng chữ 'T'..." },
    { id: 2, question_en: "Where does he sleep?", answer: ["bedroom", "in his bedroom", "in the bedroom"], clue_statement: "He sleeps in his bedroom.", hint_en: "The room where you sleep...", hint_vi: "Phòng mà bạn ngủ..." },
    { id: 3, question_en: "What is in his bedroom?", answer: ["bed", "a bed"], clue_statement: "There is a bed in his bedroom.", hint_en: "You sleep on it...", hint_vi: "Bạn ngủ trên nó..." },
    { id: 4, question_en: "Where do I live?", answer: ["house", "in a house"], clue_statement: "I live in a house.", hint_en: "A place...", hint_vi: "Một nơi..." },
    { id: 5, question_en: "Where do I eat?", answer: ["kitchen", "in the kitchen"], clue_statement: "I eat in the kitchen.", hint_en: "A place...", hint_vi: "Một nơi..." },
    { id: 6, question_en: "Where do I sit?", answer: ["chair at the table", "on a chair at the table"], clue_statement: "I sit on a chair at the table.", hint_en: "A place...", hint_vi: "Một nơi..." }
  ],
  question: {
    text_en: "What rooms are in your house? What do you do in each room?",
    text_vi: "Ngôi nhà của bạn có những phòng nào? Bạn làm gì ở mỗi phòng?",
    min_words: 20,
    hint_en: "Talk about your bedroom, kitchen, bathroom...",
    hint_vi: "Nói về phòng ngủ, bếp, phòng tắm của bạn..."
  }
};

export const chunk_focus = [
  "My name",
  "My house",
  "in my bedroom",
  "soft bed",
  "in the kitchen",
  "sit on",
  "at the table",
  "wash my hands",
  "in the bathroom",
  "watch TV",
  "in the living room",
  "every evening",
  "to explore",
  "every room",
  "Every room",
  "my house"
];

export const dictionary = {
    'Every room': { word: 'Every room', pronunciation: '/every room/', definition_vi: 'mỗi phòng', definition_en: 'Multi-word phrase: every room', example: 'The phrase \'every room\' is commonly used in conversation.' },
    'My house': { word: 'My house', pronunciation: '/my house/', definition_vi: '(cụm từ: my house)', definition_en: 'Multi-word phrase: my house', example: 'Use of \'my house\' in natural context.' },
    'My name': { word: 'My name', pronunciation: '/my name/', definition_vi: '(cụm từ: my name)', definition_en: 'Multi-word phrase: my name', example: 'Use of \'my name\' in natural context.' },
    'at the table': { word: 'at the table', pronunciation: '/at the table/', definition_vi: 'ở bàn', definition_en: 'meaning of at the table', example: 'I sit on a chair at the table.' },
    'every evening': { word: 'every evening', pronunciation: '/every evening/', definition_vi: 'mỗi buổi tối', definition_en: 'meaning of every evening', example: 'We have dinner together every evening and talk about our day.' },
    'every room': { word: 'every room', pronunciation: '/every room/', definition_vi: 'mỗi phòng', definition_en: 'Multi-word phrase: every room', example: 'The phrase \'every room\' is commonly used in conversation.' },
    'in my bedroom': { word: 'in my bedroom', pronunciation: '/in my bedroom/', definition_vi: 'trong phòng ngủ', definition_en: 'meaning of in my bedroom', example: 'My name is Tim. I live in a house. My house has many rooms. I sleep in my bedroom. I have a soft bed in my bedroom. I eat in the kitchen.' },
    'in the bathroom': { word: 'in the bathroom', pronunciation: '/in the bathroom/', definition_vi: 'trong phòng tắm', definition_en: 'meaning of in the bathroom', example: 'I wash my hands in the bathroom.' },
    'in the kitchen': { word: 'in the kitchen', pronunciation: '/in the kitchen/', definition_vi: 'trong bếp', definition_en: 'meaning of in the kitchen', example: 'In the kitchen, I open the cabinet and look in the fridge.' },
    'in the living room': { word: 'in the living room', pronunciation: '/in the living room/', definition_vi: 'trong phòng khách', definition_en: 'meaning of in the living room', example: 'We watch TV in the living room.' },
    'my house': { word: 'my house', pronunciation: '/my house/', definition_vi: '(cụm từ: my house)', definition_en: 'Multi-word phrase: my house', example: 'Use of \'my house\' in natural context.' },
    'sit on': { word: 'sit on', pronunciation: '/sit on/', definition_vi: 'ngồi trên', definition_en: 'meaning of sit on', example: 'I sit on a chair at the table.' },
    'soft bed': { word: 'soft bed', pronunciation: '/soft bed/', definition_vi: 'giường mềm', definition_en: 'Multi-word phrase: soft bed', example: 'The phrase \'soft bed\' is commonly used in conversation.' },
    'to explore': { word: 'to explore', pronunciation: '/to explore/', definition_vi: 'để khám phá', definition_en: 'meaning of to explore', example: 'I like to explore every room.' },
    'wash my hands': { word: 'wash my hands', pronunciation: '/wash my hands/', definition_vi: 'rửa tay', definition_en: 'meaning of wash my hands', example: 'I wash my hands in the bathroom.' },
    'watch TV': { word: 'watch TV', pronunciation: '/watch tv/', definition_vi: 'xem ti vi', definition_en: 'meaning of watch tv', example: 'After dinner, I watch TV and watch cartoons.' }
};
