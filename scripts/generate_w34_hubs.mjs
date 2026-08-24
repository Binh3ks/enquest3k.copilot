import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const W34_DIR = path.join(__dirname, '../src/data/weeks/week_34');

console.log('🚀 Generating Week 34 Master 4-Hub Data...');

// ─────────────────────────────────────────────────────────────────────────────
// 1. READING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const readingHubCode = `/**
 * Week 34 Gold Standard Data — Reading Hub
 * Theme: "The Lion and the Mouse"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 34,
  theme: "The Lion and the Mouse",
  cefr_level: "A2 Flyers",
  vocab: vocabList,

  // CLIL Knowledge Explorer (Animal Helpers & Symbiosis in Nature)
  clil_article: {
    id: "clil_w34_animal_helpers",
    theme: "Animal Helpers in Nature",
    title_en: "Animal Helpers in Nature",
    title_vi: "Những Người Bạn Giúp Đỡ Lẫn Nhau Trong Tự Nhiên",
    content_en: "In nature, many animals work together to survive and stay healthy. Just like the tiny mouse helped the huge lion in the fable, real animals in the wild also help each other every day! A small bird called the oxpecker sits on the back of a huge zebra. While the zebra is grazing in the grassland, the bird eats small bugs off the zebra's skin. This gives the bird food and keeps the zebra clean. In the ocean, small cleaner fish swim inside the mouths of large sharks. The sharks never bite them because the fish clean their sharp teeth! When animals cooperate, everyone stays safe and healthy in nature.",
    content_vi: "Trong tự nhiên, nhiều loài động vật làm việc cùng nhau để sinh tồn và khỏe mạnh. Giống như chú chuột nhỏ giúp sư tử to lớn trong truyện ngụ ngôn, các loài động vật thực tế cũng giúp đỡ lẫn nhau mỗi ngày! Một loài chim nhỏ tên là chim bắt ve thường đậu trên lưng chú ngựa vằn to lớn. Trong khi ngựa vằn đang gặm cỏ, chú chim ăn những con bọ nhỏ trên da ngựa vằn. Điều này mang lại thức ăn cho chim và giúp ngựa vằn sạch sẽ. Dưới đại dương, những chú cá dọn vệ sinh nhỏ bơi vào trong miệng cá mập lớn. Cá mập không bao giờ cắn vì cá nhỏ làm sạch răng sắc nhọn của chúng! Khi các loài động vật hợp tác, mọi loài đều an toàn và khỏe mạnh.",
    audio_url: "/audio/week34/explore.mp3",
    check_questions: [
      {
        id: 1,
        question_en: "What does the oxpecker bird eat while sitting on the zebra?",
        options: ["Small bugs off the zebra's skin", "Grass seeds on the ground", "Tree leaves in the forest"],
        answer: "Small bugs off the zebra's skin"
      },
      {
        id: 2,
        question_en: "Why do large sharks never bite small cleaner fish?",
        options: ["Because the small fish clean their sharp teeth", "Because the fish are too fast", "Because sharks are sleeping"],
        answer: "Because the small fish clean their sharp teeth"
      },
      {
        id: 3,
        question_en: "What lesson about nature does this article teach us?",
        options: ["Animals cooperate and help each other to survive", "Big animals must always live alone", "Small animals never help large animals"],
        answer: "Animals cooperate and help each other to survive"
      }
    ],
    critical_thinking: {
      question_en: "Why is cooperation between different animals important in the forest?",
      hint_en: "Think about how each animal gives something helpful: one gets food and the other stays clean and healthy."
    }
  },

  interactive_story: {
    mode: "open_cloze",
    title: "Interactive Story: The Lion and the Mouse Fable",
    text_template: "A huge lion was sleeping under a tree when a tiny mouse accidentally ____1____ across his paw. The lion woke up angrily and ____2____ the mouse with his big claws. The mouse cried and made a ____3____ to help him one day. Later, hunters trapped the lion in a heavy rope ____4____. The brave mouse chewed through the thick ropes and ____5____ his friend happily.",
    gaps: [
      { id: 1, target: "ran", hint: "moved quickly across", hint_en: "moved quickly across", hint_vi: "đã chạy qua" },
      { id: 2, target: "caught", hint: "held with claws", hint_en: "held with claws", hint_vi: "đã bắt được" },
      { id: 3, target: "promise", hint: "statement to do something", hint_en: "statement to do something", hint_vi: "lời hứa" },
      { id: 4, target: "net", hint: "hunters' rope trap", hint_en: "hunters' rope trap", hint_vi: "tấm lưới" },
      { id: 5, target: "freed", hint: "released from trap", hint_en: "released from trap", hint_vi: "đã giải thoát" }
    ],
    hints: {
      1: "moved quickly across",
      2: "held with claws",
      3: "statement to do something",
      4: "hunters' rope trap",
      5: "released from trap"
    },
    word_bank: ["ran", "caught", "promise", "net", "freed"]
  },

  story_scenes: read_explore.story_scenes,
  read_explore,

  // Cambridge Reading & Writing Part 6 (Open Cloze Diary)
  rw_part_6: {
    instructions: "Read the story diary and write the missing words. Write one word on each line.",
    title: "Leo's Storybook Diary: Friday",
    text_template: "Dear Diary, today I read a wonderful fable. A huge lion was sleeping [1]_____ a shady tree in the forest. Suddenly, a tiny mouse ran across his [2]_____. The lion caught the mouse, but he let him go [3]_____ he was kind. A few days later, hunters caught the lion in a heavy [4]_____. The mouse chewed the ropes and [5]_____ the lion safely. They became best friends!",
    answers: {
      "1": "under",
      "2": "paw",
      "3": "because",
      "4": "net",
      "5": "freed"
    }
  },

  rw_part_6_check_mode: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Oliver's Fable Notes: Saturday (Check Mode)",
    text_template: "Today I wrote about the lion and the mouse. While the lion was [1]_____ under a tree, a tiny mouse ran [2]_____ his paw. The lion woke [3]_____ angrily. Later, hunters trapped the lion [4]_____ a net. The mouse helped him [5]_____ chewing the ropes.",
    answers: {
      "1": "sleeping",
      "2": "across",
      "3": "up",
      "4": "in",
      "5": "by"
    }
  },

  check_mode_drills: [
    { id: 1, prompt: "The huge lion was sleeping ___ a green tree in the forest.", options: ["under", "between", "above"], answer: "under" },
    { id: 2, prompt: "A tiny mouse ran across the lion's front ___ by accident.", options: ["paw", "tail", "ear"], answer: "paw" },
    { id: 3, prompt: "The lion woke up angrily and ___ the mouse with sharp claws.", options: ["caught", "is catching", "catches"], answer: "caught" },
    { id: 4, prompt: "The scared mouse promised to ___ the mighty lion one day.", options: ["help", "eating", "fight"], answer: "help" },
    { id: 5, prompt: "Two hunters placed a strong rope ___ to catch the wild animal.", options: ["net", "blanket", "towel"], answer: "net" },
    { id: 6, prompt: "While the lion was walking, he stepped into a hidden ___.", options: ["trap", "cloud", "star"], answer: "trap" },
    { id: 7, prompt: "The lion roared loudly because the ropes were very ___.", options: ["tight", "soft", "sweet"], answer: "tight" },
    { id: 8, prompt: "The brave mouse chewed the thick ropes with his ___ teeth.", options: ["sharp", "round", "warm"], answer: "sharp" },
    { id: 9, prompt: "The lion was ___ safely and thanked his little friend.", options: ["freed", "trapped", "lost"], answer: "freed" },
    { id: 10, prompt: "Even the smallest friend can be a ___ help in times of need.", options: ["great", "scared", "dark"], answer: "great" }
  ]
};

export default readingHubData;
`;
fs.writeFileSync(path.join(W34_DIR, 'reading_hub.js'), readingHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 2. LISTENING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const listeningHubCode = `/**
 * Week 34 Gold Standard Data — Listening Hub
 * Theme: "The Lion and the Mouse"
 * Cambridge A2 Flyers Full Exam Standard Audio & Scripts
 */

import dictation from './dictation.js';
import shadowing from './shadowing.js';
import singaporeMath from './singapore_math.js';
import logicScience from './logic_science.js';

export const listeningHubData = {
  week: 34,
  theme: "The Lion and the Mouse",
  dictation,
  shadowing,
  singapore_math: singaporeMath,
  science_lab: logicScience,

  // Cambridge Listening Part 2 (Secret Notes / Notepad Note Completer)
  listening_p2_notes: [
    { id: 1, label: "Lion Location", hint: "Where was he sleeping?", target: "under a tree", audio_text: "The huge lion was sleeping peacefully under a shady tree in the forest." },
    { id: 2, label: "Animal Running", hint: "Who ran across his paw?", target: "tiny mouse", audio_text: "A tiny mouse accidentally ran across his big front paw." },
    { id: 3, label: "Hunters' Equipment", hint: "What did hunters place?", target: "rope net", audio_text: "Two hunters placed a strong rope net between two trees." },
    { id: 4, label: "Cutting Method", hint: "How did mouse cut ropes?", target: "sharp teeth", audio_text: "The mouse chewed through the thick ropes with his sharp teeth." },
    { id: 5, label: "Fable Moral", hint: "What was the lesson?", target: "small friends help", audio_text: "The fable teaches us that small friends can give great help." }
  ],

  // Cambridge Listening Part 1 (SVG Line Matcher — Forest Scene)
  listening_p1: {
    image_url: '/images/week34/w34_listening_p1_scene.jpg',
    audio_url: '/audio/week34/listening_p1_full.mp3',
    passage_audio_script: "Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.\nGirl: Look at this wonderful picture of the animals in the sunny forest!\nMan: Oh yes, I can see a big animal sleeping under the green tree. Is that the lion?\nGirl: Yes, that is the lion. He is having a peaceful afternoon sleep.\nMan: He looks very calm.\nNova: Can you see the line? This is an example. Now you listen and draw lines.\nGirl: Can you see the tiny mouse running near the lion's front paw?\nMan: Ah yes! He has a long tail and soft grey fur. What is he doing?\nGirl: He is looking for berries on the forest grass.\nMan: Look up in the tall tree! There is a brown monkey eating a yellow banana.\nGirl: That's right. The monkey is sitting on the top branch watching everyone.\nMan: Who is that man hiding behind the bushes with a rope in his hand?\nGirl: That is one of the hunters. He is setting a trap between the trees.\nMan: Look near the riverbank. There is a little rabbit drinking clear water.\nGirl: Yes, the rabbit has long white ears and is hopping gently.\nMan: Now look at the small colourful bird flying above the sleeping lion.\nGirl: That is a songbird. She is singing a sweet melody in the forest sky.",
    names: [
      { id: 'n1', text: 'Lion', target_id: 't1', isExample: true },
      { id: 'n2', text: 'Mouse', target_id: 't2' },
      { id: 'n3', text: 'Monkey', target_id: 't3' },
      { id: 'n4', text: 'Hunter', target_id: 't4' },
      { id: 'n5', text: 'Rabbit', target_id: 't5' },
      { id: 'n6', text: 'Songbird', target_id: 't6' }
    ],
    targets: [
      { id: 't1', label: 'Lion (Sleeping under the shady tree)', x: 45, y: 55, isExample: true },
      { id: 't2', label: 'Mouse (Tiny grey mouse running on grass)', x: 30, y: 70 },
      { id: 't3', label: 'Monkey (Brown monkey on top tree branch)', x: 65, y: 25 },
      { id: 't4', label: 'Hunter (Man hiding behind green bushes)', x: 80, y: 50 },
      { id: 't5', label: 'Rabbit (White rabbit drinking at riverbank)', x: 18, y: 75 },
      { id: 't6', label: 'Songbird (Colourful bird flying in sky)', x: 50, y: 18 }
    ]
  },

  // Cambridge Listening Part 3 (Visual Matching A-H — Forest Locations)
  listening_p3: {
    passage_audio_script: "Teacher: Hello Emma! Where did all the forest animals hide during the thunderstorm yesterday?\nEmma: I watched them carefully, Mr. Davis! I can tell you where they all went.\nTeacher: First, where did the tiny mouse hide? Was he under the wooden bridge?\nEmma: No! The little mouse hid inside the hollow tree trunk near the river.\nTeacher: Good. And what about the brown monkey? Did he stay in the tall tree?\nEmma: No, it was too windy! The monkey ran into the deep cave on the rocky hill.\nTeacher: Right. And where did the hunter leave his heavy rope net?\nEmma: The hunter left his rope net beside the old wooden barn.\nTeacher: Ah, I see. What about the little rabbit? Where did he run?\nEmma: The white rabbit hopped quickly into the thick berry bushes.\nTeacher: And what about the colourful songbird? Did she fly home to her nest?\nEmma: Yes, the songbird stayed warm inside her cozy nest on the high branch!",
    items: [
      { id: 1, name: 'Tiny Mouse', target_letter: 'A', audio_url: '/audio/week34/listening_p3_item1.mp3', audio_text: "Teacher: Where did the tiny mouse hide?\nEmma: The little mouse hid inside the hollow tree trunk near the river." },
      { id: 2, name: 'Brown Monkey', target_letter: 'B', audio_url: '/audio/week34/listening_p3_item2.mp3', audio_text: "Teacher: What about the brown monkey?\nEmma: The monkey ran into the deep cave on the rocky hill." },
      { id: 3, name: 'Heavy Rope Net', target_letter: 'C', audio_url: '/audio/week34/listening_p3_item3.mp3', audio_text: "Teacher: Where did the hunter leave his heavy rope net?\nEmma: The hunter left his rope net beside the old wooden barn." },
      { id: 4, name: 'White Rabbit', target_letter: 'D', audio_url: '/audio/week34/listening_p3_item4.mp3', audio_text: "Teacher: Where did the little rabbit run?\nEmma: The white rabbit hopped quickly into the thick berry bushes." },
      { id: 5, name: 'Songbird', target_letter: 'E', audio_url: '/audio/week34/listening_p3_item5.mp3', audio_text: "Teacher: And what about the colourful songbird?\nEmma: The songbird stayed warm inside her cozy nest on the high branch!" }
    ],
    cards: [
      { letter: 'A', name: 'Hollow Tree Trunk', location_name: 'Tree Trunk', image_url: '/images/week34/hollow_tree.jpg' },
      { letter: 'B', name: 'Deep Rocky Cave', location_name: 'Rocky Cave', image_url: '/images/week34/rocky_cave.jpg' },
      { letter: 'C', name: 'Old Wooden Barn', location_name: 'Wooden Barn', image_url: '/images/week34/wooden_barn.jpg' },
      { letter: 'D', name: 'Thick Berry Bushes', location_name: 'Berry Bushes', image_url: '/images/week34/berry_bushes.jpg' },
      { letter: 'E', name: 'Cozy Tree Nest', location_name: 'Tree Nest', image_url: '/images/week34/tree_nest.jpg' },
      { letter: 'F', name: 'Under Wooden Bridge', location_name: 'Wooden Bridge', image_url: '/images/week34/wooden_bridge.jpg' },
      { letter: 'G', name: 'Grassy Riverbank', location_name: 'Riverbank', image_url: '/images/week34/riverbank.jpg' },
      { letter: 'H', name: 'Forest Clearing', location_name: 'Forest Clearing', image_url: '/images/week34/forest_clearing.jpg' }
    ]
  },

  // Cambridge Listening Part 4 (3-Picture Options with Distractors)
  listening_p4_questions: [
    {
      id: 1,
      question: "What was the lion doing when the mouse arrived?",
      audio_text: "Boy: Did the lion roar when the mouse arrived?\nGirl: No, he was sleeping quietly under the shady oak tree.",
      correct_option: "A",
      options: [
        { id: "A", label: "Sleeping under tree", image_url: "/images/week34/p4_q1_a.jpg" },
        { id: "B", label: "Drinking at river", image_url: "/images/week34/p4_q1_b.jpg" },
        { id: "C", label: "Chasing a deer", image_url: "/images/week34/p4_q1_c.jpg" }
      ]
    },
    {
      id: 2,
      question: "What did the hunters use to trap the lion?",
      audio_text: "Boy: Did the hunters dig a deep hole in the forest?\nGirl: No, they tied a heavy rope net between two large trees.",
      correct_option: "B",
      options: [
        { id: "A", label: "Wooden cage", image_url: "/images/week34/p4_q2_a.jpg" },
        { id: "B", label: "Heavy rope net", image_url: "/images/week34/p4_q2_b.jpg" },
        { id: "C", label: "Deep ground hole", image_url: "/images/week34/p4_q2_c.jpg" }
      ]
    },
    {
      id: 3,
      question: "How did the mouse cut the strong ropes?",
      audio_text: "Boy: Did the mouse use sharp stones to cut the net?\nGirl: No, he chewed through the thick ropes using his sharp front teeth.",
      correct_option: "C",
      options: [
        { id: "A", label: "Using wooden stick", image_url: "/images/week34/p4_q3_a.jpg" },
        { id: "B", label: "Using sharp stone", image_url: "/images/week34/p4_q3_b.jpg" },
        { id: "C", label: "Using sharp teeth", image_url: "/images/week34/p4_q3_c.jpg" }
      ]
    },
    {
      id: 4,
      question: "What food did the oxpecker bird eat on the zebra?",
      audio_text: "Boy: Was the bird eating sweet fruit on the tree?\nGirl: No, the bird was eating small bugs off the zebra's back.",
      correct_option: "A",
      options: [
        { id: "A", label: "Small bugs on zebra", image_url: "/images/week34/p4_q4_a.jpg" },
        { id: "B", label: "Sweet red berries", image_url: "/images/week34/p4_q4_b.jpg" },
        { id: "C", label: "Green grass seeds", image_url: "/images/week34/p4_q4_c.jpg" }
      ]
    },
    {
      id: 5,
      question: "Where did the lion and mouse go after they became friends?",
      audio_text: "Boy: Did they run to the hunter's village?\nGirl: No, they walked together happily to the sunny forest clearing.",
      correct_option: "B",
      options: [
        { id: "A", label: "Hunter village", image_url: "/images/week34/p4_q5_a.jpg" },
        { id: "B", label: "Forest clearing", image_url: "/images/week34/p4_q5_b.jpg" },
        { id: "C", label: "Dark mountain cave", image_url: "/images/week34/p4_q5_c.jpg" }
      ]
    }
  ],

  // Cambridge Listening Part 5 (Color & Write)
  listening_p5: {
    image_url: "/images/week34/w34_listening_p5_scene.jpg",
    instructions: [
      { id: 1, item: "Lion Paw", color: "yellow", target_desc: "Color the sleeping lion's front paw yellow", audio_text: "Look at the lion's front paw. Color it yellow." },
      { id: 2, item: "Tiny Mouse", color: "grey", target_desc: "Color the tiny running mouse grey", audio_text: "Can you see the tiny mouse? Color his soft coat grey." },
      { id: 3, item: "Rope Net", color: "brown", target_desc: "Color the hunters' rope net brown", audio_text: "Now find the rope net in the tree. Color the ropes brown." },
      { id: 4, item: "Signboard", write_word: "FRIENDS", target_desc: "Write the word FRIENDS on the wooden forest sign", audio_text: "Look at the wooden sign by the path. Write the word FRIENDS on it." },
      { id: 5, item: "Songbird", color: "blue", target_desc: "Color the little songbird in the sky blue", audio_text: "Look at the little songbird flying above the trees. Color her blue." }
    ]
  }
};

export default listeningHubData;
`;
fs.writeFileSync(path.join(W34_DIR, 'listening_hub.js'), listeningHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 3. WRITING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const writingHubCode = `/**
 * Week 34 Gold Standard Data — Writing Hub
 * Theme: "The Lion and the Mouse"
 */

import writing from './writing.js';

export const writingHubData = {
  week: 34,
  theme: "The Lion and the Mouse",
  picture_story: writing.picture_story,
  word_bank_pills: writing.word_bank_pills,
  model_sentence: writing.model_sentence,
  sentence_frames: writing.sentence_frames,
  min_words: writing.min_words || 20,
  pbl_mission: {
    title_en: "Offline Animal Helpers Comic Book Project",
    title_vi: "Dự Án Vẽ Truyện Tranh Những Người Bạn Động Vật",
    task_en: "1. Draw a 3-panel comic strip about two different animals helping each other in nature.\\n2. Write 2 sentences under each drawing using past continuous and past simple (e.g., 'While the lion was sleeping, the mouse ran across his paw').\\n3. Record a 1-minute video retelling your story to your family.",
    task_vi: "1. Vẽ một truyện tranh 3 khung hình về hai con vật giúp đỡ lẫn nhau trong tự nhiên.\\n2. Viết 2 câu dưới mỗi bức tranh dùng thì quá khứ tiếp diễn và quá khứ đơn.\\n3. Quay video 1 phút kể lại câu chuyện của em cho gia đình nghe."
  },

  // Cambridge Reading & Writing Part 1 (10 Definitions, 15 Word Bank)
  rw_part_1: {
    instructions: "Look and read. Choose the correct words and write them on the lines.",
    words: [
      { id: 'w1', word: 'a lion', image_url: '/images/week34/vocab_lion.jpg' },
      { id: 'w2', word: 'a mouse', image_url: '/images/week34/vocab_mouse.jpg' },
      { id: 'w3', word: 'a net', image_url: '/images/week34/vocab_net.jpg' },
      { id: 'w4', word: 'a hunter', image_url: '/images/week34/vocab_hunter.jpg' },
      { id: 'w5', word: 'a forest', image_url: '/images/week34/vocab_forest.jpg' },
      { id: 'w6', word: 'sharp teeth', image_url: '/images/week34/vocab_sharp.jpg' },
      { id: 'w7', word: 'a trap', image_url: '/images/week34/vocab_trap.jpg' },
      { id: 'w8', word: 'a rope', image_url: '/images/week34/vocab_rope.jpg' },
      { id: 'w9', word: 'a zebra', image_url: '/images/week34/zebra.jpg' },
      { id: 'w10', word: 'a fable', image_url: '/images/week34/vocab_fable.jpg' },
      { id: 'w11', word: 'a monkey', image_url: '/images/week34/monkey.jpg' },
      { id: 'w12', word: 'a cave', image_url: '/images/week34/cave.jpg' },
      { id: 'w13', word: 'a river', image_url: '/images/week34/river.jpg' },
      { id: 'w14', word: 'a songbird', image_url: '/images/week34/songbird.jpg' },
      { id: 'w15', word: 'a paw', image_url: '/images/week34/vocab_paw.jpg' }
    ],
    definitions: [
      { id: 1, text: "This is a large wild cat known as the king of the forest.", answer: "a lion" },
      { id: 2, text: "This is a very small animal with a long tail and soft fur.", answer: "a mouse" },
      { id: 3, text: "Hunters tie this material between trees to catch animals.", answer: "a net" },
      { id: 4, text: "This person chases and catches wild animals in the forest.", answer: "a hunter" },
      { id: 5, text: "This is a large area of land covered with many green trees.", answer: "a forest" },
      { id: 6, text: "Animals use these pointed parts in their mouths to cut food and ropes.", answer: "sharp teeth" },
      { id: 7, text: "This is strong, thick cord made of twisted threads.", answer: "a rope" },
      { id: 8, text: "This animal has black and white stripes and lives on grasslands.", answer: "a zebra" },
      { id: 9, text: "This is a traditional short story that teaches a moral lesson.", answer: "a fable" },
      { id: 10, text: "This is the foot of an animal that has claws and pads.", answer: "a paw" }
    ]
  },

  // Cambridge Reading & Writing Part 2 (Dialogue 5 Turns)
  rw_part_2: {
    instructions: "Read the conversation between Emma and Harry about the fable. Choose the best answer (A-H).",
    speakerA: "Emma",
    speakerB: "Harry",
    turns: [
      { id: 1, prompt: "Hello Harry! What story did you read in English class today?", answer_key: "D" },
      { id: 2, prompt: "Why was the lion angry when he woke up?", answer_key: "F" },
      { id: 3, prompt: "Did the lion believe the mouse when he promised to help?", answer_key: "A" },
      { id: 4, prompt: "What happened when the hunters came to the forest?", answer_key: "C" },
      { id: 5, prompt: "How did the mouse rescue the lion from the trap?", answer_key: "E" }
    ],
    options: [
      { key: "A", text: "No, he laughed out loud because the mouse was so tiny." },
      { key: "B", text: "I went to the library with my brother." },
      { key: "C", text: "They trapped the lion in a heavy rope net." },
      { key: "D", text: "I read the famous fable about the lion and the mouse!" },
      { key: "E", text: "He chewed through the ropes with his sharp teeth." },
      { key: "F", text: "Because a tiny mouse ran across his front paw." },
      { key: "G", text: "Yes, they ate lunch together." },
      { key: "H", text: "The lion ran away to the mountains." }
    ]
  },

  // Cambridge Reading & Writing Part 4 (Story Cloze 10 Gaps)
  rw_part_4: {
    instructions: "Read the story. Choose the best word from the box for each gap (1-10).",
    title: "The King of the Forest and His Little Helper",
    text_template: "One sunny afternoon, a huge lion was [1]_____ under a shady tree in the green forest. While he was resting, a tiny mouse [2]_____ across his front paw. The lion woke up and [3]_____ the little mouse in his sharp claws. The mouse was very [4]_____, but he promised to help the lion one day. The lion started to [5]_____ because he thought a small mouse could never help him. A few days later, two [6]_____ came to the forest. They placed a strong [7]_____ between two trees. The lion stepped into the trap and [8]_____ loudly for help. The mouse heard the sound and ran quickly to the tree. He [9]_____ the thick ropes until the lion was free. They became best [10]_____ forever!",
    word_bank: [
      { id: 1, word: "sleeping" },
      { id: 2, word: "ran" },
      { id: 3, word: "caught" },
      { id: 4, word: "scared" },
      { id: 5, word: "laugh" },
      { id: 6, word: "hunters" },
      { id: 7, word: "net" },
      { id: 8, word: "roared" },
      { id: 9, word: "chewed" },
      { id: 10, word: "friends" },
      { id: 11, word: "flying" },
      { id: 12, word: "cold" }
    ],
    answers: {
      "1": "sleeping",
      "2": "ran",
      "3": "caught",
      "4": "scared",
      "5": "laugh",
      "6": "hunters",
      "7": "net",
      "8": "roared",
      "9": "chewed",
      "10": "friends"
    }
  },

  // Cambridge Reading & Writing Part 5 (Story Comprehension 7 Completions)
  rw_part_5: {
    title: "A Hero in the Forest",
    story_text: "Last weekend, Oliver and his sister Lily visited the animal wildlife park. At the educational storytelling corner, a park guide was reading Aesop's famous fable to all the children. The guide explained that a huge lion lived in a peaceful forest with many tall trees. While the lion was sleeping, a tiny mouse accidentally ran across his paw. Instead of eating the mouse, the lion showed great kindness and let him go free. Later that week, hunters caught the lion in a heavy net. The mouse did not run away in fear; he rushed over and used his sharp teeth to cut the ropes. Oliver and Lily loved the story because it showed that even the smallest creature can do great things.",
    questions: [
      { id: 1, prompt: "Oliver and Lily visited the animal wildlife park last ___.", answer: "weekend" },
      { id: 2, prompt: "A park guide was reading Aesop's fable to all the ___.", answer: "children" },
      { id: 3, prompt: "The huge lion lived in a peaceful forest with many ___.", answer: "tall trees" },
      { id: 4, prompt: "A tiny mouse ran across the lion's paw while he was ___.", answer: "sleeping" },
      { id: 5, prompt: "The lion showed great ___ and let the mouse go free.", answer: "kindness" },
      { id: 6, prompt: "Hunters caught the lion in a heavy ___.", answer: "net" },
      { id: 7, prompt: "The brave mouse used his ___ to cut the ropes.", answer: "sharp teeth" }
    ]
  },

  writing
};

export default writingHubData;
`;
fs.writeFileSync(path.join(W34_DIR, 'writing_hub.js'), writingHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 4. SPEAKING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const speakingHubCode = `/**
 * Week 34 Gold Standard Data — Speaking Hub
 * Theme: "The Lion and the Mouse"
 */

import mindmap from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import shadowing from './shadowing.js';

export const speakingHubData = {
  week: 34,
  theme: "The Lion and the Mouse",
  mindmap,
  ask_ai,
  talkshow_turns: [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! Today we are exploring animal fables. What was the huge lion doing under the tree?" },
    { turn_number: 2, nova_question: "Oh my! What happened when the tiny mouse accidentally ran across his big front paw?" },
    { turn_number: 3, nova_question: "How did the lion react when the little mouse made a brave promise to help him?" },
    { turn_number: 4, nova_question: "What dangerous trouble did the lion face when the forest hunters arrived?" },
    { turn_number: 5, nova_question: "How did the mouse chew the thick ropes and what moral lesson did we learn?" }
  ],
  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,

  // Shadowing & Podcast Data
  shadowing_sentences: shadowing.sentences,
  podcast_shadowing: {
    long_paragraph: {
      text: "One warm afternoon, a huge lion was sleeping peacefully under a shady tree in the forest. While he was sleeping, a tiny mouse accidentally ran across his front paw. The lion caught the mouse but let him go free. A few days later, hunters trapped the lion in a heavy rope net. The brave mouse chewed through the thick ropes with his sharp teeth and freed the lion safely.",
      audio_url: '/audio/week34/shadowing_full_paragraph.mp3'
    }
  },

  // Cambridge Speaking Part 1 (Find Differences - 6 Hotspots)
  find_differences: {
    picA: { title: 'Picture A (Original Scene)', image_url: '/images/week34/w34_diff_scene_a.jpg' },
    picB: { title: 'Picture B (Difference Scene)', image_url: '/images/week34/w34_diff_scene_b.jpg' },
    hotspots: [
      { id: 'diff1', name: 'Tree Leaf Color', x: 25, y: 30, prompt_en: 'In Picture A, the tree leaves are green, but in Picture B, they are yellow.' },
      { id: 'diff2', name: 'Sleeping Lion Paw', x: 45, y: 55, prompt_en: 'In Picture A, the lion paw is on grass, but in Picture B, it is on a flat rock.' },
      { id: 'diff3', name: 'Running Mouse Color', x: 30, y: 70, prompt_en: 'In Picture A, the mouse is grey, but in Picture B, the mouse is brown.' },
      { id: 'diff4', name: 'Flying Songbird', x: 60, y: 20, prompt_en: 'In Picture A, there is one flying bird, but in Picture B, there are two birds.' },
      { id: 'diff5', name: 'Monkey Fruit', x: 75, y: 35, prompt_en: 'In Picture A, the monkey is holding a banana, but in Picture B, he is holding an apple.' },
      { id: 'diff6', name: 'River Water Flower', x: 15, y: 80, prompt_en: 'In Picture A, there is a pink water lily, but in Picture B, there is no flower.' }
    ]
  },

  // Cambridge Speaking Part 3 (5 Sequential Pictures Invariant)
  picture_story_continuation: {
    title: "The Lion and the Mouse Fable",
    intro_audio_text: "Look at the five pictures. They tell a story called 'The Lion and the Mouse'. Just look at Picture 1 first. A huge lion was sleeping peacefully under a shady tree in the green forest.",
    pictures: [
      { id: 1, title: "Picture 1: Sleeping under the tree", image: "/images/week34/webtoon_scene_1.png", is_intro: true, script: "A huge lion was sleeping peacefully under a shady tree in the green forest." },
      { id: 2, title: "Picture 2: Caught by the lion's paw", image: "/images/week34/webtoon_scene_2.png", prompt_en: "Now you tell the story! What happened next in Picture 2?", key_chunks: ["woke up angrily", "caught the tiny mouse"] },
      { id: 3, title: "Picture 3: The mouse's promise", image: "/images/week34/webtoon_scene_3.png", prompt_en: "What did the scared mouse say in Picture 3?", key_chunks: ["made a brave promise", "let him go free"] },
      { id: 4, title: "Picture 4: Trapped in the rope net", image: "/images/week34/webtoon_scene_4.png", prompt_en: "What trouble happened to the lion in Picture 4?", key_chunks: ["trapped in heavy net", "roared loudly for help"] },
      { id: 5, title: "Picture 5: Chewing ropes & best friends", image: "/images/week34/webtoon_scene_5.png", prompt_en: "How does the story end in Picture 5?", key_chunks: ["chewed through ropes", "freed the lion safely", "became best friends"] }
    ]
  },

  // Cambridge AI Debate Arena
  debate_topics: [
    {
      id: "debate_w34_01",
      topic_title: "Can Small Friends Help Big Friends?",
      nova_statement: "I think big, strong animals never need help from tiny animals because they have strong muscles and loud roars!",
      expected_counter_points: [
        "Small animals have special abilities like sharp teeth to cut ropes",
        "Tiny friends can reach small places where big animals cannot fit",
        "Cooperation and kindness make everyone stronger together"
      ],
      suggested_discourse_markers: [
        "I disagree with Nova because...",
        "In my opinion, even small friends can...",
        "For example, in the fable, the mouse..."
      ],
      sample_rebuttal: "I disagree with Nova because even small friends have special talents. In the fable, the tiny mouse chewed through the heavy rope net with his sharp teeth and saved the mighty lion."
    }
  ]
};

export default speakingHubData;
`;
fs.writeFileSync(path.join(W34_DIR, 'speaking_hub.js'), speakingHubCode);

// ─────────────────────────────────────────────────────────────────────────────
// 5. INDEX.JS
// ─────────────────────────────────────────────────────────────────────────────
const indexCode = `// Index wrapper for Week 34
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
  weekId: 34,
  title: "The Lion and the Mouse",
  weekTitle_en: "The Lion and the Mouse",
  title_vi: "Sư Tử và Chuột — Truyện Ngụ Ngôn",

  // Top-level for InfoExchangeZone direct hydration
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
fs.writeFileSync(path.join(W34_DIR, 'index.js'), indexCode);

// ─────────────────────────────────────────────────────────────────────────────
// 6. WEEK_34_REAL.JS
// ─────────────────────────────────────────────────────────────────────────────
const weekRealCode = `// Week 34 Real Data — AI Tutor format
import vocab from './vocab.js';

export const weekRealData = {
  weekId: 34,
  theme: "The Lion and the Mouse",
  target_vocab: vocab,
  story_missions: [
    {
      mission_id: 1,
      title: "Mission 1: The Sleeping Lion",
      prompt: "Tell Nova what the lion was doing when the mouse arrived."
    },
    {
      mission_id: 2,
      title: "Mission 2: Trapped in the Net",
      prompt: "Explain how the hunters trapped the lion and how the mouse helped."
    },
    {
      mission_id: 3,
      title: "Mission 3: Helping Your Friends",
      prompt: "Share a time when you helped a friend or family member."
    }
  ],
  spark_talk: [
    {
      id: "spark_1",
      topic: "Small Animals with Big Superpowers",
      prompt: "Which small animal do you think is the smartest and why?"
    },
    {
      id: "spark_2",
      topic: "Keeping Promises",
      prompt: "Why is it important to always keep promises to your friends?"
    }
  ]
};

export default weekRealData;
`;
fs.writeFileSync(path.join(W34_DIR, 'week_34_real.js'), weekRealCode);

console.log('🎉 Week 34 Master Architecture Generation Complete (100% 4-Hub Compliant)!');
