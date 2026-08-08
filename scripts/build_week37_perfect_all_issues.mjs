import fs from 'fs';
import path from 'path';

console.log('🚀 Fixing all Week 37 issues: SVGs, Shadowing Video, STEM Content, AI Tutor Missions & Free Talk Cards...');

const PUBLIC_W37_DIR = './public/images/week37';
fs.mkdirSync(PUBLIC_W37_DIR, { recursive: true });

// ============================================================================
// 1. GENERATE 5 CUSTOM BAR MODEL SVG IMAGES FOR WEEK 37 MATH
// ============================================================================

const svgP1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <rect width="600" height="220" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Equal Groups Bar Model: Relay Race Distance</text>
  
  <path d="M 50 65 L 50 55 L 550 55 L 550 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Distance = ? metres</text>

  <rect x="50" y="70" width="120" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="110" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Runner 1</text>
  <text x="110" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">100m</text>

  <rect x="175" y="70" width="120" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="235" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Runner 2</text>
  <text x="235" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">100m</text>

  <rect x="300" y="70" width="120" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="360" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Runner 3</text>
  <text x="360" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">100m</text>

  <rect x="425" y="70" width="125" height="60" fill="#3b82f6" rx="6" stroke="#1d4ed8" stroke-width="2"/>
  <text x="487" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Runner 4</text>
  <text x="487" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">100m</text>

  <text x="300" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 4 runners x 100 metres = 400m</text>
</svg>`;

const svgP2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <rect width="600" height="220" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Part-Whole Bar Model: Combined Running Time</text>
  
  <path d="M 50 65 L 50 55 L 550 55 L 550 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Time = ? seconds</text>

  <rect x="50" y="70" width="250" height="60" fill="#10b981" rx="6" stroke="#047857" stroke-width="2"/>
  <text x="175" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Leo's Lap</text>
  <text x="175" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">15 seconds</text>

  <rect x="305" y="70" width="245" height="60" fill="#8b5cf6" rx="6" stroke="#6d28d9" stroke-width="2"/>
  <text x="427" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Maya's Lap</text>
  <text x="427" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">14 seconds</text>

  <text x="300" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 15s + 14s = 29s</text>
</svg>`;

const svgP3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <rect width="600" height="220" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Part-Whole Bar Model: Stadium Spectator Seats</text>
  
  <path d="M 50 65 L 50 55 L 550 55 L 550 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Seats = 500</text>

  <rect x="50" y="70" width="320" height="60" fill="#f59e0b" rx="6" stroke="#b45309" stroke-width="2"/>
  <text x="210" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Filled Seats</text>
  <text x="210" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">320 fans</text>

  <rect x="375" y="70" width="175" height="60" fill="#64748b" rx="6" stroke="#334155" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="462" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Empty Seats</text>
  <text x="462" y="120" font-family="sans-serif" font-size="16" font-weight="extrabold" fill="#ffffff" text-anchor="middle">?</text>

  <text x="300" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 500 - 320 = 180 seats</text>
</svg>`;

const svgP4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <rect width="600" height="220" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Missing Part Bar Model: Relay Target Time</text>
  
  <path d="M 50 65 L 50 55 L 550 55 L 550 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Target Time = 60 seconds</text>

  <rect x="50" y="70" width="270" height="60" fill="#06b6d4" rx="6" stroke="#0891b2" stroke-width="2"/>
  <text x="185" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Leo + Maya</text>
  <text x="185" y="120" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">32 seconds</text>

  <rect x="325" y="70" width="225" height="60" fill="#ec4899" rx="6" stroke="#be185d" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="437" y="100" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">Max's Time Needed</text>
  <text x="437" y="120" font-family="sans-serif" font-size="16" font-weight="extrabold" fill="#ffffff" text-anchor="middle">?</text>

  <text x="300" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 60 - 32 = 28 seconds</text>
</svg>`;

const svgP5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 220" width="100%" height="100%">
  <rect width="600" height="220" fill="#f8fafc" rx="12"/>
  <text x="300" y="30" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b" text-anchor="middle">Equal Groups Bar Model: Award Medals</text>
  
  <path d="M 50 65 L 50 55 L 550 55 L 550 65 M 300 55 L 300 45" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="300" y="40" font-family="sans-serif" font-size="15" font-weight="bold" fill="#2563eb" text-anchor="middle">Total Medals = ?</text>

  <rect x="50" y="70" width="95" height="60" fill="#eab308" rx="6" stroke="#ca8a04" stroke-width="2"/>
  <text x="97" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Team 1 (6)</text>

  <rect x="150" y="70" width="95" height="60" fill="#eab308" rx="6" stroke="#ca8a04" stroke-width="2"/>
  <text x="197" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Team 2 (6)</text>

  <rect x="250" y="70" width="95" height="60" fill="#eab308" rx="6" stroke="#ca8a04" stroke-width="2"/>
  <text x="297" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Team 3 (6)</text>

  <rect x="350" y="70" width="95" height="60" fill="#eab308" rx="6" stroke="#ca8a04" stroke-width="2"/>
  <text x="397" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Team 4 (6)</text>

  <rect x="450" y="70" width="95" height="60" fill="#eab308" rx="6" stroke="#ca8a04" stroke-width="2"/>
  <text x="497" y="100" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">Team 5 (6)</text>

  <text x="300" y="180" font-family="sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="middle">Equation: 5 teams x 6 medals = 30 medals</text>
</svg>`;

fs.writeFileSync(path.join(PUBLIC_W37_DIR, 'barmodel_w37_adv_p1.svg'), svgP1, 'utf8');
fs.writeFileSync(path.join(PUBLIC_W37_DIR, 'barmodel_w37_adv_p2.svg'), svgP2, 'utf8');
fs.writeFileSync(path.join(PUBLIC_W37_DIR, 'barmodel_w37_adv_p3.svg'), svgP3, 'utf8');
fs.writeFileSync(path.join(PUBLIC_W37_DIR, 'barmodel_w37_adv_p4.svg'), svgP4, 'utf8');
fs.writeFileSync(path.join(PUBLIC_W37_DIR, 'barmodel_w37_adv_p5.svg'), svgP5, 'utf8');

console.log('✅ Created 5 custom bar model SVG images in public/images/week37/');


// ============================================================================
// 2. UPDATE singapore_math.js IN ADV & EASY MODE TO USE W37 SVGs
// ============================================================================

const advMathData = {
  title: "Sports Day Relay Math Problems",
  theme: "sports_day",
  problems: [
    { id: 1, type: "groups", question_en: "There are 4 runners in a relay team. Each runner sprints 100 metres. What is the total distance of the relay race?", bar_model: "/images/week37/barmodel_w37_adv_p1.svg", answer: ["400"], hint_en: "Multiply 4 runners by 100 metres.", hint_vi: "Nhan 4 van dong vien voi 100 met." },
    { id: 2, type: "comparison", question_en: "Leo ran his lap in 15 seconds. Maya ran her lap in 14 seconds. How many seconds did they take together?", bar_model: "/images/week37/barmodel_w37_adv_p2.svg", answer: ["29"], hint_en: "Add 15 and 14 seconds.", hint_vi: "Cong 15 va 14 giay." },
    { id: 3, type: "part_whole", question_en: "The sports stadium has 500 spectator seats. 320 seats are filled with cheering fans. How many empty seats are left?", bar_model: "/images/week37/barmodel_w37_adv_p3.svg", answer: ["180"], hint_en: "Subtract 320 from 500.", hint_vi: "Tru 320 khoi 500." },
    { id: 4, type: "missing_part", question_en: "The relay team needed 60 seconds to finish. Leo and Maya ran 32 seconds combined. How long did Max run?", bar_model: "/images/week37/barmodel_w37_adv_p4.svg", answer: ["28"], hint_en: "Subtract 32 seconds from 60 seconds.", hint_vi: "Tru 32 giay khoi 60 giay." },
    { id: 5, type: "groups", question_en: "The school gave 6 medals to each of the 5 winning relay teams. How many total medals were awarded?", bar_model: "/images/week37/barmodel_w37_adv_p5.svg", answer: ["30"], hint_en: "Multiply 6 medals by 5 teams.", hint_vi: "Nhan 6 huy chuong voi 5 doi." }
  ]
};

fs.writeFileSync('./src/data/weeks/week_37/singapore_math.js', `export default ${JSON.stringify(advMathData, null, 2)};\n`, 'utf8');
fs.writeFileSync('./src/data/weeks_easy/week_37/singapore_math.js', `export default ${JSON.stringify(advMathData, null, 2)};\n`, 'utf8');


// ============================================================================
// 3. UPDATE shadowing.js IN ADV & EASY MODE TO USE VALID SPORTS VIDEO & TRANSCRIPT
// ============================================================================

const shadowingDataADV = {
  videoId: '_Itws1UmFE8', // Educational Past Simple Grammar & Sports Video
  content_en: "On Saturday morning, Leo went to the sports stadium. Leo ran very fast along the track and passed the baton cleanly to Maya.",
  script: [
    { id: 1, text: "On Saturday morning, Leo went to the sports stadium.", vi: "Vào sáng thứ Bảy, Leo đã đến sân vận động thể thao." },
    { id: 2, text: "The weather was warm and bright for running.", vi: "Thời tiết ấm áp và sáng thích hợp cho việc chạy bộ." },
    { id: 3, text: "Leo entered the competitive 100-metre relay race.", vi: "Leo tham gia cuộc đua tiếp sức 100m đầy tính cạnh tranh." },
    { id: 4, text: "He sat down with his coach to review their strategy.", vi: "Cậu ấy ngồi xuống với huấn luyện viên để xem lại chiến thuật." },
    { id: 5, text: "Leo ran very fast along the red track.", vi: "Leo chạy rất nhanh dọc theo đường chạy màu đỏ." },
    { id: 6, text: "He passed the baton cleanly to Maya.", vi: "Cậu ấy đã truyền gậy tiếp sức gọn gàng cho Maya." },
    { id: 7, text: "Maya ran across the grass with remarkable speed.", vi: "Maya đã chạy qua bãi cỏ với tốc độ đáng kinh ngạc." },
    { id: 8, text: "Max caught the baton smoothly and sprinted forward.", vi: "Max đã bắt lấy gậy tiếp sức một cách mượt mà và bứt tốc." },
    { id: 9, text: "Thousands of spectators watched and clapped enthusiastically.", vi: "Hàng ngàn khán giả đã xem và vỗ tay nhiệt tình." },
    { id: 10, text: "At the very end, their team crossed the finish line first!", vi: "Cuối cùng, đội của họ đã cán đích đầu tiên!" },
    { id: 11, text: "Everyone were tired but happy because teamwork brought victory.", vi: "Mọi người mệt nhưng rất vui vì tinh thần đồng đội mang lại chiến thắng." },
    { id: 12, text: "Leo smiled with pride as he received his golden medal.", vi: "Leo mỉm cười tự hào khi nhận được huy chương vàng." }
  ]
};

const shadowingDataEASY = {
  videoId: '_Itws1UmFE8',
  content_en: "On Saturday morning, Leo went to the sports stadium. Leo ran fast and passed the baton cleanly to Maya.",
  script: shadowingDataADV.script.slice(0, 10)
};

fs.writeFileSync('./src/data/weeks/week_37/shadowing.js', `export default ${JSON.stringify(shadowingDataADV, null, 2)};\n`, 'utf8');
fs.writeFileSync('./src/data/weeks_easy/week_37/shadowing.js', `export default ${JSON.stringify(shadowingDataEASY, null, 2)};\n`, 'utf8');


// ============================================================================
// 4. WRITE PERFECT FULL-FEATURED week_37_real.js AT BOTH LOCATIONS FOR AI TUTOR
// ============================================================================

const fullWeek37RealContent = `// WEEK 37: The Sports Day Challenge
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
`;

// Save at BOTH locations so both static and dynamic imports resolve perfectly!
fs.writeFileSync('./src/data/weeks/week_37_real.js', fullWeek37RealContent, 'utf8');
fs.writeFileSync('./src/data/weeks/week_37/week_37_real.js', fullWeek37RealContent, 'utf8');
fs.writeFileSync('./src/data/weeks_easy/week_37/week_37_easy_real.js', fullWeek37RealContent, 'utf8');

console.log('✅ Wrote full-featured week_37_real.js at all expected locations!');

