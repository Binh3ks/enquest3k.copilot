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

  // Cambridge Reading & Writing Part 6 (Open Cloze - 5 Gaps Text Input - Learn Mode)
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
  },

  // Check Mode Parameterized Variant: Shifted Gap Positions & Mutated Surface Details
  rw_part_6_check_mode: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Oliver's Diary: Wednesday (Check Mode Exam Paper)",
    text_template: "Dear Diary, today was an eventful day. After class, I was walking [1]_____ the corridor. Suddenly, Leo ran [2]_____ me fast. He slipped on the wet floor [3]_____ he was running. I called the nurse [4]_____ help. She arrived quickly [5]_____ treated his knee gently.",
    answers: {
      "1": "down",
      "2": "past",
      "3": "because",
      "4": "for",
      "5": "and"
    }
  },

  // Check Mode Drills (10 Assessment Questions for W33)
  check_mode_drills: [
    {
      id: 'q1',
      question: 'Where was Jake walking after science class?',
      options: ['A) In the playground', 'B) Down the school corridor', 'C) In the library', 'D) On the football field'],
      answerIndex: 1
    },
    {
      id: 'q2',
      question: 'Why did Tom slip and fall down?',
      options: ['A) He was running fast on the wet floor', 'B) His shoe laces were untied', 'C) Someone pushed him', 'D) The lights went out'],
      answerIndex: 0
    },
    {
      id: 'q3',
      question: 'Which part of his body did Tom hurt when he fell?',
      options: ['A) His arm', 'B) His knee', 'C) His shoulder', 'D) His elbow'],
      answerIndex: 1
    },
    {
      id: 'q4',
      question: 'Who did Jake call immediately to help Tom?',
      options: ['A) His parents', 'B) The school nurse', 'C) The bus driver', 'D) The coach'],
      answerIndex: 1
    },
    {
      id: 'q5',
      question: 'What two things did the school nurse bring to treat the injury?',
      options: ['A) A bandage and a cold pack', 'B) A glass of water and fruit', 'C) A wheelchair and pillow', 'D) Warm soup and medicine'],
      answerIndex: 0
    },
    {
      id: 'q6',
      question: 'What did Mia do near the yellow warning sign?',
      options: ['A) She ate her snack', 'B) She wiped the wet floor with a mop', 'C) She drew a picture', 'D) She read a comic book'],
      answerIndex: 1
    },
    {
      id: 'q7',
      question: 'What rule did the headmaster remind all students to follow?',
      options: ['A) Always run in hallways', 'B) Never run in corridors', 'C) Eat lunch in classrooms', 'D) Leave school early'],
      answerIndex: 1
    },
    {
      id: 'q8',
      question: 'What is the past simple form of "slip"?',
      options: ['A) Slips', 'B) Slipping', 'C) Slipped', 'D) Slipt'],
      answerIndex: 2
    },
    {
      id: 'q9',
      question: 'What is the past continuous form of "walk" for "Jake"?',
      options: ['A) Were walking', 'B) Was walking', 'C) Is walking', 'D) Walking'],
      answerIndex: 1
    },
    {
      id: 'q10',
      question: 'How did everyone feel after Tom was safely treated?',
      options: ['A) Relieved and thankful', 'B) Angry and upset', 'C) Tired and bored', 'D) Confused and scared'],
      answerIndex: 0
    }
  ],

  // Cambridge Reading Part 3 Story (Story Gap-Fill & Comprehension)
  reading_part3_story: {
    title: "Nova's Discovery — Corridor Safety Incident",
    story_text: "Jake was walking carefully down the school corridor after science class. Suddenly, Tom ran past him in a hurry. Tom didn't notice the wet puddle on the floor and slipped heavily, hurting his knee. Papers flew everywhere! Jake stopped immediately and called the school nurse. The nurse arrived quickly with a clean bandage and a cold pack. Meanwhile, Mia brought a mop and wiped the wet floor so nobody else would fall. The headmaster praised the students for their quick action and reminded everyone to always walk safely.",
    questions: [
      {
        id: "r3_q01",
        question: "Why was Jake walking carefully down the corridor?",
        options: [
          { label: "A", text: "Because he always watches where he is going after class.", isCorrect: true },
          { label: "B", text: "Because he lost his shoes.", isCorrect: false },
          { label: "C", text: "Because the lights were completely off.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q02",
        question: "What caused Tom to slip and fall heavily?",
        options: [
          { label: "A", text: "He was running fast and stepped on a wet puddle.", isCorrect: true },
          { label: "B", text: "He tripped over a school bag.", isCorrect: false },
          { label: "C", text: "His friend pulled his jacket.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q03",
        question: "What did Jake do as soon as he saw Tom fall?",
        options: [
          { label: "A", text: "He stopped immediately and called the school nurse.", isCorrect: true },
          { label: "B", text: "He ran away to his next class.", isCorrect: false },
          { label: "C", text: "He started laughing loudly.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q04",
        question: "How did Mia help keep other students safe?",
        options: [
          { label: "A", text: "She wiped the floor with a cleaning mop.", isCorrect: true },
          { label: "B", text: "She placed a bench across the door.", isCorrect: false },
          { label: "C", text: "She carried Tom to the playground.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q05",
        question: "What important message did the headmaster give all students?",
        options: [
          { label: "A", text: "To always walk safely and never run in school corridors.", isCorrect: true },
          { label: "B", text: "To play soccer inside the science lab.", isCorrect: false },
          { label: "C", text: "To arrive at school an hour later.", isCorrect: false }
        ],
        answerIndex: 0
      }
    ]
  }
};

export default readingHubData;
