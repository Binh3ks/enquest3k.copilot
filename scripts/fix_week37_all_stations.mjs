import fs from 'fs';
import path from 'path';

console.log("🚀 Starting Week 37 Station Data Restoration Script...");

const advDir = './src/data/weeks/week_37';
const easyDir = './src/data/weeks_easy/week_37';

// 1. MINDMAP.JS
const mindmapData = `export default {
  "centerStems": [
    {
      "id": "stem_1",
      "text": "Leo ran very fast along the red track.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_2",
      "text": "Ancient leaders declared a sacred truce for peace.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_3",
      "text": "Over two hundred nations marched across the stadium.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_4",
      "text": "Kenyan runners trained on red dirt mountain paths.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_5",
      "text": "Athletes shook hands politely with opponents.",
      "type": "affirmative",
      "audio": null
    },
    {
      "id": "stem_6",
      "text": "Scientific teamwork brought victory to the team.",
      "type": "affirmative",
      "audio": null
    }
  ],
  "branchLabels": {
    "Leo ran very fast along the red track.": [
      { "text": "passed the baton cleanly to Maya", "text_vi": "truyền gậy tiếp sức gọn gàng cho Maya" },
      { "text": "measured velocity equals distance over time", "text_vi": "đo vận tốc bằng quãng đường chia cho thời gian" },
      { "text": "maintained fast kinetic momentum", "text_vi": "duy trì động năng di chuyển nhanh" },
      { "text": "sprinted early before exchange zone", "text_vi": "bứt tốc sớm trước vùng giao gậy" },
      { "text": "saved crucial seconds at the finish line", "text_vi": "tiết kiệm những giây quý giá tại vạch đích" },
      { "text": "crossed the finish line first", "text_vi": "cán đích đầu tiên" }
    ],
    "Ancient leaders declared a sacred truce for peace.": [
      { "text": "gathered at Olympia in ancient Greece", "text_vi": "tập hợp tại Olympia thuộc Hy Lạp cổ đại" },
      { "text": "paused all regional wars during games", "text_vi": "tạm dừng mọi cuộc chiến tranh khu vực trong giải đấu" },
      { "text": "sat down with leaders to discuss peace", "text_vi": "ngồi xuống với các nhà lãnh đạo để thảo luận hòa bình" },
      { "text": "passed the sacred torch across lands", "text_vi": "truyền ngọn đước linh thiêng qua các vùng đất" },
      { "text": "traveled safely through rival territories", "text_vi": "di chuyển an toàn qua các lãnh thổ đối đầu" },
      { "text": "honored sportsmanship above conflict", "text_vi": "tôn vinh tinh thần thể thao trên xung đột" }
    ],
    "Over two hundred nations marched across the stadium.": [
      { "text": "went to the sports stadium on Saturday morning", "text_vi": "đến sân vận động vào sáng thứ Bảy" },
      { "text": "wore colorful traditional uniforms proudly", "text_vi": "mặc trang phục truyền thống đầy tự hào" },
      { "text": "represented their home countries together", "text_vi": "cùng nhau đại diện cho quê hương" },
      { "text": "shared friendly meals in the Olympic Village", "text_vi": "cùng ăn uống thân thiện tại Làng Olympic" },
      { "text": "were united in peace across borders", "text_vi": "đoàn kết trong hòa bình xuyên biên giới" },
      { "text": "cheered happily for international athletes", "text_vi": "vui vẻ cổ vũ cho các vận động viên quốc tế" }
    ],
    "Kenyan runners trained on red dirt mountain paths.": [
      { "text": "lived in Iten known as Home of Champions", "text_vi": "sống ở Iten được biết đến là Quê hương Nhà vô địch" },
      { "text": "adapted to thin air at high altitude", "text_vi": "thích nghi với không khí mỏng ở độ cao lớn" },
      { "text": "built strong lungs and heart endurance", "text_vi": "rèn luyện lá phổi và sức bền tim mạch mạnh mẽ" },
      { "text": "ran long distances to school every day", "text_vi": "chạy quãng đường dài đến trường mỗi ngày" },
      { "text": "won famous marathon races around world", "text_vi": "giành chiến thắng các giải marathon nổi tiếng thế giới" },
      { "text": "inspired young runners everywhere", "text_vi": "truyền cảm hứng cho các chân chạy trẻ khắp nơi" }
    ],
    "Athletes shook hands politely with opponents.": [
      { "text": "said kind words of encouragement", "text_vi": "nói những lời động viên chân thành" },
      { "text": "built strong character through fair play", "text_vi": "rèn luyện nhân cách tốt qua tinh thần chơi đẹp" },
      { "text": "helped a fallen runner on the green track", "text_vi": "giúp đỡ một bạn chạy bị ngã trên đường chạy" },
      { "text": "stood together proudly on the podium", "text_vi": "đứng cùng nhau tự hào trên bục nhận giải" },
      { "text": "smiled happily while accepting gold medals", "text_vi": "mỉm cười hạnh phúc khi nhận huy chương vàng" },
      { "text": "earned universal respect from spectators", "text_vi": "nhận được sự tôn trọng tuyệt đối từ khán giả" }
    ],
    "Scientific teamwork brought victory to the team.": [
      { "text": "watched and clapped with proud smiles", "text_vi": "xem và vỗ tay với nụ cười tự hào" },
      { "text": "calculated optimal speed for each lap", "text_vi": "tính toán tốc độ tối ưu cho mỗi vòng" },
      { "text": "practiced smooth baton handoffs repeatedly", "text_vi": "luyện tập giao gậy mượt mà nhiều lần" },
      { "text": "were tired but happy at the end", "text_vi": "mệt nhưng rất hạnh phúc vào lúc kết thúc" },
      { "text": "celebrated a well-earned team achievement", "text_vi": "ăn mừng thành tích đồng đội xứng đáng" },
      { "text": "proved that science makes sports better", "text_vi": "chứng minh rằng khoa học giúp thể thao tốt hơn" }
    ]
  }
};
`;

// 2. LOGIC_SCIENCE.JS
const logicScienceData = `export default {
  title: "Sports Day Speed & Science Logic Lab",
  theme: "sports_day_science",
  questions: [
    {
      id: 1,
      type: "science",
      clue_statement: "Leo ran 100 metres in 10 seconds. He used the physics formula velocity = distance / time.",
      question_en: "What was Leo's average running velocity during the race?",
      options: [
        "10 metres per second",
        "100 metres per second",
        "1000 metres per second",
        "5 metres per second"
      ],
      correct: "10 metres per second",
      explanation_en: "Velocity = distance / time = 100m / 10s = 10 m/s!"
    },
    {
      id: 2,
      type: "logic",
      clue_statement: "If a runner starts accelerating 5 metres BEFORE reaching the exchange zone, they reach top speed right when receiving the baton.",
      question_en: "Why is sprinting early before the exchange zone better than starting from a standstill?",
      options: [
        "It maintains kinetic momentum so speed does not drop during handoff",
        "It lets the runner sit down and rest earlier",
        "It makes the baton weigh less",
        "It doubles the distance of the relay race"
      ],
      correct: "It maintains kinetic momentum so speed does not drop during handoff",
      explanation_en: "Starting early allows the receiver to match the incoming runner's speed, maintaining kinetic momentum smoothly!"
    },
    {
      id: 3,
      type: "science",
      clue_statement: "Runners in Iten, Kenya train at 2,400 metres above sea level where the air has lower oxygen density.",
      question_en: "How does high-altitude training help marathon runners perform better at sea level?",
      options: [
        "The body produces more red blood cells to carry oxygen efficiently",
        "The thin air makes the legs grow longer",
        "Runners learn to breathe underwater",
        "High altitude reduces gravity so runners weigh less"
      ],
      correct: "The body produces more red blood cells to carry oxygen efficiently",
      explanation_en: "At high altitudes, thin air triggers the body to produce extra red blood cells, boosting endurance when competing at lower sea-level altitudes!"
    },
    {
      id: 4,
      type: "logic",
      clue_statement: "Team A finished the 4x100m relay in 48 seconds. Team B finished 3 seconds slower than Team A.",
      question_en: "What was Team B's total relay time?",
      options: [
        "51 seconds",
        "45 seconds",
        "52 seconds",
        "44 seconds"
      ],
      correct: "51 seconds",
      explanation_en: "48 seconds + 3 seconds slower = 51 seconds!"
    },
    {
      id: 5,
      type: "science",
      clue_statement: "During a long marathon, muscles require continuous oxygen and glucose energy to contract.",
      question_en: "What happens to a runner's heart rate during intense physical sprinting?",
      options: [
        "Heart rate increases to pump oxygen-rich blood quickly to muscles",
        "Heart rate stops completely to conserve energy",
        "Heart rate slows down so the body can sleep",
        "Heart rate stays exactly at zero"
      ],
      correct: "Heart rate increases to pump oxygen-rich blood quickly to muscles",
      explanation_en: "During exercise, muscles demand more oxygen, causing the heart to beat faster to pump oxygenated blood!"
    }
  ]
};
`;

// 3. SOCIAL_QUIZ.JS
const socialQuizData = `export default {
  title: "Ancient Olympic Truce & World Peace Quiz",
  questions: [
    {
      id: 1,
      question_en: "What was the primary purpose of the ancient Olympic Truce (Ekecheiria) in Greece?",
      options: [
        "To pause all conflicts so athletes and spectators could travel safely to Olympia",
        "To collect taxes from foreign merchants",
        "To build larger stone arenas for kings",
        "To stop trading goods across borders"
      ],
      correct: "To pause all conflicts so athletes and spectators could travel safely to Olympia",
      explanation_en: "The ancient Ekecheiria guaranteed safe passage across warring states to honor sports and peace."
    },
    {
      id: 2,
      question_en: "How many nations come together to compete peacefully in the Modern Olympic Games?",
      options: [
        "Over 200 nations",
        "Only 10 nations",
        "Fifty nations",
        "Five nations"
      ],
      correct: "Over 200 nations",
      explanation_en: "Over 200 countries send athletes to compete together under international peace and respect."
    },
    {
      id: 3,
      question_en: "Where do international athletes live and share friendly meals during the Modern Olympic Games?",
      options: [
        "In the Olympic Village",
        "In separate castles",
        "In private submarines",
        "At local airports"
      ],
      correct: "In the Olympic Village",
      explanation_en: "Athletes from all nations stay and eat together in the Olympic Village to build global friendships."
    },
    {
      id: 4,
      question_en: "On which morning did athletes march across the stadium in colorful traditional uniforms during the Opening Ceremony?",
      options: [
        "On a sunny Saturday morning",
        "On a stormy Tuesday night",
        "On Friday midnight",
        "On Monday afternoon"
      ],
      correct: "On a sunny Saturday morning",
      explanation_en: "During the Opening Ceremony on Saturday morning, athletes proudly represent their homelands."
    },
    {
      id: 5,
      question_en: "What core social value is demonstrated when runners help a fallen opponent on the race track?",
      options: [
        "Sportsmanship and mutual respect",
        "Greed for prize money",
        "Anger and jealousy",
        "Selfish individual pride"
      ],
      correct: "Sportsmanship and mutual respect",
      explanation_en: "Helping opponents shows sportsmanship, kindness, and deep respect for humanity."
    }
  ]
};
`;

// 4. SINGAPORE_MATH.JS
const sgMathData = `export default {
  title: "Sports Day Singapore Math Problems",
  theme: "sports_day_math",
  problems: [
    {
      id: 1,
      type: "comparison",
      question_en: "Leo ran his relay lap in 12 seconds. Maya ran her lap 2 seconds faster than Leo. How long did Maya take?",
      bar_model: "/images/week37/barmodel_w37_adv_p1.svg",
      answer: ["10"],
      hint_en: "Subtract 2 seconds from Leo's time of 12 seconds.",
      hint_vi: "Trừ 2 giây khỏi thời gian 12 giây của Leo."
    },
    {
      id: 2,
      type: "part_whole",
      question_en: "A relay team ran a total distance of 400 metres across 4 equal laps. How long is each lap?",
      bar_model: "/images/week37/barmodel_w37_adv_p2.svg",
      answer: ["100"],
      hint_en: "Divide the total distance 400m by 4 laps.",
      hint_vi: "Chia tổng quãng đường 400m cho 4 vòng."
    },
    {
      id: 3,
      type: "comparison",
      question_en: "In ancient Greece, 150 athletes competed in race A. Race B had 50 more athletes than race A. How many athletes competed in race B?",
      bar_model: "/images/week37/barmodel_w37_adv_p3.svg",
      answer: ["200"],
      hint_en: "Add 50 to 150 athletes.",
      hint_vi: "Cộng 50 vào 150 vận động viên."
    },
    {
      id: 4,
      type: "missing_part",
      question_en: "The stadium has 500 total seats. 320 seats are filled with spectators. How many empty seats remain?",
      bar_model: "/images/week37/barmodel_w37_adv_p4.svg",
      answer: ["180"],
      hint_en: "Subtract 320 from 500 total seats.",
      hint_vi: "Trừ 320 khỏi tổng số 500 ghế."
    },
    {
      id: 5,
      type: "groups",
      question_en: "There are 6 relay teams in the final. Each team has 4 runners. How many runners are in the final altogether?",
      bar_model: "/images/week37/barmodel_w37_adv_p5.svg",
      answer: ["24"],
      hint_en: "Multiply 6 teams by 4 runners per team.",
      hint_vi: "Nhân 6 đội với 4 người chạy mỗi đội."
    }
  ]
};
`;

// 5. ASK_AI.JS
const askAiData = `export default {
  title: "Ask AI — Sports Day & Olympic History",
  prompts: [
    {
      id: 1,
      nova_says: "Leo and Maya used a physics formula in their relay race. Ask me what formula they used!",
      nova_says_vi: "Leo và Maya đã dùng một công thức vật lý trong cuộc đua tiếp sức. Hãy hỏi Nova xem công thức đó là gì!",
      context_en: "Ask Nova about the speed physics formula.",
      question_word_bank: ["What is", "Where is", "Why is", "How is"],
      question_frame: "___ the formula for velocity in the relay race?",
      correctWord: "What is",
      answer: "What is the formula for velocity in the relay race?"
    },
    {
      id: 2,
      nova_says: "Ancient Greek leaders declared something special before the Olympic games. Ask me what they declared!",
      nova_says_vi: "Các nhà lãnh đạo Hy Lạp cổ đại đã tuyên bố một điều đặc biệt trước giải đấu Olympic. Hãy hỏi Nova xem họ đã tuyên bố gì!",
      context_en: "Ask Nova what ancient leaders declared.",
      question_word_bank: ["What did", "Where did", "When did", "Why did"],
      question_frame: "___ ancient leaders declare before the Olympic games?",
      correctWord: "What did",
      answer: "What did ancient leaders declare before the Olympic games?"
    },
    {
      id: 3,
      nova_says: "Marathon runners from all over the world travel to Kenya to train. Ask me why they train in Iten!",
      nova_says_vi: "Các vận động viên marathon khắp thế giới đến Kenya tập luyện. Hãy hỏi Nova tại sao họ tập ở Iten!",
      context_en: "Ask Nova why marathon runners train in Kenya.",
      question_word_bank: ["Why do", "What do", "Where do", "When do"],
      question_frame: "___ marathon runners train at high altitude in Kenya?",
      correctWord: "Why do",
      answer: "Why do marathon runners train at high altitude in Kenya?"
    },
    {
      id: 4,
      nova_says: "Leo started sprinting early before reaching Maya in the exchange zone. Ask me how this helped their team!",
      nova_says_vi: "Leo đã bứt tốc sớm trước khi đến chỗ Maya ở vùng giao gậy. Hãy hỏi Nova xem điều này giúp đội như thế nào!",
      context_en: "Ask Nova how sprinting early saves time.",
      question_word_bank: ["How does", "What does", "Where does", "Who does"],
      question_frame: "___ sprinting early before the exchange zone save time?",
      correctWord: "How does",
      answer: "How does sprinting early before the exchange zone save time?"
    },
    {
      id: 5,
      nova_says: "Over two hundred nations parade together during the Olympic Opening Ceremony. Ask me when this happens!",
      nova_says_vi: "Hơn hai trăm quốc gia diễu hành cùng nhau trong Lễ khai mạc Olympic. Hãy hỏi Nova khi nào điều này diễn ra!",
      context_en: "Ask Nova when the ceremony takes place.",
      question_word_bank: ["When do", "What do", "Where do", "Why do"],
      question_frame: "___ athletes parade in traditional uniforms across the stadium?",
      correctWord: "When do",
      answer: "When do athletes parade in traditional uniforms across the stadium?"
    }
  ]
};
`;

// 6. GAMES.JS
const gamesData = `export const week_37GamesAdvanced = {
  title: "Games: Sports Day & Global Olympics",
  image_url: null,
  audio_url: null,
  games: [
    {
      id: "sports_day_categories",
      type: "categories",
      title: "Sports Day Categories",
      instructions_easy: "Put each word into the correct category: Speed Science, History, or Nations.",
      instructions_advanced: "Categorize each word into Speed Science, Olympic History, or Global Nations.",
      categories: ["Speed Science", "Olympic History", "Global Nations"],
      sentences: [
        { text: "Velocity", correct: "Speed Science" },
        { text: "Sacred Truce", correct: "Olympic History" },
        { text: "Kenya", correct: "Global Nations" },
        { text: "Momentum", correct: "Speed Science" },
        { text: "Olympia", correct: "Olympic History" },
        { text: "Greece", correct: "Global Nations" }
      ]
    },
    {
      id: "sports_day_word_smash",
      type: "word_smash",
      title: "Sports Day Word Smash",
      instructions_easy: "Say the word clearly, then use it in a sentence about sports.",
      instructions_advanced: "Say the word, use a short phrase with it, then make a full sentence about sports science.",
      word_list: ["relay", "baton", "velocity", "momentum", "truce", "stadium", "athlete", "champion"]
    },
    {
      id: "sports_day_scramble",
      type: "sentence_scramble",
      title: "Sports Day Sentence Scramble",
      instructions_easy: "Unscramble the words to make a sentence about sports.",
      instructions_advanced: "Unscramble the words to make a complete sentence about sports science or history.",
      sentences: [
        { scrambled: ["Leo", "passed", "the", "baton", "cleanly"], answer: "Leo passed the baton cleanly." },
        { scrambled: ["Velocity", "equals", "distance", "over", "time"], answer: "Velocity equals distance over time." },
        { scrambled: ["Ancient", "leaders", "declared", "a", "sacred", "truce"], answer: "Ancient leaders declared a sacred truce." },
        { scrambled: ["Kenyan", "runners", "trained", "in", "the", "mountains"], answer: "Kenyan runners trained in the mountains." }
      ]
    }
  ]
};

export default week_37GamesAdvanced;
`;

// 7. WORD_POWER.JS
const wordPowerData = `export default {
  title: "Word Power: Sports Science & Global Collocations",
  words: [
    {
      id: 1,
      word: "passed the baton",
      pronunciation: "/pæst ðə bəˈtɒn/",
      cefr_level: "A2",
      definition_en: "to hand over the relay stick cleanly to the next runner",
      definition_vi: "truyền gậy tiếp sức gọn gàng",
      example: "Leo passed the baton cleanly to Maya in the exchange zone.",
      collocation: "pass the baton / smooth handoff",
      model_sentence: "The relay runners practiced every day so they could pass the baton without stopping."
    },
    {
      id: 2,
      word: "kinetic momentum",
      pronunciation: "/kɪˈnetɪk moʊˈmentəm/",
      cefr_level: "B1",
      definition_en: "the motion energy of a moving body",
      definition_vi: "động năng di chuyển",
      example: "Sprinting early before receiving the baton maintains kinetic momentum.",
      collocation: "maintain kinetic momentum / forward motion",
      model_sentence: "By accelerating early, the receiver kept high kinetic momentum during the relay."
    },
    {
      id: 3,
      word: "sacred truce",
      pronunciation: "/ˈseɪkrɪd truːs/",
      cefr_level: "B1",
      definition_en: "an official agreement to stop fighting for peace",
      definition_vi: "thỏa thuận ngừng bắn linh thiêng",
      example: "Ancient Greek leaders declared a sacred truce during the Olympic games.",
      collocation: "declare a sacred truce / peace agreement",
      model_sentence: "The sacred truce allowed athletes from distant cities to travel safely."
    },
    {
      id: 4,
      word: "Home of Champions",
      pronunciation: "/hoʊm əv ˈtʃæmpiənz/",
      cefr_level: "A2",
      definition_en: "a place famous for producing world-class athletes",
      definition_vi: "quê hương của các nhà vô địch",
      example: "Iten in Kenya is known worldwide as the Home of Champions.",
      collocation: "Home of Champions / high altitude",
      model_sentence: "Many famous marathon runners train in Iten, the Home of Champions."
    },
    {
      id: 5,
      word: "united in peace",
      pronunciation: "/juːˈnaɪtɪd ɪn piːs/",
      cefr_level: "B1",
      definition_en: "joined together harmoniously without conflict",
      definition_vi: "đoàn kết trong hòa bình",
      example: "Athletes from over two hundred nations were united in peace.",
      collocation: "united in peace / global friendship",
      model_sentence: "During the Opening Ceremony, participants stood united in peace across borders."
    },
    {
      id: 6,
      word: "sprinted early",
      pronunciation: "/ˈsprɪntɪd ˈɜːrli/",
      cefr_level: "A2",
      definition_en: "ran fast before reaching the official mark",
      definition_vi: "bứt tốc sớm",
      example: "Maya sprinted early in the exchange zone to reach top speed.",
      collocation: "sprint early / acceleration zone",
      model_sentence: "He sprinted early so his teammate could hand over the baton smoothly."
    },
    {
      id: 7,
      word: "sat down with",
      pronunciation: "/sæt daʊn wɪð/",
      cefr_level: "A1",
      definition_en: "met with leaders or friends to talk calmly",
      definition_vi: "ngồi xuống cùng với",
      example: "Greek leaders sat down with delegates to negotiate peace.",
      collocation: "sit down with / discuss together",
      model_sentence: "The team sat down with their coach to review the velocity formula."
    },
    {
      id: 8,
      word: "were tired but happy",
      pronunciation: "/wɜːr ˈtaɪərd bʌt ˈhæpi/",
      cefr_level: "A1",
      definition_en: "feeling physical fatigue while remaining joyful",
      definition_vi: "mệt mỏi nhưng rất hạnh phúc",
      example: "All four runners were tired but happy at the finish line.",
      collocation: "were tired but happy / victory feeling",
      model_sentence: "After running the 400m race, the children were tired but happy."
    }
  ]
};
`;

const dirs = [advDir, easyDir];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(path.join(dir, 'mindmap.js'), mindmapData);
  fs.writeFileSync(path.join(dir, 'logic_science.js'), logicScienceData);
  fs.writeFileSync(path.join(dir, 'social_quiz.js'), socialQuizData);
  fs.writeFileSync(path.join(dir, 'singapore_math.js'), sgMathData);
  fs.writeFileSync(path.join(dir, 'ask_ai.js'), askAiData);
  fs.writeFileSync(path.join(dir, 'games.js'), gamesData);
  fs.writeFileSync(path.join(dir, 'word_power.js'), wordPowerData);
  console.log(`✅ Fixed all 7 station files in ${dir}`);
});

console.log("🎉 All Week 37 station schema repairs completed successfully!");
