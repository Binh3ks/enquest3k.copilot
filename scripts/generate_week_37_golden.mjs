import fs from 'fs';
import path from 'path';

console.log('🚀 Generating Week 37 using Golden Standard Week 36 Schema...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// ==========================================
// 1. ADVANCED MODE
// ==========================================

// vocab.js
fs.writeFileSync(path.join(ADV_DIR, 'vocab.js'), `export default {
  vocab: [
    { id: 1, word: 'athlete', pronunciation: '/ˈæθliːt/', definition_vi: 'vận động viên', definition_en: 'a person who is proficient in sports and physical exercises', example: 'The athlete ran very fast along the track.', collocation: 'star athlete / trained athlete', image_url: '/images/week37/vocab_athlete.jpg', audio_word: '/audio/week37/vocab_athlete.mp3' },
    { id: 2, word: 'relay', pronunciation: '/ˈriːleɪ/', definition_vi: 'cuộc đua tiếp sức', definition_en: 'a race between teams in which each member runs a distance', example: 'Our team won the school relay race.', collocation: 'relay race / relay team', image_url: '/images/week37/vocab_relay.jpg', audio_word: '/audio/week37/vocab_relay.mp3' },
    { id: 3, word: 'baton', pronunciation: '/bəˈtɒn/', definition_vi: 'gậy tiếp sức', definition_en: 'a short stick passed from one runner to another in a relay race', example: 'She passed the baton smoothly to her teammate.', collocation: 'pass the baton / hand over baton', image_url: '/images/week37/vocab_baton.jpg', audio_word: '/audio/week37/vocab_baton.mp3' },
    { id: 4, word: 'stadium', pronunciation: '/ˈsteɪdiəm/', definition_vi: 'sân vận động', definition_en: 'a large sports arena with seats for spectators', example: 'The stadium was full of cheering fans.', collocation: 'sports stadium / crowded stadium', image_url: '/images/week37/vocab_stadium.jpg', audio_word: '/audio/week37/vocab_stadium.mp3' },
    { id: 5, word: 'teamwork', pronunciation: '/ˈtiːmwɜːk/', definition_vi: 'tinh thần đồng đội', definition_en: 'the combined action of a group of people working together', example: 'Teamwork helped us finish first place.', collocation: 'great teamwork / teamwork brings victory', image_url: '/images/week37/vocab_teamwork.jpg', audio_word: '/audio/week37/vocab_teamwork.mp3' }
  ]
};
`, 'utf8');

// read.js (Dual tab schema: read_stem + read_social)
fs.writeFileSync(path.join(ADV_DIR, 'read.js'), `export default {
  content_en: "On Saturday morning, Leo and his classmates went to the sports stadium for the annual sports day. The weather was sunny and warm, and everyone felt excited. First of all, Leo entered the 100-metre relay. He sat down with his coach before the race to discuss their plan. When the whistle blew, Leo ran very fast along the track and passed the baton cleanly to Maya. In Panel One, Maya ran across the grass with great speed. In Panel Two, Max caught the baton and sprinted towards the finish line. Everyone watched and clapped enthusiastically. At the very end, their team crossed the finish line first! They were tired but happy because their teamwork brought victory. Leo smiled with pride as he received a golden medal.",
  sentences: [
    { id: 1, text: "On Saturday morning, Leo went to the sports stadium for sports day." },
    { id: 2, text: "The weather was sunny and warm, and everyone felt excited." },
    { id: 3, text: "First of all, Leo entered the 100-metre relay race." },
    { id: 4, text: "He sat down with his coach to discuss their plan." },
    { id: 5, text: "Leo ran very fast along the track." },
    { id: 6, text: "He passed the baton cleanly to Maya." },
    { id: 7, text: "Maya ran across the grass with great speed." },
    { id: 8, text: "Max caught the baton and sprinted to the finish line." },
    { id: 9, text: "Everyone watched and clapped enthusiastically." },
    { id: 10, text: "At the very end, their team crossed the line first!" }
  ],
  read_stem: {
    title_en: "The Great School Relay",
    subtitle_en: "Sports Day Challenge",
    image_url: "/images/week37/read_stem_w37.jpg",
    audio_url: "/audio/week37/read_stem.mp3",
    content_en: \`On **Saturday morning**, Leo and his classmates **went to the sports stadium** for the annual sports day. The weather **was sunny and warm**, and everyone felt excited.

**First of all**, Leo entered the 100-metre relay. He **sat down with his coach** before the race to discuss their plan. When the whistle blew, Leo **ran very fast** along the track and **passed the baton** cleanly to Maya.

**In Panel One**, Maya **ran across the grass** with great speed. **In Panel Two**, Max **caught the baton** and sprinted towards the finish line. Everyone **watched and clapped** enthusiastically.

**At the very end**, their team crossed the finish line first! They **were tired but happy** because their **teamwork brought victory**. Leo **smiled with pride** as he received a golden medal.\`,
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để tham gia ngày hội thể thao hàng năm. Thời tiết nắng ấm và ai nấy đều cảm thấy hào hứng.

Trước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi xuống với huấn luyện viên trước cuộc đua để thảo luận kế hoạch. Khi tiếng còi vang lên, Leo chạy rất nhanh dọc theo đường chạy và truyền gậy tiếp sức gọn gàng cho Maya.

Ở Khung 1, Maya chạy qua bãi cỏ với tốc độ lớn. Ở Khung 2, Max bắt lấy gậy tiếp sức và bứt tốc về đích. Mọi người xem và vỗ tay nhiệt tình.

Cuối cùng, đội của họ đã cán đích đầu tiên! Họ mệt nhưng rất vui vì tinh thần đồng đội đã mang lại chiến thắng. Leo mỉm cười tự hào khi nhận huy chương vàng.\`,
    key_vocabulary: [
      { word: "athlete", definition: "a person trained in sports", example: "The athlete ran fast." },
      { word: "relay", definition: "a team race passing a stick", example: "Our relay team won." },
      { word: "baton", definition: "stick passed in a relay", example: "He passed the baton." },
      { word: "stadium", definition: "large sports arena", example: "The stadium was full." },
      { word: "teamwork", definition: "working together as a team", example: "Teamwork brought victory." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the sports stadium", "He went to the sports stadium"], clue_statement: "Leo went to the sports stadium.", hint_en: "To the...", hint_vi: "Đến..." },
      { id: 2, question_en: "What did Leo do before passing the baton?", answer: ["He ran very fast", "He ran very fast along the track"], clue_statement: "Leo ran very fast.", hint_en: "He ran...", hint_vi: "Cậu ấy chạy..." }
    ]
  },
  read_social: {
    title_en: "Fair Play & Sportsmanship",
    subtitle_en: "Cheering for Everyone",
    image_url: "/images/week37/read_social_w37.jpg",
    audio_url: "/audio/week37/read_social.mp3",
    content_en: \`Winning a sports trophy feels wonderful, but respecting other players **is even more important**. When runners **finish the race**, they **shake hands with opponents** and **say kind words**.

**In Panel One**, Maya helped a runner who tripped on the track. **In Panel Two**, both teams **stood together with smiles**. True athletes show kindness whether they **win or lose**.\`,
    content_vi: \`Giành huy chương thể thao thật tuyệt vời, nhưng tôn trọng các đối thủ còn quan trọng hơn. Khi các vận động viên hoàn thành cuộc đua, họ bắt tay các đối thủ và nói những lời tốt đẹp.

Ở Khung 1, Maya giúp một vận động viên ngã trên đường chạy. Ở Khung 2, cả hai đội đứng cùng nhau với nụ cười. Những vận động viên chân chính thể hiện sự tốt bụng dù thắng hay thua.\`,
    comprehension_questions: [
      { id: 1, question_en: "What should runners do after the race?", answer: ["Shake hands with opponents"], clue_statement: "They shake hands with opponents.", hint_en: "Shake hands...", hint_vi: "Bắt tay..." }
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
    "In Panel One",
    "ran across the grass",
    "In Panel Two",
    "caught the baton",
    "watched and clapped",
    "At the very end",
    "were tired but happy",
    "teamwork brought victory",
    "smiled with pride",
    "is even more important",
    "finish the race",
    "shake hands with opponents",
    "say kind words",
    "stood together with smiles",
    "win or lose"
  ],
  dictionary: {
    'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', example: 'On Saturday morning, we went to the field.' },
    'went to the sports stadium': { word: 'went to the sports stadium', pronunciation: '/went tuː ðə spɔːts ˈsteɪdiəm/', definition_vi: 'đã đến sân vận động thể thao', example: 'Leo went to the sports stadium.' },
    'was sunny and warm': { word: 'was sunny and warm', pronunciation: '/wəz ˈsʌni ənd wɔːm/', definition_vi: 'trời nắng và ấm áp', example: 'The morning was sunny and warm.' },
    'First of all': { word: 'First of all', pronunciation: '/fɜːst əv ɔːl/', definition_vi: 'trước tiên', example: 'First of all, he ran the lap.' },
    'sat down with his coach': { word: 'sat down with his coach', pronunciation: '/sæt daʊn wɪð hɪz kəʊtʃ/', definition_vi: 'ngồi xuống với huấn luyện viên', example: 'He sat down with his coach.' },
    'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', example: 'Leo ran very fast.' },
    'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy tiếp sức', example: 'He passed the baton.' },
    'In Panel One': { word: 'In Panel One', pronunciation: '/ɪn ˈpænl wʌn/', definition_vi: 'ở khung thứ nhất', example: 'In Panel One, Maya ran.' },
    'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', example: 'Maya ran across the grass.' },
    'In Panel Two': { word: 'In Panel Two', pronunciation: '/ɪn ˈpænl tuː/', definition_vi: 'ở khung thứ hai', example: 'In Panel Two, Max caught it.' },
    'caught the baton': { word: 'caught the baton', pronunciation: '/kɔːt ðə bəˈtɒn/', definition_vi: 'bắt lấy gậy tiếp sức', example: 'Max caught the baton.' },
    'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', example: 'Everyone watched and clapped.' },
    'At the very end': { word: 'At the very end', pronunciation: '/æt ðə ˈveri end/', definition_vi: 'cuối cùng', example: 'At the very end, they won.' },
    'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', example: 'They were tired but happy.' },
    'teamwork brought victory': { word: 'teamwork brought victory', pronunciation: '/ˈtiːmwɜːk brɔːt ˈvɪktəri/', definition_vi: 'tinh thần đồng đội mang lại chiến thắng', example: 'Teamwork brought victory.' },
    'smiled with pride': { word: 'smiled with pride', pronunciation: '/smaɪld wɪð praɪd/', definition_vi: 'mỉm cười tự hào', example: 'Leo smiled with pride.' },
    'is even more important': { word: 'is even more important', pronunciation: '/ɪz ˈiːvn mɔːr ɪmˈpɔːtnt/', definition_vi: 'còn quan trọng hơn nữa', example: 'Respect is even more important.' },
    'finish the race': { word: 'finish the race', pronunciation: '/ˈfɪnɪʃ ðə reɪs/', definition_vi: 'hoàn thành cuộc đua', example: 'Runners finish the race.' },
    'shake hands with opponents': { word: 'shake hands with opponents', pronunciation: '/ʃeɪk hændz wɪð əˈpəʊnənts/', definition_vi: 'bắt tay các đối thủ', example: 'They shake hands with opponents.' },
    'say kind words': { word: 'say kind words', pronunciation: '/seɪ kaɪnd wɜːdz/', definition_vi: 'nói những lời tử tế', example: 'Always say kind words.' },
    'stood together with smiles': { word: 'stood together with smiles', pronunciation: '/stʊd təˈɡeðə wɪð smaɪlz/', definition_vi: 'đứng cùng nhau với nụ cười', example: 'Teams stood together with smiles.' },
    'win or lose': { word: 'win or lose', pronunciation: '/wɪn ɔː luːz/', definition_vi: 'thắng hay thua', example: 'Be kind whether you win or lose.' }
  }
};
`, 'utf8');

// explore.js
fs.writeFileSync(path.join(ADV_DIR, 'explore.js'), `export default {
  title: "Why Outdoor Sports Keep Us Healthy",
  image_url: "/images/week37/explore_cover_w37.jpg",
  audio_url: "/audio/week37/explore_main.mp3",
  content_en: \`Playing outdoor sports **is great for our body**. When we **run in the park**, our muscles grow strong and our heart stays healthy. Fresh air and **bright sunlight** also **help us feel happy**.

Sports teach us **important social skills**. When we play team games like football or basketball, we **learn to cooperate** and **listen to our teammates**. **Working together** helps everyone achieve more than playing alone.

Scientists say that **30 minutes of exercise** **every single day** improves concentration at school. So put on your trainers and **enjoy outdoor sports** today!\`,
  content_vi: \`Chơi thể thao ngoài trời rất tốt cho cơ thể chúng ta. Khi chúng ta chạy trong công viên, cơ bắp phát triển khỏe mạnh và tim luôn khỏe. Không khí trong lành và ánh nắng ấm áp cũng giúp chúng ta cảm thấy vui vẻ.

Thể thao dạy chúng ta các kỹ năng xã hội quan trọng. Khi chơi các trò chơi đồng đội như bóng đá hay bóng rổ, chúng ta học cách hợp tác và lắng nghe đồng đội. Làm việc cùng nhau giúp mọi người đạt được nhiều hơn là chơi một mình.

Các nhà khoa học nói rằng 30 phút tập thể dục mỗi ngày cải thiện sự tập trung tại trường. Vì vậy hãy xỏ giày thể thao và tận hưởng thể thao ngoài trời hôm nay!\`,
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

// games.js
fs.writeFileSync(path.join(ADV_DIR, 'games.js'), `export const week_37GamesAdvanced = {
  title: "Games: The Sports Day Challenge",
  image_url: null,
  audio_url: "/audio/week37/games_main.mp3",
  games: [
    { id: "sports_categories", type: "categories", title: "Sports Categories",
      categories: ["Gear", "Actions", "People"],
      sentences: [
        { text: "Baton", correct: "Gear" },
        { text: "Sprinted", correct: "Actions" },
        { text: "Athlete", correct: "People" }
      ]
    }
  ]
};

export default week_37GamesAdvanced;
`, 'utf8');

// grammar.js, singapore_math.js, word_match.js, dictation.js, shadowing.js, shadowing_ipa.js, mindmap.js, writing.js, word_power.js, logic_science.js, social_quiz.js, ask_ai.js, daily_watch.js
fs.writeFileSync(path.join(ADV_DIR, 'grammar.js'), `export default { title: "Past Simple & Adverbs of Manner (-ly)", questions: [{ id: 1, sentence: "Leo _____ fast.", options: ["ran", "run"], answer: "ran" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'singapore_math.js'), `export default { title: "Relay Race Distance", problems: [{ id: 1, text_en: "4 runners x 100m = ?", answer: "400m" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'word_match.js'), `export default [ { id: 1, word: "athlete", match: "vận động viên" } ];\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'dictation.js'), `export default { title: "Sports Dictation", sentences: ["Leo ran very fast."] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'shadowing.js'), `export default { title: "Sports Shadowing", script: "Leo passed the baton cleanly to Maya." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'shadowing_ipa.js'), `export default { title: "Shadowing IPA", script_ipa: "/liːəʊ pɑːst ðə bəˈtɒn/" };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'mindmap.js'), `export default { title: "Sports Mindmap", nodes: [{ id: "root", label: "Sports" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'writing.js'), `export default { title: "My Sport", prompt: "Write about your favourite sport." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'word_power.js'), `export default { title: "Sports Power Words", words: ["passed the baton", "ran fast"] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'logic_science.js'), `export default { title: "Heart & Sports", concept: "Sports keep our heart strong." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'social_quiz.js'), `export default { title: "Sports Fair Play", questions: [{ id: 1, question: "Should we shake hands?", answer: "Yes" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'ask_ai.js'), `export default { title: "Spark Talk Sports", nova_greeting: "Hi! What sport do you like?" };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'daily_watch.js'), `export default { videoId: "kJQP7kiw5Fk", title: "Sports Day Relay" };\n`, 'utf8');

// index.js (Advanced mode)
fs.writeFileSync(path.join(ADV_DIR, 'index.js'), `import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic_lab from './logic_science.js';
import social_quiz from './social_quiz.js';
import singapore_math from './singapore_math.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import { week_37GamesAdvanced as games } from './games.js';

const weekData = {
  weekId: 37,
  isEasy: false,
  weekTitle_en: "The Sports Day Challenge",
  weekTitle_vi: "Thách Thức Ngày Hội Thể Thao",
  grammar_focus: "Past Simple & Adverbs of Manner (-ly)",

  chunk_focus: [...new Set([...(read.chunk_focus || []), ...(explore.chunk_focus || [])])],
  dictionary: { ...(read.dictionary || {}), ...(explore.dictionary || {}) },

  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Journey-F',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    shadowing: 'en-US-Journey-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D',
    logic_lab: 'en-US-Neural2-D'
  },

  stations: {
    read_explore: { read_stem: read.read_stem, read_social: read.read_social },
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: { logic_lab, singapore_math, social_quiz },
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch,
    game_hub: games
  }
};

export default weekData;
`, 'utf8');

// week_37_real.js
fs.writeFileSync(path.join(ADV_DIR, 'week_37_real.js'), `import weekData from './index.js';

const week_37RealData = {
  ...weekData,
  week_id: 37,
  week_number: 37,
  title: "The Sports Day Challenge",
  topic: "Outdoor sports, relay races, adverbs of manner (-ly)",
  topic_vi: "Thể thao ngoài trời, đua tiếp sức, trạng từ chỉ cách thức (-ly)"
};

export default week_37RealData;
`, 'utf8');


// ==========================================
// 2. EASY MODE
// ==========================================

// vocab.js
fs.writeFileSync(path.join(EASY_DIR, 'vocab.js'), `export default {
  vocab: [
    { id: 1, word: 'runner', pronunciation: '/ˈrʌnə/', definition_vi: 'người chạy', definition_en: 'a person who runs', example: 'The runner was fast.', image_url: '/images/week37/vocab_runner.jpg', audio_word: '/audio/week37_easy/vocab_runner.mp3' },
    { id: 2, word: 'race', pronunciation: '/reɪs/', definition_vi: 'cuộc đua', definition_en: 'a competition of speed', example: 'We ran a race today.', image_url: '/images/week37/vocab_race.jpg', audio_word: '/audio/week37_easy/vocab_race.mp3' }
  ]
};
`, 'utf8');

// read.js (Easy mode)
fs.writeFileSync(path.join(EASY_DIR, 'read.js'), `export default {
  content_en: "On Saturday morning, Leo went to the park for sports day. The sun was warm and bright. Leo ran very fast in the race. He passed the baton to his friend Maya. Maya ran across the grass quickly. Everyone watched and clapped. They were tired but happy when they won!",
  sentences: [
    { id: 1, text: "On Saturday morning, Leo went to the park for sports day." },
    { id: 2, text: "The sun was warm and bright." },
    { id: 3, text: "Leo ran very fast in the race." },
    { id: 4, text: "He passed the baton to Maya." },
    { id: 5, text: "Maya ran across the grass quickly." },
    { id: 6, text: "Everyone watched and clapped." },
    { id: 7, text: "They were tired but happy when they won!" }
  ],
  read_stem: {
    title_en: "The Fun Sports Day",
    subtitle_en: "Park sports day",
    image_url: "/images/week37/read_stem_w37.jpg",
    audio_url: "/audio/week37_easy/read_stem.mp3",
    content_en: \`On **Saturday morning**, Leo **went to the park** for sports day. The sun **was warm and bright**.

Leo **ran very fast** in the race. He **passed the baton** to his friend Maya. Maya **ran across the grass** quickly.

Everyone **watched and clapped**. They **were tired but happy** when they won!\`,
    content_vi: \`Vào sáng thứ Bảy, Leo đến công viên tham gia ngày hội thể thao. Mặt trời ấm và sáng.

Leo chạy rất nhanh trong cuộc đua. Cậu ấy truyền gậy tiếp sức cho bạn Maya. Maya chạy qua bãi cỏ nhanh chóng.

Mọi người xem và vỗ tay. Họ mệt nhưng rất vui khi giành chiến thắng!\`,
    key_vocabulary: [
      { word: "runner", definition: "a person who runs", example: "Leo was a fast runner." },
      { word: "race", definition: "speed competition", example: "He ran in the race." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the park"], clue_statement: "Leo went to the park.", hint_en: "To the...", hint_vi: "Đến..." }
    ]
  },
  read_social: {
    title_en: "Happy Sports Day",
    subtitle_en: "Playing nicely",
    image_url: "/images/week37/read_social_w37.jpg",
    audio_url: "/audio/week37_easy/read_social.mp3",
    content_en: \`Sports days **are super fun**. Friends **cheer and smile** together.\`,
    content_vi: \`Ngày hội thể thao rất vui. Bạn bè cùng cổ vũ và mỉm cười.\`,
    comprehension_questions: [
      { id: 1, question_en: "Are sports days fun?", answer: ["Yes"], clue_statement: "Yes, sports days are fun.", hint_en: "Yes", hint_vi: "Có" }
    ]
  },
  chunk_focus: [
    "Saturday morning",
    "went to the park",
    "was warm and bright",
    "ran very fast",
    "passed the baton",
    "ran across the grass",
    "watched and clapped",
    "were tired but happy",
    "are super fun",
    "cheer and smile"
  ],
  dictionary: {
    'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', example: 'On Saturday morning, we went to the park.' },
    'went to the park': { word: 'went to the park', pronunciation: '/went tuː ðə pɑːk/', definition_vi: 'đã đến công viên', example: 'Leo went to the park.' },
    'was warm and bright': { word: 'was warm and bright', pronunciation: '/wəz wɔːm ənd braɪt/', definition_vi: 'trời ấm và sáng', example: 'The day was warm and bright.' },
    'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', example: 'Leo ran very fast.' },
    'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy tiếp sức', example: 'He passed the baton.' },
    'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', example: 'Maya ran across the grass.' },
    'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', example: 'They watched and clapped.' },
    'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', example: 'They were tired but happy.' },
    'are super fun': { word: 'are super fun', pronunciation: '/ɑːr ˈsuːpər fʌn/', definition_vi: 'rất là vui', example: 'Sports days are super fun.' },
    'cheer and smile': { word: 'cheer and smile', pronunciation: '/tʃɪər ənd smaɪl/', definition_vi: 'cổ vũ và mỉm cười', example: 'Friends cheer and smile.' }
  }
};
`, 'utf8');

// explore.js (Easy mode)
fs.writeFileSync(path.join(EASY_DIR, 'explore.js'), `export default {
  title: "Sports in the Sun",
  image_url: "/images/week37/explore_cover_w37.jpg",
  audio_url: "/audio/week37_easy/explore_main.mp3",
  content_en: \`Sports **are good for us**. Running **in the park** makes our legs strong. We **play together** with our friends.

Exercise **every single day** helps us stay fit and healthy!\`,
  content_vi: \`Thể thao rất tốt cho chúng ta. Chạy trong công viên làm chân chúng ta khỏe. Chúng ta chơi cùng nhau với bạn bè.

Tập thể dục mỗi ngày giúp chúng ta giữ dáng và khỏe mạnh!\`,
  chunk_focus: [
    "are good for us",
    "in the park",
    "play together",
    "every single day"
  ],
  dictionary: {
    'are good for us': { word: 'are good for us', pronunciation: '/ɑːr ɡʊd fɔːr ʌs/', definition_vi: 'tốt cho chúng ta', example: 'Sports are good for us.' },
    'in the park': { word: 'in the park', pronunciation: '/ɪn ðə pɑːk/', definition_vi: 'trong công viên', example: 'We run in the park.' },
    'play together': { word: 'play together', pronunciation: '/pleɪ təˈɡeðə/', definition_vi: 'chơi cùng nhau', example: 'We play together.' },
    'every single day': { word: 'every single day', pronunciation: '/ˈevri ˈsɪŋɡl deɪ/', definition_vi: 'mỗi một ngày', example: 'Exercise every single day.' }
  }
};
`, 'utf8');

// games.js (Easy mode)
fs.writeFileSync(path.join(EASY_DIR, 'games.js'), `export const week_37GamesEasy = {
  title: "Easy Sports Games",
  image_url: null,
  audio_url: "/audio/week37/games_easy.mp3",
  games: [
    { id: "sports_scramble", type: "sentence_scramble", title: "Easy Scramble",
      sentences: [
        { scrambled: ["I", "ran", "fast"], answer: "I ran fast." }
      ]
    }
  ]
};

export default week_37GamesEasy;
`, 'utf8');

fs.writeFileSync(path.join(EASY_DIR, 'grammar.js'), `export default { title: "Past Simple Easy", questions: [{ id: 1, sentence: "Leo _____ fast.", options: ["ran", "run"], answer: "ran" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'singapore_math.js'), `export default { title: "Easy Relay Math", problems: [{ id: 1, text_en: "2 runners x 100m = ?", answer: "200m" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'word_match.js'), `export default [ { id: 1, word: "runner", match: "người chạy" } ];\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'dictation.js'), `export default { title: "Easy Dictation", sentences: ["Leo ran fast."] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'shadowing.js'), `export default { title: "Easy Shadowing", script: "Leo passed the baton." };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'shadowing_ipa.js'), `export default { title: "Easy Shadowing IPA", script_ipa: "/liːəʊ pɑːst ðə bəˈtɒn/" };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'mindmap.js'), `export default { title: "Easy Sports Mindmap", nodes: [{ id: "root", label: "Sports" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'writing.js'), `export default { title: "My Sport", prompt: "Write 1 sentence about sports." };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'word_power.js'), `export default { title: "Easy Sports Words", words: ["run", "jump"] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'logic_science.js'), `export default { title: "Easy Science", concept: "Running is healthy." };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'social_quiz.js'), `export default { title: "Easy Social", questions: [{ id: 1, question: "Should we cheer?", answer: "Yes" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'ask_ai.js'), `export default { title: "Easy Spark Talk", nova_greeting: "Do you like running?" };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'daily_watch.js'), `export default { videoId: "kJQP7kiw5Fk", title: "Easy Sports Relay" };\n`, 'utf8');

// index.js (Easy mode)
fs.writeFileSync(path.join(EASY_DIR, 'index.js'), `import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic_science from './logic_science.js';
import social_quiz from './social_quiz.js';
import singapore_math from './singapore_math.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import word_match from './word_match.js';
import daily_watch from './daily_watch.js';
import { week_37GamesEasy as games } from './games.js';

const weekData = {
  weekId: 37,
  isEasy: true,
  weekTitle_en: "The Fun Sports Day",
  weekTitle_vi: "Ngày Hội Thể Thao Vui Vẻ",
  grammar_focus: "Past Simple",

  chunk_focus: [...new Set([...(read.chunk_focus || []), ...(explore.chunk_focus || [])])],
  dictionary: { ...(read.dictionary || {}), ...(explore.dictionary || {}) },

  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Journey-F',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    shadowing: 'en-US-Journey-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D',
    logic_lab: 'en-US-Neural2-D'
  },

  stations: {
    read_explore: { read_stem: read.read_stem, read_social: read.read_social },
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: { logic_science, singapore_math, social_quiz },
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch,
    game_hub: games
  }
};

export default weekData;
`, 'utf8');

// week_37_easy_real.js
fs.writeFileSync(path.join(EASY_DIR, 'week_37_easy_real.js'), `import weekData from './index.js';

const week_37EasyRealData = {
  ...weekData,
  week_id: 37,
  week_number: 37,
  title: "The Fun Sports Day"
};

export default week_37EasyRealData;
`, 'utf8');

console.log('✅ Successfully generated Golden Standard Week 37 files (19 files per mode = 38 total files)!');
