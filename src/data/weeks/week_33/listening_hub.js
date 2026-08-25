// Pure Generated Listening Hub for Week 33 (Cambridge Exam Listening Parts 1-5 Only)
export const listeningHub = {
  listening_p1: {
    image_url: "/images/week33/w33_listening_p1_scene.jpg",
    names: [
      { id: "n1", text: "Jake", target_id: "t1", isExample: true },
      { id: "n2", text: "Tom", target_id: "t2" },
      { id: "n3", text: "Nurse Sarah", target_id: "t3" },
      { id: "n4", text: "Headmaster Brown", target_id: "t4" },
      { id: "n5", text: "Cleaner Bob", target_id: "t5" },
      { id: "n6", text: "Teacher David", target_id: "t6" }
    ],
    targets: [
      { id: "t1", label: "Jake (Boy holding science notebooks)", x: 25, y: 65, isExample: true },
      { id: "t2", label: "Tom (Student running fast near tiles)", x: 55, y: 70 },
      { id: "t3", label: "Nurse Sarah (Woman with first-aid kit)", x: 80, y: 40 },
      { id: "t4", label: "Headmaster Brown (Man wearing glasses)", x: 20, y: 25 },
      { id: "t5", label: "Cleaner Bob (Man holding mop near sign)", x: 42, y: 78 },
      { id: "t6", label: "Teacher David (Teacher walking near lab)", x: 68, y: 55 }
    ]
  },
  listening_p2: {
    title: "Jake's School Day",
    audio_url: "/audio/week33/listening_p2_full.mp3",
    example: { field_label: "Classroom number", answer: "Room 4B" },
    fields: [
      { id: "f1", field_label: "Favorite subject", answer: "Science" },
      { id: "f2", field_label: "Incident location", answer: "school corridor" },
      { id: "f3", field_label: "Nurse arrival time", answer: "2 minutes" },
      { id: "f4", field_label: "First aid item", answer: "clean bandage" },
      { id: "f5", field_label: "Headmaster award", answer: "safety badge" }
    ]
  },
  listening_p3: {
    items: [
      { id: 1, name: "School Handrail", target_letter: "A", audio_url: "/audio/week33/listening_p3_item1.mp3" },
      { id: 2, name: "Warning Sign", target_letter: "B", audio_url: "/audio/week33/listening_p3_item2.mp3" },
      { id: 3, name: "First-Aid Kit", target_letter: "C", audio_url: "/audio/week33/listening_p3_item3.mp3" },
      { id: 4, name: "Cold Pack", target_letter: "D", audio_url: "/audio/week33/listening_p3_item4.mp3" },
      { id: 5, name: "Clean Bandage", target_letter: "E", audio_url: "/audio/week33/listening_p3_item5.mp3" }
    ],
    cards: [
      { letter: "A", name: "School Handrail", location_name: "Staircase", image_url: "/images/week33/card_a.jpg" },
      { letter: "B", name: "Warning Sign", location_name: "Corridor Floor", image_url: "/images/week33/card_b.jpg" },
      { letter: "C", name: "First-Aid Kit", location_name: "Nurse Office", image_url: "/images/week33/card_c.jpg" },
      { letter: "D", name: "Cold Pack", location_name: "Freezer Box", image_url: "/images/week33/card_d.jpg" },
      { letter: "E", name: "Clean Bandage", location_name: "Medical Cabinet", image_url: "/images/week33/card_e.jpg" },
      { letter: "F", name: "Science Goggles", location_name: "Science Room", image_url: "/images/week33/card_f.jpg" },
      { letter: "G", name: "School Backpack", location_name: "Locker Room", image_url: "/images/week33/card_g.jpg" },
      { letter: "H", name: "Cleaning Mop", location_name: "Utility Closet", image_url: "/images/week33/card_h.jpg" }
    ]
  },
  listening_p4: {
    audio_url: "/audio/week33/listening_p4_full.mp3",
    instructions: "Listen and tick the box. There is one example.",
    questions: [
      {
        id: "p4_example",
        isExample: true,
        question_en: "Where was Jake walking after class?",
        audio_url: "/audio/week33/listening_p4_q1.mp3",
        options: [
          { letter: "A", text: "In the school corridor", image_url: "/images/week33/webtoon_scene_1.png" },
          { letter: "B", text: "Across the playground", image_url: "/images/week33/card_g.jpg" },
          { letter: "C", text: "Inside the library", image_url: "/images/week33/card_c.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q1",
        question_en: "Why was the floor slippery near the science room?",
        audio_url: "/audio/week33/listening_p4_q1.mp3",
        options: [
          { letter: "A", text: "The cleaner just washed the tiles", image_url: "/images/week33/card_b.jpg" },
          { letter: "B", text: "Someone spilled apple juice", image_url: "/images/week33/card_d.jpg" },
          { letter: "C", text: "It was raining outside", image_url: "/images/week33/card_f.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q2",
        question_en: "What happened when the boy ran fast?",
        audio_url: "/audio/week33/listening_p4_q2.mp3",
        options: [
          { letter: "A", text: "He slipped and hurt his knee", image_url: "/images/week33/webtoon_scene_2.png" },
          { letter: "B", text: "He dropped his lunch box", image_url: "/images/week33/card_a.jpg" },
          { letter: "C", text: "He forgot his backpack", image_url: "/images/week33/card_g.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q3",
        question_en: "What did Jake do immediately?",
        audio_url: "/audio/week33/listening_p4_q3.mp3",
        options: [
          { letter: "A", text: "He ran to call the school nurse", image_url: "/images/week33/webtoon_scene_3.png" },
          { letter: "B", text: "He laughed at his friend", image_url: "/images/week33/card_c.jpg" },
          { letter: "C", text: "He ran outside to play", image_url: "/images/week33/card_e.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q4",
        question_en: "What did the nurse use to treat the knee?",
        audio_url: "/audio/week33/listening_p4_q4.mp3",
        options: [
          { letter: "A", text: "A clean bandage and cold pack", image_url: "/images/week33/card_e.jpg" },
          { letter: "B", text: "A warm cup of hot tea", image_url: "/images/week33/card_d.jpg" },
          { letter: "C", text: "A pair of lab goggles", image_url: "/images/week33/card_f.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q5",
        question_en: "What did the headmaster say during assembly?",
        audio_url: "/audio/week33/listening_p4_q5.mp3",
        options: [
          { letter: "A", text: "He praised Jake for safety habits", image_url: "/images/week33/webtoon_scene_1.png" },
          { letter: "B", text: "He canceled science class", image_url: "/images/week33/card_c.jpg" },
          { letter: "C", text: "He closed the corridor", image_url: "/images/week33/card_b.jpg" }
        ],
        answer: "A"
      }
    ]
  },
  listening_p5: {
    image_url: "/images/week33/webtoon_scene_1.png",
    instructions: [
      { id: "inst_0", item: "Example Object", text: "Color the example brown", x: 10, y: 10, color: "brown", isExample: true },
      { id: "inst_1", item: "Jake's Backpack", text: "Color Jake's backpack blue", x: 25, y: 70, color: "blue" },
      { id: "inst_2", item: "Warning Sign", text: "Write the word 'WET' on the sign", x: 45, y: 80, word: "WET" },
      { id: "inst_3", item: "Science Lab Door", text: "Color the door frame bright green", x: 75, y: 35, color: "green" },
      { id: "inst_4", item: "Handrail", text: "Color the stairs handrail yellow", x: 85, y: 60, color: "yellow" },
      { id: "inst_5", item: "First-Aid Box", text: "Color the first-aid cross red", x: 90, y: 20, color: "red" },
      { id: "inst_6", item: "Notice Board", text: "Write the word 'CARE' on the board", x: 15, y: 30, word: "CARE" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
