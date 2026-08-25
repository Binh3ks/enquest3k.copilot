// Skill Practice Hub for Week 34 (Extracted from Legacy Hub 2)
// Contains Day 2 Action Lab, Day 3 Grammar Duel & Singapore Math, and Dictation
export const skillPracticeHub = {
  dictation: [
    { id: 1, text: "The lion was sleeping peacefully.", audio_url: "/audio/week34/dictation_1.mp3" },
    { id: 2, text: "A tiny mouse ran across the path.", audio_url: "/audio/week34/dictation_2.mp3" },
    { id: 3, text: "The mouse promised to help the lion.", audio_url: "/audio/week34/dictation_3.mp3" },
    { id: 4, text: "Hunters trapped the lion in a strong net.", audio_url: "/audio/week34/dictation_4.mp3" },
    { id: 5, text: "The mouse chewed through the thick ropes.", audio_url: "/audio/week34/dictation_5.mp3" }
  ],
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
    experimentTitle: "Animal Cooperation & Ecosystem Lab",
    diagramImage: "/images/week34/explore_cover_w34.jpg",
    explanation: "Match each forest job to the animal that does it. These are real jobs animals do to help the forest!",
    targets: [
      { id: "t1", name: "Lion", x: 25, y: 60 },
      { id: "t2", name: "Mouse", x: 75, y: 65 },
      { id: "t3", name: "Forest Trees", x: 50, y: 30 },
      { id: "t4", name: "Warning Birds", x: 62, y: 22 }
    ],
    labels: [
      { id: "lbl_1", text: "guards the forest from danger", targetId: "t1" },
      { id: "lbl_2", text: "cleans the floor and plants new seeds", targetId: "t2" },
      { id: "lbl_3", text: "gives food, shade and warm homes", targetId: "t3" },
      { id: "lbl_4", text: "chirps loud warnings when predators come", targetId: "t4" }
    ]
  }
};

export const skillPracticeHubData = skillPracticeHub;
export default skillPracticeHub;
