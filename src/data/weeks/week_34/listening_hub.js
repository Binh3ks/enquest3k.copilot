// Pure Generated Listening Hub for Week 34
export const listeningHub = {
  theme: "The Lion and the Mouse",
  cefr_level: "A2 Flyers",

  dictation: [
    { id: 1, text: "The lion was sleeping peacefully under a tree.", audio_url: "/audio/week34/dictation_1.mp3" },
    { id: 2, text: "A tiny mouse ran across his front paw.", audio_url: "/audio/week34/dictation_2.mp3" },
    { id: 3, text: "The mouse promised to help the lion one day.", audio_url: "/audio/week34/dictation_3.mp3" },
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
      problem_en: "The hunters had 60 meters of strong rope. They used 25 meters to make the net. How many meters of rope were left?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p1.svg",
      answer_value: 35
    },
    {
      id: 2,
      problem_en: "The lion slept for 14 hours during the day and rested for 4 hours at night. How many hours did he rest in total?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p2.svg",
      answer_value: 18
    },
    {
      id: 3,
      problem_en: "The mouse ran 80 meters to reach the trapped lion. A rabbit ran 45 meters. How many more meters did the mouse run?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p3.svg",
      answer_value: 35
    },
    {
      id: 4,
      problem_en: "The net had 30 thick ropes. The mouse chewed 18 ropes in the morning. How many ropes were left to chew?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p4.svg",
      answer_value: 12
    },
    {
      id: 5,
      problem_en: "The mouse collected 40 seeds. He shared 15 seeds with the bird. How many seeds did he keep for himself?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p5.svg",
      answer_value: 25
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
    audio_url: "/audio/week34/listening_p1_full.mp3",
    names: [
      { id: "n1", text: "Leo the Lion", target_id: "t1", isExample: true },
      { id: "n2", text: "Milo the Mouse", target_id: "t2" },
      { id: "n3", text: "Hunter Jack", target_id: "t3" },
      { id: "n4", text: "Oliver the Owl", target_id: "t4" },
      { id: "n5", text: "Bella the Bird", target_id: "t5" },
      { id: "n6", text: "Rob the Rabbit", target_id: "t6" },
      { id: "n7", text: "Sammy the Squirrel", target_id: null }
    ],
    targets: [
      { id: "t1", label: "Leo (Large sleeping lion under tree)", x: 45, y: 55, isExample: true },
      { id: "t2", label: "Milo (Tiny mouse on mossy rock)", x: 30, y: 70 },
      { id: "t3", label: "Hunter Jack (Man holding rope behind bush)", x: 80, y: 50 },
      { id: "t4", label: "Oliver (Wise owl on high branch)", x: 65, y: 25 },
      { id: "t5", label: "Bella (Colorful bird near stream)", x: 50, y: 18 },
      { id: "t6", label: "Rob (White rabbit drinking at riverbank)", x: 18, y: 75 }
    ]
  },

  listening_p2: {
    title: "The Forest Wildlife Project",
    audio_url: "/audio/week34/listening_p2_full.mp3",
    example: { field_label: "Fable story title", answer: "The Lion and Mouse" },
    fields: [
      { id: "f1", field_label: "Lion location", answer: "under a tree" },
      { id: "f2", field_label: "Running animal", answer: "tiny mouse" },
      { id: "f3", field_label: "Hunter equipment", answer: "rope net" },
      { id: "f4", field_label: "Cutting method", answer: "sharp teeth" },
      { id: "f5", field_label: "Story moral", answer: "small friends help" }
    ]
  },

  listening_p3: {
    example: { name: "Wooden Trap", target_letter: "A" },
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
    instructions: "Listen and tick the box. There is one example.",
    questions: [
      {
        id: "p4_example",
        isExample: true,
        question_en: "Where was the lion sleeping?",
        audio_url: "/audio/week34/listening_p4_q1.mp3",
        options: [
          { letter: "A", text: "Under a tall oak tree", image_url: "/images/week34/webtoon_scene_1.png" },
          { letter: "B", text: "Inside a dark stone cave", image_url: "/images/week34/card_f.jpg" },
          { letter: "C", text: "Near a wooden camp", image_url: "/images/week34/card_b.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q1",
        question_en: "Where was the lion resting in the afternoon?",
        audio_url: "/audio/week34/listening_p4_q1.mp3",
        options: [
          { letter: "A", text: "Under a shady tree", image_url: "/images/week34/webtoon_scene_1.png" },
          { letter: "B", text: "Near a rocky cave", image_url: "/images/week34/card_f.jpg" },
          { letter: "C", text: "In the grassy field", image_url: "/images/week34/card_b.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q2",
        question_en: "What trapped the lion in the forest?",
        audio_url: "/audio/week34/listening_p4_q2.mp3",
        options: [
          { letter: "A", text: "A wooden cage", image_url: "/images/week34/card_a.jpg" },
          { letter: "B", text: "A heavy rope net", image_url: "/images/week34/webtoon_scene_4.png" },
          { letter: "C", text: "A deep ground hole", image_url: "/images/week34/card_c.jpg" }
        ],
        answer: "B"
      },
      {
        id: "p4_q3",
        question_en: "How did the mouse free the lion?",
        audio_url: "/audio/week34/listening_p4_q3.mp3",
        options: [
          { letter: "A", text: "Using a wooden stick", image_url: "/images/week34/card_d.jpg" },
          { letter: "B", text: "Calling other animals", image_url: "/images/week34/card_e.jpg" },
          { letter: "C", text: "Chewing the thick ropes", image_url: "/images/week34/webtoon_scene_5.png" }
        ],
        answer: "C"
      },
      {
        id: "p4_q4",
        question_en: "What does the oxpecker bird eat on the zebra?",
        audio_url: "/audio/week34/listening_p4_q4.mp3",
        options: [
          { letter: "A", text: "Small bugs on zebra", image_url: "/images/week34/explore_cover_w34.jpg" },
          { letter: "B", text: "Sweet red berries", image_url: "/images/week34/card_g.jpg" },
          { letter: "C", text: "Green grass seeds", image_url: "/images/week34/card_h.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q5",
        question_en: "Where did the lion and mouse go after they became friends?",
        audio_url: "/audio/week34/listening_p4_q5.mp3",
        options: [
          { letter: "A", text: "To the hunter village", image_url: "/images/week34/card_b.jpg" },
          { letter: "B", text: "To the sunny forest clearing", image_url: "/images/week34/webtoon_scene_5.png" },
          { letter: "C", text: "To the dark mountains", image_url: "/images/week34/card_f.jpg" }
        ],
        answer: "B"
      }
    ]
  },

  listening_p5: {
    image_url: "/images/week34/webtoon_scene_1.png",
    instructions: [
      { id: "inst_0", item: "Example Object", text: "Color the example brown", x: 10, y: 10, color: "brown", isExample: true },
      { id: "inst_1", item: "Lion Mane", text: "Color the lion's mane golden yellow", x: 45, y: 55, color: "yellow" },
      { id: "inst_2", item: "Rope Trap", text: "Write the word 'TRAP' near the ropes", x: 65, y: 45, word: "TRAP" },
      { id: "inst_3", item: "Tiny Mouse", text: "Color the little mouse grey", x: 30, y: 70, color: "grey" },
      { id: "inst_4", item: "Forest Signboard", text: "Write the word 'FRIENDS' on the signboard", x: 80, y: 30, word: "FRIENDS" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
