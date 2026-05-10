export default {
  title: "My Live Report",
  min_words: 45,
  model_sentence: "Good evening and welcome to a special live broadcast coming to you directly from my house at number twelve Pine Street! I am your reporter and I am standing in the living room right now, which is very busy this evening because my whole family is here. My mother is preparing dinner in the kitchen and the wonderful smell of soup and rice is drifting through the whole house. My father is sitting at the dining table and going through some work papers while my little sister is playing on the floor with her building blocks. My grandmother is sitting in her favourite armchair near the window and knitting a red scarf. Meanwhile, I am here reporting all of this important news and trying very hard not to eat all the soup before dinner is ready!",
  instruction_en: "Write a funny live news broadcast from inside your home using present continuous!",
  instruction_vi: "Vi\u1ebft b\u1ea3n tin tr\u1ef1c ti\u1ebfp h\u00e0i h\u01b0\u1edbc t\u1eeb trong nh\u00e0 d\u00f9ng th\u00ec hi\u1ec7n t\u1ea1i ti\u1ebfp di\u1ec5n!",
  prompt_en: "Where are you broadcasting from? What is each person doing right now?",
  prompt_vi: "B\u1ea1n \u0111ang ph\u00e1t s\u00f3ng t\u1eeb \u0111\u00e2u? M\u1ed7i ng\u01b0\u1eddi \u0111ang l\u00e0m g\u00ec l\u00fac n\u00e0y?",
  keywords: ["broadcast", "reporter", "drifting", "dining table", "building blocks", "armchair", "knitting", "scarf"],
  topic_talk_prompt: "Give a live broadcast from inside your house \u2014 what is everyone doing?",
  sentence_frames: [
    {
        "template": "My mother is ___ in the kitchen and the wonderful smell of ___ is drifting through the house.",
        "answers": [
            "preparing dinner",
            "soup and rice"
        ]
    },
    {
        "template": "My father is ___ and ___ while my little sister is ___.",
        "answers": [
            "sitting at the dining table",
            "going through some work papers",
            "playing on the floor with her building blocks"
        ]
    },
    {
        "template": "My grandmother is ___ near the window and ___.",
        "answers": [
            "sitting in her favourite armchair",
            "knitting a red scarf"
        ]
    },
    {
        "template": "Meanwhile, I am ___ and trying very hard not to ___ before dinner is ready!",
        "answers": [
            "here reporting all of this",
            "eat all the soup"
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
        "word": "preparing dinner",
        "vi": "đang chuẩn bị bữa tối",
        "distractor": false
    },
    {
        "word": "soup and rice",
        "vi": "canh và cơm",
        "distractor": false
    },
    {
        "word": "sitting at the dining table",
        "vi": "đang ngồi ở bàn ăn",
        "distractor": false
    },
    {
        "word": "going through some work papers",
        "vi": "đang xem qua giấy tờ công việc",
        "distractor": false
    },
    {
        "word": "playing on the floor with her building blocks",
        "vi": "đang chơi khối xây dựng trên sàn",
        "distractor": false
    },
    {
        "word": "sitting in her favourite armchair",
        "vi": "đang ngồi trên ghế bành yêu thích",
        "distractor": false
    },
    {
        "word": "knitting a red scarf",
        "vi": "đang đan một chiếc khăn đỏ",
        "distractor": false
    },
    {
        "word": "here reporting all of this",
        "vi": "đang tường thuật tất cả điều này",
        "distractor": false
    },
    {
        "word": "eat all the soup",
        "vi": "ăn hết canh",
        "distractor": false
    },
    {
        "word": "sleeping on the sofa",
        "vi": "đang ngủ trên sofa",
        "distractor": true
    },
    {
        "word": "watching cartoons",
        "vi": "đang xem hoạt hình",
        "distractor": true
    },
    {
        "word": "throwing food",
        "vi": "ném thức ăn",
        "distractor": true
    }
]
    }
  }
};
