export default {
  grammar_explanation: {
    title_en: "Past Simple: Regular Verbs (-ed) & Was / Were",
    title_vi: "Quá Khứ Đơn: Động từ có quy tắc (-ed) & Was / Were",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Add -ed to regular verbs: walk → walked, play → played",
        rule_vi: "Thêm -ed vào động từ có quy tắc: walk → walked, play → played",
        example_en: "Leo visited the park. Max played with his ball.",
        example_vi: "Leo đã thăm công viên. Max đã chơi với bóng của mình."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "Spelling rules: smile → smiled (+-d) | clap → clapped (double) | play → played",
        rule_vi: "Chính tả: smile → smiled (+-d) | clap → clapped (nhân đôi) | play → played",
        example_en: "She smiled happily. He clapped his hands.",
        example_vi: "Cô ấy đã mỉm cười hạnh phúc. Anh ấy đã vỗ tay."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "WAS with I / He / She / It",
        rule_vi: "WAS với I / He / She / It",
        example_en: "Leo was happy. It was a great day.",
        example_vi: "Leo đã vui. Đó là một ngày tuyệt vời."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "WERE with You / We / They",
        rule_vi: "WERE với You / We / They",
        example_en: "They were excited. We were tired but happy.",
        example_vi: "Họ đã hào hứng. Chúng tôi đã mệt nhưng vui."
      }
    ]
  },

  title: "Grammar Review: Past Simple — Regular Verbs (-ed) & Was/Were",
  image_url: "/images/week26/grammar_cover_w26.jpg",
  audio_url: "/audio/week26/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "REGULAR VERBS + -ED — Add -ed to the base verb to talk about the past",
      examples: [
        "Leo visited the park last Saturday.",
        "Max played with his ball for one hour.",
        "We watched a street performance and clapped.",
        "They returned home tired but happy.",
        "Leo sketched four panels and colored them in."
      ],
      audio_url: "/audio/week26/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "SPELLING RULES for -ED — Most verbs just add -ed, but some have spelling changes",
      examples: [
        "walk → walked (just add -ed)",
        "smile → smiled (verb ends in -e, just add -d)",
        "clap → clapped (consonant-vowel-consonant, double the last letter)",
        "play → played (verb ends in vowel + y, just add -ed)",
        "visit → visited (verb ends in -t, just add -ed)"
      ],
      audio_url: "/audio/week26/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "WAS — Use 'was' with I, He, She, It in the past",
      examples: [
        "It was sunny and warm at the park.",
        "Leo was tired after the long walk.",
        "The performance was brilliant!",
        "Max was so happy playing with his ball.",
        "The comic strip was Leo's best project."
      ],
      audio_url: "/audio/week26/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "WERE — Use 'were' with You, We, They in the past",
      examples: [
        "We were tired but very happy.",
        "They were excited about the street performance.",
        "The children were at the park all morning.",
        "Leo and Mia were proud of the comic strip.",
        "You were great at describing your weekend!"
      ],
      audio_url: "/audio/week26/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Subject", "Past Simple", "Example"],
    rows: [
      ["I / He / She / It", "was + adjective", "It was sunny. He was happy."],
      ["You / We / They", "were + adjective", "We were tired. They were excited."],
      ["Any subject", "verb + -ed", "Leo visited. Max played. They watched."]
    ]
  },
  exercises: [
    {
      id: 1,
      type: "mc",
      question: "Leo ___ his comic strip in one afternoon.",
      audio_url: "/audio/week26/grammar_ex1.mp3",
      options: ["finished", "finish", "finishes", "finishing"],
      answer: "finished",
      explanation_en: "Past Simple of 'finish' = finished (add -ed)."
    },
    {
      id: 2,
      type: "mc",
      question: "Max ___ with his ball for one hour at the park.",
      audio_url: "/audio/week26/grammar_ex2.mp3",
      options: ["played", "play", "plays", "playing"],
      answer: "played",
      explanation_en: "Past Simple of 'play' = played (vowel + y, just add -ed)."
    },
    {
      id: 3,
      type: "mc",
      question: "It ___ sunny and warm when they arrived at the park.",
      audio_url: "/audio/week26/grammar_ex3.mp3",
      options: ["was", "were", "is", "are"],
      answer: "was",
      explanation_en: "Use 'was' with 'it' in the past."
    },
    {
      id: 4,
      type: "mc",
      question: "Leo and Max ___ tired but happy after the long day.",
      audio_url: "/audio/week26/grammar_ex4.mp3",
      options: ["were", "was", "are", "is"],
      answer: "were",
      explanation_en: "Use 'were' with 'Leo and Max' (= they) in the past."
    },
    {
      id: 5,
      type: "mc",
      question: "The crowd ___ and ___ when the musician played. (smile, clap)",
      audio_url: "/audio/week26/grammar_ex5.mp3",
      options: ["smiled, clapped", "smile, clap", "smiling, clapping", "smiled, clap"],
      answer: "smiled, clapped",
      explanation_en: "smiled = smile + d (ends in -e). clapped = clap + ped (double p before -ed)."
    },
    {
      id: 6,
      type: "mc",
      question: "Which sentence uses Past Simple CORRECTLY?",
      audio_url: "/audio/week26/grammar_ex6.mp3",
      options: [
        "They visited the park and were very happy.",
        "They visit the park and is very happy.",
        "They visited the park and is very happy.",
        "They visit the park and were very happy."
      ],
      answer: "They visited the park and were very happy.",
      explanation_en: "Both verbs must be in Past Simple: visited (-ed) and were (past of 'are' for 'they')."
    },
    {
      id: 7,
      type: "mc",
      question: "Leo ___ a caption under every panel to describe each scene.",
      audio_url: "/audio/week26/grammar_ex7.mp3",
      options: ["wrote", "write", "written", "writing"],
      answer: "wrote",
      explanation_en: "'write' is an irregular verb — past form is 'wrote'. (Review: not all verbs use -ed!)"
    },
    {
      id: 8,
      type: "mc",
      question: "The students ___ the comic strips to the classroom wall last Friday.",
      audio_url: "/audio/week26/grammar_ex8.mp3",
      options: ["attached", "attaching", "attach", "attaches"],
      answer: "attached",
      explanation_en: "Past Simple of 'attach' = attached (add -ed)."
    },
    {
      id: 9,
      type: "mc",
      question: "Mia ___ at Leo's comic strip because it was so creative.",
      audio_url: "/audio/week26/grammar_ex9.mp3",
      options: ["laughed", "laugh", "laughing", "laughs"],
      answer: "laughed",
      explanation_en: "Past Simple of 'laugh' = laughed (add -ed)."
    },
    {
      id: 10,
      type: "mc",
      question: "Choose the sentence with a SPELLING MISTAKE in the past tense:",
      audio_url: "/audio/week26/grammar_ex10.mp3",
      options: [
        "Max stopped to rest after chasing the ball.",
        "They smiled when they saw the comic strip.",
        "Leo walked home after the park.",
        "We clapped for the street musician."
      ],
      answer: "Max stopped to rest after chasing the ball.",
      explanation_en: "'stop' ends in consonant-vowel-consonant, so double the last letter: stopped (not stopped)."
    },
    {
      id: 11,
      type: "mc",
      question: "___ you at the park last weekend?",
      audio_url: "/audio/week26/grammar_ex11.mp3",
      options: ["Were", "Was", "Are", "Is"],
      answer: "Were",
      explanation_en: "Use 'Were' with 'you' in past questions."
    },
    {
      id: 12,
      type: "mc",
      question: "Leo ___ four panels for his comic strip project.",
      audio_url: "/audio/week26/grammar_ex12.mp3",
      options: ["sketched", "sketch", "sketching", "sketches"],
      answer: "sketched",
      explanation_en: "Past Simple of 'sketch' = sketched (add -ed)."
    },
    {
      id: 13,
      type: "mc",
      question: "The performance ___ brilliant — everyone was amazed!",
      audio_url: "/audio/week26/grammar_ex13.mp3",
      options: ["was", "were", "is", "are"],
      answer: "was",
      explanation_en: "Use 'was' with 'the performance' (= it) in the past."
    },
    {
      id: 14,
      type: "mc",
      question: "They ___ home after the adventure at the park.",
      audio_url: "/audio/week26/grammar_ex14.mp3",
      options: ["returned", "return", "returning", "returns"],
      answer: "returned",
      explanation_en: "Past Simple of 'return' = returned (add -ed)."
    },
    {
      id: 15,
      type: "mc",
      question: "Which verb is IRREGULAR in the past tense?",
      audio_url: "/audio/week26/grammar_ex15.mp3",
      options: [
        "write → wrote",
        "walk → walked",
        "visit → visited",
        "play → played"
      ],
      answer: "write → wrote",
      explanation_en: "write → wrote is irregular (no -ed). The others are all regular verbs."
    },
    {
      id: 16,
      type: "mc",
      question: "Leo and Mia ___ excited when they finished the comic strip project.",
      audio_url: "/audio/week26/grammar_ex16.mp3",
      options: ["were", "was", "is", "are"],
      answer: "were",
      explanation_en: "Use 'were' with 'Leo and Mia' (= they) in the past."
    },
    {
      id: 17,
      type: "mc",
      question: "She ___ her comic strip with bright yellow and blue colors.",
      audio_url: "/audio/week26/grammar_ex17.mp3",
      options: ["colored", "color", "coloring", "colors"],
      answer: "colored",
      explanation_en: "Past Simple of 'color' = colored (add -ed)."
    },
    {
      id: 18,
      type: "mc",
      question: "The park ___ beautiful — there were flowers everywhere.",
      audio_url: "/audio/week26/grammar_ex18.mp3",
      options: ["was", "were", "is", "am"],
      answer: "was",
      explanation_en: "Use 'was' with 'the park' (= it) in the past."
    },
    {
      id: 19,
      type: "mc",
      question: "Complete the sentence: Last Saturday, Max and I ___ to the park and ___ a ball.",
      audio_url: "/audio/week26/grammar_ex19.mp3",
      options: ["walked, kicked", "walk, kick", "walked, kick", "walk, kicked"],
      answer: "walked, kicked",
      explanation_en: "Both verbs in the same past sentence must be in Past Simple: walked + kicked (add -ed)."
    },
    {
      id: 20,
      type: "mc",
      question: "Which sentence is in the PAST SIMPLE? Choose the correct one.",
      audio_url: "/audio/week26/grammar_ex20.mp3",
      options: [
        "Leo created a comic strip about his weekend.",
        "Leo is creating a comic strip about his weekend.",
        "Leo creates a comic strip about his weekend.",
        "Leo will create a comic strip about his weekend."
      ],
      answer: "Leo created a comic strip about his weekend.",
      explanation_en: "created = Past Simple of 'create' (ends in -e, add -d). All other options are different tenses."
    }
  ]
};
