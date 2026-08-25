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
        title: "Scene 1: Walking in the Corridor",
        image_url: "/images/week33/writing_panel_1.png",
        caption: "Jake was walking carefully down the corridor while a student ran fast.",
        frame_L1: "Jake was walking carefully down the corridor while a student was running fast.",
        pills: ["Jake was walking carefully", "down the school corridor", "near the warning sign", "a student was running fast"],
        audio: "While Jake was walking carefully down the corridor, a boy was running fast."
      },
      {
        scene: 2,
        title: "Scene 2: Slipping on Wet Floor",
        image_url: "/images/week33/writing_panel_2.png",
        caption: "Suddenly, the boy slipped on the wet floor and hurt his knee.",
        frame_L1: "Suddenly, the boy slipped on the wet floor and hurt his knee badly.",
        pills: ["slipped on the wet floor", "fell down heavily", "hurt his knee badly", "lost his balance"],
        audio: "Suddenly, the boy slipped on the wet floor and fell down."
      },
      {
        scene: 3,
        title: "Scene 3: Nurse Applying Bandage",
        image_url: "/images/week33/writing_panel_3.png",
        caption: "Jake called the school nurse, who arrived quickly with a clean bandage.",
        frame_L1: "Jake called the school nurse and everyone felt relieved.",
        pills: ["called the school nurse", "with a clean bandage", "felt relieved", "praised Jake"],
        audio: "Jake called the school nurse, who arrived with a clean bandage and a cold pack."
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
      "library", "cafeteria", "handrail", "warning sign", "first-aid kit",
      "playground", "stairs", "slippery", "cold pack", "science room"
    ],
    definitions: [
      { id: 1, text: "You walk along this long passage inside a school building to get to your classroom.", target: "corridor" },
      { id: 2, text: "A trained medical worker at school who helps students when they get hurt.", target: "nurse" },
      { id: 3, text: "A soft piece of cloth used to cover and protect a cut or knee injury.", target: "bandage" },
      { id: 4, text: "The person in charge of managing the school who praises students for safe behaviour.", target: "headmaster" },
      { id: 5, text: "A small pool of liquid left on the floor after cleaning or rain.", target: "puddle" },
      { id: 6, text: "A quiet room in school with books where students read and borrow stories.", target: "library" },
      { id: 7, text: "A large room at school where children eat lunch and talk with friends.", target: "cafeteria" },
      { id: 8, text: "You hold onto this long metal bar when walking up or down stairs.", target: "handrail" },
      { id: 9, text: "A yellow sign placed on the floor to warn people to walk carefully on wet tiles.", target: "warning sign" },
      { id: 10, text: "A bag or box containing bandages and cold packs used for immediate medical aid at school.", target: "first-aid kit" }
    ]
  },
  rw_part_2: {
    title: "Harry & Jake's Corridor Incident Conversation",
    dialogue: [
      { gap_id: 1, speaker_a: "Harry", speaker_b: "Jake", text_a: "Hi Jake! Did you see what happened in the corridor after science class today?" },
      { gap_id: 2, speaker_a: "Harry", speaker_b: "Jake", text_a: "Oh no! Did Tom hurt himself badly when he fell down?" },
      { gap_id: 3, speaker_a: "Harry", speaker_b: "Jake", text_a: "What did you do right away to help him?" },
      { gap_id: 4, speaker_a: "Harry", speaker_b: "Jake", text_a: "How did the school nurse treat Tom's injured knee?" },
      { gap_id: 5, speaker_a: "Harry", speaker_b: "Jake", text_a: "The headmaster praised you during assembly, didn't he?" }
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
  rw_part_4: {
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
  rw_part_5: {
    instructions: "Complete the sentences about the story. Write 1, 2, 3 or 4 words.",
    story: {
      title: "Jake's Quick Action in the School Corridor",
      paragraphs: [
        { id: 1, text: "On a bright Friday morning, Jake was walking carefully down the main school corridor after finishing his science class. Suddenly, he noticed another student running very fast past the science room. The floor was slippery because a cleaner had just washed the tiles." },
        { id: 2, text: "The running classmate lost his balance and fell down heavily near the stairs. Right away, Jake stopped immediately and ran to call the school nurse. The nurse arrived within two minutes carrying a clean bandage and a cold pack to treat the boy's swollen knee." },
        { id: 3, text: "The headmaster praised Jake during assembly for following all school safety rules and helping his classmate responsibly. All the students felt relieved and promised to walk carefully down the corridor in the future." }
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
  },
  science_report_config: {
    purpose: "Learn the language of science reports (observed / because / past tense), not science content.",
    topic: "Friction & Surface Safety Report",
    notebookTitle: "Friction on School Floors Lab Notebook",
    data_card: [
      { subject: "💧 Wet Tiles", action: "water reduces surface friction", result: "students slipped and lost balance" },
      { subject: "👟 Rubber Shoes", action: "rubber provides strong grip", result: "walking safely with more friction" },
      { subject: "⚠️ Warning Sign", action: "placed near wet cleaning area", result: "warned everyone to walk carefully" }
    ],
    levels: {
      L1: { mode: "assemble", description: "Assemble data card observations into complete sentences" },
      L2: { mode: "verb_choice", description: "Choose correct scientific reporting verbs (observed / caused / concluded)" },
      L3: { mode: "cloze", description: "Complete scientific report sentences using guided keywords" },
      L4: { mode: "guided_typing", description: "Type observations and reasons using data card chips" },
      L5: { mode: "free_register", description: "Write full report with scientific register checklist" }
    },
    step1Title: "Observe Surface Conditions",
    step1Pills: {
      "💧 Wet Floor Tiles": ["water reduces surface friction", "floor becomes very smooth"],
      "👟 Shoe Soles": ["smooth shoes lose grip", "rubber shoes provide traction"]
    },
    step2Title: "Measure Friction Differences",
    step2Pills: {
      "⚡ Less Friction": ["less friction causes slips", "sliding motion cannot stop easily"],
      "🛡️ More Friction": ["more friction keeps walkers safe", "dry surfaces give better grip"]
    },
    step3Title: "Record Safety Conclusion",
    step3Pills: {
      "🏆 Key Conclusion": ["safety signs warn about low friction", "walking carefully prevents accidents"],
      "🌟 Takeaway": ["understanding friction keeps everyone safe", "clean floors dry quickly"]
    }
  },
  word_bank_pills: writing?.word_bank_pills || writing?.wordBankPills,
  model_sentence: writing?.model_sentence,
  sentence_frames: writing?.sentence_frames,
  min_words: 20,
  pbl_mission: {
    title_en: "Offline Corridor Safety Ambassador Project",
    title_vi: "Dự Án Đại Sứ An Toàn Hành Lang Học Đường",
    task_en: "1. Draw a creative safety warning sign for your school corridor or home staircase.\n2. Write 3 safety rules under your drawing using past continuous and modal verbs (e.g., 'Do not run while walking near water').\n3. Record a 1-minute video explaining your sign to your classmates.",
    task_vi: "1. Vẽ một biển báo an toàn sáng tạo cho hành lang trường hoặc cầu thang nhà con.\n2. Viết 3 quy tắc an toàn bên dưới biển báo dùng thì quá khứ tiếp diễn và động từ khuyết thiếu.\n3. Quay video 1 phút thuyết trình giải thích biển báo cho bạn bè."
  },
  writing
};

export default writingHubData;
