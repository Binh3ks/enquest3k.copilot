import fs from 'fs';
import path from 'path';

console.log('🚀 Synchronizing ALL Week 37 Stations & AI Tutor Data (ADV & EASY)...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

// ============================================================================
// 1. AI TUTOR REAL DATA (V28 Format — Mission 1 STEM, Mission 2 Social, Mission 3 Personal/Kenya, Free Talk 2 Cards)
// ============================================================================

const week37RealDataADV = {
  week_id: 37,
  week_number: 37,
  title: "The Sports Day Challenge",
  weekTitle_en: "The Sports Day Challenge",
  weekTitle_vi: "Thách Thức Ngày Hội Thể Thao",
  topic: "Outdoor sports, speed science physics, Olympic truce history, Kenya marathon champions",
  topic_vi: "Thể thao ngoài trời, vật lý tốc độ, lịch sử đình chiến Olympic, các nhà vô địch marathon Kenya",
  theme: "sports_day_challenge",
  grammar_focus: "Past Simple & Speed Science Concepts",
  grammar_pattern: "He ran very fast. She passed the baton seamlessly. They declared a sacred truce.",
  grammar_examples: [
    "Leo ran very fast along the red track.",
    "The coach explained that velocity equals distance divided by time.",
    "Athletes were united in peace because sports brought peace."
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
    "was tired but happy",
    "teamwork brought victory",
    "smiled with pride"
  ],

  target_vocab: [
    { word: "athlete", pronunciation: "/ˈæθliːt/", definition_vi: "vận động viên", definition_en: "a person trained in physical sports" },
    { word: "relay", pronunciation: "/ˈriːleɪ/", definition_vi: "cuộc đua tiếp sức", definition_en: "a race between teams passing a stick" },
    { word: "baton", pronunciation: "/bəˈtɒn/", definition_vi: "gậy tiếp sức", definition_en: "a stick passed from runner to runner" },
    { word: "stadium", pronunciation: "/ˈsteɪdiəm/", definition_vi: "sân vận động", definition_en: "a large sports arena" },
    { word: "teamwork", pronunciation: "/ˈtiːmwɜːk/", definition_vi: "tinh thần đồng đội", definition_en: "working together cooperatively as a group" },
    { word: "momentum", pronunciation: "/məˈmentəm/", definition_vi: "động năng / đà di chuyển", definition_en: "the force of a moving body" },
    { word: "truce", pronunciation: "/truːs/", definition_vi: "thỏa thuận ngừng bắn", definition_en: "an agreement to stop fighting" },
    { word: "nation", pronunciation: "/ˈneɪʃn/", definition_vi: "quốc gia", definition_en: "a country with its own government" }
  ],

  sentences: [
    { id: 1, text: "Leo ran very fast along the red track.", meaning: "Leo chạy rất nhanh trên đường chạy màu đỏ." },
    { id: 2, text: "He passed the baton cleanly to Maya.", meaning: "Cậu ấy đã truyền gậy tiếp sức gọn gàng cho Maya." },
    { id: 3, text: "Ancient Greek leaders declared a sacred truce.", meaning: "Các nhà lãnh đạo Hy Lạp cổ đại đã tuyên bố đình chiến linh thiêng." },
    { id: 4, text: "Over two hundred nations join the Modern Olympics.", meaning: "Hơn hai trăm quốc gia tham gia Thế vận hội hiện đại." },
    { id: 5, text: "Their dedicated teamwork brought victory!", meaning: "Tinh thần đồng đội tận tụy của họ đã mang lại chiến thắng!" }
  ],

  voice_character: {
    name: "Coach Nova - Sports Mentor",
    personality: "Energetic, motivating, encouraging, patient, uses sports and speed science terms.",
    speaking_style: "Upbeat and supportive, uses past simple and clear physics and sports terms.",
    v28_format_notes: "W37 follows V28 schema."
  },

  story_character: {
    name: "Coach Nova - Sports Mentor",
    personality: "Energetic, encouraging, supportive, uses sports terms",
    backstory: "I am Nova, your AI Sports Coach! Today we explore speed science, Olympic history, and Kenya runners!",
    speaking_style: "Upbeat, motivating, uses past simple and clear story concepts",
    facts: { loves_sports: true, teaches_past_simple: true },
    role: "Sports mentor guiding students in relay physics, Olympic history, and global running"
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
      opening_narrative: "Hello! I am Coach Nova. On Saturday morning, Leo solved a physical momentum problem in his relay race! To keep forward speed (velocity = distance / time), the second runner sprinted early before receiving the baton. Do you remember where Leo went?",
      story_arc: [
        {
          phase: "the_start",
          turns: "1-4",
          phase_name: "Running & Momentum Problem",
          focus: "Retelling STEM Story passage (read_stem)",
          goal: "Student retells STEM speed science passage",
          phase_questions: [
            {
              template: "Awesome! Where did Leo's team go on Saturday morning? Say: They went to the sports stadium, or They went to the track",
              hints: ["went", "sports stadium", "track"]
            },
            {
              template: "Great! What physics formula did Leo review with his coach? Say: He measured velocity = distance / time, or He used the speed formula",
              hints: ["velocity = distance / time", "speed formula"]
            },
            {
              template: "Brilliant! How did the second runner keep fast kinetic momentum? Say: By starting to sprint early, or By running before receiving the baton",
              hints: ["sprint early", "momentum", "running fast"]
            }
          ]
        },
        {
          phase: "the_finish",
          turns: "5-8",
          phase_name: "Seamless Baton Exchange & Gold Medal",
          focus: "Describing baton exchange and winning gold medal",
          goal: "Student retells winning the gold medal",
          phase_questions: [
            {
              template: "Exciting! How did Max catch the baton from Maya? Say: He caught the baton at full speed, or He caught the baton smoothly",
              hints: ["caught the baton", "full speed", "smoothly"]
            },
            {
              template: "Hooray! What did the team win at the finish line? Say: They won a gold medal, or Scientific teamwork brought victory",
              hints: ["won", "gold medal", "teamwork brought victory"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 2,
      id: 2,
      title: "Social Studies: The Olympic Truce",
      title_en: "Social Studies: The Olympic Truce",
      title_vi: "Social Studies: Hòa Bình Olympic",
      theme: "Retelling Social Studies passage (read_social)",
      type: "story",
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding Olympic history" },
      opening_narrative: "Long ago in ancient Greece, leaders declared a sacred truce (Ekecheiria) during the Olympics to pause all wars! Today, over 200 nations connect in the Modern Olympic Village. What agreement did ancient leaders declare?",
      story_arc: [
        {
          phase: "history_and_peace",
          turns: "1-4",
          phase_name: "Ancient Truce & Modern Olympics",
          focus: "Retelling Social Studies passage (read_social)",
          goal: "Student explains Olympic Truce history and 200 nations",
          phase_questions: [
            {
              template: "Wonderful! What sacred agreement did ancient Greek leaders declare? Say: They declared a sacred truce, or They stopped all conflicts",
              hints: ["declared a sacred truce", "stopped conflicts"]
            },
            {
              template: "Great job! How many nations come together in the Modern Olympics today? Say: Over two hundred nations, or Over 200 countries",
              hints: ["over two hundred nations", "200 countries"]
            },
            {
              template: "Fantastic! Why were all athletes united in peace at the end? Say: International sports brought peace across borders, or Sports connect the world in peace",
              hints: ["sports brought peace", "united in peace"]
            }
          ]
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Explore: Kenya Champions & My Sports",
      title_en: "Explore: Kenya Champions & My Sports",
      title_vi: "Explore: Huyền Thoại Kenya & Thể Thao Của Tôi",
      theme: "Connecting Explore Kenya story to personal sports",
      type: "story",
      character: { name: "Coach Nova - Sports Mentor", role: "Sports mentor guiding Kenya story and personal connection" },
      opening_narrative: "High in the mountains of Iten, Kenya, children run long distances to school 2,400m above sea level to build strong lungs and become marathon champions! What outdoor sport or race do you love playing?",
      story_arc: [
        {
          phase: "kenya_and_personal",
          turns: "1-4",
          phase_name: "Kenya Champions & My Sports Story",
          focus: "Connecting Kenya endurance story to student's life",
          goal: "Student connects Kenya marathon story to their own sports",
          phase_questions: [
            {
              template: "Tell me! Why do runners train high up in Kenya? Say: Thin mountain air builds strong lungs and hearts, or To become marathon champions",
              hints: ["strong lungs", "marathon champions"]
            },
            {
              template: "Awesome! What outdoor sport or race do you love playing with friends? Say: I love running in the park, or I enjoy playing soccer with my team",
              hints: ["love running", "park", "soccer", "team"]
            }
          ]
        }
      ]
    }
  ],

  spark_talk: [
    {
      id: 1,
      title: "Speed Science & Relay Racing",
      emoji: "🏃‍♂️",
      seed_question: "Tell me about a relay race or outdoor running game! How do you and your team run fast together?",
      text_en: "Tell me about speed science in your favorite race!",
      text_vi: "Kể cho Nova nghe về khoa học tốc độ trong cuộc đua bạn thích!",
      hint_en: "We ran very fast... We passed the baton smoothly...",
      hint_vi: "Chúng tôi chạy rất nhanh... Chúng tôi truyền gậy mượt mà...",
      turns: 8,
      frames: [
        {
          frame: 1,
          prompt_en: "Tell me about a race you ran! How did you pass the baton? Say: I ran very fast and passed the baton smoothly, or We sprinted to the finish line",
          hint_en: "I ran very fast... passed the baton smoothly...",
          target_vocab: ["ran very fast", "passed the baton", "finish line"]
        },
        {
          frame: 2,
          prompt_en: "How does teamwork help your team win gold medals? Say: Scientific teamwork brought victory, or We cheered and clapped together",
          hint_en: "teamwork brought victory... cheered and clapped...",
          target_vocab: ["teamwork brought victory", "cheered", "clapped"]
        }
      ]
    },
    {
      id: 2,
      title: "Olympic Truce & Global Champions",
      emoji: "🌍",
      seed_question: "How do sports like the Olympics bring children from different countries together in peace?",
      text_en: "How do global sports bring people together?",
      text_vi: "Thể thao toàn cầu kết nối mọi người như thế nào?",
      hint_en: "Over 200 nations join the Olympics... Sports bring global peace...",
      hint_vi: "Hơn 200 quốc gia tham gia Olympic... Thể thao mang lại hòa bình...",
      turns: 8,
      frames: [
        {
          frame: 1,
          prompt_en: "What did ancient Greek leaders declare during the Olympics? Say: They declared a sacred truce for peace, or They stopped all conflicts",
          hint_en: "declared a sacred truce... stopped all conflicts...",
          target_vocab: ["declared a sacred truce", "peace", "olympics"]
        },
        {
          frame: 2,
          prompt_en: "How do marathon runners in Kenya inspire children everywhere? Say: They run high in the mountains to build strong lungs, or They achieve big dreams through speed",
          hint_en: "strong lungs... achieve big dreams...",
          target_vocab: ["strong lungs", "kenya", "achieve big dreams"]
        }
      ]
    }
  ]
};

const week37RealDataEASY = JSON.parse(JSON.stringify(week37RealDataADV));
week37RealDataEASY.topic = "Outdoor sports, simple speed science, Olympic truce, Kenya runners";
week37RealDataEASY.topic_vi = "Thể thao ngoài trời, khoa học tốc độ đơn giản, đình chiến Olympic, người chạy Kenya";

// Write both week_37_real.js and week_37_easy_real.js to src/data/weeks/ AND src/data/weeks/week_37/
const advRealJsContent = `const week_37RealData = ${JSON.stringify(week37RealDataADV, null, 2)};\nexport default week_37RealData;\n`;
const easyRealJsContent = `const week_37_easyRealData = ${JSON.stringify(week37RealDataEASY, null, 2)};\nexport default week_37_easyRealData;\n`;

fs.writeFileSync('./src/data/weeks/week_37_real.js', advRealJsContent, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'week_37_real.js'), advRealJsContent, 'utf8');

fs.writeFileSync('./src/data/weeks_easy/week_37_easy_real.js', easyRealJsContent, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'week_37_easy_real.js'), easyRealJsContent, 'utf8');

console.log('✅ Synchronized AI Tutor V28 real data for ADV & EASY in both directories!');


// ============================================================================
// 2. WRITE & SPEAK (writing.js)
// ============================================================================

const writingDataADV = {
  title: "Speed Science & Olympic Peace — Writing Station",
  theme: "sports_day",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "On Saturday morning, our relay team went to the sports stadium for our big race. We solved a physics problem by sprinting early before the baton exchange zone to keep our fast momentum. Leo ran very fast and passed the baton cleanly to Maya. Max sprinted at peak velocity and crossed the finish line first! Scientific teamwork brought victory, and we felt proud like Olympic champions.",
  topic_talk_prompt: "Tell me about a sports day race or Olympic story — how did you apply speed science or teamwork to win?",
  prompt_en: "Write about speed science and relay racing. Use 5+ sports action words (ran fast, passed the baton, maintained momentum, clapped, won, declared truce).",
  prompt_vi: "Viết về khoa học tốc độ và chạy tiếp sức. Dùng 5+ từ chỉ hành động thể thao (ran fast, passed the baton, maintained momentum, clapped, won, declared truce).",
  sentence_frames: [
    { "template": "On Saturday morning, we went to the ___.", "answers": ["sports stadium", "stadium"] },
    { "template": "The weather was ___ and warm.", "answers": ["sunny"] },
    { "template": "Leo ran very ___ along the track.", "answers": ["fast"] },
    { "template": "He passed the ___ cleanly to Maya.", "answers": ["baton"] },
    { "template": "Max sprinted with fast ___ toward the line.", "answers": ["momentum", "speed"] },
    { "template": "Spectators watched and ___ with joy.", "answers": ["clapped"] },
    { "template": "Our scientific ___ brought victory.", "answers": ["teamwork"] },
    { "template": "Competitors were united in ___ at the end.", "answers": ["peace"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "sports stadium", "vi": "sân vận động", "distractor": false },
        { "word": "sunny", "vi": "nắng", "distractor": false },
        { "word": "fast", "vi": "nhanh", "distractor": false },
        { "word": "baton", "vi": "gậy tiếp sức", "distractor": false },
        { "word": "momentum", "vi": "động năng / đà", "distractor": false },
        { "word": "clapped", "vi": "vỗ tay", "distractor": false },
        { "word": "teamwork", "vi": "tinh thần đồng đội", "distractor": false },
        { "word": "peace", "vi": "hòa bình", "distractor": false },
        { "word": "passed the baton", "vi": "truyền gậy", "distractor": false },
        { "word": "sacred truce", "vi": "thỏa thuận ngừng bắn", "distractor": false },
        { "word": "went home", "vi": "đã về nhà", "distractor": true },
        { "word": "cold rain", "vi": "mưa lạnh", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: null,
      image_prompt: "Young athletes sprinting on a red athletic track passing a baton under bright sunlight, cheering spectators in background, cartoon illustration.",
      word_bank: ["ran very fast", "passed the baton", "sprinted early", "crossed the finish line", "cheered loudly", "smiled with pride", "teamwork brought victory", "united in peace"],
      sentence_frames: [
        { "template": "On Saturday morning, Leo ___ (go) to the sports stadium.", "answers": ["went"] },
        { "template": "He ___ (run) very fast on the track.", "answers": ["ran"] },
        { "template": "He ___ (pass) the baton cleanly to Maya.", "answers": ["passed"] },
        { "template": "Maya ___ (run) across the grass with fast momentum.", "answers": ["ran"] },
        { "template": "Max ___ (catch) the baton smoothly at full speed.", "answers": ["caught"] },
        { "template": "They ___ (cross) the finish line first.", "answers": ["crossed"] },
        { "template": "Spectators ___ (clap) enthusiastically.", "answers": ["clapped"] },
        { "template": "Leo ___ (smile) with pride.", "answers": ["smiled"] }
      ],
      writing_prompts: {
        en: "Look at the sports day relay picture and write the story. How did the runners pass the baton cleanly? Use 5+ past action verbs.",
        vi: "Nhìn vào bức ảnh chạy tiếp sức và viết lại câu chuyện. Các vận động viên đã truyền gậy gọn gàng như thế nào? Dùng 5+ động từ quá khứ."
      }
    }
  }
};

fs.writeFileSync(path.join(ADV_DIR, 'writing.js'), `export default ${JSON.stringify(writingDataADV, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'writing.js'), `export default ${JSON.stringify(writingDataADV, null, 2)};\n`, 'utf8');
console.log('✅ Synchronized writing.js for ADV & EASY!');


// ============================================================================
// 3. DAILY WATCH (daily_watch.js — 5 Unused Educational Videos)
// ============================================================================

const dailyWatchData = {
  videos: [
    { id: 1, title: "English Conversation: Playing Sports & What Did You Do Yesterday?", videoId: "7J7f8qbD4Fk", duration: "04:15", sim_duration: 255, thumb: "https://img.youtube.com/vi/7J7f8qbD4Fk/mqdefault.jpg" },
    { id: 2, title: "Saturday Sports Day Party & Friendships", videoId: "79Yxp84s0KI", duration: "03:40", sim_duration: 220, thumb: "https://img.youtube.com/vi/79Yxp84s0KI/mqdefault.jpg" },
    { id: 3, title: "Athletic Focus & Endurance Habit Science", videoId: "5hP9Zx2Q4sU", duration: "03:12", sim_duration: 192, thumb: "https://img.youtube.com/vi/5hP9Zx2Q4sU/mqdefault.jpg" },
    { id: 4, title: "Outdoor Exercise Games with Friends", videoId: "4BrS0a5PUFo", duration: "03:30", sim_duration: 210, thumb: "https://img.youtube.com/vi/4BrS0a5PUFo/mqdefault.jpg" },
    { id: 5, title: "Playing Outdoor Sports & Staying Active", videoId: "5e3kVR3wSSM", duration: "02:50", sim_duration: 170, thumb: "https://img.youtube.com/vi/5e3kVR3wSSM/mqdefault.jpg" }
  ],
  bonus_games: [{ title: "Sports Relay Quiz", url: "#", description: "Test your relay knowledge!" }]
};

fs.writeFileSync(path.join(ADV_DIR, 'daily_watch.js'), `export default ${JSON.stringify(dailyWatchData, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'daily_watch.js'), `export default ${JSON.stringify(dailyWatchData, null, 2)};\n`, 'utf8');
console.log('✅ Synchronized daily_watch.js with 5 100% UNUSED educational videos!');


// ============================================================================
// 4. MINDMAP (mindmap.js — 6 stems x 6 branches = 36 branches total)
// ============================================================================

const mindmapDataADV = {
  centerStems: [
    {
      id: "stem_1",
      label_en: "Relay Race & Speed Science",
      label_vi: "Đua Tiếp Sức & Khoa Học Tốc Độ",
      branches: [
        { id: "b1_1", text_en: "ran very fast along red track", text_vi: "chạy rất nhanh trên đường chạy màu đỏ" },
        { id: "b1_2", text_en: "passed the baton cleanly to Maya", text_vi: "truyền gậy tiếp sức gọn gàng cho Maya" },
        { id: "b1_3", text_en: "measured velocity equals distance over time", text_vi: "đo vận tốc bằng quãng đường chia cho thời gian" },
        { id: "b1_4", text: "maintained fast kinetic momentum", text_vi: "duy trì động năng di chuyển nhanh" },
        { id: "b1_5", text_en: "sprinted early before exchange zone", text_vi: "bứt tốc sớm trước vùng giao gậy" },
        { id: "b1_6", text_en: "crossed the finish line first", text_vi: "cán đích đầu tiên" }
      ]
    },
    {
      id: "stem_2",
      label_en: "Ancient Olympic History",
      label_vi: "Lịch Sử Olympic Cổ Đại",
      branches: [
        { id: "b2_1", text_en: "gathered at Olympia in ancient Greece", text_vi: "tập hợp tại Olympia thuộc Hy Lạp cổ đại" },
        { id: "b2_2", text_en: "declared a sacred truce for peace", text_vi: "tuyên bố thỏa thuận ngừng bắn linh thiêng vì hòa bình" },
        { id: "b2_3", text_en: "sat down with leaders to pause conflicts", text_vi: "ngồi xuống với các nhà lãnh đạo để tạm dừng xung đột" },
        { id: "b2_4", text_en: "passed the Olympic torch to honor unity", text_vi: "truyền ngọn đước Olympic để tôn vinh sự đoàn kết" },
        { id: "b2_5", text_en: "traveled safely through rival lands", text_vi: "di chuyển an toàn qua các vùng đất đối đầu" },
        { id: "b2_6", text_en: "honored sportsmanship above war", text_vi: "tôn vinh tinh thần thể thao trên chiến tranh" }
      ]
    },
    {
      id: "stem_3",
      label_en: "Modern Global Olympics",
      label_vi: "Thế Vận Hội Hiện Đại Toàn Cầu",
      branches: [
        { id: "b3_1", text_en: "brings over two hundred nations together", text_vi: "kết nối hơn hai trăm quốc gia" },
        { id: "b3_2", text_en: "went to the sports stadium on Saturday morning", text_vi: "đến sân vận động vào sáng thứ Bảy" },
        { id: "b3_3", text_en: "marched across the stadium in traditional uniforms", text_vi: "diễu hành qua sân vận động trong trang phục truyền thống" },
        { id: "b3_4", text_en: "represented their home nations proudly", text_vi: "đại diện cho quốc gia của họ đầy tự hào" },
        { id: "b3_5", text_en: "shared meals in the Olympic Village", text_vi: "cùng ăn uống tại Làng Olympic" },
        { id: "b3_6", text_en: "were united in peace across borders", text_vi: "đoàn kết trong hòa bình xuyên biên giới" }
      ]
    },
    {
      id: "stem_4",
      label_en: "Kenya High-Altitude Champions",
      label_vi: "Huyền Thoại Kenya Vùng Núi Cao",
      branches: [
        { id: "b4_1", text_en: "known as the Home of Champions in Iten", text_vi: "được biết đến là Quê hương Nhà vô địch ở Iten" },
        { id: "b4_2", text_en: "trained on red dirt paths high in mountains", text_vi: "tập luyện trên đường đất đỏ cao trên núi" },
        { id: "b4_3", text_en: "adapted to thin air with strong lungs", text_vi: "thích nghi với không khí mỏng với lá phổi khỏe" },
        { id: "b4_4", text_en: "ran long distances to school daily", text_vi: "chạy quãng đường dài đến trường hàng ngày" },
        { id: "b4_5", text_en: "won global marathon races around world", text_vi: "giành chiến thắng các giải marathon toàn cầu" },
        { id: "b4_6", text_en: "traveled to Kenya to train together", text_vi: "đến Kenya để cùng nhau tập luyện" }
      ]
    },
    {
      id: "stem_5",
      label_en: "Fair Play & Respect",
      label_vi: "Chơi Đẹp & Sự Tôn Trọng",
      branches: [
        { id: "b5_1", text_en: "shook hands politely with opponents", text_vi: "bắt tay lịch sự với các đối thủ" },
        { id: "b5_2", text_en: "said kind words of encouragement", text_vi: "nói những lời động viên chân thành" },
        { id: "b5_3", text_en: "built strong character through sports", text_vi: "rèn luyện nhân cách tốt qua thể thao" },
        { id: "b5_4", text_en: "helped a fallen runner on the green grass", text_vi: "giúp đỡ một bạn chạy bị ngã trên cỏ" },
        { id: "b5_5", text_en: "stood together happily after ceremony", text_vi: "đứng cùng nhau vui vẻ sau lễ trao giải" },
        { id: 6, text_en: "earned universal respect everywhere", text_vi: "nhận được sự tôn trọng khắp mọi nơi" }
      ]
    },
    {
      id: "stem_6",
      label_en: "Teamwork & Victory Celebrations",
      label_vi: "Tinh Thần Đồng Đội & Lễ Chiến Thắng",
      branches: [
        { id: "b6_1", text_en: "watched and clapped with proud smiles", text_vi: "xem và vỗ tay với nụ cười tự hào" },
        { id: "b6_2", text_en: "saved crucial seconds through speed science", text_vi: "tiết kiệm những giây quý giá nhờ khoa học tốc độ" },
        { id: "b6_3", text_en: "were tired but happy at the finish line", text_vi: "mệt nhưng rất vui ở vạch đích" },
        { id: "b6_4", text_en: "scientific teamwork brought victory", text_vi: "tinh thần đồng đội khoa học mang lại chiến thắng" },
        { id: "b6_5", text_en: "smiled with pride while accepting gold medals", text_vi: "mỉm cười tự hào khi nhận huy chương vàng" },
        { id: "b6_6", text_en: "inspired children everywhere to achieve goals", text_vi: "truyền cảm hứng cho trẻ em khắp nơi đạt mục tiêu" }
      ]
    }
  ]
};

fs.writeFileSync(path.join(ADV_DIR, 'mindmap.js'), `export default ${JSON.stringify(mindmapDataADV, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'mindmap.js'), `export default ${JSON.stringify(mindmapDataADV, null, 2)};\n`, 'utf8');
console.log('✅ Synchronized mindmap.js (36 branches total) for ADV & EASY!');
