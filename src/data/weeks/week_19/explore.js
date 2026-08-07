export default {
  title_en: "How We Grow and Change",
  title_vi: "Cách chúng ta lớn lên và thay đổi",
  image_url: "/images/week19/explore_cover_w19.jpg",
  audio_url: "/audio/week19/explore_main.mp3",
  
  content_en: `When you **look at** **old photos** in an album, you see your past. You **were a baby** - very small and cute! But now you are bigger. How did you grow?

	 When you **were a baby**, your bones were soft and small. **As time passed**, you **began to grow**. Your bones got longer and stronger!

	 Food helps us grow. Calcium makes bones strong. Vitamins from vegetables **help your body grow** healthy too.

	 Sleep is important! During sleep, your body grows. This is why children need more sleep than adults.

	 Your brain also grows! When you were in **kindergarten**, you learned to count and read. Each **memory you make** helps your brain grow stronger.

	 **Every year** you **grow bigger**. **Look at** **old photos** - you were so little! Now you are tall. You can learn things you couldn't learn when you were young.

	 The past shows us how much we have changed. But growing never stops! Growing is about becoming smarter and more capable!

	 These memories of when we were small are precious. Everyone grows **at their own pace**!`,

  content_vi: `Khi bạn nhìn những ảnh cũ trong một album, bạn thấy quá khứ của mình. Bạn đã từng là một em bé - rất nhỏ và dễ thương! Nhưng bây giờ bạn lớn hơn. Bạn đã lớn lên như thế nào?

    Khi bạn là một em bé, xương mềm và nhỏ. Theo thời gian trôi qua, bạn bắt đầu lớn lên. Xương dài hơn và chắc hơn!

    Thức ăn giúp chúng ta lớn lên. Canxi làm xương chắc khỏe. Vitamin từ rau giúp cơ thể lớn lên khỏe mạnh.

    Giấc ngủ cũng quan trọng! Trong lúc ngủ, cơ thể lớn lên. Đây là lý do trẻ em cần ngủ nhiều hơn người lớn.

    Não của bạn cũng lớn lên! Khi bạn học mẫu giáo, bạn học đếm và đọc. Mỗi kỷ niệm giúp não lớn lên mạnh hơn.

    Mỗi năm bạn lớn lên hơn. Nhìn ảnh cũ - bạn đã rất nhỏ! Bây giờ bạn cao. Bạn có thể học những điều không thể học khi còn nhỏ.

    Quá khứ cho chúng ta thấy chúng ta đã thay đổi bao nhiêu. Nhưng lớn lên không bao giờ dừng lại! Lớn lên là trở nên thông minh và có khả năng hơn!

    Những kỷ niệm về khi chúng ta còn nhỏ thật quý giá. Mỗi người lớn lên theo tốc độ riêng!`,
  check_questions: [
    {
      id: 1,
      question_en: "What helps make our bones strong?",
      question_vi: "Cái gì giúp xương chúng ta chắc khỏe?",
      answer: ["Calcium", "Milk", "Calcium from milk"],
      hint_en: "Cal...",
      hint_vi: "Can..."
    },
    {
      id: 2,
      question_en: "When does our body grow?",
      question_vi: "Khi nào cơ thể chúng ta lớn lên?",
      answer: ["During sleep", "When we sleep", "While sleeping"],
      hint_en: "During...",
      hint_vi: "Trong..."
    },
    {
      id: 3,
      question_en: "What helps our brain grow stronger?",
      question_vi: "Cái gì giúp não chúng ta mạnh hơn?",
      answer: ["Memories", "Learning", "Making memories", "Learning new things"],
      hint_en: "M... or L...",
      hint_vi: "Kỷ... hoặc Học..."
    }
  ],
  question: {
    text_en: "Look at an old photo of yourself. How have you grown and changed? Write about the differences.",
    text_vi: "Nhìn một bức ảnh cũ của bạn. Bạn đã lớn lên và thay đổi như thế nào? Viết về những sự khác biệt.",
    min_words: 20,
    hint_en: "I was... Now I am... I have grown...",
    hint_vi: "Tôi đã... Bây giờ tôi... Tôi đã lớn lên..."
  }
};

export const chunk_focus = [
  "look at",
  "old photos",
  "were a baby",
  "As time passed",
  "began to grow",
  "help your body grow",
  "kindergarten",
  "memory you make",
  "Every year",
  "grow bigger",
  "Look at",
  "at their own pace"
];

export const dictionary = {
    'As time passed': { word: 'As time passed', pronunciation: '/as time passed/', definition_vi: 'khi thời gian trôi qua', definition_en: 'meaning of as time passed', example: 'This is an example: as time passed.' },
    'Every year': { word: 'Every year', pronunciation: '/every year/', definition_vi: 'mỗi năm', definition_en: 'meaning of every year', example: 'This is an example: every year.' },
    'Look at': { word: 'Look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'at their own pace': { word: 'at their own pace', pronunciation: '/at their own pace/', definition_vi: 'theo tốc độ của riêng họ', definition_en: 'at a speed that is comfortable for them', example: 'The students learn at their own pace.' },
    'began to grow': { word: 'began to grow', pronunciation: '/began to grow/', definition_vi: 'bắt đầu mọc lên', definition_en: 'started to grow', example: 'The seeds began to grow after the rain.' },
    'grow bigger': { word: 'grow bigger', pronunciation: '/grow bigger/', definition_vi: 'lớn hơn', definition_en: 'meaning of grow bigger', example: 'I grow bigger every year.' },
    'help your body grow': { word: 'help your body grow', pronunciation: '/help your body grow/', definition_vi: 'giúp cơ thể bạn phát triển', definition_en: 'support healthy growth of your body', example: 'Eating fruit can help your body grow strong.' },
    'kindergarten': { word: 'kindergarten', pronunciation: '/kindergarten/', definition_vi: 'mẫu giáo', definition_en: 'a school for young children ages 3-5', example: 'My little sister started kindergarten this week.' },
    'look at': { word: 'look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'memory you make': { word: 'memory you make', pronunciation: '/memory you make/', definition_vi: 'memory you make', definition_en: 'meaning of memory you make', example: 'This is an example: memory you make.' },
    'old photos': { word: 'old photos', pronunciation: '/old photos/', definition_vi: 'ảnh cũ', definition_en: 'meaning of old photos', example: 'Looking through old photos, we saw what our town looked like long ago.' },
    'were a baby': { word: 'were a baby', pronunciation: '/were a baby/', definition_vi: 'were a baby', definition_en: 'meaning of were a baby', example: 'This is an example: were a baby.' }
};
