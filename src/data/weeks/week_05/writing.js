export default {
  title: "The Mystery House",
  min_words: 40,
  model_sentence: "I live in a comfortable house with my family. Our house has four rooms: a living room, a kitchen, a bathroom, and two bedrooms. In the living room, there is a big sofa and a colorful bookshelf full of story books. My bedroom is my favorite room because it is cosy and quiet. There is a large window in my bedroom so I can see the garden outside. I love sitting by the window and reading before bed.",
  instruction_en: "Describe your house room by room with full details!",
  instruction_vi: "M\u00f4 t\u1ea3 t\u1eebng ph\u00f2ng trong nh\u00e0 b\u1ea1n v\u1edbi \u0111\u1ea7y \u0111\u1ee7 chi ti\u1ebft!",
  prompt_en: "What rooms are there? What is in each room? Which room is your favorite and why?",
  prompt_vi: "C\u00f3 nh\u1eefng ph\u00f2ng n\u00e0o? M\u1ed7i ph\u00f2ng c\u00f3 g\u00ec? Ph\u00f2ng y\u00eau th\u00edch c\u1ee7a b\u1ea1n l\u00e0 g\u00ec v\u00e0 t\u1ea1i sao?",
  keywords: ["comfortable", "living room", "bookshelf", "cosy", "quiet", "window", "garden"],
  topic_talk_prompt: "Describe your house and your favorite room!",
  sentence_frames: [
    {
        "template": "Our house has four rooms: ___, ___, ___, and ___.",
        "answers": [
            "a living room",
            "a kitchen",
            "a bathroom",
            "two bedrooms"
        ]
    },
    {
        "template": "In the living room, there is ___ and ___.",
        "answers": [
            "a big sofa",
            "a colorful bookshelf full of story books"
        ]
    },
    {
        "template": "My bedroom is my favorite room because it is ___ and ___.",
        "answers": [
            "cosy",
            "quiet"
        ]
    },
    {
        "template": "There is ___ in my bedroom so I can see ___.",
        "answers": [
            "a large window",
            "the garden outside"
        ]
    },
    {
        "template": "I love ___ and ___ before bed.",
        "answers": [
            "sitting by the window",
            "reading"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
    {
        "word": "a living room",
        "vi": "phòng khách",
        "distractor": false
    },
    {
        "word": "a kitchen",
        "vi": "nhà bếp",
        "distractor": false
    },
    {
        "word": "a bathroom",
        "vi": "phòng tắm",
        "distractor": false
    },
    {
        "word": "two bedrooms",
        "vi": "hai phòng ngủ",
        "distractor": false
    },
    {
        "word": "a big sofa",
        "vi": "ghế sofa lớn",
        "distractor": false
    },
    {
        "word": "a colorful bookshelf full of story books",
        "vi": "kệ sách đầy màu sắc",
        "distractor": false
    },
    {
        "word": "cosy",
        "vi": "ấm cúng",
        "distractor": false
    },
    {
        "word": "quiet",
        "vi": "yên tĩnh",
        "distractor": false
    },
    {
        "word": "a large window",
        "vi": "cửa sổ lớn",
        "distractor": false
    },
    {
        "word": "the garden outside",
        "vi": "khu vườn bên ngoài",
        "distractor": false
    },
    {
        "word": "sitting by the window",
        "vi": "ngồi bên cửa sổ",
        "distractor": false
    },
    {
        "word": "reading",
        "vi": "đọc sách",
        "distractor": false
    },
    {
        "word": "a garage and a pool",
        "vi": "nhà xe và bể bơi",
        "distractor": true
    },
    {
        "word": "noisy and crowded",
        "vi": "ồn ào và đông đúc",
        "distractor": true
    },
    {
        "word": "a broken door",
        "vi": "cửa bị hỏng",
        "distractor": true
    }
]
    }
  }
};
