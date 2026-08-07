export default {
  title: "My Old Photo Album",
  image_url: "/images/week19/read_cover_w19.jpg",
  content_en: "Today I found an album in my grandma's house. It is full of photos from the past. **Look at** this one! Who is this **cute baby**? My **mom says**, 'That's you!' I was so little! My face **was round and** my eyes **were very big**. In this photo, I was **one year old**. I was noisy. My **mom says** I cried many times. But in this picture, I was quiet and **fast asleep**. My **grandma says**, 'You were so cute. Everyone loved you.' Here is another photo. I was in **kindergarten**. I was five **years old**. I was not a baby anymore. I **was young**. I **was little**, but I **began to grow**. **Look at** my clothes! They were so small! I cannot wear them now. I **grow bigger** **every year**. My body **gets taller** and stronger. These photos are **special memories**. They **help me** remember who I was when I **was little**. Now I am big! I have grown **so much**. But I still keep these photos **in my heart**. **The past was different**. It helps me see how much I have grown up.",
  content_vi: "Hôm nay tôi tìm thấy một cuốn album trong nhà bà. Nó đầy những ảnh từ quá khứ. Nhìn xem đi! Ai là em bé này? Mẹ tôi nói, \"Đó là con!\" Tôi nhỏ bé! Tôi nhỏ bé và dễ thương. Mặt tôi tròn và mắt tôi to. Trong ảnh này, tôi mới một tuổi. Tôi ồn ào. Mẹ tôi nói tôi khóc nhiều lần. Nhưng trong ảnh này, tôi yên lặng. Tôi ngủ say. Bà tôi nói, \"Con dễ thương. Mọi người yêu con.\" Đây là ảnh khác. Tôi ở mẫu giáo. Tôi năm tuổi. Tôi không còn là em bé nữa. Tôi nhỏ tuổi. Tôi nhỏ bé, nhưng tôi bắt đầu lớn lên. Nhìn xem quần áo của tôi! Chúng nhỏ! Tôi không thể mặc chúng bây giờ. Tôi lớn lên mỗi năm. Cơ thể tôi cao hơn và khỏe hơn. Những ảnh này là kỷ niệm đặc biệt. Chúng cho tôi thấy khi tôi nhỏ bé. Bây giờ tôi lớn rồi! Tôi lớn lên nhiều. Nhưng tôi vẫn giữ những kỷ niệm này trong tim. Quá khứ khác rồi. Nó giúp tôi nhớ tôi đã từng là ai khi lớn lên.",
  audio_url: "/audio/week19/read_main.mp3",
  comprehension_questions: [
    { id: 1, question_en: "What did the child find at grandma's house?", answer: ["An old album", "A photo album", "An album"], clue_statement: "The child found a photo album at grandma's house.", hint_en: "The child found...", hint_vi: "Đứa trẻ tìm thấy..." },
    { id: 2, question_en: "How was the child when they were a baby?", answer: ["Small and cute", "Little and cute", "Noisy", "Small"], clue_statement: "Little and cute.", hint_en: "The child was...", hint_vi: "Đứa trẻ..." },
    { id: 3, question_en: "What do the photos help the child remember?", answer: ["When they were small", "The past", "Their memories", "Who they were"], clue_statement: "When they were small.", hint_en: "The photos help...", hint_vi: "Những ảnh giúp..." },
    {
      id: 4,
      question_en: "What does my mom say?",
      answer: ["I cried a lot", "I cried many times", "i cried a lot"],
      clue_statement: "My mom says I cried a lot.",
      hint_en: "Think about what my mom says...",
      hint_vi: "Nghĩ về điều mẹ nói..."
    }
  ]
};

export const chunk_focus = [
  "Look at",
  "cute baby",
  "mom says",
  "was round and",
  "were very big",
  "one year old",
  "fast asleep",
  "grandma says",
  "kindergarten",
  "years old",
  "was young",
  "was little",
  "began to grow",
  "grow bigger",
  "every year",
  "gets taller",
  "special memories",
  "help me",
  "so much",
  "in my heart",
  "The past was different"
];

export const dictionary = {
    'Look at': { word: 'Look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'The past was different': { word: 'The past was different', pronunciation: '/the past was different/', definition_vi: 'Quá khứ khác rồi', definition_en: 'meaning of the past was different', example: 'The past was different.' },
    'began to grow': { word: 'began to grow', pronunciation: '/began to grow/', definition_vi: 'bắt đầu mọc lên', definition_en: 'started to grow', example: 'The seeds began to grow after the rain.' },
    'cute baby': { word: 'cute baby', pronunciation: '/cute baby/', definition_vi: 'em bé dễ thương', definition_en: 'Multi-word phrase: cute baby', example: 'The phrase \'cute baby\' is commonly used in conversation.' },
    'every year': { word: 'every year', pronunciation: '/every year/', definition_vi: 'mỗi năm', definition_en: 'meaning of every year', example: 'This is an example: every year.' },
    'fast asleep': { word: 'fast asleep', pronunciation: '/fast asleep/', definition_vi: 'ngủ say', definition_en: 'meaning of fast asleep', example: 'This is an example: fast asleep.' },
    'gets taller': { word: 'gets taller', pronunciation: '/gets taller/', definition_vi: 'cao hơn', definition_en: 'meaning of gets taller', example: 'My body gets taller and stronger.' },
    'grandma says': { word: 'grandma says', pronunciation: '/grandma says/', definition_vi: 'bà nói', definition_en: 'Multi-word phrase: grandma says', example: 'The phrase \'grandma says\' is commonly used in conversation.' },
    'grow bigger': { word: 'grow bigger', pronunciation: '/grow bigger/', definition_vi: 'lớn hơn', definition_en: 'meaning of grow bigger', example: 'I grow bigger every year.' },
    'help me': { word: 'help me', pronunciation: '/help me/', definition_vi: 'giúp đỡ me', definition_en: 'English phrase: help me', example: 'The phrase \'help me\' means giúp đỡ me.' },
    'in my heart': { word: 'in my heart', pronunciation: '/in my heart/', definition_vi: 'trong heart của tôi', definition_en: 'English collocation / phrase: in my heart', example: 'I keep things in my heart.' },
    'kindergarten': { word: 'kindergarten', pronunciation: '/kindergarten/', definition_vi: 'mẫu giáo', definition_en: 'a school for young children ages 3-5', example: 'My little sister started kindergarten this week.' },
    'mom says': { word: 'mom says', pronunciation: '/mom says/', definition_vi: 'mẹ nói', definition_en: 'Multi-word phrase: mom says', example: 'The phrase \'mom says\' is commonly used in conversation.' },
    'one year old': { word: 'one year old', pronunciation: '/one year old/', definition_vi: 'một tuổi', definition_en: 'Multi-word phrase: one year old', example: 'The phrase \'one year old\' is commonly used in conversation.' },
    'so much': { word: 'so much', pronunciation: '/so much/', definition_vi: 'rất much', definition_en: 'Collocation: so much', example: 'The students learned \'so much\' in their English lesson.' },
    'special memories': { word: 'special memories', pronunciation: '/special memories/', definition_vi: 'kỷ niệm đặc biệt', definition_en: 'meaning of special memories', example: 'These photos are special memories.' },
    'was little': { word: 'was little', pronunciation: '/was little/', definition_vi: 'nhỏ bé', definition_en: 'meaning of was little', example: 'I was little!' },
    'was round and': { word: 'was round and', pronunciation: '/was round and/', definition_vi: 'tròn và', definition_en: 'meaning of was round and', example: 'The word was round and is used in everyday English conversation.' },
    'was young': { word: 'was young', pronunciation: '/was young/', definition_vi: 'còn trẻ', definition_en: 'meaning of was young', example: 'I was young.' },
    'were very big': { word: 'were very big', pronunciation: '/were very big/', definition_vi: 'rất to', definition_en: 'meaning of were very big', example: 'When dinosaurs walked on Earth, some animals were very big indeed.' },
    'years old': { word: 'years old', pronunciation: '/years old/', definition_vi: 'tuổi', definition_en: 'Multi-word phrase: years old', example: 'The phrase \'years old\' is commonly used in conversation.' }
};
