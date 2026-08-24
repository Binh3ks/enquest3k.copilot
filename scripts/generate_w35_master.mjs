import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const W35_DIR = path.join(__dirname, '../src/data/weeks/week_35');
const W35_EASY_DIR = path.join(__dirname, '../src/data/weeks_easy/week_35');

if (!fs.existsSync(W35_DIR)) fs.mkdirSync(W35_DIR, { recursive: true });
if (!fs.existsSync(W35_EASY_DIR)) fs.mkdirSync(W35_EASY_DIR, { recursive: true });

console.log('🚀 Generating Week 35 Master Architecture (15 Tasks / 4 Hubs)...');

// 1. VOCAB (20 words)
const vocabCode = `// Week 35 Target Vocabulary List (20 Words)
export default [
  { id: 1, word: "adventure", definition_en: "an exciting or unusual experience", definition_vi: "chuyến phiêu lưu", example_en: "We had a wonderful camping adventure in the green mountains.", example_vi: "Chúng tôi đã có một chuyến phiêu lưu cắm trại tuyệt vời trên núi xanh.", audio_word: "/audio/week35/vocab_adventure.mp3", image_url: "/images/week35/vocab_adventure.jpg" },
  { id: 2, word: "camping", definition_en: "living in a tent on holiday in the countryside", definition_vi: "cắm trại", example_en: "Our family went camping near a clean forest stream.", example_vi: "Gia đình tôi đã đi cắm trại gần một con suối trong rừng.", audio_word: "/audio/week35/vocab_camping.mp3", image_url: "/images/week35/vocab_camping.jpg" },
  { id: 3, word: "tent", definition_en: "a shelter made of cloth supported by poles and ropes", definition_vi: "cái lều", example_en: "Dad and I set up a large blue tent on the grass.", example_vi: "Bố và tôi dựng một chiếc lều xanh lớn trên bãi cỏ.", audio_word: "/audio/week35/vocab_tent.mp3", image_url: "/images/week35/vocab_tent.jpg" },
  { id: 4, word: "campfire", definition_en: "an outdoor fire made by people who are camping", definition_vi: "lửa trại", example_en: "We sat around the warm campfire and sang happy songs.", example_vi: "Chúng tôi ngồi quanh đống lửa trại ấm áp và hát những bài ca vui tươi.", audio_word: "/audio/week35/vocab_campfire.mp3", image_url: "/images/week35/vocab_campfire.jpg" },
  { id: 5, word: "hiking", definition_en: "the activity of going for long walks in the countryside", definition_vi: "đi bộ đường dài", example_en: "We went hiking along the scenic mountain trail.", example_vi: "Chúng tôi đã đi bộ đường dài dọc theo con đường mòn ngắm cảnh.", audio_word: "/audio/week35/vocab_hiking.mp3", image_url: "/images/week35/vocab_hiking.jpg" },
  { id: 6, word: "mountain", definition_en: "a very high hill with steep rocky sides", definition_vi: "ngọn núi", example_en: "The sun was rising slowly behind the high mountain.", example_vi: "Mặt trời đang mọc từ từ sau ngọn núi cao.", audio_word: "/audio/week35/vocab_mountain.mp3", image_url: "/images/week35/vocab_mountain.jpg" },
  { id: 7, word: "flashlight", definition_en: "a small portable electric light powered by batteries", definition_vi: "đèn pin", example_en: "I turned on my bright flashlight when it grew dark.", example_vi: "Tôi bật chiếc đèn pin sáng lên khi trời trở tối.", audio_word: "/audio/week35/vocab_flashlight.mp3", image_url: "/images/week35/vocab_flashlight.jpg" },
  { id: 8, word: "excited", definition_en: "feeling very happy and full of energy", definition_vi: "hào hứng, phấn khích", example_en: "All the children were excited to sleep inside the tent.", example_vi: "Tất cả các bạn nhỏ đều hào hứng khi được ngủ trong lều.", audio_word: "/audio/week35/vocab_excited.mp3", image_url: "/images/week35/vocab_excited.jpg" },
  { id: 9, word: "marshmallow", definition_en: "a soft, sweet white food made of sugar", definition_vi: "kẹo xốp dẻo", example_en: "We roasted sweet marshmallows on thin sticks over the fire.", example_vi: "Chúng tôi nướng kẹo xốp ngọt trên que nhỏ trên ngọn lửa.", audio_word: "/audio/week35/vocab_marshmallow.mp3", image_url: "/images/week35/vocab_marshmallow.jpg" },
  { id: 10, word: "roasting", definition_en: "cooking food over a direct hot fire", definition_vi: "nướng", example_en: "Tom was roasting sweet corn for our dinner.", example_vi: "Tom đang nướng ngô ngọt cho bữa tối của chúng tôi.", audio_word: "/audio/week35/vocab_roasting.mp3", image_url: "/images/week35/vocab_roasting.jpg" },
  { id: 11, word: "starry", definition_en: "full of bright shining stars in the night sky", definition_vi: "đầy sao", example_en: "We looked up at the clear starry sky before bed.", example_vi: "Chúng tôi ngước nhìn bầu trời đêm đầy sao sáng trước khi đi ngủ.", audio_word: "/audio/week35/vocab_starry.mp3", image_url: "/images/week35/vocab_starry.jpg" },
  { id: 12, word: "stream", definition_en: "a small, narrow river with fresh flowing water", definition_vi: "con suối nhỏ", example_en: "Clean water flowed gently down the rocky forest stream.", example_vi: "Dòng nước sạch chảy nhẹ nhàng qua con suối đá trong rừng.", audio_word: "/audio/week35/vocab_stream.mp3", image_url: "/images/week35/vocab_stream.jpg" },
  { id: 13, word: "backpack", definition_en: "a bag with shoulder straps carried on the back", definition_vi: "ba lô", example_en: "I packed my warm jacket and water bottle into my backpack.", example_vi: "Tôi đã xếp áo khoác ấm và bình nước vào ba lô của mình.", audio_word: "/audio/week35/vocab_backpack.mp3", image_url: "/images/week35/vocab_backpack.jpg" },
  { id: 14, word: "memorable", definition_en: "worth remembering or easy to remember", definition_vi: "đáng nhớ", example_en: "Our camping trip was the most memorable day of the summer.", example_vi: "Chuyến cắm trại là ngày đáng nhớ nhất trong mùa hè của chúng tôi.", audio_word: "/audio/week35/vocab_memorable.mp3", image_url: "/images/week35/vocab_memorable.jpg" },
  { id: 15, word: "nature", definition_en: "all the animals, plants, rocks, and outdoor world", definition_vi: "thiên nhiên", example_en: "We learned to respect and protect wild nature.", example_vi: "Chúng tôi học được cách tôn trọng và bảo vệ thiên nhiên hoang dã.", audio_word: "/audio/week35/vocab_nature.mp3", image_url: "/images/week35/vocab_nature.jpg" },
  { id: 16, word: "forest", definition_en: "a large area covered with tall trees and bushes", definition_vi: "khu rừng", example_en: "Tall pine trees grew all around the quiet forest camp.", example_vi: "Những cây thông cao mọc quanh khu trại rừng yên tĩnh.", audio_word: "/audio/week35/vocab_forest.mp3", image_url: "/images/week35/vocab_forest.jpg" },
  { id: 17, word: "laughed", definition_en: "made sounds showing happiness or amusement", definition_vi: "đã cười vui vẻ", example_en: "Everyone laughed when the friendly puppy ran into our tent.", example_vi: "Mọi người đều cười khi chú cún thân thiện chạy vào lều.", audio_word: "/audio/week35/vocab_laughed.mp3", image_url: "/images/week35/vocab_laughed.jpg" },
  { id: 18, word: "together", definition_en: "with each other as a group or team", definition_vi: "cùng nhau", example_en: "We worked together to gather dry wood for the fire.", example_vi: "Chúng tôi cùng nhau làm việc để nhặt củi khô cho đống lửa.", audio_word: "/audio/week35/vocab_together.mp3", image_url: "/images/week35/vocab_together.jpg" },
  { id: 19, word: "sunset", definition_en: "the time in the evening when the sun disappears below the horizon", definition_vi: "hoàng hôn", example_en: "We watched a magnificent golden sunset over the lake.", example_vi: "Chúng tôi đã ngắm một buổi hoàng hôn vàng rực rỡ trên hồ.", audio_word: "/audio/week35/vocab_sunset.mp3", image_url: "/images/week35/vocab_sunset.jpg" },
  { id: 20, word: "grateful", definition_en: "feeling thankful for a pleasant event or kindness", definition_vi: "biết ơn", example_en: "I felt grateful for having such a loving family.", example_vi: "Tôi cảm thấy biết ơn vì có một gia đình yêu thương như vậy.", audio_word: "/audio/week35/vocab_grateful.mp3", image_url: "/images/week35/vocab_grateful.jpg" }
];
`;
fs.writeFileSync(path.join(W35_DIR, 'vocab.js'), vocabCode);
fs.writeFileSync(path.join(W35_DIR, 'vocab_dictionary_master.js'), vocabCode);

// 2. READ.JS
const readCode = `// Week 35 Story — The Best Day Ever: Mountain Camping Adventure
export const readData = {
  week: 35,
  title: "The Best Day Ever: Mountain Camping",
  title_vi: "Ngày Tuyệt Vời Nhất: Cắm Trại Trên Núi",
  text_en: "Last Saturday was the most memorable day of my summer holiday. Early in the morning, my family packed our backpacks and drove to Pine Valley Mountain. While my parents were setting up our large blue tent, my brother and I collected dry pine branches for the campfire. In the afternoon, we went hiking along a winding forest stream. The water was cool and crystal clear. While we were walking, we saw two playful squirrels jumping between pine branches. When evening arrived, Dad lit the warm campfire. We sat together, roasted sweet marshmallows, and told funny stories. Looking up at the clear starry sky, I saw bright constellations shining above the mountain. It was truly the best day ever.",
  text_vi: "Thứ Bảy tuần trước là ngày đáng nhớ nhất trong kỳ nghỉ hè của tôi. Từ sáng sớm, gia đình tôi đã xếp ba lô và lái xe đến Núi Thung Lũng Thông. Trong khi bố mẹ đang dựng chiếc lều xanh lớn, anh trai và tôi đã đi nhặt những cành thông khô cho đống lửa trại. Vào buổi chiều, chúng tôi đi bộ dọc theo con suối rừng uốn lượn. Nước suối mát rượi và trong vắt. Trong khi chúng tôi đang đi bộ, chúng tôi nhìn thấy hai chú sóc tinh nghịch nhảy nhót giữa các cành thông. Khi buổi tối đến, bố đã nhóm đống lửa trại ấm áp. Chúng tôi ngồi cùng nhau, nướng kẹo xốp ngọt và kể những câu chuyện vui nhộn. Ngước nhìn bầu trời đêm đầy sao, tôi nhìn thấy những chòm sao sáng lấp lánh trên đỉnh núi. Đó thực sự là ngày tuyệt vời nhất.",
  
  story_scenes: [
    {
      id: 1,
      scene_number: 1,
      scene_id: "scene_1",
      title: "Panel 1: Arriving at Pine Valley",
      title_en: "Panel 1: Arriving at Pine Valley",
      description: "The family arrived at the campsite and set up the large blue tent.",
      description_en: "The family arrived at the campsite and set up the large blue tent.",
      image_url: "/images/week35/webtoon_scene_1.png",
      lexical_chunks: [
        { word: "arrived", chunk: "arrived at Pine Valley", x: 40, y: 60 },
        { word: "tent", chunk: "set up the blue tent", x: 60, y: 50 }
      ]
    },
    {
      id: 2,
      scene_number: 2,
      scene_id: "scene_2",
      title: "Panel 2: Hiking Along the Stream",
      title_en: "Panel 2: Hiking Along the Stream",
      description: "In the afternoon, the children went hiking along the clear forest stream.",
      description_en: "In the afternoon, the children went hiking along the clear forest stream.",
      image_url: "/images/week35/webtoon_scene_2.png",
      lexical_chunks: [
        { word: "hiking", chunk: "hiking along the stream", x: 50, y: 65 },
        { word: "stream", chunk: "cool crystal clear water", x: 30, y: 75 }
      ]
    },
    {
      id: 3,
      scene_number: 3,
      scene_id: "scene_3",
      title: "Panel 3: Spotting Forest Wildlife",
      title_en: "Panel 3: Spotting Forest Wildlife",
      description: "While walking, they spotted two playful squirrels in the pine trees.",
      description_en: "While walking, they spotted two playful squirrels in the pine trees.",
      image_url: "/images/week35/webtoon_scene_3.png",
      lexical_chunks: [
        { word: "squirrels", chunk: "two playful squirrels", x: 55, y: 40 },
        { word: "trees", chunk: "jumping between branches", x: 45, y: 30 }
      ]
    },
    {
      id: 4,
      scene_number: 4,
      scene_id: "scene_4",
      title: "Panel 4: Campfire & Marshmallows",
      title_en: "Panel 4: Campfire & Marshmallows",
      description: "They sat around the warm campfire and roasted sweet marshmallows.",
      description_en: "They sat around the warm campfire and roasted sweet marshmallows.",
      image_url: "/images/week35/webtoon_scene_4.png",
      lexical_chunks: [
        { word: "campfire", chunk: "sat around warm campfire", x: 45, y: 60 },
        { word: "marshmallows", chunk: "roasted sweet marshmallows", x: 65, y: 55 }
      ]
    },
    {
      id: 5,
      scene_number: 5,
      scene_id: "scene_5",
      title: "Panel 5: The Starry Night Sky",
      title_en: "Panel 5: The Starry Night Sky",
      description: "Looking up at the bright starry sky, they celebrated the best day ever.",
      description_en: "Looking up at the bright starry sky, they celebrated the best day ever.",
      image_url: "/images/week35/webtoon_scene_5.png",
      lexical_chunks: [
        { word: "starry sky", chunk: "clear starry sky above", x: 50, y: 25 },
        { word: "best day", chunk: "truly the best day ever", x: 50, y: 70 }
      ]
    }
  ],

  comprehension_questions: [
    {
      id: 1,
      question_en: "Where did the family go for their camping trip?",
      options: ["Pine Valley Mountain", "The city center", "A sandy ocean beach"],
      answer: "Pine Valley Mountain"
    },
    {
      id: 2,
      question_en: "What did the children do while their parents set up the tent?",
      options: ["They collected dry pine branches", "They slept in the car", "They went swimming"],
      answer: "They collected dry pine branches"
    },
    {
      id: 3,
      question_en: "What animals did they spot while hiking near the stream?",
      options: ["Two playful squirrels", "A big brown bear", "Three grey wolves"],
      answer: "Two playful squirrels"
    },
    {
      id: 4,
      question_en: "What sweet treat did they roast over the campfire?",
      options: ["Sweet marshmallows", "Cold ice cream", "Fresh apples"],
      answer: "Sweet marshmallows"
    }
  ]
};

export default readData;
`;
fs.writeFileSync(path.join(W35_DIR, 'read.js'), readCode);

// 3. EXPLORE.JS (CLIL: Campfire Safety & Nature Stargazing)
const exploreCode = `// Week 35 Explore / CLIL — Camping Safety & Star Constellations
export const exploreData = {
  theme: "Camping Safety & Stargazing",
  title_en: "Camping Safety & Stargazing in Nature",
  title_vi: "An Toàn Cắm Trại & Ngắm Sao Trong Tự Nhiên",
  content_en: "Camping in nature is an exciting outdoor adventure. When setting up camp, always choose a flat and dry area away from tall dry grass. Keep your campfire inside a circle of stones to prevent sparks from spreading. While cooking over the fire, always stay at a safe distance and never leave the flames unattended. At night, look up at the starry sky to find famous constellations. Stars create wonderful shapes that help explorers find north. When you leave, always pour clean water over the campfire until the wood is completely cold. Protecting the forest keeps nature safe for everyone!",
  content_vi: "Cắm trại trong tự nhiên là một chuyến phiêu lưu ngoài trời thú vị. Khi dựng trại, hãy luôn chọn vùng đất phẳng và khô ráo, tránh xa đám cỏ khô. Giữ lửa trại bên trong vòng đá để tránh tia lửa bay lan. Trong khi nấu nướng trên lửa, hãy luôn giữ khoảng cách an toàn và không bao giờ để ngọn lửa cháy mà không có người trông. Vào ban đêm, hãy ngước nhìn bầu trời sao để tìm các chòm sao nổi tiếng. Các ngôi sao tạo nên những hình thù tuyệt đẹp giúp các nhà thám hiểm định hướng phương bắc. Khi rời đi, hãy dập tắt lửa bằng nước sạch cho đến khi củi nguội hẳn. Bảo vệ khu rừng giúp giữ an toàn cho tất cả mọi người!",
  audio_url: "/audio/week35/explore.mp3",
  check_questions: [
    {
      id: 1,
      question_en: "Where should you place a campfire to keep it safe?",
      options: ["Inside a circle of stones away from dry grass", "Under dry tree leaves", "Inside the sleeping tent"],
      answer: "Inside a circle of stones away from dry grass"
    },
    {
      id: 2,
      question_en: "How do star constellations help explorers at night?",
      options: ["They create shapes that help find north", "They make loud whistling sounds", "They change into shooting stars"],
      answer: "They create shapes that help find north"
    },
    {
      id: 3,
      question_en: "What must you do before leaving the campsite?",
      options: ["Pour water on the campfire until it is cold", "Leave the campfire burning brightly", "Hide the tent in the bushes"],
      answer: "Pour water on the campfire until it is cold"
    }
  ],
  critical_thinking: {
    question_en: "Why is it important to extinguish campfires completely before leaving?",
    hint_en: "Think about forest fire safety: hot coals can relight with wind and harm trees and wildlife."
  }
};

export default exploreData;
`;
fs.writeFileSync(path.join(W35_DIR, 'explore.js'), exploreCode);

// 4. GRAMMAR.JS
const grammarCode = `// Week 35 Grammar: Past Continuous with WHILE & WHEN
export default {
  title: "Past Continuous with WHILE & WHEN in Recounts",
  focus: "While + Past Continuous (was/were + V-ing), Past Simple interrupted.",
  rule_en: "Use Past Continuous for continuous background actions and Past Simple for specific events.",
  rule_vi: "Dùng Quá khứ Tiếp diễn cho hành động nền và Quá khứ Đơn cho sự kiện cụ thể.",
  examples: [
    "While my parents were setting up the tent, we collected firewood.",
    "While we were hiking along the stream, we saw two squirrels.",
    "Dad was roasting marshmallows when a shooting star appeared."
  ],
  exercises: [
    { id: 1, prompt: "While Dad ___ the tent, we gathered dry wood.", options: ["was pitching", "pitched", "pitches"], answer: "was pitching", type: "mc" },
    { id: 2, prompt: "We saw two squirrels while we ___ along the stream.", options: ["were walking", "walked", "walk"], answer: "were walking", type: "mc" },
    { id: 3, prompt: "Dad ___ the campfire when the sun went down.", options: ["lit", "was lighting", "lights"], answer: "lit", type: "mc" },
    { id: 4, prompt: "While we ___ stories, the stars shone brightly.", options: ["were telling", "told", "tell"], answer: "were telling", type: "mc" },
    { id: 5, prompt: "The children ___ sweet marshmallows over the hot fire.", options: ["roasted", "were roasting", "roast"], answer: "roasted", type: "mc" },
    { id: 6, prompt: "While I ___ up at the sky, I saw a shooting star.", options: ["was looking", "looked", "look"], answer: "was looking", type: "mc" },
    { id: 7, prompt: "We ___ our warm sleeping bags before going to bed.", options: ["unrolled", "were unrolling", "unroll"], answer: "unrolled", type: "mc" },
    { id: 8, prompt: "While the stream ___ gently, we fell asleep peacefully.", options: ["was flowing", "flowed", "flows"], answer: "was flowing", type: "mc" },
    { id: 9, prompt: "They ___ up early to see the golden mountain sunrise.", options: ["woke", "were waking", "wake"], answer: "woke", type: "mc" },
    { id: 10, prompt: "Everyone ___ happy because it was the best day ever.", options: ["felt", "was feeling", "feels"], answer: "felt", type: "mc" }
  ]
};
`;
fs.writeFileSync(path.join(W35_DIR, 'grammar.js'), grammarCode);

// 5. SINGAPORE_MATH.JS
const mathCode = `// Week 35 Singapore Math Problems (5 Dynamic Bar Model Problems)
export default {
  title: "Camping Distance & Campfire Math",
  problems: [
    {
      id: 1,
      title: "Problem 1: Hiking Distance (Part-Whole)",
      problemText: "The hiking trail is 1200 meters long. The family walked 800 meters before lunch. How many meters remained?",
      correctAnswer: 400,
      answer: "400 meters",
      hintText: "Total trail (1200m) - Walked distance (800m) = 400 meters remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 800, label: "800m walked", color: "#4f46e5" },
          { value: 400, label: "400m left", color: "#06b6d4" }
        ],
        totalLabel: "1200m trail"
      }
    },
    {
      id: 2,
      title: "Problem 2: Firewood Collection (Part-Whole)",
      problemText: "Tom collected 18 pine sticks and his brother collected 14 oak sticks. How many sticks did they gather in total?",
      correctAnswer: 32,
      answer: "32 sticks",
      hintText: "Pine sticks (18) + Oak sticks (14) = 32 sticks in total.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 18, label: "18 pine", color: "#f59e0b" },
          { value: 14, label: "14 oak", color: "#10b981" }
        ],
        totalLabel: "32 sticks total"
      }
    },
    {
      id: 3,
      title: "Problem 3: Marshmallow Sharing (Part-Whole)",
      problemText: "The packet had 24 marshmallows. The family roasted 16 marshmallows. How many were left in the packet?",
      correctAnswer: 8,
      answer: "8 marshmallows",
      hintText: "Total marshmallows (24) - Roasted (16) = 8 marshmallows remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 16, label: "16 roasted", color: "#ec4899" },
          { value: 8, label: "8 left", color: "#8b5cf6" }
        ],
        totalLabel: "24 marshmallows"
      }
    },
    {
      id: 4,
      title: "Problem 4: Tent Sleeping Space (Comparison)",
      problemText: "The large tent can fit 6 campers. A small tent can fit 2 campers. How many more campers fit in the large tent?",
      correctAnswer: 4,
      answer: "4 campers",
      hintText: "Large tent (6) - Small tent (2) = 4 more campers.",
      modelData: {
        type: "comparison",
        bars: [
          { value: 6, label: "Large tent (6)", color: "#0ea5e9" },
          { value: 2, label: "Small tent (2)", color: "#ef4444" }
        ],
        diffLabel: "4 more"
      }
    },
    {
      id: 5,
      title: "Problem 5: Stargazing Time (Part-Whole)",
      problemText: "They stargazed for 45 minutes before bedtime and 15 minutes at dawn. How many minutes did they stargaze in total?",
      correctAnswer: 60,
      answer: "60 minutes",
      hintText: "Night stargazing (45m) + Dawn stargazing (15m) = 60 minutes in total.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 45, label: "45m night", color: "#6366f1" },
          { value: 15, label: "15m dawn", color: "#14b8a6" }
        ],
        totalLabel: "60 min total"
      }
    }
  ]
};
`;
fs.writeFileSync(path.join(W35_DIR, 'singapore_math.js'), mathCode);
fs.writeFileSync(path.join(W35_DIR, 'logic_lab.js'), mathCode);

// 6. WRITING.JS
const writingCode = `// Week 35 Writing Studio Data
export default {
  title: "The Best Day Ever — Camping Story",
  prompt_en: "Look at the three pictures. Write the story. Write 20 or more words.",
  prompt_vi: "Nhìn vào 3 bức tranh. Viết câu chuyện kể lại chuyến cắm trại (20 từ trở lên).",
  min_sentences: 3,
  min_words: 20,
  max_words: 60,
  model_sentence: "Last weekend, my family went camping in Pine Valley. While my parents were setting up our tent, we collected dry wood. In the evening, we sat around the warm campfire, roasted sweet marshmallows, and looked at the bright starry sky. It was truly the best day ever.",
  picture_story: [
    { panel_id: 'panel_1', title_en: 'Panel 1: Pitching the Tent', title_vi: 'Cảnh 1: Dựng Lều Cắm Trại', image_url: '/images/week35/writing_panel_1.png' },
    { panel_id: 'panel_2', title_en: 'Panel 2: Hiking by the Stream', title_vi: 'Cảnh 2: Đi Bộ Dọc Con Suối', image_url: '/images/week35/writing_panel_2.png' },
    { panel_id: 'panel_3', title_en: 'Panel 3: Campfire Under Stars', title_vi: 'Cảnh 3: Lửa Trại Dưới Bầu Trời Sao', image_url: '/images/week35/writing_panel_3.png' }
  ],
  word_bank_pills: {
    action_verbs: ['packed backpacks', 'pitched tent', 'hiked along stream', 'lit campfire', 'roasted marshmallows', 'looked at stars'],
    connectors: ['early in the morning', 'in the afternoon', 'when evening arrived', 'while', 'because', 'finally'],
    cumulative_chunks: ['went camping in the mountains', 'set up the blue tent', 'hiked along the stream', 'roasted sweet marshmallows', 'clear starry sky'],
    grammar_boosters: ['were setting up', 'was hiking', 'were roasting', 'had gathered']
  },
  sentence_frames: [
    { template: "Early in the morning, we drove to Pine Valley to go ___.", answers: ["camping"] },
    { template: "While parents set up the tent, we gathered dry ___.", answers: ["wood"] },
    { template: "In the afternoon, we hiked along a cool forest ___.", answers: ["stream"] },
    { template: "We roasted sweet ___ over the warm campfire.", answers: ["marshmallows"] },
    { template: "Looking at the starry sky, we celebrated the best ___ ever.", answers: ["day"] }
  ],
  picture_mode: {
    type: "picture",
    image_url: "/images/week35/writing_panel_1.png",
    panels: [
      {
        id: 1,
        image_url: "/images/week35/writing_panel_1.png",
        caption: "Panel 1: Arriving at the campsite and pitching the tent",
        character_guide: "Family (pitching tent together) in the green pine valley",
        action_tags: ["camping", "tent", "mountain", "pine trees"],
        nova_question_en: "What was the family doing when they arrived at the campsite in Panel 1?",
        pills: ["early on Saturday morning,", "were setting up the tent,", "in the green valley,", "packed their backpacks,"],
        grammar_hint: "Past Continuous: were setting up",
        sentence_frame: "Early in the morning, the family arrived at the campsite and set up their tent.",
        pill_color: "blue"
      },
      {
        id: 2,
        image_url: "/images/week35/writing_panel_2.png",
        caption: "Panel 2: Hiking along the clear forest stream",
        character_guide: "Children (hiking with walking sticks) spotting wildlife",
        action_tags: ["hiking", "stream", "nature", "squirrels"],
        nova_question_en: "Where did the children go hiking in Panel 2 and what did they see?",
        pills: ["hiked along the stream,", "spotted two squirrels,", "the water was crystal clear,", "in the cool afternoon,"],
        grammar_hint: "Past Simple: hiked, spotted",
        sentence_frame: "In the afternoon, they hiked along the forest stream and saw playful squirrels.",
        pill_color: "amber"
      },
      {
        id: 3,
        image_url: "/images/week35/writing_panel_3.png",
        caption: "Panel 3: Enjoying the warm campfire under the starry sky",
        character_guide: "Family (roasting marshmallows & stargazing)",
        action_tags: ["campfire", "marshmallows", "starry sky", "best day"],
        nova_question_en: "How did the family spend their evening in Panel 3?",
        pills: ["sat around the campfire,", "roasted sweet marshmallows,", "under the starry night sky,", "the best day ever,"],
        grammar_hint: "Past Simple: sat, roasted, celebrated",
        sentence_frame: "In the evening, they roasted marshmallows by the warm campfire under the starry sky.",
        pill_color: "emerald"
      }
    ]
  }
};
`;
fs.writeFileSync(path.join(W35_DIR, 'writing.js'), writingCode);

// 7. DICTATION, SHADOWING, SHADOWING_IPA
const dictationCode = `// Week 35 Dictation Sentences
export default [
  { id: 1, text: "Our family went camping near Pine Valley Mountain.", audio_url: "/audio/week35/dictation_1.mp3" },
  { id: 2, text: "We pitched our large blue tent on the green grass.", audio_url: "/audio/week35/dictation_2.mp3" },
  { id: 3, text: "We hiked along a crystal clear forest stream.", audio_url: "/audio/week35/dictation_3.mp3" },
  { id: 4, text: "Dad lit the warm campfire when evening arrived.", audio_url: "/audio/week35/dictation_4.mp3" },
  { id: 5, text: "We roasted sweet marshmallows under the starry sky.", audio_url: "/audio/week35/dictation_5.mp3" }
];
`;
fs.writeFileSync(path.join(W35_DIR, 'dictation.js'), dictationCode);

const shadowingCode = `// Week 35 Shadowing Sentences
export const shadowingData = {
  sentences: [
    "Last Saturday was the most memorable day of my summer holiday.",
    "Our family packed our backpacks and drove to the mountains.",
    "While my parents were setting up the tent, we collected firewood.",
    "In the afternoon, we went hiking along a winding forest stream.",
    "The stream water was cool and crystal clear.",
    "We saw two playful squirrels jumping between pine branches.",
    "When evening arrived, Dad lit the warm campfire.",
    "We sat together and roasted delicious sweet marshmallows.",
    "Looking up at the starry sky, we saw bright constellations.",
    "It was truly the best and most wonderful day ever."
  ]
};
export default shadowingData;
`;
fs.writeFileSync(path.join(W35_DIR, 'shadowing.js'), shadowingCode);

const shadowingIpaCode = `// Week 35 Shadowing IPA Data
export default [
  { id: 1, text: "Last Saturday was the most memorable day of my summer holiday.", ipa: "/lɑːst ˈsætədeɪ wəz ðə məʊst ˈmemərəbl deɪ əv maɪ ˈsʌmə ˈhɒlədeɪ/" },
  { id: 2, text: "Our family packed our backpacks and drove to the mountains.", ipa: "/ˈaʊə ˈfæməli pækt ˈaʊə ˈbækpæks ənd drəʊv tə ðə ˈmaʊntɪnz/" },
  { id: 3, text: "While my parents were setting up the tent, we collected firewood.", ipa: "/waɪl maɪ ˈpeərənts wə ˈsetɪŋ ʌp ðə tent wi kəˈlektɪd ˈfaɪəwʊd/" },
  { id: 4, text: "In the afternoon, we went hiking along a winding forest stream.", ipa: "/ɪn ði ˌɑːftəˈnuːn wi went ˈhaɪkɪŋ əˈlɒŋ ə ˈwaɪndɪŋ ˈfɒrɪst striːm/" },
  { id: 5, text: "We sat together and roasted delicious sweet marshmallows.", ipa: "/wi sæt təˈɡeðər ənd ˈrəʊstɪd dɪˈlɪʃəs swiːt ˌmɑːʃˈmæləʊz/" }
];
`;
fs.writeFileSync(path.join(W35_DIR, 'shadowing_ipa.js'), shadowingIpaCode);

// 8. ASK_AI.JS (Nova Dialogue & P2 Info Exchange)
const askAiCode = `// Week 35 Mascot Nova AI Voice Dialogue Cards & Cambridge P2 Info Exchange
export default [
  { id: 1, title_en: "Turn 1: Where did you go for your adventure?", sample_question_en: "We went camping at Pine Valley Mountain last Saturday.", sample_question_vi: "Chúng tôi đã đi cắm trại ở Núi Thung Lũng Thông vào thứ Bảy tuần trước.", answer: "Wonderful! What was the weather like on the mountain?", word_bank: ["camping", "Pine", "Valley", "Mountain", "Saturday"] },
  { id: 2, title_en: "Turn 2: What did you do while setting up camp?", sample_question_en: "We collected dry pine branches for the warm campfire.", sample_question_vi: "Chúng tôi đã nhặt những cành thông khô cho đống lửa trại ấm áp.", answer: "Great teamwork! Did you go hiking in the afternoon?", word_bank: ["collected", "pine", "branches", "warm", "campfire"] },
  { id: 3, title_en: "Turn 3: What did you see along the forest stream?", sample_question_en: "We saw two playful squirrels jumping in the trees.", sample_question_vi: "Chúng tôi nhìn thấy hai chú sóc tinh nghịch đang nhảy trên cây.", answer: "How lovely! What delicious treat did you enjoy in the evening?", word_bank: ["saw", "playful", "squirrels", "forest", "stream"] },
  { id: 4, title_en: "Turn 4: How did you spend your evening around the fire?", sample_question_en: "We roasted sweet marshmallows and told funny stories.", sample_question_vi: "Chúng tôi đã nướng kẹo xốp ngọt và kể những câu chuyện vui.", answer: "Sounds delicious! What did you see when you looked up at the sky?", word_bank: ["roasted", "sweet", "marshmallows", "campfire", "stories"] },
  { id: 5, title_en: "Turn 5: Why was this truly the best day ever?", sample_question_en: "Because we spent happy time together under the starry sky.", sample_question_vi: "Bởi vì chúng tôi đã có khoảng thời gian hạnh phúc cùng nhau dưới bầu trời đầy sao.", answer: "Splendid! Nature and family make the best memories.", word_bank: ["happy", "time", "together", "starry", "sky"] }
];

export const CUE_CARD_PROMPTS = [
  {
    cue_id: "cue_1",
    target_prompt_en: "Where / the family / go camping last weekend?",
    target_prompt_vi: "Hỏi Nova: Gia đình đã đi cắm trại ở đâu cuối tuần trước?",
    question_word: "Where",
    word_bank: ["Where", "did", "the", "family", "go", "camping", "last", "weekend", "?"],
    scrambled_words: ["weekend", "camping", "Where", "family", "go", "last", "did", "the", "?"],
    acceptable_questions: [
      "Where did the family go camping last weekend?",
      "Where did they go camping?",
      "Where did the family go?"
    ],
    nova_answer_audio_text: "The family went camping at Pine Valley Mountain last Saturday."
  },
  {
    cue_id: "cue_2",
    target_prompt_en: "What / the children / collect for the campfire?",
    target_prompt_vi: "Hỏi Nova: Các bạn nhỏ đã nhặt thứ gì cho đống lửa trại?",
    question_word: "What",
    word_bank: ["What", "did", "the", "children", "collect", "for", "campfire", "?"],
    scrambled_words: ["collect", "What", "campfire", "children", "did", "the", "for", "?"],
    acceptable_questions: [
      "What did the children collect for the campfire?",
      "What did they collect?",
      "What did the children gather?"
    ],
    nova_answer_audio_text: "The children collected dry pine branches to make a warm campfire."
  },
  {
    cue_id: "cue_3",
    target_prompt_en: "What wildlife / they / spot near the stream?",
    target_prompt_vi: "Hỏi Nova: Họ đã nhìn thấy động vật hoang dã nào gần con suối?",
    question_word: "What",
    word_bank: ["What", "animals", "did", "they", "see", "near", "stream", "?"],
    scrambled_words: ["see", "What", "stream", "animals", "did", "near", "they", "?"],
    acceptable_questions: [
      "What animals did they see near the stream?",
      "What did they spot near the stream?",
      "What did they see while hiking?"
    ],
    nova_answer_audio_text: "While hiking along the stream, they spotted two playful squirrels."
  },
  {
    cue_id: "cue_4",
    target_prompt_en: "What / sweet food / they / roast in the evening?",
    target_prompt_vi: "Hỏi Nova: Họ đã nướng món ăn ngọt nào vào buổi tối?",
    question_word: "What",
    word_bank: ["What", "did", "they", "roast", "over", "the", "fire", "?"],
    scrambled_words: ["roast", "What", "fire", "they", "did", "over", "the", "?"],
    acceptable_questions: [
      "What did they roast over the fire?",
      "What did they eat in the evening?",
      "What sweet food did they roast?"
    ],
    nova_answer_audio_text: "They roasted sweet marshmallows on thin sticks over the warm campfire."
  },
  {
    cue_id: "cue_5",
    target_prompt_en: "Why / was / it the best day ever?",
    target_prompt_vi: "Hỏi Nova: Tại sao đó lại là ngày tuyệt vời nhất?",
    question_word: "Why",
    word_bank: ["Why", "was", "it", "the", "best", "day", "ever", "?"],
    scrambled_words: ["best", "Why", "ever", "day", "was", "the", "it", "?"],
    acceptable_questions: [
      "Why was it the best day ever?",
      "Why was the day so memorable?",
      "Why did they enjoy the camping trip?"
    ],
    nova_answer_audio_text: "Because the whole family worked together and enjoyed the starry night sky."
  }
];

export const INFORMATION_EXCHANGE_P2 = {
  theme: "The Pine Valley Camping Trip Information Exchange",
  candidateA: {
    cardTitle: "Candidate A: The Pine Valley Campsite",
    fields: [
      { label: "Campsite Name", value: "Pine Valley Mountain Campsite" },
      { label: "Day of Trip", value: "Sunny Saturday morning" },
      { label: "Tent Color", value: "Large blue cloth tent" },
      { label: "Evening Activity", value: "Roasting sweet marshmallows by campfire" },
      { label: "Night View", value: "Clear starry sky with bright constellations" }
    ]
  },
  candidateB: {
    cardTitle: "Candidate B: The Mountain Hikers",
    prompts: CUE_CARD_PROMPTS
  }
};
`;
fs.writeFileSync(path.join(W35_DIR, 'ask_ai.js'), askAiCode);

// 9. DAILY_WATCH, MINDMAP, LOGIC_SCIENCE, WORD_MATCH/POWER
const dailyWatchCode = `// Week 35 Educational Videos
export default [
  { id: 1, title: "Family Camping Adventure in the Woods", videoId: "9m-9Jg3_k-8", channel: "Kids Outdoor Club", duration: "4:15" },
  { id: 2, title: "How to Build a Safe Campfire", videoId: "Wp_r6vK0z9M", channel: "SciShow Kids", duration: "3:50" },
  { id: 3, title: "Stargazing for Beginners: Find Constellations", videoId: "M2K-xL9pQ34", channel: "National Geographic Kids", duration: "4:30" },
  { id: 4, title: "Past Continuous with While and When in Stories", videoId: "8Z7-eR4kL12", channel: "Grammar Station", duration: "3:20" },
  { id: 5, title: "Forest Streams and Mountain Wildlife", videoId: "P4q_8sB2w_x", channel: "BBC Earth Kids", duration: "4:00" }
];
`;
fs.writeFileSync(path.join(W35_DIR, 'daily_watch.js'), dailyWatchCode);

const mindmapCode = `// Week 35 Mindmap Speaking Data (6 stems x 6 branches = 36 branches)
export default {
  centerStems: [
    { id: 'stem_1', title: 'The Campsite', branches: ['Pine Valley Mountain', 'Large blue tent', 'Soft green grass', 'Quiet pine forest', 'Cool crystal stream', 'Circle of stones'] },
    { id: 'stem_2', title: 'Day Activities', branches: ['Packed backpacks', 'Pitched the tent', 'Gathered pine wood', 'Hiked along stream', 'Spotted squirrels', 'Splashed in water'] },
    { id: 'stem_3', title: 'Night Campfire', branches: ['Lit warm fire', 'Sat together', 'Roasted marshmallows', 'Told funny stories', 'Sang cheerful songs', 'Laughed out loud'] },
    { id: 'stem_4', title: 'Nature Wonders', branches: ['High rocky mountain', 'Winding forest stream', 'Playful tree squirrels', 'Golden sunset lake', 'Clear starry sky', 'Bright constellations'] },
    { id: 'stem_5', title: 'Camping Safety', branches: ['Circle of stones', 'Safe cooking distance', 'Extinguish with water', 'Check cold embers', 'Pack all litter', 'Respect forest wildlife'] },
    { id: 'stem_6', title: 'Best Memories', branches: ['Worked together', 'Family love', 'Peaceful nature', 'Delicious treats', 'Starry night sky', 'Best day ever'] }
  ]
};
`;
fs.writeFileSync(path.join(W35_DIR, 'mindmap.js'), mindmapCode);

const logicScienceCode = `// Week 35 Action Lab: Campfire Thermodynamics & Extinguishment
export default {
  title: "Action Lab: The Science of Campfires & Fire Safety",
  steps: [
    {
      id: 1,
      title: "Step 1: Fire Triangle Components",
      instruction: "Select the three things needed for a healthy campfire.",
      options: ["Heat, Fuel (dry wood), Oxygen (air)", "Water, Stones, Glass", "Cold ice, Plastic, Metal"],
      answer: "Heat, Fuel (dry wood), Oxygen (air)",
      explanation: "Fire needs heat to ignite, fuel to burn, and oxygen to sustain combustion."
    },
    {
      id: 2,
      title: "Step 2: Safe Fire Containment",
      instruction: "Why do campers arrange stones in a circle around the fire?",
      options: ["To block wind and prevent burning embers from spreading", "To cook food faster", "To make the fire colorful"],
      answer: "To block wind and prevent burning embers from spreading",
      explanation: "A stone ring acts as a non-flammable thermal barrier."
    },
    {
      id: 3,
      title: "Step 3: Complete Extinguishment",
      instruction: "What is the proper scientific way to put out a campfire completely?",
      options: ["Drown with water, stir coals with a stick, feel until cold", "Blow on it with mouth", "Cover with dry leaves"],
      answer: "Drown with water, stir coals with a stick, feel until cold",
      explanation: "Water rapidly cools heat below ignition temperature, eliminating hidden embers."
    }
  ]
};
`;
fs.writeFileSync(path.join(W35_DIR, 'logic_science.js'), logicScienceCode);

const wordMatchCode = `// Week 35 Word Match Pairs (10 Pairs)
export default [
  { id: 1, word: "adventure", match: "an exciting outdoor experience", vi: "chuyến phiêu lưu" },
  { id: 2, word: "tent", match: "cloth shelter supported by poles", vi: "cái lều" },
  { id: 3, word: "campfire", match: "outdoor fire made by campers", vi: "lửa trại" },
  { id: 4, word: "hiking", match: "long walk in the countryside", vi: "đi bộ đường dài" },
  { id: 5, word: "stream", match: "small narrow river in the forest", vi: "con suối nhỏ" },
  { id: 6, word: "marshmallow", match: "soft sweet treat roasted on sticks", vi: "kẹo xốp" },
  { id: 7, word: "flashlight", match: "portable electric light for night", vi: "đèn pin" },
  { id: 8, word: "starry", match: "full of bright shining stars", vi: "đầy sao" },
  { id: 9, word: "mountain", match: "a very high hill with steep rocks", vi: "ngọn núi" },
  { id: 10, word: "memorable", match: "worth remembering for a long time", vi: "đáng nhớ" }
];
`;
fs.writeFileSync(path.join(W35_DIR, 'word_match.js'), wordMatchCode);

const wordPowerCode = `// Week 35 Word Power Synonyms & Collocations
export default [
  { id: 1, base: "memorable", synonym: "unforgettable", collocation: "memorable camping trip", vi: "chuyến cắm trại đáng nhớ" },
  { id: 2, base: "starry", synonym: "shining", collocation: "starry night sky", vi: "bầu trời đêm đầy sao" },
  { id: 3, base: "crystal", synonym: "sparkling", collocation: "crystal clear stream", vi: "con suối trong vắt" },
  { id: 4, base: "playful", synonym: "lively", collocation: "playful squirrels", vi: "những chú sóc tinh nghịch" },
  { id: 5, base: "warm", synonym: "cozy", collocation: "warm glowing campfire", vi: "đống lửa trại ấm áp" }
];
`;
fs.writeFileSync(path.join(W35_DIR, 'word_power.js'), wordPowerCode);

// ─────────────────────────────────────────────────────────────────────────────
// 10. READING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const readingHubCode = `/**
 * Week 35 Gold Standard Data — Reading Hub
 * Theme: "The Best Day Ever: Mountain Camping"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 35,
  theme: "The Best Day Ever: Mountain Camping",
  cefr_level: "A2 Flyers",
  vocab: vocabList,

  // CLIL Knowledge Explorer (Camping Safety & Stargazing)
  clil_article: {
    id: "clil_w35_camping_safety",
    theme: "Camping Safety & Stargazing in Nature",
    title_en: "Camping Safety & Stargazing in Nature",
    title_vi: "An Toàn Cắm Trại & Ngắm Sao Trong Tự Nhiên",
    content_en: "Camping in nature is an exciting outdoor adventure. When setting up camp, always choose a flat and dry area. Keep your campfire inside a circle of stones to prevent sparks from spreading. While cooking over the fire, always stay at a safe distance. At night, look up at the starry sky to find famous constellations. Stars create wonderful shapes that help explorers find north. When leaving, pour clean water over the campfire until it is completely cold. Protecting the forest keeps nature safe for everyone!",
    content_vi: "Cắm trại trong tự nhiên là một chuyến phiêu lưu ngoài trời thú vị. Khi dựng trại, hãy luôn chọn vùng đất phẳng và khô ráo. Giữ lửa trại bên trong vòng đá để tránh tia lửa bay lan. Trong khi nấu nướng trên lửa, hãy luôn giữ khoảng cách an toàn. Vào ban đêm, hãy ngước nhìn bầu trời sao để tìm các chòm sao nổi tiếng. Các ngôi sao tạo nên những hình thù tuyệt đẹp giúp các nhà thám hiểm định hướng phương bắc. Khi rời đi, hãy dập tắt lửa bằng nước sạch cho đến khi củi nguội hẳn. Bảo vệ khu rừng giúp giữ an toàn cho mọi người!",
    audio_url: "/audio/week35/explore.mp3",
    check_questions: [
      { id: 1, question_en: "Where should you place a campfire to keep it safe?", options: ["Inside a circle of stones away from dry grass", "Under dry tree leaves", "Inside the sleeping tent"], answer: "Inside a circle of stones away from dry grass" },
      { id: 2, question_en: "How do star constellations help explorers at night?", options: ["They create shapes that help find north", "They make loud whistling sounds", "They change into shooting stars"], answer: "They create shapes that help find north" },
      { id: 3, question_en: "What must you do before leaving the campsite?", options: ["Pour water on the campfire until it is cold", "Leave the campfire burning brightly", "Hide the tent in the bushes"], answer: "Pour water on the campfire until it is cold" }
    ],
    critical_thinking: {
      question_en: "Why is it important to extinguish campfires completely before leaving?",
      hint_en: "Think about forest fire safety: hot coals can relight with wind and harm trees and wildlife."
    }
  },

  interactive_story: {
    mode: "open_cloze",
    title: "Interactive Story: Mountain Camping Trip",
    text_template: "Last Saturday, our family went ____1____ at Pine Valley Mountain. While parents pitched the large blue ____2____, we collected dry firewood. In the afternoon, we went ____3____ along the cool stream. When evening arrived, Dad lit the warm ____4____. We roasted sweet marshmallows and looked up at the ____5____ night sky happily.",
    gaps: [
      { id: 1, target: "camping", hint: "outdoor tent holiday", hint_en: "outdoor tent holiday", hint_vi: "cắm trại" },
      { id: 2, target: "tent", hint: "cloth shelter", hint_en: "cloth shelter", hint_vi: "cái lều" },
      { id: 3, target: "hiking", hint: "walking in nature", hint_en: "walking in nature", hint_vi: "đi bộ đường dài" },
      { id: 4, target: "campfire", hint: "outdoor wood fire", hint_en: "outdoor wood fire", hint_vi: "lửa trại" },
      { id: 5, target: "starry", hint: "full of shining stars", hint_en: "full of shining stars", hint_vi: "đầy sao" }
    ],
    hints: {
      1: "outdoor tent holiday",
      2: "cloth shelter",
      3: "walking in nature",
      4: "outdoor wood fire",
      5: "full of shining stars"
    },
    word_bank: ["camping", "tent", "hiking", "campfire", "starry"]
  },

  story_scenes: read_explore.story_scenes,
  read_explore,

  // Cambridge Reading & Writing Part 6 (Open Cloze Diary)
  rw_part_6: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Oliver's Summer Diary: Sunday",
    text_template: "Dear Diary, yesterday was the best day of my holiday. We went camping [1]_____ Pine Valley Mountain. While my parents were setting [2]_____ the tent, we gathered dry wood. In the afternoon, we went hiking [3]_____ the forest stream. In the evening, we sat around the fire [4]_____ roasted sweet marshmallows. The stars were shining brightly [5]_____ our heads!",
    answers: {
      "1": "at",
      "2": "up",
      "3": "along",
      "4": "and",
      "5": "above"
    }
  },

  rw_part_6_check_mode: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Lucas's Recount: Monday (Check Mode)",
    text_template: "Yesterday was a memorable day. We drove [1]_____ the mountain in the morning. While my brother [2]_____ looking for pine cones, I set up my sleeping bag. We cooked dinner [3]_____ the campfire. It was delicious [4]_____ we were very hungry. It was truly [5]_____ best day ever.",
    answers: {
      "1": "to",
      "2": "was",
      "3": "over",
      "4": "because",
      "5": "the"
    }
  },

  check_mode_drills: [
    { id: 1, prompt: "Our family went camping ___ Pine Valley Mountain last Saturday.", options: ["at", "between", "inside"], answer: "at" },
    { id: 2, prompt: "Dad and I pitched our large blue ___ on the soft grass.", options: ["tent", "table", "chair"], answer: "tent" },
    { id: 3, prompt: "While parents set up camp, we ___ dry pine branches.", options: ["collected", "are collecting", "collects"], answer: "collected" },
    { id: 4, prompt: "We went hiking along a cool, crystal clear forest ___.", options: ["stream", "cloud", "road"], answer: "stream" },
    { id: 5, prompt: "Dad lit the warm ___ when the sun went down.", options: ["campfire", "ice", "stone"], answer: "campfire" },
    { id: 6, prompt: "We roasted sweet ___ on thin sticks over the fire.", options: ["marshmallows", "salt", "paper"], answer: "marshmallows" },
    { id: 7, prompt: "Looking up at the night sky, we saw many bright ___.", options: ["stars", "cars", "boats"], answer: "stars" },
    { id: 8, prompt: "The children were very ___ to sleep outdoors in nature.", options: ["excited", "angry", "sad"], answer: "excited" },
    { id: 9, prompt: "Before leaving the campsite, we ___ the fire with water.", options: ["extinguished", "lighted", "kept"], answer: "extinguished" },
    { id: 10, prompt: "Camping with my family was truly the ___ day ever.", options: ["best", "worst", "darkest"], answer: "best" }
  ]
};

export default readingHubData;
`;
fs.writeFileSync(path.join(W35_DIR, 'reading_hub.js'), readingHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 11. LISTENING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const listeningHubCode = `/**
 * Week 35 Gold Standard Data — Listening Hub
 * Theme: "The Best Day Ever: Mountain Camping"
 * Cambridge A2 Flyers Full Exam Standard Audio & Scripts
 */

import dictation from './dictation.js';
import shadowing from './shadowing.js';
import singaporeMath from './singapore_math.js';
import logicScience from './logic_science.js';

export const listeningHubData = {
  week: 35,
  theme: "The Best Day Ever: Mountain Camping",
  dictation,
  shadowing,
  singapore_math: singaporeMath,
  science_lab: logicScience,

  // Cambridge Listening Part 2 (Secret Notes / Notepad Note Completer)
  listening_p2_notes: [
    { id: 1, label: "Trip Destination", hint: "Where did they go?", target: "Pine Valley", audio_text: "The family went camping at Pine Valley Mountain." },
    { id: 2, label: "Tent Color", hint: "What color was the tent?", target: "blue", audio_text: "Dad and the boys set up a large blue tent on the grass." },
    { id: 3, label: "Afternoon Activity", hint: "What did they do near stream?", target: "hiking", audio_text: "In the afternoon, they went hiking along the forest stream." },
    { id: 4, label: "Evening Treat", hint: "What did they roast?", target: "marshmallows", audio_text: "They sat around the fire and roasted sweet marshmallows." },
    { id: 5, label: "Night View", hint: "What was shining above?", target: "starry sky", audio_text: "Everyone looked up at the clear starry sky before bed." }
  ],

  // Cambridge Listening Part 1 (SVG Line Matcher — Campsite Scene)
  listening_p1: {
    image_url: '/images/week35/w35_listening_p1_scene.jpg',
    audio_url: '/audio/week35/listening_p1_full.mp3',
    passage_audio_script: \`Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Girl: Look at our family campsite in Pine Valley! It was such a wonderful day.
Man: Oh yes! I can see a boy pitching the blue tent with his father. Is that Oliver?
Girl: Yes, that is Oliver. He is holding the tent pole carefully.
Man: That is very helpful of him.
Nova: Can you see the line? This is an example. Now you listen and draw lines.
Girl: Can you see the girl holding a wooden stick with a marshmallow?
Man: Ah yes! She is wearing a green sweater and smiling by the fire.
Girl: That's Lily! She loves roasting marshmallows over the warm campfire.
Man: Look near the forest stream! There is a boy carrying a red backpack.
Girl: That is Harry. He just finished hiking along the mountain trail.
Man: Who is that man sitting on the wooden log playing a guitar?
Girl: That is Uncle Robert. He was singing cheerful campfire songs for us.
Man: Look near the tall pine tree. Is that a woman taking photographs?
Girl: Yes, that is Aunt Sarah. She was photographing the golden sunset over the lake.
Man: Now look at the boy shining a flashlight into the tent.
Girl: That is Jack. He is looking for his cozy sleeping bag before bedtime.\`,
    names: [
      { id: 'n1', text: 'Oliver', target_id: 't1', isExample: true },
      { id: 'n2', text: 'Lily', target_id: 't2' },
      { id: 'n3', text: 'Harry', target_id: 't3' },
      { id: 'n4', text: 'Uncle Robert', target_id: 't4' },
      { id: 'n5', text: 'Aunt Sarah', target_id: 't5' },
      { id: 'n6', text: 'Jack', target_id: 't6' }
    ],
    targets: [
      { id: 't1', label: 'Oliver (Boy holding blue tent pole on left)', x: 30, y: 55, isExample: true },
      { id: 't2', label: 'Lily (Girl roasting marshmallow by fire)', x: 55, y: 65 },
      { id: 't3', label: 'Harry (Boy with red backpack by stream)', x: 18, y: 70 },
      { id: 't4', label: 'Uncle Robert (Man playing guitar on log)', x: 70, y: 60 },
      { id: 't5', label: 'Aunt Sarah (Woman taking sunset photos)', x: 82, y: 40 },
      { id: 't6', label: 'Jack (Boy shining flashlight near tent)', x: 40, y: 48 }
    ]
  },

  // Cambridge Listening Part 3 (Visual Matching A-H — Campsite Items)
  listening_p3: {
    passage_audio_script: \`Teacher: Hello Oliver! Where did you keep all your camping supplies during the trip?
Oliver: I organized everything carefully, Mrs. Taylor! I remember where all the items were.
Teacher: First, where was the bright flashlight kept? Was it inside your backpack?
Oliver: No! The flashlight was placed on the wooden picnic table near the campfire.
Teacher: Excellent. And what about your warm sleeping bag? Where did you put that?
Oliver: My sleeping bag was unrolled inside the blue family tent on the soft mat.
Teacher: Right. And where did Dad keep the box of sweet marshmallows?
Oliver: Dad kept the marshmallows inside the metal cooler box near the car.
Teacher: Good idea! What about your camera? Did you take photos of the wildlife?
Oliver: Yes! My camera was hanging on the pine branch beside our tent.
Teacher: And what about your water bottle? Was that in your hand while hiking?
Oliver: Yes, my water bottle was in the side pocket of my green hiking backpack!\`,
    items: [
      { id: 1, name: 'Bright Flashlight', target_letter: 'A', audio_url: '/audio/week35/listening_p3_item1.mp3', audio_text: "Teacher: Where was the bright flashlight kept?\nOliver: The flashlight was placed on the wooden picnic table near the campfire." },
      { id: 2, name: 'Warm Sleeping Bag', target_letter: 'B', audio_url: '/audio/week35/listening_p3_item2.mp3', audio_text: "Teacher: And what about your warm sleeping bag?\nOliver: My sleeping bag was unrolled inside the blue family tent on the soft mat." },
      { id: 3, name: 'Sweet Marshmallows', target_letter: 'C', audio_url: '/audio/week35/listening_p3_item3.mp3', audio_text: "Teacher: Where did Dad keep the box of sweet marshmallows?\nOliver: Dad kept the marshmallows inside the metal cooler box near the car." },
      { id: 4, name: 'Digital Camera', target_letter: 'D', audio_url: '/audio/week35/listening_p3_item4.mp3', audio_text: "Teacher: Where was your camera?\nOliver: My camera was hanging on the pine branch beside our tent." },
      { id: 5, name: 'Water Bottle', target_letter: 'E', audio_url: '/audio/week35/listening_p3_item5.mp3', audio_text: "Teacher: And what about your water bottle?\nOliver: My water bottle was in the side pocket of my green hiking backpack!" }
    ],
    cards: [
      { letter: 'A', name: 'Wooden Picnic Table', location_name: 'Picnic Table', image_url: '/images/week35/picnic_table.jpg' },
      { letter: 'B', name: 'Inside Blue Tent', location_name: 'Blue Tent', image_url: '/images/week35/inside_tent.jpg' },
      { letter: 'C', name: 'Metal Cooler Box', location_name: 'Cooler Box', image_url: '/images/week35/cooler_box.jpg' },
      { letter: 'D', name: 'Pine Tree Branch', location_name: 'Tree Branch', image_url: '/images/week35/tree_branch.jpg' },
      { letter: 'E', name: 'Green Backpack Pocket', location_name: 'Backpack Pocket', image_url: '/images/week35/backpack_pocket.jpg' },
      { letter: 'F', name: 'Rocky Stream Bank', location_name: 'Stream Bank', image_url: '/images/week35/stream_bank.jpg' },
      { letter: 'G', name: 'Car Trunk', location_name: 'Car Trunk', image_url: '/images/week35/car_trunk.jpg' },
      { letter: 'H', name: 'Campfire Circle', location_name: 'Campfire Circle', image_url: '/images/week35/campfire_circle.jpg' }
    ]
  },

  // Cambridge Listening Part 4 (3-Picture Options with Distractors)
  listening_p4_questions: [
    {
      id: 1,
      question: "What was the weather like when the family arrived?",
      audio_text: "Boy: Was it raining when you reached Pine Valley?\nGirl: No, it was warm and sunny with a gentle mountain breeze.",
      correct_option: "A",
      options: [
        { id: "A", label: "Sunny and warm", image_url: "/images/week35/p4_q1_a.jpg" },
        { id: "B", label: "Rainy thunderstorm", image_url: "/images/week35/p4_q1_b.jpg" },
        { id: "C", label: "Snowy cold", image_url: "/images/week35/p4_q1_c.jpg" }
      ]
    },
    {
      id: 2,
      question: "What animals did the children spot during their hike?",
      audio_text: "Boy: Did you see any wild deer near the stream?\nGirl: No, we saw two playful squirrels jumping in the pine trees.",
      correct_option: "B",
      options: [
        { id: "A", label: "Two brown bears", image_url: "/images/week35/p4_q2_a.jpg" },
        { id: "B", label: "Two playful squirrels", image_url: "/images/week35/p4_q2_b.jpg" },
        { id: "C", label: "Wild mountain deer", image_url: "/images/week35/p4_q2_c.jpg" }
      ]
    },
    {
      id: 3,
      question: "What did Dad cook for dinner over the campfire?",
      audio_text: "Boy: Did Dad cook fish from the stream?\nGirl: No, we cooked delicious sweet corn and roasted sausages on sticks.",
      correct_option: "C",
      options: [
        { id: "A", label: "Fried fish", image_url: "/images/week35/p4_q3_a.jpg" },
        { id: "B", label: "Chicken soup", image_url: "/images/week35/p4_q3_b.jpg" },
        { id: "C", label: "Sweet corn and sausages", image_url: "/images/week35/p4_q3_c.jpg" }
      ]
    },
    {
      id: 4,
      question: "What musical instrument did Uncle Robert play?",
      audio_text: "Boy: Was Uncle Robert playing a flute by the fire?\nGirl: No, he was playing an acoustic guitar and singing songs.",
      correct_option: "A",
      options: [
        { id: "A", label: "Acoustic guitar", image_url: "/images/week35/p4_q4_a.jpg" },
        { id: "B", label: "Wooden flute", image_url: "/images/week35/p4_q4_b.jpg" },
        { id: "C", label: "Silver trumpet", image_url: "/images/week35/p4_q4_c.jpg" }
      ]
    },
    {
      id: 5,
      question: "What did they see in the clear night sky before bed?",
      audio_text: "Boy: Did you see the full moon rising?\nGirl: Yes, and we saw bright starry constellations above the mountain.",
      correct_option: "B",
      options: [
        { id: "A", label: "Dark storm clouds", image_url: "/images/week35/p4_q5_a.jpg" },
        { id: "B", label: "Starry constellations", image_url: "/images/week35/p4_q5_b.jpg" },
        { id: "C", label: "Hot air balloon", image_url: "/images/week35/p4_q5_c.jpg" }
      ]
    }
  ],

  // Cambridge Listening Part 5 (Color & Write)
  listening_p5: {
    image_url: "/images/week35/w35_listening_p5_scene.jpg",
    instructions: [
      { id: 1, item: "Family Tent", color: "blue", target_desc: "Color the family tent blue", audio_text: "Look at the large tent on the grass. Color it blue." },
      { id: 2, item: "Campfire Flames", color: "orange", target_desc: "Color the warm campfire flames orange", audio_text: "Can you see the campfire? Color the flames orange." },
      { id: 3, item: "Hiking Backpack", color: "red", target_desc: "Color the backpack by the log red", audio_text: "Now find the backpack beside the wooden log. Color it red." },
      { id: 4, item: "Signboard", write_word: "CAMP", target_desc: "Write the word CAMP on the wooden trail sign", audio_text: "Look at the wooden sign by the path. Write the word CAMP on it." },
      { id: 5, item: "Shining Flashlight", color: "yellow", target_desc: "Color the flashlight on the table yellow", audio_text: "Look at the flashlight on the picnic table. Color it yellow." }
    ]
  }
};

export default listeningHubData;
`;
fs.writeFileSync(path.join(W35_DIR, 'listening_hub.js'), listeningHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 12. WRITING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const writingHubCode = `/**
 * Week 35 Gold Standard Data — Writing Hub
 * Theme: "The Best Day Ever: Mountain Camping"
 */

import writing from './writing.js';

export const writingHubData = {
  week: 35,
  theme: "The Best Day Ever: Mountain Camping",
  picture_story: writing.picture_story,
  word_bank_pills: writing.word_bank_pills,
  model_sentence: writing.model_sentence,
  sentence_frames: writing.sentence_frames,
  min_words: writing.min_words || 20,
  pbl_mission: {
    title_en: "Offline Family Recount Journal Project",
    title_vi: "Dự Án Nhật Ký Kỷ Niệm Gia Đình Đáng Nhớ",
    task_en: "1. Draw a 3-panel storyboard about your most memorable day with family or friends.\\n2. Write 2 sentences under each drawing using past continuous and past simple (e.g., 'While we were walking, we saw...').\\n3. Record a 1-minute audio retelling your memorable day.",
    task_vi: "1. Vẽ một truyện 3 khung hình về ngày đáng nhớ nhất của em cùng gia đình hoặc bạn bè.\\n2. Viết 2 câu dưới mỗi bức tranh dùng thì quá khứ tiếp diễn và quá khứ đơn.\\n3. Thu âm 1 phút kể lại kỷ niệm đáng nhớ của em."
  },

  // Cambridge Reading & Writing Part 1 (10 Definitions, 15 Word Bank)
  rw_part_1: {
    instructions: "Look and read. Choose the correct words and write them on the lines.",
    words: [
      { id: 'w1', word: 'a tent', image_url: '/images/week35/vocab_tent.jpg' },
      { id: 'w2', word: 'a campfire', image_url: '/images/week35/vocab_campfire.jpg' },
      { id: 'w3', word: 'a stream', image_url: '/images/week35/vocab_stream.jpg' },
      { id: 'w4', word: 'a backpack', image_url: '/images/week35/vocab_backpack.jpg' },
      { id: 'w5', word: 'a flashlight', image_url: '/images/week35/vocab_flashlight.jpg' },
      { id: 'w6', word: 'marshmallows', image_url: '/images/week35/vocab_marshmallow.jpg' },
      { id: 'w7', word: 'a mountain', image_url: '/images/week35/vocab_mountain.jpg' },
      { id: 'w8', word: 'a forest', image_url: '/images/week35/vocab_forest.jpg' },
      { id: 'w9', word: 'a guitar', image_url: '/images/week35/guitar.jpg' },
      { id: 'w10', word: 'a sunset', image_url: '/images/week35/vocab_sunset.jpg' },
      { id: 'w11', word: 'a squirrel', image_url: '/images/week35/squirrel.jpg' },
      { id: 'w12', word: 'a sleeping bag', image_url: '/images/week35/sleeping_bag.jpg' },
      { id: 'w13', word: 'a log', image_url: '/images/week35/log.jpg' },
      { id: 'w14', word: 'a river', image_url: '/images/week35/river.jpg' },
      { id: 'w15', word: 'stars', image_url: '/images/week35/stars.jpg' }
    ],
    definitions: [
      { id: 1, text: "This is a cloth shelter supported by poles that campers sleep inside.", answer: "a tent" },
      { id: 2, text: "This is an outdoor fire where campers cook food and stay warm.", answer: "a campfire" },
      { id: 3, text: "This is a small narrow river with cool flowing fresh water.", answer: "a stream" },
      { id: 4, text: "You wear this bag on your back to carry food, jackets, and bottles.", answer: "a backpack" },
      { id: 5, text: "This is a small portable battery light that helps you see in the dark.", answer: "a flashlight" },
      { id: 6, text: "These are sweet white soft treats that campers roast over the fire.", answer: "marshmallows" },
      { id: 7, text: "This is a very high hill with steep rocks that people climb.", answer: "a mountain" },
      { id: 8, text: "This is a warm padded bag that you unroll and sleep in outdoors.", answer: "a sleeping bag" },
      { id: 9, text: "This small animal with a bushy tail jumps between pine tree branches.", answer: "a squirrel" },
      { id: 10, text: "This is the time in the evening when the golden sun goes down.", answer: "a sunset" }
    ]
  },

  // Cambridge Reading & Writing Part 2 (Dialogue 5 Turns)
  rw_part_2: {
    instructions: "Read the conversation between Lucas and Mia about the camping trip. Choose the best answer (A-H).",
    speakerA: "Lucas",
    speakerB: "Mia",
    turns: [
      { id: 1, prompt: "Hi Mia! Did you have a fun weekend with your family?", answer_key: "C" },
      { id: 2, prompt: "Where did you go camping?", answer_key: "E" },
      { id: 3, prompt: "What was the weather like on the mountain?", answer_key: "A" },
      { id: 4, prompt: "What did you do around the campfire in the evening?", answer_key: "F" },
      { id: 5, prompt: "Will you go camping again next summer?", answer_key: "D" }
    ],
    options: [
      { key: "A", text: "It was sunny and warm during the day, but cool at night." },
      { key: "B", text: "I bought a new backpack yesterday." },
      { key: "C", text: "Yes, it was truly the best day ever!" },
      { key: "D", text: "Definitely! We want to camp near the big lake next time." },
      { key: "E", text: "We drove to Pine Valley Mountain and pitched our tent." },
      { key: "F", text: "We roasted sweet marshmallows and sang songs together." },
      { key: "G", text: "I went to school by bus." },
      { key: "H", text: "No, the tent was blue." }
    ]
  },

  // Cambridge Reading & Writing Part 4 (Story Cloze 10 Gaps)
  rw_part_4: {
    instructions: "Read the story. Choose the best word from the box for each gap (1-10).",
    title: "An Unforgettable Night Under the Stars",
    text_template: "Last Saturday was a memorable day for Oliver. Early in the morning, his family packed their [1]_____ and drove to the mountains. When they arrived, Dad helped him pitch a large blue [2]_____ on the grass. While his parents were preparing lunch, Oliver and his sister [3]_____ dry firewood. In the afternoon, they went [4]_____ along a winding forest stream. The water was crystal [5]_____ and cool. When evening arrived, Dad lit the warm [6]_____. They sat together and [7]_____ sweet marshmallows on thin sticks. Looking up, they saw thousands of bright [8]_____ in the clear night sky. Oliver felt very [9]_____ for having such a wonderful family. It was the [10]_____ day ever!",
    word_bank: [
      { id: 1, word: "backpacks" },
      { id: 2, word: "tent" },
      { id: 3, word: "collected" },
      { id: 4, word: "hiking" },
      { id: 5, word: "clear" },
      { id: 6, word: "campfire" },
      { id: 7, word: "roasted" },
      { id: 8, word: "stars" },
      { id: 9, word: "grateful" },
      { id: 10, word: "best" },
      { id: 11, word: "snowing" },
      { id: 12, word: "angry" }
    ],
    answers: {
      "1": "backpacks",
      "2": "tent",
      "3": "collected",
      "4": "hiking",
      "5": "clear",
      "6": "campfire",
      "7": "roasted",
      "8": "stars",
      "9": "grateful",
      "10": "best"
    }
  },

  // Cambridge Reading & Writing Part 5 (Story Comprehension 7 Completions)
  rw_part_5: {
    title: "The Mountain Camping Adventure",
    story_text: "Last Saturday, Emma and her brother Sam went on their first camping adventure in Pine Valley. Their father drove them up the winding mountain road early in the morning. When they arrived, they pitched a large blue tent on a flat grassy clearing. While their mother was preparing sandwiches, Emma and Sam walked along a rocky stream. The water was fresh and cool. They spotted two playful squirrels jumping between tall pine branches. In the evening, the family sat around a warm campfire. They roasted sweet marshmallows, sang cheerful songs, and watched the golden sunset. Before going to bed, Emma looked at the bright starry sky and smiled happily.",
    questions: [
      { id: 1, prompt: "Emma and her brother Sam went on their first camping adventure last ___.", answer: "Saturday" },
      { id: 2, prompt: "Their father drove them up the mountain road early in the ___.", answer: "morning" },
      { id: 3, prompt: "The family pitched a large blue ___ on the flat grass.", answer: "tent" },
      { id: 4, prompt: "Emma and Sam walked along a rocky ___ in the forest.", answer: "stream" },
      { id: 5, prompt: "They spotted two playful ___ in the pine trees.", answer: "squirrels" },
      { id: 6, prompt: "In the evening, the family roasted sweet ___ over the fire.", answer: "marshmallows" },
      { id: 7, prompt: "Before going to sleep, Emma looked up at the bright ___ sky.", answer: "starry" }
    ]
  },

  writing
};

export default writingHubData;
`;
fs.writeFileSync(path.join(W35_DIR, 'writing_hub.js'), writingHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 13. SPEAKING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const speakingHubCode = `/**
 * Week 35 Gold Standard Data — Speaking Hub
 * Theme: "The Best Day Ever: Mountain Camping"
 */

import mindmap from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import shadowing from './shadowing.js';

export const speakingHubData = {
  week: 35,
  theme: "The Best Day Ever: Mountain Camping",
  mindmap,
  ask_ai,
  talkshow_turns: [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! Today we are sharing our best memories. Where did you go for your best adventure?" },
    { turn_number: 2, nova_question: "How exciting! What did you do while setting up the campsite in the morning?" },
    { turn_number: 3, nova_question: "What interesting wildlife did you spot while hiking along the forest stream?" },
    { turn_number: 4, nova_question: "How did your family spend the cozy evening around the warm campfire?" },
    { turn_number: 5, nova_question: "Why was stargazing under the clear night sky such a memorable moment?" }
  ],
  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,

  shadowing_sentences: shadowing.sentences,
  podcast_shadowing: {
    long_paragraph: {
      text: "Last Saturday was the most memorable day of my summer holiday. Our family packed our backpacks and drove to Pine Valley Mountain. While my parents were pitching our large blue tent, we collected firewood. In the afternoon, we hiked along a cool forest stream. In the evening, we roasted sweet marshmallows by the warm campfire under the starry sky.",
      audio_url: '/audio/week35/shadowing_full_paragraph.mp3'
    }
  },

  // Cambridge Speaking Part 1 (Find Differences - 6 Hotspots)
  find_differences: {
    picA: { title: 'Picture A (Original Campsite)', image_url: '/images/week35/w35_diff_scene_a.jpg' },
    picB: { title: 'Picture B (Difference Campsite)', image_url: '/images/week35/w35_diff_scene_b.jpg' },
    hotspots: [
      { id: 'diff1', name: 'Tent Color', x: 30, y: 55, prompt_en: 'In Picture A, the tent is blue, but in Picture B, it is green.' },
      { id: 'diff2', name: 'Backpack on Log', x: 50, y: 65, prompt_en: 'In Picture A, the backpack is red, but in Picture B, it is yellow.' },
      { id: 'diff3', name: 'Tree Squirrel', x: 75, y: 35, prompt_en: 'In Picture A, there is one squirrel, but in Picture B, there are two squirrels.' },
      { id: 'diff4', name: 'Flashlight on Table', x: 40, y: 48, prompt_en: 'In Picture A, the flashlight is turned on, but in Picture B, it is turned off.' },
      { id: 'diff5', name: 'Mountain Moon', x: 80, y: 20, prompt_en: 'In Picture A, there is a crescent moon, but in Picture B, there is a full moon.' },
      { id: 'diff6', name: 'Guitar beside Log', x: 65, y: 60, prompt_en: 'In Picture A, there is a guitar on the log, but in Picture B, there is no guitar.' }
    ]
  },

  // Cambridge Speaking Part 3 (5 Sequential Pictures Invariant)
  picture_story_continuation: {
    title: "The Mountain Camping Trip",
    intro_audio_text: "Look at the five pictures. They tell a story called 'The Mountain Camping Trip'. Just look at Picture 1 first. Early on Saturday morning, the family arrived at Pine Valley to go camping.",
    pictures: [
      { id: 1, title: "Picture 1: Setting up the tent", image: "/images/week35/webtoon_scene_1.png", is_intro: true, script: "Early on Saturday morning, the family arrived at Pine Valley to go camping." },
      { id: 2, title: "Picture 2: Hiking by the stream", image: "/images/week35/webtoon_scene_2.png", prompt_en: "Now you tell the story! What did the children do in Picture 2?", key_chunks: ["went hiking along stream", "crystal clear water"] },
      { id: 3, title: "Picture 3: Spotting tree squirrels", image: "/images/week35/webtoon_scene_3.png", prompt_en: "What wildlife did they discover in Picture 3?", key_chunks: ["spotted two squirrels", "jumping between branches"] },
      { id: 4, title: "Picture 4: Roasting marshmallows", image: "/images/week35/webtoon_scene_4.png", prompt_en: "What happened around the campfire in Picture 4?", key_chunks: ["lit warm campfire", "roasted sweet marshmallows"] },
      { id: 5, title: "Picture 5: Stargazing under the sky", image: "/images/week35/webtoon_scene_5.png", prompt_en: "How does the story end in Picture 5?", key_chunks: ["clear starry sky", "truly the best day ever"] }
    ]
  },

  // Cambridge AI Debate Arena
  debate_topics: [
    {
      id: "debate_w35_01",
      topic_title: "Camping Outdoors vs Staying at Home on Holidays",
      nova_statement: "I think staying at home during holidays is much better because you have comfortable beds and video games!",
      expected_counter_points: [
        "Camping in nature allows you to explore fresh air and mountain trails",
        "Outdoor activities help families bond and work together",
        "Stargazing and campfires create unforgettable lifelong memories"
      ],
      suggested_discourse_markers: [
        "I disagree with Nova because...",
        "In my opinion, camping outdoors is...",
        "For example, when you camp, you can roast marshmallows and..."
      ],
      sample_rebuttal: "I disagree with Nova because camping in nature gives fresh air and exciting adventures. You can hike along clear streams, roast marshmallows, and stargaze together with your family."
    }
  ]
};

export default speakingHubData;
`;
fs.writeFileSync(path.join(W35_DIR, 'speaking_hub.js'), speakingHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 14. INDEX.JS
// ─────────────────────────────────────────────────────────────────────────────
const indexCode = `// Index wrapper for Week 35
import read_explore from './read.js';
import explore from './explore.js';
import new_words from './vocab.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import grammar from './grammar.js';
import daily_watch from './daily_watch.js';
import logic_lab from './logic_lab.js';
import mindmap_speaking from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import writing from './writing.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';

import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';

export const weekData = {
  weekId: 35,
  title: "The Best Day Ever",
  weekTitle_en: "The Best Day Ever",
  title_vi: "Ngày Tuyệt Vời Nhất — Kể Lại Kỷ Niệm Cá Nhân",

  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,

  readingHub,
  listeningHub,
  writingHub,
  speakingHub,
  stations: {
    read_explore,
    explore,
    new_words,
    word_match,
    word_power,
    grammar,
    daily_watch,
    logic_lab,
    mindmap_speaking,
    ask_ai,
    writing,
    dictation,
    shadowing
  }
};

export default weekData;
`;
fs.writeFileSync(path.join(W35_DIR, 'index.js'), indexCode);

// ─────────────────────────────────────────────────────────────────────────────
// 15. WEEK_35_REAL.JS
// ─────────────────────────────────────────────────────────────────────────────
const weekRealCode = `// Week 35 Real Data — AI Tutor format
import vocab from './vocab.js';

export const weekRealData = {
  weekId: 35,
  theme: "The Best Day Ever",
  target_vocab: vocab,
  story_missions: [
    { mission_id: 1, title: "Mission 1: Arriving at Camp", prompt: "Tell Nova what the family did when they reached the campsite." },
    { mission_id: 2, title: "Mission 2: Evening Campfire", prompt: "Describe how they roasted marshmallows and enjoyed the starry sky." },
    { mission_id: 3, title: "Mission 3: Your Best Day Ever", prompt: "Share your own favorite memory or family trip." }
  ],
  spark_talk: [
    { id: "spark_1", topic: "Favorite Outdoor Adventure", prompt: "What is your favorite outdoor activity to do with friends?" },
    { id: "spark_2", topic: "Camping Essentials", prompt: "What three things would you pack in your backpack for a camping trip?" }
  ]
};

export default weekRealData;
`;
fs.writeFileSync(path.join(W35_DIR, 'week_35_real.js'), weekRealCode);

console.log('🎉 Week 35 Master Architecture Generation Complete (100% 4-Hub Compliant)!');
