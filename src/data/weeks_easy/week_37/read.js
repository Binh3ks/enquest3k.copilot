export default {
  title: "The Fun Sports Day",
  image_url: "/images/week37/read_cover_w37.jpg",
  audio_url: "/audio/week37_easy/read_main.mp3",
  content_en: `On **Saturday morning**, Leo **went to the park** for sports day. The sun **was warm and bright**.

Leo **ran very fast** in the race. He **passed the baton** to his friend Maya. Maya **ran across the grass** quickly.

Everyone **watched and clapped**. They **were tired but happy** when they won!`,
  content_vi: `Vào sáng thứ Bảy, Leo đến công viên tham gia ngày hội thể thao. Mặt trời ấm và sáng.

Leo chạy rất nhanh trong cuộc đua. Cậu ấy truyền gậy tiếp sức cho bạn Maya. Maya chạy qua bãi cỏ nhanh chóng.

Mọi người xem và vỗ tay. Họ mệt nhưng rất vui khi giành chiến thắng!`,
  comprehension_questions: [
    { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the park"], clue_statement: "Leo went to the park on Saturday morning.", hint_en: "To the...", hint_vi: "Đến..." }
  ]
};

export const chunk_focus = [
  "Saturday morning",
  "went to the park",
  "was warm and bright",
  "ran very fast",
  "passed the baton",
  "ran across the grass",
  "watched and clapped",
  "were tired but happy"
];

export const dictionary = {
  'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', definition_en: 'Morning of Saturday', example: 'On Saturday morning, we went to the park.' },
  'went to the park': { word: 'went to the park', pronunciation: '/went tuː ðə pɑːk/', definition_vi: 'đã đến công viên', definition_en: 'Traveled to the park', example: 'Leo went to the park.' },
  'was warm and bright': { word: 'was warm and bright', pronunciation: '/wəz wɔːm ənd braɪt/', definition_vi: 'trời ấm và sáng', definition_en: 'Pleasant sunny weather', example: 'The day was warm and bright.' },
  'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', definition_en: 'Moved fast on foot', example: 'Leo ran very fast.' },
  'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy tiếp sức', definition_en: 'Handed over the stick', example: 'He passed the baton.' },
  'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', definition_en: 'Sprinted over grass', example: 'Maya ran across the grass.' },
  'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', definition_en: 'Applauded while watching', example: 'They watched and clapped.' },
  'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', definition_en: 'Tired yet cheerful', example: 'They were tired but happy.' }
};
