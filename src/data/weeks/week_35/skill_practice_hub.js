// Skill Practice Hub for Week 35 — The Lion and the Mouse (Forest Teamwork)
// Contains: Dictation, Grammar Drills, Singapore Math, Science Lab
export const skillPracticeHub = {
  dictation: [
    { id: 1, text: "The little mouse helped the big lion escape the trap.", audio_url: "/audio/week35/dictation_1.mp3" },
    { id: 2, text: "Leo the lion was sleeping quietly under the tall oak tree.", audio_url: "/audio/week35/dictation_2.mp3" },
    { id: 3, text: "Hunter Jack set a rope net between the trees.", audio_url: "/audio/week35/dictation_3.mp3" },
    { id: 4, text: "Milo the mouse chewed through the rope and freed his friend.", audio_url: "/audio/week35/dictation_4.mp3" },
    { id: 5, text: "The lion felt grateful and they became the best of friends.", audio_url: "/audio/week35/dictation_5.mp3" }
  ],
  grammar_drills: [
    {
      id: "st2_w35_g01",
      grammar_tag: "past_simple_action",
      text_en: "Build a past simple sentence about the mouse helping the lion.",
      word_blocks: ["The", "tiny", "mouse", "chewed", "through", "the", "rope", "quickly", "."],
      distractor_blocks: ["chews", "chewing", "was"]
    },
    {
      id: "st2_w35_g02",
      grammar_tag: "past_simple_incident",
      text_en: "Build a sentence about the lion getting caught.",
      word_blocks: ["Leo", "the", "lion", "fell", "into", "the", "hunter's", "trap", "."],
      distractor_blocks: ["falls", "fall", "catching"]
    },
    {
      id: "st2_w35_g03",
      grammar_tag: "past_simple_kindness",
      text_en: "Build a sentence about the lion showing kindness.",
      word_blocks: ["The", "lion", "did", "not", "eat", "the", "small", "mouse", "."],
      distractor_blocks: ["eats", "eating", "eaten"]
    },
    {
      id: "st2_w35_g04",
      grammar_tag: "past_simple_result",
      text_en: "Build a sentence about the mouse freeing the lion.",
      word_blocks: ["Milo", "freed", "Leo", "from", "the", "net", "at", "last", "."],
      distractor_blocks: ["frees", "freeing", "was"]
    },
    {
      id: "st2_w35_g05",
      grammar_tag: "past_simple_friendship",
      text_en: "Build a sentence about their friendship.",
      word_blocks: ["Leo", "and", "Milo", "became", "the", "best", "of", "friends", "."],
      distractor_blocks: ["become", "becoming", "were"]
    }
  ],
  singapore_math: [
    { id: 1, problem_en: "The hiking trail is 1200 meters. The lion walked 800 meters. How many meters remained?", bar_model_svg: "/images/week35/barmodel_w35_adv_p1.svg", answer_value: 400 },
    { id: 2, problem_en: "There were 50 sticks for the campfire. The campers used 18 sticks. How many sticks were left?", bar_model_svg: "/images/week35/barmodel_w35_adv_p2.svg", answer_value: 32 },
    { id: 3, problem_en: "There were 24 marshmallows. The friends shared them equally among 3 groups. How many did each group get?", bar_model_svg: "/images/week35/barmodel_w35_adv_p3.svg", answer_value: 8 },
    { id: 4, problem_en: "There were 20 campers. 16 went hiking. How many stayed at the camp?", bar_model_svg: "/images/week35/barmodel_w35_adv_p4.svg", answer_value: 4 },
    { id: 5, problem_en: "The camp activity lasted 3 hours. How many minutes is that?", bar_model_svg: "/images/week35/barmodel_w35_adv_p5.svg", answer_value: 60 }
  ],
  science_lab: {
    title: "Forest Ecosystem Lab",
    topic: "How Animals Help Each Other",
    experiment: "Observe how different animals in a forest ecosystem depend on each other to survive.",
    steps: [
      { step: 1, instruction: "Look at the forest picture. Name 3 animals you can see." },
      { step: 2, instruction: "Circle the animals that help each other. Draw a line between them." },
      { step: 3, instruction: "Write one sentence about how the mouse helped the lion." }
    ],
    key_vocab: ["ecosystem", "cooperation", "forest", "survive", "animal"],
    discussion_en: "Why is it important for animals to help each other in the forest?"
  }
};

export const skillPracticeHubData = skillPracticeHub;
export default skillPracticeHub;
