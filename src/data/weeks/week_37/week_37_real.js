// WEEK 37: The Sports Day Challenge
// 100% Pipeline Compliant with W36 Standard (3 Story Missions + EXACTLY 2 Free Talk Cards)

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
      title: "STEM: Speed Science & Relay",
      title_en: "STEM: Speed Science & Relay",
      title_vi: "STEM: Khoa Học Tốc Độ & Tiếp Sức",
      theme: "Retelling STEM Story passage (read_stem)",
      type: "story",
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding relay race science" },
      opening_narrative: "Hello! I am Coach Nova. On Saturday morning, Leo and his classmates went to the sports stadium to study human physical biomechanics and speed science (v = d/t). Leo ran very fast along the red track and passed the baton cleanly to Maya. His leg muscles converted chemical energy into kinetic energy. Max sprinted smoothly to the finish line and they won first place! Do you remember the speed science story?",
      story_arc: [
        {
          phase: "the_start",
          turns: "1-4",
          phase_name: "Running Fast",
          focus: "Retelling STEM Story passage (read_stem)",
          goal: "Student retells STEM speed science passage",
          phase_questions: [
            {
              template: "Awesome! Where did Leo go on Saturday morning? Say: He went to the sports stadium, or He went to the track",
              hints: ["went", "sports stadium", "track"]
            },
            {
              template: "Great! What speed formula did Leo calculate with his coach? Say: He calculated v = distance / time, or He calculated speed formula",
              hints: ["calculated", "v = distance / time", "speed formula"]
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
          phase_name: "Kinetic Energy & Winning",
          focus: "Describing kinetic energy and winning gold medal",
          goal: "Student retells winning the gold medal",
          phase_questions: [
            {
              template: "Exciting! How did leg muscles convert food energy? Say: Leg muscles converted energy into kinetic motion, or They converted energy into speed",
              hints: ["converted", "energy", "kinetic motion", "speed"]
            },
            {
              template: "Hooray! What did the team win at the finish line? Say: They won a golden medal, or They won first place",
              hints: ["won", "golden medal", "first place"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Social Studies: Fair Play",
      title_en: "Social Studies: Fair Play",
      title_vi: "Social Studies: Nhà Vô Địch Chơi Đẹp",
      theme: "Retelling Social Studies passage (read_social)",
      type: "story",
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding fair play history" },
      opening_narrative: "On sports day, Maya saw a runner slip on the grass. Instead of running past, she stopped to help! In ancient Greece, athletes gathered at Olympia to celebrate global peace and sportsmanship. True champions know playing fair is more important than winning trophies!",
      story_arc: [
        {
          phase: "helping_hand",
          turns: "1-4",
          phase_name: "Ancient Greece & Fair Play",
          focus: "Retelling Social Studies passage (read_social)",
          goal: "Student explains fair play and ancient Olympics",
          phase_questions: [
            {
              template: "Wonderful! Where did ancient athletes gather in Greece? Say: They gathered at Olympia, or They gathered in ancient Greece",
              hints: ["gathered", "Olympia", "ancient Greece"]
            },
            {
              template: "Great job! What should runners do after finishing a race? Say: Shake hands with opponents, or Say kind words of encouragement",
              hints: ["Shake hands", "opponents", "say kind words"]
            },
            {
              template: "Fantastic! Why is playing fair more important than winning gold medals? Say: It builds strong character, or It shows respect to everyone",
              hints: ["builds strong character", "shows respect"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "My Sports Day Experience",
      title_en: "My Sports Day Experience",
      title_vi: "Trải Nghiệm Thể Thao Bản Thân",
      theme: "Personal Connection & Outdoor Sports",
      type: "story",
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding personal connection" },
      opening_narrative: "Now it is YOUR turn to tell Coach Nova about your life! Health experts recommend 30 minutes of exercise every day. What outdoor sport or race do you enjoy playing with your friends?",
      story_arc: [
        {
          phase: "daily_exercise",
          turns: "1-4",
          phase_name: "Personal Sports Story",
          focus: "Personal application to student's life",
          goal: "Student describes their own sports experience",
          phase_questions: [
            {
              template: "Tell me! What outdoor sport do you love playing? Say: I love playing soccer in the park, or I enjoy running with my friends",
              hints: ["love playing", "soccer", "park", "running", "friends"]
            },
            {
              template: "Fantastic! How do you help your teammates during a game? Say: We work together as a team, or We cheer for each other",
              hints: ["work together", "team", "cheer"]
            }
          ]
        }
      ]
    }
  ],

  spark_talk: [
    {
      id: 1,
      title: "My Favorite Sports and Games",
      emoji: "🏃‍♂️",
      seed_question: "Tell me about a race or outdoor sport you love playing with your friends! Where do you play?",
      text_en: "Tell me about an outdoor sport you love playing!",
      text_vi: "Kể cho Nova nghe về môn thể thao ngoài trời bạn thích chơi!",
      hint_en: "I love playing soccer in the park... I like running with my friends...",
      hint_vi: "Tôi thích chơi bóng đá... Tôi thích chạy...",
      turns: 8,
      frames: [
        {
          frame: 1,
          prompt_en: "Tell me about a sport or race you played! Where did you play? Say: I ran in a race at school, or I played soccer in the park",
          hint_en: "I ran in a race... I played soccer in the park...",
          target_vocab: ["ran", "race", "school", "soccer", "park"]
        },
        {
          frame: 2,
          prompt_en: "How fast did you run during your game? Say: I ran very fast, or I sprinted to the finish line",
          hint_en: "I ran very fast... I sprinted to the finish line...",
          target_vocab: ["ran", "very fast", "sprinted", "finish line"]
        }
      ]
    },
    {
      id: 2,
      title: "Showing Teamwork and Fair Play",
      emoji: "🤝",
      seed_question: "How do you and your classmates show fair play and help teammates on sports day?",
      text_en: "How do you show fair play with friends?",
      text_vi: "Bạn thể hiện sự chơi đẹp với bạn bè như thế nào?",
      hint_en: "We work together as a team... We shake hands with opponents...",
      hint_vi: "Chúng tôi làm việc cùng nhau... Chúng tôi bắt tay...",
      turns: 8,
      frames: [
        {
          frame: 1,
          prompt_en: "How do you and your friends work together during sports day? Say: We work together as a team, or We pass the baton smoothly",
          hint_en: "We work together... We pass the baton smoothly...",
          target_vocab: ["work together", "teamwork", "pass baton"]
        },
        {
          frame: 2,
          prompt_en: "What do you do after finishing an exciting match? Say: We shake hands politely with opponents, or We cheer for all runners",
          hint_en: "We shake hands politely... We cheer for all runners...",
          target_vocab: ["shake hands", "opponents", "cheer"]
        }
      ]
    }
  ]
};

export default week_37RealData;
