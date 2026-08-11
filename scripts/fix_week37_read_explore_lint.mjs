import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing Week 37 read.js and explore.js regex matching for ADV and EASY...');

const advReadPath = './src/data/weeks/week_37/read.js';
const easyReadPath = './src/data/weeks_easy/week_37/read.js';
const advExplorePath = './src/data/weeks/week_37/explore.js';
const easyExplorePath = './src/data/weeks_easy/week_37/explore.js';

const readStemData = {
  title_en: "Speed Science & The Relay Race",
  subtitle_en: "Biomechanical Physics Challenge",
  image_url: "/images/week37/read_stem_w37.jpg",
  audio_url: "/audio/week37/read_stem.mp3",
  content_en: `On **Saturday morning**, Leo’s relay team **went to the sports stadium** for their big annual race. The weather **was sunny and warm**, but the team faced a serious physical problem: whenever Leo passed the baton, his teammate stopped moving, losing vital kinetic momentum. **First of all**, Leo **sat down with his coach** to solve this physics challenge together. To maintain forward velocity (velocity = distance / time), the coach explained that smooth acceleration was required before the exchange zone. Instead of waiting at a standstill, the second runner needed to start sprinting early so both runners matched speed. During trial runs, Leo **ran very fast** down the red track and **passed the baton** seamlessly while both runners were moving at peak velocity. Maya **ran across the grass** maintaining momentum, and Max **caught the baton** at full speed. All the spectators **watched and clapped** as the team saved crucial seconds. **At the very end**, their team crossed the finish line first! Everyone **was tired but happy** because scientific **teamwork brought victory**. Leo **smiled with pride** for applying physics to win.`,
  content_vi: `Vào sáng thứ Bảy, đội tiếp sức của Leo đến sân vận động cho cuộc đua lớn. Thời tiết nắng ấm, nhưng đội gặp vấn đề vật lý nghiêm trọng: mỗi khi Leo truyền gậy, đồng đội dừng lại làm mất động năng. Trước hết, Leo ngồi xuống với huấn luyện viên để giải quyết thách thức vật lý này. Để duy trì vận tốc (vận tốc = quãng đường / thời gian), huấn luyện viên giải thích rằng cần gia tốc mượt mà trước vùng giao gậy. Thay vì đứng yên chờ, người chạy thứ hai cần bắt đầu bứt tốc sớm để cả hai đạt cùng tốc độ. Trong đợt chạy thử, Leo chạy rất nhanh và truyền gậy mượt mà khi cả hai đang di chuyển ở vận tốc đỉnh. Maya chạy qua bãi cỏ giữ nguyên động năng, và Max bắt gậy ở tốc độ tối đa. Khán giả xem và vỗ tay khi đội tiết kiệm được những giây quý giá. Cuối cùng, đội cán đích đầu tiên! Mọi người đều mệt nhưng rất vui vì khoa học mang lại chiến thắng. Leo mỉm cười tự hào vì đã áp dụng vật lý để chiến thắng.`,
  key_vocabulary: [
    { word: "athlete", definition: "a person trained in physical sports", example: "The athlete ran fast." },
    { word: "relay", definition: "a team race passing a baton", example: "Our relay team won." },
    { word: "baton", definition: "stick passed in a relay race", example: "He passed the baton cleanly." },
    { word: "stadium", definition: "large sports arena", example: "The stadium was full." },
    { word: "teamwork", definition: "working together cooperatively", example: "Teamwork brought victory." }
  ],
  comprehension_questions: [
    { id: 1, question_en: "What physical problem did Leo's team face during baton exchange?", answer: ["Losing kinetic momentum", "Losing momentum"], clue_statement: "The teammate stopped moving, losing vital kinetic momentum.", hint_en: "Losing...", hint_vi: "Mất động năng..." },
    { id: 2, question_en: "What formula did Leo review with his coach to maintain velocity?", answer: ["velocity = distance / time", "Velocity formula"], clue_statement: "Leo calculated velocity = distance / time.", hint_en: "velocity = ...", hint_vi: "Công thức vận tốc = ..." },
    { id: 3, question_en: "How did the second runner solve the momentum problem?", answer: ["By starting to sprint early before receiving the baton"], clue_statement: "The second runner needed to start sprinting early.", hint_en: "By starting...", hint_vi: "Bằng cách chạy sớm..." },
    { id: 4, question_en: "Why was the team happy at the end?", answer: ["Because scientific teamwork brought victory", "Teamwork brought victory"], clue_statement: "Teamwork brought victory.", hint_en: "Because...", hint_vi: "Vì..." },
    { id: 5, question_en: "What medal did Leo receive?", answer: ["Gold medal", "A gold medal"], clue_statement: "Leo accepted his gold medal.", hint_en: "Gold...", hint_vi: "Huy chương vàng..." }
  ]
};

const readSocialData = {
  title_en: "The Olympic Truce & Global Peace",
  subtitle_en: "History & Geography Story",
  image_url: "/images/week37/read_social_w37.jpg",
  audio_url: "/audio/week37/read_social.mp3",
  content_en: `Long ago in ancient Greece, warring city-states gathered at Olympia for the ancient Olympic Games. During the games, leaders **declared a sacred truce** so athletes could travel safely through rival territories. **First of all**, leaders **sat down with their coaches** to pause all conflicts and celebrate peace. Athletes **ran very fast** along dust tracks and **passed the Olympic torch** to honor unity. Today, the Modern Olympic Games bring together athletes from over two hundred nations. For example, on a sunny **Saturday morning** during the Opening Ceremony, delegation teams **went to the sports stadium** wearing colorful traditional uniforms. Competitors **marched across the stadium** and **represented their home nations** with deep respect. Spectators **watched and clapped** enthusiastically as athletes from different cultures shared meals in the Olympic Village. **At the very end**, competitors **were united in peace** because international **sports brought peace** across borders. Everyone **smiled with pride** while waving national flags together.`,
  content_vi: `Ngày xưa ở Hy Lạp cổ đại, các thành bang giao tranh đã tập hợp tại Olympia tham gia Thế vận hội Olympic cổ đại. Trong thời gian diễn ra đại hội, các nhà lãnh đạo tuyên bố một thỏa thuận ngừng bắn linh thiêng (Ekecheiria) để các vận động viên có thể di chuyển an toàn qua các vùng lãnh thổ đối đầu. Trước tiên, các đối thủ ngồi xuống với huấn luyện viên để tạm dừng xung đột và tôn vinh hòa bình. Các vận động viên chạy rất nhanh và truyền ngọn đốc Olympic để tôn vinh sự đoàn kết. Ngày nay, Thế vận hội Olympic hiện đại kết nối các vận động viên từ hơn 200 quốc gia. Ví dụ, vào một sáng thứ Bảy nắng đẹp trong Lễ khai mạc, các đoàn thể thao đến sân vận động trong trang phục truyền thống rực rỡ. Các vận động viên diễu hành qua sân vận động và đại diện cho quốc gia của họ với sự tôn trọng sâu sắc. Khán giả xem và vỗ tay khi các vận động viên từ nhiều nền văn hóa khác nhau cùng ăn uống tại Làng Olympic. Cuối cùng, các đối thủ đoàn kết trong hòa bình vì thể thao quốc tế mang lại hòa bình xuyên biên giới. Mọi người mỉm cười tự hào khi cùng nhau vẫy quốc kỳ.`,
  key_vocabulary: [
    { word: "truce", definition: "an agreement to stop fighting", example: "Leaders declared a sacred truce." },
    { word: "nation", definition: "a country with its own government", example: "Athletes represented their home nations." },
    { word: "tradition", definition: "custom passed down through history", example: "The Olympics is a historic tradition." },
    { word: "culture", definition: "ideas and customs of a people", example: "They met people from different cultures." },
    { word: "unity", definition: "being joined together as one", example: "Sports promote global unity." }
  ],
  comprehension_questions: [
    { id: 1, question_en: "What sacred agreement did ancient Greek leaders declare during the Olympics?", answer: ["A sacred truce", "Sacred truce"], clue_statement: "Leaders declared a sacred truce so athletes could travel safely.", hint_en: "A sacred...", hint_vi: "Thỏa thuận..." },
    { id: 2, question_en: "How many nations come together in the Modern Olympic Games today?", answer: ["Over two hundred nations", "Over 200 nations"], clue_statement: "Modern Olympic Games bring together athletes from over two hundred nations.", hint_en: "Over two...", hint_vi: "Hơn hai..." },
    { id: 3, question_en: "Where do athletes from different cultures share meals during the games?", answer: ["In the Olympic Village", "Olympic Village"], clue_statement: "Athletes from different cultures shared meals in the Olympic Village.", hint_en: "In the...", hint_vi: "Tại Làng..." },
    { id: 4, question_en: "Why were competitors united in peace at the very end?", answer: ["Because international sports brought peace across borders"], clue_statement: "Competitors were united in peace because international sports brought peace.", hint_en: "Because...", hint_vi: "Bởi vì..." }
  ]
};

const fullReadContentEn = readStemData.content_en;
const fullReadContentVi = readStemData.content_vi;

const readJsContent = `export default {
  title: "The Sports Day Challenge",
  image_url: "/images/week37/read_cover_w37.jpg",
  audio_url: "/audio/week37/read_main.mp3",
  content_en: \`${fullReadContentEn}\`,
  content_vi: \`${fullReadContentVi}\`,
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
  read_stem: ${JSON.stringify(readStemData, null, 2)},
  read_social: ${JSON.stringify(readSocialData, null, 2)},
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
};\n`;

fs.writeFileSync(advReadPath, readJsContent, 'utf8');
fs.writeFileSync(easyReadPath, readJsContent, 'utf8');

const exploreContentEn = `Far away in East Africa, high in the Great Rift Valley of Kenya, lies a legendary town called Iten. It **is known as the Home of Champions** because world-record marathon runners train there every day. Young athletes **run together on red dirt paths** 2,400 metres above sea level. High up in the mountains, thin air contains less oxygen, so the human body naturally adapts by **building stronger lungs** and heart muscles. For many Kenyan children, **running long distances to school** across rolling hills **is a normal part** of daily life. This daily endurance training turns young runners into world-class athletes who **win global marathon races**. Today, international runners from around the world **travel to Kenya to train** together in Iten. Athletes **share traditional meals** and **learn about different cultures** while running under the warm African sun. Outdoor running in Kenya **is a powerful bridge** that connects local communities to the global sports world. By pursuing athletic dreams, young runners **inspire children everywhere** to stay active and **achieve great goals**!`;

const exploreContentVi = `Xa xôi ở Đông Phi, cao trên Thung lũng Rift Lớn của Kenya, có một thị trấn huyền thoại tên là Iten. Nơi đây được biết đến như Quê hương của những Nhà vô địch vì các vận động viên marathon kỷ lục thế giới tập luyện ở đó mỗi ngày. Các vận động viên trẻ cùng nhau chạy trên những con đường đất đỏ cao 2.400 mét so với mực nước biển. Trên núi cao, không khí mỏng chứa ít oxy hơn, vì vậy cơ thể con người tự nhiên thích nghi bằng cách xây dựng lá phổi và cơ tim khỏe mạnh hơn. Đối với nhiều trẻ em Kenya, việc chạy quãng đường dài đến trường qua những ngọn đồi nhấp nhou là một phần bình thường của cuộc sống hàng ngày. Việc rèn luyện sức bền hàng ngày này biến các vận động viên trẻ thành những vận động viên đẳng cấp thế giới, những người giành chiến thắng trong các giải marathon toàn cầu. Ngày nay, các vận động viên quốc tế từ khắp nơi trên thế giới đến Kenya để cùng tập luyện ở Iten. Họ chia sẻ các bữa ăn truyền thống và tìm hiểu về các nền văn hóa khác nhau. Chạy bộ ở Kenya là chiếc cầu nối mạnh mẽ kết nối cộng đồng địa phương với thế giới thể thao toàn cầu!`;

const checkQuestions = [
  {
    id: 1,
    question_en: "Where is the town of Iten located?",
    question_vi: "Thị trấn Iten nằm ở đâu?",
    options: [
      "In the Great Rift Valley of Kenya, East Africa",
      "In ancient Olympia, Greece",
      "Near a sports stadium in London",
      "On a tropical island in the Pacific Ocean"
    ],
    correct_answer: 0,
    answer: "In the Great Rift Valley of Kenya, East Africa",
    explanation_en: "Iten is located high in the Great Rift Valley of Kenya, East Africa.",
    explanation_vi: "Iten nằm ở vùng cao trên Thung lũng Rift Lớn của Kenya, Đông Phi."
  },
  {
    id: 2,
    question_en: "Why does running high up in the mountains build stronger lungs and heart muscles?",
    question_vi: "Tại sao chạy trên núi cao lại giúp phổi và cơ tim khỏe mạnh hơn?",
    options: [
      "Because thin mountain air has less oxygen, forcing the body to adapt",
      "Because mountain tracks are made of synthetic rubber",
      "Because athletes only run in cold rainy weather",
      "Because children drink special juices in the mountains"
    ],
    correct_answer: 0,
    answer: "Because thin mountain air has less oxygen, forcing the body to adapt",
    explanation_en: "Thin mountain air contains less oxygen, so the human body adapts by strengthening lungs and heart muscles.",
    explanation_vi: "Không khí mỏng trên núi chứa ít oxy hơn, khiến cơ thể thích nghi bằng cách làm lá phổi và cơ tim khỏe hơn."
  },
  {
    id: 3,
    question_en: "What do international runners do when they travel to Iten, Kenya?",
    question_vi: "Các vận động viên quốc tế làm gì khi đến Iten, Kenya?",
    options: [
      "They train together, share traditional meals, and learn about different cultures",
      "They build big sports stadiums with swimming pools",
      "They stop running and rest at hotels all day",
      "They only watch sports on television"
    ],
    correct_answer: 0,
    answer: "They train together, share traditional meals, and learn about different cultures",
    explanation_en: "Runners from around the world train together, share traditional meals, and exchange cultures in Iten.",
    explanation_vi: "Các vận động viên từ khắp nơi trên thế giới cùng tập luyện, chia sẻ bữa ăn truyền thống và giao lưu văn hóa tại Iten."
  },
  {
    id: 4,
    critical_thinking: true,
    question_en: "How does running long distances every day help children build physical strength and achieve their future dreams?",
    question_vi: "Chạy bộ quãng đường dài hàng ngày giúp trẻ em xây dựng thể lực và đạt được ước mơ tương lai như thế nào?",
    options: [
      "It builds strong cardiovascular endurance and determination to overcome challenges",
      "It makes children stay inside their classrooms all day",
      "It lets runners skip daily practice completely",
      "It only helps people win gold trophies without hard work"
    ],
    correct_answer: 0,
    answer: "It builds strong cardiovascular endurance and determination to overcome challenges",
    explanation_en: "Daily endurance running develops strong heart endurance and mental resilience to achieve great life goals.",
    explanation_vi: "Chạy bộ rèn luyện sức bền tim mạch và ý chí kiên cường để vượt qua khó khăn và đạt mục tiêu lớn."
  }
];

const questionData = {
  text_en: "Write a short paragraph about how high-altitude running in Kenya inspires children around the world to stay active and pursue their dreams.",
  text_vi: "Viết một đoạn văn ngắn về việc chạy bộ trên vùng cao ở Kenya truyền cảm hứng cho trẻ em trên toàn thế giới giữ lối sống năng động và theo đuổi ước mơ.",
  min_words: 15,
  hint_en: "Mention Kenya, high altitude, thin air, strong lungs, and inspiring global children.",
  hint_vi: "Nêu các ý: Kenya, độ cao lớn, không khí mỏng, lá phổi khỏe, và truyền cảm hứng cho trẻ em toàn cầu."
};

const chunkFocusList = [
  "is known as the Home of Champions",
  "run together on red dirt paths",
  "building stronger lungs",
  "running long distances to school",
  "is a normal part",
  "win global marathon races",
  "travel to Kenya to train",
  "share traditional meals",
  "learn about different cultures",
  "is a powerful bridge",
  "inspire children everywhere",
  "achieve great goals"
];

const dictionaryData = {
  'is known as the Home of Champions': { word: 'is known as the Home of Champions', pronunciation: '/ɪz nəʊn æz ðə həʊm əv ˈtʃæmpiənz/', definition_vi: 'được biết đến là quê hương các nhà vô địch', example: 'Iten is known as the Home of Champions.' },
  'run together on red dirt paths': { word: 'run together on red dirt paths', pronunciation: '/rʌn təˈɡeðə ɒn red dɜːt pɑːðz/', definition_vi: 'cùng nhau chạy trên đường đất đỏ', example: 'They run together on red dirt paths.' },
  'building stronger lungs': { word: 'building stronger lungs', pronunciation: '/ˈbɪldɪŋ ˈstrɒŋɡə lʌŋz/', definition_vi: 'xây dựng lá phổi khỏe hơn', example: 'High altitude helps in building stronger lungs.' },
  'running long distances to school': { word: 'running long distances to school', pronunciation: '/ˈrʌnɪŋ lɒŋ ˈdɪstənsɪz tuː skuːl/', definition_vi: 'chạy quãng đường dài đến trường', example: 'Children are running long distances to school.' },
  'is a normal part': { word: 'is a normal part', pronunciation: '/ɪz ə ˈnɔːml pɑːt/', definition_vi: 'là một phần bình thường', example: 'Daily practice is a normal part.' },
  'win global marathon races': { word: 'win global marathon races', pronunciation: '/wɪn ˈɡləʊbl ˈmærəθən ˈreɪsɪz/', definition_vi: 'thắng các giải marathon toàn cầu', example: 'They win global marathon races.' },
  'travel to Kenya to train': { word: 'travel to Kenya to train', pronunciation: '/ˈtrævl tuː ˈkenjə tuː treɪn/', definition_vi: 'đến Kenya để tập luyện', example: 'Runners travel to Kenya to train.' },
  'share traditional meals': { word: 'share traditional meals', pronunciation: '/ʃeə trəˈdɪʃənl miːlz/', definition_vi: 'chia sẻ bữa ăn truyền thống', example: 'Athletes share traditional meals.' },
  'learn about different cultures': { word: 'learn about different cultures', pronunciation: '/lɜːn əˈbaʊt ˈdɪfrənt ˈkʌltʃəz/', definition_vi: 'tìm hiểu các nền văn hóa khác nhau', example: 'They learn about different cultures.' },
  'is a powerful bridge': { word: 'is a powerful bridge', pronunciation: '/ɪz ə ˈpaʊəfl brɪdʒ/', definition_vi: 'là một chiếc cầu nối mạnh mẽ', example: 'Sports is a powerful bridge.' },
  'inspire children everywhere': { word: 'inspire children everywhere', pronunciation: '/ɪnˈspaɪə ˈtʃɪldrən ˈevriweə/', definition_vi: 'truyền cảm hứng cho trẻ em khắp nơi', example: 'They inspire children everywhere.' },
  'achieve great goals': { word: 'achieve great goals', pronunciation: '/əˈtʃiːv ɡreɪt ɡəʊlz/', definition_vi: 'đạt được những mục tiêu lớn', example: 'Hard work helps achieve great goals.' }
};

const exploreJsContent = `export default {
  title_en: "Iten: Home of Marathon Champions",
  image_url: "/images/week37/explore_w37.jpg",
  content_en: \`${exploreContentEn}\`,
  content_vi: \`${exploreContentVi}\`,
  check_questions: ${JSON.stringify(checkQuestions, null, 2)},
  question: ${JSON.stringify(questionData, null, 2)},
  chunk_focus: ${JSON.stringify(chunkFocusList, null, 2)},
  dictionary: ${JSON.stringify(dictionaryData, null, 2)}
};\n`;

fs.writeFileSync(advExplorePath, exploreJsContent, 'utf8');
fs.writeFileSync(easyExplorePath, exploreJsContent, 'utf8');

console.log('✅ Updated explore.js with template literals for content_en!');
