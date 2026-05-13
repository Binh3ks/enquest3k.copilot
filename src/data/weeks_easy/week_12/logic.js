// Easy Mode Logic Lab - Week 12: I Can / I Can't
// Phase 1 Blueprint rules: Vocab & Patterns (Math Bridge)
// NO complex riddles. Simple reading comprehension with CAN / CAN'T.
// Text-input format: student reads short sentences and writes one-word answer.

export default {
  puzzles: [
    {
      id: 1,
      type: "logic",
      question_en: "Mia can swim. What CAN Mia do? (Write one word)",
      question_vi: "Mia co the boi. Mia co the lam gi? (Viet mot tu)",
      answer: ["swim", "swimming"],
      hint_en: "Read the first sentence again. It tells you what Mia CAN do.",
      hint_vi: "Doc lai cau dau tien. No noi cho ban biet Mia CO THE lam gi.",
      audio_url: "/audio/week12_easy/logic_1.mp3"
    },
    {
      id: 2,
      type: "logic",
      question_en: "Tom can sing. Tom can draw. Tom can NOT swim. What can Tom NOT do? (Write one word)",
      question_vi: "Tom co the hat. Tom co the ve. Tom KHONG THE boi. Tom khong the lam gi? (Viet mot tu)",
      answer: ["swim", "swimming"],
      hint_en: "Find the sentence with 'can NOT'. That word is the answer.",
      hint_vi: "Tim cau co 'can NOT'. Tu do la dap an.",
      audio_url: "/audio/week12_easy/logic_2.mp3"
    },
    {
      id: 3,
      type: "logic",
      question_en: "I can run. I can jump. I can NOT fly. What can I NOT do? (Write one word)",
      question_vi: "Toi co the chay. Toi co the nhay. Toi KHONG THE bay. Toi khong the lam gi? (Viet mot tu)",
      answer: ["fly", "flying"],
      hint_en: "Find the sentence with 'can NOT'. That word is the answer.",
      hint_vi: "Tim cau co 'can NOT'. Tu do la dap an.",
      audio_url: "/audio/week12_easy/logic_3.mp3"
    },
    {
      id: 4,
      type: "logic",
      question_en: "Anna can dance very well. She loves dancing! Anna is a great ___. (Write: dancer or singer)",
      question_vi: "Anna co the nhay rat gioi. Co ay yeu thich nhay! Anna la mot ___ tuyet voi. (Viet: dancer hoac singer)",
      answer: ["dancer"],
      hint_en: "Anna loves dancing. dance + r = dancer. sing + er = singer.",
      hint_vi: "Anna yeu thich nhay. dance + r = dancer. sing + er = singer.",
      audio_url: "/audio/week12_easy/logic_4.mp3"
    },
    {
      id: 5,
      type: "logic",
      question_en: "Ben can cook. Ben can read. Ben can NOT ride a bike. How many things CAN Ben do? (Write a number)",
      question_vi: "Ben co the nau an. Ben co the doc sach. Ben KHONG THE di xe dap. Ben co the lam bao nhieu viec? (Viet so)",
      answer: ["2", "two"],
      hint_en: "Count only sentences with 'can' (skip 'can NOT'). How many?",
      hint_vi: "Chi dem cac cau co 'can' thoi (khong tinh 'can NOT'). Co bao nhieu?",
      audio_url: "/audio/week12_easy/logic_5.mp3"
    }
  ]
};
