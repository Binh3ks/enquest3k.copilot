/**
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
