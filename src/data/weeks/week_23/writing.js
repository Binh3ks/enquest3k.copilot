export default {
  title: "My Art Class Story",
  min_words: 40,
  model_sentence: "Yesterday in art class I painted a picture of flowers. First I picked up my brush and dipped it into red pigment. Then I carefully painted each petal and added green leaves.",
  instruction_en: "Write a sequence story about your art class!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n chu\u1ed7i v\u1ec1 gi\u1edd m\u1ef9 thu\u1eadt c\u1ee7a b\u1ea1n!",
  prompt_en: "What did you paint? What did you do first, then next?",
  prompt_vi: "B\u1ea1n v\u1ebd g\u00ec? B\u1ea1n l\u00e0m g\u00ec \u0111\u1ea7u ti\u00ean, r\u1ed3i ti\u1ebfp theo?",
  keywords: ["art class", "painted", "flowers", "brush", "red", "petal", "green", "leaves"],
  topic_talk_prompt: "Tell the story of what you created in art class!",
  sentence_frames: [
    {
        "template": "Yesterday in ___ I ___ a picture of ___.",
        "answers": [
            "art class",
            "painted",
            "flowers"
        ]
    },
    {
        "template": "First I ___ and dipped it into ___.",
        "answers": [
            "picked up my brush",
            "red pigment"
        ]
    },
    {
        "template": "Then I carefully ___ each petal and added ___.",
        "answers": [
            "painted",
            "green leaves"
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
        "word": "art class",
        "vi": "giờ mỹ thuật",
        "distractor": false
    },
    {
        "word": "painted",
        "vi": "vẽ",
        "distractor": false
    },
    {
        "word": "flowers",
        "vi": "hoa",
        "distractor": false
    },
    {
        "word": "picked up my brush",
        "vi": "cầm bút vẽ lên",
        "distractor": false
    },
    {
        "word": "red pigment",
        "vi": "màu đỏ",
        "distractor": false
    },
    {
        "word": "painted",
        "vi": "vẽ tô màu",
        "distractor": false
    },
    {
        "word": "green leaves",
        "vi": "lá xanh",
        "distractor": false
    },
    {
        "word": "math class",
        "vi": "giờ toán",
        "distractor": true
    },
    {
        "word": "blue ink",
        "vi": "mực xanh",
        "distractor": true
    },
    {
        "word": "erased",
        "vi": "tẩy xóa",
        "distractor": true
    }
]
    }
  }
};
