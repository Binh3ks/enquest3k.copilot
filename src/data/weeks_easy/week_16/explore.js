export default {
  title_en: "The Science of Sports",
  title_vi: "Khoa học về Thể thao",
  image_url: "/images/week16/explore_cover_w16.jpg",
  audio_url: "/audio/week16_easy/explore_main.mp3",
  
  content_en: `
Do you like sports? Let's **learn about** the science in sports!

 When you run, your body needs energy. Energy comes from food! The food gives you power to play.

 When you **kick a ball**, it starts to move. This is called motion. The ball is **in motion** when it flies.

 When you **throw a ball**, it goes up. Then it comes down. Why? **Because of** gravity! Gravity pulls things down to Earth.

 When you jump to **catch a ball**, you use energy. Your legs push you up!

 In a **team sport**, you **pass the ball** to friends. You **work together**. This is teamwork!

 When you **score a goal**, everyone cheers! Sports are fun! They use science too! Sports make us strong and healthy!
	`,

  content_vi: `
    Bạn có thích thể thao không? Hãy học về khoa học trong thể thao!
    
    Khi bạn chạy, cơ thể bạn cần năng lượng. Năng lượng đến từ thức ăn! Thức ăn cho bạn sức mạnh để chơi.
    
    Khi bạn sút một quả bóng, nó bắt đầu di chuyển. Điều này gọi là chuyển động. Quả bóng đang chuyển động khi nó bay.
    
    Khi bạn ném một quả bóng, nó đi lên. Sau đó nó rơi xuống. Tại sao? Vì trọng lực! Trọng lực kéo vật xuống Trái đất.
    
    Khi bạn nhảy để bắt một quả bóng, bạn dùng năng lượng. Chân bạn đẩy bạn lên!
    
    Trong môn thể thao đội, bạn chuyền bóng cho bạn bè. Bạn làm việc cùng nhau. Đây là làm việc nhóm!
    
    Khi bạn ghi một bàn thắng, mọi người cổ vũ! Thể thao vui! Chúng cũng dùng khoa học!
  `,
  
  check_questions: [
    {
      id: 1,
      question_en: "Where does energy come from?",
      question_vi: "Năng lượng đến từ đâu?",
      answer: ["Food", "From food"],
      hint_en: "F...",
      hint_vi: "Thức..."
    },
    {
      id: 2,
      question_en: "What is it called when the ball moves?",
      question_vi: "Khi bóng di chuyển gọi là gì?",
      answer: ["Motion"],
      hint_en: "M...",
      hint_vi: "Chuyển..."
    },
    {
      id: 3,
      question_en: "What pulls things down?",
      question_vi: "Cái gì kéo vật xuống?",
      answer: ["Gravity"],
      hint_en: "G...",
      hint_vi: "Trọng..."
    }
  ],
  
  question: {
    text_en: "If you were a sports scientist, what would you study?",
    text_vi: "Nếu bạn là nhà khoa học thể thao, bạn sẽ nghiên cứu gì?",
    min_words: 15,
    hint_en: "I would study...",
    hint_vi: "Tôi sẽ nghiên cứu..."
  }
};

export const chunk_focus = [
  "learn about",
  "kick a ball",
  "in motion",
  "throw a ball",
  "Because of",
  "catch a ball",
  "team sport",
  "pass the ball",
  "work together",
  "score a goal"
];

export const dictionary = {
    'Because of': { word: 'Because of', pronunciation: '/because of/', definition_vi: 'bởi vì', definition_en: 'meaning of because of', example: 'This is an example: because of.' },
    'catch a ball': { word: 'catch a ball', pronunciation: '/catch a ball/', definition_vi: 'catch a ball', definition_en: 'meaning of catch a ball', example: 'This is an example: catch a ball.' },
    'in motion': { word: 'in motion', pronunciation: '/in motion/', definition_vi: 'in motion', definition_en: 'meaning of in motion', example: 'This is an example: in motion.' },
    'kick a ball': { word: 'kick a ball', pronunciation: '/kick a ball/', definition_vi: 'đá bóng', definition_en: 'meaning of kick a ball', example: 'This is an example: kick a ball.' },
    'learn about': { word: 'learn about', pronunciation: '/learn about/', definition_vi: 'học về', definition_en: 'meaning of learn about', example: 'This is an example: learn about.' },
    'pass the ball': { word: 'pass the ball', pronunciation: '/pass the ball/', definition_vi: 'chuyền bóng', definition_en: 'meaning of pass the ball', example: 'This is an example: pass the ball.' },
    'score a goal': { word: 'score a goal', pronunciation: '/score a goal/', definition_vi: 'score a goal', definition_en: 'meaning of score a goal', example: 'This is an example: score a goal.' },
    'team sport': { word: 'team sport', pronunciation: '/team sport/', definition_vi: 'thể thao đồng đội', definition_en: 'meaning of team sport', example: 'This is an example: team sport.' },
    'throw a ball': { word: 'throw a ball', pronunciation: '/throw a ball/', definition_vi: 'ném bóng', definition_en: 'meaning of throw a ball', example: 'This is an example: throw a ball.' },
    'work together': { word: 'work together', pronunciation: '/work together/', definition_vi: 'làm việc cùng nhau', definition_en: 'meaning of work together', example: 'We work together.' }
};
