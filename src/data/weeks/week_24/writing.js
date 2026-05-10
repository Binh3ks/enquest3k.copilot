export default {
  title: "My Emotional Day",
  min_words: 45,
  model_sentence: "Yesterday was one of the most emotional days I have had in a long time because I experienced so many different feelings from morning to night. In the morning I was very scared because I could not find my school bag anywhere, and I searched the whole house in a panic while my mum remained calm and told me to breathe slowly. When we finally found it under my bed, I felt enormous relief and I hugged my mum tightly because she had been so patient with me. At school I felt proud and confident because I scored the highest mark in our spelling test and my teacher praised me in front of the whole class. However, in the afternoon I felt a little disappointed because my team lost our football match, even though we had practised very hard all week. By the time I went home, I felt peaceful and grateful because, despite the ups and downs, it had been a truly memorable day.",
  instruction_en: "Write about an emotional day from morning to night using because and feeling words!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u1ed9t ng\u00e0y \u0111\u1ea7y c\u1ea3m x\u00fac t\u1eeb s\u00e1ng \u0111\u1ebfn t\u1ed1i d\u00f9ng because v\u00e0 t\u1eeb c\u1ea3m x\u00fac!",
  prompt_en: "What happened? How did you feel and why? How did the day end?",
  prompt_vi: "Chuy\u1ec7n g\u00ec x\u1ea3y ra? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o v\u00e0 t\u1ea1i sao? Ng\u00e0y k\u1ebft th\u00fac th\u1ebf n\u00e0o?",
  keywords: ["panic", "relief", "praised", "disappointed", "practised", "peaceful", "grateful", "memorable"],
  topic_talk_prompt: "Describe an emotional day \u2014 what feelings did you have and why?",
  sentence_frames: [
    {
        "template": "In the morning I was very ___ because I could not find ___ anywhere.",
        "answers": [
            "scared",
            "my school bag"
        ]
    },
    {
        "template": "When we finally found it, I felt ___ and I hugged my mum because she had been so ___.",
        "answers": [
            "enormous relief",
            "patient"
        ]
    },
    {
        "template": "At school I felt ___ because I scored ___ and my teacher ___ me in front of the class.",
        "answers": [
            "proud and confident",
            "the highest mark",
            "praised"
        ]
    },
    {
        "template": "In the afternoon I felt ___ because my team ___ our football match.",
        "answers": [
            "a little disappointed",
            "lost"
        ]
    },
    {
        "template": "By the time I went home, I felt ___ and ___ because it had been a ___ day.",
        "answers": [
            "peaceful",
            "grateful",
            "truly memorable"
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
        "word": "scared",
        "vi": "sợ hãi",
        "distractor": false
    },
    {
        "word": "my school bag",
        "vi": "cặp sách của tôi",
        "distractor": false
    },
    {
        "word": "enormous relief",
        "vi": "sự nhẹ nhõm to lớn",
        "distractor": false
    },
    {
        "word": "patient",
        "vi": "kiên nhẫn",
        "distractor": false
    },
    {
        "word": "proud and confident",
        "vi": "tự hào và tự tin",
        "distractor": false
    },
    {
        "word": "the highest mark",
        "vi": "điểm cao nhất",
        "distractor": false
    },
    {
        "word": "praised",
        "vi": "đã khen ngợi",
        "distractor": false
    },
    {
        "word": "a little disappointed",
        "vi": "hơi thất vọng",
        "distractor": false
    },
    {
        "word": "lost",
        "vi": "đã thua",
        "distractor": false
    },
    {
        "word": "peaceful",
        "vi": "bình yên",
        "distractor": false
    },
    {
        "word": "grateful",
        "vi": "biết ơn",
        "distractor": false
    },
    {
        "word": "truly memorable",
        "vi": "thực sự đáng nhớ",
        "distractor": false
    },
    {
        "word": "confused and angry",
        "vi": "bối rối và tức giận",
        "distractor": true
    },
    {
        "word": "won easily",
        "vi": "đã thắng dễ dàng",
        "distractor": true
    },
    {
        "word": "a boring and forgettable",
        "vi": "nhàm chán và không đáng nhớ",
        "distractor": true
    }
]
    }
  }
};
