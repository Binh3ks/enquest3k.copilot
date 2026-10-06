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

// ─── 1. CONNECTOR RELAY QUESTIONS (F6D2: CONNECTOR BURST) ──────────────────

export const DEFAULT_CONNECTOR_QUESTIONS = [
  {
    sentence: "Jake walked slowly _____ floors were wet.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "Jake walked slowly because floors were wet."
  },
  {
    sentence: "Tom lost balance _____ rubber gripped well.",
    answer: "although",
    options: ["although","because","so"],
    fullSentence: "Tom lost balance although rubber gripped well."
  },
  {
    sentence: "Walk very carefully, _____ you will slip.",
    answer: "or",
    options: ["or","because","although"],
    fullSentence: "Walk very carefully, or you will slip."
  },
  {
    sentence: "She cleaned cuts, _____ she applied cream.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "She cleaned cuts, and she applied cream."
  },
  {
    sentence: "Wear rubber sneakers _____ floors are slick.",
    answer: "when",
    options: ["when","so","although"],
    fullSentence: "Wear rubber sneakers when floors are slick."
  },
  {
    sentence: "You will fall _____ you hold rails.",
    answer: "unless",
    options: ["unless","because","so"],
    fullSentence: "You will fall unless you hold rails."
  },
  {
    sentence: "Water spilled down, _____ tiles became slippery.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "Water spilled down, so tiles became slippery."
  },
  {
    sentence: "Jake slipped down _____ he looked away.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "Jake slipped down because he looked away."
  },
  {
    sentence: "Apply cold ice _____ bruises swell up.",
    answer: "when",
    options: ["when","so","although"],
    fullSentence: "Apply cold ice when bruises swell up."
  },
  {
    sentence: "Hold handrails _____ you walk down.",
    answer: "while",
    options: ["while","so","although"],
    fullSentence: "Hold handrails while you walk down."
  },
  {
    sentence: "He called the nurse, _____ she arrived.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "He called the nurse, and she arrived."
  },
  {
    sentence: "Wipe the floor, _____ someone slips down.",
    answer: "before",
    options: ["before","so","although"],
    fullSentence: "Wipe the floor, before someone slips down."
  }
];

export const WEEK_33_CONNECTOR_QUESTIONS = [
  {
    sentence: "The floor was wet, _____ Jake slipped.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "The floor was wet, so Jake slipped."
  },
  {
    sentence: "Hold the handrail _____ you walk down.",
    answer: "while",
    options: ["while","so","although"],
    fullSentence: "Hold the handrail while you walk down."
  },
  {
    sentence: "She cleaned cuts, _____ she applied cream.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "She cleaned cuts, and she applied cream."
  },
  {
    sentence: "Jake walked slowly _____ tiles were slick.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "Jake walked slowly because tiles were slick."
  },
  {
    sentence: "Wear rubber shoes, _____ you might slip.",
    answer: "or",
    options: ["or","because","although"],
    fullSentence: "Wear rubber shoes, or you might slip."
  },
  {
    sentence: "You will slip _____ you walk carefully.",
    answer: "unless",
    options: ["unless","because","so"],
    fullSentence: "You will slip unless you walk carefully."
  },
  {
    sentence: "Put on ice _____ swelling goes down.",
    answer: "until",
    options: ["until","so","although"],
    fullSentence: "Put on ice until swelling goes down."
  },
  {
    sentence: "Water spilled out, _____ we cleaned it.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "Water spilled out, so we cleaned it."
  },
  {
    sentence: "Jake rested quietly _____ pain went away.",
    answer: "until",
    options: ["until","so","although"],
    fullSentence: "Jake rested quietly until pain went away."
  },
  {
    sentence: "The bell rang, _____ students walked out.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "The bell rang, and students walked out."
  },
  {
    sentence: "He wore boots _____ it rained outside.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "He wore boots because it rained outside."
  },
  {
    sentence: "Tom slipped down _____ he was careful.",
    answer: "although",
    options: ["although","because","so"],
    fullSentence: "Tom slipped down although he was careful."
  }
];

export const WEEK_34_CONNECTOR_QUESTIONS = [
  {
    sentence: "The lion slept _____ a mouse ran.",
    answer: "when",
    options: ["when","so","because"],
    fullSentence: "The lion slept when a mouse ran."
  },
  {
    sentence: "Mice chewed ropes, _____ the lion escaped.",
    answer: "so",
    options: ["so","although","because"],
    fullSentence: "Mice chewed ropes, so the lion escaped."
  },
  {
    sentence: "The lion caught him, _____ he freed him.",
    answer: "but",
    options: ["but","so","because"],
    fullSentence: "The lion caught him, but he freed him."
  },
  {
    sentence: "The mouse begged _____ he was scared.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "The mouse begged because he was scared."
  },
  {
    sentence: "Hunters set nets, _____ they caught him.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "Hunters set nets, and they caught him."
  },
  {
    sentence: "He roared loud _____ the ropes held.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "He roared loud because the ropes held."
  },
  {
    sentence: "The lion roared, _____ the mouse ran.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "The lion roared, so the mouse ran."
  },
  {
    sentence: "The mouse was small, _____ he was brave.",
    answer: "but",
    options: ["but","so","because"],
    fullSentence: "The mouse was small, but he was brave."
  },
  {
    sentence: "He escaped _____ the ropes were cut.",
    answer: "after",
    options: ["after","so","although"],
    fullSentence: "He escaped after the ropes were cut."
  },
  {
    sentence: "He kept chewing _____ the ropes broke.",
    answer: "until",
    options: ["until","because","so"],
    fullSentence: "He kept chewing until the ropes broke."
  },
  {
    sentence: "The lion smiled, _____ he thanked him.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "The lion smiled, and he thanked him."
  },
  {
    sentence: "He spared him _____ he was tiny.",
    answer: "although",
    options: ["although","because","so"],
    fullSentence: "He spared him although he was tiny."
  }
];

export const WEEK_35_CONNECTOR_QUESTIONS = [
  {
    sentence: "Campers set tents _____ darkness fell down.",
    answer: "before",
    options: ["before","so","although"],
    fullSentence: "Campers set tents before darkness fell down."
  },
  {
    sentence: "They lit a fire _____ nights were chilly.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "They lit a fire because nights were chilly."
  },
  {
    sentence: "It was cold, _____ the campfire gave warmth.",
    answer: "but",
    options: ["but","so","because"],
    fullSentence: "It was cold, but the campfire gave warmth."
  },
  {
    sentence: "Rain poured down, _____ everyone ran inside.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "Rain poured down, so everyone ran inside."
  },
  {
    sentence: "Lock the food, _____ bears will come.",
    answer: "or",
    options: ["or","because","although"],
    fullSentence: "Lock the food, or bears will come."
  },
  {
    sentence: "You will shiver _____ you wear jackets.",
    answer: "unless",
    options: ["unless","because","so"],
    fullSentence: "You will shiver unless you wear jackets."
  },
  {
    sentence: "Children sang songs _____ dad cooked stew.",
    answer: "while",
    options: ["while","so","although"],
    fullSentence: "Children sang songs while dad cooked stew."
  },
  {
    sentence: "He brought flashlights _____ trails were dark.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "He brought flashlights because trails were dark."
  },
  {
    sentence: "Stars shone bright _____ clouds blew away.",
    answer: "when",
    options: ["when","so","although"],
    fullSentence: "Stars shone bright when clouds blew away."
  },
  {
    sentence: "They ate snacks _____ they cooked dinner.",
    answer: "after",
    options: ["after","so","although"],
    fullSentence: "They ate snacks after they cooked dinner."
  },
  {
    sentence: "Boil river water _____ you drink it.",
    answer: "before",
    options: ["before","so","although"],
    fullSentence: "Boil river water before you drink it."
  },
  {
    sentence: "They hiked far _____ their legs ached.",
    answer: "although",
    options: ["although","because","so"],
    fullSentence: "They hiked far although their legs ached."
  }
];

export const WEEK_36_CONNECTOR_QUESTIONS = [
  {
    sentence: "The sun shines, _____ space is dark.",
    answer: "but",
    options: ["but","so","because"],
    fullSentence: "The sun shines, but space is dark."
  },
  {
    sentence: "The rocket launched _____ engines fired hot.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "The rocket launched because engines fired hot."
  },
  {
    sentence: "Fuel ran out, _____ thrusters shut down.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "Fuel ran out, so thrusters shut down."
  },
  {
    sentence: "Wear space suits _____ you go outside.",
    answer: "when",
    options: ["when","until","or"],
    fullSentence: "Wear space suits when you go outside."
  },
  {
    sentence: "You cannot breathe _____ you wear helmets.",
    answer: "unless",
    options: ["unless","because","so"],
    fullSentence: "You cannot breathe unless you wear helmets."
  },
  {
    sentence: "Astronauts float free _____ gravity is zero.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "Astronauts float free because gravity is zero."
  },
  {
    sentence: "The telescope turned, _____ it spotted stars.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "The telescope turned, and it spotted stars."
  },
  {
    sentence: "He looked out _____ the ship orbited.",
    answer: "while",
    options: ["while","so","although"],
    fullSentence: "He looked out while the ship orbited."
  },
  {
    sentence: "The comet flew, _____ it left trails.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "The comet flew, and it left trails."
  },
  {
    sentence: "The moon has craters _____ rocks hit it.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "The moon has craters because rocks hit it."
  },
  {
    sentence: "Check your oxygen, _____ you might faint.",
    answer: "or",
    options: ["or","because","although"],
    fullSentence: "Check your oxygen, or you might faint."
  },
  {
    sentence: "The ship stayed cold _____ the sun shone.",
    answer: "although",
    options: ["although","because","so"],
    fullSentence: "The ship stayed cold although the sun shone."
  }
];

export const WEEK_37_CONNECTOR_QUESTIONS = [
  {
    sentence: "Fish swim deep _____ the water cools.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "Fish swim deep because the water cools."
  },
  {
    sentence: "The whale jumped, _____ it splashed down.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "The whale jumped, and it splashed down."
  },
  {
    sentence: "Sharks swim constantly, _____ gills need water.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "Sharks swim constantly, because gills need water."
  },
  {
    sentence: "Coral looks stony, _____ it is alive.",
    answer: "but",
    options: ["but","so","because"],
    fullSentence: "Coral looks stony, but it is alive."
  },
  {
    sentence: "The crab hid, _____ a shark swam.",
    answer: "when",
    options: ["when","so","although"],
    fullSentence: "The crab hid, when a shark swam."
  },
  {
    sentence: "The tide went out, _____ seashells were exposed.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "The tide went out, so seashells were exposed."
  },
  {
    sentence: "Dolphins call out _____ they hunt together.",
    answer: "while",
    options: ["while","so","although"],
    fullSentence: "Dolphins call out while they hunt together."
  },
  {
    sentence: "Wear swim fins, _____ you swim faster.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "Wear swim fins, so you swim faster."
  },
  {
    sentence: "Protect reefs, _____ corals get hurt.",
    answer: "or",
    options: ["or","because","although"],
    fullSentence: "Protect reefs, or corals get hurt."
  },
  {
    sentence: "The squid shot ink, _____ it escaped.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "The squid shot ink, and it escaped."
  },
  {
    sentence: "Water was dark, _____ the fish saw.",
    answer: "although",
    options: ["although","because","so"],
    fullSentence: "Water was dark, although the fish saw."
  },
  {
    sentence: "The turtle stayed down _____ air was needed.",
    answer: "until",
    options: ["until","so","although"],
    fullSentence: "The turtle stayed down until air was needed."
  }
];

export const GENERIC_CONNECTOR_QUESTIONS = [
  {
    sentence: "Students listened _____ the teacher spoke.",
    answer: "while",
    options: ["while","so","although"],
    fullSentence: "Students listened while the teacher spoke."
  },
  {
    sentence: "She studied, _____ she passed the test.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "She studied, so she passed the test."
  },
  {
    sentence: "The weather was cold, _____ we played outside.",
    answer: "but",
    options: ["but","so","because"],
    fullSentence: "The weather was cold, but we played outside."
  },
  {
    sentence: "Run to the bus, _____ you miss it.",
    answer: "or",
    options: ["or","because","although"],
    fullSentence: "Run to the bus, or you miss it."
  },
  {
    sentence: "He opened his bag, _____ he took pens.",
    answer: "and",
    options: ["and","but","because"],
    fullSentence: "He opened his bag, and he took pens."
  },
  {
    sentence: "The match stopped _____ rain fell hard.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "The match stopped because rain fell hard."
  },
  {
    sentence: "She took an umbrella _____ skies darkened.",
    answer: "because",
    options: ["because","so","although"],
    fullSentence: "She took an umbrella because skies darkened."
  },
  {
    sentence: "He practiced, _____ he won a prize.",
    answer: "so",
    options: ["so","because","although"],
    fullSentence: "He practiced, so he won a prize."
  },
  {
    sentence: "Put on goggles _____ you enter the lab.",
    answer: "before",
    options: ["before","so","although"],
    fullSentence: "Put on goggles before you enter the lab."
  },
  {
    sentence: "Kids played, _____ their parents watched.",
    answer: "while",
    options: ["while","so","although"],
    fullSentence: "Kids played, while their parents watched."
  },
  {
    sentence: "She read books _____ she finished work.",
    answer: "after",
    options: ["after","so","although"],
    fullSentence: "She read books after she finished work."
  },
  {
    sentence: "He ran fast _____ his legs hurt.",
    answer: "although",
    options: ["although","because","so"],
    fullSentence: "He ran fast although his legs hurt."
  }
];

export function getConnectorQuestionsForWeek(weekNumber, grammarSentences = []) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_CONNECTOR_QUESTIONS;
  if (w === 34) return WEEK_34_CONNECTOR_QUESTIONS;
  if (w === 35) return WEEK_35_CONNECTOR_QUESTIONS;
  if (w === 36) return WEEK_36_CONNECTOR_QUESTIONS;
  if (w === 37) return WEEK_37_CONNECTOR_QUESTIONS;
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
    // Sentence info: WHO(Jake) + WHAT(was walking carefully) + WHERE(school corridor) + WHEN(after science class)
    // Correct: WHAT — answerable from sentence
    // Distractor 1: WHERE going (destination) — NOT in sentence (only location, not destination)
    // Distractor 2: WHY walking carefully — NOT in sentence (reason not stated)
    id: 'w33_wh_1',
    sentence: "Jake was walking carefully down the school corridor after science class.",
    options: [
      { text: "What was Jake doing in the corridor?", isCorrect: true },
      { text: "Where was Jake going after the corridor?", isCorrect: false },
      { text: "Why was Jake walking so carefully?", isCorrect: false },
    ],
    hint: "Notice the past continuous tense: 'was walking carefully'."
  },
  {
    // Sentence info: WHEN(Suddenly) + WHO(he) + WHAT(lost balance on wet floor, slipped)
    // Correct: WHAT — answerable from sentence
    // Distractor 1: Who warned him — NOT in sentence (no warning mentioned)
    // Distractor 2: How long he lay on the floor — NOT in sentence (duration not stated)
    id: 'w33_wh_2',
    sentence: "Suddenly, he lost his balance on the wet floor and slipped.",
    options: [
      { text: "What happened suddenly?", isCorrect: true },
      { text: "Who warned him about the wet floor?", isCorrect: false },
      { text: "How long did he stay on the floor after slipping?", isCorrect: false },
    ],
    hint: "Look at the time adverb 'Suddenly' at the start of the event."
  },
  {
    // Sentence info: WHO(Jake) + WHEN(immediately) + WHAT(stopped to help friend, called nurse)
    // Correct: WHAT — answerable from sentence
    // Distractor 1: Friend's name — NOT in sentence (name not given)
    // Distractor 2: Where nurse's office was — NOT in sentence (location not stated)
    id: 'w33_wh_3',
    sentence: "Jake stopped immediately to help his friend and called the school nurse.",
    options: [
      { text: "What did Jake do immediately?", isCorrect: true },
      { text: "What was his friend's name?", isCorrect: false },
      { text: "Where was the school nurse's office?", isCorrect: false },
    ],
    hint: "This question asks about the primary action Jake took."
  },
  {
    // Sentence info: WHO(nurse) + HOW(quickly) + WHAT(bandage + cold pack) + WHY(treat the cut)
    // Correct: WHAT brought — answerable from sentence
    // Distractor 1: Where the cut was on the body — NOT in sentence (body part not stated)
    // Distractor 2: How nurse heard about the accident — NOT in sentence (not mentioned)
    id: 'w33_wh_4',
    sentence: "The nurse arrived quickly with a clean bandage and a cold pack to treat the cut.",
    options: [
      { text: "What did the nurse bring to the corridor?", isCorrect: true },
      { text: "Where was the cut on the student's body?", isCorrect: false },
      { text: "How did the nurse hear about the accident?", isCorrect: false },
    ],
    hint: "Notice the supplies brought: 'a clean bandage and a cold pack'."
  },
  {
    // Sentence info: WHO(Everyone, headmaster) + WHAT(felt relieved, reminded never to run)
    // Correct: WHAT reminded about — answerable from sentence
    // Distractor 1: Why everyone felt relieved — NOT in sentence (reason not stated)
    // Distractor 2: Where headmaster spoke — NOT in sentence (location not stated)
    id: 'w33_wh_5',
    sentence: "Everyone felt relieved, and the headmaster reminded all students never to run.",
    options: [
      { text: "What did the headmaster remind everyone about?", isCorrect: true },
      { text: "Why did everyone feel relieved?", isCorrect: false },
      { text: "Where did the headmaster speak to the students?", isCorrect: false },
    ],
    hint: "Look at the advice given by the headmaster in the corridor."
  },
  {
    id: 'w33_wh_6',
    sentence: "The janitor placed a bright yellow sign near the puddle.",
    options: [
      { text: "What did the janitor place near the puddle?", isCorrect: true },
      { text: "Who painted the yellow sign?", isCorrect: false },
      { text: "When did the janitor go home?", isCorrect: false },
    ],
    hint: "Notice the item placed on the wet floor: 'a bright yellow sign'."
  }
];

export const WEEK_34_WH_QUESTIONS = [
  {
    // Sentence info: WHEN(on a warm afternoon) + WHO(mighty lion) + WHAT(was sleeping peacefully) + WHERE(under the trees)
    // Correct: WHAT doing — answerable from sentence
    // Distractor 1: Why sleeping so deeply — NOT in sentence (reason not stated)
    // Distractor 2: How long sleeping — NOT in sentence (duration not stated)
    id: 'w34_wh_1',
    sentence: "On a warm afternoon, the mighty lion was sleeping peacefully under the trees.",
    options: [
      { text: "What was the mighty lion doing on the warm afternoon?", isCorrect: true },
      { text: "Why was the mighty lion sleeping so deeply?", isCorrect: false },
      { text: "How long had the mighty lion been sleeping?", isCorrect: false },
    ],
    hint: "Notice the continuous action: 'was sleeping peacefully'."
  },
  {
    // Sentence info: CONTEXT(lion resting) + WHO-ran(tiny mouse) + WHERE(across front paw)
    // Correct: WHAT ran — answerable from sentence
    // Distractor 1: Why mouse was running — NOT in sentence (reason not stated)
    // Distractor 2: Where mouse was trying to go — NOT in sentence (destination not stated)
    id: 'w34_wh_2',
    sentence: "While the lion was resting, a tiny mouse ran across the lion's big front paw.",
    options: [
      { text: "What ran across the lion's big front paw?", isCorrect: true },
      { text: "Why was the tiny mouse running so fast?", isCorrect: false },
      { text: "Where was the tiny mouse trying to go?", isCorrect: false },
    ],
    hint: "Ask about the subject performing the sudden action: 'a tiny mouse'."
  },
  {
    // Sentence info: WHO(mouse) + WHAT(begged mercy, promised to help if let go)
    // Correct: WHAT promised — answerable from sentence
    // Distractor 1: How mouse planned to help — NOT in sentence (method not stated)
    // Distractor 2: Where mouse hid after being let go — NOT in sentence (not mentioned)
    id: 'w34_wh_3',
    sentence: "The mouse begged for mercy and promised to help the lion one day if he let him go.",
    options: [
      { text: "What did the mouse promise to do?", isCorrect: true },
      { text: "How did the mouse plan to help the lion?", isCorrect: false },
      { text: "Where did the mouse hide after the lion let him go?", isCorrect: false },
    ],
    hint: "Focus on the promise made by the mouse: 'to help the lion'."
  },
  {
    // Sentence info: WHEN(a few days later) + WHO(hunters) + WHOM(lion) + WHAT-with(strong net, thick ropes)
    // Correct: WHO trapped — answerable from sentence
    // Distractor 1: How many hunters set the trap — NOT in sentence (number not stated)
    // Distractor 2: Where hunters went after trapping — NOT in sentence (not mentioned)
    id: 'w34_wh_4',
    sentence: "A few days later, hunters trapped the lion in a strong net made of thick ropes.",
    options: [
      { text: "Who trapped the lion in a strong net?", isCorrect: true },
      { text: "How many hunters set the trap for the lion?", isCorrect: false },
      { text: "Where did the hunters go after trapping the lion?", isCorrect: false },
    ],
    hint: "Identify who set the trap: 'hunters'."
  },
  {
    // Sentence info: WHO(little mouse) + HOW(quickly chewed ropes) + OUTCOME(set lion free)
    // Correct: HOW set free — answerable from sentence
    // Distractor 1: How long it took to chew — NOT in sentence (duration not stated)
    // Distractor 2: Where lion ran after being freed — NOT in sentence (not mentioned)
    id: 'w34_wh_5',
    sentence: "The little mouse quickly chewed through the ropes and set the lion completely free.",
    options: [
      { text: "How did the little mouse set the lion free?", isCorrect: true },
      { text: "How long did it take the mouse to chew through the ropes?", isCorrect: false },
      { text: "Where did the lion run after being set free?", isCorrect: false },
    ],
    hint: "Notice the method used: 'quickly chewed through the ropes'."
  },
  {
    id: 'w34_wh_6',
    sentence: "The grateful lion thanked the little mouse for saving his life.",
    options: [
      { text: "Who did the grateful lion thank?", isCorrect: true },
      { text: "Where did the lion find fresh water?", isCorrect: false },
      { text: "Why did the hunters return to the forest?", isCorrect: false },
    ],
    hint: "Focus on the person being thanked: 'the little mouse'."
  }
];

export const GENERIC_WH_QUESTIONS = [
  {
    // Sentence info: WHO(brave astronaut) + WHAT(floated silently) + WHERE(zero-gravity training chamber) + HOW(silently)
    // Correct: WHAT doing — answerable from sentence
    // Distractor 1: Why chosen for training — NOT in sentence (reason not stated)
    // Distractor 2: How long training session lasted — NOT in sentence (duration not stated)
    id: 'gen_wh_1',
    sentence: "The brave astronaut floated silently in the zero-gravity training chamber.",
    options: [
      { text: "What was the astronaut doing in the chamber?", isCorrect: true },
      { text: "Why was the astronaut chosen for the training?", isCorrect: false },
      { text: "How long did the training session last?", isCorrect: false },
    ],
    hint: "Ask about the activity: 'floated silently'."
  },
  {
    // Sentence info: WHEN(Suddenly) + WHAT(warning buzzer beeped) + WHY(oxygen gauge fluctuated)
    // Correct: WHY beeped — answerable from sentence
    // Distractor 1: Who fixed the problem — NOT in sentence (person not mentioned)
    // Distractor 2: Where the oxygen gauge was located — NOT in sentence (location not stated)
    id: 'gen_wh_2',
    sentence: "Suddenly, the warning buzzer beeped because the oxygen gauge fluctuated.",
    options: [
      { text: "Why did the warning buzzer beep?", isCorrect: true },
      { text: "Who fixed the oxygen gauge problem?", isCorrect: false },
      { text: "Where was the oxygen gauge located on the spacecraft?", isCorrect: false },
    ],
    hint: "Look for the cause introduced by 'because'."
  },
  {
    // Sentence info: WHO(chief engineer) + WHAT(calibrated solar panels) + WHEN(before lunar eclipse)
    // Correct: WHAT calibrated — answerable from sentence
    // Distractor 1: Why calibration was needed — NOT in sentence (reason not stated)
    // Distractor 2: How long calibration took — NOT in sentence (duration not stated)
    id: 'gen_wh_3',
    sentence: "The chief engineer calibrated the solar panels before the lunar eclipse.",
    options: [
      { text: "What did the chief engineer calibrate?", isCorrect: true },
      { text: "Why did the solar panels need to be calibrated?", isCorrect: false },
      { text: "How long did the calibration process take?", isCorrect: false },
    ],
    hint: "Focus on the object being calibrated: 'the solar panels'."
  },
  {
    // Sentence info: WHO(Dr. Nova) + WHAT(discovered sparkling crystal) + WHERE(deep inside lunar crater)
    // Correct: WHERE found — answerable from sentence
    // Distractor 1: When Dr. Nova arrived at the crater — NOT in sentence (time not stated)
    // Distractor 2: How Dr. Nova reached the crater — NOT in sentence (method not stated)
    id: 'gen_wh_4',
    sentence: "Dr. Nova discovered a sparkling crystal deep inside the lunar crater.",
    options: [
      { text: "Where did Dr. Nova find the sparkling crystal?", isCorrect: true },
      { text: "When did Dr. Nova arrive at the lunar crater?", isCorrect: false },
      { text: "How did Dr. Nova reach the bottom of the crater?", isCorrect: false },
    ],
    hint: "Identify the location: 'deep inside the lunar crater'."
  },
  {
    // Sentence info: WHO(mission commander) + WHAT(awarded gold badges) + TO-WHOM(all crew members) + WHY(for courage)
    // Correct: WHY awarded — answerable from sentence
    // Distractor 1: When the award ceremony took place — NOT in sentence (time not stated)
    // Distractor 2: How many gold badges were awarded — NOT in sentence (number not stated)
    id: 'gen_wh_5',
    sentence: "The mission commander awarded gold badges to all crew members for courage.",
    options: [
      { text: "Why did the commander award gold badges?", isCorrect: true },
      { text: "When did the award ceremony take place?", isCorrect: false },
      { text: "How many gold badges were awarded in total?", isCorrect: false },
    ],
    hint: "Look for the reason: 'for courage'."
  },
  {
    id: 'gen_wh_6',
    sentence: "The crew boarded the exploration shuttle to return to Earth station.",
    options: [
      { text: "Where was the crew returning to?", isCorrect: true },
      { text: "Who fixed the broken rover wheel?", isCorrect: false },
      { text: "When did the rocket launch into orbit?", isCorrect: false },
    ],
    hint: "Look for the destination: 'Earth station'."
  }
];

export const WEEK_35_WH_QUESTIONS = [
  {
    // Sentence info: WHEN(early in morning) + WHO(family) + WHAT(packed gear, drove) + WHERE(towards Pine Mountain)
    // Correct: WHERE drove towards — answerable from sentence
    // Distractor 1: How many people in family — NOT in sentence (number not stated)
    // Distractor 2: How far Pine Mountain was — NOT in sentence (distance not stated)
    id: 'w35_wh_1',
    sentence: "Early in the morning, the family packed their gear and drove towards Pine Mountain.",
    options: [
      { text: "Where did the family drive towards?", isCorrect: true },
      { text: "How many people were in the family?", isCorrect: false },
      { text: "How far was Pine Mountain from their home?", isCorrect: false },
    ],
    hint: "Identify the destination: 'towards Pine Mountain'."
  },
  {
    // Sentence info: WHO-dad(was pitching tent) + WHO-children(collected dry firewood)
    // Correct: WHAT Dad doing — answerable from sentence
    // Distractor 1: What color was the tent — NOT in sentence (color not stated)
    // Distractor 2: How many children helped collect wood — NOT in sentence (number not stated)
    id: 'w35_wh_2',
    sentence: "While Dad was pitching the camp tent, the children collected dry firewood.",
    options: [
      { text: "What was Dad doing while the children collected wood?", isCorrect: true },
      { text: "What color was the camp tent?", isCorrect: false },
      { text: "How many children helped collect the firewood?", isCorrect: false },
    ],
    hint: "Notice the continuous action: 'was pitching the camp tent'."
  },
  {
    // Sentence info: WHAT spotted(two playful squirrels) + WHERE hiking(along mountain stream)
    // Correct: WHAT spotted — answerable from sentence
    // Distractor 1: What squirrels were eating — NOT in sentence (not mentioned)
    // Distractor 2: How deep the mountain stream was — NOT in sentence (depth not stated)
    id: 'w35_wh_3',
    sentence: "They spotted two playful squirrels while hiking along the mountain stream.",
    options: [
      { text: "What did they spot along the stream?", isCorrect: true },
      { text: "What were the two squirrels eating?", isCorrect: false },
      { text: "How deep was the mountain stream?", isCorrect: false },
    ],
    hint: "Look at the animals seen: 'two playful squirrels'."
  },
  {
    // Sentence info: WHO(Dad) + WHAT(lit warm campfire) + WHEN(when golden sun sank behind ridges)
    // Correct: WHEN lit campfire — answerable from sentence
    // Distractor 1: What tool Dad used to light fire — NOT in sentence (tool not stated)
    // Distractor 2: How long the campfire burned — NOT in sentence (duration not stated)
    id: 'w35_wh_4',
    sentence: "Dad lit the warm campfire when the golden sun sank behind the ridges.",
    options: [
      { text: "When did Dad light the campfire?", isCorrect: true },
      { text: "What tool did Dad use to light the campfire?", isCorrect: false },
      { text: "How long did the warm campfire burn that night?", isCorrect: false },
    ],
    hint: "Focus on the time clause: 'when the golden sun sank'."
  },
  {
    // Sentence info: WHERE(under starry night sky) + WHAT roasted(sweet marshmallows) + WHAT sang(happy songs)
    // Correct: WHAT roasted — answerable from sentence
    // Distractor 1: Which specific song they sang — NOT in sentence (song name not stated)
    // Distractor 2: How many marshmallows each person roasted — NOT in sentence (number not stated)
    id: 'w35_wh_5',
    sentence: "Under the starry night sky, they roasted sweet marshmallows and sang happy songs.",
    options: [
      { text: "What did they roast under the starry night sky?", isCorrect: true },
      { text: "Which song did the family sing together?", isCorrect: false },
      { text: "How many marshmallows did each person roast?", isCorrect: false },
    ],
    hint: "Identify the camp treat: 'sweet marshmallows'."
  },
  {
    id: 'w35_wh_6',
    sentence: "After singing camp songs, the tired family crawled into their sleeping bags.",
    options: [
      { text: "What did the family do after singing?", isCorrect: true },
      { text: "Who caught a fish in the river?", isCorrect: false },
      { text: "Where did the children leave their boots?", isCorrect: false },
    ],
    hint: "Notice what they did after singing: 'crawled into their sleeping bags'."
  }
];

export function getWhQuestionsForWeek(weekNumber, weekData = null) {
  const w = parseInt(weekNumber) || 33;
  if (w === 33) return WEEK_33_WH_QUESTIONS;
  if (w === 34) return WEEK_34_WH_QUESTIONS;
  if (w === 35) return WEEK_35_WH_QUESTIONS;

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
