import fs from 'fs';
import path from 'path';

console.log('🚀 Starting Week 37 Production (Golden Standard Week 36 Pipeline)...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// --- 1. ADVANCED MODE FILES ---

// vocab.js
fs.writeFileSync(path.join(ADV_DIR, 'vocab.js'), `export default [
  { word: "athlete", pronunciation: "/ˈæθliːt/", definition_vi: "vận động viên", definition_en: "A person who is proficient in sports and physical exercises.", example: "The athlete ran very fast along the track.", audio_word: "/audio/week37/vocab_athlete.mp3" },
  { word: "relay", pronunciation: "/ˈriːleɪ/", definition_vi: "cuộc đua tiếp sức", definition_en: "A race between teams in which each member runs a distance.", example: "Our team won the school relay race.", audio_word: "/audio/week37/vocab_relay.mp3" },
  { word: "baton", pronunciation: "/bəˈtɒn/", definition_vi: "gậy tiếp sức", definition_en: "A short stick passed from one runner to another in a relay race.", example: "She passed the baton smoothly to her teammate.", audio_word: "/audio/week37/vocab_baton.mp3" },
  { word: "stadium", pronunciation: "/ˈsteɪdiəm/", definition_vi: "sân vận động", definition_en: "A large sports arena with seats for spectators.", example: "The stadium was full of cheering fans.", audio_word: "/audio/week37/vocab_stadium.mp3" },
  { word: "teamwork", pronunciation: "/ˈtiːmwɜːk/", definition_vi: "tinh thần đồng đội", definition_en: "The combined action of a group of people working together.", example: "Teamwork helped us finish first place.", audio_word: "/audio/week37/vocab_teamwork.mp3" }
];
`, 'utf8');

// read.js
fs.writeFileSync(path.join(ADV_DIR, 'read.js'), `export default {
  title: "The Sports Day Challenge",
  image_url: "/images/week37/read_cover_w37.jpg",
  audio_url: "/audio/week37/read_main.mp3",
  content_en: "On **Saturday morning**, Leo and his classmates **went to the sports stadium** for the annual sports day. The weather **was sunny and warm**, and everyone felt excited.\n\n**First of all**, Leo entered the 100-metre relay. He **sat down with his coach** before the race to discuss their plan. When the whistle blew, Leo **ran very fast** along the track and **passed the baton** cleanly to Maya.\n\n**In Panel One**, Maya **ran across the grass** with great speed. **In Panel Two**, Max **caught the baton** and sprinted towards the finish line. Everyone **watched and clapped** enthusiastically.\n\n**At the very end**, their team crossed the finish line first! They **were tired but happy** because their **teamwork brought victory**. Leo **smiled with pride** as he received a golden medal.",
  content_vi: "Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để tham gia ngày hội thể thao hàng năm. Thời tiết nắng ấm và ai nấy đều cảm thấy hào hứng.\n\nTrước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi xuống với huấn luyện viên trước cuộc đua để thảo luận kế hoạch. Khi tiếng còi vang lên, Leo chạy rất nhanh dọc theo đường chạy và truyền gậy tiếp sức gọn gàng cho Maya.\n\nỞ Khung 1, Maya chạy qua bãi cỏ với tốc độ lớn. Ở Khung 2, Max bắt lấy gậy tiếp sức và bứt tốc về đích. Mọi người xem và vỗ tay nhiệt tình.\n\nCuối cùng, đội của họ đã cán đích đầu tiên! Họ mệt nhưng rất vui vì tinh thần đồng đội đã mang lại chiến thắng. Leo mỉm cười tự hào khi nhận huy chương vàng.",
  comprehension_questions: [
    { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the sports stadium", "He went to the sports stadium"], clue_statement: "Leo went to the sports stadium on Saturday morning.", hint_en: "He went to the sports...", hint_vi: "Cậu ấy đến sân..." },
    { id: 2, question_en: "What did Leo do before passing the baton?", answer: ["He ran very fast", "He ran very fast along the track"], clue_statement: "Leo ran very fast along the track.", hint_en: "He ran very...", hint_vi: "Cậu ấy chạy rất..." },
    { id: 3, question_en: "How did the team feel at the end?", answer: ["Tired but happy", "They were tired but happy"], clue_statement: "They were tired but happy.", hint_en: "They were tired but...", hint_vi: "Họ mệt nhưng..." }
  ]
};

export const chunk_focus = [
  "Saturday morning",
  "went to the sports stadium",
  "was sunny and warm",
  "First of all",
  "sat down with his coach",
  "ran very fast",
  "passed the baton",
  "In Panel One",
  "ran across the grass",
  "In Panel Two",
  "caught the baton",
  "watched and clapped",
  "At the very end",
  "were tired but happy",
  "teamwork brought victory",
  "smiled with pride"
];

export const dictionary = {
  'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', definition_en: 'Morning of Saturday', example: 'On Saturday morning, we went to the field.' },
  'went to the sports stadium': { word: 'went to the sports stadium', pronunciation: '/went tuː ðə spɔːts ˈsteɪdiəm/', definition_vi: 'đã đến sân vận động thể thao', definition_en: 'Traveled to the sports stadium', example: 'Leo went to the sports stadium.' },
  'was sunny and warm': { word: 'was sunny and warm', pronunciation: '/wəz ˈsʌni ənd wɔːm/', definition_vi: 'trời nắng và ấm áp', definition_en: 'Bright and pleasant weather', example: 'The morning was sunny and warm.' },
  'First of all': { word: 'First of all', pronunciation: '/fɜːst əv ɔːl/', definition_vi: 'trước tiên / đầu tiên', definition_en: 'Before anything else', example: 'First of all, he ran the first lap.' },
  'sat down with his coach': { word: 'sat down with his coach', pronunciation: '/sæt daʊn wɪð hɪz kəʊtʃ/', definition_vi: 'ngồi xuống với huấn luyện viên', definition_en: 'Seated together with the instructor', example: 'He sat down with his coach.' },
  'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', definition_en: 'Moved at high speed on foot', example: 'Leo ran very fast.' },
  'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy tiếp sức', definition_en: 'Handed over the relay stick', example: 'He passed the baton smoothly.' },
  'In Panel One': { word: 'In Panel One', pronunciation: '/ɪn ˈpænl wʌn/', definition_vi: 'ở khung thứ nhất', definition_en: 'In the first comic panel', example: 'In Panel One, Maya ran.' },
  'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', definition_en: 'Sprinted over the green lawn', example: 'Maya ran across the grass.' },
  'In Panel Two': { word: 'In Panel Two', pronunciation: '/ɪn ˈpænl tuː/', definition_vi: 'ở khung thứ hai', definition_en: 'In the second comic panel', example: 'In Panel Two, Max caught it.' },
  'caught the baton': { word: 'caught the baton', pronunciation: '/kɔːt ðə bəˈtɒn/', definition_vi: 'bắt lấy gậy tiếp sức', definition_en: 'Received the relay baton', example: 'Max caught the baton.' },
  'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', definition_en: 'Observed and applauded', example: 'Everyone watched and clapped.' },
  'At the very end': { word: 'At the very end', pronunciation: '/æt ðə ˈveri end/', definition_vi: 'cuối cùng', definition_en: 'At the conclusion', example: 'At the very end, they won.' },
  'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', definition_en: 'Exhausted yet cheerful', example: 'They were tired but happy.' },
  'teamwork brought victory': { word: 'teamwork brought victory', pronunciation: '/ˈtiːmwɜːk brɔːt ˈvɪktəri/', definition_vi: 'tinh thần đồng đội mang lại chiến thắng', definition_en: 'Cooperation led to success', example: 'Their teamwork brought victory.' },
  'smiled with pride': { word: 'smiled with pride', pronunciation: '/smaɪld wɪð praɪd/', definition_vi: 'mỉm cười tự hào', definition_en: 'Grinned proudly', example: 'Leo smiled with pride.' }
};
`, 'utf8');

// explore.js
fs.writeFileSync(path.join(ADV_DIR, 'explore.js'), `export default {
  title: "Why Outdoor Sports Keep Us Healthy",
  image_url: "/images/week37/explore_cover_w37.jpg",
  audio_url: "/audio/week37/explore_main.mp3",
  content_en: "Playing outdoor sports **is great for our body**. When we **run in the park**, our muscles grow strong and our heart stays healthy. Fresh air and **bright sunlight** also **help us feel happy**.\n\nSports teach us **important social skills**. When we play team games like football or basketball, we **learn to cooperate** and **listen to our teammates**. **Working together** helps everyone achieve more than playing alone.\n\nScientists say that **30 minutes of exercise** **every single day** improves concentration at school. So put on your trainers and **enjoy outdoor sports** today!",
  content_vi: "Chơi thể thao ngoài trời rất tốt cho cơ thể chúng ta. Khi chúng ta chạy trong công viên, cơ bắp phát triển khỏe mạnh và tim luôn khỏe. Không khí trong lành và ánh nắng ấm áp cũng giúp chúng ta cảm thấy vui vẻ.\n\nThể thao dạy chúng ta các kỹ năng xã hội quan trọng. Khi chơi các trò chơi đồng đội như bóng đá hay bóng rổ, chúng ta học cách hợp tác và lắng nghe đồng đội. Làm việc cùng nhau giúp mọi người đạt được nhiều hơn là chơi một mình.\n\nCác nhà khoa học nói rằng 30 phút tập thể dục mỗi ngày cải thiện sự tập trung tại trường. Vì vậy hãy xỏ giày thể thao và tận hưởng thể thao ngoài trời hôm nay!",
  comprehension_questions: [
    { id: 1, question_en: "What happens when we run in the park?", answer: ["Our muscles grow strong and heart stays healthy"], clue_statement: "Our muscles grow strong and our heart stays healthy when we run in the park.", hint_en: "Our muscles grow...", hint_vi: "Cơ bắp phát triển..." }
  ]
};

export const chunk_focus = [
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
];

export const dictionary = {
  'is great for our body': { word: 'is great for our body', pronunciation: '/ɪz ɡreɪt fɔːr aʊə ˈbɒdi/', definition_vi: 'thật tuyệt vời cho cơ thể', definition_en: 'Is beneficial for physical health', example: 'Playing sports is great for our body.' },
  'run in the park': { word: 'run in the park', pronunciation: '/rʌn ɪn ðə pɑːk/', definition_vi: 'chạy trong công viên', definition_en: 'Sprint outdoors in green spaces', example: 'We run in the park every morning.' },
  'bright sunlight': { word: 'bright sunlight', pronunciation: '/braɪt ˈsʌnlaɪt/', definition_vi: 'ánh nắng sáng', definition_en: 'Strong natural light', example: 'The bright sunlight warms the field.' },
  'help us feel happy': { word: 'help us feel happy', pronunciation: '/help ʌs fiːl ˈhæpi/', definition_vi: 'giúp chúng ta cảm thấy vui vẻ', definition_en: 'Assist in mood improvement', example: 'Fresh air helps us feel happy.' },
  'important social skills': { word: 'important social skills', pronunciation: '/ɪmˈpɔːtnt ˈsəʊʃl skɪlz/', definition_vi: 'kỹ năng xã hội quan trọng', definition_en: 'Crucial interpersonal abilities', example: 'Sports teach important social skills.' },
  'learn to cooperate': { word: 'learn to cooperate', pronunciation: '/lɜːn tuː kəʊˈɒpəreɪt/', definition_vi: 'học cách hợp tác', definition_en: 'Understand how to work with others', example: 'Players learn to cooperate.' },
  'listen to our teammates': { word: 'listen to our teammates', pronunciation: '/ˈlɪsn tuː aʊə ˈtiːmmeɪts/', definition_vi: 'lắng nghe đồng đội', definition_en: 'Pay attention to fellow team members', example: 'We listen to our teammates.' },
  'Working together': { word: 'Working together', pronunciation: '/ˈwɜːkɪŋ təˈɡeðə/', definition_vi: 'làm việc cùng nhau', definition_en: 'Collaborating in a group', example: 'Working together brings success.' },
  '30 minutes of exercise': { word: '30 minutes of exercise', pronunciation: '/ˈθɜːti ˈmɪnɪts əv ˈeksəsaɪz/', definition_vi: '30 phút tập thể dục', definition_en: 'Half an hour of physical activity', example: 'We need 30 minutes of exercise daily.' },
  'every single day': { word: 'every single day', pronunciation: '/ˈevri ˈsɪŋɡl deɪ/', definition_vi: 'mỗi một ngày', definition_en: 'Daily without exception', example: 'She practices every single day.' },
  'enjoy outdoor sports': { word: 'enjoy outdoor sports', pronunciation: '/ɪnˈdʒɔɪ ˈaʊtdɔː spɔːts/', definition_vi: 'tận hưởng thể thao ngoài trời', definition_en: 'Have fun with open-air games', example: 'Kids enjoy outdoor sports.' }
};
`, 'utf8');

// grammar.js
fs.writeFileSync(path.join(ADV_DIR, 'grammar.js'), `export default {
  title: "Past Simple & Adverbs of Manner",
  explanation_en: "Use Past Simple for completed actions and Adverbs of Manner (-ly) to show how an action was done.",
  explanation_vi: "Dùng Quá khứ đơn cho hành động đã hoàn thành và Trạng từ chỉ cách thức (-ly) để mô tả cách hành động diễn ra.",
  questions: [
    { id: 1, sentence: "Leo _____ fast along the track.", options: ["ran", "run", "running"], answer: "ran" },
    { id: 2, sentence: "Maya passed the baton _____ to her teammate.", options: ["smoothly", "smooth", "smoothing"], answer: "smoothly" }
  ]
};
`, 'utf8');

// singapore_math.js
fs.writeFileSync(path.join(ADV_DIR, 'singapore_math.js'), `export default {
  title: "Relay Race Distance & Time",
  problems: [
    { id: 1, text_en: "The track is 100 metres long. If 4 runners each run 1 lap, what is the total distance?", answer: "400 metres" }
  ]
};
`, 'utf8');

// word_match.js, dictation.js, shadowing.js, shadowing_ipa.js, mindmap.js, writing.js, word_power.js, logic_science.js, social_quiz.js, ask_ai.js, daily_watch.js, games.js, index.js, week_37_real.js
fs.writeFileSync(path.join(ADV_DIR, 'word_match.js'), `export default [ { id: 1, word: "athlete", match: "vận động viên" } ];\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'dictation.js'), `export default { title: "Sports Day Dictation", sentences: ["Leo ran very fast along the track."] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'shadowing.js'), `export default { title: "Sports Relay Shadowing", script: "Leo passed the baton cleanly to Maya." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'shadowing_ipa.js'), `export default { title: "Shadowing IPA", script_ipa: "/liːəʊ pɑːst ðə bəˈtɒn ˈkliːnli tuː ˈmaɪə/" };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'mindmap.js'), `export default { title: "Outdoor Sports Mindmap", nodes: [{ id: "root", label: "Sports" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'writing.js'), `export default { title: "My Favourite Outdoor Sport", prompt: "Write about a sport you like playing with friends." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'word_power.js'), `export default { title: "Sports Collocations", words: ["pass the baton", "win a medal"] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'logic_science.js'), `export default { title: "Heart Rate & Exercise", concept: "Exercise makes our heart beat faster to pump oxygen." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'social_quiz.js'), `export default { title: "Fair Play & Teamwork", questions: [{ id: 1, question: "What should you do after a race?", answer: "Shake hands with opponents" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'ask_ai.js'), `export default { title: "Spark Talk - Sports Day", nova_greeting: "Hi! What is your favourite outdoor sport?" };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'daily_watch.js'), `export default { videoId: "kJQP7kiw5Fk", title: "Kids Sports Relay" };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'games.js'), `export default { games: [{ id: "relay_dash", name: "Relay Dash Game" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'week_37_real.js'), `export default { week: 37, title: "The Sports Day Challenge" };\n`, 'utf8');

fs.writeFileSync(path.join(ADV_DIR, 'index.js'), `import vocab from './vocab.js';
import read from './read.js';
import explore from './explore.js';
import grammar from './grammar.js';
import singapore_math from './singapore_math.js';
import word_match from './word_match.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import shadowing_ipa from './shadowing_ipa.js';
import mindmap from './mindmap.js';
import writing from './writing.js';
import word_power from './word_power.js';
import logic_science from './logic_science.js';
import social_quiz from './social_quiz.js';
import ask_ai from './ask_ai.js';
import daily_watch from './daily_watch.js';
import games from './games.js';

export default {
  weekNumber: 37,
  title: "The Sports Day Challenge",
  vocab,
  read,
  explore,
  grammar,
  singapore_math,
  word_match,
  dictation,
  shadowing,
  shadowing_ipa,
  mindmap,
  writing,
  word_power,
  logic_science,
  social_quiz,
  ask_ai,
  daily_watch,
  games
};
`, 'utf8');


// --- 2. EASY MODE FILES ---

fs.writeFileSync(path.join(EASY_DIR, 'vocab.js'), `export default [
  { word: "runner", pronunciation: "/ˈrʌnə/", definition_vi: "người chạy", definition_en: "A person who runs.", example: "The runner was fast.", audio_word: "/audio/week37_easy/vocab_runner.mp3" },
  { word: "race", pronunciation: "/reɪs/", definition_vi: "cuộc đua", definition_en: "A competition of speed.", example: "We ran a race today.", audio_word: "/audio/week37_easy/vocab_race.mp3" }
];
`, 'utf8');

fs.writeFileSync(path.join(EASY_DIR, 'read.js'), `export default {
  title: "The Fun Sports Day",
  image_url: "/images/week37/read_cover_w37.jpg",
  audio_url: "/audio/week37_easy/read_main.mp3",
  content_en: "On **Saturday morning**, Leo **went to the park** for sports day. The sun **was warm and bright**.\n\nLeo **ran very fast** in the race. He **passed the baton** to his friend Maya. Maya **ran across the grass** quickly.\n\nEveryone **watched and clapped**. They **were tired but happy** when they won!",
  content_vi: "Vào sáng thứ Bảy, Leo đến công viên tham gia ngày hội thể thao. Mặt trời ấm và sáng.\n\nLeo chạy rất nhanh trong cuộc đua. Cậu ấy truyền gậy tiếp sức cho bạn Maya. Maya chạy qua bãi cỏ nhanh chóng.\n\nMọi người xem và vỗ tay. Họ mệt nhưng rất vui khi giành chiến thắng!",
  comprehension_questions: [
    { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the park"], clue_statement: "Leo went to the park on Saturday morning.", hint_en: "To the...", hint_vi: "Đến..." }
  ]
};

export const chunk_focus = [
  "Saturday morning",
  "went to the park",
  "was warm and bright",
  "ran very fast",
  "passed the baton",
  "ran across the grass",
  "watched and clapped",
  "were tired but happy"
];

export const dictionary = {
  'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', definition_en: 'Morning of Saturday', example: 'On Saturday morning, we went to the park.' },
  'went to the park': { word: 'went to the park', pronunciation: '/went tuː ðə pɑːk/', definition_vi: 'đã đến công viên', definition_en: 'Traveled to the park', example: 'Leo went to the park.' },
  'was warm and bright': { word: 'was warm and bright', pronunciation: '/wəz wɔːm ənd braɪt/', definition_vi: 'trời ấm và sáng', definition_en: 'Pleasant sunny weather', example: 'The day was warm and bright.' },
  'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', definition_en: 'Moved fast on foot', example: 'Leo ran very fast.' },
  'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy tiếp sức', definition_en: 'Handed over the stick', example: 'He passed the baton.' },
  'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', definition_en: 'Sprinted over grass', example: 'Maya ran across the grass.' },
  'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', definition_en: 'Applauded while watching', example: 'They watched and clapped.' },
  'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', definition_en: 'Tired yet cheerful', example: 'They were tired but happy.' }
};
`, 'utf8');

fs.writeFileSync(path.join(EASY_DIR, 'explore.js'), `export default {
  title: "Sports in the Sun",
  image_url: "/images/week37/explore_cover_w37.jpg",
  audio_url: "/audio/week37_easy/explore_main.mp3",
  content_en: "Sports **are good for us**. Running **in the park** makes our legs strong. We **play together** with our friends.\n\nExercise **every single day** helps us stay fit and healthy!",
  content_vi: "Thể thao rất tốt cho chúng ta. Chạy trong công viên làm chân chúng ta khỏe. Chúng ta chơi cùng nhau với bạn bè.\n\nTập thể dục mỗi ngày giúp chúng ta giữ dáng và khỏe mạnh!",
  comprehension_questions: [
    { id: 1, question_en: "What makes our legs strong?", answer: ["Running in the park"], clue_statement: "Running in the park makes our legs strong.", hint_en: "Running in...", hint_vi: "Chạy trong..." }
  ]
};

export const chunk_focus = [
  "are good for us",
  "in the park",
  "play together",
  "every single day"
];

export const dictionary = {
  'are good for us': { word: 'are good for us', pronunciation: '/ɑːr ɡʊd fɔːr ʌs/', definition_vi: 'tốt cho chúng ta', definition_en: 'Beneficial for health', example: 'Sports are good for us.' },
  'in the park': { word: 'in the park', pronunciation: '/ɪn ðə pɑːk/', definition_vi: 'trong công viên', definition_en: 'Inside green park', example: 'We run in the park.' },
  'play together': { word: 'play together', pronunciation: '/pleɪ təˈɡeðə/', definition_vi: 'chơi cùng nhau', definition_en: 'Play in a team', example: 'We play together.' },
  'every single day': { word: 'every single day', pronunciation: '/ˈevri ˈsɪŋɡl deɪ/', definition_vi: 'mỗi một ngày', definition_en: 'Daily', example: 'Exercise every single day.' }
};
`, 'utf8');

fs.writeFileSync(path.join(EASY_DIR, 'grammar.js'), `export default { title: "Past Simple Easy", questions: [{ id: 1, sentence: "Leo _____ fast.", options: ["ran", "run"], answer: "ran" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'singapore_math.js'), `export default { title: "Easy Relay Math", problems: [{ id: 1, text_en: "2 runners run 100m each. Total distance?", answer: "200m" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'word_match.js'), `export default [ { id: 1, word: "runner", match: "người chạy" } ];\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'dictation.js'), `export default { title: "Easy Dictation", sentences: ["Leo ran fast."] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'shadowing.js'), `export default { title: "Easy Shadowing", script: "Leo passed the baton." };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'shadowing_ipa.js'), `export default { title: "Easy Shadowing IPA", script_ipa: "/liːəʊ pɑːst ðə bəˈtɒn/" };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'mindmap.js'), `export default { title: "Easy Sports Mindmap", nodes: [{ id: "root", label: "Sports" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'writing.js'), `export default { title: "My Sport", prompt: "Write 1 sentence about your sport." };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'word_power.js'), `export default { title: "Easy Sports Words", words: ["run", "jump"] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'logic_science.js'), `export default { title: "Easy Science", concept: "Running keeps us healthy." };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'social_quiz.js'), `export default { title: "Easy Social", questions: [{ id: 1, question: "Should we cheer for friends?", answer: "Yes" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'ask_ai.js'), `export default { title: "Easy Spark Talk", nova_greeting: "Do you like running?" };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'daily_watch.js'), `export default { videoId: "kJQP7kiw5Fk", title: "Easy Sports Relay" };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'games.js'), `export default { games: [{ id: "relay_easy", name: "Easy Relay Game" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'week_37_easy_real.js'), `export default { week: 37, title: "The Fun Sports Day" };\n`, 'utf8');

fs.writeFileSync(path.join(EASY_DIR, 'index.js'), `import vocab from './vocab.js';
import read from './read.js';
import explore from './explore.js';
import grammar from './grammar.js';
import singapore_math from './singapore_math.js';
import word_match from './word_match.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import shadowing_ipa from './shadowing_ipa.js';
import mindmap from './mindmap.js';
import writing from './writing.js';
import word_power from './word_power.js';
import logic_science from './logic_science.js';
import social_quiz from './social_quiz.js';
import ask_ai from './ask_ai.js';
import daily_watch from './daily_watch.js';
import games from './games.js';

export default {
  weekNumber: 37,
  title: "The Fun Sports Day",
  vocab,
  read,
  explore,
  grammar,
  singapore_math,
  word_match,
  dictation,
  shadowing,
  shadowing_ipa,
  mindmap,
  writing,
  word_power,
  logic_science,
  social_quiz,
  ask_ai,
  daily_watch,
  games
};
`, 'utf8');

console.log('✅ Created 19 Advanced files and 19 Easy files for Week 37 (Total 38 files)!');
