// Script to synchronize Cambridge Full Mode Accumulation Data for Weeks 34, 35, 36, 37
import fs from 'fs';
import path from 'path';

// WEEK 34: The Ant and the Grasshopper (Irregular Verbs & Fable Lesson)
const week34Data = {
  "title": "The Ant and the Grasshopper — Fable & Work Ethic",
  "min_sentences": 10,
  "theme": "fable_and_moral",
  "min_words": 65,
  "model_sentence": "All summer long, on a bright sunny summer day, the tiny ant worked hard while gathering food grain by grain. Meanwhile, the lazy grasshopper sat near the ice-cold water stream and sang cheerfully under the warm sun. Suddenly, dark clouds covered the sky and the warm days disappeared quickly. When winter came, heavy snow fell all over the forest and winter arrived. The helpless grasshopper had no food left and was shivering in cold. He felt deeply worried and slowly walked to the ant's cozy house. The kind ant invited him inside and shared her warm food with him. The grasshopper was touched by her kindness and felt extremely relieved. Eventually, he learned a valuable lesson to work hard before winter. From that day on, he always worked hard to prepare for the future.",
  "topic_talk_prompt": "Tell me about a time when you worked hard with your friends to finish a project!",
  "sentence_frames": [
    {
      "template": "All summer long, on a _____ summer day, the tiny ant worked hard while gathering food grain by grain.",
      "answers": ["bright sunny"]
    },
    {
      "template": "Meanwhile, the lazy grasshopper sat near the _____ water stream and sang cheerfully.",
      "answers": ["ice-cold"]
    },
    {
      "template": "_____, dark clouds covered the sky and the warm days disappeared quickly.",
      "answers": ["Suddenly"]
    },
    {
      "template": "When winter came, heavy snow fell all over the forest and winter _____.",
      "answers": ["arrived"]
    },
    {
      "template": "The helpless grasshopper had no food left and was _____ in cold.",
      "answers": ["shivering"]
    },
    {
      "template": "He felt _____ worried and slowly walked to the ant's cozy house.",
      "answers": ["deeply"]
    },
    {
      "template": "The kind ant invited him inside and _____ her warm food with him.",
      "answers": ["shared"]
    },
    {
      "template": "The grasshopper was touched by her kindness and felt _____ relieved.",
      "answers": ["extremely"]
    },
    {
      "template": "_____, he learned a valuable lesson to work hard before winter.",
      "answers": ["Eventually"]
    },
    {
      "template": "From that day on, he always worked _____ to prepare for the future.",
      "answers": ["hard"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "bright sunny", "vi": "nắng hè rực rỡ", "distractor": false },
        { "word": "ice-cold", "vi": "lạnh như băng", "distractor": false },
        { "word": "Suddenly", "vi": "Đột nhiên", "distractor": false },
        { "word": "arrived", "vi": "đã đến", "distractor": false },
        { "word": "shivering", "vi": "run rẩy", "distractor": false },
        { "word": "deeply", "vi": "sâu sắc", "distractor": false },
        { "word": "shared", "vi": "chia sẻ", "distractor": false },
        { "word": "extremely", "vi": "cực kỳ", "distractor": false },
        { "word": "Eventually", "vi": "Rốt cuộc", "distractor": false },
        { "word": "hard", "vi": "chăm chỉ", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": true },
        { "word": "delicious", "vi": "ngon miệng", "distractor": true }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week34/story_writing_pic.jpg",
      "image_prompt": "In our fun English storytelling class today, my group presented the fable of the Ant and the Grasshopper. The ant gathered food grain by grain during bright sunny summer while the grasshopper sang cheerfully. When winter came, the grasshopper was shivering in cold. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "gathered food",
          "grain by grain",
          "sang cheerfully",
          "shivering in cold",
          "shared warm food"
        ],
        "cumulative_chunks": [
          "bright sunny summer",
          "ice-cold water",
          "felt deeply worried",
          "felt extremely relieved",
          "valuable lesson"
        ],
        "connectors": [
          "All summer long",
          "Meanwhile",
          "Suddenly",
          "When winter came",
          "Eventually"
        ],
        "grammar_boosters": [
          "while gathering food",
          "while the ant was working",
          "so that he could survive"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how the ant gathered food during summer while the grasshopper sang cheerfully, and what happened when winter arrived.",
        "vi": "Nhìn bức tranh. Mô tả cách chú kiến tích trữ thức ăn trong mùa hè trong khi chú châu chấu ca hát, và chuyện gì xảy ra khi mùa đông đến."
      },
      "rubric_tier": 2
    }
  }
};

// WEEK 35: Environmental Issues (Save Our Planet)
const week35Data = {
  "title": "Protecting Our Planet — Environmental Action",
  "min_sentences": 10,
  "theme": "environment",
  "min_words": 65,
  "model_sentence": "Last weekend, our student team visited the busy city park to clean up the dirty street. First, we noticed lots of plastic waste lying on the grass because plastic harms animals. We quickly collected bottles and recycled paper so that we could keep the park clean. After that, we planted green trees along the walkway to protect nature. Many local families saw our action and decided to join our green team. Everyone worked together happily to reduce pollution in our neighborhood. The park soon became a beautiful green park full of fresh air. Thanks to their hard work, the whole community learned how to care for Earth. The hardworking students felt proud of themselves and smiled brightly. We promised to protect our home planet Earth every single day.",
  "topic_talk_prompt": "Tell me about what we can do to protect the environment and combat climate change!",
  "sentence_frames": [
    {
      "template": "Last weekend, our student team visited the _____ park to clean up the dirty street.",
      "answers": ["busy city"]
    },
    {
      "template": "First, we noticed lots of _____ waste lying on the grass because plastic harms animals.",
      "answers": ["plastic"]
    },
    {
      "template": "We quickly collected _____ and recycled paper so that we could keep the park clean.",
      "answers": ["bottles"]
    },
    {
      "template": "After that, we _____ green trees along the walkway to protect nature.",
      "answers": ["planted"]
    },
    {
      "template": "Many local families saw our action and _____ to join our green team.",
      "answers": ["decided"]
    },
    {
      "template": "Everyone worked together happily to _____ pollution in our neighborhood.",
      "answers": ["reduce"]
    },
    {
      "template": "The park soon became a _____ green park full of fresh air.",
      "answers": ["beautiful"]
    },
    {
      "template": "_____, the whole community learned how to care for Earth.",
      "answers": ["Thanks to their hard work"]
    },
    {
      "template": "The hardworking students felt _____ of themselves and smiled brightly.",
      "answers": ["proud"]
    },
    {
      "template": "We promised to _____ our home planet Earth every single day.",
      "answers": ["protect"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "busy city", "vi": "thành phố nhộn nhịp", "distractor": false },
        { "word": "plastic", "vi": "nhựa", "distractor": false },
        { "word": "bottles", "vi": "chai lọ", "distractor": false },
        { "word": "planted", "vi": "trồng", "distractor": false },
        { "word": "decided", "vi": "quyết định", "distractor": false },
        { "word": "reduce", "vi": "cắt giảm", "distractor": false },
        { "word": "beautiful", "vi": "xinh đẹp", "distractor": false },
        { "word": "Thanks to their hard work", "vi": "Nhờ nỗ lực chăm chỉ của họ", "distractor": false },
        { "word": "proud", "vi": "tự hào", "distractor": false },
        { "word": "protect", "vi": "bảo vệ", "distractor": false },
        { "word": "destroy", "vi": "phá hỏng", "distractor": true },
        { "word": "carelessly", "vi": "bẩu ẩu", "distractor": true }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week35/story_writing_pic.jpg",
      "image_prompt": "Students cleaning a busy city park, collecting plastic bottles, and planting green trees. They feel proud of themselves under a bright sunny sky. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "plastic waste",
          "collected bottles",
          "planted green trees",
          "protect nature",
          "reduce pollution"
        ],
        "cumulative_chunks": [
          "busy city park",
          "dirty street",
          "felt proud of themselves",
          "beautiful green park",
          "fresh air"
        ],
        "connectors": [
          "Last weekend",
          "First",
          "After that",
          "Thanks to their hard work",
          "In the end"
        ],
        "grammar_boosters": [
          "so that they could keep it clean",
          "because plastic harms animals",
          "by planting new trees"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how students collected plastic bottles and planted green trees to protect nature.",
        "vi": "Nhìn bức tranh. Mô tả cách học sinh gom chai nhựa và trồng cây xanh để bảo vệ thiên nhiên."
      },
      "rubric_tier": 2
    }
  }
};

// WEEK 36: Adventure Stories (The Secret Cave)
const week36Data = {
  "title": "Adventure Stories — The Secret Cave & Ancient Map",
  "min_sentences": 10,
  "theme": "adventure",
  "min_words": 65,
  "model_sentence": "Early in the morning, the brave explorers walked into the forest holding bright flashlights. They followed an ancient map to search for a mysterious cave. While they were exploring the dark cave, their hearts beat fast with curiosity. Dark grey shadows danced on the rocky walls, but they walked forward bravely. Suddenly, a strange sparkle caught Leo's eyes near a deep stone wall. To their utter surprise, they discovered a hidden treasure chest filled with gold coins. Leo exclaimed: 'Look! We found the ancient secret!'. Everyone felt extremely excited and cheered out loud with joy. Bursting into laughter, they carefully carried the heavy chest to the surface. In the end, they donated the historic treasure to the local museum.",
  "topic_talk_prompt": "Tell me about an exciting adventure story or mysterious discovery!",
  "sentence_frames": [
    {
      "template": "Early in the morning, the brave explorers walked into the forest holding _____ flashlights.",
      "answers": ["bright"]
    },
    {
      "template": "They followed an _____ map to search for a mysterious cave.",
      "answers": ["ancient"]
    },
    {
      "template": "While they were exploring the dark cave, their _____ beat fast with curiosity.",
      "answers": ["hearts"]
    },
    {
      "template": "Dark grey _____ danced on the rocky walls, but they walked forward bravely.",
      "answers": ["shadows"]
    },
    {
      "template": "_____, a strange sparkle caught Leo's eyes near a deep stone wall.",
      "answers": ["Suddenly"]
    },
    {
      "template": "To their utter surprise, they discovered a hidden _____ chest filled with gold coins.",
      "answers": ["treasure"]
    },
    {
      "template": "Leo exclaimed: 'Look! We found the ancient _____!'.",
      "answers": ["secret"]
    },
    {
      "template": "Everyone felt _____ excited and cheered out loud with joy.",
      "answers": ["extremely"]
    },
    {
      "template": "Bursting into _____, they carefully carried the heavy chest to the surface.",
      "answers": ["laughter"]
    },
    {
      "template": "_____, they donated the historic treasure to the local museum.",
      "answers": ["In the end"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "bright", "vi": "sáng rực", "distractor": false },
        { "word": "ancient", "vi": "cổ xưa", "distractor": false },
        { "word": "hearts", "vi": "trái tim", "distractor": false },
        { "word": "shadows", "vi": "bóng tối", "distractor": false },
        { "word": "Suddenly", "vi": "Đột nhiên", "distractor": false },
        { "word": "treasure", "vi": "kho báu", "distractor": false },
        { "word": "secret", "vi": "bí mật", "distractor": false },
        { "word": "extremely", "vi": "cực kỳ", "distractor": false },
        { "word": "laughter", "vi": "tiếng cười", "distractor": false },
        { "word": "In the end", "vi": "Cuối cùng", "distractor": false },
        { "word": "scary", "vi": "đáng sợ", "distractor": true },
        { "word": "quietly", "vi": "lặng lẽ", "distractor": true }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week36/story_writing_pic.jpg",
      "image_prompt": "Brave explorers inside a mysterious cave holding bright flashlights, discovering an ancient treasure chest. Dark grey shadows on stone walls, heart beat fast. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "holding bright flashlights",
          "mysterious cave",
          "ancient map",
          "hidden treasure chest",
          "carried the heavy chest"
        ],
        "cumulative_chunks": [
          "dark grey shadows",
          "heart beat fast",
          "felt extremely excited",
          "burst into laughter",
          "historic treasure"
        ],
        "connectors": [
          "Early in the morning",
          "Suddenly",
          "To their utter surprise",
          "In the end",
          "Meanwhile"
        ],
        "grammar_boosters": [
          "while they were exploring",
          "noticed a shiny box",
          "exclaimed with joy"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how explorers used an ancient map and flashlights to discover a hidden treasure chest in a mysterious cave.",
        "vi": "Nhìn bức tranh. Mô tả cách các nhà thám hiểm dùng bản đồ cổ và đèn pin để tìm thấy rương kho báu trong hang động kỳ bí."
      },
      "rubric_tier": 2
    }
  }
};

// WEEK 37: The Sports Day Challenge (Speed Science & Teamwork)
const week37Data = {
  "title": "Speed Science & Olympic Peace — Sports Day Challenge",
  "min_sentences": 10,
  "theme": "sports_day",
  "min_words": 65,
  "model_sentence": "On Saturday morning, our class gathered at the crowded sports stadium for the relay race. At first, the blue team was leading, but our runners maintained high momentum. While Leo was sprinting at full speed, Max passed the baton cleanly without dropping it. Meanwhile, thousands of spectators were cheering loudly in the stands. Max sprinted fast along the red track with smooth acceleration. Out of breath, he pushed forward with strong determination. He crossed the finish line first and broke the school record! Scientific teamwork brought victory to our hard-working team. Everyone felt proud and happy as they received their golden trophy. We celebrated our great triumph together with huge smiles.",
  "topic_talk_prompt": "Tell me about a sports day race or Olympic story — how did you apply speed science or teamwork to win?",
  "sentence_frames": [
    {
      "template": "On Saturday morning, our class gathered at the _____ sports stadium for the relay race.",
      "answers": ["crowded"]
    },
    {
      "template": "At first, the blue team was leading, but our runners maintained high _____.",
      "answers": ["momentum"]
    },
    {
      "template": "While Leo was sprinting at full speed, Max _____ the baton cleanly without dropping it.",
      "answers": ["passed"]
    },
    {
      "template": "_____, thousands of spectators were cheering loudly in the stands.",
      "answers": ["Meanwhile"]
    },
    {
      "template": "Max _____ fast along the red track with smooth acceleration.",
      "answers": ["sprinted"]
    },
    {
      "template": "Out of _____, he pushed forward with strong determination.",
      "answers": ["breath"]
    },
    {
      "template": "He crossed the _____ line first and broke the school record!",
      "answers": ["finish"]
    },
    {
      "template": "_____ brought victory to our hard-working team.",
      "answers": ["Scientific teamwork"]
    },
    {
      "template": "Everyone felt _____ and happy as they received their golden trophy.",
      "answers": ["proud"]
    },
    {
      "template": "We celebrated our great triumph together with _____ smiles.",
      "answers": ["huge"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "crowded", "vi": "đông đúc", "distractor": false },
        { "word": "momentum", "vi": "động năng", "distractor": false },
        { "word": "passed", "vi": "chuyền", "distractor": false },
        { "word": "Meanwhile", "vi": "Trong lúc đó", "distractor": false },
        { "word": "sprinted", "vi": "bứt tốc", "distractor": false },
        { "word": "breath", "vi": "hơi thở", "distractor": false },
        { "word": "finish", "vi": "đích", "distractor": false },
        { "word": "Scientific teamwork", "vi": "Tinh thần đồng đội khoa học", "distractor": false },
        { "word": "proud", "vi": "tự hào", "distractor": false },
        { "word": "huge", "vi": "rạng rỡ", "distractor": false },
        { "word": "slowly", "vi": "chậm chạp", "distractor": true },
        { "word": "lost", "vi": "thua", "distractor": true }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week37/story_writing_pic.jpg",
      "image_prompt": "Runners in a sports day relay race at a crowded sports stadium. Max passes the baton cleanly while sprinting fast. Spectators cheering loudly. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "relay race",
          "passed the baton",
          "sprinted fast",
          "crossed the finish line",
          "maintained high momentum"
        ],
        "cumulative_chunks": [
          "crowded sports stadium",
          "cheering loudly",
          "out of breath",
          "felt proud and happy",
          "broke the school record"
        ],
        "connectors": [
          "On Saturday morning",
          "At first",
          "Meanwhile",
          "Scientific teamwork brought victory",
          "Eventually"
        ],
        "grammar_boosters": [
          "while Leo was sprinting",
          "passed the baton cleanly",
          "with smooth acceleration"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how runners used teamwork, passed the baton cleanly, and sprinted fast to win the sports day relay race.",
        "vi": "Nhìn bức tranh. Mô tả cách các vận động viên phối hợp đồng đội, chuyền gậy tiếp sức và bứt tốc để chiến thắng cuộc thi chạy tiếp sức."
      },
      "rubric_tier": 2
    }
  }
};

const weekDataMap = {
  34: week34Data,
  35: week35Data,
  36: week36Data,
  37: week37Data
};

async function syncW34ToW37AccumulationData() {
  const root = process.cwd();
  console.log('🚀 SYNCHRONIZING CAMBRIDGE FULL MODE ACCUMULATION DATA FOR W34 - W37...\n');

  for (let w = 34; w <= 37; w++) {
    const pad = String(w).padStart(2, '0');
    const dataObj = weekDataMap[w];

    const targets = [
      path.join(root, `src/data/weeks/week_${pad}/writing.js`),
      path.join(root, `src/data/weeks_easy/week_${pad}/writing.js`)
    ];

    for (const targetPath of targets) {
      if (fs.existsSync(path.dirname(targetPath))) {
        const code = `export default ${JSON.stringify(dataObj, null, 2)};\n`;
        fs.writeFileSync(targetPath, code, 'utf8');
        console.log(`✅ Synchronized clean W${w} writing.js data in: ${path.relative(root, targetPath)}`);
      }
    }
  }

  console.log('\n🎉 W34 - W37 CAMBRIDGE FULL MODE ACCUMULATION DATA SYNC COMPLETE!');
}

syncW34ToW37AccumulationData().catch(console.error);
