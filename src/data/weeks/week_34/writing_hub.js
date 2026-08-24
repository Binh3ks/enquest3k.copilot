/**
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
    task_en: "1. Draw a 3-panel comic strip about two different animals helping each other in nature.\n2. Write 2 sentences under each drawing using past continuous and past simple (e.g., 'While the lion was sleeping, the mouse ran across his paw').\n3. Record a 1-minute video retelling your story to your family.",
    task_vi: "1. Vẽ một truyện tranh 3 khung hình về hai con vật giúp đỡ lẫn nhau trong tự nhiên.\n2. Viết 2 câu dưới mỗi bức tranh dùng thì quá khứ tiếp diễn và quá khứ đơn.\n3. Quay video 1 phút kể lại câu chuyện của em cho gia đình nghe."
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
