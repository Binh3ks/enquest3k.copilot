/**
 * Week 33 Gold Standard Data — Reading Hub
 * Theme: "Corridor Safety & School Care"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  cefr_level: "A2 Flyers",
  read_explore: read_explore,
  story_scenes: read_explore.story_scenes,
  vocab: vocabList,

  // CLIL Knowledge Explorer (Science & Physics of Friction — Single Academic Focus)
  clil_article: {
    id: "clil_w33_science_friction",
    theme: "The Science of Friction in Corridors",
    title_en: "The Science of Friction in Corridors",
    title_vi: "Khoa Học Về Lực Ma Sát Tại Hành Lang Trường Học",
    part_1_title: "Why Wet Floors Are Slippery",
    part_2_title: "How Rubber Shoes Keep Us Safe",
    content_en: "Did you ever wonder why wet floors turn into ice rinks? The secret is an invisible science force called friction! Friction is the friendly grip between your shoe soles and the floor that stops you from sliding. When you walk on dry, smooth tiles, your shoes grip firmly and your body stays balanced. But when water spills, it spreads out into a thin slippery layer. This water layer reduces friction, turning safe floors into a slippery slide!\n\nThis morning in our school corridor, Tom was running in a big hurry to science class. Suddenly—whoosh! He slipped on the wet tiles because his old sneakers had smooth plastic soles with no grip! Luckily, Jake was walking carefully nearby. When Jake rushed to help Tom up, he noticed something amazing: his own rubber soles gripped the floor tightly without sliding at all! The school nurse smiled and pointed to the bright yellow warning sign: \"Tom, rubber gives a strong grip, but water always steals your friction!\" Tom rubbed his sore knee and laughed, \"From now on, I will walk like a smart scientist!\"",
    content_vi: "Có bao giờ em tự hỏi tại sao sàn nhà ướt lại biến thành một sân trượt băng chưa? Bí mật nằm ở một lực khoa học vô hình mang tên Lực Ma Sát! Ma sát chính là độ bám thân thiện giữa đế giày của em và mặt sàn, giúp giữ em không bị trượt ngã. Khi em đi trên sàn gạch nhẵn khô ráo, giày của em bám rất chắc và cơ thể em giữ được thăng bằng. Nhưng khi nước đổ ra, nó loang thành một lớp màng trơn trượt mỏng. Lớp nước này làm giảm lực ma sát, biến sàn nhà an toàn thành một chiếc cầu trượt nguy hiểm!\n\nSáng nay tại hành lang trường học, bạn Tom đang chạy vội vã đến lớp khoa học. Bỗng nhiên—vèo một cái! Cậu ấy bị trượt chân trên sàn gạch ướt vì đôi giày cũ của cậu ấy có đế nhựa trơn bóng, hoàn toàn không có độ bám! May mắn thay, Jake đang đi bộ cẩn thận gần đó. Khi Jake chạy tới đỡ Tom dậy, cậu nhận ra một điều kỳ diệu: chính đôi giày có đế cao su của cậu lại bám chặt vào sàn mà không hề bị trượt chút nào! Cô y tá trường mỉm cười và chỉ tay vào chiếc biển báo màu vàng sáng rực: \"Này Tom, đế cao su mang lại độ bám chắc chắn, nhưng nước trên sàn sẽ luôn lấy cắp lực ma sát của em đấy!\" Tom vừa xoa đầu gối vừa bật cười: \"Từ giờ trở đi, em sẽ đi bộ cẩn thận như một nhà khoa học thông thái!\"",
    audio_url: "/audio/week33/clil_friction.mp3",
    // VOCAB FOCUS: Curated pedagogical target chunks/collocations ONLY — NOT every clickable word.
    // Each item is a meaningful lexical unit with complete entry in WEEK_33_MASTER_DICTIONARY.
    vocab_focus: [
      "invisible science force",
      "shoe soles",
      "smooth tiles",
      "slippery layer",
      "reduces friction",
      "stays balanced",
      "school corridor",
      "wet tiles",
      "plastic soles",
      "rubber soles",
      "strong grip",
      "yellow warning sign"
    ],
    // GRAMMAR X-RAY: Selective target structures.
    // Paragraph 1: Scientific Cause-and-Effect (Present Simple action units)
    // Paragraph 2: Past Continuous vs Past Simple Action Contrast (A2 Flyers Core Grammar)
    grammar_patterns: [
      {
        pattern: '\\b(stops you from sliding|stays balanced|reduces friction)\\b',
        label: 'Present Simple: Scientific Cause & Effect',
        paragraph_scope: 1
      },
      {
        pattern: '\\b(was running in a big hurry|slipped on the wet tiles|was walking carefully|gripped the floor tightly)\\b',
        label: 'Past Continuous vs Past Simple (Action in Progress vs Result)',
        paragraph_scope: 2
      }
    ],
    sentence_drills: [
      {
        id: 1,
        label: "Friction Principle",
        scrambled: ["stops shoes from sliding", "Friction is a force that", "on dry tiles"],
        correct: ["Friction is a force that", "stops shoes from sliding", "on dry tiles"]
      },
      {
        id: 2,
        label: "Rubber Grip Rule",
        scrambled: ["on wet floors", "Rubber shoe soles provide strong grip", "to stop accidental slips"],
        correct: ["Rubber shoe soles provide strong grip", "on wet floors", "to stop accidental slips"]
      }
    ],
    glossary: [
      { term: "Friction", meaning: "A physical force that prevents surfaces from sliding easily." },
      { term: "Grip", meaning: "The hold between shoe soles and the floor surface." },
      { term: "Rubber Soles", meaning: "Bottom of shoes made of rubber for high traction." },
      { term: "Smooth Tiles", meaning: "Floor surface that becomes very slippery when wet." },
      { term: "Slippery Layer", meaning: "A thin film of water that reduces friction." },
      { term: "Warning Sign", meaning: "A bright yellow sign that alerts people to walk slowly." },
      { term: "Balance", meaning: "Staying steady on your feet without falling over." },
      { term: "Surface", meaning: "The flat top or outer boundary of an object or floor." }
    ],
    check_questions: [
      {
        id: 1,
        question_en: "What is the invisible science force that stops shoes from sliding on floors?",
        options: ["Friction", "Gravity", "Wind power", "Magnetic force"],
        answer: "Friction"
      },
      {
        id: 2,
        question_en: "What happens when water spills onto dry smooth tiles?",
        options: [
          "It creates a thin slippery layer that reduces friction",
          "It makes the tiles sticky and hard to move",
          "It increases friction and stops all movement",
          "It turns the smooth floor into rough sandpaper"
        ],
        answer: "It creates a thin slippery layer that reduces friction"
      },
      {
        id: 3,
        question_en: "Why did Tom slip when running fast to science class?",
        options: [
          "His sneakers had smooth plastic soles with no grip",
          "His shoes were too big for his feet",
          "He was carrying a heavy school backpack",
          "His shoelaces were tied together tightly"
        ],
        answer: "His sneakers had smooth plastic soles with no grip"
      },
      {
        id: 4,
        question_en: "Why was Jake able to walk safely without sliding on the wet floor?",
        options: [
          "His rubber soles gripped the floor tightly",
          "He held onto the wall with both hands",
          "He jumped over the wet area",
          "He walked very fast so he did not touch the water"
        ],
        answer: "His rubber soles gripped the floor tightly"
      },
      {
        id: 5,
        question_en: "What did the school nurse remind Tom about the yellow warning sign?",
        options: [
          "Rubber gives strong grip, but water steals friction",
          "Running fast is good exercise in the corridor",
          "Always take off shoes before walking on wet tiles",
          "Yellow signs mean the floor is completely dry and safe"
        ],
        answer: "Rubber gives strong grip, but water steals friction"
      }
    ],
    critical_thinking: {
      question_en: "Why is it much safer to walk in rubber-soled sports shoes than in smooth plastic shoes on a wet corridor floor?",
      hint_en: "Think about friction: rubber soles have strong grip that holds surfaces tightly, while smooth plastic soles have no grip and slide easily over the water layer."
    }
  },
  interactive_story: {
    mode: "open_cloze",
    title: "Interactive Story: Corridor Safety Incident",
    text_template: "Jake **was walking carefully** down the school corridor today. First, he **noticed a wet puddle** near the science room. Then, a boy running fast ____1____ on the slippery tiles and ____2____ heavily. ____3____, Jake stopped immediately and ____4____ the school nurse. The nurse arrived quickly with a ____5____ and treated his knee gently.",
    gaps: [
      { id: 1, target: "slipped", hint: "lost balance on wet tiles", hint_en: "lost balance on wet tiles", hint_vi: "trượt chân" },
      { id: 2, target: "fell down", hint: "dropped to the floor", hint_en: "dropped to the floor", hint_vi: "ngã xuống" },
      { id: 3, target: "Right away", hint: "without delay / immediately", hint_en: "without delay / immediately", hint_vi: "ngay lập tức" },
      { id: 4, target: "called", hint: "contacted for help", hint_en: "contacted for help", hint_vi: "gọi" },
      { id: 5, target: "clean bandage", hint: "medical wrap for cuts", hint_en: "medical wrap for cuts", hint_vi: "băng cá nhân sạch" }
    ],
    hints: {
      1: "lost balance on wet tiles",
      2: "dropped to the floor",
      3: "without delay / immediately",
      4: "contacted for help",
      5: "medical wrap for cuts"
    },
    word_bank: ["slipped", "fell down", "Right away", "called", "clean bandage"]
  },
  story_scenes: read_explore.story_scenes,
  read_explore,

  // Cambridge Reading & Writing Part 6 (Open Cloze - 5 Gaps Text Input - Learn Mode)
  rw_part_6: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Jake's Diary: Tuesday",
    example: { target: "after" },
    text_template: "Dear Diary, today was a crazy day [0]_____ school. After science class, I was walking down the [1]_____. Suddenly, Tom ran past me very fast. He didn't see the yellow warning sign. He [2]_____ on the wet floor and fell down! He [3]_____ his left knee. I walked quickly and [4]_____ the school nurse for help. She brought a clean [5]_____ and fixed his knee. I'm glad he is okay!",
    answers: {
      "0": "after",
      "1": "corridor",
      "2": "slipped",
      "3": "hurt",
      "4": "called",
      "5": "bandage"
    }
  },

  // Check Mode Parameterized Variant: Shifted Gap Positions & Mutated Surface Details
  rw_part_6_check_mode: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Oliver's Diary: Wednesday (Check Mode Exam Paper)",
    example: { target: "corridor" },
    text_template: "Dear Diary, today was an eventful day. After class, I was walking [1]_____ the corridor. Suddenly, Leo ran [2]_____ me fast. He slipped on the wet floor [3]_____ he was running. I called the nurse [4]_____ help. She arrived quickly [5]_____ treated his knee gently.",
    answers: {
      "1": "down",
      "2": "past",
      "3": "because",
      "4": "for",
      "5": "and"
    }
  },

  // Check Mode Drills (10 Assessment Questions for W33)
  check_mode_drills: [
    {
      id: 'q1',
      question: 'Where was Jake walking after science class?',
      options: ['A) In the playground', 'B) Down the school corridor', 'C) In the library', 'D) On the football field'],
      answerIndex: 1
    },
    {
      id: 'q2',
      question: 'Why did Tom slip and fall down?',
      options: ['A) He was running fast on the wet floor', 'B) His shoe laces were untied', 'C) Someone pushed him', 'D) The lights went out'],
      answerIndex: 0
    },
    {
      id: 'q3',
      question: 'Which part of his body did Tom hurt when he fell?',
      options: ['A) His arm', 'B) His knee', 'C) His shoulder', 'D) His elbow'],
      answerIndex: 1
    },
    {
      id: 'q4',
      question: 'Who did Jake call immediately to help Tom?',
      options: ['A) His parents', 'B) The school nurse', 'C) The bus driver', 'D) The coach'],
      answerIndex: 1
    },
    {
      id: 'q5',
      question: 'What two things did the school nurse bring to treat the injury?',
      options: ['A) A bandage and a cold pack', 'B) A glass of water and fruit', 'C) A wheelchair and pillow', 'D) Warm soup and medicine'],
      answerIndex: 0
    },
    {
      id: 'q6',
      question: 'What did Mia do near the yellow warning sign?',
      options: ['A) She ate her snack', 'B) She wiped the wet floor with a mop', 'C) She drew a picture', 'D) She read a comic book'],
      answerIndex: 1
    },
    {
      id: 'q7',
      question: 'What rule did the headmaster remind all students to follow?',
      options: ['A) Always run in hallways', 'B) Never run in corridors', 'C) Eat lunch in classrooms', 'D) Leave school early'],
      answerIndex: 1
    },
    {
      id: 'q8',
      question: 'What is the past simple form of "slip"?',
      options: ['A) Slips', 'B) Slipping', 'C) Slipped', 'D) Slipt'],
      answerIndex: 2
    },
    {
      id: 'q9',
      question: 'What is the past continuous form of "walk" for "Jake"?',
      options: ['A) Were walking', 'B) Was walking', 'C) Is walking', 'D) Walking'],
      answerIndex: 1
    },
    {
      id: 'q10',
      question: 'How did everyone feel after Tom was safely treated?',
      options: ['A) Relieved and thankful', 'B) Angry and upset', 'C) Tired and bored', 'D) Confused and scared'],
      answerIndex: 0
    }
  ],

  // Cambridge Reading Part 3 Story (Story Gap-Fill & Best Title Choice)
  reading_part3_story: {
    example: { blank: 0, answer: "science" },
    story_text: "Jake was walking carefully down the school corridor after [0]_____ class. Suddenly, Tom ran past him very [1]_____. Tom didn't notice the yellow [2]_____ sign on the wet floor. He slipped heavily and hurt his [3]_____. He also dropped all his books on the ground and cried out in pain. Jake stopped immediately and called the school [4]_____. The nurse arrived quickly with a clean bandage and a cold pack to treat the cut. She told Tom to rest and not walk fast. Headmaster Brown came to see Tom and reminded all students to walk slowly in the corridor. He said that safety rules are very important for everyone at school.",
    word_bank: ["science", "fast", "warning", "knee", "nurse", "library", "running", "happy", "cold", "loud"],
    answers: {
      "0": "science",
      "1": "fast",
      "2": "warning",
      "3": "knee",
      "4": "nurse"
    },
    title_options: [
      { id: 1, title: "A Day in the School Library", target: false },
      { id: 2, title: "Jake's Responsible Action in the School Corridor", target: true },
      { id: 3, title: "Cleaning the Chemistry Classroom", target: false }
    ],
    correct_title: "Jake's Responsible Action in the School Corridor"
  },

  // ─── R&W Part 1: Word Bank Matching (15 words → 10 definitions) — Shield 11 ───
  rw_part1: {
    word_bank: [
      "corridor", "nurse", "bandage", "headmaster", "puddle",
      "library", "cafeteria", "stairs", "warning sign", "first-aid kit",
      "playground", "floor", "slippery", "cold pack", "science room"
    ],
    example: { id: 0, text: "A quiet room filled with books where students study.", target: "library" },
    definitions: [
      { id: 1, text: "You walk along this long passage inside a school building to get to your classroom.", target: "corridor" },
      { id: 2, text: "A trained medical worker at school who helps students when they get hurt.", target: "nurse" },
      { id: 3, text: "A soft piece of cloth used to cover and protect a cut or knee injury.", target: "bandage" },
      { id: 4, text: "The person in charge of managing the school who praises students for safe behaviour.", target: "headmaster" },
      { id: 5, text: "A small pool of liquid left on the floor after cleaning or rain.", target: "puddle" },
      { id: 6, text: "The place where students do experiments with goggles and chemicals.", target: "science room" },
      { id: 7, text: "A large room at school where children eat lunch and talk with friends.", target: "cafeteria" },
      { id: 8, text: "You walk up or down these steps inside the school building to go between floors.", target: "stairs" },
      { id: 9, text: "A yellow sign placed on the floor to warn people to walk carefully on wet tiles.", target: "warning sign" },
      { id: 10, text: "A bag or box containing bandages and cold packs used for immediate medical aid at school.", target: "first-aid kit" }
    ]
  },

  // ─── R&W Part 2: Dialogue A-H (5 turns, 8 options with for_gap) — Shield 12 ───
  rw_part2: {
    title: "Harry & Jake's Corridor Incident Conversation",
    dialogue: [
      {
        gap_id: 1,
        speaker_a: "Harry",
        speaker_b: "Jake",
        text_a: "Hi Jake! Did you see what happened in the corridor after science class today?"
      },
      {
        gap_id: 2,
        speaker_a: "Harry",
        speaker_b: "Jake",
        text_a: "Oh no! Did Tom hurt himself badly when he fell down?"
      },
      {
        gap_id: 3,
        speaker_a: "Harry",
        speaker_b: "Jake",
        text_a: "What did you do right away to help him?"
      },
      {
        gap_id: 4,
        speaker_a: "Harry",
        speaker_b: "Jake",
        text_a: "How did the school nurse treat Tom's injured knee?"
      },
      {
        gap_id: 5,
        speaker_a: "Harry",
        speaker_b: "Jake",
        text_a: "The headmaster praised you during assembly, didn't he?"
      }
    ],
    options: [
      { id: "opt_1", text: "Yes, I was walking carefully down the corridor when Tom slipped on the wet floor.", for_gap: 1 },
      { id: "opt_2", text: "Yes, he lost his balance on the wet tiles and hurt his knee quite badly.", for_gap: 2 },
      { id: "opt_3", text: "I stopped immediately and ran to call the school nurse for help.", for_gap: 3 },
      { id: "opt_4", text: "She placed a cold pack on his knee and wrapped it gently with a clean bandage.", for_gap: 4 },
      { id: "opt_5", text: "Yes, he was very pleased that I followed all school safety rules.", for_gap: 5 },
      { id: "opt_6", text: "I usually eat lunch with my classmates in the school cafeteria.", for_gap: null },
      { id: "opt_7", text: "The yellow warning sign is placed next to the classroom entrance.", for_gap: null },
      { id: "opt_8", text: "We have our science experiment every Tuesday morning at nine.", for_gap: null }
    ]
  },

  // ─── R&W Part 4: Grammar MCQ — 10 standalone 3-option questions (Cambridge Flyers exact spec) —───
  rw_part4: {
    instructions: "Read the story. Choose the correct words from the dropdowns.",
    text_template: "Students walk down the corridor [1] every morning. When floors are wet, there is less [2] between shoes and tiles. It is important to [3] warning signs placed near doors. Yesterday, Jake [4] another boy who was running too fast. The boy slipped and [5] down heavily near the stairs. Jake [6] immediately to assist his classmate. He ran to [7] the school nurse for quick help. The nurse applied a clean bandage [8] his injured knee. Everyone learned to walk [9] inside school buildings. Safe habits make school a [10] place for all children.",
    example: { blank: 1, correct: "carefully", options: ["carefully", "careful", "careless"] },
    blanks: [
      { id: 2, correct: "friction", options: ["friction", "frictional", "frictions"] },
      { id: 3, correct: "notice", options: ["notice", "notices", "noticed"] },
      { id: 4, correct: "saw", options: ["see", "saw", "seen"] },
      { id: 5, correct: "fell", options: ["fall", "fell", "fallen"] },
      { id: 6, correct: "stopped", options: ["stop", "stops", "stopped"] },
      { id: 7, correct: "call", options: ["call", "calls", "called"] },
      { id: 8, correct: "on", options: ["on", "in", "at"] },
      { id: 9, correct: "safely", options: ["safe", "safely", "safer"] },
      { id: 10, correct: "better", options: ["good", "better", "best"] }
    ],
    questions: [
      {
        id: 0,
        isExample: true,
        sentence: "Jake was walking _____ down the corridor after class.",
        options: { A: "careful", B: "carefully", C: "care" },
        answer: "B"
      },
      {
        id: 1,
        sentence: "Tom _____ past Jake very quickly and did not see the wet floor.",
        options: { A: "run", B: "runs", C: "ran" },
        answer: "C"
      },
      {
        id: 2,
        sentence: "The floor was _____ because a cleaner had just washed the tiles.",
        options: { A: "slip", B: "slippery", C: "slipped" },
        answer: "B"
      },
      {
        id: 3,
        sentence: "Tom lost his _____ and fell down heavily near the stairs.",
        options: { A: "balancing", B: "balanced", C: "balance" },
        answer: "C"
      },
      {
        id: 4,
        sentence: "Jake ran _____ help Tom and called the school nurse right away.",
        options: { A: "for", B: "with", C: "to" },
        answer: "C"
      },
      {
        id: 5,
        sentence: "The nurse arrived _____ two minutes with a bandage and a cold pack.",
        options: { A: "without", B: "within", C: "with" },
        answer: "B"
      },
      {
        id: 6,
        sentence: "She wrapped the bandage _____ around his swollen knee.",
        options: { A: "gentle", B: "gentleness", C: "gently" },
        answer: "C"
      },
      {
        id: 7,
        sentence: "The headmaster _____ both boys during school assembly for being safe.",
        options: { A: "praise", B: "praised", C: "praising" },
        answer: "B"
      },
      {
        id: 8,
        sentence: "All the students _____ to walk carefully in the school corridor every day.",
        options: { A: "promise", B: "promising", C: "promised" },
        answer: "C"
      },
      {
        id: 9,
        sentence: "Safety is the _____ important thing we learn about at school each week.",
        options: { A: "more", B: "much", C: "most" },
        answer: "C"
      },
      {
        id: 10,
        sentence: "We must always _____ each other and follow the school safety rules.",
        options: { A: "protects", B: "protect", C: "protecting" },
        answer: "B"
      }
    ]
  },

  // ─── R&W Part 5: Story Extract — 1-4 Word Completion (7 items) — Shield 15 ───
  rw_part5: {
    instructions: "Complete the sentences about the story. Write 1, 2, 3 or 4 words.",
    story: {
      title: "Jake's Quick Action in the School Corridor",
      paragraphs: [
        {
          id: 1,
          text: "On a bright Friday morning, Jake was walking carefully down the main school corridor after finishing his science class. The corridor was long and quiet. Suddenly, he noticed another student running very fast past the science room door. The floor near the stairs was slippery because a cleaner had just washed the smooth white tiles. A yellow warning sign was standing on the floor, but the boy did not see it."
        },
        {
          id: 2,
          text: "The running classmate lost his balance and fell down heavily near the bottom of the stairs. He cried out in pain and held his left knee tightly. Right away, Jake stopped and ran quickly to the teacher's office to call the school nurse. The nurse arrived within two minutes. She was carrying a clean white bandage and a cold pack to treat the boy's swollen and painful knee. She wrapped the bandage gently and placed the cold pack carefully on top."
        },
        {
          id: 3,
          text: "After school, the headmaster called everyone to the main hall for the end-of-day assembly. He praised Jake in front of all the students for following school safety rules and helping his classmate quickly and calmly. He also reminded students to walk slowly in the corridor. He told everyone to look at the floor for wet tiles or warning signs. All the students listened carefully and felt happy and safe. They all promised to walk carefully down the corridor every single day and to look after each other at school."
        }
      ]
    },
    summary_sentences: [
      { id: 1, text_before: "Jake was walking down the school corridor after his ", text_after: ".", target: "science class", paragraph_ref: 1 },
      { id: 2, text_before: "The floor was slippery because a cleaner had just ", text_after: " the smooth white tiles.", target: "washed", paragraph_ref: 1 },
      { id: 3, text_before: "The classmate lost his balance and ", text_after: " heavily near the stairs.", target: "fell down", paragraph_ref: 2 },
      { id: 4, text_before: "Jake ran quickly to call the ", text_after: " for help.", target: "school nurse", paragraph_ref: 2 },
      { id: 5, text_before: "The nurse used a clean bandage and a ", text_after: " to treat the boy.", target: "cold pack", paragraph_ref: 2 },
      { id: 6, text_before: "The headmaster praised Jake during ", text_after: " for helping his classmate.", target: "assembly", paragraph_ref: 3 },
      { id: 7, text_before: "All students promised to walk ", text_after: " in the corridor every day.", target: "carefully", paragraph_ref: 3 }
    ]
  }
};

readingHubData.rw_part_1 = readingHubData.rw_part1;
readingHubData.rw_part_2 = readingHubData.rw_part2;
readingHubData.rw_part_4 = readingHubData.rw_part4;
readingHubData.rw_part_5 = readingHubData.rw_part5;

export default readingHubData;
