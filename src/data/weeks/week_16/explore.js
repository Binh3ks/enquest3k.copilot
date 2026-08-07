export default {
  title_en: "The Science of Sports",
  title_vi: "Khoa học về Thể thao",
  image_url: "/images/week16/explore_cover_w16.jpg",
  audio_url: "/audio/week16/explore_main.mp3",
  
  content_en: `
 Sports are exciting! But do you know **what happens** in your body when you play?

 When you **run fast**, your body **uses energy**. This energy comes from the food you eat. Eat well and you will have more energy to run and play!

 When you **kick a ball**, the ball **goes into motion**. Motion means moving! The harder you kick, the further the ball travels. The ball flies to the goal!

 When you **throw a ball** to a friend, it **flies through the air**. Your friend jumps to catch it — that uses leg muscles and **lots of energy** too!

 In a **team sport**, players **pass the ball** to **each other** quickly. They run together and watch where their teammates are going.

 When your team **scores a goal**, everyone cheers! Sports are about energy, motion, **working as a team**, and **having fun**. Play more sports **every day**!
 `,
  
  content_vi: `
    Thể thao thật thú vị! Nhưng bạn có biết điều gì xảy ra trong cơ thể khi bạn chơi không?

    Khi bạn chạy nhanh, cơ thể dùng năng lượng. Năng lượng này đến từ thức ăn. Ăn tốt thì bạn có nhiều năng lượng hơn để chạy và chơi!

    Khi bạn sút một quả bóng, quả bóng bắt đầu chuyển động. Chuyển động nghĩa là di chuyển! Bạn sút càng mạnh, quả bóng bay càng xa. Quả bóng bay về phía khung thành!

    Khi bạn ném bóng cho bạn, nó bay qua không khí. Bạn của bạn nhảy lên để bắt quả bóng — điều đó cũng cần nhiều cơ bắp và năng lượng!

    Trong môn thể thao đội, các cầu thủ chuyền bóng cho nhau nhanh chóng. Họ chạy cùng nhau và quan sát đồng đội đang ở đâu.

    Khi đội của bạn ghi được bàn thắng, mọi người cổ vũ! Thể thao là về năng lượng, chuyển động, làm việc đội nhóm, và niềm vui. Hãy chơi thể thao mỗi ngày!
  `,
  
  check_questions: [
    {
      id: 1,
      question_en: "Where does your energy for running come from?",
      question_vi: "Năng lượng để chạy của bạn đến từ đâu?",
      answer: ["Food", "The food we eat", "From food"],
      hint_en: "It comes from...",
      hint_vi: "Nó đến từ..."
    },
    {
      id: 2,
      question_en: "What does motion mean?",
      question_vi: "Chuyển động nghĩa là gì?",
      answer: ["Moving", "Moving from one place to another", "To move"],
      hint_en: "M...",
      hint_vi: "Di..."
    },
    {
      id: 3,
      question_en: "What does your team do when they score a goal?",
      question_vi: "Đội của bạn làm gì khi ghi được bàn thắng?",
      answer: ["Everyone cheers", "They cheer", "Cheer"],
      hint_en: "Everyone...",
      hint_vi: "Mọi người..."
    }
  ],
  
  question: {
    text_en: "Tell us about your favorite sport. What do you do? Use these words: kick, throw, catch, run, pass, cheer, team, energy.",
    text_vi: "Hãy kể về môn thể thao yêu thích của bạn. Bạn làm gì? Dùng các từ: kick, throw, catch, run, pass, cheer, team, energy.",
    min_words: 20,
    hint_en: "In my favorite sport, I... My team...",
    hint_vi: "Trong môn thể thao yêu thích của tôi, tôi... Đội của tôi..."
  }
};

export const chunk_focus = [
  "what happens",
  "run fast",
  "uses energy",
  "kick a ball",
  "goes into motion",
  "throw a ball",
  "flies through the air",
  "lots of energy",
  "team sport",
  "pass the ball",
  "each other",
  "scores a goal",
  "working as a team",
  "having fun",
  "every day"
];

export const dictionary = {
    'each other': { word: 'each other', pronunciation: '/each other/', definition_vi: 'nhau, lẫn nhau', definition_en: 'meaning of each other', example: 'We love each other very much.' },
    'every day': { word: 'every day', pronunciation: '/every day/', definition_vi: 'mỗi ngày', definition_en: 'meaning of every day', example: 'This is my family. My mother is kind. She makes food for us every day. My father is strong. He plays with me in the park.' },
    'flies through the air': { word: 'flies through the air', pronunciation: '/flies through the air/', definition_vi: 'bay qua không trung', definition_en: 'moves quickly through the air', example: 'The kite flies through the air on a windy day.' },
    'goes into motion': { word: 'goes into motion', pronunciation: '/goes into motion/', definition_vi: 'bắt đầu chuyển động', definition_en: 'starts moving', example: 'The ball goes into motion after the kick.' },
    'having fun': { word: 'having fun', pronunciation: '/having fun/', definition_vi: 'having fun', definition_en: 'meaning of having fun', example: 'This is an example: having fun.' },
    'kick a ball': { word: 'kick a ball', pronunciation: '/kick a ball/', definition_vi: 'đá bóng', definition_en: 'meaning of kick a ball', example: 'This is an example: kick a ball.' },
    'lots of energy': { word: 'lots of energy', pronunciation: '/lots of energy/', definition_vi: 'nhiều năng lượng', definition_en: 'Multi-word phrase: lots of energy', example: 'The phrase \'lots of energy\' is commonly used in conversation.' },
    'pass the ball': { word: 'pass the ball', pronunciation: '/pass the ball/', definition_vi: 'chuyền bóng', definition_en: 'meaning of pass the ball', example: 'This is an example: pass the ball.' },
    'run fast': { word: 'run fast', pronunciation: '/run fast/', definition_vi: 'chạy nhanh', definition_en: 'meaning of run fast', example: 'The fastest runner on the team can run fast and win every race.' },
    'scores a goal': { word: 'scores a goal', pronunciation: '/scores a goal/', definition_vi: 'scores a goal', definition_en: 'meaning of scores a goal', example: 'This is an example: scores a goal.' },
    'team sport': { word: 'team sport', pronunciation: '/team sport/', definition_vi: 'thể thao đồng đội', definition_en: 'meaning of team sport', example: 'This is an example: team sport.' },
    'throw a ball': { word: 'throw a ball', pronunciation: '/throw a ball/', definition_vi: 'ném bóng', definition_en: 'meaning of throw a ball', example: 'This is an example: throw a ball.' },
    'uses energy': { word: 'uses energy', pronunciation: '/uses energy/', definition_vi: 'uses energy', definition_en: 'meaning of uses energy', example: 'This is an example: uses energy.' },
    'what happens': { word: 'what happens', pronunciation: '/what happens/', definition_vi: 'điều gì xảy ra', definition_en: 'Multi-word phrase: what happens', example: 'The phrase \'what happens\' is commonly used in conversation.' },
    'working as a team': { word: 'working as a team', pronunciation: '/working as a team/', definition_vi: 'working as a team', definition_en: 'meaning of working as a team', example: 'This is an example: working as a team.' }
};
