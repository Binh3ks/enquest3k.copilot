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
