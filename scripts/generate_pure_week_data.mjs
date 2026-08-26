#!/usr/bin/env node
/**
 * PURE WEEK DATA GENERATOR (Zero-Cloning Compliant & Gold Standard Master)
 * Produces 100% compliant 4-Hub architecture + Station modules matching W33 Golden Master.
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
console.log(`✨ GENERATING PURE DATA FOR WEEK ${weekNum} (GOLD STANDARD 4-HUB)`);
console.log(`========================================================================`);

const targetDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. VOCAB.JS (20 Words)
// ─────────────────────────────────────────────────────────────────────────────
const vocab34 = [
  { id: 1, word: "lion", definition_en: "A large wild cat known as the king of the jungle.", definition_vi: "Sư tử, loài mèo lớn được mệnh danh là vua rừng xanh.", example_en: "The mighty lion was sleeping under a shady tree.", example_vi: "Chú sư tử dũng mãnh đang ngủ dưới bóng cây râm mát.", audio_word: `/audio/week${weekNum}/vocab_lion.mp3` },
  { id: 2, word: "mouse", definition_en: "A tiny furry animal with a long tail.", definition_vi: "Chú chuột nhỏ bé có đuôi dài và bộ lông mềm.", example_en: "A tiny mouse ran across the forest path.", example_vi: "Một chú chuột nhỏ chạy ngang qua lối đi trong rừng.", audio_word: `/audio/week${weekNum}/vocab_mouse.mp3` },
  { id: 3, word: "paw", definition_en: "The foot of an animal that has claws.", definition_vi: "Bàn chân có móng vuốt của động vật.", example_en: "The mouse accidentally touched the lion's front paw.", example_vi: "Chú chuột vô tình chạm vào bàn chân trước của sư tử.", audio_word: `/audio/week${weekNum}/vocab_paw.mp3` },
  { id: 4, word: "hunter", definition_en: "A person who tracks and catches wild animals.", definition_vi: "Thợ săn, người lần theo và bắt động vật hoang dã.", example_en: "Two hunters set a trap in the woods.", example_vi: "Hai người thợ săn đặt bẫy trong rừng.", audio_word: `/audio/week${weekNum}/vocab_hunter.mp3` },
  { id: 5, word: "net", definition_en: "A strong trap made of twisted ropes.", definition_vi: "Tấm lưới bẫy chắc chắn làm từ dây thừng.", example_en: "The lion was caught in a heavy rope net.", example_vi: "Sư tử bị mắc kẹt trong một tấm lưới thừng nặng.", audio_word: `/audio/week${weekNum}/vocab_net.mp3` },
  { id: 6, word: "rope", definition_en: "Strong thick cord used for tying things.", definition_vi: "Dây thừng chắc dày dùng để buộc đồ vật.", example_en: "The brave mouse chewed through the thick rope.", example_vi: "Chú chuột dũng cảm gặm đứt sợi dây thừng dày.", audio_word: `/audio/week${weekNum}/vocab_rope.mp3` },
  { id: 7, word: "trap", definition_en: "A device used to catch animals.", definition_vi: "Cái bẫy dùng để bắt động vật.", example_en: "The lion stepped into a hidden trap.", example_vi: "Sư tử bước vào một cái bẫy bị giấu kín.", audio_word: `/audio/week${weekNum}/vocab_trap.mp3` },
  { id: 8, word: "chew", definition_en: "To bite something repeatedly with teeth.", definition_vi: "Gặm hoặc nhai liên tục bằng răng.", example_en: "The mouse began to chew the ropes quickly.", example_vi: "Chú chuột bắt đầu gặm dây thừng thật nhanh.", audio_word: `/audio/week${weekNum}/vocab_chew.mp3` },
  { id: 9, word: "free", definition_en: "To release from a cage, trap or danger.", definition_vi: "Giải thoát khỏi lồng, bẫy hoặc nguy hiểm.", example_en: "The little mouse set the big lion free.", example_vi: "Chú chuột nhỏ đã giải thoát cho chú sư tử to lớn.", audio_word: `/audio/week${weekNum}/vocab_free.mp3` },
  { id: 10, word: "promise", definition_en: "A statement that you will definitely do something.", definition_vi: "Lời hứa chắc chắn sẽ làm điều gì đó.", example_en: "The mouse kept his promise to help his friend.", example_vi: "Chú chuột đã giữ đúng lời hứa giúp đỡ bạn mình.", audio_word: `/audio/week${weekNum}/vocab_promise.mp3` },
  { id: 11, word: "roar", definition_en: "To make a very loud, deep sound.", definition_vi: "Tiếng gầm lớn, trầm của sư tử hoặc thú dữ.", example_en: "The trapped lion let out a loud roar.", example_vi: "Chú sư tử bị mắc bẫy phát ra tiếng gầm thật to.", audio_word: `/audio/week${weekNum}/vocab_roar.mp3` },
  { id: 12, word: "forest", definition_en: "A large area filled with many trees.", definition_vi: "Khu rừng rộng lớn có nhiều cây cối.", example_en: "They lived in a peaceful green forest.", example_vi: "Họ sống trong một khu rừng xanh yên bình.", audio_word: `/audio/week${weekNum}/vocab_forest.mp3` },
  { id: 13, word: "claws", definition_en: "Sharp curved nails on an animal's foot.", definition_vi: "Móng vuốt sắc nhọn trên chân thú.", example_en: "The lion opened his big sharp claws.", example_vi: "Sư tử giương bộ móng vuốt to và sắc nhọn.", audio_word: `/audio/week${weekNum}/vocab_claws.mp3` },
  { id: 14, word: "sharp", definition_en: "Having a thin edge or point that cuts easily.", definition_vi: "Sắc bén, có cạnh mỏng hoặc đầu nhọn dễ cắt.", example_en: "The mouse used his sharp front teeth.", example_vi: "Chú chuột dùng những chiếc răng cửa sắc bén.", audio_word: `/audio/week${weekNum}/vocab_sharp.mp3` },
  { id: 15, word: "fable", definition_en: "A short traditional story teaching a moral lesson.", definition_vi: "Truyện ngụ ngôn ngắn dạy bài học đạo đức.", example_en: "Aesop wrote many wonderful fables.", example_vi: "Aesop đã viết nhiều câu chuyện ngụ ngôn tuyệt vời.", audio_word: `/audio/week${weekNum}/vocab_fable.mp3` },
  { id: 16, word: "cooperate", definition_en: "To work together toward a shared goal.", definition_vi: "Hợp tác, cùng làm việc hướng tới mục tiêu chung.", example_en: "Animals cooperate to survive in the wild.", example_vi: "Động vật hợp tác để sinh tồn trong tự nhiên.", audio_word: `/audio/week${weekNum}/vocab_cooperate.mp3` },
  { id: 17, word: "brave", definition_en: "Showing courage and not being afraid.", definition_vi: "Dũng cảm, can đảm và không sợ hãi.", example_en: "The brave mouse rushed over to rescue the lion.", example_vi: "Chú chuột dũng cảm lao tới để giải cứu sư tử.", audio_word: `/audio/week${weekNum}/vocab_brave.mp3` },
  { id: 18, word: "grateful", definition_en: "Feeling thankful for someone's kindness.", definition_vi: "Biết ơn, cảm kích vì lòng tốt của người khác.", example_en: "The lion felt deeply grateful to his little helper.", example_vi: "Sư tử cảm thấy vô cùng biết ơn người bạn nhỏ.", audio_word: `/audio/week${weekNum}/vocab_grateful.mp3` },
  { id: 19, word: "ecosystem", definition_en: "A community of living organisms interacting together in nature.", definition_vi: "Hệ sinh thái, tập hợp các sinh vật sống tương tác cùng nhau trong tự nhiên.", example_en: "All creatures play an important role in the forest ecosystem.", example_vi: "Mọi loài sinh vật đều đóng vai trò quan trọng trong hệ sinh thái rừng.", audio_word: `/audio/week${weekNum}/vocab_ecosystem.mp3` },
  { id: 20, word: "friendship", definition_en: "The state of being mutual, caring friends.", definition_vi: "Tình bạn, sự gắn bó thân thiết giữa bạn bè.", example_en: "True friendship makes everyone stronger and happier.", example_vi: "Tình bạn chân thành giúp mọi người mạnh mẽ và hạnh phúc hơn.", audio_word: `/audio/week${weekNum}/vocab_friendship.mp3` }
];

const vocabCode = `// Pure Generated Target Vocab for Week ${weekNum}
export const week${weekNum}Vocab = ${JSON.stringify(vocab34, null, 2)};

export const vocabList = week${weekNum}Vocab;
export default week${weekNum}Vocab;
`;
fs.writeFileSync(path.join(targetDir, 'vocab.js'), vocabCode, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 2. READING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const readingHubCode = `// Pure Generated Reading Hub for Week ${weekNum}
import { week${weekNum}Vocab } from './vocab.js';

export const readingHub = {
  theme: "The Lion and the Mouse",
  cefr_level: "A2 Flyers",
  vocab: week${weekNum}Vocab,

  read_explore: {
    title: "The Lion and the Mouse",
    story_scenes: [
      {
        id: "scene_1",
        scene_number: 1,
        title_en: "Scene 1: The Sleeping Lion",
        title_vi: "Cảnh 1: Sư Tử Đang Ngủ",
        narration_en: "On a warm afternoon, the mighty **lion was sleeping** peacefully under the trees.",
        narration_vi: "Vào một buổi chiều ấm áp, chú sư tử dũng mãnh đang ngủ yên bình dưới tán cây.",
        image_url: "/images/week${weekNum}/webtoon_scene_1.png",
        hotspots: [
          { id: "h1_1", label_en: "Sleeping Lion", label_vi: "Sư tử đang ngủ", x: 45, y: 55 },
          { id: "h1_2", label_en: "Shady Trees", label_vi: "Hàng cây râm mát", x: 20, y: 30 },
          { id: "h1_3", label_en: "Forest Floor", label_vi: "Mặt đất rừng", x: 80, y: 75 }
        ]
      },
      {
        id: "scene_2",
        scene_number: 2,
        title_en: "Scene 2: The Little Mouse Arrives",
        title_vi: "Cảnh 2: Chuột Nhỏ Xuất Hiện",
        narration_en: "While the lion was resting, a **tiny mouse ran** across the lion's big front paw.",
        narration_vi: "Trong khi sư tử đang nghỉ ngơi, một chú chuột nhỏ chạy ngang qua bàn chân trước to lớn.",
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
        narration_vi: "Chú chuột cầu xin tha mạng và hứa sẽ giúp sư tử một ngày nào đó nếu được tha.",
        image_url: "/images/week${weekNum}/webtoon_scene_3.png",
        hotspots: [
          { id: "h3_1", label_en: "Begging Mouse", label_vi: "Chuột cầu xin", x: 55, y: 65 },
          { id: "h3_2", label_en: "Gentle Lion", label_vi: "Sư tử nhân từ", x: 40, y: 45 },
          { id: "h3_3", label_en: "Big Claws", label_vi: "Móng vuốt lớn", x: 60, y: 55 }
        ]
      },
      {
        id: "scene_4",
        scene_number: 4,
        title_en: "Scene 4: The Hunter's Trap",
        title_vi: "Cảnh 4: Bẫy Của Thợ Săn",
        narration_en: "A few days later, hunters trapped the lion in a **strong net** made of thick ropes.",
        narration_vi: "Vài ngày sau, những người thợ săn bẫy sư tử trong tấm lưới chắc chắn làm từ dây thừng dày.",
        image_url: "/images/week${weekNum}/webtoon_scene_4.png",
        hotspots: [
          { id: "h4_1", label_en: "Hunter's Net", label_vi: "Lưới thợ săn", x: 50, y: 50 },
          { id: "h4_2", label_en: "Trapped Lion", label_vi: "Sư tử mắc bẫy", x: 45, y: 60 },
          { id: "h4_3", label_en: "Thick Ropes", label_vi: "Dây thừng dày", x: 65, y: 40 }
        ]
      },
      {
        id: "scene_5",
        scene_number: 5,
        title_en: "Scene 5: True Friends Forever",
        title_vi: "Cảnh 5: Bạn Tốt Mãi Mãi",
        narration_en: "The little mouse quickly **chewed through the ropes** and set the lion completely free.",
        narration_vi: "Chú chuột nhỏ nhanh chóng gặm đứt dây thừng và trả tự do hoàn toàn cho sư tử.",
        image_url: "/images/week${weekNum}/webtoon_scene_5.png",
        hotspots: [
          { id: "h5_1", label_en: "Chewed Ropes", label_vi: "Dây thừng bị gặm", x: 50, y: 60 },
          { id: "h5_2", label_en: "Free Lion", label_vi: "Sư tử tự do", x: 35, y: 45 },
          { id: "h5_3", label_en: "Happy Mouse", label_vi: "Chuột vui vẻ", x: 70, y: 65 }
        ]
      }
    ]
  },

  clil_article: {
    id: "clil_w34_animal_helpers",
    theme: "Animal Helpers in Nature",
    title_en: "Animal Helpers in Nature",
    title_vi: "Những Người Bạn Giúp Đỡ Lẫn Nhau Trong Tự Nhiên",
    content_en: "In nature, many animals help and work together to build safe homes in the forest. Large animals like lions protect the forest and help young plants and trees grow strong. Tiny mice eat small insects and carry seeds into the ground. Colourful birds fly high in the trees to chirp loudly and help alert their animal friends. When different creatures help one another, the whole forest stays green and healthy.",
    content_vi: "Trong tự nhiên, nhiều loài động vật làm việc cùng nhau để sinh tồn và khỏe mạnh. Giống như chú chuột nhỏ giúp sư tử to lớn trong truyện ngụ ngôn, các loài động vật thực tế cũng giúp đỡ lẫn nhau mỗi ngày! Một loài chim nhỏ tên là chim bắt ve thường đậu trên lưng chú ngựa vằn to lớn. Trong khi ngựa vằn đang gặm cỏ, chú chim ăn những con bọ nhỏ trên da ngựa vằn. Điều này mang lại thức ăn cho chim và giúp ngựa vằn sạch sẽ. Dưới đại dương, những chú cá dọn vệ sinh nhỏ bơi vào trong miệng cá mập lớn. Cá mập không bao giờ cắn vì cá nhỏ làm sạch răng sắc nhọn của chúng! Khi các loài động vật hợp tác, mọi loài đều an toàn và khỏe mạnh.",
    cover_image: "/images/week${weekNum}/explore_cover_w${weekNum}.jpg",
    audio_url: "/audio/week${weekNum}/explore.mp3",
    glossary: [
      { term: "Mutual Help", meaning: "A close natural relationship where two different species help each other survive." },
      { term: "Cooperation", meaning: "Working together harmoniously toward a shared and helpful outcome." },
      { term: "Ecosystem", meaning: "A biological community of interacting organisms and their physical forest environment." }
    ],
    check_questions: [
      {
        id: 1,
        question_en: "What does the oxpecker bird eat while sitting on the zebra?",
        options: ["Small bugs off the zebra's skin", "Grass seeds on the ground", "Tree leaves in the forest"],
        answer: "Small bugs off the zebra's skin"
      },
      {
        id: 2,
        question_en: "Why do large sharks never bite small cleaner fish?",
        options: ["Because the small fish clean their sharp teeth", "Because the fish are too fast", "Because sharks are sleeping"],
        answer: "Because the small fish clean their sharp teeth"
      },
      {
        id: 3,
        question_en: "What lesson about nature does this article teach us?",
        options: ["Animals cooperate and help each other to survive", "Big animals must always live alone", "Small animals never help large animals"],
        answer: "Animals cooperate and help each other to survive"
      }
    ],
    critical_thinking: {
      question_en: "Why is cooperation between different animals important in the forest?",
      hint_en: "Think about how each animal gives something helpful: one gets food and the other stays clean and healthy."
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

  rw_part_6: {
    instructions: "Read the story diary and write the missing words. Write one word on each line.",
    title: "Leo's Storybook Diary: Friday",
    example: { target: "under" },
    text_template: "Dear Diary, today I read a wonderful fable. A huge lion was sleeping [0]_____ a shady tree in the forest. Suddenly, a tiny mouse ran across his [1]_____. The lion caught the mouse, but he let him go [2]_____ he was kind. A few days later, hunters caught the lion in a heavy [3]_____. The mouse chewed the ropes and [4]_____ the lion safely. They became [5]_____ friends!",
    answers: {
      "0": "under",
      "1": "paw",
      "2": "because",
      "3": "net",
      "4": "freed",
      "5": "best"
    }
  },

  rw_part_6_check_mode: {
    instructions: "Read the diary and write the missing words. Write one word on each line.",
    title: "Oliver's Fable Notes: Saturday (Check Mode)",
    example: { target: "under" },
    text_template: "Today I wrote about the lion and the mouse. While the lion was [0]_____ under a tree, a tiny mouse ran [1]_____ his paw. The lion woke [2]_____ angrily. Later, hunters trapped the lion [3]_____ a net. The mouse helped him [4]_____ chewing the ropes. They stayed [5]_____ forever.",
    answers: {
      "0": "sleeping",
      "1": "across",
      "2": "up",
      "3": "in",
      "4": "by",
      "5": "friends"
    }
  },

  check_mode_drills: [
    { id: 'q1', prompt: "The huge lion was sleeping ___ a green tree in the forest.", options: ["under", "between", "above"], answer: "under" },
    { id: 'q2', prompt: "A tiny mouse ran across the lion's front ___ by accident.", options: ["paw", "tail", "ear"], answer: "paw" },
    { id: 'q3', prompt: "The lion woke up angrily and ___ the mouse with sharp claws.", options: ["caught", "is catching", "catches"], answer: "caught" },
    { id: 'q4', prompt: "The scared mouse promised to ___ the mighty lion one day.", options: ["help", "eating", "fight"], answer: "help" },
    { id: 'q5', prompt: "Two hunters placed a strong rope ___ to catch the wild animal.", options: ["net", "blanket", "towel"], answer: "net" },
    { id: 'q6', prompt: "While the lion was walking, he stepped into a hidden ___.", options: ["trap", "cloud", "star"], answer: "trap" },
    { id: 'q7', prompt: "The lion roared loudly because the ropes were very ___.", options: ["tight", "soft", "sweet"], answer: "tight" },
    { id: 'q8', prompt: "The brave mouse chewed the thick ropes with his ___ teeth.", options: ["sharp", "round", "warm"], answer: "sharp" },
    { id: 'q9', prompt: "The lion was ___ safely and thanked his little friend.", options: ["freed", "trapped", "lost"], answer: "freed" },
    { id: 'q10', prompt: "Even the smallest friend can be a ___ help in times of need.", options: ["great", "scared", "dark"], answer: "great" }
  ],

  rw_part1: {
    word_bank: [
      "a lion", "a mouse", "a net", "a hunter", "a forest",
      "sharp teeth", "a trap", "a rope", "a zebra", "a fable",
      "a monkey", "a cave", "a river", "a songbird", "a paw"
    ],
    example: { id: 0, text: "A short story that teaches a moral lesson, often with animal characters.", target: "a fable" },
    definitions: [
      { id: 1, text: "This is a large wild cat known as the king of the forest.", target: "a lion" },
      { id: 2, text: "This is a very small animal with a long tail and soft fur.", target: "a mouse" },
      { id: 3, text: "Hunters tie this material between trees to catch animals.", target: "a net" },
      { id: 4, text: "This person chases and catches wild animals in the forest.", target: "a hunter" },
      { id: 5, text: "This is a large area of land covered with many green trees.", target: "a forest" },
      { id: 6, text: "Animals use these pointed parts in their mouths to cut food and ropes.", target: "sharp teeth" },
      { id: 7, text: "This is strong, thick cord made of twisted threads.", target: "a rope" },
      { id: 8, text: "This animal has black and white stripes and lives on grasslands.", target: "a zebra" },
      { id: 9, text: "This is a hidden device placed in the woods to catch wild animals.", target: "a trap" },
      { id: 10, text: "This is the foot of an animal that has claws and pads.", target: "a paw" }
    ]
  },

  rw_part2: {
    title: "Leo & Milo's Fable Conversation",
    example: { speaker_a: "Leo", text_a: "Why did you wake me up?", speaker_b: "Milo", answer_letter: "D", answer_text: "I am sorry! I was running in a hurry." },
    turns: [
      { id: "q1", speaker_a: "Leo", text_a: "What can a tiny creature do for me?", correct_letter: "G" },
      { id: "q2", speaker_a: "Milo", text_a: "One day, I might be able to help you!", correct_letter: "B" },
      { id: "q3", speaker_a: "Leo", text_a: "Haha! That is very funny.", correct_letter: "A" },
      { id: "q4", speaker_a: "Leo", text_a: "Help! I am trapped in this net!", correct_letter: "F" },
      { id: "q5", speaker_a: "Milo", text_a: "Don't worry! I will chew through these ropes.", correct_letter: "E" }
    ],
    answer_options: [
      { letter: "A", text: "Thank you, kind lion! I will never forget your mercy." },
      { letter: "B", text: "Even small friends can be a great help." },
      { letter: "C", text: "I'm sorry for disturbing your rest." },
      { letter: "D", text: "I am sorry! I was running in a hurry." },
      { letter: "E", text: "I remember my promise! Let me free you now." },
      { letter: "F", text: "Please help me, little mouse!" },
      { letter: "G", text: "Nothing much. Small creatures are too weak." },
      { letter: "H", text: "I will call the other animals to help." }
    ]
  },

  reading_part3_story: {
    example: { blank: 0, answer: "excited" },
    story_text: "Harry was [0]_____ because he was reading about forest animals today. The lion was resting peacefully when a little mouse ran across his paw. 'I hope the lion will be [1]_____,' thought the mouse. The lion was very [2]_____ and let the mouse go. Later, hunters set a [3]_____ trap with thick ropes. The mouse arrived very [4]_____ and chewed through the net. 'You are the most [5]_____ friend ever,' roared the grateful lion.",
    word_bank: ["excited", "kind", "surprised", "heavy", "quickly", "loyal", "sleeping", "cold", "afraid", "hungry"],
    answers: {
      "0": "excited",
      "1": "kind",
      "2": "surprised",
      "3": "heavy",
      "4": "quickly",
      "5": "loyal"
    },
    title_options: [
      "A Busy Day in the City",
      "The Mighty Lion and His Loyal Friend",
      "A Trip to the Sunny Beach"
    ],
    correct_title: "The Mighty Lion and His Loyal Friend"
  },

  rw_part4: {
    instructions: "Read the text. Choose the correct words and write them on the lines.",
    story_text: "Lions are powerful animals that live in [1]_____. They spend many hours [2]_____ during the hottest parts of the day. A tiny mouse is very small [3]_____ it has sharp front teeth. When the lion was trapped [4]_____ a rope net, the little mouse rushed [5]_____ help him immediately. He chewed [6]_____ the thick cords until the lion escaped. Animals in the wild often [7]_____ each other to stay safe. This fable teaches us [8]_____ even small friends can do great things. We should always [9]_____ kind to others because kindness is never [10]_____.",
    example: { blank: 1, correct: "forests", options: ["forests", "forest", "a forest"] },
    blanks: [
      { id: 2, correct: "sleeping", options: ["sleep", "sleeping", "slept"] },
      { id: 3, correct: "quick", options: ["quick", "quickly", "quicker"] },
      { id: 4, correct: "overcome", options: ["overcome", "overcomes", "overcame"] },
      { id: 5, correct: "stronger", options: ["strong", "stronger", "strongest"] },
      { id: 6, correct: "protect", options: ["protect", "protects", "protected"] },
      { id: 7, correct: "during", options: ["during", "while", "when"] },
      { id: 8, correct: "survive", options: ["survive", "survives", "survived"] },
      { id: 9, correct: "bravely", options: ["brave", "bravely", "braver"] },
      { id: 10, correct: "loyal", options: ["loyal", "loyalty", "loyally"] }
    ],
    questions: [
      { gap: 1, options: ["forests", "oceans", "clouds"], answer: "forests" },
      { gap: 2, options: ["sleeping", "sleeps", "slept"], answer: "sleeping" },
      { gap: 3, options: ["but", "or", "so"], answer: "but" },
      { gap: 4, options: ["in", "on", "at"], answer: "in" },
      { gap: 5, options: ["to", "for", "with"], answer: "to" },
      { gap: 6, options: ["through", "between", "under"], answer: "through" },
      { gap: 7, options: ["help", "helps", "helping"], answer: "help" },
      { gap: 8, options: ["that", "which", "who"], answer: "that" },
      { gap: 9, options: ["be", "been", "being"], answer: "be" },
      { gap: 10, options: ["wasted", "waste", "wasting"], answer: "wasted" }
    ],
    title_options: [
      "The Animals of the Forest",
      "The Lesson of the Fable",
      "How to Build a Net"
    ],
    correct_title: "The Lesson of the Fable"
  },

  rw_part5: {
    story_title: "A Hero in the Forest",
    story_text: "Last weekend, Oliver and his sister Lily visited the animal wildlife park. At the educational storytelling corner, a park guide was reading Aesop's famous fable to all the children. The guide explained that a huge lion lived in a peaceful forest with many tall trees. While the lion was sleeping, a tiny mouse accidentally ran across his paw. Instead of eating the mouse, the lion showed great kindness and let him go free. Later that week, hunters caught the lion in a heavy net. The mouse did not run away in fear; he rushed over and used his sharp teeth to cut the ropes. Oliver and Lily loved the story because it showed that even the smallest creature can do great things.",
    example: {
      prompt: ${JSON.stringify(weekNum === 34 ? "Oliver and his sister Lily visited the animal wildlife park last ___" : "Richard went to visit a castle with his parents last ___")},
      answer: "weekend"
    },
    questions: [
      { id: "q1", prompt: "Where was the lion sleeping at the beginning?", answer: "under a tall tree" },
      { id: "q2", prompt: "How did the mouse free the lion from the net?", answer: "chewed the ropes" },
      { id: "q3", prompt: "What did the lion promise the mouse?", answer: "to be his friend forever" },
      { id: "q4", prompt: "Who trapped the lion in the forest?", answer: "hunters with strong ropes" },
      { id: "q5", prompt: "What material was the net made of?", answer: "thick ropes" },
      { id: "q6", prompt: "Why did the mouse help the lion?", answer: "because he promised to return the favor" },
      { id: "q7", prompt: "How did they feel after the rescue?", answer: "grateful and loyal friends" }
    ]
  },
  rw_part_1: null,
  rw_part_2: null,
  rw_part_4: null,
  rw_part_5: null
};

readingHub.week = Number(${weekNum});
readingHub.story_scenes = readingHub.read_explore.story_scenes;
readingHub.interactive_story = readingHub.read_explore.story_scenes;
readingHub.rw_part_1 = readingHub.rw_part1;
readingHub.rw_part_2 = readingHub.rw_part2;
readingHub.rw_part_4 = readingHub.rw_part4;
readingHub.rw_part_5 = readingHub.rw_part5;

export const readingHubData = readingHub;
export default readingHub;
`;
fs.writeFileSync(path.join(targetDir, 'reading_hub.js'), readingHubCode, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 3. LISTENING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const listeningHubCode = `// Pure Generated Listening Hub for Week ${weekNum}
export const listeningHub = {
  listening_p1: {
    image_url: "/images/week${weekNum}/w${weekNum}_listening_p1_scene.jpg",
    audio_url: "/audio/week${weekNum}/listening_p1_full.mp3",
    passage_audio_script: \`Man: Look at Part 1. Now look at the picture. Listen and look. There is one example.
Girl: I can see a big animal sleeping under the tree!
Man: Yes, that is Leo the lion. He is resting peacefully.
Girl: Can you see the example line? Now you listen and draw lines.
Girl: Can you see the tiny mouse running near the lion's front paw?
Man: Yes, that is Milo the mouse. He is looking for seeds.
Girl: Who is that man hiding behind the bushes with a rope net?
Man: That is Hunter Jack. He is setting a trap between the trees.
Girl: Look up on the high branch! Who is that wise owl?
Man: That is Oliver the owl. He is watching the whole forest.
Girl: Look near the stream! There is a little bird singing.
Man: That is Bella the bird. She has colorful feathers.
Girl: Who is the white rabbit drinking water at the riverbank?
Man: That is Rob the rabbit. He is hopping gently.\`,
    names: [
      { id: "n1", text: "Leo the Lion", target_id: "t1", isExample: true },
      { id: "n2", text: "Milo the Mouse", target_id: "t2" },
      { id: "n3", text: "Hunter Jack", target_id: "t3" },
      { id: "n4", text: "Oliver the Owl", target_id: "t4" },
      { id: "n5", text: "Bella the Bird", target_id: "t5" },
      { id: "n6", text: "Rob the Rabbit", target_id: "t6" },
      { id: "n7", text: "Sammy the Squirrel", target_id: null }
    ],
    targets: [
      { id: "t1", label: "Leo (Large sleeping lion under tree)", x: 45, y: 55, isExample: true },
      { id: "t2", label: "Milo (Tiny mouse on mossy rock)", x: 30, y: 70 },
      { id: "t3", label: "Hunter Jack (Man holding rope behind bush)", x: 80, y: 50 },
      { id: "t4", label: "Oliver (Wise owl on high branch)", x: 65, y: 25 },
      { id: "t5", label: "Bella (Colorful bird near stream)", x: 50, y: 18 },
      { id: "t6", label: "Rob (White rabbit drinking at riverbank)", x: 18, y: 75 }
    ]
  },

  listening_p2: {
    title: "The Forest Wildlife Project",
    audio_url: "/audio/week${weekNum}/listening_p2_full.mp3",
    example: { field_label: "Fable story title", answer: "The Lion and Mouse" },
    fields: [
      { id: "f1", field_label: "Lion location", answer: "under a tree" },
      { id: "f2", field_label: "Running animal", answer: "tiny mouse" },
      { id: "f3", field_label: "Hunter equipment", answer: "rope net" },
      { id: "f4", field_label: "Cutting method", answer: "sharp teeth" },
      { id: "f5", field_label: "Story moral", answer: "small friends help" }
    ]
  },

  listening_p3: {
    example: { name: "Binoculars", target_letter: "H" },
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

  listening_p4: {
    audio_url: "/audio/week${weekNum}/listening_p4_full.mp3",
    instructions: "Listen and tick the box. There is one example.",
    questions: [
      {
        id: "p4_example",
        isExample: true,
        question_en: "Where did Milo the mouse run in the morning?",
        audio_url: "/audio/week${weekNum}/listening_p4_example.mp3",
        audio_script: \`Boy: Look at the example. Where did Milo the mouse run in the morning?\\nGirl: He ran across the mossy rocks.\\nBoy: Can you see the tick? Now you listen and tick the box.\`,
        options: [
          { letter: "A", text: "Across the mossy rocks", image_url: "/images/week${weekNum}/card_c.jpg" },
          { letter: "B", text: "Near the hunter camp", image_url: "/images/week${weekNum}/card_b.jpg" },
          { letter: "C", text: "Around the water river", image_url: "/images/week${weekNum}/card_d.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q1",
        question_en: "Where was the lion resting in the afternoon?",
        audio_url: "/audio/week${weekNum}/listening_p4_q1.mp3",
        audio_script: \`Boy: Question 1. Where was the lion resting in the afternoon?\\nGirl: He was sleeping peacefully under a shady tree.\`,
        options: [
          { letter: "A", text: "Under a shady tree", image_url: "/images/week${weekNum}/webtoon_scene_1.png" },
          { letter: "B", text: "Near a rocky cave", image_url: "/images/week${weekNum}/card_f.jpg" },
          { letter: "C", text: "In the grassy field", image_url: "/images/week${weekNum}/card_b.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q2",
        question_en: "What trapped the lion in the forest?",
        audio_url: "/audio/week${weekNum}/listening_p4_q2.mp3",
        audio_script: \`Boy: Question 2. What trapped the lion in the forest?\\nGirl: The hunters placed a heavy rope net between the trees.\`,
        options: [
          { letter: "A", text: "A wooden cage", image_url: "/images/week${weekNum}/card_a.jpg" },
          { letter: "B", text: "A heavy rope net", image_url: "/images/week${weekNum}/webtoon_scene_4.png" },
          { letter: "C", text: "A deep ground hole", image_url: "/images/week${weekNum}/card_c.jpg" }
        ],
        answer: "B"
      },
      {
        id: "p4_q3",
        question_en: "How did the mouse free the lion?",
        audio_url: "/audio/week${weekNum}/listening_p4_q3.mp3",
        audio_script: \`Boy: Question 3. How did the mouse free the lion?\\nGirl: He chewed through the thick ropes with his sharp teeth.\`,
        options: [
          { letter: "A", text: "Using a wooden stick", image_url: "/images/week${weekNum}/card_d.jpg" },
          { letter: "B", text: "Calling other animals", image_url: "/images/week${weekNum}/card_e.jpg" },
          { letter: "C", text: "Chewing the thick ropes", image_url: "/images/week${weekNum}/webtoon_scene_5.png" }
        ],
        answer: "C"
      },
      {
        id: "p4_q4",
        question_en: "Who helped the lion escape?",
        audio_url: "/audio/week${weekNum}/listening_p4_q4.mp3",
        audio_script: \`Boy: Question 4. Who helped the lion escape?\\nGirl: The brave little mouse chewed the ropes to free him.\`,
        options: [
          { letter: "A", text: "The brave little mouse", image_url: "/images/week${weekNum}/webtoon_scene_5.png" },
          { letter: "B", text: "A big brown bear", image_url: "/images/week${weekNum}/card_f.jpg" },
          { letter: "C", text: "A wise gray owl", image_url: "/images/week${weekNum}/card_c.jpg" }
        ],
        answer: "A"
      },
      {
        id: "p4_q5",
        question_en: "How did the lion feel after being freed?",
        audio_url: "/audio/week${weekNum}/listening_p4_q5.mp3",
        audio_script: \`Boy: Question 5. How did the lion feel after being freed?\\nGirl: He felt grateful and relieved that his little friend saved him.\`,
        options: [
          { letter: "A", text: "Grateful and relieved", image_url: "/images/week${weekNum}/webtoon_scene_1.png" },
          { letter: "B", text: "Angry and hungry", image_url: "/images/week${weekNum}/card_b.jpg" },
          { letter: "C", text: "Scared of the mouse", image_url: "/images/week${weekNum}/card_g.jpg" }
        ],
        answer: "A"
      }
    ]
  },

  listening_p5: {
    image_url: "/images/week${weekNum}/webtoon_scene_1.png",
    audio_script: \`Nova: Listen and colour and write. There is one example.
Woman: Look at this picture of the forest. Can you see the tall oak tree?
Man: Yes, I can see it.
Woman: Good. Colour the top leaves dark green.
Nova: Can you see the green leaves? This is an example. Now you listen and colour and write.
Woman: Look at the lion resting on the grass. Can you see his big mane?
Man: Yes, shall I colour it?
Woman: Yes, colour the lion's mane golden yellow.
Woman: Can you see the hunter's rope near the bushes? Let's write a word.
Man: What word shall I write?
Woman: Write the word 'TRAP' near the ropes.
Woman: Look at the little mouse sitting on the rock.
Man: He is so small! What colour should he be?
Woman: Colour the little mouse grey.
Woman: Can you see the wooden signboard near the path? Let's write the final word.
Man: What word should I write?
Woman: Write the word 'FRIENDS' on the signboard.\`,
    instructions: [
      { id: "inst_0", item: "Example Object", text: "Color the example brown", x: 10, y: 10, color: "brown", isExample: true },
      { id: "inst_1", item: "Lion Mane", text: "Color the lion's mane golden yellow", x: 45, y: 55, color: "yellow", action: "colour" },
      { id: "inst_2", item: "Rope Trap", text: "Write the word 'TRAP' near the ropes", x: 65, y: 45, word: "TRAP", action: "write" },
      { id: "inst_3", item: "Tiny Mouse", text: "Color the little mouse grey", x: 30, y: 70, color: "grey", action: "colour" },
      { id: "inst_4", item: "Forest Signboard", text: "Write the word 'FRIENDS' on the signboard", x: 80, y: 30, word: "FRIENDS", action: "write" },
      { id: "inst_5", item: "Hunter's Hat", text: "Color the hat dark green", x: 90, y: 20, color: "dark green", action: "colour" }
    ]
  }
};

export const listeningHubData = listeningHub;
export default listeningHub;
`;
fs.writeFileSync(path.join(targetDir, 'listening_hub.js'), listeningHubCode, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 4. WRITING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const writingHubCode = `// Pure Generated Writing Hub for Week ${weekNum}
import { readingHub } from './reading_hub.js';

export const writingHub = {
  week: Number(${weekNum}),
  theme: "The Lion and the Mouse",
  picture_story: {
    title: "The Lion and the Brave Mouse",
    panels: [
      { image_url: "/images/week${weekNum}/webtoon_scene_1.png", caption: "The mighty lion was sleeping peacefully under a tree." },
      { image_url: "/images/week${weekNum}/webtoon_scene_4.png", caption: "Hunters trapped the lion in a heavy rope net." },
      { image_url: "/images/week${weekNum}/webtoon_scene_5.png", caption: "The brave mouse chewed the ropes and freed the lion." }
    ],
    steps: [
      {
        scene: 1,
        ladder_stage: "MODEL",
        badge_label: "MODEL",
        title: "Scene 1: Lion in the Forest",
        image_url: "/images/week${weekNum}/webtoon_scene_1.png",
        caption: "The mighty lion was resting under a tall oak tree in the forest.",
        frame_L1: "The mighty lion was sleeping peacefully under a tall oak tree.",
        locked_connector: "In the beginning,",
        ordered_chips: ["the mighty lion", "was sleeping peacefully", "under a tall oak tree"],
        pills: ["the mighty lion", "was sleeping peacefully", "under a tall oak tree"],
        audio: "On a sunny afternoon, the mighty lion was resting under a tall tree."
      },
      {
        scene: 2,
        ladder_stage: "BUILD",
        badge_label: "BUILD",
        title: "Scene 2: Trapped in Heavy Net",
        image_url: "/images/week${weekNum}/webtoon_scene_4.png",
        caption: "The hunters trapped the strong lion in a heavy rope net.",
        frame_L1: "Suddenly, hunters trapped the lion in a heavy rope net.",
        connectors: ["Then", "Suddenly", "After that"],
        display_chips: ["trapped the strong lion", "the hunters", "in a heavy rope net"],
        pills: ["trapped the strong lion", "the hunters", "in a heavy rope net"],
        correct_order: ["the hunters", "trapped the strong lion", "in a heavy rope net"],
        audio: "Suddenly, the hunters trapped the lion in a strong net."
      },
      {
        scene: 3,
        ladder_stage: "WRITE",
        badge_label: "WRITE",
        title: "Scene 3: Mouse Frees the Lion",
        image_url: "/images/week${weekNum}/webtoon_scene_5.png",
        caption: "The brave mouse chewed through the thick ropes and freed the lion.",
        frame_L1: "The brave mouse chewed the thick ropes and freed the mighty lion.",
        connectors: ["Finally", "In the end", "At last"],
        keywords: ["the brave mouse", "chew", "the thick ropes", "free"],
        pills: ["the brave mouse", "chew", "the thick ropes", "free"],
        audio: "Finally, the brave mouse chewed the ropes and freed the lion."
      }
    ],
    connectors: ["In the beginning,", "Suddenly,", "Finally,"],
    word_bank: [
      "lion", "mouse", "sleeping", "shady tree", "forest",
      "hunters", "trapped", "heavy net", "thick ropes", "chewed",
      "sharp teeth", "freed", "escaped", "grateful", "best friends"
    ],
    min_words: 20
  },

  rw_part_1: readingHub.rw_part1,
  rw_part_2: readingHub.rw_part2,
  rw_part_3: readingHub.reading_part3_story,
  rw_part_4: readingHub.rw_part4,
  rw_part_5: readingHub.rw_part5,

  writing_chunks: {
    setting_time: ["On a sunny afternoon", "Under a shady tree", "In the deep forest", "During morning hours"],
    action_manner: ["was sleeping peacefully", "ran quickly across", "chewed through ropes", "roared loudly for help"],
    problem_event: ["stepped into a rope trap", "was caught in a heavy net", "felt scared and helpless"],
    solution_outcome: ["cut the thick ropes", "freed the mighty lion", "became loyal friends forever"]
  },

  science_report_config: {
    topic: "Animal Cooperation in Nature",
    notebookTitle: "Animal Cooperation Lab Notebook",
    purpose: "🌱 Today we write like little scientists: we say what we SAW, use past tense, and join ideas with because / so!",
    teacher_parent_note: "Learn the language of science reports (observed / because / past tense), not science content.",
    data_card: [
      { subject: "🐿️ Squirrels", action: "buried extra nuts in the ground", result: "some nuts grew into new oak trees" },
      { subject: "🐝 Bees", action: "drank sweet nectar from flowers", result: "carried pollen to help new flowers grow" },
      { subject: "🐦 Jays", action: "hid seeds under soft leaves", result: "started small green plants across the forest" }
    ],
    step1Title: "Observe Animal Roles",
    step1Pills: {
      "🦁 Large Animals": ["protect the forest territory", "maintain balance in nature", "keep other animals safe"],
      "🐭 Small Helpers": ["clean the forest floor", "plant new seeds", "help larger friends in trouble"]
    },
    step2Title: "Measure Mutual Benefits",
    step2Pills: {
      "🤝 Teamwork Actions": ["animals work together in harmony", "different skills help everyone survive", "cooperation makes the forest safer"],
      "🌲 Forest Health": ["plants and trees grow well", "animals stay healthy and fed", "water and shelter are shared"]
    },
    step3Title: "Record Ecosystem Conclusion",
    step3Pills: {
      "🏆 Key Conclusion": ["true friendship and teamwork help all creatures", "size does not matter when helping friends", "cooperation keeps nature strong"],
      "🌟 Takeaway": ["small acts of kindness make a big difference", "everyone has an important role in nature", "working together brings peace"]
    }
  }
};

export const writingHubData = writingHub;
export default writingHub;
`;
fs.writeFileSync(path.join(targetDir, 'writing_hub.js'), writingHubCode, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 5. SPEAKING_HUB.JS
// ─────────────────────────────────────────────────────────────────────────────
const speakingHubCode = `// Pure Generated Speaking Hub for Week ${weekNum}
export const speakingHub = {
  talkshow_video: {
    video_id: "forest_cooperation_w${weekNum}",
    title: "Animal Friendship & Teamwork in Nature"
  },
  info_exchange_cards: {
    candidate_card: {
      title: "The Lion's Home (Leo)",
      fields: [
        { label: "Location", value: "Green Valley Forest", known: true },
        { label: "Favorite Food", value: null, known: false },
        { label: "Resting Time", value: "Sunny Afternoons", known: true },
        { label: "Best Friend", value: null, known: false }
      ]
    },
    examiner_card: {
      title: "The Mouse's Home (Milo)",
      fields: [
        { label: "Location", value: "Under the Tall Oak Tree", known: true },
        { label: "Favorite Food", value: null, known: false },
        { label: "Special Skill", value: "Chewing Strong Ropes", known: true },
        { label: "Best Friend", value: null, known: false }
      ]
    },
    full_answers: {
      "Location": ["Green Valley Forest", "Under the Tall Oak Tree"],
      "Favorite Food": ["Fresh Wild Berries & Meat", "Small Grass Seeds"],
      "Resting Time": ["Sunny Afternoons", "Cool Evenings"],
      "Special Skill": ["Chewing Strong Ropes", "Running Fast on Grass"],
      "Best Friend": ["Mighty Forest Lion", "Gentle Forest Animals"]
    },
    prompt_questions: [
      "Where does the character live?",
      "What is the special skill?",
      "When is the resting time?"
    ],
    examiner_questions: [
      { id: "eq1", text: "Where does the mouse live?", audio_url: "/audio/week${weekNum}/exam_intro_S2.mp3" },
      { id: "eq2", text: "What is the mouse's special skill?", audio_url: "/audio/week${weekNum}/exam_intro_S3.mp3" },
      { id: "eq3", text: "What did the mouse use to rescue the lion?", audio_url: "/audio/week${weekNum}/exam_intro_S4.mp3" }
    ]
  },
  picture_story: {
    title: "The Lion and the Little Mouse",
    examiner_intro: "Look at these five pictures. They tell a story about a lion and a little mouse. First, I'll tell you about picture one. Then you tell me about pictures two, three, four, and five.",
    images: [
      { id: 1, image_url: "/images/week${weekNum}/webtoon_scene_1.png", narrator_prompt: "The lion was sleeping peacefully under a big tree in the forest." },
      { id: 2, image_url: "/images/week${weekNum}/webtoon_scene_2.png", narrator_prompt: "A tiny mouse ran across his paw and woke him up." },
      { id: 3, image_url: "/images/week${weekNum}/webtoon_scene_3.png", narrator_prompt: "The lion caught him, but let him go after the mouse promised to help." },
      { id: 4, image_url: "/images/week${weekNum}/webtoon_scene_4.png", narrator_prompt: "Later, hunters trapped the lion in a heavy rope net." },
      { id: 5, image_url: "/images/week${weekNum}/webtoon_scene_5.png", narrator_prompt: "The brave mouse chewed the ropes and freed the lion completely." }
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
      { id: "d1", name: "Mouse Tail Direction", x: 80, y: 19, prompt_en: "In Picture A, the mouse tail points up, but in Picture B, it points down." },
      { id: "d2", name: "Tree Flower Color", x: 26, y: 20, prompt_en: "In Picture A, the flower is pink, but in Picture B, it is yellow." },
      { id: "d3", name: "Butterfly on Rock", x: 56, y: 68, prompt_en: "In Picture A, there is a blue butterfly, but in Picture B, there is no butterfly." },
      { id: "d4", name: "Sun Position", x: 82, y: 73, prompt_en: "In Picture A, the sun is high, but in Picture B, it is behind a cloud." }
    ]
  }
};

export const speakingHubData = speakingHub;
export default speakingHub;
`;
fs.writeFileSync(path.join(targetDir, 'speaking_hub.js'), speakingHubCode, 'utf8');

console.log(`✅ Successfully generated pure data files for Week ${weekNum}!`);
