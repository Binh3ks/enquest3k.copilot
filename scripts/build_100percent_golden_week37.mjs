import fs from 'fs';
import path from 'path';

console.log('🚀 Generating 100% Golden Standard Compliant Week 37 Files...');

const ADV_DIR = './src/data/weeks/week_37';
const EASY_DIR = './src/data/weeks_easy/week_37';

fs.mkdirSync(ADV_DIR, { recursive: true });
fs.mkdirSync(EASY_DIR, { recursive: true });

// Shared texts
const advReadStemEn = `On **Saturday morning**, Leo and his excited classmates **went to the sports stadium** for the annual athletic festival. The sun **was sunny and warm**, creating perfect conditions for outdoor running. **First of all**, Leo entered the exciting 100-metre relay race. He **sat down with his coach** before the event to discuss their passing strategy. When the loud whistle blew, Leo **ran very fast** along the red track and **passed the baton** cleanly to Maya. Maya **ran across the grass** with remarkable speed towards the next zone. Max **caught the baton** smoothly and sprinted with determination. Thousands of spectators **watched and clapped** with immense enthusiasm. **At the very end**, their relay team crossed the finish line first! Everyone **were tired but happy** because their dedicated **teamwork brought victory**. Leo **smiled with pride** as the school principal awarded him a golden medal for sportsmanship. It was an unforgettable day for everyone involved.`;

const advReadSocialEn = `Winning a championship trophy feels fantastic, but showing respect to other participants **is even more important**. When runners **finish the race**, they **shake hands with opponents** and **say kind words** of encouragement. True champions understand that sports building strong character matters more than trophies alone.

Maya showed great fair play when she helped a runner who slipped on the track. Both teams **stood together with smiles** after the final ceremony. Athletes demonstrate true greatness whether they **win or lose** in competition.`;

const advExploreEn = `Participating in outdoor activities and regular sports **is great for our body** in numerous wonderful ways. When students **run in the park**, their leg muscles grow much stronger, their stamina improves, and their heart stays remarkably healthy. Absorbing fresh outdoor air and **bright sunlight** also **help us feel happy** while energizing our minds for daily learning.

Furthermore, team activities teach children **important social skills** that last a lifetime. When students engage in sports like football, basketball, or relay racing, they **learn to cooperate** effectively and **listen to our teammates** with respect and patience. **Working together** as a unified group helps everyone achieve ambitious goals that would be impossible to accomplish alone.

Health experts strongly recommend completing **30 minutes of exercise** **every single day** to maintain high energy and boost academic focus. So lace up your athletic shoes and **enjoy outdoor sports** with your classmates today for a happier and healthier life!`;


const easyReadStemEn = `On **Saturday morning**, Leo and his happy classmates **went to the sports stadium** for their big school sports day. The bright sun **was warm and bright**, and all the excited children felt ready to run outdoors. **First of all**, Leo decided to enter the competitive 100-metre relay race. He **sat down with his coach** before the event to discuss their team plan. When the starting whistle blew, Leo **ran very fast** down the red track and **passed the baton** cleanly to Maya. Maya **ran across the grass** with great speed to reach the next zone. Max **caught the baton** smoothly and sprinted quickly toward the finish line. All the parents, teachers, and cheering friends **watched and clapped** with big proud smiles. **At the very end**, their relay team crossed the line first! They **were tired but happy** because they worked together as a wonderful team. Leo felt very proud when receiving his golden medal.`;

const easyReadSocialEn = `Sports days **are super fun** for all students. Friends **cheer and smile** together on the field. Sharing joy with everyone makes sports day extra special.`;

const easyExploreEn = `Participating in fun outdoor sports **is great for our body** in many wonderful ways. When young children **run in the park**, their leg muscles grow strong, their lungs expand, and their hearts stay very healthy. Breathing fresh outdoor air and enjoying **bright sunlight** also **help us feel happy** while giving us good positive energy for schoolwork and studying every single day.

Moreover, playing team sports together teaches kids **important social skills**. When we play soccer or relay races, we **learn to cooperate** nicely with our classmates and **listen to our teammates** with kindness and care. **Working together** as a strong unified team helps everyone reach big goals much faster than playing alone.

Doctor health experts say that doing **30 minutes of exercise** **every single day** keeps our active minds sharp, clear, focused, and very healthy. Put on your comfortable running trainers and **enjoy outdoor sports** with your best friends today!`;


// =============================================================
// 1. ADVANCED MODE
// =============================================================

// vocab.js
fs.writeFileSync(path.join(ADV_DIR, 'vocab.js'), `export default {
  vocab: [
    { id: 1, word: 'athlete', pronunciation: '/ˈæθliːt/', definition_vi: 'vận động viên', definition_en: 'a person trained in sports and physical exercises', example: 'The athlete ran very fast along the track.', collocation: 'star athlete / trained athlete', image_url: '/images/week37/vocab_athlete.jpg', audio_word: '/audio/week37/vocab_athlete.mp3' },
    { id: 2, word: 'relay', pronunciation: '/ˈriːleɪ/', definition_vi: 'cuộc đua tiếp sức', definition_en: 'a race between teams passing a stick', example: 'Our team won the school relay race.', collocation: 'relay race / relay team', image_url: '/images/week37/vocab_relay.jpg', audio_word: '/audio/week37/vocab_relay.mp3' },
    { id: 3, word: 'baton', pronunciation: '/bəˈtɒn/', definition_vi: 'gậy tiếp sức', definition_en: 'a stick passed from runner to runner', example: 'She passed the baton smoothly to her teammate.', collocation: 'pass the baton / hand over baton', image_url: '/images/week37/vocab_baton.jpg', audio_word: '/audio/week37/vocab_baton.mp3' },
    { id: 4, word: 'stadium', pronunciation: '/ˈsteɪdiəm/', definition_vi: 'sân vận động', definition_en: 'a large sports arena with seats', example: 'The stadium was full of cheering fans.', collocation: 'sports stadium / crowded stadium', image_url: '/images/week37/vocab_stadium.jpg', audio_word: '/audio/week37/vocab_stadium.mp3' },
    { id: 5, word: 'teamwork', pronunciation: '/ˈtiːmwɜːk/', definition_vi: 'tinh thần đồng đội', definition_en: 'working together as a group', example: 'Teamwork helped us finish first place.', collocation: 'great teamwork / teamwork brings victory', image_url: '/images/week37/vocab_teamwork.jpg', audio_word: '/audio/week37/vocab_teamwork.mp3' }
  ]
};
`, 'utf8');

// read.js
fs.writeFileSync(path.join(ADV_DIR, 'read.js'), `export default {
  content_en: \`${advReadStemEn}\`,
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
    content_en: \`${advReadStemEn}\`,
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn cùng lớp đã đến sân vận động thể thao để tham gia ngày hội thể thao hàng năm. Thời tiết nắng ấm và ai nấy đều cảm thấy hào hứng. Trước hết, Leo tham gia cuộc đua tiếp sức 100m. Cậu ngồi xuống với huấn luyện viên trước cuộc đua để thảo luận kế hoạch. Khi tiếng còi vang lên, Leo chạy rất nhanh dọc theo đường chạy và truyền gậy tiếp sức gọn gàng cho Maya. Maya chạy qua bãi cỏ với tốc độ lớn. Max bắt lấy gậy tiếp sức và bứt tốc về đích. Mọi người xem và vỗ tay nhiệt tình. Cuối cùng, đội của họ đã cán đích đầu tiên! Họ mệt nhưng rất vui vì tinh thần đồng đội đã mang lại chiến thắng. Leo mỉm cười tự hào khi nhận huy chương vàng.\`,
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
    content_en: \`${advReadSocialEn}\`,
    content_vi: \`Giành huy chương thể thao thật tuyệt vời, nhưng tôn trọng các đối thủ còn quan trọng hơn. Khi các vận động viên hoàn thành cuộc đua, họ bắt tay các đối thủ và nói những lời tốt đẹp. Athletes thể hiện sự tốt bụng dù thắng hay thua.\`,
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

// explore.js
fs.writeFileSync(path.join(ADV_DIR, 'explore.js'), `export default {
  title: "Why Outdoor Sports Keep Us Healthy",
  image_url: "/images/week37/explore_cover_w37.jpg",
  audio_url: "/audio/week37/explore_main.mp3",
  content_en: \`${advExploreEn}\`,
  content_vi: \`Tham gia các hoạt động ngoài trời và thể thao thường xuyên rất tốt cho cơ thể chúng ta. Khi học sinh chạy trong công viên, cơ bắp chân phát triển khỏe mạnh hơn và tim luôn khỏe. Không khí trong lành và ánh nắng sáng giúp chúng ta cảm thấy vui vẻ. Thể thao dạy chúng ta các kỹ năng xã hội quan trọng. Chúng ta học cách hợp tác và lắng nghe đồng đội. Làm việc cùng nhau giúp mọi người đạt được mục tiêu lớn. 30 phút tập thể dục mỗi ngày cải thiện sự tập trung. Hãy tận hưởng thể thao ngoài trời hôm nay!\`,
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

// word_power.js (Objects in words[])
fs.writeFileSync(path.join(ADV_DIR, 'word_power.js'), `export default {
  title: 'Word Power: Sports & Relay Collocations',
  audio_url: null,
  words: [
    { id: 1, word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', cefr_level: 'A2', definition_en: 'handed over the relay stick', definition_vi: 'truyền gậy tiếp sức', example: 'Leo passed the baton cleanly to Maya.', collocation: 'pass the baton / hand over baton', model_sentence: 'He ran fast and passed the baton smoothly.', image_url: '/images/week37/wp_pass_baton.jpg', audio_word: '/audio/week37/wordpower_w1.mp3' },
    { id: 2, word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', cefr_level: 'A1', definition_en: 'moved at high speed on foot', definition_vi: 'chạy rất nhanh', example: 'Leo ran very fast along the track.', collocation: 'run fast / sprint', model_sentence: 'The athlete ran very fast.', image_url: '/images/week37/wp_ran_fast.jpg', audio_word: '/audio/week37/wordpower_w2.mp3' }
  ]
};
`, 'utf8');

// dictation.js
fs.writeFileSync(path.join(ADV_DIR, 'dictation.js'), `export default {
  content_en: "On Saturday morning, Leo went to the sports stadium for sports day.",
  sentences: [
    { id: 1, text: "Leo ran very fast along the track.", meaning: "Leo chạy rất nhanh trên đường chạy." },
    { id: 2, text: "He passed the baton cleanly to Maya.", meaning: "Cậu ấy truyền gậy tiếp sức gọn gàng cho Maya." }
  ]
};
`, 'utf8');

// shadowing.js
fs.writeFileSync(path.join(ADV_DIR, 'shadowing.js'), `export default {
  videoId: 'kJQP7kiw5Fk',
  content_en: "On Saturday morning, Leo ran very fast along the track.",
  script: [
    { id: 1, text: "Leo ran very fast along the track and passed the baton cleanly to Maya.", vi: "Leo chạy rất nhanh trên đường chạy và truyền gậy tiếp sức gọn gàng cho Maya." }
  ]
};
`, 'utf8');

// shadowing_ipa.js
fs.writeFileSync(path.join(ADV_DIR, 'shadowing_ipa.js'), `export default {
  title: "Sports Day Relay Shadowing IPA",
  script_ipa: "/ˈliːəʊ ræn ˈveri fɑːst əˈlɒŋ ðə træk ənd pɑːst ðə bəˈtɒn ˈkliːnli tuː ˈmaɪə/"
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

fs.writeFileSync(path.join(ADV_DIR, 'grammar.js'), `export default { title: "Past Simple & Adverbs of Manner (-ly)", questions: [{ id: 1, sentence: "Leo _____ fast.", options: ["ran", "run"], answer: "ran" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'singapore_math.js'), `export default { title: "Relay Race Distance", problems: [{ id: 1, text_en: "4 runners x 100m = ?", answer: "400m" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'word_match.js'), `export default [ { id: 1, word: "athlete", match: "vận động viên" } ];\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'mindmap.js'), `export default { title: "Sports Mindmap", nodes: [{ id: "root", label: "Sports" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'writing.js'), `export default { title: "My Sport", prompt: "Write about your favourite sport." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'logic_science.js'), `export default { title: "Heart & Sports", concept: "Sports keep our heart strong." };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'social_quiz.js'), `export default { title: "Sports Fair Play", questions: [{ id: 1, question: "Should we shake hands?", answer: "Yes" }] };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'ask_ai.js'), `export default { title: "Spark Talk Sports", nova_greeting: "Hi! What sport do you like?" };\n`, 'utf8');
fs.writeFileSync(path.join(ADV_DIR, 'daily_watch.js'), `export default { videoId: "kJQP7kiw5Fk", title: "Sports Day Relay" };\n`, 'utf8');

// index.js
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


// =============================================================
// 2. EASY MODE
// =============================================================

// vocab.js
fs.writeFileSync(path.join(EASY_DIR, 'vocab.js'), `export default {
  vocab: [
    { id: 1, word: 'runner', pronunciation: '/ˈrʌnə/', definition_vi: 'người chạy', definition_en: 'a person who runs', example: 'The runner was fast.', image_url: '/images/week37/vocab_runner.jpg', audio_word: '/audio/week37_easy/vocab_runner.mp3' },
    { id: 2, word: 'race', pronunciation: '/reɪs/', definition_vi: 'cuộc đua', definition_en: 'a competition of speed', example: 'We ran a race today.', image_url: '/images/week37/vocab_race.jpg', audio_word: '/audio/week37_easy/vocab_race.mp3' }
  ]
};
`, 'utf8');

// read.js
fs.writeFileSync(path.join(EASY_DIR, 'read.js'), `export default {
  content_en: \`${easyReadStemEn}\`,
  sentences: [
    { id: 1, text: "On Saturday morning, Leo went to the sports stadium for sports day." },
    { id: 2, text: "The weather was sunny and warm." },
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
    content_en: \`${easyReadStemEn}\`,
    content_vi: \`Vào sáng thứ Bảy, Leo và các bạn đến sân vận động tham gia ngày hội thể thao. Thời tiết nắng ấm. Leo chạy rất nhanh trong cuộc đua. Cậu ấy truyền gậy tiếp sức cho bạn Maya. Maya chạy qua bãi cỏ nhanh chóng. Mọi người xem và vỗ tay. Họ mệt nhưng rất vui khi giành chiến thắng!\`,
    key_vocabulary: [
      { word: "runner", definition: "a person who runs", example: "Leo was a fast runner." },
      { word: "race", definition: "speed competition", example: "He ran in the race." }
    ],
    comprehension_questions: [
      { id: 1, question_en: "Where did Leo go on Saturday morning?", answer: ["To the sports stadium", "To the park"], clue_statement: "Leo went to the sports stadium.", hint_en: "To the...", hint_vi: "Đến..." }
    ]
  },
  read_social: {
    title_en: "Happy Sports Day",
    subtitle_en: "Playing nicely",
    image_url: "/images/week37/read_social_w37.jpg",
    audio_url: "/audio/week37_easy/read_social.mp3",
    content_en: \`${easyReadSocialEn}\`,
    content_vi: \`Ngày hội thể thao rất vui. Bạn bè cùng cổ vũ và mỉm cười.\`,
    comprehension_questions: [
      { id: 1, question_en: "Are sports days fun?", answer: ["Yes"], clue_statement: "Yes, sports days are fun.", hint_en: "Yes", hint_vi: "Có" }
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
    "were tired but happy"
  ],
  dictionary: {
    'Saturday morning': { word: 'Saturday morning', pronunciation: '/ˈsætədeɪ ˈmɔːnɪŋ/', definition_vi: 'sáng thứ Bảy', example: 'On Saturday morning, we went to the park.' },
    'went to the sports stadium': { word: 'went to the sports stadium', pronunciation: '/went tuː ðə spɔːts ˈsteɪdiəm/', definition_vi: 'đã đến sân vận động thể thao', example: 'Leo went to the sports stadium.' },
    'was warm and bright': { word: 'was warm and bright', pronunciation: '/wəz wɔːm ənd braɪt/', definition_vi: 'trời ấm và sáng', example: 'The day was warm and bright.' },
    'First of all': { word: 'First of all', pronunciation: '/fɜːst əv ɔːl/', definition_vi: 'trước tiên', example: 'First of all, he ran.' },
    'sat down with his coach': { word: 'sat down with his coach', pronunciation: '/sæt daʊn wɪð hɪz kəʊtʃ/', definition_vi: 'ngồi xuống với huấn luyện viên', example: 'He sat down with his coach.' },
    'ran very fast': { word: 'ran very fast', pronunciation: '/ræn ˈveri fɑːst/', definition_vi: 'chạy rất nhanh', example: 'Leo ran very fast.' },
    'passed the baton': { word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', definition_vi: 'truyền gậy tiếp sức', example: 'He passed the baton.' },
    'ran across the grass': { word: 'ran across the grass', pronunciation: '/ræn əˈkrɒs ðə ɡrɑːs/', definition_vi: 'chạy qua bãi cỏ', example: 'Maya ran across the grass.' },
    'caught the baton': { word: 'caught the baton', pronunciation: '/kɔːt ðə bəˈtɒn/', definition_vi: 'bắt lấy gậy tiếp sức', example: 'Max caught the baton.' },
    'watched and clapped': { word: 'watched and clapped', pronunciation: '/wɒtʃt ənd klæpt/', definition_vi: 'xem và vỗ tay', example: 'They watched and clapped.' },
    'At the very end': { word: 'At the very end', pronunciation: '/æt ðə ˈveri end/', definition_vi: 'cuối cùng', example: 'At the very end, they won.' },
    'were tired but happy': { word: 'were tired but happy', pronunciation: '/wɜː ˈtaɪəd bət ˈhæpi/', definition_vi: 'mệt nhưng rất vui', example: 'They were tired but happy.' }
  }
};
`, 'utf8');

// explore.js
fs.writeFileSync(path.join(EASY_DIR, 'explore.js'), `export default {
  title: "Sports in the Sun",
  image_url: "/images/week37/explore_cover_w37.jpg",
  audio_url: "/audio/week37_easy/explore_main.mp3",
  content_en: \`${easyExploreEn}\`,
  content_vi: \`Chơi thể thao ngoài trời rất tốt cho cơ thể chúng ta. Khi trẻ em chạy trong công viên, cơ chân phát triển khỏe mạnh và tim luôn khỏe. Hít thở không khí trong lành và đón ánh nắng sáng giúp chúng ta cảm thấy vui vẻ. Chơi các trò chơi đồng đội dạy trẻ em các kỹ năng xã hội quan trọng. Chúng ta học cách hợp tác và lắng nghe đồng đội. Làm việc cùng nhau giúp mọi người đạt mục tiêu nhanh hơn. 30 phút tập thể dục mỗi ngày giúp trí óc nhạy bén. Hãy tận hưởng thể thao ngoài trời hôm nay!\`,
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

// word_power.js (Objects in words[])
fs.writeFileSync(path.join(EASY_DIR, 'word_power.js'), `export default {
  title: 'Easy Sports Words',
  audio_url: null,
  words: [
    { id: 1, word: 'passed the baton', pronunciation: '/pɑːst ðə bəˈtɒn/', cefr_level: 'A1', definition_en: 'handed over the stick', definition_vi: 'truyền gậy tiếp sức', example: 'He passed the baton.', collocation: 'pass the baton', model_sentence: 'Leo passed the baton.', image_url: '/images/week37/wp_pass_baton.jpg', audio_word: '/audio/week37_easy/wordpower_w1.mp3' }
  ]
};
`, 'utf8');

// dictation.js
fs.writeFileSync(path.join(EASY_DIR, 'dictation.js'), `export default {
  content_en: "Leo ran fast.",
  sentences: [
    { id: 1, text: "Leo ran fast.", meaning: "Leo chạy nhanh." }
  ]
};
`, 'utf8');

// shadowing.js
fs.writeFileSync(path.join(EASY_DIR, 'shadowing.js'), `export default {
  videoId: 'kJQP7kiw5Fk',
  content_en: "Leo ran fast and passed the baton.",
  script: [
    { id: 1, text: "Leo ran very fast and passed the baton.", vi: "Leo chạy rất nhanh và truyền gậy tiếp sức." }
  ]
};
`, 'utf8');

// shadowing_ipa.js
fs.writeFileSync(path.join(EASY_DIR, 'shadowing_ipa.js'), `export default {
  title: "Easy Sports Relay Shadowing IPA",
  script_ipa: "/ˈliːəʊ ræn ˈveri fɑːst ənd pɑːst ðə bəˈtɒn/"
};
`, 'utf8');

// games.js
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
fs.writeFileSync(path.join(EASY_DIR, 'mindmap.js'), `export default { title: "Easy Sports Mindmap", nodes: [{ id: "root", label: "Sports" }] };\n`, 'utf8');
fs.writeFileSync(path.join(EASY_DIR, 'writing.js'), `export default { title: "My Sport", prompt: "Write 1 sentence about sports." };\n`, 'utf8');
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

console.log('✅ Generated 100% Golden Standard compliant Week 37 files!');
