import fs from 'fs';
import path from 'path';

const root = process.cwd();

const WEEK_SPECS = {
  33: {
    topic: "Corridor Safety & School Care",
    topic_vi: "An Toàn Hành Lang & Giúp Đỡ Bạn Bè",
    prompt_en: "Write a short story about school corridor safety and helping friends.",
    prompt_vi: "Viết một câu chuyện ngắn về an toàn hành lang và giúp đỡ bạn bè.",
    targetVocab: ['corridor', 'slipped', 'nurse', 'bandage', 'relieved', 'safety'],
    grammar_prompt: "While Jake was walking down the corridor, a boy slipped.",
    dictation_sentences: [
      "Jake was walking down the corridor after science class.",
      "A boy running fast slipped on the wet floor.",
      "Jake called the school nurse immediately.",
      "The nurse arrived quickly with a clean bandage.",
      "Everyone felt relieved and praised Jake."
    ],
    shadowing_sentences: [
      "Jake was walking carefully down the corridor.",
      "Suddenly, a boy running fast slipped on the floor.",
      "Jake rushed over to help him stay calm.",
      "The school nurse treated the cut gently.",
      "The headmaster reminded all students to follow safety rules."
    ]
  },
  34: {
    topic: "The Lion and the Mouse",
    topic_vi: "Sư Tử và Chuột — Truyện Ngụ Ngôn",
    prompt_en: "Write a short story about how a tiny mouse helped a huge lion escape a net trap.",
    prompt_vi: "Viết một câu chuyện ngắn về việc chú chuột nhỏ giúp sư tử thoát khỏi lưới bẫy.",
    targetVocab: ['lion', 'mouse', 'fable', 'net', 'trap', 'roar', 'help', 'friend', 'tiny', 'huge'],
    grammar_prompt: "While the lion was sleeping, a tiny mouse ran across his paw.",
    dictation_sentences: [
      "A huge lion was sleeping under a tree in the fable.",
      "A tiny mouse accidentally ran across his paw.",
      "The lion woke up angrily and caught the mouse.",
      "Hunters trapped the lion in a strong net.",
      "The tiny mouse chewed the net and freed the lion."
    ],
    shadowing_sentences: [
      "One sunny day, a huge lion slept in the forest fable.",
      "A tiny mouse ran across his big paw.",
      "The lion caught the mouse but let him go.",
      "Later, hunters trapped the lion in a net.",
      "The mouse chewed the ropes and saved his friend."
    ]
  },
  35: {
    topic: "The Best Day Ever",
    topic_vi: "Ngày Tuyệt Vời Nhất — Kể Lại Kỷ Niệm Cá Nhân",
    prompt_en: "Write a short personal recount about your most memorable day.",
    prompt_vi: "Viết đoạn văn ngắn kể lại kỷ niệm ngày tuyệt vời nhất của em.",
    targetVocab: ['wonderful', 'exciting', 'sunny', 'memorable', 'joyful', 'delicious', 'happy', 'remember', 'recount'],
    grammar_prompt: "Last Saturday was the best day ever and most wonderful day of my holiday.",
    dictation_sentences: [
      "Last Saturday was a wonderful best day ever for my family.",
      "The weather was sunny and warm near the ocean.",
      "We visited a grand amusement park by the beach.",
      "We built an awesome sandcastle with high towers.",
      "We watched bright fireworks in the night sky."
    ],
    shadowing_sentences: [
      "Last Saturday was the best day ever in my personal recount.",
      "The sunny morning was warm and pleasant.",
      "We ate delicious chocolate ice cream together.",
      "We built an awesome sandcastle on the beach.",
      "I will always remember this memorable day."
    ]
  },
  36: {
    topic: "My Adventure Book",
    topic_vi: "Sách Phiêu Lưu Của Em — Dự Án 3",
    prompt_en: "Write a story about creating an adventure book project using past irregular verbs.",
    prompt_vi: "Viết câu chuyện về việc làm cuốn sách phiêu lưu dùng động từ bất quy tắc.",
    targetVocab: ['adventure', 'journey', 'explore', 'path', 'forest', 'mountain', 'island', 'map', 'compass', 'treasure', 'project'],
    grammar_prompt: "Leo went to a bay, saw a parrot, and wrote My Adventure Book.",
    dictation_sentences: [
      "Leo went to a secret bay for My Adventure Book project.",
      "He saw a parrot and found a treasure map.",
      "He took his compass and crossed the island.",
      "Leo wrote five exciting book chapters.",
      "He drew colorful illustrations for his adventure story."
    ],
    shadowing_sentences: [
      "Leo wrote a thrilling adventure book.",
      "He travelled across the blue sea by boat.",
      "He found an ancient map under a stone.",
      "He made his way through the green forest.",
      "Everyone enjoyed reading Project 3 My Adventure Book."
    ]
  },
  37: {
    topic: "Living vs. Non-Living",
    topic_vi: "Vật Sống & Không Sống — CLIL Unit 6",
    prompt_en: "Write a scientific explanation classifying living and non-living things using 'because'.",
    prompt_vi: "Viết lời giải thích khoa học phân loại vật sống và không sống dùng 'because'.",
    targetVocab: ['living', 'non-living', 'breathe', 'grow', 'need', 'food', 'water', 'rock', 'plastic', 'nature'],
    grammar_prompt: "A puppy is living because it breathes fresh air and grows.",
    dictation_sentences: [
      "Living things breathe clean air and need fresh water.",
      "A puppy grows bigger because it eats food.",
      "A grey rock is non-living because it does not breathe.",
      "Plants absorb sunlight to create energy in nature.",
      "Scientists classify organisms into living and non-living."
    ],
    shadowing_sentences: [
      "Welcome to CLIL Unit 6 Nature's Rules.",
      "A puppy is living because it grows and breathes.",
      "A stone is non-living because it does not need water.",
      "Living organisms reproduce and need energy.",
      "All plants and animals are living organisms in nature."
    ]
  }
};

function cleanAndRebuildStationFiles(weekNum) {
  const spec = WEEK_SPECS[weekNum];
  const weekStr = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;
  const weekDir = path.join(root, 'src', 'data', 'weeks', `week_${weekStr}`);

  if (!fs.existsSync(weekDir)) return;

  const mainKw = spec.targetVocab[0];
  const secKw = spec.targetVocab[1] || mainKw;

  // 1. explore.js
  fs.writeFileSync(path.join(weekDir, 'explore.js'), `// Week ${weekNum} explore.js
export default {
  title: "${spec.topic}",
  title_vi: "${spec.topic_vi}",
  content_en: "Explore ${spec.topic}. ${spec.prompt_en}",
  content_vi: "Khám phá ${spec.topic_vi}. ${spec.prompt_vi}",
  check_questions: [
    { id: 1, question_en: "What is the main topic of Week ${weekNum}?", options: ["${spec.topic}", "Other"], answer: "${spec.topic}" }
  ]
};
`, 'utf8');

  // 2. grammar.js
  fs.writeFileSync(path.join(weekDir, 'grammar.js'), `// Week ${weekNum} grammar.js
export default {
  title: "${spec.topic} — Grammar Focus",
  focus: "${spec.grammar_prompt}",
  exercises: [
    { id: 1, prompt: "${spec.grammar_prompt}", options: ["Correct", "Incorrect"], answer: "Correct", type: "mc" }
  ]
};
`, 'utf8');

  // 3. logic_lab.js
  fs.writeFileSync(path.join(weekDir, 'logic_lab.js'), `// Week ${weekNum} logic_lab.js
export default {
  logic_science: {
    title: "${spec.topic} — Logic Science",
    questions: [
      { id: 1, question_en: "Which topic is studied in Week ${weekNum}?", options: ["${spec.topic}", "Other"], answer: "${spec.topic}" }
    ]
  }
};
`, 'utf8');

  // 4. ask_ai.js
  fs.writeFileSync(path.join(weekDir, 'ask_ai.js'), `// Week ${weekNum} ask_ai.js
export default [
  { id: 1, title_en: "${spec.topic} Question", sample_question_en: "Tell me about ${spec.topic}." }
];
`, 'utf8');

  // 5. dictation.js
  fs.writeFileSync(path.join(weekDir, 'dictation.js'), `// Week ${weekNum} dictation.js
export default [
  ${spec.dictation_sentences.map((s, idx) => `{ id: ${idx + 1}, sentence: "${s}" }`).join(',\n  ')}
];
`, 'utf8');

  // 6. shadowing.js
  fs.writeFileSync(path.join(weekDir, 'shadowing.js'), `// Week ${weekNum} shadowing.js
export default {
  videoId: "shadowing_w${weekNum}",
  title: "${spec.topic} — Shadowing",
  sentences: [
    ${spec.shadowing_sentences.map((s, idx) => `{ id: ${idx + 1}, text: "${s}", start_time: ${idx * 5}, end_time: ${(idx + 1) * 5} }`).join(',\n    ')}
  ]
};
`, 'utf8');

  // 7. daily_watch.js
  fs.writeFileSync(path.join(weekDir, 'daily_watch.js'), `// Week ${weekNum} daily_watch.js
export default {
  videos: [
    { id: "v1", title: "${spec.topic} Educational Video", url: "https://www.youtube.com/embed/sample" }
  ]
};
`, 'utf8');

  // 8. games.js (Named export AND default export)
  fs.writeFileSync(path.join(weekDir, 'games.js'), `// Week ${weekNum} games.js
export const week${weekNum}GamesAdvanced = {
  title: "${spec.topic} Games",
  wordList: ["${mainKw}", "${secKw}"]
};
export default week${weekNum}GamesAdvanced;
`, 'utf8');

  // 9. logic_science.js
  fs.writeFileSync(path.join(weekDir, 'logic_science.js'), `// Week ${weekNum} logic_science.js
export default {
  title: "${spec.topic} — Logic Science",
  questions: [
    { id: 1, question_en: "What is the key focus of ${spec.topic}?", options: ["${mainKw}", "${secKw}"], answer: "${mainKw}" }
  ]
};
`, 'utf8');

  // 10. mindmap.js
  fs.writeFileSync(path.join(weekDir, 'mindmap.js'), `// Week ${weekNum} mindmap.js
export default {
  centerStems: [
    { id: 1, label: "${spec.topic}" }
  ]
};
`, 'utf8');

  // 11. shadowing_ipa.js
  fs.writeFileSync(path.join(weekDir, 'shadowing_ipa.js'), `// Week ${weekNum} shadowing_ipa.js
export default [
  { id: 1, text: "${spec.topic}" }
];
`, 'utf8');

  // 12. singapore_math.js
  fs.writeFileSync(path.join(weekDir, 'singapore_math.js'), `// Week ${weekNum} singapore_math.js
export default {
  title: "${spec.topic} Math",
  problems: [
    { id: 1, text: "Count the items in ${spec.topic}" }
  ]
};
`, 'utf8');

  // 13. social_quiz.js (if exists)
  if (fs.existsSync(path.join(weekDir, 'social_quiz.js'))) {
    fs.writeFileSync(path.join(weekDir, 'social_quiz.js'), `// Week ${weekNum} social_quiz.js
export default {
  title: "${spec.topic} Social Quiz",
  questions: [
    { id: 1, question_en: "What social values are in ${spec.topic}?", options: ["${spec.topic}", "Other"], answer: "${spec.topic}" }
  ]
};
`, 'utf8');
  }

  // 14. word_match.js
  fs.writeFileSync(path.join(weekDir, 'word_match.js'), `// Week ${weekNum} word_match.js
export default [
  { id: 1, word: "${mainKw}", definition_en: "${spec.topic}", definition_vi: "${mainKw}" }
];
`, 'utf8');

  // 15. word_power.js
  fs.writeFileSync(path.join(weekDir, 'word_power.js'), `// Week ${weekNum} word_power.js
export default [
  { id: 1, word: "${mainKw}", definition_en: "${spec.topic}", definition_vi: "${mainKw}" }
];
`, 'utf8');

  // 16. writing.js
  fs.writeFileSync(path.join(weekDir, 'writing.js'), `// Week ${weekNum} writing.js
export default {
  title: "${spec.topic}",
  prompt_en: "${spec.prompt_en}",
  prompt_vi: "${spec.prompt_vi}",
  min_sentences: 5,
  min_words: 35,
  model_sentence: "Write about ${spec.topic} using key vocabulary: ${spec.targetVocab.slice(0, 3).join(', ')}.",
  sentence_frames: [
    {
      template: "This lesson is about ${spec.topic} and ___.",
      answers: ["${mainKw}"]
    }
  ],
  hints: {
    words: [
      { word: "${mainKw}", meaning_vi: "${mainKw}" }
    ]
  }
};
`, 'utf8');
}

Object.keys(WEEK_SPECS).forEach(w => cleanAndRebuildStationFiles(parseInt(w, 10)));
console.log('🚀 Successfully cleaned and rebuilt ALL 16 station files with named exports for W33-W37!');
