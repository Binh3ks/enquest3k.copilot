import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const W34_DIR = path.join(__dirname, '../src/data/weeks/week_34');
const W34_EASY_DIR = path.join(__dirname, '../src/data/weeks_easy/week_34');

if (!fs.existsSync(W34_DIR)) fs.mkdirSync(W34_DIR, { recursive: true });
if (!fs.existsSync(W34_EASY_DIR)) fs.mkdirSync(W34_EASY_DIR, { recursive: true });

console.log('🚀 Generating Week 34 Master Architecture (15 Tasks / 4 Hubs)...');

// 1. VOCAB (20 words)
const vocabCode = `// Week 34 Target Vocabulary List (20 Words)
export default [
  { 
    id: 1, 
    word: "lion", 
    definition_en: "a large wild cat with golden fur that lives in grasslands", 
    definition_vi: "con sư tử", 
    example_en: "A huge lion was sleeping peacefully under the shady tree.",
    example_vi: "Một chú sư tử to lớn đang ngủ yên bình dưới tán cây râm mát.",
    audio_word: "/audio/week34/vocab_lion.mp3", 
    image_url: "/images/week34/vocab_lion.jpg" 
  },
  { 
    id: 2, 
    word: "mouse", 
    definition_en: "a small animal with a long tail and soft grey fur", 
    definition_vi: "con chuột", 
    example_en: "A tiny mouse accidentally ran across the lion's front paw.",
    example_vi: "Một chú chuột tí hon vô tình chạy ngang qua bàn chân trước của sư tử.",
    audio_word: "/audio/week34/vocab_mouse.mp3", 
    image_url: "/images/week34/vocab_mouse.jpg" 
  },
  { 
    id: 3, 
    word: "net", 
    definition_en: "material made of strong cords tied together to catch animals", 
    definition_vi: "tấm lưới", 
    example_en: "The hunters tied a strong rope net between two trees.",
    example_vi: "Các thợ săn đã buộc một tấm lưới thừng chắc chắn giữa hai cái cây.",
    audio_word: "/audio/week34/vocab_net.mp3", 
    image_url: "/images/week34/vocab_net.jpg" 
  },
  { 
    id: 4, 
    word: "trap", 
    definition_en: "a piece of equipment used for catching wild animals", 
    definition_vi: "cái bẫy", 
    example_en: "The lion stepped into a hidden trap while walking in the forest.",
    example_vi: "Sư tử đã bước vào một cái bẫy ẩn trong khi đi dạo trong rừng.",
    audio_word: "/audio/week34/vocab_trap.mp3", 
    image_url: "/images/week34/vocab_trap.jpg" 
  },
  { 
    id: 5, 
    word: "roar", 
    definition_en: "a very loud, deep sound made by a lion or wild animal", 
    definition_vi: "tiếng gầm / gầm lớn", 
    example_en: "The lion gave a loud roar when he was trapped in the ropes.",
    example_vi: "Sư tử đã gầm lớn một tiếng khi bị mắc kẹt trong dây thừng.",
    audio_word: "/audio/week34/vocab_roar.mp3", 
    image_url: "/images/week34/vocab_roar.jpg" 
  },
  { 
    id: 6, 
    word: "caught", 
    definition_en: "held and captured something (past tense of catch)", 
    definition_vi: "đã bắt được", 
    example_en: "The lion woke up angrily and caught the little mouse.",
    example_vi: "Sư tử tức giận thức giấc và đã bắt được chú chuột nhỏ.",
    audio_word: "/audio/week34/vocab_caught.mp3", 
    image_url: "/images/week34/vocab_caught.jpg" 
  },
  { 
    id: 7, 
    word: "tiny", 
    definition_en: "extremely small in size", 
    definition_vi: "tí hon, rất nhỏ", 
    example_en: "The mouse was so tiny that he could hide inside a small leaf.",
    example_vi: "Chú chuột nhỏ đến mức có thể trốn bên trong một chiếc lá nhỏ.",
    audio_word: "/audio/week34/vocab_tiny.mp3", 
    image_url: "/images/week34/vocab_tiny.jpg" 
  },
  { 
    id: 8, 
    word: "huge", 
    definition_en: "extremely large in size or amount", 
    definition_vi: "khổng lồ, to lớn", 
    example_en: "The lion had huge paws and very strong legs.",
    example_vi: "Sư tử có những bàn chân khổng lồ và đôi chân rất khỏe.",
    audio_word: "/audio/week34/vocab_huge.mp3", 
    image_url: "/images/week34/vocab_huge.jpg" 
  },
  { 
    id: 9, 
    word: "hunter", 
    definition_en: "a person who chases and catches wild animals in the forest", 
    definition_vi: "thợ săn", 
    example_en: "Two hunters left a heavy rope net to catch the lion.",
    example_vi: "Hai người thợ săn đã để lại một tấm lưới thừng dày để bắt sư tử.",
    audio_word: "/audio/week34/vocab_hunter.mp3", 
    image_url: "/images/week34/vocab_hunter.jpg" 
  },
  { 
    id: 10, 
    word: "freed", 
    definition_en: "released from a trap or cage (past tense of free)", 
    definition_vi: "đã giải thoát", 
    example_en: "The mouse cut the ropes and freed his friend happily.",
    example_vi: "Chú chuột đã cắn đứt dây thừng và giải thoát bạn mình một cách vui vẻ.",
    audio_word: "/audio/week34/vocab_freed.mp3", 
    image_url: "/images/week34/vocab_freed.jpg" 
  },
  { 
    id: 11, 
    word: "chewed", 
    definition_en: "bit repeatedly with teeth (past tense of chew)", 
    definition_vi: "đã cắn, gặm", 
    example_en: "The mouse chewed through the thick ropes one by one.",
    example_vi: "Chú chuột đã gặm đứt từng sợi dây thừng dày một.",
    audio_word: "/audio/week34/vocab_chewed.mp3", 
    image_url: "/images/week34/vocab_chewed.jpg" 
  },
  { 
    id: 12, 
    word: "sharp", 
    definition_en: "having a thin edge that can cut easily", 
    definition_vi: "sắc nhọn", 
    example_en: "The mouse had very sharp front teeth for cutting wood and ropes.",
    example_vi: "Chú chuột có những chiếc răng cửa rất sắc nhọn để cắt gỗ và dây thừng.",
    audio_word: "/audio/week34/vocab_sharp.mp3", 
    image_url: "/images/week34/vocab_sharp.jpg" 
  },
  { 
    id: 13, 
    word: "rope", 
    definition_en: "strong, thick cord made of twisted threads", 
    definition_vi: "dây thừng", 
    example_en: "The heavy rope held the lion tightly against the tree.",
    example_vi: "Sợi dây thừng dày đã giữ chặt sư tử vào thân cây.",
    audio_word: "/audio/week34/vocab_rope.mp3", 
    image_url: "/images/week34/vocab_rope.jpg" 
  },
  { 
    id: 14, 
    word: "laugh", 
    definition_en: "to make sounds showing that you think something is funny", 
    definition_vi: "cười lớn", 
    example_en: "The lion started to laugh when the tiny mouse offered to help him.",
    example_vi: "Sư tử bắt đầu cười lớn khi chú chuột tí hon đề nghị giúp đỡ cậu ấy.",
    audio_word: "/audio/week34/vocab_laugh.mp3", 
    image_url: "/images/week34/vocab_laugh.jpg" 
  },
  { 
    id: 15, 
    word: "promise", 
    definition_en: "a statement saying that you will definitely do something", 
    definition_vi: "lời hứa / hứa", 
    example_en: "The mouse kept his promise and saved the king of the forest.",
    example_vi: "Chú chuột đã giữ đúng lời hứa và cứu chúa tể rừng xanh.",
    audio_word: "/audio/week34/vocab_promise.mp3", 
    image_url: "/images/week34/vocab_promise.jpg" 
  },
  { 
    id: 16, 
    word: "forest", 
    definition_en: "a large area of land covered with tall trees and plants", 
    definition_vi: "khu rừng", 
    example_en: "Many animals lived together peacefully in the green forest.",
    example_vi: "Nhiều loài động vật đã sống cùng nhau yên bình trong khu rừng xanh tươi.",
    audio_word: "/audio/week34/vocab_forest.mp3", 
    image_url: "/images/week34/vocab_forest.jpg" 
  },
  { 
    id: 17, 
    word: "paw", 
    definition_en: "the foot of an animal that has claws or pads", 
    definition_vi: "bàn chân động vật", 
    example_en: "The lion lifted his heavy paw to let the mouse run away.",
    example_vi: "Sư tử đã nhấc bàn chân nặng trịch của mình lên để cho chuột chạy đi.",
    audio_word: "/audio/week34/vocab_paw.mp3", 
    image_url: "/images/week34/vocab_paw.jpg" 
  },
  { 
    id: 18, 
    word: "scared", 
    definition_en: "feeling fear or worry about something bad happening", 
    definition_vi: "sợ hãi", 
    example_en: "The little mouse was scared at first, but he spoke bravely.",
    example_vi: "Chú chuột nhỏ lúc đầu rất sợ hãi, nhưng cậu ấy đã nói một cách dũng cảm.",
    audio_word: "/audio/week34/vocab_scared.mp3", 
    image_url: "/images/week34/vocab_scared.jpg" 
  },
  { 
    id: 19, 
    word: "fable", 
    definition_en: "a traditional short story that teaches a moral lesson", 
    definition_vi: "truyện ngụ ngôn", 
    example_en: "This famous fable shows that even small friends can be a great help.",
    example_vi: "Truyện ngụ ngôn nổi tiếng này chỉ ra rằng ngay cả những người bạn nhỏ bé cũng có thể giúp ích rất nhiều.",
    audio_word: "/audio/week34/vocab_fable.mp3", 
    image_url: "/images/week34/vocab_fable.jpg" 
  },
  { 
    id: 20, 
    word: "grateful", 
    definition_en: "feeling or showing thankfulness for kindness received", 
    definition_vi: "biết ơn", 
    example_en: "The lion was very grateful to the mouse for saving his life.",
    example_vi: "Sư tử đã rất biết ơn chú chuột vì đã cứu mạng cậu ấy.",
    audio_word: "/audio/week34/vocab_grateful.mp3", 
    image_url: "/images/week34/vocab_grateful.jpg" 
  }
];
`;
fs.writeFileSync(path.join(W34_DIR, 'vocab.js'), vocabCode);
fs.writeFileSync(path.join(W34_DIR, 'vocab_dictionary_master.js'), vocabCode);

// 2. READ.JS
const readCode = `// Week 34 Main Story — The Lion and the Mouse
export const readData = {
  week: 34,
  title: "The Lion and the Mouse",
  title_vi: "Sư Tử và Chuột — Truyện Ngụ Ngôn",
  text_en: "One warm afternoon, a huge lion was sleeping under a shady tree in the green forest. While he was sleeping, a tiny mouse accidentally ran across his big front paw. The lion woke up angrily and caught the little mouse with his sharp claws. 'Please do not eat me!' cried the scared mouse. 'If you let me go today, I promise I will help you one day.' The lion laughed out loud because he thought a tiny mouse could never help a mighty lion. But because he was kind, he lifted his paw and let the mouse go free. A few days later, two hunters came to the forest and placed a strong rope net between two trees. While the lion was walking down the path, he stepped into the hidden trap! The heavy net pulled tight around him. The lion roared loudly for help. The tiny mouse heard the familiar roar from far away and ran quickly to the tree. Using his sharp teeth, the mouse chewed through the thick ropes one by one until the net broke open. The lion was freed safely. He thanked the brave mouse, and from that day on, they were best friends.",
  text_vi: "Một buổi chiều ấm áp, một chú sư tử to lớn đang ngủ dưới gốc cây râm mát trong khu rừng xanh tươi. Trong khi sư tử đang ngủ, một chú chuột tí hon vô tình chạy ngang qua bàn chân trước to lớn của cậu ấy. Sư tử tức giận thức giấc và bắt lấy chú chuột nhỏ bằng những chiếc móng vuốt sắc nhọn. 'Xin đừng ăn thịt tôi!' chú chuột sợ hãi kêu lên. 'Nếu hôm nay anh thả tôi đi, tôi hứa một ngày nào đó sẽ giúp anh.' Sư tử cười lớn vì nghĩ rằng một chú chuột nhỏ bé không bao giờ có thể giúp một chú sư tử dũng mãnh. Nhưng vì có lòng tốt, sư tử đã nhấc chân lên và thả chú chuột tự do. Vài ngày sau, hai người thợ săn đến khu rừng và giăng một tấm lưới thừng chắc chắn giữa hai cái cây. Trong khi sư tử đang đi bộ xuống con đường mòn, cậu ấy đã bước vào cái bẫy ẩn! Tấm lưới dày thắt chặt quanh người cậu ấy. Sư tử gầm lớn kêu cứu. Chú chuột tí hon nghe thấy tiếng gầm quen thuộc từ đằng xa và vội vã chạy đến cái cây. Dùng những chiếc răng sắc nhọn, chú chuột đã gặm đứt từng sợi dây thừng dày cho đến khi tấm lưới rách toạc. Sư tử được giải thoát an toàn. Cậu ấy cảm ơn chú chuột dũng cảm, và từ ngày đó, họ trở thành bạn thân nhất.",
  
  story_scenes: [
    {
      id: 1,
      scene_number: 1,
      scene_id: "scene_1",
      title: "Panel 1: Sleeping Under the Tree",
      title_en: "Panel 1: Sleeping Under the Tree",
      description: "A huge lion was sleeping peacefully when a tiny mouse ran across his front paw.",
      description_en: "A huge lion was sleeping peacefully when a tiny mouse ran across his front paw.",
      image_url: "/images/week34/webtoon_scene_1.png",
      lexical_chunks: [
        { word: "was sleeping", chunk: "was sleeping peacefully", x: 45, y: 55 },
        { word: "tiny mouse", chunk: "a tiny mouse ran across his paw", x: 30, y: 70 }
      ]
    },
    {
      id: 2,
      scene_number: 2,
      scene_id: "scene_2",
      title: "Panel 2: Caught by the Big Paw",
      title_en: "Panel 2: Caught by the Big Paw",
      description: "The lion woke up angrily and caught the little mouse with his sharp claws.",
      description_en: "The lion woke up angrily and caught the little mouse with his sharp claws.",
      image_url: "/images/week34/webtoon_scene_2.png",
      lexical_chunks: [
        { word: "woke up", chunk: "woke up angrily", x: 50, y: 40 },
        { word: "caught", chunk: "caught the little mouse", x: 60, y: 65 }
      ]
    },
    {
      id: 3,
      scene_number: 3,
      scene_id: "scene_3",
      title: "Panel 3: The Promise & Kindness",
      title_en: "Panel 3: The Promise & Kindness",
      description: "The scared mouse made a promise to help, and the lion laughed and let him go.",
      description_en: "The scared mouse made a promise to help, and the lion laughed and let him go.",
      image_url: "/images/week34/webtoon_scene_3.png",
      lexical_chunks: [
        { word: "promise", chunk: "made a brave promise", x: 40, y: 60 },
        { word: "laughed", chunk: "laughed out loud", x: 65, y: 45 }
      ]
    },
    {
      id: 4,
      scene_number: 4,
      scene_id: "scene_4",
      title: "Panel 4: Trapped in the Rope Net",
      title_en: "Panel 4: Trapped in the Rope Net",
      description: "Hunters trapped the lion in a heavy rope net, and he roared loudly for help.",
      description_en: "Hunters trapped the lion in a heavy rope net, and he roared loudly for help.",
      image_url: "/images/week34/webtoon_scene_4.png",
      lexical_chunks: [
        { word: "trapped", chunk: "trapped in a heavy rope net", x: 55, y: 50 },
        { word: "roared", chunk: "roared loudly for help", x: 35, y: 40 }
      ]
    },
    {
      id: 5,
      scene_number: 5,
      scene_id: "scene_5",
      title: "Panel 5: Chewing the Ropes & Best Friends",
      title_en: "Panel 5: Chewing the Ropes & Best Friends",
      description: "The mouse chewed the ropes with sharp teeth, freeing the lion and becoming best friends.",
      description_en: "The mouse chewed the ropes with sharp teeth, freeing the lion and becoming best friends.",
      image_url: "/images/week34/webtoon_scene_5.png",
      lexical_chunks: [
        { word: "chewed", chunk: "chewed through the thick ropes", x: 45, y: 65 },
        { word: "best friends", chunk: "became best friends forever", x: 60, y: 50 }
      ]
    }
  ],

  comprehension_questions: [
    {
      id: 1,
      question_en: "What was the lion doing when the tiny mouse ran across his paw?",
      options: ["He was sleeping under a tree", "He was chasing a deer", "He was drinking water"],
      answer: "He was sleeping under a tree"
    },
    {
      id: 2,
      question_en: "Why did the lion laugh when the mouse made a promise?",
      options: ["He thought a tiny mouse could never help him", "He was happy to play a game", "The mouse told a funny joke"],
      answer: "He thought a tiny mouse could never help him"
    },
    {
      id: 3,
      question_en: "How did the hunters trap the lion in the forest?",
      options: ["They placed a strong rope net between trees", "They dug a deep hole in the ground", "They built a wooden cage"],
      answer: "They placed a strong rope net between trees"
    },
    {
      id: 4,
      question_en: "How did the mouse free the lion from the trap?",
      options: ["He chewed the thick ropes with his sharp teeth", "He pulled the ropes with a stick", "He called the hunters"],
      answer: "He chewed the thick ropes with his sharp teeth"
    }
  ]
};

export default readData;
`;
fs.writeFileSync(path.join(W34_DIR, 'read.js'), readCode);

// 3. EXPLORE.JS (CLIL Science & Animal Helpers)
const exploreCode = `// Week 34 Explore / CLIL — Animal Helpers in Nature
export const exploreData = {
  theme: "Animal Helpers in Nature",
  title_en: "Animal Helpers in Nature",
  title_vi: "Những Người Bạn Giúp Đỡ Lẫn Nhau Trong Tự Nhiên",
  content_en: "In nature, many animals work together to survive and stay healthy. Just like the tiny mouse helped the huge lion in the famous fable, real animals in the wild also help each other every day! For example, a small bird called the oxpecker sits on the back of a huge zebra. While the zebra is grazing in the grassland, the bird eats small bugs off the zebra's skin. This gives the bird delicious food and keeps the zebra clean and comfortable. In the ocean, small cleaner fish swim inside the mouths of large sharks. The big sharks never bite them because the little fish clean their sharp teeth! When animals cooperate and help each other, everyone stays safe and happy in nature.",
  content_vi: "Trong tự nhiên, nhiều loài động vật làm việc cùng nhau để sinh tồn và khỏe mạnh. Giống như chú chuột nhỏ giúp sư tử to lớn trong truyện ngụ ngôn nổi tiếng, các loài động vật thực tế trong tự nhiên cũng giúp đỡ lẫn nhau mỗi ngày! Ví dụ, một loài chim nhỏ tên là chim bắt ve thường đậu trên lưng chú ngựa vằn to lớn. Trong khi ngựa vằn đang gặm cỏ trên đồng cỏ, chú chim ăn những con bọ nhỏ trên da ngựa vằn. Điều này mang lại cho chú chim thức ăn ngon và giúp ngựa vằn sạch sẽ, thoải mái. Dưới đại dương, những chú cá dọn vệ sinh nhỏ bơi vào trong miệng của những chú cá mập lớn. Cá mập lớn không bao giờ cắn chúng vì các chú cá nhỏ đang làm sạch những chiếc răng sắc nhọn! Khi các loài động vật hợp tác và giúp đỡ lẫn nhau, mọi loài đều an toàn và hạnh phúc.",
  audio_url: "/audio/week34/explore.mp3",
  check_questions: [
    {
      id: 1,
      question_en: "What does the oxpecker bird do while sitting on the zebra's back?",
      options: ["It eats small bugs off the zebra's skin", "It sings songs to wake the zebra", "It builds a nest with zebra hair"],
      answer: "It eats small bugs off the zebra's skin"
    },
    {
      id: 2,
      question_en: "Why do large sharks never bite small cleaner fish?",
      options: ["Because the small fish clean their sharp teeth", "Because the fish are too fast", "Because sharks are always sleeping"],
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
    question_en: "Why is cooperation between different animals important in the ecosystem?",
    hint_en: "Think about how each animal gives something helpful: one gets food and the other stays clean and healthy."
  }
};

export default exploreData;
`;
fs.writeFileSync(path.join(W34_DIR, 'explore.js'), exploreCode);

// 4. GRAMMAR.JS
const grammarCode = `// Week 34 Grammar Focus: Past Continuous with WHILE / WHEN & Irregular Verbs
export default {
  title: "Past Continuous with WHILE / WHEN & Irregular Verbs",
  focus: "While + Past Continuous (was/were + V-ing), Past Simple occurred.",
  rule_en: "Use 'While' with Past Continuous for an ongoing background action, interrupted by Past Simple.",
  rule_vi: "Dùng 'While' với Quá khứ Tiếp diễn cho một hành động đang diễn ra, bị ngắt lời bởi Quá khứ Đơn.",
  examples: [
    "While the lion was sleeping, a tiny mouse ran across his paw.",
    "While the hunters were setting the trap, the birds flew away.",
    "The mouse heard a loud roar while he was looking for food."
  ],
  exercises: [
    { id: 1, prompt: "While the lion ___ under the tree, a mouse ran across his paw.", options: ["was sleeping", "slept", "is sleeping"], answer: "was sleeping", type: "mc" },
    { id: 2, prompt: "The lion woke up angrily and ___ the little mouse.", options: ["caught", "was catching", "catches"], answer: "caught", type: "mc" },
    { id: 3, prompt: "While the mouse ___ through the ropes, the lion waited patiently.", options: ["was chewing", "chewed", "chews"], answer: "was chewing", type: "mc" },
    { id: 4, prompt: "The hunters ___ a heavy rope net between two trees yesterday.", options: ["placed", "were placing", "place"], answer: "placed", type: "mc" },
    { id: 5, prompt: "While the zebra was grazing, the small bird ___ bugs off its back.", options: ["ate", "was eating", "eats"], answer: "ate", type: "mc" },
    { id: 6, prompt: "The lion ___ loudly when he felt the rope net pull tight.", options: ["roared", "was roaring", "roars"], answer: "roared", type: "mc" },
    { id: 7, prompt: "While I ___ in the garden, I found a little mouse.", options: ["was walking", "walked", "walk"], answer: "was walking", type: "mc" },
    { id: 8, prompt: "The kind mouse ___ his promise and freed the king of the forest.", options: ["kept", "was keeping", "keeps"], answer: "kept", type: "mc" },
    { id: 9, prompt: "While the birds ___ in the sky, they saw the hunters arrive.", options: ["were flying", "flew", "fly"], answer: "were flying", type: "mc" },
    { id: 10, prompt: "The lion ___ the brave mouse for saving his life.", options: ["thanked", "was thanking", "thanks"], answer: "thanked", type: "mc" }
  ]
};
`;
fs.writeFileSync(path.join(W34_DIR, 'grammar.js'), grammarCode);

// 5. SINGAPORE_MATH.JS
const mathCode = `// Week 34 Singapore Math Problems (5 Problems with dynamic BarModelSVG modelData)
export default {
  title: "Forest Journey & Animal Math Problems",
  problems: [
    {
      id: 1,
      title: "Problem 1: Rope Length for the Trap (Part-Whole)",
      problemText: "The hunters had 60 meters of strong rope. They used 25 meters to make the net. How many meters of rope were left?",
      correctAnswer: 35,
      answer: "35 meters",
      hintText: "Total rope (60m) - Used rope (25m) = 35 meters remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 25, label: "25m used", color: "#ef4444" },
          { value: 35, label: "35m left", color: "#22c55e" }
        ],
        totalLabel: "60m rope total"
      }
    },
    {
      id: 2,
      title: "Problem 2: Daily Sleep Time (Part-Whole)",
      problemText: "The lion slept for 14 hours during the day and rested for 4 hours at night. How many hours did he rest in total?",
      correctAnswer: 18,
      answer: "18 hours",
      hintText: "Day sleep (14h) + Night rest (4h) = 18 hours in total.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 14, label: "14h day", color: "#4f46e5" },
          { value: 4, label: "4h night", color: "#06b6d4" }
        ],
        totalLabel: "18h total"
      }
    },
    {
      id: 3,
      title: "Problem 3: Mouse Running Distance (Comparison)",
      problemText: "The mouse ran 80 meters to reach the trapped lion. A rabbit ran 45 meters. How many more meters did the mouse run?",
      correctAnswer: 35,
      answer: "35 meters",
      hintText: "Mouse distance (80m) - Rabbit distance (45m) = 35 meters difference.",
      modelData: {
        type: "comparison",
        bars: [
          { value: 80, label: "Mouse (80m)", color: "#8b5cf6" },
          { value: 45, label: "Rabbit (45m)", color: "#f59e0b" }
        ],
        diffLabel: "35m more"
      }
    },
    {
      id: 4,
      title: "Problem 4: Chewing the Ropes (Part-Whole)",
      problemText: "The net had 30 thick ropes. The mouse chewed 18 ropes in the morning. How many ropes were left to chew?",
      correctAnswer: 12,
      answer: "12 ropes",
      hintText: "Total ropes (30) - Chewed ropes (18) = 12 ropes remaining.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 18, label: "18 chewed", color: "#10b981" },
          { value: 12, label: "12 left", color: "#6366f1" }
        ],
        totalLabel: "30 ropes"
      }
    },
    {
      id: 5,
      title: "Problem 5: Animals in the Clearing (Part-Whole)",
      problemText: "There were 50 animals in the forest clearing. 32 were birds and the rest were small mammals. How many small mammals were there?",
      correctAnswer: 18,
      answer: "18 small mammals",
      hintText: "Total animals (50) - Birds (32) = 18 small mammals.",
      modelData: {
        type: "part_whole",
        bars: [
          { value: 32, label: "32 birds", color: "#0ea5e9" },
          { value: 18, label: "18 mammals", color: "#ec4899" }
        ],
        totalLabel: "50 animals"
      }
    }
  ]
};
`;
fs.writeFileSync(path.join(W34_DIR, 'singapore_math.js'), mathCode);
fs.writeFileSync(path.join(W34_DIR, 'logic_lab.js'), mathCode);

// 6. WRITING.JS
const writingCode = `// Week 34 Writing Studio Data
export default {
  title: "The Lion and the Mouse — Picture Story",
  prompt_en: "Look at the three pictures. Write the story. Write 20 or more words.",
  prompt_vi: "Nhìn vào 3 bức tranh. Viết câu chuyện ngụ ngôn (20 từ trở lên).",
  min_sentences: 3,
  min_words: 20,
  max_words: 60,
  model_sentence: "While a huge lion was sleeping under a tree, a tiny mouse ran across his paw. The lion caught the mouse but let him go free. Later, hunters trapped the lion in a heavy rope net. The brave mouse chewed the ropes with his sharp teeth and freed his friend.",
  picture_story: [
    {
      panel_id: 'panel_1',
      title_en: 'Panel 1: Mouse on Sleeping Lion',
      title_vi: 'Cảnh 1: Chuột Nhỏ Trên Chân Sư Tử',
      image_url: '/images/week34/writing_panel_1.png'
    },
    {
      panel_id: 'panel_2',
      title_en: 'Panel 2: Lion Trapped in Net',
      title_vi: 'Cảnh 2: Sư Tử Bị Mắc Bẫy Lưới',
      image_url: '/images/week34/writing_panel_2.png'
    },
    {
      panel_id: 'panel_3',
      title_en: 'Panel 3: Mouse Chewing Ropes',
      title_vi: 'Cảnh 3: Chuột Cắn Dây Cứu Sư Tử',
      image_url: '/images/week34/writing_panel_3.png'
    }
  ],
  word_bank_pills: {
    action_verbs: ['was sleeping', 'ran across', 'caught mouse', 'let him go', 'trapped in net', 'chewed ropes', 'freed the lion'],
    connectors: ['one afternoon', 'suddenly', 'then', 'while', 'because', 'later', 'finally'],
    cumulative_chunks: ['sleeping under a tree', 'ran across his paw', 'caught the tiny mouse', 'trapped in a heavy net', 'chewed through the ropes'],
    grammar_boosters: ['was sleeping', 'was walking', 'were setting a trap', 'had promised']
  },
  sentence_frames: [
    { template: "While the lion was sleeping, a tiny ___ ran across his paw.", answers: ["mouse"] },
    { template: "The lion woke up and caught the mouse with his big ___.", answers: ["paw"] },
    { template: "Hunters trapped the lion in a strong rope ___.", answers: ["net"] },
    { template: "The mouse chewed the ropes with his sharp ___.", answers: ["teeth"] },
    { template: "The lion was freed and they became best ___.", answers: ["friends"] }
  ],
  picture_mode: {
    type: "picture",
    image_url: "/images/week34/writing_panel_1.png",
    panels: [
      {
        id: 1,
        image_url: "/images/week34/writing_panel_1.png",
        caption: "Panel 1: The tiny mouse runs across the sleeping lion's paw",
        character_guide: "Lion (sleeping under tree) vs. Mouse (tiny and fast)",
        action_tags: ["sleeping", "running", "forest", "tree"],
        nova_question_en: "Look at Panel 1: What was the huge lion doing when the tiny mouse ran across his paw?",
        pills: ["was sleeping under a tree,", "a tiny mouse ran across,", "on a warm afternoon,", "in the green forest,"],
        grammar_hint: "Past Continuous: was/were + V-ing (was sleeping)",
        sentence_frame: "One warm afternoon, a huge lion was sleeping under a tree when a tiny mouse ran across his paw.",
        pill_color: "blue"
      },
      {
        id: 2,
        image_url: "/images/week34/writing_panel_2.png",
        caption: "Panel 2: The lion is caught in the hunters' rope net",
        character_guide: "Lion (trapped and roaring) vs. Hunters (placed the trap)",
        action_tags: ["trapped", "net", "roaring", "ropes"],
        nova_question_en: "What happened to the lion in Panel 2 while he was walking in the forest?",
        pills: ["was walking down the path,", "stepped into a hidden trap,", "a heavy rope net,", "roared loudly for help,"],
        grammar_hint: "Past Simple: stepped, roared, trapped",
        sentence_frame: "A few days later, the lion stepped into a hidden rope net and roared loudly for help.",
        pill_color: "amber"
      },
      {
        id: 3,
        image_url: "/images/week34/writing_panel_3.png",
        caption: "Panel 3: The brave mouse chews the thick ropes to free the lion",
        character_guide: "Mouse (chewing ropes with sharp teeth) & Lion (relieved and free)",
        action_tags: ["chewing", "sharp teeth", "freed", "best friends"],
        nova_question_en: "How did the little mouse help the mighty lion in Panel 3?",
        pills: ["chewed through the thick ropes,", "with his sharp teeth,", "the lion was freed safely,", "became best friends forever,"],
        grammar_hint: "Past Simple: chewed, freed, thanked",
        sentence_frame: "The mouse chewed the ropes with his sharp teeth, freed the lion, and they became best friends.",
        pill_color: "emerald"
      }
    ]
  }
};
`;
fs.writeFileSync(path.join(W34_DIR, 'writing.js'), writingCode);

// 7. DICTATION.JS & SHADOWING.JS
const dictationCode = `// Week 34 Dictation Sentences
export default [
  { id: 1, text: "A huge lion was sleeping under a tree in the forest.", audio_url: "/audio/week34/dictation_1.mp3" },
  { id: 2, text: "A tiny mouse accidentally ran across his front paw.", audio_url: "/audio/week34/dictation_2.mp3" },
  { id: 3, text: "The lion caught the mouse but let him go free.", audio_url: "/audio/week34/dictation_3.mp3" },
  { id: 4, text: "Hunters trapped the mighty lion in a heavy rope net.", audio_url: "/audio/week34/dictation_4.mp3" },
  { id: 5, text: "The brave mouse chewed the thick ropes to save his friend.", audio_url: "/audio/week34/dictation_5.mp3" }
];
`;
fs.writeFileSync(path.join(W34_DIR, 'dictation.js'), dictationCode);

const shadowingCode = `// Week 34 Voice Shadowing Data
export const shadowingData = {
  sentences: [
    "One warm afternoon, a huge lion was sleeping under a shady tree.",
    "A tiny mouse ran across his big front paw by accident.",
    "The lion woke up angrily and caught the little mouse.",
    "The scared mouse promised to help the lion one day.",
    "The lion laughed out loud and let the mouse go free.",
    "A few days later, hunters trapped the lion in a heavy net.",
    "The lion roared loudly because he could not escape.",
    "The tiny mouse heard the roar and ran quickly to the tree.",
    "Using his sharp teeth, the mouse chewed through the thick ropes.",
    "The lion was freed safely and thanked his brave little friend."
  ]
};
export default shadowingData;
`;
fs.writeFileSync(path.join(W34_DIR, 'shadowing.js'), shadowingCode);

const shadowingIpaCode = `// Week 34 Shadowing IPA Transcriptions
export default [
  { id: 1, text: "One warm afternoon, a huge lion was sleeping under a shady tree.", ipa: "/wʌn wɔːm ˌɑːftəˈnuːn ə hjuːdʒ ˈlaɪən wəz ˈsliːpɪŋ ˈʌndər ə ˈʃeɪdi triː/" },
  { id: 2, text: "A tiny mouse ran across his big front paw by accident.", ipa: "/ə ˈtaɪni maʊs ræn əˈkrɒs hɪz bɪɡ frʌnt pɔː baɪ ˈæksɪdənt/" },
  { id: 3, text: "The lion woke up angrily and caught the little mouse.", ipa: "/ðə ˈlaɪən wəʊk ʌp ˈæŋɡrəli ənd kɔːt ðə ˈlɪtl maʊs/" },
  { id: 4, text: "The scared mouse promised to help the lion one day.", ipa: "/ðə skeəd maʊs ˈprɒmɪst tə help ðə ˈlaɪən wʌn deɪ/" },
  { id: 5, text: "The lion laughed out loud and let the mouse go free.", ipa: "/ðə ˈlaɪən lɑːft aʊt laʊd ənd let ðə maʊs ɡəʊ friː/" }
];
`;
fs.writeFileSync(path.join(W34_DIR, 'shadowing_ipa.js'), shadowingIpaCode);

// 8. ASK_AI.JS (Mascot Nova Dialogue & Cambridge P2 Cue Card)
const askAiCode = `// Week 34 Mascot Nova AI Voice Dialogue Cards & Cambridge P2 Info Exchange
export default [
  {
    id: 1,
    title_en: "Turn 1: What was the lion doing under the tree?",
    sample_question_en: "The huge lion was sleeping under the shady tree.",
    sample_question_vi: "Chú sư tử to lớn đang ngủ dưới gốc cây râm mát.",
    answer: "Good! What happened while he was sleeping?",
    word_bank: ["lion", "was", "sleeping", "under", "tree"]
  },
  {
    id: 2,
    title_en: "Turn 2: What did the mouse accidentally do?",
    sample_question_en: "A tiny mouse ran across the lion's front paw.",
    sample_question_vi: "Một chú chuột nhỏ chạy ngang qua bàn chân trước của sư tử.",
    answer: "Oh my! Did the lion catch the little mouse?",
    word_bank: ["mouse", "ran", "across", "front", "paw"]
  },
  {
    id: 3,
    title_en: "Turn 3: What promise did the mouse make?",
    sample_question_en: "The mouse promised to help the lion one day.",
    sample_question_vi: "Chú chuột đã hứa sẽ giúp đỡ sư tử vào một ngày nào đó.",
    answer: "How brave! What happened to the lion later in the forest?",
    word_bank: ["mouse", "promised", "help", "lion", "one", "day"]
  },
  {
    id: 4,
    title_en: "Turn 4: How did the hunters trap the lion?",
    sample_question_en: "Hunters trapped the lion in a heavy rope net.",
    sample_question_vi: "Các thợ săn đã bẫy sư tử trong một tấm lưới thừng dày.",
    answer: "Oh no! How did the little mouse save the mighty lion?",
    word_bank: ["hunters", "trapped", "lion", "heavy", "rope", "net"]
  },
  {
    id: 5,
    title_en: "Turn 5: How did the mouse cut the thick ropes?",
    sample_question_en: "He chewed the ropes with his sharp teeth and freed him.",
    sample_question_vi: "Cậu ấy đã gặm dây thừng bằng hàm răng sắc nhọn và giải cứu sư tử.",
    answer: "Wonderful! Even small friends can be a great help.",
    word_bank: ["chewed", "ropes", "sharp", "teeth", "freed", "lion"]
  }
];

export const CUE_CARD_PROMPTS = [
  {
    cue_id: "cue_1",
    target_prompt_en: "Where / the lion / sleep in the afternoon?",
    target_prompt_vi: "Hỏi Nova: Sư tử ngủ ở đâu vào buổi chiều?",
    question_word: "Where",
    word_bank: ["Where", "was", "the", "lion", "sleeping", "in", "the", "afternoon", "?"],
    scrambled_words: ["afternoon", "sleeping", "Where", "lion", "the", "in", "was", "?"],
    acceptable_questions: [
      "Where was the lion sleeping in the afternoon?",
      "Where was the lion sleeping?",
      "Where was he sleeping?"
    ],
    nova_answer_audio_text: "The huge lion was sleeping peacefully under a shady tree in the forest."
  },
  {
    cue_id: "cue_2",
    target_prompt_en: "What / the mouse / do when the lion caught him?",
    target_prompt_vi: "Hỏi Nova: Chuột đã làm gì khi sư tử bắt được cậu ấy?",
    question_word: "What",
    word_bank: ["What", "did", "the", "mouse", "do", "when", "caught", "?"],
    scrambled_words: ["caught", "What", "mouse", "do", "did", "the", "when", "?"],
    acceptable_questions: [
      "What did the mouse do when the lion caught him?",
      "What did the mouse promise?",
      "What did he say to the lion?"
    ],
    nova_answer_audio_text: "The scared mouse cried and promised that he would help the lion one day."
  },
  {
    cue_id: "cue_3",
    target_prompt_en: "How / the hunters / trap the lion in the forest?",
    target_prompt_vi: "Hỏi Nova: Các thợ săn đã bẫy sư tử như thế nào?",
    question_word: "How",
    word_bank: ["How", "did", "the", "hunters", "trap", "the", "lion", "?"],
    scrambled_words: ["trap", "How", "hunters", "lion", "the", "did", "?"],
    acceptable_questions: [
      "How did the hunters trap the lion?",
      "How did hunters catch the lion?",
      "How was the lion trapped?"
    ],
    nova_answer_audio_text: "The hunters placed a strong rope net between two trees to trap the lion."
  },
  {
    cue_id: "cue_4",
    target_prompt_en: "How / the mouse / free the trapped lion?",
    target_prompt_vi: "Hỏi Nova: Chuột đã giải thoát sư tử như thế nào?",
    question_word: "How",
    word_bank: ["How", "did", "the", "mouse", "free", "the", "lion", "?"],
    scrambled_words: ["free", "How", "mouse", "lion", "did", "the", "?"],
    acceptable_questions: [
      "How did the mouse free the lion?",
      "How did he chew the ropes?",
      "How was the lion freed?"
    ],
    nova_answer_audio_text: "The mouse chewed through the thick ropes with his sharp teeth until the net broke."
  },
  {
    cue_id: "cue_5",
    target_prompt_en: "What / the moral lesson / of this fable?",
    target_prompt_vi: "Hỏi Nova: Bài học đạo đức của câu chuyện ngụ ngôn này là gì?",
    question_word: "What",
    word_bank: ["What", "is", "the", "moral", "lesson", "of", "the", "fable", "?"],
    scrambled_words: ["lesson", "What", "fable", "moral", "is", "the", "of", "?"],
    acceptable_questions: [
      "What is the moral lesson of the fable?",
      "What is the lesson of this story?",
      "What did we learn from the fable?"
    ],
    nova_answer_audio_text: "Even the smallest friend can be a great help in times of trouble."
  }
];

export const INFORMATION_EXCHANGE_P2 = {
  theme: "The Lion and the Mouse Fable Information Exchange",
  candidateA: {
    cardTitle: "Candidate A: The Mighty Lion's Day",
    fields: [
      { label: "Resting Location", value: "Under the shady tree in the green forest" },
      { label: "Time of Sleep", value: "Warm Monday afternoon" },
      { label: "Trap Equipment", value: "Heavy rope net placed by two hunters" },
      { label: "Roar Sound", value: "Loud roar heard from far across the forest" },
      { label: "New Best Friend", value: "The tiny brave mouse with sharp teeth" }
    ]
  },
  candidateB: {
    cardTitle: "Candidate B: The Brave Little Mouse",
    prompts: CUE_CARD_PROMPTS
  }
};
`;
fs.writeFileSync(path.join(W34_DIR, 'ask_ai.js'), askAiCode);

// 9. DAILY_WATCH.JS & MINDMAP.JS & LOGIC_SCIENCE.JS & WORD_MATCH/POWER.JS
const dailyWatchCode = `// Week 34 Educational Videos (5 curated videos)
export default [
  { id: 1, title: "The Lion and the Mouse - Aesop's Fable", videoId: "GxcGVCEEdcU", channel: "Oxbridge Baby", duration: "3:45" },
  { id: 2, title: "Animals Helping Animals in Nature", videoId: "Qp0_9sB4u_k", channel: "SciShow Kids", duration: "4:12" },
  { id: 3, title: "How Big Cats Hunt and Sleep", videoId: "hGLpB_3aAao", channel: "National Geographic Kids", duration: "3:30" },
  { id: 4, title: "Past Continuous with While and When", videoId: "7U_b5Y1vL6w", channel: "Grammar Songs", duration: "3:15" },
  { id: 5, title: "Animal Teeth: Sharp vs Flat Teeth", videoId: "dKz3K_qE4yM", channel: "BBC Earth Kids", duration: "4:05" }
];
`;
fs.writeFileSync(path.join(W34_DIR, 'daily_watch.js'), dailyWatchCode);

const mindmapCode = `// Week 34 Mindmap Speaking Data (6 stems x 6 branches = 36 branches)
export default {
  centerStems: [
    { id: 'stem_1', title: 'The Lion', branches: ['Sleeping under tree', 'Huge front paws', 'Loud angry roar', 'Caught tiny mouse', 'Laughed out loud', 'Grateful for help'] },
    { id: 'stem_2', title: 'The Mouse', branches: ['Tiny soft body', 'Ran across paw', 'Made brave promise', 'Sharp front teeth', 'Chewed thick ropes', 'Best loyal friend'] },
    { id: 'stem_3', title: 'The Forest Trap', branches: ['Two clever hunters', 'Strong rope net', 'Hidden in bushes', 'Tied to two trees', 'Pulled very tight', 'Broken by teeth'] },
    { id: 'stem_4', title: 'Animal Helpers', branches: ['Oxpecker on zebra', 'Cleaner fish in mouth', 'Eating small bugs', 'Cleaning sharp teeth', 'Working together', 'Living in harmony'] },
    { id: 'stem_5', title: 'Action Verbs', branches: ['Was sleeping', 'Ran across', 'Caught with claws', 'Laughed happily', 'Chewed ropes', 'Freed safely'] },
    { id: 'stem_6', title: 'Moral Lessons', branches: ['Small friends help', 'Always keep promises', 'Show great kindness', 'Do not laugh at others', 'True loyal friends', 'Cooperate to survive'] }
  ]
};
`;
fs.writeFileSync(path.join(W34_DIR, 'mindmap.js'), mindmapCode);

const logicScienceCode = `// Week 34 Action Lab / Physics Lab: Knot Untying & Friction
export default {
  title: "Action Lab: The Science of Ropes, Knots & Friction",
  steps: [
    {
      id: 1,
      title: "Step 1: Test the Rope Material",
      instruction: "Select the strong braided rope used by the forest hunters.",
      options: ["Braided Hemp Rope", "Thin Paper String", "Wet Grass Blade"],
      answer: "Braided Hemp Rope",
      explanation: "Braided rope has high tensile strength and high friction between twisted threads."
    },
    {
      id: 2,
      title: "Step 2: Apply the Cutting Force",
      instruction: "How does the mouse cut through high-friction ropes?",
      options: ["Using sharp enamel teeth to cut individual fibers", "Pulling with two paws", "Pouring water"],
      answer: "Using sharp enamel teeth to cut individual fibers",
      explanation: "Sharp teeth apply concentrated pressure on small areas, breaking fibers one by one."
    },
    {
      id: 3,
      title: "Step 3: Release the Net Tension",
      instruction: "What happens when 5 key knot fibers are chewed open?",
      options: ["The net loses tension and the lion escapes safely", "The net gets tighter", "The tree falls"],
      answer: "The net loses tension and the lion escapes safely",
      explanation: "Cutting load-bearing knots removes mechanical tension across the entire net."
    }
  ]
};
`;
fs.writeFileSync(path.join(W34_DIR, 'logic_science.js'), logicScienceCode);

const wordMatchCode = `// Week 34 Word Match Pairs (10 Pairs)
export default [
  { id: 1, word: "lion", match: "a large wild cat with golden fur", vi: "con sư tử" },
  { id: 2, word: "mouse", match: "a tiny animal with a long tail", vi: "con chuột" },
  { id: 3, word: "net", match: "strong cords tied to catch animals", vi: "tấm lưới" },
  { id: 4, word: "trap", match: "equipment used to catch animals", vi: "cái bẫy" },
  { id: 5, word: "roar", match: "a very loud deep sound", vi: "tiếng gầm" },
  { id: 6, word: "hunter", match: "a person who catches wild animals", vi: "thợ săn" },
  { id: 7, word: "tiny", match: "extremely small in size", vi: "tí hon" },
  { id: 8, word: "huge", match: "extremely large in size", vi: "khổng lồ" },
  { id: 9, word: "sharp", match: "having a thin edge that cuts easily", vi: "sắc nhọn" },
  { id: 10, word: "fable", match: "a short story with a moral lesson", vi: "truyện ngụ ngôn" }
];
`;
fs.writeFileSync(path.join(W34_DIR, 'word_match.js'), wordMatchCode);

const wordPowerCode = `// Week 34 Word Power Synonyms & Collocations
export default [
  { id: 1, base: "tiny", synonym: "very small", collocation: "tiny mouse", vi: "chú chuột tí hon" },
  { id: 2, base: "huge", synonym: "enormous", collocation: "huge lion", vi: "sư tử khổng lồ" },
  { id: 3, base: "sharp", synonym: "pointed", collocation: "sharp teeth", vi: "hàm răng sắc nhọn" },
  { id: 4, base: "strong", synonym: "tough", collocation: "strong rope net", vi: "lưới thừng chắc chắn" },
  { id: 5, base: "brave", synonym: "courageous", collocation: "brave little friend", vi: "người bạn nhỏ dũng cảm" }
];
`;
fs.writeFileSync(path.join(W34_DIR, 'word_power.js'), wordPowerCode);

console.log('✅ All station supporting files written.');
