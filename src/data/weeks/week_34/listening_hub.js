// Pure Generated Listening Hub for Week 34
export const listeningHub = {
  dictation: [
    { id: 1, text: "The lion was sleeping peacefully.", audio_url: "/audio/week34/dictation_1.mp3" },
    { id: 2, text: "A tiny mouse ran across the path.", audio_url: "/audio/week34/dictation_2.mp3" },
    { id: 3, text: "The mouse promised to help the lion.", audio_url: "/audio/week34/dictation_3.mp3" },
    { id: 4, text: "Hunters trapped the lion in a strong net.", audio_url: "/audio/week34/dictation_4.mp3" },
    { id: 5, text: "The mouse chewed through the thick ropes.", audio_url: "/audio/week34/dictation_5.mp3" }
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
      problem_en: "There are 3 groups of monkeys. Each group has 8 monkeys. How many monkeys are there in total?",
      bar_model_svg: "/images/week34/barmodel_w34_adv_p3.svg",
      answer_value: 24
    },
    {
      id: 4,
      problem_en: "The hunters had 45 meters of rope. They used 27 meters for a net. How many meters of rope remained?",
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
    simulation_title: "Animal Cooperation Lab",
    experiment_steps: ["Observe animal roles", "Measure mutual benefits", "Record ecosystem balance"],
    interactive_items: ["Lion", "Mouse", "Forest Habitat"],
    conclusion_formula: "Cooperation = Harmony"
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
  listening_p5: {
    image_url: "/images/week34/explore_cover_w34.jpg",
    instructions: [
      { id: "inst_1", text: "Color the little mouse brown", x: 50, y: 70, color: "brown" },
      { id: "inst_2", text: "Write the word 'NET' near the ropes", x: 65, y: 45, word: "NET" },
      { id: "inst_3", text: "Color the lion's mane golden yellow", x: 30, y: 55, color: "yellow" },
      { id: "inst_4", text: "Write the word 'FOREST' on the signpost", x: 80, y: 30, word: "FOREST" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
