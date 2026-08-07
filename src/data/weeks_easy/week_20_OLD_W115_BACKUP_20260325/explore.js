export default {
  title_en: "Old vs New",
  title_vi: "Cũ và Mới",
  image_url: "/images/week20_easy/explore_cover_w20.jpg",
  content_en: "In my house, there are many **different** things. My video game is **new** and shiny. But Grandma's **chair** is **old** and **dusty**. An old toy might be **broken**, but it is still special. We keep **photos** in a box to remember the **past**. **Grandma** loves her old **house** very much. We should take care of **dirty** things and clean them. Old things tell us **stories**.",
  content_vi: "Trong nhà tớ có nhiều đồ vật khác nhau. Trò chơi điện tử của tớ thì mới và bóng loáng. Nhưng cái ghế của Bà thì cũ và đầy bụi. Một món đồ chơi cũ có thể bị hỏng, nhưng nó vẫn đặc biệt. Chúng tớ giữ những bức ảnh trong hộp để nhớ về quá khứ. Bà yêu ngôi nhà cũ của mình rất nhiều. Chúng ta nên giữ gìn những đồ vật bẩn và lau chùi chúng. Những đồ vật cũ kể cho chúng ta những câu chuyện.",
  check_questions: [
    { id: 1, question_en: "Is the video game old?", answer: ["No, it is new."], hint_en: "No, it...", hint_vi: "Không, nó..." },
    { id: 2, question_en: "What is dusty?", answer: ["Grandma's chair."], hint_en: "Grandma's...", hint_vi: "Cái ghế của..." },
    { id: 3, question_en: "What do old things tell us?", answer: ["Stories."], hint_en: "They tell...", hint_vi: "Chúng kể..." }
  ],
  question: {
    text_en: "Do you like new toys or old toys?",
    text_vi: "Bạn thích đồ chơi mới hay cũ?",
    min_words: 10,
    hint_en: "I like...",
    hint_vi: "Tớ thích..."
  }
};

export const chunk_focus = [
  "different",
  "new",
  "chair",
  "old",
  "dusty",
  "broken",
  "photos",
  "past",
  "Grandma",
  "house",
  "dirty",
  "stories"
];

export const dictionary = {
    'Grandma': { word: 'Grandma', pronunciation: '/grandma/', definition_vi: 'bà', definition_en: 'meaning of grandma', example: 'Grandma bakes the best cookies.' },
    'broken': { word: 'broken', pronunciation: '/broken/', definition_vi: 'bị gãy, bị vỡ', definition_en: 'meaning of broken', example: 'They had courage to fix the broken parts and try again.' },
    'chair': { word: 'chair', pronunciation: '/chair/', definition_vi: 'Ghế', definition_en: 'You sit on it.', example: 'Sit down on this chair.' },
    'different': { word: 'different', pronunciation: '/different/', definition_vi: 'khác', definition_en: 'meaning of different', example: 'This involves different in some way.' },
    'dirty': { word: 'dirty', pronunciation: '/dirty/', definition_vi: 'bẩn', definition_en: 'meaning of dirty', example: 'Your hands are very dirty.' },
    'dusty': { word: 'dusty', pronunciation: '/dusty/', definition_vi: 'đầy bụi', definition_en: 'meaning of dusty', example: 'This involves dusty in some way.' },
    'house': { word: 'house', pronunciation: '/house/', definition_vi: 'ngôi nhà', definition_en: 'a place where you live', example: 'I live in this house.' },
    'new': { word: 'new', pronunciation: '/new/', definition_vi: 'mới', definition_en: 'having recently been made or built; not old', example: 'It was a very new experience for everyone.' },
    'old': { word: 'old', pronunciation: '/old/', definition_vi: 'già', definition_en: 'having lived for a long time', example: 'I am ten years old.' },
    'past': { word: 'past', pronunciation: '/past/', definition_vi: 'quá khứ', definition_en: 'the time before now', example: 'We walked past the school.' },
    'photos': { word: 'photos', pronunciation: '/photos/', definition_vi: 'ảnh', definition_en: 'meaning of photos', example: 'We take photos on the last day of school.' },
    'stories': { word: 'stories', pronunciation: '/stories/', definition_vi: 'câu chuyện', definition_en: 'meaning of stories', example: 'Grandma tells us bedtime stories.' }
};
