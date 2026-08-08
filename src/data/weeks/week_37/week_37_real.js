// WEEK 37: The Sports Day Challenge
// AI Tutor V28 Format — 100% Schema Compliant matching week_36_real.js

const week_37RealData = {
  week_id: 37,
  week_number: 37,
  title: "The Sports Day Challenge",
  weekTitle_en: "The Sports Day Challenge",
  weekTitle_vi: "Thách Thức Ngày Hội Thể Thao",
  topic: "Outdoor sports, physical biomechanics, relay races, adverbs of manner (-ly)",
  topic_vi: "Thể thao ngoài trời, cơ học thể chất, đua tiếp sức, trạng từ chỉ cách thức (-ly)",
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

  story_character: {
    name: "Coach Nova - Sports Mentor",
    personality: "Energetic, encouraging, supportive, uses sports terms",
    backstory: "I am Nova, your AI Sports Coach! Today we will learn about sports day and relay races!",
    speaking_style: "Upbeat, motivating, uses past simple and adverbs",
    facts: { loves_sports: true, teaches_past_simple: true },
    role: "Sports mentor guiding students in relay racing and fair play"
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Great School Relay",
      title_en: "The Great School Relay",
      title_vi: "Cuộc Đua Tiếp Sức Trường Học",
      theme: "Relay race execution",
      type: "story",
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding relay race" },
      opening_narrative: "Hello! I am Coach Nova. On Saturday morning, Leo went to the sports stadium for sports day. He ran very fast along the track and passed the baton cleanly to Maya. Maya ran across the grass and handed it to Max. Max sprinted toward the finish line and they won first place! Want to hear how they won?",
      story_arc: [
        {
          phase: "the_start",
          turns: "1-4",
          phase_name: "Running Fast",
          focus: "Describing Leo running fast using past simple",
          goal: "Student retells how Leo ran fast",
          phase_questions: [
            {
              template: "Awesome! Where did Leo go on Saturday morning? Say: He went to the sports stadium, or He went to the track",
              hints: ["went", "sports stadium", "track"]
            },
            {
              template: "Great! How fast did Leo run along the red track? Say: Leo ran very fast, or Leo sprinted quickly",
              hints: ["Leo", "ran", "very fast", "along the track"]
            },
            {
              template: "Brilliant! How did he pass the baton to Maya? Say: He passed the baton cleanly, or He handed over the baton smoothly",
              hints: ["passed", "baton", "cleanly", "smoothly"]
            }
          ]
        },
        {
          phase: "the_finish",
          turns: "5-8",
          phase_name: "Crossing the Line",
          focus: "Describing Max sprinting and winning",
          goal: "Student describes winning the gold medal",
          phase_questions: [
            {
              template: "Exciting! How did Max run to the finish line? Say: Max sprinted smoothly, or Max ran with determination",
              hints: ["Max", "sprinted", "smoothly", "determination"]
            },
            {
              template: "Hooray! What did the team win at the end? Say: They won a golden medal, or They won first place",
              hints: ["won", "golden medal", "first place"]
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
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding fair play" },
      opening_narrative: "On sports day, Maya saw a runner from another team slip on the wet grass. Instead of running past, she stopped to help! True champions know that playing fair is more important than winning gold medals. Let's discuss sportsmanship!",
      story_arc: [
        {
          phase: "helping_hand",
          turns: "1-4",
          phase_name: "Showing Respect",
          focus: "Describing fair play actions",
          goal: "Student explains fair play actions",
          phase_questions: [
            {
              template: "Wonderful! What should runners do after finishing a race? Say: Shake hands with opponents, or Say kind words of encouragement",
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
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding health science" },
      opening_narrative: "Health experts recommend 30 minutes of exercise every single day! Running outdoors builds strong leg muscles and keeps our heart healthy. What outdoor sport do you enjoy playing?",
      story_arc: [
        {
          phase: "daily_exercise",
          turns: "1-4",
          phase_name: "Outdoor Sports Routine",
          focus: "Describing health benefits of sports",
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
  ],

  spark_talk: [
    {
      id: 1,
      title: "My Relay Experience",
      emoji: "🏃‍♂️",
      seed_question: "Tell me about a race or game you joined! Did you run fast?",
      text_en: "Tell me about a race or game you joined!",
      text_vi: "Kể cho Nova nghe về cuộc đua bạn từng tham gia!",
      hint_en: "I ran in a race... I played soccer in the park...",
      hint_vi: "Tôi đã chạy trong cuộc đua... Tôi chơi bóng đá...",
      turns: 8,
      frames: [
        {
          frame: 1,
          prompt_en: "Tell me about a race or game you joined! Where did you play? Say: I ran in a race at school, or I played soccer in the park",
          hint_en: "I ran in a race... I played soccer in the park...",
          target_vocab: ["ran", "race", "school", "soccer", "park"]
        },
        {
          frame: 2,
          prompt_en: "How fast did you run during your game? Say: I ran very fast, or I sprinted to the line",
          hint_en: "I ran very fast... I sprinted to the line...",
          target_vocab: ["ran", "very fast", "sprinted", "line"]
        }
      ]
    },
    {
      id: 2,
      title: "Teamwork and Sportsmanship",
      emoji: "🤝",
      seed_question: "How do you and your friends help each other when playing sports?",
      text_en: "How do you help your teammates?",
      text_vi: "Bạn giúp đỡ đồng đội như thế nào khi chơi thể thao?",
      hint_en: "We work together... We shake hands with opponents...",
      hint_vi: "Chúng tôi làm việc cùng nhau... Chúng tôi bắt tay...",
      turns: 8,
      frames: [
        {
          frame: 1,
          prompt_en: "How do teammates win a relay race together? Say: We work together as a team, or We pass the baton smoothly",
          hint_en: "We work together... We pass the baton smoothly...",
          target_vocab: ["work together", "teamwork", "pass baton"]
        }
      ]
    },
    {
      id: 3,
      title: "Active Sports and Healthy Living",
      emoji: "🌟",
      seed_question: "What is your favourite outdoor sport to play on sunny days?",
      text_en: "What outdoor sport do you love?",
      text_vi: "Môn thể thao ngoài trời nào bạn yêu thích?",
      hint_en: "I love playing basketball... I like running in the park...",
      hint_vi: "Tôi thích chơi bóng rổ... Tôi thích chạy...",
      turns: 8,
      frames: [
        {
          frame: 1,
          prompt_en: "What outdoor sport do you love playing with friends? Say: I love playing basketball, or I enjoy running in the park",
          hint_en: "I love playing basketball... I enjoy running...",
          target_vocab: ["basketball", "running", "outdoor sports"]
        }
      ]
    }
  ]
};

export default week_37RealData;
