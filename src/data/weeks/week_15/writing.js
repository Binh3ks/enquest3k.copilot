export default {
  title: "Write About Your Park Visit",
  min_words: 45,
  model_sentence: "I am visiting the busy park near my school with my class today and everyone is doing something different. Some children are playing football on the grass while others are sitting under the trees and drawing pictures. A group of older people are doing morning exercises near the fountain, and they look very energetic and happy. Two little girls are feeding the ducks beside the small pond, and the ducks are splashing and quacking loudly. My teacher is standing at the entrance and taking photos of all of us because she wants to remember this special trip. I am sitting on a bench and writing in my notebook because I want to describe everything I see.",
  instruction_en: "Describe a lively park scene using present continuous for everyone!",
  instruction_vi: "M\u00f4 t\u1ea3 c\u1ea3nh c\u00f4ng vi\u00ean s\u00f4i \u0111\u1ed9ng b\u1eb1ng th\u00ec hi\u1ec7n t\u1ea1i ti\u1ebfp di\u1ec5n!",
  prompt_en: "What is everyone doing? Use is/are + -ing for each person or group!",
  prompt_vi: "M\u1ecdi ng\u01b0\u1eddi \u0111ang l\u00e0m g\u00ec? D\u00f9ng is/are + -ing cho t\u1eebng ng\u01b0\u1eddi ho\u1eb7c nh\u00f3m!",
  keywords: ["fountain", "energetic", "splashing", "quacking", "entrance", "bench", "notebook"],
  topic_talk_prompt: "Describe the park scene \u2014 what is everyone doing right now?",
  sentence_frames: [
    {
        "template": "Some children are ___ while others are ___ and ___.",
        "answers": [
            "playing football on the grass",
            "sitting under the trees",
            "drawing pictures"
        ]
    },
    {
        "template": "A group of older people are ___ near the fountain, and they look ___ and ___.",
        "answers": [
            "doing morning exercises",
            "very energetic",
            "happy"
        ]
    },
    {
        "template": "Two little girls are ___ beside the pond, and the ducks are ___ and ___ loudly.",
        "answers": [
            "feeding the ducks",
            "splashing",
            "quacking"
        ]
    },
    {
        "template": "My teacher is ___ because she wants to ___ this special trip.",
        "answers": [
            "standing at the entrance and taking photos",
            "remember"
        ]
    },
    {
        "template": "I am ___ and ___ because I want to describe everything I see.",
        "answers": [
            "sitting on a bench",
            "writing in my notebook"
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
        "word": "playing football on the grass",
        "vi": "đá bóng trên bãi cỏ",
        "distractor": false
    },
    {
        "word": "sitting under the trees",
        "vi": "ngồi dưới bóng cây",
        "distractor": false
    },
    {
        "word": "drawing pictures",
        "vi": "vẽ tranh",
        "distractor": false
    },
    {
        "word": "doing morning exercises",
        "vi": "tập thể dục buổi sáng",
        "distractor": false
    },
    {
        "word": "very energetic",
        "vi": "rất tràn đầy năng lượng",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "feeding the ducks",
        "vi": "cho vịt ăn",
        "distractor": false
    },
    {
        "word": "splashing",
        "vi": "vẫy nước",
        "distractor": false
    },
    {
        "word": "quacking",
        "vi": "kêu quạc quạc",
        "distractor": false
    },
    {
        "word": "standing at the entrance and taking photos",
        "vi": "đứng ở cổng và chụp ảnh",
        "distractor": false
    },
    {
        "word": "remember",
        "vi": "nhớ lại",
        "distractor": false
    },
    {
        "word": "sitting on a bench",
        "vi": "ngồi trên ghế",
        "distractor": false
    },
    {
        "word": "writing in my notebook",
        "vi": "viết vào cuốn sổ",
        "distractor": false
    },
    {
        "word": "sleeping on the bench",
        "vi": "đang ngủ trên ghế",
        "distractor": true
    },
    {
        "word": "very bored and sad",
        "vi": "rất chán và buồn",
        "distractor": true
    },
    {
        "word": "forget",
        "vi": "quên",
        "distractor": true
    }
]
    }
  }
};
