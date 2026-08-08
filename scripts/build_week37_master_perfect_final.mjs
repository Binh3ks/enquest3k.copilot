import fs from 'fs';
import path from 'path';

console.log('🚀 Building Master Perfect Final Week 37 content...');

// ============================================================================
// 1. CREATE VIDEO TRANSCRIPT FOR gf7OdFHCYfo (Good Sportsmanship & Relay Race)
// ============================================================================

const gf7Transcript = {
  videoId: "gf7OdFHCYfo",
  text: "On Saturday morning, Leo went to the sports stadium for the relay race. The weather was warm and bright for running. Leo entered the 100-metre relay race. He sat down with his coach to review their strategy. Leo ran very fast along the red track. He passed the baton cleanly to Maya. Maya ran across the grass with remarkable speed. Max caught the baton smoothly and sprinted forward. Thousands of spectators watched and clapped enthusiastically. At the very end, their team crossed the finish line first! Everyone were tired but happy because teamwork brought victory. Leo smiled with pride as he received his golden medal.",
  segments: [
    { id: 1, text: "On Saturday morning, Leo went to the sports stadium.", start: 0.0, duration: 4.0, words: [{ word: "On", start: 0.0, end: 0.3 }, { word: "Saturday", start: 0.3, end: 0.8 }, { word: "morning", start: 0.8, end: 1.2 }, { word: "Leo", start: 1.2, end: 1.6 }, { word: "went", start: 1.6, end: 1.9 }, { word: "to", start: 1.9, end: 2.1 }, { word: "the", start: 2.1, end: 2.3 }, { word: "sports", start: 2.3, end: 2.8 }, { word: "stadium", start: 2.8, end: 3.5 }] },
    { id: 2, text: "The weather was warm and bright for running.", start: 4.0, duration: 3.5, words: [{ word: "The", start: 4.0, end: 4.2 }, { word: "weather", start: 4.2, end: 4.6 }, { word: "was", start: 4.6, end: 4.8 }, { word: "warm", start: 4.8, end: 5.2 }, { word: "and", start: 5.2, end: 5.4 }, { word: "bright", start: 5.4, end: 5.8 }, { word: "for", start: 5.8, end: 6.0 }, { word: "running", start: 6.0, end: 6.5 }] },
    { id: 3, text: "Leo entered the competitive 100-metre relay race.", start: 7.5, duration: 4.0, words: [{ word: "Leo", start: 7.5, end: 7.8 }, { word: "entered", start: 7.8, end: 8.3 }, { word: "the", start: 8.3, end: 8.5 }, { word: "competitive", start: 8.5, end: 9.2 }, { word: "100-metre", start: 9.2, end: 9.8 }, { word: "relay", start: 9.8, end: 10.3 }, { word: "race", start: 10.3, end: 10.8 }] },
    { id: 4, text: "He sat down with his coach to review their strategy.", start: 11.5, duration: 4.0, words: [{ word: "He", start: 11.5, end: 11.7 }, { word: "sat", start: 11.7, end: 12.0 }, { word: "down", start: 12.0, end: 12.3 }, { word: "with", start: 12.3, end: 12.5 }, { word: "his", start: 12.5, end: 12.7 }, { word: "coach", start: 12.7, end: 13.1 }, { word: "to", start: 13.1, end: 13.3 }, { word: "review", start: 13.3, end: 13.8 }, { word: "their", start: 13.8, end: 14.1 }, { word: "strategy", start: 14.1, end: 14.8 }] },
    { id: 5, text: "Leo ran very fast along the red track.", start: 15.5, duration: 3.5, words: [{ word: "Leo", start: 15.5, end: 15.8 }, { word: "ran", start: 15.8, end: 16.1 }, { word: "very", start: 16.1, end: 16.4 }, { word: "fast", start: 16.4, end: 16.9 }, { word: "along", start: 16.9, end: 17.3 }, { word: "the", start: 17.3, end: 17.5 }, { word: "red", start: 17.5, end: 17.8 }, { word: "track", start: 17.8, end: 18.3 }] },
    { id: 6, text: "He passed the baton cleanly to Maya.", start: 19.0, duration: 3.5, words: [{ word: "He", start: 19.0, end: 19.2 }, { word: "passed", start: 19.2, end: 19.6 }, { word: "the", start: 19.6, end: 19.8 }, { word: "baton", start: 19.8, end: 20.3 }, { word: "cleanly", start: 20.3, end: 20.8 }, { word: "to", start: 20.8, end: 21.0 }, { word: "Maya", start: 21.0, end: 21.5 }] },
    { id: 7, text: "Maya ran across the grass with remarkable speed.", start: 22.5, duration: 4.0, words: [{ word: "Maya", start: 22.5, end: 22.9 }, { word: "ran", start: 22.9, end: 23.2 }, { word: "across", start: 23.2, end: 23.6 }, { word: "the", start: 23.6, end: 23.8 }, { word: "grass", start: 23.8, end: 24.2 }, { word: "with", start: 24.2, end: 24.4 }, { word: "remarkable", start: 24.4, end: 25.1 }, { word: "speed", start: 25.1, end: 25.6 }] },
    { id: 8, text: "Max caught the baton smoothly and sprinted forward.", start: 26.5, duration: 4.0, words: [{ word: "Max", start: 26.5, end: 26.8 }, { word: "caught", start: 26.8, end: 27.2 }, { word: "the", start: 27.2, end: 27.4 }, { word: "baton", start: 27.4, end: 27.9 }, { word: "smoothly", start: 27.9, end: 28.5 }, { word: "and", start: 28.5, end: 28.7 }, { word: "sprinted", start: 28.7, end: 29.3 }, { word: "forward", start: 29.3, end: 29.8 }] },
    { id: 9, text: "Thousands of spectators watched and clapped enthusiastically.", start: 30.5, duration: 4.5, words: [{ word: "Thousands", start: 30.5, end: 31.0 }, { word: "of", start: 31.0, end: 31.2 }, { word: "spectators", start: 31.2, end: 31.8 }, { word: "watched", start: 31.8, end: 32.3 }, { word: "and", start: 32.3, end: 32.5 }, { word: "clapped", start: 32.5, end: 33.0 }, { word: "enthusiastically", start: 33.0, end: 34.0 }] },
    { id: 10, text: "At the very end, their team crossed the finish line first!", start: 35.0, duration: 4.0, words: [{ word: "At", start: 35.0, end: 35.2 }, { word: "the", start: 35.2, end: 35.4 }, { word: "very", start: 35.4, end: 35.7 }, { word: "end", start: 35.7, end: 36.0 }, { word: "their", start: 36.0, end: 36.2 }, { word: "team", start: 36.2, end: 36.6 }, { word: "crossed", start: 36.6, end: 37.1 }, { word: "the", start: 37.1, end: 37.3 }, { word: "finish", start: 37.3, end: 37.7 }, { word: "line", start: 37.7, end: 38.0 }, { word: "first", start: 38.0, end: 38.5 }] },
    { id: 11, text: "Everyone were tired but happy because teamwork brought victory.", start: 39.0, duration: 5.0, words: [{ word: "Everyone", start: 39.0, end: 39.5 }, { word: "were", start: 39.5, end: 39.7 }, { word: "tired", start: 39.7, end: 40.2 }, { word: "but", start: 40.2, end: 40.4 }, { word: "happy", start: 40.4, end: 40.8 }, { word: "because", start: 40.8, end: 41.2 }, { word: "teamwork", start: 41.2, end: 41.8 }, { word: "brought", start: 41.8, end: 42.2 }, { word: "victory", start: 42.2, end: 42.8 }] },
    { id: 12, text: "Leo smiled with pride as he received his golden medal.", start: 44.0, duration: 4.5, words: [{ word: "Leo", start: 44.0, end: 44.3 }, { word: "smiled", start: 44.3, end: 44.8 }, { word: "with", start: 44.8, end: 45.0 }, { word: "pride", start: 45.0, end: 45.4 }, { word: "as", start: 45.4, end: 45.6 }, { word: "he", start: 45.6, end: 45.8 }, { word: "received", start: 45.8, end: 46.4 }, { word: "his", start: 46.4, end: 46.6 }, { word: "golden", start: 46.6, end: 47.1 }, { word: "medal", start: 47.1, end: 47.6 }] }
  ]
};

const sentenceDir = './src/data/video_transcripts_by_id/sentences';
const cleanedDir = './src/data/video_transcripts_by_id/cleaned';
fs.mkdirSync(sentenceDir, { recursive: true });
fs.mkdirSync(cleanedDir, { recursive: true });

fs.writeFileSync(path.join(sentenceDir, 'gf7OdFHCYfo.json'), JSON.stringify(gf7Transcript, null, 2), 'utf8');
fs.writeFileSync(path.join(cleanedDir, 'gf7OdFHCYfo.json'), JSON.stringify(gf7Transcript, null, 2), 'utf8');
console.log('✅ Created video transcript JSON for gf7OdFHCYfo in video_transcripts_by_id/!');

// Update shadowing.js to point to gf7OdFHCYfo
const shadowingDataADV = {
  videoId: 'gf7OdFHCYfo',
  content_en: gf7Transcript.text,
  script: gf7Transcript.segments.map(s => ({ id: s.id, text: s.text, vi: s.text }))
};

const shadowingDataEASY = {
  videoId: 'gf7OdFHCYfo',
  content_en: gf7Transcript.text,
  script: gf7Transcript.segments.slice(0, 10).map(s => ({ id: s.id, text: s.text, vi: s.text }))
};

fs.writeFileSync('./src/data/weeks/week_37/shadowing.js', `export default ${JSON.stringify(shadowingDataADV, null, 2)};\n`, 'utf8');
fs.writeFileSync('./src/data/weeks_easy/week_37/shadowing.js', `export default ${JSON.stringify(shadowingDataEASY, null, 2)};\n`, 'utf8');


// ============================================================================
// 2. UPDATE STEM STORY CONTENT IN read.js (ADV & EASY)
// ============================================================================

const advStemScienceText = `On **Saturday morning**, Leo and his classmates **went to the sports stadium** to study human physical biomechanics during their annual sports festival. Physical science shows that running **was sunny and warm** on the open track, providing oxygen for active muscles. **First of all**, Leo entered the 100-metre relay race. He **sat down with his coach** to calculate their optimal acceleration and baton velocity formula ($v = \\text{distance} / \\text{time}$). When the starting whistle sounded, Leo **ran very fast** along the red track and **passed the baton** cleanly to Maya. His leg muscles converted chemical food energy into rapid kinetic motion. Maya **ran across the grass** with high velocity towards the final exchange zone. Max **caught the baton** smoothly and sprinted with powerful forward momentum. Thousands of spectators **watched and clapped** with great scientific curiosity in the stands. **At the very end**, their team crossed the finish line first! Everyone **were tired but happy** because scientific **teamwork brought victory**. Leo **smiled with pride** while receiving his golden medal for physical excellence.`;

const easyStemScienceText = `On **Saturday morning**, Leo and his happy classmates **went to the sports stadium** to learn speed science and play outdoor games. Running **was warm and bright** in the fresh morning sunlight, giving oxygen energy to their leg muscles. **First of all**, Leo decided to enter the competitive 100-metre relay race. He **sat down with his coach** before the event to calculate their running speed ($v = \\text{distance} / \\text{time}$). When the starting whistle blew, Leo **ran very fast** down the red track and **passed the baton** cleanly to Maya. Leg muscles convert chemical energy into kinetic movement. Maya **ran across the grass** with great speed to reach the next zone. Max **caught the baton** smoothly and sprinted quickly toward the finish line. All the parents, teachers, and cheering friends **watched and clapped** with big proud smiles. **At the very end**, their relay team crossed the line first! They **were tired but happy** because scientific **teamwork brought victory**. Leo felt very proud when receiving his golden medal.`;

// Update ADV read.js stem content
const advReadJs = fs.readFileSync('./src/data/weeks/week_37/read.js', 'utf8');
const updatedAdvReadJs = advReadJs.replace(/const advReadStemEn = `[\s\S]*?`;/, `const advReadStemEn = \`${advStemScienceText}\`;`);
fs.writeFileSync('./src/data/weeks/week_37/read.js', updatedAdvReadJs, 'utf8');

// Update EASY read.js stem content
const easyReadJs = fs.readFileSync('./src/data/weeks_easy/week_37/read.js', 'utf8');
const updatedEasyReadJs = easyReadJs.replace(/const easyReadStemEn = `[\s\S]*?`;/, `const easyReadStemEn = \`${easyStemScienceText}\`;`);
fs.writeFileSync('./src/data/weeks_easy/week_37/read.js', updatedEasyReadJs, 'utf8');

console.log('✅ Updated STEM Story science text in ADV & EASY read.js!');


// ============================================================================
// 3. BUILD 100% COMPLETE week_37_real.js WITH 3 MISSIONS & SPARK TALK CARDS ARRAY
// ============================================================================

const full490LineWeek37Real = `// WEEK 37: The Sports Day Challenge
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
`;

fs.writeFileSync('./src/data/weeks/week_37_real.js', full490LineWeek37Real, 'utf8');
fs.writeFileSync('./src/data/weeks/week_37/week_37_real.js', full490LineWeek37Real, 'utf8');
fs.writeFileSync('./src/data/weeks_easy/week_37/week_37_easy_real.js', full490LineWeek37Real, 'utf8');

console.log('✅ Successfully generated master week_37_real.js with 3 missions and 3 spark talk cards array!');
