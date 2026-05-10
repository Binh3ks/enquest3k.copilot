export default {
  title: "The Old Town",
  min_words: 48,
  model_sentence: "My neighbourhood has changed a great deal over the past ten years, and sometimes I find it hard to recognise the streets I grew up on. When I was young, there was a small and lively market near the river where local people came every morning to buy fresh vegetables, fish, and fruit. There were tall old trees lining both sides of the main road, and their branches formed a beautiful green canopy that kept everything cool and shady. There was also a wooden bridge over the river that children loved to run across and look down at the water below. However, most of those old trees were cut down to make way for a new road, and the wooden bridge was replaced by a wider concrete one. The market was moved to a large indoor centre further away, and now our street feels very different. I miss the way the old neighbourhood looked and felt.",
  instruction_en: "Write about how your neighbourhood has changed over time using was, were, and however!",
  instruction_vi: "Vi\u1ebft v\u1ec1 s\u1ef1 thay \u0111\u1ed5i c\u1ee7a khu ph\u1ed1 theo th\u1eddi gian d\u00f9ng was, were v\u00e0 however!",
  prompt_en: "What was your neighbourhood like before? What has changed? How do you feel about it?",
  prompt_vi: "Khu ph\u1ed1 tr\u01b0\u1edbc \u0111\u00e2y th\u1ebf n\u00e0o? \u0110i\u1ec1u g\u00ec \u0111\u00e3 thay \u0111\u1ed5i? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o v\u1ec1 \u0111i\u1ec1u \u0111\u00f3?",
  keywords: ["recognise", "lively", "canopy", "shady", "concrete", "replaced", "indoor", "miss"],
  topic_talk_prompt: "Describe how your neighbourhood has changed \u2014 past vs present!",
  sentence_frames: [
    {
        "template": "There was ___ near the river where people came to buy ___, ___, and ___.",
        "answers": [
            "a small and lively market",
            "fresh vegetables",
            "fish",
            "fruit"
        ]
    },
    {
        "template": "There were ___ lining the road, and their branches formed ___ that kept everything ___.",
        "answers": [
            "tall old trees",
            "a beautiful green canopy",
            "cool and shady"
        ]
    },
    {
        "template": "There was also ___ over the river that children loved to ___ and look at the water below.",
        "answers": [
            "a wooden bridge",
            "run across"
        ]
    },
    {
        "template": "Most of those old trees were ___ to make way for ___, and the wooden bridge was replaced by ___.",
        "answers": [
            "cut down",
            "a new road",
            "a wider concrete one"
        ]
    },
    {
        "template": "The market was ___ to a large indoor centre, and now our street feels ___.",
        "answers": [
            "moved",
            "very different"
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
        "word": "a small and lively market",
        "vi": "một khu chợ nhỏ và sôi động",
        "distractor": false
    },
    {
        "word": "fresh vegetables",
        "vi": "rau tươi",
        "distractor": false
    },
    {
        "word": "fish",
        "vi": "cá",
        "distractor": false
    },
    {
        "word": "fruit",
        "vi": "trái cây",
        "distractor": false
    },
    {
        "word": "tall old trees",
        "vi": "những cây cổ thụ cao",
        "distractor": false
    },
    {
        "word": "a beautiful green canopy",
        "vi": "một tán cây xanh đẹp",
        "distractor": false
    },
    {
        "word": "cool and shady",
        "vi": "mát mẻ và bóng râm",
        "distractor": false
    },
    {
        "word": "a wooden bridge",
        "vi": "cây cầu gỗ",
        "distractor": false
    },
    {
        "word": "run across",
        "vi": "chạy qua",
        "distractor": false
    },
    {
        "word": "cut down",
        "vi": "bị chặt hạ",
        "distractor": false
    },
    {
        "word": "a new road",
        "vi": "một con đường mới",
        "distractor": false
    },
    {
        "word": "a wider concrete one",
        "vi": "một cái rộng hơn bằng bê tông",
        "distractor": false
    },
    {
        "word": "moved",
        "vi": "di dời",
        "distractor": false
    },
    {
        "word": "very different",
        "vi": "rất khác biệt",
        "distractor": false
    },
    {
        "word": "a new supermarket",
        "vi": "siêu thị mới — không liên quan",
        "distractor": true
    },
    {
        "word": "unchanged",
        "vi": "không thay đổi",
        "distractor": true
    },
    {
        "word": "exactly the same",
        "vi": "y hệt như cũ",
        "distractor": true
    }
]
    }
  }
};
