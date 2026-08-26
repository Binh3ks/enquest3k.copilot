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
    content_en: "Why do we fall on wet floors? The answer is a science concept called Friction. Friction is a force that stops things from sliding. While Jake was walking down the corridor, his rubber shoes created high friction with the dry floor. This kept him safe and balanced. Water on smooth tiles reduces surface friction and causes students to slip. When the floor is wet, shoes cannot grip the tiles easily. Rubber shoes provide strong grip to help students walk safely on dry ground. Yellow warning signs alert students to slow down and walk carefully so everyone stays safe!",
    content_vi: "Tại sao chúng ta lại bị ngã trên sàn nhà ướt? Câu trả lời nằm ở một khái niệm khoa học mang tên Lực Ma Sát. Lực ma sát là một lực ngăn cản các vật trượt đi. Trong khi Jake đang đi bộ xuống hành lang, đế giày cao su của cậu ấy đã tạo ra lực ma sát lớn với mặt sàn khô. Điều này giúp cậu ấy an toàn và giữ thăng bằng. Nước trên sàn gạch nhẵn làm giảm ma sát bề mặt và khiến học sinh trượt ngã. Khi sàn bị ướt, giày không thể bám vào gạch một cách dễ dàng. Giày cao su mang lại độ bám chắc chắn giúp học sinh đi lại an toàn trên mặt đất khô ráo. Biển cảnh báo màu vàng nhắc nhở học sinh đi chậm lại và cẩn thận để mọi người được an toàn!",
    audio_url: "/audio/week33/explore.mp3",
    vocab_focus: ["friction", "smooth", "rubber", "tiles", "shoes", "surface", "grip", "safe", "warning", "floor"],
    glossary: [
      { term: "Friction", meaning: "A physical force that prevents surfaces from sliding easily." },
      { term: "Rubber Soles", meaning: "Bottom of shoes that provide strong grip and high traction." },
      { term: "Smooth Tiles", meaning: "Floor surface that becomes very slippery when wet." },
      { term: "Warning Sign", meaning: "A yellow caution sign that alerts walkers to low-friction hazards." }
    ],
    check_questions: [
      {
        id: 1,
        question_en: "What is the science force that stops objects from sliding?",
        options: ["Friction", "Gravity", "Wind force"],
        answer: "Friction"
      },
      {
        id: 2,
        question_en: "Why did Jake not slip while walking down the dry corridor?",
        options: ["His rubber shoes created high friction with dry floor", "He was holding the wall", "He walked with closed eyes"],
        answer: "His rubber shoes created high friction with dry floor"
      },
      {
        id: 3,
        question_en: "What does water act like on a smooth tiled floor?",
        options: ["A slippery layer that reduces friction to zero", "A solid glue that holds shoes", "A heavy blanket that covers tiles"],
        answer: "A slippery layer that reduces friction to zero"
      }
    ],
    critical_thinking: {
      question_en: "Why is it more dangerous to run in socks on a wooden floor than wearing sports shoes?",
      hint_en: "Think about friction: socks slide easily on smooth wood, but sports shoes with rubber soles give good grip and high friction."
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

  // Cambridge Reading Part 3 Story (Story Gap-Fill & Comprehension)
  reading_part3_story: {
    title: "Nova's Discovery — Corridor Safety Incident",
    story_text: "Jake was walking carefully down the school corridor after science class. Suddenly, Tom ran past him in a hurry. Tom didn't notice the wet puddle on the floor and slipped heavily, hurting his knee. Papers flew everywhere! Jake stopped immediately and called the school nurse. The nurse arrived quickly with a clean bandage and a cold pack. Meanwhile, Mia brought a mop and wiped the wet floor so nobody else would fall. The headmaster praised the students for their quick action and reminded everyone to always walk safely.",
    questions: [
      {
        id: "r3_q01",
        question: "Why was Jake walking carefully down the corridor?",
        options: [
          { label: "A", text: "Because he always watches where he is going after class.", isCorrect: true },
          { label: "B", text: "Because he lost his shoes.", isCorrect: false },
          { label: "C", text: "Because the lights were completely off.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q02",
        question: "What caused Tom to slip and fall heavily?",
        options: [
          { label: "A", text: "He was running fast and stepped on a wet puddle.", isCorrect: true },
          { label: "B", text: "He tripped over a school bag.", isCorrect: false },
          { label: "C", text: "His friend pulled his jacket.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q03",
        question: "What did Jake do as soon as he saw Tom fall?",
        options: [
          { label: "A", text: "He stopped immediately and called the school nurse.", isCorrect: true },
          { label: "B", text: "He ran away to his next class.", isCorrect: false },
          { label: "C", text: "He started laughing loudly.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q04",
        question: "How did Mia help keep other students safe?",
        options: [
          { label: "A", text: "She wiped the floor with a cleaning mop.", isCorrect: true },
          { label: "B", text: "She placed a bench across the door.", isCorrect: false },
          { label: "C", text: "She carried Tom to the playground.", isCorrect: false }
        ],
        answerIndex: 0
      },
      {
        id: "r3_q05",
        question: "What important message did the headmaster give all students?",
        options: [
          { label: "A", text: "To always walk safely and never run in school corridors.", isCorrect: true },
          { label: "B", text: "To play soccer inside the science lab.", isCorrect: false },
          { label: "C", text: "To arrive at school an hour later.", isCorrect: false }
        ],
        answerIndex: 0
      }
    ]
  },

  // ─── R&W Part 1: Word Bank Matching (15 words → 10 definitions) — Shield 11 ───
  rw_part1: {
    word_bank: [
      "corridor", "nurse", "bandage", "headmaster", "puddle",
      "library", "cafeteria", "handrail", "warning sign", "first-aid kit",
      "playground", "stairs", "slippery", "cold pack", "science room"
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
      { id: 8, text: "You hold onto this long metal bar when walking up or down stairs.", target: "handrail" },
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

  // ─── R&W Part 4: 10-Gap Inline Cloze + Story Title (gaps array + title_options) — Shield 13 ───
  rw_part4: {
    gaps: [
      { id: 1, target: "carefully", options: ["carefully", "careful", "care"] },
      { id: 2, target: "corridor", options: ["corridor", "playground", "library"] },
      { id: 3, target: "slipped", options: ["slipped", "slipping", "slips"] },
      { id: 4, target: "fell", options: ["fell", "fallen", "falling"] },
      { id: 5, target: "Without", options: ["Without", "With", "Within"] },
      { id: 6, target: "called", options: ["called", "calling", "calls"] },
      { id: 7, target: "nurse", options: ["nurse", "doctor", "teacher"] },
      { id: 8, target: "bandage", options: ["bandage", "bandaged", "bandaging"] },
      { id: 9, target: "praised", options: ["praised", "praise", "praising"] },
      { id: 10, target: "relieved", options: ["relieved", "relief", "relieving"] }
    ],
    title_options: [
      { id: 1, title: "A Dangerous Run Near the Science Room", target: false },
      { id: 2, title: "Jake's Responsible Action in the School Corridor", target: true },
      { id: 3, title: "How Teachers Clean Science Experiments", target: false }
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
          text: "On a bright Friday morning, Jake was walking carefully down the main school corridor after finishing his science class. Suddenly, he noticed another student running very fast past the science room. The floor was slippery because a cleaner had just washed the tiles."
        },
        {
          id: 2,
          text: "The running classmate lost his balance and fell down heavily near the stairs. Right away, Jake stopped immediately and ran to call the school nurse. The nurse arrived within two minutes carrying a clean bandage and a cold pack to treat the boy's swollen knee."
        },
        {
          id: 3,
          text: "The headmaster praised Jake during assembly for following all school safety rules and helping his classmate responsibly. All the students felt relieved and promised to walk carefully down the corridor in the future."
        }
      ]
    },
    summary_sentences: [
      { id: 1, text_before: "Jake was walking down the school corridor after his ", text_after: ".", target: "science class", paragraph_ref: 1 },
      { id: 2, text_before: "The floor was slippery because a cleaner had just ", text_after: " the tiles.", target: "washed", paragraph_ref: 1 },
      { id: 3, text_before: "The classmate lost his balance and ", text_after: " heavily near the stairs.", target: "fell down", paragraph_ref: 2 },
      { id: 4, text_before: "Jake ran to call the ", text_after: " for help.", target: "school nurse", paragraph_ref: 2 },
      { id: 5, text_before: "The nurse used a clean bandage and a ", text_after: " to treat the boy.", target: "cold pack", paragraph_ref: 2 },
      { id: 6, text_before: "The headmaster praised Jake during ", text_after: " for helping his classmate.", target: "assembly", paragraph_ref: 3 },
      { id: 7, text_before: "All students promised to walk ", text_after: " in the corridor.", target: "carefully", paragraph_ref: 3 }
    ]
  }
};

readingHubData.rw_part_1 = readingHubData.rw_part1;
readingHubData.rw_part_2 = readingHubData.rw_part2;
readingHubData.rw_part_4 = readingHubData.rw_part4;
readingHubData.rw_part_5 = readingHubData.rw_part5;

export default readingHubData;
