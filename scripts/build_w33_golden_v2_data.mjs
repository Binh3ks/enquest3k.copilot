import fs from 'fs';
import path from 'path';

const root = process.cwd();
const w33Dir = path.join(root, 'src', 'data', 'weeks', 'week_33');

if (!fs.existsSync(w33Dir)) {
  fs.mkdirSync(w33Dir, { recursive: true });
}

// 1. metadata.js update for Week 33
const metadataPath = path.join(root, 'src', 'data', 'weeks', 'metadata.js');
let metadataContent = fs.readFileSync(metadataPath, 'utf8');
metadataContent = metadataContent.replace(
  /33:\s*\{\s*title_en:\s*"[^"]*",\s*title_vi:\s*"[^"]*"/,
  '33: { title_en: "Corridor Safety & School Care", title_vi: "An Toàn Hành Lang & Chăm Sóc Trường Học"'
);
fs.writeFileSync(metadataPath, metadataContent, 'utf8');

// 2. read.js (STEM Story: Corridor Safety & School Care - 180 words)
const readJs = `// Week 33 STEM Story: Corridor Safety & School Care
export default {
  id: "w33_read",
  week: 33,
  title: "Corridor Safety & School Care",
  title_vi: "An Toàn Hành Lang & Chăm Sóc Trường Học",
  cover_image: "/images/week33/read_cover_w33.jpg",
  audio_url: "/audio/week33/read_full.mp3",
  content_en: "Jake was walking carefully down the school corridor after science class. Suddenly, a boy running fast slipped on the wet floor and fell down heavily. He hurt his knee and lost his balance completely. Jake stopped immediately to help his friend stay calm. He called the school nurse right away. The nurse arrived quickly with a clean bandage and a cold pack to treat the cut. Everyone felt relieved and praised Jake for following safety rules. The headmaster reminded all students never to run in corridors.",
  content_vi: "Jake đang đi bộ cẩn thận xuống hành lang trường học sau giờ học khoa học. Đột nhiên, một cậu bé đang chạy nhanh bị trượt chân trên sàn nhà ướt và ngã nặng. Cậu ấy bị thương ở đầu gối và mất thăng bằng hoàn toàn. Jake dừng lại ngay lập tức để giúp bạn mình giữ bình tĩnh. Cậu ấy gọi y tế nhà trường ngay lập tức. Cô y tá đến nhanh chóng với một chiếc băng cá nhân sạch và một túi chườm lạnh để điều trị vết cắt. Mọi người đều cảm thấy nhẹ nhõm và khen ngợi Jake vì đã tuân thủ các quy tắc an toàn. Thầy hiệu trưởng nhắc nhở tất cả học sinh không bao giờ được chạy trong hành lang.",
  story_scenes: [
    {
      scene_id: "scene_1",
      title_en: "Scene 1: Walking Down the Corridor",
      description_en: "Jake was walking carefully down the corridor after science class.",
      image_url: "/images/week33/webtoon_scene_1.png",
      lexical_chunks: [
        { word: "corridor", chunk: "school corridor", x: 45, y: 55 },
        { word: "carefully", chunk: "walking carefully", x: 25, y: 40 }
      ]
    },
    {
      scene_id: "scene_2",
      title_en: "Scene 2: Slipping on the Wet Floor",
      description_en: "A boy running fast slipped on the wet floor and fell down.",
      image_url: "/images/week33/webtoon_scene_2.png",
      lexical_chunks: [
        { word: "slipped", chunk: "slipped on the wet floor", x: 50, y: 70 },
        { word: "fell", chunk: "fell down heavily", x: 60, y: 80 }
      ]
    },
    {
      scene_id: "scene_3",
      title_en: "Scene 3: Calling the School Nurse",
      description_en: "Jake called the school nurse immediately to ask for medical help.",
      image_url: "/images/week33/webtoon_scene_3.png",
      lexical_chunks: [
        { word: "nurse", chunk: "school nurse", x: 35, y: 50 },
        { word: "called", chunk: "called immediately", x: 55, y: 60 }
      ]
    },
    {
      scene_id: "scene_4",
      title_en: "Scene 4: Applying First Aid & Bandage",
      description_en: "The nurse treated the cut gently with a clean bandage and cold pack.",
      image_url: "/images/week33/webtoon_scene_4.png",
      lexical_chunks: [
        { word: "bandage", chunk: "clean bandage", x: 40, y: 60 },
        { word: "cold_pack", chunk: "cold pack", x: 60, y: 65 }
      ]
    },
    {
      scene_id: "scene_5",
      title_en: "Scene 5: Feeling Relieved & Praised",
      description_en: "Everyone felt relieved and the headmaster praised Jake for his quick action.",
      image_url: "/images/week33/webtoon_scene_5.png",
      lexical_chunks: [
        { word: "relieved", chunk: "felt relieved", x: 45, y: 50 },
        { word: "praised", chunk: "praised Jake", x: 65, y: 55 }
      ]
    }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'read.js'), readJs, 'utf8');

// 3. vocab.js (20 Target Words)
const vocabJs = `// Week 33 Target Vocabulary List (20 Words)
export default [
  { id: 1, word: "corridor", definition_en: "a long passage in a building with doors on each side", definition_vi: "hành lang", audio_word: "/audio/week33/vocab_corridor.mp3", image_url: "/images/week33/vocab_corridor.jpg" },
  { id: 2, word: "slipped", definition_en: "slid accidentally on a wet surface and lost balance", definition_vi: "bị trượt chân", audio_word: "/audio/week33/vocab_slipped.mp3", image_url: "/images/week33/vocab_slipped.jpg" },
  { id: 3, word: "nurse", definition_en: "a person trained to care for sick or injured people", definition_vi: "y tá trường học", audio_word: "/audio/week33/vocab_nurse.mp3", image_url: "/images/week33/vocab_nurse.jpg" },
  { id: 4, word: "bandage", definition_en: "a strip of material used to bind a wound or cut", definition_vi: "băng cá nhân / băng gạc", audio_word: "/audio/week33/vocab_bandage.mp3", image_url: "/images/week33/vocab_bandage.jpg" },
  { id: 5, word: "relieved", definition_en: "feeling happy because something unpleasant has stopped", definition_vi: "cảm thấy nhẹ nhõm", audio_word: "/audio/week33/vocab_relieved.mp3", image_url: "/images/week33/vocab_relieved.jpg" },
  { id: 6, word: "mistake", definition_en: "an action or decision that is wrong or incorrect", definition_vi: "lỗi lầm / sai sót", audio_word: "/audio/week33/vocab_mistake.mp3", image_url: "/images/week33/vocab_mistake.jpg" },
  { id: 7, word: "accident", definition_en: "an unfortunate incident that happens unexpectedly", definition_vi: "tai nạn ngoài ý muốn", audio_word: "/audio/week33/vocab_accident.mp3", image_url: "/images/week33/vocab_accident.jpg" },
  { id: 8, word: "fix", definition_en: "to repair or mend something that is broken or damaged", definition_vi: "sửa chữa / khắc phục", audio_word: "/audio/week33/vocab_fix.mp3", image_url: "/images/week33/vocab_fix.jpg" },
  { id: 9, word: "sorry", definition_en: "feeling sadness or regret for a mistake made", definition_vi: "xin lỗi / hối hận", audio_word: "/audio/week33/vocab_sorry.mp3", image_url: "/images/week33/vocab_sorry.jpg" },
  { id: 10, word: "careful", definition_en: "giving serious attention to avoid danger or mistakes", definition_vi: "cẩn thận", audio_word: "/audio/week33/vocab_careful.mp3", image_url: "/images/week33/vocab_careful.jpg" },
  { id: 11, word: "clumsy", definition_en: "moving or acting awkwardly without grace or balance", definition_vi: "vụng về / hậu đậu", audio_word: "/audio/week33/vocab_clumsy.mp3", image_url: "/images/week33/vocab_clumsy.jpg" },
  { id: 12, word: "arm", definition_en: "the upper limb of the human body from shoulder to hand", definition_vi: "cánh tay", audio_word: "/audio/week33/vocab_arm.mp3", image_url: "/images/week33/vocab_arm.jpg" },
  { id: 13, word: "knee", definition_en: "the joint between the thigh and lower leg", definition_vi: "đầu gối", audio_word: "/audio/week33/vocab_knee.mp3", image_url: "/images/week33/vocab_knee.jpg" },
  { id: 14, word: "leg", definition_en: "each of the limbs on which a person walks and stands", definition_vi: "chân", audio_word: "/audio/week33/vocab_leg.mp3", image_url: "/images/week33/vocab_leg.jpg" },
  { id: 15, word: "head", definition_en: "the upper part of the body containing brain and eyes", definition_vi: "đầu", audio_word: "/audio/week33/vocab_head.mp3", image_url: "/images/week33/vocab_head.jpg" },
  { id: 16, word: "cold_pack", definition_en: "a gel bag chilled in ice used to reduce swelling", definition_vi: "túi chườm lạnh", audio_word: "/audio/week33/vocab_cold_pack.mp3", image_url: "/images/week33/vocab_cold_pack.jpg" },
  { id: 17, word: "recover", definition_en: "to return to normal health or strength after injury", definition_vi: "hồi phục", audio_word: "/audio/week33/vocab_recover.mp3", image_url: "/images/week33/vocab_recover.jpg" },
  { id: 18, word: "explain", definition_en: "to make something clear by giving detail and reason", definition_vi: "giải thích", audio_word: "/audio/week33/vocab_explain.mp3", image_url: "/images/week33/vocab_explain.jpg" },
  { id: 19, word: "lesson", definition_en: "a period of learning or a moral learned from experience", definition_vi: "bài học rút ra", audio_word: "/audio/week33/vocab_lesson.mp3", image_url: "/images/week33/vocab_lesson.jpg" },
  { id: 20, word: "terrible", definition_en: "extremely bad, serious, or distressing", definition_vi: "tồi tệ / khủng khiếp", audio_word: "/audio/week33/vocab_terrible.mp3", image_url: "/images/week33/vocab_terrible.jpg" }
];
`;
fs.writeFileSync(path.join(w33Dir, 'vocab.js'), vocabJs, 'utf8');

// 4. explore.js (Social Studies & History/Geography - 180 words)
const exploreJs = `// Week 33 Social Studies: Corridor Safety & School Rules
export default {
  id: "w33_explore",
  title: "School Safety & Ancient Olympic Rules",
  title_vi: "An Toàn Trường Học & Quy Tắc Olympic Cổ Đại",
  cover_image: "/images/week33/explore_cover_w33.jpg",
  audio_url: "/audio/week33/explore_full.mp3",
  content_en: "Rules are essential for keeping people safe both in modern schools and throughout ancient history. In modern schools, safety rules forbid running down wet corridors to prevent slipping accidents. Similarly, during the Ancient Olympic Games in Greece, city-states signed a sacred agreement called the Olympic Truce or Ekecheiria. This rule commanded all armies to stop fighting so athletes could travel safely across the country. Following established rules creates a respectful environment where everyone feels protected and happy.",
  content_vi: "Quy tắc là cần thiết để giữ an toàn cho mọi người trong cả trường học hiện đại và suốt lịch sử cổ đại. Tại các trường học hiện đại, quy tắc an toàn cấm chạy xuống hành lang ướt để ngăn ngừa tai nạn trượt ngã. Tương tự, trong các Kỳ thi Olympic Cổ đại tại Hy Lạp, các thành quốc đã ký một thỏa thuận linh thiêng gọi là Đình chiến Olympic. Quy tắc này ra lệnh cho tất cả quân đội ngừng chiến đấu để các vận động viên có thể di chuyển an toàn khắp đất nước. Việc tuân thủ các quy tắc đã đề ra tạo ra một môi trường tôn trọng, nơi mọi người đều cảm thấy được bảo vệ và hạnh phúc.",
  check_questions: [
    { id: 1, question_en: "Why do modern schools prohibit running in corridors?", options: ["To prevent slipping accidents", "To save energy", "To keep quiet"], answer: "To prevent slipping accidents" },
    { id: 2, question_en: "What was the name of the ancient Greek agreement?", options: ["The Olympic Truce", "The Greek Charter", "The Athlete Peace"], answer: "The Olympic Truce" },
    { id: 3, question_en: "What did the Olympic Truce command armies to do?", options: ["Stop fighting during games", "Build new sports arenas", "Run faster"], answer: "Stop fighting during games" }
  ],
  critical_thinking: {
    question_en: "How do safety rules in your school help you and your classmates learn better?",
    hint_en: "Think about how feeling safe allows you to focus on lessons without fear."
  }
};
`;
fs.writeFileSync(path.join(w33Dir, 'explore.js'), exploreJs, 'utf8');

// 5. grammar.js (Past Continuous + WHILE & Irregular Verbs Group 5)
const grammarJs = `// Week 33 Grammar Focus: Past Continuous + WHILE & Past Irregular Verbs Group 5
export default {
  title: "Past Continuous with WHILE & Irregular Verbs Group 5",
  focus: "While + Past Continuous (was/were + V-ing), Past Simple occurred.",
  rule_en: "Use 'While' to introduce a long background action in Past Continuous, interrupted by a shorter action in Past Simple.",
  rule_vi: "Dùng 'While' để mô tả một hành động kéo dài ở Quá khứ Tiếp diễn, bị ngắt lời bởi một hành động ngắn ở Quá khứ Đơn.",
  examples: [
    "While Jake was walking down the corridor, a boy slipped.",
    "While the nurse was treating his knee, Tom felt relieved."
  ],
  exercises: [
    { id: 1, prompt: "While Jake ___ down the corridor, he saw a boy fall.", options: ["was walking", "walked", "is walking"], answer: "was walking", type: "mc" },
    { id: 2, prompt: "A boy slipped while he ___ fast near the stairs.", options: ["was running", "ran", "runs"], answer: "was running", type: "mc" },
    { id: 3, prompt: "While the nurse was placing the bandage, Tom ___ better.", options: ["felt", "was feeling", "feels"], answer: "felt", type: "mc" },
    { id: 4, prompt: "He ___ his knee while playing football yesterday.", options: ["hurt", "was hurting", "hurts"], answer: "hurt", type: "mc" },
    { id: 5, prompt: "While we ___ lunch, the headmaster announced safety rules.", options: ["were having", "had", "have"], answer: "were having", type: "mc" },
    { id: 6, prompt: "Tom ___ his glasses when he knocked them off the desk.", options: ["broke", "was breaking", "breaks"], answer: "broke", type: "mc" },
    { id: 7, prompt: "While Mia ___ the floor, Jake brought a dry towel.", options: ["was cleaning", "cleaned", "cleans"], answer: "was cleaning", type: "mc" },
    { id: 8, prompt: "The boy ___ his balance while turning around.", options: ["lost", "was losing", "loses"], answer: "lost", type: "mc" },
    { id: 9, prompt: "While I ___ to class, I found a clean bandage.", options: ["was going", "went", "go"], answer: "was going", type: "mc" },
    { id: 10, prompt: "The nurse ___ quickly after Jake called her.", options: ["arrived", "was arriving", "arrives"], answer: "arrived", type: "mc" }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'grammar.js'), grammarJs, 'utf8');

// 6. logic_lab.js (15 Independent Quiz Items: 5 STEM, 5 Bar Math SVGs, 5 Social)
const logicLabJs = `// Week 33 Logic Lab (15 Independent Items)
export default {
  logic_science: {
    title: "Corridor Physics & Friction Science",
    questions: [
      { id: 1, question_en: "Why is a wet tiled floor slippery?", options: ["Water reduces friction between shoes and tiles", "Water makes shoes heavier", "Water changes floor color"], answer: "Water reduces friction between shoes and tiles" },
      { id: 2, question_en: "What should you do when you see a wet floor sign?", options: ["Walk carefully around it", "Run over it quickly", "Ignore the sign"], answer: "Walk carefully around it" },
      { id: 3, question_en: "Why is a cold pack applied to a bumped knee?", options: ["To reduce swelling and ease pain", "To clean dirt off skin", "To make skin warm"], answer: "To reduce swelling and ease pain" },
      { id: 4, question_en: "What happens to kinetic momentum when a runner stops suddenly?", options: ["Momentum pushes the body forward causing a slip", "Momentum disappears instantly", "Momentum turns into air"], answer: "Momentum pushes the body forward causing a slip" },
      { id: 5, question_en: "Which material increases friction on corridor floors?", options: ["Rubber mats", "Soapy water", "Waxed ice"], answer: "Rubber mats" }
    ]
  },
  singapore_math: {
    title: "Corridor Safety Bar Models",
    problems: [
      { id: 1, svg_url: "/images/week33/barmodel_w33_adv_p1.svg", text: "Jake walked 40 meters. The corridor is 100 meters long. How many meters are left?", answer: "60 meters" },
      { id: 2, svg_url: "/images/week33/barmodel_w33_adv_p2.svg", text: "The nurse had 25 bandages. She used 8 bandages. How many bandages remain?", answer: "17 bandages" },
      { id: 3, svg_url: "/images/week33/barmodel_w33_adv_p3.svg", text: "Tom rested for 15 minutes and applied ice for 10 minutes. What is the total treatment time?", answer: "25 minutes" },
      { id: 4, svg_url: "/images/week33/barmodel_w33_adv_p4.svg", text: "Class 4A has 30 students. 24 students followed safety rules. How many ran?", answer: "6 students" },
      { id: 5, svg_url: "/images/week33/barmodel_w33_adv_p5.svg", text: "The headmaster gave 5 safety stars to each of 4 helpers. How many stars in total?", answer: "20 stars" }
    ]
  },
  social_quiz: {
    title: "School Rules & Civic Responsibility",
    questions: [
      { id: 1, question_en: "What should you do if a classmate gets hurt in the corridor?", options: ["Call a teacher or school nurse immediately", "Laugh and run away", "Keep playing"], answer: "Call a teacher or school nurse immediately" },
      { id: 2, question_en: "Why do schools create safety rules?", options: ["To protect all students from accidents", "To make school boring", "To test memory"], answer: "To protect all students from accidents" },
      { id: 3, question_en: "What is an appropriate response if you accidentally break a school item?", options: ["Apologize and inform a teacher", "Hide it under a chair", "Blame someone else"], answer: "Apologize and inform a teacher" },
      { id: 4, question_en: "How did the ancient Olympic Truce help athletes?", options: ["Allowed safe travel during wartime", "Gave them free food", "Made games shorter"], answer: "Allowed safe travel during wartime" },
      { id: 5, question_en: "What character trait did Jake display by helping his classmate?", options: ["Responsibility and care", "Selfishness", "Carelessness"], answer: "Responsibility and care" }
    ]
  }
};
`;
fs.writeFileSync(path.join(w33Dir, 'logic_lab.js'), logicLabJs, 'utf8');

// 7. writing.js (3 Pixar Panels picture_mode & Word Pills)
const writingJs = `// Week 33 Writing Studio Data
export default {
  title: "Corridor Incident & Safety Report",
  prompt_en: "Write a 3-paragraph story script (35-50 words) about an accident in the school corridor and how first aid was applied.",
  prompt_vi: "Viết kịch bản câu chuyện 3 đoạn (35-50 từ) về một sự cố ở hành lang trường học và cách sơ cứu được thực hiện.",
  min_sentences: 5,
  min_words: 35,
  max_words: 50,
  model_sentence: "While Jake was walking down the school corridor, a boy slipped on the wet floor and hurt his knee. Jake called the nurse immediately. The nurse arrived quickly with a clean bandage and a cold pack. Everyone felt relieved.",
  sentence_frames: [
    { template: "While Jake was walking in the ___, a boy slipped.", answers: ["corridor"] },
    { template: "The boy fell down and hurt his ___.", answers: ["knee"] },
    { template: "Jake called the school ___ immediately.", answers: ["nurse"] },
    { template: "The nurse brought a clean ___ and cold pack.", answers: ["bandage"] },
    { template: "Everyone felt ___ and praised Jake.", answers: ["relieved"] }
  ],
  picture_mode: {
    type: "picture",
    image_url: "/images/week33/writing_panel_1.png",
    panels: [
      { id: 1, image_url: "/images/week33/writing_panel_1.png", caption: "Panel 1: Running in corridor" },
      { id: 2, image_url: "/images/week33/writing_panel_2.png", caption: "Panel 2: Slipping on wet floor" },
      { id: 3, image_url: "/images/week33/writing_panel_3.png", caption: "Panel 3: Nurse applying bandage" }
    ],
    word_bank: ["corridor", "slipped", "fell", "nurse", "bandage", "relieved", "careful"],
    sentence_frames: [
      "While a student was running in the corridor, he...",
      "Suddenly, he slipped on the wet floor and...",
      "Jake called the school nurse, who arrived with..."
    ],
    writing_prompts: {
      en: "Describe what happened in the 3 picture panels using past continuous and past simple verbs.",
      vi: "Mô tả điều xảy ra trong 3 bức tranh dùng động từ quá khứ tiếp diễn và quá khứ đơn."
    }
  },
  hints: {
    words: [
      { word: "corridor", meaning_vi: "hành lang" },
      { word: "slipped", meaning_vi: "trượt chân" },
      { word: "nurse", meaning_vi: "y tá" },
      { word: "bandage", meaning_vi: "băng cá nhân" },
      { word: "relieved", meaning_vi: "nhẹ nhõm" }
    ]
  }
};
`;
fs.writeFileSync(path.join(w33Dir, 'writing.js'), writingJs, 'utf8');

// 8. mindmap.js (36-Branch Speaking Mindmap: 6x6)
const mindmapJs = `// Week 33 Speaking Mindmap (36 Branches: 6 Stems x 6 Labels)
export default {
  centerStems: [
    {
      id: 1,
      label: "Corridor Safety Rules",
      branches: [
        { id: "1_1", label: "Walk carefully after class" },
        { id: "1_2", label: "Never run on wet tiles" },
        { id: "1_3", label: "Look out for warning signs" },
        { id: "1_4", label: "Keep school bags off floor" },
        { id: "1_5", label: "Hold stair handrails firmly" },
        { id: "1_6", label: "Report wet puddles to janitor" }
      ]
    },
    {
      id: 2,
      label: "First Aid Care",
      branches: [
        { id: "2_1", label: "Call school nurse right away" },
        { id: "2_2", label: "Apply clean sterile bandage" },
        { id: "2_3", label: "Use cold pack for swelling" },
        { id: "2_4", label: "Keep injured classmate calm" },
        { id: "2_5", label: "Do not move broken leg" },
        { id: "2_6", label: "Wash small cuts with water" }
      ]
    },
    {
      id: 3,
      label: "Accident Prevention",
      branches: [
        { id: "3_1", label: "Clean up spilled water fast" },
        { id: "3_2", label: "Tie shoe laces tightly" },
        { id: "3_3", label: "Wear non-slip rubber shoes" },
        { id: "3_4", label: "Walk in single line" },
        { id: "3_5", label: "Avoid pushing near doors" },
        { id: "3_6", label: "Keep hallways bright and clear" }
      ]
    },
    {
      id: 4,
      label: "School Responsibilities",
      branches: [
        { id: "4_1", label: "Follow teacher instructions" },
        { id: "4_2", label: "Help injured friends quickly" },
        { id: "4_3", label: "Apologize for accidental clumsy mistakes" },
        { id: "4_4", label: "Remind classmates about rules" },
        { id: "4_5", label: "Respect janitors and staff" },
        { id: "4_6", label: "Praise responsible actions" }
      ]
    },
    {
      id: 5,
      label: "Helping Friends",
      branches: [
        { id: "5_1", label: "Stay beside hurt friend" },
        { id: "5_2", label: "Speak gently to calm them" },
        { id: "5_3", label: "Carry their heavy schoolbag" },
        { id: "5_4", label: "Inform teacher immediately" },
        { id: "5_5", label: "Offer bottle of fresh water" },
        { id: "5_6", label: "Walk them to nurse office" }
      ]
    },
    {
      id: 6,
      label: "Emergency Action",
      branches: [
        { id: "6_1", label: "Stay calm and do not panic" },
        { id: "6_2", label: "Shout for adult help" },
        { id: "6_3", label: "Clear space around person" },
        { id: "6_4", label: "Press cold pack gently" },
        { id: "6_5", label: "Explain accident clearly" },
        { id: "6_6", label: "Follow nurse medical advice" }
      ]
    }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'mindmap.js'), mindmapJs, 'utf8');

// 9. ask_ai.js (5 Mascot AI Voice Dialogue Turns)
const askAiJs = `// Week 33 Mascot Nova AI Voice Dialogue Cards (5 Turns)
export default [
  {
    id: 1,
    title_en: "Turn 1: What were you doing when the accident happened?",
    sample_question_en: "I was walking down the corridor after science class.",
    sample_question_vi: "Tôi đang đi bộ xuống hành lang sau giờ học khoa học.",
    answer: "Good! What did you see while you were walking?",
    word_bank: ["was", "walking", "down", "corridor", "science"]
  },
  {
    id: 2,
    title_en: "Turn 2: How did the classmate get hurt?",
    sample_question_en: "He slipped on the wet floor and fell down.",
    sample_question_vi: "Cậu ấy bị trượt chân trên sàn nhà ướt và ngã xuống.",
    answer: "Oh no! Which part of his body did he hurt?",
    word_bank: ["slipped", "wet", "floor", "fell", "knee"]
  },
  {
    id: 3,
    title_en: "Turn 3: What quick action did you take?",
    sample_question_en: "I called the school nurse immediately to get help.",
    sample_question_vi: "Tôi đã gọi y tế nhà trường ngay lập tức để nhận sự giúp đỡ.",
    answer: "Well done! How did the nurse treat his cut?",
    word_bank: ["called", "school", "nurse", "immediately", "help"]
  },
  {
    id: 4,
    title_en: "Turn 4: How did the nurse treat the injury?",
    sample_question_en: "She applied a clean bandage and a cold pack.",
    sample_question_vi: "Cô ấy đã dán băng cá nhân sạch và túi chườm lạnh.",
    answer: "Wonderful! How did everyone feel after that?",
    word_bank: ["applied", "clean", "bandage", "cold", "pack"]
  },
  {
    id: 5,
    title_en: "Turn 5: What lesson did everyone learn?",
    sample_question_en: "We learned to walk carefully and follow safety rules.",
    sample_question_vi: "Chúng tôi học được cách đi lại cẩn thận và tuân thủ quy tắc an toàn.",
    answer: "Excellent! Safety rules protect everyone at school.",
    word_bank: ["learned", "walk", "carefully", "follow", "rules"]
  }
];
`;
fs.writeFileSync(path.join(w33Dir, 'ask_ai.js'), askAiJs, 'utf8');

// 10. dictation.js (5 Audio Dictation Sentences)
const dictationJs = `// Week 33 Dictation Sentences
export default [
  { id: 1, sentence: "Jake was walking carefully down the school corridor.", audio_url: "/audio/week33/dictation_1.mp3" },
  { id: 2, sentence: "A boy running fast slipped on the wet floor.", audio_url: "/audio/week33/dictation_2.mp3" },
  { id: 3, sentence: "Jake called the school nurse immediately for help.", audio_url: "/audio/week33/dictation_3.mp3" },
  { id: 4, sentence: "The nurse applied a clean bandage and a cold pack.", audio_url: "/audio/week33/dictation_4.mp3" },
  { id: 5, sentence: "Everyone felt relieved and praised Jake for safety.", audio_url: "/audio/week33/dictation_5.mp3" }
];
`;
fs.writeFileSync(path.join(w33Dir, 'dictation.js'), dictationJs, 'utf8');

// 11. shadowing.js & shadowing_ipa.js
const shadowingJs = `// Week 33 Shadowing Data
export default {
  videoId: "shadowing_w33",
  title: "Corridor Safety Shadowing",
  sentences: [
    { id: 1, text: "Jake was walking carefully down the corridor.", start_time: 0, end_time: 4, audio_url: "/audio/week33/shadowing_1.mp3" },
    { id: 2, text: "Suddenly, a boy running fast slipped on the wet floor.", start_time: 4, end_time: 9, audio_url: "/audio/week33/shadowing_2.mp3" },
    { id: 3, text: "Jake called the school nurse right away.", start_time: 9, end_time: 13, audio_url: "/audio/week33/shadowing_3.mp3" },
    { id: 4, text: "The nurse treated his knee with a clean bandage.", start_time: 13, end_time: 18, audio_url: "/audio/week33/shadowing_4.mp3" },
    { id: 5, text: "Everyone felt relieved and followed safety rules.", start_time: 18, end_time: 23, audio_url: "/audio/week33/shadowing_5.mp3" }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'shadowing.js'), shadowingJs, 'utf8');

const shadowingIpaJs = `// Week 33 Shadowing IPA Transcriptions
export default [
  { id: 1, text: "Jake was walking carefully down the corridor.", ipa: "/ʤeɪk wəz ˈwɔːkɪŋ ˈkeəfəli daʊn ðə ˈkɒrɪdɔː/" },
  { id: 2, text: "Suddenly, a boy running fast slipped on the wet floor.", ipa: "/ˈsʌdnli ə bɔɪ ˈrʌnɪŋ fɑːst slɪpt ɒn ðə wet flɔː/" },
  { id: 3, text: "Jake called the school nurse right away.", ipa: "/ʤeɪk kɔːld ðə skuːl nɜːs raɪt əˈweɪ/" },
  { id: 4, text: "The nurse treated his knee with a clean bandage.", ipa: "/ðə nɜːs ˈtriːtɪd hɪz niː wɪð ə kliːn ˈbændɪʤ/" },
  { id: 5, text: "Everyone felt relieved and followed safety rules.", ipa: "/ˈevrɪwʌn felt rɪˈliːvd ənd ˈfɒləʊd ˈseɪfti ruːlz/" }
];
`;
fs.writeFileSync(path.join(w33Dir, 'shadowing_ipa.js'), shadowingIpaJs, 'utf8');

// 12. daily_watch.js
const dailyWatchJs = `// Week 33 Daily Watch Videos
export default {
  videos: [
    { id: "v1", title: "School Corridor Safety Rules for Kids", url: "https://www.youtube.com/embed/sample1" },
    { id: "v2", title: "First Aid Basics for Children", url: "https://www.youtube.com/embed/sample2" },
    { id: "v3", title: "Understanding Friction on Wet Surfaces", url: "https://www.youtube.com/embed/sample3" },
    { id: "v4", title: "Ancient Olympic Games Truce History", url: "https://www.youtube.com/embed/sample4" },
    { id: "v5", title: "How to Help an Injured Classmate", url: "https://www.youtube.com/embed/sample5" }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'daily_watch.js'), dailyWatchJs, 'utf8');

// 13. games.js (Flash Arena 10 Pairs & Sentence Builder)
const gamesJs = `// Week 33 Minigames Data
export const week33GamesAdvanced = {
  title: "Corridor Safety Games",
  wordList: ["corridor", "slipped", "nurse", "bandage", "relieved", "mistake", "accident", "fix", "careful", "clumsy"],
  matchingPairs: [
    { word: "corridor", definition: "a long passage in a building" },
    { word: "slipped", definition: "slid accidentally on wet floor" },
    { word: "nurse", definition: "school medical carer" },
    { word: "bandage", definition: "strip of cloth for cuts" },
    { word: "relieved", definition: "feeling happy after worry" },
    { word: "mistake", definition: "an incorrect action" },
    { word: "accident", definition: "unexpected unfortunate event" },
    { word: "fix", definition: "to repair or mend" },
    { word: "careful", definition: "paying serious attention" },
    { word: "clumsy", definition: "moving without balance" }
  ]
};
export default week33GamesAdvanced;
`;
fs.writeFileSync(path.join(w33Dir, 'games.js'), gamesJs, 'utf8');

// 14. logic_science.js, singapore_math.js, social_quiz.js
const logicScienceJs = `// Week 33 Logic Science Questions
export default {
  title: "Corridor Physics & Friction Science",
  questions: [
    { id: 1, question_en: "Why is a wet tiled floor slippery?", options: ["Water reduces friction", "Water increases shoe weight", "Water changes tile color"], answer: "Water reduces friction" },
    { id: 2, question_en: "What reduces friction on wet tiles?", options: ["Soapy water", "Rubber floor mats", "Smooth ice"], answer: "Rubber floor mats" }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'logic_science.js'), logicScienceJs, 'utf8');

const singaporeMathJs = `// Week 33 Singapore Math Problems
export default {
  title: "Corridor Distance & Time Math",
  problems: [
    { id: 1, text: "Jake walked 40m of a 100m corridor. How many meters remain?", answer: "60 meters" },
    { id: 2, text: "The nurse used 8 of her 25 bandages. How many bandages remain?", answer: "17 bandages" }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'singapore_math.js'), singaporeMathJs, 'utf8');

const socialQuizJs = `// Week 33 Social Quiz Questions
export default {
  title: "School Rules & Civic Responsibility",
  questions: [
    { id: 1, question_en: "What should you do if a classmate slips?", options: ["Call a teacher or nurse immediately", "Run away", "Laugh"], answer: "Call a teacher or nurse immediately" }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'social_quiz.js'), socialQuizJs, 'utf8');

// 15. word_match.js & word_power.js
const wordMatchJs = `// Week 33 Word Match Pairs (10 Pairs)
export default [
  { id: 1, word: "corridor", definition_en: "long passage in a building", definition_vi: "hành lang" },
  { id: 2, word: "slipped", definition_en: "slid accidentally on wet floor", definition_vi: "trượt chân" },
  { id: 3, word: "nurse", definition_en: "school medical carer", definition_vi: "y tá" },
  { id: 4, word: "bandage", definition_en: "strip of cloth for cuts", definition_vi: "băng cá nhân" },
  { id: 5, word: "relieved", definition_en: "feeling happy after worry", definition_vi: "nhẹ nhõm" },
  { id: 6, word: "mistake", definition_en: "incorrect action", definition_vi: "lỗi lầm" },
  { id: 7, word: "accident", definition_en: "unexpected incident", definition_vi: "tai nạn" },
  { id: 8, word: "fix", definition_en: "to repair or mend", definition_vi: "sửa chữa" },
  { id: 9, word: "careful", definition_en: "avoiding danger", definition_vi: "cẩn thận" },
  { id: 10, word: "clumsy", definition_en: "moving without balance", definition_vi: "vụng về" }
];
`;
fs.writeFileSync(path.join(w33Dir, 'word_match.js'), wordMatchJs, 'utf8');

const wordPowerJs = `// Week 33 Word Power (8 Collocation Cards)
export default [
  { id: 1, word: "run in the corridor", definition_en: "to move fast down a hallway", definition_vi: "chạy trong hành lang" },
  { id: 2, word: "have an accident", definition_en: "to suffer an unexpected injury", definition_vi: "gặp tai nạn" },
  { id: 3, word: "fall down", definition_en: "to drop to the ground suddenly", definition_vi: "ngã xuống" },
  { id: 4, word: "hurt yourself", definition_en: "to cause injury to your body", definition_vi: "tự làm mình bị thương" },
  { id: 5, word: "feel terrible", definition_en: "to feel very unwell or sad", definition_vi: "cảm thấy tồi tệ" },
  { id: 6, word: "tell the truth", definition_en: "to speak honestly about what happened", definition_vi: "nói sự thật" },
  { id: 7, word: "learn a lesson", definition_en: "to gain wisdom from an experience", definition_vi: "rút ra bài học" },
  { id: 8, word: "break something", definition_en: "to damage an object into pieces", definition_vi: "làm vỡ vật gì đó" }
];
`;
fs.writeFileSync(path.join(w33Dir, 'word_power.js'), wordPowerJs, 'utf8');

// 16. reading_hub.js, listening_hub.js, writing_hub.js, speaking_hub.js
const readingHubJs = `/**
 * Week 33 Gold Standard Data — Reading Hub
 * Theme: "Corridor Safety & School Care"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  cefr_level: "A2 Flyers",
  vocab: vocabList,
  interactive_story: {
    mode: "open_cloze",
    title: "Interactive Story: Corridor Safety Incident",
    text_template: "Jake **was walking carefully** down the school corridor today. First, he **noticed a wet puddle** near the science room. Then, a boy running fast ____1____ on the slippery tiles and ____2____ heavily. ____3____, Jake stopped immediately and ____4____ the school nurse. The nurse arrived quickly with a ____5____ and treated his knee gently.",
    gaps: [
      { id: 1, target: "slipped", hint: "trượt chân", hint_vi: "trượt chân" },
      { id: 2, target: "fell down", hint: "ngã xuống", hint_vi: "ngã xuống" },
      { id: 3, target: "Without hesitation", hint: "không chần chừ", hint_vi: "không chần chừ" },
      { id: 4, target: "called", hint: "gọi", hint_vi: "gọi" },
      { id: 5, target: "clean bandage", hint: "băng cá nhân sạch", hint_vi: "băng cá nhân sạch" }
    ],
    hints: {
      1: "trượt chân",
      2: "ngã xuống",
      3: "không chần chừ",
      4: "gọi",
      5: "băng cá nhân sạch"
    },
    word_bank: ["slipped", "fell down", "Without hesitation", "called", "clean bandage"]
  },
  story_scenes: read_explore.story_scenes,
  read_explore
};

export default readingHubData;
`;
fs.writeFileSync(path.join(w33Dir, 'reading_hub.js'), readingHubJs, 'utf8');

const listeningHubJs = `/**
 * Week 33 Gold Standard Data — Listening Hub
 * Theme: "Corridor Safety & School Care"
 */

import dictation from './dictation.js';
import shadowing from './shadowing.js';

export const listeningHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  dictation,
  shadowing,
  audio_exercises: [
    { id: 1, prompt: "Listen and identify: While Jake was walking, what happened?", options: ["A boy slipped", "A dog ran", "A bell rang"], answer: "A boy slipped" }
  ]
};

export default listeningHubData;
`;
fs.writeFileSync(path.join(w33Dir, 'listening_hub.js'), listeningHubJs, 'utf8');

const writingHubJs = `/**
 * Week 33 Gold Standard Data — Writing Hub
 * Theme: "Corridor Safety & School Care"
 */

import writing from './writing.js';

export const writingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  writing
};

export default writingHubData;
`;
fs.writeFileSync(path.join(w33Dir, 'writing_hub.js'), writingHubJs, 'utf8');

const speakingHubJs = `/**
 * Week 33 Gold Standard Data — Speaking Hub
 * Theme: "Corridor Safety & School Care"
 */

import mindmap from './mindmap.js';
import ask_ai from './ask_ai.js';

export const speakingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  mindmap,
  ask_ai
};

export default speakingHubData;
`;
fs.writeFileSync(path.join(w33Dir, 'speaking_hub.js'), speakingHubJs, 'utf8');

// 17. index.js export wrapper
const indexJs = `// Index wrapper for Week 33
import read_explore from './read.js';
import explore from './explore.js';
import new_words from './vocab.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import grammar from './grammar.js';
import daily_watch from './daily_watch.js';
import logic_lab from './logic_lab.js';
import mindmap_speaking from './mindmap.js';
import ask_ai from './ask_ai.js';
import writing from './writing.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';

import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';

export const weekData = {
  weekId: 33,
  title: "Corridor Safety & School Care",
  title_vi: "An Toàn Hành Lang & Chăm Sóc Trường Học",
  readingHub,
  listeningHub,
  writingHub,
  speakingHub,
  stations: {
    read_explore,
    explore,
    new_words,
    word_match,
    word_power,
    grammar,
    daily_watch,
    logic_lab,
    mindmap_speaking,
    ask_ai,
    writing,
    dictation,
    shadowing
  }
};

export default weekData;
`;
fs.writeFileSync(path.join(w33Dir, 'index.js'), indexJs, 'utf8');

// 18. week_33_real.js (Both flat & nested legacy export)
const realJs = `// Week 33 AI Tutor Format (Real Data)
export default {
  weekId: 33,
  title: "Corridor Safety & School Care",
  title_vi: "An Toàn Hành Lang & Chăm Sóc Trường Học",
  story_missions: [
    { id: 1, title: "Mission 1: Corridor Incident", prompt_en: "Retell what happened when a student slipped in the corridor.", prompt_vi: "Kể lại điều xảy ra khi một học sinh bị trượt chân trong hành lang." },
    { id: 2, title: "Mission 2: First Aid Care", prompt_en: "Explain how the school nurse applied first aid.", prompt_vi: "Giải thích cách y tá trường học thực hiện sơ cứu." },
    { id: 3, title: "Mission 3: Personal Safety Action", prompt_en: "Describe a safety rule you follow at school.", prompt_vi: "Mô tả một quy tắc an toàn em tuân thủ ở trường." }
  ],
  spark_talk: [
    { id: 1, title: "Card 1: Why walk carefully?", prompt_en: "Why should students walk carefully in school corridors?", prompt_vi: "Tại sao học sinh nên đi lại cẩn thận trong hành lang trường học?" },
    { id: 2, title: "Card 2: Helping injured friends", prompt_en: "How can you help a classmate who gets hurt?", prompt_vi: "Làm thế nào em có thể giúp một bạn học bị thương?" }
  ],
  target_vocab: [
    "corridor", "slipped", "nurse", "bandage", "relieved",
    "mistake", "accident", "fix", "sorry", "careful",
    "clumsy", "arm", "knee", "leg", "head",
    "cold_pack", "recover", "explain", "lesson", "terrible"
  ],
  sentences: [
    { id: 1, text: "Jake was walking carefully down the corridor.", vi: "Jake đang đi bộ cẩn thận xuống hành lang." },
    { id: 2, text: "A boy running fast slipped on the wet floor.", vi: "Một cậu bé chạy nhanh bị trượt chân trên sàn nhà ướt." },
    { id: 3, text: "Jake called the school nurse immediately.", vi: "Jake đã gọi y tế nhà trường ngay lập tức." },
    { id: 4, text: "The nurse treated the cut with a clean bandage.", vi: "Cô y tá đã điều trị vết cắt bằng một chiếc băng cá nhân sạch." },
    { id: 5, text: "Everyone felt relieved and praised Jake for safety.", vi: "Mọi người đều cảm thấy nhẹ nhõm và khen ngợi Jake vì đã giữ an toàn." }
  ]
};
`;
fs.writeFileSync(path.join(w33Dir, 'week_33_real.js'), realJs, 'utf8');
fs.writeFileSync(path.join(root, 'src', 'data', 'weeks', 'week_33_real.js'), realJs, 'utf8');

console.log('🚀 Successfully generated W33 GOLDEN WEEK v2 data files across all 26 registered sources!');
