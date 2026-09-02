/**
 * Week 33 Gold Standard Data — Writing Hub
 * Theme: "Corridor Safety & School Care"
 */

import writing from './writing.js';

export const writingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  picture_story: {
    steps: [
      {
        scene: 1,
        ladder_stage: "MODEL",
        badge_label: "MODEL",
        title: "Scene 1: Walking in the Corridor",
        image_url: "/images/week33/writing_panel_1.png",
        caption: "Jake was walking carefully down the corridor while a boy ran very fast past him.",
        frame_L1: "In the beginning, Jake was walking carefully down the school corridor. While he was walking, a boy was running very fast and knocked into him.",
        locked_connector: "In the beginning,",
        // connectors shown in Link Your Sentences to connect the 2-3 sentences within this scene
        connectors: ["While he was walking,", "Then,", "Suddenly,", "and"],
        sentence_hint: "Write 2–3 sentences about this picture. Use the words below to help.",
        ordered_chips: ["Jake walked carefully", "down the school corridor", "a boy was running very fast", "past him", "knocked into him"],
        pills: ["knocked into him", "walked carefully", "up the staircase", "a boy was running fast", "down the school corridor", "was playing outside", "watched the wet floor", "Jake", "slowly", "ran past him", "rushed to the classroom"],
        audio: "In the beginning, Jake was walking carefully down the school corridor. While he was walking, a boy was running very fast and knocked into him."
      },
      {
        // SCENE 2 (BUILD): Slipping — 2 sentences target
        // Sentence 1: "Suddenly, the boy slipped on the wet floor and lost his balance."
        // Sentence 2: "He fell down very heavily and hurt his knee badly."
        scene: 2,
        ladder_stage: "BUILD",
        badge_label: "BUILD",
        title: "Scene 2: Slipping on Wet Floor",
        image_url: "/images/week33/writing_panel_2.png",
        caption: "Suddenly, the boy slipped on the wet floor, fell down heavily and hurt his knee.",
        frame_L1: "Suddenly, the boy slipped on the wet floor and lost his balance. He fell down very heavily and hurt his knee badly.",
        sentence_hint: "Write 2–3 sentences: (1) The boy slipped — WHAT happened? (2) He fell — WHERE and HOW did he get hurt?",
        connectors: ["Suddenly,", "Right away,", "After that,", "Then,"],
        display_chips: [
          "hurt his left knee badly", "the running boy", "near the blue lockers", "slipped on the wet floor", "lost his balance", "fell down heavily"
        ],
        pills: ["hurt his left knee badly", "the running boy", "near the blue lockers", "tripped over his shoelaces", "slipped on the wet floor", "lost his balance", "called out in pain", "fell down heavily", "stood up quickly"],
        correct_order: ["the running boy", "slipped on the wet floor", "and", "lost his balance", "he", "fell down heavily", "near the blue lockers", "and", "hurt his left knee badly"],
        audio: "Suddenly, the boy slipped on the wet floor and lost his balance. He fell down very heavily and hurt his knee badly."
      },
      {
        // SCENE 3 (WRITE): Nurse + treatment — 2 sentences target
        scene: 3,
        ladder_stage: "WRITE",
        badge_label: "WRITE",
        title: "Scene 3: Nurse Applying Bandage",
        image_url: "/images/week33/writing_panel_3.png",
        caption: "Jake called the school nurse, who arrived quickly with a clean bandage.",
        frame_L1: "Jake called the school nurse for help. She arrived quickly and put on a clean bandage and a cold pack.",
        sentence_hint: "Write 2–3 sentences: who Jake called and what the nurse did to help.",
        locked_connector: "After that,",
        connectors: ["After that,", "Then,", "Next,", "So,"],
        keywords: ["called the school nurse", "arrived with a first-aid kit", "applied a clean bandage", "placed a cold pack", "cleaned his injured knee", "helped his hurt classmate"],
        pills: ["placed a cold pack", "went to the library", "applied a clean bandage", "arrived with a first-aid kit", "helped his hurt classmate", "called the school nurse", "cleaned his injured knee", "sat on the bench"],
        sentence_frame: "After that, Jake [called the school nurse] for help. She [arrived with a first-aid kit] and [applied a clean bandage] and [placed a cold pack].",
        audio: "After that, Jake called the school nurse for help. She arrived quickly and put on a clean bandage and a cold pack."
      },
      {
        // SCENE 4 (EXPAND): Headmaster safety talk — 2 sentences target
        scene: 4,
        ladder_stage: "EXPAND",
        badge_label: "EXPAND",
        title: "Scene 4: Headmaster Teaches Safety",
        image_url: "/images/week33/writing_panel_4.png",
        caption: "Headmaster Brown arrived and spoke to the students about corridor safety.",
        frame_L1: "Headmaster Brown arrived and spoke to all the students about corridor safety. He told everyone to walk carefully and never run near a wet floor.",
        sentence_hint: "Write 2–3 sentences: who arrived and what he said to the students about safety.",
        locked_connector: "Then,",
        connectors: ["Then,", "After that,", "Next,", "Meanwhile,"],
        keywords: ["Headmaster Brown arrived", "spoke to all the students", "corridor safety rules", "walk carefully", "never run inside", "near a wet floor", "reminded everyone"],
        pills: ["walk carefully", "went home early", "Headmaster Brown arrived", "never run inside", "spoke to all the students", "laughed loudly", "pointed to the caution sign", "corridor safety rules", "reminded everyone", "listened attentively"],
        sentence_frame: "Then, [Headmaster Brown arrived] and [spoke to all the students] about [corridor safety rules]. He [reminded everyone] to [walk carefully] and [never run inside] [near a wet floor].",
        audio: "Then, Headmaster Brown arrived and spoke to the students about corridor safety. He told everyone to walk carefully and never run near a wet floor."
      },
      {
        // SCENE 5 (REFLECT): Award ceremony — 2 sentences target
        scene: 5,
        ladder_stage: "REFLECT",
        badge_label: "REFLECT",
        title: "Scene 5: Jake Receives Award",
        image_url: "/images/week33/writing_panel_5.png",
        caption: "At the school assembly, Headmaster Brown gave Jake a safety award.",
        frame_L1: "In the end, Headmaster Brown gave Jake a special safety award at the school assembly. Everyone clapped and felt proud of Jake for helping his classmate.",
        sentence_hint: "Write 2–3 sentences: what award Jake received and how everyone felt at the end.",
        locked_connector: "In the end,",
        connectors: ["In the end,", "Finally,", "At last,"],
        keywords: ["gave Jake a special safety award", "at the school assembly", "clapped and cheered loudly", "felt proud of him", "praised his quick thinking", "handed him a certificate"],
        pills: ["clapped and cheered loudly", "went to sleep", "gave Jake a special safety award", "praised his quick thinking", "felt proud of him", "at the school assembly", "cried loudly", "handed him a certificate", "smiled happily on stage", "promised to walk carefully"],
        sentence_frame: "In the end, [Headmaster Brown] [gave Jake] a [safety award] at the [school assembly]. [Everyone clapped] and [felt proud] of Jake for [helping his classmate].",
        audio: "In the end, Headmaster Brown gave Jake a special safety award at the school assembly. Everyone clapped and felt proud of Jake for helping his classmate."
      }
    ],
    panels: [
      { image_url: "/images/week33/writing_panel_1.png", caption: "Jake was walking carefully down the corridor while a student ran fast.", pills: ["Jake was walking carefully", "down the school corridor", "near the warning sign", "a student was running fast"] },
      { image_url: "/images/week33/writing_panel_2.png", caption: "Suddenly, the boy slipped on the wet floor and hurt his knee.", pills: ["slipped on the wet floor", "fell down heavily", "hurt his knee badly", "lost his balance"] },
      { image_url: "/images/week33/writing_panel_3.png", caption: "Jake called the school nurse, who arrived quickly with a clean bandage.", pills: ["called the school nurse", "with a clean bandage", "felt relieved", "praised Jake"] }
    ],
    word_bank: ["corridor", "slipped", "fell", "nurse", "bandage", "relieved", "careful", "warning", "floor", "knee"],
    sentence_frames: [
      "While Jake was walking in the corridor, a student was running fast.",
      "Suddenly, the boy slipped on the wet floor and hurt his knee.",
      "Jake called the school nurse, who arrived with a clean bandage."
    ],
    min_words: 20
  },
  writing_chunks: {
    setting_time: ["On a busy morning,", "Down the school corridor,", "Near the science room,"],
    action_manner: ["was walking carefully", "was running very fast", "stopped immediately"],
    problem_event: ["slipped on the wet floor", "fell down heavily", "hurt his knee badly"],
    solution_outcome: ["called the school nurse", "applied a clean bandage", "felt relieved and safe"]
  },
  rw_part_1: {
    word_bank: [
      "corridor", "nurse", "bandage", "headmaster", "puddle",
      "library", "cafeteria", "stairs", "warning sign", "first-aid kit",
      "playground", "floor", "slippery", "cold pack", "science room"
    ],
    example: { id: 0, text: "A quiet room in school with books where students read and borrow stories.", target: "library" },
    definitions: [
      { id: 1, text: "You walk along this long passage inside a school building to get to your classroom.", target: "corridor" },
      { id: 2, text: "A trained medical worker at school who helps students when they get hurt.", target: "nurse" },
      { id: 3, text: "A soft piece of cloth used to cover and protect a cut or knee injury.", target: "bandage" },
      { id: 4, text: "The person in charge of managing the school who praises students for safe behaviour.", target: "headmaster" },
      { id: 5, text: "A small pool of liquid left on the floor after cleaning or rain.", target: "puddle" },
      { id: 6, text: "An open area where children play during break time.", target: "playground" },
      { id: 7, text: "A large room at school where children eat lunch and talk with friends.", target: "cafeteria" },
      { id: 8, text: "You walk up or down these steps inside the school building to go between floors.", target: "stairs" },
      { id: 9, text: "A yellow sign placed on the floor to warn people to walk carefully on wet tiles.", target: "warning sign" },
      { id: 10, text: "A bag or box containing bandages and cold packs used for immediate medical aid at school.", target: "first-aid kit" }
    ]
  },
  rw_part_2: {
    title: "Harry & Jake's Corridor Incident Conversation",
    example: { speaker_a: "Harry", text_a: "Why were you walking so carefully today?", speaker_b: "Jake", answer_letter: "D", answer_text: "I noticed a wet puddle near the science room." },
    turns: [
      { id: "q1", speaker_a: "Harry", text_a: "Did you see what happened when the boy ran fast?", correct_letter: "G" },
      { id: "q2", speaker_a: "Harry", text_a: "Oh no! Did Tom hurt himself badly when he fell down?", correct_letter: "B" },
      { id: "q3", speaker_a: "Harry", text_a: "What did you do right away to help him?", correct_letter: "A" },
      { id: "q4", speaker_a: "Harry", text_a: "Did the school nurse arrive quickly?", correct_letter: "F" },
      { id: "q5", speaker_a: "Harry", text_a: "The headmaster praised you during assembly, didn't he?", correct_letter: "E" }
    ],
    answer_options: [
      { letter: "A", text: "I stayed calm and ran to call the school nurse immediately." },
      { letter: "B", text: "Yes, he lost his balance and fell heavily near the stairs." },
      { letter: "C", text: "I'm sorry for disturbing your quiet study time." },
      { letter: "D", text: "I noticed a wet puddle near the science room." },
      { letter: "E", text: "Everyone felt relieved and praised us for following safety rules." },
      { letter: "F", text: "Yes, she arrived within two minutes with her first-aid kit." },
      { letter: "G", text: "Yes, he was rushing past the science room in a hurry." },
      { letter: "H", text: "I will call the headmaster during morning assembly." }
    ]
  },
  rw_part_3: {
    story_text: "Harry was ___ because he was starting his first science experiment today. But there was a lot of ___ on the stairs as students were rushing. 'I hope we can find ___ safe to walk,' said Jake. They arrived very ___ after the bell rang. 'That was the ___ corridor rush ever,' said Harry. But the teacher gave them a warm ___ with fun lab goggles. 'That's amazing!' said Harry. 'Science is the best subject in school!'",
    example: { blank: 1, answer: "excited", word_bank: ["excited", "surprise", "late", "bored", "deepest", "somewhere", "worst", "ago", "explored", "traffic"] },
    blanks: [
      { id: 2, answer: "traffic" },
      { id: 3, answer: "somewhere" },
      { id: 4, answer: "late" },
      { id: 5, answer: "worst" },
      { id: 6, answer: "surprise" }
    ],
    title_options: [
      { text: "Harry's safe morning at school", isCorrect: true },
      { text: "Grandma's new classroom", isCorrect: false },
      { text: "Running fast in corridors", isCorrect: false }
    ]
  },
  rw_part_4: {
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
    ]
  },
  rw_part_5: {
    title: "Jake's Quick Action in the School Corridor",
    story_text: "On a bright Friday morning, Jake was walking carefully down the main school corridor after finishing his science class. Suddenly, he noticed another student running very fast past the science room. The floor was slippery because a cleaner had just washed the tiles.\n\nThe running classmate lost his balance and fell down heavily near the stairs. Right away, Jake stopped immediately and ran to call the school nurse. The nurse arrived within two minutes carrying a clean bandage and a cold pack to treat the boy's swollen knee.\n\nThe headmaster praised Jake during assembly for following all school safety rules and helping his classmate responsibly. All the students felt relieved and promised to walk carefully down the corridor in the future.",
    example: { prompt: "Jake was walking in the school corridor after his ___", answer: "science class" },
    questions: [
      { id: "q1", prompt: "Where was Jake walking carefully on Friday morning?", answer: "down the school corridor" },
      { id: "q2", prompt: "Why was the floor slippery near the science room?", answer: "cleaner washed the tiles" },
      { id: "q3", prompt: "What happened to the student who was running fast?", answer: "fell down heavily" },
      { id: "q4", prompt: "Who did Jake call immediately for help?", answer: "the school nurse" },
      { id: "q5", prompt: "How fast did the school nurse arrive at the scene?", answer: "within two minutes" },
      { id: "q6", prompt: "What medical supplies did the nurse bring?", answer: "bandage and cold pack" },
      { id: "q7", prompt: "How did the students feel after the incident?", answer: "relieved and safe" }
    ]
  },
  science_report_config: {
    purpose: "💧 Today we write like little scientists: we say what we SAW, use past tense, and join ideas with because / so!",
    teacher_parent_note: "Learn the language of science reports (observed / because / past tense), not science content.",
    topic: "Friction on School Floors",
    notebookTitle: "Corridor Surface Friction & Safety Report",
    data_card: [
      { subject: "💧 Wet Tiles", action: "water reduced surface friction", result: "students slipped and lost balance" },
      { subject: "👟 Rubber Soles", action: "rubber created high grip friction", result: "helped children stop safely" },
      { subject: "⚠️ Warning Sign", action: "cleaners placed yellow warning signs", result: "reminded everyone to walk carefully" }
    ],
    levels: {
      l1_title: "1. Observation",
      l2_title: "2. Scientific",
      l3_title: "3. Conclusion",
      starter_L1: "While observing the corridor, we saw that wet tiles",
      starter_L2: "In fact, when rubber soles gripped the dry floor,",
      starter_L3: "In conclusion, students walked safely across the school"
    },
    pills_L1: ["had very low friction", "when water covered the floor", "causing students to slip"],
    pills_L2: ["they created high grip", "so children walked steadily", "without falling down"],
    pills_L3: ["by wearing rubber shoes", "because surface friction", "prevents dangerous accidents"],
    min_words: 20
  }
};

export const writingHub = writingHubData;
export default writingHubData;
