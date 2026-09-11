/**
 * chroniclesFloor67Service.js — Dynamic Week-Aware Content Service for Floor 6 & Floor 7 Mini-Games
 *
 * Provides dynamic, curriculum-aligned content for:
 * - F6D1: Synonym Storm (synonym pairs per week)
 * - F6D2: Connector Relay (connective clauses per week)
 * - F6D3: Story Sequencer (5 chronological narrative scenes per week)
 * - F7D1: Word Forge Scramble (vocab items with safe generic fallback)
 * - F7D2: Question Quest (WH-questions matched to week narrative)
 * - F7D3: Word Class Duel (dual-class nouns/verbs per week)
 *
 * Supports Week 33 (Corridor Safety), Week 34 (The Lion & The Mouse),
 * and universal dynamic extraction / generic fallbacks for any week W01–W156.
 */

// ─── 1. CONNECTOR RELAY QUESTIONS (F6D2) ───────────────────────────────────

export const WEEK_33_CONNECTOR_QUESTIONS = [
  {
    sentence: "Jake walked carefully down the corridor _____ the floor was wet after science class.",
    answer: "because",
    options: ["because", "although", "so", "unless"],
    hint: "The second clause explains the cause/reason for walking carefully."
  },
  {
    sentence: "The nurse arrived immediately, _____ she quickly wrapped a clean bandage around his knee.",
    answer: "and",
    options: ["and", "but", "although", "because"],
    hint: "Connecting two consecutive actions in the sequence."
  },
  {
    sentence: "Tom lost his balance _____ rubber shoes normally provide good friction.",
    answer: "although",
    options: ["although", "because", "so", "unless"],
    hint: "Contrast between normal expectation and the actual outcome."
  },
  {
    sentence: "Students should always walk slowly _____ dangerous slips can be avoided.",
    answer: "so",
    options: ["so", "because", "although", "since"],
    hint: "Shows the intended result or purpose of walking slowly."
  },
  {
    sentence: "You will slip on the smooth corridor tiles _____ you wear shoes with strong rubber grip.",
    answer: "unless",
    options: ["unless", "because", "although", "so"],
    hint: "'Unless' means 'except if'."
  }
];

export const WEEK_34_CONNECTOR_QUESTIONS = [
  {
    sentence: "_____ the lion was sleeping, a tiny mouse ran across his front paw.",
    answer: "While",
    options: ["While", "Because", "So", "Unless"],
    hint: "Shows an ongoing background action interrupted by a sudden event."
  },
  {
    sentence: "The lion caught the mouse _____ let him go free because he begged for mercy.",
    answer: "but",
    options: ["but", "and", "so", "because"],
    hint: "Connects contrasting ideas: capturing the mouse vs releasing him."
  },
  {
    sentence: "He chewed through the thick ropes _____ set the trapped lion completely free.",
    answer: "and",
    options: ["and", "but", "although", "because"],
    hint: "Connects two consecutive actions in the story sequence."
  },
  {
    sentence: "The scared mouse cried loudly _____ he was afraid the mighty lion would eat him.",
    answer: "because",
    options: ["because", "although", "so", "unless"],
    hint: "Explains the reason why the little mouse cried."
  },
  {
    sentence: "_____ animals help one another in nature, the entire forest stays healthy.",
    answer: "When",
    options: ["When", "Although", "Unless", "So"],
    hint: "Indicates the condition or time when a positive outcome happens."
  }
];

export const WEEK_35_CONNECTOR_QUESTIONS = [
  {
    sentence: "_____ parents were setting up the tent, the children collected dry firewood.",
    answer: "While",
    options: ["While", "Because", "So", "Unless"],
    hint: "Shows an ongoing background action during camping."
  },
  {
    sentence: "They spotted two playful squirrels _____ they were hiking along the mountain stream.",
    answer: "while",
    options: ["while", "because", "so", "if"],
    hint: "Shows an action happening at the same time in the woods."
  },
  {
    sentence: "Dad was lighting the warm campfire _____ the golden sun sank behind the mountains.",
    answer: "when",
    options: ["when", "although", "unless", "so"],
    hint: "Indicates the specific moment an event occurred."
  },
  {
    sentence: "They decided to pack extra warm blankets _____ the forest nights can be chilly.",
    answer: "because",
    options: ["because", "although", "so", "unless"],
    hint: "Explains the reason for bringing warm blankets."
  },
  {
    sentence: "The young campers packed their backpacks early _____ they could start the hiking trail at sunrise.",
    answer: "so",
    options: ["so", "because", "although", "since"],
    hint: "Shows the purpose or intended result of packing early."
  }
];

export const GENERIC_CONNECTOR_QUESTIONS = [
  {
    sentence: "The students listened carefully _____ the teacher explained the experiment.",
    answer: "while",
    options: ["while", "because", "so", "unless"],
    hint: "Indicates an action happening at the same time."
  },
  {
    sentence: "She studied hard for the test, _____ she received the highest score.",
    answer: "so",
    options: ["so", "because", "although", "since"],
    hint: "Shows the result of studying hard."
  },
  {
    sentence: "We went outside to play _____ the weather was rather cold.",
    answer: "although",
    options: ["although", "because", "so", "unless"],
    hint: "Shows contrast between the cold weather and playing outside."
  },
  {
    sentence: "You will miss the school bus _____ you wake up on time.",
    answer: "unless",
    options: ["unless", "because", "although", "so"],
    hint: "'Unless' means 'except if'."
  },
  {
    sentence: "He opened his backpack _____ took out a pencil and notebook.",
    answer: "and",
    options: ["and", "but", "although", "because"],
    hint: "Connects two actions in sequential order."
  }
];

export function getConnectorQuestionsForWeek(weekNumber, grammarSentences = []) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_CONNECTOR_QUESTIONS;
  if (w === 34) return WEEK_34_CONNECTOR_QUESTIONS;
  if (w === 35) return WEEK_35_CONNECTOR_QUESTIONS;

  // For any other week, try to extract connector questions from passed grammar sentences
  if (Array.isArray(grammarSentences) && grammarSentences.length > 0) {
    const connectors = [
      { word: 'because', options: ['because', 'although', 'so', 'unless'], hint: 'Explains the reason or cause.' },
      { word: 'although', options: ['although', 'because', 'so', 'while'], hint: 'Shows contrast between two clauses.' },
      { word: 'while', options: ['while', 'because', 'so', 'if'], hint: 'Shows an ongoing action in the background.' },
      { word: 'when', options: ['when', 'although', 'unless', 'so'], hint: 'Indicates the time of an event.' },
      { word: 'so', options: ['so', 'because', 'although', 'since'], hint: 'Shows the result or consequence.' },
      { word: 'unless', options: ['unless', 'because', 'although', 'if'], hint: "'Unless' means 'except if'." },
      { word: 'and', options: ['and', 'but', 'although', 'because'], hint: 'Connects two actions in sequence.' },
      { word: 'but', options: ['but', 'and', 'so', 'because'], hint: 'Connects two contrasting statements.' },
    ];

    const extracted = [];
    for (const item of grammarSentences) {
      const sent = typeof item === 'string' ? item : (item.sentence || item.text || '');
      if (!sent || sent.length < 15) continue;

      for (const c of connectors) {
        const regex = new RegExp(`\\b${c.word}\\b`, 'i');
        if (regex.test(sent)) {
          const replaced = sent.replace(regex, '_____');
          const isCapital = /^[A-Z]/.test(sent.match(regex)?.[0] || '');
          const correctAns = isCapital ? c.word.charAt(0).toUpperCase() + c.word.slice(1) : c.word.toLowerCase();
          const options = c.options.map(o => isCapital ? o.charAt(0).toUpperCase() + o.slice(1) : o.toLowerCase());

          extracted.push({
            sentence: replaced,
            answer: correctAns,
            options,
            hint: c.hint
          });
          break;
        }
      }
      if (extracted.length >= 5) break;
    }

    if (extracted.length >= 5) {
      return extracted.slice(0, 5);
    }
    if (extracted.length >= 3) {
      // Pad to exactly 5 questions with generic questions to keep stable 5 rounds
      const needed = 5 - extracted.length;
      return [...extracted, ...GENERIC_CONNECTOR_QUESTIONS.slice(0, needed)];
    }
  }

  return GENERIC_CONNECTOR_QUESTIONS;
}


// ─── 2. STORY SEQUENCER SCENES (F6D3) ──────────────────────────────────────

export const WEEK_33_STORY_SCENES = [
  { id: 1, originalOrder: 1, text: "Jake was walking carefully down the school corridor after science class." },
  { id: 2, originalOrder: 2, text: "Suddenly, he lost his balance on the wet floor and slipped." },
  { id: 3, originalOrder: 3, text: "Jake stopped immediately to help his friend and called the school nurse." },
  { id: 4, originalOrder: 4, text: "The nurse arrived quickly with a clean bandage and a cold pack to treat the cut." },
  { id: 5, originalOrder: 5, text: "Everyone felt relieved, and the headmaster reminded all students never to run." },
];

export const WEEK_34_STORY_SCENES = [
  { id: 1, originalOrder: 1, text: "On a warm afternoon, the mighty lion was sleeping peacefully under the trees." },
  { id: 2, originalOrder: 2, text: "While the lion was resting, a tiny mouse ran across the lion's big front paw." },
  { id: 3, originalOrder: 3, text: "The mouse begged for mercy and promised to help the lion one day if he let him go." },
  { id: 4, originalOrder: 4, text: "A few days later, hunters trapped the lion in a strong net made of thick ropes." },
  { id: 5, originalOrder: 5, text: "The little mouse quickly chewed through the ropes and set the lion completely free." },
];

export const GENERIC_STORY_SCENES = [
  { id: 1, originalOrder: 1, text: "Early in the morning, the young explorers prepared their backpacks for the trail." },
  { id: 2, originalOrder: 2, text: "They hiked up the gentle green hill while singing cheerful camp songs." },
  { id: 3, originalOrder: 3, text: "Near the summit, they discovered a sparkling crystal stream beside the woods." },
  { id: 4, originalOrder: 4, text: "Together, they set up their camp tents and built a warm, crackling campfire." },
  { id: 5, originalOrder: 5, text: "Under the brilliant starry night sky, they roasted marshmallows and celebrated." },
];

function isPedagogicalOrInstructional(text) {
  if (!text || typeof text !== 'string') return true;
  const lower = text.toLowerCase();
  const pedagogicalMarkers = [
    'special project',
    'young authors',
    'irregular verbs',
    'past tense',
    'grammar',
    'in this exercise',
    'in this unit',
    'in this project',
    'in this lesson',
    'welcome to project',
    'welcome to clil',
    'nature\'s rules',
    'every student created',
    'share with the class',
    'scientific reasoning',
    'vital life processes',
    'classify living',
    'interactive story',
    'practice hub'
  ];
  return pedagogicalMarkers.some(marker => lower.includes(marker));
}

function hasValidChapterOrder(sentences) {
  const chapterNumbers = [];
  const wordToNum = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5 };
  for (const s of sentences) {
    const match = s.match(/chapter\s+(one|two|three|four|five|\d+)/i);
    if (match) {
      const val = wordToNum[match[1].toLowerCase()] || parseInt(match[1], 10);
      if (!isNaN(val)) {
        chapterNumbers.push(val);
      }
    }
  }
  for (let i = 1; i < chapterNumbers.length; i++) {
    if (chapterNumbers[i] <= chapterNumbers[i - 1]) {
      return false;
    }
  }
  return true;
}

function isCrossWeekOrPlaceholder(text, w) {
  if (!text || typeof text !== 'string') return true;
  const lower = text.toLowerCase();
  // Reject placeholder / dummy strings
  if (lower.includes('narrative for') || lower.includes('scene 1 narrative') || lower.includes('definition 1')) {
    return true;
  }
  // Reject pedagogical meta-text
  if (isPedagogicalOrInstructional(text)) {
    return true;
  }
  // Reject W33 corridor context when week is NOT 33
  if (w !== 33) {
    if (lower.includes('jake') || lower.includes('corridor') || lower.includes('school nurse') || lower.includes('rubber shoes')) {
      return true;
    }
  }
  // Reject W34 lion/mouse context when week is NOT 34
  if (w !== 34) {
    if (lower.includes('mighty lion') || lower.includes('lion was sleeping') || lower.includes('tiny mouse ran') || lower.includes('hunters trapped the lion') || lower.includes('chewed through the ropes')) {
      return true;
    }
  }
  return false;
}

export function getStoryScenesForWeek(weekNumber, weekData = null) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_STORY_SCENES;
  if (w === 34) return WEEK_34_STORY_SCENES;

  // Candidate scene arrays ordered by relevance (prefer stations.read_explore from read.js first!)
  const candidateArrays = [
    weekData?.stations?.read_explore?.story_scenes,
    weekData?.read_explore?.story_scenes,
    weekData?.reading_hub?.read_explore?.story_scenes,
    weekData?.readingHub?.read_explore?.story_scenes,
    weekData?.reading_hub?.story_scenes,
    weekData?.readingHub?.story_scenes,
    weekData?.story_scenes
  ];

  for (const rawScenes of candidateArrays) {
    if (Array.isArray(rawScenes) && rawScenes.length >= 5) {
      const mapped = rawScenes.slice(0, 5).map((s, idx) => ({
        id: idx + 1,
        originalOrder: idx + 1,
        text: (s.description_en || s.description || s.narration_en || s.text || s.sentence || '').replace(/\*\*/g, '').trim()
      }));

      // Verify all 5 scenes are valid, non-empty, and free from cross-week pollution, placeholders, or pedagogical jargon
      const isClean = mapped.every(s => s.text.length >= 10 && !isCrossWeekOrPlaceholder(s.text, w));
      if (isClean && hasValidChapterOrder(mapped.map(s => s.text))) {
        return mapped;
      }
    }
  }

  // If no clean pre-formed scenes exist, try dynamically splitting the week's narrative story text
  // BUT: reject non-narrative expository texts (project writing guides, CLIL classification articles)
  const narrativeText = weekData?.stations?.read_explore?.text_en
    || weekData?.read_explore?.text_en
    || weekData?.reading_hub?.read_explore?.text_en
    || weekData?.readingHub?.read_explore?.text_en
    || weekData?.reading_hub?.text_en
    || weekData?.readingHub?.text_en
    || weekData?.text_en;

  const isNonNarrativeGuide = typeof narrativeText === 'string' && (
    isPedagogicalOrInstructional(narrativeText) ||
    narrativeText.toLowerCase().includes('project 3') ||
    narrativeText.toLowerCase().includes('clil unit') ||
    narrativeText.toLowerCase().includes('classify')
  );

  if (typeof narrativeText === 'string' && narrativeText.length > 50 && !isNonNarrativeGuide) {
    const rawSentences = narrativeText
      .replace(/\n+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map(s => s.replace(/\*\*/g, '').trim())
      .filter(s => s.length >= 25 && !s.toLowerCase().startsWith('welcome to') && !isCrossWeekOrPlaceholder(s, w));

    if (rawSentences.length >= 5 && hasValidChapterOrder(rawSentences.slice(0, 5))) {
      return rawSentences.slice(0, 5).map((s, idx) => ({
        id: idx + 1,
        originalOrder: idx + 1,
        text: s
      }));
    }
  }

  // Safe universal Cambridge nature/adventure fallback (zero Jake/corridor, zero lion/mouse, coherent 1->5 chronology)
  return GENERIC_STORY_SCENES;
}


// ─── 3. QUESTION QUEST WH-QUESTIONS (F7D2) ──────────────────────────────────

export const WEEK_33_WH_QUESTIONS = [
  {
    id: 'w33_wh_1',
    sentence: "Jake was walking carefully down the school corridor after science class.",
    options: [
      { text: "What was Jake doing?", isCorrect: true },
      { text: "Where was Jake going?", isCorrect: false },
      { text: "When was Jake walking?", isCorrect: false },
    ],
    hint: "Notice the past continuous tense: 'was walking carefully'."
  },
  {
    id: 'w33_wh_2',
    sentence: "Suddenly, he lost his balance on the wet floor and slipped.",
    options: [
      { text: "What happened suddenly?", isCorrect: true },
      { text: "Why did he slip?", isCorrect: false },
      { text: "Where did he fall?", isCorrect: false },
    ],
    hint: "Look at the time adverb 'Suddenly' at the start of the event."
  },
  {
    id: 'w33_wh_3',
    sentence: "Jake stopped immediately to help his friend and called the school nurse.",
    options: [
      { text: "What did Jake do?", isCorrect: true },
      { text: "Who did Jake help?", isCorrect: false },
      { text: "When did Jake stop?", isCorrect: false },
    ],
    hint: "This question asks about the primary action Jake took."
  },
  {
    id: 'w33_wh_4',
    sentence: "The nurse arrived quickly with a clean bandage and a cold pack to treat the cut.",
    options: [
      { text: "What did the nurse bring?", isCorrect: true },
      { text: "Who did the nurse help?", isCorrect: false },
      { text: "When did the nurse arrive?", isCorrect: false },
    ],
    hint: "Notice the supplies brought: 'a clean bandage and a cold pack'."
  },
  {
    id: 'w33_wh_5',
    sentence: "Everyone felt relieved, and the headmaster reminded all students never to run.",
    options: [
      { text: "What did the headmaster remind everyone about?", isCorrect: true },
      { text: "Why did everyone feel relieved?", isCorrect: false },
      { text: "Who did the headmaster talk to?", isCorrect: false },
    ],
    hint: "Look at the advice given by the headmaster in the corridor."
  }
];

export const WEEK_34_WH_QUESTIONS = [
  {
    id: 'w34_wh_1',
    sentence: "On a warm afternoon, the mighty lion was sleeping peacefully under the trees.",
    options: [
      { text: "What was the mighty lion doing under the trees?", isCorrect: true },
      { text: "Where did the hunters go?", isCorrect: false },
      { text: "Who woke up the hunters?", isCorrect: false },
    ],
    hint: "Notice the continuous action: 'was sleeping peacefully'."
  },
  {
    id: 'w34_wh_2',
    sentence: "While the lion was resting, a tiny mouse ran across the lion's big front paw.",
    options: [
      { text: "What ran across the lion's big front paw?", isCorrect: true },
      { text: "Why was the lion running?", isCorrect: false },
      { text: "Where did the mouse sleep?", isCorrect: false },
    ],
    hint: "Ask about the subject performing the sudden action: 'a tiny mouse'."
  },
  {
    id: 'w34_wh_3',
    sentence: "The mouse begged for mercy and promised to help the lion one day if he let him go.",
    options: [
      { text: "What did the mouse promise to do?", isCorrect: true },
      { text: "When did the lion trap the mouse?", isCorrect: false },
      { text: "Who caught the hunters?", isCorrect: false },
    ],
    hint: "Focus on the promise made by the mouse: 'to help the lion'."
  },
  {
    id: 'w34_wh_4',
    sentence: "A few days later, hunters trapped the lion in a strong net made of thick ropes.",
    options: [
      { text: "Who trapped the lion in a strong net?", isCorrect: true },
      { text: "Why did the mouse roar loudly?", isCorrect: false },
      { text: "What did the lion eat?", isCorrect: false },
    ],
    hint: "Identify who set the trap: 'hunters'."
  },
  {
    id: 'w34_wh_5',
    sentence: "The little mouse quickly chewed through the ropes and set the lion completely free.",
    options: [
      { text: "How did the little mouse set the lion free?", isCorrect: true },
      { text: "Where was the hunter's house?", isCorrect: false },
      { text: "Why was the mouse afraid of the net?", isCorrect: false },
    ],
    hint: "Notice the method used: 'quickly chewed through the ropes'."
  }
];

export const GENERIC_WH_QUESTIONS = [
  {
    id: 'gen_wh_1',
    sentence: "The brave astronaut floated silently in the zero-gravity training chamber.",
    options: [
      { text: "What was the astronaut doing in the chamber?", isCorrect: true },
      { text: "Where did the rocket launch?", isCorrect: false },
      { text: "Why was the mission cancelled?", isCorrect: false },
    ],
    hint: "Ask about the activity: 'floated silently'."
  },
  {
    id: 'gen_wh_2',
    sentence: "Suddenly, the warning buzzer beeped because the oxygen gauge fluctuated.",
    options: [
      { text: "Why did the warning buzzer beep?", isCorrect: true },
      { text: "Who pressed the emergency button?", isCorrect: false },
      { text: "When did the rocket return?", isCorrect: false },
    ],
    hint: "Look for the cause introduced by 'because'."
  },
  {
    id: 'gen_wh_3',
    sentence: "The chief engineer calibrated the solar panels before the lunar eclipse.",
    options: [
      { text: "What did the chief engineer calibrate?", isCorrect: true },
      { text: "Who discovered the new planet?", isCorrect: false },
      { text: "Why did the lights flicker?", isCorrect: false },
    ],
    hint: "Focus on the object being calibrated: 'the solar panels'."
  },
  {
    id: 'gen_wh_4',
    sentence: "Dr. Nova discovered a sparkling crystal deep inside the lunar crater.",
    options: [
      { text: "Where did Dr. Nova find the crystal?", isCorrect: true },
      { text: "How many crew members landed?", isCorrect: false },
      { text: "When was the satellite launched?", isCorrect: false },
    ],
    hint: "Identify the location: 'deep inside the lunar crater'."
  },
  {
    id: 'gen_wh_5',
    sentence: "The mission commander awarded gold badges to all crew members for courage.",
    options: [
      { text: "Why did the commander award gold badges?", isCorrect: true },
      { text: "Where was the command centre?", isCorrect: false },
      { text: "What time was the landing?", isCorrect: false },
    ],
    hint: "Look for the reason: 'for courage'."
  }
];

export function getWhQuestionsForWeek(weekNumber, weekData = null) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_WH_QUESTIONS;
  if (w === 34) return WEEK_34_WH_QUESTIONS;

  // Try extracting comprehension_questions from weekData if available
  const compQuestions = weekData?.stations?.read_explore?.comprehension_questions
    || weekData?.read_explore?.comprehension_questions
    || weekData?.reading_hub?.read_explore?.comprehension_questions
    || weekData?.readingHub?.read_explore?.comprehension_questions;

  if (Array.isArray(compQuestions) && compQuestions.length >= 3) {
    return compQuestions.slice(0, 5).map((q, idx) => {
      const opts = (q.options || []).map(optText => ({
        text: optText,
        isCorrect: optText === q.answer
      }));
      return {
        id: `wh_${w}_${idx + 1}`,
        sentence: q.question_en || q.question || '',
        options: opts,
        hint: q.hint || "Select the most accurate response based on the story."
      };
    });
  }

  return GENERIC_WH_QUESTIONS;
}


// ─── 4. WORD CLASS DUEL (F7D3) ──────────────────────────────────────────────

export const WEEK_33_WORD_CLASS_DUEL = [
  {
    id: 'w33_wcd_1',
    word: 'grip',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'grip' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Your rubber shoes grip firmly on dry corridor tiles.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "Rubber gives a strong grip on clean floors.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "Plastic soles with no grip can cause accidents.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "The friendly grip between soles and floor keeps you safe.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Look for the sentence where 'grip' describes an action done by the shoes."
  },
  {
    id: 'w33_wcd_2',
    word: 'slide',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'slide' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "Water turns safe corridors into a dangerous slide.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Smooth soles slide easily across wet tiles.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "Children might slide and fall when running.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "Friction stops you before you slide too far.", role: 'VERB', isCorrect: false },
    ],
    hint: "Notice 'a dangerous slide' — 'slide' is preceded by an article and adjective."
  },
  {
    id: 'w33_wcd_3',
    word: 'care',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'care' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Teachers care deeply about student safety.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "Take great care when walking down the corridor.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "School safety and care are our responsibility.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "The nurse provided gentle medical care.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Find the sentence where 'care' tells what teachers do."
  },
  {
    id: 'w33_wcd_4',
    word: 'help',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'help' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "Jake called the nurse for immediate help.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Good students help each other when someone falls.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "Cold packs help reduce painful swelling.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "Warning signs help students stay alert.", role: 'VERB', isCorrect: false },
    ],
    hint: "'immediate help' — 'help' functions as the object of the preposition 'for'."
  }
];

export const WEEK_34_WORD_CLASS_DUEL = [
  {
    id: 'w34_wcd_1',
    word: 'trap',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'trap' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Clever hunters trap wild animals with strong rope nets.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "The mighty lion fell into a hidden trap in the forest.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "The tiny mouse saw a heavy wooden trap on the path.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "The rope trap held the beast firmly between the trees.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Look for the sentence where 'trap' describes the action done by hunters."
  },
  {
    id: 'w34_wcd_2',
    word: 'roar',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'roar' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "The trapped lion let out a terrifying roar across the woods.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Mighty lions roar loudly when they sense nearby danger.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "Angry beasts roar to protect their green territory.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "Fierce animals roar during stormy jungle nights.", role: 'VERB', isCorrect: false },
    ],
    hint: "Notice 'a terrifying roar' — 'roar' is preceded by an article and adjective."
  },
  {
    id: 'w34_wcd_3',
    word: 'help',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'help' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Tiny woodland creatures can help giant beasts in trouble.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "The wounded animal called out for urgent help.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "The mouse offered faithful help to the forest king.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "True forest friends appreciate every bit of help.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Find the sentence where 'help' describes the action done by woodland creatures."
  },
  {
    id: 'w34_wcd_4',
    word: 'promise',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'promise' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "The brave mouse remembered his solemn promise to the lion.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Kind animals promise to protect one another from traps.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "Good companions promise never to break their trust.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "They promise to guard the secret path to the river.", role: 'VERB', isCorrect: false },
    ],
    hint: "'his solemn promise' — 'promise' functions as a noun preceded by a possessive pronoun."
  }
];

export const GENERIC_WORD_CLASS_DUEL = [
  {
    id: 'gen_wcd_1',
    word: 'light',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'light' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Campers light a warm campfire when the sun goes down.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "The bright light from the lantern illuminated the path.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "Morning light entered the bedroom through the curtains.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "Turn on the reading light so you can see clearly.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Look for the sentence where 'light' tells what campers do to a fire."
  },
  {
    id: 'gen_wcd_2',
    word: 'watch',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'watch' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "My grandfather gave me a shiny silver watch for my birthday.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Students watch the exciting science demonstration closely.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "We often watch birds building their nests in spring.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "Astronomers watch the starry sky through large telescopes.", role: 'VERB', isCorrect: false },
    ],
    hint: "Notice 'a shiny silver watch' — refers to an object worn on the wrist."
  },
  {
    id: 'gen_wcd_3',
    word: 'call',
    targetRole: 'VERB',
    prompt: "Which sentence uses 'call' as a VERB (hành động)?",
    cards: [
      { id: 'c1', text: "Parents call their children when dinner is ready.", role: 'VERB', isCorrect: true },
      { id: 'c2', text: "I received an important phone call this morning.", role: 'NOUN', isCorrect: false },
      { id: 'c3', text: "The bird gave a sharp warning call from the branches.", role: 'NOUN', isCorrect: false },
      { id: 'c4', text: "It was a close call, but everyone arrived safely.", role: 'NOUN', isCorrect: false },
    ],
    hint: "Find the sentence where 'call' describes what parents do."
  },
  {
    id: 'gen_wcd_4',
    word: 'plant',
    targetRole: 'NOUN',
    prompt: "Which sentence uses 'plant' as a NOUN (danh từ)?",
    cards: [
      { id: 'c1', text: "The green plant on the windowsill needs fresh water.", role: 'NOUN', isCorrect: true },
      { id: 'c2', text: "Gardeners plant sunflower seeds in early summer.", role: 'VERB', isCorrect: false },
      { id: 'c3', text: "Students plant young trees to celebrate Earth Day.", role: 'VERB', isCorrect: false },
      { id: 'c4', text: "Farmers plant rows of corn across the fertile field.", role: 'VERB', isCorrect: false },
    ],
    hint: "'The green plant' — 'plant' is the subject noun naming a living thing."
  }
];

export function getWordClassDuelForWeek(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_WORD_CLASS_DUEL;
  if (w === 34) return WEEK_34_WORD_CLASS_DUEL;
  return GENERIC_WORD_CLASS_DUEL;
}


// ─── 5. SYNONYM STORM PAIRS (F6D1) ──────────────────────────────────────────

export const WEEK_33_SYNONYM_PAIRS = [
  { word: 'careful', targetRole: 'synonym', match: 'cautious', distractors: ['reckless', 'hasty', 'noisy'] },
  { word: 'prevent', targetRole: 'synonym', match: 'stop', distractors: ['cause', 'allow', 'start'] },
  { word: 'slipped', targetRole: 'synonym', match: 'slid', distractors: ['climbed', 'jumped', 'stood'] },
  { word: 'clean', targetRole: 'synonym', match: 'pure', distractors: ['dirty', 'muddy', 'dusty'] },
  { word: 'rapid', targetRole: 'synonym', match: 'quick', distractors: ['slow', 'delayed', 'heavy'] },
  { word: 'safe', targetRole: 'synonym', match: 'secure', distractors: ['risky', 'broken', 'wild'] },
  { word: 'help', targetRole: 'synonym', match: 'assist', distractors: ['harm', 'ignore', 'block'] },
  { word: 'firmly', targetRole: 'synonym', match: 'tightly', distractors: ['loosely', 'weakly', 'softly'] },
];

export const WEEK_34_SYNONYM_PAIRS = [
  { word: 'mighty', targetRole: 'synonym', match: 'powerful', distractors: ['weak', 'tiny', 'gentle'] },
  { word: 'tiny', targetRole: 'synonym', match: 'small', distractors: ['huge', 'giant', 'heavy'] },
  { word: 'rescue', targetRole: 'synonym', match: 'save', distractors: ['trap', 'harm', 'lose'] },
  { word: 'scared', targetRole: 'synonym', match: 'afraid', distractors: ['brave', 'proud', 'bold'] },
  { word: 'glad', targetRole: 'synonym', match: 'happy', distractors: ['angry', 'sad', 'upset'] },
  { word: 'quick', targetRole: 'synonym', match: 'fast', distractors: ['slow', 'lazy', 'heavy'] },
  { word: 'fierce', targetRole: 'synonym', match: 'wild', distractors: ['tame', 'calm', 'sweet'] },
  { word: 'promise', targetRole: 'synonym', match: 'pledge', distractors: ['forget', 'break', 'refuse'] },
];

export const GENERIC_SYNONYM_PAIRS = [
  { word: 'brave', targetRole: 'synonym', match: 'courageous', distractors: ['fearful', 'timid', 'weak'] },
  { word: 'clever', targetRole: 'synonym', match: 'smart', distractors: ['clumsy', 'silly', 'slow'] },
  { word: 'discover', targetRole: 'synonym', match: 'find', distractors: ['lose', 'hide', 'miss'] },
  { word: 'huge', targetRole: 'synonym', match: 'enormous', distractors: ['narrow', 'tiny', 'little'] },
  { word: 'calm', targetRole: 'synonym', match: 'peaceful', distractors: ['stormy', 'noisy', 'angry'] },
];

export function getSynonymPairsForWeek(weekNumber) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_SYNONYM_PAIRS;
  if (w === 34) return WEEK_34_SYNONYM_PAIRS;
  return GENERIC_SYNONYM_PAIRS;
}
