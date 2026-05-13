export default {
  title: "A Day at the Market",
  min_words: 50,
  model_sentence: "Last Saturday, my class and I went on a field trip to the old town market, and our teacher told us to use all five senses as we explored. First, I saw rows of colorful stalls with glass jars filled with honey glowing in the sunlight, and wooden shelves carved with beautiful leaf patterns. I touched a heavy stone bowl that felt cool and smooth in my hands, and a cotton scarf so soft it was like touching a cloud. When I walked past the spice stall, I smelt cinnamon and sweet roses drifting through the air and filling my nose with warmth. I heard vendors calling their prices, children laughing loudly, and the echo of footsteps on the stone path. Then, near the entrance, a tall stack of plastic bottles fell over with a crash and everyone felt startled — but then we all laughed together. It was the most exciting and sensory lesson I have ever had, and I saw that everything around me was made of a different material: glass, wood, stone, cotton, metal, or plastic.",
  instruction_en: "Write about a visit to a market or place, using all five senses and at least FOUR materials words (wood, metal, glass, stone, cotton, plastic)!",
  instruction_vi: "Vi\u1ebft b\u00e0i \u0111i b\u1ed9 c\u1ea3m gi\u00e1c chi ti\u1ebft d\u00f9ng c\u1ea3 n\u0103m gi\u00e1c quan v\u1edbi ng\u00f4n ng\u1eef sinh \u0111\u1ed9ng!",
  prompt_en: "What did you see, hear, smell, and feel? What materials did you notice?",
  prompt_vi: "B\u1ea1n th\u1ea5y, nghe, ng\u1eedi, c\u1ea3m v\u00e0 n\u1ebfm g\u00ec? D\u00f9ng t\u1eeb m\u00f4 t\u1ea3 phong ph\u00fa!",
  keywords: ["glass", "wood", "stone", "cotton", "metal", "plastic", "saw", "heard", "felt", "smelt"],
  topic_talk_prompt: "Describe a walk through all five senses \u2014 sight, sound, smell, touch, and taste!",
  sentence_frames: [
    {
      "template": "I saw rows of ___ stalls with ___ jars glowing in the sunlight and ___ shelves carved with beautiful patterns.",
      "answers": ["colorful", "glass", "wooden"]
    },
    {
      "template": "I touched a heavy ___ bowl that felt ___ and smooth, and a ___ scarf so soft it was like a cloud.",
      "answers": ["stone", "cool", "cotton"]
    },
    {
      "template": "When I walked past the spice stall, I smelt ___ and ___ drifting through the air.",
      "answers": ["cinnamon", "sweet roses"]
    },
    {
      "template": "I heard the sellers calling their ___, children ___, and the echo of footsteps on the ___ path.",
      "answers": ["prices", "laughing", "stone"]
    },
    {
      "template": "A stack of ___ bottles fell with a crash and everyone felt ___ — but then we all ___ together.",
      "answers": ["plastic", "startled", "laughed"]
    },
    {
      "template": "I noticed that everything was made of a different material: ___, ___, ___, or ___.",
      "answers": ["glass", "wood", "metal", "plastic"]
    },
    {
      "template": "A cool ___ blew through the market and made the ___ cloth at the fabric stall ___.",
      "answers": ["breeze", "cotton", "flutter"]
    },
    {
      "template": "It was the most ___ and ___ lesson I had ever had, and I wanted to go back every ___.",
      "answers": ["exciting", "sensory", "weekend"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
    {"word": "colorful", "vi": "nhiều màu sắc", "distractor": false},
    {"word": "glass", "vi": "thủy tinh", "distractor": false},
    {"word": "wooden", "vi": "bằng gỗ", "distractor": false},
    {"word": "stone", "vi": "đá", "distractor": false},
    {"word": "cool", "vi": "mát lạnh", "distractor": false},
    {"word": "cotton", "vi": "vải bông", "distractor": false},
    {"word": "cinnamon", "vi": "quế", "distractor": false},
    {"word": "sweet roses", "vi": "hoa hồng ngọt ngào", "distractor": false},
    {"word": "prices", "vi": "giá cả", "distractor": false},
    {"word": "laughing", "vi": "tiếng cười", "distractor": false},
    {"word": "plastic", "vi": "nhựa", "distractor": false},
    {"word": "startled", "vi": "giật mình", "distractor": false},
    {"word": "laughed", "vi": "cười", "distractor": false},
    {"word": "metal", "vi": "kim loại", "distractor": false},
    {"word": "breeze", "vi": "gió nhẹ", "distractor": false},
    {"word": "flutter", "vi": "bay phấp phới", "distractor": false},
    {"word": "exciting", "vi": "thú vị", "distractor": false},
    {"word": "sensory", "vi": "giác quan", "distractor": false},
    {"word": "weekend", "vi": "cuối tuần", "distractor": false},
    {"word": "a pile of rubbish", "vi": "đống rác", "distractor": true},
    {"word": "roaring traffic", "vi": "tiếng xe cộ ầm ĩ", "distractor": true}
]
    }
  }
};
