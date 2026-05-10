export default {
  title: "My Art Class Story",
  min_words: 45,
  model_sentence: "Yesterday morning I had the most exciting art class I have ever had, and I want to describe every step of what I made. First, my teacher placed a large white canvas on each desk and told us we were going to paint a garden scene with at least three different colours. I picked up my thickest brush, dipped it carefully into bright red pigment, and began to paint a large rose in the centre of my canvas. Next, I used a finer brush to add detailed green leaves and curving stems around the rose, which made it look more realistic. Then I mixed yellow and orange together to paint a golden sun in the top right corner, and I used a thin brush to add little white clouds floating beside it. After I finished painting, I stepped back and looked at my work and I felt a strong sense of pride because the garden scene was even more beautiful than I had imagined.",
  instruction_en: "Write a detailed step-by-step art class story using first, next, then, after!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n m\u1ef9 thu\u1eadt chi ti\u1ebft theo t\u1eebng b\u01b0\u1edbc d\u00f9ng first, next, then, after!",
  prompt_en: "What did you paint? What steps did you follow? How did you feel at the end?",
  prompt_vi: "B\u1ea1n v\u1ebd g\u00ec? B\u1ea1n \u0111\u00e3 l\u00e0m theo nh\u1eefng b\u01b0\u1edbc n\u00e0o? Cu\u1ed1i c\u00f9ng b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["canvas", "pigment", "realistic", "stems", "curving", "floating", "pride", "imagined"],
  topic_talk_prompt: "Describe your art class step by step \u2014 what did you make and how?",
  sentence_frames: [
    {
        "template": "My teacher placed ___ on each desk and told us we were going to paint ___.",
        "answers": [
            "a large white canvas",
            "a garden scene"
        ]
    },
    {
        "template": "I picked up my ___, dipped it into ___, and began to ___ in the centre.",
        "answers": [
            "thickest brush",
            "bright red pigment",
            "paint a large rose"
        ]
    },
    {
        "template": "Next, I used ___ to add ___ and ___ around the rose, which made it look more realistic.",
        "answers": [
            "a finer brush",
            "detailed green leaves",
            "curving stems"
        ]
    },
    {
        "template": "Then I ___ and ___ together to paint a golden sun, and added ___ beside it.",
        "answers": [
            "mixed yellow",
            "orange",
            "little white clouds"
        ]
    },
    {
        "template": "I felt ___ because the garden scene was even more ___ than I had ___.",
        "answers": [
            "a strong sense of pride",
            "beautiful",
            "imagined"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
    {
        "word": "a large white canvas",
        "vi": "một tấm vải trắng lớn",
        "distractor": false
    },
    {
        "word": "a garden scene",
        "vi": "cảnh vườn hoa",
        "distractor": false
    },
    {
        "word": "thickest brush",
        "vi": "cọ dày nhất",
        "distractor": false
    },
    {
        "word": "bright red pigment",
        "vi": "màu đỏ sáng",
        "distractor": false
    },
    {
        "word": "paint a large rose",
        "vi": "vẽ một bông hồng lớn",
        "distractor": false
    },
    {
        "word": "a finer brush",
        "vi": "cọ mảnh hơn",
        "distractor": false
    },
    {
        "word": "detailed green leaves",
        "vi": "lá xanh chi tiết",
        "distractor": false
    },
    {
        "word": "curving stems",
        "vi": "thân cong",
        "distractor": false
    },
    {
        "word": "mixed yellow",
        "vi": "trộn màu vàng",
        "distractor": false
    },
    {
        "word": "orange",
        "vi": "màu cam",
        "distractor": false
    },
    {
        "word": "little white clouds",
        "vi": "những đám mây nhỏ trắng",
        "distractor": false
    },
    {
        "word": "a strong sense of pride",
        "vi": "cảm giác tự hào mạnh mẽ",
        "distractor": false
    },
    {
        "word": "beautiful",
        "vi": "đẹp",
        "distractor": false
    },
    {
        "word": "imagined",
        "vi": "tưởng tượng",
        "distractor": false
    },
    {
        "word": "a dirty eraser",
        "vi": "tẩy bẩn",
        "distractor": true
    },
    {
        "word": "ugly and messy",
        "vi": "xấu và bừa bộn",
        "distractor": true
    },
    {
        "word": "forgotten",
        "vi": "quên mất",
        "distractor": true
    }
]
    }
  }
};
