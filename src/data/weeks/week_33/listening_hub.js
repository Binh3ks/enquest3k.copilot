// Pure Generated Listening Hub for Week 33 (Cambridge Exam Listening Parts 1-5 Only)
export const listeningHub = {
  listening_p1: {
    image_url: "/images/week33/w33_listening_p1_scene.jpg",
    audio_url: "/audio/week33/listening_p1_full.mp3",
    passage_audio_script: `Teacher: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Mia: Look at all the students in the school corridor!
Teacher: Yes, can you see the boy walking carefully on the left? He is wearing a blue shirt.
Mia: Oh, with the blue school backpack? Is that Jake?
Teacher: Yes, that is Jake. He is walking very carefully.
Teacher: Can you see the example line? Now you listen and draw lines.
Mia: Look at the boy in the middle of the hallway! What happened to him?
Teacher: That is Tom. He was in a hurry and slipped on the wet tiles.
Mia: Who is the woman in the white uniform rushing near the wall?
Teacher: That is Nurse Sarah. She is carrying a first-aid kit to help him.
Mia: And who is the tall man in the dark blue suit near the lockers?
Teacher: That is Headmaster Brown. He is watching over the corridor.
Mia: Is that Maria standing near the yellow warning sign?
Teacher: Yes, that is Maria. She is holding the mop to dry the wet floor.
Mia: Who is the boy bending down near the bench on the right?
Teacher: That is David. He is picking up his water bottle from the floor.`,
    dialogue_script: [
      { speaker: 'woman', text: 'Look at Part 1. Now look at the picture. Listen and look. There is one example.' },
      { speaker: 'girl',  text: 'Look at all the students in the school corridor!' },
      { speaker: 'woman', text: 'Yes, can you see the boy walking carefully on the left? He is wearing a blue shirt.' },
      { speaker: 'girl',  text: 'Oh, with the blue school backpack? Is that Jake?' },
      { speaker: 'woman', text: 'Yes, that is Jake. He is walking very carefully.' },
      { speaker: 'woman', text: 'Can you see the example line? Now you listen and draw lines.' },
      { speaker: 'girl',  text: 'Look at the boy in the middle of the hallway! What happened to him?' },
      { speaker: 'woman', text: 'That is Tom. He was in a hurry and slipped on the wet tiles.' },
      { speaker: 'girl',  text: 'Who is the woman in the white uniform rushing near the wall?' },
      { speaker: 'woman', text: 'That is Nurse Sarah. She is carrying a first-aid kit to help him.' },
      { speaker: 'girl',  text: 'And who is the tall man in the dark blue suit near the lockers?' },
      { speaker: 'woman', text: 'That is Headmaster Brown. He is watching over the corridor.' },
      { speaker: 'girl',  text: 'Is that Maria standing near the yellow warning sign?' },
      { speaker: 'woman', text: 'Yes, that is Maria. She is holding the mop to dry the wet floor.' },
      { speaker: 'girl',  text: 'Who is the boy bending down near the bench on the right?' },
      { speaker: 'woman', text: 'That is David. He is picking up his water bottle from the floor.' }
    ],
    names: [
      { id: "n1", text: "Jake", target_id: "t1", isExample: true },
      { id: "n2", text: "Tom", target_id: "t2" },
      { id: "n3", text: "Nurse Sarah", target_id: "t3" },
      { id: "n4", text: "Headmaster Brown", target_id: "t4" },
      { id: "n5", text: "Maria", target_id: "t5" },
      { id: "n6", text: "David", target_id: "t6" }
    ],
    targets: [
      { id: "t1", label: "Jake (Boy in blue shirt on left)", x: 18, y: 82, isExample: true },
      { id: "t2", label: "Tom (Student slipping in red shirt)", x: 50, y: 70 },
      { id: "t3", label: "Nurse Sarah (Woman in white uniform rushing)", x: 61, y: 52 },
      { id: "t4", label: "Headmaster Brown (Man in blue suit near lockers)", x: 32, y: 52 },
      { id: "t5", label: "Maria (Girl with mop near yellow sign)", x: 71, y: 70 },
      { id: "t6", label: "David (Boy picking up water bottle near bench)", x: 84, y: 85 }
    ]
  },
  listening_p2: {
    title: "Jake's School Day",
    audio_url: "/audio/week33/listening_p2_full.mp3",
    required_speakers: ['man', 'woman'],
    dialogue_script: [
      // Intro frame (female examiner/narrator opens)
      { speaker: 'woman', text: 'Listen and write. There is one example. Hello Jake. May I ask you a few questions about your school day?' },
      { speaker: 'man',   text: 'Yes, of course! I am happy to help.' },
      { speaker: 'woman', text: 'Which classroom are you in this year?' },
      { speaker: 'man',   text: 'I am in Room 4B on the second floor.' },
      { speaker: 'woman', text: 'Can you see the answer? Now you listen and write.' },
      // Field 1 — Favorite subject → answer: Science
      { speaker: 'woman', text: 'First, what is your favourite subject at school?' },
      { speaker: 'man',   text: 'I really love doing experiments with forces, so my favourite subject is Science.' },
      // Field 2 — Incident location → answer: school corridor
      { speaker: 'woman', text: 'That sounds exciting! And where did the accident happen this morning?' },
      { speaker: 'man',   text: 'It happened while students were walking through the school corridor near the science room.' },
      // Field 3 — Nurse arrival time → answer: 2 minutes
      { speaker: 'woman', text: 'How quickly did the school nurse arrive to help?' },
      { speaker: 'man',   text: 'She came running very quickly, in about 2 minutes.' },
      // Field 4 — First aid item → answer: clean bandage
      { speaker: 'woman', text: 'What did the nurse use to treat the injured knee?' },
      { speaker: 'man',   text: 'She cleaned the cut carefully and wrapped a clean bandage around his leg.' },
      // Field 5 — Headmaster award → answer: safety badge
      { speaker: 'woman', text: 'Did Headmaster Brown say anything during the school assembly?' },
      { speaker: 'man',   text: 'Yes, he praised everyone for helping and gave me a shining safety badge!' }
    ],
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
    cambridge_alignment: "EXACT",
    audio_url: "/audio/week33/listening_p3_full.mp3",
    passage_audio_script: `Listen and write a letter in each box. There is one example.
Jake, where did you leave your blue school backpack before morning class?
I was sitting on the wooden playground bench outside before the bell rang, and I left it right there.
Can you see the letter H? That is the example. Now you listen and write a letter in each box.

Where did Nurse Sarah get the clean bandage to help Tom?
She went into the nurse room and took it straight out of the white glass cabinet on the wall.

And what about the cold pack? Was that inside the cabinet too?
No, the nurse had already placed the blue cold pack on the first-aid table near the door.

Did you find your green science notebook after class?
Yes, I remembered we were doing experiments, and I left it sitting on the science lab desk.

Tom was looking for his blue water bottle. Did he drop it in the hallway?
No, we were eating lunch together and he forgot his bottle on the dining table.

Why was Tom running so fast down the corridor before class?
He woke up late! His alarm clock was ringing loudly on his bedroom table, but he did not hear it in time.`,
    example: {
      name: "School Backpack",
      target_letter: "H",
      audio_url: "/audio/week33/listening_p3_example.mp3",
      dialogue_script: [
        { speaker: 'woman', text: 'Listen and write a letter in each box. There is one example. Jake, where did you leave your blue school backpack before morning class?' },
        { speaker: 'man',   text: 'I was sitting on the wooden playground bench outside before the bell rang, and I left it right there.' },
        { speaker: 'woman', text: 'Can you see the letter H? That is the example. Now you listen and write a letter in each box.' }
      ]
    },
    items: [
      {
        id: 1, name: "Clean Bandage", target_letter: "A",
        audio_text: "Where did Nurse Sarah get the clean bandage to help Tom? She went into the nurse room and took it straight out of the white glass cabinet on the wall.",
        audio_url: "/audio/week33/listening_p3_item1.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Where did Nurse Sarah get the clean bandage to help Tom?' },
          { speaker: 'man',   text: 'She went into the nurse room and took it straight out of the white glass cabinet on the wall.' }
        ]
      },
      {
        id: 2, name: "Cold Pack", target_letter: "B",
        audio_text: "And what about the cold pack? Was that inside the cabinet too? No, the nurse had already placed the blue cold pack on the first-aid table near the door.",
        audio_url: "/audio/week33/listening_p3_item2.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'And what about the cold pack? Was that inside the cabinet too?' },
          { speaker: 'man',   text: 'No, the nurse had already placed the blue cold pack on the first-aid table near the door.' }
        ]
      },
      {
        id: 3, name: "Science Notebook", target_letter: "C",
        audio_text: "Did you find your green science notebook after class? Yes, I remembered we were doing experiments, and I left it sitting on the science lab desk.",
        audio_url: "/audio/week33/listening_p3_item3.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Did you find your green science notebook after class?' },
          { speaker: 'man',   text: 'Yes, I remembered we were doing experiments, and I left it sitting on the science lab desk.' }
        ]
      },
      {
        id: 4, name: "Water Bottle", target_letter: "D",
        audio_text: "Tom was looking for his blue water bottle. Did he drop it in the hallway? No, we were eating lunch together and he forgot his bottle on the dining table.",
        audio_url: "/audio/week33/listening_p3_item4.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Tom was looking for his blue water bottle. Did he drop it in the hallway?' },
          { speaker: 'man',   text: 'No, we were eating lunch together and he forgot his bottle on the dining table.' }
        ]
      },
      {
        id: 5, name: "Alarm Clock", target_letter: "E",
        audio_text: "Why was Tom running so fast down the corridor before class? He woke up late! His alarm clock was ringing loudly on his bedroom table, but he did not hear it in time.",
        audio_url: "/audio/week33/listening_p3_item5.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Why was Tom running so fast down the corridor before class?' },
          { speaker: 'man',   text: 'He woke up late! His alarm clock was ringing loudly on his bedroom table, but he did not hear it in time.' }
        ]
      }
    ],
    cards: [
      { letter: "A", name: "Nurse's Cabinet", location_name: "Nurse's Cabinet", image_url: "/images/week33/card_a.jpg" },
      { letter: "B", name: "First-Aid Table", location_name: "First-Aid Table", image_url: "/images/week33/card_b.jpg" },
      { letter: "C", name: "Science Lab Desk", location_name: "Science Lab Desk", image_url: "/images/week33/card_c.jpg" },
      { letter: "D", name: "Dining Table", location_name: "Dining Table", image_url: "/images/week33/card_d.jpg" },
      { letter: "E", name: "Bedroom Table", location_name: "Bedroom Table", image_url: "/images/week33/card_e.jpg" },
      { letter: "F", name: "School Corridor", location_name: "School Corridor", image_url: "/images/week33/card_f.jpg" },
      { letter: "G", name: "Headmaster's Office", location_name: "Headmaster's Office", image_url: "/images/week33/card_g.jpg" },
      { letter: "H", name: "Playground Bench", location_name: "Playground Bench", image_url: "/images/week33/card_h.jpg" }
    ]
  },
  // Cambridge alignment: EXACT after P0 fixes (dialogue_script, 2-voice, mixed answers, example)
  listening_p4: {
    cambridge_alignment: "ALIGNED", // upgrades to EXACT after audio regeneration with dialogue_script
    audio_url: "/audio/week33/listening_p4_full.mp3",
    instructions: "Listen and tick the box. There is one example.",
    // P0-1 FIX: Answer distribution corrected — Q1=B, Q2=A, Q3=C, Q4=B, Q5=A (spans A/B/C)
    // P0-4 FIX: dialogue_script[] replaces audio_script string; no Man:/Woman: in text fields
    // P0-3/DEF-014 FIX: "Question N." prefix removed from question turns
    questions: [
      {
        id: "p4_example",
        isExample: true,
        question_en: "Where was Jake walking after class?",
        audio_url: "/audio/week33/listening_p4_example.mp3",
        // RULE B: speaker metadata only; RULE I: no 'Question N.' in text
        dialogue_script: [
          { speaker: 'woman', text: 'Look at the example. Where was Jake walking after class?' },
          { speaker: 'man',   text: 'He was walking carefully in the school corridor.' },
          { speaker: 'woman', text: 'Can you see the tick next to picture A? Now you listen and tick the box.' }
        ],
        options: [
          { letter: "A", text: "In the school corridor",  image_url: "/images/week33/webtoon_scene_1.png" },
          { letter: "B", text: "Across the playground",   image_url: "/images/week33/card_g.jpg" },
          { letter: "C", text: "Inside the library",      image_url: "/images/week33/card_c.jpg" }
        ],
        answer: "A"
      },
      {
        // Q1 answer: B — options shuffled so correct answer is B
        id: "p4_q1",
        question_en: "Why was the floor slippery near the science room?",
        audio_url: "/audio/week33/listening_p4_q1.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Why was the floor slippery near the science room?' },
          { speaker: 'man',   text: 'The cleaner had just washed the tiles with water.' }
        ],
        options: [
          { letter: "A", text: "Someone spilled apple juice",       image_url: "/images/week33/card_d.jpg" },
          { letter: "B", text: "The cleaner just washed the tiles", image_url: "/images/week33/card_b.jpg" },
          { letter: "C", text: "It was raining outside",           image_url: "/images/week33/card_f.jpg" }
        ],
        answer: "B"
      },
      {
        // Q2 answer: A — options kept with correct at A
        id: "p4_q2",
        question_en: "What happened when the boy ran fast?",
        audio_url: "/audio/week33/listening_p4_q2.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'What happened when the boy ran fast?' },
          { speaker: 'man',   text: 'He slipped on the wet floor and hurt his knee.' }
        ],
        options: [
          { letter: "A", text: "He slipped and hurt his knee", image_url: "/images/week33/webtoon_scene_2.png" },
          { letter: "B", text: "He dropped his lunch box",     image_url: "/images/week33/card_a.jpg" },
          { letter: "C", text: "He forgot his backpack",       image_url: "/images/week33/card_g.jpg" }
        ],
        answer: "A"
      },
      {
        // Q3 answer: C — options shuffled so correct answer is C
        id: "p4_q3",
        question_en: "What did Jake do immediately?",
        audio_url: "/audio/week33/listening_p4_q3.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'What did Jake do immediately?' },
          { speaker: 'man',   text: "He ran to the nurse's room to call for help." }
        ],
        options: [
          { letter: "A", text: "He laughed at his friend",        image_url: "/images/week33/card_c.jpg" },
          { letter: "B", text: "He ran outside to play",          image_url: "/images/week33/card_e.jpg" },
          { letter: "C", text: "He ran to call the school nurse", image_url: "/images/week33/webtoon_scene_3.png" }
        ],
        answer: "C"
      },
      {
        // Q4 answer: B — options shuffled so correct answer is B
        id: "p4_q4",
        question_en: "What did the nurse use to treat the knee?",
        audio_url: "/audio/week33/listening_p4_q4.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'What did the nurse use to treat the knee?' },
          { speaker: 'man',   text: 'She used a clean bandage and a cold pack.' }
        ],
        options: [
          { letter: "A", text: "A warm cup of hot tea",        image_url: "/images/week33/card_d.jpg" },
          { letter: "B", text: "A clean bandage and cold pack", image_url: "/images/week33/card_e.jpg" },
          { letter: "C", text: "A pair of lab goggles",        image_url: "/images/week33/card_f.jpg" }
        ],
        answer: "B"
      },
      {
        // Q5 answer: A — options kept with correct at A
        id: "p4_q5",
        question_en: "What did the headmaster say during assembly?",
        audio_url: "/audio/week33/listening_p4_q5.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'What did the headmaster say during assembly?' },
          { speaker: 'man',   text: 'He praised Jake for following safety habits.' }
        ],
        options: [
          { letter: "A", text: "He praised Jake for safety habits", image_url: "/images/week33/webtoon_scene_1.png" },
          { letter: "B", text: "He canceled science class",         image_url: "/images/week33/card_c.jpg" },
          { letter: "C", text: "He closed the corridor",            image_url: "/images/week33/card_b.jpg" }
        ],
        answer: "A"
      }
    ]
  },
  listening_p5: {
    audio_url: "/audio/week33/listening_p5_full.mp3",
    image_url: "/images/week33/webtoon_scene_1.png",
    audio_script: `Nova: Listen and colour and write. There is one example.
Woman: Look at this picture of the school corridor. Can you see Jake's friends sitting on the bench?
Man: Yes, I can see them.
Woman: Good. Colour the notebook yellow.
Nova: Can you see the yellow notebook? That is the example. Now you listen and colour and write.
Woman: Now look at Jake. He is carrying a backpack.
Man: Shall I colour his backpack blue?
Woman: Yes. Colour Jake's backpack blue.
Woman: Look at the warning sign near the wet tiles. Can you write a word on it?
Man: Sure. What word should I write?
Woman: Write the word wet on the sign.
Woman: Can you find the science lab doorframe?
Man: Yes, it is next to the lockers.
Woman: Colour the doorframe bright green.
Woman: Look at the notice board on the wall. Can you write one more word?
Man: Yes, what should I write?
Woman: Write the word care on the board.
Woman: Now look at the nurse's room door at the end of the corridor.
Man: Should I colour it red?
Woman: Yes, colour the nurse's room door red.`,
    instructions: [
      { id: "inst_0", item: "Student's Notebook", text: "Color the notebook yellow", x: 10, y: 10, color: "yellow", isExample: true },
      { id: "inst_1", item: "Jake's Backpack", text: "Color Jake's backpack blue", x: 25, y: 70, color: "blue", action: "colour" },
      { id: "inst_2", item: "Warning Sign", text: "Write the word 'WET' on the sign", x: 45, y: 80, word: "WET", action: "write" },
      { id: "inst_3", item: "Science Lab Door", text: "Color the door frame bright green", x: 75, y: 35, color: "green", action: "colour" },
      { id: "inst_4", item: "Notice Board", text: "Write the word 'CARE' on the board", x: 15, y: 30, word: "CARE", action: "write" },
      { id: "inst_5", item: "Nurse's Room Door", text: "Color the nurse's room door red", x: 85, y: 45, color: "red", action: "colour" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
