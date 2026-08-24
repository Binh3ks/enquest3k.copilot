/**
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
    task_en: "1. Draw a 3-panel storyboard about your most memorable day with family or friends.\n2. Write 2 sentences under each drawing using past continuous and past simple (e.g., 'While we were walking, we saw...').\n3. Record a 1-minute audio retelling your memorable day.",
    task_vi: "1. Vẽ một truyện 3 khung hình về ngày đáng nhớ nhất của em cùng gia đình hoặc bạn bè.\n2. Viết 2 câu dưới mỗi bức tranh dùng thì quá khứ tiếp diễn và quá khứ đơn.\n3. Thu âm 1 phút kể lại kỷ niệm đáng nhớ của em."
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
