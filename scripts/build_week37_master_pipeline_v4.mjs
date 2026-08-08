import fs from 'fs';
import path from 'path';

console.log('🚀 Building Week 37 Master Pipeline V4 (Conversational Video aqMpREQdnCY + Super Simple Easy STEM 148w)...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// ============================================================================
// 1. STEM STORY & SOCIAL STUDIES PASSAGES
// ============================================================================

// STEM Story ADV (~180w, 10 bolds) — Higher physical biomechanics & velocity formula
const advReadStemEn = `On **Saturday morning**, Leo and his classmates **went to the sports stadium** to conduct physical biomechanics experiments during their athletics festival. Physical science demonstrates how outdoor running **was sunny and warm**, providing high oxygen levels for working muscles. **First of all**, Leo entered the 100-metre relay race. He **sat down with his coach** to calculate their optimal acceleration and velocity formula (velocity = distance / time). When the starting whistle sounded, Leo **ran very fast** along the red track and **passed the baton** cleanly to Maya. His leg muscles converted chemical energy into rapid kinetic energy. Maya **ran across the grass** with remarkable velocity towards the final exchange zone. Max **caught the baton** smoothly and sprinted with powerful momentum toward the line. Thousands of spectators **watched and clapped** with great scientific interest in the stands. **At the very end**, their team crossed the finish line first! Everyone **were tired but happy** because scientific **teamwork brought victory**. Leo **smiled with pride** while receiving his golden medal for physical excellence.`;

// STEM Story EASY (148w, 10 bolds) — SUPER SIMPLE for younger/slower learners
const easyReadStemEn = `On **Saturday morning**, Leo and his happy friends **went to the sports stadium** to play outdoor games and run fast. Running **was warm and bright** in the fresh morning sun. Fresh air gave good oxygen energy to their leg muscles. **First of all**, Leo entered the competitive 100-metre relay race. He **sat down with his coach** before the event to talk about speed. Speed is distance divided by time. When the whistle blew, Leo **ran very fast** down the red track and **passed the baton** cleanly to Maya. Leg muscles make runners move quickly. Maya **ran across the grass** to reach the next zone. Max **caught the baton** smoothly and sprinted fast to the finish line. All cheering friends **watched and clapped** with big proud smiles. **At the very end**, their team crossed the line first! They **were tired but happy** because **teamwork brought victory**. Leo **smiled with pride** with his gold medal.`;

// Social Studies ADV (~180w, 10 bolds)
const advReadSocialEn = `Winning a championship trophy feels fantastic, but showing respect to other participants **is even more important** for young athletes. When runners **finish the race**, they **shake hands with opponents** and **say kind words** of sincere encouragement. True champions understand that **building strong character** matters far more than winning shiny trophies alone.

In ancient Greece, athletes gathered at Olympia to celebrate global peace and friendly athletic competition. Maya demonstrated this true fair play when she stopped to help a fallen runner on the track. Both competing teams **stood together with smiles** after the final award ceremony concluded. Dedicated athletes demonstrate true moral greatness whether they **win or lose** in any match. Sharing joy with everyone **makes sports day** an extra special occasion for our whole community. Athletes who **play fair** earn universal respect everywhere!`;

// Social Studies EASY (148w, 10 bolds) — SUPER SIMPLE
const easyReadSocialEn = `On sports day, all happy students **are super fun** and excited to play together outdoors. Friends **cheer and smile** on the sunny field while their classmates **run very fast** toward the line. When runners **finish the race**, they **shake hands politely** with opponents and **say kind words** of cheer. True young champions know that **playing fair** is much more important than winning gold medals alone. Maya showed great kindness when she helped a friend who fell on the green grass. Everyone **stood together happily** after the ceremony. Sharing joy **makes sports day** an extra special event for our whole school. We **feel proud** of all active athletes who **do their best** in every exciting game today!`;

// Write ADV & EASY read.js
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
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để thực hiện các thí nghiệm cơ học thể chất trong ngày hội thể thao. Khoa học thể chất chứng minh chạy ngoài trời cung cấp lượng oxy lớn cho cơ bắp. Trước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi xuống với huấn luyện viên để tính toán gia tốc và vận tốc (vận tốc = quãng đường / thời gian). Khi tiếng còi vang lên, Leo chạy rất nhanh dọc theo đường chạy và truyền gậy tiếp sức gọn gàng cho Maya. Cơ chân chuyển hóa năng lượng thành động năng. Maya chạy qua bãi cỏ với vận tốc lớn. Max bắt lấy gậy tiếp sức và bứt tốc về đích. Mọi người xem và vỗ tay nhiệt tình. Cuối cùng, đội của họ cán đích đầu tiên! Tinh thần đồng đội mang lại chiến thắng. Leo mỉm cười tự hào khi nhận huy chương vàng.\`,
    key_vocabulary: [
      { word: "athlete", definition: "a person trained in physical sports", example: "The athlete ran fast." },
      { word: "relay", definition: "a team race passing a baton", example: "Our relay team won." },
      { word: "baton", definition: "stick passed in a relay race", example: "He passed the baton cleanly." },
      { word: "stadium", definition: "large sports arena", example: "The stadium was full." },
      { word: "teamwork", definition: "working together cooperatively", example: "Teamwork brought victory." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the sports stadium", "He went to the sports stadium"], clue_statement: "Leo went to the sports stadium.", hint_en: "To the...", hint_vi: "Đến..." },
      { id: 2, question_en: "What physical formula did Leo review with his coach?", answer: ["velocity = distance / time", "Velocity formula"], clue_statement: "Leo calculated velocity = distance / time.", hint_en: "velocity = ...", hint_vi: "Công thức vận tốc = ..." },
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
      { word: "character", definition: "moral qualities of a person", example: "Sports build strong character." }
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
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để chơi game và chạy nhanh. Trời nắng ấm. Trước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi với huấn luyện viên để nói về tốc độ. Tốc độ là quãng đường chia cho thời gian. Khi tiếng còi vang lên, Leo chạy rất nhanh và truyền gậy cho Maya. Cơ chân giúp người chạy di chuyển nhanh. Maya chạy qua bãi cỏ. Max bắt gậy và bứt tốc về đích. Bạn bè xem và vỗ tay. Cuối cùng, họ cán đích đầu tiên! Tinh thần đồng đội mang lại chiến thắng. Leo tự hào với huy chương vàng.\`,
    key_vocabulary: [
      { word: "runner", definition: "a person who runs", example: "Leo is a fast runner." },
      { word: "race", definition: "a competition of speed", example: "We ran a relay race." },
      { word: "baton", definition: "a stick passed in a race", example: "He passed the baton." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the sports stadium", "Sports stadium"], clue_statement: "Leo went to the sports stadium.", hint_en: "To the...", hint_vi: "Đến..." },
      { id: 2, question_en: "What speed concept did Leo talk about with his coach?", answer: ["Speed is distance divided by time"], clue_statement: "Speed is distance divided by time.", hint_en: "distance divided by...", hint_vi: "quãng đường chia cho..." },
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
      { word: "cheer", definition: "shout with support", example: "Friends cheer and smile." }
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
console.log('✅ Wrote ADV & SUPER SIMPLE EASY read.js!');


// ============================================================================
// 2. SHADOWING: CONVERSATIONAL DIALOGUE VIDEO aqMpREQdnCY
// ============================================================================

const shadowingDataADV = {
  videoId: 'aqMpREQdnCY', // UNUSED conversational video: "Good morning Sally! What did you do yesterday? We went to the park..."
  content_en: "On Saturday morning, Leo went to the sports stadium for sports day. He ran very fast along the track and passed the baton cleanly to Maya. Max sprinted smoothly toward the finish line. Thousands of spectators watched and clapped enthusiastically. At the very end, teamwork brought victory and Leo received his golden medal!",
  script: [
    { id: 1, text: "Good morning Sally! How are you today?", vi: "Chào buổi sáng Sally! Hôm nay bạn thế nào?" },
    { id: 2, text: "I'm great! What did you do yesterday?", vi: "Tôi rất tuyệt! Bạn đã làm gì ngày hôm qua?" },
    { id: 3, text: "We went to the park and ran outdoors.", vi: "Chúng tôi đã đến công viên và chạy bộ ngoài trời." },
    { id: 4, text: "What did you do in the park?", vi: "Bạn đã làm gì ở công viên?" },
    { id: 5, text: "We flew kites and played sports games.", vi: "Chúng tôi đã thả diều và chơi các trò chơi thể thao." },
    { id: 6, text: "His kites flew high into the sunny sky.", vi: "Con diều của cậu ấy đã bay cao lên bầu trời nắng." },
    { id: 7, text: "What did you do yesterday Sally?", vi: "Bạn đã làm gì ngày hôm qua hả Sally?" },
    { id: 8, text: "I read exciting books and watched a science movie.", vi: "Tôi đã đọc những cuốn sách thú vị và xem một bộ phim khoa học." },
    { id: 9, text: "Let's go to the classroom and share with friends!", vi: "Hãy cùng vào lớp học và chia sẻ với bạn bè nào!" },
    { id: 10, text: "We had a wonderful sports day party together!", vi: "Chúng tôi đã có một bữa tiệc ngày hội thể thao tuyệt vời cùng nhau!" }
  ]
};

const shadowingDataEASY = {
  videoId: 'aqMpREQdnCY',
  content_en: shadowingDataADV.content_en,
  script: shadowingDataADV.script.slice(0, 8)
};

fs.writeFileSync(path.join(ADV_DIR, 'shadowing.js'), `export default ${JSON.stringify(shadowingDataADV, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'shadowing.js'), `export default ${JSON.stringify(shadowingDataEASY, null, 2)};\n`, 'utf8');
console.log('✅ Updated shadowing.js to use conversational dialogue video aqMpREQdnCY!');
