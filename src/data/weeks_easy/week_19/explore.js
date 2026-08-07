export default {
  title_en: "How We Grow",
  title_vi: "Cách chúng ta lớn lên",
  image_url: "/images/week19/explore_cover_w19.jpg",
  audio_url: "/audio/week19_easy/explore_main.mp3",
  
  content_en: `
 **Look at** **old photos**! You **were a baby**. You were so small and cute!
 
 When you **were a baby**, you were little. Now you **grow bigger** **every year**!
 
 Food **helps you grow**. When you were young, you drank milk. Milk makes bones strong. You also ate fruits. They help you grow healthy.
 
 Sleep **helps you grow** too! When you **were a baby**, you **slept a lot**. Sometimes you were quiet. Sometimes you were noisy and cried. Your body grows when you sleep!
 
 Your brain grows too! When you were in **kindergarten**, you **learned to read**. You learned to count. Each memory helps your brain **grow strong**!
 
 **Every year** you grow! **Look at** photos - you were little! Now you are tall. You can reach high things now!
 
 These memories of when we were small are special. Everyone starts as a baby. Everyone grows!
 `,
  
  content_vi: `
    Nhìn ảnh cũ! Bạn là em bé. Bạn rất nhỏ và dễ thương!
    
    Khi bạn là em bé, bạn rất nhỏ bé. Bây giờ bạn lớn lên mỗi năm!
    
    Thức ăn giúp bạn lớn lên. Khi bạn còn nhỏ, bạn uống sữa. Sữa làm xương chắc khỏe. Bạn cũng ăn trái cây. Chúng giúp bạn lớn lên khỏe mạnh.
    
    Giấc ngủ cũng giúp bạn lớn lên! Khi bạn là em bé, bạn ngủ nhiều. Đôi khi bạn yên lặng. Đôi khi bạn ồn ào và khóc. Cơ thể lớn lên khi bạn ngủ!
    
    Não bạn cũng lớn lên! Khi bạn học mẫu giáo, bạn học đọc. Bạn học đếm. Mỗi kỷ niệm giúp não lớn lên khỏe!
    
    Mỗi năm bạn lớn lên! Nhìn ảnh - bạn đã nhỏ! Bây giờ bạn cao. Bạn có thể với tới thứ cao bây giờ!
    
    Những kỷ niệm khi chúng ta còn nhỏ thật đặc biệt. Mọi người bắt đầu như em bé. Mọi người lớn lên!
  `,
  
  check_questions: [
    {
      id: 1,
      question_en: "What makes bones strong?",
      question_vi: "Cái gì làm xương chắc khỏe?",
      answer: ["Milk", "Drinking milk"],
      hint_en: "M...",
      hint_vi: "Sữa..."
    },
    {
      id: 2,
      question_en: "When does your body grow?",
      question_vi: "Khi nào cơ thể lớn lên?",
      answer: ["When you sleep", "During sleep", "Sleep"],
      hint_en: "When you...",
      hint_vi: "Khi bạn..."
    },
    {
      id: 3,
      question_en: "What helps your brain grow?",
      question_vi: "Cái gì giúp não lớn lên?",
      answer: ["Memories", "Learning", "Making memories"],
      hint_en: "M... or L...",
      hint_vi: "Kỷ... hoặc Học..."
    }
  ],
  
  question: {
    text_en: "How have you grown? Write about when you were small and now.",
    text_vi: "Bạn đã lớn lên như thế nào? Viết về khi bạn còn nhỏ và bây giờ.",
    min_words: 15,
    hint_en: "I was... Now I am...",
    hint_vi: "Tôi đã... Bây giờ tôi..."
  }
};

export const chunk_focus = [
  "Look at",
  "old photos",
  "were a baby",
  "grow bigger",
  "every year",
  "helps you grow",
  "slept a lot",
  "kindergarten",
  "learned to read",
  "grow strong",
  "Every year"
];

export const dictionary = {
    'Every year': { word: 'Every year', pronunciation: '/every year/', definition_vi: 'mỗi năm', definition_en: 'meaning of every year', example: 'This is an example: every year.' },
    'Look at': { word: 'Look at', pronunciation: '/look at/', definition_vi: 'nhìn xem', definition_en: 'meaning of look at', example: 'Look at that beautiful rainbow in the sky after the rain!' },
    'every year': { word: 'every year', pronunciation: '/every year/', definition_vi: 'mỗi năm', definition_en: 'meaning of every year', example: 'This is an example: every year.' },
    'grow bigger': { word: 'grow bigger', pronunciation: '/grow bigger/', definition_vi: 'lớn hơn', definition_en: 'meaning of grow bigger', example: 'I grow bigger every year.' },
    'grow strong': { word: 'grow strong', pronunciation: '/grow strong/', definition_vi: 'lớn lên khỏe mạnh', definition_en: 'meaning of grow strong', example: 'This is an example: grow strong.' },
    'helps you grow': { word: 'helps you grow', pronunciation: '/helps you grow/', definition_vi: 'helps you grow', definition_en: 'meaning of helps you grow', example: 'This is an example: helps you grow.' },
    'kindergarten': { word: 'kindergarten', pronunciation: '/kindergarten/', definition_vi: 'mẫu giáo', definition_en: 'a school for young children ages 3-5', example: 'My little sister started kindergarten this week.' },
    'learned to read': { word: 'learned to read', pronunciation: '/learned to read/', definition_vi: 'học đọc', definition_en: 'gained the skill of reading', example: 'She learned to read when she was five.' },
    'old photos': { word: 'old photos', pronunciation: '/old photos/', definition_vi: 'ảnh cũ', definition_en: 'meaning of old photos', example: 'Looking through old photos, we saw what our town looked like long ago.' },
    'slept a lot': { word: 'slept a lot', pronunciation: '/slept a lot/', definition_vi: 'slept a lot', definition_en: 'meaning of slept a lot', example: 'This is an example: slept a lot.' },
    'were a baby': { word: 'were a baby', pronunciation: '/were a baby/', definition_vi: 'were a baby', definition_en: 'meaning of were a baby', example: 'This is an example: were a baby.' }
};
