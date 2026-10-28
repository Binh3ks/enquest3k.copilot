// Skill Practice Hub for Week 34
// Contains Day 2 Action Lab, Day 3 Grammar Duel & Singapore Math (Dictation abolished per Round 5)
export const skillPracticeHub = {
  grammar_drills: [
    {
      id: "st2_w34_g01",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a past continuous sentence with 'While'.",
      word_blocks: ["While", "the", "mighty", "lion", "was", "sleeping", ",", "a", "tiny", "mouse", "ran", "past", "."],
      distractor_blocks: ["is", "runs", "sleeps"]
    },
    {
      id: "st2_w34_g02",
      grammar_tag: "past_simple_promise",
      text_en: "Build a sentence about the mouse promising help.",
      word_blocks: ["The", "little", "mouse", "promised", "to", "help", "the", "lion", "one", "day", "."],
      distractor_blocks: ["promises", "helping", "big"]
    },
    {
      id: "st2_w34_g03",
      grammar_tag: "past_simple_passive_or_action",
      text_en: "Build a sentence about hunters capturing the lion.",
      word_blocks: ["Hunters", "trapped", "the", "strong", "lion", "in", "a", "heavy", "rope", "net", "."],
      distractor_blocks: ["traps", "is", "tiny"]
    },
    {
      id: "st2_w34_g04",
      grammar_tag: "past_simple_rescue",
      text_en: "Build a rescue sentence with the brave mouse.",
      word_blocks: ["The", "brave", "mouse", "chewed", "through", "the", "ropes", "and", "freed", "him", "."],
      distractor_blocks: ["chews", "frees", "running"]
    },
    {
      id: "st2_w34_g05",
      grammar_tag: "moral_friendship",
      text_en: "Build a moral friendship sentence.",
      word_blocks: ["They", "became", "loyal", "friends", "and", "lived", "peacefully", "in", "the", "forest", "."],
      distractor_blocks: ["becomes", "lives", "never"]
    }
  ],
  singapore_math: [
    { id: 1, problem_en: "The hunters had 60 meters of strong rope. They used 25 meters to make the net. How many meters of rope were left?", bar_model_svg: "/images/week34/barmodel_w34_adv_p1.svg", answer_value: 35 },
    { id: 2, problem_en: "The lion slept for 14 hours during the day and rested for 4 hours at night. How many hours did he rest in total?", bar_model_svg: "/images/week34/barmodel_w34_adv_p2.svg", answer_value: 18 },
    { id: 3, problem_en: "The mouse ran 80 meters to reach the trapped lion. A rabbit ran 45 meters. How many more meters did the mouse run?", bar_model_svg: "/images/week34/barmodel_w34_adv_p3.svg", answer_value: 35 },
    { id: 4, problem_en: "The net had 30 thick ropes. The mouse chewed 18 ropes in the morning. How many ropes were left to chew?", bar_model_svg: "/images/week34/barmodel_w34_adv_p4.svg", answer_value: 12 },
    { id: 5, problem_en: "There were 50 animals in the forest clearing. 32 were birds and the rest were small mammals. How many small mammals were there?", bar_model_svg: "/images/week34/barmodel_w34_adv_p5.svg", answer_value: 18 }
  ],
  science_lab: {
    id: "sci_w34_lab1",
    experimentTitle: "Animal Cooperation & Ecosystem Lab",
    title_en: "Animal Cooperation & Ecosystem Lab",
    title_vi: "Phòng Thí Nghiệm Hợp Tác Động Vật & Hệ Sinh Thái Rừng",
    diagramImage: "/images/week34/action_lab_diagram.png",
    background_image: "/images/week34/action_lab_diagram.png",
    explanation: "Explore how different animals cooperate to maintain safety, food, and survival across 3 interactive scenarios!",
    description_en: "Explore how different animals cooperate to maintain safety, food, and survival across 3 interactive scenarios!",
    stages: [
      {
        id: "stage_1_lookout",
        stageNumber: 1,
        title: "Stage 1: Forest Lookout & Early Warning",
        diagramImage: "/images/week34/action_lab_diagram.png",
        background_image: "/images/week34/action_lab_diagram.png",
        explanation: "Discover how high lookouts and loud birds alert sleeping predators to danger in the forest!",
        zones: [
          { id: "z1_1", label: "Warning Birds", correct_label: "Warning Birds", x: 62, y: 22, micro_explanation: "🐦 Warning birds chirp loudly from treetops to alert other animals." },
          { id: "z1_2", label: "Mighty Lion", correct_label: "Mighty Lion", x: 25, y: 60, micro_explanation: "🦁 The lion guards the territory and rests peacefully in safety." },
          { id: "z1_3", label: "Forest Trees", correct_label: "Forest Trees", x: 50, y: 30, micro_explanation: "🌳 Tall trees offer secure perches and deep protective shade." },
          { id: "z1_4", label: "Forest Floor", correct_label: "Forest Floor", x: 75, y: 75, micro_explanation: "🌿 Ground path where tiny creatures forage and navigate." }
        ],
        targets: [
          { id: "t1_1", name: "Warning Birds", x: 62, y: 22 },
          { id: "t1_2", name: "Mighty Lion", x: 25, y: 60 },
          { id: "t1_3", name: "Forest Trees", x: 50, y: 30 },
          { id: "t1_4", name: "Forest Floor", x: 75, y: 75 }
        ],
        labels: [
          { id: "lbl_1_1", text: "chirps loud warnings when danger comes", targetId: "t1_1" },
          { id: "lbl_1_2", text: "guards the forest and maintains territory", targetId: "t1_2" },
          { id: "lbl_1_3", text: "provides high lookouts and cool shade", targetId: "t1_3" },
          { id: "lbl_1_4", text: "provides ground path for foraging", targetId: "t1_4" }
        ]
      },
      {
        id: "stage_2_rescue",
        stageNumber: 2,
        title: "Stage 2: Trapped Lion & Teamwork Rescue",
        diagramImage: "/images/week34/action_lab_diagram.png",
        background_image: "/images/week34/action_lab_diagram.png",
        explanation: "Investigate how a tiny mouse uses sharp teeth to chew through heavy rope nets to free the lion!",
        zones: [
          { id: "z2_1", label: "Brave Mouse", correct_label: "Brave Mouse", x: 72, y: 65, micro_explanation: "🐭 The mouse uses sharp teeth to gnaw through tough rope fibers." },
          { id: "z2_2", label: "Trapped Lion", correct_label: "Trapped Lion", x: 28, y: 58, micro_explanation: "🦁 Even the strongest predator needs loyal friends when trapped." },
          { id: "z2_3", label: "Hunters' Net", correct_label: "Hunters' Net", x: 45, y: 48, micro_explanation: "🕸️ Heavy rope net binds large muscles but cannot stop small chewers." },
          { id: "z2_4", label: "Anchor Tree", correct_label: "Anchor Tree", x: 20, y: 25, micro_explanation: "🌲 Strong oak trunk where the trap ropes were secured." }
        ],
        targets: [
          { id: "t2_1", name: "Brave Mouse", x: 72, y: 65 },
          { id: "t2_2", name: "Trapped Lion", x: 28, y: 58 },
          { id: "t2_3", name: "Hunters' Net", x: 45, y: 48 },
          { id: "t2_4", name: "Anchor Tree", x: 20, y: 25 }
        ],
        labels: [
          { id: "lbl_2_1", text: "chews tough ropes with sharp teeth", targetId: "t2_1" },
          { id: "lbl_2_2", text: "waits patiently for friend's rescue", targetId: "t2_2" },
          { id: "lbl_2_3", text: "traps large animals with heavy ropes", targetId: "t2_3" },
          { id: "lbl_2_4", text: "anchors trap ropes firmly to ground", targetId: "t2_4" }
        ]
      },
      {
        id: "stage_3_ecosystem",
        stageNumber: 3,
        title: "Stage 3: Balanced Forest Ecosystem & Friendship",
        diagramImage: "/images/week34/action_lab_diagram.png",
        background_image: "/images/week34/action_lab_diagram.png",
        explanation: "Examine how cooperation between species creates a healthy, flourishing forest ecosystem!",
        zones: [
          { id: "z3_1", label: "Forest Trees", correct_label: "Forest Trees", x: 50, y: 28, micro_explanation: "🌳 Trees generate oxygen, fruit, and stable microclimates." },
          { id: "z3_2", label: "Little Mouse", correct_label: "Little Mouse", x: 75, y: 68, micro_explanation: "🌱 Mice aerate soil and disperse tree seeds as they forage." },
          { id: "z3_3", label: "Mighty Lion", correct_label: "Mighty Lion", x: 25, y: 58, micro_explanation: "👑 Apex predator keeps herd populations healthy and balanced." },
          { id: "z3_4", label: "Warning Birds", correct_label: "Warning Birds", x: 60, y: 20, micro_explanation: "🦅 Songbirds eat harmful insects and protect tree foliage." }
        ],
        targets: [
          { id: "t3_1", name: "Forest Trees", x: 50, y: 28 },
          { id: "t3_2", name: "Little Mouse", x: 75, y: 68 },
          { id: "t3_3", name: "Mighty Lion", x: 25, y: 58 },
          { id: "t3_4", name: "Warning Birds", x: 60, y: 20 }
        ],
        labels: [
          { id: "lbl_3_1", text: "generates oxygen and shelter for all", targetId: "t3_1" },
          { id: "lbl_3_2", text: "aerates forest soil and plants seeds", targetId: "t3_2" },
          { id: "lbl_3_3", text: "protects forest and maintains balance", targetId: "t3_3" },
          { id: "lbl_3_4", text: "controls insects and protects foliage", targetId: "t3_4" }
        ]
      }
    ]
  }
};

export const skillPracticeHubData = skillPracticeHub;
export default skillPracticeHub;
