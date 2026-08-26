// Pure Generated Listening Hub for Week 33 (Cambridge Exam Listening Parts 1-5 Only)
export const listeningHub = {
  listening_p1: {
    image_url: "/images/week33/w33_listening_p1_scene.jpg",
    passage_audio_script: `Teacher: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Mia: Look at that boy in the corridor! Is he running?
Teacher: No, that's Tom slipping on the wet floor. Look at the boy walking carefully in the blue shirt.
Mia: Oh, I see him now. Is that Jake?
Teacher: Yes, that's right. Jake is walking carefully.
Teacher: Can you see the example line? Now you listen and draw lines.
Mia: Who is the woman with the first-aid kit rushing near the wall?
Teacher: That is Nurse Sarah. She is bringing bandages to help.
Mia: Look at the man wearing glasses near the notice board.
Teacher: That is Headmaster Brown. He is watching the corridor.
Mia: Is that Cleaner Bob holding the yellow warning sign and mop?
Teacher: Yes, that is Cleaner Bob. He is drying the tiles.
Mia: Who is the teacher walking near the science lab?
Teacher: That is Teacher David. He is guiding students into the classroom.`,
    names: [
      { id: "n1", text: "Jake", target_id: "t1", isExample: true },
      { id: "n2", text: "Tom", target_id: "t2" },
      { id: "n3", text: "Nurse Sarah", target_id: "t3" },
      { id: "n4", text: "Headmaster Brown", target_id: "t4" },
      { id: "n5", text: "Cleaner Bob", target_id: "t5" },
      { id: "n6", text: "Teacher David", target_id: "t6" },
      { id: "n7", text: "Mia the Monitor", target_id: null }
    ],
    targets: [
      { id: "t1", label: "Jake (Boy holding backpack on left)", x: 18, y: 82, isExample: true },
      { id: "t2", label: "Tom (Student slipping in red shirt)", x: 50, y: 70 },
      { id: "t3", label: "Nurse Sarah (Woman rushing in white uniform)", x: 61, y: 52 },
      { id: "t4", label: "Headmaster Brown (Man in blue suit near lockers)", x: 32, y: 52 },
      { id: "t5", label: "Cleaner Bob (Person with mop near yellow sign)", x: 71, y: 70 },
      { id: "t6", label: "Teacher David (Student bending near bench)", x: 84, y: 85 }
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
    example: { name: "Cleaning Mop", target_letter: "H" },
    items: [
      { id: 1, name: "School Stairs", target_letter: "A", audio_url: "/audio/week33/listening_p3_item1.mp3" },
      { id: 2, name: "Warning Sign", target_letter: "B", audio_url: "/audio/week33/listening_p3_item2.mp3" },
      { id: 3, name: "First-Aid Kit", target_letter: "C", audio_url: "/audio/week33/listening_p3_item3.mp3" },
      { id: 4, name: "Cold Pack", target_letter: "D", audio_url: "/audio/week33/listening_p3_item4.mp3" },
      { id: 5, name: "Clean Bandage", target_letter: "E", audio_url: "/audio/week33/listening_p3_item5.mp3" }
    ],
    cards: [
      { letter: "A", name: "School Stairs", image_url: "/images/week33/card_a.jpg" },
      { letter: "B", name: "Warning Sign", image_url: "/images/week33/card_b.jpg" },
      { letter: "C", name: "First-Aid Kit", image_url: "/images/week33/card_c.jpg" },
      { letter: "D", name: "Cold Pack", image_url: "/images/week33/card_d.jpg" },
      { letter: "E", name: "Clean Bandage", image_url: "/images/week33/card_e.jpg" },
      { letter: "F", name: "Science Goggles", image_url: "/images/week33/card_f.jpg" },
      { letter: "G", name: "School Backpack", image_url: "/images/week33/card_g.jpg" },
      { letter: "H", name: "Cleaning Mop", image_url: "/images/week33/card_h.jpg" }
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
        audio_script: `Woman: Look at the example. Where was Jake walking after class?\nMan: He was walking carefully in the school corridor.\nWoman: Can you see the tick? Now you listen and tick the box.`,
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
        audio_script: `Woman: Question 1. Why was the floor slippery near the science room?\nMan: The cleaner had just washed the tiles with water.`,
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
        audio_script: `Woman: Question 2. What happened when the boy ran fast?\nMan: He slipped on the wet floor and hurt his knee.`,
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
        audio_script: `Woman: Question 3. What did Jake do immediately?\nMan: He ran to the nurse's room to call for help.`,
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
        audio_script: `Woman: Question 4. What did the nurse use to treat the knee?\nMan: She used a clean bandage and a cold pack.`,
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
        audio_script: `Woman: Question 5. What did the headmaster say during assembly?\nMan: He praised Jake for following safety habits.`,
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
    audio_script: `Nova: Listen and colour and write. There is one example.
Woman: Look at this picture of the school corridor. Can you see Jake's friend sitting on the bench?
Man: Yes, I can see him.
Woman: Good. Colour his notebook yellow.
Nova: Can you see the yellow notebook? This is an example. Now you listen and colour and write.
Woman: Now look at Jake. He is carrying a backpack.
Man: Shall I colour his backpack blue?
Woman: Yes, colour Jake's backpack blue.
Woman: Look at the warning sign near the wet tiles. Can you write a word on it?
Man: Sure! What word should I write?
Woman: Write the word 'WET' on the sign.
Woman: Can you find the science lab door frame?
Man: Yes, it is next to the lockers.
Woman: Colour the door frame bright green.
Woman: Look at the notice board on the wall. Can you write one more word?
Man: Yes, what should I write?
Woman: Write the word 'CARE' on the board.
Woman: Now look at the nurse room door at the end of the corridor.
Man: Should I colour it red?
Woman: Yes, colour the nurse room door red.`,
    instructions: [
      { id: "inst_0", item: "Example Object", text: "Color the example brown", x: 10, y: 10, color: "brown", isExample: true },
      { id: "inst_1", item: "Jake's Backpack", text: "Color Jake's backpack blue", x: 25, y: 70, color: "blue", action: "colour" },
      { id: "inst_2", item: "Warning Sign", text: "Write the word 'WET' on the sign", x: 45, y: 80, word: "WET", action: "write" },
      { id: "inst_3", item: "Science Lab Door", text: "Color the door frame bright green", x: 75, y: 35, color: "green", action: "colour" },
      { id: "inst_4", item: "Notice Board", text: "Write the word 'CARE' on the board", x: 15, y: 30, word: "CARE", action: "write" },
      {id: "inst_5", item: "Nurse Room Door", text: "Color the nurse room door red", x: 85, y: 60, color: "red", action: "colour" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
