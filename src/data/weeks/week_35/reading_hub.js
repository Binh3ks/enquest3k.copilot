/**
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
    content_en: "Camping in nature is an exciting outdoor adventure for the whole family. When setting up your camp, always choose a flat and dry area away from tall dry bushes. Keep your campfire inside a circle of smooth stones to prevent flying sparks from spreading to trees. While cooking delicious food over the fire, always stay at a safe distance and never leave the flames alone. At night, look up at the clear starry sky to discover famous constellations. Stars create wonderful shapes that help night explorers find north easily. When you are ready to leave, always pour clean water over the campfire until the wood is completely cold and wet. Protecting the forest keeps wild nature safe for everyone!",
    content_vi: "Cắm trại trong tự nhiên là một chuyến phiêu lưu ngoài trời thú vị cho cả gia đình. Khi dựng trại, hãy luôn chọn vùng đất phẳng và khô ráo, tránh xa các bụi cây khô. Giữ lửa trại bên trong một vòng đá nhẵn để ngăn các tia lửa bay lan sang cây cối. Trong khi nấu những món ăn ngon trên lửa, hãy luôn giữ khoảng cách an toàn và không bao giờ để ngọn lửa cháy mà không có người trông. Vào ban đêm, hãy ngước nhìn bầu trời sao để khám phá các chòm sao nổi tiếng. Các ngôi sao tạo nên những hình dạng tuyệt đẹp giúp các nhà thám hiểm định hướng phương bắc dễ dàng. Khi chuẩn bị rời đi, hãy luôn dập tắt lửa bằng nước sạch cho đến khi củi nguội hẳn và ướt đẫm. Bảo vệ khu rừng giúp giữ an toàn cho thiên nhiên hoang dã!",
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
