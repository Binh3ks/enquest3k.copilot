// WEEK 37: The Sports Day Challenge
// AI Tutor V28 Format — 100% Schema Compliant with 3 Full Missions & Sports Spark Cards

const week37RealData = {
  week_id: 37,
  week_number: 37,
  title: "The Sports Day Challenge",
  weekTitle_en: "The Sports Day Challenge",
  weekTitle_vi: "Thách Thức Ngày Hội Thể Thao",
  topic: "Outdoor sports, physical biomechanics, relay races, past simple, adverbs of manner (-ly)",
  topic_vi: "Thể thao ngoài trời, cơ học thể chất, đua tiếp sức, quá khứ đơn, trạng từ chỉ cách thức (-ly)",
  theme: "sports_day_challenge",
  grammar_focus: "Past Simple & Adverbs of Manner (-ly)",
  grammar_pattern: "He ran very fast. She passed the baton smoothly. They worked together.",
  grammar_examples: [
    "Leo ran very fast along the track.",
    "Maya passed the baton cleanly to her teammate.",
    "They were tired but happy because teamwork brought victory."
  ],

  chunk_focus: [
    "Saturday morning",
    "went to the sports stadium",
    "was sunny and warm",
    "First of all",
    "sat down with his coach",
    "ran very fast",
    "passed the baton",
    "ran across the grass",
    "caught the baton",
    "watched and clapped",
    "At the very end",
    "were tired but happy",
    "teamwork brought victory",
    "smiled with pride"
  ],

  target_vocab: [
    { word: "athlete", pronunciation: "/ˈæθliːt/", definition_vi: "vận động viên", definition_en: "a person trained in physical sports" },
    { word: "relay", pronunciation: "/ˈriːleɪ/", definition_vi: "cuộc đua tiếp sức", definition_en: "a race between teams passing a stick" },
    { word: "baton", pronunciation: "/bəˈtɒn/", definition_vi: "gậy tiếp sức", definition_en: "a stick passed from runner to runner" },
    { word: "stadium", pronunciation: "/ˈsteɪdiəm/", definition_vi: "sân vận động", definition_en: "a large sports arena" },
    { word: "teamwork", pronunciation: "/ˈtiːmwɜːk/", definition_vi: "tinh thần đồng đội", definition_en: "working together cooperatively as a group" }
  ],
  global_vocab: [
    { word: "athlete", pronunciation: "/ˈæθliːt/", definition_vi: "vận động viên", definition_en: "a person trained in physical sports" },
    { word: "relay", pronunciation: "/ˈriːleɪ/", definition_vi: "cuộc đua tiếp sức", definition_en: "a race between teams passing a stick" },
    { word: "baton", pronunciation: "/bəˈtɒn/", definition_vi: "gậy tiếp sức", definition_en: "a stick passed from runner to runner" },
    { word: "stadium", pronunciation: "/ˈsteɪdiəm/", definition_vi: "sân vận động", definition_en: "a large sports arena" },
    { word: "teamwork", pronunciation: "/ˈtiːmwɜːk/", definition_vi: "tinh thần đồng đội", definition_en: "working together cooperatively as a group" }
  ],
  vocabulary: [
    { word: "athlete", pronunciation: "/ˈæθliːt/", definition_vi: "vận động viên", definition_en: "a person trained in physical sports" },
    { word: "relay", pronunciation: "/ˈriːleɪ/", definition_vi: "cuộc đua tiếp sức", definition_en: "a race between teams passing a stick" },
    { word: "baton", pronunciation: "/bəˈtɒn/", definition_vi: "gậy tiếp sức", definition_en: "a stick passed from runner to runner" },
    { word: "stadium", pronunciation: "/ˈsteɪdiəm/", definition_vi: "sân vận động", definition_en: "a large sports arena" },
    { word: "teamwork", pronunciation: "/ˈtiːmwɜːk/", definition_vi: "tinh thần đồng đội", definition_en: "working together cooperatively as a group" }
  ],

  sentences: [
    { id: 1, text: "Leo ran very fast along the red track.", meaning: "Leo chạy rất nhanh trên đường chạy màu đỏ." },
    { id: 2, text: "He passed the baton cleanly to Maya.", meaning: "Cậu ấy đã truyền gậy tiếp sức gọn gàng cho Maya." },
    { id: 3, text: "Max sprinted smoothly toward the finish line.", meaning: "Max đã bứt tốc mượt mà về vạch đích." },
    { id: 4, text: "Spectators watched and clapped enthusiastically.", meaning: "Khán giả đã xem và vỗ tay nhiệt tình." },
    { id: 5, text: "Their dedicated teamwork brought victory!", meaning: "Tinh thần đồng đội tận tụy của họ đã mang lại chiến thắng!" }
  ],

  spark_talk: {
    opening_narrative: "Hi there! I am Nova, your AI Sports Coach! Today we are practicing sports vocabulary and relay race stories!",
    cards: [
      { id: "sp_1", title_en: "Relay Race Strategy", title_vi: "Chiến Thuật Tiếp Sức", topic: "athlete", prompt_en: "Let's talk about how Leo passed the baton fast!" },
      { id: "sp_2", title_en: "Building Teamwork", title_vi: "Xây Dựng Đồng Đội", topic: "teamwork", prompt_en: "How do teammates help each other on sports day?" },
      { id: "sp_3", title_en: "Gold Medal Celebration", title_vi: "Mừng Huy Chương Vàng", topic: "stadium", prompt_en: "Tell me about receiving a golden medal!" }
    ]
  },

  voice_character: {
    name: "Coach Nova - Sports Mentor",
    personality: "Energetic, motivating, encouraging, patient, uses sports terms.",
    speaking_style: "Upbeat and supportive, uses past simple and adverbs like cleanly and fast.",
    v28_format_notes: "W37 follows V28 schema."
  },

  knowledge_base: [
    "Past simple action verbs: ran, passed, caught, sprinted, clapped, won",
    "Adverbs of manner: cleanly, smoothly, fast, enthusiastically, politely",
    "Sportsmanship: shake hands with opponents, cheer for friends, play fair"
  ],

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Great School Relay",
      title_en: "The Great School Relay",
      title_vi: "Cuộc Đua Tiếp Sức Trường Học",
      theme: "Relay race execution",
      type: "story",
      opening_narrative: "Welcome to the sports stadium! Leo ran very fast along the track. He needs to pass the baton cleanly to Maya. Tell me how Leo ran!",
      story_arc: [
        {
          phase: "the_start",
          turns: "1-4",
          phase_name: "Running Fast",
          goal: "Student describes Leo running fast",
          phase_questions: [
            {
              template: "Awesome! How fast did Leo run along the track? Say: Leo ran very fast, or Leo sprinted quickly",
              hints: ["Leo", "ran", "very fast", "along the track"]
            },
            {
              template: "Brilliant! How did he pass the baton to Maya? Say: He passed the baton cleanly, or He handed over the baton smoothly",
              hints: ["passed", "baton", "cleanly", "smoothly"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Fair Play Champions",
      title_en: "Fair Play Champions",
      title_vi: "Nhà Vô Địch Chơi Đẹp",
      theme: "Sportsmanship & Fair Play",
      type: "story",
      opening_narrative: "On the sports field, Maya saw an opponent slip on the grass. Instead of running past, she stopped to help! Why does sportsmanship matter?",
      story_arc: [
        {
          phase: "helping_hand",
          turns: "1-4",
          phase_name: "Showing Respect",
          goal: "Student explains fair play actions",
          phase_questions: [
            {
              template: "Wonderful! What should athletes do after finishing a race? Say: Shake hands with opponents, or Say kind words of encouragement",
              hints: ["Shake hands", "opponents", "say kind words"]
            },
            {
              template: "Great job! Why is playing fair more important than winning gold medals? Say: It builds strong character, or It shows respect to everyone",
              hints: ["builds strong character", "shows respect"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Active Body & Healthy Mind",
      title_en: "Active Body & Healthy Mind",
      title_vi: "Cơ Thể Khỏe Mạnh & Trí Óc Minh Mẫn",
      theme: "Outdoor Exercise & Health Science",
      type: "story",
      opening_narrative: "Health experts recommend 30 minutes of exercise every single day! What outdoor sport do you enjoy playing with your best friends?",
      story_arc: [
        {
          phase: "daily_exercise",
          turns: "1-4",
          phase_name: "Outdoor Sports Routine",
          goal: "Student describes daily sports routine",
          phase_questions: [
            {
              template: "Tell me! How many minutes of exercise should we complete daily? Say: 30 minutes of exercise every day, or We should run 30 minutes daily",
              hints: ["30 minutes", "exercise", "every single day"]
            },
            {
              template: "Fantastic! How do outdoor sports help our body and mind? Say: They make our muscles strong and help us feel happy, or They keep our heart healthy",
              hints: ["muscles strong", "feel happy", "heart healthy"]
            }
          ]
        }
      ]
    }
  ]
};

export default week37RealData;
