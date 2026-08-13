import fs from 'fs';
import path from 'path';

const root = process.cwd();

// 1. Update WorldDiscoveryHub.jsx default fallbacks
const worldDiscoveryPath = path.join(root, 'src', 'modules', 'cambridge_suite', 'WorldDiscoveryHub.jsx');
let wContent = fs.readFileSync(worldDiscoveryPath, 'utf8');

// Replace Tom's clumsy morning storyScenes fallback
const newStoryScenes = `  const storyScenes = data?.story_scenes || [
    {
      scene_id: 'scene_1',
      title_en: 'Scene 1: Walking Down the Corridor',
      description_en: 'Jake was walking **carefully** down the school **corridor** after science class.',
      image_url: '/images/week33/webtoon_scene_1.png',
      lexical_chunks: [
        { word: 'corridor', chunk: 'school corridor', x: 45, y: 55 },
        { word: 'carefully', chunk: 'walking carefully', x: 25, y: 40 }
      ]
    },
    {
      scene_id: 'scene_2',
      title_en: 'Scene 2: Slipping on the Wet Floor',
      description_en: 'A boy running fast **slipped on the wet floor** and **fell down** heavily.',
      image_url: '/images/week33/webtoon_scene_2.png',
      lexical_chunks: [
        { word: 'slipped', chunk: 'slipped on wet floor', x: 50, y: 70 },
        { word: 'fell', chunk: 'fell down heavily', x: 60, y: 80 }
      ]
    },
    {
      scene_id: 'scene_3',
      title_en: 'Scene 3: Calling the School Nurse',
      description_en: 'Jake stopped immediately and **called the school nurse** for medical help.',
      image_url: '/images/week33/webtoon_scene_3.png',
      lexical_chunks: [
        { word: 'nurse', chunk: 'school nurse', x: 35, y: 50 },
        { word: 'called', chunk: 'called immediately', x: 55, y: 60 }
      ]
    },
    {
      scene_id: 'scene_4',
      title_en: 'Scene 4: Applying First Aid & Bandage',
      description_en: 'The nurse arrived quickly with a **clean bandage** and a **cold pack**.',
      image_url: '/images/week33/webtoon_scene_4.png',
      lexical_chunks: [
        { word: 'bandage', chunk: 'clean bandage', x: 40, y: 60 },
        { word: 'cold_pack', chunk: 'cold pack', x: 60, y: 65 }
      ]
    },
    {
      scene_id: 'scene_5',
      title_en: 'Scene 5: Feeling Relieved & Praised',
      description_en: 'Everyone **felt relieved** and the headmaster **praised Jake** for following safety rules.',
      image_url: '/images/week33/webtoon_scene_5.png',
      lexical_chunks: [
        { word: 'relieved', chunk: 'felt relieved', x: 45, y: 50 },
        { word: 'praised', chunk: 'praised Jake', x: 65, y: 55 }
      ]
    }
  ];`;

wContent = wContent.replace(/const storyScenes = data\?\.story_scenes \|\| \[\s*\{[\s\S]*?\}\n  \];/, newStoryScenes);

// Replace Tom's clumsy morning interactiveStory fallback
const newInteractiveStory = `  const interactiveStory = data?.interactive_story || {
    title: "Interactive Story: Corridor Safety Incident",
    text_template: "Jake was walking carefully down the school corridor today. First, he noticed a wet puddle near the science room. Then, a boy running fast ____1____ on the slippery tiles and ____2____ heavily. ____3____, Jake stopped immediately and ____4____ the school nurse. The nurse arrived quickly with a ____5____ and treated his knee gently.",
    gaps: [
      { id: 1, target: 'slipped', hint: 'bị trượt chân' },
      { id: 2, target: 'fell down', hint: 'ngã xuống' },
      { id: 3, target: 'Without hesitation', hint: 'không chần chừ' },
      { id: 4, target: 'called', hint: 'gọi y tế' },
      { id: 5, target: 'clean bandage', hint: 'băng cá nhân' }
    ],
    word_bank: ['slipped', 'fell down', 'Without hesitation', 'called', 'clean bandage', 'careful', 'hurt']
  };`;

wContent = wContent.replace(/const interactiveStory = data\?\.interactive_story \|\| \{[\s\S]*?\n  \};/, newInteractiveStory);

fs.writeFileSync(worldDiscoveryPath, wContent, 'utf8');

// 2. Update SentenceBuilderBattle.jsx fallbacks
const sbPath = path.join(root, 'src', 'modules', 'hubs', 'station2', 'LearnMode', 'SentenceBuilderBattle.jsx');
let sbContent = fs.readFileSync(sbPath, 'utf8');

const newSentenceBuilderDrills = `const WEEK33_GRAMMAR_DRILLS = [
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
    grammar_tag: "modal_verbs",
    text_en: "Build a school rule sentence.",
    word_blocks: ["The", "headmaster", "reminded", "all", "students", "never", "to", "run", "in", "corridors", "."],
    distractor_blocks: ["reminds", "always", "slow"]
  }
];`;

sbContent = sbContent.replace(/const WEEK33_GRAMMAR_DRILLS = \[\s*\{[\s\S]*?\}\n\];/, newSentenceBuilderDrills);
fs.writeFileSync(sbPath, sbContent, 'utf8');

// 3. Update Station2CheckMode.jsx fallbacks
const chkPath = path.join(root, 'src', 'modules', 'hubs', 'station2', 'CheckMode', 'Station2CheckMode.jsx');
let chkContent = fs.readFileSync(chkPath, 'utf8');

const newCheckModeDrills = `const FALLBACK_CHECK_QUESTIONS = [
  {
    id: 'chk_w33_01',
    content_id: 'chk_w33_01',
    dialogue_context: 'Jake: What happened while you were walking down the corridor?',
    text: 'What does Tom say?',
    prompt: 'What does Tom say?',
    options: [
      { label: 'A', text: "A boy running fast slipped on the wet floor.", isCorrect: true },
      { label: 'B', text: 'Yes, I am walking home now.', isCorrect: false },
      { label: 'C', text: "No, he didn't eat lunch.", isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_02',
    content_id: 'chk_w33_02',
    dialogue_context: 'Teacher: What did Jake do when his classmate fell down?',
    text: 'What does Mia say?',
    prompt: 'What does Mia say?',
    options: [
      { label: 'A', text: 'He called the school nurse immediately for help.', isCorrect: true },
      { label: 'B', text: 'While he was running outside.', isCorrect: false },
      { label: 'C', text: 'Yes, he broke his backpack.', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_03',
    content_id: 'chk_w33_03',
    dialogue_context: 'Nurse: How did you treat the boy\'s cut knee?',
    text: 'What does the Nurse say?',
    prompt: 'What does the Nurse say?',
    options: [
      { label: 'A', text: 'I applied a clean bandage and a cold pack.', isCorrect: true },
      { label: 'B', text: 'Because it was very sweet.', isCorrect: false },
      { label: 'C', text: 'So he was sleeping in bed.', isCorrect: false }
    ],
    answerIndex: 0
  }
];`;

chkContent = chkContent.replace(/const FALLBACK_CHECK_QUESTIONS = \[\s*\{[\s\S]*?\}\n\];/, newCheckModeDrills);
fs.writeFileSync(chkPath, chkContent, 'utf8');

console.log('🚀 Successfully updated component fallback constants to Corridor Safety & School Care!');
