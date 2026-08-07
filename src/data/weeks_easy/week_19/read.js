export default {
  title: "My Old Photo Album",
  image_url: "/images/week19/read_cover_w19.jpg",
  audio_url: "/audio/week19_easy/read_main.mp3",
  content_en: "Look! I found an album. It has **old photos**. This is a photo of me. I **was a baby**! I **was little**! I **was little and cute**. My face was round. In this photo, I was **one year old**. I was noisy. But here I **was quiet and sleeping**. My **grandma says**, \"You were cute.\" Here is another photo. I was in kindergarten. I **was five years old**. I was not a baby. I **was young**. I **was little**, but I **began to grow**! **Look at** my old clothes! They were small. I cannot wear them now. I **grow bigger** now! I **get taller**. These photos are **special memories**. They show me when I **remember when I was little**. Now I **am very big**! **The past was different**. But I remember. I **remember when I was little**. I love my **special memories**!",
  content_vi: "Nhìn kìa! Tôi tìm thấy một album. Nó có ảnh cũ. Đây là ảnh của tôi. Tôi là em bé! Tôi nhỏ! Tôi nhỏ và dễ thương. Mặt tôi tròn. Trong ảnh này, tôi mới một tuổi. Tôi ồn ào. Nhưng ở đây tôi yên lặng. Tôi đang ngủ. Bà tôi nói, \"Con dễ thương.\" Đây là ảnh khác. Tôi ở mẫu giáo. Tôi năm tuổi. Tôi không phải em bé nữa. Tôi nhỏ tuổi. Tôi nhỏ, nhưng tôi bắt đầu lớn lên! Nhìn quần áo cũ! Chúng nhỏ. Tôi không mặc được bây giờ. Tôi lớn hơn rồi! Tôi cao hơn. Những ảnh này là kỷ niệm đặc biệt. Chúng cho tôi thấy khi tôi nhỏ bé. Bây giờ tôi lớn rồi! Quá khứ khác rồi. Nhưng tôi nhớ. Tôi nhớ khi tôi nhỏ bé. Tôi yêu kỷ niệm!",
  comprehension_questions: [
    { id: 1, question_en: "What did the child find?", answer: ["An album", "A photo album", "An old album"], clue_statement: "The child found a photo album.", hint_en: "The child found...", hint_vi: "Đứa trẻ tìm thấy..." },
    { id: 2, question_en: "How was the child before?", answer: ["Small and cute", "Small", "Little", "A baby"], clue_statement: "The child was little and cute.", hint_en: "The child was...", hint_vi: "Đứa trẻ..." },
    { id: 3, question_en: "What are the photos?", answer: ["Special memories", "Memories"], clue_statement: "The photos are special memories.", hint_en: "The photos are...", hint_vi: "Những ảnh là..." },
    { id: 4, question_en: "How was the past?", answer: ["different", "The past is different"], clue_statement: "The past was different.", hint_en: "Think about the past...", hint_vi: "Nghĩ về quá khứ..." }
  ]
};

export const chunk_focus = [
  "old photos",
  "was a baby",
  "was little",
  "was little and cute",
  "one year old",
  "was quiet and sleeping",
  "grandma says",
  "was five years old",
  "was young",
  "began to grow",
  "Look at",
  "grow bigger",
  "get taller",
  "special memories",
  "remember when I was little",
  "am very big",
  "The past was different"
];

export const dictionary = {
    'Look at': { word: 'Look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'The past was different': { word: 'The past was different', pronunciation: '/the past was different/', definition_vi: 'Quá khứ khác rồi', definition_en: 'meaning of the past was different', example: 'The past was different.' },
    'am very big': { word: 'am very big', pronunciation: '/am very big/', definition_vi: 'rất lớn rồi', definition_en: 'meaning of am very big', example: 'I am very big now — I can reach the top shelf without help.' },
    'began to grow': { word: 'began to grow', pronunciation: '/began to grow/', definition_vi: 'bắt đầu mọc lên', definition_en: 'started to grow', example: 'The seeds began to grow after the rain.' },
    'get taller': { word: 'get taller', pronunciation: '/get taller/', definition_vi: 'cao hơn', definition_en: 'meaning of get taller', example: 'I get taller.' },
    'grandma says': { word: 'grandma says', pronunciation: '/grandma says/', definition_vi: 'bà nói', definition_en: 'Multi-word phrase: grandma says', example: 'The phrase \'grandma says\' is commonly used in conversation.' },
    'grow bigger': { word: 'grow bigger', pronunciation: '/grow bigger/', definition_vi: 'lớn hơn', definition_en: 'meaning of grow bigger', example: 'I grow bigger every year.' },
    'old photos': { word: 'old photos', pronunciation: '/old photos/', definition_vi: 'ảnh cũ', definition_en: 'meaning of old photos', example: 'Looking through old photos, we saw what our town looked like long ago.' },
    'one year old': { word: 'one year old', pronunciation: '/one year old/', definition_vi: 'một tuổi', definition_en: 'Multi-word phrase: one year old', example: 'The phrase \'one year old\' is commonly used in conversation.' },
    'remember when I was little': { word: 'remember when I was little', pronunciation: '/remember when i was little/', definition_vi: 'nhớ khi tôi còn nhỏ', definition_en: 'meaning of remember when i was little', example: 'They show me when I remember when I was little.' },
    'special memories': { word: 'special memories', pronunciation: '/special memories/', definition_vi: 'kỷ niệm đặc biệt', definition_en: 'meaning of special memories', example: 'These photos are special memories.' },
    'was a baby': { word: 'was a baby', pronunciation: '/was a baby/', definition_vi: 'là em bé', definition_en: 'meaning of was a baby', example: 'I was a baby!' },
    'was five years old': { word: 'was five years old', pronunciation: '/was five years old/', definition_vi: 'năm tuổi', definition_en: 'meaning of was five years old', example: 'She was five years old when she started learning to ride a bike.' },
    'was little': { word: 'was little', pronunciation: '/was little/', definition_vi: 'nhỏ bé', definition_en: 'meaning of was little', example: 'I was little!' },
    'was little and cute': { word: 'was little and cute', pronunciation: '/was little and cute/', definition_vi: 'nhỏ bé và dễ thương', definition_en: 'meaning of was little and cute', example: 'When I was little and cute, I used to follow my mother everywhere.' },
    'was quiet and sleeping': { word: 'was quiet and sleeping', pronunciation: '/was quiet and sleeping/', definition_vi: 'yên lặng và ngủ say', definition_en: 'meaning of was quiet and sleeping', example: 'The baby was quiet and sleeping peacefully in her warm cot.' },
    'was young': { word: 'was young', pronunciation: '/was young/', definition_vi: 'còn trẻ', definition_en: 'meaning of was young', example: 'I was young.' }
};
