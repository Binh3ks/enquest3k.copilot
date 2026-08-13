import fs from 'fs';
import path from 'path';

const root = process.cwd();

// 1. Update NovaTalkShowHub.jsx
const novaPath = path.join(root, 'src', 'modules', 'cambridge_suite', 'NovaTalkShowHub.jsx');
let novaContent = fs.readFileSync(novaPath, 'utf8');

const newNovaSentences = `  const sentencesList = data?.shadowing_sentences || [
    { id: "sh_01", speaker: "Jake", text: "Jake was walking **carefully down the school corridor** after science class." },
    { id: "sh_02", speaker: "Jake", text: "Suddenly, a boy running fast **slipped on the wet floor**." },
    { id: "sh_03", speaker: "Jake", text: "**Without hesitation**, Jake stopped immediately and **called the school nurse**." },
    { id: "sh_04", speaker: "Nurse", text: "The school nurse applied a **clean bandage** and a **cold pack** gently." },
    { id: "sh_05", speaker: "Headmaster", text: "Everyone **felt relieved**, and the headmaster **praised Jake** for following safety rules." }
  ];

  const longParagraph = data?.shadowing_paragraph || {
    title: "Continuous Shadowing: School Corridor Safety Incident",
    text: "Jake was walking **carefully down the school corridor** after science class. Suddenly, a classmate running fast **slipped on the wet floor** and fell down heavily. **Without hesitation**, Jake stopped immediately and **called the school nurse** for medical help. The nurse arrived quickly and applied a **clean bandage** and a **cold pack** to his cut knee. Everyone **felt relieved**, and the headmaster **praised Jake** for his quick thinking and care.",
    phonetic_guide: "Full story intonation guide: Practice continuous rhythm, rising pitch on key actions, and falling pitch on resolutions."
  };

  const talkshowTurns = data?.talkshow_turns || [
    { turn_number: 1, nova_question: "Welcome to Nova Live Talk Show! What happened while Jake was walking down the school corridor?" },
    { turn_number: 2, nova_question: "Oh dear! How did the boy slip on the floor near the science room?" },
    { turn_number: 3, nova_question: "What responsible action did Jake take when he saw his classmate fall down?" },
    { turn_number: 4, nova_question: "How did the school nurse treat the boy's cut knee during first aid?" },
    { turn_number: 5, nova_question: "What an important lesson! Why did the headmaster praise Jake at the end?" }
  ];`;

novaContent = novaContent.replace(/const sentencesList = data\?\.shadowing_sentences \|\| \[\s*\{[\s\S]*?\}\n  \];\s*const longParagraph = data\?\.shadowing_paragraph \|\| \{[\s\S]*?\n  \};\s*const talkshowTurns = data\?\.talkshow_turns \|\| \[\s*\{[\s\S]*?\}\n  \];/, newNovaSentences);
fs.writeFileSync(novaPath, novaContent, 'utf8');

// 2. Update WritingStudioHub.jsx
const writingPath = path.join(root, 'src', 'modules', 'cambridge_suite', 'WritingStudioHub.jsx');
let writingContent = fs.readFileSync(writingPath, 'utf8');

writingContent = writingContent.replace(
  /broke, fell, lost, found, slipped, dropped, damaged, apologized, flower vase, soccer ball, alarm clock, backpack\./,
  'corridor, slipped, fell down, nurse, bandage, cold pack, praised, carefully, immediately, relieved.'
);

writingContent = writingContent.replace(
  /<li>played soccer inside the living room<\/li>\s*<li>hit the wooden table by accident<\/li>\s*<li>broke the glass flower vase into pieces<\/li>\s*<li>apologized to his mom for the mistake<\/li>\s*<li>swept and cleaned up the floor carefully<\/li>/,
  `<li>walked carefully down the school corridor</li>
                  <li>slipped on the wet slippery tiles</li>
                  <li>called the school nurse immediately</li>
                  <li>applied a clean bandage and cold pack</li>
                  <li>praised Jake for following safety rules</li>`
);
fs.writeFileSync(writingPath, writingContent, 'utf8');

// 3. Update BarModelQuest.jsx
const barPath = path.join(root, 'src', 'modules', 'hubs', 'station2', 'LearnMode', 'BarModelQuest.jsx');
let barContent = fs.readFileSync(barPath, 'utf8');

const newBarQuestions = `const WEEK33_BAR_QUESTIONS = [
  {
    id: 'bar_w33_01',
    title: 'Problem 1: Corridor First Aid Bandages (Part-Whole)',
    problemText: 'The school nurse used 4 small bandages and 6 large bandages to treat students today. How many bandages were used in total?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Small Bandages (4)', value: 40, color: '#4f46e5' },
        { label: 'Large Bandages (6)', value: 60, color: '#06b6d4' }
      ],
      totalLabel: '? bandages'
    },
    correctAnswer: 10,
    hintText: 'Look at the total bar model: Total bandages = 4 small + 6 large = 10 bandages.'
  },
  {
    id: 'bar_w33_02',
    title: 'Problem 2: Corridor Walking vs Running Speed (Comparison)',
    problemText: 'Running down the corridor takes 15 seconds. Walking carefully takes 40 seconds. How many seconds slower is walking carefully?',
    modelData: {
      type: 'comparison',
      bars: [
        { name: 'Walking Carefully', label: '40 seconds', width: 240 },
        { name: 'Running Fast', label: '15 seconds', width: 90 }
      ]
    },
    correctAnswer: 25,
    hintText: 'Difference between the bar models = 40 seconds - 15 seconds = 25 seconds.'
  },
  {
    id: 'bar_w33_03',
    title: 'Problem 3: Total Safety Inspection Time (Part-Whole)',
    problemText: 'The headmaster spent 20 minutes inspecting the corridor floor and 30 minutes placing safety warning signs. How many total minutes did he spend?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Floor Inspection (20m)', value: 40, color: '#4f46e5' },
        { label: 'Safety Signs (30m)', value: 60, color: '#06b6d4' }
      ],
      totalLabel: '? minutes'
    },
    correctAnswer: 50,
    hintText: 'Add both time intervals: 20 minutes + 30 minutes = 50 total minutes.'
  }
];`;

barContent = barContent.replace(/const WEEK33_BAR_QUESTIONS = \[\s*\{[\s\S]*?\}\n\];/, newBarQuestions);
fs.writeFileSync(barPath, barContent, 'utf8');

// 4. Update FlashArena.jsx
const flashPath = path.join(root, 'src', 'modules', 'hubs', 'station2', 'LearnMode', 'FlashArena.jsx');
let flashContent = fs.readFileSync(flashPath, 'utf8');

const newFlashSets = `  set3_chunks: [
    { id: "c01", en: "walking carefully down corridor", vi: "đi bộ cẩn thận dưới hành lang" },
    { id: "c02", en: "slipped on the wet floor", vi: "trượt chân trên sàn ướt" },
    { id: "c03", en: "fell down heavily", vi: "ngã xuống rất đau" },
    { id: "c04", en: "called the school nurse", vi: "gọi y tế trường học" },
    { id: "c05", en: "without hesitation", vi: "không một chút chần chừ" },
    { id: "c06", en: "applied a clean bandage", vi: "băng vết thương sạch sẽ" },
    { id: "c07", en: "placed a cold pack", vi: "chườm túi đá lạnh" },
    { id: "c08", en: "felt extremely relieved", vi: "cảm thấy rất nhẹ nhõm" },
    { id: "c09", en: "praised for quick thinking", vi: "khen ngợi vì phản ứng nhanh" },
    { id: "c10", en: "followed safety rules", vi: "tuân thủ quy tắc an toàn" }
  ],
  set4_definitions: [
    { id: "def01", en: "corridor", vi: "A long passage in a school building with doors on each side." },
    { id: "def02", en: "bandage", vi: "A strip of clean material used to bind up a wound or cut." },
    { id: "def03", en: "nurse", vi: "A trained healthcare worker who cares for sick or injured students." },
    { id: "def04", en: "slipped", vi: "Slid accidentally on a wet or smooth floor and lost balance." },
    { id: "def05", en: "relieved", vi: "Feeling happy because something difficult or scary is over." },
    { id: "def06", en: "praised", vi: "Expressed warm approval or admiration for good behavior." },
    { id: "def07", en: "caution", vi: "Care taken to avoid danger, accidents, or mistakes." },
    { id: "def08", en: "immediately", vi: "Right away without any delay." },
    { id: "def09", en: "truce", vi: "An agreement between groups to stop fighting or competing." },
    { id: "def10", en: "olympic", vi: "Relating to the global sports festival originating in ancient Greece." }
  ]`;

flashContent = flashContent.replace(/set3_chunks: \[\s*\{[\s\S]*?\}\n  \],\s*set4_definitions: \[\s*\{[\s\S]*?\}\n  \]/, newFlashSets);
fs.writeFileSync(flashPath, flashContent, 'utf8');

// 5. Update HoverWord.jsx
const hoverPath = path.join(root, 'src', 'components', 'common', 'HoverWord.jsx');
let hoverContent = fs.readFileSync(hoverPath, 'utf8');

const newHoverDict = `const week33DictItems = [
  { word: "corridor", meaning: "hành lang trường học", pronounce: "/ˈkɔːr.ə.dɚ/", example: "Jake walked carefully down the school corridor." },
  { word: "slipped", meaning: "đã trượt chân", pronounce: "/slɪpt/", example: "A boy running fast slipped on the wet floor." },
  { word: "fell", meaning: "đã ngã / rơi", pronounce: "/fɛl/", example: "He fell down on the slippery tiles." },
  { word: "nurse", meaning: "y tế / y tá trường", pronounce: "/nɜːrs/", example: "Jake called the school nurse immediately." },
  { word: "bandage", meaning: "băng cá nhân", pronounce: "/ˈbæn.dɪdʒ/", example: "The nurse applied a clean bandage to his knee." },
  { word: "relieved", meaning: "nhẹ nhõm / an tâm", pronounce: "/rɪˈliːvd/", example: "Everyone felt relieved when the boy smiled." },
  { word: "praised", meaning: "khen ngợi / tuyên dương", pronounce: "/preɪzd/", example: "The headmaster praised Jake for his quick action." },
  { word: "carefully", meaning: "một cách cẩn thận", pronounce: "/ˈkɛr.fəl.i/", example: "Walk carefully on wet floors." },
  { word: "immediately", meaning: "ngay lập tức", pronounce: "/ɪˈmiː.di.ət.li/", example: "Jake called for help immediately." },
  { word: "truce", meaning: "thỏa thuận hòa bình / ngưng chiến", pronounce: "/truːs/", example: "The ancient Olympic Truce brought peace." },
  { word: "olympic", meaning: "thế vận hội Olympic", pronounce: "/əˈlɪm.pɪk/", example: "Athletes joined the ancient Olympic games." },
  { word: "cautious", meaning: "cẩn trọng", pronounce: "/ˈkɑː.ʃəs/", example: "Always be cautious near wet floor signs." },
  { word: "first_aid", meaning: "sơ cứu ban đầu", pronounce: "/ˌfɜːrst ˈeɪd/", example: "The nurse provided first aid treatment." },
  { word: "cold_pack", meaning: "túi chườm đá lạnh", pronounce: "/koʊld pæk/", example: "She placed a cold pack on his knee." },
  { word: "woke up in a hurry", meaning: "tỉnh dậy vội vã", pronounce: "/woʊk ʌp ɪn ə ˈhɜːr.i/", example: "Jake walked quickly down the hall." },
  { word: "felt extremely clumsy", meaning: "cảm thấy hậu đậu", pronounce: "/fɛlt ɪkˈstriːm.li ˈklʌm.zi/", example: "The boy felt clumsy after slipping." },
  { word: "accidentally knocked over", meaning: "vô tình làm đổ", pronounce: "/ˌæk.səˈden.t̬əl.i nɑːkt ˈoʊ.vɚ/", example: "He accidentally slipped on the water." },
  { word: "rushed downstairs", meaning: "vội vã chạy xuống lầu", pronounce: "/rʌʃt ˌdaʊnˈsterz/", example: "Do not rush downstairs or run in hall." },
  { word: "slipped on a wet puddle", meaning: "trượt chân trên vũng nước", pronounce: "/slɪpt ɑːn ə wɛt ˈpʌd.əl/", example: "He slipped on a wet puddle near science lab." },
  { word: "to make things worse", meaning: "tệ hại hơn là", pronounce: "/tuː meɪk θɪŋz wɜːrs/", example: "To make things worse, the floor was slippery." },
  { word: "spilled a glass of juice", meaning: "làm đổ nước ép", pronounce: "/spɪld ə ɡlæs ʌv dʒuːs/", example: "Water was spilled on the corridor floor." },
  { word: "cleaned up the mess", meaning: "dọn dẹp vũng nước", pronounce: "/kliːnd ʌp ðə mɛs/", example: "The janitor cleaned up the mess." },
  { word: "apologized to his mother", meaning: "xin lỗi", pronounce: "/əˈpɑː.lə.dʒaɪzd/", example: "The running boy apologized for careless running." },
  { word: "promised to be more careful", meaning: "hứa sẽ cẩn thận hơn", pronounce: "/ˈprɑː.mɪst tuː biː mɔːr ˈkɛr.fəl/", example: "He promised to be more careful in school." }
];`;

hoverContent = hoverContent.replace(/const week33DictItems = \[\s*\{[\s\S]*?\}\n\];/, newHoverDict);
fs.writeFileSync(hoverPath, hoverContent, 'utf8');

console.log('🎉 Successfully purged ALL remaining Tom/alarm clock fallbacks from all 5 UI component files!');
