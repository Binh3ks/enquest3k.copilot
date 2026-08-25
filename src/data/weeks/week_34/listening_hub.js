// Pure Generated Listening Hub for Week 34 (Cambridge Exam Listening Parts 1-5 Only)
export const listeningHub = {
  listening_p1: {
    image_url: "/images/week34/w34_listening_p1_scene.jpg",
    names: [
      { id: "n1", text: "Leo the Lion", target_id: "t1", isExample: true },
      { id: "n2", text: "Milo the Mouse", target_id: "t2" },
      { id: "n3", text: "Hunter Jack", target_id: "t3" },
      { id: "n4", text: "Oliver the Owl", target_id: "t4" },
      { id: "n5", text: "Bella the Bird", target_id: "t5" },
      { id: "n6", text: "Sammy the Squirrel", target_id: "t6" }
    ],
    targets: [
      { id: "t1", label: "Leo (Large sleeping lion under tree)", x: 25, y: 65, isExample: true },
      { id: "t2", label: "Milo (Tiny mouse on mossy rock)", x: 55, y: 70 },
      { id: "t3", label: "Hunter Jack (Man holding rope behind bush)", x: 80, y: 40 },
      { id: "t4", label: "Oliver (Wise owl on high branch)", x: 20, y: 25 },
      { id: "t5", label: "Bella (Colorful bird near stream)", x: 68, y: 55 },
      { id: "t6", label: "Sammy (Squirrel gathering acorns on path)", x: 42, y: 78 }
    ]
  },
  listening_p2: {
    title: "The Lion's Daily Routine",
    audio_url: "/audio/week34/listening_p2_full.mp3",
    example: { field_label: "Wake-up time", answer: "6:00 AM" },
    fields: [
      { id: "f1", field_label: "Favorite hunting spot", answer: "near the river" },
      { id: "f2", field_label: "Number of cubs", answer: "3" },
      { id: "f3", field_label: "Best friend's name", answer: "Milo" },
      { id: "f4", field_label: "Resting place", answer: "under oak tree" },
      { id: "f5", field_label: "Danger signal", answer: "loud roar" }
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
    instructions: "Listen and tick the box. There is one example.",
    questions: [
      {
        id: "p4_example",
        isExample: true,
        question_en: "Where did Milo the mouse run in the morning?",
        audio_url: "/audio/week34/listening_p4_example.mp3",
        options: [
          { letter: "A", text: "Across the mossy rocks", image_url: "/images/week34/card_c.jpg" },
          { letter: "B", text: "Near the hunter camp", image_url: "/images/week34/card_b.jpg" },
          { letter: "C", text: "Around the water river", image_url: "/images/week34/card_d.jpg" }
        ],
        answer: "A"
      },
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
      },
      {
        id: "p4_q4",
        question_en: "Who helped the lion escape?",
        audio_url: "/audio/week34/listening_p4_q4.mp3",
        options: [
          { letter: "A", text: "The brave little mouse", image_url: "/images/week34/webtoon_scene_5.png" },
          { letter: "B", text: "A big brown bear", image_url: "/images/week34/card_f.jpg" },
          { letter: "C", text: "A wise gray owl", image_url: "/images/week34/card_c.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q5",
        question_en: "How did the lion feel after being freed?",
        audio_url: "/audio/week34/listening_p4_q5.mp3",
        options: [
          { letter: "A", text: "Grateful and relieved", image_url: "/images/week34/webtoon_scene_1.png" },
          { letter: "B", text: "Angry and hungry", image_url: "/images/week34/card_b.jpg" },
          { letter: "C", text: "Scared of the mouse", image_url: "/images/week34/card_g.jpg" }
        ],
        answer: "A"
      }
    ]
  },
  listening_p5: {
    image_url: "/images/week34/webtoon_scene_1.png",
    instructions: [
      { id: "inst_0", item: "Example Object", text: "Color the example brown", x: 10, y: 10, color: "brown", isExample: true },
      { id: "inst_1", item: "Little Mouse", text: "Color the little mouse brown", x: 50, y: 70, color: "brown" },
      { id: "inst_2", item: "Rope Net Sign", text: "Write the word 'NET' near the ropes", x: 65, y: 45, word: "NET" },
      { id: "inst_3", item: "Lion's Mane", text: "Color the lion's mane golden yellow", x: 30, y: 55, color: "yellow" },
      { id: "inst_4", item: "Forest Signpost", text: "Write the word 'FOREST' on the signpost", x: 80, y: 30, word: "FOREST" },
      { id: "inst_5", item: "Hunter's Hat", text: "Color the hat dark green", x: 90, y: 20, color: "dark green" },
      { id: "inst_6", item: "Tree Trunk", text: "Write the word 'TREE' on the trunk", x: 15, y: 85, word: "TREE" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
