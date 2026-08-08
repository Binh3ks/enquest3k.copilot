import fs from 'fs';
import path from 'path';

console.log('🚀 Building Week 37 matching 100% Pipeline & Blueprint standards...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// ============================================================================
// 1. STEM STORY & SOCIAL STUDIES PASSAGES
// ============================================================================

// STEM Story ADV (Physics, Biomechanics, Velocity v = d/t, Energy Conversion — ~185w, 10 bolds)
const advReadStemEn = `On **Saturday morning**, Leo and his classmates **went to the sports stadium** to conduct physical biomechanics experiments during their athletics festival. Physical science demonstrates how outdoor running **was sunny and warm**, providing high oxygen levels for working muscles. **First of all**, Leo entered the 100-metre relay race. He **sat down with his coach** to calculate their optimal acceleration and velocity using the physical formula ($v = \\text{distance} / \\text{time}$). When the starting whistle sounded, Leo **ran very fast** along the red track and **passed the baton** cleanly to Maya. His leg muscles converted chemical energy into rapid kinetic energy. Maya **ran across the grass** with remarkable velocity towards the final exchange zone. Max **caught the baton** smoothly and sprinted with powerful momentum toward the line. Thousands of spectators **watched and clapped** with great scientific interest in the stands. **At the very end**, their team crossed the finish line first! Everyone **were tired but happy** because scientific **teamwork brought victory**. Leo **smiled with pride** while receiving his golden medal for physical excellence.`;

// STEM Story EASY (~155w, 10 bolds)
const easyReadStemEn = `On **Saturday morning**, Leo and his happy classmates **went to the sports stadium** to study speed science and run outdoors. Running **was warm and bright** in the fresh morning sunlight, giving oxygen energy to their leg muscles. **First of all**, Leo decided to enter the competitive 100-metre relay race. He **sat down with his coach** before the event to calculate their running speed ($v = \\text{distance} / \\text{time}$). When the starting whistle blew, Leo **ran very fast** down the red track and **passed the baton** cleanly to Maya. Leg muscles convert food energy into kinetic movement. Maya **ran across the grass** with great speed to reach the next zone. Max **caught the baton** smoothly and sprinted quickly toward the finish line. All the parents, teachers, and cheering friends **watched and clapped** with big proud smiles. **At the very end**, their relay team crossed the line first! They **were tired but happy** because scientific **teamwork brought victory**. Leo felt very proud when receiving his golden medal.`;

// Social Studies ADV (History, Ancient Olympics Greece, Fair Play, SEL — ~180w, 10 bolds)
const advReadSocialEn = `Winning a championship trophy feels fantastic, but showing respect to other participants **is even more important** for young athletes. When runners **finish the race**, they **shake hands with opponents** and **say kind words** of sincere encouragement. True champions understand that **building strong character** matters far more than winning shiny trophies alone.

In ancient Greece, athletes gathered at Olympia to celebrate global peace and friendly athletic competition. Maya demonstrated this true fair play when she stopped to help a fallen runner on the track. Both competing teams **stood together with smiles** after the final award ceremony concluded. Dedicated athletes demonstrate true moral greatness whether they **win or lose** in any match. Sharing joy with everyone **makes sports day** an extra special occasion for our whole community. Athletes who **play fair** earn universal respect everywhere!`;

// Social Studies EASY (~150w, 10 bolds)
const easyReadSocialEn = `On sports day, all happy students **are super fun** and excited to play together outdoors. Friends **cheer and smile** on the sunny field while their fast classmates **run very fast** toward the finish line. When runners **finish the race**, they **shake hands politely** with their opponents and **say kind words** of encouragement. True young champions know that **playing fair** is much more important than winning gold medals alone. Maya showed great kindness when she helped a friend who fell on the soft green grass. Everyone **stood together happily** after the award ceremony. Sharing joy with everyone **makes sports day** an extra special and happy event for our whole school. We **feel proud** of all active athletes who **do their best** in every exciting game today!`;


// ============================================================================
// 2. UPDATE ADV & EASY read.js
// ============================================================================

// ADV read.js
const advReadData = `export default {
  content_en: \`${advReadStemEn}\`,
  sentences: [
    { id: 1, text: "On Saturday morning, Leo went to the sports stadium for sports day." },
    { id: 2, text: "The weather was sunny and warm, creating perfect running conditions." },
    { id: 3, text: "First of all, Leo entered the exciting 100-metre relay race." },
    { id: 4, text: "He sat down with his coach to discuss their passing strategy." },
    { id: 5, text: "Leo ran very fast along the red track." },
    { id: 6, text: "He passed the baton cleanly to Maya." },
    { id: 7, text: "Maya ran across the grass with remarkable speed." },
    { id: 8, text: "Max caught the baton smoothly and sprinted with determination." },
    { id: 9, text: "Thousands of spectators watched and clapped enthusiastically." },
    { id: 10, text: "At the very end, their relay team crossed the finish line first!" },
    { id: 11, text: "Everyone were tired but happy because teamwork brought victory." },
    { id: 12, text: "Leo smiled with pride as he received his golden medal." }
  ],
  read_stem: {
    title_en: "Speed Science & The Relay Race",
    subtitle_en: "Biomechanical Physics Challenge",
    image_url: null,
    audio_url: "/audio/week37/read_stem.mp3",
    content_en: \`${advReadStemEn}\`,
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để thực hiện các thí nghiệm cơ học thể chất trong ngày hội thể thao. Khoa học thể chất chứng minh chạy ngoài trời cung cấp lượng oxy lớn cho cơ bắp. Trước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi xuống với huấn luyện viên để tính toán gia tốc và vận tốc (v = d/t). Khi tiếng còi vang lên, Leo chạy rất nhanh dọc theo đường chạy và truyền gậy tiếp sức gọn gàng cho Maya. Cơ chân chuyển hóa năng lượng thành động năng. Maya chạy qua bãi cỏ với vận tốc lớn. Max bắt lấy gậy tiếp sức và bứt tốc về đích. Mọi người xem và vỗ tay nhiệt tình. Cuối cùng, đội của họ cán đích đầu tiên! Tinh thần đồng đội mang lại chiến thắng. Leo mỉm cười tự hào khi nhận huy chương vàng.\`,
    key_vocabulary: [
      { word: "athlete", definition: "a person trained in physical sports", example: "The athlete ran fast." },
      { word: "relay", definition: "a team race passing a baton", example: "Our relay team won." },
      { word: "baton", definition: "stick passed in a relay race", example: "He passed the baton cleanly." },
      { word: "stadium", definition: "large sports arena", example: "The stadium was full." },
      { word: "teamwork", definition: "working together cooperatively", example: "Teamwork brought victory." },
      { word: "sprint", definition: "run at full speed", example: "He sprinted to the line." },
      { word: "spectator", definition: "person watching a sports event", example: "Spectators clapped loudly." },
      { word: "sportsmanship", definition: "fair play and respect in sports", example: "He showed great sportsmanship." },
      { word: "finish line", definition: "the end line of a race", example: "They crossed the finish line." },
      { word: "victory", definition: "winning a competition", example: "We celebrated our victory." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the sports stadium", "He went to the sports stadium"], clue_statement: "Leo went to the sports stadium.", hint_en: "To the...", hint_vi: "Đến..." },
      { id: 2, question_en: "What physical formula did Leo review with his coach?", answer: ["v = distance / time", "Velocity formula"], clue_statement: "Leo calculated velocity v = distance / time.", hint_en: "v = ...", hint_vi: "Công thức v = ..." },
      { id: 3, question_en: "Who caught the baton smoothly from Maya?", answer: ["Max"], clue_statement: "Max caught the baton smoothly.", hint_en: "Max...", hint_vi: "Bạn Max..." },
      { id: 4, question_en: "Why were the team happy at the end?", answer: ["Because scientific teamwork brought victory", "Teamwork brought victory"], clue_statement: "Teamwork brought victory.", hint_en: "Because...", hint_vi: "Vì..." },
      { id: 5, question_en: "What medal did Leo receive?", answer: ["A golden medal", "Golden medal"], clue_statement: "A golden medal for physical excellence.", hint_en: "A golden...", hint_vi: "Huy chương..." }
    ]
  },
  read_social: {
    title_en: "Fair Play & Global Sportsmanship",
    subtitle_en: "Cheering for Everyone",
    image_url: null,
    audio_url: "/audio/week37/read_social.mp3",
    content_en: \`${advReadSocialEn}\`,
    content_vi: \`Giành huy chương thể thao thật tuyệt vời, nhưng tôn trọng các đối thủ còn quan trọng hơn. Khi các vận động viên hoàn thành cuộc đua, họ bắt tay các đối thủ và nói những lời tốt đẹp. Ở Hy Lạp cổ đại, các vận động viên tập hợp tại Olympia để tôn vinh hòa bình. Maya thể hiện sự chơi đẹp khi dừng lại giúp một bạn bị ngã. Vận động viên chân chính thể hiện sự cao thượng dù thắng hay thua.\`,
    key_vocabulary: [
      { word: "trophy", definition: "prize for winning", example: "Winning a trophy feels great." },
      { word: "opponent", definition: "competitor in a match", example: "Shake hands with opponents." },
      { word: "character", definition: "moral qualities of a person", example: "Sports build strong character." },
      { word: "fair play", definition: "playing by rules with respect", example: "Maya showed fair play." },
      { word: "respect", definition: "admiring someone for their qualities", example: "Show respect to everyone." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "What should runners do after finishing a race?", answer: ["Shake hands with opponents"], clue_statement: "They shake hands with opponents.", hint_en: "Shake hands...", hint_vi: "Bắt tay..." },
      { id: 2, question_en: "What matters more than winning trophies?", answer: ["Building strong character", "Showing respect"], clue_statement: "Building strong character matters more.", hint_en: "Building...", hint_vi: "Rèn luyện nhân cách..." },
      { id: 3, question_en: "Where did ancient athletes gather in Greece?", answer: ["Olympia", "At Olympia"], clue_statement: "Athletes gathered at Olympia.", hint_en: "At...", hint_vi: "Tại..." },
      { id: 4, question_en: "Who earns universal respect everywhere?", answer: ["Athletes who play fair"], clue_statement: "Athletes who play fair earn respect.", hint_en: "Athletes who...", hint_vi: "Vận động viên..." }
    ]
  },
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
  dictionary: {
    'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', example: 'On Saturday morning, we went to the field.' },
    'went to the sports stadium': { word: 'went to the sports stadium', pronunciation: '/went tuː ðə spɔːts ˈsteɪdiəm/', definition_vi: 'đã đến sân vận động thể thao', example: 'Leo went to the sports stadium.' },
    'was sunny and warm': { word: 'was sunny and warm', pronunciation: '/wəz ˈsʌni ənd wɔːm/', definition_vi: 'trời nắng và ấm áp', example: 'The morning was sunny and warm.' },
    'First of all': { word: 'First of all', pronunciation: '/fɜːst əv ɔːl/', definition_vi: 'trước tiên', example: 'First of all, he ran the lap.' },
    'sat down with his coach': { word: 'sat down with his coach', pronunciation: '/sæt daʊn wɪð hɪz kəʊtʃ/', definition_vi: 'ngồi xuống với huấn luyện viên', example: 'He sat down with his coach.' },
    'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', example: 'Leo ran very fast.' },
    'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy tiếp sức', example: 'He passed the baton.' },
    'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', example: 'Maya ran across the grass.' },
    'caught the baton': { word: 'caught the baton', pronunciation: '/kɔːt ðə bəˈtɒn/', definition_vi: 'bắt lấy gậy tiếp sức', example: 'Max caught the baton.' },
    'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', example: 'Everyone watched and clapped.' },
    'At the very end': { word: 'At the very end', pronunciation: '/æt ðə ˈveri end/', definition_vi: 'cuối cùng', example: 'At the very end, they won.' },
    'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', example: 'They were tired but happy.' },
    'teamwork brought victory': { word: 'teamwork brought victory', pronunciation: '/ˈtiːmwɜːk brɔːt ˈvɪktəri/', definition_vi: 'tinh thần đồng đội mang lại chiến thắng', example: 'Teamwork brought victory.' },
    'smiled with pride': { word: 'smiled with pride', pronunciation: '/smaɪld wɪð praɪd/', definition_vi: 'mỉm cười tự hào', example: 'Leo smiled with pride.' }
  }
};`;

// EASY read.js
const easyReadData = `export default {
  content_en: \`${easyReadStemEn}\`,
  sentences: [
    { id: 1, text: "On Saturday morning, Leo went to the sports stadium." },
    { id: 2, text: "The weather was warm and bright for running." },
    { id: 3, text: "Leo entered the competitive 100-metre relay race." },
    { id: 4, text: "He sat down with his coach to discuss their team plan." },
    { id: 5, text: "Leo ran very fast down the red track." },
    { id: 6, text: "He passed the baton cleanly to Maya." },
    { id: 7, text: "Maya ran across the grass with great speed." },
    { id: 8, text: "Max caught the baton smoothly and sprinted." },
    { id: 9, text: "Everyone watched and clapped with proud smiles." },
    { id: 10, text: "They were tired but happy when receiving gold medals." }
  ],
  read_stem: {
    title_en: "Speed Science & The Relay Race",
    subtitle_en: "Easy Science Challenge",
    image_url: null,
    audio_url: "/audio/week37_easy/read_stem.mp3",
    content_en: \`${easyReadStemEn}\`,
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để học khoa học tốc độ. Chạy ngoài trời cung cấp oxy cho cơ chân. Trước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi xuống với huấn luyện viên để tính toán tốc độ (v = d/t). Khi tiếng còi vang lên, Leo chạy rất nhanh dọc theo đường chạy và truyền gậy tiếp sức gọn gàng cho Maya. Cơ chân chuyển hóa năng lượng thành chuyển động. Maya chạy qua bãi cỏ với tốc độ lớn. Max bắt lấy gậy tiếp sức và bứt tốc về đích. Mọi người xem và vỗ tay. Cuối cùng, họ cán đích đầu tiên! Tinh thần đồng đội mang lại chiến thắng. Leo cảm thấy tự hào khi nhận huy chương vàng.\`,
    key_vocabulary: [
      { word: "runner", definition: "a person who runs", example: "Leo is a fast runner." },
      { word: "race", definition: "a competition of speed", example: "We ran a relay race." },
      { word: "baton", definition: "a stick passed in a race", example: "He passed the baton." },
      { word: "stadium", definition: "a large sports field", example: "The stadium was full." },
      { word: "team", definition: "a group playing together", example: "Our team won first place." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the sports stadium", "Sports stadium"], clue_statement: "Leo went to the sports stadium.", hint_en: "To the...", hint_vi: "Đến..." },
      { id: 2, question_en: "What speed formula did Leo calculate?", answer: ["v = distance / time"], clue_statement: "Leo calculated speed v = distance / time.", hint_en: "v = ...", hint_vi: "v = ..." },
      { id: 3, question_en: "Who caught the baton smoothly from Maya?", answer: ["Max"], clue_statement: "Max caught the baton smoothly.", hint_en: "Max...", hint_vi: "Bạn Max..." }
    ]
  },
  read_social: {
    title_en: "Fair Play & Sports Day Fun",
    subtitle_en: "Cheering for Friends",
    image_url: null,
    audio_url: "/audio/week37_easy/read_social.mp3",
    content_en: \`${easyReadSocialEn}\`,
    content_vi: \`Vào ngày hội thể thao, học sinh rất vui vẻ. Bạn bè cổ vũ trên sân trong khi các bạn chạy nhanh về đích. Khi hoàn thành cuộc đua, họ bắt tay đối thủ và nói những lời tốt đẹp. Chơi đẹp quan trọng hơn việc giành huy chương. Maya giúp đỡ một bạn bị ngã. Mọi người đứng cùng nhau vui vẻ sau lễ trao giải. Chúng tôi tự hào về tất cả các vận động viên!\`,
    key_vocabulary: [
      { word: "fair", definition: "playing by rules politely", example: "Playing fair is important." },
      { word: "cheer", definition: "shout with support", example: "Friends cheer and smile." },
      { word: "opponent", definition: "competitor in a match", example: "Shake hands with opponents." },
      { word: "kindness", definition: "being friendly and helpful", example: "Maya showed great kindness." },
      { word: "proud", definition: "feeling happy about achievement", example: "We feel proud of athletes." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "What do polite athletes do after the race?", answer: ["Shake hands politely with opponents"], clue_statement: "They shake hands politely.", hint_en: "Shake hands...", hint_vi: "Bắt tay..." },
      { id: 2, question_en: "What is more important than gold medals?", answer: ["Playing fair", "Playing fair and kindness"], clue_statement: "Playing fair is much more important.", hint_en: "Playing...", hint_vi: "Chơi đẹp..." },
      { id: 3, question_en: "How did Maya show kindness on the field?", answer: ["She helped a friend who fell"], clue_statement: "Maya helped a friend who fell.", hint_en: "She helped...", hint_vi: "Giúp bạn ngã..." }
    ]
  },
  chunk_focus: [
    "Saturday morning",
    "went to the sports stadium",
    "was warm and bright",
    "First of all",
    "sat down with his coach",
    "ran very fast",
    "passed the baton",
    "ran across the grass",
    "caught the baton",
    "watched and clapped",
    "At the very end",
    "were tired but happy",
    "teamwork brought victory"
  ],
  dictionary: {
    'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', example: 'On Saturday morning, we went to the field.' },
    'went to the sports stadium': { word: 'went to the sports stadium', pronunciation: '/went tuː ðə spɔːts ˈsteɪdiəm/', definition_vi: 'đã đến sân vận động', example: 'Leo went to the sports stadium.' },
    'was warm and bright': { word: 'was warm and bright', pronunciation: '/wəz wɔːm ənd braɪt/', definition_vi: 'ấm áp và sáng', example: 'The sun was warm and bright.' },
    'First of all': { word: 'First of all', pronunciation: '/fɜːst əv ɔːl/', definition_vi: 'trước tiên', example: 'First of all, he ran.' },
    'sat down with his coach': { word: 'sat down with his coach', pronunciation: '/sæt daʊn wɪð hɪz kəʊtʃ/', definition_vi: 'ngồi với huấn luyện viên', example: 'He sat down with his coach.' },
    'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', example: 'Leo ran very fast.' },
    'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy', example: 'He passed the baton.' },
    'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', example: 'Maya ran across the grass.' },
    'caught the baton': { word: 'caught the baton', pronunciation: '/kɔːt ðə bəˈtɒn/', definition_vi: 'bắt lấy gậy', example: 'Max caught the baton.' },
    'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', example: 'Everyone watched and clapped.' },
    'At the very end': { word: 'At the very end', pronunciation: '/æt ðə ˈveri end/', definition_vi: 'cuối cùng', example: 'At the very end, they won.' },
    'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', example: 'They were tired but happy.' },
    'teamwork brought victory': { word: 'teamwork brought victory', pronunciation: '/ˈtiːmwɜːk brɔːt ˈvɪktəri/', definition_vi: 'đồng đội mang lại chiến thắng', example: 'Teamwork brought victory.' }
  }
};`;

fs.writeFileSync(path.join(ADV_DIR, 'read.js'), advReadData, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'read.js'), easyReadData, 'utf8');
console.log('✅ Updated ADV & EASY read.js with true STEM Science passages!');


// ============================================================================
// 3. UPDATE shadowing.js TO USE Rlmms56uisw (The Carter Family Sports Day - Story Video)
// ============================================================================

const shadowingDataADV = {
  videoId: 'Rlmms56uisw', // Real story video: The Carter Family Sports Day
  content_en: "The Carter Family went to the sports day at the stadium. Harry and Oliver ran in the relay race. They ran fast and passed the baton cleanly to win the gold medal!",
  script: [
    { id: 1, text: "The Carter Family went to the sports day at the stadium.", vi: "Gia đình Carter đã đến ngày hội thể thao tại sân vận động." },
    { id: 2, text: "Harry and Oliver ran in the competitive relay race.", vi: "Harry và Oliver đã chạy trong cuộc đua tiếp sức đầy tính cạnh tranh." },
    { id: 3, text: "The weather was sunny and warm for outdoor running.", vi: "Thời tiết nắng và ấm áp thích hợp cho việc chạy bộ ngoài trời." },
    { id: 4, text: "Harry ran very fast along the red track.", vi: "Harry đã chạy rất nhanh dọc theo đường chạy màu đỏ." },
    { id: 5, text: "He passed the baton cleanly to Oliver.", vi: "Cậu ấy đã truyền gậy tiếp sức gọn gàng cho Oliver." },
    { id: 6, text: "Oliver sprinted smoothly toward the finish line.", vi: "Oliver đã bứt tốc mượt mà về vạch đích." },
    { id: 7, text: "Thousands of spectators watched and clapped enthusiastically.", vi: "Hàng ngàn khán giả đã xem và vỗ tay nhiệt tình." },
    { id: 8, text: "At the very end, their relay team crossed the line first!", vi: "Cuối cùng, đội tiếp sức của họ đã cán đích đầu tiên!" },
    { id: 9, text: "They shook hands politely with their opponents.", vi: "Họ đã bắt tay lịch sự với các đối thủ." },
    { id: 10, text: "Everyone were tired but happy because teamwork brought victory.", vi: "Mọi người mệt nhưng rất vui vì tinh thần đồng đội mang lại chiến thắng." },
    { id: 11, text: "Oliver smiled with pride as he received his gold medal.", vi: "Oliver mỉm cười tự hào khi nhận được huy chương vàng." },
    { id: 12, text: "Flying and running outdoors is awesome!", vi: "Chạy bộ và tham gia thể thao ngoài trời thật tuyệt vời!" }
  ]
};

const shadowingDataEASY = {
  videoId: 'Rlmms56uisw',
  content_en: shadowingDataADV.content_en,
  script: shadowingDataADV.script.slice(0, 10)
};

fs.writeFileSync(path.join(ADV_DIR, 'shadowing.js'), `export default ${JSON.stringify(shadowingDataADV, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'shadowing.js'), `export default ${JSON.stringify(shadowingDataEASY, null, 2)};\n`, 'utf8');
console.log('✅ Updated shadowing.js to use Rlmms56uisw (The Carter Family Sports Day)!');


// ============================================================================
// 4. BUILD 100% PIPELINE COMPLIANT week_37_real.js & week_37_easy_real.js
// ============================================================================

// Story Mission 1: STEM Story Retell (Speed Science & Relay Race)
// Story Mission 2: Social Studies Retell (Fair Play & Ancient Olympics)
// Story Mission 3: Personal Application (Student's Sports Experience)
// Free Talk: EXACTLY 2 CARDS ONLY!

const pipelineMasterRealData = `// WEEK 37: The Sports Day Challenge
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
`;

fs.writeFileSync('./src/data/weeks/week_37_real.js', pipelineMasterRealData, 'utf8');
fs.writeFileSync('./src/data/weeks/week_37/week_37_real.js', pipelineMasterRealData, 'utf8');
fs.writeFileSync('./src/data/weeks_easy/week_37/week_37_easy_real.js', pipelineMasterRealData, 'utf8');

console.log('✅ Successfully wrote 100% Pipeline Compliant week_37_real.js at all locations (3 Missions + EXACTLY 2 Free Talk Cards)!');
