export default {
  title: "My Rainy Day",
  image_url: "/images/week17/read_cover_w17.jpg",
  audio_url: "/audio/week17_easy/read_main.mp3",
  content_en: "Today **it is raining**! I **look out the window**. The sky is gray. It is cold outside. I **pick up** my coat. I **put on** my boots. I carry my umbrella. Now I **am ready**! I am wearing my coat and boots. I **walk to school**. My feet stay dry. My body is warm. The rain falls from the clouds. I **put on** my raincoat. I love **rainy days**! I can **jump in puddles**. The **sound of rain** is nice. I wear my raincoat too. Rain **helps the trees grow**! We love **rainy weather**!",
  content_vi: "Hôm nay trời đang mưa! Tôi nhìn ra cửa sổ. Bầu trời màu xám. Trời lạnh bên ngoài. Tôi lấy áo khoác. Tôi mang ủng. Tôi mang ô. Bây giờ tôi sẵn sàng rồi! Tôi đang mặc áo khoác và ủng. Tôi đi bộ đến trường. Chân tôi không bị ướt. Người tôi ấm. Mưa rơi từ mây. Cô giáo tôi nói mưa được gọi là lượng mưa. Nước bay lên như sự bốc hơi. Rồi nó rơi xuống thành mưa! Đôi khi trời nắng. Nhưng hôm nay trời đang mưa. Tôi thích những ngày mưa! Tôi có thể nhảy trong vũng nước. Tiếng mưa hay. Tôi cũng mặc áo mưa. Mưa giúp cây lớn lên.",
  comprehension_questions: [
    { id: 1, question_en: "What is the weather like today?", answer: ["It is raining", "Raining", "It is cold and raining"], clue_statement: "It is cold and raining.", hint_en: "The weather is...", hint_vi: "Thời tiết..." },
    { id: 2, question_en: "What is the child wearing?", answer: ["A coat and boots", "Coat and boots", "Wearing a coat and boots"], clue_statement: "The child is wearing a coat and boots.", hint_en: "The child is wearing...", hint_vi: "Đứa trẻ đang mặc..." },
    { id: 3, question_en: "What is precipitation?", answer: ["Rain", "Rain is precipitation", "Precipitation is rain"], clue_statement: "Rain is precipitation.", hint_en: "Precipitation is...", hint_vi: "Lượng mưa là..." },
    { id: 4, question_en: "What is the sky like?", answer: ["gray", "The sky is gray"], clue_statement: "The sky is gray.", hint_en: "Think about the sky...", hint_vi: "Nghĩ về bầu trời..." },
    { id: 5, question_en: "How is my body?", answer: ["warm", "My body is warm"], clue_statement: "My body is warm.", hint_en: "A describing word...", hint_vi: "Một từ miêu tả..." }
  ]
};

export const chunk_focus = [
  "it is raining",
  "look out the window",
  "pick up",
  "put on",
  "am ready",
  "walk to school",
  "rainy days",
  "jump in puddles",
  "sound of rain",
  "helps the trees grow",
  "rainy weather"
];

export const dictionary = {
    'am ready': { word: 'am ready', pronunciation: '/am ready/', definition_vi: 'đã sẵn sàng', definition_en: 'meaning of am ready', example: 'I have my backpack and my lunch — I am ready for school!' },
    'helps the trees grow': { word: 'helps the trees grow', pronunciation: '/helps the trees grow/', definition_vi: 'helps the trees grow', definition_en: 'meaning of helps the trees grow', example: 'This is an example: helps the trees grow.' },
    'it is raining': { word: 'it is raining', pronunciation: '/it is raining/', definition_vi: 'trời đang mưa', definition_en: 'meaning of it is raining', example: 'This morning, it is raining very hard.' },
    'jump in puddles': { word: 'jump in puddles', pronunciation: '/jump in puddles/', definition_vi: 'nhảy trong vũng nước', definition_en: 'meaning of jump in puddles', example: 'I can jump in puddles.' },
    'look out the window': { word: 'look out the window', pronunciation: '/look out the window/', definition_vi: 'nhìn ra cửa sổ', definition_en: 'meaning of look out the window', example: 'I like to look out the window and watch the clouds float by.' },
    'pick up': { word: 'pick up', pronunciation: '/pick up/', definition_vi: 'nhặt lên', definition_en: 'meaning of pick up', example: 'This is an example: pick up.' },
    'put on': { word: 'put on', pronunciation: '/put on/', definition_vi: 'mặc', definition_en: 'meaning of put on', example: 'This is an example: put on.' },
    'rainy days': { word: 'rainy days', pronunciation: '/rainy days/', definition_vi: 'những ngày mưa', definition_en: 'meaning of rainy days', example: 'I love rainy days!' },
    'rainy weather': { word: 'rainy weather', pronunciation: '/rainy weather/', definition_vi: 'thời tiết mưa', definition_en: 'meaning of rainy weather', example: 'Rainy weather makes me want to read books and drink hot chocolate.' },
    'sound of rain': { word: 'sound of rain', pronunciation: '/sound of rain/', definition_vi: 'tiếng mưa', definition_en: 'meaning of sound of rain', example: 'The sound of rain on the roof helped me fall asleep at night.' },
    'walk to school': { word: 'walk to school', pronunciation: '/walk to school/', definition_vi: 'đi bộ đến trường', definition_en: 'meaning of walk to school', example: 'Every morning, I walk to school with my best friend down the quiet street.' }
};
