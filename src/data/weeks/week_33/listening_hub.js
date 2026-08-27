// Pure Generated Listening Hub for Week 33 (Cambridge Exam Listening Parts 1-5 Only)
export const listeningHub = {
  listening_p1: {
    image_url: "/images/week33/w33_listening_p1_scene.jpg",
    audio_url: "/audio/week33/listening_p1_full.mp3",
    passage_audio_script: `Teacher: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Mia: Look at that boy in the corridor! Is he running?
Teacher: No, that's Tom slipping on the wet floor. Look at the boy walking carefully in the blue shirt.
Mia: Oh, I see him now. Is that Jake?
Teacher: Yes, that's right. Jake is walking carefully.
Teacher: Can you see the example line? Now you listen and draw lines.
Mia: Who is the woman with the first-aid kit rushing near the wall?
Teacher: That is Nurse Sarah. She is bringing bandages to help.
Mia: Look at the tall man in the blue suit near the lockers.
Teacher: That is Headmaster Brown. He is watching the corridor.
Mia: Is that Cleaner Bob holding the yellow warning sign and mop?
Teacher: Yes, that is Cleaner Bob. He is drying the tiles.
Mia: Who is the boy sitting on the bench on the right?
Teacher: That is David. He is waiting for class to start.`,
    dialogue_script: [
      { speaker: 'woman', text: 'Look at Part 1. Now look at the picture. Listen and look. There is one example.' },
      { speaker: 'girl',  text: 'Look at that boy in the corridor! Is he running?' },
      { speaker: 'woman', text: "No, that's Tom slipping on the wet floor. Look at the boy walking carefully in the blue shirt." },
      { speaker: 'girl',  text: 'Oh, I see him now. Is that Jake?' },
      { speaker: 'woman', text: "Yes, that's right. Jake is walking carefully." },
      { speaker: 'woman', text: 'Can you see the example line? Now you listen and draw lines.' },
      { speaker: 'girl',  text: 'Who is the woman with the first-aid kit rushing near the wall?' },
      { speaker: 'woman', text: 'That is Nurse Sarah. She is bringing bandages to help.' },
      { speaker: 'girl',  text: 'Look at the tall man in the blue suit near the lockers.' },
      { speaker: 'woman', text: 'That is Headmaster Brown. He is watching the corridor.' },
      { speaker: 'girl',  text: 'Is that Cleaner Bob holding the yellow warning sign and mop?' },
      { speaker: 'woman', text: 'Yes, that is Cleaner Bob. He is drying the tiles.' },
      { speaker: 'girl',  text: 'Who is the boy sitting on the bench on the right?' },
      { speaker: 'woman', text: 'That is David. He is waiting for class to start.' }
    ],
    names: [
      { id: "n1", text: "Jake", target_id: "t1", isExample: true },
      { id: "n2", text: "Tom", target_id: "t2" },
      { id: "n3", text: "Nurse Sarah", target_id: "t3" },
      { id: "n4", text: "Headmaster Brown", target_id: "t4" },
      { id: "n5", text: "Cleaner Bob", target_id: "t5" },
      { id: "n6", text: "David", target_id: "t6" },
      { id: "n7", text: "Mia the Monitor", target_id: null }
    ],
    targets: [
      { id: "t1", label: "Jake (Boy holding backpack on left)", x: 18, y: 82, isExample: true },
      { id: "t2", label: "Tom (Student slipping in red shirt)", x: 50, y: 70 },
      { id: "t3", label: "Nurse Sarah (Woman rushing in white uniform)", x: 61, y: 52 },
      { id: "t4", label: "Headmaster Brown (Man in blue suit near lockers)", x: 32, y: 52 },
      { id: "t5", label: "Cleaner Bob (Person with mop near yellow sign)", x: 71, y: 70 },
      { id: "t6", label: "David (Boy sitting on bench on right)", x: 84, y: 85 }
    ]
  },
  listening_p2: {
    title: "Jake's School Day",
    audio_url: "/audio/week33/listening_p2_full.mp3",
    // ──────────────────────────────────────────────────────────────────────
    // dialogue_script: ONE SOURCE OF TRUTH for L2 audio generation.
    // RULE: speaker field is metadata → controls TTS voice selection only.
    //       text field is the spoken content → sent verbatim to TTS.
    //       "Man:" / "Woman:" must NEVER appear in any text field.
    //       Cambridge A2 Flyers Part 2 requires 2 acoustically distinct voices.
    //       man  → en-US-Neural2-D (male)
    //       woman → en-US-Journey-F (female)
    // ──────────────────────────────────────────────────────────────────────
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
    example: {
      name: "School Backpack",
      target_letter: "H",
      audio_url: "/audio/week33/listening_p3_example.mp3",
      dialogue_script: [
        { speaker: 'woman', text: 'Listen and write a letter in each box. There is one example. Jake, where did you leave your blue school backpack before morning class?' },
        { speaker: 'man',   text: 'I left my backpack on the playground bench outside. Can you see the letter H? That is the example. Now you listen and write a letter in each box.' }
      ]
    },
    items: [
      {
        id: 1, name: "Clean Bandage", target_letter: "A",
        audio_text: "Where did Nurse Sarah find the clean bandage? She opened the glass nurse cabinet right away.",
        audio_url: "/audio/week33/listening_p3_item1.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Where did Nurse Sarah find the clean bandage to help Tom?' },
          { speaker: 'man',   text: 'She went to the nurse office and opened the glass cabinet. She took out a clean bandage. Clean bandage.' }
        ]
      },
      {
        id: 2, name: "Cold Pack", target_letter: "B",
        audio_text: "Where was the blue cold pack? It was on the first-aid table in the nurse room.",
        audio_url: "/audio/week33/listening_p3_item2.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'And where did she find the cold pack?' },
          { speaker: 'man',   text: 'The blue cold pack was lying on the first-aid table right next to her. Cold pack.' }
        ]
      },
      {
        id: 3, name: "Science Notebook", target_letter: "C",
        audio_text: "Where did Jake leave his science notebook? He left it on the science lab desk.",
        audio_url: "/audio/week33/listening_p3_item3.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Jake, where is your green science notebook?' },
          { speaker: 'man',   text: 'I put it on the lab desk during our science lesson this morning. Science notebook.' }
        ]
      },
      {
        id: 4, name: "Water Bottle", target_letter: "D",
        audio_text: "Where was Tom's water bottle? He left it on the cafeteria table at lunchtime.",
        audio_url: "/audio/week33/listening_p3_item4.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Did Tom leave his water bottle in the corridor?' },
          { speaker: 'man',   text: 'No, Tom left his bottle on the table in the school cafeteria after lunch. Water bottle.' }
        ]
      },
      {
        id: 5, name: "Alarm Clock", target_letter: "E",
        audio_text: "Why did Jake arrive so early? His alarm clock was ringing on his bedroom table.",
        audio_url: "/audio/week33/listening_p3_item5.mp3",
        dialogue_script: [
          { speaker: 'woman', text: 'Why did you arrive so early at school this morning?' },
          { speaker: 'man',   text: 'My alarm clock was ringing very loudly on my bedroom table at seven in the morning. An alarm clock.' }
        ]
      }
    ],
    cards: [
      { letter: "A", name: "Nurse's Cabinet", location_name: "Nurse Office", image_url: "/images/week33/card_a.jpg" },
      { letter: "B", name: "First-Aid Table", location_name: "First Aid Area", image_url: "/images/week33/card_b.jpg" },
      { letter: "C", name: "Science Lab Desk", location_name: "Science Room", image_url: "/images/week33/card_c.jpg" },
      { letter: "D", name: "School Cafeteria", location_name: "Dining Hall", image_url: "/images/week33/card_d.jpg" },
      { letter: "E", name: "Bedroom Table", location_name: "Jake's Home", image_url: "/images/week33/card_e.jpg" },
      { letter: "F", name: "School Corridor", location_name: "Corridor Floor", image_url: "/images/week33/card_f.jpg" },
      { letter: "G", name: "Headmaster's Office", location_name: "Office", image_url: "/images/week33/card_g.jpg" },
      { letter: "H", name: "Playground Bench", location_name: "School Yard", image_url: "/images/week33/card_h.jpg" }
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
Woman: Now look at the long handrail near the stairs.
Man: Should I colour it red?
Woman: Yes. Colour the handrail red.`,
    instructions: [
      { id: "inst_0", item: "Example Object", text: "Color the example brown", x: 10, y: 10, color: "brown", isExample: true },
      { id: "inst_1", item: "Jake's Backpack", text: "Color Jake's backpack blue", x: 25, y: 70, color: "blue", action: "colour" },
      { id: "inst_2", item: "Warning Sign", text: "Write the word 'WET' on the sign", x: 45, y: 80, word: "WET", action: "write" },
      { id: "inst_3", item: "Science Lab Door", text: "Color the door frame bright green", x: 75, y: 35, color: "green", action: "colour" },
      { id: "inst_4", item: "Notice Board", text: "Write the word 'CARE' on the board", x: 15, y: 30, word: "CARE", action: "write" },
      { id: "inst_5", item: "School Handrail", text: "Color the handrail red", x: 85, y: 60, color: "red", action: "colour" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
