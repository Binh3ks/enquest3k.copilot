/**
 * Week 33 Gold Standard Data — Listening Hub
 * Theme: "Corridor Safety & School Care"
 * Cambridge A2 Flyers Full Exam Standard Audio & Scripts (W33 - W72)
 */

import dictation from './dictation.js';
import shadowing from './shadowing.js';

export const listeningHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  dictation,
  shadowing,

  // Cambridge Listening Part 2 (Secret Notes / Notepad Note Completer)
  listening_p2_notes: [
    { id: 1, label: "Incident Location", hint: "Where did it happen?", target: "school corridor", audio_text: "The incident happened down the school corridor after science class." },
    { id: 2, label: "Cause of Fall", hint: "Why did he slip?", target: "wet floor", audio_text: "The classmate running fast slipped on the wet floor." },
    { id: 3, label: "Person Called", hint: "Who did Jake call?", target: "school nurse", audio_text: "Jake stopped immediately and called the school nurse." },
    { id: 4, label: "First Aid Applied", hint: "What did nurse apply?", target: "clean bandage", audio_text: "The nurse treated his cut knee gently with a clean bandage." },
    { id: 5, label: "School Rule", hint: "What rule to follow?", target: "never run", audio_text: "The headmaster reminded all students never to run in corridors." }
  ],

  // Cambridge Listening Part 1 (SVG Line Matcher — Scene Investigation)
  listening_p1: {
    image_url: '/images/week33/w33_listening_p1_scene.jpg',
    audio_url: '/audio/week33/listening_p1_full.mp3',
    passage_audio_script: "Nova: Look at Part 1. Now look at the picture. Listen and look. There is one example.\nGirl: Look at this photo of our school corridor after lunch! It was quite busy.\nMan: Oh yes, I can see many people. Who is that boy walking carefully down the hallway in the blue shirt?\nGirl: That's Jake. He always walks slowly and watches where he is going.\nMan: That is very sensible of him.\nNova: Can you see the line? This is an example. Now you listen and draw lines.\nGirl: Oh dear, look at the boy who is slipping on the wet floor!\nMan: Yes, his papers are flying everywhere! Is he wearing a red sweater?\nGirl: That's right, he is wearing a red shirt. His name is Tom. He fell down because he was running in a hurry.\nMan: Poor Tom! I hope he is okay.\nGirl: Look, someone is rushing quickly to help him. Can you see the lady carrying a clean bandage in the white uniform?\nMan: Ah, that's our school nurse! She always takes good care of everyone when accidents happen.\nGirl: Yes, she is very kind.\nMan: Who is that tall man standing near the blue lockers in the dark suit?\nGirl: Do you mean the man watching all the students to make sure the hallway is safe?\nMan: Yes, exactly.\nGirl: That's our headmaster! He always reminds us about corridor safety rules.\nMan: Now look near the yellow warning sign. Is that a girl holding a cleaning mop?\nGirl: Yes, that is Mia. She is wiping the water off the floor so nobody else slips.\nMan: What a helpful girl!\nGirl: Is Alex in this picture today?\nMan: No, Alex had a doctor appointment this morning, so he is not at school today.",
    names: [
      { id: 'n1', text: 'Jake', target_id: 't1', isExample: true },
      { id: 'n2', text: 'School Nurse', target_id: 't2' },
      { id: 'n3', text: 'Tom', target_id: 't3' },
      { id: 'n4', text: 'Headmaster', target_id: 't4' },
      { id: 'n5', text: 'Mia', target_id: 't5' },
      { id: 'n6', text: 'Alex', target_id: null }
    ],
    targets: [
      { id: 't1', label: 'Jake (Boy walking with backpack on left)', x: 20, y: 62, isExample: true },
      { id: 't2', label: 'School Nurse (White uniform with bandage)', x: 61, y: 52 },
      { id: 't3', label: 'Tom (Red shirt, slipping on wet floor)', x: 52, y: 62 },
      { id: 't4', label: 'Headmaster (Dark blue suit near lockers)', x: 33, y: 50 },
      { id: 't5', label: 'Mia (Girl holding cleaning mop)', x: 78, y: 60 }
    ]
  },

  // Cambridge Listening Part 3 (Visual Matching A-H — School Locations)
  listening_p3: {
    passage_audio_script: "Teacher: Hello Jake! I am writing our school safety report about yesterday. Can you tell me where all the items were found?\nJake: Of course, Mrs. Wilson! I remember everything clearly.\nTeacher: First, where was the clean bandage kept? Was it inside the headmaster's office?\nJake: No, not there! The school nurse keeps the clean bandage inside the white medical cabinet in the nurse room.\nTeacher: Excellent. And what about the cold pack for Tom's knee? Did someone leave it on the science lab desk?\nJake: No, the nurse placed the cold pack on the first aid table near the corridor entrance so it was ready to use.\nTeacher: Right. And where was Tom's science notebook? I know he was looking for it everywhere.\nJake: He thought he lost it on the playground bench. But his notebook was right on the science room desk.\nTeacher: Ah, that is a relief! Now, what about the glass of orange juice that someone brought for Tom?\nJake: Nobody took it outside! The fresh orange juice was placed on the cafeteria counter in the school canteen.\nTeacher: And what about Tom's alarm clock? Was that left in the corridor locker?\nJake: Haha, no! Tom told me his alarm clock was on his bedroom table at home. He woke up late that morning!",
    items: [
      { 
        id: 1, 
        name: 'Clean Bandage', 
        target_letter: 'A', 
        audio_url: '/audio/week33/listening_p3_item1.mp3', 
        audio_text: "Teacher: Where was the clean bandage kept? Was it inside the headmaster's office?\nJake: No, not there! The school nurse keeps the clean bandage inside the white medical cabinet in the nurse room." 
      },
      { 
        id: 2, 
        name: 'Cold Pack', 
        target_letter: 'B', 
        audio_url: '/audio/week33/listening_p3_item2.mp3', 
        audio_text: "Teacher: What about the cold pack for Tom's knee? Did someone leave it on the science lab desk?\nJake: No, the nurse placed the cold pack on the first aid table near the corridor entrance so it was ready to use." 
      },
      { 
        id: 3, 
        name: 'Science Notebook', 
        target_letter: 'C', 
        audio_url: '/audio/week33/listening_p3_item3.mp3', 
        audio_text: "Teacher: And where was Tom's science notebook? He was looking for it everywhere.\nJake: He thought he lost it on the playground bench. But his notebook was right on the science room desk." 
      },
      { 
        id: 4, 
        name: 'Orange Juice', 
        target_letter: 'D', 
        audio_url: '/audio/week33/listening_p3_item4.mp3', 
        audio_text: "Teacher: What about the glass of orange juice that someone brought for Tom?\nJake: Nobody took it outside! The fresh orange juice was placed on the cafeteria counter in the school canteen." 
      },
      { 
        id: 5, 
        name: 'Alarm Clock', 
        target_letter: 'E', 
        audio_url: '/audio/week33/listening_p3_item5.mp3', 
        audio_text: "Teacher: And what about Tom's alarm clock? Was that left in the corridor locker?\nJake: Haha, no! Tom told me his alarm clock was on his bedroom table at home. He woke up late that morning!" 
      }
    ],
    cards: [
      { letter: 'A', name: 'Medical Cabinet (Nurse Room)', location_name: 'Medical Cabinet', image_url: '/images/week33/nurse_cabinet.jpg' },
      { letter: 'B', name: 'First Aid Table', location_name: 'First Aid Table', image_url: '/images/week33/card_b_first_aid_table.jpg' },
      { letter: 'C', name: 'Science Lab Desk', location_name: 'Science Lab Desk', image_url: '/images/week33/lab_desk.jpg' },
      { letter: 'D', name: 'Cafeteria Counter', location_name: 'Cafeteria Counter', image_url: '/images/week33/cafeteria.jpg' },
      { letter: 'E', name: 'Bedroom Table (Home)', location_name: 'Bedroom Table', image_url: '/images/week33/bedroom_table.jpg' },
      { letter: 'F', name: 'Corridor Safety Locker', location_name: 'Corridor Locker', image_url: '/images/week33/corridor.jpg' },
      { letter: 'G', name: 'Headmaster Office Desk', location_name: 'Headmaster Office', image_url: '/images/week33/card_g_headmaster_office.jpg' },
      { letter: 'H', name: 'Playground Bench', location_name: 'Playground Bench', image_url: '/images/week33/card_h_playground_bench.jpg' }
    ]
  },

  // Cambridge Listening Part 4 (3-Picture Option Cards with Distractors)
  listening_p4_questions: [
    {
      id: 'lp4_1',
      content_id: 'lp4_1',
      type: 'listening_p4_picture',
      question: '1. Where did Tom slip and hurt his knee?',
      prompt: 'Where did Tom slip and hurt his knee?',
      audio_url: '/audio/week33/listening_p4_q1.mp3',
      audio_script: "Girl: Where did Tom slip and hurt his knee yesterday?\nBoy: Well, he walked past the science lab after class and was heading towards the outdoor playground.\nGirl: Did he fall on the playground?\nBoy: No, he was running in a hurry and slipped on the wet floor in the school corridor before reaching the exit!",
      options: [
        { label: 'A', text: 'Inside the science lab', image_url: '/images/week33/lab_desk.jpg', isCorrect: false },
        { label: 'B', text: 'In the school corridor', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: true },
        { label: 'C', text: 'On the outdoor playground', image_url: '/images/week33/card_h_playground_bench.jpg', isCorrect: false }
      ]
    },
    {
      id: 'lp4_2',
      content_id: 'lp4_2',
      type: 'listening_p4_picture',
      question: '2. What did Jake do immediately when Tom fell?',
      prompt: 'What did Jake do immediately when Tom fell?',
      audio_url: '/audio/week33/listening_p4_q2.mp3',
      audio_script: "Man: What did Jake do immediately when Tom slipped and fell down?\nWoman: Did he run back to find his teacher in class?\nMan: No, and he didn't just keep walking down the hallway either! Jake stopped right away and walked quickly to call the school nurse for help.\nWoman: That was very quick and responsible of him!",
      options: [
        { label: 'A', text: 'Ran to find his teacher in class', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
        { label: 'B', text: 'Kept walking down the hallway', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false },
        { label: 'C', text: 'Walked quickly to call the school nurse', image_url: '/images/week33/webtoon_scene_4.png', isCorrect: true }
      ]
    },
    {
      id: 'lp4_3',
      content_id: 'lp4_3',
      type: 'listening_p4_picture',
      question: '3. What did the school nurse apply to Tom’s knee?',
      prompt: 'What did the school nurse apply to Tom’s knee?',
      audio_url: '/audio/week33/listening_p4_q3.mp3',
      audio_script: "Woman: What did the school nurse apply to Tom's knee first?\nMan: Tom asked for a new science notebook, and someone offered him a glass of orange juice to drink.\nWoman: But what did the nurse do for his injury?\nMan: The nurse first applied a clean bandage and a cold pack directly to his hurt knee to stop the swelling.",
      options: [
        { label: 'A', text: 'Applied a clean bandage and cold pack', image_url: '/images/week33/card_clean_bandage.jpg', isCorrect: true },
        { label: 'B', text: 'Gave him a glass of orange juice', image_url: '/images/week33/card_orange_juice.jpg', isCorrect: false },
        { label: 'C', text: 'Gave him a new science notebook', image_url: '/images/week33/card_science_notebook.jpg', isCorrect: false }
      ]
    },
    {
      id: 'lp4_4',
      content_id: 'lp4_4',
      type: 'listening_p4_picture',
      question: '4. How did everyone feel after Tom was safely helped?',
      prompt: 'How did everyone feel after Tom was safely helped?',
      audio_url: '/audio/week33/listening_p4_q4.mp3',
      audio_script: "Girl: How did everyone feel after the nurse safely treated Tom?\nBoy: Tom was scared when he fell, and some students were quite upset.\nGirl: Were they still worried or angry?\nBoy: No, everyone felt greatly relieved and safe once they saw Tom was standing and smiling again.",
      options: [
        { label: 'A', text: 'Felt angry and upset', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
        { label: 'B', text: 'Felt relieved and safe', image_url: '/images/week33/webtoon_scene_5.png', isCorrect: true },
        { label: 'C', text: 'Felt scared and fell down', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: false }
      ]
    },
    {
      id: 'lp4_5',
      content_id: 'lp4_5',
      type: 'listening_p4_picture',
      question: '5. What did the headmaster do during Monday assembly?',
      prompt: 'What did the headmaster do during Monday assembly?',
      audio_url: '/audio/week33/listening_p4_q5.mp3',
      audio_script: "Man: What did the headmaster do during Monday morning assembly?\nWoman: Did he give all the students a difficult test or close down the corridor?\nMan: No, he gave a wonderful speech and praised Jake publicly on stage for his responsible corridor safety action!\nWoman: How fantastic for Jake!",
      options: [
        { label: 'A', text: 'Gave Jake a difficult homework test', image_url: '/images/week33/card_g_headmaster_office.jpg', isCorrect: false },
        { label: 'B', text: 'Closed the school corridor forever', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: false },
        { label: 'C', text: 'Praised Jake publicly during assembly', image_url: '/images/week33/webtoon_scene_5.png', isCorrect: true }
      ]
    }
  ],

  // Nova's Color & Write Mission
  listening_p5: {
    audio_script: "Nova: Look at the picture of our school corridor again. Can you see the boy sitting on the floor after his accident?\nJake: Yes! That's Tom. I can see the white bandage on his hurt knee.\nNova: That's right. Now, can you color the bandage on his knee blue?\nJake: A blue bandage on his knee? Sure, I am coloring it blue right now.\nNova: Excellent. Now look at the first aid table near the corridor entrance. Can you see the cold pack sitting on top?\nJake: Yes, I found it.\nNova: Please color the cold pack green.\nJake: Okay, coloring the cold pack green... done!\nNova: Now look down at the floor near the wet tiles. Can you see the tall warning sign?\nJake: Yes, the triangular warning sign!\nNova: Color the warning sign bright yellow.\nJake: Bright yellow for the wet floor sign. It looks very clear now.\nNova: Finally, look at the white label at the bottom of the yellow warning sign. Can you write a word there?\nJake: What word should I write?\nNova: Please write the word SAFE in capital letters.\nJake: S-A-F-E... SAFE! All finished!",
    instructions: [
      { id: 't1', type: 'color', target_id: 'bandage', target_color: '#3b82f6', color_name: 'Blue', audio_url: '/audio/week33/listening_p5_inst1.mp3', prompt: '1. Color the clean bandage on the boy’s knee BLUE.' },
      { id: 't2', type: 'color', target_id: 'coldpack', target_color: '#22c55e', color_name: 'Green', audio_url: '/audio/week33/listening_p5_inst2.mp3', prompt: '2. Color the cold pack GREEN.' },
      { id: 't3', type: 'color', target_id: 'warning_sign', target_color: '#eab308', color_name: 'Yellow', audio_url: '/audio/week33/listening_p5_inst3.mp3', prompt: '3. Color the wet floor warning sign YELLOW.' },
      { id: 't4', type: 'write', label_id: 'sign_label', target_text: 'SAFE', audio_url: '/audio/week33/listening_p5_inst5.mp3', prompt: '4. Write the word SAFE on the warning sign label.' }
    ]
  },

  // Arena Games: Sentence Builder Grammar Drills (Data-Driven — feeds SentenceBuilderBattle.jsx via customDrills prop)
  grammar_drills: [
    {
      id: "st2_w33_g01",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a past continuous sentence with 'While'.",
      word_blocks: ["While", "Jake", "was", "walking", "down", "the", "corridor", ",", "a", "boy", "slipped", "."],
      distractor_blocks: ["is", "slips", "run"]
    },
    {
      id: "st2_w33_g02",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a sentence describing first aid treatment.",
      word_blocks: ["While", "the", "nurse", "was", "treating", "his", "knee", ",", "Tom", "felt", "relieved", "."],
      distractor_blocks: ["feels", "treats", "so"]
    },
    {
      id: "st2_w33_g03",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a sentence showing cause of slipping.",
      word_blocks: ["A", "boy", "slipped", "while", "he", "was", "running", "fast", "on", "the", "wet", "floor", "."],
      distractor_blocks: ["runs", "is", "slowly"]
    },
    {
      id: "st2_w33_g04",
      grammar_tag: "past_simple_irregular",
      text_en: "Build an emergency action sentence.",
      word_blocks: ["Jake", "called", "the", "school", "nurse", "immediately", "for", "medical", "help", "."],
      distractor_blocks: ["calls", "calling", "later"]
    },
    {
      id: "st2_w33_g05",
      grammar_tag: "past_simple_irregular",
      text_en: "Build a sentence about safety rules.",
      word_blocks: ["The", "headmaster", "reminded", "all", "students", "never", "to", "run", "in", "corridors", "."],
      distractor_blocks: ["reminds", "reminding", "always"]
    }
  ],

  // Arena Games: Flash Arena Speed Match (4 Sub-Tabs × 10 Pairs)
  flash_arena: {
    set1_nouns_adj: [
      { id: "na01", en: "corridor", vi: "hành lang" },
      { id: "na02", en: "bandage", vi: "băng cá nhân" },
      { id: "na03", en: "nurse", vi: "y tá" },
      { id: "na04", en: "knee", vi: "đầu gối" },
      { id: "na05", en: "headmaster", vi: "thầy hiệu trưởng" },
      { id: "na06", en: "careful", vi: "cẩn thận" },
      { id: "na07", en: "clumsy", vi: "vụng về" },
      { id: "na08", en: "relieved", vi: "nhẹ nhõm" },
      { id: "na09", en: "wet", vi: "ướt" },
      { id: "na10", en: "safe", vi: "an toàn" }
    ],
    set2_verbs: [
      { id: "v01", en: "slipped", vi: "đã trượt chân" },
      { id: "v02", en: "fell down", vi: "đã ngã xuống" },
      { id: "v03", en: "called", vi: "đã gọi" },
      { id: "v04", en: "arrived", vi: "đã đến nơi" },
      { id: "v05", en: "treated", vi: "đã điều trị" },
      { id: "v06", en: "praised", vi: "đã khen ngợi" },
      { id: "v07", en: "reminded", vi: "đã nhắc nhở" },
      { id: "v08", en: "hurt", vi: "đã làm đau" },
      { id: "v09", en: "stopped", vi: "đã dừng lại" },
      { id: "v10", en: "walked", vi: "đã đi bộ" }
    ],
    set3_chunks: [
      { id: "c01", en: "slipped on the wet floor", vi: "trượt chân trên sàn ướt" },
      { id: "c02", en: "walking carefully", vi: "đi bộ cẩn thận" },
      { id: "c03", en: "called the school nurse", vi: "đã gọi y tá trường" },
      { id: "c04", en: "clean bandage", vi: "băng cá nhân sạch" },
      { id: "c05", en: "hurt his knee", vi: "bị thương đầu gối" },
      { id: "c06", en: "felt relieved", vi: "cảm thấy nhẹ nhõm" },
      { id: "c07", en: "corridor safety rules", vi: "quy tắc an toàn hành lang" },
      { id: "c08", en: "running fast", vi: "chạy nhanh" },
      { id: "c09", en: "first aid kit", vi: "hộp sơ cứu" },
      { id: "c10", en: "wet floor warning sign", vi: "biển báo sàn ướt" }
    ],
    set4_definitions: [
      { id: "def01", en: "corridor", vi: "A long passage in a building from which doors lead into rooms." },
      { id: "def02", en: "bandage", vi: "A strip of cloth used to bind up a wound." },
      { id: "def03", en: "slipped", vi: "Lost one's balance accidentally on a smooth surface." },
      { id: "def04", en: "nurse", vi: "A person trained to care for sick or injured people." },
      { id: "def05", en: "relieved", vi: "No longer feeling distressed or anxious." },
      { id: "def06", en: "praised", vi: "Expressed warm approval of someone's action." },
      { id: "def07", en: "careful", vi: "Making sure to avoid potential danger or mistakes." },
      { id: "def08", en: "clumsy", vi: "Awkward in movement, likely to knock things over." },
      { id: "def09", en: "headmaster", vi: "The principal or head teacher of a school." },
      { id: "def10", en: "treat", vi: "To give medical care to a patient for an injury." }
    ]
  },

  // Singapore Math Bar Models (5 Problems — feeds BarModelQuest.jsx via customQuestions prop)
  singapore_math: [
    { id: 1, svg_url: "/images/week33/barmodel_w33_adv_p1.svg", text: "Jake walked 40 meters. The corridor is 100 meters long. How many meters are left?", answer: "60 meters", type: "part_whole" },
    { id: 2, svg_url: "/images/week33/barmodel_w33_adv_p2.svg", text: "The nurse had 25 bandages. She used 8 bandages. How many bandages remain?", answer: "17 bandages", type: "part_whole" },
    { id: 3, svg_url: "/images/week33/barmodel_w33_adv_p3.svg", text: "Tom rested for 15 minutes and applied ice for 10 minutes. What is the total treatment time?", answer: "25 minutes", type: "part_whole" },
    { id: 4, svg_url: "/images/week33/barmodel_w33_adv_p4.svg", text: "Class 4A has 30 students. 24 students followed safety rules. How many ran?", answer: "6 students", type: "part_whole" },
    { id: 5, svg_url: "/images/week33/barmodel_w33_adv_p5.svg", text: "The headmaster gave 5 safety stars to each of 4 helpers. How many stars in total?", answer: "20 stars", type: "multiplication" }
  ],

  // Grammar X-Ray Target Patterns (for Grammar Mode toggle in Hub 1) — Strict While + Past Continuous
  target_grammar_regex: [
    { pattern: "\\bWhile\\s+[^,.]*?\\b(was|were)\\s+\\w+ing\\b", label: "While + Past Continuous Clause", color: "#fef9c3" },
    { pattern: "\\b(was|were)\\s+\\w+ing\\b", label: "Past Continuous Verb", color: "#fef08a" }
  ],

  // Learn Grammar Master Class (English Grammar in Use Standard — feeds SentenceBuilderBattle.jsx Learn Grammar Modal)
  grammar_lesson: {
    unit_id: "w33_unit_past_continuous",
    title_en: "Unit 33: Past Continuous with WHILE",
    title_vi: "Bài 33: Thì Quá Khứ Tiếp Diễn với WHILE",
    rule_en: "Use 'While' with Past Continuous for a long action, and Past Simple for a short action.",
    rule_vi: "Dùng WHILE + Quá khứ tiếp diễn (was/were + V-ing) để mô tả một hành động nền đang diễn ra thì một hành động ngắn ở Quá khứ đơn xen vào.",
    formula: "While + S + was/were + V-ing, S + V2 (Past Simple).",
    examples: [
      {
        correct: true,
        en: "While Jake **was walking** down the corridor, a boy **slipped** on the wet floor.",
        vi: "Trong khi Jake đang đi bộ xuống hành lang, một cậu bé đã trượt chân trên sàn ướt."
      },
      {
        correct: true,
        en: "While the nurse **was treating** his knee, Tom **felt** much better.",
        vi: "Trong khi cô y tá đang điều trị đầu gối, Tom cảm thấy đỡ hơn rất nhiều."
      },
      {
        correct: false,
        en: "While Jake walked down the corridor, a boy slipped.",
        explanation_en: "Incorrect: 'walked' is Past Simple. The background ongoing action must use Past Continuous: 'was walking'.",
        explanation_vi: "Sai: 'walked' là Quá khứ đơn. Hành động nền đang diễn ra phải dùng Quá khứ tiếp diễn: 'was walking'."
      },
      {
        correct: false,
        en: "While Jake was walk down the corridor...",
        explanation_en: "Incorrect: After 'was', the verb must end in '-ing' → 'was walking'.",
        explanation_vi: "Sai: Sau 'was', động từ phải thêm đuôi '-ing' → 'was walking'."
      }
    ],
    practice_exercises: [
      {
        id: "pe1",
        prompt: "While Jake ___ (walk) down the corridor, he saw a boy fall.",
        options: ["was walking", "walked", "is walking"],
        answer: "was walking"
      },
      {
        id: "pe2",
        prompt: "A boy slipped while he ___ (run) fast near the laboratory.",
        options: ["was running", "ran", "runs"],
        answer: "was running"
      },
      {
        id: "pe3",
        prompt: "While the nurse was placing the bandage, Tom ___ (feel) relieved.",
        options: ["felt", "was feeling", "feels"],
        answer: "felt"
      },
      {
        id: "pe4",
        prompt: "He ___ (hurt) his knee while playing near the lockers.",
        options: ["hurt", "was hurting", "hurts"],
        answer: "hurt"
      },
      {
        id: "pe5",
        prompt: "While we ___ (have) lunch, the headmaster announced safety rules.",
        options: ["were having", "had", "have"],
        answer: "were having"
      }
    ],
    key_grammar_vocab: [
      { en: "Past Continuous", vi: "Thì quá khứ tiếp diễn (was/were + V-ing)" },
      { en: "While", vi: "Trong khi (nối hành động dài đang diễn ra)" },
      { en: "Past Simple", vi: "Thì quá khứ đơn (hành động ngắn chen ngang)" },
      { en: "Interrupted Action", vi: "Hành động bị ngắt quãng" },
      { en: "Background Action", vi: "Hành động nền" },
      { en: "Irregular Verbs", vi: "Động từ bất quy tắc (slip → slipped, fall → fell)" }
    ]
  },

  // Interactive STEM Science Drag & Drop Lab
  science_lab: {
    id: "sci_w33_lab1",
    title_en: "Corridor Friction & Safety Physics Lab",
    title_vi: "Phòng Thí Nghiệm Vật Lý Ma Sát & An Toàn Hành Lang",
    description_en: "Drag the physics principles and first aid tools to the correct positions on the diagram!",
    background_image: "/images/week33/read_cover_w33.jpg",
    zones: [
      {
        id: "z1",
        label: "Wet Floor Puddle",
        correct_label: "Low Friction Zone",
        x: 48,
        y: 76,
        micro_explanation: "⚠️ Physics Alert: Water makes tiles very slippery! Friction is reduced, causing sudden falls."
      },
      {
        id: "z2",
        label: "Running Fast",
        correct_label: "Forward Motion",
        x: 62,
        y: 45,
        micro_explanation: "⚡ Safety Alert: Running fast makes it hard to stop safely on wet tiles!"
      },
      {
        id: "z3",
        label: "Yellow Caution Sign",
        correct_label: "Hazard Alert",
        x: 28,
        y: 65,
        micro_explanation: "💡 Safety Alert: Warning signs tell everyone to slow down and walk carefully."
      },
      {
        id: "z4",
        label: "First Aid Treatment",
        correct_label: "Cold Pack & Bandage",
        x: 80,
        y: 55,
        micro_explanation: "🩹 First Aid: A cold pack cools the sore knee, while a clean bandage protects the cut."
      }
    ],
    labels: ["Low Friction Zone", "Forward Motion", "Hazard Alert", "Cold Pack & Bandage", "Heavy Weight", "Warm Air"]
  }
};

export default listeningHubData;

