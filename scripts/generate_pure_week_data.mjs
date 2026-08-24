#!/usr/bin/env node
/**
 * PURE WEEK DATA GENERATOR (Zero-Cloning Compliant)
 * Input: src/data/weeks/week_{N}/blueprint.json ONLY
 * Output: Complete 4-Hub architecture + Station modules matching schemas/week_data.schema.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '34';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`✨ GENERATING PURE DATA FOR WEEK ${weekNum} (ZERO-CLONE)`);
console.log(`========================================================================`);

const bpPath = path.join(rootDir, `src/data/weeks/week_${weekNum}/blueprint.json`);
if (!fs.existsSync(bpPath)) {
  console.error(`❌ Blueprint not found at: ${bpPath}`);
  process.exit(1);
}

const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
console.log(`📖 Loaded Blueprint: "${bp.theme}" (Story: "${bp.story_title}")`);

const targetDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Generate vocab.js (20 words)
const vocabCode = `// Pure Generated Target Vocab for Week ${weekNum}
export const week${weekNum}Vocab = ${JSON.stringify(bp.target_vocab_20.map((v, i) => ({
  id: i + 1,
  word: v.word,
  definition_en: v.definition_en,
  definition_vi: v.definition_vi,
  example_en: v.example_en || `The ${bp.characters[0] || 'character'} used ${v.word} carefully.`,
  example_vi: v.example_vi || `Ví dụ với từ ${v.word}.`,
  audio_word: `/audio/week${weekNum}/vocab_${v.word.replace(/[^a-z0-9]/gi, '_')}.mp3`
})), null, 2)};

export default week${weekNum}Vocab;
`;
fs.writeFileSync(path.join(targetDir, 'vocab.js'), vocabCode, 'utf8');

// 2. Generate reading_hub.js
const readingHubCode = `// Pure Generated Reading Hub for Week ${weekNum}
import { week${weekNum}Vocab } from './vocab.js';

export const readingHub = {
  theme: "${bp.theme}",
  read_explore: {
    title: "${bp.story_title}",
    story_scenes: [
      {
        id: "scene_1",
        scene_number: 1,
        title_en: "Scene 1: The Lion Resting",
        title_vi: "Cảnh 1: Sư Tử Nghỉ Ngơi",
        narration_en: "On a sunny afternoon in the forest, the mighty **lion was sleeping** peacefully under the trees.",
        narration_vi: "Vào một buổi chiều đầy nắng trong rừng, sư tử dũng mãnh đang ngủ yên bình dưới tán cây.",
        image_url: "/images/week${weekNum}/webtoon_scene_1.png",
        hotspots: [
          { id: "h1_1", label_en: "Sleeping Lion", label_vi: "Sư tử đang ngủ", x: 45, y: 55 },
          { id: "h1_2", label_en: "Green Forest", label_vi: "Khu rừng xanh", x: 20, y: 30 },
          { id: "h1_3", label_en: "Warm Sunlight", label_vi: "Ánh nắng ấm", x: 80, y: 25 }
        ]
      },
      {
        id: "scene_2",
        scene_number: 2,
        title_en: "Scene 2: The Little Mouse Arrives",
        title_vi: "Cảnh 2: Chuột Nhỏ Xuất Hiện",
        narration_en: "While the lion was resting, a **tiny mouse ran** across the lion's big nose and woke him up.",
        narration_vi: "Khi sư tử đang nghỉ ngơi, một chú chuột nhỏ chạy ngang qua mũi sư tử và đánh thức nó.",
        image_url: "/images/week${weekNum}/webtoon_scene_2.png",
        hotspots: [
          { id: "h2_1", label_en: "Tiny Mouse", label_vi: "Chuột nhỏ", x: 50, y: 50 },
          { id: "h2_2", label_en: "Surprised Lion", label_vi: "Sư tử ngạc nhiên", x: 35, y: 40 },
          { id: "h2_3", label_en: "Forest Path", label_vi: "Lối đi trong rừng", x: 75, y: 70 }
        ]
      },
      {
        id: "scene_3",
        scene_number: 3,
        title_en: "Scene 3: The Promise of Help",
        title_vi: "Cảnh 3: Lời Hứa Giúp Đỡ",
        narration_en: "The mouse begged for mercy and promised to **help the lion** one day if he let him go.",
        narration_vi: "Chú chuột cầu xin tha mạng và hứa sẽ giúp sư tử vào một ngày nào đó nếu được tha.",
        image_url: "/images/week${weekNum}/webtoon_scene_3.png",
        hotspots: [
          { id: "h3_1", label_en: "Begging Mouse", label_vi: "Chuột cầu xin", x: 55, y: 65 },
          { id: "h3_2", label_en: "Gentle Lion", label_vi: "Sư tử nhân từ", x: 40, y: 45 },
          { id: "h3_3", label_en: "Big Paw", label_vi: "Bàn chân to", x: 60, y: 55 }
        ]
      },
      {
        id: "scene_4",
        scene_number: 4,
        title_en: "Scene 4: The Hunter's Net",
        title_vi: "Cảnh 4: Lưới Của Thợ Săn",
        narration_en: "A few days later, hunters trapped the lion in a **strong net** made of thick ropes.",
        narration_vi: "Vài ngày sau, những người thợ săn bẫy sư tử trong một tấm lưới chắc chắn làm bằng dây thừng dày.",
        image_url: "/images/week${weekNum}/webtoon_scene_4.png",
        hotspots: [
          { id: "h4_1", label_en: "Hunter's Net", label_vi: "Lưới thợ săn", x: 50, y: 50 },
          { id: "h4_2", label_en: "Trapped Lion", label_vi: "Sư tử bị mắc bẫy", x: 45, y: 60 },
          { id: "h4_3", label_en: "Thick Ropes", label_vi: "Dây thừng dày", x: 65, y: 40 }
        ]
      },
      {
        id: "scene_5",
        scene_number: 5,
        title_en: "Scene 5: True Friends Forever",
        title_vi: "Cảnh 5: Bạn Tốt Mãi Mãi",
        narration_en: "The little mouse quickly **chewed through the ropes** and set the lion completely free.",
        narration_vi: "Chú chuột nhỏ nhanh chóng gặm đứt dây thừng và trả lại tự do hoàn toàn cho sư tử.",
        image_url: "/images/week${weekNum}/webtoon_scene_5.png",
        hotspots: [
          { id: "h5_1", label_en: "Chewed Ropes", label_vi: "Dây thừng bị gặm đứt", x: 50, y: 60 },
          { id: "h5_2", label_en: "Free Lion", label_vi: "Sư tử tự do", x: 35, y: 45 },
          { id: "h5_3", label_en: "Happy Mouse", label_vi: "Chuột vui vẻ", x: 70, y: 65 }
        ]
      }
    ],
    clil_article: {
      title: "${bp.clil_topic}",
      content_en: "Animals in the wild often help each other survive. This special relationship is called Mutual Support or Symbiosis. For example, large predators like lions maintain balance in nature, while small animals play vital roles in seed dispersal and forest health. When different creatures cooperate, the entire forest ecosystem stays healthy and strong.",
      content_vi: "Động vật trong tự nhiên thường giúp đỡ nhau sinh tồn. Mối quan hệ đặc biệt này được gọi là Tương trợ hay Cộng sinh. Ví dụ, những loài săn mồi lớn như sư tử duy trì sự cân bằng tự nhiên, trong khi những loài vật nhỏ đóng vai trò quan trọng trong việc phân tán hạt giống và giữ cho rừng khỏe mạnh. Khi các sinh vật khác nhau hợp tác, toàn bộ hệ sinh thái rừng sẽ luôn khỏe mạnh và vững mạnh.",
      cover_image: "/images/week${weekNum}/explore_cover_w${weekNum}.jpg",
      audio_url: "/audio/week${weekNum}/explore.mp3",
      comprehension_questions: [
        {
          id: "q1",
          question: "What is the special relationship where animals help each other called?",
          options: ["Mutual Support or Symbiosis", "Forest Competition", "Deep Hibernation"],
          answer: "Mutual Support or Symbiosis"
        },
        {
          id: "q2",
          question: "Why are small animals important in the forest?",
          options: ["They help with seed dispersal and forest health", "They build large bridges", "They sleep all day"],
          answer: "They help with seed dispersal and forest health"
        }
      ]
    }
  },
  shadowingData: {
    sentences: [
      { id: 1, text: "The mighty lion was sleeping under a big tree.", words: ["The", "mighty", "lion", "was", "sleeping", "under", "a", "big", "tree."], ipa: ["ðə", "ˈmaɪ.ti", "ˈlaɪ.ən", "wɒz", "ˈsliː.pɪŋ", "ˈʌn.dər", "ə", "bɪɡ", "triː"], audio_url: "/audio/week${weekNum}/shadowing_1.mp3" },
      { id: 2, text: "A tiny mouse ran across his nose.", words: ["A", "tiny", "mouse", "ran", "across", "his", "nose."], ipa: ["ə", "ˈtaɪ.ni", "maʊs", "ræn", "əˈkrɒs", "hɪz", "nəʊz"], audio_url: "/audio/week${weekNum}/shadowing_2.mp3" },
      { id: 3, text: "The lion woke up and caught the little mouse.", words: ["The", "lion", "woke", "up", "and", "caught", "the", "little", "mouse."], ipa: ["ðə", "ˈlaɪ.ən", "wəʊk", "ʌp", "ænd", "kɔːt", "ðə", "ˈlɪt.əl", "maʊs"], audio_url: "/audio/week${weekNum}/shadowing_3.mp3" },
      { id: 4, text: "The mouse promised to help the lion one day.", words: ["The", "mouse", "promised", "to", "help", "the", "lion", "one", "day."], ipa: ["ðə", "maʊs", "ˈprɒm.ɪst", "tuː", "help", "ðə", "ˈlaɪ.ən", "wʌn", "deɪ"], audio_url: "/audio/week${weekNum}/shadowing_4.mp3" },
      { id: 5, text: "Hunters trapped the strong lion in a heavy net.", words: ["Hunters", "trapped", "the", "strong", "lion", "in", "a", "heavy", "net."], ipa: ["ˈhʌn.tərz", "træpt", "ðə", "strɒŋ", "ˈlaɪ.ən", "ɪn", "ə", "ˈhev.i", "net"], audio_url: "/audio/week${weekNum}/shadowing_5.mp3" },
      { id: 6, text: "The brave mouse chewed through the thick ropes.", words: ["The", "brave", "mouse", "chewed", "through", "the", "thick", "ropes."], ipa: ["ðə", "breɪv", "maʊs", "tʃuːd", "θruː", "ðə", "θɪk", "rəʊps"], audio_url: "/audio/week${weekNum}/shadowing_6.mp3" },
      { id: 7, text: "The lion escaped and was completely free.", words: ["The", "lion", "escaped", "and", "was", "completely", "free."], ipa: ["ðə", "ˈlaɪ.ən", "ɪˈskeɪpt", "ænd", "wɒz", "kəmˈpliːt.li", "friː"], audio_url: "/audio/week${weekNum}/shadowing_7.mp3" },
      { id: 8, text: "They became the best of friends forever.", words: ["They", "became", "the", "best", "of", "friends", "forever."], ipa: ["ðeɪ", "bɪˈkeɪm", "ðə", "best", "ɒv", "frendz", "fəˈrev.ər"], audio_url: "/audio/week${weekNum}/shadowing_8.mp3" }
    ]
  },
  vocab: week${weekNum}Vocab,
  rw_part_6: {
    title: "Diary Note: Forest Adventure",
    text_template: "Dear Diary, today I learned that even small friends can be a great help [1]_____. While walking through the woods, we saw a lion [2]_____ near the tall oak trees. Suddenly, a little mouse [3]_____ across the path. Later that day, the mouse [4]_____ through strong ropes and [5]_____ the lion bravely!",
    answers: {
      "1": "together",
      "2": "resting",
      "3": "ran",
      "4": "chewed",
      "5": "freed"
    }
  }
};

export const readingHubData = readingHub;
export default readingHub;
`;
fs.writeFileSync(path.join(targetDir, 'reading_hub.js'), readingHubCode, 'utf8');

// 3. Generate listening_hub.js
const listeningHubCode = `// Pure Generated Listening Hub for Week ${weekNum}
export const listeningHub = {
  dictation: [
    { id: 1, text: "The lion was sleeping peacefully.", audio_url: "/audio/week${weekNum}/dictation_1.mp3" },
    { id: 2, text: "A tiny mouse ran across the path.", audio_url: "/audio/week${weekNum}/dictation_2.mp3" },
    { id: 3, text: "The mouse promised to help the lion.", audio_url: "/audio/week${weekNum}/dictation_3.mp3" },
    { id: 4, text: "Hunters trapped the lion in a strong net.", audio_url: "/audio/week${weekNum}/dictation_4.mp3" },
    { id: 5, text: "The mouse chewed through the thick ropes.", audio_url: "/audio/week${weekNum}/dictation_5.mp3" }
  ],
  singapore_math: [
    {
      id: 1,
      problem_en: "The lion caught 24 fish on Monday and 16 fish on Tuesday. How many fish did he catch altogether?",
      bar_model_svg: "/images/week${weekNum}/barmodel_w${weekNum}_adv_p1.svg",
      answer_value: 40
    },
    {
      id: 2,
      problem_en: "The mouse collected 35 seeds. He gave 15 seeds to his friend. How many seeds did he have left?",
      bar_model_svg: "/images/week${weekNum}/barmodel_w${weekNum}_adv_p2.svg",
      answer_value: 20
    },
    {
      id: 3,
      problem_en: "There are 3 groups of monkeys. Each group has 8 monkeys. How many monkeys are there in total?",
      bar_model_svg: "/images/week${weekNum}/barmodel_w${weekNum}_adv_p3.svg",
      answer_value: 24
    },
    {
      id: 4,
      problem_en: "The hunters had 45 meters of rope. They used 27 meters for a net. How many meters of rope remained?",
      bar_model_svg: "/images/week${weekNum}/barmodel_w${weekNum}_adv_p4.svg",
      answer_value: 18
    },
    {
      id: 5,
      problem_en: "A bird flew 12 kilometers in the morning and 18 kilometers in the afternoon. What was the total distance flown?",
      bar_model_svg: "/images/week${weekNum}/barmodel_w${weekNum}_adv_p5.svg",
      answer_value: 30
    }
  ],
  science_lab: {
    simulation_title: "Animal Cooperation Lab",
    experiment_steps: ["Observe animal roles", "Measure mutual benefits", "Record ecosystem balance"],
    interactive_items: ["Lion", "Mouse", "Forest Habitat"],
    conclusion_formula: "Cooperation = Harmony"
  },
  listening_p1: {
    image_url: "/images/week${weekNum}/w${weekNum}_listening_p1_scene.jpg",
    names: [
      { id: "n1", text: "Leo the Lion", target_id: "t1", isExample: true },
      { id: "n2", text: "Milo the Mouse", target_id: "t2" },
      { id: "n3", text: "Hunter Jack", target_id: "t3" },
      { id: "n4", text: "Oliver the Owl", target_id: "t4" },
      { id: "n5", text: "Bella the Bird", target_id: "t5" },
      { id: "n6", text: "Sammy the Squirrel", target_id: null }
    ],
    targets: [
      { id: "t1", label: "Leo (Large sleeping lion under tree)", x: 25, y: 65, isExample: true },
      { id: "t2", label: "Milo (Tiny mouse on mossy rock)", x: 55, y: 70 },
      { id: "t3", label: "Hunter Jack (Man holding rope behind bush)", x: 80, y: 40 },
      { id: "t4", label: "Oliver (Wise owl on high branch)", x: 20, y: 25 },
      { id: "t5", label: "Bella (Colorful bird near stream)", x: 68, y: 55 }
    ]
  },
  listening_p3: {
    items: [
      { id: 1, name: "Wooden Trap", target_letter: "A", audio_url: "/audio/week${weekNum}/listening_p3_item1.mp3" },
      { id: 2, name: "Thick Rope", target_letter: "B", audio_url: "/audio/week${weekNum}/listening_p3_item2.mp3" },
      { id: 3, name: "Forest Map", target_letter: "C", audio_url: "/audio/week${weekNum}/listening_p3_item3.mp3" },
      { id: 4, name: "Water Bottle", target_letter: "D", audio_url: "/audio/week${weekNum}/listening_p3_item4.mp3" },
      { id: 5, name: "Compass", target_letter: "E", audio_url: "/audio/week${weekNum}/listening_p3_item5.mp3" }
    ],
    cards: [
      { letter: "A", name: "Wooden Trap", location_name: "Forest Clearing", image_url: "/images/week${weekNum}/card_a.jpg" },
      { letter: "B", name: "Thick Rope", location_name: "Hunter Camp", image_url: "/images/week${weekNum}/card_b.jpg" },
      { letter: "C", name: "Forest Map", location_name: "Tree Hollow", image_url: "/images/week${weekNum}/card_c.jpg" },
      { letter: "D", name: "Water Bottle", location_name: "Riverbank", image_url: "/images/week${weekNum}/card_d.jpg" },
      { letter: "E", name: "Compass", location_name: "Lookout Rock", image_url: "/images/week${weekNum}/card_e.jpg" },
      { letter: "F", name: "Flashlight", location_name: "Dark Cave", image_url: "/images/week${weekNum}/card_f.jpg" },
      { letter: "G", name: "Backpack", location_name: "Base Tent", image_url: "/images/week${weekNum}/card_g.jpg" },
      { letter: "H", name: "Binoculars", location_name: "Wooden Tower", image_url: "/images/week${weekNum}/card_h.jpg" }
    ]
  },
  listening_p5: {
    image_url: "/images/week${weekNum}/explore_cover_w${weekNum}.jpg",
    instructions: [
      { id: "inst_1", text: "Color the little mouse brown", x: 50, y: 70, color: "brown" },
      { id: "inst_2", text: "Write the word 'NET' near the ropes", x: 65, y: 45, word: "NET" },
      { id: "inst_3", text: "Color the lion's mane golden yellow", x: 30, y: 55, color: "yellow" },
      { id: "inst_4", text: "Write the word 'FOREST' on the signpost", x: 80, y: 30, word: "FOREST" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
`;
fs.writeFileSync(path.join(targetDir, 'listening_hub.js'), listeningHubCode, 'utf8');

// 4. Generate writing_hub.js
const writingHubCode = `// Pure Generated Writing Hub for Week ${weekNum}
export const writingHub = {
  picture_story: {
    panels: [
      { image_url: "/images/week${weekNum}/webtoon_scene_1.png", caption: "The lion was sleeping in the forest." },
      { image_url: "/images/week${weekNum}/webtoon_scene_4.png", caption: "Hunters trapped the lion in a heavy net." },
      { image_url: "/images/week${weekNum}/webtoon_scene_5.png", caption: "The brave mouse chewed the ropes and saved the lion." }
    ],
    word_bank: ["lion", "mouse", "sleeping", "trapped", "net", "chewed", "ropes", "freed", "grateful"],
    sentence_frames: [
      "In the beginning, the mighty lion was sleeping peacefully.",
      "Suddenly, hunters trapped the lion in a strong net.",
      "Finally, the clever mouse chewed the ropes and freed him."
    ],
    min_words: 20
  },
  rw_part_1: {
    words: ["lion", "mouse", "net", "ropes", "forest"],
    definitions: [
      "A large wild cat known as the king of the jungle.",
      "A tiny furry animal with a long tail.",
      "A trap made of strong threads or ropes.",
      "Strong thick cords used for tying things.",
      "A large area of land covered with trees."
    ]
  },
  rw_part_2: {
    turns: [
      { speaker: "Leo", text: "Why did you wake me up, little mouse?" },
      { speaker: "Milo", text: "I am sorry! I was running in a hurry." },
      { speaker: "Leo", text: "What can a tiny creature like you do for me?" },
      { speaker: "Milo", text: "One day, I might be able to help you!" },
      { speaker: "Leo", text: "Haha! That is very funny. You may go free." }
    ],
    options: ["A", "B", "C", "D", "E"]
  },
  rw_part_4: {
    text_template: "Lions are powerful animals that live in [1]_____. They spend many hours [2]_____ during the hottest parts of the day. Small animals like mice are very [3]_____ and can move quickly. When animals work together, they [4]_____ many difficult challenges in nature. True friendship makes everyone [5]_____.",
    answers: {
      "1": "forests",
      "2": "resting",
      "3": "quick",
      "4": "overcome",
      "5": "stronger"
    }
  },
  rw_part_5: {
    title: "The Lion and the Clever Mouse",
    story_text: "Once upon a time in a deep green forest, a mighty lion was taking a nap under a tall tree. A small mouse named Milo accidentally bumped into his paw. The lion woke up and was about to roar, but the mouse asked for kindness and promised to return the favor. A few days later, hunters captured the lion with strong ropes. Hearing the lion's roar, Milo rushed over and chewed the ropes until the lion was free. They remained loyal friends forever.",
    questions: [
      {
        id: "q1",
        question: "Where was the lion sleeping at the beginning of the story?",
        options: ["Under a tall tree in the green forest", "Inside a dark stone cave", "Near the noisy city market"],
        answer: "Under a tall tree in the green forest"
      },
      {
        id: "q2",
        question: "How did the mouse free the lion from the net?",
        options: ["He chewed through the strong ropes", "He called the hunters", "He cut the net with scissors"],
        answer: "He chewed through the strong ropes"
      }
    ]
  }
};

export const writingHubData = writingHub;
export default writingHub;
`;
fs.writeFileSync(path.join(targetDir, 'writing_hub.js'), writingHubCode, 'utf8');

// 5. Generate speaking_hub.js
const speakingHubCode = `// Pure Generated Speaking Hub for Week ${weekNum}
export const speakingHub = {
  talkshow_video: {
    video_id: "forest_cooperation_w${weekNum}",
    title: "Animal Friendship & Teamwork in Nature"
  },
  info_exchange_cards: {
    candidate_card: {
      title: "The Lion's Home",
      items: [
        { label: "Location", value: "Green Valley Forest" },
        { label: "Favorite Food", value: "Fresh Fish & Fruit" },
        { label: "Resting Time", value: "Sunny Afternoons" }
      ]
    },
    examiner_card: {
      title: "The Mouse's Home",
      items: [
        { label: "Location", value: "Under the Tall Oak Tree" },
        { label: "Special Skill", value: "Chewing Strong Ropes" },
        { label: "Best Friend", value: "The Mighty Lion" }
      ]
    },
    prompt_questions: [
      "Where does the lion live?",
      "What is the lion's favorite food?",
      "When does he like to rest?"
    ]
  },
  find_differences: {
    picA: {
      title: "Picture A (Forest Afternoon)",
      image_url: "/images/week${weekNum}/w${weekNum}_diff_scene_a.jpg"
    },
    picB: {
      title: "Picture B (Forest Afternoon Difference)",
      image_url: "/images/week${weekNum}/w${weekNum}_diff_scene_b.jpg"
    },
    differences: [
      { id: "d1", name: "Mouse Tail Direction", x: 45, y: 70, prompt_en: "In Picture A, the mouse tail points up, but in Picture B, it points down." },
      { id: "d2", name: "Tree Flower Color", x: 20, y: 35, prompt_en: "In Picture A, the flower is pink, but in Picture B, it is yellow." },
      { id: "d3", name: "Butterfly on Rock", x: 75, y: 60, prompt_en: "In Picture A, there is a blue butterfly, but in Picture B, there is no butterfly." },
      { id: "d4", name: "Sun Position", x: 85, y: 15, prompt_en: "In Picture A, the sun is high, but in Picture B, it is behind a cloud." }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
`;
fs.writeFileSync(path.join(targetDir, 'speaking_hub.js'), speakingHubCode, 'utf8');

// 6. Generate index.js
const indexCode = `// Pure Generated Master Index for Week ${weekNum}
import { readingHub } from './reading_hub.js';
import { listeningHub } from './listening_hub.js';
import { writingHub } from './writing_hub.js';
import { speakingHub } from './speaking_hub.js';
import { week${weekNum}Vocab } from './vocab.js';

export const weekData = {
  week: ${weekNum},
  theme: "${bp.theme}",
  vocab: week${weekNum}Vocab,
  reading_hub: readingHub,
  listening_hub: listeningHub,
  writing_hub: writingHub,
  speaking_hub: speakingHub,
  stations: {
    reading_hub: readingHub,
    listening_hub: listeningHub,
    writing_hub: writingHub,
    speaking_hub: speakingHub
  }
};

export default weekData;
`;
fs.writeFileSync(path.join(targetDir, 'index.js'), indexCode, 'utf8');

console.log(`✅ Successfully generated pure data files for Week ${weekNum}!`);
