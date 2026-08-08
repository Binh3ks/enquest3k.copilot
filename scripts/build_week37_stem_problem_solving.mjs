import fs from 'fs';
import path from 'path';

console.log('🚀 Building STEM Problem-Solving Framework for Week 37 (ADV & EASY)...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// ============================================================================
// 1. STEM STORY PASSAGES (100% STEM Problem-Solving Framework)
// ============================================================================

// ADV STEM Story (~185w, 10 bolds)
const advReadStemEn = `On **Saturday morning**, Leo’s relay team **went to the sports stadium** for their big race. The weather **was sunny and warm**, but the team faced a serious physical problem: whenever Leo passed the baton, his teammate stopped moving, losing vital kinetic momentum. **First of all**, Leo **sat down with his coach** to solve this physics challenge. To maintain forward velocity ($v = \\text{distance}/\\text{time}$), the coach explained that smooth acceleration was required before the exchange zone. Instead of waiting at a standstill, the second runner needed to start sprinting early so both runners matched speed. During trial runs, Leo **ran very fast** down the red track and **passed the baton** seamlessly while both runners were moving at peak velocity. Maya **ran across the grass** maintaining momentum, and Max **caught the baton** at full speed. All the spectators **watched and clapped** as the team saved crucial seconds. **At the very end**, their team crossed the finish line first! Everyone **was tired but happy** because scientific **teamwork brought victory**. Leo **smiled with pride** for applying physics to win.`;

// EASY STEM Story (150w, 10 bolds) — Simple A1 for younger learners
const easyReadStemEn = `On **Saturday morning**, Leo’s relay team **went to the sports stadium** to run. The weather **was warm and bright**, but the team had a problem: they lost speed whenever they passed the baton. **First of all**, Leo **sat down with his coach** to fix their running plan using speed science. Speed equals distance divided by time ($v = d/t$). The coach showed them that the next runner must start running early to keep their fast momentum. Leo **ran very fast** down the track and **passed the baton** while both runners moved together at top speed. Maya **ran across the grass** without stopping, and Max **caught the baton** smoothly. Happy parents **watched and clapped** with big smiles. **At the very end**, their relay team crossed the finish line first! Everyone **was tired but happy** because **teamwork brought victory**. Leo **smiled with pride** with his new medal.`;

// Social Studies ADV (~180w, 10 bolds)
const advReadSocialEn = `Winning a championship trophy feels fantastic, but showing respect to other participants **is even more important** for young athletes. When runners **finish the race**, they **shake hands with opponents** and **say kind words** of sincere encouragement. True champions understand that **building strong character** matters far more than winning shiny trophies alone.

In ancient Greece, athletes gathered at Olympia to celebrate global peace and friendly athletic competition. Maya demonstrated this true fair play when she stopped to help a fallen runner on the track. Both competing teams **stood together with smiles** after the final award ceremony concluded. Dedicated athletes demonstrate true moral greatness whether they **win or lose** in any match. Sharing joy with everyone **makes sports day** an extra special occasion for our whole community. Athletes who **play fair** earn universal respect everywhere!`;

// Social Studies EASY (148w, 10 bolds)
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
    { id: 11, text: "Everyone was tired but happy because teamwork brought victory." },
    { id: 12, text: "Leo smiled with pride as he received his golden medal." }
  ],
  read_stem: {
    title_en: "Speed Science & The Relay Race",
    subtitle_en: "Biomechanical Physics Challenge",
    image_url: null,
    audio_url: "/audio/week37/read_stem.mp3",
    content_en: \`${advReadStemEn}\`,
    content_vi: \`Vào sáng thứ Bảy, đội tiếp sức của Leo đến sân vận động cho cuộc đua lớn. Thời tiết nắng ấm, nhưng đội gặp vấn đề vật lý nghiêm trọng: mỗi khi Leo truyền gậy, đồng đội dừng lại làm mất động năng. Trước hết, Leo ngồi xuống với huấn luyện viên để giải quyết thách thức vật lý này. Để duy trì vận tốc (v = d/t), huấn luyện viên giải thích rằng cần gia tốc mượt mà trước vùng giao gậy. Thay vì đứng yên chờ, người chạy thứ hai cần bắt đầu bứt tốc sớm để cả hai đạt cùng tốc độ. Trong đợt chạy thử, Leo chạy rất nhanh và truyền gậy mượt mà khi cả hai đang di chuyển ở vận tốc đỉnh. Maya chạy qua bãi cỏ giữ nguyên động năng, và Max bắt gậy ở tốc độ tối đa. Khán giả xem và vỗ tay khi đội tiết kiệm được những giây quý giá. Cuối cùng, đội cán đích đầu tiên! Mọi người đều mệt nhưng rất vui vì khoa học mang lại chiến thắng. Leo mỉm cười tự hào vì đã áp dụng vật lý để chiến thắng.\`,
    key_vocabulary: [
      { word: "athlete", definition: "a person trained in physical sports", example: "The athlete ran fast." },
      { word: "relay", definition: "a team race passing a baton", example: "Our relay team won." },
      { word: "baton", definition: "stick passed in a relay race", example: "He passed the baton cleanly." },
      { word: "stadium", definition: "large sports arena", example: "The stadium was full." },
      { word: "teamwork", definition: "working together cooperatively", example: "Teamwork brought victory." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "What physical problem did Leo's team face during baton exchange?", answer: ["Losing kinetic momentum", "Losing momentum"], clue_statement: "The teammate stopped moving, losing vital kinetic momentum.", hint_en: "Losing...", hint_vi: "Mất động năng..." },
      { id: 2, question_en: "What formula did Leo review with his coach to maintain velocity?", answer: ["v = distance / time", "velocity = distance / time"], clue_statement: "Leo calculated velocity = distance / time.", hint_en: "v = ...", hint_vi: "Công thức v = ..." },
      { id: 3, question_en: "How did the second runner solve the momentum problem?", answer: ["By starting to sprint early before receiving the baton"], clue_statement: "The second runner needed to start sprinting early.", hint_en: "By starting...", hint_vi: "Bằng cách chạy sớm..." },
      { id: 4, question_en: "Why was the team happy at the end?", answer: ["Because scientific teamwork brought victory", "Teamwork brought victory"], clue_statement: "Teamwork brought victory.", hint_en: "Because...", hint_vi: "Vì..." },
      { id: 5, question_en: "What medal did Leo receive?", answer: ["Gold medal", "A gold medal"], clue_statement: "Leo accepted his gold medal.", hint_en: "Gold...", hint_vi: "Huy chương vàng..." }
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
    "was tired but happy",
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
    'was tired but happy': { word: 'was tired but happy', pronunciation: '/wəz ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', example: 'Everyone was tired but happy.' },
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
    content_vi: \`Vào sáng thứ Bảy, đội tiếp sức của Leo đến sân vận động để chạy. Trời nắng ấm nhưng đội gặp rắc rối: họ bị giảm tốc độ mỗi khi truyền gậy. Trước hết, Leo ngồi với huấn luyện viên để sửa kế hoạch chạy bằng khoa học tốc độ (tốc độ = quãng đường / thời gian). Huấn luyện viên chỉ ra rằng người chạy tiếp theo phải bắt đầu chạy sớm để giữ đà. Leo chạy rất nhanh và truyền gậy khi cả hai cùng di chuyển ở tốc độ tối đa. Maya chạy qua bãi cỏ không dừng lại, và Max bắt gậy mượt mà. Cha mẹ xem và vỗ tay. Cuối cùng, họ cán đích đầu tiên! Mọi người đều mệt nhưng rất vui vì tinh thần đồng đội mang lại chiến thắng. Leo mỉm cười tự hào với huy chương mới.\`,
    key_vocabulary: [
      { word: "runner", definition: "a person who runs", example: "Leo is a fast runner." },
      { word: "race", definition: "a competition of speed", example: "We ran a relay race." },
      { word: "baton", definition: "a stick passed in a race", example: "He passed the baton." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo's team go on Saturday morning?", answer: ["To the sports stadium", "Sports stadium"], clue_statement: "Leo's team went to the sports stadium.", hint_en: "To the...", hint_vi: "Đến..." },
      { id: 2, question_en: "What problem did Leo's team fix using speed science?", answer: ["Losing speed during baton exchange", "Losing speed"], clue_statement: "They lost speed whenever they passed the baton.", hint_en: "Losing speed...", hint_vi: "Giảm tốc độ..." },
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
    "was tired but happy",
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
    'was tired but happy': { word: 'was tired but happy', pronunciation: '/wəz ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', example: 'Everyone was tired but happy.' },
    'teamwork brought victory': { word: 'teamwork brought victory', pronunciation: '/ˈtiːmwɜːk brɔːt ˈvɪktəri/', definition_vi: 'đồng đội mang lại chiến thắng', example: 'Teamwork brought victory.' }
  }
};`;

fs.writeFileSync(path.join(ADV_DIR, 'read.js'), advReadData, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'read.js'), easyReadData, 'utf8');
console.log('✅ Successfully wrote 100% STEM Problem-Solving Framework read.js for ADV & EASY!');
