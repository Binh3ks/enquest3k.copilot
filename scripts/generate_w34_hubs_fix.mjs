import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const W34_DIR = path.join(__dirname, '../src/data/weeks/week_34');

// EXPLORE.JS
const exploreCode = `// Week 34 Explore / CLIL — Animal Helpers in Nature
export const exploreData = {
  theme: "Animal Helpers in Nature",
  title_en: "Animal Helpers in Nature",
  title_vi: "Những Người Bạn Giúp Đỡ Lẫn Nhau Trong Tự Nhiên",
  content_en: "In nature, many animals work together to stay healthy. In the fable, a tiny mouse helped a huge lion. Real animals in the wild also help each other every day! A small bird called the oxpecker sits on a zebra. While the zebra is grazing, the bird eats bugs off its skin. This gives the bird food and keeps the zebra clean. In the ocean, small cleaner fish swim inside shark mouths. Sharks never bite them because the fish clean their sharp teeth! When animals cooperate, everyone stays safe in nature.",
  content_vi: "Trong tự nhiên, nhiều loài động vật làm việc cùng nhau để khỏe mạnh. Trong truyện ngụ ngôn, chú chuột nhỏ giúp sư tử to lớn. Các loài động vật thực tế cũng giúp nhau mỗi ngày! Một loài chim nhỏ tên là chim bắt ve đậu trên lưng ngựa vằn. Trong khi ngựa vằn gặm cỏ, chim ăn bọ trên da nó. Việc này mang lại thức ăn cho chim và giúp ngựa vằn sạch sẽ. Dưới đại dương, cá dọn vệ sinh nhỏ bơi vào miệng cá mập. Cá mập không cắn vì cá làm sạch răng sắc nhọn của chúng! Khi động vật hợp tác, mọi loài đều an toàn.",
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
};

export default exploreData;
`;
fs.writeFileSync(path.join(W34_DIR, 'explore.js'), exploreCode);

// READING_HUB.JS
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
    content_en: "In nature, many animals work together to stay healthy. In the fable, a tiny mouse helped a huge lion. Real animals in the wild also help each other every day! A small bird called the oxpecker sits on a zebra. While the zebra is grazing, the bird eats bugs off its skin. This gives the bird food and keeps the zebra clean. In the ocean, small cleaner fish swim inside shark mouths. Sharks never bite them because the fish clean their sharp teeth! When animals cooperate, everyone stays safe in nature.",
    content_vi: "Trong tự nhiên, nhiều loài động vật làm việc cùng nhau để khỏe mạnh. Trong truyện ngụ ngôn, chú chuột nhỏ giúp sư tử to lớn. Các loài động vật thực tế cũng giúp nhau mỗi ngày! Một loài chim nhỏ tên là chim bắt ve đậu trên lưng ngựa vằn. Trong khi ngựa vằn gặm cỏ, chim ăn bọ trên da nó. Việc này mang lại thức ăn cho chim và giúp ngựa vằn sạch sẽ. Dưới đại dương, cá dọn vệ sinh nhỏ bơi vào miệng cá mập. Cá mập không cắn vì cá làm sạch răng sắc nhọn của chúng! Khi động vật hợp tác, mọi loài đều an toàn.",
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

// LISTENING_HUB.JS (Fixing passage_audio_script with template literals)
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
    passage_audio_script: \`Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Girl: Look at this wonderful picture of the animals in the sunny forest!
Man: Oh yes, I can see a big animal sleeping under the green tree. Is that the lion?
Girl: Yes, that is the lion. He is having a peaceful afternoon sleep.
Man: He looks very calm.
Nova: Can you see the line? This is an example. Now you listen and draw lines.
Girl: Can you see the tiny mouse running near the lion's front paw?
Man: Ah yes! He has a long tail and soft grey fur. What is he doing?
Girl: He is looking for berries on the forest grass.
Man: Look up in the tall tree! There is a brown monkey eating a yellow banana.
Girl: That's right. The monkey is sitting on the top branch watching everyone.
Man: Who is that man hiding behind the bushes with a rope in his hand?
Girl: That is one of the hunters. He is setting a trap between the trees.
Man: Look near the riverbank. There is a little rabbit drinking clear water.
Girl: Yes, the rabbit has long white ears and is hopping gently.
Man: Now look at the small colourful bird flying above the sleeping lion.
Girl: That is a songbird. She is singing a sweet melody in the forest sky.\`,
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
    passage_audio_script: \`Teacher: Hello Emma! Where did all the forest animals hide during the thunderstorm yesterday?
Emma: I watched them carefully, Mr. Davis! I can tell you where they all went.
Teacher: First, where did the tiny mouse hide? Was he under the wooden bridge?
Emma: No! The little mouse hid inside the hollow tree trunk near the river.
Teacher: Good. And what about the brown monkey? Did he stay in the tall tree?
Emma: No, it was too windy! The monkey ran into the deep cave on the rocky hill.
Teacher: Right. And where did the hunter leave his heavy rope net?
Emma: The hunter left his rope net beside the old wooden barn.
Teacher: Ah, I see. What about the little rabbit? Where did he run?
Emma: The white rabbit hopped quickly into the thick berry bushes.
Teacher: And what about the colourful songbird? Did she fly home to her nest?
Emma: Yes, the songbird stayed warm inside her cozy nest on the high branch!\`,
    items: [
      { id: 1, name: 'Tiny Mouse', target_letter: 'A', audio_url: '/audio/week34/listening_p3_item1.mp3', audio_text: "Teacher: Where did the tiny mouse hide?\\nEmma: The little mouse hid inside the hollow tree trunk near the river." },
      { id: 2, name: 'Brown Monkey', target_letter: 'B', audio_url: '/audio/week34/listening_p3_item2.mp3', audio_text: "Teacher: What about the brown monkey?\\nEmma: The monkey ran into the deep cave on the rocky hill." },
      { id: 3, name: 'Heavy Rope Net', target_letter: 'C', audio_url: '/audio/week34/listening_p3_item3.mp3', audio_text: "Teacher: Where did the hunter leave his heavy rope net?\\nEmma: The hunter left his rope net beside the old wooden barn." },
      { id: 4, name: 'White Rabbit', target_letter: 'D', audio_url: '/audio/week34/listening_p3_item4.mp3', audio_text: "Teacher: Where did the little rabbit run?\\nEmma: The white rabbit hopped quickly into the thick berry bushes." },
      { id: 5, name: 'Songbird', target_letter: 'E', audio_url: '/audio/week34/listening_p3_item5.mp3', audio_text: "Teacher: And what about the colourful songbird?\\nEmma: The songbird stayed warm inside her cozy nest on the high branch!" }
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
      audio_text: "Boy: Did the lion roar when the mouse arrived?\\nGirl: No, he was sleeping quietly under the shady oak tree.",
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
      audio_text: "Boy: Did the hunters dig a deep hole in the forest?\\nGirl: No, they tied a heavy rope net between two large trees.",
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
      audio_text: "Boy: Did the mouse use sharp stones to cut the net?\\nGirl: No, he chewed through the thick ropes using his sharp front teeth.",
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
      audio_text: "Boy: Was the bird eating sweet fruit on the tree?\\nGirl: No, the bird was eating small bugs off the zebra's back.",
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
      audio_text: "Boy: Did they run to the hunter's village?\\nGirl: No, they walked together happily to the sunny forest clearing.",
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

console.log('✅ Updated explore.js, reading_hub.js and listening_hub.js');
