export default {
  title: "My Favorite Weekend Place",
  min_words: 45,
  model_sentence: "My favorite place to visit on the weekend is the large park near my house, and I go there almost every Saturday morning. The park has a beautiful lake, tall shady trees, and a wide path where people jog, cycle, and walk their dogs. I usually go with my parents and my younger sister because we all enjoy spending time outdoors together. We bring a picnic blanket and some sandwiches and then we find a quiet spot near the lake to sit and relax. My sister loves to feed the ducks while I fly my kite and my parents chat and read. By the time we go home in the afternoon, we all feel refreshed and happy.",
  instruction_en: "Write about your favorite weekend place with lots of details!",
  instruction_vi: "Vi\u1ebft v\u1ec1 n\u01a1i y\u00eau th\u00edch cu\u1ed1i tu\u1ea7n v\u1edbi nhi\u1ec1u chi ti\u1ebft!",
  prompt_en: "Where is it? What is there? Who goes with you? What do you all do?",
  prompt_vi: "N\u01a1i \u0111\u00f3 \u1edf \u0111\u00e2u? \u1ede \u0111\u00f3 c\u00f3 g\u00ec? Ai \u0111i c\u00f9ng b\u1ea1n? C\u1ea3 nh\u00e0 l\u00e0m g\u00ec?",
  keywords: ["lake", "shady", "jog", "picnic", "blanket", "refreshed", "ducks", "kite"],
  topic_talk_prompt: "Describe your favorite weekend place from start to finish!",
  sentence_frames: [
    {
        "template": "The park has ___, ___, and ___ where people jog, cycle, and walk their dogs.",
        "answers": [
            "a beautiful lake",
            "tall shady trees",
            "a wide path"
        ]
    },
    {
        "template": "I usually go with ___ because we all enjoy ___.",
        "answers": [
            "my parents and my younger sister",
            "spending time outdoors together"
        ]
    },
    {
        "template": "We bring ___ and ___ and then find a quiet spot near the lake to ___.",
        "answers": [
            "a picnic blanket",
            "some sandwiches",
            "sit and relax"
        ]
    },
    {
        "template": "My sister loves to ___ while I ___ and my parents ___.",
        "answers": [
            "feed the ducks",
            "fly my kite",
            "chat and read"
        ]
    },
    {
        "template": "By the time we go home, we all feel ___ and ___.",
        "answers": [
            "refreshed",
            "happy"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
    {
        "word": "a beautiful lake",
        "vi": "một hồ đẹp",
        "distractor": false
    },
    {
        "word": "tall shady trees",
        "vi": "cây cao có bóng mát",
        "distractor": false
    },
    {
        "word": "a wide path",
        "vi": "con đường rộng",
        "distractor": false
    },
    {
        "word": "my parents and my younger sister",
        "vi": "bố mẹ và em gái",
        "distractor": false
    },
    {
        "word": "spending time outdoors together",
        "vi": "cùng dành thời gian ngoài trời",
        "distractor": false
    },
    {
        "word": "a picnic blanket",
        "vi": "tấm chăn dã ngoại",
        "distractor": false
    },
    {
        "word": "some sandwiches",
        "vi": "một vài bánh sandwich",
        "distractor": false
    },
    {
        "word": "sit and relax",
        "vi": "ngồi và thư giãn",
        "distractor": false
    },
    {
        "word": "feed the ducks",
        "vi": "cho vịt ăn",
        "distractor": false
    },
    {
        "word": "fly my kite",
        "vi": "thả diều",
        "distractor": false
    },
    {
        "word": "chat and read",
        "vi": "nói chuyện và đọc sách",
        "distractor": false
    },
    {
        "word": "refreshed",
        "vi": "sảng khoái",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "a noisy construction site",
        "vi": "công trường ồn ào",
        "distractor": true
    },
    {
        "word": "bored and tired",
        "vi": "chán và mệt",
        "distractor": true
    },
    {
        "word": "argue and fight",
        "vi": "cãi nhau và đánh nhau",
        "distractor": true
    }
]
    }
  }
};
