/**
 * Week 33 Gold Standard Data — Reading Hub
 * Theme: "Corridor Safety & School Care"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  cefr_level: "A2 Flyers",
  vocab: vocabList,
  interactive_story: {
    mode: "open_cloze",
    title: "Interactive Story: Corridor Safety Incident",
    text_template: "Jake **was walking carefully** down the school corridor today. First, he **noticed a wet puddle** near the science room. Then, a boy running fast ____1____ on the slippery tiles and ____2____ heavily. ____3____, Jake stopped immediately and ____4____ the school nurse. The nurse arrived quickly with a ____5____ and treated his knee gently.",
    gaps: [
      { id: 1, target: "slipped", hint: "trượt chân", hint_vi: "trượt chân" },
      { id: 2, target: "fell down", hint: "ngã xuống", hint_vi: "ngã xuống" },
      { id: 3, target: "Right away", hint: "ngay lập tức", hint_vi: "ngay lập tức" },
      { id: 4, target: "called", hint: "gọi", hint_vi: "gọi" },
      { id: 5, target: "clean bandage", hint: "băng cá nhân sạch", hint_vi: "băng cá nhân sạch" }
    ],
    hints: {
      1: "trượt chân",
      2: "ngã xuống",
      3: "ngay lập tức",
      4: "gọi",
      5: "băng cá nhân sạch"
    },
    word_bank: ["slipped", "fell down", "Right away", "called", "clean bandage"]
  },
  story_scenes: read_explore.story_scenes,
  read_explore,

  // Cambridge Reading & Writing Part 6 (Open Cloze - 5 Gaps Text Input)
  rw_part_6: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Jake's Diary: Tuesday",
    text_template: "Dear Diary, today was a crazy day at school. After science class, I was walking down the [1]_____. Suddenly, Tom ran past me very fast. He didn't see the yellow warning sign. He [2]_____ on the wet floor and fell down! He [3]_____ his left knee. I walked quickly and [4]_____ the school nurse for help. She brought a clean [5]_____ and fixed his knee. I'm glad he is okay!",
    answers: {
      "1": "corridor",
      "2": "slipped",
      "3": "hurt",
      "4": "called",
      "5": "bandage"
    }
  }
};

export default readingHubData;
