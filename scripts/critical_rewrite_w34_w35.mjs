// Script to execute critical rewrite for Week 34 & Week 35 across Read & Explore and Write & Speak
import fs from 'fs';
import path from 'path';

// --- WEEK 34 DATA ---
const w34ReadStory = `On a **bright sunny summer day**, the **hardworking ant** was **gathering grains of wheat**. **Meanwhile**, the **lazy grasshopper** was **singing cheerfully** under a **green tree**.

When the **cold winter arrived**, **snow covered the ground everywhere**. The grasshopper **had no food** and was **shivering in the cold**.

He **slowly walked** to the ant's **warm wooden house** and **knocked on the door**. The **kind ant** opened the door and **invited him inside** for **warm soup**.

The grasshopper **felt deeply grateful** and **learned a valuable lesson**. **From that day on**, he **promised to work hard** every summer.`;

const w34ReadStoryVi = `Vào một **ngày hè nắng đẹp rực rỡ**, chú **kiến chăm chỉ** đang **nhặt những hạt lúa mì**. **Trong khi đó**, chú **châu chấu lười biếng** đang **hát ca vui vẻ** dưới bóng cây xanh.

Khi **mùa đông lạnh giá đến**, **tuyết phủ kín mặt đất khắp nơi**. Châu chấu **không có thức ăn** và đang **run rẩy trong giá lạnh**.

Chú **chậm rãi bước đến** ngôi **nhà gỗ ấm áp** của kiến và **gõ cửa**. Chú **kiến tốt bụng** mở cửa và **mời chú vào trong** dùng **súp nóng**.

Châu chấu **cảm thấy cực kỳ biết ơn** và **học được một bài học quý giá**. **Từ ngày đó trở đi**, chú **hứa sẽ làm việc chăm chỉ** mỗi mùa hè.`;

const w34DictMap = {
  "bright sunny summer day": "ngày hè nắng đẹp rực rỡ",
  "hardworking ant": "chú kiến chăm chỉ",
  "kiến chăm chỉ": "hardworking ant",
  "gathering grains of wheat": "nhặt những hạt lúa mì",
  "Meanwhile": "Trong khi đó",
  "lazy grasshopper": "chú châu chấu lười biếng",
  "châu chấu lười biếng": "lazy grasshopper",
  "singing cheerfully": "hát ca vui vẻ",
  "green tree": "cây xanh",
  "cold winter arrived": "mùa đông lạnh giá đến",
  "snow covered the ground everywhere": "tuyết phủ kín mặt đất khắp nơi",
  "had no food": "không có thức ăn",
  "shivering in the cold": "run rẩy trong giá lạnh",
  "slowly walked": "chậm rãi bước đến",
  "warm wooden house": "nhà gỗ ấm áp",
  "knocked on the door": "gõ cửa",
  "kind ant": "kiến tốt bụng",
  "invited him inside": "mời chú vào trong",
  "warm soup": "súp nóng",
  "felt deeply grateful": "cảm thấy cực kỳ biết ơn",
  "learned a valuable lesson": "học được một bài học quý giá",
  "From that day on": "Từ ngày đó trở đi",
  "promised to work hard": "hứa sẽ làm việc chăm chỉ"
};

const w34WritingData = {
  "title": "The Ant and the Grasshopper — Fable & Work Ethic",
  "min_sentences": 10,
  "theme": "fable_and_moral",
  "min_words": 65,
  "model_sentence": "On a bright sunny summer day, the hardworking ant was gathering grains of wheat. Meanwhile, the lazy grasshopper was singing cheerfully under a green tree. When the cold winter arrived, snow covered the ground everywhere. The grasshopper had no food and was shivering in the cold. He slowly walked to the ant's warm wooden house and knocked on the door. The kind ant opened the door and invited him inside for warm soup. The grasshopper felt deeply grateful and learned a valuable lesson. From that day on, he promised to work hard every summer.",
  "topic_talk_prompt": "Tell me about a time when you worked hard with your friends to finish a project!",
  "sentence_frames": [
    {
      "template": "On a _____ summer day, the ant was gathering grains of wheat.",
      "answers": ["bright sunny"]
    },
    {
      "template": "_____, the lazy grasshopper was singing cheerfully under a tree.",
      "answers": ["Meanwhile"]
    },
    {
      "template": "When the cold winter arrived, _____ covered the ground everywhere.",
      "answers": ["snow"]
    },
    {
      "template": "The grasshopper had no food and was _____ in the cold.",
      "answers": ["shivering"]
    },
    {
      "template": "He slowly walked to the ant's warm _____ house.",
      "answers": ["wooden"]
    },
    {
      "template": "He _____ on the door and asked for help.",
      "answers": ["knocked"]
    },
    {
      "template": "The kind ant opened the door and invited him inside for _____ soup.",
      "answers": ["warm"]
    },
    {
      "template": "The grasshopper felt _____ grateful for the food.",
      "answers": ["deeply"]
    },
    {
      "template": "He learned a _____ lesson about working hard.",
      "answers": ["valuable"]
    },
    {
      "template": "From that day on, he _____ to prepare for winter.",
      "answers": ["promised"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "bright sunny", "vi": "nắng đẹp rực rỡ", "distractor": false },
        { "word": "Meanwhile", "vi": "Trong khi đó", "distractor": false },
        { "word": "snow", "vi": "tuyết", "distractor": false },
        { "word": "shivering", "vi": "run rẩy", "distractor": false },
        { "word": "wooden", "vi": "bằng gỗ", "distractor": false },
        { "word": "knocked", "vi": "gõ cửa", "distractor": false },
        { "word": "warm", "vi": "nóng ấm", "distractor": false },
        { "word": "deeply", "vi": "sâu sắc", "distractor": false },
        { "word": "valuable", "vi": "quý giá", "distractor": false },
        { "word": "promised", "vi": "đã hứa", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": true },
        { "word": "delicious", "vi": "ngon miệng", "distractor": true }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week34/story_writing_pic.jpg",
      "image_prompt": "In our fun English storytelling class today, my group presented the fable of the Ant and the Grasshopper. The ant gathered grains of wheat during bright sunny summer while the grasshopper sang cheerfully. When winter came, the grasshopper knocked on the wooden house. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "gathering grains",
          "shivering in cold",
          "wooden house",
          "warm soup"
        ],
        "cumulative_chunks": [
          "bright sunny summer",
          "felt deeply grateful",
          "learned a valuable lesson"
        ],
        "connectors": [
          "Meanwhile",
          "When winter arrived",
          "From that day on"
        ],
        "grammar_boosters": [
          "while the ant was working",
          "promised to work hard"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how the ant gathered grains during summer while the grasshopper sang cheerfully, and what happened when winter arrived.",
        "vi": "Nhìn bức tranh. Mô tả cách chú kiến nhặt lúa mì trong mùa hè trong khi chú châu chấu ca hát, và chuyện gì xảy ra khi mùa đông đến."
      },
      "rubric_tier": 2
    }
  }
};

// --- WEEK 35 DATA ---
const w35ReadStory = `On a **warm Saturday morning**, Maya and Tom **visited their favorite city park**. They were sad to see **plastic bottles and rubbish** **scattered on the green grass**.

**Without hesitation**, they **decided to clean up** the **entire park together**. **First**, they **put on gloves** and **collected all the plastic waste** into **recycling bins**.

**Next**, they **planted colorful flowers** and **young green trees** near the pond. **Thanks to their hard work**, the park became **clean and beautiful again**.

All the visitors **smiled and applauded** their **wonderful effort**. Maya and Tom **felt extremely proud** of **protecting nature**.`;

const w35ReadStoryVi = `Vào một **sáng thứ Bảy ấm áp**, Maya và Tom **đến thăm công viên thành phố yêu thích của họ**. Họ rất buồn khi thấy **chai nhựa và rác thải** **vứt bừa bãi trên thảm cỏ xanh**.

**Không một chút do dự**, họ **quyết định cùng nhau dọn dẹp** **toàn bộ công viên**. **Đầu tiên**, họ **đeo găng tay** và **gom toàn bộ rác thải nhựa** vào **thùng tái chế**.

**Tiếp theo**, họ **trồng những bông hoa rực rỡ** và **những cây xanh non** gần hồ nước. **Nhờ vào nỗ lực chăm chỉ của họ**, công viên đã trở nên **sạch sẽ và đẹp đẽ trở lại**.

Tất cả du khách **đều mỉm cười và vỗ tay khen ngợi** **nỗ lực tuyệt vời của họ**. Maya và Tom **cảm thấy cực kỳ tự hào** vì đã **bảo vệ thiên nhiên**.`;

const w35DictMap = {
  "warm Saturday morning": "sáng thứ Bảy ấm áp",
  "visited their favorite city park": "đến thăm công viên thành phố yêu thích của họ",
  "plastic bottles and rubbish": "chai nhựa và rác thải",
  "scattered on the green grass": "vứt bừa bãi trên thảm cỏ xanh",
  "Without hesitation": "Không một chút do dự",
  "decided to clean up": "quyết định cùng nhau dọn dẹp",
  "entire park together": "toàn bộ công viên",
  "First": "Đầu tiên",
  "put on gloves": "đeo găng tay",
  "collected all the plastic waste": "gom toàn bộ rác thải nhựa",
  "recycling bins": "thùng tái chế",
  "Next": "Tiếp theo",
  "planted colorful flowers": "trồng những bông hoa rực rỡ",
  "young green trees": "những cây xanh non",
  "Thanks to their hard work": "Nhờ vào nỗ lực chăm chỉ của họ",
  "clean and beautiful again": "sạch sẽ và đẹp đẽ trở lại",
  "smiled and applauded": "đều mỉm cười và vỗ tay khen ngợi",
  "wonderful effort": "nỗ lực tuyệt vời của họ",
  "felt extremely proud": "cảm thấy cực kỳ tự hào",
  "protecting nature": "bảo vệ thiên nhiên"
};

const w35WritingData = {
  "title": "Save Our Park — Environmental Action",
  "min_sentences": 10,
  "theme": "environment",
  "min_words": 65,
  "model_sentence": "On a warm Saturday morning, Maya and Tom visited their favorite city park. They were sad to see plastic bottles and rubbish scattered on the green grass. Without hesitation, they decided to clean up the entire park together. First, they put on gloves and collected all the plastic waste into recycling bins. Next, they planted colorful flowers and young green trees near the pond. Thanks to their hard work, the park became clean and beautiful again. All the visitors smiled and applauded their wonderful effort. Maya and Tom felt extremely proud of protecting nature.",
  "topic_talk_prompt": "Tell me about what we can do to protect the environment and combat climate change!",
  "sentence_frames": [
    {
      "template": "On a warm Saturday morning, Maya and Tom visited their favorite _____ park.",
      "answers": ["city"]
    },
    {
      "template": "They were sad to see plastic bottles and _____ scattered on the grass.",
      "answers": ["rubbish"]
    },
    {
      "template": "Without _____, they decided to clean up the entire park.",
      "answers": ["hesitation"]
    },
    {
      "template": "First, they put on _____ and collected plastic waste.",
      "answers": ["gloves"]
    },
    {
      "template": "They threw the waste into _____ bins.",
      "answers": ["recycling"]
    },
    {
      "template": "Next, they planted colorful flowers and young _____ trees.",
      "answers": ["green"]
    },
    {
      "template": "Thanks to their hard work, the park became _____ again.",
      "answers": ["clean"]
    },
    {
      "template": "All the visitors smiled and _____ their wonderful effort.",
      "answers": ["applauded"]
    },
    {
      "template": "Maya and Tom felt _____ proud of their team.",
      "answers": ["extremely"]
    },
    {
      "template": "They learned how important it is to protect _____.",
      "answers": ["nature"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "city", "vi": "thành phố", "distractor": false },
        { "word": "rubbish", "vi": "rác thải", "distractor": false },
        { "word": "hesitation", "vi": "do dự", "distractor": false },
        { "word": "gloves", "vi": "găng tay", "distractor": false },
        { "word": "recycling", "vi": "tái chế", "distractor": false },
        { "word": "green", "vi": "xanh lá", "distractor": false },
        { "word": "clean", "vi": "sạch sẽ", "distractor": false },
        { "word": "applauded", "vi": "vỗ tay hoan hô", "distractor": false },
        { "word": "extremely", "vi": "cực kỳ", "distractor": false },
        { "word": "nature", "vi": "thiên nhiên", "distractor": false },
        { "word": "destroy", "vi": "phá hỏng", "distractor": true },
        { "word": "carelessly", "vi": "bẩu ẩu", "distractor": true }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week35/story_writing_pic.jpg",
      "image_prompt": "Maya and Tom cleaning their favorite city park on a warm Saturday morning, putting plastic bottles into recycling bins and planting green trees. Visitors applaud. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "plastic waste",
          "recycling bins",
          "planted green trees",
          "protect nature"
        ],
        "cumulative_chunks": [
          "favorite city park",
          "without hesitation",
          "felt extremely proud"
        ],
        "connectors": [
          "On a warm Saturday",
          "First",
          "Next",
          "Thanks to their hard work"
        ],
        "grammar_boosters": [
          "decided to clean up",
          "while they were planting"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how Maya and Tom collected plastic bottles, put them into recycling bins, and planted green trees to clean up their favorite city park.",
        "vi": "Nhìn bức tranh. Mô tả cách Maya và Tom nhặt chai nhựa, bỏ vào thùng tái chế và trồng cây xanh để dọn dẹp công viên thành phố yêu thích của họ."
      },
      "rubric_tier": 2
    }
  }
};

function buildReadJsCode(title, imageUrl, audioUrl, contentEn, contentVi, chunkFocus, dictMap) {
  const cfCode = JSON.stringify(chunkFocus, null, 2);
  const dictCode = JSON.stringify(dictMap, null, 2);

  return `// Auto-generated synchronized read.js
export default {
  title: ${JSON.stringify(title)},
  image_url: ${JSON.stringify(imageUrl)},
  audio_url: ${JSON.stringify(audioUrl)},
  content_en: \`${contentEn}\`,
  content_vi: \`${contentVi}\`,
  comprehension_questions: [
    { id: 1, question_en: "What did the characters do in the story?", answer: ["Worked hard together", "Cleaned and helped"], clue_statement: "They worked together and made a wonderful effort.", hint_en: "They worked ___.", hint_vi: "Họ làm việc ___.", audio_url: "${audioUrl}" }
  ]
};

export const chunk_focus = ${cfCode};

export const dictionary = ${dictCode};
`;
}

async function executeCriticalRewriteW34W35() {
  const root = process.cwd();
  console.log('🚀 EXECUTING CRITICAL REWRITE FOR WEEK 34 & WEEK 35...\n');

  // --- 1. OVERWRITE WEEK 34 READ.JS & WRITING.JS ---
  const w34ReadPath = path.join(root, 'src/data/weeks/week_34/read.js');
  const w34Chunks = Object.keys(w34DictMap).concat(Object.values(w34DictMap));
  const w34FullDict = { ...w34DictMap };
  Object.entries(w34DictMap).forEach(([k, v]) => { w34FullDict[v] = k; });
  fs.writeFileSync(
    w34ReadPath,
    buildReadJsCode("The Ant and the Grasshopper", "/images/week34/read_cover_w34.jpg", "/audio/week34/read_main.mp3", w34ReadStory, w34ReadStoryVi, w34Chunks, w34FullDict),
    'utf8'
  );
  console.log(`✅ Updated W34 Read & Explore text in: ${path.relative(root, w34ReadPath)}`);

  const w34WritingTargets = [
    path.join(root, 'src/data/weeks/week_34/writing.js'),
    path.join(root, 'src/data/weeks_easy/week_34/writing.js')
  ];
  for (const t of w34WritingTargets) {
    if (fs.existsSync(path.dirname(t))) {
      fs.writeFileSync(t, `export default ${JSON.stringify(w34WritingData, null, 2)};\n`, 'utf8');
      console.log(`✅ Overwrote W34 Writing Data in: ${path.relative(root, t)}`);
    }
  }

  // --- 2. OVERWRITE WEEK 35 READ.JS & WRITING.JS ---
  const w35ReadPath = path.join(root, 'src/data/weeks/week_35/read.js');
  const w35Chunks = Object.keys(w35DictMap).concat(Object.values(w35DictMap));
  const w35FullDict = { ...w35DictMap };
  Object.entries(w35DictMap).forEach(([k, v]) => { w35FullDict[v] = k; });
  fs.writeFileSync(
    w35ReadPath,
    buildReadJsCode("Save Our Park — Environmental Action", "/images/week35/read_cover_w35.jpg", "/audio/week35/read_main.mp3", w35ReadStory, w35ReadStoryVi, w35Chunks, w35FullDict),
    'utf8'
  );
  console.log(`✅ Updated W35 Read & Explore text in: ${path.relative(root, w35ReadPath)}`);

  const w35WritingTargets = [
    path.join(root, 'src/data/weeks/week_35/writing.js'),
    path.join(root, 'src/data/weeks_easy/week_35/writing.js')
  ];
  for (const t of w35WritingTargets) {
    if (fs.existsSync(path.dirname(t))) {
      fs.writeFileSync(t, `export default ${JSON.stringify(w35WritingData, null, 2)};\n`, 'utf8');
      console.log(`✅ Overwrote W35 Writing Data in: ${path.relative(root, t)}`);
    }
  }

  console.log('\n🎉 CRITICAL REWRITE FOR WEEK 34 & WEEK 35 COMPLETE!');
}

executeCriticalRewriteW34W35().catch(console.error);
