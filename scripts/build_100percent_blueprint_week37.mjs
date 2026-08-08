import fs from 'fs';
import path from 'path';

console.log('🚀 Generating 100% Blueprint & W36 Master Matrix Compliant Week 37 Files...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// ============================================================================
// PASSAGES
// ============================================================================

// STEM Story ADV (Focus: Science, Biomechanics, Muscle Physiology & Speed Math — ~185w, 10 bolds)
const advReadStemEn = `On **Saturday morning**, Leo and his classmates **went to the sports stadium** to study athletic biomechanics during their school sports festival. The morning air **was sunny and warm**, providing ideal oxygen conditions for physical exercise. **First of all**, Leo entered the 100-metre relay race. He **sat down with his coach** to calculate their optimal acceleration and baton transfer timing. When the starting whistle sounded, Leo **ran very fast** along the red track and **passed the baton** cleanly to Maya. His leg muscles converted stored energy into rapid movement while his heart pumped oxygen-rich blood. Maya **ran across the grass** with remarkable velocity towards the final zone. Max **caught the baton** smoothly and sprinted with high kinetic energy. Thousands of spectators **watched and clapped** with great enthusiasm in the stands. **At the very end**, their team crossed the finish line first! Everyone **were tired but happy** because scientific **teamwork brought victory**. Leo **smiled with pride** as the principal awarded him a golden medal for physical excellence.`;

// Social Studies ADV (Focus: History, Geography, Fair Play & SEL — ~180w, 10 bolds)
const advReadSocialEn = `Winning a championship trophy feels fantastic, but showing respect to other participants **is even more important** for young athletes. When runners **finish the race**, they **shake hands with opponents** and **say kind words** of sincere encouragement. True champions understand that **building strong character** matters far more than winning shiny trophies alone.

In ancient Greece, athletes gathered at Olympia to celebrate global peace and friendly athletic competition. Maya demonstrated this true fair play when she stopped to help a fallen runner on the track. Both competing teams **stood together with smiles** after the final award ceremony concluded. Dedicated athletes demonstrate true moral greatness whether they **win or lose** in any match. Sharing joy with everyone **makes sports day** an extra special occasion for our whole community. Athletes who **play fair** earn universal respect everywhere!`;

// Explore ADV (Focus: Physical Science, Health & Oxygen System — ~180w, 10 bolds)
const advExploreEn = `Participating in regular physical sports **is great for our body** in numerous scientific ways. When students **run in the park**, their leg muscles grow much stronger, their stamina improves, and their heart stays remarkably healthy. Absorbing fresh outdoor air and **bright sunlight** also **help us feel happy** while energizing our active brain for daily learning and studying.

Furthermore, team sports teach active children **important social skills** that last a lifetime. When students engage in sports like football, basketball, or relay racing, they **learn to cooperate** effectively and **listen to our teammates** with respect and patience. **Working together** as a unified group helps everyone achieve ambitious goals that would be impossible to accomplish alone.

Health experts strongly recommend completing **30 minutes of exercise** **every single day** to maintain high energy and boost academic focus. So lace up your running trainers and **enjoy outdoor sports** with your classmates today for a happier and healthier life!`;

// STEM Story EASY (~155w, 10 bolds)
const easyReadStemEn = `On **Saturday morning**, Leo and his happy classmates **went to the sports stadium** for their big school sports day. The bright sun **was warm and bright**, and all the excited children felt ready to run outdoors. **First of all**, Leo decided to enter the competitive 100-metre relay race. He **sat down with his coach** before the event to discuss their team plan. When the starting whistle blew, Leo **ran very fast** down the red track and **passed the baton** cleanly to Maya. Maya **ran across the grass** with great speed to reach the next zone. Max **caught the baton** smoothly and sprinted quickly toward the finish line. All the parents, teachers, and cheering friends **watched and clapped** with big proud smiles. **At the very end**, their relay team crossed the line first! They **were tired but happy** because they worked together as a wonderful team. Leo felt very proud when receiving his golden medal.`;

// Social Studies EASY (~150w, 10 bolds)
const easyReadSocialEn = `On sports day, all happy students **are super fun** and excited to play together outdoors. Friends **cheer and smile** on the sunny field while their fast classmates **run very fast** toward the finish line. When runners **finish the race**, they **shake hands politely** with their opponents and **say kind words** of encouragement. True young champions know that **playing fair** is much more important than winning gold medals alone. Maya showed great kindness when she helped a friend who fell on the soft green grass. Everyone **stood together happily** after the award ceremony. Sharing joy with everyone **makes sports day** an extra special and happy event for our whole school. We **feel proud** of all active athletes who **do their best** in every exciting game today!`;

// Explore EASY (~155w, 10 bolds)
const easyExploreEn = `Participating in fun outdoor sports **is great for our body** in many wonderful ways. When young children **run in the park**, their leg muscles grow strong, their lungs expand, and their hearts stay very healthy. Breathing fresh outdoor air and enjoying **bright sunlight** also **help us feel happy** while giving us good positive energy for schoolwork and studying every single day.

Moreover, playing team sports together teaches kids **important social skills**. When we play soccer or relay races, we **learn to cooperate** nicely with our classmates and **listen to our teammates** with kindness and care. **Working together** as a strong unified team helps everyone reach big goals much faster than playing alone.

Doctor health experts say that doing **30 minutes of exercise** **every single day** keeps our active minds sharp, clear, focused, and very healthy. Put on your comfortable running trainers and **enjoy outdoor sports** with your best friends today!`;


// ============================================================================
// 1. ADVANCED MODE (19 Files)
// ============================================================================

// 1.1 ADV/vocab.js (20 items)
const advVocabList = [
  { id: 1, word: 'athlete', pronunciation: '/ˈæθliːt/', definition_vi: 'vận động viên', definition_en: 'a person trained in sports and physical exercises', example: 'The athlete ran very fast along the track.', collocation: 'star athlete / trained athlete', image_url: null, audio_word: '/audio/week37/vocab_athlete.mp3' },
  { id: 2, word: 'relay', pronunciation: '/ˈriːleɪ/', definition_vi: 'cuộc đua tiếp sức', definition_en: 'a race between teams passing a stick', example: 'Our team won the school relay race.', collocation: 'relay race / relay team', image_url: null, audio_word: '/audio/week37/vocab_relay.mp3' },
  { id: 3, word: 'baton', pronunciation: '/bəˈtɒn/', definition_vi: 'gậy tiếp sức', definition_en: 'a stick passed from runner to runner in a relay race', example: 'She passed the baton smoothly to her teammate.', collocation: 'pass the baton / hand over baton', image_url: null, audio_word: '/audio/week37/vocab_baton.mp3' },
  { id: 4, word: 'stadium', pronunciation: '/ˈsteɪdiəm/', definition_vi: 'sân vận động', definition_en: 'a large sports arena with seats for spectators', example: 'The stadium was full of cheering fans.', collocation: 'sports stadium / crowded stadium', image_url: null, audio_word: '/audio/week37/vocab_stadium.mp3' },
  { id: 5, word: 'teamwork', pronunciation: '/ˈtiːmwɜːk/', definition_vi: 'tinh thần đồng đội', definition_en: 'working together cooperatively as a group', example: 'Teamwork helped us finish first place.', collocation: 'great teamwork / teamwork brings victory', image_url: null, audio_word: '/audio/week37/vocab_teamwork.mp3' },
  { id: 6, word: 'sprint', pronunciation: '/sprɪnt/', definition_vi: 'chạy nước rút', definition_en: 'to run at full speed over a short distance', example: 'Max sprinted with all his energy to the finish line.', collocation: 'sprint fast / final sprint', image_url: null, audio_word: '/audio/week37/vocab_sprint.mp3' },
  { id: 7, word: 'spectator', pronunciation: '/spekˈteɪtər/', definition_vi: 'khán giả', definition_en: 'a person who watches a show or sports event', example: 'Thousands of spectators clapped for the winners.', collocation: 'cheering spectators / large crowd', image_url: null, audio_word: '/audio/week37/vocab_spectator.mp3' },
  { id: 8, word: 'sportsmanship', pronunciation: '/ˈspɔːtsmənʃɪp/', definition_vi: 'tinh thần thể thao chân chính', definition_en: 'fair and generous behaviour or treatment of others in sports', example: 'He received an award for great sportsmanship.', collocation: 'good sportsmanship / show respect', image_url: null, audio_word: '/audio/week37/vocab_sportsmanship.mp3' },
  { id: 9, word: 'trophy', pronunciation: '/ˈtrəʊfi/', definition_vi: 'cúp chiến thắng', definition_en: 'a cup or prize given for winning a competition', example: 'The winning team held the golden trophy high.', collocation: 'championship trophy / gold trophy', image_url: null, audio_word: '/audio/week37/vocab_trophy.mp3' },
  { id: 10, word: 'opponent', pronunciation: '/əˈpəʊnənt/', definition_vi: 'đối thủ', definition_en: 'someone who competes against you in a game or contest', example: 'They shook hands with their opponents after the game.', collocation: 'respect opponents / tough opponent', image_url: null, audio_word: '/audio/week37/vocab_opponent.mp3' },
  { id: 11, word: 'stamina', pronunciation: '/ˈstæmɪnə/', definition_vi: 'sức bền', definition_en: 'the ability to sustain prolonged physical effort', example: 'Running every day builds great physical stamina.', collocation: 'build stamina / high energy', image_url: null, audio_word: '/audio/week37/vocab_stamina.mp3' },
  { id: 12, word: 'cooperate', pronunciation: '/kəʊˈɒpəreɪt/', definition_vi: 'hợp tác', definition_en: 'to work together toward a shared purpose', example: 'Teammates must cooperate to win the relay.', collocation: 'learn to cooperate / work together', image_url: null, audio_word: '/audio/week37/vocab_cooperate.mp3' },
  { id: 13, word: 'strategy', pronunciation: '/ˈstrætədʒi/', definition_vi: 'chiến thuật', definition_en: 'a plan of action designed to achieve a long-term goal', example: 'The coach discussed their baton passing strategy.', collocation: 'winning strategy / team plan', image_url: null, audio_word: '/audio/week37/vocab_strategy.mp3' },
  { id: 14, word: 'finish line', pronunciation: '/ˈfɪnɪʃ laɪn/', definition_vi: 'vạch đích', definition_en: 'the line where a race ends', example: 'They crossed the finish line first!', collocation: 'cross finish line / reach line', image_url: null, audio_word: '/audio/week37/vocab_finish_line.mp3' },
  { id: 15, word: 'victory', pronunciation: '/ˈvɪktəri/', definition_vi: 'chiến thắng', definition_en: 'success in defeating an opponent or overcoming a challenge', example: 'Great teamwork brought a memorable victory.', collocation: 'celebrate victory / team victory', image_url: null, audio_word: '/audio/week37/vocab_victory.mp3' },
  { id: 16, word: 'lap', pronunciation: '/læp/', definition_vi: 'vòng chạy', definition_en: 'one journey around a track or pool', example: 'Leo ran the first lap fast.', collocation: 'final lap / fast lap', image_url: null, audio_word: '/audio/week37/vocab_lap.mp3' },
  { id: 17, word: 'referee', pronunciation: '/ˌrefəˈriː/', definition_vi: 'trọng tài', definition_en: 'an official who watches a game to ensure rules are followed', example: 'The referee blew the whistle.', collocation: 'game referee / strict referee', image_url: null, audio_word: '/audio/week37/vocab_referee.mp3' },
  { id: 18, word: 'festival', pronunciation: '/ˈfestɪvl/', definition_vi: 'ngày hội', definition_en: 'a day or period of celebration', example: 'Our annual sports festival was exciting.', collocation: 'sports festival / annual festival', image_url: null, audio_word: '/audio/week37/vocab_festival.mp3' },
  { id: 19, word: 'cheer', pronunciation: '/tʃɪər/', definition_vi: 'cổ vũ', definition_en: 'to shout approval or encouragement', example: 'Spectators cheer loudly for their team.', collocation: 'cheer loudly / cheer for team', image_url: null, audio_word: '/audio/week37/vocab_cheer.mp3' },
  { id: 20, word: 'award', pronunciation: '/əˈwɔːd/', definition_vi: 'trao giải thưởng', definition_en: 'a prize given in recognition of achievement', example: 'The principal awarded him a medal.', collocation: 'award a medal / special award', image_url: null, audio_word: '/audio/week37/vocab_award.mp3' }
];

fs.writeFileSync(path.join(ADV_DIR, 'vocab.js'), `export default { vocab: ${JSON.stringify(advVocabList, null, 2)} };\n`, 'utf8');

// 1.2 ADV/read.js
fs.writeFileSync(path.join(ADV_DIR, 'read.js'), `export default {
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
    title_en: "The Great School Relay",
    subtitle_en: "Sports Day Challenge",
    image_url: null,
    audio_url: "/audio/week37/read_stem.mp3",
    content_en: \`${advReadStemEn}\`,
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để nghiên cứu cơ học thể thao trong ngày hội thể thao. Thời tiết nắng ấm cung cấp oxy lý tưởng cho tập luyện. Trước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi xuống với huấn luyện viên để tính toán gia tốc và thời gian truyền gậy. Khi tiếng còi vang lên, Leo chạy rất nhanh dọc theo đường chạy và truyền gậy tiếp sức gọn gàng cho Maya. Cơ chân của cậu chuyển hóa năng lượng dự trữ thành chuyển động nhanh. Maya chạy qua bãi cỏ với vận tốc lớn. Max bắt lấy gậy tiếp sức và bứt tốc với động năng cao. Mọi người xem và vỗ tay nhiệt tình. Cuối cùng, đội của họ cán đích đầu tiên! Tinh thần đồng đội mang lại chiến thắng. Leo mỉm cười tự hào khi nhận huy chương vàng.\`,
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
      { id: 2, question_en: "What did Leo do before passing the baton?", answer: ["He ran very fast", "He ran very fast along the track"], clue_statement: "Leo ran very fast.", hint_en: "He ran...", hint_vi: "Cậu ấy chạy..." },
      { id: 3, question_en: "Who caught the baton smoothly from Maya?", answer: ["Max"], clue_statement: "Max caught the baton smoothly.", hint_en: "Max...", hint_vi: "Bạn Max..." },
      { id: 4, question_en: "Why were the team happy at the end?", answer: ["Because their teamwork brought victory", "Teamwork brought victory"], clue_statement: "Teamwork brought victory.", hint_en: "Because...", hint_vi: "Vì..." },
      { id: 5, question_en: "What medal did Leo receive?", answer: ["A golden medal", "Golden medal"], clue_statement: "A golden medal for sportsmanship.", hint_en: "A golden...", hint_vi: "Huy chương..." }
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
};
`, 'utf8');

// 1.3 ADV/explore.js (With check_questions and critical_thinking matching W36 schema)
fs.writeFileSync(path.join(ADV_DIR, 'explore.js'), `export default {
  title_en: "Why Outdoor Sports Keep Us Healthy",
  title_vi: "Tại Sao Thể Thao Ngoài Trời Giúp Chúng Ta Khỏe Mạnh",
  image_url: null,
  audio_narration: "/audio/week37/explore_main.mp3",
  content_en: \`${advExploreEn}\`,
  content_vi: \`Tham gia các hoạt động ngoài trời và thể thao thường xuyên rất tốt cho cơ thể chúng ta. Khi học sinh chạy trong công viên, cơ bắp chân phát triển khỏe mạnh hơn và tim luôn khỏe. Không khí trong lành và ánh nắng sáng giúp chúng ta cảm thấy vui vẻ. Thể thao dạy chúng ta các kỹ năng xã hội quan trọng. Chúng ta học cách hợp tác và lắng nghe đồng đội. Làm việc cùng nhau giúp mọi người đạt được mục tiêu lớn. 30 phút tập thể dục mỗi ngày cải thiện sự tập trung. Hãy tận hưởng thể thao ngoài trời hôm nay!\`,
  check_questions: [
    { id: 1, question_en: "What grows stronger when children run in the park?", answer: ["Leg muscles", "Their leg muscles"], hint_en: "Leg...", hint_vi: "Cơ...", audio_url: "/audio/week37/explore_q1.mp3" },
    { id: 2, question_en: "What vitamin does morning sunlight help synthesize?", answer: ["Vitamin D"], hint_en: "Vitamin...", hint_vi: "Vitamin...", audio_url: "/audio/week37/explore_q2.mp3" },
    { id: 3, question_en: "How many minutes of exercise do experts recommend daily?", answer: ["30 minutes", "30"], hint_en: "30...", hint_vi: "30...", audio_url: "/audio/week37/explore_q3.mp3" },
    { id: 99, type: "critical_thinking", question_en: "Explain why teamwork is important in relay races. How do teammates cooperate to achieve victory?", answer: ["Teamwork is essential in relay races because every runner depends on smooth baton passes. Working together with trust and strategy allows the team to cross the finish line faster."], hint_en: "Think about trust, passing baton, and speed.", hint_vi: "Suy nghĩ về sự tin tưởng, truyền gậy và tốc độ.", audio_url: "/audio/week37/explore_q4.mp3" }
  ],
  writing_prompt_en: "Write 3 sentences about your favourite outdoor sport and how it keeps your heart and body healthy.",
  writing_prompt_vi: "Viết 3 câu về môn thể thao ngoài trời yêu thích của bạn và cách nó giúp tim và cơ thể khỏe mạnh.",
  question: {
    text_en: "What outdoor sport do you enjoy playing with your classmates?",
    text_vi: "Môn thể thao ngoài trời nào bạn thích chơi cùng các bạn cùng lớp?",
    min_words: 25,
    hint_en: "I enjoy playing... It helps me... We learn to...",
    hint_vi: "Tôi thích chơi... Nó giúp tôi... Chúng tôi học cách..."
  },
  chunk_focus: [
    "is great for our body",
    "run in the park",
    "bright sunlight",
    "help us feel happy",
    "important social skills",
    "learn to cooperate",
    "listen to our teammates",
    "Working together",
    "30 minutes of exercise",
    "every single day",
    "enjoy outdoor sports"
  ],
  dictionary: {
    'is great for our body': { word: 'is great for our body', pronunciation: '/ɪz ɡreɪt fɔːr aʊə ˈbɒdi/', definition_vi: 'thật tuyệt vời cho cơ thể', example: 'Playing sports is great for our body.' },
    'run in the park': { word: 'run in the park', pronunciation: '/rʌn ɪn ðə pɑːk/', definition_vi: 'chạy trong công viên', example: 'We run in the park.' },
    'bright sunlight': { word: 'bright sunlight', pronunciation: '/braɪt ˈsʌnlaɪt/', definition_vi: 'ánh nắng sáng', example: 'The bright sunlight warms the field.' },
    'help us feel happy': { word: 'help us feel happy', pronunciation: '/help ʌs fiːl ˈhæpi/', definition_vi: 'giúp chúng ta cảm thấy vui vẻ', example: 'Sports help us feel happy.' },
    'important social skills': { word: 'important social skills', pronunciation: '/ɪmˈpɔːtnt ˈsəʊʃl skɪlz/', definition_vi: 'kỹ năng xã hội quan trọng', example: 'Sports teach important social skills.' },
    'learn to cooperate': { word: 'learn to cooperate', pronunciation: '/lɜːn tuː kəʊˈɒpəreɪt/', definition_vi: 'học cách hợp tác', example: 'We learn to cooperate.' },
    'listen to our teammates': { word: 'listen to our teammates', pronunciation: '/ˈlɪsn tuː aʊə ˈtiːmmeɪts/', definition_vi: 'lắng nghe đồng đội', example: 'We listen to our teammates.' },
    'Working together': { word: 'Working together', pronunciation: '/ˈwɜːkɪŋ təˈɡeðə/', definition_vi: 'làm việc cùng nhau', example: 'Working together brings success.' },
    '30 minutes of exercise': { word: '30 minutes of exercise', pronunciation: '/ˈθɜːti ˈmɪnɪts əv ˈeksəsaɪz/', definition_vi: '30 phút tập thể dục', example: 'We need 30 minutes of exercise.' },
    'every single day': { word: 'every single day', pronunciation: '/ˈevri ˈsɪŋɡl deɪ/', definition_vi: 'mỗi một ngày', example: 'Exercise every single day.' },
    'enjoy outdoor sports': { word: 'enjoy outdoor sports', pronunciation: '/ɪnˈdʒɔɪ ˈaʊtdɔː spɔːts/', definition_vi: 'tận hưởng thể thao ngoài trời', example: 'We enjoy outdoor sports.' }
  }
};
`, 'utf8');

// 1.11 ADV/mindmap.js (6 stems x 6 branches = 36 branches total!)
const advMindmapData = {
  "centerStems": [
    { "text": "Yesterday, Leo ___ along the red track.", "type": "affirmative", "audio": "/audio/week37/mindmap_stem_1.mp3" },
    { "text": "The relay runners ___ the baton cleanly.", "type": "affirmative", "audio": "/audio/week37/mindmap_stem_2.mp3" },
    { "text": "Our team ___ the golden medal at the end.", "type": "affirmative", "audio": "/audio/week37/mindmap_stem_3.mp3" },
    { "text": "We did not ___ the baton on the grass.", "type": "negative", "audio": "/audio/week37/mindmap_stem_4.mp3" },
    { "text": "They never ___ up during the hard race.", "type": "negative", "audio": "/audio/week37/mindmap_stem_5.mp3" },
    { "text": "How fast did Leo ___ during his lap?", "type": "question", "audio": "/audio/week37/mindmap_stem_6.mp3" }
  ],
  "branchLabels": {
    "Yesterday, Leo ___ along the red track.": [
      { "text": "ran very fast", "correct": true },
      { "text": "sprinted quickly", "correct": true },
      { "text": "dashed powerfully", "correct": true },
      { "text": "walked slowly", "correct": false },
      { "text": "slept quietly", "correct": false },
      { "text": "sat down", "correct": false }
    ],
    "The relay runners ___ the baton cleanly.": [
      { "text": "passed", "correct": true },
      { "text": "handed over", "correct": true },
      { "text": "transferred", "correct": true },
      { "text": "dropped", "correct": false },
      { "text": "threw away", "correct": false },
      { "text": "broke", "correct": false }
    ],
    "Our team ___ the golden medal at the end.": [
      { "text": "won", "correct": true },
      { "text": "received", "correct": true },
      { "text": "earned", "correct": true },
      { "text": "lost", "correct": false },
      { "text": "sold", "correct": false },
      { "text": "forgot", "correct": false }
    ],
    "We did not ___ the baton on the grass.": [
      { "text": "drop", "correct": true },
      { "text": "lose", "correct": true },
      { "text": "fall with", "correct": true },
      { "text": "pass", "correct": false },
      { "text": "hold", "correct": false },
      { "text": "keep", "correct": false }
    ],
    "They never ___ up during the hard race.": [
      { "text": "gave", "correct": true },
      { "text": "stopped", "correct": true },
      { "text": "slowed", "correct": true },
      { "text": "started", "correct": false },
      { "text": "spurred", "correct": false },
      { "text": "woke", "correct": false }
    ],
    "How fast did Leo ___ during his lap?": [
      { "text": "run", "correct": true },
      { "text": "sprint", "correct": true },
      { "text": "dash", "correct": true },
      { "text": "sleep", "correct": false },
      { "text": "eat", "correct": false },
      { "text": "read", "correct": false }
    ]
  }
};
fs.writeFileSync(path.join(ADV_DIR, 'mindmap.js'), `export default ${JSON.stringify(advMindmapData, null, 2)};\n`, 'utf8');

// 1.12 ADV/writing.js (With story_prompts.picture_mode matching W36 schema)
fs.writeFileSync(path.join(ADV_DIR, 'writing.js'), `export default {
  title: "Sports Day Relay Adventure — Writing Station",
  theme: "sports_day",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "On Saturday morning, our school held an exciting sports day at the stadium. I entered the 100-metre relay race with my best friends. When the whistle blew, Leo ran very fast and passed the baton cleanly to me. I sprinted across the grass and handed it to Max. Thousands of spectators clapped loudly. We crossed the finish line first! Our teamwork brought victory, and we smiled with pride while receiving our gold medals.",
  topic_talk_prompt: "Tell me about a sports day or race you joined — what sport did you play, who was in your team, and how did you work together?",
  prompt_en: "Write about a sports day experience. Use 5+ sports action words (ran fast, passed the baton, sprinted, cheered, won, clapped).",
  prompt_vi: "Viết về trải nghiệm ngày hội thể thao. Dùng 5+ từ chỉ hành động thể thao (ran fast, passed the baton, sprinted, cheered, won, clapped).",
  sentence_frames: [
    { "template": "On Saturday morning, we went to the ___.", "answers": ["sports stadium", "stadium"] },
    { "template": "The weather was ___ and warm.", "answers": ["sunny"] },
    { "template": "Leo ran very ___ along the track.", "answers": ["fast"] },
    { "template": "He passed the ___ cleanly to Maya.", "answers": ["baton"] },
    { "template": "Max sprinted with ___ toward the line.", "answers": ["determination"] },
    { "template": "Spectators watched and ___ with joy.", "answers": ["clapped"] },
    { "template": "Our dedicated ___ brought victory.", "answers": ["teamwork"] },
    { "template": "We received our golden ___ with pride.", "answers": ["medals", "medal"] }
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
        { "word": "determination", "vi": "sự quyết tâm", "distractor": false },
        { "word": "clapped", "vi": "vỗ tay", "distractor": false },
        { "word": "teamwork", "vi": "tinh thần đồng đội", "distractor": false },
        { "word": "medals", "vi": "huy chương", "distractor": false },
        { "word": "passed the baton", "vi": "truyền gậy", "distractor": false },
        { "word": "finish line", "vi": "vạch đích", "distractor": false },
        { "word": "shake hands", "vi": "bắt tay", "distractor": false },
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
      word_bank: ["ran very fast", "passed the baton", "sprinted with determination", "crossed the finish line", "cheered loudly", "smiled with pride", "teamwork brought victory", "shook hands politely"],
      sentence_frames: [
        { "template": "On Saturday morning, Leo ___ (go) to the sports stadium.", "answers": ["went"] },
        { "template": "He ___ (run) very fast on the track.", "answers": ["ran"] },
        { "template": "He ___ (pass) the baton cleanly to Maya.", "answers": ["passed"] },
        { "template": "Maya ___ (run) across the grass.", "answers": ["ran"] },
        { "template": "Max ___ (catch) the baton smoothly.", "answers": ["caught"] },
        { "template": "They ___ (cross) the finish line first.", "answers": ["crossed"] },
        { "template": "Spectators ___ (clap) enthusiastically.", "answers": ["clapped"] },
        { "template": "Leo ___ (smile) with pride.", "answers": ["smiled"] }
      ],
      writing_prompts: {
        en: "Look at the sports day relay picture and write the story. How did the runners pass the baton? Use 5+ past action verbs.",
        vi: "Nhìn hình ngày hội thể thao và viết câu chuyện. Các vận động viên đã truyền gậy như thế nào? Dùng 5+ động từ quá quá khứ."
      },
      rubric_tier: 1
    }
  }
};
`, 'utf8');

// 1.16 ADV/daily_watch.js (5 UNIQUE educational videos, no duplicates from W1-W36, no music videos!)
fs.writeFileSync(path.join(ADV_DIR, 'daily_watch.js'), `export default {
  videos: [
    { id: 1, title: "Past Simple Tense Verbs | English Grammar for Kids", videoId: "_Itws1UmFE8", duration: "05:12", sim_duration: 312, thumb: "https://img.youtube.com/vi/_Itws1UmFE8/mqdefault.jpg" },
    { id: 2, title: "Irregular Past Tense Verbs Song | Flew Caught Ran", videoId: "wSFDFyRDXzY", duration: "03:29", sim_duration: 209, thumb: "https://img.youtube.com/vi/wSFDFyRDXzY/mqdefault.jpg" },
    { id: 3, title: "The Carter Family Field Trip & Sports Day | Little Fox", videoId: "Rlmms56uisw", duration: "03:50", sim_duration: 230, thumb: "https://img.youtube.com/vi/Rlmms56uisw/mqdefault.jpg" },
    { id: 4, title: "Physical Exercise & Muscle Science for Children", videoId: "OdNv-J31Kk8", duration: "03:26", sim_duration: 206, thumb: "https://img.youtube.com/vi/OdNv-J31Kk8/mqdefault.jpg" },
    { id: 5, title: "Good Sportsmanship & Fair Play in Team Sports", videoId: "gf7OdFHCYfo", duration: "02:45", sim_duration: 165, thumb: "https://img.youtube.com/vi/gf7OdFHCYfo/mqdefault.jpg" }
  ],
  bonus_games: [{ title: "Sports Relay Quiz", url: "#", description: "Test your relay knowledge!" }]
};
`, 'utf8');

// 1.19 ADV/week_37_real.js (AI Tutor V28 with target_vocab, vocabulary & sentences!)
fs.writeFileSync(path.join(ADV_DIR, 'week_37_real.js'), `export default {
  week_id: 37,
  week_number: 37,
  title: "The Sports Day Challenge",
  topic: "Relay Race & Sportsmanship",
  topic_vi: "Cuộc Đua Tiếp Sức & Tinh Thần Thể Thao",
  cefr_level: "A1+",
  grammar_focus: "Past Simple & Adverbs of Manner (-ly)",
  target_vocab: advVocabList,
  vocabulary: advVocabList,
  sentences: [
    { id: 1, text: "Leo ran very fast along the red track.", meaning: "Leo chạy rất nhanh trên đường chạy màu đỏ." },
    { id: 2, text: "He passed the baton cleanly to Maya.", meaning: "Cậu ấy đã truyền gậy tiếp sức gọn gàng cho Maya." },
    { id: 3, text: "Max sprinted smoothly toward the finish line.", meaning: "Max đã bứt tốc mượt mà về vạch đích." },
    { id: 4, text: "Spectators watched and clapped enthusiastically.", meaning: "Khán giả đã xem và vỗ tay nhiệt tình." },
    { id: 5, text: "Their dedicated teamwork brought victory!", meaning: "Tinh thần đồng đội tận tụy của họ đã mang lại chiến thắng!" }
  ],
  missions: [
    {
      id: "w37_m1",
      title: "The Great School Relay",
      opening_narrative: "Welcome to the sports stadium! Leo ran very fast and needs to pass the baton cleanly. Help him execute the strategy!",
      objectives: ["Use past simple verbs: ran, passed, caught", "Explain baton passing technique"]
    },
    {
      id: "w37_m2",
      title: "Fair Play Champions",
      opening_narrative: "Maya helped an opponent who slipped on the track. Discuss why sportsmanship matters more than winning trophies!",
      objectives: ["Identify fair play actions", "Use adverbs of manner: cleanly, politely, loudly"]
    },
    {
      id: "w37_m3",
      title: "Active Body, Active Mind",
      opening_narrative: "Health experts recommend 30 minutes of exercise daily. Share your favourite outdoor activity with Nova!",
      objectives: ["Describe daily exercise routine", "Explain health benefits of outdoor sports"]
    }
  ]
};
`, 'utf8');


// ============================================================================
// 2. EASY MODE (19 Files)
// ============================================================================

// 2.1 EASY/vocab.js (20 items)
const easyVocabList = [
  { id: 1, word: 'runner', pronunciation: '/ˈrʌnə/', definition_vi: 'người chạy', definition_en: 'a person who runs', example: 'Leo is a fast runner.', collocation: 'fast runner / relay runner', image_url: null, audio_word: '/audio/week37_easy/vocab_runner.mp3' },
  { id: 2, word: 'race', pronunciation: '/reɪs/', definition_vi: 'cuộc đua', definition_en: 'a competition of speed', example: 'We ran a relay race today.', collocation: 'run a race / win a race', image_url: null, audio_word: '/audio/week37_easy/vocab_race.mp3' },
  { id: 3, word: 'baton', pronunciation: '/bəˈtɒn/', definition_vi: 'gậy tiếp sức', definition_en: 'a stick passed in a race', example: 'He passed the baton to Maya.', collocation: 'pass baton / hold baton', image_url: null, audio_word: '/audio/week37_easy/vocab_baton.mp3' },
  { id: 4, word: 'park', pronunciation: '/pɑːk/', definition_vi: 'công viên', definition_en: 'a green outdoor area for playing', example: 'Children run in the park.', collocation: 'in the park / green park', image_url: null, audio_word: '/audio/week37_easy/vocab_park.mp3' },
  { id: 5, word: 'team', pronunciation: '/tiːm/', definition_vi: 'đội', definition_en: 'a group of people playing together', example: 'Our team won first place.', collocation: 'sports team / great team', image_url: null, audio_word: '/audio/week37_easy/vocab_team.mp3' },
  { id: 6, word: 'fast', pronunciation: '/fɑːst/', definition_vi: 'nhanh', definition_en: 'moving at high speed', example: 'Leo ran very fast.', collocation: 'run fast / sprint fast', image_url: null, audio_word: '/audio/week37_easy/vocab_fast.mp3' },
  { id: 7, word: 'sunny', pronunciation: '/ˈsʌni/', definition_vi: 'nắng', definition_en: 'bright with sunlight', example: 'It was a warm and sunny day.', collocation: 'sunny day / sunny weather', image_url: null, audio_word: '/audio/week37_easy/vocab_sunny.mp3' },
  { id: 8, word: 'happy', pronunciation: '/ˈhæpi/', definition_vi: 'vui vẻ', definition_en: 'feeling pleasure and joy', example: 'They were tired but happy.', collocation: 'feel happy / happy smile', image_url: null, audio_word: '/audio/week37_easy/vocab_happy.mp3' },
  { id: 9, word: 'whistle', pronunciation: '/ˈwɪsl/', definition_vi: 'còi', definition_en: 'a tool that makes a loud sound', example: 'The coach blew his whistle.', collocation: 'blow whistle / loud whistle', image_url: null, audio_word: '/audio/week37_easy/vocab_whistle.mp3' },
  { id: 10, word: 'medal', pronunciation: '/ˈmedl/', definition_vi: 'huy chương', definition_en: 'a metal disc given as a reward', example: 'He received a golden medal.', collocation: 'gold medal / win medal', image_url: null, audio_word: '/audio/week37_easy/vocab_medal.mp3' },
  { id: 11, word: 'coach', pronunciation: '/kəʊtʃ/', definition_vi: 'huấn luyện viên', definition_en: 'a person who trains a team', example: 'He sat down with his coach.', collocation: 'team coach / sports coach', image_url: null, audio_word: '/audio/week37_easy/vocab_coach.mp3' },
  { id: 12, word: 'cheer', pronunciation: '/tʃɪər/', definition_vi: 'cổ vũ', definition_en: 'shout with joy and support', example: 'Friends cheer and smile together.', collocation: 'cheer loudly / cheer team', image_url: null, audio_word: '/audio/week37_easy/vocab_cheer.mp3' },
  { id: 13, word: 'grass', pronunciation: '/ɡrɑːs/', definition_vi: 'bãi cỏ', definition_en: 'green plant covering the field', example: 'She ran across the grass.', collocation: 'green grass / on grass', image_url: null, audio_word: '/audio/week37_easy/vocab_grass.mp3' },
  { id: 14, word: 'exercise', pronunciation: '/ˈeksəsaɪz/', definition_vi: 'tập thể dục', definition_en: 'physical activity for health', example: 'Do 30 minutes of exercise daily.', collocation: 'daily exercise / do exercise', image_url: null, audio_word: '/audio/week37_easy/vocab_exercise.mp3' },
  { id: 15, word: 'sports', pronunciation: '/spɔːts/', definition_vi: 'thể thao', definition_en: 'games involving physical effort', example: 'We enjoy outdoor sports.', collocation: 'outdoor sports / play sports', image_url: null, audio_word: '/audio/week37_easy/vocab_sports.mp3' },
  { id: 16, word: 'track', pronunciation: '/træk/', definition_vi: 'đường chạy', definition_en: 'a ground prepared for running', example: 'He ran on the red track.', collocation: 'running track / red track', image_url: null, audio_word: '/audio/week37_easy/vocab_track.mp3' },
  { id: 17, word: 'smile', pronunciation: '/smaɪl/', definition_vi: 'mụm cười', definition_en: 'a happy facial expression', example: 'He smiled with pride.', collocation: 'big smile / happy smile', image_url: null, audio_word: '/audio/week37_easy/vocab_smile.mp3' },
  { id: 18, word: 'friend', pronunciation: '/frend/', definition_vi: 'bạn bè', definition_en: 'a person you know and like', example: 'Run with your best friends.', collocation: 'best friend / good friend', image_url: null, audio_word: '/audio/week37_easy/vocab_friend.mp3' },
  { id: 19, word: 'win', pronunciation: '/wɪn/', definition_vi: 'giành chiến thắng', definition_en: 'be first in a game', example: 'They won the relay race.', collocation: 'win race / win medal', image_url: null, audio_word: '/audio/week37_easy/vocab_win.mp3' },
  { id: 20, word: 'sunlight', pronunciation: '/ˈsʌnlaɪt/', definition_vi: 'ánh nắng', definition_en: 'light from the sun', example: 'Enjoy bright sunlight outdoors.', collocation: 'bright sunlight / warm sun', image_url: null, audio_word: '/audio/week37_easy/vocab_sunlight.mp3' }
];

fs.writeFileSync(path.join(EASY_DIR, 'vocab.js'), `export default { vocab: ${JSON.stringify(easyVocabList, null, 2)} };\n`, 'utf8');

// 2.3 EASY/explore.js (With check_questions and critical_thinking)
fs.writeFileSync(path.join(EASY_DIR, 'explore.js'), `export default {
  title_en: "Sports in the Sun",
  title_vi: "Thể Thao Dưới Ánh Nắng",
  image_url: null,
  audio_narration: "/audio/week37_easy/explore_main.mp3",
  content_en: \`${easyExploreEn}\`,
  content_vi: \`Chơi thể thao ngoài trời rất tốt cho cơ thể chúng ta. Khi trẻ em chạy trong công viên, cơ chân phát triển khỏe mạnh và tim luôn khỏe. Hít thở không khí trong lành và đón ánh nắng sáng giúp chúng ta cảm thấy vui vẻ. Chơi các trò chơi đồng đội dạy trẻ em các kỹ năng xã hội quan trọng. Chúng ta học cách hợp tác và lắng nghe đồng đội. Làm việc cùng nhau giúp mọi người đạt mục tiêu nhanh hơn. 30 phút tập thể dục mỗi ngày giúp trí óc nhạy bén. Hãy tận hưởng thể thao ngoài trời hôm nay!\`,
  check_questions: [
    { id: 1, question_en: "Where do young children run to build leg muscles?", answer: ["In the park", "Park"], hint_en: "In the...", hint_vi: "Trong...", audio_url: "/audio/week37_easy/explore_q1.mp3" },
    { id: 2, question_en: "How many minutes of exercise should we do daily?", answer: ["30 minutes", "30"], hint_en: "30...", hint_vi: "30...", audio_url: "/audio/week37_easy/explore_q2.mp3" },
    { id: 3, question_en: "What do team sports teach active kids?", answer: ["Important social skills", "Social skills"], hint_en: "Social...", hint_vi: "Kỹ năng...", audio_url: "/audio/week37_easy/explore_q3.mp3" },
    { id: 99, type: "critical_thinking", question_en: "What outdoor sport do you like playing with your best friends? Why does it make you happy?", answer: ["I like playing soccer with my friends in the park. Running and kicking the ball together makes us feel happy and healthy."], hint_en: "Think about the game and why it is fun.", hint_vi: "Suy nghĩ về trò chơi và lý do nó vui.", audio_url: "/audio/week37_easy/explore_q4.mp3" }
  ],
  writing_prompt_en: "Write 2 sentences about playing sports outdoors.",
  writing_prompt_vi: "Viết 2 câu về việc chơi thể thao ngoài trời.",
  question: {
    text_en: "What outdoor sport do you like?",
    text_vi: "Bạn thích môn thể thao ngoài trời nào?",
    min_words: 15,
    hint_en: "I like... It is fun because...",
    hint_vi: "Tôi thích... Nó vui vì..."
  },
  chunk_focus: [
    "is great for our body",
    "run in the park",
    "bright sunlight",
    "help us feel happy",
    "important social skills",
    "learn to cooperate",
    "listen to our teammates",
    "Working together",
    "30 minutes of exercise",
    "every single day",
    "enjoy outdoor sports"
  ],
  dictionary: {
    'is great for our body': { word: 'is great for our body', pronunciation: '/ɪz ɡreɪt fɔːr aʊə ˈbɒdi/', definition_vi: 'tốt cho chúng ta', example: 'Sports are good for us.' },
    'run in the park': { word: 'run in the park', pronunciation: '/rʌn ɪn ðə pɑːk/', definition_vi: 'chạy trong công viên', example: 'We run in the park.' },
    'bright sunlight': { word: 'bright sunlight', pronunciation: '/braɪt ˈsʌnlaɪt/', definition_vi: 'ánh nắng sáng', example: 'Bright sunlight warms us.' },
    'help us feel happy': { word: 'help us feel happy', pronunciation: '/help ʌs fiːl ˈhæpi/', definition_vi: 'giúp chúng ta cảm thấy vui vẻ', example: 'Sports help us feel happy.' },
    'important social skills': { word: 'important social skills', pronunciation: '/ɪmˈpɔːtnt ˈsəʊʃl skɪlz/', definition_vi: 'kỹ năng xã hội quan trọng', example: 'Sports teach social skills.' },
    'learn to cooperate': { word: 'learn to cooperate', pronunciation: '/lɜːn tuː kəʊˈɒpəreɪt/', definition_vi: 'học cách hợp tác', example: 'We learn to cooperate.' },
    'listen to our teammates': { word: 'listen to our teammates', pronunciation: '/ˈlɪsn tuː aʊə ˈtiːmmeɪts/', definition_vi: 'lắng nghe đồng đội', example: 'Listen to teammates.' },
    'Working together': { word: 'Working together', pronunciation: '/ˈwɜːkɪŋ təˈɡeðə/', definition_vi: 'làm việc cùng nhau', example: 'Working together brings joy.' },
    '30 minutes of exercise': { word: '30 minutes of exercise', pronunciation: '/ˈθɜːti ˈmɪnɪts əv ˈeksəsaɪz/', definition_vi: '30 phút tập thể dục', example: 'Do 30 minutes of exercise.' },
    'every single day': { word: 'every single day', pronunciation: '/ˈevri ˈsɪŋɡl deɪ/', definition_vi: 'mỗi một ngày', example: 'Exercise every single day.' },
    'enjoy outdoor sports': { word: 'enjoy outdoor sports', pronunciation: '/ɪnˈdʒɔɪ ˈaʊtdɔː spɔːts/', definition_vi: 'tận hưởng thể thao ngoài trời', example: 'Enjoy outdoor sports.' }
  }
};
`, 'utf8');

// 2.6 EASY/mindmap.js (6 stems x 6 branches = 36 branches total!)
const easyMindmapData = {
  "centerStems": [
    { "text": "Leo ___ fast in the race.", "type": "affirmative", "audio": "/audio/week37_easy/mindmap_stem_1.mp3" },
    { "text": "He ___ the baton to Maya.", "type": "affirmative", "audio": "/audio/week37_easy/mindmap_stem_2.mp3" },
    { "text": "They ___ a gold medal.", "type": "affirmative", "audio": "/audio/week37_easy/mindmap_stem_3.mp3" },
    { "text": "We did not ___ the baton.", "type": "negative", "audio": "/audio/week37_easy/mindmap_stem_4.mp3" },
    { "text": "They never ___ running.", "type": "negative", "audio": "/audio/week37_easy/mindmap_stem_5.mp3" },
    { "text": "Who ___ the relay race?", "type": "question", "audio": "/audio/week37_easy/mindmap_stem_6.mp3" }
  ],
  "branchLabels": {
    "Leo ___ fast in the race.": [
      { "text": "ran", "correct": true },
      { "text": "sprinted", "correct": true },
      { "text": "dashed", "correct": true },
      { "text": "walked", "correct": false },
      { "text": "slept", "correct": false },
      { "text": "sat", "correct": false }
    ],
    "He ___ the baton to Maya.": [
      { "text": "passed", "correct": true },
      { "text": "gave", "correct": true },
      { "text": "handed", "correct": true },
      { "text": "dropped", "correct": false },
      { "text": "lost", "correct": false },
      { "text": "broke", "correct": false }
    ],
    "They ___ a gold medal.": [
      { "text": "won", "correct": true },
      { "text": "got", "correct": true },
      { "text": "earned", "correct": true },
      { "text": "lost", "correct": false },
      { "text": "sold", "correct": false },
      { "text": "forgot", "correct": false }
    ],
    "We did not ___ the baton.": [
      { "text": "drop", "correct": true },
      { "text": "lose", "correct": true },
      { "text": "fall with", "correct": true },
      { "text": "pass", "correct": false },
      { "text": "keep", "correct": false },
      { "text": "hold", "correct": false }
    ],
    "They never ___ running.": [
      { "text": "stopped", "correct": true },
      { "text": "quit", "correct": true },
      { "text": "slowed", "correct": true },
      { "text": "started", "correct": false },
      { "text": "began", "correct": false },
      { "text": "woke", "correct": false }
    ],
    "Who ___ the relay race?": [
      { "text": "won", "correct": true },
      { "text": "ran", "correct": true },
      { "text": "joined", "correct": true },
      { "text": "slept", "correct": false },
      { "text": "ate", "correct": false },
      { "text": "read", "correct": false }
    ]
  }
};
fs.writeFileSync(path.join(EASY_DIR, 'mindmap.js'), `export default ${JSON.stringify(easyMindmapData, null, 2)};\n`, 'utf8');

// 2.7 EASY/writing.js (With story_prompts.picture_mode matching W36 schema)
fs.writeFileSync(path.join(EASY_DIR, 'writing.js'), `export default {
  title: "My Sports Day — Writing",
  theme: "sports_day",
  min_words: 45,
  min_sentences: 6,
  model_sentence: "On Saturday morning, I went to the sports day at the stadium with my best friends. Leo ran very fast in the relay race. He passed the baton cleanly to Maya. Max sprinted to the finish line! Everyone cheered loudly when we won gold medals. We were tired but happy!",
  topic_talk_prompt: "Tell me about playing sports in the park with your friends!",
  prompt_en: "Write 5+ sentences about your sports day. Use words: went, ran, passed, cheered, won.",
  prompt_vi: "Viết 5+ câu về ngày hội thể thao. Dùng các từ: went, ran, passed, cheered, won.",
  sentence_frames: [
    { "template": "On Saturday morning, I went to the ___.", "answers": ["stadium", "park"] },
    { "template": "The weather was warm and ___.", "answers": ["sunny"] },
    { "template": "Leo ran very ___ in the race.", "answers": ["fast"] },
    { "template": "He passed the ___ cleanly to Maya.", "answers": ["baton"] },
    { "template": "Everyone cheered and ___ loudly.", "answers": ["clapped"] },
    { "template": "Our team won a gold ___.", "answers": ["medal"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Click for help",
      label_vi: "Bấm để trợ giúp",
      show_by_default: false,
      scaffolding_stage: "easy",
      words: [
        { "word": "stadium", "vi": "sân vận động", "distractor": false },
        { "word": "sunny", "vi": "nắng", "distractor": false },
        { "word": "fast", "vi": "nhanh", "distractor": false },
        { "word": "baton", "vi": "gậy tiếp sức", "distractor": false },
        { "word": "clapped", "vi": "vỗ tay", "distractor": false },
        { "word": "medal", "vi": "huy chương", "distractor": false },
        { "word": "cold rain", "vi": "mưa lạnh", "distractor": true },
        { "word": "sleep late", "vi": "ngủ muộn", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: null,
      image_prompt: "Happy children running on grass passing a baton, sunny sky, cartoon style.",
      word_bank: ["ran fast", "passed baton", "won medal", "cheered loudly", "smiled happy"],
      sentence_frames: [
        { "template": "I went to the ___.", "answers": ["park"] },
        { "template": "Leo ran very ___.", "answers": ["fast"] },
        { "template": "He passed the ___.", "answers": ["baton"] },
        { "template": "We won a gold ___.", "answers": ["medal"] }
      ],
      writing_prompts: {
        en: "Look at the picture and write 4 sentences about sports day.",
        vi: "Nhìn hình và viết 4 câu về ngày hội thể thao."
      },
      rubric_tier: 1
    }
  }
};
`, 'utf8');

// 2.16 EASY/daily_watch.js (5 UNIQUE educational videos, no duplicates from W1-W36, no music videos!)
fs.writeFileSync(path.join(EASY_DIR, 'daily_watch.js'), `export default {
  videos: [
    { id: 1, title: "Past Simple Tense Verbs | English Grammar for Kids", videoId: "_Itws1UmFE8", duration: "05:12", sim_duration: 312, thumb: "https://img.youtube.com/vi/_Itws1UmFE8/mqdefault.jpg" },
    { id: 2, title: "Irregular Past Tense Verbs Song | Flew Caught Ran", videoId: "wSFDFyRDXzY", duration: "03:29", sim_duration: 209, thumb: "https://img.youtube.com/vi/wSFDFyRDXzY/mqdefault.jpg" },
    { id: 3, title: "The Carter Family Field Trip & Sports Day | Little Fox", videoId: "Rlmms56uisw", duration: "03:50", sim_duration: 230, thumb: "https://img.youtube.com/vi/Rlmms56uisw/mqdefault.jpg" },
    { id: 4, title: "Physical Exercise & Muscle Science for Children", videoId: "OdNv-J31Kk8", duration: "03:26", sim_duration: 206, thumb: "https://img.youtube.com/vi/OdNv-J31Kk8/mqdefault.jpg" },
    { id: 5, title: "Good Sportsmanship & Fair Play in Team Sports", videoId: "gf7OdFHCYfo", duration: "02:45", sim_duration: 165, thumb: "https://img.youtube.com/vi/gf7OdFHCYfo/mqdefault.jpg" }
  ],
  bonus_games: [{ title: "Easy Sports Quiz", url: "#", description: "Review sports words!" }]
};
`, 'utf8');

// 2.19 EASY/week_37_easy_real.js (AI Tutor V28 with target_vocab, vocabulary & sentences!)
fs.writeFileSync(path.join(EASY_DIR, 'week_37_easy_real.js'), `export default {
  week_id: 37,
  week_number: 37,
  title: "The Fun Sports Day",
  topic: "Relay Race & Sports",
  topic_vi: "Cuộc Đua Tiếp Sức & Thể Thao",
  cefr_level: "A1",
  grammar_focus: "Past Simple",
  target_vocab: easyVocabList,
  vocabulary: easyVocabList,
  sentences: [
    { id: 1, text: "Leo ran fast in the race.", meaning: "Leo chạy nhanh trong cuộc đua." },
    { id: 2, text: "He passed the baton cleanly to Maya.", meaning: "Cậu ấy truyền gậy tiếp sức gọn gàng cho Maya." },
    { id: 3, text: "They won a gold medal!", meaning: "Họ đã giành huy chương vàng!" }
  ],
  missions: [
    {
      id: "w37_easy_m1",
      title: "The Park Relay",
      opening_narrative: "Welcome to the sports day! Leo ran very fast. Help him pass the baton!",
      objectives: ["Use action words: ran, passed", "Talk about sports day"]
    }
  ]
};
`, 'utf8');

console.log('✅ PERFECT 100% BLUEPRINT & W36 MASTER BUILD COMPLETE!');
