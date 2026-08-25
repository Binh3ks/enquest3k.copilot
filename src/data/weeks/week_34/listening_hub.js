// Pure Generated Listening Hub for Week 34
export const listeningHub = {
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
    {
      id: 1,
      problem_en: "The lion caught 24 fish on Monday and 16 fish on Tuesday. How many fish did he catch altogether?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p1.svg",
      answer_value: 40
    },
    {
      id: 2,
      problem_en: "The mouse collected 35 seeds. He gave 15 seeds to his friend. How many seeds did he have left?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p2.svg",
      answer_value: 20
    },
    {
      id: 3,
      problem_en: "The lion roared 3 times in the morning and 4 times in the evening. Each roar lasted 2 seconds. How many seconds did he roar in total?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p3.svg",
      answer_value: 14
    },
    {
      id: 4,
      problem_en: "The hunters had 45 feet of rope. They used 27 feet for a net. How many feet of rope remained?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p4.svg",
      answer_value: 18
    },
    {
      id: 5,
      problem_en: "A bird flew 12 kilometers in the morning and 18 kilometers in the afternoon. What was the total distance flown?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p5.svg",
      answer_value: 30
    }
  ],
  science_lab: {
    experimentTitle: "Animal Cooperation & Ecosystem Lab",
    diagramImage: "/images/week34/explore_cover_w34.jpg",
    explanation: "Explore how the mighty lion, tiny mouse, and tall trees help each other survive and thrive in the forest.",
    targets: [
      { id: "t1", name: "Lion (Guardian)", x: 25, y: 60 },
      { id: "t2", name: "Mouse (Helper)", x: 75, y: 65 },
      { id: "t3", name: "Forest Trees (Habitat)", x: 50, y: 30 }
    ],
    labels: [
      { id: "lbl_1", text: "Mighty Guardian", targetId: "t1" },
      { id: "lbl_2", text: "Tiny Helper", targetId: "t2" },
      { id: "lbl_3", text: "Green Habitat", targetId: "t3" }
    ]
  },
  listening_p1: {
    image_url: "/images/week34/w34_listening_p1_scene.jpg",
    names: [
      { id: "n1", text: "Leo the Lion", target_id: "t1", isExample: true },
      { id: "n2", text: "Milo the Mouse", target_id: "t2" },
      { id: "n3", text: "Hunter Jack", target_id: "t3" },
      { id: "n4", text: "Oliver the Owl", target_id: "t4" },
      { id: "n5", text: "Bella the Bird", target_id: "t5" },
      { id: "n6", text: "Sammy the Squirrel", target_id: null }
    ],
    targets: [
      { id: "t1", label: "Leo (Large sleeping lion under tree)", x: 25, y: 65, isExample: true },
      { id: "t2", label: "Milo (Tiny mouse on mossy rock)", x: 55, y: 70 },
      { id: "t3", label: "Hunter Jack (Man holding rope behind bush)", x: 80, y: 40 },
      { id: "t4", label: "Oliver (Wise owl on high branch)", x: 20, y: 25 },
      { id: "t5", label: "Bella (Colorful bird near stream)", x: 68, y: 55 }
    ]
  },
  listening_p3: {
    items: [
      { id: 1, name: "Wooden Trap", target_letter: "A", audio_url: "/audio/week34/listening_p3_item1.mp3" },
      { id: 2, name: "Thick Rope", target_letter: "B", audio_url: "/audio/week34/listening_p3_item2.mp3" },
      { id: 3, name: "Forest Map", target_letter: "C", audio_url: "/audio/week34/listening_p3_item3.mp3" },
      { id: 4, name: "Water Bottle", target_letter: "D", audio_url: "/audio/week34/listening_p3_item4.mp3" },
      { id: 5, name: "Compass", target_letter: "E", audio_url: "/audio/week34/listening_p3_item5.mp3" }
    ],
    cards: [
      { letter: "A", name: "Wooden Trap", location_name: "Forest Clearing", image_url: "/images/week34/card_a.jpg" },
      { letter: "B", name: "Thick Rope", location_name: "Hunter Camp", image_url: "/images/week34/card_b.jpg" },
      { letter: "C", name: "Forest Map", location_name: "Tree Hollow", image_url: "/images/week34/card_c.jpg" },
      { letter: "D", name: "Water Bottle", location_name: "Riverbank", image_url: "/images/week34/card_d.jpg" },
      { letter: "E", name: "Compass", location_name: "Lookout Rock", image_url: "/images/week34/card_e.jpg" },
      { letter: "F", name: "Flashlight", location_name: "Dark Cave", image_url: "/images/week34/card_f.jpg" },
      { letter: "G", name: "Backpack", location_name: "Base Tent", image_url: "/images/week34/card_g.jpg" },
      { letter: "H", name: "Binoculars", location_name: "Wooden Tower", image_url: "/images/week34/card_h.jpg" }
    ]
  },
  listening_p4: {
    audio_url: "/audio/week34/listening_p4_full.mp3",
    questions: [
      {
        id: "p4_q1",
        question_en: "Where was the lion sleeping?",
        audio_url: "/audio/week34/listening_p4_q1.mp3",
        options: [
          { letter: "A", text: "Under a tall oak tree", image_url: "/images/week34/webtoon_scene_1.png" },
          { letter: "B", text: "Inside a stone cave", image_url: "/images/week34/card_f.jpg" },
          { letter: "C", text: "Near a wooden camp", image_url: "/images/week34/card_b.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q2",
        question_en: "What trapped the lion in the forest?",
        audio_url: "/audio/week34/listening_p4_q2.mp3",
        options: [
          { letter: "A", text: "A heavy rope net", image_url: "/images/week34/card_a.jpg" },
          { letter: "B", text: "A wooden cage", image_url: "/images/week34/card_b.jpg" },
          { letter: "C", text: "A deep hole", image_url: "/images/week34/card_g.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q3",
        question_en: "How did the mouse free the lion?",
        audio_url: "/audio/week34/listening_p4_q3.mp3",
        options: [
          { letter: "A", text: "He chewed the thick ropes", image_url: "/images/week34/webtoon_scene_5.png" },
          { letter: "B", text: "He called other hunters", image_url: "/images/week34/card_c.jpg" },
          { letter: "C", text: "He brought a key", image_url: "/images/week34/card_e.jpg" }
        ],
        answer: "A"
      }
    ]
  },
  listening_p5: {
    image_url: "/images/week34/webtoon_scene_1.png",
    instructions: [
      { id: "inst_1", item: "Little Mouse", text: "Color the little mouse brown", x: 50, y: 70, color: "brown" },
      { id: "inst_2", item: "Rope Net Sign", text: "Write the word 'NET' near the ropes", x: 65, y: 45, word: "NET" },
      { id: "inst_3", item: "Lion's Mane", text: "Color the lion's mane golden yellow", x: 30, y: 55, color: "yellow" },
      { id: "inst_4", item: "Forest Signpost", text: "Write the word 'FOREST' on the signpost", x: 80, y: 30, word: "FOREST" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
